/*!
 * maptalks-study vundefined
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.study = global.study || {}));
})(this, (function (exports) { 'use strict';

  function _mergeNamespaces(n, m) {
    m.forEach(function (e) {
      e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
        if (k !== 'default' && !(k in n)) {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    });
    return Object.freeze(n);
  }

  var sphericalmercator$1 = {exports: {}};

  (function (module, exports) {
  var SphericalMercator = (function(){

  // Closures including constants and other precalculated values.
  var cache = {},
      D2R = Math.PI / 180,
      R2D = 180 / Math.PI,
      // 900913 properties.
      A = 6378137.0,
      MAXEXTENT = 20037508.342789244;

  function isFloat(n){
      return Number(n) === n && n % 1 !== 0;
  }

  // SphericalMercator constructor: precaches calculations
  // for fast tile lookups.
  function SphericalMercator(options) {
      options = options || {};
      this.size = options.size || 256;
      this.expansion = (options.antimeridian === true) ? 2 : 1;
      if (!cache[this.size]) {
          var size = this.size;
          var c = cache[this.size] = {};
          c.Bc = [];
          c.Cc = [];
          c.zc = [];
          c.Ac = [];
          for (var d = 0; d < 30; d++) {
              c.Bc.push(size / 360);
              c.Cc.push(size / (2 * Math.PI));
              c.zc.push(size / 2);
              c.Ac.push(size);
              size *= 2;
          }
      }
      this.Bc = cache[this.size].Bc;
      this.Cc = cache[this.size].Cc;
      this.zc = cache[this.size].zc;
      this.Ac = cache[this.size].Ac;
  }
  // Convert lon lat to screen pixel value
  //
  // - `ll` {Array} `[lon, lat]` array of geographic coordinates.
  // - `zoom` {Number} zoom level.
  SphericalMercator.prototype.px = function(ll, zoom) {
    if (isFloat(zoom)) {
      var size = this.size * Math.pow(2, zoom);
      var d = size / 2;
      var bc = (size / 360);
      var cc = (size / (2 * Math.PI));
      var ac = size;
      var f = Math.min(Math.max(Math.sin(D2R * ll[1]), -0.9999), 0.9999);
      var x = d + ll[0] * bc;
      var y = d + 0.5 * Math.log((1 + f) / (1 - f)) * -cc;
      (x > ac * this.expansion) && (x = ac * this.expansion);
      (y > ac) && (y = ac);
      //(x < 0) && (x = 0);
      //(y < 0) && (y = 0);
      return [x, y];
    } else {
      var d = this.zc[zoom];
      var f = Math.min(Math.max(Math.sin(D2R * ll[1]), -0.9999), 0.9999);
      var x = Math.round(d + ll[0] * this.Bc[zoom]);
      var y = Math.round(d + 0.5 * Math.log((1 + f) / (1 - f)) * (-this.Cc[zoom]));
      (x > this.Ac[zoom] * this.expansion) && (x = this.Ac[zoom] * this.expansion);
      (y > this.Ac[zoom]) && (y = this.Ac[zoom]);
      //(x < 0) && (x = 0);
      //(y < 0) && (y = 0);
      return [x, y];
    }
  };

  // Convert screen pixel value to lon lat
  //
  // - `px` {Array} `[x, y]` array of geographic coordinates.
  // - `zoom` {Number} zoom level.
  SphericalMercator.prototype.ll = function(px, zoom) {
    if (isFloat(zoom)) {
      var size = this.size * Math.pow(2, zoom);
      var bc = (size / 360);
      var cc = (size / (2 * Math.PI));
      var zc = size / 2;
      var g = (px[1] - zc) / -cc;
      var lon = (px[0] - zc) / bc;
      var lat = R2D * (2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI);
      return [lon, lat];
    } else {
      var g = (px[1] - this.zc[zoom]) / (-this.Cc[zoom]);
      var lon = (px[0] - this.zc[zoom]) / this.Bc[zoom];
      var lat = R2D * (2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI);
      return [lon, lat];
    }
  };

  // Convert tile xyz value to bbox of the form `[w, s, e, n]`
  //
  // - `x` {Number} x (longitude) number.
  // - `y` {Number} y (latitude) number.
  // - `zoom` {Number} zoom.
  // - `tms_style` {Boolean} whether to compute using tms-style.
  // - `srs` {String} projection for resulting bbox (WGS84|900913).
  // - `return` {Array} bbox array of values in form `[w, s, e, n]`.
  SphericalMercator.prototype.bbox = function(x, y, zoom, tms_style, srs) {
      // Convert xyz into bbox with srs WGS84
      if (tms_style) {
          y = (Math.pow(2, zoom) - 1) - y;
      }
      // Use +y to make sure it's a number to avoid inadvertent concatenation.
      var ll = [x * this.size, (+y + 1) * this.size]; // lower left
      // Use +x to make sure it's a number to avoid inadvertent concatenation.
      var ur = [(+x + 1) * this.size, y * this.size]; // upper right
      var bbox = this.ll(ll, zoom).concat(this.ll(ur, zoom));

      // If web mercator requested reproject to 900913.
      if (srs === '900913') {
          return this.convert(bbox, '900913');
      } else {
          return bbox;
      }
  };

  // Convert bbox to xyx bounds
  //
  // - `bbox` {Number} bbox in the form `[w, s, e, n]`.
  // - `zoom` {Number} zoom.
  // - `tms_style` {Boolean} whether to compute using tms-style.
  // - `srs` {String} projection of input bbox (WGS84|900913).
  // - `@return` {Object} XYZ bounds containing minX, maxX, minY, maxY properties.
  SphericalMercator.prototype.xyz = function(bbox, zoom, tms_style, srs) {
      // If web mercator provided reproject to WGS84.
      if (srs === '900913') {
          bbox = this.convert(bbox, 'WGS84');
      }

      var ll = [bbox[0], bbox[1]]; // lower left
      var ur = [bbox[2], bbox[3]]; // upper right
      var px_ll = this.px(ll, zoom);
      var px_ur = this.px(ur, zoom);
      // Y = 0 for XYZ is the top hence minY uses px_ur[1].
      var x = [ Math.floor(px_ll[0] / this.size), Math.floor((px_ur[0] - 1) / this.size) ];
      var y = [ Math.floor(px_ur[1] / this.size), Math.floor((px_ll[1] - 1) / this.size) ];
      var bounds = {
          minX: Math.min.apply(Math, x) < 0 ? 0 : Math.min.apply(Math, x),
          minY: Math.min.apply(Math, y) < 0 ? 0 : Math.min.apply(Math, y),
          maxX: Math.max.apply(Math, x),
          maxY: Math.max.apply(Math, y)
      };
      if (tms_style) {
          var tms = {
              minY: (Math.pow(2, zoom) - 1) - bounds.maxY,
              maxY: (Math.pow(2, zoom) - 1) - bounds.minY
          };
          bounds.minY = tms.minY;
          bounds.maxY = tms.maxY;
      }
      return bounds;
  };

  // Convert projection of given bbox.
  //
  // - `bbox` {Number} bbox in the form `[w, s, e, n]`.
  // - `to` {String} projection of output bbox (WGS84|900913). Input bbox
  //   assumed to be the "other" projection.
  // - `@return` {Object} bbox with reprojected coordinates.
  SphericalMercator.prototype.convert = function(bbox, to) {
      if (to === '900913') {
          return this.forward(bbox.slice(0, 2)).concat(this.forward(bbox.slice(2,4)));
      } else {
          return this.inverse(bbox.slice(0, 2)).concat(this.inverse(bbox.slice(2,4)));
      }
  };

  // Convert lon/lat values to 900913 x/y.
  SphericalMercator.prototype.forward = function(ll) {
      var xy = [
          A * ll[0] * D2R,
          A * Math.log(Math.tan((Math.PI*0.25) + (0.5 * ll[1] * D2R)))
      ];
      // if xy value is beyond maxextent (e.g. poles), return maxextent.
      (xy[0] > MAXEXTENT) && (xy[0] = MAXEXTENT);
      (xy[0] < -MAXEXTENT) && (xy[0] = -MAXEXTENT);
      (xy[1] > MAXEXTENT) && (xy[1] = MAXEXTENT);
      (xy[1] < -MAXEXTENT) && (xy[1] = -MAXEXTENT);
      return xy;
  };

  // Convert 900913 x/y values to lon/lat.
  SphericalMercator.prototype.inverse = function(xy) {
      return [
          (xy[0] * R2D / A),
          ((Math.PI*0.5) - 2.0 * Math.atan(Math.exp(-xy[1] / A))) * R2D
      ];
  };

  return SphericalMercator;

  })();

  {
      module.exports = SphericalMercator;
  }
  }(sphericalmercator$1));

  var sphericalmercator = sphericalmercator$1.exports;

  var tileCover = {};

  var d2r = Math.PI / 180,
      r2d = 180 / Math.PI;

  /**
   * Get the bbox of a tile
   *
   * @name tileToBBOX
   * @param {Array<number>} tile
   * @returns {Array<number>} bbox
   * @example
   * var bbox = tileToBBOX([5, 10, 10])
   * //=bbox
   */
  function tileToBBOX(tile) {
      var e = tile2lon(tile[0] + 1, tile[2]);
      var w = tile2lon(tile[0], tile[2]);
      var s = tile2lat(tile[1] + 1, tile[2]);
      var n = tile2lat(tile[1], tile[2]);
      return [w, s, e, n];
  }

  /**
   * Get a geojson representation of a tile
   *
   * @name tileToGeoJSON
   * @param {Array<number>} tile
   * @returns {Feature<Polygon>}
   * @example
   * var poly = tileToGeoJSON([5, 10, 10])
   * //=poly
   */
  function tileToGeoJSON(tile) {
      var bbox = tileToBBOX(tile);
      var poly = {
          type: 'Polygon',
          coordinates: [[
              [bbox[0], bbox[3]],
              [bbox[0], bbox[1]],
              [bbox[2], bbox[1]],
              [bbox[2], bbox[3]],
              [bbox[0], bbox[3]]
          ]]
      };
      return poly;
  }

  function tile2lon(x, z) {
      return x / Math.pow(2, z) * 360 - 180;
  }

  function tile2lat(y, z) {
      var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
      return r2d * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  }

  /**
   * Get the tile for a point at a specified zoom level
   *
   * @name pointToTile
   * @param {number} lon
   * @param {number} lat
   * @param {number} z
   * @returns {Array<number>} tile
   * @example
   * var tile = pointToTile(1, 1, 20)
   * //=tile
   */
  function pointToTile(lon, lat, z) {
      var tile = pointToTileFraction(lon, lat, z);
      tile[0] = Math.floor(tile[0]);
      tile[1] = Math.floor(tile[1]);
      return tile;
  }

  /**
   * Get the 4 tiles one zoom level higher
   *
   * @name getChildren
   * @param {Array<number>} tile
   * @returns {Array<Array<number>>} tiles
   * @example
   * var tiles = getChildren([5, 10, 10])
   * //=tiles
   */
  function getChildren(tile) {
      return [
          [tile[0] * 2, tile[1] * 2, tile[2] + 1],
          [tile[0] * 2 + 1, tile[1] * 2, tile[2 ] + 1],
          [tile[0] * 2 + 1, tile[1] * 2 + 1, tile[2] + 1],
          [tile[0] * 2, tile[1] * 2 + 1, tile[2] + 1]
      ];
  }

  /**
   * Get the tile one zoom level lower
   *
   * @name getParent
   * @param {Array<number>} tile
   * @returns {Array<number>} tile
   * @example
   * var tile = getParent([5, 10, 10])
   * //=tile
   */
  function getParent(tile) {
      return [tile[0] >> 1, tile[1] >> 1, tile[2] - 1];
  }

  function getSiblings(tile) {
      return getChildren(getParent(tile));
  }

  /**
   * Get the 3 sibling tiles for a tile
   *
   * @name getSiblings
   * @param {Array<number>} tile
   * @returns {Array<Array<number>>} tiles
   * @example
   * var tiles = getSiblings([5, 10, 10])
   * //=tiles
   */
  function hasSiblings(tile, tiles) {
      var siblings = getSiblings(tile);
      for (var i = 0; i < siblings.length; i++) {
          if (!hasTile(tiles, siblings[i])) return false;
      }
      return true;
  }

  /**
   * Check to see if an array of tiles contains a particular tile
   *
   * @name hasTile
   * @param {Array<Array<number>>} tiles
   * @param {Array<number>} tile
   * @returns {boolean}
   * @example
   * var tiles = [
   *     [0, 0, 5],
   *     [0, 1, 5],
   *     [1, 1, 5],
   *     [1, 0, 5]
   * ]
   * hasTile(tiles, [0, 0, 5])
   * //=boolean
   */
  function hasTile(tiles, tile) {
      for (var i = 0; i < tiles.length; i++) {
          if (tilesEqual(tiles[i], tile)) return true;
      }
      return false;
  }

  /**
   * Check to see if two tiles are the same
   *
   * @name tilesEqual
   * @param {Array<number>} tile1
   * @param {Array<number>} tile2
   * @returns {boolean}
   * @example
   * tilesEqual([0, 1, 5], [0, 0, 5])
   * //=boolean
   */
  function tilesEqual(tile1, tile2) {
      return (
          tile1[0] === tile2[0] &&
          tile1[1] === tile2[1] &&
          tile1[2] === tile2[2]
      );
  }

  /**
   * Get the quadkey for a tile
   *
   * @name tileToQuadkey
   * @param {Array<number>} tile
   * @returns {string} quadkey
   * @example
   * var quadkey = tileToQuadkey([0, 1, 5])
   * //=quadkey
   */
  function tileToQuadkey(tile) {
      var index = '';
      for (var z = tile[2]; z > 0; z--) {
          var b = 0;
          var mask = 1 << (z - 1);
          if ((tile[0] & mask) !== 0) b++;
          if ((tile[1] & mask) !== 0) b += 2;
          index += b.toString();
      }
      return index;
  }

  /**
   * Get the tile for a quadkey
   *
   * @name quadkeyToTile
   * @param {string} quadkey
   * @returns {Array<number>} tile
   * @example
   * var tile = quadkeyToTile('00001033')
   * //=tile
   */
  function quadkeyToTile(quadkey) {
      var x = 0;
      var y = 0;
      var z = quadkey.length;

      for (var i = z; i > 0; i--) {
          var mask = 1 << (i - 1);
          var q = +quadkey[z - i];
          if (q === 1) x |= mask;
          if (q === 2) y |= mask;
          if (q === 3) {
              x |= mask;
              y |= mask;
          }
      }
      return [x, y, z];
  }

  /**
   * Get the smallest tile to cover a bbox
   *
   * @name bboxToTile
   * @param {Array<number>} bbox
   * @returns {Array<number>} tile
   * @example
   * var tile = bboxToTile([ -178, 84, -177, 85 ])
   * //=tile
   */
  function bboxToTile(bboxCoords) {
      var min = pointToTile(bboxCoords[0], bboxCoords[1], 32);
      var max = pointToTile(bboxCoords[2], bboxCoords[3], 32);
      var bbox = [min[0], min[1], max[0], max[1]];

      var z = getBboxZoom(bbox);
      if (z === 0) return [0, 0, 0];
      var x = bbox[0] >>> (32 - z);
      var y = bbox[1] >>> (32 - z);
      return [x, y, z];
  }

  function getBboxZoom(bbox) {
      var MAX_ZOOM = 28;
      for (var z = 0; z < MAX_ZOOM; z++) {
          var mask = 1 << (32 - (z + 1));
          if (((bbox[0] & mask) !== (bbox[2] & mask)) ||
              ((bbox[1] & mask) !== (bbox[3] & mask))) {
              return z;
          }
      }

      return MAX_ZOOM;
  }

  /**
   * Get the precise fractional tile location for a point at a zoom level
   *
   * @name pointToTileFraction
   * @param {number} lon
   * @param {number} lat
   * @param {number} z
   * @returns {Array<number>} tile fraction
   * var tile = pointToTileFraction(30.5, 50.5, 15)
   * //=tile
   */
  function pointToTileFraction(lon, lat, z) {
      var sin = Math.sin(lat * d2r),
          z2 = Math.pow(2, z),
          x = z2 * (lon / 360 + 0.5),
          y = z2 * (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);

      // Wrap Tile X
      x = x % z2;
      if (x < 0) x = x + z2;
      return [x, y, z];
  }

  var tilebelt$1 = {
      tileToGeoJSON: tileToGeoJSON,
      tileToBBOX: tileToBBOX,
      getChildren: getChildren,
      getParent: getParent,
      getSiblings: getSiblings,
      hasTile: hasTile,
      hasSiblings: hasSiblings,
      tilesEqual: tilesEqual,
      tileToQuadkey: tileToQuadkey,
      quadkeyToTile: quadkeyToTile,
      pointToTile: pointToTile,
      bboxToTile: bboxToTile,
      pointToTileFraction: pointToTileFraction
  };

  var tilebelt = tilebelt$1;

  /**
   * Given a geometry, create cells and return them in a format easily readable
   * by any software that reads GeoJSON.
   *
   * @alias geojson
   * @param {Object} geom GeoJSON geometry
   * @param {Object} limits an object with min_zoom and max_zoom properties
   * specifying the minimum and maximum level to be tiled.
   * @returns {Object} FeatureCollection of cells formatted as GeoJSON Features
   */
  var geojson = tileCover.geojson = function (geom, limits) {
      return {
          type: 'FeatureCollection',
          features: getTiles(geom, limits).map(tileToFeature)
      };
  };

  function tileToFeature(t) {
      return {
          type: 'Feature',
          geometry: tilebelt.tileToGeoJSON(t),
          properties: {}
      };
  }

  /**
   * Given a geometry, create cells and return them in their raw form,
   * as an array of cell identifiers.
   *
   * @alias tiles
   * @param {Object} geom GeoJSON geometry
   * @param {Object} limits an object with min_zoom and max_zoom properties
   * specifying the minimum and maximum level to be tiled.
   * @returns {Array<Array<number>>} An array of tiles given as [x, y, z] arrays
   */
  var tiles = tileCover.tiles = getTiles;

  /**
   * Given a geometry, create cells and return them as
   * [quadkey](http://msdn.microsoft.com/en-us/library/bb259689.aspx) indexes.
   *
   * @alias indexes
   * @param {Object} geom GeoJSON geometry
   * @param {Object} limits an object with min_zoom and max_zoom properties
   * specifying the minimum and maximum level to be tiled.
   * @returns {Array<String>} An array of tiles given as quadkeys.
   */
  var indexes = tileCover.indexes = function (geom, limits) {
      return getTiles(geom, limits).map(tilebelt.tileToQuadkey);
  };

  function getTiles(geom, limits) {
      var i, tile,
          coords = geom.coordinates,
          maxZoom = limits.max_zoom,
          tileHash = {},
          tiles = [];

      if (geom.type === 'Point') {
          return [tilebelt.pointToTile(coords[0], coords[1], maxZoom)];

      } else if (geom.type === 'MultiPoint') {
          for (i = 0; i < coords.length; i++) {
              tile = tilebelt.pointToTile(coords[i][0], coords[i][1], maxZoom);
              tileHash[toID(tile[0], tile[1], tile[2])] = true;
          }
      } else if (geom.type === 'LineString') {
          lineCover(tileHash, coords, maxZoom);

      } else if (geom.type === 'MultiLineString') {
          for (i = 0; i < coords.length; i++) {
              lineCover(tileHash, coords[i], maxZoom);
          }
      } else if (geom.type === 'Polygon') {
          polygonCover(tileHash, tiles, coords, maxZoom);

      } else if (geom.type === 'MultiPolygon') {
          for (i = 0; i < coords.length; i++) {
              polygonCover(tileHash, tiles, coords[i], maxZoom);
          }
      } else {
          throw new Error('Geometry type not implemented');
      }

      if (limits.min_zoom !== maxZoom) {
          // sync tile hash and tile array so that both contain the same tiles
          var len = tiles.length;
          appendHashTiles(tileHash, tiles);
          for (i = 0; i < len; i++) {
              var t = tiles[i];
              tileHash[toID(t[0], t[1], t[2])] = true;
          }
          return mergeTiles(tileHash, tiles, limits);
      }

      appendHashTiles(tileHash, tiles);
      return tiles;
  }

  function mergeTiles(tileHash, tiles, limits) {
      var mergedTiles = [];

      for (var z = limits.max_zoom; z > limits.min_zoom; z--) {

          var parentTileHash = {};
          var parentTiles = [];

          for (var i = 0; i < tiles.length; i++) {
              var t = tiles[i];

              if (t[0] % 2 === 0 && t[1] % 2 === 0) {
                  var id2 = toID(t[0] + 1, t[1], z),
                      id3 = toID(t[0], t[1] + 1, z),
                      id4 = toID(t[0] + 1, t[1] + 1, z);

                  if (tileHash[id2] && tileHash[id3] && tileHash[id4]) {
                      tileHash[toID(t[0], t[1], t[2])] = false;
                      tileHash[id2] = false;
                      tileHash[id3] = false;
                      tileHash[id4] = false;

                      var parentTile = [t[0] / 2, t[1] / 2, z - 1];

                      if (z - 1 === limits.min_zoom) mergedTiles.push(parentTile);
                      else {
                          parentTileHash[toID(t[0] / 2, t[1] / 2, z - 1)] = true;
                          parentTiles.push(parentTile);
                      }
                  }
              }
          }

          for (i = 0; i < tiles.length; i++) {
              t = tiles[i];
              if (tileHash[toID(t[0], t[1], t[2])]) mergedTiles.push(t);
          }

          tileHash = parentTileHash;
          tiles = parentTiles;
      }

      return mergedTiles;
  }

  function polygonCover(tileHash, tileArray, geom, zoom) {
      var intersections = [];

      for (var i = 0; i < geom.length; i++) {
          var ring = [];
          lineCover(tileHash, geom[i], zoom, ring);

          for (var j = 0, len = ring.length, k = len - 1; j < len; k = j++) {
              var m = (j + 1) % len;
              var y = ring[j][1];

              // add interesction if it's not local extremum or duplicate
              if ((y > ring[k][1] || y > ring[m][1]) && // not local minimum
                  (y < ring[k][1] || y < ring[m][1]) && // not local maximum
                  y !== ring[m][1]) intersections.push(ring[j]);
          }
      }

      intersections.sort(compareTiles); // sort by y, then x

      for (i = 0; i < intersections.length; i += 2) {
          // fill tiles between pairs of intersections
          y = intersections[i][1];
          for (var x = intersections[i][0] + 1; x < intersections[i + 1][0]; x++) {
              var id = toID(x, y, zoom);
              if (!tileHash[id]) {
                  tileArray.push([x, y, zoom]);
              }
          }
      }
  }

  function compareTiles(a, b) {
      return (a[1] - b[1]) || (a[0] - b[0]);
  }

  function lineCover(tileHash, coords, maxZoom, ring) {
      var prevX, prevY;

      for (var i = 0; i < coords.length - 1; i++) {
          var start = tilebelt.pointToTileFraction(coords[i][0], coords[i][1], maxZoom),
              stop = tilebelt.pointToTileFraction(coords[i + 1][0], coords[i + 1][1], maxZoom),
              x0 = start[0],
              y0 = start[1],
              x1 = stop[0],
              y1 = stop[1],
              dx = x1 - x0,
              dy = y1 - y0;

          if (dy === 0 && dx === 0) continue;

          var sx = dx > 0 ? 1 : -1,
              sy = dy > 0 ? 1 : -1,
              x = Math.floor(x0),
              y = Math.floor(y0),
              tMaxX = dx === 0 ? Infinity : Math.abs(((dx > 0 ? 1 : 0) + x - x0) / dx),
              tMaxY = dy === 0 ? Infinity : Math.abs(((dy > 0 ? 1 : 0) + y - y0) / dy),
              tdx = Math.abs(sx / dx),
              tdy = Math.abs(sy / dy);

          if (x !== prevX || y !== prevY) {
              tileHash[toID(x, y, maxZoom)] = true;
              if (ring && y !== prevY) ring.push([x, y]);
              prevX = x;
              prevY = y;
          }

          while (tMaxX < 1 || tMaxY < 1) {
              if (tMaxX < tMaxY) {
                  tMaxX += tdx;
                  x += sx;
              } else {
                  tMaxY += tdy;
                  y += sy;
              }
              tileHash[toID(x, y, maxZoom)] = true;
              if (ring && y !== prevY) ring.push([x, y]);
              prevX = x;
              prevY = y;
          }
      }

      if (ring && y === ring[0][1]) ring.pop();
  }

  function appendHashTiles(hash, tiles) {
      var keys = Object.keys(hash);
      for (var i = 0; i < keys.length; i++) {
          tiles.push(fromID(+keys[i]));
      }
  }

  function toID(x, y, z) {
      var dim = 2 * (1 << z);
      return ((dim * y + x) * 32) + z;
  }

  function fromID(id) {
      var z = id % 32,
          dim = 2 * (1 << z),
          xy = ((id - z) / 32),
          x = xy % dim,
          y = ((xy - x) / dim) % dim;
      return [x, y, z];
  }

  var index = /*#__PURE__*/_mergeNamespaces({
    __proto__: null,
    'default': tileCover,
    geojson: geojson,
    tiles: tiles,
    indexes: indexes
  }, [tileCover]);

  function bbox(geojson) {
    let b = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ];
    switch (geojson.type) {
      case 'FeatureCollection':
        const len = geojson.features.length;
        for (let i = 0; i < len; i++) {
          feature(geojson.features[i], b);
        }
        break;
      case 'Feature':
        feature(geojson, b);
        break;
      default:
        geometry(geojson, b);
        break;
    }
    return b;
  }

  function feature(f, b) {
    geometry(f.geometry, b);
  }

  function geometry(g, b) {
    if (!g) {
      return;
    }
    switch (g.type) {
      case 'Point':
        point(g.coordinates, b);
        break;
      case 'MultiPoint':
        line(g.coordinates, b);
        break;
      case 'LineString':
        line(g.coordinates, b);
        break;
      case 'MultiLineString':
        multiline(g.coordinates, b);
        break;
      case 'Polygon':
        polygon(g.coordinates, b);
        break;
      case 'MultiPolygon':
        multipolygon(g.coordinates, b);
        break;
      case 'GeometryCollection':
        const len = g.geometries.length;
        for (let i = 0; i < len; i++) {
          geometry(g.geometries[i], b);
        }
        break;
    }
  }

  function point(p, b) {
    b[0] = Math.min(b[0], p[0]);
    b[1] = Math.min(b[1], p[1]);
    b[2] = Math.max(b[2], p[0]);
    b[3] = Math.max(b[3], p[1]);
  }

  function line(l, b) {
    for (let i = 0, len = l.length; i < len; i++) {
      point(l[i], b);
    }
  }

  function multiline(ml, b) {
    for (let i = 0, len = ml.length; i < len; i++) {
      line(ml[i], b);
    }
  }

  function polygon(p, b) {
    //Just calculate the outer ring,Don't participate in the calculation of holes
    //测试10000个鄱阳湖的数据,表现为性能可以提高25%
    if (p.length) {
      line(p[0], b);
    }
  }

  function multipolygon(mp, b) {
    for (let i = 0, len = mp.length; i < len; i++) {
      polygon(mp[i], b);
    }
  }

  exports.GeoJSONBBOX = bbox;
  exports.SphericalMercator = sphericalmercator;
  exports.TileCover = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=maptalks-study.js.map
