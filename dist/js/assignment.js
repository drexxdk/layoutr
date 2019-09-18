/*! Sortable 1.7.0 - MIT | git://github.com/rubaxa/Sortable.git */

!function (t) { "use strict"; "function" == typeof define && define.amd ? define(t) : "undefined" != typeof module && void 0 !== module.exports ? module.exports = t() : window.Sortable = t() }(function () { "use strict"; function t(e, n) { if (!e || !e.nodeType || 1 !== e.nodeType) throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(e); this.el = e, this.options = n = g({}, n), e[j] = this; var i = { group: null, sort: !0, disabled: !1, store: null, handle: null, scroll: !0, scrollSensitivity: 30, scrollSpeed: 10, draggable: /[uo]l/i.test(e.nodeName) ? "li" : ">*", ghostClass: "sortable-ghost", chosenClass: "sortable-chosen", dragClass: "sortable-drag", ignore: "a, img", filter: null, preventOnFilter: !0, animation: 0, setData: function (t, e) { t.setData("Text", e.textContent) }, dropBubble: !1, dragoverBubble: !1, dataIdAttr: "data-id", delay: 0, forceFallback: !1, fallbackClass: "sortable-fallback", fallbackOnBody: !1, fallbackTolerance: 0, fallbackOffset: { x: 0, y: 0 }, supportPointer: !1 !== t.supportPointer }; for (var r in i) !(r in n) && (n[r] = i[r]); rt(n); for (var a in this) "_" === a.charAt(0) && "function" == typeof this[a] && (this[a] = this[a].bind(this)); this.nativeDraggable = !n.forceFallback && Z, o(e, "mousedown", this._onTapStart), o(e, "touchstart", this._onTapStart), n.supportPointer && o(e, "pointerdown", this._onTapStart), this.nativeDraggable && (o(e, "dragover", this), o(e, "dragenter", this)), nt.push(this._onDragOver), n.store && this.sort(n.store.get(this)) } function e(t, e) { "clone" !== t.lastPullMode && (e = !0), w && w.state !== e && (a(w, "display", e ? "none" : ""), e || w.state && (t.options.group.revertClone ? (T.insertBefore(w, C), t._animate(b, w)) : T.insertBefore(w, b)), w.state = e) } function n(t, e, n) { if (t) { n = n || W; do { if (">*" === e && t.parentNode === n || f(t, e)) return t } while (t = function (t) { var e = t.host; return e && e.nodeType ? e : t.parentNode }(t)) } return null } function o(t, e, n) { t.addEventListener(e, n, Q) } function i(t, e, n) { t.removeEventListener(e, n, Q) } function r(t, e, n) { if (t) if (t.classList) t.classList[n ? "add" : "remove"](e); else { var o = (" " + t.className + " ").replace(F, " ").replace(" " + e + " ", " "); t.className = (o + (n ? " " + e : "")).replace(F, " ") } } function a(t, e, n) { var o = t && t.style; if (o) { if (void 0 === n) return W.defaultView && W.defaultView.getComputedStyle ? n = W.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), void 0 === e ? n : n[e]; e in o || (e = "-webkit-" + e), o[e] = n + ("string" == typeof n ? "" : "px") } } function l(t, e, n) { if (t) { var o = t.getElementsByTagName(e), i = 0, r = o.length; if (n) for (; i < r; i++)n(o[i], i); return o } return [] } function s(t, e, n, o, i, r, a, l) { t = t || e[j]; var s = W.createEvent("Event"), c = t.options, d = "on" + n.charAt(0).toUpperCase() + n.substr(1); s.initEvent(n, !0, !0), s.to = i || e, s.from = r || e, s.item = o || e, s.clone = w, s.oldIndex = a, s.newIndex = l, e.dispatchEvent(s), c[d] && c[d].call(t, s) } function c(t, e, n, o, i, r, a, l) { var s, c, d = t[j], h = d.options.onMove; return (s = W.createEvent("Event")).initEvent("move", !0, !0), s.to = e, s.from = t, s.dragged = n, s.draggedRect = o, s.related = i || e, s.relatedRect = r || e.getBoundingClientRect(), s.willInsertAfter = l, t.dispatchEvent(s), h && (c = h.call(d, s, a)), c } function d(t) { t.draggable = !1 } function h() { K = !1 } function u(t, e) { var n = 0; if (!t || !t.parentNode) return -1; for (; t && (t = t.previousElementSibling);)"TEMPLATE" === t.nodeName.toUpperCase() || ">*" !== e && !f(t, e) || n++; return n } function f(t, e) { if (t) { var n = (e = e.split(".")).shift().toUpperCase(), o = new RegExp("\\s(" + e.join("|") + ")(?=\\s)", "g"); return !("" !== n && t.nodeName.toUpperCase() != n || e.length && ((" " + t.className + " ").match(o) || []).length != e.length) } return !1 } function p(t, e) { var n, o; return function () { void 0 === n && (n = arguments, o = this, q(function () { 1 === n.length ? t.call(o, n[0]) : t.apply(o, n), n = void 0 }, e)) } } function g(t, e) { if (t && e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]); return t } function v(t) { return G && G.dom ? G.dom(t).cloneNode(!0) : z ? z(t).clone(!0)[0] : t.cloneNode(!0) } function m(t) { return q(t, 0) } function _(t) { return clearTimeout(t) } if ("undefined" == typeof window || !window.document) return function () { throw new Error("Sortable.js requires a window with a document") }; var b, D, y, w, T, C, S, E, x, N, k, B, P, Y, X, O, I, R, A, M, L = {}, F = /\s+/g, U = /left|right|inline/, j = "Sortable" + (new Date).getTime(), H = window, W = H.document, V = H.parseInt, q = H.setTimeout, z = H.jQuery || H.Zepto, G = H.Polymer, Q = !1, Z = "draggable" in W.createElement("div"), J = function (t) { return !navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i) && (t = W.createElement("x"), t.style.cssText = "pointer-events:auto", "auto" === t.style.pointerEvents) }(), K = !1, $ = Math.abs, tt = Math.min, et = [], nt = [], ot = function () { return !1 }, it = p(function (t, e, n) { if (n && e.scroll) { var o, i, r, a, l, s, c = n[j], d = e.scrollSensitivity, h = e.scrollSpeed, u = t.clientX, f = t.clientY, p = window.innerWidth, g = window.innerHeight; if (x !== n && (E = e.scroll, x = n, N = e.scrollFn, !0 === E)) { E = n; do { if (E.offsetWidth < E.scrollWidth || E.offsetHeight < E.scrollHeight) break } while (E = E.parentNode) } E && (o = E, i = E.getBoundingClientRect(), r = ($(i.right - u) <= d) - ($(i.left - u) <= d), a = ($(i.bottom - f) <= d) - ($(i.top - f) <= d)), r || a || (a = (g - f <= d) - (f <= d), ((r = (p - u <= d) - (u <= d)) || a) && (o = H)), L.vx === r && L.vy === a && L.el === o || (L.el = o, L.vx = r, L.vy = a, clearInterval(L.pid), o && (L.pid = setInterval(function () { if (s = a ? a * h : 0, l = r ? r * h : 0, "function" == typeof N) return N.call(c, l, s, t); o === H ? H.scrollTo(H.pageXOffset + l, H.pageYOffset + s) : (o.scrollTop += s, o.scrollLeft += l) }, 24))) } }, 30), rt = function (t) { function e(t, e) { return null != t && !0 !== t || null != (t = n.name) ? "function" == typeof t ? t : function (n, o) { var i = o.options.group.name; return e ? t : t && (t.join ? t.indexOf(i) > -1 : i == t) } : ot } var n = {}, o = t.group; o && "object" == typeof o || (o = { name: o }), n.name = o.name, n.checkPull = e(o.pull, !0), n.checkPut = e(o.put), n.revertClone = o.revertClone, t.group = n }; try { window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function () { Q = { capture: !1, passive: !1 } } })) } catch (t) { } return t.prototype = { constructor: t, _onTapStart: function (t) { var e, o = this, i = this.el, r = this.options, a = r.preventOnFilter, l = t.type, c = t.touches && t.touches[0], d = (c || t).target, h = t.target.shadowRoot && t.path && t.path[0] || d, f = r.filter; if (function (t) { et.length = 0; for (var e = t.getElementsByTagName("input"), n = e.length; n--;) { var o = e[n]; o.checked && et.push(o) } }(i), !b && !(/mousedown|pointerdown/.test(l) && 0 !== t.button || r.disabled) && !h.isContentEditable && (d = n(d, r.draggable, i)) && S !== d) { if (e = u(d, r.draggable), "function" == typeof f) { if (f.call(this, t, d, this)) return s(o, h, "filter", d, i, i, e), void (a && t.preventDefault()) } else if (f && (f = f.split(",").some(function (t) { if (t = n(h, t.trim(), i)) return s(o, t, "filter", d, i, i, e), !0 }))) return void (a && t.preventDefault()); r.handle && !n(h, r.handle, i) || this._prepareDragStart(t, c, d, e) } }, _prepareDragStart: function (t, e, n, i) { var a, c = this, h = c.el, u = c.options, f = h.ownerDocument; n && !b && n.parentNode === h && (R = t, T = h, D = (b = n).parentNode, C = b.nextSibling, S = n, O = u.group, Y = i, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, b.style["will-change"] = "all", a = function () { c._disableDelayedDrag(), b.draggable = c.nativeDraggable, r(b, u.chosenClass, !0), c._triggerDragStart(t, e), s(c, T, "choose", b, T, T, Y) }, u.ignore.split(",").forEach(function (t) { l(b, t.trim(), d) }), o(f, "mouseup", c._onDrop), o(f, "touchend", c._onDrop), o(f, "touchcancel", c._onDrop), o(f, "selectstart", c), u.supportPointer && o(f, "pointercancel", c._onDrop), u.delay ? (o(f, "mouseup", c._disableDelayedDrag), o(f, "touchend", c._disableDelayedDrag), o(f, "touchcancel", c._disableDelayedDrag), o(f, "mousemove", c._disableDelayedDrag), o(f, "touchmove", c._disableDelayedDrag), u.supportPointer && o(f, "pointermove", c._disableDelayedDrag), c._dragStartTimer = q(a, u.delay)) : a()) }, _disableDelayedDrag: function () { var t = this.el.ownerDocument; clearTimeout(this._dragStartTimer), i(t, "mouseup", this._disableDelayedDrag), i(t, "touchend", this._disableDelayedDrag), i(t, "touchcancel", this._disableDelayedDrag), i(t, "mousemove", this._disableDelayedDrag), i(t, "touchmove", this._disableDelayedDrag), i(t, "pointermove", this._disableDelayedDrag) }, _triggerDragStart: function (t, e) { (e = e || ("touch" == t.pointerType ? t : null)) ? (R = { target: b, clientX: e.clientX, clientY: e.clientY }, this._onDragStart(R, "touch")) : this.nativeDraggable ? (o(b, "dragend", this), o(T, "dragstart", this._onDragStart)) : this._onDragStart(R, !0); try { W.selection ? m(function () { W.selection.empty() }) : window.getSelection().removeAllRanges() } catch (t) { } }, _dragStarted: function () { if (T && b) { var e = this.options; r(b, e.ghostClass, !0), r(b, e.dragClass, !1), t.active = this, s(this, T, "start", b, T, T, Y) } else this._nulling() }, _emulateDragOver: function () { if (A) { if (this._lastX === A.clientX && this._lastY === A.clientY) return; this._lastX = A.clientX, this._lastY = A.clientY, J || a(y, "display", "none"); var t = W.elementFromPoint(A.clientX, A.clientY), e = t, n = nt.length; if (t && t.shadowRoot && (e = t = t.shadowRoot.elementFromPoint(A.clientX, A.clientY)), e) do { if (e[j]) { for (; n--;)nt[n]({ clientX: A.clientX, clientY: A.clientY, target: t, rootEl: e }); break } t = e } while (e = e.parentNode); J || a(y, "display", "") } }, _onTouchMove: function (e) { if (R) { var n = this.options, o = n.fallbackTolerance, i = n.fallbackOffset, r = e.touches ? e.touches[0] : e, l = r.clientX - R.clientX + i.x, s = r.clientY - R.clientY + i.y, c = e.touches ? "translate3d(" + l + "px," + s + "px,0)" : "translate(" + l + "px," + s + "px)"; if (!t.active) { if (o && tt($(r.clientX - this._lastX), $(r.clientY - this._lastY)) < o) return; this._dragStarted() } this._appendGhost(), M = !0, A = r, a(y, "webkitTransform", c), a(y, "mozTransform", c), a(y, "msTransform", c), a(y, "transform", c), e.preventDefault() } }, _appendGhost: function () { if (!y) { var t, e = b.getBoundingClientRect(), n = a(b), o = this.options; r(y = b.cloneNode(!0), o.ghostClass, !1), r(y, o.fallbackClass, !0), r(y, o.dragClass, !0), a(y, "top", e.top - V(n.marginTop, 10)), a(y, "left", e.left - V(n.marginLeft, 10)), a(y, "width", e.width), a(y, "height", e.height), a(y, "opacity", "0.8"), a(y, "position", "fixed"), a(y, "zIndex", "100000"), a(y, "pointerEvents", "none"), o.fallbackOnBody && W.body.appendChild(y) || T.appendChild(y), t = y.getBoundingClientRect(), a(y, "width", 2 * e.width - t.width), a(y, "height", 2 * e.height - t.height) } }, _onDragStart: function (t, e) { var n = this, i = t.dataTransfer, l = n.options; n._offUpEvents(), O.checkPull(n, n, b, t) && ((w = v(b)).draggable = !1, w.style["will-change"] = "", a(w, "display", "none"), r(w, n.options.chosenClass, !1), n._cloneId = m(function () { T.insertBefore(w, b), s(n, T, "clone", b) })), r(b, l.dragClass, !0), e ? ("touch" === e ? (o(W, "touchmove", n._onTouchMove), o(W, "touchend", n._onDrop), o(W, "touchcancel", n._onDrop), l.supportPointer && (o(W, "pointermove", n._onTouchMove), o(W, "pointerup", n._onDrop))) : (o(W, "mousemove", n._onTouchMove), o(W, "mouseup", n._onDrop)), n._loopId = setInterval(n._emulateDragOver, 50)) : (i && (i.effectAllowed = "move", l.setData && l.setData.call(n, i, b)), o(W, "drop", n), n._dragStartId = m(n._dragStarted)) }, _onDragOver: function (o) { var i, r, l, s, d = this.el, u = this.options, f = u.group, p = t.active, g = O === f, v = !1, m = u.sort; if (void 0 !== o.preventDefault && (o.preventDefault(), !u.dragoverBubble && o.stopPropagation()), !b.animated && (M = !0, p && !u.disabled && (g ? m || (s = !T.contains(b)) : I === this || (p.lastPullMode = O.checkPull(this, p, b, o)) && f.checkPut(this, p, b, o)) && (void 0 === o.rootEl || o.rootEl === this.el))) { if (it(o, u, this.el), K) return; if (i = n(o.target, u.draggable, d), r = b.getBoundingClientRect(), I !== this && (I = this, v = !0), s) return e(p, !0), D = T, void (w || C ? T.insertBefore(b, w || C) : m || T.appendChild(b)); if (0 === d.children.length || d.children[0] === y || d === o.target && function (t, e) { var n = t.lastElementChild.getBoundingClientRect(); return e.clientY - (n.top + n.height) > 5 || e.clientX - (n.left + n.width) > 5 }(d, o)) { if (0 !== d.children.length && d.children[0] !== y && d === o.target && (i = d.lastElementChild), i) { if (i.animated) return; l = i.getBoundingClientRect() } e(p, g), !1 !== c(T, d, b, r, i, l, o) && (b.contains(d) || (d.appendChild(b), D = d), this._animate(r, b), i && this._animate(l, i)) } else if (i && !i.animated && i !== b && void 0 !== i.parentNode[j]) { k !== i && (k = i, B = a(i), P = a(i.parentNode)); var _ = (l = i.getBoundingClientRect()).right - l.left, S = l.bottom - l.top, E = U.test(B.cssFloat + B.display) || "flex" == P.display && 0 === P["flex-direction"].indexOf("row"), x = i.offsetWidth > b.offsetWidth, N = i.offsetHeight > b.offsetHeight, Y = (E ? (o.clientX - l.left) / _ : (o.clientY - l.top) / S) > .5, X = i.nextElementSibling, R = !1; if (E) { var A = b.offsetTop, L = i.offsetTop; R = A === L ? i.previousElementSibling === b && !x || Y && x : i.previousElementSibling === b || b.previousElementSibling === i ? (o.clientY - l.top) / S > .5 : L > A } else v || (R = X !== b && !N || Y && N); var F = c(T, d, b, r, i, l, o, R); !1 !== F && (1 !== F && -1 !== F || (R = 1 === F), K = !0, q(h, 30), e(p, g), b.contains(d) || (R && !X ? d.appendChild(b) : i.parentNode.insertBefore(b, R ? X : i)), D = b.parentNode, this._animate(r, b), this._animate(l, i)) } } }, _animate: function (t, e) { var n = this.options.animation; if (n) { var o = e.getBoundingClientRect(); 1 === t.nodeType && (t = t.getBoundingClientRect()), a(e, "transition", "none"), a(e, "transform", "translate3d(" + (t.left - o.left) + "px," + (t.top - o.top) + "px,0)"), e.offsetWidth, a(e, "transition", "all " + n + "ms"), a(e, "transform", "translate3d(0,0,0)"), clearTimeout(e.animated), e.animated = q(function () { a(e, "transition", ""), a(e, "transform", ""), e.animated = !1 }, n) } }, _offUpEvents: function () { var t = this.el.ownerDocument; i(W, "touchmove", this._onTouchMove), i(W, "pointermove", this._onTouchMove), i(t, "mouseup", this._onDrop), i(t, "touchend", this._onDrop), i(t, "pointerup", this._onDrop), i(t, "touchcancel", this._onDrop), i(t, "pointercancel", this._onDrop), i(t, "selectstart", this) }, _onDrop: function (e) { var n = this.el, o = this.options; clearInterval(this._loopId), clearInterval(L.pid), clearTimeout(this._dragStartTimer), _(this._cloneId), _(this._dragStartId), i(W, "mouseover", this), i(W, "mousemove", this._onTouchMove), this.nativeDraggable && (i(W, "drop", this), i(n, "dragstart", this._onDragStart)), this._offUpEvents(), e && (M && (e.preventDefault(), !o.dropBubble && e.stopPropagation()), y && y.parentNode && y.parentNode.removeChild(y), T !== D && "clone" === t.active.lastPullMode || w && w.parentNode && w.parentNode.removeChild(w), b && (this.nativeDraggable && i(b, "dragend", this), d(b), b.style["will-change"] = "", r(b, this.options.ghostClass, !1), r(b, this.options.chosenClass, !1), s(this, T, "unchoose", b, D, T, Y), T !== D ? (X = u(b, o.draggable)) >= 0 && (s(null, D, "add", b, D, T, Y, X), s(this, T, "remove", b, D, T, Y, X), s(null, D, "sort", b, D, T, Y, X), s(this, T, "sort", b, D, T, Y, X)) : b.nextSibling !== C && (X = u(b, o.draggable)) >= 0 && (s(this, T, "update", b, D, T, Y, X), s(this, T, "sort", b, D, T, Y, X)), t.active && (null != X && -1 !== X || (X = Y), s(this, T, "end", b, D, T, Y, X), this.save()))), this._nulling() }, _nulling: function () { T = b = D = y = C = w = S = E = x = R = A = M = X = k = B = I = O = t.active = null, et.forEach(function (t) { t.checked = !0 }), et.length = 0 }, handleEvent: function (t) { switch (t.type) { case "drop": case "dragend": this._onDrop(t); break; case "dragover": case "dragenter": b && (this._onDragOver(t), function (t) { t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.preventDefault() }(t)); break; case "mouseover": this._onDrop(t); break; case "selectstart": t.preventDefault() } }, toArray: function () { for (var t, e = [], o = this.el.children, i = 0, r = o.length, a = this.options; i < r; i++)n(t = o[i], a.draggable, this.el) && e.push(t.getAttribute(a.dataIdAttr) || function (t) { for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, o = 0; n--;)o += e.charCodeAt(n); return o.toString(36) }(t)); return e }, sort: function (t) { var e = {}, o = this.el; this.toArray().forEach(function (t, i) { var r = o.children[i]; n(r, this.options.draggable, o) && (e[t] = r) }, this), t.forEach(function (t) { e[t] && (o.removeChild(e[t]), o.appendChild(e[t])) }) }, save: function () { var t = this.options.store; t && t.set(this) }, closest: function (t, e) { return n(t, e || this.options.draggable, this.el) }, option: function (t, e) { var n = this.options; if (void 0 === e) return n[t]; n[t] = e, "group" === t && rt(n) }, destroy: function () { var t = this.el; t[j] = null, i(t, "mousedown", this._onTapStart), i(t, "touchstart", this._onTapStart), i(t, "pointerdown", this._onTapStart), this.nativeDraggable && (i(t, "dragover", this), i(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function (t) { t.removeAttribute("draggable") }), nt.splice(nt.indexOf(this._onDragOver), 1), this._onDrop(), this.el = t = null } }, o(W, "touchmove", function (e) { t.active && e.preventDefault() }), t.utils = { on: o, off: i, css: a, find: l, is: function (t, e) { return !!n(t, e, t) }, extend: g, throttle: p, closest: n, toggleClass: r, clone: v, index: u, nextTick: m, cancelNextTick: _ }, t.create = function (e, n) { return new t(e, n) }, t.version = "1.7.0", t });
{
    layoutr.checkAssignmentColor = (assignment) => {
        if (assignment.hasClass('color')) {
            let assignmentId = assignment.attr('data-id'),
                controls = assignment.find('.controls > button'),
                container = assignment.find('.flex-table'),
                items = container.children(),
                activeId = controls.filter(".active").attr('data-id'),
                correctSvg = '<svg focusable="false"><use xlink:href="#svg-checkmark"></use></svg>',
                wrongSvg = '<svg focusable="false"><use xlink:href="#svg-close"></use></svg>';

            let reset = () => {
                controls.filter('.eraser').addClass('active');
                controls.filter(':not(.eraser)').removeClass('active').empty();
                items.removeAttr('data-id');
                assignment.removeClass('validated');
            };

            let getCorrect = () => {
                // this should be retrieved with api call
                if (assignmentId === '1') {
                    return [
                        {
                            id: 'blue',
                            value: 3
                        },
                        {
                            id: 'green',
                            value: 2
                        },
                        {
                            id: 'red',
                            value: 4
                        }
                    ];
                } else if (assignmentId === '2') {
                    return [
                        {
                            id: 'orange',
                            value: 4
                        },
                        {
                            id: 'teal',
                            value: 2
                        }
                    ];
                }
            };

            let getItems = (id) => {
                let result = 0;
                items.each((i, data) => {
                    let $this = $(data),
                        itemId = $this.attr('data-id');
                    if (itemId !== undefined && id === itemId) {
                        result++;
                    }
                });
                return result;
            };

            assignment.on('click', 'button[type="submit"]', () => {
                if (!assignment.hasClass('validated')) {
                    assignment.addClass('validated');
                    let correct = getCorrect();
                    $(correct).each((i, data) => {
                        let selected = getItems(data.id),
                            append = data.value === selected ? correctSvg : wrongSvg;
                        controls.filter(`[data-id="${data.id}"]`).append(append);
                    });
                }
            });

            assignment.on('click', 'button[type="reset"]', () => {
                reset();
            });

            assignment.on('click', 'button.correct', () => {
                reset();
                assignment.addClass('validated');
                let correct = getCorrect();
                $(correct).each((i, data) => {
                    for (i = 0; i < data.value; i++) {
                        $(items.filter(':not([data-id])')[0]).attr('data-id', data.id);
                    }
                    controls.filter(`[data-id="${data.id}"]`).append(correctSvg);
                });
            });

            controls.on('click', (e) => {
                let $this = $(e.currentTarget);
                $this.addClass('active').siblings('.active').removeClass('active');
                activeId = $this.attr('data-id');
            });

            items.on('click', (e) => {
                let $this = $(e.currentTarget);
                $this.attr('data-id', activeId);
            });
        }
    };
}
{
    layoutr.checkAssignmentDragAndDrop = (assignment) => {
        if (assignment.hasClass('drag-and-drop')) {
            assignment.attr('data-moving', 0);
            let id = assignment.attr('data-id'),
                from = assignment.find('.from .container'),
                items = assignment.find('.item'),
                checkboxes = items.find('input[type=checkbox]');

            let getChecked = () => {
                return $($.map(checkboxes, (item) => {
                    if (item.checked) {
                        return item;
                    }
                }));
            };

            let reset = () => {
                items.removeClass('valid invalid');
                let checked = getChecked();
                if (checked.length) {
                    checked.prop('checked', false);
                }
                from.append(items);
                assignment.removeClass('validated moving');
                //items = items.shuffle();
            };

            let getCorrect = () => {
                // this should be retrieved with api call
                if (id === '1') {
                    return [
                        {
                            id: '1', // TV
                            items: ['5', '7']
                        },
                        {
                            id: '2', // Games
                            items: ['6', '8']
                        },
                        {
                            id: '3', // Music
                            items: ['2', '4']
                        },
                        {
                            id: '4', // Sport
                            items: ['1', '3']
                        }
                    ];
                }
            };
            if (bowser.desktop) {
                assignment.find('.container').each((i, container) => {
                    Sortable.create(container, {
                        group: 'container', draggable: ".item",
                        animation: 0,
                        scroll: false,
                        forceFallback: true,
                        fallbackOnBody: true,
                        chosenClass: 'drag-and-drop-sortable-chosen',
                        onAdd: (e) => {
                            setTimeout(() => {
                                let checked = getChecked();
                                if (checked.length) {
                                    checked.prop('checked', false);
                                    checked.parent().not(e.item).each((i, item) => {
                                        e.to.append(item);
                                    });
                                    assignment.removeClass('moving');
                                }
                            });
                        }
                    });
                });
            }

            assignment.on('click', '.item input[type="checkbox"]', (e) => {
                let $this = $(e.currentTarget),
                    item = $this.parents('.item'),
                    moving = parseInt(assignment.attr('data-moving'));
                if ($this.is(':checked')) {
                    moving++;
                    assignment.attr('data-moving', moving);
                    assignment.addClass('moving');
                } else {
                    moving--;
                    assignment.attr('data-moving', moving);
                    if (moving === 0) {
                        assignment.removeClass('moving');
                    }
                }
            });

            assignment.on('click', '.place', (e) => {
                let $this = $(e.currentTarget);
                assignment.removeClass('moving');
                let checked = getChecked();
                if (checked.length) {
                    checked.prop('checked', false);
                    $this.parent('.header').next().children('.container').append(checked.parent());
                }
            });

            assignment.on('click', 'button[type="submit"]', () => {
                if (!assignment.hasClass('validated')) {
                    let checked = getChecked();
                    if (checked.length) {
                        checked.prop('checked', false);
                    }
                    assignment.addClass('validated');
                    let correct = getCorrect();
                    $(correct).each((i, data) => {
                        let container = assignment.find(`.to .container[data-id="${data.id}"]`);
                        container.children().each((i, child) => {
                            let item = $(child);
                            if ($.inArray(item.attr('data-id'), data.items) !== -1) {
                                item.addClass('valid');
                            } else {
                                item.addClass('invalid');
                            }
                        });
                    });
                }
            });

            assignment.on('click', 'button[type="reset"]', () => {
                reset();
            });

            assignment.on('click', 'button.correct', () => {
                reset();
                assignment.addClass('validated');
                let correct = getCorrect();
                $(correct).each((i, data) => {
                    let container = assignment.find(`.to .container[data-id="${data.id}"]`);
                    $(data.items).each((j, id) => {
                        let item = layoutr.getAssignmentItem(items, id);
                        item.addClass('valid');
                        item.appendTo(container);
                    });
                });
            });
        }
    };
}
{
    layoutr.checkAssignmentSort = (assignment) => {
        if (assignment.hasClass('sort')) {
            let id = assignment.attr('data-id'),
                container = assignment.find('.container'),
                items = assignment.find('.item');
            Sortable.create(container[0], {
                draggable: ".item",
                animation: 0,
                scroll: false,
                forceFallback: true,
                fallbackOnBody: true,
                chosenClass: 'sort-sortable-chosen'
            });

            if (!container.hasClass('wrap')) {
                let checkWidth = () => {
                    container.css('height', container.height()).removeClass('column').addClass('row');
                    let containerLeft = container[0].getBoundingClientRect().left,
                        firstItem = container.find('> .item:first-child'),
                        firstItemLeft = firstItem[0].getBoundingClientRect().left - parseInt(firstItem.css('margin-left'));
                    if (firstItemLeft < containerLeft) {
                        container.removeClass('row').addClass('column');
                    }
                    container.css('height', '').addClass('checked');
                };

                checkWidth();

                $(window).bind('resize.assignmentSort', $.throttle(layoutr.throttleInterval, false, () => {
                    checkWidth();
                }));
            }

            let reset = () => {
                items.removeClass('valid invalid');
                assignment.removeClass('validated');
                items = items.shuffle();
            };

            let getCorrect = () => {
                // this should be retrieved with api call
                if (id === '1') {
                    return ['3', '1', '2', '5', '4', '7', '6', '8', '9'];
                } else if (id === '2') {
                    return ['4', '2', '1', '3'];
                }
            };

            assignment.on('click', 'button[type="submit"]', () => {
                if (!assignment.hasClass('validated')) {
                    assignment.addClass('validated');
                    let correct = getCorrect();
                    $(correct).each((i, id) => {
                        let item = layoutr.getAssignmentItem(items, id);
                        if (item.index() === i) {
                            item.addClass('valid');
                        } else {
                            item.addClass('invalid');
                        }
                    });
                }
            });

            assignment.on('click', 'button[type="reset"]', () => {
                reset();
            });

            let insertAtIndex = (i, item) => {
                if (i === 0) {
                    container.prepend(item);
                } else {
                    container.find(`> .item:nth-child(${i})`).after(item);
                }
            };

            assignment.on('click', 'button.correct', () => {
                reset();
                assignment.addClass('validated');
                let correct = getCorrect();
                $(correct).each((i, id) => {
                    let item = layoutr.getAssignmentItem(items, id);
                    item.addClass('valid');
                    insertAtIndex(i, item);
                });
            });
        }
    };
}
{
    layoutr.checkAssignmentPuzzle = (assignment) => {
        if (assignment.hasClass('puzzle')) {
            let id = assignment.attr('data-id'),
                image = assignment.attr('data-image'),
                tiles = layoutr.tryParseInt(assignment.attr('data-tiles'), 0),
                size = layoutr.tryParseInt(assignment.attr('data-size'), 0),
                random = layoutr.tryParseInt(assignment.attr('data-random'), 3),
                tile = 100 / tiles,
                total = tiles * tiles - 1,
                positions = [],
                items = [],
                movingItem = false,
                correct = [],
                transitionTime = 100,
                directions = {
                    up: 'up',
                    down: 'down',
                    left: 'left',
                    right: 'right'
                },
                current,
                movesUsed,
                lastMove,
                randomUsed,
                domContent,
                domStart,
                domGiveUp;

            {
                assignment.attr('data-state', 'initial');

                let html = 
`<div class="content" style="max-width: ${size}px; max-height: ${size}px">
    <div style="background-image: url(${image})"></div>
</div>
<div class="buttons">
    <div class="flex wrap gap-2">
        <button type="submit" class="btn start">Start</button>
        <button type="button" class="btn theme-secondary give-up">Give up</button>
    </div>
</div>`;
                assignment.append(html);

                domContent = assignment.find('.content > div');
                domStart = assignment.find('button.start');
                domGiveUp = assignment.find('button.give-up');

                domStart.click(() => {
                    start();
                });

                domGiveUp.click(() => {
                    if (!movingItem) {
                        reset();
                    }
                });
            }

            let shuffle = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };
            let setPositions = () => {
                positions = [];
                let count = 0;
                for (let i = 0; i <= tiles - 1; i++) {
                    for (let j = 0; j <= tiles - 1; j++) {
                        count++;
                        positions.push({
                            'id': count,
                            'top': i,
                            'left': j
                        });
                    }
                }
                shuffle(positions);
            };

            let setItems = () => {
                domContent.empty();
                for (let i = 0; i < total; i++) {
                    let html = 
`<div class="item"
    data-id="${positions[i].id}" 
    data-top="${positions[i].top}" 
    data-left="${positions[i].left}" 
    style="
    width: ${tile}%; 
    height: ${tile}%; 
    top: ${positions[i].top * tile}%; 
    left: ${positions[i].left * tile}%; 
">
    <div style="
        width: ${tiles * 100}%; 
        height: ${tiles * 100}%; 
        background-image: url(${image}); 
        margin-left: -${positions[i].left * tile * tiles}%; 
        margin-top: -${positions[i].top * tile * tiles}%; 
    "></div>
</div>`;
                    domContent.append(html);
                }
                items = domContent.children();
            };

            let setCurrent = () => {
                current = positions[total];
            };

            let setCorrect = () => {
                correct = [];
                items.each((i, e) => {
                    let item = $(items[i]);
                    correct.push({
                        'id': item.attr('data-id'),
                        'top': item.attr('data-top'),
                        'left': item.attr('data-left')
                    });
                });
            };

            let getItem = (direction) => {
                let top = current.top,
                    left = current.left;

                if (direction === directions.up) {
                    top = current.top + 1;
                } else if (direction === directions.down) {
                    top = current.top - 1;
                } else if (direction === directions.left) {
                    left = current.left + 1;
                } else if (direction === directions.right) {
                    left = current.left - 1;
                }
                return domContent.find(`.item[data-top="${top}"][data-left="${left}"]`);
            };

            let moveItem = (item, direction, initial = true) => {
                return new Promise((resolve, reject) => {
                    movingItem = true;
                    if (direction === directions.up) {
                        // move up
                        item.animate({
                            top: `${current.top * tile}%`
                        }, !initial ? transitionTime : 0, () => {
                            if (!initial) {
                                movesUsed++;
                            }
                            movingItem = false;
                            item.attr('data-top', parseInt(item.attr('data-top')) - 1);
                            current.top++;
                            setMovable();
                            resolve();
                        });
                    } else if (direction === directions.down) {
                        // move down
                        item.animate({
                            top: `${current.top * tile}%`
                        }, !initial ? transitionTime : 0, () => {
                            if (!initial) {
                                movesUsed++;
                            }
                            movingItem = false;
                            item.attr('data-top', parseInt(item.attr('data-top')) + 1);
                            current.top--;
                            setMovable();
                            resolve();
                        });
                    } else if (direction === directions.left) {
                        // move left
                        item.animate({
                            left: `${current.left * tile}%`
                        }, !initial ? transitionTime : 0, () => {
                            if (!initial) {
                                movesUsed++;
                            }
                            movingItem = false;
                            item.attr('data-left', parseInt(item.attr('data-left')) - 1);
                            current.left++;
                            setMovable();
                            resolve();
                        });
                    } else if (direction === directions.right) {
                        // move right
                        item.animate({
                            left: `${current.left * tile}%`
                        }, !initial ? transitionTime : 0, () => {
                            if (!initial) {
                                movesUsed++;
                            }
                            movingItem = false;
                            item.attr('data-left', parseInt(item.attr('data-left')) + 1);
                            current.left--;
                            setMovable();
                            resolve();
                        });
                    }
                });

            };

            let setMovable = () => {
                items.removeClass('movable');
                if (current.top !== 0) {
                    getItem(directions.down).addClass('movable');
                }
                if (current.top !== tiles - 1) {
                    getItem(directions.up).addClass('movable');
                }
                if (current.left !== 0) {
                    getItem(directions.right).addClass('movable');
                }
                if (current.left !== tiles - 1) {
                    getItem(directions.left).addClass('movable');
                }
            };

            let setRandom = () => {
                let direction = [];

                if (current.top !== 0 && lastMove !== directions.up) {
                    // can go down
                    direction.push(directions.down);
                }
                if (current.top !== tiles - 1 && lastMove !== directions.down) {
                    // can go up
                    direction.push(directions.up);
                }
                if (current.left !== 0 && lastMove !== directions.left) {
                    // can go right
                    direction.push(directions.right);
                }
                if (current.left !== tiles - 1 && lastMove !== directions.right) {
                    // can go left
                    direction.push(directions.left);
                }
                shuffle(direction);

                direction = direction[0];
                lastMove = direction;
                moveItem(getItem(direction), direction).then(() => {
                    randomUsed--;
                    if (randomUsed > 0) {
                        setRandom();
                    }
                });
            };


            let start = () => {
                layoutr.arrowKeyLocked = true;
                setPositions();
                setItems();
                setCurrent();
                setCorrect();

                movesUsed = 0;
                lastMove = undefined;
                randomUsed = random;

                setRandom();
                assignment.attr('data-state', 'start');
            };

            let reset = () => {
                layoutr.arrowKeyLocked = false;
                domContent.empty();
                assignment.attr('data-state', 'initial');
            };

            let checkSolved = () => {
                let solved = true;
                items.each((i, e) => {
                    let modified = {};

                    modified.item = $(e);
                    modified.id = modified.item.attr('data-id');
                    modified.top = modified.item.attr('data-top');
                    modified.left = modified.item.attr('data-left');

                    let original = $.grep(correct, (item) => {
                        return item.id === modified.id;
                    })[0];

                    if (original.top !== modified.top || original.left !== modified.left) {
                        solved = false;
                        return false;
                    }
                });
                if (solved) {
                    reset();

                    let html = 
`<div class="alert theme-success">
    <div>
        <h3 class="align-center">You Win</h3>
        <div class="table">
            <table>
                <tbody>
                    <tr><th>Moves used</th><td>${movesUsed}</td></tr>
                    <tr><th>Perfect moves</th><td>${random}</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>`;
                    domContent.append(html);
                }
            };

            assignment.on('click', '.item.movable', (e) => {
                if (assignment.attr('data-state') === 'start' && !movingItem) {
                    let item = $(e.target),
                        top = parseInt(item.attr('data-top')),
                        left = parseInt(item.attr('data-left'));

                    if (top === current.top + 1 && left === current.left) {
                        moveItem(item, directions.up, false).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top - 1 && left === current.left) {
                        moveItem(item, directions.down, false).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top && left === current.left + 1) {
                        moveItem(item, directions.left, false).then(() => {
                            checkSolved();
                        });
                    } else if (top === current.top && left === current.left - 1) {
                        moveItem(item, directions.right, false).then(() => {
                            checkSolved();
                        });
                    }
                }
            });

            layoutr.body.on('keydown.assignmentPuzzle', (e) => {
                if (assignment.attr('data-state') === 'start' && !movingItem) {
                    if (e.keyCode === 38 && current.top !== tiles - 1) {
                        e.preventDefault();
                        moveItem(getItem(directions.up), directions.up, false).then(() => {
                            checkSolved();
                        });
                    } else if (e.keyCode === 40 && current.top !== 0) {
                        e.preventDefault();
                        moveItem(getItem(directions.down), directions.down, false).then(() => {
                            checkSolved();
                        });
                    } else if (e.keyCode === 37 && current.left !== tiles - 1) {
                        e.preventDefault();
                        moveItem(getItem(directions.left), directions.left, false).then(() => {
                            checkSolved();
                        });
                    } else if (e.keyCode === 39 && current.left !== 0) {
                        e.preventDefault();
                        moveItem(getItem(directions.right), directions.right, false).then(() => {
                            checkSolved();
                        });
                    }
                }
            });
        } else {
            layoutr.arrowKeyLocked = false;
        }
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvcnRhYmxlLm1pbi5qcyIsImNvbG9yLmpzIiwiZHJhZ0FuZERyb3AuanMiLCJzb3J0LmpzIiwicHV6emxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFzc2lnbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgU29ydGFibGUgMS43LjAgLSBNSVQgfCBnaXQ6Ly9naXRodWIuY29tL3J1YmF4YS9Tb3J0YWJsZS5naXQgKi9cclxuXHJcbiFmdW5jdGlvbiAodCkgeyBcInVzZSBzdHJpY3RcIjsgXCJmdW5jdGlvblwiID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSh0KSA6IFwidW5kZWZpbmVkXCIgIT0gdHlwZW9mIG1vZHVsZSAmJiB2b2lkIDAgIT09IG1vZHVsZS5leHBvcnRzID8gbW9kdWxlLmV4cG9ydHMgPSB0KCkgOiB3aW5kb3cuU29ydGFibGUgPSB0KCkgfShmdW5jdGlvbiAoKSB7IFwidXNlIHN0cmljdFwiOyBmdW5jdGlvbiB0KGUsIG4pIHsgaWYgKCFlIHx8ICFlLm5vZGVUeXBlIHx8IDEgIT09IGUubm9kZVR5cGUpIHRocm93IFwiU29ydGFibGU6IGBlbGAgbXVzdCBiZSBIVE1MRWxlbWVudCwgYW5kIG5vdCBcIiArIHt9LnRvU3RyaW5nLmNhbGwoZSk7IHRoaXMuZWwgPSBlLCB0aGlzLm9wdGlvbnMgPSBuID0gZyh7fSwgbiksIGVbal0gPSB0aGlzOyB2YXIgaSA9IHsgZ3JvdXA6IG51bGwsIHNvcnQ6ICEwLCBkaXNhYmxlZDogITEsIHN0b3JlOiBudWxsLCBoYW5kbGU6IG51bGwsIHNjcm9sbDogITAsIHNjcm9sbFNlbnNpdGl2aXR5OiAzMCwgc2Nyb2xsU3BlZWQ6IDEwLCBkcmFnZ2FibGU6IC9bdW9dbC9pLnRlc3QoZS5ub2RlTmFtZSkgPyBcImxpXCIgOiBcIj4qXCIsIGdob3N0Q2xhc3M6IFwic29ydGFibGUtZ2hvc3RcIiwgY2hvc2VuQ2xhc3M6IFwic29ydGFibGUtY2hvc2VuXCIsIGRyYWdDbGFzczogXCJzb3J0YWJsZS1kcmFnXCIsIGlnbm9yZTogXCJhLCBpbWdcIiwgZmlsdGVyOiBudWxsLCBwcmV2ZW50T25GaWx0ZXI6ICEwLCBhbmltYXRpb246IDAsIHNldERhdGE6IGZ1bmN0aW9uICh0LCBlKSB7IHQuc2V0RGF0YShcIlRleHRcIiwgZS50ZXh0Q29udGVudCkgfSwgZHJvcEJ1YmJsZTogITEsIGRyYWdvdmVyQnViYmxlOiAhMSwgZGF0YUlkQXR0cjogXCJkYXRhLWlkXCIsIGRlbGF5OiAwLCBmb3JjZUZhbGxiYWNrOiAhMSwgZmFsbGJhY2tDbGFzczogXCJzb3J0YWJsZS1mYWxsYmFja1wiLCBmYWxsYmFja09uQm9keTogITEsIGZhbGxiYWNrVG9sZXJhbmNlOiAwLCBmYWxsYmFja09mZnNldDogeyB4OiAwLCB5OiAwIH0sIHN1cHBvcnRQb2ludGVyOiAhMSAhPT0gdC5zdXBwb3J0UG9pbnRlciB9OyBmb3IgKHZhciByIGluIGkpICEociBpbiBuKSAmJiAobltyXSA9IGlbcl0pOyBydChuKTsgZm9yICh2YXIgYSBpbiB0aGlzKSBcIl9cIiA9PT0gYS5jaGFyQXQoMCkgJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiB0aGlzW2FdICYmICh0aGlzW2FdID0gdGhpc1thXS5iaW5kKHRoaXMpKTsgdGhpcy5uYXRpdmVEcmFnZ2FibGUgPSAhbi5mb3JjZUZhbGxiYWNrICYmIFosIG8oZSwgXCJtb3VzZWRvd25cIiwgdGhpcy5fb25UYXBTdGFydCksIG8oZSwgXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuX29uVGFwU3RhcnQpLCBuLnN1cHBvcnRQb2ludGVyICYmIG8oZSwgXCJwb2ludGVyZG93blwiLCB0aGlzLl9vblRhcFN0YXJ0KSwgdGhpcy5uYXRpdmVEcmFnZ2FibGUgJiYgKG8oZSwgXCJkcmFnb3ZlclwiLCB0aGlzKSwgbyhlLCBcImRyYWdlbnRlclwiLCB0aGlzKSksIG50LnB1c2godGhpcy5fb25EcmFnT3ZlciksIG4uc3RvcmUgJiYgdGhpcy5zb3J0KG4uc3RvcmUuZ2V0KHRoaXMpKSB9IGZ1bmN0aW9uIGUodCwgZSkgeyBcImNsb25lXCIgIT09IHQubGFzdFB1bGxNb2RlICYmIChlID0gITApLCB3ICYmIHcuc3RhdGUgIT09IGUgJiYgKGEodywgXCJkaXNwbGF5XCIsIGUgPyBcIm5vbmVcIiA6IFwiXCIpLCBlIHx8IHcuc3RhdGUgJiYgKHQub3B0aW9ucy5ncm91cC5yZXZlcnRDbG9uZSA/IChULmluc2VydEJlZm9yZSh3LCBDKSwgdC5fYW5pbWF0ZShiLCB3KSkgOiBULmluc2VydEJlZm9yZSh3LCBiKSksIHcuc3RhdGUgPSBlKSB9IGZ1bmN0aW9uIG4odCwgZSwgbikgeyBpZiAodCkgeyBuID0gbiB8fCBXOyBkbyB7IGlmIChcIj4qXCIgPT09IGUgJiYgdC5wYXJlbnROb2RlID09PSBuIHx8IGYodCwgZSkpIHJldHVybiB0IH0gd2hpbGUgKHQgPSBmdW5jdGlvbiAodCkgeyB2YXIgZSA9IHQuaG9zdDsgcmV0dXJuIGUgJiYgZS5ub2RlVHlwZSA/IGUgOiB0LnBhcmVudE5vZGUgfSh0KSkgfSByZXR1cm4gbnVsbCB9IGZ1bmN0aW9uIG8odCwgZSwgbikgeyB0LmFkZEV2ZW50TGlzdGVuZXIoZSwgbiwgUSkgfSBmdW5jdGlvbiBpKHQsIGUsIG4pIHsgdC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIG4sIFEpIH0gZnVuY3Rpb24gcih0LCBlLCBuKSB7IGlmICh0KSBpZiAodC5jbGFzc0xpc3QpIHQuY2xhc3NMaXN0W24gPyBcImFkZFwiIDogXCJyZW1vdmVcIl0oZSk7IGVsc2UgeyB2YXIgbyA9IChcIiBcIiArIHQuY2xhc3NOYW1lICsgXCIgXCIpLnJlcGxhY2UoRiwgXCIgXCIpLnJlcGxhY2UoXCIgXCIgKyBlICsgXCIgXCIsIFwiIFwiKTsgdC5jbGFzc05hbWUgPSAobyArIChuID8gXCIgXCIgKyBlIDogXCJcIikpLnJlcGxhY2UoRiwgXCIgXCIpIH0gfSBmdW5jdGlvbiBhKHQsIGUsIG4pIHsgdmFyIG8gPSB0ICYmIHQuc3R5bGU7IGlmIChvKSB7IGlmICh2b2lkIDAgPT09IG4pIHJldHVybiBXLmRlZmF1bHRWaWV3ICYmIFcuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSA/IG4gPSBXLmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUodCwgXCJcIikgOiB0LmN1cnJlbnRTdHlsZSAmJiAobiA9IHQuY3VycmVudFN0eWxlKSwgdm9pZCAwID09PSBlID8gbiA6IG5bZV07IGUgaW4gbyB8fCAoZSA9IFwiLXdlYmtpdC1cIiArIGUpLCBvW2VdID0gbiArIChcInN0cmluZ1wiID09IHR5cGVvZiBuID8gXCJcIiA6IFwicHhcIikgfSB9IGZ1bmN0aW9uIGwodCwgZSwgbikgeyBpZiAodCkgeyB2YXIgbyA9IHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSksIGkgPSAwLCByID0gby5sZW5ndGg7IGlmIChuKSBmb3IgKDsgaSA8IHI7IGkrKyluKG9baV0sIGkpOyByZXR1cm4gbyB9IHJldHVybiBbXSB9IGZ1bmN0aW9uIHModCwgZSwgbiwgbywgaSwgciwgYSwgbCkgeyB0ID0gdCB8fCBlW2pdOyB2YXIgcyA9IFcuY3JlYXRlRXZlbnQoXCJFdmVudFwiKSwgYyA9IHQub3B0aW9ucywgZCA9IFwib25cIiArIG4uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuLnN1YnN0cigxKTsgcy5pbml0RXZlbnQobiwgITAsICEwKSwgcy50byA9IGkgfHwgZSwgcy5mcm9tID0gciB8fCBlLCBzLml0ZW0gPSBvIHx8IGUsIHMuY2xvbmUgPSB3LCBzLm9sZEluZGV4ID0gYSwgcy5uZXdJbmRleCA9IGwsIGUuZGlzcGF0Y2hFdmVudChzKSwgY1tkXSAmJiBjW2RdLmNhbGwodCwgcykgfSBmdW5jdGlvbiBjKHQsIGUsIG4sIG8sIGksIHIsIGEsIGwpIHsgdmFyIHMsIGMsIGQgPSB0W2pdLCBoID0gZC5vcHRpb25zLm9uTW92ZTsgcmV0dXJuIChzID0gVy5jcmVhdGVFdmVudChcIkV2ZW50XCIpKS5pbml0RXZlbnQoXCJtb3ZlXCIsICEwLCAhMCksIHMudG8gPSBlLCBzLmZyb20gPSB0LCBzLmRyYWdnZWQgPSBuLCBzLmRyYWdnZWRSZWN0ID0gbywgcy5yZWxhdGVkID0gaSB8fCBlLCBzLnJlbGF0ZWRSZWN0ID0gciB8fCBlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBzLndpbGxJbnNlcnRBZnRlciA9IGwsIHQuZGlzcGF0Y2hFdmVudChzKSwgaCAmJiAoYyA9IGguY2FsbChkLCBzLCBhKSksIGMgfSBmdW5jdGlvbiBkKHQpIHsgdC5kcmFnZ2FibGUgPSAhMSB9IGZ1bmN0aW9uIGgoKSB7IEsgPSAhMSB9IGZ1bmN0aW9uIHUodCwgZSkgeyB2YXIgbiA9IDA7IGlmICghdCB8fCAhdC5wYXJlbnROb2RlKSByZXR1cm4gLTE7IGZvciAoOyB0ICYmICh0ID0gdC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKTspXCJURU1QTEFURVwiID09PSB0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgfHwgXCI+KlwiICE9PSBlICYmICFmKHQsIGUpIHx8IG4rKzsgcmV0dXJuIG4gfSBmdW5jdGlvbiBmKHQsIGUpIHsgaWYgKHQpIHsgdmFyIG4gPSAoZSA9IGUuc3BsaXQoXCIuXCIpKS5zaGlmdCgpLnRvVXBwZXJDYXNlKCksIG8gPSBuZXcgUmVnRXhwKFwiXFxcXHMoXCIgKyBlLmpvaW4oXCJ8XCIpICsgXCIpKD89XFxcXHMpXCIsIFwiZ1wiKTsgcmV0dXJuICEoXCJcIiAhPT0gbiAmJiB0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT0gbiB8fCBlLmxlbmd0aCAmJiAoKFwiIFwiICsgdC5jbGFzc05hbWUgKyBcIiBcIikubWF0Y2gobykgfHwgW10pLmxlbmd0aCAhPSBlLmxlbmd0aCkgfSByZXR1cm4gITEgfSBmdW5jdGlvbiBwKHQsIGUpIHsgdmFyIG4sIG87IHJldHVybiBmdW5jdGlvbiAoKSB7IHZvaWQgMCA9PT0gbiAmJiAobiA9IGFyZ3VtZW50cywgbyA9IHRoaXMsIHEoZnVuY3Rpb24gKCkgeyAxID09PSBuLmxlbmd0aCA/IHQuY2FsbChvLCBuWzBdKSA6IHQuYXBwbHkobywgbiksIG4gPSB2b2lkIDAgfSwgZSkpIH0gfSBmdW5jdGlvbiBnKHQsIGUpIHsgaWYgKHQgJiYgZSkgZm9yICh2YXIgbiBpbiBlKSBlLmhhc093blByb3BlcnR5KG4pICYmICh0W25dID0gZVtuXSk7IHJldHVybiB0IH0gZnVuY3Rpb24gdih0KSB7IHJldHVybiBHICYmIEcuZG9tID8gRy5kb20odCkuY2xvbmVOb2RlKCEwKSA6IHogPyB6KHQpLmNsb25lKCEwKVswXSA6IHQuY2xvbmVOb2RlKCEwKSB9IGZ1bmN0aW9uIG0odCkgeyByZXR1cm4gcSh0LCAwKSB9IGZ1bmN0aW9uIF8odCkgeyByZXR1cm4gY2xlYXJUaW1lb3V0KHQpIH0gaWYgKFwidW5kZWZpbmVkXCIgPT0gdHlwZW9mIHdpbmRvdyB8fCAhd2luZG93LmRvY3VtZW50KSByZXR1cm4gZnVuY3Rpb24gKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJTb3J0YWJsZS5qcyByZXF1aXJlcyBhIHdpbmRvdyB3aXRoIGEgZG9jdW1lbnRcIikgfTsgdmFyIGIsIEQsIHksIHcsIFQsIEMsIFMsIEUsIHgsIE4sIGssIEIsIFAsIFksIFgsIE8sIEksIFIsIEEsIE0sIEwgPSB7fSwgRiA9IC9cXHMrL2csIFUgPSAvbGVmdHxyaWdodHxpbmxpbmUvLCBqID0gXCJTb3J0YWJsZVwiICsgKG5ldyBEYXRlKS5nZXRUaW1lKCksIEggPSB3aW5kb3csIFcgPSBILmRvY3VtZW50LCBWID0gSC5wYXJzZUludCwgcSA9IEguc2V0VGltZW91dCwgeiA9IEgualF1ZXJ5IHx8IEguWmVwdG8sIEcgPSBILlBvbHltZXIsIFEgPSAhMSwgWiA9IFwiZHJhZ2dhYmxlXCIgaW4gVy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLCBKID0gZnVuY3Rpb24gKHQpIHsgcmV0dXJuICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC8oPzpUcmlkZW50LipydlsgOl0/MTFcXC58bXNpZSkvaSkgJiYgKHQgPSBXLmNyZWF0ZUVsZW1lbnQoXCJ4XCIpLCB0LnN0eWxlLmNzc1RleHQgPSBcInBvaW50ZXItZXZlbnRzOmF1dG9cIiwgXCJhdXRvXCIgPT09IHQuc3R5bGUucG9pbnRlckV2ZW50cykgfSgpLCBLID0gITEsICQgPSBNYXRoLmFicywgdHQgPSBNYXRoLm1pbiwgZXQgPSBbXSwgbnQgPSBbXSwgb3QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAhMSB9LCBpdCA9IHAoZnVuY3Rpb24gKHQsIGUsIG4pIHsgaWYgKG4gJiYgZS5zY3JvbGwpIHsgdmFyIG8sIGksIHIsIGEsIGwsIHMsIGMgPSBuW2pdLCBkID0gZS5zY3JvbGxTZW5zaXRpdml0eSwgaCA9IGUuc2Nyb2xsU3BlZWQsIHUgPSB0LmNsaWVudFgsIGYgPSB0LmNsaWVudFksIHAgPSB3aW5kb3cuaW5uZXJXaWR0aCwgZyA9IHdpbmRvdy5pbm5lckhlaWdodDsgaWYgKHggIT09IG4gJiYgKEUgPSBlLnNjcm9sbCwgeCA9IG4sIE4gPSBlLnNjcm9sbEZuLCAhMCA9PT0gRSkpIHsgRSA9IG47IGRvIHsgaWYgKEUub2Zmc2V0V2lkdGggPCBFLnNjcm9sbFdpZHRoIHx8IEUub2Zmc2V0SGVpZ2h0IDwgRS5zY3JvbGxIZWlnaHQpIGJyZWFrIH0gd2hpbGUgKEUgPSBFLnBhcmVudE5vZGUpIH0gRSAmJiAobyA9IEUsIGkgPSBFLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCByID0gKCQoaS5yaWdodCAtIHUpIDw9IGQpIC0gKCQoaS5sZWZ0IC0gdSkgPD0gZCksIGEgPSAoJChpLmJvdHRvbSAtIGYpIDw9IGQpIC0gKCQoaS50b3AgLSBmKSA8PSBkKSksIHIgfHwgYSB8fCAoYSA9IChnIC0gZiA8PSBkKSAtIChmIDw9IGQpLCAoKHIgPSAocCAtIHUgPD0gZCkgLSAodSA8PSBkKSkgfHwgYSkgJiYgKG8gPSBIKSksIEwudnggPT09IHIgJiYgTC52eSA9PT0gYSAmJiBMLmVsID09PSBvIHx8IChMLmVsID0gbywgTC52eCA9IHIsIEwudnkgPSBhLCBjbGVhckludGVydmFsKEwucGlkKSwgbyAmJiAoTC5waWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IGlmIChzID0gYSA/IGEgKiBoIDogMCwgbCA9IHIgPyByICogaCA6IDAsIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgTikgcmV0dXJuIE4uY2FsbChjLCBsLCBzLCB0KTsgbyA9PT0gSCA/IEguc2Nyb2xsVG8oSC5wYWdlWE9mZnNldCArIGwsIEgucGFnZVlPZmZzZXQgKyBzKSA6IChvLnNjcm9sbFRvcCArPSBzLCBvLnNjcm9sbExlZnQgKz0gbCkgfSwgMjQpKSkgfSB9LCAzMCksIHJ0ID0gZnVuY3Rpb24gKHQpIHsgZnVuY3Rpb24gZSh0LCBlKSB7IHJldHVybiBudWxsICE9IHQgJiYgITAgIT09IHQgfHwgbnVsbCAhPSAodCA9IG4ubmFtZSkgPyBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIHQgPyB0IDogZnVuY3Rpb24gKG4sIG8pIHsgdmFyIGkgPSBvLm9wdGlvbnMuZ3JvdXAubmFtZTsgcmV0dXJuIGUgPyB0IDogdCAmJiAodC5qb2luID8gdC5pbmRleE9mKGkpID4gLTEgOiBpID09IHQpIH0gOiBvdCB9IHZhciBuID0ge30sIG8gPSB0Lmdyb3VwOyBvICYmIFwib2JqZWN0XCIgPT0gdHlwZW9mIG8gfHwgKG8gPSB7IG5hbWU6IG8gfSksIG4ubmFtZSA9IG8ubmFtZSwgbi5jaGVja1B1bGwgPSBlKG8ucHVsbCwgITApLCBuLmNoZWNrUHV0ID0gZShvLnB1dCksIG4ucmV2ZXJ0Q2xvbmUgPSBvLnJldmVydENsb25lLCB0Lmdyb3VwID0gbiB9OyB0cnkgeyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIiwgbnVsbCwgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCBcInBhc3NpdmVcIiwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgUSA9IHsgY2FwdHVyZTogITEsIHBhc3NpdmU6ICExIH0gfSB9KSkgfSBjYXRjaCAodCkgeyB9IHJldHVybiB0LnByb3RvdHlwZSA9IHsgY29uc3RydWN0b3I6IHQsIF9vblRhcFN0YXJ0OiBmdW5jdGlvbiAodCkgeyB2YXIgZSwgbyA9IHRoaXMsIGkgPSB0aGlzLmVsLCByID0gdGhpcy5vcHRpb25zLCBhID0gci5wcmV2ZW50T25GaWx0ZXIsIGwgPSB0LnR5cGUsIGMgPSB0LnRvdWNoZXMgJiYgdC50b3VjaGVzWzBdLCBkID0gKGMgfHwgdCkudGFyZ2V0LCBoID0gdC50YXJnZXQuc2hhZG93Um9vdCAmJiB0LnBhdGggJiYgdC5wYXRoWzBdIHx8IGQsIGYgPSByLmZpbHRlcjsgaWYgKGZ1bmN0aW9uICh0KSB7IGV0Lmxlbmd0aCA9IDA7IGZvciAodmFyIGUgPSB0LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIiksIG4gPSBlLmxlbmd0aDsgbi0tOykgeyB2YXIgbyA9IGVbbl07IG8uY2hlY2tlZCAmJiBldC5wdXNoKG8pIH0gfShpKSwgIWIgJiYgISgvbW91c2Vkb3dufHBvaW50ZXJkb3duLy50ZXN0KGwpICYmIDAgIT09IHQuYnV0dG9uIHx8IHIuZGlzYWJsZWQpICYmICFoLmlzQ29udGVudEVkaXRhYmxlICYmIChkID0gbihkLCByLmRyYWdnYWJsZSwgaSkpICYmIFMgIT09IGQpIHsgaWYgKGUgPSB1KGQsIHIuZHJhZ2dhYmxlKSwgXCJmdW5jdGlvblwiID09IHR5cGVvZiBmKSB7IGlmIChmLmNhbGwodGhpcywgdCwgZCwgdGhpcykpIHJldHVybiBzKG8sIGgsIFwiZmlsdGVyXCIsIGQsIGksIGksIGUpLCB2b2lkIChhICYmIHQucHJldmVudERlZmF1bHQoKSkgfSBlbHNlIGlmIChmICYmIChmID0gZi5zcGxpdChcIixcIikuc29tZShmdW5jdGlvbiAodCkgeyBpZiAodCA9IG4oaCwgdC50cmltKCksIGkpKSByZXR1cm4gcyhvLCB0LCBcImZpbHRlclwiLCBkLCBpLCBpLCBlKSwgITAgfSkpKSByZXR1cm4gdm9pZCAoYSAmJiB0LnByZXZlbnREZWZhdWx0KCkpOyByLmhhbmRsZSAmJiAhbihoLCByLmhhbmRsZSwgaSkgfHwgdGhpcy5fcHJlcGFyZURyYWdTdGFydCh0LCBjLCBkLCBlKSB9IH0sIF9wcmVwYXJlRHJhZ1N0YXJ0OiBmdW5jdGlvbiAodCwgZSwgbiwgaSkgeyB2YXIgYSwgYyA9IHRoaXMsIGggPSBjLmVsLCB1ID0gYy5vcHRpb25zLCBmID0gaC5vd25lckRvY3VtZW50OyBuICYmICFiICYmIG4ucGFyZW50Tm9kZSA9PT0gaCAmJiAoUiA9IHQsIFQgPSBoLCBEID0gKGIgPSBuKS5wYXJlbnROb2RlLCBDID0gYi5uZXh0U2libGluZywgUyA9IG4sIE8gPSB1Lmdyb3VwLCBZID0gaSwgdGhpcy5fbGFzdFggPSAoZSB8fCB0KS5jbGllbnRYLCB0aGlzLl9sYXN0WSA9IChlIHx8IHQpLmNsaWVudFksIGIuc3R5bGVbXCJ3aWxsLWNoYW5nZVwiXSA9IFwiYWxsXCIsIGEgPSBmdW5jdGlvbiAoKSB7IGMuX2Rpc2FibGVEZWxheWVkRHJhZygpLCBiLmRyYWdnYWJsZSA9IGMubmF0aXZlRHJhZ2dhYmxlLCByKGIsIHUuY2hvc2VuQ2xhc3MsICEwKSwgYy5fdHJpZ2dlckRyYWdTdGFydCh0LCBlKSwgcyhjLCBULCBcImNob29zZVwiLCBiLCBULCBULCBZKSB9LCB1Lmlnbm9yZS5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbiAodCkgeyBsKGIsIHQudHJpbSgpLCBkKSB9KSwgbyhmLCBcIm1vdXNldXBcIiwgYy5fb25Ecm9wKSwgbyhmLCBcInRvdWNoZW5kXCIsIGMuX29uRHJvcCksIG8oZiwgXCJ0b3VjaGNhbmNlbFwiLCBjLl9vbkRyb3ApLCBvKGYsIFwic2VsZWN0c3RhcnRcIiwgYyksIHUuc3VwcG9ydFBvaW50ZXIgJiYgbyhmLCBcInBvaW50ZXJjYW5jZWxcIiwgYy5fb25Ecm9wKSwgdS5kZWxheSA/IChvKGYsIFwibW91c2V1cFwiLCBjLl9kaXNhYmxlRGVsYXllZERyYWcpLCBvKGYsIFwidG91Y2hlbmRcIiwgYy5fZGlzYWJsZURlbGF5ZWREcmFnKSwgbyhmLCBcInRvdWNoY2FuY2VsXCIsIGMuX2Rpc2FibGVEZWxheWVkRHJhZyksIG8oZiwgXCJtb3VzZW1vdmVcIiwgYy5fZGlzYWJsZURlbGF5ZWREcmFnKSwgbyhmLCBcInRvdWNobW92ZVwiLCBjLl9kaXNhYmxlRGVsYXllZERyYWcpLCB1LnN1cHBvcnRQb2ludGVyICYmIG8oZiwgXCJwb2ludGVybW92ZVwiLCBjLl9kaXNhYmxlRGVsYXllZERyYWcpLCBjLl9kcmFnU3RhcnRUaW1lciA9IHEoYSwgdS5kZWxheSkpIDogYSgpKSB9LCBfZGlzYWJsZURlbGF5ZWREcmFnOiBmdW5jdGlvbiAoKSB7IHZhciB0ID0gdGhpcy5lbC5vd25lckRvY3VtZW50OyBjbGVhclRpbWVvdXQodGhpcy5fZHJhZ1N0YXJ0VGltZXIpLCBpKHQsIFwibW91c2V1cFwiLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpLCBpKHQsIFwidG91Y2hlbmRcIiwgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKSwgaSh0LCBcInRvdWNoY2FuY2VsXCIsIHRoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyksIGkodCwgXCJtb3VzZW1vdmVcIiwgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKSwgaSh0LCBcInRvdWNobW92ZVwiLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpLCBpKHQsIFwicG9pbnRlcm1vdmVcIiwgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKSB9LCBfdHJpZ2dlckRyYWdTdGFydDogZnVuY3Rpb24gKHQsIGUpIHsgKGUgPSBlIHx8IChcInRvdWNoXCIgPT0gdC5wb2ludGVyVHlwZSA/IHQgOiBudWxsKSkgPyAoUiA9IHsgdGFyZ2V0OiBiLCBjbGllbnRYOiBlLmNsaWVudFgsIGNsaWVudFk6IGUuY2xpZW50WSB9LCB0aGlzLl9vbkRyYWdTdGFydChSLCBcInRvdWNoXCIpKSA6IHRoaXMubmF0aXZlRHJhZ2dhYmxlID8gKG8oYiwgXCJkcmFnZW5kXCIsIHRoaXMpLCBvKFQsIFwiZHJhZ3N0YXJ0XCIsIHRoaXMuX29uRHJhZ1N0YXJ0KSkgOiB0aGlzLl9vbkRyYWdTdGFydChSLCAhMCk7IHRyeSB7IFcuc2VsZWN0aW9uID8gbShmdW5jdGlvbiAoKSB7IFcuc2VsZWN0aW9uLmVtcHR5KCkgfSkgOiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCkgfSBjYXRjaCAodCkgeyB9IH0sIF9kcmFnU3RhcnRlZDogZnVuY3Rpb24gKCkgeyBpZiAoVCAmJiBiKSB7IHZhciBlID0gdGhpcy5vcHRpb25zOyByKGIsIGUuZ2hvc3RDbGFzcywgITApLCByKGIsIGUuZHJhZ0NsYXNzLCAhMSksIHQuYWN0aXZlID0gdGhpcywgcyh0aGlzLCBULCBcInN0YXJ0XCIsIGIsIFQsIFQsIFkpIH0gZWxzZSB0aGlzLl9udWxsaW5nKCkgfSwgX2VtdWxhdGVEcmFnT3ZlcjogZnVuY3Rpb24gKCkgeyBpZiAoQSkgeyBpZiAodGhpcy5fbGFzdFggPT09IEEuY2xpZW50WCAmJiB0aGlzLl9sYXN0WSA9PT0gQS5jbGllbnRZKSByZXR1cm47IHRoaXMuX2xhc3RYID0gQS5jbGllbnRYLCB0aGlzLl9sYXN0WSA9IEEuY2xpZW50WSwgSiB8fCBhKHksIFwiZGlzcGxheVwiLCBcIm5vbmVcIik7IHZhciB0ID0gVy5lbGVtZW50RnJvbVBvaW50KEEuY2xpZW50WCwgQS5jbGllbnRZKSwgZSA9IHQsIG4gPSBudC5sZW5ndGg7IGlmICh0ICYmIHQuc2hhZG93Um9vdCAmJiAoZSA9IHQgPSB0LnNoYWRvd1Jvb3QuZWxlbWVudEZyb21Qb2ludChBLmNsaWVudFgsIEEuY2xpZW50WSkpLCBlKSBkbyB7IGlmIChlW2pdKSB7IGZvciAoOyBuLS07KW50W25dKHsgY2xpZW50WDogQS5jbGllbnRYLCBjbGllbnRZOiBBLmNsaWVudFksIHRhcmdldDogdCwgcm9vdEVsOiBlIH0pOyBicmVhayB9IHQgPSBlIH0gd2hpbGUgKGUgPSBlLnBhcmVudE5vZGUpOyBKIHx8IGEoeSwgXCJkaXNwbGF5XCIsIFwiXCIpIH0gfSwgX29uVG91Y2hNb3ZlOiBmdW5jdGlvbiAoZSkgeyBpZiAoUikgeyB2YXIgbiA9IHRoaXMub3B0aW9ucywgbyA9IG4uZmFsbGJhY2tUb2xlcmFuY2UsIGkgPSBuLmZhbGxiYWNrT2Zmc2V0LCByID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdIDogZSwgbCA9IHIuY2xpZW50WCAtIFIuY2xpZW50WCArIGkueCwgcyA9IHIuY2xpZW50WSAtIFIuY2xpZW50WSArIGkueSwgYyA9IGUudG91Y2hlcyA/IFwidHJhbnNsYXRlM2QoXCIgKyBsICsgXCJweCxcIiArIHMgKyBcInB4LDApXCIgOiBcInRyYW5zbGF0ZShcIiArIGwgKyBcInB4LFwiICsgcyArIFwicHgpXCI7IGlmICghdC5hY3RpdmUpIHsgaWYgKG8gJiYgdHQoJChyLmNsaWVudFggLSB0aGlzLl9sYXN0WCksICQoci5jbGllbnRZIC0gdGhpcy5fbGFzdFkpKSA8IG8pIHJldHVybjsgdGhpcy5fZHJhZ1N0YXJ0ZWQoKSB9IHRoaXMuX2FwcGVuZEdob3N0KCksIE0gPSAhMCwgQSA9IHIsIGEoeSwgXCJ3ZWJraXRUcmFuc2Zvcm1cIiwgYyksIGEoeSwgXCJtb3pUcmFuc2Zvcm1cIiwgYyksIGEoeSwgXCJtc1RyYW5zZm9ybVwiLCBjKSwgYSh5LCBcInRyYW5zZm9ybVwiLCBjKSwgZS5wcmV2ZW50RGVmYXVsdCgpIH0gfSwgX2FwcGVuZEdob3N0OiBmdW5jdGlvbiAoKSB7IGlmICgheSkgeyB2YXIgdCwgZSA9IGIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIG4gPSBhKGIpLCBvID0gdGhpcy5vcHRpb25zOyByKHkgPSBiLmNsb25lTm9kZSghMCksIG8uZ2hvc3RDbGFzcywgITEpLCByKHksIG8uZmFsbGJhY2tDbGFzcywgITApLCByKHksIG8uZHJhZ0NsYXNzLCAhMCksIGEoeSwgXCJ0b3BcIiwgZS50b3AgLSBWKG4ubWFyZ2luVG9wLCAxMCkpLCBhKHksIFwibGVmdFwiLCBlLmxlZnQgLSBWKG4ubWFyZ2luTGVmdCwgMTApKSwgYSh5LCBcIndpZHRoXCIsIGUud2lkdGgpLCBhKHksIFwiaGVpZ2h0XCIsIGUuaGVpZ2h0KSwgYSh5LCBcIm9wYWNpdHlcIiwgXCIwLjhcIiksIGEoeSwgXCJwb3NpdGlvblwiLCBcImZpeGVkXCIpLCBhKHksIFwiekluZGV4XCIsIFwiMTAwMDAwXCIpLCBhKHksIFwicG9pbnRlckV2ZW50c1wiLCBcIm5vbmVcIiksIG8uZmFsbGJhY2tPbkJvZHkgJiYgVy5ib2R5LmFwcGVuZENoaWxkKHkpIHx8IFQuYXBwZW5kQ2hpbGQoeSksIHQgPSB5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBhKHksIFwid2lkdGhcIiwgMiAqIGUud2lkdGggLSB0LndpZHRoKSwgYSh5LCBcImhlaWdodFwiLCAyICogZS5oZWlnaHQgLSB0LmhlaWdodCkgfSB9LCBfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uICh0LCBlKSB7IHZhciBuID0gdGhpcywgaSA9IHQuZGF0YVRyYW5zZmVyLCBsID0gbi5vcHRpb25zOyBuLl9vZmZVcEV2ZW50cygpLCBPLmNoZWNrUHVsbChuLCBuLCBiLCB0KSAmJiAoKHcgPSB2KGIpKS5kcmFnZ2FibGUgPSAhMSwgdy5zdHlsZVtcIndpbGwtY2hhbmdlXCJdID0gXCJcIiwgYSh3LCBcImRpc3BsYXlcIiwgXCJub25lXCIpLCByKHcsIG4ub3B0aW9ucy5jaG9zZW5DbGFzcywgITEpLCBuLl9jbG9uZUlkID0gbShmdW5jdGlvbiAoKSB7IFQuaW5zZXJ0QmVmb3JlKHcsIGIpLCBzKG4sIFQsIFwiY2xvbmVcIiwgYikgfSkpLCByKGIsIGwuZHJhZ0NsYXNzLCAhMCksIGUgPyAoXCJ0b3VjaFwiID09PSBlID8gKG8oVywgXCJ0b3VjaG1vdmVcIiwgbi5fb25Ub3VjaE1vdmUpLCBvKFcsIFwidG91Y2hlbmRcIiwgbi5fb25Ecm9wKSwgbyhXLCBcInRvdWNoY2FuY2VsXCIsIG4uX29uRHJvcCksIGwuc3VwcG9ydFBvaW50ZXIgJiYgKG8oVywgXCJwb2ludGVybW92ZVwiLCBuLl9vblRvdWNoTW92ZSksIG8oVywgXCJwb2ludGVydXBcIiwgbi5fb25Ecm9wKSkpIDogKG8oVywgXCJtb3VzZW1vdmVcIiwgbi5fb25Ub3VjaE1vdmUpLCBvKFcsIFwibW91c2V1cFwiLCBuLl9vbkRyb3ApKSwgbi5fbG9vcElkID0gc2V0SW50ZXJ2YWwobi5fZW11bGF0ZURyYWdPdmVyLCA1MCkpIDogKGkgJiYgKGkuZWZmZWN0QWxsb3dlZCA9IFwibW92ZVwiLCBsLnNldERhdGEgJiYgbC5zZXREYXRhLmNhbGwobiwgaSwgYikpLCBvKFcsIFwiZHJvcFwiLCBuKSwgbi5fZHJhZ1N0YXJ0SWQgPSBtKG4uX2RyYWdTdGFydGVkKSkgfSwgX29uRHJhZ092ZXI6IGZ1bmN0aW9uIChvKSB7IHZhciBpLCByLCBsLCBzLCBkID0gdGhpcy5lbCwgdSA9IHRoaXMub3B0aW9ucywgZiA9IHUuZ3JvdXAsIHAgPSB0LmFjdGl2ZSwgZyA9IE8gPT09IGYsIHYgPSAhMSwgbSA9IHUuc29ydDsgaWYgKHZvaWQgMCAhPT0gby5wcmV2ZW50RGVmYXVsdCAmJiAoby5wcmV2ZW50RGVmYXVsdCgpLCAhdS5kcmFnb3ZlckJ1YmJsZSAmJiBvLnN0b3BQcm9wYWdhdGlvbigpKSwgIWIuYW5pbWF0ZWQgJiYgKE0gPSAhMCwgcCAmJiAhdS5kaXNhYmxlZCAmJiAoZyA/IG0gfHwgKHMgPSAhVC5jb250YWlucyhiKSkgOiBJID09PSB0aGlzIHx8IChwLmxhc3RQdWxsTW9kZSA9IE8uY2hlY2tQdWxsKHRoaXMsIHAsIGIsIG8pKSAmJiBmLmNoZWNrUHV0KHRoaXMsIHAsIGIsIG8pKSAmJiAodm9pZCAwID09PSBvLnJvb3RFbCB8fCBvLnJvb3RFbCA9PT0gdGhpcy5lbCkpKSB7IGlmIChpdChvLCB1LCB0aGlzLmVsKSwgSykgcmV0dXJuOyBpZiAoaSA9IG4oby50YXJnZXQsIHUuZHJhZ2dhYmxlLCBkKSwgciA9IGIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIEkgIT09IHRoaXMgJiYgKEkgPSB0aGlzLCB2ID0gITApLCBzKSByZXR1cm4gZShwLCAhMCksIEQgPSBULCB2b2lkICh3IHx8IEMgPyBULmluc2VydEJlZm9yZShiLCB3IHx8IEMpIDogbSB8fCBULmFwcGVuZENoaWxkKGIpKTsgaWYgKDAgPT09IGQuY2hpbGRyZW4ubGVuZ3RoIHx8IGQuY2hpbGRyZW5bMF0gPT09IHkgfHwgZCA9PT0gby50YXJnZXQgJiYgZnVuY3Rpb24gKHQsIGUpIHsgdmFyIG4gPSB0Lmxhc3RFbGVtZW50Q2hpbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IHJldHVybiBlLmNsaWVudFkgLSAobi50b3AgKyBuLmhlaWdodCkgPiA1IHx8IGUuY2xpZW50WCAtIChuLmxlZnQgKyBuLndpZHRoKSA+IDUgfShkLCBvKSkgeyBpZiAoMCAhPT0gZC5jaGlsZHJlbi5sZW5ndGggJiYgZC5jaGlsZHJlblswXSAhPT0geSAmJiBkID09PSBvLnRhcmdldCAmJiAoaSA9IGQubGFzdEVsZW1lbnRDaGlsZCksIGkpIHsgaWYgKGkuYW5pbWF0ZWQpIHJldHVybjsgbCA9IGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgfSBlKHAsIGcpLCAhMSAhPT0gYyhULCBkLCBiLCByLCBpLCBsLCBvKSAmJiAoYi5jb250YWlucyhkKSB8fCAoZC5hcHBlbmRDaGlsZChiKSwgRCA9IGQpLCB0aGlzLl9hbmltYXRlKHIsIGIpLCBpICYmIHRoaXMuX2FuaW1hdGUobCwgaSkpIH0gZWxzZSBpZiAoaSAmJiAhaS5hbmltYXRlZCAmJiBpICE9PSBiICYmIHZvaWQgMCAhPT0gaS5wYXJlbnROb2RlW2pdKSB7IGsgIT09IGkgJiYgKGsgPSBpLCBCID0gYShpKSwgUCA9IGEoaS5wYXJlbnROb2RlKSk7IHZhciBfID0gKGwgPSBpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKS5yaWdodCAtIGwubGVmdCwgUyA9IGwuYm90dG9tIC0gbC50b3AsIEUgPSBVLnRlc3QoQi5jc3NGbG9hdCArIEIuZGlzcGxheSkgfHwgXCJmbGV4XCIgPT0gUC5kaXNwbGF5ICYmIDAgPT09IFBbXCJmbGV4LWRpcmVjdGlvblwiXS5pbmRleE9mKFwicm93XCIpLCB4ID0gaS5vZmZzZXRXaWR0aCA+IGIub2Zmc2V0V2lkdGgsIE4gPSBpLm9mZnNldEhlaWdodCA+IGIub2Zmc2V0SGVpZ2h0LCBZID0gKEUgPyAoby5jbGllbnRYIC0gbC5sZWZ0KSAvIF8gOiAoby5jbGllbnRZIC0gbC50b3ApIC8gUykgPiAuNSwgWCA9IGkubmV4dEVsZW1lbnRTaWJsaW5nLCBSID0gITE7IGlmIChFKSB7IHZhciBBID0gYi5vZmZzZXRUb3AsIEwgPSBpLm9mZnNldFRvcDsgUiA9IEEgPT09IEwgPyBpLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT09IGIgJiYgIXggfHwgWSAmJiB4IDogaS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nID09PSBiIHx8IGIucHJldmlvdXNFbGVtZW50U2libGluZyA9PT0gaSA/IChvLmNsaWVudFkgLSBsLnRvcCkgLyBTID4gLjUgOiBMID4gQSB9IGVsc2UgdiB8fCAoUiA9IFggIT09IGIgJiYgIU4gfHwgWSAmJiBOKTsgdmFyIEYgPSBjKFQsIGQsIGIsIHIsIGksIGwsIG8sIFIpOyAhMSAhPT0gRiAmJiAoMSAhPT0gRiAmJiAtMSAhPT0gRiB8fCAoUiA9IDEgPT09IEYpLCBLID0gITAsIHEoaCwgMzApLCBlKHAsIGcpLCBiLmNvbnRhaW5zKGQpIHx8IChSICYmICFYID8gZC5hcHBlbmRDaGlsZChiKSA6IGkucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYiwgUiA/IFggOiBpKSksIEQgPSBiLnBhcmVudE5vZGUsIHRoaXMuX2FuaW1hdGUociwgYiksIHRoaXMuX2FuaW1hdGUobCwgaSkpIH0gfSB9LCBfYW5pbWF0ZTogZnVuY3Rpb24gKHQsIGUpIHsgdmFyIG4gPSB0aGlzLm9wdGlvbnMuYW5pbWF0aW9uOyBpZiAobikgeyB2YXIgbyA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IDEgPT09IHQubm9kZVR5cGUgJiYgKHQgPSB0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSwgYShlLCBcInRyYW5zaXRpb25cIiwgXCJub25lXCIpLCBhKGUsIFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlM2QoXCIgKyAodC5sZWZ0IC0gby5sZWZ0KSArIFwicHgsXCIgKyAodC50b3AgLSBvLnRvcCkgKyBcInB4LDApXCIpLCBlLm9mZnNldFdpZHRoLCBhKGUsIFwidHJhbnNpdGlvblwiLCBcImFsbCBcIiArIG4gKyBcIm1zXCIpLCBhKGUsIFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlM2QoMCwwLDApXCIpLCBjbGVhclRpbWVvdXQoZS5hbmltYXRlZCksIGUuYW5pbWF0ZWQgPSBxKGZ1bmN0aW9uICgpIHsgYShlLCBcInRyYW5zaXRpb25cIiwgXCJcIiksIGEoZSwgXCJ0cmFuc2Zvcm1cIiwgXCJcIiksIGUuYW5pbWF0ZWQgPSAhMSB9LCBuKSB9IH0sIF9vZmZVcEV2ZW50czogZnVuY3Rpb24gKCkgeyB2YXIgdCA9IHRoaXMuZWwub3duZXJEb2N1bWVudDsgaShXLCBcInRvdWNobW92ZVwiLCB0aGlzLl9vblRvdWNoTW92ZSksIGkoVywgXCJwb2ludGVybW92ZVwiLCB0aGlzLl9vblRvdWNoTW92ZSksIGkodCwgXCJtb3VzZXVwXCIsIHRoaXMuX29uRHJvcCksIGkodCwgXCJ0b3VjaGVuZFwiLCB0aGlzLl9vbkRyb3ApLCBpKHQsIFwicG9pbnRlcnVwXCIsIHRoaXMuX29uRHJvcCksIGkodCwgXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLl9vbkRyb3ApLCBpKHQsIFwicG9pbnRlcmNhbmNlbFwiLCB0aGlzLl9vbkRyb3ApLCBpKHQsIFwic2VsZWN0c3RhcnRcIiwgdGhpcykgfSwgX29uRHJvcDogZnVuY3Rpb24gKGUpIHsgdmFyIG4gPSB0aGlzLmVsLCBvID0gdGhpcy5vcHRpb25zOyBjbGVhckludGVydmFsKHRoaXMuX2xvb3BJZCksIGNsZWFySW50ZXJ2YWwoTC5waWQpLCBjbGVhclRpbWVvdXQodGhpcy5fZHJhZ1N0YXJ0VGltZXIpLCBfKHRoaXMuX2Nsb25lSWQpLCBfKHRoaXMuX2RyYWdTdGFydElkKSwgaShXLCBcIm1vdXNlb3ZlclwiLCB0aGlzKSwgaShXLCBcIm1vdXNlbW92ZVwiLCB0aGlzLl9vblRvdWNoTW92ZSksIHRoaXMubmF0aXZlRHJhZ2dhYmxlICYmIChpKFcsIFwiZHJvcFwiLCB0aGlzKSwgaShuLCBcImRyYWdzdGFydFwiLCB0aGlzLl9vbkRyYWdTdGFydCkpLCB0aGlzLl9vZmZVcEV2ZW50cygpLCBlICYmIChNICYmIChlLnByZXZlbnREZWZhdWx0KCksICFvLmRyb3BCdWJibGUgJiYgZS5zdG9wUHJvcGFnYXRpb24oKSksIHkgJiYgeS5wYXJlbnROb2RlICYmIHkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh5KSwgVCAhPT0gRCAmJiBcImNsb25lXCIgPT09IHQuYWN0aXZlLmxhc3RQdWxsTW9kZSB8fCB3ICYmIHcucGFyZW50Tm9kZSAmJiB3LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodyksIGIgJiYgKHRoaXMubmF0aXZlRHJhZ2dhYmxlICYmIGkoYiwgXCJkcmFnZW5kXCIsIHRoaXMpLCBkKGIpLCBiLnN0eWxlW1wid2lsbC1jaGFuZ2VcIl0gPSBcIlwiLCByKGIsIHRoaXMub3B0aW9ucy5naG9zdENsYXNzLCAhMSksIHIoYiwgdGhpcy5vcHRpb25zLmNob3NlbkNsYXNzLCAhMSksIHModGhpcywgVCwgXCJ1bmNob29zZVwiLCBiLCBELCBULCBZKSwgVCAhPT0gRCA/IChYID0gdShiLCBvLmRyYWdnYWJsZSkpID49IDAgJiYgKHMobnVsbCwgRCwgXCJhZGRcIiwgYiwgRCwgVCwgWSwgWCksIHModGhpcywgVCwgXCJyZW1vdmVcIiwgYiwgRCwgVCwgWSwgWCksIHMobnVsbCwgRCwgXCJzb3J0XCIsIGIsIEQsIFQsIFksIFgpLCBzKHRoaXMsIFQsIFwic29ydFwiLCBiLCBELCBULCBZLCBYKSkgOiBiLm5leHRTaWJsaW5nICE9PSBDICYmIChYID0gdShiLCBvLmRyYWdnYWJsZSkpID49IDAgJiYgKHModGhpcywgVCwgXCJ1cGRhdGVcIiwgYiwgRCwgVCwgWSwgWCksIHModGhpcywgVCwgXCJzb3J0XCIsIGIsIEQsIFQsIFksIFgpKSwgdC5hY3RpdmUgJiYgKG51bGwgIT0gWCAmJiAtMSAhPT0gWCB8fCAoWCA9IFkpLCBzKHRoaXMsIFQsIFwiZW5kXCIsIGIsIEQsIFQsIFksIFgpLCB0aGlzLnNhdmUoKSkpKSwgdGhpcy5fbnVsbGluZygpIH0sIF9udWxsaW5nOiBmdW5jdGlvbiAoKSB7IFQgPSBiID0gRCA9IHkgPSBDID0gdyA9IFMgPSBFID0geCA9IFIgPSBBID0gTSA9IFggPSBrID0gQiA9IEkgPSBPID0gdC5hY3RpdmUgPSBudWxsLCBldC5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7IHQuY2hlY2tlZCA9ICEwIH0pLCBldC5sZW5ndGggPSAwIH0sIGhhbmRsZUV2ZW50OiBmdW5jdGlvbiAodCkgeyBzd2l0Y2ggKHQudHlwZSkgeyBjYXNlIFwiZHJvcFwiOiBjYXNlIFwiZHJhZ2VuZFwiOiB0aGlzLl9vbkRyb3AodCk7IGJyZWFrOyBjYXNlIFwiZHJhZ292ZXJcIjogY2FzZSBcImRyYWdlbnRlclwiOiBiICYmICh0aGlzLl9vbkRyYWdPdmVyKHQpLCBmdW5jdGlvbiAodCkgeyB0LmRhdGFUcmFuc2ZlciAmJiAodC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibW92ZVwiKSwgdC5wcmV2ZW50RGVmYXVsdCgpIH0odCkpOyBicmVhazsgY2FzZSBcIm1vdXNlb3ZlclwiOiB0aGlzLl9vbkRyb3AodCk7IGJyZWFrOyBjYXNlIFwic2VsZWN0c3RhcnRcIjogdC5wcmV2ZW50RGVmYXVsdCgpIH0gfSwgdG9BcnJheTogZnVuY3Rpb24gKCkgeyBmb3IgKHZhciB0LCBlID0gW10sIG8gPSB0aGlzLmVsLmNoaWxkcmVuLCBpID0gMCwgciA9IG8ubGVuZ3RoLCBhID0gdGhpcy5vcHRpb25zOyBpIDwgcjsgaSsrKW4odCA9IG9baV0sIGEuZHJhZ2dhYmxlLCB0aGlzLmVsKSAmJiBlLnB1c2godC5nZXRBdHRyaWJ1dGUoYS5kYXRhSWRBdHRyKSB8fCBmdW5jdGlvbiAodCkgeyBmb3IgKHZhciBlID0gdC50YWdOYW1lICsgdC5jbGFzc05hbWUgKyB0LnNyYyArIHQuaHJlZiArIHQudGV4dENvbnRlbnQsIG4gPSBlLmxlbmd0aCwgbyA9IDA7IG4tLTspbyArPSBlLmNoYXJDb2RlQXQobik7IHJldHVybiBvLnRvU3RyaW5nKDM2KSB9KHQpKTsgcmV0dXJuIGUgfSwgc29ydDogZnVuY3Rpb24gKHQpIHsgdmFyIGUgPSB7fSwgbyA9IHRoaXMuZWw7IHRoaXMudG9BcnJheSgpLmZvckVhY2goZnVuY3Rpb24gKHQsIGkpIHsgdmFyIHIgPSBvLmNoaWxkcmVuW2ldOyBuKHIsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUsIG8pICYmIChlW3RdID0gcikgfSwgdGhpcyksIHQuZm9yRWFjaChmdW5jdGlvbiAodCkgeyBlW3RdICYmIChvLnJlbW92ZUNoaWxkKGVbdF0pLCBvLmFwcGVuZENoaWxkKGVbdF0pKSB9KSB9LCBzYXZlOiBmdW5jdGlvbiAoKSB7IHZhciB0ID0gdGhpcy5vcHRpb25zLnN0b3JlOyB0ICYmIHQuc2V0KHRoaXMpIH0sIGNsb3Nlc3Q6IGZ1bmN0aW9uICh0LCBlKSB7IHJldHVybiBuKHQsIGUgfHwgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSwgdGhpcy5lbCkgfSwgb3B0aW9uOiBmdW5jdGlvbiAodCwgZSkgeyB2YXIgbiA9IHRoaXMub3B0aW9uczsgaWYgKHZvaWQgMCA9PT0gZSkgcmV0dXJuIG5bdF07IG5bdF0gPSBlLCBcImdyb3VwXCIgPT09IHQgJiYgcnQobikgfSwgZGVzdHJveTogZnVuY3Rpb24gKCkgeyB2YXIgdCA9IHRoaXMuZWw7IHRbal0gPSBudWxsLCBpKHQsIFwibW91c2Vkb3duXCIsIHRoaXMuX29uVGFwU3RhcnQpLCBpKHQsIFwidG91Y2hzdGFydFwiLCB0aGlzLl9vblRhcFN0YXJ0KSwgaSh0LCBcInBvaW50ZXJkb3duXCIsIHRoaXMuX29uVGFwU3RhcnQpLCB0aGlzLm5hdGl2ZURyYWdnYWJsZSAmJiAoaSh0LCBcImRyYWdvdmVyXCIsIHRoaXMpLCBpKHQsIFwiZHJhZ2VudGVyXCIsIHRoaXMpKSwgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZHJhZ2dhYmxlXVwiKSwgZnVuY3Rpb24gKHQpIHsgdC5yZW1vdmVBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIikgfSksIG50LnNwbGljZShudC5pbmRleE9mKHRoaXMuX29uRHJhZ092ZXIpLCAxKSwgdGhpcy5fb25Ecm9wKCksIHRoaXMuZWwgPSB0ID0gbnVsbCB9IH0sIG8oVywgXCJ0b3VjaG1vdmVcIiwgZnVuY3Rpb24gKGUpIHsgdC5hY3RpdmUgJiYgZS5wcmV2ZW50RGVmYXVsdCgpIH0pLCB0LnV0aWxzID0geyBvbjogbywgb2ZmOiBpLCBjc3M6IGEsIGZpbmQ6IGwsIGlzOiBmdW5jdGlvbiAodCwgZSkgeyByZXR1cm4gISFuKHQsIGUsIHQpIH0sIGV4dGVuZDogZywgdGhyb3R0bGU6IHAsIGNsb3Nlc3Q6IG4sIHRvZ2dsZUNsYXNzOiByLCBjbG9uZTogdiwgaW5kZXg6IHUsIG5leHRUaWNrOiBtLCBjYW5jZWxOZXh0VGljazogXyB9LCB0LmNyZWF0ZSA9IGZ1bmN0aW9uIChlLCBuKSB7IHJldHVybiBuZXcgdChlLCBuKSB9LCB0LnZlcnNpb24gPSBcIjEuNy4wXCIsIHQgfSk7Iiwie1xyXG4gICAgbGF5b3V0ci5jaGVja0Fzc2lnbm1lbnRDb2xvciA9IChhc3NpZ25tZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGFzc2lnbm1lbnQuaGFzQ2xhc3MoJ2NvbG9yJykpIHtcclxuICAgICAgICAgICAgbGV0IGFzc2lnbm1lbnRJZCA9IGFzc2lnbm1lbnQuYXR0cignZGF0YS1pZCcpLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbHMgPSBhc3NpZ25tZW50LmZpbmQoJy5jb250cm9scyA+IGJ1dHRvbicpLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gYXNzaWdubWVudC5maW5kKCcuZmxleC10YWJsZScpLFxyXG4gICAgICAgICAgICAgICAgaXRlbXMgPSBjb250YWluZXIuY2hpbGRyZW4oKSxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUlkID0gY29udHJvbHMuZmlsdGVyKFwiLmFjdGl2ZVwiKS5hdHRyKCdkYXRhLWlkJyksXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0U3ZnID0gJzxzdmcgZm9jdXNhYmxlPVwiZmFsc2VcIj48dXNlIHhsaW5rOmhyZWY9XCIjc3ZnLWNoZWNrbWFya1wiPjwvdXNlPjwvc3ZnPicsXHJcbiAgICAgICAgICAgICAgICB3cm9uZ1N2ZyA9ICc8c3ZnIGZvY3VzYWJsZT1cImZhbHNlXCI+PHVzZSB4bGluazpocmVmPVwiI3N2Zy1jbG9zZVwiPjwvdXNlPjwvc3ZnPic7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzZXQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9scy5maWx0ZXIoJy5lcmFzZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9scy5maWx0ZXIoJzpub3QoLmVyYXNlciknKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnJlbW92ZUF0dHIoJ2RhdGEtaWQnKTtcclxuICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVtb3ZlQ2xhc3MoJ3ZhbGlkYXRlZCcpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGdldENvcnJlY3QgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIHNob3VsZCBiZSByZXRyaWV2ZWQgd2l0aCBhcGkgY2FsbFxyXG4gICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnRJZCA9PT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdibHVlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZ3JlZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdyZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFzc2lnbm1lbnRJZCA9PT0gJzInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICdvcmFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IDRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICd0ZWFsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGdldEl0ZW1zID0gKGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gMDtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLmVhY2goKGksIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgJHRoaXMgPSAkKGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtSWQgPSAkdGhpcy5hdHRyKCdkYXRhLWlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1JZCAhPT0gdW5kZWZpbmVkICYmIGlkID09PSBpdGVtSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYXNzaWdubWVudC5vbignY2xpY2snLCAnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbm1lbnQuaGFzQ2xhc3MoJ3ZhbGlkYXRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hZGRDbGFzcygndmFsaWRhdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcnJlY3QgPSBnZXRDb3JyZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjb3JyZWN0KS5lYWNoKChpLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IGdldEl0ZW1zKGRhdGEuaWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kID0gZGF0YS52YWx1ZSA9PT0gc2VsZWN0ZWQgPyBjb3JyZWN0U3ZnIDogd3JvbmdTdmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzLmZpbHRlcihgW2RhdGEtaWQ9XCIke2RhdGEuaWR9XCJdYCkuYXBwZW5kKGFwcGVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYXNzaWdubWVudC5vbignY2xpY2snLCAnYnV0dG9uW3R5cGU9XCJyZXNldFwiXScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYXNzaWdubWVudC5vbignY2xpY2snLCAnYnV0dG9uLmNvcnJlY3QnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgYXNzaWdubWVudC5hZGRDbGFzcygndmFsaWRhdGVkJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29ycmVjdCA9IGdldENvcnJlY3QoKTtcclxuICAgICAgICAgICAgICAgICQoY29ycmVjdCkuZWFjaCgoaSwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhLnZhbHVlOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChpdGVtcy5maWx0ZXIoJzpub3QoW2RhdGEtaWRdKScpWzBdKS5hdHRyKCdkYXRhLWlkJywgZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzLmZpbHRlcihgW2RhdGEtaWQ9XCIke2RhdGEuaWR9XCJdYCkuYXBwZW5kKGNvcnJlY3RTdmcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udHJvbHMub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICR0aGlzLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUlkID0gJHRoaXMuYXR0cignZGF0YS1pZCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW1zLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy5hdHRyKCdkYXRhLWlkJywgYWN0aXZlSWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59Iiwie1xyXG4gICAgbGF5b3V0ci5jaGVja0Fzc2lnbm1lbnREcmFnQW5kRHJvcCA9IChhc3NpZ25tZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGFzc2lnbm1lbnQuaGFzQ2xhc3MoJ2RyYWctYW5kLWRyb3AnKSkge1xyXG4gICAgICAgICAgICBhc3NpZ25tZW50LmF0dHIoJ2RhdGEtbW92aW5nJywgMCk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGFzc2lnbm1lbnQuYXR0cignZGF0YS1pZCcpLFxyXG4gICAgICAgICAgICAgICAgZnJvbSA9IGFzc2lnbm1lbnQuZmluZCgnLmZyb20gLmNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICAgICAgaXRlbXMgPSBhc3NpZ25tZW50LmZpbmQoJy5pdGVtJyksXHJcbiAgICAgICAgICAgICAgICBjaGVja2JveGVzID0gaXRlbXMuZmluZCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBnZXRDaGVja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJC5tYXAoY2hlY2tib3hlcywgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXNldCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnJlbW92ZUNsYXNzKCd2YWxpZCBpbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tlZCA9IGdldENoZWNrZWQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja2VkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZyb20uYXBwZW5kKGl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVtb3ZlQ2xhc3MoJ3ZhbGlkYXRlZCBtb3ZpbmcnKTtcclxuICAgICAgICAgICAgICAgIC8vaXRlbXMgPSBpdGVtcy5zaHVmZmxlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgZ2V0Q29ycmVjdCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgc2hvdWxkIGJlIHJldHJpZXZlZCB3aXRoIGFwaSBjYWxsXHJcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT09ICcxJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnMScsIC8vIFRWXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogWyc1JywgJzcnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJzInLCAvLyBHYW1lc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFsnNicsICc4J11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICczJywgLy8gTXVzaWNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbJzInLCAnNCddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnNCcsIC8vIFNwb3J0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtczogWycxJywgJzMnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKGJvd3Nlci5kZXNrdG9wKSB7XHJcbiAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmZpbmQoJy5jb250YWluZXInKS5lYWNoKChpLCBjb250YWluZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBTb3J0YWJsZS5jcmVhdGUoY29udGFpbmVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiAnY29udGFpbmVyJywgZHJhZ2dhYmxlOiBcIi5pdGVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VGYWxsYmFjazogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2tPbkJvZHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNob3NlbkNsYXNzOiAnZHJhZy1hbmQtZHJvcC1zb3J0YWJsZS1jaG9zZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkFkZDogKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGVja2VkID0gZ2V0Q2hlY2tlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja2VkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQucGFyZW50KCkubm90KGUuaXRlbSkuZWFjaCgoaSwgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50by5hcHBlbmQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LnJlbW92ZUNsYXNzKCdtb3ZpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnQub24oJ2NsaWNrJywgJy5pdGVtIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCksXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9ICR0aGlzLnBhcmVudHMoJy5pdGVtJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbW92aW5nID0gcGFyc2VJbnQoYXNzaWdubWVudC5hdHRyKCdkYXRhLW1vdmluZycpKTtcclxuICAgICAgICAgICAgICAgIGlmICgkdGhpcy5pcygnOmNoZWNrZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmluZysrO1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYXR0cignZGF0YS1tb3ZpbmcnLCBtb3ZpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWRkQ2xhc3MoJ21vdmluZycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZpbmctLTtcclxuICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmF0dHIoJ2RhdGEtbW92aW5nJywgbW92aW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW92aW5nID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQucmVtb3ZlQ2xhc3MoJ21vdmluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhc3NpZ25tZW50Lm9uKCdjbGljaycsICcucGxhY2UnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZW1vdmVDbGFzcygnbW92aW5nJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tlZCA9IGdldENoZWNrZWQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGVja2VkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoJy5oZWFkZXInKS5uZXh0KCkuY2hpbGRyZW4oJy5jb250YWluZXInKS5hcHBlbmQoY2hlY2tlZC5wYXJlbnQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYXNzaWdubWVudC5vbignY2xpY2snLCAnYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWFzc2lnbm1lbnQuaGFzQ2xhc3MoJ3ZhbGlkYXRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrZWQgPSBnZXRDaGVja2VkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudC5hZGRDbGFzcygndmFsaWRhdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcnJlY3QgPSBnZXRDb3JyZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjb3JyZWN0KS5lYWNoKChpLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXIgPSBhc3NpZ25tZW50LmZpbmQoYC50byAuY29udGFpbmVyW2RhdGEtaWQ9XCIke2RhdGEuaWR9XCJdYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jaGlsZHJlbigpLmVhY2goKGksIGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9ICQoY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuaW5BcnJheShpdGVtLmF0dHIoJ2RhdGEtaWQnKSwgZGF0YS5pdGVtcykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygndmFsaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygnaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhc3NpZ25tZW50Lm9uKCdjbGljaycsICdidXR0b25bdHlwZT1cInJlc2V0XCJdJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhc3NpZ25tZW50Lm9uKCdjbGljaycsICdidXR0b24uY29ycmVjdCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmFkZENsYXNzKCd2YWxpZGF0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGxldCBjb3JyZWN0ID0gZ2V0Q29ycmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgJChjb3JyZWN0KS5lYWNoKChpLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IGFzc2lnbm1lbnQuZmluZChgLnRvIC5jb250YWluZXJbZGF0YS1pZD1cIiR7ZGF0YS5pZH1cIl1gKTtcclxuICAgICAgICAgICAgICAgICAgICAkKGRhdGEuaXRlbXMpLmVhY2goKGosIGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbGF5b3V0ci5nZXRBc3NpZ25tZW50SXRlbShpdGVtcywgaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCd2YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFwcGVuZFRvKGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSIsIntcclxuICAgIGxheW91dHIuY2hlY2tBc3NpZ25tZW50U29ydCA9IChhc3NpZ25tZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGFzc2lnbm1lbnQuaGFzQ2xhc3MoJ3NvcnQnKSkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBhc3NpZ25tZW50LmF0dHIoJ2RhdGEtaWQnKSxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGFzc2lnbm1lbnQuZmluZCgnLmNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICAgICAgaXRlbXMgPSBhc3NpZ25tZW50LmZpbmQoJy5pdGVtJyk7XHJcbiAgICAgICAgICAgIFNvcnRhYmxlLmNyZWF0ZShjb250YWluZXJbMF0sIHtcclxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogXCIuaXRlbVwiLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGZvcmNlRmFsbGJhY2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBmYWxsYmFja09uQm9keTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNob3NlbkNsYXNzOiAnc29ydC1zb3J0YWJsZS1jaG9zZW4nXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb250YWluZXIuaGFzQ2xhc3MoJ3dyYXAnKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrV2lkdGggPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNzcygnaGVpZ2h0JywgY29udGFpbmVyLmhlaWdodCgpKS5yZW1vdmVDbGFzcygnY29sdW1uJykuYWRkQ2xhc3MoJ3JvdycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXJMZWZ0ID0gY29udGFpbmVyWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbSA9IGNvbnRhaW5lci5maW5kKCc+IC5pdGVtOmZpcnN0LWNoaWxkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0SXRlbUxlZnQgPSBmaXJzdEl0ZW1bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHBhcnNlSW50KGZpcnN0SXRlbS5jc3MoJ21hcmdpbi1sZWZ0JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdEl0ZW1MZWZ0IDwgY29udGFpbmVyTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ3JvdycpLmFkZENsYXNzKCdjb2x1bW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmNzcygnaGVpZ2h0JywgJycpLmFkZENsYXNzKCdjaGVja2VkJyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrV2lkdGgoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykuYmluZCgncmVzaXplLmFzc2lnbm1lbnRTb3J0JywgJC50aHJvdHRsZShsYXlvdXRyLnRocm90dGxlSW50ZXJ2YWwsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzZXQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5yZW1vdmVDbGFzcygndmFsaWQgaW52YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgYXNzaWdubWVudC5yZW1vdmVDbGFzcygndmFsaWRhdGVkJyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtcyA9IGl0ZW1zLnNodWZmbGUoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBnZXRDb3JyZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBzaG91bGQgYmUgcmV0cmlldmVkIHdpdGggYXBpIGNhbGxcclxuICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gJzEnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsnMycsICcxJywgJzInLCAnNScsICc0JywgJzcnLCAnNicsICc4JywgJzknXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQgPT09ICcyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbJzQnLCAnMicsICcxJywgJzMnXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnQub24oJ2NsaWNrJywgJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhc3NpZ25tZW50Lmhhc0NsYXNzKCd2YWxpZGF0ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWRkQ2xhc3MoJ3ZhbGlkYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3JyZWN0ID0gZ2V0Q29ycmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoY29ycmVjdCkuZWFjaCgoaSwgaWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBsYXlvdXRyLmdldEFzc2lnbm1lbnRJdGVtKGl0ZW1zLCBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmluZGV4KCkgPT09IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdpbnZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhc3NpZ25tZW50Lm9uKCdjbGljaycsICdidXR0b25bdHlwZT1cInJlc2V0XCJdJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5zZXJ0QXRJbmRleCA9IChpLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wcmVwZW5kKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuZmluZChgPiAuaXRlbTpudGgtY2hpbGQoJHtpfSlgKS5hZnRlcihpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnQub24oJ2NsaWNrJywgJ2J1dHRvbi5jb3JyZWN0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYWRkQ2xhc3MoJ3ZhbGlkYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvcnJlY3QgPSBnZXRDb3JyZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAkKGNvcnJlY3QpLmVhY2goKGksIGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBsYXlvdXRyLmdldEFzc2lnbm1lbnRJdGVtKGl0ZW1zLCBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDbGFzcygndmFsaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRBdEluZGV4KGksIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0iLCJ7XHJcbiAgICBsYXlvdXRyLmNoZWNrQXNzaWdubWVudFB1enpsZSA9IChhc3NpZ25tZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGFzc2lnbm1lbnQuaGFzQ2xhc3MoJ3B1enpsZScpKSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGFzc2lnbm1lbnQuYXR0cignZGF0YS1pZCcpLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2UgPSBhc3NpZ25tZW50LmF0dHIoJ2RhdGEtaW1hZ2UnKSxcclxuICAgICAgICAgICAgICAgIHRpbGVzID0gbGF5b3V0ci50cnlQYXJzZUludChhc3NpZ25tZW50LmF0dHIoJ2RhdGEtdGlsZXMnKSwgMCksXHJcbiAgICAgICAgICAgICAgICBzaXplID0gbGF5b3V0ci50cnlQYXJzZUludChhc3NpZ25tZW50LmF0dHIoJ2RhdGEtc2l6ZScpLCAwKSxcclxuICAgICAgICAgICAgICAgIHJhbmRvbSA9IGxheW91dHIudHJ5UGFyc2VJbnQoYXNzaWdubWVudC5hdHRyKCdkYXRhLXJhbmRvbScpLCAzKSxcclxuICAgICAgICAgICAgICAgIHRpbGUgPSAxMDAgLyB0aWxlcyxcclxuICAgICAgICAgICAgICAgIHRvdGFsID0gdGlsZXMgKiB0aWxlcyAtIDEsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMgPSBbXSxcclxuICAgICAgICAgICAgICAgIGl0ZW1zID0gW10sXHJcbiAgICAgICAgICAgICAgICBtb3ZpbmdJdGVtID0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0ID0gW10sXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uVGltZSA9IDEwMCxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXA6ICd1cCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZG93bjogJ2Rvd24nLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogJ3JpZ2h0J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQsXHJcbiAgICAgICAgICAgICAgICBtb3Zlc1VzZWQsXHJcbiAgICAgICAgICAgICAgICBsYXN0TW92ZSxcclxuICAgICAgICAgICAgICAgIHJhbmRvbVVzZWQsXHJcbiAgICAgICAgICAgICAgICBkb21Db250ZW50LFxyXG4gICAgICAgICAgICAgICAgZG9tU3RhcnQsXHJcbiAgICAgICAgICAgICAgICBkb21HaXZlVXA7XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmF0dHIoJ2RhdGEtc3RhdGUnLCAnaW5pdGlhbCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBodG1sID0gXHJcbmA8ZGl2IGNsYXNzPVwiY29udGVudFwiIHN0eWxlPVwibWF4LXdpZHRoOiAke3NpemV9cHg7IG1heC1oZWlnaHQ6ICR7c2l6ZX1weFwiPlxyXG4gICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgke2ltYWdlfSlcIj48L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJidXR0b25zXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZmxleCB3cmFwIGdhcC0yXCI+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gc3RhcnRcIj5TdGFydDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIHRoZW1lLXNlY29uZGFyeSBnaXZlLXVwXCI+R2l2ZSB1cDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmFwcGVuZChodG1sKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkb21Db250ZW50ID0gYXNzaWdubWVudC5maW5kKCcuY29udGVudCA+IGRpdicpO1xyXG4gICAgICAgICAgICAgICAgZG9tU3RhcnQgPSBhc3NpZ25tZW50LmZpbmQoJ2J1dHRvbi5zdGFydCcpO1xyXG4gICAgICAgICAgICAgICAgZG9tR2l2ZVVwID0gYXNzaWdubWVudC5maW5kKCdidXR0b24uZ2l2ZS11cCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvbVN0YXJ0LmNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9tR2l2ZVVwLmNsaWNrKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vdmluZ0l0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHNodWZmbGUgPSAoYXJyYXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIFthcnJheVtpXSwgYXJyYXlbal1dID0gW2FycmF5W2pdLCBhcnJheVtpXV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCBzZXRQb3NpdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aWxlcyAtIDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IHRpbGVzIC0gMTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IGNvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IGpcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2h1ZmZsZShwb3NpdGlvbnMpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHNldEl0ZW1zID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9tQ29udGVudC5lbXB0eSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh0bWwgPSBcclxuYDxkaXYgY2xhc3M9XCJpdGVtXCJcclxuICAgIGRhdGEtaWQ9XCIke3Bvc2l0aW9uc1tpXS5pZH1cIiBcclxuICAgIGRhdGEtdG9wPVwiJHtwb3NpdGlvbnNbaV0udG9wfVwiIFxyXG4gICAgZGF0YS1sZWZ0PVwiJHtwb3NpdGlvbnNbaV0ubGVmdH1cIiBcclxuICAgIHN0eWxlPVwiXHJcbiAgICB3aWR0aDogJHt0aWxlfSU7IFxyXG4gICAgaGVpZ2h0OiAke3RpbGV9JTsgXHJcbiAgICB0b3A6ICR7cG9zaXRpb25zW2ldLnRvcCAqIHRpbGV9JTsgXHJcbiAgICBsZWZ0OiAke3Bvc2l0aW9uc1tpXS5sZWZ0ICogdGlsZX0lOyBcclxuXCI+XHJcbiAgICA8ZGl2IHN0eWxlPVwiXHJcbiAgICAgICAgd2lkdGg6ICR7dGlsZXMgKiAxMDB9JTsgXHJcbiAgICAgICAgaGVpZ2h0OiAke3RpbGVzICogMTAwfSU7IFxyXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke2ltYWdlfSk7IFxyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtJHtwb3NpdGlvbnNbaV0ubGVmdCAqIHRpbGUgKiB0aWxlc30lOyBcclxuICAgICAgICBtYXJnaW4tdG9wOiAtJHtwb3NpdGlvbnNbaV0udG9wICogdGlsZSAqIHRpbGVzfSU7IFxyXG4gICAgXCI+PC9kaXY+XHJcbjwvZGl2PmA7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tQ29udGVudC5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtcyA9IGRvbUNvbnRlbnQuY2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXRDdXJyZW50ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHBvc2l0aW9uc1t0b3RhbF07XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgc2V0Q29ycmVjdCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvcnJlY3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLmVhY2goKGksIGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9ICQoaXRlbXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvcnJlY3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IGl0ZW0uYXR0cignZGF0YS1pZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndG9wJzogaXRlbS5hdHRyKCdkYXRhLXRvcCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IGl0ZW0uYXR0cignZGF0YS1sZWZ0JylcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGdldEl0ZW0gPSAoZGlyZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9wID0gY3VycmVudC50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGN1cnJlbnQubGVmdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLnVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gY3VycmVudC50b3AgKyAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IGRpcmVjdGlvbnMuZG93bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IGN1cnJlbnQudG9wIC0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gY3VycmVudC5sZWZ0ICsgMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLnJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGN1cnJlbnQubGVmdCAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9tQ29udGVudC5maW5kKGAuaXRlbVtkYXRhLXRvcD1cIiR7dG9wfVwiXVtkYXRhLWxlZnQ9XCIke2xlZnR9XCJdYCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgbW92ZUl0ZW0gPSAoaXRlbSwgZGlyZWN0aW9uLCBpbml0aWFsID0gdHJ1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZpbmdJdGVtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLnVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogYCR7Y3VycmVudC50b3AgKiB0aWxlfSVgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICFpbml0aWFsID8gdHJhbnNpdGlvblRpbWUgOiAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluaXRpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3Zlc1VzZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmluZ0l0ZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYXR0cignZGF0YS10b3AnLCBwYXJzZUludChpdGVtLmF0dHIoJ2RhdGEtdG9wJykpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50LnRvcCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW92YWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gZGlyZWN0aW9ucy5kb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgZG93blxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBgJHtjdXJyZW50LnRvcCAqIHRpbGV9JWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgIWluaXRpYWwgPyB0cmFuc2l0aW9uVGltZSA6IDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaW5pdGlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVzVXNlZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92aW5nSXRlbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hdHRyKCdkYXRhLXRvcCcsIHBhcnNlSW50KGl0ZW0uYXR0cignZGF0YS10b3AnKSkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQudG9wLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNb3ZhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBgJHtjdXJyZW50LmxlZnQgKiB0aWxlfSVgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICFpbml0aWFsID8gdHJhbnNpdGlvblRpbWUgOiAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluaXRpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3Zlc1VzZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmluZ0l0ZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYXR0cignZGF0YS1sZWZ0JywgcGFyc2VJbnQoaXRlbS5hdHRyKCdkYXRhLWxlZnQnKSkgLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQubGVmdCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW92YWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gZGlyZWN0aW9ucy5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBgJHtjdXJyZW50LmxlZnQgKiB0aWxlfSVgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICFpbml0aWFsID8gdHJhbnNpdGlvblRpbWUgOiAwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWluaXRpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3Zlc1VzZWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmluZ0l0ZW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYXR0cignZGF0YS1sZWZ0JywgcGFyc2VJbnQoaXRlbS5hdHRyKCdkYXRhLWxlZnQnKSkgKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQubGVmdC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW92YWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgc2V0TW92YWJsZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnJlbW92ZUNsYXNzKCdtb3ZhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudC50b3AgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRJdGVtKGRpcmVjdGlvbnMuZG93bikuYWRkQ2xhc3MoJ21vdmFibGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LnRvcCAhPT0gdGlsZXMgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0SXRlbShkaXJlY3Rpb25zLnVwKS5hZGRDbGFzcygnbW92YWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQubGVmdCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldEl0ZW0oZGlyZWN0aW9ucy5yaWdodCkuYWRkQ2xhc3MoJ21vdmFibGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmxlZnQgIT09IHRpbGVzIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldEl0ZW0oZGlyZWN0aW9ucy5sZWZ0KS5hZGRDbGFzcygnbW92YWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHNldFJhbmRvbSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb24gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudC50b3AgIT09IDAgJiYgbGFzdE1vdmUgIT09IGRpcmVjdGlvbnMudXApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYW4gZ28gZG93blxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbi5wdXNoKGRpcmVjdGlvbnMuZG93bik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudC50b3AgIT09IHRpbGVzIC0gMSAmJiBsYXN0TW92ZSAhPT0gZGlyZWN0aW9ucy5kb3duKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FuIGdvIHVwXHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uLnB1c2goZGlyZWN0aW9ucy51cCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudC5sZWZ0ICE9PSAwICYmIGxhc3RNb3ZlICE9PSBkaXJlY3Rpb25zLmxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYW4gZ28gcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24ucHVzaChkaXJlY3Rpb25zLnJpZ2h0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50LmxlZnQgIT09IHRpbGVzIC0gMSAmJiBsYXN0TW92ZSAhPT0gZGlyZWN0aW9ucy5yaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbiBnbyBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uLnB1c2goZGlyZWN0aW9ucy5sZWZ0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNodWZmbGUoZGlyZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb25bMF07XHJcbiAgICAgICAgICAgICAgICBsYXN0TW92ZSA9IGRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgIG1vdmVJdGVtKGdldEl0ZW0oZGlyZWN0aW9uKSwgZGlyZWN0aW9uKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByYW5kb21Vc2VkLS07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmRvbVVzZWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBzdGFydCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxheW91dHIuYXJyb3dLZXlMb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2V0UG9zaXRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRJdGVtcygpO1xyXG4gICAgICAgICAgICAgICAgc2V0Q3VycmVudCgpO1xyXG4gICAgICAgICAgICAgICAgc2V0Q29ycmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vdmVzVXNlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICBsYXN0TW92ZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVVzZWQgPSByYW5kb207XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0UmFuZG9tKCk7XHJcbiAgICAgICAgICAgICAgICBhc3NpZ25tZW50LmF0dHIoJ2RhdGEtc3RhdGUnLCAnc3RhcnQnKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXNldCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxheW91dHIuYXJyb3dLZXlMb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRvbUNvbnRlbnQuZW1wdHkoKTtcclxuICAgICAgICAgICAgICAgIGFzc2lnbm1lbnQuYXR0cignZGF0YS1zdGF0ZScsICdpbml0aWFsJyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hlY2tTb2x2ZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29sdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLmVhY2goKGksIGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9kaWZpZWQgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWQuaXRlbSA9ICQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWQuaWQgPSBtb2RpZmllZC5pdGVtLmF0dHIoJ2RhdGEtaWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RpZmllZC50b3AgPSBtb2RpZmllZC5pdGVtLmF0dHIoJ2RhdGEtdG9wJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWQubGVmdCA9IG1vZGlmaWVkLml0ZW0uYXR0cignZGF0YS1sZWZ0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9ICQuZ3JlcChjb3JyZWN0LCAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gbW9kaWZpZWQuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbC50b3AgIT09IG1vZGlmaWVkLnRvcCB8fCBvcmlnaW5hbC5sZWZ0ICE9PSBtb2RpZmllZC5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvbHZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc29sdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh0bWwgPSBcclxuYDxkaXYgY2xhc3M9XCJhbGVydCB0aGVtZS1zdWNjZXNzXCI+XHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxoMyBjbGFzcz1cImFsaWduLWNlbnRlclwiPllvdSBXaW48L2gzPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVwiPlxyXG4gICAgICAgICAgICA8dGFibGU+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPjx0aD5Nb3ZlcyB1c2VkPC90aD48dGQ+JHttb3Zlc1VzZWR9PC90ZD48L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj48dGg+UGVyZmVjdCBtb3ZlczwvdGg+PHRkPiR7cmFuZG9tfTwvdGQ+PC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgICAgICBkb21Db250ZW50LmFwcGVuZChodG1sKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGFzc2lnbm1lbnQub24oJ2NsaWNrJywgJy5pdGVtLm1vdmFibGUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQuYXR0cignZGF0YS1zdGF0ZScpID09PSAnc3RhcnQnICYmICFtb3ZpbmdJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSAkKGUudGFyZ2V0KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gcGFyc2VJbnQoaXRlbS5hdHRyKCdkYXRhLXRvcCcpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHBhcnNlSW50KGl0ZW0uYXR0cignZGF0YS1sZWZ0JykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9wID09PSBjdXJyZW50LnRvcCArIDEgJiYgbGVmdCA9PT0gY3VycmVudC5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVJdGVtKGl0ZW0sIGRpcmVjdGlvbnMudXAsIGZhbHNlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU29sdmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9wID09PSBjdXJyZW50LnRvcCAtIDEgJiYgbGVmdCA9PT0gY3VycmVudC5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVJdGVtKGl0ZW0sIGRpcmVjdGlvbnMuZG93biwgZmFsc2UpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tTb2x2ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b3AgPT09IGN1cnJlbnQudG9wICYmIGxlZnQgPT09IGN1cnJlbnQubGVmdCArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUl0ZW0oaXRlbSwgZGlyZWN0aW9ucy5sZWZ0LCBmYWxzZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1NvbHZlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRvcCA9PT0gY3VycmVudC50b3AgJiYgbGVmdCA9PT0gY3VycmVudC5sZWZ0IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlSXRlbShpdGVtLCBkaXJlY3Rpb25zLnJpZ2h0LCBmYWxzZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1NvbHZlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGF5b3V0ci5ib2R5Lm9uKCdrZXlkb3duLmFzc2lnbm1lbnRQdXp6bGUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFzc2lnbm1lbnQuYXR0cignZGF0YS1zdGF0ZScpID09PSAnc3RhcnQnICYmICFtb3ZpbmdJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMzggJiYgY3VycmVudC50b3AgIT09IHRpbGVzIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVJdGVtKGdldEl0ZW0oZGlyZWN0aW9ucy51cCksIGRpcmVjdGlvbnMudXAsIGZhbHNlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU29sdmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSA0MCAmJiBjdXJyZW50LnRvcCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVJdGVtKGdldEl0ZW0oZGlyZWN0aW9ucy5kb3duKSwgZGlyZWN0aW9ucy5kb3duLCBmYWxzZSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1NvbHZlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzcgJiYgY3VycmVudC5sZWZ0ICE9PSB0aWxlcyAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlSXRlbShnZXRJdGVtKGRpcmVjdGlvbnMubGVmdCksIGRpcmVjdGlvbnMubGVmdCwgZmFsc2UpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tTb2x2ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM5ICYmIGN1cnJlbnQubGVmdCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVJdGVtKGdldEl0ZW0oZGlyZWN0aW9ucy5yaWdodCksIGRpcmVjdGlvbnMucmlnaHQsIGZhbHNlKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU29sdmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGF5b3V0ci5hcnJvd0tleUxvY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0iXX0=
