!function (e)
    {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).dragula = e()
    }(
    function () {
        return function o(r, i, u) {
        function c(t, e) {
        if (!i[t]) {
        if (!r[t]) {
        var n = "function" == typeof require && require;
        if (!e && n) return n(t, !0);
        if (a) return a(t, !0);
        throw(n = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", n
    }
        n = i[t] = {exports: {}}, r[t][0].call(n.exports, function (e) {
        return c(r[t][1][e] || e)
    }, n, n.exports, o, r, i, u)
    }
        return i[t].exports
    }

        for (var a = "function" == typeof require && require, e = 0; e < u.length; e++) c(u[e]);
        return c
    }({
        1: [function (e, t, n) {
        "use strict";
        var o = {}, r = "(?:^|\\s)", i = "(?:\\s|$)";

        function u(e) {
        var t = o[e];
        return t ? t.lastIndex = 0 : o[e] = t = new RegExp(r + e + i, "g"), t
    }

        t.exports = {
        add: function (e, t) {
        var n = e.className;
        n.length ? u(t).test(n) || (e.className += " " + t) : e.className = t
    }, rm: function (e, t) {
        e.className = e.className.replace(u(t), " ").trim()
    }
    }
    }, {}], 2: [function (e, t, n) {
        (function (r) {
        "use strict";
        var M = e("contra/emitter"), k = e("crossvent"), j = e("./classes"), R = document,
        q = R.documentElement;

        function U(e, t, n, o) {
        r.navigator.pointerEnabled ? k[t](e, {
        mouseup: "pointerup",
        mousedown: "pointerdown",
        mousemove: "pointermove"
    }[n], o) : r.navigator.msPointerEnabled ? k[t](e, {
        mouseup: "MSPointerUp",
        mousedown: "MSPointerDown",
        mousemove: "MSPointerMove"
    }[n], o) : (k[t](e, {
        mouseup: "touchend",
        mousedown: "touchstart",
        mousemove: "touchmove"
    }[n], o), k[t](e, n, o))
    }

        function K(e) {
        if (void 0 !== e.touches) return e.touches.length;
        if (void 0 !== e.which && 0 !== e.which) return e.which;
        if (void 0 !== e.buttons) return e.buttons;
        e = e.button;
        return void 0 !== e ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : void 0
    }

        function z(e, t) {
        return void 0 !== r[t] ? r[t] : (q.clientHeight ? q : R.body)[e]
    }

        function H(e, t, n) {
        var o = (e = e || {}).className || "";
        return e.className += " gu-hide", n = R.elementFromPoint(t, n), e.className = o, n
    }

        function V() {
        return !1
    }

        function $() {
        return !0
    }

        function G(e) {
        return e.width || e.right - e.left
    }

        function J(e) {
        return e.height || e.bottom - e.top
    }

        function Q(e) {
        return e.parentNode === R ? null : e.parentNode
    }

        function W(e) {
        return "INPUT" === e.tagName || "TEXTAREA" === e.tagName || "SELECT" === e.tagName || function e(t) {
        if (!t) return !1;
        if ("false" === t.contentEditable) return !1;
        if ("true" === t.contentEditable) return !0;
        return e(Q(t))
    }(e)
    }

        function Z(t) {
        return t.nextElementSibling || function () {
        var e = t;
        for (; e = e.nextSibling, e && 1 !== e.nodeType;) ;
        return e
    }()
    }

        function ee(e, t) {
        var t = (n = t).targetTouches && n.targetTouches.length ? n.targetTouches[0] : n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n,
        n = {pageX: "clientX", pageY: "clientY"};
        return e in n && !(e in t) && n[e] in t && (e = n[e]), t[e]
    }

        t.exports = function (e, t) {
        var l, f, s, d, m, o, r, v, p, h, n;
        1 === arguments.length && !1 === Array.isArray(e) && (t = e, e = []);
        var i, g = null, y = t || {};
        void 0 === y.moves && (y.moves = $), void 0 === y.accepts && (y.accepts = $), void 0 === y.invalid && (y.invalid = function () {
        return !1
    }), void 0 === y.containers && (y.containers = e || []), void 0 === y.isContainer && (y.isContainer = V), void 0 === y.copy && (y.copy = !1), void 0 === y.copySortSource && (y.copySortSource = !1), void 0 === y.revertOnSpill && (y.revertOnSpill = !1), void 0 === y.removeOnSpill && (y.removeOnSpill = !1), void 0 === y.direction && (y.direction = "vertical"), void 0 === y.ignoreInputTextSelection && (y.ignoreInputTextSelection = !0), void 0 === y.mirrorContainer && (y.mirrorContainer = R.body);
        var w = M({
        containers: y.containers, start: function (e) {
        e = S(e);
        e && C(e)
    }, end: O, cancel: L, remove: X, destroy: function () {
        c(!0), N({})
    }, canMove: function (e) {
        return !!S(e)
    }, dragging: !1
    });
        return !0 === y.removeOnSpill && w.on("over", function (e) {
        j.rm(e, "gu-hide")
    }).on("out", function (e) {
        w.dragging && j.add(e, "gu-hide")
    }), c(), w;

        function u(e) {
        return -1 !== w.containers.indexOf(e) || y.isContainer(e)
    }

        function c(e) {
        e = e ? "remove" : "add";
        U(q, e, "mousedown", E), U(q, e, "mouseup", N)
    }

        function a(e) {
        U(q, e ? "remove" : "add", "mousemove", x)
    }

        function b(e) {
        e = e ? "remove" : "add";
        k[e](q, "selectstart", T), k[e](q, "click", T)
    }

        function T(e) {
        i && e.preventDefault()
    }

        function E(e) {
        var t, n;
        o = e.clientX, r = e.clientY, 1 !== K(e) || e.metaKey || e.ctrlKey || (n = S(t = e.target)) && (i = n, a(), "mousedown" === e.type && (W(t) ? t.focus() : e.preventDefault()))
    }

        function x(e) {
        if (i) if (0 !== K(e)) {
        if (!(void 0 !== e.clientX && Math.abs(e.clientX - o) <= (y.slideFactorX || 0) && void 0 !== e.clientY && Math.abs(e.clientY - r) <= (y.slideFactorY || 0))) {
        if (y.ignoreInputTextSelection) {
        var t = ee("clientX", e) || 0, n = ee("clientY", e) || 0;
        if (W(R.elementFromPoint(t, n))) return
    }
        n = i;
        a(!0), b(), O(), C(n);
        n = function (e) {
        e = e.getBoundingClientRect();
        return {
        left: e.left + z("scrollLeft", "pageXOffset"),
        top: e.top + z("scrollTop", "pageYOffset")
    }
    }(s);
        d = ee("pageX", e) - n.left, m = ee("pageY", e) - n.top, j.add(h || s, "gu-transit"), function () {
        if (l) return;
        var e = s.getBoundingClientRect();
        (l = s.cloneNode(!0)).style.width = G(e) + "px", l.style.height = J(e) + "px", j.rm(l, "gu-transit"), j.add(l, "gu-mirror"), y.mirrorContainer.appendChild(l), U(q, "add", "mousemove", P), j.add(y.mirrorContainer, "gu-unselectable"), w.emit("cloned", l, s, "mirror")
    }(), P(e)
    }
    } else N({})
    }

        function S(e) {
        if (!(w.dragging && l || u(e))) {
        for (var t = e; Q(e) && !1 === u(Q(e));) {
        if (y.invalid(e, t)) return;
        if (!(e = Q(e))) return
    }
        var n = Q(e);
        if (n) if (!y.invalid(e, t)) if (y.moves(e, n, t, Z(e))) return {item: e, source: n}
    }
    }

        function C(e) {
        var t, n;
        t = e.item, n = e.source, ("boolean" == typeof y.copy ? y.copy : y.copy(t, n)) && (h = e.item.cloneNode(!0), w.emit("cloned", h, e.item, "copy")), f = e.source, s = e.item, v = p = Z(e.item), w.dragging = !0, w.emit("drag", s, f)
    }

        function O() {
        var e;
        w.dragging && _(e = h || s, Q(e))
    }

        function I() {
        a(!(i = !1)), b(!0)
    }

        function N(e) {
        var t, n;
        I(), w.dragging && (t = h || s, n = ee("clientX", e) || 0, e = ee("clientY", e) || 0, (e = B(H(l, n, e), n, e)) && (h && y.copySortSource || !h || e !== f) ? _(t, e) : (y.removeOnSpill ? X : L)())
    }

        function _(e, t) {
        var n = Q(e);
        h && y.copySortSource && t === f && n.removeChild(s), A(t) ? w.emit("cancel", e, f, f) : w.emit("drop", e, t, f, p), Y()
    }

        function X() {
        var e, t;
        w.dragging && ((t = Q(e = h || s)) && t.removeChild(e), w.emit(h ? "cancel" : "remove", e, t, f), Y())
    }

        function L(e) {
        var t, n, o;
        w.dragging && (t = 0 < arguments.length ? e : y.revertOnSpill, !1 === (e = A(o = Q(n = h || s))) && t && (h ? o && o.removeChild(h) : f.insertBefore(n, v)), e || t ? w.emit("cancel", n, f, f) : w.emit("drop", n, o, f, p), Y())
    }

        function Y() {
        var e = h || s;
        I(), l && (j.rm(y.mirrorContainer, "gu-unselectable"), U(q, "remove", "mousemove", P), Q(l).removeChild(l), l = null), e && j.rm(e, "gu-transit"), n && clearTimeout(n), w.dragging = !1, g && w.emit("out", e, g, f), w.emit("dragend", e), f = s = h = v = p = n = g = null
    }

        function A(e, t) {
        t = void 0 !== t ? t : l ? p : Z(h || s);
        return e === f && t === v
    }

        function B(t, n, o) {
        for (var r = t; r && !function () {
        if (!1 === u(r)) return !1;
        var e = D(r, t), e = F(r, e, n, o);
        if (A(r, e)) return !0;
        return y.accepts(s, r, f, e)
    }();) r = Q(r);
        return r
    }

        function P(e) {
        if (l) {
        e.preventDefault();
        var t = ee("clientX", e) || 0, n = ee("clientY", e) || 0, o = t - d, r = n - m;
        l.style.left = o + "px", l.style.top = r + "px";
        var i = h || s, e = H(l, t, n), o = B(e, t, n), u = null !== o && o !== g;
        !u && null !== o || (g && a("out"), g = o, u && a("over"));
        r = Q(i);
        if (o !== f || !h || y.copySortSource) {
        var c, e = D(o, e);
        if (null !== e) c = F(o, e, t, n); else {
        if (!0 !== y.revertOnSpill || h) return void (h && r && r.removeChild(i));
        c = v, o = f
    }
        (null === c && u || c !== i && c !== Z(i)) && (p = c, o.insertBefore(i, c), w.emit("shadow", i, o, f))
    } else r && r.removeChild(i)
    }

        function a(e) {
        w.emit(e, i, g, f)
    }
    }

        function D(e, t) {
        for (var n = t; n !== e && Q(n) !== e;) n = Q(n);
        return n === q ? null : n
    }

        function F(r, t, i, u) {
        var c = "horizontal" === y.direction;
        return (t !== r ? function () {
        var e = t.getBoundingClientRect();
        if (c) return n(i > e.left + G(e) / 2);
        return n(u > e.top + J(e) / 2)
    } : function () {
        var e, t, n, o = r.children.length;
        for (e = 0; e < o; e++) {
        if (t = r.children[e], n = t.getBoundingClientRect(), c && n.left + n.width / 2 > i) return t;
        if (!c && n.top + n.height / 2 > u) return t
    }
        return null
    })();

        function n(e) {
        return e ? Z(t) : t
    }
    }
    }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {"./classes": 1, "contra/emitter": 5, crossvent: 6}], 3: [function (e, t, n) {
        t.exports = function (e, t) {
        return Array.prototype.slice.call(e, t)
    }
    }, {}], 4: [function (e, t, n) {
        "use strict";
        var o = e("ticky");
        t.exports = function (e, t, n) {
        e && o(function () {
        e.apply(n || null, t || [])
    })
    }
    }, {ticky: 10}], 5: [function (e, t, n) {
        "use strict";
        var c = e("atoa"), a = e("./debounce");
        t.exports = function (r, e) {
        var i = e || {}, u = {};
        return void 0 === r && (r = {}), r.on = function (e, t) {
        return u[e] ? u[e].push(t) : u[e] = [t], r
    }, r.once = function (e, t) {
        return t._once = !0, r.on(e, t), r
    }, r.off = function (e, t) {
        var n = arguments.length;
        if (1 === n) delete u[e]; else if (0 === n) u = {}; else {
        e = u[e];
        if (!e) return r;
        e.splice(e.indexOf(t), 1)
    }
        return r
    }, r.emit = function () {
        var e = c(arguments);
        return r.emitterSnapshot(e.shift()).apply(this, e)
    }, r.emitterSnapshot = function (o) {
        var e = (u[o] || []).slice(0);
        return function () {
        var t = c(arguments), n = this || r;
        if ("error" === o && !1 !== i.throws && !e.length) throw 1 === t.length ? t[0] : t;
        return e.forEach(function (e) {
        i.async ? a(e, t, n) : e.apply(n, t), e._once && r.off(o, e)
    }), r
    }
    }, r
    }
    }, {"./debounce": 4, atoa: 3}], 6: [function (n, o, e) {
        (function (r) {
        "use strict";
        var i = n("custom-event"), u = n("./eventmap"), c = r.document, e = function (e, t, n, o) {
        return e.addEventListener(t, n, o)
    }, t = function (e, t, n, o) {
        return e.removeEventListener(t, n, o)
    }, a = [];

        function l(e, t, n) {
        t = function (e, t, n) {
        var o, r;
        for (o = 0; o < a.length; o++) if ((r = a[o]).element === e && r.type === t && r.fn === n) return o
    }(e, t, n);
        if (t) {
        n = a[t].wrapper;
        return a.splice(t, 1), n
    }
    }

        r.addEventListener || (e = function (e, t, n) {
        return e.attachEvent("on" + t, function (e, t, n) {
        var o = l(e, t, n) || function (n, o) {
        return function (e) {
        var t = e || r.event;
        t.target = t.target || t.srcElement, t.preventDefault = t.preventDefault || function () {
        t.returnValue = !1
    }, t.stopPropagation = t.stopPropagation || function () {
        t.cancelBubble = !0
    }, t.which = t.which || t.keyCode, o.call(n, t)
    }
    }(e, n);
        return a.push({wrapper: o, element: e, type: t, fn: n}), o
    }(e, t, n))
    }, t = function (e, t, n) {
        n = l(e, t, n);
        if (n) return e.detachEvent("on" + t, n)
    }), o.exports = {
        add: e, remove: t, fabricate: function (e, t, n) {
        var o = -1 === u.indexOf(t) ? new i(t, {detail: n}) : function () {
        var e;
        c.createEvent ? (e = c.createEvent("Event")).initEvent(t, !0, !0) : c.createEventObject && (e = c.createEventObject());
        return e
    }();
        e.dispatchEvent ? e.dispatchEvent(o) : e.fireEvent("on" + t, o)
    }
    }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {"./eventmap": 7, "custom-event": 8}], 7: [function (e, r, t) {
        (function (e) {
        "use strict";
        var t = [], n = "", o = /^on/;
        for (n in e) o.test(n) && t.push(n.slice(2));
        r.exports = t
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 8: [function (e, n, t) {
        (function (e) {
        var t = e.CustomEvent;
        n.exports = function () {
        try {
        var e = new t("cat", {detail: {foo: "bar"}});
        return "cat" === e.type && "bar" === e.detail.foo
    } catch (e) {
    }
    }() ? t : "undefined" != typeof document && "function" == typeof document.createEvent ? function (e, t) {
        var n = document.createEvent("CustomEvent");
        return t ? n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail) : n.initCustomEvent(e, !1, !1, void 0), n
    } : function (e, t) {
        var n = document.createEventObject();
        return n.type = e, t ? (n.bubbles = Boolean(t.bubbles), n.cancelable = Boolean(t.cancelable), n.detail = t.detail) : (n.bubbles = !1, n.cancelable = !1, n.detail = void 0), n
    }
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 9: [function (e, t, n) {
        var o, r, t = t.exports = {};

        function i() {
        throw new Error("setTimeout has not been defined")
    }

        function u() {
        throw new Error("clearTimeout has not been defined")
    }

        function c(t) {
        if (o === setTimeout) return setTimeout(t, 0);
        if ((o === i || !o) && setTimeout) return o = setTimeout, setTimeout(t, 0);
        try {
        return o(t, 0)
    } catch (e) {
        try {
        return o.call(null, t, 0)
    } catch (e) {
        return o.call(this, t, 0)
    }
    }
    }

        !function () {
        try {
        o = "function" == typeof setTimeout ? setTimeout : i
    } catch (e) {
        o = i
    }
        try {
        r = "function" == typeof clearTimeout ? clearTimeout : u
    } catch (e) {
        r = u
    }
    }();
        var a, l = [], f = !1, s = -1;

        function d() {
        f && a && (f = !1, a.length ? l = a.concat(l) : s = -1, l.length && m())
    }

        function m() {
        if (!f) {
        var e = c(d);
        f = !0;
        for (var t = l.length; t;) {
        for (a = l, l = []; ++s < t;) a && a[s].run();
        s = -1, t = l.length
    }
        a = null, f = !1, function (t) {
        if (r === clearTimeout) return clearTimeout(t);
        if ((r === u || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
        try {
        r(t)
    } catch (e) {
        try {
        return r.call(null, t)
    } catch (e) {
        return r.call(this, t)
    }
    }
    }(e)
    }
    }

        function v(e, t) {
        this.fun = e, this.array = t
    }

        function p() {
    }

        t.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (1 < arguments.length) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        l.push(new v(e, t)), 1 !== l.length || f || c(m)
    }, v.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, t.title = "browser", t.browser = !0, t.env = {}, t.argv = [], t.version = "", t.versions = {}, t.on = p, t.addListener = p, t.once = p, t.off = p, t.removeListener = p, t.removeAllListeners = p, t.emit = p, t.prependListener = p, t.prependOnceListener = p, t.listeners = function (e) {
        return []
    }, t.binding = function (e) {
        throw new Error("process.binding is not supported")
    }, t.cwd = function () {
        return "/"
    }, t.chdir = function (e) {
        throw new Error("process.chdir is not supported")
    }, t.umask = function () {
        return 0
    }
    }, {}], 10: [function (e, n, t) {
        (function (t) {
        var e = "function" == typeof t ? function (e) {
        t(e)
    } : function (e) {
        setTimeout(e, 0)
    };
        n.exports = e
    }).call(this, e("timers").setImmediate)
    }, {timers: 11}], 11: [function (a, e, l) {
        (function (e, t) {
        var o = a("process/browser.js").nextTick, n = Function.prototype.apply, r = Array.prototype.slice,
        i = {}, u = 0;

        function c(e, t) {
        this._id = e, this._clearFn = t
    }

        l.setTimeout = function () {
        return new c(n.call(setTimeout, window, arguments), clearTimeout)
    }, l.setInterval = function () {
        return new c(n.call(setInterval, window, arguments), clearInterval)
    }, l.clearTimeout = l.clearInterval = function (e) {
        e.close()
    }, c.prototype.unref = c.prototype.ref = function () {
    }, c.prototype.close = function () {
        this._clearFn.call(window, this._id)
    }, l.enroll = function (e, t) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = t
    }, l.unenroll = function (e) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
    }, l._unrefActive = l.active = function (e) {
        clearTimeout(e._idleTimeoutId);
        var t = e._idleTimeout;
        0 <= t && (e._idleTimeoutId = setTimeout(function () {
        e._onTimeout && e._onTimeout()
    }, t))
    }, l.setImmediate = "function" == typeof e ? e : function (e) {
        var t = u++, n = !(arguments.length < 2) && r.call(arguments, 1);
        return i[t] = !0, o(function () {
        i[t] && (n ? e.apply(null, n) : e.call(null), l.clearImmediate(t))
    }), t
    }, l.clearImmediate = "function" == typeof t ? t : function (e) {
        delete i[e]
    }
    }).call(this, a("timers").setImmediate, a("timers").clearImmediate)
    }, {"process/browser.js": 9, timers: 11}]
    }, {}, [2])(2)
    });
