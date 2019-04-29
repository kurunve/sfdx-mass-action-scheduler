/**
 * Author: Aaron Hardy
 * https://unpkg.com/penpal@4.0.0/dist/penpal.min.js
 * https://github.com/Aaronius/penpal
 */
var Penpal=function(){"use strict";const e="handshake";const n="handshake-reply";const t="call";const r="reply";const o="fulfilled";const i="rejected";const c="message";const s="DataCloneError";const a="ConnectionDestroyed";const d="ConnectionTimeout";const l="NotInIframe";const u="NoIframeSrc";var m=()=>{const e=[];let n=false;return{destroy(){n=true;e.forEach(e=>{e()})},onDestroy(t){n?t():e.push(t)}}};const h={"http:":"80","https:":"443"};const f=/^(https?:|file:)?\/\/([^\/:]+)?(:(\d+))?/;const g=["file:","data:"];var p=e=>{if(e&&g.find(n=>e.startsWith(n))){return"null"}const n=document.location;const t=f.exec(e);let r;let o;let i;if(t){r=t[1]?t[1]:n.protocol;o=t[2];i=t[4]}else{r=n.protocol;o=n.hostname;i=n.port}const c=i&&i!==h[r]?`:${i}`:"";return`${r}//${o}${c}`};var v=e=>{return function(){if(e){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++){t[r]=arguments[r]}console.log("[Penpal]",...t)}}};const E=e=>{let n=e.name,t=e.message,r=e.stack;return{name:n,message:t,stack:r}};const w=e=>{const n=new Error;Object.keys(e).forEach(t=>n[t]=e[t]);return n};var y=(e,n,a)=>{const d=e.localName,l=e.local,u=e.remote,m=e.originForSending,h=e.originForReceiving;let f=false;a(`${d}: Connecting call receiver`);const g=e=>{if(e.source!==u||e.data.penpal!==t){return}if(e.origin!==h){a(`${d} received message from origin ${e.origin} which did not match expected origin ${h}`);return}const c=e.data,l=c.methodName,g=c.args,p=c.id;a(`${d}: Received ${l}() call`);const v=e=>{return n=>{a(`${d}: Sending ${l}() reply`);if(f){a(`${d}: Unable to send ${l}() reply due to destroyed connection`);return}const t={penpal:r,id:p,resolution:e,returnValue:n};if(e===i&&n instanceof Error){t.returnValue=E(n);t.returnValueIsError=true}try{u.postMessage(t,m)}catch(e){if(e.name===s){u.postMessage({penpal:r,id:p,resolution:i,returnValue:E(e),returnValueIsError:true},m)}throw e}}};new Promise(e=>e(n[l].apply(n,g))).then(v(o),v(i))};l.addEventListener(c,g);return()=>{f=true;l.removeEventListener(c,g)}};let $=0;var N=()=>++$;var C=(e,n,i,s,d)=>{const l=n.localName,u=n.local,m=n.remote,h=n.originForSending,f=n.originForReceiving;let g=false;d(`${l}: Connecting call sender`);const p=e=>{return function(){for(var n=arguments.length,i=new Array(n),p=0;p<n;p++){i[p]=arguments[p]}d(`${l}: Sending ${e}() call`);let v;try{if(m.closed){v=true}}catch(e){v=true}if(v){s()}if(g){const n=new Error(`Unable to send ${e}() call due `+`to destroyed connection`);n.code=a;throw n}return new Promise((n,s)=>{const a=N();const g=t=>{if(t.source!==m||t.data.penpal!==r||t.data.id!==a){return}if(t.origin!==f){d(`${l} received message from origin ${t.origin} which did not match expected origin ${f}`);return}d(`${l}: Received ${e}() reply`);u.removeEventListener(c,g);let i=t.data.returnValue;if(t.data.returnValueIsError){i=w(i)}(t.data.resolution===o?n:s)(i)};u.addEventListener(c,g);m.postMessage({penpal:t,id:a,methodName:e,args:i},h)})}};i.reduce((e,n)=>{e[n]=p(n);return e},e);return()=>{g=true}};const I=6e4;var T=t=>{let r=t.iframe,o=t.methods,i=o===void 0?{}:o,s=t.timeout,l=t.debug;const h=v(l);const f=window;const g=m(),E=g.destroy,w=g.onDestroy;if(!r.src&&!r.srcdoc){const e=new Error("Iframe must have src or srcdoc property defined.");e.code=u;throw e}const $=p(r.src);const N=$==="null"?"*":$;const T=new Promise((t,o)=>{let l;if(s!==undefined){l=setTimeout(()=>{const e=new Error(`Connection to child timed out after ${s}ms`);e.code=d;o(e);E()},s)}const u={};let m;let g;const p=o=>{const c=r.contentWindow;if(o.source!==c||o.data.penpal!==e){return}if(o.origin!==$){h(`Parent received handshake from origin ${o.origin} which did not match expected origin ${$}`);return}h("Parent: Received handshake, sending reply");o.source.postMessage({penpal:n,methodNames:Object.keys(i)},N);const s={localName:"Parent",local:f,remote:c,originForSending:N,originForReceiving:$};if(g){g()}g=y(s,i,h);w(g);if(m){m.forEach(e=>{delete u[e]})}m=o.data.methodNames;const a=C(u,s,m,E,h);w(a);clearTimeout(l);t(u)};f.addEventListener(c,p);h("Parent: Awaiting handshake");var v=setInterval(()=>{if(!document.contains(r)){clearInterval(v);E()}},I);w(()=>{f.removeEventListener(c,p);clearInterval(v);const e=new Error("Connection destroyed");e.code=a;o(e)})});return{promise:T,destroy:E}};var k=function(){let t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},r=t.parentOrigin,o=r===void 0?"*":r,i=t.methods,s=i===void 0?{}:i,u=t.timeout,h=t.debug;const f=v(h);if(window===window.top){const e=new Error("connectToParent() must be called within an iframe");e.code=l;throw e}const g=m(),p=g.destroy,E=g.onDestroy;const w=window;const $=w.parent;const N=new Promise((t,r)=>{let i;if(u!==undefined){i=setTimeout(()=>{const e=new Error(`Connection to parent timed out after ${u}ms`);e.code=d;r(e);p()},u)}const l=e=>{try{clearTimeout()}catch(e){return}if(e.source!==$||e.data.penpal!==n){return}if(o!=="*"&&o!==e.origin){f(`Child received handshake reply from origin ${e.origin} which did not match expected origin ${o}`);return}f("Child: Received handshake reply");w.removeEventListener(c,l);const r={localName:"Child",local:w,remote:$,originForSending:e.origin==="null"?"*":e.origin,originForReceiving:e.origin};const a={};const d=y(r,s,f);E(d);const u=C(a,r,e.data.methodNames,p,f);E(u);clearTimeout(i);t(a)};w.addEventListener(c,l);E(()=>{w.removeEventListener(c,l);const e=new Error("Connection destroyed");e.code=a;r(e)});f("Child: Sending handshake");$.postMessage({penpal:e,methodNames:Object.keys(s)},o)});return{promise:N,destroy:p}};var O={ERR_CONNECTION_DESTROYED:a,ERR_CONNECTION_TIMEOUT:d,ERR_NOT_IN_IFRAME:l,ERR_NO_IFRAME_SRC:u,connectToChild:T,connectToParent:k};return O}();

// Expose penpal to lightning components by adding it to the `window` object.
// https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/security_share_code.htm
window.Penpal = Penpal;

/*
The MIT License (MIT)

Copyright (c) 2016, Aaron Hardy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */