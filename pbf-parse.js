const path = require('path');
const fs = require('fs');
const Protobuf = require('pbf');
const VectorTile = require('@mapbox/vector-tile').VectorTile;
const gunzipSync = require('zlib').gunzipSync;
// import { VectorTile } from '@mapbox/vector-tile';
// import Protobuf from 'pbf';

const data = fs.readFileSync('./46.pbf');
const buffer = gunzipSync(data);
const tile = new VectorTile(new Protobuf(buffer));
console.log(tile.layers);