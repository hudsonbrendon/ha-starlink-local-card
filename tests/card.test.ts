import { describe, it, expect, vi } from "vitest";
import "../src/starlink-local-card";
import { CARD_NAME } from "../src/const";
import { computeState, mbps, resolveEntities, signalRatio } from "../src/helpers/resolve";
import { localize } from "../src/localize";
import { DISH, mockHass, type MockOpts } from "./fixtures/hass";
import type { StarlinkCardConfig } from "../src/types";

interface CardEl extends HTMLElement {
  setConfig(c: StarlinkCardConfig): void;
  hass: ReturnType<typeof mockHass>;
  updateComplete: Promise<boolean>;
  getCardSize(): number;
  getGridOptions(): { rows: number };
}

async function mount(config: Partial<StarlinkCardConfig>, opts: MockOpts = {}): Promise<CardEl> {
  const el = document.createElement(CARD_NAME) as CardEl;
  el.setConfig({ type: `custom:${CARD_NAME}`, ...config } as StarlinkCardConfig);
  el.hass = mockHass(opts);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const $ = (el: CardEl, sel: string) => el.shadowRoot!.querySelector(sel);
const $$ = (el: CardEl, sel: string) => el.shadowRoot!.querySelectorAll(sel);

describe("registration and config", () => {
  it("registers the element, picker entry and suggestion", () => {
    expect(customElements.get(CARD_NAME)).toBeDefined();
    const entry = window.customCards!.find((c) => c.type === CARD_NAME) as Record<string, unknown>;
    const suggest = entry.getEntitySuggestion as (h: unknown, id: string) => unknown;
    expect(suggest(mockHass(), "sensor.starlink_dish_taxa_de_download")).toEqual({
      config: { type: `custom:${CARD_NAME}`, device: DISH },
    });
    expect(suggest(mockHass(), "sensor.starlink_download")).toBeNull();
  });

  it("builds stub config and editor form", () => {
    const ctor = customElements.get(CARD_NAME) as unknown as {
      getStubConfig(h: unknown): Partial<StarlinkCardConfig>;
      getConfigForm(): { computeLabel(s: { name: string }): string };
    };
    expect(ctor.getStubConfig(mockHass())).toEqual({ type: `custom:${CARD_NAME}`, device: DISH });
    expect(ctor.getStubConfig(undefined)).toEqual({ type: `custom:${CARD_NAME}` });
    expect(ctor.getConfigForm().computeLabel({ name: "device" })).toBe("Dish device");
  });

  it("rejects configs without the dish and accepts 0.1 configs", async () => {
    const el = document.createElement(CARD_NAME) as CardEl;
    expect(() => el.setConfig({ type: "x" })).toThrow(/dish/);
    expect(() => el.setConfig(undefined as unknown as StarlinkCardConfig)).toThrow(/Invalid/);
    const legacy = await mount({
      title: "Antena",
      entities: {
        downlink: "sensor.starlink_dish_taxa_de_download",
        signal: "sensor.starlink_dish_qualidade_do_sinal",
      },
    } as unknown as StarlinkCardConfig);
    expect($(legacy, ".plant-name")!.textContent).toContain("Antena");
    expect($(legacy, ".signal-text")!.textContent).toContain("92%");
  });

  it("reports sizes", async () => {
    expect((await mount({ device: DISH })).getGridOptions().rows).toBe(7);
    expect((await mount({ device: DISH, compact_view: true })).getCardSize()).toBe(3);
  });
});

describe("helpers", () => {
  it("resolves local (dish wins over router) and native entities", () => {
    const e = resolveEntities(mockHass(), { type: "x", device: DISH });
    expect(e.pop_ping).toBe("sensor.starlink_dish_latencia_de_ping_pop");
    expect(e.clients).toBe("sensor.starlink_router_clientes_wi_fi");
    expect(e.reboot).toBe("button.starlink_reiniciar");
    expect(e.connectivity).toBe("binary_sensor.starlink_conectividade");
    expect(e.stowed).toBe("switch.starlink_stowed");
    const nativeOnly = resolveEntities(mockHass({ local: false }), { type: "x" });
    expect(nativeOnly.downlink).toBe("sensor.starlink_download");
    expect(nativeOnly.pop_ping).toBe("sensor.starlink_ping");
  });

  it("computes the visual state", () => {
    const e = resolveEntities(mockHass(), { type: "x", device: DISH });
    const s = (o: MockOpts) => computeState(mockHass(o), e);
    expect(s({})).toBe("online");
    expect(s({ restricted: "on" })).toBe("limited");
    expect(s({ alerts: "on" })).toBe("alert");
    expect(s({ obstruction: "3.5" })).toBe("obstructed");
    expect(s({ snr: "off" })).toBe("searching");
    expect(s({ heating: "on" })).toBe("heating");
    expect(s({ thermal: "on" })).toBe("thermal");
    expect(s({ sleeping: "on" })).toBe("sleeping");
    expect(s({ stowed: "on" })).toBe("stowed");
    expect(s({ downlink: "unavailable", pop_ping: "unavailable" })).toBe("unavailable");
    expect(computeState(undefined, e)).toBe("unavailable");
  });

  it("converts rates, signal and pose", () => {
    const hass = mockHass();
    expect(mbps(hass, "sensor.starlink_dish_taxa_de_download")).toBeCloseTo(87.3);
    expect(mbps(hass, "sensor.starlink_download")).toBeCloseTo(50.5);
    expect(mbps(hass, "sensor.none")).toBeNull();
    expect(signalRatio(hass, resolveEntities(hass, { type: "x", device: DISH }))).toBeCloseTo(0.92);
    expect(signalRatio(hass, {})).toBe(0);
  });
});

describe("rendering", () => {
  it("renders the online card", async () => {
    const el = await mount({ device: DISH });
    expect($(el, "svg.dish")!.classList.contains("online")).toBe(true);
    expect($(el, ".plant-name")!.textContent).toContain("Starlink Dish");
    expect($(el, ".status")!.textContent).toContain("Connected");
    expect($(el, ".signal-text")!.textContent).toContain("Signal 92%");
    expect($(el, ".alignment")!.textContent).toContain("Azimuth 20° · Elevation 55°");
    expect([...$$(el, ".tip")].map((t) => t.textContent!.trim())).toEqual(["31 ms", "6 clients", "14"]);
    expect([...$$(el, ".stats-value")].map((s) => s.textContent)).toEqual(["87 Mbps", "9.4 Mbps", "31 ms"]);
    expect($(el, ".toolbar .text-button")!.textContent).toContain("Stow");
    expect($$(el, ".toolbar ha-icon-button").length).toBe(2);
    expect($(el, ".compass")).not.toBeNull();
  });

  it("renders restricted, obstructed, sleeping, stowed and unavailable", async () => {
    const limited = await mount({ device: DISH }, { restricted: "on" });
    expect($(limited, ".tip.alarm")!.textContent).toContain("low speed policy limit");
    const obstructed = await mount({ device: DISH }, { obstruction: "4" });
    expect($(obstructed, ".status")!.classList.contains("obstructed")).toBe(true);
    expect($$(obstructed, ".stats-value")[0].textContent).toBe("4 %");
    const sleeping = await mount({ device: DISH }, { sleeping: "on" });
    expect($(sleeping, ".signal")).toBeNull();
    const stowed = await mount({ device: DISH }, { stowed: "on" });
    expect($(stowed, ".alignment")).toBeNull();
    expect($(stowed, ".toolbar .text-button.active")!.textContent).toContain("Unstow");
    const off = await mount({ device: DISH }, { downlink: "unavailable", pop_ping: "unavailable" });
    expect($(off, ".preview.not-available")).not.toBeNull();
    expect($(off, ".toolbar")).not.toBeNull(); // reboot still reachable
    const bare = await mount({ device: DISH }, { native: false, downlink: "unavailable", pop_ping: "unavailable" });
    expect($$(bare, ".toolbar ha-icon-button").length).toBe(1); // obstruction map only, no reboot
  });

  it("hides sections, dark mode, portuguese, compact", async () => {
    const el = await mount({ device: DISH, name: "Telhado", show_toolbar: false, show_status: false }, { darkMode: true });
    expect($(el, ".plant-name")!.textContent).toContain("Telhado");
    expect($(el, ".toolbar")).toBeNull();
    expect($(el, ".status")).toBeNull();
    expect(el.hasAttribute("dark-mode")).toBe(true);
    const pt = await mount({ device: DISH, language: "pt-BR" });
    expect($(pt, ".status")!.textContent).toContain("Conectada");
    expect($$(pt, ".stats-value")[1].textContent).toBe("9,4 Mbps");
    const compact = await mount({ device: DISH, compact_view: true });
    expect($(compact, ".hero")).toBeNull();
    expect($(compact, ".stats")).toBeNull();
  });
});

describe("actions", () => {
  it("stows, reboots with confirmation, shortcuts and more-info", async () => {
    const el = await mount({
      device: DISH,
      shortcuts: [{ name: "Ping", icon: "mdi:flash", service: "script.turn_on", service_data: { entity_id: "script.x" } }],
    });
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    ($(el, ".toolbar .text-button") as HTMLButtonElement).click();
    const buttons = $$(el, ".toolbar ha-icon-button");
    (buttons[1] as HTMLElement).click();
    expect(el.hass._calls).toEqual([]);
    confirm.mockReturnValue(true);
    ($(el, ".toolbar .text-button") as HTMLButtonElement).click();
    (buttons[1] as HTMLElement).click();
    (buttons[2] as HTMLElement).click();
    expect(el.hass._calls).toEqual([
      { domain: "switch", service: "turn_on", service_data: { entity_id: "switch.starlink_stowed" } },
      { domain: "button", service: "press", service_data: { entity_id: "button.starlink_reiniciar" } },
      { domain: "script", service: "turn_on", service_data: { entity_id: "script.x" } },
    ]);
    confirm.mockRestore();

    const events: string[] = [];
    el.addEventListener("hass-more-info", (e) => events.push((e as CustomEvent).detail.entityId));
    ($(el, ".hero") as HTMLElement).click();
    (buttons[0] as HTMLElement).click();
    ($(el, ".tip") as HTMLElement).click();
    expect(events).toEqual([
      "sensor.starlink_dish_taxa_de_download",
      "camera.starlink_dish_mapa_de_obstrucao",
      "sensor.starlink_dish_latencia_de_ping_pop",
    ]);
  });

  it("re-renders when a tracked entity changes", async () => {
    const el = await mount({ device: DISH });
    el.hass = mockHass({ snr: "off" });
    await el.updateComplete;
    expect($(el, "svg.dish")!.classList.contains("searching")).toBe(true);
  });

  it("localizes with fallbacks", () => {
    expect(localize("status.online", "pt-BR")).toBe("Conectada");
    expect(localize("status.online", "pt")).toBe("Conectada");
    expect(localize("status.online", "de")).toBe("Connected");
    expect(localize("x.y")).toBe("x.y");
  });
});
