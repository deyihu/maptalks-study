/*!
 * poly-extrude v0.4.0
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.polyextrude = global.polyextrude || {}));
})(this, (function (exports) { 'use strict';

    var earcut$2 = {exports: {}};

    earcut$2.exports = earcut;

    earcut$2.exports["default"] = earcut;

    function earcut(data, holeIndices, dim) {
      dim = dim || 2;
      var hasHoles = holeIndices && holeIndices.length,
          outerLen = hasHoles ? holeIndices[0] * dim : data.length,
          outerNode = linkedList(data, 0, outerLen, dim, true),
          triangles = [];
      if (!outerNode || outerNode.next === outerNode.prev) return triangles;
      var minX, minY, maxX, maxY, x, y, invSize;
      if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim); // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox

      if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
          x = data[i];
          y = data[i + 1];
          if (x < minX) minX = x;
          if (y < minY) minY = y;
          if (x > maxX) maxX = x;
          if (y > maxY) maxY = y;
        } // minX, minY and invSize are later used to transform coords into integers for z-order calculation


        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 32767 / invSize : 0;
      }

      earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
      return triangles;
    } // create a circular doubly linked list from polygon points in the specified winding order


    function linkedList(data, start, end, dim, clockwise) {
      var i, last;

      if (clockwise === signedArea(data, start, end, dim) > 0) {
        for (i = start; i < end; i += dim) {
          last = insertNode(i, data[i], data[i + 1], last);
        }
      } else {
        for (i = end - dim; i >= start; i -= dim) {
          last = insertNode(i, data[i], data[i + 1], last);
        }
      }

      if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
      }

      return last;
    } // eliminate colinear or duplicate points


    function filterPoints(start, end) {
      if (!start) return start;
      if (!end) end = start;
      var p = start,
          again;

      do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
          removeNode(p);
          p = end = p.prev;
          if (p === p.next) break;
          again = true;
        } else {
          p = p.next;
        }
      } while (again || p !== end);

      return end;
    } // main ear slicing loop which triangulates a polygon (given as a linked list)


    function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
      if (!ear) return; // interlink polygon nodes in z-order

      if (!pass && invSize) indexCurve(ear, minX, minY, invSize);
      var stop = ear,
          prev,
          next; // iterate through ears, slicing them one by one

      while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
          // cut off the triangle
          triangles.push(prev.i / dim | 0);
          triangles.push(ear.i / dim | 0);
          triangles.push(next.i / dim | 0);
          removeNode(ear); // skipping the next vertex leads to less sliver triangles

          ear = next.next;
          stop = next.next;
          continue;
        }

        ear = next; // if we looped through the whole remaining polygon and can't find any more ears

        if (ear === stop) {
          // try filtering points and slicing again
          if (!pass) {
            earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1); // if this didn't work, try curing all small self-intersections locally
          } else if (pass === 1) {
            ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
            earcutLinked(ear, triangles, dim, minX, minY, invSize, 2); // as a last resort, try splitting the remaining polygon into two
          } else if (pass === 2) {
            splitEarcut(ear, triangles, dim, minX, minY, invSize);
          }

          break;
        }
      }
    } // check whether a polygon node forms a valid ear with adjacent nodes


    function isEar(ear) {
      var a = ear.prev,
          b = ear,
          c = ear.next;
      if (area(a, b, c) >= 0) return false; // reflex, can't be an ear
      // now make sure we don't have other points inside the potential ear

      var ax = a.x,
          bx = b.x,
          cx = c.x,
          ay = a.y,
          by = b.y,
          cy = c.y; // triangle bbox; min & max are calculated like this for speed

      var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx,
          y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy,
          x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx,
          y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
      var p = c.next;

      while (p !== a) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
      }

      return true;
    }

    function isEarHashed(ear, minX, minY, invSize) {
      var a = ear.prev,
          b = ear,
          c = ear.next;
      if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

      var ax = a.x,
          bx = b.x,
          cx = c.x,
          ay = a.y,
          by = b.y,
          cy = c.y; // triangle bbox; min & max are calculated like this for speed

      var x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx,
          y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy,
          x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx,
          y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy; // z-order range for the current triangle bbox;

      var minZ = zOrder(x0, y0, minX, minY, invSize),
          maxZ = zOrder(x1, y1, minX, minY, invSize);
      var p = ear.prevZ,
          n = ear.nextZ; // look for points inside the triangle in both directions

      while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
      } // look for remaining points in decreasing z-order


      while (p && p.z >= minZ) {
        if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
      } // look for remaining points in increasing z-order


      while (n && n.z <= maxZ) {
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
      }

      return true;
    } // go through all polygon nodes and cure small local self-intersections


    function cureLocalIntersections(start, triangles, dim) {
      var p = start;

      do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
          triangles.push(a.i / dim | 0);
          triangles.push(p.i / dim | 0);
          triangles.push(b.i / dim | 0); // remove two nodes involved

          removeNode(p);
          removeNode(p.next);
          p = start = b;
        }

        p = p.next;
      } while (p !== start);

      return filterPoints(p);
    } // try splitting polygon into two and triangulate them independently


    function splitEarcut(start, triangles, dim, minX, minY, invSize) {
      // look for a valid diagonal that divides the polygon into two
      var a = start;

      do {
        var b = a.next.next;

        while (b !== a.prev) {
          if (a.i !== b.i && isValidDiagonal(a, b)) {
            // split the polygon in two by the diagonal
            var c = splitPolygon(a, b); // filter colinear points around the cuts

            a = filterPoints(a, a.next);
            c = filterPoints(c, c.next); // run earcut on each half

            earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
            earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
            return;
          }

          b = b.next;
        }

        a = a.next;
      } while (a !== start);
    } // link every hole into the outer loop, producing a single-ring polygon without holes


    function eliminateHoles(data, holeIndices, outerNode, dim) {
      var queue = [],
          i,
          len,
          start,
          end,
          list;

      for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
      }

      queue.sort(compareX); // process holes from left to right

      for (i = 0; i < queue.length; i++) {
        outerNode = eliminateHole(queue[i], outerNode);
      }

      return outerNode;
    }

    function compareX(a, b) {
      return a.x - b.x;
    } // find a bridge between vertices that connects hole with an outer ring and and link it


    function eliminateHole(hole, outerNode) {
      var bridge = findHoleBridge(hole, outerNode);

      if (!bridge) {
        return outerNode;
      }

      var bridgeReverse = splitPolygon(bridge, hole); // filter collinear points around the cuts

      filterPoints(bridgeReverse, bridgeReverse.next);
      return filterPoints(bridge, bridge.next);
    } // David Eberly's algorithm for finding a bridge between hole and outer polygon


    function findHoleBridge(hole, outerNode) {
      var p = outerNode,
          hx = hole.x,
          hy = hole.y,
          qx = -Infinity,
          m; // find a segment intersected by a ray from the hole's leftmost point to the left;
      // segment's endpoint with lesser x will be potential connection point

      do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
          var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);

          if (x <= hx && x > qx) {
            qx = x;
            m = p.x < p.next.x ? p : p.next;
            if (x === hx) return m; // hole touches outer segment; pick leftmost endpoint
          }
        }

        p = p.next;
      } while (p !== outerNode);

      if (!m) return null; // look for points inside the triangle of hole point, segment intersection and endpoint;
      // if there are no points found, we have a valid connection;
      // otherwise choose the point of the minimum angle with the ray as connection point

      var stop = m,
          mx = m.x,
          my = m.y,
          tanMin = Infinity,
          tan;
      p = m;

      do {
        if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
          tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

          if (locallyInside(p, hole) && (tan < tanMin || tan === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
            m = p;
            tanMin = tan;
          }
        }

        p = p.next;
      } while (p !== stop);

      return m;
    } // whether sector in vertex m contains sector in vertex p in the same coordinates


    function sectorContainsSector(m, p) {
      return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
    } // interlink polygon nodes in z-order


    function indexCurve(start, minX, minY, invSize) {
      var p = start;

      do {
        if (p.z === 0) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
      } while (p !== start);

      p.prevZ.nextZ = null;
      p.prevZ = null;
      sortLinked(p);
    } // Simon Tatham's linked list merge sort algorithm
    // http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html


    function sortLinked(list) {
      var i,
          p,
          q,
          e,
          tail,
          numMerges,
          pSize,
          qSize,
          inSize = 1;

      do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
          numMerges++;
          q = p;
          pSize = 0;

          for (i = 0; i < inSize; i++) {
            pSize++;
            q = q.nextZ;
            if (!q) break;
          }

          qSize = inSize;

          while (pSize > 0 || qSize > 0 && q) {
            if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
              e = p;
              p = p.nextZ;
              pSize--;
            } else {
              e = q;
              q = q.nextZ;
              qSize--;
            }

            if (tail) tail.nextZ = e;else list = e;
            e.prevZ = tail;
            tail = e;
          }

          p = q;
        }

        tail.nextZ = null;
        inSize *= 2;
      } while (numMerges > 1);

      return list;
    } // z-order of a point given coords and inverse of the longer side of data bbox


    function zOrder(x, y, minX, minY, invSize) {
      // coords are transformed into non-negative 15-bit integer range
      x = (x - minX) * invSize | 0;
      y = (y - minY) * invSize | 0;
      x = (x | x << 8) & 0x00FF00FF;
      x = (x | x << 4) & 0x0F0F0F0F;
      x = (x | x << 2) & 0x33333333;
      x = (x | x << 1) & 0x55555555;
      y = (y | y << 8) & 0x00FF00FF;
      y = (y | y << 4) & 0x0F0F0F0F;
      y = (y | y << 2) & 0x33333333;
      y = (y | y << 1) & 0x55555555;
      return x | y << 1;
    } // find the leftmost node of a polygon ring


    function getLeftmost(start) {
      var p = start,
          leftmost = start;

      do {
        if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y) leftmost = p;
        p = p.next;
      } while (p !== start);

      return leftmost;
    } // check if a point lies within a convex triangle


    function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
      return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
    } // check if a diagonal between two polygon nodes is valid (lies in polygon interior)


    function isValidDiagonal(a, b) {
      return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && ( // dones't intersect other edges
      locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && ( // locally visible
      area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
      equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
    } // signed area of a triangle


    function area(p, q, r) {
      return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    } // check if two points are equal


    function equals(p1, p2) {
      return p1.x === p2.x && p1.y === p2.y;
    } // check if two segments intersect


    function intersects(p1, q1, p2, q2) {
      var o1 = sign(area(p1, q1, p2));
      var o2 = sign(area(p1, q1, q2));
      var o3 = sign(area(p2, q2, p1));
      var o4 = sign(area(p2, q2, q1));
      if (o1 !== o2 && o3 !== o4) return true; // general case

      if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1

      if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1

      if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2

      if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

      return false;
    } // for collinear points p, q, r, check if point q lies on segment pr


    function onSegment(p, q, r) {
      return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
    }

    function sign(num) {
      return num > 0 ? 1 : num < 0 ? -1 : 0;
    } // check if a polygon diagonal intersects any polygon segments


    function intersectsPolygon(a, b) {
      var p = a;

      do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b)) return true;
        p = p.next;
      } while (p !== a);

      return false;
    } // check if a polygon diagonal is locally inside the polygon


    function locallyInside(a, b) {
      return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
    } // check if the middle point of a polygon diagonal is inside the polygon


    function middleInside(a, b) {
      var p = a,
          inside = false,
          px = (a.x + b.x) / 2,
          py = (a.y + b.y) / 2;

      do {
        if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x) inside = !inside;
        p = p.next;
      } while (p !== a);

      return inside;
    } // link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
    // if one belongs to the outer ring and another to a hole, it merges it into a single ring


    function splitPolygon(a, b) {
      var a2 = new Node(a.i, a.x, a.y),
          b2 = new Node(b.i, b.x, b.y),
          an = a.next,
          bp = b.prev;
      a.next = b;
      b.prev = a;
      a2.next = an;
      an.prev = a2;
      b2.next = a2;
      a2.prev = b2;
      bp.next = b2;
      b2.prev = bp;
      return b2;
    } // create a node and optionally link it with previous one (in a circular doubly linked list)


    function insertNode(i, x, y, last) {
      var p = new Node(i, x, y);

      if (!last) {
        p.prev = p;
        p.next = p;
      } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
      }

      return p;
    }

    function removeNode(p) {
      p.next.prev = p.prev;
      p.prev.next = p.next;
      if (p.prevZ) p.prevZ.nextZ = p.nextZ;
      if (p.nextZ) p.nextZ.prevZ = p.prevZ;
    }

    function Node(i, x, y) {
      // vertex index in coordinates array
      this.i = i; // vertex coordinates

      this.x = x;
      this.y = y; // previous and next vertex nodes in a polygon ring

      this.prev = null;
      this.next = null; // z-order curve value

      this.z = 0; // previous and next nodes in z-order

      this.prevZ = null;
      this.nextZ = null; // indicates whether this is a steiner point

      this.steiner = false;
    } // return a percentage difference between the polygon area and its triangulation area;
    // used to verify correctness of triangulation


    earcut.deviation = function (data, holeIndices, dim, triangles) {
      var hasHoles = holeIndices && holeIndices.length;
      var outerLen = hasHoles ? holeIndices[0] * dim : data.length;
      var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));

      if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
          var start = holeIndices[i] * dim;
          var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
          polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
      }

      var trianglesArea = 0;

      for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs((data[a] - data[c]) * (data[b + 1] - data[a + 1]) - (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
      }

      return polygonArea === 0 && trianglesArea === 0 ? 0 : Math.abs((trianglesArea - polygonArea) / polygonArea);
    };

    function signedArea(data, start, end, dim) {
      var sum = 0;

      for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
      }

      return sum;
    } // turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts


    earcut.flatten = function (data) {
      var dim = data[0][0].length,
          result = {
        vertices: [],
        holes: [],
        dimensions: dim
      },
          holeIndex = 0;

      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          for (var d = 0; d < dim; d++) {
            result.vertices.push(data[i][j][d]);
          }
        }

        if (i > 0) {
          holeIndex += data[i - 1].length;
          result.holes.push(holeIndex);
        }
      }

      return result;
    };

    var earcut$1 = earcut$2.exports;

    /**
     * https://github.com/Turfjs/turf/blob/master/packages/turf-boolean-clockwise/index.ts
     * @param {*} ring
     * @returns
     */
    function isClockwise(ring) {
      var sum = 0;
      var i = 1;
      var prev;
      var cur;
      var len = ring.length;

      while (i < len) {
        prev = cur || ring[0];
        cur = ring[i];
        sum += (cur[0] - prev[0]) * (cur[1] + prev[1]);
        i++;
      }

      return sum > 0;
    }

    function v3Sub(out, v1, v2) {
      out[0] = v1[0] - v2[0];
      out[1] = v1[1] - v2[1];
      out[2] = v1[2] - v2[2];
      return out;
    }

    function v3Normalize(out, v) {
      var x = v[0];
      var y = v[1];
      var z = v[2];
      var d = Math.sqrt(x * x + y * y + z * z) || 1;
      out[0] = x / d;
      out[1] = y / d;
      out[2] = z / d;
      return out;
    }

    function v3Cross(out, v1, v2) {
      var ax = v1[0],
          ay = v1[1],
          az = v1[2],
          bx = v2[0],
          by = v2[1],
          bz = v2[2];
      out[0] = ay * bz - az * by;
      out[1] = az * bx - ax * bz;
      out[2] = ax * by - ay * bx;
      return out;
    }

    function generateNormal(indices, position) {
      function v3Set(p, a, b, c) {
        p[0] = a;
        p[1] = b;
        p[2] = c;
      }

      var p1 = [];
      var p2 = [];
      var p3 = [];
      var v21 = [];
      var v32 = [];
      var n = [];
      var len = indices.length;
      var normals = new Float32Array(position.length);
      var f = 0;

      while (f < len) {
        // const i1 = indices[f++] * 3;
        // const i2 = indices[f++] * 3;
        // const i3 = indices[f++] * 3;
        // const i1 = indices[f];
        // const i2 = indices[f + 1];
        // const i3 = indices[f + 2];
        var a = indices[f],
            b = indices[f + 1],
            c = indices[f + 2];
        var i1 = a * 3,
            i2 = b * 3,
            i3 = c * 3;
        v3Set(p1, position[i1], position[i1 + 1], position[i1 + 2]);
        v3Set(p2, position[i2], position[i2 + 1], position[i2 + 2]);
        v3Set(p3, position[i3], position[i3 + 1], position[i3 + 2]);
        v3Sub(v32, p3, p2);
        v3Sub(v21, p1, p2);
        v3Cross(n, v32, v21); // Already be weighted by the triangle area

        for (var _i = 0; _i < 3; _i++) {
          normals[i1 + _i] += n[_i];
          normals[i2 + _i] += n[_i];
          normals[i3 + _i] += n[_i];
        }

        f += 3;
      }

      var i = 0;
      var l = normals.length;

      while (i < l) {
        v3Set(n, normals[i], normals[i + 1], normals[i + 2]);
        v3Normalize(n, n);
        normals[i] = n[0] || 0;
        normals[i + 1] = n[1] || 0;
        normals[i + 2] = n[2] || 0;
        i += 3;
      }

      return normals;
    }
    function merge(results) {
      if (results.length === 1) {
        var _result = {
          position: results[0].position,
          normal: results[0].normal,
          uv: results[0].uv,
          indices: results[0].indices,
          results: results
        };
        return _result;
      }

      var plen = 0,
          ilen = 0;

      for (var i = 0, len = results.length; i < len; i++) {
        var _results$i = results[i],
            position = _results$i.position,
            indices = _results$i.indices;
        plen += position.length;
        ilen += indices.length;
      }

      var result = {
        position: new Float32Array(plen),
        normal: new Float32Array(plen),
        uv: new Float32Array(plen / 3 * 2),
        indices: new Uint32Array(ilen),
        results: results
      };
      var pOffset = 0,
          pCount = 0,
          iIdx = 0,
          uvOffset = 0;

      for (var _i2 = 0, _len = results.length; _i2 < _len; _i2++) {
        var _results$_i = results[_i2],
            _position = _results$_i.position,
            _indices = _results$_i.indices,
            normal = _results$_i.normal,
            uv = _results$_i.uv;
        result.position.set(_position, pOffset);
        result.normal.set(normal, pOffset);
        result.uv.set(uv, uvOffset);
        var j = 0;
        var len1 = _indices.length;

        while (j < len1) {
          var pIndex = _indices[j] + pCount;
          result.indices[iIdx] = pIndex;
          iIdx++;
          j++;
        }

        uvOffset += uv.length;
        pOffset += _position.length;
        pCount += _position.length / 3;
      }

      return result;
    }
    function radToDeg(rad) {
      return rad * 180 / Math.PI;
    }
    function degToRad(angle) {
      return angle / 180 * Math.PI;
    } // https://github.com/mrdoob/three.js/blob/16f13e3b07e31d0e9a00df7c3366bbe0e464588c/src/geometries/ExtrudeGeometry.js?_pjax=%23js-repo-pjax-container#L736

    function generateSideWallUV(uvs, vertices, indexA, indexB, indexC, indexD) {
      var idx1 = indexA * 3,
          idx2 = indexB * 3,
          idx3 = indexC * 3,
          idx4 = indexD * 3;
      var a_x = vertices[idx1];
      var a_y = vertices[idx1 + 1];
      var a_z = vertices[idx1 + 2];
      var b_x = vertices[idx2];
      var b_y = vertices[idx2 + 1];
      var b_z = vertices[idx2 + 2];
      var c_x = vertices[idx3];
      var c_y = vertices[idx3 + 1];
      var c_z = vertices[idx3 + 2];
      var d_x = vertices[idx4];
      var d_y = vertices[idx4 + 1];
      var d_z = vertices[idx4 + 2];

      if (Math.abs(a_y - b_y) < Math.abs(a_x - b_x)) {
        uvs.push(a_x, 1 - a_z);
        uvs.push(b_x, 1 - b_z);
        uvs.push(c_x, 1 - c_z);
        uvs.push(d_x, 1 - d_z);
      } else {
        uvs.push(a_y, 1 - a_z);
        uvs.push(b_y, 1 - b_z);
        uvs.push(c_y, 1 - c_z);
        uvs.push(d_y, 1 - d_z);
      }
    }

    function extrudePolygons(polygons, options) {
      options = Object.assign({}, {
        depth: 2
      }, options);
      var results = polygons.map(function (polygon) {
        for (var i = 0, len = polygon.length; i < len; i++) {
          var ring = polygon[i];
          validateRing(ring);

          if (i === 0) {
            if (!isClockwise(ring)) {
              polygon[i] = ring.reverse();
            }
          } else if (isClockwise(ring)) {
            polygon[i] = ring.reverse();
          }

          if (isClosedRing(ring)) {
            ring.splice(ring.length - 1, 1);
          }
        }

        var result = flatVertices(polygon, options);
        result.polygon = polygon;
        var triangles = earcut$1(result.flatVertices, result.holes, 2);
        generateTopAndBottom$1(result, triangles);
        generateSides$1(result, options);
        result.position = new Float32Array(result.points);
        result.indices = new Uint32Array(result.index);
        result.uv = new Float32Array(result.uvs);
        result.normal = generateNormal(result.indices, result.position);
        return result;
      });
      var result = merge(results);
      result.polygons = polygons;
      return result;
    }

    function generateTopAndBottom$1(result, triangles) {
      var index = [];
      var count = result.count;

      for (var i = 0, len = triangles.length; i < len; i += 3) {
        // top
        var a = triangles[i],
            b = triangles[i + 1],
            c = triangles[i + 2];
        index[i] = a;
        index[i + 1] = b;
        index[i + 2] = c; // bottom

        var idx = len + i;
        var a1 = count + a,
            b1 = count + b,
            c1 = count + c;
        index[idx] = a1;
        index[idx + 1] = b1;
        index[idx + 2] = c1;
      }

      result.index = index;
    }

    function generateSides$1(result, options) {
      var points = result.points,
          index = result.index,
          polygon = result.polygon,
          uvs = result.uvs;
      var z = options.depth;

      for (var i = 0, len = polygon.length; i < len; i++) {
        var ring = polygon[i];
        var j = 0;
        var len1 = ring.length;

        while (j < len1) {
          var v1 = ring[j];
          var v2 = ring[j + 1];

          if (j === len1 - 1) {
            v2 = ring[0];
          }

          var idx = points.length / 3;
          var x1 = v1[0],
              y1 = v1[1],
              x2 = v2[0],
              y2 = v2[1];
          points.push(x1, y1, z, x2, y2, z, x1, y1, 0, x2, y2, 0);
          var a = idx + 2,
              b = idx + 3,
              c = idx,
              d = idx + 1; // points.push(p3, p4, p1, p2);

          index.push(a, c, b, c, d, b); // index.push(c, d, b);

          generateSideWallUV(uvs, points, a, b, c, d);
          j++;
        }
      }
    }

    function calPolygonPointsCount(polygon) {
      var count = 0;
      var i = 0;
      var len = polygon.length;

      while (i < len) {
        count += polygon[i].length;
        i++;
      }

      return count;
    }

    function flatVertices(polygon, options) {
      var count = calPolygonPointsCount(polygon);
      var len = polygon.length;
      var holes = [],
          flatVertices = new Float32Array(count * 2),
          points = [],
          uvs = [];
      var pOffset = count * 3,
          uOffset = count * 2;
      var z = options.depth;
      var idx0 = 0,
          idx1 = 0,
          idx2 = 0;

      for (var i = 0; i < len; i++) {
        var ring = polygon[i];

        if (i > 0) {
          holes.push(idx0 / 2);
        }

        var j = 0;
        var len1 = ring.length;

        while (j < len1) {
          var c = ring[j];
          var x = c[0],
              y = c[1];
          flatVertices[idx0++] = x;
          flatVertices[idx0++] = y; // top vertices

          points[idx1] = x;
          points[idx1 + 1] = y;
          points[idx1 + 2] = z; // bottom vertices

          points[pOffset + idx1] = x;
          points[pOffset + idx1 + 1] = y;
          points[pOffset + idx1 + 2] = 0;
          uvs[idx2] = x;
          uvs[idx2 + 1] = y;
          uvs[uOffset + idx2] = x;
          uvs[uOffset + idx2 + 1] = y;
          idx1 += 3;
          idx2 += 2;
          j++;
        }
      }

      return {
        flatVertices: flatVertices,
        holes: holes,
        points: points,
        count: count,
        uvs: uvs
      };
    }

    function validateRing(ring) {
      if (!isClosedRing(ring)) {
        ring.push(ring[0]);
      }
    }

    function isClosedRing(ring) {
      var len = ring.length;
      var _ring$ = ring[0],
          x1 = _ring$[0],
          y1 = _ring$[1],
          _ring = ring[len - 1],
          x2 = _ring[0],
          y2 = _ring[1];
      return x1 === x2 && y1 === y2;
    }

    function extrudePolylines(lines, options) {
      options = Object.assign({}, {
        depth: 2,
        lineWidth: 1
      }, options);
      var results = lines.map(function (line) {
        var result = expandLine(line, options);
        result.line = line;
        generateTopAndBottom(result, options);
        generateSides(result, options);
        result.position = new Float32Array(result.points);
        result.indices = new Uint32Array(result.index);
        result.uv = new Float32Array(result.uvs);
        result.normal = generateNormal(result.indices, result.position);
        return result;
      });
      var result = merge(results);
      result.lines = lines;
      return result;
    }

    function generateTopAndBottom(result, options) {
      var z = options.depth;
      var points = [],
          index = [],
          uvs = [];
      var leftPoints = result.leftPoints,
          rightPoints = result.rightPoints;
      var i = 0,
          len = leftPoints.length;

      while (i < len) {
        // top left
        var idx0 = i * 3;
        var _leftPoints$i = leftPoints[i],
            x1 = _leftPoints$i[0],
            y1 = _leftPoints$i[1],
            z1 = _leftPoints$i[2];
        points[idx0] = x1;
        points[idx0 + 1] = y1;
        points[idx0 + 2] = z + z1; // top right

        var _rightPoints$i = rightPoints[i],
            x2 = _rightPoints$i[0],
            y2 = _rightPoints$i[1],
            z2 = _rightPoints$i[2];
        var idx1 = len * 3 + idx0;
        points[idx1] = x2;
        points[idx1 + 1] = y2;
        points[idx1 + 2] = z + z2; // bottom left

        var idx2 = len * 2 * 3 + idx0;
        points[idx2] = x1;
        points[idx2 + 1] = y1;
        points[idx2 + 2] = z1; // bottom right

        var idx3 = len * 2 * 3 + len * 3 + idx0;
        points[idx3] = x2;
        points[idx3 + 1] = y2;
        points[idx3 + 2] = z2;
        i++;
      }

      i = 0;
      len = points.length;

      while (i < len) {
        var x = points[i],
            y = points[i + 1];
        uvs.push(x, y);
        i += 3;
      }

      i = 0;
      len = leftPoints.length;

      while (i < len - 1) {
        // top
        // left1 left2 right1,right2
        var a1 = i,
            b1 = i + 1,
            c1 = a1 + len,
            d1 = b1 + len;
        index.push(a1, c1, b1);
        index.push(c1, d1, b1); // bottom
        // left1 left2 right1,right2

        var len2 = len * 2;
        var a2 = i + len2,
            b2 = a2 + 1,
            c2 = a2 + len,
            d2 = b2 + len;
        index.push(a2, c2, b2);
        index.push(c2, d2, b2);
        i++;
      }

      result.index = index;
      result.points = points;
      result.uvs = uvs;
    }

    function generateSides(result, options) {
      var points = result.points,
          index = result.index,
          leftPoints = result.leftPoints,
          rightPoints = result.rightPoints,
          uvs = result.uvs;
      var z = options.depth;
      var rings = [leftPoints, rightPoints];

      function addOneSideIndex(v1, v2) {
        var idx = points.length / 3;
        points.push(v1[0], v1[1], z + v1[2], v2[0], v2[1], z + v2[2], v1[0], v1[1], v1[2], v2[0], v2[1], v2[2]);
        var a = idx + 2,
            b = idx + 3,
            c = idx,
            d = idx + 1;
        index.push(a, c, b, c, d, b);
        generateSideWallUV(uvs, points, a, b, c, d);
      }

      for (var i = 0, _len = rings.length; i < _len; i++) {
        var ring = rings[i];

        if (i > 0) {
          ring = ring.map(function (p) {
            return p;
          });
          ring = ring.reverse();
        }

        var j = 0;
        var len1 = ring.length - 1;

        while (j < len1) {
          var v1 = ring[j];
          var v2 = ring[j + 1];
          addOneSideIndex(v1, v2);
          j++;
        }
      }

      var len = leftPoints.length;
      var vs = [rightPoints[0], leftPoints[0], leftPoints[len - 1], rightPoints[len - 1]];

      for (var _i = 0; _i < vs.length; _i += 2) {
        var _v = vs[_i],
            _v2 = vs[_i + 1];
        addOneSideIndex(_v, _v2);
      }
    }

    var TEMPV1 = {
      x: 0,
      y: 0
    },
        TEMPV2 = {
      x: 0,
      y: 0
    };
    function expandLine(line, options) {
      // let preAngle = 0;
      var radius = options.lineWidth / 2;
      var points = [],
          leftPoints = [],
          rightPoints = [];
      var len = line.length;
      var i = 0;

      while (i < len) {
        var p1 = line[i],
            p2 = line[i + 1];
        var currentp = line[i]; // last vertex

        if (i === len - 1) {
          p1 = line[len - 2];
          p2 = line[len - 1];
        }

        var dy = p2[1] - p1[1],
            dx = p2[0] - p1[0];
        var rAngle = 0;
        var rad = Math.atan(dy / dx);
        var angle = radToDeg(rad); // preAngle = angle;

        if (i === 0 || i === len - 1) {
          rAngle = angle;
          rAngle -= 90;
        } else {
          // 至少3个顶点才会触发
          var p0 = line[i - 1];
          TEMPV1.x = p0[0] - p1[0];
          TEMPV1.y = p0[1] - p1[1];
          TEMPV2.x = p2[0] - p1[0];
          TEMPV2.y = p2[1] - p1[1];
          var vAngle = getAngle(TEMPV1, TEMPV2);
          rAngle = angle - vAngle / 2;
        }

        var rRad = degToRad(rAngle);
        var p3 = currentp;
        var x = Math.cos(rRad) + p3[0],
            y = Math.sin(rRad) + p3[1];
        var p4 = [x, y];

        var _translateLine = translateLine(p1, p2, radius),
            line1 = _translateLine[0],
            line2 = _translateLine[1];

        var op1 = lineIntersection(line1[0], line1[1], p3, p4);
        var op2 = lineIntersection(line2[0], line2[1], p3, p4); // 平行，回头路

        if (!op1 || !op2) {
          var len1 = points.length;
          var point1 = points[len1 - 2];
          var point2 = points[len1 - 1];

          if (!point1 || !point2) {
            continue;
          }

          op1 = [point1[0], point1[1]];
          op2 = [point2[0], point2[1]];
        }

        op1[2] = currentp[2] || 0;
        op2[2] = currentp[2] || 0; // const [op1, op2] = calOffsetPoint(rRad, radius, p1);

        points.push(op1, op2);

        if (leftOnLine(op1, p1, p2)) {
          leftPoints.push(op1);
          rightPoints.push(op2);
        } else {
          leftPoints.push(op2);
          rightPoints.push(op1);
        }

        i++;
      }

      return {
        offsetPoints: points,
        leftPoints: leftPoints,
        rightPoints: rightPoints
      };
    } // eslint-disable-next-line no-unused-vars

    var getAngle = function getAngle(_ref, _ref2) {
      var x1 = _ref.x,
          y1 = _ref.y;
      var x2 = _ref2.x,
          y2 = _ref2.y;
      var dot = x1 * x2 + y1 * y2;
      var det = x1 * y2 - y1 * x2;
      var angle = Math.atan2(det, dot) / Math.PI * 180;
      return (angle + 360) % 360;
    };

    function leftOnLine(p, p1, p2) {
      var x1 = p1[0],
          y1 = p1[1];
      var x2 = p2[0],
          y2 = p2[1];
      var x = p[0],
          y = p[1];
      return (y1 - y2) * x + (x2 - x1) * y + x1 * y2 - x2 * y1 > 0;
    }
    /**
     * 平移线
     * @param {*} p1
     * @param {*} p2
     * @param {*} distance
     * @returns
     */


    function translateLine(p1, p2, distance) {
      var dy = p2[1] - p1[1],
          dx = p2[0] - p1[0];
      var rad = Math.atan2(dy, dx);
      var rad1 = rad + Math.PI / 2;
      var offsetX = Math.cos(rad1) * distance,
          offsetY = Math.sin(rad1) * distance;
      var tp1 = [p1[0] + offsetX, p1[1] + offsetY];
      var tp2 = [p2[0] + offsetX, p2[1] + offsetY];
      var rad2 = rad - Math.PI / 2;
      offsetX = Math.cos(rad2) * distance;
      offsetY = Math.sin(rad2) * distance;
      var tp3 = [p1[0] + offsetX, p1[1] + offsetY];
      var tp4 = [p2[0] + offsetX, p2[1] + offsetY];
      return [[tp1, tp2], [tp3, tp4]];
    }
    /**
     * 直线交点
     * @param {*} p1
     * @param {*} p2
     * @param {*} p3
     * @param {*} p4
     * @returns
     */


    function lineIntersection(p1, p2, p3, p4) {
      var dx1 = p2[0] - p1[0],
          dy1 = p2[1] - p1[1];
      var dx2 = p4[0] - p3[0],
          dy2 = p4[1] - p3[1];

      if (dx1 === 0 && dx2 === 0) {
        return null;
      }

      if (dy1 === 0 && dy2 === 0) {
        return null;
      }

      var k1 = dy1 / dx1;
      var k2 = dy2 / dx2;
      var b1 = p1[1] - k1 * p1[0];
      var b2 = p3[1] - k2 * p3[0];
      var x, y;

      if (dx1 === 0) {
        x = p1[0];
        y = k2 * x + b2;
      } else if (dx2 === 0) {
        x = p3[0];
        y = k1 * x + b1;
      } else if (dy1 === 0) {
        y = p1[1];
        x = (y - b2) / k2;
      } else if (dy2 === 0) {
        y = p3[1];
        x = (y - b1) / k1;
      } else {
        x = (b2 - b1) / (k1 - k2);
        y = k1 * x + b1;
      }

      return [x, y];
    }

    function cylinder(point, options) {
      if (options === void 0) {
        options = {};
      }

      options = Object.assign({}, {
        radius: 1,
        height: 2,
        radialSegments: 6
      }, options);
      var radialSegments = Math.round(Math.max(4, options.radialSegments));
      var _options = options,
          radius = _options.radius,
          height = _options.height;
      var aRad = 360 / radialSegments / 360 * Math.PI * 2;
      var circlePointsLen = radialSegments + 1;
      var points = new Float32Array(circlePointsLen * 3 * 2);
      var centerx = point[0],
          centery = point[1];
      var idx = 0,
          uIdx = 0;
      var offset = circlePointsLen * 3,
          uOffset = circlePointsLen * 2;
      var indices = [],
          uvs = [];

      for (var i = -1; i < radialSegments; i++) {
        var rad = aRad * i;
        var x = Math.cos(rad) * radius + centerx,
            y = Math.sin(rad) * radius + centery; // bottom vertices

        points[idx] = x;
        points[idx + 1] = y;
        points[idx + 2] = 0; // top vertices

        points[idx + offset] = x;
        points[idx + 1 + offset] = y;
        points[idx + 2 + offset] = height;
        var u = 0,
            v = 0;
        u = 0.5 + x / radius / 2;
        v = 0.5 + y / radius / 2;
        uvs[uIdx] = u;
        uvs[uIdx + 1] = v;
        uvs[uIdx + uOffset] = u;
        uvs[uIdx + 1 + uOffset] = v;
        idx += 3;
        uIdx += 2;

        if (i > 1) {
          // bottom indices
          indices.push(0, i - 1, i);
        }
      }

      idx -= 3;
      points[idx] = points[0];
      points[idx + 1] = points[1];
      points[idx + 2] = points[2];
      var pointsLen = points.length;
      points[pointsLen - 3] = points[0];
      points[pointsLen - 2] = points[1];
      points[pointsLen - 1] = height;
      var indicesLen = indices.length; // top indices

      for (var _i = 0; _i < indicesLen; _i++) {
        var index = indices[_i];
        indices.push(index + circlePointsLen);
      }

      var sidePoints = new Float32Array((circlePointsLen * 3 * 2 - 6) * 2);
      var pIndex = -1;
      idx = circlePointsLen * 2;
      uIdx = 0;

      for (var _i2 = 0, len = points.length / 2; _i2 < len - 3; _i2 += 3) {
        var x1 = points[_i2],
            y1 = points[_i2 + 1],
            x2 = points[_i2 + 3],
            y2 = points[_i2 + 4];
        sidePoints[++pIndex] = x1;
        sidePoints[++pIndex] = y1;
        sidePoints[++pIndex] = height;
        sidePoints[++pIndex] = x2;
        sidePoints[++pIndex] = y2;
        sidePoints[++pIndex] = height;
        sidePoints[++pIndex] = x1;
        sidePoints[++pIndex] = y1;
        sidePoints[++pIndex] = 0;
        sidePoints[++pIndex] = x2;
        sidePoints[++pIndex] = y2;
        sidePoints[++pIndex] = 0;
        var a = idx + 2,
            b = idx + 3,
            c = idx,
            d = idx + 1; // indices.push(a, c, b, c, d, b);

        indices.push(c, a, d, a, b, d);
        idx += 4;
        var u1 = uIdx / circlePointsLen,
            u2 = (uIdx + 1) / circlePointsLen;
        uvs.push(u1, height / radius / 2, u2, height / radius / 2, u1, 0, u2, 0);
        uIdx++;
      }

      var position = new Float32Array(points.length + sidePoints.length);
      position.set(points, 0);
      position.set(sidePoints, points.length);
      var normal = generateNormal(indices, position);
      return {
        points: points,
        indices: new Uint32Array(indices),
        position: position,
        normal: normal,
        uv: new Float32Array(uvs)
      };
    }

    // import * as MathUtils from './MathUtils.js';
    // code copy from https://github.com/mrdoob/three.js/blob/dev/src/math/Vector3.js
    var Vector3 = /*#__PURE__*/function () {
      function Vector3(x, y, z) {
        if (x === void 0) {
          x = 0;
        }

        if (y === void 0) {
          y = 0;
        }

        if (z === void 0) {
          z = 0;
        }

        this.x = x;
        this.y = y;
        this.z = z;
      }

      var _proto = Vector3.prototype;

      _proto.set = function set(x, y, z) {
        if (z === undefined) z = this.z; // sprite.scale.set(x,y)

        this.x = x;
        this.y = y;
        this.z = z;
        return this;
      } // setScalar(scalar) {
      //     this.x = scalar;
      //     this.y = scalar;
      //     this.z = scalar;
      //     return this;
      // }
      // setX(x) {
      //     this.x = x;
      //     return this;
      // }
      // setY(y) {
      //     this.y = y;
      //     return this;
      // }
      // setZ(z) {
      //     this.z = z;
      //     return this;
      // }
      // setComponent(index, value) {
      //     switch (index) {
      //         case 0: this.x = value; break;
      //         case 1: this.y = value; break;
      //         case 2: this.z = value; break;
      //         default: throw new Error('index is out of range: ' + index);
      //     }
      //     return this;
      // }
      // getComponent(index) {
      //     switch (index) {
      //         case 0: return this.x;
      //         case 1: return this.y;
      //         case 2: return this.z;
      //         default: throw new Error('index is out of range: ' + index);
      //     }
      // }
      ;

      _proto.clone = function clone() {
        return new this.constructor(this.x, this.y, this.z);
      };

      _proto.copy = function copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
      };

      _proto.add = function add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
      };

      _proto.addScalar = function addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
      };

      _proto.addVectors = function addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        return this;
      };

      _proto.addScaledVector = function addScaledVector(v, s) {
        this.x += v.x * s;
        this.y += v.y * s;
        this.z += v.z * s;
        return this;
      };

      _proto.sub = function sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
      };

      _proto.subScalar = function subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
      };

      _proto.subVectors = function subVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        return this;
      };

      _proto.multiply = function multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
      };

      _proto.multiplyScalar = function multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
      };

      _proto.multiplyVectors = function multiplyVectors(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
      } // applyEuler(euler) {
      //     return this.applyQuaternion(_quaternion.setFromEuler(euler));
      // }
      // applyAxisAngle(axis, angle) {
      //     return this.applyQuaternion(_quaternion.setFromAxisAngle(axis, angle));
      // }
      // applyMatrix3(m) {
      //     const x = this.x, y = this.y, z = this.z;
      //     const e = m.elements;
      //     this.x = e[0] * x + e[3] * y + e[6] * z;
      //     this.y = e[1] * x + e[4] * y + e[7] * z;
      //     this.z = e[2] * x + e[5] * y + e[8] * z;
      //     return this;
      // }
      // applyNormalMatrix(m) {
      //     return this.applyMatrix3(m).normalize();
      // }
      ;

      _proto.applyMatrix4 = function applyMatrix4(m) {
        var x = this.x,
            y = this.y,
            z = this.z;
        var e = m.elements;
        var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
        this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
        this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
        this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
        return this;
      } // applyQuaternion(q) {
      //     const x = this.x, y = this.y, z = this.z;
      //     const qx = q.x, qy = q.y, qz = q.z, qw = q.w;
      //     // calculate quat * vector
      //     const ix = qw * x + qy * z - qz * y;
      //     const iy = qw * y + qz * x - qx * z;
      //     const iz = qw * z + qx * y - qy * x;
      //     const iw = - qx * x - qy * y - qz * z;
      //     // calculate result * inverse quat
      //     this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
      //     this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
      //     this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;
      //     return this;
      // }
      // project(camera) {
      //     return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
      // }
      // unproject(camera) {
      //     return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
      // }
      // transformDirection(m) {
      //     // input: THREE.Matrix4 affine matrix
      //     // vector interpreted as a direction
      //     const x = this.x, y = this.y, z = this.z;
      //     const e = m.elements;
      //     this.x = e[0] * x + e[4] * y + e[8] * z;
      //     this.y = e[1] * x + e[5] * y + e[9] * z;
      //     this.z = e[2] * x + e[6] * y + e[10] * z;
      //     return this.normalize();
      // }
      ;

      _proto.divide = function divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
      };

      _proto.divideScalar = function divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
      };

      _proto.min = function min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
      };

      _proto.max = function max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
      };

      _proto.clamp = function clamp(min, max) {
        // assumes min < max, componentwise
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        return this;
      };

      _proto.clampScalar = function clampScalar(minVal, maxVal) {
        this.x = Math.max(minVal, Math.min(maxVal, this.x));
        this.y = Math.max(minVal, Math.min(maxVal, this.y));
        this.z = Math.max(minVal, Math.min(maxVal, this.z));
        return this;
      };

      _proto.clampLength = function clampLength(min, max) {
        var length = this.length();
        return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
      } // floor() {
      //     this.x = Math.floor(this.x);
      //     this.y = Math.floor(this.y);
      //     this.z = Math.floor(this.z);
      //     return this;
      // }
      // ceil() {
      //     this.x = Math.ceil(this.x);
      //     this.y = Math.ceil(this.y);
      //     this.z = Math.ceil(this.z);
      //     return this;
      // }
      // round() {
      //     this.x = Math.round(this.x);
      //     this.y = Math.round(this.y);
      //     this.z = Math.round(this.z);
      //     return this;
      // }
      // roundToZero() {
      //     this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
      //     this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
      //     this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
      //     return this;
      // }
      // negate() {
      //     this.x = -this.x;
      //     this.y = -this.y;
      //     this.z = -this.z;
      //     return this;
      // }
      ;

      _proto.dot = function dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
      } // TODO lengthSquared?
      ;

      _proto.lengthSq = function lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
      };

      _proto.length = function length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      } // manhattanLength() {
      //     return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
      // }
      ;

      _proto.normalize = function normalize() {
        return this.divideScalar(this.length() || 1);
      };

      _proto.setLength = function setLength(length) {
        return this.normalize().multiplyScalar(length);
      };

      _proto.lerp = function lerp(v, alpha) {
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        this.z += (v.z - this.z) * alpha;
        return this;
      };

      _proto.lerpVectors = function lerpVectors(v1, v2, alpha) {
        this.x = v1.x + (v2.x - v1.x) * alpha;
        this.y = v1.y + (v2.y - v1.y) * alpha;
        this.z = v1.z + (v2.z - v1.z) * alpha;
        return this;
      };

      _proto.cross = function cross(v) {
        return this.crossVectors(this, v);
      };

      _proto.crossVectors = function crossVectors(a, b) {
        var ax = a.x,
            ay = a.y,
            az = a.z;
        var bx = b.x,
            by = b.y,
            bz = b.z;
        this.x = ay * bz - az * by;
        this.y = az * bx - ax * bz;
        this.z = ax * by - ay * bx;
        return this;
      } // projectOnVector(v) {
      //     const denominator = v.lengthSq();
      //     if (denominator === 0) return this.set(0, 0, 0);
      //     const scalar = v.dot(this) / denominator;
      //     return this.copy(v).multiplyScalar(scalar);
      // }
      // projectOnPlane(planeNormal) {
      //     _vector.copy(this).projectOnVector(planeNormal);
      //     return this.sub(_vector);
      // }
      // reflect(normal) {
      //     // reflect incident vector off plane orthogonal to normal
      //     // normal is assumed to have unit length
      //     return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)));
      // }
      // angleTo(v) {
      //     const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
      //     if (denominator === 0) return Math.PI / 2;
      //     const theta = this.dot(v) / denominator;
      //     // clamp, to handle numerical problems
      //     return Math.acos(MathUtils.clamp(theta, -1, 1));
      // }
      ;

      _proto.distanceTo = function distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
      } // distanceToSquared(v) {
      //     const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
      //     return dx * dx + dy * dy + dz * dz;
      // }
      // manhattanDistanceTo(v) {
      //     return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
      // }
      // setFromSpherical(s) {
      //     return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
      // }
      // setFromSphericalCoords(radius, phi, theta) {
      //     const sinPhiRadius = Math.sin(phi) * radius;
      //     this.x = sinPhiRadius * Math.sin(theta);
      //     this.y = Math.cos(phi) * radius;
      //     this.z = sinPhiRadius * Math.cos(theta);
      //     return this;
      // }
      // setFromCylindrical(c) {
      //     return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
      // }
      // setFromCylindricalCoords(radius, theta, y) {
      //     this.x = radius * Math.sin(theta);
      //     this.y = y;
      //     this.z = radius * Math.cos(theta);
      //     return this;
      // }
      // setFromMatrixPosition(m) {
      //     const e = m.elements;
      //     this.x = e[12];
      //     this.y = e[13];
      //     this.z = e[14];
      //     return this;
      // }
      // setFromMatrixScale(m) {
      //     const sx = this.setFromMatrixColumn(m, 0).length();
      //     const sy = this.setFromMatrixColumn(m, 1).length();
      //     const sz = this.setFromMatrixColumn(m, 2).length();
      //     this.x = sx;
      //     this.y = sy;
      //     this.z = sz;
      //     return this;
      // }
      // setFromMatrixColumn(m, index) {
      //     return this.fromArray(m.elements, index * 4);
      // }
      // setFromMatrix3Column(m, index) {
      //     return this.fromArray(m.elements, index * 3);
      // }
      // setFromEuler(e) {
      //     this.x = e._x;
      //     this.y = e._y;
      //     this.z = e._z;
      //     return this;
      // }
      // setFromColor(c) {
      //     this.x = c.r;
      //     this.y = c.g;
      //     this.z = c.b;
      //     return this;
      // }
      ;

      _proto.equals = function equals(v) {
        return v.x === this.x && v.y === this.y && v.z === this.z;
      };

      _proto.fromArray = function fromArray(array, offset) {
        if (offset === void 0) {
          offset = 0;
        }

        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
      } // toArray(array = [], offset = 0) {
      //     array[offset] = this.x;
      //     array[offset + 1] = this.y;
      //     array[offset + 2] = this.z;
      //     return array;
      // }
      // fromBufferAttribute(attribute, index) {
      //     this.x = attribute.getX(index);
      //     this.y = attribute.getY(index);
      //     this.z = attribute.getZ(index);
      //     return this;
      // }
      ;

      _proto.random = function random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        return this;
      } // randomDirection() {
      //     // Derived from https://mathworld.wolfram.com/SpherePointPicking.html
      //     const u = (Math.random() - 0.5) * 2;
      //     const t = Math.random() * Math.PI * 2;
      //     const f = Math.sqrt(1 - u ** 2);
      //     this.x = f * Math.cos(t);
      //     this.y = f * Math.sin(t);
      //     this.z = u;
      //     return this;
      // }
      ;

      return Vector3;
    }();

    /* eslint-disable no-tabs */
    /**
     * PathPoint
     */

    var PathPoint = /*#__PURE__*/function () {
      function PathPoint() {
        this.pos = new Vector3();
        this.dir = new Vector3();
        this.right = new Vector3();
        this.up = new Vector3(); // normal

        this.dist = 0; // distance from start

        this.widthScale = 1; // for corner

        this.sharp = false; // marks as sharp corner
      }

      var _proto = PathPoint.prototype;

      _proto.lerpPathPoints = function lerpPathPoints(p1, p2, alpha) {
        this.pos.lerpVectors(p1.pos, p2.pos, alpha);
        this.dir.lerpVectors(p1.dir, p2.dir, alpha);
        this.up.lerpVectors(p1.up, p2.up, alpha);
        this.right.lerpVectors(p1.right, p2.right, alpha);
        this.dist = (p2.dist - p1.dist) * alpha + p1.dist;
        this.widthScale = (p2.widthScale - p1.widthScale) * alpha + p1.widthScale;
      };

      _proto.copy = function copy(source) {
        this.pos.copy(source.pos);
        this.dir.copy(source.dir);
        this.up.copy(source.up);
        this.right.copy(source.right);
        this.dist = source.dist;
        this.widthScale = source.widthScale;
      };

      return PathPoint;
    }();

    // code copy from https://github.com/mrdoob/three.js/blob/dev/src/math/Matrix4.js
    // import { WebGLCoordinateSystem, WebGPUCoordinateSystem } from '../constants.js';
    // import { Vector3 } from './Vector3.js';
    var Matrix4 = /*#__PURE__*/function () {
      function Matrix4(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

        if (n11 !== undefined) {
          this.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);
        }
      }

      var _proto = Matrix4.prototype;

      _proto.set = function set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        var te = this.elements;
        te[0] = n11;
        te[4] = n12;
        te[8] = n13;
        te[12] = n14;
        te[1] = n21;
        te[5] = n22;
        te[9] = n23;
        te[13] = n24;
        te[2] = n31;
        te[6] = n32;
        te[10] = n33;
        te[14] = n34;
        te[3] = n41;
        te[7] = n42;
        te[11] = n43;
        te[15] = n44;
        return this;
      } // identity() {
      //     this.set(
      //         1, 0, 0, 0,
      //         0, 1, 0, 0,
      //         0, 0, 1, 0,
      //         0, 0, 0, 1
      //     );
      //     return this;
      // }
      // clone() {
      //     return new Matrix4().fromArray(this.elements);
      // }
      // copy(m) {
      //     const te = this.elements;
      //     const me = m.elements;
      //     te[0] = me[0]; te[1] = me[1]; te[2] = me[2]; te[3] = me[3];
      //     te[4] = me[4]; te[5] = me[5]; te[6] = me[6]; te[7] = me[7];
      //     te[8] = me[8]; te[9] = me[9]; te[10] = me[10]; te[11] = me[11];
      //     te[12] = me[12]; te[13] = me[13]; te[14] = me[14]; te[15] = me[15];
      //     return this;
      // }
      // copyPosition(m) {
      //     const te = this.elements, me = m.elements;
      //     te[12] = me[12];
      //     te[13] = me[13];
      //     te[14] = me[14];
      //     return this;
      // }
      // setFromMatrix3(m) {
      //     const me = m.elements;
      //     this.set(
      //         me[0], me[3], me[6], 0,
      //         me[1], me[4], me[7], 0,
      //         me[2], me[5], me[8], 0,
      //         0, 0, 0, 1
      //     );
      //     return this;
      // }
      // extractBasis(xAxis, yAxis, zAxis) {
      //     xAxis.setFromMatrixColumn(this, 0);
      //     yAxis.setFromMatrixColumn(this, 1);
      //     zAxis.setFromMatrixColumn(this, 2);
      //     return this;
      // }
      // makeBasis(xAxis, yAxis, zAxis) {
      //     this.set(
      //         xAxis.x, yAxis.x, zAxis.x, 0,
      //         xAxis.y, yAxis.y, zAxis.y, 0,
      //         xAxis.z, yAxis.z, zAxis.z, 0,
      //         0, 0, 0, 1
      //     );
      //     return this;
      // }
      // extractRotation(m) {
      //     // this method does not support reflection matrices
      //     const te = this.elements;
      //     const me = m.elements;
      //     const scaleX = 1 / _v1.setFromMatrixColumn(m, 0).length();
      //     const scaleY = 1 / _v1.setFromMatrixColumn(m, 1).length();
      //     const scaleZ = 1 / _v1.setFromMatrixColumn(m, 2).length();
      //     te[0] = me[0] * scaleX;
      //     te[1] = me[1] * scaleX;
      //     te[2] = me[2] * scaleX;
      //     te[3] = 0;
      //     te[4] = me[4] * scaleY;
      //     te[5] = me[5] * scaleY;
      //     te[6] = me[6] * scaleY;
      //     te[7] = 0;
      //     te[8] = me[8] * scaleZ;
      //     te[9] = me[9] * scaleZ;
      //     te[10] = me[10] * scaleZ;
      //     te[11] = 0;
      //     te[12] = 0;
      //     te[13] = 0;
      //     te[14] = 0;
      //     te[15] = 1;
      //     return this;
      // }
      // makeRotationFromEuler(euler) {
      //     const te = this.elements;
      //     const x = euler.x, y = euler.y, z = euler.z;
      //     const a = Math.cos(x), b = Math.sin(x);
      //     const c = Math.cos(y), d = Math.sin(y);
      //     const e = Math.cos(z), f = Math.sin(z);
      //     if (euler.order === 'XYZ') {
      //         const ae = a * e, af = a * f, be = b * e, bf = b * f;
      //         te[0] = c * e;
      //         te[4] = -c * f;
      //         te[8] = d;
      //         te[1] = af + be * d;
      //         te[5] = ae - bf * d;
      //         te[9] = -b * c;
      //         te[2] = bf - ae * d;
      //         te[6] = be + af * d;
      //         te[10] = a * c;
      //     } else if (euler.order === 'YXZ') {
      //         const ce = c * e, cf = c * f, de = d * e, df = d * f;
      //         te[0] = ce + df * b;
      //         te[4] = de * b - cf;
      //         te[8] = a * d;
      //         te[1] = a * f;
      //         te[5] = a * e;
      //         te[9] = -b;
      //         te[2] = cf * b - de;
      //         te[6] = df + ce * b;
      //         te[10] = a * c;
      //     } else if (euler.order === 'ZXY') {
      //         const ce = c * e, cf = c * f, de = d * e, df = d * f;
      //         te[0] = ce - df * b;
      //         te[4] = -a * f;
      //         te[8] = de + cf * b;
      //         te[1] = cf + de * b;
      //         te[5] = a * e;
      //         te[9] = df - ce * b;
      //         te[2] = -a * d;
      //         te[6] = b;
      //         te[10] = a * c;
      //     } else if (euler.order === 'ZYX') {
      //         const ae = a * e, af = a * f, be = b * e, bf = b * f;
      //         te[0] = c * e;
      //         te[4] = be * d - af;
      //         te[8] = ae * d + bf;
      //         te[1] = c * f;
      //         te[5] = bf * d + ae;
      //         te[9] = af * d - be;
      //         te[2] = -d;
      //         te[6] = b * c;
      //         te[10] = a * c;
      //     } else if (euler.order === 'YZX') {
      //         const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
      //         te[0] = c * e;
      //         te[4] = bd - ac * f;
      //         te[8] = bc * f + ad;
      //         te[1] = f;
      //         te[5] = a * e;
      //         te[9] = -b * e;
      //         te[2] = -d * e;
      //         te[6] = ad * f + bc;
      //         te[10] = ac - bd * f;
      //     } else if (euler.order === 'XZY') {
      //         const ac = a * c, ad = a * d, bc = b * c, bd = b * d;
      //         te[0] = c * e;
      //         te[4] = -f;
      //         te[8] = d * e;
      //         te[1] = ac * f + bd;
      //         te[5] = a * e;
      //         te[9] = ad * f - bc;
      //         te[2] = bc * f - ad;
      //         te[6] = b * e;
      //         te[10] = bd * f + ac;
      //     }
      //     // bottom row
      //     te[3] = 0;
      //     te[7] = 0;
      //     te[11] = 0;
      //     // last column
      //     te[12] = 0;
      //     te[13] = 0;
      //     te[14] = 0;
      //     te[15] = 1;
      //     return this;
      // }
      // makeRotationFromQuaternion(q) {
      //     return this.compose(_zero, q, _one);
      // }
      // lookAt(eye, target, up) {
      //     const te = this.elements;
      //     _z.subVectors(eye, target);
      //     if (_z.lengthSq() === 0) {
      //         // eye and target are in the same position
      //         _z.z = 1;
      //     }
      //     _z.normalize();
      //     _x.crossVectors(up, _z);
      //     if (_x.lengthSq() === 0) {
      //         // up and z are parallel
      //         if (Math.abs(up.z) === 1) {
      //             _z.x += 0.0001;
      //         } else {
      //             _z.z += 0.0001;
      //         }
      //         _z.normalize();
      //         _x.crossVectors(up, _z);
      //     }
      //     _x.normalize();
      //     _y.crossVectors(_z, _x);
      //     te[0] = _x.x; te[4] = _y.x; te[8] = _z.x;
      //     te[1] = _x.y; te[5] = _y.y; te[9] = _z.y;
      //     te[2] = _x.z; te[6] = _y.z; te[10] = _z.z;
      //     return this;
      // }
      ;

      _proto.multiply = function multiply(m) {
        return this.multiplyMatrices(this, m);
      } // premultiply(m) {
      //     return this.multiplyMatrices(m, this);
      // }
      // multiplyMatrices(a, b) {
      //     const ae = a.elements;
      //     const be = b.elements;
      //     const te = this.elements;
      //     const a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
      //     const a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
      //     const a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
      //     const a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];
      //     const b11 = be[0], b12 = be[4], b13 = be[8], b14 = be[12];
      //     const b21 = be[1], b22 = be[5], b23 = be[9], b24 = be[13];
      //     const b31 = be[2], b32 = be[6], b33 = be[10], b34 = be[14];
      //     const b41 = be[3], b42 = be[7], b43 = be[11], b44 = be[15];
      //     te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
      //     te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
      //     te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
      //     te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
      //     te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
      //     te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
      //     te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
      //     te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
      //     te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
      //     te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
      //     te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
      //     te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
      //     te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
      //     te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
      //     te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
      //     te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
      //     return this;
      // }
      // multiplyScalar(s) {
      //     const te = this.elements;
      //     te[0] *= s; te[4] *= s; te[8] *= s; te[12] *= s;
      //     te[1] *= s; te[5] *= s; te[9] *= s; te[13] *= s;
      //     te[2] *= s; te[6] *= s; te[10] *= s; te[14] *= s;
      //     te[3] *= s; te[7] *= s; te[11] *= s; te[15] *= s;
      //     return this;
      // }
      // determinant() {
      //     const te = this.elements;
      //     const n11 = te[0], n12 = te[4], n13 = te[8], n14 = te[12];
      //     const n21 = te[1], n22 = te[5], n23 = te[9], n24 = te[13];
      //     const n31 = te[2], n32 = te[6], n33 = te[10], n34 = te[14];
      //     const n41 = te[3], n42 = te[7], n43 = te[11], n44 = te[15];
      //     //TODO: make this more efficient
      //     //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
      //     return (
      //         n41 * (
      //             + n14 * n23 * n32
      //             - n13 * n24 * n32
      //             - n14 * n22 * n33
      //             + n12 * n24 * n33
      //             + n13 * n22 * n34
      //             - n12 * n23 * n34
      //         ) +
      //         n42 * (
      //             + n11 * n23 * n34
      //             - n11 * n24 * n33
      //             + n14 * n21 * n33
      //             - n13 * n21 * n34
      //             + n13 * n24 * n31
      //             - n14 * n23 * n31
      //         ) +
      //         n43 * (
      //             + n11 * n24 * n32
      //             - n11 * n22 * n34
      //             - n14 * n21 * n32
      //             + n12 * n21 * n34
      //             + n14 * n22 * n31
      //             - n12 * n24 * n31
      //         ) +
      //         n44 * (
      //             - n13 * n22 * n31
      //             - n11 * n23 * n32
      //             + n11 * n22 * n33
      //             + n13 * n21 * n32
      //             - n12 * n21 * n33
      //             + n12 * n23 * n31
      //         )
      //     );
      // }
      // transpose() {
      //     const te = this.elements;
      //     let tmp;
      //     tmp = te[1]; te[1] = te[4]; te[4] = tmp;
      //     tmp = te[2]; te[2] = te[8]; te[8] = tmp;
      //     tmp = te[6]; te[6] = te[9]; te[9] = tmp;
      //     tmp = te[3]; te[3] = te[12]; te[12] = tmp;
      //     tmp = te[7]; te[7] = te[13]; te[13] = tmp;
      //     tmp = te[11]; te[11] = te[14]; te[14] = tmp;
      //     return this;
      // }
      // setPosition(x, y, z) {
      //     const te = this.elements;
      //     if (x.isVector3) {
      //         te[12] = x.x;
      //         te[13] = x.y;
      //         te[14] = x.z;
      //     } else {
      //         te[12] = x;
      //         te[13] = y;
      //         te[14] = z;
      //     }
      //     return this;
      // }
      // invert() {
      //     // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
      //     const te = this.elements,
      //         n11 = te[0], n21 = te[1], n31 = te[2], n41 = te[3],
      //         n12 = te[4], n22 = te[5], n32 = te[6], n42 = te[7],
      //         n13 = te[8], n23 = te[9], n33 = te[10], n43 = te[11],
      //         n14 = te[12], n24 = te[13], n34 = te[14], n44 = te[15],
      //         t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
      //         t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
      //         t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
      //         t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
      //     const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
      //     if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      //     const detInv = 1 / det;
      //     te[0] = t11 * detInv;
      //     te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
      //     te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
      //     te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
      //     te[4] = t12 * detInv;
      //     te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
      //     te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
      //     te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
      //     te[8] = t13 * detInv;
      //     te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
      //     te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
      //     te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
      //     te[12] = t14 * detInv;
      //     te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
      //     te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
      //     te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
      //     return this;
      // }
      // scale(v) {
      //     const te = this.elements;
      //     const x = v.x, y = v.y, z = v.z;
      //     te[0] *= x; te[4] *= y; te[8] *= z;
      //     te[1] *= x; te[5] *= y; te[9] *= z;
      //     te[2] *= x; te[6] *= y; te[10] *= z;
      //     te[3] *= x; te[7] *= y; te[11] *= z;
      //     return this;
      // }
      // getMaxScaleOnAxis() {
      //     const te = this.elements;
      //     const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
      //     const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
      //     const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
      //     return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
      // }
      // makeTranslation(x, y, z) {
      //     if (x.isVector3) {
      //         this.set(
      //             1, 0, 0, x.x,
      //             0, 1, 0, x.y,
      //             0, 0, 1, x.z,
      //             0, 0, 0, 1
      //         );
      //     } else {
      //         this.set(
      //             1, 0, 0, x,
      //             0, 1, 0, y,
      //             0, 0, 1, z,
      //             0, 0, 0, 1
      //         );
      //     }
      //     return this;
      // }
      // makeRotationX(theta) {
      //     const c = Math.cos(theta), s = Math.sin(theta);
      //     this.set(
      //         1, 0, 0, 0,
      //         0, c, -s, 0,
      //         0, s, c, 0,
      //         0, 0, 0, 1
      //     );
      //     return this;
      // }
      // makeRotationY(theta) {
      //     const c = Math.cos(theta), s = Math.sin(theta);
      //     this.set(
      //         c, 0, s, 0,
      //         0, 1, 0, 0,
      //         -s, 0, c, 0,
      //         0, 0, 0, 1
      //     );
      //     return this;
      // }
      // makeRotationZ(theta) {
      //     const c = Math.cos(theta), s = Math.sin(theta);
      //     this.set(
      //         c, -s, 0, 0,
      //         s, c, 0, 0,
      //         0, 0, 1, 0,
      //         0, 0, 0, 1
      //     );
      //     return this;
      // }
      ;

      _proto.makeRotationAxis = function makeRotationAxis(axis, angle) {
        // Based on http://www.gamedev.net/reference/articles/article1199.asp
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var t = 1 - c;
        var x = axis.x,
            y = axis.y,
            z = axis.z;
        var tx = t * x,
            ty = t * y;
        this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
        return this;
      } // makeScale(x, y, z) {
      //     this.set(
      //         x, 0, 0, 0,
      //         0, y, 0, 0,
      //         0, 0, z, 0,
      //         0, 0, 0, 1
      //     );
      //     return this;
      // }
      // makeShear(xy, xz, yx, yz, zx, zy) {
      //     this.set(
      //         1, yx, zx, 0,
      //         xy, 1, zy, 0,
      //         xz, yz, 1, 0,
      //         0, 0, 0, 1
      //     );
      //     return this;
      // }
      // compose(position, quaternion, scale) {
      //     const te = this.elements;
      //     const x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
      //     const x2 = x + x, y2 = y + y, z2 = z + z;
      //     const xx = x * x2, xy = x * y2, xz = x * z2;
      //     const yy = y * y2, yz = y * z2, zz = z * z2;
      //     const wx = w * x2, wy = w * y2, wz = w * z2;
      //     const sx = scale.x, sy = scale.y, sz = scale.z;
      //     te[0] = (1 - (yy + zz)) * sx;
      //     te[1] = (xy + wz) * sx;
      //     te[2] = (xz - wy) * sx;
      //     te[3] = 0;
      //     te[4] = (xy - wz) * sy;
      //     te[5] = (1 - (xx + zz)) * sy;
      //     te[6] = (yz + wx) * sy;
      //     te[7] = 0;
      //     te[8] = (xz + wy) * sz;
      //     te[9] = (yz - wx) * sz;
      //     te[10] = (1 - (xx + yy)) * sz;
      //     te[11] = 0;
      //     te[12] = position.x;
      //     te[13] = position.y;
      //     te[14] = position.z;
      //     te[15] = 1;
      //     return this;
      // }
      // decompose(position, quaternion, scale) {
      //     const te = this.elements;
      //     let sx = _v1.set(te[0], te[1], te[2]).length();
      //     const sy = _v1.set(te[4], te[5], te[6]).length();
      //     const sz = _v1.set(te[8], te[9], te[10]).length();
      //     // if determine is negative, we need to invert one scale
      //     const det = this.determinant();
      //     if (det < 0) sx = -sx;
      //     position.x = te[12];
      //     position.y = te[13];
      //     position.z = te[14];
      //     // scale the rotation part
      //     _m1.copy(this);
      //     const invSX = 1 / sx;
      //     const invSY = 1 / sy;
      //     const invSZ = 1 / sz;
      //     _m1.elements[0] *= invSX;
      //     _m1.elements[1] *= invSX;
      //     _m1.elements[2] *= invSX;
      //     _m1.elements[4] *= invSY;
      //     _m1.elements[5] *= invSY;
      //     _m1.elements[6] *= invSY;
      //     _m1.elements[8] *= invSZ;
      //     _m1.elements[9] *= invSZ;
      //     _m1.elements[10] *= invSZ;
      //     quaternion.setFromRotationMatrix(_m1);
      //     scale.x = sx;
      //     scale.y = sy;
      //     scale.z = sz;
      //     return this;
      // }
      // makePerspective(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem) {
      //     const te = this.elements;
      //     const x = 2 * near / (right - left);
      //     const y = 2 * near / (top - bottom);
      //     const a = (right + left) / (right - left);
      //     const b = (top + bottom) / (top - bottom);
      //     let c, d;
      //     if (coordinateSystem === WebGLCoordinateSystem) {
      //         c = - (far + near) / (far - near);
      //         d = (- 2 * far * near) / (far - near);
      //     } else if (coordinateSystem === WebGPUCoordinateSystem) {
      //         c = - far / (far - near);
      //         d = (- far * near) / (far - near);
      //     } else {
      //         throw new Error('THREE.Matrix4.makePerspective(): Invalid coordinate system: ' + coordinateSystem);
      //     }
      //     te[0] = x; te[4] = 0; te[8] = a; te[12] = 0;
      //     te[1] = 0; te[5] = y; te[9] = b; te[13] = 0;
      //     te[2] = 0; te[6] = 0; te[10] = c; te[14] = d;
      //     te[3] = 0; te[7] = 0; te[11] = - 1; te[15] = 0;
      //     return this;
      // }
      // makeOrthographic(left, right, top, bottom, near, far, coordinateSystem = WebGLCoordinateSystem) {
      //     const te = this.elements;
      //     const w = 1.0 / (right - left);
      //     const h = 1.0 / (top - bottom);
      //     const p = 1.0 / (far - near);
      //     const x = (right + left) * w;
      //     const y = (top + bottom) * h;
      //     let z, zInv;
      //     if (coordinateSystem === WebGLCoordinateSystem) {
      //         z = (far + near) * p;
      //         zInv = - 2 * p;
      //     } else if (coordinateSystem === WebGPUCoordinateSystem) {
      //         z = near * p;
      //         zInv = - 1 * p;
      //     } else {
      //         throw new Error('THREE.Matrix4.makeOrthographic(): Invalid coordinate system: ' + coordinateSystem);
      //     }
      //     te[0] = 2 * w; te[4] = 0; te[8] = 0; te[12] = - x;
      //     te[1] = 0; te[5] = 2 * h; te[9] = 0; te[13] = - y;
      //     te[2] = 0; te[6] = 0; te[10] = zInv; te[14] = - z;
      //     te[3] = 0; te[7] = 0; te[11] = 0; te[15] = 1;
      //     return this;
      // }
      ;

      _proto.equals = function equals(matrix) {
        var te = this.elements;
        var me = matrix.elements;

        for (var i = 0; i < 16; i++) {
          if (te[i] !== me[i]) return false;
        }

        return true;
      } // fromArray(array, offset = 0) {
      //     for (let i = 0; i < 16; i++) {
      //         this.elements[i] = array[i + offset];
      //     }
      //     return this;
      // }
      // toArray(array = [], offset = 0) {
      //     const te = this.elements;
      //     array[offset] = te[0];
      //     array[offset + 1] = te[1];
      //     array[offset + 2] = te[2];
      //     array[offset + 3] = te[3];
      //     array[offset + 4] = te[4];
      //     array[offset + 5] = te[5];
      //     array[offset + 6] = te[6];
      //     array[offset + 7] = te[7];
      //     array[offset + 8] = te[8];
      //     array[offset + 9] = te[9];
      //     array[offset + 10] = te[10];
      //     array[offset + 11] = te[11];
      //     array[offset + 12] = te[12];
      //     array[offset + 13] = te[13];
      //     array[offset + 14] = te[14];
      //     array[offset + 15] = te[15];
      //     return array;
      // }
      ;

      return Matrix4;
    }(); // const _v1 = new Vector3();

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;

      _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
      return _setPrototypeOf(o, p);
    }

    // code copy from https://github.com/mrdoob/three.js/blob/dev/src/extras/core/Curve.js
    // import * as MathUtils from '../../math/MathUtils.js';
    // import { Vector2 } from '../../math/Vector2.js';
    // import { Vector3 } from '../../math/Vector3.js';
    // import { Matrix4 } from '../../math/Matrix4.js';

    /**
     * Extensible curve object.
     *
     * Some common of curve methods:
     * .getPoint( t, optionalTarget ), .getTangent( t, optionalTarget )
     * .getPointAt( u, optionalTarget ), .getTangentAt( u, optionalTarget )
     * .getPoints(), .getSpacedPoints()
     * .getLength()
     * .updateArcLengths()
     *
     * This following curves inherit from THREE.Curve:
     *
     * -- 2D curves --
     * THREE.ArcCurve
     * THREE.CubicBezierCurve
     * THREE.EllipseCurve
     * THREE.LineCurve
     * THREE.QuadraticBezierCurve
     * THREE.SplineCurve
     *
     * -- 3D curves --
     * THREE.CatmullRomCurve3
     * THREE.CubicBezierCurve3
     * THREE.LineCurve3
     * THREE.QuadraticBezierCurve3
     *
     * A series of curves can be represented as a THREE.CurvePath.
     *
     **/
    var Curve = /*#__PURE__*/function () {
      function Curve() {
        this.type = 'Curve';
        this.arcLengthDivisions = 200;
      } // Virtual base class method to overwrite and implement in subclasses


      var _proto = Curve.prototype;

      _proto.getPoint = function getPoint() {
        console.warn('THREE.Curve: .getPoint() not implemented.');
        return null;
      } // Get point at relative position in curve according to arc length
      // - u [0 .. 1]
      ;

      _proto.getPointAt = function getPointAt(u, optionalTarget) {
        var t = this.getUtoTmapping(u);
        return this.getPoint(t, optionalTarget);
      } // Get sequence of points using getPoint( t )
      ;

      _proto.getPoints = function getPoints(divisions) {
        if (divisions === void 0) {
          divisions = 5;
        }

        var points = [];

        for (var d = 0; d <= divisions; d++) {
          points.push(this.getPoint(d / divisions));
        }

        return points;
      } // // Get sequence of points using getPointAt( u )
      // getSpacedPoints(divisions = 5) {
      //     const points = [];
      //     for (let d = 0; d <= divisions; d++) {
      //         points.push(this.getPointAt(d / divisions));
      //     }
      //     return points;
      // }
      // Get total curve arc length
      ;

      _proto.getLength = function getLength() {
        var lengths = this.getLengths();
        return lengths[lengths.length - 1];
      } // Get list of cumulative segment lengths
      ;

      _proto.getLengths = function getLengths(divisions) {
        if (divisions === void 0) {
          divisions = this.arcLengthDivisions;
        }

        if (this.cacheArcLengths && this.cacheArcLengths.length === divisions + 1 && !this.needsUpdate) {
          return this.cacheArcLengths;
        }

        this.needsUpdate = false;
        var cache = [];
        var current,
            last = this.getPoint(0);
        var sum = 0;
        cache.push(0);

        for (var p = 1; p <= divisions; p++) {
          current = this.getPoint(p / divisions);
          sum += current.distanceTo(last);
          cache.push(sum);
          last = current;
        }

        this.cacheArcLengths = cache;
        return cache; // { sums: cache, sum: sum }; Sum is in the last element.
      } // updateArcLengths() {
      //     this.needsUpdate = true;
      //     this.getLengths();
      // }
      // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
      ;

      _proto.getUtoTmapping = function getUtoTmapping(u, distance) {
        var arcLengths = this.getLengths();
        var i = 0;
        var il = arcLengths.length;
        var targetArcLength; // The targeted u distance value to get

        if (distance) {
          targetArcLength = distance;
        } else {
          targetArcLength = u * arcLengths[il - 1];
        } // binary search for the index with largest value smaller than target u distance


        var low = 0,
            high = il - 1,
            comparison;

        while (low <= high) {
          i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats

          comparison = arcLengths[i] - targetArcLength;

          if (comparison < 0) {
            low = i + 1;
          } else if (comparison > 0) {
            high = i - 1;
          } else {
            high = i;
            break; // DONE
          }
        }

        i = high;

        if (arcLengths[i] === targetArcLength) {
          return i / (il - 1);
        } // we could get finer grain at lengths, or use simple interpolation between two points


        var lengthBefore = arcLengths[i];
        var lengthAfter = arcLengths[i + 1];
        var segmentLength = lengthAfter - lengthBefore; // determine where we are between the 'before' and 'after' points

        var segmentFraction = (targetArcLength - lengthBefore) / segmentLength; // add that fractional amount to t

        var t = (i + segmentFraction) / (il - 1);
        return t;
      } // Returns a unit vector tangent at t
      // In case any sub curve does not implement its tangent derivation,
      // 2 points a small delta apart will be used to find its gradient
      // which seems to give a reasonable approximation
      // getTangent(t, optionalTarget) {
      //     const delta = 0.0001;
      //     let t1 = t - delta;
      //     let t2 = t + delta;
      //     // Capping in case of danger
      //     if (t1 < 0) t1 = 0;
      //     if (t2 > 1) t2 = 1;
      //     const pt1 = this.getPoint(t1);
      //     const pt2 = this.getPoint(t2);
      //     const tangent = optionalTarget || ((pt1.isVector2) ? new Vector2() : new Vector3());
      //     tangent.copy(pt2).sub(pt1).normalize();
      //     return tangent;
      // }
      // getTangentAt(u, optionalTarget) {
      //     const t = this.getUtoTmapping(u);
      //     return this.getTangent(t, optionalTarget);
      // }
      // computeFrenetFrames(segments, closed) {
      //     // see http://www.cs.indiana.edu/pub/techreports/TR425.pdf
      //     const normal = new Vector3();
      //     const tangents = [];
      //     const normals = [];
      //     const binormals = [];
      //     const vec = new Vector3();
      //     const mat = new Matrix4();
      //     // compute the tangent vectors for each segment on the curve
      //     for (let i = 0; i <= segments; i++) {
      //         const u = i / segments;
      //         tangents[i] = this.getTangentAt(u, new Vector3());
      //     }
      //     // select an initial normal vector perpendicular to the first tangent vector,
      //     // and in the direction of the minimum tangent xyz component
      //     normals[0] = new Vector3();
      //     binormals[0] = new Vector3();
      //     let min = Number.MAX_VALUE;
      //     const tx = Math.abs(tangents[0].x);
      //     const ty = Math.abs(tangents[0].y);
      //     const tz = Math.abs(tangents[0].z);
      //     if (tx <= min) {
      //         min = tx;
      //         normal.set(1, 0, 0);
      //     }
      //     if (ty <= min) {
      //         min = ty;
      //         normal.set(0, 1, 0);
      //     }
      //     if (tz <= min) {
      //         normal.set(0, 0, 1);
      //     }
      //     vec.crossVectors(tangents[0], normal).normalize();
      //     normals[0].crossVectors(tangents[0], vec);
      //     binormals[0].crossVectors(tangents[0], normals[0]);
      //     // compute the slowly-varying normal and binormal vectors for each segment on the curve
      //     for (let i = 1; i <= segments; i++) {
      //         normals[i] = normals[i - 1].clone();
      //         binormals[i] = binormals[i - 1].clone();
      //         vec.crossVectors(tangents[i - 1], tangents[i]);
      //         if (vec.length() > Number.EPSILON) {
      //             vec.normalize();
      //             const theta = Math.acos(MathUtils.clamp(tangents[i - 1].dot(tangents[i]), - 1, 1)); // clamp for floating pt errors
      //             normals[i].applyMatrix4(mat.makeRotationAxis(vec, theta));
      //         }
      //         binormals[i].crossVectors(tangents[i], normals[i]);
      //     }
      //     // if the curve is closed, postprocess the vectors so the first and last normal vectors are the same
      //     if (closed === true) {
      //         let theta = Math.acos(MathUtils.clamp(normals[0].dot(normals[segments]), - 1, 1));
      //         theta /= segments;
      //         if (tangents[0].dot(vec.crossVectors(normals[0], normals[segments])) > 0) {
      //             theta = - theta;
      //         }
      //         for (let i = 1; i <= segments; i++) {
      //             // twist a little...
      //             normals[i].applyMatrix4(mat.makeRotationAxis(tangents[i], theta * i));
      //             binormals[i].crossVectors(tangents[i], normals[i]);
      //         }
      //     }
      //     return {
      //         tangents: tangents,
      //         normals: normals,
      //         binormals: binormals
      //     };
      // }
      // clone() {
      //     return new this.constructor().copy(this);
      // }
      // copy(source) {
      //     this.arcLengthDivisions = source.arcLengthDivisions;
      //     return this;
      // }
      // toJSON() {
      //     const data = {
      //         metadata: {
      //             version: 4.6,
      //             type: 'Curve',
      //             generator: 'Curve.toJSON'
      //         }
      //     };
      //     data.arcLengthDivisions = this.arcLengthDivisions;
      //     data.type = this.type;
      //     return data;
      // }
      // fromJSON(json) {
      //     this.arcLengthDivisions = json.arcLengthDivisions;
      //     return this;
      // }
      ;

      return Curve;
    }();

    /**
     * // code copy from https://github.com/mrdoob/three.js/blob/dev/src/extras/core/Interpolations.js
     * Bezier Curves formulas obtained from
     * https://en.wikipedia.org/wiki/B%C3%A9zier_curve
     */


    function QuadraticBezierP0(t, p) {
      var k = 1 - t;
      return k * k * p;
    }

    function QuadraticBezierP1(t, p) {
      return 2 * (1 - t) * t * p;
    }

    function QuadraticBezierP2(t, p) {
      return t * t * p;
    }

    function QuadraticBezier(t, p0, p1, p2) {
      return QuadraticBezierP0(t, p0) + QuadraticBezierP1(t, p1) + QuadraticBezierP2(t, p2);
    } //

    var QuadraticBezierCurve3 = /*#__PURE__*/function (_Curve) {
      _inheritsLoose(QuadraticBezierCurve3, _Curve);

      function QuadraticBezierCurve3(v0, v1, v2) {
        var _this;

        if (v0 === void 0) {
          v0 = new Vector3();
        }

        if (v1 === void 0) {
          v1 = new Vector3();
        }

        if (v2 === void 0) {
          v2 = new Vector3();
        }

        _this = _Curve.call(this) || this;
        _this.isQuadraticBezierCurve3 = true;
        _this.type = 'QuadraticBezierCurve3';
        _this.v0 = v0;
        _this.v1 = v1;
        _this.v2 = v2;
        return _this;
      }

      var _proto = QuadraticBezierCurve3.prototype;

      _proto.getPoint = function getPoint(t, optionalTarget) {
        if (optionalTarget === void 0) {
          optionalTarget = new Vector3();
        }

        var point = optionalTarget;
        var v0 = this.v0,
            v1 = this.v1,
            v2 = this.v2;
        point.set(QuadraticBezier(t, v0.x, v1.x, v2.x), QuadraticBezier(t, v0.y, v1.y, v2.y), QuadraticBezier(t, v0.z, v1.z, v2.z));
        return point;
      } // copy(source) {
      //     super.copy(source);
      //     this.v0.copy(source.v0);
      //     this.v1.copy(source.v1);
      //     this.v2.copy(source.v2);
      //     return this;
      // }
      // toJSON() {
      //     const data = super.toJSON();
      //     data.v0 = this.v0.toArray();
      //     data.v1 = this.v1.toArray();
      //     data.v2 = this.v2.toArray();
      //     return data;
      // }
      // fromJSON(json) {
      //     super.fromJSON(json);
      //     this.v0.fromArray(json.v0);
      //     this.v1.fromArray(json.v1);
      //     this.v2.fromArray(json.v2);
      //     return this;
      // }
      ;

      return QuadraticBezierCurve3;
    }(Curve);

    /* eslint-disable no-tabs */
    var helpVec3_1 = new Vector3();
    var helpVec3_2 = new Vector3();
    var helpVec3_3 = new Vector3();
    var helpMat4 = new Matrix4();
    var helpCurve = new QuadraticBezierCurve3();

    function _getCornerBezierCurve(last, current, next, cornerRadius, firstCorner, out) {
      var lastDir = helpVec3_1.subVectors(current, last);
      var nextDir = helpVec3_2.subVectors(next, current);
      var lastDirLength = lastDir.length();
      var nextDirLength = nextDir.length();
      lastDir.normalize();
      nextDir.normalize(); // cornerRadius can not bigger then lineDistance / 2, auto fix this

      var v0Dist = Math.min((firstCorner ? lastDirLength / 2 : lastDirLength) * 0.999999, cornerRadius);
      out.v0.copy(current).sub(lastDir.multiplyScalar(v0Dist));
      out.v1.copy(current);
      var v2Dist = Math.min(nextDirLength / 2 * 0.999999, cornerRadius);
      out.v2.copy(current).add(nextDir.multiplyScalar(v2Dist));
      return out;
    }
    /**
     * PathPointList
     * input points to generate a PathPoint list
     */


    var PathPointList = /*#__PURE__*/function () {
      function PathPointList() {
        this.array = []; // path point array

        this.count = 0;
      }
      /**
       * Set points
       * @param {THREE.Vector3[]} points key points array
       * @param {number} cornerRadius? the corner radius. set 0 to disable round corner. default is 0.1
       * @param {number} cornerSplit? the corner split. default is 10.
       * @param {number} up? force up. default is auto up (calculate by tangent).
       * @param {boolean} close? close path. default is false.
       */


      var _proto = PathPointList.prototype;

      _proto.set = function set(points, cornerRadius, cornerSplit, up, close) {
        if (cornerRadius === void 0) {
          cornerRadius = 0.1;
        }

        if (cornerSplit === void 0) {
          cornerSplit = 10;
        }

        if (up === void 0) {
          up = null;
        }

        if (close === void 0) {
          close = false;
        }

        points = points.slice(0);

        if (points.length < 2) {
          console.warn('PathPointList: points length less than 2.');
          this.count = 0;
          return;
        } // Auto close


        if (close && !points[0].equals(points[points.length - 1])) {
          points.push(new Vector3().copy(points[0]));
        } // Generate path point list


        for (var i = 0, l = points.length; i < l; i++) {
          if (i === 0) {
            this._start(points[i], points[i + 1], up);
          } else if (i === l - 1) {
            if (close) {
              // Connect end point and start point
              this._corner(points[i], points[1], cornerRadius, cornerSplit, up); // Fix start point


              var dist = this.array[0].dist; // should not copy dist

              this.array[0].copy(this.array[this.count - 1]);
              this.array[0].dist = dist;
            } else {
              this._end(points[i]);
            }
          } else {
            this._corner(points[i], points[i + 1], cornerRadius, cornerSplit, up);
          }
        }
      }
      /**
       * Get distance of this path
       * @return {number}
       */
      ;

      _proto.distance = function distance() {
        if (this.count > 0) {
          return this.array[this.count - 1].dist;
        }

        return 0;
      };

      _proto._getByIndex = function _getByIndex(index) {
        if (!this.array[index]) {
          this.array[index] = new PathPoint();
        }

        return this.array[index];
      };

      _proto._start = function _start(current, next, up) {
        this.count = 0;

        var point = this._getByIndex(this.count);

        point.pos.copy(current);
        point.dir.subVectors(next, current); // init start up dir

        if (up) {
          point.up.copy(up);
        } else {
          // select an initial normal vector perpendicular to the first tangent vector
          var min = Number.MAX_VALUE;
          var tx = Math.abs(point.dir.x);
          var ty = Math.abs(point.dir.y);
          var tz = Math.abs(point.dir.z);

          if (tx < min) {
            min = tx;
            point.up.set(1, 0, 0);
          }

          if (ty < min) {
            min = ty;
            point.up.set(0, 1, 0);
          }

          if (tz < min) {
            point.up.set(0, 0, 1);
          }
        }

        point.right.crossVectors(point.dir, point.up).normalize();
        point.up.crossVectors(point.right, point.dir).normalize();
        point.dist = 0;
        point.widthScale = 1;
        point.sharp = false;
        point.dir.normalize();
        this.count++;
      };

      _proto._end = function _end(current) {
        var lastPoint = this.array[this.count - 1];

        var point = this._getByIndex(this.count);

        point.pos.copy(current);
        point.dir.subVectors(current, lastPoint.pos);
        var dist = point.dir.length();
        point.dir.normalize();
        point.up.copy(lastPoint.up); // copy last up

        var vec = helpVec3_1.crossVectors(lastPoint.dir, point.dir);

        if (vec.length() > Number.EPSILON) {
          vec.normalize();
          var theta = Math.acos(Math.min(Math.max(lastPoint.dir.dot(point.dir), -1), 1)); // clamp for floating pt errors

          point.up.applyMatrix4(helpMat4.makeRotationAxis(vec, theta));
        }

        point.right.crossVectors(point.dir, point.up).normalize();
        point.dist = lastPoint.dist + dist;
        point.widthScale = 1;
        point.sharp = false;
        this.count++;
      };

      _proto._corner = function _corner(current, next, cornerRadius, cornerSplit, up) {
        if (cornerRadius > 0 && cornerSplit > 0) {
          var lastPoint = this.array[this.count - 1];

          var curve = _getCornerBezierCurve(lastPoint.pos, current, next, cornerRadius, this.count - 1 === 0, helpCurve);

          var samplerPoints = curve.getPoints(cornerSplit); // TODO optimize

          for (var f = 0; f < cornerSplit; f++) {
            this._sharpCorner(samplerPoints[f], samplerPoints[f + 1], up, f === 0 ? 1 : 0);
          }

          if (!samplerPoints[cornerSplit].equals(next)) {
            this._sharpCorner(samplerPoints[cornerSplit], next, up, 2);
          }
        } else {
          this._sharpCorner(current, next, up, 0, true);
        }
      } // dirType: 0 - use middle dir / 1 - use last dir / 2- use next dir
      ;

      _proto._sharpCorner = function _sharpCorner(current, next, up, dirType, sharp) {
        if (dirType === void 0) {
          dirType = 0;
        }

        if (sharp === void 0) {
          sharp = false;
        }

        var lastPoint = this.array[this.count - 1];

        var point = this._getByIndex(this.count);

        var lastDir = helpVec3_1.subVectors(current, lastPoint.pos);
        var nextDir = helpVec3_2.subVectors(next, current);
        var lastDirLength = lastDir.length();
        lastDir.normalize();
        nextDir.normalize();
        point.pos.copy(current);

        if (dirType === 1) {
          point.dir.copy(lastDir);
        } else if (dirType === 2) {
          point.dir.copy(nextDir);
        } else {
          point.dir.addVectors(lastDir, nextDir);
          point.dir.normalize();
        }

        if (up) {
          if (point.dir.dot(up) === 1) {
            point.right.crossVectors(nextDir, up).normalize();
          } else {
            point.right.crossVectors(point.dir, up).normalize();
          }

          point.up.crossVectors(point.right, point.dir).normalize();
        } else {
          point.up.copy(lastPoint.up);
          var vec = helpVec3_3.crossVectors(lastPoint.dir, point.dir);

          if (vec.length() > Number.EPSILON) {
            vec.normalize();
            var theta = Math.acos(Math.min(Math.max(lastPoint.dir.dot(point.dir), -1), 1)); // clamp for floating pt errors

            point.up.applyMatrix4(helpMat4.makeRotationAxis(vec, theta));
          }

          point.right.crossVectors(point.dir, point.up).normalize();
        }

        point.dist = lastPoint.dist + lastDirLength;

        var _cos = lastDir.dot(nextDir);

        point.widthScale = Math.min(1 / Math.sqrt((1 + _cos) / 2), 1.415) || 1;
        point.sharp = Math.abs(_cos - 1) > 0.05 && sharp;
        this.count++;
      };

      return PathPointList;
    }();

    var UP = new Vector3(0, 0, 1);
    function expandPaths(lines, options) {
      options = Object.assign({}, {
        lineWidth: 1,
        cornerRadius: 0,
        cornerSplit: 10
      }, options);
      var results = lines.map(function (line) {
        var points = line.map(function (p) {
          var x = p[0],
              y = p[1],
              z = p[2];
          return new Vector3(x, y, z || 0);
        });
        var pathPointList = new PathPointList();
        pathPointList.set(points, options.cornerRadius, options.cornerSplit, UP);
        var result = generatePathVertexData(pathPointList, options);
        result.line = line;
        result.position = new Float32Array(result.points);
        result.indices = new Uint32Array(result.index);
        result.uv = new Float32Array(result.uvs);
        result.normal = new Float32Array(result.normal);
        return result;
      });
      var result = merge(results);
      result.lines = lines;
      return result;
    } // Vertex Data Generate Functions
    // code copy from https://github.com/shawn0326/three.path/blob/master/src/PathGeometry.js

    function generatePathVertexData(pathPointList, options) {
      var width = options.lineWidth || 0.1;
      var progress = 1;
      var halfWidth = width / 2;
      var sideWidth = width;
      var totalDistance = pathPointList.distance();
      var progressDistance = progress * totalDistance;

      if (totalDistance === 0) {
        return null;
      }

      var sharpUvOffset = halfWidth / sideWidth; // const sharpUvOffset2 = halfWidth / totalDistance;

      var count = 0; // modify data

      var position = [];
      var normal = [];
      var uv = [];
      var indices = [];
      var verticesCount = 0;
      var right = new Vector3();
      var left = new Vector3(); // for sharp corners

      var leftOffset = new Vector3();
      var rightOffset = new Vector3();
      var tempPoint1 = new Vector3();
      var tempPoint2 = new Vector3();

      function addVertices(pathPoint) {
        var first = position.length === 0;
        var sharpCorner = pathPoint.sharp && !first;
        var uvDist = pathPoint.dist / sideWidth; // const uvDist2 = pathPoint.dist / totalDistance;

        var dir = pathPoint.dir;
        var up = pathPoint.up;
        var _right = pathPoint.right;

        {
          right.copy(_right).multiplyScalar(halfWidth * pathPoint.widthScale);
        }

        {
          left.copy(_right).multiplyScalar(-halfWidth * pathPoint.widthScale);
        }

        right.add(pathPoint.pos);
        left.add(pathPoint.pos);

        if (sharpCorner) {
          leftOffset.fromArray(position, position.length - 6).sub(left);
          rightOffset.fromArray(position, position.length - 3).sub(right);
          var leftDist = leftOffset.length();
          var rightDist = rightOffset.length();
          var sideOffset = leftDist - rightDist;
          var longerOffset, longEdge;

          if (sideOffset > 0) {
            longerOffset = leftOffset;
            longEdge = left;
          } else {
            longerOffset = rightOffset;
            longEdge = right;
          }

          tempPoint1.copy(longerOffset).setLength(Math.abs(sideOffset)).add(longEdge); // eslint-disable-next-line prefer-const

          var _cos = tempPoint2.copy(longEdge).sub(tempPoint1).normalize().dot(dir); // eslint-disable-next-line prefer-const


          var _len = tempPoint2.copy(longEdge).sub(tempPoint1).length(); // eslint-disable-next-line prefer-const


          var _dist = _cos * _len * 2;

          tempPoint2.copy(dir).setLength(_dist).add(tempPoint1);

          if (sideOffset > 0) {
            position.push(tempPoint1.x, tempPoint1.y, tempPoint1.z, // 6
            right.x, right.y, right.z, // 5
            left.x, left.y, left.z, // 4
            right.x, right.y, right.z, // 3
            tempPoint2.x, tempPoint2.y, tempPoint2.z, // 2
            right.x, right.y, right.z // 1
            );
            verticesCount += 6;
            indices.push(verticesCount - 6, verticesCount - 8, verticesCount - 7, verticesCount - 6, verticesCount - 7, verticesCount - 5, verticesCount - 4, verticesCount - 6, verticesCount - 5, verticesCount - 2, verticesCount - 4, verticesCount - 1);
            count += 12;
          } else {
            position.push(left.x, left.y, left.z, // 6
            tempPoint1.x, tempPoint1.y, tempPoint1.z, // 5
            left.x, left.y, left.z, // 4
            right.x, right.y, right.z, // 3
            left.x, left.y, left.z, // 2
            tempPoint2.x, tempPoint2.y, tempPoint2.z // 1
            );
            verticesCount += 6;
            indices.push(verticesCount - 6, verticesCount - 8, verticesCount - 7, verticesCount - 6, verticesCount - 7, verticesCount - 5, verticesCount - 6, verticesCount - 5, verticesCount - 3, verticesCount - 2, verticesCount - 3, verticesCount - 1);
            count += 12;
          }

          normal.push(up.x, up.y, up.z, up.x, up.y, up.z, up.x, up.y, up.z, up.x, up.y, up.z, up.x, up.y, up.z, up.x, up.y, up.z);
          uv.push(uvDist - sharpUvOffset, 0, uvDist - sharpUvOffset, 1, uvDist, 0, uvDist, 1, uvDist + sharpUvOffset, 0, uvDist + sharpUvOffset, 1); // if (generateUv2) {
          //     uv2.push(
          //         uvDist2 - sharpUvOffset2, 0,
          //         uvDist2 - sharpUvOffset2, 1,
          //         uvDist2, 0,
          //         uvDist2, 1,
          //         uvDist2 + sharpUvOffset2, 0,
          //         uvDist2 + sharpUvOffset2, 1
          //     );
          // }
        } else {
          position.push(left.x, left.y, left.z, right.x, right.y, right.z);
          normal.push(up.x, up.y, up.z, up.x, up.y, up.z);
          uv.push(uvDist, 0, uvDist, 1); // if (generateUv2) {
          //     uv2.push(
          //         uvDist2, 0,
          //         uvDist2, 1
          //     );
          // }

          verticesCount += 2;

          if (!first) {
            indices.push(verticesCount - 2, verticesCount - 4, verticesCount - 3, verticesCount - 2, verticesCount - 3, verticesCount - 1);
            count += 6;
          }
        }
      }

      var lastPoint;

      if (progressDistance > 0) {
        for (var i = 0; i < pathPointList.count; i++) {
          var pathPoint = pathPointList.array[i];

          if (pathPoint.dist > progressDistance) {
            var prevPoint = pathPointList.array[i - 1];
            lastPoint = new PathPoint(); // linear lerp for progress

            var alpha = (progressDistance - prevPoint.dist) / (pathPoint.dist - prevPoint.dist);
            lastPoint.lerpPathPoints(prevPoint, pathPoint, alpha);
            addVertices(lastPoint);
            break;
          } else {
            addVertices(pathPoint);
          }
        }
      } else {
        lastPoint = pathPointList.array[0];
      }

      return {
        points: position,
        normal: normal,
        uvs: uv,
        index: indices,
        count: count
      };
    }

    exports.cylinder = cylinder;
    exports.expandLine = expandLine;
    exports.expandPaths = expandPaths;
    exports.extrudePolygons = extrudePolygons;
    exports.extrudePolylines = extrudePolylines;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=poly-extrude.js.map
