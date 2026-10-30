import type { HassObject } from "../types";

/** Weather scene drawn in the sky (CSS class `wx-<scene>` on the SVG). */
export type Weather = "clear" | "partly" | "cloudy" | "fog" | "rain" | "pour" | "storm" | "snow" | "wind";

const CONDITIONS: Record<string, Weather> = {
  sunny: "clear",
  "clear-night": "clear",
  exceptional: "clear",
  partlycloudy: "partly",
  cloudy: "cloudy",
  fog: "fog",
  rainy: "rain",
  hail: "rain",
  pouring: "pour",
  lightning: "storm",
  "lightning-rainy": "storm",
  snowy: "snow",
  "snowy-rainy": "snow",
  windy: "wind",
  "windy-variant": "wind",
};

/** Configured weather entity, else HA's default names, else the first weather.* entity. */
export function findWeather(hass: HassObject | undefined, configured?: string): string | undefined {
  if (configured) return configured;
  if (!hass) return undefined;
  for (const id of ["weather.home", "weather.forecast_home"]) if (hass.states[id]) return id;
  return Object.keys(hass.states)
    .filter((id) => id.startsWith("weather."))
    .sort()[0];
}

export function weatherScene(hass: HassObject | undefined, entityId?: string): Weather {
  const state = entityId ? hass?.states[entityId]?.state : undefined;
  return (state && CONDITIONS[state]) || "clear";
}

export interface SkyPosition {
  /** Centre of the sun (or moon) in SVG units. */
  x: number;
  y: number;
  /** 0..1, from the sun elevation (0 at night). */
  intensity: number;
}

const DAY = 86_400_000;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Where the sun (by day) or the moon (by night) sits on an arc over the roof,
 * from `sun.sun`: progress between the last and next rising/setting, height
 * along the arc, intensity from the elevation.
 */
export function skyPosition(hass: HassObject | undefined, now = Date.now()): SkyPosition {
  const sun = hass?.states["sun.sun"];
  const hour = new Date(now).getHours() + new Date(now).getMinutes() / 60;
  const day = sun ? sun.state === "above_horizon" : hour >= 6 && hour < 18;
  const rising = Date.parse(String(sun?.attributes.next_rising));
  const setting = Date.parse(String(sun?.attributes.next_setting));
  // HA only exposes the *next* events: the previous one is ~24 h earlier.
  const [start, end] = day ? [rising - DAY, setting] : [setting - DAY, rising];
  const progress = clamp(
    end > start ? (now - start) / (end - start) : day ? (hour - 6) / 12 : ((hour + 6) % 24) / 12
  );
  const elevation = Number(sun?.attributes.elevation);
  const intensity = !day
    ? 0
    : Number.isFinite(elevation)
      ? clamp(Math.sin((elevation * Math.PI) / 180) / Math.sin((65 * Math.PI) / 180))
      : Math.sin(Math.PI * progress);
  return {
    x: 24 + 272 * progress,
    y: 64 - 50 * Math.sin(Math.PI * progress),
    intensity,
  };
}
