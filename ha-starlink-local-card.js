/*! Starlink Local Card — the iconic Starlink dish for Home Assistant, driven by
 *  the starlink_local integration. Clean, white, brand-style illustration whose
 *  dish tilts to the real azimuth/elevation. MIT © Hudson Brendon. */

const CAM = { az: 32, el: 22 };
const RAD = Math.PI / 180;

// --- camera / projection --------------------------------------------------
function projection(width, height, pad = 30) {
  const sinA = Math.sin(CAM.az * RAD), cosA = Math.cos(CAM.az * RAD);
  const sinE = Math.sin(CAM.el * RAD), cosE = Math.cos(CAM.el * RAD);
  const flat = ([x, y, z]) => [x * sinA - y * cosA, (x * cosA + y * sinA) * sinE - z * cosE];
  const pts = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const z of [-6, 150])
    pts.push(flat([sx * 70, sy * 70, z]));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const lo = [Math.min(...xs), Math.min(...ys)], hi = [Math.max(...xs), Math.max(...ys)];
  const scale = Math.min((width - pad * 2) / (hi[0] - lo[0]), (height - pad * 2) / (hi[1] - lo[1]));
  return {
    sinA, cosA, sinE, cosE, scale,
    ox: width / 2 - ((lo[0] + hi[0]) / 2) * scale,
    oy: height / 2 - ((lo[1] + hi[1]) / 2) * scale,
  };
}
function iso([x, y, z], P) {
  return [P.ox + (x * P.sinA - y * P.cosA) * P.scale,
          P.oy + ((x * P.cosA + y * P.sinA) * P.sinE - z * P.cosE) * P.scale];
}
const depth = ([x, y, z], P) => -((x * P.cosA + y * P.sinA) * P.cosE + z * P.sinE);
const smoothPath = (pts) => {
  // Catmull-Rom through projected points -> cubic Bézier, closed
  if (pts.length < 3) return "";
  const n = pts.length, d = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    if (i === 0) d.push(`M${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d.push(`C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`);
  }
  return d.join("") + "Z";
};

// --- dish geometry --------------------------------------------------------
const DISH = { a: 60, b: 40, r: 30, t: 9 };      // half-w, half-h, corner, thickness
const CENTER = [0, 0, 104];                        // dish centre on the mast
const BASE = [2, 24, 0];                           // foot on the ground
const add = (p, v, s = 1) => [p[0] + v[0] * s, p[1] + v[1] * s, p[2] + v[2] * s];

function frame(azDeg, elDeg) {
  const az = azDeg * RAD, el = elDeg * RAD, c = Math.cos, s = Math.sin;
  return {
    N: [c(el) * c(az), c(el) * s(az), s(el)],
    V: [-s(el) * c(az), -s(el) * s(az), c(el)],
    U: [-s(az), c(az), 0],
  };
}
// rounded-rectangle outline in the panel plane, returns world points at nOff
function outline(F, nOff, steps = 72) {
  const { a, b, r } = DISH;
  const pts = [];
  // superellipse-ish rounded rect via corner arcs
  const corners = [[a - r, b - r, 0], [-(a - r), b - r, Math.PI / 2], [-(a - r), -(b - r), Math.PI], [a - r, -(b - r), -Math.PI / 2]];
  const per = Math.max(4, Math.floor(steps / 4));
  for (const [cx, cy, a0] of corners)
    for (let i = 0; i <= per; i++) {
      const ang = a0 + (i / per) * (Math.PI / 2);
      const u = cx + Math.cos(ang) * r, v = cy + Math.sin(ang) * r;
      let p = [...CENTER];
      p = add(p, F.U, u); p = add(p, F.V, v); p = add(p, F.N, nOff);
      pts.push(p);
    }
  return pts;
}

function dishSvg(P, azDeg, elDeg, { signal = 1, restricted = false, ghost = false } = {}) {
  const F = frame(azDeg, elDeg);
  const at = (p) => iso(p, P);
  if (ghost) {
    const front = outline(F, DISH.t).map(at);
    return `<path class="sl-ghost" d="${smoothPath(front)}"/>`;
  }
  const out = [];
  const back = outline(F, 0).map(at);
  const front = outline(F, DISH.t).map(at);
  // thickness: rim fill = union silhouette (draw back, then front on top)
  out.push(`<path class="sl-rim" d="${smoothPath(back)}"/>`);
  // the dish face
  out.push(`<path class="sl-face" d="${smoothPath(front)}"/>`);
  // soft sheen: a highlight blob near the upper edge of the face
  const hi = add(add([...CENTER], F.V, DISH.b * 0.42), F.N, DISH.t + 0.2);
  const hl = add(add([...CENTER], F.U, -DISH.a * 0.3), F.N, DISH.t + 0.2);
  const hc = at(add(hi, F.U, -DISH.a * 0.2));
  out.push(`<ellipse class="sl-sheen" cx="${hc[0].toFixed(1)}" cy="${hc[1].toFixed(1)}" rx="${(DISH.a * 0.5 * P.scale).toFixed(1)}" ry="${(DISH.b * 0.26 * P.scale).toFixed(1)}" transform="rotate(${(-CAM.az).toFixed(1)} ${hc[0].toFixed(1)} ${hc[1].toFixed(1)})"/>`);
  // centre hub + faint logo
  const hub = at(add([...CENTER], F.N, DISH.t + 0.3));
  out.push(`<circle class="sl-hub" cx="${hub[0].toFixed(1)}" cy="${hub[1].toFixed(1)}" r="${(3.2 * P.scale).toFixed(1)}"/>`);
  const logoP = at(add(add([...CENTER], F.V, -DISH.b * 0.5), F.N, DISH.t + 0.3));
  out.push(`<text class="sl-logo" x="${logoP[0].toFixed(1)}" y="${logoP[1].toFixed(1)}">STARLINK</text>`);
  // face outline
  out.push(`<path class="sl-edge" d="${smoothPath(front)}"/>`);
  return out.join("");
}

function mastSvg(P, azDeg, elDeg) {
  const F = frame(azDeg, elDeg);
  const at = (p) => iso(p, P);
  const out = [];
  // ground shadow
  const sh = [];
  for (let i = 0; i < 28; i++) { const t = (i / 28) * Math.PI * 2; sh.push(at([BASE[0] + Math.cos(t) * 42, BASE[1] + Math.sin(t) * 20, 0])); }
  out.push(`<path class="sl-shadow" d="${smoothPath(sh)}"/>`);
  // base foot (flat oval)
  const foot = [];
  for (let i = 0; i < 28; i++) { const t = (i / 28) * Math.PI * 2; foot.push(at([BASE[0] + Math.cos(t) * 20, BASE[1] + Math.sin(t) * 11, 1.5])); }
  out.push(`<path class="sl-base" d="${smoothPath(foot)}"/>`);
  // mast: tapered neck from base up to the back of the dish
  const top = add([...CENTER], F.N, -2);          // just behind the dish
  const topS = at(top), baseS = at([BASE[0], BASE[1], 3]);
  const dx = baseS[0] - topS[0], dy = baseS[1] - topS[1], len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const wt = 4.2 * P.scale, wb = 6.2 * P.scale;
  out.push(`<path class="sl-mast" d="${
    `M${(topS[0]+nx*wt).toFixed(1)} ${(topS[1]+ny*wt).toFixed(1)}` +
    `L${(topS[0]-nx*wt).toFixed(1)} ${(topS[1]-ny*wt).toFixed(1)}` +
    `L${(baseS[0]-nx*wb).toFixed(1)} ${(baseS[1]-ny*wb).toFixed(1)}` +
    `L${(baseS[0]+nx*wb).toFixed(1)} ${(baseS[1]+ny*wb).toFixed(1)}Z`}"/>`);
  out.push(`<path class="sl-mast-hi" d="${`M${(topS[0]+nx*wt).toFixed(1)} ${(topS[1]+ny*wt).toFixed(1)}L${(baseS[0]+nx*wb).toFixed(1)} ${(baseS[1]+ny*wb).toFixed(1)}`}"/>`);
  return out.join("");
}

function beamSvg(P, azDeg, elDeg, { signal = 1, restricted = false }) {
  if (signal <= 0.02) return "";
  const F = frame(azDeg, elDeg);
  const at = (p) => iso(p, P);
  const out = [];
  const cls = restricted ? "sl-beam warn" : "sl-beam";
  for (const off of [-0.5, 0, 0.5]) {
    const a = add(add([...CENTER], F.U, off * DISH.a * 0.7), F.N, DISH.t);
    const b = add(a, F.N, 120);
    const pa = at(a), pb = at(b);
    out.push(`<line class="${cls}" x1="${pa[0].toFixed(1)}" y1="${pa[1].toFixed(1)}" x2="${pb[0].toFixed(1)}" y2="${pb[1].toFixed(1)}" style="opacity:${(0.5 * signal).toFixed(2)}"/>`);
  }
  return out.join("");
}

// --- card -----------------------------------------------------------------
const num = (s) => { const v = parseFloat(s); return Number.isFinite(v) ? v : null; };
const TOKENS = {
  azimuth: (e) => /azimuth/.test(e) && !/desired/.test(e),
  elevation: (e) => /elevation/.test(e) && !/desired/.test(e),
  desired_azimuth: (e) => /desired_azimuth/.test(e),
  desired_elevation: (e) => /desired_elevation/.test(e),
  signal: (e) => /signal_quality/.test(e),
  obstruction: (e) => /obstruction/.test(e) && !/map/.test(e),
  restricted: (e) => /bandwidth_restricted/.test(e),
  dl_reason: (e) => /dl_restricted_reason|downlink_restriction/.test(e),
  pop_ping: (e) => /(^|_)pop_ping/.test(e),
  downlink: (e) => /downlink_throughput$|_downlink$/.test(e),
  uplink: (e) => /uplink_throughput$|_uplink$/.test(e),
  clients: (e) => /_clients$|wifi_clients/.test(e),
};

class StarlinkLocalCard extends HTMLElement {
  setConfig(config) {
    this._config = config || {};
    this._cur = { az: 20, el: 55, sig: 0.7 };
    this._raf = 0;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this._shell();
    this._P = projection(620, 420);
    this._g = {
      mast: this.shadowRoot.querySelector("#mast"),
      beam: this.shadowRoot.querySelector("#beam"),
      ghost: this.shadowRoot.querySelector("#ghost"),
      dish: this.shadowRoot.querySelector("#dish"),
    };
  }
  getCardSize() { return 6; }
  set hass(hass) { this._hass = hass; this._read(); }

  _resolve() {
    const h = this._hass, cfg = this._config.entities || {}, found = {};
    for (const k of Object.keys(TOKENS)) if (cfg[k]) found[k] = cfg[k];
    for (const eid of Object.keys(h.states || {})) {
      const belongs = (h.entities && h.entities[eid] && h.entities[eid].platform === "starlink_local") || /starlink/.test(eid);
      if (!belongs) continue;
      for (const k of Object.keys(TOKENS)) if (!found[k] && TOKENS[k](eid)) found[k] = eid;
    }
    return found;
  }

  _read() {
    if (!this._hass || !this._config) return;
    const h = this._hass, ids = this._resolve();
    const st = (id) => (id && h.states[id] ? h.states[id].state : null);
    const az = num(st(ids.azimuth)), el = num(st(ids.elevation));
    let sig = num(st(ids.signal)); if (sig != null && sig > 1) sig /= 100;
    const r = st(ids.restricted);
    this._target = {
      az: az != null ? az : this._cur.az, el: el != null ? el : this._cur.el,
      daz: num(st(ids.desired_azimuth)), del: num(st(ids.desired_elevation)),
      sig: sig != null ? sig : 1, restricted: r === "on" || r === "true",
      reason: st(ids.dl_reason), obstruction: num(st(ids.obstruction)),
      pop_ping: num(st(ids.pop_ping)), downlink: num(st(ids.downlink)),
      uplink: num(st(ids.uplink)), clients: num(st(ids.clients)),
    };
    this._tick();
  }

  _tick() {
    const t = this._target; if (!t) return;
    const e = (a, b) => a + (b - a) * 0.16;
    this._cur.az = e(this._cur.az, t.az); this._cur.el = e(this._cur.el, t.el); this._cur.sig = e(this._cur.sig, t.sig);
    this._draw();
    const done = Math.abs(this._cur.az - t.az) < 0.05 && Math.abs(this._cur.el - t.el) < 0.05 && Math.abs(this._cur.sig - t.sig) < 0.004;
    cancelAnimationFrame(this._raf);
    if (!done) this._raf = requestAnimationFrame(() => this._tick());
  }

  _draw() {
    const t = this._target, P = this._P, az = this._cur.az, el = this._cur.el;
    this._g.mast.innerHTML = mastSvg(P, az, el);
    this._g.beam.innerHTML = beamSvg(P, az, el, { signal: this._cur.sig, restricted: t.restricted });
    this._g.ghost.innerHTML = (t.daz != null && t.del != null && (Math.abs(t.daz - t.az) > 1.5 || Math.abs(t.del - t.el) > 1.5)) ? dishSvg(P, t.daz, t.del, { ghost: true }) : "";
    this._g.dish.innerHTML = dishSvg(P, az, el, { signal: this._cur.sig, restricted: t.restricted });
    this._paint(t);
  }

  _paint(t) {
    const set = (s, v) => { const el = this.shadowRoot.querySelector(s); if (el && el.textContent !== v) el.textContent = v; };
    const mbps = (b) => (b == null ? "—" : `${(b / 1e6).toFixed(b < 1e7 ? 2 : 1)} Mb/s`);
    set("#r-az", t.az != null ? `${Math.round(t.az)}°` : "—");
    set("#r-el", t.el != null ? `${Math.round(t.el)}°` : "—");
    set("#r-sig", t.sig == null ? "—" : `${Math.round(t.sig * 100)}%`);
    set("#r-ping", t.pop_ping == null ? "—" : `${Math.round(t.pop_ping)} ms`);
    set("#r-down", mbps(t.downlink));
    set("#r-up", mbps(t.uplink));
    set("#r-clients", t.clients == null ? "—" : String(t.clients));
    const badge = this.shadowRoot.querySelector("#badge");
    if (t.restricted) { badge.hidden = false; badge.textContent = "⚠ Banda restrita" + (t.reason && t.reason !== "NONE" ? ` · ${t.reason}` : ""); }
    else badge.hidden = true;
    const off = (t.daz != null && t.del != null) ? Math.round(Math.abs(t.daz - t.az) + Math.abs(t.del - t.el)) : null;
    set("#aim", off == null ? "" : off <= 3 ? "Alinhado" : `Desalinhado ${off}°`);
    const title = this.shadowRoot.querySelector("#title");
    if (title) title.textContent = this._config.title || "Starlink";
  }

  _shell() {
    return `<style>${CARD_CSS}</style>
    <ha-card>
      <div class="wrap">
        <div class="head"><span id="title">Starlink</span><span id="aim" class="aim"></span></div>
        <div id="badge" class="badge" hidden></div>
        <svg viewBox="0 0 620 420" preserveAspectRatio="xMidYMid meet" aria-label="Starlink dish">
          <defs>
            <linearGradient id="slFace" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#ffffff"/><stop offset="0.55" stop-color="#eef1f6"/><stop offset="1" stop-color="#d4dae4"/>
            </linearGradient>
            <linearGradient id="slMast" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#e9edf3"/><stop offset="1" stop-color="#c4ccd9"/>
            </linearGradient>
            <radialGradient id="slHub" cx="0.4" cy="0.35" r="0.7">
              <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d1dd"/>
            </radialGradient>
          </defs>
          <g id="mast"></g><g id="beam"></g><g id="ghost"></g><g id="dish"></g>
        </svg>
        <div class="readout">
          <div><label>Azimute</label><b id="r-az">—</b></div>
          <div><label>Elevação</label><b id="r-el">—</b></div>
          <div><label>Sinal</label><b id="r-sig">—</b></div>
          <div><label>Ping</label><b id="r-ping">—</b></div>
          <div><label>Down</label><b id="r-down">—</b></div>
          <div><label>Up</label><b id="r-up">—</b></div>
          <div><label>Clientes</label><b id="r-clients">—</b></div>
        </div>
      </div>
    </ha-card>`;
  }
}

const CARD_CSS = `
:host{display:block}
ha-card{overflow:hidden}
.wrap{padding:12px 14px 14px}
.head{display:flex;justify-content:space-between;align-items:baseline;font-weight:600}
.head #title{font-size:1.05rem}
.aim{font-size:.8rem;color:var(--secondary-text-color)}
.badge{margin:8px 0 2px;padding:6px 10px;border-radius:8px;font-size:.82rem;font-weight:600;
  background:rgba(245,166,35,.16);color:#f0a500;border:1px solid rgba(245,166,35,.4)}
svg{width:100%;height:auto;display:block}
.sl-shadow{fill:rgba(15,22,38,.22);filter:blur(5px)}
.sl-base{fill:#c9d1dd;stroke:#aab4c4;stroke-width:1}
.sl-mast{fill:url(#slMast);stroke:#b2bbca;stroke-width:1}
.sl-mast-hi{fill:none;stroke:#ffffff;stroke-width:1.1;opacity:.5}
.sl-rim{fill:#b9c2d1}
.sl-face{fill:url(#slFace);stroke:none}
.sl-edge{fill:none;stroke:#aeb8c8;stroke-width:1.3}
.sl-sheen{fill:#ffffff;opacity:.45}
.sl-hub{fill:url(#slHub);stroke:#bcc5d3;stroke-width:.8}
.sl-logo{fill:#9aa4b5;font:600 7px/1 -apple-system,system-ui,sans-serif;letter-spacing:1.5px;text-anchor:middle;opacity:.8}
.sl-ghost{fill:none;stroke:var(--primary-color,#8ab4ff);stroke-width:1.4;stroke-dasharray:5 5;opacity:.55}
.sl-beam{stroke:#8ab4ff;stroke-width:2;stroke-linecap:round}
.sl-beam.warn{stroke:#f0a500}
.readout{display:grid;grid-template-columns:repeat(4,1fr);gap:6px 10px;margin-top:4px}
.readout div{display:flex;flex-direction:column}
.readout label{font-size:.68rem;color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.04em}
.readout b{font-size:.98rem;font-variant-numeric:tabular-nums}
@media (prefers-color-scheme:dark){
  .sl-shadow{fill:rgba(0,0,0,.4)}
  .sl-base{fill:#aeb7c6;stroke:#8c97a9}
}`;

customElements.define("starlink-local-card", StarlinkLocalCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: "starlink-local-card", name: "Starlink Local Card", description: "Antena Starlink que aponta pro az/el real da integração starlink_local.", preview: true });
console.info("%c STARLINK-LOCAL-CARD %c v0.2.0 ", "background:#8ab4ff;color:#000;border-radius:3px 0 0 3px;padding:2px 4px", "background:#1b2130;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px");
