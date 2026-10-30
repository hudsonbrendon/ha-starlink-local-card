function t(t,e,i,s){var n,a=arguments.length,o=a<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(e,i,o):n(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const o=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:r,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,m=f?f.emptyScript:"",g=p.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!r(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const a=n.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const a=this.constructor;if(!1===s&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,g?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.2");const b=globalThis,x=t=>t,k=b.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+E,z=`<${M}>`,C=document,P=()=>C.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,H=/>/g,D=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=B(1),q=B(2),G=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,K=C.createTreeWalker(C,129);function Y(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",o=R;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===R?"!--"===l[1]?o=T:void 0!==l[1]?o=H:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=D):void 0!==l[3]&&(o=D):o===D?">"===l[0]?(o=n??R,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?D:'"'===l[3]?L:I):o===L||o===I?o=D:o===T||o===H?o=R:(o=D,n=void 0);const h=o===D&&t[e+1].startsWith("/>")?" ":"";a+=o===R?i+z:c>=0?(s.push(r),i.slice(0,c)+S+i.slice(c)+E+h):i+E+(-2===c?e:h)}return[Y(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const o=t.length-1,r=this.parts,[l,c]=Z(t,e);if(this.el=J.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&r.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[a++],i=s.getAttribute(t).split(E),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?it:"?"===o[1]?st:"@"===o[1]?nt:et}),s.removeAttribute(t)}else t.startsWith(E)&&(r.push({type:6,index:n}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),K.nextNode(),r.push({type:2,index:++n});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===M)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)r.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===G)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??C).importNode(e,!0);K.currentNode=s;let n=K.nextNode(),a=0,o=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new tt(n,n.nextSibling,this,t):1===r.type?e=new r.ctor(n,r.name,r.strings,this,t):6===r.type&&(e=new at(n,this,t)),this._$AV.push(e),r=i[++o]}a!==r?.index&&(n=K.nextNode(),a++)}return K.currentNode=C,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new tt(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}let et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=Q(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==G,a&&(this._$AH=t);else{const s=t;let o,r;for(t=n[0],o=0;o<n.length-1;o++)r=Q(this,s[i+o],e,o),r===G&&(r=this._$AH[o]),a||=!O(r)||r!==this._$AH[o],r===W?t=W:t!==W&&(t+=(r??"")+n[o+1]),this._$AH[o]=r}a&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class nt extends et{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===G)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const ot=b.litHtmlPolyfillSupport;ot?.(J,tt),(b.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class lt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new tt(e.insertBefore(P(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}}lt._$litElement$=!0,lt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:lt});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:lt}),(rt.litElementVersions??=[]).push("4.2.2");const dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ht=(t=dt,e,i)=>{const{kind:s,metadata:n}=i;let a=globalThis.litPropertyMetadata.get(n);if(void 0===a&&globalThis.litPropertyMetadata.set(n,a=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),a.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}const pt=180,ft=-24*Math.PI/180,mt=20*Math.PI/180,gt=100,_t=84;function vt([t,e,i]){const s=t*Math.cos(ft)+i*Math.sin(ft),n=-t*Math.sin(ft)+i*Math.cos(ft);return[132+s,pt-(e*Math.cos(mt)-n*Math.sin(mt))]}const yt=(t,e,i=1)=>[t[0]+e[0]*i,t[1]+e[1]*i,t[2]+e[2]*i],wt=t=>t.toFixed(1);function $t(t,e){const i=vt(yt(t,e,_t)),s=vt(t),n=vt(yt(t,[1,0,0])),a=vt(yt(t,e));return`matrix(${wt(n[0]-s[0])} ${wt(n[1]-s[1])} ${wt(s[0]-a[0])} ${wt(s[1]-a[1])} ${wt(i[0])} ${wt(i[1])})`}function bt(t,[e,i],s){const n=.766*s,a=i-.643*s;return q`<path class="wave ${t}" d="M${wt(e-n)} ${wt(a)} A${s} ${s} 0 0 1 ${wt(e+n)} ${wt(a)}" />`}const xt=Array.from({length:8},(t,e)=>{const i=e*Math.PI/4,s=Math.cos(i),n=Math.sin(i);return q`<line x1="${wt(15*s)}" y1="${wt(15*n)}" x2="${wt(20*s)}" y2="${wt(20*n)}" />`}),kt=(t,e,i,s=1)=>q`
  <g class="cloud ${t}" transform="translate(${e} ${i}) scale(${s})">
    <g class="drift">
      <use href="#slc-cloud" class="cloud-outline" />
      <use href="#slc-cloud" class="cloud-fill" />
    </g>
  </g>
`,At=[[52,52,0,!1],[66,56,-.45,!1],[80,52,-.2,!0],[92,54,-.7,!1],[146,40,-.3,!1],[158,44,-.8,!0],[170,40,-.1,!1],[182,42,-.55,!0],[228,46,-.65,!1],[240,48,-.25,!0],[252,46,-.9,!1],[264,48,-.4,!1],[60,60,-.85,!0],[246,52,-.15,!0]],St=[[36,26,1.3,""],[104,14,1.1,"s2"],[214,22,1.4,"s3"],[298,40,1.1,"s2"],[74,48,1,"s3"]];function Et(t,e,i="clear",s){const n=(90-Math.max(0,Math.min(90,e.elevation??65)))*Math.PI/180,a=[0,Math.sin(n),-Math.cos(n)],o=[0,Math.cos(n),Math.sin(n)],r=[0,4,18],l=$t(r,a),c=$t(yt(r,o,-6),a),d=yt(yt(r,a,46.2),o,-6),h=vt([0,0,d[2]-10-22*Math.sin(n)]),u=vt(d),p=vt(yt(yt(r,a,42),o,2)),f=vt([0,0,r[2]]),m=p[1]-20,g=s?.x??286,_=s?.y??30,v=262;return q`
    <svg class="dish ${t} wx-${i}" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg"
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
        <clipPath id="slc-face-clip"><rect x="${-50}" y="0" width="${gt}" height="${_t}" rx="12" /></clipPath>
        <g id="slc-cloud">
          <circle cx="-12" cy="2" r="7" /><circle cx="0" cy="-4" r="10" /><circle cx="12" cy="1" r="8" />
          <rect x="-12" y="0" width="24" height="9" />
        </g>
      </defs>

      <!-- stars (clear nights) -->
      <g class="stars">
        ${St.map(([t,e,i,s])=>q`<circle class="star ${s}" cx="${t}" cy="${e}" r="${i}" />`)}
      </g>

      <!-- sun by day, moon by night, on an arc that follows the real sun -->
      <g class="body" style="transform: translate(${wt(g)}px, ${wt(_)}px)">
        <g class="sun">
          <circle class="sun-glow" r="22" fill="url(#slc-sun-glow)" />
          <g class="sun-rays" stroke-width="2.4" stroke-linecap="round">${xt}</g>
          <circle class="sun-core" r="10" />
        </g>
        <g class="moon"><path d="M4 -12 a12 12 0 1 0 8 20 a9.5 9.5 0 1 1 -8 -20 z" /></g>
        ${kt("c-near",16,10,1)}
      </g>

      <!-- weather -->
      ${kt("c1",70,42,1.3)} ${kt("c2",164,30,1.15)} ${kt("c3",246,38,1.4)}
      <polygon class="bolt" points="170,40 163,54 169,54 164,66 177,50 171,50 175,40" />

      <!-- satellite on an orbit over the dish, with the data beam down to it -->
      <g class="orbit" style="transform-origin: ${wt(p[0])}px ${wt(p[1])}px">
        <line class="beam" x1="${wt(p[0])}" y1="${wt(p[1]-12)}"
              x2="${wt(p[0])}" y2="${wt(p[1]-m+10)}" />
        <g class="sat" style="transform-origin: ${wt(p[0])}px ${wt(p[1]-m)}px">
          <g transform="translate(${wt(p[0])} ${wt(p[1]-m)}) scale(1.35)">
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
      <line x1="18" y1="${pt}" x2="302" y2="${pt}" class="ground" />
      <ellipse cx="${wt(f[0]-6)}" cy="${182}" rx="${wt(54+12*Math.sin(n))}" ry="5"
               fill="rgba(0,0,0,0.12)" />
      <ellipse cx="${v}" cy="${182}" rx="20" ry="3.5" fill="rgba(0,0,0,0.12)" />

      <!-- cable: dish -> router, data flowing along it -->
      <path class="cable" d="M${wt(h[0])} ${wt(h[1])} C ${wt(h[0]+40)} ${186}, ${222} ${186}, ${v} ${178}" />
      <path class="flow" d="M${wt(h[0])} ${wt(h[1])} C ${wt(h[0]+40)} ${186}, ${222} ${186}, ${v} ${178}" />

      <!-- kickstand -->
      <line x1="${wt(u[0])}" y1="${wt(u[1])}" x2="${wt(h[0])}" y2="${wt(h[1])}" class="stand" />

      <!-- panel: edge slab behind, face on top (drawn flat, mapped onto the tilt) -->
      <g transform="${c}">
        <rect x="${-50}" y="0" width="${gt}" height="${_t}" rx="12" fill="var(--slc-edge)"
              stroke="var(--slc-outline)" stroke-width="1.4" vector-effect="non-scaling-stroke" />
      </g>
      <g transform="${l}">
        <rect class="face" x="${-50}" y="0" width="${gt}" height="${_t}" rx="12" fill="url(#slc-face-grad)"
              stroke="var(--slc-outline)" stroke-width="1.5" vector-effect="non-scaling-stroke" />
        <g clip-path="url(#slc-face-clip)">
          <rect x="${-50}" y="0" width="${gt}" height="${_t}" fill="url(#slc-sheen)" />
          <rect class="heat" x="${-50}" y="0" width="${gt}" height="${_t}" />
          <g class="snow-face">
            <circle cx="-28" cy="22" r="3" /><circle cx="-8" cy="58" r="2.6" />
            <circle cx="20" cy="28" r="3.2" /><circle cx="32" cy="64" r="2.6" />
          </g>
        </g>
        <text x="0" y="${45}" text-anchor="middle" class="logo">STARLINK</text>
        <circle class="led" cx="${38}" cy="${76}" r="2.4" />
      </g>

      <!-- signal waves (searching) -->
      <g class="waves">${bt("w1",p,14)} ${bt("w2",p,26)} ${bt("w3",p,38)}</g>

      <!-- router: the tall Starlink cone, Wi-Fi rising from its tip -->
      <g class="router">
        <path d="M${248} ${179} L${257} ${130} Q${v} ${124} ${267} ${130} L${276} ${179} Q${v} ${182} ${248} ${179} Z"
              fill="url(#slc-face-grad)" stroke="var(--slc-outline)" stroke-width="1.4" stroke-linejoin="round" />
        <circle class="led router-led" cx="${v}" cy="${168}" r="1.8" />
        <g class="wifi">
          ${bt("f1",[v,124],8)} ${bt("f2",[v,124],15)}
          ${bt("f3",[v,124],22)}
        </g>
      </g>

      <!-- precipitation and fog fall in front of everything -->
      <g class="rain">
        ${At.map(([t,e,i,s])=>q`<line class="drop ${s?"heavy":""}" x1="${t}" y1="${e}" x2="${t-2}" y2="${e+8}" style="animation-delay:${i}s" />`)}
      </g>
      <g class="snow">
        ${At.map(([t,e,i])=>q`<circle class="flake" cx="${t}" cy="${e}" r="1.7" style="animation-delay:${3*i}s" />`)}
      </g>
      <g class="fog">
        <line x1="30" y1="76" x2="186" y2="76" /><line x1="108" y1="90" x2="290" y2="90" />
        <line x1="24" y1="104" x2="200" y2="104" /><line x1="96" y1="118" x2="270" y2="118" />
      </g>

      <!-- compass: needle on the azimuth, dashed line on the desired azimuth -->
      ${null===e.azimuth?"":q`
          <g class="compass">
            <circle cx="28" cy="164" r="13" class="compass-ring" />
            <text x="28" y="157" text-anchor="middle" class="compass-n">N</text>
            ${null===e.desiredAzimuth?"":q`<line x1="28" y1="164" x2="28" y2="153" class="compass-target"
                          transform="rotate(${e.desiredAzimuth.toFixed(0)} 28 164)" />`}
            <g transform="rotate(${e.azimuth.toFixed(0)} 28 164)">
              <polygon points="28,154 31,164 25,164" class="needle" />
              <polygon points="28,174 31,164 25,164" class="needle-tail" />
            </g>
          </g>`}

      <!-- sleep / thermal markers -->
      <text class="zz" x="${wt(p[0]+44)}" y="${wt(p[1]-24)}">z</text>
      <text class="zz zz2" x="${wt(p[0]+56)}" y="${wt(p[1]-36)}">z</text>
      <g class="warn" transform="translate(${wt(p[0]-160)} ${wt(p[1]-58)})">
        <path d="M160 0 l13 22 h-26 z" fill="var(--slc-error)" />
        <rect x="158.7" y="6.5" width="2.6" height="8" rx="1" fill="#fff" />
        <circle cx="160" cy="18" r="1.5" fill="#fff" />
      </g>
    </svg>
  `}const Mt="starlink-local-card",zt="starlink_local",Ct=t=>new Map(Object.entries(t).map(([t,e])=>[e,t])),Pt=Ct({downlink:"downlink",uplink:"uplink",pop_ping:"pop_ping",wan_ping:"wan_ping",signal_quality:"signal_quality",obstruction:"obstruction",azimuth:"azimuth",elevation:"elevation",desired_azimuth:"desired_azimuth",desired_elevation:"desired_elevation",gps_sats:"gps_sats",uptime:"uptime",clients:"clients",public_ip:"public_ip",radio_5ghz_temp:"radio_5ghz_temp",bandwidth_restricted:"bandwidth_restricted",snr_above_noise_floor:"snr_above_noise_floor",has_alerts:"has_alerts",dl_restricted_reason:"dl_restricted_reason",obstruction_map:"obstruction_map"}),Ot=Ct({native_download:"downlink_throughput",native_upload:"uplink_throughput",native_ping:"ping",native_azimuth:"azimuth",native_elevation:"elevation",native_obstructed:"currently_obstructed",heating:"heating",sleeping:"power_save_idle",thermal:"thermal_throttle",stowed:"stowed"}),Ut=[["downlink","native_download"],["uplink","native_upload"],["pop_ping","native_ping"],["azimuth","native_azimuth"],["elevation","native_elevation"]];function Nt(t,e){const i={},s=t?.entities;if(s&&t){let n;if(e.device){const i=new Set(t.devices?.[e.device]?.config_entries??[]);n=new Set([e.device]);for(const e of Object.values(t.devices??{}))(e.config_entries??[]).some(t=>i.has(t))&&n.add(e.id)}const a=Object.values(s).sort((t,i)=>Number(i.device_id===e.device)-Number(t.device_id===e.device));for(const e of a){let s;if(e.platform===zt){if(n&&(!e.device_id||!n.has(e.device_id)))continue;s=e.translation_key?Pt.get(e.translation_key):void 0}else if("starlink"===e.platform){const i=e.entity_id.split(".")[0];s=e.translation_key?Ot.get(e.translation_key):"button"===i?"reboot":"binary_sensor"===i&&"connectivity"===t.states[e.entity_id]?.attributes.device_class?"connectivity":void 0}s&&!i[s]&&(i[s]=e.entity_id)}for(const[t,e]of Ut)i[t]??=i[e]}return{...i,...e.entities??{}}}const Rt=(t,e)=>{const i=e?t.states[e]?.state:void 0;return void 0!==i&&"unavailable"!==i&&"unknown"!==i},Tt=(t,e)=>!!e&&"on"===t.states[e]?.state;function Ht(t,e){if(!e||!t)return null;const i=Number(t.states[e]?.state);return Number.isFinite(i)?i:null}const Dt={"bit/s":1e-6,"kbit/s":.001,"Mbit/s":1,"Gbit/s":1e3,"B/s":8e-6,"kB/s":.008,"MB/s":8,"GB/s":8e3};const It={sunny:"clear","clear-night":"clear",exceptional:"clear",partlycloudy:"partly",cloudy:"cloudy",fog:"fog",rainy:"rain",hail:"rain",pouring:"pour",lightning:"storm","lightning-rainy":"storm",snowy:"snow","snowy-rainy":"snow",windy:"wind","windy-variant":"wind"};function Lt(t,e){if(e)return e;if(t){for(const e of["weather.home","weather.forecast_home"])if(t.states[e])return e;return Object.keys(t.states).filter(t=>t.startsWith("weather.")).sort()[0]}}const jt=864e5,Bt=t=>Math.min(1,Math.max(0,t));function Ft(t,e=Date.now()){const i=t?.states["sun.sun"],s=new Date(e).getHours()+new Date(e).getMinutes()/60,n=i?"above_horizon"===i.state:s>=6&&s<18,a=Date.parse(String(i?.attributes.next_rising)),o=Date.parse(String(i?.attributes.next_setting)),[r,l]=n?[a-jt,o]:[o-jt,a],c=Bt(l>r?(e-r)/(l-r):n?(s-6)/12:(s+6)%24/12),d=Number(i?.attributes.elevation),h=n?Number.isFinite(d)?Bt(Math.sin(d*Math.PI/180)/Math.sin(65*Math.PI/180)):Math.sin(Math.PI*c):0;return{x:24+272*c,y:64-50*Math.sin(Math.PI*c),intensity:h}}var qt={common:{name:"Starlink Local Card",description:"Card animado da antena Starlink para a integração Starlink Local.",not_available:"Antena indisponível",missing_entity:"Escolha o dispositivo da antena Starlink (ou defina entities.downlink).",invalid_config:"Configuração inválida",more_info:"Mais informações",alignment:"Azimute {azimuth}° · Elevação {elevation}°",signal:"Sinal {percent}%",clients:"{count} clientes",reboot:"Reiniciar antena",confirm_reboot:"Reiniciar a antena Starlink? A internet cai por alguns minutos.",stow:"Guardar",unstow:"Desguardar",confirm_stow:"Guardar a antena? Ela para de conectar até ser desguardada.",confirm_unstow:"Desguardar a antena?",obstruction_map:"Mapa de obstrução",restricted:"Restrita: {reason}"},status:{online:"Conectada",limited:"Banda restringida",alert:"Conectada com alertas",obstructed:"Obstruída",searching:"Procurando satélites",heating:"Derretendo neve",thermal:"Limitada por temperatura",sleeping:"Dormindo",stowed:"Guardada",unavailable:"Indisponível"},stat:{download:"Download",upload:"Upload",ping:"Ping",obstruction:"Obstrução",signal:"Sinal",gps_sats:"Satélites GPS",uptime:"Ligada há"},editor:{device:"Dispositivo da antena",name:"Nome",weather_entity:"Entidade de clima (céu)",show_name:"Mostrar nome",show_status:"Mostrar status",show_toolbar:"Mostrar barra de ações",compact_view:"Modo compacto"}};const Gt={en:{common:{name:"Starlink Local Card",description:"Animated Starlink dish card for the Starlink Local integration.",not_available:"Dish unavailable",missing_entity:"Pick the Starlink dish device (or set entities.downlink).",invalid_config:"Invalid configuration",more_info:"More info",alignment:"Azimuth {azimuth}° · Elevation {elevation}°",signal:"Signal {percent}%",clients:"{count} clients",reboot:"Reboot dish",confirm_reboot:"Reboot the Starlink dish? The internet drops for a few minutes.",stow:"Stow",unstow:"Unstow",confirm_stow:"Stow the dish? It stops connecting until unstowed.",confirm_unstow:"Unstow the dish?",obstruction_map:"Obstruction map",restricted:"Restricted: {reason}"},status:{online:"Connected",limited:"Bandwidth restricted",alert:"Connected with alerts",obstructed:"Obstructed",searching:"Searching for satellites",heating:"Melting snow",thermal:"Thermal throttling",sleeping:"Sleeping",stowed:"Stowed",unavailable:"Unavailable"},stat:{download:"Download",upload:"Upload",ping:"Ping",obstruction:"Obstruction",signal:"Signal",gps_sats:"GPS satellites",uptime:"Uptime"},editor:{device:"Dish device",name:"Name",weather_entity:"Weather entity (sky)",show_name:"Show name",show_status:"Show status",show_toolbar:"Show toolbar",compact_view:"Compact view"}},"pt-BR":qt,pt:qt};function Wt(t,e){let i=t;for(const t of e){if(!i||"object"!=typeof i||!(t in i))return;i=i[t]}return"string"==typeof i?i:void 0}function Vt(t,e="en",i={}){const s=t.split(".");return(Wt(Gt[e],s)??Wt(Gt[e.split("-")[0]],s)??Wt(Gt.en,s)??t).replace(/\{(\w+)\}/g,(t,e)=>e in i?String(i[e]):`{${e}}`)}const Kt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(i,t,s)})`
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
`;console.info("%c STARLINK-LOCAL-CARD %c v0.2.0 ","color: white; background: #23272e; font-weight: 700;","color: #23272e; background: #e9eaec; font-weight: 700;");const Yt={default:[{key:"downlink",subtitle:"stat.download"},{key:"uplink",subtitle:"stat.upload"},{key:"pop_ping",subtitle:"stat.ping"}],obstructed:[{key:"obstruction",subtitle:"stat.obstruction"},{key:"downlink",subtitle:"stat.download"},{key:"pop_ping",subtitle:"stat.ping"}]},Zt=new Set(["downlink","uplink","native_download","native_upload"]),Jt=new Set(["pop_ping","wan_ping","native_ping"]),Qt=new Set(["sleeping","stowed","searching"]);let Xt=class extends lt{constructor(){super(...arguments),this._entities={}}static{this.styles=Kt}static getStubConfig(t){const e=Object.values(t?.entities??{}).find(t=>t.platform===zt&&"downlink"===t.translation_key);return e?.device_id?{type:`custom:${Mt}`,device:e.device_id}:e?{type:`custom:${Mt}`,entities:{downlink:e.entity_id}}:{type:`custom:${Mt}`}}static getConfigForm(){return{schema:[{name:"device",selector:{device:{filter:{integration:zt}}}},{name:"name",selector:{text:{}}},{name:"weather_entity",selector:{entity:{filter:{domain:"weather"}}}},{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_status",selector:{boolean:{}}},{name:"show_toolbar",selector:{boolean:{}}},{name:"compact_view",selector:{boolean:{}}}]}],computeLabel:t=>Vt(`editor.${t.name}`)}}setConfig(t){if(!t)throw new Error(Vt("common.invalid_config"));const e=t,{signal:i,restricted:s,dl_reason:n,...a}=e.entities??{};if(!(t={...t,name:t.name??e.title,entities:{...i&&{signal_quality:i},...s&&{bandwidth_restricted:s},...n&&{dl_restricted_reason:n},...a}}).device&&!t.entities?.downlink&&!t.entities?.pop_ping)throw new Error(Vt("common.missing_entity"));this._config={show_name:!0,show_status:!0,show_toolbar:!0,compact_view:!1,...t},this._entities=Nt(this.hass,this._config)}getCardSize(){return this._config?.compact_view?3:7}getGridOptions(){return this._config?.compact_view?{columns:6,rows:3,min_columns:4,min_rows:2}:{columns:6,rows:7,min_columns:4,min_rows:5}}willUpdate(t){if(!t.has("hass")||!this._config)return;const e=t.get("hass");e&&e.entities===this.hass?.entities&&this._entities.downlink||(this._entities=Nt(this.hass,this._config)),e&&e.themes?.darkMode===this.hass?.themes?.darkMode||this.toggleAttribute("dark-mode",Boolean(this.hass?.themes?.darkMode))}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");if(!e||!this.hass)return!0;return[...Object.values(this._entities),"sun.sun",Lt(this.hass,this._config.weather_entity)].some(t=>t&&e.states[t]!==this.hass.states[t])}get _lang(){return t=this.hass,e=this._config?.language,e??t?.locale?.language??t?.language??"en";var t,e}_state(t){const e=this._entities[t];return e?this.hass?.states[e]:void 0}_number(t,e=0){return new Intl.NumberFormat(this._lang,{maximumFractionDigits:e}).format(t)}_format(t,e){if(!e||"unknown"===e.state||"unavailable"===e.state)return"—";if(t&&Zt.has(t)){const t=function(t,e){const i=Ht(t,e);if(null===i||!t||!e)return null;const s=String(t.states[e].attributes.unit_of_measurement??"bit/s");return i*(Dt[s]??1e-6)}(this.hass,e.entity_id);if(null!==t)return`${this._number(t,t<10?1:0)} Mbps`}if(t&&Jt.has(t)){const t=Ht(this.hass,e.entity_id);if(null!==t)return`${this._number(t)} ms`}if(this.hass?.formatEntityState)try{return this.hass.formatEntityState(e)}catch{}const i=e.attributes.unit_of_measurement;return i?`${e.state} ${i}`:e.state}get _weather(){return function(t,e){const i=e?t?.states[e]?.state:void 0;return i&&It[i]||"clear"}(this.hass,Lt(this.hass,this._config.weather_entity))}_sceneClass(t){const e=this.hass?.states["sun.sun"]?.state;return(e?"above_horizon"!==e:(new Date).getHours()<6||(new Date).getHours()>=18)?`${t} night`:t}_moreInfo(t){const e=t??this._entities.downlink??this._entities.pop_ping;var i,s;e&&(i="hass-more-info",s={entityId:e},this.dispatchEvent(new CustomEvent(i,{detail:s,bubbles:!0,composed:!0})))}_confirm(t){return window.confirm(Vt(t,this._lang))}_reboot(){const t=this._entities.reboot;t&&this.hass&&this._confirm("common.confirm_reboot")&&this.hass.callService("button","press",{entity_id:t})}_toggleStow(){const t=this._state("stowed");if(!t||!this.hass)return;const e="on"===t.state;this._confirm(e?"common.confirm_unstow":"common.confirm_stow")&&this.hass.callService("switch",e?"turn_off":"turn_on",{entity_id:t.entity_id})}_runShortcut(t){if(!this.hass||!t.service)return;const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data,t.target)}render(){if(!this._config)return W;const t=function(t,e){return t&&(Rt(t,e.downlink)||Rt(t,e.pop_ping))?Tt(t,e.stowed)?"stowed":Tt(t,e.sleeping)?"sleeping":Tt(t,e.thermal)?"thermal":e.snr_above_noise_floor&&"off"===t.states[e.snr_above_noise_floor]?.state?"searching":(Ht(t,e.obstruction)??0)>=1||Tt(t,e.native_obstructed)?"obstructed":Tt(t,e.heating)?"heating":Tt(t,e.bandwidth_restricted)?"limited":Tt(t,e.has_alerts)?"alert":"online":"unavailable"}(this.hass,this._entities);if("unavailable"===t)return this._renderUnavailable();const e=function(t,e){const i=Ht(t,e.signal_quality);return null===i?0:Math.max(0,Math.min(1,i/100))}(this.hass,this._entities),i=Ht(this.hass,this._entities.azimuth),s="stowed"===t?90:Ht(this.hass,this._entities.elevation),n={elevation:s,azimuth:i,desiredAzimuth:Ht(this.hass,this._entities.desired_azimuth)},a=Ft(this.hass),o=`--slc-signal:${e.toFixed(2)};--slc-sun-i:${a.intensity.toFixed(2)};--slc-orbit:${(12-5*e).toFixed(1)}s`;return F`
      <ha-card style=${o}>
        <div class="preview">
          <div class="header">
            <div class="tips">${this._renderTips()}</div>
            <ha-icon-button
              class="more-info"
              .label=${Vt("common.more_info",this._lang)}
              @click=${()=>this._moreInfo()}
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._config.compact_view?W:F`<div class="hero" @click=${()=>this._moreInfo()}>${Et(this._sceneClass(t),n,this._weather,a)}</div>`}
          <div class="metadata">
            ${this._renderName()} ${this._renderStatus(t,e,i,s)}
          </div>
          ${this._renderStats(t)}
        </div>
        ${this._renderToolbar()}
      </ha-card>
    `}_renderUnavailable(){return F`
      <ha-card>
        <div class="preview not-available">
          ${this._config.compact_view?W:F`<div class="hero">${Et(this._sceneClass("unavailable"),{elevation:null,azimuth:null,desiredAzimuth:null},this._weather,Ft(this.hass))}</div>`}
          <div class="metadata">
            ${this._renderName()}
            <div class="status">${Vt("common.not_available",this._lang)}</div>
          </div>
        </div>
        ${this._renderToolbar()}
      </ha-card>
    `}_tip(t,e,i,s=""){const n=this._state(t);return n?F`
      <div class="tip ${s}" title=${String(n.attributes.friendly_name??"")}
           @click=${()=>this._moreInfo(n.entity_id)}>
        <ha-icon icon=${e}></ha-icon>
        <span>${i??this._format(t,n)}</span>
      </div>
    `:W}_renderTips(){const t=Ht(this.hass,this._entities.clients),e="on"===this._state("bandwidth_restricted")?.state,i=this._state("dl_restricted_reason")?.state;return F`
      ${this._tip("pop_ping","mdi:timer-outline",void 0,"accent")}
      ${null===t?W:this._tip("clients","mdi:devices",Vt("common.clients",this._lang,{count:t}))}
      ${this._tip("gps_sats","mdi:satellite-variant")}
      ${e?this._tip("bandwidth_restricted","mdi:speedometer-slow",Vt("common.restricted",this._lang,{reason:(i??"").toLowerCase().replace(/_/g," ")}),"alarm"):W}
    `}_renderName(){if(!this._config.show_name)return W;const t=this._config.device?this.hass?.devices?.[this._config.device]:void 0,e=this._config.name??t?.name_by_user??t?.name??"Starlink";return F`<div class="plant-name">${e}</div>`}_renderStatus(t,e,i,s){if(!this._config.show_status)return W;const n=this._entities.signal_quality&&!Qt.has(t);return F`
      <div class="status ${t}"><span>${Vt(`status.${t}`,this._lang)}</span></div>
      ${n?F`<div class="signal" @click=${()=>this._moreInfo(this._entities.signal_quality)}>
            <div class="signal-bar"><div class="signal-fill" style="width:${(100*e).toFixed(0)}%"></div></div>
            <div class="signal-text">${Vt("common.signal",this._lang,{percent:Math.round(100*e)})}</div>
          </div>`:W}
      ${null!==i&&null!==s&&"stowed"!==t?F`<div class="alignment" @click=${()=>this._moreInfo(this._entities.azimuth)}>
            ${Vt("common.alignment",this._lang,{azimuth:this._number(i),elevation:this._number(s)})}
          </div>`:W}
    `}_renderStats(t){if(this._config.compact_view)return W;const e=this._config.stats??{},i=(e[t]??e.default??Yt[t]??Yt.default).map(t=>{const e=t.entity??(t.key?this._entities[t.key]:void 0),i=e?this.hass?.states[e]:void 0;if(!i)return W;let s=this._format(t.entity?void 0:t.key,i);t.attribute?s=String(i.attributes[t.attribute]??"—"):t.unit&&(s=`${i.state} ${t.unit}`);const n=t.subtitle?.startsWith("stat.")?Vt(t.subtitle,this._lang):t.subtitle??"";return F`
          <div class="stats-block" @click=${()=>this._moreInfo(e)}>
            <div class="stats-value">${s}</div>
            <div class="stats-subtitle">${n}</div>
          </div>
        `}).filter(t=>t!==W);return i.length?F`<div class="stats">${i}</div>`:W}_iconButton(t,e,i){const s=Vt(e,this._lang);return F`
      <ha-icon-button .label=${s} title=${s} @click=${i}>
        <ha-icon icon=${t}></ha-icon>
      </ha-icon-button>
    `}_renderToolbar(){if(!this._config.show_toolbar)return W;const t=this._state("stowed"),e="on"===t?.state,i=(this._config.shortcuts??[]).map(t=>F`
        <ha-icon-button .label=${t.name??""} title=${t.name??""} @click=${()=>this._runShortcut(t)}>
          <ha-icon icon=${t.icon??"mdi:flash"}></ha-icon>
        </ha-icon-button>
      `),s=[t?F`<button class="text-button ${e?"active":""}" @click=${()=>this._toggleStow()}>
            <ha-icon icon=${e?"mdi:satellite-uplink":"mdi:package-down"}></ha-icon>
            ${Vt(e?"common.unstow":"common.stow",this._lang)}
          </button>`:W,this._entities.obstruction_map?this._iconButton("mdi:radar","common.obstruction_map",()=>this._moreInfo(this._entities.obstruction_map)):W,this._entities.reboot?this._iconButton("mdi:restart","common.reboot",()=>this._reboot()):W].filter(t=>t!==W);return s.length||i.length?F`<div class="toolbar">${s}<div class="fill-gap"></div>${i}</div>`:W}};t([ut({attribute:!1})],Xt.prototype,"hass",void 0),t([function(t){return ut({...t,state:!0,attribute:!1})}()],Xt.prototype,"_config",void 0),Xt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})(Mt)],Xt),window.customCards=window.customCards||[],window.customCards.push({type:Mt,name:Vt("common.name"),description:Vt("common.description"),preview:!0,documentationURL:"https://github.com/hudsonbrendon/ha-starlink-local-card",getEntitySuggestion:(t,e)=>{const i=t.entities?.[e];return i&&i.platform===zt&&"downlink"===i.translation_key?{config:i.device_id?{type:`custom:${Mt}`,device:i.device_id}:{type:`custom:${Mt}`,entities:{downlink:e}}}:null}});export{Xt as StarlinkLocalCard};
//# sourceMappingURL=ha-starlink-local-card.js.map
