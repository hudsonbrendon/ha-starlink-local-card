import { svg, type TemplateResult } from "lit";

export interface DishPose {
  /** Visible face height as a fraction (see faceHeight): 1 = facing the viewer, ~0.4 = flat. */
  face: number;
  azimuth: number | null;
  desiredAzimuth: number | null;
}

const BASE = 172; // y of the bottom edge of the panel (it rests on the ground)
const CX = 160;
const X0 = 68;
const X1 = 252;

/** Rounded polygon: each corner cut back by `r` and joined with a quadratic curve. */
function rounded(points: Array<[number, number]>, r: number): string {
  const n = points.length;
  const toward = (a: [number, number], b: [number, number]): [number, number] => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const t = Math.min(r, len / 2) / len;
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  };
  const f = (p: [number, number]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  let d = "";
  points.forEach((p, i) => {
    const a = toward(p, points[(i - 1 + n) % n]);
    const b = toward(p, points[(i + 1) % n]);
    d += `${i ? "L" : "M"}${f(a)} Q${f(p)} ${f(b)} `;
  });
  return d + "Z";
}

function wave(cls: string, cy: number, r: number): TemplateResult {
  const dx = (0.866 * r).toFixed(1);
  const y = (cy - 0.5 * r).toFixed(1);
  return svg`<path class="wave ${cls}" d="M${CX - Number(dx)} ${y} A${r} ${r} 0 0 1 ${CX + Number(dx)} ${y}" />`;
}

/**
 * Inline illustration: a Starlink Mini on its kickstand, reclined to the real
 * elevation, a compass needle on the azimuth and a satellite crossing the sky.
 *
 * Animated parts carry classes targeted by styles.ts: `.wave`, `.sat`, `.led`,
 * `.tree`, `.heat`, `.snow`, `.zz`, `.warn`. Colours come from CSS variables
 * so themes and dark mode restyle it.
 */
export function dishSvg(state: string, pose: DishPose): TemplateResult {
  const h = 120 * pose.face;
  const top = BASE - h;
  // the top edge recedes as the panel reclines (perspective)
  const inset = (22 * (1 - pose.face)) / 0.62;
  const face = rounded(
    [
      [X0 + inset, top],
      [X1 - inset, top],
      [X1, BASE],
      [X0, BASE],
    ],
    16
  );
  const waveY = top - 4;
  return svg`
    <svg class="dish ${state}" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
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
        <clipPath id="slc-face-clip"><path d="${face}" /></clipPath>
        <g id="slc-canopy">
          <circle cx="292" cy="112" r="15" /><circle cx="282" cy="124" r="10" /><circle cx="302" cy="124" r="10" />
        </g>
      </defs>

      <!-- shadow -->
      <ellipse cx="160" cy="180" rx="104" ry="6" fill="rgba(0,0,0,0.12)" />

      <!-- satellite crossing the sky -->
      <g class="sat"><g transform="scale(1.5)">
        <rect x="-19" y="-2.5" width="12" height="5" rx="1" class="sat-panel" />
        <rect x="7" y="-2.5" width="12" height="5" rx="1" class="sat-panel" />
        <line x1="-7" y1="0" x2="7" y2="0" class="sat-line" />
        <rect x="-5" y="-3.5" width="10" height="7" rx="1.5" class="sat-body" />
      </g></g>

      <!-- obstruction: a tree in the field of view -->
      <g class="tree">
        <rect x="289" y="120" width="6" height="58" rx="2" class="trunk" />
        <use href="#slc-canopy" class="canopy-outline" />
        <use href="#slc-canopy" class="canopy-fill" />
      </g>

      <!-- signal waves -->
      <g class="waves">${wave("w1", waveY, 16)} ${wave("w2", waveY, 30)} ${wave("w3", waveY, 44)}</g>

      <!-- panel: edge band under the face, resting on the ground -->
      <rect x="${X0 + 2}" y="${BASE - 4}" width="${X1 - X0 - 4}" height="9" rx="4.5" fill="var(--slc-edge)"
            stroke="var(--slc-outline)" stroke-width="1.2" />
      <path class="face" d="${face}" fill="url(#slc-face-grad)" stroke="var(--slc-outline)" stroke-width="1.5" />
      <g clip-path="url(#slc-face-clip)">
        <rect x="${X0}" y="${top}" width="${X1 - X0}" height="${h}" fill="url(#slc-sheen)" />
        <rect class="heat" x="${X0}" y="${top}" width="${X1 - X0}" height="${h}" />
        <g class="snow">
          <circle cx="104" cy="${top + h * 0.3}" r="2.4" /><circle cx="136" cy="${top + h * 0.62}" r="2" />
          <circle cx="188" cy="${top + h * 0.36}" r="2.6" /><circle cx="220" cy="${top + h * 0.7}" r="2" />
        </g>
      </g>
      <text x="${CX}" y="${top + h / 2 + 2.5}" text-anchor="middle" class="logo">STARLINK</text>
      <circle class="led" cx="${X1 - 18}" cy="${BASE + 0.5}" r="2.4" />

      <!-- compass: needle on the azimuth, dashed line on the desired azimuth -->
      ${pose.azimuth === null
        ? ""
        : svg`
          <g class="compass">
            <circle cx="34" cy="164" r="14" class="compass-ring" />
            <text x="34" y="156" text-anchor="middle" class="compass-n">N</text>
            ${pose.desiredAzimuth === null
              ? ""
              : svg`<line x1="34" y1="164" x2="34" y2="152" class="compass-target"
                          transform="rotate(${pose.desiredAzimuth.toFixed(0)} 34 164)" />`}
            <g transform="rotate(${pose.azimuth.toFixed(0)} 34 164)">
              <polygon points="34,153 37,164 31,164" class="needle" />
              <polygon points="34,175 37,164 31,164" class="needle-tail" />
            </g>
          </g>`}

      <!-- sleep / thermal markers -->
      <text class="zz" x="252" y="${top - 4}">z</text>
      <text class="zz zz2" x="264" y="${top - 16}">z</text>
      <g class="warn" transform="translate(0 ${top - 34})">
        <path d="M160 0 l13 22 h-26 z" fill="var(--slc-error)" />
        <rect x="158.7" y="6.5" width="2.6" height="8" rx="1" fill="#fff" />
        <circle cx="160" cy="18" r="1.5" fill="#fff" />
      </g>
    </svg>
  `;
}
