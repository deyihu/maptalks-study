/*!
 * maptalks.routeplayer v1.1.0
 * LICENSE : MIT
 * (c) 2016-2024 maptalks.org
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.maptalks = global.maptalks || {}));
})(this, (function (exports) { 'use strict';

    function now() {
        return Date.now();
    }

    /**
     * @classdesc
     * Utilities methods used internally. It is static and should not be initiated.
     * @class
     * @static
     * @category core
     * @name Util
     */

    /**
     * Merges the properties of sources into destination object.
     * @param  {Object} dest   - object to extend
     * @param  {...Object} src - sources
     * @return {Object}
     * @memberOf Util
     */
    function extend(dest) { // (Object[, Object, ...]) ->
        for (let i = 1; i < arguments.length; i++) {
            const src = arguments[i];
            for (const k in src) {
                dest[k] = src[k];
            }
        }
        return dest;
    }

    /**
     * Whether the object is null or undefined.
     * @param  {Object}  obj - object
     * @return {Boolean}
     * @memberOf Util
     */
    function isNil(obj) {
        return obj == null;
    }

    /**
     * Whether val is a number and not a NaN.
     * @param  {Object}  val - val
     * @return {Boolean}
     * @memberOf Util
     */
    function isNumber(val) {
        return (typeof val === 'number') && !isNaN(val);
    }

    /**
     * Whether the obj is a javascript object.
     * @param  {Object}  obj  - object
     * @return {Boolean}
     * @memberOf Util
     */
    function isObject(obj) {
        return typeof obj === 'object' && !!obj;
    }

    /**
     * Check whether the object is a string
     * @param {Object} obj
     * @return {Boolean}
     * @memberOf Util
     */
    function isString(obj) {
        if (isNil(obj)) {
            return false;
        }
        return typeof obj === 'string' || (obj.constructor !== null && obj.constructor === String);
    }

    /**
     * Check whether the object is a function
     * @param {Object} obj
     * @return {Boolean}
     * @memberOf Util
     */
    function isFunction(obj) {
        if (isNil(obj)) {
            return false;
        }
        return typeof obj === 'function' || (obj.constructor !== null && obj.constructor === Function);
    }

    /**
     * from detect-node
     * https://github.com/iliakan/detect-node
     *
     * @property {boolean} IS_NODE - whether running in nodejs but not on electron,node-webkit
     * @global
     * @name IS_NODE
     */
    const IS_NODE = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]' && !process.versions['electron'] && !process.versions['nw'] && !process.versions['node-webkit'];

    let Browser = {};
    // const maps = {};

    function getDevicePixelRatio() {
        return (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI));
    }

    if (!IS_NODE) {
        const ua = navigator.userAgent.toLowerCase(),
            doc = document.documentElement || { style: {}},

            ie = 'ActiveXObject' in window,

            webkit = ua.indexOf('webkit') !== -1,
            phantomjs = ua.indexOf('phantom') !== -1,
            android23 = ua.search('android [23]') !== -1,
            chrome = ua.indexOf('chrome') !== -1,
            gecko = ua.indexOf('gecko') !== -1 && !webkit && !window.opera && !ie,
            iosWeixin = /iphone/i.test(ua) && /micromessenger/i.test(ua),

            mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1,
            msPointer = !window.PointerEvent && window.MSPointerEvent,
            pointer = (window.PointerEvent && navigator.pointerEnabled) || msPointer,

            ie3d = ie && ('transition' in doc.style),
            webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
            gecko3d = 'MozPerspective' in doc.style,
            opera12 = 'OTransition' in doc.style,
            any3d = (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs,
            // https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap
            // this will Improve performance 2-3FPS
            imageBitMap = typeof window !== 'undefined' && isFunction(window.createImageBitmap),
            resizeObserver = typeof window !== 'undefined' && isFunction(window.ResizeObserver),
            btoa = typeof window !== 'undefined' && isFunction(window.btoa),
            proxy = typeof window !== 'undefined' && isFunction(window.Proxy),
            requestIdleCallback = typeof window !== 'undefined' && isFunction(window.requestIdleCallback);


        let chromeVersion = 0;
        if (chrome) {
            chromeVersion = ua.match(/chrome\/([\d.]+)/)[1];
        }

        const touch = !phantomjs && (pointer || 'ontouchstart' in window ||
            (window.DocumentTouch && document instanceof window.DocumentTouch));

        // let webgl;
        // try {
        //     const canvas = document.createElement('canvas');
        //     const gl = canvas.getContext('webgl') ||
        //         canvas.getContext('experimental-webgl');
        //     webgl = gl && gl instanceof WebGLRenderingContext;
        // } catch (err) {
        //     webgl = false;
        // }
        const webgl = typeof window !== 'undefined' && ('WebGLRenderingContext' in window);

        const devicePixelRatio = getDevicePixelRatio();

        let decodeImageInWorker = false;
        try {
            const offCanvas = new OffscreenCanvas(2, 2);
            offCanvas.getContext('2d');
            decodeImageInWorker = true;
        } catch (err) {
            decodeImageInWorker = false;
        }
        // https://github.com/Modernizr/Modernizr/issues/1894
        /* Add feature test for passive event listener support */
        let supportsPassive = false;
        try {
            window.addEventListener('testPassive', () => {
            }, {
                get passive() {
                    supportsPassive = true;
                }
            });
            /*eslint-disable no-empty */
        } catch (e) {
        }

        Browser = {
            isTest: false,
            ie: ie,
            ielt9: ie && !document.addEventListener,
            edge: 'msLaunchUri' in navigator && !('documentMode' in document),
            webkit: webkit,
            gecko: gecko,
            android: ua.indexOf('android') !== -1,
            android23: android23,
            chrome: chrome,
            chromeVersion: chromeVersion,
            safari: !chrome && ua.indexOf('safari') !== -1,
            phantomjs: phantomjs,

            ie3d: ie3d,
            webkit3d: webkit3d,
            gecko3d: gecko3d,
            opera12: opera12,
            any3d: any3d,
            iosWeixin,

            mobile: mobile,
            mobileWebkit: mobile && webkit,
            mobileWebkit3d: mobile && webkit3d,
            mobileOpera: mobile && window.opera,
            mobileGecko: mobile && gecko,

            touch: !!touch,
            msPointer: !!msPointer,
            pointer: !!pointer,

            retina: devicePixelRatio > 1,
            devicePixelRatio,

            language: navigator.browserLanguage ? navigator.browserLanguage : navigator.language,
            ie9: (ie && document.documentMode === 9),
            ie10: (ie && document.documentMode === 10),

            webgl: webgl,
            imageBitMap,
            resizeObserver,
            btoa,
            decodeImageInWorker,
            monitorDPRChange: true,
            supportsPassive,
            proxy,
            requestIdleCallback,
            // removeDPRListening: (map) => {
            //     // if (map) {
            //     //     delete maps[map.id];
            //     // }
            // },
            checkDevicePixelRatio: () => {
                if (typeof window !== 'undefined' && Browser.monitorDPRChange) {
                    const devicePixelRatio = getDevicePixelRatio();
                    const changed = devicePixelRatio !== Browser.devicePixelRatio;
                    if (changed) {
                        Browser.devicePixelRatio = devicePixelRatio;
                    }
                    return changed;
                }
                return false;
            },
            // addDPRListening: (map) => {
            //     // if (map) {
            //     //     maps[map.id] = map;
            //     // }
            // }
        };
    }
    var Browser$1 = Browser;

    let uid = 0;

    function UID() {
        return uid++;
    }
    const GUID = UID;

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var colorin = {exports: {}};

    /*!
     * colorin v0.2.0
      */

    (function (module, exports) {
    (function (global, factory) {
        factory(exports) ;
    }(commonjsGlobal, function (exports) {
        let canvas;
        const OPTIONS = {
            width: 100,
            height: 10
        };

        function getCanvas() {
            if (!canvas) {
                const { width, height } = OPTIONS;
                if (OffscreenCanvas) {
                    canvas = new OffscreenCanvas(width, height);
                } else {
                    canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                }
            }
            return canvas;
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
                const ctx = canvas.getContext('2d');
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

        exports.ColorIn = ColorIn;

        Object.defineProperty(exports, '__esModule', { value: true });

    }));

    }(colorin, colorin.exports));

    typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;

    /**
     * DOM utilities used internally.
     * Learned a lot from Leaflet.DomUtil
     * @class
     * @category core
     * @name DomUtil
     */

    const first = (props) => {
        return props[0];
    };

    /**
     * From Leaflet.DomUtil
     * Goes through the array of style names and returns the first name
     * that is a valid style name for an element. If no such name is found,
     * it returns false. Useful for vendor-prefixed styles like `transform`.
     * @param  {String[]} props
     * @return {Boolean}
     * @memberOf DomUtil
     * @private
     */
    const testProp = IS_NODE ? first : (props) => {

        const style = (document.documentElement && document.documentElement.style) || {};

        for (let i = 0; i < props.length; i++) {
            if (props[i] in style) {
                return props[i];
            }
        }
        return false;
    };

    // prefix style property names

    /**
     * Vendor-prefixed fransform style name (e.g. `'webkitTransform'` for WebKit).
     * @property {String} TRANSFORM
     * @memberOf DomUtil
     * @type {String}
     */
    testProp(
        ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

    /**
     * Vendor-prefixed tfransform-origin name (e.g. `'webkitTransformOrigin'` for WebKit).
     * @property {String} TRANSFORMORIGIN
     * @memberOf DomUtil
     * @type {String}
     */
    testProp(
        ['transformOrigin', 'WebkitTransformOrigin', 'OTransformOrigin', 'MozTransformOrigin', 'msTransformOrigin']);

    /**
     * Vendor-prefixed transition name (e.g. `'WebkitTransition'` for WebKit).
     * @property {String} TRANSITION
     * @memberOf DomUtil
     * @type {String}
     */
    testProp(
        ['transition', 'WebkitTransition', 'OTransition', 'MozTransition', 'msTransition']);

    /**
     * Vendor-prefixed filter name (e.g. `'WebkitFilter'` for WebKit).
     * @property {String} FILTER
     * @memberOf DomUtil
     * @type {String}
     */
    testProp(
        ['filter', 'WebkitFilter', 'OFilter', 'MozFilter', 'msFilter']);

    /**
     * Stop browser event propagation
     * @param  {Event} e - browser event.
     * @memberOf DomUtil
     */
    function stopPropagation(e) {
        e._cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        return this;
    }

    /**
     * This provides methods used for event handling. It's a mixin and not meant to be used directly.
     * @mixin Eventable
     */

    function generateWrapKey(eventType) {
        return 'Z__' + eventType;
    }

    const Eventable = Base =>

        class extends Base {
            /**
             * Register a handler function to be called whenever this event is fired.
             *
             * @param {String} eventsOn                  - event types to register, seperated by space if more than one.
             * @param {Function} handler                 - handler function to be called
             * @param {Object} [context=null]            - the context of the handler
             * @return {Any} this
             * @function Eventable.on
             * @example
             * foo.on('mousedown mousemove mouseup', onMouseEvent, foo);
             */
            on(eventsOn, handler, context) {
                if (!eventsOn) {
                    return this;
                }
                if (!isString(eventsOn)) {
                    return this._switch('on', eventsOn, handler);
                }
                if (!handler) {
                    return this;
                }
                if (!this._eventMap) {
                    this._eventMap = {};
                }
                const eventTypes = eventsOn.toLowerCase().split(' ');
                let evtType;
                if (!context) {
                    context = this;
                }
                //检测handler是否被监听过
                const isAdd = isNumber(handler._id);
                handler._id = UID();
                let handlerChain;
                for (let ii = 0, ll = eventTypes.length; ii < ll; ii++) {
                    evtType = eventTypes[ii];
                    const wrapKey = generateWrapKey(evtType);
                    if (handler[wrapKey]) {
                        handler[wrapKey]._id = handler._id;
                    }
                    handlerChain = this._eventMap[evtType];
                    if (!handlerChain) {
                        handlerChain = [];
                        this._eventMap[evtType] = handlerChain;
                    }
                    //没有监听过的handler直接入列
                    if (!isAdd) {
                        handlerChain.push({
                            handler: handler,
                            context: context
                        });
                        continue;
                    }
                    const l = handlerChain.length;
                    if (l > 0) {
                        for (let i = 0; i < l; i++) {
                            if (handler === handlerChain[i].handler && handlerChain[i].context === context) {
                                {
                                    console.warn(this, `find '${eventsOn}' handler:`, handler, ' The old listener function will be removed');
                                }
                                return this;
                            }
                        }
                    }
                    handlerChain.push({
                        handler: handler,
                        context: context
                    });
                }
                return this;
            }

            /**
             * Alias for [on]{@link Eventable.on}
             *
             * @param {String} eventTypes     - event types to register, seperated by space if more than one.
             * @param {Function} handler                 - handler function to be called
             * @param {Object} [context=null]            - the context of the handler
             * @return {} this
             * @function Eventable.addEventListener
             */
            addEventListener() {
                return this.on.apply(this, arguments);
            }

            /**
             * Same as on, except the listener will only get fired once and then removed.
             *
             * @param {String} eventTypes                - event types to register, seperated by space if more than one.
             * @param {Function} handler                 - listener handler
             * @param {Object} [context=null]            - the context of the handler
             * @return {} this
             * @example
             * foo.once('mousedown mousemove mouseup', onMouseEvent, foo);
             * @function Eventable.once
             */
            once(eventTypes, handler, context) {
                if (!isString(eventTypes)) {
                    const once = {};
                    for (const p in eventTypes) {
                        if (eventTypes.hasOwnProperty(p)) {
                            once[p] = this._wrapOnceHandler(p, eventTypes[p], context);
                        }
                    }
                    return this._switch('on', once);
                }
                const evetTypes = eventTypes.split(' ');
                for (let i = 0, l = evetTypes.length; i < l; i++) {
                    this.on(evetTypes[i], this._wrapOnceHandler(evetTypes[i], handler, context));
                }
                return this;
            }

            /**
             * Unregister the event handler for the specified event types.
             *
             * @param {String} eventsOff                - event types to unregister, seperated by space if more than one.
             * @param {Function} handler                - listener handler
             * @param {Object} [context=null]           - the context of the handler
             * @return {} this
             * @example
             * foo.off('mousedown mousemove mouseup', onMouseEvent, foo);
             * @function Eventable.off
             */
            off(eventsOff, handler, context) {
                if (!this._eventMap || !eventsOff) {
                    return this;
                }
                if (!isString(eventsOff)) {
                    return this._switch('off', eventsOff, handler);
                }
                if (!handler) {
                    return this;
                }
                //没有监听过的handler直接忽略
                if (!isNumber(handler._id)) {
                    return this;
                }
                const eventTypes = eventsOff.split(' ');
                let eventType, listeners, wrapKey;
                if (!context) {
                    context = this;
                }
                for (let j = 0, jl = eventTypes.length; j < jl; j++) {
                    eventType = eventTypes[j].toLowerCase();
                    wrapKey = generateWrapKey(eventType);
                    listeners = this._eventMap[eventType];
                    if (!listeners) {
                        continue;
                    }
                    for (let i = listeners.length - 1; i >= 0; i--) {
                        const listener = listeners[i];
                        if ((handler === listener.handler || handler === listener.handler[wrapKey]) && listener.context === context) {
                            delete listener.handler[wrapKey];
                            listeners.splice(i, 1);
                        }
                    }
                    if (!listeners.length) {
                        delete this._eventMap[eventType];
                    }
                }
                return this;
            }

            /**
             * Alias for [off]{@link Eventable.off}
             *
             * @param {String} eventTypes    - event types to unregister, seperated by space if more than one.
             * @param {Function} handler                - listener handler
             * @param {Object} [context=null]           - the context of the handler
             * @return {} this
             * @function Eventable.removeEventListener
             */
            removeEventListener() {
                return this.off.apply(this, arguments);
            }

            /**
             * Returns listener's count registered for the event type.
             *
             * @param {String} eventType        - an event type
             * @param {Function} [hanlder=null] - listener function
             * @param {Object} [context=null]   - the context of the handler
             * @return {Number}
             * @function Eventable.listens
             */
            listens(eventType, handler, context) {
                if (!this._eventMap || !isString(eventType)) {
                    return 0;
                }
                const handlerChain = this._eventMap[eventType.toLowerCase()];
                if (!handlerChain || !handlerChain.length) {
                    return 0;
                }
                if (!handler) {
                    return handlerChain.length;
                }
                for (let i = 0, len = handlerChain.length; i < len; i++) {
                    if (handler === handlerChain[i].handler &&
                        (isNil(context) || handlerChain[i].context === context)) {
                        return 1;
                    }
                }
                return 0;
            }

            /**
             * Get all the listening event types
             *
             * @returns {String[]} events
             * @function Eventable.getListeningEvents
             */
            getListeningEvents() {
                if (!this._eventMap) {
                    return [];
                }
                return Object.keys(this._eventMap);
            }

            /**
             * Copy all the event listener to the target object
             * @param {Object} target - target object to copy to.
             * @return {} this
             * @function Eventable.copyEventListeners
             */
            copyEventListeners(target) {
                const eventMap = target._eventMap;
                if (!eventMap) {
                    return this;
                }
                let handlerChain;
                for (const eventType in eventMap) {
                    handlerChain = eventMap[eventType];
                    for (let i = 0, len = handlerChain.length; i < len; i++) {
                        this.on(eventType, handlerChain[i].handler, handlerChain[i].context);
                    }
                }
                return this;
            }

            /**
             * Fire an event, causing all handlers for that event name to run.
             *
             * @param  {String} eventType - an event type to fire
             * @param  {Object} param     - parameters for the listener function.
             * @return {} this
             * @function Eventable.fire
             */
            fire() {
                if (this._eventParent) {
                    return this._eventParent.fire.apply(this._eventParent, arguments);
                }
                return this._fire.apply(this, arguments);
            }

            _wrapOnceHandler(evtType, handler, context) {
                // const me = this;
                const key = generateWrapKey(evtType);
                let called = false;
                const fn = function onceHandler() {
                    if (called) {
                        return;
                    }
                    delete fn[key];
                    called = true;
                    if (context) {
                        handler.apply(context, arguments);
                    } else {
                        handler.apply(this, arguments);
                    }
                    onceHandler._called = true;
                    // me.off(evtType, onceHandler, this);
                };
                fn[key] = handler;
                return fn;
            }

            _switch(to, eventKeys, context) {
                for (const p in eventKeys) {
                    if (eventKeys.hasOwnProperty(p)) {
                        this[to](p, eventKeys[p], context);
                    }
                }
                return this;
            }

            _clearListeners(eventType) {
                if (!this._eventMap || !isString(eventType)) {
                    return;
                }
                const handlerChain = this._eventMap[eventType.toLowerCase()];
                if (!handlerChain) {
                    return;
                }
                this._eventMap[eventType] = null;
            }

            _clearAllListeners() {
                this._eventMap = null;
            }

            /**
             * Set a event parent to handle all the events
             * @param {Any} parent - event parent
             * @return {Any} this
             * @private
             * @function Eventable._setEventParent
             */
            _setEventParent(parent) {
                this._eventParent = parent;
                return this;
            }

            _setEventTarget(target) {
                this._eventTarget = target;
                return this;
            }

            _fire(eventType, param) {
                if (!this._eventMap) {
                    return this;
                }
                eventType = eventType.toLowerCase();
                const handlerChain = this._eventMap[eventType];
                if (!handlerChain) {
                    return this;
                }
                if (!param) {
                    param = {};
                }
                param['type'] = eventType;
                param['target'] = this._eventTarget || this;
                //in case of deleting a listener in a execution, copy the handlerChain to execute.
                const queue = handlerChain.slice(0);
                let context, bubble, passed;
                for (let i = 0, len = queue.length; i < len; i++) {
                    if (!queue[i]) {
                        continue;
                    }
                    const handler = queue[i].handler;
                    if (handler._called) {
                        continue;
                    }
                    context = queue[i].context;
                    bubble = true;
                    passed = extend({}, param);
                    if (context) {
                        bubble = queue[i].handler.call(context, passed);
                    } else {
                        bubble = queue[i].handler(passed);
                    }
                    //stops the event propagation if the handler returns false.
                    if (bubble === false) {
                        if (param['domEvent']) {
                            stopPropagation(param['domEvent']);
                        }
                    }
                }
                const eventQueue = this._eventMap[eventType];
                if (eventQueue) {
                    const queueExcludeOnce = [];
                    for (let i = 0, len = eventQueue.length; i < len; i++) {
                        const handler = eventQueue[i].handler;
                        if (!handler._called) {
                            queueExcludeOnce.push(eventQueue[i]);
                        }
                    }
                    this._eventMap[eventType] = queueExcludeOnce;
                }
                return this;
            }
        };

    /**
     * Base class for all the interaction handlers
     * @category handler
     * @abstract
     * @protected
     */
    class Handler {
        constructor(target) {
            this.target = target;
        }

        /**
         * Enables the handler
         * @return {Handler} this
         */
        enable() {
            if (this._enabled) {
                return this;
            }
            this._enabled = true;
            this.addHooks();
            return this;
        }

        /**
         * Disablesthe handler
         * @return {Handler} this
         */
        disable() {
            if (!this._enabled) {
                return this;
            }
            this._enabled = false;
            this.removeHooks();
            return this;
        }

        /**
         * Returns true if the handler is enabled.
         * @return {Boolean}
         */
        enabled() {
            return !!this._enabled;
        }

        remove() {
            this.disable();
            delete this.target;
            delete this.dom;
        }
    }


    var Handler$1 = Eventable(Handler);

    /**
     * This library uses ES2015 class system. <br />
     * Class is the root class of class hierachy. <br />
     * It provides utility methods to make it easier to manage configration options, merge mixins and add init hooks.
     * @example
     * var defaultOptions = {
     *     'foo' : 'bar'
     * };
     * class Foo extends maptalks.Class {
     *     constructor(id, options) {
     *         super(options);
     *         this.setId(id);
     *     }
     *
     *     setId(id) {
     *         this.id = id;
     *     }
     *
     *     whenCreated() {
     *         // .....
     *     }
     * }
     *
     * Foo.mergeOptions(defaultOptions);
     *
     * Foo.addInitHook('whenCreated');
     * @category core
     * @abstract
     */
    class Class {

        /**
         * Create an object, set options if given and call all the init hooks.<br />
         * Options is where the object manages its configuration. Options passed to the object will be merged with parent's instead of overriding it.
         *
         * @param  {Object} options - options to set
         */
        constructor(options) {
            if (!this || !this.setOptions) {
                throw new Error('Class instance is being created without "new" operator.');
            }
            this.setOptions(options);
            this.callInitHooks();
            this._isUpdatingOptions = false;
        }

        proxyOptions() {
            if (!Browser$1.proxy) {
                return this;
            }
            if (this.options.isExtensible) {
                return this;
            }
            this.options = new Proxy(this.options, {
                set: (target, key, value) => {
                    if (target[key] === value) {
                        return true;
                    }
                    target[key] = value;
                    if (this._isUpdatingOptions) {
                        return true;
                    }
                    const opts = {};
                    opts[key] = value;
                    this.config(opts);
                    return true;
                }
            });
            return this;
        }

        /**
         * Visit and call all the init hooks defined on Class and its parents.
         * @return {Class} this
         */
        callInitHooks() {
            const proto = Object.getPrototypeOf(this);
            this._visitInitHooks(proto);
            return this;
        }

        /**
         * Merges options with the default options of the object.
         * @param {Object} options - options to set
         * @return {Class} this
         */
        setOptions(options) {
            if (!this.hasOwnProperty('options')) {
                this.options = this.options ? Object.create(this.options) : {};
            }
            if (!options) {
                return this;
            }
            for (const i in options) {
                this.options[i] = options[i];
            }
            return this;
        }

        /**
         * 1. Return object's options if no parameter is provided. <br/>
         *
         * 2. update an option and enable/disable the handler if a handler with the same name existed.
         * @example
         * // Get marker's options;
         * var options = marker.config();
         * // Set map's option "draggable" to false and disable map's draggable handler.
         * map.config('draggable', false);
         * // You can update more than one options like this:
         * map.config({
         *     'scrollWheelZoom' : false,
         *     'doubleClickZoom' : false
         * });
         * @param  {Object} conf - config to update
         * @return {Class} this
         */
        config(conf) {
            this._isUpdatingOptions = true;
            if (!conf) {
                const config = {};
                for (const p in this.options) {
                    if (this.options.hasOwnProperty(p)) {
                        config[p] = this.options[p];
                    }
                }
                this._isUpdatingOptions = false;
                return config;
            } else {
                if (arguments.length === 2) {
                    const t = {};
                    t[conf] = arguments[1];
                    conf = t;
                }
                for (const i in conf) {
                    this.options[i] = conf[i];
                    // enable/disable handler
                    if (this[i] && (this[i] instanceof Handler$1)) {
                        if (conf[i]) {
                            this[i].enable();
                        } else {
                            this[i].disable();
                        }
                    }
                }
                // callback when set config
                this.onConfig(conf);
                this._isUpdatingOptions = false;
            }
            return this;
        }

        /**
         * Default callback when config is called
         */
        onConfig(/*conf*/) {

        }

        _visitInitHooks(proto) {
            if (this._initHooksCalled) {
                return;
            }
            const parentProto = Object.getPrototypeOf(proto);
            if (parentProto._visitInitHooks) {
                parentProto._visitInitHooks.call(this, parentProto);
            }
            this._initHooksCalled = true;
            const hooks = proto._initHooks;
            if (hooks && hooks !== parentProto._initHooks) {
                for (let i = 0; i < hooks.length; i++) {
                    hooks[i].call(this);
                }
            }
        }

        /**
         * Add an init hook, which will be called when the object is initiated. <br>
         * It is useful in plugin developing to do things when creating objects without changing class's constructor.
         * @param {String|Function} fn - a hook function or name of the hook function
         * @param {Any[]} args         - arguments for the init hook function
         */
        static addInitHook(fn, ...args) {
            const init = typeof fn === 'function' ? fn : function () {
                this[fn].apply(this, args);
            };
            const proto = this.prototype;
            const parentProto = Object.getPrototypeOf(proto);
            if (!proto._initHooks || proto._initHooks === parentProto._initHooks) {
                proto._initHooks = [];
            }
            proto._initHooks.push(init);
            return this;
        }

        /**
         * Mixin the specified objects into the class as prototype properties or methods.
         * @param  {...Object} sources - objects to mixin
         */
        static include(...sources) {
            for (let i = 0; i < sources.length; i++) {
                extend(this.prototype, sources[i]);
            }
            return this;
        }

        /**
         * Mixin options with the class's default options. <br />
         * @param  {Object} options - options to merge.
         */
        static mergeOptions(options) {
            const proto = this.prototype;
            const parentProto = Object.getPrototypeOf(proto);
            if (!proto.options || proto.options === parentProto.options) {
                proto.options = proto.options ? Object.create(proto.options) : {};
            }
            extend(proto.options, options);
            return this;
        }
    }

    var getRhumbLineBearing$1 = {};

    var getLatitude$1 = {};

    var constants = {};

    Object.defineProperty(constants,"__esModule",{value:true});constants.areaConversion=constants.timeConversion=constants.distanceConversion=constants.altitudeKeys=constants.latitudeKeys=constants.longitudeKeys=constants.MAXLON=constants.MINLON=constants.MAXLAT=constants.MINLAT=constants.earthRadius=constants.sexagesimalPattern=void 0;var sexagesimalPattern=/^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,}))?)['′]\s*(([0-9]{1,3}(\.([0-9]{1,}))?)["″]\s*)?([NEOSW]?)$/;constants.sexagesimalPattern=sexagesimalPattern;var earthRadius=6378137;constants.earthRadius=earthRadius;var MINLAT=-90;constants.MINLAT=MINLAT;var MAXLAT=90;constants.MAXLAT=MAXLAT;var MINLON=-180;constants.MINLON=MINLON;var MAXLON=180;constants.MAXLON=MAXLON;var longitudeKeys=["lng","lon","longitude",0];constants.longitudeKeys=longitudeKeys;var latitudeKeys=["lat","latitude",1];constants.latitudeKeys=latitudeKeys;var altitudeKeys=["alt","altitude","elevation","elev",2];constants.altitudeKeys=altitudeKeys;var distanceConversion={m:1,km:0.001,cm:100,mm:1000,mi:1/1609.344,sm:1/1852.216,ft:100/30.48,in:100/2.54,yd:1/0.9144};constants.distanceConversion=distanceConversion;var timeConversion={m:60,h:3600,d:86400};constants.timeConversion=timeConversion;var areaConversion={m2:1,km2:0.000001,ha:0.0001,a:0.01,ft2:10.763911,yd2:1.19599,in2:1550.0031};constants.areaConversion=areaConversion;areaConversion.sqm=areaConversion.m2;areaConversion.sqkm=areaConversion.km2;areaConversion.sqft=areaConversion.ft2;areaConversion.sqyd=areaConversion.yd2;areaConversion.sqin=areaConversion.in2;

    var getCoordinateKey$1 = {};

    Object.defineProperty(getCoordinateKey$1,"__esModule",{value:true});getCoordinateKey$1.default=void 0;var getCoordinateKey=function getCoordinateKey(point,keysToLookup){return keysToLookup.reduce(function(foundKey,key){if(typeof point==="undefined"||point===null){throw new Error("'".concat(point,"' is no valid coordinate."))}if(Object.prototype.hasOwnProperty.call(point,key)&&typeof key!=="undefined"&&typeof foundKey==="undefined"){foundKey=key;return key}return foundKey},undefined)};var _default$d=getCoordinateKey;getCoordinateKey$1.default=_default$d;

    var toDecimal$1 = {};

    var isDecimal$1 = {};

    Object.defineProperty(isDecimal$1,"__esModule",{value:true});isDecimal$1.default=void 0;var isDecimal=function isDecimal(value){var checkedValue=value.toString().trim();if(isNaN(parseFloat(checkedValue))){return false}return parseFloat(checkedValue)===Number(checkedValue)};var _default$c=isDecimal;isDecimal$1.default=_default$c;

    var isSexagesimal$1 = {};

    Object.defineProperty(isSexagesimal$1,"__esModule",{value:true});isSexagesimal$1.default=void 0;var _constants$6=constants;var isSexagesimal=function isSexagesimal(value){return _constants$6.sexagesimalPattern.test(value.toString().trim())};var _default$b=isSexagesimal;isSexagesimal$1.default=_default$b;

    var sexagesimalToDecimal$1 = {};

    Object.defineProperty(sexagesimalToDecimal$1,"__esModule",{value:true});sexagesimalToDecimal$1.default=void 0;var _constants$5=constants;var sexagesimalToDecimal=function sexagesimalToDecimal(sexagesimal){var data=new RegExp(_constants$5.sexagesimalPattern).exec(sexagesimal.toString().trim());if(typeof data==="undefined"||data===null){throw new Error("Given value is not in sexagesimal format")}var min=Number(data[2])/60||0;var sec=Number(data[4])/3600||0;var decimal=parseFloat(data[1])+min+sec;return ["S","W"].includes(data[7])?-decimal:decimal};var _default$a=sexagesimalToDecimal;sexagesimalToDecimal$1.default=_default$a;

    var isValidCoordinate$1 = {};

    var getCoordinateKeys$1 = {};

    Object.defineProperty(getCoordinateKeys$1,"__esModule",{value:true});getCoordinateKeys$1.default=void 0;var _constants$4=constants;var _getCoordinateKey$2=_interopRequireDefault$7(getCoordinateKey$1);function _interopRequireDefault$7(obj){return obj&&obj.__esModule?obj:{default:obj}}function ownKeys$1(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols);}return keys}function _objectSpread$1(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys$1(Object(source),true).forEach(function(key){_defineProperty$1(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else {ownKeys$1(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target}function _defineProperty$1(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}var getCoordinateKeys=function getCoordinateKeys(point){var keysToLookup=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{longitude:_constants$4.longitudeKeys,latitude:_constants$4.latitudeKeys,altitude:_constants$4.altitudeKeys};var longitude=(0, _getCoordinateKey$2.default)(point,keysToLookup.longitude);var latitude=(0, _getCoordinateKey$2.default)(point,keysToLookup.latitude);var altitude=(0, _getCoordinateKey$2.default)(point,keysToLookup.altitude);return _objectSpread$1({latitude:latitude,longitude:longitude},altitude?{altitude:altitude}:{})};var _default$9=getCoordinateKeys;getCoordinateKeys$1.default=_default$9;

    var isValidLatitude$1 = {};

    Object.defineProperty(isValidLatitude$1,"__esModule",{value:true});isValidLatitude$1.default=void 0;var _isDecimal$2=_interopRequireDefault$6(isDecimal$1);var _isSexagesimal$2=_interopRequireDefault$6(isSexagesimal$1);var _sexagesimalToDecimal$2=_interopRequireDefault$6(sexagesimalToDecimal$1);var _constants$3=constants;function _interopRequireDefault$6(obj){return obj&&obj.__esModule?obj:{default:obj}}var isValidLatitude=function isValidLatitude(value){if((0, _isDecimal$2.default)(value)){if(parseFloat(value)>_constants$3.MAXLAT||value<_constants$3.MINLAT){return false}return true}if((0, _isSexagesimal$2.default)(value)){return isValidLatitude((0, _sexagesimalToDecimal$2.default)(value))}return false};var _default$8=isValidLatitude;isValidLatitude$1.default=_default$8;

    var isValidLongitude$1 = {};

    Object.defineProperty(isValidLongitude$1,"__esModule",{value:true});isValidLongitude$1.default=void 0;var _isDecimal$1=_interopRequireDefault$5(isDecimal$1);var _isSexagesimal$1=_interopRequireDefault$5(isSexagesimal$1);var _sexagesimalToDecimal$1=_interopRequireDefault$5(sexagesimalToDecimal$1);var _constants$2=constants;function _interopRequireDefault$5(obj){return obj&&obj.__esModule?obj:{default:obj}}var isValidLongitude=function isValidLongitude(value){if((0, _isDecimal$1.default)(value)){if(parseFloat(value)>_constants$2.MAXLON||value<_constants$2.MINLON){return false}return true}if((0, _isSexagesimal$1.default)(value)){return isValidLongitude((0, _sexagesimalToDecimal$1.default)(value))}return false};var _default$7=isValidLongitude;isValidLongitude$1.default=_default$7;

    Object.defineProperty(isValidCoordinate$1,"__esModule",{value:true});isValidCoordinate$1.default=void 0;var _getCoordinateKeys2=_interopRequireDefault$4(getCoordinateKeys$1);var _isValidLatitude=_interopRequireDefault$4(isValidLatitude$1);var _isValidLongitude=_interopRequireDefault$4(isValidLongitude$1);function _interopRequireDefault$4(obj){return obj&&obj.__esModule?obj:{default:obj}}var isValidCoordinate=function isValidCoordinate(point){var _getCoordinateKeys=(0, _getCoordinateKeys2.default)(point),latitude=_getCoordinateKeys.latitude,longitude=_getCoordinateKeys.longitude;if(Array.isArray(point)&&point.length>=2){return (0, _isValidLongitude.default)(point[0])&&(0, _isValidLatitude.default)(point[1])}if(typeof latitude==="undefined"||typeof longitude==="undefined"){return false}var lon=point[longitude];var lat=point[latitude];if(typeof lat==="undefined"||typeof lon==="undefined"){return false}if((0, _isValidLatitude.default)(lat)===false||(0, _isValidLongitude.default)(lon)===false){return false}return true};var _default$6=isValidCoordinate;isValidCoordinate$1.default=_default$6;

    Object.defineProperty(toDecimal$1,"__esModule",{value:true});toDecimal$1.default=void 0;var _isDecimal=_interopRequireDefault$3(isDecimal$1);var _isSexagesimal=_interopRequireDefault$3(isSexagesimal$1);var _sexagesimalToDecimal=_interopRequireDefault$3(sexagesimalToDecimal$1);var _isValidCoordinate=_interopRequireDefault$3(isValidCoordinate$1);var _getCoordinateKeys=_interopRequireDefault$3(getCoordinateKeys$1);function _interopRequireDefault$3(obj){return obj&&obj.__esModule?obj:{default:obj}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});keys.push.apply(keys,symbols);}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else {ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else {obj[key]=value;}return obj}var toDecimal=function toDecimal(value){if((0, _isDecimal.default)(value)){return Number(value)}if((0, _isSexagesimal.default)(value)){return (0, _sexagesimalToDecimal.default)(value)}if((0, _isValidCoordinate.default)(value)){var keys=(0, _getCoordinateKeys.default)(value);if(Array.isArray(value)){return value.map(function(v,index){return [0,1].includes(index)?toDecimal(v):v})}return _objectSpread(_objectSpread(_objectSpread({},value),keys.latitude&&_defineProperty({},keys.latitude,toDecimal(value[keys.latitude]))),keys.longitude&&_defineProperty({},keys.longitude,toDecimal(value[keys.longitude])))}if(Array.isArray(value)){return value.map(function(point){return (0, _isValidCoordinate.default)(point)?toDecimal(point):point})}return value};var _default$5=toDecimal;toDecimal$1.default=_default$5;

    Object.defineProperty(getLatitude$1,"__esModule",{value:true});getLatitude$1.default=void 0;var _constants$1=constants;var _getCoordinateKey$1=_interopRequireDefault$2(getCoordinateKey$1);var _toDecimal$1=_interopRequireDefault$2(toDecimal$1);function _interopRequireDefault$2(obj){return obj&&obj.__esModule?obj:{default:obj}}var getLatitude=function getLatitude(point,raw){var latKey=(0, _getCoordinateKey$1.default)(point,_constants$1.latitudeKeys);if(typeof latKey==="undefined"||latKey===null){return}var value=point[latKey];return raw===true?value:(0, _toDecimal$1.default)(value)};var _default$4=getLatitude;getLatitude$1.default=_default$4;

    var getLongitude$1 = {};

    Object.defineProperty(getLongitude$1,"__esModule",{value:true});getLongitude$1.default=void 0;var _constants=constants;var _getCoordinateKey=_interopRequireDefault$1(getCoordinateKey$1);var _toDecimal=_interopRequireDefault$1(toDecimal$1);function _interopRequireDefault$1(obj){return obj&&obj.__esModule?obj:{default:obj}}var getLongitude=function getLongitude(point,raw){var latKey=(0, _getCoordinateKey.default)(point,_constants.longitudeKeys);if(typeof latKey==="undefined"||latKey===null){return}var value=point[latKey];return raw===true?value:(0, _toDecimal.default)(value)};var _default$3=getLongitude;getLongitude$1.default=_default$3;

    var toRad$1 = {};

    Object.defineProperty(toRad$1,"__esModule",{value:true});toRad$1.default=void 0;var toRad=function toRad(value){return value*Math.PI/180};var _default$2=toRad;toRad$1.default=_default$2;

    var toDeg$1 = {};

    Object.defineProperty(toDeg$1,"__esModule",{value:true});toDeg$1.default=void 0;var toDeg=function toDeg(value){return value*180/Math.PI};var _default$1=toDeg;toDeg$1.default=_default$1;

    Object.defineProperty(getRhumbLineBearing$1,"__esModule",{value:true});var default_1 = getRhumbLineBearing$1.default=void 0;var _getLatitude=_interopRequireDefault(getLatitude$1);var _getLongitude=_interopRequireDefault(getLongitude$1);var _toRad=_interopRequireDefault(toRad$1);var _toDeg=_interopRequireDefault(toDeg$1);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var getRhumbLineBearing=function getRhumbLineBearing(origin,dest){var diffLon=(0, _toRad.default)((0, _getLongitude.default)(dest))-(0, _toRad.default)((0, _getLongitude.default)(origin));var diffPhi=Math.log(Math.tan((0, _toRad.default)((0, _getLatitude.default)(dest))/2+Math.PI/4)/Math.tan((0, _toRad.default)((0, _getLatitude.default)(origin))/2+Math.PI/4));if(Math.abs(diffLon)>Math.PI){if(diffLon>0){diffLon=(Math.PI*2-diffLon)*-1;}else {diffLon=Math.PI*2+diffLon;}}return ((0, _toDeg.default)(Math.atan2(diffLon,diffPhi))+360)%360};var _default=getRhumbLineBearing;default_1 = getRhumbLineBearing$1.default=_default;

    // import getDistance from 'geolib/es/getDistance';
    const isArray = Array.isArray;
    const pi = Math.PI / 180;
    const R = 6378137;
    function toRadian(d) {
        return d * pi;
    }
    //from maptalks.js https://github.com/maptalks/maptalks.js/blob/7ad5d423bb3ffb6afad582da7d18f6e9e5bee041/src/geo/measurer/Sphere.js#L18
    function measureLenBetween(c1, c2) {
        if (!c1 || !c2) {
            return 0;
        }
        let b = toRadian(c1[1]);
        const d = toRadian(c2[1]), e = b - d, f = toRadian(c1[0]) - toRadian(c2[0]);
        b = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(e / 2), 2) + Math.cos(b) * Math.cos(d) * Math.pow(Math.sin(f / 2), 2)));
        b *= R;
        return b;
    }
    //distance for Cartesian
    function measureLenBetweenOfCartesian(c1, c2) {
        const dx = c2[0] - c1[0], dy = c2[1] - c1[1];
        return Math.sqrt(dx * dx + dy * dy);
    }
    function coordinateEqual(c1, c2) {
        const x1 = c1[0], y1 = c1[1], z1 = c1[2];
        const x2 = c2[0], y2 = c2[1], z2 = c2[2];
        return x1 === x2 && y1 === y2 && z1 === z2;
    }
    function calDistance(c1, c2) {
        const d = measureLenBetween(c1, c2);
        const dz = c2[2] - c1[2];
        if (dz === 0) {
            return d;
        }
        return Math.sqrt(d * d + dz * dz);
    }
    function calDistanceOfCartesian(c1, c2) {
        const d = measureLenBetweenOfCartesian(c1, c2);
        const dz = c2[2] - c1[2];
        if (dz === 0) {
            return d;
        }
        return Math.sqrt(d * d + dz * dz);
    }
    function getCoordinateByPercent(c1, c2, percent) {
        const x1 = c1[0], y1 = c1[1], z1 = c1[2];
        const x2 = c2[0], y2 = c2[1], z2 = c2[2];
        const dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
        return [x1 + dx * percent, y1 + dy * percent, z1 + dz * percent];
    }
    function getRotationZ(c1, c2, routePlayer) {
        if (coordinateEqual(c1, c2)) {
            return routePlayer.tempRotationZ;
        }
        const options = routePlayer.options;
        if (options.isCartesian) {
            const dx = c2[0] - c1[0], dy = c2[1] - c1[1];
            const rad = Math.atan2(dy, dx);
            const rotationZ = rad / Math.PI * 180 - 90;
            routePlayer.tempRotationZ = rotationZ;
            return rotationZ;
        }
        const bearing = default_1(c1, c2);
        const rotationZ = -bearing;
        routePlayer.tempRotationZ = rotationZ;
        return rotationZ;
    }
    function getRotationX(c1, c2, routePlayer) {
        if (coordinateEqual(c1, c2)) {
            return routePlayer.tempRotationX;
        }
        const z1 = c1[2], z2 = c2[2];
        const dz = z2 - z1;
        if (dz === 0) {
            return routePlayer.tempRotationX;
        }
        const options = routePlayer.options;
        let distance;
        if (options.isCartesian) {
            distance = measureLenBetweenOfCartesian(c1, c2);
        }
        else {
            distance = measureLenBetween(c1, c2);
        }
        const rad = Math.atan2(dz, distance);
        const value = -rad / Math.PI * 180;
        if (Math.abs(value) === 90) {
            if (routePlayer.options.debug) {
                console.warn('cal rotationX error:', c1, c2);
                console.warn('dz:', dz);
                console.warn('dx', distance);
            }
            return routePlayer.tempRotationX;
        }
        routePlayer.tempRotationX = value;
        return value;
    }
    function getDistanceFunc(options) {
        if (options.isCartesian) {
            return calDistanceOfCartesian;
        }
        //other,if need
        return calDistance;
    }
    function formatRouteData(data, options) {
        options = extend({ duration: 0, coordinateKey: 'coordinate', timeKey: 'time', unitTime: 1, isCartesian: false }, options);
        if (!isArray(data)) {
            console.error('data is not array ', data);
            return [];
        }
        if (data.length < 2) {
            console.error('data.length should >1 ', data);
            return [];
        }
        let { duration, coordinateKey, timeKey, unitTime } = options;
        duration = duration || 0;
        duration = Math.max(0, duration);
        unitTime = Math.max(0, unitTime);
        const len = data.length;
        let dirty = false;
        let tempCoordinate, totalDistance = 0;
        const result = [];
        for (let i = 0; i < len; i++) {
            let item = data[i];
            if (!item) {
                console.error('has dirty data item:', item);
                return [];
            }
            if (isArray(item)) {
                const itemlen = item.length;
                if (itemlen < 2) {
                    console.error('has dirty data item:', item);
                    return [];
                }
                if (itemlen === 2) {
                    item = { coordinate: item };
                }
                if (itemlen === 3) {
                    const [x, y, z] = item;
                    // has time,no altitude
                    if (Math.abs(z) > 100000) {
                        const coordinate = [x, y, 0];
                        const time = z;
                        item = { coordinate, time };
                    }
                    else {
                        item = { coordinate: item };
                    }
                }
                if (itemlen === 4) {
                    const [x, y, z, t] = item;
                    // has time
                    if (isNumber(t)) {
                        const coordinate = [x, y, z];
                        const time = t;
                        item = { coordinate, time };
                    }
                    else {
                        // no altitude,has properties
                        const coordinate = [x, y, 0];
                        const time = z;
                        item = extend({ coordinate, time }, t);
                    }
                }
                if (itemlen === 5) {
                    const [x, y, z, t, p] = item;
                    const coordinate = [x, y, z];
                    const time = t;
                    item = extend({ coordinate, time }, p);
                }
            }
            if (!isObject(item)) {
                console.error('has dirty data item:', item);
                return [];
            }
            // is Coordinate Class
            if (item.toArray) {
                item = { coordinate: item.toArray() };
            }
            const obj = item;
            if (!obj.coordinate) {
                obj.coordinate = item[coordinateKey];
            }
            const { coordinate } = obj;
            if (!coordinate || !isArray(coordinate)) {
                console.error('coordinate is error:', obj);
                dirty = true;
            }
            if (dirty) {
                return [];
            }
            coordinate[2] = coordinate[2] || 0;
            const distanceFunc = getDistanceFunc(options);
            if (i > 0) {
                const distance = totalDistance + distanceFunc(tempCoordinate, coordinate);
                obj._distance = distance;
                totalDistance = distance;
            }
            else {
                obj._distance = totalDistance;
            }
            obj._passed = false;
            tempCoordinate = coordinate;
            if (duration <= 0) {
                if (!isNumber(obj[timeKey])) {
                    console.error('time is not number:', obj);
                    return [];
                }
                obj._time = obj[timeKey] * unitTime;
            }
            result.push(obj);
        }
        // auto cal time
        if (duration > 0) {
            const startTime = now();
            for (let i = 0; i < len; i++) {
                const item = result[i];
                const { _distance } = item;
                if (isNumber(_distance) && _distance !== undefined) {
                    item._time = Math.round(_distance / totalDistance * duration) + startTime;
                }
            }
        }
        return result;
    }
    const OPTIONS = {
        speed: 1,
        unitTime: 1,
        debug: false,
        autoPlay: false,
        repeat: false,
        isCartesian: false
    };
    const RoutePlayers = [];
    const EVENT_PLAYING = 'playing';
    const EVENT_PLAYSTART = 'playstart';
    const EVENT_PLAYEND = 'playend';
    const EVENT_VERTEX = 'vertex';
    const EVENT_TIME = 'settime';
    class RoutePlayer extends Eventable(Class) {
        constructor(data, options) {
            super(options);
            this.removed = false;
            this.dirty = false;
            this.removed = false;
            this.id = GUID();
            RoutePlayers.push(this);
            // @ts-ignore
            this.fire('add');
            this.setData(data);
            if (this.options.autoPlay) {
                this.play();
            }
        }
        _init() {
            if (this.isDirty()) {
                return this;
            }
            const { data } = this;
            const len = data.length;
            this.startTime = data[0]._time;
            this.endTime = data[len - 1]._time;
            this.time = this.startTime;
            this.playing = false;
            this.playend = false;
            this.index = -1;
            this.tempRotationX = 0;
            this.tempRotationZ = 0;
            this.coordinate = this.data[0].coordinate;
            for (let i = 0, len = data.length; i < len; i++) {
                data[i]._passed = false;
            }
            return this;
        }
        isDirty() {
            if (this.dirty) {
                console.error(`RoutePlayer(${this.id}) current data is dirty`, this.data);
            }
            return this.dirty;
        }
        isRemoved() {
            return !!this.removed;
        }
        isAvailable() {
            if (this.isDirty()) {
                return false;
            }
            if (this.isRemoved()) {
                console.warn(`RoutePlayer(${this.id}) has removed`);
                return false;
            }
            return true;
        }
        add() {
            const index = RoutePlayers.indexOf(this);
            if (index === -1) {
                RoutePlayers.push(this);
                this.removed = false;
                // @ts-ignore
                this.fire('add');
            }
            return this;
        }
        remove() {
            const index = RoutePlayers.indexOf(this);
            if (index > -1) {
                RoutePlayers.splice(index, 1);
                this.removed = true;
                // @ts-ignore
                this.fire('remove');
            }
            return this;
        }
        dispose() {
            this.remove();
            return this;
        }
        isPlaying() {
            return !!this.playing;
        }
        isPlayend() {
            return !!this.playend;
        }
        _setCurrentCoordinate(coordinate) {
            this.coordinate = coordinate;
            return this;
        }
        _loop(t) {
            if (!this.isAvailable()) {
                return this;
            }
            if (!this.playing || this.playend) {
                return this;
            }
            if (!isNumber(t)) {
                return this;
            }
            if (this.time === this.startTime) {
                const item = this.data[0];
                item._passed = true;
                this._setCurrentCoordinate(item.coordinate);
                const result = this._firePlayStart();
                this.index = 0;
                // @ts-ignore
                this.fire(EVENT_VERTEX, { data: item, index: 0, coordinate: result.coordinate });
                // @ts-ignore
                this.fire(EVENT_PLAYING, result);
            }
            const time = t * this.getSpeed() * 1 / this.getUnitTime();
            this.time += time;
            this._play();
            return this;
        }
        _firePlayStart() {
            const item1 = this.getItem(0), item2 = this.getItem(1);
            if (!item1 || !item2) {
                return null;
            }
            const c1 = item1.coordinate, c2 = item2.coordinate;
            const rotationZ = getRotationZ(c1, c2, this);
            const rotationX = getRotationX(c1, c2, this);
            const result = { coordinate: item1.coordinate, rotationZ, rotationX };
            // @ts-ignore
            this.fire(EVENT_PLAYSTART, result);
            return result;
        }
        _play() {
            if (!this.isAvailable()) {
                return this;
            }
            this.time = Math.min(this.time, this.endTime);
            let tempCoordinate, tempTime;
            const len = this.data.length;
            for (let i = 0; i < len; i++) {
                const item = this.data[i];
                const { _time, coordinate, _passed } = item;
                if (_time === undefined) {
                    continue;
                }
                if (this.time >= _time && !_passed) {
                    item._passed = true;
                    this._setCurrentCoordinate(item.coordinate);
                    if (i === 0) {
                        this._firePlayStart();
                    }
                    let c1, c2;
                    if (!tempCoordinate) {
                        c1 = item.coordinate;
                        c2 = this.data[1].coordinate;
                    }
                    else {
                        c1 = tempCoordinate;
                        c2 = item.coordinate;
                    }
                    const rotationZ = getRotationZ(c1, c2, this);
                    const rotationX = getRotationX(c1, c2, this);
                    this.index = i;
                    // @ts-ignore
                    this.fire(EVENT_VERTEX, { data: item, index: i, coordinate: item.coordinate });
                    // @ts-ignore
                    this.fire(EVENT_PLAYING, { coordinate: item.coordinate, rotationZ, rotationX });
                }
                if (this.time < _time) {
                    const percent = (this.time - tempTime) / (_time - tempTime);
                    const currentCoordinate = getCoordinateByPercent(tempCoordinate, coordinate, percent);
                    this._setCurrentCoordinate(currentCoordinate);
                    const c1 = tempCoordinate, c2 = currentCoordinate;
                    const rotationZ = getRotationZ(c1, c2, this);
                    const rotationX = getRotationX(c1, c2, this);
                    // @ts-ignore
                    this.fire(EVENT_PLAYING, { coordinate: currentCoordinate, rotationZ, rotationX });
                    break;
                }
                tempCoordinate = item.coordinate;
                tempTime = item._time;
            }
            if (this.time === this.endTime && !this.playend) {
                const item = this.data[len - 1];
                this._setCurrentCoordinate(item.coordinate);
                const c1 = this.data[len - 2].coordinate, c2 = item.coordinate;
                const rotationZ = getRotationZ(c1, c2, this);
                const rotationX = getRotationX(c1, c2, this);
                this.playend = true;
                // @ts-ignore
                this.fire(EVENT_PLAYEND, { coordinate: item.coordinate, rotationZ, rotationX });
                if (this.options.repeat) {
                    const playing = this.playing;
                    this.reset();
                    this.playing = playing;
                }
            }
            return this;
        }
        reset() {
            if (!this.isAvailable()) {
                return this;
            }
            this._init();
            // @ts-ignore
            this.fire('reset');
            return this;
        }
        cancel() {
            if (!this.isAvailable()) {
                return this;
            }
            this._init();
            // @ts-ignore
            this.fire('cancel');
            return this;
        }
        play() {
            if (!this.isAvailable()) {
                return this;
            }
            this.playing = true;
            return this;
        }
        pause() {
            if (!this.isAvailable()) {
                return this;
            }
            this.playing = false;
            // @ts-ignore
            this.fire('pause');
            return this;
        }
        finish() {
            if (!this.isAvailable()) {
                return this;
            }
            this.time = this.endTime;
            this._play();
            // @ts-ignore
            this.fire('finish');
            return this;
        }
        replay() {
            if (!this.isAvailable()) {
                return this;
            }
            this.reset();
            this.play();
            return this;
        }
        getSpeed() {
            return this.options.speed;
        }
        setSpeed(speed) {
            if (!this.isAvailable()) {
                return this;
            }
            if (!isNumber(speed) || speed <= 0) {
                console.error('speed value is error:', speed);
                return this;
            }
            this.options.speed = speed;
            return this;
        }
        setIndex(index) {
            if (!this.isAvailable()) {
                return this;
            }
            if (!isNumber(index)) {
                return this;
            }
            index = Math.round(index);
            index = Math.max(0, index);
            index = Math.min(index, this.data.length - 1);
            const item = this.data[index];
            if (!item) {
                console.error('not find item from data,index=', index);
                return this;
            }
            return this.setTime(item._time);
        }
        setTime(time) {
            if (!this.isAvailable()) {
                return this;
            }
            if (!isNumber(time)) {
                return this;
            }
            time = Math.max(this.startTime, time);
            time = Math.min(time, this.endTime);
            this.time = time;
            let index = -1;
            for (let i = 0, len = this.data.length; i < len; i++) {
                const item = this.data[i];
                if (item._time === undefined) {
                    continue;
                }
                if (item._time > time) {
                    item._passed = false;
                    if (index === -1) {
                        index = i;
                    }
                }
            }
            if (index === -1) {
                index = this.data.length - 1;
            }
            if (index !== -1) {
                const item1 = this.data[index - 1], item2 = this.data[index];
                const t1 = item1._time, t2 = item2._time;
                const c1 = item1.coordinate, c2 = item2.coordinate;
                const percent = (this.time - t1) / (t2 - t1);
                const currentCoordinate = getCoordinateByPercent(c1, c2, percent);
                this.index = index - 1;
                // @ts-ignore
                this.fire(EVENT_VERTEX, { data: item1, index: index - 1 });
                // @ts-ignore
                this.fire(EVENT_TIME, { time: this.time, coordinate: currentCoordinate });
            }
            this.playend = false;
            this._play();
            return this;
        }
        setPercent(percent) {
            if (!this.isAvailable()) {
                return this;
            }
            if (!isNumber(percent)) {
                return this;
            }
            percent = Math.max(0, percent);
            percent = Math.min(1, percent);
            const len = this.data.length;
            const totalDistance = this.data[len - 1]._distance || 0;
            const distance = totalDistance * percent;
            let tempTime = this.startTime, tempDistance = 0;
            let flag = false;
            let t = 0;
            for (let i = 0; i < len; i++) {
                const item = this.data[i];
                const { _distance, _time } = item;
                if (_distance === undefined || _time === undefined) {
                    continue;
                }
                if (distance <= _distance && !flag) {
                    const dTime = _time - tempTime;
                    const dDistance = _distance - tempDistance;
                    const p = (distance - tempDistance) / dDistance;
                    t = tempTime + dTime * p;
                    flag = true;
                }
                if (flag) {
                    item._passed = false;
                }
                tempTime = _time;
                tempDistance = _distance;
            }
            if (t > 0) {
                this.setTime(t);
            }
            return this;
        }
        setData(data) {
            if (this.isRemoved()) {
                return this;
            }
            this.dirty = false;
            if (!data || !isArray(data) || data.length < 2) {
                this.dirty = true;
                console.error('data is error:', data);
            }
            const item = data[0];
            if (!item || !item.coordinate || !isNumber(item._time)) {
                this.dirty = true;
                console.error('data is error,please use formatRouteData to format data :', data);
            }
            this.data = data;
            this._init();
            return this;
        }
        getItem(index) {
            if (!isNumber(index) || this.isDirty()) {
                return null;
            }
            index = Math.round(index);
            return this.data[index];
        }
        getCurrentTime() {
            return this.time;
        }
        getStartCoordinate() {
            const dataItem = this.getItem(0);
            if (dataItem) {
                return dataItem.coordinate;
            }
            return null;
        }
        getStartRotation() {
            const c1 = this.data[0].coordinate;
            const c2 = this.data[1].coordinate;
            return {
                rotationZ: getRotationZ(c1, c2, this),
                rotationX: getRotationX(c1, c2, this)
            };
        }
        getStartInfo() {
            const rotation = this.getStartRotation();
            return {
                coordinate: this.getStartCoordinate(),
                rotationX: rotation.rotationX,
                rotationZ: rotation.rotationZ
            };
        }
        getData() {
            return this.data;
        }
        getStartTime() {
            return this.startTime;
        }
        getEndTime() {
            return this.endTime;
        }
        getUnitTime() {
            return this.options['unitTime'];
        }
        setUnitTime(ut) {
            if (!this.isAvailable()) {
                return this;
            }
            this.options['unitTime'] = +ut;
            return this;
        }
        getCurrentCoordinate() {
            return this.coordinate;
        }
        getCoordinates() {
            if (this.isDirty()) {
                return [];
            }
            return this.data.map(d => {
                return d.coordinate;
            });
        }
        getCurrentVertex() {
            if (this.index < 0) {
                return [];
            }
            return this.data.slice(0, this.index + 1);
        }
    }
    //@ts-ignore
    RoutePlayer.mergeOptions(OPTIONS);
    let time = now();
    function loop(timestamp) {
        const currentTime = now();
        const dt = currentTime - time;
        const len = RoutePlayers.length;
        for (let i = 0; i < len; i++) {
            const player = RoutePlayers[i];
            player._loop(dt);
        }
        time = currentTime;
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    if (typeof document !== 'undefined' && document.addEventListener) {
        document.addEventListener('visibilitychange', e => {
            if (document.visibilityState === 'visible') {
                time = now();
            }
        });
    }

    exports.RoutePlayer = RoutePlayer;
    exports.formatRouteData = formatRouteData;

    Object.defineProperty(exports, '__esModule', { value: true });

    typeof console !== 'undefined' && console.log('maptalks.routeplayer v1.1.0');

}));
//# sourceMappingURL=maptalks.routeplayer.js.map
