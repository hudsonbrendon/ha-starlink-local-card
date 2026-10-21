/*! Starlink Local Card — an isometric Starlink Mini for Home Assistant,
 *  driven by the starlink_local integration. MIT © Hudson Brendon.
 *  Art method inspired by the "anatomy" isometric kit; the renderer here is a
 *  self-contained subset (no runtime dependency). */

const AZIMUTH = 46, ELEVATION = 30, UNIT = Math.sqrt(1.6);
const RAD = Math.PI / 180;

// --- isometric projection (same math as the anatomy kit) ------------------
function makeProjection(width, height, pad = 26) {
  const cam = { sinA: Math.sin(AZIMUTH * RAD), cosA: Math.cos(AZIMUTH * RAD),
                sinE: Math.sin(ELEVATION * RAD), cosE: Math.cos(ELEVATION * RAD) };
  const flat = ([x, y, z]) => [(x * cam.sinA - y * cam.cosA),
                               ((x * cam.cosA + y * cam.sinA) * cam.sinE - z * cam.cosE)];
  // fit a generous bounding cube so the panel never clips as it tilts
  const R = 92, pts = [];
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-0.4, 1.3])
    pts.push(flat([sx * R, sy * R, sz * R + 70]));
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const left = Math.min(...xs), right = Math.max(...xs);
  const up = Math.min(...ys), down = Math.max(...ys);
  const scale = Math.min((width - pad * 2) / (right - left), (height - pad * 2) / (down - up));
  const k = scale * UNIT;
  const origin = [width / 2 - ((left + right) / 2) * scale,
                  height / 2 - ((up + down) / 2) * scale];
  return { cam, k, origin };
}
function iso([x, y, z], P) {
  const { cam, k, origin } = P;
  return [origin[0] + (x * cam.sinA - y * cam.cosA) * k,
          origin[1] + ((x * cam.cosA + y * cam.sinA) * cam.sinE - z * cam.cosE) * k];
}
const pathOf = (pts, close = true) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("") + (close ? "Z" : "");
const depthOf = ([x, y, z], P) => {
  const { cam } = P; // larger = further back
  return -((x * cam.cosA + y * cam.sinA) * cam.cosE + z * cam.sinE);
};

// --- Starlink Mini geometry ----------------------------------------------
const PW = 119, PH = 104, PT = 14;           // panel width, height, thickness
const CENTER = [6, 0, 118];                   // panel centre (world; z up)
const add = (a, b, s = 1) => [a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s];

function frame(azDeg, elDeg) {
  const az = azDeg * RAD, el = elDeg * RAD;
  const c = Math.cos, s = Math.sin;
  const N = [c(el) * c(az), c(el) * s(az), s(el)];
  const V = [-s(el) * c(az), -s(el) * s(az), c(el)];
  const U = [-s(az), c(az), 0];
  const pp = (u, v, nOff = 0) => {
    let p = [...CENTER];
    p = add(p, U, (u * PW) / 2); p = add(p, V, (v * PH) / 2); p = add(p, N, nOff);
    return p;
  };
  return { N, V, U, pp };
}
const shadeOf = (nrm) => {
  const L = [-0.4, -0.5, 0.76];
  const b = Math.max(0, nrm[0] * L[0] + nrm[1] * L[1] + nrm[2] * L[2]);
  return b > 0.72 ? 0 : b > 0.48 ? 1 : b > 0.24 ? 2 : 3;
};
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const norm = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };

function panelSvg(P, azDeg, elDeg, { signal = 1, ghost = false } = {}) {
  const F = frame(azDeg, elDeg);
  const at = (p) => iso(p, P);
  const out = [];
  if (ghost) {
    const f = [F.pp(-1, 1, PT), F.pp(1, 1, PT), F.pp(1, -1, PT), F.pp(-1, -1, PT)];
    out.push(`<path class="sl-ghost" d="${pathOf(f.map(at))}"/>`);
    return out.join("");
  }
  // back face
  const back = [F.pp(-1, 1, 0), F.pp(1, 1, 0), F.pp(1, -1, 0), F.pp(-1, -1, 0)];
  out.push(`<path class="sl-fill" d="${pathOf(back.map(at))}"/><path class="sl-sh" data-sh="3" d="${pathOf(back.map(at))}"/>`);
  // rim faces back-to-front
  const edges = [[-1,1,1,1],[1,1,1,-1],[1,-1,-1,-1],[-1,-1,-1,1]].map(([au,av,bu,bv]) => {
    const c = [F.pp(au,av,PT), F.pp(bu,bv,PT), F.pp(bu,bv,0), F.pp(au,av,0)];
    const nrm = norm(cross(add(F.pp(bu,bv,PT), F.pp(au,av,PT), -1), add(F.pp(au,av,0), F.pp(au,av,PT), -1)));
    const z = c.reduce((t, p) => t + depthOf(p, P), 0) / 4;
    return { c, sh: shadeOf(nrm), z };
  }).sort((a, b) => a.z - b.z);
  for (const e of edges)
    out.push(`<path class="sl-fill" d="${pathOf(e.c.map(at))}"/><path class="sl-sh" data-sh="${e.sh}" d="${pathOf(e.c.map(at))}"/><path class="sl-edge" data-tone="faint" d="${pathOf(e.c.map(at))}"/>`);
  // front array face
  const front = [F.pp(-1,1,PT), F.pp(1,1,PT), F.pp(1,-1,PT), F.pp(-1,-1,PT)];
  out.push(`<path class="sl-array" d="${pathOf(front.map(at))}"/>`);
  out.push(`<path class="sl-sheen" d="${pathOf([F.pp(-0.96,0.96,PT+0.4),F.pp(0.96,0.96,PT+0.4),F.pp(0.9,0.62,PT+0.4),F.pp(-0.9,0.62,PT+0.4)].map(at))}"/>`);
  out.push(`<path class="sl-bezel" d="${pathOf([F.pp(-0.9,0.9,PT+0.3),F.pp(0.9,0.9,PT+0.3),F.pp(0.9,-0.9,PT+0.3),F.pp(-0.9,-0.9,PT+0.3)].map(at))}"/>`);
  // phased-array element grid, brightness scales with signal
  const cells = [];
  for (let i = 0; i < 24; i++) for (let j = 0; j < 21; j++) {
    const u = -0.84 + (i / 23) * 1.68, v = -0.84 + (j / 20) * 1.68;
    const [x, y] = at(F.pp(u, v, PT + 0.4));
    cells.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="0.9"/>`);
  }
  out.push(`<g class="sl-cells" style="opacity:${(0.35 + 0.65 * signal).toFixed(2)}">${cells.join("")}</g>`);
  // status LED
  const led = at(F.pp(-0.74, -0.74, PT + 0.6));
  out.push(`<circle class="sl-led" cx="${led[0].toFixed(1)}" cy="${led[1].toFixed(1)}" r="2.4"/>`);
  out.push(`<path class="sl-edge" data-tone="hi" d="${pathOf(front.map(at))}"/>`);
  return out.join("");
}

function kickstandSvg(P, azDeg, elDeg) {
  const F = frame(azDeg, elDeg);
  const at = (p) => iso(p, P);
  const out = [];
  // ground shadow under the panel
  const sh = [];
  for (let a = 0; a < 24; a++) {
    const t = (a / 24) * Math.PI * 2;
    sh.push(at([CENTER[0] + Math.cos(t) * 52, CENTER[1] + 20 + Math.sin(t) * 30, 0]));
  }
  out.push(`<path class="sl-shadow" d="${pathOf(sh)}"/>`);
  // flip-out leg from panel lower-back to the ground behind
  const hinge = F.pp(0, -0.98, 0);
  const foot = [CENTER[0], CENTER[1] + 46, 0];
  const w = 3.2, perp = [ -1, 0, 0 ]; // leg width along x
  const legA = [add(hinge, perp, w), add(hinge, perp, -w), add(foot, perp, -w), add(foot, perp, w)];
  out.push(`<path class="sl-fill" d="${pathOf(legA.map(at))}"/><path class="sl-sh" data-sh="2" d="${pathOf(legA.map(at))}"/><path class="sl-edge" data-tone="faint" d="${pathOf(legA.map(at))}"/>`);
  // foot pad + pivot
  const fx = at(foot);
  out.push(`<ellipse class="sl-foot" cx="${fx[0].toFixed(1)}" cy="${fx[1].toFixed(1)}" rx="7" ry="3.4"/>`);
  const hx = at(hinge);
  out.push(`<circle class="sl-pivot" cx="${hx[0].toFixed(1)}" cy="${hx[1].toFixed(1)}" r="2"/>`);
  return out.join("");
}

// --- the card -------------------------------------------------------------
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
  downlink: (e) => /downlink(_throughput)?$/.test(e) || /downlink$/.test(e),
  uplink: (e) => /uplink(_throughput)?$/.test(e) || /uplink$/.test(e),
  clients: (e) => /_clients$|wifi_clients/.test(e),
};

class StarlinkLocalCard extends HTMLElement {
  setConfig(config) {
    this._config = config || {};
    this._cur = { az: 20, el: 55, sig: 0.8 };
    this._raf = 0;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this._shell();
    this._svgPanel = this.shadowRoot.querySelector("#panel");
    this._svgGhost = this.shadowRoot.querySelector("#ghost");
    this._svgStand = this.shadowRoot.querySelector("#stand");
    this._P = makeProjection(620, 400);
  }
  getCardSize() { return 6; }

  set hass(hass) { this._hass = hass; this._read(); }

  _resolve() {
    const h = this._hass, cfg = this._config.entities || {};
    const found = {};
    // explicit config wins
    for (const key of Object.keys(TOKENS)) if (cfg[key]) found[key] = cfg[key];
    // auto-discover remaining from starlink_local platform (or 'starlink' in id)
    const ids = Object.keys(h.states || {});
    const fromPlatform = (eid) => h.entities && h.entities[eid] && h.entities[eid].platform === "starlink_local";
    for (const eid of ids) {
      const belongs = fromPlatform(eid) || /starlink/.test(eid);
      if (!belongs) continue;
      for (const key of Object.keys(TOKENS))
        if (!found[key] && TOKENS[key](eid)) found[key] = eid;
    }
    return found;
  }

  _read() {
    if (!this._hass || !this._config) return;
    const h = this._hass, ids = this._resolve();
    const st = (id) => (id && h.states[id] ? h.states[id].state : null);
    this._ids = ids;
    const az = num(st(ids.azimuth)), el = num(st(ids.elevation));
    const daz = num(st(ids.desired_azimuth)), del = num(st(ids.desired_elevation));
    let sig = num(st(ids.signal)); if (sig != null && sig > 1) sig = sig / 100;
    const restrictedState = st(ids.restricted);
    const restricted = restrictedState === "on" || restrictedState === "true";
    this._target = {
      az: az != null ? az : this._cur.az,
      el: el != null ? el : this._cur.el,
      daz, del,
      sig: sig != null ? sig : 1,
      obstruction: num(st(ids.obstruction)),
      restricted,
      reason: st(ids.dl_reason),
      pop_ping: num(st(ids.pop_ping)),
      downlink: num(st(ids.downlink)),
      uplink: num(st(ids.uplink)),
      clients: num(st(ids.clients)),
      available: az != null || el != null,
    };
    this._tick(true);
  }

  _tick(start) {
    const t = this._target; if (!t) return;
    const ease = (a, b) => a + (b - a) * 0.18;
    this._cur.az = ease(this._cur.az, t.az);
    this._cur.el = ease(this._cur.el, t.el);
    this._cur.sig = ease(this._cur.sig, t.sig);
    this._draw();
    const settled = Math.abs(this._cur.az - t.az) < 0.05 &&
                    Math.abs(this._cur.el - t.el) < 0.05 &&
                    Math.abs(this._cur.sig - t.sig) < 0.005;
    if (!settled) { cancelAnimationFrame(this._raf); this._raf = requestAnimationFrame(() => this._tick(false)); }
    else if (start) this._draw();
  }

  _draw() {
    const t = this._target, P = this._P;
    this._svgStand.innerHTML = kickstandSvg(P, this._cur.az, this._cur.el);
    this._svgPanel.innerHTML = panelSvg(P, this._cur.az, this._cur.el, { signal: this._cur.sig });
    this._svgGhost.innerHTML =
      (t.daz != null && t.del != null && (Math.abs(t.daz - t.az) > 1.5 || Math.abs(t.del - t.el) > 1.5))
        ? panelSvg(P, t.daz, t.del, { ghost: true }) : "";
    this._svgPanel.closest("svg").dataset.restricted = t.restricted ? "1" : "0";
    this._paint(t);
  }

  _paint(t) {
    const set = (sel, text) => { const el = this.shadowRoot.querySelector(sel); if (el && el.textContent !== text) el.textContent = text; };
    const fmt = (v, u, d = 0) => (v == null ? "—" : `${v.toFixed(d)}${u}`);
    const mbps = (bps) => (bps == null ? "—" : `${(bps / 1e6).toFixed(bps < 1e7 ? 2 : 1)} Mb/s`);
    set("#r-az", t.az != null ? `${Math.round(t.az)}°` : "—");
    set("#r-el", t.el != null ? `${Math.round(t.el)}°` : "—");
    set("#r-sig", fmt(t.sig * 100, "%"));
    set("#r-ping", fmt(t.pop_ping, " ms"));
    set("#r-down", mbps(t.downlink));
    set("#r-up", mbps(t.uplink));
    set("#r-clients", t.clients != null ? String(t.clients) : "—");
    const badge = this.shadowRoot.querySelector("#badge");
    if (t.restricted) { badge.hidden = false; badge.textContent = "⚠ Banda restrita" + (t.reason && t.reason !== "NONE" ? ` · ${t.reason}` : ""); }
    else badge.hidden = true;
    const off = (t.daz != null && t.del != null) ? Math.round(Math.abs(t.daz - t.az) + Math.abs(t.del - t.el)) : null;
    set("#aim", off == null ? "" : off <= 3 ? "Alinhado" : `Desalinhado ${off}°`);
    const title = this.shadowRoot.querySelector("#title");
    if (title) title.textContent = this._config.title || "Starlink Mini";
  }

  _shell() {
    return `<style>${CARD_CSS}</style>
    <ha-card>
      <div class="wrap">
        <div class="head"><span id="title">Starlink Mini</span><span id="aim" class="aim"></span></div>
        <div id="badge" class="badge" hidden></div>
        <svg viewBox="0 0 620 400" preserveAspectRatio="xMidYMid meet" aria-label="Starlink Mini">
          <g id="stand"></g><g id="ghost"></g><g id="panel"></g>
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
.readout{display:grid;grid-template-columns:repeat(4,1fr);gap:6px 10px;margin-top:6px}
.readout div{display:flex;flex-direction:column}
.readout label{font-size:.68rem;color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.04em}
.readout b{font-size:.98rem;font-variant-numeric:tabular-nums}
/* isometric palette, theme-aware via HA vars with fallbacks */
.sl-fill{fill:var(--card-background-color,#14161c)}
.sl-sh{stroke:none}
.sl-sh[data-sh="0"]{fill:#2b3345}.sl-sh[data-sh="1"]{fill:#232a39}
.sl-sh[data-sh="2"]{fill:#1b2130}.sl-sh[data-sh="3"]{fill:#141926}
.sl-edge{fill:none;stroke:#3a4760;stroke-width:1}
.sl-edge[data-tone="hi"]{stroke:#6b7a96;stroke-width:1.2}
.sl-edge[data-tone="faint"]{stroke:#2a3140}
.sl-array{fill:#1b2130}
.sl-sheen{fill:#2a3346;opacity:.55}
.sl-bezel{fill:none;stroke:#39465f;stroke-width:1}
.sl-cells circle{fill:#4a5a78}
.sl-led{fill:#39d98a;filter:drop-shadow(0 0 4px #39d98a)}
.sl-ghost{fill:none;stroke:var(--primary-color,#6b7a96);stroke-width:1.4;stroke-dasharray:4 4;opacity:.5}
.sl-shadow{fill:rgba(0,0,0,.28);filter:blur(5px)}
.sl-foot{fill:#1b2130;stroke:#3a4760;stroke-width:.8}
.sl-pivot{fill:#2b3345;stroke:#3a4760;stroke-width:.8}
svg[data-restricted="1"] .sl-led{fill:#f0a500;filter:drop-shadow(0 0 5px #f0a500)}
@media (prefers-color-scheme: light){
  .sl-sh[data-sh="0"]{fill:#e7edf6}.sl-sh[data-sh="1"]{fill:#d7deea}
  .sl-sh[data-sh="2"]{fill:#c6d0e0}.sl-sh[data-sh="3"]{fill:#b4c0d4}
  .sl-edge{stroke:#9fb0c8}.sl-edge[data-tone="hi"]{stroke:#5f708c}
  .sl-array{fill:#cfd8e6}.sl-sheen{fill:#eef2f8;opacity:.7}
  .sl-bezel{stroke:#9fb0c8}.sl-cells circle{fill:#8fa0ba}
  .sl-shadow{fill:rgba(40,50,70,.18)}
  .sl-foot{fill:#cfd8e6;stroke:#9fb0c8}.sl-pivot{fill:#b4c0d4;stroke:#9fb0c8}
}`;

customElements.define("starlink-local-card", StarlinkLocalCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "starlink-local-card",
  name: "Starlink Local Card",
  description: "Antena Starlink Mini isométrica, animada pelo estado da integração starlink_local.",
  preview: true,
});
console.info("%c STARLINK-LOCAL-CARD %c v0.1.0 ", "background:#39d98a;color:#000;border-radius:3px 0 0 3px;padding:2px 4px", "background:#1b2130;color:#fff;border-radius:0 3px 3px 0;padding:2px 4px");
