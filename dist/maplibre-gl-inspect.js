! function(t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).MaplibreInspect = t()
}(function() {
    return function t(e, n, r) {
        function o(a, s) {
            if (!n[a]) {
                if (!e[a]) {
                    var c = "function" == typeof require && require;
                    if (!s && c) return c(a, !0);
                    if (i) return i(a, !0);
                    throw (c = new Error("Cannot find module '" + a + "'")).code = "MODULE_NOT_FOUND", c
                }
                c = n[a] = {
                    exports: {}
                }, e[a][0].call(c.exports, function(t) {
                    return o(e[a][1][t] || t)
                }, c, c.exports, t, e, n, r)
            }
            return n[a].exports
        }
        for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
        return o
    }({
        1: [function(t, e, n) {
            t = t("./lib/MaplibreInspect"), e.exports = t
        }, {
            "./lib/MaplibreInspect": 3
        }],
        2: [function(t, e, n) {
            function r(t) {
                var e, n;
                t = Object.assign({
                    show: !0,
                    onToggle: function() {}
                }, t), this._btn = ((n = document.createElement("button")).className = "maplibregl-ctrl-icon maplibregl-ctrl-inspect", n.type = "button", n["aria-label"] = "Inspect", n), this._btn.onclick = t.onToggle, this.elem = (e = this._btn, n = t.show, (t = document.createElement("div")).className = "maplibregl-ctrl maplibregl-ctrl-group", t.appendChild(e), n || (t.style.display = "none"), t)
            }
            r.prototype.setInspectIcon = function() {
                this._btn.className = "maplibregl-ctrl-icon maplibregl-ctrl-inspect"
            }, r.prototype.setMapIcon = function() {
                this._btn.className = "maplibregl-ctrl-icon maplibregl-ctrl-map"
            }, e.exports = r
        }, {}],
        3: [function(t, e, n) {
            function r(t) {
                return Object.keys(t.sources).forEach(function(e) {
                    t.sources[e] = "raster" === (e = t.sources[e]).type && e.tileSize && e.tiles ? {
                        type: e.type,
                        tileSize: e.tileSize,
                        tiles: e.tiles
                    } : "raster" === e.type && e.url ? {
                        type: e.type,
                        url: e.url
                    } : e
                }), t
            }

            function o(t) {
                if (!(this instanceof o)) throw new Error("MaplibreInspect needs to be called with the new keyword");
                var e = null;
                window.maplibregl ? e = new window.maplibregl.Popup({
                    closeButton: !1,
                    closeOnClick: !1
                }) : t.popup || console.error("Maplibre GL JS can not be found. Make sure to include it or pass an initialized maplibregl Popup to MaplibreInspect if you are using moduleis."), this.options = Object.assign({
                    showInspectMap: !1,
                    showInspectButton: !0,
                    showInspectMapPopup: !0,
                    showMapPopup: !1,
                    backgroundColor: "#fff",
                    assignLayerColor: u.brightColor,
                    buildInspectStyle: i.generateInspectStyle,
                    renderPopup: c,
                    popup: e
                }, t), this.sources = {}, this.assignLayerColor = this.options.assignLayerColor, this.toggleInspector = this.toggleInspector.bind(this), this._popup = this.options.popup, this._showInspectMap = this.options.showInspectMap, this._onSourceChange = this._onSourceChange.bind(this), this._onMousemove = this._onMousemove.bind(this), this._onStyleChange = this._onStyleChange.bind(this), this._originalStyle = null, this._toggle = new a({
                    show: this.options.showInspectButton,
                    onToggle: this.toggleInspector.bind(this)
                })
            }
            var i = t("./stylegen"),
                a = t("./InspectButton"),
                s = t("lodash.isequal"),
                c = t("./renderPopup"),
                u = t("./colors");
            o.prototype.toggleInspector = function() {
                this._showInspectMap = !this._showInspectMap, this.render()
            }, o.prototype._inspectStyle = function() {
                var t = i.generateColoredLayers(this.sources, this.assignLayerColor);
                return this.options.buildInspectStyle(this._map.getStyle(), t, {
                    backgroundColor: this.options.backgroundColor
                })
            }, o.prototype.render = function() {
                var t;
                this._showInspectMap ? (this._map.setStyle(r(((t = this._inspectStyle()).metadata = t.metadata || {}, t.metadata.inspect = !0, t))), this._toggle.setMapIcon()) : this._originalStyle && (this._popup && this._popup.remove(), this._map.setStyle(r(this._originalStyle)), this._toggle.setInspectIcon())
            }, o.prototype._onSourceChange = function() {
                var t = this.sources,
                    e = this._map,
                    n = Object.assign({}, t);
                Object.keys(e.style.sourceCaches).forEach(function(n) {
                    var r = e.style.sourceCaches[n]._source.vectorLayerIds;
                    r && (t[n] = r)
                }), s(n, t) || this.render()
            }, o.prototype._onStyleChange = function() {
                var t, e = this._map.getStyle();
                (t = e).metadata && t.metadata.inspect || (this._originalStyle = e)
            }, o.prototype._onMousemove = function(t) {
                var e;
                !this.options.showInspectMapPopup && this._showInspectMap || !this.options.showMapPopup && !this._showInspectMap || (e = this._map.queryRenderedFeatures(t.point), this._map.getCanvas().style.cursor = e.length ? "pointer" : "", !e.length && this._popup ? this._popup.remove() : this._popup && this._popup.setLngLat(t.lngLat).setHTML(this.options.renderPopup(e)).addTo(this._map))
            }, o.prototype.onAdd = function(t) {
                return (this._map = t).on("styledata", this._onStyleChange), t.on("load", this._onStyleChange), t.on("tiledata", this._onSourceChange), t.on("sourcedata", this._onSourceChange), t.on("mousemove", this._onMousemove), this._toggle.elem
            }, o.prototype.onRemove = function() {
                this._map.off("styledata", this._onStyleChange), this._map.off("load", this._onStyleChange), this._map.off("tiledata", this._onSourceChange), this._map.off("sourcedata", this._onSourceChange), this._map.off("mousemove", this._onMousemove);
                var t = this._toggle.elem;
                t.parentNode.removeChild(t), this._map = void 0
            }, e.exports = o
        }, {
            "./InspectButton": 2,
            "./colors": 4,
            "./renderPopup": 5,
            "./stylegen": 6,
            "lodash.isequal": 7
        }],
        4: [function(t, e, n) {
            var r = t("randomcolor");
            n.brightColor = function(t, e) {
                var n = "bright",
                    o = null;
                return /water|ocean|lake|sea|river/.test(t) && (o = "blue"), /state|country|place/.test(t) && (o = "pink"), /road|highway|transport/.test(t) && (o = "orange"), /contour|building/.test(t) && (o = "monochrome"), /building/.test(t) && (n = "dark"), /contour|landuse/.test(t) && (o = "yellow"), /wood|forest|park|landcover/.test(t) && (o = "green"), "rgba(" + r({
                    luminosity: n,
                    hue: o,
                    seed: t,
                    format: "rgbArray"
                }).concat([e || 1]).join(", ") + ")"
            }
        }, {
            randomcolor: 8
        }],
        5: [function(t, e, n) {
            function r(t, e) {
                return '<div class="mapbox-gl-inspect_property"><div class="mapbox-gl-inspect_property-name">' + t + '</div><div class="mapbox-gl-inspect_property-value">' + (null == (e = e) ? e : e instanceof Date ? e.toLocaleString() : "object" == typeof e || "number" == typeof e || "string" == typeof e ? e.toString() : e) + "</div></div>"
            }
            e.exports = function(t) {
                return '<div class="mapbox-gl-inspect_popup">' + function(t) {
                    return t.map(function(t) {
                        return '<div class="mapbox-gl-inspect_feature">' + (n = '<div class="mapbox-gl-inspect_layer">' + ((e = t).layer["source-layer"] || e.layer.source) + "</div>", o = r("$type", e.geometry.type), t = Object.keys(e.properties).map(function(t) {
                            return r(t, e.properties[t])
                        }), [n, o].concat(t).join("")) + "</div>";
                        var e, n, o
                    }).join("")
                }(t) + "</div>"
            }
        }, {}],
        6: [function(t, e, n) {
            function r(t, e, n) {
                return t = {
                    id: [e, n, "circle"].join("_"),
                    source: e,
                    type: "circle",
                    paint: {
                        "circle-color": t,
                        "circle-radius": 2
                    },
                    filter: ["==", "$type", "Point"]
                }, n && (t["source-layer"] = n), t
            }

            function o(t, e, n, r) {
                return t = {
                    id: [n, r, "polygon"].join("_"),
                    source: n,
                    type: "fill",
                    paint: {
                        "fill-color": t,
                        "fill-antialias": !0,
                        "fill-outline-color": t
                    },
                    filter: ["==", "$type", "Polygon"]
                }, r && (t["source-layer"] = r), t
            }

            function i(t, e, n) {
                return t = {
                    id: [e, n, "line"].join("_"),
                    source: e,
                    layout: {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    type: "line",
                    paint: {
                        "line-color": t
                    },
                    filter: ["==", "$type", "LineString"]
                }, n && (t["source-layer"] = n), t
            }
            n.polygonLayer = o, n.lineLayer = i, n.circleLayer = r, n.generateInspectStyle = function(t, e, n) {
                return n = {
                    id: "background",
                    type: "background",
                    paint: {
                        "background-color": (n = Object.assign({
                            backgroundColor: "#fff"
                        }, n)).backgroundColor
                    }
                }, Object.assign(t, {
                    layers: [n].concat(e)
                })
            }, n.generateColoredLayers = function(t, e) {
                function n(t) {
                    return {
                        circle: (t = e.bind(null, t))(.8),
                        line: t(.6),
                        polygon: t(.3),
                        polygonOutline: t(.6),
                        default: t(1)
                    }
                }
                var a = [],
                    s = [],
                    c = [];
                return Object.keys(t).forEach(function(e) {
                    var u = t[e];
                    u ? u.forEach(function(t) {
                        var u = n(t);
                        s.push(r(u.circle, e, t)), c.push(i(u.line, e, t)), a.push(o(u.polygon, u.polygonOutline, e, t))
                    }) : (u = n(e), s.push(r(u.circle, e)), c.push(i(u.line, e)), a.push(o(u.polygon, u.polygonOutline, e)))
                }), a.concat(c).concat(s)
            }
        }, {}],
        7: [function(t, e, n) {
            (function(t) {
                function r(t) {
                    var e = !1;
                    if (null != t && "function" != typeof t.toString) try {
                        e = !!(t + "")
                    } catch (t) {}
                    return e
                }

                function o(t) {
                    var e = -1,
                        n = Array(t.size);
                    return t.forEach(function(t, r) {
                        n[++e] = [r, t]
                    }), n
                }

                function i(t) {
                    var e = -1,
                        n = Array(t.size);
                    return t.forEach(function(t) {
                        n[++e] = t
                    }), n
                }

                function a(t) {
                    var e = -1,
                        n = t ? t.length : 0;
                    for (this.clear(); ++e < n;) {
                        var r = t[e];
                        this.set(r[0], r[1])
                    }
                }

                function s(t) {
                    var e = -1,
                        n = t ? t.length : 0;
                    for (this.clear(); ++e < n;) {
                        var r = t[e];
                        this.set(r[0], r[1])
                    }
                }

                function c(t) {
                    var e = -1,
                        n = t ? t.length : 0;
                    for (this.clear(); ++e < n;) {
                        var r = t[e];
                        this.set(r[0], r[1])
                    }
                }

                function u(t) {
                    var e = -1,
                        n = t ? t.length : 0;
                    for (this.__data__ = new c; ++e < n;) this.add(t[e])
                }

                function l(t) {
                    this.__data__ = new s(t)
                }

                function p(t, e) {
                    for (var n = t.length; n--;)
                        if (_(t[n][0], e)) return n;
                    return -1
                }

                function f(t, e, n, a, s) {
                    return t === e || (null == t || null == e || !w(t) && !j(e) ? t != t && e != e : function(t, e, n, a, s, c) {
                        var u = St(t),
                            p = St(e),
                            f = A,
                            d = A;
                        u || (f = (f = wt(t)) == O ? B : f), p || (d = (d = wt(e)) == O ? B : d);
                        var y = f == B && !r(t);
                        return p = d == B && !r(e), (d = f == d) && !y ? (c = c || new l, u || It(t) ? h(t, e, n, a, s, c) : function(t, e, n, r, a, s, c) {
                            switch (f) {
                                case V:
                                    if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1;
                                    t = t.buffer, e = e.buffer;
                                case G:
                                    return !(t.byteLength != e.byteLength || !r(new ut(t), new ut(e)));
                                case x:
                                case L:
                                case $:
                                    return _(+t, +e);
                                case E:
                                    return t.name == e.name && t.message == e.message;
                                case F:
                                case q:
                                    return t == e + "";
                                case T:
                                    var u = o;
                                case z:
                                    var l = s & k;
                                    return u = u || i, !(t.size != e.size && !l) && ((l = c.get(t)) ? l == e : (s |= M, c.set(t, e), u = h(u(t), u(e), r, a, s, c), c.delete(t), u));
                                case U:
                                    if (mt) return mt.call(t) == mt.call(e)
                            }
                            return !1
                        }(t, e, 0, n, a, s, c)) : s & k || (y = y && at.call(t, "__wrapped__"), p = p && at.call(e, "__wrapped__"), !y && !p) ? !!d && function(t, e, n, r, o, i) {
                            var a = o & k,
                                s = S(t),
                                c = s.length,
                                u = S(e).length;
                            if (c != u && !a) return !1;
                            for (var l = c; l--;) {
                                var p = s[l];
                                if (!(a ? p in e : at.call(e, p))) return !1
                            }
                            var f = i.get(t);
                            if (f && i.get(e)) return f == e;
                            var h = !0;
                            i.set(t, e), i.set(e, t);
                            for (var d = a; ++l < c;) {
                                var y, g = t[p = s[l]],
                                    _ = e[p];
                                if (r && (y = a ? r(_, g, p, e, t, i) : r(g, _, p, t, e, i)), !(void 0 === y ? g === _ || n(g, _, r, o, i) : y)) {
                                    h = !1;
                                    break
                                }
                                d = d || "constructor" == p
                            }
                            return h && !d && (u = t.constructor) != (f = e.constructor) && "constructor" in t && "constructor" in e && !("function" == typeof u && u instanceof u && "function" == typeof f && f instanceof f) && (h = !1), i.delete(t), i.delete(e), h
                        }(t, e, n, a, s, c = c || new l) : n(y = y ? t.value() : t, p = p ? e.value() : e, a, s, c = c || new l)
                    }(t, e, f, n, a, s))
                }

                function h(t, e, n, r, o, i) {
                    var a = o & k,
                        s = t.length,
                        c = e.length;
                    if (s != c && !(a && s < c)) return !1;
                    if ((c = i.get(t)) && i.get(e)) return c == e;
                    var l = -1,
                        p = !0,
                        f = o & M ? new u : void 0;
                    for (i.set(t, e), i.set(e, t); ++l < s;) {
                        var h, d = t[l],
                            y = e[l];
                        if (r && (h = a ? r(y, d, l, e, t, i) : r(d, y, l, t, e, i)), void 0 !== h) {
                            if (h) continue;
                            p = !1;
                            break
                        }
                        if (f) {
                            if (! function(t, e) {
                                    for (var n = -1, r = t ? t.length : 0; ++n < r;)
                                        if (e(t[n], n)) return 1
                                }(e, function(t, e) {
                                    return !f.has(e) && (d === t || n(d, t, r, o, i)) && f.add(e)
                                })) {
                                p = !1;
                                break
                            }
                        } else if (d !== y && !n(d, y, r, o, i)) {
                            p = !1;
                            break
                        }
                    }
                    return i.delete(t), i.delete(e), p
                }

                function d(t, e) {
                    var n, r = t.__data__;
                    return ("string" == (t = typeof(n = e)) || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== n : null === n) ? r["string" == typeof e ? "string" : "hash"] : r.map
                }

                function y(t, e) {
                    return e = e,
                        function(t) {
                            return w(t) && !(ot && ot in t) && (v(t) || r(t) ? ct : W).test(g(t))
                        }(e = null == (t = t) ? void 0 : t[e]) ? e : void 0
                }

                function g(t) {
                    if (null != t) {
                        try {
                            return it.call(t)
                        } catch (t) {}
                        try {
                            return t + ""
                        } catch (t) {}
                    }
                    return ""
                }

                function _(t, e) {
                    return t === e || t != t && e != e
                }

                function b(t) {
                    return null != t && m(t.length) && !v(t)
                }

                function v(t) {
                    return (t = w(t) ? st.call(t) : "") == P || t == R
                }

                function m(t) {
                    return "number" == typeof t && -1 < t && t % 1 == 0 && t <= C
                }

                function w(t) {
                    var e = typeof t;
                    return t && ("object" == e || "function" == e)
                }

                function j(t) {
                    return !!t && "object" == typeof t
                }

                function S(t) {
                    return (b(t) ? function(t, e) {
                        var n, r, o, i, a = St(t) || function(t) {
                                return j(t) && b(t)
                            }(n = t) && at.call(n, "callee") && (!lt.call(n, "callee") || st.call(n) == O) ? function(t, e) {
                                for (var n = -1, r = Array(t); ++n < t;) r[n] = e(n);
                                return r
                            }(t.length, String) : [],
                            s = a.length,
                            c = !!s;
                        for (r in t) !e && !at.call(t, r) || c && ("length" == r || (o = r, (i = null == (i = s) ? C : i) && ("number" == typeof o || H.test(o)) && -1 < o && o % 1 == 0 && o < i)) || a.push(r);
                        return a
                    } : function(t) {
                        if (n = "function" == typeof(n = (e = t) && e.constructor) && n.prototype || rt, e !== n) return ft(t);
                        var e, n, r, o = [];
                        for (r in Object(t)) at.call(t, r) && "constructor" != r && o.push(r);
                        return o
                    })(t)
                }
                var I = "__lodash_hash_undefined__",
                    M = 1,
                    k = 2,
                    C = 9007199254740991,
                    O = "[object Arguments]",
                    A = "[object Array]",
                    x = "[object Boolean]",
                    L = "[object Date]",
                    E = "[object Error]",
                    P = "[object Function]",
                    R = "[object GeneratorFunction]",
                    T = "[object Map]",
                    $ = "[object Number]",
                    B = "[object Object]",
                    N = "[object Promise]",
                    F = "[object RegExp]",
                    z = "[object Set]",
                    q = "[object String]",
                    U = "[object Symbol]",
                    D = "[object WeakMap]",
                    G = "[object ArrayBuffer]",
                    V = "[object DataView]",
                    W = /^\[object .+?Constructor\]$/,
                    H = /^(?:0|[1-9]\d*)$/,
                    J = {};
                J["[object Float32Array]"] = J["[object Float64Array]"] = J["[object Int8Array]"] = J["[object Int16Array]"] = J["[object Int32Array]"] = J["[object Uint8Array]"] = J["[object Uint8ClampedArray]"] = J["[object Uint16Array]"] = J["[object Uint32Array]"] = !0, J[O] = J[A] = J[G] = J[x] = J[V] = J[L] = J[E] = J[P] = J[T] = J[$] = J[B] = J[F] = J[z] = J[q] = J[D] = !1;
                var X, K, Q = "object" == typeof t && t && t.Object === Object && t,
                    Y = "object" == typeof self && self && self.Object === Object && self,
                    Z = Q || Y || Function("return this")(),
                    tt = (et = (nt = "object" == typeof n && n && !n.nodeType && n) && "object" == typeof e && e && !e.nodeType && e) && et.exports === nt && Q.process,
                    et = (Y = (t = function() {
                        try {
                            return tt && tt.binding("util")
                        } catch (t) {}
                    }()) && t.isTypedArray, Array.prototype),
                    nt = Function.prototype,
                    rt = Object.prototype,
                    ot = (Q = Z["__core-js_shared__"], (t = /[^.]+$/.exec(Q && Q.keys && Q.keys.IE_PROTO || "")) ? "Symbol(src)_1." + t : ""),
                    it = nt.toString,
                    at = rt.hasOwnProperty,
                    st = rt.toString,
                    ct = RegExp("^" + it.call(at).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                    ut = (Q = Z.Symbol, Z.Uint8Array),
                    lt = rt.propertyIsEnumerable,
                    pt = et.splice,
                    ft = (X = Object.keys, K = Object, function(t) {
                        return X(K(t))
                    }),
                    ht = (t = y(Z, "DataView"), y(Z, "Map")),
                    dt = (nt = y(Z, "Promise"), et = y(Z, "Set"), Z = y(Z, "WeakMap"), y(Object, "create")),
                    yt = g(t),
                    gt = g(ht),
                    _t = g(nt),
                    bt = g(et),
                    vt = g(Z),
                    mt = (Q = Q ? Q.prototype : void 0) ? Q.valueOf : void 0;
                a.prototype.clear = function() {
                    this.__data__ = dt ? dt(null) : {}
                }, a.prototype.delete = function(t) {
                    return this.has(t) && delete this.__data__[t]
                }, a.prototype.get = function(t) {
                    var e = this.__data__;
                    if (dt) {
                        var n = e[t];
                        return n === I ? void 0 : n
                    }
                    return at.call(e, t) ? e[t] : void 0
                }, a.prototype.has = function(t) {
                    var e = this.__data__;
                    return dt ? void 0 !== e[t] : at.call(e, t)
                }, a.prototype.set = function(t, e) {
                    return this.__data__[t] = dt && void 0 === e ? I : e, this
                }, s.prototype.clear = function() {
                    this.__data__ = []
                }, s.prototype.delete = function(t) {
                    var e = this.__data__;
                    return !((t = p(e, t)) < 0 || (t == e.length - 1 ? e.pop() : pt.call(e, t, 1), 0))
                }, s.prototype.get = function(t) {
                    var e = this.__data__;
                    return (t = p(e, t)) < 0 ? void 0 : e[t][1]
                }, s.prototype.has = function(t) {
                    return -1 < p(this.__data__, t)
                }, s.prototype.set = function(t, e) {
                    var n = this.__data__,
                        r = p(n, t);
                    return r < 0 ? n.push([t, e]) : n[r][1] = e, this
                }, c.prototype.clear = function() {
                    this.__data__ = {
                        hash: new a,
                        map: new(ht || s),
                        string: new a
                    }
                }, c.prototype.delete = function(t) {
                    return d(this, t).delete(t)
                }, c.prototype.get = function(t) {
                    return d(this, t).get(t)
                }, c.prototype.has = function(t) {
                    return d(this, t).has(t)
                }, c.prototype.set = function(t, e) {
                    return d(this, t).set(t, e), this
                }, u.prototype.add = u.prototype.push = function(t) {
                    return this.__data__.set(t, I), this
                }, u.prototype.has = function(t) {
                    return this.__data__.has(t)
                }, l.prototype.clear = function() {
                    this.__data__ = new s
                }, l.prototype.delete = function(t) {
                    return this.__data__.delete(t)
                }, l.prototype.get = function(t) {
                    return this.__data__.get(t)
                }, l.prototype.has = function(t) {
                    return this.__data__.has(t)
                }, l.prototype.set = function(t, e) {
                    var n = this.__data__;
                    if (n instanceof s) {
                        var r = n.__data__;
                        if (!ht || r.length < 199) return r.push([t, e]), this;
                        n = this.__data__ = new c(r)
                    }
                    return n.set(t, e), this
                };
                var wt = function(t) {
                    return st.call(t)
                };
                (t && wt(new t(new ArrayBuffer(1))) != V || ht && wt(new ht) != T || nt && wt(nt.resolve()) != N || et && wt(new et) != z || Z && wt(new Z) != D) && (wt = function(t) {
                    var e = st.call(t);
                    if (t = (t = e == B ? t.constructor : void 0) ? g(t) : void 0) switch (t) {
                        case yt:
                            return V;
                        case gt:
                            return T;
                        case _t:
                            return N;
                        case bt:
                            return z;
                        case vt:
                            return D
                    }
                    return e
                });
                var jt, St = Array.isArray,
                    It = Y ? (jt = Y, function(t) {
                        return jt(t)
                    }) : function(t) {
                        return j(t) && m(t.length) && !!J[st.call(t)]
                    };
                e.exports = function(t, e) {
                    return f(t, e)
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        8: [function(t, e, n) {
            var r, o;
            r = function() {
                function t(t) {
                    return (t = i(function(t) {
                        if ("number" == typeof parseInt(t)) {
                            var e = parseInt(t);
                            if (e < 360 && 0 < e) return [e, e]
                        }
                        return "string" == typeof t && l[t] && (t = l[t]).hueRange ? t.hueRange : [0, 360]
                    }(t.hue))) < 0 && (t = 360 + t), t
                }

                function e(t, e) {
                    if ("random" === e.luminosity) return i([0, 100]);
                    if ("monochrome" === e.hue) return 0;
                    var n = (t = o(t).saturationRange)[0],
                        r = t[1];
                    switch (e.luminosity) {
                        case "bright":
                            n = 55;
                            break;
                        case "dark":
                            n = r - 10;
                            break;
                        case "light":
                            r = 55
                    }
                    return i([n, r])
                }

                function n(t, e, n) {
                    var r = function(t, e) {
                            for (var n = o(t).lowerBounds, r = 0; r < n.length - 1; r++) {
                                var i = n[r][0],
                                    a = n[r][1],
                                    s = n[r + 1][0],
                                    c = n[r + 1][1];
                                if (i <= e && e <= s) return (s = (c - a) / (s - i)) * e + (a - s * i)
                            }
                            return 0
                        }(t, e),
                        a = 100;
                    switch (n.luminosity) {
                        case "dark":
                            a = r + 20;
                            break;
                        case "light":
                            r = (a + r) / 2;
                            break;
                        case "random":
                            r = 0, a = 100
                    }
                    return i([r, a])
                }

                function r(t, e) {
                    switch (e.format) {
                        case "hsvArray":
                            return t;
                        case "hslArray":
                            return c(t);
                        case "hsl":
                            var n = c(t);
                            return "hsl(" + n[0] + ", " + n[1] + "%, " + n[2] + "%)";
                        case "hsla":
                            return "hsla(" + (n = c(t))[0] + ", " + n[1] + "%, " + n[2] + "%, " + Math.random() + ")";
                        case "rgbArray":
                            return s(t);
                        case "rgb":
                            return "rgb(" + s(t).join(", ") + ")";
                        case "rgba":
                            return "rgba(" + s(t).join(", ") + ", " + Math.random() + ")";
                        default:
                            return function(t) {
                                function e(t) {
                                    return 1 == (t = t.toString(16)).length ? "0" + t : t
                                }
                                return "#" + e((t = s(t))[0]) + e(t[1]) + e(t[2])
                            }(t)
                    }
                }

                function o(t) {
                    for (var e in 334 <= t && t <= 360 && (t -= 360), l) {
                        var n = l[e];
                        if (n.hueRange && t >= n.hueRange[0] && t <= n.hueRange[1]) return l[e]
                    }
                    return "Color not found"
                }

                function i(t) {
                    if (null === u) return Math.floor(t[0] + Math.random() * (t[1] + 1 - t[0]));
                    var e = t[1] || 1,
                        n = t[0] || 0;
                    return t = (u = (9301 * u + 49297) % 233280) / 233280, Math.floor(n + t * (e - n))
                }

                function a(t, e, n) {
                    var r = n[0][0],
                        o = n[n.length - 1][0],
                        i = n[n.length - 1][1],
                        a = n[0][1];
                    l[t] = {
                        hueRange: e,
                        lowerBounds: n,
                        saturationRange: [r, o],
                        brightnessRange: [i, a]
                    }
                }

                function s(t) {
                    0 === (e = t[0]) && (e = 1), 360 === e && (e = 359), e /= 360;
                    var e, n = t[1] / 100,
                        r = t[2] / 100,
                        o = r * (1 - n),
                        i = r * (1 - (e = 6 * e - (t = Math.floor(6 * e))) * n),
                        a = r * (1 - (1 - e) * n),
                        s = 256,
                        c = 256,
                        u = 256;
                    switch (t) {
                        case 0:
                            s = r, c = a, u = o;
                            break;
                        case 1:
                            s = i, c = r, u = o;
                            break;
                        case 2:
                            s = o, c = r, u = a;
                            break;
                        case 3:
                            s = o, c = i, u = r;
                            break;
                        case 4:
                            s = a, c = o, u = r;
                            break;
                        case 5:
                            s = r, c = o, u = i
                    }
                    return [Math.floor(255 * s), Math.floor(255 * c), Math.floor(255 * u)]
                }

                function c(t) {
                    var e = t[0],
                        n = t[1] / 100,
                        r = t[2] / 100;
                    return t = (2 - n) * r, [e, Math.round(n * r / (t < 1 ? t : 2 - t) * 1e4) / 100, t / 2 * 100]
                }
                var u = null,
                    l = {};
                a("monochrome", null, [
                    [0, 0],
                    [100, 0]
                ]), a("red", [-26, 18], [
                    [20, 100],
                    [30, 92],
                    [40, 89],
                    [50, 85],
                    [60, 78],
                    [70, 70],
                    [80, 60],
                    [90, 55],
                    [100, 50]
                ]), a("orange", [19, 46], [
                    [20, 100],
                    [30, 93],
                    [40, 88],
                    [50, 86],
                    [60, 85],
                    [70, 70],
                    [100, 70]
                ]), a("yellow", [47, 62], [
                    [25, 100],
                    [40, 94],
                    [50, 89],
                    [60, 86],
                    [70, 84],
                    [80, 82],
                    [90, 80],
                    [100, 75]
                ]), a("green", [63, 178], [
                    [30, 100],
                    [40, 90],
                    [50, 85],
                    [60, 81],
                    [70, 74],
                    [80, 64],
                    [90, 50],
                    [100, 40]
                ]), a("blue", [179, 257], [
                    [20, 100],
                    [30, 86],
                    [40, 80],
                    [50, 74],
                    [60, 60],
                    [70, 52],
                    [80, 44],
                    [90, 39],
                    [100, 35]
                ]), a("purple", [258, 282], [
                    [20, 100],
                    [30, 87],
                    [40, 79],
                    [50, 70],
                    [60, 65],
                    [70, 59],
                    [80, 52],
                    [90, 45],
                    [100, 42]
                ]), a("pink", [283, 334], [
                    [20, 100],
                    [30, 90],
                    [40, 86],
                    [60, 84],
                    [80, 80],
                    [90, 75],
                    [100, 73]
                ]);
                var p = function(o) {
                    if ((o = o || {}).seed && o.seed === parseInt(o.seed, 10)) u = o.seed;
                    else if ("string" == typeof o.seed) u = function(t) {
                        for (var e = 0, n = 0; n !== t.length && !(e >= Number.MAX_SAFE_INTEGER); n++) e += t.charCodeAt(n);
                        return e
                    }(o.seed);
                    else {
                        if (void 0 !== o.seed && null !== o.seed) throw new TypeError("The seed value must be an integer or string");
                        u = null
                    }
                    var i, a;
                    if (null === o.count || void 0 === o.count) return r([i = t(o), a = e(i, o), n(i, a, o)], o);
                    var s = o.count,
                        c = [];
                    for (o.count = null; s > c.length;) u && o.seed && (o.seed += 1), c.push(p(o));
                    return o.count = s, c
                };
                return p
            }, "object" == typeof n ? (o = r(), "object" == typeof e && e && e.exports && (n = e.exports = o), n.randomColor = o) : this.randomColor = r()
        }, {}]
    }, {}, [1])(1)
});