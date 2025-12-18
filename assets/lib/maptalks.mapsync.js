/*!
 * maptalks.mapsync v0.7.0
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
    typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
    (global = global || self, factory(global.maptalks = global.maptalks || {}, global.maptalks));
}(this, function (exports, maptalks) { 'use strict';

    const EVENTS = 'moving moveend zooming zoomend pitch rotate animating';

    function Base() {

    }
    class MapSync extends maptalks.Eventable(Base) {
        constructor(maps) {
            super();
            maps = maps || [];
            if (!Array.isArray(maps)) {
                maps = [maps];
            }
            this.currentMap = null;
            this._lock = false;
            this.list = maps.filter(map => {
                return this._validateMap(map);
            }).map(map => {
                return {
                    map,
                    container: map.getContainer()
                };
            });
            this.list.forEach(d => {
                maptalks.DomUtil.on(d.container, 'mousemove', this._containerMousemoveHandler, this);
            });
        }

        _containerMousemoveHandler(event) {
            if (this._lock) {
                return this;
            }
            const target = event.currentTarget;
            const d = this.find(target);
            if (!d) {
                return this;
            }
            if (d.map !== this.currentMap) {
                if (this.currentMap) {
                    this.currentMap.off(EVENTS, this._mapViewChangeHandler, this);
                }
                this.currentMap = d.map;
                this.currentMap.on(EVENTS, this._mapViewChangeHandler, this);
                this._mapViewChangeHandler();
                this.fire('switchmainmap', { map: this.currentMap });
            }
        }

        _mapViewChangeHandler(e) {
            if (!this.currentMap) {
                return this;
            }
            const view = this.currentMap.getView();
            this.list.forEach(d => {
                if (d.map === this.currentMap) {
                    return;
                }
                d.map.setView(view);
            });
        }

        find(map) {
            const list = this.list;
            for (let i = 0, len = this.list.length; i < len; i++) {
                if (list[i].map === map || list[i].container === map) {
                    return list[i];
                }
            }
        }

        addMap(map) {
            if (!this._validateMap(map)) {
                return this;
            }
            let d = this.find(map);
            if (d) {
                return this;
            }
            d = {
                map,
                container: map.getContainer()
            };
            this.list.push(d);
            maptalks.DomUtil.on(d.container, 'mousemove', this._containerMousemoveHandler, this);
            this._mapViewChangeHandler();
            return this;

        }

        removeMap(map) {
            if (!this._validateMap(map)) {
                return this;
            }
            const d = this.find(map);
            if (!d) {
                return this;
            }
            maptalks.DomUtil.off(d.container, 'mousemove', this._containerMousemoveHandler, this);
            d.map.off(EVENTS, this._mapViewChangeHandler, this);
            for (let i = 0, len = this.list.length; i < len; i++) {
                if (this.list[i].map === map) {
                    this.list.splice(i, 1);
                    break;
                }
            }
            if (this.currentMap === map) {
                this.currentMap = null;
            }
            return this;
        }

        setMainMap(map) {
            if (this._lock) {
                console.warn('current main map is lock,not change main map');
                return this;
            }
            if (!this._validateMap(map)) {
                return this;
            }
            const d = this.find(map);
            if (!d) {
                return this;
            }
            if (d.map === this.currentMap) {
                return this;
            }
            if (this.currentMap) {
                this.currentMap.off(EVENTS, this._mapViewChangeHandler, this);
            }
            this.currentMap = map;
            map.on(EVENTS, this._mapViewChangeHandler, this);
            this.fire('switchmainmap', { map: this.currentMap });
            return this;
        }

        getMainMap() {
            return this.currentMap;
        }

        lock() {
            this._lock = true;
            return this;
        }

        unLock() {
            this._lock = false;
            return this;
        }

        isLock() {
            return this._lock;
        }

        dispose() {
            this.list.forEach(d => {
                maptalks.DomUtil.off(d.container, 'mousemove', this._containerMousemoveHandler, this);
                d.map.off(EVENTS, this._mapViewChangeHandler, this);
            });
            this.list = [];
            return this;
        }

        _validateMap(map) {
            return map && map.getContainer && map.getContainer() && map.getView && map.setView && map.on && map.off;
        }
    }

    exports.MapSync = MapSync;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=maptalks.mapsync.js.map
