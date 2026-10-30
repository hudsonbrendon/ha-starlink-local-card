import type { EntityRegistryEntry, HassObject, HassState } from "../../src/types";

export const DISH = "dev-dish";
export const ROUTER = "dev-router";
export const NATIVE = "dev-native";
const L = "starlink_local";

export interface MockOpts {
  downlink?: string;
  pop_ping?: string;
  obstruction?: string;
  snr?: string;
  restricted?: string;
  alerts?: string;
  heating?: string;
  sleeping?: string;
  thermal?: string;
  stowed?: string;
  native?: boolean;
  local?: boolean;
  darkMode?: boolean;
  language?: string;
}

export interface MockHass extends HassObject {
  _calls: Array<{ domain: string; service: string; service_data?: Record<string, unknown> }>;
}

type Def = [string, string | null, string, string, string, Record<string, unknown>?];

export function mockHass(opts: MockOpts = {}): MockHass {
  const local: Def[] = [
    // [entity_id, translation_key, platform, device, state, attributes]
    ["sensor.starlink_dish_taxa_de_download", "downlink", L, DISH, opts.downlink ?? "87300000", { unit_of_measurement: "bit/s" }],
    ["sensor.starlink_dish_taxa_de_upload", "uplink", L, DISH, "9400000", { unit_of_measurement: "bit/s" }],
    ["sensor.starlink_dish_latencia_de_ping_pop", "pop_ping", L, DISH, opts.pop_ping ?? "31", { unit_of_measurement: "ms" }],
    ["sensor.starlink_router_latencia_de_ping_pop", "pop_ping", L, ROUTER, "99", { unit_of_measurement: "ms" }],
    ["sensor.starlink_dish_qualidade_do_sinal", "signal_quality", L, DISH, "92", { unit_of_measurement: "%" }],
    ["sensor.starlink_dish_fracao_obstruida", "obstruction", L, DISH, opts.obstruction ?? "0.2", { unit_of_measurement: "%" }],
    ["sensor.starlink_dish_azimute_da_antena", "azimuth", L, DISH, "20.4", { unit_of_measurement: "°" }],
    ["sensor.starlink_dish_elevacao_da_antena", "elevation", L, DISH, "55.2", { unit_of_measurement: "°" }],
    ["sensor.starlink_dish_azimute_desejado", "desired_azimuth", L, DISH, "18", { unit_of_measurement: "°" }],
    ["sensor.starlink_dish_satelites_gps", "gps_sats", L, DISH, "14"],
    ["sensor.starlink_router_clientes_wi_fi", "clients", L, ROUTER, "6"],
    ["binary_sensor.starlink_dish_snr_acima_do_ruido", "snr_above_noise_floor", L, DISH, opts.snr ?? "on"],
    ["binary_sensor.starlink_dish_banda_restringida", "bandwidth_restricted", L, DISH, opts.restricted ?? "off"],
    ["sensor.starlink_dish_motivo_da_restricao_de_download", "dl_restricted_reason", L, DISH, "LOW_SPEED_POLICY_LIMIT"],
    ["binary_sensor.starlink_dish_possui_alertas", "has_alerts", L, DISH, opts.alerts ?? "off"],
    ["camera.starlink_dish_mapa_de_obstrucao", "obstruction_map", L, DISH, "idle"],
  ];
  const native: Def[] = [
    ["sensor.starlink_download", "downlink_throughput", "starlink", NATIVE, "50.5", { unit_of_measurement: "Mbit/s" }],
    ["sensor.starlink_ping", "ping", "starlink", NATIVE, "40", { unit_of_measurement: "ms" }],
    ["binary_sensor.starlink_aquecimento", "heating", "starlink", NATIVE, opts.heating ?? "off"],
    ["binary_sensor.starlink_sleep", "power_save_idle", "starlink", NATIVE, opts.sleeping ?? "off"],
    ["binary_sensor.starlink_acelerador_termico", "thermal_throttle", "starlink", NATIVE, opts.thermal ?? "off"],
    ["switch.starlink_stowed", "stowed", "starlink", NATIVE, opts.stowed ?? "off"],
    ["button.starlink_reiniciar", null, "starlink", NATIVE, "unknown"],
    ["binary_sensor.starlink_conectividade", null, "starlink", NATIVE, "on", { device_class: "connectivity" }],
    ["binary_sensor.starlink_atualizacao", null, "starlink", NATIVE, "off", { device_class: "update" }],
  ];
  const defs = [...(opts.local === false ? [] : local), ...(opts.native === false ? [] : native)];
  const states: Record<string, HassState> = {};
  const entities: Record<string, EntityRegistryEntry> = {};
  for (const [id, tk, platform, device, state, attrs] of defs) {
    states[id] = { entity_id: id, state, attributes: { friendly_name: id, ...(attrs ?? {}) } };
    entities[id] = { entity_id: id, translation_key: tk, platform, device_id: device };
  }
  const calls: MockHass["_calls"] = [];
  return {
    states,
    entities,
    devices: {
      [DISH]: { id: DISH, name: "Starlink Dish", config_entries: ["e1"] },
      [ROUTER]: { id: ROUTER, name: "Starlink Router", config_entries: ["e1"] },
      [NATIVE]: { id: NATIVE, name: "Starlink", config_entries: ["e2"] },
    },
    locale: { language: opts.language ?? "en" },
    themes: { darkMode: opts.darkMode ?? false },
    formatEntityState: (o) => `${o.state}${o.attributes.unit_of_measurement ? " " + o.attributes.unit_of_measurement : ""}`,
    callService(domain, service, service_data) {
      calls.push({ domain, service, service_data });
      return Promise.resolve();
    },
    _calls: calls,
  };
}
