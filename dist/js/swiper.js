/**
 * Swiper 4.3.3
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: June 5, 2018
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Swiper = factory());
}(window, (function () {
    'use strict';

    /**
     * SSR Window 1.0.0
     * Better handling for window object in SSR environment
     * https://github.com/nolimits4web/ssr-window
     *
     * Copyright 2018, Vladimir Kharlampidi
     *
     * Licensed under MIT
     *
     * Released on: February 10, 2018
     */
    var d;
    if (typeof document === 'undefined') {
        d = {
            body: {},
            addEventListener: function addEventListener() { },
            removeEventListener: function removeEventListener() { },
            activeElement: {
                blur: function blur() { },
                nodeName: '',
            },
            querySelector: function querySelector() {
                return null;
            },
            querySelectorAll: function querySelectorAll() {
                return [];
            },
            getElementById: function getElementById() {
                return null;
            },
            createEvent: function createEvent() {
                return {
                    initEvent: function initEvent() { },
                };
            },
            createElement: function createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute: function setAttribute() { },
                    getElementsByTagName: function getElementsByTagName() {
                        return [];
                    },
                };
            },
            location: { hash: '' },
        };
    } else {
        // eslint-disable-next-line
        d = document;
    }

    var doc = d;

    var w;
    if (typeof window === 'undefined') {
        w = {
            document: doc,
            navigator: {
                userAgent: '',
            },
            location: {},
            history: {},
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener: function addEventListener() { },
            removeEventListener: function removeEventListener() { },
            getComputedStyle: function getComputedStyle() {
                return {
                    getPropertyValue: function getPropertyValue() {
                        return '';
                    },
                };
            },
            Image: function Image() { },
            Date: function Date() { },
            screen: {},
            setTimeout: function setTimeout() { },
            clearTimeout: function clearTimeout() { },
        };
    } else {
        // eslint-disable-next-line
        w = window;
    }

    var win = w;

    /**
     * Dom7 2.0.6
     * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
     * http://framework7.io/docs/dom.html
     *
     * Copyright 2018, Vladimir Kharlampidi
     * The iDangero.us
     * http://www.idangero.us/
     *
     * Licensed under MIT
     *
     * Released on: May 27, 2018
     */

    var Dom7 = function Dom7(arr) {
        var self = this;
        // Create array-like object
        for (var i = 0; i < arr.length; i += 1) {
            self[i] = arr[i];
        }
        self.length = arr.length;
        // Return collection with methods
        return this;
    };

    function $(selector, context) {
        var arr = [];
        var i = 0;
        if (selector && !context) {
            if (selector instanceof Dom7) {
                return selector;
            }
        }
        if (selector) {
            // String
            if (typeof selector === 'string') {
                var els;
                var tempParent;
                var html = selector.trim();
                if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                    var toCreate = 'div';
                    if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
                    if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
                    if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
                    if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
                    if (html.indexOf('<option') === 0) { toCreate = 'select'; }
                    tempParent = doc.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for (i = 0; i < tempParent.childNodes.length; i += 1) {
                        arr.push(tempParent.childNodes[i]);
                    }
                } else {
                    if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                        // Pure ID selector
                        els = [doc.getElementById(selector.trim().split('#')[1])];
                    } else {
                        // Other selectors
                        els = (context || doc).querySelectorAll(selector.trim());
                    }
                    for (i = 0; i < els.length; i += 1) {
                        if (els[i]) { arr.push(els[i]); }
                    }
                }
            } else if (selector.nodeType || selector === win || selector === doc) {
                // Node/element
                arr.push(selector);
            } else if (selector.length > 0 && selector[0].nodeType) {
                // Array of elements or instance of Dom
                for (i = 0; i < selector.length; i += 1) {
                    arr.push(selector[i]);
                }
            }
        }
        return new Dom7(arr);
    }

    $.fn = Dom7.prototype;
    $.Class = Dom7;
    $.Dom7 = Dom7;

    function unique(arr) {
        var uniqueArray = [];
        for (var i = 0; i < arr.length; i += 1) {
            if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
        }
        return uniqueArray;
    }

    // Classes and attributes
    function addClass(className) {
        var this$1 = this;

        if (typeof className === 'undefined') {
            return this;
        }
        var classes = className.split(' ');
        for (var i = 0; i < classes.length; i += 1) {
            for (var j = 0; j < this.length; j += 1) {
                if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.add(classes[i]); }
            }
        }
        return this;
    }
    function removeClass(className) {
        var this$1 = this;

        var classes = className.split(' ');
        for (var i = 0; i < classes.length; i += 1) {
            for (var j = 0; j < this.length; j += 1) {
                if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
            }
        }
        return this;
    }
    function hasClass(className) {
        if (!this[0]) { return false; }
        return this[0].classList.contains(className);
    }
    function toggleClass(className) {
        var this$1 = this;

        var classes = className.split(' ');
        for (var i = 0; i < classes.length; i += 1) {
            for (var j = 0; j < this.length; j += 1) {
                if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
            }
        }
        return this;
    }
    function attr(attrs, value) {
        var arguments$1 = arguments;
        var this$1 = this;

        if (arguments.length === 1 && typeof attrs === 'string') {
            // Get attr
            if (this[0]) { return this[0].getAttribute(attrs); }
            return undefined;
        }

        // Set attrs
        for (var i = 0; i < this.length; i += 1) {
            if (arguments$1.length === 2) {
                // String
                this$1[i].setAttribute(attrs, value);
            } else {
                // Object
                // eslint-disable-next-line
                for (var attrName in attrs) {
                    this$1[i][attrName] = attrs[attrName];
                    this$1[i].setAttribute(attrName, attrs[attrName]);
                }
            }
        }
        return this;
    }
    // eslint-disable-next-line
    function removeAttr(attr) {
        var this$1 = this;

        for (var i = 0; i < this.length; i += 1) {
            this$1[i].removeAttribute(attr);
        }
        return this;
    }
    function data(key, value) {
        var this$1 = this;

        var el;
        if (typeof value === 'undefined') {
            el = this[0];
            // Get value
            if (el) {
                if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
                    return el.dom7ElementDataStorage[key];
                }

                var dataKey = el.getAttribute(("data-" + key));
                if (dataKey) {
                    return dataKey;
                }
                return undefined;
            }
            return undefined;
        }

        // Set value
        for (var i = 0; i < this.length; i += 1) {
            el = this$1[i];
            if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
            el.dom7ElementDataStorage[key] = value;
        }
        return this;
    }
    // Transforms
    // eslint-disable-next-line
    function transform(transform) {
        var this$1 = this;

        for (var i = 0; i < this.length; i += 1) {
            var elStyle = this$1[i].style;
            elStyle.webkitTransform = transform;
            elStyle.transform = transform;
        }
        return this;
    }
    function transition(duration) {
        var this$1 = this;

        if (typeof duration !== 'string') {
            duration = duration + "ms"; // eslint-disable-line
        }
        for (var i = 0; i < this.length; i += 1) {
            var elStyle = this$1[i].style;
            elStyle.webkitTransitionDuration = duration;
            elStyle.transitionDuration = duration;
        }
        return this;
    }
    // Events
    function on() {
        var this$1 = this;
        var assign;

        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var eventType = args[0];
        var targetSelector = args[1];
        var listener = args[2];
        var capture = args[3];
        if (typeof args[1] === 'function') {
            (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
            targetSelector = undefined;
        }
        if (!capture) { capture = false; }

        function handleLiveEvent(e) {
            var target = e.target;
            if (!target) { return; }
            var eventData = e.target.dom7EventData || [];
            if (eventData.indexOf(e) < 0) {
                eventData.unshift(e);
            }
            if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
            else {
                var parents = $(target).parents(); // eslint-disable-line
                for (var k = 0; k < parents.length; k += 1) {
                    if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
                }
            }
        }
        function handleEvent(e) {
            var eventData = e && e.target ? e.target.dom7EventData || [] : [];
            if (eventData.indexOf(e) < 0) {
                eventData.unshift(e);
            }
            listener.apply(this, eventData);
        }
        var events = eventType.split(' ');
        var j;
        for (var i = 0; i < this.length; i += 1) {
            var el = this$1[i];
            if (!targetSelector) {
                for (j = 0; j < events.length; j += 1) {
                    var event = events[j];
                    if (!el.dom7Listeners) { el.dom7Listeners = {}; }
                    if (!el.dom7Listeners[event]) { el.dom7Listeners[event] = []; }
                    el.dom7Listeners[event].push({
                        listener: listener,
                        proxyListener: handleEvent,
                    });
                    el.addEventListener(event, handleEvent, capture);
                }
            } else {
                // Live events
                for (j = 0; j < events.length; j += 1) {
                    var event$1 = events[j];
                    if (!el.dom7LiveListeners) { el.dom7LiveListeners = {}; }
                    if (!el.dom7LiveListeners[event$1]) { el.dom7LiveListeners[event$1] = []; }
                    el.dom7LiveListeners[event$1].push({
                        listener: listener,
                        proxyListener: handleLiveEvent,
                    });
                    el.addEventListener(event$1, handleLiveEvent, capture);
                }
            }
        }
        return this;
    }
    function off() {
        var this$1 = this;
        var assign;

        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];
        var eventType = args[0];
        var targetSelector = args[1];
        var listener = args[2];
        var capture = args[3];
        if (typeof args[1] === 'function') {
            (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
            targetSelector = undefined;
        }
        if (!capture) { capture = false; }

        var events = eventType.split(' ');
        for (var i = 0; i < events.length; i += 1) {
            var event = events[i];
            for (var j = 0; j < this.length; j += 1) {
                var el = this$1[j];
                var handlers = (void 0);
                if (!targetSelector && el.dom7Listeners) {
                    handlers = el.dom7Listeners[event];
                } else if (targetSelector && el.dom7LiveListeners) {
                    handlers = el.dom7LiveListeners[event];
                }
                if (handlers && handlers.length) {
                    for (var k = handlers.length - 1; k >= 0; k -= 1) {
                        var handler = handlers[k];
                        if (listener && handler.listener === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (!listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        }
                    }
                }
            }
        }
        return this;
    }
    function trigger() {
        var this$1 = this;
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];

        var events = args[0].split(' ');
        var eventData = args[1];
        for (var i = 0; i < events.length; i += 1) {
            var event = events[i];
            for (var j = 0; j < this.length; j += 1) {
                var el = this$1[j];
                var evt = (void 0);
                try {
                    evt = new win.CustomEvent(event, {
                        detail: eventData,
                        bubbles: true,
                        cancelable: true,
                    });
                } catch (e) {
                    evt = doc.createEvent('Event');
                    evt.initEvent(event, true, true);
                    evt.detail = eventData;
                }
                // eslint-disable-next-line
                el.dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
                el.dispatchEvent(evt);
                el.dom7EventData = [];
                delete el.dom7EventData;
            }
        }
        return this;
    }
    function transitionEnd(callback) {
        var events = ['webkitTransitionEnd', 'transitionend'];
        var dom = this;
        var i;
        function fireCallBack(e) {
            /* jshint validthis:true */
            if (e.target !== this) { return; }
            callback.call(this, e);
            for (i = 0; i < events.length; i += 1) {
                dom.off(events[i], fireCallBack);
            }
        }
        if (callback) {
            for (i = 0; i < events.length; i += 1) {
                dom.on(events[i], fireCallBack);
            }
        }
        return this;
    }
    function outerWidth(includeMargins) {
        if (this.length > 0) {
            if (includeMargins) {
                // eslint-disable-next-line
                var styles = this.styles();
                return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
            }
            return this[0].offsetWidth;
        }
        return null;
    }
    function outerHeight(includeMargins) {
        if (this.length > 0) {
            if (includeMargins) {
                // eslint-disable-next-line
                var styles = this.styles();
                return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
            }
            return this[0].offsetHeight;
        }
        return null;
    }
    function offset() {
        if (this.length > 0) {
            var el = this[0];
            var box = el.getBoundingClientRect();
            var body = doc.body;
            var clientTop = el.clientTop || body.clientTop || 0;
            var clientLeft = el.clientLeft || body.clientLeft || 0;
            var scrollTop = el === win ? win.scrollY : el.scrollTop;
            var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
            return {
                top: (box.top + scrollTop) - clientTop,
                left: (box.left + scrollLeft) - clientLeft,
            };
        }

        return null;
    }
    function styles() {
        if (this[0]) { return win.getComputedStyle(this[0], null); }
        return {};
    }
    function css(props, value) {
        var this$1 = this;

        var i;
        if (arguments.length === 1) {
            if (typeof props === 'string') {
                if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
            } else {
                for (i = 0; i < this.length; i += 1) {
                    // eslint-disable-next-line
                    for (var prop in props) {
                        this$1[i].style[prop] = props[prop];
                    }
                }
                return this;
            }
        }
        if (arguments.length === 2 && typeof props === 'string') {
            for (i = 0; i < this.length; i += 1) {
                this$1[i].style[props] = value;
            }
            return this;
        }
        return this;
    }
    // Iterate over the collection passing elements to `callback`
    function each(callback) {
        var this$1 = this;

        // Don't bother continuing without a callback
        if (!callback) { return this; }
        // Iterate over the current collection
        for (var i = 0; i < this.length; i += 1) {
            // If the callback returns false
            if (callback.call(this$1[i], i, this$1[i]) === false) {
                // End the loop early
                return this$1;
            }
        }
        // Return `this` to allow chained DOM operations
        return this;
    }
    // eslint-disable-next-line
    function html(html) {
        var this$1 = this;

        if (typeof html === 'undefined') {
            return this[0] ? this[0].innerHTML : undefined;
        }

        for (var i = 0; i < this.length; i += 1) {
            this$1[i].innerHTML = html;
        }
        return this;
    }
    // eslint-disable-next-line
    function text(text) {
        var this$1 = this;

        if (typeof text === 'undefined') {
            if (this[0]) {
                return this[0].textContent.trim();
            }
            return null;
        }

        for (var i = 0; i < this.length; i += 1) {
            this$1[i].textContent = text;
        }
        return this;
    }
    function is(selector) {
        var el = this[0];
        var compareWith;
        var i;
        if (!el || typeof selector === 'undefined') { return false; }
        if (typeof selector === 'string') {
            if (el.matches) { return el.matches(selector); }
            else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
            else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

            compareWith = $(selector);
            for (i = 0; i < compareWith.length; i += 1) {
                if (compareWith[i] === el) { return true; }
            }
            return false;
        } else if (selector === doc) { return el === doc; }
        else if (selector === win) { return el === win; }

        if (selector.nodeType || selector instanceof Dom7) {
            compareWith = selector.nodeType ? [selector] : selector;
            for (i = 0; i < compareWith.length; i += 1) {
                if (compareWith[i] === el) { return true; }
            }
            return false;
        }
        return false;
    }
    function index() {
        var child = this[0];
        var i;
        if (child) {
            i = 0;
            // eslint-disable-next-line
            while ((child = child.previousSibling) !== null) {
                if (child.nodeType === 1) { i += 1; }
            }
            return i;
        }
        return undefined;
    }
    // eslint-disable-next-line
    function eq(index) {
        if (typeof index === 'undefined') { return this; }
        var length = this.length;
        var returnIndex;
        if (index > length - 1) {
            return new Dom7([]);
        }
        if (index < 0) {
            returnIndex = length + index;
            if (returnIndex < 0) { return new Dom7([]); }
            return new Dom7([this[returnIndex]]);
        }
        return new Dom7([this[index]]);
    }
    function append() {
        var this$1 = this;
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];

        var newChild;

        for (var k = 0; k < args.length; k += 1) {
            newChild = args[k];
            for (var i = 0; i < this.length; i += 1) {
                if (typeof newChild === 'string') {
                    var tempDiv = doc.createElement('div');
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) {
                        this$1[i].appendChild(tempDiv.firstChild);
                    }
                } else if (newChild instanceof Dom7) {
                    for (var j = 0; j < newChild.length; j += 1) {
                        this$1[i].appendChild(newChild[j]);
                    }
                } else {
                    this$1[i].appendChild(newChild);
                }
            }
        }

        return this;
    }
    function prepend(newChild) {
        var this$1 = this;

        var i;
        var j;
        for (i = 0; i < this.length; i += 1) {
            if (typeof newChild === 'string') {
                var tempDiv = doc.createElement('div');
                tempDiv.innerHTML = newChild;
                for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
                    this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
                }
            } else if (newChild instanceof Dom7) {
                for (j = 0; j < newChild.length; j += 1) {
                    this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
                }
            } else {
                this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
            }
        }
        return this;
    }
    function next(selector) {
        if (this.length > 0) {
            if (selector) {
                if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
                    return new Dom7([this[0].nextElementSibling]);
                }
                return new Dom7([]);
            }

            if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
            return new Dom7([]);
        }
        return new Dom7([]);
    }
    function nextAll(selector) {
        var nextEls = [];
        var el = this[0];
        if (!el) { return new Dom7([]); }
        while (el.nextElementSibling) {
            var next = el.nextElementSibling; // eslint-disable-line
            if (selector) {
                if ($(next).is(selector)) { nextEls.push(next); }
            } else { nextEls.push(next); }
            el = next;
        }
        return new Dom7(nextEls);
    }
    function prev(selector) {
        if (this.length > 0) {
            var el = this[0];
            if (selector) {
                if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
                    return new Dom7([el.previousElementSibling]);
                }
                return new Dom7([]);
            }

            if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
            return new Dom7([]);
        }
        return new Dom7([]);
    }
    function prevAll(selector) {
        var prevEls = [];
        var el = this[0];
        if (!el) { return new Dom7([]); }
        while (el.previousElementSibling) {
            var prev = el.previousElementSibling; // eslint-disable-line
            if (selector) {
                if ($(prev).is(selector)) { prevEls.push(prev); }
            } else { prevEls.push(prev); }
            el = prev;
        }
        return new Dom7(prevEls);
    }
    function parent(selector) {
        var this$1 = this;

        var parents = []; // eslint-disable-line
        for (var i = 0; i < this.length; i += 1) {
            if (this$1[i].parentNode !== null) {
                if (selector) {
                    if ($(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
                } else {
                    parents.push(this$1[i].parentNode);
                }
            }
        }
        return $(unique(parents));
    }
    function parents(selector) {
        var this$1 = this;

        var parents = []; // eslint-disable-line
        for (var i = 0; i < this.length; i += 1) {
            var parent = this$1[i].parentNode; // eslint-disable-line
            while (parent) {
                if (selector) {
                    if ($(parent).is(selector)) { parents.push(parent); }
                } else {
                    parents.push(parent);
                }
                parent = parent.parentNode;
            }
        }
        return $(unique(parents));
    }
    function closest(selector) {
        var closest = this; // eslint-disable-line
        if (typeof selector === 'undefined') {
            return new Dom7([]);
        }
        if (!closest.is(selector)) {
            closest = closest.parents(selector).eq(0);
        }
        return closest;
    }
    function find(selector) {
        var this$1 = this;

        var foundElements = [];
        for (var i = 0; i < this.length; i += 1) {
            var found = this$1[i].querySelectorAll(selector);
            for (var j = 0; j < found.length; j += 1) {
                foundElements.push(found[j]);
            }
        }
        return new Dom7(foundElements);
    }
    function children(selector) {
        var this$1 = this;

        var children = []; // eslint-disable-line
        for (var i = 0; i < this.length; i += 1) {
            var childNodes = this$1[i].childNodes;

            for (var j = 0; j < childNodes.length; j += 1) {
                if (!selector) {
                    if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
                } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
                    children.push(childNodes[j]);
                }
            }
        }
        return new Dom7(unique(children));
    }
    function remove() {
        var this$1 = this;

        for (var i = 0; i < this.length; i += 1) {
            if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
        }
        return this;
    }
    function add() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];

        var dom = this;
        var i;
        var j;
        for (i = 0; i < args.length; i += 1) {
            var toAdd = $(args[i]);
            for (j = 0; j < toAdd.length; j += 1) {
                dom[dom.length] = toAdd[j];
                dom.length += 1;
            }
        }
        return dom;
    }

    var Methods = {
        addClass: addClass,
        removeClass: removeClass,
        hasClass: hasClass,
        toggleClass: toggleClass,
        attr: attr,
        removeAttr: removeAttr,
        data: data,
        transform: transform,
        transition: transition,
        on: on,
        off: off,
        trigger: trigger,
        transitionEnd: transitionEnd,
        outerWidth: outerWidth,
        outerHeight: outerHeight,
        offset: offset,
        css: css,
        each: each,
        html: html,
        text: text,
        is: is,
        index: index,
        eq: eq,
        append: append,
        prepend: prepend,
        next: next,
        nextAll: nextAll,
        prev: prev,
        prevAll: prevAll,
        parent: parent,
        parents: parents,
        closest: closest,
        find: find,
        children: children,
        remove: remove,
        add: add,
        styles: styles,
    };

    Object.keys(Methods).forEach(function (methodName) {
        $.fn[methodName] = Methods[methodName];
    });

    var Utils = {
        deleteProps: function deleteProps(obj) {
            var object = obj;
            Object.keys(object).forEach(function (key) {
                try {
                    object[key] = null;
                } catch (e) {
                    // no getter for object
                }
                try {
                    delete object[key];
                } catch (e) {
                    // something got wrong
                }
            });
        },
        nextTick: function nextTick(callback, delay) {
            if (delay === void 0) delay = 0;

            return setTimeout(callback, delay);
        },
        now: function now() {
            return Date.now();
        },
        getTranslate: function getTranslate(el, axis) {
            if (axis === void 0) axis = 'x';

            var matrix;
            var curTransform;
            var transformMatrix;

            var curStyle = win.getComputedStyle(el, null);

            if (win.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }

            if (axis === 'x') {
                // Latest Chrome and webkits Fix
                if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
                // Crazy IE10 Matrix
                else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
                // Normal Browsers
                else { curTransform = parseFloat(matrix[4]); }
            }
            if (axis === 'y') {
                // Latest Chrome and webkits Fix
                if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
                // Crazy IE10 Matrix
                else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
                // Normal Browsers
                else { curTransform = parseFloat(matrix[5]); }
            }
            return curTransform || 0;
        },
        parseUrlQuery: function parseUrlQuery(url) {
            var query = {};
            var urlToParse = url || win.location.href;
            var i;
            var params;
            var param;
            var length;
            if (typeof urlToParse === 'string' && urlToParse.length) {
                urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
                params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
                length = params.length;

                for (i = 0; i < length; i += 1) {
                    param = params[i].replace(/#\S+/g, '').split('=');
                    query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
                }
            }
            return query;
        },
        isObject: function isObject(o) {
            return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
        },
        extend: function extend() {
            var args = [], len$1 = arguments.length;
            while (len$1--) args[len$1] = arguments[len$1];

            var to = Object(args[0]);
            for (var i = 1; i < args.length; i += 1) {
                var nextSource = args[i];
                if (nextSource !== undefined && nextSource !== null) {
                    var keysArray = Object.keys(Object(nextSource));
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                                Utils.extend(to[nextKey], nextSource[nextKey]);
                            } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                                to[nextKey] = {};
                                Utils.extend(to[nextKey], nextSource[nextKey]);
                            } else {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
            }
            return to;
        },
    };

    var Support = (function Support() {
        var testDiv = doc.createElement('div');
        return {
            touch: (win.Modernizr && win.Modernizr.touch === true) || (function checkTouch() {
                return !!(('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch));
            }()),

            pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent),
            prefixedPointerEvents: !!win.navigator.msPointerEnabled,

            transition: (function checkTransition() {
                var style = testDiv.style;
                return ('transition' in style || 'webkitTransition' in style || 'MozTransition' in style);
            }()),
            transforms3d: (win.Modernizr && win.Modernizr.csstransforms3d === true) || (function checkTransforms3d() {
                var style = testDiv.style;
                return ('webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style);
            }()),

            flexbox: (function checkFlexbox() {
                var style = testDiv.style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i += 1) {
                    if (styles[i] in style) { return true; }
                }
                return false;
            }()),

            observer: (function checkObserver() {
                return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
            }()),

            passiveListener: (function checkPassiveListener() {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        // eslint-disable-next-line
                        get: function get() {
                            supportsPassive = true;
                        },
                    });
                    win.addEventListener('testPassiveListener', null, opts);
                } catch (e) {
                    // No support
                }
                return supportsPassive;
            }()),

            gestures: (function checkGestures() {
                return 'ongesturestart' in win;
            }()),
        };
    }());

    var SwiperClass = function SwiperClass(params) {
        if (params === void 0) params = {};

        var self = this;
        self.params = params;

        // Events
        self.eventsListeners = {};

        if (self.params && self.params.on) {
            Object.keys(self.params.on).forEach(function (eventName) {
                self.on(eventName, self.params.on[eventName]);
            });
        }
    };

    var staticAccessors = { components: { configurable: true } };
    SwiperClass.prototype.on = function on(events, handler, priority) {
        var self = this;
        if (typeof handler !== 'function') { return self; }
        var method = priority ? 'unshift' : 'push';
        events.split(' ').forEach(function (event) {
            if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
            self.eventsListeners[event][method](handler);
        });
        return self;
    };
    SwiperClass.prototype.once = function once(events, handler, priority) {
        var self = this;
        if (typeof handler !== 'function') { return self; }
        function onceHandler() {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];

            handler.apply(self, args);
            self.off(events, onceHandler);
        }
        return self.on(events, onceHandler, priority);
    };
    SwiperClass.prototype.off = function off(events, handler) {
        var self = this;
        if (!self.eventsListeners) { return self; }
        events.split(' ').forEach(function (event) {
            if (typeof handler === 'undefined') {
                self.eventsListeners[event] = [];
            } else {
                self.eventsListeners[event].forEach(function (eventHandler, index) {
                    if (eventHandler === handler) {
                        self.eventsListeners[event].splice(index, 1);
                    }
                });
            }
        });
        return self;
    };
    SwiperClass.prototype.emit = function emit() {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];

        var self = this;
        if (!self.eventsListeners) { return self; }
        var events;
        var data;
        var context;
        if (typeof args[0] === 'string' || Array.isArray(args[0])) {
            events = args[0];
            data = args.slice(1, args.length);
            context = self;
        } else {
            events = args[0].events;
            data = args[0].data;
            context = args[0].context || self;
        }
        var eventsArray = Array.isArray(events) ? events : events.split(' ');
        eventsArray.forEach(function (event) {
            if (self.eventsListeners && self.eventsListeners[event]) {
                var handlers = [];
                self.eventsListeners[event].forEach(function (eventHandler) {
                    handlers.push(eventHandler);
                });
                handlers.forEach(function (eventHandler) {
                    eventHandler.apply(context, data);
                });
            }
        });
        return self;
    };
    SwiperClass.prototype.useModulesParams = function useModulesParams(instanceParams) {
        var instance = this;
        if (!instance.modules) { return; }
        Object.keys(instance.modules).forEach(function (moduleName) {
            var module = instance.modules[moduleName];
            // Extend params
            if (module.params) {
                Utils.extend(instanceParams, module.params);
            }
        });
    };
    SwiperClass.prototype.useModules = function useModules(modulesParams) {
        if (modulesParams === void 0) modulesParams = {};

        var instance = this;
        if (!instance.modules) { return; }
        Object.keys(instance.modules).forEach(function (moduleName) {
            var module = instance.modules[moduleName];
            var moduleParams = modulesParams[moduleName] || {};
            // Extend instance methods and props
            if (module.instance) {
                Object.keys(module.instance).forEach(function (modulePropName) {
                    var moduleProp = module.instance[modulePropName];
                    if (typeof moduleProp === 'function') {
                        instance[modulePropName] = moduleProp.bind(instance);
                    } else {
                        instance[modulePropName] = moduleProp;
                    }
                });
            }
            // Add event listeners
            if (module.on && instance.on) {
                Object.keys(module.on).forEach(function (moduleEventName) {
                    instance.on(moduleEventName, module.on[moduleEventName]);
                });
            }

            // Module create callback
            if (module.create) {
                module.create.bind(instance)(moduleParams);
            }
        });
    };
    staticAccessors.components.set = function (components) {
        var Class = this;
        if (!Class.use) { return; }
        Class.use(components);
    };
    SwiperClass.installModule = function installModule(module) {
        var params = [], len = arguments.length - 1;
        while (len-- > 0) params[len] = arguments[len + 1];

        var Class = this;
        if (!Class.prototype.modules) { Class.prototype.modules = {}; }
        var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
        Class.prototype.modules[name] = module;
        // Prototype
        if (module.proto) {
            Object.keys(module.proto).forEach(function (key) {
                Class.prototype[key] = module.proto[key];
            });
        }
        // Class
        if (module.static) {
            Object.keys(module.static).forEach(function (key) {
                Class[key] = module.static[key];
            });
        }
        // Callback
        if (module.install) {
            module.install.apply(Class, params);
        }
        return Class;
    };
    SwiperClass.use = function use(module) {
        var params = [], len = arguments.length - 1;
        while (len-- > 0) params[len] = arguments[len + 1];

        var Class = this;
        if (Array.isArray(module)) {
            module.forEach(function (m) { return Class.installModule(m); });
            return Class;
        }
        return Class.installModule.apply(Class, [module].concat(params));
    };

    Object.defineProperties(SwiperClass, staticAccessors);

    function updateSize() {
        var swiper = this;
        var width;
        var height;
        var $el = swiper.$el;
        if (typeof swiper.params.width !== 'undefined') {
            width = swiper.params.width;
        } else {
            width = $el[0].clientWidth;
        }
        if (typeof swiper.params.height !== 'undefined') {
            height = swiper.params.height;
        } else {
            height = $el[0].clientHeight;
        }
        if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
            return;
        }

        // Subtract paddings
        width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
        height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

        Utils.extend(swiper, {
            width: width,
            height: height,
            size: swiper.isHorizontal() ? width : height,
        });
    }

    function updateSlides() {
        var swiper = this;
        var params = swiper.params;

        var $wrapperEl = swiper.$wrapperEl;
        var swiperSize = swiper.size;
        var rtl = swiper.rtlTranslate;
        var wrongRTL = swiper.wrongRTL;
        var isVirtual = swiper.virtual && params.virtual.enabled;
        var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
        var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        var snapGrid = [];
        var slidesGrid = [];
        var slidesSizesGrid = [];

        var offsetBefore = params.slidesOffsetBefore;
        if (typeof offsetBefore === 'function') {
            offsetBefore = params.slidesOffsetBefore.call(swiper);
        }

        var offsetAfter = params.slidesOffsetAfter;
        if (typeof offsetAfter === 'function') {
            offsetAfter = params.slidesOffsetAfter.call(swiper);
        }

        var previousSnapGridLength = swiper.snapGrid.length;
        var previousSlidesGridLength = swiper.snapGrid.length;

        var spaceBetween = params.spaceBetween;
        var slidePosition = -offsetBefore;
        var prevSlideSize = 0;
        var index = 0;
        if (typeof swiperSize === 'undefined') {
            return;
        }
        if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
            spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
        }

        swiper.virtualSize = -spaceBetween;

        // reset margins
        if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
        else { slides.css({ marginRight: '', marginBottom: '' }); }

        var slidesNumberEvenToRows;
        if (params.slidesPerColumn > 1) {
            if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
                slidesNumberEvenToRows = slidesLength;
            } else {
                slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
            }
            if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
                slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
            }
        }

        // Calc slides
        var slideSize;
        var slidesPerColumn = params.slidesPerColumn;
        var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
        var numFullColumns = slidesPerRow - ((params.slidesPerColumn * slidesPerRow) - slidesLength);
        for (var i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            var slide = slides.eq(i);
            if (params.slidesPerColumn > 1) {
                // Set slides order
                var newSlideOrderIndex = (void 0);
                var column = (void 0);
                var row = (void 0);
                if (params.slidesPerColumnFill === 'column') {
                    column = Math.floor(i / slidesPerColumn);
                    row = i - (column * slidesPerColumn);
                    if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
                        row += 1;
                        if (row >= slidesPerColumn) {
                            row = 0;
                            column += 1;
                        }
                    }
                    newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
                    slide
                        .css({
                            '-webkit-box-ordinal-group': newSlideOrderIndex,
                            '-moz-box-ordinal-group': newSlideOrderIndex,
                            '-ms-flex-order': newSlideOrderIndex,
                            '-webkit-order': newSlideOrderIndex,
                            order: newSlideOrderIndex,
                        });
                } else {
                    row = Math.floor(i / slidesPerRow);
                    column = i - (row * slidesPerRow);
                }
                slide
                    .css(
                        ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
                        (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
                    )
                    .attr('data-swiper-column', column)
                    .attr('data-swiper-row', row);
            }
            if (slide.css('display') === 'none') { continue; } // eslint-disable-line

            if (params.slidesPerView === 'auto') {
                var slideStyles = win.getComputedStyle(slide[0], null);
                var currentTransform = slide[0].style.transform;
                var currentWebKitTransform = slide[0].style.webkitTransform;
                if (currentTransform) {
                    slide[0].style.transform = 'none';
                }
                if (currentWebKitTransform) {
                    slide[0].style.webkitTransform = 'none';
                }
                if (swiper.isHorizontal()) {
                    slideSize = slide[0].getBoundingClientRect().width +
                        parseFloat(slideStyles.getPropertyValue('margin-left')) +
                        parseFloat(slideStyles.getPropertyValue('margin-right'));
                } else {
                    slideSize = slide[0].getBoundingClientRect().height +
                        parseFloat(slideStyles.getPropertyValue('margin-top')) +
                        parseFloat(slideStyles.getPropertyValue('margin-bottom'));
                }
                if (currentTransform) {
                    slide[0].style.transform = currentTransform;
                }
                if (currentWebKitTransform) {
                    slide[0].style.webkitTransform = currentWebKitTransform;
                }
                if (params.roundLengths) { slideSize = Math.floor(slideSize); }
            } else {
                slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
                if (params.roundLengths) { slideSize = Math.floor(slideSize); }

                if (slides[i]) {
                    if (swiper.isHorizontal()) {
                        slides[i].style.width = slideSize + "px";
                    } else {
                        slides[i].style.height = slideSize + "px";
                    }
                }
            }
            if (slides[i]) {
                slides[i].swiperSlideSize = slideSize;
            }
            slidesSizesGrid.push(slideSize);


            if (params.centeredSlides) {
                slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
                if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
                if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
                if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
                if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
                if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }

            swiper.virtualSize += slideSize + spaceBetween;

            prevSlideSize = slideSize;

            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        var newSlidesGrid;

        if (
            rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
            $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
        }
        if (!Support.flexbox || params.setWrapperSize) {
            if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
            else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
        }

        if (params.slidesPerColumn > 1) {
            swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
            swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
            if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
            else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
            if (params.centeredSlides) {
                newSlidesGrid = [];
                for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
                    var slidesGridItem = snapGrid[i$1];
                    if (params.roundLengths) { slidesGridItem = Math.floor(slidesGridItem); }
                    if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(slidesGridItem); }
                }
                snapGrid = newSlidesGrid;
            }
        }

        // Remove last grid elements depending on width
        if (!params.centeredSlides) {
            newSlidesGrid = [];
            for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
                var slidesGridItem$1 = snapGrid[i$2];
                if (params.roundLengths) { slidesGridItem$1 = Math.floor(slidesGridItem$1); }
                if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
                    newSlidesGrid.push(slidesGridItem$1);
                }
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
                snapGrid.push(swiper.virtualSize - swiperSize);
            }
        }
        if (snapGrid.length === 0) { snapGrid = [0]; }

        if (params.spaceBetween !== 0) {
            if (swiper.isHorizontal()) {
                if (rtl) { slides.css({ marginLeft: (spaceBetween + "px") }); }
                else { slides.css({ marginRight: (spaceBetween + "px") }); }
            } else { slides.css({ marginBottom: (spaceBetween + "px") }); }
        }

        Utils.extend(swiper, {
            slides: slides,
            snapGrid: snapGrid,
            slidesGrid: slidesGrid,
            slidesSizesGrid: slidesSizesGrid,
        });

        if (slidesLength !== previousSlidesLength) {
            swiper.emit('slidesLengthChange');
        }
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
            swiper.emit('snapGridLengthChange');
        }
        if (slidesGrid.length !== previousSlidesGridLength) {
            swiper.emit('slidesGridLengthChange');
        }

        if (params.watchSlidesProgress || params.watchSlidesVisibility) {
            swiper.updateSlidesOffset();
        }
    }

    function updateAutoHeight(speed) {
        var swiper = this;
        var activeSlides = [];
        var newHeight = 0;
        var i;
        if (typeof speed === 'number') {
            swiper.setTransition(speed);
        } else if (speed === true) {
            swiper.setTransition(swiper.params.speed);
        }
        // Find slides currently in view
        if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
            for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                var index = swiper.activeIndex + i;
                if (index > swiper.slides.length) { break; }
                activeSlides.push(swiper.slides.eq(index)[0]);
            }
        } else {
            activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
        }

        // Find new height from highest slide in view
        for (i = 0; i < activeSlides.length; i += 1) {
            if (typeof activeSlides[i] !== 'undefined') {
                var height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
        }

        // Update Height
        if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
    }

    function updateSlidesOffset() {
        var swiper = this;
        var slides = swiper.slides;
        for (var i = 0; i < slides.length; i += 1) {
            slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
        }
    }

    function updateSlidesProgress(translate) {
        if (translate === void 0) translate = (this && this.translate) || 0;

        var swiper = this;
        var params = swiper.params;

        var slides = swiper.slides;
        var rtl = swiper.rtlTranslate;

        if (slides.length === 0) { return; }
        if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

        var offsetCenter = -translate;
        if (rtl) { offsetCenter = translate; }

        // Visible Slides
        slides.removeClass(params.slideVisibleClass);

        for (var i = 0; i < slides.length; i += 1) {
            var slide = slides[i];
            var slideProgress =
                (
                    (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
                ) / (slide.swiperSlideSize + params.spaceBetween);
            if (params.watchSlidesVisibility) {
                var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                var isVisible =
                    (slideBefore >= 0 && slideBefore < swiper.size) ||
                    (slideAfter > 0 && slideAfter <= swiper.size) ||
                    (slideBefore <= 0 && slideAfter >= swiper.size);
                if (isVisible) {
                    slides.eq(i).addClass(params.slideVisibleClass);
                }
            }
            slide.progress = rtl ? -slideProgress : slideProgress;
        }
    }

    function updateProgress(translate) {
        if (translate === void 0) translate = (this && this.translate) || 0;

        var swiper = this;
        var params = swiper.params;

        var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        var progress = swiper.progress;
        var isBeginning = swiper.isBeginning;
        var isEnd = swiper.isEnd;
        var wasBeginning = isBeginning;
        var wasEnd = isEnd;
        if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / (translatesDiff);
            isBeginning = progress <= 0;
            isEnd = progress >= 1;
        }
        Utils.extend(swiper, {
            progress: progress,
            isBeginning: isBeginning,
            isEnd: isEnd,
        });

        if (params.watchSlidesProgress || params.watchSlidesVisibility) { swiper.updateSlidesProgress(translate); }

        if (isBeginning && !wasBeginning) {
            swiper.emit('reachBeginning toEdge');
        }
        if (isEnd && !wasEnd) {
            swiper.emit('reachEnd toEdge');
        }
        if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
            swiper.emit('fromEdge');
        }

        swiper.emit('progress', progress);
    }

    function updateSlidesClasses() {
        var swiper = this;

        var slides = swiper.slides;
        var params = swiper.params;
        var $wrapperEl = swiper.$wrapperEl;
        var activeIndex = swiper.activeIndex;
        var realIndex = swiper.realIndex;
        var isVirtual = swiper.virtual && params.virtual.enabled;

        slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

        var activeSlide;
        if (isVirtual) {
            activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
        } else {
            activeSlide = slides.eq(activeIndex);
        }

        // Active classes
        activeSlide.addClass(params.slideActiveClass);

        if (params.loop) {
            // Duplicate to all looped slides
            if (activeSlide.hasClass(params.slideDuplicateClass)) {
                $wrapperEl
                    .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
                    .addClass(params.slideDuplicateActiveClass);
            } else {
                $wrapperEl
                    .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
                    .addClass(params.slideDuplicateActiveClass);
            }
        }
        // Next Slide
        var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
        if (params.loop && nextSlide.length === 0) {
            nextSlide = slides.eq(0);
            nextSlide.addClass(params.slideNextClass);
        }
        // Prev Slide
        var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
        if (params.loop && prevSlide.length === 0) {
            prevSlide = slides.eq(-1);
            prevSlide.addClass(params.slidePrevClass);
        }
        if (params.loop) {
            // Duplicate to all looped slides
            if (nextSlide.hasClass(params.slideDuplicateClass)) {
                $wrapperEl
                    .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
                    .addClass(params.slideDuplicateNextClass);
            } else {
                $wrapperEl
                    .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
                    .addClass(params.slideDuplicateNextClass);
            }
            if (prevSlide.hasClass(params.slideDuplicateClass)) {
                $wrapperEl
                    .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
                    .addClass(params.slideDuplicatePrevClass);
            } else {
                $wrapperEl
                    .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
                    .addClass(params.slideDuplicatePrevClass);
            }
        }
    }

    function updateActiveIndex(newActiveIndex) {
        var swiper = this;
        var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        var slidesGrid = swiper.slidesGrid;
        var snapGrid = swiper.snapGrid;
        var params = swiper.params;
        var previousIndex = swiper.activeIndex;
        var previousRealIndex = swiper.realIndex;
        var previousSnapIndex = swiper.snapIndex;
        var activeIndex = newActiveIndex;
        var snapIndex;
        if (typeof activeIndex === 'undefined') {
            for (var i = 0; i < slidesGrid.length; i += 1) {
                if (typeof slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
                        activeIndex = i;
                    } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
                        activeIndex = i + 1;
                    }
                } else if (translate >= slidesGrid[i]) {
                    activeIndex = i;
                }
            }
            // Normalize slideIndex
            if (params.normalizeSlideIndex) {
                if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
            }
        }
        if (snapGrid.indexOf(translate) >= 0) {
            snapIndex = snapGrid.indexOf(translate);
        } else {
            snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
        if (activeIndex === previousIndex) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit('snapIndexChange');
            }
            return;
        }

        // Get real index
        var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

        Utils.extend(swiper, {
            snapIndex: snapIndex,
            realIndex: realIndex,
            previousIndex: previousIndex,
            activeIndex: activeIndex,
        });
        swiper.emit('activeIndexChange');
        swiper.emit('snapIndexChange');
        if (previousRealIndex !== realIndex) {
            swiper.emit('realIndexChange');
        }
        swiper.emit('slideChange');
    }

    function updateClickedSlide(e) {
        var swiper = this;
        var params = swiper.params;
        var slide = $(e.target).closest(("." + (params.slideClass)))[0];
        var slideFound = false;
        if (slide) {
            for (var i = 0; i < swiper.slides.length; i += 1) {
                if (swiper.slides[i] === slide) { slideFound = true; }
            }
        }

        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) {
                swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
            } else {
                swiper.clickedIndex = $(slide).index();
            }
        } else {
            swiper.clickedSlide = undefined;
            swiper.clickedIndex = undefined;
            return;
        }
        if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
            swiper.slideToClickedSlide();
        }
    }

    var update = {
        updateSize: updateSize,
        updateSlides: updateSlides,
        updateAutoHeight: updateAutoHeight,
        updateSlidesOffset: updateSlidesOffset,
        updateSlidesProgress: updateSlidesProgress,
        updateProgress: updateProgress,
        updateSlidesClasses: updateSlidesClasses,
        updateActiveIndex: updateActiveIndex,
        updateClickedSlide: updateClickedSlide,
    };

    function getTranslate(axis) {
        if (axis === void 0) axis = this.isHorizontal() ? 'x' : 'y';

        var swiper = this;

        var params = swiper.params;
        var rtl = swiper.rtlTranslate;
        var translate = swiper.translate;
        var $wrapperEl = swiper.$wrapperEl;

        if (params.virtualTranslate) {
            return rtl ? -translate : translate;
        }

        var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
        if (rtl) { currentTranslate = -currentTranslate; }

        return currentTranslate || 0;
    }

    function setTranslate(translate, byController) {
        var swiper = this;
        var rtl = swiper.rtlTranslate;
        var params = swiper.params;
        var $wrapperEl = swiper.$wrapperEl;
        var progress = swiper.progress;
        var x = 0;
        var y = 0;
        var z = 0;

        if (swiper.isHorizontal()) {
            x = rtl ? -translate : translate;
        } else {
            y = translate;
        }

        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }

        if (!params.virtualTranslate) {
            if (Support.transforms3d) { $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)")); }
            else { $wrapperEl.transform(("translate(" + x + "px, " + y + "px)")); }
        }
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;

        // Check if we need to update progress
        var newProgress;
        var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) {
            newProgress = 0;
        } else {
            newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
        }
        if (newProgress !== progress) {
            swiper.updateProgress(translate);
        }

        swiper.emit('setTranslate', swiper.translate, byController);
    }

    function minTranslate() {
        return (-this.snapGrid[0]);
    }

    function maxTranslate() {
        return (-this.snapGrid[this.snapGrid.length - 1]);
    }

    var translate = {
        getTranslate: getTranslate,
        setTranslate: setTranslate,
        minTranslate: minTranslate,
        maxTranslate: maxTranslate,
    };

    function setTransition(duration, byController) {
        var swiper = this;

        swiper.$wrapperEl.transition(duration);

        swiper.emit('setTransition', duration, byController);
    }

    function transitionStart(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;

        var swiper = this;
        var activeIndex = swiper.activeIndex;
        var params = swiper.params;
        var previousIndex = swiper.previousIndex;
        if (params.autoHeight) {
            swiper.updateAutoHeight();
        }

        var dir = direction;
        if (!dir) {
            if (activeIndex > previousIndex) { dir = 'next'; }
            else if (activeIndex < previousIndex) { dir = 'prev'; }
            else { dir = 'reset'; }
        }

        swiper.emit('transitionStart');

        if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === 'reset') {
                swiper.emit('slideResetTransitionStart');
                return;
            }
            swiper.emit('slideChangeTransitionStart');
            if (dir === 'next') {
                swiper.emit('slideNextTransitionStart');
            } else {
                swiper.emit('slidePrevTransitionStart');
            }
        }
    }

    function transitionEnd$1(runCallbacks, direction) {
        if (runCallbacks === void 0) runCallbacks = true;

        var swiper = this;
        var activeIndex = swiper.activeIndex;
        var previousIndex = swiper.previousIndex;
        swiper.animating = false;
        swiper.setTransition(0);

        var dir = direction;
        if (!dir) {
            if (activeIndex > previousIndex) { dir = 'next'; }
            else if (activeIndex < previousIndex) { dir = 'prev'; }
            else { dir = 'reset'; }
        }

        swiper.emit('transitionEnd');

        if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === 'reset') {
                swiper.emit('slideResetTransitionEnd');
                return;
            }
            swiper.emit('slideChangeTransitionEnd');
            if (dir === 'next') {
                swiper.emit('slideNextTransitionEnd');
            } else {
                swiper.emit('slidePrevTransitionEnd');
            }
        }
    }

    var transition$1 = {
        setTransition: setTransition,
        transitionStart: transitionStart,
        transitionEnd: transitionEnd$1,
    };

    function slideTo(index, speed, runCallbacks, internal) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;

        var swiper = this;
        var slideIndex = index;
        if (slideIndex < 0) { slideIndex = 0; }

        var params = swiper.params;
        var snapGrid = swiper.snapGrid;
        var slidesGrid = swiper.slidesGrid;
        var previousIndex = swiper.previousIndex;
        var activeIndex = swiper.activeIndex;
        var rtl = swiper.rtlTranslate;
        if (swiper.animating && params.preventIntercationOnTransition) {
            return false;
        }

        var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

        if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
            swiper.emit('beforeSlideChangeStart');
        }

        var translate = -snapGrid[snapIndex];

        // Update progress
        swiper.updateProgress(translate);

        // Normalize slideIndex
        if (params.normalizeSlideIndex) {
            for (var i = 0; i < slidesGrid.length; i += 1) {
                if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
                    slideIndex = i;
                }
            }
        }
        // Directions locks
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
                return false;
            }
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
                if ((activeIndex || 0) !== slideIndex) { return false; }
            }
        }

        var direction;
        if (slideIndex > activeIndex) { direction = 'next'; }
        else if (slideIndex < activeIndex) { direction = 'prev'; }
        else { direction = 'reset'; }


        // Update Index
        if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
            swiper.updateActiveIndex(slideIndex);
            // Update Height
            if (params.autoHeight) {
                swiper.updateAutoHeight();
            }
            swiper.updateSlidesClasses();
            if (params.effect !== 'slide') {
                swiper.setTranslate(translate);
            }
            if (direction !== 'reset') {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }

        if (speed === 0 || !Support.transition) {
            swiper.setTransition(0);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit('beforeTransitionStart', speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            swiper.transitionEnd(runCallbacks, direction);
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit('beforeTransitionStart', speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) {
                    swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) { return; }
                        if (e.target !== this) { return; }
                        swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
                        swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
                        swiper.transitionEnd(runCallbacks, direction);
                    };
                }
                swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            }
        }

        return true;
    }

    function slideToLoop(index, speed, runCallbacks, internal) {
        if (index === void 0) index = 0;
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;

        var swiper = this;
        var newIndex = index;
        if (swiper.params.loop) {
            newIndex += swiper.loopedSlides;
        }

        return swiper.slideTo(newIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideNext(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;

        var swiper = this;
        var params = swiper.params;
        var animating = swiper.animating;
        if (params.loop) {
            if (animating) { return false; }
            swiper.loopFix();
            // eslint-disable-next-line
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
        }
        return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slidePrev(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;

        var swiper = this;
        var params = swiper.params;
        var animating = swiper.animating;
        var snapGrid = swiper.snapGrid;
        var slidesGrid = swiper.slidesGrid;
        var rtlTranslate = swiper.rtlTranslate;

        if (params.loop) {
            if (animating) { return false; }
            swiper.loopFix();
            // eslint-disable-next-line
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
        }
        var translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) { return -Math.floor(Math.abs(val)); }
            return Math.floor(val);
        }
        var normalizedTranslate = normalize(translate);
        var normalizedSnapGrid = snapGrid.map(function (val) { return normalize(val); });
        var normalizedSlidesGrid = slidesGrid.map(function (val) { return normalize(val); });

        var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
        var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        var prevIndex;
        if (typeof prevSnap !== 'undefined') {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) { prevIndex = swiper.activeIndex - 1; }
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideReset(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;

        var swiper = this;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }

    /* eslint no-unused-vars: "off" */
    function slideToClosest(speed, runCallbacks, internal) {
        if (speed === void 0) speed = this.params.speed;
        if (runCallbacks === void 0) runCallbacks = true;

        var swiper = this;
        var index = swiper.activeIndex;
        var snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

        if (snapIndex < swiper.snapGrid.length - 1) {
            var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

            var currentSnap = swiper.snapGrid[snapIndex];
            var nextSnap = swiper.snapGrid[snapIndex + 1];

            if ((translate - currentSnap) > (nextSnap - currentSnap) / 2) {
                index = swiper.params.slidesPerGroup;
            }
        }

        return swiper.slideTo(index, speed, runCallbacks, internal);
    }

    function slideToClickedSlide() {
        var swiper = this;
        var params = swiper.params;
        var $wrapperEl = swiper.$wrapperEl;

        var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        var slideToIndex = swiper.clickedIndex;
        var realIndex;
        if (params.loop) {
            if (swiper.animating) { return; }
            realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
            if (params.centeredSlides) {
                if (
                    (slideToIndex < swiper.loopedSlides - (slidesPerView / 2)) ||
                    (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
                ) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl
                        .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
                        .eq(0)
                        .index();

                    Utils.nextTick(function () {
                        swiper.slideTo(slideToIndex);
                    });
                } else {
                    swiper.slideTo(slideToIndex);
                }
            } else if (slideToIndex > swiper.slides.length - slidesPerView) {
                swiper.loopFix();
                slideToIndex = $wrapperEl
                    .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
                    .eq(0)
                    .index();

                Utils.nextTick(function () {
                    swiper.slideTo(slideToIndex);
                });
            } else {
                swiper.slideTo(slideToIndex);
            }
        } else {
            swiper.slideTo(slideToIndex);
        }
    }

    var slide = {
        slideTo: slideTo,
        slideToLoop: slideToLoop,
        slideNext: slideNext,
        slidePrev: slidePrev,
        slideReset: slideReset,
        slideToClosest: slideToClosest,
        slideToClickedSlide: slideToClickedSlide,
    };

    function loopCreate() {
        var swiper = this;
        var params = swiper.params;
        var $wrapperEl = swiper.$wrapperEl;
        // Remove duplicated slides
        $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

        var slides = $wrapperEl.children(("." + (params.slideClass)));

        if (params.loopFillGroupWithBlank) {
            var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
            if (blankSlidesNum !== params.slidesPerGroup) {
                for (var i = 0; i < blankSlidesNum; i += 1) {
                    var blankNode = $(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
                    $wrapperEl.append(blankNode);
                }
                slides = $wrapperEl.children(("." + (params.slideClass)));
            }
        }

        if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

        swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
        swiper.loopedSlides += params.loopAdditionalSlides;
        if (swiper.loopedSlides > slides.length) {
            swiper.loopedSlides = slides.length;
        }

        var prependSlides = [];
        var appendSlides = [];
        slides.each(function (index, el) {
            var slide = $(el);
            if (index < swiper.loopedSlides) { appendSlides.push(el); }
            if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
            slide.attr('data-swiper-slide-index', index);
        });
        for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
            $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
        for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
            $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
    }

    function loopFix() {
        var swiper = this;
        var params = swiper.params;
        var activeIndex = swiper.activeIndex;
        var slides = swiper.slides;
        var loopedSlides = swiper.loopedSlides;
        var allowSlidePrev = swiper.allowSlidePrev;
        var allowSlideNext = swiper.allowSlideNext;
        var snapGrid = swiper.snapGrid;
        var rtl = swiper.rtlTranslate;
        var newIndex;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;

        var snapTranslate = -snapGrid[activeIndex];
        var diff = snapTranslate - swiper.getTranslate();


        // Fix For Negative Oversliding
        if (activeIndex < loopedSlides) {
            newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
            newIndex += loopedSlides;
            var slideChanged = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged && diff !== 0) {
                swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
        } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex >= slides.length - loopedSlides)) {
            // Fix For Positive Oversliding
            newIndex = -slides.length + activeIndex + loopedSlides;
            newIndex += loopedSlides;
            var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged$1 && diff !== 0) {
                swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
    }

    function loopDestroy() {
        var swiper = this;
        var $wrapperEl = swiper.$wrapperEl;
        var params = swiper.params;
        var slides = swiper.slides;
        $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();
        slides.removeAttr('data-swiper-slide-index');
    }

    var loop = {
        loopCreate: loopCreate,
        loopFix: loopFix,
        loopDestroy: loopDestroy,
    };

    function setGrabCursor(moving) {
        var swiper = this;
        if (Support.touch || !swiper.params.simulateTouch || (swiper.params.watchOverflow && swiper.isLocked)) { return; }
        var el = swiper.el;
        el.style.cursor = 'move';
        el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
        el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
        el.style.cursor = moving ? 'grabbing' : 'grab';
    }

    function unsetGrabCursor() {
        var swiper = this;
        if (Support.touch || (swiper.params.watchOverflow && swiper.isLocked)) { return; }
        swiper.el.style.cursor = '';
    }

    var grabCursor = {
        setGrabCursor: setGrabCursor,
        unsetGrabCursor: unsetGrabCursor,
    };

    function appendSlide(slides) {
        var swiper = this;
        var $wrapperEl = swiper.$wrapperEl;
        var params = swiper.params;
        if (params.loop) {
            swiper.loopDestroy();
        }
        if (typeof slides === 'object' && 'length' in slides) {
            for (var i = 0; i < slides.length; i += 1) {
                if (slides[i]) { $wrapperEl.append(slides[i]); }
            }
        } else {
            $wrapperEl.append(slides);
        }
        if (params.loop) {
            swiper.loopCreate();
        }
        if (!(params.observer && Support.observer)) {
            swiper.update();
        }
    }

    function prependSlide(slides) {
        var swiper = this;
        var params = swiper.params;
        var $wrapperEl = swiper.$wrapperEl;
        var activeIndex = swiper.activeIndex;

        if (params.loop) {
            swiper.loopDestroy();
        }
        var newActiveIndex = activeIndex + 1;
        if (typeof slides === 'object' && 'length' in slides) {
            for (var i = 0; i < slides.length; i += 1) {
                if (slides[i]) { $wrapperEl.prepend(slides[i]); }
            }
            newActiveIndex = activeIndex + slides.length;
        } else {
            $wrapperEl.prepend(slides);
        }
        if (params.loop) {
            swiper.loopCreate();
        }
        if (!(params.observer && Support.observer)) {
            swiper.update();
        }
        swiper.slideTo(newActiveIndex, 0, false);
    }

    function addSlide(index, slides) {
        var swiper = this;
        var $wrapperEl = swiper.$wrapperEl;
        var params = swiper.params;
        var activeIndex = swiper.activeIndex;
        var activeIndexBuffer = activeIndex;
        if (params.loop) {
            activeIndexBuffer -= swiper.loopedSlides;
            swiper.loopDestroy();
            swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
        }
        var baseLength = swiper.slides.length;
        if (index <= 0) {
            swiper.prependSlide(slides);
            return;
        } else if (index >= baseLength) {
            swiper.appendSlide(slides);
            return;
        }
        var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

        var slidesBuffer = [];
        for (var i = baseLength - 1; i >= index; i -= 1) {
            var currentSlide = swiper.slides.eq(i);
            currentSlide.remove();
            slidesBuffer.unshift(currentSlide);
        }

        if (typeof slides === 'object' && 'length' in slides) {
            for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
                if (slides[i$1]) { $wrapperEl.append(slides[i$1]); }
            }
            newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
        } else {
            $wrapperEl.append(slides);
        }

        for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
            $wrapperEl.append(slidesBuffer[i$2]);
        }

        if (params.loop) {
            swiper.loopCreate();
        }
        if (!(params.observer && Support.observer)) {
            swiper.update();
        }
        if (params.loop) {
            swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
        } else {
            swiper.slideTo(newActiveIndex, 0, false);
        }
    }

    function removeSlide(slidesIndexes) {
        var swiper = this;
        var params = swiper.params;
        var $wrapperEl = swiper.$wrapperEl;
        var activeIndex = swiper.activeIndex;

        var activeIndexBuffer = activeIndex;
        if (params.loop) {
            activeIndexBuffer -= swiper.loopedSlides;
            swiper.loopDestroy();
            swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
        }
        var newActiveIndex = activeIndexBuffer;
        var indexToRemove;

        if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
            for (var i = 0; i < slidesIndexes.length; i += 1) {
                indexToRemove = slidesIndexes[i];
                if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
                if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
            }
            newActiveIndex = Math.max(newActiveIndex, 0);
        } else {
            indexToRemove = slidesIndexes;
            if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
            if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
            newActiveIndex = Math.max(newActiveIndex, 0);
        }

        if (params.loop) {
            swiper.loopCreate();
        }

        if (!(params.observer && Support.observer)) {
            swiper.update();
        }
        if (params.loop) {
            swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
        } else {
            swiper.slideTo(newActiveIndex, 0, false);
        }
    }

    function removeAllSlides() {
        var swiper = this;

        var slidesIndexes = [];
        for (var i = 0; i < swiper.slides.length; i += 1) {
            slidesIndexes.push(i);
        }
        swiper.removeSlide(slidesIndexes);
    }

    var manipulation = {
        appendSlide: appendSlide,
        prependSlide: prependSlide,
        addSlide: addSlide,
        removeSlide: removeSlide,
        removeAllSlides: removeAllSlides,
    };

    var Device = (function Device() {
        var ua = win.navigator.userAgent;

        var device = {
            ios: false,
            android: false,
            androidChrome: false,
            desktop: false,
            windows: false,
            iphone: false,
            ipod: false,
            ipad: false,
            cordova: win.cordova || win.phonegap,
            phonegap: win.cordova || win.phonegap,
        };

        var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


        // Windows
        if (windows) {
            device.os = 'windows';
            device.osVersion = windows[2];
            device.windows = true;
        }
        // Android
        if (android && !windows) {
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
        }
        if (ipad || iphone || ipod) {
            device.os = 'ios';
            device.ios = true;
        }
        // iOS
        if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        }
        if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        }
        if (ipod) {
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        }
        // iOS 8+ changed UA
        if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
            if (device.osVersion.split('.')[0] === '10') {
                device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            }
        }

        // Desktop
        device.desktop = !(device.os || device.android || device.webView);

        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

        // Minimal UI
        if (device.os && device.os === 'ios') {
            var osVersionArr = device.osVersion.split('.');
            var metaViewport = doc.querySelector('meta[name="viewport"]');
            device.minimalUi =
                !device.webView &&
                (ipod || iphone) &&
                (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
        }

        // Pixel Ratio
        device.pixelRatio = win.devicePixelRatio || 1;

        // Export object
        return device;
    }());

    function onTouchStart(event) {
        var swiper = this;
        var data = swiper.touchEventsData;
        var params = swiper.params;
        var touches = swiper.touches;
        if (swiper.animating && params.preventIntercationOnTransition) {
            return;
        }
        var e = event;
        if (e.originalEvent) { e = e.originalEvent; }
        data.isTouchEvent = e.type === 'touchstart';
        if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
        if (data.isTouched && data.isMoved) { return; }
        if (params.noSwiping && $(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) {
            if (!$(e).closest(params.swipeHandler)[0]) { return; }
        }

        touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        var startX = touches.currentX;
        var startY = touches.currentY;

        // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

        if (
            Device.ios &&
            !Device.cordova &&
            params.iOSEdgeSwipeDetection &&
            ((startX <= params.iOSEdgeSwipeThreshold) ||
                (startX >= win.screen.width - params.iOSEdgeSwipeThreshold))
        ) {
            return;
        }

        Utils.extend(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: undefined,
            startMoving: undefined,
        });

        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = Utils.now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = undefined;
        if (params.threshold > 0) { data.allowThresholdMove = false; }
        if (e.type !== 'touchstart') {
            var preventDefault = true;
            if ($(e.target).is(data.formElements)) { preventDefault = false; }
            if (
                doc.activeElement &&
                $(doc.activeElement).is(data.formElements) &&
                doc.activeElement !== e.target
            ) {
                doc.activeElement.blur();
            }
            if (preventDefault && swiper.allowTouchMove) {
                e.preventDefault();
            }
        }
        swiper.emit('touchStart', e);
    }

    function onTouchMove(event) {
        var swiper = this;
        var data = swiper.touchEventsData;
        var params = swiper.params;
        var touches = swiper.touches;
        var rtl = swiper.rtlTranslate;
        var e = event;
        if (e.originalEvent) { e = e.originalEvent; }
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) {
                swiper.emit('touchMoveOpposite', e);
            }
            return;
        }
        if (data.isTouchEvent && e.type === 'mousemove') { return; }
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            // isMoved = true;
            swiper.allowClick = false;
            if (data.isTouched) {
                Utils.extend(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY,
                });
                data.touchStartTime = Utils.now();
            }
            return;
        }
        if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
            if (swiper.isVertical()) {
                // Vertical
                if (
                    (pageY < touches.startY && swiper.translate <= swiper.maxTranslate()) ||
                    (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
                ) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (
                (pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
                (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
            ) {
                return;
            }
        }
        if (data.isTouchEvent && doc.activeElement) {
            if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
        }
        if (data.allowTouchCallbacks) {
            swiper.emit('touchMove', e);
        }
        if (e.targetTouches && e.targetTouches.length > 1) { return; }

        touches.currentX = pageX;
        touches.currentY = pageY;

        var diffX = touches.currentX - touches.startX;
        var diffY = touches.currentY - touches.startY;

        if (typeof data.isScrolling === 'undefined') {
            var touchAngle;
            if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
                data.isScrolling = false;
            } else {
                // eslint-disable-next-line
                if ((diffX * diffX) + (diffY * diffY) >= 25) {
                    touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
                }
            }
        }
        if (data.isScrolling) {
            swiper.emit('touchMoveOpposite', e);
        }
        if (typeof startMoving === 'undefined') {
            if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
                data.startMoving = true;
            }
        }
        if (data.isScrolling) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) {
            return;
        }
        swiper.allowClick = false;
        e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) {
            e.stopPropagation();
        }

        if (!data.isMoved) {
            if (params.loop) {
                swiper.loopFix();
            }
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
                swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
            }
            data.allowMomentumBounce = false;
            // Grab Cursor
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
                swiper.setGrabCursor(true);
            }
            swiper.emit('sliderFirstMove', e);
        }
        swiper.emit('sliderMove', e);
        data.isMoved = true;

        var diff = swiper.isHorizontal() ? diffX : diffY;
        touches.diff = diff;

        diff *= params.touchRatio;
        if (rtl) { diff = -diff; }

        swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
        data.currentTranslate = diff + data.startTranslate;

        var disableParentSwiper = true;
        var resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) {
            resistanceRatio = 0;
        }
        if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
            disableParentSwiper = false;
            if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow((-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio)); }
        } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
            disableParentSwiper = false;
            if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow((swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio)); }
        }

        if (disableParentSwiper) {
            e.preventedByNestedSwiper = true;
        }

        // Directions locks
        if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
            data.currentTranslate = data.startTranslate;
        }
        if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
            data.currentTranslate = data.startTranslate;
        }


        // Threshold
        if (params.threshold > 0) {
            if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
        }

        if (!params.followFinger) { return; }

        // Update active index in free mode
        if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (params.freeMode) {
            // Velocity
            if (data.velocities.length === 0) {
                data.velocities.push({
                    position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
                    time: data.touchStartTime,
                });
            }
            data.velocities.push({
                position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
                time: Utils.now(),
            });
        }
        // Update progress
        swiper.updateProgress(data.currentTranslate);
        // Update translate
        swiper.setTranslate(data.currentTranslate);
    }

    function onTouchEnd(event) {
        var swiper = this;
        var data = swiper.touchEventsData;

        var params = swiper.params;
        var touches = swiper.touches;
        var rtl = swiper.rtlTranslate;
        var $wrapperEl = swiper.$wrapperEl;
        var slidesGrid = swiper.slidesGrid;
        var snapGrid = swiper.snapGrid;
        var e = event;
        if (e.originalEvent) { e = e.originalEvent; }
        if (data.allowTouchCallbacks) {
            swiper.emit('touchEnd', e);
        }
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) {
                swiper.setGrabCursor(false);
            }
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        // Return Grab Cursor
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
            swiper.setGrabCursor(false);
        }

        // Time diff
        var touchEndTime = Utils.now();
        var timeDiff = touchEndTime - data.touchStartTime;

        // Tap, doubleTap, Click
        if (swiper.allowClick) {
            swiper.updateClickedSlide(e);
            swiper.emit('tap', e);
            if (timeDiff < 300 && (touchEndTime - data.lastClickTime) > 300) {
                if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
                data.clickTimeout = Utils.nextTick(function () {
                    if (!swiper || swiper.destroyed) { return; }
                    swiper.emit('click', e);
                }, 300);
            }
            if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
                if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
                swiper.emit('doubleTap', e);
            }
        }

        data.lastClickTime = Utils.now();
        Utils.nextTick(function () {
            if (!swiper.destroyed) { swiper.allowClick = true; }
        });

        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;

        var currentPos;
        if (params.followFinger) {
            currentPos = rtl ? swiper.translate : -swiper.translate;
        } else {
            currentPos = -data.currentTranslate;
        }

        if (params.freeMode) {
            if (currentPos < -swiper.minTranslate()) {
                swiper.slideTo(swiper.activeIndex);
                return;
            } else if (currentPos > -swiper.maxTranslate()) {
                if (swiper.slides.length < snapGrid.length) {
                    swiper.slideTo(snapGrid.length - 1);
                } else {
                    swiper.slideTo(swiper.slides.length - 1);
                }
                return;
            }

            if (params.freeModeMomentum) {
                if (data.velocities.length > 1) {
                    var lastMoveEvent = data.velocities.pop();
                    var velocityEvent = data.velocities.pop();

                    var distance = lastMoveEvent.position - velocityEvent.position;
                    var time = lastMoveEvent.time - velocityEvent.time;
                    swiper.velocity = distance / time;
                    swiper.velocity /= 2;
                    if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
                        swiper.velocity = 0;
                    }
                    // this implies that the user stopped moving a finger then released.
                    // There would be no events with distance zero, so the last event is stale.
                    if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
                        swiper.velocity = 0;
                    }
                } else {
                    swiper.velocity = 0;
                }
                swiper.velocity *= params.freeModeMomentumVelocityRatio;

                data.velocities.length = 0;
                var momentumDuration = 1000 * params.freeModeMomentumRatio;
                var momentumDistance = swiper.velocity * momentumDuration;

                var newPosition = swiper.translate + momentumDistance;
                if (rtl) { newPosition = -newPosition; }

                var doBounce = false;
                var afterBouncePosition;
                var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
                var needsLoopFix;
                if (newPosition < swiper.maxTranslate()) {
                    if (params.freeModeMomentumBounce) {
                        if (newPosition + swiper.maxTranslate() < -bounceAmount) {
                            newPosition = swiper.maxTranslate() - bounceAmount;
                        }
                        afterBouncePosition = swiper.maxTranslate();
                        doBounce = true;
                        data.allowMomentumBounce = true;
                    } else {
                        newPosition = swiper.maxTranslate();
                    }
                    if (params.loop && params.centeredSlides) { needsLoopFix = true; }
                } else if (newPosition > swiper.minTranslate()) {
                    if (params.freeModeMomentumBounce) {
                        if (newPosition - swiper.minTranslate() > bounceAmount) {
                            newPosition = swiper.minTranslate() + bounceAmount;
                        }
                        afterBouncePosition = swiper.minTranslate();
                        doBounce = true;
                        data.allowMomentumBounce = true;
                    } else {
                        newPosition = swiper.minTranslate();
                    }
                    if (params.loop && params.centeredSlides) { needsLoopFix = true; }
                } else if (params.freeModeSticky) {
                    var nextSlide;
                    for (var j = 0; j < snapGrid.length; j += 1) {
                        if (snapGrid[j] > -newPosition) {
                            nextSlide = j;
                            break;
                        }
                    }

                    if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
                        newPosition = snapGrid[nextSlide];
                    } else {
                        newPosition = snapGrid[nextSlide - 1];
                    }
                    newPosition = -newPosition;
                }
                if (needsLoopFix) {
                    swiper.once('transitionEnd', function () {
                        swiper.loopFix();
                    });
                }
                // Fix duration
                if (swiper.velocity !== 0) {
                    if (rtl) {
                        momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
                    } else {
                        momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
                    }
                } else if (params.freeModeSticky) {
                    swiper.slideToClosest();
                    return;
                }

                if (params.freeModeMomentumBounce && doBounce) {
                    swiper.updateProgress(afterBouncePosition);
                    swiper.setTransition(momentumDuration);
                    swiper.setTranslate(newPosition);
                    swiper.transitionStart(true, swiper.swipeDirection);
                    swiper.animating = true;
                    $wrapperEl.transitionEnd(function () {
                        if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
                        swiper.emit('momentumBounce');

                        swiper.setTransition(params.speed);
                        swiper.setTranslate(afterBouncePosition);
                        $wrapperEl.transitionEnd(function () {
                            if (!swiper || swiper.destroyed) { return; }
                            swiper.transitionEnd();
                        });
                    });
                } else if (swiper.velocity) {
                    swiper.updateProgress(newPosition);
                    swiper.setTransition(momentumDuration);
                    swiper.setTranslate(newPosition);
                    swiper.transitionStart(true, swiper.swipeDirection);
                    if (!swiper.animating) {
                        swiper.animating = true;
                        $wrapperEl.transitionEnd(function () {
                            if (!swiper || swiper.destroyed) { return; }
                            swiper.transitionEnd();
                        });
                    }
                } else {
                    swiper.updateProgress(newPosition);
                }

                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            } else if (params.freeModeSticky) {
                swiper.slideToClosest();
                return;
            }

            if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
                swiper.updateProgress();
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            return;
        }

        // Find current slide
        var stopIndex = 0;
        var groupSize = swiper.slidesSizesGrid[0];
        for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
            if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
                if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
                }
            } else if (currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }

        // Find current slide size
        var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

        if (timeDiff > params.longSwipesMs) {
            // Long touches
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === 'next') {
                if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
                else { swiper.slideTo(stopIndex); }
            }
            if (swiper.swipeDirection === 'prev') {
                if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
                else { swiper.slideTo(stopIndex); }
            }
        } else {
            // Short swipes
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === 'next') {
                swiper.slideTo(stopIndex + params.slidesPerGroup);
            }
            if (swiper.swipeDirection === 'prev') {
                swiper.slideTo(stopIndex);
            }
        }
    }

    function onResize() {
        var swiper = this;

        var params = swiper.params;
        var el = swiper.el;

        if (el && el.offsetWidth === 0) { return; }

        // Breakpoints
        if (params.breakpoints) {
            swiper.setBreakpoint();
        }

        // Save locks
        var allowSlideNext = swiper.allowSlideNext;
        var allowSlidePrev = swiper.allowSlidePrev;
        var snapGrid = swiper.snapGrid;

        // Disable locks on resize
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;

        swiper.updateSize();
        swiper.updateSlides();

        if (params.freeMode) {
            var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
            swiper.setTranslate(newTranslate);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();

            if (params.autoHeight) {
                swiper.updateAutoHeight();
            }
        } else {
            swiper.updateSlidesClasses();
            if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
                swiper.slideTo(swiper.slides.length - 1, 0, false, true);
            } else {
                swiper.slideTo(swiper.activeIndex, 0, false, true);
            }
        }
        // Return locks after resize
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;

        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
            swiper.checkOverflow();
        }
    }

    function onClick(e) {
        var swiper = this;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) { e.preventDefault(); }
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }

    function attachEvents() {
        var swiper = this;
        var params = swiper.params;
        var touchEvents = swiper.touchEvents;
        var el = swiper.el;
        var wrapperEl = swiper.wrapperEl;

        {
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
        }

        swiper.onClick = onClick.bind(swiper);

        var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
        var capture = !!params.nested;

        // Touch Events
        {
            if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
                target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
                doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
                doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
            } else {
                if (Support.touch) {
                    var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
                    target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
                    target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
                    target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
                }
                if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
                    target.addEventListener('mousedown', swiper.onTouchStart, false);
                    doc.addEventListener('mousemove', swiper.onTouchMove, capture);
                    doc.addEventListener('mouseup', swiper.onTouchEnd, false);
                }
            }
            // Prevent Links Clicks
            if (params.preventClicks || params.preventClicksPropagation) {
                target.addEventListener('click', swiper.onClick, true);
            }
        }

        // Resize handler
        swiper.on((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize, true);
    }

    function detachEvents() {
        var swiper = this;

        var params = swiper.params;
        var touchEvents = swiper.touchEvents;
        var el = swiper.el;
        var wrapperEl = swiper.wrapperEl;

        var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
        var capture = !!params.nested;

        // Touch Events
        {
            if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
                target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
                doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
                doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
            } else {
                if (Support.touch) {
                    var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
                    target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
                    target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
                    target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
                }
                if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
                    target.removeEventListener('mousedown', swiper.onTouchStart, false);
                    doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
                    doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
                }
            }
            // Prevent Links Clicks
            if (params.preventClicks || params.preventClicksPropagation) {
                target.removeEventListener('click', swiper.onClick, true);
            }
        }

        // Resize handler
        swiper.off((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize);
    }

    var events = {
        attachEvents: attachEvents,
        detachEvents: detachEvents,
    };

    function setBreakpoint() {
        var swiper = this;
        var activeIndex = swiper.activeIndex;
        var initialized = swiper.initialized;
        var loopedSlides = swiper.loopedSlides; if (loopedSlides === void 0) loopedSlides = 0;
        var params = swiper.params;
        var breakpoints = params.breakpoints;
        if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }
        // Set breakpoint for window width and update parameters
        var breakpoint = swiper.getBreakpoint(breakpoints);
        if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
            var breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
            var needsReLoop = params.loop && (breakPointsParams.slidesPerView !== params.slidesPerView);

            Utils.extend(swiper.params, breakPointsParams);

            Utils.extend(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
            });

            swiper.currentBreakpoint = breakpoint;

            if (needsReLoop && initialized) {
                swiper.loopDestroy();
                swiper.loopCreate();
                swiper.updateSlides();
                swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
            }
            swiper.emit('breakpoint', breakPointsParams);
        }
    }

    function getBreakpoint(breakpoints) {
        // Get breakpoint for window width
        if (!breakpoints) { return undefined; }
        var breakpoint = false;
        var points = [];
        Object.keys(breakpoints).forEach(function (point) {
            points.push(point);
        });
        points.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
        for (var i = 0; i < points.length; i += 1) {
            var point = points[i];
            if (point >= win.innerWidth && !breakpoint) {
                breakpoint = point;
            }
        }
        return breakpoint || 'max';
    }

    var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

    var Browser = (function Browser() {
        function isSafari() {
            var ua = win.navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        }
        return {
            isIE: !!win.navigator.userAgent.match(/Trident/g) || !!win.navigator.userAgent.match(/MSIE/g),
            isSafari: isSafari(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
        };
    }());

    function addClasses() {
        var swiper = this;
        var classNames = swiper.classNames;
        var params = swiper.params;
        var rtl = swiper.rtl;
        var $el = swiper.$el;
        var suffixes = [];

        suffixes.push(params.direction);

        if (params.freeMode) {
            suffixes.push('free-mode');
        }
        if (!Support.flexbox) {
            suffixes.push('no-flexbox');
        }
        if (params.autoHeight) {
            suffixes.push('autoheight');
        }
        if (rtl) {
            suffixes.push('rtl');
        }
        if (params.slidesPerColumn > 1) {
            suffixes.push('multirow');
        }
        if (Device.android) {
            suffixes.push('android');
        }
        if (Device.ios) {
            suffixes.push('ios');
        }
        // WP8 Touch Events Fix
        if (Browser.isIE && (Support.pointerEvents || Support.prefixedPointerEvents)) {
            suffixes.push(("wp8-" + (params.direction)));
        }

        suffixes.forEach(function (suffix) {
            classNames.push(params.containerModifierClass + suffix);
        });

        $el.addClass(classNames.join(' '));
    }

    function removeClasses() {
        var swiper = this;
        var $el = swiper.$el;
        var classNames = swiper.classNames;

        $el.removeClass(classNames.join(' '));
    }

    var classes = { addClasses: addClasses, removeClasses: removeClasses };

    function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
        var image;
        function onReady() {
            if (callback) { callback(); }
        }
        if (!imageEl.complete || !checkForComplete) {
            if (src) {
                image = new win.Image();
                image.onload = onReady;
                image.onerror = onReady;
                if (sizes) {
                    image.sizes = sizes;
                }
                if (srcset) {
                    image.srcset = srcset;
                }
                if (src) {
                    image.src = src;
                }
            } else {
                onReady();
            }
        } else {
            // image already loaded...
            onReady();
        }
    }

    function preloadImages() {
        var swiper = this;
        swiper.imagesToLoad = swiper.$el.find('img');
        function onReady() {
            if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
            if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
            if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                if (swiper.params.updateOnImagesReady) { swiper.update(); }
                swiper.emit('imagesReady');
            }
        }
        for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
            var imageEl = swiper.imagesToLoad[i];
            swiper.loadImage(
                imageEl,
                imageEl.currentSrc || imageEl.getAttribute('src'),
                imageEl.srcset || imageEl.getAttribute('srcset'),
                imageEl.sizes || imageEl.getAttribute('sizes'),
                true,
                onReady
            );
        }
    }

    var images = {
        loadImage: loadImage,
        preloadImages: preloadImages,
    };

    function checkOverflow() {
        var swiper = this;
        var wasLocked = swiper.isLocked;

        swiper.isLocked = swiper.snapGrid.length === 1;
        swiper.allowSlideNext = !swiper.isLocked;
        swiper.allowSlidePrev = !swiper.isLocked;

        // events
        if (wasLocked !== swiper.isLocked) { swiper.emit(swiper.isLocked ? 'lock' : 'unlock'); }

        if (wasLocked && wasLocked !== swiper.isLocked) {
            swiper.isEnd = false;
            swiper.navigation.update();
        }
    }

    var checkOverflow$1 = { checkOverflow: checkOverflow };

    var defaults = {
        init: true,
        direction: 'horizontal',
        touchEventsTarget: 'container',
        initialSlide: 0,
        speed: 300,
        //
        preventIntercationOnTransition: false,

        // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
        iOSEdgeSwipeDetection: false,
        iOSEdgeSwipeThreshold: 20,

        // Free mode
        freeMode: false,
        freeModeMomentum: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: true,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: false,
        freeModeMinimumVelocity: 0.02,

        // Autoheight
        autoHeight: false,

        // Set wrapper width
        setWrapperSize: false,

        // Virtual Translate
        virtualTranslate: false,

        // Effects
        effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

        // Breakpoints
        breakpoints: undefined,

        // Slides grid
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: 'column',
        slidesPerGroup: 1,
        centeredSlides: false,
        slidesOffsetBefore: 0, // in px
        slidesOffsetAfter: 0, // in px
        normalizeSlideIndex: true,

        // Disable swiper and hide navigation when container not overflow
        watchOverflow: false,

        // Round length
        roundLengths: false,

        // Touches
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 0,
        touchMoveStopPropagation: true,
        touchReleaseOnEdges: false,

        // Unique Navigation Elements
        uniqueNavElements: true,

        // Resistance
        resistance: true,
        resistanceRatio: 0.85,

        // Progress
        watchSlidesProgress: false,
        watchSlidesVisibility: false,

        // Cursor
        grabCursor: false,

        // Clicks
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,

        // Images
        preloadImages: true,
        updateOnImagesReady: true,

        // loop
        loop: false,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: false,

        // Swiping/no swiping
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null, // '.swipe-handler',
        noSwiping: true,
        noSwipingClass: 'swiper-no-swiping',
        noSwipingSelector: null,

        // Passive Listeners
        passiveListeners: true,

        // NS
        containerModifierClass: 'swiper-container-', // NEW
        slideClass: 'swiper-slide',
        slideBlankClass: 'swiper-slide-invisible-blank',
        slideActiveClass: 'swiper-slide-active',
        slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
        slideVisibleClass: 'swiper-slide-visible',
        slideDuplicateClass: 'swiper-slide-duplicate',
        slideNextClass: 'swiper-slide-next',
        slideDuplicateNextClass: 'swiper-slide-duplicate-next',
        slidePrevClass: 'swiper-slide-prev',
        slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
        wrapperClass: 'swiper-wrapper',

        // Callbacks
        runCallbacksOnInit: true,
    };

    var prototypes = {
        update: update,
        translate: translate,
        transition: transition$1,
        slide: slide,
        loop: loop,
        grabCursor: grabCursor,
        manipulation: manipulation,
        events: events,
        breakpoints: breakpoints,
        checkOverflow: checkOverflow$1,
        classes: classes,
        images: images,
    };

    var extendedDefaults = {};

    var Swiper = (function (SwiperClass$$1) {
        function Swiper() {
            var assign;

            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];
            var el;
            var params;
            if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
                params = args[0];
            } else {
                (assign = args, el = assign[0], params = assign[1]);
            }
            if (!params) { params = {}; }

            params = Utils.extend({}, params);
            if (el && !params.el) { params.el = el; }

            SwiperClass$$1.call(this, params);

            Object.keys(prototypes).forEach(function (prototypeGroup) {
                Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
                    if (!Swiper.prototype[protoMethod]) {
                        Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
                    }
                });
            });

            // Swiper Instance
            var swiper = this;
            if (typeof swiper.modules === 'undefined') {
                swiper.modules = {};
            }
            Object.keys(swiper.modules).forEach(function (moduleName) {
                var module = swiper.modules[moduleName];
                if (module.params) {
                    var moduleParamName = Object.keys(module.params)[0];
                    var moduleParams = module.params[moduleParamName];
                    if (typeof moduleParams !== 'object') { return; }
                    if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
                    if (params[moduleParamName] === true) {
                        params[moduleParamName] = { enabled: true };
                    }
                    if (
                        typeof params[moduleParamName] === 'object' &&
                        !('enabled' in params[moduleParamName])
                    ) {
                        params[moduleParamName].enabled = true;
                    }
                    if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
                }
            });

            // Extend defaults with modules params
            var swiperParams = Utils.extend({}, defaults);
            swiper.useModulesParams(swiperParams);

            // Extend defaults with passed params
            swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = Utils.extend({}, swiper.params);
            swiper.passedParams = Utils.extend({}, params);

            // Save Dom lib
            swiper.$ = $;

            // Find el
            var $el = $(swiper.params.el);
            el = $el[0];

            if (!el) {
                return undefined;
            }

            if ($el.length > 1) {
                var swipers = [];
                $el.each(function (index, containerEl) {
                    var newParams = Utils.extend({}, params, { el: containerEl });
                    swipers.push(new Swiper(newParams));
                });
                return swipers;
            }

            el.swiper = swiper;
            $el.data('swiper', swiper);

            // Find Wrapper
            var $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));

            // Extend Swiper
            Utils.extend(swiper, {
                $el: $el,
                el: el,
                $wrapperEl: $wrapperEl,
                wrapperEl: $wrapperEl[0],

                // Classes
                classNames: [],

                // Slides
                slides: $(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],

                // isDirection
                isHorizontal: function isHorizontal() {
                    return swiper.params.direction === 'horizontal';
                },
                isVertical: function isVertical() {
                    return swiper.params.direction === 'vertical';
                },
                // RTL
                rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
                rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
                wrongRTL: $wrapperEl.css('display') === '-webkit-box',

                // Indexes
                activeIndex: 0,
                realIndex: 0,

                //
                isBeginning: true,
                isEnd: false,

                // Props
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,

                // Locks
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,

                // Touch Events
                touchEvents: (function touchEvents() {
                    var touch = ['touchstart', 'touchmove', 'touchend'];
                    var desktop = ['mousedown', 'mousemove', 'mouseup'];
                    if (Support.pointerEvents) {
                        desktop = ['pointerdown', 'pointermove', 'pointerup'];
                    } else if (Support.prefixedPointerEvents) {
                        desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
                    }
                    swiper.touchEventsTouch = {
                        start: touch[0],
                        move: touch[1],
                        end: touch[2],
                    };
                    swiper.touchEventsDesktop = {
                        start: desktop[0],
                        move: desktop[1],
                        end: desktop[2],
                    };
                    return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                }()),
                touchEventsData: {
                    isTouched: undefined,
                    isMoved: undefined,
                    allowTouchCallbacks: undefined,
                    touchStartTime: undefined,
                    isScrolling: undefined,
                    currentTranslate: undefined,
                    startTranslate: undefined,
                    allowThresholdMove: undefined,
                    // Form elements to match
                    formElements: 'input, select, option, textarea, button, video',
                    // Last click time
                    lastClickTime: Utils.now(),
                    clickTimeout: undefined,
                    // Velocities
                    velocities: [],
                    allowMomentumBounce: undefined,
                    isTouchEvent: undefined,
                    startMoving: undefined,
                },

                // Clicks
                allowClick: true,

                // Touches
                allowTouchMove: swiper.params.allowTouchMove,

                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0,
                },

                // Images
                imagesToLoad: [],
                imagesLoaded: 0,

            });

            // Install Modules
            swiper.useModules();

            // Init
            if (swiper.params.init) {
                swiper.init();
            }

            // Return app instance
            return swiper;
        }

        if (SwiperClass$$1) Swiper.__proto__ = SwiperClass$$1;
        Swiper.prototype = Object.create(SwiperClass$$1 && SwiperClass$$1.prototype);
        Swiper.prototype.constructor = Swiper;

        var staticAccessors = { extendedDefaults: { configurable: true }, defaults: { configurable: true }, Class: { configurable: true }, $: { configurable: true } };
        Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic() {
            var swiper = this;
            var params = swiper.params;
            var slides = swiper.slides;
            var slidesGrid = swiper.slidesGrid;
            var swiperSize = swiper.size;
            var activeIndex = swiper.activeIndex;
            var spv = 1;
            if (params.centeredSlides) {
                var slideSize = slides[activeIndex].swiperSlideSize;
                var breakLoop;
                for (var i = activeIndex + 1; i < slides.length; i += 1) {
                    if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) { breakLoop = true; }
                    }
                }
                for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
                    if (slides[i$1] && !breakLoop) {
                        slideSize += slides[i$1].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) { breakLoop = true; }
                    }
                }
            } else {
                for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
                    if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
                        spv += 1;
                    }
                }
            }
            return spv;
        };
        Swiper.prototype.update = function update$$1() {
            var swiper = this;
            if (!swiper || swiper.destroyed) { return; }
            var snapGrid = swiper.snapGrid;
            var params = swiper.params;
            // Breakpoints
            if (params.breakpoints) {
                swiper.setBreakpoint();
            }
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();

            function setTranslate() {
                var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            var translated;
            if (swiper.params.freeMode) {
                setTranslate();
                if (swiper.params.autoHeight) {
                    swiper.updateAutoHeight();
                }
            } else {
                if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
                    translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
                } else {
                    translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                }
                if (!translated) {
                    setTranslate();
                }
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
                swiper.checkOverflow();
            }
            swiper.emit('update');
        };
        Swiper.prototype.init = function init() {
            var swiper = this;
            if (swiper.initialized) { return; }

            swiper.emit('beforeInit');

            // Set breakpoint
            if (swiper.params.breakpoints) {
                swiper.setBreakpoint();
            }

            // Add Classes
            swiper.addClasses();

            // Create loop
            if (swiper.params.loop) {
                swiper.loopCreate();
            }

            // Update size
            swiper.updateSize();

            // Update slides
            swiper.updateSlides();

            if (swiper.params.watchOverflow) {
                swiper.checkOverflow();
            }

            // Set Grab Cursor
            if (swiper.params.grabCursor) {
                swiper.setGrabCursor();
            }

            if (swiper.params.preloadImages) {
                swiper.preloadImages();
            }

            // Slide To Initial Slide
            if (swiper.params.loop) {
                swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
            } else {
                swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
            }

            // Attach events
            swiper.attachEvents();

            // Init Flag
            swiper.initialized = true;

            // Emit
            swiper.emit('init');
        };
        Swiper.prototype.destroy = function destroy(deleteInstance, cleanStyles) {
            if (deleteInstance === void 0) deleteInstance = true;
            if (cleanStyles === void 0) cleanStyles = true;

            var swiper = this;
            var params = swiper.params;
            var $el = swiper.$el;
            var $wrapperEl = swiper.$wrapperEl;
            var slides = swiper.slides;

            if (typeof swiper.params === 'undefined' || swiper.destroyed) {
                return null;
            }

            swiper.emit('beforeDestroy');

            // Init Flag
            swiper.initialized = false;

            // Detach events
            swiper.detachEvents();

            // Destroy loop
            if (params.loop) {
                swiper.loopDestroy();
            }

            // Cleanup styles
            if (cleanStyles) {
                swiper.removeClasses();
                $el.removeAttr('style');
                $wrapperEl.removeAttr('style');
                if (slides && slides.length) {
                    slides
                        .removeClass([
                            params.slideVisibleClass,
                            params.slideActiveClass,
                            params.slideNextClass,
                            params.slidePrevClass].join(' '))
                        .removeAttr('style')
                        .removeAttr('data-swiper-slide-index')
                        .removeAttr('data-swiper-column')
                        .removeAttr('data-swiper-row');
                }
            }

            swiper.emit('destroy');

            // Detach emitter events
            Object.keys(swiper.eventsListeners).forEach(function (eventName) {
                swiper.off(eventName);
            });

            if (deleteInstance !== false) {
                swiper.$el[0].swiper = null;
                swiper.$el.data('swiper', null);
                Utils.deleteProps(swiper);
            }
            swiper.destroyed = true;

            return null;
        };
        Swiper.extendDefaults = function extendDefaults(newDefaults) {
            Utils.extend(extendedDefaults, newDefaults);
        };
        staticAccessors.extendedDefaults.get = function () {
            return extendedDefaults;
        };
        staticAccessors.defaults.get = function () {
            return defaults;
        };
        staticAccessors.Class.get = function () {
            return SwiperClass$$1;
        };
        staticAccessors.$.get = function () {
            return $;
        };

        Object.defineProperties(Swiper, staticAccessors);

        return Swiper;
    }(SwiperClass));

    var Device$1 = {
        name: 'device',
        proto: {
            device: Device,
        },
        static: {
            device: Device,
        },
    };

    var Support$1 = {
        name: 'support',
        proto: {
            support: Support,
        },
        static: {
            support: Support,
        },
    };

    var Browser$1 = {
        name: 'browser',
        proto: {
            browser: Browser,
        },
        static: {
            browser: Browser,
        },
    };

    var Resize = {
        name: 'resize',
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                resize: {
                    resizeHandler: function resizeHandler() {
                        if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
                        swiper.emit('beforeResize');
                        swiper.emit('resize');
                    },
                    orientationChangeHandler: function orientationChangeHandler() {
                        if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
                        swiper.emit('orientationchange');
                    },
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                // Emit resize
                win.addEventListener('resize', swiper.resize.resizeHandler);

                // Emit orientationchange
                win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
            },
            destroy: function destroy() {
                var swiper = this;
                win.removeEventListener('resize', swiper.resize.resizeHandler);
                win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
            },
        },
    };

    var Observer = {
        func: win.MutationObserver || win.WebkitMutationObserver,
        attach: function attach(target, options) {
            if (options === void 0) options = {};

            var swiper = this;

            var ObserverFunc = Observer.func;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    swiper.emit('observerUpdate', mutation);
                });
            });

            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
            });

            swiper.observer.observers.push(observer);
        },
        init: function init() {
            var swiper = this;
            if (!Support.observer || !swiper.params.observer) { return; }
            if (swiper.params.observeParents) {
                var containerParents = swiper.$el.parents();
                for (var i = 0; i < containerParents.length; i += 1) {
                    swiper.observer.attach(containerParents[i]);
                }
            }
            // Observe container
            swiper.observer.attach(swiper.$el[0], { childList: false });

            // Observe wrapper
            swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
        },
        destroy: function destroy() {
            var swiper = this;
            swiper.observer.observers.forEach(function (observer) {
                observer.disconnect();
            });
            swiper.observer.observers = [];
        },
    };

    var Observer$1 = {
        name: 'observer',
        params: {
            observer: false,
            observeParents: false,
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                observer: {
                    init: Observer.init.bind(swiper),
                    attach: Observer.attach.bind(swiper),
                    destroy: Observer.destroy.bind(swiper),
                    observers: [],
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                swiper.observer.init();
            },
            destroy: function destroy() {
                var swiper = this;
                swiper.observer.destroy();
            },
        },
    };

    var Virtual = {
        update: function update(force) {
            var swiper = this;
            var ref = swiper.params;
            var slidesPerView = ref.slidesPerView;
            var slidesPerGroup = ref.slidesPerGroup;
            var centeredSlides = ref.centeredSlides;
            var ref$1 = swiper.virtual;
            var previousFrom = ref$1.from;
            var previousTo = ref$1.to;
            var slides = ref$1.slides;
            var previousSlidesGrid = ref$1.slidesGrid;
            var renderSlide = ref$1.renderSlide;
            var previousOffset = ref$1.offset;
            swiper.updateActiveIndex();
            var activeIndex = swiper.activeIndex || 0;

            var offsetProp;
            if (swiper.rtlTranslate) { offsetProp = 'right'; }
            else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

            var slidesAfter;
            var slidesBefore;
            if (centeredSlides) {
                slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup;
                slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup;
            } else {
                slidesAfter = slidesPerView + (slidesPerGroup - 1);
                slidesBefore = slidesPerGroup;
            }
            var from = Math.max((activeIndex || 0) - slidesBefore, 0);
            var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
            var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

            Utils.extend(swiper.virtual, {
                from: from,
                to: to,
                offset: offset,
                slidesGrid: swiper.slidesGrid,
            });

            function onRendered() {
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                if (swiper.lazy && swiper.params.lazy.enabled) {
                    swiper.lazy.load();
                }
            }

            if (previousFrom === from && previousTo === to && !force) {
                if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
                    swiper.slides.css(offsetProp, (offset + "px"));
                }
                swiper.updateProgress();
                return;
            }
            if (swiper.params.virtual.renderExternal) {
                swiper.params.virtual.renderExternal.call(swiper, {
                    offset: offset,
                    from: from,
                    to: to,
                    slides: (function getSlides() {
                        var slidesToRender = [];
                        for (var i = from; i <= to; i += 1) {
                            slidesToRender.push(slides[i]);
                        }
                        return slidesToRender;
                    }()),
                });
                onRendered();
                return;
            }
            var prependIndexes = [];
            var appendIndexes = [];
            if (force) {
                swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
            } else {
                for (var i = previousFrom; i <= previousTo; i += 1) {
                    if (i < from || i > to) {
                        swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
                    }
                }
            }
            for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
                if (i$1 >= from && i$1 <= to) {
                    if (typeof previousTo === 'undefined' || force) {
                        appendIndexes.push(i$1);
                    } else {
                        if (i$1 > previousTo) { appendIndexes.push(i$1); }
                        if (i$1 < previousFrom) { prependIndexes.push(i$1); }
                    }
                }
            }
            appendIndexes.forEach(function (index) {
                swiper.$wrapperEl.append(renderSlide(slides[index], index));
            });
            prependIndexes.sort(function (a, b) { return a < b; }).forEach(function (index) {
                swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
            });
            swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
            onRendered();
        },
        renderSlide: function renderSlide(slide, index) {
            var swiper = this;
            var params = swiper.params.virtual;
            if (params.cache && swiper.virtual.cache[index]) {
                return swiper.virtual.cache[index];
            }
            var $slideEl = params.renderSlide
                ? $(params.renderSlide.call(swiper, slide, index))
                : $(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
            if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
            if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
            return $slideEl;
        },
        appendSlide: function appendSlide(slide) {
            var swiper = this;
            swiper.virtual.slides.push(slide);
            swiper.virtual.update(true);
        },
        prependSlide: function prependSlide(slide) {
            var swiper = this;
            swiper.virtual.slides.unshift(slide);
            if (swiper.params.virtual.cache) {
                var cache = swiper.virtual.cache;
                var newCache = {};
                Object.keys(cache).forEach(function (cachedIndex) {
                    newCache[cachedIndex + 1] = cache[cachedIndex];
                });
                swiper.virtual.cache = newCache;
            }
            swiper.virtual.update(true);
            swiper.slideNext(0);
        },
    };

    var Virtual$1 = {
        name: 'virtual',
        params: {
            virtual: {
                enabled: false,
                slides: [],
                cache: true,
                renderSlide: null,
                renderExternal: null,
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                virtual: {
                    update: Virtual.update.bind(swiper),
                    appendSlide: Virtual.appendSlide.bind(swiper),
                    prependSlide: Virtual.prependSlide.bind(swiper),
                    renderSlide: Virtual.renderSlide.bind(swiper),
                    slides: swiper.params.virtual.slides,
                    cache: {},
                },
            });
        },
        on: {
            beforeInit: function beforeInit() {
                var swiper = this;
                if (!swiper.params.virtual.enabled) { return; }
                swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
                var overwriteParams = {
                    watchSlidesProgress: true,
                };
                Utils.extend(swiper.params, overwriteParams);
                Utils.extend(swiper.originalParams, overwriteParams);

                swiper.virtual.update();
            },
            setTranslate: function setTranslate() {
                var swiper = this;
                if (!swiper.params.virtual.enabled) { return; }
                swiper.virtual.update();
            },
        },
    };

    var Keyboard = {
        handle: function handle(event) {
            var swiper = this;
            var rtl = swiper.rtlTranslate;
            var e = event;
            if (e.originalEvent) { e = e.originalEvent; } // jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40))) {
                return false;
            }
            if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38))) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return undefined;
            }
            if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return undefined;
            }
            if (swiper.params.keyboard.onlyInViewport && (kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
                var inView = false;
                // Check that swiper should be inside of visible area of window
                if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
                    return undefined;
                }
                var windowWidth = win.innerWidth;
                var windowHeight = win.innerHeight;
                var swiperOffset = swiper.$el.offset();
                if (rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + swiper.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + swiper.height],
                    [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];
                for (var i = 0; i < swiperCoord.length; i += 1) {
                    var point = swiperCoord[i];
                    if (
                        point[0] >= 0 && point[0] <= windowWidth &&
                        point[1] >= 0 && point[1] <= windowHeight
                    ) {
                        inView = true;
                    }
                }
                if (!inView) { return undefined; }
            }
            if (swiper.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) { e.preventDefault(); }
                    else { e.returnValue = false; }
                }
                if ((kc === 39 && !rtl) || (kc === 37 && rtl)) { swiper.slideNext(); }
                if ((kc === 37 && !rtl) || (kc === 39 && rtl)) { swiper.slidePrev(); }
            } else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) { e.preventDefault(); }
                    else { e.returnValue = false; }
                }
                if (kc === 40) { swiper.slideNext(); }
                if (kc === 38) { swiper.slidePrev(); }
            }
            swiper.emit('keyPress', kc);
            return undefined;
        },
        enable: function enable() {
            var swiper = this;
            if (swiper.keyboard.enabled) { return; }
            $(doc).on('keydown', swiper.keyboard.handle);
            swiper.keyboard.enabled = true;
        },
        disable: function disable() {
            var swiper = this;
            if (!swiper.keyboard.enabled) { return; }
            $(doc).off('keydown', swiper.keyboard.handle);
            swiper.keyboard.enabled = false;
        },
    };

    var Keyboard$1 = {
        name: 'keyboard',
        params: {
            keyboard: {
                enabled: false,
                onlyInViewport: true,
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                keyboard: {
                    enabled: false,
                    enable: Keyboard.enable.bind(swiper),
                    disable: Keyboard.disable.bind(swiper),
                    handle: Keyboard.handle.bind(swiper),
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                if (swiper.params.keyboard.enabled) {
                    swiper.keyboard.enable();
                }
            },
            destroy: function destroy() {
                var swiper = this;
                if (swiper.keyboard.enabled) {
                    swiper.keyboard.disable();
                }
            },
        },
    };

    function isEventSupported() {
        var eventName = 'onwheel';
        var isSupported = eventName in doc;

        if (!isSupported) {
            var element = doc.createElement('div');
            element.setAttribute(eventName, 'return;');
            isSupported = typeof element[eventName] === 'function';
        }

        if (!isSupported &&
            doc.implementation &&
            doc.implementation.hasFeature &&
            // always returns true in newer browsers as per the standard.
            // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
            doc.implementation.hasFeature('', '') !== true
        ) {
            // This is the only way to test support for the `wheel` event in IE9+.
            isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
        }

        return isSupported;
    }
    var Mousewheel = {
        lastScrollTime: Utils.now(),
        event: (function getEvent() {
            if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
            return isEventSupported() ? 'wheel' : 'mousewheel';
        }()),
        normalize: function normalize(e) {
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;

            var sX = 0;
            var sY = 0; // spinX, spinY
            var pX = 0;
            var pY = 0; // pixelX, pixelY

            // Legacy
            if ('detail' in e) {
                sY = e.detail;
            }
            if ('wheelDelta' in e) {
                sY = -e.wheelDelta / 120;
            }
            if ('wheelDeltaY' in e) {
                sY = -e.wheelDeltaY / 120;
            }
            if ('wheelDeltaX' in e) {
                sX = -e.wheelDeltaX / 120;
            }

            // side scrolling on FF with DOMMouseScroll
            if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
                sX = sY;
                sY = 0;
            }

            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;

            if ('deltaY' in e) {
                pY = e.deltaY;
            }
            if ('deltaX' in e) {
                pX = e.deltaX;
            }

            if ((pX || pY) && e.deltaMode) {
                if (e.deltaMode === 1) { // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else { // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }

            // Fall-back if spin cannot be determined
            if (pX && !sX) {
                sX = (pX < 1) ? -1 : 1;
            }
            if (pY && !sY) {
                sY = (pY < 1) ? -1 : 1;
            }

            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY,
            };
        },
        handleMouseEnter: function handleMouseEnter() {
            var swiper = this;
            swiper.mouseEntered = true;
        },
        handleMouseLeave: function handleMouseLeave() {
            var swiper = this;
            swiper.mouseEntered = false;
        },
        handle: function handle(event) {
            var e = event;
            var swiper = this;
            var params = swiper.params.mousewheel;

            if (!swiper.mouseEntered && !params.releaseOnEdges) { return true; }

            if (e.originalEvent) { e = e.originalEvent; } // jquery fix
            var delta = 0;
            var rtlFactor = swiper.rtlTranslate ? -1 : 1;

            var data = Mousewheel.normalize(e);

            if (params.forceToAxis) {
                if (swiper.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
                    else { return true; }
                } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
                else { return true; }
            } else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
            }

            if (delta === 0) { return true; }

            if (params.invert) { delta = -delta; }

            if (!swiper.params.freeMode) {
                if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
                            swiper.slideNext();
                            swiper.emit('scroll', e);
                        } else if (params.releaseOnEdges) { return true; }
                    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
                        swiper.slidePrev();
                        swiper.emit('scroll', e);
                    } else if (params.releaseOnEdges) { return true; }
                }
                swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
            } else {
                // Freemode or scrollContainer:
                if (swiper.params.loop) {
                    swiper.loopFix();
                }
                var position = swiper.getTranslate() + (delta * params.sensitivity);
                var wasBeginning = swiper.isBeginning;
                var wasEnd = swiper.isEnd;

                if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
                if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

                swiper.setTransition(0);
                swiper.setTranslate(position);
                swiper.updateProgress();
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();

                if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
                    swiper.updateSlidesClasses();
                }

                if (swiper.params.freeModeSticky) {
                    clearTimeout(swiper.mousewheel.timeout);
                    swiper.mousewheel.timeout = Utils.nextTick(function () {
                        swiper.slideToClosest();
                    }, 300);
                }
                // Emit event
                swiper.emit('scroll', e);

                // Stop autoplay
                if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.autoplay.stop(); }
                // Return page scroll on edge positions
                if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
            }

            if (e.preventDefault) { e.preventDefault(); }
            else { e.returnValue = false; }
            return false;
        },
        enable: function enable() {
            var swiper = this;
            if (!Mousewheel.event) { return false; }
            if (swiper.mousewheel.enabled) { return false; }
            var target = swiper.$el;
            if (swiper.params.mousewheel.eventsTarged !== 'container') {
                target = $(swiper.params.mousewheel.eventsTarged);
            }
            target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
            target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
            target.on(Mousewheel.event, swiper.mousewheel.handle);
            swiper.mousewheel.enabled = true;
            return true;
        },
        disable: function disable() {
            var swiper = this;
            if (!Mousewheel.event) { return false; }
            if (!swiper.mousewheel.enabled) { return false; }
            var target = swiper.$el;
            if (swiper.params.mousewheel.eventsTarged !== 'container') {
                target = $(swiper.params.mousewheel.eventsTarged);
            }
            target.off(Mousewheel.event, swiper.mousewheel.handle);
            swiper.mousewheel.enabled = false;
            return true;
        },
    };

    var Mousewheel$1 = {
        name: 'mousewheel',
        params: {
            mousewheel: {
                enabled: false,
                releaseOnEdges: false,
                invert: false,
                forceToAxis: false,
                sensitivity: 1,
                eventsTarged: 'container',
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                mousewheel: {
                    enabled: false,
                    enable: Mousewheel.enable.bind(swiper),
                    disable: Mousewheel.disable.bind(swiper),
                    handle: Mousewheel.handle.bind(swiper),
                    handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
                    handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
                    lastScrollTime: Utils.now(),
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
            },
            destroy: function destroy() {
                var swiper = this;
                if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
            },
        },
    };

    var Navigation = {
        update: function update() {
            // Update Navigation Buttons
            var swiper = this;
            var params = swiper.params.navigation;

            if (swiper.params.loop) { return; }
            var ref = swiper.navigation;
            var $nextEl = ref.$nextEl;
            var $prevEl = ref.$prevEl;

            if ($prevEl && $prevEl.length > 0) {
                if (swiper.isBeginning) {
                    $prevEl.addClass(params.disabledClass);
                } else {
                    $prevEl.removeClass(params.disabledClass);
                }
                $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
            }
            if ($nextEl && $nextEl.length > 0) {
                if (swiper.isEnd) {
                    $nextEl.addClass(params.disabledClass);
                } else {
                    $nextEl.removeClass(params.disabledClass);
                }
                $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
            }
        },
        init: function init() {
            var swiper = this;
            var params = swiper.params.navigation;
            if (!(params.nextEl || params.prevEl)) { return; }

            var $nextEl;
            var $prevEl;
            if (params.nextEl) {
                $nextEl = $(params.nextEl);
                if (
                    swiper.params.uniqueNavElements &&
                    typeof params.nextEl === 'string' &&
                    $nextEl.length > 1 &&
                    swiper.$el.find(params.nextEl).length === 1
                ) {
                    $nextEl = swiper.$el.find(params.nextEl);
                }
            }
            if (params.prevEl) {
                $prevEl = $(params.prevEl);
                if (
                    swiper.params.uniqueNavElements &&
                    typeof params.prevEl === 'string' &&
                    $prevEl.length > 1 &&
                    swiper.$el.find(params.prevEl).length === 1
                ) {
                    $prevEl = swiper.$el.find(params.prevEl);
                }
            }

            if ($nextEl && $nextEl.length > 0) {
                $nextEl.on('click', function (e) {
                    e.preventDefault();
                    if (swiper.isEnd && !swiper.params.loop) { return; }
                    swiper.slideNext();
                });
            }
            if ($prevEl && $prevEl.length > 0) {
                $prevEl.on('click', function (e) {
                    e.preventDefault();
                    if (swiper.isBeginning && !swiper.params.loop) { return; }
                    swiper.slidePrev();
                });
            }

            Utils.extend(swiper.navigation, {
                $nextEl: $nextEl,
                nextEl: $nextEl && $nextEl[0],
                $prevEl: $prevEl,
                prevEl: $prevEl && $prevEl[0],
            });
        },
        destroy: function destroy() {
            var swiper = this;
            var ref = swiper.navigation;
            var $nextEl = ref.$nextEl;
            var $prevEl = ref.$prevEl;
            if ($nextEl && $nextEl.length) {
                $nextEl.off('click');
                $nextEl.removeClass(swiper.params.navigation.disabledClass);
            }
            if ($prevEl && $prevEl.length) {
                $prevEl.off('click');
                $prevEl.removeClass(swiper.params.navigation.disabledClass);
            }
        },
    };

    var Navigation$1 = {
        name: 'navigation',
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,

                hideOnClick: false,
                disabledClass: 'swiper-button-disabled',
                hiddenClass: 'swiper-button-hidden',
                lockClass: 'swiper-button-lock',
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                navigation: {
                    init: Navigation.init.bind(swiper),
                    update: Navigation.update.bind(swiper),
                    destroy: Navigation.destroy.bind(swiper),
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                swiper.navigation.init();
                swiper.navigation.update();
            },
            toEdge: function toEdge() {
                var swiper = this;
                swiper.navigation.update();
            },
            fromEdge: function fromEdge() {
                var swiper = this;
                swiper.navigation.update();
            },
            destroy: function destroy() {
                var swiper = this;
                swiper.navigation.destroy();
            },
            click: function click(e) {
                var swiper = this;
                var ref = swiper.navigation;
                var $nextEl = ref.$nextEl;
                var $prevEl = ref.$prevEl;
                if (
                    swiper.params.navigation.hideOnClick &&
                    !$(e.target).is($prevEl) &&
                    !$(e.target).is($nextEl)
                ) {
                    if ($nextEl) { $nextEl.toggleClass(swiper.params.navigation.hiddenClass); }
                    if ($prevEl) { $prevEl.toggleClass(swiper.params.navigation.hiddenClass); }
                }
            },
        },
    };

    var Pagination = {
        update: function update() {
            // Render || Update Pagination bullets/items
            var swiper = this;
            var rtl = swiper.rtl;
            var params = swiper.params.pagination;
            if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
            var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            var $el = swiper.pagination.$el;
            // Current/Total
            var current;
            var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) {
                current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
                    current -= (slidesLength - (swiper.loopedSlides * 2));
                }
                if (current > total - 1) { current -= total; }
                if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
            } else if (typeof swiper.snapIndex !== 'undefined') {
                current = swiper.snapIndex;
            } else {
                current = swiper.activeIndex || 0;
            }
            // Types
            if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                var bullets = swiper.pagination.bullets;
                var firstIndex;
                var lastIndex;
                var midIndex;
                if (params.dynamicBullets) {
                    swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
                    $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
                    if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
                        swiper.pagination.dynamicBulletIndex += (current - swiper.previousIndex);
                        if (swiper.pagination.dynamicBulletIndex > (params.dynamicMainBullets - 1)) {
                            swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
                        } else if (swiper.pagination.dynamicBulletIndex < 0) {
                            swiper.pagination.dynamicBulletIndex = 0;
                        }
                    }
                    firstIndex = current - swiper.pagination.dynamicBulletIndex;
                    lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                    midIndex = (lastIndex + firstIndex) / 2;
                }
                bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
                if ($el.length > 1) {
                    bullets.each(function (index, bullet) {
                        var $bullet = $(bullet);
                        var bulletIndex = $bullet.index();
                        if (bulletIndex === current) {
                            $bullet.addClass(params.bulletActiveClass);
                        }
                        if (params.dynamicBullets) {
                            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                                $bullet.addClass(((params.bulletActiveClass) + "-main"));
                            }
                            if (bulletIndex === firstIndex) {
                                $bullet
                                    .prev()
                                    .addClass(((params.bulletActiveClass) + "-prev"))
                                    .prev()
                                    .addClass(((params.bulletActiveClass) + "-prev-prev"));
                            }
                            if (bulletIndex === lastIndex) {
                                $bullet
                                    .next()
                                    .addClass(((params.bulletActiveClass) + "-next"))
                                    .next()
                                    .addClass(((params.bulletActiveClass) + "-next-next"));
                            }
                        }
                    });
                } else {
                    var $bullet = bullets.eq(current);
                    $bullet.addClass(params.bulletActiveClass);
                    if (params.dynamicBullets) {
                        var $firstDisplayedBullet = bullets.eq(firstIndex);
                        var $lastDisplayedBullet = bullets.eq(lastIndex);
                        for (var i = firstIndex; i <= lastIndex; i += 1) {
                            bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
                        }
                        $firstDisplayedBullet
                            .prev()
                            .addClass(((params.bulletActiveClass) + "-prev"))
                            .prev()
                            .addClass(((params.bulletActiveClass) + "-prev-prev"));
                        $lastDisplayedBullet
                            .next()
                            .addClass(((params.bulletActiveClass) + "-next"))
                            .next()
                            .addClass(((params.bulletActiveClass) + "-next-next"));
                    }
                }
                if (params.dynamicBullets) {
                    var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                    var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
                    var offsetProp = rtl ? 'right' : 'left';
                    bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
                }
            }
            if (params.type === 'fraction') {
                $el.find(("." + (params.currentClass))).text(params.formatFractionCurrent(current + 1));
                $el.find(("." + (params.totalClass))).text(params.formatFractionTotal(total));
            }
            if (params.type === 'progressbar') {
                var progressbarDirection;
                if (params.progressbarOpposite) {
                    progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
                } else {
                    progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
                }
                var scale = (current + 1) / total;
                var scaleX = 1;
                var scaleY = 1;
                if (progressbarDirection === 'horizontal') {
                    scaleX = scale;
                } else {
                    scaleY = scale;
                }
                $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
            }
            if (params.type === 'custom' && params.renderCustom) {
                $el.html(params.renderCustom(swiper, current + 1, total));
                swiper.emit('paginationRender', swiper, $el[0]);
            } else {
                swiper.emit('paginationUpdate', swiper, $el[0]);
            }
            $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
        },
        render: function render() {
            // Render Container
            var swiper = this;
            var params = swiper.params.pagination;
            if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
            var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

            var $el = swiper.pagination.$el;
            var paginationHTML = '';
            if (params.type === 'bullets') {
                var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                for (var i = 0; i < numberOfBullets; i += 1) {
                    if (params.renderBullet) {
                        paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
                    } else {
                        paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
                    }
                }
                $el.html(paginationHTML);
                swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
            }
            if (params.type === 'fraction') {
                if (params.renderFraction) {
                    paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
                } else {
                    paginationHTML =
                        "<span class=\"" + (params.currentClass) + "\"></span>" +
                        ' / ' +
                        "<span class=\"" + (params.totalClass) + "\"></span>";
                }
                $el.html(paginationHTML);
            }
            if (params.type === 'progressbar') {
                if (params.renderProgressbar) {
                    paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
                } else {
                    paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
                }
                $el.html(paginationHTML);
            }
            if (params.type !== 'custom') {
                swiper.emit('paginationRender', swiper.pagination.$el[0]);
            }
        },
        init: function init() {
            var swiper = this;
            var params = swiper.params.pagination;
            if (!params.el) { return; }

            var $el = $(params.el);
            if ($el.length === 0) { return; }

            if (
                swiper.params.uniqueNavElements &&
                typeof params.el === 'string' &&
                $el.length > 1 &&
                swiper.$el.find(params.el).length === 1
            ) {
                $el = swiper.$el.find(params.el);
            }

            if (params.type === 'bullets' && params.clickable) {
                $el.addClass(params.clickableClass);
            }

            $el.addClass(params.modifierClass + params.type);

            if (params.type === 'bullets' && params.dynamicBullets) {
                $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
                swiper.pagination.dynamicBulletIndex = 0;
                if (params.dynamicMainBullets < 1) {
                    params.dynamicMainBullets = 1;
                }
            }
            if (params.type === 'progressbar' && params.progressbarOpposite) {
                $el.addClass(params.progressbarOppositeClass);
            }

            if (params.clickable) {
                $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
                    e.preventDefault();
                    var index = $(this).index() * swiper.params.slidesPerGroup;
                    if (swiper.params.loop) { index += swiper.loopedSlides; }
                    swiper.slideTo(index);
                });
            }

            Utils.extend(swiper.pagination, {
                $el: $el,
                el: $el[0],
            });
        },
        destroy: function destroy() {
            var swiper = this;
            var params = swiper.params.pagination;
            if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
            var $el = swiper.pagination.$el;

            $el.removeClass(params.hiddenClass);
            $el.removeClass(params.modifierClass + params.type);
            if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
            if (params.clickable) {
                $el.off('click', ("." + (params.bulletClass)));
            }
        },
    };

    var Pagination$1 = {
        name: 'pagination',
        params: {
            pagination: {
                el: null,
                bulletElement: 'span',
                clickable: false,
                hideOnClick: false,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: false,
                type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
                dynamicBullets: false,
                dynamicMainBullets: 1,
                formatFractionCurrent: function (number) { return number; },
                formatFractionTotal: function (number) { return number; },
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active',
                modifierClass: 'swiper-pagination-', // NEW
                currentClass: 'swiper-pagination-current',
                totalClass: 'swiper-pagination-total',
                hiddenClass: 'swiper-pagination-hidden',
                progressbarFillClass: 'swiper-pagination-progressbar-fill',
                progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
                clickableClass: 'swiper-pagination-clickable', // NEW
                lockClass: 'swiper-pagination-lock',
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                pagination: {
                    init: Pagination.init.bind(swiper),
                    render: Pagination.render.bind(swiper),
                    update: Pagination.update.bind(swiper),
                    destroy: Pagination.destroy.bind(swiper),
                    dynamicBulletIndex: 0,
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                swiper.pagination.init();
                swiper.pagination.render();
                swiper.pagination.update();
            },
            activeIndexChange: function activeIndexChange() {
                var swiper = this;
                if (swiper.params.loop) {
                    swiper.pagination.update();
                } else if (typeof swiper.snapIndex === 'undefined') {
                    swiper.pagination.update();
                }
            },
            snapIndexChange: function snapIndexChange() {
                var swiper = this;
                if (!swiper.params.loop) {
                    swiper.pagination.update();
                }
            },
            slidesLengthChange: function slidesLengthChange() {
                var swiper = this;
                if (swiper.params.loop) {
                    swiper.pagination.render();
                    swiper.pagination.update();
                }
            },
            snapGridLengthChange: function snapGridLengthChange() {
                var swiper = this;
                if (!swiper.params.loop) {
                    swiper.pagination.render();
                    swiper.pagination.update();
                }
            },
            destroy: function destroy() {
                var swiper = this;
                swiper.pagination.destroy();
            },
            click: function click(e) {
                var swiper = this;
                if (
                    swiper.params.pagination.el &&
                    swiper.params.pagination.hideOnClick &&
                    swiper.pagination.$el.length > 0 &&
                    !$(e.target).hasClass(swiper.params.pagination.bulletClass)
                ) {
                    swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
                }
            },
        },
    };

    var Scrollbar = {
        setTranslate: function setTranslate() {
            var swiper = this;
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
            var scrollbar = swiper.scrollbar;
            var rtl = swiper.rtlTranslate;
            var progress = swiper.progress;
            var dragSize = scrollbar.dragSize;
            var trackSize = scrollbar.trackSize;
            var $dragEl = scrollbar.$dragEl;
            var $el = scrollbar.$el;
            var params = swiper.params.scrollbar;

            var newSize = dragSize;
            var newPos = (trackSize - dragSize) * progress;
            if (rtl) {
                newPos = -newPos;
                if (newPos > 0) {
                    newSize = dragSize - newPos;
                    newPos = 0;
                } else if (-newPos + dragSize > trackSize) {
                    newSize = trackSize + newPos;
                }
            } else if (newPos < 0) {
                newSize = dragSize + newPos;
                newPos = 0;
            } else if (newPos + dragSize > trackSize) {
                newSize = trackSize - newPos;
            }
            if (swiper.isHorizontal()) {
                if (Support.transforms3d) {
                    $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
                } else {
                    $dragEl.transform(("translateX(" + newPos + "px)"));
                }
                $dragEl[0].style.width = newSize + "px";
            } else {
                if (Support.transforms3d) {
                    $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
                } else {
                    $dragEl.transform(("translateY(" + newPos + "px)"));
                }
                $dragEl[0].style.height = newSize + "px";
            }
            if (params.hide) {
                clearTimeout(swiper.scrollbar.timeout);
                $el[0].style.opacity = 1;
                swiper.scrollbar.timeout = setTimeout(function () {
                    $el[0].style.opacity = 0;
                    $el.transition(400);
                }, 1000);
            }
        },
        setTransition: function setTransition(duration) {
            var swiper = this;
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
            swiper.scrollbar.$dragEl.transition(duration);
        },
        updateSize: function updateSize() {
            var swiper = this;
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

            var scrollbar = swiper.scrollbar;
            var $dragEl = scrollbar.$dragEl;
            var $el = scrollbar.$el;

            $dragEl[0].style.width = '';
            $dragEl[0].style.height = '';
            var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

            var divider = swiper.size / swiper.virtualSize;
            var moveDivider = divider * (trackSize / swiper.size);
            var dragSize;
            if (swiper.params.scrollbar.dragSize === 'auto') {
                dragSize = trackSize * divider;
            } else {
                dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
            }

            if (swiper.isHorizontal()) {
                $dragEl[0].style.width = dragSize + "px";
            } else {
                $dragEl[0].style.height = dragSize + "px";
            }

            if (divider >= 1) {
                $el[0].style.display = 'none';
            } else {
                $el[0].style.display = '';
            }
            if (swiper.params.scrollbarHide) {
                $el[0].style.opacity = 0;
            }
            Utils.extend(scrollbar, {
                trackSize: trackSize,
                divider: divider,
                moveDivider: moveDivider,
                dragSize: dragSize,
            });
            scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
        },
        setDragPosition: function setDragPosition(e) {
            var swiper = this;
            var scrollbar = swiper.scrollbar;
            var rtl = swiper.rtlTranslate;
            var $el = scrollbar.$el;
            var dragSize = scrollbar.dragSize;
            var trackSize = scrollbar.trackSize;

            var pointerPosition;
            if (swiper.isHorizontal()) {
                pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
            } else {
                pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
            }
            var positionRatio;
            positionRatio = ((pointerPosition) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragSize / 2)) / (trackSize - dragSize);
            positionRatio = Math.max(Math.min(positionRatio, 1), 0);
            if (rtl) {
                positionRatio = 1 - positionRatio;
            }

            var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

            swiper.updateProgress(position);
            swiper.setTranslate(position);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        },
        onDragStart: function onDragStart(e) {
            var swiper = this;
            var params = swiper.params.scrollbar;
            var scrollbar = swiper.scrollbar;
            var $wrapperEl = swiper.$wrapperEl;
            var $el = scrollbar.$el;
            var $dragEl = scrollbar.$dragEl;
            swiper.scrollbar.isTouched = true;
            e.preventDefault();
            e.stopPropagation();

            $wrapperEl.transition(100);
            $dragEl.transition(100);
            scrollbar.setDragPosition(e);

            clearTimeout(swiper.scrollbar.dragTimeout);

            $el.transition(0);
            if (params.hide) {
                $el.css('opacity', 1);
            }
            swiper.emit('scrollbarDragStart', e);
        },
        onDragMove: function onDragMove(e) {
            var swiper = this;
            var scrollbar = swiper.scrollbar;
            var $wrapperEl = swiper.$wrapperEl;
            var $el = scrollbar.$el;
            var $dragEl = scrollbar.$dragEl;

            if (!swiper.scrollbar.isTouched) { return; }
            if (e.preventDefault) { e.preventDefault(); }
            else { e.returnValue = false; }
            scrollbar.setDragPosition(e);
            $wrapperEl.transition(0);
            $el.transition(0);
            $dragEl.transition(0);
            swiper.emit('scrollbarDragMove', e);
        },
        onDragEnd: function onDragEnd(e) {
            var swiper = this;

            var params = swiper.params.scrollbar;
            var scrollbar = swiper.scrollbar;
            var $el = scrollbar.$el;

            if (!swiper.scrollbar.isTouched) { return; }
            swiper.scrollbar.isTouched = false;
            if (params.hide) {
                clearTimeout(swiper.scrollbar.dragTimeout);
                swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
                    $el.css('opacity', 0);
                    $el.transition(400);
                }, 1000);
            }
            swiper.emit('scrollbarDragEnd', e);
            if (params.snapOnRelease) {
                swiper.slideToClosest();
            }
        },
        enableDraggable: function enableDraggable() {
            var swiper = this;
            if (!swiper.params.scrollbar.el) { return; }
            var scrollbar = swiper.scrollbar;
            var touchEvents = swiper.touchEvents;
            var touchEventsDesktop = swiper.touchEventsDesktop;
            var params = swiper.params;
            var $el = scrollbar.$el;
            var target = $el[0];
            var activeListener = Support.passiveListener && params.passiveListener ? { passive: false, capture: false } : false;
            var passiveListener = Support.passiveListener && params.passiveListener ? { passive: true, capture: false } : false;
            if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
                target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
                doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
                doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
            } else {
                if (Support.touch) {
                    target.addEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
                    target.addEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
                    target.addEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
                }
                if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
                    target.addEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
                    doc.addEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
                    doc.addEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
                }
            }
        },
        disableDraggable: function disableDraggable() {
            var swiper = this;
            if (!swiper.params.scrollbar.el) { return; }
            var scrollbar = swiper.scrollbar;
            var touchEvents = swiper.touchEvents;
            var touchEventsDesktop = swiper.touchEventsDesktop;
            var params = swiper.params;
            var $el = scrollbar.$el;
            var target = $el[0];
            var activeListener = Support.passiveListener && params.passiveListener ? { passive: false, capture: false } : false;
            var passiveListener = Support.passiveListener && params.passiveListener ? { passive: true, capture: false } : false;
            if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
                target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
                doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
                doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
            } else {
                if (Support.touch) {
                    target.removeEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
                    target.removeEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
                    target.removeEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
                }
                if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
                    target.removeEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
                    doc.removeEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
                    doc.removeEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
                }
            }
        },
        init: function init() {
            var swiper = this;
            if (!swiper.params.scrollbar.el) { return; }
            var scrollbar = swiper.scrollbar;
            var $swiperEl = swiper.$el;
            var params = swiper.params.scrollbar;

            var $el = $(params.el);
            if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
                $el = $swiperEl.find(params.el);
            }

            var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
            if ($dragEl.length === 0) {
                $dragEl = $(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
                $el.append($dragEl);
            }

            Utils.extend(scrollbar, {
                $el: $el,
                el: $el[0],
                $dragEl: $dragEl,
                dragEl: $dragEl[0],
            });

            if (params.draggable) {
                scrollbar.enableDraggable();
            }
        },
        destroy: function destroy() {
            var swiper = this;
            swiper.scrollbar.disableDraggable();
        },
    };

    var Scrollbar$1 = {
        name: 'scrollbar',
        params: {
            scrollbar: {
                el: null,
                dragSize: 'auto',
                hide: false,
                draggable: false,
                snapOnRelease: true,
                lockClass: 'swiper-scrollbar-lock',
                dragClass: 'swiper-scrollbar-drag',
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                scrollbar: {
                    init: Scrollbar.init.bind(swiper),
                    destroy: Scrollbar.destroy.bind(swiper),
                    updateSize: Scrollbar.updateSize.bind(swiper),
                    setTranslate: Scrollbar.setTranslate.bind(swiper),
                    setTransition: Scrollbar.setTransition.bind(swiper),
                    enableDraggable: Scrollbar.enableDraggable.bind(swiper),
                    disableDraggable: Scrollbar.disableDraggable.bind(swiper),
                    setDragPosition: Scrollbar.setDragPosition.bind(swiper),
                    onDragStart: Scrollbar.onDragStart.bind(swiper),
                    onDragMove: Scrollbar.onDragMove.bind(swiper),
                    onDragEnd: Scrollbar.onDragEnd.bind(swiper),
                    isTouched: false,
                    timeout: null,
                    dragTimeout: null,
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                swiper.scrollbar.init();
                swiper.scrollbar.updateSize();
                swiper.scrollbar.setTranslate();
            },
            update: function update() {
                var swiper = this;
                swiper.scrollbar.updateSize();
            },
            resize: function resize() {
                var swiper = this;
                swiper.scrollbar.updateSize();
            },
            observerUpdate: function observerUpdate() {
                var swiper = this;
                swiper.scrollbar.updateSize();
            },
            setTranslate: function setTranslate() {
                var swiper = this;
                swiper.scrollbar.setTranslate();
            },
            setTransition: function setTransition(duration) {
                var swiper = this;
                swiper.scrollbar.setTransition(duration);
            },
            destroy: function destroy() {
                var swiper = this;
                swiper.scrollbar.destroy();
            },
        },
    };

    var Parallax = {
        setTransform: function setTransform(el, progress) {
            var swiper = this;
            var rtl = swiper.rtl;

            var $el = $(el);
            var rtlFactor = rtl ? -1 : 1;

            var p = $el.attr('data-swiper-parallax') || '0';
            var x = $el.attr('data-swiper-parallax-x');
            var y = $el.attr('data-swiper-parallax-y');
            var scale = $el.attr('data-swiper-parallax-scale');
            var opacity = $el.attr('data-swiper-parallax-opacity');

            if (x || y) {
                x = x || '0';
                y = y || '0';
            } else if (swiper.isHorizontal()) {
                x = p;
                y = '0';
            } else {
                y = p;
                x = '0';
            }

            if ((x).indexOf('%') >= 0) {
                x = (parseInt(x, 10) * progress * rtlFactor) + "%";
            } else {
                x = (x * progress * rtlFactor) + "px";
            }
            if ((y).indexOf('%') >= 0) {
                y = (parseInt(y, 10) * progress) + "%";
            } else {
                y = (y * progress) + "px";
            }

            if (typeof opacity !== 'undefined' && opacity !== null) {
                var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
                $el[0].style.opacity = currentOpacity;
            }
            if (typeof scale === 'undefined' || scale === null) {
                $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
            } else {
                var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
                $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
            }
        },
        setTranslate: function setTranslate() {
            var swiper = this;
            var $el = swiper.$el;
            var slides = swiper.slides;
            var progress = swiper.progress;
            var snapGrid = swiper.snapGrid;
            $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
                .each(function (index, el) {
                    swiper.parallax.setTransform(el, progress);
                });
            slides.each(function (slideIndex, slideEl) {
                var slideProgress = slideEl.progress;
                if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
                    slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
                }
                slideProgress = Math.min(Math.max(slideProgress, -1), 1);
                $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
                    .each(function (index, el) {
                        swiper.parallax.setTransform(el, slideProgress);
                    });
            });
        },
        setTransition: function setTransition(duration) {
            if (duration === void 0) duration = this.params.speed;

            var swiper = this;
            var $el = swiper.$el;
            $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
                .each(function (index, parallaxEl) {
                    var $parallaxEl = $(parallaxEl);
                    var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) { parallaxDuration = 0; }
                    $parallaxEl.transition(parallaxDuration);
                });
        },
    };

    var Parallax$1 = {
        name: 'parallax',
        params: {
            parallax: {
                enabled: false,
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                parallax: {
                    setTransform: Parallax.setTransform.bind(swiper),
                    setTranslate: Parallax.setTranslate.bind(swiper),
                    setTransition: Parallax.setTransition.bind(swiper),
                },
            });
        },
        on: {
            beforeInit: function beforeInit() {
                var swiper = this;
                if (!swiper.params.parallax.enabled) { return; }
                swiper.params.watchSlidesProgress = true;
            },
            init: function init() {
                var swiper = this;
                if (!swiper.params.parallax) { return; }
                swiper.parallax.setTranslate();
            },
            setTranslate: function setTranslate() {
                var swiper = this;
                if (!swiper.params.parallax) { return; }
                swiper.parallax.setTranslate();
            },
            setTransition: function setTransition(duration) {
                var swiper = this;
                if (!swiper.params.parallax) { return; }
                swiper.parallax.setTransition(duration);
            },
        },
    };

    var Zoom = {
        // Calc Scale From Multi-touches
        getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
            if (e.targetTouches.length < 2) { return 1; }
            var x1 = e.targetTouches[0].pageX;
            var y1 = e.targetTouches[0].pageY;
            var x2 = e.targetTouches[1].pageX;
            var y2 = e.targetTouches[1].pageY;
            var distance = Math.sqrt((Math.pow((x2 - x1), 2)) + (Math.pow((y2 - y1), 2)));
            return distance;
        },
        // Events
        onGestureStart: function onGestureStart(e) {
            var swiper = this;
            var params = swiper.params.zoom;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            zoom.fakeGestureTouched = false;
            zoom.fakeGestureMoved = false;
            if (!Support.gestures) {
                if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
                    return;
                }
                zoom.fakeGestureTouched = true;
                gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
            }
            if (!gesture.$slideEl || !gesture.$slideEl.length) {
                gesture.$slideEl = $(e.target).closest('.swiper-slide');
                if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
                gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
                gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
                gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
                if (gesture.$imageWrapEl.length === 0) {
                    gesture.$imageEl = undefined;
                    return;
                }
            }
            gesture.$imageEl.transition(0);
            swiper.zoom.isScaling = true;
        },
        onGestureChange: function onGestureChange(e) {
            var swiper = this;
            var params = swiper.params.zoom;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            if (!Support.gestures) {
                if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
                    return;
                }
                zoom.fakeGestureMoved = true;
                gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
            }
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
            if (Support.gestures) {
                swiper.zoom.scale = e.scale * zoom.currentScale;
            } else {
                zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
            }
            if (zoom.scale > gesture.maxRatio) {
                zoom.scale = (gesture.maxRatio - 1) + (Math.pow(((zoom.scale - gesture.maxRatio) + 1), 0.5));
            }
            if (zoom.scale < params.minRatio) {
                zoom.scale = (params.minRatio + 1) - (Math.pow(((params.minRatio - zoom.scale) + 1), 0.5));
            }
            gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
        },
        onGestureEnd: function onGestureEnd(e) {
            var swiper = this;
            var params = swiper.params.zoom;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            if (!Support.gestures) {
                if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
                    return;
                }
                if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
                    return;
                }
                zoom.fakeGestureTouched = false;
                zoom.fakeGestureMoved = false;
            }
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
            zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
            gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
            zoom.currentScale = zoom.scale;
            zoom.isScaling = false;
            if (zoom.scale === 1) { gesture.$slideEl = undefined; }
        },
        onTouchStart: function onTouchStart(e) {
            var swiper = this;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            var image = zoom.image;
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
            if (image.isTouched) { return; }
            if (Device.android) { e.preventDefault(); }
            image.isTouched = true;
            image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        },
        onTouchMove: function onTouchMove(e) {
            var swiper = this;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            var image = zoom.image;
            var velocity = zoom.velocity;
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
            swiper.allowClick = false;
            if (!image.isTouched || !gesture.$slideEl) { return; }

            if (!image.isMoved) {
                image.width = gesture.$imageEl[0].offsetWidth;
                image.height = gesture.$imageEl[0].offsetHeight;
                image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
                image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
                gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
                gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
                gesture.$imageWrapEl.transition(0);
                if (swiper.rtl) {
                    image.startX = -image.startX;
                    image.startY = -image.startY;
                }
            }
            // Define if we need image drag
            var scaledWidth = image.width * zoom.scale;
            var scaledHeight = image.height * zoom.scale;

            if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

            image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
            image.maxX = -image.minX;
            image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
            image.maxY = -image.minY;

            image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

            if (!image.isMoved && !zoom.isScaling) {
                if (
                    swiper.isHorizontal() &&
                    (
                        (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x) ||
                        (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
                    )
                ) {
                    image.isTouched = false;
                    return;
                } else if (
                    !swiper.isHorizontal() &&
                    (
                        (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y) ||
                        (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
                    )
                ) {
                    image.isTouched = false;
                    return;
                }
            }
            e.preventDefault();
            e.stopPropagation();

            image.isMoved = true;
            image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
            image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

            if (image.currentX < image.minX) {
                image.currentX = (image.minX + 1) - (Math.pow(((image.minX - image.currentX) + 1), 0.8));
            }
            if (image.currentX > image.maxX) {
                image.currentX = (image.maxX - 1) + (Math.pow(((image.currentX - image.maxX) + 1), 0.8));
            }

            if (image.currentY < image.minY) {
                image.currentY = (image.minY + 1) - (Math.pow(((image.minY - image.currentY) + 1), 0.8));
            }
            if (image.currentY > image.maxY) {
                image.currentY = (image.maxY - 1) + (Math.pow(((image.currentY - image.maxY) + 1), 0.8));
            }

            // Velocity
            if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
            if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
            if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
            velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
            velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
            if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
            if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
            velocity.prevPositionX = image.touchesCurrent.x;
            velocity.prevPositionY = image.touchesCurrent.y;
            velocity.prevTime = Date.now();

            gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
        },
        onTouchEnd: function onTouchEnd() {
            var swiper = this;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            var image = zoom.image;
            var velocity = zoom.velocity;
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
            if (!image.isTouched || !image.isMoved) {
                image.isTouched = false;
                image.isMoved = false;
                return;
            }
            image.isTouched = false;
            image.isMoved = false;
            var momentumDurationX = 300;
            var momentumDurationY = 300;
            var momentumDistanceX = velocity.x * momentumDurationX;
            var newPositionX = image.currentX + momentumDistanceX;
            var momentumDistanceY = velocity.y * momentumDurationY;
            var newPositionY = image.currentY + momentumDistanceY;

            // Fix duration
            if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
            if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
            var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

            image.currentX = newPositionX;
            image.currentY = newPositionY;

            // Define if we need image drag
            var scaledWidth = image.width * zoom.scale;
            var scaledHeight = image.height * zoom.scale;
            image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
            image.maxX = -image.minX;
            image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
            image.maxY = -image.minY;
            image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
            image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

            gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
        },
        onTransitionEnd: function onTransitionEnd() {
            var swiper = this;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
                gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
                gesture.$imageWrapEl.transform('translate3d(0,0,0)');
                gesture.$slideEl = undefined;
                gesture.$imageEl = undefined;
                gesture.$imageWrapEl = undefined;

                zoom.scale = 1;
                zoom.currentScale = 1;
            }
        },
        // Toggle Zoom
        toggle: function toggle(e) {
            var swiper = this;
            var zoom = swiper.zoom;

            if (zoom.scale && zoom.scale !== 1) {
                // Zoom Out
                zoom.out();
            } else {
                // Zoom In
                zoom.in(e);
            }
        },
        in: function in$1(e) {
            var swiper = this;

            var zoom = swiper.zoom;
            var params = swiper.params.zoom;
            var gesture = zoom.gesture;
            var image = zoom.image;

            if (!gesture.$slideEl) {
                gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
                gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
                gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
            }
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

            gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

            var touchX;
            var touchY;
            var offsetX;
            var offsetY;
            var diffX;
            var diffY;
            var translateX;
            var translateY;
            var imageWidth;
            var imageHeight;
            var scaledWidth;
            var scaledHeight;
            var translateMinX;
            var translateMinY;
            var translateMaxX;
            var translateMaxY;
            var slideWidth;
            var slideHeight;

            if (typeof image.touchesStart.x === 'undefined' && e) {
                touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
            } else {
                touchX = image.touchesStart.x;
                touchY = image.touchesStart.y;
            }

            zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
            zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
            if (e) {
                slideWidth = gesture.$slideEl[0].offsetWidth;
                slideHeight = gesture.$slideEl[0].offsetHeight;
                offsetX = gesture.$slideEl.offset().left;
                offsetY = gesture.$slideEl.offset().top;
                diffX = (offsetX + (slideWidth / 2)) - touchX;
                diffY = (offsetY + (slideHeight / 2)) - touchY;

                imageWidth = gesture.$imageEl[0].offsetWidth;
                imageHeight = gesture.$imageEl[0].offsetHeight;
                scaledWidth = imageWidth * zoom.scale;
                scaledHeight = imageHeight * zoom.scale;

                translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
                translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
                translateMaxX = -translateMinX;
                translateMaxY = -translateMinY;

                translateX = diffX * zoom.scale;
                translateY = diffY * zoom.scale;

                if (translateX < translateMinX) {
                    translateX = translateMinX;
                }
                if (translateX > translateMaxX) {
                    translateX = translateMaxX;
                }

                if (translateY < translateMinY) {
                    translateY = translateMinY;
                }
                if (translateY > translateMaxY) {
                    translateY = translateMaxY;
                }
            } else {
                translateX = 0;
                translateY = 0;
            }
            gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
            gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
        },
        out: function out() {
            var swiper = this;

            var zoom = swiper.zoom;
            var params = swiper.params.zoom;
            var gesture = zoom.gesture;

            if (!gesture.$slideEl) {
                gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
                gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
                gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
            }
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

            zoom.scale = 1;
            zoom.currentScale = 1;
            gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
            gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
            gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
            gesture.$slideEl = undefined;
        },
        // Attach/Detach Events
        enable: function enable() {
            var swiper = this;
            var zoom = swiper.zoom;
            if (zoom.enabled) { return; }
            zoom.enabled = true;

            var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

            // Scale image
            if (Support.gestures) {
                swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
                swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
                swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
            } else if (swiper.touchEvents.start === 'touchstart') {
                swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
                swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
                swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
            }

            // Move image
            swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
        },
        disable: function disable() {
            var swiper = this;
            var zoom = swiper.zoom;
            if (!zoom.enabled) { return; }

            swiper.zoom.enabled = false;

            var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

            // Scale image
            if (Support.gestures) {
                swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
                swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
                swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
            } else if (swiper.touchEvents.start === 'touchstart') {
                swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
                swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
                swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
            }

            // Move image
            swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
        },
    };

    var Zoom$1 = {
        name: 'zoom',
        params: {
            zoom: {
                enabled: false,
                maxRatio: 3,
                minRatio: 1,
                toggle: true,
                containerClass: 'swiper-zoom-container',
                zoomedSlideClass: 'swiper-slide-zoomed',
            },
        },
        create: function create() {
            var swiper = this;
            var zoom = {
                enabled: false,
                scale: 1,
                currentScale: 1,
                isScaling: false,
                gesture: {
                    $slideEl: undefined,
                    slideWidth: undefined,
                    slideHeight: undefined,
                    $imageEl: undefined,
                    $imageWrapEl: undefined,
                    maxRatio: 3,
                },
                image: {
                    isTouched: undefined,
                    isMoved: undefined,
                    currentX: undefined,
                    currentY: undefined,
                    minX: undefined,
                    minY: undefined,
                    maxX: undefined,
                    maxY: undefined,
                    width: undefined,
                    height: undefined,
                    startX: undefined,
                    startY: undefined,
                    touchesStart: {},
                    touchesCurrent: {},
                },
                velocity: {
                    x: undefined,
                    y: undefined,
                    prevPositionX: undefined,
                    prevPositionY: undefined,
                    prevTime: undefined,
                },
            };
            ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
                zoom[methodName] = Zoom[methodName].bind(swiper);
            });
            Utils.extend(swiper, {
                zoom: zoom,
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                if (swiper.params.zoom.enabled) {
                    swiper.zoom.enable();
                }
            },
            destroy: function destroy() {
                var swiper = this;
                swiper.zoom.disable();
            },
            touchStart: function touchStart(e) {
                var swiper = this;
                if (!swiper.zoom.enabled) { return; }
                swiper.zoom.onTouchStart(e);
            },
            touchEnd: function touchEnd(e) {
                var swiper = this;
                if (!swiper.zoom.enabled) { return; }
                swiper.zoom.onTouchEnd(e);
            },
            doubleTap: function doubleTap(e) {
                var swiper = this;
                if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
                    swiper.zoom.toggle(e);
                }
            },
            transitionEnd: function transitionEnd() {
                var swiper = this;
                if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
                    swiper.zoom.onTransitionEnd();
                }
            },
        },
    };

    var Lazy = {
        loadInSlide: function loadInSlide(index, loadInDuplicate) {
            if (loadInDuplicate === void 0) loadInDuplicate = true;

            var swiper = this;
            var params = swiper.params.lazy;
            if (typeof index === 'undefined') { return; }
            if (swiper.slides.length === 0) { return; }
            var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

            var $slideEl = isVirtual
                ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
                : swiper.slides.eq(index);

            var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
            if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
                $images = $images.add($slideEl[0]);
            }
            if ($images.length === 0) { return; }

            $images.each(function (imageIndex, imageEl) {
                var $imageEl = $(imageEl);
                $imageEl.addClass(params.loadingClass);

                var background = $imageEl.attr('data-background');
                var src = $imageEl.attr('data-src');
                var srcset = $imageEl.attr('data-srcset');
                var sizes = $imageEl.attr('data-sizes');

                swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
                    if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
                    if (background) {
                        $imageEl.css('background-image', ("url(\"" + background + "\")"));
                        $imageEl.removeAttr('data-background');
                    } else {
                        if (srcset) {
                            $imageEl.attr('srcset', srcset);
                            $imageEl.removeAttr('data-srcset');
                        }
                        if (sizes) {
                            $imageEl.attr('sizes', sizes);
                            $imageEl.removeAttr('data-sizes');
                        }
                        if (src) {
                            $imageEl.attr('src', src);
                            $imageEl.removeAttr('data-src');
                        }
                    }

                    $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
                    $slideEl.find(("." + (params.preloaderClass))).remove();
                    if (swiper.params.loop && loadInDuplicate) {
                        var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
                        if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
                            var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
                            swiper.lazy.loadInSlide(originalSlide.index(), false);
                        } else {
                            var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
                            swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
                        }
                    }
                    swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
                });

                swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
            });
        },
        load: function load() {
            var swiper = this;
            var $wrapperEl = swiper.$wrapperEl;
            var swiperParams = swiper.params;
            var slides = swiper.slides;
            var activeIndex = swiper.activeIndex;
            var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
            var params = swiperParams.lazy;

            var slidesPerView = swiperParams.slidesPerView;
            if (slidesPerView === 'auto') {
                slidesPerView = 0;
            }

            function slideExist(index) {
                if (isVirtual) {
                    if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
                        return true;
                    }
                } else if (slides[index]) { return true; }
                return false;
            }
            function slideIndex(slideEl) {
                if (isVirtual) {
                    return $(slideEl).attr('data-swiper-slide-index');
                }
                return $(slideEl).index();
            }

            if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
            if (swiper.params.watchSlidesVisibility) {
                $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
                    var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
                    swiper.lazy.loadInSlide(index);
                });
            } else if (slidesPerView > 1) {
                for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
                    if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
                }
            } else {
                swiper.lazy.loadInSlide(activeIndex);
            }
            if (params.loadPrevNext) {
                if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
                    var amount = params.loadPrevNextAmount;
                    var spv = slidesPerView;
                    var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
                    var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
                    // Next Slides
                    for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
                        if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
                    }
                    // Prev Slides
                    for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
                        if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
                    }
                } else {
                    var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
                    if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

                    var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
                    if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
                }
            }
        },
    };

    var Lazy$1 = {
        name: 'lazy',
        params: {
            lazy: {
                enabled: false,
                loadPrevNext: false,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: false,

                elementClass: 'swiper-lazy',
                loadingClass: 'swiper-lazy-loading',
                loadedClass: 'swiper-lazy-loaded',
                preloaderClass: 'swiper-lazy-preloader',
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                lazy: {
                    initialImageLoaded: false,
                    load: Lazy.load.bind(swiper),
                    loadInSlide: Lazy.loadInSlide.bind(swiper),
                },
            });
        },
        on: {
            beforeInit: function beforeInit() {
                var swiper = this;
                if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
                    swiper.params.preloadImages = false;
                }
            },
            init: function init() {
                var swiper = this;
                if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
                    swiper.lazy.load();
                }
            },
            scroll: function scroll() {
                var swiper = this;
                if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
                    swiper.lazy.load();
                }
            },
            resize: function resize() {
                var swiper = this;
                if (swiper.params.lazy.enabled) {
                    swiper.lazy.load();
                }
            },
            scrollbarDragMove: function scrollbarDragMove() {
                var swiper = this;
                if (swiper.params.lazy.enabled) {
                    swiper.lazy.load();
                }
            },
            transitionStart: function transitionStart() {
                var swiper = this;
                if (swiper.params.lazy.enabled) {
                    if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
                        swiper.lazy.load();
                    }
                }
            },
            transitionEnd: function transitionEnd() {
                var swiper = this;
                if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
                    swiper.lazy.load();
                }
            },
        },
    };

    /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

    var Controller = {
        LinearSpline: function LinearSpline(x, y) {
            var binarySearch = (function search() {
                var maxIndex;
                var minIndex;
                var guess;
                return function (array, val) {
                    minIndex = -1;
                    maxIndex = array.length;
                    while (maxIndex - minIndex > 1) {
                        guess = maxIndex + minIndex >> 1;
                        if (array[guess] <= val) {
                            minIndex = guess;
                        } else {
                            maxIndex = guess;
                        }
                    }
                    return maxIndex;
                };
            }());
            this.x = x;
            this.y = y;
            this.lastIndex = x.length - 1;
            // Given an x value (x2), return the expected y2 value:
            // (x1,y1) is the known point before given value,
            // (x3,y3) is the known point after given value.
            var i1;
            var i3;

            this.interpolate = function interpolate(x2) {
                if (!x2) { return 0; }

                // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                i3 = binarySearch(this.x, x2);
                i1 = i3 - 1;

                // We have our indexes i1 & i3, so we can calculate already:
                // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
            };
            return this;
        },
        // xxx: for now i will just save one spline function to to
        getInterpolateFunction: function getInterpolateFunction(c) {
            var swiper = this;
            if (!swiper.controller.spline) {
                swiper.controller.spline = swiper.params.loop ?
                    new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) :
                    new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
            }
        },
        setTranslate: function setTranslate(setTranslate$1, byController) {
            var swiper = this;
            var controlled = swiper.controller.control;
            var multiplier;
            var controlledTranslate;
            function setControlledTranslate(c) {
                // this will create an Interpolate function based on the snapGrids
                // x is the Grid of the scrolled scroller and y will be the controlled scroller
                // it makes sense to create this only once and recall it for the interpolation
                // the function does a lot of value caching for performance
                var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
                if (swiper.params.controller.by === 'slide') {
                    swiper.controller.getInterpolateFunction(c);
                    // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                    // but it did not work out
                    controlledTranslate = -swiper.controller.spline.interpolate(-translate);
                }

                if (!controlledTranslate || swiper.params.controller.by === 'container') {
                    multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
                    controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
                }

                if (swiper.params.controller.inverse) {
                    controlledTranslate = c.maxTranslate() - controlledTranslate;
                }
                c.updateProgress(controlledTranslate);
                c.setTranslate(controlledTranslate, swiper);
                c.updateActiveIndex();
                c.updateSlidesClasses();
            }
            if (Array.isArray(controlled)) {
                for (var i = 0; i < controlled.length; i += 1) {
                    if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                        setControlledTranslate(controlled[i]);
                    }
                }
            } else if (controlled instanceof Swiper && byController !== controlled) {
                setControlledTranslate(controlled);
            }
        },
        setTransition: function setTransition(duration, byController) {
            var swiper = this;
            var controlled = swiper.controller.control;
            var i;
            function setControlledTransition(c) {
                c.setTransition(duration, swiper);
                if (duration !== 0) {
                    c.transitionStart();
                    c.$wrapperEl.transitionEnd(function () {
                        if (!controlled) { return; }
                        if (c.params.loop && swiper.params.controller.by === 'slide') {
                            c.loopFix();
                        }
                        c.transitionEnd();
                    });
                }
            }
            if (Array.isArray(controlled)) {
                for (i = 0; i < controlled.length; i += 1) {
                    if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                        setControlledTransition(controlled[i]);
                    }
                }
            } else if (controlled instanceof Swiper && byController !== controlled) {
                setControlledTransition(controlled);
            }
        },
    };
    var Controller$1 = {
        name: 'controller',
        params: {
            controller: {
                control: undefined,
                inverse: false,
                by: 'slide', // or 'container'
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                controller: {
                    control: swiper.params.controller.control,
                    getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
                    setTranslate: Controller.setTranslate.bind(swiper),
                    setTransition: Controller.setTransition.bind(swiper),
                },
            });
        },
        on: {
            update: function update() {
                var swiper = this;
                if (!swiper.controller.control) { return; }
                if (swiper.controller.spline) {
                    swiper.controller.spline = undefined;
                    delete swiper.controller.spline;
                }
            },
            resize: function resize() {
                var swiper = this;
                if (!swiper.controller.control) { return; }
                if (swiper.controller.spline) {
                    swiper.controller.spline = undefined;
                    delete swiper.controller.spline;
                }
            },
            observerUpdate: function observerUpdate() {
                var swiper = this;
                if (!swiper.controller.control) { return; }
                if (swiper.controller.spline) {
                    swiper.controller.spline = undefined;
                    delete swiper.controller.spline;
                }
            },
            setTranslate: function setTranslate(translate, byController) {
                var swiper = this;
                if (!swiper.controller.control) { return; }
                swiper.controller.setTranslate(translate, byController);
            },
            setTransition: function setTransition(duration, byController) {
                var swiper = this;
                if (!swiper.controller.control) { return; }
                swiper.controller.setTransition(duration, byController);
            },
        },
    };

    var a11y = {
        makeElFocusable: function makeElFocusable($el) {
            $el.attr('tabIndex', '0');
            return $el;
        },
        addElRole: function addElRole($el, role) {
            $el.attr('role', role);
            return $el;
        },
        addElLabel: function addElLabel($el, label) {
            $el.attr('aria-label', label);
            return $el;
        },
        disableEl: function disableEl($el) {
            $el.attr('aria-disabled', true);
            return $el;
        },
        enableEl: function enableEl($el) {
            $el.attr('aria-disabled', false);
            return $el;
        },
        onEnterKey: function onEnterKey(e) {
            var swiper = this;
            var params = swiper.params.a11y;
            if (e.keyCode !== 13) { return; }
            var $targetEl = $(e.target);
            if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
                if (!(swiper.isEnd && !swiper.params.loop)) {
                    swiper.slideNext();
                }
                if (swiper.isEnd) {
                    swiper.a11y.notify(params.lastSlideMessage);
                } else {
                    swiper.a11y.notify(params.nextSlideMessage);
                }
            }
            if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
                if (!(swiper.isBeginning && !swiper.params.loop)) {
                    swiper.slidePrev();
                }
                if (swiper.isBeginning) {
                    swiper.a11y.notify(params.firstSlideMessage);
                } else {
                    swiper.a11y.notify(params.prevSlideMessage);
                }
            }
            if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
                $targetEl[0].click();
            }
        },
        notify: function notify(message) {
            var swiper = this;
            var notification = swiper.a11y.liveRegion;
            if (notification.length === 0) { return; }
            notification.html('');
            notification.html(message);
        },
        updateNavigation: function updateNavigation() {
            var swiper = this;

            if (swiper.params.loop) { return; }
            var ref = swiper.navigation;
            var $nextEl = ref.$nextEl;
            var $prevEl = ref.$prevEl;

            if ($prevEl && $prevEl.length > 0) {
                if (swiper.isBeginning) {
                    swiper.a11y.disableEl($prevEl);
                } else {
                    swiper.a11y.enableEl($prevEl);
                }
            }
            if ($nextEl && $nextEl.length > 0) {
                if (swiper.isEnd) {
                    swiper.a11y.disableEl($nextEl);
                } else {
                    swiper.a11y.enableEl($nextEl);
                }
            }
        },
        updatePagination: function updatePagination() {
            var swiper = this;
            var params = swiper.params.a11y;
            if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
                swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
                    var $bulletEl = $(bulletEl);
                    swiper.a11y.makeElFocusable($bulletEl);
                    swiper.a11y.addElRole($bulletEl, 'button');
                    swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
                });
            }
        },
        init: function init() {
            var swiper = this;

            swiper.$el.append(swiper.a11y.liveRegion);

            // Navigation
            var params = swiper.params.a11y;
            var $nextEl;
            var $prevEl;
            if (swiper.navigation && swiper.navigation.$nextEl) {
                $nextEl = swiper.navigation.$nextEl;
            }
            if (swiper.navigation && swiper.navigation.$prevEl) {
                $prevEl = swiper.navigation.$prevEl;
            }
            if ($nextEl) {
                swiper.a11y.makeElFocusable($nextEl);
                swiper.a11y.addElRole($nextEl, 'button');
                swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
                $nextEl.on('keydown', swiper.a11y.onEnterKey);
            }
            if ($prevEl) {
                swiper.a11y.makeElFocusable($prevEl);
                swiper.a11y.addElRole($prevEl, 'button');
                swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
                $prevEl.on('keydown', swiper.a11y.onEnterKey);
            }

            // Pagination
            if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
                swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
            }
        },
        destroy: function destroy() {
            var swiper = this;
            if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

            var $nextEl;
            var $prevEl;
            if (swiper.navigation && swiper.navigation.$nextEl) {
                $nextEl = swiper.navigation.$nextEl;
            }
            if (swiper.navigation && swiper.navigation.$prevEl) {
                $prevEl = swiper.navigation.$prevEl;
            }
            if ($nextEl) {
                $nextEl.off('keydown', swiper.a11y.onEnterKey);
            }
            if ($prevEl) {
                $prevEl.off('keydown', swiper.a11y.onEnterKey);
            }

            // Pagination
            if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
                swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
            }
        },
    };
    var A11y = {
        name: 'a11y',
        params: {
            a11y: {
                enabled: true,
                notificationClass: 'swiper-notification',
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
                paginationBulletMessage: 'Go to slide {{index}}',
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                a11y: {
                    liveRegion: $(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
                },
            });
            Object.keys(a11y).forEach(function (methodName) {
                swiper.a11y[methodName] = a11y[methodName].bind(swiper);
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                if (!swiper.params.a11y.enabled) { return; }
                swiper.a11y.init();
                swiper.a11y.updateNavigation();
            },
            toEdge: function toEdge() {
                var swiper = this;
                if (!swiper.params.a11y.enabled) { return; }
                swiper.a11y.updateNavigation();
            },
            fromEdge: function fromEdge() {
                var swiper = this;
                if (!swiper.params.a11y.enabled) { return; }
                swiper.a11y.updateNavigation();
            },
            paginationUpdate: function paginationUpdate() {
                var swiper = this;
                if (!swiper.params.a11y.enabled) { return; }
                swiper.a11y.updatePagination();
            },
            destroy: function destroy() {
                var swiper = this;
                if (!swiper.params.a11y.enabled) { return; }
                swiper.a11y.destroy();
            },
        },
    };

    var History = {
        init: function init() {
            var swiper = this;
            if (!swiper.params.history) { return; }
            if (!win.history || !win.history.pushState) {
                swiper.params.history.enabled = false;
                swiper.params.hashNavigation.enabled = true;
                return;
            }
            var history = swiper.history;
            history.initialized = true;
            history.paths = History.getPathValues();
            if (!history.paths.key && !history.paths.value) { return; }
            history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
            if (!swiper.params.history.replaceState) {
                win.addEventListener('popstate', swiper.history.setHistoryPopState);
            }
        },
        destroy: function destroy() {
            var swiper = this;
            if (!swiper.params.history.replaceState) {
                win.removeEventListener('popstate', swiper.history.setHistoryPopState);
            }
        },
        setHistoryPopState: function setHistoryPopState() {
            var swiper = this;
            swiper.history.paths = History.getPathValues();
            swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
        },
        getPathValues: function getPathValues() {
            var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
            var total = pathArray.length;
            var key = pathArray[total - 2];
            var value = pathArray[total - 1];
            return { key: key, value: value };
        },
        setHistory: function setHistory(key, index) {
            var swiper = this;
            if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
            var slide = swiper.slides.eq(index);
            var value = History.slugify(slide.attr('data-history'));
            if (!win.location.pathname.includes(key)) {
                value = key + "/" + value;
            }
            var currentState = win.history.state;
            if (currentState && currentState.value === value) {
                return;
            }
            if (swiper.params.history.replaceState) {
                win.history.replaceState({ value: value }, null, value);
            } else {
                win.history.pushState({ value: value }, null, value);
            }
        },
        slugify: function slugify(text) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '')
                .replace(/--+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
        },
        scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
            var swiper = this;
            if (value) {
                for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
                    var slide = swiper.slides.eq(i);
                    var slideHistory = History.slugify(slide.attr('data-history'));
                    if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
                        var index = slide.index();
                        swiper.slideTo(index, speed, runCallbacks);
                    }
                }
            } else {
                swiper.slideTo(0, speed, runCallbacks);
            }
        },
    };

    var History$1 = {
        name: 'history',
        params: {
            history: {
                enabled: false,
                replaceState: false,
                key: 'slides',
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                history: {
                    init: History.init.bind(swiper),
                    setHistory: History.setHistory.bind(swiper),
                    setHistoryPopState: History.setHistoryPopState.bind(swiper),
                    scrollToSlide: History.scrollToSlide.bind(swiper),
                    destroy: History.destroy.bind(swiper),
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                if (swiper.params.history.enabled) {
                    swiper.history.init();
                }
            },
            destroy: function destroy() {
                var swiper = this;
                if (swiper.params.history.enabled) {
                    swiper.history.destroy();
                }
            },
            transitionEnd: function transitionEnd() {
                var swiper = this;
                if (swiper.history.initialized) {
                    swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
                }
            },
        },
    };

    var HashNavigation = {
        onHashCange: function onHashCange() {
            var swiper = this;
            var newHash = doc.location.hash.replace('#', '');
            var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
            if (newHash !== activeSlideHash) {
                swiper.slideTo(swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index());
            }
        },
        setHash: function setHash() {
            var swiper = this;
            if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
            if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
                win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
            } else {
                var slide = swiper.slides.eq(swiper.activeIndex);
                var hash = slide.attr('data-hash') || slide.attr('data-history');
                doc.location.hash = hash || '';
            }
        },
        init: function init() {
            var swiper = this;
            if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
            swiper.hashNavigation.initialized = true;
            var hash = doc.location.hash.replace('#', '');
            if (hash) {
                var speed = 0;
                for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
                    var slide = swiper.slides.eq(i);
                    var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                    if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
                        var index = slide.index();
                        swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
                    }
                }
            }
            if (swiper.params.hashNavigation.watchState) {
                $(win).on('hashchange', swiper.hashNavigation.onHashCange);
            }
        },
        destroy: function destroy() {
            var swiper = this;
            if (swiper.params.hashNavigation.watchState) {
                $(win).off('hashchange', swiper.hashNavigation.onHashCange);
            }
        },
    };
    var HashNavigation$1 = {
        name: 'hash-navigation',
        params: {
            hashNavigation: {
                enabled: false,
                replaceState: false,
                watchState: false,
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                hashNavigation: {
                    initialized: false,
                    init: HashNavigation.init.bind(swiper),
                    destroy: HashNavigation.destroy.bind(swiper),
                    setHash: HashNavigation.setHash.bind(swiper),
                    onHashCange: HashNavigation.onHashCange.bind(swiper),
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                if (swiper.params.hashNavigation.enabled) {
                    swiper.hashNavigation.init();
                }
            },
            destroy: function destroy() {
                var swiper = this;
                if (swiper.params.hashNavigation.enabled) {
                    swiper.hashNavigation.destroy();
                }
            },
            transitionEnd: function transitionEnd() {
                var swiper = this;
                if (swiper.hashNavigation.initialized) {
                    swiper.hashNavigation.setHash();
                }
            },
        },
    };

    /* eslint no-underscore-dangle: "off" */

    var Autoplay = {
        run: function run() {
            var swiper = this;
            var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
            var delay = swiper.params.autoplay.delay;
            if ($activeSlideEl.attr('data-swiper-autoplay')) {
                delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
            }
            swiper.autoplay.timeout = Utils.nextTick(function () {
                if (swiper.params.autoplay.reverseDirection) {
                    if (swiper.params.loop) {
                        swiper.loopFix();
                        swiper.slidePrev(swiper.params.speed, true, true);
                        swiper.emit('autoplay');
                    } else if (!swiper.isBeginning) {
                        swiper.slidePrev(swiper.params.speed, true, true);
                        swiper.emit('autoplay');
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
                        swiper.emit('autoplay');
                    } else {
                        swiper.autoplay.stop();
                    }
                } else if (swiper.params.loop) {
                    swiper.loopFix();
                    swiper.slideNext(swiper.params.speed, true, true);
                    swiper.emit('autoplay');
                } else if (!swiper.isEnd) {
                    swiper.slideNext(swiper.params.speed, true, true);
                    swiper.emit('autoplay');
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                    swiper.slideTo(0, swiper.params.speed, true, true);
                    swiper.emit('autoplay');
                } else {
                    swiper.autoplay.stop();
                }
            }, delay);
        },
        start: function start() {
            var swiper = this;
            if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
            if (swiper.autoplay.running) { return false; }
            swiper.autoplay.running = true;
            swiper.emit('autoplayStart');
            swiper.autoplay.run();
            return true;
        },
        stop: function stop() {
            var swiper = this;
            if (!swiper.autoplay.running) { return false; }
            if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

            if (swiper.autoplay.timeout) {
                clearTimeout(swiper.autoplay.timeout);
                swiper.autoplay.timeout = undefined;
            }
            swiper.autoplay.running = false;
            swiper.emit('autoplayStop');
            return true;
        },
        pause: function pause(speed) {
            var swiper = this;
            if (!swiper.autoplay.running) { return; }
            if (swiper.autoplay.paused) { return; }
            if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
            swiper.autoplay.paused = true;
            if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
                swiper.autoplay.paused = false;
                swiper.autoplay.run();
            } else {
                swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
                swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            }
        },
    };

    var Autoplay$1 = {
        name: 'autoplay',
        params: {
            autoplay: {
                enabled: false,
                delay: 3000,
                waitForTransition: true,
                disableOnInteraction: true,
                stopOnLastSlide: false,
                reverseDirection: false,
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                autoplay: {
                    running: false,
                    paused: false,
                    run: Autoplay.run.bind(swiper),
                    start: Autoplay.start.bind(swiper),
                    stop: Autoplay.stop.bind(swiper),
                    pause: Autoplay.pause.bind(swiper),
                    onTransitionEnd: function onTransitionEnd(e) {
                        if (!swiper || swiper.destroyed || !swiper.$wrapperEl) { return; }
                        if (e.target !== this) { return; }
                        swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
                        swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
                        swiper.autoplay.paused = false;
                        if (!swiper.autoplay.running) {
                            swiper.autoplay.stop();
                        } else {
                            swiper.autoplay.run();
                        }
                    },
                },
            });
        },
        on: {
            init: function init() {
                var swiper = this;
                if (swiper.params.autoplay.enabled) {
                    swiper.autoplay.start();
                }
            },
            beforeTransitionStart: function beforeTransitionStart(speed, internal) {
                var swiper = this;
                if (swiper.autoplay.running) {
                    if (internal || !swiper.params.autoplay.disableOnInteraction) {
                        swiper.autoplay.pause(speed);
                    } else {
                        swiper.autoplay.stop();
                    }
                }
            },
            sliderFirstMove: function sliderFirstMove() {
                var swiper = this;
                if (swiper.autoplay.running) {
                    if (swiper.params.autoplay.disableOnInteraction) {
                        swiper.autoplay.stop();
                    } else {
                        swiper.autoplay.pause();
                    }
                }
            },
            destroy: function destroy() {
                var swiper = this;
                if (swiper.autoplay.running) {
                    swiper.autoplay.stop();
                }
            },
        },
    };

    var Fade = {
        setTranslate: function setTranslate() {
            var swiper = this;
            var slides = swiper.slides;
            for (var i = 0; i < slides.length; i += 1) {
                var $slideEl = swiper.slides.eq(i);
                var offset = $slideEl[0].swiperSlideOffset;
                var tx = -offset;
                if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
                var ty = 0;
                if (!swiper.isHorizontal()) {
                    ty = tx;
                    tx = 0;
                }
                var slideOpacity = swiper.params.fadeEffect.crossFade ?
                    Math.max(1 - Math.abs($slideEl[0].progress), 0) :
                    1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
                $slideEl
                    .css({
                        opacity: slideOpacity,
                    })
                    .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
            }
        },
        setTransition: function setTransition(duration) {
            var swiper = this;
            var slides = swiper.slides;
            var $wrapperEl = swiper.$wrapperEl;
            slides.transition(duration);
            if (swiper.params.virtualTranslate && duration !== 0) {
                var eventTriggered = false;
                slides.transitionEnd(function () {
                    if (eventTriggered) { return; }
                    if (!swiper || swiper.destroyed) { return; }
                    eventTriggered = true;
                    swiper.animating = false;
                    var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                    for (var i = 0; i < triggerEvents.length; i += 1) {
                        $wrapperEl.trigger(triggerEvents[i]);
                    }
                });
            }
        },
    };

    var EffectFade = {
        name: 'effect-fade',
        params: {
            fadeEffect: {
                crossFade: false,
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                fadeEffect: {
                    setTranslate: Fade.setTranslate.bind(swiper),
                    setTransition: Fade.setTransition.bind(swiper),
                },
            });
        },
        on: {
            beforeInit: function beforeInit() {
                var swiper = this;
                if (swiper.params.effect !== 'fade') { return; }
                swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
                var overwriteParams = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    spaceBetween: 0,
                    virtualTranslate: true,
                };
                Utils.extend(swiper.params, overwriteParams);
                Utils.extend(swiper.originalParams, overwriteParams);
            },
            setTranslate: function setTranslate() {
                var swiper = this;
                if (swiper.params.effect !== 'fade') { return; }
                swiper.fadeEffect.setTranslate();
            },
            setTransition: function setTransition(duration) {
                var swiper = this;
                if (swiper.params.effect !== 'fade') { return; }
                swiper.fadeEffect.setTransition(duration);
            },
        },
    };

    var Cube = {
        setTranslate: function setTranslate() {
            var swiper = this;
            var $el = swiper.$el;
            var $wrapperEl = swiper.$wrapperEl;
            var slides = swiper.slides;
            var swiperWidth = swiper.width;
            var swiperHeight = swiper.height;
            var rtl = swiper.rtlTranslate;
            var swiperSize = swiper.size;
            var params = swiper.params.cubeEffect;
            var isHorizontal = swiper.isHorizontal();
            var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            var wrapperRotate = 0;
            var $cubeShadowEl;
            if (params.shadow) {
                if (isHorizontal) {
                    $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
                    if ($cubeShadowEl.length === 0) {
                        $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
                        $wrapperEl.append($cubeShadowEl);
                    }
                    $cubeShadowEl.css({ height: (swiperWidth + "px") });
                } else {
                    $cubeShadowEl = $el.find('.swiper-cube-shadow');
                    if ($cubeShadowEl.length === 0) {
                        $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
                        $el.append($cubeShadowEl);
                    }
                }
            }
            for (var i = 0; i < slides.length; i += 1) {
                var $slideEl = slides.eq(i);
                var slideIndex = i;
                if (isVirtual) {
                    slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
                }
                var slideAngle = slideIndex * 90;
                var round = Math.floor(slideAngle / 360);
                if (rtl) {
                    slideAngle = -slideAngle;
                    round = Math.floor(-slideAngle / 360);
                }
                var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
                var tx = 0;
                var ty = 0;
                var tz = 0;
                if (slideIndex % 4 === 0) {
                    tx = -round * 4 * swiperSize;
                    tz = 0;
                } else if ((slideIndex - 1) % 4 === 0) {
                    tx = 0;
                    tz = -round * 4 * swiperSize;
                } else if ((slideIndex - 2) % 4 === 0) {
                    tx = swiperSize + (round * 4 * swiperSize);
                    tz = swiperSize;
                } else if ((slideIndex - 3) % 4 === 0) {
                    tx = -swiperSize;
                    tz = (3 * swiperSize) + (swiperSize * 4 * round);
                }
                if (rtl) {
                    tx = -tx;
                }

                if (!isHorizontal) {
                    ty = tx;
                    tx = 0;
                }

                var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
                if (progress <= 1 && progress > -1) {
                    wrapperRotate = (slideIndex * 90) + (progress * 90);
                    if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
                }
                $slideEl.transform(transform);
                if (params.slideShadows) {
                    // Set shadows
                    var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                    var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                    if (shadowBefore.length === 0) {
                        shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
                        $slideEl.append(shadowBefore);
                    }
                    if (shadowAfter.length === 0) {
                        shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
                        $slideEl.append(shadowAfter);
                    }
                    if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
                    if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
                }
            }
            $wrapperEl.css({
                '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
                '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
                '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
                'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
            });

            if (params.shadow) {
                if (isHorizontal) {
                    $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
                } else {
                    var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
                    var multiplier = 1.5 - (
                        (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2) +
                        (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
                    );
                    var scale1 = params.shadowScale;
                    var scale2 = params.shadowScale / multiplier;
                    var offset = params.shadowOffset;
                    $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
                }
            }
            var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
            $wrapperEl
                .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
        },
        setTransition: function setTransition(duration) {
            var swiper = this;
            var $el = swiper.$el;
            var slides = swiper.slides;
            slides
                .transition(duration)
                .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
                .transition(duration);
            if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
                $el.find('.swiper-cube-shadow').transition(duration);
            }
        },
    };

    var EffectCube = {
        name: 'effect-cube',
        params: {
            cubeEffect: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                cubeEffect: {
                    setTranslate: Cube.setTranslate.bind(swiper),
                    setTransition: Cube.setTransition.bind(swiper),
                },
            });
        },
        on: {
            beforeInit: function beforeInit() {
                var swiper = this;
                if (swiper.params.effect !== 'cube') { return; }
                swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
                swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
                var overwriteParams = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    resistanceRatio: 0,
                    spaceBetween: 0,
                    centeredSlides: false,
                    virtualTranslate: true,
                };
                Utils.extend(swiper.params, overwriteParams);
                Utils.extend(swiper.originalParams, overwriteParams);
            },
            setTranslate: function setTranslate() {
                var swiper = this;
                if (swiper.params.effect !== 'cube') { return; }
                swiper.cubeEffect.setTranslate();
            },
            setTransition: function setTransition(duration) {
                var swiper = this;
                if (swiper.params.effect !== 'cube') { return; }
                swiper.cubeEffect.setTransition(duration);
            },
        },
    };

    var Flip = {
        setTranslate: function setTranslate() {
            var swiper = this;
            var slides = swiper.slides;
            var rtl = swiper.rtlTranslate;
            for (var i = 0; i < slides.length; i += 1) {
                var $slideEl = slides.eq(i);
                var progress = $slideEl[0].progress;
                if (swiper.params.flipEffect.limitRotation) {
                    progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
                }
                var offset = $slideEl[0].swiperSlideOffset;
                var rotate = -180 * progress;
                var rotateY = rotate;
                var rotateX = 0;
                var tx = -offset;
                var ty = 0;
                if (!swiper.isHorizontal()) {
                    ty = tx;
                    tx = 0;
                    rotateX = -rotateY;
                    rotateY = 0;
                } else if (rtl) {
                    rotateY = -rotateY;
                }

                $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

                if (swiper.params.flipEffect.slideShadows) {
                    // Set shadows
                    var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                    var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                    if (shadowBefore.length === 0) {
                        shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
                        $slideEl.append(shadowBefore);
                    }
                    if (shadowAfter.length === 0) {
                        shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
                        $slideEl.append(shadowAfter);
                    }
                    if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
                    if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
                }
                $slideEl
                    .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
            }
        },
        setTransition: function setTransition(duration) {
            var swiper = this;
            var slides = swiper.slides;
            var activeIndex = swiper.activeIndex;
            var $wrapperEl = swiper.$wrapperEl;
            slides
                .transition(duration)
                .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
                .transition(duration);
            if (swiper.params.virtualTranslate && duration !== 0) {
                var eventTriggered = false;
                // eslint-disable-next-line
                slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
                    if (eventTriggered) { return; }
                    if (!swiper || swiper.destroyed) { return; }
                    // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
                    eventTriggered = true;
                    swiper.animating = false;
                    var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                    for (var i = 0; i < triggerEvents.length; i += 1) {
                        $wrapperEl.trigger(triggerEvents[i]);
                    }
                });
            }
        },
    };

    var EffectFlip = {
        name: 'effect-flip',
        params: {
            flipEffect: {
                slideShadows: true,
                limitRotation: true,
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                flipEffect: {
                    setTranslate: Flip.setTranslate.bind(swiper),
                    setTransition: Flip.setTransition.bind(swiper),
                },
            });
        },
        on: {
            beforeInit: function beforeInit() {
                var swiper = this;
                if (swiper.params.effect !== 'flip') { return; }
                swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
                swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
                var overwriteParams = {
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerGroup: 1,
                    watchSlidesProgress: true,
                    spaceBetween: 0,
                    virtualTranslate: true,
                };
                Utils.extend(swiper.params, overwriteParams);
                Utils.extend(swiper.originalParams, overwriteParams);
            },
            setTranslate: function setTranslate() {
                var swiper = this;
                if (swiper.params.effect !== 'flip') { return; }
                swiper.flipEffect.setTranslate();
            },
            setTransition: function setTransition(duration) {
                var swiper = this;
                if (swiper.params.effect !== 'flip') { return; }
                swiper.flipEffect.setTransition(duration);
            },
        },
    };

    var Coverflow = {
        setTranslate: function setTranslate() {
            var swiper = this;
            var swiperWidth = swiper.width;
            var swiperHeight = swiper.height;
            var slides = swiper.slides;
            var $wrapperEl = swiper.$wrapperEl;
            var slidesSizesGrid = swiper.slidesSizesGrid;
            var params = swiper.params.coverflowEffect;
            var isHorizontal = swiper.isHorizontal();
            var transform = swiper.translate;
            var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
            var rotate = isHorizontal ? params.rotate : -params.rotate;
            var translate = params.depth;
            // Each slide offset from center
            for (var i = 0, length = slides.length; i < length; i += 1) {
                var $slideEl = slides.eq(i);
                var slideSize = slidesSizesGrid[i];
                var slideOffset = $slideEl[0].swiperSlideOffset;
                var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

                var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
                var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
                // var rotateZ = 0
                var translateZ = -translate * Math.abs(offsetMultiplier);

                var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
                var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

                // Fix for ultra small values
                if (Math.abs(translateX) < 0.001) { translateX = 0; }
                if (Math.abs(translateY) < 0.001) { translateY = 0; }
                if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
                if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
                if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

                var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

                $slideEl.transform(slideTransform);
                $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                if (params.slideShadows) {
                    // Set shadows
                    var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                    var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                    if ($shadowBeforeEl.length === 0) {
                        $shadowBeforeEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
                        $slideEl.append($shadowBeforeEl);
                    }
                    if ($shadowAfterEl.length === 0) {
                        $shadowAfterEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
                        $slideEl.append($shadowAfterEl);
                    }
                    if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
                    if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
                }
            }

            // Set correct perspective for IE10
            if (Support.pointerEvents || Support.prefixedPointerEvents) {
                var ws = $wrapperEl[0].style;
                ws.perspectiveOrigin = center + "px 50%";
            }
        },
        setTransition: function setTransition(duration) {
            var swiper = this;
            swiper.slides
                .transition(duration)
                .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
                .transition(duration);
        },
    };

    var EffectCoverflow = {
        name: 'effect-coverflow',
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
        },
        create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
                coverflowEffect: {
                    setTranslate: Coverflow.setTranslate.bind(swiper),
                    setTransition: Coverflow.setTransition.bind(swiper),
                },
            });
        },
        on: {
            beforeInit: function beforeInit() {
                var swiper = this;
                if (swiper.params.effect !== 'coverflow') { return; }

                swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
                swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

                swiper.params.watchSlidesProgress = true;
                swiper.originalParams.watchSlidesProgress = true;
            },
            setTranslate: function setTranslate() {
                var swiper = this;
                if (swiper.params.effect !== 'coverflow') { return; }
                swiper.coverflowEffect.setTranslate();
            },
            setTransition: function setTransition(duration) {
                var swiper = this;
                if (swiper.params.effect !== 'coverflow') { return; }
                swiper.coverflowEffect.setTransition(duration);
            },
        },
    };

    // Swiper Class

    var components = [
        Device$1,
        Support$1,
        Browser$1,
        Resize,
        Observer$1,
        Virtual$1,
        Keyboard$1,
        Mousewheel$1,
        Navigation$1,
        Pagination$1,
        Scrollbar$1,
        Parallax$1,
        Zoom$1,
        Lazy$1,
        Controller$1,
        A11y,
        History$1,
        HashNavigation$1,
        Autoplay$1,
        EffectFade,
        EffectCube,
        EffectFlip,
        EffectCoverflow
    ];

    if (typeof Swiper.use === 'undefined') {
        Swiper.use = Swiper.Class.use;
        Swiper.installModule = Swiper.Class.installModule;
    }

    Swiper.use(components);

    return Swiper;

})));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InN3aXBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBTd2lwZXIgNC4zLjNcclxuICogTW9zdCBtb2Rlcm4gbW9iaWxlIHRvdWNoIHNsaWRlciBhbmQgZnJhbWV3b3JrIHdpdGggaGFyZHdhcmUgYWNjZWxlcmF0ZWQgdHJhbnNpdGlvbnNcclxuICogaHR0cDovL3d3dy5pZGFuZ2Vyby51cy9zd2lwZXIvXHJcbiAqXHJcbiAqIENvcHlyaWdodCAyMDE0LTIwMTggVmxhZGltaXIgS2hhcmxhbXBpZGlcclxuICpcclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqXHJcbiAqIFJlbGVhc2VkIG9uOiBKdW5lIDUsIDIwMThcclxuICovXHJcblxyXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xyXG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxyXG4gICAgICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XHJcbiAgICAgICAgICAgIChnbG9iYWwuU3dpcGVyID0gZmFjdG9yeSgpKTtcclxufSh3aW5kb3csIChmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTU1IgV2luZG93IDEuMC4wXHJcbiAgICAgKiBCZXR0ZXIgaGFuZGxpbmcgZm9yIHdpbmRvdyBvYmplY3QgaW4gU1NSIGVudmlyb25tZW50XHJcbiAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbm9saW1pdHM0d2ViL3Nzci13aW5kb3dcclxuICAgICAqXHJcbiAgICAgKiBDb3B5cmlnaHQgMjAxOCwgVmxhZGltaXIgS2hhcmxhbXBpZGlcclxuICAgICAqXHJcbiAgICAgKiBMaWNlbnNlZCB1bmRlciBNSVRcclxuICAgICAqXHJcbiAgICAgKiBSZWxlYXNlZCBvbjogRmVicnVhcnkgMTAsIDIwMThcclxuICAgICAqL1xyXG4gICAgdmFyIGQ7XHJcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGQgPSB7XHJcbiAgICAgICAgICAgIGJvZHk6IHt9LFxyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKCkgeyB9LFxyXG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKCkgeyB9LFxyXG4gICAgICAgICAgICBhY3RpdmVFbGVtZW50OiB7XHJcbiAgICAgICAgICAgICAgICBibHVyOiBmdW5jdGlvbiBibHVyKCkgeyB9LFxyXG4gICAgICAgICAgICAgICAgbm9kZU5hbWU6ICcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBxdWVyeVNlbGVjdG9yOiBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3JBbGwoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldEVsZW1lbnRCeUlkOiBmdW5jdGlvbiBnZXRFbGVtZW50QnlJZCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjcmVhdGVFdmVudDogZnVuY3Rpb24gY3JlYXRlRXZlbnQoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRFdmVudDogZnVuY3Rpb24gaW5pdEV2ZW50KCkgeyB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gY3JlYXRlRWxlbWVudCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTm9kZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGU6IGZ1bmN0aW9uIHNldEF0dHJpYnV0ZSgpIHsgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZTogZnVuY3Rpb24gZ2V0RWxlbWVudHNCeVRhZ05hbWUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbG9jYXRpb246IHsgaGFzaDogJycgfSxcclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICBkID0gZG9jdW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRvYyA9IGQ7XHJcblxyXG4gICAgdmFyIHc7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB3ID0ge1xyXG4gICAgICAgICAgICBkb2N1bWVudDogZG9jLFxyXG4gICAgICAgICAgICBuYXZpZ2F0b3I6IHtcclxuICAgICAgICAgICAgICAgIHVzZXJBZ2VudDogJycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxvY2F0aW9uOiB7fSxcclxuICAgICAgICAgICAgaGlzdG9yeToge30sXHJcbiAgICAgICAgICAgIEN1c3RvbUV2ZW50OiBmdW5jdGlvbiBDdXN0b21FdmVudCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKCkgeyB9LFxyXG4gICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKCkgeyB9LFxyXG4gICAgICAgICAgICBnZXRDb21wdXRlZFN0eWxlOiBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRQcm9wZXJ0eVZhbHVlOiBmdW5jdGlvbiBnZXRQcm9wZXJ0eVZhbHVlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIEltYWdlOiBmdW5jdGlvbiBJbWFnZSgpIHsgfSxcclxuICAgICAgICAgICAgRGF0ZTogZnVuY3Rpb24gRGF0ZSgpIHsgfSxcclxuICAgICAgICAgICAgc2NyZWVuOiB7fSxcclxuICAgICAgICAgICAgc2V0VGltZW91dDogZnVuY3Rpb24gc2V0VGltZW91dCgpIHsgfSxcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbiBjbGVhclRpbWVvdXQoKSB7IH0sXHJcbiAgICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICAgdyA9IHdpbmRvdztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgd2luID0gdztcclxuXHJcbiAgICAvKipcclxuICAgICAqIERvbTcgMi4wLjZcclxuICAgICAqIE1pbmltYWxpc3RpYyBKYXZhU2NyaXB0IGxpYnJhcnkgZm9yIERPTSBtYW5pcHVsYXRpb24sIHdpdGggYSBqUXVlcnktY29tcGF0aWJsZSBBUElcclxuICAgICAqIGh0dHA6Ly9mcmFtZXdvcms3LmlvL2RvY3MvZG9tLmh0bWxcclxuICAgICAqXHJcbiAgICAgKiBDb3B5cmlnaHQgMjAxOCwgVmxhZGltaXIgS2hhcmxhbXBpZGlcclxuICAgICAqIFRoZSBpRGFuZ2Vyby51c1xyXG4gICAgICogaHR0cDovL3d3dy5pZGFuZ2Vyby51cy9cclxuICAgICAqXHJcbiAgICAgKiBMaWNlbnNlZCB1bmRlciBNSVRcclxuICAgICAqXHJcbiAgICAgKiBSZWxlYXNlZCBvbjogTWF5IDI3LCAyMDE4XHJcbiAgICAgKi9cclxuXHJcbiAgICB2YXIgRG9tNyA9IGZ1bmN0aW9uIERvbTcoYXJyKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIENyZWF0ZSBhcnJheS1saWtlIG9iamVjdFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHNlbGZbaV0gPSBhcnJbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYubGVuZ3RoID0gYXJyLmxlbmd0aDtcclxuICAgICAgICAvLyBSZXR1cm4gY29sbGVjdGlvbiB3aXRoIG1ldGhvZHNcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gJChzZWxlY3RvciwgY29udGV4dCkge1xyXG4gICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICB2YXIgaSA9IDA7XHJcbiAgICAgICAgaWYgKHNlbGVjdG9yICYmICFjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIERvbTcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgLy8gU3RyaW5nXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBQYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCA9IHNlbGVjdG9yLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzwnKSA+PSAwICYmIGh0bWwuaW5kZXhPZignPicpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9DcmVhdGUgPSAnZGl2JztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8bGknKSA9PT0gMCkgeyB0b0NyZWF0ZSA9ICd1bCc7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dHInKSA9PT0gMCkgeyB0b0NyZWF0ZSA9ICd0Ym9keSc7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dGQnKSA9PT0gMCB8fCBodG1sLmluZGV4T2YoJzx0aCcpID09PSAwKSB7IHRvQ3JlYXRlID0gJ3RyJzsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzx0Ym9keScpID09PSAwKSB7IHRvQ3JlYXRlID0gJ3RhYmxlJzsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxvcHRpb24nKSA9PT0gMCkgeyB0b0NyZWF0ZSA9ICdzZWxlY3QnOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcFBhcmVudCA9IGRvYy5jcmVhdGVFbGVtZW50KHRvQ3JlYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wUGFyZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRlbXBQYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh0ZW1wUGFyZW50LmNoaWxkTm9kZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0ICYmIHNlbGVjdG9yWzBdID09PSAnIycgJiYgIXNlbGVjdG9yLm1hdGNoKC9bIC48Pjp+XS8pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFB1cmUgSUQgc2VsZWN0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzID0gW2RvYy5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci50cmltKCkuc3BsaXQoJyMnKVsxXSldO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyIHNlbGVjdG9yc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHMgPSAoY29udGV4dCB8fCBkb2MpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IudHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxzW2ldKSB7IGFyci5wdXNoKGVsc1tpXSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgc2VsZWN0b3IgPT09IHdpbiB8fCBzZWxlY3RvciA9PT0gZG9jKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBOb2RlL2VsZW1lbnRcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvci5sZW5ndGggPiAwICYmIHNlbGVjdG9yWzBdLm5vZGVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBcnJheSBvZiBlbGVtZW50cyBvciBpbnN0YW5jZSBvZiBEb21cclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzZWxlY3Rvci5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHNlbGVjdG9yW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IERvbTcoYXJyKTtcclxuICAgIH1cclxuXHJcbiAgICAkLmZuID0gRG9tNy5wcm90b3R5cGU7XHJcbiAgICAkLkNsYXNzID0gRG9tNztcclxuICAgICQuRG9tNyA9IERvbTc7XHJcblxyXG4gICAgZnVuY3Rpb24gdW5pcXVlKGFycikge1xyXG4gICAgICAgIHZhciB1bmlxdWVBcnJheSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh1bmlxdWVBcnJheS5pbmRleE9mKGFycltpXSkgPT09IC0xKSB7IHVuaXF1ZUFycmF5LnB1c2goYXJyW2ldKTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5pcXVlQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xhc3NlcyBhbmQgYXR0cmlidXRlc1xyXG4gICAgZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMkMVtqXS5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB7IHRoaXMkMVtqXS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaV0pOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMkMVtqXS5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB7IHRoaXMkMVtqXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXNbaV0pOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBoYXNDbGFzcyhjbGFzc05hbWUpIHtcclxuICAgICAgICBpZiAoIXRoaXNbMF0pIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0b2dnbGVDbGFzcyhjbGFzc05hbWUpIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMkMVtqXS5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB7IHRoaXMkMVtqXS5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzZXNbaV0pOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhdHRyKGF0dHJzLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGF0dHJzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAvLyBHZXQgYXR0clxyXG4gICAgICAgICAgICBpZiAodGhpc1swXSkgeyByZXR1cm4gdGhpc1swXS5nZXRBdHRyaWJ1dGUoYXR0cnMpOyB9XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgYXR0cnNcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cyQxLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgLy8gU3RyaW5nXHJcbiAgICAgICAgICAgICAgICB0aGlzJDFbaV0uc2V0QXR0cmlidXRlKGF0dHJzLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBPYmplY3RcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzJDFbaV1bYXR0ck5hbWVdID0gYXR0cnNbYXR0ck5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMVtpXS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJzW2F0dHJOYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIGZ1bmN0aW9uIHJlbW92ZUF0dHIoYXR0cikge1xyXG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgdGhpcyQxW2ldLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkYXRhKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGVsO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGVsID0gdGhpc1swXTtcclxuICAgICAgICAgICAgLy8gR2V0IHZhbHVlXHJcbiAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UgJiYgKGtleSBpbiBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGFLZXkgPSBlbC5nZXRBdHRyaWJ1dGUoKFwiZGF0YS1cIiArIGtleSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YUtleTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNldCB2YWx1ZVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBlbCA9IHRoaXMkMVtpXTtcclxuICAgICAgICAgICAgaWYgKCFlbC5kb203RWxlbWVudERhdGFTdG9yYWdlKSB7IGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UgPSB7fTsgfVxyXG4gICAgICAgICAgICBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvLyBUcmFuc2Zvcm1zXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIGZ1bmN0aW9uIHRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBlbFN0eWxlID0gdGhpcyQxW2ldLnN0eWxlO1xyXG4gICAgICAgICAgICBlbFN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcclxuICAgICAgICAgICAgZWxTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbihkdXJhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGR1cmF0aW9uICE9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uICsgXCJtc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICB2YXIgZWxTdHlsZSA9IHRoaXMkMVtpXS5zdHlsZTtcclxuICAgICAgICAgICAgZWxTdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICAgICAgZWxTdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvLyBFdmVudHNcclxuICAgIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG4gICAgICAgIHZhciBhc3NpZ247XHJcblxyXG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKGxlbi0tKSBhcmdzW2xlbl0gPSBhcmd1bWVudHNbbGVuXTtcclxuICAgICAgICB2YXIgZXZlbnRUeXBlID0gYXJnc1swXTtcclxuICAgICAgICB2YXIgdGFyZ2V0U2VsZWN0b3IgPSBhcmdzWzFdO1xyXG4gICAgICAgIHZhciBsaXN0ZW5lciA9IGFyZ3NbMl07XHJcbiAgICAgICAgdmFyIGNhcHR1cmUgPSBhcmdzWzNdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAoYXNzaWduID0gYXJncywgZXZlbnRUeXBlID0gYXNzaWduWzBdLCBsaXN0ZW5lciA9IGFzc2lnblsxXSwgY2FwdHVyZSA9IGFzc2lnblsyXSk7XHJcbiAgICAgICAgICAgIHRhcmdldFNlbGVjdG9yID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNhcHR1cmUpIHsgY2FwdHVyZSA9IGZhbHNlOyB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUxpdmVFdmVudChlKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHZhciBldmVudERhdGEgPSBlLnRhcmdldC5kb203RXZlbnREYXRhIHx8IFtdO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnREYXRhLmluZGV4T2YoZSkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudERhdGEudW5zaGlmdChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCh0YXJnZXQpLmlzKHRhcmdldFNlbGVjdG9yKSkgeyBsaXN0ZW5lci5hcHBseSh0YXJnZXQsIGV2ZW50RGF0YSk7IH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50cyA9ICQodGFyZ2V0KS5wYXJlbnRzKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcGFyZW50cy5sZW5ndGg7IGsgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHBhcmVudHNba10pLmlzKHRhcmdldFNlbGVjdG9yKSkgeyBsaXN0ZW5lci5hcHBseShwYXJlbnRzW2tdLCBldmVudERhdGEpOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXZlbnQoZSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnREYXRhID0gZSAmJiBlLnRhcmdldCA/IGUudGFyZ2V0LmRvbTdFdmVudERhdGEgfHwgW10gOiBbXTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50RGF0YS5pbmRleE9mKGUpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnREYXRhLnVuc2hpZnQoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgZXZlbnREYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IGV2ZW50VHlwZS5zcGxpdCgnICcpO1xyXG4gICAgICAgIHZhciBqO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICB2YXIgZWwgPSB0aGlzJDFbaV07XHJcbiAgICAgICAgICAgIGlmICghdGFyZ2V0U2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbC5kb203TGlzdGVuZXJzKSB7IGVsLmRvbTdMaXN0ZW5lcnMgPSB7fTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZWwuZG9tN0xpc3RlbmVyc1tldmVudF0pIHsgZWwuZG9tN0xpc3RlbmVyc1tldmVudF0gPSBbXTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsLmRvbTdMaXN0ZW5lcnNbZXZlbnRdLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3h5TGlzdGVuZXI6IGhhbmRsZUV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZUV2ZW50LCBjYXB0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIExpdmUgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZXZlbnRzLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50JDEgPSBldmVudHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbC5kb203TGl2ZUxpc3RlbmVycykgeyBlbC5kb203TGl2ZUxpc3RlbmVycyA9IHt9OyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbC5kb203TGl2ZUxpc3RlbmVyc1tldmVudCQxXSkgeyBlbC5kb203TGl2ZUxpc3RlbmVyc1tldmVudCQxXSA9IFtdOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuZG9tN0xpdmVMaXN0ZW5lcnNbZXZlbnQkMV0ucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJveHlMaXN0ZW5lcjogaGFuZGxlTGl2ZUV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQkMSwgaGFuZGxlTGl2ZUV2ZW50LCBjYXB0dXJlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9mZigpIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuICAgICAgICB2YXIgYXNzaWduO1xyXG5cclxuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChsZW4tLSkgYXJnc1tsZW5dID0gYXJndW1lbnRzW2xlbl07XHJcbiAgICAgICAgdmFyIGV2ZW50VHlwZSA9IGFyZ3NbMF07XHJcbiAgICAgICAgdmFyIHRhcmdldFNlbGVjdG9yID0gYXJnc1sxXTtcclxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzJdO1xyXG4gICAgICAgIHZhciBjYXB0dXJlID0gYXJnc1szXTtcclxuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgKGFzc2lnbiA9IGFyZ3MsIGV2ZW50VHlwZSA9IGFzc2lnblswXSwgbGlzdGVuZXIgPSBhc3NpZ25bMV0sIGNhcHR1cmUgPSBhc3NpZ25bMl0pO1xyXG4gICAgICAgICAgICB0YXJnZXRTZWxlY3RvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjYXB0dXJlKSB7IGNhcHR1cmUgPSBmYWxzZTsgfVxyXG5cclxuICAgICAgICB2YXIgZXZlbnRzID0gZXZlbnRUeXBlLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbCA9IHRoaXMkMVtqXTtcclxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVycyA9ICh2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXRTZWxlY3RvciAmJiBlbC5kb203TGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMgPSBlbC5kb203TGlzdGVuZXJzW2V2ZW50XTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0U2VsZWN0b3IgJiYgZWwuZG9tN0xpdmVMaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVycyA9IGVsLmRvbTdMaXZlTGlzdGVuZXJzW2V2ZW50XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVycyAmJiBoYW5kbGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gaGFuZGxlcnMubGVuZ3RoIC0gMTsgayA+PSAwOyBrIC09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSBoYW5kbGVyc1trXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICYmIGhhbmRsZXIubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLnByb3h5TGlzdGVuZXIsIGNhcHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGssIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlci5wcm94eUxpc3RlbmVyLCBjYXB0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShrLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHRyaWdnZXIoKSB7XHJcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAobGVuLS0pIGFyZ3NbbGVuXSA9IGFyZ3VtZW50c1tsZW5dO1xyXG5cclxuICAgICAgICB2YXIgZXZlbnRzID0gYXJnc1swXS5zcGxpdCgnICcpO1xyXG4gICAgICAgIHZhciBldmVudERhdGEgPSBhcmdzWzFdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzJDFbal07XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZ0ID0gKHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2dCA9IG5ldyB3aW4uQ3VzdG9tRXZlbnQoZXZlbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiBldmVudERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZ0ID0gZG9jLmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnQsIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2dC5kZXRhaWwgPSBldmVudERhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICAgICAgICAgIGVsLmRvbTdFdmVudERhdGEgPSBhcmdzLmZpbHRlcihmdW5jdGlvbiAoZGF0YSwgZGF0YUluZGV4KSB7IHJldHVybiBkYXRhSW5kZXggPiAwOyB9KTtcclxuICAgICAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICAgICAgICAgIGVsLmRvbTdFdmVudERhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlbC5kb203RXZlbnREYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBldmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCddO1xyXG4gICAgICAgIHZhciBkb20gPSB0aGlzO1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGZpcmVDYWxsQmFjayhlKSB7XHJcbiAgICAgICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZSk7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIGRvbS5vZmYoZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkb20ub24oZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb3V0ZXJXaWR0aChpbmNsdWRlTWFyZ2lucykge1xyXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMgPSB0aGlzLnN0eWxlcygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGggKyBwYXJzZUZsb2F0KHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tcmlnaHQnKSkgKyBwYXJzZUZsb2F0KHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tbGVmdCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBvdXRlckhlaWdodChpbmNsdWRlTWFyZ2lucykge1xyXG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICAgICAgICAgIHZhciBzdHlsZXMgPSB0aGlzLnN0eWxlcygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXRvcCcpKSArIHBhcnNlRmxvYXQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1ib3R0b20nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9mZnNldCgpIHtcclxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXNbMF07XHJcbiAgICAgICAgICAgIHZhciBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2MuYm9keTtcclxuICAgICAgICAgICAgdmFyIGNsaWVudFRvcCA9IGVsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xyXG4gICAgICAgICAgICB2YXIgY2xpZW50TGVmdCA9IGVsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBlbCA9PT0gd2luID8gd2luLnNjcm9sbFkgOiBlbC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxMZWZ0ID0gZWwgPT09IHdpbiA/IHdpbi5zY3JvbGxYIDogZWwuc2Nyb2xsTGVmdDtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvcDogKGJveC50b3AgKyBzY3JvbGxUb3ApIC0gY2xpZW50VG9wLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogKGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCkgLSBjbGllbnRMZWZ0LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdHlsZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXNbMF0pIHsgcmV0dXJuIHdpbi5nZXRDb21wdXRlZFN0eWxlKHRoaXNbMF0sIG51bGwpOyB9XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY3NzKHByb3BzLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgaTtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0pIHsgcmV0dXJuIHdpbi5nZXRDb21wdXRlZFN0eWxlKHRoaXNbMF0sIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcHMpOyB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxW2ldLnN0eWxlW3Byb3BdID0gcHJvcHNbcHJvcF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcyQxW2ldLnN0eWxlW3Byb3BzXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgY29sbGVjdGlvbiBwYXNzaW5nIGVsZW1lbnRzIHRvIGBjYWxsYmFja2BcclxuICAgIGZ1bmN0aW9uIGVhY2goY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gRG9uJ3QgYm90aGVyIGNvbnRpbnVpbmcgd2l0aG91dCBhIGNhbGxiYWNrXHJcbiAgICAgICAgaWYgKCFjYWxsYmFjaykgeyByZXR1cm4gdGhpczsgfVxyXG4gICAgICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgY3VycmVudCBjb2xsZWN0aW9uXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBjYWxsYmFjayByZXR1cm5zIGZhbHNlXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjay5jYWxsKHRoaXMkMVtpXSwgaSwgdGhpcyQxW2ldKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCB0aGUgbG9vcCBlYXJseVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMkMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZXR1cm4gYHRoaXNgIHRvIGFsbG93IGNoYWluZWQgRE9NIG9wZXJhdGlvbnNcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgZnVuY3Rpb24gaHRtbChodG1sKSB7XHJcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgaHRtbCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLmlubmVySFRNTCA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICB0aGlzJDFbaV0uaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIGZ1bmN0aW9uIHRleHQodGV4dCkge1xyXG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRleHQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzWzBdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXS50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgdGhpcyQxW2ldLnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpcyhzZWxlY3Rvcikge1xyXG4gICAgICAgIHZhciBlbCA9IHRoaXNbMF07XHJcbiAgICAgICAgdmFyIGNvbXBhcmVXaXRoO1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGlmICghZWwgfHwgdHlwZW9mIHNlbGVjdG9yID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBpZiAoZWwubWF0Y2hlcykgeyByZXR1cm4gZWwubWF0Y2hlcyhzZWxlY3Rvcik7IH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSB7IHJldHVybiBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpOyB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGVsLm1zTWF0Y2hlc1NlbGVjdG9yKSB7IHJldHVybiBlbC5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7IH1cclxuXHJcbiAgICAgICAgICAgIGNvbXBhcmVXaXRoID0gJChzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb21wYXJlV2l0aC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSBlbCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yID09PSBkb2MpIHsgcmV0dXJuIGVsID09PSBkb2M7IH1cclxuICAgICAgICBlbHNlIGlmIChzZWxlY3RvciA9PT0gd2luKSB7IHJldHVybiBlbCA9PT0gd2luOyB9XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCBzZWxlY3RvciBpbnN0YW5jZW9mIERvbTcpIHtcclxuICAgICAgICAgICAgY29tcGFyZVdpdGggPSBzZWxlY3Rvci5ub2RlVHlwZSA/IFtzZWxlY3Rvcl0gOiBzZWxlY3RvcjtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbXBhcmVXaXRoLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZVdpdGhbaV0gPT09IGVsKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpbmRleCgpIHtcclxuICAgICAgICB2YXIgY2hpbGQgPSB0aGlzWzBdO1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICAgICAgIHdoaWxlICgoY2hpbGQgPSBjaGlsZC5wcmV2aW91c1NpYmxpbmcpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIHsgaSArPSAxOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIGZ1bmN0aW9uIGVxKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIHRoaXM7IH1cclxuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHJldHVybkluZGV4O1xyXG4gICAgICAgIGlmIChpbmRleCA+IGxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm5JbmRleCA9IGxlbmd0aCArIGluZGV4O1xyXG4gICAgICAgICAgICBpZiAocmV0dXJuSW5kZXggPCAwKSB7IHJldHVybiBuZXcgRG9tNyhbXSk7IH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KFt0aGlzW3JldHVybkluZGV4XV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IERvbTcoW3RoaXNbaW5kZXhdXSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBhcHBlbmQoKSB7XHJcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAobGVuLS0pIGFyZ3NbbGVuXSA9IGFyZ3VtZW50c1tsZW5dO1xyXG5cclxuICAgICAgICB2YXIgbmV3Q2hpbGQ7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYXJncy5sZW5ndGg7IGsgKz0gMSkge1xyXG4gICAgICAgICAgICBuZXdDaGlsZCA9IGFyZ3Nba107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdDaGlsZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcERpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IG5ld0NoaWxkO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wRGl2LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyQxW2ldLmFwcGVuZENoaWxkKHRlbXBEaXYuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5ld0NoaWxkLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMkMVtpXS5hcHBlbmRDaGlsZChuZXdDaGlsZFtqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzJDFbaV0uYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHByZXBlbmQobmV3Q2hpbGQpIHtcclxuICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgdmFyIGo7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdDaGlsZCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wRGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBuZXdDaGlsZDtcclxuICAgICAgICAgICAgICAgIGZvciAoaiA9IHRlbXBEaXYuY2hpbGROb2Rlcy5sZW5ndGggLSAxOyBqID49IDA7IGogLT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMkMVtpXS5pbnNlcnRCZWZvcmUodGVtcERpdi5jaGlsZE5vZGVzW2pdLCB0aGlzJDFbaV0uY2hpbGROb2Rlc1swXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3Q2hpbGQgaW5zdGFuY2VvZiBEb203KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbmV3Q2hpbGQubGVuZ3RoOyBqICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzJDFbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkW2pdLCB0aGlzJDFbaV0uY2hpbGROb2Rlc1swXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzJDFbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCB0aGlzJDFbaV0uY2hpbGROb2Rlc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBuZXh0KHNlbGVjdG9yKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdLm5leHRFbGVtZW50U2libGluZyAmJiAkKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbTcoW3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpIHsgcmV0dXJuIG5ldyBEb203KFt0aGlzWzBdLm5leHRFbGVtZW50U2libGluZ10pOyB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBuZXh0QWxsKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdmFyIG5leHRFbHMgPSBbXTtcclxuICAgICAgICB2YXIgZWwgPSB0aGlzWzBdO1xyXG4gICAgICAgIGlmICghZWwpIHsgcmV0dXJuIG5ldyBEb203KFtdKTsgfVxyXG4gICAgICAgIHdoaWxlIChlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcclxuICAgICAgICAgICAgdmFyIG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChuZXh0KS5pcyhzZWxlY3RvcikpIHsgbmV4dEVscy5wdXNoKG5leHQpOyB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IG5leHRFbHMucHVzaChuZXh0KTsgfVxyXG4gICAgICAgICAgICBlbCA9IG5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRG9tNyhuZXh0RWxzKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHByZXYoc2VsZWN0b3IpIHtcclxuICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBlbCA9IHRoaXNbMF07XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgJChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbTcoW2VsLnByZXZpb3VzRWxlbWVudFNpYmxpbmddKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7IHJldHVybiBuZXcgRG9tNyhbZWwucHJldmlvdXNFbGVtZW50U2libGluZ10pOyB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwcmV2QWxsKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdmFyIHByZXZFbHMgPSBbXTtcclxuICAgICAgICB2YXIgZWwgPSB0aGlzWzBdO1xyXG4gICAgICAgIGlmICghZWwpIHsgcmV0dXJuIG5ldyBEb203KFtdKTsgfVxyXG4gICAgICAgIHdoaWxlIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHByZXYpLmlzKHNlbGVjdG9yKSkgeyBwcmV2RWxzLnB1c2gocHJldik7IH1cclxuICAgICAgICAgICAgfSBlbHNlIHsgcHJldkVscy5wdXNoKHByZXYpOyB9XHJcbiAgICAgICAgICAgIGVsID0gcHJldjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEb203KHByZXZFbHMpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyZW50KHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBwYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMkMVtpXS5wYXJlbnROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzJDFbaV0ucGFyZW50Tm9kZSkuaXMoc2VsZWN0b3IpKSB7IHBhcmVudHMucHVzaCh0aGlzJDFbaV0ucGFyZW50Tm9kZSk7IH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKHRoaXMkMVtpXS5wYXJlbnROb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJCh1bmlxdWUocGFyZW50cykpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyZW50cyhzZWxlY3Rvcikge1xyXG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgcGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzJDFbaV0ucGFyZW50Tm9kZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgICAgICB3aGlsZSAocGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJChwYXJlbnQpLmlzKHNlbGVjdG9yKSkgeyBwYXJlbnRzLnB1c2gocGFyZW50KTsgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkKHVuaXF1ZShwYXJlbnRzKSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdmFyIGNsb3Nlc3QgPSB0aGlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjbG9zZXN0LmlzKHNlbGVjdG9yKSkge1xyXG4gICAgICAgICAgICBjbG9zZXN0ID0gY2xvc2VzdC5wYXJlbnRzKHNlbGVjdG9yKS5lcSgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNsb3Nlc3Q7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBmb3VuZEVsZW1lbnRzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBmb3VuZCA9IHRoaXMkMVtpXS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBmb3VuZC5sZW5ndGg7IGogKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgZm91bmRFbGVtZW50cy5wdXNoKGZvdW5kW2pdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IERvbTcoZm91bmRFbGVtZW50cyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjaGlsZHJlbihzZWxlY3Rvcikge1xyXG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGROb2RlcyA9IHRoaXMkMVtpXS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaGlsZE5vZGVzLmxlbmd0aDsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZXNbal0ubm9kZVR5cGUgPT09IDEpIHsgY2hpbGRyZW4ucHVzaChjaGlsZE5vZGVzW2pdKTsgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGlsZE5vZGVzW2pdLm5vZGVUeXBlID09PSAxICYmICQoY2hpbGROb2Rlc1tqXSkuaXMoc2VsZWN0b3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZE5vZGVzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IERvbTcodW5pcXVlKGNoaWxkcmVuKSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZW1vdmUoKSB7XHJcbiAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcyQxW2ldLnBhcmVudE5vZGUpIHsgdGhpcyQxW2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyQxW2ldKTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGFkZCgpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChsZW4tLSkgYXJnc1tsZW5dID0gYXJndW1lbnRzW2xlbl07XHJcblxyXG4gICAgICAgIHZhciBkb20gPSB0aGlzO1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIHZhciBqO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciB0b0FkZCA9ICQoYXJnc1tpXSk7XHJcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCB0b0FkZC5sZW5ndGg7IGogKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgZG9tW2RvbS5sZW5ndGhdID0gdG9BZGRbal07XHJcbiAgICAgICAgICAgICAgICBkb20ubGVuZ3RoICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRvbTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgTWV0aG9kcyA9IHtcclxuICAgICAgICBhZGRDbGFzczogYWRkQ2xhc3MsXHJcbiAgICAgICAgcmVtb3ZlQ2xhc3M6IHJlbW92ZUNsYXNzLFxyXG4gICAgICAgIGhhc0NsYXNzOiBoYXNDbGFzcyxcclxuICAgICAgICB0b2dnbGVDbGFzczogdG9nZ2xlQ2xhc3MsXHJcbiAgICAgICAgYXR0cjogYXR0cixcclxuICAgICAgICByZW1vdmVBdHRyOiByZW1vdmVBdHRyLFxyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXHJcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcclxuICAgICAgICBvbjogb24sXHJcbiAgICAgICAgb2ZmOiBvZmYsXHJcbiAgICAgICAgdHJpZ2dlcjogdHJpZ2dlcixcclxuICAgICAgICB0cmFuc2l0aW9uRW5kOiB0cmFuc2l0aW9uRW5kLFxyXG4gICAgICAgIG91dGVyV2lkdGg6IG91dGVyV2lkdGgsXHJcbiAgICAgICAgb3V0ZXJIZWlnaHQ6IG91dGVySGVpZ2h0LFxyXG4gICAgICAgIG9mZnNldDogb2Zmc2V0LFxyXG4gICAgICAgIGNzczogY3NzLFxyXG4gICAgICAgIGVhY2g6IGVhY2gsXHJcbiAgICAgICAgaHRtbDogaHRtbCxcclxuICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgIGlzOiBpcyxcclxuICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgZXE6IGVxLFxyXG4gICAgICAgIGFwcGVuZDogYXBwZW5kLFxyXG4gICAgICAgIHByZXBlbmQ6IHByZXBlbmQsXHJcbiAgICAgICAgbmV4dDogbmV4dCxcclxuICAgICAgICBuZXh0QWxsOiBuZXh0QWxsLFxyXG4gICAgICAgIHByZXY6IHByZXYsXHJcbiAgICAgICAgcHJldkFsbDogcHJldkFsbCxcclxuICAgICAgICBwYXJlbnQ6IHBhcmVudCxcclxuICAgICAgICBwYXJlbnRzOiBwYXJlbnRzLFxyXG4gICAgICAgIGNsb3Nlc3Q6IGNsb3Nlc3QsXHJcbiAgICAgICAgZmluZDogZmluZCxcclxuICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXHJcbiAgICAgICAgcmVtb3ZlOiByZW1vdmUsXHJcbiAgICAgICAgYWRkOiBhZGQsXHJcbiAgICAgICAgc3R5bGVzOiBzdHlsZXMsXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKE1ldGhvZHMpLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICAkLmZuW21ldGhvZE5hbWVdID0gTWV0aG9kc1ttZXRob2ROYW1lXTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBVdGlscyA9IHtcclxuICAgICAgICBkZWxldGVQcm9wczogZnVuY3Rpb24gZGVsZXRlUHJvcHMob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSBvYmo7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFtrZXldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBubyBnZXR0ZXIgZm9yIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqZWN0W2tleV07XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc29tZXRoaW5nIGdvdCB3cm9uZ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG5leHRUaWNrOiBmdW5jdGlvbiBuZXh0VGljayhjYWxsYmFjaywgZGVsYXkpIHtcclxuICAgICAgICAgICAgaWYgKGRlbGF5ID09PSB2b2lkIDApIGRlbGF5ID0gMDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBub3c6IGZ1bmN0aW9uIG5vdygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGUubm93KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZShlbCwgYXhpcykge1xyXG4gICAgICAgICAgICBpZiAoYXhpcyA9PT0gdm9pZCAwKSBheGlzID0gJ3gnO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hdHJpeDtcclxuICAgICAgICAgICAgdmFyIGN1clRyYW5zZm9ybTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybU1hdHJpeDtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJTdHlsZSA9IHdpbi5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW4uV2ViS2l0Q1NTTWF0cml4KSB7XHJcbiAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUud2Via2l0VHJhbnNmb3JtO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1clRyYW5zZm9ybS5zcGxpdCgnLCcpLmxlbmd0aCA+IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSBjdXJUcmFuc2Zvcm0uc3BsaXQoJywgJykubWFwKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLnJlcGxhY2UoJywnLCAnLicpOyB9KS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gU29tZSBvbGQgdmVyc2lvbnMgb2YgV2Via2l0IGNob2tlIHdoZW4gJ25vbmUnIGlzIHBhc3NlZDsgcGFzc1xyXG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgc3RyaW5nIGluc3RlYWQgaW4gdGhpcyBjYXNlXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1NYXRyaXggPSBuZXcgd2luLldlYktpdENTU01hdHJpeChjdXJUcmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogY3VyVHJhbnNmb3JtKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU1hdHJpeCA9IGN1clN0eWxlLk1velRyYW5zZm9ybSB8fCBjdXJTdHlsZS5PVHJhbnNmb3JtIHx8IGN1clN0eWxlLk1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLm1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2Zvcm0nKS5yZXBsYWNlKCd0cmFuc2xhdGUoJywgJ21hdHJpeCgxLCAwLCAwLCAxLCcpO1xyXG4gICAgICAgICAgICAgICAgbWF0cml4ID0gdHJhbnNmb3JtTWF0cml4LnRvU3RyaW5nKCkuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGF4aXMgPT09ICd4Jykge1xyXG4gICAgICAgICAgICAgICAgLy8gTGF0ZXN0IENocm9tZSBhbmQgd2Via2l0cyBGaXhcclxuICAgICAgICAgICAgICAgIGlmICh3aW4uV2ViS2l0Q1NTTWF0cml4KSB7IGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDE7IH1cclxuICAgICAgICAgICAgICAgIC8vIENyYXp5IElFMTAgTWF0cml4XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgeyBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxMl0pOyB9XHJcbiAgICAgICAgICAgICAgICAvLyBOb3JtYWwgQnJvd3NlcnNcclxuICAgICAgICAgICAgICAgIGVsc2UgeyBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs0XSk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3knKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMYXRlc3QgQ2hyb21lIGFuZCB3ZWJraXRzIEZpeFxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbi5XZWJLaXRDU1NNYXRyaXgpIHsgY3VyVHJhbnNmb3JtID0gdHJhbnNmb3JtTWF0cml4Lm00MjsgfVxyXG4gICAgICAgICAgICAgICAgLy8gQ3JhenkgSUUxMCBNYXRyaXhcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KSB7IGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzEzXSk7IH1cclxuICAgICAgICAgICAgICAgIC8vIE5vcm1hbCBCcm93c2Vyc1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7IGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzVdKTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJUcmFuc2Zvcm0gfHwgMDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcnNlVXJsUXVlcnk6IGZ1bmN0aW9uIHBhcnNlVXJsUXVlcnkodXJsKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWVyeSA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgdXJsVG9QYXJzZSA9IHVybCB8fCB3aW4ubG9jYXRpb24uaHJlZjtcclxuICAgICAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXM7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbTtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1cmxUb1BhcnNlID09PSAnc3RyaW5nJyAmJiB1cmxUb1BhcnNlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdXJsVG9QYXJzZSA9IHVybFRvUGFyc2UuaW5kZXhPZignPycpID4gLTEgPyB1cmxUb1BhcnNlLnJlcGxhY2UoL1xcUypcXD8vLCAnJykgOiAnJztcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHVybFRvUGFyc2Uuc3BsaXQoJyYnKS5maWx0ZXIoZnVuY3Rpb24gKHBhcmFtc1BhcnQpIHsgcmV0dXJuIHBhcmFtc1BhcnQgIT09ICcnOyB9KTtcclxuICAgICAgICAgICAgICAgIGxlbmd0aCA9IHBhcmFtcy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0gPSBwYXJhbXNbaV0ucmVwbGFjZSgvI1xcUysvZywgJycpLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtWzBdKV0gPSB0eXBlb2YgcGFyYW1bMV0gPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtWzFdKSB8fCAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc09iamVjdDogZnVuY3Rpb24gaXNPYmplY3Qobykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIG8gIT09IG51bGwgJiYgby5jb25zdHJ1Y3RvciAmJiBvLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBleHRlbmQ6IGZ1bmN0aW9uIGV4dGVuZCgpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuJDEgPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZSAobGVuJDEtLSkgYXJnc1tsZW4kMV0gPSBhcmd1bWVudHNbbGVuJDFdO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvID0gT2JqZWN0KGFyZ3NbMF0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXh0U291cmNlID0gYXJnc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0U291cmNlICE9PSB1bmRlZmluZWQgJiYgbmV4dFNvdXJjZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4ICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzT2JqZWN0KHRvW25leHRLZXldKSAmJiBVdGlscy5pc09iamVjdChuZXh0U291cmNlW25leHRLZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmV4dGVuZCh0b1tuZXh0S2V5XSwgbmV4dFNvdXJjZVtuZXh0S2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFVdGlscy5pc09iamVjdCh0b1tuZXh0S2V5XSkgJiYgVXRpbHMuaXNPYmplY3QobmV4dFNvdXJjZVtuZXh0S2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLmV4dGVuZCh0b1tuZXh0S2V5XSwgbmV4dFNvdXJjZVtuZXh0S2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdG87XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIFN1cHBvcnQgPSAoZnVuY3Rpb24gU3VwcG9ydCgpIHtcclxuICAgICAgICB2YXIgdGVzdERpdiA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3VjaDogKHdpbi5Nb2Rlcm5penIgJiYgd2luLk1vZGVybml6ci50b3VjaCA9PT0gdHJ1ZSkgfHwgKGZ1bmN0aW9uIGNoZWNrVG91Y2goKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbikgfHwgKHdpbi5Eb2N1bWVudFRvdWNoICYmIGRvYyBpbnN0YW5jZW9mIHdpbi5Eb2N1bWVudFRvdWNoKSk7XHJcbiAgICAgICAgICAgIH0oKSksXHJcblxyXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAhISh3aW4ubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkIHx8IHdpbi5Qb2ludGVyRXZlbnQpLFxyXG4gICAgICAgICAgICBwcmVmaXhlZFBvaW50ZXJFdmVudHM6ICEhd2luLm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkLFxyXG5cclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogKGZ1bmN0aW9uIGNoZWNrVHJhbnNpdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IHRlc3REaXYuc3R5bGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCd0cmFuc2l0aW9uJyBpbiBzdHlsZSB8fCAnd2Via2l0VHJhbnNpdGlvbicgaW4gc3R5bGUgfHwgJ01velRyYW5zaXRpb24nIGluIHN0eWxlKTtcclxuICAgICAgICAgICAgfSgpKSxcclxuICAgICAgICAgICAgdHJhbnNmb3JtczNkOiAod2luLk1vZGVybml6ciAmJiB3aW4uTW9kZXJuaXpyLmNzc3RyYW5zZm9ybXMzZCA9PT0gdHJ1ZSkgfHwgKGZ1bmN0aW9uIGNoZWNrVHJhbnNmb3JtczNkKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlID0gdGVzdERpdi5zdHlsZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoJ3dlYmtpdFBlcnNwZWN0aXZlJyBpbiBzdHlsZSB8fCAnTW96UGVyc3BlY3RpdmUnIGluIHN0eWxlIHx8ICdPUGVyc3BlY3RpdmUnIGluIHN0eWxlIHx8ICdNc1BlcnNwZWN0aXZlJyBpbiBzdHlsZSB8fCAncGVyc3BlY3RpdmUnIGluIHN0eWxlKTtcclxuICAgICAgICAgICAgfSgpKSxcclxuXHJcbiAgICAgICAgICAgIGZsZXhib3g6IChmdW5jdGlvbiBjaGVja0ZsZXhib3goKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGUgPSB0ZXN0RGl2LnN0eWxlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlcyA9ICgnYWxpZ25JdGVtcyB3ZWJraXRBbGlnbkl0ZW1zIHdlYmtpdEJveEFsaWduIG1zRmxleEFsaWduIG1vekJveEFsaWduIHdlYmtpdEZsZXhEaXJlY3Rpb24gbXNGbGV4RGlyZWN0aW9uIG1vekJveERpcmVjdGlvbiBtb3pCb3hPcmllbnQgd2Via2l0Qm94RGlyZWN0aW9uIHdlYmtpdEJveE9yaWVudCcpLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZXNbaV0gaW4gc3R5bGUpIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSgpKSxcclxuXHJcbiAgICAgICAgICAgIG9ic2VydmVyOiAoZnVuY3Rpb24gY2hlY2tPYnNlcnZlcigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbiB8fCAnV2Via2l0TXV0YXRpb25PYnNlcnZlcicgaW4gd2luKTtcclxuICAgICAgICAgICAgfSgpKSxcclxuXHJcbiAgICAgICAgICAgIHBhc3NpdmVMaXN0ZW5lcjogKGZ1bmN0aW9uIGNoZWNrUGFzc2l2ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlTGlzdGVuZXInLCBudWxsLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBObyBzdXBwb3J0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlO1xyXG4gICAgICAgICAgICB9KCkpLFxyXG5cclxuICAgICAgICAgICAgZ2VzdHVyZXM6IChmdW5jdGlvbiBjaGVja0dlc3R1cmVzKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdvbmdlc3R1cmVzdGFydCcgaW4gd2luO1xyXG4gICAgICAgICAgICB9KCkpLFxyXG4gICAgICAgIH07XHJcbiAgICB9KCkpO1xyXG5cclxuICAgIHZhciBTd2lwZXJDbGFzcyA9IGZ1bmN0aW9uIFN3aXBlckNsYXNzKHBhcmFtcykge1xyXG4gICAgICAgIGlmIChwYXJhbXMgPT09IHZvaWQgMCkgcGFyYW1zID0ge307XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnBhcmFtcyA9IHBhcmFtcztcclxuXHJcbiAgICAgICAgLy8gRXZlbnRzXHJcbiAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnMgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYucGFyYW1zICYmIHNlbGYucGFyYW1zLm9uKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHNlbGYucGFyYW1zLm9uKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub24oZXZlbnROYW1lLCBzZWxmLnBhcmFtcy5vbltldmVudE5hbWVdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc3RhdGljQWNjZXNzb3JzID0geyBjb21wb25lbnRzOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH07XHJcbiAgICBTd2lwZXJDbGFzcy5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudHMsIGhhbmRsZXIsIHByaW9yaXR5KSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gc2VsZjsgfVxyXG4gICAgICAgIHZhciBtZXRob2QgPSBwcmlvcml0eSA/ICd1bnNoaWZ0JyA6ICdwdXNoJztcclxuICAgICAgICBldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSkgeyBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0gPSBbXTsgfVxyXG4gICAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF1bbWV0aG9kXShoYW5kbGVyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcbiAgICBTd2lwZXJDbGFzcy5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnRzLCBoYW5kbGVyLCBwcmlvcml0eSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIHNlbGY7IH1cclxuICAgICAgICBmdW5jdGlvbiBvbmNlSGFuZGxlcigpIHtcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgd2hpbGUgKGxlbi0tKSBhcmdzW2xlbl0gPSBhcmd1bWVudHNbbGVuXTtcclxuXHJcbiAgICAgICAgICAgIGhhbmRsZXIuYXBwbHkoc2VsZiwgYXJncyk7XHJcbiAgICAgICAgICAgIHNlbGYub2ZmKGV2ZW50cywgb25jZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZi5vbihldmVudHMsIG9uY2VIYW5kbGVyLCBwcmlvcml0eSk7XHJcbiAgICB9O1xyXG4gICAgU3dpcGVyQ2xhc3MucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9mZihldmVudHMsIGhhbmRsZXIpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgeyByZXR1cm4gc2VsZjsgfVxyXG4gICAgICAgIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50SGFuZGxlciwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyID09PSBoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG4gICAgU3dpcGVyQ2xhc3MucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKGxlbi0tKSBhcmdzW2xlbl0gPSBhcmd1bWVudHNbbGVuXTtcclxuXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMpIHsgcmV0dXJuIHNlbGY7IH1cclxuICAgICAgICB2YXIgZXZlbnRzO1xyXG4gICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgIHZhciBjb250ZXh0O1xyXG4gICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xyXG4gICAgICAgICAgICBldmVudHMgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICBkYXRhID0gYXJncy5zbGljZSgxLCBhcmdzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSBzZWxmO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50cyA9IGFyZ3NbMF0uZXZlbnRzO1xyXG4gICAgICAgICAgICBkYXRhID0gYXJnc1swXS5kYXRhO1xyXG4gICAgICAgICAgICBjb250ZXh0ID0gYXJnc1swXS5jb250ZXh0IHx8IHNlbGY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBldmVudHNBcnJheSA9IEFycmF5LmlzQXJyYXkoZXZlbnRzKSA/IGV2ZW50cyA6IGV2ZW50cy5zcGxpdCgnICcpO1xyXG4gICAgICAgIGV2ZW50c0FycmF5LmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmV2ZW50c0xpc3RlbmVycyAmJiBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50SGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXJzLnB1c2goZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyLmFwcGx5KGNvbnRleHQsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcbiAgICBTd2lwZXJDbGFzcy5wcm90b3R5cGUudXNlTW9kdWxlc1BhcmFtcyA9IGZ1bmN0aW9uIHVzZU1vZHVsZXNQYXJhbXMoaW5zdGFuY2VQYXJhbXMpIHtcclxuICAgICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIGlmICghaW5zdGFuY2UubW9kdWxlcykgeyByZXR1cm47IH1cclxuICAgICAgICBPYmplY3Qua2V5cyhpbnN0YW5jZS5tb2R1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVOYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2R1bGUgPSBpbnN0YW5jZS5tb2R1bGVzW21vZHVsZU5hbWVdO1xyXG4gICAgICAgICAgICAvLyBFeHRlbmQgcGFyYW1zXHJcbiAgICAgICAgICAgIGlmIChtb2R1bGUucGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5leHRlbmQoaW5zdGFuY2VQYXJhbXMsIG1vZHVsZS5wYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgU3dpcGVyQ2xhc3MucHJvdG90eXBlLnVzZU1vZHVsZXMgPSBmdW5jdGlvbiB1c2VNb2R1bGVzKG1vZHVsZXNQYXJhbXMpIHtcclxuICAgICAgICBpZiAobW9kdWxlc1BhcmFtcyA9PT0gdm9pZCAwKSBtb2R1bGVzUGFyYW1zID0ge307XHJcblxyXG4gICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFpbnN0YW5jZS5tb2R1bGVzKSB7IHJldHVybjsgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKGluc3RhbmNlLm1vZHVsZXMpLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZU5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIG1vZHVsZSA9IGluc3RhbmNlLm1vZHVsZXNbbW9kdWxlTmFtZV07XHJcbiAgICAgICAgICAgIHZhciBtb2R1bGVQYXJhbXMgPSBtb2R1bGVzUGFyYW1zW21vZHVsZU5hbWVdIHx8IHt9O1xyXG4gICAgICAgICAgICAvLyBFeHRlbmQgaW5zdGFuY2UgbWV0aG9kcyBhbmQgcHJvcHNcclxuICAgICAgICAgICAgaWYgKG1vZHVsZS5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMobW9kdWxlLmluc3RhbmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVQcm9wTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb2R1bGVQcm9wID0gbW9kdWxlLmluc3RhbmNlW21vZHVsZVByb3BOYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1vZHVsZVByb3AgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VbbW9kdWxlUHJvcE5hbWVdID0gbW9kdWxlUHJvcC5iaW5kKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZVttb2R1bGVQcm9wTmFtZV0gPSBtb2R1bGVQcm9wO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICAgICAgaWYgKG1vZHVsZS5vbiAmJiBpbnN0YW5jZS5vbikge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMobW9kdWxlLm9uKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVFdmVudE5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5vbihtb2R1bGVFdmVudE5hbWUsIG1vZHVsZS5vblttb2R1bGVFdmVudE5hbWVdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBNb2R1bGUgY3JlYXRlIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIGlmIChtb2R1bGUuY3JlYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBtb2R1bGUuY3JlYXRlLmJpbmQoaW5zdGFuY2UpKG1vZHVsZVBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBzdGF0aWNBY2Nlc3NvcnMuY29tcG9uZW50cy5zZXQgPSBmdW5jdGlvbiAoY29tcG9uZW50cykge1xyXG4gICAgICAgIHZhciBDbGFzcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFDbGFzcy51c2UpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgQ2xhc3MudXNlKGNvbXBvbmVudHMpO1xyXG4gICAgfTtcclxuICAgIFN3aXBlckNsYXNzLmluc3RhbGxNb2R1bGUgPSBmdW5jdGlvbiBpbnN0YWxsTW9kdWxlKG1vZHVsZSkge1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgd2hpbGUgKGxlbi0tID4gMCkgcGFyYW1zW2xlbl0gPSBhcmd1bWVudHNbbGVuICsgMV07XHJcblxyXG4gICAgICAgIHZhciBDbGFzcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFDbGFzcy5wcm90b3R5cGUubW9kdWxlcykgeyBDbGFzcy5wcm90b3R5cGUubW9kdWxlcyA9IHt9OyB9XHJcbiAgICAgICAgdmFyIG5hbWUgPSBtb2R1bGUubmFtZSB8fCAoKChPYmplY3Qua2V5cyhDbGFzcy5wcm90b3R5cGUubW9kdWxlcykubGVuZ3RoKSArIFwiX1wiICsgKFV0aWxzLm5vdygpKSkpO1xyXG4gICAgICAgIENsYXNzLnByb3RvdHlwZS5tb2R1bGVzW25hbWVdID0gbW9kdWxlO1xyXG4gICAgICAgIC8vIFByb3RvdHlwZVxyXG4gICAgICAgIGlmIChtb2R1bGUucHJvdG8pIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobW9kdWxlLnByb3RvKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIENsYXNzLnByb3RvdHlwZVtrZXldID0gbW9kdWxlLnByb3RvW2tleV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDbGFzc1xyXG4gICAgICAgIGlmIChtb2R1bGUuc3RhdGljKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKG1vZHVsZS5zdGF0aWMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICAgICAgQ2xhc3Nba2V5XSA9IG1vZHVsZS5zdGF0aWNba2V5XTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENhbGxiYWNrXHJcbiAgICAgICAgaWYgKG1vZHVsZS5pbnN0YWxsKSB7XHJcbiAgICAgICAgICAgIG1vZHVsZS5pbnN0YWxsLmFwcGx5KENsYXNzLCBwYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQ2xhc3M7XHJcbiAgICB9O1xyXG4gICAgU3dpcGVyQ2xhc3MudXNlID0gZnVuY3Rpb24gdXNlKG1vZHVsZSkge1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgd2hpbGUgKGxlbi0tID4gMCkgcGFyYW1zW2xlbl0gPSBhcmd1bWVudHNbbGVuICsgMV07XHJcblxyXG4gICAgICAgIHZhciBDbGFzcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobW9kdWxlKSkge1xyXG4gICAgICAgICAgICBtb2R1bGUuZm9yRWFjaChmdW5jdGlvbiAobSkgeyByZXR1cm4gQ2xhc3MuaW5zdGFsbE1vZHVsZShtKTsgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBDbGFzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENsYXNzLmluc3RhbGxNb2R1bGUuYXBwbHkoQ2xhc3MsIFttb2R1bGVdLmNvbmNhdChwYXJhbXMpKTtcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoU3dpcGVyQ2xhc3MsIHN0YXRpY0FjY2Vzc29ycyk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZSgpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgd2lkdGg7XHJcbiAgICAgICAgdmFyIGhlaWdodDtcclxuICAgICAgICB2YXIgJGVsID0gc3dpcGVyLiRlbDtcclxuICAgICAgICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMud2lkdGggIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHdpZHRoID0gc3dpcGVyLnBhcmFtcy53aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aWR0aCA9ICRlbFswXS5jbGllbnRXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zLmhlaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gc3dpcGVyLnBhcmFtcy5oZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gJGVsWzBdLmNsaWVudEhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCh3aWR0aCA9PT0gMCAmJiBzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHx8IChoZWlnaHQgPT09IDAgJiYgc3dpcGVyLmlzVmVydGljYWwoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3VidHJhY3QgcGFkZGluZ3NcclxuICAgICAgICB3aWR0aCA9IHdpZHRoIC0gcGFyc2VJbnQoJGVsLmNzcygncGFkZGluZy1sZWZ0JyksIDEwKSAtIHBhcnNlSW50KCRlbC5jc3MoJ3BhZGRpbmctcmlnaHQnKSwgMTApO1xyXG4gICAgICAgIGhlaWdodCA9IGhlaWdodCAtIHBhcnNlSW50KCRlbC5jc3MoJ3BhZGRpbmctdG9wJyksIDEwKSAtIHBhcnNlSW50KCRlbC5jc3MoJ3BhZGRpbmctYm90dG9tJyksIDEwKTtcclxuXHJcbiAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgICAgICBzaXplOiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB3aWR0aCA6IGhlaWdodCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTbGlkZXMoKSB7XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcblxyXG4gICAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XHJcbiAgICAgICAgdmFyIHN3aXBlclNpemUgPSBzd2lwZXIuc2l6ZTtcclxuICAgICAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcclxuICAgICAgICB2YXIgd3JvbmdSVEwgPSBzd2lwZXIud3JvbmdSVEw7XHJcbiAgICAgICAgdmFyIGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XHJcbiAgICAgICAgdmFyIHByZXZpb3VzU2xpZGVzTGVuZ3RoID0gaXNWaXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBzbGlkZXMgPSAkd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3MpKSk7XHJcbiAgICAgICAgdmFyIHNsaWRlc0xlbmd0aCA9IGlzVmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzbGlkZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBzbmFwR3JpZCA9IFtdO1xyXG4gICAgICAgIHZhciBzbGlkZXNHcmlkID0gW107XHJcbiAgICAgICAgdmFyIHNsaWRlc1NpemVzR3JpZCA9IFtdO1xyXG5cclxuICAgICAgICB2YXIgb2Zmc2V0QmVmb3JlID0gcGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZTtcclxuICAgICAgICBpZiAodHlwZW9mIG9mZnNldEJlZm9yZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBvZmZzZXRCZWZvcmUgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlLmNhbGwoc3dpcGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlcjtcclxuICAgICAgICBpZiAodHlwZW9mIG9mZnNldEFmdGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIG9mZnNldEFmdGVyID0gcGFyYW1zLnNsaWRlc09mZnNldEFmdGVyLmNhbGwoc3dpcGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwcmV2aW91c1NuYXBHcmlkTGVuZ3RoID0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcclxuICAgICAgICB2YXIgcHJldmlvdXNTbGlkZXNHcmlkTGVuZ3RoID0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcclxuXHJcbiAgICAgICAgdmFyIHNwYWNlQmV0d2VlbiA9IHBhcmFtcy5zcGFjZUJldHdlZW47XHJcbiAgICAgICAgdmFyIHNsaWRlUG9zaXRpb24gPSAtb2Zmc2V0QmVmb3JlO1xyXG4gICAgICAgIHZhciBwcmV2U2xpZGVTaXplID0gMDtcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3dpcGVyU2l6ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gJ3N0cmluZycgJiYgc3BhY2VCZXR3ZWVuLmluZGV4T2YoJyUnKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbiA9IChwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbi5yZXBsYWNlKCclJywgJycpKSAvIDEwMCkgKiBzd2lwZXJTaXplO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpcGVyLnZpcnR1YWxTaXplID0gLXNwYWNlQmV0d2VlbjtcclxuXHJcbiAgICAgICAgLy8gcmVzZXQgbWFyZ2luc1xyXG4gICAgICAgIGlmIChydGwpIHsgc2xpZGVzLmNzcyh7IG1hcmdpbkxlZnQ6ICcnLCBtYXJnaW5Ub3A6ICcnIH0pOyB9XHJcbiAgICAgICAgZWxzZSB7IHNsaWRlcy5jc3MoeyBtYXJnaW5SaWdodDogJycsIG1hcmdpbkJvdHRvbTogJycgfSk7IH1cclxuXHJcbiAgICAgICAgdmFyIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3M7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHNsaWRlc0xlbmd0aCAvIHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4pID09PSBzbGlkZXNMZW5ndGggLyBzd2lwZXIucGFyYW1zLnNsaWRlc1BlckNvbHVtbikge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzTnVtYmVyRXZlblRvUm93cyA9IHNsaWRlc0xlbmd0aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgPSBNYXRoLmNlaWwoc2xpZGVzTGVuZ3RoIC8gcGFyYW1zLnNsaWRlc1BlckNvbHVtbikgKiBwYXJhbXMuc2xpZGVzUGVyQ29sdW1uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gJ2F1dG8nICYmIHBhcmFtcy5zbGlkZXNQZXJDb2x1bW5GaWxsID09PSAncm93Jykge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzTnVtYmVyRXZlblRvUm93cyA9IE1hdGgubWF4KHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MsIHBhcmFtcy5zbGlkZXNQZXJWaWV3ICogcGFyYW1zLnNsaWRlc1BlckNvbHVtbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENhbGMgc2xpZGVzXHJcbiAgICAgICAgdmFyIHNsaWRlU2l6ZTtcclxuICAgICAgICB2YXIgc2xpZGVzUGVyQ29sdW1uID0gcGFyYW1zLnNsaWRlc1BlckNvbHVtbjtcclxuICAgICAgICB2YXIgc2xpZGVzUGVyUm93ID0gc2xpZGVzTnVtYmVyRXZlblRvUm93cyAvIHNsaWRlc1BlckNvbHVtbjtcclxuICAgICAgICB2YXIgbnVtRnVsbENvbHVtbnMgPSBzbGlkZXNQZXJSb3cgLSAoKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gKiBzbGlkZXNQZXJSb3cpIC0gc2xpZGVzTGVuZ3RoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlc0xlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHNsaWRlU2l6ZSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZSA9IHNsaWRlcy5lcShpKTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgc2xpZGVzIG9yZGVyXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3U2xpZGVPcmRlckluZGV4ID0gKHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sdW1uID0gKHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gKHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnNsaWRlc1BlckNvbHVtbkZpbGwgPT09ICdjb2x1bW4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihpIC8gc2xpZGVzUGVyQ29sdW1uKTtcclxuICAgICAgICAgICAgICAgICAgICByb3cgPSBpIC0gKGNvbHVtbiAqIHNsaWRlc1BlckNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbiA+IG51bUZ1bGxDb2x1bW5zIHx8IChjb2x1bW4gPT09IG51bUZ1bGxDb2x1bW5zICYmIHJvdyA9PT0gc2xpZGVzUGVyQ29sdW1uIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPj0gc2xpZGVzUGVyQ29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2xpZGVPcmRlckluZGV4ID0gY29sdW1uICsgKChyb3cgKiBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzKSAvIHNsaWRlc1BlckNvbHVtbik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLXdlYmtpdC1ib3gtb3JkaW5hbC1ncm91cCc6IG5ld1NsaWRlT3JkZXJJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICctbW96LWJveC1vcmRpbmFsLWdyb3VwJzogbmV3U2xpZGVPcmRlckluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy1tcy1mbGV4LW9yZGVyJzogbmV3U2xpZGVPcmRlckluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtb3JkZXInOiBuZXdTbGlkZU9yZGVySW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlcjogbmV3U2xpZGVPcmRlckluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcihpIC8gc2xpZGVzUGVyUm93KTtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW4gPSBpIC0gKHJvdyAqIHNsaWRlc1BlclJvdyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzbGlkZVxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3MoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcIm1hcmdpbi1cIiArIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAndG9wJyA6ICdsZWZ0JykpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAocm93ICE9PSAwICYmIHBhcmFtcy5zcGFjZUJldHdlZW4pICYmICgoKHBhcmFtcy5zcGFjZUJldHdlZW4pICsgXCJweFwiKSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc3dpcGVyLWNvbHVtbicsIGNvbHVtbilcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zd2lwZXItcm93Jywgcm93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2xpZGUuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykgeyBjb250aW51ZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlU3R5bGVzID0gd2luLmdldENvbXB1dGVkU3R5bGUoc2xpZGVbMF0sIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUcmFuc2Zvcm0gPSBzbGlkZVswXS5zdHlsZS50cmFuc2Zvcm07XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFdlYktpdFRyYW5zZm9ybSA9IHNsaWRlWzBdLnN0eWxlLndlYmtpdFRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVbMF0uc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZVswXS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVTaXplID0gc2xpZGVbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1sZWZ0JykpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdChzbGlkZVN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tcmlnaHQnKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlU2l6ZSA9IHNsaWRlWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoc2xpZGVTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXRvcCcpKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoc2xpZGVTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWJvdHRvbScpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVbMF0uc3R5bGUudHJhbnNmb3JtID0gY3VycmVudFRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50V2ViS2l0VHJhbnNmb3JtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gY3VycmVudFdlYktpdFRyYW5zZm9ybTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7IHNsaWRlU2l6ZSA9IE1hdGguZmxvb3Ioc2xpZGVTaXplKTsgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVTaXplID0gKHN3aXBlclNpemUgLSAoKHBhcmFtcy5zbGlkZXNQZXJWaWV3IC0gMSkgKiBzcGFjZUJldHdlZW4pKSAvIHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHsgc2xpZGVTaXplID0gTWF0aC5mbG9vcihzbGlkZVNpemUpOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gc2xpZGVTaXplICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1tpXS5zdHlsZS5oZWlnaHQgPSBzbGlkZVNpemUgKyBcInB4XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzbGlkZXNbaV0pIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemUgPSBzbGlkZVNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2xpZGVzU2l6ZXNHcmlkLnB1c2goc2xpZGVTaXplKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIChzbGlkZVNpemUgLyAyKSArIChwcmV2U2xpZGVTaXplIC8gMikgKyBzcGFjZUJldHdlZW47XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldlNsaWRlU2l6ZSA9PT0gMCAmJiBpICE9PSAwKSB7IHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gKHN3aXBlclNpemUgLyAyKSAtIHNwYWNlQmV0d2VlbjsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHsgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSAoc3dpcGVyU2l6ZSAvIDIpIC0gc3BhY2VCZXR3ZWVuOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoc2xpZGVQb3NpdGlvbikgPCAxIC8gMTAwMCkgeyBzbGlkZVBvc2l0aW9uID0gMDsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHsgc2xpZGVQb3NpdGlvbiA9IE1hdGguZmxvb3Ioc2xpZGVQb3NpdGlvbik7IH1cclxuICAgICAgICAgICAgICAgIGlmICgoaW5kZXgpICUgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSB7IHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7IH1cclxuICAgICAgICAgICAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7IHNsaWRlUG9zaXRpb24gPSBNYXRoLmZsb29yKHNsaWRlUG9zaXRpb24pOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKGluZGV4KSAlIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgeyBzbmFwR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pOyB9XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3dpcGVyLnZpcnR1YWxTaXplICs9IHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcclxuXHJcbiAgICAgICAgICAgIHByZXZTbGlkZVNpemUgPSBzbGlkZVNpemU7XHJcblxyXG4gICAgICAgICAgICBpbmRleCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2lwZXIudmlydHVhbFNpemUgPSBNYXRoLm1heChzd2lwZXIudmlydHVhbFNpemUsIHN3aXBlclNpemUpICsgb2Zmc2V0QWZ0ZXI7XHJcbiAgICAgICAgdmFyIG5ld1NsaWRlc0dyaWQ7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgcnRsICYmIHdyb25nUlRMICYmIChwYXJhbXMuZWZmZWN0ID09PSAnc2xpZGUnIHx8IHBhcmFtcy5lZmZlY3QgPT09ICdjb3ZlcmZsb3cnKSkge1xyXG4gICAgICAgICAgICAkd3JhcHBlckVsLmNzcyh7IHdpZHRoOiAoKHN3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pICsgXCJweFwiKSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFTdXBwb3J0LmZsZXhib3ggfHwgcGFyYW1zLnNldFdyYXBwZXJTaXplKSB7XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHsgJHdyYXBwZXJFbC5jc3MoeyB3aWR0aDogKChzd2lwZXIudmlydHVhbFNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKSArIFwicHhcIikgfSk7IH1cclxuICAgICAgICAgICAgZWxzZSB7ICR3cmFwcGVyRWwuY3NzKHsgaGVpZ2h0OiAoKHN3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pICsgXCJweFwiKSB9KTsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSA9IChzbGlkZVNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKSAqIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3M7XHJcbiAgICAgICAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSA9IE1hdGguY2VpbChzd2lwZXIudmlydHVhbFNpemUgLyBwYXJhbXMuc2xpZGVzUGVyQ29sdW1uKSAtIHBhcmFtcy5zcGFjZUJldHdlZW47XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHsgJHdyYXBwZXJFbC5jc3MoeyB3aWR0aDogKChzd2lwZXIudmlydHVhbFNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKSArIFwicHhcIikgfSk7IH1cclxuICAgICAgICAgICAgZWxzZSB7ICR3cmFwcGVyRWwuY3NzKHsgaGVpZ2h0OiAoKHN3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pICsgXCJweFwiKSB9KTsgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTbGlkZXNHcmlkID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBzbmFwR3JpZC5sZW5ndGg7IGkkMSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlc0dyaWRJdGVtID0gc25hcEdyaWRbaSQxXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3RocykgeyBzbGlkZXNHcmlkSXRlbSA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZEl0ZW0pOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBHcmlkW2kkMV0gPCBzd2lwZXIudmlydHVhbFNpemUgKyBzbmFwR3JpZFswXSkgeyBuZXdTbGlkZXNHcmlkLnB1c2goc2xpZGVzR3JpZEl0ZW0pOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzbmFwR3JpZCA9IG5ld1NsaWRlc0dyaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBsYXN0IGdyaWQgZWxlbWVudHMgZGVwZW5kaW5nIG9uIHdpZHRoXHJcbiAgICAgICAgaWYgKCFwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcclxuICAgICAgICAgICAgbmV3U2xpZGVzR3JpZCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpJDIgPSAwOyBpJDIgPCBzbmFwR3JpZC5sZW5ndGg7IGkkMiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVzR3JpZEl0ZW0kMSA9IHNuYXBHcmlkW2kkMl07XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3RocykgeyBzbGlkZXNHcmlkSXRlbSQxID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkSXRlbSQxKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNuYXBHcmlkW2kkMl0gPD0gc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1NsaWRlc0dyaWQucHVzaChzbGlkZXNHcmlkSXRlbSQxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzbmFwR3JpZCA9IG5ld1NsaWRlc0dyaWQ7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIC0gTWF0aC5mbG9vcihzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSkgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBzbmFwR3JpZC5wdXNoKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzbmFwR3JpZC5sZW5ndGggPT09IDApIHsgc25hcEdyaWQgPSBbMF07IH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5zcGFjZUJldHdlZW4gIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJ0bCkgeyBzbGlkZXMuY3NzKHsgbWFyZ2luTGVmdDogKHNwYWNlQmV0d2VlbiArIFwicHhcIikgfSk7IH1cclxuICAgICAgICAgICAgICAgIGVsc2UgeyBzbGlkZXMuY3NzKHsgbWFyZ2luUmlnaHQ6IChzcGFjZUJldHdlZW4gKyBcInB4XCIpIH0pOyB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IHNsaWRlcy5jc3MoeyBtYXJnaW5Cb3R0b206IChzcGFjZUJldHdlZW4gKyBcInB4XCIpIH0pOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlczogc2xpZGVzLFxyXG4gICAgICAgICAgICBzbmFwR3JpZDogc25hcEdyaWQsXHJcbiAgICAgICAgICAgIHNsaWRlc0dyaWQ6IHNsaWRlc0dyaWQsXHJcbiAgICAgICAgICAgIHNsaWRlc1NpemVzR3JpZDogc2xpZGVzU2l6ZXNHcmlkLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoc2xpZGVzTGVuZ3RoICE9PSBwcmV2aW91c1NsaWRlc0xlbmd0aCkge1xyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVzTGVuZ3RoQ2hhbmdlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzbmFwR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU25hcEdyaWRMZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykgeyBzd2lwZXIuY2hlY2tPdmVyZmxvdygpOyB9XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdzbmFwR3JpZExlbmd0aENoYW5nZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2xpZGVzR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCkge1xyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVzR3JpZExlbmd0aENoYW5nZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcclxuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVBdXRvSGVpZ2h0KHNwZWVkKSB7XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFjdGl2ZVNsaWRlcyA9IFtdO1xyXG4gICAgICAgIHZhciBuZXdIZWlnaHQgPSAwO1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3BlZWQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNwZWVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHN3aXBlci5wYXJhbXMuc3BlZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBGaW5kIHNsaWRlcyBjdXJyZW50bHkgaW4gdmlld1xyXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJyAmJiBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBNYXRoLmNlaWwoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3KTsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggKyBpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGgpIHsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KVswXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5kIG5ldyBoZWlnaHQgZnJvbSBoaWdoZXN0IHNsaWRlIGluIHZpZXdcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWN0aXZlU2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aXZlU2xpZGVzW2ldICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IGFjdGl2ZVNsaWRlc1tpXS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBuZXdIZWlnaHQgPSBoZWlnaHQgPiBuZXdIZWlnaHQgPyBoZWlnaHQgOiBuZXdIZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBIZWlnaHRcclxuICAgICAgICBpZiAobmV3SGVpZ2h0KSB7IHN3aXBlci4kd3JhcHBlckVsLmNzcygnaGVpZ2h0JywgKG5ld0hlaWdodCArIFwicHhcIikpOyB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2xpZGVzT2Zmc2V0KCkge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHNsaWRlc1tpXS5zd2lwZXJTbGlkZU9mZnNldCA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHNsaWRlc1tpXS5vZmZzZXRMZWZ0IDogc2xpZGVzW2ldLm9mZnNldFRvcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlKSB7XHJcbiAgICAgICAgaWYgKHRyYW5zbGF0ZSA9PT0gdm9pZCAwKSB0cmFuc2xhdGUgPSAodGhpcyAmJiB0aGlzLnRyYW5zbGF0ZSkgfHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcblxyXG4gICAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xyXG4gICAgICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xyXG5cclxuICAgICAgICBpZiAoc2xpZGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAodHlwZW9mIHNsaWRlc1swXS5zd2lwZXJTbGlkZU9mZnNldCA9PT0gJ3VuZGVmaW5lZCcpIHsgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpOyB9XHJcblxyXG4gICAgICAgIHZhciBvZmZzZXRDZW50ZXIgPSAtdHJhbnNsYXRlO1xyXG4gICAgICAgIGlmIChydGwpIHsgb2Zmc2V0Q2VudGVyID0gdHJhbnNsYXRlOyB9XHJcblxyXG4gICAgICAgIC8vIFZpc2libGUgU2xpZGVzXHJcbiAgICAgICAgc2xpZGVzLnJlbW92ZUNsYXNzKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1tpXTtcclxuICAgICAgICAgICAgdmFyIHNsaWRlUHJvZ3Jlc3MgPVxyXG4gICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgIChvZmZzZXRDZW50ZXIgKyAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIDogMCkpIC0gc2xpZGUuc3dpcGVyU2xpZGVPZmZzZXRcclxuICAgICAgICAgICAgICAgICkgLyAoc2xpZGUuc3dpcGVyU2xpZGVTaXplICsgcGFyYW1zLnNwYWNlQmV0d2Vlbik7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMud2F0Y2hTbGlkZXNWaXNpYmlsaXR5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVCZWZvcmUgPSAtKG9mZnNldENlbnRlciAtIHNsaWRlLnN3aXBlclNsaWRlT2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZUFmdGVyID0gc2xpZGVCZWZvcmUgKyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzVmlzaWJsZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgKHNsaWRlQmVmb3JlID49IDAgJiYgc2xpZGVCZWZvcmUgPCBzd2lwZXIuc2l6ZSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAoc2xpZGVBZnRlciA+IDAgJiYgc2xpZGVBZnRlciA8PSBzd2lwZXIuc2l6ZSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAoc2xpZGVCZWZvcmUgPD0gMCAmJiBzbGlkZUFmdGVyID49IHN3aXBlci5zaXplKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXMuZXEoaSkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzbGlkZS5wcm9ncmVzcyA9IHJ0bCA/IC1zbGlkZVByb2dyZXNzIDogc2xpZGVQcm9ncmVzcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKSB7XHJcbiAgICAgICAgaWYgKHRyYW5zbGF0ZSA9PT0gdm9pZCAwKSB0cmFuc2xhdGUgPSAodGhpcyAmJiB0aGlzLnRyYW5zbGF0ZSkgfHwgMDtcclxuXHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcblxyXG4gICAgICAgIHZhciB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBzd2lwZXIucHJvZ3Jlc3M7XHJcbiAgICAgICAgdmFyIGlzQmVnaW5uaW5nID0gc3dpcGVyLmlzQmVnaW5uaW5nO1xyXG4gICAgICAgIHZhciBpc0VuZCA9IHN3aXBlci5pc0VuZDtcclxuICAgICAgICB2YXIgd2FzQmVnaW5uaW5nID0gaXNCZWdpbm5pbmc7XHJcbiAgICAgICAgdmFyIHdhc0VuZCA9IGlzRW5kO1xyXG4gICAgICAgIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xyXG4gICAgICAgICAgICBwcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgIGlzQmVnaW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXNFbmQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyAodHJhbnNsYXRlc0RpZmYpO1xyXG4gICAgICAgICAgICBpc0JlZ2lubmluZyA9IHByb2dyZXNzIDw9IDA7XHJcbiAgICAgICAgICAgIGlzRW5kID0gcHJvZ3Jlc3MgPj0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXHJcbiAgICAgICAgICAgIGlzQmVnaW5uaW5nOiBpc0JlZ2lubmluZyxcclxuICAgICAgICAgICAgaXNFbmQ6IGlzRW5kLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkgeyBzd2lwZXIudXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlKTsgfVxyXG5cclxuICAgICAgICBpZiAoaXNCZWdpbm5pbmcgJiYgIXdhc0JlZ2lubmluZykge1xyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgncmVhY2hCZWdpbm5pbmcgdG9FZGdlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0VuZCAmJiAhd2FzRW5kKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdyZWFjaEVuZCB0b0VkZ2UnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCh3YXNCZWdpbm5pbmcgJiYgIWlzQmVnaW5uaW5nKSB8fCAod2FzRW5kICYmICFpc0VuZCkpIHtcclxuICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2Zyb21FZGdlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2lwZXIuZW1pdCgncHJvZ3Jlc3MnLCBwcm9ncmVzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2xpZGVzQ2xhc3NlcygpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcclxuICAgICAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgdmFyIHJlYWxJbmRleCA9IHN3aXBlci5yZWFsSW5kZXg7XHJcbiAgICAgICAgdmFyIGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XHJcblxyXG4gICAgICAgIHNsaWRlcy5yZW1vdmVDbGFzcygoKHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKSArIFwiIFwiICsgKHBhcmFtcy5zbGlkZU5leHRDbGFzcykgKyBcIiBcIiArIChwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpICsgXCIgXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpICsgXCIgXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKSArIFwiIFwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcykpKTtcclxuXHJcbiAgICAgICAgdmFyIGFjdGl2ZVNsaWRlO1xyXG4gICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcclxuICAgICAgICAgICAgYWN0aXZlU2xpZGUgPSBzd2lwZXIuJHdyYXBwZXJFbC5maW5kKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBhY3RpdmVJbmRleCArIFwiXFxcIl1cIikpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZVNsaWRlID0gc2xpZGVzLmVxKGFjdGl2ZUluZGV4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFjdGl2ZSBjbGFzc2VzXHJcbiAgICAgICAgYWN0aXZlU2xpZGUuYWRkQ2xhc3MocGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgLy8gRHVwbGljYXRlIHRvIGFsbCBsb29wZWQgc2xpZGVzXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVTbGlkZS5oYXNDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyRWxcclxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiOm5vdCguXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCIpW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIHJlYWxJbmRleCArIFwiXFxcIl1cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyRWxcclxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIHJlYWxJbmRleCArIFwiXFxcIl1cIikpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBOZXh0IFNsaWRlXHJcbiAgICAgICAgdmFyIG5leHRTbGlkZSA9IGFjdGl2ZVNsaWRlLm5leHRBbGwoKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSkpLmVxKDApLmFkZENsYXNzKHBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sb29wICYmIG5leHRTbGlkZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgbmV4dFNsaWRlID0gc2xpZGVzLmVxKDApO1xyXG4gICAgICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MocGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUHJldiBTbGlkZVxyXG4gICAgICAgIHZhciBwcmV2U2xpZGUgPSBhY3RpdmVTbGlkZS5wcmV2QWxsKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykpKS5lcSgwKS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xyXG4gICAgICAgIGlmIChwYXJhbXMubG9vcCAmJiBwcmV2U2xpZGUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHByZXZTbGlkZSA9IHNsaWRlcy5lcSgtMSk7XHJcbiAgICAgICAgICAgIHByZXZTbGlkZS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgLy8gRHVwbGljYXRlIHRvIGFsbCBsb29wZWQgc2xpZGVzXHJcbiAgICAgICAgICAgIGlmIChuZXh0U2xpZGUuaGFzQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlckVsXHJcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIjpub3QoLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiKVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyAobmV4dFNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykpICsgXCJcXFwiXVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyRWxcclxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIChuZXh0U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgKyBcIlxcXCJdXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmV2U2xpZGUuaGFzQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlckVsXHJcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIjpub3QoLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiKVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyAocHJldlNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykpICsgXCJcXFwiXVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyRWxcclxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIChwcmV2U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgKyBcIlxcXCJdXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZUluZGV4KG5ld0FjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XHJcbiAgICAgICAgdmFyIHNsaWRlc0dyaWQgPSBzd2lwZXIuc2xpZGVzR3JpZDtcclxuICAgICAgICB2YXIgc25hcEdyaWQgPSBzd2lwZXIuc25hcEdyaWQ7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyIHByZXZpb3VzSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgdmFyIHByZXZpb3VzUmVhbEluZGV4ID0gc3dpcGVyLnJlYWxJbmRleDtcclxuICAgICAgICB2YXIgcHJldmlvdXNTbmFwSW5kZXggPSBzd2lwZXIuc25hcEluZGV4O1xyXG4gICAgICAgIHZhciBhY3RpdmVJbmRleCA9IG5ld0FjdGl2ZUluZGV4O1xyXG4gICAgICAgIHZhciBzbmFwSW5kZXg7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIDFdICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzbGlkZXNHcmlkW2kgKyAxXSAtICgoc2xpZGVzR3JpZFtpICsgMV0gLSBzbGlkZXNHcmlkW2ldKSAvIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRyYW5zbGF0ZSA+PSBzbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZSA8IHNsaWRlc0dyaWRbaSArIDFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgc2xpZGVJbmRleFxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLm5vcm1hbGl6ZVNsaWRlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA8IDAgfHwgdHlwZW9mIGFjdGl2ZUluZGV4ID09PSAndW5kZWZpbmVkJykgeyBhY3RpdmVJbmRleCA9IDA7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc25hcEdyaWQuaW5kZXhPZih0cmFuc2xhdGUpID49IDApIHtcclxuICAgICAgICAgICAgc25hcEluZGV4ID0gc25hcEdyaWQuaW5kZXhPZih0cmFuc2xhdGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNuYXBJbmRleCA9IE1hdGguZmxvb3IoYWN0aXZlSW5kZXggLyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc25hcEluZGV4ID49IHNuYXBHcmlkLmxlbmd0aCkgeyBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxOyB9XHJcbiAgICAgICAgaWYgKGFjdGl2ZUluZGV4ID09PSBwcmV2aW91c0luZGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChzbmFwSW5kZXggIT09IHByZXZpb3VzU25hcEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc25hcEluZGV4ID0gc25hcEluZGV4O1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3NuYXBJbmRleENoYW5nZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEdldCByZWFsIGluZGV4XHJcbiAgICAgICAgdmFyIHJlYWxJbmRleCA9IHBhcnNlSW50KHN3aXBlci5zbGlkZXMuZXEoYWN0aXZlSW5kZXgpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgfHwgYWN0aXZlSW5kZXgsIDEwKTtcclxuXHJcbiAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICBzbmFwSW5kZXg6IHNuYXBJbmRleCxcclxuICAgICAgICAgICAgcmVhbEluZGV4OiByZWFsSW5kZXgsXHJcbiAgICAgICAgICAgIHByZXZpb3VzSW5kZXg6IHByZXZpb3VzSW5kZXgsXHJcbiAgICAgICAgICAgIGFjdGl2ZUluZGV4OiBhY3RpdmVJbmRleCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBzd2lwZXIuZW1pdCgnYWN0aXZlSW5kZXhDaGFuZ2UnKTtcclxuICAgICAgICBzd2lwZXIuZW1pdCgnc25hcEluZGV4Q2hhbmdlJyk7XHJcbiAgICAgICAgaWYgKHByZXZpb3VzUmVhbEluZGV4ICE9PSByZWFsSW5kZXgpIHtcclxuICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3JlYWxJbmRleENoYW5nZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVDaGFuZ2UnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDbGlja2VkU2xpZGUoZSkge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xyXG4gICAgICAgIHZhciBzbGlkZSA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSkpWzBdO1xyXG4gICAgICAgIHZhciBzbGlkZUZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHNsaWRlKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3dpcGVyLnNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5zbGlkZXNbaV0gPT09IHNsaWRlKSB7IHNsaWRlRm91bmQgPSB0cnVlOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzbGlkZSAmJiBzbGlkZUZvdW5kKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci5jbGlja2VkU2xpZGUgPSBzbGlkZTtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gcGFyc2VJbnQoJChzbGlkZSkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9ICQoc2xpZGUpLmluZGV4KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2lwZXIuY2xpY2tlZFNsaWRlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXMuc2xpZGVUb0NsaWNrZWRTbGlkZSAmJiBzd2lwZXIuY2xpY2tlZEluZGV4ICE9PSB1bmRlZmluZWQgJiYgc3dpcGVyLmNsaWNrZWRJbmRleCAhPT0gc3dpcGVyLmFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvQ2xpY2tlZFNsaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciB1cGRhdGUgPSB7XHJcbiAgICAgICAgdXBkYXRlU2l6ZTogdXBkYXRlU2l6ZSxcclxuICAgICAgICB1cGRhdGVTbGlkZXM6IHVwZGF0ZVNsaWRlcyxcclxuICAgICAgICB1cGRhdGVBdXRvSGVpZ2h0OiB1cGRhdGVBdXRvSGVpZ2h0LFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlc09mZnNldDogdXBkYXRlU2xpZGVzT2Zmc2V0LFxyXG4gICAgICAgIHVwZGF0ZVNsaWRlc1Byb2dyZXNzOiB1cGRhdGVTbGlkZXNQcm9ncmVzcyxcclxuICAgICAgICB1cGRhdGVQcm9ncmVzczogdXBkYXRlUHJvZ3Jlc3MsXHJcbiAgICAgICAgdXBkYXRlU2xpZGVzQ2xhc3NlczogdXBkYXRlU2xpZGVzQ2xhc3NlcyxcclxuICAgICAgICB1cGRhdGVBY3RpdmVJbmRleDogdXBkYXRlQWN0aXZlSW5kZXgsXHJcbiAgICAgICAgdXBkYXRlQ2xpY2tlZFNsaWRlOiB1cGRhdGVDbGlja2VkU2xpZGUsXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFRyYW5zbGF0ZShheGlzKSB7XHJcbiAgICAgICAgaWYgKGF4aXMgPT09IHZvaWQgMCkgYXhpcyA9IHRoaXMuaXNIb3Jpem9udGFsKCkgPyAneCcgOiAneSc7XHJcblxyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcclxuICAgICAgICB2YXIgdHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcclxuICAgICAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJ0bCA/IC10cmFuc2xhdGUgOiB0cmFuc2xhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY3VycmVudFRyYW5zbGF0ZSA9IFV0aWxzLmdldFRyYW5zbGF0ZSgkd3JhcHBlckVsWzBdLCBheGlzKTtcclxuICAgICAgICBpZiAocnRsKSB7IGN1cnJlbnRUcmFuc2xhdGUgPSAtY3VycmVudFRyYW5zbGF0ZTsgfVxyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudFRyYW5zbGF0ZSB8fCAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIGJ5Q29udHJvbGxlcikge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xyXG4gICAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gc3dpcGVyLnByb2dyZXNzO1xyXG4gICAgICAgIHZhciB4ID0gMDtcclxuICAgICAgICB2YXIgeSA9IDA7XHJcbiAgICAgICAgdmFyIHogPSAwO1xyXG5cclxuICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XHJcbiAgICAgICAgICAgIHggPSBydGwgPyAtdHJhbnNsYXRlIDogdHJhbnNsYXRlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHkgPSB0cmFuc2xhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykge1xyXG4gICAgICAgICAgICB4ID0gTWF0aC5mbG9vcih4KTtcclxuICAgICAgICAgICAgeSA9IE1hdGguZmxvb3IoeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChTdXBwb3J0LnRyYW5zZm9ybXMzZCkgeyAkd3JhcHBlckVsLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZChcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4LCBcIiArIHogKyBcInB4KVwiKSk7IH1cclxuICAgICAgICAgICAgZWxzZSB7ICR3cmFwcGVyRWwudHJhbnNmb3JtKChcInRyYW5zbGF0ZShcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4KVwiKSk7IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpcGVyLnByZXZpb3VzVHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcclxuICAgICAgICBzd2lwZXIudHJhbnNsYXRlID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8geCA6IHk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gdXBkYXRlIHByb2dyZXNzXHJcbiAgICAgICAgdmFyIG5ld1Byb2dyZXNzO1xyXG4gICAgICAgIHZhciB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcclxuICAgICAgICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcclxuICAgICAgICAgICAgbmV3UHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1Byb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyAodHJhbnNsYXRlc0RpZmYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3UHJvZ3Jlc3MgIT09IHByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3NldFRyYW5zbGF0ZScsIHN3aXBlci50cmFuc2xhdGUsIGJ5Q29udHJvbGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWluVHJhbnNsYXRlKCkge1xyXG4gICAgICAgIHJldHVybiAoLXRoaXMuc25hcEdyaWRbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1heFRyYW5zbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gKC10aGlzLnNuYXBHcmlkW3RoaXMuc25hcEdyaWQubGVuZ3RoIC0gMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0cmFuc2xhdGUgPSB7XHJcbiAgICAgICAgZ2V0VHJhbnNsYXRlOiBnZXRUcmFuc2xhdGUsXHJcbiAgICAgICAgc2V0VHJhbnNsYXRlOiBzZXRUcmFuc2xhdGUsXHJcbiAgICAgICAgbWluVHJhbnNsYXRlOiBtaW5UcmFuc2xhdGUsXHJcbiAgICAgICAgbWF4VHJhbnNsYXRlOiBtYXhUcmFuc2xhdGUsXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24sIGJ5Q29udHJvbGxlcikge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC50cmFuc2l0aW9uKGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3NldFRyYW5zaXRpb24nLCBkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHJ1bkNhbGxiYWNrcyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcclxuICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICB2YXIgcHJldmlvdXNJbmRleCA9IHN3aXBlci5wcmV2aW91c0luZGV4O1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGRpciA9IGRpcmVjdGlvbjtcclxuICAgICAgICBpZiAoIWRpcikge1xyXG4gICAgICAgICAgICBpZiAoYWN0aXZlSW5kZXggPiBwcmV2aW91c0luZGV4KSB7IGRpciA9ICduZXh0JzsgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChhY3RpdmVJbmRleCA8IHByZXZpb3VzSW5kZXgpIHsgZGlyID0gJ3ByZXYnOyB9XHJcbiAgICAgICAgICAgIGVsc2UgeyBkaXIgPSAncmVzZXQnOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvblN0YXJ0Jyk7XHJcblxyXG4gICAgICAgIGlmIChydW5DYWxsYmFja3MgJiYgYWN0aXZlSW5kZXggIT09IHByZXZpb3VzSW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKGRpciA9PT0gJ3Jlc2V0Jykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlUmVzZXRUcmFuc2l0aW9uU3RhcnQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnKTtcclxuICAgICAgICAgICAgaWYgKGRpciA9PT0gJ25leHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCQxKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSBydW5DYWxsYmFja3MgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgdmFyIHByZXZpb3VzSW5kZXggPSBzd2lwZXIucHJldmlvdXNJbmRleDtcclxuICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XHJcblxyXG4gICAgICAgIHZhciBkaXIgPSBkaXJlY3Rpb247XHJcbiAgICAgICAgaWYgKCFkaXIpIHtcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZUluZGV4ID4gcHJldmlvdXNJbmRleCkgeyBkaXIgPSAnbmV4dCc7IH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoYWN0aXZlSW5kZXggPCBwcmV2aW91c0luZGV4KSB7IGRpciA9ICdwcmV2JzsgfVxyXG4gICAgICAgICAgICBlbHNlIHsgZGlyID0gJ3Jlc2V0JzsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3RyYW5zaXRpb25FbmQnKTtcclxuXHJcbiAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcyAmJiBhY3RpdmVJbmRleCAhPT0gcHJldmlvdXNJbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoZGlyID09PSAncmVzZXQnKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVSZXNldFRyYW5zaXRpb25FbmQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJyk7XHJcbiAgICAgICAgICAgIGlmIChkaXIgPT09ICduZXh0Jykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlTmV4dFRyYW5zaXRpb25FbmQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdzbGlkZVByZXZUcmFuc2l0aW9uRW5kJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRyYW5zaXRpb24kMSA9IHtcclxuICAgICAgICBzZXRUcmFuc2l0aW9uOiBzZXRUcmFuc2l0aW9uLFxyXG4gICAgICAgIHRyYW5zaXRpb25TdGFydDogdHJhbnNpdGlvblN0YXJ0LFxyXG4gICAgICAgIHRyYW5zaXRpb25FbmQ6IHRyYW5zaXRpb25FbmQkMSxcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcclxuICAgICAgICBpZiAoaW5kZXggPT09IHZvaWQgMCkgaW5kZXggPSAwO1xyXG4gICAgICAgIGlmIChzcGVlZCA9PT0gdm9pZCAwKSBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xyXG4gICAgICAgIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHNsaWRlSW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAoc2xpZGVJbmRleCA8IDApIHsgc2xpZGVJbmRleCA9IDA7IH1cclxuXHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyIHNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkO1xyXG4gICAgICAgIHZhciBzbGlkZXNHcmlkID0gc3dpcGVyLnNsaWRlc0dyaWQ7XHJcbiAgICAgICAgdmFyIHByZXZpb3VzSW5kZXggPSBzd2lwZXIucHJldmlvdXNJbmRleDtcclxuICAgICAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgdmFyIHJ0bCA9IHN3aXBlci5ydGxUcmFuc2xhdGU7XHJcbiAgICAgICAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmNhdGlvbk9uVHJhbnNpdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc25hcEluZGV4ID0gTWF0aC5mbG9vcihzbGlkZUluZGV4IC8gcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcclxuICAgICAgICBpZiAoc25hcEluZGV4ID49IHNuYXBHcmlkLmxlbmd0aCkgeyBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxOyB9XHJcblxyXG4gICAgICAgIGlmICgoYWN0aXZlSW5kZXggfHwgcGFyYW1zLmluaXRpYWxTbGlkZSB8fCAwKSA9PT0gKHByZXZpb3VzSW5kZXggfHwgMCkgJiYgcnVuQ2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdHJhbnNsYXRlID0gLXNuYXBHcmlkW3NuYXBJbmRleF07XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSBwcm9ncmVzc1xyXG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpO1xyXG5cclxuICAgICAgICAvLyBOb3JtYWxpemUgc2xpZGVJbmRleFxyXG4gICAgICAgIGlmIChwYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmICgtTWF0aC5mbG9vcih0cmFuc2xhdGUgKiAxMDApID49IE1hdGguZmxvb3Ioc2xpZGVzR3JpZFtpXSAqIDEwMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEaXJlY3Rpb25zIGxvY2tzXHJcbiAgICAgICAgaWYgKHN3aXBlci5pbml0aWFsaXplZCAmJiBzbGlkZUluZGV4ICE9PSBhY3RpdmVJbmRleCkge1xyXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiB0cmFuc2xhdGUgPCBzd2lwZXIudHJhbnNsYXRlICYmIHRyYW5zbGF0ZSA8IHN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIHRyYW5zbGF0ZSA+IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlID4gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGFjdGl2ZUluZGV4IHx8IDApICE9PSBzbGlkZUluZGV4KSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGlyZWN0aW9uO1xyXG4gICAgICAgIGlmIChzbGlkZUluZGV4ID4gYWN0aXZlSW5kZXgpIHsgZGlyZWN0aW9uID0gJ25leHQnOyB9XHJcbiAgICAgICAgZWxzZSBpZiAoc2xpZGVJbmRleCA8IGFjdGl2ZUluZGV4KSB7IGRpcmVjdGlvbiA9ICdwcmV2JzsgfVxyXG4gICAgICAgIGVsc2UgeyBkaXJlY3Rpb24gPSAncmVzZXQnOyB9XHJcblxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgSW5kZXhcclxuICAgICAgICBpZiAoKHJ0bCAmJiAtdHJhbnNsYXRlID09PSBzd2lwZXIudHJhbnNsYXRlKSB8fCAoIXJ0bCAmJiB0cmFuc2xhdGUgPT09IHN3aXBlci50cmFuc2xhdGUpKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleChzbGlkZUluZGV4KTtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIEhlaWdodFxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5lZmZlY3QgIT09ICdzbGlkZScpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uICE9PSAncmVzZXQnKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3BlZWQgPT09IDAgfHwgIVN1cHBvcnQudHJhbnNpdGlvbikge1xyXG4gICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcclxuICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XHJcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnLCBzcGVlZCwgaW50ZXJuYWwpO1xyXG4gICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcclxuICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XHJcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnLCBzcGVlZCwgaW50ZXJuYWwpO1xyXG4gICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNsaWRlVG9Mb29wKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gdm9pZCAwKSBpbmRleCA9IDA7XHJcbiAgICAgICAgaWYgKHNwZWVkID09PSB2b2lkIDApIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XHJcbiAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSBydW5DYWxsYmFja3MgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgbmV3SW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XHJcbiAgICAgICAgICAgIG5ld0luZGV4ICs9IHN3aXBlci5sb29wZWRTbGlkZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cclxuICAgIGZ1bmN0aW9uIHNsaWRlTmV4dChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xyXG4gICAgICAgIGlmIChzcGVlZCA9PT0gdm9pZCAwKSBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xyXG4gICAgICAgIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyIGFuaW1hdGluZyA9IHN3aXBlci5hbmltYXRpbmc7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmltYXRpbmcpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICBzd2lwZXIuX2NsaWVudExlZnQgPSBzd2lwZXIuJHdyYXBwZXJFbFswXS5jbGllbnRMZWZ0O1xyXG4gICAgICAgICAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXAsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cclxuICAgIGZ1bmN0aW9uIHNsaWRlUHJldihzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xyXG4gICAgICAgIGlmIChzcGVlZCA9PT0gdm9pZCAwKSBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xyXG4gICAgICAgIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyIGFuaW1hdGluZyA9IHN3aXBlci5hbmltYXRpbmc7XHJcbiAgICAgICAgdmFyIHNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkO1xyXG4gICAgICAgIHZhciBzbGlkZXNHcmlkID0gc3dpcGVyLnNsaWRlc0dyaWQ7XHJcbiAgICAgICAgdmFyIHJ0bFRyYW5zbGF0ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGU7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW5nKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgICAgICAgICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLiR3cmFwcGVyRWxbMF0uY2xpZW50TGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IHJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcclxuICAgICAgICBmdW5jdGlvbiBub3JtYWxpemUodmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPCAwKSB7IHJldHVybiAtTWF0aC5mbG9vcihNYXRoLmFicyh2YWwpKTsgfVxyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IG5vcm1hbGl6ZSh0cmFuc2xhdGUpO1xyXG4gICAgICAgIHZhciBub3JtYWxpemVkU25hcEdyaWQgPSBzbmFwR3JpZC5tYXAoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gbm9ybWFsaXplKHZhbCk7IH0pO1xyXG4gICAgICAgIHZhciBub3JtYWxpemVkU2xpZGVzR3JpZCA9IHNsaWRlc0dyaWQubWFwKGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIG5vcm1hbGl6ZSh2YWwpOyB9KTtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRTbmFwID0gc25hcEdyaWRbbm9ybWFsaXplZFNuYXBHcmlkLmluZGV4T2Yobm9ybWFsaXplZFRyYW5zbGF0ZSldO1xyXG4gICAgICAgIHZhciBwcmV2U25hcCA9IHNuYXBHcmlkW25vcm1hbGl6ZWRTbmFwR3JpZC5pbmRleE9mKG5vcm1hbGl6ZWRUcmFuc2xhdGUpIC0gMV07XHJcbiAgICAgICAgdmFyIHByZXZJbmRleDtcclxuICAgICAgICBpZiAodHlwZW9mIHByZXZTbmFwICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBwcmV2SW5kZXggPSBzbGlkZXNHcmlkLmluZGV4T2YocHJldlNuYXApO1xyXG4gICAgICAgICAgICBpZiAocHJldkluZGV4IDwgMCkgeyBwcmV2SW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggLSAxOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhwcmV2SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cclxuICAgIGZ1bmN0aW9uIHNsaWRlUmVzZXQoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcclxuICAgICAgICBpZiAoc3BlZWQgPT09IHZvaWQgMCkgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcclxuICAgICAgICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHJ1bkNhbGxiYWNrcyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cclxuICAgIGZ1bmN0aW9uIHNsaWRlVG9DbG9zZXN0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XHJcbiAgICAgICAgaWYgKHNwZWVkID09PSB2b2lkIDApIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XHJcbiAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSBydW5DYWxsYmFja3MgPSB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgaW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgdmFyIHNuYXBJbmRleCA9IE1hdGguZmxvb3IoaW5kZXggLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcclxuXHJcbiAgICAgICAgaWYgKHNuYXBJbmRleCA8IHN3aXBlci5zbmFwR3JpZC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleF07XHJcbiAgICAgICAgICAgIHZhciBuZXh0U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXggKyAxXTtcclxuXHJcbiAgICAgICAgICAgIGlmICgodHJhbnNsYXRlIC0gY3VycmVudFNuYXApID4gKG5leHRTbmFwIC0gY3VycmVudFNuYXApIC8gMikge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzbGlkZVRvQ2xpY2tlZFNsaWRlKCkge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xyXG4gICAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XHJcblxyXG4gICAgICAgIHZhciBzbGlkZXNQZXJWaWV3ID0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyA/IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpIDogcGFyYW1zLnNsaWRlc1BlclZpZXc7XHJcbiAgICAgICAgdmFyIHNsaWRlVG9JbmRleCA9IHN3aXBlci5jbGlja2VkSW5kZXg7XHJcbiAgICAgICAgdmFyIHJlYWxJbmRleDtcclxuICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5hbmltYXRpbmcpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHJlYWxJbmRleCA9IHBhcnNlSW50KCQoc3dpcGVyLmNsaWNrZWRTbGlkZSkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgKHNsaWRlVG9JbmRleCA8IHN3aXBlci5sb29wZWRTbGlkZXMgLSAoc2xpZGVzUGVyVmlldyAvIDIpKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChzbGlkZVRvSW5kZXggPiAoc3dpcGVyLnNsaWRlcy5sZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzKSArIChzbGlkZXNQZXJWaWV3IC8gMikpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlVG9JbmRleCA9ICR3cmFwcGVyRWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyByZWFsSW5kZXggKyBcIlxcXCJdOm5vdCguXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCIpXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmluZGV4KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzbGlkZVRvSW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XHJcbiAgICAgICAgICAgICAgICBzbGlkZVRvSW5kZXggPSAkd3JhcHBlckVsXHJcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyByZWFsSW5kZXggKyBcIlxcXCJdOm5vdCguXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCIpXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lcSgwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5pbmRleCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIFV0aWxzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNsaWRlID0ge1xyXG4gICAgICAgIHNsaWRlVG86IHNsaWRlVG8sXHJcbiAgICAgICAgc2xpZGVUb0xvb3A6IHNsaWRlVG9Mb29wLFxyXG4gICAgICAgIHNsaWRlTmV4dDogc2xpZGVOZXh0LFxyXG4gICAgICAgIHNsaWRlUHJldjogc2xpZGVQcmV2LFxyXG4gICAgICAgIHNsaWRlUmVzZXQ6IHNsaWRlUmVzZXQsXHJcbiAgICAgICAgc2xpZGVUb0Nsb3Nlc3Q6IHNsaWRlVG9DbG9zZXN0LFxyXG4gICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IHNsaWRlVG9DbGlja2VkU2xpZGUsXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvb3BDcmVhdGUoKSB7XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcclxuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlZCBzbGlkZXNcclxuICAgICAgICAkd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIi5cIiArIChwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgdmFyIHNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSkpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmxvb3BGaWxsR3JvdXBXaXRoQmxhbmspIHtcclxuICAgICAgICAgICAgdmFyIGJsYW5rU2xpZGVzTnVtID0gcGFyYW1zLnNsaWRlc1Blckdyb3VwIC0gKHNsaWRlcy5sZW5ndGggJSBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xyXG4gICAgICAgICAgICBpZiAoYmxhbmtTbGlkZXNOdW0gIT09IHBhcmFtcy5zbGlkZXNQZXJHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBibGFua1NsaWRlc051bTsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJsYW5rTm9kZSA9ICQoZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS5hZGRDbGFzcygoKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiIFwiICsgKHBhcmFtcy5zbGlkZUJsYW5rQ2xhc3MpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoYmxhbmtOb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiAhcGFyYW1zLmxvb3BlZFNsaWRlcykgeyBwYXJhbXMubG9vcGVkU2xpZGVzID0gc2xpZGVzLmxlbmd0aDsgfVxyXG5cclxuICAgICAgICBzd2lwZXIubG9vcGVkU2xpZGVzID0gcGFyc2VJbnQocGFyYW1zLmxvb3BlZFNsaWRlcyB8fCBwYXJhbXMuc2xpZGVzUGVyVmlldywgMTApO1xyXG4gICAgICAgIHN3aXBlci5sb29wZWRTbGlkZXMgKz0gcGFyYW1zLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xyXG4gICAgICAgIGlmIChzd2lwZXIubG9vcGVkU2xpZGVzID4gc2xpZGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzd2lwZXIubG9vcGVkU2xpZGVzID0gc2xpZGVzLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwcmVwZW5kU2xpZGVzID0gW107XHJcbiAgICAgICAgdmFyIGFwcGVuZFNsaWRlcyA9IFtdO1xyXG4gICAgICAgIHNsaWRlcy5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlID0gJChlbCk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHN3aXBlci5sb29wZWRTbGlkZXMpIHsgYXBwZW5kU2xpZGVzLnB1c2goZWwpOyB9XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHNsaWRlcy5sZW5ndGggJiYgaW5kZXggPj0gc2xpZGVzLmxlbmd0aCAtIHN3aXBlci5sb29wZWRTbGlkZXMpIHsgcHJlcGVuZFNsaWRlcy5wdXNoKGVsKTsgfVxyXG4gICAgICAgICAgICBzbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBhcHBlbmRTbGlkZXMubGVuZ3RoOyBpJDEgKz0gMSkge1xyXG4gICAgICAgICAgICAkd3JhcHBlckVsLmFwcGVuZCgkKGFwcGVuZFNsaWRlc1tpJDFdLmNsb25lTm9kZSh0cnVlKSkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSQyID0gcHJlcGVuZFNsaWRlcy5sZW5ndGggLSAxOyBpJDIgPj0gMDsgaSQyIC09IDEpIHtcclxuICAgICAgICAgICAgJHdyYXBwZXJFbC5wcmVwZW5kKCQocHJlcGVuZFNsaWRlc1tpJDJdLmNsb25lTm9kZSh0cnVlKSkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9vcEZpeCgpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XHJcbiAgICAgICAgdmFyIGxvb3BlZFNsaWRlcyA9IHN3aXBlci5sb29wZWRTbGlkZXM7XHJcbiAgICAgICAgdmFyIGFsbG93U2xpZGVQcmV2ID0gc3dpcGVyLmFsbG93U2xpZGVQcmV2O1xyXG4gICAgICAgIHZhciBhbGxvd1NsaWRlTmV4dCA9IHN3aXBlci5hbGxvd1NsaWRlTmV4dDtcclxuICAgICAgICB2YXIgc25hcEdyaWQgPSBzd2lwZXIuc25hcEdyaWQ7XHJcbiAgICAgICAgdmFyIHJ0bCA9IHN3aXBlci5ydGxUcmFuc2xhdGU7XHJcbiAgICAgICAgdmFyIG5ld0luZGV4O1xyXG4gICAgICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IHRydWU7XHJcbiAgICAgICAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdmFyIHNuYXBUcmFuc2xhdGUgPSAtc25hcEdyaWRbYWN0aXZlSW5kZXhdO1xyXG4gICAgICAgIHZhciBkaWZmID0gc25hcFRyYW5zbGF0ZSAtIHN3aXBlci5nZXRUcmFuc2xhdGUoKTtcclxuXHJcblxyXG4gICAgICAgIC8vIEZpeCBGb3IgTmVnYXRpdmUgT3ZlcnNsaWRpbmdcclxuICAgICAgICBpZiAoYWN0aXZlSW5kZXggPCBsb29wZWRTbGlkZXMpIHtcclxuICAgICAgICAgICAgbmV3SW5kZXggPSAoc2xpZGVzLmxlbmd0aCAtIChsb29wZWRTbGlkZXMgKiAzKSkgKyBhY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgbmV3SW5kZXggKz0gbG9vcGVkU2xpZGVzO1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVDaGFuZ2VkID0gc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHNsaWRlQ2hhbmdlZCAmJiBkaWZmICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKChydGwgPyAtc3dpcGVyLnRyYW5zbGF0ZSA6IHN3aXBlci50cmFuc2xhdGUpIC0gZGlmZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmIGFjdGl2ZUluZGV4ID49IGxvb3BlZFNsaWRlcyAqIDIpIHx8IChhY3RpdmVJbmRleCA+PSBzbGlkZXMubGVuZ3RoIC0gbG9vcGVkU2xpZGVzKSkge1xyXG4gICAgICAgICAgICAvLyBGaXggRm9yIFBvc2l0aXZlIE92ZXJzbGlkaW5nXHJcbiAgICAgICAgICAgIG5ld0luZGV4ID0gLXNsaWRlcy5sZW5ndGggKyBhY3RpdmVJbmRleCArIGxvb3BlZFNsaWRlcztcclxuICAgICAgICAgICAgbmV3SW5kZXggKz0gbG9vcGVkU2xpZGVzO1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVDaGFuZ2VkJDEgPSBzd2lwZXIuc2xpZGVUbyhuZXdJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoc2xpZGVDaGFuZ2VkJDEgJiYgZGlmZiAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSgocnRsID8gLXN3aXBlci50cmFuc2xhdGUgOiBzd2lwZXIudHJhbnNsYXRlKSAtIGRpZmYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xyXG4gICAgICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvb3BEZXN0cm95KCkge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XHJcbiAgICAgICAgJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCIuXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSkucmVtb3ZlKCk7XHJcbiAgICAgICAgc2xpZGVzLnJlbW92ZUF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvb3AgPSB7XHJcbiAgICAgICAgbG9vcENyZWF0ZTogbG9vcENyZWF0ZSxcclxuICAgICAgICBsb29wRml4OiBsb29wRml4LFxyXG4gICAgICAgIGxvb3BEZXN0cm95OiBsb29wRGVzdHJveSxcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0R3JhYkN1cnNvcihtb3ZpbmcpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICBpZiAoU3VwcG9ydC50b3VjaCB8fCAhc3dpcGVyLnBhcmFtcy5zaW11bGF0ZVRvdWNoIHx8IChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkKSkgeyByZXR1cm47IH1cclxuICAgICAgICB2YXIgZWwgPSBzd2lwZXIuZWw7XHJcbiAgICAgICAgZWwuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xyXG4gICAgICAgIGVsLnN0eWxlLmN1cnNvciA9IG1vdmluZyA/ICctd2Via2l0LWdyYWJiaW5nJyA6ICctd2Via2l0LWdyYWInO1xyXG4gICAgICAgIGVsLnN0eWxlLmN1cnNvciA9IG1vdmluZyA/ICctbW96LWdyYWJiaW4nIDogJy1tb3otZ3JhYic7XHJcbiAgICAgICAgZWwuc3R5bGUuY3Vyc29yID0gbW92aW5nID8gJ2dyYWJiaW5nJyA6ICdncmFiJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1bnNldEdyYWJDdXJzb3IoKSB7XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgaWYgKFN1cHBvcnQudG91Y2ggfHwgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQpKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHN3aXBlci5lbC5zdHlsZS5jdXJzb3IgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZ3JhYkN1cnNvciA9IHtcclxuICAgICAgICBzZXRHcmFiQ3Vyc29yOiBzZXRHcmFiQ3Vyc29yLFxyXG4gICAgICAgIHVuc2V0R3JhYkN1cnNvcjogdW5zZXRHcmFiQ3Vyc29yLFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBhcHBlbmRTbGlkZShzbGlkZXMpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xyXG4gICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzbGlkZXMgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIHNsaWRlcykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSkgeyAkd3JhcHBlckVsLmFwcGVuZChzbGlkZXNbaV0pOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkd3JhcHBlckVsLmFwcGVuZChzbGlkZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEocGFyYW1zLm9ic2VydmVyICYmIFN1cHBvcnQub2JzZXJ2ZXIpKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlcGVuZFNsaWRlKHNsaWRlcykge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xyXG4gICAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XHJcbiAgICAgICAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcclxuICAgICAgICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gc2xpZGVzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVzW2ldKSB7ICR3cmFwcGVyRWwucHJlcGVuZChzbGlkZXNbaV0pOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCArIHNsaWRlcy5sZW5ndGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHdyYXBwZXJFbC5wcmVwZW5kKHNsaWRlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIShwYXJhbXMub2JzZXJ2ZXIgJiYgU3VwcG9ydC5vYnNlcnZlcikpIHtcclxuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFNsaWRlKGluZGV4LCBzbGlkZXMpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xyXG4gICAgICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcclxuICAgICAgICB2YXIgYWN0aXZlSW5kZXhCdWZmZXIgPSBhY3RpdmVJbmRleDtcclxuICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXhCdWZmZXIgLT0gc3dpcGVyLmxvb3BlZFNsaWRlcztcclxuICAgICAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZXMgPSAkd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGJhc2VMZW5ndGggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcclxuICAgICAgICBpZiAoaW5kZXggPD0gMCkge1xyXG4gICAgICAgICAgICBzd2lwZXIucHJlcGVuZFNsaWRlKHNsaWRlcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID49IGJhc2VMZW5ndGgpIHtcclxuICAgICAgICAgICAgc3dpcGVyLmFwcGVuZFNsaWRlKHNsaWRlcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXhCdWZmZXIgPiBpbmRleCA/IGFjdGl2ZUluZGV4QnVmZmVyICsgMSA6IGFjdGl2ZUluZGV4QnVmZmVyO1xyXG5cclxuICAgICAgICB2YXIgc2xpZGVzQnVmZmVyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGJhc2VMZW5ndGggLSAxOyBpID49IGluZGV4OyBpIC09IDEpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoaSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgc2xpZGVzQnVmZmVyLnVuc2hpZnQoY3VycmVudFNsaWRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBzbGlkZXMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgc2xpZGVzLmxlbmd0aDsgaSQxICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXNbaSQxXSkgeyAkd3JhcHBlckVsLmFwcGVuZChzbGlkZXNbaSQxXSk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4QnVmZmVyID4gaW5kZXggPyBhY3RpdmVJbmRleEJ1ZmZlciArIHNsaWRlcy5sZW5ndGggOiBhY3RpdmVJbmRleEJ1ZmZlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkd3JhcHBlckVsLmFwcGVuZChzbGlkZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSQyID0gMDsgaSQyIDwgc2xpZGVzQnVmZmVyLmxlbmd0aDsgaSQyICs9IDEpIHtcclxuICAgICAgICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzQnVmZmVyW2kkMl0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKHBhcmFtcy5vYnNlcnZlciAmJiBTdXBwb3J0Lm9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVTbGlkZShzbGlkZXNJbmRleGVzKSB7XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcclxuICAgICAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XHJcblxyXG4gICAgICAgIHZhciBhY3RpdmVJbmRleEJ1ZmZlciA9IGFjdGl2ZUluZGV4O1xyXG4gICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICBhY3RpdmVJbmRleEJ1ZmZlciAtPSBzd2lwZXIubG9vcGVkU2xpZGVzO1xyXG4gICAgICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcclxuICAgICAgICAgICAgc3dpcGVyLnNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleEJ1ZmZlcjtcclxuICAgICAgICB2YXIgaW5kZXhUb1JlbW92ZTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBzbGlkZXNJbmRleGVzID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBzbGlkZXNJbmRleGVzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzSW5kZXhlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhUb1JlbW92ZSA9IHNsaWRlc0luZGV4ZXNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnNsaWRlc1tpbmRleFRvUmVtb3ZlXSkgeyBzd2lwZXIuc2xpZGVzLmVxKGluZGV4VG9SZW1vdmUpLnJlbW92ZSgpOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSB7IG5ld0FjdGl2ZUluZGV4IC09IDE7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbmRleFRvUmVtb3ZlID0gc2xpZGVzSW5kZXhlcztcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHsgc3dpcGVyLnNsaWRlcy5lcShpbmRleFRvUmVtb3ZlKS5yZW1vdmUoKTsgfVxyXG4gICAgICAgICAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSB7IG5ld0FjdGl2ZUluZGV4IC09IDE7IH1cclxuICAgICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBNYXRoLm1heChuZXdBY3RpdmVJbmRleCwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghKHBhcmFtcy5vYnNlcnZlciAmJiBTdXBwb3J0Lm9ic2VydmVyKSkge1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVBbGxTbGlkZXMoKSB7XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBzbGlkZXNJbmRleGVzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHNsaWRlc0luZGV4ZXMucHVzaChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpcGVyLnJlbW92ZVNsaWRlKHNsaWRlc0luZGV4ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtYW5pcHVsYXRpb24gPSB7XHJcbiAgICAgICAgYXBwZW5kU2xpZGU6IGFwcGVuZFNsaWRlLFxyXG4gICAgICAgIHByZXBlbmRTbGlkZTogcHJlcGVuZFNsaWRlLFxyXG4gICAgICAgIGFkZFNsaWRlOiBhZGRTbGlkZSxcclxuICAgICAgICByZW1vdmVTbGlkZTogcmVtb3ZlU2xpZGUsXHJcbiAgICAgICAgcmVtb3ZlQWxsU2xpZGVzOiByZW1vdmVBbGxTbGlkZXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBEZXZpY2UgPSAoZnVuY3Rpb24gRGV2aWNlKCkge1xyXG4gICAgICAgIHZhciB1YSA9IHdpbi5uYXZpZ2F0b3IudXNlckFnZW50O1xyXG5cclxuICAgICAgICB2YXIgZGV2aWNlID0ge1xyXG4gICAgICAgICAgICBpb3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBhbmRyb2lkOiBmYWxzZSxcclxuICAgICAgICAgICAgYW5kcm9pZENocm9tZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGRlc2t0b3A6IGZhbHNlLFxyXG4gICAgICAgICAgICB3aW5kb3dzOiBmYWxzZSxcclxuICAgICAgICAgICAgaXBob25lOiBmYWxzZSxcclxuICAgICAgICAgICAgaXBvZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlwYWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb3Jkb3ZhOiB3aW4uY29yZG92YSB8fCB3aW4ucGhvbmVnYXAsXHJcbiAgICAgICAgICAgIHBob25lZ2FwOiB3aW4uY29yZG92YSB8fCB3aW4ucGhvbmVnYXAsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHdpbmRvd3MgPSB1YS5tYXRjaCgvKFdpbmRvd3MgUGhvbmUpOz9bXFxzXFwvXSsoW1xcZC5dKyk/Lyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICB2YXIgYW5kcm9pZCA9IHVhLm1hdGNoKC8oQW5kcm9pZCk7P1tcXHNcXC9dKyhbXFxkLl0rKT8vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIHZhciBpcGFkID0gdWEubWF0Y2goLyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvKTtcclxuICAgICAgICB2YXIgaXBvZCA9IHVhLm1hdGNoKC8oaVBvZCkoLipPU1xccyhbXFxkX10rKSk/Lyk7XHJcbiAgICAgICAgdmFyIGlwaG9uZSA9ICFpcGFkICYmIHVhLm1hdGNoKC8oaVBob25lXFxzT1N8aU9TKVxccyhbXFxkX10rKS8pO1xyXG5cclxuXHJcbiAgICAgICAgLy8gV2luZG93c1xyXG4gICAgICAgIGlmICh3aW5kb3dzKSB7XHJcbiAgICAgICAgICAgIGRldmljZS5vcyA9ICd3aW5kb3dzJztcclxuICAgICAgICAgICAgZGV2aWNlLm9zVmVyc2lvbiA9IHdpbmRvd3NbMl07XHJcbiAgICAgICAgICAgIGRldmljZS53aW5kb3dzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQW5kcm9pZFxyXG4gICAgICAgIGlmIChhbmRyb2lkICYmICF3aW5kb3dzKSB7XHJcbiAgICAgICAgICAgIGRldmljZS5vcyA9ICdhbmRyb2lkJztcclxuICAgICAgICAgICAgZGV2aWNlLm9zVmVyc2lvbiA9IGFuZHJvaWRbMl07XHJcbiAgICAgICAgICAgIGRldmljZS5hbmRyb2lkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGV2aWNlLmFuZHJvaWRDaHJvbWUgPSB1YS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2Nocm9tZScpID49IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpcGFkIHx8IGlwaG9uZSB8fCBpcG9kKSB7XHJcbiAgICAgICAgICAgIGRldmljZS5vcyA9ICdpb3MnO1xyXG4gICAgICAgICAgICBkZXZpY2UuaW9zID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaU9TXHJcbiAgICAgICAgaWYgKGlwaG9uZSAmJiAhaXBvZCkge1xyXG4gICAgICAgICAgICBkZXZpY2Uub3NWZXJzaW9uID0gaXBob25lWzJdLnJlcGxhY2UoL18vZywgJy4nKTtcclxuICAgICAgICAgICAgZGV2aWNlLmlwaG9uZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpcGFkKSB7XHJcbiAgICAgICAgICAgIGRldmljZS5vc1ZlcnNpb24gPSBpcGFkWzJdLnJlcGxhY2UoL18vZywgJy4nKTtcclxuICAgICAgICAgICAgZGV2aWNlLmlwYWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXBvZCkge1xyXG4gICAgICAgICAgICBkZXZpY2Uub3NWZXJzaW9uID0gaXBvZFszXSA/IGlwb2RbM10ucmVwbGFjZSgvXy9nLCAnLicpIDogbnVsbDtcclxuICAgICAgICAgICAgZGV2aWNlLmlwaG9uZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlPUyA4KyBjaGFuZ2VkIFVBXHJcbiAgICAgICAgaWYgKGRldmljZS5pb3MgJiYgZGV2aWNlLm9zVmVyc2lvbiAmJiB1YS5pbmRleE9mKCdWZXJzaW9uLycpID49IDApIHtcclxuICAgICAgICAgICAgaWYgKGRldmljZS5vc1ZlcnNpb24uc3BsaXQoJy4nKVswXSA9PT0gJzEwJykge1xyXG4gICAgICAgICAgICAgICAgZGV2aWNlLm9zVmVyc2lvbiA9IHVhLnRvTG93ZXJDYXNlKCkuc3BsaXQoJ3ZlcnNpb24vJylbMV0uc3BsaXQoJyAnKVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGVza3RvcFxyXG4gICAgICAgIGRldmljZS5kZXNrdG9wID0gIShkZXZpY2Uub3MgfHwgZGV2aWNlLmFuZHJvaWQgfHwgZGV2aWNlLndlYlZpZXcpO1xyXG5cclxuICAgICAgICAvLyBXZWJ2aWV3XHJcbiAgICAgICAgZGV2aWNlLndlYlZpZXcgPSAoaXBob25lIHx8IGlwYWQgfHwgaXBvZCkgJiYgdWEubWF0Y2goLy4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaSk7XHJcblxyXG4gICAgICAgIC8vIE1pbmltYWwgVUlcclxuICAgICAgICBpZiAoZGV2aWNlLm9zICYmIGRldmljZS5vcyA9PT0gJ2lvcycpIHtcclxuICAgICAgICAgICAgdmFyIG9zVmVyc2lvbkFyciA9IGRldmljZS5vc1ZlcnNpb24uc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgdmFyIG1ldGFWaWV3cG9ydCA9IGRvYy5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ2aWV3cG9ydFwiXScpO1xyXG4gICAgICAgICAgICBkZXZpY2UubWluaW1hbFVpID1cclxuICAgICAgICAgICAgICAgICFkZXZpY2Uud2ViVmlldyAmJlxyXG4gICAgICAgICAgICAgICAgKGlwb2QgfHwgaXBob25lKSAmJlxyXG4gICAgICAgICAgICAgICAgKG9zVmVyc2lvbkFyclswXSAqIDEgPT09IDcgPyBvc1ZlcnNpb25BcnJbMV0gKiAxID49IDEgOiBvc1ZlcnNpb25BcnJbMF0gKiAxID4gNykgJiZcclxuICAgICAgICAgICAgICAgIG1ldGFWaWV3cG9ydCAmJiBtZXRhVmlld3BvcnQuZ2V0QXR0cmlidXRlKCdjb250ZW50JykuaW5kZXhPZignbWluaW1hbC11aScpID49IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaXhlbCBSYXRpb1xyXG4gICAgICAgIGRldmljZS5waXhlbFJhdGlvID0gd2luLmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHJcbiAgICAgICAgLy8gRXhwb3J0IG9iamVjdFxyXG4gICAgICAgIHJldHVybiBkZXZpY2U7XHJcbiAgICB9KCkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcclxuICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICB2YXIgdG91Y2hlcyA9IHN3aXBlci50b3VjaGVzO1xyXG4gICAgICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5wcmV2ZW50SW50ZXJjYXRpb25PblRyYW5zaXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZSA9IGV2ZW50O1xyXG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIHsgZSA9IGUub3JpZ2luYWxFdmVudDsgfVxyXG4gICAgICAgIGRhdGEuaXNUb3VjaEV2ZW50ID0gZS50eXBlID09PSAndG91Y2hzdGFydCc7XHJcbiAgICAgICAgaWYgKCFkYXRhLmlzVG91Y2hFdmVudCAmJiAnd2hpY2gnIGluIGUgJiYgZS53aGljaCA9PT0gMykgeyByZXR1cm47IH1cclxuICAgICAgICBpZiAoZGF0YS5pc1RvdWNoZWQgJiYgZGF0YS5pc01vdmVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGlmIChwYXJhbXMubm9Td2lwaW5nICYmICQoZS50YXJnZXQpLmNsb3Nlc3QocGFyYW1zLm5vU3dpcGluZ1NlbGVjdG9yID8gcGFyYW1zLm5vU3dpcGluZ1NlbGVjdG9yIDogKFwiLlwiICsgKHBhcmFtcy5ub1N3aXBpbmdDbGFzcykpKVswXSkge1xyXG4gICAgICAgICAgICBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmFtcy5zd2lwZUhhbmRsZXIpIHtcclxuICAgICAgICAgICAgaWYgKCEkKGUpLmNsb3Nlc3QocGFyYW1zLnN3aXBlSGFuZGxlcilbMF0pIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b3VjaGVzLmN1cnJlbnRYID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xyXG4gICAgICAgIHRvdWNoZXMuY3VycmVudFkgPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XHJcbiAgICAgICAgdmFyIHN0YXJ0WCA9IHRvdWNoZXMuY3VycmVudFg7XHJcbiAgICAgICAgdmFyIHN0YXJ0WSA9IHRvdWNoZXMuY3VycmVudFk7XHJcblxyXG4gICAgICAgIC8vIERvIE5PVCBzdGFydCBpZiBpT1MgZWRnZSBzd2lwZSBpcyBkZXRlY3RlZC4gT3RoZXJ3aXNlIGlPUyBhcHAgKFVJV2ViVmlldykgY2Fubm90IHN3aXBlLXRvLWdvLWJhY2sgYW55bW9yZVxyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIERldmljZS5pb3MgJiZcclxuICAgICAgICAgICAgIURldmljZS5jb3Jkb3ZhICYmXHJcbiAgICAgICAgICAgIHBhcmFtcy5pT1NFZGdlU3dpcGVEZXRlY3Rpb24gJiZcclxuICAgICAgICAgICAgKChzdGFydFggPD0gcGFyYW1zLmlPU0VkZ2VTd2lwZVRocmVzaG9sZCkgfHxcclxuICAgICAgICAgICAgICAgIChzdGFydFggPj0gd2luLnNjcmVlbi53aWR0aCAtIHBhcmFtcy5pT1NFZGdlU3dpcGVUaHJlc2hvbGQpKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBVdGlscy5leHRlbmQoZGF0YSwge1xyXG4gICAgICAgICAgICBpc1RvdWNoZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGlzTW92ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzOiB0cnVlLFxyXG4gICAgICAgICAgICBpc1Njcm9sbGluZzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzdGFydE1vdmluZzogdW5kZWZpbmVkLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0b3VjaGVzLnN0YXJ0WCA9IHN0YXJ0WDtcclxuICAgICAgICB0b3VjaGVzLnN0YXJ0WSA9IHN0YXJ0WTtcclxuICAgICAgICBkYXRhLnRvdWNoU3RhcnRUaW1lID0gVXRpbHMubm93KCk7XHJcbiAgICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xyXG4gICAgICAgIHN3aXBlci51cGRhdGVTaXplKCk7XHJcbiAgICAgICAgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkgeyBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoc3RhcnQnKSB7XHJcbiAgICAgICAgICAgIHZhciBwcmV2ZW50RGVmYXVsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyhkYXRhLmZvcm1FbGVtZW50cykpIHsgcHJldmVudERlZmF1bHQgPSBmYWxzZTsgfVxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBkb2MuYWN0aXZlRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgJChkb2MuYWN0aXZlRWxlbWVudCkuaXMoZGF0YS5mb3JtRWxlbWVudHMpICYmXHJcbiAgICAgICAgICAgICAgICBkb2MuYWN0aXZlRWxlbWVudCAhPT0gZS50YXJnZXRcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBkb2MuYWN0aXZlRWxlbWVudC5ibHVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZXZlbnREZWZhdWx0ICYmIHN3aXBlci5hbGxvd1RvdWNoTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXBlci5lbWl0KCd0b3VjaFN0YXJ0JywgZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25Ub3VjaE1vdmUoZXZlbnQpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBzd2lwZXIudG91Y2hlcztcclxuICAgICAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50O1xyXG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIHsgZSA9IGUub3JpZ2luYWxFdmVudDsgfVxyXG4gICAgICAgIGlmICghZGF0YS5pc1RvdWNoZWQpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhcnRNb3ZpbmcgJiYgZGF0YS5pc1Njcm9sbGluZykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZU9wcG9zaXRlJywgZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5pc1RvdWNoRXZlbnQgJiYgZS50eXBlID09PSAnbW91c2Vtb3ZlJykgeyByZXR1cm47IH1cclxuICAgICAgICB2YXIgcGFnZVggPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcclxuICAgICAgICB2YXIgcGFnZVkgPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcclxuICAgICAgICBpZiAoZS5wcmV2ZW50ZWRCeU5lc3RlZFN3aXBlcikge1xyXG4gICAgICAgICAgICB0b3VjaGVzLnN0YXJ0WCA9IHBhZ2VYO1xyXG4gICAgICAgICAgICB0b3VjaGVzLnN0YXJ0WSA9IHBhZ2VZO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc3dpcGVyLmFsbG93VG91Y2hNb3ZlKSB7XHJcbiAgICAgICAgICAgIC8vIGlzTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5pc1RvdWNoZWQpIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmV4dGVuZCh0b3VjaGVzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRYOiBwYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFk6IHBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRYOiBwYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WTogcGFnZVksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRhdGEudG91Y2hTdGFydFRpbWUgPSBVdGlscy5ub3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLmlzVG91Y2hFdmVudCAmJiBwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcyAmJiAhcGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5pc1ZlcnRpY2FsKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFZlcnRpY2FsXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgKHBhZ2VZIDwgdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKHBhZ2VZID4gdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIChwYWdlWCA8IHRvdWNoZXMuc3RhcnRYICYmIHN3aXBlci50cmFuc2xhdGUgPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB8fFxyXG4gICAgICAgICAgICAgICAgKHBhZ2VYID4gdG91Y2hlcy5zdGFydFggJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLmlzVG91Y2hFdmVudCAmJiBkb2MuYWN0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IGRvYy5hY3RpdmVFbGVtZW50ICYmICQoZS50YXJnZXQpLmlzKGRhdGEuZm9ybUVsZW1lbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5pc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgndG91Y2hNb3ZlJywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDEpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIHRvdWNoZXMuY3VycmVudFggPSBwYWdlWDtcclxuICAgICAgICB0b3VjaGVzLmN1cnJlbnRZID0gcGFnZVk7XHJcblxyXG4gICAgICAgIHZhciBkaWZmWCA9IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnN0YXJ0WDtcclxuICAgICAgICB2YXIgZGlmZlkgPSB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS5pc1Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdmFyIHRvdWNoQW5nbGU7XHJcbiAgICAgICAgICAgIGlmICgoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIHRvdWNoZXMuY3VycmVudFkgPT09IHRvdWNoZXMuc3RhcnRZKSB8fCAoc3dpcGVyLmlzVmVydGljYWwoKSAmJiB0b3VjaGVzLmN1cnJlbnRYID09PSB0b3VjaGVzLnN0YXJ0WCkpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuaXNTY3JvbGxpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICAgICAgaWYgKChkaWZmWCAqIGRpZmZYKSArIChkaWZmWSAqIGRpZmZZKSA+PSAyNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoQW5nbGUgPSAoTWF0aC5hdGFuMihNYXRoLmFicyhkaWZmWSksIE1hdGguYWJzKGRpZmZYKSkgKiAxODApIC8gTWF0aC5QSTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmlzU2Nyb2xsaW5nID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hBbmdsZSA+IHBhcmFtcy50b3VjaEFuZ2xlIDogKDkwIC0gdG91Y2hBbmdsZSA+IHBhcmFtcy50b3VjaEFuZ2xlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5pc1Njcm9sbGluZykge1xyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgndG91Y2hNb3ZlT3Bwb3NpdGUnLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydE1vdmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaWYgKHRvdWNoZXMuY3VycmVudFggIT09IHRvdWNoZXMuc3RhcnRYIHx8IHRvdWNoZXMuY3VycmVudFkgIT09IHRvdWNoZXMuc3RhcnRZKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnN0YXJ0TW92aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5pc1Njcm9sbGluZykge1xyXG4gICAgICAgICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGF0YS5zdGFydE1vdmluZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChwYXJhbXMudG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uICYmICFwYXJhbXMubmVzdGVkKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWRhdGEuaXNNb3ZlZCkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKTtcclxuICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC50cmlnZ2VyKCd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gR3JhYiBDdXJzb3JcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5ncmFiQ3Vyc29yICYmIChzd2lwZXIuYWxsb3dTbGlkZU5leHQgPT09IHRydWUgfHwgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlckZpcnN0TW92ZScsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVyTW92ZScsIGUpO1xyXG4gICAgICAgIGRhdGEuaXNNb3ZlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBkaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gZGlmZlggOiBkaWZmWTtcclxuICAgICAgICB0b3VjaGVzLmRpZmYgPSBkaWZmO1xyXG5cclxuICAgICAgICBkaWZmICo9IHBhcmFtcy50b3VjaFJhdGlvO1xyXG4gICAgICAgIGlmIChydGwpIHsgZGlmZiA9IC1kaWZmOyB9XHJcblxyXG4gICAgICAgIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9IGRpZmYgPiAwID8gJ3ByZXYnIDogJ25leHQnO1xyXG4gICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRpZmYgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xyXG5cclxuICAgICAgICB2YXIgZGlzYWJsZVBhcmVudFN3aXBlciA9IHRydWU7XHJcbiAgICAgICAgdmFyIHJlc2lzdGFuY2VSYXRpbyA9IHBhcmFtcy5yZXNpc3RhbmNlUmF0aW87XHJcbiAgICAgICAgaWYgKHBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzKSB7XHJcbiAgICAgICAgICAgIHJlc2lzdGFuY2VSYXRpbyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoZGlmZiA+IDAgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSkge1xyXG4gICAgICAgICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkgeyBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSAoc3dpcGVyLm1pblRyYW5zbGF0ZSgpIC0gMSkgKyAoTWF0aC5wb3coKC1zd2lwZXIubWluVHJhbnNsYXRlKCkgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlICsgZGlmZiksIHJlc2lzdGFuY2VSYXRpbykpOyB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaWZmIDwgMCAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcclxuICAgICAgICAgICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnJlc2lzdGFuY2UpIHsgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gKHN3aXBlci5tYXhUcmFuc2xhdGUoKSArIDEpIC0gKE1hdGgucG93KChzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBkYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZiksIHJlc2lzdGFuY2VSYXRpbykpOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGlzYWJsZVBhcmVudFN3aXBlcikge1xyXG4gICAgICAgICAgICBlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERpcmVjdGlvbnMgbG9ja3NcclxuICAgICAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBkYXRhLnN0YXJ0VHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA+IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyBUaHJlc2hvbGRcclxuICAgICAgICBpZiAocGFyYW1zLnRocmVzaG9sZCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpZmYpID4gcGFyYW1zLnRocmVzaG9sZCB8fCBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzLnN0YXJ0WCA9IHRvdWNoZXMuY3VycmVudFg7XHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlcy5zdGFydFkgPSB0b3VjaGVzLmN1cnJlbnRZO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlcy5kaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMuc3RhcnRYIDogdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMuc3RhcnRZO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghcGFyYW1zLmZvbGxvd0ZpbmdlcikgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIGFjdGl2ZSBpbmRleCBpbiBmcmVlIG1vZGVcclxuICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcclxuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XHJcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGUpIHtcclxuICAgICAgICAgICAgLy8gVmVsb2NpdHlcclxuICAgICAgICAgICAgaWYgKGRhdGEudmVsb2NpdGllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGRhdGEudmVsb2NpdGllcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogdG91Y2hlc1tzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnc3RhcnRYJyA6ICdzdGFydFknXSxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBkYXRhLnRvdWNoU3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS52ZWxvY2l0aWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHRvdWNoZXNbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2N1cnJlbnRYJyA6ICdjdXJyZW50WSddLFxyXG4gICAgICAgICAgICAgICAgdGltZTogVXRpbHMubm93KCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBVcGRhdGUgcHJvZ3Jlc3NcclxuICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTtcclxuICAgICAgICAvLyBVcGRhdGUgdHJhbnNsYXRlXHJcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShkYXRhLmN1cnJlbnRUcmFuc2xhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uVG91Y2hFbmQoZXZlbnQpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XHJcblxyXG4gICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xyXG4gICAgICAgIHZhciB0b3VjaGVzID0gc3dpcGVyLnRvdWNoZXM7XHJcbiAgICAgICAgdmFyIHJ0bCA9IHN3aXBlci5ydGxUcmFuc2xhdGU7XHJcbiAgICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcclxuICAgICAgICB2YXIgc2xpZGVzR3JpZCA9IHN3aXBlci5zbGlkZXNHcmlkO1xyXG4gICAgICAgIHZhciBzbmFwR3JpZCA9IHN3aXBlci5zbmFwR3JpZDtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50O1xyXG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIHsgZSA9IGUub3JpZ2luYWxFdmVudDsgfVxyXG4gICAgICAgIGlmIChkYXRhLmFsbG93VG91Y2hDYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoRW5kJywgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghZGF0YS5pc1RvdWNoZWQpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaXNNb3ZlZCAmJiBwYXJhbXMuZ3JhYkN1cnNvcikge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0TW92aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmV0dXJuIEdyYWIgQ3Vyc29yXHJcbiAgICAgICAgaWYgKHBhcmFtcy5ncmFiQ3Vyc29yICYmIGRhdGEuaXNNb3ZlZCAmJiBkYXRhLmlzVG91Y2hlZCAmJiAoc3dpcGVyLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlIHx8IHN3aXBlci5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkpIHtcclxuICAgICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGltZSBkaWZmXHJcbiAgICAgICAgdmFyIHRvdWNoRW5kVGltZSA9IFV0aWxzLm5vdygpO1xyXG4gICAgICAgIHZhciB0aW1lRGlmZiA9IHRvdWNoRW5kVGltZSAtIGRhdGEudG91Y2hTdGFydFRpbWU7XHJcblxyXG4gICAgICAgIC8vIFRhcCwgZG91YmxlVGFwLCBDbGlja1xyXG4gICAgICAgIGlmIChzd2lwZXIuYWxsb3dDbGljaykge1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlQ2xpY2tlZFNsaWRlKGUpO1xyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgndGFwJywgZSk7XHJcbiAgICAgICAgICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiAodG91Y2hFbmRUaW1lIC0gZGF0YS5sYXN0Q2xpY2tUaW1lKSA+IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY2xpY2tUaW1lb3V0KSB7IGNsZWFyVGltZW91dChkYXRhLmNsaWNrVGltZW91dCk7IH1cclxuICAgICAgICAgICAgICAgIGRhdGEuY2xpY2tUaW1lb3V0ID0gVXRpbHMubmV4dFRpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2NsaWNrJywgZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiAodG91Y2hFbmRUaW1lIC0gZGF0YS5sYXN0Q2xpY2tUaW1lKSA8IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY2xpY2tUaW1lb3V0KSB7IGNsZWFyVGltZW91dChkYXRhLmNsaWNrVGltZW91dCk7IH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdkb3VibGVUYXAnLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5sYXN0Q2xpY2tUaW1lID0gVXRpbHMubm93KCk7XHJcbiAgICAgICAgVXRpbHMubmV4dFRpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5kZXN0cm95ZWQpIHsgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlOyB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YS5pc1RvdWNoZWQgfHwgIWRhdGEuaXNNb3ZlZCB8fCAhc3dpcGVyLnN3aXBlRGlyZWN0aW9uIHx8IHRvdWNoZXMuZGlmZiA9PT0gMCB8fCBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPT09IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcclxuICAgICAgICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRQb3M7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5mb2xsb3dGaW5nZXIpIHtcclxuICAgICAgICAgICAgY3VycmVudFBvcyA9IHJ0bCA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXJyZW50UG9zID0gLWRhdGEuY3VycmVudFRyYW5zbGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3MgPCAtc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQb3MgPiAtc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnNsaWRlcy5sZW5ndGggPCBzbmFwR3JpZC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbmFwR3JpZC5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5mcmVlTW9kZU1vbWVudHVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS52ZWxvY2l0aWVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdE1vdmVFdmVudCA9IGRhdGEudmVsb2NpdGllcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmVsb2NpdHlFdmVudCA9IGRhdGEudmVsb2NpdGllcy5wb3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gbGFzdE1vdmVFdmVudC5wb3NpdGlvbiAtIHZlbG9jaXR5RXZlbnQucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWUgPSBsYXN0TW92ZUV2ZW50LnRpbWUgLSB2ZWxvY2l0eUV2ZW50LnRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ID0gZGlzdGFuY2UgLyB0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSAvPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhzd2lwZXIudmVsb2NpdHkpIDwgcGFyYW1zLmZyZWVNb2RlTWluaW11bVZlbG9jaXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaW1wbGllcyB0aGF0IHRoZSB1c2VyIHN0b3BwZWQgbW92aW5nIGEgZmluZ2VyIHRoZW4gcmVsZWFzZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmUgd291bGQgYmUgbm8gZXZlbnRzIHdpdGggZGlzdGFuY2UgemVybywgc28gdGhlIGxhc3QgZXZlbnQgaXMgc3RhbGUuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWUgPiAxNTAgfHwgKFV0aWxzLm5vdygpIC0gbGFzdE1vdmVFdmVudC50aW1lKSA+IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIudmVsb2NpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSAqPSBwYXJhbXMuZnJlZU1vZGVNb21lbnR1bVZlbG9jaXR5UmF0aW87XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS52ZWxvY2l0aWVzLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9tZW50dW1EdXJhdGlvbiA9IDEwMDAgKiBwYXJhbXMuZnJlZU1vZGVNb21lbnR1bVJhdGlvO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vbWVudHVtRGlzdGFuY2UgPSBzd2lwZXIudmVsb2NpdHkgKiBtb21lbnR1bUR1cmF0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvbiA9IHN3aXBlci50cmFuc2xhdGUgKyBtb21lbnR1bURpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJ0bCkgeyBuZXdQb3NpdGlvbiA9IC1uZXdQb3NpdGlvbjsgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkb0JvdW5jZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFmdGVyQm91bmNlUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB2YXIgYm91bmNlQW1vdW50ID0gTWF0aC5hYnMoc3dpcGVyLnZlbG9jaXR5KSAqIDIwICogcGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2VSYXRpbztcclxuICAgICAgICAgICAgICAgIHZhciBuZWVkc0xvb3BGaXg7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3UG9zaXRpb24gPCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uICsgc3dpcGVyLm1heFRyYW5zbGF0ZSgpIDwgLWJvdW5jZUFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBib3VuY2VBbW91bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXJCb3VuY2VQb3NpdGlvbiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9Cb3VuY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxvb3AgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7IG5lZWRzTG9vcEZpeCA9IHRydWU7IH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3UG9zaXRpb24gPiBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpID4gYm91bmNlQW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKSArIGJvdW5jZUFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZnRlckJvdW5jZVBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb0JvdW5jZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYWxsb3dNb21lbnR1bUJvdW5jZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubG9vcCAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHsgbmVlZHNMb29wRml4ID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFNsaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc25hcEdyaWQubGVuZ3RoOyBqICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNuYXBHcmlkW2pdID4gLW5ld1Bvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGUgPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhzbmFwR3JpZFtuZXh0U2xpZGVdIC0gbmV3UG9zaXRpb24pIDwgTWF0aC5hYnMoc25hcEdyaWRbbmV4dFNsaWRlIC0gMV0gLSBuZXdQb3NpdGlvbikgfHwgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzbmFwR3JpZFtuZXh0U2xpZGVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc25hcEdyaWRbbmV4dFNsaWRlIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gLW5ld1Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5lZWRzTG9vcEZpeCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5vbmNlKCd0cmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gRml4IGR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnZlbG9jaXR5ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJ0bCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5hYnMoKC1uZXdQb3NpdGlvbiAtIHN3aXBlci50cmFuc2xhdGUpIC8gc3dpcGVyLnZlbG9jaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uIC0gc3dpcGVyLnRyYW5zbGF0ZSkgLyBzd2lwZXIudmVsb2NpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmZyZWVNb2RlU3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZSAmJiBkb0JvdW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhhZnRlckJvdW5jZVBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1Bvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHRydWUsIHN3aXBlci5zd2lwZURpcmVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhZGF0YS5hbGxvd01vbWVudHVtQm91bmNlKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIuZW1pdCgnbW9tZW50dW1Cb3VuY2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHBhcmFtcy5zcGVlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci52ZWxvY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhuZXdQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydCh0cnVlLCBzd2lwZXIuc3dpcGVEaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLmFuaW1hdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhuZXdQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghcGFyYW1zLmZyZWVNb2RlTW9tZW50dW0gfHwgdGltZURpZmYgPj0gcGFyYW1zLmxvbmdTd2lwZXNNcykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluZCBjdXJyZW50IHNsaWRlXHJcbiAgICAgICAgdmFyIHN0b3BJbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIGdyb3VwU2l6ZSA9IHN3aXBlci5zbGlkZXNTaXplc0dyaWRbMF07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXApIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXBdICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3MgPj0gc2xpZGVzR3JpZFtpXSAmJiBjdXJyZW50UG9zIDwgc2xpZGVzR3JpZFtpICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3BJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtpICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwXSAtIHNsaWRlc0dyaWRbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9wSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDFdIC0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5kIGN1cnJlbnQgc2xpZGUgc2l6ZVxyXG4gICAgICAgIHZhciByYXRpbyA9IChjdXJyZW50UG9zIC0gc2xpZGVzR3JpZFtzdG9wSW5kZXhdKSAvIGdyb3VwU2l6ZTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVEaWZmID4gcGFyYW1zLmxvbmdTd2lwZXNNcykge1xyXG4gICAgICAgICAgICAvLyBMb25nIHRvdWNoZXNcclxuICAgICAgICAgICAgaWYgKCFwYXJhbXMubG9uZ1N3aXBlcykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyYXRpbyA+PSBwYXJhbXMubG9uZ1N3aXBlc1JhdGlvKSB7IHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCArIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7IH1cclxuICAgICAgICAgICAgICAgIGVsc2UgeyBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmF0aW8gPiAoMSAtIHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pKSB7IHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCArIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7IH1cclxuICAgICAgICAgICAgICAgIGVsc2UgeyBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBTaG9ydCBzd2lwZXNcclxuICAgICAgICAgICAgaWYgKCFwYXJhbXMuc2hvcnRTd2lwZXMpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICdwcmV2Jykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvblJlc2l6ZSgpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyIGVsID0gc3dpcGVyLmVsO1xyXG5cclxuICAgICAgICBpZiAoZWwgJiYgZWwub2Zmc2V0V2lkdGggPT09IDApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIEJyZWFrcG9pbnRzXHJcbiAgICAgICAgaWYgKHBhcmFtcy5icmVha3BvaW50cykge1xyXG4gICAgICAgICAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2F2ZSBsb2Nrc1xyXG4gICAgICAgIHZhciBhbGxvd1NsaWRlTmV4dCA9IHN3aXBlci5hbGxvd1NsaWRlTmV4dDtcclxuICAgICAgICB2YXIgYWxsb3dTbGlkZVByZXYgPSBzd2lwZXIuYWxsb3dTbGlkZVByZXY7XHJcbiAgICAgICAgdmFyIHNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkO1xyXG5cclxuICAgICAgICAvLyBEaXNhYmxlIGxvY2tzIG9uIHJlc2l6ZVxyXG4gICAgICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IHRydWU7XHJcbiAgICAgICAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcclxuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGUpIHtcclxuICAgICAgICAgICAgdmFyIG5ld1RyYW5zbGF0ZSA9IE1hdGgubWluKE1hdGgubWF4KHN3aXBlci50cmFuc2xhdGUsIHN3aXBlci5tYXhUcmFuc2xhdGUoKSksIHN3aXBlci5taW5UcmFuc2xhdGUoKSk7XHJcbiAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcclxuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XHJcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xyXG4gICAgICAgICAgICBpZiAoKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgfHwgcGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSAmJiBzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSwgMCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmV0dXJuIGxvY2tzIGFmdGVyIHJlc2l6ZVxyXG4gICAgICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xyXG4gICAgICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xyXG5cclxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHNuYXBHcmlkICE9PSBzd2lwZXIuc25hcEdyaWQpIHtcclxuICAgICAgICAgICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25DbGljayhlKSB7XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFzd2lwZXIuYWxsb3dDbGljaykge1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmV2ZW50Q2xpY2tzKSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24gJiYgc3dpcGVyLmFuaW1hdGluZykge1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXR0YWNoRXZlbnRzKCkge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xyXG4gICAgICAgIHZhciB0b3VjaEV2ZW50cyA9IHN3aXBlci50b3VjaEV2ZW50cztcclxuICAgICAgICB2YXIgZWwgPSBzd2lwZXIuZWw7XHJcbiAgICAgICAgdmFyIHdyYXBwZXJFbCA9IHN3aXBlci53cmFwcGVyRWw7XHJcblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpcGVyLm9uVG91Y2hTdGFydCA9IG9uVG91Y2hTdGFydC5iaW5kKHN3aXBlcik7XHJcbiAgICAgICAgICAgIHN3aXBlci5vblRvdWNoTW92ZSA9IG9uVG91Y2hNb3ZlLmJpbmQoc3dpcGVyKTtcclxuICAgICAgICAgICAgc3dpcGVyLm9uVG91Y2hFbmQgPSBvblRvdWNoRW5kLmJpbmQoc3dpcGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXBlci5vbkNsaWNrID0gb25DbGljay5iaW5kKHN3aXBlcik7XHJcblxyXG4gICAgICAgIHZhciB0YXJnZXQgPSBwYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09ICdjb250YWluZXInID8gZWwgOiB3cmFwcGVyRWw7XHJcbiAgICAgICAgdmFyIGNhcHR1cmUgPSAhIXBhcmFtcy5uZXN0ZWQ7XHJcblxyXG4gICAgICAgIC8vIFRvdWNoIEV2ZW50c1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFTdXBwb3J0LnRvdWNoICYmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMgfHwgU3VwcG9ydC5wcmVmaXhlZFBvaW50ZXJFdmVudHMpKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgc3dpcGVyLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMubW92ZSwgc3dpcGVyLm9uVG91Y2hNb3ZlLCBjYXB0dXJlKTtcclxuICAgICAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgc3dpcGVyLm9uVG91Y2hFbmQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChTdXBwb3J0LnRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhc3NpdmVMaXN0ZW5lciA9IHRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgc3dpcGVyLm9uVG91Y2hTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIub25Ub3VjaE1vdmUsIFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyID8geyBwYXNzaXZlOiBmYWxzZSwgY2FwdHVyZTogY2FwdHVyZSB9IDogY2FwdHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCBzd2lwZXIub25Ub3VjaEVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgocGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgIURldmljZS5pb3MgJiYgIURldmljZS5hbmRyb2lkKSB8fCAocGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgIVN1cHBvcnQudG91Y2ggJiYgRGV2aWNlLmlvcykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3dpcGVyLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3dpcGVyLm9uVG91Y2hFbmQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBQcmV2ZW50IExpbmtzIENsaWNrc1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnByZXZlbnRDbGlja3MgfHwgcGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpcGVyLm9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNpemUgaGFuZGxlclxyXG4gICAgICAgIHN3aXBlci5vbigoRGV2aWNlLmlvcyB8fCBEZXZpY2UuYW5kcm9pZCA/ICdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2Ugb2JzZXJ2ZXJVcGRhdGUnIDogJ3Jlc2l6ZSBvYnNlcnZlclVwZGF0ZScpLCBvblJlc2l6ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGV0YWNoRXZlbnRzKCkge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICB2YXIgdG91Y2hFdmVudHMgPSBzd2lwZXIudG91Y2hFdmVudHM7XHJcbiAgICAgICAgdmFyIGVsID0gc3dpcGVyLmVsO1xyXG4gICAgICAgIHZhciB3cmFwcGVyRWwgPSBzd2lwZXIud3JhcHBlckVsO1xyXG5cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gcGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnY29udGFpbmVyJyA/IGVsIDogd3JhcHBlckVsO1xyXG4gICAgICAgIHZhciBjYXB0dXJlID0gISFwYXJhbXMubmVzdGVkO1xyXG5cclxuICAgICAgICAvLyBUb3VjaCBFdmVudHNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghU3VwcG9ydC50b3VjaCAmJiAoU3VwcG9ydC5wb2ludGVyRXZlbnRzIHx8IFN1cHBvcnQucHJlZml4ZWRQb2ludGVyRXZlbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuc3RhcnQsIHN3aXBlci5vblRvdWNoU3RhcnQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHN3aXBlci5vblRvdWNoTW92ZSwgY2FwdHVyZSk7XHJcbiAgICAgICAgICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHN3aXBlci5vblRvdWNoRW5kLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoU3VwcG9ydC50b3VjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSB0b3VjaEV2ZW50cy5zdGFydCA9PT0gJ29uVG91Y2hTdGFydCcgJiYgU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgc3dpcGVyLm9uVG91Y2hTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgc3dpcGVyLm9uVG91Y2hFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFEZXZpY2UuaW9zICYmICFEZXZpY2UuYW5kcm9pZCkgfHwgKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFTdXBwb3J0LnRvdWNoICYmIERldmljZS5pb3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN3aXBlci5vblRvdWNoU3RhcnQsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc3dpcGVyLm9uVG91Y2hNb3ZlLCBjYXB0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN3aXBlci5vblRvdWNoRW5kLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gUHJldmVudCBMaW5rcyBDbGlja3NcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN3aXBlci5vbkNsaWNrLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzaXplIGhhbmRsZXJcclxuICAgICAgICBzd2lwZXIub2ZmKChEZXZpY2UuaW9zIHx8IERldmljZS5hbmRyb2lkID8gJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZSBvYnNlcnZlclVwZGF0ZScgOiAncmVzaXplIG9ic2VydmVyVXBkYXRlJyksIG9uUmVzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZXZlbnRzID0ge1xyXG4gICAgICAgIGF0dGFjaEV2ZW50czogYXR0YWNoRXZlbnRzLFxyXG4gICAgICAgIGRldGFjaEV2ZW50czogZGV0YWNoRXZlbnRzLFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBzZXRCcmVha3BvaW50KCkge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcclxuICAgICAgICB2YXIgaW5pdGlhbGl6ZWQgPSBzd2lwZXIuaW5pdGlhbGl6ZWQ7XHJcbiAgICAgICAgdmFyIGxvb3BlZFNsaWRlcyA9IHN3aXBlci5sb29wZWRTbGlkZXM7IGlmIChsb29wZWRTbGlkZXMgPT09IHZvaWQgMCkgbG9vcGVkU2xpZGVzID0gMDtcclxuICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICB2YXIgYnJlYWtwb2ludHMgPSBwYXJhbXMuYnJlYWtwb2ludHM7XHJcbiAgICAgICAgaWYgKCFicmVha3BvaW50cyB8fCAoYnJlYWtwb2ludHMgJiYgT2JqZWN0LmtleXMoYnJlYWtwb2ludHMpLmxlbmd0aCA9PT0gMCkpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgLy8gU2V0IGJyZWFrcG9pbnQgZm9yIHdpbmRvdyB3aWR0aCBhbmQgdXBkYXRlIHBhcmFtZXRlcnNcclxuICAgICAgICB2YXIgYnJlYWtwb2ludCA9IHN3aXBlci5nZXRCcmVha3BvaW50KGJyZWFrcG9pbnRzKTtcclxuICAgICAgICBpZiAoYnJlYWtwb2ludCAmJiBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgIT09IGJyZWFrcG9pbnQpIHtcclxuICAgICAgICAgICAgdmFyIGJyZWFrUG9pbnRzUGFyYW1zID0gYnJlYWtwb2ludCBpbiBicmVha3BvaW50cyA/IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdIDogc3dpcGVyLm9yaWdpbmFsUGFyYW1zO1xyXG4gICAgICAgICAgICB2YXIgbmVlZHNSZUxvb3AgPSBwYXJhbXMubG9vcCAmJiAoYnJlYWtQb2ludHNQYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gcGFyYW1zLnNsaWRlc1BlclZpZXcpO1xyXG5cclxuICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5wYXJhbXMsIGJyZWFrUG9pbnRzUGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBzd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dTbGlkZU5leHQ6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZU5leHQsXHJcbiAgICAgICAgICAgICAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldixcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgPSBicmVha3BvaW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKG5lZWRzUmVMb29wICYmIGluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbygoYWN0aXZlSW5kZXggLSBsb29wZWRTbGlkZXMpICsgc3dpcGVyLmxvb3BlZFNsaWRlcywgMCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdicmVha3BvaW50JywgYnJlYWtQb2ludHNQYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRCcmVha3BvaW50KGJyZWFrcG9pbnRzKSB7XHJcbiAgICAgICAgLy8gR2V0IGJyZWFrcG9pbnQgZm9yIHdpbmRvdyB3aWR0aFxyXG4gICAgICAgIGlmICghYnJlYWtwb2ludHMpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxyXG4gICAgICAgIHZhciBicmVha3BvaW50ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9IFtdO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzKS5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xyXG4gICAgICAgICAgICBwb2ludHMucHVzaChwb2ludCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcG9pbnRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIHBhcnNlSW50KGEsIDEwKSAtIHBhcnNlSW50KGIsIDEwKTsgfSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgdmFyIHBvaW50ID0gcG9pbnRzW2ldO1xyXG4gICAgICAgICAgICBpZiAocG9pbnQgPj0gd2luLmlubmVyV2lkdGggJiYgIWJyZWFrcG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQgPSBwb2ludDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYnJlYWtwb2ludCB8fCAnbWF4JztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYnJlYWtwb2ludHMgPSB7IHNldEJyZWFrcG9pbnQ6IHNldEJyZWFrcG9pbnQsIGdldEJyZWFrcG9pbnQ6IGdldEJyZWFrcG9pbnQgfTtcclxuXHJcbiAgICB2YXIgQnJvd3NlciA9IChmdW5jdGlvbiBCcm93c2VyKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xyXG4gICAgICAgICAgICB2YXIgdWEgPSB3aW4ubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gKHVhLmluZGV4T2YoJ3NhZmFyaScpID49IDAgJiYgdWEuaW5kZXhPZignY2hyb21lJykgPCAwICYmIHVhLmluZGV4T2YoJ2FuZHJvaWQnKSA8IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc0lFOiAhIXdpbi5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50L2cpIHx8ICEhd2luLm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL01TSUUvZyksXHJcbiAgICAgICAgICAgIGlzU2FmYXJpOiBpc1NhZmFyaSgpLFxyXG4gICAgICAgICAgICBpc1VpV2ViVmlldzogLyhpUGhvbmV8aVBvZHxpUGFkKS4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaS50ZXN0KHdpbi5uYXZpZ2F0b3IudXNlckFnZW50KSxcclxuICAgICAgICB9O1xyXG4gICAgfSgpKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDbGFzc2VzKCkge1xyXG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjbGFzc05hbWVzID0gc3dpcGVyLmNsYXNzTmFtZXM7XHJcbiAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgdmFyIHJ0bCA9IHN3aXBlci5ydGw7XHJcbiAgICAgICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XHJcbiAgICAgICAgdmFyIHN1ZmZpeGVzID0gW107XHJcblxyXG4gICAgICAgIHN1ZmZpeGVzLnB1c2gocGFyYW1zLmRpcmVjdGlvbik7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGUpIHtcclxuICAgICAgICAgICAgc3VmZml4ZXMucHVzaCgnZnJlZS1tb2RlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghU3VwcG9ydC5mbGV4Ym94KSB7XHJcbiAgICAgICAgICAgIHN1ZmZpeGVzLnB1c2goJ25vLWZsZXhib3gnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHN1ZmZpeGVzLnB1c2goJ2F1dG9oZWlnaHQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJ0bCkge1xyXG4gICAgICAgICAgICBzdWZmaXhlcy5wdXNoKCdydGwnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XHJcbiAgICAgICAgICAgIHN1ZmZpeGVzLnB1c2goJ211bHRpcm93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChEZXZpY2UuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBzdWZmaXhlcy5wdXNoKCdhbmRyb2lkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChEZXZpY2UuaW9zKSB7XHJcbiAgICAgICAgICAgIHN1ZmZpeGVzLnB1c2goJ2lvcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBXUDggVG91Y2ggRXZlbnRzIEZpeFxyXG4gICAgICAgIGlmIChCcm93c2VyLmlzSUUgJiYgKFN1cHBvcnQucG9pbnRlckV2ZW50cyB8fCBTdXBwb3J0LnByZWZpeGVkUG9pbnRlckV2ZW50cykpIHtcclxuICAgICAgICAgICAgc3VmZml4ZXMucHVzaCgoXCJ3cDgtXCIgKyAocGFyYW1zLmRpcmVjdGlvbikpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1ZmZpeGVzLmZvckVhY2goZnVuY3Rpb24gKHN1ZmZpeCkge1xyXG4gICAgICAgICAgICBjbGFzc05hbWVzLnB1c2gocGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyBzdWZmaXgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkZWwuYWRkQ2xhc3MoY2xhc3NOYW1lcy5qb2luKCcgJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMoKSB7XHJcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZXMgPSBzd2lwZXIuY2xhc3NOYW1lcztcclxuXHJcbiAgICAgICAgJGVsLnJlbW92ZUNsYXNzKGNsYXNzTmFtZXMuam9pbignICcpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xhc3NlcyA9IHsgYWRkQ2xhc3NlczogYWRkQ2xhc3NlcywgcmVtb3ZlQ2xhc3NlczogcmVtb3ZlQ2xhc3NlcyB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWRJbWFnZShpbWFnZUVsLCBzcmMsIHNyY3NldCwgc2l6ZXMsIGNoZWNrRm9yQ29tcGxldGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGltYWdlO1xyXG4gICAgICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjaygpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW1hZ2VFbC5jb21wbGV0ZSB8fCAhY2hlY2tGb3JDb21wbGV0ZSkge1xyXG4gICAgICAgICAgICBpZiAoc3JjKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZSA9IG5ldyB3aW4uSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IG9uUmVhZHk7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5vbmVycm9yID0gb25SZWFkeTtcclxuICAgICAgICAgICAgICAgIGlmIChzaXplcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnNpemVzID0gc2l6ZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3Jjc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc3Jjc2V0ID0gc3Jjc2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IHNyYztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9uUmVhZHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGltYWdlIGFscmVhZHkgbG9hZGVkLi4uXHJcbiAgICAgICAgICAgIG9uUmVhZHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlbG9hZEltYWdlcygpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICBzd2lwZXIuaW1hZ2VzVG9Mb2FkID0gc3dpcGVyLiRlbC5maW5kKCdpbWcnKTtcclxuICAgICAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN3aXBlciA9PT0gJ3VuZGVmaW5lZCcgfHwgc3dpcGVyID09PSBudWxsIHx8ICFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5pbWFnZXNMb2FkZWQgIT09IHVuZGVmaW5lZCkgeyBzd2lwZXIuaW1hZ2VzTG9hZGVkICs9IDE7IH1cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5pbWFnZXNMb2FkZWQgPT09IHN3aXBlci5pbWFnZXNUb0xvYWQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy51cGRhdGVPbkltYWdlc1JlYWR5KSB7IHN3aXBlci51cGRhdGUoKTsgfVxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2ltYWdlc1JlYWR5Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzd2lwZXIuaW1hZ2VzVG9Mb2FkLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZUVsID0gc3dpcGVyLmltYWdlc1RvTG9hZFtpXTtcclxuICAgICAgICAgICAgc3dpcGVyLmxvYWRJbWFnZShcclxuICAgICAgICAgICAgICAgIGltYWdlRWwsXHJcbiAgICAgICAgICAgICAgICBpbWFnZUVsLmN1cnJlbnRTcmMgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VFbC5zcmNzZXQgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NyY3NldCcpLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VFbC5zaXplcyB8fCBpbWFnZUVsLmdldEF0dHJpYnV0ZSgnc2l6ZXMnKSxcclxuICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICBvblJlYWR5XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbWFnZXMgPSB7XHJcbiAgICAgICAgbG9hZEltYWdlOiBsb2FkSW1hZ2UsXHJcbiAgICAgICAgcHJlbG9hZEltYWdlczogcHJlbG9hZEltYWdlcyxcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tPdmVyZmxvdygpIHtcclxuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICB2YXIgd2FzTG9ja2VkID0gc3dpcGVyLmlzTG9ja2VkO1xyXG5cclxuICAgICAgICBzd2lwZXIuaXNMb2NrZWQgPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoID09PSAxO1xyXG4gICAgICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9ICFzd2lwZXIuaXNMb2NrZWQ7XHJcbiAgICAgICAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gIXN3aXBlci5pc0xvY2tlZDtcclxuXHJcbiAgICAgICAgLy8gZXZlbnRzXHJcbiAgICAgICAgaWYgKHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7IHN3aXBlci5lbWl0KHN3aXBlci5pc0xvY2tlZCA/ICdsb2NrJyA6ICd1bmxvY2snKTsgfVxyXG5cclxuICAgICAgICBpZiAod2FzTG9ja2VkICYmIHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7XHJcbiAgICAgICAgICAgIHN3aXBlci5pc0VuZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2lwZXIubmF2aWdhdGlvbi51cGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNoZWNrT3ZlcmZsb3ckMSA9IHsgY2hlY2tPdmVyZmxvdzogY2hlY2tPdmVyZmxvdyB9O1xyXG5cclxuICAgIHZhciBkZWZhdWx0cyA9IHtcclxuICAgICAgICBpbml0OiB0cnVlLFxyXG4gICAgICAgIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxyXG4gICAgICAgIHRvdWNoRXZlbnRzVGFyZ2V0OiAnY29udGFpbmVyJyxcclxuICAgICAgICBpbml0aWFsU2xpZGU6IDAsXHJcbiAgICAgICAgc3BlZWQ6IDMwMCxcclxuICAgICAgICAvL1xyXG4gICAgICAgIHByZXZlbnRJbnRlcmNhdGlvbk9uVHJhbnNpdGlvbjogZmFsc2UsXHJcblxyXG4gICAgICAgIC8vIFRvIHN1cHBvcnQgaU9TJ3Mgc3dpcGUtdG8tZ28tYmFjayBnZXN0dXJlICh3aGVuIGJlaW5nIHVzZWQgaW4tYXBwLCB3aXRoIFVJV2ViVmlldykuXHJcbiAgICAgICAgaU9TRWRnZVN3aXBlRGV0ZWN0aW9uOiBmYWxzZSxcclxuICAgICAgICBpT1NFZGdlU3dpcGVUaHJlc2hvbGQ6IDIwLFxyXG5cclxuICAgICAgICAvLyBGcmVlIG1vZGVcclxuICAgICAgICBmcmVlTW9kZTogZmFsc2UsXHJcbiAgICAgICAgZnJlZU1vZGVNb21lbnR1bTogdHJ1ZSxcclxuICAgICAgICBmcmVlTW9kZU1vbWVudHVtUmF0aW86IDEsXHJcbiAgICAgICAgZnJlZU1vZGVNb21lbnR1bUJvdW5jZTogdHJ1ZSxcclxuICAgICAgICBmcmVlTW9kZU1vbWVudHVtQm91bmNlUmF0aW86IDEsXHJcbiAgICAgICAgZnJlZU1vZGVNb21lbnR1bVZlbG9jaXR5UmF0aW86IDEsXHJcbiAgICAgICAgZnJlZU1vZGVTdGlja3k6IGZhbHNlLFxyXG4gICAgICAgIGZyZWVNb2RlTWluaW11bVZlbG9jaXR5OiAwLjAyLFxyXG5cclxuICAgICAgICAvLyBBdXRvaGVpZ2h0XHJcbiAgICAgICAgYXV0b0hlaWdodDogZmFsc2UsXHJcblxyXG4gICAgICAgIC8vIFNldCB3cmFwcGVyIHdpZHRoXHJcbiAgICAgICAgc2V0V3JhcHBlclNpemU6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBWaXJ0dWFsIFRyYW5zbGF0ZVxyXG4gICAgICAgIHZpcnR1YWxUcmFuc2xhdGU6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBFZmZlY3RzXHJcbiAgICAgICAgZWZmZWN0OiAnc2xpZGUnLCAvLyAnc2xpZGUnIG9yICdmYWRlJyBvciAnY3ViZScgb3IgJ2NvdmVyZmxvdycgb3IgJ2ZsaXAnXHJcblxyXG4gICAgICAgIC8vIEJyZWFrcG9pbnRzXHJcbiAgICAgICAgYnJlYWtwb2ludHM6IHVuZGVmaW5lZCxcclxuXHJcbiAgICAgICAgLy8gU2xpZGVzIGdyaWRcclxuICAgICAgICBzcGFjZUJldHdlZW46IDAsXHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICBzbGlkZXNQZXJDb2x1bW46IDEsXHJcbiAgICAgICAgc2xpZGVzUGVyQ29sdW1uRmlsbDogJ2NvbHVtbicsXHJcbiAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXHJcbiAgICAgICAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxyXG4gICAgICAgIHNsaWRlc09mZnNldEJlZm9yZTogMCwgLy8gaW4gcHhcclxuICAgICAgICBzbGlkZXNPZmZzZXRBZnRlcjogMCwgLy8gaW4gcHhcclxuICAgICAgICBub3JtYWxpemVTbGlkZUluZGV4OiB0cnVlLFxyXG5cclxuICAgICAgICAvLyBEaXNhYmxlIHN3aXBlciBhbmQgaGlkZSBuYXZpZ2F0aW9uIHdoZW4gY29udGFpbmVyIG5vdCBvdmVyZmxvd1xyXG4gICAgICAgIHdhdGNoT3ZlcmZsb3c6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBSb3VuZCBsZW5ndGhcclxuICAgICAgICByb3VuZExlbmd0aHM6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBUb3VjaGVzXHJcbiAgICAgICAgdG91Y2hSYXRpbzogMSxcclxuICAgICAgICB0b3VjaEFuZ2xlOiA0NSxcclxuICAgICAgICBzaW11bGF0ZVRvdWNoOiB0cnVlLFxyXG4gICAgICAgIHNob3J0U3dpcGVzOiB0cnVlLFxyXG4gICAgICAgIGxvbmdTd2lwZXM6IHRydWUsXHJcbiAgICAgICAgbG9uZ1N3aXBlc1JhdGlvOiAwLjUsXHJcbiAgICAgICAgbG9uZ1N3aXBlc01zOiAzMDAsXHJcbiAgICAgICAgZm9sbG93RmluZ2VyOiB0cnVlLFxyXG4gICAgICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxyXG4gICAgICAgIHRocmVzaG9sZDogMCxcclxuICAgICAgICB0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb246IHRydWUsXHJcbiAgICAgICAgdG91Y2hSZWxlYXNlT25FZGdlczogZmFsc2UsXHJcblxyXG4gICAgICAgIC8vIFVuaXF1ZSBOYXZpZ2F0aW9uIEVsZW1lbnRzXHJcbiAgICAgICAgdW5pcXVlTmF2RWxlbWVudHM6IHRydWUsXHJcblxyXG4gICAgICAgIC8vIFJlc2lzdGFuY2VcclxuICAgICAgICByZXNpc3RhbmNlOiB0cnVlLFxyXG4gICAgICAgIHJlc2lzdGFuY2VSYXRpbzogMC44NSxcclxuXHJcbiAgICAgICAgLy8gUHJvZ3Jlc3NcclxuICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiBmYWxzZSxcclxuICAgICAgICB3YXRjaFNsaWRlc1Zpc2liaWxpdHk6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBDdXJzb3JcclxuICAgICAgICBncmFiQ3Vyc29yOiBmYWxzZSxcclxuXHJcbiAgICAgICAgLy8gQ2xpY2tzXHJcbiAgICAgICAgcHJldmVudENsaWNrczogdHJ1ZSxcclxuICAgICAgICBwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb246IHRydWUsXHJcbiAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXHJcblxyXG4gICAgICAgIC8vIEltYWdlc1xyXG4gICAgICAgIHByZWxvYWRJbWFnZXM6IHRydWUsXHJcbiAgICAgICAgdXBkYXRlT25JbWFnZXNSZWFkeTogdHJ1ZSxcclxuXHJcbiAgICAgICAgLy8gbG9vcFxyXG4gICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgIGxvb3BBZGRpdGlvbmFsU2xpZGVzOiAwLFxyXG4gICAgICAgIGxvb3BlZFNsaWRlczogbnVsbCxcclxuICAgICAgICBsb29wRmlsbEdyb3VwV2l0aEJsYW5rOiBmYWxzZSxcclxuXHJcbiAgICAgICAgLy8gU3dpcGluZy9ubyBzd2lwaW5nXHJcbiAgICAgICAgYWxsb3dTbGlkZVByZXY6IHRydWUsXHJcbiAgICAgICAgYWxsb3dTbGlkZU5leHQ6IHRydWUsXHJcbiAgICAgICAgc3dpcGVIYW5kbGVyOiBudWxsLCAvLyAnLnN3aXBlLWhhbmRsZXInLFxyXG4gICAgICAgIG5vU3dpcGluZzogdHJ1ZSxcclxuICAgICAgICBub1N3aXBpbmdDbGFzczogJ3N3aXBlci1uby1zd2lwaW5nJyxcclxuICAgICAgICBub1N3aXBpbmdTZWxlY3RvcjogbnVsbCxcclxuXHJcbiAgICAgICAgLy8gUGFzc2l2ZSBMaXN0ZW5lcnNcclxuICAgICAgICBwYXNzaXZlTGlzdGVuZXJzOiB0cnVlLFxyXG5cclxuICAgICAgICAvLyBOU1xyXG4gICAgICAgIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6ICdzd2lwZXItY29udGFpbmVyLScsIC8vIE5FV1xyXG4gICAgICAgIHNsaWRlQ2xhc3M6ICdzd2lwZXItc2xpZGUnLFxyXG4gICAgICAgIHNsaWRlQmxhbmtDbGFzczogJ3N3aXBlci1zbGlkZS1pbnZpc2libGUtYmxhbmsnLFxyXG4gICAgICAgIHNsaWRlQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtYWN0aXZlJyxcclxuICAgICAgICBzbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1hY3RpdmUnLFxyXG4gICAgICAgIHNsaWRlVmlzaWJsZUNsYXNzOiAnc3dpcGVyLXNsaWRlLXZpc2libGUnLFxyXG4gICAgICAgIHNsaWRlRHVwbGljYXRlQ2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlJyxcclxuICAgICAgICBzbGlkZU5leHRDbGFzczogJ3N3aXBlci1zbGlkZS1uZXh0JyxcclxuICAgICAgICBzbGlkZUR1cGxpY2F0ZU5leHRDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtbmV4dCcsXHJcbiAgICAgICAgc2xpZGVQcmV2Q2xhc3M6ICdzd2lwZXItc2xpZGUtcHJldicsXHJcbiAgICAgICAgc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLXByZXYnLFxyXG4gICAgICAgIHdyYXBwZXJDbGFzczogJ3N3aXBlci13cmFwcGVyJyxcclxuXHJcbiAgICAgICAgLy8gQ2FsbGJhY2tzXHJcbiAgICAgICAgcnVuQ2FsbGJhY2tzT25Jbml0OiB0cnVlLFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgcHJvdG90eXBlcyA9IHtcclxuICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcclxuICAgICAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZSxcclxuICAgICAgICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uJDEsXHJcbiAgICAgICAgc2xpZGU6IHNsaWRlLFxyXG4gICAgICAgIGxvb3A6IGxvb3AsXHJcbiAgICAgICAgZ3JhYkN1cnNvcjogZ3JhYkN1cnNvcixcclxuICAgICAgICBtYW5pcHVsYXRpb246IG1hbmlwdWxhdGlvbixcclxuICAgICAgICBldmVudHM6IGV2ZW50cyxcclxuICAgICAgICBicmVha3BvaW50czogYnJlYWtwb2ludHMsXHJcbiAgICAgICAgY2hlY2tPdmVyZmxvdzogY2hlY2tPdmVyZmxvdyQxLFxyXG4gICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXHJcbiAgICAgICAgaW1hZ2VzOiBpbWFnZXMsXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBleHRlbmRlZERlZmF1bHRzID0ge307XHJcblxyXG4gICAgdmFyIFN3aXBlciA9IChmdW5jdGlvbiAoU3dpcGVyQ2xhc3MkJDEpIHtcclxuICAgICAgICBmdW5jdGlvbiBTd2lwZXIoKSB7XHJcbiAgICAgICAgICAgIHZhciBhc3NpZ247XHJcblxyXG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB3aGlsZSAobGVuLS0pIGFyZ3NbbGVuXSA9IGFyZ3VtZW50c1tsZW5dO1xyXG4gICAgICAgICAgICB2YXIgZWw7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXM7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBhcmdzWzBdLmNvbnN0cnVjdG9yICYmIGFyZ3NbMF0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gYXJnc1swXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIChhc3NpZ24gPSBhcmdzLCBlbCA9IGFzc2lnblswXSwgcGFyYW1zID0gYXNzaWduWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXBhcmFtcykgeyBwYXJhbXMgPSB7fTsgfVxyXG5cclxuICAgICAgICAgICAgcGFyYW1zID0gVXRpbHMuZXh0ZW5kKHt9LCBwYXJhbXMpO1xyXG4gICAgICAgICAgICBpZiAoZWwgJiYgIXBhcmFtcy5lbCkgeyBwYXJhbXMuZWwgPSBlbDsgfVxyXG5cclxuICAgICAgICAgICAgU3dpcGVyQ2xhc3MkJDEuY2FsbCh0aGlzLCBwYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmtleXMocHJvdG90eXBlcykuZm9yRWFjaChmdW5jdGlvbiAocHJvdG90eXBlR3JvdXApIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHByb3RvdHlwZXNbcHJvdG90eXBlR3JvdXBdKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm90b01ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghU3dpcGVyLnByb3RvdHlwZVtwcm90b01ldGhvZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3dpcGVyLnByb3RvdHlwZVtwcm90b01ldGhvZF0gPSBwcm90b3R5cGVzW3Byb3RvdHlwZUdyb3VwXVtwcm90b01ldGhvZF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU3dpcGVyIEluc3RhbmNlXHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN3aXBlci5tb2R1bGVzID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLm1vZHVsZXMgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhzd2lwZXIubW9kdWxlcykuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vZHVsZSA9IHN3aXBlci5tb2R1bGVzW21vZHVsZU5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZHVsZS5wYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW9kdWxlUGFyYW1OYW1lID0gT2JqZWN0LmtleXMobW9kdWxlLnBhcmFtcylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZHVsZVBhcmFtcyA9IG1vZHVsZS5wYXJhbXNbbW9kdWxlUGFyYW1OYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1vZHVsZVBhcmFtcyAhPT0gJ29iamVjdCcpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobW9kdWxlUGFyYW1OYW1lIGluIHBhcmFtcyAmJiAnZW5hYmxlZCcgaW4gbW9kdWxlUGFyYW1zKSkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPSB7IGVuYWJsZWQ6IHRydWUgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09ICdvYmplY3QnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICEoJ2VuYWJsZWQnIGluIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdKVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSkgeyBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9IHsgZW5hYmxlZDogZmFsc2UgfTsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0cyB3aXRoIG1vZHVsZXMgcGFyYW1zXHJcbiAgICAgICAgICAgIHZhciBzd2lwZXJQYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIGRlZmF1bHRzKTtcclxuICAgICAgICAgICAgc3dpcGVyLnVzZU1vZHVsZXNQYXJhbXMoc3dpcGVyUGFyYW1zKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0cyB3aXRoIHBhc3NlZCBwYXJhbXNcclxuICAgICAgICAgICAgc3dpcGVyLnBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgc3dpcGVyUGFyYW1zLCBleHRlbmRlZERlZmF1bHRzLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICBzd2lwZXIub3JpZ2luYWxQYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIHN3aXBlci5wYXJhbXMpO1xyXG4gICAgICAgICAgICBzd2lwZXIucGFzc2VkUGFyYW1zID0gVXRpbHMuZXh0ZW5kKHt9LCBwYXJhbXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2F2ZSBEb20gbGliXHJcbiAgICAgICAgICAgIHN3aXBlci4kID0gJDtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpbmQgZWxcclxuICAgICAgICAgICAgdmFyICRlbCA9ICQoc3dpcGVyLnBhcmFtcy5lbCk7XHJcbiAgICAgICAgICAgIGVsID0gJGVsWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCRlbC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJGVsLmVhY2goZnVuY3Rpb24gKGluZGV4LCBjb250YWluZXJFbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIHBhcmFtcywgeyBlbDogY29udGFpbmVyRWwgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVycy5wdXNoKG5ldyBTd2lwZXIobmV3UGFyYW1zKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzd2lwZXJzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5zd2lwZXIgPSBzd2lwZXI7XHJcbiAgICAgICAgICAgICRlbC5kYXRhKCdzd2lwZXInLCBzd2lwZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gRmluZCBXcmFwcGVyXHJcbiAgICAgICAgICAgIHZhciAkd3JhcHBlckVsID0gJGVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXIucGFyYW1zLndyYXBwZXJDbGFzcykpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dGVuZCBTd2lwZXJcclxuICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICAgICAgJGVsOiAkZWwsXHJcbiAgICAgICAgICAgICAgICBlbDogZWwsXHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlckVsOiAkd3JhcHBlckVsLFxyXG4gICAgICAgICAgICAgICAgd3JhcHBlckVsOiAkd3JhcHBlckVsWzBdLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENsYXNzZXNcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZXM6IFtdLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNsaWRlc1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzOiAkKCksXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNHcmlkOiBbXSxcclxuICAgICAgICAgICAgICAgIHNuYXBHcmlkOiBbXSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1NpemVzR3JpZDogW10sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaXNEaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgIGlzSG9yaXpvbnRhbDogZnVuY3Rpb24gaXNIb3Jpem9udGFsKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGlzVmVydGljYWw6IGZ1bmN0aW9uIGlzVmVydGljYWwoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIC8vIFJUTFxyXG4gICAgICAgICAgICAgICAgcnRsOiAoZWwuZGlyLnRvTG93ZXJDYXNlKCkgPT09ICdydGwnIHx8ICRlbC5jc3MoJ2RpcmVjdGlvbicpID09PSAncnRsJyksXHJcbiAgICAgICAgICAgICAgICBydGxUcmFuc2xhdGU6IHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgKGVsLmRpci50b0xvd2VyQ2FzZSgpID09PSAncnRsJyB8fCAkZWwuY3NzKCdkaXJlY3Rpb24nKSA9PT0gJ3J0bCcpLFxyXG4gICAgICAgICAgICAgICAgd3JvbmdSVEw6ICR3cmFwcGVyRWwuY3NzKCdkaXNwbGF5JykgPT09ICctd2Via2l0LWJveCcsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW5kZXhlc1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSW5kZXg6IDAsXHJcbiAgICAgICAgICAgICAgICByZWFsSW5kZXg6IDAsXHJcblxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIGlzQmVnaW5uaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaXNFbmQ6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByb3BzXHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IDAsXHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c1RyYW5zbGF0ZTogMCxcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxyXG4gICAgICAgICAgICAgICAgdmVsb2NpdHk6IDAsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpbmc6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIExvY2tzXHJcbiAgICAgICAgICAgICAgICBhbGxvd1NsaWRlTmV4dDogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlTmV4dCxcclxuICAgICAgICAgICAgICAgIGFsbG93U2xpZGVQcmV2OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVQcmV2LFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRvdWNoIEV2ZW50c1xyXG4gICAgICAgICAgICAgICAgdG91Y2hFdmVudHM6IChmdW5jdGlvbiB0b3VjaEV2ZW50cygpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2ggPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJ107XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2t0b3AgPSBbJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCddO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVza3RvcCA9IFsncG9pbnRlcmRvd24nLCAncG9pbnRlcm1vdmUnLCAncG9pbnRlcnVwJ107XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChTdXBwb3J0LnByZWZpeGVkUG9pbnRlckV2ZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNrdG9wID0gWydNU1BvaW50ZXJEb3duJywgJ01TUG9pbnRlck1vdmUnLCAnTVNQb2ludGVyVXAnXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzVG91Y2ggPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiB0b3VjaFswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZTogdG91Y2hbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogdG91Y2hbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEZXNrdG9wID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZGVza3RvcFswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZTogZGVza3RvcFsxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBkZXNrdG9wWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN1cHBvcnQudG91Y2ggfHwgIXN3aXBlci5wYXJhbXMuc2ltdWxhdGVUb3VjaCA/IHN3aXBlci50b3VjaEV2ZW50c1RvdWNoIDogc3dpcGVyLnRvdWNoRXZlbnRzRGVza3RvcDtcclxuICAgICAgICAgICAgICAgIH0oKSksXHJcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c0RhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBpc1RvdWNoZWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBpc01vdmVkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dUb3VjaENhbGxiYWNrczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoU3RhcnRUaW1lOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUcmFuc2xhdGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1RocmVzaG9sZE1vdmU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBGb3JtIGVsZW1lbnRzIHRvIG1hdGNoXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybUVsZW1lbnRzOiAnaW5wdXQsIHNlbGVjdCwgb3B0aW9uLCB0ZXh0YXJlYSwgYnV0dG9uLCB2aWRlbycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTGFzdCBjbGljayB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdENsaWNrVGltZTogVXRpbHMubm93KCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tUaW1lb3V0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmVsb2NpdGllc1xyXG4gICAgICAgICAgICAgICAgICAgIHZlbG9jaXRpZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93TW9tZW50dW1Cb3VuY2U6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBpc1RvdWNoRXZlbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydE1vdmluZzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDbGlja3NcclxuICAgICAgICAgICAgICAgIGFsbG93Q2xpY2s6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVG91Y2hlc1xyXG4gICAgICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IHN3aXBlci5wYXJhbXMuYWxsb3dUb3VjaE1vdmUsXHJcblxyXG4gICAgICAgICAgICAgICAgdG91Y2hlczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0WDogMCxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlmZjogMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW1hZ2VzXHJcbiAgICAgICAgICAgICAgICBpbWFnZXNUb0xvYWQ6IFtdLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2VzTG9hZGVkOiAwLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnN0YWxsIE1vZHVsZXNcclxuICAgICAgICAgICAgc3dpcGVyLnVzZU1vZHVsZXMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaW5pdCkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmV0dXJuIGFwcCBpbnN0YW5jZVxyXG4gICAgICAgICAgICByZXR1cm4gc3dpcGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFN3aXBlckNsYXNzJCQxKSBTd2lwZXIuX19wcm90b19fID0gU3dpcGVyQ2xhc3MkJDE7XHJcbiAgICAgICAgU3dpcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3dpcGVyQ2xhc3MkJDEgJiYgU3dpcGVyQ2xhc3MkJDEucHJvdG90eXBlKTtcclxuICAgICAgICBTd2lwZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3dpcGVyO1xyXG5cclxuICAgICAgICB2YXIgc3RhdGljQWNjZXNzb3JzID0geyBleHRlbmRlZERlZmF1bHRzOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9LCBkZWZhdWx0czogeyBjb25maWd1cmFibGU6IHRydWUgfSwgQ2xhc3M6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0sICQ6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0gfTtcclxuICAgICAgICBTd2lwZXIucHJvdG90eXBlLnNsaWRlc1BlclZpZXdEeW5hbWljID0gZnVuY3Rpb24gc2xpZGVzUGVyVmlld0R5bmFtaWMoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXNHcmlkID0gc3dpcGVyLnNsaWRlc0dyaWQ7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXJTaXplID0gc3dpcGVyLnNpemU7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgdmFyIHNwdiA9IDE7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZVNpemUgPSBzbGlkZXNbYWN0aXZlSW5kZXhdLnN3aXBlclNsaWRlU2l6ZTtcclxuICAgICAgICAgICAgICAgIHZhciBicmVha0xvb3A7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSAmJiAhYnJlYWtMb29wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHYgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlU2l6ZSA+IHN3aXBlclNpemUpIHsgYnJlYWtMb29wID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkkMSA9IGFjdGl2ZUluZGV4IC0gMTsgaSQxID49IDA7IGkkMSAtPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tpJDFdICYmICFicmVha0xvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVTaXplICs9IHNsaWRlc1tpJDFdLnN3aXBlclNsaWRlU2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3B2ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZVNpemUgPiBzd2lwZXJTaXplKSB7IGJyZWFrTG9vcCA9IHRydWU7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpJDIgPSBhY3RpdmVJbmRleCArIDE7IGkkMiA8IHNsaWRlcy5sZW5ndGg7IGkkMiArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc0dyaWRbaSQyXSAtIHNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdIDwgc3dpcGVyU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHYgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNwdjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFN3aXBlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlJCQxKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgdmFyIHNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICAgICAgLy8gQnJlYWtwb2ludHNcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5icmVha3BvaW50cykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XHJcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZVZhbHVlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgKiAtMSA6IHN3aXBlci50cmFuc2xhdGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3VHJhbnNsYXRlID0gTWF0aC5taW4oTWF0aC5tYXgodHJhbnNsYXRlVmFsdWUsIHN3aXBlci5tYXhUcmFuc2xhdGUoKSksIHN3aXBlci5taW5UcmFuc2xhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZWQ7XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZyZWVNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2xhdGUoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9IZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSAmJiBzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVkID0gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxLCAwLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdHJhbnNsYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRyYW5zbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzbmFwR3JpZCAhPT0gc3dpcGVyLnNuYXBHcmlkKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCd1cGRhdGUnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFN3aXBlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLmluaXRpYWxpemVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZUluaXQnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBicmVha3BvaW50XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmJyZWFrcG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgQ2xhc3Nlc1xyXG4gICAgICAgICAgICBzd2lwZXIuYWRkQ2xhc3NlcygpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGxvb3BcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIHNpemVcclxuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBzbGlkZXNcclxuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0IEdyYWIgQ3Vyc29yXHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnByZWxvYWRJbWFnZXMpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5wcmVsb2FkSW1hZ2VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNsaWRlIFRvIEluaXRpYWwgU2xpZGVcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUgKyBzd2lwZXIubG9vcGVkU2xpZGVzLCAwLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSwgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBdHRhY2ggZXZlbnRzXHJcbiAgICAgICAgICAgIHN3aXBlci5hdHRhY2hFdmVudHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXQgRmxhZ1xyXG4gICAgICAgICAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gRW1pdFxyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnaW5pdCcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgU3dpcGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveShkZWxldGVJbnN0YW5jZSwgY2xlYW5TdHlsZXMpIHtcclxuICAgICAgICAgICAgaWYgKGRlbGV0ZUluc3RhbmNlID09PSB2b2lkIDApIGRlbGV0ZUluc3RhbmNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGNsZWFuU3R5bGVzID09PSB2b2lkIDApIGNsZWFuU3R5bGVzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICAgICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XHJcbiAgICAgICAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zID09PSAndW5kZWZpbmVkJyB8fCBzd2lwZXIuZGVzdHJveWVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZURlc3Ryb3knKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXQgRmxhZ1xyXG4gICAgICAgICAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGFjaCBldmVudHNcclxuICAgICAgICAgICAgc3dpcGVyLmRldGFjaEV2ZW50cygpO1xyXG5cclxuICAgICAgICAgICAgLy8gRGVzdHJveSBsb29wXHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFudXAgc3R5bGVzXHJcbiAgICAgICAgICAgIGlmIChjbGVhblN0eWxlcykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnJlbW92ZUNsYXNzZXMoKTtcclxuICAgICAgICAgICAgICAgICRlbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgJHdyYXBwZXJFbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlcyAmJiBzbGlkZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zbGlkZU5leHRDbGFzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zbGlkZVByZXZDbGFzc10uam9pbignICcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zd2lwZXItY29sdW1uJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtc3dpcGVyLXJvdycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnZGVzdHJveScpO1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0YWNoIGVtaXR0ZXIgZXZlbnRzXHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHN3aXBlci5ldmVudHNMaXN0ZW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLm9mZihldmVudE5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZWxldGVJbnN0YW5jZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci4kZWxbMF0uc3dpcGVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHN3aXBlci4kZWwuZGF0YSgnc3dpcGVyJywgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5kZWxldGVQcm9wcyhzd2lwZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXBlci5kZXN0cm95ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBTd2lwZXIuZXh0ZW5kRGVmYXVsdHMgPSBmdW5jdGlvbiBleHRlbmREZWZhdWx0cyhuZXdEZWZhdWx0cykge1xyXG4gICAgICAgICAgICBVdGlscy5leHRlbmQoZXh0ZW5kZWREZWZhdWx0cywgbmV3RGVmYXVsdHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc3RhdGljQWNjZXNzb3JzLmV4dGVuZGVkRGVmYXVsdHMuZ2V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZXh0ZW5kZWREZWZhdWx0cztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN0YXRpY0FjY2Vzc29ycy5kZWZhdWx0cy5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0cztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN0YXRpY0FjY2Vzc29ycy5DbGFzcy5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTd2lwZXJDbGFzcyQkMTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHN0YXRpY0FjY2Vzc29ycy4kLmdldCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoU3dpcGVyLCBzdGF0aWNBY2Nlc3NvcnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gU3dpcGVyO1xyXG4gICAgfShTd2lwZXJDbGFzcykpO1xyXG5cclxuICAgIHZhciBEZXZpY2UkMSA9IHtcclxuICAgICAgICBuYW1lOiAnZGV2aWNlJyxcclxuICAgICAgICBwcm90bzoge1xyXG4gICAgICAgICAgICBkZXZpY2U6IERldmljZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXRpYzoge1xyXG4gICAgICAgICAgICBkZXZpY2U6IERldmljZSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgU3VwcG9ydCQxID0ge1xyXG4gICAgICAgIG5hbWU6ICdzdXBwb3J0JyxcclxuICAgICAgICBwcm90bzoge1xyXG4gICAgICAgICAgICBzdXBwb3J0OiBTdXBwb3J0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhdGljOiB7XHJcbiAgICAgICAgICAgIHN1cHBvcnQ6IFN1cHBvcnQsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIEJyb3dzZXIkMSA9IHtcclxuICAgICAgICBuYW1lOiAnYnJvd3NlcicsXHJcbiAgICAgICAgcHJvdG86IHtcclxuICAgICAgICAgICAgYnJvd3NlcjogQnJvd3NlcixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXRpYzoge1xyXG4gICAgICAgICAgICBicm93c2VyOiBCcm93c2VyLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBSZXNpemUgPSB7XHJcbiAgICAgICAgbmFtZTogJ3Jlc2l6ZScsXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XHJcbiAgICAgICAgICAgICAgICByZXNpemU6IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNpemVIYW5kbGVyOiBmdW5jdGlvbiByZXNpemVIYW5kbGVyKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVSZXNpemUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3Jlc2l6ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyOiBmdW5jdGlvbiBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ29yaWVudGF0aW9uY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgLy8gRW1pdCByZXNpemVcclxuICAgICAgICAgICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzd2lwZXIucmVzaXplLnJlc2l6ZUhhbmRsZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEVtaXQgb3JpZW50YXRpb25jaGFuZ2VcclxuICAgICAgICAgICAgICAgIHdpbi5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHN3aXBlci5yZXNpemUub3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHN3aXBlci5yZXNpemUucmVzaXplSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBzd2lwZXIucmVzaXplLm9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIE9ic2VydmVyID0ge1xyXG4gICAgICAgIGZ1bmM6IHdpbi5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbi5XZWJraXRNdXRhdGlvbk9ic2VydmVyLFxyXG4gICAgICAgIGF0dGFjaDogZnVuY3Rpb24gYXR0YWNoKHRhcmdldCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSBvcHRpb25zID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBPYnNlcnZlckZ1bmMgPSBPYnNlcnZlci5mdW5jO1xyXG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXJGdW5jKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdvYnNlcnZlclVwZGF0ZScsIG11dGF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmF0dHJpYnV0ZXMsXHJcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHR5cGVvZiBvcHRpb25zLmNoaWxkTGlzdCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5jaGlsZExpc3QsXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0eXBlb2Ygb3B0aW9ucy5jaGFyYWN0ZXJEYXRhID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoYXJhY3RlckRhdGEsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc3dpcGVyLm9ic2VydmVyLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIVN1cHBvcnQub2JzZXJ2ZXIgfHwgIXN3aXBlci5wYXJhbXMub2JzZXJ2ZXIpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLm9ic2VydmVQYXJlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyUGFyZW50cyA9IHN3aXBlci4kZWwucGFyZW50cygpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJQYXJlbnRzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLm9ic2VydmVyLmF0dGFjaChjb250YWluZXJQYXJlbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBPYnNlcnZlIGNvbnRhaW5lclxyXG4gICAgICAgICAgICBzd2lwZXIub2JzZXJ2ZXIuYXR0YWNoKHN3aXBlci4kZWxbMF0sIHsgY2hpbGRMaXN0OiBmYWxzZSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9ic2VydmUgd3JhcHBlclxyXG4gICAgICAgICAgICBzd2lwZXIub2JzZXJ2ZXIuYXR0YWNoKHN3aXBlci4kd3JhcHBlckVsWzBdLCB7IGF0dHJpYnV0ZXM6IGZhbHNlIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHN3aXBlci5vYnNlcnZlci5vYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN3aXBlci5vYnNlcnZlci5vYnNlcnZlcnMgPSBbXTtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgT2JzZXJ2ZXIkMSA9IHtcclxuICAgICAgICBuYW1lOiAnb2JzZXJ2ZXInLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBvYnNlcnZlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIG9ic2VydmVQYXJlbnRzOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0OiBPYnNlcnZlci5pbml0LmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBhdHRhY2g6IE9ic2VydmVyLmF0dGFjaC5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzdHJveTogT2JzZXJ2ZXIuZGVzdHJveS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzOiBbXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLm9ic2VydmVyLmluaXQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLm9ic2VydmVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgVmlydHVhbCA9IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShmb3JjZSkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHJlZiA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXNQZXJWaWV3ID0gcmVmLnNsaWRlc1BlclZpZXc7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXNQZXJHcm91cCA9IHJlZi5zbGlkZXNQZXJHcm91cDtcclxuICAgICAgICAgICAgdmFyIGNlbnRlcmVkU2xpZGVzID0gcmVmLmNlbnRlcmVkU2xpZGVzO1xyXG4gICAgICAgICAgICB2YXIgcmVmJDEgPSBzd2lwZXIudmlydHVhbDtcclxuICAgICAgICAgICAgdmFyIHByZXZpb3VzRnJvbSA9IHJlZiQxLmZyb207XHJcbiAgICAgICAgICAgIHZhciBwcmV2aW91c1RvID0gcmVmJDEudG87XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSByZWYkMS5zbGlkZXM7XHJcbiAgICAgICAgICAgIHZhciBwcmV2aW91c1NsaWRlc0dyaWQgPSByZWYkMS5zbGlkZXNHcmlkO1xyXG4gICAgICAgICAgICB2YXIgcmVuZGVyU2xpZGUgPSByZWYkMS5yZW5kZXJTbGlkZTtcclxuICAgICAgICAgICAgdmFyIHByZXZpb3VzT2Zmc2V0ID0gcmVmJDEub2Zmc2V0O1xyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcclxuICAgICAgICAgICAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4IHx8IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0UHJvcDtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5ydGxUcmFuc2xhdGUpIHsgb2Zmc2V0UHJvcCA9ICdyaWdodCc7IH1cclxuICAgICAgICAgICAgZWxzZSB7IG9mZnNldFByb3AgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJzsgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHNsaWRlc0FmdGVyO1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVzQmVmb3JlO1xyXG4gICAgICAgICAgICBpZiAoY2VudGVyZWRTbGlkZXMpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlc0FmdGVyID0gTWF0aC5mbG9vcihzbGlkZXNQZXJWaWV3IC8gMikgKyBzbGlkZXNQZXJHcm91cDtcclxuICAgICAgICAgICAgICAgIHNsaWRlc0JlZm9yZSA9IE1hdGguZmxvb3Ioc2xpZGVzUGVyVmlldyAvIDIpICsgc2xpZGVzUGVyR3JvdXA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNBZnRlciA9IHNsaWRlc1BlclZpZXcgKyAoc2xpZGVzUGVyR3JvdXAgLSAxKTtcclxuICAgICAgICAgICAgICAgIHNsaWRlc0JlZm9yZSA9IHNsaWRlc1Blckdyb3VwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBmcm9tID0gTWF0aC5tYXgoKGFjdGl2ZUluZGV4IHx8IDApIC0gc2xpZGVzQmVmb3JlLCAwKTtcclxuICAgICAgICAgICAgdmFyIHRvID0gTWF0aC5taW4oKGFjdGl2ZUluZGV4IHx8IDApICsgc2xpZGVzQWZ0ZXIsIHNsaWRlcy5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IChzd2lwZXIuc2xpZGVzR3JpZFtmcm9tXSB8fCAwKSAtIChzd2lwZXIuc2xpZGVzR3JpZFswXSB8fCAwKTtcclxuXHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIudmlydHVhbCwge1xyXG4gICAgICAgICAgICAgICAgZnJvbTogZnJvbSxcclxuICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzR3JpZDogc3dpcGVyLnNsaWRlc0dyaWQsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gb25SZW5kZXJlZCgpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIubGF6eSAmJiBzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzRnJvbSA9PT0gZnJvbSAmJiBwcmV2aW91c1RvID09PSB0byAmJiAhZm9yY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIuc2xpZGVzR3JpZCAhPT0gcHJldmlvdXNTbGlkZXNHcmlkICYmIG9mZnNldCAhPT0gcHJldmlvdXNPZmZzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVzLmNzcyhvZmZzZXRQcm9wLCAob2Zmc2V0ICsgXCJweFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsLnJlbmRlckV4dGVybmFsKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIucGFyYW1zLnZpcnR1YWwucmVuZGVyRXh0ZXJuYWwuY2FsbChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IG9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICBmcm9tOiBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvOiB0byxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXM6IChmdW5jdGlvbiBnZXRTbGlkZXMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZXNUb1JlbmRlciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gZnJvbTsgaSA8PSB0bzsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1JlbmRlci5wdXNoKHNsaWRlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNsaWRlc1RvUmVuZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0oKSksXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG9uUmVuZGVyZWQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHJlcGVuZEluZGV4ZXMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIGFwcGVuZEluZGV4ZXMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKGZvcmNlKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5maW5kKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3MpKSkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gcHJldmlvdXNGcm9tOyBpIDw9IHByZXZpb3VzVG87IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgZnJvbSB8fCBpID4gdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuZmluZCgoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzKSArIFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIGkgKyBcIlxcXCJdXCIpKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgc2xpZGVzLmxlbmd0aDsgaSQxICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpJDEgPj0gZnJvbSAmJiBpJDEgPD0gdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHByZXZpb3VzVG8gPT09ICd1bmRlZmluZWQnIHx8IGZvcmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZEluZGV4ZXMucHVzaChpJDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpJDEgPiBwcmV2aW91c1RvKSB7IGFwcGVuZEluZGV4ZXMucHVzaChpJDEpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpJDEgPCBwcmV2aW91c0Zyb20pIHsgcHJlcGVuZEluZGV4ZXMucHVzaChpJDEpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFwcGVuZEluZGV4ZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLmFwcGVuZChyZW5kZXJTbGlkZShzbGlkZXNbaW5kZXhdLCBpbmRleCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcHJlcGVuZEluZGV4ZXMuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSA8IGI7IH0pLmZvckVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5wcmVwZW5kKHJlbmRlclNsaWRlKHNsaWRlc1tpbmRleF0sIGluZGV4KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbignLnN3aXBlci1zbGlkZScpLmNzcyhvZmZzZXRQcm9wLCAob2Zmc2V0ICsgXCJweFwiKSk7XHJcbiAgICAgICAgICAgIG9uUmVuZGVyZWQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlclNsaWRlOiBmdW5jdGlvbiByZW5kZXJTbGlkZShzbGlkZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnZpcnR1YWw7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuY2FjaGUgJiYgc3dpcGVyLnZpcnR1YWwuY2FjaGVbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dpcGVyLnZpcnR1YWwuY2FjaGVbaW5kZXhdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciAkc2xpZGVFbCA9IHBhcmFtcy5yZW5kZXJTbGlkZVxyXG4gICAgICAgICAgICAgICAgPyAkKHBhcmFtcy5yZW5kZXJTbGlkZS5jYWxsKHN3aXBlciwgc2xpZGUsIGluZGV4KSlcclxuICAgICAgICAgICAgICAgIDogJCgoXCI8ZGl2IGNsYXNzPVxcXCJcIiArIChzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3MpICsgXCJcXFwiIGRhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIGluZGV4ICsgXCJcXFwiPlwiICsgc2xpZGUgKyBcIjwvZGl2PlwiKSk7XHJcbiAgICAgICAgICAgIGlmICghJHNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgeyAkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIGluZGV4KTsgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmNhY2hlKSB7IHN3aXBlci52aXJ0dWFsLmNhY2hlW2luZGV4XSA9ICRzbGlkZUVsOyB9XHJcbiAgICAgICAgICAgIHJldHVybiAkc2xpZGVFbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFwcGVuZFNsaWRlOiBmdW5jdGlvbiBhcHBlbmRTbGlkZShzbGlkZSkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnB1c2goc2xpZGUpO1xyXG4gICAgICAgICAgICBzd2lwZXIudmlydHVhbC51cGRhdGUodHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmVwZW5kU2xpZGU6IGZ1bmN0aW9uIHByZXBlbmRTbGlkZShzbGlkZSkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnVuc2hpZnQoc2xpZGUpO1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmNhY2hlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FjaGUgPSBzd2lwZXIudmlydHVhbC5jYWNoZTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdDYWNoZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY2FjaGUpLmZvckVhY2goZnVuY3Rpb24gKGNhY2hlZEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Q2FjaGVbY2FjaGVkSW5kZXggKyAxXSA9IGNhY2hlW2NhY2hlZEluZGV4XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnZpcnR1YWwuY2FjaGUgPSBuZXdDYWNoZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2lwZXIudmlydHVhbC51cGRhdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoMCk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIFZpcnR1YWwkMSA9IHtcclxuICAgICAgICBuYW1lOiAndmlydHVhbCcsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIHZpcnR1YWw6IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzOiBbXSxcclxuICAgICAgICAgICAgICAgIGNhY2hlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyU2xpZGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJFeHRlcm5hbDogbnVsbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICAgICAgdmlydHVhbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZTogVmlydHVhbC51cGRhdGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZFNsaWRlOiBWaXJ0dWFsLmFwcGVuZFNsaWRlLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBwcmVwZW5kU2xpZGU6IFZpcnR1YWwucHJlcGVuZFNsaWRlLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJTbGlkZTogVmlydHVhbC5yZW5kZXJTbGlkZS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzOiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuc2xpZGVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlOiB7fSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gYmVmb3JlSW5pdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goKChzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpICsgXCJ2aXJ0dWFsXCIpKTtcclxuICAgICAgICAgICAgICAgIHZhciBvdmVyd3JpdGVQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLnBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIub3JpZ2luYWxQYXJhbXMsIG92ZXJ3cml0ZVBhcmFtcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnZpcnR1YWwudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnZpcnR1YWwudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIEtleWJvYXJkID0ge1xyXG4gICAgICAgIGhhbmRsZTogZnVuY3Rpb24gaGFuZGxlKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcclxuICAgICAgICAgICAgdmFyIGUgPSBldmVudDtcclxuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgeyBlID0gZS5vcmlnaW5hbEV2ZW50OyB9IC8vIGpxdWVyeSBmaXhcclxuICAgICAgICAgICAgdmFyIGtjID0gZS5rZXlDb2RlIHx8IGUuY2hhckNvZGU7XHJcbiAgICAgICAgICAgIC8vIERpcmVjdGlvbnMgbG9ja3NcclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgKChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYga2MgPT09IDM5KSB8fCAoc3dpcGVyLmlzVmVydGljYWwoKSAmJiBrYyA9PT0gNDApKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmICgoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIGtjID09PSAzNykgfHwgKHN3aXBlci5pc1ZlcnRpY2FsKCkgJiYga2MgPT09IDM4KSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5zaGlmdEtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCAmJiBkb2MuYWN0aXZlRWxlbWVudC5ub2RlTmFtZSAmJiAoZG9jLmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2lucHV0JyB8fCBkb2MuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAndGV4dGFyZWEnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5rZXlib2FyZC5vbmx5SW5WaWV3cG9ydCAmJiAoa2MgPT09IDM3IHx8IGtjID09PSAzOSB8fCBrYyA9PT0gMzggfHwga2MgPT09IDQwKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluVmlldyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhhdCBzd2lwZXIgc2hvdWxkIGJlIGluc2lkZSBvZiB2aXNpYmxlIGFyZWEgb2Ygd2luZG93XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLiRlbC5wYXJlbnRzKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3MpKSkubGVuZ3RoID4gMCAmJiBzd2lwZXIuJGVsLnBhcmVudHMoKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzcykpKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd1dpZHRoID0gd2luLmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gd2luLmlubmVySGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlck9mZnNldCA9IHN3aXBlci4kZWwub2Zmc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocnRsKSB7IHN3aXBlck9mZnNldC5sZWZ0IC09IHN3aXBlci4kZWxbMF0uc2Nyb2xsTGVmdDsgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlckNvb3JkID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIFtzd2lwZXJPZmZzZXQubGVmdCwgc3dpcGVyT2Zmc2V0LnRvcF0sXHJcbiAgICAgICAgICAgICAgICAgICAgW3N3aXBlck9mZnNldC5sZWZ0ICsgc3dpcGVyLndpZHRoLCBzd2lwZXJPZmZzZXQudG9wXSxcclxuICAgICAgICAgICAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3AgKyBzd2lwZXIuaGVpZ2h0XSxcclxuICAgICAgICAgICAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzd2lwZXIud2lkdGgsIHN3aXBlck9mZnNldC50b3AgKyBzd2lwZXIuaGVpZ2h0XV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN3aXBlckNvb3JkLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvaW50ID0gc3dpcGVyQ29vcmRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludFswXSA+PSAwICYmIHBvaW50WzBdIDw9IHdpbmRvd1dpZHRoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50WzFdID49IDAgJiYgcG9pbnRbMV0gPD0gd2luZG93SGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluVmlldyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpblZpZXcpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChrYyA9PT0gMzcgfHwga2MgPT09IDM5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChrYyA9PT0gMzkgJiYgIXJ0bCkgfHwgKGtjID09PSAzNyAmJiBydGwpKSB7IHN3aXBlci5zbGlkZU5leHQoKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChrYyA9PT0gMzcgJiYgIXJ0bCkgfHwgKGtjID09PSAzOSAmJiBydGwpKSB7IHN3aXBlci5zbGlkZVByZXYoKTsgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtjID09PSAzOCB8fCBrYyA9PT0gNDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoa2MgPT09IDQwKSB7IHN3aXBlci5zbGlkZU5leHQoKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGtjID09PSAzOCkgeyBzd2lwZXIuc2xpZGVQcmV2KCk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgna2V5UHJlc3MnLCBrYyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmFibGU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgJChkb2MpLm9uKCdrZXlkb3duJywgc3dpcGVyLmtleWJvYXJkLmhhbmRsZSk7XHJcbiAgICAgICAgICAgIHN3aXBlci5rZXlib2FyZC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5rZXlib2FyZC5lbmFibGVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAkKGRvYykub2ZmKCdrZXlkb3duJywgc3dpcGVyLmtleWJvYXJkLmhhbmRsZSk7XHJcbiAgICAgICAgICAgIHN3aXBlci5rZXlib2FyZC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIEtleWJvYXJkJDEgPSB7XHJcbiAgICAgICAgbmFtZTogJ2tleWJvYXJkJyxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAga2V5Ym9hcmQ6IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgb25seUluVmlld3BvcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgIGtleWJvYXJkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlOiBLZXlib2FyZC5lbmFibGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGU6IEtleWJvYXJkLmRpc2FibGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZTogS2V5Ym9hcmQuaGFuZGxlLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMua2V5Ym9hcmQuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5rZXlib2FyZC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5rZXlib2FyZC5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmtleWJvYXJkLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBpc0V2ZW50U3VwcG9ydGVkKCkge1xyXG4gICAgICAgIHZhciBldmVudE5hbWUgPSAnb253aGVlbCc7XHJcbiAgICAgICAgdmFyIGlzU3VwcG9ydGVkID0gZXZlbnROYW1lIGluIGRvYztcclxuXHJcbiAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoZXZlbnROYW1lLCAncmV0dXJuOycpO1xyXG4gICAgICAgICAgICBpc1N1cHBvcnRlZCA9IHR5cGVvZiBlbGVtZW50W2V2ZW50TmFtZV0gPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzU3VwcG9ydGVkICYmXHJcbiAgICAgICAgICAgIGRvYy5pbXBsZW1lbnRhdGlvbiAmJlxyXG4gICAgICAgICAgICBkb2MuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSAmJlxyXG4gICAgICAgICAgICAvLyBhbHdheXMgcmV0dXJucyB0cnVlIGluIG5ld2VyIGJyb3dzZXJzIGFzIHBlciB0aGUgc3RhbmRhcmQuXHJcbiAgICAgICAgICAgIC8vIEBzZWUgaHR0cDovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2RvbS1kb21pbXBsZW1lbnRhdGlvbi1oYXNmZWF0dXJlXHJcbiAgICAgICAgICAgIGRvYy5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKCcnLCAnJykgIT09IHRydWVcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgLy8gVGhpcyBpcyB0aGUgb25seSB3YXkgdG8gdGVzdCBzdXBwb3J0IGZvciB0aGUgYHdoZWVsYCBldmVudCBpbiBJRTkrLlxyXG4gICAgICAgICAgICBpc1N1cHBvcnRlZCA9IGRvYy5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKCdFdmVudHMud2hlZWwnLCAnMy4wJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaXNTdXBwb3J0ZWQ7XHJcbiAgICB9XHJcbiAgICB2YXIgTW91c2V3aGVlbCA9IHtcclxuICAgICAgICBsYXN0U2Nyb2xsVGltZTogVXRpbHMubm93KCksXHJcbiAgICAgICAgZXZlbnQ6IChmdW5jdGlvbiBnZXRFdmVudCgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbi5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xKSB7IHJldHVybiAnRE9NTW91c2VTY3JvbGwnOyB9XHJcbiAgICAgICAgICAgIHJldHVybiBpc0V2ZW50U3VwcG9ydGVkKCkgPyAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xyXG4gICAgICAgIH0oKSksXHJcbiAgICAgICAgbm9ybWFsaXplOiBmdW5jdGlvbiBub3JtYWxpemUoZSkge1xyXG4gICAgICAgICAgICAvLyBSZWFzb25hYmxlIGRlZmF1bHRzXHJcbiAgICAgICAgICAgIHZhciBQSVhFTF9TVEVQID0gMTA7XHJcbiAgICAgICAgICAgIHZhciBMSU5FX0hFSUdIVCA9IDQwO1xyXG4gICAgICAgICAgICB2YXIgUEFHRV9IRUlHSFQgPSA4MDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgc1ggPSAwO1xyXG4gICAgICAgICAgICB2YXIgc1kgPSAwOyAvLyBzcGluWCwgc3BpbllcclxuICAgICAgICAgICAgdmFyIHBYID0gMDtcclxuICAgICAgICAgICAgdmFyIHBZID0gMDsgLy8gcGl4ZWxYLCBwaXhlbFlcclxuXHJcbiAgICAgICAgICAgIC8vIExlZ2FjeVxyXG4gICAgICAgICAgICBpZiAoJ2RldGFpbCcgaW4gZSkge1xyXG4gICAgICAgICAgICAgICAgc1kgPSBlLmRldGFpbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJ3doZWVsRGVsdGEnIGluIGUpIHtcclxuICAgICAgICAgICAgICAgIHNZID0gLWUud2hlZWxEZWx0YSAvIDEyMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJ3doZWVsRGVsdGFZJyBpbiBlKSB7XHJcbiAgICAgICAgICAgICAgICBzWSA9IC1lLndoZWVsRGVsdGFZIC8gMTIwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgnd2hlZWxEZWx0YVgnIGluIGUpIHtcclxuICAgICAgICAgICAgICAgIHNYID0gLWUud2hlZWxEZWx0YVggLyAxMjA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHNpZGUgc2Nyb2xsaW5nIG9uIEZGIHdpdGggRE9NTW91c2VTY3JvbGxcclxuICAgICAgICAgICAgaWYgKCdheGlzJyBpbiBlICYmIGUuYXhpcyA9PT0gZS5IT1JJWk9OVEFMX0FYSVMpIHtcclxuICAgICAgICAgICAgICAgIHNYID0gc1k7XHJcbiAgICAgICAgICAgICAgICBzWSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBYID0gc1ggKiBQSVhFTF9TVEVQO1xyXG4gICAgICAgICAgICBwWSA9IHNZICogUElYRUxfU1RFUDtcclxuXHJcbiAgICAgICAgICAgIGlmICgnZGVsdGFZJyBpbiBlKSB7XHJcbiAgICAgICAgICAgICAgICBwWSA9IGUuZGVsdGFZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgnZGVsdGFYJyBpbiBlKSB7XHJcbiAgICAgICAgICAgICAgICBwWCA9IGUuZGVsdGFYO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHBYIHx8IHBZKSAmJiBlLmRlbHRhTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUuZGVsdGFNb2RlID09PSAxKSB7IC8vIGRlbHRhIGluIExJTkUgdW5pdHNcclxuICAgICAgICAgICAgICAgICAgICBwWCAqPSBMSU5FX0hFSUdIVDtcclxuICAgICAgICAgICAgICAgICAgICBwWSAqPSBMSU5FX0hFSUdIVDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGRlbHRhIGluIFBBR0UgdW5pdHNcclxuICAgICAgICAgICAgICAgICAgICBwWCAqPSBQQUdFX0hFSUdIVDtcclxuICAgICAgICAgICAgICAgICAgICBwWSAqPSBQQUdFX0hFSUdIVDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmFsbC1iYWNrIGlmIHNwaW4gY2Fubm90IGJlIGRldGVybWluZWRcclxuICAgICAgICAgICAgaWYgKHBYICYmICFzWCkge1xyXG4gICAgICAgICAgICAgICAgc1ggPSAocFggPCAxKSA/IC0xIDogMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocFkgJiYgIXNZKSB7XHJcbiAgICAgICAgICAgICAgICBzWSA9IChwWSA8IDEpID8gLTEgOiAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3Bpblg6IHNYLFxyXG4gICAgICAgICAgICAgICAgc3Bpblk6IHNZLFxyXG4gICAgICAgICAgICAgICAgcGl4ZWxYOiBwWCxcclxuICAgICAgICAgICAgICAgIHBpeGVsWTogcFksXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVNb3VzZUVudGVyOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUVudGVyKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgc3dpcGVyLm1vdXNlRW50ZXJlZCA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYW5kbGVNb3VzZUxlYXZlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUxlYXZlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgc3dpcGVyLm1vdXNlRW50ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFuZGxlOiBmdW5jdGlvbiBoYW5kbGUoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGUgPSBldmVudDtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWw7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5tb3VzZUVudGVyZWQgJiYgIXBhcmFtcy5yZWxlYXNlT25FZGdlcykgeyByZXR1cm4gdHJ1ZTsgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgeyBlID0gZS5vcmlnaW5hbEV2ZW50OyB9IC8vIGpxdWVyeSBmaXhcclxuICAgICAgICAgICAgdmFyIGRlbHRhID0gMDtcclxuICAgICAgICAgICAgdmFyIHJ0bEZhY3RvciA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyAtMSA6IDE7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vdXNld2hlZWwubm9ybWFsaXplKGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5mb3JjZVRvQXhpcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkYXRhLnBpeGVsWCkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWSkpIHsgZGVsdGEgPSBkYXRhLnBpeGVsWCAqIHJ0bEZhY3RvcjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhkYXRhLnBpeGVsWSkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWCkpIHsgZGVsdGEgPSBkYXRhLnBpeGVsWTsgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWx0YSA9IE1hdGguYWJzKGRhdGEucGl4ZWxYKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxZKSA/IC1kYXRhLnBpeGVsWCAqIHJ0bEZhY3RvciA6IC1kYXRhLnBpeGVsWTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRlbHRhID09PSAwKSB7IHJldHVybiB0cnVlOyB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmludmVydCkgeyBkZWx0YSA9IC1kZWx0YTsgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmZyZWVNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbHMubm93KCkgLSBzd2lwZXIubW91c2V3aGVlbC5sYXN0U2Nyb2xsVGltZSA+IDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlbHRhIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKCFzd2lwZXIuaXNFbmQgfHwgc3dpcGVyLnBhcmFtcy5sb29wKSAmJiAhc3dpcGVyLmFuaW1hdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3Njcm9sbCcsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yZWxlYXNlT25FZGdlcykgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKCFzd2lwZXIuaXNCZWdpbm5pbmcgfHwgc3dpcGVyLnBhcmFtcy5sb29wKSAmJiAhc3dpcGVyLmFuaW1hdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGwnLCBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yZWxlYXNlT25FZGdlcykgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLm1vdXNld2hlZWwubGFzdFNjcm9sbFRpbWUgPSAobmV3IHdpbi5EYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEZyZWVtb2RlIG9yIHNjcm9sbENvbnRhaW5lcjpcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpICsgKGRlbHRhICogcGFyYW1zLnNlbnNpdGl2aXR5KTtcclxuICAgICAgICAgICAgICAgIHZhciB3YXNCZWdpbm5pbmcgPSBzd2lwZXIuaXNCZWdpbm5pbmc7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2FzRW5kID0gc3dpcGVyLmlzRW5kO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHsgcG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7IH1cclxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHsgcG9zaXRpb24gPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7IH1cclxuXHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUocG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCghd2FzQmVnaW5uaW5nICYmIHN3aXBlci5pc0JlZ2lubmluZykgfHwgKCF3YXNFbmQgJiYgc3dpcGVyLmlzRW5kKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3dpcGVyLm1vdXNld2hlZWwudGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLm1vdXNld2hlZWwudGltZW91dCA9IFV0aWxzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEVtaXQgZXZlbnRcclxuICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGwnLCBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdG9wIGF1dG9wbGF5XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheSAmJiBzd2lwZXIucGFyYW1zLmF1dG9wbGF5RGlzYWJsZU9uSW50ZXJhY3Rpb24pIHsgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTsgfVxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHBhZ2Ugc2Nyb2xsIG9uIGVkZ2UgcG9zaXRpb25zXHJcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT09IHN3aXBlci5taW5UcmFuc2xhdGUoKSB8fCBwb3NpdGlvbiA9PT0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxyXG4gICAgICAgICAgICBlbHNlIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuYWJsZTogZnVuY3Rpb24gZW5hYmxlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFNb3VzZXdoZWVsLmV2ZW50KSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCkgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHN3aXBlci4kZWw7XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2VkICE9PSAnY29udGFpbmVyJykge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gJChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2VkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0YXJnZXQub24oJ21vdXNlZW50ZXInLCBzd2lwZXIubW91c2V3aGVlbC5oYW5kbGVNb3VzZUVudGVyKTtcclxuICAgICAgICAgICAgdGFyZ2V0Lm9uKCdtb3VzZWxlYXZlJywgc3dpcGVyLm1vdXNld2hlZWwuaGFuZGxlTW91c2VMZWF2ZSk7XHJcbiAgICAgICAgICAgIHRhcmdldC5vbihNb3VzZXdoZWVsLmV2ZW50LCBzd2lwZXIubW91c2V3aGVlbC5oYW5kbGUpO1xyXG4gICAgICAgICAgICBzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFNb3VzZXdoZWVsLmV2ZW50KSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBzd2lwZXIuJGVsO1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdlZCAhPT0gJ2NvbnRhaW5lcicpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGFyZ2V0Lm9mZihNb3VzZXdoZWVsLmV2ZW50LCBzd2lwZXIubW91c2V3aGVlbC5oYW5kbGUpO1xyXG4gICAgICAgICAgICBzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBNb3VzZXdoZWVsJDEgPSB7XHJcbiAgICAgICAgbmFtZTogJ21vdXNld2hlZWwnLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBtb3VzZXdoZWVsOiB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGludmVydDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBmb3JjZVRvQXhpczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBzZW5zaXRpdml0eTogMSxcclxuICAgICAgICAgICAgICAgIGV2ZW50c1RhcmdlZDogJ2NvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgIG1vdXNld2hlZWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGU6IE1vdXNld2hlZWwuZW5hYmxlLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlOiBNb3VzZXdoZWVsLmRpc2FibGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZTogTW91c2V3aGVlbC5oYW5kbGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU1vdXNlRW50ZXI6IE1vdXNld2hlZWwuaGFuZGxlTW91c2VFbnRlci5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlTW91c2VMZWF2ZTogTW91c2V3aGVlbC5oYW5kbGVNb3VzZUxlYXZlLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0U2Nyb2xsVGltZTogVXRpbHMubm93KCksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZW5hYmxlZCkgeyBzd2lwZXIubW91c2V3aGVlbC5lbmFibGUoKTsgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCkgeyBzd2lwZXIubW91c2V3aGVlbC5kaXNhYmxlKCk7IH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgTmF2aWdhdGlvbiA9IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgLy8gVXBkYXRlIE5hdmlnYXRpb24gQnV0dG9uc1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHZhciByZWYgPSBzd2lwZXIubmF2aWdhdGlvbjtcclxuICAgICAgICAgICAgdmFyICRuZXh0RWwgPSByZWYuJG5leHRFbDtcclxuICAgICAgICAgICAgdmFyICRwcmV2RWwgPSByZWYuJHByZXZFbDtcclxuXHJcbiAgICAgICAgICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICRwcmV2RWwuYWRkQ2xhc3MocGFyYW1zLmRpc2FibGVkQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkcHJldkVsLnJlbW92ZUNsYXNzKHBhcmFtcy5kaXNhYmxlZENsYXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRwcmV2RWxbc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5pc0xvY2tlZCA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXShwYXJhbXMubG9ja0NsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIuaXNFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkbmV4dEVsLmFkZENsYXNzKHBhcmFtcy5kaXNhYmxlZENsYXNzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG5leHRFbC5yZW1vdmVDbGFzcyhwYXJhbXMuZGlzYWJsZWRDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkbmV4dEVsW3N3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10ocGFyYW1zLmxvY2tDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uO1xyXG4gICAgICAgICAgICBpZiAoIShwYXJhbXMubmV4dEVsIHx8IHBhcmFtcy5wcmV2RWwpKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAgICAgdmFyICRuZXh0RWw7XHJcbiAgICAgICAgICAgIHZhciAkcHJldkVsO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLm5leHRFbCkge1xyXG4gICAgICAgICAgICAgICAgJG5leHRFbCA9ICQocGFyYW1zLm5leHRFbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBwYXJhbXMubmV4dEVsID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICRuZXh0RWwubGVuZ3RoID4gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci4kZWwuZmluZChwYXJhbXMubmV4dEVsKS5sZW5ndGggPT09IDFcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICRuZXh0RWwgPSBzd2lwZXIuJGVsLmZpbmQocGFyYW1zLm5leHRFbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5wcmV2RWwpIHtcclxuICAgICAgICAgICAgICAgICRwcmV2RWwgPSAkKHBhcmFtcy5wcmV2RWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiZcclxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgcGFyYW1zLnByZXZFbCA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgICAgICAgICAkcHJldkVsLmxlbmd0aCA+IDEgJiZcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuJGVsLmZpbmQocGFyYW1zLnByZXZFbCkubGVuZ3RoID09PSAxXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAkcHJldkVsID0gc3dpcGVyLiRlbC5maW5kKHBhcmFtcy5wcmV2RWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICRuZXh0RWwub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgJHByZXZFbC5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3ApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlUHJldigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIubmF2aWdhdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgJG5leHRFbDogJG5leHRFbCxcclxuICAgICAgICAgICAgICAgIG5leHRFbDogJG5leHRFbCAmJiAkbmV4dEVsWzBdLFxyXG4gICAgICAgICAgICAgICAgJHByZXZFbDogJHByZXZFbCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogJHByZXZFbCAmJiAkcHJldkVsWzBdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcmVmID0gc3dpcGVyLm5hdmlnYXRpb247XHJcbiAgICAgICAgICAgIHZhciAkbmV4dEVsID0gcmVmLiRuZXh0RWw7XHJcbiAgICAgICAgICAgIHZhciAkcHJldkVsID0gcmVmLiRwcmV2RWw7XHJcbiAgICAgICAgICAgIGlmICgkbmV4dEVsICYmICRuZXh0RWwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkbmV4dEVsLm9mZignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICRuZXh0RWwucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmRpc2FibGVkQ2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkcHJldkVsLm9mZignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICRwcmV2RWwucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmRpc2FibGVkQ2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIE5hdmlnYXRpb24kMSA9IHtcclxuICAgICAgICBuYW1lOiAnbmF2aWdhdGlvbicsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogbnVsbCxcclxuXHJcbiAgICAgICAgICAgICAgICBoaWRlT25DbGljazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZENsYXNzOiAnc3dpcGVyLWJ1dHRvbi1kaXNhYmxlZCcsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW5DbGFzczogJ3N3aXBlci1idXR0b24taGlkZGVuJyxcclxuICAgICAgICAgICAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1idXR0b24tbG9jaycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0OiBOYXZpZ2F0aW9uLmluaXQuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZTogTmF2aWdhdGlvbi51cGRhdGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc3Ryb3k6IE5hdmlnYXRpb24uZGVzdHJveS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHN3aXBlci5uYXZpZ2F0aW9uLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5uYXZpZ2F0aW9uLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0b0VkZ2U6IGZ1bmN0aW9uIHRvRWRnZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLm5hdmlnYXRpb24udXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZyb21FZGdlOiBmdW5jdGlvbiBmcm9tRWRnZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLm5hdmlnYXRpb24udXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHN3aXBlci5uYXZpZ2F0aW9uLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uIGNsaWNrKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZiA9IHN3aXBlci5uYXZpZ2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgdmFyICRuZXh0RWwgPSByZWYuJG5leHRFbDtcclxuICAgICAgICAgICAgICAgIHZhciAkcHJldkVsID0gcmVmLiRwcmV2RWw7XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGVPbkNsaWNrICYmXHJcbiAgICAgICAgICAgICAgICAgICAgISQoZS50YXJnZXQpLmlzKCRwcmV2RWwpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgISQoZS50YXJnZXQpLmlzKCRuZXh0RWwpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJG5leHRFbCkgeyAkbmV4dEVsLnRvZ2dsZUNsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHByZXZFbCkgeyAkcHJldkVsLnRvZ2dsZUNsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7IH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgUGFnaW5hdGlvbiA9IHtcclxuICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgLy8gUmVuZGVyIHx8IFVwZGF0ZSBQYWdpbmF0aW9uIGJ1bGxldHMvaXRlbXNcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBydGwgPSBzd2lwZXIucnRsO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xyXG4gICAgICAgICAgICBpZiAoIXBhcmFtcy5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLiRlbCB8fCBzd2lwZXIucGFnaW5hdGlvbi4kZWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICB2YXIgc2xpZGVzTGVuZ3RoID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciAkZWwgPSBzd2lwZXIucGFnaW5hdGlvbi4kZWw7XHJcbiAgICAgICAgICAgIC8vIEN1cnJlbnQvVG90YWxcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnQ7XHJcbiAgICAgICAgICAgIHZhciB0b3RhbCA9IHN3aXBlci5wYXJhbXMubG9vcCA/IE1hdGguY2VpbCgoc2xpZGVzTGVuZ3RoIC0gKHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSkgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKSA6IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBNYXRoLmNlaWwoKHN3aXBlci5hY3RpdmVJbmRleCAtIHN3aXBlci5sb29wZWRTbGlkZXMpIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA+IHNsaWRlc0xlbmd0aCAtIDEgLSAoc3dpcGVyLmxvb3BlZFNsaWRlcyAqIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCAtPSAoc2xpZGVzTGVuZ3RoIC0gKHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA+IHRvdGFsIC0gMSkgeyBjdXJyZW50IC09IHRvdGFsOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDAgJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSAhPT0gJ2J1bGxldHMnKSB7IGN1cnJlbnQgPSB0b3RhbCArIGN1cnJlbnQ7IH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3dpcGVyLnNuYXBJbmRleCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBzd2lwZXIuc25hcEluZGV4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHN3aXBlci5hY3RpdmVJbmRleCB8fCAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFR5cGVzXHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVsbGV0cyA9IHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHM7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlyc3RJbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBsYXN0SW5kZXg7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWlkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSA9IGJ1bGxldHMuZXEoMClbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ291dGVyV2lkdGgnIDogJ291dGVySGVpZ2h0J10odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLmNzcyhzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnd2lkdGgnIDogJ2hlaWdodCcsICgoc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSAqIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzICsgNCkpICsgXCJweFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPiAxICYmIHN3aXBlci5wcmV2aW91c0luZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4ICs9IChjdXJyZW50IC0gc3dpcGVyLnByZXZpb3VzSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4ID4gKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgLSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4ID0gcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEluZGV4ID0gY3VycmVudCAtIHN3aXBlci5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0SW5kZXggPSBmaXJzdEluZGV4ICsgKE1hdGgubWluKGJ1bGxldHMubGVuZ3RoLCBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pZEluZGV4ID0gKGxhc3RJbmRleCArIGZpcnN0SW5kZXgpIC8gMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJ1bGxldHMucmVtb3ZlQ2xhc3MoKChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCIgXCIgKyAocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW5leHQgXCIgKyAocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW5leHQtbmV4dCBcIiArIChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCItcHJldiBcIiArIChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCItcHJldi1wcmV2IFwiICsgKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1tYWluXCIpKTtcclxuICAgICAgICAgICAgICAgIGlmICgkZWwubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldHMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGJ1bGxldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGJ1bGxldCA9ICQoYnVsbGV0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldEluZGV4ID0gJGJ1bGxldC5pbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPT09IGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRidWxsZXQuYWRkQ2xhc3MocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPj0gZmlyc3RJbmRleCAmJiBidWxsZXRJbmRleCA8PSBsYXN0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnVsbGV0LmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW1haW5cIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID09PSBmaXJzdEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGJ1bGxldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1wcmV2XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1wcmV2LXByZXZcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID09PSBsYXN0SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkYnVsbGV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW5leHRcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW5leHQtbmV4dFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICRidWxsZXQgPSBidWxsZXRzLmVxKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICRidWxsZXQuYWRkQ2xhc3MocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZmlyc3REaXNwbGF5ZWRCdWxsZXQgPSBidWxsZXRzLmVxKGZpcnN0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGxhc3REaXNwbGF5ZWRCdWxsZXQgPSBidWxsZXRzLmVxKGxhc3RJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBmaXJzdEluZGV4OyBpIDw9IGxhc3RJbmRleDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWxsZXRzLmVxKGkpLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW1haW5cIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRmaXJzdERpc3BsYXllZEJ1bGxldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByZXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLXByZXZcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJldigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoKChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCItcHJldi1wcmV2XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGxhc3REaXNwbGF5ZWRCdWxsZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5uZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1uZXh0XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5leHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW5leHQtbmV4dFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkeW5hbWljQnVsbGV0c0xlbmd0aCA9IE1hdGgubWluKGJ1bGxldHMubGVuZ3RoLCBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzICsgNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bGxldHNPZmZzZXQgPSAoKChzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRTaXplICogZHluYW1pY0J1bGxldHNMZW5ndGgpIC0gKHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldFNpemUpKSAvIDIpIC0gKG1pZEluZGV4ICogc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldFByb3AgPSBydGwgPyAncmlnaHQnIDogJ2xlZnQnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldHMuY3NzKHN3aXBlci5pc0hvcml6b250YWwoKSA/IG9mZnNldFByb3AgOiAndG9wJywgKGJ1bGxldHNPZmZzZXQgKyBcInB4XCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdmcmFjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICRlbC5maW5kKChcIi5cIiArIChwYXJhbXMuY3VycmVudENsYXNzKSkpLnRleHQocGFyYW1zLmZvcm1hdEZyYWN0aW9uQ3VycmVudChjdXJyZW50ICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoKFwiLlwiICsgKHBhcmFtcy50b3RhbENsYXNzKSkpLnRleHQocGFyYW1zLmZvcm1hdEZyYWN0aW9uVG90YWwodG90YWwpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzc2JhckRpcmVjdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMucHJvZ3Jlc3NiYXJPcHBvc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzYmFyRGlyZWN0aW9uID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NiYXJEaXJlY3Rpb24gPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHNjYWxlID0gKGN1cnJlbnQgKyAxKSAvIHRvdGFsO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNjYWxlWCA9IDE7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGVZID0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzc2JhckRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVYID0gc2NhbGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoKFwiLlwiICsgKHBhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzcykpKS50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlWChcIiArIHNjYWxlWCArIFwiKSBzY2FsZVkoXCIgKyBzY2FsZVkgKyBcIilcIikpLnRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnY3VzdG9tJyAmJiBwYXJhbXMucmVuZGVyQ3VzdG9tKSB7XHJcbiAgICAgICAgICAgICAgICAkZWwuaHRtbChwYXJhbXMucmVuZGVyQ3VzdG9tKHN3aXBlciwgY3VycmVudCArIDEsIHRvdGFsKSk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuZW1pdCgncGFnaW5hdGlvblJlbmRlcicsIHN3aXBlciwgJGVsWzBdKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdwYWdpbmF0aW9uVXBkYXRlJywgc3dpcGVyLCAkZWxbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRlbFtzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKHBhcmFtcy5sb2NrQ2xhc3MpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgIC8vIFJlbmRlciBDb250YWluZXJcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XHJcbiAgICAgICAgICAgIGlmICghcGFyYW1zLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uJGVsIHx8IHN3aXBlci5wYWdpbmF0aW9uLiRlbC5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXNMZW5ndGggPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIHZhciAkZWwgPSBzd2lwZXIucGFnaW5hdGlvbi4kZWw7XHJcbiAgICAgICAgICAgIHZhciBwYWdpbmF0aW9uSFRNTCA9ICcnO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG51bWJlck9mQnVsbGV0cyA9IHN3aXBlci5wYXJhbXMubG9vcCA/IE1hdGguY2VpbCgoc2xpZGVzTGVuZ3RoIC0gKHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSkgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKSA6IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mQnVsbGV0czsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5yZW5kZXJCdWxsZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgKz0gcGFyYW1zLnJlbmRlckJ1bGxldC5jYWxsKHN3aXBlciwgaSwgcGFyYW1zLmJ1bGxldENsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBcIjxcIiArIChwYXJhbXMuYnVsbGV0RWxlbWVudCkgKyBcIiBjbGFzcz1cXFwiXCIgKyAocGFyYW1zLmJ1bGxldENsYXNzKSArIFwiXFxcIj48L1wiICsgKHBhcmFtcy5idWxsZXRFbGVtZW50KSArIFwiPlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRlbC5odG1sKHBhZ2luYXRpb25IVE1MKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgPSAkZWwuZmluZCgoXCIuXCIgKyAocGFyYW1zLmJ1bGxldENsYXNzKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2ZyYWN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5yZW5kZXJGcmFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gcGFyYW1zLnJlbmRlckZyYWN0aW9uLmNhbGwoc3dpcGVyLCBwYXJhbXMuY3VycmVudENsYXNzLCBwYXJhbXMudG90YWxDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8c3BhbiBjbGFzcz1cXFwiXCIgKyAocGFyYW1zLmN1cnJlbnRDbGFzcykgKyBcIlxcXCI+PC9zcGFuPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyAvICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxzcGFuIGNsYXNzPVxcXCJcIiArIChwYXJhbXMudG90YWxDbGFzcykgKyBcIlxcXCI+PC9zcGFuPlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJGVsLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ3Byb2dyZXNzYmFyJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5yZW5kZXJQcm9ncmVzc2Jhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gcGFyYW1zLnJlbmRlclByb2dyZXNzYmFyLmNhbGwoc3dpcGVyLCBwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IFwiPHNwYW4gY2xhc3M9XFxcIlwiICsgKHBhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzcykgKyBcIlxcXCI+PC9zcGFuPlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJGVsLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMudHlwZSAhPT0gJ2N1c3RvbScpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdwYWdpbmF0aW9uUmVuZGVyJywgc3dpcGVyLnBhZ2luYXRpb24uJGVsWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XHJcbiAgICAgICAgICAgIGlmICghcGFyYW1zLmVsKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAgICAgdmFyICRlbCA9ICQocGFyYW1zLmVsKTtcclxuICAgICAgICAgICAgaWYgKCRlbC5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmXHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJyAmJlxyXG4gICAgICAgICAgICAgICAgJGVsLmxlbmd0aCA+IDEgJiZcclxuICAgICAgICAgICAgICAgIHN3aXBlci4kZWwuZmluZChwYXJhbXMuZWwpLmxlbmd0aCA9PT0gMVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICRlbCA9IHN3aXBlci4kZWwuZmluZChwYXJhbXMuZWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBwYXJhbXMuY2xpY2thYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3MocGFyYW1zLmNsaWNrYWJsZUNsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGVsLmFkZENsYXNzKHBhcmFtcy5tb2RpZmllckNsYXNzICsgcGFyYW1zLnR5cGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycgJiYgcGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XHJcbiAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3MoKFwiXCIgKyAocGFyYW1zLm1vZGlmaWVyQ2xhc3MpICsgKHBhcmFtcy50eXBlKSArIFwiLWR5bmFtaWNcIikpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ3Byb2dyZXNzYmFyJyAmJiBwYXJhbXMucHJvZ3Jlc3NiYXJPcHBvc2l0ZSkge1xyXG4gICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKHBhcmFtcy5wcm9ncmVzc2Jhck9wcG9zaXRlQ2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmNsaWNrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgJGVsLm9uKCdjbGljaycsIChcIi5cIiArIChwYXJhbXMuYnVsbGV0Q2xhc3MpKSwgZnVuY3Rpb24gb25DbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSAqIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkgeyBpbmRleCArPSBzd2lwZXIubG9vcGVkU2xpZGVzOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFnaW5hdGlvbiwge1xyXG4gICAgICAgICAgICAgICAgJGVsOiAkZWwsXHJcbiAgICAgICAgICAgICAgICBlbDogJGVsWzBdLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xyXG4gICAgICAgICAgICBpZiAoIXBhcmFtcy5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLiRlbCB8fCBzd2lwZXIucGFnaW5hdGlvbi4kZWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICB2YXIgJGVsID0gc3dpcGVyLnBhZ2luYXRpb24uJGVsO1xyXG5cclxuICAgICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKHBhcmFtcy5oaWRkZW5DbGFzcyk7XHJcbiAgICAgICAgICAgICRlbC5yZW1vdmVDbGFzcyhwYXJhbXMubW9kaWZpZXJDbGFzcyArIHBhcmFtcy50eXBlKTtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMpIHsgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5yZW1vdmVDbGFzcyhwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpOyB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuY2xpY2thYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAkZWwub2ZmKCdjbGljaycsIChcIi5cIiArIChwYXJhbXMuYnVsbGV0Q2xhc3MpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgUGFnaW5hdGlvbiQxID0ge1xyXG4gICAgICAgIG5hbWU6ICdwYWdpbmF0aW9uJyxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBidWxsZXRFbGVtZW50OiAnc3BhbicsXHJcbiAgICAgICAgICAgICAgICBjbGlja2FibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaGlkZU9uQ2xpY2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyQnVsbGV0OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvZ3Jlc3NiYXI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJGcmFjdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHJlbmRlckN1c3RvbTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzYmFyT3Bwb3NpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2J1bGxldHMnLCAvLyAnYnVsbGV0cycgb3IgJ3Byb2dyZXNzYmFyJyBvciAnZnJhY3Rpb24nIG9yICdjdXN0b20nXHJcbiAgICAgICAgICAgICAgICBkeW5hbWljQnVsbGV0czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkeW5hbWljTWFpbkJ1bGxldHM6IDEsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXRGcmFjdGlvbkN1cnJlbnQ6IGZ1bmN0aW9uIChudW1iZXIpIHsgcmV0dXJuIG51bWJlcjsgfSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdEZyYWN0aW9uVG90YWw6IGZ1bmN0aW9uIChudW1iZXIpIHsgcmV0dXJuIG51bWJlcjsgfSxcclxuICAgICAgICAgICAgICAgIGJ1bGxldENsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0JyxcclxuICAgICAgICAgICAgICAgIGJ1bGxldEFjdGl2ZUNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZScsXHJcbiAgICAgICAgICAgICAgICBtb2RpZmllckNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tJywgLy8gTkVXXHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JyxcclxuICAgICAgICAgICAgICAgIHRvdGFsQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi10b3RhbCcsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW5DbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWhpZGRlbicsXHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc2JhckZpbGxDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLWZpbGwnLFxyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NiYXJPcHBvc2l0ZUNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItb3Bwb3NpdGUnLFxyXG4gICAgICAgICAgICAgICAgY2xpY2thYmxlQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1jbGlja2FibGUnLCAvLyBORVdcclxuICAgICAgICAgICAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWxvY2snLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdDogUGFnaW5hdGlvbi5pbml0LmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXI6IFBhZ2luYXRpb24ucmVuZGVyLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGU6IFBhZ2luYXRpb24udXBkYXRlLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBkZXN0cm95OiBQYWdpbmF0aW9uLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWNCdWxsZXRJbmRleDogMCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24ucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWN0aXZlSW5kZXhDaGFuZ2U6IGZ1bmN0aW9uIGFjdGl2ZUluZGV4Q2hhbmdlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24udXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzd2lwZXIuc25hcEluZGV4ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzbmFwSW5kZXhDaGFuZ2U6IGZ1bmN0aW9uIHNuYXBJbmRleENoYW5nZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVzTGVuZ3RoQ2hhbmdlOiBmdW5jdGlvbiBzbGlkZXNMZW5ndGhDaGFuZ2UoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5yZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc25hcEdyaWRMZW5ndGhDaGFuZ2U6IGZ1bmN0aW9uIHNuYXBHcmlkTGVuZ3RoQ2hhbmdlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLnJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiBjbGljayhlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uZWwgJiZcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uaGlkZU9uQ2xpY2sgJiZcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICEkKGUudGFyZ2V0KS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwudG9nZ2xlQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGRlbkNsYXNzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgU2Nyb2xsYmFyID0ge1xyXG4gICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgdmFyIHNjcm9sbGJhciA9IHN3aXBlci5zY3JvbGxiYXI7XHJcbiAgICAgICAgICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xyXG4gICAgICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBzd2lwZXIucHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIHZhciBkcmFnU2l6ZSA9IHNjcm9sbGJhci5kcmFnU2l6ZTtcclxuICAgICAgICAgICAgdmFyIHRyYWNrU2l6ZSA9IHNjcm9sbGJhci50cmFja1NpemU7XHJcbiAgICAgICAgICAgIHZhciAkZHJhZ0VsID0gc2Nyb2xsYmFyLiRkcmFnRWw7XHJcbiAgICAgICAgICAgIHZhciAkZWwgPSBzY3JvbGxiYXIuJGVsO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XHJcblxyXG4gICAgICAgICAgICB2YXIgbmV3U2l6ZSA9IGRyYWdTaXplO1xyXG4gICAgICAgICAgICB2YXIgbmV3UG9zID0gKHRyYWNrU2l6ZSAtIGRyYWdTaXplKSAqIHByb2dyZXNzO1xyXG4gICAgICAgICAgICBpZiAocnRsKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdQb3MgPSAtbmV3UG9zO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1BvcyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTaXplID0gZHJhZ1NpemUgLSBuZXdQb3M7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9zID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoLW5ld1BvcyArIGRyYWdTaXplID4gdHJhY2tTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2l6ZSA9IHRyYWNrU2l6ZSArIG5ld1BvcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdQb3MgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTaXplID0gZHJhZ1NpemUgKyBuZXdQb3M7XHJcbiAgICAgICAgICAgICAgICBuZXdQb3MgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld1BvcyArIGRyYWdTaXplID4gdHJhY2tTaXplKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTaXplID0gdHJhY2tTaXplIC0gbmV3UG9zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChTdXBwb3J0LnRyYW5zZm9ybXMzZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRkcmFnRWwudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgbmV3UG9zICsgXCJweCwgMCwgMClcIikpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkZHJhZ0VsLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGVYKFwiICsgbmV3UG9zICsgXCJweClcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJGRyYWdFbFswXS5zdHlsZS53aWR0aCA9IG5ld1NpemUgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoU3VwcG9ydC50cmFuc2Zvcm1zM2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZHJhZ0VsLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZCgwcHgsIFwiICsgbmV3UG9zICsgXCJweCwgMClcIikpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkZHJhZ0VsLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGVZKFwiICsgbmV3UG9zICsgXCJweClcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJGRyYWdFbFswXS5zdHlsZS5oZWlnaHQgPSBuZXdTaXplICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGlkZSkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN3aXBlci5zY3JvbGxiYXIudGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLnRyYW5zaXRpb24oNDAwKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLiRkcmFnRWwudHJhbnNpdGlvbihkdXJhdGlvbik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGVTaXplOiBmdW5jdGlvbiB1cGRhdGVTaXplKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xyXG4gICAgICAgICAgICB2YXIgJGRyYWdFbCA9IHNjcm9sbGJhci4kZHJhZ0VsO1xyXG4gICAgICAgICAgICB2YXIgJGVsID0gc2Nyb2xsYmFyLiRlbDtcclxuXHJcbiAgICAgICAgICAgICRkcmFnRWxbMF0uc3R5bGUud2lkdGggPSAnJztcclxuICAgICAgICAgICAgJGRyYWdFbFswXS5zdHlsZS5oZWlnaHQgPSAnJztcclxuICAgICAgICAgICAgdmFyIHRyYWNrU2l6ZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICRlbFswXS5vZmZzZXRXaWR0aCA6ICRlbFswXS5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGl2aWRlciA9IHN3aXBlci5zaXplIC8gc3dpcGVyLnZpcnR1YWxTaXplO1xyXG4gICAgICAgICAgICB2YXIgbW92ZURpdmlkZXIgPSBkaXZpZGVyICogKHRyYWNrU2l6ZSAvIHN3aXBlci5zaXplKTtcclxuICAgICAgICAgICAgdmFyIGRyYWdTaXplO1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ1NpemUgPT09ICdhdXRvJykge1xyXG4gICAgICAgICAgICAgICAgZHJhZ1NpemUgPSB0cmFja1NpemUgKiBkaXZpZGVyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHJhZ1NpemUgPSBwYXJzZUludChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnU2l6ZSwgMTApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkZHJhZ0VsWzBdLnN0eWxlLndpZHRoID0gZHJhZ1NpemUgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZHJhZ0VsWzBdLnN0eWxlLmhlaWdodCA9IGRyYWdTaXplICsgXCJweFwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGl2aWRlciA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxbMF0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRlbFswXS5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFySGlkZSkge1xyXG4gICAgICAgICAgICAgICAgJGVsWzBdLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzY3JvbGxiYXIsIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrU2l6ZTogdHJhY2tTaXplLFxyXG4gICAgICAgICAgICAgICAgZGl2aWRlcjogZGl2aWRlcixcclxuICAgICAgICAgICAgICAgIG1vdmVEaXZpZGVyOiBtb3ZlRGl2aWRlcixcclxuICAgICAgICAgICAgICAgIGRyYWdTaXplOiBkcmFnU2l6ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbGJhci4kZWxbc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5pc0xvY2tlZCA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXShzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5sb2NrQ2xhc3MpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0RHJhZ1Bvc2l0aW9uOiBmdW5jdGlvbiBzZXREcmFnUG9zaXRpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNjcm9sbGJhciA9IHN3aXBlci5zY3JvbGxiYXI7XHJcbiAgICAgICAgICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xyXG4gICAgICAgICAgICB2YXIgJGVsID0gc2Nyb2xsYmFyLiRlbDtcclxuICAgICAgICAgICAgdmFyIGRyYWdTaXplID0gc2Nyb2xsYmFyLmRyYWdTaXplO1xyXG4gICAgICAgICAgICB2YXIgdHJhY2tTaXplID0gc2Nyb2xsYmFyLnRyYWNrU2l6ZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwb2ludGVyUG9zaXRpb247XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcclxuICAgICAgICAgICAgICAgIHBvaW50ZXJQb3NpdGlvbiA9ICgoZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAndG91Y2htb3ZlJykgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYIHx8IGUuY2xpZW50WCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludGVyUG9zaXRpb24gPSAoKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3RvdWNobW92ZScpID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWSB8fCBlLmNsaWVudFkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvblJhdGlvO1xyXG4gICAgICAgICAgICBwb3NpdGlvblJhdGlvID0gKChwb2ludGVyUG9zaXRpb24pIC0gJGVsLm9mZnNldCgpW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnXSAtIChkcmFnU2l6ZSAvIDIpKSAvICh0cmFja1NpemUgLSBkcmFnU2l6ZSk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uUmF0aW8gPSBNYXRoLm1heChNYXRoLm1pbihwb3NpdGlvblJhdGlvLCAxKSwgMCk7XHJcbiAgICAgICAgICAgIGlmIChydGwpIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uUmF0aW8gPSAxIC0gcG9zaXRpb25SYXRpbztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpICsgKChzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpICogcG9zaXRpb25SYXRpbyk7XHJcblxyXG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MocG9zaXRpb24pO1xyXG4gICAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XHJcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkRyYWdTdGFydDogZnVuY3Rpb24gb25EcmFnU3RhcnQoZSkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyO1xyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsYmFyID0gc3dpcGVyLnNjcm9sbGJhcjtcclxuICAgICAgICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcclxuICAgICAgICAgICAgdmFyICRlbCA9IHNjcm9sbGJhci4kZWw7XHJcbiAgICAgICAgICAgIHZhciAkZHJhZ0VsID0gc2Nyb2xsYmFyLiRkcmFnRWw7XHJcbiAgICAgICAgICAgIHN3aXBlci5zY3JvbGxiYXIuaXNUb3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uKDEwMCk7XHJcbiAgICAgICAgICAgICRkcmFnRWwudHJhbnNpdGlvbigxMDApO1xyXG4gICAgICAgICAgICBzY3JvbGxiYXIuc2V0RHJhZ1Bvc2l0aW9uKGUpO1xyXG5cclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN3aXBlci5zY3JvbGxiYXIuZHJhZ1RpbWVvdXQpO1xyXG5cclxuICAgICAgICAgICAgJGVsLnRyYW5zaXRpb24oMCk7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGlkZSkge1xyXG4gICAgICAgICAgICAgICAgJGVsLmNzcygnb3BhY2l0eScsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGxiYXJEcmFnU3RhcnQnLCBlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRHJhZ01vdmU6IGZ1bmN0aW9uIG9uRHJhZ01vdmUoZSkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNjcm9sbGJhciA9IHN3aXBlci5zY3JvbGxiYXI7XHJcbiAgICAgICAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XHJcbiAgICAgICAgICAgIHZhciAkZWwgPSBzY3JvbGxiYXIuJGVsO1xyXG4gICAgICAgICAgICB2YXIgJGRyYWdFbCA9IHNjcm9sbGJhci4kZHJhZ0VsO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIuc2Nyb2xsYmFyLmlzVG91Y2hlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XHJcbiAgICAgICAgICAgIGVsc2UgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH1cclxuICAgICAgICAgICAgc2Nyb2xsYmFyLnNldERyYWdQb3NpdGlvbihlKTtcclxuICAgICAgICAgICAgJHdyYXBwZXJFbC50cmFuc2l0aW9uKDApO1xyXG4gICAgICAgICAgICAkZWwudHJhbnNpdGlvbigwKTtcclxuICAgICAgICAgICAgJGRyYWdFbC50cmFuc2l0aW9uKDApO1xyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnc2Nyb2xsYmFyRHJhZ01vdmUnLCBlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRHJhZ0VuZDogZnVuY3Rpb24gb25EcmFnRW5kKGUpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xyXG4gICAgICAgICAgICB2YXIgJGVsID0gc2Nyb2xsYmFyLiRlbDtcclxuXHJcbiAgICAgICAgICAgIGlmICghc3dpcGVyLnNjcm9sbGJhci5pc1RvdWNoZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHN3aXBlci5zY3JvbGxiYXIuaXNUb3VjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGlkZSkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN3aXBlci5zY3JvbGxiYXIuZHJhZ1RpbWVvdXQpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNjcm9sbGJhci5kcmFnVGltZW91dCA9IFV0aWxzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkZWwuY3NzKCdvcGFjaXR5JywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsLnRyYW5zaXRpb24oNDAwKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGxiYXJEcmFnRW5kJywgZSk7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMuc25hcE9uUmVsZWFzZSkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuYWJsZURyYWdnYWJsZTogZnVuY3Rpb24gZW5hYmxlRHJhZ2dhYmxlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgdmFyIHNjcm9sbGJhciA9IHN3aXBlci5zY3JvbGxiYXI7XHJcbiAgICAgICAgICAgIHZhciB0b3VjaEV2ZW50cyA9IHN3aXBlci50b3VjaEV2ZW50cztcclxuICAgICAgICAgICAgdmFyIHRvdWNoRXZlbnRzRGVza3RvcCA9IHN3aXBlci50b3VjaEV2ZW50c0Rlc2t0b3A7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xyXG4gICAgICAgICAgICB2YXIgJGVsID0gc2Nyb2xsYmFyLiRlbDtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICRlbFswXTtcclxuICAgICAgICAgICAgdmFyIGFjdGl2ZUxpc3RlbmVyID0gU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lciA/IHsgcGFzc2l2ZTogZmFsc2UsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIHBhc3NpdmVMaXN0ZW5lciA9IFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHBhcmFtcy5wYXNzaXZlTGlzdGVuZXIgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFTdXBwb3J0LnRvdWNoICYmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMgfHwgU3VwcG9ydC5wcmVmaXhlZFBvaW50ZXJFdmVudHMpKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c0Rlc2t0b3Auc3RhcnQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzRGVza3RvcC5tb3ZlLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ01vdmUsIGFjdGl2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzRGVza3RvcC5lbmQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKFN1cHBvcnQudG91Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdTdGFydCwgYWN0aXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnTW92ZSwgYWN0aXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFEZXZpY2UuaW9zICYmICFEZXZpY2UuYW5kcm9pZCkgfHwgKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFTdXBwb3J0LnRvdWNoICYmIERldmljZS5pb3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdNb3ZlLCBhY3RpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ0VuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZURyYWdnYWJsZTogZnVuY3Rpb24gZGlzYWJsZURyYWdnYWJsZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xyXG4gICAgICAgICAgICB2YXIgdG91Y2hFdmVudHMgPSBzd2lwZXIudG91Y2hFdmVudHM7XHJcbiAgICAgICAgICAgIHZhciB0b3VjaEV2ZW50c0Rlc2t0b3AgPSBzd2lwZXIudG91Y2hFdmVudHNEZXNrdG9wO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcclxuICAgICAgICAgICAgdmFyICRlbCA9IHNjcm9sbGJhci4kZWw7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkZWxbMF07XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmVMaXN0ZW5lciA9IFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHBhcmFtcy5wYXNzaXZlTGlzdGVuZXIgPyB7IHBhc3NpdmU6IGZhbHNlLCBjYXB0dXJlOiBmYWxzZSB9IDogZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBwYXJhbXMucGFzc2l2ZUxpc3RlbmVyID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9IDogZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghU3VwcG9ydC50b3VjaCAmJiAoU3VwcG9ydC5wb2ludGVyRXZlbnRzIHx8IFN1cHBvcnQucHJlZml4ZWRQb2ludGVyRXZlbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHNEZXNrdG9wLnN0YXJ0LCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ1N0YXJ0LCBhY3RpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c0Rlc2t0b3AubW92ZSwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdNb3ZlLCBhY3RpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c0Rlc2t0b3AuZW5kLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ0VuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChTdXBwb3J0LnRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuc3RhcnQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ01vdmUsIGFjdGl2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5lbmQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhRGV2aWNlLmlvcyAmJiAhRGV2aWNlLmFuZHJvaWQpIHx8IChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhU3VwcG9ydC50b3VjaCAmJiBEZXZpY2UuaW9zKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ1N0YXJ0LCBhY3RpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnTW92ZSwgYWN0aXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICB2YXIgc2Nyb2xsYmFyID0gc3dpcGVyLnNjcm9sbGJhcjtcclxuICAgICAgICAgICAgdmFyICRzd2lwZXJFbCA9IHN3aXBlci4kZWw7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcclxuXHJcbiAgICAgICAgICAgIHZhciAkZWwgPSAkKHBhcmFtcy5lbCk7XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmICRlbC5sZW5ndGggPiAxICYmICRzd2lwZXJFbC5maW5kKHBhcmFtcy5lbCkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAkZWwgPSAkc3dpcGVyRWwuZmluZChwYXJhbXMuZWwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgJGRyYWdFbCA9ICRlbC5maW5kKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnQ2xhc3MpKSk7XHJcbiAgICAgICAgICAgIGlmICgkZHJhZ0VsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgJGRyYWdFbCA9ICQoKFwiPGRpdiBjbGFzcz1cXFwiXCIgKyAoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ0NsYXNzKSArIFwiXFxcIj48L2Rpdj5cIikpO1xyXG4gICAgICAgICAgICAgICAgJGVsLmFwcGVuZCgkZHJhZ0VsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHNjcm9sbGJhciwge1xyXG4gICAgICAgICAgICAgICAgJGVsOiAkZWwsXHJcbiAgICAgICAgICAgICAgICBlbDogJGVsWzBdLFxyXG4gICAgICAgICAgICAgICAgJGRyYWdFbDogJGRyYWdFbCxcclxuICAgICAgICAgICAgICAgIGRyYWdFbDogJGRyYWdFbFswXSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGFyYW1zLmRyYWdnYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsYmFyLmVuYWJsZURyYWdnYWJsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgc3dpcGVyLnNjcm9sbGJhci5kaXNhYmxlRHJhZ2dhYmxlKCk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIFNjcm9sbGJhciQxID0ge1xyXG4gICAgICAgIG5hbWU6ICdzY3JvbGxiYXInLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBzY3JvbGxiYXI6IHtcclxuICAgICAgICAgICAgICAgIGVsOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZHJhZ1NpemU6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgIGhpZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNuYXBPblJlbGVhc2U6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBsb2NrQ2xhc3M6ICdzd2lwZXItc2Nyb2xsYmFyLWxvY2snLFxyXG4gICAgICAgICAgICAgICAgZHJhZ0NsYXNzOiAnc3dpcGVyLXNjcm9sbGJhci1kcmFnJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsYmFyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdDogU2Nyb2xsYmFyLmluaXQuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc3Ryb3k6IFNjcm9sbGJhci5kZXN0cm95LmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTaXplOiBTY3JvbGxiYXIudXBkYXRlU2l6ZS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBTY3JvbGxiYXIuc2V0VHJhbnNsYXRlLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBTY3JvbGxiYXIuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRHJhZ2dhYmxlOiBTY3JvbGxiYXIuZW5hYmxlRHJhZ2dhYmxlLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlRHJhZ2dhYmxlOiBTY3JvbGxiYXIuZGlzYWJsZURyYWdnYWJsZS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0RHJhZ1Bvc2l0aW9uOiBTY3JvbGxiYXIuc2V0RHJhZ1Bvc2l0aW9uLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBvbkRyYWdTdGFydDogU2Nyb2xsYmFyLm9uRHJhZ1N0YXJ0LmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBvbkRyYWdNb3ZlOiBTY3JvbGxiYXIub25EcmFnTW92ZS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgb25EcmFnRW5kOiBTY3JvbGxiYXIub25EcmFnRW5kLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBpc1RvdWNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ1RpbWVvdXQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHN3aXBlci5zY3JvbGxiYXIuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNjcm9sbGJhci51cGRhdGVTaXplKCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNjcm9sbGJhci51cGRhdGVTaXplKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc2l6ZTogZnVuY3Rpb24gcmVzaXplKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb2JzZXJ2ZXJVcGRhdGU6IGZ1bmN0aW9uIG9ic2VydmVyVXBkYXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHN3aXBlci5zY3JvbGxiYXIuc2V0VHJhbnNsYXRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNjcm9sbGJhci5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnNjcm9sbGJhci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIFBhcmFsbGF4ID0ge1xyXG4gICAgICAgIHNldFRyYW5zZm9ybTogZnVuY3Rpb24gc2V0VHJhbnNmb3JtKGVsLCBwcm9ncmVzcykge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHJ0bCA9IHN3aXBlci5ydGw7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGVsID0gJChlbCk7XHJcbiAgICAgICAgICAgIHZhciBydGxGYWN0b3IgPSBydGwgPyAtMSA6IDE7XHJcblxyXG4gICAgICAgICAgICB2YXIgcCA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheCcpIHx8ICcwJztcclxuICAgICAgICAgICAgdmFyIHggPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgteCcpO1xyXG4gICAgICAgICAgICB2YXIgeSA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC15Jyk7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZSA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC1zY2FsZScpO1xyXG4gICAgICAgICAgICB2YXIgb3BhY2l0eSA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoeCB8fCB5KSB7XHJcbiAgICAgICAgICAgICAgICB4ID0geCB8fCAnMCc7XHJcbiAgICAgICAgICAgICAgICB5ID0geSB8fCAnMCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gcDtcclxuICAgICAgICAgICAgICAgIHkgPSAnMCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB5ID0gcDtcclxuICAgICAgICAgICAgICAgIHggPSAnMCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgoeCkuaW5kZXhPZignJScpID49IDApIHtcclxuICAgICAgICAgICAgICAgIHggPSAocGFyc2VJbnQoeCwgMTApICogcHJvZ3Jlc3MgKiBydGxGYWN0b3IpICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gKHggKiBwcm9ncmVzcyAqIHJ0bEZhY3RvcikgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCh5KS5pbmRleE9mKCclJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgeSA9IChwYXJzZUludCh5LCAxMCkgKiBwcm9ncmVzcykgKyBcIiVcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHkgPSAoeSAqIHByb2dyZXNzKSArIFwicHhcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcGFjaXR5ICE9PSAndW5kZWZpbmVkJyAmJiBvcGFjaXR5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudE9wYWNpdHkgPSBvcGFjaXR5IC0gKChvcGFjaXR5IC0gMSkgKiAoMSAtIE1hdGguYWJzKHByb2dyZXNzKSkpO1xyXG4gICAgICAgICAgICAgICAgJGVsWzBdLnN0eWxlLm9wYWNpdHkgPSBjdXJyZW50T3BhY2l0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjYWxlID09PSAndW5kZWZpbmVkJyB8fCBzY2FsZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgJGVsLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZChcIiArIHggKyBcIiwgXCIgKyB5ICsgXCIsIDBweClcIikpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRTY2FsZSA9IHNjYWxlIC0gKChzY2FsZSAtIDEpICogKDEgLSBNYXRoLmFicyhwcm9ncmVzcykpKTtcclxuICAgICAgICAgICAgICAgICRlbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCIsIFwiICsgeSArIFwiLCAwcHgpIHNjYWxlKFwiICsgY3VycmVudFNjYWxlICsgXCIpXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJGVsID0gc3dpcGVyLiRlbDtcclxuICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XHJcbiAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9IHN3aXBlci5wcm9ncmVzcztcclxuICAgICAgICAgICAgdmFyIHNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkO1xyXG4gICAgICAgICAgICAkZWwuY2hpbGRyZW4oJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldJylcclxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIucGFyYWxsYXguc2V0VHJhbnNmb3JtKGVsLCBwcm9ncmVzcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2xpZGVzLmVhY2goZnVuY3Rpb24gKHNsaWRlSW5kZXgsIHNsaWRlRWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZVByb2dyZXNzID0gc2xpZGVFbC5wcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwID4gMSAmJiBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlUHJvZ3Jlc3MgKz0gTWF0aC5jZWlsKHNsaWRlSW5kZXggLyAyKSAtIChwcm9ncmVzcyAqIChzbmFwR3JpZC5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzbGlkZVByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgoc2xpZGVQcm9ncmVzcywgLTEpLCAxKTtcclxuICAgICAgICAgICAgICAgICQoc2xpZGVFbCkuZmluZCgnW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnBhcmFsbGF4LnNldFRyYW5zZm9ybShlbCwgc2xpZGVQcm9ncmVzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xyXG4gICAgICAgICAgICBpZiAoZHVyYXRpb24gPT09IHZvaWQgMCkgZHVyYXRpb24gPSB0aGlzLnBhcmFtcy5zcGVlZDtcclxuXHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJGVsID0gc3dpcGVyLiRlbDtcclxuICAgICAgICAgICAgJGVsLmZpbmQoJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldJylcclxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgcGFyYWxsYXhFbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkcGFyYWxsYXhFbCA9ICQocGFyYWxsYXhFbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFsbGF4RHVyYXRpb24gPSBwYXJzZUludCgkcGFyYWxsYXhFbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC1kdXJhdGlvbicpLCAxMCkgfHwgZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGR1cmF0aW9uID09PSAwKSB7IHBhcmFsbGF4RHVyYXRpb24gPSAwOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgJHBhcmFsbGF4RWwudHJhbnNpdGlvbihwYXJhbGxheER1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBQYXJhbGxheCQxID0ge1xyXG4gICAgICAgIG5hbWU6ICdwYXJhbGxheCcsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIHBhcmFsbGF4OiB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICAgICAgcGFyYWxsYXg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUcmFuc2Zvcm06IFBhcmFsbGF4LnNldFRyYW5zZm9ybS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBQYXJhbGxheC5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRyYW5zaXRpb246IFBhcmFsbGF4LnNldFRyYW5zaXRpb24uYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiBiZWZvcmVJbml0KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXguZW5hYmxlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYXJhbGxheCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci5wYXJhbGxheC5zZXRUcmFuc2xhdGUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYXJhbGxheCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci5wYXJhbGxheC5zZXRUcmFuc2xhdGUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXgpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIucGFyYWxsYXguc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIFpvb20gPSB7XHJcbiAgICAgICAgLy8gQ2FsYyBTY2FsZSBGcm9tIE11bHRpLXRvdWNoZXNcclxuICAgICAgICBnZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzOiBmdW5jdGlvbiBnZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPCAyKSB7IHJldHVybiAxOyB9XHJcbiAgICAgICAgICAgIHZhciB4MSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcclxuICAgICAgICAgICAgdmFyIHkxID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xyXG4gICAgICAgICAgICB2YXIgeDIgPSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVg7XHJcbiAgICAgICAgICAgIHZhciB5MiA9IGUudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWTtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KChNYXRoLnBvdygoeDIgLSB4MSksIDIpKSArIChNYXRoLnBvdygoeTIgLSB5MSksIDIpKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIEV2ZW50c1xyXG4gICAgICAgIG9uR2VzdHVyZVN0YXJ0OiBmdW5jdGlvbiBvbkdlc3R1cmVTdGFydChlKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy56b29tO1xyXG4gICAgICAgICAgICB2YXIgem9vbSA9IHN3aXBlci56b29tO1xyXG4gICAgICAgICAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcclxuICAgICAgICAgICAgem9vbS5mYWtlR2VzdHVyZVRvdWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgem9vbS5mYWtlR2VzdHVyZU1vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghU3VwcG9ydC5nZXN0dXJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoc3RhcnQnIHx8IChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB6b29tLmZha2VHZXN0dXJlVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnNjYWxlU3RhcnQgPSBab29tLmdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLiRzbGlkZUVsIHx8ICFnZXN0dXJlLiRzbGlkZUVsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5zd2lwZXItc2xpZGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChnZXN0dXJlLiRzbGlkZUVsLmxlbmd0aCA9PT0gMCkgeyBnZXN0dXJlLiRzbGlkZUVsID0gc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpOyB9XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsID0gZ2VzdHVyZS4kc2xpZGVFbC5maW5kKCdpbWcsIHN2ZywgY2FudmFzJyk7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KChcIi5cIiArIChwYXJhbXMuY29udGFpbmVyQ2xhc3MpKSk7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLm1heFJhdGlvID0gZ2VzdHVyZS4kaW1hZ2VXcmFwRWwuYXR0cignZGF0YS1zd2lwZXItem9vbScpIHx8IHBhcmFtcy5tYXhSYXRpbztcclxuICAgICAgICAgICAgICAgIGlmIChnZXN0dXJlLiRpbWFnZVdyYXBFbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oMCk7XHJcbiAgICAgICAgICAgIHN3aXBlci56b29tLmlzU2NhbGluZyA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkdlc3R1cmVDaGFuZ2U6IGZ1bmN0aW9uIG9uR2VzdHVyZUNoYW5nZShlKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy56b29tO1xyXG4gICAgICAgICAgICB2YXIgem9vbSA9IHN3aXBlci56b29tO1xyXG4gICAgICAgICAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcclxuICAgICAgICAgICAgaWYgKCFTdXBwb3J0Lmdlc3R1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50eXBlICE9PSAndG91Y2htb3ZlJyB8fCAoZS50eXBlID09PSAndG91Y2htb3ZlJyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB6b29tLmZha2VHZXN0dXJlTW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5zY2FsZU1vdmUgPSBab29tLmdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAoU3VwcG9ydC5nZXN0dXJlcykge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnpvb20uc2NhbGUgPSBlLnNjYWxlICogem9vbS5jdXJyZW50U2NhbGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB6b29tLnNjYWxlID0gKGdlc3R1cmUuc2NhbGVNb3ZlIC8gZ2VzdHVyZS5zY2FsZVN0YXJ0KSAqIHpvb20uY3VycmVudFNjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh6b29tLnNjYWxlID4gZ2VzdHVyZS5tYXhSYXRpbykge1xyXG4gICAgICAgICAgICAgICAgem9vbS5zY2FsZSA9IChnZXN0dXJlLm1heFJhdGlvIC0gMSkgKyAoTWF0aC5wb3coKCh6b29tLnNjYWxlIC0gZ2VzdHVyZS5tYXhSYXRpbykgKyAxKSwgMC41KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHpvb20uc2NhbGUgPCBwYXJhbXMubWluUmF0aW8pIHtcclxuICAgICAgICAgICAgICAgIHpvb20uc2NhbGUgPSAocGFyYW1zLm1pblJhdGlvICsgMSkgLSAoTWF0aC5wb3coKChwYXJhbXMubWluUmF0aW8gLSB6b29tLnNjYWxlKSArIDEpLCAwLjUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoXCIgKyAoem9vbS5zY2FsZSkgKyBcIilcIikpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25HZXN0dXJlRW5kOiBmdW5jdGlvbiBvbkdlc3R1cmVFbmQoZSkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcclxuICAgICAgICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcclxuICAgICAgICAgICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XHJcbiAgICAgICAgICAgIGlmICghU3VwcG9ydC5nZXN0dXJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF6b29tLmZha2VHZXN0dXJlVG91Y2hlZCB8fCAhem9vbS5mYWtlR2VzdHVyZU1vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoZW5kJyB8fCAoZS50eXBlID09PSAndG91Y2hlbmQnICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoIDwgMiAmJiAhRGV2aWNlLmFuZHJvaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgem9vbS5mYWtlR2VzdHVyZVRvdWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHpvb20uZmFrZUdlc3R1cmVNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgem9vbS5zY2FsZSA9IE1hdGgubWF4KE1hdGgubWluKHpvb20uc2NhbGUsIGdlc3R1cmUubWF4UmF0aW8pLCBwYXJhbXMubWluUmF0aW8pO1xyXG4gICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCkudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZShcIiArICh6b29tLnNjYWxlKSArIFwiKVwiKSk7XHJcbiAgICAgICAgICAgIHpvb20uY3VycmVudFNjYWxlID0gem9vbS5zY2FsZTtcclxuICAgICAgICAgICAgem9vbS5pc1NjYWxpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHpvb20uc2NhbGUgPT09IDEpIHsgZ2VzdHVyZS4kc2xpZGVFbCA9IHVuZGVmaW5lZDsgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZSkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcclxuICAgICAgICAgICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IHpvb20uaW1hZ2U7XHJcbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKGltYWdlLmlzVG91Y2hlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKERldmljZS5hbmRyb2lkKSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxyXG4gICAgICAgICAgICBpbWFnZS5pc1RvdWNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbWFnZS50b3VjaGVzU3RhcnQueCA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcclxuICAgICAgICAgICAgaW1hZ2UudG91Y2hlc1N0YXJ0LnkgPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRvdWNoTW92ZTogZnVuY3Rpb24gb25Ub3VjaE1vdmUoZSkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcclxuICAgICAgICAgICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IHpvb20uaW1hZ2U7XHJcbiAgICAgICAgICAgIHZhciB2ZWxvY2l0eSA9IHpvb20udmVsb2NpdHk7XHJcbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFpbWFnZS5pc1RvdWNoZWQgfHwgIWdlc3R1cmUuJHNsaWRlRWwpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWltYWdlLmlzTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLndpZHRoID0gZ2VzdHVyZS4kaW1hZ2VFbFswXS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIGltYWdlLmhlaWdodCA9IGdlc3R1cmUuJGltYWdlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3RhcnRYID0gVXRpbHMuZ2V0VHJhbnNsYXRlKGdlc3R1cmUuJGltYWdlV3JhcEVsWzBdLCAneCcpIHx8IDA7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5zdGFydFkgPSBVdGlscy5nZXRUcmFuc2xhdGUoZ2VzdHVyZS4kaW1hZ2VXcmFwRWxbMF0sICd5JykgfHwgMDtcclxuICAgICAgICAgICAgICAgIGdlc3R1cmUuc2xpZGVXaWR0aCA9IGdlc3R1cmUuJHNsaWRlRWxbMF0ub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnNsaWRlSGVpZ2h0ID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKDApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5ydGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZS5zdGFydFggPSAtaW1hZ2Uuc3RhcnRYO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnN0YXJ0WSA9IC1pbWFnZS5zdGFydFk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRGVmaW5lIGlmIHdlIG5lZWQgaW1hZ2UgZHJhZ1xyXG4gICAgICAgICAgICB2YXIgc2NhbGVkV2lkdGggPSBpbWFnZS53aWR0aCAqIHpvb20uc2NhbGU7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZWRIZWlnaHQgPSBpbWFnZS5oZWlnaHQgKiB6b29tLnNjYWxlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNjYWxlZFdpZHRoIDwgZ2VzdHVyZS5zbGlkZVdpZHRoICYmIHNjYWxlZEhlaWdodCA8IGdlc3R1cmUuc2xpZGVIZWlnaHQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgICAgICBpbWFnZS5taW5YID0gTWF0aC5taW4oKChnZXN0dXJlLnNsaWRlV2lkdGggLyAyKSAtIChzY2FsZWRXaWR0aCAvIDIpKSwgMCk7XHJcbiAgICAgICAgICAgIGltYWdlLm1heFggPSAtaW1hZ2UubWluWDtcclxuICAgICAgICAgICAgaW1hZ2UubWluWSA9IE1hdGgubWluKCgoZ2VzdHVyZS5zbGlkZUhlaWdodCAvIDIpIC0gKHNjYWxlZEhlaWdodCAvIDIpKSwgMCk7XHJcbiAgICAgICAgICAgIGltYWdlLm1heFkgPSAtaW1hZ2UubWluWTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlLnRvdWNoZXNDdXJyZW50LnggPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcclxuICAgICAgICAgICAgaW1hZ2UudG91Y2hlc0N1cnJlbnQueSA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbWFnZS5pc01vdmVkICYmICF6b29tLmlzU2NhbGluZykge1xyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5pc0hvcml6b250YWwoKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgKE1hdGguZmxvb3IoaW1hZ2UubWluWCkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRYKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC54IDwgaW1hZ2UudG91Y2hlc1N0YXJ0LngpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChNYXRoLmZsb29yKGltYWdlLm1heFgpID09PSBNYXRoLmZsb29yKGltYWdlLnN0YXJ0WCkgJiYgaW1hZ2UudG91Y2hlc0N1cnJlbnQueCA+IGltYWdlLnRvdWNoZXNTdGFydC54KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgIXN3aXBlci5pc0hvcml6b250YWwoKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgKE1hdGguZmxvb3IoaW1hZ2UubWluWSkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRZKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC55IDwgaW1hZ2UudG91Y2hlc1N0YXJ0LnkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChNYXRoLmZsb29yKGltYWdlLm1heFkpID09PSBNYXRoLmZsb29yKGltYWdlLnN0YXJ0WSkgJiYgaW1hZ2UudG91Y2hlc0N1cnJlbnQueSA+IGltYWdlLnRvdWNoZXNTdGFydC55KVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpbWFnZS5pc01vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaW1hZ2UuY3VycmVudFggPSAoaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIGltYWdlLnRvdWNoZXNTdGFydC54KSArIGltYWdlLnN0YXJ0WDtcclxuICAgICAgICAgICAgaW1hZ2UuY3VycmVudFkgPSAoaW1hZ2UudG91Y2hlc0N1cnJlbnQueSAtIGltYWdlLnRvdWNoZXNTdGFydC55KSArIGltYWdlLnN0YXJ0WTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbWFnZS5jdXJyZW50WCA8IGltYWdlLm1pblgpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmN1cnJlbnRYID0gKGltYWdlLm1pblggKyAxKSAtIChNYXRoLnBvdygoKGltYWdlLm1pblggLSBpbWFnZS5jdXJyZW50WCkgKyAxKSwgMC44KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGltYWdlLmN1cnJlbnRYID4gaW1hZ2UubWF4WCkge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY3VycmVudFggPSAoaW1hZ2UubWF4WCAtIDEpICsgKE1hdGgucG93KCgoaW1hZ2UuY3VycmVudFggLSBpbWFnZS5tYXhYKSArIDEpLCAwLjgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGltYWdlLmN1cnJlbnRZIDwgaW1hZ2UubWluWSkge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuY3VycmVudFkgPSAoaW1hZ2UubWluWSArIDEpIC0gKE1hdGgucG93KCgoaW1hZ2UubWluWSAtIGltYWdlLmN1cnJlbnRZKSArIDEpLCAwLjgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW1hZ2UuY3VycmVudFkgPiBpbWFnZS5tYXhZKSB7XHJcbiAgICAgICAgICAgICAgICBpbWFnZS5jdXJyZW50WSA9IChpbWFnZS5tYXhZIC0gMSkgKyAoTWF0aC5wb3coKChpbWFnZS5jdXJyZW50WSAtIGltYWdlLm1heFkpICsgMSksIDAuOCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBWZWxvY2l0eVxyXG4gICAgICAgICAgICBpZiAoIXZlbG9jaXR5LnByZXZQb3NpdGlvblgpIHsgdmVsb2NpdHkucHJldlBvc2l0aW9uWCA9IGltYWdlLnRvdWNoZXNDdXJyZW50Lng7IH1cclxuICAgICAgICAgICAgaWYgKCF2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSB7IHZlbG9jaXR5LnByZXZQb3NpdGlvblkgPSBpbWFnZS50b3VjaGVzQ3VycmVudC55OyB9XHJcbiAgICAgICAgICAgIGlmICghdmVsb2NpdHkucHJldlRpbWUpIHsgdmVsb2NpdHkucHJldlRpbWUgPSBEYXRlLm5vdygpOyB9XHJcbiAgICAgICAgICAgIHZlbG9jaXR5LnggPSAoaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIHZlbG9jaXR5LnByZXZQb3NpdGlvblgpIC8gKERhdGUubm93KCkgLSB2ZWxvY2l0eS5wcmV2VGltZSkgLyAyO1xyXG4gICAgICAgICAgICB2ZWxvY2l0eS55ID0gKGltYWdlLnRvdWNoZXNDdXJyZW50LnkgLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSAvIChEYXRlLm5vdygpIC0gdmVsb2NpdHkucHJldlRpbWUpIC8gMjtcclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGltYWdlLnRvdWNoZXNDdXJyZW50LnggLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSA8IDIpIHsgdmVsb2NpdHkueCA9IDA7IH1cclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGltYWdlLnRvdWNoZXNDdXJyZW50LnkgLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSA8IDIpIHsgdmVsb2NpdHkueSA9IDA7IH1cclxuICAgICAgICAgICAgdmVsb2NpdHkucHJldlBvc2l0aW9uWCA9IGltYWdlLnRvdWNoZXNDdXJyZW50Lng7XHJcbiAgICAgICAgICAgIHZlbG9jaXR5LnByZXZQb3NpdGlvblkgPSBpbWFnZS50b3VjaGVzQ3VycmVudC55O1xyXG4gICAgICAgICAgICB2ZWxvY2l0eS5wcmV2VGltZSA9IERhdGUubm93KCk7XHJcblxyXG4gICAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyAoaW1hZ2UuY3VycmVudFgpICsgXCJweCwgXCIgKyAoaW1hZ2UuY3VycmVudFkpICsgXCJweCwwKVwiKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRvdWNoRW5kOiBmdW5jdGlvbiBvblRvdWNoRW5kKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcclxuICAgICAgICAgICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IHpvb20uaW1hZ2U7XHJcbiAgICAgICAgICAgIHZhciB2ZWxvY2l0eSA9IHpvb20udmVsb2NpdHk7XHJcbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKCFpbWFnZS5pc1RvdWNoZWQgfHwgIWltYWdlLmlzTW92ZWQpIHtcclxuICAgICAgICAgICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UuaXNNb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpbWFnZS5pc01vdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZhciBtb21lbnR1bUR1cmF0aW9uWCA9IDMwMDtcclxuICAgICAgICAgICAgdmFyIG1vbWVudHVtRHVyYXRpb25ZID0gMzAwO1xyXG4gICAgICAgICAgICB2YXIgbW9tZW50dW1EaXN0YW5jZVggPSB2ZWxvY2l0eS54ICogbW9tZW50dW1EdXJhdGlvblg7XHJcbiAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvblggPSBpbWFnZS5jdXJyZW50WCArIG1vbWVudHVtRGlzdGFuY2VYO1xyXG4gICAgICAgICAgICB2YXIgbW9tZW50dW1EaXN0YW5jZVkgPSB2ZWxvY2l0eS55ICogbW9tZW50dW1EdXJhdGlvblk7XHJcbiAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvblkgPSBpbWFnZS5jdXJyZW50WSArIG1vbWVudHVtRGlzdGFuY2VZO1xyXG5cclxuICAgICAgICAgICAgLy8gRml4IGR1cmF0aW9uXHJcbiAgICAgICAgICAgIGlmICh2ZWxvY2l0eS54ICE9PSAwKSB7IG1vbWVudHVtRHVyYXRpb25YID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uWCAtIGltYWdlLmN1cnJlbnRYKSAvIHZlbG9jaXR5LngpOyB9XHJcbiAgICAgICAgICAgIGlmICh2ZWxvY2l0eS55ICE9PSAwKSB7IG1vbWVudHVtRHVyYXRpb25ZID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uWSAtIGltYWdlLmN1cnJlbnRZKSAvIHZlbG9jaXR5LnkpOyB9XHJcbiAgICAgICAgICAgIHZhciBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5tYXgobW9tZW50dW1EdXJhdGlvblgsIG1vbWVudHVtRHVyYXRpb25ZKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlLmN1cnJlbnRYID0gbmV3UG9zaXRpb25YO1xyXG4gICAgICAgICAgICBpbWFnZS5jdXJyZW50WSA9IG5ld1Bvc2l0aW9uWTtcclxuXHJcbiAgICAgICAgICAgIC8vIERlZmluZSBpZiB3ZSBuZWVkIGltYWdlIGRyYWdcclxuICAgICAgICAgICAgdmFyIHNjYWxlZFdpZHRoID0gaW1hZ2Uud2lkdGggKiB6b29tLnNjYWxlO1xyXG4gICAgICAgICAgICB2YXIgc2NhbGVkSGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0ICogem9vbS5zY2FsZTtcclxuICAgICAgICAgICAgaW1hZ2UubWluWCA9IE1hdGgubWluKCgoZ2VzdHVyZS5zbGlkZVdpZHRoIC8gMikgLSAoc2NhbGVkV2lkdGggLyAyKSksIDApO1xyXG4gICAgICAgICAgICBpbWFnZS5tYXhYID0gLWltYWdlLm1pblg7XHJcbiAgICAgICAgICAgIGltYWdlLm1pblkgPSBNYXRoLm1pbigoKGdlc3R1cmUuc2xpZGVIZWlnaHQgLyAyKSAtIChzY2FsZWRIZWlnaHQgLyAyKSksIDApO1xyXG4gICAgICAgICAgICBpbWFnZS5tYXhZID0gLWltYWdlLm1pblk7XHJcbiAgICAgICAgICAgIGltYWdlLmN1cnJlbnRYID0gTWF0aC5tYXgoTWF0aC5taW4oaW1hZ2UuY3VycmVudFgsIGltYWdlLm1heFgpLCBpbWFnZS5taW5YKTtcclxuICAgICAgICAgICAgaW1hZ2UuY3VycmVudFkgPSBNYXRoLm1heChNYXRoLm1pbihpbWFnZS5jdXJyZW50WSwgaW1hZ2UubWF4WSksIGltYWdlLm1pblkpO1xyXG5cclxuICAgICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKS50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyAoaW1hZ2UuY3VycmVudFgpICsgXCJweCwgXCIgKyAoaW1hZ2UuY3VycmVudFkpICsgXCJweCwwKVwiKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XHJcbiAgICAgICAgICAgIHZhciBnZXN0dXJlID0gem9vbS5nZXN0dXJlO1xyXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS4kc2xpZGVFbCAmJiBzd2lwZXIucHJldmlvdXNJbmRleCAhPT0gc3dpcGVyLmFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpJyk7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xyXG4gICAgICAgICAgICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGdlc3R1cmUuJGltYWdlRWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICB6b29tLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgICAgIHpvb20uY3VycmVudFNjYWxlID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gVG9nZ2xlIFpvb21cclxuICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uIHRvZ2dsZShlKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgem9vbSA9IHN3aXBlci56b29tO1xyXG5cclxuICAgICAgICAgICAgaWYgKHpvb20uc2NhbGUgJiYgem9vbS5zY2FsZSAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgLy8gWm9vbSBPdXRcclxuICAgICAgICAgICAgICAgIHpvb20ub3V0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBab29tIEluXHJcbiAgICAgICAgICAgICAgICB6b29tLmluKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbjogZnVuY3Rpb24gaW4kMShlKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcclxuICAgICAgICAgICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IHpvb20uaW1hZ2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUuJHNsaWRlRWwpIHtcclxuICAgICAgICAgICAgICAgIGdlc3R1cmUuJHNsaWRlRWwgPSBzd2lwZXIuY2xpY2tlZFNsaWRlID8gJChzd2lwZXIuY2xpY2tlZFNsaWRlKSA6IHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIGdlc3R1cmUuJGltYWdlRWwgPSBnZXN0dXJlLiRzbGlkZUVsLmZpbmQoJ2ltZywgc3ZnLCBjYW52YXMnKTtcclxuICAgICAgICAgICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsID0gZ2VzdHVyZS4kaW1hZ2VFbC5wYXJlbnQoKFwiLlwiICsgKHBhcmFtcy5jb250YWluZXJDbGFzcykpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUuJGltYWdlRWwgfHwgZ2VzdHVyZS4kaW1hZ2VFbC5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgICAgICBnZXN0dXJlLiRzbGlkZUVsLmFkZENsYXNzKChcIlwiICsgKHBhcmFtcy56b29tZWRTbGlkZUNsYXNzKSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvdWNoWDtcclxuICAgICAgICAgICAgdmFyIHRvdWNoWTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldFg7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRZO1xyXG4gICAgICAgICAgICB2YXIgZGlmZlg7XHJcbiAgICAgICAgICAgIHZhciBkaWZmWTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZVg7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGVZO1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2VXaWR0aDtcclxuICAgICAgICAgICAgdmFyIGltYWdlSGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgc2NhbGVkV2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZWRIZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGVNaW5YO1xyXG4gICAgICAgICAgICB2YXIgdHJhbnNsYXRlTWluWTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZU1heFg7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGVNYXhZO1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVXaWR0aDtcclxuICAgICAgICAgICAgdmFyIHNsaWRlSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWFnZS50b3VjaGVzU3RhcnQueCA9PT0gJ3VuZGVmaW5lZCcgJiYgZSkge1xyXG4gICAgICAgICAgICAgICAgdG91Y2hYID0gZS50eXBlID09PSAndG91Y2hlbmQnID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XHJcbiAgICAgICAgICAgICAgICB0b3VjaFkgPSBlLnR5cGUgPT09ICd0b3VjaGVuZCcgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvdWNoWCA9IGltYWdlLnRvdWNoZXNTdGFydC54O1xyXG4gICAgICAgICAgICAgICAgdG91Y2hZID0gaW1hZ2UudG91Y2hlc1N0YXJ0Lnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHpvb20uc2NhbGUgPSBnZXN0dXJlLiRpbWFnZVdyYXBFbC5hdHRyKCdkYXRhLXN3aXBlci16b29tJykgfHwgcGFyYW1zLm1heFJhdGlvO1xyXG4gICAgICAgICAgICB6b29tLmN1cnJlbnRTY2FsZSA9IGdlc3R1cmUuJGltYWdlV3JhcEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXpvb20nKSB8fCBwYXJhbXMubWF4UmF0aW87XHJcbiAgICAgICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZVdpZHRoID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIHNsaWRlSGVpZ2h0ID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRYID0gZ2VzdHVyZS4kc2xpZGVFbC5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WSA9IGdlc3R1cmUuJHNsaWRlRWwub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgZGlmZlggPSAob2Zmc2V0WCArIChzbGlkZVdpZHRoIC8gMikpIC0gdG91Y2hYO1xyXG4gICAgICAgICAgICAgICAgZGlmZlkgPSAob2Zmc2V0WSArIChzbGlkZUhlaWdodCAvIDIpKSAtIHRvdWNoWTtcclxuXHJcbiAgICAgICAgICAgICAgICBpbWFnZVdpZHRoID0gZ2VzdHVyZS4kaW1hZ2VFbFswXS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gZ2VzdHVyZS4kaW1hZ2VFbFswXS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBzY2FsZWRXaWR0aCA9IGltYWdlV2lkdGggKiB6b29tLnNjYWxlO1xyXG4gICAgICAgICAgICAgICAgc2NhbGVkSGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKiB6b29tLnNjYWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU1pblggPSBNYXRoLm1pbigoKHNsaWRlV2lkdGggLyAyKSAtIChzY2FsZWRXaWR0aCAvIDIpKSwgMCk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVNaW5ZID0gTWF0aC5taW4oKChzbGlkZUhlaWdodCAvIDIpIC0gKHNjYWxlZEhlaWdodCAvIDIpKSwgMCk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVNYXhYID0gLXRyYW5zbGF0ZU1pblg7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVNYXhZID0gLXRyYW5zbGF0ZU1pblk7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9IGRpZmZYICogem9vbS5zY2FsZTtcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVkgPSBkaWZmWSAqIHpvb20uc2NhbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZVggPCB0cmFuc2xhdGVNaW5YKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9IHRyYW5zbGF0ZU1pblg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRlWCA+IHRyYW5zbGF0ZU1heFgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYID0gdHJhbnNsYXRlTWF4WDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRlWSA8IHRyYW5zbGF0ZU1pblkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVZID0gdHJhbnNsYXRlTWluWTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGVZID4gdHJhbnNsYXRlTWF4WSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVkgPSB0cmFuc2xhdGVNYXhZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVZID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgdHJhbnNsYXRlWCArIFwicHgsIFwiICsgdHJhbnNsYXRlWSArIFwicHgsMClcIikpO1xyXG4gICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKFwiICsgKHpvb20uc2NhbGUpICsgXCIpXCIpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnpvb207XHJcbiAgICAgICAgICAgIHZhciBnZXN0dXJlID0gem9vbS5nZXN0dXJlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLiRzbGlkZUVsKSB7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gc3dpcGVyLmNsaWNrZWRTbGlkZSA/ICQoc3dpcGVyLmNsaWNrZWRTbGlkZSkgOiBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLiRpbWFnZUVsID0gZ2VzdHVyZS4kc2xpZGVFbC5maW5kKCdpbWcsIHN2ZywgY2FudmFzJyk7XHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KChcIi5cIiArIChwYXJhbXMuY29udGFpbmVyQ2xhc3MpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAgICAgem9vbS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIHpvb20uY3VycmVudFNjYWxlID0gMTtcclxuICAgICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApJyk7XHJcbiAgICAgICAgICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpJyk7XHJcbiAgICAgICAgICAgIGdlc3R1cmUuJHNsaWRlRWwucmVtb3ZlQ2xhc3MoKFwiXCIgKyAocGFyYW1zLnpvb21lZFNsaWRlQ2xhc3MpKSk7XHJcbiAgICAgICAgICAgIGdlc3R1cmUuJHNsaWRlRWwgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBBdHRhY2gvRGV0YWNoIEV2ZW50c1xyXG4gICAgICAgIGVuYWJsZTogZnVuY3Rpb24gZW5hYmxlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcclxuICAgICAgICAgICAgaWYgKHpvb20uZW5hYmxlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgem9vbS5lbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSBzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0JyAmJiBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBzd2lwZXIucGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNjYWxlIGltYWdlXHJcbiAgICAgICAgICAgIGlmIChTdXBwb3J0Lmdlc3R1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbignZ2VzdHVyZXN0YXJ0JywgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZVN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oJ2dlc3R1cmVjaGFuZ2UnLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlQ2hhbmdlLCBwYXNzaXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oJ2dlc3R1cmVlbmQnLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbihzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKHN3aXBlci50b3VjaEV2ZW50cy5tb3ZlLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlQ2hhbmdlLCBwYXNzaXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLmVuZCwgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTW92ZSBpbWFnZVxyXG4gICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuem9vbS5jb250YWluZXJDbGFzcykpLCB6b29tLm9uVG91Y2hNb3ZlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgem9vbSA9IHN3aXBlci56b29tO1xyXG4gICAgICAgICAgICBpZiAoIXpvb20uZW5hYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgICAgIHN3aXBlci56b29tLmVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSBzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0JyAmJiBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBzd2lwZXIucGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNjYWxlIGltYWdlXHJcbiAgICAgICAgICAgIGlmIChTdXBwb3J0Lmdlc3R1cmVzKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoJ2dlc3R1cmVzdGFydCcsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9mZignZ2VzdHVyZWNoYW5nZScsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVDaGFuZ2UsIHBhc3NpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoJ2dlc3R1cmVlbmQnLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0LCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLm1vdmUsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVDaGFuZ2UsIHBhc3NpdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLmVuZCwgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTW92ZSBpbWFnZVxyXG4gICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLm1vdmUsIChcIi5cIiArIChzd2lwZXIucGFyYW1zLnpvb20uY29udGFpbmVyQ2xhc3MpKSwgem9vbS5vblRvdWNoTW92ZSk7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIFpvb20kMSA9IHtcclxuICAgICAgICBuYW1lOiAnem9vbScsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIHpvb206IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWF4UmF0aW86IDMsXHJcbiAgICAgICAgICAgICAgICBtaW5SYXRpbzogMSxcclxuICAgICAgICAgICAgICAgIHRvZ2dsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsYXNzOiAnc3dpcGVyLXpvb20tY29udGFpbmVyJyxcclxuICAgICAgICAgICAgICAgIHpvb21lZFNsaWRlQ2xhc3M6ICdzd2lwZXItc2xpZGUtem9vbWVkJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHpvb20gPSB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNjYWxlOiAxLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudFNjYWxlOiAxLFxyXG4gICAgICAgICAgICAgICAgaXNTY2FsaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGdlc3R1cmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAkc2xpZGVFbDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlV2lkdGg6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUhlaWdodDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICRpbWFnZUVsOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgJGltYWdlV3JhcEVsOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4UmF0aW86IDMsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICBpc1RvdWNoZWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBpc01vdmVkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFg6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50WTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pblg6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5ZOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4WDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFk6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0WDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0WTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXNTdGFydDoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlc0N1cnJlbnQ6IHt9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHZlbG9jaXR5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2UG9zaXRpb25YOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlBvc2l0aW9uWTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZUaW1lOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAoJ29uR2VzdHVyZVN0YXJ0IG9uR2VzdHVyZUNoYW5nZSBvbkdlc3R1cmVFbmQgb25Ub3VjaFN0YXJ0IG9uVG91Y2hNb3ZlIG9uVG91Y2hFbmQgb25UcmFuc2l0aW9uRW5kIHRvZ2dsZSBlbmFibGUgZGlzYWJsZSBpbiBvdXQnKS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHpvb21bbWV0aG9kTmFtZV0gPSBab29tW21ldGhvZE5hbWVdLmJpbmQoc3dpcGVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgIHpvb206IHpvb20sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuem9vbS5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnpvb20uZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHN3aXBlci56b29tLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG91Y2hTdGFydDogZnVuY3Rpb24gdG91Y2hTdGFydChlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLnpvb20uZW5hYmxlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci56b29tLm9uVG91Y2hTdGFydChlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdG91Y2hFbmQ6IGZ1bmN0aW9uIHRvdWNoRW5kKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIuem9vbS5lbmFibGVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnpvb20ub25Ub3VjaEVuZChlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZG91YmxlVGFwOiBmdW5jdGlvbiBkb3VibGVUYXAoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy56b29tLmVuYWJsZWQgJiYgc3dpcGVyLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnpvb20udG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnpvb20udG9nZ2xlKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uRW5kOiBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnpvb20uZW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci56b29tLm9uVHJhbnNpdGlvbkVuZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBMYXp5ID0ge1xyXG4gICAgICAgIGxvYWRJblNsaWRlOiBmdW5jdGlvbiBsb2FkSW5TbGlkZShpbmRleCwgbG9hZEluRHVwbGljYXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChsb2FkSW5EdXBsaWNhdGUgPT09IHZvaWQgMCkgbG9hZEluRHVwbGljYXRlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5sYXp5O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5zbGlkZXMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICB2YXIgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgJHNsaWRlRWwgPSBpc1ZpcnR1YWxcclxuICAgICAgICAgICAgICAgID8gc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIl1cIikpXHJcbiAgICAgICAgICAgICAgICA6IHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgdmFyICRpbWFnZXMgPSAkc2xpZGVFbC5maW5kKChcIi5cIiArIChwYXJhbXMuZWxlbWVudENsYXNzKSArIFwiOm5vdCguXCIgKyAocGFyYW1zLmxvYWRlZENsYXNzKSArIFwiKTpub3QoLlwiICsgKHBhcmFtcy5sb2FkaW5nQ2xhc3MpICsgXCIpXCIpKTtcclxuICAgICAgICAgICAgaWYgKCRzbGlkZUVsLmhhc0NsYXNzKHBhcmFtcy5lbGVtZW50Q2xhc3MpICYmICEkc2xpZGVFbC5oYXNDbGFzcyhwYXJhbXMubG9hZGVkQ2xhc3MpICYmICEkc2xpZGVFbC5oYXNDbGFzcyhwYXJhbXMubG9hZGluZ0NsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgJGltYWdlcyA9ICRpbWFnZXMuYWRkKCRzbGlkZUVsWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJGltYWdlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgICAgICAkaW1hZ2VzLmVhY2goZnVuY3Rpb24gKGltYWdlSW5kZXgsIGltYWdlRWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkaW1hZ2VFbCA9ICQoaW1hZ2VFbCk7XHJcbiAgICAgICAgICAgICAgICAkaW1hZ2VFbC5hZGRDbGFzcyhwYXJhbXMubG9hZGluZ0NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYmFja2dyb3VuZCA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtYmFja2dyb3VuZCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNyYyA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtc3JjJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3Jjc2V0ID0gJGltYWdlRWwuYXR0cignZGF0YS1zcmNzZXQnKTtcclxuICAgICAgICAgICAgICAgIHZhciBzaXplcyA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtc2l6ZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2lwZXIubG9hZEltYWdlKCRpbWFnZUVsWzBdLCAoc3JjIHx8IGJhY2tncm91bmQpLCBzcmNzZXQsIHNpemVzLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3dpcGVyID09PSAndW5kZWZpbmVkJyB8fCBzd2lwZXIgPT09IG51bGwgfHwgIXN3aXBlciB8fCAoc3dpcGVyICYmICFzd2lwZXIucGFyYW1zKSB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbWFnZUVsLmNzcygnYmFja2dyb3VuZC1pbWFnZScsIChcInVybChcXFwiXCIgKyBiYWNrZ3JvdW5kICsgXCJcXFwiKVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtYmFja2dyb3VuZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcmNzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbWFnZUVsLmF0dHIoJ3NyY3NldCcsIHNyY3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW1hZ2VFbC5yZW1vdmVBdHRyKCdkYXRhLXNyY3NldCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaXplcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGltYWdlRWwuYXR0cignc2l6ZXMnLCBzaXplcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW1hZ2VFbC5yZW1vdmVBdHRyKCdkYXRhLXNpemVzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNyYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGltYWdlRWwuYXR0cignc3JjJywgc3JjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtc3JjJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRpbWFnZUVsLmFkZENsYXNzKHBhcmFtcy5sb2FkZWRDbGFzcykucmVtb3ZlQ2xhc3MocGFyYW1zLmxvYWRpbmdDbGFzcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNsaWRlRWwuZmluZCgoXCIuXCIgKyAocGFyYW1zLnByZWxvYWRlckNsYXNzKSkpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3AgJiYgbG9hZEluRHVwbGljYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZU9yaWdpbmFsSW5kZXggPSAkc2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJHNsaWRlRWwuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsU2xpZGUgPSBzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbigoXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgc2xpZGVPcmlnaW5hbEluZGV4ICsgXCJcXFwiXTpub3QoLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykgKyBcIilcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmxhenkubG9hZEluU2xpZGUob3JpZ2luYWxTbGlkZS5pbmRleCgpLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVwbGljYXRlZFNsaWRlID0gc3dpcGVyLiR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBzbGlkZU9yaWdpbmFsSW5kZXggKyBcIlxcXCJdXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGR1cGxpY2F0ZWRTbGlkZS5pbmRleCgpLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2xhenlJbWFnZVJlYWR5JywgJHNsaWRlRWxbMF0sICRpbWFnZUVsWzBdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdsYXp5SW1hZ2VMb2FkJywgJHNsaWRlRWxbMF0sICRpbWFnZUVsWzBdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2FkOiBmdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcclxuICAgICAgICAgICAgdmFyIHN3aXBlclBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xyXG4gICAgICAgICAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgICAgIHZhciBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXJQYXJhbXMudmlydHVhbC5lbmFibGVkO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyUGFyYW1zLmxhenk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2xpZGVzUGVyVmlldyA9IHN3aXBlclBhcmFtcy5zbGlkZXNQZXJWaWV3O1xyXG4gICAgICAgICAgICBpZiAoc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2xpZGVFeGlzdChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzVmlydHVhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXJQYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIl1cIikpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlc1tpbmRleF0pIHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzbGlkZUluZGV4KHNsaWRlRWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJChzbGlkZUVsKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoc2xpZGVFbCkuaW5kZXgoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQpIHsgc3dpcGVyLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkID0gdHJ1ZTsgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHN3aXBlclBhcmFtcy5zbGlkZVZpc2libGVDbGFzcykpKS5lYWNoKGZ1bmN0aW9uIChlbEluZGV4LCBzbGlkZUVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gaXNWaXJ0dWFsID8gJChzbGlkZUVsKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpIDogJChzbGlkZUVsKS5pbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNsaWRlc1BlclZpZXcgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gYWN0aXZlSW5kZXg7IGkgPCBhY3RpdmVJbmRleCArIHNsaWRlc1BlclZpZXc7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZUV4aXN0KGkpKSB7IHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGkpOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShhY3RpdmVJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5sb2FkUHJldk5leHQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXNQZXJWaWV3ID4gMSB8fCAocGFyYW1zLmxvYWRQcmV2TmV4dEFtb3VudCAmJiBwYXJhbXMubG9hZFByZXZOZXh0QW1vdW50ID4gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW1vdW50ID0gcGFyYW1zLmxvYWRQcmV2TmV4dEFtb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3B2ID0gc2xpZGVzUGVyVmlldztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4SW5kZXggPSBNYXRoLm1pbihhY3RpdmVJbmRleCArIHNwdiArIE1hdGgubWF4KGFtb3VudCwgc3B2KSwgc2xpZGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbkluZGV4ID0gTWF0aC5tYXgoYWN0aXZlSW5kZXggLSBNYXRoLm1heChzcHYsIGFtb3VudCksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5leHQgU2xpZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSQxID0gYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3OyBpJDEgPCBtYXhJbmRleDsgaSQxICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlRXhpc3QoaSQxKSkgeyBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShpJDEpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXYgU2xpZGVzXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSQyID0gbWluSW5kZXg7IGkkMiA8IGFjdGl2ZUluZGV4OyBpJDIgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVFeGlzdChpJDIpKSB7IHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGkkMik7IH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0U2xpZGUgPSAkd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXJQYXJhbXMuc2xpZGVOZXh0Q2xhc3MpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTbGlkZS5sZW5ndGggPiAwKSB7IHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKHNsaWRlSW5kZXgobmV4dFNsaWRlKSk7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZTbGlkZSA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHN3aXBlclBhcmFtcy5zbGlkZVByZXZDbGFzcykpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldlNsaWRlLmxlbmd0aCA+IDApIHsgc3dpcGVyLmxhenkubG9hZEluU2xpZGUoc2xpZGVJbmRleChwcmV2U2xpZGUpKTsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIExhenkkMSA9IHtcclxuICAgICAgICBuYW1lOiAnbGF6eScsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIGxhenk6IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbG9hZFByZXZOZXh0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGxvYWRQcmV2TmV4dEFtb3VudDogMSxcclxuICAgICAgICAgICAgICAgIGxvYWRPblRyYW5zaXRpb25TdGFydDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbWVudENsYXNzOiAnc3dpcGVyLWxhenknLFxyXG4gICAgICAgICAgICAgICAgbG9hZGluZ0NsYXNzOiAnc3dpcGVyLWxhenktbG9hZGluZycsXHJcbiAgICAgICAgICAgICAgICBsb2FkZWRDbGFzczogJ3N3aXBlci1sYXp5LWxvYWRlZCcsXHJcbiAgICAgICAgICAgICAgICBwcmVsb2FkZXJDbGFzczogJ3N3aXBlci1sYXp5LXByZWxvYWRlcicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgIGxhenk6IHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsSW1hZ2VMb2FkZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWQ6IExhenkubG9hZC5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZEluU2xpZGU6IExhenkubG9hZEluU2xpZGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiBiZWZvcmVJbml0KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sYXp5LmVuYWJsZWQgJiYgc3dpcGVyLnBhcmFtcy5wcmVsb2FkSW1hZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnBhcmFtcy5wcmVsb2FkSW1hZ2VzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmIHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmxhenkubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzY3JvbGw6IGZ1bmN0aW9uIHNjcm9sbCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUgJiYgIXN3aXBlci5wYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc2l6ZTogZnVuY3Rpb24gcmVzaXplKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sYXp5LmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNjcm9sbGJhckRyYWdNb3ZlOiBmdW5jdGlvbiBzY3JvbGxiYXJEcmFnTW92ZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmxhenkubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uU3RhcnQ6IGZ1bmN0aW9uIHRyYW5zaXRpb25TdGFydCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5sb2FkT25UcmFuc2l0aW9uU3RhcnQgfHwgKCFzd2lwZXIucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0ICYmICFzd2lwZXIubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCAmJiAhc3dpcGVyLnBhcmFtcy5sYXp5LmxvYWRPblRyYW5zaXRpb25TdGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiBlc2xpbnQgbm8tYml0d2lzZTogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIj4+XCJdIH1dICovXHJcblxyXG4gICAgdmFyIENvbnRyb2xsZXIgPSB7XHJcbiAgICAgICAgTGluZWFyU3BsaW5lOiBmdW5jdGlvbiBMaW5lYXJTcGxpbmUoeCwgeSkge1xyXG4gICAgICAgICAgICB2YXIgYmluYXJ5U2VhcmNoID0gKGZ1bmN0aW9uIHNlYXJjaCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXhJbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBtaW5JbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciBndWVzcztcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoYXJyYXksIHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbkluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4SW5kZXggPSBhcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG1heEluZGV4IC0gbWluSW5kZXggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGd1ZXNzID0gbWF4SW5kZXggKyBtaW5JbmRleCA+PiAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlbZ3Vlc3NdIDw9IHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluSW5kZXggPSBndWVzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heEluZGV4ID0gZ3Vlc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1heEluZGV4O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSgpKTtcclxuICAgICAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0SW5kZXggPSB4Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIC8vIEdpdmVuIGFuIHggdmFsdWUgKHgyKSwgcmV0dXJuIHRoZSBleHBlY3RlZCB5MiB2YWx1ZTpcclxuICAgICAgICAgICAgLy8gKHgxLHkxKSBpcyB0aGUga25vd24gcG9pbnQgYmVmb3JlIGdpdmVuIHZhbHVlLFxyXG4gICAgICAgICAgICAvLyAoeDMseTMpIGlzIHRoZSBrbm93biBwb2ludCBhZnRlciBnaXZlbiB2YWx1ZS5cclxuICAgICAgICAgICAgdmFyIGkxO1xyXG4gICAgICAgICAgICB2YXIgaTM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmludGVycG9sYXRlID0gZnVuY3Rpb24gaW50ZXJwb2xhdGUoeDIpIHtcclxuICAgICAgICAgICAgICAgIGlmICgheDIpIHsgcmV0dXJuIDA7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGluZGV4ZXMgb2YgeDEgYW5kIHgzICh0aGUgYXJyYXkgaW5kZXhlcyBiZWZvcmUgYW5kIGFmdGVyIGdpdmVuIHgyKTpcclxuICAgICAgICAgICAgICAgIGkzID0gYmluYXJ5U2VhcmNoKHRoaXMueCwgeDIpO1xyXG4gICAgICAgICAgICAgICAgaTEgPSBpMyAtIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBvdXIgaW5kZXhlcyBpMSAmIGkzLCBzbyB3ZSBjYW4gY2FsY3VsYXRlIGFscmVhZHk6XHJcbiAgICAgICAgICAgICAgICAvLyB5MiA6PSAoKHgy4oiSeDEpIMOXICh5M+KIknkxKSkgw7cgKHgz4oiSeDEpICsgeTFcclxuICAgICAgICAgICAgICAgIHJldHVybiAoKCh4MiAtIHRoaXMueFtpMV0pICogKHRoaXMueVtpM10gLSB0aGlzLnlbaTFdKSkgLyAodGhpcy54W2kzXSAtIHRoaXMueFtpMV0pKSArIHRoaXMueVtpMV07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8geHh4OiBmb3Igbm93IGkgd2lsbCBqdXN0IHNhdmUgb25lIHNwbGluZSBmdW5jdGlvbiB0byB0b1xyXG4gICAgICAgIGdldEludGVycG9sYXRlRnVuY3Rpb246IGZ1bmN0aW9uIGdldEludGVycG9sYXRlRnVuY3Rpb24oYykge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIuY29udHJvbGxlci5zcGxpbmUpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5jb250cm9sbGVyLnNwbGluZSA9IHN3aXBlci5wYXJhbXMubG9vcCA/XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IENvbnRyb2xsZXIuTGluZWFyU3BsaW5lKHN3aXBlci5zbGlkZXNHcmlkLCBjLnNsaWRlc0dyaWQpIDpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgQ29udHJvbGxlci5MaW5lYXJTcGxpbmUoc3dpcGVyLnNuYXBHcmlkLCBjLnNuYXBHcmlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoc2V0VHJhbnNsYXRlJDEsIGJ5Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNvbnRyb2xsZWQgPSBzd2lwZXIuY29udHJvbGxlci5jb250cm9sO1xyXG4gICAgICAgICAgICB2YXIgbXVsdGlwbGllcjtcclxuICAgICAgICAgICAgdmFyIGNvbnRyb2xsZWRUcmFuc2xhdGU7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoYykge1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3aWxsIGNyZWF0ZSBhbiBJbnRlcnBvbGF0ZSBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgc25hcEdyaWRzXHJcbiAgICAgICAgICAgICAgICAvLyB4IGlzIHRoZSBHcmlkIG9mIHRoZSBzY3JvbGxlZCBzY3JvbGxlciBhbmQgeSB3aWxsIGJlIHRoZSBjb250cm9sbGVkIHNjcm9sbGVyXHJcbiAgICAgICAgICAgICAgICAvLyBpdCBtYWtlcyBzZW5zZSB0byBjcmVhdGUgdGhpcyBvbmx5IG9uY2UgYW5kIHJlY2FsbCBpdCBmb3IgdGhlIGludGVycG9sYXRpb25cclxuICAgICAgICAgICAgICAgIC8vIHRoZSBmdW5jdGlvbiBkb2VzIGEgbG90IG9mIHZhbHVlIGNhY2hpbmcgZm9yIHBlcmZvcm1hbmNlXHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IC1zd2lwZXIudHJhbnNsYXRlIDogc3dpcGVyLnRyYW5zbGF0ZTtcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNvbnRyb2xsZXIuYnkgPT09ICdzbGlkZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuY29udHJvbGxlci5nZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uKGMpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGkgYW0gbm90IHN1cmUgd2h5IHRoZSB2YWx1ZXMgaGF2ZSB0byBiZSBtdWx0aXBsaWNhdGVkIHRoaXMgd2F5LCB0cmllZCB0byBpbnZlcnQgdGhlIHNuYXBHcmlkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IGl0IGRpZCBub3Qgd29yayBvdXRcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVkVHJhbnNsYXRlID0gLXN3aXBlci5jb250cm9sbGVyLnNwbGluZS5pbnRlcnBvbGF0ZSgtdHJhbnNsYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRyb2xsZWRUcmFuc2xhdGUgfHwgc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnY29udGFpbmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAoYy5tYXhUcmFuc2xhdGUoKSAtIGMubWluVHJhbnNsYXRlKCkpIC8gKHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9ICgodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAqIG11bHRpcGxpZXIpICsgYy5taW5UcmFuc2xhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmludmVyc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVkVHJhbnNsYXRlID0gYy5tYXhUcmFuc2xhdGUoKSAtIGNvbnRyb2xsZWRUcmFuc2xhdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjLnVwZGF0ZVByb2dyZXNzKGNvbnRyb2xsZWRUcmFuc2xhdGUpO1xyXG4gICAgICAgICAgICAgICAgYy5zZXRUcmFuc2xhdGUoY29udHJvbGxlZFRyYW5zbGF0ZSwgc3dpcGVyKTtcclxuICAgICAgICAgICAgICAgIGMudXBkYXRlQWN0aXZlSW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIGMudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRyb2xsZWQpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRyb2xsZWQubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlZFtpXSAhPT0gYnlDb250cm9sbGVyICYmIGNvbnRyb2xsZWRbaV0gaW5zdGFuY2VvZiBTd2lwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zbGF0ZShjb250cm9sbGVkW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbGxlZCBpbnN0YW5jZW9mIFN3aXBlciAmJiBieUNvbnRyb2xsZXIgIT09IGNvbnRyb2xsZWQpIHtcclxuICAgICAgICAgICAgICAgIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoY29udHJvbGxlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24sIGJ5Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNvbnRyb2xsZWQgPSBzd2lwZXIuY29udHJvbGxlci5jb250cm9sO1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oYykge1xyXG4gICAgICAgICAgICAgICAgYy5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBzd2lwZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGR1cmF0aW9uICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYy50cmFuc2l0aW9uU3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjLiR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udHJvbGxlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGMucGFyYW1zLmxvb3AgJiYgc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnc2xpZGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmxvb3BGaXgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjLnRyYW5zaXRpb25FbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb250cm9sbGVkKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGNvbnRyb2xsZWQubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlZFtpXSAhPT0gYnlDb250cm9sbGVyICYmIGNvbnRyb2xsZWRbaV0gaW5zdGFuY2VvZiBTd2lwZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oY29udHJvbGxlZFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xsZWQgaW5zdGFuY2VvZiBTd2lwZXIgJiYgYnlDb250cm9sbGVyICE9PSBjb250cm9sbGVkKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNpdGlvbihjb250cm9sbGVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgdmFyIENvbnRyb2xsZXIkMSA9IHtcclxuICAgICAgICBuYW1lOiAnY29udHJvbGxlcicsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2w6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGludmVyc2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYnk6ICdzbGlkZScsIC8vIG9yICdjb250YWluZXInXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sOiBzd2lwZXIucGFyYW1zLmNvbnRyb2xsZXIuY29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICBnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uOiBDb250cm9sbGVyLmdldEludGVycG9sYXRlRnVuY3Rpb24uYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogQ29udHJvbGxlci5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRyYW5zaXRpb246IENvbnRyb2xsZXIuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzd2lwZXIuY29udHJvbGxlci5zcGxpbmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc2l6ZTogZnVuY3Rpb24gcmVzaXplKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzd2lwZXIuY29udHJvbGxlci5zcGxpbmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9ic2VydmVyVXBkYXRlOiBmdW5jdGlvbiBvYnNlcnZlclVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIuY29udHJvbGxlci5jb250cm9sKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5jb250cm9sbGVyLnNwbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5jb250cm9sbGVyLnNwbGluZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIGJ5Q29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuY29udHJvbGxlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIuY29udHJvbGxlci5jb250cm9sKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgYTExeSA9IHtcclxuICAgICAgICBtYWtlRWxGb2N1c2FibGU6IGZ1bmN0aW9uIG1ha2VFbEZvY3VzYWJsZSgkZWwpIHtcclxuICAgICAgICAgICAgJGVsLmF0dHIoJ3RhYkluZGV4JywgJzAnKTtcclxuICAgICAgICAgICAgcmV0dXJuICRlbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZEVsUm9sZTogZnVuY3Rpb24gYWRkRWxSb2xlKCRlbCwgcm9sZSkge1xyXG4gICAgICAgICAgICAkZWwuYXR0cigncm9sZScsIHJvbGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkRWxMYWJlbDogZnVuY3Rpb24gYWRkRWxMYWJlbCgkZWwsIGxhYmVsKSB7XHJcbiAgICAgICAgICAgICRlbC5hdHRyKCdhcmlhLWxhYmVsJywgbGFiZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZUVsOiBmdW5jdGlvbiBkaXNhYmxlRWwoJGVsKSB7XHJcbiAgICAgICAgICAgICRlbC5hdHRyKCdhcmlhLWRpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmFibGVFbDogZnVuY3Rpb24gZW5hYmxlRWwoJGVsKSB7XHJcbiAgICAgICAgICAgICRlbC5hdHRyKCdhcmlhLWRpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25FbnRlcktleTogZnVuY3Rpb24gb25FbnRlcktleShlKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5hMTF5O1xyXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlICE9PSAxMykgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgdmFyICR0YXJnZXRFbCA9ICQoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCAmJiAkdGFyZ2V0RWwuaXMoc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghKHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIuaXNFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5ub3RpZnkocGFyYW1zLmxhc3RTbGlkZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5ub3RpZnkocGFyYW1zLm5leHRTbGlkZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsICYmICR0YXJnZXRFbC5pcyhzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlUHJldigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5hMTF5Lm5vdGlmeShwYXJhbXMuZmlyc3RTbGlkZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5ub3RpZnkocGFyYW1zLnByZXZTbGlkZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbiAmJiAkdGFyZ2V0RWwuaXMoKFwiLlwiICsgKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcykpKSkge1xyXG4gICAgICAgICAgICAgICAgJHRhcmdldEVsWzBdLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSBzd2lwZXIuYTExeS5saXZlUmVnaW9uO1xyXG4gICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgbm90aWZpY2F0aW9uLmh0bWwoJycpO1xyXG4gICAgICAgICAgICBub3RpZmljYXRpb24uaHRtbChtZXNzYWdlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHVwZGF0ZU5hdmlnYXRpb246IGZ1bmN0aW9uIHVwZGF0ZU5hdmlnYXRpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgdmFyIHJlZiA9IHN3aXBlci5uYXZpZ2F0aW9uO1xyXG4gICAgICAgICAgICB2YXIgJG5leHRFbCA9IHJlZi4kbmV4dEVsO1xyXG4gICAgICAgICAgICB2YXIgJHByZXZFbCA9IHJlZi4kcHJldkVsO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRwcmV2RWwgJiYgJHByZXZFbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmExMXkuZGlzYWJsZUVsKCRwcmV2RWwpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5lbmFibGVFbCgkcHJldkVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIuaXNFbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5kaXNhYmxlRWwoJG5leHRFbCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5hMTF5LmVuYWJsZUVsKCRuZXh0RWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1cGRhdGVQYWdpbmF0aW9uOiBmdW5jdGlvbiB1cGRhdGVQYWdpbmF0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuYTExeTtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5jbGlja2FibGUgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5lYWNoKGZ1bmN0aW9uIChidWxsZXRJbmRleCwgYnVsbGV0RWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJGJ1bGxldEVsID0gJChidWxsZXRFbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmExMXkubWFrZUVsRm9jdXNhYmxlKCRidWxsZXRFbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmExMXkuYWRkRWxSb2xlKCRidWxsZXRFbCwgJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5hMTF5LmFkZEVsTGFiZWwoJGJ1bGxldEVsLCBwYXJhbXMucGFnaW5hdGlvbkJ1bGxldE1lc3NhZ2UucmVwbGFjZSgve3tpbmRleH19LywgJGJ1bGxldEVsLmluZGV4KCkgKyAxKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBzd2lwZXIuJGVsLmFwcGVuZChzd2lwZXIuYTExeS5saXZlUmVnaW9uKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5hdmlnYXRpb25cclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuYTExeTtcclxuICAgICAgICAgICAgdmFyICRuZXh0RWw7XHJcbiAgICAgICAgICAgIHZhciAkcHJldkVsO1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCkge1xyXG4gICAgICAgICAgICAgICAgJG5leHRFbCA9IHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRwcmV2RWwpIHtcclxuICAgICAgICAgICAgICAgICRwcmV2RWwgPSBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICgkbmV4dEVsKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5tYWtlRWxGb2N1c2FibGUoJG5leHRFbCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5hZGRFbFJvbGUoJG5leHRFbCwgJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmExMXkuYWRkRWxMYWJlbCgkbmV4dEVsLCBwYXJhbXMubmV4dFNsaWRlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAkbmV4dEVsLm9uKCdrZXlkb3duJywgc3dpcGVyLmExMXkub25FbnRlcktleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCRwcmV2RWwpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5hMTF5Lm1ha2VFbEZvY3VzYWJsZSgkcHJldkVsKTtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5hMTF5LmFkZEVsUm9sZSgkcHJldkVsLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5hZGRFbExhYmVsKCRwcmV2RWwsIHBhcmFtcy5wcmV2U2xpZGVNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICRwcmV2RWwub24oJ2tleWRvd24nLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUGFnaW5hdGlvblxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwub24oJ2tleWRvd24nLCAoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKSksIHN3aXBlci5hMTF5Lm9uRW50ZXJLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5hMTF5LmxpdmVSZWdpb24gJiYgc3dpcGVyLmExMXkubGl2ZVJlZ2lvbi5sZW5ndGggPiAwKSB7IHN3aXBlci5hMTF5LmxpdmVSZWdpb24ucmVtb3ZlKCk7IH1cclxuXHJcbiAgICAgICAgICAgIHZhciAkbmV4dEVsO1xyXG4gICAgICAgICAgICB2YXIgJHByZXZFbDtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWwpIHtcclxuICAgICAgICAgICAgICAgICRuZXh0RWwgPSBzd2lwZXIubmF2aWdhdGlvbi4kbmV4dEVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsKSB7XHJcbiAgICAgICAgICAgICAgICAkcHJldkVsID0gc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJG5leHRFbCkge1xyXG4gICAgICAgICAgICAgICAgJG5leHRFbC5vZmYoJ2tleWRvd24nLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJHByZXZFbCkge1xyXG4gICAgICAgICAgICAgICAgJHByZXZFbC5vZmYoJ2tleWRvd24nLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUGFnaW5hdGlvblxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi4kZWwub2ZmKCdrZXlkb3duJywgKFwiLlwiICsgKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcykpLCBzd2lwZXIuYTExeS5vbkVudGVyS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgdmFyIEExMXkgPSB7XHJcbiAgICAgICAgbmFtZTogJ2ExMXknLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBhMTF5OiB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdzd2lwZXItbm90aWZpY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgIHByZXZTbGlkZU1lc3NhZ2U6ICdQcmV2aW91cyBzbGlkZScsXHJcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGVNZXNzYWdlOiAnTmV4dCBzbGlkZScsXHJcbiAgICAgICAgICAgICAgICBmaXJzdFNsaWRlTWVzc2FnZTogJ1RoaXMgaXMgdGhlIGZpcnN0IHNsaWRlJyxcclxuICAgICAgICAgICAgICAgIGxhc3RTbGlkZU1lc3NhZ2U6ICdUaGlzIGlzIHRoZSBsYXN0IHNsaWRlJyxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25CdWxsZXRNZXNzYWdlOiAnR28gdG8gc2xpZGUge3tpbmRleH19JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICAgICAgYTExeToge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpdmVSZWdpb246ICQoKFwiPHNwYW4gY2xhc3M9XFxcIlwiICsgKHN3aXBlci5wYXJhbXMuYTExeS5ub3RpZmljYXRpb25DbGFzcykgKyBcIlxcXCIgYXJpYS1saXZlPVxcXCJhc3NlcnRpdmVcXFwiIGFyaWEtYXRvbWljPVxcXCJ0cnVlXFxcIj48L3NwYW4+XCIpKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhhMTF5KS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYTExeVttZXRob2ROYW1lXSA9IGExMXlbbWV0aG9kTmFtZV0uYmluZChzd2lwZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS51cGRhdGVOYXZpZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRvRWRnZTogZnVuY3Rpb24gdG9FZGdlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuYTExeS5lbmFibGVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmExMXkudXBkYXRlTmF2aWdhdGlvbigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmcm9tRWRnZTogZnVuY3Rpb24gZnJvbUVkZ2UoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS51cGRhdGVOYXZpZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb25VcGRhdGU6IGZ1bmN0aW9uIHBhZ2luYXRpb25VcGRhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS51cGRhdGVQYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYTExeS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIEhpc3RvcnkgPSB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5oaXN0b3J5KSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAoIXdpbi5oaXN0b3J5IHx8ICF3aW4uaGlzdG9yeS5wdXNoU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBoaXN0b3J5ID0gc3dpcGVyLmhpc3Rvcnk7XHJcbiAgICAgICAgICAgIGhpc3RvcnkuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBoaXN0b3J5LnBhdGhzID0gSGlzdG9yeS5nZXRQYXRoVmFsdWVzKCk7XHJcbiAgICAgICAgICAgIGlmICghaGlzdG9yeS5wYXRocy5rZXkgJiYgIWhpc3RvcnkucGF0aHMudmFsdWUpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIGhpc3Rvcnkuc2Nyb2xsVG9TbGlkZSgwLCBoaXN0b3J5LnBhdGhzLnZhbHVlLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XHJcbiAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc3dpcGVyLmhpc3Rvcnkuc2V0SGlzdG9yeVBvcFN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc3dpcGVyLmhpc3Rvcnkuc2V0SGlzdG9yeVBvcFN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0SGlzdG9yeVBvcFN0YXRlOiBmdW5jdGlvbiBzZXRIaXN0b3J5UG9wU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBzd2lwZXIuaGlzdG9yeS5wYXRocyA9IEhpc3RvcnkuZ2V0UGF0aFZhbHVlcygpO1xyXG4gICAgICAgICAgICBzd2lwZXIuaGlzdG9yeS5zY3JvbGxUb1NsaWRlKHN3aXBlci5wYXJhbXMuc3BlZWQsIHN3aXBlci5oaXN0b3J5LnBhdGhzLnZhbHVlLCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRQYXRoVmFsdWVzOiBmdW5jdGlvbiBnZXRQYXRoVmFsdWVzKCkge1xyXG4gICAgICAgICAgICB2YXIgcGF0aEFycmF5ID0gd2luLmxvY2F0aW9uLnBhdGhuYW1lLnNsaWNlKDEpLnNwbGl0KCcvJykuZmlsdGVyKGZ1bmN0aW9uIChwYXJ0KSB7IHJldHVybiBwYXJ0ICE9PSAnJzsgfSk7XHJcbiAgICAgICAgICAgIHZhciB0b3RhbCA9IHBhdGhBcnJheS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBwYXRoQXJyYXlbdG90YWwgLSAyXTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gcGF0aEFycmF5W3RvdGFsIC0gMV07XHJcbiAgICAgICAgICAgIHJldHVybiB7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEhpc3Rvcnk6IGZ1bmN0aW9uIHNldEhpc3Rvcnkoa2V5LCBpbmRleCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIuaGlzdG9yeS5pbml0aWFsaXplZCB8fCAhc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHZhciBzbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBIaXN0b3J5LnNsdWdpZnkoc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5JykpO1xyXG4gICAgICAgICAgICBpZiAoIXdpbi5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGtleSArIFwiL1wiICsgdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdGF0ZSA9IHdpbi5oaXN0b3J5LnN0YXRlO1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0YXRlICYmIGN1cnJlbnRTdGF0ZS52YWx1ZSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgd2luLmhpc3RvcnkucmVwbGFjZVN0YXRlKHsgdmFsdWU6IHZhbHVlIH0sIG51bGwsIHZhbHVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbi5oaXN0b3J5LnB1c2hTdGF0ZSh7IHZhbHVlOiB2YWx1ZSB9LCBudWxsLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNsdWdpZnk6IGZ1bmN0aW9uIHNsdWdpZnkodGV4dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICctJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXlxcdy1dKy9nLCAnJylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tLSsvZywgJy0nKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL14tKy8sICcnKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLy0rJC8sICcnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcm9sbFRvU2xpZGU6IGZ1bmN0aW9uIHNjcm9sbFRvU2xpZGUoc3BlZWQsIHZhbHVlLCBydW5DYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzd2lwZXIuc2xpZGVzLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUhpc3RvcnkgPSBIaXN0b3J5LnNsdWdpZnkoc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5JykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZUhpc3RvcnkgPT09IHZhbHVlICYmICFzbGlkZS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHNsaWRlLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbygwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBIaXN0b3J5JDEgPSB7XHJcbiAgICAgICAgbmFtZTogJ2hpc3RvcnknLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBoaXN0b3J5OiB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJlcGxhY2VTdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBrZXk6ICdzbGlkZXMnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdDogSGlzdG9yeS5pbml0LmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBzZXRIaXN0b3J5OiBIaXN0b3J5LnNldEhpc3RvcnkuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldEhpc3RvcnlQb3BTdGF0ZTogSGlzdG9yeS5zZXRIaXN0b3J5UG9wU3RhdGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvU2xpZGU6IEhpc3Rvcnkuc2Nyb2xsVG9TbGlkZS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzdHJveTogSGlzdG9yeS5kZXN0cm95LmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmhpc3RvcnkuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuaGlzdG9yeS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIuaGlzdG9yeS5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5oaXN0b3J5LnNldEhpc3Rvcnkoc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmtleSwgc3dpcGVyLmFjdGl2ZUluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgSGFzaE5hdmlnYXRpb24gPSB7XHJcbiAgICAgICAgb25IYXNoQ2FuZ2U6IGZ1bmN0aW9uIG9uSGFzaENhbmdlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG5ld0hhc2ggPSBkb2MubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xyXG4gICAgICAgICAgICB2YXIgYWN0aXZlU2xpZGVIYXNoID0gc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpLmF0dHIoJ2RhdGEtaGFzaCcpO1xyXG4gICAgICAgICAgICBpZiAobmV3SGFzaCAhPT0gYWN0aXZlU2xpZGVIYXNoKSB7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzKSArIFwiW2RhdGEtaGFzaD1cXFwiXCIgKyBuZXdIYXNoICsgXCJcXFwiXVwiKSkuaW5kZXgoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEhhc2g6IGZ1bmN0aW9uIHNldEhhc2goKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5oYXNoTmF2aWdhdGlvbi5pbml0aWFsaXplZCB8fCAhc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5yZXBsYWNlU3RhdGUgJiYgd2luLmhpc3RvcnkgJiYgd2luLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB3aW4uaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgbnVsbCwgKChcIiNcIiArIChzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCkuYXR0cignZGF0YS1oYXNoJykpKSB8fCAnJykpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGhhc2ggPSBzbGlkZS5hdHRyKCdkYXRhLWhhc2gnKSB8fCBzbGlkZS5hdHRyKCdkYXRhLWhpc3RvcnknKTtcclxuICAgICAgICAgICAgICAgIGRvYy5sb2NhdGlvbi5oYXNoID0gaGFzaCB8fCAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkIHx8IChzd2lwZXIucGFyYW1zLmhpc3RvcnkgJiYgc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgaGFzaCA9IGRvYy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XHJcbiAgICAgICAgICAgIGlmIChoYXNoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3BlZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzd2lwZXIuc2xpZGVzLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUhhc2ggPSBzbGlkZS5hdHRyKCdkYXRhLWhhc2gnKSB8fCBzbGlkZS5hdHRyKCdkYXRhLWhpc3RvcnknKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVIYXNoID09PSBoYXNoICYmICFzbGlkZS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHNsaWRlLmluZGV4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKGluZGV4LCBzcGVlZCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi53YXRjaFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAkKHdpbikub24oJ2hhc2hjaGFuZ2UnLCBzd2lwZXIuaGFzaE5hdmlnYXRpb24ub25IYXNoQ2FuZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24ud2F0Y2hTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgJCh3aW4pLm9mZignaGFzaGNoYW5nZScsIHN3aXBlci5oYXNoTmF2aWdhdGlvbi5vbkhhc2hDYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIHZhciBIYXNoTmF2aWdhdGlvbiQxID0ge1xyXG4gICAgICAgIG5hbWU6ICdoYXNoLW5hdmlnYXRpb24nLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBoYXNoTmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICByZXBsYWNlU3RhdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgd2F0Y2hTdGF0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgIGhhc2hOYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXQ6IEhhc2hOYXZpZ2F0aW9uLmluaXQuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc3Ryb3k6IEhhc2hOYXZpZ2F0aW9uLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldEhhc2g6IEhhc2hOYXZpZ2F0aW9uLnNldEhhc2guYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uSGFzaENhbmdlOiBIYXNoTmF2aWdhdGlvbi5vbkhhc2hDYW5nZS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmhhc2hOYXZpZ2F0aW9uLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5oYXNoTmF2aWdhdGlvbi5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5oYXNoTmF2aWdhdGlvbi5zZXRIYXNoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgLyogZXNsaW50IG5vLXVuZGVyc2NvcmUtZGFuZ2xlOiBcIm9mZlwiICovXHJcblxyXG4gICAgdmFyIEF1dG9wbGF5ID0ge1xyXG4gICAgICAgIHJ1bjogZnVuY3Rpb24gcnVuKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICRhY3RpdmVTbGlkZUVsID0gc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgZGVsYXkgPSBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xyXG4gICAgICAgICAgICBpZiAoJGFjdGl2ZVNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItYXV0b3BsYXknKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsYXkgPSAkYWN0aXZlU2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1hdXRvcGxheScpIHx8IHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGVsYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQgPSBVdGlscy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5yZXZlcnNlRGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIuZW1pdCgnYXV0b3BsYXknKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzd2lwZXIuaXNCZWdpbm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlUHJldihzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2F1dG9wbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxLCBzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2F1dG9wbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlTmV4dChzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuZW1pdCgnYXV0b3BsYXknKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXN3aXBlci5pc0VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2F1dG9wbGF5Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzd2lwZXIucGFyYW1zLmF1dG9wbGF5LnN0b3BPbkxhc3RTbGlkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKDAsIHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN3aXBlci5hdXRvcGxheS50aW1lb3V0ICE9PSAndW5kZWZpbmVkJykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheVN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5ydW4oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKCFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzd2lwZXIuYXV0b3BsYXkudGltZW91dCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzd2lwZXIuYXV0b3BsYXkudGltZW91dCk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkudGltZW91dCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnYXV0b3BsYXlTdG9wJyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGF1c2U6IGZ1bmN0aW9uIHBhdXNlKHNwZWVkKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS50aW1lb3V0KSB7IGNsZWFyVGltZW91dChzd2lwZXIuYXV0b3BsYXkudGltZW91dCk7IH1cclxuICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChzcGVlZCA9PT0gMCB8fCAhc3dpcGVyLnBhcmFtcy5hdXRvcGxheS53YWl0Rm9yVHJhbnNpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnJ1bigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5hdXRvcGxheS5vblRyYW5zaXRpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIHN3aXBlci5hdXRvcGxheS5vblRyYW5zaXRpb25FbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIEF1dG9wbGF5JDEgPSB7XHJcbiAgICAgICAgbmFtZTogJ2F1dG9wbGF5JyxcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgYXV0b3BsYXk6IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGVsYXk6IDMwMDAsXHJcbiAgICAgICAgICAgICAgICB3YWl0Rm9yVHJhbnNpdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc3RvcE9uTGFzdFNsaWRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJldmVyc2VEaXJlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XHJcbiAgICAgICAgICAgICAgICBhdXRvcGxheToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdXNlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBBdXRvcGxheS5ydW4uYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBBdXRvcGxheS5zdGFydC5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcDogQXV0b3BsYXkuc3RvcC5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF1c2U6IEF1dG9wbGF5LnBhdXNlLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci4kd3JhcHBlckVsKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIuYXV0b3BsYXkub25UcmFuc2l0aW9uRW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIHN3aXBlci5hdXRvcGxheS5vblRyYW5zaXRpb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJlZm9yZVRyYW5zaXRpb25TdGFydDogZnVuY3Rpb24gYmVmb3JlVHJhbnNpdGlvblN0YXJ0KHNwZWVkLCBpbnRlcm5hbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW50ZXJuYWwgfHwgIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlKHNwZWVkKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2xpZGVyRmlyc3RNb3ZlOiBmdW5jdGlvbiBzbGlkZXJGaXJzdE1vdmUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBGYWRlID0ge1xyXG4gICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9ICRzbGlkZUVsWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgdmFyIHR4ID0gLW9mZnNldDtcclxuICAgICAgICAgICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7IHR4IC09IHN3aXBlci50cmFuc2xhdGU7IH1cclxuICAgICAgICAgICAgICAgIHZhciB0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5ID0gdHg7XHJcbiAgICAgICAgICAgICAgICAgICAgdHggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlT3BhY2l0eSA9IHN3aXBlci5wYXJhbXMuZmFkZUVmZmVjdC5jcm9zc0ZhZGUgP1xyXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KDEgLSBNYXRoLmFicygkc2xpZGVFbFswXS5wcm9ncmVzcyksIDApIDpcclxuICAgICAgICAgICAgICAgICAgICAxICsgTWF0aC5taW4oTWF0aC5tYXgoJHNsaWRlRWxbMF0ucHJvZ3Jlc3MsIC0xKSwgMCk7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVFbFxyXG4gICAgICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBzbGlkZU9wYWNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgdHggKyBcInB4LCBcIiArIHR5ICsgXCJweCwgMHB4KVwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xyXG4gICAgICAgICAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xyXG4gICAgICAgICAgICBzbGlkZXMudHJhbnNpdGlvbihkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUgJiYgZHVyYXRpb24gIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHZhciBldmVudFRyaWdnZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudFRyaWdnZXJlZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHJpZ2dlcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyaWdnZXJFdmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCddO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJpZ2dlckV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlckVsLnRyaWdnZXIodHJpZ2dlckV2ZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgRWZmZWN0RmFkZSA9IHtcclxuICAgICAgICBuYW1lOiAnZWZmZWN0LWZhZGUnLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBmYWRlRWZmZWN0OiB7XHJcbiAgICAgICAgICAgICAgICBjcm9zc0ZhZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XHJcbiAgICAgICAgICAgICAgICBmYWRlRWZmZWN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBGYWRlLnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogRmFkZS5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gYmVmb3JlSW5pdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmFkZScpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwiZmFkZVwiKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3ZlcndyaXRlUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpcnR1YWxUcmFuc2xhdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5wYXJhbXMsIG92ZXJ3cml0ZVBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLm9yaWdpbmFsUGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmFkZScpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuZmFkZUVmZmVjdC5zZXRUcmFuc2xhdGUoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdmYWRlJykgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci5mYWRlRWZmZWN0LnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBDdWJlID0ge1xyXG4gICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XHJcbiAgICAgICAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyV2lkdGggPSBzd2lwZXIud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXJIZWlnaHQgPSBzd2lwZXIuaGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcclxuICAgICAgICAgICAgdmFyIHN3aXBlclNpemUgPSBzd2lwZXIuc2l6ZTtcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuY3ViZUVmZmVjdDtcclxuICAgICAgICAgICAgdmFyIGlzSG9yaXpvbnRhbCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcclxuICAgICAgICAgICAgdmFyIGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xyXG4gICAgICAgICAgICB2YXIgd3JhcHBlclJvdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgIHZhciAkY3ViZVNoYWRvd0VsO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnNoYWRvdykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRjdWJlU2hhZG93RWwgPSAkd3JhcHBlckVsLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGN1YmVTaGFkb3dFbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGN1YmVTaGFkb3dFbCA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoJGN1YmVTaGFkb3dFbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICRjdWJlU2hhZG93RWwuY3NzKHsgaGVpZ2h0OiAoc3dpcGVyV2lkdGggKyBcInB4XCIpIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3ViZVNoYWRvd0VsID0gJGVsLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGN1YmVTaGFkb3dFbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGN1YmVTaGFkb3dFbCA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLmFwcGVuZCgkY3ViZVNoYWRvd0VsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc2xpZGVFbCA9IHNsaWRlcy5lcShpKTtcclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUluZGV4ID0gcGFyc2VJbnQoJHNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlQW5nbGUgPSBzbGlkZUluZGV4ICogOTA7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm91bmQgPSBNYXRoLmZsb29yKHNsaWRlQW5nbGUgLyAzNjApO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJ0bCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQW5nbGUgPSAtc2xpZGVBbmdsZTtcclxuICAgICAgICAgICAgICAgICAgICByb3VuZCA9IE1hdGguZmxvb3IoLXNsaWRlQW5nbGUgLyAzNjApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oJHNsaWRlRWxbMF0ucHJvZ3Jlc3MsIDEpLCAtMSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHggPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHR5ID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciB0eiA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVJbmRleCAlIDQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0eCA9IC1yb3VuZCAqIDQgKiBzd2lwZXJTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIHR6ID0gMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKHNsaWRlSW5kZXggLSAxKSAlIDQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0eCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdHogPSAtcm91bmQgKiA0ICogc3dpcGVyU2l6ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoKHNsaWRlSW5kZXggLSAyKSAlIDQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0eCA9IHN3aXBlclNpemUgKyAocm91bmQgKiA0ICogc3dpcGVyU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHogPSBzd2lwZXJTaXplO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoc2xpZGVJbmRleCAtIDMpICUgNCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4ID0gLXN3aXBlclNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgdHogPSAoMyAqIHN3aXBlclNpemUpICsgKHN3aXBlclNpemUgKiA0ICogcm91bmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJ0bCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR4ID0gLXR4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHkgPSB0eDtcclxuICAgICAgICAgICAgICAgICAgICB0eCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IFwicm90YXRlWChcIiArIChpc0hvcml6b250YWwgPyAwIDogLXNsaWRlQW5nbGUpICsgXCJkZWcpIHJvdGF0ZVkoXCIgKyAoaXNIb3Jpem9udGFsID8gc2xpZGVBbmdsZSA6IDApICsgXCJkZWcpIHRyYW5zbGF0ZTNkKFwiICsgdHggKyBcInB4LCBcIiArIHR5ICsgXCJweCwgXCIgKyB0eiArIFwicHgpXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSAmJiBwcm9ncmVzcyA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlclJvdGF0ZSA9IChzbGlkZUluZGV4ICogOTApICsgKHByb2dyZXNzICogOTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChydGwpIHsgd3JhcHBlclJvdGF0ZSA9ICgtc2xpZGVJbmRleCAqIDkwKSAtIChwcm9ncmVzcyAqIDkwKTsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJHNsaWRlRWwudHJhbnNmb3JtKHRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLnNsaWRlU2hhZG93cykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBzaGFkb3dzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0JlZm9yZSA9IGlzSG9yaXpvbnRhbCA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dBZnRlciA9IGlzSG9yaXpvbnRhbCA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKChcIjxkaXYgY2xhc3M9XFxcInN3aXBlci1zbGlkZS1zaGFkb3ctXCIgKyAoaXNIb3Jpem9udGFsID8gJ2xlZnQnIDogJ3RvcCcpICsgXCJcXFwiPjwvZGl2PlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZUVsLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd0FmdGVyID0gJCgoXCI8ZGl2IGNsYXNzPVxcXCJzd2lwZXItc2xpZGUtc2hhZG93LVwiICsgKGlzSG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJykgKyBcIlxcXCI+PC9kaXY+XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKHNoYWRvd0FmdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHsgc2hhZG93QmVmb3JlWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1heCgtcHJvZ3Jlc3MsIDApOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCkgeyBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHdyYXBwZXJFbC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbic6IChcIjUwJSA1MCUgLVwiICsgKHN3aXBlclNpemUgLyAyKSArIFwicHhcIiksXHJcbiAgICAgICAgICAgICAgICAnLW1vei10cmFuc2Zvcm0tb3JpZ2luJzogKFwiNTAlIDUwJSAtXCIgKyAoc3dpcGVyU2l6ZSAvIDIpICsgXCJweFwiKSxcclxuICAgICAgICAgICAgICAgICctbXMtdHJhbnNmb3JtLW9yaWdpbic6IChcIjUwJSA1MCUgLVwiICsgKHN3aXBlclNpemUgLyAyKSArIFwicHhcIiksXHJcbiAgICAgICAgICAgICAgICAndHJhbnNmb3JtLW9yaWdpbic6IChcIjUwJSA1MCUgLVwiICsgKHN3aXBlclNpemUgLyAyKSArIFwicHhcIiksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5zaGFkb3cpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAkY3ViZVNoYWRvd0VsLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZCgwcHgsIFwiICsgKChzd2lwZXJXaWR0aCAvIDIpICsgcGFyYW1zLnNoYWRvd09mZnNldCkgKyBcInB4LCBcIiArICgtc3dpcGVyV2lkdGggLyAyKSArIFwicHgpIHJvdGF0ZVgoOTBkZWcpIHJvdGF0ZVooMGRlZykgc2NhbGUoXCIgKyAocGFyYW1zLnNoYWRvd1NjYWxlKSArIFwiKVwiKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dBbmdsZSA9IE1hdGguYWJzKHdyYXBwZXJSb3RhdGUpIC0gKE1hdGguZmxvb3IoTWF0aC5hYnMod3JhcHBlclJvdGF0ZSkgLyA5MCkgKiA5MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG11bHRpcGxpZXIgPSAxLjUgLSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChNYXRoLnNpbigoc2hhZG93QW5nbGUgKiAyICogTWF0aC5QSSkgLyAzNjApIC8gMikgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoTWF0aC5jb3MoKHNoYWRvd0FuZ2xlICogMiAqIE1hdGguUEkpIC8gMzYwKSAvIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2NhbGUxID0gcGFyYW1zLnNoYWRvd1NjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY2FsZTIgPSBwYXJhbXMuc2hhZG93U2NhbGUgLyBtdWx0aXBsaWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBwYXJhbXMuc2hhZG93T2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICRjdWJlU2hhZG93RWwudHJhbnNmb3JtKChcInNjYWxlM2QoXCIgKyBzY2FsZTEgKyBcIiwgMSwgXCIgKyBzY2FsZTIgKyBcIikgdHJhbnNsYXRlM2QoMHB4LCBcIiArICgoc3dpcGVySGVpZ2h0IC8gMikgKyBvZmZzZXQpICsgXCJweCwgXCIgKyAoLXN3aXBlckhlaWdodCAvIDIgLyBzY2FsZTIpICsgXCJweCkgcm90YXRlWCgtOTBkZWcpXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgekZhY3RvciA9IChCcm93c2VyLmlzU2FmYXJpIHx8IEJyb3dzZXIuaXNVaVdlYlZpZXcpID8gKC1zd2lwZXJTaXplIC8gMikgOiAwO1xyXG4gICAgICAgICAgICAkd3JhcHBlckVsXHJcbiAgICAgICAgICAgICAgICAudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKDBweCwwLFwiICsgekZhY3RvciArIFwicHgpIHJvdGF0ZVgoXCIgKyAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gMCA6IHdyYXBwZXJSb3RhdGUpICsgXCJkZWcpIHJvdGF0ZVkoXCIgKyAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gLXdyYXBwZXJSb3RhdGUgOiAwKSArIFwiZGVnKVwiKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgJGVsID0gc3dpcGVyLiRlbDtcclxuICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XHJcbiAgICAgICAgICAgIHNsaWRlc1xyXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oZHVyYXRpb24pXHJcbiAgICAgICAgICAgICAgICAuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JylcclxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3ViZUVmZmVjdC5zaGFkb3cgJiYgIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xyXG4gICAgICAgICAgICAgICAgJGVsLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKS50cmFuc2l0aW9uKGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBFZmZlY3RDdWJlID0ge1xyXG4gICAgICAgIG5hbWU6ICdlZmZlY3QtY3ViZScsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIGN1YmVFZmZlY3Q6IHtcclxuICAgICAgICAgICAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNoYWRvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNoYWRvd09mZnNldDogMjAsXHJcbiAgICAgICAgICAgICAgICBzaGFkb3dTY2FsZTogMC45NCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xyXG4gICAgICAgICAgICAgICAgY3ViZUVmZmVjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogQ3ViZS5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRyYW5zaXRpb246IEN1YmUuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uOiB7XHJcbiAgICAgICAgICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIGJlZm9yZUluaXQoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2N1YmUnKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcImN1YmVcIikpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcIjNkXCIpKTtcclxuICAgICAgICAgICAgICAgIHZhciBvdmVyd3JpdGVQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJDb2x1bW46IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByZXNpc3RhbmNlUmF0aW86IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5vcmlnaW5hbFBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2N1YmUnKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmN1YmVFZmZlY3Quc2V0VHJhbnNsYXRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY3ViZScpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuY3ViZUVmZmVjdC5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgRmxpcCA9IHtcclxuICAgICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xyXG4gICAgICAgICAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciAkc2xpZGVFbCA9IHNsaWRlcy5lcShpKTtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9ICRzbGlkZUVsWzBdLnByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZmxpcEVmZmVjdC5saW1pdFJvdGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbigkc2xpZGVFbFswXS5wcm9ncmVzcywgMSksIC0xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkc2xpZGVFbFswXS5zd2lwZXJTbGlkZU9mZnNldDtcclxuICAgICAgICAgICAgICAgIHZhciByb3RhdGUgPSAtMTgwICogcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm90YXRlWSA9IHJvdGF0ZTtcclxuICAgICAgICAgICAgICAgIHZhciByb3RhdGVYID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciB0eCA9IC1vZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0eSA9IHR4O1xyXG4gICAgICAgICAgICAgICAgICAgIHR4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICByb3RhdGVYID0gLXJvdGF0ZVk7XHJcbiAgICAgICAgICAgICAgICAgICAgcm90YXRlWSA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJ0bCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdGF0ZVkgPSAtcm90YXRlWTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkc2xpZGVFbFswXS5zdHlsZS56SW5kZXggPSAtTWF0aC5hYnMoTWF0aC5yb3VuZChwcm9ncmVzcykpICsgc2xpZGVzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mbGlwRWZmZWN0LnNsaWRlU2hhZG93cykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBzaGFkb3dzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0JlZm9yZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dBZnRlciA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKChcIjxkaXYgY2xhc3M9XFxcInN3aXBlci1zbGlkZS1zaGFkb3ctXCIgKyAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCcpICsgXCJcXFwiPjwvZGl2PlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZUVsLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd0FmdGVyID0gJCgoXCI8ZGl2IGNsYXNzPVxcXCJzd2lwZXItc2xpZGUtc2hhZG93LVwiICsgKHN3aXBlci5pc0hvcml6b250YWwoKSA/ICdyaWdodCcgOiAnYm90dG9tJykgKyBcIlxcXCI+PC9kaXY+XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKHNoYWRvd0FmdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHsgc2hhZG93QmVmb3JlWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1heCgtcHJvZ3Jlc3MsIDApOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCkgeyBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVFbFxyXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyB0eCArIFwicHgsIFwiICsgdHkgKyBcInB4LCAwcHgpIHJvdGF0ZVgoXCIgKyByb3RhdGVYICsgXCJkZWcpIHJvdGF0ZVkoXCIgKyByb3RhdGVZICsgXCJkZWcpXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcclxuICAgICAgICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcclxuICAgICAgICAgICAgc2xpZGVzXHJcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihkdXJhdGlvbilcclxuICAgICAgICAgICAgICAgIC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20sIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKVxyXG4gICAgICAgICAgICAgICAgLnRyYW5zaXRpb24oZHVyYXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlICYmIGR1cmF0aW9uICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRUcmlnZ2VyZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICAgICAgc2xpZGVzLmVxKGFjdGl2ZUluZGV4KS50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZCgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRUcmlnZ2VyZWQpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoISQodGhpcykuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHJpZ2dlcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyaWdnZXJFdmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCddO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJpZ2dlckV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd3JhcHBlckVsLnRyaWdnZXIodHJpZ2dlckV2ZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgRWZmZWN0RmxpcCA9IHtcclxuICAgICAgICBuYW1lOiAnZWZmZWN0LWZsaXAnLFxyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBmbGlwRWZmZWN0OiB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZVNoYWRvd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBsaW1pdFJvdGF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XHJcbiAgICAgICAgICAgICAgICBmbGlwRWZmZWN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBGbGlwLnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogRmxpcC5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gYmVmb3JlSW5pdCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmxpcCcpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwiZmxpcFwiKSk7XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwiM2RcIikpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG92ZXJ3cml0ZVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlckNvbHVtbjogMSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcclxuICAgICAgICAgICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcclxuICAgICAgICAgICAgICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5vcmlnaW5hbFBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2ZsaXAnKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmZsaXBFZmZlY3Quc2V0VHJhbnNsYXRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmxpcCcpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2lwZXIuZmxpcEVmZmVjdC5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgQ292ZXJmbG93ID0ge1xyXG4gICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHN3aXBlcldpZHRoID0gc3dpcGVyLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgc3dpcGVySGVpZ2h0ID0gc3dpcGVyLmhlaWdodDtcclxuICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XHJcbiAgICAgICAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXNTaXplc0dyaWQgPSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5jb3ZlcmZsb3dFZmZlY3Q7XHJcbiAgICAgICAgICAgIHZhciBpc0hvcml6b250YWwgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSBzd2lwZXIudHJhbnNsYXRlO1xyXG4gICAgICAgICAgICB2YXIgY2VudGVyID0gaXNIb3Jpem9udGFsID8gLXRyYW5zZm9ybSArIChzd2lwZXJXaWR0aCAvIDIpIDogLXRyYW5zZm9ybSArIChzd2lwZXJIZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgdmFyIHJvdGF0ZSA9IGlzSG9yaXpvbnRhbCA/IHBhcmFtcy5yb3RhdGUgOiAtcGFyYW1zLnJvdGF0ZTtcclxuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IHBhcmFtcy5kZXB0aDtcclxuICAgICAgICAgICAgLy8gRWFjaCBzbGlkZSBvZmZzZXQgZnJvbSBjZW50ZXJcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlU2l6ZSA9IHNsaWRlc1NpemVzR3JpZFtpXTtcclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZU9mZnNldCA9ICRzbGlkZUVsWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldE11bHRpcGxpZXIgPSAoKGNlbnRlciAtIHNsaWRlT2Zmc2V0IC0gKHNsaWRlU2l6ZSAvIDIpKSAvIHNsaWRlU2l6ZSkgKiBwYXJhbXMubW9kaWZpZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJvdGF0ZVkgPSBpc0hvcml6b250YWwgPyByb3RhdGUgKiBvZmZzZXRNdWx0aXBsaWVyIDogMDtcclxuICAgICAgICAgICAgICAgIHZhciByb3RhdGVYID0gaXNIb3Jpem9udGFsID8gMCA6IHJvdGF0ZSAqIG9mZnNldE11bHRpcGxpZXI7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgcm90YXRlWiA9IDBcclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGVaID0gLXRyYW5zbGF0ZSAqIE1hdGguYWJzKG9mZnNldE11bHRpcGxpZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGVZID0gaXNIb3Jpem9udGFsID8gMCA6IHBhcmFtcy5zdHJldGNoICogKG9mZnNldE11bHRpcGxpZXIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZVggPSBpc0hvcml6b250YWwgPyBwYXJhbXMuc3RyZXRjaCAqIChvZmZzZXRNdWx0aXBsaWVyKSA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRml4IGZvciB1bHRyYSBzbWFsbCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVYKSA8IDAuMDAxKSB7IHRyYW5zbGF0ZVggPSAwOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnModHJhbnNsYXRlWSkgPCAwLjAwMSkgeyB0cmFuc2xhdGVZID0gMDsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVopIDwgMC4wMDEpIHsgdHJhbnNsYXRlWiA9IDA7IH1cclxuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVZKSA8IDAuMDAxKSB7IHJvdGF0ZVkgPSAwOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMocm90YXRlWCkgPCAwLjAwMSkgeyByb3RhdGVYID0gMDsgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzbGlkZVRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoXCIgKyB0cmFuc2xhdGVYICsgXCJweCxcIiArIHRyYW5zbGF0ZVkgKyBcInB4LFwiICsgdHJhbnNsYXRlWiArIFwicHgpICByb3RhdGVYKFwiICsgcm90YXRlWCArIFwiZGVnKSByb3RhdGVZKFwiICsgcm90YXRlWSArIFwiZGVnKVwiO1xyXG5cclxuICAgICAgICAgICAgICAgICRzbGlkZUVsLnRyYW5zZm9ybShzbGlkZVRyYW5zZm9ybSk7XHJcbiAgICAgICAgICAgICAgICAkc2xpZGVFbFswXS5zdHlsZS56SW5kZXggPSAtTWF0aC5hYnMoTWF0aC5yb3VuZChvZmZzZXRNdWx0aXBsaWVyKSkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5zbGlkZVNoYWRvd3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgc2hhZG93c1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkc2hhZG93QmVmb3JlRWwgPSBpc0hvcml6b250YWwgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgJHNoYWRvd0FmdGVyRWwgPSBpc0hvcml6b250YWwgPyAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCcpIDogJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzaGFkb3dCZWZvcmVFbC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNoYWRvd0JlZm9yZUVsID0gJCgoXCI8ZGl2IGNsYXNzPVxcXCJzd2lwZXItc2xpZGUtc2hhZG93LVwiICsgKGlzSG9yaXpvbnRhbCA/ICdsZWZ0JyA6ICd0b3AnKSArIFwiXFxcIj48L2Rpdj5cIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2xpZGVFbC5hcHBlbmQoJHNoYWRvd0JlZm9yZUVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzaGFkb3dBZnRlckVsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2hhZG93QWZ0ZXJFbCA9ICQoKFwiPGRpdiBjbGFzcz1cXFwic3dpcGVyLXNsaWRlLXNoYWRvdy1cIiArIChpc0hvcml6b250YWwgPyAncmlnaHQnIDogJ2JvdHRvbScpICsgXCJcXFwiPjwvZGl2PlwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzbGlkZUVsLmFwcGVuZCgkc2hhZG93QWZ0ZXJFbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2hhZG93QmVmb3JlRWwubGVuZ3RoKSB7ICRzaGFkb3dCZWZvcmVFbFswXS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0TXVsdGlwbGllciA+IDAgPyBvZmZzZXRNdWx0aXBsaWVyIDogMDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2hhZG93QWZ0ZXJFbC5sZW5ndGgpIHsgJHNoYWRvd0FmdGVyRWxbMF0uc3R5bGUub3BhY2l0eSA9ICgtb2Zmc2V0TXVsdGlwbGllcikgPiAwID8gLW9mZnNldE11bHRpcGxpZXIgOiAwOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBjb3JyZWN0IHBlcnNwZWN0aXZlIGZvciBJRTEwXHJcbiAgICAgICAgICAgIGlmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMgfHwgU3VwcG9ydC5wcmVmaXhlZFBvaW50ZXJFdmVudHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB3cyA9ICR3cmFwcGVyRWxbMF0uc3R5bGU7XHJcbiAgICAgICAgICAgICAgICB3cy5wZXJzcGVjdGl2ZU9yaWdpbiA9IGNlbnRlciArIFwicHggNTAlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZXNcclxuICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpXHJcbiAgICAgICAgICAgICAgICAudHJhbnNpdGlvbihkdXJhdGlvbik7XHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgdmFyIEVmZmVjdENvdmVyZmxvdyA9IHtcclxuICAgICAgICBuYW1lOiAnZWZmZWN0LWNvdmVyZmxvdycsXHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIGNvdmVyZmxvd0VmZmVjdDoge1xyXG4gICAgICAgICAgICAgICAgcm90YXRlOiA1MCxcclxuICAgICAgICAgICAgICAgIHN0cmV0Y2g6IDAsXHJcbiAgICAgICAgICAgICAgICBkZXB0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgbW9kaWZpZXI6IDEsXHJcbiAgICAgICAgICAgICAgICBzbGlkZVNoYWRvd3M6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcclxuICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcclxuICAgICAgICAgICAgICAgIGNvdmVyZmxvd0VmZmVjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogQ292ZXJmbG93LnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogQ292ZXJmbG93LnNldFRyYW5zaXRpb24uYmluZChzd2lwZXIpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbjoge1xyXG4gICAgICAgICAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiBiZWZvcmVJbml0KCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdjb3ZlcmZsb3cnKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goKChzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpICsgXCJjb3ZlcmZsb3dcIikpO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcIjNkXCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2lwZXIucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3dpcGVyLm9yaWdpbmFsUGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY292ZXJmbG93JykgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci5jb3ZlcmZsb3dFZmZlY3Quc2V0VHJhbnNsYXRlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY292ZXJmbG93JykgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHN3aXBlci5jb3ZlcmZsb3dFZmZlY3Quc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gU3dpcGVyIENsYXNzXHJcblxyXG4gICAgdmFyIGNvbXBvbmVudHMgPSBbXHJcbiAgICAgICAgRGV2aWNlJDEsXHJcbiAgICAgICAgU3VwcG9ydCQxLFxyXG4gICAgICAgIEJyb3dzZXIkMSxcclxuICAgICAgICBSZXNpemUsXHJcbiAgICAgICAgT2JzZXJ2ZXIkMSxcclxuICAgICAgICBWaXJ0dWFsJDEsXHJcbiAgICAgICAgS2V5Ym9hcmQkMSxcclxuICAgICAgICBNb3VzZXdoZWVsJDEsXHJcbiAgICAgICAgTmF2aWdhdGlvbiQxLFxyXG4gICAgICAgIFBhZ2luYXRpb24kMSxcclxuICAgICAgICBTY3JvbGxiYXIkMSxcclxuICAgICAgICBQYXJhbGxheCQxLFxyXG4gICAgICAgIFpvb20kMSxcclxuICAgICAgICBMYXp5JDEsXHJcbiAgICAgICAgQ29udHJvbGxlciQxLFxyXG4gICAgICAgIEExMXksXHJcbiAgICAgICAgSGlzdG9yeSQxLFxyXG4gICAgICAgIEhhc2hOYXZpZ2F0aW9uJDEsXHJcbiAgICAgICAgQXV0b3BsYXkkMSxcclxuICAgICAgICBFZmZlY3RGYWRlLFxyXG4gICAgICAgIEVmZmVjdEN1YmUsXHJcbiAgICAgICAgRWZmZWN0RmxpcCxcclxuICAgICAgICBFZmZlY3RDb3ZlcmZsb3dcclxuICAgIF07XHJcblxyXG4gICAgaWYgKHR5cGVvZiBTd2lwZXIudXNlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIFN3aXBlci51c2UgPSBTd2lwZXIuQ2xhc3MudXNlO1xyXG4gICAgICAgIFN3aXBlci5pbnN0YWxsTW9kdWxlID0gU3dpcGVyLkNsYXNzLmluc3RhbGxNb2R1bGU7XHJcbiAgICB9XHJcblxyXG4gICAgU3dpcGVyLnVzZShjb21wb25lbnRzKTtcclxuXHJcbiAgICByZXR1cm4gU3dpcGVyO1xyXG5cclxufSkpKTtcclxuIl19
