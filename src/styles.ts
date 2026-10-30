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
  .dish .logo {
    font: 700 7px Arial, Helvetica, sans-serif;
    letter-spacing: 2.6px;
    fill: var(--slc-outline);
  }
  .dish .led {
    fill: var(--slc-outline);
    transition: fill 0.4s ease;
  }
  .dish .wave {
    fill: none;
    stroke: var(--slc-accent);
    stroke-width: 3;
    stroke-linecap: round;
    opacity: 0;
  }
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
  .dish .sat-line {
    stroke: var(--slc-outline);
    stroke-width: 1.2;
  }
  .dish .trunk {
    fill: var(--slc-edge);
    stroke: var(--slc-outline);
    stroke-width: 1.2;
  }
  .dish .canopy-outline {
    fill: var(--slc-outline);
    stroke: var(--slc-outline);
    stroke-width: 2.6;
  }
  .dish .canopy-fill {
    fill: var(--slc-face);
  }
  .dish .heat {
    fill: #ffb74d;
    opacity: 0;
  }
  .dish .snow circle {
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
  .dish .sat,
  .dish .tree,
  .dish .snow,
  .dish .zz,
  .dish .warn {
    display: none;
  }

  /* online / limited / alert / obstructed: waves pulse up, a satellite crosses */
  .dish.online .wave,
  .dish.limited .wave,
  .dish.alert .wave,
  .dish.obstructed .wave,
  .dish.heating .wave,
  .dish.thermal .wave {
    animation: wave 2.4s ease-out infinite;
  }
  .dish .w2 {
    animation-delay: 0.4s !important;
  }
  .dish .w3 {
    animation-delay: 0.8s !important;
  }
  .dish.online .sat,
  .dish.limited .sat,
  .dish.alert .sat,
  .dish.obstructed .sat,
  .dish.heating .sat {
    display: inline;
    animation: orbit 16s linear infinite;
  }
  .dish.online .led,
  .dish.heating .led {
    fill: var(--slc-ok);
    animation: breathe 2s ease-in-out infinite;
  }
  .dish.limited .wave,
  .dish.alert .wave,
  .dish.obstructed .wave {
    stroke: var(--slc-warning);
  }
  .dish.limited .led,
  .dish.alert .led,
  .dish.obstructed .led {
    fill: var(--slc-warning);
  }
  /* obstructed: a tree in the way, waves stutter */
  .dish.obstructed .tree {
    display: inline;
  }
  .dish.obstructed .w3 {
    animation-name: stutter;
  }
  /* searching: faint waves, blinking LED, no satellite */
  .dish.searching .wave {
    animation: breathe 2.4s ease-in-out infinite;
    opacity: 0.3;
  }
  .dish.searching .led {
    fill: var(--slc-accent);
    animation: blink 1s steps(2, start) infinite;
  }
  /* heating: warm glow and snow melting off the face */
  .dish.heating .heat {
    animation: warm 3s ease-in-out infinite;
  }
  .dish.heating .snow {
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
  /* sleeping: z z, LED off */
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
  @keyframes stutter {
    0%,
    40%,
    100% {
      opacity: 0;
    }
    20% {
      opacity: 0.6;
    }
  }
  @keyframes orbit {
    0% {
      transform: translate(18px, 52px) rotate(-12deg);
      opacity: 0;
    }
    8% {
      opacity: 1;
    }
    50% {
      transform: translate(160px, 16px) rotate(0deg);
    }
    92% {
      opacity: 1;
    }
    100% {
      transform: translate(302px, 52px) rotate(12deg);
      opacity: 0;
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
    .dish.online .wave,
    .dish.limited .wave,
    .dish.alert .wave {
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
