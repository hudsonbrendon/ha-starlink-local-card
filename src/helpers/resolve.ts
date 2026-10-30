import { LOCAL_KEYS, NATIVE_KEYS, NATIVE_PLATFORM, OBSTRUCTED_PERCENT, PLATFORM, type EntityKey, type StarlinkState } from "../const";
import type { HassObject, ResolvedEntities, StarlinkCardConfig } from "../types";

const invert = (keys: Record<string, string>) =>
  new Map<string, EntityKey>(Object.entries(keys).map(([key, tk]) => [tk, key as EntityKey]));
const LOCAL = invert(LOCAL_KEYS);
const NATIVE = invert(NATIVE_KEYS);

/** Local keys that fall back to the native integration when starlink_local is missing. */
const FALLBACKS: Array<[EntityKey, EntityKey]> = [
  ["downlink", "native_download"],
  ["uplink", "native_upload"],
  ["pop_ping", "native_ping"],
  ["azimuth", "native_azimuth"],
  ["elevation", "native_elevation"],
];

/**
 * Map card keys to entity ids.
 *
 * starlink_local splits into a dish and a router device: with `device` set,
 * every device sharing its config entry is used, the configured one winning
 * on duplicates (`pop_ping` exists on both). Entities of the native starlink
 * integration are added when present (reboot, stow, sleep, heating...).
 */
export function resolveEntities(hass: HassObject | undefined, config: StarlinkCardConfig): ResolvedEntities {
  const resolved: ResolvedEntities = {};
  const registry = hass?.entities;
  if (registry && hass) {
    let deviceIds: Set<string> | undefined;
    if (config.device) {
      const entries = new Set(hass.devices?.[config.device]?.config_entries ?? []);
      deviceIds = new Set([config.device]);
      for (const device of Object.values(hass.devices ?? {})) {
        if ((device.config_entries ?? []).some((e) => entries.has(e))) deviceIds.add(device.id);
      }
    }
    const entries = Object.values(registry).sort(
      (a, b) => Number(b.device_id === config.device) - Number(a.device_id === config.device)
    );
    for (const entry of entries) {
      let key: EntityKey | undefined;
      if (entry.platform === PLATFORM) {
        if (deviceIds && (!entry.device_id || !deviceIds.has(entry.device_id))) continue;
        key = entry.translation_key ? LOCAL.get(entry.translation_key) : undefined;
      } else if (entry.platform === NATIVE_PLATFORM) {
        const domain = entry.entity_id.split(".")[0];
        key = entry.translation_key
          ? NATIVE.get(entry.translation_key)
          : domain === "button"
            ? "reboot"
            : domain === "binary_sensor" && hass.states[entry.entity_id]?.attributes.device_class === "connectivity"
              ? "connectivity"
              : undefined;
      }
      if (key && !resolved[key]) resolved[key] = entry.entity_id;
    }
    for (const [key, fallback] of FALLBACKS) resolved[key] ??= resolved[fallback];
  }
  return { ...resolved, ...(config.entities ?? {}) };
}

const isAvailable = (hass: HassObject, id?: string) => {
  const state = id ? hass.states[id]?.state : undefined;
  return state !== undefined && state !== "unavailable" && state !== "unknown";
};

const isOn = (hass: HassObject, id?: string) => (id ? hass.states[id]?.state === "on" : false);

export function numeric(hass: HassObject | undefined, entityId?: string): number | null {
  if (!entityId || !hass) return null;
  const value = Number(hass.states[entityId]?.state);
  return Number.isFinite(value) ? value : null;
}

/** Derive the illustration state from the dish telemetry (local first, native as extra signals). */
export function computeState(hass: HassObject | undefined, e: ResolvedEntities): StarlinkState {
  if (!hass || !(isAvailable(hass, e.downlink) || isAvailable(hass, e.pop_ping))) return "unavailable";
  if (isOn(hass, e.stowed)) return "stowed";
  if (isOn(hass, e.sleeping)) return "sleeping";
  if (isOn(hass, e.thermal)) return "thermal";
  if (e.snr_above_noise_floor && hass.states[e.snr_above_noise_floor]?.state === "off") return "searching";
  if ((numeric(hass, e.obstruction) ?? 0) >= OBSTRUCTED_PERCENT || isOn(hass, e.native_obstructed)) return "obstructed";
  if (isOn(hass, e.heating)) return "heating";
  if (isOn(hass, e.bandwidth_restricted)) return "limited";
  if (isOn(hass, e.has_alerts)) return "alert";
  return "online";
}

const RATE_TO_MBPS: Record<string, number> = {
  "bit/s": 1e-6,
  "kbit/s": 1e-3,
  "Mbit/s": 1,
  "Gbit/s": 1e3,
  "B/s": 8e-6,
  "kB/s": 8e-3,
  "MB/s": 8,
  "GB/s": 8e3,
};

/** Data-rate sensor in Mbit/s whatever unit it reports (local: bit/s, native: Mbit/s). */
export function mbps(hass: HassObject | undefined, entityId?: string): number | null {
  const value = numeric(hass, entityId);
  if (value === null || !hass || !entityId) return null;
  const unit = String(hass.states[entityId].attributes.unit_of_measurement ?? "bit/s");
  return value * (RATE_TO_MBPS[unit] ?? 1e-6);
}

/** Signal quality as a fraction (0-1). */
export function signalRatio(hass: HassObject | undefined, e: ResolvedEntities): number {
  const value = numeric(hass, e.signal_quality);
  return value === null ? 0 : Math.max(0, Math.min(1, value / 100));
}
