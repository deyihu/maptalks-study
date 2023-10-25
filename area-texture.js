const fs = require('fs');
const path = require('path');
const cover = require('@mapbox/tile-cover');
const gcoord = require('gcoord');
const { createCanvas, Image } = require('@napi-rs/canvas');
const axios = require('axios').default;
const SphericalMercator = require('@mapbox/sphericalmercator');
const TILESIZE = 256;
const merc = new SphericalMercator({
    size: TILESIZE,
    antimeridian: true
});
const TILEURL = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
// const TILEURL = 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}';

const limits = {
    min_zoom: 10,
    max_zoom: 10
};

function getTileImages(tiles, callback) {
    let idx = 0;
    const result = [];
    function load() {
        if (idx < tiles.length) {
            const [x, y, z] = tiles[idx];
            const url = TILEURL.replace('{z}', z).replace('{x}', x).replace('{y}', y);
            console.log(`get tile :${idx + 1}/${tiles.length},url:${url}`);
            axios.get(url, {
                responseType: 'arraybuffer'
            }).then(res => {
                result.push({
                    tile: tiles[idx],
                    buffer: res.data
                })
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                idx++;
                load();
            })
        } else {
            callback(result);
        }
    }
    load();
}

function getGeometry() {
    let geometry;
    let geojson = fs.readFileSync(path.join(__dirname, './assets/data/beijing.geojson')).toString();
    geojson = JSON.parse(geojson);
    geometry = geojson.features[0].geometry;
    return geometry;
}

//计算所有tiles的bbox,返回的是墨卡托的值
function tilesBBOX(tiles) {
    const tilesBBOX = [Infinity, Infinity, -Infinity, -Infinity];
    tiles.forEach(tile => {
        const [x, y, z] = tile;
        const [x1, y1, x2, y2] = merc.bbox(x, y, z);
        tilesBBOX[0] = Math.min(tilesBBOX[0], x1);
        tilesBBOX[1] = Math.min(tilesBBOX[1], y1);
        tilesBBOX[2] = Math.max(tilesBBOX[2], x2);
        tilesBBOX[3] = Math.max(tilesBBOX[3], y2);
    });
    const min = gcoord.transform(tilesBBOX.slice(0, 2), gcoord.WGS84, gcoord.WebMercator);
    const max = gcoord.transform(tilesBBOX.slice(2, 4), gcoord.WGS84, gcoord.WebMercator);
    return [...min, ...max];
}

//合并所有的tiles为一个整张的图片
function mergeTitles(tileImages) {
    const tiles = tileImages.map(d => {
        return d.tile;
    });
    const { minx, miny, width, height } = getImageSize(tiles);
    const images = [];
    tileImages.forEach(d => {
        const { tile, buffer } = d;
        const [x, y] = tile;
        const dx = (x - minx) * TILESIZE, dy = (y - miny) * TILESIZE;
        images.push({
            dx, dy, buffer
        });
    });
    const canvas = createCanvas(width, height);
    return { canvas, width, height, images };
}

function getImageSize(tiles) {
    let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    tiles.forEach(tile => {
        const [x, y, z] = tile;
        minx = Math.min(minx, x);
        maxx = Math.max(maxx, x);
        miny = Math.min(miny, y);
        maxy = Math.max(maxy, y);
    });
    const width = (maxx - minx + 1) * 256, height = (maxy - miny + 1) * 256;
    return {
        width,
        height,
        minx,
        miny,
        maxx,
        maxy
    };
}


function getPolygons(geometry) {
    const mGeometry = gcoord.transform(geometry, gcoord.WGS84, gcoord.WebMercator);
    const { type, coordinates } = mGeometry;
    if (type === 'MultiPolygon') {
        return coordinates.map(c => {
            return c[0];
        })
    }
    return [coordinates];
}

//墨卡托坐标转像素坐标
function polygonPixels(tiles, geometry, width, height) {
    const polygons = getPolygons(geometry);
    const [minx, miny, maxx, maxy] = tilesBBOX(tiles);
    const dx = (maxx - minx), dy = (maxy - miny);
    return polygons.map(p => {
        return p.map(c => {
            const [mx, my] = c;
            const x = (mx - minx) / dx * width;
            const y = height - (my - miny) / dy * height;
            return [x, y];
        });
    })

}

function clipCanvas(ctx, xys) {
    // ctx.lineWidth = 0;
    let minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity;
    xys.forEach(xy => {
        ctx.beginPath();
        for (let i = 0, len = xy.length; i < len; i++) {
            const [x, y] = xy[i];
            minx = Math.min(minx, x);
            miny = Math.min(miny, y);
            maxx = Math.max(maxx, x);
            maxy = Math.max(maxy, y);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    });
    // ctx.stroke();
    ctx.clip();
    return [minx, miny, maxx, maxy];
}

function drawTiles(ctx, images) {
    images.forEach(d => {
        const { dx, dy, buffer } = d;
        const image = new Image();
        image.src = buffer;
        ctx.drawImage(image, dx, dy);
    });
}

function rectClipCanvas(canvas, bbox) {
    const [x1, y1, x2, y2] = bbox;
    const width = x2 - x1, height = y2 - y1;
    const canvas1 = createCanvas(width, height);
    const ctx = canvas1.getContext('2d');
    ctx.drawImage(canvas, x1, y1, width, height, 0, 0, width, height);
    return canvas1;
}

function test() {
    const geometry = getGeometry();
    const tiles = cover.tiles(geometry, limits);
    getTileImages(tiles, (tileImages) => {
        const { canvas, width, height, images } = mergeTitles(tileImages);
        const pixels = polygonPixels(tiles, geometry, width, height);
        const ctx = canvas.getContext('2d');
        const bbox = clipCanvas(ctx, pixels);
        drawTiles(ctx, images);
        const canvas1 = rectClipCanvas(canvas, bbox);
        fs.writeFileSync('./texture.png', canvas1.toBuffer('image/png'));
    })
}

test();
