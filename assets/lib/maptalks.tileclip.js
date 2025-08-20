/*!
 * maptalks.tileclip v0.51.0
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
  typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.maptalks = global.maptalks || {}, global.maptalks));
})(this, (function (exports, maptalks) { 'use strict';

  var WORKERCODE = `/*!
 * maptalks.tileclip v0.51.0
  */
function(e){"use strict";class t extends Error{constructor(e,t){super(e),this.code=t}}var r={accept:"image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26"};function n(e){return"number"==typeof e}function a(e,r){return new t(e,r)}a("not find canvas.The current environment does not support OffscreenCanvas",-4);var i=a("fetch tile data cancel",499),o=a("fetch tile data timeout",408);function s(e){return a("fetch NetWork error, the url is "+e,-5)}function f(e){return a(e,-1)}function u(e){return a(e,-2)}function c(e){return a(e,-3)}function h(e){return Array.isArray(e)?e:[e]}function l(e){var[t,r]=e,n=6378137,a=t*Math.PI/180*n,i=r*Math.PI/180;return[a,3189068.5*Math.log((1+Math.sin(i))/(1-Math.sin(i)))]}function d(e){return"EPSG:3857"===e}a("the task is cancel",-6);var v=0;function g(){return++v}function p(e){return e&&e instanceof ImageBitmap}function m(e){Array.isArray(e)||(e=[e]),e.forEach(function(e){e&&e.close&&e.close()})}function y(e,t){var r=Math.floor(10*(e+1e4)),n=r>>16,a=r>>8&255,i=255&r;return t?(t[0]=n,t[1]=a,t[2]=i,t):[n,a,i]}function b(e,t,r){return.1*(256*e*256+256*t+r)-1e4}function w(e,t,r){for(;e.indexOf(t)>-1;)e=e.replace(t,r);return e}function I(e){var t=h(e),r=[];return t.forEach(function(e){p(e)&&r.push(e)}),r}function x(e,t,r,n,a){var i="{x}",o=w(e,i,t);return o=w(o,i="{y}",r),function(e,t){if(!t||!t.length)return e;var r=t.length,n=Math.floor(Math.random()*r);return w(e,"{s}",t[n=Math.min(n,r-1)])}(o=w(o,i="{z}",n),a)}function k(e,t){return!(e&&e.indexOf("{s}")>-1&&(!t||0===t.length))}var M,A,E,S,_,B,D="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function U(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}function T(e,t,r,n,a,i){var o,s,f,u,c,h,l,d,v,g,p,m,y,b,w,I,x,k,M,A,E,S,_,B,D,U,T,P,N,O;for(D=0;D<i;D++){for(_=D,B=0,f=(o=e[S=D*a])>>8&255,u=o>>16&255,c=o>>24&255,b=k=(s=255&o)*n[6],w=M=f*n[6],I=A=u*n[6],x=E=c*n[6],T=n[0],P=n[1],N=n[4],O=n[5],U=0;U<a;U++)g=(h=255&(o=e[S]))*T+s*P+b*N+k*O,p=(l=o>>8&255)*T+f*P+w*N+M*O,m=(d=o>>16&255)*T+u*P+I*N+A*O,y=(v=o>>24&255)*T+c*P+x*N+E*O,k=b,M=w,A=I,E=x,b=g,w=p,I=m,x=y,s=h,f=l,u=d,c=v,r[B]=b,r[B+1]=w,r[B+2]=I,r[B+3]=x,B+=4,S++;for(B-=4,_+=i*(a-1),f=(o=e[--S])>>8&255,u=o>>16&255,c=o>>24&255,b=k=(s=255&o)*n[7],w=M=f*n[7],I=A=u*n[7],x=E=c*n[7],h=s,l=f,d=u,v=c,T=n[2],P=n[3],U=a-1;U>=0;U--)g=h*T+s*P+b*N+k*O,p=l*T+f*P+w*N+M*O,m=d*T+u*P+I*N+A*O,y=v*T+c*P+x*N+E*O,k=b,M=w,A=I,E=x,b=g,w=p,I=m,x=y,s=h,f=l,u=d,c=v,h=255&(o=e[S]),l=o>>8&255,d=o>>16&255,v=o>>24&255,o=(r[B]+b|0)+(r[B+1]+w<<8)+(r[B+2]+I<<16)+(r[B+3]+x<<24),t[_]=o,S--,B-=4,_-=i}}var P,N,O=function(e,t,r,n){if(n){var a=new Uint32Array(e.buffer),i=new Uint32Array(a.length),o=new Float32Array(4*Math.max(t,r)),s=function(e){e<.5&&(e=.5);var t=Math.exp(.527076)/e,r=Math.exp(-t),n=Math.exp(-2*t),a=(1-r)*(1-r)/(1+2*t*r-n);return M=a,A=a*(t-1)*r,E=a*(t+1)*r,S=-a*n,_=2*r,B=-n,new Float32Array([M,A,E,S,_,B,(M+A)/(1-_-B),(E+S)/(1-_-B)])}(n);T(a,i,o,s,t,r),T(i,a,o,s,r,t)}},C={width:100,height:10},z=!1;try{new OffscreenCanvas(1,1).getContext("2d").fillText("hello",0,0),z=!0}catch(e){z=!1}function j(){if(!P){var{width:e,height:t}=C;z?P=new OffscreenCanvas(e,t):((P=document.createElement("canvas")).width=e,P.height=t)}return P}class R{constructor(e,t={}){if(Array.isArray(e))if(e.length<2)console.error("colors.length should >1");else{this.colors=e;for(var r=1/0,n=-1/0,a=0,i=e.length;a<i;a++){var o=e[a][0];r=Math.min(o,r),n=Math.max(o,n)}this.min=r,this.max=n,this.valueOffset=this.max-this.min,this.options=Object.assign({},C,t),this._initImgData()}else console.error("colors is not array")}getImageData(){return this.imgData}_initImgData(){var e=j(),{width:t,height:r}=this.options;e.width=t,e.height=r;var n=e.getContext("2d",{willReadFrequently:!0});n.clearRect(0,0,e.width,e.height);for(var a=n.createLinearGradient(0,0,e.width,0),{colors:i,valueOffset:o}=this,s=0,f=i.length;s<f;s++){var[u,c]=i[s],h=(u-this.min)/o;a.addColorStop(h,c)}n.fillStyle=a,n.fillRect(0,0,e.width,e.height),this.imgData=n.getImageData(0,0,e.width,e.height)}getColor(e){e=Math.max(this.min,e);var t=((e=Math.min(e,this.max))-this.min)/this.valueOffset,r=Math.round(t*this.imgData.width),n=4*(r=Math.min(r,this.imgData.width-1));return[this.imgData.data[n],this.imgData.data[n+1],this.imgData.data[n+2],this.imgData.data[n+3]]}}function F(e=256){return!N&&OffscreenCanvas&&(N=new OffscreenCanvas(1,1)),N&&V(N,e,e),N}function V(e,t,r){e&&(e.width=t,e.height=r)}function L(e){var t=e.canvas;e.clearRect(0,0,t.width,t.height)}function G(e){var t=e.getContext("2d",{willReadFrequently:!0});return L(t),t}function Y(e){var t=F(e);return G(t),t.transferToImageBitmap()}function W(e,t){if(1===e.length)return e[0];if(0===e.length)return u("merge tiles error,not find imagebitmaps");for(var r=0,n=e.length;r<n;r++){if(!p(e[r]))return u("merge tiles error,images not imagebitmap")}var a=e[0].width,i=F(a),o=G(i);return t&&(o.save(),o.globalCompositeOperation=t),e.forEach(function(e){o.drawImage(e,0,0,a,a)}),t&&o.restore(),m(e),i.transferToImageBitmap()}function q(e,t){t.forEach(function(t){!function(t){for(var r=0,n=t.length;r<n;r++){var a=t[r],i=a[0],o=a[a.length-1],[s,f]=i,[u,c]=o;s===u&&f===c||a.push(i);for(var h=0,l=a.length;h<l;h++){var[d,v]=a[h];0===h?e.moveTo(d,v):e.lineTo(d,v)}}}(t)})}function H(e,t,r,n,a){var i=F(e),o=G(i),s=[],{width:f,height:u}=i,c=r.width,h=r.height;if(a){var{polygons:l,bufferSize:d}=a;o.save(),o.beginPath(),o.lineWidth=2*d,o.lineJoin="round",o.strokeStyle="black",q(o,l),o.stroke(),o.restore();var v=o.getImageData(0,0,f,u);L(o),o.drawImage(r,0,0);for(var g=-1,p=o.getImageData(0,0,f,u).data,y=0,b=v.data.length;y<b;y+=4){if(v.data[y+3]>0){var w=p[y],I=p[y+1],x=p[y+2],k=p[y+3];s[++g]=[y,w,I,x,k]}}}if(L(o),o.save(),o.beginPath(),n&&o.rect(0,0,f,u),q(o,t),o.clip("evenodd"),o.drawImage(r,0,0,f,u),s.length){for(var M=o.getImageData(0,0,f,u),A=M.data,E=0,S=s.length;E<S;E++){var[_,B,D,U,T]=s[E];A[_]=B,A[_+1]=D,A[_+2]=U,A[_+3]=T}o.putImageData(M,0,0)}var P=i.transferToImageBitmap();return o.restore(),m(r),i.width===c&&i.height===h?P:(V(i,c,h),G(i).drawImage(P,0,0,c,h),m(P),i.transferToImageBitmap())}function X(e,t){var r=1/0,n=1/0,a=-1/0,i=-1/0,o=256;e.forEach(function(e){var[t,s]=e;r=Math.min(t,r),n=Math.min(s,n),a=Math.max(t,a),i=Math.max(s,i),o=e.tileImage.width});var s=(a-r+1)*o,f=(i-n+1)*o,u=F();V(u,s,f);var c=G(u);return t&&(c.font="bold 28px serif",c.textAlign="center",c.textBaseline="middle",c.fillStyle="red",c.strokeStyle="red"),e.forEach(function(e){var[a,i,s]=e,f=(a-r)*o,u=(i-n)*o,h=e.tileImage;c.drawImage(h,f,u,o,o),t&&(c.rect(f,u,o,o),c.stroke(),c.fillText([a,i,s].join("_").toString(),f+100,u+100))}),m(e.map(function(e){return e.tileImage})),u.transferToImageBitmap()}function Z(e,t){var r=function(e,t){if(!t)return e;var r=F(e.width);V(r,e.width,e.height);var n=G(r);n.save(),n.filter=t,n.drawImage(e,0,0),n.restore();var a=r.transferToImageBitmap();return m(e),a}(e,t.filter),a=function(e,t){if(!n(t)||t<=0)return e;var r=F(e.width);V(r,e.width,e.height);var a=G(r);a.drawImage(e,0,0);var i=a.getImageData(0,0,r.width,r.height);O(i.data,r.width,r.height,t),a.putImageData(i,0,0);var o=r.transferToImageBitmap();return m(e),o}(r,t.gaussianBlurRadius),i=function(e,t=1){if(!n(t)||1===t||t<0||t>1)return e;var r=F();V(r,e.width,e.height);var a=G(r);a.globalAlpha=t,a.drawImage(e,0,0);var i=r.transferToImageBitmap();return a.globalAlpha=1,m(e),i}(a,t.opacity),o=function(e,t){if(!t)return e;var{width:r,height:n}=e,a=F();V(a,r,n);var i=G(a);i.drawImage(e,0,0);for(var o=i.getImageData(0,0,r,n),s=o.data,f=0;f<s.length;f+=4){var u=s[f+0],c=s[f+1],h=s[f+2];s[f+0]=.28*u+.72*c+.22*h,s[f+1]=.25*u+.63*c+.13*h,s[f+2]=.17*u+.66*c+.13*h}i.putImageData(o,0,0);var l=a.transferToImageBitmap();return m(e),l}(i,t.oldPhoto),s=function(e,t){if(!n(t))return e;if((t=Math.ceil(t))<2)return e;var{width:r,height:a}=e,i=F(r),o=G(i);o.drawImage(e,0,0);for(var s=o.getImageData(0,0,r,a),f=s.data,u=Math.min(t,r,a),c=Math.ceil(r/u),h=Math.ceil(a/u),l=1,d=1,v=[],g=-1;l<=c;){for(;d<=h;){var p=(l-1)*u+1,y=(d-1)*u+1,b=Math.min(p+u-1,r),w=Math.min(y+u-1,a);v[++g]=[p,y,b,w],d++}d=1,l++}for(var I=0,x=v.length;I<x;I++){for(var k=v[I],[M,A,E,S]=k,_=[],B=-1,D=0,U=0,T=0,P=0,N=A;N<=S;N++)for(var O=M;O<=E;O++){var C=(N-1)*r*4+4*(O-1);_[++B]=C,D+=f[C],U+=f[C+1],T+=f[C+2],P+=f[C+3]}for(var z=_.length,j=Math.round(D/z),R=Math.round(U/z),V=Math.round(T/z),L=Math.round(P/z),Y=0;Y<z;Y++){var W=_[Y];f[W]=j,f[W+1]=R,f[W+2]=V,f[W+3]=L}}return o.putImageData(s,0,0),m(e),i.transferToImageBitmap()}(o,t.mosaicSize);return s}function J(e,t){return new Promise(function(r,n){t?function(e){var t=F();return V(t,e.width,e.height),G(t).drawImage(e,0,0),m(e),t.convertToBlob()}(e).then(function(e){var t=URL.createObjectURL(e);r(t)}).catch(function(e){n(e)}):r(e)})}var K=new Map;function Q(e,t){if(!e||!Array.isArray(e)||e.length<2)return t;var r=JSON.stringify(e),n=K.get(r);n||(n=new R(e),K.set(r,n));var{width:a,height:i}=t,o=F();V(o,a,i);var s=G(o);s.drawImage(t,0,0);for(var f=s.getImageData(0,0,a,i),u=f.data,c=0;c<u.length;c+=4){var h=u[c],l=u[c+1],d=u[c+2];if(0===u[c+3])u[c]=0,u[c+1]=0,u[c+2]=0;else{var v=b(h,l,d),[g,p,y,w]=n.getColor(v);u[c]=g,u[c+1]=p,u[c+2]=y,u[c+3]=w}}return s.putImageData(f,0,0),m(t),o.transferToImageBitmap()}var $=function(){};class ee{constructor(e,t){this.max=e,this.onRemove=t||$,this.reset()}reset(){if(this.data){var e=this.data.values();for(var t of e)this.onRemove(t)}return this.data=new Map,this}clear(){this.reset(),delete this.onRemove}add(e,t){return t?(this.has(e)?(this.data.delete(e),this.data.set(e,t),this.data.size>this.max&&this.shrink()):(this.data.set(e,t),this.data.size>this.max&&this.shrink()),this):this}keys(){var e=new Array(this.data.size),t=0,r=this.data.keys();for(var n of r)e[t++]=n;return e}shrink(){for(var e=this.data.keys(),t=e.next();this.data.size>this.max;){var r=this.getAndRemove(t.value);r&&this.onRemove(r),t=e.next()}}has(e){return this.data.has(e)}getAndRemove(e){if(!this.has(e))return null;var t=this.data.get(e);return this.data.delete(e),t}get(e){return this.has(e)?this.data.get(e):null}remove(e){if(!this.has(e))return this;var t=this.data.get(e);return this.data.delete(e),this.onRemove(t),this}setMaxSize(e){return this.max=e,this.data.size>this.max&&this.shrink(),this}}
/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function(){function e(e){throw e}var t=void 0,r=!0,n=this;function a(e,r){var a,i=e.split("."),o=n;!(i[0]in o)&&o.execScript&&o.execScript("var "+i[0]);for(;i.length&&(a=i.shift());)i.length||r===t?o=o[a]?o[a]:o[a]={}:o[a]=r}var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array&&"undefined"!=typeof DataView;function o(t,r){this.index="number"==typeof r?r:0,this.i=0,this.buffer=t instanceof(i?Uint8Array:Array)?t:new(i?Uint8Array:Array)(32768),2*this.buffer.length<=this.index&&e(Error("invalid index")),this.buffer.length<=this.index&&this.f()}o.prototype.f=function(){var e,t=this.buffer,r=t.length,n=new(i?Uint8Array:Array)(r<<1);if(i)n.set(t);else for(e=0;e<r;++e)n[e]=t[e];return this.buffer=n},o.prototype.d=function(e,t,r){var n,a=this.buffer,i=this.index,o=this.i,s=a[i];if(r&&1<t&&(e=8<t?(l[255&e]<<24|l[e>>>8&255]<<16|l[e>>>16&255]<<8|l[e>>>24&255])>>32-t:l[e]>>8-t),8>t+o)s=s<<t|e,o+=t;else for(n=0;n<t;++n)s=s<<1|e>>t-n-1&1,8===++o&&(o=0,a[i++]=l[s],s=0,i===a.length&&(a=this.f()));a[i]=s,this.buffer=a,this.i=o,this.index=i},o.prototype.finish=function(){var e,t=this.buffer,r=this.index;return 0<this.i&&(t[r]<<=8-this.i,t[r]=l[t[r]],r++),i?e=t.subarray(0,r):(t.length=r,e=t),e};var s,f=new(i?Uint8Array:Array)(256);for(s=0;256>s;++s){for(var u=h=s,c=7,h=h>>>1;h;h>>>=1)u<<=1,u|=1&h,--c;f[s]=(u<<c&255)>>>0}var l=f;function d(e){this.buffer=new(i?Uint16Array:Array)(2*e),this.length=0}function v(e){var t,r,n,a,o,s,f,u,c,h,l=e.length,d=0,v=Number.POSITIVE_INFINITY;for(u=0;u<l;++u)e[u]>d&&(d=e[u]),e[u]<v&&(v=e[u]);for(t=1<<d,r=new(i?Uint32Array:Array)(t),n=1,a=0,o=2;n<=d;){for(u=0;u<l;++u)if(e[u]===n){for(s=0,f=a,c=0;c<n;++c)s=s<<1|1&f,f>>=1;for(h=n<<16|u,c=s;c<t;c+=o)r[c]=h;++a}++n,a<<=1,o<<=1}return[r,d,v]}function g(e,t){this.h=m,this.w=0,this.input=i&&e instanceof Array?new Uint8Array(e):e,this.b=0,t&&(t.lazy&&(this.w=t.lazy),"number"==typeof t.compressionType&&(this.h=t.compressionType),t.outputBuffer&&(this.a=i&&t.outputBuffer instanceof Array?new Uint8Array(t.outputBuffer):t.outputBuffer),"number"==typeof t.outputIndex&&(this.b=t.outputIndex)),this.a||(this.a=new(i?Uint8Array:Array)(32768))}d.prototype.getParent=function(e){return 2*((e-2)/4|0)},d.prototype.push=function(e,t){var r,n,a,i=this.buffer;for(r=this.length,i[this.length++]=t,i[this.length++]=e;0<r&&(n=this.getParent(r),i[r]>i[n]);)a=i[r],i[r]=i[n],i[n]=a,a=i[r+1],i[r+1]=i[n+1],i[n+1]=a,r=n;return this.length},d.prototype.pop=function(){var e,t,r,n,a,i=this.buffer;for(t=i[0],e=i[1],this.length-=2,i[0]=i[this.length],i[1]=i[this.length+1],a=0;!((n=2*a+2)>=this.length)&&(n+2<this.length&&i[n+2]>i[n]&&(n+=2),i[n]>i[a]);)r=i[a],i[a]=i[n],i[n]=r,r=i[a+1],i[a+1]=i[n+1],i[n+1]=r,a=n;return{index:e,value:t,length:this.length}};var p,m=2,y={NONE:0,r:1,k:m,N:3},b=[];for(p=0;288>p;p++)switch(r){case 143>=p:b.push([p+48,8]);break;case 255>=p:b.push([p-144+400,9]);break;case 279>=p:b.push([p-256+0,7]);break;case 287>=p:b.push([p-280+192,8]);break;default:e("invalid literal: "+p)}function w(e,t){this.length=e,this.G=t}g.prototype.j=function(){var n,a,s,f,u=this.input;switch(this.h){case 0:for(s=0,f=u.length;s<f;){var c,h,l,d=a=i?u.subarray(s,s+65535):u.slice(s,s+65535),v=(s+=a.length)===f,g=t,p=t,y=this.a,w=this.b;if(i){for(y=new Uint8Array(this.a.buffer);y.length<=w+d.length+5;)y=new Uint8Array(y.length<<1);y.set(this.a)}if(c=v?1:0,y[w++]=0|c,l=65536+~(h=d.length)&65535,y[w++]=255&h,y[w++]=h>>>8&255,y[w++]=255&l,y[w++]=l>>>8&255,i)y.set(d,w),w+=d.length,y=y.subarray(0,w);else{for(g=0,p=d.length;g<p;++g)y[w++]=d[g];y.length=w}this.b=w,this.a=y}break;case 1:var I=new o(i?new Uint8Array(this.a.buffer):this.a,this.b);I.d(1,1,r),I.d(1,2,r);var x,M,S,_=k(this,u);for(x=0,M=_.length;x<M;x++)if(S=_[x],o.prototype.d.apply(I,b[S]),256<S)I.d(_[++x],_[++x],r),I.d(_[++x],5),I.d(_[++x],_[++x],r);else if(256===S)break;this.a=I.finish(),this.b=this.a.length;break;case m:var B,D,U,T,P,N,O,C,z,j,R,F,V,L,G,Y=new o(i?new Uint8Array(this.a.buffer):this.a,this.b),W=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],q=Array(19);for(B=m,Y.d(1,1,r),Y.d(B,2,r),D=k(this,u),O=E(N=A(this.L,15)),z=E(C=A(this.K,7)),U=286;257<U&&0===N[U-1];U--);for(T=30;1<T&&0===C[T-1];T--);var H,X,Z,J,K,Q,$=U,ee=T,te=new(i?Uint32Array:Array)($+ee),re=new(i?Uint32Array:Array)(316),ne=new(i?Uint8Array:Array)(19);for(H=X=0;H<$;H++)te[X++]=N[H];for(H=0;H<ee;H++)te[X++]=C[H];if(!i)for(H=0,J=ne.length;H<J;++H)ne[H]=0;for(H=K=0,J=te.length;H<J;H+=X){for(X=1;H+X<J&&te[H+X]===te[H];++X);if(Z=X,0===te[H])if(3>Z)for(;0<Z--;)re[K++]=0,ne[0]++;else for(;0<Z;)(Q=138>Z?Z:138)>Z-3&&Q<Z&&(Q=Z-3),10>=Q?(re[K++]=17,re[K++]=Q-3,ne[17]++):(re[K++]=18,re[K++]=Q-11,ne[18]++),Z-=Q;else if(re[K++]=te[H],ne[te[H]]++,3>--Z)for(;0<Z--;)re[K++]=te[H],ne[te[H]]++;else for(;0<Z;)(Q=6>Z?Z:6)>Z-3&&Q<Z&&(Q=Z-3),re[K++]=16,re[K++]=Q-3,ne[16]++,Z-=Q}for(n=i?re.subarray(0,K):re.slice(0,K),j=A(ne,7),L=0;19>L;L++)q[L]=j[W[L]];for(P=19;4<P&&0===q[P-1];P--);for(R=E(j),Y.d(U-257,5,r),Y.d(T-1,5,r),Y.d(P-4,4,r),L=0;L<P;L++)Y.d(q[L],3,r);for(L=0,G=n.length;L<G;L++)if(F=n[L],Y.d(R[F],j[F],r),16<=F){switch(L++,F){case 16:V=2;break;case 17:V=3;break;case 18:V=7;break;default:e("invalid code: "+F)}Y.d(n[L],V,r)}var ae,ie,oe,se,fe,ue,ce,he,le=[O,N],de=[z,C];for(fe=le[0],ue=le[1],ce=de[0],he=de[1],ae=0,ie=D.length;ae<ie;++ae)if(oe=D[ae],Y.d(fe[oe],ue[oe],r),256<oe)Y.d(D[++ae],D[++ae],r),se=D[++ae],Y.d(ce[se],he[se],r),Y.d(D[++ae],D[++ae],r);else if(256===oe)break;this.a=Y.finish(),this.b=this.a.length;break;default:e("invalid compression type")}return this.a};var I=function(){function t(t){switch(r){case 3===t:return[257,t-3,0];case 4===t:return[258,t-4,0];case 5===t:return[259,t-5,0];case 6===t:return[260,t-6,0];case 7===t:return[261,t-7,0];case 8===t:return[262,t-8,0];case 9===t:return[263,t-9,0];case 10===t:return[264,t-10,0];case 12>=t:return[265,t-11,1];case 14>=t:return[266,t-13,1];case 16>=t:return[267,t-15,1];case 18>=t:return[268,t-17,1];case 22>=t:return[269,t-19,2];case 26>=t:return[270,t-23,2];case 30>=t:return[271,t-27,2];case 34>=t:return[272,t-31,2];case 42>=t:return[273,t-35,3];case 50>=t:return[274,t-43,3];case 58>=t:return[275,t-51,3];case 66>=t:return[276,t-59,3];case 82>=t:return[277,t-67,4];case 98>=t:return[278,t-83,4];case 114>=t:return[279,t-99,4];case 130>=t:return[280,t-115,4];case 162>=t:return[281,t-131,5];case 194>=t:return[282,t-163,5];case 226>=t:return[283,t-195,5];case 257>=t:return[284,t-227,5];case 258===t:return[285,t-258,0];default:e("invalid length: "+t)}}var n,a,i=[];for(n=3;258>=n;n++)a=t(n),i[n]=a[2]<<24|a[1]<<16|a[0];return i}(),x=i?new Uint32Array(I):I;function k(n,a){function o(t,n){var a,i,o,s,f=t.G,u=[],c=0;switch(a=x[t.length],u[c++]=65535&a,u[c++]=a>>16&255,u[c++]=a>>24,r){case 1===f:i=[0,f-1,0];break;case 2===f:i=[1,f-2,0];break;case 3===f:i=[2,f-3,0];break;case 4===f:i=[3,f-4,0];break;case 6>=f:i=[4,f-5,1];break;case 8>=f:i=[5,f-7,1];break;case 12>=f:i=[6,f-9,2];break;case 16>=f:i=[7,f-13,2];break;case 24>=f:i=[8,f-17,3];break;case 32>=f:i=[9,f-25,3];break;case 48>=f:i=[10,f-33,4];break;case 64>=f:i=[11,f-49,4];break;case 96>=f:i=[12,f-65,5];break;case 128>=f:i=[13,f-97,5];break;case 192>=f:i=[14,f-129,6];break;case 256>=f:i=[15,f-193,6];break;case 384>=f:i=[16,f-257,7];break;case 512>=f:i=[17,f-385,7];break;case 768>=f:i=[18,f-513,8];break;case 1024>=f:i=[19,f-769,8];break;case 1536>=f:i=[20,f-1025,9];break;case 2048>=f:i=[21,f-1537,9];break;case 3072>=f:i=[22,f-2049,10];break;case 4096>=f:i=[23,f-3073,10];break;case 6144>=f:i=[24,f-4097,11];break;case 8192>=f:i=[25,f-6145,11];break;case 12288>=f:i=[26,f-8193,12];break;case 16384>=f:i=[27,f-12289,12];break;case 24576>=f:i=[28,f-16385,13];break;case 32768>=f:i=[29,f-24577,13];break;default:e("invalid distance")}for(a=i,u[c++]=a[0],u[c++]=a[1],u[c++]=a[2],o=0,s=u.length;o<s;++o)m[y++]=u[o];w[u[0]]++,I[u[3]]++,b=t.length+n-1,v=null}var s,f,u,c,h,l,d,v,g,p={},m=i?new Uint16Array(2*a.length):[],y=0,b=0,w=new(i?Uint32Array:Array)(286),I=new(i?Uint32Array:Array)(30),k=n.w;if(!i){for(u=0;285>=u;)w[u++]=0;for(u=0;29>=u;)I[u++]=0}for(w[256]=1,s=0,f=a.length;s<f;++s){for(u=h=0,c=3;u<c&&s+u!==f;++u)h=h<<8|a[s+u];if(p[h]===t&&(p[h]=[]),l=p[h],!(0<b--)){for(;0<l.length&&32768<s-l[0];)l.shift();if(s+3>=f){for(v&&o(v,-1),u=0,c=f-s;u<c;++u)g=a[s+u],m[y++]=g,++w[g];break}0<l.length?(d=M(a,s,l),v?v.length<d.length?(g=a[s-1],m[y++]=g,++w[g],o(d,0)):o(v,-1):d.length<k?v=d:o(d,0)):v?o(v,-1):(g=a[s],m[y++]=g,++w[g])}l.push(s)}return m[y++]=256,w[256]++,n.L=w,n.K=I,i?m.subarray(0,y):m}function M(e,t,r){var n,a,i,o,s,f,u=0,c=e.length;o=0,f=r.length;e:for(;o<f;o++){if(n=r[f-o-1],i=3,3<u){for(s=u;3<s;s--)if(e[n+s-1]!==e[t+s-1])continue e;i=u}for(;258>i&&t+i<c&&e[n+i]===e[t+i];)++i;if(i>u&&(a=n,u=i),258===i)break}return new w(u,t-a)}function A(e,t){var r,n,a,o,s,f=e.length,u=new d(572),c=new(i?Uint8Array:Array)(f);if(!i)for(o=0;o<f;o++)c[o]=0;for(o=0;o<f;++o)0<e[o]&&u.push(o,e[o]);if(r=Array(u.length/2),n=new(i?Uint32Array:Array)(u.length/2),1===r.length)return c[u.pop().index]=1,c;for(o=0,s=u.length/2;o<s;++o)r[o]=u.pop(),n[o]=r[o].value;for(a=function(e,t,r){function n(e){var r=v[e][g[e]];r===t?(n(e+1),n(e+1)):--l[r],++g[e]}var a,o,s,f,u,c=new(i?Uint16Array:Array)(r),h=new(i?Uint8Array:Array)(r),l=new(i?Uint8Array:Array)(t),d=Array(r),v=Array(r),g=Array(r),p=(1<<r)-t,m=1<<r-1;for(c[r-1]=t,o=0;o<r;++o)p<m?h[o]=0:(h[o]=1,p-=m),p<<=1,c[r-2-o]=(c[r-1-o]/2|0)+t;for(c[0]=h[0],d[0]=Array(c[0]),v[0]=Array(c[0]),o=1;o<r;++o)c[o]>2*c[o-1]+h[o]&&(c[o]=2*c[o-1]+h[o]),d[o]=Array(c[o]),v[o]=Array(c[o]);for(a=0;a<t;++a)l[a]=r;for(s=0;s<c[r-1];++s)d[r-1][s]=e[s],v[r-1][s]=s;for(a=0;a<r;++a)g[a]=0;for(1===h[r-1]&&(--l[0],++g[r-1]),o=r-2;0<=o;--o){for(f=a=0,u=g[o+1],s=0;s<c[o];s++)(f=d[o+1][u]+d[o+1][u+1])>e[a]?(d[o][s]=f,v[o][s]=t,u+=2):(d[o][s]=e[a],v[o][s]=a,++a);g[o]=0,1===h[o]&&n(o)}return l}(n,n.length,t),o=0,s=r.length;o<s;++o)c[r[o].index]=a[o];return c}function E(e){var t,r,n,a,o=new(i?Uint16Array:Array)(e.length),s=[],f=[],u=0;for(t=0,r=e.length;t<r;t++)s[e[t]]=1+(0|s[e[t]]);for(t=1,r=16;t<=r;t++)f[t]=u,u+=0|s[t],u<<=1;for(t=0,r=e.length;t<r;t++)for(u=f[e[t]],f[e[t]]+=1,n=o[t]=0,a=e[t];n<a;n++)o[t]=o[t]<<1|1&u,u>>>=1;return o}function S(t,r){switch(this.l=[],this.m=32768,this.e=this.g=this.c=this.q=0,this.input=i?new Uint8Array(t):t,this.s=!1,this.n=B,this.B=!1,!r&&(r={})||(r.index&&(this.c=r.index),r.bufferSize&&(this.m=r.bufferSize),r.bufferType&&(this.n=r.bufferType),r.resize&&(this.B=r.resize)),this.n){case _:this.b=32768,this.a=new(i?Uint8Array:Array)(32768+this.m+258);break;case B:this.b=0,this.a=new(i?Uint8Array:Array)(this.m),this.f=this.J,this.t=this.H,this.o=this.I;break;default:e(Error("invalid inflate mode"))}}var _=0,B=1,D={D:_,C:B};S.prototype.p=function(){for(;!this.s;){var n=Z(this,3);switch(1&n&&(this.s=r),n>>>=1){case 0:var a=this.input,o=this.c,s=this.a,f=this.b,u=a.length,c=t,h=s.length,l=t;switch(this.e=this.g=0,o+1>=u&&e(Error("invalid uncompressed block header: LEN")),c=a[o++]|a[o++]<<8,o+1>=u&&e(Error("invalid uncompressed block header: NLEN")),c===~(a[o++]|a[o++]<<8)&&e(Error("invalid uncompressed block header: length verify")),o+c>a.length&&e(Error("input buffer is broken")),this.n){case _:for(;f+c>s.length;){if(c-=l=h-f,i)s.set(a.subarray(o,o+l),f),f+=l,o+=l;else for(;l--;)s[f++]=a[o++];this.b=f,s=this.f(),f=this.b}break;case B:for(;f+c>s.length;)s=this.f({v:2});break;default:e(Error("invalid inflate mode"))}if(i)s.set(a.subarray(o,o+c),f),f+=c,o+=c;else for(;c--;)s[f++]=a[o++];this.c=o,this.b=f,this.a=s;break;case 1:this.o(q,X);break;case 2:var d,g,p,m,y=Z(this,5)+257,b=Z(this,5)+1,w=Z(this,4)+4,I=new(i?Uint8Array:Array)(N.length),x=t,k=t,M=t,A=t,E=t;for(E=0;E<w;++E)I[N[E]]=Z(this,3);if(!i)for(E=w,w=I.length;E<w;++E)I[N[E]]=0;for(d=v(I),x=new(i?Uint8Array:Array)(y+b),E=0,m=y+b;E<m;)switch(k=J(this,d),k){case 16:for(A=3+Z(this,2);A--;)x[E++]=M;break;case 17:for(A=3+Z(this,3);A--;)x[E++]=0;M=0;break;case 18:for(A=11+Z(this,7);A--;)x[E++]=0;M=0;break;default:M=x[E++]=k}g=v(i?x.subarray(0,y):x.slice(0,y)),p=v(i?x.subarray(y):x.slice(y)),this.o(g,p);break;default:e(Error("unknown BTYPE: "+n))}}return this.t()};var U,T,P=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],N=i?new Uint16Array(P):P,O=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],C=i?new Uint16Array(O):O,z=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],j=i?new Uint8Array(z):z,R=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],F=i?new Uint16Array(R):R,V=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],L=i?new Uint8Array(V):V,G=new(i?Uint8Array:Array)(288);for(U=0,T=G.length;U<T;++U)G[U]=143>=U?8:255>=U?9:279>=U?7:8;var Y,W,q=v(G),H=new(i?Uint8Array:Array)(30);for(Y=0,W=H.length;Y<W;++Y)H[Y]=5;var X=v(H);function Z(t,r){for(var n,a=t.g,i=t.e,o=t.input,s=t.c,f=o.length;i<r;)s>=f&&e(Error("input buffer is broken")),a|=o[s++]<<i,i+=8;return n=a&(1<<r)-1,t.g=a>>>r,t.e=i-r,t.c=s,n}function J(t,r){for(var n,a,i=t.g,o=t.e,s=t.input,f=t.c,u=s.length,c=r[0],h=r[1];o<h&&!(f>=u);)i|=s[f++]<<o,o+=8;return(a=(n=c[i&(1<<h)-1])>>>16)>o&&e(Error("invalid code length: "+a)),t.g=i>>a,t.e=o-a,t.c=f,65535&n}function K(e){if("string"==typeof e){var t,r,n=e.split("");for(t=0,r=n.length;t<r;t++)n[t]=(255&n[t].charCodeAt(0))>>>0;e=n}for(var a,i=1,o=0,s=e.length,f=0;0<s;){s-=a=1024<s?1024:s;do{o+=i+=e[f++]}while(--a);i%=65521,o%=65521}return(o<<16|i)>>>0}function Q(t,r){var n,a;if(this.input=t,this.c=0,!r&&(r={})||(r.index&&(this.c=r.index),r.verify&&(this.M=r.verify)),n=t[this.c++],a=t[this.c++],(15&n)===$)this.method=$;else e(Error("unsupported compression method"));0!=((n<<8)+a)%31&&e(Error("invalid fcheck flag:"+((n<<8)+a)%31)),32&a&&e(Error("fdict flag is not supported")),this.A=new S(t,{index:this.c,bufferSize:r.bufferSize,bufferType:r.bufferType,resize:r.resize})}S.prototype.o=function(e,t){var r=this.a,n=this.b;this.u=e;for(var a,i,o,s,f=r.length-258;256!==(a=J(this,e));)if(256>a)n>=f&&(this.b=n,r=this.f(),n=this.b),r[n++]=a;else for(s=C[i=a-257],0<j[i]&&(s+=Z(this,j[i])),a=J(this,t),o=F[a],0<L[a]&&(o+=Z(this,L[a])),n>=f&&(this.b=n,r=this.f(),n=this.b);s--;)r[n]=r[n++-o];for(;8<=this.e;)this.e-=8,this.c--;this.b=n},S.prototype.I=function(e,t){var r=this.a,n=this.b;this.u=e;for(var a,i,o,s,f=r.length;256!==(a=J(this,e));)if(256>a)n>=f&&(f=(r=this.f()).length),r[n++]=a;else for(s=C[i=a-257],0<j[i]&&(s+=Z(this,j[i])),a=J(this,t),o=F[a],0<L[a]&&(o+=Z(this,L[a])),n+s>f&&(f=(r=this.f()).length);s--;)r[n]=r[n++-o];for(;8<=this.e;)this.e-=8,this.c--;this.b=n},S.prototype.f=function(){var e,t,r=new(i?Uint8Array:Array)(this.b-32768),n=this.b-32768,a=this.a;if(i)r.set(a.subarray(32768,r.length));else for(e=0,t=r.length;e<t;++e)r[e]=a[e+32768];if(this.l.push(r),this.q+=r.length,i)a.set(a.subarray(n,n+32768));else for(e=0;32768>e;++e)a[e]=a[n+e];return this.b=32768,a},S.prototype.J=function(e){var t,r,n,a=this.input.length/this.c+1|0,o=this.input,s=this.a;return e&&("number"==typeof e.v&&(a=e.v),"number"==typeof e.F&&(a+=e.F)),2>a?r=(n=(o.length-this.c)/this.u[2]/2*258|0)<s.length?s.length+n:s.length<<1:r=s.length*a,i?(t=new Uint8Array(r)).set(s):t=s,this.a=t},S.prototype.t=function(){var e,t,r,n,a,o=0,s=this.a,f=this.l,u=new(i?Uint8Array:Array)(this.q+(this.b-32768));if(0===f.length)return i?this.a.subarray(32768,this.b):this.a.slice(32768,this.b);for(t=0,r=f.length;t<r;++t)for(n=0,a=(e=f[t]).length;n<a;++n)u[o++]=e[n];for(t=32768,r=this.b;t<r;++t)u[o++]=s[t];return this.l=[],this.buffer=u},S.prototype.H=function(){var e,t=this.b;return i?this.B?(e=new Uint8Array(t)).set(this.a.subarray(0,t)):e=this.a.subarray(0,t):(this.a.length>t&&(this.a.length=t),e=this.a),this.buffer=e},Q.prototype.p=function(){var t,r=this.input;return t=this.A.p(),this.c=this.A.c,this.M&&((r[this.c++]<<24|r[this.c++]<<16|r[this.c++]<<8|r[this.c++])>>>0!==K(t)&&e(Error("invalid adler-32 checksum"))),t};var $=8;function ee(e,t){this.input=e,this.a=new(i?Uint8Array:Array)(32768),this.h=te.k;var r,n={};for(r in!t&&(t={})||"number"!=typeof t.compressionType||(this.h=t.compressionType),t)n[r]=t[r];n.outputBuffer=this.a,this.z=new g(this.input,n)}var te=y;function re(e,t){var r,n,i,o;if(Object.keys)r=Object.keys(t);else for(n in r=[],i=0,t)r[i++]=n;for(i=0,o=r.length;i<o;++i)a(e+"."+(n=r[i]),t[n])}ee.prototype.j=function(){var t,r,n,a,o,s,f,u=0;if(f=this.a,(t=$)===$)r=Math.LOG2E*Math.log(32768)-8;else e(Error("invalid compression method"));if(n=r<<4|t,f[u++]=n,t===$)switch(this.h){case te.NONE:o=0;break;case te.r:o=1;break;case te.k:o=2;break;default:e(Error("unsupported compression type"))}else e(Error("invalid compression method"));return a=o<<6,f[u++]=a|31-(256*n+a)%31,s=K(this.input),this.z.b=u,u=(f=this.z.j()).length,i&&((f=new Uint8Array(f.buffer)).length<=u+4&&(this.a=new Uint8Array(f.length+4),this.a.set(f),f=this.a),f=f.subarray(0,u+4)),f[u++]=s>>24&255,f[u++]=s>>16&255,f[u++]=s>>8&255,f[u++]=255&s,f},a("Zlib.Inflate",Q),a("Zlib.Inflate.prototype.decompress",Q.prototype.p),re("Zlib.Inflate.BufferType",{ADAPTIVE:D.C,BLOCK:D.D}),a("Zlib.Deflate",ee),a("Zlib.Deflate.compress",function(e,t){return new ee(e,t).j()}),a("Zlib.Deflate.prototype.compress",ee.prototype.j),re("Zlib.Deflate.CompressionType",{NONE:te.NONE,FIXED:te.r,DYNAMIC:te.k})}).call(self);var te="undefined"!=typeof Float32Array?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});var re,ne=function(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e};function ae(e,t,r){return e[0]=t,e[1]=r,e}re=new te(3),te!=Float32Array&&(re[0]=0,re[1]=0,re[2]=0),function(){var e=function(){var e=new te(2);return te!=Float32Array&&(e[0]=0,e[1]=0),e}()}();var ie=[],oe=[],se=[],fe=[],ue=[],ce=[],he=32767,le=64,de=64,ve=3,ge=-1e3,pe=.001,me=256,ye=4,be=.002;function we(e,t,r){return(1-r)*e+r*t}var Ie=new TextDecoder("utf-8");function xe(e){return e>>1^-(1&e)}function ke(e,t,r){var n,a=function(e){if(e.length<1e3)return null;var t=new self.Zlib.Inflate(e);return t?t.decompress():null}(new Uint8Array(e));if(!a)throw new Error((n=new Uint8Array(e),Ie.decode(n)));var i=function(e){for(var t,r,n,a=e,i=le,o=de,s=new Uint8Array(i*o*ye),f=0;f<o;f++)for(var u=0;u<i;u++){((t=a[r=2*(150*parseInt(149*f/(o-1))+parseInt(149*u/(i-1)))]+256*a[r+1])>1e4||t<-2e3)&&(t=0);var c=(t+1e3)/pe,h=me;s[n=4*(f*i+u)]=c/(h*h),s[n+1]=(c-s[n]*h*h)/h,s[n+2]=c-s[n]*h*h-s[n+1]*h,s[n+3]=255}return s}(a),o=function(e,t){for(var r=t,n=t,a=r+1,i=n+1,o=ve,s=ge,f=pe,u=me,c=be,h=new Float32Array(a*i),l=0,d=1/0,v=-1/0,g=0;g<a;g++)for(var p=g>=n?n-1:g,m=0;m<i;m++){for(var y=0,b=p*(4*r)+4*(m>=r?r-1:m),w=0;w<o;w++)y=y*u+e[b+w];y=1*(y*f+s),y-=c,h[l]=y,y<d&&(d=y),y>v&&(v=y),l++}return{data:h,min:d,max:v,width:0,height:0,tileSize:0,image:null}}(i,t-1);return o.width=o.height=t,o.tileSize=r,De(o),o}class Me{constructor(e,t,r,n,a){this.p0=[],this.p1=[],this.p2=[],this.normal=[],this.min=[],this.max=[],this.set(e,t,r,n,a)}set(e,t,r,n,a){this.radius=a;var i=3*t,o=3*t+1,s=3*t+2;this.p0[0]=e[i]*a,this.p0[1]=e[o]*a,this.p0[2]=e[s],i=3*r,o=3*r+1,s=3*r+2,this.p1[0]=e[i]*a,this.p1[1]=e[o]*a,this.p1[2]=e[s],i=3*n,o=3*n+1,s=3*n+2,this.p2[0]=e[i]*a,this.p2[1]=e[o]*a,this.p2[2]=e[s],this.min[0]=Math.min(this.p0[0],this.p1[0],this.p2[0]),this.min[1]=Math.min(this.p0[1],this.p1[1],this.p2[1]),this.max[0]=Math.max(this.p0[0],this.p1[0],this.p2[0]),this.max[1]=Math.max(this.p0[1],this.p1[1],this.p2[1]);var f=ne(ie,this.p1,this.p0),u=ne(oe,this.p2,this.p1);this.normal=function(e,t){var r=t[0],n=t[1],a=t[2],i=r*r+n*n+a*a;return i>0&&(i=1/Math.sqrt(i)),e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e}(this.normal,function(e,t,r){var n=t[0],a=t[1],i=t[2],o=r[0],s=r[1],f=r[2];return e[0]=a*f-i*s,e[1]=i*o-n*f,e[2]=n*s-a*o,e}(this.normal,f,u))}contains(e,t){if(e<this.min[0]||e>this.max[0]||t<this.min[1]||t>this.max[1])return!1;ae(se,this.p0[0],this.p0[1]),ae(fe,this.p1[0],this.p1[1]),ae(ue,this.p2[0],this.p2[1]);var r=Ae(se[0],se[1],fe[0],fe[1],ue[0],ue[1]);return Ae(e,t,se[0],se[1],ue[0],ue[1])+Ae(e,t,se[0],se[1],fe[0],fe[1])+Ae(e,t,fe[0],fe[1],ue[0],ue[1])-r<=1e-4}getHeight(e,t){var r=this.normal;return this.p0[2]-((e-this.p0[0])*r[0]+(t-this.p0[1])*r[1])/r[2]}}function Ae(e,t,r,n,a,i){return.5*Math.abs(e*n+r*i+a*t-e*i-r*t-a*n)}var Ee=null;function Se(e,t,r){if(Ee&&Ee.contains(t,r))return Ee.getHeight(t,r);for(var n=0;n<e.length;n++)if(e[n].contains(t,r))return Ee=e[n],e[n].getHeight(t,r);return 0}var _e=[];function Be(e,t,r){for(var n=function(e){var t=0,r=3,n=Float64Array.BYTES_PER_ELEMENT*r,a=3,i=Uint16Array.BYTES_PER_ELEMENT*a,o=3,s=Uint16Array.BYTES_PER_ELEMENT,f=new DataView(e);t+=n;var u=f.getFloat32(t,!0);t+=Float32Array.BYTES_PER_ELEMENT;var c=f.getFloat32(t,!0);t+=Float32Array.BYTES_PER_ELEMENT,t+=n;var h=f.getFloat64(t,!0);t+=Float64Array.BYTES_PER_ELEMENT,t+=n;var l=f.getUint32(t,!0);t+=Uint32Array.BYTES_PER_ELEMENT;var d=new Uint16Array(e,t,3*l);t+=l*i,l>65536&&(s=Uint32Array.BYTES_PER_ELEMENT);var v=d.subarray(0,l),g=d.subarray(l,2*l),p=d.subarray(2*l,3*l);(function(e,t,r){for(var n=e.length,a=0,i=0,o=0,s=0;s<n;++s)a+=xe(e[s]),i+=xe(t[s]),e[s]=a,t[s]=i,r&&(o+=xe(r[s]),r[s]=o)})(v,g,p),t%s!==0&&(t+=s-t%s);var m=f.getUint32(t,!0);t+=Uint32Array.BYTES_PER_ELEMENT;for(var y=l>65536?new Uint32Array(e,t,m*o):new Uint16Array(e,t,m*o),b=0,w=y.length,I=0;I<w;++I){var x=y[I];y[I]=b-x,0===x&&++b}for(var k={minimumHeight:u,maximumHeight:c,quantizedVertices:d,indices:y}.quantizedVertices,M=k.length/3,A=k.subarray(0,M),E=k.subarray(M,2*M),S=k.subarray(2*M,3*M),_=ce,B=0;B<M;++B){var D=A[B],U=E[B],T=D/he,P=U/he,N=we(u,c,S[B]/he);_[3*B]=T,_[3*B+1]=1-P,_[3*B+2]=N}return{positions:_,radius:h,min:u,max:c,indices:y}}(e),{positions:a,min:i,max:o,indices:s,radius:f}=n,u=[],c=0,h=0;h<s.length;h+=3){var l=_e[c];l?l.set(a,s[h],s[h+1],s[h+2],2*f):l=_e[c]=new Me(a,s[h],s[h+1],s[h+2],2*f),c++,u.push(l)}var d=new Float32Array(t*t);c=0;for(var v=0;v<t;v++)for(var g=0;g<t;g++)d[c++]=Se(u,g/t*f*2,v/t*f*2);var p={data:d,min:i,max:o,width:t,height:t,tileSize:r};return De(p),p}function De(e){var t=F(),{width:r,height:n,data:a,tileSize:i}=e;if(r&&n&&a)try{V(t,r,n);for(var o=G(t),s=o.createImageData(r,n),f=[0,0,0],u=0,c=a.length;u<c;u++){var h=a[u],[l,d,v]=y(h,f),g=4*u;s.data[g]=l,s.data[g+1]=d,s.data[g+2]=v,s.data[g+3]=255}o.putImageData(s,0,0);var p=t.transferToImageBitmap();V(t,i,i),(o=G(t)).drawImage(p,0,0,r,n,0,0,i,i),e.image=t.transferToImageBitmap()}catch(e){console.log(e)}}var Ue,Te={exports:{}};Ue=Te,
/* Copyright 2015 Esri. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 @preserve */
function(){var e,t,r,n,a,i,o,s,f,u,c,h,l,d,v=(e={defaultNoDataValue:-34027999387901484e22,decode:function(i,o){var s=(o=o||{}).encodedMaskData||null===o.encodedMaskData,f=a(i,o.inputOffset||0,s),u=null!==o.noDataValue?o.noDataValue:e.defaultNoDataValue,c=t(f,o.pixelType||Float32Array,o.encodedMaskData,u,o.returnMask),h={width:f.width,height:f.height,pixelData:c.resultPixels,minValue:c.minValue,maxValue:f.pixels.maxValue,noDataValue:u};return c.resultMask&&(h.maskData=c.resultMask),o.returnEncodedMask&&f.mask&&(h.encodedMaskData=f.mask.bitset?f.mask.bitset:null),o.returnFileInfo&&(h.fileInfo=r(f),o.computeUsedBitDepths&&(h.fileInfo.bitDepths=n(f))),h}},t=function(e,t,r,n,a){var o,s,f,u=0,c=e.pixels.numBlocksX,h=e.pixels.numBlocksY,l=Math.floor(e.width/c),d=Math.floor(e.height/h),v=2*e.maxZError,g=Number.MAX_VALUE;r=r||(e.mask?e.mask.bitset:null),s=new t(e.width*e.height),a&&r&&(f=new Uint8Array(e.width*e.height));for(var p,m,y=new Float32Array(l*d),b=0;b<=h;b++){var w=b!==h?d:e.height%h;if(0!==w)for(var I=0;I<=c;I++){var x=I!==c?l:e.width%c;if(0!==x){var k,M,A,E,S=b*e.width*d+I*l,_=e.width-x,B=e.pixels.blocks[u];if(B.encoding<2?(0===B.encoding?k=B.rawData:(i(B.stuffedData,B.bitsPerPixel,B.numValidPixels,B.offset,v,y,e.pixels.maxValue),k=y),M=0):A=2===B.encoding?0:B.offset,r)for(m=0;m<w;m++){for(7&S&&(E=r[S>>3],E<<=7&S),p=0;p<x;p++)7&S||(E=r[S>>3]),128&E?(f&&(f[S]=1),g=g>(o=B.encoding<2?k[M++]:A)?o:g,s[S++]=o):(f&&(f[S]=0),s[S++]=n),E<<=1;S+=_}else if(B.encoding<2)for(m=0;m<w;m++){for(p=0;p<x;p++)g=g>(o=k[M++])?o:g,s[S++]=o;S+=_}else for(g=g>A?A:g,m=0;m<w;m++){for(p=0;p<x;p++)s[S++]=A;S+=_}if(1===B.encoding&&M!==B.numValidPixels)throw"Block and Mask do not match";u++}}}return{resultPixels:s,resultMask:f,minValue:g}},r=function(e){return{fileIdentifierString:e.fileIdentifierString,fileVersion:e.fileVersion,imageType:e.imageType,height:e.height,width:e.width,maxZError:e.maxZError,eofOffset:e.eofOffset,mask:e.mask?{numBlocksX:e.mask.numBlocksX,numBlocksY:e.mask.numBlocksY,numBytes:e.mask.numBytes,maxValue:e.mask.maxValue}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,numBytes:e.pixels.numBytes,maxValue:e.pixels.maxValue,noDataValue:e.noDataValue}}},n=function(e){for(var t=e.pixels.numBlocksX*e.pixels.numBlocksY,r={},n=0;n<t;n++){var a=e.pixels.blocks[n];0===a.encoding?r.float32=!0:1===a.encoding?r[a.bitsPerPixel]=!0:r[0]=!0}return Object.keys(r)},a=function(e,t,r){var n={},a=new Uint8Array(e,t,10);if(n.fileIdentifierString=String.fromCharCode.apply(null,a),"CntZImage"!==n.fileIdentifierString.trim())throw"Unexpected file identifier string: "+n.fileIdentifierString;t+=10;var i=new DataView(e,t,24);if(n.fileVersion=i.getInt32(0,!0),n.imageType=i.getInt32(4,!0),n.height=i.getUint32(8,!0),n.width=i.getUint32(12,!0),n.maxZError=i.getFloat64(16,!0),t+=24,!r)if(i=new DataView(e,t,16),n.mask={},n.mask.numBlocksY=i.getUint32(0,!0),n.mask.numBlocksX=i.getUint32(4,!0),n.mask.numBytes=i.getUint32(8,!0),n.mask.maxValue=i.getFloat32(12,!0),t+=16,n.mask.numBytes>0){var o=new Uint8Array(Math.ceil(n.width*n.height/8)),s=(i=new DataView(e,t,n.mask.numBytes)).getInt16(0,!0),f=2,u=0;do{if(s>0)for(;s--;)o[u++]=i.getUint8(f++);else{var c=i.getUint8(f++);for(s=-s;s--;)o[u++]=c}s=i.getInt16(f,!0),f+=2}while(f<n.mask.numBytes);if(-32768!==s||u<o.length)throw"Unexpected end of mask RLE encoding";n.mask.bitset=o,t+=n.mask.numBytes}else 0===(n.mask.numBytes|n.mask.numBlocksY|n.mask.maxValue)&&(n.mask.bitset=new Uint8Array(Math.ceil(n.width*n.height/8)));i=new DataView(e,t,16),n.pixels={},n.pixels.numBlocksY=i.getUint32(0,!0),n.pixels.numBlocksX=i.getUint32(4,!0),n.pixels.numBytes=i.getUint32(8,!0),n.pixels.maxValue=i.getFloat32(12,!0),t+=16;var h=n.pixels.numBlocksX,l=n.pixels.numBlocksY,d=h+(n.width%h>0?1:0),v=l+(n.height%l>0?1:0);n.pixels.blocks=new Array(d*v);for(var g=0,p=0;p<v;p++)for(var m=0;m<d;m++){var y=0,b=e.byteLength-t;i=new DataView(e,t,Math.min(10,b));var w={};n.pixels.blocks[g++]=w;var I=i.getUint8(0);if(y++,w.encoding=63&I,w.encoding>3)throw"Invalid block encoding ("+w.encoding+")";if(2!==w.encoding){if(0!==I&&2!==I){if(I>>=6,w.offsetType=I,2===I)w.offset=i.getInt8(1),y++;else if(1===I)w.offset=i.getInt16(1,!0),y+=2;else{if(0!==I)throw"Invalid block offset type";w.offset=i.getFloat32(1,!0),y+=4}if(1===w.encoding)if(I=i.getUint8(y),y++,w.bitsPerPixel=63&I,I>>=6,w.numValidPixelsType=I,2===I)w.numValidPixels=i.getUint8(y),y++;else if(1===I)w.numValidPixels=i.getUint16(y,!0),y+=2;else{if(0!==I)throw"Invalid valid pixel count type";w.numValidPixels=i.getUint32(y,!0),y+=4}}var x;if(t+=y,3!==w.encoding)if(0===w.encoding){var k=(n.pixels.numBytes-1)/4;if(k!==Math.floor(k))throw"uncompressed block has invalid length";x=new ArrayBuffer(4*k),new Uint8Array(x).set(new Uint8Array(e,t,4*k));var M=new Float32Array(x);w.rawData=M,t+=4*k}else if(1===w.encoding){var A=Math.ceil(w.numValidPixels*w.bitsPerPixel/8),E=Math.ceil(A/4);x=new ArrayBuffer(4*E),new Uint8Array(x).set(new Uint8Array(e,t,A)),w.stuffedData=new Uint32Array(x),t+=A}}else t++}return n.eofOffset=t,n},i=function(e,t,r,n,a,i,o){var s,f,u,c=(1<<t)-1,h=0,l=0,d=Math.ceil((o-n)/a),v=4*e.length-Math.ceil(t*r/8);for(e[e.length-1]<<=8*v,s=0;s<r;s++){if(0===l&&(u=e[h++],l=32),l>=t)f=u>>>l-t&c,l-=t;else{var g=t-l;f=(u&c)<<g&c,f+=(u=e[h++])>>>(l=32-g)}i[s]=f<d?n+f*a:o}return i},e),g=(o=function(e,t,r,n,a,i,o,s){var f,u,c,h,l,d=(1<<r)-1,v=0,g=0,p=4*e.length-Math.ceil(r*n/8);if(e[e.length-1]<<=8*p,a)for(f=0;f<n;f++)0===g&&(c=e[v++],g=32),g>=r?(u=c>>>g-r&d,g-=r):(u=(c&d)<<(h=r-g)&d,u+=(c=e[v++])>>>(g=32-h)),t[f]=a[u];else for(l=Math.ceil((s-i)/o),f=0;f<n;f++)0===g&&(c=e[v++],g=32),g>=r?(u=c>>>g-r&d,g-=r):(u=(c&d)<<(h=r-g)&d,u+=(c=e[v++])>>>(g=32-h)),t[f]=u<l?i+u*o:s},s=function(e,t,r,n,a,i){var o,s=(1<<t)-1,f=0,u=0,c=0,h=0,l=0,d=[],v=4*e.length-Math.ceil(t*r/8);e[e.length-1]<<=8*v;var g=Math.ceil((i-n)/a);for(u=0;u<r;u++)0===h&&(o=e[f++],h=32),h>=t?(l=o>>>h-t&s,h-=t):(l=(o&s)<<(c=t-h)&s,l+=(o=e[f++])>>>(h=32-c)),d[u]=l<g?n+l*a:i;return d.unshift(n),d},f=function(e,t,r,n,a,i,o,s){var f,u,c,h,l=(1<<r)-1,d=0,v=0,g=0;if(a)for(f=0;f<n;f++)0===v&&(c=e[d++],v=32,g=0),v>=r?(u=c>>>g&l,v-=r,g+=r):(u=c>>>g&l,v=32-(h=r-v),u|=((c=e[d++])&(1<<h)-1)<<r-h,g=h),t[f]=a[u];else{var p=Math.ceil((s-i)/o);for(f=0;f<n;f++)0===v&&(c=e[d++],v=32,g=0),v>=r?(u=c>>>g&l,v-=r,g+=r):(u=c>>>g&l,v=32-(h=r-v),u|=((c=e[d++])&(1<<h)-1)<<r-h,g=h),t[f]=u<p?i+u*o:s}return t},u=function(e,t,r,n,a,i){var o,s=(1<<t)-1,f=0,u=0,c=0,h=0,l=0,d=0,v=[],g=Math.ceil((i-n)/a);for(u=0;u<r;u++)0===h&&(o=e[f++],h=32,d=0),h>=t?(l=o>>>d&s,h-=t,d+=t):(l=o>>>d&s,h=32-(c=t-h),l|=((o=e[f++])&(1<<c)-1)<<t-c,d=c),v[u]=l<g?n+l*a:i;return v.unshift(n),v},c=function(e,t,r,n){var a,i,o,s,f=(1<<r)-1,u=0,c=0,h=4*e.length-Math.ceil(r*n/8);for(e[e.length-1]<<=8*h,a=0;a<n;a++)0===c&&(o=e[u++],c=32),c>=r?(i=o>>>c-r&f,c-=r):(i=(o&f)<<(s=r-c)&f,i+=(o=e[u++])>>>(c=32-s)),t[a]=i;return t},h=function(e,t,r,n){var a,i,o,s,f=(1<<r)-1,u=0,c=0,h=0;for(a=0;a<n;a++)0===c&&(o=e[u++],c=32,h=0),c>=r?(i=o>>>h&f,c-=r,h+=r):(i=o>>>h&f,c=32-(s=r-c),i|=((o=e[u++])&(1<<s)-1)<<r-s,h=s),t[a]=i;return t},l={HUFFMAN_LUT_BITS_MAX:12,computeChecksumFletcher32:function(e){for(var t=65535,r=65535,n=e.length,a=Math.floor(n/2),i=0;a;){var o=a>=359?359:a;a-=o;do{t+=e[i++]<<8,r+=t+=e[i++]}while(--o);t=(65535&t)+(t>>>16),r=(65535&r)+(r>>>16)}return 1&n&&(r+=t+=e[i]<<8),((r=(65535&r)+(r>>>16))<<16|(t=(65535&t)+(t>>>16)))>>>0},readHeaderInfo:function(e,t){var r=t.ptr,n=new Uint8Array(e,r,6),a={};if(a.fileIdentifierString=String.fromCharCode.apply(null,n),0!==a.fileIdentifierString.lastIndexOf("Lerc2",0))throw"Unexpected file identifier string (expect Lerc2 ): "+a.fileIdentifierString;r+=6;var i=new DataView(e,r,52);if(a.fileVersion=i.getInt32(0,!0),r+=4,a.fileVersion>=3&&(a.checksum=i.getUint32(4,!0),r+=4),i=new DataView(e,r,48),a.height=i.getUint32(0,!0),a.width=i.getUint32(4,!0),a.numValidPixel=i.getUint32(8,!0),a.microBlockSize=i.getInt32(12,!0),a.blobSize=i.getInt32(16,!0),a.imageType=i.getInt32(20,!0),a.maxZError=i.getFloat64(24,!0),a.zMin=i.getFloat64(32,!0),a.zMax=i.getFloat64(40,!0),r+=48,t.headerInfo=a,t.ptr=r,a.fileVersion>=3&&this.computeChecksumFletcher32(new Uint8Array(e,r-48,a.blobSize-14))!==a.checksum)throw"Checksum failed.";return!0},readMask:function(e,t){var r,n,a=t.ptr,i=t.headerInfo,o=i.width*i.height,s=i.numValidPixel,f=new DataView(e,a,4),u={};if(u.numBytes=f.getUint32(0,!0),a+=4,(0===s||o===s)&&0!==u.numBytes)throw"invalid mask";if(0===s)r=new Uint8Array(Math.ceil(o/8)),u.bitset=r,n=new Uint8Array(o),t.pixels.resultMask=n,a+=u.numBytes;else if(u.numBytes>0){r=new Uint8Array(Math.ceil(o/8));var c=(f=new DataView(e,a,u.numBytes)).getInt16(0,!0),h=2,l=0,d=0;do{if(c>0)for(;c--;)r[l++]=f.getUint8(h++);else for(d=f.getUint8(h++),c=-c;c--;)r[l++]=d;c=f.getInt16(h,!0),h+=2}while(h<u.numBytes);if(-32768!==c||l<r.length)throw"Unexpected end of mask RLE encoding";n=new Uint8Array(o);var v=0,g=0;for(g=0;g<o;g++)7&g?(v=r[g>>3],v<<=7&g):v=r[g>>3],128&v&&(n[g]=1);t.pixels.resultMask=n,u.bitset=r,a+=u.numBytes}return t.ptr=a,t.mask=u,!0},readDataOneSweep:function(e,t,r){var n,a=t.ptr,i=t.headerInfo,o=i.width*i.height,s=i.imageType,f=i.numValidPixel*l.getDateTypeSize(s);if(r===Uint8Array)n=new Uint8Array(e,a,f);else{var u=new ArrayBuffer(f);new Uint8Array(u).set(new Uint8Array(e,a,f)),n=new r(u)}if(n.length===o)t.pixels.resultPixels=n;else{t.pixels.resultPixels=new r(o);var c=0,h=0;for(h=0;h<o;h++)t.pixels.resultMask[h]&&(t.pixels.resultPixels[h]=n[c++])}return a+=f,t.ptr=a,!0},readHuffman:function(e,t,r){var n=t.headerInfo,a=n.width*n.height,i=this.HUFFMAN_LUT_BITS_MAX,o=new DataView(e,t.ptr,16);if(t.ptr+=16,o.getInt32(0,!0)<2)throw"unsupported Huffman version";var s=o.getInt32(4,!0),f=o.getInt32(8,!0),u=o.getInt32(12,!0);if(f>=u)return!1;var c=new Uint32Array(u-f);l.decodeBits(e,t,c);var h,v,g,p,m=[];for(h=f;h<u;h++)m[v=h-(h<s?0:s)]={first:c[h-f],second:null};var y=e.byteLength-t.ptr,b=Math.ceil(y/4),w=new ArrayBuffer(4*b);new Uint8Array(w).set(new Uint8Array(e,t.ptr,y));var I,x=new Uint32Array(w),k=0,M=0;for(I=x[0],h=f;h<u;h++)(p=m[v=h-(h<s?0:s)].first)>0&&(m[v].second=I<<k>>>32-p,32-k>=p?32===(k+=p)&&(k=0,I=x[++M]):(k+=p-32,I=x[++M],m[v].second|=I>>>32-k));var A=0===t.headerInfo.imageType?128:0,E=t.headerInfo.height,S=t.headerInfo.width,_=0,B=0,D=new d;for(h=0;h<m.length;h++)void 0!==m[h]&&(_=Math.max(_,m[h].first));B=_>=i?i:_,_>=30&&console.log("WARning, large NUM LUT BITS IS "+_);var U,T,P,N,O,C=[];for(h=f;h<u;h++)if((p=m[v=h-(h<s?0:s)].first)>0)if(U=[p,v],p<=B)for(T=m[v].second<<B-p,P=1<<B-p,g=0;g<P;g++)C[T|g]=U;else for(T=m[v].second,O=D,N=p-1;N>=0;N--)T>>>N&1?(O.right||(O.right=new d),O=O.right):(O.left||(O.left=new d),O=O.left),0!==N||O.val||(O.val=U[1]);var z,j,R,F,V=t.pixels.resultMask,L=0,G=0;k>0&&(M++,k=0),I=x[M];var Y=new r(a);if(t.headerInfo.numValidPixel===S*E)for(g=0,h=0;h<E;h++)for(v=0;v<S;v++,g++){if(z=0,F=R=I<<k>>>32-B,32-k<B&&(F=R|=x[M+1]>>>64-k-B),C[F])z=C[F][1],k+=C[F][0];else for(F=R=I<<k>>>32-_,32-k<_&&(F=R|=x[M+1]>>>64-k-_),O=D,G=0;G<_;G++)if(!(O=R>>>_-G-1&1?O.right:O.left).left&&!O.right){z=O.val,k=k+G+1;break}k>=32&&(k-=32,I=x[++M]),j=z-A,j+=v>0?L:h>0?Y[g-S]:L,j&=255,Y[g]=j,L=j}else for(g=0,h=0;h<E;h++)for(v=0;v<S;v++,g++)if(V[g]){if(z=0,F=R=I<<k>>>32-B,32-k<B&&(F=R|=x[M+1]>>>64-k-B),C[F])z=C[F][1],k+=C[F][0];else for(F=R=I<<k>>>32-_,32-k<_&&(F=R|=x[M+1]>>>64-k-_),O=D,G=0;G<_;G++)if(!(O=R>>>_-G-1&1?O.right:O.left).left&&!O.right){z=O.val,k=k+G+1;break}k>=32&&(k-=32,I=x[++M]),j=z-A,v>0&&V[g-1]?j+=L:h>0&&V[g-S]?j+=Y[g-S]:j+=L,j&=255,Y[g]=j,L=j}t.pixels.resultPixels=Y,t.ptr=t.ptr+4*(M+1)+(k>0?4:0)},decodeBits:function(e,t,r,n){var a=t.headerInfo.fileVersion,i=0,l=new DataView(e,t.ptr,5),d=l.getUint8(0);i++;var v=d>>6,g=0===v?4:3-v,p=(32&d)>0,m=31&d,y=0;if(1===g)y=l.getUint8(i),i++;else if(2===g)y=l.getUint16(i,!0),i+=2;else{if(4!==g)throw"Invalid valid pixel count type";y=l.getUint32(i,!0),i+=4}var b,w,I,x,k,M,A,E,S,_=2*t.headerInfo.maxZError;if(p){for(t.counter.lut++,E=l.getUint8(i),i++,x=Math.ceil((E-1)*m/8),k=Math.ceil(x/4),w=new ArrayBuffer(4*k),I=new Uint8Array(w),t.ptr+=i,I.set(new Uint8Array(e,t.ptr,x)),A=new Uint32Array(w),t.ptr+=x,S=0;E-1>>>S;)S++;x=Math.ceil(y*S/8),k=Math.ceil(x/4),w=new ArrayBuffer(4*k),(I=new Uint8Array(w)).set(new Uint8Array(e,t.ptr,x)),b=new Uint32Array(w),t.ptr+=x,M=a>=3?u(A,m,E-1,n,_,t.headerInfo.zMax):s(A,m,E-1,n,_,t.headerInfo.zMax),a>=3?f(b,r,S,y,M):o(b,r,S,y,M)}else t.counter.bitstuffer++,S=m,t.ptr+=i,S>0&&(x=Math.ceil(y*S/8),k=Math.ceil(x/4),w=new ArrayBuffer(4*k),(I=new Uint8Array(w)).set(new Uint8Array(e,t.ptr,x)),b=new Uint32Array(w),t.ptr+=x,a>=3?null==n?h(b,r,S,y):f(b,r,S,y,!1,n,_,t.headerInfo.zMax):null==n?c(b,r,S,y):o(b,r,S,y,!1,n,_,t.headerInfo.zMax))},readTiles:function(e,t,r){var n=t.headerInfo,a=n.width,i=n.height,o=n.microBlockSize,s=n.imageType,f=Math.ceil(a/o),u=Math.ceil(i/o);t.pixels.numBlocksY=u,t.pixels.numBlocksX=f,t.pixels.ptr=0;var c,h,d,v,g,p,m,y=0,b=0,w=0,I=0,x=0,k=0,M=0,A=0,E=0,S=0,_=0,B=0,D=0,U=0,T=0,P=new r(o*o),N=i%o||o,O=a%o||o;for(w=0;w<u;w++)for(x=w!==u-1?o:N,I=0;I<f;I++){if(S=w*a*o+I*o,_=a-(k=I!==f-1?o:O),M=e.byteLength-t.ptr,h={},T=0,T++,E=(A=(c=new DataView(e,t.ptr,Math.min(10,M))).getUint8(0))>>6&255,(A>>2&15)!=(I*o>>3&15))throw"integrity issue";if((g=3&A)>3)throw t.ptr+=T,"Invalid block encoding ("+g+")";if(2!==g)if(0===g){if(t.counter.uncompressed++,t.ptr+=T,B=(B=x*k*l.getDateTypeSize(s))<(D=e.byteLength-t.ptr)?B:D,d=new ArrayBuffer(B),new Uint8Array(d).set(new Uint8Array(e,t.ptr,B)),v=new r(d),U=0,t.pixels.resultMask)for(y=0;y<x;y++){for(b=0;b<k;b++)t.pixels.resultMask[S]&&(t.pixels.resultPixels[S]=v[U++]),S++;S+=_}else for(y=0;y<x;y++){for(b=0;b<k;b++)t.pixels.resultPixels[S++]=v[U++];S+=_}t.ptr+=U*l.getDateTypeSize(s)}else if(p=l.getDataTypeUsed(s,E),m=l.getOnePixel(h,T,p,c),T+=l.getDateTypeSize(p),3===g)if(t.ptr+=T,t.counter.constantoffset++,t.pixels.resultMask)for(y=0;y<x;y++){for(b=0;b<k;b++)t.pixels.resultMask[S]&&(t.pixels.resultPixels[S]=m),S++;S+=_}else for(y=0;y<x;y++){for(b=0;b<k;b++)t.pixels.resultPixels[S++]=m;S+=_}else if(t.ptr+=T,l.decodeBits(e,t,P,m),T=0,t.pixels.resultMask)for(y=0;y<x;y++){for(b=0;b<k;b++)t.pixels.resultMask[S]&&(t.pixels.resultPixels[S]=P[T++]),S++;S+=_}else for(y=0;y<x;y++){for(b=0;b<k;b++)t.pixels.resultPixels[S++]=P[T++];S+=_}else t.counter.constant++,t.ptr+=T}},formatFileInfo:function(e){return{fileIdentifierString:e.headerInfo.fileIdentifierString,fileVersion:e.headerInfo.fileVersion,imageType:e.headerInfo.imageType,height:e.headerInfo.height,width:e.headerInfo.width,numValidPixel:e.headerInfo.numValidPixel,microBlockSize:e.headerInfo.microBlockSize,blobSize:e.headerInfo.blobSize,maxZError:e.headerInfo.maxZError,pixelType:l.getPixelType(e.headerInfo.imageType),eofOffset:e.eofOffset,mask:e.mask?{numBytes:e.mask.numBytes}:null,pixels:{numBlocksX:e.pixels.numBlocksX,numBlocksY:e.pixels.numBlocksY,maxValue:e.headerInfo.zMax,minValue:e.headerInfo.zMin,noDataValue:e.noDataValue}}},constructConstantSurface:function(e){var t=e.headerInfo.zMax,r=e.headerInfo.height*e.headerInfo.width,n=0;if(e.pixels.resultMask)for(n=0;n<r;n++)e.pixels.resultMask[n]&&(e.pixels.resultPixels[n]=t);else for(n=0;n<r;n++)e.pixels.resultPixels[n]=t},getDataTypeArray:function(e){var t;switch(e){case 0:t=Int8Array;break;case 1:t=Uint8Array;break;case 2:t=Int16Array;break;case 3:t=Uint16Array;break;case 4:t=Int32Array;break;case 5:t=Uint32Array;break;case 6:default:t=Float32Array;break;case 7:t=Float64Array}return t},getPixelType:function(e){var t;switch(e){case 0:t="S8";break;case 1:t="U8";break;case 2:t="S16";break;case 3:t="U16";break;case 4:t="S32";break;case 5:t="U32";break;case 6:default:t="F32";break;case 7:t="F64"}return t},isValidPixelValue:function(e,t){if(null==t)return!1;var r;switch(e){case 0:r=t>=-128&&t<=127;break;case 1:r=t>=0&&t<=255;break;case 2:r=t>=-32768&&t<=32767;break;case 3:r=t>=0&&t<=65536;break;case 4:r=t>=-2147483648&&t<=2147483647;break;case 5:r=t>=0&&t<=4294967296;break;case 6:r=t>=-34027999387901484e22&&t<=34027999387901484e22;break;case 7:r=t>=5e-324&&t<=17976931348623157e292;break;default:r=!1}return r},getDateTypeSize:function(e){var t=0;switch(e){case 0:case 1:t=1;break;case 2:case 3:t=2;break;case 4:case 5:case 6:t=4;break;case 7:t=8;break;default:t=e}return t},getDataTypeUsed:function(e,t){var r=e;switch(e){case 2:case 4:r=e-t;break;case 3:case 5:r=e-2*t;break;case 6:r=0===t?e:1===t?2:1;break;case 7:r=0===t?e:e-2*t+1;break;default:r=e}return r},getOnePixel:function(e,t,r,n){var a=0;switch(r){case 0:a=n.getInt8(t);break;case 1:a=n.getUint8(t);break;case 2:a=n.getInt16(t,!0);break;case 3:a=n.getUint16(t,!0);break;case 4:a=n.getInt32(t,!0);break;case 5:a=n.getUInt32(t,!0);break;case 6:a=n.getFloat32(t,!0);break;case 7:a=n.getFloat64(t,!0);break;default:throw"the decoder does not understand this pixel type"}return a}},d=function(e,t,r){this.val=e,this.left=t,this.right=r},{decode:function(e,t){var r=(t=t||{}).maskData||null===t.maskData,n=t.noDataValue,a=0,i={};i.ptr=t.inputOffset||0,i.pixels={},l.readHeaderInfo(e,i);var o=i.headerInfo,s=l.getDataTypeArray(o.imageType);r?(i.pixels.resultMask=t.maskData,i.ptr+=4):l.readMask(e,i);var f,u=o.width*o.height;if(i.pixels.resultPixels=new s(u),i.counter={onesweep:0,uncompressed:0,lut:0,bitstuffer:0,constant:0,constantoffset:0},0!==o.numValidPixel)if(o.zMax===o.zMin)l.constructConstantSurface(i);else{var c=new DataView(e,i.ptr,2),h=c.getUint8(0,!0);if(i.ptr++,h)l.readDataOneSweep(e,i,s);else if(o.fileVersion>1&&o.imageType<=1&&Math.abs(o.maxZError-.5)<1e-5){var d=c.getUint8(1,!0);i.ptr++,d?l.readHuffman(e,i,s):l.readTiles(e,i,s)}else l.readTiles(e,i,s)}i.eofOffset=i.ptr,t.inputOffset?(f=i.headerInfo.blobSize+t.inputOffset-i.ptr,Math.abs(f)>=1&&(i.eofOffset=t.inputOffset+i.headerInfo.blobSize)):(f=i.headerInfo.blobSize-i.ptr,Math.abs(f)>=1&&(i.eofOffset=i.headerInfo.blobSize));var v={width:o.width,height:o.height,pixelData:i.pixels.resultPixels,minValue:o.zMin,maxValue:o.zMax,maskData:i.pixels.resultMask};if(i.pixels.resultMask&&l.isValidPixelValue(o.imageType,n)){var g=i.pixels.resultMask;for(a=0;a<u;a++)g[a]||(v.pixelData[a]=n);v.noDataValue=n}return i.noDataValue=n,t.returnFileInfo&&(v.fileInfo=l.formatFileInfo(i)),v},getBandCount:function(e){for(var t=0,r=0,n={ptr:0,pixels:{}};r<e.byteLength-58;)l.readHeaderInfo(e,n),r+=n.headerInfo.blobSize,t++,n.ptr=r;return t}}),p={decode:function(e,t){var r,n=(t=t||{}).inputOffset||0,a=new Uint8Array(e,n,10),i=String.fromCharCode.apply(null,a);if("CntZImage"===i.trim())r=v;else{if("Lerc2"!==i.substring(0,5))throw"Unexpected file identifier string: "+i;r=g}for(var o,s,f=0,u=e.byteLength-10,c={width:0,height:0,pixels:[],pixelType:t.pixelType,mask:null,statistics:[]};n<u;){var h=r.decode(e,{inputOffset:n,encodedMaskData:o,maskData:s,returnMask:0===f,returnEncodedMask:0===f,returnFileInfo:!0,pixelType:t.pixelType||null,noDataValue:t.noDataValue||null});n=h.fileInfo.eofOffset,0===f&&(o=h.encodedMaskData,s=h.maskData,c.width=h.width,c.height=h.height,c.pixelType=h.pixelType||h.fileInfo.pixelType,c.mask=h.maskData),f++,c.pixels.push(h.pixelData),c.statistics.push({minValue:h.minValue,maxValue:h.maxValue,noDataValue:h.noDataValue})}return c}};Ue.exports?Ue.exports=p:this.Lerc=p}();var Pe={exports:{}};!function(e){e.exports=function e(t,r,n){function a(o,s){if(!r[o]){if(!t[o]){if(!s&&U)return U(o);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var u=r[o]={exports:{}};t[o][0].call(u.exports,function(e){var r=t[o][1][e];return a(r||e)},u,u.exports,e,t,r,n)}return r[o].exports}for(var i=U,o=0;o<n.length;o++)a(n[o]);return a}({1:[function(e,t,r){(function(e){var r,n,a=e.MutationObserver||e.WebKitMutationObserver;if(a){var i=0,o=new a(c),s=e.document.createTextNode("");o.observe(s,{characterData:!0}),r=function(){s.data=i=++i%2}}else if(e.setImmediate||void 0===e.MessageChannel)r="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){c(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(c,0)};else{var f=new e.MessageChannel;f.port1.onmessage=c,r=function(){f.port2.postMessage(0)}}var u=[];function c(){var e,t;n=!0;for(var r=u.length;r;){for(t=u,u=[],e=-1;++e<r;)t[e]();r=u.length}n=!1}function h(e){1!==u.push(e)||n||r()}t.exports=h}).call(this,void 0!==D?D:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,r){var n=e(1);function a(){}var i={},o=["REJECTED"],s=["FULFILLED"],f=["PENDING"];function u(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=f,this.queue=[],this.outcome=void 0,e!==a&&d(this,e)}function c(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function h(e,t,r){n(function(){var n;try{n=t(r)}catch(t){return i.reject(e,t)}n===e?i.reject(e,new TypeError("Cannot resolve promise with itself")):i.resolve(e,n)})}function l(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(e,t){var r=!1;function n(t){r||(r=!0,i.reject(e,t))}function a(t){r||(r=!0,i.resolve(e,t))}function o(){t(a,n)}var s=v(o);"error"===s.status&&n(s.value)}function v(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}function g(e){return e instanceof this?e:i.resolve(new this(a),e)}function p(e){var t=new this(a);return i.reject(t,e)}function m(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);for(var o=new Array(r),s=0,f=-1,u=new this(a);++f<r;)c(e[f],f);return u;function c(e,a){function f(e){o[a]=e,++s!==r||n||(n=!0,i.resolve(u,o))}t.resolve(e).then(f,function(e){n||(n=!0,i.reject(u,e))})}}function y(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);for(var o=-1,s=new this(a);++o<r;)f(e[o]);return s;function f(e){t.resolve(e).then(function(e){n||(n=!0,i.resolve(s,e))},function(e){n||(n=!0,i.reject(s,e))})}}t.exports=u,u.prototype.catch=function(e){return this.then(null,e)},u.prototype.then=function(e,t){if("function"!=typeof e&&this.state===s||"function"!=typeof t&&this.state===o)return this;var r=new this.constructor(a);return this.state!==f?h(r,this.state===s?e:t,this.outcome):this.queue.push(new c(r,e,t)),r},c.prototype.callFulfilled=function(e){i.resolve(this.promise,e)},c.prototype.otherCallFulfilled=function(e){h(this.promise,this.onFulfilled,e)},c.prototype.callRejected=function(e){i.reject(this.promise,e)},c.prototype.otherCallRejected=function(e){h(this.promise,this.onRejected,e)},i.resolve=function(e,t){var r=v(l,t);if("error"===r.status)return i.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=s,e.outcome=t;for(var a=-1,o=e.queue.length;++a<o;)e.queue[a].callFulfilled(t)}return e},i.reject=function(e,t){e.state=o,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},u.resolve=g,u.reject=p,u.all=m,u.race=y},{1:1}],3:[function(e,t,r){(function(t){"function"!=typeof t.Promise&&(t.Promise=e(2))}).call(this,void 0!==D?D:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(e,t,r){var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(e){return}}var o=i();function s(){try{if(!o||!o.open)return!1;var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code");return(!e||t)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return!1}}function f(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(a){if("TypeError"!==a.name)throw a;for(var r=new("undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder),n=0;n<e.length;n+=1)r.append(e[n]);return r.getBlob(t.type)}}"undefined"==typeof Promise&&e(3);var u=Promise;function c(e,t){t&&e.then(function(e){t(null,e)},function(e){t(e)})}function h(e,t,r){"function"==typeof t&&e.then(t),"function"==typeof r&&e.catch(r)}function l(e){return"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function d(){if(arguments.length&&"function"==typeof arguments[arguments.length-1])return arguments[arguments.length-1]}var v="local-forage-detect-blob-support",g=void 0,p={},m=Object.prototype.toString,y="readonly",b="readwrite";function w(e){for(var t=e.length,r=new ArrayBuffer(t),n=new Uint8Array(r),a=0;a<t;a++)n[a]=e.charCodeAt(a);return r}function I(e){return new u(function(t){var r=e.transaction(v,b),n=f([""]);r.objectStore(v).put(n,"key"),r.onabort=function(e){e.preventDefault(),e.stopPropagation(),t(!1)},r.oncomplete=function(){var e=navigator.userAgent.match(/Chrome/),r=navigator.userAgent.match(/Edge/);t(r||!e||parseInt(e[1],10)>=43)}}).catch(function(){return!1})}function x(e){return"boolean"==typeof g?u.resolve(g):I(e).then(function(e){return g=e})}function k(e){var t=p[e.name],r={};r.promise=new u(function(e,t){r.resolve=e,r.reject=t}),t.deferredOperations.push(r),t.dbReady?t.dbReady=t.dbReady.then(function(){return r.promise}):t.dbReady=r.promise}function M(e){var t=p[e.name].deferredOperations.pop();if(t)return t.resolve(),t.promise}function A(e,t){var r=p[e.name].deferredOperations.pop();if(r)return r.reject(t),r.promise}function E(e,t){return new u(function(r,n){if(p[e.name]=p[e.name]||C(),e.db){if(!t)return r(e.db);k(e),e.db.close()}var a=[e.name];t&&a.push(e.version);var i=o.open.apply(o,a);t&&(i.onupgradeneeded=function(t){var r=i.result;try{r.createObjectStore(e.storeName),t.oldVersion<=1&&r.createObjectStore(v)}catch(e){if("ConstraintError"!==e.name)throw e}}),i.onerror=function(e){e.preventDefault(),n(i.error)},i.onsuccess=function(){var t=i.result;t.onversionchange=function(e){e.target.close()},r(t),M(e)}})}function S(e){return E(e,!1)}function _(e){return E(e,!0)}function B(e,t){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),n=e.version<e.db.version,a=e.version>e.db.version;if(n&&(e.version,e.version=e.db.version),a||r){if(r){var i=e.db.version+1;i>e.version&&(e.version=i)}return!0}return!1}function D(e){return new u(function(t,r){var n=new FileReader;n.onerror=r,n.onloadend=function(r){var n=btoa(r.target.result||"");t({__local_forage_encoded_blob:!0,data:n,type:e.type})},n.readAsBinaryString(e)})}function U(e){return f([w(atob(e.data))],{type:e.type})}function T(e){return e&&e.__local_forage_encoded_blob}function P(e){var t=this,r=t._initReady().then(function(){var e=p[t._dbInfo.name];if(e&&e.dbReady)return e.dbReady});return h(r,e,e),r}function N(e){k(e);for(var t=p[e.name],r=t.forages,n=0;n<r.length;n++){var a=r[n];a._dbInfo.db&&(a._dbInfo.db.close(),a._dbInfo.db=null)}return e.db=null,S(e).then(function(t){return e.db=t,B(e)?_(e):t}).then(function(n){e.db=t.db=n;for(var a=0;a<r.length;a++)r[a]._dbInfo.db=n}).catch(function(t){throw A(e,t),t})}function O(e,t,r,n){void 0===n&&(n=1);try{var a=e.db.transaction(e.storeName,t);r(null,a)}catch(a){if(n>0&&(!e.db||"InvalidStateError"===a.name||"NotFoundError"===a.name))return u.resolve().then(function(){if(!e.db||"NotFoundError"===a.name&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),_(e)}).then(function(){return N(e).then(function(){O(e,t,r,n-1)})}).catch(r);r(a)}}function C(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function z(e){var t=this,r={db:null};if(e)for(var n in e)r[n]=e[n];var a=p[r.name];a||(a=C(),p[r.name]=a),a.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=P);var i=[];function o(){return u.resolve()}for(var s=0;s<a.forages.length;s++){var f=a.forages[s];f!==t&&i.push(f._initReady().catch(o))}var c=a.forages.slice(0);return u.all(i).then(function(){return r.db=a.db,S(r)}).then(function(e){return r.db=e,B(r,t._defaultConfig.version)?_(r):e}).then(function(e){r.db=a.db=e,t._dbInfo=r;for(var n=0;n<c.length;n++){var i=c[n];i!==t&&(i._dbInfo.db=r.db,i._dbInfo.version=r.version)}})}function j(e,t){var r=this;e=l(e);var n=new u(function(t,n){r.ready().then(function(){O(r._dbInfo,y,function(a,i){if(a)return n(a);try{var o=i.objectStore(r._dbInfo.storeName).get(e);o.onsuccess=function(){var e=o.result;void 0===e&&(e=null),T(e)&&(e=U(e)),t(e)},o.onerror=function(){n(o.error)}}catch(e){n(e)}})}).catch(n)});return c(n,t),n}function R(e,t){var r=this,n=new u(function(t,n){r.ready().then(function(){O(r._dbInfo,y,function(a,i){if(a)return n(a);try{var o=i.objectStore(r._dbInfo.storeName).openCursor(),s=1;o.onsuccess=function(){var r=o.result;if(r){var n=r.value;T(n)&&(n=U(n));var a=e(n,r.key,s++);void 0!==a?t(a):r.continue()}else t()},o.onerror=function(){n(o.error)}}catch(e){n(e)}})}).catch(n)});return c(n,t),n}function F(e,t,r){var n=this;e=l(e);var a=new u(function(r,a){var i;n.ready().then(function(){return i=n._dbInfo,"[object Blob]"===m.call(t)?x(i.db).then(function(e){return e?t:D(t)}):t}).then(function(t){O(n._dbInfo,b,function(i,o){if(i)return a(i);try{var s=o.objectStore(n._dbInfo.storeName);null===t&&(t=void 0);var f=s.put(t,e);o.oncomplete=function(){void 0===t&&(t=null),r(t)},o.onabort=o.onerror=function(){var e=f.error?f.error:f.transaction.error;a(e)}}catch(e){a(e)}})}).catch(a)});return c(a,r),a}function V(e,t){var r=this;e=l(e);var n=new u(function(t,n){r.ready().then(function(){O(r._dbInfo,b,function(a,i){if(a)return n(a);try{var o=i.objectStore(r._dbInfo.storeName).delete(e);i.oncomplete=function(){t()},i.onerror=function(){n(o.error)},i.onabort=function(){var e=o.error?o.error:o.transaction.error;n(e)}}catch(e){n(e)}})}).catch(n)});return c(n,t),n}function L(e){var t=this,r=new u(function(e,r){t.ready().then(function(){O(t._dbInfo,b,function(n,a){if(n)return r(n);try{var i=a.objectStore(t._dbInfo.storeName).clear();a.oncomplete=function(){e()},a.onabort=a.onerror=function(){var e=i.error?i.error:i.transaction.error;r(e)}}catch(e){r(e)}})}).catch(r)});return c(r,e),r}function G(e){var t=this,r=new u(function(e,r){t.ready().then(function(){O(t._dbInfo,y,function(n,a){if(n)return r(n);try{var i=a.objectStore(t._dbInfo.storeName).count();i.onsuccess=function(){e(i.result)},i.onerror=function(){r(i.error)}}catch(e){r(e)}})}).catch(r)});return c(r,e),r}function Y(e,t){var r=this,n=new u(function(t,n){e<0?t(null):r.ready().then(function(){O(r._dbInfo,y,function(a,i){if(a)return n(a);try{var o=i.objectStore(r._dbInfo.storeName),s=!1,f=o.openKeyCursor();f.onsuccess=function(){var r=f.result;r?0===e||s?t(r.key):(s=!0,r.advance(e)):t(null)},f.onerror=function(){n(f.error)}}catch(e){n(e)}})}).catch(n)});return c(n,t),n}function W(e){var t=this,r=new u(function(e,r){t.ready().then(function(){O(t._dbInfo,y,function(n,a){if(n)return r(n);try{var i=a.objectStore(t._dbInfo.storeName).openKeyCursor(),o=[];i.onsuccess=function(){var t=i.result;t?(o.push(t.key),t.continue()):e(o)},i.onerror=function(){r(i.error)}}catch(e){r(e)}})}).catch(r)});return c(r,e),r}function q(e,t){t=d.apply(this,arguments);var r=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var n,a=this;if(e.name){var i=e.name===r.name&&a._dbInfo.db?u.resolve(a._dbInfo.db):S(e).then(function(t){var r=p[e.name],n=r.forages;r.db=t;for(var a=0;a<n.length;a++)n[a]._dbInfo.db=t;return t});n=e.storeName?i.then(function(t){if(t.objectStoreNames.contains(e.storeName)){var r=t.version+1;k(e);var n=p[e.name],a=n.forages;t.close();for(var i=0;i<a.length;i++){var s=a[i];s._dbInfo.db=null,s._dbInfo.version=r}var f=new u(function(t,n){var a=o.open(e.name,r);a.onerror=function(e){a.result.close(),n(e)},a.onupgradeneeded=function(){a.result.deleteObjectStore(e.storeName)},a.onsuccess=function(){var e=a.result;e.close(),t(e)}});return f.then(function(e){n.db=e;for(var t=0;t<a.length;t++){var r=a[t];r._dbInfo.db=e,M(r._dbInfo)}}).catch(function(t){throw(A(e,t)||u.resolve()).catch(function(){}),t})}}):i.then(function(t){k(e);var r=p[e.name],n=r.forages;t.close();for(var a=0;a<n.length;a++)n[a]._dbInfo.db=null;var i=new u(function(t,r){var n=o.deleteDatabase(e.name);n.onerror=function(){var e=n.result;e&&e.close(),r(n.error)},n.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},n.onsuccess=function(){var e=n.result;e&&e.close(),t(e)}});return i.then(function(e){r.db=e;for(var t=0;t<n.length;t++)M(n[t]._dbInfo)}).catch(function(t){throw(A(e,t)||u.resolve()).catch(function(){}),t})})}else n=u.reject("Invalid arguments");return c(n,t),n}var H={_driver:"asyncStorage",_initStorage:z,_support:s(),iterate:R,getItem:j,setItem:F,removeItem:V,clear:L,length:G,key:Y,keys:W,dropInstance:q};function X(){return"function"==typeof openDatabase}var Z="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",J="~~local_forage_type~",K=/^~~local_forage_type~([^~]+)~/,Q="__lfsc__:",$=Q.length,ee="arbf",te="blob",re="si08",ne="ui08",ae="uic8",ie="si16",oe="si32",se="ur16",fe="ui32",ue="fl32",ce="fl64",he=$+ee.length,le=Object.prototype.toString;function de(e){var t,r,n,a,i,o=.75*e.length,s=e.length,f=0;"="===e[e.length-1]&&(o--,"="===e[e.length-2]&&o--);var u=new ArrayBuffer(o),c=new Uint8Array(u);for(t=0;t<s;t+=4)r=Z.indexOf(e[t]),n=Z.indexOf(e[t+1]),a=Z.indexOf(e[t+2]),i=Z.indexOf(e[t+3]),c[f++]=r<<2|n>>4,c[f++]=(15&n)<<4|a>>2,c[f++]=(3&a)<<6|63&i;return u}function ve(e){var t,r=new Uint8Array(e),n="";for(t=0;t<r.length;t+=3)n+=Z[r[t]>>2],n+=Z[(3&r[t])<<4|r[t+1]>>4],n+=Z[(15&r[t+1])<<2|r[t+2]>>6],n+=Z[63&r[t+2]];return r.length%3==2?n=n.substring(0,n.length-1)+"=":r.length%3==1&&(n=n.substring(0,n.length-2)+"=="),n}function ge(e,t){var r="";if(e&&(r=le.call(e)),e&&("[object ArrayBuffer]"===r||e.buffer&&"[object ArrayBuffer]"===le.call(e.buffer))){var n,a=Q;e instanceof ArrayBuffer?(n=e,a+=ee):(n=e.buffer,"[object Int8Array]"===r?a+=re:"[object Uint8Array]"===r?a+=ne:"[object Uint8ClampedArray]"===r?a+=ae:"[object Int16Array]"===r?a+=ie:"[object Uint16Array]"===r?a+=se:"[object Int32Array]"===r?a+=oe:"[object Uint32Array]"===r?a+=fe:"[object Float32Array]"===r?a+=ue:"[object Float64Array]"===r?a+=ce:t(new Error("Failed to get type for BinaryArray"))),t(a+ve(n))}else if("[object Blob]"===r){var i=new FileReader;i.onload=function(){var r=J+e.type+"~"+ve(this.result);t(Q+te+r)},i.readAsArrayBuffer(e)}else try{t(JSON.stringify(e))}catch(r){console.error("Couldn't convert value into a JSON string: ",e),t(null,r)}}function pe(e){if(e.substring(0,$)!==Q)return JSON.parse(e);var t,r=e.substring(he),n=e.substring($,he);if(n===te&&K.test(r)){var a=r.match(K);t=a[1],r=r.substring(a[0].length)}var i=de(r);switch(n){case ee:return i;case te:return f([i],{type:t});case re:return new Int8Array(i);case ne:return new Uint8Array(i);case ae:return new Uint8ClampedArray(i);case ie:return new Int16Array(i);case se:return new Uint16Array(i);case oe:return new Int32Array(i);case fe:return new Uint32Array(i);case ue:return new Float32Array(i);case ce:return new Float64Array(i);default:throw new Error("Unkown type: "+n)}}var me={serialize:ge,deserialize:pe,stringToBuffer:de,bufferToString:ve};function ye(e,t,r,n){e.executeSql("CREATE TABLE IF NOT EXISTS "+t.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],r,n)}function be(e){var t=this,r={db:null};if(e)for(var n in e)r[n]="string"!=typeof e[n]?e[n].toString():e[n];var a=new u(function(e,n){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(e){return n(e)}r.db.transaction(function(a){ye(a,r,function(){t._dbInfo=r,e()},function(e,t){n(t)})},n)});return r.serializer=me,a}function we(e,t,r,n,a,i){e.executeSql(r,n,a,function(e,o){o.code===o.SYNTAX_ERR?e.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[t.storeName],function(e,s){s.rows.length?i(e,o):ye(e,t,function(){e.executeSql(r,n,a,i)},i)},i):i(e,o)},i)}function Ie(e,t){var r=this;e=l(e);var n=new u(function(t,n){r.ready().then(function(){var a=r._dbInfo;a.db.transaction(function(r){we(r,a,"SELECT * FROM "+a.storeName+" WHERE key = ? LIMIT 1",[e],function(e,r){var n=r.rows.length?r.rows.item(0).value:null;n&&(n=a.serializer.deserialize(n)),t(n)},function(e,t){n(t)})})}).catch(n)});return c(n,t),n}function xe(e,t){var r=this,n=new u(function(t,n){r.ready().then(function(){var a=r._dbInfo;a.db.transaction(function(r){we(r,a,"SELECT * FROM "+a.storeName,[],function(r,n){for(var i=n.rows,o=i.length,s=0;s<o;s++){var f=i.item(s),u=f.value;if(u&&(u=a.serializer.deserialize(u)),void 0!==(u=e(u,f.key,s+1)))return void t(u)}t()},function(e,t){n(t)})})}).catch(n)});return c(n,t),n}function ke(e,t,r,n){var a=this;e=l(e);var i=new u(function(i,o){a.ready().then(function(){void 0===t&&(t=null);var s=t,f=a._dbInfo;f.serializer.serialize(t,function(t,u){u?o(u):f.db.transaction(function(r){we(r,f,"INSERT OR REPLACE INTO "+f.storeName+" (key, value) VALUES (?, ?)",[e,t],function(){i(s)},function(e,t){o(t)})},function(t){if(t.code===t.QUOTA_ERR){if(n>0)return void i(ke.apply(a,[e,s,r,n-1]));o(t)}})})}).catch(o)});return c(i,r),i}function Me(e,t,r){return ke.apply(this,[e,t,r,1])}function Ae(e,t){var r=this;e=l(e);var n=new u(function(t,n){r.ready().then(function(){var a=r._dbInfo;a.db.transaction(function(r){we(r,a,"DELETE FROM "+a.storeName+" WHERE key = ?",[e],function(){t()},function(e,t){n(t)})})}).catch(n)});return c(n,t),n}function Ee(e){var t=this,r=new u(function(e,r){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(t){we(t,n,"DELETE FROM "+n.storeName,[],function(){e()},function(e,t){r(t)})})}).catch(r)});return c(r,e),r}function Se(e){var t=this,r=new u(function(e,r){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(t){we(t,n,"SELECT COUNT(key) as c FROM "+n.storeName,[],function(t,r){var n=r.rows.item(0).c;e(n)},function(e,t){r(t)})})}).catch(r)});return c(r,e),r}function _e(e,t){var r=this,n=new u(function(t,n){r.ready().then(function(){var a=r._dbInfo;a.db.transaction(function(r){we(r,a,"SELECT key FROM "+a.storeName+" WHERE id = ? LIMIT 1",[e+1],function(e,r){var n=r.rows.length?r.rows.item(0).key:null;t(n)},function(e,t){n(t)})})}).catch(n)});return c(n,t),n}function Be(e){var t=this,r=new u(function(e,r){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(t){we(t,n,"SELECT key FROM "+n.storeName,[],function(t,r){for(var n=[],a=0;a<r.rows.length;a++)n.push(r.rows.item(a).key);e(n)},function(e,t){r(t)})})}).catch(r)});return c(r,e),r}function De(e){return new u(function(t,r){e.transaction(function(n){n.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(r,n){for(var a=[],i=0;i<n.rows.length;i++)a.push(n.rows.item(i).name);t({db:e,storeNames:a})},function(e,t){r(t)})},function(e){r(e)})})}function Ue(e,t){t=d.apply(this,arguments);var r=this.config();(e="function"!=typeof e&&e||{}).name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var n,a=this;return c(n=e.name?new u(function(t){var n;n=e.name===r.name?a._dbInfo.db:openDatabase(e.name,"","",0),e.storeName?t({db:n,storeNames:[e.storeName]}):t(De(n))}).then(function(e){return new u(function(t,r){e.db.transaction(function(n){function a(e){return new u(function(t,r){n.executeSql("DROP TABLE IF EXISTS "+e,[],function(){t()},function(e,t){r(t)})})}for(var i=[],o=0,s=e.storeNames.length;o<s;o++)i.push(a(e.storeNames[o]));u.all(i).then(function(){t()}).catch(function(e){r(e)})},function(e){r(e)})})}):u.reject("Invalid arguments"),t),n}var Te={_driver:"webSQLStorage",_initStorage:be,_support:X(),iterate:xe,getItem:Ie,setItem:Me,removeItem:Ae,clear:Ee,length:Se,key:_e,keys:Be,dropInstance:Ue};function Pe(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&!!localStorage.setItem}catch(e){return!1}}function Ne(e,t){var r=e.name+"/";return e.storeName!==t.storeName&&(r+=e.storeName+"/"),r}function Oe(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch(e){return!0}}function Ce(){return!Oe()||localStorage.length>0}function ze(e){var t=this,r={};if(e)for(var n in e)r[n]=e[n];return r.keyPrefix=Ne(e,t._defaultConfig),Ce()?(t._dbInfo=r,r.serializer=me,u.resolve()):u.reject()}function je(e){var t=this,r=t.ready().then(function(){for(var e=t._dbInfo.keyPrefix,r=localStorage.length-1;r>=0;r--){var n=localStorage.key(r);0===n.indexOf(e)&&localStorage.removeItem(n)}});return c(r,e),r}function Re(e,t){var r=this;e=l(e);var n=r.ready().then(function(){var t=r._dbInfo,n=localStorage.getItem(t.keyPrefix+e);return n&&(n=t.serializer.deserialize(n)),n});return c(n,t),n}function Fe(e,t){var r=this,n=r.ready().then(function(){for(var t=r._dbInfo,n=t.keyPrefix,a=n.length,i=localStorage.length,o=1,s=0;s<i;s++){var f=localStorage.key(s);if(0===f.indexOf(n)){var u=localStorage.getItem(f);if(u&&(u=t.serializer.deserialize(u)),void 0!==(u=e(u,f.substring(a),o++)))return u}}});return c(n,t),n}function Ve(e,t){var r=this,n=r.ready().then(function(){var t,n=r._dbInfo;try{t=localStorage.key(e)}catch(e){t=null}return t&&(t=t.substring(n.keyPrefix.length)),t});return c(n,t),n}function Le(e){var t=this,r=t.ready().then(function(){for(var e=t._dbInfo,r=localStorage.length,n=[],a=0;a<r;a++){var i=localStorage.key(a);0===i.indexOf(e.keyPrefix)&&n.push(i.substring(e.keyPrefix.length))}return n});return c(r,e),r}function Ge(e){var t=this.keys().then(function(e){return e.length});return c(t,e),t}function Ye(e,t){var r=this;e=l(e);var n=r.ready().then(function(){var t=r._dbInfo;localStorage.removeItem(t.keyPrefix+e)});return c(n,t),n}function We(e,t,r){var n=this;e=l(e);var a=n.ready().then(function(){void 0===t&&(t=null);var r=t;return new u(function(a,i){var o=n._dbInfo;o.serializer.serialize(t,function(t,n){if(n)i(n);else try{localStorage.setItem(o.keyPrefix+e,t),a(r)}catch(e){"QuotaExceededError"!==e.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==e.name||i(e),i(e)}})})});return c(a,r),a}function qe(e,t){if(t=d.apply(this,arguments),!(e="function"!=typeof e&&e||{}).name){var r=this.config();e.name=e.name||r.name,e.storeName=e.storeName||r.storeName}var n,a=this;return n=e.name?new u(function(t){e.storeName?t(Ne(e,a._defaultConfig)):t(e.name+"/")}).then(function(e){for(var t=localStorage.length-1;t>=0;t--){var r=localStorage.key(t);0===r.indexOf(e)&&localStorage.removeItem(r)}}):u.reject("Invalid arguments"),c(n,t),n}var He={_driver:"localStorageWrapper",_initStorage:ze,_support:Pe(),iterate:Fe,getItem:Re,setItem:We,removeItem:Ye,clear:je,length:Ge,key:Ve,keys:Le,dropInstance:qe},Xe=function(e,t){return e===t||"number"==typeof e&&"number"==typeof t&&isNaN(e)&&isNaN(t)},Ze=function(e,t){for(var r=e.length,n=0;n<r;){if(Xe(e[n],t))return!0;n++}return!1},Je=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},Ke={},Qe={},$e={INDEXEDDB:H,WEBSQL:Te,LOCALSTORAGE:He},et=[$e.INDEXEDDB._driver,$e.WEBSQL._driver,$e.LOCALSTORAGE._driver],tt=["dropInstance"],rt=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(tt),nt={description:"",driver:et.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function at(e,t){e[t]=function(){var r=arguments;return e.ready().then(function(){return e[t].apply(e,r)})}}function it(){for(var e=1;e<arguments.length;e++){var t=arguments[e];if(t)for(var r in t)t.hasOwnProperty(r)&&(Je(t[r])?arguments[0][r]=t[r].slice():arguments[0][r]=t[r])}return arguments[0]}var ot=function(){function e(t){for(var r in a(this,e),$e)if($e.hasOwnProperty(r)){var n=$e[r],i=n._driver;this[r]=i,Ke[i]||this.defineDriver(n)}this._defaultConfig=it({},nt),this._config=it({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(e){if("object"===(void 0===e?"undefined":n(e))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var t in e){if("storeName"===t&&(e[t]=e[t].replace(/\W/g,"_")),"version"===t&&"number"!=typeof e[t])return new Error("Database version must be a number.");this._config[t]=e[t]}return!("driver"in e)||!e.driver||this.setDriver(this._config.driver)}return"string"==typeof e?this._config[e]:this._config},e.prototype.defineDriver=function(e,t,r){var n=new u(function(t,r){try{var n=e._driver,a=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!e._driver)return void r(a);for(var i=rt.concat("_initStorage"),o=0,s=i.length;o<s;o++){var f=i[o];if((!Ze(tt,f)||e[f])&&"function"!=typeof e[f])return void r(a)}var h=function(){for(var t=function(e){return function(){var t=new Error("Method "+e+" is not implemented by the current driver"),r=u.reject(t);return c(r,arguments[arguments.length-1]),r}},r=0,n=tt.length;r<n;r++){var a=tt[r];e[a]||(e[a]=t(a))}};h();var l=function(r){Ke[n]&&console.info("Redefining LocalForage driver: "+n),Ke[n]=e,Qe[n]=r,t()};"_support"in e?e._support&&"function"==typeof e._support?e._support().then(l,r):l(!!e._support):l(!0)}catch(e){r(e)}});return h(n,t,r),n},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(e,t,r){var n=Ke[e]?u.resolve(Ke[e]):u.reject(new Error("Driver not found."));return h(n,t,r),n},e.prototype.getSerializer=function(e){var t=u.resolve(me);return h(t,e),t},e.prototype.ready=function(e){var t=this,r=t._driverSet.then(function(){return null===t._ready&&(t._ready=t._initDriver()),t._ready});return h(r,e,e),r},e.prototype.setDriver=function(e,t,r){var n=this;Je(e)||(e=[e]);var a=this._getSupportedDrivers(e);function i(){n._config.driver=n.driver()}function o(e){return n._extend(e),i(),n._ready=n._initStorage(n._config),n._ready}function s(e){return function(){var t=0;function r(){for(;t<e.length;){var a=e[t];return t++,n._dbInfo=null,n._ready=null,n.getDriver(a).then(o).catch(r)}i();var s=new Error("No available storage method found.");return n._driverSet=u.reject(s),n._driverSet}return r()}}var f=null!==this._driverSet?this._driverSet.catch(function(){return u.resolve()}):u.resolve();return this._driverSet=f.then(function(){var e=a[0];return n._dbInfo=null,n._ready=null,n.getDriver(e).then(function(e){n._driver=e._driver,i(),n._wrapLibraryMethodsWithReady(),n._initDriver=s(a)})}).catch(function(){i();var e=new Error("No available storage method found.");return n._driverSet=u.reject(e),n._driverSet}),h(this._driverSet,t,r),this._driverSet},e.prototype.supports=function(e){return!!Qe[e]},e.prototype._extend=function(e){it(this,e)},e.prototype._getSupportedDrivers=function(e){for(var t=[],r=0,n=e.length;r<n;r++){var a=e[r];this.supports(a)&&t.push(a)}return t},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0,t=rt.length;e<t;e++)at(this,rt[e])},e.prototype.createInstance=function(t){return new e(t)},e}(),st=new ot;t.exports=st},{3:3}]},{},[4])(4)}(Pe);var Ne,Oe=Pe.exports;function Ce(){return Ne||(Ne=Oe.createInstance({name:"maptalks.tileclip",storeName:"tiles",description:"Tile storage for maptalks.tileclip"})),Ne}function ze(e,t){Ce().setItem(e,t).then(function(){}).catch(function(t){console.error("Error saving tile: "+e,t)})}function je(e){return Ce().getItem(e)}var Re=new ee(200,function(e){m(e)}),Fe=new ee(200,function(e){}),Ve={};function Le(e,t){Ve[e]=Ve[e]||[],Ve[e].push(t)}function Ge(e){var t=[];for(var r in Ve){var n=Ve[r]||[];if(n.length){var a=n.indexOf(e);a>-1&&n.splice(a,1)}0===n.length&&t.push(r)}t.forEach(function(e){delete Ve[e]})}function Ye(e,t){var r=t.fetchOptions||{headers:e,referrer:t.referrer},a=t.timeout||0,i=new AbortController,s=i.signal;return a&&n(a)&&a>0&&setTimeout(function(){i.abort(o)},a),r.signal=s,delete r.timeout,{fetchOptions:r,control:i}}function We(e,t={},r){return new Promise(function(n,a){var i=function(e){createImageBitmap(e).then(function(e){n(e)}).catch(function(e){a(e)})};if(p(e))i(e);else{var{indexedDBCache:o}=r,f=function(){var n=r.__taskId;if(n){var f=Re.get(e);if(f)i(f);else{var{fetchOptions:u,control:h}=Ye(t,r);Le(n,h),fetch(e,u).then(function(t){return t.ok||a(s(e)),t.blob()}).then(function(e){return createImageBitmap(e)}).then(function(t){!0!==r.disableCache&&Re.add(e,t),o&&ze(e,t),Ge(h),i(t)}).catch(function(e){Ge(h),a(e)})}}else a(c("taskId is null"))};o?je(e).then(function(e){e&&o?i(e):f()}).catch(function(){}):f()}})}function qe(e){var{urlTemplate:t,x:n,y:a,z:i,maxAvailableZoom:o,subdomains:s,returnBlobURL:u,globalCompositeOperation:c}=e;return new Promise(function(l,d){for(var v,g,p,y,b=h(t),w=0,I=b.length;w<I;w++){if(!k(b[w],s))return void d(f("not find subdomains"))}var M=n,A=a,E=i,S=i-o;if(S>0){for(var _=n,B=a,D=i;D>o;)_=Math.floor(_/2),B=Math.floor(B/2),D--;var U=Math.pow(2,S),T=Math.floor(_*U),P=T+U,N=Math.floor(B*U),O=N+U;T>n&&(T--,P--),N>a&&(N--,O--),v=(n-T)/(P-T),g=(a-N)/(O-N),p=1/(P-T),y=1/(O-N),M=_,A=B,E=o}var C=b.map(function(e){return x(e,M,A,E,s)}),z=Object.assign({},r,e.headers||{}),j=C.map(function(t){return We(t,z,e)});Promise.all(j).then(function(t){var r=W(t,c);if(r instanceof Error)d(r);else{var n,a=Z(r,e);if(S<=0)n=a;else{var{width:i,height:o}=a;n=function(e,t,r,n,a){var i=F(e.width);V(i,e.width,e.height);var o=G(i);o.save(),o.drawImage(e,t,r,n,a,0,0,i.width,i.height),o.restore();var s=i.transferToImageBitmap();return m(e),s}(a,i*v,o*g,i*p,o*y)}J(n,u).then(function(e){l(e)}).catch(function(e){d(e)})}}).catch(function(e){d(e)})})}function He(e,t){return new Promise(function(n,a){var i=h(e),o=Object.assign({},r,t.headers||{}),{returnBlobURL:l,terrainWidth:d,tileSize:v,terrainType:g,minHeight:p,maxHeight:m,terrainColors:b}=t,w=function(e){J(e,l).then(function(e){n(e)}).catch(function(e){a(e)})},I="mapzen"===g,x="tianditu"===g,k="cesium"===g,M="arcgis"===g;if(I||"qgis-gray"===g){var A=i.map(function(e){return We(e,o,t)});Promise.all(A).then(function(e){var t=F(),r=W(e);if(r instanceof Error)a(r);else{V(t,r.width,r.height);var n=G(t);n.drawImage(r,0,0);var i=n.getImageData(0,0,t.width,t.height);I?function(e){for(var t=e.data,r=[0,0,0],n=0,a=t.length;n<a;n+=4){var i=t[n],o=t[n+1],s=t[n+2];if(0!==t[n+3]){var f=256*i+o+s/256-32768,[u,c,h]=y(f,r);t[n]=u,t[n+1]=c,t[n+2]=h}}}(i):function(e,t,r){for(var n=e.data,a=(r-t)/16777216,i=0,o=n.length;i<o;i+=4){var s=n[i],f=n[i+1],u=n[i+2];if(0!==n[i+3]){var c=u*a+256*f*a+256*s*256*a+t,[h,l,d]=y(c);n[i]=h,n[i+1]=l,n[i+2]=d}}}(i,p,m),n.putImageData(i,0,0);var o=t.transferToImageBitmap();w(Q(b,o))}}).catch(function(e){a(e)})}else if(x||k||M){var E=i.map(function(e){return function(e,t={},r){return new Promise(function(n,a){var i=function(e){n(e)},o=r.__taskId;if(o){var f=Fe.get(e);if(f)i(f);else{var{indexedDBCache:u}=r,h=function(){var{fetchOptions:n,control:f}=Ye(t,r);Le(o,f),fetch(e,n).then(function(t){return t.ok||a(s(e)),t.arrayBuffer()}).then(function(t){!0!==r.disableCache&&Fe.add(e,t),Ge(f),u&&ze(e,t),i(t)}).catch(function(e){Ge(f),a(e)})};if(!u)return void h();je(e).then(function(e){e&&u?i(e):h()}).catch(function(){})}}else a(c("taskId is null"))})}(e,o,t)});Promise.all(E).then(function(e){if(e&&0!==e.length){var t,r=e[0];if(0!==r.byteLength)x?t=ke(r,d,v):k?t=Be(r,d,v):M&&((t=Te.exports.decode(r)).image=function(e){var{width:t,height:r,pixels:n}=e,a=F();V(a,t,r);var i=G(a);if(!n||0===n.length)return null;for(var o=n[0],s=i.createImageData(t,r),f=0,u=s.data.length;f<u;f+=4){var c=o[f/4],[h,l,d]=y(c);s.data[f]=h,s.data[f+1]=l,s.data[f+2]=d,s.data[f+3]=255}return i.putImageData(s,0,0),a.transferToImageBitmap()}(t)),t&&t.image?w(Q(b,t.image)):a(c("generate terrain data error,not find image data"));else a(u("buffer is empty"))}else a(u("buffers is null"))}).catch(function(e){a(e)})}else a(f("not support terrainType:"+g))})}var Xe=512;function Ze(e){return new Promise(function(t,r){var n=e.debug,a=e.items,i=e._workerId,o=[];a.forEach(function(e,s){var f=new OffscreenCanvas(e.width,e.height);G(f).drawImage(e.image,0,0),n&&console.log("workerId:"+i+",image to blob url :"+(s+1)+"/"+a.length),f.convertToBlob().then(function(r){var n=URL.createObjectURL(r);e.url=n,o.push(1),m(e.image),delete e.image,o.length===a.length&&t(a)}).catch(function(e){console.error(e),r(e)})})})}function Je(e,t){return!(e[2]<t[0])&&(!(e[1]>t[3])&&(!(e[0]>t[2])&&!(e[3]<t[1])))}function Ke(e,t){var[r,n,a,i]=e;return r>=t[0]&&a<=t[2]&&n>=t[1]&&i<=t[3]}function Qe(e){var[t,r,n,a]=e;return[[t,r],[n,r],[n,a],[t,a]]}function $e(e){var t=1/0,r=1/0,n=-1/0,a=-1/0;return e.forEach(function(e){t=Math.min(t,e[0]),n=Math.max(n,e[0]),r=Math.min(r,e[1]),a=Math.max(a,e[1])}),[t,r,n,a]}function et(e,t){tt(e.geometry,t)}function tt(e,t){if(e)switch(e.type){case"Point":rt(e.coordinates,t);break;case"MultiPoint":case"LineString":nt(e.coordinates,t);break;case"MultiLineString":!function(e,t){for(var r=0,n=e.length;r<n;r++)nt(e[r],t)}(e.coordinates,t);break;case"Polygon":at(e.coordinates,t);break;case"MultiPolygon":!function(e,t){for(var r=0,n=e.length;r<n;r++)at(e[r],t)}(e.coordinates,t);break;case"GeometryCollection":for(var r=e.geometries.length,n=0;n<r;n++)tt(e.geometries[n],t)}}function rt(e,t){t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.max(t[2],e[0]),t[3]=Math.max(t[3],e[1])}function nt(e,t){for(var r=0,n=e.length;r<n;r++)rt(e[r],t)}function at(e,t){e.length&&nt(e[0],t)}var it=function(e){var t=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];switch(e.type){case"FeatureCollection":for(var r=e.features.length,n=0;n<r;n++)et(e.features[n],t);break;case"Feature":et(e,t);break;default:tt(e,t)}return t},ot=st;function st(e,t,r){var n,a,i,o,s,f=e.length,u=ut(e[0],t),c=[];for(r||(r=[]),n=1;n<f;n++){for(a=e[n-1],o=s=ut(i=e[n],t);;){if(!(u|o)){c.push(a),o!==s?(c.push(i),n<f-1&&(r.push(c),c=[])):n===f-1&&c.push(i);break}if(u&o)break;u?u=ut(a=ft(a,i,u,t),t):o=ut(i=ft(a,i,o,t),t)}u=s}return c.length&&r.push(c),r}function ft(e,t,r,n){return 8&r?[e[0]+(t[0]-e[0])*(n[3]-e[1])/(t[1]-e[1]),n[3]]:4&r?[e[0]+(t[0]-e[0])*(n[1]-e[1])/(t[1]-e[1]),n[1]]:2&r?[n[2],e[1]+(t[1]-e[1])*(n[2]-e[0])/(t[0]-e[0])]:1&r?[n[0],e[1]+(t[1]-e[1])*(n[0]-e[0])/(t[0]-e[0])]:null}function ut(e,t){var r=0;return e[0]<t[0]?r|=1:e[0]>t[2]&&(r|=2),e[1]<t[1]?r|=4:e[1]>t[3]&&(r|=8),r}st.polyline=st,st.polygon=function(e,t){var r,n,a,i,o,s,f;for(n=1;n<=8;n*=2){for(r=[],i=!(ut(a=e[e.length-1],t)&n),o=0;o<e.length;o++)(f=!(ut(s=e[o],t)&n))!==i&&r.push(ft(a,s,n,t)),f&&r.push(s),a=s,i=f;if(!(e=r).length)break}return r};var ct={};function ht(e,t){return function(e){if(!e)return!1;var t=(e.geometry||{type:null}).type;return"Polygon"===t||"MultiPolygon"===t}(t)?(ct[e]=t,function(e){e.bbox=e.bbox||it(e)}(t),t):f("geojson.feature is not Polygon")}function lt(e,t){if(d(e)){var r=function(e){for(var t=[],n=0,a=e.length;n<a;n++){var i=e[n];Array.isArray(i[0])?t.push(r(i)):t[n]=l(i)}return t};return r(t)}return t}function dt(e,t,r){var[n,a,i,o]=e,s=(i-n)/t,f=(o-a)/t,[u,c]=r;return[(u-n)/s,t-(c-a)/f]}function vt(e,t,r,n){var[a,i,o,s]=t,f=function(e,t){for(var n=[],a=0,i=e.length;a<i;a++){var o=e[a];Array.isArray(o[0])?n.push(f(o,t)):n[a]=dt(t,r,o)}return n};if(d(e)){var[u,c]=l([a,i]),[h,v]=l([o,s]);return f(n,[u,c,h,v])}return f(n,t)}var gt=function(e){if(e.length>0){for(var t=1/0,r=-1/0,n=1/0,a=-1/0,i=0,o=e.length;i<o;i++){var[s,f]=e[i];t=Math.min(s,t),n=Math.min(f,n),r=Math.max(s,r),a=Math.max(f,a)}if(t!==r&&n!==a)return!0}return!1};function pt(e,t){for(var r=[],n=0,a=e.length;n<a;n++)for(var i=e[n],o=0,s=i.length;o<s;o++){var f=i[o],u=ot.polygon(f,t);gt(u)&&r.push([u])}return r}function mt(e,t){if(!{}.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var yt=0;function bt(e){return"__private_"+yt+++"_"+e}var wt=Math.PI/180,It=180/Math.PI,xt=6378137,kt=20037508.342789244,Mt="900913",At={};function Et(e){return Number(e)===e&&e%1!=0}var St,_t,Bt,Dt,Ut,Tt=bt("size"),Pt=bt("expansion"),Nt=bt("Bc"),Ot=bt("Cc"),Ct=bt("zc"),zt=bt("Ac");
/**
     * @preserve
     * gcoord 1.0.7, geographic coordinate library
     * Copyright (c) 2025 Jiulong Hu <me@hujiulong.com>
     */
var{sin:jt,cos:Rt,sqrt:Ft,abs:Vt,PI:Lt}=Math,Gt=6378245,Yt=.006693421622965823;function Wt(e,t){return e>=72.004&&e<=137.8347&&t>=.8293&&t<=55.8271}function qt(e,t){var r,n,a,i=(a=300+(r=e-105)+2*(n=t-35)+.1*r*r+.1*r*n+.1*Ft(Vt(r)),a+=2*(20*jt(6*r*Lt)+20*jt(2*r*Lt))/3,(a+=2*(20*jt(r*Lt)+40*jt(r/3*Lt))/3)+2*(150*jt(r/12*Lt)+300*jt(r/30*Lt))/3),o=function(e,t){var r=2*e-100+3*t+.2*t*t+.1*e*t+.2*Ft(Vt(e));return r+=2*(20*jt(6*e*Lt)+20*jt(2*e*Lt))/3,r+=2*(20*jt(t*Lt)+40*jt(t/3*Lt))/3,r+2*(160*jt(t/12*Lt)+320*jt(t*Lt/30))/3}(e-105,t-35),s=t/180*Lt,f=jt(s),u=Ft(f=1-Yt*f*f);return[i=180*i/(Gt/u*Rt(s)*Lt),o=180*o/(Gt*(1-Yt)/(f*u)*Lt)]}function Ht(e){var[t,r]=e;if(!Wt(t,r))return[t,r];var n=qt(t,r);return[t+n[0],r+n[1]]}function Xt(e){var[t,r]=e;if(!Wt(t,r))return[t,r];for(var[n,a]=[t,r],i=Ht([n,a]),o=i[0]-t,s=i[1]-r;Vt(o)>1e-6||Vt(s)>1e-6;)o=(i=Ht([n-=o,a-=s]))[0]-t,s=i[1]-r;return[n,a]}var{sin:Zt,cos:Jt,atan2:Kt,sqrt:Qt,PI:$t}=Math,er=3e3*$t/180;function tr(e){var[t,r]=e,n=t-.0065,a=r-.006,i=Qt(n*n+a*a)-2e-5*Zt(a*er),o=Kt(a,n)-3e-6*Jt(n*er);return[i*Jt(o),i*Zt(o)]}function rr(e){var[t,r]=e,n=t,a=r,i=Qt(n*n+a*a)+2e-5*Zt(a*er),o=Kt(a,n)+3e-6*Jt(n*er);return[i*Jt(o)+.0065,i*Zt(o)+.006]}var nr=180/Math.PI,ar=Math.PI/180,ir=6378137,or=20037508.342789244;function sr(e){return[e[0]*nr/ir,(.5*Math.PI-2*Math.atan(Math.exp(-e[1]/ir)))*nr]}function fr(e){var t=Math.abs(e[0])<=180?e[0]:e[0]-360*(e[0]<0?-1:1),r=[ir*t*ar,ir*Math.log(Math.tan(.25*Math.PI+.5*e[1]*ar))];return r[0]>or&&(r[0]=or),r[0]<-or&&(r[0]=-or),r[1]>or&&(r[1]=or),r[1]<-or&&(r[1]=-or),r}var ur,{abs:cr}=Math,hr=[12890594.86,8362377.87,5591021,3481989.83,1678043.12,0],lr=[75,60,45,30,15,0],dr=[[1.410526172116255e-8,898305509648872e-20,-1.9939833816331,200.9824383106796,-187.2403703815547,91.6087516669843,-23.38765649603339,2.57121317296198,-.03801003308653,17337981.2],[-7.435856389565537e-9,8983055097726239e-21,-.78625201886289,96.32687599759846,-1.85204757529826,-59.36935905485877,47.40033549296737,-16.50741931063887,2.28786674699375,10260144.86],[-3.030883460898826e-8,898305509983578e-20,.30071316287616,59.74293618442277,7.357984074871,-25.38371002664745,13.45380521110908,-3.29883767235584,.32710905363475,6856817.37],[-1.981981304930552e-8,8983055099779535e-21,.03278182852591,40.31678527705744,.65659298677277,-4.44255534477492,.85341911805263,.12923347998204,-.04625736007561,4482777.06],[3.09191371068437e-9,8983055096812155e-21,6995724062e-14,23.10934304144901,-.00023663490511,-.6321817810242,-.00663494467273,.03430082397953,-.00466043876332,2555164.4],[2.890871144776878e-9,8983055095805407e-21,-3.068298e-8,7.47137025468032,-353937994e-14,-.02145144861037,-1234426596e-14,.00010322952773,-323890364e-14,826088.5]],vr=[[-.0015702102444,111320.7020616939,0x60e374c3105a3,-0x24bb4115e2e164,0x5cc55543bb0ae8,-0x7ce070193f3784,0x5e7ca61ddf8150,-0x261a578d8b24d0,0x665d60f3742ca,82.5],[.0008277824516172526,111320.7020463578,647795574.6671607,-4082003173.641316,10774905663.51142,-15171875531.51559,12053065338.62167,-5124939663.577472,913311935.9512032,67.5],[.00337398766765,111320.7020202162,4481351.045890365,-23393751.19931662,79682215.47186455,-115964993.2797253,97236711.15602145,-43661946.33752821,8477230.501135234,52.5],[.00220636496208,111320.7020209128,51751.86112841131,3796837.749470245,992013.7397791013,-1221952.21711287,1340652.697009075,-620943.6990984312,144416.9293806241,37.5],[-.0003441963504368392,111320.7020576856,278.2353980772752,2485758.690035394,6070.750963243378,54821.18345352118,9540.606633304236,-2710.55326746645,1405.483844121726,22.5],[-.0003218135878613132,111320.7020701615,.00369383431289,823725.6402795718,.46104986909093,2351.343141331292,1.58060784298199,8.77738589078284,.37238884252424,7.45]];function gr(e,t,r){var n=cr(t)/r[9],a=r[0]+r[1]*cr(e),i=r[2]+r[3]*n+r[4]*Math.pow(n,2)+r[5]*Math.pow(n,3)+r[6]*Math.pow(n,4)+r[7]*Math.pow(n,5)+r[8]*Math.pow(n,6);return[a*=e<0?-1:1,i*=t<0?-1:1]}function pr(e){for(var[t,r]=e,n=[],a=0;a<lr.length;a++)if(cr(r)>lr[a]){n=vr[a];break}return gr(t,r,n)}function mr(e){for(var[t,r]=e,n=[],a=0;a<hr.length;a++)if(cr(r)>=hr[a]){n=dr[a];break}return gr(t,r,n)}function yr(e,t){if(!e)throw new Error(t)}function br(e){return!!e&&"[object Array]"===Object.prototype.toString.call(e)}function wr(e){return!isNaN(Number(e))&&null!==e&&!br(e)}function Ir(...e){var t=e.length-1;return function(...r){for(var n=t,a=e[t].apply(null,r);n--;)a=e[n].call(null,a);return a}}function xr(e,t,r=!1){if(null!==e)for(var n,a,i,o,s,f,u,c,h=0,l=0,{type:d}=e,v="FeatureCollection"===d,g="Feature"===d,p=v?e.features.length:1,m=0;m<p;m++){f=(c=!!(u=v?e.features[m].geometry:g?e.geometry:e)&&"GeometryCollection"===u.type)?u.geometries.length:1;for(var y=0;y<f;y++){var b=0,w=0;if(null!==(o=c?u.geometries[y]:u)){var I=o.type;switch(h=!r||"Polygon"!==I&&"MultiPolygon"!==I?0:1,I){case null:break;case"Point":if(!1===t(s=o.coordinates,l,m,b,w))return!1;l++,b++;break;case"LineString":case"MultiPoint":for(s=o.coordinates,n=0;n<s.length;n++){if(!1===t(s[n],l,m,b,w))return!1;l++,"MultiPoint"===I&&b++}"LineString"===I&&b++;break;case"Polygon":case"MultiLineString":for(s=o.coordinates,n=0;n<s.length;n++){for(a=0;a<s[n].length-h;a++){if(!1===t(s[n][a],l,m,b,w))return!1;l++}"MultiLineString"===I&&b++,"Polygon"===I&&w++}"Polygon"===I&&b++;break;case"MultiPolygon":for(s=o.coordinates,n=0;n<s.length;n++){for(w=0,a=0;a<s[n].length;a++){for(i=0;i<s[n][a].length-h;i++){if(!1===t(s[n][a][i],l,m,b,w))return!1;l++}w++}b++}break;case"GeometryCollection":for(n=0;n<o.geometries.length;n++)if(!1===xr(o.geometries[n],t,r))return!1;break;default:throw new Error("Unknown Geometry Type")}}}}}!function(e){e.WGS84="WGS84",e.WGS1984="WGS84",e.EPSG4326="WGS84",e.GCJ02="GCJ02",e.AMap="GCJ02",e.BD09="BD09",e.BD09LL="BD09",e.Baidu="BD09",e.BMap="BD09",e.BD09MC="BD09MC",e.BD09Meter="BD09MC",e.EPSG3857="EPSG3857",e.EPSG900913="EPSG3857",e.EPSG102100="EPSG3857",e.WebMercator="EPSG3857",e.WM="EPSG3857"}(ur||(ur={}));var kr={WGS84:{to:(St={},St[ur.GCJ02]=Ht,St[ur.BD09]=Ir(rr,Ht),St[ur.BD09MC]=Ir(pr,rr,Ht),St[ur.EPSG3857]=fr,St)},GCJ02:{to:(_t={},_t[ur.WGS84]=Xt,_t[ur.BD09]=rr,_t[ur.BD09MC]=Ir(pr,rr),_t[ur.EPSG3857]=Ir(fr,Xt),_t)},BD09:{to:(Bt={},Bt[ur.WGS84]=Ir(Xt,tr),Bt[ur.GCJ02]=tr,Bt[ur.EPSG3857]=Ir(fr,Xt,tr),Bt[ur.BD09MC]=pr,Bt)},EPSG3857:{to:(Dt={},Dt[ur.WGS84]=sr,Dt[ur.GCJ02]=Ir(Ht,sr),Dt[ur.BD09]=Ir(rr,Ht,sr),Dt[ur.BD09MC]=Ir(pr,rr,Ht,sr),Dt)},BD09MC:{to:(Ut={},Ut[ur.WGS84]=Ir(Xt,tr,mr),Ut[ur.GCJ02]=Ir(tr,mr),Ut[ur.EPSG3857]=Ir(fr,Xt,tr,mr),Ut[ur.BD09]=mr,Ut)}};var Mr=Object.assign(Object.assign({},ur),{CRSTypes:ur,transform:function(e,t,r){if(yr(!!e,"The args[0] input coordinate is required"),yr(!!t,"The args[1] original coordinate system is required"),yr(!!r,"The args[2] target coordinate system is required"),t===r)return e;var n=kr[t];yr(!!n,"Invalid original coordinate system: "+t);var a=n.to[r];yr(!!a,"Invalid target coordinate system: "+r);var i=typeof e;if(yr("string"===i||"object"===i,"Invalid input coordinate type: "+i),"string"===i)try{e=JSON.parse(e)}catch(t){throw new Error("Invalid input coordinate: "+e)}var o=!1;br(e)&&(yr(e.length>=2,"Invalid input coordinate: "+e),yr(wr(e[0])&&wr(e[1]),"Invalid input coordinate: "+e),e=e.map(Number),o=!0);var s=a;return o?s(e):(xr(e,function(e){[e[0],e[1]]=s(e)}),e)}}),Ar=256,Er=[-180,90],Sr=[-20037508.342787,20037508.342787],_r=new class{constructor(e={}){if(Object.defineProperty(this,Tt,{writable:!0,value:void 0}),Object.defineProperty(this,Pt,{writable:!0,value:void 0}),Object.defineProperty(this,Nt,{writable:!0,value:void 0}),Object.defineProperty(this,Ot,{writable:!0,value:void 0}),Object.defineProperty(this,Ct,{writable:!0,value:void 0}),Object.defineProperty(this,zt,{writable:!0,value:void 0}),mt(this,Tt)[Tt]=e.size||256,mt(this,Pt)[Pt]=e.antimeridian?2:1,!At[mt(this,Tt)[Tt]]){var t=mt(this,Tt)[Tt],r=At[mt(this,Tt)[Tt]]={};r.Bc=[],r.Cc=[],r.zc=[],r.Ac=[];for(var n=0;n<30;n++)r.Bc.push(t/360),r.Cc.push(t/(2*Math.PI)),r.zc.push(t/2),r.Ac.push(t),t*=2}mt(this,Nt)[Nt]=At[mt(this,Tt)[Tt]].Bc,mt(this,Ot)[Ot]=At[mt(this,Tt)[Tt]].Cc,mt(this,Ct)[Ct]=At[mt(this,Tt)[Tt]].zc,mt(this,zt)[zt]=At[mt(this,Tt)[Tt]].Ac}px(e,t){if(Et(t)){var r=mt(this,Tt)[Tt]*Math.pow(2,t),n=r/2,a=r/360,i=r/(2*Math.PI),o=r,s=Math.min(Math.max(Math.sin(wt*e[1]),-.9999),.9999),f=n+e[0]*a,u=n+.5*Math.log((1+s)/(1-s))*-i;return f>o*mt(this,Pt)[Pt]&&(f=o*mt(this,Pt)[Pt]),u>o&&(u=o),[f,u]}var c=mt(this,Ct)[Ct][t],h=Math.min(Math.max(Math.sin(wt*e[1]),-.9999),.9999),l=Math.round(c+e[0]*mt(this,Nt)[Nt][t]),d=Math.round(c+.5*Math.log((1+h)/(1-h))*-mt(this,Ot)[Ot][t]);return l>mt(this,zt)[zt][t]*mt(this,Pt)[Pt]&&(l=mt(this,zt)[zt][t]*mt(this,Pt)[Pt]),d>mt(this,zt)[zt][t]&&(d=mt(this,zt)[zt][t]),[l,d]}ll(e,t){if(Et(t)){var r=mt(this,Tt)[Tt]*Math.pow(2,t),n=r/360,a=r/(2*Math.PI),i=r/2,o=(e[1]-i)/-a;return[(e[0]-i)/n,It*(2*Math.atan(Math.exp(o))-.5*Math.PI)]}var s=(e[1]-mt(this,Ct)[Ct][t])/-mt(this,Ot)[Ot][t];return[(e[0]-mt(this,Ct)[Ct][t])/mt(this,Nt)[Nt][t],It*(2*Math.atan(Math.exp(s))-.5*Math.PI)]}convert(e,t){return t===Mt?[...this.forward(e.slice(0,2)),...this.forward(e.slice(2,4))]:[...this.inverse(e.slice(0,2)),...this.inverse(e.slice(2,4))]}inverse(e){return[e[0]*It/xt,(.5*Math.PI-2*Math.atan(Math.exp(-e[1]/xt)))*It]}forward(e){var t=[xt*e[0]*wt,xt*Math.log(Math.tan(.25*Math.PI+.5*e[1]*wt))];return t[0]>kt&&(t[0]=kt),t[0]<-kt&&(t[0]=-kt),t[1]>kt&&(t[1]=kt),t[1]<-kt&&(t[1]=-kt),t}bbox(e,t,r,n,a){n&&(t=Math.pow(2,r)-1-t);var i=[e*mt(this,Tt)[Tt],(+t+1)*mt(this,Tt)[Tt]],o=[(+e+1)*mt(this,Tt)[Tt],t*mt(this,Tt)[Tt]],s=[...this.ll(i,r),...this.ll(o,r)];return a===Mt?this.convert(s,Mt):s}xyz(e,t,r,n){var a=n===Mt?this.convert(e,"WGS84"):e,i=[a[0],a[1]],o=[a[2],a[3]],s=this.px(i,t),f=this.px(o,t),u=[Math.floor(s[0]/mt(this,Tt)[Tt]),Math.floor((f[0]-1)/mt(this,Tt)[Tt])],c=[Math.floor(f[1]/mt(this,Tt)[Tt]),Math.floor((s[1]-1)/mt(this,Tt)[Tt])],h={minX:Math.min.apply(Math,u)<0?0:Math.min.apply(Math,u),minY:Math.min.apply(Math,c)<0?0:Math.min.apply(Math,c),maxX:Math.max.apply(Math,u),maxY:Math.max.apply(Math,c)};if(r){var l={minY:Math.pow(2,t)-1-h.maxY,maxY:Math.pow(2,t)-1-h.minY};h.minY=l.minY,h.maxY=l.maxY}return h}}({size:Ar});function Br(e){return 1.40625/Math.pow(2,e)}function Dr(e,t,r){if(r){var n=Qe(e).map(function(e){return"EPSG:3857"===t?Mr.transform(e,Mr.WebMercator,Mr.WGS84):e}).map(function(e){return Mr.transform(e,Mr.WGS84,Mr.AMap)}),a=1/0,i=1/0,o=-1/0,s=-1/0;if(n.forEach(function(e){var[t,r]=e;a=Math.min(a,t),i=Math.min(i,r),o=Math.max(o,t),s=Math.max(s,r)}),"EPSG:4326"===t)e[0]=a,e[1]=i,e[2]=o,e[3]=s;else{var f=Qe([a,i,o,o]).map(function(e){return l(e)}),u=1/0,c=1/0,h=-1/0,d=-1/0;f.forEach(function(e){var[t,r]=e;u=Math.min(u,t),c=Math.min(c,r),h=Math.max(h,t),d=Math.max(d,r)}),e[0]=u,e[1]=c,e[2]=h,e[3]=d}}}function Ur(e,t,r,n=0,a){n=n||0;var i,[o,s]=Sr,f=(i=r,156543.03392804097/Math.pow(2,i)*Ar),u=function(e,t,r){var[n,a]=Er,i=Br(r)*Ar,o=e,s=t;return[n+(o=Math.floor(o))*i,(s=Math.floor(s))*i-a,n+(o+1)*i,(s+1)*i-a]}(e,t,r);Dr(u,"EPSG:4326",a);var c=$e(Qe(u).map(function(e){return _r.forward(e)})),[h,l,d,v]=c,g=(h-o)/f,p=(d-o)/f,m=(s-v)/f,y=(s-l)/f;if(g=Math.floor(g),p=Math.floor(p),m=Math.floor(m),y=Math.floor(y),!(p<g||y<m)){for(var b=[],w=m;w<=y;w++)for(var I=g;I<=p;I++)b.push([I,w,r+n]);var x=b.map(function(e){var[t,r,n]=e;return _r.bbox(t,r,n,!1,"900913")}),[k,M,A,E]=function(e){var t=1/0,r=1/0,n=-1/0,a=-1/0;return e.forEach(function(e){var[i,o,s,f]=e;t=Math.min(t,i),n=Math.max(n,s),r=Math.min(r,o),a=Math.max(a,f)}),[t,r,n,a]}(x);return{tiles:b,tilesbbox:[k,M,A,E],bbox:u,mbbox:c,x:e,y:t,z:r}}}function Tr(e,t,r,n){var{width:a,height:i}=e,[o,s,f,u]=t,c=(f-o)/a,h=(u-s)/i,[l,d,v,g]=r,p=((l-=c)-o)/c,y=(u-(g+=h))/h,b=((v+=c)-o)/c,w=(u-(d-=h))/h;p=Math.floor(p),y=Math.floor(y);var I=(b=Math.ceil(b))-p,x=(w=Math.ceil(w))-y,k=F();V(k,I,x);var M=G(k);M.drawImage(e,p,y,I,x,0,0,I,x),m(e);for(var A=M.getImageData(0,0,I,x).data,E=[],S=1/0,_=1/0,B=-1/0,D=-1/0,U=-1,T="EPSG:4326"===n?_r.forward:_r.inverse,P=1;P<=x;P++)for(var N=g-(P-1)*h,O=N-h,C=1;C<=I;C++){var z=(P-1)*I*4+4*(C-1),j=A[z],R=A[z+1],L=A[z+2],Y=A[z+3],W=l+(C-1)*c,q=T([W,N]);S=Math.min(S,q[0]),B=Math.max(B,q[0]),_=Math.min(_,q[1]),D=Math.max(D,q[1]);var H=[W,O];E[++U]={point:q,point1:T(H),r:j,g:R,b:L,a:Y}}return{pixels:E,bbox:[S,_,B,D],width:I,height:x,image:k.transferToImageBitmap()}}function Pr(e,t,r){var[n,a,i,o]=t,s=(i-n)/Ar,f=(o-a)/Ar,{pixels:u,bbox:c}=e,[h,l,d,v]=c,g=(d-h)/s,p=(v-l)/f;if(g=Math.round(g),p=Math.round(p),!isNaN(g)&&!isNaN(p)&&0!==Math.min(g,p)&&Math.abs(g)!==1/0&&Math.abs(p)!==1/0){var m=F();V(m,g,p);for(var y=G(m),b=y.createImageData(g,p),w=b.data,I=0,x=u.length;I<x;I++)for(var{point:k,point1:M,r:A,g:E,b:S,a:_}=u[I],[B,D]=k,[U,T]=M,[P,N]=H(B,D),[O,C]=H(U,T),z=N;z<=C;z++){var j=(z-1)*g*4+4*(P-1);w[j]=A,w[j+1]=E,w[j+2]=S,w[j+3]=_}y.putImageData(b,0,0);var R=m.transferToImageBitmap(),L=Math.round((n-h)/s),Y=Math.round((v-o)/f),W=F();V(W,Ar,Ar);var q=G(m);return q.drawImage(R,L-1,Y,Ar,Ar,0,0,Ar,Ar),function(e){var t=e.canvas,{width:r,height:n}=t,a=e.getImageData(0,0,r,n),i=a.data,o=function(){for(var e=1;e<=n;e++){if(i[4*r*(e-1)+0+3]>0)return!1}return!0},s=function(e){for(var t=1;t<=n;t++){if(i[4*r*(t-1)+4*(e-1)+3]>0)return!1}return!0},f=function(){for(var e=1;e<=r;e++){if(i[4*(e-1)+(n-1)*r*4+3]>0)return!1}return!0};if(o())for(var u=1;u<=n;u++){var c=4*r*(u-1)+0,h=c+4,l=i[h],d=i[h+1],v=i[h+2],g=i[h+3];i[c]=l,i[c+1]=d,i[c+2]=v,i[c+3]=g}if(f())for(var p=1;p<=r;p++){var m=4*(p-1)+(n-1)*r*4,y=4*(p-1)+(n-2)*r*4,b=i[y],w=i[y+1],I=i[y+2],x=i[y+3];i[m]=b,i[m+1]=w,i[m+2]=I,i[m+3]=x}for(var k=[],M=1,A=r;M<=A;M++)k.push(s(M));if(k.indexOf(!0)>-1)for(var E=function(e,t){for(var a=1;a<=n;a++){var o=4*r*(a-1)+4*(e-1),s=4*r*(a-1)+4*(t-1),f=i[s],u=i[s+1],c=i[s+2],h=i[s+3];i[o]=f,i[o+1]=u,i[o+2]=c,i[o+3]=h}},S=1;S<=r;S++){if(k[S-1]){var _=k[S],B=k[S-1];_?B||E(S,S-1):E(S,S+1)}}e.putImageData(a,0,0)}(q),r&&(q.lineWidth=.4,q.strokeStyle="red",q.rect(0,0,Ar,Ar),q.stroke()),W.transferToImageBitmap()}function H(e,t){var r=Math.round((e-h)/s+1);r=Math.min(r,g);var n=Math.round((v-t)/f+1);return[r,n=Math.min(n,p)]}}function Nr(e){return new Promise(function(t,r){var{x:n,y:a,z:i,projection:o,zoomOffset:s,errorLog:f,debug:u,returnBlobURL:c,isGCJ02:h}=e,d=function(e){J(e,c).then(function(e){t(e)}).catch(function(e){r(e)})};!function(){var t;"EPSG:4326"===o?t=function(e,t,r,n=0,a){n=n||0;var[i,o]=Er,s=Br(r)*Ar,f=_r.bbox(e,t,r);Dr(f,"EPSG:4326",a);var[u,c,h,d]=f,v=(u-i)/s,g=(h-i)/s,p=(o-d)/s,m=(o-c)/s;if(v=Math.floor(v),g=Math.floor(g),p=Math.floor(p),m=Math.floor(m),!(g<v||m<p)){for(var y=[],b=p;b<=m;b++)for(var w=v;w<=g;w++)y.push([w-1,b,r+n]);return{tiles:y,tilesbbox:[i+(v-1)*s,o-(m+1)*s,i+g*s,o-p*s],bbox:f,mbbox:$e(Qe(f).map(function(e){return l(e)})),x:e,y:t,z:r}}}(n,a,i,s||0,h):"EPSG:3857"===o&&(t=Ur(n,a,i,s||0,h));var{tiles:r}=t||{};if(r&&0!==r.length){t.loadCount=0;var c=function(){if(t.loadCount>=r.length){var n,a=X(r,u);if("EPSG:4326"===o)n=Pr(Tr(a,t.tilesbbox,t.bbox,o),t.mbbox,u),d(n||Y());else n=Pr(Tr(a,t.tilesbbox,t.mbbox,o),t.bbox,u),d(n||Y())}else{var i=r[t.loadCount],[s,h,l]=i;qe(Object.assign({},e,{x:s,y:h,z:l,returnBlobURL:!1})).then(function(e){i.tileImage=e,t.loadCount++,c()}).catch(function(e){f&&console.error(e),i.tileImage=Y(),t.loadCount++,c()})}};c()}else d(Y())}()})}e.initialize=function(){},e.onmessage=function(e,t){var a=e.data||{},o=a.__type;if("getTile"!==o){var u;if("layoutTiles"!==o)if("getTileWithMaxZoom"!==o)if("clipTile"!==o)if("tileIntersectMask"!==o)if("transformTile"!==o){if("injectMask"===o){var l=ht(a.maskId,a.geojsonFeature);return l instanceof Error?void t(l):void t()}if("removeMask"===o)return function(e){delete ct[e]}(a.maskId),void t();if("cancelFetch"===o){var d=a.taskId||a.__taskId;return d?(function(e){var t=Ve[e]||[];t.length&&t.forEach(function(e){e.abort(i)}),delete Ve[e]}(d),void t()):void t(c("cancelFetch need taskId"))}if("imageSlicing"!==o)if("imageToBlobURL"!==o)if("encodeTerrainTile"!==o)if("colorTerrainTile"!==o)if("imagetTileFetch"!==o)if("tileImageToBlobURL"!==o){var v="worker message:not support message type:"+o;console.error(v),t(c(v))}else(function(e){return new Promise(function(t,r){J(Z(e.image,e),e.returnBlobURL).then(function(e){t(e)}).catch(function(e){r(e)})})})(a).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)});else(function(e){return new Promise(function(t,r){var{url:n,headers:a}=e,i=e.fetchOptions||{headers:a,referrer:e.referrer};fetch(n,i).then(function(e){return e.ok||r(s(n)),e.blob()}).then(function(e){return createImageBitmap(e)}).then(function(e){t(e)}).catch(function(e){r(e)})})})(a).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)});else{var{tile:y,colors:b,returnBlobURL:w}=a;J(Z(Q(b,y),a),w).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)})}else{var{url:M}=a;He(M,a).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)})}else Ze(a).then(function(e){t(null,e,[])}).catch(function(e){t(e)});else(function(e){return e.disableCache=!0,new Promise(function(t,n){var a=h(e.url),i=Object.assign({},r,e.headers||{}),o=a.map(function(t){return We(t,i,e)});Promise.all(o).then(function(r){var a=F(Xe),i=W(r);if(i instanceof Error)n(i);else{for(var{width:o,height:s}=i,f=Math.ceil(s/Xe),u=Math.ceil(o/Xe),c=[],h=1;h<=f;h++)for(var l=(h-1)*Xe,d=Math.min(s,h*Xe),v=1;v<=u;v++){var p=(v-1)*Xe,y=Math.min(o,v*Xe)-p,b=d-l;V(a,y,b),G(a).drawImage(i,p,l,y,b,0,0,a.width,a.height);var w=Z(a.transferToImageBitmap(),e);c.push({id:g(),x:p,y:l,width:y,height:b,row:h,col:v,image:w})}var I={rows:f,cols:u,rowWidth:Xe,colsHeight:Xe,width:o,height:s,items:c};m(i),t(I)}}).catch(function(e){n(e)})})})(a).then(function(e){var r=[];(e.items||[]).forEach(function(e){p(e.image)&&r.push(e.image)}),t(null,e,r)}).catch(function(e){t(e)})}else Nr(a).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)});else{var{tileBBOX:A,maskId:E}=a;(function(e,t){return new Promise(function(r,n){var a=ct[t];if(a){var i=function(){r({intersect:!1})},o=function(){r({intersect:!0})},s=a.bbox;if(s){var{coordinates:u,type:c}=a.geometry;if(u.length)if(Je(s,e))if(Ke(s,e))o();else{var h=u;"Polygon"===c&&(h=[h]),0!==pt(h,e).length?o():i()}else i();else i()}else i()}else n(f("not find mask ,the maskId:"+t))})})(A,E).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)})}else(u=a,new Promise(function(e,t){var{tile:r,tileBBOX:a,projection:i,tileSize:o,maskId:s,returnBlobURL:f,reverse:c,bufferSize:h}=u,l=ct[s],d=function(r){J(r,f).then(function(t){e(t)}).catch(function(e){t(e)})},v=l.bbox;if(v){var{coordinates:g,type:p}=l.geometry;if(g.length){var m=function(){d(c?r:Y(o))};if(Je(v,a)){var y,b,w=g;"Polygon"===p&&(w=[w]);var I=function(){if(n(h)&&h>0){var e=lt(i,w),t=vt(i,a,o,e);b={bufferSize:h,polygons:t}}};if(Ke(v,a)){y=lt(i,w);var x=vt(i,a,o,y);I();var k=H(o,x,r,c,b);d(k)}else{var M=pt(w,a);if(0!==M.length){y=lt(i,M);var A=vt(i,a,o,y);I();var E=H(o,A,r,c,b);d(E)}else m()}}else m()}else d(r)}else d(r)})).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)});else qe(a).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)});else(function(e){var{urlTemplate:t,tiles:n,subdomains:a,returnBlobURL:i,debug:o}=e;return new Promise(function(s,u){if(k(t,a)){var c=n.map(function(e){var[r,n,i]=e;return x(t,r,n,i,a)}),h=Object.assign({},r,e.headers||{}),l=c.map(function(t){return We(t,h,e)});Promise.all(l).then(function(t){t.forEach(function(e,t){n[t].tileImage=e}),J(Z(X(n,o),e),i).then(function(e){s(e)}).catch(function(e){u(e)})}).catch(function(e){u(e)})}else u(f("not find subdomains"))})})(a).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)})}else{var{url:S}=a;(function(e,t){return new Promise(function(n,a){var i=h(e),o=Object.assign({},r,t.headers||{}),s=i.map(function(e){return We(e,o,t)}),{returnBlobURL:f,globalCompositeOperation:u}=t;Promise.all(s).then(function(e){F();var r=W(e,u);r instanceof Error?a(r):J(Z(r,t),f).then(function(e){n(e)}).catch(function(e){a(e)})}).catch(function(e){a(e)})})})(S,a).then(function(e){t(null,e,I(e))}).catch(function(e){t(e)})}},Object.defineProperty(e,"__esModule",{value:!0})}`;

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
  const TaskCancelError = createError('the task is cancel', -6);
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

  // const ISNODE = typeof global === 'object';

  let offscreenCanvas = false;
  try {
      const canvas = new OffscreenCanvas(1, 1);
      const ctx = canvas.getContext('2d');
      ctx.fillText('hello', 0, 0);
      offscreenCanvas = true;
  } catch (err) {
      offscreenCanvas = false;
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
          __type: type,
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
  function isErrorOrCancel(error, promise) {
      return (error || (promise && promise.canceled));
  }
  function removeTimeOut(id) {
      clearTimeout(id);
  }
  class TileActor extends maptalks.worker.Actor {
      _cancelTask(options) {
          const { workerId, taskId } = getTaskId(options);
          if (!isNumber(workerId) || !isNumber(taskId)) {
              return;
          }
          if (taskId) {
              this.send({ __type: 'cancelFetch', __taskId: taskId }, [], (error, image) => {
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
              const { url } = options;
              if (!url) {
                  reject(createParamsValidateError('getTile error:url is null'));
                  return;
              }
              const buffers = checkBuffers(url);
              this.send(options, buffers, (error, image) => {
                  if (isErrorOrCancel(error, promise)) {
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
                  if (isErrorOrCancel(error, promise)) {
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
                  if (isErrorOrCancel(error, promise)) {
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
                  if (isErrorOrCancel(error, promise)) {
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
                  if (isErrorOrCancel(error, promise)) {
                      reject(error || TaskCancelError);
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
                  if (isErrorOrCancel(error, promise)) {
                      reject(error || TaskCancelError);
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
                  __type: 'injectMask'
              }, [], (error, data) => {
                  if (isErrorOrCancel(error, promise)) {
                      reject(error || TaskCancelError);
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
                  __type: 'removeMask'
              }, [], (error, data) => {
                  if (isErrorOrCancel(error, promise)) {
                      reject(error || TaskCancelError);
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
              const { url } = options;
              if (!url) {
                  reject(createParamsValidateError('url is null'));
                  return;
              }
              const buffers = checkBuffers(url);
              this.send(options, buffers, (error, result) => {
                  if (isErrorOrCancel(error, promise)) {
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
                              opts.__type = 'imageToBlobURL';
                              opts.items = subItems;
                              opts._workerId = workerId;
                              const buffers = subItems.map(item => item.image);
                              this.send(opts, buffers, (error, resultItems) => {
                                  if (isErrorOrCancel(error, promise)) {
                                      reject(error || FetchCancelError);
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
                  if (isErrorOrCancel(error, promise)) {
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
                  if (isErrorOrCancel(error, promise)) {
                      reject(error || TaskCancelError);
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
          options = checkOptions(options, 'injectImage');
          const promise = new Promise((resolve, reject) => {
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
              this.send(Object.assign({}, options, { __type: 'imagetTileFetch' }), [], (error, image) => {
                  if (isErrorOrCancel(error, promise)) {
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
              const tid = setTimeout(() => {
                  if (isErrorOrCancel(null, promise)) {
                      reject(TaskCancelError);
                      return;
                  }
                  const imageInfo = imageMap[imageId] || {};
                  delete imageMap[imageId];
                  const image = imageInfo.image;
                  disposeImage(image);
                  removeTimeOut(tid);
                  resolve(null);
              }, 1);
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
              const { tileBBOX, projection, imageId, filter, opacity, gaussianBlurRadius, returnBlobURL, mosaicSize, oldPhoto } = options;
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
              if (filter || opacity || gaussianBlurRadius || returnBlobURL || mosaicSize || oldPhoto) {
                  options.image = image;
                  const buffers = checkBuffers(image);
                  this.send(Object.assign({}, options, { __type: 'tileImageToBlobURL' }), buffers, (error, image) => {
                      if (isErrorOrCancel(error, promise)) {
                          reject(error || TaskCancelError);
                      }
                      else {
                          resolve(image);
                      }
                  });
              }
              else {
                  const tid = setTimeout(() => {
                      if (isErrorOrCancel(null, promise)) {
                          reject(TaskCancelError);
                          return;
                      }
                      removeTimeOut(tid);
                      resolve(image);
                  }, 1);
              }
          });
          wrapPromise(promise, options);
          return promise;
      }
  }
  let actor;
  let logger = false;
  function getTileActor() {
      if (!getCanvas()) {
          if (!logger) {
              console.error(CANVAS_ERROR_MESSAGE);
              logger = true;
          }
          return null;
      }
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
