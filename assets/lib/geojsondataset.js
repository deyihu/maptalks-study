/*!
 * geojsondataset v0.0.6
 * LICENSE : BSD 3-Clause License
 * */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.geojsondataset = global.geojsondataset || {}));
})(this, (function (exports) { 'use strict';

  /*!
   * geojson-seg v0.0.6
    */
  /**
   *
   * @param {*} geojson
   * @param {*} coordinateCount per geojons coordinate count
   * @returns
   */
  function seg(geojson, coordinateCount = 5000) {
      if (isArray(geojson)) {
          return arraySeg(geojson.data || geojson.RECORDS || geojson, coordinateCount);
      }
      if (!geojson || !geojson.features || geojson.features.length === 0) {
          return [];
      }
      const geojsons = [];
      let totalCount = 0;
      let features = [];
      for (let i = 0, len = geojson.features.length; i < len; i++) {
          const count = measureCoordianteCount(geojson.features[i]);
          if (count >= coordinateCount) {
              geojsons.push(getGeoJSON([geojson.features[i]], count));
              // if (count > coordinateCount) {
              //     console.warn(geojson.features[i], `is big ,coordinate count(${count}) >${coordinateCount}`);
              // }
              continue;
          }
          if (count + totalCount <= coordinateCount) {
              features.push(geojson.features[i]);
              totalCount += count;
          } else {
              geojsons.push(getGeoJSON(features, totalCount));
              features = [geojson.features[i]];
              totalCount = count;
          }
      }
      if (features.length) {
          geojsons.push(getGeoJSON(features, totalCount));
      }
      return geojsons;
  }

  function isArray(geojson) {
      return Array.isArray(geojson) || Array.isArray(geojson.data) || Array.isArray(geojson.RECORDS);
  }

  function arraySeg(data, coordinateCount) {
      const result = [], errorData = [];
      let features = [], totalCount = 0;
      for (let i = 0, len = data.length; i < len; i++) {
          const d = data[i];
          const { lnglat, lnglats, coordinates, fanwei, zuobiao, xy, xys, location } = (d || {});
          const ll = lnglats || lnglat || coordinates || fanwei || zuobiao || xy || xys || location;
          if (!ll || ll.indexOf(',') === -1 || !(typeof ll === 'string') || ll.indexOf('encode:') > -1) {
              errorData.push(d);
              continue;
          }
          let count = 0;
          if (ll.replaceAll) {
              const strLen = ll.length;
              const str = ll.replaceAll(',', '');
              count = strLen - str.length;
          } else {
              count = ll.split(',').length - 1;
          }
          if (ll.indexOf(';') === -1) {
              count /= 2;
          }
          // d._coordinateCount = count;
          if (count >= coordinateCount) {
              result.push([d]);
              continue;
          }
          if (totalCount + count <= coordinateCount) {
              features.push(d);
              totalCount += count;
          } else {
              result.push(features);
              features = [d];
              totalCount = count;
          }
      }
      if (features.length) {
          result.push(features);
      }
      if (errorData.length) {
          result.push(errorData);
      }
      return result;
  }

  // const APPLICATION_JSON = { type: 'application/json' };
  // const MB_SIZE = 1024 * 1024;

  function measureCoordianteCount(feature) {
      if (feature.geometry && feature.geometry.coordinates && Array.isArray(feature.geometry.coordinates)) {
          const { coordinates } = feature.geometry;
          if (Array.isArray(coordinates[0])) {
              return forEachRing(coordinates);
          }
          // point
          return 1;
      }
      return 0;
  }

  function forEachRing(coordinates) {
      // multipoint,linestring
      if (!Array.isArray(coordinates[0][0])) {
          return coordinates.length;
      }
      // MultiLineString,Polyogn,MultiPolygon
      let count = 0;
      for (let i = 0, len = coordinates.length; i < len; i++) {
          count += forEachRing(coordinates[i]);
      }
      return count;
  }

  function getGeoJSON(features, coordinateCount) {
      return {
          type: 'FeatureCollection',
          features,
          coordinateCount
      };
  }

  function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

  const OPTIONS = {
      coordinateCount: 3000,
      //loop per fps
      loopFPS: 1
  };

  class GeoDataSet {
      constructor(options) {
          this.options = Object.assign({}, OPTIONS, options);
          this.dataSet = {};
          this._mitt = mitt();
          this._loopFPS = 0;
          this._loop();
      }

      addGeoData(dataGroupId, geojson) {
          this.dataSet[dataGroupId] = this.dataSet[dataGroupId] || [];
          const geojsons = seg(geojson, this.options.coordinateCount);
          geojsons.forEach(geojson => {
              this.dataSet[dataGroupId].push(geojson);
          });
          return this;
      }

      on(dataGroupId, hanlder) {
          this._mitt.on(dataGroupId, hanlder);
          return this;
      }

      off(dataGroupId, hanlder) {
          this._mitt.off(dataGroupId, hanlder);
          return this;
      }

      _fire(dataGroupId, data) {
          this._mitt.emit(dataGroupId, data);
          return this;
      }

      _loop() {
          this._loopFPS++;
          if (this._loopFPS >= this.options.loopFPS) {
              for (const dataGroupId in this.dataSet) {
                  const geojsons = this.dataSet[dataGroupId] || [];
                  if (geojsons.length) {
                      this._fire(dataGroupId, geojsons[0]);
                      geojsons.splice(0, 1);
                  }
              }
              this._loopFPS = 0;
          }
          requestAnimationFrame(this._loop.bind(this));
      }
  }

  exports.GeoDataSet = GeoDataSet;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=geojsondataset.js.map
