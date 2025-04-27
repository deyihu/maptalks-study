/*!
 * maptalks.tileclip v0.33.0
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
    typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.maptalks = global.maptalks || {}, global.maptalks));
})(this, (function (exports, maptalks) { 'use strict';

    var WORKERCODE = `(function(t){"use strict";function e(t){return"number"==typeof t}function r(t){return new Error(t)}function n(t){return Array.isArray(t)?t:[t]}function i(t){const[e,r]=t,n=6378137,i=e*Math.PI/180*n,a=r*Math.PI/180;return[i,3189068.5*Math.log((1+Math.sin(a))/(1-Math.sin(a)))]}const a=r("fetch tile data cancel"),s=r("fetch tile data timeout");function o(t){return"EPSG:3857"===t}const h={accept:"image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26"};let c=0;function f(t){return t&&t instanceof ImageBitmap}function l(t){Array.isArray(t)||(t=[t]),t.forEach((t=>{t&&t.close&&t.close()}))}function u(t,e){const r=Math.floor(10*(t+1e4)),n=r>>16,i=r>>8&255,a=255&r;return e?(e[0]=n,e[1]=i,e[2]=a,e):[n,i,a]}var g,p,d,m,b,y;function w(t,e,r,n,i,a){var s,o,h,c,f,l,u,g,p,d,m,b,y,w,v,M,A,x,k,I,E,U,T,z,B,P,N,R,L,O;for(B=0;B<a;B++){for(T=B,z=0,h=(s=t[U=B*i])>>8&255,c=s>>16&255,f=s>>24&255,w=x=(o=255&s)*n[6],v=k=h*n[6],M=I=c*n[6],A=E=f*n[6],N=n[0],R=n[1],L=n[4],O=n[5],P=0;P<i;P++)d=(l=255&(s=t[U]))*N+o*R+w*L+x*O,m=(u=s>>8&255)*N+h*R+v*L+k*O,b=(g=s>>16&255)*N+c*R+M*L+I*O,y=(p=s>>24&255)*N+f*R+A*L+E*O,x=w,k=v,I=M,E=A,w=d,v=m,M=b,A=y,o=l,h=u,c=g,f=p,r[z]=w,r[z+1]=v,r[z+2]=M,r[z+3]=A,z+=4,U++;for(z-=4,T+=a*(i-1),h=(s=t[--U])>>8&255,c=s>>16&255,f=s>>24&255,w=x=(o=255&s)*n[7],v=k=h*n[7],M=I=c*n[7],A=E=f*n[7],l=o,u=h,g=c,p=f,N=n[2],R=n[3],P=i-1;P>=0;P--)d=l*N+o*R+w*L+x*O,m=u*N+h*R+v*L+k*O,b=g*N+c*R+M*L+I*O,y=p*N+f*R+A*L+E*O,x=w,k=v,I=M,E=A,w=d,v=m,M=b,A=y,o=l,h=u,c=g,f=p,l=255&(s=t[U]),u=s>>8&255,g=s>>16&255,p=s>>24&255,s=(r[z]+w|0)+(r[z+1]+v<<8)+(r[z+2]+M<<16)+(r[z+3]+A<<24),e[T]=s,U--,z-=4,T-=a}}var v=function(t,e,r,n){if(n){var i=new Uint32Array(t.buffer),a=new Uint32Array(i.length),s=new Float32Array(4*Math.max(e,r)),o=function(t){t<.5&&(t=.5);var e=Math.exp(.527076)/t,r=Math.exp(-e),n=Math.exp(-2*e),i=(1-r)*(1-r)/(1+2*e*r-n);return g=i,p=i*(e-1)*r,d=i*(e+1)*r,m=-i*n,b=2*r,y=-n,new Float32Array([g,p,d,m,b,y,(g+p)/(1-b-y),(d+m)/(1-b-y)])}(n);w(i,a,s,o,e,r),w(a,i,s,o,r,e)}};let M;function A(t=256){return!M&&OffscreenCanvas&&(M=new OffscreenCanvas(1,1)),M&&x(M,t,t),M}function x(t,e,r){t&&(t.width=e,t.height=r)}function k(t){const e=t.getContext("2d",{willReadFrequently:!0});return function(t){const e=t.canvas;t.clearRect(0,0,e.width,e.height)}(e),e}function I(t){const e=A(t);return k(e),e.transferToImageBitmap()}function E(t,e){if(1===t.length)return t[0];if(0===t.length)return r("merge tiles error,not find imagebitmaps");for(let e=0,n=t.length;e<n;e++){if(!f(t[e]))return r("merge tiles error,images not imagebitmap")}const n=t[0].width,i=A(n),a=k(i);return e&&(a.save(),a.globalCompositeOperation=e),t.forEach((t=>{a.drawImage(t,0,0,n,n)})),e&&a.restore(),l(t),i.transferToImageBitmap()}function U(t,e,r,n){const i=k(t);i.save();i.beginPath(),n&&i.rect(0,0,t.width,t.height),e.forEach((t=>{(t=>{for(let e=0,r=t.length;e<r;e++){const r=t[e],n=r[0],a=r[r.length-1],[s,o]=n,[h,c]=a;s===h&&o===c||r.push(n);for(let t=0,e=r.length;t<e;t++){const[e,n]=r[t];0===t?i.moveTo(e,n):i.lineTo(e,n)}}})(t)})),i.clip("evenodd"),i.drawImage(r,0,0,t.width,t.height);const a=t.transferToImageBitmap();return i.restore(),l(r),a}function T(t){const e=A();x(e,t.width,t.height);return k(e).drawImage(t,0,0),l(t),e.convertToBlob()}function z(t,e,r){if(!r)return e;x(t,e.width,e.height);const n=k(t);n.save(),n.filter=r,n.drawImage(e,0,0),n.restore();const i=t.transferToImageBitmap();return l(e),i}function B(t,r,n){if(!e(n)||n<=0)return r;x(t,r.width,r.height);const i=k(t);i.drawImage(r,0,0);const a=i.getImageData(0,0,t.width,t.height);v(a.data,t.width,t.height,n),i.putImageData(a,0,0);const s=t.transferToImageBitmap();return l(r),s}function P(t,r=1){if(!e(r)||1===r||r<0||r>1)return t;const n=A();x(n,t.width,t.height);const i=k(n);i.globalAlpha=r,i.drawImage(t,0,0);const a=n.transferToImageBitmap();return i.globalAlpha=1,l(t),a}const N=()=>{};class R{constructor(t,e){this.max=t,this.onRemove=e||N,this.reset()}reset(){if(this.data){const t=this.data.values();for(const e of t)this.onRemove(e)}return this.data=new Map,this}clear(){this.reset(),delete this.onRemove}add(t,e){return e?(this.has(t)?(this.data.delete(t),this.data.set(t,e),this.data.size>this.max&&this.shrink()):(this.data.set(t,e),this.data.size>this.max&&this.shrink()),this):this}keys(){const t=new Array(this.data.size);let e=0;const r=this.data.keys();for(const n of r)t[e++]=n;return t}shrink(){const t=this.data.keys();let e=t.next();for(;this.data.size>this.max;){const r=this.getAndRemove(e.value);r&&this.onRemove(r),e=t.next()}}has(t){return this.data.has(t)}getAndRemove(t){if(!this.has(t))return null;const e=this.data.get(t);return this.data.delete(t),e}get(t){if(!this.has(t))return null;return this.data.get(t)}remove(t){if(!this.has(t))return this;const e=this.data.get(t);return this.data.delete(t),this.onRemove(e),this}setMaxSize(t){return this.max=t,this.data.size>this.max&&this.shrink(),this}}
/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function(){function t(t){throw t}var e=void 0,r=!0,n=this;function i(t,r){var i,a=t.split("."),s=n;!(a[0]in s)&&s.execScript&&s.execScript("var "+a[0]);for(;a.length&&(i=a.shift());)a.length||r===e?s=s[i]?s[i]:s[i]={}:s[i]=r}var a="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array&&"undefined"!=typeof DataView;function s(e,r){this.index="number"==typeof r?r:0,this.i=0,this.buffer=e instanceof(a?Uint8Array:Array)?e:new(a?Uint8Array:Array)(32768),2*this.buffer.length<=this.index&&t(Error("invalid index")),this.buffer.length<=this.index&&this.f()}s.prototype.f=function(){var t,e=this.buffer,r=e.length,n=new(a?Uint8Array:Array)(r<<1);if(a)n.set(e);else for(t=0;t<r;++t)n[t]=e[t];return this.buffer=n},s.prototype.d=function(t,e,r){var n,i=this.buffer,a=this.index,s=this.i,o=i[a];if(r&&1<e&&(t=8<e?(u[255&t]<<24|u[t>>>8&255]<<16|u[t>>>16&255]<<8|u[t>>>24&255])>>32-e:u[t]>>8-e),8>e+s)o=o<<e|t,s+=e;else for(n=0;n<e;++n)o=o<<1|t>>e-n-1&1,8==++s&&(s=0,i[a++]=u[o],o=0,a===i.length&&(i=this.f()));i[a]=o,this.buffer=i,this.i=s,this.index=a},s.prototype.finish=function(){var t,e=this.buffer,r=this.index;return 0<this.i&&(e[r]<<=8-this.i,e[r]=u[e[r]],r++),a?t=e.subarray(0,r):(e.length=r,t=e),t};var o,h=new(a?Uint8Array:Array)(256);for(o=0;256>o;++o){for(var c=l=o,f=7,l=l>>>1;l;l>>>=1)c<<=1,c|=1&l,--f;h[o]=(c<<f&255)>>>0}var u=h;function g(t){this.buffer=new(a?Uint16Array:Array)(2*t),this.length=0}function p(t){var e,r,n,i,s,o,h,c,f,l,u=t.length,g=0,p=Number.POSITIVE_INFINITY;for(c=0;c<u;++c)t[c]>g&&(g=t[c]),t[c]<p&&(p=t[c]);for(e=1<<g,r=new(a?Uint32Array:Array)(e),n=1,i=0,s=2;n<=g;){for(c=0;c<u;++c)if(t[c]===n){for(o=0,h=i,f=0;f<n;++f)o=o<<1|1&h,h>>=1;for(l=n<<16|c,f=o;f<e;f+=s)r[f]=l;++i}++n,i<<=1,s<<=1}return[r,g,p]}function d(t,e){this.h=b,this.w=0,this.input=a&&t instanceof Array?new Uint8Array(t):t,this.b=0,e&&(e.lazy&&(this.w=e.lazy),"number"==typeof e.compressionType&&(this.h=e.compressionType),e.outputBuffer&&(this.a=a&&e.outputBuffer instanceof Array?new Uint8Array(e.outputBuffer):e.outputBuffer),"number"==typeof e.outputIndex&&(this.b=e.outputIndex)),this.a||(this.a=new(a?Uint8Array:Array)(32768))}g.prototype.getParent=function(t){return 2*((t-2)/4|0)},g.prototype.push=function(t,e){var r,n,i,a=this.buffer;for(r=this.length,a[this.length++]=e,a[this.length++]=t;0<r&&(n=this.getParent(r),a[r]>a[n]);)i=a[r],a[r]=a[n],a[n]=i,i=a[r+1],a[r+1]=a[n+1],a[n+1]=i,r=n;return this.length},g.prototype.pop=function(){var t,e,r,n,i,a=this.buffer;for(e=a[0],t=a[1],this.length-=2,a[0]=a[this.length],a[1]=a[this.length+1],i=0;!((n=2*i+2)>=this.length)&&(n+2<this.length&&a[n+2]>a[n]&&(n+=2),a[n]>a[i]);)r=a[i],a[i]=a[n],a[n]=r,r=a[i+1],a[i+1]=a[n+1],a[n+1]=r,i=n;return{index:t,value:e,length:this.length}};var m,b=2,y={NONE:0,r:1,k:b,N:3},w=[];for(m=0;288>m;m++)switch(r){case 143>=m:w.push([m+48,8]);break;case 255>=m:w.push([m-144+400,9]);break;case 279>=m:w.push([m-256+0,7]);break;case 287>=m:w.push([m-280+192,8]);break;default:t("invalid literal: "+m)}function v(t,e){this.length=t,this.G=e}d.prototype.j=function(){var n,i,o,h,c=this.input;switch(this.h){case 0:for(o=0,h=c.length;o<h;){var f,l,u,g=i=a?c.subarray(o,o+65535):c.slice(o,o+65535),p=(o+=i.length)===h,d=e,m=e,y=this.a,v=this.b;if(a){for(y=new Uint8Array(this.a.buffer);y.length<=v+g.length+5;)y=new Uint8Array(y.length<<1);y.set(this.a)}if(f=p?1:0,y[v++]=0|f,u=65536+~(l=g.length)&65535,y[v++]=255&l,y[v++]=l>>>8&255,y[v++]=255&u,y[v++]=u>>>8&255,a)y.set(g,v),v+=g.length,y=y.subarray(0,v);else{for(d=0,m=g.length;d<m;++d)y[v++]=g[d];y.length=v}this.b=v,this.a=y}break;case 1:var M=new s(a?new Uint8Array(this.a.buffer):this.a,this.b);M.d(1,1,r),M.d(1,2,r);var A,k,U,T=x(this,c);for(A=0,k=T.length;A<k;A++)if(U=T[A],s.prototype.d.apply(M,w[U]),256<U)M.d(T[++A],T[++A],r),M.d(T[++A],5),M.d(T[++A],T[++A],r);else if(256===U)break;this.a=M.finish(),this.b=this.a.length;break;case b:var z,B,P,N,R,L,O,S,_,C,F,j,Y,D,G,V=new s(a?new Uint8Array(this.a.buffer):this.a,this.b),Z=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],q=Array(19);for(z=b,V.d(1,1,r),V.d(z,2,r),B=x(this,c),O=E(L=I(this.L,15)),_=E(S=I(this.K,7)),P=286;257<P&&0===L[P-1];P--);for(N=30;1<N&&0===S[N-1];N--);var H,W,K,X,J,Q,$=P,tt=N,et=new(a?Uint32Array:Array)($+tt),rt=new(a?Uint32Array:Array)(316),nt=new(a?Uint8Array:Array)(19);for(H=W=0;H<$;H++)et[W++]=L[H];for(H=0;H<tt;H++)et[W++]=S[H];if(!a)for(H=0,X=nt.length;H<X;++H)nt[H]=0;for(H=J=0,X=et.length;H<X;H+=W){for(W=1;H+W<X&&et[H+W]===et[H];++W);if(K=W,0===et[H])if(3>K)for(;0<K--;)rt[J++]=0,nt[0]++;else for(;0<K;)(Q=138>K?K:138)>K-3&&Q<K&&(Q=K-3),10>=Q?(rt[J++]=17,rt[J++]=Q-3,nt[17]++):(rt[J++]=18,rt[J++]=Q-11,nt[18]++),K-=Q;else if(rt[J++]=et[H],nt[et[H]]++,3>--K)for(;0<K--;)rt[J++]=et[H],nt[et[H]]++;else for(;0<K;)(Q=6>K?K:6)>K-3&&Q<K&&(Q=K-3),rt[J++]=16,rt[J++]=Q-3,nt[16]++,K-=Q}for(n=a?rt.subarray(0,J):rt.slice(0,J),C=I(nt,7),D=0;19>D;D++)q[D]=C[Z[D]];for(R=19;4<R&&0===q[R-1];R--);for(F=E(C),V.d(P-257,5,r),V.d(N-1,5,r),V.d(R-4,4,r),D=0;D<R;D++)V.d(q[D],3,r);for(D=0,G=n.length;D<G;D++)if(j=n[D],V.d(F[j],C[j],r),16<=j){switch(D++,j){case 16:Y=2;break;case 17:Y=3;break;case 18:Y=7;break;default:t("invalid code: "+j)}V.d(n[D],Y,r)}var it,at,st,ot,ht,ct,ft,lt,ut=[O,L],gt=[_,S];for(ht=ut[0],ct=ut[1],ft=gt[0],lt=gt[1],it=0,at=B.length;it<at;++it)if(st=B[it],V.d(ht[st],ct[st],r),256<st)V.d(B[++it],B[++it],r),ot=B[++it],V.d(ft[ot],lt[ot],r),V.d(B[++it],B[++it],r);else if(256===st)break;this.a=V.finish(),this.b=this.a.length;break;default:t("invalid compression type")}return this.a};var M=function(){function e(e){switch(r){case 3===e:return[257,e-3,0];case 4===e:return[258,e-4,0];case 5===e:return[259,e-5,0];case 6===e:return[260,e-6,0];case 7===e:return[261,e-7,0];case 8===e:return[262,e-8,0];case 9===e:return[263,e-9,0];case 10===e:return[264,e-10,0];case 12>=e:return[265,e-11,1];case 14>=e:return[266,e-13,1];case 16>=e:return[267,e-15,1];case 18>=e:return[268,e-17,1];case 22>=e:return[269,e-19,2];case 26>=e:return[270,e-23,2];case 30>=e:return[271,e-27,2];case 34>=e:return[272,e-31,2];case 42>=e:return[273,e-35,3];case 50>=e:return[274,e-43,3];case 58>=e:return[275,e-51,3];case 66>=e:return[276,e-59,3];case 82>=e:return[277,e-67,4];case 98>=e:return[278,e-83,4];case 114>=e:return[279,e-99,4];case 130>=e:return[280,e-115,4];case 162>=e:return[281,e-131,5];case 194>=e:return[282,e-163,5];case 226>=e:return[283,e-195,5];case 257>=e:return[284,e-227,5];case 258===e:return[285,e-258,0];default:t("invalid length: "+e)}}var n,i,a=[];for(n=3;258>=n;n++)i=e(n),a[n]=i[2]<<24|i[1]<<16|i[0];return a}(),A=a?new Uint32Array(M):M;function x(n,i){function s(e,n){var i,a,s,o,h=e.G,c=[],f=0;switch(i=A[e.length],c[f++]=65535&i,c[f++]=i>>16&255,c[f++]=i>>24,r){case 1===h:a=[0,h-1,0];break;case 2===h:a=[1,h-2,0];break;case 3===h:a=[2,h-3,0];break;case 4===h:a=[3,h-4,0];break;case 6>=h:a=[4,h-5,1];break;case 8>=h:a=[5,h-7,1];break;case 12>=h:a=[6,h-9,2];break;case 16>=h:a=[7,h-13,2];break;case 24>=h:a=[8,h-17,3];break;case 32>=h:a=[9,h-25,3];break;case 48>=h:a=[10,h-33,4];break;case 64>=h:a=[11,h-49,4];break;case 96>=h:a=[12,h-65,5];break;case 128>=h:a=[13,h-97,5];break;case 192>=h:a=[14,h-129,6];break;case 256>=h:a=[15,h-193,6];break;case 384>=h:a=[16,h-257,7];break;case 512>=h:a=[17,h-385,7];break;case 768>=h:a=[18,h-513,8];break;case 1024>=h:a=[19,h-769,8];break;case 1536>=h:a=[20,h-1025,9];break;case 2048>=h:a=[21,h-1537,9];break;case 3072>=h:a=[22,h-2049,10];break;case 4096>=h:a=[23,h-3073,10];break;case 6144>=h:a=[24,h-4097,11];break;case 8192>=h:a=[25,h-6145,11];break;case 12288>=h:a=[26,h-8193,12];break;case 16384>=h:a=[27,h-12289,12];break;case 24576>=h:a=[28,h-16385,13];break;case 32768>=h:a=[29,h-24577,13];break;default:t("invalid distance")}for(i=a,c[f++]=i[0],c[f++]=i[1],c[f++]=i[2],s=0,o=c.length;s<o;++s)b[y++]=c[s];v[c[0]]++,M[c[3]]++,w=e.length+n-1,p=null}var o,h,c,f,l,u,g,p,d,m={},b=a?new Uint16Array(2*i.length):[],y=0,w=0,v=new(a?Uint32Array:Array)(286),M=new(a?Uint32Array:Array)(30),x=n.w;if(!a){for(c=0;285>=c;)v[c++]=0;for(c=0;29>=c;)M[c++]=0}for(v[256]=1,o=0,h=i.length;o<h;++o){for(c=l=0,f=3;c<f&&o+c!==h;++c)l=l<<8|i[o+c];if(m[l]===e&&(m[l]=[]),u=m[l],!(0<w--)){for(;0<u.length&&32768<o-u[0];)u.shift();if(o+3>=h){for(p&&s(p,-1),c=0,f=h-o;c<f;++c)d=i[o+c],b[y++]=d,++v[d];break}0<u.length?(g=k(i,o,u),p?p.length<g.length?(d=i[o-1],b[y++]=d,++v[d],s(g,0)):s(p,-1):g.length<x?p=g:s(g,0)):p?s(p,-1):(d=i[o],b[y++]=d,++v[d])}u.push(o)}return b[y++]=256,v[256]++,n.L=v,n.K=M,a?b.subarray(0,y):b}function k(t,e,r){var n,i,a,s,o,h,c=0,f=t.length;s=0,h=r.length;t:for(;s<h;s++){if(n=r[h-s-1],a=3,3<c){for(o=c;3<o;o--)if(t[n+o-1]!==t[e+o-1])continue t;a=c}for(;258>a&&e+a<f&&t[n+a]===t[e+a];)++a;if(a>c&&(i=n,c=a),258===a)break}return new v(c,e-i)}function I(t,e){var r,n,i,s,o,h=t.length,c=new g(572),f=new(a?Uint8Array:Array)(h);if(!a)for(s=0;s<h;s++)f[s]=0;for(s=0;s<h;++s)0<t[s]&&c.push(s,t[s]);if(r=Array(c.length/2),n=new(a?Uint32Array:Array)(c.length/2),1===r.length)return f[c.pop().index]=1,f;for(s=0,o=c.length/2;s<o;++s)r[s]=c.pop(),n[s]=r[s].value;for(i=function(t,e,r){function n(t){var r=p[t][d[t]];r===e?(n(t+1),n(t+1)):--u[r],++d[t]}var i,s,o,h,c,f=new(a?Uint16Array:Array)(r),l=new(a?Uint8Array:Array)(r),u=new(a?Uint8Array:Array)(e),g=Array(r),p=Array(r),d=Array(r),m=(1<<r)-e,b=1<<r-1;for(f[r-1]=e,s=0;s<r;++s)m<b?l[s]=0:(l[s]=1,m-=b),m<<=1,f[r-2-s]=(f[r-1-s]/2|0)+e;for(f[0]=l[0],g[0]=Array(f[0]),p[0]=Array(f[0]),s=1;s<r;++s)f[s]>2*f[s-1]+l[s]&&(f[s]=2*f[s-1]+l[s]),g[s]=Array(f[s]),p[s]=Array(f[s]);for(i=0;i<e;++i)u[i]=r;for(o=0;o<f[r-1];++o)g[r-1][o]=t[o],p[r-1][o]=o;for(i=0;i<r;++i)d[i]=0;for(1===l[r-1]&&(--u[0],++d[r-1]),s=r-2;0<=s;--s){for(h=i=0,c=d[s+1],o=0;o<f[s];o++)(h=g[s+1][c]+g[s+1][c+1])>t[i]?(g[s][o]=h,p[s][o]=e,c+=2):(g[s][o]=t[i],p[s][o]=i,++i);d[s]=0,1===l[s]&&n(s)}return u}(n,n.length,e),s=0,o=r.length;s<o;++s)f[r[s].index]=i[s];return f}function E(t){var e,r,n,i,s=new(a?Uint16Array:Array)(t.length),o=[],h=[],c=0;for(e=0,r=t.length;e<r;e++)o[t[e]]=1+(0|o[t[e]]);for(e=1,r=16;e<=r;e++)h[e]=c,c+=0|o[e],c<<=1;for(e=0,r=t.length;e<r;e++)for(c=h[t[e]],h[t[e]]+=1,n=s[e]=0,i=t[e];n<i;n++)s[e]=s[e]<<1|1&c,c>>>=1;return s}function U(e,r){switch(this.l=[],this.m=32768,this.e=this.g=this.c=this.q=0,this.input=a?new Uint8Array(e):e,this.s=!1,this.n=z,this.B=!1,!r&&(r={})||(r.index&&(this.c=r.index),r.bufferSize&&(this.m=r.bufferSize),r.bufferType&&(this.n=r.bufferType),r.resize&&(this.B=r.resize)),this.n){case T:this.b=32768,this.a=new(a?Uint8Array:Array)(32768+this.m+258);break;case z:this.b=0,this.a=new(a?Uint8Array:Array)(this.m),this.f=this.J,this.t=this.H,this.o=this.I;break;default:t(Error("invalid inflate mode"))}}var T=0,z=1,B={D:T,C:z};U.prototype.p=function(){for(;!this.s;){var n=K(this,3);switch(1&n&&(this.s=r),n>>>=1){case 0:var i=this.input,s=this.c,o=this.a,h=this.b,c=i.length,f=e,l=o.length,u=e;switch(this.e=this.g=0,s+1>=c&&t(Error("invalid uncompressed block header: LEN")),f=i[s++]|i[s++]<<8,s+1>=c&&t(Error("invalid uncompressed block header: NLEN")),f===~(i[s++]|i[s++]<<8)&&t(Error("invalid uncompressed block header: length verify")),s+f>i.length&&t(Error("input buffer is broken")),this.n){case T:for(;h+f>o.length;){if(f-=u=l-h,a)o.set(i.subarray(s,s+u),h),h+=u,s+=u;else for(;u--;)o[h++]=i[s++];this.b=h,o=this.f(),h=this.b}break;case z:for(;h+f>o.length;)o=this.f({v:2});break;default:t(Error("invalid inflate mode"))}if(a)o.set(i.subarray(s,s+f),h),h+=f,s+=f;else for(;f--;)o[h++]=i[s++];this.c=s,this.b=h,this.a=o;break;case 1:this.o(q,W);break;case 2:var g,d,m,b,y=K(this,5)+257,w=K(this,5)+1,v=K(this,4)+4,M=new(a?Uint8Array:Array)(L.length),A=e,x=e,k=e,I=e,E=e;for(E=0;E<v;++E)M[L[E]]=K(this,3);if(!a)for(E=v,v=M.length;E<v;++E)M[L[E]]=0;for(g=p(M),A=new(a?Uint8Array:Array)(y+w),E=0,b=y+w;E<b;)switch(x=X(this,g),x){case 16:for(I=3+K(this,2);I--;)A[E++]=k;break;case 17:for(I=3+K(this,3);I--;)A[E++]=0;k=0;break;case 18:for(I=11+K(this,7);I--;)A[E++]=0;k=0;break;default:k=A[E++]=x}d=p(a?A.subarray(0,y):A.slice(0,y)),m=p(a?A.subarray(y):A.slice(y)),this.o(d,m);break;default:t(Error("unknown BTYPE: "+n))}}return this.t()};var P,N,R=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],L=a?new Uint16Array(R):R,O=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],S=a?new Uint16Array(O):O,_=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],C=a?new Uint8Array(_):_,F=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],j=a?new Uint16Array(F):F,Y=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=a?new Uint8Array(Y):Y,G=new(a?Uint8Array:Array)(288);for(P=0,N=G.length;P<N;++P)G[P]=143>=P?8:255>=P?9:279>=P?7:8;var V,Z,q=p(G),H=new(a?Uint8Array:Array)(30);for(V=0,Z=H.length;V<Z;++V)H[V]=5;var W=p(H);function K(e,r){for(var n,i=e.g,a=e.e,s=e.input,o=e.c,h=s.length;a<r;)o>=h&&t(Error("input buffer is broken")),i|=s[o++]<<a,a+=8;return n=i&(1<<r)-1,e.g=i>>>r,e.e=a-r,e.c=o,n}function X(e,r){for(var n,i,a=e.g,s=e.e,o=e.input,h=e.c,c=o.length,f=r[0],l=r[1];s<l&&!(h>=c);)a|=o[h++]<<s,s+=8;return(i=(n=f[a&(1<<l)-1])>>>16)>s&&t(Error("invalid code length: "+i)),e.g=a>>i,e.e=s-i,e.c=h,65535&n}function J(t){if("string"==typeof t){var e,r,n=t.split("");for(e=0,r=n.length;e<r;e++)n[e]=(255&n[e].charCodeAt(0))>>>0;t=n}for(var i,a=1,s=0,o=t.length,h=0;0<o;){o-=i=1024<o?1024:o;do{s+=a+=t[h++]}while(--i);a%=65521,s%=65521}return(s<<16|a)>>>0}function Q(e,r){var n,i;if(this.input=e,this.c=0,!r&&(r={})||(r.index&&(this.c=r.index),r.verify&&(this.M=r.verify)),n=e[this.c++],i=e[this.c++],(15&n)===$)this.method=$;else t(Error("unsupported compression method"));0!=((n<<8)+i)%31&&t(Error("invalid fcheck flag:"+((n<<8)+i)%31)),32&i&&t(Error("fdict flag is not supported")),this.A=new U(e,{index:this.c,bufferSize:r.bufferSize,bufferType:r.bufferType,resize:r.resize})}U.prototype.o=function(t,e){var r=this.a,n=this.b;this.u=t;for(var i,a,s,o,h=r.length-258;256!==(i=X(this,t));)if(256>i)n>=h&&(this.b=n,r=this.f(),n=this.b),r[n++]=i;else for(o=S[a=i-257],0<C[a]&&(o+=K(this,C[a])),i=X(this,e),s=j[i],0<D[i]&&(s+=K(this,D[i])),n>=h&&(this.b=n,r=this.f(),n=this.b);o--;)r[n]=r[n++-s];for(;8<=this.e;)this.e-=8,this.c--;this.b=n},U.prototype.I=function(t,e){var r=this.a,n=this.b;this.u=t;for(var i,a,s,o,h=r.length;256!==(i=X(this,t));)if(256>i)n>=h&&(h=(r=this.f()).length),r[n++]=i;else for(o=S[a=i-257],0<C[a]&&(o+=K(this,C[a])),i=X(this,e),s=j[i],0<D[i]&&(s+=K(this,D[i])),n+o>h&&(h=(r=this.f()).length);o--;)r[n]=r[n++-s];for(;8<=this.e;)this.e-=8,this.c--;this.b=n},U.prototype.f=function(){var t,e,r=new(a?Uint8Array:Array)(this.b-32768),n=this.b-32768,i=this.a;if(a)r.set(i.subarray(32768,r.length));else for(t=0,e=r.length;t<e;++t)r[t]=i[t+32768];if(this.l.push(r),this.q+=r.length,a)i.set(i.subarray(n,n+32768));else for(t=0;32768>t;++t)i[t]=i[n+t];return this.b=32768,i},U.prototype.J=function(t){var e,r,n,i=this.input.length/this.c+1|0,s=this.input,o=this.a;return t&&("number"==typeof t.v&&(i=t.v),"number"==typeof t.F&&(i+=t.F)),2>i?r=(n=(s.length-this.c)/this.u[2]/2*258|0)<o.length?o.length+n:o.length<<1:r=o.length*i,a?(e=new Uint8Array(r)).set(o):e=o,this.a=e},U.prototype.t=function(){var t,e,r,n,i,s=0,o=this.a,h=this.l,c=new(a?Uint8Array:Array)(this.q+(this.b-32768));if(0===h.length)return a?this.a.subarray(32768,this.b):this.a.slice(32768,this.b);for(e=0,r=h.length;e<r;++e)for(n=0,i=(t=h[e]).length;n<i;++n)c[s++]=t[n];for(e=32768,r=this.b;e<r;++e)c[s++]=o[e];return this.l=[],this.buffer=c},U.prototype.H=function(){var t,e=this.b;return a?this.B?(t=new Uint8Array(e)).set(this.a.subarray(0,e)):t=this.a.subarray(0,e):(this.a.length>e&&(this.a.length=e),t=this.a),this.buffer=t},Q.prototype.p=function(){var e,r=this.input;return e=this.A.p(),this.c=this.A.c,this.M&&((r[this.c++]<<24|r[this.c++]<<16|r[this.c++]<<8|r[this.c++])>>>0!==J(e)&&t(Error("invalid adler-32 checksum"))),e};var $=8;function tt(t,e){this.input=t,this.a=new(a?Uint8Array:Array)(32768),this.h=et.k;var r,n={};for(r in!e&&(e={})||"number"!=typeof e.compressionType||(this.h=e.compressionType),e)n[r]=e[r];n.outputBuffer=this.a,this.z=new d(this.input,n)}var et=y;function rt(t,e){var r,n,a,s;if(Object.keys)r=Object.keys(e);else for(n in r=[],a=0,e)r[a++]=n;for(a=0,s=r.length;a<s;++a)i(t+"."+(n=r[a]),e[n])}tt.prototype.j=function(){var e,r,n,i,s,o,h,c=0;if(h=this.a,(e=$)===$)r=Math.LOG2E*Math.log(32768)-8;else t(Error("invalid compression method"));if(n=r<<4|e,h[c++]=n,e===$)switch(this.h){case et.NONE:s=0;break;case et.r:s=1;break;case et.k:s=2;break;default:t(Error("unsupported compression type"))}else t(Error("invalid compression method"));return i=s<<6,h[c++]=i|31-(256*n+i)%31,o=J(this.input),this.z.b=c,c=(h=this.z.j()).length,a&&((h=new Uint8Array(h.buffer)).length<=c+4&&(this.a=new Uint8Array(h.length+4),this.a.set(h),h=this.a),h=h.subarray(0,c+4)),h[c++]=o>>24&255,h[c++]=o>>16&255,h[c++]=o>>8&255,h[c++]=255&o,h},i("Zlib.Inflate",Q),i("Zlib.Inflate.prototype.decompress",Q.prototype.p),rt("Zlib.Inflate.BufferType",{ADAPTIVE:B.C,BLOCK:B.D}),i("Zlib.Deflate",tt),i("Zlib.Deflate.compress",(function(t,e){return new tt(t,e).j()})),i("Zlib.Deflate.prototype.compress",tt.prototype.j),rt("Zlib.Deflate.CompressionType",{NONE:et.NONE,FIXED:et.r,DYNAMIC:et.k})}).call(self);var L="undefined"!=typeof Float32Array?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var O,S=function(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t[2]=e[2]-r[2],t};function _(t,e,r){return t[0]=e,t[1]=r,t}O=new L(3),L!=Float32Array&&(O[0]=0,O[1]=0,O[2]=0),function(){var t=function(){var t=new L(2);return L!=Float32Array&&(t[0]=0,t[1]=0),t}()}();const C=[],F=[],j=[],Y=[],D=[],G=[],V=32767,Z=64,q=64,H=3,W=-1e3,K=.001,X=256,J=4,Q=.002;function $(t,e,r){return(1-r)*t+r*e}const tt=new TextDecoder("utf-8");function et(t){return t>>1^-(1&t)}function rt(t,e,r){const n=function(t){if(t.length<1e3)return null;const e=new self.Zlib.Inflate(t);return e?e.decompress():null}(new Uint8Array(t));if(!n)throw new Error((i=new Uint8Array(t),tt.decode(i)));var i;const a=function(t){const e=t,r=Z,n=q,i=new Uint8Array(r*n*J);let a,s,o,h,c;for(let t=0;t<n;t++)for(let f=0;f<r;f++){h=parseInt(149*t/(n-1)),c=parseInt(149*f/(r-1)),s=2*(150*h+c),a=e[s]+256*e[s+1],(a>1e4||a<-2e3)&&(a=0),o=4*(t*r+f);const l=(a+1e3)/K,u=X;i[o]=l/(u*u),i[o+1]=(l-i[o]*u*u)/u,i[o+2]=l-i[o]*u*u-i[o+1]*u,i[o+3]=255}return i}(n),s=function(t,e){const r=e,n=e,i=r+1,a=n+1,s=H,o=W,h=K,c=X,f=Q,l=new Float32Array(i*a);let u=0,g=1/0,p=-1/0;for(let e=0;e<i;e++){const i=e>=n?n-1:e;for(let e=0;e<a;e++){let n=0;const a=i*(4*r)+4*(e>=r?r-1:e);for(let e=0;e<s;e++)n=n*c+t[a+e];n=1*(n*h+o),n-=f,l[u]=n,n<g&&(g=n),n>p&&(p=n),u++}}return{data:l,min:g,max:p,width:0,height:0,tileSize:0,image:null}}(a,e-1);return s.width=s.height=e,s.tileSize=r,ct(s),s}class nt{constructor(t,e,r,n,i){this.p0=[],this.p1=[],this.p2=[],this.normal=[],this.min=[],this.max=[],this.set(t,e,r,n,i)}set(t,e,r,n,i){this.radius=i;let a=3*e,s=3*e+1,o=3*e+2;this.p0[0]=t[a]*i,this.p0[1]=t[s]*i,this.p0[2]=t[o],a=3*r,s=3*r+1,o=3*r+2,this.p1[0]=t[a]*i,this.p1[1]=t[s]*i,this.p1[2]=t[o],a=3*n,s=3*n+1,o=3*n+2,this.p2[0]=t[a]*i,this.p2[1]=t[s]*i,this.p2[2]=t[o],this.min[0]=Math.min(this.p0[0],this.p1[0],this.p2[0]),this.min[1]=Math.min(this.p0[1],this.p1[1],this.p2[1]),this.max[0]=Math.max(this.p0[0],this.p1[0],this.p2[0]),this.max[1]=Math.max(this.p0[1],this.p1[1],this.p2[1]);const h=S(C,this.p1,this.p0),c=S(F,this.p2,this.p1);this.normal=function(t,e){var r=e[0],n=e[1],i=e[2],a=r*r+n*n+i*i;return a>0&&(a=1/Math.sqrt(a)),t[0]=e[0]*a,t[1]=e[1]*a,t[2]=e[2]*a,t}(this.normal,function(t,e,r){var n=e[0],i=e[1],a=e[2],s=r[0],o=r[1],h=r[2];return t[0]=i*h-a*o,t[1]=a*s-n*h,t[2]=n*o-i*s,t}(this.normal,h,c))}contains(t,e){if(t<this.min[0]||t>this.max[0]||e<this.min[1]||e>this.max[1])return!1;_(j,this.p0[0],this.p0[1]),_(Y,this.p1[0],this.p1[1]),_(D,this.p2[0],this.p2[1]);const r=it(j[0],j[1],Y[0],Y[1],D[0],D[1]);return it(t,e,j[0],j[1],D[0],D[1])+it(t,e,j[0],j[1],Y[0],Y[1])+it(t,e,Y[0],Y[1],D[0],D[1])-r<=1e-4}getHeight(t,e){const r=this.normal;return this.p0[2]-((t-this.p0[0])*r[0]+(e-this.p0[1])*r[1])/r[2]}}function it(t,e,r,n,i,a){return.5*Math.abs(t*n+r*a+i*e-t*a-r*e-i*n)}let at=null;function st(t,e,r){if(at&&at.contains(e,r))return at.getHeight(e,r);for(let n=0;n<t.length;n++)if(t[n].contains(e,r))return at=t[n],t[n].getHeight(e,r);return 0}const ot=[];function ht(t,e,r){const n=function(t){let e=0;const r=3,n=Float64Array.BYTES_PER_ELEMENT*r,i=3,a=Uint16Array.BYTES_PER_ELEMENT*i,s=3;let o=Uint16Array.BYTES_PER_ELEMENT;const h=new DataView(t);e+=n;const c=h.getFloat32(e,!0);e+=Float32Array.BYTES_PER_ELEMENT;const f=h.getFloat32(e,!0);e+=Float32Array.BYTES_PER_ELEMENT,e+=n;const l=h.getFloat64(e,!0);e+=Float64Array.BYTES_PER_ELEMENT,e+=n;const u=h.getUint32(e,!0);e+=Uint32Array.BYTES_PER_ELEMENT;const g=new Uint16Array(t,e,3*u);e+=u*a,u>65536&&(o=Uint32Array.BYTES_PER_ELEMENT);const p=g.subarray(0,u),d=g.subarray(u,2*u),m=g.subarray(2*u,3*u);(function(t,e,r){const n=t.length;let i=0,a=0,s=0;for(let o=0;o<n;++o)i+=et(t[o]),a+=et(e[o]),t[o]=i,e[o]=a,r&&(s+=et(r[o]),r[o]=s)})(p,d,m),e%o!=0&&(e+=o-e%o);const b=h.getUint32(e,!0);e+=Uint32Array.BYTES_PER_ELEMENT;const y=u>65536?new Uint32Array(t,e,b*s):new Uint16Array(t,e,b*s);let w=0;const v=y.length;for(let t=0;t<v;++t){const e=y[t];y[t]=w-e,0===e&&++w}const M={minimumHeight:c,maximumHeight:f,quantizedVertices:g,indices:y},A=M.quantizedVertices,x=A.length/3,k=A.subarray(0,x),I=A.subarray(x,2*x),E=A.subarray(2*x,3*x),U=G;for(let t=0;t<x;++t){const e=k[t],r=I[t],n=e/V,i=r/V,a=$(c,f,E[t]/V);U[3*t]=n,U[3*t+1]=1-i,U[3*t+2]=a}return{positions:U,radius:l,min:c,max:f,indices:y}}(t),{positions:i,min:a,max:s,indices:o,radius:h}=n,c=[];let f=0;for(let t=0;t<o.length;t+=3){let e=ot[f];e?e.set(i,o[t],o[t+1],o[t+2],2*h):e=ot[f]=new nt(i,o[t],o[t+1],o[t+2],2*h),f++,c.push(e)}const l=new Float32Array(e*e);f=0;for(let t=0;t<e;t++)for(let r=0;r<e;r++)l[f++]=st(c,r/e*h*2,t/e*h*2);const u={data:l,min:a,max:s,width:e,height:e,tileSize:r};return ct(u),console.log(u),u}function ct(t){const e=A(),{width:r,height:n,data:i,tileSize:a}=t;if(r&&n&&i)try{x(e,r,n);let s=k(e);const o=s.createImageData(r,n),h=[0,0,0];for(let t=0,e=i.length;t<e;t++){const e=i[t],[r,n,a]=u(e,h),s=4*t;o.data[s]=r,o.data[s+1]=n,o.data[s+2]=a,o.data[s+3]=255}s.putImageData(o,0,0);const c=e.transferToImageBitmap();x(e,a,a),s=k(e),s.drawImage(c,0,0,r,n,0,0,a,a),t.image=e.transferToImageBitmap()}catch(t){console.log(t)}}const ft=new R(200,(t=>{l(t)})),lt=new R(200,(t=>{}));const ut={};function gt(t,e){ut[t]=ut[t]||[],ut[t].push(e)}function pt(t){const e=[];for(let r in ut){const n=ut[r]||[];if(n.length){const e=n.indexOf(t);e>-1&&n.splice(e,1)}0===n.length&&e.push(r)}e.forEach((t=>{delete ut[t]}))}function dt(t,n={},i){return new Promise(((a,o)=>{const h=t=>{createImageBitmap(t).then((t=>{a(t)})).catch((t=>{o(t)}))},c=i.__taskId;if(!c)return void o(r("taskId is null"));const f=ft.get(t);if(f)h(f);else{const r=i.fetchOptions||{headers:n,referrer:i.referrer},a=i.timeout||0,f=new AbortController,l=f.signal;a&&e(a)&&a>0&&setTimeout((()=>{f.abort(s)}),a),r.signal=l,delete r.timeout,gt(c,f),fetch(t,r).then((t=>t.blob())).then((t=>createImageBitmap(t))).then((e=>{!0!==i.disableCache&&ft.add(t,e),pt(f),h(e)})).catch((t=>{pt(f),o(t)}))}}))}function mt(t){const{urlTemplate:e,x:i,y:a,z:s,maxAvailableZoom:o,subdomains:c,returnBlobURL:f,globalCompositeOperation:u}=t;return new Promise(((g,p)=>{const d=n(e);for(let t=0,e=d.length;t<e;t++){const e=d[t];if(e&&e.indexOf("{s}")>-1&&(!c||0===c.length))return void p(r("not find subdomains"))}let m,b,y,w,v=i,M=a,I=s;const U=s-o;if(U>0){let t=i,e=a,r=s;for(;r>o;)t=Math.floor(t/2),e=Math.floor(e/2),r--;const n=Math.pow(2,U);let h=Math.floor(t*n),c=h+n,f=Math.floor(e*n),l=f+n;h>i&&(h--,c--),f>a&&(f--,l--),m=(i-h)/(c-h),b=(a-f)/(l-f),y=1/(c-h),w=1/(l-f),v=t,M=e,I=o}const N=d.map((t=>{let e="{x}";for(;t.indexOf(e)>-1;)t=t.replace(e,v);for(e="{y}";t.indexOf(e)>-1;)t=t.replace(e,M);for(e="{z}";t.indexOf(e)>-1;)t=t.replace(e,I);return function(t,e){if(!e||!e.length)return t;const r=e.length;let n=Math.floor(Math.random()*r);for(n=Math.min(n,r-1);t.indexOf("{s}")>-1;)t=t.replace("{s}",e[n]);return t}(t,c)})),R=Object.assign({},h,t.headers||{}),L=N.map((e=>dt(e,R,t)));Promise.all(L).then((e=>{const r=A(),n=E(e,u);if(n instanceof Error)return void p(n);const i=B(r,z(r,n,t.filter),t.gaussianBlurRadius);let a;if(U<=0)a=P(i,t.opacity);else{const{width:e,height:n}=i,s=function(t,e,r,n,i,a){x(t,e.width,e.height);const s=k(t);s.save(),s.drawImage(e,r,n,i,a,0,0,t.width,t.height),s.restore();const o=t.transferToImageBitmap();return l(e),o}(r,i,e*m,n*b,e*y,n*w);a=P(s,t.opacity)}f?T(a).then((t=>{const e=URL.createObjectURL(t);g(e)})).catch((t=>{p(t)})):g(a)})).catch((t=>{p(t)}))}))}function bt(t,i){return new Promise(((a,o)=>{const c=n(t),f=Object.assign({},h,i.headers||{}),{returnBlobURL:l,terrainWidth:g,tileSize:p,terrainType:d}=i;if("mapzen"===d){const t=c.map((t=>dt(t,f,i)));Promise.all(t).then((t=>{const e=A(),r=E(t);if(r instanceof Error)return void o(r);x(e,r.width,r.height);const n=k(e);n.drawImage(r,0,0);const i=n.getImageData(0,0,e.width,e.height);!function(t){const e=t.data,r=[0,0,0];for(let t=0,n=e.length;t<n;t+=4){const n=e[t],i=e[t+1],a=e[t+2];if(0===e[t+3])continue;const s=256*n+i+a/256-32768,[o,h,c]=u(s,r);e[t]=o,e[t+1]=h,e[t+2]=c}}(i),n.putImageData(i,0,0);(t=>{l?T(t).then((t=>{const e=URL.createObjectURL(t);a(e)})).catch((t=>{o(t)})):a(t)})(e.transferToImageBitmap())})).catch((t=>{o(t)}))}else if("tianditu"===d||"cesium"===d){const t=c.map((t=>function(t,n={},i){return new Promise(((a,o)=>{const h=t=>{a(t)},c=i.__taskId;if(!c)return void o(r("taskId is null"));const f=lt.get(t);if(f)h(f);else{const r=i.fetchOptions||{headers:n,referrer:i.referrer},a=i.timeout||0,f=new AbortController,l=f.signal;a&&e(a)&&a>0&&setTimeout((()=>{f.abort(s)}),a),r.signal=l,delete r.timeout,gt(c,f),fetch(t,r).then((t=>t.arrayBuffer())).then((e=>{!0!==i.disableCache&&lt.add(t,e),pt(f),h(e)})).catch((t=>{pt(f),o(t)}))}}))}(t,f,i)));Promise.all(t).then((t=>{if(!t||0===t.length)return void o(r("buffers is null"));const e=t[0];if(0===e.byteLength)return void o(r("buffer is empty"));let n;n="tianditu"===d?rt(e,g,p):ht(e,g,p),n.image?a(n.image):o(r("generate terrain data error,not find image data"))})).catch((t=>{o(t)}))}else o(r("not support terrainType:"+d))}))}const yt=512;function wt(t){return new Promise(((e,r)=>{const n=t.debug,i=t.items,a=t._workerId,s=[];i.forEach(((t,o)=>{const h=new OffscreenCanvas(t.width,t.height);k(h).drawImage(t.image,0,0),n&&console.log("workerId:"+a+",image to blob url :"+(o+1)+"/"+i.length),h.convertToBlob().then((r=>{const n=URL.createObjectURL(r);t.url=n,s.push(1),l(t.image),delete t.image,s.length===i.length&&e(i)})).catch((t=>{console.error(t),r(t)}))}))}))}function vt(t,e){Mt(t.geometry,e)}function Mt(t,e){if(t)switch(t.type){case"Point":At(t.coordinates,e);break;case"MultiPoint":case"LineString":xt(t.coordinates,e);break;case"MultiLineString":!function(t,e){for(let r=0,n=t.length;r<n;r++)xt(t[r],e)}(t.coordinates,e);break;case"Polygon":kt(t.coordinates,e);break;case"MultiPolygon":!function(t,e){for(let r=0,n=t.length;r<n;r++)kt(t[r],e)}(t.coordinates,e);break;case"GeometryCollection":const r=t.geometries.length;for(let n=0;n<r;n++)Mt(t.geometries[n],e)}}function At(t,e){e[0]=Math.min(e[0],t[0]),e[1]=Math.min(e[1],t[1]),e[2]=Math.max(e[2],t[0]),e[3]=Math.max(e[3],t[1])}function xt(t,e){for(let r=0,n=t.length;r<n;r++)At(t[r],e)}function kt(t,e){t.length&&xt(t[0],e)}var It=function(t){let e=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];switch(t.type){case"FeatureCollection":const r=t.features.length;for(let n=0;n<r;n++)vt(t.features[n],e);break;case"Feature":vt(t,e);break;default:Mt(t,e)}return e},Et=Ut;function Ut(t,e,r){var n,i,a,s,o,h=t.length,c=zt(t[0],e),f=[];for(r||(r=[]),n=1;n<h;n++){for(i=t[n-1],s=o=zt(a=t[n],e);;){if(!(c|s)){f.push(i),s!==o?(f.push(a),n<h-1&&(r.push(f),f=[])):n===h-1&&f.push(a);break}if(c&s)break;c?c=zt(i=Tt(i,a,c,e),e):s=zt(a=Tt(i,a,s,e),e)}c=o}return f.length&&r.push(f),r}function Tt(t,e,r,n){return 8&r?[t[0]+(e[0]-t[0])*(n[3]-t[1])/(e[1]-t[1]),n[3]]:4&r?[t[0]+(e[0]-t[0])*(n[1]-t[1])/(e[1]-t[1]),n[1]]:2&r?[n[2],t[1]+(e[1]-t[1])*(n[2]-t[0])/(e[0]-t[0])]:1&r?[n[0],t[1]+(e[1]-t[1])*(n[0]-t[0])/(e[0]-t[0])]:null}function zt(t,e){var r=0;return t[0]<e[0]?r|=1:t[0]>e[2]&&(r|=2),t[1]<e[1]?r|=4:t[1]>e[3]&&(r|=8),r}function Bt(t){const[e,r,n,i]=t;return[[e,r],[n,r],[n,i],[e,i]]}function Pt(t){let e=1/0,r=1/0,n=-1/0,i=-1/0;return t.forEach((t=>{e=Math.min(e,t[0]),n=Math.max(n,t[0]),r=Math.min(r,t[1]),i=Math.max(i,t[1])})),[e,r,n,i]}Ut.polyline=Ut,Ut.polygon=function(t,e){var r,n,i,a,s,o,h;for(n=1;n<=8;n*=2){for(r=[],a=!(zt(i=t[t.length-1],e)&n),s=0;s<t.length;s++)(h=!(zt(o=t[s],e)&n))!==a&&r.push(Tt(i,o,n,e)),h&&r.push(o),i=o,a=h;if(!(t=r).length)break}return r};const Nt={};function Rt(t,e){return function(t){if(!t)return!1;const e=(t.geometry||{type:null}).type;return"Polygon"===e||"MultiPolygon"===e}(e)?Nt[t]?r("the"+t+" geojson Already exists"):(Nt[t]=e,function(t){t.bbox=t.bbox||It(t)}(e),e):r("geojson.feature is not Polygon")}function Lt(t,e){if(o(t)){const t=e=>{const r=[];for(let n=0,a=e.length;n<a;n++){const a=e[n];Array.isArray(a[0])?r.push(t(a)):r[n]=i(a)}return r};return t(e)}return e}function Ot(t,e,r){const[n,i,a,s]=t,o=(a-n)/e,h=(s-i)/e,[c,f]=r;return[(c-n)/o,e-(f-i)/h]}function St(t,e,r,n){const[a,s,h,c]=e,f=(t,e)=>{const n=[];for(let i=0,a=t.length;i<a;i++){const a=t[i];Array.isArray(a[0])?n.push(f(a,e)):n[i]=Ot(e,r,a)}return n};if(o(t)){const[t,e]=i([a,s]),[r,o]=i([h,c]);return f(n,[t,e,r,o])}return f(n,e)}const _t=Math.PI/180,Ct=180/Math.PI,Ft=6378137,jt=20037508.342789244,Yt="900913",Dt={};function Gt(t){return Number(t)===t&&t%1!=0}const Vt=256,Zt=[-180,90],qt=[-20037508.342787,20037508.342787],Ht=new class{#t;#e;#r;#n;#i;#a;constructor(t={}){if(this.#t=t.size||256,this.#e=t.antimeridian?2:1,!Dt[this.#t]){let t=this.#t;const e=Dt[this.#t]={};e.Bc=[],e.Cc=[],e.zc=[],e.Ac=[];for(let r=0;r<30;r++)e.Bc.push(t/360),e.Cc.push(t/(2*Math.PI)),e.zc.push(t/2),e.Ac.push(t),t*=2}this.#r=Dt[this.#t].Bc,this.#n=Dt[this.#t].Cc,this.#i=Dt[this.#t].zc,this.#a=Dt[this.#t].Ac}px(t,e){if(Gt(e)){const r=this.#t*Math.pow(2,e),n=r/2,i=r/360,a=r/(2*Math.PI),s=r,o=Math.min(Math.max(Math.sin(_t*t[1]),-.9999),.9999);let h=n+t[0]*i,c=n+.5*Math.log((1+o)/(1-o))*-a;return h>s*this.#e&&(h=s*this.#e),c>s&&(c=s),[h,c]}{const r=this.#i[e],n=Math.min(Math.max(Math.sin(_t*t[1]),-.9999),.9999);let i=Math.round(r+t[0]*this.#r[e]),a=Math.round(r+.5*Math.log((1+n)/(1-n))*-this.#n[e]);return i>this.#a[e]*this.#e&&(i=this.#a[e]*this.#e),a>this.#a[e]&&(a=this.#a[e]),[i,a]}}ll(t,e){if(Gt(e)){const r=this.#t*Math.pow(2,e),n=r/360,i=r/(2*Math.PI),a=r/2,s=(t[1]-a)/-i;return[(t[0]-a)/n,Ct*(2*Math.atan(Math.exp(s))-.5*Math.PI)]}{const r=(t[1]-this.#i[e])/-this.#n[e];return[(t[0]-this.#i[e])/this.#r[e],Ct*(2*Math.atan(Math.exp(r))-.5*Math.PI)]}}convert(t,e){return e===Yt?[...this.forward(t.slice(0,2)),...this.forward(t.slice(2,4))]:[...this.inverse(t.slice(0,2)),...this.inverse(t.slice(2,4))]}inverse(t){return[t[0]*Ct/Ft,(.5*Math.PI-2*Math.atan(Math.exp(-t[1]/Ft)))*Ct]}forward(t){const e=[Ft*t[0]*_t,Ft*Math.log(Math.tan(.25*Math.PI+.5*t[1]*_t))];return e[0]>jt&&(e[0]=jt),e[0]<-jt&&(e[0]=-jt),e[1]>jt&&(e[1]=jt),e[1]<-jt&&(e[1]=-jt),e}bbox(t,e,r,n,i){n&&(e=Math.pow(2,r)-1-e);const a=[t*this.#t,(+e+1)*this.#t],s=[(+t+1)*this.#t,e*this.#t],o=[...this.ll(a,r),...this.ll(s,r)];return i===Yt?this.convert(o,Yt):o}xyz(t,e,r,n){const i=n===Yt?this.convert(t,"WGS84"):t,a=[i[0],i[1]],s=[i[2],i[3]],o=this.px(a,e),h=this.px(s,e),c=[Math.floor(o[0]/this.#t),Math.floor((h[0]-1)/this.#t)],f=[Math.floor(h[1]/this.#t),Math.floor((o[1]-1)/this.#t)],l={minX:Math.min.apply(Math,c)<0?0:Math.min.apply(Math,c),minY:Math.min.apply(Math,f)<0?0:Math.min.apply(Math,f),maxX:Math.max.apply(Math,c),maxY:Math.max.apply(Math,f)};if(r){const t={minY:Math.pow(2,e)-1-l.maxY,maxY:Math.pow(2,e)-1-l.minY};l.minY=t.minY,l.maxY=t.maxY}return l}}({size:Vt});function Wt(t){return 1.40625/Math.pow(2,t)}function Kt(t,e,r,n=0){n=n||0;const[i,a]=qt,s=(o=r,156543.03392804097/Math.pow(2,o)*Vt);var o;const h=function(t,e,r){const[n,i]=Zt,a=Wt(r)*Vt;let s=t,o=e;return s=Math.floor(s),o=Math.floor(o),[n+s*a,o*a-i,n+(s+1)*a,(o+1)*a-i]}(t,e,r),c=Pt(Bt(h).map((t=>Ht.forward(t)))),[f,l,u,g]=c;let p=(f-i)/s,d=(u-i)/s,m=(a-g)/s,b=(a-l)/s;if(p=Math.floor(p),d=Math.floor(d),m=Math.floor(m),b=Math.floor(b),d<p||b<m)return;const y=[];for(let t=m;t<=b;t++)for(let e=p;e<=d;e++)y.push([e,t,r+n]);const w=y.map((t=>{const[e,r,n]=t;return Ht.bbox(e,r,n,!1,"900913")})),[v,M,A,x]=function(t){let e=1/0,r=1/0,n=-1/0,i=-1/0;return t.forEach((t=>{const[a,s,o,h]=t;e=Math.min(e,a),n=Math.max(n,o),r=Math.min(r,s),i=Math.max(i,h)})),[e,r,n,i]}(w);return{tiles:y,tilesbbox:[v,M,A,x],bbox:h,mbbox:c,x:t,y:e,z:r}}function Xt(t,e,r,n){const{width:i,height:a}=t,[s,o,h,c]=e,f=(h-s)/i,u=(c-o)/a;let[g,p,d,m]=r;g-=f,d+=f,p-=u,m+=u;let b=(g-s)/f,y=(c-m)/u,w=(d-s)/f,v=(c-p)/u;b=Math.floor(b),y=Math.floor(y),w=Math.ceil(w),v=Math.ceil(v);const M=w-b,I=v-y,E=A();x(E,M,I);const U=k(E);U.drawImage(t,b,y,M,I,0,0,M,I),l(t);const T=U.getImageData(0,0,M,I).data,z=[];let B=1/0,P=1/0,N=-1/0,R=-1/0,L=-1;const O="EPSG:4326"===n?Ht.forward:Ht.inverse;for(let t=1;t<=I;t++){const e=m-(t-1)*u,r=e-u;for(let n=1;n<=M;n++){const i=(t-1)*M*4+4*(n-1),a=T[i],s=T[i+1],o=T[i+2],h=T[i+3],c=g+(n-1)*f,l=O([c,e]);B=Math.min(B,l[0]),N=Math.max(N,l[0]),P=Math.min(P,l[1]),R=Math.max(R,l[1]);const u=[c,r];z[++L]={point:l,point1:O(u),r:a,g:s,b:o,a:h}}}return{pixels:z,bbox:[B,P,N,R],width:M,height:I,image:E.transferToImageBitmap()}}function Jt(t,e,r){const[n,i,a,s]=e,o=(a-n)/Vt,h=(s-i)/Vt,{pixels:c,bbox:f}=t,[l,u,g,p]=f;let d=(g-l)/o,m=(p-u)/h;if(d=Math.round(d),m=Math.round(m),isNaN(d)||isNaN(m)||0===Math.min(d,m)||Math.abs(d)===1/0||Math.abs(m)===1/0)return;const b=A();x(b,d,m);const y=k(b);function w(t,e){let r=Math.round((t-l)/o+1);r=Math.min(r,d);let n=Math.round((p-e)/h+1);return n=Math.min(n,m),[r,n]}const v=y.createImageData(d,m),M=v.data;for(let t=0,e=c.length;t<e;t++){const{point:e,point1:r,r:n,g:i,b:a,a:s}=c[t],[o,h]=e,[f,l]=r,[u,g]=w(o,h),[p,m]=w(f,l);for(let t=g;t<=m;t++){const e=(t-1)*d*4+4*(u-1);M[e]=n,M[e+1]=i,M[e+2]=a,M[e+3]=s}}y.putImageData(v,0,0);const I=b.transferToImageBitmap(),E=Math.round((n-l)/o),U=Math.round((p-s)/h),T=A();x(T,Vt,Vt);const z=k(b);return z.drawImage(I,E-1,U,Vt,Vt,0,0,Vt,Vt),function(t){const e=t.canvas,{width:r,height:n}=e,i=t.getImageData(0,0,r,n),a=i.data,s=()=>{for(let t=1;t<=n;t++){if(a[4*r*(t-1)+0+3]>0)return!1}return!0},o=()=>{for(let t=1;t<=r;t++){if(a[4*(t-1)+(n-1)*r*4+3]>0)return!1}return!0};if(s())for(let t=1;t<=n;t++){const e=4*r*(t-1)+0,n=e+4,i=a[n],s=a[n+1],o=a[n+2],h=a[n+3];a[e]=i,a[e+1]=s,a[e+2]=o,a[e+3]=h}if(o())for(let t=1;t<=r;t++){const e=4*(t-1)+(n-1)*r*4,i=4*(t-1)+(n-2)*r*4,s=a[i],o=a[i+1],h=a[i+2],c=a[i+3];a[e]=s,a[e+1]=o,a[e+2]=h,a[e+3]=c}t.putImageData(i,0,0)}(z),r&&(z.lineWidth=.4,z.strokeStyle="red",z.rect(0,0,Vt,Vt),z.stroke()),T.transferToImageBitmap()}function Qt(t){return new Promise(((e,r)=>{const{x:n,y:a,z:s,projection:o,zoomOffset:h,errorLog:c,debug:f,returnBlobURL:u}=t,g=t=>{u?T(t).then((t=>{const r=URL.createObjectURL(t);e(r)})).catch((t=>{r(t)})):e(t)};(()=>{let e;"EPSG:4326"===o?e=function(t,e,r,n=0){n=n||0;const[a,s]=Zt,o=Wt(r)*Vt,h=Ht.bbox(t,e,r),[c,f,l,u]=h;let g=(c-a)/o,p=(l-a)/o,d=(s-u)/o,m=(s-f)/o;if(g=Math.floor(g),p=Math.floor(p),d=Math.floor(d),m=Math.floor(m),p<g||m<d)return;const b=[];for(let t=d;t<=m;t++)for(let e=g;e<=p;e++)b.push([e-1,t,r+n]);return{tiles:b,tilesbbox:[a+(g-1)*o,s-(m+1)*o,a+p*o,s-d*o],bbox:h,mbbox:Pt(Bt(h).map((t=>i(t)))),x:t,y:e,z:r}}(n,a,s,h||0):"EPSG:3857"===o&&(e=Kt(n,a,s,h||0));const{tiles:r}=e||{};if(!r||0===r.length)return void g(I());e.loadCount=0;const u=()=>{if(e.loadCount>=r.length){const t=function(t,e){let r=1/0,n=1/0,i=-1/0,a=-1/0,s=256;t.forEach((t=>{const[e,o]=t;r=Math.min(e,r),n=Math.min(o,n),i=Math.max(e,i),a=Math.max(o,a),s=t.tileImage.width}));const o=(i-r+1)*s,h=(a-n+1)*s,c=A();x(c,o,h);const f=k(c);return e&&(f.font="bold 48px serif",f.textAlign="center",f.textBaseline="middle",f.fillStyle="red"),t.forEach((t=>{const[i,a,o]=t,h=(i-r)*s,c=(a-n)*s;let l=t.tileImage;f.drawImage(l,h,c,s,s),e&&f.fillText([i,a,o].join("_").toString(),h+100,c+100)})),l(t.map((t=>t.tileImage))),c.transferToImageBitmap()}(r,f);let n;if("EPSG:4326"===o){n=Jt(Xt(t,e.tilesbbox,e.bbox,o),e.mbbox,f),g(n||I())}else{n=Jt(Xt(t,e.tilesbbox,e.mbbox,o),e.bbox,f),g(n||I())}}else{const n=r[e.loadCount],[i,a,s]=n;mt(Object.assign({},t,{x:i,y:a,z:s,returnBlobURL:!1})).then((t=>{n.tileImage=t,e.loadCount++,u()})).catch((t=>{c&&console.error(t),n.tileImage=I(),e.loadCount++,u()}))}};u()})()}))}function $t(t){const e=[];return f(t)&&e.push(t),e}t.initialize=function(){},t.onmessage=function(t,e){const i=t.data||{},s=i._type;if("getTile"===s){const{url:t}=i;return void function(t,e){return new Promise(((r,i)=>{const a=n(t),s=Object.assign({},h,e.headers||{}),o=a.map((t=>dt(t,s,e))),{returnBlobURL:c,globalCompositeOperation:f}=e;Promise.all(o).then((t=>{const n=A(),a=E(t,f);if(a instanceof Error)return void i(a);const s=P(B(n,z(n,a,e.filter),e.gaussianBlurRadius),e.opacity);c?T(s).then((t=>{const e=URL.createObjectURL(t);r(e)})).catch((t=>{i(t)})):r(s)})).catch((t=>{i(t)}))}))}(t,i).then((t=>{e(null,t,$t(t))})).catch((t=>{e(t)}))}if("getTileWithMaxZoom"===s)return void mt(i).then((t=>{e(null,t,$t(t))})).catch((t=>{e(t)}));if("clipTile"===s)return void(o=i,new Promise(((t,e)=>{const{tile:n,tileBBOX:i,projection:a,tileSize:s,maskId:h,returnBlobURL:c,reverse:f}=o,l=Nt[h];if(!l)return void e(r("not find mask by maskId:"+h));const u=A(s),g=r=>{c?T(r).then((e=>{const r=URL.createObjectURL(e);t(r)})).catch((t=>{e(t)})):t(r)},p=l.bbox;if(!p)return void g(n);const{coordinates:d,type:m}=l.geometry;if(!d.length)return void g(n);const b=()=>{g(f?n:I(s))};if(w=i,(y=p)[2]<w[0]||y[1]>w[3]||y[0]>w[2]||y[3]<w[1])return void b();var y,w;let v,M=d;if("Polygon"===m&&(M=[M]),function(t,e){const[r,n,i,a]=t;return r>=e[0]&&i<=e[2]&&n>=e[1]&&a<=e[3]}(p,i)){v=Lt(a,M);const t=U(u,St(a,i,s,v),n,f);return void g(t)}const x=t=>{if(t.length>0){let e=1/0,r=-1/0,n=1/0,i=-1/0;for(let a=0,s=t.length;a<s;a++){const[s,o]=t[a];e=Math.min(s,e),n=Math.min(o,n),r=Math.max(s,r),i=Math.max(o,i)}if(e!==r&&n!==i)return!0}return!1},k=[];for(let t=0,e=M.length;t<e;t++){const e=M[t];for(let t=0,r=e.length;t<r;t++){const r=e[t],n=Et.polygon(r,i);x(n)&&k.push([n])}}if(0===k.length)return void b();v=Lt(a,k);const E=U(u,St(a,i,s,v),n,f);g(E)}))).then((t=>{e(null,t,$t(t))})).catch((t=>{e(t)}));var o,u;if("transformTile"===s)return void Qt(i).then((t=>{e(null,t,$t(t))})).catch((t=>{e(t)}));if("injectMask"===s){const t=Rt(i.maskId,i.geojsonFeature);return t instanceof Error?void e(t):void e()}if("removeMask"===s)return u=i.maskId,delete Nt[u],void e();if("cancelFetch"===s){const t=i.taskId||i.__taskId;return t?(function(t){const e=ut[t]||[];e.length&&e.forEach((t=>{t.abort(a)})),delete ut[t]}(t),void e()):void e(r("cancelFetch need taskId"))}if("imageSlicing"===s)return void function(t){return t.disableCache=!0,new Promise(((e,r)=>{const i=n(t.url),a=Object.assign({},h,t.headers||{}),s=i.map((e=>dt(e,a,t)));Promise.all(s).then((n=>{const i=A(yt),a=E(n);if(a instanceof Error)return void r(a);const{width:s,height:o}=a,h=Math.ceil(o/yt),f=Math.ceil(s/yt),u=[];for(let e=1;e<=h;e++){const r=(e-1)*yt,n=Math.min(o,e*yt);for(let o=1;o<=f;o++){const h=(o-1)*yt,f=Math.min(s,o*yt)-h,l=n-r;x(i,f,l),k(i).drawImage(a,h,r,f,l,0,0,i.width,i.height);const g=i.transferToImageBitmap(),p=P(B(i,z(i,g,t.filter),t.gaussianBlurRadius),t.opacity);u.push({id:(c++,c),x:h,y:r,width:f,height:l,row:e,col:o,image:p})}}const g={rows:h,cols:f,rowWidth:yt,colsHeight:yt,width:s,height:o,items:u};l(a),e(g)})).catch((t=>{r(t)}))}))}(i).then((t=>{const r=[];(t.items||[]).forEach((t=>{f(t.image)&&r.push(t.image)})),e(null,t,r)})).catch((t=>{e(t)}));if("imageToBlobURL"===s)return void wt(i).then((t=>{e(null,t,[])})).catch((t=>{e(t)}));if("encodeTerrainTile"===s){const{url:t}=i;return void bt(t,i).then((t=>{e(null,t,$t(t))})).catch((t=>{e(t)}))}const g="not support message type:"+s;console.error(g),e(r(g))},Object.defineProperty(t,"__esModule",{value:!0})})`;

    function isNumber(value) {
        return typeof value === 'number';
    }
    function createError(message) {
        return new Error(message);
    }
    const CANVAS_ERROR_MESSAGE = createError('not find canvas.The current environment does not support OffscreenCanvas');
    const FetchCancelError = createError('fetch tile data cancel');
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

    const WORKERNAME = '__maptalks.tileclip';
    maptalks.registerWorkerAdapter(WORKERNAME, WORKERCODE);
    const maskMap = {};
    const SUPPORTPROJECTION = ['EPSG:4326', 'EPSG:3857'];
    function checkOptions(options, type) {
        return Object.assign({ referrer: document.location.href, tileSize: 256 }, options, { _type: type, __taskId: uuid(), __workerId: getWorkerId() });
    }
    class TileActor extends maptalks.worker.Actor {
        _cancelTask(options) {
            const workerId = options.__workerId;
            const __taskId = options.__taskId;
            if (!isNumber(workerId) || !isNumber(__taskId)) {
                return;
            }
            if (__taskId) {
                this.send({ _type: 'cancelFetch', __taskId }, [], (error, image) => {
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
            const workerId = options.__workerId;
            const promise = new Promise((resolve, reject) => {
                if (!getCanvas()) {
                    reject(CANVAS_ERROR_MESSAGE);
                    return;
                }
                const { url } = options;
                if (!url) {
                    reject(createError('getTile error:url is null'));
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
        getTileWithMaxZoom(options) {
            options = checkOptions(options, 'getTileWithMaxZoom');
            const workerId = options.__workerId;
            const promise = new Promise((resolve, reject) => {
                if (!getCanvas()) {
                    reject(CANVAS_ERROR_MESSAGE);
                    return;
                }
                const { urlTemplate, maxAvailableZoom, x, y, z } = options;
                const maxZoomEnable = maxAvailableZoom && isNumber(maxAvailableZoom) && maxAvailableZoom >= 1;
                if (!maxZoomEnable) {
                    reject(createError('getTileWithMaxZoom error:maxAvailableZoom is error'));
                    return;
                }
                if (!urlTemplate) {
                    reject(createError('getTileWithMaxZoom error:urlTemplate is error'));
                    return;
                }
                if (!isNumber(x) || !isNumber(y) || !isNumber(z)) {
                    reject(createError('getTileWithMaxZoom error:x/y/z is error'));
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
            const workerId = options.__workerId;
            const promise = new Promise((resolve, reject) => {
                if (!getCanvas()) {
                    reject(CANVAS_ERROR_MESSAGE);
                    return;
                }
                const { urlTemplate, x, y, z, maxAvailableZoom, projection, zoomOffset, errorLog, debug, returnBlobURL } = options;
                const maxZoomEnable = maxAvailableZoom && isNumber(maxAvailableZoom) && maxAvailableZoom >= 1;
                if (!projection) {
                    reject(createError('transformTile error:not find projection'));
                    return;
                }
                if (SUPPORTPROJECTION.indexOf(projection) === -1) {
                    reject(createError('transformTile error:not support projection:' + projection + '.the support:' + SUPPORTPROJECTION.join(',').toString()));
                    return;
                }
                if (!maxZoomEnable) {
                    reject(createError('transformTile error:maxAvailableZoom is error'));
                    return;
                }
                if (!urlTemplate) {
                    reject(createError('transformTile error:urlTemplate is error'));
                    return;
                }
                if (!isNumber(x) || !isNumber(y) || !isNumber(z)) {
                    reject(createError('transformTile error:x/y/z is error'));
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
                    reject(createError('clipTile error:tile is null.It should be a ImageBitmap'));
                    return;
                }
                if (!tileBBOX) {
                    reject(createError('clipTile error:tileBBOX is null'));
                    return;
                }
                if (!projection) {
                    reject(createError('clipTile error:projection is null'));
                    return;
                }
                if (!tileSize) {
                    reject(createError('clipTile error:tileSize is null'));
                    return;
                }
                if (!maskId) {
                    reject(createError('clipTile error:maskId is null'));
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
                    reject(createError('injectMask error:maskId is null'));
                    return;
                }
                if (maskMap[maskId]) {
                    reject(createError(`injectMask error:${maskId} has injected`));
                    return;
                }
                if (!isPolygon(geojsonFeature)) {
                    reject(createError('injectMask error:geojsonFeature is not Polygon,It should be GeoJSON Polygon/MultiPolygon'));
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
                    reject(createError('removeMask error:maskId is null'));
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
            const workerId = options.__workerId;
            const promise = new Promise((resolve, reject) => {
                if (!getCanvas()) {
                    reject(CANVAS_ERROR_MESSAGE);
                    return;
                }
                const { url } = options;
                if (!url) {
                    reject(createError('url is null'));
                    return;
                }
                this.send(options, [], (error, result) => {
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
            const workerId = options.__workerId;
            const promise = new Promise((resolve, reject) => {
                if (!getCanvas()) {
                    reject(CANVAS_ERROR_MESSAGE);
                    return;
                }
                const { url, terrainType } = options;
                if (!url) {
                    reject(createError('encodeTerrainTile error:url is null'));
                    return;
                }
                if (!terrainType) {
                    reject(createError('encodeTerrainTile error:terrainType is null'));
                    return;
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
