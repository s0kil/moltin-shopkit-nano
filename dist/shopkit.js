import{c as t,a as e,b as n,p as o,e as i,M as r,f as a,s,i as c}from"./index-5bbad259.js";var u=t((function(t){!function(e){var n=function(){},o=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(t){return setTimeout(t,16)};function i(){this.reads=[],this.writes=[],this.raf=o.bind(e)}function r(t){t.scheduled||(t.scheduled=!0,t.raf(a.bind(null,t)))}function a(t){var e,o=t.writes,i=t.reads;try{n("flushing reads",i.length),s(i),n("flushing writes",o.length),s(o)}catch(t){e=t}if(t.scheduled=!1,(i.length||o.length)&&r(t),e){if(n("task errored",e.message),!t.catch)throw e;t.catch(e)}}function s(t){for(var e;e=t.shift();)e()}function c(t,e){var n=t.indexOf(e);return!!~n&&!!t.splice(n,1)}i.prototype={constructor:i,measure:function(t,e){var n=e?t.bind(e):t;return this.reads.push(n),r(this),n},mutate:function(t,e){var n=e?t.bind(e):t;return this.writes.push(n),r(this),n},clear:function(t){return c(this.reads,t)||c(this.writes,t)},extend:function(t){if("object"!=typeof t)throw Error("expected object");var e=Object.create(this);return function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}(e,t),e.fastdom=this,e.initialize&&e.initialize(),e},catch:null};var u=e.fastdom=e.fastdom||new i;t.exports=u}("undefined"!=typeof window?window:e)}));d.notEqual=function(t,e,n){d(t!=e,n)},d.notOk=function(t,e){d(!t,e)},d.equal=function(t,e,n){d(t==e,n)},d.ok=d;var l=d;function d(t,e){if(!t)throw Error(e||"AssertionError")}var f={},m="undefined"!=typeof window,p=m&&window.requestIdleCallback,h=["interactive","complete"],b=function(t,e){return new Promise((function(n){t&&"function"!=typeof t&&(e=t,t=null),e=e||window.document;var o=function(){return n(void(t&&setTimeout(t)))};-1!==h.indexOf(e.readyState)?o():e.addEventListener("DOMContentLoaded",o)}))};b.resume=function(t){return function(e){return b(t).then((function(){return e}))}};const y=(t,e)=>{const n=`__${e}`;let o=t.target;for(;null!==o;){const e=o[n];if(e)return void e(t);o=o.parentNode}},w={};function v(t){w[t]||(document.addEventListener(t,e=>y(e,t)),w[t]=!0)}var g=t((function(t){!function(){var e={initialize:function(){this._tasks=new Map},mutate:function(t,e){return n(this,"mutate",t,e)},measure:function(t,e){return n(this,"measure",t,e)},clear:function(t){var e=this._tasks,n=e.get(t);this.fastdom.clear(n),e.delete(t)}};function n(t,e,n,o){var i,r=t._tasks,a=t.fastdom,s=new Promise((function(t,c){i=a[e]((function(){r.delete(s);try{t(o?n.call(o):n())}catch(t){c(t)}}),o)}));return r.set(s,i),s}t.exports=e}()})),x=t((function(t){var n;n=e,t.exports?t.exports=function(t){var e;(function(e){for(var n in t)t.hasOwnProperty(n)&&e.setAttribute(n,t[n])})(e=document.createElement("link")),document.head.appendChild(e)}:n.speculative=function(t){var e;(function(e){for(var n in t)t.hasOwnProperty(n)&&e.setAttribute(n,t[n])})(e=document.createElement("link")),document.head.appendChild(e)}}));function k(t){if(3!==t.nodeType){if(void 0!==t.attributes)for(let e of Array.from(t.attributes)){let n=e.name;if("#"===n[0])return t.removeAttribute(n),n.slice(1)}return 0}{let e=t.nodeValue;return"#"===e[0]?(t.nodeValue="",e.slice(1)):0}}const C=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1);C.roll=function(t){for(;--t;)this.nextNode();return this.currentNode};class N{constructor(t,e){this.idx=t,this.ref=e}}function P(t){const e={},n=C;return n.currentNode=t,this._refPaths.map(t=>e[t.ref]=n.roll(t.idx)),e}const T=document.createElement("template");function E(t,...e){const n=String.raw(t,...e).replace(/>\n+/g,">").replace(/\s+</g,"<").replace(/>\s+/g,">").replace(/\n\s+/g,"\x3c!-- --\x3e");T.innerHTML=n;const o=T.content.firstChild;return(i=o)._refPaths=function(t){const e=C;e.currentNode=t;let n,o=[],i=0;do{(n=k(t))?(o.push(new N(i+1,n)),i=1):i++}while(t=e.nextNode());return o}(i),i.collect=P,o;var i}function _(){const{possible:t,n:e}=_;let n,o=e.toString(26).split(""),i="";for(;n=o.shift();)i+=t[parseInt(n,26)];return _.n++,i}_.possible="abcdefghijklmnopqrstuvwxyz",_.n=0;let I=document.createElement("style");I.id="stage0",document.head.appendChild(I),I=I.sheet;const j=(t,e)=>t.classList.add(e),q=function(t){for(let e in t){const n=`${e}-${_()}`,o=I.insertRule(`.${n} {}`,I.cssRules.length),i=I.cssRules[o].style,r=t[e];for(let t in r)if(":"===t[0]||" "===t[0]){const e=I.insertRule(`.${n}${t} {}`,I.cssRules.length),o=I.cssRules[e].style;Object.assign(o,r[t]),delete r[t]}Object.assign(i,r),t[e]=n}return t}({base:{background:"none","box-sizing":"border-box","line-height":"1.15","-webkit-text-size-adjust":"100%",margin:0,"font-family":"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif","font-size":"15px",appearance:"none","border-radius":"0.25rem",border:"1px solid transparent","font-weight":500,outline:"none",padding:"0 1rem",opacity:1,color:"#58697F","::before, ::after":{"box-sizing":"inherit","-webkit-font-smoothing":"antialiased"},":hover, :focus":{outline:"none"},":hover":{cursor:"pointer"}},primary:{"background-color":"#177EE6","border-color":"#fff",color:"#fff",height:"2.8rem",display:"inline-flex","align-items":"center","justify-content":"center"}}),A=E`<button class=${q.base}>#text</button>`;function O(t={}){const{text:e,type:n}=t,o=A.cloneNode(!0),i=A.collect(o).text;return n&&j(o,q[n]),o.update=t=>i.nodeValue=t,o.update(e),o}const S=n("cart"),R=E`<span class=shopkit-buy-button></span>`,z=E`<span class=shopkit-cart-button></span>`,$=u.extend(g);b().then(()=>(function(t){let e,u,d,h,b,y,w;$.measure(()=>{e=t.querySelector("script[data-moltin-client-id]")}).then(()=>{e?(({moltinClientId:d,moltinStripePublishableKey:h,moltinCurrency:b}=e.dataset),h?(u=new r({fetch:a,client_id:d,application:"moltin-btn",...b&&{moltinCurrency:b}}),s({client:u,stripeKey:h})):console.error("You must provide your Stripe Publishable Key to enable the Moltin Btn")):console.error("You must provide a Moltin Client ID to enable the Moltin Btn")}),$.measure(()=>{y=[...t.getElementsByClassName("moltin-buy-button")]}).then(()=>{c(y,t=>{$.mutate(()=>t.appendChild(function(t){const{moltinText:e,moltinType:n,moltinProductId:o}=t,i=R.cloneNode(!0);return"custom"===n||o?(i.appendChild(O({text:e||"Add to Cart",type:"primary"})),i.__click=()=>(function(t){"custom"!==t.moltinType?S.dispatch("addItem",{id:t.moltinProductId}):S.dispatch("addItem",{type:"custom_item",name:t.moltinProductName,sku:t.moltinProductSku,price:{amount:parseInt(t.moltinProductPrice,10)}}),t.moltinOpenCart&&S.dispatch("goToCart")})(t),i):(console.warn("No product ID provided to Moltin Btn."),null)}({...t.dataset})))})}),$.measure(()=>{w=[...t.getElementsByClassName("moltin-cart-button")]}).then(()=>{c(w,t=>{$.mutate(()=>t.appendChild(function(t){const{moltinText:e,moltinShowTotal:r}=t,a=n("cart"),s=z.cloneNode(!0),c=(t,n)=>`${e||"Cart"}${function(t,e){return t||e?` (${r?t:o(e,"item")})`:null}(t,n)||""}`,u=O({text:c(),type:"primary"});return s.appendChild(u),s.update=({count:t,subTotal:e})=>u.update(c(e,t)),i.on("cart",t=>s.update(t)),s.__click=()=>a.dispatch("openCart"),s}({...t.dataset})))})}),v("click"),x({rel:"dns-prefetch",href:"https://api.moltin.com"}),x({rel:"preconnect",crossorigin:"anonymous",href:"https://api.moltin.com"}),function t(e,n){var o;return n=n||f,l.equal(typeof e,"function","on-idle: cb should be type function"),l.equal(typeof n,"object","on-idle: opts should be type object"),p?(o=window.requestIdleCallback((function(o){if(o.timeRemaining()<=1&&!o.didTimeout)return t(e,n);e(o)}),n),window.cancelIdleCallback.bind(window,o)):m?(o=setTimeout(e,0),clearTimeout.bind(window,o)):void 0}(()=>{import("./shopkit-cart-6f3a413c.js").then(({initializeCart:t})=>{t()})})})(document));
