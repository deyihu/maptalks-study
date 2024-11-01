/*!
 * colorin v0.7.0
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.colorin = global.colorin || {}));
}(this, function (exports) { 'use strict';

    let canvas;
    const OPTIONS = {
        width: 100,
        height: 10
    };
    // const ISNODE = typeof global === 'object';

    let offscreenCanvas = false;
    try {
        const canvas = new OffscreenCanvas(1, 1);
        const ctx = canvas.getContext('2d');
        ctx.fillText('hello', 0, 0);
        offscreenCanvas = true;
    } catch (err) {
        offscreenCanvas = false;
    }

    function getCanvas() {
        if (!canvas) {
            const { width, height } = OPTIONS;
            if (offscreenCanvas) {
                canvas = new OffscreenCanvas(width, height);
            } else {
                canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
            }
        }
        return canvas;
    }

    function registerCanvas(canvasInstance) {
        if (canvasInstance) {
            canvas = canvasInstance;
        }
    }

    class ColorIn {
        constructor(colors, options = {}) {
            if (!Array.isArray(colors)) {
                console.error('colors is not array');
                return;
            }
            if (colors.length < 2) {
                console.error('colors.length should >1');
                return;
            }
            this.colors = colors;
            let min = Infinity, max = -Infinity;
            for (let i = 0, len = colors.length; i < len; i++) {
                const value = colors[i][0];
                min = Math.min(value, min);
                max = Math.max(value, max);
            }
            this.min = min;
            this.max = max;
            this.valueOffset = this.max - this.min;
            this.options = Object.assign({}, OPTIONS, options);
            this._initImgData();
        }

        getImageData() {
            return this.imgData;
        }

        _initImgData() {
            const canvas = getCanvas();
            const { width, height } = this.options;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            const { colors, valueOffset } = this;
            for (let i = 0, len = colors.length; i < len; i++) {
                const [stop, color] = colors[i];
                const s = (stop - this.min) / valueOffset;
                gradient.addColorStop(s, color);
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            this.imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }

        getColor(stop) {
            stop = Math.max(this.min, stop);
            stop = Math.min(stop, this.max);
            const s = (stop - this.min) / this.valueOffset;
            let x = Math.round(s * this.imgData.width);
            x = Math.min(x, this.imgData.width - 1);
            const idx = x * 4;
            const r = this.imgData.data[idx];
            const g = this.imgData.data[idx + 1];
            const b = this.imgData.data[idx + 2];
            const a = this.imgData.data[idx + 3];
            return [r, g, b, a];
        }
    }

    exports.registerCanvas = registerCanvas;
    exports.ColorIn = ColorIn;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=colorin.js.map
