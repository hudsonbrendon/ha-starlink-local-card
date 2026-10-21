/*! Starlink Local Card — the iconic Starlink dish for Home Assistant, driven by
 *  the starlink_local integration. Clean, white, brand-style illustration whose
 *  dish tilts to the real azimuth/elevation. MIT © Hudson Brendon. */

const CAM = { az: 32, el: 22 };
const RAD = Math.PI / 180;

// --- camera / projection --------------------------------------------------
function projection(width, height, pad = 16) {
  const sinA = Math.sin(CAM.az * RAD), cosA = Math.cos(CAM.az * RAD);
  const sinE = Math.sin(CAM.el * RAD), cosE = Math.cos(CAM.el * RAD);
  const flat = ([x, y, z]) => [x * sinA - y * cosA, (x * cosA + y * sinA) * sinE - z * cosE];
  const pts = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const z of [-4, 52])
    pts.push(flat([sx * 80, sy * 74, z]));
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
const pathOf = (pts, close = false) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("") + (close ? "Z" : "");
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

// --- Starlink Mini geometry (faithful to the official render) --------------
// A thin flat rounded-rectangle slab: bright white face, dark edge band, a
// small flip-out kickstand. It reclines to the dish's azimuth/elevation.
const SLAB = { a: 70, b: 56, r: 16, t: 4 };        // half-w, half-h, corner, thickness
const CENTER = [0, 0, 30];                          // slab centre, low to the ground
const add = (p, v, s = 1) => [p[0] + v[0] * s, p[1] + v[1] * s, p[2] + v[2] * s];

function frame(azDeg, elDeg) {
  const az = azDeg * RAD, el = elDeg * RAD, c = Math.cos, s = Math.sin;
  return {
    N: [c(el) * c(az), c(el) * s(az), s(el)],      // face normal (where it points)
    V: [-s(el) * c(az), -s(el) * s(az), c(el)],    // panel "up" (toward high edge)
    U: [-s(az), c(az), 0],                          // panel "right"
  };
}
// rounded-rectangle outline in the panel plane -> world points at nOff
function outline(F, nOff, steps = 80) {
  const { a, b, r } = SLAB, pts = [];
  const corners = [[a - r, b - r, 0], [-(a - r), b - r, Math.PI / 2], [-(a - r), -(b - r), Math.PI], [a - r, -(b - r), -Math.PI / 2]];
  const per = Math.max(5, Math.floor(steps / 4));
  for (const [cx, cy, a0] of corners)
    for (let i = 0; i <= per; i++) {
      const ang = a0 + (i / per) * (Math.PI / 2);
      let p = [...CENTER];
      p = add(p, F.U, cx + Math.cos(ang) * r);
      p = add(p, F.V, cy + Math.sin(ang) * r);
      p = add(p, F.N, nOff);
      pts.push(p);
    }
  return pts;
}

function miniSvg(P, azDeg, elDeg, { signal = 1, restricted = false, ghost = false } = {}) {
  const F = frame(azDeg, elDeg);
  const at = (p) => iso(p, P);
  const top = outline(F, SLAB.t).map(at);
  if (ghost) return `<path class="sl-ghost" d="${smoothPath(top)}"/>`;
  const bottom = outline(F, 0).map(at);
  const out = [];
  // dark edge band = bottom silhouette peeking under the white top
  out.push(`<path class="sl-rim" d="${smoothPath(bottom)}"/>`);
  // bright white array face
  out.push(`<path class="sl-face" d="${smoothPath(top)}"/>`);
  // soft sheen across the upper third of the face
  const hc = at(add(add([...CENTER], F.V, SLAB.b * 0.34), F.N, SLAB.t + 0.2));
  out.push(`<ellipse class="sl-sheen" cx="${hc[0].toFixed(1)}" cy="${hc[1].toFixed(1)}" rx="${(SLAB.a * 0.62 * P.scale).toFixed(1)}" ry="${(SLAB.b * 0.22 * P.scale).toFixed(1)}" transform="rotate(${(-CAM.az).toFixed(1)} ${hc[0].toFixed(1)} ${hc[1].toFixed(1)})"/>`);
  // faint Starlink wordmark toward the lower edge
  const lp = at(add(add([...CENTER], F.V, -SLAB.b * 0.6), F.N, SLAB.t + 0.3));
  out.push(`<text class="sl-logo" x="${lp[0].toFixed(1)}" y="${lp[1].toFixed(1)}">STARLINK</text>`);
  // face outline + restriction tint
  out.push(`<path class="sl-edge${restricted ? " warn" : ""}" d="${smoothPath(top)}"/>`);
  return out.join("");
}

function standSvg(P, azDeg, elDeg) {
  const F = frame(azDeg, elDeg);
  const at = (p) => iso(p, P);
  const out = [];
  // ground shadow under the slab
  const c0 = add([...CENTER], F.N, 0);
  const sh = [];
  for (let i = 0; i < 28; i++) { const t = (i / 28) * Math.PI * 2; sh.push(at([c0[0] + Math.cos(t) * SLAB.a * 0.95, c0[1] + 8 + Math.sin(t) * SLAB.b * 0.5, 0])); }
  out.push(`<path class="sl-shadow" d="${smoothPath(sh)}"/>`);
  // small flip-out kickstand: a slim triangular leg from the underside to ground
  const apex1 = add(add([...CENTER], F.U, 10), F.V, SLAB.b * 0.25);
  const apex2 = add(add([...CENTER], F.U, -10), F.V, SLAB.b * 0.25);
  const footW = [c0[0], c0[1] + 16, 0];
  out.push(`<path class="sl-stand" d="${pathOf([at(apex1), at(apex2), at(footW)], true)}"/>`);
  out.push(`<path class="sl-stand-sh" d="${pathOf([at(apex2), at(footW), at(add(footW, F.U, -3))], true)}"/>`);
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
      stand: this.shadowRoot.querySelector("#stand"),
      ghost: this.shadowRoot.querySelector("#ghost"),
      mini: this.shadowRoot.querySelector("#mini"),
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
    this._g.stand.innerHTML = standSvg(P, az, el);
    this._g.ghost.innerHTML = (t.daz != null && t.del != null && (Math.abs(t.daz - t.az) > 1.5 || Math.abs(t.del - t.el) > 1.5)) ? miniSvg(P, t.daz, t.del, { ghost: true }) : "";
    this._g.mini.innerHTML = miniSvg(P, az, el, { signal: this._cur.sig, restricted: t.restricted });
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
            <linearGradient id="slFace" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#eef2f7"/><stop offset="1" stop-color="#d6dce6"/>
            </linearGradient>
            <radialGradient id="slStage" cx="0.5" cy="0.46" r="0.6">
              <stop offset="0" stop-color="#ffffff" stop-opacity="0.10"/>
              <stop offset="0.6" stop-color="#ffffff" stop-opacity="0.03"/>
              <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <ellipse class="sl-spot" cx="300" cy="240" rx="300" ry="190"/>
          <g id="stand"></g><g id="ghost"></g><g id="mini"></g>
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
.sl-spot{fill:url(#slStage)}
.sl-shadow{fill:rgba(8,11,18,.38);filter:blur(9px)}
.sl-stand{fill:#e4e9f0;stroke:#c3ccd8;stroke-width:1}
.sl-stand-sh{fill:#c7cfdb;opacity:.9}
.sl-rim{fill:#31353d}
.sl-face{fill:url(#slFace)}
.sl-edge{fill:none;stroke:#aab4c3;stroke-width:1}
.sl-edge.warn{stroke:#f0a500;stroke-width:2}
.sl-sheen{fill:#ffffff;opacity:.4;filter:blur(7px)}
.sl-logo{fill:#aab2c0;font:700 6px/1 -apple-system,system-ui,sans-serif;letter-spacing:1.8px;text-anchor:middle;opacity:.55}
.sl-ghost{fill:none;stroke:var(--primary-color,#8ab4ff);stroke-width:1.4;stroke-dasharray:5 5;opacity:.6}
.readout{display:grid;grid-template-columns:repeat(4,1fr);gap:6px 10px;margin-top:4px}
.readout div{display:flex;flex-direction:column}
.readout label{font-size:.68rem;color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.04em}
.readout b{font-size:.98rem;font-variant-numeric:tabular-nums}
@media (prefers-color-scheme:dark){
  .sl-shadow{fill:rgba(0,0,0,.5)}
}`;

customElements.define("starlink-local-card", StarlinkLocalCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: "starlink-local-card", name: "Starlink Local Card", description: "Antena Starlink que aponta pro az/el real da integração starlink_local.", preview: true });
console.info("%c STARLINK-LOCAL-CARD %c v0.4.0 ", "background:#8ab4ff;color:#000;border-radius:3px 0 0 3px;padding:2px 4px", "background:#1b2130;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px");
