import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { dishSvg } from "./assets/dish-svg";
import { CARD_NAME, CARD_VERSION, PLATFORM, type EntityKey, type StarlinkState } from "./const";
import { computeState, mbps, numeric, resolveEntities, signalRatio } from "./helpers/resolve";
import { findWeather, skyPosition, weatherScene } from "./helpers/sky";
import { localize, resolveLanguage } from "./localize";
import { cardStyles } from "./styles";
import type { HassObject, HassState, ResolvedEntities, ShortcutConfig, StarlinkCardConfig, StatConfig } from "./types";

console.info(
  `%c STARLINK-LOCAL-CARD %c v${CARD_VERSION} `,
  "color: white; background: #23272e; font-weight: 700;",
  "color: #23272e; background: #e9eaec; font-weight: 700;"
);

type Template = TemplateResult | typeof nothing;

const DEFAULT_STATS: Record<string, StatConfig[]> = {
  default: [
    { key: "downlink", subtitle: "stat.download" },
    { key: "uplink", subtitle: "stat.upload" },
    { key: "pop_ping", subtitle: "stat.ping" },
  ],
  obstructed: [
    { key: "obstruction", subtitle: "stat.obstruction" },
    { key: "downlink", subtitle: "stat.download" },
    { key: "pop_ping", subtitle: "stat.ping" },
  ],
};

const RATE_KEYS = new Set<EntityKey>(["downlink", "uplink", "native_download", "native_upload"]);
const PING_KEYS = new Set<EntityKey>(["pop_ping", "wan_ping", "native_ping"]);
const QUIET_STATES = new Set<StarlinkState>(["sleeping", "stowed", "searching"]);

function fireEvent(node: HTMLElement, type: string, detail?: unknown): void {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

@customElement(CARD_NAME)
export class StarlinkLocalCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HassObject;
  @state() private _config!: StarlinkCardConfig;

  private _entities: ResolvedEntities = {};

  // ── HA card API ──────────────────────────────────────────────────────────
  static getStubConfig(hass?: HassObject): Partial<StarlinkCardConfig> {
    const entry = Object.values(hass?.entities ?? {}).find(
      (e) => e.platform === PLATFORM && e.translation_key === "downlink"
    );
    if (entry?.device_id) return { type: `custom:${CARD_NAME}`, device: entry.device_id };
    if (entry) return { type: `custom:${CARD_NAME}`, entities: { downlink: entry.entity_id } };
    return { type: `custom:${CARD_NAME}` };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "device", selector: { device: { filter: { integration: PLATFORM } } } },
        { name: "name", selector: { text: {} } },
        { name: "weather_entity", selector: { entity: { filter: { domain: "weather" } } } },
        {
          type: "grid",
          name: "",
          schema: [
            { name: "show_name", selector: { boolean: {} } },
            { name: "show_status", selector: { boolean: {} } },
            { name: "show_toolbar", selector: { boolean: {} } },
            { name: "compact_view", selector: { boolean: {} } },
          ],
        },
      ],
      computeLabel: (schema: { name: string }) => localize(`editor.${schema.name}`),
    };
  }

  public setConfig(config: StarlinkCardConfig): void {
    if (!config) throw new Error(localize("common.invalid_config"));
    // 0.1.x keys
    const legacy = config as StarlinkCardConfig & { title?: string; entities?: Record<string, string> };
    const { signal, restricted, dl_reason, ...entities } = legacy.entities ?? {};
    config = {
      ...config,
      name: config.name ?? legacy.title,
      entities: {
        ...(signal && { signal_quality: signal }),
        ...(restricted && { bandwidth_restricted: restricted }),
        ...(dl_reason && { dl_restricted_reason: dl_reason }),
        ...entities,
      },
    };
    if (!config.device && !config.entities?.downlink && !config.entities?.pop_ping) {
      throw new Error(localize("common.missing_entity"));
    }
    this._config = { show_name: true, show_status: true, show_toolbar: true, compact_view: false, ...config };
    this._entities = resolveEntities(this.hass, this._config);
  }

  public getCardSize(): number {
    return this._config?.compact_view ? 3 : 7;
  }

  public getGridOptions() {
    return this._config?.compact_view
      ? { columns: 6, rows: 3, min_columns: 4, min_rows: 2 }
      : { columns: 6, rows: 7, min_columns: 4, min_rows: 5 };
  }

  // ── lifecycle ────────────────────────────────────────────────────────────
  protected willUpdate(changed: PropertyValues): void {
    if (!changed.has("hass") || !this._config) return;
    const before = changed.get("hass") as HassObject | undefined;
    if (!before || before.entities !== this.hass?.entities || !this._entities.downlink) {
      this._entities = resolveEntities(this.hass, this._config);
    }
    if (!before || before.themes?.darkMode !== this.hass?.themes?.darkMode) {
      this.toggleAttribute("dark-mode", Boolean(this.hass?.themes?.darkMode));
    }
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has("_config")) return true;
    const before = changed.get("hass") as HassObject | undefined;
    if (!before || !this.hass) return true;
    const ids = [...Object.values(this._entities), "sun.sun", findWeather(this.hass, this._config.weather_entity)];
    return ids.some((id) => id && before.states[id] !== this.hass!.states[id]);
  }

  // ── helpers ──────────────────────────────────────────────────────────────
  private get _lang(): string {
    return resolveLanguage(this.hass, this._config?.language);
  }

  private _state(key: EntityKey): HassState | undefined {
    const id = this._entities[key];
    return id ? this.hass?.states[id] : undefined;
  }

  private _number(value: number, digits = 0): string {
    return new Intl.NumberFormat(this._lang, { maximumFractionDigits: digits }).format(value);
  }

  private _format(key: EntityKey | undefined, stateObj: HassState | undefined): string {
    if (!stateObj || stateObj.state === "unknown" || stateObj.state === "unavailable") return "—";
    if (key && RATE_KEYS.has(key)) {
      const value = mbps(this.hass, stateObj.entity_id);
      if (value !== null && value > 0 && value < 1) {
        const kbps = value * 1000;
        return `${this._number(kbps, kbps < 10 ? 1 : 0)} kbps`;
      }
      if (value !== null) return `${this._number(value, value < 10 ? 1 : 0)} Mbps`;
    }
    if (key && PING_KEYS.has(key)) {
      const value = numeric(this.hass, stateObj.entity_id);
      if (value !== null) return `${this._number(value)} ms`;
    }
    if (this.hass?.formatEntityState) {
      try {
        return this.hass.formatEntityState(stateObj);
      } catch {
        /* fall through */
      }
    }
    const unit = stateObj.attributes.unit_of_measurement;
    return unit ? `${stateObj.state} ${unit}` : stateObj.state;
  }

  private get _weather() {
    return weatherScene(this.hass, findWeather(this.hass, this._config.weather_entity));
  }

  private _sceneClass(dishState: StarlinkState): string {
    const sun = this.hass?.states["sun.sun"]?.state;
    const night = sun ? sun !== "above_horizon" : new Date().getHours() < 6 || new Date().getHours() >= 18;
    return night ? `${dishState} night` : dishState;
  }

  private _moreInfo(entityId?: string): void {
    const id = entityId ?? this._entities.downlink ?? this._entities.pop_ping;
    if (id) fireEvent(this, "hass-more-info", { entityId: id });
  }

  private _confirm(key: string): boolean {
    return window.confirm(localize(key, this._lang));
  }

  private _reboot(): void {
    const id = this._entities.reboot;
    if (!id || !this.hass || !this._confirm("common.confirm_reboot")) return;
    void this.hass.callService("button", "press", { entity_id: id });
  }

  private _toggleStow(): void {
    const stow = this._state("stowed");
    if (!stow || !this.hass) return;
    const on = stow.state === "on";
    if (!this._confirm(on ? "common.confirm_unstow" : "common.confirm_stow")) return;
    void this.hass.callService("switch", on ? "turn_off" : "turn_on", { entity_id: stow.entity_id });
  }

  private _runShortcut(shortcut: ShortcutConfig): void {
    if (!this.hass || !shortcut.service) return;
    const [domain, service] = shortcut.service.split(".");
    void this.hass.callService(domain, service, shortcut.service_data, shortcut.target);
  }

  // ── render ───────────────────────────────────────────────────────────────
  protected render(): Template {
    if (!this._config) return nothing;
    const dishState = computeState(this.hass, this._entities);
    if (dishState === "unavailable") return this._renderUnavailable();
    const signal = signalRatio(this.hass, this._entities);
    const azimuth = numeric(this.hass, this._entities.azimuth);
    const elevation = dishState === "stowed" ? 90 : numeric(this.hass, this._entities.elevation);
    const pose = { elevation, azimuth, desiredAzimuth: numeric(this.hass, this._entities.desired_azimuth) };
    const sky = skyPosition(this.hass);
    // the satellite crosses faster the better the link
    const style =
      `--slc-signal:${signal.toFixed(2)};--slc-sun-i:${sky.intensity.toFixed(2)};` +
      `--slc-orbit:${(12 - 5 * signal).toFixed(1)}s`;
    return html`
      <ha-card style=${style}>
        <div class="preview">
          <div class="header">
            <div class="tips">${this._renderTips()}</div>
            <ha-icon-button
              class="more-info"
              .label=${localize("common.more_info", this._lang)}
              @click=${() => this._moreInfo()}
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._config.compact_view
            ? nothing
            : html`<div class="hero" @click=${() => this._moreInfo()}>${dishSvg(this._sceneClass(dishState), pose, this._weather, sky)}</div>`}
          <div class="metadata">
            ${this._renderName()} ${this._renderStatus(dishState, signal, azimuth, elevation)}
          </div>
          ${this._renderStats(dishState)}
        </div>
        ${this._renderToolbar()}
      </ha-card>
    `;
  }

  private _renderUnavailable(): Template {
    return html`
      <ha-card>
        <div class="preview not-available">
          ${this._config.compact_view
            ? nothing
            : html`<div class="hero">${dishSvg(this._sceneClass("unavailable"), { elevation: null, azimuth: null, desiredAzimuth: null }, this._weather, skyPosition(this.hass))}</div>`}
          <div class="metadata">
            ${this._renderName()}
            <div class="status">${localize("common.not_available", this._lang)}</div>
          </div>
        </div>
        ${this._renderToolbar()}
      </ha-card>
    `;
  }

  private _tip(key: EntityKey, icon: string, text?: string, cls = ""): Template {
    const stateObj = this._state(key);
    if (!stateObj) return nothing;
    return html`
      <div class="tip ${cls}" title=${String(stateObj.attributes.friendly_name ?? "")}
           @click=${() => this._moreInfo(stateObj.entity_id)}>
        <ha-icon icon=${icon}></ha-icon>
        <span>${text ?? this._format(key, stateObj)}</span>
      </div>
    `;
  }

  private _renderTips(): Template {
    const clients = numeric(this.hass, this._entities.clients);
    const restricted = this._state("bandwidth_restricted")?.state === "on";
    const reason = this._state("dl_restricted_reason")?.state;
    return html`
      ${this._tip("pop_ping", "mdi:timer-outline", undefined, "accent")}
      ${clients === null ? nothing : this._tip("clients", "mdi:devices", localize("common.clients", this._lang, { count: clients }))}
      ${this._tip("gps_sats", "mdi:satellite-variant")}
      ${restricted
        ? this._tip(
            "bandwidth_restricted",
            "mdi:speedometer-slow",
            localize("common.restricted", this._lang, { reason: (reason ?? "").toLowerCase().replace(/_/g, " ") }),
            "alarm"
          )
        : nothing}
    `;
  }

  private _renderName(): Template {
    if (!this._config.show_name) return nothing;
    const device = this._config.device ? this.hass?.devices?.[this._config.device] : undefined;
    const name = this._config.name ?? device?.name_by_user ?? device?.name ?? "Starlink";
    return html`<div class="plant-name">${name}</div>`;
  }

  private _renderStatus(
    dishState: StarlinkState,
    signal: number,
    azimuth: number | null,
    elevation: number | null
  ): Template {
    if (!this._config.show_status) return nothing;
    const showSignal = this._entities.signal_quality && !QUIET_STATES.has(dishState);
    return html`
      <div class="status ${dishState}"><span>${localize(`status.${dishState}`, this._lang)}</span></div>
      ${showSignal
        ? html`<div class="signal" @click=${() => this._moreInfo(this._entities.signal_quality)}>
            <div class="signal-bar"><div class="signal-fill" style="width:${(signal * 100).toFixed(0)}%"></div></div>
            <div class="signal-text">${localize("common.signal", this._lang, { percent: Math.round(signal * 100) })}</div>
          </div>`
        : nothing}
      ${azimuth !== null && elevation !== null && dishState !== "stowed"
        ? html`<div class="alignment" @click=${() => this._moreInfo(this._entities.azimuth)}>
            ${localize("common.alignment", this._lang, {
              azimuth: this._number(azimuth),
              elevation: this._number(elevation),
            })}
          </div>`
        : nothing}
    `;
  }

  private _renderStats(dishState: StarlinkState): Template {
    if (this._config.compact_view) return nothing;
    const configured = this._config.stats ?? {};
    const list = configured[dishState] ?? configured.default ?? DEFAULT_STATS[dishState] ?? DEFAULT_STATS.default;
    const blocks = list
      .map((stat) => {
        const entityId = stat.entity ?? (stat.key ? this._entities[stat.key] : undefined);
        const stateObj = entityId ? this.hass?.states[entityId] : undefined;
        if (!stateObj) return nothing;
        let value = this._format(stat.entity ? undefined : stat.key, stateObj);
        if (stat.attribute) value = String(stateObj.attributes[stat.attribute] ?? "—");
        else if (stat.unit) value = `${stateObj.state} ${stat.unit}`;
        const subtitle = stat.subtitle?.startsWith("stat.") ? localize(stat.subtitle, this._lang) : (stat.subtitle ?? "");
        return html`
          <div class="stats-block" @click=${() => this._moreInfo(entityId)}>
            <div class="stats-value">${value}</div>
            <div class="stats-subtitle">${subtitle}</div>
          </div>
        `;
      })
      .filter((b) => b !== nothing);
    return blocks.length ? html`<div class="stats">${blocks}</div>` : nothing;
  }

  private _iconButton(icon: string, labelKey: string, action: () => void): TemplateResult {
    const label = localize(labelKey, this._lang);
    return html`
      <ha-icon-button .label=${label} title=${label} @click=${action}>
        <ha-icon icon=${icon}></ha-icon>
      </ha-icon-button>
    `;
  }

  private _renderToolbar(): Template {
    if (!this._config.show_toolbar) return nothing;
    const stow = this._state("stowed");
    const stowed = stow?.state === "on";
    const shortcuts = (this._config.shortcuts ?? []).map(
      (shortcut) => html`
        <ha-icon-button .label=${shortcut.name ?? ""} title=${shortcut.name ?? ""} @click=${() => this._runShortcut(shortcut)}>
          <ha-icon icon=${shortcut.icon ?? "mdi:flash"}></ha-icon>
        </ha-icon-button>
      `
    );
    const buttons = [
      stow
        ? html`<button class="text-button ${stowed ? "active" : ""}" @click=${() => this._toggleStow()}>
            <ha-icon icon=${stowed ? "mdi:satellite-uplink" : "mdi:package-down"}></ha-icon>
            ${localize(stowed ? "common.unstow" : "common.stow", this._lang)}
          </button>`
        : nothing,
      this._entities.obstruction_map
        ? this._iconButton("mdi:radar", "common.obstruction_map", () => this._moreInfo(this._entities.obstruction_map))
        : nothing,
      this._entities.reboot ? this._iconButton("mdi:restart", "common.reboot", () => this._reboot()) : nothing,
    ].filter((b) => b !== nothing);
    if (!buttons.length && !shortcuts.length) return nothing;
    return html`<div class="toolbar">${buttons}<div class="fill-gap"></div>${shortcuts}</div>`;
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: localize("common.name"),
  description: localize("common.description"),
  preview: true,
  documentationURL: "https://github.com/hudsonbrendon/ha-starlink-local-card",
  getEntitySuggestion: (hass: HassObject, entityId: string) => {
    const entry = hass.entities?.[entityId];
    if (!entry || entry.platform !== PLATFORM || entry.translation_key !== "downlink") return null;
    return {
      config: entry.device_id
        ? { type: `custom:${CARD_NAME}`, device: entry.device_id }
        : { type: `custom:${CARD_NAME}`, entities: { downlink: entityId } },
    };
  },
});
