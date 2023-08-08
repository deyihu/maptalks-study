(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bbox = factory());
})(this, (function () { 'use strict';

  function bbox(geojson) {
    let b = [
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
    ];
    switch (geojson.type) {
      case 'FeatureCollection':
        for (let i = 0; i < geojson.features.length; i++) {
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
        polygon(g.coordinates, b);
        break;
      case 'Polygon':
        polygon(g.coordinates, b);
        break;
      case 'MultiPolygon':
        multipolygon(g.coordinates, b);
        break;
      case 'GeometryCollection':
        for (let i = 0; i < g.geometries.length; i++) {
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
    for (let i = 0; i < l.length; i++) {
      point(l[i], b);
    }
  }

  function polygon(p, b) {
    for (let i = 0; i < p.length; i++) {
      line(p[i], b);
    }
  }

  function multipolygon(mp, b) {
    for (let i = 0; i < mp.length; i++) {
      polygon(mp[i], b);
    }
  }

  return bbox;

}));
