/*!
 * maptalks.tileclip v0.9.0
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
  typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
  (global = global || self, factory(global.maptalks = global.maptalks || {}, global.maptalks));
}(this, function (exports, maptalks) { 'use strict';

  var WORKERCODE = `(function(t){"use strict";function e(t){let e=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];switch(t.type){case"FeatureCollection":const o=t.features.length;for(let r=0;r<o;r++)n(t.features[r],e);break;case"Feature":n(t,e);break;default:r(t,e)}return e}function n(t,e){r(t.geometry,e)}function r(t,e){if(t)switch(t.type){case"Point":o(t.coordinates,e);break;case"MultiPoint":case"LineString":i(t.coordinates,e);break;case"MultiLineString":!function(t,e){for(let n=0,r=t.length;n<r;n++)i(t[n],e)}(t.coordinates,e);break;case"Polygon":s(t.coordinates,e);break;case"MultiPolygon":!function(t,e){for(let n=0,r=t.length;n<r;n++)s(t[n],e)}(t.coordinates,e);break;case"GeometryCollection":const n=t.geometries.length;for(let o=0;o<n;o++)r(t.geometries[o],e)}}function o(t,e){e[0]=Math.min(e[0],t[0]),e[1]=Math.min(e[1],t[1]),e[2]=Math.max(e[2],t[0]),e[3]=Math.max(e[3],t[1])}function i(t,e){for(let n=0,r=t.length;n<r;n++)o(t[n],e)}function s(t,e){t.length&&i(t[0],e)}var c=u;function u(t,e,n){var r,o,i,s,c,u=t.length,f=l(t[0],e),h=[];for(n||(n=[]),r=1;r<u;r++){for(o=t[r-1],s=c=l(i=t[r],e);;){if(!(f|s)){h.push(o),s!==c?(h.push(i),r<u-1&&(n.push(h),h=[])):r===u-1&&h.push(i);break}if(f&s)break;f?f=l(o=a(o,i,f,e),e):s=l(i=a(o,i,s,e),e)}f=c}return h.length&&n.push(h),n}function a(t,e,n,r){return 8&n?[t[0]+(e[0]-t[0])*(r[3]-t[1])/(e[1]-t[1]),r[3]]:4&n?[t[0]+(e[0]-t[0])*(r[1]-t[1])/(e[1]-t[1]),r[1]]:2&n?[r[2],t[1]+(e[1]-t[1])*(r[2]-t[0])/(e[0]-t[0])]:1&n?[r[0],t[1]+(e[1]-t[1])*(r[0]-t[0])/(e[0]-t[0])]:null}function l(t,e){var n=0;return t[0]<e[0]?n|=1:t[0]>e[2]&&(n|=2),t[1]<e[1]?n|=4:t[1]>e[3]&&(n|=8),n}let f;function h(t=256){return!f&&OffscreenCanvas&&(f=new OffscreenCanvas(1,1)),f&&(f.width=f.height=t),f}function g(t){const e=t.canvas;t.clearRect(0,0,e.width,e.height)}function d(t){return t.getContext("2d")}function m(t){const e=h(t);return g(d(e)),e.transferToImageBitmap()}function p(t,e,n){const r=d(t);g(r),r.save();r.beginPath(),e.forEach((t=>{(t=>{for(let e=0,n=t.length;e<n;e++){const n=t[e],o=n[0],i=n[n.length-1],[s,c]=o,[u,a]=i;s===u&&c===a||n.push(o);for(let t=0,e=n.length;t<e;t++){const[e,o]=n[t];0===t?r.moveTo(e,o):r.lineTo(e,o)}}})(t)})),r.clip("evenodd"),r.drawImage(n,0,0,t.width,t.height);const o=t.transferToImageBitmap();return r.restore(),o}u.polyline=u,u.polygon=function(t,e){var n,r,o,i,s,c,u;for(r=1;r<=8;r*=2){for(n=[],i=!(l(o=t[t.length-1],e)&r),s=0;s<t.length;s++)(u=!(l(c=t[s],e)&r))!==i&&n.push(a(o,c,r,e)),u&&n.push(c),o=c,i=u;if(!(t=n).length)break}return n};const v={};function I(t){return"EPSG:3857"===t}function b(t,n){return function(t){if(!t)return!1;const e=(t.geometry||{}).type;return"Polygon"===e||"MultiPolygon"===e}(n)?v[t]?new Error("the"+t+" geojson Already exists"):(v[t]=n,function(t){t.bbox=t.bbox||e(t)}(n),n):new Error("geojson.feature is not Polygon")}function w(t){const[e,n]=t,r=6378137,o=e*Math.PI/180*r,i=n*Math.PI/180;return[o,3189068.5*Math.log((1+Math.sin(i))/(1-Math.sin(i)))]}function y(t,e){if(I(t)){const t=e=>{const n=[];for(let r=0,o=e.length;r<o;r++){const o=e[r];Array.isArray(o[0])?n.push(t(o)):n[r]=w(o)}return n};return t(e)}return e}function E(t,e,n){const[r,o,i,s]=t,c=(i-r)/e,u=(s-o)/e,[a,l]=n;return[(a-r)/c,e-(l-o)/u]}function M(t,e,n,r){const[o,i,s,c]=e,u=(t,e)=>{const r=[];for(let o=0,i=t.length;o<i;o++){const i=t[o];Array.isArray(i[0])?r.push(u(i,e)):r[o]=E(e,n,i)}return r};if(I(t)){const[t,e]=w([o,i]),[n,a]=w([s,c]);return u(r,[t,e,n,a])}return u(r,e)}function k(t={}){return new Promise(((e,n)=>{const{tile:r,tileBBOX:o,projection:i,tileSize:s,maskId:u,returnBlobURL:a}=t;if(!r)return void n(new Error("tile is null.It should be a ImageBitmap"));if(!o)return void n(new Error("tileBBOX is null"));if(!i)return void n(new Error("projection is null"));if(!s)return void n(new Error("tileSize is null"));if(!u)return void n(new Error("maskId is null"));const l=v[u];if(!l)return void n(new Error("not find mask by maskId:"+u));const f=h(s);if(!f)return void n(new Error("not find canvas.The current environment does not support OffscreenCanvas"));const I=t=>{a?function(t){const e=h();e.width=t.width,e.height=t.height;const n=d(e);return g(n),n.drawImage(t,0,0),e.convertToBlob()}(t).then((t=>{const n=URL.createObjectURL(t);e(n)})).catch((t=>{n(t)})):e(t)},b=l.bbox;if(!b)return void I(r);const{coordinates:w,type:E}=l.geometry;if(!w.length)return void I(r);if(T=o,(k=b)[2]<T[0]||k[1]>T[3]||k[0]>T[2]||k[3]<T[1])return void I(m(s));var k,T;let P,N=w;if("Polygon"===E&&(N=[N]),function(t,e){const[n,r,o,i]=t;return n>=e[0]&&o<=e[2]&&r>=e[1]&&i<=e[3]}(b,o)){P=y(i,N);return void I(p(f,M(i,o,s,P),r))}const B=t=>{if(t.length>0){let e=1/0,n=-1/0,r=1/0,o=-1/0;for(let i=0,s=t.length;i<s;i++){const[s,c]=t[i];e=Math.min(s,e),r=Math.min(c,r),n=Math.max(s,n),o=Math.max(c,o)}if(e!==n&&r!==o)return!0}return!1},x=[];for(let t=0,e=N.length;t<e;t++){const e=N[t];for(let t=0,n=e.length;t<n;t++){const n=e[t],r=c.polygon(n,o);B(r)&&x.push([r])}}if(0===x.length)return void I(m());P=y(i,x);I(p(f,M(i,o,s,P),r))}))}function T(t,e={}){return new Promise(((n,r)=>{t?fetch(t).then((t=>t.blob())).then((t=>createImageBitmap(t))).then((t=>{const o=e.filter;if(o){const e=h();e?n(function(t,e,n){if(!n)return e;t.width=e.width,t.height=e.height;const r=d(t);return g(r),r.save(),r.filter=n,r.drawImage(e,0,0),r.restore(),t.transferToImageBitmap()}(e,t,o)):r(new Error("not find canvas.The current environment does not support OffscreenCanvas"))}else n(t)})).catch((t=>{r(t)})):r(new Error("url is null"))}))}t.initialize=function(){},t.onmessage=function(t,e){const n=t.data||{},r=n._type;if("getTile"!==r)if("clipTile"!==r){if("injectMask"===r){const t=b(n.maskId,n.geojsonFeature);return t instanceof Error?void e(t):void e()}if("removeMask"===r)return o=n.maskId,delete v[o],void e();var o;console.error("not support message type:",r)}else k(n).then((t=>{const n=[];t instanceof ImageBitmap&&n.push(t),e(null,t,n)})).catch((t=>{e(t)}));else{const{url:t}=n;T(t,n).then((t=>{e(null,t,[t])})).catch((t=>{e(t)}))}},Object.defineProperty(t,"__esModule",{value:!0})})`;

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
              });
          });
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
