import { svg, type TemplateResult } from "lit";
import type { SkyPosition, Weather } from "../helpers/sky";

export interface DishPose {
  /** Boresight elevation in degrees (90 = face flat, looking straight up). */
  elevation: number | null;
  azimuth: number | null;
  desiredAzimuth: number | null;
}

type Pt = [number, number];
type V3 = [number, number, number];

const GROUND = 180;
const OX = 132; // screen x of the dish's bottom edge centre
const YAW = (-24 * Math.PI) / 180; // turned a little so the face reads in 3/4
const CAM = (20 * Math.PI) / 180; // camera looks slightly down
const W = 100; // Starlink Mini face, local units
const H = 84;

/** Orthographic 3D -> SVG: x right, y up, z toward the viewer. */
function project([x, y, z]: V3): Pt {
  const xr = x * Math.cos(YAW) + z * Math.sin(YAW);
  const zr = -x * Math.sin(YAW) + z * Math.cos(YAW);
  return [OX + xr, GROUND - (y * Math.cos(CAM) - zr * Math.sin(CAM))];
}

const add = (a: V3, b: V3, k = 1): V3 => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
const f = (n: number) => n.toFixed(1);

/** Affine matrix mapping the flat face (x -W/2..W/2, y 0 top..H bottom) onto the tilted panel. */
function faceMatrix(bottom: V3, up: V3): string {
  const o = project(add(bottom, up, H));
  const b = project(bottom);
  const ex = project(add(bottom, [1, 0, 0]));
  const ey = project(add(bottom, up));
  return `matrix(${f(ex[0] - b[0])} ${f(ex[1] - b[1])} ${f(b[0] - ey[0])} ${f(b[1] - ey[1])} ${f(o[0])} ${f(o[1])})`;
}

function wave(cls: string, [cx, cy]: Pt, r: number): TemplateResult {
  const dx = 0.766 * r;
  const y = cy - 0.643 * r;
  return svg`<path class="wave ${cls}" d="M${f(cx - dx)} ${f(y)} A${r} ${r} 0 0 1 ${f(cx + dx)} ${f(y)}" />`;
}

const RAYS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  const c = Math.cos(a);
  const n = Math.sin(a);
  return svg`<line x1="${f(15 * c)}" y1="${f(15 * n)}" x2="${f(20 * c)}" y2="${f(20 * n)}" />`;
});

const cloud = (cls: string, x: number, y: number, scale = 1): TemplateResult => svg`
  <g class="cloud ${cls}" transform="translate(${x} ${y}) scale(${scale})">
    <g class="drift">
      <use href="#slc-cloud" class="cloud-outline" />
      <use href="#slc-cloud" class="cloud-fill" />
    </g>
  </g>
`;

// [x, y, delay s, heavy-only]
const DROPS: Array<[number, number, number, boolean]> = [
  [52, 52, 0, false], [66, 56, -0.45, false], [80, 52, -0.2, true], [92, 54, -0.7, false],
  [146, 40, -0.3, false], [158, 44, -0.8, true], [170, 40, -0.1, false], [182, 42, -0.55, true],
  [228, 46, -0.65, false], [240, 48, -0.25, true], [252, 46, -0.9, false], [264, 48, -0.4, false],
  [60, 60, -0.85, true], [246, 52, -0.15, true],
];

const STARS: Array<[number, number, number, string]> = [
  [36, 26, 1.3, ""], [104, 14, 1.1, "s2"], [214, 22, 1.4, "s3"], [298, 40, 1.1, "s2"], [74, 48, 1, "s3"],
];

/**
 * Inline illustration: a Starlink Mini on its kickstand, reclined to the real
 * elevation, talking to a satellite that orbits overhead, wired to the router.
 * The sky (sun / moon on its arc, clouds, rain, snow, fog, stars) follows
 * `sun.sun` and the weather entity, like the solar card.
 *
 * Animated parts carry classes targeted by styles.ts: `.orbit` (satellite +
 * beam), `.wave`, `.wifi`, `.flow`, `.led`, `.heat`, `.snow-face`,
 * `.zz`, `.warn` and the sky classes. Colours come from CSS variables so
 * themes and dark mode restyle it.
 */
export function dishSvg(state: string, pose: DishPose, weather: Weather = "clear", sky?: SkyPosition): TemplateResult {
  const elevation = Math.max(0, Math.min(90, pose.elevation ?? 65));
  const tilt = ((90 - elevation) * Math.PI) / 180; // face angle from horizontal
  const up: V3 = [0, Math.sin(tilt), -Math.cos(tilt)]; // along the face, bottom -> top
  const normal: V3 = [0, Math.cos(tilt), Math.sin(tilt)];
  const bottom: V3 = [0, 4, 18];
  const face = faceMatrix(bottom, up);
  const edge = faceMatrix(add(bottom, normal, -6), up);

  // kickstand: from the back of the panel down to the ground behind it
  const hinge = add(add(bottom, up, H * 0.55), normal, -6);
  const foot = project([0, 0, hinge[2] - 10 - 22 * Math.sin(tilt)]);
  const hingePt = project(hinge);
  const centre = project(add(add(bottom, up, H / 2), normal, 2));
  const base = project([0, 0, bottom[2]]);

  const radius = centre[1] - 20;
  const sx = sky?.x ?? 286;
  const sy = sky?.y ?? 30;
  const routerX = 262;

  return svg`
    <svg class="dish ${state} wx-${weather}" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
         role="img" aria-label="Starlink dish">
      <defs>
        <linearGradient id="slc-face-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--slc-face)" />
          <stop offset="1" stop-color="var(--slc-face-2)" />
        </linearGradient>
        <linearGradient id="slc-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.35" stop-color="#ffffff" stop-opacity="0" />
          <stop offset="0.5" stop-color="#ffffff" stop-opacity="var(--slc-sheen)" />
          <stop offset="0.65" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
        <radialGradient id="slc-sun-glow">
          <stop offset="0" stop-color="#ffd54f" stop-opacity="0.85" />
          <stop offset="1" stop-color="#ffd54f" stop-opacity="0" />
        </radialGradient>
        <clipPath id="slc-face-clip"><rect x="${-W / 2}" y="0" width="${W}" height="${H}" rx="12" /></clipPath>
        <g id="slc-cloud">
          <circle cx="-12" cy="2" r="7" /><circle cx="0" cy="-4" r="10" /><circle cx="12" cy="1" r="8" />
          <rect x="-12" y="0" width="24" height="9" />
        </g>
      </defs>

      <!-- stars (clear nights) -->
      <g class="stars">
        ${STARS.map(([x, y, r, c]) => svg`<circle class="star ${c}" cx="${x}" cy="${y}" r="${r}" />`)}
      </g>

      <!-- sun by day, moon by night, on an arc that follows the real sun -->
      <g class="body" style="transform: translate(${f(sx)}px, ${f(sy)}px)">
        <g class="sun">
          <circle class="sun-glow" r="22" fill="url(#slc-sun-glow)" />
          <g class="sun-rays" stroke-width="2.4" stroke-linecap="round">${RAYS}</g>
          <circle class="sun-core" r="10" />
        </g>
        <g class="moon"><path d="M4 -12 a12 12 0 1 0 8 20 a9.5 9.5 0 1 1 -8 -20 z" /></g>
        ${cloud("c-near", 16, 10, 1)}
      </g>

      <!-- weather -->
      ${cloud("c1", 70, 42, 1.3)} ${cloud("c2", 164, 30, 1.15)} ${cloud("c3", 246, 38, 1.4)}
      <polygon class="bolt" points="170,40 163,54 169,54 164,66 177,50 171,50 175,40" />

      <!-- satellite on an orbit over the dish, with the data beam down to it -->
      <g class="orbit" style="transform-origin: ${f(centre[0])}px ${f(centre[1])}px">
        <line class="beam" x1="${f(centre[0])}" y1="${f(centre[1] - 12)}"
              x2="${f(centre[0])}" y2="${f(centre[1] - radius + 10)}" />
        <g class="sat" style="transform-origin: ${f(centre[0])}px ${f(centre[1] - radius)}px">
          <g transform="translate(${f(centre[0])} ${f(centre[1] - radius)}) scale(1.35)">
            <rect x="-34" y="-3" width="26" height="6" rx="1" class="sat-panel" />
            <line x1="-8" y1="0" x2="-5" y2="0" class="sat-line" />
            <rect x="-5" y="-4" width="10" height="8" rx="1.5" class="sat-body" />
            <line x1="5" y1="0" x2="8" y2="0" class="sat-line" />
            <rect x="8" y="-3" width="26" height="6" rx="1" class="sat-panel" />
            <line x1="-21" y1="-3" x2="-21" y2="3" class="sat-cell" />
            <line x1="21" y1="-3" x2="21" y2="3" class="sat-cell" />
            <circle class="sat-led" cx="0" cy="5.5" r="1.4" />
          </g>
        </g>
      </g>


      <!-- ground and shadows -->
      <line x1="18" y1="${GROUND}" x2="302" y2="${GROUND}" class="ground" />
      <ellipse cx="${f(base[0] - 6)}" cy="${GROUND + 2}" rx="${f(54 + 12 * Math.sin(tilt))}" ry="5"
               fill="rgba(0,0,0,0.12)" />
      <ellipse cx="${routerX}" cy="${GROUND + 2}" rx="20" ry="3.5" fill="rgba(0,0,0,0.12)" />

      <!-- cable: dish -> router, data flowing along it -->
      <path class="cable" d="M${f(foot[0])} ${f(foot[1])} C ${f(foot[0] + 40)} ${GROUND + 6}, ${routerX - 40} ${GROUND + 6}, ${routerX} ${GROUND - 2}" />
      <path class="flow" d="M${f(foot[0])} ${f(foot[1])} C ${f(foot[0] + 40)} ${GROUND + 6}, ${routerX - 40} ${GROUND + 6}, ${routerX} ${GROUND - 2}" />

      <!-- kickstand -->
      <line x1="${f(hingePt[0])}" y1="${f(hingePt[1])}" x2="${f(foot[0])}" y2="${f(foot[1])}" class="stand" />

      <!-- panel: edge slab behind, face on top (drawn flat, mapped onto the tilt) -->
      <g transform="${edge}">
        <rect x="${-W / 2}" y="0" width="${W}" height="${H}" rx="12" fill="var(--slc-edge)"
              stroke="var(--slc-outline)" stroke-width="1.4" vector-effect="non-scaling-stroke" />
      </g>
      <g transform="${face}">
        <rect class="face" x="${-W / 2}" y="0" width="${W}" height="${H}" rx="12" fill="url(#slc-face-grad)"
              stroke="var(--slc-outline)" stroke-width="1.5" vector-effect="non-scaling-stroke" />
        <g clip-path="url(#slc-face-clip)">
          <rect x="${-W / 2}" y="0" width="${W}" height="${H}" fill="url(#slc-sheen)" />
          <rect class="heat" x="${-W / 2}" y="0" width="${W}" height="${H}" />
          <g class="snow-face">
            <circle cx="-28" cy="22" r="3" /><circle cx="-8" cy="58" r="2.6" />
            <circle cx="20" cy="28" r="3.2" /><circle cx="32" cy="64" r="2.6" />
          </g>
        </g>
        <text x="0" y="${H / 2 + 3}" text-anchor="middle" class="logo">STARLINK</text>
        <circle class="led" cx="${W / 2 - 12}" cy="${H - 8}" r="2.4" />
      </g>

      <!-- signal waves (searching) -->
      <g class="waves">${wave("w1", centre, 14)} ${wave("w2", centre, 26)} ${wave("w3", centre, 38)}</g>

      <!-- router: the tall Starlink cone, Wi-Fi rising from its tip -->
      <g class="router">
        <path d="M${routerX - 14} ${GROUND - 1} L${routerX - 5} ${GROUND - 50} Q${routerX} ${GROUND - 56} ${routerX + 5} ${GROUND - 50} L${routerX + 14} ${GROUND - 1} Q${routerX} ${GROUND + 2} ${routerX - 14} ${GROUND - 1} Z"
              fill="url(#slc-face-grad)" stroke="var(--slc-outline)" stroke-width="1.4" stroke-linejoin="round" />
        <circle class="led router-led" cx="${routerX}" cy="${GROUND - 12}" r="1.8" />
        <g class="wifi">
          ${wave("f1", [routerX, GROUND - 56], 8)} ${wave("f2", [routerX, GROUND - 56], 15)}
          ${wave("f3", [routerX, GROUND - 56], 22)}
        </g>
      </g>

      <!-- precipitation and fog fall in front of everything -->
      <g class="rain">
        ${DROPS.map(([x, y, d, heavy]) => svg`<line class="drop ${heavy ? "heavy" : ""}" x1="${x}" y1="${y}" x2="${x - 2}" y2="${y + 8}" style="animation-delay:${d}s" />`)}
      </g>
      <g class="snow">
        ${DROPS.map(([x, y, d]) => svg`<circle class="flake" cx="${x}" cy="${y}" r="1.7" style="animation-delay:${d * 3}s" />`)}
      </g>
      <g class="fog">
        <line x1="30" y1="76" x2="186" y2="76" /><line x1="108" y1="90" x2="290" y2="90" />
        <line x1="24" y1="104" x2="200" y2="104" /><line x1="96" y1="118" x2="270" y2="118" />
      </g>

      <!-- compass: needle on the azimuth, dashed line on the desired azimuth -->
      ${pose.azimuth === null
        ? ""
        : svg`
          <g class="compass">
            <circle cx="28" cy="164" r="13" class="compass-ring" />
            <text x="28" y="157" text-anchor="middle" class="compass-n">N</text>
            ${pose.desiredAzimuth === null
              ? ""
              : svg`<line x1="28" y1="164" x2="28" y2="153" class="compass-target"
                          transform="rotate(${pose.desiredAzimuth.toFixed(0)} 28 164)" />`}
            <g transform="rotate(${pose.azimuth.toFixed(0)} 28 164)">
              <polygon points="28,154 31,164 25,164" class="needle" />
              <polygon points="28,174 31,164 25,164" class="needle-tail" />
            </g>
          </g>`}

      <!-- sleep / thermal markers -->
      <text class="zz" x="${f(centre[0] + 44)}" y="${f(centre[1] - 24)}">z</text>
      <text class="zz zz2" x="${f(centre[0] + 56)}" y="${f(centre[1] - 36)}">z</text>
      <g class="warn" transform="translate(${f(centre[0] - 160)} ${f(centre[1] - 58)})">
        <path d="M160 0 l13 22 h-26 z" fill="var(--slc-error)" />
        <rect x="158.7" y="6.5" width="2.6" height="8" rx="1" fill="#fff" />
        <circle cx="160" cy="18" r="1.5" fill="#fff" />
      </g>
    </svg>
  `;
}
