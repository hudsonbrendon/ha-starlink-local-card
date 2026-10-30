function t(t,e,i,s){var n,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(a=(o<3?n(a):o>3?n(e,i,a):n(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:r,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",_=u.reactiveElementPolyfillSupport,g=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!r(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[g("elementProperties")]=new Map,$[g("finalized")]=new Map,_?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,k=w.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+E,C=`<${z}>`,P=document,M=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,H=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,I=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=B(1),F=B(2),G=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,K=P.createTreeWalker(P,129);function Y(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",a=R;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===R?"!--"===l[1]?a=T:void 0!==l[1]?a=H:void 0!==l[2]?(I.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=D):void 0!==l[3]&&(a=D):a===D?">"===l[0]?(a=n??R,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?D:'"'===l[3]?j:L):a===j||a===L?a=D:a===T||a===H?a=R:(a=D,n=void 0);const d=a===D&&t[e+1].startsWith("/>")?" ":"";o+=a===R?i+C:c>=0?(s.push(r),i.slice(0,c)+S+i.slice(c)+E+d):i+E+(-2===c?e:d)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const a=t.length-1,r=this.parts,[l,c]=Z(t,e);if(this.el=J.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[o++],i=s.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?st:"@"===a[1]?nt:et}),s.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),K.nextNode(),r.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===z)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)r.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===G)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);K.currentNode=s;let n=K.nextNode(),o=0,a=0,r=i[0];for(;void 0!==r;){if(o===r.index){let e;2===r.type?e=new tt(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new ot(n,this,t)),this._$AV.push(e),r=i[++a]}o!==r?.index&&(n=K.nextNode(),o++)}return K.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new tt(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Q(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const s=t;let a,r;for(t=n[0],a=0;a<n.length-1;a++)r=Q(this,s[i+a],e,a),r===G&&(r=this._$AH[a]),o||=!O(r)||r!==this._$AH[a],r===W?t=W:t!==W&&(t+=(r??"")+n[a+1]),this._$AH[a]=r}o&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class nt extends et{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===G)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(J,tt),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class lt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new tt(e.insertBefore(M(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}lt._$litElement$=!0,lt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:lt});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:lt}),(rt.litElementVersions??=[]).push("4.2.2");const ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},dt=(t=ht,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}const ut=172,ft=68,mt=252;function _t(t,e,i){const s=(.866*i).toFixed(1),n=(e-.5*i).toFixed(1);return F`<path class="wave ${t}" d="M${160-Number(s)} ${n} A${i} ${i} 0 0 1 ${160+Number(s)} ${n}" />`}function gt(t,e){const i=120*e.face,s=ut-i,n=22*(1-e.face)/.62,o=function(t,e){const i=t.length,s=(t,i)=>{const s=Math.hypot(i[0]-t[0],i[1]-t[1]),n=Math.min(e,s/2)/s;return[t[0]+(i[0]-t[0])*n,t[1]+(i[1]-t[1])*n]},n=t=>`${t[0].toFixed(1)} ${t[1].toFixed(1)}`;let o="";return t.forEach((e,a)=>{const r=s(e,t[(a-1+i)%i]),l=s(e,t[(a+1)%i]);o+=`${a?"L":"M"}${n(r)} Q${n(e)} ${n(l)} `}),o+"Z"}([[ft+n,s],[mt-n,s],[mt,ut],[ft,ut]],16),a=s-4;return F`
    <svg class="dish ${t}" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
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
        <clipPath id="slc-face-clip"><path d="${o}" /></clipPath>
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
      <g class="waves">${_t("w1",a,16)} ${_t("w2",a,30)} ${_t("w3",a,44)}</g>

      <!-- panel: edge band under the face, resting on the ground -->
      <rect x="${70}" y="${168}" width="${180}" height="9" rx="4.5" fill="var(--slc-edge)"
            stroke="var(--slc-outline)" stroke-width="1.2" />
      <path class="face" d="${o}" fill="url(#slc-face-grad)" stroke="var(--slc-outline)" stroke-width="1.5" />
      <g clip-path="url(#slc-face-clip)">
        <rect x="${ft}" y="${s}" width="${184}" height="${i}" fill="url(#slc-sheen)" />
        <rect class="heat" x="${ft}" y="${s}" width="${184}" height="${i}" />
        <g class="snow">
          <circle cx="104" cy="${s+.3*i}" r="2.4" /><circle cx="136" cy="${s+.62*i}" r="2" />
          <circle cx="188" cy="${s+.36*i}" r="2.6" /><circle cx="220" cy="${s+.7*i}" r="2" />
        </g>
      </g>
      <text x="${160}" y="${s+i/2+2.5}" text-anchor="middle" class="logo">STARLINK</text>
      <circle class="led" cx="${234}" cy="${172.5}" r="2.4" />

      <!-- compass: needle on the azimuth, dashed line on the desired azimuth -->
      ${null===e.azimuth?"":F`
          <g class="compass">
            <circle cx="34" cy="164" r="14" class="compass-ring" />
            <text x="34" y="156" text-anchor="middle" class="compass-n">N</text>
            ${null===e.desiredAzimuth?"":F`<line x1="34" y1="164" x2="34" y2="152" class="compass-target"
                          transform="rotate(${e.desiredAzimuth.toFixed(0)} 34 164)" />`}
            <g transform="rotate(${e.azimuth.toFixed(0)} 34 164)">
              <polygon points="34,153 37,164 31,164" class="needle" />
              <polygon points="34,175 37,164 31,164" class="needle-tail" />
            </g>
          </g>`}

      <!-- sleep / thermal markers -->
      <text class="zz" x="252" y="${s-4}">z</text>
      <text class="zz zz2" x="264" y="${s-16}">z</text>
      <g class="warn" transform="translate(0 ${s-34})">
        <path d="M160 0 l13 22 h-26 z" fill="var(--slc-error)" />
        <rect x="158.7" y="6.5" width="2.6" height="8" rx="1" fill="#fff" />
        <circle cx="160" cy="18" r="1.5" fill="#fff" />
      </g>
    </svg>
  `}const vt="starlink-local-card",yt="starlink_local",bt=t=>new Map(Object.entries(t).map(([t,e])=>[e,t])),$t=bt({downlink:"downlink",uplink:"uplink",pop_ping:"pop_ping",wan_ping:"wan_ping",signal_quality:"signal_quality",obstruction:"obstruction",azimuth:"azimuth",elevation:"elevation",desired_azimuth:"desired_azimuth",desired_elevation:"desired_elevation",gps_sats:"gps_sats",uptime:"uptime",clients:"clients",public_ip:"public_ip",radio_5ghz_temp:"radio_5ghz_temp",bandwidth_restricted:"bandwidth_restricted",snr_above_noise_floor:"snr_above_noise_floor",has_alerts:"has_alerts",dl_restricted_reason:"dl_restricted_reason",obstruction_map:"obstruction_map"}),wt=bt({native_download:"downlink_throughput",native_upload:"uplink_throughput",native_ping:"ping",native_azimuth:"azimuth",native_elevation:"elevation",native_obstructed:"currently_obstructed",heating:"heating",sleeping:"power_save_idle",thermal:"thermal_throttle",stowed:"stowed"}),xt=[["downlink","native_download"],["uplink","native_upload"],["pop_ping","native_ping"],["azimuth","native_azimuth"],["elevation","native_elevation"]];function kt(t,e){const i={},s=t?.entities;if(s&&t){let n;if(e.device){const i=new Set(t.devices?.[e.device]?.config_entries??[]);n=new Set([e.device]);for(const e of Object.values(t.devices??{}))(e.config_entries??[]).some(t=>i.has(t))&&n.add(e.id)}const o=Object.values(s).sort((t,i)=>Number(i.device_id===e.device)-Number(t.device_id===e.device));for(const e of o){let s;if(e.platform===yt){if(n&&(!e.device_id||!n.has(e.device_id)))continue;s=e.translation_key?$t.get(e.translation_key):void 0}else if("starlink"===e.platform){const i=e.entity_id.split(".")[0];s=e.translation_key?wt.get(e.translation_key):"button"===i?"reboot":"binary_sensor"===i&&"connectivity"===t.states[e.entity_id]?.attributes.device_class?"connectivity":void 0}s&&!i[s]&&(i[s]=e.entity_id)}for(const[t,e]of xt)i[t]??=i[e]}return{...i,...e.entities??{}}}const At=(t,e)=>{const i=e?t.states[e]?.state:void 0;return void 0!==i&&"unavailable"!==i&&"unknown"!==i},St=(t,e)=>!!e&&"on"===t.states[e]?.state;function Et(t,e){if(!e||!t)return null;const i=Number(t.states[e]?.state);return Number.isFinite(i)?i:null}const zt={"bit/s":1e-6,"kbit/s":.001,"Mbit/s":1,"Gbit/s":1e3,"B/s":8e-6,"kB/s":.008,"MB/s":8,"GB/s":8e3};function Ct(t){const e=t??60;return.38+.62*Math.cos(Math.max(0,Math.min(90,e))*Math.PI/180)}var Pt={common:{name:"Starlink Local Card",description:"Card animado da antena Starlink para a integração Starlink Local.",not_available:"Antena indisponível",missing_entity:"Escolha o dispositivo da antena Starlink (ou defina entities.downlink).",invalid_config:"Configuração inválida",more_info:"Mais informações",alignment:"Azimute {azimuth}° · Elevação {elevation}°",signal:"Sinal {percent}%",clients:"{count} clientes",reboot:"Reiniciar antena",confirm_reboot:"Reiniciar a antena Starlink? A internet cai por alguns minutos.",stow:"Guardar",unstow:"Desguardar",confirm_stow:"Guardar a antena? Ela para de conectar até ser desguardada.",confirm_unstow:"Desguardar a antena?",obstruction_map:"Mapa de obstrução",restricted:"Restrita: {reason}"},status:{online:"Conectada",limited:"Banda restringida",alert:"Conectada com alertas",obstructed:"Obstruída",searching:"Procurando satélites",heating:"Derretendo neve",thermal:"Limitada por temperatura",sleeping:"Dormindo",stowed:"Guardada",unavailable:"Indisponível"},stat:{download:"Download",upload:"Upload",ping:"Ping",obstruction:"Obstrução",signal:"Sinal",gps_sats:"Satélites GPS",uptime:"Ligada há"},editor:{device:"Dispositivo da antena",name:"Nome",show_name:"Mostrar nome",show_status:"Mostrar status",show_toolbar:"Mostrar barra de ações",compact_view:"Modo compacto"}};const Mt={en:{common:{name:"Starlink Local Card",description:"Animated Starlink dish card for the Starlink Local integration.",not_available:"Dish unavailable",missing_entity:"Pick the Starlink dish device (or set entities.downlink).",invalid_config:"Invalid configuration",more_info:"More info",alignment:"Azimuth {azimuth}° · Elevation {elevation}°",signal:"Signal {percent}%",clients:"{count} clients",reboot:"Reboot dish",confirm_reboot:"Reboot the Starlink dish? The internet drops for a few minutes.",stow:"Stow",unstow:"Unstow",confirm_stow:"Stow the dish? It stops connecting until unstowed.",confirm_unstow:"Unstow the dish?",obstruction_map:"Obstruction map",restricted:"Restricted: {reason}"},status:{online:"Connected",limited:"Bandwidth restricted",alert:"Connected with alerts",obstructed:"Obstructed",searching:"Searching for satellites",heating:"Melting snow",thermal:"Thermal throttling",sleeping:"Sleeping",stowed:"Stowed",unavailable:"Unavailable"},stat:{download:"Download",upload:"Upload",ping:"Ping",obstruction:"Obstruction",signal:"Signal",gps_sats:"GPS satellites",uptime:"Uptime"},editor:{device:"Dish device",name:"Name",show_name:"Show name",show_status:"Show status",show_toolbar:"Show toolbar",compact_view:"Compact view"}},"pt-BR":Pt,pt:Pt};function Ot(t,e){let i=t;for(const t of e){if(!i||"object"!=typeof i||!(t in i))return;i=i[t]}return"string"==typeof i?i:void 0}function Ut(t,e="en",i={}){const s=t.split(".");return(Ot(Mt[e],s)??Ot(Mt[e.split("-")[0]],s)??Ot(Mt.en,s)??t).replace(/\{(\w+)\}/g,(t,e)=>e in i?String(i[e]):`{${e}}`)}const Nt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)})`
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
`;console.info("%c STARLINK-LOCAL-CARD %c v0.2.0 ","color: white; background: #23272e; font-weight: 700;","color: #23272e; background: #e9eaec; font-weight: 700;");const Rt={default:[{key:"downlink",subtitle:"stat.download"},{key:"uplink",subtitle:"stat.upload"},{key:"pop_ping",subtitle:"stat.ping"}],obstructed:[{key:"obstruction",subtitle:"stat.obstruction"},{key:"downlink",subtitle:"stat.download"},{key:"pop_ping",subtitle:"stat.ping"}]},Tt=new Set(["downlink","uplink","native_download","native_upload"]),Ht=new Set(["sleeping","stowed","searching"]);let Dt=class extends lt{constructor(){super(...arguments),this._entities={}}static{this.styles=Nt}static getStubConfig(t){const e=Object.values(t?.entities??{}).find(t=>t.platform===yt&&"downlink"===t.translation_key);return e?.device_id?{type:`custom:${vt}`,device:e.device_id}:e?{type:`custom:${vt}`,entities:{downlink:e.entity_id}}:{type:`custom:${vt}`}}static getConfigForm(){return{schema:[{name:"device",selector:{device:{filter:{integration:yt}}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_status",selector:{boolean:{}}},{name:"show_toolbar",selector:{boolean:{}}},{name:"compact_view",selector:{boolean:{}}}]}],computeLabel:t=>Ut(`editor.${t.name}`)}}setConfig(t){if(!t)throw new Error(Ut("common.invalid_config"));const e=t,{signal:i,restricted:s,dl_reason:n,...o}=e.entities??{};if(!(t={...t,name:t.name??e.title,entities:{...i&&{signal_quality:i},...s&&{bandwidth_restricted:s},...n&&{dl_restricted_reason:n},...o}}).device&&!t.entities?.downlink&&!t.entities?.pop_ping)throw new Error(Ut("common.missing_entity"));this._config={show_name:!0,show_status:!0,show_toolbar:!0,compact_view:!1,...t},this._entities=kt(this.hass,this._config)}getCardSize(){return this._config?.compact_view?3:7}getGridOptions(){return this._config?.compact_view?{columns:6,rows:3,min_columns:4,min_rows:2}:{columns:6,rows:7,min_columns:4,min_rows:5}}willUpdate(t){if(!t.has("hass")||!this._config)return;const e=t.get("hass");e&&e.entities===this.hass?.entities&&this._entities.downlink||(this._entities=kt(this.hass,this._config)),e&&e.themes?.darkMode===this.hass?.themes?.darkMode||this.toggleAttribute("dark-mode",Boolean(this.hass?.themes?.darkMode))}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||!this.hass||Object.values(this._entities).some(t=>t&&e.states[t]!==this.hass.states[t])}get _lang(){return t=this.hass,e=this._config?.language,e??t?.locale?.language??t?.language??"en";var t,e}_state(t){const e=this._entities[t];return e?this.hass?.states[e]:void 0}_number(t,e=0){return new Intl.NumberFormat(this._lang,{maximumFractionDigits:e}).format(t)}_format(t,e){if(!e||"unknown"===e.state||"unavailable"===e.state)return"—";if(t&&Tt.has(t)){const t=function(t,e){const i=Et(t,e);if(null===i||!t||!e)return null;const s=String(t.states[e].attributes.unit_of_measurement??"bit/s");return i*(zt[s]??1e-6)}(this.hass,e.entity_id);if(null!==t)return`${this._number(t,t<10?1:0)} Mbps`}if(this.hass?.formatEntityState)try{return this.hass.formatEntityState(e)}catch{}const i=e.attributes.unit_of_measurement;return i?`${e.state} ${i}`:e.state}_moreInfo(t){const e=t??this._entities.downlink??this._entities.pop_ping;var i,s;e&&(i="hass-more-info",s={entityId:e},this.dispatchEvent(new CustomEvent(i,{detail:s,bubbles:!0,composed:!0})))}_confirm(t){return window.confirm(Ut(t,this._lang))}_reboot(){const t=this._entities.reboot;t&&this.hass&&this._confirm("common.confirm_reboot")&&this.hass.callService("button","press",{entity_id:t})}_toggleStow(){const t=this._state("stowed");if(!t||!this.hass)return;const e="on"===t.state;this._confirm(e?"common.confirm_unstow":"common.confirm_stow")&&this.hass.callService("switch",e?"turn_off":"turn_on",{entity_id:t.entity_id})}_runShortcut(t){if(!this.hass||!t.service)return;const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data,t.target)}render(){if(!this._config)return W;const t=function(t,e){return t&&(At(t,e.downlink)||At(t,e.pop_ping))?St(t,e.stowed)?"stowed":St(t,e.sleeping)?"sleeping":St(t,e.thermal)?"thermal":e.snr_above_noise_floor&&"off"===t.states[e.snr_above_noise_floor]?.state?"searching":(Et(t,e.obstruction)??0)>=1||St(t,e.native_obstructed)?"obstructed":St(t,e.heating)?"heating":St(t,e.bandwidth_restricted)?"limited":St(t,e.has_alerts)?"alert":"online":"unavailable"}(this.hass,this._entities);if("unavailable"===t)return this._renderUnavailable();const e=function(t,e){const i=Et(t,e.signal_quality);return null===i?0:Math.max(0,Math.min(1,i/100))}(this.hass,this._entities),i=Et(this.hass,this._entities.azimuth),s="stowed"===t?90:Et(this.hass,this._entities.elevation),n={face:Ct(s),azimuth:i,desiredAzimuth:Et(this.hass,this._entities.desired_azimuth)};return q`
      <ha-card style="--slc-signal:${e.toFixed(2)}">
        <div class="preview">
          <div class="header">
            <div class="tips">${this._renderTips()}</div>
            <ha-icon-button
              class="more-info"
              .label=${Ut("common.more_info",this._lang)}
              @click=${()=>this._moreInfo()}
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._config.compact_view?W:q`<div class="hero" @click=${()=>this._moreInfo()}>${gt(t,n)}</div>`}
          <div class="metadata">
            ${this._renderName()} ${this._renderStatus(t,e,i,s)}
          </div>
          ${this._renderStats(t)}
        </div>
        ${this._renderToolbar()}
      </ha-card>
    `}_renderUnavailable(){return q`
      <ha-card>
        <div class="preview not-available">
          ${this._config.compact_view?W:q`<div class="hero">${gt("unavailable",{face:Ct(60),azimuth:null,desiredAzimuth:null})}</div>`}
          <div class="metadata">
            ${this._renderName()}
            <div class="status">${Ut("common.not_available",this._lang)}</div>
          </div>
        </div>
        ${this._renderToolbar()}
      </ha-card>
    `}_tip(t,e,i,s=""){const n=this._state(t);return n?q`
      <div class="tip ${s}" title=${String(n.attributes.friendly_name??"")}
           @click=${()=>this._moreInfo(n.entity_id)}>
        <ha-icon icon=${e}></ha-icon>
        <span>${i??this._format(t,n)}</span>
      </div>
    `:W}_renderTips(){const t=Et(this.hass,this._entities.clients),e="on"===this._state("bandwidth_restricted")?.state,i=this._state("dl_restricted_reason")?.state;return q`
      ${this._tip("pop_ping","mdi:timer-outline",void 0,"accent")}
      ${null===t?W:this._tip("clients","mdi:devices",Ut("common.clients",this._lang,{count:t}))}
      ${this._tip("gps_sats","mdi:satellite-variant")}
      ${e?this._tip("bandwidth_restricted","mdi:speedometer-slow",Ut("common.restricted",this._lang,{reason:(i??"").toLowerCase().replace(/_/g," ")}),"alarm"):W}
    `}_renderName(){if(!this._config.show_name)return W;const t=this._config.device?this.hass?.devices?.[this._config.device]:void 0,e=this._config.name??t?.name_by_user??t?.name??"Starlink";return q`<div class="plant-name">${e}</div>`}_renderStatus(t,e,i,s){if(!this._config.show_status)return W;const n=this._entities.signal_quality&&!Ht.has(t);return q`
      <div class="status ${t}"><span>${Ut(`status.${t}`,this._lang)}</span></div>
      ${n?q`<div class="signal" @click=${()=>this._moreInfo(this._entities.signal_quality)}>
            <div class="signal-bar"><div class="signal-fill" style="width:${(100*e).toFixed(0)}%"></div></div>
            <div class="signal-text">${Ut("common.signal",this._lang,{percent:Math.round(100*e)})}</div>
          </div>`:W}
      ${null!==i&&null!==s&&"stowed"!==t?q`<div class="alignment" @click=${()=>this._moreInfo(this._entities.azimuth)}>
            ${Ut("common.alignment",this._lang,{azimuth:this._number(i),elevation:this._number(s)})}
          </div>`:W}
    `}_renderStats(t){if(this._config.compact_view)return W;const e=this._config.stats??{},i=(e[t]??e.default??Rt[t]??Rt.default).map(t=>{const e=t.entity??(t.key?this._entities[t.key]:void 0),i=e?this.hass?.states[e]:void 0;if(!i)return W;let s=this._format(t.entity?void 0:t.key,i);t.attribute?s=String(i.attributes[t.attribute]??"—"):t.unit&&(s=`${i.state} ${t.unit}`);const n=t.subtitle?.startsWith("stat.")?Ut(t.subtitle,this._lang):t.subtitle??"";return q`
          <div class="stats-block" @click=${()=>this._moreInfo(e)}>
            <div class="stats-value">${s}</div>
            <div class="stats-subtitle">${n}</div>
          </div>
        `}).filter(t=>t!==W);return i.length?q`<div class="stats">${i}</div>`:W}_iconButton(t,e,i){const s=Ut(e,this._lang);return q`
      <ha-icon-button .label=${s} title=${s} @click=${i}>
        <ha-icon icon=${t}></ha-icon>
      </ha-icon-button>
    `}_renderToolbar(){if(!this._config.show_toolbar)return W;const t=this._state("stowed"),e="on"===t?.state,i=(this._config.shortcuts??[]).map(t=>q`
        <ha-icon-button .label=${t.name??""} title=${t.name??""} @click=${()=>this._runShortcut(t)}>
          <ha-icon icon=${t.icon??"mdi:flash"}></ha-icon>
        </ha-icon-button>
      `),s=[t?q`<button class="text-button ${e?"active":""}" @click=${()=>this._toggleStow()}>
            <ha-icon icon=${e?"mdi:satellite-uplink":"mdi:package-down"}></ha-icon>
            ${Ut(e?"common.unstow":"common.stow",this._lang)}
          </button>`:W,this._entities.obstruction_map?this._iconButton("mdi:radar","common.obstruction_map",()=>this._moreInfo(this._entities.obstruction_map)):W,this._entities.reboot?this._iconButton("mdi:restart","common.reboot",()=>this._reboot()):W].filter(t=>t!==W);return s.length||i.length?q`<div class="toolbar">${s}<div class="fill-gap"></div>${i}</div>`:W}};t([pt({attribute:!1})],Dt.prototype,"hass",void 0),t([function(t){return pt({...t,state:!0,attribute:!1})}()],Dt.prototype,"_config",void 0),Dt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})(vt)],Dt),window.customCards=window.customCards||[],window.customCards.push({type:vt,name:Ut("common.name"),description:Ut("common.description"),preview:!0,documentationURL:"https://github.com/hudsonbrendon/ha-starlink-local-card",getEntitySuggestion:(t,e)=>{const i=t.entities?.[e];return i&&i.platform===yt&&"downlink"===i.translation_key?{config:i.device_id?{type:`custom:${vt}`,device:i.device_id}:{type:`custom:${vt}`,entities:{downlink:e}}}:null}});export{Dt as StarlinkLocalCard};
//# sourceMappingURL=ha-starlink-local-card.js.map
