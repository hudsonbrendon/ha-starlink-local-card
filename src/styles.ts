import { css } from "lit";

export const cardStyles = css`
  :host {
    --slc-background: var(--ha-card-background, var(--card-background-color, transparent));
    --slc-primary-text-color: var(--primary-text-color);
    --slc-secondary-text-color: var(--secondary-text-color);
    --slc-divider-color: var(--entities-divider-color, var(--divider-color));
    --slc-ok: var(--success-color, #43a047);
    --slc-warning: var(--warning-color, #ffa600);
    --slc-error: var(--error-color, #db4437);
    --slc-spacing: 10px;
    --slc-accent: var(--primary-color, #03a9f4);
    /* illustration palette (themes / card-mod can override) */
    --slc-face: #f6f7f8;
    --slc-face-2: #e9eaec;
    --slc-edge: #cfd2d6;
    --slc-panel: #c3c8ce;
    --slc-outline: #9aa0a6;
    --slc-signal: 0;
    --slc-sheen: 0.55;
    --slc-sun: #ffb300;
    --slc-sun-low: #ff7043;
    --slc-cloud: #ffffff;
    --slc-cloud-dark: #d5d9de;
    --slc-rain: #90a4ae;
    --slc-sun-i: 1;
    --slc-orbit: 9s;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  :host([dark-mode]) {
    --slc-face: #4a4f58;
    --slc-face-2: #3a3f47;
    --slc-edge: #2a2e34;
    --slc-panel: #262a30;
    --slc-outline: #6b7178;
    --slc-sheen: 0.12;
    --slc-cloud: #5a6068;
    --slc-cloud-dark: #464b53;
    --slc-rain: #8a9fb0;
  }

  ha-card {
    background: var(--slc-background);
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .preview {
    position: relative;
    text-align: center;
  }
  .preview.not-available {
    filter: grayscale(1);
  }

  /* ── header ─────────────────────────────────────────────────────────── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .tips {
    display: flex;
    gap: var(--slc-spacing);
    flex-grow: 1;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--slc-spacing);
    color: var(--slc-secondary-text-color);
    font-size: 0.95rem;
  }
  .tip {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1;
    white-space: nowrap;
  }
  .tip ha-icon {
    --mdc-icon-size: 18px;
  }
  .tip.accent ha-icon {
    color: var(--slc-accent);
  }
  .tip.alarm {
    color: var(--slc-warning);
  }
  .more-info {
    color: var(--slc-secondary-text-color);
    margin: 2px;
  }

  /* ── illustration ───────────────────────────────────────────────────── */
  .hero {
    display: block;
    margin: 0 auto;
    cursor: pointer;
    width: min(86%, 340px);
  }
  .dish {
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .dish .ground {
    stroke: var(--slc-edge);
    stroke-width: 1.5;
    stroke-linecap: round;
  }
  .dish .logo {
    font: 700 7px Arial, Helvetica, sans-serif;
    letter-spacing: 2.6px;
    fill: var(--slc-outline);
  }
  .dish .led {
    fill: var(--slc-outline);
    transition: fill 0.4s ease;
  }
  .dish .stand {
    stroke: var(--slc-outline);
    stroke-width: 5;
    stroke-linecap: round;
  }
  .dish .cable {
    fill: none;
    stroke: var(--slc-outline);
    stroke-width: 2;
    stroke-linecap: round;
  }
  .dish .flow {
    fill: none;
    stroke: var(--slc-accent);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 3 9;
    opacity: 0;
  }
  .dish .wave {
    fill: none;
    stroke: var(--slc-accent);
    stroke-width: 3;
    stroke-linecap: round;
    opacity: 0;
  }
  .dish .wifi .wave {
    stroke-width: 2.4;
  }

  /* satellite: a small Starlink with two long wings */
  .dish .sat-body {
    fill: var(--slc-face);
    stroke: var(--slc-outline);
    stroke-width: 1;
  }
  .dish .sat-panel {
    fill: var(--slc-panel);
    stroke: var(--slc-outline);
    stroke-width: 1;
  }
  .dish .sat-line,
  .dish .sat-cell {
    stroke: var(--slc-outline);
    stroke-width: 1;
  }
  .dish .sat-cell {
    stroke: var(--slc-face);
  }
  .dish .sat-led {
    fill: var(--slc-accent);
  }
  .dish .beam {
    stroke: var(--slc-accent);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 2 6;
    opacity: 0;
  }

  .dish .heat {
    fill: #ffb74d;
    opacity: 0;
  }
  .dish .snow-face circle {
    fill: #ffffff;
    stroke: var(--slc-outline);
    stroke-width: 0.6;
  }
  .dish .compass-ring {
    fill: var(--slc-face);
    stroke: var(--slc-outline);
    stroke-width: 1.2;
  }
  .dish .compass-n {
    font: 700 7px Arial, Helvetica, sans-serif;
    fill: var(--slc-outline);
  }
  .dish .needle {
    fill: var(--slc-accent);
  }
  .dish .needle-tail {
    fill: var(--slc-outline);
  }
  .dish .compass-target {
    stroke: var(--slc-outline);
    stroke-width: 1.2;
    stroke-dasharray: 2 2;
  }
  .dish .zz {
    font: 700 16px Arial, Helvetica, sans-serif;
    fill: var(--slc-secondary-text-color);
  }
  .dish .zz2 {
    font-size: 12px;
  }
  .dish .orbit,
  .dish .snow-face,
  .dish .zz,
  .dish .warn {
    display: none;
  }

  /* ── sky: the sun follows sun.sun; low sun is orange and dim, high sun yellow */
  .dish .body {
    transition: transform 2s ease;
  }
  .dish .sun {
    --slc-sun-color: color-mix(in srgb, var(--slc-sun) calc(var(--slc-sun-i) * 100%), var(--slc-sun-low));
    transition: opacity 0.8s ease;
  }
  .dish .sun-core {
    fill: var(--slc-sun-color);
  }
  .dish .sun-rays {
    stroke: var(--slc-sun-color);
    transform-box: fill-box;
    transform-origin: center;
    animation: spin 24s linear infinite;
  }
  .dish .sun-glow {
    opacity: calc(0.2 + var(--slc-sun-i) * 0.8);
  }
  .dish .moon,
  .dish .stars {
    opacity: 0;
  }
  .dish .moon path,
  .dish .star {
    fill: var(--slc-outline);
  }
  .dish.night .body .sun {
    opacity: 0;
  }
  .dish.night .moon,
  .dish.night.wx-clear .stars,
  .dish.night.wx-wind .stars {
    opacity: 1;
  }
  .dish.night .star {
    animation: twinkle 3s ease-in-out infinite;
  }
  .dish.night .s2 {
    animation-delay: 1s;
  }
  .dish.night .s3 {
    animation-delay: 2s;
  }

  /* ── weather (wx-*: clear, partly, cloudy, fog, rain, pour, storm, snow, wind) */
  .dish .cloud,
  .dish .rain,
  .dish .snow,
  .dish .fog,
  .dish .bolt {
    display: none;
  }
  .dish .cloud-outline {
    fill: var(--slc-outline);
    stroke: var(--slc-outline);
    stroke-width: 2.6;
  }
  .dish .cloud-fill {
    fill: var(--slc-cloud);
  }
  .dish .drift {
    animation: drift 9s ease-in-out infinite alternate;
  }
  .dish .c2 .drift {
    animation-duration: 12s;
    animation-delay: -4s;
  }
  .dish .c3 .drift {
    animation-duration: 10s;
    animation-delay: -7s;
  }
  .dish.wx-partly .c-near,
  .dish.wx-wind .c-near,
  .dish.wx-wind .c3,
  .dish.wx-cloudy .cloud,
  .dish.wx-rain .cloud,
  .dish.wx-pour .cloud,
  .dish.wx-storm .cloud,
  .dish.wx-snow .cloud {
    display: inline;
  }
  .dish.wx-cloudy .sun,
  .dish.wx-rain .sun,
  .dish.wx-snow .sun {
    opacity: 0.35;
  }
  .dish.wx-pour .sun,
  .dish.wx-storm .sun {
    opacity: 0.15;
  }
  .dish.wx-fog .sun {
    opacity: 0.5;
  }
  .dish.wx-rain .cloud-fill,
  .dish.wx-pour .cloud-fill,
  .dish.wx-storm .cloud-fill {
    fill: var(--slc-cloud-dark);
  }
  .dish.wx-wind .drift {
    animation-duration: 3s;
  }
  .dish.wx-rain .rain,
  .dish.wx-pour .rain,
  .dish.wx-storm .rain {
    display: inline;
  }
  .dish .drop {
    stroke: var(--slc-rain);
    stroke-width: 2;
    stroke-linecap: round;
    opacity: 0;
    animation: fall 1.1s linear infinite;
  }
  .dish.wx-rain .drop.heavy {
    display: none;
  }
  .dish.wx-pour .drop,
  .dish.wx-storm .drop {
    animation-duration: 0.7s;
  }
  .dish.wx-storm .bolt {
    display: inline;
    fill: var(--slc-sun);
    opacity: 0;
    animation: flash 4s linear infinite;
  }
  .dish.wx-snow .snow {
    display: inline;
  }
  .dish .flake {
    fill: var(--slc-cloud);
    stroke: var(--slc-outline);
    stroke-width: 0.6;
    opacity: 0;
    animation: snowfall 3.6s linear infinite;
  }
  .dish.wx-fog .fog {
    display: inline;
  }
  .dish .fog line {
    stroke: var(--slc-outline);
    stroke-width: 4;
    stroke-linecap: round;
    opacity: 0.55;
    animation: drift 6s ease-in-out infinite alternate;
  }
  .dish .fog line:nth-child(even) {
    animation-delay: -3s;
  }

  /* ── dish state */
  /* connected: the satellite crosses overhead, the beam lights up while it is
     in view, data flows down the cable and the router broadcasts Wi-Fi */
  .dish.online .orbit,
  .dish.limited .orbit,
  .dish.alert .orbit,
  .dish.obstructed .orbit,
  .dish.heating .orbit,
  .dish.thermal .orbit {
    display: inline;
    animation: orbit var(--slc-orbit) linear infinite;
  }
  .dish .sat {
    animation: level var(--slc-orbit) linear infinite;
  }
  .dish .beam {
    animation:
      beam var(--slc-orbit) linear infinite,
      dash 0.8s linear infinite;
  }
  .dish.online .flow,
  .dish.limited .flow,
  .dish.alert .flow,
  .dish.obstructed .flow,
  .dish.heating .flow,
  .dish.thermal .flow {
    opacity: 1;
    animation: dash 1.2s linear infinite;
  }
  .dish.online .wifi .wave,
  .dish.limited .wifi .wave,
  .dish.alert .wifi .wave,
  .dish.obstructed .wifi .wave,
  .dish.heating .wifi .wave,
  .dish.thermal .wifi .wave {
    animation: wave 2.4s ease-out infinite;
  }
  .dish .w2,
  .dish .f2 {
    animation-delay: 0.4s !important;
  }
  .dish .w3,
  .dish .f3 {
    animation-delay: 0.8s !important;
  }
  .dish.online .led,
  .dish.heating .led {
    fill: var(--slc-ok);
    animation: breathe 2s ease-in-out infinite;
  }
  .dish.limited .beam,
  .dish.alert .beam,
  .dish.obstructed .beam,
  .dish.limited .flow,
  .dish.alert .flow,
  .dish.obstructed .flow {
    stroke: var(--slc-warning);
  }
  .dish.limited .led,
  .dish.alert .led,
  .dish.obstructed .led {
    fill: var(--slc-warning);
  }
  /* obstructed: the beam drops for part of every pass */
  .dish.obstructed .beam {
    animation:
      beam-blocked var(--slc-orbit) linear infinite,
      dash 0.8s linear infinite;
  }
  /* searching: no satellite, faint waves from the dish, blinking LED */
  .dish.searching .waves .wave {
    animation: wave 2.4s ease-out infinite;
  }
  .dish.searching .led {
    fill: var(--slc-accent);
    animation: blink 1s steps(2, start) infinite;
  }
  /* heating: warm glow and snow melting off the face */
  .dish.heating .heat {
    animation: warm 3s ease-in-out infinite;
  }
  .dish.heating .snow-face {
    display: inline;
    animation: melt 3s ease-in infinite;
  }
  /* thermal: red LED and warning */
  .dish.thermal .led {
    fill: var(--slc-error);
    animation: blink 0.8s steps(2, start) infinite;
  }
  .dish.thermal .warn {
    display: inline;
    animation: breathe 1.2s ease-in-out infinite;
  }
  /* sleeping: z z, LEDs off */
  .dish.sleeping .zz {
    display: inline;
    animation: zz 2.4s ease-in-out infinite;
  }
  .dish.sleeping .zz2 {
    animation-delay: 1.2s;
  }
  .dish.unavailable {
    opacity: 0.45;
  }

  @keyframes orbit {
    from {
      transform: rotate(-64deg);
    }
    to {
      transform: rotate(64deg);
    }
  }
  /* keeps the satellite roughly level while the arm sweeps */
  @keyframes level {
    0% {
      transform: rotate(48deg);
      opacity: 0;
    }
    8%,
    92% {
      opacity: 1;
    }
    100% {
      transform: rotate(-48deg);
      opacity: 0;
    }
  }
  @keyframes beam {
    0%,
    14%,
    86%,
    100% {
      opacity: 0;
    }
    24%,
    76% {
      opacity: 0.9;
    }
  }
  @keyframes beam-blocked {
    0%,
    44%,
    86%,
    100% {
      opacity: 0;
    }
    54%,
    76% {
      opacity: 0.9;
    }
  }
  @keyframes dash {
    to {
      stroke-dashoffset: -24;
    }
  }
  @keyframes wave {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes drift {
    from {
      transform: translateX(-6px);
    }
    to {
      transform: translateX(6px);
    }
  }
  @keyframes fall {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      transform: translate(-8px, 72px);
      opacity: 0;
    }
  }
  @keyframes snowfall {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    50% {
      transform: translate(5px, 36px);
    }
    100% {
      transform: translate(-3px, 72px);
      opacity: 0;
    }
  }
  @keyframes flash {
    0%,
    86%,
    90%,
    100% {
      opacity: 0;
    }
    87%,
    92% {
      opacity: 1;
    }
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes twinkle {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes blink {
    to {
      opacity: 0.2;
    }
  }
  @keyframes warm {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 0.35;
    }
  }
  @keyframes melt {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(14px);
    }
  }
  @keyframes zz {
    0%,
    100% {
      opacity: 0;
      transform: translateY(4px);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .dish * {
      animation: none !important;
    }
    .dish .orbit {
      transform: none;
    }
    .dish .beam,
    .dish .sat,
    .dish.online .wifi .wave,
    .dish .drop,
    .dish .flake {
      opacity: 0.8;
    }
  }

  /* ── metadata ───────────────────────────────────────────────────────── */
  .metadata {
    margin: var(--slc-spacing) auto;
  }
  .plant-name {
    text-align: center;
    font-weight: bold;
    color: var(--slc-primary-text-color);
    font-size: 16px;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--slc-secondary-text-color);
  }
  .status.thermal {
    color: var(--slc-error);
  }
  .status.limited,
  .status.alert,
  .status.obstructed {
    color: var(--slc-warning);
  }
  .signal {
    width: min(70%, 260px);
    margin: 6px auto 0;
  }
  .signal-bar {
    height: 6px;
    border-radius: 3px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
    overflow: hidden;
  }
  .signal-fill {
    height: 100%;
    border-radius: 3px;
    background: var(--slc-accent);
    transition: width 0.6s ease;
  }
  .signal-text {
    margin-top: 4px;
    font-size: 0.8rem;
    color: var(--slc-secondary-text-color);
  }

  .alignment {
    margin-top: 4px;
    font-size: 0.85rem;
    color: var(--slc-secondary-text-color);
  }

  /* ── stats ──────────────────────────────────────────────────────────── */
  .stats {
    border-top: 1px solid var(--slc-divider-color);
    display: flex;
    justify-content: space-evenly;
    color: var(--slc-secondary-text-color);
  }
  .stats-block {
    cursor: pointer;
    padding: var(--slc-spacing) 4px;
    text-align: center;
    border-right: 1px solid var(--slc-divider-color);
    flex-grow: 1;
    min-width: 0;
  }
  .stats-block:last-of-type {
    border-right: 0;
  }
  .stats-value {
    font-size: 20px;
    color: var(--slc-primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stats-subtitle {
    font-size: 0.85rem;
  }

  /* ── toolbar ────────────────────────────────────────────────────────── */
  .toolbar {
    min-height: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    border-top: 1px solid var(--slc-divider-color);
  }
  .toolbar .fill-gap {
    flex-grow: 1;
  }
  .toolbar ha-icon-button {
    color: var(--slc-secondary-text-color);
    width: 44px;
    height: 44px;
    --mdc-icon-button-size: 44px;
  }
  .toolbar ha-icon-button ha-icon {
    display: flex;
  }
  .toolbar .text-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: transparent;
    color: var(--slc-secondary-text-color);
    font: inherit;
    padding: 12px 10px;
    cursor: pointer;
    border-radius: 8px;
  }
  .toolbar .text-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .toolbar .text-button.active ha-icon {
    color: var(--slc-warning);
  }
  .toolbar .text-button.danger {
    color: var(--slc-error);
  }
  .toolbar .text-button ha-icon {
    --mdc-icon-size: 20px;
  }
`;
