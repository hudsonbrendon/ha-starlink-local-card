export const CARD_NAME = "starlink-local-card";
export const CARD_VERSION = "0.2.0";

/** Local gRPC integration (dish + router devices). */
export const PLATFORM = "starlink_local";
/** Home Assistant's built-in Starlink integration (adds reboot, stow, sleep, heating). */
export const NATIVE_PLATFORM = "starlink";

/** Card key -> `translation_key` of the starlink_local integration. */
export const LOCAL_KEYS = {
  downlink: "downlink",
  uplink: "uplink",
  pop_ping: "pop_ping",
  wan_ping: "wan_ping",
  signal_quality: "signal_quality",
  obstruction: "obstruction",
  azimuth: "azimuth",
  elevation: "elevation",
  desired_azimuth: "desired_azimuth",
  desired_elevation: "desired_elevation",
  gps_sats: "gps_sats",
  uptime: "uptime",
  clients: "clients",
  public_ip: "public_ip",
  radio_5ghz_temp: "radio_5ghz_temp",
  bandwidth_restricted: "bandwidth_restricted",
  snr_above_noise_floor: "snr_above_noise_floor",
  has_alerts: "has_alerts",
  dl_restricted_reason: "dl_restricted_reason",
  obstruction_map: "obstruction_map",
} as const;

/** Card key -> `translation_key` of the native starlink integration. */
export const NATIVE_KEYS = {
  native_download: "downlink_throughput",
  native_upload: "uplink_throughput",
  native_ping: "ping",
  native_azimuth: "azimuth",
  native_elevation: "elevation",
  native_obstructed: "currently_obstructed",
  heating: "heating",
  sleeping: "power_save_idle",
  thermal: "thermal_throttle",
  stowed: "stowed",
} as const;

export type EntityKey = keyof typeof LOCAL_KEYS | keyof typeof NATIVE_KEYS | "reboot" | "connectivity";

/** Visual states of the illustration (CSS classes on the SVG). */
export type StarlinkState =
  | "online"
  | "limited"
  | "alert"
  | "obstructed"
  | "searching"
  | "heating"
  | "thermal"
  | "sleeping"
  | "stowed"
  | "unavailable";

/** Obstruction (% of sky) above which the dish is shown as obstructed. */
export const OBSTRUCTED_PERCENT = 1;
