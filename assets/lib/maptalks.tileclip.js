/*!
 * maptalks.tileclip v0.13.0
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
  typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
  (global = global || self, factory(global.maptalks = global.maptalks || {}, global.maptalks));
}(this, function (exports, maptalks) { 'use strict';

  var WORKERCODE = `(function(e){"use strict";function t(e){let t=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];switch(e.type){case"FeatureCollection":const o=e.features.length;for(let r=0;r<o;r++)n(e.features[r],t);break;case"Feature":n(e,t);break;default:r(e,t)}return t}function n(e,t){r(e.geometry,t)}function r(e,t){if(e)switch(e.type){case"Point":o(e.coordinates,t);break;case"MultiPoint":case"LineString":i(e.coordinates,t);break;case"MultiLineString":!function(e,t){for(let n=0,r=e.length;n<r;n++)i(e[n],t)}(e.coordinates,t);break;case"Polygon":a(e.coordinates,t);break;case"MultiPolygon":!function(e,t){for(let n=0,r=e.length;n<r;n++)a(e[n],t)}(e.coordinates,t);break;case"GeometryCollection":const n=e.geometries.length;for(let o=0;o<n;o++)r(e.geometries[o],t)}}function o(e,t){t[0]=Math.min(t[0],e[0]),t[1]=Math.min(t[1],e[1]),t[2]=Math.max(t[2],e[0]),t[3]=Math.max(t[3],e[1])}function i(e,t){for(let n=0,r=e.length;n<r;n++)o(e[n],t)}function a(e,t){e.length&&i(e[0],t)}var s=c;function c(e,t,n){var r,o,i,a,s,c=e.length,f=l(e[0],t),h=[];for(n||(n=[]),r=1;r<c;r++){for(o=e[r-1],a=s=l(i=e[r],t);;){if(!(f|a)){h.push(o),a!==s?(h.push(i),r<c-1&&(n.push(h),h=[])):r===c-1&&h.push(i);break}if(f&a)break;f?f=l(o=u(o,i,f,t),t):a=l(i=u(o,i,a,t),t)}f=s}return h.length&&n.push(h),n}function u(e,t,n,r){return 8&n?[e[0]+(t[0]-e[0])*(r[3]-e[1])/(t[1]-e[1]),r[3]]:4&n?[e[0]+(t[0]-e[0])*(r[1]-e[1])/(t[1]-e[1]),r[1]]:2&n?[r[2],e[1]+(t[1]-e[1])*(r[2]-e[0])/(t[0]-e[0])]:1&n?[r[0],e[1]+(t[1]-e[1])*(r[0]-e[0])/(t[0]-e[0])]:null}function l(e,t){var n=0;return e[0]<t[0]?n|=1:e[0]>t[2]&&(n|=2),e[1]<t[1]?n|=4:e[1]>t[3]&&(n|=8),n}let f;function h(e=256){return!f&&OffscreenCanvas&&(f=new OffscreenCanvas(1,1)),f&&(f.width=f.height=e),f}function g(e){const t=e.canvas;e.clearRect(0,0,t.width,t.height)}function d(e){return e.getContext("2d")}function m(e){const t=h(e);return g(d(t)),t.transferToImageBitmap()}function p(e,t,n){const r=d(e);g(r),r.save();r.beginPath(),t.forEach((e=>{(e=>{for(let t=0,n=e.length;t<n;t++){const n=e[t],o=n[0],i=n[n.length-1],[a,s]=o,[c,u]=i;a===c&&s===u||n.push(o);for(let e=0,t=n.length;e<t;e++){const[t,o]=n[e];0===e?r.moveTo(t,o):r.lineTo(t,o)}}})(e)})),r.clip("evenodd"),r.drawImage(n,0,0,e.width,e.height);const o=e.transferToImageBitmap();return r.restore(),o}function v(e,t,n){if(!n)return t;e.width=t.width,e.height=t.height;const r=d(e);g(r),r.save(),r.filter=n,r.drawImage(t,0,0),r.restore();return e.transferToImageBitmap()}c.polyline=c,c.polygon=function(e,t){var n,r,o,i,a,s,c;for(r=1;r<=8;r*=2){for(n=[],i=!(l(o=e[e.length-1],t)&r),a=0;a<e.length;a++)(c=!(l(s=e[a],t)&r))!==i&&n.push(u(o,s,r,t)),c&&n.push(s),o=s,i=c;if(!(e=n).length)break}return n};const w={};function I(e){return"EPSG:3857"===e}function b(e,n){return function(e){if(!e)return!1;const t=(e.geometry||{}).type;return"Polygon"===t||"MultiPolygon"===t}(n)?w[e]?new Error("the"+e+" geojson Already exists"):(w[e]=n,function(e){e.bbox=e.bbox||t(e)}(n),n):new Error("geojson.feature is not Polygon")}function y(e){const[t,n]=e,r=6378137,o=t*Math.PI/180*r,i=n*Math.PI/180;return[o,3189068.5*Math.log((1+Math.sin(i))/(1-Math.sin(i)))]}function M(e,t){if(I(e)){const e=t=>{const n=[];for(let r=0,o=t.length;r<o;r++){const o=t[r];Array.isArray(o[0])?n.push(e(o)):n[r]=y(o)}return n};return e(t)}return t}function E(e,t,n){const[r,o,i,a]=e,s=(i-r)/t,c=(a-o)/t,[u,l]=n;return[(u-r)/s,t-(l-o)/c]}function T(e,t,n,r){const[o,i,a,s]=t,c=(e,t)=>{const r=[];for(let o=0,i=e.length;o<i;o++){const i=e[o];Array.isArray(i[0])?r.push(c(i,t)):r[o]=E(t,n,i)}return r};if(I(e)){const[e,t]=y([o,i]),[n,u]=y([a,s]);return c(r,[e,t,n,u])}return c(r,t)}function k(e={}){return new Promise(((t,n)=>{const{tile:r,tileBBOX:o,projection:i,tileSize:a,maskId:c,returnBlobURL:u}=e;if(!r)return void n(new Error("tile is null.It should be a ImageBitmap"));if(!o)return void n(new Error("tileBBOX is null"));if(!i)return void n(new Error("projection is null"));if(!a)return void n(new Error("tileSize is null"));if(!c)return void n(new Error("maskId is null"));const l=w[c];if(!l)return void n(new Error("not find mask by maskId:"+c));const f=h(a);if(!f)return void n(new Error("not find canvas.The current environment does not support OffscreenCanvas"));const v=e=>{u?function(e){const t=h();t.width=e.width,t.height=e.height;const n=d(t);return g(n),n.drawImage(e,0,0),t.convertToBlob()}(e).then((e=>{const n=URL.createObjectURL(e);t(n)})).catch((e=>{n(e)})):t(e)},I=l.bbox;if(!I)return void v(r);const{coordinates:b,type:y}=l.geometry;if(!b.length)return void v(r);if(k=o,(E=I)[2]<k[0]||E[1]>k[3]||E[0]>k[2]||E[3]<k[1])return void v(m(a));var E,k;let x,P=b;if("Polygon"===y&&(P=[P]),function(e,t){const[n,r,o,i]=e;return n>=t[0]&&o<=t[2]&&r>=t[1]&&i<=t[3]}(I,o)){x=M(i,P);return void v(p(f,T(i,o,a,x),r))}const N=e=>{if(e.length>0){let t=1/0,n=-1/0,r=1/0,o=-1/0;for(let i=0,a=e.length;i<a;i++){const[a,s]=e[i];t=Math.min(a,t),r=Math.min(s,r),n=Math.max(a,n),o=Math.max(s,o)}if(t!==n&&r!==o)return!0}return!1},B=[];for(let e=0,t=P.length;e<t;e++){const t=P[e];for(let e=0,n=t.length;e<n;e++){const n=t[e],r=s.polygon(n,o);N(r)&&B.push([r])}}if(0===B.length)return void v(m());x=M(i,B);v(p(f,T(i,o,a,x),r))}))}const x=new Error("not find canvas.The current environment does not support OffscreenCanvas"),P={accept:"image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8","User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.26"};function N(e){return"number"==typeof e}function B(e={}){const{urlTemplate:t,x:n,y:r,z:o,maxAvailableZoom:i}=e,a=i&&N(i)&&i>=1;return new Promise(((s,c)=>{if(!a)return void c(new Error("maxAvailableZoom is error"));if(!t)return void c(new Error("urlTemplate is error"));if(!N(n)||!N(r)||!N(o))return void c(new Error("x/y/z is error"));let u,l,f,m,p=n,w=r,I=o;const b=o-i;if(b>0){let e=n,t=r,a=o;for(;a>i;)e=Math.floor(e/2),t=Math.floor(t/2),a--;const s=Math.pow(2,b);let c=Math.floor(e*s),h=c+s,g=Math.floor(t*s),d=g+s;c>n&&(c--,h--),g>r&&(g--,d--),u=(n-c)/(h-c),l=(r-g)/(d-g),f=1/(h-c),m=1/(d-g),p=e,w=t,I=i}const y=t.replace("{x}",p).replace("{y}",w).replace("{z}",I);fetch(y,{headers:P}).then((e=>e.blob())).then((e=>createImageBitmap(e))).then((t=>{let n;const r=e.filter;if(r){const e=h();if(!e)return void c(x);n=v(e,t,r)}else n=t;if(b<=0)return void s(n);const o=h();if(!o)return void c(x);const{width:i,height:a}=n,p=function(e,t,n,r,o,i){e.width=t.width,e.height=t.height;const a=d(e);return g(a),a.save(),a.drawImage(t,n,r,o,i,0,0,e.width,e.height),a.restore(),e.transferToImageBitmap()}(o,n,i*u,a*l,i*f,a*m);s(p)})).catch((e=>{c(e)}))}))}e.initialize=function(){},e.onmessage=function(e,t){const n=e.data||{},r=n._type;if("getTile"!==r)if("getTileWithMaxZoom"!==r)if("clipTile"!==r){if("injectMask"===r){const e=b(n.maskId,n.geojsonFeature);return e instanceof Error?void t(e):void t()}if("removeMask"===r)return o=n.maskId,delete w[o],void t();var o;console.error("not support message type:",r)}else k(n).then((e=>{const n=[];e instanceof ImageBitmap&&n.push(e),t(null,e,n)})).catch((e=>{t(e)}));else B(n).then((e=>{t(null,e,[e])})).catch((e=>{t(e)}));else{const{url:e}=n;(function(e,t={}){return new Promise(((n,r)=>{e?fetch(e,{headers:P}).then((e=>e.blob())).then((e=>createImageBitmap(e))).then((e=>{const o=t.filter;if(o){const t=h();t?n(v(t,e,o)):r(x)}else n(e)})).catch((e=>{r(e)})):r(new Error("url is null"))}))})(e,n).then((e=>{t(null,e,[e])})).catch((e=>{t(e)}))}},Object.defineProperty(e,"__esModule",{value:!0})})`;

  function isPolygon(feature) {
      if (!feature) {
          return false;
      }
      const geometry = feature.geometry || {};
      const type = geometry.type;
      return type === 'Polygon' || type === 'MultiPolygon';
  }

  const WORKERNAME = '__maptalks.tileclip';

  maptalks.registerWorkerAdapter(WORKERNAME, WORKERCODE);

  const maskMap = {};

  class TileActor extends maptalks.worker.Actor {

      getTile(options = {}) {
          return new Promise((resolve, reject) => {
              this.send(Object.assign({}, { _type: 'getTile' }, options), null, (error, image) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(image);
                  }
              });
          });
      }

      getTileWithMaxZoom(options = {}) {
          return new Promise((resolve, reject) => {
              this.send(Object.assign({}, { _type: 'getTileWithMaxZoom' }, options), null, (error, image) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(image);
                  }
              });
          });
      }

      clipTile(options = {}) {
          return new Promise((resolve, reject) => {
              const buffers = [];
              if (options.tile && options.tile instanceof ImageBitmap) {
                  buffers.push(options.tile);
              }
              this.send(Object.assign({}, { _type: 'clipTile' }, options), buffers, (error, image) => {
                  if (error) {
                      reject(error);
                  } else {
                      resolve(image);
                  }
              });
          });
      }

      injectMask(maskId, geojsonFeature) {
          return new Promise((resolve, reject) => {
              if (!maskId) {
                  reject(new Error('maskId is null'));
                  return;
              }
              if (maskMap[maskId]) {
                  reject(new Error(`${maskId} has injected`));
                  return;
              }
              if (!isPolygon(geojsonFeature)) {
                  reject(new Error('geojsonFeature is not Polygon,It should be GeoJSON Polygon/MultiPolygon'));
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
                  resolve();
                  maskMap[maskId] = true;
              });
          });
      }

      removeMask(maskId) {
          return new Promise((resolve, reject) => {
              if (!maskId) {
                  reject(new Error('maskId is null'));
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
                  resolve();
                  delete maskMap[maskId];
              });
          });
      }

      maskHasInjected(maskId) {
          if (!maskId) {
              console.error('maskId is null');
              return false;
          }
          return !!maskMap[maskId];
      }
  }

  let actor;

  function getTileActor() {
      if (!actor) {
          actor = new TileActor(WORKERNAME);
      }
      return actor;
  }

  exports.getTileActor = getTileActor;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=maptalks.tileclip.js.map
