// Rollup plugins
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';
const path = require('path');
const product = process.env.NODE_ENV.trim() === 'prd';

const FILEMANE = pkg.name;

const banner = `/*!\n * ${pkg.name} v${pkg.version}\n  */`;
const external = ['maptalks'];
const globals = {
    maptalks: 'maptalks'
};

const plugins = [
    json(),
    // typescript({

    // }),
    nodeResolve(),
    commonjs()
    // babel({
    //     // exclude: ['node_modules/**']
    // })
];

function getEntry() {
    return path.join(__dirname, './util-index.js');
}

const bundles = [
    {
        input: getEntry(),
        external: external,
        plugins: plugins,
        output: {
            'format': 'umd',
            'name': 'study',
            'file': `assets/bundle/${FILEMANE}.js`,
            'sourcemap': true,
            'extend': true,
            'banner': banner,
            globals
        }
    }

];

const filterBundles = product ? bundles : bundles.slice(0, 2);

export default filterBundles;