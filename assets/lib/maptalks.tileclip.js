/*!
 * maptalks.tileclip v0.40.0
  */
(function (global, factory) {
     typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
     typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
     (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.maptalks = global.maptalks || {}, global.maptalks));
})(this, (function (exports, maptalks) { 'use strict';

     var WORKERCODE = (function(t){class e extends Error{constructor(t,e){super(t),this.code=e;}}const r={accept:"image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26"};function n(t){return "number"==typeof t}function i(t,r){return new e(t,r)}function a(t){return i(t,-1)}function s(t){return i(t,-2)}function o(t){return i(t,-3)}function h(t){return Array.isArray(t)?t:[t]}i("not find canvas.The current environment does not support OffscreenCanvas",-4);const l=i("fetch tile data cancel",499),f=i("fetch tile data timeout",408);function c(t){const[e,r]=t,n=6378137,i=e*Math.PI/180*n,a=r*Math.PI/180;return [i,3189068.5*Math.log((1+Math.sin(a))/(1-Math.sin(a)))]}function u(t){return "EPSG:3857"===t}let g=0;function d(t){return t&&t instanceof ImageBitmap}function p(t){Array.isArray(t)||(t=[t]),t.forEach((t=>{t&&t.close&&t.close();}));}function m(t,e){const r=Math.floor(10*(t+1e4)),n=r>>16,i=r>>8&255,a=255&r;return e?(e[0]=n,e[1]=i,e[2]=a,e):[n,i,a]}function y(t,e,r){return .1*(256*t*256+256*e+r)-1e4}function b(t,e,r){for(;t.indexOf(e)>-1;)t=t.replace(e,r);return t}function w(t){const e=h(t),r=[];return e.forEach((t=>{d(t)&&r.push(t);})),r}var x,M,v,k,I,A;function U(t,e,r,n,i,a){var s,o,h,l,f,c,u,g,d,p,m,y,b,w,x,M,v,k,I,A,U,B,E,P,T,D,S,z,V,C;for(T=0;T<a;T++){for(E=T,P=0,h=(s=t[B=T*i])>>8&255,l=s>>16&255,f=s>>24&255,w=k=(o=255&s)*n[6],x=I=h*n[6],M=A=l*n[6],v=U=f*n[6],S=n[0],z=n[1],V=n[4],C=n[5],D=0;D<i;D++)p=(c=255&(s=t[B]))*S+o*z+w*V+k*C,m=(u=s>>8&255)*S+h*z+x*V+I*C,y=(g=s>>16&255)*S+l*z+M*V+A*C,b=(d=s>>24&255)*S+f*z+v*V+U*C,k=w,I=x,A=M,U=v,w=p,x=m,M=y,v=b,o=c,h=u,l=g,f=d,r[P]=w,r[P+1]=x,r[P+2]=M,r[P+3]=v,P+=4,B++;for(P-=4,E+=a*(i-1),h=(s=t[--B])>>8&255,l=s>>16&255,f=s>>24&255,w=k=(o=255&s)*n[7],x=I=h*n[7],M=A=l*n[7],v=U=f*n[7],c=o,u=h,g=l,d=f,S=n[2],z=n[3],D=i-1;D>=0;D--)p=c*S+o*z+w*V+k*C,m=u*S+h*z+x*V+I*C,y=g*S+l*z+M*V+A*C,b=d*S+f*z+v*V+U*C,k=w,I=x,A=M,U=v,w=p,x=m,M=y,v=b,o=c,h=u,l=g,f=d,c=255&(s=t[B]),u=s>>8&255,g=s>>16&255,d=s>>24&255,s=(r[P]+w|0)+(r[P+1]+x<<8)+(r[P+2]+M<<16)+(r[P+3]+v<<24),e[E]=s,B--,P-=4,E-=a;}}var B=function(t,e,r,n){if(n){var i=new Uint32Array(t.buffer),a=new Uint32Array(i.length),s=new Float32Array(4*Math.max(e,r)),o=function(t){t<.5&&(t=.5);var e=Math.exp(.527076)/t,r=Math.exp(-e),n=Math.exp(-2*e),i=(1-r)*(1-r)/(1+2*e*r-n);return x=i,M=i*(e-1)*r,v=i*(e+1)*r,k=-i*n,I=2*r,A=-n,new Float32Array([x,M,v,k,I,A,(x+M)/(1-I-A),(v+k)/(1-I-A)])}(n);U(i,a,s,o,e,r),U(a,i,s,o,r,e);}};let E;function P(t=256){return !E&&OffscreenCanvas&&(E=new OffscreenCanvas(1,1)),E&&T(E,t,t),E}function T(t,e,r){t&&(t.width=e,t.height=r);}function D(t){const e=t.getContext("2d",{willReadFrequently:!0});return function(t){const e=t.canvas;t.clearRect(0,0,e.width,e.height);}(e),e}function S(t){const e=P(t);return D(e),e.transferToImageBitmap()}function z(t,e){if(1===t.length)return t[0];if(0===t.length)return s("merge tiles error,not find imagebitmaps");for(let e=0,r=t.length;e<r;e++){if(!d(t[e]))return s("merge tiles error,images not imagebitmap")}const r=t[0].width,n=P(r),i=D(n);return e&&(i.save(),i.globalCompositeOperation=e),t.forEach((t=>{i.drawImage(t,0,0,r,r);})),e&&i.restore(),p(t),n.transferToImageBitmap()}function V(t,e,r,n){const i=D(t);i.save();i.beginPath(),n&&i.rect(0,0,t.width,t.height),e.forEach((t=>{(t=>{for(let e=0,r=t.length;e<r;e++){const r=t[e],n=r[0],a=r[r.length-1],[s,o]=n,[h,l]=a;s===h&&o===l||r.push(n);for(let t=0,e=r.length;t<e;t++){const[e,n]=r[t];0===t?i.moveTo(e,n):i.lineTo(e,n);}}})(t);})),i.clip("evenodd"),i.drawImage(r,0,0,t.width,t.height);const a=t.transferToImageBitmap();return i.restore(),p(r),a}function C(t,e){const r=P(),i=function(t,e,r){if(!r)return e;T(t,e.width,e.height);const n=D(t);n.save(),n.filter=r,n.drawImage(e,0,0),n.restore();const i=t.transferToImageBitmap();return p(e),i}(r,t,e.filter),a=function(t,e,r){if(!n(r)||r<=0)return e;T(t,e.width,e.height);const i=D(t);i.drawImage(e,0,0);const a=i.getImageData(0,0,t.width,t.height);B(a.data,t.width,t.height,r),i.putImageData(a,0,0);const s=t.transferToImageBitmap();return p(e),s}(r,i,e.gaussianBlurRadius),s=function(t,e=1){if(!n(e)||1===e||e<0||e>1)return t;const r=P();T(r,t.width,t.height);const i=D(r);i.globalAlpha=e,i.drawImage(t,0,0);const a=r.transferToImageBitmap();return i.globalAlpha=1,p(t),a}(a,e.opacity);return s}function O(t,e){return new Promise(((r,n)=>{e?function(t){const e=P();return T(e,t.width,t.height),D(e).drawImage(t,0,0),p(t),e.convertToBlob()}(t).then((t=>{const e=URL.createObjectURL(t);r(e);})).catch((t=>{n(t);})):r(t);}))}const F=()=>{};class N{constructor(t,e){this.max=t,this.onRemove=e||F,this.reset();}reset(){if(this.data){const t=this.data.values();for(const e of t)this.onRemove(e);}return this.data=new Map,this}clear(){this.reset(),delete this.onRemove;}add(t,e){return e?(this.has(t)?(this.data.delete(t),this.data.set(t,e),this.data.size>this.max&&this.shrink()):(this.data.set(t,e),this.data.size>this.max&&this.shrink()),this):this}keys(){const t=new Array(this.data.size);let e=0;const r=this.data.keys();for(const n of r)t[e++]=n;return t}shrink(){const t=this.data.keys();let e=t.next();for(;this.data.size>this.max;){const r=this.getAndRemove(e.value);r&&this.onRemove(r),e=t.next();}}has(t){return this.data.has(t)}getAndRemove(t){if(!this.has(t))return null;const e=this.data.get(t);return this.data.delete(t),e}get(t){if(!this.has(t))return null;return this.data.get(t)}remove(t){if(!this.has(t))return this;const e=this.data.get(t);return this.data.delete(t),this.onRemove(e),this}setMaxSize(t){return this.max=t,this.data.size>this.max&&this.shrink(),this}}
     /** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function(){function t(t){throw t}var e=void 0,r=!0,n=this;function i(t,r){var i,a=t.split("."),s=n;!(a[0]in s)&&s.execScript&&s.execScript("var "+a[0]);for(;a.length&&(i=a.shift());)a.length||r===e?s=s[i]?s[i]:s[i]={}:s[i]=r;}var a="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array&&"undefined"!=typeof DataView;function s(e,r){this.index="number"==typeof r?r:0,this.i=0,this.buffer=e instanceof(a?Uint8Array:Array)?e:new(a?Uint8Array:Array)(32768),2*this.buffer.length<=this.index&&t(Error("invalid index")),this.buffer.length<=this.index&&this.f();}s.prototype.f=function(){var t,e=this.buffer,r=e.length,n=new(a?Uint8Array:Array)(r<<1);if(a)n.set(e);else for(t=0;t<r;++t)n[t]=e[t];return this.buffer=n},s.prototype.d=function(t,e,r){var n,i=this.buffer,a=this.index,s=this.i,o=i[a];if(r&&1<e&&(t=8<e?(u[255&t]<<24|u[t>>>8&255]<<16|u[t>>>16&255]<<8|u[t>>>24&255])>>32-e:u[t]>>8-e),8>e+s)o=o<<e|t,s+=e;else for(n=0;n<e;++n)o=o<<1|t>>e-n-1&1,8==++s&&(s=0,i[a++]=u[o],o=0,a===i.length&&(i=this.f()));i[a]=o,this.buffer=i,this.i=s,this.index=a;},s.prototype.finish=function(){var t,e=this.buffer,r=this.index;return 0<this.i&&(e[r]<<=8-this.i,e[r]=u[e[r]],r++),a?t=e.subarray(0,r):(e.length=r,t=e),t};var o,h=new(a?Uint8Array:Array)(256);for(o=0;256>o;++o){for(var l=c=o,f=7,c=c>>>1;c;c>>>=1)l<<=1,l|=1&c,--f;h[o]=(l<<f&255)>>>0;}var u=h;function g(t){this.buffer=new(a?Uint16Array:Array)(2*t),this.length=0;}function d(t){var e,r,n,i,s,o,h,l,f,c,u=t.length,g=0,d=Number.POSITIVE_INFINITY;for(l=0;l<u;++l)t[l]>g&&(g=t[l]),t[l]<d&&(d=t[l]);for(e=1<<g,r=new(a?Uint32Array:Array)(e),n=1,i=0,s=2;n<=g;){for(l=0;l<u;++l)if(t[l]===n){for(o=0,h=i,f=0;f<n;++f)o=o<<1|1&h,h>>=1;for(c=n<<16|l,f=o;f<e;f+=s)r[f]=c;++i;}++n,i<<=1,s<<=1;}return [r,g,d]}function p(t,e){this.h=y,this.w=0,this.input=a&&t instanceof Array?new Uint8Array(t):t,this.b=0,e&&(e.lazy&&(this.w=e.lazy),"number"==typeof e.compressionType&&(this.h=e.compressionType),e.outputBuffer&&(this.a=a&&e.outputBuffer instanceof Array?new Uint8Array(e.outputBuffer):e.outputBuffer),"number"==typeof e.outputIndex&&(this.b=e.outputIndex)),this.a||(this.a=new(a?Uint8Array:Array)(32768));}g.prototype.getParent=function(t){return 2*((t-2)/4|0)},g.prototype.push=function(t,e){var r,n,i,a=this.buffer;for(r=this.length,a[this.length++]=e,a[this.length++]=t;0<r&&(n=this.getParent(r),a[r]>a[n]);)i=a[r],a[r]=a[n],a[n]=i,i=a[r+1],a[r+1]=a[n+1],a[n+1]=i,r=n;return this.length},g.prototype.pop=function(){var t,e,r,n,i,a=this.buffer;for(e=a[0],t=a[1],this.length-=2,a[0]=a[this.length],a[1]=a[this.length+1],i=0;!((n=2*i+2)>=this.length)&&(n+2<this.length&&a[n+2]>a[n]&&(n+=2),a[n]>a[i]);)r=a[i],a[i]=a[n],a[n]=r,r=a[i+1],a[i+1]=a[n+1],a[n+1]=r,i=n;return {index:t,value:e,length:this.length}};var m,y=2,b={NONE:0,r:1,k:y,N:3},w=[];for(m=0;288>m;m++)switch(r){case 143>=m:w.push([m+48,8]);break;case 255>=m:w.push([m-144+400,9]);break;case 279>=m:w.push([m-256+0,7]);break;case 287>=m:w.push([m-280+192,8]);break;default:t("invalid literal: "+m);}function x(t,e){this.length=t,this.G=e;}p.prototype.j=function(){var n,i,o,h,l=this.input;switch(this.h){case 0:for(o=0,h=l.length;o<h;){var f,c,u,g=i=a?l.subarray(o,o+65535):l.slice(o,o+65535),d=(o+=i.length)===h,p=e,m=e,b=this.a,x=this.b;if(a){for(b=new Uint8Array(this.a.buffer);b.length<=x+g.length+5;)b=new Uint8Array(b.length<<1);b.set(this.a);}if(f=d?1:0,b[x++]=0|f,u=65536+~(c=g.length)&65535,b[x++]=255&c,b[x++]=c>>>8&255,b[x++]=255&u,b[x++]=u>>>8&255,a)b.set(g,x),x+=g.length,b=b.subarray(0,x);else {for(p=0,m=g.length;p<m;++p)b[x++]=g[p];b.length=x;}this.b=x,this.a=b;}break;case 1:var M=new s(a?new Uint8Array(this.a.buffer):this.a,this.b);M.d(1,1,r),M.d(1,2,r);var v,I,B,E=k(this,l);for(v=0,I=E.length;v<I;v++)if(B=E[v],s.prototype.d.apply(M,w[B]),256<B)M.d(E[++v],E[++v],r),M.d(E[++v],5),M.d(E[++v],E[++v],r);else if(256===B)break;this.a=M.finish(),this.b=this.a.length;break;case y:var P,T,D,S,z,V,C,O,F,N,G,L,_,Y,R,j=new s(a?new Uint8Array(this.a.buffer):this.a,this.b),W=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],Z=Array(19);for(P=y,j.d(1,1,r),j.d(P,2,r),T=k(this,l),C=U(V=A(this.L,15)),F=U(O=A(this.K,7)),D=286;257<D&&0===V[D-1];D--);for(S=30;1<S&&0===O[S-1];S--);var H,X,q,J,$,K,Q=D,tt=S,et=new(a?Uint32Array:Array)(Q+tt),rt=new(a?Uint32Array:Array)(316),nt=new(a?Uint8Array:Array)(19);for(H=X=0;H<Q;H++)et[X++]=V[H];for(H=0;H<tt;H++)et[X++]=O[H];if(!a)for(H=0,J=nt.length;H<J;++H)nt[H]=0;for(H=$=0,J=et.length;H<J;H+=X){for(X=1;H+X<J&&et[H+X]===et[H];++X);if(q=X,0===et[H])if(3>q)for(;0<q--;)rt[$++]=0,nt[0]++;else for(;0<q;)(K=138>q?q:138)>q-3&&K<q&&(K=q-3),10>=K?(rt[$++]=17,rt[$++]=K-3,nt[17]++):(rt[$++]=18,rt[$++]=K-11,nt[18]++),q-=K;else if(rt[$++]=et[H],nt[et[H]]++,3>--q)for(;0<q--;)rt[$++]=et[H],nt[et[H]]++;else for(;0<q;)(K=6>q?q:6)>q-3&&K<q&&(K=q-3),rt[$++]=16,rt[$++]=K-3,nt[16]++,q-=K;}for(n=a?rt.subarray(0,$):rt.slice(0,$),N=A(nt,7),Y=0;19>Y;Y++)Z[Y]=N[W[Y]];for(z=19;4<z&&0===Z[z-1];z--);for(G=U(N),j.d(D-257,5,r),j.d(S-1,5,r),j.d(z-4,4,r),Y=0;Y<z;Y++)j.d(Z[Y],3,r);for(Y=0,R=n.length;Y<R;Y++)if(L=n[Y],j.d(G[L],N[L],r),16<=L){switch(Y++,L){case 16:_=2;break;case 17:_=3;break;case 18:_=7;break;default:t("invalid code: "+L);}j.d(n[Y],_,r);}var it,at,st,ot,ht,lt,ft,ct,ut=[C,V],gt=[F,O];for(ht=ut[0],lt=ut[1],ft=gt[0],ct=gt[1],it=0,at=T.length;it<at;++it)if(st=T[it],j.d(ht[st],lt[st],r),256<st)j.d(T[++it],T[++it],r),ot=T[++it],j.d(ft[ot],ct[ot],r),j.d(T[++it],T[++it],r);else if(256===st)break;this.a=j.finish(),this.b=this.a.length;break;default:t("invalid compression type");}return this.a};var M=function(){function e(e){switch(r){case 3===e:return [257,e-3,0];case 4===e:return [258,e-4,0];case 5===e:return [259,e-5,0];case 6===e:return [260,e-6,0];case 7===e:return [261,e-7,0];case 8===e:return [262,e-8,0];case 9===e:return [263,e-9,0];case 10===e:return [264,e-10,0];case 12>=e:return [265,e-11,1];case 14>=e:return [266,e-13,1];case 16>=e:return [267,e-15,1];case 18>=e:return [268,e-17,1];case 22>=e:return [269,e-19,2];case 26>=e:return [270,e-23,2];case 30>=e:return [271,e-27,2];case 34>=e:return [272,e-31,2];case 42>=e:return [273,e-35,3];case 50>=e:return [274,e-43,3];case 58>=e:return [275,e-51,3];case 66>=e:return [276,e-59,3];case 82>=e:return [277,e-67,4];case 98>=e:return [278,e-83,4];case 114>=e:return [279,e-99,4];case 130>=e:return [280,e-115,4];case 162>=e:return [281,e-131,5];case 194>=e:return [282,e-163,5];case 226>=e:return [283,e-195,5];case 257>=e:return [284,e-227,5];case 258===e:return [285,e-258,0];default:t("invalid length: "+e);}}var n,i,a=[];for(n=3;258>=n;n++)i=e(n),a[n]=i[2]<<24|i[1]<<16|i[0];return a}(),v=a?new Uint32Array(M):M;function k(n,i){function s(e,n){var i,a,s,o,h=e.G,l=[],f=0;switch(i=v[e.length],l[f++]=65535&i,l[f++]=i>>16&255,l[f++]=i>>24,r){case 1===h:a=[0,h-1,0];break;case 2===h:a=[1,h-2,0];break;case 3===h:a=[2,h-3,0];break;case 4===h:a=[3,h-4,0];break;case 6>=h:a=[4,h-5,1];break;case 8>=h:a=[5,h-7,1];break;case 12>=h:a=[6,h-9,2];break;case 16>=h:a=[7,h-13,2];break;case 24>=h:a=[8,h-17,3];break;case 32>=h:a=[9,h-25,3];break;case 48>=h:a=[10,h-33,4];break;case 64>=h:a=[11,h-49,4];break;case 96>=h:a=[12,h-65,5];break;case 128>=h:a=[13,h-97,5];break;case 192>=h:a=[14,h-129,6];break;case 256>=h:a=[15,h-193,6];break;case 384>=h:a=[16,h-257,7];break;case 512>=h:a=[17,h-385,7];break;case 768>=h:a=[18,h-513,8];break;case 1024>=h:a=[19,h-769,8];break;case 1536>=h:a=[20,h-1025,9];break;case 2048>=h:a=[21,h-1537,9];break;case 3072>=h:a=[22,h-2049,10];break;case 4096>=h:a=[23,h-3073,10];break;case 6144>=h:a=[24,h-4097,11];break;case 8192>=h:a=[25,h-6145,11];break;case 12288>=h:a=[26,h-8193,12];break;case 16384>=h:a=[27,h-12289,12];break;case 24576>=h:a=[28,h-16385,13];break;case 32768>=h:a=[29,h-24577,13];break;default:t("invalid distance");}for(i=a,l[f++]=i[0],l[f++]=i[1],l[f++]=i[2],s=0,o=l.length;s<o;++s)y[b++]=l[s];x[l[0]]++,M[l[3]]++,w=e.length+n-1,d=null;}var o,h,l,f,c,u,g,d,p,m={},y=a?new Uint16Array(2*i.length):[],b=0,w=0,x=new(a?Uint32Array:Array)(286),M=new(a?Uint32Array:Array)(30),k=n.w;if(!a){for(l=0;285>=l;)x[l++]=0;for(l=0;29>=l;)M[l++]=0;}for(x[256]=1,o=0,h=i.length;o<h;++o){for(l=c=0,f=3;l<f&&o+l!==h;++l)c=c<<8|i[o+l];if(m[c]===e&&(m[c]=[]),u=m[c],!(0<w--)){for(;0<u.length&&32768<o-u[0];)u.shift();if(o+3>=h){for(d&&s(d,-1),l=0,f=h-o;l<f;++l)p=i[o+l],y[b++]=p,++x[p];break}0<u.length?(g=I(i,o,u),d?d.length<g.length?(p=i[o-1],y[b++]=p,++x[p],s(g,0)):s(d,-1):g.length<k?d=g:s(g,0)):d?s(d,-1):(p=i[o],y[b++]=p,++x[p]);}u.push(o);}return y[b++]=256,x[256]++,n.L=x,n.K=M,a?y.subarray(0,b):y}function I(t,e,r){var n,i,a,s,o,h,l=0,f=t.length;s=0,h=r.length;t:for(;s<h;s++){if(n=r[h-s-1],a=3,3<l){for(o=l;3<o;o--)if(t[n+o-1]!==t[e+o-1])continue t;a=l;}for(;258>a&&e+a<f&&t[n+a]===t[e+a];)++a;if(a>l&&(i=n,l=a),258===a)break}return new x(l,e-i)}function A(t,e){var r,n,i,s,o,h=t.length,l=new g(572),f=new(a?Uint8Array:Array)(h);if(!a)for(s=0;s<h;s++)f[s]=0;for(s=0;s<h;++s)0<t[s]&&l.push(s,t[s]);if(r=Array(l.length/2),n=new(a?Uint32Array:Array)(l.length/2),1===r.length)return f[l.pop().index]=1,f;for(s=0,o=l.length/2;s<o;++s)r[s]=l.pop(),n[s]=r[s].value;for(i=function(t,e,r){function n(t){var r=d[t][p[t]];r===e?(n(t+1),n(t+1)):--u[r],++p[t];}var i,s,o,h,l,f=new(a?Uint16Array:Array)(r),c=new(a?Uint8Array:Array)(r),u=new(a?Uint8Array:Array)(e),g=Array(r),d=Array(r),p=Array(r),m=(1<<r)-e,y=1<<r-1;for(f[r-1]=e,s=0;s<r;++s)m<y?c[s]=0:(c[s]=1,m-=y),m<<=1,f[r-2-s]=(f[r-1-s]/2|0)+e;for(f[0]=c[0],g[0]=Array(f[0]),d[0]=Array(f[0]),s=1;s<r;++s)f[s]>2*f[s-1]+c[s]&&(f[s]=2*f[s-1]+c[s]),g[s]=Array(f[s]),d[s]=Array(f[s]);for(i=0;i<e;++i)u[i]=r;for(o=0;o<f[r-1];++o)g[r-1][o]=t[o],d[r-1][o]=o;for(i=0;i<r;++i)p[i]=0;for(1===c[r-1]&&(--u[0],++p[r-1]),s=r-2;0<=s;--s){for(h=i=0,l=p[s+1],o=0;o<f[s];o++)(h=g[s+1][l]+g[s+1][l+1])>t[i]?(g[s][o]=h,d[s][o]=e,l+=2):(g[s][o]=t[i],d[s][o]=i,++i);p[s]=0,1===c[s]&&n(s);}return u}(n,n.length,e),s=0,o=r.length;s<o;++s)f[r[s].index]=i[s];return f}function U(t){var e,r,n,i,s=new(a?Uint16Array:Array)(t.length),o=[],h=[],l=0;for(e=0,r=t.length;e<r;e++)o[t[e]]=1+(0|o[t[e]]);for(e=1,r=16;e<=r;e++)h[e]=l,l+=0|o[e],l<<=1;for(e=0,r=t.length;e<r;e++)for(l=h[t[e]],h[t[e]]+=1,n=s[e]=0,i=t[e];n<i;n++)s[e]=s[e]<<1|1&l,l>>>=1;return s}function B(e,r){switch(this.l=[],this.m=32768,this.e=this.g=this.c=this.q=0,this.input=a?new Uint8Array(e):e,this.s=!1,this.n=P,this.B=!1,!r&&(r={})||(r.index&&(this.c=r.index),r.bufferSize&&(this.m=r.bufferSize),r.bufferType&&(this.n=r.bufferType),r.resize&&(this.B=r.resize)),this.n){case E:this.b=32768,this.a=new(a?Uint8Array:Array)(32768+this.m+258);break;case P:this.b=0,this.a=new(a?Uint8Array:Array)(this.m),this.f=this.J,this.t=this.H,this.o=this.I;break;default:t(Error("invalid inflate mode"));}}var E=0,P=1,T={D:E,C:P};B.prototype.p=function(){for(;!this.s;){var n=q(this,3);switch(1&n&&(this.s=r),n>>>=1){case 0:var i=this.input,s=this.c,o=this.a,h=this.b,l=i.length,f=e,c=o.length,u=e;switch(this.e=this.g=0,s+1>=l&&t(Error("invalid uncompressed block header: LEN")),f=i[s++]|i[s++]<<8,s+1>=l&&t(Error("invalid uncompressed block header: NLEN")),f===~(i[s++]|i[s++]<<8)&&t(Error("invalid uncompressed block header: length verify")),s+f>i.length&&t(Error("input buffer is broken")),this.n){case E:for(;h+f>o.length;){if(f-=u=c-h,a)o.set(i.subarray(s,s+u),h),h+=u,s+=u;else for(;u--;)o[h++]=i[s++];this.b=h,o=this.f(),h=this.b;}break;case P:for(;h+f>o.length;)o=this.f({v:2});break;default:t(Error("invalid inflate mode"));}if(a)o.set(i.subarray(s,s+f),h),h+=f,s+=f;else for(;f--;)o[h++]=i[s++];this.c=s,this.b=h,this.a=o;break;case 1:this.o(Z,X);break;case 2:var g,p,m,y,b=q(this,5)+257,w=q(this,5)+1,x=q(this,4)+4,M=new(a?Uint8Array:Array)(V.length),v=e,k=e,I=e,A=e,U=e;for(U=0;U<x;++U)M[V[U]]=q(this,3);if(!a)for(U=x,x=M.length;U<x;++U)M[V[U]]=0;for(g=d(M),v=new(a?Uint8Array:Array)(b+w),U=0,y=b+w;U<y;)switch(k=J(this,g),k){case 16:for(A=3+q(this,2);A--;)v[U++]=I;break;case 17:for(A=3+q(this,3);A--;)v[U++]=0;I=0;break;case 18:for(A=11+q(this,7);A--;)v[U++]=0;I=0;break;default:I=v[U++]=k;}p=d(a?v.subarray(0,b):v.slice(0,b)),m=d(a?v.subarray(b):v.slice(b)),this.o(p,m);break;default:t(Error("unknown BTYPE: "+n));}}return this.t()};var D,S,z=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],V=a?new Uint16Array(z):z,C=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],O=a?new Uint16Array(C):C,F=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],N=a?new Uint8Array(F):F,G=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],L=a?new Uint16Array(G):G,_=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],Y=a?new Uint8Array(_):_,R=new(a?Uint8Array:Array)(288);for(D=0,S=R.length;D<S;++D)R[D]=143>=D?8:255>=D?9:279>=D?7:8;var j,W,Z=d(R),H=new(a?Uint8Array:Array)(30);for(j=0,W=H.length;j<W;++j)H[j]=5;var X=d(H);function q(e,r){for(var n,i=e.g,a=e.e,s=e.input,o=e.c,h=s.length;a<r;)o>=h&&t(Error("input buffer is broken")),i|=s[o++]<<a,a+=8;return n=i&(1<<r)-1,e.g=i>>>r,e.e=a-r,e.c=o,n}function J(e,r){for(var n,i,a=e.g,s=e.e,o=e.input,h=e.c,l=o.length,f=r[0],c=r[1];s<c&&!(h>=l);)a|=o[h++]<<s,s+=8;return (i=(n=f[a&(1<<c)-1])>>>16)>s&&t(Error("invalid code length: "+i)),e.g=a>>i,e.e=s-i,e.c=h,65535&n}function $(t){if("string"==typeof t){var e,r,n=t.split("");for(e=0,r=n.length;e<r;e++)n[e]=(255&n[e].charCodeAt(0))>>>0;t=n;}for(var i,a=1,s=0,o=t.length,h=0;0<o;){o-=i=1024<o?1024:o;do{s+=a+=t[h++];}while(--i);a%=65521,s%=65521;}return (s<<16|a)>>>0}function K(e,r){var n,i;if(this.input=e,this.c=0,!r&&(r={})||(r.index&&(this.c=r.index),r.verify&&(this.M=r.verify)),n=e[this.c++],i=e[this.c++],(15&n)===Q)this.method=Q;else t(Error("unsupported compression method"));0!=((n<<8)+i)%31&&t(Error("invalid fcheck flag:"+((n<<8)+i)%31)),32&i&&t(Error("fdict flag is not supported")),this.A=new B(e,{index:this.c,bufferSize:r.bufferSize,bufferType:r.bufferType,resize:r.resize});}B.prototype.o=function(t,e){var r=this.a,n=this.b;this.u=t;for(var i,a,s,o,h=r.length-258;256!==(i=J(this,t));)if(256>i)n>=h&&(this.b=n,r=this.f(),n=this.b),r[n++]=i;else for(o=O[a=i-257],0<N[a]&&(o+=q(this,N[a])),i=J(this,e),s=L[i],0<Y[i]&&(s+=q(this,Y[i])),n>=h&&(this.b=n,r=this.f(),n=this.b);o--;)r[n]=r[n++-s];for(;8<=this.e;)this.e-=8,this.c--;this.b=n;},B.prototype.I=function(t,e){var r=this.a,n=this.b;this.u=t;for(var i,a,s,o,h=r.length;256!==(i=J(this,t));)if(256>i)n>=h&&(h=(r=this.f()).length),r[n++]=i;else for(o=O[a=i-257],0<N[a]&&(o+=q(this,N[a])),i=J(this,e),s=L[i],0<Y[i]&&(s+=q(this,Y[i])),n+o>h&&(h=(r=this.f()).length);o--;)r[n]=r[n++-s];for(;8<=this.e;)this.e-=8,this.c--;this.b=n;},B.prototype.f=function(){var t,e,r=new(a?Uint8Array:Array)(this.b-32768),n=this.b-32768,i=this.a;if(a)r.set(i.subarray(32768,r.length));else for(t=0,e=r.length;t<e;++t)r[t]=i[t+32768];if(this.l.push(r),this.q+=r.length,a)i.set(i.subarray(n,n+32768));else for(t=0;32768>t;++t)i[t]=i[n+t];return this.b=32768,i},B.prototype.J=function(t){var e,r,n,i=this.input.length/this.c+1|0,s=this.input,o=this.a;return t&&("number"==typeof t.v&&(i=t.v),"number"==typeof t.F&&(i+=t.F)),2>i?r=(n=(s.length-this.c)/this.u[2]/2*258|0)<o.length?o.length+n:o.length<<1:r=o.length*i,a?(e=new Uint8Array(r)).set(o):e=o,this.a=e},B.prototype.t=function(){var t,e,r,n,i,s=0,o=this.a,h=this.l,l=new(a?Uint8Array:Array)(this.q+(this.b-32768));if(0===h.length)return a?this.a.subarray(32768,this.b):this.a.slice(32768,this.b);for(e=0,r=h.length;e<r;++e)for(n=0,i=(t=h[e]).length;n<i;++n)l[s++]=t[n];for(e=32768,r=this.b;e<r;++e)l[s++]=o[e];return this.l=[],this.buffer=l},B.prototype.H=function(){var t,e=this.b;return a?this.B?(t=new Uint8Array(e)).set(this.a.subarray(0,e)):t=this.a.subarray(0,e):(this.a.length>e&&(this.a.length=e),t=this.a),this.buffer=t},K.prototype.p=function(){var e,r=this.input;return e=this.A.p(),this.c=this.A.c,this.M&&((r[this.c++]<<24|r[this.c++]<<16|r[this.c++]<<8|r[this.c++])>>>0!==$(e)&&t(Error("invalid adler-32 checksum"))),e};var Q=8;function tt(t,e){this.input=t,this.a=new(a?Uint8Array:Array)(32768),this.h=et.k;var r,n={};for(r in !e&&(e={})||"number"!=typeof e.compressionType||(this.h=e.compressionType),e)n[r]=e[r];n.outputBuffer=this.a,this.z=new p(this.input,n);}var et=b;function rt(t,e){var r,n,a,s;if(Object.keys)r=Object.keys(e);else for(n in r=[],a=0,e)r[a++]=n;for(a=0,s=r.length;a<s;++a)i(t+"."+(n=r[a]),e[n]);}tt.prototype.j=function(){var e,r,n,i,s,o,h,l=0;if(h=this.a,(e=Q)===Q)r=Math.LOG2E*Math.log(32768)-8;else t(Error("invalid compression method"));if(n=r<<4|e,h[l++]=n,e===Q)switch(this.h){case et.NONE:s=0;break;case et.r:s=1;break;case et.k:s=2;break;default:t(Error("unsupported compression type"));}else t(Error("invalid compression method"));return i=s<<6,h[l++]=i|31-(256*n+i)%31,o=$(this.input),this.z.b=l,l=(h=this.z.j()).length,a&&((h=new Uint8Array(h.buffer)).length<=l+4&&(this.a=new Uint8Array(h.length+4),this.a.set(h),h=this.a),h=h.subarray(0,l+4)),h[l++]=o>>24&255,h[l++]=o>>16&255,h[l++]=o>>8&255,h[l++]=255&o,h},i("Zlib.Inflate",K),i("Zlib.Inflate.prototype.decompress",K.prototype.p),rt("Zlib.Inflate.BufferType",{ADAPTIVE:T.C,BLOCK:T.D}),i("Zlib.Deflate",tt),i("Zlib.Deflate.compress",(function(t,e){return new tt(t,e).j()})),i("Zlib.Deflate.prototype.compress",tt.prototype.j),rt("Zlib.Deflate.CompressionType",{NONE:et.NONE,FIXED:et.r,DYNAMIC:et.k});}).call(self);var G="undefined"!=typeof Float32Array?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var L,_=function(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t[2]=e[2]-r[2],t};function Y(t,e,r){return t[0]=e,t[1]=r,t}L=new G(3),G!=Float32Array&&(L[0]=0,L[1]=0,L[2]=0),function(){(function(){var t=new G(2);return G!=Float32Array&&(t[0]=0,t[1]=0),t})();}();const R=[],j=[],W=[],Z=[],H=[],X=[],q=32767,J=64,$=64,K=3,Q=-1e3,tt=.001,et=256,rt=4,nt=.002;function it(t,e,r){return (1-r)*t+r*e}const at=new TextDecoder("utf-8");function st(t){return t>>1^-(1&t)}function ot(t,e,r){const n=function(t){if(t.length<1e3)return null;const e=new self.Zlib.Inflate(t);return e?e.decompress():null}(new Uint8Array(t));if(!n)throw new Error((i=new Uint8Array(t),at.decode(i)));var i;const a=function(t){const e=t,r=J,n=$,i=new Uint8Array(r*n*rt);let a,s,o,h,l;for(let t=0;t<n;t++)for(let f=0;f<r;f++){h=parseInt(149*t/(n-1)),l=parseInt(149*f/(r-1)),s=2*(150*h+l),a=e[s]+256*e[s+1],(a>1e4||a<-2e3)&&(a=0),o=4*(t*r+f);const c=(a+1e3)/tt,u=et;i[o]=c/(u*u),i[o+1]=(c-i[o]*u*u)/u,i[o+2]=c-i[o]*u*u-i[o+1]*u,i[o+3]=255;}return i}(n),s=function(t,e){const r=e,n=e,i=r+1,a=n+1,s=K,o=Q,h=tt,l=et,f=nt,c=new Float32Array(i*a);let u=0,g=1/0,d=-1/0;for(let e=0;e<i;e++){const i=e>=n?n-1:e;for(let e=0;e<a;e++){let n=0;const a=i*(4*r)+4*(e>=r?r-1:e);for(let e=0;e<s;e++)n=n*l+t[a+e];n=1*(n*h+o),n-=f,c[u]=n,n<g&&(g=n),n>d&&(d=n),u++;}}return {data:c,min:g,max:d,width:0,height:0,tileSize:0,image:null}}(a,e-1);return s.width=s.height=e,s.tileSize=r,dt(s),s}class ht{constructor(t,e,r,n,i){this.p0=[],this.p1=[],this.p2=[],this.normal=[],this.min=[],this.max=[],this.set(t,e,r,n,i);}set(t,e,r,n,i){this.radius=i;let a=3*e,s=3*e+1,o=3*e+2;this.p0[0]=t[a]*i,this.p0[1]=t[s]*i,this.p0[2]=t[o],a=3*r,s=3*r+1,o=3*r+2,this.p1[0]=t[a]*i,this.p1[1]=t[s]*i,this.p1[2]=t[o],a=3*n,s=3*n+1,o=3*n+2,this.p2[0]=t[a]*i,this.p2[1]=t[s]*i,this.p2[2]=t[o],this.min[0]=Math.min(this.p0[0],this.p1[0],this.p2[0]),this.min[1]=Math.min(this.p0[1],this.p1[1],this.p2[1]),this.max[0]=Math.max(this.p0[0],this.p1[0],this.p2[0]),this.max[1]=Math.max(this.p0[1],this.p1[1],this.p2[1]);const h=_(R,this.p1,this.p0),l=_(j,this.p2,this.p1);this.normal=function(t,e){var r=e[0],n=e[1],i=e[2],a=r*r+n*n+i*i;return a>0&&(a=1/Math.sqrt(a)),t[0]=e[0]*a,t[1]=e[1]*a,t[2]=e[2]*a,t}(this.normal,function(t,e,r){var n=e[0],i=e[1],a=e[2],s=r[0],o=r[1],h=r[2];return t[0]=i*h-a*o,t[1]=a*s-n*h,t[2]=n*o-i*s,t}(this.normal,h,l));}contains(t,e){if(t<this.min[0]||t>this.max[0]||e<this.min[1]||e>this.max[1])return !1;Y(W,this.p0[0],this.p0[1]),Y(Z,this.p1[0],this.p1[1]),Y(H,this.p2[0],this.p2[1]);const r=lt(W[0],W[1],Z[0],Z[1],H[0],H[1]);return lt(t,e,W[0],W[1],H[0],H[1])+lt(t,e,W[0],W[1],Z[0],Z[1])+lt(t,e,Z[0],Z[1],H[0],H[1])-r<=1e-4}getHeight(t,e){const r=this.normal;return this.p0[2]-((t-this.p0[0])*r[0]+(e-this.p0[1])*r[1])/r[2]}}function lt(t,e,r,n,i,a){return .5*Math.abs(t*n+r*a+i*e-t*a-r*e-i*n)}let ft=null;function ct(t,e,r){if(ft&&ft.contains(e,r))return ft.getHeight(e,r);for(let n=0;n<t.length;n++)if(t[n].contains(e,r))return ft=t[n],t[n].getHeight(e,r);return 0}const ut=[];function gt(t,e,r){const n=function(t){let e=0;const r=3,n=Float64Array.BYTES_PER_ELEMENT*r,i=3,a=Uint16Array.BYTES_PER_ELEMENT*i,s=3;let o=Uint16Array.BYTES_PER_ELEMENT;const h=new DataView(t);e+=n;const l=h.getFloat32(e,!0);e+=Float32Array.BYTES_PER_ELEMENT;const f=h.getFloat32(e,!0);e+=Float32Array.BYTES_PER_ELEMENT,e+=n;const c=h.getFloat64(e,!0);e+=Float64Array.BYTES_PER_ELEMENT,e+=n;const u=h.getUint32(e,!0);e+=Uint32Array.BYTES_PER_ELEMENT;const g=new Uint16Array(t,e,3*u);e+=u*a,u>65536&&(o=Uint32Array.BYTES_PER_ELEMENT);const d=g.subarray(0,u),p=g.subarray(u,2*u),m=g.subarray(2*u,3*u);((function(t,e,r){const n=t.length;let i=0,a=0,s=0;for(let o=0;o<n;++o)i+=st(t[o]),a+=st(e[o]),t[o]=i,e[o]=a,r&&(s+=st(r[o]),r[o]=s);}))(d,p,m),e%o!=0&&(e+=o-e%o);const y=h.getUint32(e,!0);e+=Uint32Array.BYTES_PER_ELEMENT;const b=u>65536?new Uint32Array(t,e,y*s):new Uint16Array(t,e,y*s);let w=0;const x=b.length;for(let t=0;t<x;++t){const e=b[t];b[t]=w-e,0===e&&++w;}const M={minimumHeight:l,maximumHeight:f,quantizedVertices:g,indices:b},v=M.quantizedVertices,k=v.length/3,I=v.subarray(0,k),A=v.subarray(k,2*k),U=v.subarray(2*k,3*k),B=X;for(let t=0;t<k;++t){const e=I[t],r=A[t],n=e/q,i=r/q,a=it(l,f,U[t]/q);B[3*t]=n,B[3*t+1]=1-i,B[3*t+2]=a;}return {positions:B,radius:c,min:l,max:f,indices:b}}(t),{positions:i,min:a,max:s,indices:o,radius:h}=n,l=[];let f=0;for(let t=0;t<o.length;t+=3){let e=ut[f];e?e.set(i,o[t],o[t+1],o[t+2],2*h):e=ut[f]=new ht(i,o[t],o[t+1],o[t+2],2*h),f++,l.push(e);}const c=new Float32Array(e*e);f=0;for(let t=0;t<e;t++)for(let r=0;r<e;r++)c[f++]=ct(l,r/e*h*2,t/e*h*2);const u={data:c,min:a,max:s,width:e,height:e,tileSize:r};return dt(u),u}function dt(t){const e=P(),{width:r,height:n,data:i,tileSize:a}=t;if(r&&n&&i)try{T(e,r,n);let s=D(e);const o=s.createImageData(r,n),h=[0,0,0];for(let t=0,e=i.length;t<e;t++){const e=i[t],[r,n,a]=m(e,h),s=4*t;o.data[s]=r,o.data[s+1]=n,o.data[s+2]=a,o.data[s+3]=255;}s.putImageData(o,0,0);const l=e.transferToImageBitmap();T(e,a,a),s=D(e),s.drawImage(l,0,0,r,n,0,0,a,a),t.image=e.transferToImageBitmap();}catch(t){console.log(t);}}var pt,mt={exports:{}};let yt;pt=mt,
     /* Copyright 2015 Esri. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 @preserve */
     function(){var t,e,r,n,i,a,s,o,h,l,f,c,u,g,d=(t={defaultNoDataValue:-34027999387901484e22,decode:function(a,s){var o=(s=s||{}).encodedMaskData||null===s.encodedMaskData,h=i(a,s.inputOffset||0,o),l=null!==s.noDataValue?s.noDataValue:t.defaultNoDataValue,f=e(h,s.pixelType||Float32Array,s.encodedMaskData,l,s.returnMask),c={width:h.width,height:h.height,pixelData:f.resultPixels,minValue:f.minValue,maxValue:h.pixels.maxValue,noDataValue:l};return f.resultMask&&(c.maskData=f.resultMask),s.returnEncodedMask&&h.mask&&(c.encodedMaskData=h.mask.bitset?h.mask.bitset:null),s.returnFileInfo&&(c.fileInfo=r(h),s.computeUsedBitDepths&&(c.fileInfo.bitDepths=n(h))),c}},e=function(t,e,r,n,i){var s,o,h,l=0,f=t.pixels.numBlocksX,c=t.pixels.numBlocksY,u=Math.floor(t.width/f),g=Math.floor(t.height/c),d=2*t.maxZError,p=Number.MAX_VALUE;r=r||(t.mask?t.mask.bitset:null),o=new e(t.width*t.height),i&&r&&(h=new Uint8Array(t.width*t.height));for(var m,y,b=new Float32Array(u*g),w=0;w<=c;w++){var x=w!==c?g:t.height%c;if(0!==x)for(var M=0;M<=f;M++){var v=M!==f?u:t.width%f;if(0!==v){var k,I,A,U,B=w*t.width*g+M*u,E=t.width-v,P=t.pixels.blocks[l];if(P.encoding<2?(0===P.encoding?k=P.rawData:(a(P.stuffedData,P.bitsPerPixel,P.numValidPixels,P.offset,d,b,t.pixels.maxValue),k=b),I=0):A=2===P.encoding?0:P.offset,r)for(y=0;y<x;y++){for(7&B&&(U=r[B>>3],U<<=7&B),m=0;m<v;m++)7&B||(U=r[B>>3]),128&U?(h&&(h[B]=1),p=p>(s=P.encoding<2?k[I++]:A)?s:p,o[B++]=s):(h&&(h[B]=0),o[B++]=n),U<<=1;B+=E;}else if(P.encoding<2)for(y=0;y<x;y++){for(m=0;m<v;m++)p=p>(s=k[I++])?s:p,o[B++]=s;B+=E;}else for(p=p>A?A:p,y=0;y<x;y++){for(m=0;m<v;m++)o[B++]=A;B+=E;}if(1===P.encoding&&I!==P.numValidPixels)throw "Block and Mask do not match";l++;}}}return {resultPixels:o,resultMask:h,minValue:p}},r=function(t){return {fileIdentifierString:t.fileIdentifierString,fileVersion:t.fileVersion,imageType:t.imageType,height:t.height,width:t.width,maxZError:t.maxZError,eofOffset:t.eofOffset,mask:t.mask?{numBlocksX:t.mask.numBlocksX,numBlocksY:t.mask.numBlocksY,numBytes:t.mask.numBytes,maxValue:t.mask.maxValue}:null,pixels:{numBlocksX:t.pixels.numBlocksX,numBlocksY:t.pixels.numBlocksY,numBytes:t.pixels.numBytes,maxValue:t.pixels.maxValue,noDataValue:t.noDataValue}}},n=function(t){for(var e=t.pixels.numBlocksX*t.pixels.numBlocksY,r={},n=0;n<e;n++){var i=t.pixels.blocks[n];0===i.encoding?r.float32=!0:1===i.encoding?r[i.bitsPerPixel]=!0:r[0]=!0;}return Object.keys(r)},i=function(t,e,r){var n={},i=new Uint8Array(t,e,10);if(n.fileIdentifierString=String.fromCharCode.apply(null,i),"CntZImage"!==n.fileIdentifierString.trim())throw "Unexpected file identifier string: "+n.fileIdentifierString;e+=10;var a=new DataView(t,e,24);if(n.fileVersion=a.getInt32(0,!0),n.imageType=a.getInt32(4,!0),n.height=a.getUint32(8,!0),n.width=a.getUint32(12,!0),n.maxZError=a.getFloat64(16,!0),e+=24,!r)if(a=new DataView(t,e,16),n.mask={},n.mask.numBlocksY=a.getUint32(0,!0),n.mask.numBlocksX=a.getUint32(4,!0),n.mask.numBytes=a.getUint32(8,!0),n.mask.maxValue=a.getFloat32(12,!0),e+=16,n.mask.numBytes>0){var s=new Uint8Array(Math.ceil(n.width*n.height/8)),o=(a=new DataView(t,e,n.mask.numBytes)).getInt16(0,!0),h=2,l=0;do{if(o>0)for(;o--;)s[l++]=a.getUint8(h++);else {var f=a.getUint8(h++);for(o=-o;o--;)s[l++]=f;}o=a.getInt16(h,!0),h+=2;}while(h<n.mask.numBytes);if(-32768!==o||l<s.length)throw "Unexpected end of mask RLE encoding";n.mask.bitset=s,e+=n.mask.numBytes;}else n.mask.numBytes|n.mask.numBlocksY|n.mask.maxValue||(n.mask.bitset=new Uint8Array(Math.ceil(n.width*n.height/8)));a=new DataView(t,e,16),n.pixels={},n.pixels.numBlocksY=a.getUint32(0,!0),n.pixels.numBlocksX=a.getUint32(4,!0),n.pixels.numBytes=a.getUint32(8,!0),n.pixels.maxValue=a.getFloat32(12,!0),e+=16;var c=n.pixels.numBlocksX,u=n.pixels.numBlocksY,g=c+(n.width%c>0?1:0),d=u+(n.height%u>0?1:0);n.pixels.blocks=new Array(g*d);for(var p=0,m=0;m<d;m++)for(var y=0;y<g;y++){var b=0,w=t.byteLength-e;a=new DataView(t,e,Math.min(10,w));var x={};n.pixels.blocks[p++]=x;var M=a.getUint8(0);if(b++,x.encoding=63&M,x.encoding>3)throw "Invalid block encoding ("+x.encoding+")";if(2!==x.encoding){if(0!==M&&2!==M){if(M>>=6,x.offsetType=M,2===M)x.offset=a.getInt8(1),b++;else if(1===M)x.offset=a.getInt16(1,!0),b+=2;else {if(0!==M)throw "Invalid block offset type";x.offset=a.getFloat32(1,!0),b+=4;}if(1===x.encoding)if(M=a.getUint8(b),b++,x.bitsPerPixel=63&M,M>>=6,x.numValidPixelsType=M,2===M)x.numValidPixels=a.getUint8(b),b++;else if(1===M)x.numValidPixels=a.getUint16(b,!0),b+=2;else {if(0!==M)throw "Invalid valid pixel count type";x.numValidPixels=a.getUint32(b,!0),b+=4;}}var v;if(e+=b,3!==x.encoding)if(0===x.encoding){var k=(n.pixels.numBytes-1)/4;if(k!==Math.floor(k))throw "uncompressed block has invalid length";v=new ArrayBuffer(4*k),new Uint8Array(v).set(new Uint8Array(t,e,4*k));var I=new Float32Array(v);x.rawData=I,e+=4*k;}else if(1===x.encoding){var A=Math.ceil(x.numValidPixels*x.bitsPerPixel/8),U=Math.ceil(A/4);v=new ArrayBuffer(4*U),new Uint8Array(v).set(new Uint8Array(t,e,A)),x.stuffedData=new Uint32Array(v),e+=A;}}else e++;}return n.eofOffset=e,n},a=function(t,e,r,n,i,a,s){var o,h,l,f=(1<<e)-1,c=0,u=0,g=Math.ceil((s-n)/i),d=4*t.length-Math.ceil(e*r/8);for(t[t.length-1]<<=8*d,o=0;o<r;o++){if(0===u&&(l=t[c++],u=32),u>=e)h=l>>>u-e&f,u-=e;else {var p=e-u;h=(l&f)<<p&f,h+=(l=t[c++])>>>(u=32-p);}a[o]=h<g?n+h*i:s;}return a},t),p=(s=function(t,e,r,n,i,a,s,o){var h,l,f,c,u,g=(1<<r)-1,d=0,p=0,m=4*t.length-Math.ceil(r*n/8);if(t[t.length-1]<<=8*m,i)for(h=0;h<n;h++)0===p&&(f=t[d++],p=32),p>=r?(l=f>>>p-r&g,p-=r):(l=(f&g)<<(c=r-p)&g,l+=(f=t[d++])>>>(p=32-c)),e[h]=i[l];else for(u=Math.ceil((o-a)/s),h=0;h<n;h++)0===p&&(f=t[d++],p=32),p>=r?(l=f>>>p-r&g,p-=r):(l=(f&g)<<(c=r-p)&g,l+=(f=t[d++])>>>(p=32-c)),e[h]=l<u?a+l*s:o;},o=function(t,e,r,n,i,a){var s,o=(1<<e)-1,h=0,l=0,f=0,c=0,u=0,g=[],d=4*t.length-Math.ceil(e*r/8);t[t.length-1]<<=8*d;var p=Math.ceil((a-n)/i);for(l=0;l<r;l++)0===c&&(s=t[h++],c=32),c>=e?(u=s>>>c-e&o,c-=e):(u=(s&o)<<(f=e-c)&o,u+=(s=t[h++])>>>(c=32-f)),g[l]=u<p?n+u*i:a;return g.unshift(n),g},h=function(t,e,r,n,i,a,s,o){var h,l,f,c,u=(1<<r)-1,g=0,d=0,p=0;if(i)for(h=0;h<n;h++)0===d&&(f=t[g++],d=32,p=0),d>=r?(l=f>>>p&u,d-=r,p+=r):(l=f>>>p&u,d=32-(c=r-d),l|=((f=t[g++])&(1<<c)-1)<<r-c,p=c),e[h]=i[l];else {var m=Math.ceil((o-a)/s);for(h=0;h<n;h++)0===d&&(f=t[g++],d=32,p=0),d>=r?(l=f>>>p&u,d-=r,p+=r):(l=f>>>p&u,d=32-(c=r-d),l|=((f=t[g++])&(1<<c)-1)<<r-c,p=c),e[h]=l<m?a+l*s:o;}return e},l=function(t,e,r,n,i,a){var s,o=(1<<e)-1,h=0,l=0,f=0,c=0,u=0,g=0,d=[],p=Math.ceil((a-n)/i);for(l=0;l<r;l++)0===c&&(s=t[h++],c=32,g=0),c>=e?(u=s>>>g&o,c-=e,g+=e):(u=s>>>g&o,c=32-(f=e-c),u|=((s=t[h++])&(1<<f)-1)<<e-f,g=f),d[l]=u<p?n+u*i:a;return d.unshift(n),d},f=function(t,e,r,n){var i,a,s,o,h=(1<<r)-1,l=0,f=0,c=4*t.length-Math.ceil(r*n/8);for(t[t.length-1]<<=8*c,i=0;i<n;i++)0===f&&(s=t[l++],f=32),f>=r?(a=s>>>f-r&h,f-=r):(a=(s&h)<<(o=r-f)&h,a+=(s=t[l++])>>>(f=32-o)),e[i]=a;return e},c=function(t,e,r,n){var i,a,s,o,h=(1<<r)-1,l=0,f=0,c=0;for(i=0;i<n;i++)0===f&&(s=t[l++],f=32,c=0),f>=r?(a=s>>>c&h,f-=r,c+=r):(a=s>>>c&h,f=32-(o=r-f),a|=((s=t[l++])&(1<<o)-1)<<r-o,c=o),e[i]=a;return e},u={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(t){for(var e=65535,r=65535,n=t.length,i=Math.floor(n/2),a=0;i;){var s=i>=359?359:i;i-=s;do{e+=t[a++]<<8,r+=e+=t[a++];}while(--s);e=(65535&e)+(e>>>16),r=(65535&r)+(r>>>16);}return 1&n&&(r+=e+=t[a]<<8),((r=(65535&r)+(r>>>16))<<16|(e=(65535&e)+(e>>>16)))>>>0},readHeaderInfo:function(t,e){var r=e.ptr,n=new Uint8Array(t,r,6),i={};if(i.fileIdentifierString=String.fromCharCode.apply(null,n),0!==i.fileIdentifierString.lastIndexOf("Lerc2",0))throw "Unexpected file identifier string (expect Lerc2 ): "+i.fileIdentifierString;r+=6;var a=new DataView(t,r,52);if(i.fileVersion=a.getInt32(0,!0),r+=4,i.fileVersion>=3&&(i.checksum=a.getUint32(4,!0),r+=4),a=new DataView(t,r,48),i.height=a.getUint32(0,!0),i.width=a.getUint32(4,!0),i.numValidPixel=a.getUint32(8,!0),i.microBlockSize=a.getInt32(12,!0),i.blobSize=a.getInt32(16,!0),i.imageType=a.getInt32(20,!0),i.maxZError=a.getFloat64(24,!0),i.zMin=a.getFloat64(32,!0),i.zMax=a.getFloat64(40,!0),r+=48,e.headerInfo=i,e.ptr=r,i.fileVersion>=3&&this.computeChecksumFletcher32(new Uint8Array(t,r-48,i.blobSize-14))!==i.checksum)throw "Checksum failed.";return !0},readMask:function(t,e){var r,n,i=e.ptr,a=e.headerInfo,s=a.width*a.height,o=a.numValidPixel,h=new DataView(t,i,4),l={};if(l.numBytes=h.getUint32(0,!0),i+=4,(0===o||s===o)&&0!==l.numBytes)throw "invalid mask";if(0===o)r=new Uint8Array(Math.ceil(s/8)),l.bitset=r,n=new Uint8Array(s),e.pixels.resultMask=n,i+=l.numBytes;else if(l.numBytes>0){r=new Uint8Array(Math.ceil(s/8));var f=(h=new DataView(t,i,l.numBytes)).getInt16(0,!0),c=2,u=0,g=0;do{if(f>0)for(;f--;)r[u++]=h.getUint8(c++);else for(g=h.getUint8(c++),f=-f;f--;)r[u++]=g;f=h.getInt16(c,!0),c+=2;}while(c<l.numBytes);if(-32768!==f||u<r.length)throw "Unexpected end of mask RLE encoding";n=new Uint8Array(s);var d=0,p=0;for(p=0;p<s;p++)7&p?(d=r[p>>3],d<<=7&p):d=r[p>>3],128&d&&(n[p]=1);e.pixels.resultMask=n,l.bitset=r,i+=l.numBytes;}return e.ptr=i,e.mask=l,!0},readDataOneSweep:function(t,e,r){var n,i=e.ptr,a=e.headerInfo,s=a.width*a.height,o=a.imageType,h=a.numValidPixel*u.getDateTypeSize(o);if(r===Uint8Array)n=new Uint8Array(t,i,h);else {var l=new ArrayBuffer(h);new Uint8Array(l).set(new Uint8Array(t,i,h)),n=new r(l);}if(n.length===s)e.pixels.resultPixels=n;else {e.pixels.resultPixels=new r(s);var f=0,c=0;for(c=0;c<s;c++)e.pixels.resultMask[c]&&(e.pixels.resultPixels[c]=n[f++]);}return i+=h,e.ptr=i,!0},readHuffman:function(t,e,r){var n=e.headerInfo,i=n.width*n.height,a=this.HUFFMAN_LUT_BITS_MAX,s=new DataView(t,e.ptr,16);if(e.ptr+=16,s.getInt32(0,!0)<2)throw "unsupported Huffman version";var o=s.getInt32(4,!0),h=s.getInt32(8,!0),l=s.getInt32(12,!0);if(h>=l)return !1;var f=new Uint32Array(l-h);u.decodeBits(t,e,f);var c,d,p,m,y=[];for(c=h;c<l;c++)y[d=c-(c<o?0:o)]={first:f[c-h],second:null};var b=t.byteLength-e.ptr,w=Math.ceil(b/4),x=new ArrayBuffer(4*w);new Uint8Array(x).set(new Uint8Array(t,e.ptr,b));var M,v=new Uint32Array(x),k=0,I=0;for(M=v[0],c=h;c<l;c++)(m=y[d=c-(c<o?0:o)].first)>0&&(y[d].second=M<<k>>>32-m,32-k>=m?32===(k+=m)&&(k=0,M=v[++I]):(k+=m-32,M=v[++I],y[d].second|=M>>>32-k));var A=0===e.headerInfo.imageType?128:0,U=e.headerInfo.height,B=e.headerInfo.width,E=0,P=0,T=new g;for(c=0;c<y.length;c++)void 0!==y[c]&&(E=Math.max(E,y[c].first));P=E>=a?a:E,E>=30&&console.log("WARning, large NUM LUT BITS IS "+E);var D,S,z,V,C,O=[];for(c=h;c<l;c++)if((m=y[d=c-(c<o?0:o)].first)>0)if(D=[m,d],m<=P)for(S=y[d].second<<P-m,z=1<<P-m,p=0;p<z;p++)O[S|p]=D;else for(S=y[d].second,C=T,V=m-1;V>=0;V--)S>>>V&1?(C.right||(C.right=new g),C=C.right):(C.left||(C.left=new g),C=C.left),0!==V||C.val||(C.val=D[1]);var F,N,G,L,_=e.pixels.resultMask,Y=0,R=0;k>0&&(I++,k=0),M=v[I];var j=new r(i);if(e.headerInfo.numValidPixel===B*U)for(p=0,c=0;c<U;c++)for(d=0;d<B;d++,p++){if(F=0,L=G=M<<k>>>32-P,32-k<P&&(L=G|=v[I+1]>>>64-k-P),O[L])F=O[L][1],k+=O[L][0];else for(L=G=M<<k>>>32-E,32-k<E&&(L=G|=v[I+1]>>>64-k-E),C=T,R=0;R<E;R++)if(!(C=G>>>E-R-1&1?C.right:C.left).left&&!C.right){F=C.val,k=k+R+1;break}k>=32&&(k-=32,M=v[++I]),N=F-A,N+=d>0?Y:c>0?j[p-B]:Y,N&=255,j[p]=N,Y=N;}else for(p=0,c=0;c<U;c++)for(d=0;d<B;d++,p++)if(_[p]){if(F=0,L=G=M<<k>>>32-P,32-k<P&&(L=G|=v[I+1]>>>64-k-P),O[L])F=O[L][1],k+=O[L][0];else for(L=G=M<<k>>>32-E,32-k<E&&(L=G|=v[I+1]>>>64-k-E),C=T,R=0;R<E;R++)if(!(C=G>>>E-R-1&1?C.right:C.left).left&&!C.right){F=C.val,k=k+R+1;break}k>=32&&(k-=32,M=v[++I]),N=F-A,d>0&&_[p-1]?N+=Y:c>0&&_[p-B]?N+=j[p-B]:N+=Y,N&=255,j[p]=N,Y=N;}e.pixels.resultPixels=j,e.ptr=e.ptr+4*(I+1)+(k>0?4:0);},decodeBits:function(t,e,r,n){var i=e.headerInfo.fileVersion,a=0,u=new DataView(t,e.ptr,5),g=u.getUint8(0);a++;var d=g>>6,p=0===d?4:3-d,m=(32&g)>0,y=31&g,b=0;if(1===p)b=u.getUint8(a),a++;else if(2===p)b=u.getUint16(a,!0),a+=2;else {if(4!==p)throw "Invalid valid pixel count type";b=u.getUint32(a,!0),a+=4;}var w,x,M,v,k,I,A,U,B,E=2*e.headerInfo.maxZError;if(m){for(e.counter.lut++,U=u.getUint8(a),a++,v=Math.ceil((U-1)*y/8),k=Math.ceil(v/4),x=new ArrayBuffer(4*k),M=new Uint8Array(x),e.ptr+=a,M.set(new Uint8Array(t,e.ptr,v)),A=new Uint32Array(x),e.ptr+=v,B=0;U-1>>>B;)B++;v=Math.ceil(b*B/8),k=Math.ceil(v/4),x=new ArrayBuffer(4*k),(M=new Uint8Array(x)).set(new Uint8Array(t,e.ptr,v)),w=new Uint32Array(x),e.ptr+=v,I=i>=3?l(A,y,U-1,n,E,e.headerInfo.zMax):o(A,y,U-1,n,E,e.headerInfo.zMax),i>=3?h(w,r,B,b,I):s(w,r,B,b,I);}else e.counter.bitstuffer++,B=y,e.ptr+=a,B>0&&(v=Math.ceil(b*B/8),k=Math.ceil(v/4),x=new ArrayBuffer(4*k),(M=new Uint8Array(x)).set(new Uint8Array(t,e.ptr,v)),w=new Uint32Array(x),e.ptr+=v,i>=3?null==n?c(w,r,B,b):h(w,r,B,b,!1,n,E,e.headerInfo.zMax):null==n?f(w,r,B,b):s(w,r,B,b,!1,n,E,e.headerInfo.zMax));},readTiles:function(t,e,r){var n=e.headerInfo,i=n.width,a=n.height,s=n.microBlockSize,o=n.imageType,h=Math.ceil(i/s),l=Math.ceil(a/s);e.pixels.numBlocksY=l,e.pixels.numBlocksX=h,e.pixels.ptr=0;var f,c,g,d,p,m,y,b=0,w=0,x=0,M=0,v=0,k=0,I=0,A=0,U=0,B=0,E=0,P=0,T=0,D=0,S=0,z=new r(s*s),V=a%s||s,C=i%s||s;for(x=0;x<l;x++)for(v=x!==l-1?s:V,M=0;M<h;M++){if(B=x*i*s+M*s,E=i-(k=M!==h-1?s:C),I=t.byteLength-e.ptr,c={},S=0,S++,U=(A=(f=new DataView(t,e.ptr,Math.min(10,I))).getUint8(0))>>6&255,(A>>2&15)!=(M*s>>3&15))throw "integrity issue";if((p=3&A)>3)throw e.ptr+=S,"Invalid block encoding ("+p+")";if(2!==p)if(0===p){if(e.counter.uncompressed++,e.ptr+=S,P=(P=v*k*u.getDateTypeSize(o))<(T=t.byteLength-e.ptr)?P:T,g=new ArrayBuffer(P),new Uint8Array(g).set(new Uint8Array(t,e.ptr,P)),d=new r(g),D=0,e.pixels.resultMask)for(b=0;b<v;b++){for(w=0;w<k;w++)e.pixels.resultMask[B]&&(e.pixels.resultPixels[B]=d[D++]),B++;B+=E;}else for(b=0;b<v;b++){for(w=0;w<k;w++)e.pixels.resultPixels[B++]=d[D++];B+=E;}e.ptr+=D*u.getDateTypeSize(o);}else if(m=u.getDataTypeUsed(o,U),y=u.getOnePixel(c,S,m,f),S+=u.getDateTypeSize(m),3===p)if(e.ptr+=S,e.counter.constantoffset++,e.pixels.resultMask)for(b=0;b<v;b++){for(w=0;w<k;w++)e.pixels.resultMask[B]&&(e.pixels.resultPixels[B]=y),B++;B+=E;}else for(b=0;b<v;b++){for(w=0;w<k;w++)e.pixels.resultPixels[B++]=y;B+=E;}else if(e.ptr+=S,u.decodeBits(t,e,z,y),S=0,e.pixels.resultMask)for(b=0;b<v;b++){for(w=0;w<k;w++)e.pixels.resultMask[B]&&(e.pixels.resultPixels[B]=z[S++]),B++;B+=E;}else for(b=0;b<v;b++){for(w=0;w<k;w++)e.pixels.resultPixels[B++]=z[S++];B+=E;}else e.counter.constant++,e.ptr+=S;}},formatFileInfo:function(t){return {fileIdentifierString:t.headerInfo.fileIdentifierString,fileVersion:t.headerInfo.fileVersion,imageType:t.headerInfo.imageType,height:t.headerInfo.height,width:t.headerInfo.width,numValidPixel:t.headerInfo.numValidPixel,microBlockSize:t.headerInfo.microBlockSize,blobSize:t.headerInfo.blobSize,maxZError:t.headerInfo.maxZError,pixelType:u.getPixelType(t.headerInfo.imageType),eofOffset:t.eofOffset,mask:t.mask?{numBytes:t.mask.numBytes}:null,pixels:{numBlocksX:t.pixels.numBlocksX,numBlocksY:t.pixels.numBlocksY,maxValue:t.headerInfo.zMax,minValue:t.headerInfo.zMin,noDataValue:t.noDataValue}}},constructConstantSurface:function(t){var e=t.headerInfo.zMax,r=t.headerInfo.height*t.headerInfo.width,n=0;if(t.pixels.resultMask)for(n=0;n<r;n++)t.pixels.resultMask[n]&&(t.pixels.resultPixels[n]=e);else for(n=0;n<r;n++)t.pixels.resultPixels[n]=e;},getDataTypeArray:function(t){var e;switch(t){case 0:e=Int8Array;break;case 1:e=Uint8Array;break;case 2:e=Int16Array;break;case 3:e=Uint16Array;break;case 4:e=Int32Array;break;case 5:e=Uint32Array;break;case 6:default:e=Float32Array;break;case 7:e=Float64Array;}return e},getPixelType:function(t){var e;switch(t){case 0:e="S8";break;case 1:e="U8";break;case 2:e="S16";break;case 3:e="U16";break;case 4:e="S32";break;case 5:e="U32";break;case 6:default:e="F32";break;case 7:e="F64";}return e},isValidPixelValue:function(t,e){if(null==e)return !1;var r;switch(t){case 0:r=e>=-128&&e<=127;break;case 1:r=e>=0&&e<=255;break;case 2:r=e>=-32768&&e<=32767;break;case 3:r=e>=0&&e<=65536;break;case 4:r=e>=-2147483648&&e<=2147483647;break;case 5:r=e>=0&&e<=4294967296;break;case 6:r=e>=-34027999387901484e22&&e<=34027999387901484e22;break;case 7:r=e>=5e-324&&e<=17976931348623157e292;break;default:r=!1;}return r},getDateTypeSize:function(t){var e=0;switch(t){case 0:case 1:e=1;break;case 2:case 3:e=2;break;case 4:case 5:case 6:e=4;break;case 7:e=8;break;default:e=t;}return e},getDataTypeUsed:function(t,e){var r=t;switch(t){case 2:case 4:r=t-e;break;case 3:case 5:r=t-2*e;break;case 6:r=0===e?t:1===e?2:1;break;case 7:r=0===e?t:t-2*e+1;break;default:r=t;}return r},getOnePixel:function(t,e,r,n){var i=0;switch(r){case 0:i=n.getInt8(e);break;case 1:i=n.getUint8(e);break;case 2:i=n.getInt16(e,!0);break;case 3:i=n.getUint16(e,!0);break;case 4:i=n.getInt32(e,!0);break;case 5:i=n.getUInt32(e,!0);break;case 6:i=n.getFloat32(e,!0);break;case 7:i=n.getFloat64(e,!0);break;default:throw "the decoder does not understand this pixel type"}return i}},g=function(t,e,r){this.val=t,this.left=e,this.right=r;},{decode:function(t,e){var r=(e=e||{}).maskData||null===e.maskData,n=e.noDataValue,i=0,a={};a.ptr=e.inputOffset||0,a.pixels={},u.readHeaderInfo(t,a);var s=a.headerInfo,o=u.getDataTypeArray(s.imageType);r?(a.pixels.resultMask=e.maskData,a.ptr+=4):u.readMask(t,a);var h,l=s.width*s.height;if(a.pixels.resultPixels=new o(l),a.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0},0!==s.numValidPixel)if(s.zMax===s.zMin)u.constructConstantSurface(a);else {var f=new DataView(t,a.ptr,2),c=f.getUint8(0,!0);if(a.ptr++,c)u.readDataOneSweep(t,a,o);else if(s.fileVersion>1&&s.imageType<=1&&Math.abs(s.maxZError-.5)<1e-5){var g=f.getUint8(1,!0);a.ptr++,g?u.readHuffman(t,a,o):u.readTiles(t,a,o);}else u.readTiles(t,a,o);}a.eofOffset=a.ptr,e.inputOffset?(h=a.headerInfo.blobSize+e.inputOffset-a.ptr,Math.abs(h)>=1&&(a.eofOffset=e.inputOffset+a.headerInfo.blobSize)):(h=a.headerInfo.blobSize-a.ptr,Math.abs(h)>=1&&(a.eofOffset=a.headerInfo.blobSize));var d={width:s.width,height:s.height,pixelData:a.pixels.resultPixels,minValue:s.zMin,maxValue:s.zMax,maskData:a.pixels.resultMask};if(a.pixels.resultMask&&u.isValidPixelValue(s.imageType,n)){var p=a.pixels.resultMask;for(i=0;i<l;i++)p[i]||(d.pixelData[i]=n);d.noDataValue=n;}return a.noDataValue=n,e.returnFileInfo&&(d.fileInfo=u.formatFileInfo(a)),d},getBandCount:function(t){for(var e=0,r=0,n={ptr:0,pixels:{}};r<t.byteLength-58;)u.readHeaderInfo(t,n),r+=n.headerInfo.blobSize,e++,n.ptr=r;return e}}),m={decode:function(t,e){var r,n=(e=e||{}).inputOffset||0,i=new Uint8Array(t,n,10),a=String.fromCharCode.apply(null,i);if("CntZImage"===a.trim())r=d;else {if("Lerc2"!==a.substring(0,5))throw "Unexpected file identifier string: "+a;r=p;}for(var s,o,h=0,l=t.byteLength-10,f={width:0,height:0,pixels:[],pixelType:e.pixelType,mask:null,statistics:[]};n<l;){var c=r.decode(t,{inputOffset:n,encodedMaskData:s,maskData:o,returnMask:0===h,returnEncodedMask:0===h,returnFileInfo:!0,pixelType:e.pixelType||null,noDataValue:e.noDataValue||null});n=c.fileInfo.eofOffset,0===h&&(s=c.encodedMaskData,o=c.maskData,f.width=c.width,f.height=c.height,f.pixelType=c.pixelType||c.fileInfo.pixelType,f.mask=c.maskData),h++,f.pixels.push(c.pixelData),f.statistics.push({minValue:c.minValue,maxValue:c.maxValue,noDataValue:c.noDataValue});}return f}};pt.exports?pt.exports=m:this.Lerc=m;}();const bt={width:100,height:10};let wt=!1;try{const t=new OffscreenCanvas(1,1);t.getContext("2d").fillText("hello",0,0),wt=!0;}catch(t){wt=!1;}function xt(){if(!yt){const{width:t,height:e}=bt;wt?yt=new OffscreenCanvas(t,e):(yt=document.createElement("canvas"),yt.width=t,yt.height=e);}return yt}class Mt{constructor(t,e={}){if(!Array.isArray(t))return void console.error("colors is not array");if(t.length<2)return void console.error("colors.length should >1");this.colors=t;let r=1/0,n=-1/0;for(let e=0,i=t.length;e<i;e++){const i=t[e][0];r=Math.min(i,r),n=Math.max(i,n);}this.min=r,this.max=n,this.valueOffset=this.max-this.min,this.options=Object.assign({},bt,e),this._initImgData();}getImageData(){return this.imgData}_initImgData(){const t=xt(),{width:e,height:r}=this.options;t.width=e,t.height=r;const n=t.getContext("2d",{willReadFrequently:!0});n.clearRect(0,0,t.width,t.height);const i=n.createLinearGradient(0,0,t.width,0),{colors:a,valueOffset:s}=this;for(let t=0,e=a.length;t<e;t++){const[e,r]=a[t],n=(e-this.min)/s;i.addColorStop(n,r);}n.fillStyle=i,n.fillRect(0,0,t.width,t.height),this.imgData=n.getImageData(0,0,t.width,t.height);}getColor(t){t=Math.max(this.min,t);const e=((t=Math.min(t,this.max))-this.min)/this.valueOffset;let r=Math.round(e*this.imgData.width);r=Math.min(r,this.imgData.width-1);const n=4*r;return [this.imgData.data[n],this.imgData.data[n+1],this.imgData.data[n+2],this.imgData.data[n+3]]}}const vt=new N(200,(t=>{p(t);})),kt=new N(200,(t=>{}));const It={};function At(t,e){It[t]=It[t]||[],It[t].push(e);}function Ut(t){const e=[];for(let r in It){const n=It[r]||[];if(n.length){const e=n.indexOf(t);e>-1&&n.splice(e,1);}0===n.length&&e.push(r);}e.forEach((t=>{delete It[t];}));}function Bt(t,e={},r){return new Promise(((i,a)=>{const s=t=>{createImageBitmap(t).then((t=>{i(t);})).catch((t=>{a(t);}));};if(d(t))return void s(t);const h=r.__taskId;if(!h)return void a(o("taskId is null"));const l=vt.get(t);if(l)s(l);else {const i=r.fetchOptions||{headers:e,referrer:r.referrer},o=r.timeout||0,l=new AbortController,c=l.signal;o&&n(o)&&o>0&&setTimeout((()=>{l.abort(f);}),o),i.signal=c,delete i.timeout,At(h,l),fetch(t,i).then((t=>t.blob())).then((t=>createImageBitmap(t))).then((e=>{!0!==r.disableCache&&vt.add(t,e),Ut(l),s(e);})).catch((t=>{Ut(l),a(t);}));}}))}function Et(t){const{urlTemplate:e,x:n,y:i,z:s,maxAvailableZoom:o,subdomains:l,returnBlobURL:f,globalCompositeOperation:c}=t;return new Promise(((u,g)=>{const d=h(e);for(let t=0,e=d.length;t<e;t++){const e=d[t];if(e&&e.indexOf("{s}")>-1&&(!l||0===l.length))return void g(a("not find subdomains"))}let m,y,w,x,M=n,v=i,k=s;const I=s-o;if(I>0){let t=n,e=i,r=s;for(;r>o;)t=Math.floor(t/2),e=Math.floor(e/2),r--;const a=Math.pow(2,I);let h=Math.floor(t*a),l=h+a,f=Math.floor(e*a),c=f+a;h>n&&(h--,l--),f>i&&(f--,c--),m=(n-h)/(l-h),y=(i-f)/(c-f),w=1/(l-h),x=1/(c-f),M=t,v=e,k=o;}const A=d.map((t=>{let e="{x}";return t=b(t,e,M),e="{y}",t=b(t,e,v),e="{z}",function(t,e){if(!e||!e.length)return t;const r=e.length;let n=Math.floor(Math.random()*r);return n=Math.min(n,r-1),b(t,"{s}",e[n])}(t=b(t,e,k),l)})),U=Object.assign({},r,t.headers||{}),B=A.map((e=>Bt(e,U,t)));Promise.all(B).then((e=>{const r=P(),n=z(e,c);if(n instanceof Error)return void g(n);const i=C(n,t);let a;if(I<=0)a=i;else {const{width:t,height:e}=i;a=function(t,e,r,n,i,a){T(t,e.width,e.height);const s=D(t);s.save(),s.drawImage(e,r,n,i,a,0,0,t.width,t.height),s.restore();const o=t.transferToImageBitmap();return p(e),o}(r,i,t*m,e*y,t*w,e*x);}O(a,f).then((t=>{u(t);})).catch((t=>{g(t);}));})).catch((t=>{g(t);}));}))}function Pt(t,e){return new Promise(((i,l)=>{const c=h(t),u=Object.assign({},r,e.headers||{}),{returnBlobURL:g,terrainWidth:d,tileSize:p,terrainType:y,minHeight:b,maxHeight:w,terrainColors:x}=e,M=t=>{O(t,g).then((t=>{i(t);})).catch((t=>{l(t);}));},v="mapzen"===y,k="tianditu"===y,I="cesium"===y,A="arcgis"===y;if(v||"qgis-gray"===y){const t=c.map((t=>Bt(t,u,e)));Promise.all(t).then((t=>{const e=P(),r=z(t);if(r instanceof Error)return void l(r);T(e,r.width,r.height);const n=D(e);n.drawImage(r,0,0);const i=n.getImageData(0,0,e.width,e.height);v?function(t){const e=t.data,r=[0,0,0];for(let t=0,n=e.length;t<n;t+=4){const n=e[t],i=e[t+1],a=e[t+2];if(0===e[t+3])continue;const s=256*n+i+a/256-32768,[o,h,l]=m(s,r);e[t]=o,e[t+1]=h,e[t+2]=l;}}(i):function(t,e,r){const n=t.data,i=(r-e)/16777216;for(let t=0,r=n.length;t<r;t+=4){const r=n[t],a=n[t+1],s=n[t+2];if(0===n[t+3])continue;const o=s*i+256*a*i+256*r*256*i+e,[h,l,f]=m(o);n[t]=h,n[t+1]=l,n[t+2]=f;}}(i,b,w),n.putImageData(i,0,0);const a=e.transferToImageBitmap();M(Dt(x,a));})).catch((t=>{l(t);}));}else if(k||I||A){const t=c.map((t=>function(t,e={},r){return new Promise(((i,a)=>{const s=t=>{i(t);},h=r.__taskId;if(!h)return void a(o("taskId is null"));const l=kt.get(t);if(l)s(l);else {const i=r.fetchOptions||{headers:e,referrer:r.referrer},o=r.timeout||0,l=new AbortController,c=l.signal;o&&n(o)&&o>0&&setTimeout((()=>{l.abort(f);}),o),i.signal=c,delete i.timeout,At(h,l),fetch(t,i).then((t=>t.arrayBuffer())).then((e=>{!0!==r.disableCache&&kt.add(t,e),Ut(l),s(e);})).catch((t=>{Ut(l),a(t);}));}}))}(t,u,e)));Promise.all(t).then((t=>{if(!t||0===t.length)return void l(s("buffers is null"));const e=t[0];if(0===e.byteLength)return void l(s("buffer is empty"));let r;k?r=ot(e,d,p):I?r=gt(e,d,p):A&&(r=mt.exports.decode(e),r.image=function(t){const{width:e,height:r,pixels:n}=t,i=P();T(i,e,r);const a=D(i);if(!n||0===n.length)return null;const s=n[0],o=a.createImageData(e,r);for(let t=0,e=o.data.length;t<e;t+=4){const e=s[t/4],[r,n,i]=m(e);o.data[t]=r,o.data[t+1]=n,o.data[t+2]=i,o.data[t+3]=255;}return a.putImageData(o,0,0),i.transferToImageBitmap()}(r)),r&&r.image?M(Dt(x,r.image)):l(o("generate terrain data error,not find image data"));})).catch((t=>{l(t);}));}else l(a("not support terrainType:"+y));}))}const Tt=new Map;function Dt(t,e){if(!t||!Array.isArray(t)||t.length<2)return e;const r=JSON.stringify(t);let n=Tt.get(r);n||(n=new Mt(t),Tt.set(r,n));const{width:i,height:a}=e,s=P();T(s,i,a);const o=D(s);o.drawImage(e,0,0);const h=o.getImageData(0,0,i,a),l=h.data;for(let t=0;t<l.length;t+=4){const e=l[t],r=l[t+1],i=l[t+2];if(0===l[t+3])l[t]=0,l[t+1]=0,l[t+2]=0;else {const a=y(e,r,i),[s,o,h,f]=n.getColor(a);l[t]=s,l[t+1]=o,l[t+2]=h,l[t+3]=f;}}return o.putImageData(h,0,0),p(e),s.transferToImageBitmap()}const St=512;function zt(t){return new Promise(((e,r)=>{const n=t.debug,i=t.items,a=t._workerId,s=[];i.forEach(((t,o)=>{const h=new OffscreenCanvas(t.width,t.height);D(h).drawImage(t.image,0,0),n&&console.log("workerId:"+a+",image to blob url :"+(o+1)+"/"+i.length),h.convertToBlob().then((r=>{const n=URL.createObjectURL(r);t.url=n,s.push(1),p(t.image),delete t.image,s.length===i.length&&e(i);})).catch((t=>{console.error(t),r(t);}));}));}))}function Vt(t,e){Ct(t.geometry,e);}function Ct(t,e){if(t)switch(t.type){case"Point":Ot(t.coordinates,e);break;case"MultiPoint":case"LineString":Ft(t.coordinates,e);break;case"MultiLineString":!function(t,e){for(let r=0,n=t.length;r<n;r++)Ft(t[r],e);}(t.coordinates,e);break;case"Polygon":Nt(t.coordinates,e);break;case"MultiPolygon":!function(t,e){for(let r=0,n=t.length;r<n;r++)Nt(t[r],e);}(t.coordinates,e);break;case"GeometryCollection":const r=t.geometries.length;for(let n=0;n<r;n++)Ct(t.geometries[n],e);}}function Ot(t,e){e[0]=Math.min(e[0],t[0]),e[1]=Math.min(e[1],t[1]),e[2]=Math.max(e[2],t[0]),e[3]=Math.max(e[3],t[1]);}function Ft(t,e){for(let r=0,n=t.length;r<n;r++)Ot(t[r],e);}function Nt(t,e){t.length&&Ft(t[0],e);}var Gt=function(t){let e=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];switch(t.type){case"FeatureCollection":const r=t.features.length;for(let n=0;n<r;n++)Vt(t.features[n],e);break;case"Feature":Vt(t,e);break;default:Ct(t,e);}return e},Lt=_t;function _t(t,e,r){var n,i,a,s,o,h=t.length,l=Rt(t[0],e),f=[];for(r||(r=[]),n=1;n<h;n++){for(i=t[n-1],s=o=Rt(a=t[n],e);;){if(!(l|s)){f.push(i),s!==o?(f.push(a),n<h-1&&(r.push(f),f=[])):n===h-1&&f.push(a);break}if(l&s)break;l?l=Rt(i=Yt(i,a,l,e),e):s=Rt(a=Yt(i,a,s,e),e);}l=o;}return f.length&&r.push(f),r}function Yt(t,e,r,n){return 8&r?[t[0]+(e[0]-t[0])*(n[3]-t[1])/(e[1]-t[1]),n[3]]:4&r?[t[0]+(e[0]-t[0])*(n[1]-t[1])/(e[1]-t[1]),n[1]]:2&r?[n[2],t[1]+(e[1]-t[1])*(n[2]-t[0])/(e[0]-t[0])]:1&r?[n[0],t[1]+(e[1]-t[1])*(n[0]-t[0])/(e[0]-t[0])]:null}function Rt(t,e){var r=0;return t[0]<e[0]?r|=1:t[0]>e[2]&&(r|=2),t[1]<e[1]?r|=4:t[1]>e[3]&&(r|=8),r}function jt(t){const[e,r,n,i]=t;return [[e,r],[n,r],[n,i],[e,i]]}function Wt(t){let e=1/0,r=1/0,n=-1/0,i=-1/0;return t.forEach((t=>{e=Math.min(e,t[0]),n=Math.max(n,t[0]),r=Math.min(r,t[1]),i=Math.max(i,t[1]);})),[e,r,n,i]}_t.polyline=_t,_t.polygon=function(t,e){var r,n,i,a,s,o,h;for(n=1;n<=8;n*=2){for(r=[],a=!(Rt(i=t[t.length-1],e)&n),s=0;s<t.length;s++)(h=!(Rt(o=t[s],e)&n))!==a&&r.push(Yt(i,o,n,e)),h&&r.push(o),i=o,a=h;if(!(t=r).length)break}return r};const Zt={};function Ht(t,e){return function(t){if(!t)return !1;const e=(t.geometry||{type:null}).type;return "Polygon"===e||"MultiPolygon"===e}(e)?Zt[t]?a("the"+t+" geojson Already exists"):(Zt[t]=e,function(t){t.bbox=t.bbox||Gt(t);}(e),e):a("geojson.feature is not Polygon")}function Xt(t,e){if(u(t)){const t=e=>{const r=[];for(let n=0,i=e.length;n<i;n++){const i=e[n];Array.isArray(i[0])?r.push(t(i)):r[n]=c(i);}return r};return t(e)}return e}function qt(t,e,r){const[n,i,a,s]=t,o=(a-n)/e,h=(s-i)/e,[l,f]=r;return [(l-n)/o,e-(f-i)/h]}function Jt(t,e,r,n){const[i,a,s,o]=e,h=(t,e)=>{const n=[];for(let i=0,a=t.length;i<a;i++){const a=t[i];Array.isArray(a[0])?n.push(h(a,e)):n[i]=qt(e,r,a);}return n};if(u(t)){const[t,e]=c([i,a]),[r,l]=c([s,o]);return h(n,[t,e,r,l])}return h(n,e)}const $t=Math.PI/180,Kt=180/Math.PI,Qt=6378137,te=20037508.342789244,ee="900913",re={};function ne(t){return Number(t)===t&&t%1!=0}
     /**
          * @preserve
          * gcoord 1.0.7, geographic coordinate library
          * Copyright (c) 2025 Jiulong Hu <me@hujiulong.com>
          */
     const{sin:ie,cos:ae,sqrt:se,abs:oe,PI:he}=Math,le=6378245,fe=.006693421622965823;function ce(t,e){return t>=72.004&&t<=137.8347&&e>=.8293&&e<=55.8271}function ue(t,e){let r=function(t,e){let r=300+t+2*e+.1*t*t+.1*t*e+.1*se(oe(t));return r+=2*(20*ie(6*t*he)+20*ie(2*t*he))/3,r+=2*(20*ie(t*he)+40*ie(t/3*he))/3,r+=2*(150*ie(t/12*he)+300*ie(t/30*he))/3,r}(t-105,e-35),n=function(t,e){let r=2*t-100+3*e+.2*e*e+.1*t*e+.2*se(oe(t));return r+=2*(20*ie(6*t*he)+20*ie(2*t*he))/3,r+=2*(20*ie(e*he)+40*ie(e/3*he))/3,r+=2*(160*ie(e/12*he)+320*ie(e*he/30))/3,r}(t-105,e-35);const i=e/180*he;let a=ie(i);a=1-fe*a*a;const s=se(a);return r=180*r/(le/s*ae(i)*he),n=180*n/(le*(1-fe)/(a*s)*he),[r,n]}function ge(t){const[e,r]=t;if(!ce(e,r))return [e,r];const n=ue(e,r);return [e+n[0],r+n[1]]}function de(t){const[e,r]=t;if(!ce(e,r))return [e,r];let[n,i]=[e,r],a=ge([n,i]),s=a[0]-e,o=a[1]-r;for(;oe(s)>1e-6||oe(o)>1e-6;)n-=s,i-=o,a=ge([n,i]),s=a[0]-e,o=a[1]-r;return [n,i]}const{sin:pe,cos:me,atan2:ye,sqrt:be,PI:we}=Math,xe=3e3*we/180;function Me(t){const[e,r]=t,n=e-.0065,i=r-.006,a=be(n*n+i*i)-2e-5*pe(i*xe),s=ye(i,n)-3e-6*me(n*xe);return [a*me(s),a*pe(s)]}function ve(t){const[e,r]=t,n=e,i=r,a=be(n*n+i*i)+2e-5*pe(i*xe),s=ye(i,n)+3e-6*me(n*xe);return [a*me(s)+.0065,a*pe(s)+.006]}const ke=180/Math.PI,Ie=Math.PI/180,Ae=6378137,Ue=20037508.342789244;function Be(t){return [t[0]*ke/Ae,(.5*Math.PI-2*Math.atan(Math.exp(-t[1]/Ae)))*ke]}function Ee(t){const e=Math.abs(t[0])<=180?t[0]:t[0]-360*(t[0]<0?-1:1),r=[Ae*e*Ie,Ae*Math.log(Math.tan(.25*Math.PI+.5*t[1]*Ie))];return r[0]>Ue&&(r[0]=Ue),r[0]<-Ue&&(r[0]=-Ue),r[1]>Ue&&(r[1]=Ue),r[1]<-Ue&&(r[1]=-Ue),r}const{abs:Pe}=Math,Te=[12890594.86,8362377.87,5591021,3481989.83,1678043.12,0],De=[75,60,45,30,15,0],Se=[[1.410526172116255e-8,898305509648872e-20,-1.9939833816331,200.9824383106796,-187.2403703815547,91.6087516669843,-23.38765649603339,2.57121317296198,-.03801003308653,17337981.2],[-7.435856389565537e-9,8983055097726239e-21,-.78625201886289,96.32687599759846,-1.85204757529826,-59.36935905485877,47.40033549296737,-16.50741931063887,2.28786674699375,10260144.86],[-3.030883460898826e-8,898305509983578e-20,.30071316287616,59.74293618442277,7.357984074871,-25.38371002664745,13.45380521110908,-3.29883767235584,.32710905363475,6856817.37],[-1.981981304930552e-8,8983055099779535e-21,.03278182852591,40.31678527705744,.65659298677277,-4.44255534477492,.85341911805263,.12923347998204,-.04625736007561,4482777.06],[3.09191371068437e-9,8983055096812155e-21,6995724062e-14,23.10934304144901,-.00023663490511,-.6321817810242,-.00663494467273,.03430082397953,-.00466043876332,2555164.4],[2.890871144776878e-9,8983055095805407e-21,-3.068298e-8,7.47137025468032,-353937994e-14,-.02145144861037,-1234426596e-14,.00010322952773,-323890364e-14,826088.5]],ze=[[-.0015702102444,111320.7020616939,0x60e374c3105a3,-0x24bb4115e2e164,0x5cc55543bb0ae8,-0x7ce070193f3784,0x5e7ca61ddf8150,-0x261a578d8b24d0,0x665d60f3742ca,82.5],[.0008277824516172526,111320.7020463578,647795574.6671607,-4082003173.641316,10774905663.51142,-15171875531.51559,12053065338.62167,-5124939663.577472,913311935.9512032,67.5],[.00337398766765,111320.7020202162,4481351.045890365,-23393751.19931662,79682215.47186455,-115964993.2797253,97236711.15602145,-43661946.33752821,8477230.501135234,52.5],[.00220636496208,111320.7020209128,51751.86112841131,3796837.749470245,992013.7397791013,-1221952.21711287,1340652.697009075,-620943.6990984312,144416.9293806241,37.5],[-.0003441963504368392,111320.7020576856,278.2353980772752,2485758.690035394,6070.750963243378,54821.18345352118,9540.606633304236,-2710.55326746645,1405.483844121726,22.5],[-.0003218135878613132,111320.7020701615,.00369383431289,823725.6402795718,.46104986909093,2351.343141331292,1.58060784298199,8.77738589078284,.37238884252424,7.45]];function Ve(t,e,r){const n=Pe(e)/r[9];let i=r[0]+r[1]*Pe(t),a=r[2]+r[3]*n+r[4]*Math.pow(n,2)+r[5]*Math.pow(n,3)+r[6]*Math.pow(n,4)+r[7]*Math.pow(n,5)+r[8]*Math.pow(n,6);return i*=t<0?-1:1,a*=e<0?-1:1,[i,a]}function Ce(t){const[e,r]=t;let n=[];for(let t=0;t<De.length;t++)if(Pe(r)>De[t]){n=ze[t];break}return Ve(e,r,n)}function Oe(t){const[e,r]=t;let n=[];for(let t=0;t<Te.length;t++)if(Pe(r)>=Te[t]){n=Se[t];break}return Ve(e,r,n)}function Fe(t,e){if(!t)throw new Error(e)}function Ne(t){return !!t&&"[object Array]"===Object.prototype.toString.call(t)}function Ge(t){return !isNaN(Number(t))&&null!==t&&!Ne(t)}function Le(...t){const e=t.length-1;return function(...r){let n=e,i=t[e].apply(null,r);for(;n--;)i=t[n].call(null,i);return i}}function _e(t,e,r=!1){if(null===t)return;let n,i,a,s,o,h,l,f,c=0,u=0;const{type:g}=t,d="FeatureCollection"===g,p="Feature"===g,m=d?t.features.length:1;for(let g=0;g<m;g++){l=d?t.features[g].geometry:p?t.geometry:t,f=!!l&&"GeometryCollection"===l.type,h=f?l.geometries.length:1;for(let t=0;t<h;t++){let h=0,d=0;if(s=f?l.geometries[t]:l,null===s)continue;const p=s.type;switch(c=!r||"Polygon"!==p&&"MultiPolygon"!==p?0:1,p){case null:break;case"Point":if(o=s.coordinates,!1===e(o,u,g,h,d))return !1;u++,h++;break;case"LineString":case"MultiPoint":for(o=s.coordinates,n=0;n<o.length;n++){if(!1===e(o[n],u,g,h,d))return !1;u++,"MultiPoint"===p&&h++;}"LineString"===p&&h++;break;case"Polygon":case"MultiLineString":for(o=s.coordinates,n=0;n<o.length;n++){for(i=0;i<o[n].length-c;i++){if(!1===e(o[n][i],u,g,h,d))return !1;u++;}"MultiLineString"===p&&h++,"Polygon"===p&&d++;}"Polygon"===p&&h++;break;case"MultiPolygon":for(o=s.coordinates,n=0;n<o.length;n++){for(d=0,i=0;i<o[n].length;i++){for(a=0;a<o[n][i].length-c;a++){if(!1===e(o[n][i][a],u,g,h,d))return !1;u++;}d++;}h++;}break;case"GeometryCollection":for(n=0;n<s.geometries.length;n++)if(!1===_e(s.geometries[n],e,r))return !1;break;default:throw new Error("Unknown Geometry Type")}}}}var Ye;!function(t){t.WGS84="WGS84",t.WGS1984="WGS84",t.EPSG4326="WGS84",t.GCJ02="GCJ02",t.AMap="GCJ02",t.BD09="BD09",t.BD09LL="BD09",t.Baidu="BD09",t.BMap="BD09",t.BD09MC="BD09MC",t.BD09Meter="BD09MC",t.EPSG3857="EPSG3857",t.EPSG900913="EPSG3857",t.EPSG102100="EPSG3857",t.WebMercator="EPSG3857",t.WM="EPSG3857";}(Ye||(Ye={}));var Re={WGS84:{to:{[Ye.GCJ02]:ge,[Ye.BD09]:Le(ve,ge),[Ye.BD09MC]:Le(Ce,ve,ge),[Ye.EPSG3857]:Ee}},GCJ02:{to:{[Ye.WGS84]:de,[Ye.BD09]:ve,[Ye.BD09MC]:Le(Ce,ve),[Ye.EPSG3857]:Le(Ee,de)}},BD09:{to:{[Ye.WGS84]:Le(de,Me),[Ye.GCJ02]:Me,[Ye.EPSG3857]:Le(Ee,de,Me),[Ye.BD09MC]:Ce}},EPSG3857:{to:{[Ye.WGS84]:Be,[Ye.GCJ02]:Le(ge,Be),[Ye.BD09]:Le(ve,ge,Be),[Ye.BD09MC]:Le(Ce,ve,ge,Be)}},BD09MC:{to:{[Ye.WGS84]:Le(de,Me,Oe),[Ye.GCJ02]:Le(Me,Oe),[Ye.EPSG3857]:Le(Ee,de,Me,Oe),[Ye.BD09]:Oe}}};const je=Object.assign(Object.assign({},Ye),{CRSTypes:Ye,transform:function(t,e,r){if(Fe(!!t,"The args[0] input coordinate is required"),Fe(!!e,"The args[1] original coordinate system is required"),Fe(!!r,"The args[2] target coordinate system is required"),e===r)return t;const n=Re[e];Fe(!!n,`Invalid original coordinate system: ${e}`);const i=n.to[r];Fe(!!i,`Invalid target coordinate system: ${r}`);const a=typeof t;if(Fe("string"===a||"object"===a,`Invalid input coordinate type: ${a}`),"string"===a)try{t=JSON.parse(t);}catch(e){throw new Error(`Invalid input coordinate: ${t}`)}let s=!1;Ne(t)&&(Fe(t.length>=2,`Invalid input coordinate: ${t}`),Fe(Ge(t[0])&&Ge(t[1]),`Invalid input coordinate: ${t}`),t=t.map(Number),s=!0);const o=i;return s?o(t):(_e(t,(t=>{[t[0],t[1]]=o(t);})),t)}}),We=256,Ze=[-180,90],He=[-20037508.342787,20037508.342787],Xe=new class{#t;#e;#r;#n;#i;#a;constructor(t={}){if(this.#t=t.size||256,this.#e=t.antimeridian?2:1,!re[this.#t]){let t=this.#t;const e=re[this.#t]={};e.Bc=[],e.Cc=[],e.zc=[],e.Ac=[];for(let r=0;r<30;r++)e.Bc.push(t/360),e.Cc.push(t/(2*Math.PI)),e.zc.push(t/2),e.Ac.push(t),t*=2;}this.#r=re[this.#t].Bc,this.#n=re[this.#t].Cc,this.#i=re[this.#t].zc,this.#a=re[this.#t].Ac;}px(t,e){if(ne(e)){const r=this.#t*Math.pow(2,e),n=r/2,i=r/360,a=r/(2*Math.PI),s=r,o=Math.min(Math.max(Math.sin($t*t[1]),-.9999),.9999);let h=n+t[0]*i,l=n+.5*Math.log((1+o)/(1-o))*-a;return h>s*this.#e&&(h=s*this.#e),l>s&&(l=s),[h,l]}{const r=this.#i[e],n=Math.min(Math.max(Math.sin($t*t[1]),-.9999),.9999);let i=Math.round(r+t[0]*this.#r[e]),a=Math.round(r+.5*Math.log((1+n)/(1-n))*-this.#n[e]);return i>this.#a[e]*this.#e&&(i=this.#a[e]*this.#e),a>this.#a[e]&&(a=this.#a[e]),[i,a]}}ll(t,e){if(ne(e)){const r=this.#t*Math.pow(2,e),n=r/360,i=r/(2*Math.PI),a=r/2,s=(t[1]-a)/-i;return [(t[0]-a)/n,Kt*(2*Math.atan(Math.exp(s))-.5*Math.PI)]}{const r=(t[1]-this.#i[e])/-this.#n[e];return [(t[0]-this.#i[e])/this.#r[e],Kt*(2*Math.atan(Math.exp(r))-.5*Math.PI)]}}convert(t,e){return e===ee?[...this.forward(t.slice(0,2)),...this.forward(t.slice(2,4))]:[...this.inverse(t.slice(0,2)),...this.inverse(t.slice(2,4))]}inverse(t){return [t[0]*Kt/Qt,(.5*Math.PI-2*Math.atan(Math.exp(-t[1]/Qt)))*Kt]}forward(t){const e=[Qt*t[0]*$t,Qt*Math.log(Math.tan(.25*Math.PI+.5*t[1]*$t))];return e[0]>te&&(e[0]=te),e[0]<-te&&(e[0]=-te),e[1]>te&&(e[1]=te),e[1]<-te&&(e[1]=-te),e}bbox(t,e,r,n,i){n&&(e=Math.pow(2,r)-1-e);const a=[t*this.#t,(+e+1)*this.#t],s=[(+t+1)*this.#t,e*this.#t],o=[...this.ll(a,r),...this.ll(s,r)];return i===ee?this.convert(o,ee):o}xyz(t,e,r,n){const i=n===ee?this.convert(t,"WGS84"):t,a=[i[0],i[1]],s=[i[2],i[3]],o=this.px(a,e),h=this.px(s,e),l=[Math.floor(o[0]/this.#t),Math.floor((h[0]-1)/this.#t)],f=[Math.floor(h[1]/this.#t),Math.floor((o[1]-1)/this.#t)],c={minX:Math.min.apply(Math,l)<0?0:Math.min.apply(Math,l),minY:Math.min.apply(Math,f)<0?0:Math.min.apply(Math,f),maxX:Math.max.apply(Math,l),maxY:Math.max.apply(Math,f)};if(r){const t={minY:Math.pow(2,e)-1-c.maxY,maxY:Math.pow(2,e)-1-c.minY};c.minY=t.minY,c.maxY=t.maxY;}return c}}({size:We});function qe(t){return 1.40625/Math.pow(2,t)}function Je(t,e,r){if(!r)return;const n=jt(t).map((t=>{if("EPSG:3857"===e){return je.transform(t,je.WebMercator,je.WGS84)}return t})).map((t=>je.transform(t,je.WGS84,je.AMap)));let i=1/0,a=1/0,s=-1/0,o=-1/0;if(n.forEach((t=>{const[e,r]=t;i=Math.min(i,e),a=Math.min(a,r),s=Math.max(s,e),o=Math.max(o,r);})),"EPSG:4326"===e)t[0]=i,t[1]=a,t[2]=s,t[3]=o;else {const e=jt([i,a,s,s]).map((t=>c(t)));let r=1/0,n=1/0,o=-1/0,h=-1/0;e.forEach((t=>{const[e,i]=t;r=Math.min(r,e),n=Math.min(n,i),o=Math.max(o,e),h=Math.max(h,i);})),t[0]=r,t[1]=n,t[2]=o,t[3]=h;}}function $e(t,e,r,n=0,i){n=n||0;const[a,s]=He,o=(h=r,156543.03392804097/Math.pow(2,h)*We);var h;const l=function(t,e,r){const[n,i]=Ze,a=qe(r)*We;let s=t,o=e;return s=Math.floor(s),o=Math.floor(o),[n+s*a,o*a-i,n+(s+1)*a,(o+1)*a-i]}(t,e,r);Je(l,"EPSG:4326",i);const f=Wt(jt(l).map((t=>Xe.forward(t)))),[c,u,g,d]=f;let p=(c-a)/o,m=(g-a)/o,y=(s-d)/o,b=(s-u)/o;if(p=Math.floor(p),m=Math.floor(m),y=Math.floor(y),b=Math.floor(b),m<p||b<y)return;const w=[];for(let t=y;t<=b;t++)for(let e=p;e<=m;e++)w.push([e,t,r+n]);const x=w.map((t=>{const[e,r,n]=t;return Xe.bbox(e,r,n,!1,"900913")})),[M,v,k,I]=function(t){let e=1/0,r=1/0,n=-1/0,i=-1/0;return t.forEach((t=>{const[a,s,o,h]=t;e=Math.min(e,a),n=Math.max(n,o),r=Math.min(r,s),i=Math.max(i,h);})),[e,r,n,i]}(x);return {tiles:w,tilesbbox:[M,v,k,I],bbox:l,mbbox:f,x:t,y:e,z:r}}function Ke(t,e,r,n){const{width:i,height:a}=t,[s,o,h,l]=e,f=(h-s)/i,c=(l-o)/a;let[u,g,d,m]=r;u-=f,d+=f,g-=c,m+=c;let y=(u-s)/f,b=(l-m)/c,w=(d-s)/f,x=(l-g)/c;y=Math.floor(y),b=Math.floor(b),w=Math.ceil(w),x=Math.ceil(x);const M=w-y,v=x-b,k=P();T(k,M,v);const I=D(k);I.drawImage(t,y,b,M,v,0,0,M,v),p(t);const A=I.getImageData(0,0,M,v).data,U=[];let B=1/0,E=1/0,S=-1/0,z=-1/0,V=-1;const C="EPSG:4326"===n?Xe.forward:Xe.inverse;for(let t=1;t<=v;t++){const e=m-(t-1)*c,r=e-c;for(let n=1;n<=M;n++){const i=(t-1)*M*4+4*(n-1),a=A[i],s=A[i+1],o=A[i+2],h=A[i+3],l=u+(n-1)*f,c=C([l,e]);B=Math.min(B,c[0]),S=Math.max(S,c[0]),E=Math.min(E,c[1]),z=Math.max(z,c[1]);const g=[l,r];U[++V]={point:c,point1:C(g),r:a,g:s,b:o,a:h};}}return {pixels:U,bbox:[B,E,S,z],width:M,height:v,image:k.transferToImageBitmap()}}function Qe(t,e,r){const[n,i,a,s]=e,o=(a-n)/We,h=(s-i)/We,{pixels:l,bbox:f}=t,[c,u,g,d]=f;let p=(g-c)/o,m=(d-u)/h;if(p=Math.round(p),m=Math.round(m),isNaN(p)||isNaN(m)||0===Math.min(p,m)||Math.abs(p)===1/0||Math.abs(m)===1/0)return;const y=P();T(y,p,m);const b=D(y);function w(t,e){let r=Math.round((t-c)/o+1);r=Math.min(r,p);let n=Math.round((d-e)/h+1);return n=Math.min(n,m),[r,n]}const x=b.createImageData(p,m),M=x.data;for(let t=0,e=l.length;t<e;t++){const{point:e,point1:r,r:n,g:i,b:a,a:s}=l[t],[o,h]=e,[f,c]=r,[u,g]=w(o,h),[d,m]=w(f,c);for(let t=g;t<=m;t++){const e=(t-1)*p*4+4*(u-1);M[e]=n,M[e+1]=i,M[e+2]=a,M[e+3]=s;}}b.putImageData(x,0,0);const v=y.transferToImageBitmap(),k=Math.round((n-c)/o),I=Math.round((d-s)/h),A=P();T(A,We,We);const U=D(y);return U.drawImage(v,k-1,I,We,We,0,0,We,We),function(t){const e=t.canvas,{width:r,height:n}=e,i=t.getImageData(0,0,r,n),a=i.data,s=()=>{for(let t=1;t<=n;t++){if(a[4*r*(t-1)+0+3]>0)return !1}return !0},o=t=>{for(let e=1;e<=n;e++){if(a[4*r*(e-1)+4*(t-1)+3]>0)return !1}return !0},h=()=>{for(let t=1;t<=r;t++){if(a[4*(t-1)+(n-1)*r*4+3]>0)return !1}return !0};if(s())for(let t=1;t<=n;t++){const e=4*r*(t-1)+0,n=e+4,i=a[n],s=a[n+1],o=a[n+2],h=a[n+3];a[e]=i,a[e+1]=s,a[e+2]=o,a[e+3]=h;}if(h())for(let t=1;t<=r;t++){const e=4*(t-1)+(n-1)*r*4,i=4*(t-1)+(n-2)*r*4,s=a[i],o=a[i+1],h=a[i+2],l=a[i+3];a[e]=s,a[e+1]=o,a[e+2]=h,a[e+3]=l;}const l=[];for(let t=1,e=r;t<=e;t++)l.push(o(t));if(l.indexOf(!0)>-1){const t=(t,e)=>{for(let i=1;i<=n;i++){const n=4*r*(i-1)+4*(t-1),s=4*r*(i-1)+4*(e-1),o=a[s],h=a[s+1],l=a[s+2],f=a[s+3];a[n]=o,a[n+1]=h,a[n+2]=l,a[n+3]=f;}};for(let e=1;e<=r;e++){if(!l[e-1])continue;const r=l[e],n=l[e-1];r?n||t(e,e-1):t(e,e+1);}}t.putImageData(i,0,0);}(U),r&&(U.lineWidth=.4,U.strokeStyle="red",U.rect(0,0,We,We),U.stroke()),A.transferToImageBitmap()}function tr(t){return new Promise(((e,r)=>{const{x:n,y:i,z:a,projection:s,zoomOffset:o,errorLog:h,debug:l,returnBlobURL:f,isGCJ02:u}=t,g=t=>{O(t,f).then((t=>{e(t);})).catch((t=>{r(t);}));};(()=>{let e;"EPSG:4326"===s?e=function(t,e,r,n=0,i){n=n||0;const[a,s]=Ze,o=qe(r)*We,h=Xe.bbox(t,e,r);Je(h,"EPSG:4326",i);const[l,f,u,g]=h;let d=(l-a)/o,p=(u-a)/o,m=(s-g)/o,y=(s-f)/o;if(d=Math.floor(d),p=Math.floor(p),m=Math.floor(m),y=Math.floor(y),p<d||y<m)return;const b=[];for(let t=m;t<=y;t++)for(let e=d;e<=p;e++)b.push([e-1,t,r+n]);return {tiles:b,tilesbbox:[a+(d-1)*o,s-(y+1)*o,a+p*o,s-m*o],bbox:h,mbbox:Wt(jt(h).map((t=>c(t)))),x:t,y:e,z:r}}(n,i,a,o||0,u):"EPSG:3857"===s&&(e=$e(n,i,a,o||0,u));const{tiles:r}=e||{};if(!r||0===r.length)return void g(S());e.loadCount=0;const f=()=>{if(e.loadCount>=r.length){const t=function(t,e){let r=1/0,n=1/0,i=-1/0,a=-1/0,s=256;t.forEach((t=>{const[e,o]=t;r=Math.min(e,r),n=Math.min(o,n),i=Math.max(e,i),a=Math.max(o,a),s=t.tileImage.width;}));const o=(i-r+1)*s,h=(a-n+1)*s,l=P();T(l,o,h);const f=D(l);return e&&(f.font="bold 48px serif",f.textAlign="center",f.textBaseline="middle",f.fillStyle="red"),t.forEach((t=>{const[i,a,o]=t,h=(i-r)*s,l=(a-n)*s;let c=t.tileImage;f.drawImage(c,h,l,s,s),e&&f.fillText([i,a,o].join("_").toString(),h+100,l+100);})),p(t.map((t=>t.tileImage))),l.transferToImageBitmap()}(r,l);let n;if("EPSG:4326"===s){n=Qe(Ke(t,e.tilesbbox,e.bbox,s),e.mbbox,l),g(n||S());}else {n=Qe(Ke(t,e.tilesbbox,e.mbbox,s),e.bbox,l),g(n||S());}}else {const n=r[e.loadCount],[i,a,s]=n;Et(Object.assign({},t,{x:i,y:a,z:s,returnBlobURL:!1})).then((t=>{n.tileImage=t,e.loadCount++,f();})).catch((t=>{h&&console.error(t),n.tileImage=S(),e.loadCount++,f();}));}};f();})();}))}t.initialize=function(){},t.onmessage=function(t,e){const n=t.data||{},i=n._type;if("getTile"===i){const{url:t}=n;return void function(t,e){return new Promise(((n,i)=>{const a=h(t),s=Object.assign({},r,e.headers||{}),o=a.map((t=>Bt(t,s,e))),{returnBlobURL:l,globalCompositeOperation:f}=e;Promise.all(o).then((t=>{P();const r=z(t,f);r instanceof Error?i(r):O(C(r,e),l).then((t=>{n(t);})).catch((t=>{i(t);}));})).catch((t=>{i(t);}));}))}(t,n).then((t=>{e(null,t,w(t));})).catch((t=>{e(t);}))}if("getTileWithMaxZoom"===i)return void Et(n).then((t=>{e(null,t,w(t));})).catch((t=>{e(t);}));if("clipTile"===i)return void(a=n,new Promise(((t,e)=>{const{tile:r,tileBBOX:n,projection:i,tileSize:s,maskId:o,returnBlobURL:h,reverse:l}=a,f=Zt[o],c=P(s),u=r=>{O(r,h).then((e=>{t(e);})).catch((t=>{e(t);}));},g=f.bbox;if(!g)return void u(r);const{coordinates:d,type:p}=f.geometry;if(!d.length)return void u(r);const m=()=>{u(l?r:S(s));};if(b=n,(y=g)[2]<b[0]||y[1]>b[3]||y[0]>b[2]||y[3]<b[1])return void m();var y,b;let w,x=d;if("Polygon"===p&&(x=[x]),function(t,e){const[r,n,i,a]=t;return r>=e[0]&&i<=e[2]&&n>=e[1]&&a<=e[3]}(g,n)){w=Xt(i,x);const t=V(c,Jt(i,n,s,w),r,l);return void u(t)}const M=t=>{if(t.length>0){let e=1/0,r=-1/0,n=1/0,i=-1/0;for(let a=0,s=t.length;a<s;a++){const[s,o]=t[a];e=Math.min(s,e),n=Math.min(o,n),r=Math.max(s,r),i=Math.max(o,i);}if(e!==r&&n!==i)return !0}return !1},v=[];for(let t=0,e=x.length;t<e;t++){const e=x[t];for(let t=0,r=e.length;t<r;t++){const r=e[t],i=Lt.polygon(r,n);M(i)&&v.push([i]);}}if(0===v.length)return void m();w=Xt(i,v);const k=V(c,Jt(i,n,s,w),r,l);u(k);}))).then((t=>{e(null,t,w(t));})).catch((t=>{e(t);}));var a,s;if("transformTile"===i)return void tr(n).then((t=>{e(null,t,w(t));})).catch((t=>{e(t);}));if("injectMask"===i){const t=Ht(n.maskId,n.geojsonFeature);return t instanceof Error?void e(t):void e()}if("removeMask"===i)return s=n.maskId,delete Zt[s],void e();if("cancelFetch"===i){const t=n.taskId||n.__taskId;return t?(function(t){const e=It[t]||[];e.length&&e.forEach((t=>{t.abort(l);})),delete It[t];}(t),void e()):void e(o("cancelFetch need taskId"))}if("imageSlicing"===i)return void function(t){return t.disableCache=!0,new Promise(((e,n)=>{const i=h(t.url),a=Object.assign({},r,t.headers||{}),s=i.map((e=>Bt(e,a,t)));Promise.all(s).then((r=>{const i=P(St),a=z(r);if(a instanceof Error)return void n(a);const{width:s,height:o}=a,h=Math.ceil(o/St),l=Math.ceil(s/St),f=[];for(let e=1;e<=h;e++){const r=(e-1)*St,n=Math.min(o,e*St);for(let o=1;o<=l;o++){const h=(o-1)*St,l=Math.min(s,o*St)-h,c=n-r;T(i,l,c),D(i).drawImage(a,h,r,l,c,0,0,i.width,i.height);const u=C(i.transferToImageBitmap(),t);f.push({id:(g++,g),x:h,y:r,width:l,height:c,row:e,col:o,image:u});}}const c={rows:h,cols:l,rowWidth:St,colsHeight:St,width:s,height:o,items:f};p(a),e(c);})).catch((t=>{n(t);}));}))}(n).then((t=>{const r=[];(t.items||[]).forEach((t=>{d(t.image)&&r.push(t.image);})),e(null,t,r);})).catch((t=>{e(t);}));if("imageToBlobURL"===i)return void zt(n).then((t=>{e(null,t,[]);})).catch((t=>{e(t);}));if("encodeTerrainTile"===i){const{url:t}=n;return void Pt(t,n).then((t=>{e(null,t,w(t));})).catch((t=>{e(t);}))}if("colorTerrainTile"===i){const{tile:t,colors:r,returnBlobURL:i}=n;return void O(C(Dt(r,t),n),i).then((t=>{e(null,t,w(t));})).catch((t=>{e(t);}))}const f="not support message type:"+i;console.error(f),e(o(f));},Object.defineProperty(t,"__esModule",{value:!0});});

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
     function createParamsValidateError(message) {
         return createError(message, -1);
     }
     function checkTileUrl(url) {
         if (Array.isArray(url)) {
             return url;
         }
         return [url];
     }
     const CANVAS_ERROR_MESSAGE = createError('not find canvas.The current environment does not support OffscreenCanvas', -4);
     const FetchCancelError = createError('fetch tile data cancel', 499);
     createError('fetch tile data timeout', 408);
     function isPolygon(feature) {
         if (!feature) {
             return false;
         }
         const geometry = feature.geometry || { type: null };
         const type = geometry.type;
         return type === 'Polygon' || type === 'MultiPolygon';
     }
     let globalId = 0;
     function uuid() {
         globalId++;
         return globalId;
     }
     function isImageBitmap(image) {
         return image && image instanceof ImageBitmap;
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

     const WORKERNAME = '__maptalks.tileclip__';
     maptalks.registerWorkerAdapter(WORKERNAME, WORKERCODE);
     const maskMap = {};
     const SUPPORTPROJECTION = ['EPSG:4326', 'EPSG:3857'];
     const TerrainTypes = ['mapzen', 'tianditu', 'cesium', 'arcgis', 'qgis-gray'];
     function checkOptions(options, type) {
         return Object.assign({ referrer: document.location.href, tileSize: 256 }, options, { _type: type, __taskId: uuid(), __workerId: getWorkerId() });
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
