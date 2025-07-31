/*!
 * maptalks.tileclip v0.46.2
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
  typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.maptalks = global.maptalks || {}, global.maptalks));
})(this, (function (exports, maptalks) { 'use strict';

  var WORKERCODE = `/*!
 * maptalks.tileclip v0.46.2
  */
function(e){"use strict";class t extends Error{constructor(e,t){super(e),this.code=t}}var r={accept:"image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26"};function a(e){return"number"==typeof e}function n(e,r){return new t(e,r)}n("not find canvas.The current environment does not support OffscreenCanvas",-4);var i=n("fetch tile data cancel",499),o=n("fetch tile data timeout",408);function s(e){return n("fetch NetWork error, the url is "+e,-5)}function h(e){return n(e,-1)}function f(e){return n(e,-2)}function l(e){return n(e,-3)}function u(e){return Array.isArray(e)?e:[e]}function c(e){var[t,r]=e,a=6378137,n=t*Math.PI/180*a,i=r*Math.PI/180;return[n,3189068.5*Math.log((1+Math.sin(i))/(1-Math.sin(i)))]}function g(e){return"EPSG:3857"===e}var d,p,m,v,y,b,w=0;function x(){return++w}function M(e){return e&&e instanceof ImageBitmap}function k(e){Array.isArray(e)||(e=[e]),e.forEach(function(e){e&&e.close&&e.close()})}function I(e,t){var r=Math.floor(10*(e+1e4)),a=r>>16,n=r>>8&255,i=255&r;return t?(t[0]=a,t[1]=n,t[2]=i,t):[a,n,i]}function A(e,t,r){return.1*(256*e*256+256*t+r)-1e4}function U(e,t,r){for(;e.indexOf(t)>-1;)e=e.replace(t,r);return e}function B(e){var t=u(e),r=[];return t.forEach(function(e){M(e)&&r.push(e)}),r}function P(e,t,r,a,n){var i="{x}",o=U(e,i,t);return o=U(o,i="{y}",r),function(e,t){if(!t||!t.length)return e;var r=t.length,a=Math.floor(Math.random()*r);return U(e,"{s}",t[a=Math.min(a,r-1)])}(o=U(o,i="{z}",a),n)}function E(e,t){return!(e&&e.indexOf("{s}")>-1&&(!t||0===t.length))}function T(e,t,r,a,n,i){var o,s,h,f,l,u,c,g,d,p,m,v,y,b,w,x,M,k,I,A,U,B,P,E,T,D,S,V,O,z;for(T=0;T<i;T++){for(P=T,E=0,h=(o=e[B=T*n])>>8&255,f=o>>16&255,l=o>>24&255,b=k=(s=255&o)*a[6],w=I=h*a[6],x=A=f*a[6],M=U=l*a[6],S=a[0],V=a[1],O=a[4],z=a[5],D=0;D<n;D++)p=(u=255&(o=e[B]))*S+s*V+b*O+k*z,m=(c=o>>8&255)*S+h*V+w*O+I*z,v=(g=o>>16&255)*S+f*V+x*O+A*z,y=(d=o>>24&255)*S+l*V+M*O+U*z,k=b,I=w,A=x,U=M,b=p,w=m,x=v,M=y,s=u,h=c,f=g,l=d,r[E]=b,r[E+1]=w,r[E+2]=x,r[E+3]=M,E+=4,B++;for(E-=4,P+=i*(n-1),h=(o=e[--B])>>8&255,f=o>>16&255,l=o>>24&255,b=k=(s=255&o)*a[7],w=I=h*a[7],x=A=f*a[7],M=U=l*a[7],u=s,c=h,g=f,d=l,S=a[2],V=a[3],D=n-1;D>=0;D--)p=u*S+s*V+b*O+k*z,m=c*S+h*V+w*O+I*z,v=g*S+f*V+x*O+A*z,y=d*S+l*V+M*O+U*z,k=b,I=w,A=x,U=M,b=p,w=m,x=v,M=y,s=u,h=c,f=g,l=d,u=255&(o=e[B]),c=o>>8&255,g=o>>16&255,d=o>>24&255,o=(r[E]+b|0)+(r[E+1]+w<<8)+(r[E+2]+x<<16)+(r[E+3]+M<<24),t[P]=o,B--,E-=4,P-=i}}var D,S=function(e,t,r,a){if(a){var n=new Uint32Array(e.buffer),i=new Uint32Array(n.length),o=new Float32Array(4*Math.max(t,r)),s=function(e){e<.5&&(e=.5);var t=Math.exp(.527076)/e,r=Math.exp(-t),a=Math.exp(-2*t),n=(1-r)*(1-r)/(1+2*t*r-a);return d=n,p=n*(t-1)*r,m=n*(t+1)*r,v=-n*a,y=2*r,b=-a,new Float32Array([d,p,m,v,y,b,(d+p)/(1-y-b),(m+v)/(1-y-b)])}(a);T(n,i,o,s,t,r),T(i,n,o,s,r,t)}};function V(e=256){return!D&&OffscreenCanvas&&(D=new OffscreenCanvas(1,1)),D&&O(D,e,e),D}function O(e,t,r){e&&(e.width=t,e.height=r)}function z(e){var t=e.getContext("2d",{willReadFrequently:!0});return function(e){var t=e.canvas;e.clearRect(0,0,t.width,t.height)}(t),t}function C(e){var t=V(e);return z(t),t.transferToImageBitmap()}function F(e,t){if(1===e.length)return e[0];if(0===e.length)return f("merge tiles error,not find imagebitmaps");for(var r=0,a=e.length;r<a;r++){if(!M(e[r]))return f("merge tiles error,images not imagebitmap")}var n=e[0].width,i=V(n),o=z(i);return t&&(o.save(),o.globalCompositeOperation=t),e.forEach(function(e){o.drawImage(e,0,0,n,n)}),t&&o.restore(),k(e),i.transferToImageBitmap()}function N(e,t,r,a){var n=z(e);n.save();n.beginPath(),a&&n.rect(0,0,e.width,e.height),t.forEach(function(e){!function(e){for(var t=0,r=e.length;t<r;t++){var a=e[t],i=a[0],o=a[a.length-1],[s,h]=i,[f,l]=o;s===f&&h===l||a.push(i);for(var u=0,c=a.length;u<c;u++){var[g,d]=a[u];0===u?n.moveTo(g,d):n.lineTo(g,d)}}}(e)}),n.clip("evenodd"),n.drawImage(r,0,0,e.width,e.height);var i=e.transferToImageBitmap();return n.restore(),k(r),i}function G(e,t){var r=1/0,a=1/0,n=-1/0,i=-1/0,o=256;e.forEach(function(e){var[t,s]=e;r=Math.min(t,r),a=Math.min(s,a),n=Math.max(t,n),i=Math.max(s,i),o=e.tileImage.width});var s=(n-r+1)*o,h=(i-a+1)*o,f=V();O(f,s,h);var l=z(f);return t&&(l.font="bold 28px serif",l.textAlign="center",l.textBaseline="middle",l.fillStyle="red",l.strokeStyle="red"),e.forEach(function(e){var[n,i,s]=e,h=(n-r)*o,f=(i-a)*o,u=e.tileImage;l.drawImage(u,h,f,o,o),t&&(l.rect(h,f,o,o),l.stroke(),l.fillText([n,i,s].join("_").toString(),h+100,f+100))}),k(e.map(function(e){return e.tileImage})),f.transferToImageBitmap()}function L(e,t){var r=V(),n=function(e,t,r){if(!r)return t;O(e,t.width,t.height);var a=z(e);a.save(),a.filter=r,a.drawImage(t,0,0),a.restore();var n=e.transferToImageBitmap();return k(t),n}(r,e,t.filter),i=function(e,t,r){if(!a(r)||r<=0)return t;O(e,t.width,t.height);var n=z(e);n.drawImage(t,0,0);var i=n.getImageData(0,0,e.width,e.height);S(i.data,e.width,e.height,r),n.putImageData(i,0,0);var o=e.transferToImageBitmap();return k(t),o}(r,n,t.gaussianBlurRadius),o=function(e,t=1){if(!a(t)||1===t||t<0||t>1)return e;var r=V();O(r,e.width,e.height);var n=z(r);n.globalAlpha=t,n.drawImage(e,0,0);var i=r.transferToImageBitmap();return n.globalAlpha=1,k(e),i}(i,t.opacity);return o}function _(e,t){return new Promise(function(r,a){t?function(e){var t=V();return O(t,e.width,e.height),z(t).drawImage(e,0,0),k(e),t.convertToBlob()}(e).then(function(e){var t=URL.createObjectURL(e);r(t)}).catch(function(e){a(e)}):r(e)})}var R=function(){};class Y{constructor(e,t){this.max=e,this.onRemove=t||R,this.reset()}reset(){if(this.data){var e=this.data.values();for(var t of e)this.onRemove(t)}return this.data=new Map,this}clear(){this.reset(),delete this.onRemove}add(e,t){return t?(this.has(e)?(this.data.delete(e),this.data.set(e,t),this.data.size>this.max&&this.shrink()):(this.data.set(e,t),this.data.size>this.max&&this.shrink()),this):this}keys(){var e=new Array(this.data.size),t=0,r=this.data.keys();for(var a of r)e[t++]=a;return e}shrink(){for(var e=this.data.keys(),t=e.next();this.data.size>this.max;){var r=this.getAndRemove(t.value);r&&this.onRemove(r),t=e.next()}}has(e){return this.data.has(e)}getAndRemove(e){if(!this.has(e))return null;var t=this.data.get(e);return this.data.delete(e),t}get(e){return this.has(e)?this.data.get(e):null}remove(e){if(!this.has(e))return this;var t=this.data.get(e);return this.data.delete(e),this.onRemove(t),this}setMaxSize(e){return this.max=e,this.data.size>this.max&&this.shrink(),this}}
/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function(){function e(e){throw e}var t=void 0,r=!0,a=this;function n(e,r){var n,i=e.split("."),o=a;!(i[0]in o)&&o.execScript&&o.execScript("var "+i[0]);for(;i.length&&(n=i.shift());)i.length||r===t?o=o[n]?o[n]:o[n]={}:o[n]=r}var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array&&"undefined"!=typeof DataView;function o(t,r){this.index="number"==typeof r?r:0,this.i=0,this.buffer=t instanceof(i?Uint8Array:Array)?t:new(i?Uint8Array:Array)(32768),2*this.buffer.length<=this.index&&e(Error("invalid index")),this.buffer.length<=this.index&&this.f()}o.prototype.f=function(){var e,t=this.buffer,r=t.length,a=new(i?Uint8Array:Array)(r<<1);if(i)a.set(t);else for(e=0;e<r;++e)a[e]=t[e];return this.buffer=a},o.prototype.d=function(e,t,r){var a,n=this.buffer,i=this.index,o=this.i,s=n[i];if(r&&1<t&&(e=8<t?(c[255&e]<<24|c[e>>>8&255]<<16|c[e>>>16&255]<<8|c[e>>>24&255])>>32-t:c[e]>>8-t),8>t+o)s=s<<t|e,o+=t;else for(a=0;a<t;++a)s=s<<1|e>>t-a-1&1,8===++o&&(o=0,n[i++]=c[s],s=0,i===n.length&&(n=this.f()));n[i]=s,this.buffer=n,this.i=o,this.index=i},o.prototype.finish=function(){var e,t=this.buffer,r=this.index;return 0<this.i&&(t[r]<<=8-this.i,t[r]=c[t[r]],r++),i?e=t.subarray(0,r):(t.length=r,e=t),e};var s,h=new(i?Uint8Array:Array)(256);for(s=0;256>s;++s){for(var f=u=s,l=7,u=u>>>1;u;u>>>=1)f<<=1,f|=1&u,--l;h[s]=(f<<l&255)>>>0}var c=h;function g(e){this.buffer=new(i?Uint16Array:Array)(2*e),this.length=0}function d(e){var t,r,a,n,o,s,h,f,l,u,c=e.length,g=0,d=Number.POSITIVE_INFINITY;for(f=0;f<c;++f)e[f]>g&&(g=e[f]),e[f]<d&&(d=e[f]);for(t=1<<g,r=new(i?Uint32Array:Array)(t),a=1,n=0,o=2;a<=g;){for(f=0;f<c;++f)if(e[f]===a){for(s=0,h=n,l=0;l<a;++l)s=s<<1|1&h,h>>=1;for(u=a<<16|f,l=s;l<t;l+=o)r[l]=u;++n}++a,n<<=1,o<<=1}return[r,g,d]}function p(e,t){this.h=v,this.w=0,this.input=i&&e instanceof Array?new Uint8Array(e):e,this.b=0,t&&(t.lazy&&(this.w=t.lazy),"number"==typeof t.compressionType&&(this.h=t.compressionType),t.outputBuffer&&(this.a=i&&t.outputBuffer instanceof Array?new Uint8Array(t.outputBuffer):t.outputBuffer),"number"==typeof t.outputIndex&&(this.b=t.outputIndex)),this.a||(this.a=new(i?Uint8Array:Array)(32768))}g.prototype.getParent=function(e){return 2*((e-2)/4|0)},g.prototype.push=function(e,t){var r,a,n,i=this.buffer;for(r=this.length,i[this.length++]=t,i[this.length++]=e;0<r&&(a=this.getParent(r),i[r]>i[a]);)n=i[r],i[r]=i[a],i[a]=n,n=i[r+1],i[r+1]=i[a+1],i[a+1]=n,r=a;return this.length},g.prototype.pop=function(){var e,t,r,a,n,i=this.buffer;for(t=i[0],e=i[1],this.length-=2,i[0]=i[this.length],i[1]=i[this.length+1],n=0;!((a=2*n+2)>=this.length)&&(a+2<this.length&&i[a+2]>i[a]&&(a+=2),i[a]>i[n]);)r=i[n],i[n]=i[a],i[a]=r,r=i[n+1],i[n+1]=i[a+1],i[a+1]=r,n=a;return{index:e,value:t,length:this.length}};var m,v=2,y={NONE:0,r:1,k:v,N:3},b=[];for(m=0;288>m;m++)switch(r){case 143>=m:b.push([m+48,8]);break;case 255>=m:b.push([m-144+400,9]);break;case 279>=m:b.push([m-256+0,7]);break;case 287>=m:b.push([m-280+192,8]);break;default:e("invalid literal: "+m)}function w(e,t){this.length=e,this.G=t}p.prototype.j=function(){var a,n,s,h,f=this.input;switch(this.h){case 0:for(s=0,h=f.length;s<h;){var l,u,c,g=n=i?f.subarray(s,s+65535):f.slice(s,s+65535),d=(s+=n.length)===h,p=t,m=t,y=this.a,w=this.b;if(i){for(y=new Uint8Array(this.a.buffer);y.length<=w+g.length+5;)y=new Uint8Array(y.length<<1);y.set(this.a)}if(l=d?1:0,y[w++]=0|l,c=65536+~(u=g.length)&65535,y[w++]=255&u,y[w++]=u>>>8&255,y[w++]=255&c,y[w++]=c>>>8&255,i)y.set(g,w),w+=g.length,y=y.subarray(0,w);else{for(p=0,m=g.length;p<m;++p)y[w++]=g[p];y.length=w}this.b=w,this.a=y}break;case 1:var x=new o(i?new Uint8Array(this.a.buffer):this.a,this.b);x.d(1,1,r),x.d(1,2,r);var M,I,B,P=k(this,f);for(M=0,I=P.length;M<I;M++)if(B=P[M],o.prototype.d.apply(x,b[B]),256<B)x.d(P[++M],P[++M],r),x.d(P[++M],5),x.d(P[++M],P[++M],r);else if(256===B)break;this.a=x.finish(),this.b=this.a.length;break;case v:var E,T,D,S,V,O,z,C,F,N,G,L,_,R,Y,j=new o(i?new Uint8Array(this.a.buffer):this.a,this.b),W=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Z=Array(19);for(E=v,j.d(1,1,r),j.d(E,2,r),T=k(this,f),z=U(O=A(this.L,15)),F=U(C=A(this.K,7)),D=286;257<D&&0===O[D-1];D--);for(S=30;1<S&&0===C[S-1];S--);var X,H,q,J,K,Q,$=D,ee=S,te=new(i?Uint32Array:Array)($+ee),re=new(i?Uint32Array:Array)(316),ae=new(i?Uint8Array:Array)(19);for(X=H=0;X<$;X++)te[H++]=O[X];for(X=0;X<ee;X++)te[H++]=C[X];if(!i)for(X=0,J=ae.length;X<J;++X)ae[X]=0;for(X=K=0,J=te.length;X<J;X+=H){for(H=1;X+H<J&&te[X+H]===te[X];++H);if(q=H,0===te[X])if(3>q)for(;0<q--;)re[K++]=0,ae[0]++;else for(;0<q;)(Q=138>q?q:138)>q-3&&Q<q&&(Q=q-3),10>=Q?(re[K++]=17,re[K++]=Q-3,ae[17]++):(re[K++]=18,re[K++]=Q-11,ae[18]++),q-=Q;else if(re[K++]=te[X],ae[te[X]]++,3>--q)for(;0<q--;)re[K++]=te[X],ae[te[X]]++;else for(;0<q;)(Q=6>q?q:6)>q-3&&Q<q&&(Q=q-3),re[K++]=16,re[K++]=Q-3,ae[16]++,q-=Q}for(a=i?re.subarray(0,K):re.slice(0,K),N=A(ae,7),R=0;19>R;R++)Z[R]=N[W[R]];for(V=19;4<V&&0===Z[V-1];V--);for(G=U(N),j.d(D-257,5,r),j.d(S-1,5,r),j.d(V-4,4,r),R=0;R<V;R++)j.d(Z[R],3,r);for(R=0,Y=a.length;R<Y;R++)if(L=a[R],j.d(G[L],N[L],r),16<=L){switch(R++,L){case 16:_=2;break;case 17:_=3;break;case 18:_=7;break;default:e("invalid code: "+L)}j.d(a[R],_,r)}var ne,ie,oe,se,he,fe,le,ue,ce=[z,O],ge=[F,C];for(he=ce[0],fe=ce[1],le=ge[0],ue=ge[1],ne=0,ie=T.length;ne<ie;++ne)if(oe=T[ne],j.d(he[oe],fe[oe],r),256<oe)j.d(T[++ne],T[++ne],r),se=T[++ne],j.d(le[se],ue[se],r),j.d(T[++ne],T[++ne],r);else if(256===oe)break;this.a=j.finish(),this.b=this.a.length;break;default:e("invalid compression type")}return this.a};var x=function(){function t(t){switch(r){case 3===t:return[257,t-3,0];case 4===t:return[258,t-4,0];case 5===t:return[259,t-5,0];case 6===t:return[260,t-6,0];case 7===t:return[261,t-7,0];case 8===t:return[262,t-8,0];case 9===t:return[263,t-9,0];case 10===t:return[264,t-10,0];case 12>=t:return[265,t-11,1];case 14>=t:return[266,t-13,1];case 16>=t:return[267,t-15,1];case 18>=t:return[268,t-17,1];case 22>=t:return[269,t-19,2];case 26>=t:return[270,t-23,2];case 30>=t:return[271,t-27,2];case 34>=t:return[272,t-31,2];case 42>=t:return[273,t-35,3];case 50>=t:return[274,t-43,3];case 58>=t:return[275,t-51,3];case 66>=t:return[276,t-59,3];case 82>=t:return[277,t-67,4];case 98>=t:return[278,t-83,4];case 114>=t:return[279,t-99,4];case 130>=t:return[280,t-115,4];case 162>=t:return[281,t-131,5];case 194>=t:return[282,t-163,5];case 226>=t:return[283,t-195,5];case 257>=t:return[284,t-227,5];case 258===t:return[285,t-258,0];default:e("invalid length: "+t)}}var a,n,i=[];for(a=3;258>=a;a++)n=t(a),i[a]=n[2]<<24|n[1]<<16|n[0];return i}(),M=i?new Uint32Array(x):x;function k(a,n){function o(t,a){var n,i,o,s,h=t.G,f=[],l=0;switch(n=M[t.length],f[l++]=65535&n,f[l++]=n>>16&255,f[l++]=n>>24,r){case 1===h:i=[0,h-1,0];break;case 2===h:i=[1,h-2,0];break;case 3===h:i=[2,h-3,0];break;case 4===h:i=[3,h-4,0];break;case 6>=h:i=[4,h-5,1];break;case 8>=h:i=[5,h-7,1];break;case 12>=h:i=[6,h-9,2];break;case 16>=h:i=[7,h-13,2];break;case 24>=h:i=[8,h-17,3];break;case 32>=h:i=[9,h-25,3];break;case 48>=h:i=[10,h-33,4];break;case 64>=h:i=[11,h-49,4];break;case 96>=h:i=[12,h-65,5];break;case 128>=h:i=[13,h-97,5];break;case 192>=h:i=[14,h-129,6];break;case 256>=h:i=[15,h-193,6];break;case 384>=h:i=[16,h-257,7];break;case 512>=h:i=[17,h-385,7];break;case 768>=h:i=[18,h-513,8];break;case 1024>=h:i=[19,h-769,8];break;case 1536>=h:i=[20,h-1025,9];break;case 2048>=h:i=[21,h-1537,9];break;case 3072>=h:i=[22,h-2049,10];break;case 4096>=h:i=[23,h-3073,10];break;case 6144>=h:i=[24,h-4097,11];break;case 8192>=h:i=[25,h-6145,11];break;case 12288>=h:i=[26,h-8193,12];break;case 16384>=h:i=[27,h-12289,12];break;case 24576>=h:i=[28,h-16385,13];break;case 32768>=h:i=[29,h-24577,13];break;default:e("invalid distance")}for(n=i,f[l++]=n[0],f[l++]=n[1],f[l++]=n[2],o=0,s=f.length;o<s;++o)v[y++]=f[o];w[f[0]]++,x[f[3]]++,b=t.length+a-1,d=null}var s,h,f,l,u,c,g,d,p,m={},v=i?new Uint16Array(2*n.length):[],y=0,b=0,w=new(i?Uint32Array:Array)(286),x=new(i?Uint32Array:Array)(30),k=a.w;if(!i){for(f=0;285>=f;)w[f++]=0;for(f=0;29>=f;)x[f++]=0}for(w[256]=1,s=0,h=n.length;s<h;++s){for(f=u=0,l=3;f<l&&s+f!==h;++f)u=u<<8|n[s+f];if(m[u]===t&&(m[u]=[]),c=m[u],!(0<b--)){for(;0<c.length&&32768<s-c[0];)c.shift();if(s+3>=h){for(d&&o(d,-1),f=0,l=h-s;f<l;++f)p=n[s+f],v[y++]=p,++w[p];break}0<c.length?(g=I(n,s,c),d?d.length<g.length?(p=n[s-1],v[y++]=p,++w[p],o(g,0)):o(d,-1):g.length<k?d=g:o(g,0)):d?o(d,-1):(p=n[s],v[y++]=p,++w[p])}c.push(s)}return v[y++]=256,w[256]++,a.L=w,a.K=x,i?v.subarray(0,y):v}function I(e,t,r){var a,n,i,o,s,h,f=0,l=e.length;o=0,h=r.length;e:for(;o<h;o++){if(a=r[h-o-1],i=3,3<f){for(s=f;3<s;s--)if(e[a+s-1]!==e[t+s-1])continue e;i=f}for(;258>i&&t+i<l&&e[a+i]===e[t+i];)++i;if(i>f&&(n=a,f=i),258===i)break}return new w(f,t-n)}function A(e,t){var r,a,n,o,s,h=e.length,f=new g(572),l=new(i?Uint8Array:Array)(h);if(!i)for(o=0;o<h;o++)l[o]=0;for(o=0;o<h;++o)0<e[o]&&f.push(o,e[o]);if(r=Array(f.length/2),a=new(i?Uint32Array:Array)(f.length/2),1===r.length)return l[f.pop().index]=1,l;for(o=0,s=f.length/2;o<s;++o)r[o]=f.pop(),a[o]=r[o].value;for(n=function(e,t,r){function a(e){var r=d[e][p[e]];r===t?(a(e+1),a(e+1)):--c[r],++p[e]}var n,o,s,h,f,l=new(i?Uint16Array:Array)(r),u=new(i?Uint8Array:Array)(r),c=new(i?Uint8Array:Array)(t),g=Array(r),d=Array(r),p=Array(r),m=(1<<r)-t,v=1<<r-1;for(l[r-1]=t,o=0;o<r;++o)m<v?u[o]=0:(u[o]=1,m-=v),m<<=1,l[r-2-o]=(l[r-1-o]/2|0)+t;for(l[0]=u[0],g[0]=Array(l[0]),d[0]=Array(l[0]),o=1;o<r;++o)l[o]>2*l[o-1]+u[o]&&(l[o]=2*l[o-1]+u[o]),g[o]=Array(l[o]),d[o]=Array(l[o]);for(n=0;n<t;++n)c[n]=r;for(s=0;s<l[r-1];++s)g[r-1][s]=e[s],d[r-1][s]=s;for(n=0;n<r;++n)p[n]=0;for(1===u[r-1]&&(--c[0],++p[r-1]),o=r-2;0<=o;--o){for(h=n=0,f=p[o+1],s=0;s<l[o];s++)(h=g[o+1][f]+g[o+1][f+1])>e[n]?(g[o][s]=h,d[o][s]=t,f+=2):(g[o][s]=e[n],d[o][s]=n,++n);p[o]=0,1===u[o]&&a(o)}return c}(a,a.length,t),o=0,s=r.length;o<s;++o)l[r[o].index]=n[o];return l}function U(e){var t,r,a,n,o=new(i?Uint16Array:Array)(e.length),s=[],h=[],f=0;for(t=0,r=e.length;t<r;t++)s[e[t]]=1+(0|s[e[t]]);for(t=1,r=16;t<=r;t++)h[t]=f,f+=0|s[t],f<<=1;for(t=0,r=e.length;t<r;t++)for(f=h[e[t]],h[e[t]]+=1,a=o[t]=0,n=e[t];a<n;a++)o[t]=o[t]<<1|1&f,f>>>=1;return o}function B(t,r){switch(this.l=[],this.m=32768,this.e=this.g=this.c=this.q=0,this.input=i?new Uint8Array(t):t,this.s=!1,this.n=E,this.B=!1,!r&&(r={})||(r.index&&(this.c=r.index),r.bufferSize&&(this.m=r.bufferSize),r.bufferType&&(this.n=r.bufferType),r.resize&&(this.B=r.resize)),this.n){case P:this.b=32768,this.a=new(i?Uint8Array:Array)(32768+this.m+258);break;case E:this.b=0,this.a=new(i?Uint8Array:Array)(this.m),this.f=this.J,this.t=this.H,this.o=this.I;break;default:e(Error("invalid inflate mode"))}}var P=0,E=1,T={D:P,C:E};B.prototype.p=function(){for(;!this.s;){var a=q(this,3);switch(1&a&&(this.s=r),a>>>=1){case 0:var n=this.input,o=this.c,s=this.a,h=this.b,f=n.length,l=t,u=s.length,c=t;switch(this.e=this.g=0,o+1>=f&&e(Error("invalid uncompressed block header: LEN")),l=n[o++]|n[o++]<<8,o+1>=f&&e(Error("invalid uncompressed block header: NLEN")),l===~(n[o++]|n[o++]<<8)&&e(Error("invalid uncompressed block header: length verify")),o+l>n.length&&e(Error("input buffer is broken")),this.n){case P:for(;h+l>s.length;){if(l-=c=u-h,i)s.set(n.subarray(o,o+c),h),h+=c,o+=c;else for(;c--;)s[h++]=n[o++];this.b=h,s=this.f(),h=this.b}break;case E:for(;h+l>s.length;)s=this.f({v:2});break;default:e(Error("invalid inflate mode"))}if(i)s.set(n.subarray(o,o+l),h),h+=l,o+=l;else for(;l--;)s[h++]=n[o++];this.c=o,this.b=h,this.a=s;break;case 1:this.o(Z,H);break;case 2:var g,p,m,v,y=q(this,5)+257,b=q(this,5)+1,w=q(this,4)+4,x=new(i?Uint8Array:Array)(O.length),M=t,k=t,I=t,A=t,U=t;for(U=0;U<w;++U)x[O[U]]=q(this,3);if(!i)for(U=w,w=x.length;U<w;++U)x[O[U]]=0;for(g=d(x),M=new(i?Uint8Array:Array)(y+b),U=0,v=y+b;U<v;)switch(k=J(this,g),k){case 16:for(A=3+q(this,2);A--;)M[U++]=I;break;case 17:for(A=3+q(this,3);A--;)M[U++]=0;I=0;break;case 18:for(A=11+q(this,7);A--;)M[U++]=0;I=0;break;default:I=M[U++]=k}p=d(i?M.subarray(0,y):M.slice(0,y)),m=d(i?M.subarray(y):M.slice(y)),this.o(p,m);break;default:e(Error("unknown BTYPE: "+a))}}return this.t()};var D,S,V=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],O=i?new Uint16Array(V):V,z=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],C=i?new Uint16Array(z):z,F=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],N=i?new Uint8Array(F):F,G=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],L=i?new Uint16Array(G):G,_=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],R=i?new Uint8Array(_):_,Y=new(i?Uint8Array:Array)(288);for(D=0,S=Y.length;D<S;++D)Y[D]=143>=D?8:255>=D?9:279>=D?7:8;var j,W,Z=d(Y),X=new(i?Uint8Array:Array)(30);for(j=0,W=X.length;j<W;++j)X[j]=5;var H=d(X);function q(t,r){for(var a,n=t.g,i=t.e,o=t.input,s=t.c,h=o.length;i<r;)s>=h&&e(Error("input buffer is broken")),n|=o[s++]<<i,i+=8;return a=n&(1<<r)-1,t.g=n>>>r,t.e=i-r,t.c=s,a}function J(t,r){for(var a,n,i=t.g,o=t.e,s=t.input,h=t.c,f=s.length,l=r[0],u=r[1];o<u&&!(h>=f);)i|=s[h++]<<o,o+=8;return(n=(a=l[i&(1<<u)-1])>>>16)>o&&e(Error("invalid code length: "+n)),t.g=i>>n,t.e=o-n,t.c=h,65535&a}function K(e){if("string"==typeof e){var t,r,a=e.split("");for(t=0,r=a.length;t<r;t++)a[t]=(255&a[t].charCodeAt(0))>>>0;e=a}for(var n,i=1,o=0,s=e.length,h=0;0<s;){s-=n=1024<s?1024:s;do{o+=i+=e[h++]}while(--n);i%=65521,o%=65521}return(o<<16|i)>>>0}function Q(t,r){var a,n;if(this.input=t,this.c=0,!r&&(r={})||(r.index&&(this.c=r.index),r.verify&&(this.M=r.verify)),a=t[this.c++],n=t[this.c++],(15&a)===$)this.method=$;else e(Error("unsupported compression method"));0!=((a<<8)+n)%31&&e(Error("invalid fcheck flag:"+((a<<8)+n)%31)),32&n&&e(Error("fdict flag is not supported")),this.A=new B(t,{index:this.c,bufferSize:r.bufferSize,bufferType:r.bufferType,resize:r.resize})}B.prototype.o=function(e,t){var r=this.a,a=this.b;this.u=e;for(var n,i,o,s,h=r.length-258;256!==(n=J(this,e));)if(256>n)a>=h&&(this.b=a,r=this.f(),a=this.b),r[a++]=n;else for(s=C[i=n-257],0<N[i]&&(s+=q(this,N[i])),n=J(this,t),o=L[n],0<R[n]&&(o+=q(this,R[n])),a>=h&&(this.b=a,r=this.f(),a=this.b);s--;)r[a]=r[a++-o];for(;8<=this.e;)this.e-=8,this.c--;this.b=a},B.prototype.I=function(e,t){var r=this.a,a=this.b;this.u=e;for(var n,i,o,s,h=r.length;256!==(n=J(this,e));)if(256>n)a>=h&&(h=(r=this.f()).length),r[a++]=n;else for(s=C[i=n-257],0<N[i]&&(s+=q(this,N[i])),n=J(this,t),o=L[n],0<R[n]&&(o+=q(this,R[n])),a+s>h&&(h=(r=this.f()).length);s--;)r[a]=r[a++-o];for(;8<=this.e;)this.e-=8,this.c--;this.b=a},B.prototype.f=function(){var e,t,r=new(i?Uint8Array:Array)(this.b-32768),a=this.b-32768,n=this.a;if(i)r.set(n.subarray(32768,r.length));else for(e=0,t=r.length;e<t;++e)r[e]=n[e+32768];if(this.l.push(r),this.q+=r.length,i)n.set(n.subarray(a,a+32768));else for(e=0;32768>e;++e)n[e]=n[a+e];return this.b=32768,n},B.prototype.J=function(e){var t,r,a,n=this.input.length/this.c+1|0,o=this.input,s=this.a;return e&&("number"==typeof e.v&&(n=e.v),"number"==typeof e.F&&(n+=e.F)),2>n?r=(a=(o.length-this.c)/this.u[2]/2*258|0)<s.length?s.length+a:s.length<<1:r=s.length*n,i?(t=new Uint8Array(r)).set(s):t=s,this.a=t},B.prototype.t=function(){var e,t,r,a,n,o=0,s=this.a,h=this.l,f=new(i?Uint8Array:Array)(this.q+(this.b-32768));if(0===h.length)return i?this.a.subarray(32768,this.b):this.a.slice(32768,this.b);for(t=0,r=h.length;t<r;++t)for(a=0,n=(e=h[t]).length;a<n;++a)f[o++]=e[a];for(t=32768,r=this.b;t<r;++t)f[o++]=s[t];return this.l=[],this.buffer=f},B.prototype.H=function(){var e,t=this.b;return i?this.B?(e=new Uint8Array(t)).set(this.a.subarray(0,t)):e=this.a.subarray(0,t):(this.a.length>t&&(this.a.length=t),e=this.a),this.buffer=e},Q.prototype.p=function(){var t,r=this.input;return t=this.A.p(),this.c=this.A.c,this.M&&((r[this.c++]<<24|r[this.c++]<<16|r[this.c++]<<8|r[this.c++])>>>0!==K(t)&&e(Error("invalid adler-32 checksum"))),t};var $=8;function ee(e,t){this.input=e,this.a=new(i?Uint8Array:Array)(32768),this.h=te.k;var r,a={};for(r in!t&&(t={})||"number"!=typeof t.compressionType||(this.h=t.compressionType),t)a[r]=t[r];a.outputBuffer=this.a,this.z=new p(this.input,a)}var te=y;function re(e,t){var r,a,i,o;if(Object.keys)r=Object.keys(t);else for(a in r=[],i=0,t)r[i++]=a;for(i=0,o=r.length;i<o;++i)n(e+"."+(a=r[i]),t[a])}ee.prototype.j=function(){var t,r,a,n,o,s,h,f=0;if(h=this.a,(t=$)===$)r=Math.LOG2E*Math.log(32768)-8;else e(Error("invalid compression method"));if(a=r<<4|t,h[f++]=a,t===$)switch(this.h){case te.NONE:o=0;break;case te.r:o=1;break;case te.k:o=2;break;default:e(Error("unsupported compression type"))}else e(Error("invalid compression method"));return n=o<<6,h[f++]=n|31-(256*a+n)%31,s=K(this.input),this.z.b=f,f=(h=this.z.j()).length,i&&((h=new Uint8Array(h.buffer)).length<=f+4&&(this.a=new Uint8Array(h.length+4),this.a.set(h),h=this.a),h=h.subarray(0,f+4)),h[f++]=s>>24&255,h[f++]=s>>16&255,h[f++]=s>>8&255,h[f++]=255&s,h},n("Zlib.Inflate",Q),n("Zlib.Inflate.prototype.decompress",Q.prototype.p),re("Zlib.Inflate.BufferType",{ADAPTIVE:T.C,BLOCK:T.D}),n("Zlib.Deflate",ee),n("Zlib.Deflate.compress",function(e,t){return new ee(e,t).j()}),n("Zlib.Deflate.prototype.compress",ee.prototype.j),re("Zlib.Deflate.CompressionType",{NONE:te.NONE,FIXED:te.r,DYNAMIC:te.k})}).call(self);var j="undefined"!=typeof Float32Array?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});var W,Z=function(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e};function X(e,t,r){return e[0]=t,e[1]=r,e}W=new j(3),j!=Float32Array&&(W[0]=0,W[1]=0,W[2]=0),function(){var e=function(){var e=new j(2);return j!=Float32Array&&(e[0]=0,e[1]=0),e}()}();var H=[],q=[],J=[],K=[],Q=[],$=[],ee=32767,te=64,re=64,ae=3,ne=-1e3,ie=.001,oe=256,se=4,he=.002;function fe(e,t,r){return(1-r)*e+r*t}var le=new TextDecoder("utf-8");function ue(e){return e>>1^-(1&e)}function ce(e,t,r){var a,n=function(e){if(e.length<1e3)return null;var t=new self.Zlib.Inflate(e);return t?t.decompress():null}(new Uint8Array(e));if(!n)throw new Error((a=new Uint8Array(e),le.decode(a)));var i=function(e){for(var t,r,a,n=e,i=te,o=re,s=new Uint8Array(i*o*se),h=0;h<o;h++)for(var f=0;f<i;f++){((t=n[r=2*(150*parseInt(149*h/(o-1))+parseInt(149*f/(i-1)))]+256*n[r+1])>1e4||t<-2e3)&&(t=0);var l=(t+1e3)/ie,u=oe;s[a=4*(h*i+f)]=l/(u*u),s[a+1]=(l-s[a]*u*u)/u,s[a+2]=l-s[a]*u*u-s[a+1]*u,s[a+3]=255}return s}(n),o=function(e,t){for(var r=t,a=t,n=r+1,i=a+1,o=ae,s=ne,h=ie,f=oe,l=he,u=new Float32Array(n*i),c=0,g=1/0,d=-1/0,p=0;p<n;p++)for(var m=p>=a?a-1:p,v=0;v<i;v++){for(var y=0,b=m*(4*r)+4*(v>=r?r-1:v),w=0;w<o;w++)y=y*f+e[b+w];y=1*(y*h+s),y-=l,u[c]=y,y<g&&(g=y),y>d&&(d=y),c++}return{data:u,min:g,max:d,width:0,height:0,tileSize:0,image:null}}(i,t-1);return o.width=o.height=t,o.tileSize=r,be(o),o}class ge{constructor(e,t,r,a,n){this.p0=[],this.p1=[],this.p2=[],this.normal=[],this.min=[],this.max=[],this.set(e,t,r,a,n)}set(e,t,r,a,n){this.radius=n;var i=3*t,o=3*t+1,s=3*t+2;this.p0[0]=e[i]*n,this.p0[1]=e[o]*n,this.p0[2]=e[s],i=3*r,o=3*r+1,s=3*r+2,this.p1[0]=e[i]*n,this.p1[1]=e[o]*n,this.p1[2]=e[s],i=3*a,o=3*a+1,s=3*a+2,this.p2[0]=e[i]*n,this.p2[1]=e[o]*n,this.p2[2]=e[s],this.min[0]=Math.min(this.p0[0],this.p1[0],this.p2[0]),this.min[1]=Math.min(this.p0[1],this.p1[1],this.p2[1]),this.max[0]=Math.max(this.p0[0],this.p1[0],this.p2[0]),this.max[1]=Math.max(this.p0[1],this.p1[1],this.p2[1]);var h=Z(H,this.p1,this.p0),f=Z(q,this.p2,this.p1);this.normal=function(e,t){var r=t[0],a=t[1],n=t[2],i=r*r+a*a+n*n;return i>0&&(i=1/Math.sqrt(i)),e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e}(this.normal,function(e,t,r){var a=t[0],n=t[1],i=t[2],o=r[0],s=r[1],h=r[2];return e[0]=n*h-i*s,e[1]=i*o-a*h,e[2]=a*s-n*o,e}(this.normal,h,f))}contains(e,t){if(e<this.min[0]||e>this.max[0]||t<this.min[1]||t>this.max[1])return!1;X(J,this.p0[0],this.p0[1]),X(K,this.p1[0],this.p1[1]),X(Q,this.p2[0],this.p2[1]);var r=de(J[0],J[1],K[0],K[1],Q[0],Q[1]);return de(e,t,J[0],J[1],Q[0],Q[1])+de(e,t,J[0],J[1],K[0],K[1])+de(e,t,K[0],K[1],Q[0],Q[1])-r<=1e-4}getHeight(e,t){var r=this.normal;return this.p0[2]-((e-this.p0[0])*r[0]+(t-this.p0[1])*r[1])/r[2]}}function de(e,t,r,a,n,i){return.5*Math.abs(e*a+r*i+n*t-e*i-r*t-n*a)}var pe=null;function me(e,t,r){if(pe&&pe.contains(t,r))return pe.getHeight(t,r);for(var a=0;a<e.length;a++)if(e[a].contains(t,r))return pe=e[a],e[a].getHeight(t,r);return 0}var ve=[];function ye(e,t,r){for(var a=function(e){var t=0,r=3,a=Float64Array.BYTES_PER_ELEMENT*r,n=3,i=Uint16Array.BYTES_PER_ELEMENT*n,o=3,s=Uint16Array.BYTES_PER_ELEMENT,h=new DataView(e);t+=a;var f=h.getFloat32(t,!0);t+=Float32Array.BYTES_PER_ELEMENT;var l=h.getFloat32(t,!0);t+=Float32Array.BYTES_PER_ELEMENT,t+=a;var u=h.getFloat64(t,!0);t+=Float64Array.BYTES_PER_ELEMENT,t+=a;var c=h.getUint32(t,!0);t+=Uint32Array.BYTES_PER_ELEMENT;var g=new Uint16Array(e,t,3*c);t+=c*i,c>65536&&(s=Uint32Array.BYTES_PER_ELEMENT);var d=g.subarray(0,c),p=g.subarray(c,2*c),m=g.subarray(2*c,3*c);(function(e,t,r){for(var a=e.length,n=0,i=0,o=0,s=0;s<a;++s)n+=ue(e[s]),i+=ue(t[s]),e[s]=n,t[s]=i,r&&(o+=ue(r[s]),r[s]=o)})(d,p,m),t%s!==0&&(t+=s-t%s);var v=h.getUint32(t,!0);t+=Uint32Array.BYTES_PER_ELEMENT;for(var y=c>65536?new Uint32Array(e,t,v*o):new Uint16Array(e,t,v*o),b=0,w=y.length,x=0;x<w;++x){var M=y[x];y[x]=b-M,0===M&&++b}for(var k={minimumHeight:f,maximumHeight:l,quantizedVertices:g,indices:y}.quantizedVertices,I=k.length/3,A=k.subarray(0,I),U=k.subarray(I,2*I),B=k.subarray(2*I,3*I),P=$,E=0;E<I;++E){var T=A[E],D=U[E],S=T/ee,V=D/ee,O=fe(f,l,B[E]/ee);P[3*E]=S,P[3*E+1]=1-V,P[3*E+2]=O}return{positions:P,radius:u,min:f,max:l,indices:y}}(e),{positions:n,min:i,max:o,indices:s,radius:h}=a,f=[],l=0,u=0;u<s.length;u+=3){var c=ve[l];c?c.set(n,s[u],s[u+1],s[u+2],2*h):c=ve[l]=new ge(n,s[u],s[u+1],s[u+2],2*h),l++,f.push(c)}var g=new Float32Array(t*t);l=0;for(var d=0;d<t;d++)for(var p=0;p<t;p++)g[l++]=me(f,p/t*h*2,d/t*h*2);var m={data:g,min:i,max:o,width:t,height:t,tileSize:r};return be(m),m}function be(e){var t=V(),{width:r,height:a,data:n,tileSize:i}=e;if(r&&a&&n)try{O(t,r,a);for(var o=z(t),s=o.createImageData(r,a),h=[0,0,0],f=0,l=n.length;f<l;f++){var u=n[f],[c,g,d]=I(u,h),p=4*f;s.data[p]=c,s.data[p+1]=g,s.data[p+2]=d,s.data[p+3]=255}o.putImageData(s,0,0);var m=t.transferToImageBitmap();O(t,i,i),(o=z(t)).drawImage(m,0,0,r,a,0,0,i,i),e.image=t.transferToImageBitmap()}catch(e){console.log(e)}}var we,xe,Me={exports:{}};we=Me,
/* Copyright 2015 Esri. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 @preserve */
function(){var e,t,r,a,n,i,o,s,h,f,l,u,c,g,d=(e={defaultNoDataValue:-34027999387901484e22,decode:function(i,o){var s=(o=o||{}).encodedMaskData||null===o.encodedMaskData,h=n(i,o.inputOffset||0,s),f=null!==o.noDataValue?o.noDataValue:e.defaultNoDataValue,l=t(h,o.pixelType||Float32Array,o.encodedMaskData,f,o.returnMask),u={width:h.width,height:h.height,pixelData:l.resultPixels,minValue:l.minValue,maxValue:h.pixels.maxValue,noDataValue:f};return l.resultMask&&(u.maskData=l.resultMask),o.returnEncodedMask&&h.mask&&(u.encodedMaskData=h.mask.bitset?h.mask.bitset:null),o.returnFileInfo&&(u.fileInfo=r(h),o.computeUsedBitDepths&&(u.fileInfo.bitDepths=a(h))),u}},t=function(e,t,r,a,n){var o,s,h,f=0,l=e.pixels.numBlocksX,u=e.pixels.numBlocksY,c=Math.floor(e.width/l),g=Math.floor(e.height/u),d=2*e.maxZError,p=Number.MAX_VALUE;r=r||(e.mask?e.mask.bitset:null),s=new t(e.width*e.height),n&&r&&(h=new Uint8Array(e.width*e.height));for(var m,v,y=new Float32Array(c*g),b=0;b<=u;b++){var w=b!==u?g:e.height%u;if(0!==w)for(var x=0;x<=l;x++){var M=x!==l?c:e.width%l;if(0!==M){var k,I,A,U,B=b*e.width*g+x*c,P=e.width-M,E=e.pixels.blocks[f];if(E.encoding<2?(0===E.encoding?k=E.rawData:(i(E.stuffedData,E.bitsPerPixel,E.numValidPixels,E.offset,d,y,e.pixels.maxValue),k=y),I=0):A=2===E.encoding?0:E.offset,r)for(v=0;v<w;v++){for(7&B&&(U=r[B>>3],U<<=7&B),m=0;m<M;m++)7&B||(U=r[B>>3]),128&U?(h&&(h[B]=1),p=p>(o=E.encoding<2?k[I++]:A)?o:p,s[B++]=o):(h&&(h[B]=0),s[B++]=a),U<<=1;B+=P}else if(E.encoding<2)for(v=0;v<w;v++){for(m=0;m<M;m++)p=p>(o=k[I++])?o:p,s[B++]=o;B+=P}else for(p=p>A?A:p,v=0;v<w;v++){for(m=0;m<M;m++)s[B++]=A;B+=P}if(1===E.encoding&&I!==E.numValidPixels)throw"Block and Mask do not match";f++}}}return{resultPixels:s,resultMask:h,minValue:p}},r=function(e){return{fileIdentifierString:e.fileIdentifierString,fileVersion:e.fileVersion,imageType:e.imageType,height:e.height,width:e.width,maxZError:e.maxZError,eofOffset:e.eofOffset,mask:e.mask?{numBlocksX:e.mask.numBlocksX,numBlocksY:e.mask.numBlocksY,numBytes:e.mask.numBytes,maxValue:e.mask.maxValue}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,numBytes:e.pixels.numBytes,maxValue:e.pixels.maxValue,noDataValue:e.noDataValue}}},a=function(e){for(var t=e.pixels.numBlocksX*e.pixels.numBlocksY,r={},a=0;a<t;a++){var n=e.pixels.blocks[a];0===n.encoding?r.float32=!0:1===n.encoding?r[n.bitsPerPixel]=!0:r[0]=!0}return Object.keys(r)},n=function(e,t,r){var a={},n=new Uint8Array(e,t,10);if(a.fileIdentifierString=String.fromCharCode.apply(null,n),"CntZImage"!==a.fileIdentifierString.trim())throw"Unexpected file identifier string: "+a.fileIdentifierString;t+=10;var i=new DataView(e,t,24);if(a.fileVersion=i.getInt32(0,!0),a.imageType=i.getInt32(4,!0),a.height=i.getUint32(8,!0),a.width=i.getUint32(12,!0),a.maxZError=i.getFloat64(16,!0),t+=24,!r)if(i=new DataView(e,t,16),a.mask={},a.mask.numBlocksY=i.getUint32(0,!0),a.mask.numBlocksX=i.getUint32(4,!0),a.mask.numBytes=i.getUint32(8,!0),a.mask.maxValue=i.getFloat32(12,!0),t+=16,a.mask.numBytes>0){var o=new Uint8Array(Math.ceil(a.width*a.height/8)),s=(i=new DataView(e,t,a.mask.numBytes)).getInt16(0,!0),h=2,f=0;do{if(s>0)for(;s--;)o[f++]=i.getUint8(h++);else{var l=i.getUint8(h++);for(s=-s;s--;)o[f++]=l}s=i.getInt16(h,!0),h+=2}while(h<a.mask.numBytes);if(-32768!==s||f<o.length)throw"Unexpected end of mask RLE encoding";a.mask.bitset=o,t+=a.mask.numBytes}else 0===(a.mask.numBytes|a.mask.numBlocksY|a.mask.maxValue)&&(a.mask.bitset=new Uint8Array(Math.ceil(a.width*a.height/8)));i=new DataView(e,t,16),a.pixels={},a.pixels.numBlocksY=i.getUint32(0,!0),a.pixels.numBlocksX=i.getUint32(4,!0),a.pixels.numBytes=i.getUint32(8,!0),a.pixels.maxValue=i.getFloat32(12,!0),t+=16;var u=a.pixels.numBlocksX,c=a.pixels.numBlocksY,g=u+(a.width%u>0?1:0),d=c+(a.height%c>0?1:0);a.pixels.blocks=new Array(g*d);for(var p=0,m=0;m<d;m++)for(var v=0;v<g;v++){var y=0,b=e.byteLength-t;i=new DataView(e,t,Math.min(10,b));var w={};a.pixels.blocks[p++]=w;var x=i.getUint8(0);if(y++,w.encoding=63&x,w.encoding>3)throw"Invalid block encoding ("+w.encoding+")";if(2!==w.encoding){if(0!==x&&2!==x){if(x>>=6,w.offsetType=x,2===x)w.offset=i.getInt8(1),y++;else if(1===x)w.offset=i.getInt16(1,!0),y+=2;else{if(0!==x)throw"Invalid block offset type";w.offset=i.getFloat32(1,!0),y+=4}if(1===w.encoding)if(x=i.getUint8(y),y++,w.bitsPerPixel=63&x,x>>=6,w.numValidPixelsType=x,2===x)w.numValidPixels=i.getUint8(y),y++;else if(1===x)w.numValidPixels=i.getUint16(y,!0),y+=2;else{if(0!==x)throw"Invalid valid pixel count type";w.numValidPixels=i.getUint32(y,!0),y+=4}}var M;if(t+=y,3!==w.encoding)if(0===w.encoding){var k=(a.pixels.numBytes-1)/4;if(k!==Math.floor(k))throw"uncompressed block has invalid length";M=new ArrayBuffer(4*k),new Uint8Array(M).set(new Uint8Array(e,t,4*k));var I=new Float32Array(M);w.rawData=I,t+=4*k}else if(1===w.encoding){var A=Math.ceil(w.numValidPixels*w.bitsPerPixel/8),U=Math.ceil(A/4);M=new ArrayBuffer(4*U),new Uint8Array(M).set(new Uint8Array(e,t,A)),w.stuffedData=new Uint32Array(M),t+=A}}else t++}return a.eofOffset=t,a},i=function(e,t,r,a,n,i,o){var s,h,f,l=(1<<t)-1,u=0,c=0,g=Math.ceil((o-a)/n),d=4*e.length-Math.ceil(t*r/8);for(e[e.length-1]<<=8*d,s=0;s<r;s++){if(0===c&&(f=e[u++],c=32),c>=t)h=f>>>c-t&l,c-=t;else{var p=t-c;h=(f&l)<<p&l,h+=(f=e[u++])>>>(c=32-p)}i[s]=h<g?a+h*n:o}return i},e),p=(o=function(e,t,r,a,n,i,o,s){var h,f,l,u,c,g=(1<<r)-1,d=0,p=0,m=4*e.length-Math.ceil(r*a/8);if(e[e.length-1]<<=8*m,n)for(h=0;h<a;h++)0===p&&(l=e[d++],p=32),p>=r?(f=l>>>p-r&g,p-=r):(f=(l&g)<<(u=r-p)&g,f+=(l=e[d++])>>>(p=32-u)),t[h]=n[f];else for(c=Math.ceil((s-i)/o),h=0;h<a;h++)0===p&&(l=e[d++],p=32),p>=r?(f=l>>>p-r&g,p-=r):(f=(l&g)<<(u=r-p)&g,f+=(l=e[d++])>>>(p=32-u)),t[h]=f<c?i+f*o:s},s=function(e,t,r,a,n,i){var o,s=(1<<t)-1,h=0,f=0,l=0,u=0,c=0,g=[],d=4*e.length-Math.ceil(t*r/8);e[e.length-1]<<=8*d;var p=Math.ceil((i-a)/n);for(f=0;f<r;f++)0===u&&(o=e[h++],u=32),u>=t?(c=o>>>u-t&s,u-=t):(c=(o&s)<<(l=t-u)&s,c+=(o=e[h++])>>>(u=32-l)),g[f]=c<p?a+c*n:i;return g.unshift(a),g},h=function(e,t,r,a,n,i,o,s){var h,f,l,u,c=(1<<r)-1,g=0,d=0,p=0;if(n)for(h=0;h<a;h++)0===d&&(l=e[g++],d=32,p=0),d>=r?(f=l>>>p&c,d-=r,p+=r):(f=l>>>p&c,d=32-(u=r-d),f|=((l=e[g++])&(1<<u)-1)<<r-u,p=u),t[h]=n[f];else{var m=Math.ceil((s-i)/o);for(h=0;h<a;h++)0===d&&(l=e[g++],d=32,p=0),d>=r?(f=l>>>p&c,d-=r,p+=r):(f=l>>>p&c,d=32-(u=r-d),f|=((l=e[g++])&(1<<u)-1)<<r-u,p=u),t[h]=f<m?i+f*o:s}return t},f=function(e,t,r,a,n,i){var o,s=(1<<t)-1,h=0,f=0,l=0,u=0,c=0,g=0,d=[],p=Math.ceil((i-a)/n);for(f=0;f<r;f++)0===u&&(o=e[h++],u=32,g=0),u>=t?(c=o>>>g&s,u-=t,g+=t):(c=o>>>g&s,u=32-(l=t-u),c|=((o=e[h++])&(1<<l)-1)<<t-l,g=l),d[f]=c<p?a+c*n:i;return d.unshift(a),d},l=function(e,t,r,a){var n,i,o,s,h=(1<<r)-1,f=0,l=0,u=4*e.length-Math.ceil(r*a/8);for(e[e.length-1]<<=8*u,n=0;n<a;n++)0===l&&(o=e[f++],l=32),l>=r?(i=o>>>l-r&h,l-=r):(i=(o&h)<<(s=r-l)&h,i+=(o=e[f++])>>>(l=32-s)),t[n]=i;return t},u=function(e,t,r,a){var n,i,o,s,h=(1<<r)-1,f=0,l=0,u=0;for(n=0;n<a;n++)0===l&&(o=e[f++],l=32,u=0),l>=r?(i=o>>>u&h,l-=r,u+=r):(i=o>>>u&h,l=32-(s=r-l),i|=((o=e[f++])&(1<<s)-1)<<r-s,u=s),t[n]=i;return t},c={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(e){for(var t=65535,r=65535,a=e.length,n=Math.floor(a/2),i=0;n;){var o=n>=359?359:n;n-=o;do{t+=e[i++]<<8,r+=t+=e[i++]}while(--o);t=(65535&t)+(t>>>16),r=(65535&r)+(r>>>16)}return 1&a&&(r+=t+=e[i]<<8),((r=(65535&r)+(r>>>16))<<16|(t=(65535&t)+(t>>>16)))>>>0},readHeaderInfo:function(e,t){var r=t.ptr,a=new Uint8Array(e,r,6),n={};if(n.fileIdentifierString=String.fromCharCode.apply(null,a),0!==n.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+n.fileIdentifierString;r+=6;var i=new DataView(e,r,52);if(n.fileVersion=i.getInt32(0,!0),r+=4,n.fileVersion>=3&&(n.checksum=i.getUint32(4,!0),r+=4),i=new DataView(e,r,48),n.height=i.getUint32(0,!0),n.width=i.getUint32(4,!0),n.numValidPixel=i.getUint32(8,!0),n.microBlockSize=i.getInt32(12,!0),n.blobSize=i.getInt32(16,!0),n.imageType=i.getInt32(20,!0),n.maxZError=i.getFloat64(24,!0),n.zMin=i.getFloat64(32,!0),n.zMax=i.getFloat64(40,!0),r+=48,t.headerInfo=n,t.ptr=r,n.fileVersion>=3&&this.computeChecksumFletcher32(new Uint8Array(e,r-48,n.blobSize-14))!==n.checksum)throw"Checksum failed.";return!0},readMask:function(e,t){var r,a,n=t.ptr,i=t.headerInfo,o=i.width*i.height,s=i.numValidPixel,h=new DataView(e,n,4),f={};if(f.numBytes=h.getUint32(0,!0),n+=4,(0===s||o===s)&&0!==f.numBytes)throw"invalid mask";if(0===s)r=new Uint8Array(Math.ceil(o/8)),f.bitset=r,a=new Uint8Array(o),t.pixels.resultMask=a,n+=f.numBytes;else if(f.numBytes>0){r=new Uint8Array(Math.ceil(o/8));var l=(h=new DataView(e,n,f.numBytes)).getInt16(0,!0),u=2,c=0,g=0;do{if(l>0)for(;l--;)r[c++]=h.getUint8(u++);else for(g=h.getUint8(u++),l=-l;l--;)r[c++]=g;l=h.getInt16(u,!0),u+=2}while(u<f.numBytes);if(-32768!==l||c<r.length)throw"Unexpected end of mask RLE encoding";a=new Uint8Array(o);var d=0,p=0;for(p=0;p<o;p++)7&p?(d=r[p>>3],d<<=7&p):d=r[p>>3],128&d&&(a[p]=1);t.pixels.resultMask=a,f.bitset=r,n+=f.numBytes}return t.ptr=n,t.mask=f,!0},readDataOneSweep:function(e,t,r){var a,n=t.ptr,i=t.headerInfo,o=i.width*i.height,s=i.imageType,h=i.numValidPixel*c.getDateTypeSize(s);if(r===Uint8Array)a=new Uint8Array(e,n,h);else{var f=new ArrayBuffer(h);new Uint8Array(f).set(new Uint8Array(e,n,h)),a=new r(f)}if(a.length===o)t.pixels.resultPixels=a;else{t.pixels.resultPixels=new r(o);var l=0,u=0;for(u=0;u<o;u++)t.pixels.resultMask[u]&&(t.pixels.resultPixels[u]=a[l++])}return n+=h,t.ptr=n,!0},readHuffman:function(e,t,r){var a=t.headerInfo,n=a.width*a.height,i=this.HUFFMAN_LUT_BITS_MAX,o=new DataView(e,t.ptr,16);if(t.ptr+=16,o.getInt32(0,!0)<2)throw"unsupported Huffman version";var s=o.getInt32(4,!0),h=o.getInt32(8,!0),f=o.getInt32(12,!0);if(h>=f)return!1;var l=new Uint32Array(f-h);c.decodeBits(e,t,l);var u,d,p,m,v=[];for(u=h;u<f;u++)v[d=u-(u<s?0:s)]={first:l[u-h],second:null};var y=e.byteLength-t.ptr,b=Math.ceil(y/4),w=new ArrayBuffer(4*b);new Uint8Array(w).set(new Uint8Array(e,t.ptr,y));var x,M=new Uint32Array(w),k=0,I=0;for(x=M[0],u=h;u<f;u++)(m=v[d=u-(u<s?0:s)].first)>0&&(v[d].second=x<<k>>>32-m,32-k>=m?32===(k+=m)&&(k=0,x=M[++I]):(k+=m-32,x=M[++I],v[d].second|=x>>>32-k));var A=0===t.headerInfo.imageType?128:0,U=t.headerInfo.height,B=t.headerInfo.width,P=0,E=0,T=new g;for(u=0;u<v.length;u++)void 0!==v[u]&&(P=Math.max(P,v[u].first));E=P>=i?i:P,P>=30&&console.log("WARning, large NUM LUT BITS IS "+P);var D,S,V,O,z,C=[];for(u=h;u<f;u++)if((m=v[d=u-(u<s?0:s)].first)>0)if(D=[m,d],m<=E)for(S=v[d].second<<E-m,V=1<<E-m,p=0;p<V;p++)C[S|p]=D;else for(S=v[d].second,z=T,O=m-1;O>=0;O--)S>>>O&1?(z.right||(z.right=new g),z=z.right):(z.left||(z.left=new g),z=z.left),0!==O||z.val||(z.val=D[1]);var F,N,G,L,_=t.pixels.resultMask,R=0,Y=0;k>0&&(I++,k=0),x=M[I];var j=new r(n);if(t.headerInfo.numValidPixel===B*U)for(p=0,u=0;u<U;u++)for(d=0;d<B;d++,p++){if(F=0,L=G=x<<k>>>32-E,32-k<E&&(L=G|=M[I+1]>>>64-k-E),C[L])F=C[L][1],k+=C[L][0];else for(L=G=x<<k>>>32-P,32-k<P&&(L=G|=M[I+1]>>>64-k-P),z=T,Y=0;Y<P;Y++)if(!(z=G>>>P-Y-1&1?z.right:z.left).left&&!z.right){F=z.val,k=k+Y+1;break}k>=32&&(k-=32,x=M[++I]),N=F-A,N+=d>0?R:u>0?j[p-B]:R,N&=255,j[p]=N,R=N}else for(p=0,u=0;u<U;u++)for(d=0;d<B;d++,p++)if(_[p]){if(F=0,L=G=x<<k>>>32-E,32-k<E&&(L=G|=M[I+1]>>>64-k-E),C[L])F=C[L][1],k+=C[L][0];else for(L=G=x<<k>>>32-P,32-k<P&&(L=G|=M[I+1]>>>64-k-P),z=T,Y=0;Y<P;Y++)if(!(z=G>>>P-Y-1&1?z.right:z.left).left&&!z.right){F=z.val,k=k+Y+1;break}k>=32&&(k-=32,x=M[++I]),N=F-A,d>0&&_[p-1]?N+=R:u>0&&_[p-B]?N+=j[p-B]:N+=R,N&=255,j[p]=N,R=N}t.pixels.resultPixels=j,t.ptr=t.ptr+4*(I+1)+(k>0?4:0)},decodeBits:function(e,t,r,a){var n=t.headerInfo.fileVersion,i=0,c=new DataView(e,t.ptr,5),g=c.getUint8(0);i++;var d=g>>6,p=0===d?4:3-d,m=(32&g)>0,v=31&g,y=0;if(1===p)y=c.getUint8(i),i++;else if(2===p)y=c.getUint16(i,!0),i+=2;else{if(4!==p)throw"Invalid valid pixel count type";y=c.getUint32(i,!0),i+=4}var b,w,x,M,k,I,A,U,B,P=2*t.headerInfo.maxZError;if(m){for(t.counter.lut++,U=c.getUint8(i),i++,M=Math.ceil((U-1)*v/8),k=Math.ceil(M/4),w=new ArrayBuffer(4*k),x=new Uint8Array(w),t.ptr+=i,x.set(new Uint8Array(e,t.ptr,M)),A=new Uint32Array(w),t.ptr+=M,B=0;U-1>>>B;)B++;M=Math.ceil(y*B/8),k=Math.ceil(M/4),w=new ArrayBuffer(4*k),(x=new Uint8Array(w)).set(new Uint8Array(e,t.ptr,M)),b=new Uint32Array(w),t.ptr+=M,I=n>=3?f(A,v,U-1,a,P,t.headerInfo.zMax):s(A,v,U-1,a,P,t.headerInfo.zMax),n>=3?h(b,r,B,y,I):o(b,r,B,y,I)}else t.counter.bitstuffer++,B=v,t.ptr+=i,B>0&&(M=Math.ceil(y*B/8),k=Math.ceil(M/4),w=new ArrayBuffer(4*k),(x=new Uint8Array(w)).set(new Uint8Array(e,t.ptr,M)),b=new Uint32Array(w),t.ptr+=M,n>=3?null==a?u(b,r,B,y):h(b,r,B,y,!1,a,P,t.headerInfo.zMax):null==a?l(b,r,B,y):o(b,r,B,y,!1,a,P,t.headerInfo.zMax))},readTiles:function(e,t,r){var a=t.headerInfo,n=a.width,i=a.height,o=a.microBlockSize,s=a.imageType,h=Math.ceil(n/o),f=Math.ceil(i/o);t.pixels.numBlocksY=f,t.pixels.numBlocksX=h,t.pixels.ptr=0;var l,u,g,d,p,m,v,y=0,b=0,w=0,x=0,M=0,k=0,I=0,A=0,U=0,B=0,P=0,E=0,T=0,D=0,S=0,V=new r(o*o),O=i%o||o,z=n%o||o;for(w=0;w<f;w++)for(M=w!==f-1?o:O,x=0;x<h;x++){if(B=w*n*o+x*o,P=n-(k=x!==h-1?o:z),I=e.byteLength-t.ptr,u={},S=0,S++,U=(A=(l=new DataView(e,t.ptr,Math.min(10,I))).getUint8(0))>>6&255,(A>>2&15)!=(x*o>>3&15))throw"integrity issue";if((p=3&A)>3)throw t.ptr+=S,"Invalid block encoding ("+p+")";if(2!==p)if(0===p){if(t.counter.uncompressed++,t.ptr+=S,E=(E=M*k*c.getDateTypeSize(s))<(T=e.byteLength-t.ptr)?E:T,g=new ArrayBuffer(E),new Uint8Array(g).set(new Uint8Array(e,t.ptr,E)),d=new r(g),D=0,t.pixels.resultMask)for(y=0;y<M;y++){for(b=0;b<k;b++)t.pixels.resultMask[B]&&(t.pixels.resultPixels[B]=d[D++]),B++;B+=P}else for(y=0;y<M;y++){for(b=0;b<k;b++)t.pixels.resultPixels[B++]=d[D++];B+=P}t.ptr+=D*c.getDateTypeSize(s)}else if(m=c.getDataTypeUsed(s,U),v=c.getOnePixel(u,S,m,l),S+=c.getDateTypeSize(m),3===p)if(t.ptr+=S,t.counter.constantoffset++,t.pixels.resultMask)for(y=0;y<M;y++){for(b=0;b<k;b++)t.pixels.resultMask[B]&&(t.pixels.resultPixels[B]=v),B++;B+=P}else for(y=0;y<M;y++){for(b=0;b<k;b++)t.pixels.resultPixels[B++]=v;B+=P}else if(t.ptr+=S,c.decodeBits(e,t,V,v),S=0,t.pixels.resultMask)for(y=0;y<M;y++){for(b=0;b<k;b++)t.pixels.resultMask[B]&&(t.pixels.resultPixels[B]=V[S++]),B++;B+=P}else for(y=0;y<M;y++){for(b=0;b<k;b++)t.pixels.resultPixels[B++]=V[S++];B+=P}else t.counter.constant++,t.ptr+=S}},formatFileInfo:function(e){return{fileIdentifierString:e.headerInfo.fileIdentifierString,fileVersion:e.headerInfo.fileVersion,imageType:e.headerInfo.imageType,height:e.headerInfo.height,width:e.headerInfo.width,numValidPixel:e.headerInfo.numValidPixel,microBlockSize:e.headerInfo.microBlockSize,blobSize:e.headerInfo.blobSize,maxZError:e.headerInfo.maxZError,pixelType:c.getPixelType(e.headerInfo.imageType),eofOffset:e.eofOffset,mask:e.mask?{numBytes:e.mask.numBytes}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,maxValue:e.headerInfo.zMax,minValue:e.headerInfo.zMin,noDataValue:e.noDataValue}}},constructConstantSurface:function(e){var t=e.headerInfo.zMax,r=e.headerInfo.height*e.headerInfo.width,a=0;if(e.pixels.resultMask)for(a=0;a<r;a++)e.pixels.resultMask[a]&&(e.pixels.resultPixels[a]=t);else for(a=0;a<r;a++)e.pixels.resultPixels[a]=t},getDataTypeArray:function(e){var t;switch(e){case 0:t=Int8Array;break;case 1:t=Uint8Array;break;case 2:t=Int16Array;break;case 3:t=Uint16Array;break;case 4:t=Int32Array;break;case 5:t=Uint32Array;break;case 6:default:t=Float32Array;break;case 7:t=Float64Array}return t},getPixelType:function(e){var t;switch(e){case 0:t="S8";break;case 1:t="U8";break;case 2:t="S16";break;case 3:t="U16";break;case 4:t="S32";break;case 5:t="U32";break;case 6:default:t="F32";break;case 7:t="F64"}return t},isValidPixelValue:function(e,t){if(null==t)return!1;var r;switch(e){case 0:r=t>=-128&&t<=127;break;case 1:r=t>=0&&t<=255;break;case 2:r=t>=-32768&&t<=32767;break;case 3:r=t>=0&&t<=65536;break;case 4:r=t>=-2147483648&&t<=2147483647;break;case 5:r=t>=0&&t<=4294967296;break;case 6:r=t>=-34027999387901484e22&&t<=34027999387901484e22;break;case 7:r=t>=5e-324&&t<=17976931348623157e292;break;default:r=!1}return r},getDateTypeSize:function(e){var t=0;switch(e){case 0:case 1:t=1;break;case 2:case 3:t=2;break;case 4:case 5:case 6:t=4;break;case 7:t=8;break;default:t=e}return t},getDataTypeUsed:function(e,t){var r=e;switch(e){case 2:case 4:r=e-t;break;case 3:case 5:r=e-2*t;break;case 6:r=0===t?e:1===t?2:1;break;case 7:r=0===t?e:e-2*t+1;break;default:r=e}return r},getOnePixel:function(e,t,r,a){var n=0;switch(r){case 0:n=a.getInt8(t);break;case 1:n=a.getUint8(t);break;case 2:n=a.getInt16(t,!0);break;case 3:n=a.getUint16(t,!0);break;case 4:n=a.getInt32(t,!0);break;case 5:n=a.getUInt32(t,!0);break;case 6:n=a.getFloat32(t,!0);break;case 7:n=a.getFloat64(t,!0);break;default:throw"the decoder does not understand this pixel type"}return n}},g=function(e,t,r){this.val=e,this.left=t,this.right=r},{decode:function(e,t){var r=(t=t||{}).maskData||null===t.maskData,a=t.noDataValue,n=0,i={};i.ptr=t.inputOffset||0,i.pixels={},c.readHeaderInfo(e,i);var o=i.headerInfo,s=c.getDataTypeArray(o.imageType);r?(i.pixels.resultMask=t.maskData,i.ptr+=4):c.readMask(e,i);var h,f=o.width*o.height;if(i.pixels.resultPixels=new s(f),i.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0},0!==o.numValidPixel)if(o.zMax===o.zMin)c.constructConstantSurface(i);else{var l=new DataView(e,i.ptr,2),u=l.getUint8(0,!0);if(i.ptr++,u)c.readDataOneSweep(e,i,s);else if(o.fileVersion>1&&o.imageType<=1&&Math.abs(o.maxZError-.5)<1e-5){var g=l.getUint8(1,!0);i.ptr++,g?c.readHuffman(e,i,s):c.readTiles(e,i,s)}else c.readTiles(e,i,s)}i.eofOffset=i.ptr,t.inputOffset?(h=i.headerInfo.blobSize+t.inputOffset-i.ptr,Math.abs(h)>=1&&(i.eofOffset=t.inputOffset+i.headerInfo.blobSize)):(h=i.headerInfo.blobSize-i.ptr,Math.abs(h)>=1&&(i.eofOffset=i.headerInfo.blobSize));var d={width:o.width,height:o.height,pixelData:i.pixels.resultPixels,minValue:o.zMin,maxValue:o.zMax,maskData:i.pixels.resultMask};if(i.pixels.resultMask&&c.isValidPixelValue(o.imageType,a)){var p=i.pixels.resultMask;for(n=0;n<f;n++)p[n]||(d.pixelData[n]=a);d.noDataValue=a}return i.noDataValue=a,t.returnFileInfo&&(d.fileInfo=c.formatFileInfo(i)),d},getBandCount:function(e){for(var t=0,r=0,a={ptr:0,pixels:{}};r<e.byteLength-58;)c.readHeaderInfo(e,a),r+=a.headerInfo.blobSize,t++,a.ptr=r;return t}}),m={decode:function(e,t){var r,a=(t=t||{}).inputOffset||0,n=new Uint8Array(e,a,10),i=String.fromCharCode.apply(null,n);if("CntZImage"===i.trim())r=d;else{if("Lerc2"!==i.substring(0,5))throw"Unexpected file identifier string: "+i;r=p}for(var o,s,h=0,f=e.byteLength-10,l={width:0,height:0,pixels:[],pixelType:t.pixelType,mask:null,statistics:[]};a<f;){var u=r.decode(e,{inputOffset:a,encodedMaskData:o,maskData:s,returnMask:0===h,returnEncodedMask:0===h,returnFileInfo:!0,pixelType:t.pixelType||null,noDataValue:t.noDataValue||null});a=u.fileInfo.eofOffset,0===h&&(o=u.encodedMaskData,s=u.maskData,l.width=u.width,l.height=u.height,l.pixelType=u.pixelType||u.fileInfo.pixelType,l.mask=u.maskData),h++,l.pixels.push(u.pixelData),l.statistics.push({minValue:u.minValue,maxValue:u.maxValue,noDataValue:u.noDataValue})}return l}};we.exports?we.exports=m:this.Lerc=m}();var ke={width:100,height:10},Ie=!1;try{new OffscreenCanvas(1,1).getContext("2d").fillText("hello",0,0),Ie=!0}catch(e){Ie=!1}function Ae(){if(!xe){var{width:e,height:t}=ke;Ie?xe=new OffscreenCanvas(e,t):((xe=document.createElement("canvas")).width=e,xe.height=t)}return xe}class Ue{constructor(e,t={}){if(Array.isArray(e))if(e.length<2)console.error("colors.length should >1");else{this.colors=e;for(var r=1/0,a=-1/0,n=0,i=e.length;n<i;n++){var o=e[n][0];r=Math.min(o,r),a=Math.max(o,a)}this.min=r,this.max=a,this.valueOffset=this.max-this.min,this.options=Object.assign({},ke,t),this._initImgData()}else console.error("colors is not array")}getImageData(){return this.imgData}_initImgData(){var e=Ae(),{width:t,height:r}=this.options;e.width=t,e.height=r;var a=e.getContext("2d",{willReadFrequently:!0});a.clearRect(0,0,e.width,e.height);for(var n=a.createLinearGradient(0,0,e.width,0),{colors:i,valueOffset:o}=this,s=0,h=i.length;s<h;s++){var[f,l]=i[s],u=(f-this.min)/o;n.addColorStop(u,l)}a.fillStyle=n,a.fillRect(0,0,e.width,e.height),this.imgData=a.getImageData(0,0,e.width,e.height)}getColor(e){e=Math.max(this.min,e);var t=((e=Math.min(e,this.max))-this.min)/this.valueOffset,r=Math.round(t*this.imgData.width),a=4*(r=Math.min(r,this.imgData.width-1));return[this.imgData.data[a],this.imgData.data[a+1],this.imgData.data[a+2],this.imgData.data[a+3]]}}var Be=new Y(200,function(e){k(e)}),Pe=new Y(200,function(e){}),Ee={};function Te(e,t){Ee[e]=Ee[e]||[],Ee[e].push(t)}function De(e){var t=[];for(var r in Ee){var a=Ee[r]||[];if(a.length){var n=a.indexOf(e);n>-1&&a.splice(n,1)}0===a.length&&t.push(r)}t.forEach(function(e){delete Ee[e]})}function Se(e,t={},r){return new Promise(function(n,i){var h=function(e){createImageBitmap(e).then(function(e){n(e)}).catch(function(e){i(e)})};if(M(e))h(e);else{var f=r.__taskId;if(f){var u=Be.get(e);if(u)h(u);else{var c=r.fetchOptions||{headers:t,referrer:r.referrer},g=r.timeout||0,d=new AbortController,p=d.signal;g&&a(g)&&g>0&&setTimeout(function(){d.abort(o)},g),c.signal=p,delete c.timeout,Te(f,d),fetch(e,c).then(function(t){return t.ok||i(s(e)),t.blob()}).then(function(e){return createImageBitmap(e)}).then(function(t){!0!==r.disableCache&&Be.add(e,t),De(d),h(t)}).catch(function(e){De(d),i(e)})}}else i(l("taskId is null"))}})}function Ve(e){var{urlTemplate:t,x:a,y:n,z:i,maxAvailableZoom:o,subdomains:s,returnBlobURL:f,globalCompositeOperation:l}=e;return new Promise(function(c,g){for(var d,p,m,v,y=u(t),b=0,w=y.length;b<w;b++){if(!E(y[b],s))return void g(h("not find subdomains"))}var x=a,M=n,I=i,A=i-o;if(A>0){for(var U=a,B=n,T=i;T>o;)U=Math.floor(U/2),B=Math.floor(B/2),T--;var D=Math.pow(2,A),S=Math.floor(U*D),C=S+D,N=Math.floor(B*D),G=N+D;S>a&&(S--,C--),N>n&&(N--,G--),d=(a-S)/(C-S),p=(n-N)/(G-N),m=1/(C-S),v=1/(G-N),x=U,M=B,I=o}var R=y.map(function(e){return P(e,x,M,I,s)}),Y=Object.assign({},r,e.headers||{}),j=R.map(function(t){return Se(t,Y,e)});Promise.all(j).then(function(t){var r=V(),a=F(t,l);if(a instanceof Error)g(a);else{var n,i=L(a,e);if(A<=0)n=i;else{var{width:o,height:s}=i;n=function(e,t,r,a,n,i){O(e,t.width,t.height);var o=z(e);o.save(),o.drawImage(t,r,a,n,i,0,0,e.width,e.height),o.restore();var s=e.transferToImageBitmap();return k(t),s}(r,i,o*d,s*p,o*m,s*v)}_(n,f).then(function(e){c(e)}).catch(function(e){g(e)})}}).catch(function(e){g(e)})})}function Oe(e,t){return new Promise(function(n,i){var c=u(e),g=Object.assign({},r,t.headers||{}),{returnBlobURL:d,terrainWidth:p,tileSize:m,terrainType:v,minHeight:y,maxHeight:b,terrainColors:w}=t,x=function(e){_(e,d).then(function(e){n(e)}).catch(function(e){i(e)})},M="mapzen"===v,k="tianditu"===v,A="cesium"===v,U="arcgis"===v;if(M||"qgis-gray"===v){var B=c.map(function(e){return Se(e,g,t)});Promise.all(B).then(function(e){var t=V(),r=F(e);if(r instanceof Error)i(r);else{O(t,r.width,r.height);var a=z(t);a.drawImage(r,0,0);var n=a.getImageData(0,0,t.width,t.height);M?function(e){for(var t=e.data,r=[0,0,0],a=0,n=t.length;a<n;a+=4){var i=t[a],o=t[a+1],s=t[a+2];if(0!==t[a+3]){var h=256*i+o+s/256-32768,[f,l,u]=I(h,r);t[a]=f,t[a+1]=l,t[a+2]=u}}}(n):function(e,t,r){for(var a=e.data,n=(r-t)/16777216,i=0,o=a.length;i<o;i+=4){var s=a[i],h=a[i+1],f=a[i+2];if(0!==a[i+3]){var l=f*n+256*h*n+256*s*256*n+t,[u,c,g]=I(l);a[i]=u,a[i+1]=c,a[i+2]=g}}}(n,y,b),a.putImageData(n,0,0);var o=t.transferToImageBitmap();x(Ce(w,o))}}).catch(function(e){i(e)})}else if(k||A||U){var P=c.map(function(e){return function(e,t={},r){return new Promise(function(n,i){var h=function(e){n(e)},f=r.__taskId;if(f){var u=Pe.get(e);if(u)h(u);else{var c=r.fetchOptions||{headers:t,referrer:r.referrer},g=r.timeout||0,d=new AbortController,p=d.signal;g&&a(g)&&g>0&&setTimeout(function(){d.abort(o)},g),c.signal=p,delete c.timeout,Te(f,d),fetch(e,c).then(function(t){return t.ok||i(s(e)),t.arrayBuffer()}).then(function(t){!0!==r.disableCache&&Pe.add(e,t),De(d),h(t)}).catch(function(e){De(d),i(e)})}}else i(l("taskId is null"))})}(e,g,t)});Promise.all(P).then(function(e){if(e&&0!==e.length){var t,r=e[0];if(0!==r.byteLength)k?t=ce(r,p,m):A?t=ye(r,p,m):U&&((t=Me.exports.decode(r)).image=function(e){var{width:t,height:r,pixels:a}=e,n=V();O(n,t,r);var i=z(n);if(!a||0===a.length)return null;for(var o=a[0],s=i.createImageData(t,r),h=0,f=s.data.length;h<f;h+=4){var l=o[h/4],[u,c,g]=I(l);s.data[h]=u,s.data[h+1]=c,s.data[h+2]=g,s.data[h+3]=255}return i.putImageData(s,0,0),n.transferToImageBitmap()}(t)),t&&t.image?x(Ce(w,t.image)):i(l("generate terrain data error,not find image data"));else i(f("buffer is empty"))}else i(f("buffers is null"))}).catch(function(e){i(e)})}else i(h("not support terrainType:"+v))})}var ze=new Map;function Ce(e,t){if(!e||!Array.isArray(e)||e.length<2)return t;var r=JSON.stringify(e),a=ze.get(r);a||(a=new Ue(e),ze.set(r,a));var{width:n,height:i}=t,o=V();O(o,n,i);var s=z(o);s.drawImage(t,0,0);for(var h=s.getImageData(0,0,n,i),f=h.data,l=0;l<f.length;l+=4){var u=f[l],c=f[l+1],g=f[l+2];if(0===f[l+3])f[l]=0,f[l+1]=0,f[l+2]=0;else{var d=A(u,c,g),[p,m,v,y]=a.getColor(d);f[l]=p,f[l+1]=m,f[l+2]=v,f[l+3]=y}}return s.putImageData(h,0,0),k(t),o.transferToImageBitmap()}var Fe=512;function Ne(e){return new Promise(function(t,r){var a=e.debug,n=e.items,i=e._workerId,o=[];n.forEach(function(e,s){var h=new OffscreenCanvas(e.width,e.height);z(h).drawImage(e.image,0,0),a&&console.log("workerId:"+i+",image to blob url :"+(s+1)+"/"+n.length),h.convertToBlob().then(function(r){var a=URL.createObjectURL(r);e.url=a,o.push(1),k(e.image),delete e.image,o.length===n.length&&t(n)}).catch(function(e){console.error(e),r(e)})})})}function Ge(e,t){return!(e[2]<t[0])&&(!(e[1]>t[3])&&(!(e[0]>t[2])&&!(e[3]<t[1])))}function Le(e,t){var[r,a,n,i]=e;return r>=t[0]&&n<=t[2]&&a>=t[1]&&i<=t[3]}function _e(e){var[t,r,a,n]=e;return[[t,r],[a,r],[a,n],[t,n]]}function Re(e){var t=1/0,r=1/0,a=-1/0,n=-1/0;return e.forEach(function(e){t=Math.min(t,e[0]),a=Math.max(a,e[0]),r=Math.min(r,e[1]),n=Math.max(n,e[1])}),[t,r,a,n]}function Ye(e,t){je(e.geometry,t)}function je(e,t){if(e)switch(e.type){case"Point":We(e.coordinates,t);break;case"MultiPoint":case"LineString":Ze(e.coordinates,t);break;case"MultiLineString":!function(e,t){for(var r=0,a=e.length;r<a;r++)Ze(e[r],t)}(e.coordinates,t);break;case"Polygon":Xe(e.coordinates,t);break;case"MultiPolygon":!function(e,t){for(var r=0,a=e.length;r<a;r++)Xe(e[r],t)}(e.coordinates,t);break;case"GeometryCollection":for(var r=e.geometries.length,a=0;a<r;a++)je(e.geometries[a],t)}}function We(e,t){t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.max(t[2],e[0]),t[3]=Math.max(t[3],e[1])}function Ze(e,t){for(var r=0,a=e.length;r<a;r++)We(e[r],t)}function Xe(e,t){e.length&&Ze(e[0],t)}var He=function(e){var t=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];switch(e.type){case"FeatureCollection":for(var r=e.features.length,a=0;a<r;a++)Ye(e.features[a],t);break;case"Feature":Ye(e,t);break;default:je(e,t)}return t},qe=Je;function Je(e,t,r){var a,n,i,o,s,h=e.length,f=Qe(e[0],t),l=[];for(r||(r=[]),a=1;a<h;a++){for(n=e[a-1],o=s=Qe(i=e[a],t);;){if(!(f|o)){l.push(n),o!==s?(l.push(i),a<h-1&&(r.push(l),l=[])):a===h-1&&l.push(i);break}if(f&o)break;f?f=Qe(n=Ke(n,i,f,t),t):o=Qe(i=Ke(n,i,o,t),t)}f=s}return l.length&&r.push(l),r}function Ke(e,t,r,a){return 8&r?[e[0]+(t[0]-e[0])*(a[3]-e[1])/(t[1]-e[1]),a[3]]:4&r?[e[0]+(t[0]-e[0])*(a[1]-e[1])/(t[1]-e[1]),a[1]]:2&r?[a[2],e[1]+(t[1]-e[1])*(a[2]-e[0])/(t[0]-e[0])]:1&r?[a[0],e[1]+(t[1]-e[1])*(a[0]-e[0])/(t[0]-e[0])]:null}function Qe(e,t){var r=0;return e[0]<t[0]?r|=1:e[0]>t[2]&&(r|=2),e[1]<t[1]?r|=4:e[1]>t[3]&&(r|=8),r}Je.polyline=Je,Je.polygon=function(e,t){var r,a,n,i,o,s,h;for(a=1;a<=8;a*=2){for(r=[],i=!(Qe(n=e[e.length-1],t)&a),o=0;o<e.length;o++)(h=!(Qe(s=e[o],t)&a))!==i&&r.push(Ke(n,s,a,t)),h&&r.push(s),n=s,i=h;if(!(e=r).length)break}return r};var $e={};function et(e,t){return function(e){if(!e)return!1;var t=(e.geometry||{type:null}).type;return"Polygon"===t||"MultiPolygon"===t}(t)?$e[e]?h("the"+e+" geojson Already exists"):($e[e]=t,function(e){e.bbox=e.bbox||He(e)}(t),t):h("geojson.feature is not Polygon")}function tt(e,t){if(g(e)){var r=function(e){for(var t=[],a=0,n=e.length;a<n;a++){var i=e[a];Array.isArray(i[0])?t.push(r(i)):t[a]=c(i)}return t};return r(t)}return t}function rt(e,t,r){var[a,n,i,o]=e,s=(i-a)/t,h=(o-n)/t,[f,l]=r;return[(f-a)/s,t-(l-n)/h]}function at(e,t,r,a){var[n,i,o,s]=t,h=function(e,t){for(var a=[],n=0,i=e.length;n<i;n++){var o=e[n];Array.isArray(o[0])?a.push(h(o,t)):a[n]=rt(t,r,o)}return a};if(g(e)){var[f,l]=c([n,i]),[u,d]=c([o,s]);return h(a,[f,l,u,d])}return h(a,t)}var nt=function(e){if(e.length>0){for(var t=1/0,r=-1/0,a=1/0,n=-1/0,i=0,o=e.length;i<o;i++){var[s,h]=e[i];t=Math.min(s,t),a=Math.min(h,a),r=Math.max(s,r),n=Math.max(h,n)}if(t!==r&&a!==n)return!0}return!1};function it(e,t){for(var r=[],a=0,n=e.length;a<n;a++)for(var i=e[a],o=0,s=i.length;o<s;o++){var h=i[o],f=qe.polygon(h,t);nt(f)&&r.push([f])}return r}function ot(e,t){if(!{}.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var st=0;function ht(e){return"__private_"+st+++"_"+e}var ft=Math.PI/180,lt=180/Math.PI,ut=6378137,ct=20037508.342789244,gt="900913",dt={};function pt(e){return Number(e)===e&&e%1!=0}var mt,vt,yt,bt,wt,xt=ht("size"),Mt=ht("expansion"),kt=ht("Bc"),It=ht("Cc"),At=ht("zc"),Ut=ht("Ac");
/**
     * @preserve
     * gcoord 1.0.7, geographic coordinate library
     * Copyright (c) 2025 Jiulong Hu <me@hujiulong.com>
     */
var{sin:Bt,cos:Pt,sqrt:Et,abs:Tt,PI:Dt}=Math,St=6378245,Vt=.006693421622965823;function Ot(e,t){return e>=72.004&&e<=137.8347&&t>=.8293&&t<=55.8271}function zt(e,t){var r,a,n,i=(n=300+(r=e-105)+2*(a=t-35)+.1*r*r+.1*r*a+.1*Et(Tt(r)),n+=2*(20*Bt(6*r*Dt)+20*Bt(2*r*Dt))/3,(n+=2*(20*Bt(r*Dt)+40*Bt(r/3*Dt))/3)+2*(150*Bt(r/12*Dt)+300*Bt(r/30*Dt))/3),o=function(e,t){var r=2*e-100+3*t+.2*t*t+.1*e*t+.2*Et(Tt(e));return r+=2*(20*Bt(6*e*Dt)+20*Bt(2*e*Dt))/3,r+=2*(20*Bt(t*Dt)+40*Bt(t/3*Dt))/3,r+2*(160*Bt(t/12*Dt)+320*Bt(t*Dt/30))/3}(e-105,t-35),s=t/180*Dt,h=Bt(s),f=Et(h=1-Vt*h*h);return[i=180*i/(St/f*Pt(s)*Dt),o=180*o/(St*(1-Vt)/(h*f)*Dt)]}function Ct(e){var[t,r]=e;if(!Ot(t,r))return[t,r];var a=zt(t,r);return[t+a[0],r+a[1]]}function Ft(e){var[t,r]=e;if(!Ot(t,r))return[t,r];for(var[a,n]=[t,r],i=Ct([a,n]),o=i[0]-t,s=i[1]-r;Tt(o)>1e-6||Tt(s)>1e-6;)o=(i=Ct([a-=o,n-=s]))[0]-t,s=i[1]-r;return[a,n]}var{sin:Nt,cos:Gt,atan2:Lt,sqrt:_t,PI:Rt}=Math,Yt=3e3*Rt/180;function jt(e){var[t,r]=e,a=t-.0065,n=r-.006,i=_t(a*a+n*n)-2e-5*Nt(n*Yt),o=Lt(n,a)-3e-6*Gt(a*Yt);return[i*Gt(o),i*Nt(o)]}function Wt(e){var[t,r]=e,a=t,n=r,i=_t(a*a+n*n)+2e-5*Nt(n*Yt),o=Lt(n,a)+3e-6*Gt(a*Yt);return[i*Gt(o)+.0065,i*Nt(o)+.006]}var Zt=180/Math.PI,Xt=Math.PI/180,Ht=6378137,qt=20037508.342789244;function Jt(e){return[e[0]*Zt/Ht,(.5*Math.PI-2*Math.atan(Math.exp(-e[1]/Ht)))*Zt]}function Kt(e){var t=Math.abs(e[0])<=180?e[0]:e[0]-360*(e[0]<0?-1:1),r=[Ht*t*Xt,Ht*Math.log(Math.tan(.25*Math.PI+.5*e[1]*Xt))];return r[0]>qt&&(r[0]=qt),r[0]<-qt&&(r[0]=-qt),r[1]>qt&&(r[1]=qt),r[1]<-qt&&(r[1]=-qt),r}var Qt,{abs:$t}=Math,er=[12890594.86,8362377.87,5591021,3481989.83,1678043.12,0],tr=[75,60,45,30,15,0],rr=[[1.410526172116255e-8,898305509648872e-20,-1.9939833816331,200.9824383106796,-187.2403703815547,91.6087516669843,-23.38765649603339,2.57121317296198,-.03801003308653,17337981.2],[-7.435856389565537e-9,8983055097726239e-21,-.78625201886289,96.32687599759846,-1.85204757529826,-59.36935905485877,47.40033549296737,-16.50741931063887,2.28786674699375,10260144.86],[-3.030883460898826e-8,898305509983578e-20,.30071316287616,59.74293618442277,7.357984074871,-25.38371002664745,13.45380521110908,-3.29883767235584,.32710905363475,6856817.37],[-1.981981304930552e-8,8983055099779535e-21,.03278182852591,40.31678527705744,.65659298677277,-4.44255534477492,.85341911805263,.12923347998204,-.04625736007561,4482777.06],[3.09191371068437e-9,8983055096812155e-21,6995724062e-14,23.10934304144901,-.00023663490511,-.6321817810242,-.00663494467273,.03430082397953,-.00466043876332,2555164.4],[2.890871144776878e-9,8983055095805407e-21,-3.068298e-8,7.47137025468032,-353937994e-14,-.02145144861037,-1234426596e-14,.00010322952773,-323890364e-14,826088.5]],ar=[[-.0015702102444,111320.7020616939,0x60e374c3105a3,-0x24bb4115e2e164,0x5cc55543bb0ae8,-0x7ce070193f3784,0x5e7ca61ddf8150,-0x261a578d8b24d0,0x665d60f3742ca,82.5],[.0008277824516172526,111320.7020463578,647795574.6671607,-4082003173.641316,10774905663.51142,-15171875531.51559,12053065338.62167,-5124939663.577472,913311935.9512032,67.5],[.00337398766765,111320.7020202162,4481351.045890365,-23393751.19931662,79682215.47186455,-115964993.2797253,97236711.15602145,-43661946.33752821,8477230.501135234,52.5],[.00220636496208,111320.7020209128,51751.86112841131,3796837.749470245,992013.7397791013,-1221952.21711287,1340652.697009075,-620943.6990984312,144416.9293806241,37.5],[-.0003441963504368392,111320.7020576856,278.2353980772752,2485758.690035394,6070.750963243378,54821.18345352118,9540.606633304236,-2710.55326746645,1405.483844121726,22.5],[-.0003218135878613132,111320.7020701615,.00369383431289,823725.6402795718,.46104986909093,2351.343141331292,1.58060784298199,8.77738589078284,.37238884252424,7.45]];function nr(e,t,r){var a=$t(t)/r[9],n=r[0]+r[1]*$t(e),i=r[2]+r[3]*a+r[4]*Math.pow(a,2)+r[5]*Math.pow(a,3)+r[6]*Math.pow(a,4)+r[7]*Math.pow(a,5)+r[8]*Math.pow(a,6);return[n*=e<0?-1:1,i*=t<0?-1:1]}function ir(e){for(var[t,r]=e,a=[],n=0;n<tr.length;n++)if($t(r)>tr[n]){a=ar[n];break}return nr(t,r,a)}function or(e){for(var[t,r]=e,a=[],n=0;n<er.length;n++)if($t(r)>=er[n]){a=rr[n];break}return nr(t,r,a)}function sr(e,t){if(!e)throw new Error(t)}function hr(e){return!!e&&"[object Array]"===Object.prototype.toString.call(e)}function fr(e){return!isNaN(Number(e))&&null!==e&&!hr(e)}function lr(...e){var t=e.length-1;return function(...r){for(var a=t,n=e[t].apply(null,r);a--;)n=e[a].call(null,n);return n}}function ur(e,t,r=!1){if(null!==e)for(var a,n,i,o,s,h,f,l,u=0,c=0,{type:g}=e,d="FeatureCollection"===g,p="Feature"===g,m=d?e.features.length:1,v=0;v<m;v++){h=(l=!!(f=d?e.features[v].geometry:p?e.geometry:e)&&"GeometryCollection"===f.type)?f.geometries.length:1;for(var y=0;y<h;y++){var b=0,w=0;if(null!==(o=l?f.geometries[y]:f)){var x=o.type;switch(u=!r||"Polygon"!==x&&"MultiPolygon"!==x?0:1,x){case null:break;case"Point":if(!1===t(s=o.coordinates,c,v,b,w))return!1;c++,b++;break;case"LineString":case"MultiPoint":for(s=o.coordinates,a=0;a<s.length;a++){if(!1===t(s[a],c,v,b,w))return!1;c++,"MultiPoint"===x&&b++}"LineString"===x&&b++;break;case"Polygon":case"MultiLineString":for(s=o.coordinates,a=0;a<s.length;a++){for(n=0;n<s[a].length-u;n++){if(!1===t(s[a][n],c,v,b,w))return!1;c++}"MultiLineString"===x&&b++,"Polygon"===x&&w++}"Polygon"===x&&b++;break;case"MultiPolygon":for(s=o.coordinates,a=0;a<s.length;a++){for(w=0,n=0;n<s[a].length;n++){for(i=0;i<s[a][n].length-u;i++){if(!1===t(s[a][n][i],c,v,b,w))return!1;c++}w++}b++}break;case"GeometryCollection":for(a=0;a<o.geometries.length;a++)if(!1===ur(o.geometries[a],t,r))return!1;break;default:throw new Error("Unknown Geometry Type")}}}}}!function(e){e.WGS84="WGS84",e.WGS1984="WGS84",e.EPSG4326="WGS84",e.GCJ02="GCJ02",e.AMap="GCJ02",e.BD09="BD09",e.BD09LL="BD09",e.Baidu="BD09",e.BMap="BD09",e.BD09MC="BD09MC",e.BD09Meter="BD09MC",e.EPSG3857="EPSG3857",e.EPSG900913="EPSG3857",e.EPSG102100="EPSG3857",e.WebMercator="EPSG3857",e.WM="EPSG3857"}(Qt||(Qt={}));var cr={WGS84:{to:(mt={},mt[Qt.GCJ02]=Ct,mt[Qt.BD09]=lr(Wt,Ct),mt[Qt.BD09MC]=lr(ir,Wt,Ct),mt[Qt.EPSG3857]=Kt,mt)},GCJ02:{to:(vt={},vt[Qt.WGS84]=Ft,vt[Qt.BD09]=Wt,vt[Qt.BD09MC]=lr(ir,Wt),vt[Qt.EPSG3857]=lr(Kt,Ft),vt)},BD09:{to:(yt={},yt[Qt.WGS84]=lr(Ft,jt),yt[Qt.GCJ02]=jt,yt[Qt.EPSG3857]=lr(Kt,Ft,jt),yt[Qt.BD09MC]=ir,yt)},EPSG3857:{to:(bt={},bt[Qt.WGS84]=Jt,bt[Qt.GCJ02]=lr(Ct,Jt),bt[Qt.BD09]=lr(Wt,Ct,Jt),bt[Qt.BD09MC]=lr(ir,Wt,Ct,Jt),bt)},BD09MC:{to:(wt={},wt[Qt.WGS84]=lr(Ft,jt,or),wt[Qt.GCJ02]=lr(jt,or),wt[Qt.EPSG3857]=lr(Kt,Ft,jt,or),wt[Qt.BD09]=or,wt)}};var gr=Object.assign(Object.assign({},Qt),{CRSTypes:Qt,transform:function(e,t,r){if(sr(!!e,"The args[0] input coordinate is required"),sr(!!t,"The args[1] original coordinate system is required"),sr(!!r,"The args[2] target coordinate system is required"),t===r)return e;var a=cr[t];sr(!!a,"Invalid original coordinate system: "+t);var n=a.to[r];sr(!!n,"Invalid target coordinate system: "+r);var i=typeof e;if(sr("string"===i||"object"===i,"Invalid input coordinate type: "+i),"string"===i)try{e=JSON.parse(e)}catch(t){throw new Error("Invalid input coordinate: "+e)}var o=!1;hr(e)&&(sr(e.length>=2,"Invalid input coordinate: "+e),sr(fr(e[0])&&fr(e[1]),"Invalid input coordinate: "+e),e=e.map(Number),o=!0);var s=n;return o?s(e):(ur(e,function(e){[e[0],e[1]]=s(e)}),e)}}),dr=256,pr=[-180,90],mr=[-20037508.342787,20037508.342787],vr=new class{constructor(e={}){if(Object.defineProperty(this,xt,{writable:!0,value:void 0}),Object.defineProperty(this,Mt,{writable:!0,value:void 0}),Object.defineProperty(this,kt,{writable:!0,value:void 0}),Object.defineProperty(this,It,{writable:!0,value:void 0}),Object.defineProperty(this,At,{writable:!0,value:void 0}),Object.defineProperty(this,Ut,{writable:!0,value:void 0}),ot(this,xt)[xt]=e.size||256,ot(this,Mt)[Mt]=e.antimeridian?2:1,!dt[ot(this,xt)[xt]]){var t=ot(this,xt)[xt],r=dt[ot(this,xt)[xt]]={};r.Bc=[],r.Cc=[],r.zc=[],r.Ac=[];for(var a=0;a<30;a++)r.Bc.push(t/360),r.Cc.push(t/(2*Math.PI)),r.zc.push(t/2),r.Ac.push(t),t*=2}ot(this,kt)[kt]=dt[ot(this,xt)[xt]].Bc,ot(this,It)[It]=dt[ot(this,xt)[xt]].Cc,ot(this,At)[At]=dt[ot(this,xt)[xt]].zc,ot(this,Ut)[Ut]=dt[ot(this,xt)[xt]].Ac}px(e,t){if(pt(t)){var r=ot(this,xt)[xt]*Math.pow(2,t),a=r/2,n=r/360,i=r/(2*Math.PI),o=r,s=Math.min(Math.max(Math.sin(ft*e[1]),-.9999),.9999),h=a+e[0]*n,f=a+.5*Math.log((1+s)/(1-s))*-i;return h>o*ot(this,Mt)[Mt]&&(h=o*ot(this,Mt)[Mt]),f>o&&(f=o),[h,f]}var l=ot(this,At)[At][t],u=Math.min(Math.max(Math.sin(ft*e[1]),-.9999),.9999),c=Math.round(l+e[0]*ot(this,kt)[kt][t]),g=Math.round(l+.5*Math.log((1+u)/(1-u))*-ot(this,It)[It][t]);return c>ot(this,Ut)[Ut][t]*ot(this,Mt)[Mt]&&(c=ot(this,Ut)[Ut][t]*ot(this,Mt)[Mt]),g>ot(this,Ut)[Ut][t]&&(g=ot(this,Ut)[Ut][t]),[c,g]}ll(e,t){if(pt(t)){var r=ot(this,xt)[xt]*Math.pow(2,t),a=r/360,n=r/(2*Math.PI),i=r/2,o=(e[1]-i)/-n;return[(e[0]-i)/a,lt*(2*Math.atan(Math.exp(o))-.5*Math.PI)]}var s=(e[1]-ot(this,At)[At][t])/-ot(this,It)[It][t];return[(e[0]-ot(this,At)[At][t])/ot(this,kt)[kt][t],lt*(2*Math.atan(Math.exp(s))-.5*Math.PI)]}convert(e,t){return t===gt?[...this.forward(e.slice(0,2)),...this.forward(e.slice(2,4))]:[...this.inverse(e.slice(0,2)),...this.inverse(e.slice(2,4))]}inverse(e){return[e[0]*lt/ut,(.5*Math.PI-2*Math.atan(Math.exp(-e[1]/ut)))*lt]}forward(e){var t=[ut*e[0]*ft,ut*Math.log(Math.tan(.25*Math.PI+.5*e[1]*ft))];return t[0]>ct&&(t[0]=ct),t[0]<-ct&&(t[0]=-ct),t[1]>ct&&(t[1]=ct),t[1]<-ct&&(t[1]=-ct),t}bbox(e,t,r,a,n){a&&(t=Math.pow(2,r)-1-t);var i=[e*ot(this,xt)[xt],(+t+1)*ot(this,xt)[xt]],o=[(+e+1)*ot(this,xt)[xt],t*ot(this,xt)[xt]],s=[...this.ll(i,r),...this.ll(o,r)];return n===gt?this.convert(s,gt):s}xyz(e,t,r,a){var n=a===gt?this.convert(e,"WGS84"):e,i=[n[0],n[1]],o=[n[2],n[3]],s=this.px(i,t),h=this.px(o,t),f=[Math.floor(s[0]/ot(this,xt)[xt]),Math.floor((h[0]-1)/ot(this,xt)[xt])],l=[Math.floor(h[1]/ot(this,xt)[xt]),Math.floor((s[1]-1)/ot(this,xt)[xt])],u={minX:Math.min.apply(Math,f)<0?0:Math.min.apply(Math,f),minY:Math.min.apply(Math,l)<0?0:Math.min.apply(Math,l),maxX:Math.max.apply(Math,f),maxY:Math.max.apply(Math,l)};if(r){var c={minY:Math.pow(2,t)-1-u.maxY,maxY:Math.pow(2,t)-1-u.minY};u.minY=c.minY,u.maxY=c.maxY}return u}}({size:dr});function yr(e){return 1.40625/Math.pow(2,e)}function br(e,t,r){if(r){var a=_e(e).map(function(e){return"EPSG:3857"===t?gr.transform(e,gr.WebMercator,gr.WGS84):e}).map(function(e){return gr.transform(e,gr.WGS84,gr.AMap)}),n=1/0,i=1/0,o=-1/0,s=-1/0;if(a.forEach(function(e){var[t,r]=e;n=Math.min(n,t),i=Math.min(i,r),o=Math.max(o,t),s=Math.max(s,r)}),"EPSG:4326"===t)e[0]=n,e[1]=i,e[2]=o,e[3]=s;else{var h=_e([n,i,o,o]).map(function(e){return c(e)}),f=1/0,l=1/0,u=-1/0,g=-1/0;h.forEach(function(e){var[t,r]=e;f=Math.min(f,t),l=Math.min(l,r),u=Math.max(u,t),g=Math.max(g,r)}),e[0]=f,e[1]=l,e[2]=u,e[3]=g}}}function wr(e,t,r,a=0,n){a=a||0;var i,[o,s]=mr,h=(i=r,156543.03392804097/Math.pow(2,i)*dr),f=function(e,t,r){var[a,n]=pr,i=yr(r)*dr,o=e,s=t;return[a+(o=Math.floor(o))*i,(s=Math.floor(s))*i-n,a+(o+1)*i,(s+1)*i-n]}(e,t,r);br(f,"EPSG:4326",n);var l=Re(_e(f).map(function(e){return vr.forward(e)})),[u,c,g,d]=l,p=(u-o)/h,m=(g-o)/h,v=(s-d)/h,y=(s-c)/h;if(p=Math.floor(p),m=Math.floor(m),v=Math.floor(v),y=Math.floor(y),!(m<p||y<v)){for(var b=[],w=v;w<=y;w++)for(var x=p;x<=m;x++)b.push([x,w,r+a]);var M=b.map(function(e){var[t,r,a]=e;return vr.bbox(t,r,a,!1,"900913")}),[k,I,A,U]=function(e){var t=1/0,r=1/0,a=-1/0,n=-1/0;return e.forEach(function(e){var[i,o,s,h]=e;t=Math.min(t,i),a=Math.max(a,s),r=Math.min(r,o),n=Math.max(n,h)}),[t,r,a,n]}(M);return{tiles:b,tilesbbox:[k,I,A,U],bbox:f,mbbox:l,x:e,y:t,z:r}}}function xr(e,t,r,a){var{width:n,height:i}=e,[o,s,h,f]=t,l=(h-o)/n,u=(f-s)/i,[c,g,d,p]=r,m=((c-=l)-o)/l,v=(f-(p+=u))/u,y=((d+=l)-o)/l,b=(f-(g-=u))/u;m=Math.floor(m),v=Math.floor(v);var w=(y=Math.ceil(y))-m,x=(b=Math.ceil(b))-v,M=V();O(M,w,x);var I=z(M);I.drawImage(e,m,v,w,x,0,0,w,x),k(e);for(var A=I.getImageData(0,0,w,x).data,U=[],B=1/0,P=1/0,E=-1/0,T=-1/0,D=-1,S="EPSG:4326"===a?vr.forward:vr.inverse,C=1;C<=x;C++)for(var F=p-(C-1)*u,N=F-u,G=1;G<=w;G++){var L=(C-1)*w*4+4*(G-1),_=A[L],R=A[L+1],Y=A[L+2],j=A[L+3],W=c+(G-1)*l,Z=S([W,F]);B=Math.min(B,Z[0]),E=Math.max(E,Z[0]),P=Math.min(P,Z[1]),T=Math.max(T,Z[1]);var X=[W,N];U[++D]={point:Z,point1:S(X),r:_,g:R,b:Y,a:j}}return{pixels:U,bbox:[B,P,E,T],width:w,height:x,image:M.transferToImageBitmap()}}function Mr(e,t,r){var[a,n,i,o]=t,s=(i-a)/dr,h=(o-n)/dr,{pixels:f,bbox:l}=e,[u,c,g,d]=l,p=(g-u)/s,m=(d-c)/h;if(p=Math.round(p),m=Math.round(m),!isNaN(p)&&!isNaN(m)&&0!==Math.min(p,m)&&Math.abs(p)!==1/0&&Math.abs(m)!==1/0){var v=V();O(v,p,m);for(var y=z(v),b=y.createImageData(p,m),w=b.data,x=0,M=f.length;x<M;x++)for(var{point:k,point1:I,r:A,g:U,b:B,a:P}=f[x],[E,T]=k,[D,S]=I,[C,F]=X(E,T),[N,G]=X(D,S),L=F;L<=G;L++){var _=(L-1)*p*4+4*(C-1);w[_]=A,w[_+1]=U,w[_+2]=B,w[_+3]=P}y.putImageData(b,0,0);var R=v.transferToImageBitmap(),Y=Math.round((a-u)/s),j=Math.round((d-o)/h),W=V();O(W,dr,dr);var Z=z(v);return Z.drawImage(R,Y-1,j,dr,dr,0,0,dr,dr),function(e){var t=e.canvas,{width:r,height:a}=t,n=e.getImageData(0,0,r,a),i=n.data,o=function(){for(var e=1;e<=a;e++){if(i[4*r*(e-1)+0+3]>0)return!1}return!0},s=function(e){for(var t=1;t<=a;t++){if(i[4*r*(t-1)+4*(e-1)+3]>0)return!1}return!0},h=function(){for(var e=1;e<=r;e++){if(i[4*(e-1)+(a-1)*r*4+3]>0)return!1}return!0};if(o())for(var f=1;f<=a;f++){var l=4*r*(f-1)+0,u=l+4,c=i[u],g=i[u+1],d=i[u+2],p=i[u+3];i[l]=c,i[l+1]=g,i[l+2]=d,i[l+3]=p}if(h())for(var m=1;m<=r;m++){var v=4*(m-1)+(a-1)*r*4,y=4*(m-1)+(a-2)*r*4,b=i[y],w=i[y+1],x=i[y+2],M=i[y+3];i[v]=b,i[v+1]=w,i[v+2]=x,i[v+3]=M}for(var k=[],I=1,A=r;I<=A;I++)k.push(s(I));if(k.indexOf(!0)>-1)for(var U=function(e,t){for(var n=1;n<=a;n++){var o=4*r*(n-1)+4*(e-1),s=4*r*(n-1)+4*(t-1),h=i[s],f=i[s+1],l=i[s+2],u=i[s+3];i[o]=h,i[o+1]=f,i[o+2]=l,i[o+3]=u}},B=1;B<=r;B++){if(k[B-1]){var P=k[B],E=k[B-1];P?E||U(B,B-1):U(B,B+1)}}e.putImageData(n,0,0)}(Z),r&&(Z.lineWidth=.4,Z.strokeStyle="red",Z.rect(0,0,dr,dr),Z.stroke()),W.transferToImageBitmap()}function X(e,t){var r=Math.round((e-u)/s+1);r=Math.min(r,p);var a=Math.round((d-t)/h+1);return[r,a=Math.min(a,m)]}}function kr(e){return new Promise(function(t,r){var{x:a,y:n,z:i,projection:o,zoomOffset:s,errorLog:h,debug:f,returnBlobURL:l,isGCJ02:u}=e,g=function(e){_(e,l).then(function(e){t(e)}).catch(function(e){r(e)})};!function(){var t;"EPSG:4326"===o?t=function(e,t,r,a=0,n){a=a||0;var[i,o]=pr,s=yr(r)*dr,h=vr.bbox(e,t,r);br(h,"EPSG:4326",n);var[f,l,u,g]=h,d=(f-i)/s,p=(u-i)/s,m=(o-g)/s,v=(o-l)/s;if(d=Math.floor(d),p=Math.floor(p),m=Math.floor(m),v=Math.floor(v),!(p<d||v<m)){for(var y=[],b=m;b<=v;b++)for(var w=d;w<=p;w++)y.push([w-1,b,r+a]);return{tiles:y,tilesbbox:[i+(d-1)*s,o-(v+1)*s,i+p*s,o-m*s],bbox:h,mbbox:Re(_e(h).map(function(e){return c(e)})),x:e,y:t,z:r}}}(a,n,i,s||0,u):"EPSG:3857"===o&&(t=wr(a,n,i,s||0,u));var{tiles:r}=t||{};if(r&&0!==r.length){t.loadCount=0;var l=function(){if(t.loadCount>=r.length){var a,n=G(r,f);if("EPSG:4326"===o)a=Mr(xr(n,t.tilesbbox,t.bbox,o),t.mbbox,f),g(a||C());else a=Mr(xr(n,t.tilesbbox,t.mbbox,o),t.bbox,f),g(a||C())}else{var i=r[t.loadCount],[s,u,c]=i;Ve(Object.assign({},e,{x:s,y:u,z:c,returnBlobURL:!1})).then(function(e){i.tileImage=e,t.loadCount++,l()}).catch(function(e){h&&console.error(e),i.tileImage=C(),t.loadCount++,l()})}};l()}else g(C())}()})}e.initialize=function(){},e.onmessage=function(e,t){var a=e.data||{},n=a._type;if("getTile"!==n){var o;if("layoutTiles"!==n)if("getTileWithMaxZoom"!==n)if("clipTile"!==n)if("tileIntersectMask"!==n)if("transformTile"!==n){if("injectMask"===n){var f=et(a.maskId,a.geojsonFeature);return f instanceof Error?void t(f):void t()}if("removeMask"===n)return function(e){delete $e[e]}(a.maskId),void t();if("cancelFetch"===n){var c=a.taskId||a.__taskId;return c?(function(e){var t=Ee[e]||[];t.length&&t.forEach(function(e){e.abort(i)}),delete Ee[e]}(c),void t()):void t(l("cancelFetch need taskId"))}if("imageSlicing"!==n)if("imageToBlobURL"!==n)if("encodeTerrainTile"!==n)if("colorTerrainTile"!==n)if("fetchImage"!==n){var g="not support message type:"+n;console.error(g),t(l(g))}else(function(e){return new Promise(function(t,r){var{url:a,headers:n}=e,i=e.fetchOptions||{headers:n,referrer:e.referrer};fetch(a,i).then(function(e){return e.ok||r(s(a)),e.blob()}).then(function(e){return createImageBitmap(e)}).then(function(e){t(e)}).catch(function(e){r(e)})})})(a).then(function(e){t(null,e,B(e))}).catch(function(e){t(e)});else{var{tile:d,colors:p,returnBlobURL:m}=a;_(L(Ce(p,d),a),m).then(function(e){t(null,e,B(e))}).catch(function(e){t(e)})}else{var{url:v}=a;Oe(v,a).then(function(e){t(null,e,B(e))}).catch(function(e){t(e)})}else Ne(a).then(function(e){t(null,e,[])}).catch(function(e){t(e)});else(function(e){return e.disableCache=!0,new Promise(function(t,a){var n=u(e.url),i=Object.assign({},r,e.headers||{}),o=n.map(function(t){return Se(t,i,e)});Promise.all(o).then(function(r){var n=V(Fe),i=F(r);if(i instanceof Error)a(i);else{for(var{width:o,height:s}=i,h=Math.ceil(s/Fe),f=Math.ceil(o/Fe),l=[],u=1;u<=h;u++)for(var c=(u-1)*Fe,g=Math.min(s,u*Fe),d=1;d<=f;d++){var p=(d-1)*Fe,m=Math.min(o,d*Fe)-p,v=g-c;O(n,m,v),z(n).drawImage(i,p,c,m,v,0,0,n.width,n.height);var y=L(n.transferToImageBitmap(),e);l.push({id:x(),x:p,y:c,width:m,height:v,row:u,col:d,image:y})}var b={rows:h,cols:f,rowWidth:Fe,colsHeight:Fe,width:o,height:s,items:l};k(i),t(b)}}).catch(function(e){a(e)})})})(a).then(function(e){var r=[];(e.items||[]).forEach(function(e){M(e.image)&&r.push(e.image)}),t(null,e,r)}).catch(function(e){t(e)})}else kr(a).then(function(e){t(null,e,B(e))}).catch(function(e){t(e)});else{var{tileBBOX:y,maskId:b}=a;(function(e,t){return new Promise(function(r,a){var n=$e[t];if(n){var i=function(){r({intersect:!1})},o=function(){r({intersect:!0})},s=n.bbox;if(s){var{coordinates:f,type:l}=n.geometry;if(f.length)if(Ge(s,e))if(Le(s,e))o();else{var u=f;"Polygon"===l&&(u=[u]),0!==it(u,e).length?o():i()}else i();else i()}else i()}else a(h("not find mask ,the maskId:"+t))})})(y,b).then(function(e){t(null,e,B(e))}).catch(function(e){t(e)})}else(o=a,new Promise(function(e,t){var{tile:r,tileBBOX:a,projection:n,tileSize:i,maskId:s,returnBlobURL:h,reverse:f}=o,l=$e[s],u=V(i),c=function(r){_(r,h).then(function(t){e(t)}).catch(function(e){t(e)})},g=l.bbox;if(g){var{coordinates:d,type:p}=l.geometry;if(d.length){var m=function(){c(f?r:C(i))};if(Ge(g,a)){var v,y=d;if("Polygon"===p&&(y=[y]),Le(g,a)){v=tt(n,y);var b=N(u,at(n,a,i,v),r,f);c(b)}else{var w=it(y,a);if(0!==w.length){v=tt(n,w);var x=N(u,at(n,a,i,v),r,f);c(x)}else m()}}else m()}else c(r)}else c(r)})).then(function(e){t(null,e,B(e))}).catch(function(e){t(e)});else Ve(a).then(function(e){t(null,e,B(e))}).catch(function(e){t(e)});else(function(e){var{urlTemplate:t,tiles:a,subdomains:n,returnBlobURL:i,debug:o}=e;return new Promise(function(s,f){if(E(t,n)){var l=a.map(function(e){var[r,a,i]=e;return P(t,r,a,i,n)}),u=Object.assign({},r,e.headers||{}),c=l.map(function(t){return Se(t,u,e)});Promise.all(c).then(function(t){t.forEach(function(e,t){a[t].tileImage=e}),_(L(G(a,o),e),i).then(function(e){s(e)}).catch(function(e){f(e)})}).catch(function(e){f(e)})}else f(h("not find subdomains"))})})(a).then(function(e){t(null,e,B(e))}).catch(function(e){t(e)})}else{var{url:w}=a;(function(e,t){return new Promise(function(a,n){var i=u(e),o=Object.assign({},r,t.headers||{}),s=i.map(function(e){return Se(e,o,t)}),{returnBlobURL:h,globalCompositeOperation:f}=t;Promise.all(s).then(function(e){V();var r=F(e,f);r instanceof Error?n(r):_(L(r,t),h).then(function(e){a(e)}).catch(function(e){n(e)})}).catch(function(e){n(e)})})})(w,a).then(function(e){t(null,e,B(e))}).catch(function(e){t(e)})}},Object.defineProperty(e,"__esModule",{value:!0})}`;

  class CustomError extends Error {
      constructor(message, code) {
          super(message);
          this.code = code;
      }
  }
  function isNumber(value) {
      return typeof value === 'number';
  }
  function createError(message, code) {
      return new CustomError(message, code);
  }
  const CANVAS_ERROR_MESSAGE = createError('not find canvas.The current environment does not support OffscreenCanvas', -4);
  const FetchCancelError = createError('fetch tile data cancel', 499);
  createError('fetch tile data timeout', 408);
  function createParamsValidateError(message) {
      return createError(message, -1);
  }
  function checkTileUrl(url) {
      if (Array.isArray(url)) {
          return url;
      }
      return [url];
  }
  function lnglat2Mercator(coordinates) {
      const [lng, lat] = coordinates;
      const earthRad = 6378137.0;
      const x = lng * Math.PI / 180 * earthRad;
      const a = lat * Math.PI / 180;
      const y = earthRad / 2 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
      return [x, y];
  }
  function isPolygon(feature) {
      if (!feature) {
          return false;
      }
      const geometry = feature.geometry || { type: null };
      const type = geometry.type;
      return type === 'Polygon' || type === 'MultiPolygon';
  }
  function isEPSG3857(projection) {
      return projection === 'EPSG:3857';
  }
  let globalId = 0;
  function uuid() {
      globalId++;
      return globalId;
  }
  function isImageBitmap(image) {
      return image && image instanceof ImageBitmap;
  }
  function disposeImage(images) {
      if (!Array.isArray(images)) {
          images = [images];
      }
      images.forEach(image => {
          if (image && image.close) {
              image.close();
          }
      });
  }
  function checkBuffers(image) {
      const images = checkTileUrl(image);
      const buffers = [];
      images.forEach(item => {
          if (isImageBitmap(item)) {
              buffers.push(item);
          }
      });
      return buffers;
  }

  let globalCanvas;
  function getCanvas(tileSize = 256) {
      if (!globalCanvas && OffscreenCanvas) {
          globalCanvas = new OffscreenCanvas(1, 1);
      }
      if (globalCanvas) {
          resizeCanvas(globalCanvas, tileSize, tileSize);
      }
      return globalCanvas;
  }
  function resizeCanvas(canvas, width, height) {
      if (canvas) {
          canvas.width = width;
          canvas.height = height;
      }
  }
  function clearCanvas(ctx) {
      const canvas = ctx.canvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function getCanvasContext(canvas) {
      const ctx = canvas.getContext('2d', {
          willReadFrequently: true
      });
      clearCanvas(ctx);
      return ctx;
  }
  function getBlankTile(tileSize) {
      const canvas = getCanvas(tileSize);
      getCanvasContext(canvas);
      return canvas.transferToImageBitmap();
  }
  function get404Tile(tileSize) {
      const canvas = getCanvas(tileSize);
      const ctx = getCanvasContext(canvas);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'gray';
      ctx.font = "bold 24px serif";
      ctx.fillText('404', canvas.width / 2, canvas.height / 2);
      return canvas.transferToImageBitmap();
  }

  function bboxIntersect(bbox1, bbox2) {
      if (bbox1[2] < bbox2[0]) {
          return false;
      }
      if (bbox1[1] > bbox2[3]) {
          return false;
      }
      if (bbox1[0] > bbox2[2]) {
          return false;
      }
      if (bbox1[3] < bbox2[1]) {
          return false;
      }
      return true;
  }
  function bboxToPoints(bbox) {
      const [minx, miny, maxx, maxy] = bbox;
      return [
          [minx, miny],
          [maxx, miny],
          [maxx, maxy],
          [minx, maxy]
      ];
  }

  function imageTile(imageInfo, options) {
      const imageBBOX = imageInfo.imageBBOX;
      const image = imageInfo.image;
      const { width, height } = image;
      let { tileBBOX, projection, tileSize } = options;
      const [x1, y1, x2, y2] = imageBBOX;
      const ax = width / (x2 - x1);
      const ay = height / (y2 - y1);
      let [minx, miny, maxx, maxy] = tileBBOX;
      if (isEPSG3857(projection)) {
          minx = Infinity;
          miny = Infinity;
          maxx = -Infinity;
          maxy = -Infinity;
          const points = bboxToPoints(tileBBOX);
          points.forEach(p => {
              const m = lnglat2Mercator(p);
              const [x, y] = m;
              minx = Math.min(x, minx);
              miny = Math.min(y, miny);
              maxx = Math.max(x, maxx);
              maxy = Math.max(y, maxy);
          });
      }
      if (!bboxIntersect(imageBBOX, [minx, miny, maxx, maxy])) {
          return getBlankTile();
      }
      let left = (minx - x1) * ax;
      let right = (maxx - x1) * ax;
      let bottom = height - (miny - y1) * ay;
      let top = height - (maxy - y1) * ay;
      left = Math.floor(left);
      bottom = Math.floor(bottom);
      top = Math.floor(top);
      right = Math.floor(right);
      if (right < 0 || left > width || top > height || bottom < 0) {
          return getBlankTile();
      }
      if (left === right) {
          right++;
      }
      if (bottom === top) {
          bottom--;
      }
      tileSize = tileSize || 256;
      const canvas = getCanvas(tileSize);
      const ctx = getCanvasContext(canvas);
      ctx.drawImage(image, left, top, right - left, bottom - top, 0, 0, tileSize, tileSize);
      return canvas.transferToImageBitmap();
  }

  const WORKERNAME = '__maptalks.tileclip__';
  maptalks.registerWorkerAdapter(WORKERNAME, WORKERCODE);
  const maskMap = {};
  const imageMap = {};
  const SUPPORTPROJECTION = ['EPSG:4326', 'EPSG:3857'];
  const TerrainTypes = ['mapzen', 'tianditu', 'cesium', 'arcgis', 'qgis-gray'];
  function checkOptions(options, type) {
      return Object.assign({
          referrer: document.location.href,
          tileSize: 256
      }, options, {
          _type: type,
          __taskId: uuid(),
          __workerId: getWorkerId()
      });
  }
  function getTaskId(options) {
      const workerId = options.__workerId;
      const taskId = options.__taskId;
      return {
          workerId,
          taskId
      };
  }
  class TileActor extends maptalks.worker.Actor {
      _cancelTask(options) {
          const { workerId, taskId } = getTaskId(options);
          if (!isNumber(workerId) || !isNumber(taskId)) {
              return;
          }
          if (taskId) {
              this.send({ _type: 'cancelFetch', __taskId: taskId }, [], (error, image) => {
                  // if (error) {
                  //     reject(error);
                  // } else {
                  //     resolve(image);
                  // }
              }, workerId);
          }
      }
      getTile(options) {
          options = checkOptions(options, 'getTile');
          const { workerId } = getTaskId(options);
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { url } = options;
              if (!url) {
                  reject(createParamsValidateError('getTile error:url is null'));
                  return;
              }
              const buffers = checkBuffers(url);
              this.send(options, buffers, (error, image) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      resolve(image);
                  }
              }, workerId);
          });
          wrapPromise(promise, options);
          return promise;
      }
      layoutTiles(options) {
          options = checkOptions(options, 'layoutTiles');
          const { workerId } = getTaskId(options);
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { urlTemplate, tiles } = options;
              if (!urlTemplate) {
                  reject(createParamsValidateError('layoutTiles error:urlTemplate is null'));
                  return;
              }
              if (!tiles || tiles.length === 0) {
                  reject(createParamsValidateError('layoutTiles error:tiles is null'));
                  return;
              }
              const buffers = [];
              this.send(options, buffers, (error, image) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      resolve(image);
                  }
              }, workerId);
          });
          wrapPromise(promise, options);
          return promise;
      }
      getTileWithMaxZoom(options) {
          options = checkOptions(options, 'getTileWithMaxZoom');
          const { workerId } = getTaskId(options);
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { urlTemplate, maxAvailableZoom, x, y, z } = options;
              const maxZoomEnable = maxAvailableZoom && isNumber(maxAvailableZoom) && maxAvailableZoom >= 1;
              if (!maxZoomEnable) {
                  reject(createParamsValidateError('getTileWithMaxZoom error:maxAvailableZoom is error'));
                  return;
              }
              if (!urlTemplate) {
                  reject(createParamsValidateError('getTileWithMaxZoom error:urlTemplate is error'));
                  return;
              }
              if (!isNumber(x) || !isNumber(y) || !isNumber(z)) {
                  reject(createParamsValidateError('getTileWithMaxZoom error:x/y/z is error'));
                  return;
              }
              this.send(options, [], (error, image) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      resolve(image);
                  }
              }, workerId);
          });
          wrapPromise(promise, options);
          return promise;
      }
      transformTile(options) {
          options = checkOptions(options, 'transformTile');
          const { workerId } = getTaskId(options);
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { urlTemplate, x, y, z, maxAvailableZoom, projection, zoomOffset, errorLog, debug, returnBlobURL } = options;
              const maxZoomEnable = maxAvailableZoom && isNumber(maxAvailableZoom) && maxAvailableZoom >= 1;
              if (!projection) {
                  reject(createParamsValidateError('transformTile error:not find projection'));
                  return;
              }
              if (SUPPORTPROJECTION.indexOf(projection) === -1) {
                  reject(createParamsValidateError('transformTile error:not support projection:' + projection + '.the support:' + SUPPORTPROJECTION.join(',').toString()));
                  return;
              }
              if (!maxZoomEnable) {
                  reject(createParamsValidateError('transformTile error:maxAvailableZoom is error'));
                  return;
              }
              if (!urlTemplate) {
                  reject(createParamsValidateError('transformTile error:urlTemplate is error'));
                  return;
              }
              if (!isNumber(x) || !isNumber(y) || !isNumber(z)) {
                  reject(createParamsValidateError('transformTile error:x/y/z is error'));
                  return;
              }
              this.send(options, [], (error, image) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      resolve(image);
                  }
              }, workerId);
          });
          wrapPromise(promise, options);
          return promise;
      }
      clipTile(options) {
          options = checkOptions(options, 'clipTile');
          delete options.__taskId;
          delete options.__workerId;
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { tile, tileBBOX, projection, tileSize, maskId } = options;
              if (!tile) {
                  reject(createParamsValidateError('clipTile error:tile is null.It should be a ImageBitmap'));
                  return;
              }
              if (!tileBBOX) {
                  reject(createParamsValidateError('clipTile error:tileBBOX is null'));
                  return;
              }
              if (!projection) {
                  reject(createParamsValidateError('clipTile error:projection is null'));
                  return;
              }
              if (!tileSize) {
                  reject(createParamsValidateError('clipTile error:tileSize is null'));
                  return;
              }
              if (!maskId) {
                  reject(createParamsValidateError('clipTile error:maskId is null'));
                  return;
              }
              if (!this.maskHasInjected(maskId)) {
                  reject(createParamsValidateError('not find mask by maskId:' + maskId));
                  return;
              }
              const buffers = [];
              if (isImageBitmap(options.tile)) {
                  buffers.push(options.tile);
              }
              this.send(options, buffers, (error, image) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      resolve(image);
                  }
              });
          });
          wrapPromise(promise, options);
          return promise;
      }
      tileIntersectMask(options) {
          options = checkOptions(options, 'tileIntersectMask');
          delete options.__taskId;
          delete options.__workerId;
          const promise = new Promise((resolve, reject) => {
              const { tileBBOX, maskId } = options;
              if (!tileBBOX) {
                  reject(createParamsValidateError('tileIntersectMask error:tileBBOX is null'));
                  return;
              }
              if (!maskId) {
                  reject(createParamsValidateError('tileIntersectMask error:maskId is null'));
                  return;
              }
              if (!this.maskHasInjected(maskId)) {
                  reject(createParamsValidateError('not find mask by maskId:' + maskId));
                  return;
              }
              const buffers = [];
              this.send(options, buffers, (error, result) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      resolve(result);
                  }
              });
          });
          wrapPromise(promise, options);
          return promise;
      }
      injectMask(maskId, geojsonFeature) {
          const promise = new Promise((resolve, reject) => {
              if (!maskId) {
                  reject(createParamsValidateError('injectMask error:maskId is null'));
                  return;
              }
              if (maskMap[maskId]) {
                  reject(createParamsValidateError(`injectMask error:${maskId} has injected`));
                  return;
              }
              if (!isPolygon(geojsonFeature)) {
                  reject(createParamsValidateError('injectMask error:geojsonFeature is not Polygon,It should be GeoJSON Polygon/MultiPolygon'));
                  return;
              }
              this.broadcast({
                  maskId,
                  geojsonFeature,
                  _type: 'injectMask'
              }, [], (error, data) => {
                  if (error) {
                      reject(error);
                      return;
                  }
                  resolve(null);
                  maskMap[maskId] = true;
              });
          });
          wrapPromise(promise, {});
          return promise;
      }
      removeMask(maskId) {
          const promise = new Promise((resolve, reject) => {
              if (!maskId) {
                  reject(createParamsValidateError('removeMask error:maskId is null'));
                  return;
              }
              this.broadcast({
                  maskId,
                  _type: 'removeMask'
              }, [], (error, data) => {
                  if (error) {
                      reject(error);
                      return;
                  }
                  resolve(null);
                  delete maskMap[maskId];
              });
          });
          wrapPromise(promise, {});
          return promise;
      }
      maskHasInjected(maskId) {
          if (!maskId) {
              console.error('maskHasInjected error:maskId is null');
              return false;
          }
          return !!maskMap[maskId];
      }
      imageSlicing(options) {
          options = checkOptions(options, 'imageSlicing');
          const { workerId } = getTaskId(options);
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { url } = options;
              if (!url) {
                  reject(createParamsValidateError('url is null'));
                  return;
              }
              const buffers = checkBuffers(url);
              this.send(options, buffers, (error, result) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      const returnBlobURL = options.returnBlobURL;
                      if (!returnBlobURL) {
                          resolve(result);
                      }
                      else {
                          const items = result.items || [];
                          const workerIds = [];
                          while (1) {
                              const workerId = getWorkerId();
                              if (workerIds.indexOf(workerId) === -1) {
                                  workerIds.push(workerId);
                              }
                              else {
                                  break;
                              }
                          }
                          const pageSize = Math.ceil(items.length / workerIds.length);
                          let temp = [];
                          const isEnd = () => {
                              return temp.length === items.length;
                          };
                          const mergeResult = () => {
                              temp.forEach(d => {
                                  for (let i = 0, len = items.length; i < len; i++) {
                                      const item = items[i];
                                      if (item.id === d.id) {
                                          item.image = d.url;
                                          break;
                                      }
                                  }
                              });
                              resolve(result);
                          };
                          for (let i = 0, len = workerIds.length; i < len; i++) {
                              const workerId = workerIds[i];
                              const start = i * pageSize;
                              const end = start + pageSize;
                              const subItems = items.slice(start, end);
                              if (subItems.length === 0) {
                                  if (isEnd()) {
                                      mergeResult();
                                  }
                                  continue;
                              }
                              const opts = Object.assign({}, options);
                              opts._type = 'imageToBlobURL';
                              opts.items = subItems;
                              opts._workerId = workerId;
                              const buffers = subItems.map(item => item.image);
                              this.send(opts, buffers, (error, resultItems) => {
                                  if (error) {
                                      reject(error);
                                      return;
                                  }
                                  else {
                                      temp = temp.concat(resultItems);
                                      if (isEnd()) {
                                          mergeResult();
                                      }
                                  }
                              }, workerId);
                          }
                      }
                  }
              }, workerId);
          });
          wrapPromise(promise, options);
          return promise;
      }
      encodeTerrainTile(options) {
          options = checkOptions(options, 'encodeTerrainTile');
          const { workerId } = getTaskId(options);
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { url, terrainType, minHeight, maxHeight } = options;
              if (!url) {
                  reject(createParamsValidateError('encodeTerrainTile error:url is null'));
                  return;
              }
              if (!terrainType) {
                  reject(createParamsValidateError('encodeTerrainTile error:terrainType is null'));
                  return;
              }
              if (TerrainTypes.indexOf(terrainType) === -1) {
                  reject(createParamsValidateError('encodeTerrainTile error:terrainType:not support the terrainType:' + terrainType));
                  return;
              }
              if (terrainType === 'qgis-gray') {
                  if (!isNumber(minHeight) || !isNumber(maxHeight) || minHeight > maxHeight) {
                      reject(createParamsValidateError('encodeTerrainTile error:terrainType:qgis-gray,require minHeight/maxHeight should number'));
                      return;
                  }
              }
              this.send(Object.assign({ terrainWidth: 65, tileSize: 256 }, options), [], (error, image) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      resolve(image);
                  }
              }, workerId);
          });
          wrapPromise(promise, options);
          return promise;
      }
      colorTerrainTile(options) {
          options = checkOptions(options, 'colorTerrainTile');
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { tile, colors } = options;
              if (!tile || !isImageBitmap(tile)) {
                  reject(createParamsValidateError('colorTerrainTile error:tile is not ImageBitMap'));
                  return;
              }
              if (!colors || !Array.isArray(colors) || colors.length === 0) {
                  reject(createParamsValidateError('colorTerrainTile error:colors is null'));
                  return;
              }
              const buffers = checkBuffers(tile);
              this.send(Object.assign({}, options), buffers, (error, image) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      resolve(image);
                  }
              });
          });
          wrapPromise(promise, options);
          return promise;
      }
      injectImage(options) {
          options = checkOptions(options, 'fetchImage');
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { imageId, url, imageBBOX } = options;
              if (!imageId) {
                  reject(createParamsValidateError('injectImage error:imageId is null'));
                  return;
              }
              if (!url) {
                  reject(createParamsValidateError('injectImage error:url is null'));
                  return;
              }
              if (this.imageHasInjected(imageId)) {
                  reject(createParamsValidateError(`injectImage error:${imageId} has injected`));
                  return;
              }
              if (!imageBBOX) {
                  reject(createParamsValidateError('injectImage error:imageBBOX is null'));
                  return;
              }
              options.url = maptalks.Util.getAbsoluteURL(url);
              this.send(Object.assign({}, options), [], (error, image) => {
                  if (error || promise.canceled) {
                      reject(error || FetchCancelError);
                  }
                  else {
                      imageMap[imageId] = {
                          imageBBOX,
                          url,
                          image
                      };
                      resolve(null);
                  }
              });
          });
          wrapPromise(promise, {});
          return promise;
      }
      removeImage(imageId) {
          const promise = new Promise((resolve, reject) => {
              if (!imageId) {
                  reject(createParamsValidateError('removeImage error:imageId is null'));
                  return;
              }
              const imageInfo = imageMap[imageId] || {};
              delete imageMap[imageId];
              const image = imageInfo.image;
              disposeImage(image);
              resolve(null);
          });
          wrapPromise(promise, {});
          return promise;
      }
      imageHasInjected(imageId) {
          if (!imageId) {
              console.error('imageHasInjected error:imageId is null');
              return false;
          }
          return !!imageMap[imageId];
      }
      getImageTile(options) {
          options = checkOptions(options, 'getImageTile');
          const promise = new Promise((resolve, reject) => {
              if (!getCanvas()) {
                  reject(CANVAS_ERROR_MESSAGE);
                  return;
              }
              const { tileBBOX, projection, imageId } = options;
              if (!tileBBOX) {
                  reject(createParamsValidateError('getImageTile error:tileBBOX is null'));
                  return;
              }
              if (!imageId) {
                  reject(createParamsValidateError('getImageTile error:imageId is null'));
                  return;
              }
              if (!projection) {
                  reject(createParamsValidateError('getImageTile error:projection is null'));
                  return;
              }
              if (!this.imageHasInjected(imageId)) {
                  reject(createParamsValidateError('not find image by imageId:' + imageId));
                  return;
              }
              const imageInfo = imageMap[imageId];
              const image = imageTile(imageInfo, options);
              resolve(image);
          });
          wrapPromise(promise, options);
          return promise;
      }
  }
  let actor;
  function getTileActor() {
      if (!actor) {
          actor = new TileActor(WORKERNAME);
      }
      return actor;
  }
  let globalWorkerId = 0;
  function getWorkerId() {
      const actor = getTileActor();
      const workers = actor.workers || [];
      const id = globalWorkerId % workers.length;
      globalWorkerId++;
      return id;
  }
  function wrapPromise(promise, options) {
      promise.cancel = () => {
          getTileActor()._cancelTask(options);
          promise.canceled = true;
      };
  }

  exports.get404Tile = get404Tile;
  exports.getBlankTile = getBlankTile;
  exports.getTileActor = getTileActor;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=maptalks.tileclip.js.map
