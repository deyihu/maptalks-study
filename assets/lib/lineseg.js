/*!
 * lineseg v0.2.0
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.lineseg = global.lineseg || {}));
}(this, function (exports) { 'use strict';

    const PI = Math.PI / 180;
    const R = 6378137;

    function degreesToRadians(d) {
        return d * PI;
    }

    function geoDistance(c1, c2) {
        if (!c1 || !c2) {
            return 0;
        }
        if (!Array.isArray(c1)) {
            c1 = c1.toArray();
        }
        if (!Array.isArray(c2)) {
            c2 = c2.toArray();
        }
        let b = degreesToRadians(c1[1]);
        const d = degreesToRadians(c2[1]),
            e = b - d,
            f = degreesToRadians(c1[0]) - degreesToRadians(c2[0]);
        b = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(e / 2), 2) + Math.cos(b) * Math.cos(d) * Math.pow(Math.sin(f / 2), 2)));
        b *= R;
        const dis = Math.round(b * 1E5) / 1E5;
        const z1 = c1[2] || 0, z2 = c2[2] || 0;
        const dz = z1 - z2;
        if (dz === 0) {
            return dis;
        }
        return Math.sqrt(dis * dis + dz * dz);
    }

    function distance(p1, p2) {
        const dx = p2[0] - p1[0], dy = p2[1] - p1[1], dz = (p2[2] || 0 - p1[2] || 0);
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    function getPercentLngLat(l, distance) {
        const { len, p1, p2 } = l;
        const dx = p2[0] - p1[0],
            dy = p2[1] - p1[1],
            dh = (p2[2] || 0) - (p1[2] || 0);
        const percent = distance / len;
        const lng = p1[0] + percent * dx;
        const lat = p1[1] + percent * dy;
        const h = (p1[2] || 0) + percent * dh;
        return [lng, lat, h];
    }

    function lineSeg(line, options = {}) {
        options = Object.assign({ segDistance: 1, isGeo: true }, options);
        const segDistance = Math.max(options.segDistance, 0.00000000000000001);
        const isGeo = options.isGeo;
        const len = line.length;
        const list = [];
        let totalLen = 0;
        for (let i = 0; i < len - 1; i++) {
            const p1 = line[i], p2 = line[i + 1];
            const dis = isGeo ? geoDistance(p1, p2) : distance(p1, p2);
            // const floorlen = Math.floor(len);
            list.push({
                p1,
                len: dis,
                p2
            });
            totalLen += dis;
        }
        if (totalLen <= segDistance) {
            return list.map(d => {
                return [d.p1, d.p2];
            });
        }
        if (list.length === 1) {
            if (list[0].len <= segDistance) {
                return [
                    [list[0].p1, list[0].p2]
                ];
            }
        }
        const LNGLATSLEN = list.length;
        const first = list[0];
        let idx = 0;
        let currentLngLat;
        let currentLen = 0;
        const lines = [];
        let tempLine = [first.p1];
        while (idx < LNGLATSLEN) {
            const { len, p2 } = list[idx];
            currentLen += len;
            if (currentLen < segDistance) {
                tempLine.push(p2);
                if (idx === LNGLATSLEN - 1) {
                    lines.push(tempLine);
                }
                idx++;
                continue;
            }
            if (currentLen === segDistance) {
                tempLine.push(p2);
                currentLen = 0;
                lines.push(tempLine);
                // next
                tempLine = [p2];
                idx++;
                continue;
            }
            if (currentLen > segDistance) {
                const offsetLen = segDistance - (currentLen - len);
                currentLngLat = getPercentLngLat(list[idx], offsetLen);
                tempLine.push(currentLngLat);
                lines.push(tempLine);
                currentLen = 0;
                list[idx].p1 = currentLngLat;
                list[idx].len = len - offsetLen;
                // next
                tempLine = [currentLngLat];
            }
        }
        return lines;
    }

    exports.lineSeg = lineSeg;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=lineseg.js.map
