typeof navigator === "object" && (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define('Plyr', factory) :
            (window.Plyr = factory());
}(this, (function () {
    'use strict';

    // ==========================================================================
    // Type checking utils
    // ==========================================================================

    var getConstructor = function getConstructor(input) {
        return input !== null && typeof input !== 'undefined' ? input.constructor : null;
    };
    var instanceOf = function instanceOf(input, constructor) {
        return Boolean(input && constructor && input instanceof constructor);
    };
    var isNullOrUndefined = function isNullOrUndefined(input) {
        return input === null || typeof input === 'undefined';
    };
    var isObject = function isObject(input) {
        return getConstructor(input) === Object;
    };
    var isNumber = function isNumber(input) {
        return getConstructor(input) === Number && !Number.isNaN(input);
    };
    var isString = function isString(input) {
        return getConstructor(input) === String;
    };
    var isBoolean = function isBoolean(input) {
        return getConstructor(input) === Boolean;
    };
    var isFunction = function isFunction(input) {
        return getConstructor(input) === Function;
    };
    var isArray = function isArray(input) {
        return Array.isArray(input);
    };
    var isWeakMap = function isWeakMap(input) {
        return instanceOf(input, WeakMap);
    };
    var isNodeList = function isNodeList(input) {
        return instanceOf(input, NodeList);
    };
    var isElement = function isElement(input) {
        return instanceOf(input, Element);
    };
    var isTextNode = function isTextNode(input) {
        return getConstructor(input) === Text;
    };
    var isEvent = function isEvent(input) {
        return instanceOf(input, Event);
    };
    var isCue = function isCue(input) {
        return instanceOf(input, window.TextTrackCue) || instanceOf(input, window.VTTCue);
    };
    var isTrack = function isTrack(input) {
        return instanceOf(input, TextTrack) || !isNullOrUndefined(input) && isString(input.kind);
    };

    var isEmpty = function isEmpty(input) {
        return isNullOrUndefined(input) || (isString(input) || isArray(input) || isNodeList(input)) && !input.length || isObject(input) && !Object.keys(input).length;
    };

    var isUrl = function isUrl(input) {
        // Accept a URL object
        if (instanceOf(input, window.URL)) {
            return true;
        }

        // Add the protocol if required
        var string = input;
        if (!input.startsWith('http://') || !input.startsWith('https://')) {
            string = 'http://' + input;
        }

        try {
            return !isEmpty(new URL(string).hostname);
        } catch (e) {
            return false;
        }
    };

    var is = {
        nullOrUndefined: isNullOrUndefined,
        object: isObject,
        number: isNumber,
        string: isString,
        boolean: isBoolean,
        function: isFunction,
        array: isArray,
        weakMap: isWeakMap,
        nodeList: isNodeList,
        element: isElement,
        textNode: isTextNode,
        event: isEvent,
        cue: isCue,
        track: isTrack,
        url: isUrl,
        empty: isEmpty
    };

    // ==========================================================================

    // Check for passive event listener support
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    // https://www.youtube.com/watch?v=NPM6172J22g
    var supportsPassiveListeners = function () {
        // Test via a getter in the options object to see if the passive property is accessed
        var supported = false;
        try {
            var options = Object.defineProperty({}, 'passive', {
                get: function get() {
                    supported = true;
                    return null;
                }
            });
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (e) {
            // Do nothing
        }

        return supported;
    }();

    // Toggle event listener
    function toggleListener(element, event, callback) {
        var toggle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        var _this = this;

        var passive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
        var capture = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

        // Bail if no element, event, or callback
        if (!element || !('addEventListener' in element) || is.empty(event) || !is.function(callback)) {
            return;
        }

        // Allow multiple events
        var events = event.split(' ');

        // Build options
        // Default to just the capture boolean for browsers with no passive listener support
        var options = capture;

        // If passive events listeners are supported
        if (supportsPassiveListeners) {
            options = {
                // Whether the listener can be passive (i.e. default never prevented)
                passive: passive,
                // Whether the listener is a capturing listener or not
                capture: capture
            };
        }

        // If a single node is passed, bind the event listener
        events.forEach(function (type) {
            if (_this && _this.eventListeners && toggle) {
                // Cache event listener
                _this.eventListeners.push({ element: element, type: type, callback: callback, options: options });
            }

            element[toggle ? 'addEventListener' : 'removeEventListener'](type, callback, options);
        });
    }

    // Bind event handler
    function on(element) {
        var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var callback = arguments[2];
        var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        toggleListener.call(this, element, events, callback, true, passive, capture);
    }

    // Unbind event handler
    function off(element) {
        var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var callback = arguments[2];
        var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        toggleListener.call(this, element, events, callback, false, passive, capture);
    }

    // Bind once-only event handler
    function once(element) {
        var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var callback = arguments[2];
        var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        function onceCallback() {
            off(element, events, onceCallback, passive, capture);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            callback.apply(this, args);
        }

        toggleListener.call(this, element, events, onceCallback, true, passive, capture);
    }

    // Trigger event
    function triggerEvent(element) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var detail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        // Bail if no element
        if (!is.element(element) || is.empty(type)) {
            return;
        }

        // Create and dispatch the event
        var event = new CustomEvent(type, {
            bubbles: bubbles,
            detail: Object.assign({}, detail, {
                plyr: this
            })
        });

        // Dispatch the event
        element.dispatchEvent(event);
    }

    // Unbind all cached event listeners
    function unbindListeners() {
        if (this && this.eventListeners) {
            this.eventListeners.forEach(function (item) {
                var element = item.element,
                    type = item.type,
                    callback = item.callback,
                    options = item.options;

                element.removeEventListener(type, callback, options);
            });

            this.eventListeners = [];
        }
    }

    // Run method when / if player is ready
    function ready() {
        var _this2 = this;

        return new Promise(function (resolve) {
            return _this2.ready ? setTimeout(resolve, 0) : on.call(_this2, _this2.elements.container, 'ready', resolve);
        }).then(function () { });
    }

    var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var defineProperty = function (obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    };

    var slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var toConsumableArray = function (arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        } else {
            return Array.from(arr);
        }
    };

    // ==========================================================================

    // Wrap an element
    function wrap(elements, wrapper) {
        // Convert `elements` to an array, if necessary.
        var targets = elements.length ? elements : [elements];

        // Loops backwards to prevent having to clone the wrapper on the
        // first element (see `child` below).
        Array.from(targets).reverse().forEach(function (element, index) {
            var child = index > 0 ? wrapper.cloneNode(true) : wrapper;

            // Cache the current parent and sibling.
            var parent = element.parentNode;
            var sibling = element.nextSibling;

            // Wrap the element (is automatically removed from its current
            // parent).
            child.appendChild(element);

            // If the element had a sibling, insert the wrapper before
            // the sibling to maintain the HTML structure; otherwise, just
            // append it to the parent.
            if (sibling) {
                parent.insertBefore(child, sibling);
            } else {
                parent.appendChild(child);
            }
        });
    }

    // Set attributes
    function setAttributes(element, attributes) {
        if (!is.element(element) || is.empty(attributes)) {
            return;
        }

        // Assume null and undefined attributes should be left out,
        // Setting them would otherwise convert them to "null" and "undefined"
        Object.entries(attributes).filter(function (_ref) {
            var _ref2 = slicedToArray(_ref, 2),
                value = _ref2[1];

            return !is.nullOrUndefined(value);
        }).forEach(function (_ref3) {
            var _ref4 = slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            return element.setAttribute(key, value);
        });
    }

    // Create a DocumentFragment
    function createElement(type, attributes, text) {
        // Create a new <element>
        var element = document.createElement(type);

        // Set all passed attributes
        if (is.object(attributes)) {
            setAttributes(element, attributes);
        }

        // Add text node
        if (is.string(text)) {
            element.innerText = text;
        }

        // Return built element
        return element;
    }

    // Inaert an element after another
    function insertAfter(element, target) {
        target.parentNode.insertBefore(element, target.nextSibling);
    }

    // Insert a DocumentFragment
    function insertElement(type, parent, attributes, text) {
        // Inject the new <element>
        parent.appendChild(createElement(type, attributes, text));
    }

    // Remove element(s)
    function removeElement(element) {
        if (is.nodeList(element) || is.array(element)) {
            Array.from(element).forEach(removeElement);
            return;
        }

        if (!is.element(element) || !is.element(element.parentNode)) {
            return;
        }

        element.parentNode.removeChild(element);
    }

    // Remove all child elements
    function emptyElement(element) {
        var length = element.childNodes.length;


        while (length > 0) {
            element.removeChild(element.lastChild);
            length -= 1;
        }
    }

    // Replace element
    function replaceElement(newChild, oldChild) {
        if (!is.element(oldChild) || !is.element(oldChild.parentNode) || !is.element(newChild)) {
            return null;
        }

        oldChild.parentNode.replaceChild(newChild, oldChild);

        return newChild;
    }

    // Get an attribute object from a string selector
    function getAttributesFromSelector(sel, existingAttributes) {
        // For example:
        // '.test' to { class: 'test' }
        // '#test' to { id: 'test' }
        // '[data-test="test"]' to { 'data-test': 'test' }

        if (!is.string(sel) || is.empty(sel)) {
            return {};
        }

        var attributes = {};
        var existing = existingAttributes;

        sel.split(',').forEach(function (s) {
            // Remove whitespace
            var selector = s.trim();
            var className = selector.replace('.', '');
            var stripped = selector.replace(/[[\]]/g, '');

            // Get the parts and value
            var parts = stripped.split('=');
            var key = parts[0];
            var value = parts.length > 1 ? parts[1].replace(/["']/g, '') : '';

            // Get the first character
            var start = selector.charAt(0);

            switch (start) {
                case '.':
                    // Add to existing classname
                    if (is.object(existing) && is.string(existing.class)) {
                        existing.class += ' ' + className;
                    }

                    attributes.class = className;
                    break;

                case '#':
                    // ID selector
                    attributes.id = selector.replace('#', '');
                    break;

                case '[':
                    // Attribute selector
                    attributes[key] = value;

                    break;

                default:
                    break;
            }
        });

        return attributes;
    }

    // Toggle hidden
    function toggleHidden(element, hidden) {
        if (!is.element(element)) {
            return;
        }

        var hide = hidden;

        if (!is.boolean(hide)) {
            hide = !element.hasAttribute('hidden');
        }

        if (hide) {
            element.setAttribute('hidden', '');
        } else {
            element.removeAttribute('hidden');
        }
    }

    // Mirror Element.classList.toggle, with IE compatibility for "force" argument
    function toggleClass(element, className, force) {
        if (is.element(element)) {
            var method = 'toggle';
            if (typeof force !== 'undefined') {
                method = force ? 'add' : 'remove';
            }

            element.classList[method](className);
            return element.classList.contains(className);
        }

        return null;
    }

    // Has class name
    function hasClass(element, className) {
        return is.element(element) && element.classList.contains(className);
    }

    // Element matches selector
    function matches(element, selector) {
        var prototype = { Element: Element };

        function match() {
            return Array.from(document.querySelectorAll(selector)).includes(this);
        }

        var matches = prototype.matches || prototype.webkitMatchesSelector || prototype.mozMatchesSelector || prototype.msMatchesSelector || match;

        return matches.call(element, selector);
    }

    // Find all elements
    function getElements(selector) {
        return this.elements.container.querySelectorAll(selector);
    }

    // Find a single element
    function getElement(selector) {
        return this.elements.container.querySelector(selector);
    }

    // Get the focused element
    function getFocusElement() {
        var focused = document.activeElement;

        if (!focused || focused === document.body) {
            focused = null;
        } else {
            focused = document.querySelector(':focus');
        }

        return focused;
    }

    // Trap focus inside container
    function trapFocus() {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var toggle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (!is.element(element)) {
            return;
        }

        var focusable = getElements.call(this, 'button:not(:disabled), input:not(:disabled), [tabindex]');
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        var trap = function trap(event) {
            // Bail if not tab key or not fullscreen
            if (event.key !== 'Tab' || event.keyCode !== 9) {
                return;
            }

            // Get the current focused element
            var focused = getFocusElement();

            if (focused === last && !event.shiftKey) {
                // Move focus to first element that can be tabbed if Shift isn't used
                first.focus();
                event.preventDefault();
            } else if (focused === first && event.shiftKey) {
                // Move focus to last element that can be tabbed if Shift is used
                last.focus();
                event.preventDefault();
            }
        };

        toggleListener.call(this, this.elements.container, 'keydown', trap, toggle, false);
    }

    // ==========================================================================

    var transitionEndEvent = function () {
        var element = document.createElement('span');

        var events = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        var type = Object.keys(events).find(function (event) {
            return element.style[event] !== undefined;
        });

        return is.string(type) ? events[type] : false;
    }();

    // Force repaint of element
    function repaint(element) {
        setTimeout(function () {
            toggleHidden(element, true);
            element.offsetHeight; // eslint-disable-line
            toggleHidden(element, false);
        }, 0);
    }

    // ==========================================================================
    // Browser sniffing
    // Unfortunately, due to mixed support, UA sniffing is required
    // ==========================================================================

    var browser = {
        isIE: /* @cc_on!@ */!!document.documentMode,
        isWebkit: 'WebkitAppearance' in document.documentElement.style && !/Edge/.test(navigator.userAgent),
        isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
        isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform)
    };

    // ==========================================================================

    // Default codecs for checking mimetype support
    var defaultCodecs = {
        'audio/ogg': 'vorbis',
        'audio/wav': '1',
        'video/webm': 'vp8, vorbis',
        'video/mp4': 'avc1.42E01E, mp4a.40.2',
        'video/ogg': 'theora'
    };

    // Check for feature support
    var support = {
        // Basic support
        audio: 'canPlayType' in document.createElement('audio'),
        video: 'canPlayType' in document.createElement('video'),

        // Check for support
        // Basic functionality vs full UI
        check: function check(type, provider, playsinline) {
            var canPlayInline = browser.isIPhone && playsinline && support.playsinline;
            var api = support[type] || provider !== 'html5';
            var ui = api && support.rangeInput && (type !== 'video' || !browser.isIPhone || canPlayInline);

            return {
                api: api,
                ui: ui
            };
        },


        // Picture-in-picture support
        // Safari only currently
        pip: function () {
            return !browser.isIPhone && is.function(createElement('video').webkitSetPresentationMode);
        }(),

        // Airplay support
        // Safari only currently
        airplay: is.function(window.WebKitPlaybackTargetAvailabilityEvent),

        // Inline playback support
        // https://webkit.org/blog/6784/new-video-policies-for-ios/
        playsinline: 'playsInline' in document.createElement('video'),

        // Check for mime type support against a player instance
        // Credits: http://diveintohtml5.info/everything.html
        // Related: http://www.leanbackplayer.com/test/h5mt.html
        mime: function mime(inputType) {
            var _inputType$split = inputType.split('/'),
                _inputType$split2 = slicedToArray(_inputType$split, 1),
                mediaType = _inputType$split2[0];

            if (!this.isHTML5 || mediaType !== this.type) {
                return false;
            }

            var type = void 0;
            if (inputType && inputType.includes('codecs=')) {
                // Use input directly
                type = inputType;
            } else if (inputType === 'audio/mpeg') {
                // Skip codec
                type = 'audio/mpeg;';
            } else if (inputType in defaultCodecs) {
                // Use codec
                type = inputType + '; codecs="' + defaultCodecs[inputType] + '"';
            }

            try {
                return Boolean(type && this.media.canPlayType(type).replace(/no/, ''));
            } catch (err) {
                return false;
            }
        },


        // Check for textTracks support
        textTracks: 'textTracks' in document.createElement('video'),

        // <input type="range"> Sliders
        rangeInput: function () {
            var range = document.createElement('input');
            range.type = 'range';
            return range.type === 'range';
        }(),

        // Touch
        // NOTE: Remember a device can be mouse + touch enabled so we check on first touch event
        touch: 'ontouchstart' in document.documentElement,

        // Detect transitions support
        transitions: transitionEndEvent !== false,

        // Reduced motion iOS & MacOS setting
        // https://webkit.org/blog/7551/responsive-design-for-motion/
        reducedMotion: 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches
    };

    // ==========================================================================

    var html5 = {
        getSources: function getSources() {
            var _this = this;

            if (!this.isHTML5) {
                return [];
            }

            var sources = Array.from(this.media.querySelectorAll('source'));

            // Filter out unsupported sources
            return sources.filter(function (source) {
                return support.mime.call(_this, source.getAttribute('type'));
            });
        },


        // Get quality levels
        getQualityOptions: function getQualityOptions() {
            // Get sizes from <source> elements
            return html5.getSources.call(this).map(function (source) {
                return Number(source.getAttribute('size'));
            }).filter(Boolean);
        },
        extend: function extend() {
            if (!this.isHTML5) {
                return;
            }

            var player = this;

            // Quality
            Object.defineProperty(player.media, 'quality', {
                get: function get() {
                    // Get sources
                    var sources = html5.getSources.call(player);
                    var source = sources.find(function (source) {
                        return source.getAttribute('src') === player.source;
                    });

                    // Return size, if match is found
                    return source && Number(source.getAttribute('size'));
                },
                set: function set(input) {
                    // Get sources
                    var sources = html5.getSources.call(player);

                    // Get first match for requested size
                    var source = sources.find(function (source) {
                        return Number(source.getAttribute('size')) === input;
                    });

                    // No matching source found
                    if (!source) {
                        return;
                    }

                    // Get current state
                    var _player$media = player.media,
                        currentTime = _player$media.currentTime,
                        paused = _player$media.paused,
                        preload = _player$media.preload,
                        readyState = _player$media.readyState;

                    // Set new source

                    player.media.src = source.getAttribute('src');

                    // Prevent loading if preload="none" and the current source isn't loaded (#1044)
                    if (preload !== 'none' || readyState) {
                        // Restore time
                        player.once('loadedmetadata', function () {
                            player.currentTime = currentTime;

                            // Resume playing
                            if (!paused) {
                                player.play();
                            }
                        });

                        // Load new source
                        player.media.load();
                    }

                    // Trigger change event
                    triggerEvent.call(player, player.media, 'qualitychange', false, {
                        quality: input
                    });
                }
            });
        },


        // Cancel current network requests
        // See https://github.com/sampotts/plyr/issues/174
        cancelRequests: function cancelRequests() {
            if (!this.isHTML5) {
                return;
            }

            // Remove child sources
            removeElement(html5.getSources.call(this));

            // Set blank video src attribute
            // This is to prevent a MEDIA_ERR_SRC_NOT_SUPPORTED error
            // Info: http://stackoverflow.com/questions/32231579/how-to-properly-dispose-of-an-html5-video-and-close-socket-or-connection
            this.media.setAttribute('src', this.config.blankVideo);

            // Load the new empty source
            // This will cancel existing requests
            // See https://github.com/sampotts/plyr/issues/174
            this.media.load();

            // Debugging
            this.debug.log('Cancelled network requests');
        }
    };

    // ==========================================================================

    // Clone nested objects
    function cloneDeep(object) {
        return JSON.parse(JSON.stringify(object));
    }

    // Get a nested value in an object
    function getDeep(object, path) {
        return path.split('.').reduce(function (obj, key) {
            return obj && obj[key];
        }, object);
    }

    // Deep extend destination object with N more objects
    function extend() {
        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            sources[_key - 1] = arguments[_key];
        }

        if (!sources.length) {
            return target;
        }

        var source = sources.shift();

        if (!is.object(source)) {
            return target;
        }

        Object.keys(source).forEach(function (key) {
            if (is.object(source[key])) {
                if (!Object.keys(target).includes(key)) {
                    Object.assign(target, defineProperty({}, key, {}));
                }

                extend(target[key], source[key]);
            } else {
                Object.assign(target, defineProperty({}, key, source[key]));
            }
        });

        return extend.apply(undefined, [target].concat(sources));
    }

    // ==========================================================================

    // Generate a random ID
    function generateId(prefix) {
        return prefix + '-' + Math.floor(Math.random() * 10000);
    }

    // Format string
    function format(input) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        if (is.empty(input)) {
            return input;
        }

        return input.toString().replace(/{(\d+)}/g, function (match, i) {
            return args[i].toString();
        });
    }

    // Get percentage
    function getPercentage(current, max) {
        if (current === 0 || max === 0 || Number.isNaN(current) || Number.isNaN(max)) {
            return 0;
        }

        return (current / max * 100).toFixed(2);
    }

    // Replace all occurances of a string in a string
    function replaceAll() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var find = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        return input.replace(new RegExp(find.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'), 'g'), replace.toString());
    }

    // Convert to title case
    function toTitleCase() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return input.toString().replace(/\w\S*/g, function (text) {
            return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        });
    }

    // Convert string to pascalCase
    function toPascalCase() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var string = input.toString();

        // Convert kebab case
        string = replaceAll(string, '-', ' ');

        // Convert snake case
        string = replaceAll(string, '_', ' ');

        // Convert to title case
        string = toTitleCase(string);

        // Convert to pascal case
        return replaceAll(string, ' ', '');
    }

    // Convert string to pascalCase
    function toCamelCase() {
        var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var string = input.toString();

        // Convert to pascal case
        string = toPascalCase(string);

        // Convert first character to lowercase
        return string.charAt(0).toLowerCase() + string.slice(1);
    }

    // Remove HTML from a string
    function stripHTML(source) {
        var fragment = document.createDocumentFragment();
        var element = document.createElement('div');
        fragment.appendChild(element);
        element.innerHTML = source;
        return fragment.firstChild.innerText;
    }

    // Like outerHTML, but also works for DocumentFragment
    function getHTML(element) {
        var wrapper = document.createElement('div');
        wrapper.appendChild(element);
        return wrapper.innerHTML;
    }

    // ==========================================================================

    var i18n = {
        get: function get$$1() {
            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (is.empty(key) || is.empty(config)) {
                return '';
            }

            var string = getDeep(config.i18n, key);

            if (is.empty(string)) {
                return '';
            }

            var replace = {
                '{seektime}': config.seekTime,
                '{title}': config.title
            };

            Object.entries(replace).forEach(function (_ref) {
                var _ref2 = slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                string = replaceAll(string, key, value);
            });

            return string;
        }
    };

    // ==========================================================================

    // Remove duplicates in an array
    function dedupe(array) {
        if (!is.array(array)) {
            return array;
        }

        return array.filter(function (item, index) {
            return array.indexOf(item) === index;
        });
    }

    // Get the closest value in an array
    function closest(array, value) {
        if (!is.array(array) || !array.length) {
            return null;
        }

        return array.reduce(function (prev, curr) {
            return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
        });
    }

    // ==========================================================================

    var Storage = function () {
        function Storage(player) {
            classCallCheck(this, Storage);

            this.enabled = player.config.storage.enabled;
            this.key = player.config.storage.key;
        }

        // Check for actual support (see if we can use it)


        createClass(Storage, [{
            key: 'get',
            value: function get$$1(key) {
                if (!Storage.supported || !this.enabled) {
                    return null;
                }

                var store = window.localStorage.getItem(this.key);

                if (is.empty(store)) {
                    return null;
                }

                var json = JSON.parse(store);

                return is.string(key) && key.length ? json[key] : json;
            }
        }, {
            key: 'set',
            value: function set$$1(object) {
                // Bail if we don't have localStorage support or it's disabled
                if (!Storage.supported || !this.enabled) {
                    return;
                }

                // Can only store objectst
                if (!is.object(object)) {
                    return;
                }

                // Get current storage
                var storage = this.get();

                // Default to empty object
                if (is.empty(storage)) {
                    storage = {};
                }

                // Update the working copy of the values
                extend(storage, object);

                // Update storage
                window.localStorage.setItem(this.key, JSON.stringify(storage));
            }
        }], [{
            key: 'supported',
            get: function get$$1() {
                try {
                    if (!('localStorage' in window)) {
                        return false;
                    }

                    var test = '___test';

                    // Try to use it (it might be disabled, e.g. user is in private mode)
                    // see: https://github.com/sampotts/plyr/issues/131
                    window.localStorage.setItem(test, test);
                    window.localStorage.removeItem(test);

                    return true;
                } catch (e) {
                    return false;
                }
            }
        }]);
        return Storage;
    }();

    // ==========================================================================
    // Fetch wrapper
    // Using XHR to avoid issues with older browsers
    // ==========================================================================

    function fetch(url) {
        var responseType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text';

        return new Promise(function (resolve, reject) {
            try {
                var request = new XMLHttpRequest();

                // Check for CORS support
                if (!('withCredentials' in request)) {
                    return;
                }

                request.addEventListener('load', function () {
                    if (responseType === 'text') {
                        try {
                            resolve(JSON.parse(request.responseText));
                        } catch (e) {
                            resolve(request.responseText);
                        }
                    } else {
                        resolve(request.response);
                    }
                });

                request.addEventListener('error', function () {
                    throw new Error(request.status);
                });

                request.open('GET', url, true);

                // Set the required response type
                request.responseType = responseType;

                request.send();
            } catch (e) {
                reject(e);
            }
        });
    }

    // ==========================================================================

    // Load an external SVG sprite
    function loadSprite(url, id) {
        if (!is.string(url)) {
            return;
        }

        var prefix = 'cache';
        var hasId = is.string(id);
        var isCached = false;

        var exists = function exists() {
            return document.getElementById(id) !== null;
        };

        var update = function update(container, data) {
            container.innerHTML = data;

            // Check again incase of race condition
            if (hasId && exists()) {
                return;
            }

            // Inject the SVG to the body
            document.body.insertAdjacentElement('afterbegin', container);
        };

        // Only load once if ID set
        if (!hasId || !exists()) {
            var useStorage = Storage.supported;

            // Create container
            var container = document.createElement('div');
            container.setAttribute('hidden', '');

            if (hasId) {
                container.setAttribute('id', id);
            }

            // Check in cache
            if (useStorage) {
                var cached = window.localStorage.getItem(prefix + '-' + id);
                isCached = cached !== null;

                if (isCached) {
                    var data = JSON.parse(cached);
                    update(container, data.content);
                }
            }

            // Get the sprite
            fetch(url).then(function (result) {
                if (is.empty(result)) {
                    return;
                }

                if (useStorage) {
                    window.localStorage.setItem(prefix + '-' + id, JSON.stringify({
                        content: result
                    }));
                }

                update(container, result);
            }).catch(function () { });
        }
    }

    // ==========================================================================

    // Time helpers
    var getHours = function getHours(value) {
        return parseInt(value / 60 / 60 % 60, 10);
    };
    var getMinutes = function getMinutes(value) {
        return parseInt(value / 60 % 60, 10);
    };
    var getSeconds = function getSeconds(value) {
        return parseInt(value % 60, 10);
    };

    // Format time to UI friendly string
    function formatTime() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var displayHours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var inverted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        // Bail if the value isn't a number
        if (!is.number(time)) {
            return formatTime(null, displayHours, inverted);
        }

        // Format time component to add leading zero
        var format = function format(value) {
            return ('0' + value).slice(-2);
        };

        // Breakdown to hours, mins, secs
        var hours = getHours(time);
        var mins = getMinutes(time);
        var secs = getSeconds(time);

        // Do we need to display hours?
        if (displayHours || hours > 0) {
            hours = hours + ':';
        } else {
            hours = '';
        }

        // Render
        return '' + (inverted && time > 0 ? '-' : '') + hours + format(mins) + ':' + format(secs);
    }

    // ==========================================================================

    // TODO: Don't export a massive object - break down and create class
    var controls = {
        // Get icon URL
        getIconUrl: function getIconUrl() {
            var url = new URL(this.config.iconUrl, window.location);
            var cors = url.host !== window.location.host || browser.isIE && !window.svg4everybody;

            return {
                url: this.config.iconUrl,
                cors: cors
            };
        },


        // Find the UI controls
        findElements: function findElements() {
            try {
                this.elements.controls = getElement.call(this, this.config.selectors.controls.wrapper);

                // Buttons
                this.elements.buttons = {
                    play: getElements.call(this, this.config.selectors.buttons.play),
                    pause: getElement.call(this, this.config.selectors.buttons.pause),
                    restart: getElement.call(this, this.config.selectors.buttons.restart),
                    rewind: getElement.call(this, this.config.selectors.buttons.rewind),
                    fastForward: getElement.call(this, this.config.selectors.buttons.fastForward),
                    mute: getElement.call(this, this.config.selectors.buttons.mute),
                    pip: getElement.call(this, this.config.selectors.buttons.pip),
                    airplay: getElement.call(this, this.config.selectors.buttons.airplay),
                    settings: getElement.call(this, this.config.selectors.buttons.settings),
                    captions: getElement.call(this, this.config.selectors.buttons.captions),
                    fullscreen: getElement.call(this, this.config.selectors.buttons.fullscreen)
                };

                // Progress
                this.elements.progress = getElement.call(this, this.config.selectors.progress);

                // Inputs
                this.elements.inputs = {
                    seek: getElement.call(this, this.config.selectors.inputs.seek),
                    volume: getElement.call(this, this.config.selectors.inputs.volume)
                };

                // Display
                this.elements.display = {
                    buffer: getElement.call(this, this.config.selectors.display.buffer),
                    currentTime: getElement.call(this, this.config.selectors.display.currentTime),
                    duration: getElement.call(this, this.config.selectors.display.duration)
                };

                // Seek tooltip
                if (is.element(this.elements.progress)) {
                    this.elements.display.seekTooltip = this.elements.progress.querySelector('.' + this.config.classNames.tooltip);
                }

                return true;
            } catch (error) {
                // Log it
                this.debug.warn('It looks like there is a problem with your custom controls HTML', error);

                // Restore native video controls
                this.toggleNativeControls(true);

                return false;
            }
        },


        // Create <svg> icon
        createIcon: function createIcon(type, attributes) {
            var namespace = 'http://www.w3.org/2000/svg';
            var iconUrl = controls.getIconUrl.call(this);
            var iconPath = (!iconUrl.cors ? iconUrl.url : '') + '#' + this.config.iconPrefix;

            // Create <svg>
            var icon = document.createElementNS(namespace, 'svg');
            setAttributes(icon, extend(attributes, {
                role: 'presentation',
                focusable: 'false'
            }));

            // Create the <use> to reference sprite
            var use = document.createElementNS(namespace, 'use');
            var path = iconPath + '-' + type;

            // Set `href` attributes
            // https://github.com/sampotts/plyr/issues/460
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href
            if ('href' in use) {
                use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', path);
            } else {
                use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', path);
            }

            // Add <use> to <svg>
            icon.appendChild(use);

            return icon;
        },


        // Create hidden text label
        createLabel: function createLabel(type) {
            var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            // Skip i18n for abbreviations and brand names
            var universals = {
                pip: 'PIP',
                airplay: 'AirPlay'
            };
            var text = universals[type] || i18n.get(type, this.config);

            var attributes = Object.assign({}, attr, {
                class: [attr.class, this.config.classNames.hidden].filter(Boolean).join(' ')
            });
            return createElement('span', attributes, text);
        },


        // Create a badge
        createBadge: function createBadge(text) {
            if (is.empty(text)) {
                return null;
            }

            var badge = createElement('span', {
                class: this.config.classNames.menu.value
            });

            badge.appendChild(createElement('span', {
                class: this.config.classNames.menu.badge
            }, text));

            return badge;
        },


        // Create a <button>
        createButton: function createButton(buttonType, attr) {
            var button = createElement('button');
            var attributes = Object.assign({}, attr);
            var type = toCamelCase(buttonType);

            var toggle = false;
            var label = void 0;
            var icon = void 0;
            var labelPressed = void 0;
            var iconPressed = void 0;

            if (!('type' in attributes)) {
                attributes.type = 'button';
            }

            if ('class' in attributes) {
                if (!attributes.class.includes(this.config.classNames.control)) {
                    attributes.class += ' ' + this.config.classNames.control;
                }
            } else {
                attributes.class = this.config.classNames.control;
            }

            // Large play button
            switch (buttonType) {
                case 'play':
                    toggle = true;
                    label = 'play';
                    labelPressed = 'pause';
                    icon = 'play';
                    iconPressed = 'pause';
                    break;

                case 'mute':
                    toggle = true;
                    label = 'mute';
                    labelPressed = 'unmute';
                    icon = 'volume';
                    iconPressed = 'muted';
                    break;

                case 'captions':
                    toggle = true;
                    label = 'enableCaptions';
                    labelPressed = 'disableCaptions';
                    icon = 'captions-off';
                    iconPressed = 'captions-on';
                    break;

                case 'fullscreen':
                    toggle = true;
                    label = 'enterFullscreen';
                    labelPressed = 'exitFullscreen';
                    icon = 'enter-fullscreen';
                    iconPressed = 'exit-fullscreen';
                    break;

                case 'play-large':
                    attributes.class += ' ' + this.config.classNames.control + '--overlaid';
                    type = 'play';
                    label = 'play';
                    icon = 'play';
                    break;

                default:
                    label = type;
                    icon = buttonType;
            }

            // Setup toggle icon and labels
            if (toggle) {
                // Icon
                button.appendChild(controls.createIcon.call(this, iconPressed, { class: 'icon--pressed' }));
                button.appendChild(controls.createIcon.call(this, icon, { class: 'icon--not-pressed' }));

                // Label/Tooltip
                button.appendChild(controls.createLabel.call(this, labelPressed, { class: 'label--pressed' }));
                button.appendChild(controls.createLabel.call(this, label, { class: 'label--not-pressed' }));
            } else {
                button.appendChild(controls.createIcon.call(this, icon));
                button.appendChild(controls.createLabel.call(this, label));
            }

            // Merge attributes
            extend(attributes, getAttributesFromSelector(this.config.selectors.buttons[type], attributes));

            setAttributes(button, attributes);

            // We have multiple play buttons
            if (type === 'play') {
                if (!is.array(this.elements.buttons[type])) {
                    this.elements.buttons[type] = [];
                }

                this.elements.buttons[type].push(button);
            } else {
                this.elements.buttons[type] = button;
            }

            // Toggle classname when pressed property is set
            var className = this.config.classNames.controlPressed;
            Object.defineProperty(button, 'pressed', {
                enumerable: true,
                get: function get$$1() {
                    return hasClass(button, className);
                },
                set: function set$$1() {
                    var pressed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                    toggleClass(button, className, pressed);
                }
            });

            return button;
        },


        // Create an <input type='range'>
        createRange: function createRange(type, attributes) {
            // Seek input
            var input = createElement('input', extend(getAttributesFromSelector(this.config.selectors.inputs[type]), {
                type: 'range',
                min: 0,
                max: 100,
                step: 0.01,
                value: 0,
                autocomplete: 'off',
                // A11y fixes for https://github.com/sampotts/plyr/issues/905
                role: 'slider',
                'aria-label': i18n.get(type, this.config),
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': 0
            }, attributes));

            this.elements.inputs[type] = input;

            // Set the fill for webkit now
            controls.updateRangeFill.call(this, input);

            return input;
        },


        // Create a <progress>
        createProgress: function createProgress(type, attributes) {
            var progress = createElement('progress', extend(getAttributesFromSelector(this.config.selectors.display[type]), {
                min: 0,
                max: 100,
                value: 0,
                role: 'presentation',
                'aria-hidden': true
            }, attributes));

            // Create the label inside
            if (type !== 'volume') {
                progress.appendChild(createElement('span', null, '0'));

                var suffixKey = {
                    played: 'played',
                    buffer: 'buffered'
                }[type];
                var suffix = suffixKey ? i18n.get(suffixKey, this.config) : '';

                progress.innerText = '% ' + suffix.toLowerCase();
            }

            this.elements.display[type] = progress;

            return progress;
        },


        // Create time display
        createTime: function createTime(type) {
            var attributes = getAttributesFromSelector(this.config.selectors.display[type]);

            var container = createElement('div', extend(attributes, {
                class: 'plyr__time ' + attributes.class,
                'aria-label': i18n.get(type, this.config)
            }), '00:00');

            // Reference for updates
            this.elements.display[type] = container;

            return container;
        },


        // Create a settings menu item
        createMenuItem: function createMenuItem(_ref) {
            var value = _ref.value,
                list = _ref.list,
                type = _ref.type,
                title = _ref.title,
                _ref$badge = _ref.badge,
                badge = _ref$badge === undefined ? null : _ref$badge,
                _ref$checked = _ref.checked,
                checked = _ref$checked === undefined ? false : _ref$checked;

            var item = createElement('li');

            var label = createElement('label', {
                class: this.config.classNames.control
            });

            var radio = createElement('input', extend(getAttributesFromSelector(this.config.selectors.inputs[type]), {
                type: 'radio',
                name: 'plyr-' + type,
                value: value,
                checked: checked,
                class: 'plyr__sr-only'
            }));

            var faux = createElement('span', { hidden: '' });

            label.appendChild(radio);
            label.appendChild(faux);
            label.insertAdjacentHTML('beforeend', title);

            if (is.element(badge)) {
                label.appendChild(badge);
            }

            item.appendChild(label);
            list.appendChild(item);
        },


        // Format a time for display
        formatTime: function formatTime$$1() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var inverted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // Bail if the value isn't a number
            if (!is.number(time)) {
                return time;
            }

            // Always display hours if duration is over an hour
            var forceHours = getHours(this.duration) > 0;

            return formatTime(time, forceHours, inverted);
        },


        // Update the displayed time
        updateTimeDisplay: function updateTimeDisplay() {
            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var inverted = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            // Bail if there's no element to display or the value isn't a number
            if (!is.element(target) || !is.number(time)) {
                return;
            }

            // eslint-disable-next-line no-param-reassign
            target.innerText = controls.formatTime(time, inverted);
        },


        // Update volume UI and storage
        updateVolume: function updateVolume() {
            if (!this.supported.ui) {
                return;
            }

            // Update range
            if (is.element(this.elements.inputs.volume)) {
                controls.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume);
            }

            // Update mute state
            if (is.element(this.elements.buttons.mute)) {
                this.elements.buttons.mute.pressed = this.muted || this.volume === 0;
            }
        },


        // Update seek value and lower fill
        setRange: function setRange(target) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (!is.element(target)) {
                return;
            }

            // eslint-disable-next-line
            target.value = value;

            // Webkit range fill
            controls.updateRangeFill.call(this, target);
        },


        // Update <progress> elements
        updateProgress: function updateProgress(event) {
            var _this = this;

            if (!this.supported.ui || !is.event(event)) {
                return;
            }

            var value = 0;

            var setProgress = function setProgress(target, input) {
                var value = is.number(input) ? input : 0;
                var progress = is.element(target) ? target : _this.elements.display.buffer;

                // Update value and label
                if (is.element(progress)) {
                    progress.value = value;

                    // Update text label inside
                    var label = progress.getElementsByTagName('span')[0];
                    if (is.element(label)) {
                        label.childNodes[0].nodeValue = value;
                    }
                }
            };

            if (event) {
                switch (event.type) {
                    // Video playing
                    case 'timeupdate':
                    case 'seeking':
                    case 'seeked':
                        value = getPercentage(this.currentTime, this.duration);

                        // Set seek range value only if it's a 'natural' time event
                        if (event.type === 'timeupdate') {
                            controls.setRange.call(this, this.elements.inputs.seek, value);
                        }

                        break;

                    // Check buffer status
                    case 'playing':
                    case 'progress':
                        setProgress(this.elements.display.buffer, this.buffered * 100);

                        break;

                    default:
                        break;
                }
            }
        },


        // Webkit polyfill for lower fill range
        updateRangeFill: function updateRangeFill(target) {
            // Get range from event if event passed
            var range = is.event(target) ? target.target : target;

            // Needs to be a valid <input type='range'>
            if (!is.element(range) || range.getAttribute('type') !== 'range') {
                return;
            }

            // Set aria values for https://github.com/sampotts/plyr/issues/905
            if (matches(range, this.config.selectors.inputs.seek)) {
                range.setAttribute('aria-valuenow', this.currentTime);
                var currentTime = controls.formatTime(this.currentTime);
                var duration = controls.formatTime(this.duration);
                var format$$1 = i18n.get('seekLabel', this.config);
                range.setAttribute('aria-valuetext', format$$1.replace('{currentTime}', currentTime).replace('{duration}', duration));
            } else if (matches(range, this.config.selectors.inputs.volume)) {
                var percent = range.value * 100;
                range.setAttribute('aria-valuenow', percent);
                range.setAttribute('aria-valuetext', percent + '%');
            } else {
                range.setAttribute('aria-valuenow', range.value);
            }

            // WebKit only
            if (!browser.isWebkit) {
                return;
            }

            // Set CSS custom property
            range.style.setProperty('--value', range.value / range.max * 100 + '%');
        },


        // Update hover tooltip for seeking
        updateSeekTooltip: function updateSeekTooltip(event) {
            var _this2 = this;

            // Bail if setting not true
            if (!this.config.tooltips.seek || !is.element(this.elements.inputs.seek) || !is.element(this.elements.display.seekTooltip) || this.duration === 0) {
                return;
            }

            // Calculate percentage
            var percent = 0;
            var clientRect = this.elements.progress.getBoundingClientRect();
            var visible = this.config.classNames.tooltip + '--visible';

            var toggle = function toggle(_toggle) {
                toggleClass(_this2.elements.display.seekTooltip, visible, _toggle);
            };

            // Hide on touch
            if (this.touch) {
                toggle(false);
                return;
            }

            // Determine percentage, if already visible
            if (is.event(event)) {
                percent = 100 / clientRect.width * (event.pageX - clientRect.left);
            } else if (hasClass(this.elements.display.seekTooltip, visible)) {
                percent = parseFloat(this.elements.display.seekTooltip.style.left, 10);
            } else {
                return;
            }

            // Set bounds
            if (percent < 0) {
                percent = 0;
            } else if (percent > 100) {
                percent = 100;
            }

            // Display the time a click would seek to
            controls.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * percent);

            // Set position
            this.elements.display.seekTooltip.style.left = percent + '%';

            // Show/hide the tooltip
            // If the event is a moues in/out and percentage is inside bounds
            if (is.event(event) && ['mouseenter', 'mouseleave'].includes(event.type)) {
                toggle(event.type === 'mouseenter');
            }
        },


        // Handle time change event
        timeUpdate: function timeUpdate(event) {
            // Only invert if only one time element is displayed and used for both duration and currentTime
            var invert = !is.element(this.elements.display.duration) && this.config.invertTime;

            // Duration
            controls.updateTimeDisplay.call(this, this.elements.display.currentTime, invert ? this.duration - this.currentTime : this.currentTime, invert);

            // Ignore updates while seeking
            if (event && event.type === 'timeupdate' && this.media.seeking) {
                return;
            }

            // Playing progress
            controls.updateProgress.call(this, event);
        },


        // Show the duration on metadataloaded or durationchange events
        durationUpdate: function durationUpdate() {
            // Bail if no UI or durationchange event triggered after playing/seek when invertTime is false
            if (!this.supported.ui || !this.config.invertTime && this.currentTime) {
                return;
            }

            // If duration is the 2**32 (shaka), Infinity (HLS), DASH-IF (Number.MAX_SAFE_INTEGER || Number.MAX_VALUE) indicating live we hide the currentTime and progressbar.
            // https://github.com/video-dev/hls.js/blob/5820d29d3c4c8a46e8b75f1e3afa3e68c1a9a2db/src/controller/buffer-controller.js#L415
            // https://github.com/google/shaka-player/blob/4d889054631f4e1cf0fbd80ddd2b71887c02e232/lib/media/streaming_engine.js#L1062
            // https://github.com/Dash-Industry-Forum/dash.js/blob/69859f51b969645b234666800d4cb596d89c602d/src/dash/models/DashManifestModel.js#L338
            if (this.duration >= Math.pow(2, 32)) {
                toggleHidden(this.elements.display.currentTime, true);
                toggleHidden(this.elements.progress, true);
                return;
            }

            // Update ARIA values
            if (is.element(this.elements.inputs.seek)) {
                this.elements.inputs.seek.setAttribute('aria-valuemax', this.duration);
            }

            // If there's a spot to display duration
            var hasDuration = is.element(this.elements.display.duration);

            // If there's only one time display, display duration there
            if (!hasDuration && this.config.displayDuration && this.paused) {
                controls.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration);
            }

            // If there's a duration element, update content
            if (hasDuration) {
                controls.updateTimeDisplay.call(this, this.elements.display.duration, this.duration);
            }

            // Update the tooltip (if visible)
            controls.updateSeekTooltip.call(this);
        },


        // Hide/show a tab
        toggleTab: function toggleTab(setting, toggle) {
            toggleHidden(this.elements.settings.tabs[setting], !toggle);
        },


        // Set the quality menu
        setQualityMenu: function setQualityMenu(options) {
            var _this3 = this;

            // Menu required
            if (!is.element(this.elements.settings.panes.quality)) {
                return;
            }

            var type = 'quality';
            var list = this.elements.settings.panes.quality.querySelector('ul');

            // Set options if passed and filter based on uniqueness and config
            if (is.array(options)) {
                this.options.quality = dedupe(options).filter(function (quality) {
                    return _this3.config.quality.options.includes(quality);
                });
            }

            // Toggle the pane and tab
            var toggle = !is.empty(this.options.quality) && this.options.quality.length > 1;
            controls.toggleTab.call(this, type, toggle);

            // Check if we need to toggle the parent
            controls.checkMenu.call(this);

            // If we're hiding, nothing more to do
            if (!toggle) {
                return;
            }

            // Empty the menu
            emptyElement(list);

            // Get the badge HTML for HD, 4K etc
            var getBadge = function getBadge(quality) {
                var label = i18n.get('qualityBadge.' + quality, _this3.config);

                if (!label.length) {
                    return null;
                }

                return controls.createBadge.call(_this3, label);
            };

            // Sort options by the config and then render options
            this.options.quality.sort(function (a, b) {
                var sorting = _this3.config.quality.options;
                return sorting.indexOf(a) > sorting.indexOf(b) ? 1 : -1;
            }).forEach(function (quality) {
                controls.createMenuItem.call(_this3, {
                    value: quality,
                    list: list,
                    type: type,
                    title: controls.getLabel.call(_this3, 'quality', quality),
                    badge: getBadge(quality)
                });
            });

            controls.updateSetting.call(this, type, list);
        },


        // Translate a value into a nice label
        getLabel: function getLabel(setting, value) {
            switch (setting) {
                case 'speed':
                    return value === 1 ? i18n.get('normal', this.config) : value + '&times;';

                case 'quality':
                    if (is.number(value)) {
                        var label = i18n.get('qualityLabel.' + value, this.config);

                        if (!label.length) {
                            return value + 'p';
                        }

                        return label;
                    }

                    return toTitleCase(value);

                case 'captions':
                    return captions.getLabel.call(this);

                default:
                    return null;
            }
        },


        // Update the selected setting
        updateSetting: function updateSetting(setting, container, input) {
            var pane = this.elements.settings.panes[setting];
            var value = null;
            var list = container;

            if (setting === 'captions') {
                value = this.currentTrack;
            } else {
                value = !is.empty(input) ? input : this[setting];

                // Get default
                if (is.empty(value)) {
                    value = this.config[setting].default;
                }

                // Unsupported value
                if (!is.empty(this.options[setting]) && !this.options[setting].includes(value)) {
                    this.debug.warn('Unsupported value of \'' + value + '\' for ' + setting);
                    return;
                }

                // Disabled value
                if (!this.config[setting].options.includes(value)) {
                    this.debug.warn('Disabled value of \'' + value + '\' for ' + setting);
                    return;
                }
            }

            // Get the list if we need to
            if (!is.element(list)) {
                list = pane && pane.querySelector('ul');
            }

            // If there's no list it means it's not been rendered...
            if (!is.element(list)) {
                return;
            }

            // Update the label
            var label = this.elements.settings.tabs[setting].querySelector('.' + this.config.classNames.menu.value);
            label.innerHTML = controls.getLabel.call(this, setting, value);

            // Find the radio option and check it
            var target = list && list.querySelector('input[value="' + value + '"]');

            if (is.element(target)) {
                target.checked = true;
            }
        },


        // Set the looping options
        /* setLoopMenu() {
            // Menu required
            if (!is.element(this.elements.settings.panes.loop)) {
                return;
            }
             const options = ['start', 'end', 'all', 'reset'];
            const list = this.elements.settings.panes.loop.querySelector('ul');
             // Show the pane and tab
            toggleHidden(this.elements.settings.tabs.loop, false);
            toggleHidden(this.elements.settings.panes.loop, false);
             // Toggle the pane and tab
            const toggle = !is.empty(this.loop.options);
            controls.toggleTab.call(this, 'loop', toggle);
             // Empty the menu
            emptyElement(list);
             options.forEach(option => {
                const item = createElement('li');
                 const button = createElement(
                    'button',
                    extend(getAttributesFromSelector(this.config.selectors.buttons.loop), {
                        type: 'button',
                        class: this.config.classNames.control,
                        'data-plyr-loop-action': option,
                    }),
                    i18n.get(option, this.config)
                );
                 if (['start', 'end'].includes(option)) {
                    const badge = controls.createBadge.call(this, '00:00');
                    button.appendChild(badge);
                }
                 item.appendChild(button);
                list.appendChild(item);
            });
        }, */

        // Get current selected caption language
        // TODO: rework this to user the getter in the API?

        // Set a list of available captions languages
        setCaptionsMenu: function setCaptionsMenu() {
            var _this4 = this;

            // TODO: Captions or language? Currently it's mixed
            var type = 'captions';
            var list = this.elements.settings.panes.captions.querySelector('ul');
            var tracks = captions.getTracks.call(this);

            // Toggle the pane and tab
            controls.toggleTab.call(this, type, tracks.length);

            // Empty the menu
            emptyElement(list);

            // Check if we need to toggle the parent
            controls.checkMenu.call(this);

            // If there's no captions, bail
            if (!tracks.length) {
                return;
            }

            // Generate options data
            var options = tracks.map(function (track, value) {
                return {
                    value: value,
                    checked: _this4.captions.toggled && _this4.currentTrack === value,
                    title: captions.getLabel.call(_this4, track),
                    badge: track.language && controls.createBadge.call(_this4, track.language.toUpperCase()),
                    list: list,
                    type: 'language'
                };
            });

            // Add the "Disabled" option to turn off captions
            options.unshift({
                value: -1,
                checked: !this.captions.toggled,
                title: i18n.get('disabled', this.config),
                list: list,
                type: 'language'
            });

            // Generate options
            options.forEach(controls.createMenuItem.bind(this));

            controls.updateSetting.call(this, type, list);
        },


        // Set a list of available captions languages
        setSpeedMenu: function setSpeedMenu(options) {
            var _this5 = this;

            // Do nothing if not selected
            if (!this.config.controls.includes('settings') || !this.config.settings.includes('speed')) {
                return;
            }

            // Menu required
            if (!is.element(this.elements.settings.panes.speed)) {
                return;
            }

            var type = 'speed';

            // Set the speed options
            if (is.array(options)) {
                this.options.speed = options;
            } else if (this.isHTML5 || this.isVimeo) {
                this.options.speed = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
            }

            // Set options if passed and filter based on config
            this.options.speed = this.options.speed.filter(function (speed) {
                return _this5.config.speed.options.includes(speed);
            });

            // Toggle the pane and tab
            var toggle = !is.empty(this.options.speed) && this.options.speed.length > 1;
            controls.toggleTab.call(this, type, toggle);

            // Check if we need to toggle the parent
            controls.checkMenu.call(this);

            // If we're hiding, nothing more to do
            if (!toggle) {
                return;
            }

            // Get the list to populate
            var list = this.elements.settings.panes.speed.querySelector('ul');

            // Empty the menu
            emptyElement(list);

            // Create items
            this.options.speed.forEach(function (speed) {
                controls.createMenuItem.call(_this5, {
                    value: speed,
                    list: list,
                    type: type,
                    title: controls.getLabel.call(_this5, 'speed', speed)
                });
            });

            controls.updateSetting.call(this, type, list);
        },


        // Check if we need to hide/show the settings menu
        checkMenu: function checkMenu() {
            var tabs = this.elements.settings.tabs;

            var visible = !is.empty(tabs) && Object.values(tabs).some(function (tab) {
                return !tab.hidden;
            });

            toggleHidden(this.elements.settings.menu, !visible);
        },


        // Show/hide menu
        toggleMenu: function toggleMenu(event) {
            var form = this.elements.settings.form;

            var button = this.elements.buttons.settings;

            // Menu and button are required
            if (!is.element(form) || !is.element(button)) {
                return;
            }

            var show = is.boolean(event) ? event : is.element(form) && form.hasAttribute('hidden');

            if (is.event(event)) {
                var isMenuItem = is.element(form) && form.contains(event.target);
                var isButton = event.target === this.elements.buttons.settings;

                // If the click was inside the form or if the click
                // wasn't the button or menu item and we're trying to
                // show the menu (a doc click shouldn't show the menu)
                if (isMenuItem || !isMenuItem && !isButton && show) {
                    return;
                }

                // Prevent the toggle being caught by the doc listener
                if (isButton) {
                    event.stopPropagation();
                }
            }

            // Set form and button attributes
            if (is.element(button)) {
                button.setAttribute('aria-expanded', show);
            }

            if (is.element(form)) {
                toggleHidden(form, !show);
                toggleClass(this.elements.container, this.config.classNames.menu.open, show);

                if (show) {
                    form.removeAttribute('tabindex');
                } else {
                    form.setAttribute('tabindex', -1);
                }
            }
        },


        // Get the natural size of a tab
        getTabSize: function getTabSize(tab) {
            var clone = tab.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.opacity = 0;
            clone.removeAttribute('hidden');

            // Prevent input's being unchecked due to the name being identical
            Array.from(clone.querySelectorAll('input[name]')).forEach(function (input) {
                var name = input.getAttribute('name');
                input.setAttribute('name', name + '-clone');
            });

            // Append to parent so we get the "real" size
            tab.parentNode.appendChild(clone);

            // Get the sizes before we remove
            var width = clone.scrollWidth;
            var height = clone.scrollHeight;

            // Remove from the DOM
            removeElement(clone);

            return {
                width: width,
                height: height
            };
        },


        // Toggle Menu
        showTab: function showTab() {
            var _this6 = this;

            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var menu = this.elements.settings.menu;

            var pane = document.getElementById(target);

            // Nothing to show, bail
            if (!is.element(pane)) {
                return;
            }

            // Are we targeting a tab? If not, bail
            var isTab = pane.getAttribute('role') === 'tabpanel';
            if (!isTab) {
                return;
            }

            // Hide all other tabs
            // Get other tabs
            var current = menu.querySelector('[role="tabpanel"]:not([hidden])');
            var container = current.parentNode;

            // Set other toggles to be expanded false
            Array.from(menu.querySelectorAll('[aria-controls="' + current.getAttribute('id') + '"]')).forEach(function (toggle) {
                toggle.setAttribute('aria-expanded', false);
            });

            // If we can do fancy animations, we'll animate the height/width
            if (support.transitions && !support.reducedMotion) {
                // Set the current width as a base
                container.style.width = current.scrollWidth + 'px';
                container.style.height = current.scrollHeight + 'px';

                // Get potential sizes
                var size = controls.getTabSize.call(this, pane);

                // Restore auto height/width
                var restore = function restore(e) {
                    // We're only bothered about height and width on the container
                    if (e.target !== container || !['width', 'height'].includes(e.propertyName)) {
                        return;
                    }

                    // Revert back to auto
                    container.style.width = '';
                    container.style.height = '';

                    // Only listen once
                    off.call(_this6, container, transitionEndEvent, restore);
                };

                // Listen for the transition finishing and restore auto height/width
                on.call(this, container, transitionEndEvent, restore);

                // Set dimensions to target
                container.style.width = size.width + 'px';
                container.style.height = size.height + 'px';
            }

            // Set attributes on current tab
            toggleHidden(current, true);
            current.setAttribute('tabindex', -1);

            // Set attributes on target
            toggleHidden(pane, false);

            var tabs = getElements.call(this, '[aria-controls="' + target + '"]');
            Array.from(tabs).forEach(function (tab) {
                tab.setAttribute('aria-expanded', true);
            });
            pane.removeAttribute('tabindex');

            // Focus the first item
            pane.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex]')[0].focus();
        },


        // Build the default HTML
        // TODO: Set order based on order in the config.controls array?
        create: function create(data) {
            var _this7 = this;

            // Do nothing if we want no controls
            if (is.empty(this.config.controls)) {
                return null;
            }

            // Create the container
            var container = createElement('div', getAttributesFromSelector(this.config.selectors.controls.wrapper));

            // Restart button
            if (this.config.controls.includes('restart')) {
                container.appendChild(controls.createButton.call(this, 'restart'));
            }

            // Rewind button
            if (this.config.controls.includes('rewind')) {
                container.appendChild(controls.createButton.call(this, 'rewind'));
            }

            // Play/Pause button
            if (this.config.controls.includes('play')) {
                container.appendChild(controls.createButton.call(this, 'play'));
            }

            // Fast forward button
            if (this.config.controls.includes('fast-forward')) {
                container.appendChild(controls.createButton.call(this, 'fast-forward'));
            }

            // Progress
            if (this.config.controls.includes('progress')) {
                var progress = createElement('div', getAttributesFromSelector(this.config.selectors.progress));

                // Seek range slider
                progress.appendChild(controls.createRange.call(this, 'seek', {
                    id: 'plyr-seek-' + data.id
                }));

                // Buffer progress
                progress.appendChild(controls.createProgress.call(this, 'buffer'));

                // TODO: Add loop display indicator

                // Seek tooltip
                if (this.config.tooltips.seek) {
                    var tooltip = createElement('span', {
                        class: this.config.classNames.tooltip
                    }, '00:00');

                    progress.appendChild(tooltip);
                    this.elements.display.seekTooltip = tooltip;
                }

                this.elements.progress = progress;
                container.appendChild(this.elements.progress);
            }

            // Media current time display
            if (this.config.controls.includes('current-time')) {
                container.appendChild(controls.createTime.call(this, 'currentTime'));
            }

            // Media duration display
            if (this.config.controls.includes('duration')) {
                container.appendChild(controls.createTime.call(this, 'duration'));
            }

            // Toggle mute button
            if (this.config.controls.includes('mute')) {
                container.appendChild(controls.createButton.call(this, 'mute'));
            }

            // Volume range control
            if (this.config.controls.includes('volume')) {
                var volume = createElement('div', {
                    class: 'plyr__volume'
                });

                // Set the attributes
                var attributes = {
                    max: 1,
                    step: 0.05,
                    value: this.config.volume
                };

                // Create the volume range slider
                volume.appendChild(controls.createRange.call(this, 'volume', extend(attributes, {
                    id: 'plyr-volume-' + data.id
                })));

                this.elements.volume = volume;

                container.appendChild(volume);
            }

            // Toggle captions button
            if (this.config.controls.includes('captions')) {
                container.appendChild(controls.createButton.call(this, 'captions'));
            }

            // Settings button / menu
            if (this.config.controls.includes('settings') && !is.empty(this.config.settings)) {
                var menu = createElement('div', {
                    class: 'plyr__menu',
                    hidden: ''
                });

                menu.appendChild(controls.createButton.call(this, 'settings', {
                    id: 'plyr-settings-toggle-' + data.id,
                    'aria-haspopup': true,
                    'aria-controls': 'plyr-settings-' + data.id,
                    'aria-expanded': false
                }));

                var form = createElement('form', {
                    class: 'plyr__menu__container',
                    id: 'plyr-settings-' + data.id,
                    hidden: '',
                    'aria-labelled-by': 'plyr-settings-toggle-' + data.id,
                    role: 'tablist',
                    tabindex: -1
                });

                var inner = createElement('div');

                var home = createElement('div', {
                    id: 'plyr-settings-' + data.id + '-home',
                    'aria-labelled-by': 'plyr-settings-toggle-' + data.id,
                    role: 'tabpanel'
                });

                // Create the tab list
                var tabs = createElement('ul', {
                    role: 'tablist'
                });

                // Build the tabs
                this.config.settings.forEach(function (type) {
                    var tab = createElement('li', {
                        role: 'tab',
                        hidden: ''
                    });

                    var button = createElement('button', extend(getAttributesFromSelector(_this7.config.selectors.buttons.settings), {
                        type: 'button',
                        class: _this7.config.classNames.control + ' ' + _this7.config.classNames.control + '--forward',
                        id: 'plyr-settings-' + data.id + '-' + type + '-tab',
                        'aria-haspopup': true,
                        'aria-controls': 'plyr-settings-' + data.id + '-' + type,
                        'aria-expanded': false
                    }), i18n.get(type, _this7.config));

                    var value = createElement('span', {
                        class: _this7.config.classNames.menu.value
                    });

                    // Speed contains HTML entities
                    value.innerHTML = data[type];

                    button.appendChild(value);
                    tab.appendChild(button);
                    tabs.appendChild(tab);

                    _this7.elements.settings.tabs[type] = tab;
                });

                home.appendChild(tabs);
                inner.appendChild(home);

                // Build the panes
                this.config.settings.forEach(function (type) {
                    var pane = createElement('div', {
                        id: 'plyr-settings-' + data.id + '-' + type,
                        hidden: '',
                        'aria-labelled-by': 'plyr-settings-' + data.id + '-' + type + '-tab',
                        role: 'tabpanel',
                        tabindex: -1
                    });

                    var back = createElement('button', {
                        type: 'button',
                        class: _this7.config.classNames.control + ' ' + _this7.config.classNames.control + '--back',
                        'aria-haspopup': true,
                        'aria-controls': 'plyr-settings-' + data.id + '-home',
                        'aria-expanded': false
                    }, i18n.get(type, _this7.config));

                    pane.appendChild(back);

                    var options = createElement('ul');

                    pane.appendChild(options);
                    inner.appendChild(pane);

                    _this7.elements.settings.panes[type] = pane;
                });

                form.appendChild(inner);
                menu.appendChild(form);
                container.appendChild(menu);

                this.elements.settings.form = form;
                this.elements.settings.menu = menu;
            }

            // Picture in picture button
            if (this.config.controls.includes('pip') && support.pip) {
                container.appendChild(controls.createButton.call(this, 'pip'));
            }

            // Airplay button
            if (this.config.controls.includes('airplay') && support.airplay) {
                container.appendChild(controls.createButton.call(this, 'airplay'));
            }

            // Toggle fullscreen button
            if (this.config.controls.includes('fullscreen')) {
                container.appendChild(controls.createButton.call(this, 'fullscreen'));
            }

            // Larger overlaid play button
            if (this.config.controls.includes('play-large')) {
                this.elements.container.appendChild(controls.createButton.call(this, 'play-large'));
            }

            this.elements.controls = container;

            if (this.isHTML5) {
                controls.setQualityMenu.call(this, html5.getQualityOptions.call(this));
            }

            controls.setSpeedMenu.call(this);

            return container;
        },


        // Insert controls
        inject: function inject() {
            var _this8 = this;

            // Sprite
            if (this.config.loadSprite) {
                var icon = controls.getIconUrl.call(this);

                // Only load external sprite using AJAX
                if (icon.cors) {
                    loadSprite(icon.url, 'sprite-plyr');
                }
            }

            // Create a unique ID
            this.id = Math.floor(Math.random() * 10000);

            // Null by default
            var container = null;
            this.elements.controls = null;

            // Set template properties
            var props = {
                id: this.id,
                seektime: this.config.seekTime,
                title: this.config.title
            };
            var update = true;

            if (is.string(this.config.controls) || is.element(this.config.controls)) {
                // String or HTMLElement passed as the option
                container = this.config.controls;
            } else if (is.function(this.config.controls)) {
                // A custom function to build controls
                // The function can return a HTMLElement or String
                container = this.config.controls.call(this, props);
            } else {
                // Create controls
                container = controls.create.call(this, {
                    id: this.id,
                    seektime: this.config.seekTime,
                    speed: this.speed,
                    quality: this.quality,
                    captions: captions.getLabel.call(this)
                    // TODO: Looping
                    // loop: 'None',
                });
                update = false;
            }

            // Replace props with their value
            var replace = function replace(input) {
                var result = input;

                Object.entries(props).forEach(function (_ref2) {
                    var _ref3 = slicedToArray(_ref2, 2),
                        key = _ref3[0],
                        value = _ref3[1];

                    result = replaceAll(result, '{' + key + '}', value);
                });

                return result;
            };

            // Update markup
            if (update) {
                if (is.string(this.config.controls)) {
                    container = replace(container);
                } else if (is.element(container)) {
                    container.innerHTML = replace(container.innerHTML);
                }
            }

            // Controls container
            var target = void 0;

            // Inject to custom location
            if (is.string(this.config.selectors.controls.container)) {
                target = document.querySelector(this.config.selectors.controls.container);
            }

            // Inject into the container by default
            if (!is.element(target)) {
                target = this.elements.container;
            }

            // Inject controls HTML
            if (is.element(container)) {
                target.appendChild(container);
            } else if (container) {
                target.insertAdjacentHTML('beforeend', container);
            }

            // Find the elements if need be
            if (!is.element(this.elements.controls)) {
                controls.findElements.call(this);
            }

            // Edge sometimes doesn't finish the paint so force a redraw
            if (window.navigator.userAgent.includes('Edge')) {
                repaint(target);
            }

            // Setup tooltips
            if (this.config.tooltips.controls) {
                var _config = this.config,
                    classNames = _config.classNames,
                    selectors = _config.selectors;

                var selector = selectors.controls.wrapper + ' ' + selectors.labels + ' .' + classNames.hidden;
                var labels = getElements.call(this, selector);

                Array.from(labels).forEach(function (label) {
                    toggleClass(label, _this8.config.classNames.hidden, false);
                    toggleClass(label, _this8.config.classNames.tooltip, true);
                });
            }
        }
    };

    // ==========================================================================

    /**
     * Parse a string to a URL object
     * @param {string} input - the URL to be parsed
     * @param {boolean} safe - failsafe parsing
     */
    function parseUrl(input) {
        var safe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var url = input;

        if (safe) {
            var parser = document.createElement('a');
            parser.href = url;
            url = parser.href;
        }

        try {
            return new URL(url);
        } catch (e) {
            return null;
        }
    }

    // Convert object to URLSearchParams
    function buildUrlParams(input) {
        var params = new URLSearchParams();

        if (is.object(input)) {
            Object.entries(input).forEach(function (_ref) {
                var _ref2 = slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                params.set(key, value);
            });
        }

        return params;
    }

    // ==========================================================================

    var captions = {
        // Setup captions
        setup: function setup() {
            // Requires UI support
            if (!this.supported.ui) {
                return;
            }

            // Only Vimeo and HTML5 video supported at this point
            if (!this.isVideo || this.isYouTube || this.isHTML5 && !support.textTracks) {
                // Clear menu and hide
                if (is.array(this.config.controls) && this.config.controls.includes('settings') && this.config.settings.includes('captions')) {
                    controls.setCaptionsMenu.call(this);
                }

                return;
            }

            // Inject the container
            if (!is.element(this.elements.captions)) {
                this.elements.captions = createElement('div', getAttributesFromSelector(this.config.selectors.captions));

                insertAfter(this.elements.captions, this.elements.wrapper);
            }

            // Fix IE captions if CORS is used
            // Fetch captions and inject as blobs instead (data URIs not supported!)
            if (browser.isIE && window.URL) {
                var elements = this.media.querySelectorAll('track');

                Array.from(elements).forEach(function (track) {
                    var src = track.getAttribute('src');
                    var url = parseUrl(src);

                    if (url !== null && url.hostname !== window.location.href.hostname && ['http:', 'https:'].includes(url.protocol)) {
                        fetch(src, 'blob').then(function (blob) {
                            track.setAttribute('src', window.URL.createObjectURL(blob));
                        }).catch(function () {
                            removeElement(track);
                        });
                    }
                });
            }

            // Get and set initial data
            // The "preferred" options are not realized unless / until the wanted language has a match
            // * languages: Array of user's browser languages.
            // * language:  The language preferred by user settings or config
            // * active:    The state preferred by user settings or config
            // * toggled:   The real captions state

            var languages = dedupe(Array.from(navigator.languages || navigator.userLanguage).map(function (language) {
                return language.split('-')[0];
            }));

            var language = (this.storage.get('language') || this.config.captions.language || 'auto').toLowerCase();

            // Use first browser language when language is 'auto'
            if (language === 'auto') {
                var _languages = slicedToArray(languages, 1);

                language = _languages[0];
            }

            var active = this.storage.get('captions');
            if (!is.boolean(active)) {
                active = this.config.captions.active;
            }

            Object.assign(this.captions, {
                toggled: false,
                active: active,
                language: language,
                languages: languages
            });

            // Watch changes to textTracks and update captions menu
            if (this.isHTML5) {
                var trackEvents = this.config.captions.update ? 'addtrack removetrack' : 'removetrack';
                on.call(this, this.media.textTracks, trackEvents, captions.update.bind(this));
            }

            // Update available languages in list next tick (the event must not be triggered before the listeners)
            setTimeout(captions.update.bind(this), 0);
        },


        // Update available language options in settings based on tracks
        update: function update() {
            var _this = this;

            var tracks = captions.getTracks.call(this, true);
            // Get the wanted language
            var _captions = this.captions,
                active = _captions.active,
                language = _captions.language,
                meta = _captions.meta,
                currentTrackNode = _captions.currentTrackNode;

            var languageExists = Boolean(tracks.find(function (track) {
                return track.language === language;
            }));

            // Handle tracks (add event listener and "pseudo"-default)
            if (this.isHTML5 && this.isVideo) {
                tracks.filter(function (track) {
                    return !meta.get(track);
                }).forEach(function (track) {
                    _this.debug.log('Track added', track);
                    // Attempt to store if the original dom element was "default"
                    meta.set(track, {
                        default: track.mode === 'showing'
                    });

                    // Turn off native caption rendering to avoid double captions
                    track.mode = 'hidden';

                    // Add event listener for cue changes
                    on.call(_this, track, 'cuechange', function () {
                        return captions.updateCues.call(_this);
                    });
                });
            }

            // Update language first time it matches, or if the previous matching track was removed
            if (languageExists && this.language !== language || !tracks.includes(currentTrackNode)) {
                captions.setLanguage.call(this, language);
                captions.toggle.call(this, active && languageExists);
            }

            // Enable or disable captions based on track length
            toggleClass(this.elements.container, this.config.classNames.captions.enabled, !is.empty(tracks));

            // Update available languages in list
            if ((this.config.controls || []).includes('settings') && this.config.settings.includes('captions')) {
                controls.setCaptionsMenu.call(this);
            }
        },


        // Toggle captions display
        // Used internally for the toggleCaptions method, with the passive option forced to false
        toggle: function toggle(input) {
            var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            // If there's no full support
            if (!this.supported.ui) {
                return;
            }

            var toggled = this.captions.toggled; // Current state

            var activeClass = this.config.classNames.captions.active;

            // Get the next state
            // If the method is called without parameter, toggle based on current value
            var active = is.nullOrUndefined(input) ? !toggled : input;

            // Update state and trigger event
            if (active !== toggled) {
                // When passive, don't override user preferences
                if (!passive) {
                    this.captions.active = active;
                    this.storage.set({ captions: active });
                }

                // Force language if the call isn't passive and there is no matching language to toggle to
                if (!this.language && active && !passive) {
                    var tracks = captions.getTracks.call(this);
                    var track = captions.findTrack.call(this, [this.captions.language].concat(toConsumableArray(this.captions.languages)), true);

                    // Override user preferences to avoid switching languages if a matching track is added
                    this.captions.language = track.language;

                    // Set caption, but don't store in localStorage as user preference
                    captions.set.call(this, tracks.indexOf(track));
                    return;
                }

                // Toggle button if it's enabled
                if (this.elements.buttons.captions) {
                    this.elements.buttons.captions.pressed = active;
                }

                // Add class hook
                toggleClass(this.elements.container, activeClass, active);

                this.captions.toggled = active;

                // Update settings menu
                controls.updateSetting.call(this, 'captions');

                // Trigger event (not used internally)
                triggerEvent.call(this, this.media, active ? 'captionsenabled' : 'captionsdisabled');
            }
        },


        // Set captions by track index
        // Used internally for the currentTrack setter with the passive option forced to false
        set: function set$$1(index) {
            var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var tracks = captions.getTracks.call(this);

            // Disable captions if setting to -1
            if (index === -1) {
                captions.toggle.call(this, false, passive);
                return;
            }

            if (!is.number(index)) {
                this.debug.warn('Invalid caption argument', index);
                return;
            }

            if (!(index in tracks)) {
                this.debug.warn('Track not found', index);
                return;
            }

            if (this.captions.currentTrack !== index) {
                this.captions.currentTrack = index;
                var track = tracks[index];

                var _ref = track || {},
                    language = _ref.language;

                // Store reference to node for invalidation on remove


                this.captions.currentTrackNode = track;

                // Update settings menu
                controls.updateSetting.call(this, 'captions');

                // When passive, don't override user preferences
                if (!passive) {
                    this.captions.language = language;
                    this.storage.set({ language: language });
                }

                // Handle Vimeo captions
                if (this.isVimeo) {
                    this.embed.enableTextTrack(language);
                }

                // Trigger event
                triggerEvent.call(this, this.media, 'languagechange');
            }

            // Show captions
            captions.toggle.call(this, true, passive);

            if (this.isHTML5 && this.isVideo) {
                // If we change the active track while a cue is already displayed we need to update it
                captions.updateCues.call(this);
            }
        },


        // Set captions by language
        // Used internally for the language setter with the passive option forced to false
        setLanguage: function setLanguage(input) {
            var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (!is.string(input)) {
                this.debug.warn('Invalid language argument', input);
                return;
            }
            // Normalize
            var language = input.toLowerCase();
            this.captions.language = language;

            // Set currentTrack
            var tracks = captions.getTracks.call(this);
            var track = captions.findTrack.call(this, [language]);
            captions.set.call(this, tracks.indexOf(track), passive);
        },


        // Get current valid caption tracks
        // If update is false it will also ignore tracks without metadata
        // This is used to "freeze" the language options when captions.update is false
        getTracks: function getTracks() {
            var _this2 = this;

            var update = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            // Handle media or textTracks missing or null
            var tracks = Array.from((this.media || {}).textTracks || []);
            // For HTML5, use cache instead of current tracks when it exists (if captions.update is false)
            // Filter out removed tracks and tracks that aren't captions/subtitles (for example metadata)
            return tracks.filter(function (track) {
                return !_this2.isHTML5 || update || _this2.captions.meta.has(track);
            }).filter(function (track) {
                return ['captions', 'subtitles'].includes(track.kind);
            });
        },


        // Match tracks based on languages and get the first
        findTrack: function findTrack(languages) {
            var _this3 = this;

            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var tracks = captions.getTracks.call(this);
            var sortIsDefault = function sortIsDefault(track) {
                return Number((_this3.captions.meta.get(track) || {}).default);
            };
            var sorted = Array.from(tracks).sort(function (a, b) {
                return sortIsDefault(b) - sortIsDefault(a);
            });
            var track = void 0;
            languages.every(function (language) {
                track = sorted.find(function (track) {
                    return track.language === language;
                });
                return !track; // Break iteration if there is a match
            });
            // If no match is found but is required, get first
            return track || (force ? sorted[0] : undefined);
        },


        // Get the current track
        getCurrentTrack: function getCurrentTrack() {
            return captions.getTracks.call(this)[this.currentTrack];
        },


        // Get UI label for track
        getLabel: function getLabel(track) {
            var currentTrack = track;

            if (!is.track(currentTrack) && support.textTracks && this.captions.toggled) {
                currentTrack = captions.getCurrentTrack.call(this);
            }

            if (is.track(currentTrack)) {
                if (!is.empty(currentTrack.label)) {
                    return currentTrack.label;
                }

                if (!is.empty(currentTrack.language)) {
                    return track.language.toUpperCase();
                }

                return i18n.get('enabled', this.config);
            }

            return i18n.get('disabled', this.config);
        },


        // Update captions using current track's active cues
        // Also optional array argument in case there isn't any track (ex: vimeo)
        updateCues: function updateCues(input) {
            // Requires UI
            if (!this.supported.ui) {
                return;
            }

            if (!is.element(this.elements.captions)) {
                this.debug.warn('No captions element to render to');
                return;
            }

            // Only accept array or empty input
            if (!is.nullOrUndefined(input) && !Array.isArray(input)) {
                this.debug.warn('updateCues: Invalid input', input);
                return;
            }

            var cues = input;

            // Get cues from track
            if (!cues) {
                var track = captions.getCurrentTrack.call(this);
                cues = Array.from((track || {}).activeCues || []).map(function (cue) {
                    return cue.getCueAsHTML();
                }).map(getHTML);
            }

            // Set new caption text
            var content = cues.map(function (cueText) {
                return cueText.trim();
            }).join('\n');
            var changed = content !== this.elements.captions.innerHTML;

            if (changed) {
                // Empty the container and create a new child element
                emptyElement(this.elements.captions);
                var caption = createElement('span', getAttributesFromSelector(this.config.selectors.caption));
                caption.innerHTML = content;
                this.elements.captions.appendChild(caption);

                // Trigger event
                triggerEvent.call(this, this.media, 'cuechange');
            }
        }
    };

    // ==========================================================================
    // Plyr default config
    // ==========================================================================

    var defaults$1 = {
        // Disable
        enabled: true,

        // Custom media title
        title: '',

        // Logging to console
        debug: false,

        // Auto play (if supported)
        autoplay: false,

        // Only allow one media playing at once (vimeo only)
        autopause: true,

        // Allow inline playback on iOS (this effects YouTube/Vimeo - HTML5 requires the attribute present)
        // TODO: Remove iosNative fullscreen option in favour of this (logic needs work)
        playsinline: true,

        // Default time to skip when rewind/fast forward
        seekTime: 10,

        // Default volume
        volume: 1,
        muted: false,

        // Pass a custom duration
        duration: null,

        // Display the media duration on load in the current time position
        // If you have opted to display both duration and currentTime, this is ignored
        displayDuration: true,

        // Invert the current time to be a countdown
        invertTime: true,

        // Clicking the currentTime inverts it's value to show time left rather than elapsed
        toggleInvert: true,

        // Aspect ratio (for embeds)
        ratio: '16:9',

        // Click video container to play/pause
        clickToPlay: true,

        // Auto hide the controls
        hideControls: true,

        // Reset to start when playback ended
        resetOnEnd: false,

        // Disable the standard context menu
        disableContextMenu: true,

        // Sprite (for icons)
        loadSprite: true,
        iconPrefix: 'plyr',
        iconUrl: 'https://cdn.plyr.io/3.3.12/plyr.svg',

        // Blank video (used to prevent errors on source change)
        blankVideo: 'https://cdn.plyr.io/static/blank.mp4',

        // Quality default
        quality: {
            default: 576,
            options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240, 'default']
        },

        // Set loops
        loop: {
            active: false
            // start: null,
            // end: null,
        },

        // Speed default and options to display
        speed: {
            selected: 1,
            options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
        },

        // Keyboard shortcut settings
        keyboard: {
            focused: true,
            global: false
        },

        // Display tooltips
        tooltips: {
            controls: false,
            seek: true
        },

        // Captions settings
        captions: {
            active: false,
            language: 'auto',
            // Listen to new tracks added after Plyr is initialized.
            // This is needed for streaming captions, but may result in unselectable options
            update: false
        },

        // Fullscreen settings
        fullscreen: {
            enabled: true, // Allow fullscreen?
            fallback: true, // Fallback for vintage browsers
            iosNative: false // Use the native fullscreen in iOS (disables custom controls)
        },

        // Local storage
        storage: {
            enabled: true,
            key: 'plyr'
        },

        // Default controls
        controls: ['play-large',
            // 'restart',
            // 'rewind',
            'play',
            // 'fast-forward',
            'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        settings: ['captions', 'quality', 'speed'],

        // Localisation
        i18n: {
            restart: 'Restart',
            rewind: 'Rewind {seektime}s',
            play: 'Play',
            pause: 'Pause',
            fastForward: 'Forward {seektime}s',
            seek: 'Seek',
            seekLabel: '{currentTime} of {duration}',
            played: 'Played',
            buffered: 'Buffered',
            currentTime: 'Current time',
            duration: 'Duration',
            volume: 'Volume',
            mute: 'Mute',
            unmute: 'Unmute',
            enableCaptions: 'Enable captions',
            disableCaptions: 'Disable captions',
            enterFullscreen: 'Enter fullscreen',
            exitFullscreen: 'Exit fullscreen',
            frameTitle: 'Player for {title}',
            captions: 'Captions',
            settings: 'Settings',
            menuBack: 'Go back to previous menu',
            speed: 'Speed',
            normal: 'Normal',
            quality: 'Quality',
            loop: 'Loop',
            start: 'Start',
            end: 'End',
            all: 'All',
            reset: 'Reset',
            disabled: 'Disabled',
            enabled: 'Enabled',
            advertisement: 'Ad',
            qualityBadge: {
                2160: '4K',
                1440: 'HD',
                1080: 'HD',
                720: 'HD',
                576: 'SD',
                480: 'SD'
            }
        },

        // URLs
        urls: {
            vimeo: {
                sdk: 'https://player.vimeo.com/api/player.js',
                iframe: 'https://player.vimeo.com/video/{0}?{1}',
                api: 'https://vimeo.com/api/v2/video/{0}.json'
            },
            youtube: {
                sdk: 'https://www.youtube.com/iframe_api',
                api: 'https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title))&part=snippet'
            },
            googleIMA: {
                sdk: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js'
            }
        },

        // Custom control listeners
        listeners: {
            seek: null,
            play: null,
            pause: null,
            restart: null,
            rewind: null,
            fastForward: null,
            mute: null,
            volume: null,
            captions: null,
            fullscreen: null,
            pip: null,
            airplay: null,
            speed: null,
            quality: null,
            loop: null,
            language: null
        },

        // Events to watch and bubble
        events: [
            // Events to watch on HTML5 media elements and bubble
            // https://developer.mozilla.org/en/docs/Web/Guide/Events/Media_events
            'ended', 'progress', 'stalled', 'playing', 'waiting', 'canplay', 'canplaythrough', 'loadstart', 'loadeddata', 'loadedmetadata', 'timeupdate', 'volumechange', 'play', 'pause', 'error', 'seeking', 'seeked', 'emptied', 'ratechange', 'cuechange',

            // Custom events
            'enterfullscreen', 'exitfullscreen', 'captionsenabled', 'captionsdisabled', 'languagechange', 'controlshidden', 'controlsshown', 'ready',

            // YouTube
            'statechange', 'qualitychange', 'qualityrequested',

            // Ads
            'adsloaded', 'adscontentpause', 'adscontentresume', 'adstarted', 'adsmidpoint', 'adscomplete', 'adsallcomplete', 'adsimpression', 'adsclick'],

        // Selectors
        // Change these to match your template if using custom HTML
        selectors: {
            editable: 'input, textarea, select, [contenteditable]',
            container: '.plyr',
            controls: {
                container: null,
                wrapper: '.plyr__controls'
            },
            labels: '[data-plyr]',
            buttons: {
                play: '[data-plyr="play"]',
                pause: '[data-plyr="pause"]',
                restart: '[data-plyr="restart"]',
                rewind: '[data-plyr="rewind"]',
                fastForward: '[data-plyr="fast-forward"]',
                mute: '[data-plyr="mute"]',
                captions: '[data-plyr="captions"]',
                fullscreen: '[data-plyr="fullscreen"]',
                pip: '[data-plyr="pip"]',
                airplay: '[data-plyr="airplay"]',
                settings: '[data-plyr="settings"]',
                loop: '[data-plyr="loop"]'
            },
            inputs: {
                seek: '[data-plyr="seek"]',
                volume: '[data-plyr="volume"]',
                speed: '[data-plyr="speed"]',
                language: '[data-plyr="language"]',
                quality: '[data-plyr="quality"]'
            },
            display: {
                currentTime: '.plyr__time--current',
                duration: '.plyr__time--duration',
                buffer: '.plyr__progress__buffer',
                loop: '.plyr__progress__loop', // Used later
                volume: '.plyr__volume--display'
            },
            progress: '.plyr__progress',
            captions: '.plyr__captions',
            caption: '.plyr__caption',
            menu: {
                quality: '.js-plyr__menu__list--quality'
            }
        },

        // Class hooks added to the player in different states
        classNames: {
            type: 'plyr--{0}',
            provider: 'plyr--{0}',
            video: 'plyr__video-wrapper',
            embed: 'plyr__video-embed',
            embedContainer: 'plyr__video-embed__container',
            poster: 'plyr__poster',
            posterEnabled: 'plyr__poster-enabled',
            ads: 'plyr__ads',
            control: 'plyr__control',
            controlPressed: 'plyr__control--pressed',
            playing: 'plyr--playing',
            paused: 'plyr--paused',
            stopped: 'plyr--stopped',
            loading: 'plyr--loading',
            hover: 'plyr--hover',
            tooltip: 'plyr__tooltip',
            cues: 'plyr__cues',
            hidden: 'plyr__sr-only',
            hideControls: 'plyr--hide-controls',
            isIos: 'plyr--is-ios',
            isTouch: 'plyr--is-touch',
            uiSupported: 'plyr--full-ui',
            noTransition: 'plyr--no-transition',
            menu: {
                value: 'plyr__menu__value',
                badge: 'plyr__badge',
                open: 'plyr--menu-open'
            },
            captions: {
                enabled: 'plyr--captions-enabled',
                active: 'plyr--captions-active'
            },
            fullscreen: {
                enabled: 'plyr--fullscreen-enabled',
                fallback: 'plyr--fullscreen-fallback'
            },
            pip: {
                supported: 'plyr--pip-supported',
                active: 'plyr--pip-active'
            },
            airplay: {
                supported: 'plyr--airplay-supported',
                active: 'plyr--airplay-active'
            },
            tabFocus: 'plyr__tab-focus'
        },

        // Embed attributes
        attributes: {
            embed: {
                provider: 'data-plyr-provider',
                id: 'data-plyr-embed-id'
            }
        },

        // API keys
        keys: {
            google: null
        },

        // Advertisements plugin
        // Register for an account here: http://vi.ai/publisher-video-monetization/?aid=plyrio
        ads: {
            enabled: false,
            publisherId: ''
        }
    };

    // ==========================================================================
    // Plyr supported types and providers
    // ==========================================================================

    var providers = {
        html5: 'html5',
        youtube: 'youtube',
        vimeo: 'vimeo'
    };

    var types = {
        audio: 'audio',
        video: 'video'
    };

    /**
     * Get provider by URL
     * @param {string} url
     */
    function getProviderByUrl(url) {
        // YouTube
        if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url)) {
            return providers.youtube;
        }

        // Vimeo
        if (/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(url)) {
            return providers.vimeo;
        }

        return null;
    }

    // ==========================================================================
    // Console wrapper
    // ==========================================================================

    var noop = function noop() { };

    var Console = function () {
        function Console() {
            var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            classCallCheck(this, Console);

            this.enabled = window.console && enabled;

            if (this.enabled) {
                this.log('Debugging enabled');
            }
        }

        createClass(Console, [{
            key: 'log',
            get: function get$$1() {
                // eslint-disable-next-line no-console
                return this.enabled ? Function.prototype.bind.call(console.log, console) : noop;
            }
        }, {
            key: 'warn',
            get: function get$$1() {
                // eslint-disable-next-line no-console
                return this.enabled ? Function.prototype.bind.call(console.warn, console) : noop;
            }
        }, {
            key: 'error',
            get: function get$$1() {
                // eslint-disable-next-line no-console
                return this.enabled ? Function.prototype.bind.call(console.error, console) : noop;
            }
        }]);
        return Console;
    }();

    // ==========================================================================

    function onChange() {
        if (!this.enabled) {
            return;
        }

        // Update toggle button
        var button = this.player.elements.buttons.fullscreen;
        if (is.element(button)) {
            button.pressed = this.active;
        }

        // Trigger an event
        triggerEvent.call(this.player, this.target, this.active ? 'enterfullscreen' : 'exitfullscreen', true);

        // Trap focus in container
        if (!browser.isIos) {
            trapFocus.call(this.player, this.target, this.active);
        }
    }

    function toggleFallback() {
        var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // Store or restore scroll position
        if (toggle) {
            this.scrollPosition = {
                x: window.scrollX || 0,
                y: window.scrollY || 0
            };
        } else {
            window.scrollTo(this.scrollPosition.x, this.scrollPosition.y);
        }

        // Toggle scroll
        document.body.style.overflow = toggle ? 'hidden' : '';

        // Toggle class hook
        toggleClass(this.target, this.player.config.classNames.fullscreen.fallback, toggle);

        // Toggle button and fire events
        onChange.call(this);
    }

    var Fullscreen = function () {
        function Fullscreen(player) {
            var _this = this;

            classCallCheck(this, Fullscreen);

            // Keep reference to parent
            this.player = player;

            // Get prefix
            this.prefix = Fullscreen.prefix;
            this.property = Fullscreen.property;

            // Scroll position
            this.scrollPosition = { x: 0, y: 0 };

            // Register event listeners
            // Handle event (incase user presses escape etc)
            on.call(this.player, document, this.prefix === 'ms' ? 'MSFullscreenChange' : this.prefix + 'fullscreenchange', function () {
                // TODO: Filter for target??
                onChange.call(_this);
            });

            // Fullscreen toggle on double click
            on.call(this.player, this.player.elements.container, 'dblclick', function (event) {
                // Ignore double click in controls
                if (is.element(_this.player.elements.controls) && _this.player.elements.controls.contains(event.target)) {
                    return;
                }

                _this.toggle();
            });

            // Update the UI
            this.update();
        }

        // Determine if native supported


        createClass(Fullscreen, [{
            key: 'update',


            // Update UI
            value: function update() {
                if (this.enabled) {
                    this.player.debug.log((Fullscreen.native ? 'Native' : 'Fallback') + ' fullscreen enabled');
                } else {
                    this.player.debug.log('Fullscreen not supported and fallback disabled');
                }

                // Add styling hook to show button
                toggleClass(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
            }

            // Make an element fullscreen

        }, {
            key: 'enter',
            value: function enter() {
                if (!this.enabled) {
                    return;
                }

                // iOS native fullscreen doesn't need the request step
                if (browser.isIos && this.player.config.fullscreen.iosNative) {
                    if (this.player.playing) {
                        this.target.webkitEnterFullscreen();
                    }
                } else if (!Fullscreen.native) {
                    toggleFallback.call(this, true);
                } else if (!this.prefix) {
                    this.target.requestFullscreen();
                } else if (!is.empty(this.prefix)) {
                    this.target[this.prefix + 'Request' + this.property]();
                }
            }

            // Bail from fullscreen

        }, {
            key: 'exit',
            value: function exit() {
                if (!this.enabled) {
                    return;
                }

                // iOS native fullscreen
                if (browser.isIos && this.player.config.fullscreen.iosNative) {
                    this.target.webkitExitFullscreen();
                    this.player.play();
                } else if (!Fullscreen.native) {
                    toggleFallback.call(this, false);
                } else if (!this.prefix) {
                    (document.cancelFullScreen || document.exitFullscreen).call(document);
                } else if (!is.empty(this.prefix)) {
                    var action = this.prefix === 'moz' ? 'Cancel' : 'Exit';
                    document['' + this.prefix + action + this.property]();
                }
            }

            // Toggle state

        }, {
            key: 'toggle',
            value: function toggle() {
                if (!this.active) {
                    this.enter();
                } else {
                    this.exit();
                }
            }
        }, {
            key: 'enabled',


            // Determine if fullscreen is enabled
            get: function get$$1() {
                return (Fullscreen.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo;
            }

            // Get active state

        }, {
            key: 'active',
            get: function get$$1() {
                if (!this.enabled) {
                    return false;
                }

                // Fallback using classname
                if (!Fullscreen.native) {
                    return hasClass(this.target, this.player.config.classNames.fullscreen.fallback);
                }

                var element = !this.prefix ? document.fullscreenElement : document['' + this.prefix + this.property + 'Element'];

                return element === this.target;
            }

            // Get target element

        }, {
            key: 'target',
            get: function get$$1() {
                return browser.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.container;
            }
        }], [{
            key: 'native',
            get: function get$$1() {
                return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
            }

            // Get the prefix for handlers

        }, {
            key: 'prefix',
            get: function get$$1() {
                // No prefix
                if (is.function(document.exitFullscreen)) {
                    return '';
                }

                // Check for fullscreen support by vendor prefix
                var value = '';
                var prefixes = ['webkit', 'moz', 'ms'];

                prefixes.some(function (pre) {
                    if (is.function(document[pre + 'ExitFullscreen']) || is.function(document[pre + 'CancelFullScreen'])) {
                        value = pre;
                        return true;
                    }

                    return false;
                });

                return value;
            }
        }, {
            key: 'property',
            get: function get$$1() {
                return this.prefix === 'moz' ? 'FullScreen' : 'Fullscreen';
            }
        }]);
        return Fullscreen;
    }();

    // ==========================================================================
    // Load image avoiding xhr/fetch CORS issues
    // Server status can't be obtained this way unfortunately, so this uses "naturalWidth" to determine if the image has loaded
    // By default it checks if it is at least 1px, but you can add a second argument to change this
    // ==========================================================================

    function loadImage(src) {
        var minWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        return new Promise(function (resolve, reject) {
            var image = new Image();

            var handler = function handler() {
                delete image.onload;
                delete image.onerror;
                (image.naturalWidth >= minWidth ? resolve : reject)(image);
            };

            Object.assign(image, { onload: handler, onerror: handler, src: src });
        });
    }

    // ==========================================================================

    var ui = {
        addStyleHook: function addStyleHook() {
            toggleClass(this.elements.container, this.config.selectors.container.replace('.', ''), true);
            toggleClass(this.elements.container, this.config.classNames.uiSupported, this.supported.ui);
        },


        // Toggle native HTML5 media controls
        toggleNativeControls: function toggleNativeControls() {
            var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (toggle && this.isHTML5) {
                this.media.setAttribute('controls', '');
            } else {
                this.media.removeAttribute('controls');
            }
        },


        // Setup the UI
        build: function build() {
            var _this = this;

            // Re-attach media element listeners
            // TODO: Use event bubbling?
            this.listeners.media();

            // Don't setup interface if no support
            if (!this.supported.ui) {
                this.debug.warn('Basic support only for ' + this.provider + ' ' + this.type);

                // Restore native controls
                ui.toggleNativeControls.call(this, true);

                // Bail
                return;
            }

            // Inject custom controls if not present
            if (!is.element(this.elements.controls)) {
                // Inject custom controls
                controls.inject.call(this);

                // Re-attach control listeners
                this.listeners.controls();
            }

            // Remove native controls
            ui.toggleNativeControls.call(this);

            // Setup captions for HTML5
            if (this.isHTML5) {
                captions.setup.call(this);
            }

            // Reset volume
            this.volume = null;

            // Reset mute state
            this.muted = null;

            // Reset speed
            this.speed = null;

            // Reset loop state
            this.loop = null;

            // Reset quality setting
            this.quality = null;

            // Reset volume display
            controls.updateVolume.call(this);

            // Reset time display
            controls.timeUpdate.call(this);

            // Update the UI
            ui.checkPlaying.call(this);

            // Check for picture-in-picture support
            toggleClass(this.elements.container, this.config.classNames.pip.supported, support.pip && this.isHTML5 && this.isVideo);

            // Check for airplay support
            toggleClass(this.elements.container, this.config.classNames.airplay.supported, support.airplay && this.isHTML5);

            // Add iOS class
            toggleClass(this.elements.container, this.config.classNames.isIos, browser.isIos);

            // Add touch class
            toggleClass(this.elements.container, this.config.classNames.isTouch, this.touch);

            // Ready for API calls
            this.ready = true;

            // Ready event at end of execution stack
            setTimeout(function () {
                triggerEvent.call(_this, _this.media, 'ready');
            }, 0);

            // Set the title
            ui.setTitle.call(this);

            // Assure the poster image is set, if the property was added before the element was created
            if (this.poster) {
                ui.setPoster.call(this, this.poster, false).catch(function () { });
            }

            // Manually set the duration if user has overridden it.
            // The event listeners for it doesn't get called if preload is disabled (#701)
            if (this.config.duration) {
                controls.durationUpdate.call(this);
            }
        },


        // Setup aria attribute for play and iframe title
        setTitle: function setTitle() {
            // Find the current text
            var label = i18n.get('play', this.config);

            // If there's a media title set, use that for the label
            if (is.string(this.config.title) && !is.empty(this.config.title)) {
                label += ', ' + this.config.title;
            }

            // If there's a play button, set label
            Array.from(this.elements.buttons.play || []).forEach(function (button) {
                button.setAttribute('aria-label', label);
            });

            // Set iframe title
            // https://github.com/sampotts/plyr/issues/124
            if (this.isEmbed) {
                var iframe = getElement.call(this, 'iframe');

                if (!is.element(iframe)) {
                    return;
                }

                // Default to media type
                var title = !is.empty(this.config.title) ? this.config.title : 'video';
                var format = i18n.get('frameTitle', this.config);

                iframe.setAttribute('title', format.replace('{title}', title));
            }
        },


        // Toggle poster
        togglePoster: function togglePoster(enable) {
            toggleClass(this.elements.container, this.config.classNames.posterEnabled, enable);
        },


        // Set the poster image (async)
        // Used internally for the poster setter, with the passive option forced to false
        setPoster: function setPoster(poster) {
            var _this2 = this;

            var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            // Don't override if call is passive
            if (passive && this.poster) {
                return Promise.reject(new Error('Poster already set'));
            }

            // Set property synchronously to respect the call order
            this.media.setAttribute('poster', poster);

            // Wait until ui is ready
            return ready.call(this)
                // Load image
                .then(function () {
                    return loadImage(poster);
                }).catch(function (err) {
                    // Hide poster on error unless it's been set by another call
                    if (poster === _this2.poster) {
                        ui.togglePoster.call(_this2, false);
                    }
                    // Rethrow
                    throw err;
                }).then(function () {
                    // Prevent race conditions
                    if (poster !== _this2.poster) {
                        throw new Error('setPoster cancelled by later call to setPoster');
                    }
                }).then(function () {
                    Object.assign(_this2.elements.poster.style, {
                        backgroundImage: 'url(\'' + poster + '\')',
                        // Reset backgroundSize as well (since it can be set to "cover" for padded thumbnails for youtube)
                        backgroundSize: ''
                    });
                    ui.togglePoster.call(_this2, true);
                    return poster;
                });
        },


        // Check playing state
        checkPlaying: function checkPlaying(event) {
            var _this3 = this;

            // Class hooks
            toggleClass(this.elements.container, this.config.classNames.playing, this.playing);
            toggleClass(this.elements.container, this.config.classNames.paused, this.paused);
            toggleClass(this.elements.container, this.config.classNames.stopped, this.stopped);

            // Set state
            Array.from(this.elements.buttons.play || []).forEach(function (target) {
                target.pressed = _this3.playing;
            });

            // Only update controls on non timeupdate events
            if (is.event(event) && event.type === 'timeupdate') {
                return;
            }

            // Toggle controls
            ui.toggleControls.call(this);
        },


        // Check if media is loading
        checkLoading: function checkLoading(event) {
            var _this4 = this;

            this.loading = ['stalled', 'waiting'].includes(event.type);

            // Clear timer
            clearTimeout(this.timers.loading);

            // Timer to prevent flicker when seeking
            this.timers.loading = setTimeout(function () {
                // Update progress bar loading class state
                toggleClass(_this4.elements.container, _this4.config.classNames.loading, _this4.loading);

                // Update controls visibility
                ui.toggleControls.call(_this4);
            }, this.loading ? 250 : 0);
        },


        // Toggle controls based on state and `force` argument
        toggleControls: function toggleControls(force) {
            var controls$$1 = this.elements.controls;


            if (controls$$1 && this.config.hideControls) {
                // Show controls if force, loading, paused, or button interaction, otherwise hide
                this.toggleControls(Boolean(force || this.loading || this.paused || controls$$1.pressed || controls$$1.hover));
            }
        }
    };

    // ==========================================================================

    var Listeners = function () {
        function Listeners(player) {
            classCallCheck(this, Listeners);

            this.player = player;
            this.lastKey = null;

            this.handleKey = this.handleKey.bind(this);
            this.toggleMenu = this.toggleMenu.bind(this);
            this.firstTouch = this.firstTouch.bind(this);
        }

        // Handle key presses


        createClass(Listeners, [{
            key: 'handleKey',
            value: function handleKey(event) {
                var _this = this;

                var code = event.keyCode ? event.keyCode : event.which;
                var pressed = event.type === 'keydown';
                var repeat = pressed && code === this.lastKey;

                // Bail if a modifier key is set
                if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
                    return;
                }

                // If the event is bubbled from the media element
                // Firefox doesn't get the keycode for whatever reason
                if (!is.number(code)) {
                    return;
                }

                // Seek by the number keys
                var seekByKey = function seekByKey() {
                    // Divide the max duration into 10th's and times by the number value
                    _this.player.currentTime = _this.player.duration / 10 * (code - 48);
                };

                // Handle the key on keydown
                // Reset on keyup
                if (pressed) {
                    // Which keycodes should we prevent default
                    var preventDefault = [32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79];

                    // Check focused element
                    // and if the focused element is not editable (e.g. text input)
                    // and any that accept key input http://webaim.org/techniques/keyboard/
                    var focused = getFocusElement();
                    if (is.element(focused) && focused !== this.player.elements.inputs.seek && matches(focused, this.player.config.selectors.editable)) {
                        return;
                    }

                    // If the code is found prevent default (e.g. prevent scrolling for arrows)
                    if (preventDefault.includes(code)) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    switch (code) {
                        case 48:
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                        case 55:
                        case 56:
                        case 57:
                            // 0-9
                            if (!repeat) {
                                seekByKey();
                            }
                            break;

                        case 32:
                        case 75:
                            // Space and K key
                            if (!repeat) {
                                this.player.togglePlay();
                            }
                            break;

                        case 38:
                            // Arrow up
                            this.player.increaseVolume(0.1);
                            break;

                        case 40:
                            // Arrow down
                            this.player.decreaseVolume(0.1);
                            break;

                        case 77:
                            // M key
                            if (!repeat) {
                                this.player.muted = !this.player.muted;
                            }
                            break;

                        case 39:
                            // Arrow forward
                            this.player.forward();
                            break;

                        case 37:
                            // Arrow back
                            this.player.rewind();
                            break;

                        case 70:
                            // F key
                            this.player.fullscreen.toggle();
                            break;

                        case 67:
                            // C key
                            if (!repeat) {
                                this.player.toggleCaptions();
                            }
                            break;

                        case 76:
                            // L key
                            this.player.loop = !this.player.loop;
                            break;

                        /* case 73:
                            this.setLoop('start');
                            break;
                         case 76:
                            this.setLoop();
                            break;
                         case 79:
                            this.setLoop('end');
                            break; */

                        default:
                            break;
                    }

                    // Escape is handle natively when in full screen
                    // So we only need to worry about non native
                    if (!this.player.fullscreen.enabled && this.player.fullscreen.active && code === 27) {
                        this.player.fullscreen.toggle();
                    }

                    // Store last code for next cycle
                    this.lastKey = code;
                } else {
                    this.lastKey = null;
                }
            }

            // Toggle menu

        }, {
            key: 'toggleMenu',
            value: function toggleMenu(event) {
                controls.toggleMenu.call(this.player, event);
            }

            // Device is touch enabled

        }, {
            key: 'firstTouch',
            value: function firstTouch() {
                this.player.touch = true;

                // Add touch class
                toggleClass(this.player.elements.container, this.player.config.classNames.isTouch, true);
            }

            // Global window & document listeners

        }, {
            key: 'global',
            value: function global() {
                var toggle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                // Keyboard shortcuts
                if (this.player.config.keyboard.global) {
                    toggleListener.call(this.player, window, 'keydown keyup', this.handleKey, toggle, false);
                }

                // Click anywhere closes menu
                toggleListener.call(this.player, document.body, 'click', this.toggleMenu, toggle);

                // Detect touch by events
                once.call(this.player, document.body, 'touchstart', this.firstTouch);
            }

            // Container listeners

        }, {
            key: 'container',
            value: function container() {
                var _this2 = this;

                // Keyboard shortcuts
                if (!this.player.config.keyboard.global && this.player.config.keyboard.focused) {
                    on.call(this.player, this.player.elements.container, 'keydown keyup', this.handleKey, false);
                }

                // Detect tab focus
                // Remove class on blur/focusout
                on.call(this.player, this.player.elements.container, 'focusout', function (event) {
                    toggleClass(event.target, _this2.player.config.classNames.tabFocus, false);
                });
                // Add classname to tabbed elements
                on.call(this.player, this.player.elements.container, 'keydown', function (event) {
                    if (event.keyCode !== 9) {
                        return;
                    }

                    // Delay the adding of classname until the focus has changed
                    // This event fires before the focusin event
                    setTimeout(function () {
                        toggleClass(getFocusElement(), _this2.player.config.classNames.tabFocus, true);
                    }, 0);
                });

                // Toggle controls on mouse events and entering fullscreen
                on.call(this.player, this.player.elements.container, 'mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen', function (event) {
                    var controls$$1 = _this2.player.elements.controls;

                    // Remove button states for fullscreen

                    if (event.type === 'enterfullscreen') {
                        controls$$1.pressed = false;
                        controls$$1.hover = false;
                    }

                    // Show, then hide after a timeout unless another control event occurs
                    var show = ['touchstart', 'touchmove', 'mousemove'].includes(event.type);

                    var delay = 0;

                    if (show) {
                        ui.toggleControls.call(_this2.player, true);
                        // Use longer timeout for touch devices
                        delay = _this2.player.touch ? 3000 : 2000;
                    }

                    // Clear timer
                    clearTimeout(_this2.player.timers.controls);
                    // Timer to prevent flicker when seeking
                    _this2.player.timers.controls = setTimeout(function () {
                        return ui.toggleControls.call(_this2.player, false);
                    }, delay);
                });
            }

            // Listen for media events

        }, {
            key: 'media',
            value: function media() {
                var _this3 = this;

                // Time change on media
                on.call(this.player, this.player.media, 'timeupdate seeking seeked', function (event) {
                    return controls.timeUpdate.call(_this3.player, event);
                });

                // Display duration
                on.call(this.player, this.player.media, 'durationchange loadeddata loadedmetadata', function (event) {
                    return controls.durationUpdate.call(_this3.player, event);
                });

                // Check for audio tracks on load
                // We can't use `loadedmetadata` as it doesn't seem to have audio tracks at that point
                on.call(this.player, this.player.media, 'canplay', function () {
                    toggleHidden(_this3.player.elements.volume, !_this3.player.hasAudio);
                    toggleHidden(_this3.player.elements.buttons.mute, !_this3.player.hasAudio);
                });

                // Handle the media finishing
                on.call(this.player, this.player.media, 'ended', function () {
                    // Show poster on end
                    if (_this3.player.isHTML5 && _this3.player.isVideo && _this3.player.config.resetOnEnd) {
                        // Restart
                        _this3.player.restart();
                    }
                });

                // Check for buffer progress
                on.call(this.player, this.player.media, 'progress playing seeking seeked', function (event) {
                    return controls.updateProgress.call(_this3.player, event);
                });

                // Handle volume changes
                on.call(this.player, this.player.media, 'volumechange', function (event) {
                    return controls.updateVolume.call(_this3.player, event);
                });

                // Handle play/pause
                on.call(this.player, this.player.media, 'playing play pause ended emptied timeupdate', function (event) {
                    return ui.checkPlaying.call(_this3.player, event);
                });

                // Loading state
                on.call(this.player, this.player.media, 'waiting canplay seeked playing', function (event) {
                    return ui.checkLoading.call(_this3.player, event);
                });

                // If autoplay, then load advertisement if required
                // TODO: Show some sort of loading state while the ad manager loads else there's a delay before ad shows
                on.call(this.player, this.player.media, 'playing', function () {
                    if (!_this3.player.ads) {
                        return;
                    }

                    // If ads are enabled, wait for them first
                    if (_this3.player.ads.enabled && !_this3.player.ads.initialized) {
                        // Wait for manager response
                        _this3.player.ads.managerPromise.then(function () {
                            return _this3.player.ads.play();
                        }).catch(function () {
                            return _this3.player.play();
                        });
                    }
                });

                // Click video
                if (this.player.supported.ui && this.player.config.clickToPlay && !this.player.isAudio) {
                    // Re-fetch the wrapper
                    var wrapper = getElement.call(this.player, '.' + this.player.config.classNames.video);

                    // Bail if there's no wrapper (this should never happen)
                    if (!is.element(wrapper)) {
                        return;
                    }

                    // On click play, pause ore restart
                    on.call(this.player, wrapper, 'click', function () {
                        // Touch devices will just show controls (if we're hiding controls)
                        if (_this3.player.config.hideControls && _this3.player.touch && !_this3.player.paused) {
                            return;
                        }

                        if (_this3.player.paused) {
                            _this3.player.play();
                        } else if (_this3.player.ended) {
                            _this3.player.restart();
                            _this3.player.play();
                        } else {
                            _this3.player.pause();
                        }
                    });
                }

                // Disable right click
                if (this.player.supported.ui && this.player.config.disableContextMenu) {
                    on.call(this.player, this.player.elements.wrapper, 'contextmenu', function (event) {
                        event.preventDefault();
                    }, false);
                }

                // Volume change
                on.call(this.player, this.player.media, 'volumechange', function () {
                    // Save to storage
                    _this3.player.storage.set({ volume: _this3.player.volume, muted: _this3.player.muted });
                });

                // Speed change
                on.call(this.player, this.player.media, 'ratechange', function () {
                    // Update UI
                    controls.updateSetting.call(_this3.player, 'speed');

                    // Save to storage
                    _this3.player.storage.set({ speed: _this3.player.speed });
                });

                // Quality request
                on.call(this.player, this.player.media, 'qualityrequested', function (event) {
                    // Save to storage
                    _this3.player.storage.set({ quality: event.detail.quality });
                });

                // Quality change
                on.call(this.player, this.player.media, 'qualitychange', function (event) {
                    // Update UI
                    controls.updateSetting.call(_this3.player, 'quality', null, event.detail.quality);
                });

                // Proxy events to container
                // Bubble up key events for Edge
                var proxyEvents = this.player.config.events.concat(['keyup', 'keydown']).join(' ');
                on.call(this.player, this.player.media, proxyEvents, function (event) {
                    var _event$detail = event.detail,
                        detail = _event$detail === undefined ? {} : _event$detail;

                    // Get error details from media

                    if (event.type === 'error') {
                        detail = _this3.player.media.error;
                    }

                    triggerEvent.call(_this3.player, _this3.player.elements.container, event.type, true, detail);
                });
            }

            // Listen for control events

        }, {
            key: 'controls',
            value: function controls$$1() {
                var _this4 = this;

                // IE doesn't support input event, so we fallback to change
                var inputEvent = browser.isIE ? 'change' : 'input';

                // Run default and custom handlers
                var proxy = function proxy(event, defaultHandler, customHandlerKey) {
                    var customHandler = _this4.player.config.listeners[customHandlerKey];
                    var hasCustomHandler = is.function(customHandler);
                    var returned = true;

                    // Execute custom handler
                    if (hasCustomHandler) {
                        returned = customHandler.call(_this4.player, event);
                    }

                    // Only call default handler if not prevented in custom handler
                    if (returned && is.function(defaultHandler)) {
                        defaultHandler.call(_this4.player, event);
                    }
                };

                // Trigger custom and default handlers
                var bind = function bind(element, type, defaultHandler, customHandlerKey) {
                    var passive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

                    var customHandler = _this4.player.config.listeners[customHandlerKey];
                    var hasCustomHandler = is.function(customHandler);

                    on.call(_this4.player, element, type, function (event) {
                        return proxy(event, defaultHandler, customHandlerKey);
                    }, passive && !hasCustomHandler);
                };

                // Play/pause toggle
                if (this.player.elements.buttons.play) {
                    Array.from(this.player.elements.buttons.play).forEach(function (button) {
                        bind(button, 'click', _this4.player.togglePlay, 'play');
                    });
                }

                // Pause
                bind(this.player.elements.buttons.restart, 'click', this.player.restart, 'restart');

                // Rewind
                bind(this.player.elements.buttons.rewind, 'click', this.player.rewind, 'rewind');

                // Rewind
                bind(this.player.elements.buttons.fastForward, 'click', this.player.forward, 'fastForward');

                // Mute toggle
                bind(this.player.elements.buttons.mute, 'click', function () {
                    _this4.player.muted = !_this4.player.muted;
                }, 'mute');

                // Captions toggle
                bind(this.player.elements.buttons.captions, 'click', function () {
                    return _this4.player.toggleCaptions();
                });

                // Fullscreen toggle
                bind(this.player.elements.buttons.fullscreen, 'click', function () {
                    _this4.player.fullscreen.toggle();
                }, 'fullscreen');

                // Picture-in-Picture
                bind(this.player.elements.buttons.pip, 'click', function () {
                    _this4.player.pip = 'toggle';
                }, 'pip');

                // Airplay
                bind(this.player.elements.buttons.airplay, 'click', this.player.airplay, 'airplay');

                // Settings menu
                bind(this.player.elements.buttons.settings, 'click', function (event) {
                    controls.toggleMenu.call(_this4.player, event);
                });

                // Settings menu
                bind(this.player.elements.settings.form, 'click', function (event) {
                    event.stopPropagation();

                    // Go back to home tab on click
                    var showHomeTab = function showHomeTab() {
                        var id = 'plyr-settings-' + _this4.player.id + '-home';
                        controls.showTab.call(_this4.player, id);
                    };

                    // Settings menu items - use event delegation as items are added/removed
                    if (matches(event.target, _this4.player.config.selectors.inputs.language)) {
                        proxy(event, function () {
                            _this4.player.currentTrack = Number(event.target.value);
                            showHomeTab();
                        }, 'language');
                    } else if (matches(event.target, _this4.player.config.selectors.inputs.quality)) {
                        proxy(event, function () {
                            _this4.player.quality = event.target.value;
                            showHomeTab();
                        }, 'quality');
                    } else if (matches(event.target, _this4.player.config.selectors.inputs.speed)) {
                        proxy(event, function () {
                            _this4.player.speed = parseFloat(event.target.value);
                            showHomeTab();
                        }, 'speed');
                    } else {
                        var tab = event.target;
                        controls.showTab.call(_this4.player, tab.getAttribute('aria-controls'));
                    }
                });

                // Set range input alternative "value", which matches the tooltip time (#954)
                bind(this.player.elements.inputs.seek, 'mousedown mousemove', function (event) {
                    var clientRect = _this4.player.elements.progress.getBoundingClientRect();
                    var percent = 100 / clientRect.width * (event.pageX - clientRect.left);
                    event.currentTarget.setAttribute('seek-value', percent);
                });

                // Pause while seeking
                bind(this.player.elements.inputs.seek, 'mousedown mouseup keydown keyup touchstart touchend', function (event) {
                    var seek = event.currentTarget;

                    var code = event.keyCode ? event.keyCode : event.which;
                    var eventType = event.type;

                    if ((eventType === 'keydown' || eventType === 'keyup') && code !== 39 && code !== 37) {
                        return;
                    }
                    // Was playing before?
                    var play = seek.hasAttribute('play-on-seeked');

                    // Done seeking
                    var done = ['mouseup', 'touchend', 'keyup'].includes(event.type);

                    // If we're done seeking and it was playing, resume playback
                    if (play && done) {
                        seek.removeAttribute('play-on-seeked');
                        _this4.player.play();
                    } else if (!done && _this4.player.playing) {
                        seek.setAttribute('play-on-seeked', '');
                        _this4.player.pause();
                    }
                });

                // Seek
                bind(this.player.elements.inputs.seek, inputEvent, function (event) {
                    var seek = event.currentTarget;

                    // If it exists, use seek-value instead of "value" for consistency with tooltip time (#954)
                    var seekTo = seek.getAttribute('seek-value');

                    if (is.empty(seekTo)) {
                        seekTo = seek.value;
                    }

                    seek.removeAttribute('seek-value');

                    _this4.player.currentTime = seekTo / seek.max * _this4.player.duration;
                }, 'seek');

                // Current time invert
                // Only if one time element is used for both currentTime and duration
                if (this.player.config.toggleInvert && !is.element(this.player.elements.display.duration)) {
                    bind(this.player.elements.display.currentTime, 'click', function () {
                        // Do nothing if we're at the start
                        if (_this4.player.currentTime === 0) {
                            return;
                        }

                        _this4.player.config.invertTime = !_this4.player.config.invertTime;

                        controls.timeUpdate.call(_this4.player);
                    });
                }

                // Volume
                bind(this.player.elements.inputs.volume, inputEvent, function (event) {
                    _this4.player.volume = event.target.value;
                }, 'volume');

                // Polyfill for lower fill in <input type="range"> for webkit
                if (browser.isWebkit) {
                    Array.from(getElements.call(this.player, 'input[type="range"]')).forEach(function (element) {
                        bind(element, 'input', function (event) {
                            return controls.updateRangeFill.call(_this4.player, event.target);
                        });
                    });
                }

                // Seek tooltip
                bind(this.player.elements.progress, 'mouseenter mouseleave mousemove', function (event) {
                    return controls.updateSeekTooltip.call(_this4.player, event);
                });

                // Update controls.hover state (used for ui.toggleControls to avoid hiding when interacting)
                bind(this.player.elements.controls, 'mouseenter mouseleave', function (event) {
                    _this4.player.elements.controls.hover = !_this4.player.touch && event.type === 'mouseenter';
                });

                // Update controls.pressed state (used for ui.toggleControls to avoid hiding when interacting)
                bind(this.player.elements.controls, 'mousedown mouseup touchstart touchend touchcancel', function (event) {
                    _this4.player.elements.controls.pressed = ['mousedown', 'touchstart'].includes(event.type);
                });

                // Focus in/out on controls
                bind(this.player.elements.controls, 'focusin focusout', function (event) {
                    var _player = _this4.player,
                        config = _player.config,
                        elements = _player.elements,
                        timers = _player.timers;

                    // Skip transition to prevent focus from scrolling the parent element

                    toggleClass(elements.controls, config.classNames.noTransition, event.type === 'focusin');

                    // Toggle
                    ui.toggleControls.call(_this4.player, event.type === 'focusin');

                    // If focusin, hide again after delay
                    if (event.type === 'focusin') {
                        // Restore transition
                        setTimeout(function () {
                            toggleClass(elements.controls, config.classNames.noTransition, false);
                        }, 0);

                        // Delay a little more for keyboard users
                        var delay = _this4.touch ? 3000 : 4000;

                        // Clear timer
                        clearTimeout(timers.controls);
                        // Hide
                        timers.controls = setTimeout(function () {
                            return ui.toggleControls.call(_this4.player, false);
                        }, delay);
                    }
                });

                // Mouse wheel for volume
                bind(this.player.elements.inputs.volume, 'wheel', function (event) {
                    // Detect "natural" scroll - suppored on OS X Safari only
                    // Other browsers on OS X will be inverted until support improves
                    var inverted = event.webkitDirectionInvertedFromDevice;

                    // Get delta from event. Invert if `inverted` is true

                    var _map = [event.deltaX, -event.deltaY].map(function (value) {
                        return inverted ? -value : value;
                    }),
                        _map2 = slicedToArray(_map, 2),
                        x = _map2[0],
                        y = _map2[1];

                    // Using the biggest delta, normalize to 1 or -1 (or 0 if no delta)


                    var direction = Math.sign(Math.abs(x) > Math.abs(y) ? x : y);

                    // Change the volume by 2%
                    _this4.player.increaseVolume(direction / 50);

                    // Don't break page scrolling at max and min
                    var volume = _this4.player.media.volume;

                    if (direction === 1 && volume < 1 || direction === -1 && volume > 0) {
                        event.preventDefault();
                    }
                }, 'volume', false);
            }
        }]);
        return Listeners;
    }();

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
        return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var loadjs_umd = createCommonjsModule(function (module, exports) {
        (function (root, factory) {
            if (typeof undefined === 'function' && undefined.amd) {
                undefined([], factory);
            } else {
                module.exports = factory();
            }
        }(commonjsGlobal, function () {
            /**
             * Global dependencies.
             * @global {Object} document - DOM
             */

            var devnull = function () { },
                bundleIdCache = {},
                bundleResultCache = {},
                bundleCallbackQueue = {};


            /**
             * Subscribe to bundle load event.
             * @param {string[]} bundleIds - Bundle ids
             * @param {Function} callbackFn - The callback function
             */
            function subscribe(bundleIds, callbackFn) {
                // listify
                bundleIds = bundleIds.push ? bundleIds : [bundleIds];

                var depsNotFound = [],
                    i = bundleIds.length,
                    numWaiting = i,
                    fn,
                    bundleId,
                    r,
                    q;

                // define callback function
                fn = function (bundleId, pathsNotFound) {
                    if (pathsNotFound.length) depsNotFound.push(bundleId);

                    numWaiting--;
                    if (!numWaiting) callbackFn(depsNotFound);
                };

                // register callback
                while (i--) {
                    bundleId = bundleIds[i];

                    // execute callback if in result cache
                    r = bundleResultCache[bundleId];
                    if (r) {
                        fn(bundleId, r);
                        continue;
                    }

                    // add to callback queue
                    q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
                    q.push(fn);
                }
            }


            /**
             * Publish bundle load event.
             * @param {string} bundleId - Bundle id
             * @param {string[]} pathsNotFound - List of files not found
             */
            function publish(bundleId, pathsNotFound) {
                // exit if id isn't defined
                if (!bundleId) return;

                var q = bundleCallbackQueue[bundleId];

                // cache result
                bundleResultCache[bundleId] = pathsNotFound;

                // exit if queue is empty
                if (!q) return;

                // empty callback queue
                while (q.length) {
                    q[0](bundleId, pathsNotFound);
                    q.splice(0, 1);
                }
            }


            /**
             * Execute callbacks.
             * @param {Object or Function} args - The callback args
             * @param {string[]} depsNotFound - List of dependencies not found
             */
            function executeCallbacks(args, depsNotFound) {
                // accept function as argument
                if (args.call) args = { success: args };

                // success and error callbacks
                if (depsNotFound.length) (args.error || devnull)(depsNotFound);
                else (args.success || devnull)(args);
            }


            /**
             * Load individual file.
             * @param {string} path - The file path
             * @param {Function} callbackFn - The callback function
             */
            function loadFile(path, callbackFn, args, numTries) {
                var doc = document,
                    async = args.async,
                    maxTries = (args.numRetries || 0) + 1,
                    beforeCallbackFn = args.before || devnull,
                    pathStripped = path.replace(/^(css|img)!/, ''),
                    isCss,
                    e;

                numTries = numTries || 0;

                if (/(^css!|\.css$)/.test(path)) {
                    isCss = true;

                    // css
                    e = doc.createElement('link');
                    e.rel = 'stylesheet';
                    e.href = pathStripped; //.replace(/^css!/, '');  // remove "css!" prefix
                } else if (/(^img!|\.(png|gif|jpg|svg)$)/.test(path)) {
                    // image
                    e = doc.createElement('img');
                    e.src = pathStripped;
                } else {
                    // javascript
                    e = doc.createElement('script');
                    e.src = path;
                    e.async = async === undefined ? true : async;
                }

                e.onload = e.onerror = e.onbeforeload = function (ev) {
                    var result = ev.type[0];

                    // Note: The following code isolates IE using `hideFocus` and treats empty
                    // stylesheets as failures to get around lack of onerror support
                    if (isCss && 'hideFocus' in e) {
                        try {
                            if (!e.sheet.cssText.length) result = 'e';
                        } catch (x) {
                            // sheets objects created from load errors don't allow access to
                            // `cssText`
                            result = 'e';
                        }
                    }

                    // handle retries in case of load failure
                    if (result == 'e') {
                        // increment counter
                        numTries += 1;

                        // exit function and try again
                        if (numTries < maxTries) {
                            return loadFile(path, callbackFn, args, numTries);
                        }
                    }

                    // execute callback
                    callbackFn(path, result, ev.defaultPrevented);
                };

                // add to document (unless callback returns `false`)
                if (beforeCallbackFn(path, e) !== false) doc.head.appendChild(e);
            }


            /**
             * Load multiple files.
             * @param {string[]} paths - The file paths
             * @param {Function} callbackFn - The callback function
             */
            function loadFiles(paths, callbackFn, args) {
                // listify paths
                paths = paths.push ? paths : [paths];

                var numWaiting = paths.length,
                    x = numWaiting,
                    pathsNotFound = [],
                    fn,
                    i;

                // define callback function
                fn = function (path, result, defaultPrevented) {
                    // handle error
                    if (result == 'e') pathsNotFound.push(path);

                    // handle beforeload event. If defaultPrevented then that means the load
                    // will be blocked (ex. Ghostery/ABP on Safari)
                    if (result == 'b') {
                        if (defaultPrevented) pathsNotFound.push(path);
                        else return;
                    }

                    numWaiting--;
                    if (!numWaiting) callbackFn(pathsNotFound);
                };

                // load scripts
                for (i = 0; i < x; i++) loadFile(paths[i], fn, args);
            }


            /**
             * Initiate script load and register bundle.
             * @param {(string|string[])} paths - The file paths
             * @param {(string|Function)} [arg1] - The bundleId or success callback
             * @param {Function} [arg2] - The success or error callback
             * @param {Function} [arg3] - The error callback
             */
            function loadjs(paths, arg1, arg2) {
                var bundleId,
                    args;

                // bundleId (if string)
                if (arg1 && arg1.trim) bundleId = arg1;

                // args (default is {})
                args = (bundleId ? arg2 : arg1) || {};

                // throw error if bundle is already defined
                if (bundleId) {
                    if (bundleId in bundleIdCache) {
                        throw "LoadJS";
                    } else {
                        bundleIdCache[bundleId] = true;
                    }
                }

                // load scripts
                loadFiles(paths, function (pathsNotFound) {
                    // execute callbacks
                    executeCallbacks(args, pathsNotFound);

                    // publish bundle load event
                    publish(bundleId, pathsNotFound);
                }, args);
            }


            /**
             * Execute callbacks when dependencies have been satisfied.
             * @param {(string|string[])} deps - List of bundle ids
             * @param {Object} args - success/error arguments
             */
            loadjs.ready = function ready(deps, args) {
                // subscribe to bundle load event
                subscribe(deps, function (depsNotFound) {
                    // execute callbacks
                    executeCallbacks(args, depsNotFound);
                });

                return loadjs;
            };


            /**
             * Manually satisfy bundle dependencies.
             * @param {string} bundleId - The bundle id
             */
            loadjs.done = function done(bundleId) {
                publish(bundleId, []);
            };


            /**
             * Reset loadjs dependencies statuses
             */
            loadjs.reset = function reset() {
                bundleIdCache = {};
                bundleResultCache = {};
                bundleCallbackQueue = {};
            };


            /**
             * Determine if bundle has already been defined
             * @param String} bundleId - The bundle id
             */
            loadjs.isDefined = function isDefined(bundleId) {
                return bundleId in bundleIdCache;
            };


            // export
            return loadjs;

        }));
    });

    // ==========================================================================

    function loadScript(url) {
        return new Promise(function (resolve, reject) {
            loadjs_umd(url, {
                success: resolve,
                error: reject
            });
        });
    }

    // ==========================================================================

    // Parse Vimeo ID from URL
    function parseId(url) {
        if (is.empty(url)) {
            return null;
        }

        if (is.number(Number(url))) {
            return url;
        }

        var regex = /^.*(vimeo.com\/|video\/)(\d+).*/;
        return url.match(regex) ? RegExp.$2 : url;
    }

    // Get aspect ratio for dimensions
    function getAspectRatio(width, height) {
        var getRatio = function getRatio(w, h) {
            return h === 0 ? w : getRatio(h, w % h);
        };
        var ratio = getRatio(width, height);
        return width / ratio + ':' + height / ratio;
    }

    // Set playback state and trigger change (only on actual change)
    function assurePlaybackState(play) {
        if (play && !this.embed.hasPlayed) {
            this.embed.hasPlayed = true;
        }
        if (this.media.paused === play) {
            this.media.paused = !play;
            triggerEvent.call(this, this.media, play ? 'play' : 'pause');
        }
    }

    var vimeo = {
        setup: function setup() {
            var _this = this;

            // Add embed class for responsive
            toggleClass(this.elements.wrapper, this.config.classNames.embed, true);

            // Set intial ratio
            vimeo.setAspectRatio.call(this);

            // Load the API if not already
            if (!is.object(window.Vimeo)) {
                loadScript(this.config.urls.vimeo.sdk).then(function () {
                    vimeo.ready.call(_this);
                }).catch(function (error) {
                    _this.debug.warn('Vimeo API failed to load', error);
                });
            } else {
                vimeo.ready.call(this);
            }
        },


        // Set aspect ratio
        // For Vimeo we have an extra 300% height <div> to hide the standard controls and UI
        setAspectRatio: function setAspectRatio(input) {
            var _split = (is.string(input) ? input : this.config.ratio).split(':'),
                _split2 = slicedToArray(_split, 2),
                x = _split2[0],
                y = _split2[1];

            var padding = 100 / x * y;
            this.elements.wrapper.style.paddingBottom = padding + '%';

            if (this.supported.ui) {
                var height = 240;
                var offset = (height - padding) / (height / 50);

                this.media.style.transform = 'translateY(-' + offset + '%)';
            }
        },


        // API Ready
        ready: function ready$$1() {
            var _this2 = this;

            var player = this;

            // Get Vimeo params for the iframe
            var options = {
                loop: player.config.loop.active,
                autoplay: player.autoplay,
                // muted: player.muted,
                byline: false,
                portrait: false,
                title: false,
                speed: true,
                transparent: 0,
                gesture: 'media',
                playsinline: !this.config.fullscreen.iosNative
            };
            var params = buildUrlParams(options);

            // Get the source URL or ID
            var source = player.media.getAttribute('src');

            // Get from <div> if needed
            if (is.empty(source)) {
                source = player.media.getAttribute(player.config.attributes.embed.id);
            }

            var id = parseId(source);

            // Build an iframe
            var iframe = createElement('iframe');
            var src = format(player.config.urls.vimeo.iframe, id, params);
            iframe.setAttribute('src', src);
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('allowtransparency', '');
            iframe.setAttribute('allow', 'autoplay');

            // Get poster, if already set
            var poster = player.poster;

            // Inject the package

            var wrapper = createElement('div', { poster: poster, class: player.config.classNames.embedContainer });
            wrapper.appendChild(iframe);
            player.media = replaceElement(wrapper, player.media);

            // Get poster image
            fetch(format(player.config.urls.vimeo.api, id), 'json').then(function (response) {
                if (is.empty(response)) {
                    return;
                }

                // Get the URL for thumbnail
                var url = new URL(response[0].thumbnail_large);

                // Get original image
                url.pathname = url.pathname.split('_')[0] + '.jpg';

                // Set and show poster
                ui.setPoster.call(player, url.href).catch(function () { });
            });

            // Setup instance
            // https://github.com/vimeo/player.js
            player.embed = new window.Vimeo.Player(iframe, {
                autopause: player.config.autopause,
                muted: player.muted
            });

            player.media.paused = true;
            player.media.currentTime = 0;

            // Disable native text track rendering
            if (player.supported.ui) {
                player.embed.disableTextTrack();
            }

            // Create a faux HTML5 API using the Vimeo API
            player.media.play = function () {
                assurePlaybackState.call(player, true);
                return player.embed.play();
            };

            player.media.pause = function () {
                assurePlaybackState.call(player, false);
                return player.embed.pause();
            };

            player.media.stop = function () {
                player.pause();
                player.currentTime = 0;
            };

            // Seeking
            var currentTime = player.media.currentTime;

            Object.defineProperty(player.media, 'currentTime', {
                get: function get$$1() {
                    return currentTime;
                },
                set: function set$$1(time) {
                    // Vimeo will automatically play on seek if the video hasn't been played before

                    // Get current paused state and volume etc
                    var embed = player.embed,
                        media = player.media,
                        paused = player.paused,
                        volume = player.volume;

                    var restorePause = paused && !embed.hasPlayed;

                    // Set seeking state and trigger event
                    media.seeking = true;
                    triggerEvent.call(player, media, 'seeking');

                    // If paused, mute until seek is complete
                    Promise.resolve(restorePause && embed.setVolume(0))
                        // Seek
                        .then(function () {
                            return embed.setCurrentTime(time);
                        })
                        // Restore paused
                        .then(function () {
                            return restorePause && embed.pause();
                        })
                        // Restore volume
                        .then(function () {
                            return restorePause && embed.setVolume(volume);
                        }).catch(function () {
                            // Do nothing
                        });
                }
            });

            // Playback speed
            var speed = player.config.speed.selected;
            Object.defineProperty(player.media, 'playbackRate', {
                get: function get$$1() {
                    return speed;
                },
                set: function set$$1(input) {
                    player.embed.setPlaybackRate(input).then(function () {
                        speed = input;
                        triggerEvent.call(player, player.media, 'ratechange');
                    }).catch(function (error) {
                        // Hide menu item (and menu if empty)
                        if (error.name === 'Error') {
                            controls.setSpeedMenu.call(player, []);
                        }
                    });
                }
            });

            // Volume
            var volume = player.config.volume;

            Object.defineProperty(player.media, 'volume', {
                get: function get$$1() {
                    return volume;
                },
                set: function set$$1(input) {
                    player.embed.setVolume(input).then(function () {
                        volume = input;
                        triggerEvent.call(player, player.media, 'volumechange');
                    });
                }
            });

            // Muted
            var muted = player.config.muted;

            Object.defineProperty(player.media, 'muted', {
                get: function get$$1() {
                    return muted;
                },
                set: function set$$1(input) {
                    var toggle = is.boolean(input) ? input : false;

                    player.embed.setVolume(toggle ? 0 : player.config.volume).then(function () {
                        muted = toggle;
                        triggerEvent.call(player, player.media, 'volumechange');
                    });
                }
            });

            // Loop
            var loop = player.config.loop;

            Object.defineProperty(player.media, 'loop', {
                get: function get$$1() {
                    return loop;
                },
                set: function set$$1(input) {
                    var toggle = is.boolean(input) ? input : player.config.loop.active;

                    player.embed.setLoop(toggle).then(function () {
                        loop = toggle;
                    });
                }
            });

            // Source
            var currentSrc = void 0;
            player.embed.getVideoUrl().then(function (value) {
                currentSrc = value;
            }).catch(function (error) {
                _this2.debug.warn(error);
            });

            Object.defineProperty(player.media, 'currentSrc', {
                get: function get$$1() {
                    return currentSrc;
                }
            });

            // Ended
            Object.defineProperty(player.media, 'ended', {
                get: function get$$1() {
                    return player.currentTime === player.duration;
                }
            });

            // Set aspect ratio based on video size
            Promise.all([player.embed.getVideoWidth(), player.embed.getVideoHeight()]).then(function (dimensions) {
                var ratio = getAspectRatio(dimensions[0], dimensions[1]);
                vimeo.setAspectRatio.call(_this2, ratio);
            });

            // Set autopause
            player.embed.setAutopause(player.config.autopause).then(function (state) {
                player.config.autopause = state;
            });

            // Get title
            player.embed.getVideoTitle().then(function (title) {
                player.config.title = title;
                ui.setTitle.call(_this2);
            });

            // Get current time
            player.embed.getCurrentTime().then(function (value) {
                currentTime = value;
                triggerEvent.call(player, player.media, 'timeupdate');
            });

            // Get duration
            player.embed.getDuration().then(function (value) {
                player.media.duration = value;
                triggerEvent.call(player, player.media, 'durationchange');
            });

            // Get captions
            player.embed.getTextTracks().then(function (tracks) {
                player.media.textTracks = tracks;
                captions.setup.call(player);
            });

            player.embed.on('cuechange', function (_ref) {
                var _ref$cues = _ref.cues,
                    cues = _ref$cues === undefined ? [] : _ref$cues;

                var strippedCues = cues.map(function (cue) {
                    return stripHTML(cue.text);
                });
                captions.updateCues.call(player, strippedCues);
            });

            player.embed.on('loaded', function () {
                // Assure state and events are updated on autoplay
                player.embed.getPaused().then(function (paused) {
                    assurePlaybackState.call(player, !paused);
                    if (!paused) {
                        triggerEvent.call(player, player.media, 'playing');
                    }
                });

                if (is.element(player.embed.element) && player.supported.ui) {
                    var frame = player.embed.element;

                    // Fix keyboard focus issues
                    // https://github.com/sampotts/plyr/issues/317
                    frame.setAttribute('tabindex', -1);
                }
            });

            player.embed.on('play', function () {
                assurePlaybackState.call(player, true);
                triggerEvent.call(player, player.media, 'playing');
            });

            player.embed.on('pause', function () {
                assurePlaybackState.call(player, false);
            });

            player.embed.on('timeupdate', function (data) {
                player.media.seeking = false;
                currentTime = data.seconds;
                triggerEvent.call(player, player.media, 'timeupdate');
            });

            player.embed.on('progress', function (data) {
                player.media.buffered = data.percent;
                triggerEvent.call(player, player.media, 'progress');

                // Check all loaded
                if (parseInt(data.percent, 10) === 1) {
                    triggerEvent.call(player, player.media, 'canplaythrough');
                }

                // Get duration as if we do it before load, it gives an incorrect value
                // https://github.com/sampotts/plyr/issues/891
                player.embed.getDuration().then(function (value) {
                    if (value !== player.media.duration) {
                        player.media.duration = value;
                        triggerEvent.call(player, player.media, 'durationchange');
                    }
                });
            });

            player.embed.on('seeked', function () {
                player.media.seeking = false;
                triggerEvent.call(player, player.media, 'seeked');
            });

            player.embed.on('ended', function () {
                player.media.paused = true;
                triggerEvent.call(player, player.media, 'ended');
            });

            player.embed.on('error', function (detail) {
                player.media.error = detail;
                triggerEvent.call(player, player.media, 'error');
            });

            // Rebuild UI
            setTimeout(function () {
                return ui.build.call(player);
            }, 0);
        }
    };

    // ==========================================================================

    // Parse YouTube ID from URL
    function parseId$1(url) {
        if (is.empty(url)) {
            return null;
        }

        var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        return url.match(regex) ? RegExp.$2 : url;
    }

    // Standardise YouTube quality unit
    function mapQualityUnit(input) {
        var qualities = {
            hd2160: 2160,
            hd1440: 1440,
            hd1080: 1080,
            hd720: 720,
            large: 480,
            medium: 360,
            small: 240,
            tiny: 144
        };

        var entry = Object.entries(qualities).find(function (entry) {
            return entry.includes(input);
        });

        if (entry) {
            // Get the match corresponding to the input
            return entry.find(function (value) {
                return value !== input;
            });
        }

        return 'default';
    }

    function mapQualityUnits(levels) {
        if (is.empty(levels)) {
            return levels;
        }

        return dedupe(levels.map(function (level) {
            return mapQualityUnit(level);
        }));
    }

    // Set playback state and trigger change (only on actual change)
    function assurePlaybackState$1(play) {
        if (play && !this.embed.hasPlayed) {
            this.embed.hasPlayed = true;
        }
        if (this.media.paused === play) {
            this.media.paused = !play;
            triggerEvent.call(this, this.media, play ? 'play' : 'pause');
        }
    }

    var youtube = {
        setup: function setup() {
            var _this = this;

            // Add embed class for responsive
            toggleClass(this.elements.wrapper, this.config.classNames.embed, true);

            // Set aspect ratio
            youtube.setAspectRatio.call(this);

            // Setup API
            if (is.object(window.YT) && is.function(window.YT.Player)) {
                youtube.ready.call(this);
            } else {
                // Load the API
                loadScript(this.config.urls.youtube.sdk).catch(function (error) {
                    _this.debug.warn('YouTube API failed to load', error);
                });

                // Setup callback for the API
                // YouTube has it's own system of course...
                window.onYouTubeReadyCallbacks = window.onYouTubeReadyCallbacks || [];

                // Add to queue
                window.onYouTubeReadyCallbacks.push(function () {
                    youtube.ready.call(_this);
                });

                // Set callback to process queue
                window.onYouTubeIframeAPIReady = function () {
                    window.onYouTubeReadyCallbacks.forEach(function (callback) {
                        callback();
                    });
                };
            }
        },


        // Get the media title
        getTitle: function getTitle(videoId) {
            var _this2 = this;

            // Try via undocumented API method first
            // This method disappears now and then though...
            // https://github.com/sampotts/plyr/issues/709
            if (is.function(this.embed.getVideoData)) {
                var _embed$getVideoData = this.embed.getVideoData(),
                    title = _embed$getVideoData.title;

                if (is.empty(title)) {
                    this.config.title = title;
                    ui.setTitle.call(this);
                    return;
                }
            }

            // Or via Google API
            var key = this.config.keys.google;
            if (is.string(key) && !is.empty(key)) {
                var url = format(this.config.urls.youtube.api, videoId, key);

                fetch(url).then(function (result) {
                    if (is.object(result)) {
                        _this2.config.title = result.items[0].snippet.title;
                        ui.setTitle.call(_this2);
                    }
                }).catch(function () { });
            }
        },


        // Set aspect ratio
        setAspectRatio: function setAspectRatio() {
            var ratio = this.config.ratio.split(':');
            this.elements.wrapper.style.paddingBottom = 100 / ratio[0] * ratio[1] + '%';
        },


        // API ready
        ready: function ready$$1() {
            var player = this;

            // Ignore already setup (race condition)
            var currentId = player.media.getAttribute('id');
            if (!is.empty(currentId) && currentId.startsWith('youtube-')) {
                return;
            }

            // Get the source URL or ID
            var source = player.media.getAttribute('src');

            // Get from <div> if needed
            if (is.empty(source)) {
                source = player.media.getAttribute(this.config.attributes.embed.id);
            }

            // Replace the <iframe> with a <div> due to YouTube API issues
            var videoId = parseId$1(source);
            var id = generateId(player.provider);

            // Get poster, if already set
            var poster = player.poster;

            // Replace media element

            var container = createElement('div', { id: id, poster: poster });
            player.media = replaceElement(container, player.media);

            // Id to poster wrapper
            var posterSrc = function posterSrc(format$$1) {
                return 'https://img.youtube.com/vi/' + videoId + '/' + format$$1 + 'default.jpg';
            };

            // Check thumbnail images in order of quality, but reject fallback thumbnails (120px wide)
            loadImage(posterSrc('maxres'), 121) // Higest quality and unpadded
                .catch(function () {
                    return loadImage(posterSrc('sd'), 121);
                }) // 480p padded 4:3
                .catch(function () {
                    return loadImage(posterSrc('hq'));
                }) // 360p padded 4:3. Always exists
                .then(function (image) {
                    return ui.setPoster.call(player, image.src);
                }).then(function (posterSrc) {
                    // If the image is padded, use background-size "cover" instead (like youtube does too with their posters)
                    if (!posterSrc.includes('maxres')) {
                        player.elements.poster.style.backgroundSize = 'cover';
                    }
                }).catch(function () { });

            // Setup instance
            // https://developers.google.com/youtube/iframe_api_reference
            player.embed = new window.YT.Player(id, {
                videoId: videoId,
                playerVars: {
                    autoplay: player.config.autoplay ? 1 : 0, // Autoplay
                    controls: player.supported.ui ? 0 : 1, // Only show controls if not fully supported
                    rel: 0, // No related vids
                    showinfo: 0, // Hide info
                    iv_load_policy: 3, // Hide annotations
                    modestbranding: 1, // Hide logos as much as possible (they still show one in the corner when paused)
                    disablekb: 1, // Disable keyboard as we handle it
                    playsinline: 1, // Allow iOS inline playback

                    // Tracking for stats
                    // origin: window ? `${window.location.protocol}//${window.location.host}` : null,
                    widget_referrer: window ? window.location.href : null,

                    // Captions are flaky on YouTube
                    cc_load_policy: player.captions.active ? 1 : 0,
                    cc_lang_pref: player.config.captions.language
                },
                events: {
                    onError: function onError(event) {
                        // YouTube may fire onError twice, so only handle it once
                        if (!player.media.error) {
                            var code = event.data;
                            // Messages copied from https://developers.google.com/youtube/iframe_api_reference#onError
                            var message = {
                                2: 'The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.',
                                5: 'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.',
                                100: 'The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.',
                                101: 'The owner of the requested video does not allow it to be played in embedded players.',
                                150: 'The owner of the requested video does not allow it to be played in embedded players.'
                            }[code] || 'An unknown error occured';

                            player.media.error = { code: code, message: message };

                            triggerEvent.call(player, player.media, 'error');
                        }
                    },
                    onPlaybackQualityChange: function onPlaybackQualityChange() {
                        triggerEvent.call(player, player.media, 'qualitychange', false, {
                            quality: player.media.quality
                        });
                    },
                    onPlaybackRateChange: function onPlaybackRateChange(event) {
                        // Get the instance
                        var instance = event.target;

                        // Get current speed
                        player.media.playbackRate = instance.getPlaybackRate();

                        triggerEvent.call(player, player.media, 'ratechange');
                    },
                    onReady: function onReady(event) {
                        // Get the instance
                        var instance = event.target;

                        // Get the title
                        youtube.getTitle.call(player, videoId);

                        // Create a faux HTML5 API using the YouTube API
                        player.media.play = function () {
                            assurePlaybackState$1.call(player, true);
                            instance.playVideo();
                        };

                        player.media.pause = function () {
                            assurePlaybackState$1.call(player, false);
                            instance.pauseVideo();
                        };

                        player.media.stop = function () {
                            instance.stopVideo();
                        };

                        player.media.duration = instance.getDuration();
                        player.media.paused = true;

                        // Seeking
                        player.media.currentTime = 0;
                        Object.defineProperty(player.media, 'currentTime', {
                            get: function get() {
                                return Number(instance.getCurrentTime());
                            },
                            set: function set(time) {
                                // If paused and never played, mute audio preventively (YouTube starts playing on seek if the video hasn't been played yet).
                                if (player.paused && !player.embed.hasPlayed) {
                                    player.embed.mute();
                                }

                                // Set seeking state and trigger event
                                player.media.seeking = true;
                                triggerEvent.call(player, player.media, 'seeking');

                                // Seek after events sent
                                instance.seekTo(time);
                            }
                        });

                        // Playback speed
                        Object.defineProperty(player.media, 'playbackRate', {
                            get: function get() {
                                return instance.getPlaybackRate();
                            },
                            set: function set(input) {
                                instance.setPlaybackRate(input);
                            }
                        });

                        // Quality
                        Object.defineProperty(player.media, 'quality', {
                            get: function get() {
                                return mapQualityUnit(instance.getPlaybackQuality());
                            },
                            set: function set(input) {
                                instance.setPlaybackQuality(mapQualityUnit(input));
                            }
                        });

                        // Volume
                        var volume = player.config.volume;

                        Object.defineProperty(player.media, 'volume', {
                            get: function get() {
                                return volume;
                            },
                            set: function set(input) {
                                volume = input;
                                instance.setVolume(volume * 100);
                                triggerEvent.call(player, player.media, 'volumechange');
                            }
                        });

                        // Muted
                        var muted = player.config.muted;

                        Object.defineProperty(player.media, 'muted', {
                            get: function get() {
                                return muted;
                            },
                            set: function set(input) {
                                var toggle = is.boolean(input) ? input : muted;
                                muted = toggle;
                                instance[toggle ? 'mute' : 'unMute']();
                                triggerEvent.call(player, player.media, 'volumechange');
                            }
                        });

                        // Source
                        Object.defineProperty(player.media, 'currentSrc', {
                            get: function get() {
                                return instance.getVideoUrl();
                            }
                        });

                        // Ended
                        Object.defineProperty(player.media, 'ended', {
                            get: function get() {
                                return player.currentTime === player.duration;
                            }
                        });

                        // Get available speeds
                        player.options.speed = instance.getAvailablePlaybackRates();

                        // Set the tabindex to avoid focus entering iframe
                        if (player.supported.ui) {
                            player.media.setAttribute('tabindex', -1);
                        }

                        triggerEvent.call(player, player.media, 'timeupdate');
                        triggerEvent.call(player, player.media, 'durationchange');

                        // Reset timer
                        clearInterval(player.timers.buffering);

                        // Setup buffering
                        player.timers.buffering = setInterval(function () {
                            // Get loaded % from YouTube
                            player.media.buffered = instance.getVideoLoadedFraction();

                            // Trigger progress only when we actually buffer something
                            if (player.media.lastBuffered === null || player.media.lastBuffered < player.media.buffered) {
                                triggerEvent.call(player, player.media, 'progress');
                            }

                            // Set last buffer point
                            player.media.lastBuffered = player.media.buffered;

                            // Bail if we're at 100%
                            if (player.media.buffered === 1) {
                                clearInterval(player.timers.buffering);

                                // Trigger event
                                triggerEvent.call(player, player.media, 'canplaythrough');
                            }
                        }, 200);

                        // Rebuild UI
                        setTimeout(function () {
                            return ui.build.call(player);
                        }, 50);
                    },
                    onStateChange: function onStateChange(event) {
                        // Get the instance
                        var instance = event.target;

                        // Reset timer
                        clearInterval(player.timers.playing);

                        var seeked = player.media.seeking && [1, 2].includes(event.data);

                        if (seeked) {
                            // Unset seeking and fire seeked event
                            player.media.seeking = false;
                            triggerEvent.call(player, player.media, 'seeked');
                        }

                        // Handle events
                        // -1   Unstarted
                        // 0    Ended
                        // 1    Playing
                        // 2    Paused
                        // 3    Buffering
                        // 5    Video cued
                        switch (event.data) {
                            case -1:
                                // Update scrubber
                                triggerEvent.call(player, player.media, 'timeupdate');

                                // Get loaded % from YouTube
                                player.media.buffered = instance.getVideoLoadedFraction();
                                triggerEvent.call(player, player.media, 'progress');

                                break;

                            case 0:
                                assurePlaybackState$1.call(player, false);

                                // YouTube doesn't support loop for a single video, so mimick it.
                                if (player.media.loop) {
                                    // YouTube needs a call to `stopVideo` before playing again
                                    instance.stopVideo();
                                    instance.playVideo();
                                } else {
                                    triggerEvent.call(player, player.media, 'ended');
                                }

                                break;

                            case 1:
                                // Restore paused state (YouTube starts playing on seek if the video hasn't been played yet)
                                if (player.media.paused && !player.embed.hasPlayed) {
                                    player.media.pause();
                                } else {
                                    assurePlaybackState$1.call(player, true);

                                    triggerEvent.call(player, player.media, 'playing');

                                    // Poll to get playback progress
                                    player.timers.playing = setInterval(function () {
                                        triggerEvent.call(player, player.media, 'timeupdate');
                                    }, 50);

                                    // Check duration again due to YouTube bug
                                    // https://github.com/sampotts/plyr/issues/374
                                    // https://code.google.com/p/gdata-issues/issues/detail?id=8690
                                    if (player.media.duration !== instance.getDuration()) {
                                        player.media.duration = instance.getDuration();
                                        triggerEvent.call(player, player.media, 'durationchange');
                                    }

                                    // Get quality
                                    controls.setQualityMenu.call(player, mapQualityUnits(instance.getAvailableQualityLevels()));
                                }

                                break;

                            case 2:
                                // Restore audio (YouTube starts playing on seek if the video hasn't been played yet)
                                if (!player.muted) {
                                    player.embed.unMute();
                                }
                                assurePlaybackState$1.call(player, false);

                                break;

                            default:
                                break;
                        }

                        triggerEvent.call(player, player.elements.container, 'statechange', false, {
                            code: event.data
                        });
                    }
                }
            });
        }
    };

    // ==========================================================================

    var media = {
        // Setup media
        setup: function setup() {
            // If there's no media, bail
            if (!this.media) {
                this.debug.warn('No media element found!');
                return;
            }

            // Add type class
            toggleClass(this.elements.container, this.config.classNames.type.replace('{0}', this.type), true);

            // Add provider class
            toggleClass(this.elements.container, this.config.classNames.provider.replace('{0}', this.provider), true);

            // Add video class for embeds
            // This will require changes if audio embeds are added
            if (this.isEmbed) {
                toggleClass(this.elements.container, this.config.classNames.type.replace('{0}', 'video'), true);
            }

            // Inject the player wrapper
            if (this.isVideo) {
                // Create the wrapper div
                this.elements.wrapper = createElement('div', {
                    class: this.config.classNames.video
                });

                // Wrap the video in a container
                wrap(this.media, this.elements.wrapper);

                // Faux poster container
                this.elements.poster = createElement('div', {
                    class: this.config.classNames.poster
                });

                this.elements.wrapper.appendChild(this.elements.poster);
            }

            if (this.isHTML5) {
                html5.extend.call(this);
            } else if (this.isYouTube) {
                youtube.setup.call(this);
            } else if (this.isVimeo) {
                vimeo.setup.call(this);
            }
        }
    };

    // ==========================================================================

    var Ads = function () {
        /**
         * Ads constructor.
         * @param {object} player
         * @return {Ads}
         */
        function Ads(player) {
            var _this = this;

            classCallCheck(this, Ads);

            this.player = player;
            this.publisherId = player.config.ads.publisherId;
            this.playing = false;
            this.initialized = false;
            this.elements = {
                container: null,
                displayContainer: null
            };
            this.manager = null;
            this.loader = null;
            this.cuePoints = null;
            this.events = {};
            this.safetyTimer = null;
            this.countdownTimer = null;

            // Setup a promise to resolve when the IMA manager is ready
            this.managerPromise = new Promise(function (resolve, reject) {
                // The ad is loaded and ready
                _this.on('loaded', resolve);

                // Ads failed
                _this.on('error', reject);
            });

            this.load();
        }

        createClass(Ads, [{
            key: 'load',


            /**
             * Load the IMA SDK
             */
            value: function load() {
                var _this2 = this;

                if (this.enabled) {
                    // Check if the Google IMA3 SDK is loaded or load it ourselves
                    if (!is.object(window.google) || !is.object(window.google.ima)) {
                        loadScript(this.player.config.urls.googleIMA.sdk).then(function () {
                            _this2.ready();
                        }).catch(function () {
                            // Script failed to load or is blocked
                            _this2.trigger('error', new Error('Google IMA SDK failed to load'));
                        });
                    } else {
                        this.ready();
                    }
                }
            }

            /**
             * Get the ads instance ready
             */

        }, {
            key: 'ready',
            value: function ready$$1() {
                var _this3 = this;

                // Start ticking our safety timer. If the whole advertisement
                // thing doesn't resolve within our set time; we bail
                this.startSafetyTimer(12000, 'ready()');

                // Clear the safety timer
                this.managerPromise.then(function () {
                    _this3.clearSafetyTimer('onAdsManagerLoaded()');
                });

                // Set listeners on the Plyr instance
                this.listeners();

                // Setup the IMA SDK
                this.setupIMA();
            }

            // Build the default tag URL

        }, {
            key: 'setupIMA',


            /**
             * In order for the SDK to display ads for our video, we need to tell it where to put them,
             * so here we define our ad container. This div is set up to render on top of the video player.
             * Using the code below, we tell the SDK to render ads within that div. We also provide a
             * handle to the content video player - the SDK will poll the current time of our player to
             * properly place mid-rolls. After we create the ad display container, we initialize it. On
             * mobile devices, this initialization is done as the result of a user action.
             */
            value: function setupIMA() {
                // Create the container for our advertisements
                this.elements.container = createElement('div', {
                    class: this.player.config.classNames.ads
                });
                this.player.elements.container.appendChild(this.elements.container);

                // So we can run VPAID2
                google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED);

                // Set language
                google.ima.settings.setLocale(this.player.config.ads.language);

                // We assume the adContainer is the video container of the plyr element
                // that will house the ads
                this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container);

                // Request video ads to be pre-loaded
                this.requestAds();
            }

            /**
             * Request advertisements
             */

        }, {
            key: 'requestAds',
            value: function requestAds() {
                var _this4 = this;

                var container = this.player.elements.container;


                try {
                    // Create ads loader
                    this.loader = new google.ima.AdsLoader(this.elements.displayContainer);

                    // Listen and respond to ads loaded and error events
                    this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, function (event) {
                        return _this4.onAdsManagerLoaded(event);
                    }, false);
                    this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (error) {
                        return _this4.onAdError(error);
                    }, false);

                    // Request video ads
                    var request = new google.ima.AdsRequest();
                    request.adTagUrl = this.tagUrl;

                    // Specify the linear and nonlinear slot sizes. This helps the SDK
                    // to select the correct creative if multiple are returned
                    request.linearAdSlotWidth = container.offsetWidth;
                    request.linearAdSlotHeight = container.offsetHeight;
                    request.nonLinearAdSlotWidth = container.offsetWidth;
                    request.nonLinearAdSlotHeight = container.offsetHeight;

                    // We only overlay ads as we only support video.
                    request.forceNonLinearFullSlot = false;

                    // Mute based on current state
                    request.setAdWillPlayMuted(!this.player.muted);

                    this.loader.requestAds(request);
                } catch (e) {
                    this.onAdError(e);
                }
            }

            /**
             * Update the ad countdown
             * @param {boolean} start
             */

        }, {
            key: 'pollCountdown',
            value: function pollCountdown() {
                var _this5 = this;

                var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                if (!start) {
                    clearInterval(this.countdownTimer);
                    this.elements.container.removeAttribute('data-badge-text');
                    return;
                }

                var update = function update() {
                    var time = formatTime(Math.max(_this5.manager.getRemainingTime(), 0));
                    var label = i18n.get('advertisement', _this5.player.config) + ' - ' + time;
                    _this5.elements.container.setAttribute('data-badge-text', label);
                };

                this.countdownTimer = setInterval(update, 100);
            }

            /**
             * This method is called whenever the ads are ready inside the AdDisplayContainer
             * @param {Event} adsManagerLoadedEvent
             */

        }, {
            key: 'onAdsManagerLoaded',
            value: function onAdsManagerLoaded(event) {
                var _this6 = this;

                // Get the ads manager
                var settings = new google.ima.AdsRenderingSettings();

                // Tell the SDK to save and restore content video state on our behalf
                settings.restoreCustomPlaybackStateOnAdBreakComplete = true;
                settings.enablePreloading = true;

                // The SDK is polling currentTime on the contentPlayback. And needs a duration
                // so it can determine when to start the mid- and post-roll
                this.manager = event.getAdsManager(this.player, settings);

                // Get the cue points for any mid-rolls by filtering out the pre- and post-roll
                this.cuePoints = this.manager.getCuePoints();

                // Add advertisement cue's within the time line if available
                if (!is.empty(this.cuePoints)) {
                    this.cuePoints.forEach(function (cuePoint) {
                        if (cuePoint !== 0 && cuePoint !== -1 && cuePoint < _this6.player.duration) {
                            var seekElement = _this6.player.elements.progress;

                            if (is.element(seekElement)) {
                                var cuePercentage = 100 / _this6.player.duration * cuePoint;
                                var cue = createElement('span', {
                                    class: _this6.player.config.classNames.cues
                                });

                                cue.style.left = cuePercentage.toString() + '%';
                                seekElement.appendChild(cue);
                            }
                        }
                    });
                }

                // Get skippable state
                // TODO: Skip button
                // this.player.debug.warn(this.manager.getAdSkippableState());

                // Set volume to match player
                this.manager.setVolume(this.player.volume);

                // Add listeners to the required events
                // Advertisement error events
                this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, function (error) {
                    return _this6.onAdError(error);
                });

                // Advertisement regular events
                Object.keys(google.ima.AdEvent.Type).forEach(function (type) {
                    _this6.manager.addEventListener(google.ima.AdEvent.Type[type], function (event) {
                        return _this6.onAdEvent(event);
                    });
                });

                // Resolve our adsManager
                this.trigger('loaded');
            }

            /**
             * This is where all the event handling takes place. Retrieve the ad from the event. Some
             * events (e.g. ALL_ADS_COMPLETED) don't have the ad object associated
             * https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type
             * @param {Event} event
             */

        }, {
            key: 'onAdEvent',
            value: function onAdEvent(event) {
                var _this7 = this;

                var container = this.player.elements.container;

                // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
                // don't have ad object associated

                var ad = event.getAd();

                // Proxy event
                var dispatchEvent = function dispatchEvent(type) {
                    var event = 'ads' + type.replace(/_/g, '').toLowerCase();
                    triggerEvent.call(_this7.player, _this7.player.media, event);
                };

                switch (event.type) {
                    case google.ima.AdEvent.Type.LOADED:
                        // This is the first event sent for an ad - it is possible to determine whether the
                        // ad is a video ad or an overlay
                        this.trigger('loaded');

                        // Bubble event
                        dispatchEvent(event.type);

                        // Start countdown
                        this.pollCountdown(true);

                        if (!ad.isLinear()) {
                            // Position AdDisplayContainer correctly for overlay
                            ad.width = container.offsetWidth;
                            ad.height = container.offsetHeight;
                        }

                        // console.info('Ad type: ' + event.getAd().getAdPodInfo().getPodIndex());
                        // console.info('Ad time: ' + event.getAd().getAdPodInfo().getTimeOffset());
                        break;

                    case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                        // All ads for the current videos are done. We can now request new advertisements
                        // in case the video is re-played

                        // Fire event
                        dispatchEvent(event.type);

                        // TODO: Example for what happens when a next video in a playlist would be loaded.
                        // So here we load a new video when all ads are done.
                        // Then we load new ads within a new adsManager. When the video
                        // Is started - after - the ads are loaded, then we get ads.
                        // You can also easily test cancelling and reloading by running
                        // player.ads.cancel() and player.ads.play from the console I guess.
                        // this.player.source = {
                        //     type: 'video',
                        //     title: 'View From A Blue Moon',
                        //     sources: [{
                        //         src:
                        // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.mp4', type:
                        // 'video/mp4', }], poster:
                        // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg', tracks:
                        // [ { kind: 'captions', label: 'English', srclang: 'en', src:
                        // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
                        // default: true, }, { kind: 'captions', label: 'French', srclang: 'fr', src:
                        // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt', }, ],
                        // };

                        // TODO: So there is still this thing where a video should only be allowed to start
                        // playing when the IMA SDK is ready or has failed

                        this.loadAds();
                        break;

                    case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                        // This event indicates the ad has started - the video player can adjust the UI,
                        // for example display a pause button and remaining time. Fired when content should
                        // be paused. This usually happens right before an ad is about to cover the content

                        dispatchEvent(event.type);

                        this.pauseContent();

                        break;

                    case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                        // This event indicates the ad has finished - the video player can perform
                        // appropriate UI actions, such as removing the timer for remaining time detection.
                        // Fired when content should be resumed. This usually happens when an ad finishes
                        // or collapses

                        dispatchEvent(event.type);

                        this.pollCountdown();

                        this.resumeContent();

                        break;

                    case google.ima.AdEvent.Type.STARTED:
                    case google.ima.AdEvent.Type.MIDPOINT:
                    case google.ima.AdEvent.Type.COMPLETE:
                    case google.ima.AdEvent.Type.IMPRESSION:
                    case google.ima.AdEvent.Type.CLICK:
                        dispatchEvent(event.type);
                        break;

                    default:
                        break;
                }
            }

            /**
             * Any ad error handling comes through here
             * @param {Event} event
             */

        }, {
            key: 'onAdError',
            value: function onAdError(event) {
                this.cancel();
                this.player.debug.warn('Ads error', event);
            }

            /**
             * Setup hooks for Plyr and window events. This ensures
             * the mid- and post-roll launch at the correct time. And
             * resize the advertisement when the player resizes
             */

        }, {
            key: 'listeners',
            value: function listeners() {
                var _this8 = this;

                var container = this.player.elements.container;

                var time = void 0;

                // Add listeners to the required events
                this.player.on('ended', function () {
                    _this8.loader.contentComplete();
                });

                this.player.on('seeking', function () {
                    time = _this8.player.currentTime;
                    return time;
                });

                this.player.on('seeked', function () {
                    var seekedTime = _this8.player.currentTime;

                    if (is.empty(_this8.cuePoints)) {
                        return;
                    }

                    _this8.cuePoints.forEach(function (cuePoint, index) {
                        if (time < cuePoint && cuePoint < seekedTime) {
                            _this8.manager.discardAdBreak();
                            _this8.cuePoints.splice(index, 1);
                        }
                    });
                });

                // Listen to the resizing of the window. And resize ad accordingly
                // TODO: eventually implement ResizeObserver
                window.addEventListener('resize', function () {
                    if (_this8.manager) {
                        _this8.manager.resize(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);
                    }
                });
            }

            /**
             * Initialize the adsManager and start playing advertisements
             */

        }, {
            key: 'play',
            value: function play() {
                var _this9 = this;

                var container = this.player.elements.container;


                if (!this.managerPromise) {
                    this.resumeContent();
                }

                // Play the requested advertisement whenever the adsManager is ready
                this.managerPromise.then(function () {
                    // Initialize the container. Must be done via a user action on mobile devices
                    _this9.elements.displayContainer.initialize();

                    try {
                        if (!_this9.initialized) {
                            // Initialize the ads manager. Ad rules playlist will start at this time
                            _this9.manager.init(container.offsetWidth, container.offsetHeight, google.ima.ViewMode.NORMAL);

                            // Call play to start showing the ad. Single video and overlay ads will
                            // start at this time; the call will be ignored for ad rules
                            _this9.manager.start();
                        }

                        _this9.initialized = true;
                    } catch (adError) {
                        // An error may be thrown if there was a problem with the
                        // VAST response
                        _this9.onAdError(adError);
                    }
                }).catch(function () { });
            }

            /**
             * Resume our video
             */

        }, {
            key: 'resumeContent',
            value: function resumeContent() {
                // Hide the advertisement container
                this.elements.container.style.zIndex = '';

                // Ad is stopped
                this.playing = false;

                // Play our video
                if (this.player.currentTime < this.player.duration) {
                    this.player.play();
                }
            }

            /**
             * Pause our video
             */

        }, {
            key: 'pauseContent',
            value: function pauseContent() {
                // Show the advertisement container
                this.elements.container.style.zIndex = 3;

                // Ad is playing.
                this.playing = true;

                // Pause our video.
                this.player.pause();
            }

            /**
             * Destroy the adsManager so we can grab new ads after this. If we don't then we're not
             * allowed to call new ads based on google policies, as they interpret this as an accidental
             * video requests. https://developers.google.com/interactive-
             * media-ads/docs/sdks/android/faq#8
             */

        }, {
            key: 'cancel',
            value: function cancel() {
                // Pause our video
                if (this.initialized) {
                    this.resumeContent();
                }

                // Tell our instance that we're done for now
                this.trigger('error');

                // Re-create our adsManager
                this.loadAds();
            }

            /**
             * Re-create our adsManager
             */

        }, {
            key: 'loadAds',
            value: function loadAds() {
                var _this10 = this;

                // Tell our adsManager to go bye bye
                this.managerPromise.then(function () {
                    // Destroy our adsManager
                    if (_this10.manager) {
                        _this10.manager.destroy();
                    }

                    // Re-set our adsManager promises
                    _this10.managerPromise = new Promise(function (resolve) {
                        _this10.on('loaded', resolve);
                        _this10.player.debug.log(_this10.manager);
                    });

                    // Now request some new advertisements
                    _this10.requestAds();
                }).catch(function () { });
            }

            /**
             * Handles callbacks after an ad event was invoked
             * @param {string} event - Event type
             */

        }, {
            key: 'trigger',
            value: function trigger(event) {
                var _this11 = this;

                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                var handlers = this.events[event];

                if (is.array(handlers)) {
                    handlers.forEach(function (handler) {
                        if (is.function(handler)) {
                            handler.apply(_this11, args);
                        }
                    });
                }
            }

            /**
             * Add event listeners
             * @param {string} event - Event type
             * @param {function} callback - Callback for when event occurs
             * @return {Ads}
             */

        }, {
            key: 'on',
            value: function on$$1(event, callback) {
                if (!is.array(this.events[event])) {
                    this.events[event] = [];
                }

                this.events[event].push(callback);

                return this;
            }

            /**
             * Setup a safety timer for when the ad network doesn't respond for whatever reason.
             * The advertisement has 12 seconds to get its things together. We stop this timer when the
             * advertisement is playing, or when a user action is required to start, then we clear the
             * timer on ad ready
             * @param {number} time
             * @param {string} from
             */

        }, {
            key: 'startSafetyTimer',
            value: function startSafetyTimer(time, from) {
                var _this12 = this;

                this.player.debug.log('Safety timer invoked from: ' + from);

                this.safetyTimer = setTimeout(function () {
                    _this12.cancel();
                    _this12.clearSafetyTimer('startSafetyTimer()');
                }, time);
            }

            /**
             * Clear our safety timer(s)
             * @param {string} from
             */

        }, {
            key: 'clearSafetyTimer',
            value: function clearSafetyTimer(from) {
                if (!is.nullOrUndefined(this.safetyTimer)) {
                    this.player.debug.log('Safety timer cleared from: ' + from);

                    clearTimeout(this.safetyTimer);
                    this.safetyTimer = null;
                }
            }
        }, {
            key: 'enabled',
            get: function get$$1() {
                return this.player.isHTML5 && this.player.isVideo && this.player.config.ads.enabled && !is.empty(this.publisherId);
            }
        }, {
            key: 'tagUrl',
            get: function get$$1() {
                var params = {
                    AV_PUBLISHERID: '58c25bb0073ef448b1087ad6',
                    AV_CHANNELID: '5a0458dc28a06145e4519d21',
                    AV_URL: window.location.hostname,
                    cb: Date.now(),
                    AV_WIDTH: 640,
                    AV_HEIGHT: 480,
                    AV_CDIM2: this.publisherId
                };

                var base = 'https://go.aniview.com/api/adserver6/vast/';

                return base + '?' + buildUrlParams(params);
            }
        }]);
        return Ads;
    }();

    // ==========================================================================

    var source = {
        // Add elements to HTML5 media (source, tracks, etc)
        insertElements: function insertElements(type, attributes) {
            var _this = this;

            if (is.string(attributes)) {
                insertElement(type, this.media, {
                    src: attributes
                });
            } else if (is.array(attributes)) {
                attributes.forEach(function (attribute) {
                    insertElement(type, _this.media, attribute);
                });
            }
        },


        // Update source
        // Sources are not checked for support so be careful
        change: function change(input) {
            var _this2 = this;

            if (!getDeep(input, 'sources.length')) {
                this.debug.warn('Invalid source format');
                return;
            }

            // Cancel current network requests
            html5.cancelRequests.call(this);

            // Destroy instance and re-setup
            this.destroy.call(this, function () {
                // Reset quality options
                _this2.options.quality = [];

                // Remove elements
                removeElement(_this2.media);
                _this2.media = null;

                // Reset class name
                if (is.element(_this2.elements.container)) {
                    _this2.elements.container.removeAttribute('class');
                }

                // Set the type and provider
                var sources = input.sources,
                    type = input.type;

                var _sources = slicedToArray(sources, 1),
                    _sources$ = _sources[0],
                    _sources$$provider = _sources$.provider,
                    provider = _sources$$provider === undefined ? providers.html5 : _sources$$provider,
                    src = _sources$.src;

                var tagName = provider === 'html5' ? type : 'div';
                var attributes = provider === 'html5' ? {} : { src: src };

                Object.assign(_this2, {
                    provider: provider,
                    type: type,
                    // Check for support
                    supported: support.check(type, provider, _this2.config.playsinline),
                    // Create new element
                    media: createElement(tagName, attributes)
                });

                // Inject the new element
                _this2.elements.container.appendChild(_this2.media);

                // Autoplay the new source?
                if (is.boolean(input.autoplay)) {
                    _this2.config.autoplay = input.autoplay;
                }

                // Set attributes for audio and video
                if (_this2.isHTML5) {
                    if (_this2.config.crossorigin) {
                        _this2.media.setAttribute('crossorigin', '');
                    }
                    if (_this2.config.autoplay) {
                        _this2.media.setAttribute('autoplay', '');
                    }
                    if (!is.empty(input.poster)) {
                        _this2.poster = input.poster;
                    }
                    if (_this2.config.loop.active) {
                        _this2.media.setAttribute('loop', '');
                    }
                    if (_this2.config.muted) {
                        _this2.media.setAttribute('muted', '');
                    }
                    if (_this2.config.playsinline) {
                        _this2.media.setAttribute('playsinline', '');
                    }
                }

                // Restore class hook
                ui.addStyleHook.call(_this2);

                // Set new sources for html5
                if (_this2.isHTML5) {
                    source.insertElements.call(_this2, 'source', sources);
                }

                // Set video title
                _this2.config.title = input.title;

                // Set up from scratch
                media.setup.call(_this2);

                // HTML5 stuff
                if (_this2.isHTML5) {
                    // Setup captions
                    if ('tracks' in input) {
                        source.insertElements.call(_this2, 'track', input.tracks);
                    }

                    // Load HTML5 sources
                    _this2.media.load();
                }

                // If HTML5 or embed but not fully supported, setupInterface and call ready now
                if (_this2.isHTML5 || _this2.isEmbed && !_this2.supported.ui) {
                    // Setup interface
                    ui.build.call(_this2);
                }

                // Update the fullscreen support
                _this2.fullscreen.update();
            }, true);
        }
    };

    // ==========================================================================

    // Private properties
    // TODO: Use a WeakMap for private globals
    // const globals = new WeakMap();

    // Plyr instance

    var Plyr = function () {
        function Plyr(target, options) {
            var _this = this;

            classCallCheck(this, Plyr);

            this.timers = {};

            // State
            this.ready = false;
            this.loading = false;
            this.failed = false;

            // Touch device
            this.touch = support.touch;

            // Set the media element
            this.media = target;

            // String selector passed
            if (is.string(this.media)) {
                this.media = document.querySelectorAll(this.media);
            }

            // jQuery, NodeList or Array passed, use first element
            if (window.jQuery && this.media instanceof jQuery || is.nodeList(this.media) || is.array(this.media)) {
                // eslint-disable-next-line
                this.media = this.media[0];
            }

            // Set config
            this.config = extend({}, defaults$1, Plyr.defaults, options || {}, function () {
                try {
                    return JSON.parse(_this.media.getAttribute('data-plyr-config'));
                } catch (e) {
                    return {};
                }
            }());

            // Elements cache
            this.elements = {
                container: null,
                buttons: {},
                display: {},
                progress: {},
                inputs: {},
                settings: {
                    menu: null,
                    panes: {},
                    tabs: {}
                },
                captions: null
            };

            // Captions
            this.captions = {
                active: null,
                currentTrack: -1,
                meta: new WeakMap()
            };

            // Fullscreen
            this.fullscreen = {
                active: false
            };

            // Options
            this.options = {
                speed: [],
                quality: []
            };

            // Debugging
            // TODO: move to globals
            this.debug = new Console(this.config.debug);

            // Log config options and support
            this.debug.log('Config', this.config);
            this.debug.log('Support', support);

            // We need an element to setup
            if (is.nullOrUndefined(this.media) || !is.element(this.media)) {
                this.debug.error('Setup failed: no suitable element passed');
                return;
            }

            // Bail if the element is initialized
            if (this.media.plyr) {
                this.debug.warn('Target already setup');
                return;
            }

            // Bail if not enabled
            if (!this.config.enabled) {
                this.debug.error('Setup failed: disabled by config');
                return;
            }

            // Bail if disabled or no basic support
            // You may want to disable certain UAs etc
            if (!support.check().api) {
                this.debug.error('Setup failed: no support');
                return;
            }

            // Cache original element state for .destroy()
            var clone = this.media.cloneNode(true);
            clone.autoplay = false;
            this.elements.original = clone;

            // Set media type based on tag or data attribute
            // Supported: video, audio, vimeo, youtube
            var type = this.media.tagName.toLowerCase();

            // Embed properties
            var iframe = null;
            var url = null;

            // Different setup based on type
            switch (type) {
                case 'div':
                    // Find the frame
                    iframe = this.media.querySelector('iframe');

                    // <iframe> type
                    if (is.element(iframe)) {
                        // Detect provider
                        url = parseUrl(iframe.getAttribute('src'));
                        this.provider = getProviderByUrl(url.toString());

                        // Rework elements
                        this.elements.container = this.media;
                        this.media = iframe;

                        // Reset classname
                        this.elements.container.className = '';

                        // Get attributes from URL and set config
                        if (url.searchParams.length) {
                            var truthy = ['1', 'true'];

                            if (truthy.includes(url.searchParams.get('autoplay'))) {
                                this.config.autoplay = true;
                            }
                            if (truthy.includes(url.searchParams.get('loop'))) {
                                this.config.loop.active = true;
                            }

                            // TODO: replace fullscreen.iosNative with this playsinline config option
                            // YouTube requires the playsinline in the URL
                            if (this.isYouTube) {
                                this.config.playsinline = truthy.includes(url.searchParams.get('playsinline'));
                            } else {
                                this.config.playsinline = true;
                            }
                        }
                    } else {
                        // <div> with attributes
                        this.provider = this.media.getAttribute(this.config.attributes.embed.provider);

                        // Remove attribute
                        this.media.removeAttribute(this.config.attributes.embed.provider);
                    }

                    // Unsupported or missing provider
                    if (is.empty(this.provider) || !Object.keys(providers).includes(this.provider)) {
                        this.debug.error('Setup failed: Invalid provider');
                        return;
                    }

                    // Audio will come later for external providers
                    this.type = types.video;

                    break;

                case 'video':
                case 'audio':
                    this.type = type;
                    this.provider = providers.html5;

                    // Get config from attributes
                    if (this.media.hasAttribute('crossorigin')) {
                        this.config.crossorigin = true;
                    }
                    if (this.media.hasAttribute('autoplay')) {
                        this.config.autoplay = true;
                    }
                    if (this.media.hasAttribute('playsinline')) {
                        this.config.playsinline = true;
                    }
                    if (this.media.hasAttribute('muted')) {
                        this.config.muted = true;
                    }
                    if (this.media.hasAttribute('loop')) {
                        this.config.loop.active = true;
                    }

                    break;

                default:
                    this.debug.error('Setup failed: unsupported type');
                    return;
            }

            // Check for support again but with type
            this.supported = support.check(this.type, this.provider, this.config.playsinline);

            // If no support for even API, bail
            if (!this.supported.api) {
                this.debug.error('Setup failed: no support');
                return;
            }

            this.eventListeners = [];

            // Create listeners
            this.listeners = new Listeners(this);

            // Setup local storage for user settings
            this.storage = new Storage(this);

            // Store reference
            this.media.plyr = this;

            // Wrap media
            if (!is.element(this.elements.container)) {
                this.elements.container = createElement('div');
                wrap(this.media, this.elements.container);
            }

            // Add style hook
            ui.addStyleHook.call(this);

            // Setup media
            media.setup.call(this);

            // Listen for events if debugging
            if (this.config.debug) {
                on.call(this, this.elements.container, this.config.events.join(' '), function (event) {
                    _this.debug.log('event: ' + event.type);
                });
            }

            // Setup interface
            // If embed but not fully supported, build interface now to avoid flash of controls
            if (this.isHTML5 || this.isEmbed && !this.supported.ui) {
                ui.build.call(this);
            }

            // Container listeners
            this.listeners.container();

            // Global listeners
            this.listeners.global();

            // Setup fullscreen
            this.fullscreen = new Fullscreen(this);

            // Setup ads if provided
            this.ads = new Ads(this);

            // Autoplay if required
            if (this.config.autoplay) {
                this.play();
            }
        }

        // ---------------------------------------
        // API
        // ---------------------------------------

        /**
         * Types and provider helpers
         */


        createClass(Plyr, [{
            key: 'play',


            /**
             * Play the media, or play the advertisement (if they are not blocked)
             */
            value: function play() {
                if (!is.function(this.media.play)) {
                    return null;
                }

                // Return the promise (for HTML5)
                return this.media.play();
            }

            /**
             * Pause the media
             */

        }, {
            key: 'pause',
            value: function pause() {
                if (!this.playing || !is.function(this.media.pause)) {
                    return;
                }

                this.media.pause();
            }

            /**
             * Get playing state
             */

        }, {
            key: 'togglePlay',


            /**
             * Toggle playback based on current status
             * @param {boolean} input
             */
            value: function togglePlay(input) {
                // Toggle based on current state if nothing passed
                var toggle = is.boolean(input) ? input : !this.playing;

                if (toggle) {
                    this.play();
                } else {
                    this.pause();
                }
            }

            /**
             * Stop playback
             */

        }, {
            key: 'stop',
            value: function stop() {
                if (this.isHTML5) {
                    this.pause();
                    this.restart();
                } else if (is.function(this.media.stop)) {
                    this.media.stop();
                }
            }

            /**
             * Restart playback
             */

        }, {
            key: 'restart',
            value: function restart() {
                this.currentTime = 0;
            }

            /**
             * Rewind
             * @param {number} seekTime - how far to rewind in seconds. Defaults to the config.seekTime
             */

        }, {
            key: 'rewind',
            value: function rewind(seekTime) {
                this.currentTime = this.currentTime - (is.number(seekTime) ? seekTime : this.config.seekTime);
            }

            /**
             * Fast forward
             * @param {number} seekTime - how far to fast forward in seconds. Defaults to the config.seekTime
             */

        }, {
            key: 'forward',
            value: function forward(seekTime) {
                this.currentTime = this.currentTime + (is.number(seekTime) ? seekTime : this.config.seekTime);
            }

            /**
             * Seek to a time
             * @param {number} input - where to seek to in seconds. Defaults to 0 (the start)
             */

        }, {
            key: 'increaseVolume',


            /**
             * Increase volume
             * @param {boolean} step - How much to decrease by (between 0 and 1)
             */
            value: function increaseVolume(step) {
                var volume = this.media.muted ? 0 : this.volume;
                this.volume = volume + (is.number(step) ? step : 0);
            }

            /**
             * Decrease volume
             * @param {boolean} step - How much to decrease by (between 0 and 1)
             */

        }, {
            key: 'decreaseVolume',
            value: function decreaseVolume(step) {
                this.increaseVolume(-step);
            }

            /**
             * Set muted state
             * @param {boolean} mute
             */

        }, {
            key: 'toggleCaptions',


            /**
             * Toggle captions
             * @param {boolean} input - Whether to enable captions
             */
            value: function toggleCaptions(input) {
                captions.toggle.call(this, input, false);
            }

            /**
             * Set the caption track by index
             * @param {number} - Caption index
             */

        }, {
            key: 'airplay',


            /**
             * Trigger the airplay dialog
             * TODO: update player with state, support, enabled
             */
            value: function airplay() {
                // Show dialog if supported
                if (support.airplay) {
                    this.media.webkitShowPlaybackTargetPicker();
                }
            }

            /**
             * Toggle the player controls
             * @param {boolean} [toggle] - Whether to show the controls
             */

        }, {
            key: 'toggleControls',
            value: function toggleControls(toggle) {
                // Don't toggle if missing UI support or if it's audio
                if (this.supported.ui && !this.isAudio) {
                    // Get state before change
                    var isHidden = hasClass(this.elements.container, this.config.classNames.hideControls);

                    // Negate the argument if not undefined since adding the class to hides the controls
                    var force = typeof toggle === 'undefined' ? undefined : !toggle;

                    // Apply and get updated state
                    var hiding = toggleClass(this.elements.container, this.config.classNames.hideControls, force);

                    // Close menu
                    if (hiding && this.config.controls.includes('settings') && !is.empty(this.config.settings)) {
                        controls.toggleMenu.call(this, false);
                    }
                    // Trigger event on change
                    if (hiding !== isHidden) {
                        var eventName = hiding ? 'controlshidden' : 'controlsshown';
                        triggerEvent.call(this, this.media, eventName);
                    }
                    return !hiding;
                }
                return false;
            }

            /**
             * Add event listeners
             * @param {string} event - Event type
             * @param {function} callback - Callback for when event occurs
             */

        }, {
            key: 'on',
            value: function on$$1(event, callback) {
                on.call(this, this.elements.container, event, callback);
            }

            /**
             * Add event listeners once
             * @param {string} event - Event type
             * @param {function} callback - Callback for when event occurs
             */

        }, {
            key: 'once',
            value: function once$$1(event, callback) {
                once.call(this, this.elements.container, event, callback);
            }

            /**
             * Remove event listeners
             * @param {string} event - Event type
             * @param {function} callback - Callback for when event occurs
             */

        }, {
            key: 'off',
            value: function off$$1(event, callback) {
                off(this.elements.container, event, callback);
            }

            /**
             * Destroy an instance
             * Event listeners are removed when elements are removed
             * http://stackoverflow.com/questions/12528049/if-a-dom-element-is-removed-are-its-listeners-also-removed-from-memory
             * @param {function} callback - Callback for when destroy is complete
             * @param {boolean} soft - Whether it's a soft destroy (for source changes etc)
             */

        }, {
            key: 'destroy',
            value: function destroy(callback) {
                var _this2 = this;

                var soft = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                if (!this.ready) {
                    return;
                }

                var done = function done() {
                    // Reset overflow (incase destroyed while in fullscreen)
                    document.body.style.overflow = '';

                    // GC for embed
                    _this2.embed = null;

                    // If it's a soft destroy, make minimal changes
                    if (soft) {
                        if (Object.keys(_this2.elements).length) {
                            // Remove elements
                            removeElement(_this2.elements.buttons.play);
                            removeElement(_this2.elements.captions);
                            removeElement(_this2.elements.controls);
                            removeElement(_this2.elements.wrapper);

                            // Clear for GC
                            _this2.elements.buttons.play = null;
                            _this2.elements.captions = null;
                            _this2.elements.controls = null;
                            _this2.elements.wrapper = null;
                        }

                        // Callback
                        if (is.function(callback)) {
                            callback();
                        }
                    } else {
                        // Unbind listeners
                        unbindListeners.call(_this2);

                        // Replace the container with the original element provided
                        replaceElement(_this2.elements.original, _this2.elements.container);

                        // Event
                        triggerEvent.call(_this2, _this2.elements.original, 'destroyed', true);

                        // Callback
                        if (is.function(callback)) {
                            callback.call(_this2.elements.original);
                        }

                        // Reset state
                        _this2.ready = false;

                        // Clear for garbage collection
                        setTimeout(function () {
                            _this2.elements = null;
                            _this2.media = null;
                        }, 200);
                    }
                };

                // Stop playback
                this.stop();

                // Provider specific stuff
                if (this.isHTML5) {
                    // Clear timeout
                    clearTimeout(this.timers.loading);

                    // Restore native video controls
                    ui.toggleNativeControls.call(this, true);

                    // Clean up
                    done();
                } else if (this.isYouTube) {
                    // Clear timers
                    clearInterval(this.timers.buffering);
                    clearInterval(this.timers.playing);

                    // Destroy YouTube API
                    if (this.embed !== null && is.function(this.embed.destroy)) {
                        this.embed.destroy();
                    }

                    // Clean up
                    done();
                } else if (this.isVimeo) {
                    // Destroy Vimeo API
                    // then clean up (wait, to prevent postmessage errors)
                    if (this.embed !== null) {
                        this.embed.unload().then(done);
                    }

                    // Vimeo does not always return
                    setTimeout(done, 200);
                }
            }

            /**
             * Check for support for a mime type (HTML5 only)
             * @param {string} type - Mime type
             */

        }, {
            key: 'supports',
            value: function supports(type) {
                return support.mime.call(this, type);
            }

            /**
             * Check for support
             * @param {string} type - Player type (audio/video)
             * @param {string} provider - Provider (html5/youtube/vimeo)
             * @param {bool} inline - Where player has `playsinline` sttribute
             */

        }, {
            key: 'isHTML5',
            get: function get$$1() {
                return Boolean(this.provider === providers.html5);
            }
        }, {
            key: 'isEmbed',
            get: function get$$1() {
                return Boolean(this.isYouTube || this.isVimeo);
            }
        }, {
            key: 'isYouTube',
            get: function get$$1() {
                return Boolean(this.provider === providers.youtube);
            }
        }, {
            key: 'isVimeo',
            get: function get$$1() {
                return Boolean(this.provider === providers.vimeo);
            }
        }, {
            key: 'isVideo',
            get: function get$$1() {
                return Boolean(this.type === types.video);
            }
        }, {
            key: 'isAudio',
            get: function get$$1() {
                return Boolean(this.type === types.audio);
            }
        }, {
            key: 'playing',
            get: function get$$1() {
                return Boolean(this.ready && !this.paused && !this.ended);
            }

            /**
             * Get paused state
             */

        }, {
            key: 'paused',
            get: function get$$1() {
                return Boolean(this.media.paused);
            }

            /**
             * Get stopped state
             */

        }, {
            key: 'stopped',
            get: function get$$1() {
                return Boolean(this.paused && this.currentTime === 0);
            }

            /**
             * Get ended state
             */

        }, {
            key: 'ended',
            get: function get$$1() {
                return Boolean(this.media.ended);
            }
        }, {
            key: 'currentTime',
            set: function set$$1(input) {
                // Bail if media duration isn't available yet
                if (!this.duration) {
                    return;
                }

                // Validate input
                var inputIsValid = is.number(input) && input > 0;

                // Set
                this.media.currentTime = inputIsValid ? Math.min(input, this.duration) : 0;

                // Logging
                this.debug.log('Seeking to ' + this.currentTime + ' seconds');
            }

            /**
             * Get current time
             */
            ,
            get: function get$$1() {
                return Number(this.media.currentTime);
            }

            /**
             * Get buffered
             */

        }, {
            key: 'buffered',
            get: function get$$1() {
                var buffered = this.media.buffered;

                // YouTube / Vimeo return a float between 0-1

                if (is.number(buffered)) {
                    return buffered;
                }

                // HTML5
                // TODO: Handle buffered chunks of the media
                // (i.e. seek to another section buffers only that section)
                if (buffered && buffered.length && this.duration > 0) {
                    return buffered.end(0) / this.duration;
                }

                return 0;
            }

            /**
             * Get seeking status
             */

        }, {
            key: 'seeking',
            get: function get$$1() {
                return Boolean(this.media.seeking);
            }

            /**
             * Get the duration of the current media
             */

        }, {
            key: 'duration',
            get: function get$$1() {
                // Faux duration set via config
                var fauxDuration = parseFloat(this.config.duration);

                // Media duration can be NaN or Infinity before the media has loaded
                var realDuration = (this.media || {}).duration;
                var duration = !is.number(realDuration) || realDuration === Infinity ? 0 : realDuration;

                // If config duration is funky, use regular duration
                return fauxDuration || duration;
            }

            /**
             * Set the player volume
             * @param {number} value - must be between 0 and 1. Defaults to the value from local storage and config.volume if not set in storage
             */

        }, {
            key: 'volume',
            set: function set$$1(value) {
                var volume = value;
                var max = 1;
                var min = 0;

                if (is.string(volume)) {
                    volume = Number(volume);
                }

                // Load volume from storage if no value specified
                if (!is.number(volume)) {
                    volume = this.storage.get('volume');
                }

                // Use config if all else fails
                if (!is.number(volume)) {
                    volume = this.config.volume;
                }

                // Maximum is volumeMax
                if (volume > max) {
                    volume = max;
                }
                // Minimum is volumeMin
                if (volume < min) {
                    volume = min;
                }

                // Update config
                this.config.volume = volume;

                // Set the player volume
                this.media.volume = volume;

                // If muted, and we're increasing volume manually, reset muted state
                if (!is.empty(value) && this.muted && volume > 0) {
                    this.muted = false;
                }
            }

            /**
             * Get the current player volume
             */
            ,
            get: function get$$1() {
                return Number(this.media.volume);
            }
        }, {
            key: 'muted',
            set: function set$$1(mute) {
                var toggle = mute;

                // Load muted state from storage
                if (!is.boolean(toggle)) {
                    toggle = this.storage.get('muted');
                }

                // Use config if all else fails
                if (!is.boolean(toggle)) {
                    toggle = this.config.muted;
                }

                // Update config
                this.config.muted = toggle;

                // Set mute on the player
                this.media.muted = toggle;
            }

            /**
             * Get current muted state
             */
            ,
            get: function get$$1() {
                return Boolean(this.media.muted);
            }

            /**
             * Check if the media has audio
             */

        }, {
            key: 'hasAudio',
            get: function get$$1() {
                // Assume yes for all non HTML5 (as we can't tell...)
                if (!this.isHTML5) {
                    return true;
                }

                if (this.isAudio) {
                    return true;
                }

                // Get audio tracks
                return Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length);
            }

            /**
             * Set playback speed
             * @param {number} speed - the speed of playback (0.5-2.0)
             */

        }, {
            key: 'speed',
            set: function set$$1(input) {
                var speed = null;

                if (is.number(input)) {
                    speed = input;
                }

                if (!is.number(speed)) {
                    speed = this.storage.get('speed');
                }

                if (!is.number(speed)) {
                    speed = this.config.speed.selected;
                }

                // Set min/max
                if (speed < 0.1) {
                    speed = 0.1;
                }
                if (speed > 2.0) {
                    speed = 2.0;
                }

                if (!this.config.speed.options.includes(speed)) {
                    this.debug.warn('Unsupported speed (' + speed + ')');
                    return;
                }

                // Update config
                this.config.speed.selected = speed;

                // Set media speed
                this.media.playbackRate = speed;
            }

            /**
             * Get current playback speed
             */
            ,
            get: function get$$1() {
                return Number(this.media.playbackRate);
            }

            /**
             * Set playback quality
             * Currently HTML5 & YouTube only
             * @param {number} input - Quality level
             */

        }, {
            key: 'quality',
            set: function set$$1(input) {
                var config = this.config.quality;
                var options = this.options.quality;

                if (!options.length) {
                    return;
                }

                var quality = [!is.empty(input) && Number(input), this.storage.get('quality'), config.selected, config.default].find(is.number);

                if (!options.includes(quality)) {
                    var value = closest(options, quality);
                    this.debug.warn('Unsupported quality option: ' + quality + ', using ' + value + ' instead');
                    quality = value;
                }

                // Trigger request event
                triggerEvent.call(this, this.media, 'qualityrequested', false, { quality: quality });

                // Update config
                config.selected = quality;

                // Set quality
                this.media.quality = quality;
            }

            /**
             * Get current quality level
             */
            ,
            get: function get$$1() {
                return this.media.quality;
            }

            /**
             * Toggle loop
             * TODO: Finish fancy new logic. Set the indicator on load as user may pass loop as config
             * @param {boolean} input - Whether to loop or not
             */

        }, {
            key: 'loop',
            set: function set$$1(input) {
                var toggle = is.boolean(input) ? input : this.config.loop.active;
                this.config.loop.active = toggle;
                this.media.loop = toggle;

                // Set default to be a true toggle
                /* const type = ['start', 'end', 'all', 'none', 'toggle'].includes(input) ? input : 'toggle';
                 switch (type) {
                    case 'start':
                        if (this.config.loop.end && this.config.loop.end <= this.currentTime) {
                            this.config.loop.end = null;
                        }
                        this.config.loop.start = this.currentTime;
                        // this.config.loop.indicator.start = this.elements.display.played.value;
                        break;
                     case 'end':
                        if (this.config.loop.start >= this.currentTime) {
                            return this;
                        }
                        this.config.loop.end = this.currentTime;
                        // this.config.loop.indicator.end = this.elements.display.played.value;
                        break;
                     case 'all':
                        this.config.loop.start = 0;
                        this.config.loop.end = this.duration - 2;
                        this.config.loop.indicator.start = 0;
                        this.config.loop.indicator.end = 100;
                        break;
                     case 'toggle':
                        if (this.config.loop.active) {
                            this.config.loop.start = 0;
                            this.config.loop.end = null;
                        } else {
                            this.config.loop.start = 0;
                            this.config.loop.end = this.duration - 2;
                        }
                        break;
                     default:
                        this.config.loop.start = 0;
                        this.config.loop.end = null;
                        break;
                } */
            }

            /**
             * Get current loop state
             */
            ,
            get: function get$$1() {
                return Boolean(this.media.loop);
            }

            /**
             * Set new media source
             * @param {object} input - The new source object (see docs)
             */

        }, {
            key: 'source',
            set: function set$$1(input) {
                source.change.call(this, input);
            }

            /**
             * Get current source
             */
            ,
            get: function get$$1() {
                return this.media.currentSrc;
            }

            /**
             * Set the poster image for a video
             * @param {input} - the URL for the new poster image
             */

        }, {
            key: 'poster',
            set: function set$$1(input) {
                if (!this.isVideo) {
                    this.debug.warn('Poster can only be set for video');
                    return;
                }

                ui.setPoster.call(this, input, false).catch(function () { });
            }

            /**
             * Get the current poster image
             */
            ,
            get: function get$$1() {
                if (!this.isVideo) {
                    return null;
                }

                return this.media.getAttribute('poster');
            }

            /**
             * Set the autoplay state
             * @param {boolean} input - Whether to autoplay or not
             */

        }, {
            key: 'autoplay',
            set: function set$$1(input) {
                var toggle = is.boolean(input) ? input : this.config.autoplay;
                this.config.autoplay = toggle;
            }

            /**
             * Get the current autoplay state
             */
            ,
            get: function get$$1() {
                return Boolean(this.config.autoplay);
            }
        }, {
            key: 'currentTrack',
            set: function set$$1(input) {
                captions.set.call(this, input, false);
            }

            /**
             * Get the current caption track index (-1 if disabled)
             */
            ,
            get: function get$$1() {
                var _captions = this.captions,
                    toggled = _captions.toggled,
                    currentTrack = _captions.currentTrack;

                return toggled ? currentTrack : -1;
            }

            /**
             * Set the wanted language for captions
             * Since tracks can be added later it won't update the actual caption track until there is a matching track
             * @param {string} - Two character ISO language code (e.g. EN, FR, PT, etc)
             */

        }, {
            key: 'language',
            set: function set$$1(input) {
                captions.setLanguage.call(this, input, false);
            }

            /**
             * Get the current track's language
             */
            ,
            get: function get$$1() {
                return (captions.getCurrentTrack.call(this) || {}).language;
            }

            /**
             * Toggle picture-in-picture playback on WebKit/MacOS
             * TODO: update player with state, support, enabled
             * TODO: detect outside changes
             */

        }, {
            key: 'pip',
            set: function set$$1(input) {
                var states = {
                    pip: 'picture-in-picture',
                    inline: 'inline'
                };

                // Bail if no support
                if (!support.pip) {
                    return;
                }

                // Toggle based on current state if not passed
                var toggle = is.boolean(input) ? input : this.pip === states.inline;

                // Toggle based on current state
                this.media.webkitSetPresentationMode(toggle ? states.pip : states.inline);
            }

            /**
             * Get the current picture-in-picture state
             */
            ,
            get: function get$$1() {
                if (!support.pip) {
                    return null;
                }

                return this.media.webkitPresentationMode;
            }
        }], [{
            key: 'supported',
            value: function supported(type, provider, inline) {
                return support.check(type, provider, inline);
            }

            /**
             * Load an SVG sprite into the page
             * @param {string} url - URL for the SVG sprite
             * @param {string} [id] - Unique ID
             */

        }, {
            key: 'loadSprite',
            value: function loadSprite$$1(url, id) {
                return loadSprite(url, id);
            }

            /**
             * Setup multiple instances
             * @param {*} selector
             * @param {object} options
             */

        }, {
            key: 'setup',
            value: function setup(selector) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var targets = null;

                if (is.string(selector)) {
                    targets = Array.from(document.querySelectorAll(selector));
                } else if (is.nodeList(selector)) {
                    targets = Array.from(selector);
                } else if (is.array(selector)) {
                    targets = selector.filter(is.element);
                }

                if (is.empty(targets)) {
                    return null;
                }

                return targets.map(function (t) {
                    return new Plyr(t, options);
                });
            }
        }]);
        return Plyr;
    }();

    Plyr.defaults = cloneDeep(defaults$1);

    return Plyr;

})));

//# sourceMappingURL=plyr.js.map
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBseXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJwbHlyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidHlwZW9mIG5hdmlnYXRvciA9PT0gXCJvYmplY3RcIiAmJiAoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xyXG4gICAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxyXG4gICAgICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgnUGx5cicsIGZhY3RvcnkpIDpcclxuICAgICAgICAgICAgKHdpbmRvdy5QbHlyID0gZmFjdG9yeSgpKTtcclxufSh0aGlzLCAoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBUeXBlIGNoZWNraW5nIHV0aWxzXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHZhciBnZXRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIGdldENvbnN0cnVjdG9yKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ICE9PSBudWxsICYmIHR5cGVvZiBpbnB1dCAhPT0gJ3VuZGVmaW5lZCcgPyBpbnB1dC5jb25zdHJ1Y3RvciA6IG51bGw7XHJcbiAgICB9O1xyXG4gICAgdmFyIGluc3RhbmNlT2YgPSBmdW5jdGlvbiBpbnN0YW5jZU9mKGlucHV0LCBjb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgIHJldHVybiBCb29sZWFuKGlucHV0ICYmIGNvbnN0cnVjdG9yICYmIGlucHV0IGluc3RhbmNlb2YgY29uc3RydWN0b3IpO1xyXG4gICAgfTtcclxuICAgIHZhciBpc051bGxPclVuZGVmaW5lZCA9IGZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09PSBudWxsIHx8IHR5cGVvZiBpbnB1dCA9PT0gJ3VuZGVmaW5lZCc7XHJcbiAgICB9O1xyXG4gICAgdmFyIGlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gZ2V0Q29uc3RydWN0b3IoaW5wdXQpID09PSBPYmplY3Q7XHJcbiAgICB9O1xyXG4gICAgdmFyIGlzTnVtYmVyID0gZnVuY3Rpb24gaXNOdW1iZXIoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gZ2V0Q29uc3RydWN0b3IoaW5wdXQpID09PSBOdW1iZXIgJiYgIU51bWJlci5pc05hTihpbnB1dCk7XHJcbiAgICB9O1xyXG4gICAgdmFyIGlzU3RyaW5nID0gZnVuY3Rpb24gaXNTdHJpbmcoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gZ2V0Q29uc3RydWN0b3IoaW5wdXQpID09PSBTdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgdmFyIGlzQm9vbGVhbiA9IGZ1bmN0aW9uIGlzQm9vbGVhbihpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBnZXRDb25zdHJ1Y3RvcihpbnB1dCkgPT09IEJvb2xlYW47XHJcbiAgICB9O1xyXG4gICAgdmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiBpc0Z1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGdldENvbnN0cnVjdG9yKGlucHV0KSA9PT0gRnVuY3Rpb247XHJcbiAgICB9O1xyXG4gICAgdmFyIGlzQXJyYXkgPSBmdW5jdGlvbiBpc0FycmF5KGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoaW5wdXQpO1xyXG4gICAgfTtcclxuICAgIHZhciBpc1dlYWtNYXAgPSBmdW5jdGlvbiBpc1dlYWtNYXAoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5zdGFuY2VPZihpbnB1dCwgV2Vha01hcCk7XHJcbiAgICB9O1xyXG4gICAgdmFyIGlzTm9kZUxpc3QgPSBmdW5jdGlvbiBpc05vZGVMaXN0KGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlT2YoaW5wdXQsIE5vZGVMaXN0KTtcclxuICAgIH07XHJcbiAgICB2YXIgaXNFbGVtZW50ID0gZnVuY3Rpb24gaXNFbGVtZW50KGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlT2YoaW5wdXQsIEVsZW1lbnQpO1xyXG4gICAgfTtcclxuICAgIHZhciBpc1RleHROb2RlID0gZnVuY3Rpb24gaXNUZXh0Tm9kZShpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBnZXRDb25zdHJ1Y3RvcihpbnB1dCkgPT09IFRleHQ7XHJcbiAgICB9O1xyXG4gICAgdmFyIGlzRXZlbnQgPSBmdW5jdGlvbiBpc0V2ZW50KGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlT2YoaW5wdXQsIEV2ZW50KTtcclxuICAgIH07XHJcbiAgICB2YXIgaXNDdWUgPSBmdW5jdGlvbiBpc0N1ZShpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnN0YW5jZU9mKGlucHV0LCB3aW5kb3cuVGV4dFRyYWNrQ3VlKSB8fCBpbnN0YW5jZU9mKGlucHV0LCB3aW5kb3cuVlRUQ3VlKTtcclxuICAgIH07XHJcbiAgICB2YXIgaXNUcmFjayA9IGZ1bmN0aW9uIGlzVHJhY2soaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5zdGFuY2VPZihpbnB1dCwgVGV4dFRyYWNrKSB8fCAhaXNOdWxsT3JVbmRlZmluZWQoaW5wdXQpICYmIGlzU3RyaW5nKGlucHV0LmtpbmQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgaXNFbXB0eSA9IGZ1bmN0aW9uIGlzRW1wdHkoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaXNOdWxsT3JVbmRlZmluZWQoaW5wdXQpIHx8IChpc1N0cmluZyhpbnB1dCkgfHwgaXNBcnJheShpbnB1dCkgfHwgaXNOb2RlTGlzdChpbnB1dCkpICYmICFpbnB1dC5sZW5ndGggfHwgaXNPYmplY3QoaW5wdXQpICYmICFPYmplY3Qua2V5cyhpbnB1dCkubGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgaXNVcmwgPSBmdW5jdGlvbiBpc1VybChpbnB1dCkge1xyXG4gICAgICAgIC8vIEFjY2VwdCBhIFVSTCBvYmplY3RcclxuICAgICAgICBpZiAoaW5zdGFuY2VPZihpbnB1dCwgd2luZG93LlVSTCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgdGhlIHByb3RvY29sIGlmIHJlcXVpcmVkXHJcbiAgICAgICAgdmFyIHN0cmluZyA9IGlucHV0O1xyXG4gICAgICAgIGlmICghaW5wdXQuc3RhcnRzV2l0aCgnaHR0cDovLycpIHx8ICFpbnB1dC5zdGFydHNXaXRoKCdodHRwczovLycpKSB7XHJcbiAgICAgICAgICAgIHN0cmluZyA9ICdodHRwOi8vJyArIGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuICFpc0VtcHR5KG5ldyBVUkwoc3RyaW5nKS5ob3N0bmFtZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgaXMgPSB7XHJcbiAgICAgICAgbnVsbE9yVW5kZWZpbmVkOiBpc051bGxPclVuZGVmaW5lZCxcclxuICAgICAgICBvYmplY3Q6IGlzT2JqZWN0LFxyXG4gICAgICAgIG51bWJlcjogaXNOdW1iZXIsXHJcbiAgICAgICAgc3RyaW5nOiBpc1N0cmluZyxcclxuICAgICAgICBib29sZWFuOiBpc0Jvb2xlYW4sXHJcbiAgICAgICAgZnVuY3Rpb246IGlzRnVuY3Rpb24sXHJcbiAgICAgICAgYXJyYXk6IGlzQXJyYXksXHJcbiAgICAgICAgd2Vha01hcDogaXNXZWFrTWFwLFxyXG4gICAgICAgIG5vZGVMaXN0OiBpc05vZGVMaXN0LFxyXG4gICAgICAgIGVsZW1lbnQ6IGlzRWxlbWVudCxcclxuICAgICAgICB0ZXh0Tm9kZTogaXNUZXh0Tm9kZSxcclxuICAgICAgICBldmVudDogaXNFdmVudCxcclxuICAgICAgICBjdWU6IGlzQ3VlLFxyXG4gICAgICAgIHRyYWNrOiBpc1RyYWNrLFxyXG4gICAgICAgIHVybDogaXNVcmwsXHJcbiAgICAgICAgZW1wdHk6IGlzRW1wdHlcclxuICAgIH07XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAvLyBDaGVjayBmb3IgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0XHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9FdmVudExpc3RlbmVyT3B0aW9ucy9ibG9iL2doLXBhZ2VzL2V4cGxhaW5lci5tZFxyXG4gICAgLy8gaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1OUE02MTcySjIyZ1xyXG4gICAgdmFyIHN1cHBvcnRzUGFzc2l2ZUxpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBUZXN0IHZpYSBhIGdldHRlciBpbiB0aGUgb3B0aW9ucyBvYmplY3QgdG8gc2VlIGlmIHRoZSBwYXNzaXZlIHByb3BlcnR5IGlzIGFjY2Vzc2VkXHJcbiAgICAgICAgdmFyIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cHBvcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIG9wdGlvbnMpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gRG8gbm90aGluZ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgIH0oKTtcclxuXHJcbiAgICAvLyBUb2dnbGUgZXZlbnQgbGlzdGVuZXJcclxuICAgIGZ1bmN0aW9uIHRvZ2dsZUxpc3RlbmVyKGVsZW1lbnQsIGV2ZW50LCBjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciB0b2dnbGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IGZhbHNlO1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgcGFzc2l2ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogdHJ1ZTtcclxuICAgICAgICB2YXIgY2FwdHVyZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIGFyZ3VtZW50c1s1XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzVdIDogZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEJhaWwgaWYgbm8gZWxlbWVudCwgZXZlbnQsIG9yIGNhbGxiYWNrXHJcbiAgICAgICAgaWYgKCFlbGVtZW50IHx8ICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIGVsZW1lbnQpIHx8IGlzLmVtcHR5KGV2ZW50KSB8fCAhaXMuZnVuY3Rpb24oY2FsbGJhY2spKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFsbG93IG11bHRpcGxlIGV2ZW50c1xyXG4gICAgICAgIHZhciBldmVudHMgPSBldmVudC5zcGxpdCgnICcpO1xyXG5cclxuICAgICAgICAvLyBCdWlsZCBvcHRpb25zXHJcbiAgICAgICAgLy8gRGVmYXVsdCB0byBqdXN0IHRoZSBjYXB0dXJlIGJvb2xlYW4gZm9yIGJyb3dzZXJzIHdpdGggbm8gcGFzc2l2ZSBsaXN0ZW5lciBzdXBwb3J0XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBjYXB0dXJlO1xyXG5cclxuICAgICAgICAvLyBJZiBwYXNzaXZlIGV2ZW50cyBsaXN0ZW5lcnMgYXJlIHN1cHBvcnRlZFxyXG4gICAgICAgIGlmIChzdXBwb3J0c1Bhc3NpdmVMaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIC8vIFdoZXRoZXIgdGhlIGxpc3RlbmVyIGNhbiBiZSBwYXNzaXZlIChpLmUuIGRlZmF1bHQgbmV2ZXIgcHJldmVudGVkKVxyXG4gICAgICAgICAgICAgICAgcGFzc2l2ZTogcGFzc2l2ZSxcclxuICAgICAgICAgICAgICAgIC8vIFdoZXRoZXIgdGhlIGxpc3RlbmVyIGlzIGEgY2FwdHVyaW5nIGxpc3RlbmVyIG9yIG5vdFxyXG4gICAgICAgICAgICAgICAgY2FwdHVyZTogY2FwdHVyZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgYSBzaW5nbGUgbm9kZSBpcyBwYXNzZWQsIGJpbmQgdGhlIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgICAgaWYgKF90aGlzICYmIF90aGlzLmV2ZW50TGlzdGVuZXJzICYmIHRvZ2dsZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2FjaGUgZXZlbnQgbGlzdGVuZXJcclxuICAgICAgICAgICAgICAgIF90aGlzLmV2ZW50TGlzdGVuZXJzLnB1c2goeyBlbGVtZW50OiBlbGVtZW50LCB0eXBlOiB0eXBlLCBjYWxsYmFjazogY2FsbGJhY2ssIG9wdGlvbnM6IG9wdGlvbnMgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnRbdG9nZ2xlID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInXSh0eXBlLCBjYWxsYmFjaywgb3B0aW9ucyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmluZCBldmVudCBoYW5kbGVyXHJcbiAgICBmdW5jdGlvbiBvbihlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzJdO1xyXG4gICAgICAgIHZhciBwYXNzaXZlID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiB0cnVlO1xyXG4gICAgICAgIHZhciBjYXB0dXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiBmYWxzZTtcclxuXHJcbiAgICAgICAgdG9nZ2xlTGlzdGVuZXIuY2FsbCh0aGlzLCBlbGVtZW50LCBldmVudHMsIGNhbGxiYWNrLCB0cnVlLCBwYXNzaXZlLCBjYXB0dXJlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVbmJpbmQgZXZlbnQgaGFuZGxlclxyXG4gICAgZnVuY3Rpb24gb2ZmKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgZXZlbnRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnJztcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMl07XHJcbiAgICAgICAgdmFyIHBhc3NpdmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHRydWU7XHJcbiAgICAgICAgdmFyIGNhcHR1cmUgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IGZhbHNlO1xyXG5cclxuICAgICAgICB0b2dnbGVMaXN0ZW5lci5jYWxsKHRoaXMsIGVsZW1lbnQsIGV2ZW50cywgY2FsbGJhY2ssIGZhbHNlLCBwYXNzaXZlLCBjYXB0dXJlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCaW5kIG9uY2Utb25seSBldmVudCBoYW5kbGVyXHJcbiAgICBmdW5jdGlvbiBvbmNlKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgZXZlbnRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnJztcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMl07XHJcbiAgICAgICAgdmFyIHBhc3NpdmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHRydWU7XHJcbiAgICAgICAgdmFyIGNhcHR1cmUgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IGZhbHNlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKSB7XHJcbiAgICAgICAgICAgIG9mZihlbGVtZW50LCBldmVudHMsIG9uY2VDYWxsYmFjaywgcGFzc2l2ZSwgY2FwdHVyZSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xyXG4gICAgICAgICAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2dnbGVMaXN0ZW5lci5jYWxsKHRoaXMsIGVsZW1lbnQsIGV2ZW50cywgb25jZUNhbGxiYWNrLCB0cnVlLCBwYXNzaXZlLCBjYXB0dXJlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUcmlnZ2VyIGV2ZW50XHJcbiAgICBmdW5jdGlvbiB0cmlnZ2VyRXZlbnQoZWxlbWVudCkge1xyXG4gICAgICAgIHZhciB0eXBlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnJztcclxuICAgICAgICB2YXIgYnViYmxlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XHJcbiAgICAgICAgdmFyIGRldGFpbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge307XHJcblxyXG4gICAgICAgIC8vIEJhaWwgaWYgbm8gZWxlbWVudFxyXG4gICAgICAgIGlmICghaXMuZWxlbWVudChlbGVtZW50KSB8fCBpcy5lbXB0eSh0eXBlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYW5kIGRpc3BhdGNoIHRoZSBldmVudFxyXG4gICAgICAgIHZhciBldmVudCA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XHJcbiAgICAgICAgICAgIGJ1YmJsZXM6IGJ1YmJsZXMsXHJcbiAgICAgICAgICAgIGRldGFpbDogT2JqZWN0LmFzc2lnbih7fSwgZGV0YWlsLCB7XHJcbiAgICAgICAgICAgICAgICBwbHlyOiB0aGlzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIERpc3BhdGNoIHRoZSBldmVudFxyXG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVW5iaW5kIGFsbCBjYWNoZWQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICBmdW5jdGlvbiB1bmJpbmRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMgJiYgdGhpcy5ldmVudExpc3RlbmVycykge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gaXRlbS5lbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBpdGVtLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBpdGVtLmNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBpdGVtLm9wdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJ1biBtZXRob2Qgd2hlbiAvIGlmIHBsYXllciBpcyByZWFkeVxyXG4gICAgZnVuY3Rpb24gcmVhZHkoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXMyLnJlYWR5ID8gc2V0VGltZW91dChyZXNvbHZlLCAwKSA6IG9uLmNhbGwoX3RoaXMyLCBfdGhpczIuZWxlbWVudHMuY29udGFpbmVyLCAncmVhZHknLCByZXNvbHZlKTtcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xyXG4gICAgICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcclxuICAgICAgICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xyXG4gICAgICAgIH07XHJcbiAgICB9KCk7XHJcblxyXG4gICAgdmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xyXG4gICAgICAgICAgICB2YXIgX2FyciA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgX24gPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgX2QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIF9lID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgX2QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgX2UgPSBlcnI7XHJcbiAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XHJcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBfYXJyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KCk7XHJcblxyXG4gICAgdmFyIHRvQ29uc3VtYWJsZUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhcnIyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5mcm9tKGFycik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8vIFdyYXAgYW4gZWxlbWVudFxyXG4gICAgZnVuY3Rpb24gd3JhcChlbGVtZW50cywgd3JhcHBlcikge1xyXG4gICAgICAgIC8vIENvbnZlcnQgYGVsZW1lbnRzYCB0byBhbiBhcnJheSwgaWYgbmVjZXNzYXJ5LlxyXG4gICAgICAgIHZhciB0YXJnZXRzID0gZWxlbWVudHMubGVuZ3RoID8gZWxlbWVudHMgOiBbZWxlbWVudHNdO1xyXG5cclxuICAgICAgICAvLyBMb29wcyBiYWNrd2FyZHMgdG8gcHJldmVudCBoYXZpbmcgdG8gY2xvbmUgdGhlIHdyYXBwZXIgb24gdGhlXHJcbiAgICAgICAgLy8gZmlyc3QgZWxlbWVudCAoc2VlIGBjaGlsZGAgYmVsb3cpLlxyXG4gICAgICAgIEFycmF5LmZyb20odGFyZ2V0cykucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGluZGV4ID4gMCA/IHdyYXBwZXIuY2xvbmVOb2RlKHRydWUpIDogd3JhcHBlcjtcclxuXHJcbiAgICAgICAgICAgIC8vIENhY2hlIHRoZSBjdXJyZW50IHBhcmVudCBhbmQgc2libGluZy5cclxuICAgICAgICAgICAgdmFyIHBhcmVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgdmFyIHNpYmxpbmcgPSBlbGVtZW50Lm5leHRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgLy8gV3JhcCB0aGUgZWxlbWVudCAoaXMgYXV0b21hdGljYWxseSByZW1vdmVkIGZyb20gaXRzIGN1cnJlbnRcclxuICAgICAgICAgICAgLy8gcGFyZW50KS5cclxuICAgICAgICAgICAgY2hpbGQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGUgZWxlbWVudCBoYWQgYSBzaWJsaW5nLCBpbnNlcnQgdGhlIHdyYXBwZXIgYmVmb3JlXHJcbiAgICAgICAgICAgIC8vIHRoZSBzaWJsaW5nIHRvIG1haW50YWluIHRoZSBIVE1MIHN0cnVjdHVyZTsgb3RoZXJ3aXNlLCBqdXN0XHJcbiAgICAgICAgICAgIC8vIGFwcGVuZCBpdCB0byB0aGUgcGFyZW50LlxyXG4gICAgICAgICAgICBpZiAoc2libGluZykge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgc2libGluZyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IGF0dHJpYnV0ZXNcclxuICAgIGZ1bmN0aW9uIHNldEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlcykge1xyXG4gICAgICAgIGlmICghaXMuZWxlbWVudChlbGVtZW50KSB8fCBpcy5lbXB0eShhdHRyaWJ1dGVzKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBc3N1bWUgbnVsbCBhbmQgdW5kZWZpbmVkIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGxlZnQgb3V0LFxyXG4gICAgICAgIC8vIFNldHRpbmcgdGhlbSB3b3VsZCBvdGhlcndpc2UgY29udmVydCB0aGVtIHRvIFwibnVsbFwiIGFuZCBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykuZmlsdGVyKGZ1bmN0aW9uIChfcmVmKSB7XHJcbiAgICAgICAgICAgIHZhciBfcmVmMiA9IHNsaWNlZFRvQXJyYXkoX3JlZiwgMiksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IF9yZWYyWzFdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICFpcy5udWxsT3JVbmRlZmluZWQodmFsdWUpO1xyXG4gICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XHJcbiAgICAgICAgICAgIHZhciBfcmVmNCA9IHNsaWNlZFRvQXJyYXkoX3JlZjMsIDIpLFxyXG4gICAgICAgICAgICAgICAga2V5ID0gX3JlZjRbMF0sXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IF9yZWY0WzFdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZSBhIERvY3VtZW50RnJhZ21lbnRcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgYXR0cmlidXRlcywgdGV4dCkge1xyXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyA8ZWxlbWVudD5cclxuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XHJcblxyXG4gICAgICAgIC8vIFNldCBhbGwgcGFzc2VkIGF0dHJpYnV0ZXNcclxuICAgICAgICBpZiAoaXMub2JqZWN0KGF0dHJpYnV0ZXMpKSB7XHJcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgdGV4dCBub2RlXHJcbiAgICAgICAgaWYgKGlzLnN0cmluZyh0ZXh0KSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gYnVpbHQgZWxlbWVudFxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluYWVydCBhbiBlbGVtZW50IGFmdGVyIGFub3RoZXJcclxuICAgIGZ1bmN0aW9uIGluc2VydEFmdGVyKGVsZW1lbnQsIHRhcmdldCkge1xyXG4gICAgICAgIHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbGVtZW50LCB0YXJnZXQubmV4dFNpYmxpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluc2VydCBhIERvY3VtZW50RnJhZ21lbnRcclxuICAgIGZ1bmN0aW9uIGluc2VydEVsZW1lbnQodHlwZSwgcGFyZW50LCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XHJcbiAgICAgICAgLy8gSW5qZWN0IHRoZSBuZXcgPGVsZW1lbnQ+XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQodHlwZSwgYXR0cmlidXRlcywgdGV4dCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBlbGVtZW50KHMpXHJcbiAgICBmdW5jdGlvbiByZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoaXMubm9kZUxpc3QoZWxlbWVudCkgfHwgaXMuYXJyYXkoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShlbGVtZW50KS5mb3JFYWNoKHJlbW92ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzLmVsZW1lbnQoZWxlbWVudCkgfHwgIWlzLmVsZW1lbnQoZWxlbWVudC5wYXJlbnROb2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFsbCBjaGlsZCBlbGVtZW50c1xyXG4gICAgZnVuY3Rpb24gZW1wdHlFbGVtZW50KGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDtcclxuXHJcblxyXG4gICAgICAgIHdoaWxlIChsZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5sYXN0Q2hpbGQpO1xyXG4gICAgICAgICAgICBsZW5ndGggLT0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVwbGFjZSBlbGVtZW50XHJcbiAgICBmdW5jdGlvbiByZXBsYWNlRWxlbWVudChuZXdDaGlsZCwgb2xkQ2hpbGQpIHtcclxuICAgICAgICBpZiAoIWlzLmVsZW1lbnQob2xkQ2hpbGQpIHx8ICFpcy5lbGVtZW50KG9sZENoaWxkLnBhcmVudE5vZGUpIHx8ICFpcy5lbGVtZW50KG5ld0NoaWxkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9sZENoaWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0NoaWxkLCBvbGRDaGlsZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdDaGlsZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZXQgYW4gYXR0cmlidXRlIG9iamVjdCBmcm9tIGEgc3RyaW5nIHNlbGVjdG9yXHJcbiAgICBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVzRnJvbVNlbGVjdG9yKHNlbCwgZXhpc3RpbmdBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgLy8gRm9yIGV4YW1wbGU6XHJcbiAgICAgICAgLy8gJy50ZXN0JyB0byB7IGNsYXNzOiAndGVzdCcgfVxyXG4gICAgICAgIC8vICcjdGVzdCcgdG8geyBpZDogJ3Rlc3QnIH1cclxuICAgICAgICAvLyAnW2RhdGEtdGVzdD1cInRlc3RcIl0nIHRvIHsgJ2RhdGEtdGVzdCc6ICd0ZXN0JyB9XHJcblxyXG4gICAgICAgIGlmICghaXMuc3RyaW5nKHNlbCkgfHwgaXMuZW1wdHkoc2VsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHt9O1xyXG4gICAgICAgIHZhciBleGlzdGluZyA9IGV4aXN0aW5nQXR0cmlidXRlcztcclxuXHJcbiAgICAgICAgc2VsLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAocykge1xyXG4gICAgICAgICAgICAvLyBSZW1vdmUgd2hpdGVzcGFjZVxyXG4gICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSBzLnRyaW0oKTtcclxuICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHNlbGVjdG9yLnJlcGxhY2UoJy4nLCAnJyk7XHJcbiAgICAgICAgICAgIHZhciBzdHJpcHBlZCA9IHNlbGVjdG9yLnJlcGxhY2UoL1tbXFxdXS9nLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHBhcnRzIGFuZCB2YWx1ZVxyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBzdHJpcHBlZC5zcGxpdCgnPScpO1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gcGFydHNbMF07XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmxlbmd0aCA+IDEgPyBwYXJ0c1sxXS5yZXBsYWNlKC9bXCInXS9nLCAnJykgOiAnJztcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3QgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJy4nOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0byBleGlzdGluZyBjbGFzc25hbWVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXMub2JqZWN0KGV4aXN0aW5nKSAmJiBpcy5zdHJpbmcoZXhpc3RpbmcuY2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmNsYXNzICs9ICcgJyArIGNsYXNzTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgPSBjbGFzc05hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSUQgc2VsZWN0b3JcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmlkID0gc2VsZWN0b3IucmVwbGFjZSgnIycsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdbJzpcclxuICAgICAgICAgICAgICAgICAgICAvLyBBdHRyaWJ1dGUgc2VsZWN0b3JcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2tleV0gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gYXR0cmlidXRlcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBUb2dnbGUgaGlkZGVuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVIaWRkZW4oZWxlbWVudCwgaGlkZGVuKSB7XHJcbiAgICAgICAgaWYgKCFpcy5lbGVtZW50KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBoaWRlID0gaGlkZGVuO1xyXG5cclxuICAgICAgICBpZiAoIWlzLmJvb2xlYW4oaGlkZSkpIHtcclxuICAgICAgICAgICAgaGlkZSA9ICFlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGlkZSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaGlkZGVuJywgJycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWlycm9yIEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSwgd2l0aCBJRSBjb21wYXRpYmlsaXR5IGZvciBcImZvcmNlXCIgYXJndW1lbnRcclxuICAgIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSwgZm9yY2UpIHtcclxuICAgICAgICBpZiAoaXMuZWxlbWVudChlbGVtZW50KSkge1xyXG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gJ3RvZ2dsZSc7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm9yY2UgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBmb3JjZSA/ICdhZGQnIDogJ3JlbW92ZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0W21ldGhvZF0oY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYXMgY2xhc3MgbmFtZVxyXG4gICAgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzLmVsZW1lbnQoZWxlbWVudCkgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBFbGVtZW50IG1hdGNoZXMgc2VsZWN0b3JcclxuICAgIGZ1bmN0aW9uIG1hdGNoZXMoZWxlbWVudCwgc2VsZWN0b3IpIHtcclxuICAgICAgICB2YXIgcHJvdG90eXBlID0geyBFbGVtZW50OiBFbGVtZW50IH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1hdGNoKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkuaW5jbHVkZXModGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbWF0Y2hlcyA9IHByb3RvdHlwZS5tYXRjaGVzIHx8IHByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgcHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBwcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgbWF0Y2g7XHJcblxyXG4gICAgICAgIHJldHVybiBtYXRjaGVzLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZpbmQgYWxsIGVsZW1lbnRzXHJcbiAgICBmdW5jdGlvbiBnZXRFbGVtZW50cyhzZWxlY3Rvcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGaW5kIGEgc2luZ2xlIGVsZW1lbnRcclxuICAgIGZ1bmN0aW9uIGdldEVsZW1lbnQoc2VsZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5jb250YWluZXIucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHRoZSBmb2N1c2VkIGVsZW1lbnRcclxuICAgIGZ1bmN0aW9uIGdldEZvY3VzRWxlbWVudCgpIHtcclxuICAgICAgICB2YXIgZm9jdXNlZCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGlmICghZm9jdXNlZCB8fCBmb2N1c2VkID09PSBkb2N1bWVudC5ib2R5KSB7XHJcbiAgICAgICAgICAgIGZvY3VzZWQgPSBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvY3VzZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6Zm9jdXMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb2N1c2VkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRyYXAgZm9jdXMgaW5zaWRlIGNvbnRhaW5lclxyXG4gICAgZnVuY3Rpb24gdHJhcEZvY3VzKCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xyXG4gICAgICAgIHZhciB0b2dnbGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoIWlzLmVsZW1lbnQoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGZvY3VzYWJsZSA9IGdldEVsZW1lbnRzLmNhbGwodGhpcywgJ2J1dHRvbjpub3QoOmRpc2FibGVkKSwgaW5wdXQ6bm90KDpkaXNhYmxlZCksIFt0YWJpbmRleF0nKTtcclxuICAgICAgICB2YXIgZmlyc3QgPSBmb2N1c2FibGVbMF07XHJcbiAgICAgICAgdmFyIGxhc3QgPSBmb2N1c2FibGVbZm9jdXNhYmxlLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgICB2YXIgdHJhcCA9IGZ1bmN0aW9uIHRyYXAoZXZlbnQpIHtcclxuICAgICAgICAgICAgLy8gQmFpbCBpZiBub3QgdGFiIGtleSBvciBub3QgZnVsbHNjcmVlblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ICE9PSAnVGFiJyB8fCBldmVudC5rZXlDb2RlICE9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBmb2N1c2VkIGVsZW1lbnRcclxuICAgICAgICAgICAgdmFyIGZvY3VzZWQgPSBnZXRGb2N1c0VsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmb2N1c2VkID09PSBsYXN0ICYmICFldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTW92ZSBmb2N1cyB0byBmaXJzdCBlbGVtZW50IHRoYXQgY2FuIGJlIHRhYmJlZCBpZiBTaGlmdCBpc24ndCB1c2VkXHJcbiAgICAgICAgICAgICAgICBmaXJzdC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmb2N1c2VkID09PSBmaXJzdCAmJiBldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTW92ZSBmb2N1cyB0byBsYXN0IGVsZW1lbnQgdGhhdCBjYW4gYmUgdGFiYmVkIGlmIFNoaWZ0IGlzIHVzZWRcclxuICAgICAgICAgICAgICAgIGxhc3QuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0b2dnbGVMaXN0ZW5lci5jYWxsKHRoaXMsIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLCAna2V5ZG93bicsIHRyYXAsIHRvZ2dsZSwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgdmFyIHRyYW5zaXRpb25FbmRFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IHtcclxuICAgICAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxyXG4gICAgICAgICAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXHJcbiAgICAgICAgICAgIE9UcmFuc2l0aW9uOiAnb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQnLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgdHlwZSA9IE9iamVjdC5rZXlzKGV2ZW50cykuZmluZChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc3R5bGVbZXZlbnRdICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpcy5zdHJpbmcodHlwZSkgPyBldmVudHNbdHlwZV0gOiBmYWxzZTtcclxuICAgIH0oKTtcclxuXHJcbiAgICAvLyBGb3JjZSByZXBhaW50IG9mIGVsZW1lbnRcclxuICAgIGZ1bmN0aW9uIHJlcGFpbnQoZWxlbWVudCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0b2dnbGVIaWRkZW4oZWxlbWVudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQub2Zmc2V0SGVpZ2h0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgICAgIHRvZ2dsZUhpZGRlbihlbGVtZW50LCBmYWxzZSk7XHJcbiAgICAgICAgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIEJyb3dzZXIgc25pZmZpbmdcclxuICAgIC8vIFVuZm9ydHVuYXRlbHksIGR1ZSB0byBtaXhlZCBzdXBwb3J0LCBVQSBzbmlmZmluZyBpcyByZXF1aXJlZFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB2YXIgYnJvd3NlciA9IHtcclxuICAgICAgICBpc0lFOiAvKiBAY2Nfb24hQCAqLyEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlLFxyXG4gICAgICAgIGlzV2Via2l0OiAnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmICEvRWRnZS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxcclxuICAgICAgICBpc0lQaG9uZTogLyhpUGhvbmV8aVBvZCkvZ2kudGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pLFxyXG4gICAgICAgIGlzSW9zOiAvKGlQYWR8aVBob25lfGlQb2QpL2dpLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8vIERlZmF1bHQgY29kZWNzIGZvciBjaGVja2luZyBtaW1ldHlwZSBzdXBwb3J0XHJcbiAgICB2YXIgZGVmYXVsdENvZGVjcyA9IHtcclxuICAgICAgICAnYXVkaW8vb2dnJzogJ3ZvcmJpcycsXHJcbiAgICAgICAgJ2F1ZGlvL3dhdic6ICcxJyxcclxuICAgICAgICAndmlkZW8vd2VibSc6ICd2cDgsIHZvcmJpcycsXHJcbiAgICAgICAgJ3ZpZGVvL21wNCc6ICdhdmMxLjQyRTAxRSwgbXA0YS40MC4yJyxcclxuICAgICAgICAndmlkZW8vb2dnJzogJ3RoZW9yYSdcclxuICAgIH07XHJcblxyXG4gICAgLy8gQ2hlY2sgZm9yIGZlYXR1cmUgc3VwcG9ydFxyXG4gICAgdmFyIHN1cHBvcnQgPSB7XHJcbiAgICAgICAgLy8gQmFzaWMgc3VwcG9ydFxyXG4gICAgICAgIGF1ZGlvOiAnY2FuUGxheVR5cGUnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyksXHJcbiAgICAgICAgdmlkZW86ICdjYW5QbGF5VHlwZScgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKSxcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHN1cHBvcnRcclxuICAgICAgICAvLyBCYXNpYyBmdW5jdGlvbmFsaXR5IHZzIGZ1bGwgVUlcclxuICAgICAgICBjaGVjazogZnVuY3Rpb24gY2hlY2sodHlwZSwgcHJvdmlkZXIsIHBsYXlzaW5saW5lKSB7XHJcbiAgICAgICAgICAgIHZhciBjYW5QbGF5SW5saW5lID0gYnJvd3Nlci5pc0lQaG9uZSAmJiBwbGF5c2lubGluZSAmJiBzdXBwb3J0LnBsYXlzaW5saW5lO1xyXG4gICAgICAgICAgICB2YXIgYXBpID0gc3VwcG9ydFt0eXBlXSB8fCBwcm92aWRlciAhPT0gJ2h0bWw1JztcclxuICAgICAgICAgICAgdmFyIHVpID0gYXBpICYmIHN1cHBvcnQucmFuZ2VJbnB1dCAmJiAodHlwZSAhPT0gJ3ZpZGVvJyB8fCAhYnJvd3Nlci5pc0lQaG9uZSB8fCBjYW5QbGF5SW5saW5lKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBhcGk6IGFwaSxcclxuICAgICAgICAgICAgICAgIHVpOiB1aVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBQaWN0dXJlLWluLXBpY3R1cmUgc3VwcG9ydFxyXG4gICAgICAgIC8vIFNhZmFyaSBvbmx5IGN1cnJlbnRseVxyXG4gICAgICAgIHBpcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gIWJyb3dzZXIuaXNJUGhvbmUgJiYgaXMuZnVuY3Rpb24oY3JlYXRlRWxlbWVudCgndmlkZW8nKS53ZWJraXRTZXRQcmVzZW50YXRpb25Nb2RlKTtcclxuICAgICAgICB9KCksXHJcblxyXG4gICAgICAgIC8vIEFpcnBsYXkgc3VwcG9ydFxyXG4gICAgICAgIC8vIFNhZmFyaSBvbmx5IGN1cnJlbnRseVxyXG4gICAgICAgIGFpcnBsYXk6IGlzLmZ1bmN0aW9uKHdpbmRvdy5XZWJLaXRQbGF5YmFja1RhcmdldEF2YWlsYWJpbGl0eUV2ZW50KSxcclxuXHJcbiAgICAgICAgLy8gSW5saW5lIHBsYXliYWNrIHN1cHBvcnRcclxuICAgICAgICAvLyBodHRwczovL3dlYmtpdC5vcmcvYmxvZy82Nzg0L25ldy12aWRlby1wb2xpY2llcy1mb3ItaW9zL1xyXG4gICAgICAgIHBsYXlzaW5saW5lOiAncGxheXNJbmxpbmUnIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyksXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBtaW1lIHR5cGUgc3VwcG9ydCBhZ2FpbnN0IGEgcGxheWVyIGluc3RhbmNlXHJcbiAgICAgICAgLy8gQ3JlZGl0czogaHR0cDovL2RpdmVpbnRvaHRtbDUuaW5mby9ldmVyeXRoaW5nLmh0bWxcclxuICAgICAgICAvLyBSZWxhdGVkOiBodHRwOi8vd3d3LmxlYW5iYWNrcGxheWVyLmNvbS90ZXN0L2g1bXQuaHRtbFxyXG4gICAgICAgIG1pbWU6IGZ1bmN0aW9uIG1pbWUoaW5wdXRUeXBlKSB7XHJcbiAgICAgICAgICAgIHZhciBfaW5wdXRUeXBlJHNwbGl0ID0gaW5wdXRUeXBlLnNwbGl0KCcvJyksXHJcbiAgICAgICAgICAgICAgICBfaW5wdXRUeXBlJHNwbGl0MiA9IHNsaWNlZFRvQXJyYXkoX2lucHV0VHlwZSRzcGxpdCwgMSksXHJcbiAgICAgICAgICAgICAgICBtZWRpYVR5cGUgPSBfaW5wdXRUeXBlJHNwbGl0MlswXTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0hUTUw1IHx8IG1lZGlhVHlwZSAhPT0gdGhpcy50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gdm9pZCAwO1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRUeXBlICYmIGlucHV0VHlwZS5pbmNsdWRlcygnY29kZWNzPScpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVc2UgaW5wdXQgZGlyZWN0bHlcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBpbnB1dFR5cGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXRUeXBlID09PSAnYXVkaW8vbXBlZycpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNraXAgY29kZWNcclxuICAgICAgICAgICAgICAgIHR5cGUgPSAnYXVkaW8vbXBlZzsnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlucHV0VHlwZSBpbiBkZWZhdWx0Q29kZWNzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVc2UgY29kZWNcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBpbnB1dFR5cGUgKyAnOyBjb2RlY3M9XCInICsgZGVmYXVsdENvZGVjc1tpbnB1dFR5cGVdICsgJ1wiJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHR5cGUgJiYgdGhpcy5tZWRpYS5jYW5QbGF5VHlwZSh0eXBlKS5yZXBsYWNlKC9uby8sICcnKSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciB0ZXh0VHJhY2tzIHN1cHBvcnRcclxuICAgICAgICB0ZXh0VHJhY2tzOiAndGV4dFRyYWNrcycgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKSxcclxuXHJcbiAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJyYW5nZVwiPiBTbGlkZXJzXHJcbiAgICAgICAgcmFuZ2VJbnB1dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgICAgICByYW5nZS50eXBlID0gJ3JhbmdlJztcclxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlLnR5cGUgPT09ICdyYW5nZSc7XHJcbiAgICAgICAgfSgpLFxyXG5cclxuICAgICAgICAvLyBUb3VjaFxyXG4gICAgICAgIC8vIE5PVEU6IFJlbWVtYmVyIGEgZGV2aWNlIGNhbiBiZSBtb3VzZSArIHRvdWNoIGVuYWJsZWQgc28gd2UgY2hlY2sgb24gZmlyc3QgdG91Y2ggZXZlbnRcclxuICAgICAgICB0b3VjaDogJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG5cclxuICAgICAgICAvLyBEZXRlY3QgdHJhbnNpdGlvbnMgc3VwcG9ydFxyXG4gICAgICAgIHRyYW5zaXRpb25zOiB0cmFuc2l0aW9uRW5kRXZlbnQgIT09IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBSZWR1Y2VkIG1vdGlvbiBpT1MgJiBNYWNPUyBzZXR0aW5nXHJcbiAgICAgICAgLy8gaHR0cHM6Ly93ZWJraXQub3JnL2Jsb2cvNzU1MS9yZXNwb25zaXZlLWRlc2lnbi1mb3ItbW90aW9uL1xyXG4gICAgICAgIHJlZHVjZWRNb3Rpb246ICdtYXRjaE1lZGlhJyBpbiB3aW5kb3cgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uKScpLm1hdGNoZXNcclxuICAgIH07XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB2YXIgaHRtbDUgPSB7XHJcbiAgICAgICAgZ2V0U291cmNlczogZnVuY3Rpb24gZ2V0U291cmNlcygpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0hUTUw1KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzb3VyY2VzID0gQXJyYXkuZnJvbSh0aGlzLm1lZGlhLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NvdXJjZScpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgdW5zdXBwb3J0ZWQgc291cmNlc1xyXG4gICAgICAgICAgICByZXR1cm4gc291cmNlcy5maWx0ZXIoZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnQubWltZS5jYWxsKF90aGlzLCBzb3VyY2UuZ2V0QXR0cmlidXRlKCd0eXBlJykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gR2V0IHF1YWxpdHkgbGV2ZWxzXHJcbiAgICAgICAgZ2V0UXVhbGl0eU9wdGlvbnM6IGZ1bmN0aW9uIGdldFF1YWxpdHlPcHRpb25zKCkge1xyXG4gICAgICAgICAgICAvLyBHZXQgc2l6ZXMgZnJvbSA8c291cmNlPiBlbGVtZW50c1xyXG4gICAgICAgICAgICByZXR1cm4gaHRtbDUuZ2V0U291cmNlcy5jYWxsKHRoaXMpLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHNvdXJjZS5nZXRBdHRyaWJ1dGUoJ3NpemUnKSk7XHJcbiAgICAgICAgICAgIH0pLmZpbHRlcihCb29sZWFuKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGV4dGVuZDogZnVuY3Rpb24gZXh0ZW5kKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNIVE1MNSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIFF1YWxpdHlcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBsYXllci5tZWRpYSwgJ3F1YWxpdHknLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgc291cmNlc1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VzID0gaHRtbDUuZ2V0U291cmNlcy5jYWxsKHBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXMuZmluZChmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2UuZ2V0QXR0cmlidXRlKCdzcmMnKSA9PT0gcGxheWVyLnNvdXJjZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHNpemUsIGlmIG1hdGNoIGlzIGZvdW5kXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZSAmJiBOdW1iZXIoc291cmNlLmdldEF0dHJpYnV0ZSgnc2l6ZScpKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBzb3VyY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZXMgPSBodG1sNS5nZXRTb3VyY2VzLmNhbGwocGxheWVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGZpcnN0IG1hdGNoIGZvciByZXF1ZXN0ZWQgc2l6ZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzLmZpbmQoZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHNvdXJjZS5nZXRBdHRyaWJ1dGUoJ3NpemUnKSkgPT09IGlucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBObyBtYXRjaGluZyBzb3VyY2UgZm91bmRcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgY3VycmVudCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfcGxheWVyJG1lZGlhID0gcGxheWVyLm1lZGlhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGltZSA9IF9wbGF5ZXIkbWVkaWEuY3VycmVudFRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdXNlZCA9IF9wbGF5ZXIkbWVkaWEucGF1c2VkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkID0gX3BsYXllciRtZWRpYS5wcmVsb2FkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkeVN0YXRlID0gX3BsYXllciRtZWRpYS5yZWFkeVN0YXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgbmV3IHNvdXJjZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubWVkaWEuc3JjID0gc291cmNlLmdldEF0dHJpYnV0ZSgnc3JjJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgbG9hZGluZyBpZiBwcmVsb2FkPVwibm9uZVwiIGFuZCB0aGUgY3VycmVudCBzb3VyY2UgaXNuJ3QgbG9hZGVkICgjMTA0NClcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJlbG9hZCAhPT0gJ25vbmUnIHx8IHJlYWR5U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzdG9yZSB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5vbmNlKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3VtZSBwbGF5aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG9hZCBuZXcgc291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGNoYW5nZSBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAncXVhbGl0eWNoYW5nZScsIGZhbHNlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHk6IGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBDYW5jZWwgY3VycmVudCBuZXR3b3JrIHJlcXVlc3RzXHJcbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zYW1wb3R0cy9wbHlyL2lzc3Vlcy8xNzRcclxuICAgICAgICBjYW5jZWxSZXF1ZXN0czogZnVuY3Rpb24gY2FuY2VsUmVxdWVzdHMoKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0hUTUw1KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBjaGlsZCBzb3VyY2VzXHJcbiAgICAgICAgICAgIHJlbW92ZUVsZW1lbnQoaHRtbDUuZ2V0U291cmNlcy5jYWxsKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBibGFuayB2aWRlbyBzcmMgYXR0cmlidXRlXHJcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdG8gcHJldmVudCBhIE1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRCBlcnJvclxyXG4gICAgICAgICAgICAvLyBJbmZvOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMyMjMxNTc5L2hvdy10by1wcm9wZXJseS1kaXNwb3NlLW9mLWFuLWh0bWw1LXZpZGVvLWFuZC1jbG9zZS1zb2NrZXQtb3ItY29ubmVjdGlvblxyXG4gICAgICAgICAgICB0aGlzLm1lZGlhLnNldEF0dHJpYnV0ZSgnc3JjJywgdGhpcy5jb25maWcuYmxhbmtWaWRlbyk7XHJcblxyXG4gICAgICAgICAgICAvLyBMb2FkIHRoZSBuZXcgZW1wdHkgc291cmNlXHJcbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBjYW5jZWwgZXhpc3RpbmcgcmVxdWVzdHNcclxuICAgICAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zYW1wb3R0cy9wbHlyL2lzc3Vlcy8xNzRcclxuICAgICAgICAgICAgdGhpcy5tZWRpYS5sb2FkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEZWJ1Z2dpbmdcclxuICAgICAgICAgICAgdGhpcy5kZWJ1Zy5sb2coJ0NhbmNlbGxlZCBuZXR3b3JrIHJlcXVlc3RzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8vIENsb25lIG5lc3RlZCBvYmplY3RzXHJcbiAgICBmdW5jdGlvbiBjbG9uZURlZXAob2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IGEgbmVzdGVkIHZhbHVlIGluIGFuIG9iamVjdFxyXG4gICAgZnVuY3Rpb24gZ2V0RGVlcChvYmplY3QsIHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5zcGxpdCgnLicpLnJlZHVjZShmdW5jdGlvbiAob2JqLCBrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmpba2V5XTtcclxuICAgICAgICB9LCBvYmplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERlZXAgZXh0ZW5kIGRlc3RpbmF0aW9uIG9iamVjdCB3aXRoIE4gbW9yZSBvYmplY3RzXHJcbiAgICBmdW5jdGlvbiBleHRlbmQoKSB7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XHJcblxyXG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzb3VyY2VzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xyXG4gICAgICAgICAgICBzb3VyY2VzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc291cmNlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzLnNoaWZ0KCk7XHJcblxyXG4gICAgICAgIGlmICghaXMub2JqZWN0KHNvdXJjZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChpcy5vYmplY3Qoc291cmNlW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRhcmdldCkuaW5jbHVkZXMoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBkZWZpbmVQcm9wZXJ0eSh7fSwga2V5LCB7fSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV4dGVuZCh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIGRlZmluZVByb3BlcnR5KHt9LCBrZXksIHNvdXJjZVtrZXldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZC5hcHBseSh1bmRlZmluZWQsIFt0YXJnZXRdLmNvbmNhdChzb3VyY2VzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBhIHJhbmRvbSBJRFxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVJZChwcmVmaXgpIHtcclxuICAgICAgICByZXR1cm4gcHJlZml4ICsgJy0nICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvcm1hdCBzdHJpbmdcclxuICAgIGZ1bmN0aW9uIGZvcm1hdChpbnB1dCkge1xyXG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xyXG4gICAgICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpcy5lbXB0eShpbnB1dCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0LnRvU3RyaW5nKCkucmVwbGFjZSgveyhcXGQrKX0vZywgZnVuY3Rpb24gKG1hdGNoLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcmdzW2ldLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHBlcmNlbnRhZ2VcclxuICAgIGZ1bmN0aW9uIGdldFBlcmNlbnRhZ2UoY3VycmVudCwgbWF4KSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IDAgfHwgbWF4ID09PSAwIHx8IE51bWJlci5pc05hTihjdXJyZW50KSB8fCBOdW1iZXIuaXNOYU4obWF4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoY3VycmVudCAvIG1heCAqIDEwMCkudG9GaXhlZCgyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBsYWNlIGFsbCBvY2N1cmFuY2VzIG9mIGEgc3RyaW5nIGluIGEgc3RyaW5nXHJcbiAgICBmdW5jdGlvbiByZXBsYWNlQWxsKCkge1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XHJcbiAgICAgICAgdmFyIGZpbmQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICcnO1xyXG4gICAgICAgIHZhciByZXBsYWNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UobmV3IFJlZ0V4cChmaW5kLnRvU3RyaW5nKCkucmVwbGFjZSgvKFsuKis/Xj0hOiR7fSgpfFtcXF0vXFxcXF0pL2csICdcXFxcJDEnKSwgJ2cnKSwgcmVwbGFjZS50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb252ZXJ0IHRvIHRpdGxlIGNhc2VcclxuICAgIGZ1bmN0aW9uIHRvVGl0bGVDYXNlKCkge1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnB1dC50b1N0cmluZygpLnJlcGxhY2UoL1xcd1xcUyovZywgZnVuY3Rpb24gKHRleHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIHBhc2NhbENhc2VcclxuICAgIGZ1bmN0aW9uIHRvUGFzY2FsQ2FzZSgpIHtcclxuICAgICAgICB2YXIgaW5wdXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICcnO1xyXG5cclxuICAgICAgICB2YXIgc3RyaW5nID0gaW5wdXQudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBrZWJhYiBjYXNlXHJcbiAgICAgICAgc3RyaW5nID0gcmVwbGFjZUFsbChzdHJpbmcsICctJywgJyAnKTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBzbmFrZSBjYXNlXHJcbiAgICAgICAgc3RyaW5nID0gcmVwbGFjZUFsbChzdHJpbmcsICdfJywgJyAnKTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCB0byB0aXRsZSBjYXNlXHJcbiAgICAgICAgc3RyaW5nID0gdG9UaXRsZUNhc2Uoc3RyaW5nKTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCB0byBwYXNjYWwgY2FzZVxyXG4gICAgICAgIHJldHVybiByZXBsYWNlQWxsKHN0cmluZywgJyAnLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29udmVydCBzdHJpbmcgdG8gcGFzY2FsQ2FzZVxyXG4gICAgZnVuY3Rpb24gdG9DYW1lbENhc2UoKSB7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnJztcclxuXHJcbiAgICAgICAgdmFyIHN0cmluZyA9IGlucHV0LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgdG8gcGFzY2FsIGNhc2VcclxuICAgICAgICBzdHJpbmcgPSB0b1Bhc2NhbENhc2Uoc3RyaW5nKTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBmaXJzdCBjaGFyYWN0ZXIgdG8gbG93ZXJjYXNlXHJcbiAgICAgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgSFRNTCBmcm9tIGEgc3RyaW5nXHJcbiAgICBmdW5jdGlvbiBzdHJpcEhUTUwoc291cmNlKSB7XHJcbiAgICAgICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBzb3VyY2U7XHJcbiAgICAgICAgcmV0dXJuIGZyYWdtZW50LmZpcnN0Q2hpbGQuaW5uZXJUZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExpa2Ugb3V0ZXJIVE1MLCBidXQgYWxzbyB3b3JrcyBmb3IgRG9jdW1lbnRGcmFnbWVudFxyXG4gICAgZnVuY3Rpb24gZ2V0SFRNTChlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIHJldHVybiB3cmFwcGVyLmlubmVySFRNTDtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHZhciBpMThuID0ge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnJztcclxuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XHJcblxyXG4gICAgICAgICAgICBpZiAoaXMuZW1wdHkoa2V5KSB8fCBpcy5lbXB0eShjb25maWcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzdHJpbmcgPSBnZXREZWVwKGNvbmZpZy5pMThuLCBrZXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzLmVtcHR5KHN0cmluZykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHJlcGxhY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAne3NlZWt0aW1lfSc6IGNvbmZpZy5zZWVrVGltZSxcclxuICAgICAgICAgICAgICAgICd7dGl0bGV9JzogY29uZmlnLnRpdGxlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhyZXBsYWNlKS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjIgPSBzbGljZWRUb0FycmF5KF9yZWYsIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IF9yZWYyWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gX3JlZjJbMV07XHJcblxyXG4gICAgICAgICAgICAgICAgc3RyaW5nID0gcmVwbGFjZUFsbChzdHJpbmcsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGluIGFuIGFycmF5XHJcbiAgICBmdW5jdGlvbiBkZWR1cGUoYXJyYXkpIHtcclxuICAgICAgICBpZiAoIWlzLmFycmF5KGFycmF5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IHRoZSBjbG9zZXN0IHZhbHVlIGluIGFuIGFycmF5XHJcbiAgICBmdW5jdGlvbiBjbG9zZXN0KGFycmF5LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICghaXMuYXJyYXkoYXJyYXkpIHx8ICFhcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBjdXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhjdXJyIC0gdmFsdWUpIDwgTWF0aC5hYnMocHJldiAtIHZhbHVlKSA/IGN1cnIgOiBwcmV2O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgdmFyIFN0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gU3RvcmFnZShwbGF5ZXIpIHtcclxuICAgICAgICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RvcmFnZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSBwbGF5ZXIuY29uZmlnLnN0b3JhZ2UuZW5hYmxlZDtcclxuICAgICAgICAgICAgdGhpcy5rZXkgPSBwbGF5ZXIuY29uZmlnLnN0b3JhZ2Uua2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGFjdHVhbCBzdXBwb3J0IChzZWUgaWYgd2UgY2FuIHVzZSBpdClcclxuXHJcblxyXG4gICAgICAgIGNyZWF0ZUNsYXNzKFN0b3JhZ2UsIFt7XHJcbiAgICAgICAgICAgIGtleTogJ2dldCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXQkJDEoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIVN0b3JhZ2Uuc3VwcG9ydGVkIHx8ICF0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RvcmUgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpcy5lbXB0eShzdG9yZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2Uoc3RvcmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBpcy5zdHJpbmcoa2V5KSAmJiBrZXkubGVuZ3RoID8ganNvbltrZXldIDoganNvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnc2V0JyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldCQkMShvYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIC8vIEJhaWwgaWYgd2UgZG9uJ3QgaGF2ZSBsb2NhbFN0b3JhZ2Ugc3VwcG9ydCBvciBpdCdzIGRpc2FibGVkXHJcbiAgICAgICAgICAgICAgICBpZiAoIVN0b3JhZ2Uuc3VwcG9ydGVkIHx8ICF0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2FuIG9ubHkgc3RvcmUgb2JqZWN0c3RcclxuICAgICAgICAgICAgICAgIGlmICghaXMub2JqZWN0KG9iamVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGN1cnJlbnQgc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgdmFyIHN0b3JhZ2UgPSB0aGlzLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gZW1wdHkgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICBpZiAoaXMuZW1wdHkoc3RvcmFnZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSB3b3JraW5nIGNvcHkgb2YgdGhlIHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgZXh0ZW5kKHN0b3JhZ2UsIG9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN0b3JhZ2VcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV0sIFt7XHJcbiAgICAgICAgICAgIGtleTogJ3N1cHBvcnRlZCcsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISgnbG9jYWxTdG9yYWdlJyBpbiB3aW5kb3cpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0ID0gJ19fX3Rlc3QnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gdXNlIGl0IChpdCBtaWdodCBiZSBkaXNhYmxlZCwgZS5nLiB1c2VyIGlzIGluIHByaXZhdGUgbW9kZSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9zYW1wb3R0cy9wbHlyL2lzc3Vlcy8xMzFcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odGVzdCwgdGVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XSk7XHJcbiAgICAgICAgcmV0dXJuIFN0b3JhZ2U7XHJcbiAgICB9KCk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIEZldGNoIHdyYXBwZXJcclxuICAgIC8vIFVzaW5nIFhIUiB0byBhdm9pZCBpc3N1ZXMgd2l0aCBvbGRlciBicm93c2Vyc1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaCh1cmwpIHtcclxuICAgICAgICB2YXIgcmVzcG9uc2VUeXBlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAndGV4dCc7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBDT1JTIHN1cHBvcnRcclxuICAgICAgICAgICAgICAgIGlmICghKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VUeXBlID09PSAndGV4dCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVxdWVzdC5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgcmVxdWlyZWQgcmVzcG9uc2UgdHlwZVxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSByZXNwb25zZVR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgLy8gTG9hZCBhbiBleHRlcm5hbCBTVkcgc3ByaXRlXHJcbiAgICBmdW5jdGlvbiBsb2FkU3ByaXRlKHVybCwgaWQpIHtcclxuICAgICAgICBpZiAoIWlzLnN0cmluZyh1cmwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwcmVmaXggPSAnY2FjaGUnO1xyXG4gICAgICAgIHZhciBoYXNJZCA9IGlzLnN0cmluZyhpZCk7XHJcbiAgICAgICAgdmFyIGlzQ2FjaGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZhciBleGlzdHMgPSBmdW5jdGlvbiBleGlzdHMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgIT09IG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShjb250YWluZXIsIGRhdGEpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBhZ2FpbiBpbmNhc2Ugb2YgcmFjZSBjb25kaXRpb25cclxuICAgICAgICAgICAgaWYgKGhhc0lkICYmIGV4aXN0cygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluamVjdCB0aGUgU1ZHIHRvIHRoZSBib2R5XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgY29udGFpbmVyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBPbmx5IGxvYWQgb25jZSBpZiBJRCBzZXRcclxuICAgICAgICBpZiAoIWhhc0lkIHx8ICFleGlzdHMoKSkge1xyXG4gICAgICAgICAgICB2YXIgdXNlU3RvcmFnZSA9IFN0b3JhZ2Uuc3VwcG9ydGVkO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGNvbnRhaW5lclxyXG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2hpZGRlbicsICcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYXNJZCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGluIGNhY2hlXHJcbiAgICAgICAgICAgIGlmICh1c2VTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FjaGVkID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHByZWZpeCArICctJyArIGlkKTtcclxuICAgICAgICAgICAgICAgIGlzQ2FjaGVkID0gY2FjaGVkICE9PSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc0NhY2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShjYWNoZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZShjb250YWluZXIsIGRhdGEuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgc3ByaXRlXHJcbiAgICAgICAgICAgIGZldGNoKHVybCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXMuZW1wdHkocmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodXNlU3RvcmFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShwcmVmaXggKyAnLScgKyBpZCwgSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlKGNvbnRhaW5lciwgcmVzdWx0KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkgeyB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAvLyBUaW1lIGhlbHBlcnNcclxuICAgIHZhciBnZXRIb3VycyA9IGZ1bmN0aW9uIGdldEhvdXJzKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlIC8gNjAgLyA2MCAlIDYwLCAxMCk7XHJcbiAgICB9O1xyXG4gICAgdmFyIGdldE1pbnV0ZXMgPSBmdW5jdGlvbiBnZXRNaW51dGVzKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlIC8gNjAgJSA2MCwgMTApO1xyXG4gICAgfTtcclxuICAgIHZhciBnZXRTZWNvbmRzID0gZnVuY3Rpb24gZ2V0U2Vjb25kcyh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSAlIDYwLCAxMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEZvcm1hdCB0aW1lIHRvIFVJIGZyaWVuZGx5IHN0cmluZ1xyXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZSgpIHtcclxuICAgICAgICB2YXIgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMDtcclxuICAgICAgICB2YXIgZGlzcGxheUhvdXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcclxuICAgICAgICB2YXIgaW52ZXJ0ZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBCYWlsIGlmIHRoZSB2YWx1ZSBpc24ndCBhIG51bWJlclxyXG4gICAgICAgIGlmICghaXMubnVtYmVyKHRpbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRUaW1lKG51bGwsIGRpc3BsYXlIb3VycywgaW52ZXJ0ZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRm9ybWF0IHRpbWUgY29tcG9uZW50IHRvIGFkZCBsZWFkaW5nIHplcm9cclxuICAgICAgICB2YXIgZm9ybWF0ID0gZnVuY3Rpb24gZm9ybWF0KHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoJzAnICsgdmFsdWUpLnNsaWNlKC0yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBCcmVha2Rvd24gdG8gaG91cnMsIG1pbnMsIHNlY3NcclxuICAgICAgICB2YXIgaG91cnMgPSBnZXRIb3Vycyh0aW1lKTtcclxuICAgICAgICB2YXIgbWlucyA9IGdldE1pbnV0ZXModGltZSk7XHJcbiAgICAgICAgdmFyIHNlY3MgPSBnZXRTZWNvbmRzKHRpbWUpO1xyXG5cclxuICAgICAgICAvLyBEbyB3ZSBuZWVkIHRvIGRpc3BsYXkgaG91cnM/XHJcbiAgICAgICAgaWYgKGRpc3BsYXlIb3VycyB8fCBob3VycyA+IDApIHtcclxuICAgICAgICAgICAgaG91cnMgPSBob3VycyArICc6JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBob3VycyA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVuZGVyXHJcbiAgICAgICAgcmV0dXJuICcnICsgKGludmVydGVkICYmIHRpbWUgPiAwID8gJy0nIDogJycpICsgaG91cnMgKyBmb3JtYXQobWlucykgKyAnOicgKyBmb3JtYXQoc2Vjcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAvLyBUT0RPOiBEb24ndCBleHBvcnQgYSBtYXNzaXZlIG9iamVjdCAtIGJyZWFrIGRvd24gYW5kIGNyZWF0ZSBjbGFzc1xyXG4gICAgdmFyIGNvbnRyb2xzID0ge1xyXG4gICAgICAgIC8vIEdldCBpY29uIFVSTFxyXG4gICAgICAgIGdldEljb25Vcmw6IGZ1bmN0aW9uIGdldEljb25VcmwoKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSBuZXcgVVJMKHRoaXMuY29uZmlnLmljb25VcmwsIHdpbmRvdy5sb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHZhciBjb3JzID0gdXJsLmhvc3QgIT09IHdpbmRvdy5sb2NhdGlvbi5ob3N0IHx8IGJyb3dzZXIuaXNJRSAmJiAhd2luZG93LnN2ZzRldmVyeWJvZHk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLmNvbmZpZy5pY29uVXJsLFxyXG4gICAgICAgICAgICAgICAgY29yczogY29yc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBVSSBjb250cm9sc1xyXG4gICAgICAgIGZpbmRFbGVtZW50czogZnVuY3Rpb24gZmluZEVsZW1lbnRzKCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jb250cm9scyA9IGdldEVsZW1lbnQuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5zZWxlY3RvcnMuY29udHJvbHMud3JhcHBlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQnV0dG9uc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5idXR0b25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXk6IGdldEVsZW1lbnRzLmNhbGwodGhpcywgdGhpcy5jb25maWcuc2VsZWN0b3JzLmJ1dHRvbnMucGxheSksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF1c2U6IGdldEVsZW1lbnQuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5wYXVzZSksXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdGFydDogZ2V0RWxlbWVudC5jYWxsKHRoaXMsIHRoaXMuY29uZmlnLnNlbGVjdG9ycy5idXR0b25zLnJlc3RhcnQpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJld2luZDogZ2V0RWxlbWVudC5jYWxsKHRoaXMsIHRoaXMuY29uZmlnLnNlbGVjdG9ycy5idXR0b25zLnJld2luZCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmFzdEZvcndhcmQ6IGdldEVsZW1lbnQuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5mYXN0Rm9yd2FyZCksXHJcbiAgICAgICAgICAgICAgICAgICAgbXV0ZTogZ2V0RWxlbWVudC5jYWxsKHRoaXMsIHRoaXMuY29uZmlnLnNlbGVjdG9ycy5idXR0b25zLm11dGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpcDogZ2V0RWxlbWVudC5jYWxsKHRoaXMsIHRoaXMuY29uZmlnLnNlbGVjdG9ycy5idXR0b25zLnBpcCksXHJcbiAgICAgICAgICAgICAgICAgICAgYWlycGxheTogZ2V0RWxlbWVudC5jYWxsKHRoaXMsIHRoaXMuY29uZmlnLnNlbGVjdG9ycy5idXR0b25zLmFpcnBsYXkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnZXRFbGVtZW50LmNhbGwodGhpcywgdGhpcy5jb25maWcuc2VsZWN0b3JzLmJ1dHRvbnMuc2V0dGluZ3MpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25zOiBnZXRFbGVtZW50LmNhbGwodGhpcywgdGhpcy5jb25maWcuc2VsZWN0b3JzLmJ1dHRvbnMuY2FwdGlvbnMpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxzY3JlZW46IGdldEVsZW1lbnQuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5mdWxsc2NyZWVuKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcm9ncmVzc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5wcm9ncmVzcyA9IGdldEVsZW1lbnQuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5zZWxlY3RvcnMucHJvZ3Jlc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElucHV0c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5pbnB1dHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VlazogZ2V0RWxlbWVudC5jYWxsKHRoaXMsIHRoaXMuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHMuc2VlayksXHJcbiAgICAgICAgICAgICAgICAgICAgdm9sdW1lOiBnZXRFbGVtZW50LmNhbGwodGhpcywgdGhpcy5jb25maWcuc2VsZWN0b3JzLmlucHV0cy52b2x1bWUpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERpc3BsYXlcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZGlzcGxheSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBidWZmZXI6IGdldEVsZW1lbnQuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5zZWxlY3RvcnMuZGlzcGxheS5idWZmZXIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUaW1lOiBnZXRFbGVtZW50LmNhbGwodGhpcywgdGhpcy5jb25maWcuc2VsZWN0b3JzLmRpc3BsYXkuY3VycmVudFRpbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBnZXRFbGVtZW50LmNhbGwodGhpcywgdGhpcy5jb25maWcuc2VsZWN0b3JzLmRpc3BsYXkuZHVyYXRpb24pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNlZWsgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgaWYgKGlzLmVsZW1lbnQodGhpcy5lbGVtZW50cy5wcm9ncmVzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmRpc3BsYXkuc2Vla1Rvb2x0aXAgPSB0aGlzLmVsZW1lbnRzLnByb2dyZXNzLnF1ZXJ5U2VsZWN0b3IoJy4nICsgdGhpcy5jb25maWcuY2xhc3NOYW1lcy50b29sdGlwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vIExvZyBpdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWJ1Zy53YXJuKCdJdCBsb29rcyBsaWtlIHRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIHlvdXIgY3VzdG9tIGNvbnRyb2xzIEhUTUwnLCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBuYXRpdmUgdmlkZW8gY29udHJvbHNcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTmF0aXZlQ29udHJvbHModHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSA8c3ZnPiBpY29uXHJcbiAgICAgICAgY3JlYXRlSWNvbjogZnVuY3Rpb24gY3JlYXRlSWNvbih0eXBlLCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lc3BhY2UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xyXG4gICAgICAgICAgICB2YXIgaWNvblVybCA9IGNvbnRyb2xzLmdldEljb25VcmwuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGljb25QYXRoID0gKCFpY29uVXJsLmNvcnMgPyBpY29uVXJsLnVybCA6ICcnKSArICcjJyArIHRoaXMuY29uZmlnLmljb25QcmVmaXg7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgPHN2Zz5cclxuICAgICAgICAgICAgdmFyIGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlLCAnc3ZnJyk7XHJcbiAgICAgICAgICAgIHNldEF0dHJpYnV0ZXMoaWNvbiwgZXh0ZW5kKGF0dHJpYnV0ZXMsIHtcclxuICAgICAgICAgICAgICAgIHJvbGU6ICdwcmVzZW50YXRpb24nLFxyXG4gICAgICAgICAgICAgICAgZm9jdXNhYmxlOiAnZmFsc2UnXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgPHVzZT4gdG8gcmVmZXJlbmNlIHNwcml0ZVxyXG4gICAgICAgICAgICB2YXIgdXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZSwgJ3VzZScpO1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9IGljb25QYXRoICsgJy0nICsgdHlwZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBgaHJlZmAgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc2FtcG90dHMvcGx5ci9pc3N1ZXMvNDYwXHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUveGxpbms6aHJlZlxyXG4gICAgICAgICAgICBpZiAoJ2hyZWYnIGluIHVzZSkge1xyXG4gICAgICAgICAgICAgICAgdXNlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgJ2hyZWYnLCBwYXRoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHVzZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsICd4bGluazpocmVmJywgcGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCA8dXNlPiB0byA8c3ZnPlxyXG4gICAgICAgICAgICBpY29uLmFwcGVuZENoaWxkKHVzZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaWNvbjtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGhpZGRlbiB0ZXh0IGxhYmVsXHJcbiAgICAgICAgY3JlYXRlTGFiZWw6IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsKHR5cGUpIHtcclxuICAgICAgICAgICAgdmFyIGF0dHIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xyXG5cclxuICAgICAgICAgICAgLy8gU2tpcCBpMThuIGZvciBhYmJyZXZpYXRpb25zIGFuZCBicmFuZCBuYW1lc1xyXG4gICAgICAgICAgICB2YXIgdW5pdmVyc2FscyA9IHtcclxuICAgICAgICAgICAgICAgIHBpcDogJ1BJUCcsXHJcbiAgICAgICAgICAgICAgICBhaXJwbGF5OiAnQWlyUGxheSdcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHRleHQgPSB1bml2ZXJzYWxzW3R5cGVdIHx8IGkxOG4uZ2V0KHR5cGUsIHRoaXMuY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgYXR0ciwge1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6IFthdHRyLmNsYXNzLCB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLmhpZGRlbl0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBhdHRyaWJ1dGVzLCB0ZXh0KTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgYmFkZ2VcclxuICAgICAgICBjcmVhdGVCYWRnZTogZnVuY3Rpb24gY3JlYXRlQmFkZ2UodGV4dCkge1xyXG4gICAgICAgICAgICBpZiAoaXMuZW1wdHkodGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYmFkZ2UgPSBjcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6IHRoaXMuY29uZmlnLmNsYXNzTmFtZXMubWVudS52YWx1ZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGJhZGdlLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogdGhpcy5jb25maWcuY2xhc3NOYW1lcy5tZW51LmJhZGdlXHJcbiAgICAgICAgICAgIH0sIHRleHQpKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBiYWRnZTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgPGJ1dHRvbj5cclxuICAgICAgICBjcmVhdGVCdXR0b246IGZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbihidXR0b25UeXBlLCBhdHRyKSB7XHJcbiAgICAgICAgICAgIHZhciBidXR0b24gPSBjcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBhdHRyKTtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSB0b0NhbWVsQ2FzZShidXR0b25UeXBlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0b2dnbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmFyIGxhYmVsID0gdm9pZCAwO1xyXG4gICAgICAgICAgICB2YXIgaWNvbiA9IHZvaWQgMDtcclxuICAgICAgICAgICAgdmFyIGxhYmVsUHJlc3NlZCA9IHZvaWQgMDtcclxuICAgICAgICAgICAgdmFyIGljb25QcmVzc2VkID0gdm9pZCAwO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEoJ3R5cGUnIGluIGF0dHJpYnV0ZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnR5cGUgPSAnYnV0dG9uJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCdjbGFzcycgaW4gYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVzLmNsYXNzLmluY2x1ZGVzKHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuY29udHJvbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmNsYXNzICs9ICcgJyArIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuY29udHJvbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgPSB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLmNvbnRyb2w7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExhcmdlIHBsYXkgYnV0dG9uXHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnV0dG9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncGxheSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9ICdwbGF5JztcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbFByZXNzZWQgPSAncGF1c2UnO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGxheSc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblByZXNzZWQgPSAncGF1c2UnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ211dGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSAnbXV0ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxQcmVzc2VkID0gJ3VubXV0ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICd2b2x1bWUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb25QcmVzc2VkID0gJ211dGVkJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdjYXB0aW9ucyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9ICdlbmFibGVDYXB0aW9ucyc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxQcmVzc2VkID0gJ2Rpc2FibGVDYXB0aW9ucyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdjYXB0aW9ucy1vZmYnO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb25QcmVzc2VkID0gJ2NhcHRpb25zLW9uJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdmdWxsc2NyZWVuJzpcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gJ2VudGVyRnVsbHNjcmVlbic7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxQcmVzc2VkID0gJ2V4aXRGdWxsc2NyZWVuJztcclxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ2VudGVyLWZ1bGxzY3JlZW4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb25QcmVzc2VkID0gJ2V4aXQtZnVsbHNjcmVlbic7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAncGxheS1sYXJnZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcy5jbGFzcyArPSAnICcgKyB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLmNvbnRyb2wgKyAnLS1vdmVybGFpZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdwbGF5JztcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9ICdwbGF5JztcclxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BsYXknO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSB0eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIGljb24gPSBidXR0b25UeXBlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXR1cCB0b2dnbGUgaWNvbiBhbmQgbGFiZWxzXHJcbiAgICAgICAgICAgIGlmICh0b2dnbGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIEljb25cclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChjb250cm9scy5jcmVhdGVJY29uLmNhbGwodGhpcywgaWNvblByZXNzZWQsIHsgY2xhc3M6ICdpY29uLS1wcmVzc2VkJyB9KSk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoY29udHJvbHMuY3JlYXRlSWNvbi5jYWxsKHRoaXMsIGljb24sIHsgY2xhc3M6ICdpY29uLS1ub3QtcHJlc3NlZCcgfSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIExhYmVsL1Rvb2x0aXBcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChjb250cm9scy5jcmVhdGVMYWJlbC5jYWxsKHRoaXMsIGxhYmVsUHJlc3NlZCwgeyBjbGFzczogJ2xhYmVsLS1wcmVzc2VkJyB9KSk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoY29udHJvbHMuY3JlYXRlTGFiZWwuY2FsbCh0aGlzLCBsYWJlbCwgeyBjbGFzczogJ2xhYmVsLS1ub3QtcHJlc3NlZCcgfSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZUljb24uY2FsbCh0aGlzLCBpY29uKSk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQoY29udHJvbHMuY3JlYXRlTGFiZWwuY2FsbCh0aGlzLCBsYWJlbCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBNZXJnZSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgIGV4dGVuZChhdHRyaWJ1dGVzLCBnZXRBdHRyaWJ1dGVzRnJvbVNlbGVjdG9yKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5idXR0b25zW3R5cGVdLCBhdHRyaWJ1dGVzKSk7XHJcblxyXG4gICAgICAgICAgICBzZXRBdHRyaWJ1dGVzKGJ1dHRvbiwgYXR0cmlidXRlcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBoYXZlIG11bHRpcGxlIHBsYXkgYnV0dG9uc1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3BsYXknKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzLmFycmF5KHRoaXMuZWxlbWVudHMuYnV0dG9uc1t0eXBlXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmJ1dHRvbnNbdHlwZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmJ1dHRvbnNbdHlwZV0ucHVzaChidXR0b24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5idXR0b25zW3R5cGVdID0gYnV0dG9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBUb2dnbGUgY2xhc3NuYW1lIHdoZW4gcHJlc3NlZCBwcm9wZXJ0eSBpcyBzZXRcclxuICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuY29udHJvbFByZXNzZWQ7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShidXR0b24sICdwcmVzc2VkJywge1xyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNDbGFzcyhidXR0b24sIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXNzZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhidXR0b24sIGNsYXNzTmFtZSwgcHJlc3NlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbjtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuIDxpbnB1dCB0eXBlPSdyYW5nZSc+XHJcbiAgICAgICAgY3JlYXRlUmFuZ2U6IGZ1bmN0aW9uIGNyZWF0ZVJhbmdlKHR5cGUsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgLy8gU2VlayBpbnB1dFxyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSBjcmVhdGVFbGVtZW50KCdpbnB1dCcsIGV4dGVuZChnZXRBdHRyaWJ1dGVzRnJvbVNlbGVjdG9yKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHNbdHlwZV0pLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAncmFuZ2UnLFxyXG4gICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgbWF4OiAxMDAsXHJcbiAgICAgICAgICAgICAgICBzdGVwOiAwLjAxLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxyXG4gICAgICAgICAgICAgICAgLy8gQTExeSBmaXhlcyBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3NhbXBvdHRzL3BseXIvaXNzdWVzLzkwNVxyXG4gICAgICAgICAgICAgICAgcm9sZTogJ3NsaWRlcicsXHJcbiAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IGkxOG4uZ2V0KHR5cGUsIHRoaXMuY29uZmlnKSxcclxuICAgICAgICAgICAgICAgICdhcmlhLXZhbHVlbWluJzogMCxcclxuICAgICAgICAgICAgICAgICdhcmlhLXZhbHVlbWF4JzogMTAwLFxyXG4gICAgICAgICAgICAgICAgJ2FyaWEtdmFsdWVub3cnOiAwXHJcbiAgICAgICAgICAgIH0sIGF0dHJpYnV0ZXMpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuaW5wdXRzW3R5cGVdID0gaW5wdXQ7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGZpbGwgZm9yIHdlYmtpdCBub3dcclxuICAgICAgICAgICAgY29udHJvbHMudXBkYXRlUmFuZ2VGaWxsLmNhbGwodGhpcywgaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSA8cHJvZ3Jlc3M+XHJcbiAgICAgICAgY3JlYXRlUHJvZ3Jlc3M6IGZ1bmN0aW9uIGNyZWF0ZVByb2dyZXNzKHR5cGUsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICAgICAgdmFyIHByb2dyZXNzID0gY3JlYXRlRWxlbWVudCgncHJvZ3Jlc3MnLCBleHRlbmQoZ2V0QXR0cmlidXRlc0Zyb21TZWxlY3Rvcih0aGlzLmNvbmZpZy5zZWxlY3RvcnMuZGlzcGxheVt0eXBlXSksIHtcclxuICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgIG1heDogMTAwLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICByb2xlOiAncHJlc2VudGF0aW9uJyxcclxuICAgICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6IHRydWVcclxuICAgICAgICAgICAgfSwgYXR0cmlidXRlcykpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBsYWJlbCBpbnNpZGVcclxuICAgICAgICAgICAgaWYgKHR5cGUgIT09ICd2b2x1bWUnKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcy5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdzcGFuJywgbnVsbCwgJzAnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN1ZmZpeEtleSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZWQ6ICdwbGF5ZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogJ2J1ZmZlcmVkJ1xyXG4gICAgICAgICAgICAgICAgfVt0eXBlXTtcclxuICAgICAgICAgICAgICAgIHZhciBzdWZmaXggPSBzdWZmaXhLZXkgPyBpMThuLmdldChzdWZmaXhLZXksIHRoaXMuY29uZmlnKSA6ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb2dyZXNzLmlubmVyVGV4dCA9ICclICcgKyBzdWZmaXgudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5kaXNwbGF5W3R5cGVdID0gcHJvZ3Jlc3M7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZ3Jlc3M7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aW1lIGRpc3BsYXlcclxuICAgICAgICBjcmVhdGVUaW1lOiBmdW5jdGlvbiBjcmVhdGVUaW1lKHR5cGUpIHtcclxuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBnZXRBdHRyaWJ1dGVzRnJvbVNlbGVjdG9yKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5kaXNwbGF5W3R5cGVdKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBleHRlbmQoYXR0cmlidXRlcywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3M6ICdwbHlyX190aW1lICcgKyBhdHRyaWJ1dGVzLmNsYXNzLFxyXG4gICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiBpMThuLmdldCh0eXBlLCB0aGlzLmNvbmZpZylcclxuICAgICAgICAgICAgfSksICcwMDowMCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVmZXJlbmNlIGZvciB1cGRhdGVzXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZGlzcGxheVt0eXBlXSA9IGNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIHNldHRpbmdzIG1lbnUgaXRlbVxyXG4gICAgICAgIGNyZWF0ZU1lbnVJdGVtOiBmdW5jdGlvbiBjcmVhdGVNZW51SXRlbShfcmVmKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IF9yZWYudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBsaXN0ID0gX3JlZi5saXN0LFxyXG4gICAgICAgICAgICAgICAgdHlwZSA9IF9yZWYudHlwZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlID0gX3JlZi50aXRsZSxcclxuICAgICAgICAgICAgICAgIF9yZWYkYmFkZ2UgPSBfcmVmLmJhZGdlLFxyXG4gICAgICAgICAgICAgICAgYmFkZ2UgPSBfcmVmJGJhZGdlID09PSB1bmRlZmluZWQgPyBudWxsIDogX3JlZiRiYWRnZSxcclxuICAgICAgICAgICAgICAgIF9yZWYkY2hlY2tlZCA9IF9yZWYuY2hlY2tlZCxcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQgPSBfcmVmJGNoZWNrZWQgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRjaGVja2VkO1xyXG5cclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBjcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxhYmVsID0gY3JlYXRlRWxlbWVudCgnbGFiZWwnLCB7XHJcbiAgICAgICAgICAgICAgICBjbGFzczogdGhpcy5jb25maWcuY2xhc3NOYW1lcy5jb250cm9sXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJhZGlvID0gY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBleHRlbmQoZ2V0QXR0cmlidXRlc0Zyb21TZWxlY3Rvcih0aGlzLmNvbmZpZy5zZWxlY3RvcnMuaW5wdXRzW3R5cGVdKSwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3JhZGlvJyxcclxuICAgICAgICAgICAgICAgIG5hbWU6ICdwbHlyLScgKyB0eXBlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogY2hlY2tlZCxcclxuICAgICAgICAgICAgICAgIGNsYXNzOiAncGx5cl9fc3Itb25seSdcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZhdXggPSBjcmVhdGVFbGVtZW50KCdzcGFuJywgeyBoaWRkZW46ICcnIH0pO1xyXG5cclxuICAgICAgICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQocmFkaW8pO1xyXG4gICAgICAgICAgICBsYWJlbC5hcHBlbmRDaGlsZChmYXV4KTtcclxuICAgICAgICAgICAgbGFiZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aXRsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXMuZWxlbWVudChiYWRnZSkpIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGJhZGdlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIEZvcm1hdCBhIHRpbWUgZm9yIGRpc3BsYXlcclxuICAgICAgICBmb3JtYXRUaW1lOiBmdW5jdGlvbiBmb3JtYXRUaW1lJCQxKCkge1xyXG4gICAgICAgICAgICB2YXIgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogMDtcclxuICAgICAgICAgICAgdmFyIGludmVydGVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJhaWwgaWYgdGhlIHZhbHVlIGlzbid0IGEgbnVtYmVyXHJcbiAgICAgICAgICAgIGlmICghaXMubnVtYmVyKHRpbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGltZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWx3YXlzIGRpc3BsYXkgaG91cnMgaWYgZHVyYXRpb24gaXMgb3ZlciBhbiBob3VyXHJcbiAgICAgICAgICAgIHZhciBmb3JjZUhvdXJzID0gZ2V0SG91cnModGhpcy5kdXJhdGlvbikgPiAwO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWUodGltZSwgZm9yY2VIb3VycywgaW52ZXJ0ZWQpO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIGRpc3BsYXllZCB0aW1lXHJcbiAgICAgICAgdXBkYXRlVGltZURpc3BsYXk6IGZ1bmN0aW9uIHVwZGF0ZVRpbWVEaXNwbGF5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBudWxsO1xyXG4gICAgICAgICAgICB2YXIgdGltZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcclxuICAgICAgICAgICAgdmFyIGludmVydGVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJhaWwgaWYgdGhlcmUncyBubyBlbGVtZW50IHRvIGRpc3BsYXkgb3IgdGhlIHZhbHVlIGlzbid0IGEgbnVtYmVyXHJcbiAgICAgICAgICAgIGlmICghaXMuZWxlbWVudCh0YXJnZXQpIHx8ICFpcy5udW1iZXIodGltZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXHJcbiAgICAgICAgICAgIHRhcmdldC5pbm5lclRleHQgPSBjb250cm9scy5mb3JtYXRUaW1lKHRpbWUsIGludmVydGVkKTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHZvbHVtZSBVSSBhbmQgc3RvcmFnZVxyXG4gICAgICAgIHVwZGF0ZVZvbHVtZTogZnVuY3Rpb24gdXBkYXRlVm9sdW1lKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydGVkLnVpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSByYW5nZVxyXG4gICAgICAgICAgICBpZiAoaXMuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmlucHV0cy52b2x1bWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9scy5zZXRSYW5nZS5jYWxsKHRoaXMsIHRoaXMuZWxlbWVudHMuaW5wdXRzLnZvbHVtZSwgdGhpcy5tdXRlZCA/IDAgOiB0aGlzLnZvbHVtZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBtdXRlIHN0YXRlXHJcbiAgICAgICAgICAgIGlmIChpcy5lbGVtZW50KHRoaXMuZWxlbWVudHMuYnV0dG9ucy5tdXRlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5idXR0b25zLm11dGUucHJlc3NlZCA9IHRoaXMubXV0ZWQgfHwgdGhpcy52b2x1bWUgPT09IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHNlZWsgdmFsdWUgYW5kIGxvd2VyIGZpbGxcclxuICAgICAgICBzZXRSYW5nZTogZnVuY3Rpb24gc2V0UmFuZ2UodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXMuZWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdlYmtpdCByYW5nZSBmaWxsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzLnVwZGF0ZVJhbmdlRmlsbC5jYWxsKHRoaXMsIHRhcmdldCk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSA8cHJvZ3Jlc3M+IGVsZW1lbnRzXHJcbiAgICAgICAgdXBkYXRlUHJvZ3Jlc3M6IGZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydGVkLnVpIHx8ICFpcy5ldmVudChldmVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gMDtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZXRQcm9ncmVzcyA9IGZ1bmN0aW9uIHNldFByb2dyZXNzKHRhcmdldCwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGlzLm51bWJlcihpbnB1dCkgPyBpbnB1dCA6IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBpcy5lbGVtZW50KHRhcmdldCkgPyB0YXJnZXQgOiBfdGhpcy5lbGVtZW50cy5kaXNwbGF5LmJ1ZmZlcjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdmFsdWUgYW5kIGxhYmVsXHJcbiAgICAgICAgICAgICAgICBpZiAoaXMuZWxlbWVudChwcm9ncmVzcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcy52YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGV4dCBsYWJlbCBpbnNpZGVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBwcm9ncmVzcy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpcy5lbGVtZW50KGxhYmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC5jaGlsZE5vZGVzWzBdLm5vZGVWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmlkZW8gcGxheWluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RpbWV1cGRhdGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlZWtpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlZWtlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZ2V0UGVyY2VudGFnZSh0aGlzLmN1cnJlbnRUaW1lLCB0aGlzLmR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNldCBzZWVrIHJhbmdlIHZhbHVlIG9ubHkgaWYgaXQncyBhICduYXR1cmFsJyB0aW1lIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAndGltZXVwZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzLnNldFJhbmdlLmNhbGwodGhpcywgdGhpcy5lbGVtZW50cy5pbnB1dHMuc2VlaywgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgYnVmZmVyIHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BsYXlpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Byb2dyZXNzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UHJvZ3Jlc3ModGhpcy5lbGVtZW50cy5kaXNwbGF5LmJ1ZmZlciwgdGhpcy5idWZmZXJlZCAqIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gV2Via2l0IHBvbHlmaWxsIGZvciBsb3dlciBmaWxsIHJhbmdlXHJcbiAgICAgICAgdXBkYXRlUmFuZ2VGaWxsOiBmdW5jdGlvbiB1cGRhdGVSYW5nZUZpbGwodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIC8vIEdldCByYW5nZSBmcm9tIGV2ZW50IGlmIGV2ZW50IHBhc3NlZFxyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBpcy5ldmVudCh0YXJnZXQpID8gdGFyZ2V0LnRhcmdldCA6IHRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIC8vIE5lZWRzIHRvIGJlIGEgdmFsaWQgPGlucHV0IHR5cGU9J3JhbmdlJz5cclxuICAgICAgICAgICAgaWYgKCFpcy5lbGVtZW50KHJhbmdlKSB8fCByYW5nZS5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSAhPT0gJ3JhbmdlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgYXJpYSB2YWx1ZXMgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zYW1wb3R0cy9wbHlyL2lzc3Vlcy85MDVcclxuICAgICAgICAgICAgaWYgKG1hdGNoZXMocmFuZ2UsIHRoaXMuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHMuc2VlaykpIHtcclxuICAgICAgICAgICAgICAgIHJhbmdlLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIHRoaXMuY3VycmVudFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gY29udHJvbHMuZm9ybWF0VGltZSh0aGlzLmN1cnJlbnRUaW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IGNvbnRyb2xzLmZvcm1hdFRpbWUodGhpcy5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0JCQxID0gaTE4bi5nZXQoJ3NlZWtMYWJlbCcsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIHJhbmdlLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLCBmb3JtYXQkJDEucmVwbGFjZSgne2N1cnJlbnRUaW1lfScsIGN1cnJlbnRUaW1lKS5yZXBsYWNlKCd7ZHVyYXRpb259JywgZHVyYXRpb24pKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaGVzKHJhbmdlLCB0aGlzLmNvbmZpZy5zZWxlY3RvcnMuaW5wdXRzLnZvbHVtZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwZXJjZW50ID0gcmFuZ2UudmFsdWUgKiAxMDA7XHJcbiAgICAgICAgICAgICAgICByYW5nZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLCBwZXJjZW50KTtcclxuICAgICAgICAgICAgICAgIHJhbmdlLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLCBwZXJjZW50ICsgJyUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJhbmdlLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIHJhbmdlLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2ViS2l0IG9ubHlcclxuICAgICAgICAgICAgaWYgKCFicm93c2VyLmlzV2Via2l0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBDU1MgY3VzdG9tIHByb3BlcnR5XHJcbiAgICAgICAgICAgIHJhbmdlLnN0eWxlLnNldFByb3BlcnR5KCctLXZhbHVlJywgcmFuZ2UudmFsdWUgLyByYW5nZS5tYXggKiAxMDAgKyAnJScpO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgaG92ZXIgdG9vbHRpcCBmb3Igc2Vla2luZ1xyXG4gICAgICAgIHVwZGF0ZVNlZWtUb29sdGlwOiBmdW5jdGlvbiB1cGRhdGVTZWVrVG9vbHRpcChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIEJhaWwgaWYgc2V0dGluZyBub3QgdHJ1ZVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29uZmlnLnRvb2x0aXBzLnNlZWsgfHwgIWlzLmVsZW1lbnQodGhpcy5lbGVtZW50cy5pbnB1dHMuc2VlaykgfHwgIWlzLmVsZW1lbnQodGhpcy5lbGVtZW50cy5kaXNwbGF5LnNlZWtUb29sdGlwKSB8fCB0aGlzLmR1cmF0aW9uID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBwZXJjZW50YWdlXHJcbiAgICAgICAgICAgIHZhciBwZXJjZW50ID0gMDtcclxuICAgICAgICAgICAgdmFyIGNsaWVudFJlY3QgPSB0aGlzLmVsZW1lbnRzLnByb2dyZXNzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB2YXIgdmlzaWJsZSA9IHRoaXMuY29uZmlnLmNsYXNzTmFtZXMudG9vbHRpcCArICctLXZpc2libGUnO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZShfdG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhfdGhpczIuZWxlbWVudHMuZGlzcGxheS5zZWVrVG9vbHRpcCwgdmlzaWJsZSwgX3RvZ2dsZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBIaWRlIG9uIHRvdWNoXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgcGVyY2VudGFnZSwgaWYgYWxyZWFkeSB2aXNpYmxlXHJcbiAgICAgICAgICAgIGlmIChpcy5ldmVudChldmVudCkpIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQgPSAxMDAgLyBjbGllbnRSZWN0LndpZHRoICogKGV2ZW50LnBhZ2VYIC0gY2xpZW50UmVjdC5sZWZ0KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChoYXNDbGFzcyh0aGlzLmVsZW1lbnRzLmRpc3BsYXkuc2Vla1Rvb2x0aXAsIHZpc2libGUpKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50ID0gcGFyc2VGbG9hdCh0aGlzLmVsZW1lbnRzLmRpc3BsYXkuc2Vla1Rvb2x0aXAuc3R5bGUubGVmdCwgMTApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgYm91bmRzXHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyY2VudCA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudCA9IDEwMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGlzcGxheSB0aGUgdGltZSBhIGNsaWNrIHdvdWxkIHNlZWsgdG9cclxuICAgICAgICAgICAgY29udHJvbHMudXBkYXRlVGltZURpc3BsYXkuY2FsbCh0aGlzLCB0aGlzLmVsZW1lbnRzLmRpc3BsYXkuc2Vla1Rvb2x0aXAsIHRoaXMuZHVyYXRpb24gLyAxMDAgKiBwZXJjZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBwb3NpdGlvblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmRpc3BsYXkuc2Vla1Rvb2x0aXAuc3R5bGUubGVmdCA9IHBlcmNlbnQgKyAnJSc7XHJcblxyXG4gICAgICAgICAgICAvLyBTaG93L2hpZGUgdGhlIHRvb2x0aXBcclxuICAgICAgICAgICAgLy8gSWYgdGhlIGV2ZW50IGlzIGEgbW91ZXMgaW4vb3V0IGFuZCBwZXJjZW50YWdlIGlzIGluc2lkZSBib3VuZHNcclxuICAgICAgICAgICAgaWYgKGlzLmV2ZW50KGV2ZW50KSAmJiBbJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZSddLmluY2x1ZGVzKGV2ZW50LnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUoZXZlbnQudHlwZSA9PT0gJ21vdXNlZW50ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBIYW5kbGUgdGltZSBjaGFuZ2UgZXZlbnRcclxuICAgICAgICB0aW1lVXBkYXRlOiBmdW5jdGlvbiB0aW1lVXBkYXRlKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIC8vIE9ubHkgaW52ZXJ0IGlmIG9ubHkgb25lIHRpbWUgZWxlbWVudCBpcyBkaXNwbGF5ZWQgYW5kIHVzZWQgZm9yIGJvdGggZHVyYXRpb24gYW5kIGN1cnJlbnRUaW1lXHJcbiAgICAgICAgICAgIHZhciBpbnZlcnQgPSAhaXMuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmRpc3BsYXkuZHVyYXRpb24pICYmIHRoaXMuY29uZmlnLmludmVydFRpbWU7XHJcblxyXG4gICAgICAgICAgICAvLyBEdXJhdGlvblxyXG4gICAgICAgICAgICBjb250cm9scy51cGRhdGVUaW1lRGlzcGxheS5jYWxsKHRoaXMsIHRoaXMuZWxlbWVudHMuZGlzcGxheS5jdXJyZW50VGltZSwgaW52ZXJ0ID8gdGhpcy5kdXJhdGlvbiAtIHRoaXMuY3VycmVudFRpbWUgOiB0aGlzLmN1cnJlbnRUaW1lLCBpbnZlcnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWdub3JlIHVwZGF0ZXMgd2hpbGUgc2Vla2luZ1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ3RpbWV1cGRhdGUnICYmIHRoaXMubWVkaWEuc2Vla2luZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQbGF5aW5nIHByb2dyZXNzXHJcbiAgICAgICAgICAgIGNvbnRyb2xzLnVwZGF0ZVByb2dyZXNzLmNhbGwodGhpcywgZXZlbnQpO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBTaG93IHRoZSBkdXJhdGlvbiBvbiBtZXRhZGF0YWxvYWRlZCBvciBkdXJhdGlvbmNoYW5nZSBldmVudHNcclxuICAgICAgICBkdXJhdGlvblVwZGF0ZTogZnVuY3Rpb24gZHVyYXRpb25VcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIC8vIEJhaWwgaWYgbm8gVUkgb3IgZHVyYXRpb25jaGFuZ2UgZXZlbnQgdHJpZ2dlcmVkIGFmdGVyIHBsYXlpbmcvc2VlayB3aGVuIGludmVydFRpbWUgaXMgZmFsc2VcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRlZC51aSB8fCAhdGhpcy5jb25maWcuaW52ZXJ0VGltZSAmJiB0aGlzLmN1cnJlbnRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIGR1cmF0aW9uIGlzIHRoZSAyKiozMiAoc2hha2EpLCBJbmZpbml0eSAoSExTKSwgREFTSC1JRiAoTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgTnVtYmVyLk1BWF9WQUxVRSkgaW5kaWNhdGluZyBsaXZlIHdlIGhpZGUgdGhlIGN1cnJlbnRUaW1lIGFuZCBwcm9ncmVzc2Jhci5cclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpZGVvLWRldi9obHMuanMvYmxvYi81ODIwZDI5ZDNjNGM4YTQ2ZThiNzVmMWUzYWZhM2U2OGMxYTlhMmRiL3NyYy9jb250cm9sbGVyL2J1ZmZlci1jb250cm9sbGVyLmpzI0w0MTVcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9zaGFrYS1wbGF5ZXIvYmxvYi80ZDg4OTA1NDYzMWY0ZTFjZjBmYmQ4MGRkZDJiNzE4ODdjMDJlMjMyL2xpYi9tZWRpYS9zdHJlYW1pbmdfZW5naW5lLmpzI0wxMDYyXHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXNoLUluZHVzdHJ5LUZvcnVtL2Rhc2guanMvYmxvYi82OTg1OWY1MWI5Njk2NDViMjM0NjY2ODAwZDRjYjU5NmQ4OWM2MDJkL3NyYy9kYXNoL21vZGVscy9EYXNoTWFuaWZlc3RNb2RlbC5qcyNMMzM4XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR1cmF0aW9uID49IE1hdGgucG93KDIsIDMyKSkge1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlSGlkZGVuKHRoaXMuZWxlbWVudHMuZGlzcGxheS5jdXJyZW50VGltZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVIaWRkZW4odGhpcy5lbGVtZW50cy5wcm9ncmVzcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBBUklBIHZhbHVlc1xyXG4gICAgICAgICAgICBpZiAoaXMuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmlucHV0cy5zZWVrKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5pbnB1dHMuc2Vlay5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVtYXgnLCB0aGlzLmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBhIHNwb3QgdG8gZGlzcGxheSBkdXJhdGlvblxyXG4gICAgICAgICAgICB2YXIgaGFzRHVyYXRpb24gPSBpcy5lbGVtZW50KHRoaXMuZWxlbWVudHMuZGlzcGxheS5kdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIG9ubHkgb25lIHRpbWUgZGlzcGxheSwgZGlzcGxheSBkdXJhdGlvbiB0aGVyZVxyXG4gICAgICAgICAgICBpZiAoIWhhc0R1cmF0aW9uICYmIHRoaXMuY29uZmlnLmRpc3BsYXlEdXJhdGlvbiAmJiB0aGlzLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbHMudXBkYXRlVGltZURpc3BsYXkuY2FsbCh0aGlzLCB0aGlzLmVsZW1lbnRzLmRpc3BsYXkuY3VycmVudFRpbWUsIHRoaXMuZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgZHVyYXRpb24gZWxlbWVudCwgdXBkYXRlIGNvbnRlbnRcclxuICAgICAgICAgICAgaWYgKGhhc0R1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9scy51cGRhdGVUaW1lRGlzcGxheS5jYWxsKHRoaXMsIHRoaXMuZWxlbWVudHMuZGlzcGxheS5kdXJhdGlvbiwgdGhpcy5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgdG9vbHRpcCAoaWYgdmlzaWJsZSlcclxuICAgICAgICAgICAgY29udHJvbHMudXBkYXRlU2Vla1Rvb2x0aXAuY2FsbCh0aGlzKTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gSGlkZS9zaG93IGEgdGFiXHJcbiAgICAgICAgdG9nZ2xlVGFiOiBmdW5jdGlvbiB0b2dnbGVUYWIoc2V0dGluZywgdG9nZ2xlKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUhpZGRlbih0aGlzLmVsZW1lbnRzLnNldHRpbmdzLnRhYnNbc2V0dGluZ10sICF0b2dnbGUpO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIHF1YWxpdHkgbWVudVxyXG4gICAgICAgIHNldFF1YWxpdHlNZW51OiBmdW5jdGlvbiBzZXRRdWFsaXR5TWVudShvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gTWVudSByZXF1aXJlZFxyXG4gICAgICAgICAgICBpZiAoIWlzLmVsZW1lbnQodGhpcy5lbGVtZW50cy5zZXR0aW5ncy5wYW5lcy5xdWFsaXR5KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9ICdxdWFsaXR5JztcclxuICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGlzLmVsZW1lbnRzLnNldHRpbmdzLnBhbmVzLnF1YWxpdHkucXVlcnlTZWxlY3RvcigndWwnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBvcHRpb25zIGlmIHBhc3NlZCBhbmQgZmlsdGVyIGJhc2VkIG9uIHVuaXF1ZW5lc3MgYW5kIGNvbmZpZ1xyXG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkob3B0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5xdWFsaXR5ID0gZGVkdXBlKG9wdGlvbnMpLmZpbHRlcihmdW5jdGlvbiAocXVhbGl0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczMuY29uZmlnLnF1YWxpdHkub3B0aW9ucy5pbmNsdWRlcyhxdWFsaXR5KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBUb2dnbGUgdGhlIHBhbmUgYW5kIHRhYlxyXG4gICAgICAgICAgICB2YXIgdG9nZ2xlID0gIWlzLmVtcHR5KHRoaXMub3B0aW9ucy5xdWFsaXR5KSAmJiB0aGlzLm9wdGlvbnMucXVhbGl0eS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICBjb250cm9scy50b2dnbGVUYWIuY2FsbCh0aGlzLCB0eXBlLCB0b2dnbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byB0b2dnbGUgdGhlIHBhcmVudFxyXG4gICAgICAgICAgICBjb250cm9scy5jaGVja01lbnUuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIGhpZGluZywgbm90aGluZyBtb3JlIHRvIGRvXHJcbiAgICAgICAgICAgIGlmICghdG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEVtcHR5IHRoZSBtZW51XHJcbiAgICAgICAgICAgIGVtcHR5RWxlbWVudChsaXN0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgYmFkZ2UgSFRNTCBmb3IgSEQsIDRLIGV0Y1xyXG4gICAgICAgICAgICB2YXIgZ2V0QmFkZ2UgPSBmdW5jdGlvbiBnZXRCYWRnZShxdWFsaXR5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBpMThuLmdldCgncXVhbGl0eUJhZGdlLicgKyBxdWFsaXR5LCBfdGhpczMuY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWxhYmVsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9scy5jcmVhdGVCYWRnZS5jYWxsKF90aGlzMywgbGFiZWwpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gU29ydCBvcHRpb25zIGJ5IHRoZSBjb25maWcgYW5kIHRoZW4gcmVuZGVyIG9wdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnF1YWxpdHkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNvcnRpbmcgPSBfdGhpczMuY29uZmlnLnF1YWxpdHkub3B0aW9ucztcclxuICAgICAgICAgICAgICAgIHJldHVybiBzb3J0aW5nLmluZGV4T2YoYSkgPiBzb3J0aW5nLmluZGV4T2YoYikgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKHF1YWxpdHkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzLmNyZWF0ZU1lbnVJdGVtLmNhbGwoX3RoaXMzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHF1YWxpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogbGlzdCxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBjb250cm9scy5nZXRMYWJlbC5jYWxsKF90aGlzMywgJ3F1YWxpdHknLCBxdWFsaXR5KSxcclxuICAgICAgICAgICAgICAgICAgICBiYWRnZTogZ2V0QmFkZ2UocXVhbGl0eSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRyb2xzLnVwZGF0ZVNldHRpbmcuY2FsbCh0aGlzLCB0eXBlLCBsaXN0KTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gVHJhbnNsYXRlIGEgdmFsdWUgaW50byBhIG5pY2UgbGFiZWxcclxuICAgICAgICBnZXRMYWJlbDogZnVuY3Rpb24gZ2V0TGFiZWwoc2V0dGluZywgdmFsdWUpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChzZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzcGVlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSAxID8gaTE4bi5nZXQoJ25vcm1hbCcsIHRoaXMuY29uZmlnKSA6IHZhbHVlICsgJyZ0aW1lczsnO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3F1YWxpdHknOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpcy5udW1iZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IGkxOG4uZ2V0KCdxdWFsaXR5TGFiZWwuJyArIHZhbHVlLCB0aGlzLmNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxhYmVsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICsgJ3AnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9UaXRsZUNhc2UodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NhcHRpb25zJzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwdGlvbnMuZ2V0TGFiZWwuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc2VsZWN0ZWQgc2V0dGluZ1xyXG4gICAgICAgIHVwZGF0ZVNldHRpbmc6IGZ1bmN0aW9uIHVwZGF0ZVNldHRpbmcoc2V0dGluZywgY29udGFpbmVyLCBpbnB1dCkge1xyXG4gICAgICAgICAgICB2YXIgcGFuZSA9IHRoaXMuZWxlbWVudHMuc2V0dGluZ3MucGFuZXNbc2V0dGluZ107XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gY29udGFpbmVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNldHRpbmcgPT09ICdjYXB0aW9ucycpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jdXJyZW50VHJhY2s7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICFpcy5lbXB0eShpbnB1dCkgPyBpbnB1dCA6IHRoaXNbc2V0dGluZ107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGRlZmF1bHRcclxuICAgICAgICAgICAgICAgIGlmIChpcy5lbXB0eSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29uZmlnW3NldHRpbmddLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVW5zdXBwb3J0ZWQgdmFsdWVcclxuICAgICAgICAgICAgICAgIGlmICghaXMuZW1wdHkodGhpcy5vcHRpb25zW3NldHRpbmddKSAmJiAhdGhpcy5vcHRpb25zW3NldHRpbmddLmluY2x1ZGVzKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVidWcud2FybignVW5zdXBwb3J0ZWQgdmFsdWUgb2YgXFwnJyArIHZhbHVlICsgJ1xcJyBmb3IgJyArIHNldHRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEaXNhYmxlZCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZ1tzZXR0aW5nXS5vcHRpb25zLmluY2x1ZGVzKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVidWcud2FybignRGlzYWJsZWQgdmFsdWUgb2YgXFwnJyArIHZhbHVlICsgJ1xcJyBmb3IgJyArIHNldHRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBsaXN0IGlmIHdlIG5lZWQgdG9cclxuICAgICAgICAgICAgaWYgKCFpcy5lbGVtZW50KGxpc3QpKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ID0gcGFuZSAmJiBwYW5lLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gbGlzdCBpdCBtZWFucyBpdCdzIG5vdCBiZWVuIHJlbmRlcmVkLi4uXHJcbiAgICAgICAgICAgIGlmICghaXMuZWxlbWVudChsaXN0KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGxhYmVsXHJcbiAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaXMuZWxlbWVudHMuc2V0dGluZ3MudGFic1tzZXR0aW5nXS5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMubWVudS52YWx1ZSk7XHJcbiAgICAgICAgICAgIGxhYmVsLmlubmVySFRNTCA9IGNvbnRyb2xzLmdldExhYmVsLmNhbGwodGhpcywgc2V0dGluZywgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gRmluZCB0aGUgcmFkaW8gb3B0aW9uIGFuZCBjaGVjayBpdFxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gbGlzdCAmJiBsaXN0LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3ZhbHVlPVwiJyArIHZhbHVlICsgJ1wiXScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzLmVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgbG9vcGluZyBvcHRpb25zXHJcbiAgICAgICAgLyogc2V0TG9vcE1lbnUoKSB7XHJcbiAgICAgICAgICAgIC8vIE1lbnUgcmVxdWlyZWRcclxuICAgICAgICAgICAgaWYgKCFpcy5lbGVtZW50KHRoaXMuZWxlbWVudHMuc2V0dGluZ3MucGFuZXMubG9vcCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFsnc3RhcnQnLCAnZW5kJywgJ2FsbCcsICdyZXNldCddO1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5lbGVtZW50cy5zZXR0aW5ncy5wYW5lcy5sb29wLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XHJcbiAgICAgICAgICAgICAvLyBTaG93IHRoZSBwYW5lIGFuZCB0YWJcclxuICAgICAgICAgICAgdG9nZ2xlSGlkZGVuKHRoaXMuZWxlbWVudHMuc2V0dGluZ3MudGFicy5sb29wLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUhpZGRlbih0aGlzLmVsZW1lbnRzLnNldHRpbmdzLnBhbmVzLmxvb3AsIGZhbHNlKTtcclxuICAgICAgICAgICAgIC8vIFRvZ2dsZSB0aGUgcGFuZSBhbmQgdGFiXHJcbiAgICAgICAgICAgIGNvbnN0IHRvZ2dsZSA9ICFpcy5lbXB0eSh0aGlzLmxvb3Aub3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzLnRvZ2dsZVRhYi5jYWxsKHRoaXMsICdsb29wJywgdG9nZ2xlKTtcclxuICAgICAgICAgICAgIC8vIEVtcHR5IHRoZSBtZW51XHJcbiAgICAgICAgICAgIGVtcHR5RWxlbWVudChsaXN0KTtcclxuICAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gY3JlYXRlRWxlbWVudChcclxuICAgICAgICAgICAgICAgICAgICAnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICBleHRlbmQoZ2V0QXR0cmlidXRlc0Zyb21TZWxlY3Rvcih0aGlzLmNvbmZpZy5zZWxlY3RvcnMuYnV0dG9ucy5sb29wKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuY29udHJvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcGx5ci1sb29wLWFjdGlvbic6IG9wdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBpMThuLmdldChvcHRpb24sIHRoaXMuY29uZmlnKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICBpZiAoWydzdGFydCcsICdlbmQnXS5pbmNsdWRlcyhvcHRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmFkZ2UgPSBjb250cm9scy5jcmVhdGVCYWRnZS5jYWxsKHRoaXMsICcwMDowMCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChiYWRnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgaXRlbS5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgKi9cclxuXHJcbiAgICAgICAgLy8gR2V0IGN1cnJlbnQgc2VsZWN0ZWQgY2FwdGlvbiBsYW5ndWFnZVxyXG4gICAgICAgIC8vIFRPRE86IHJld29yayB0aGlzIHRvIHVzZXIgdGhlIGdldHRlciBpbiB0aGUgQVBJP1xyXG5cclxuICAgICAgICAvLyBTZXQgYSBsaXN0IG9mIGF2YWlsYWJsZSBjYXB0aW9ucyBsYW5ndWFnZXNcclxuICAgICAgICBzZXRDYXB0aW9uc01lbnU6IGZ1bmN0aW9uIHNldENhcHRpb25zTWVudSgpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBDYXB0aW9ucyBvciBsYW5ndWFnZT8gQ3VycmVudGx5IGl0J3MgbWl4ZWRcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSAnY2FwdGlvbnMnO1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHRoaXMuZWxlbWVudHMuc2V0dGluZ3MucGFuZXMuY2FwdGlvbnMucXVlcnlTZWxlY3RvcigndWwnKTtcclxuICAgICAgICAgICAgdmFyIHRyYWNrcyA9IGNhcHRpb25zLmdldFRyYWNrcy5jYWxsKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gVG9nZ2xlIHRoZSBwYW5lIGFuZCB0YWJcclxuICAgICAgICAgICAgY29udHJvbHMudG9nZ2xlVGFiLmNhbGwodGhpcywgdHlwZSwgdHJhY2tzLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAvLyBFbXB0eSB0aGUgbWVudVxyXG4gICAgICAgICAgICBlbXB0eUVsZW1lbnQobGlzdCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHRvZ2dsZSB0aGUgcGFyZW50XHJcbiAgICAgICAgICAgIGNvbnRyb2xzLmNoZWNrTWVudS5jYWxsKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBubyBjYXB0aW9ucywgYmFpbFxyXG4gICAgICAgICAgICBpZiAoIXRyYWNrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgb3B0aW9ucyBkYXRhXHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gdHJhY2tzLm1hcChmdW5jdGlvbiAodHJhY2ssIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBfdGhpczQuY2FwdGlvbnMudG9nZ2xlZCAmJiBfdGhpczQuY3VycmVudFRyYWNrID09PSB2YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogY2FwdGlvbnMuZ2V0TGFiZWwuY2FsbChfdGhpczQsIHRyYWNrKSxcclxuICAgICAgICAgICAgICAgICAgICBiYWRnZTogdHJhY2subGFuZ3VhZ2UgJiYgY29udHJvbHMuY3JlYXRlQmFkZ2UuY2FsbChfdGhpczQsIHRyYWNrLmxhbmd1YWdlLnRvVXBwZXJDYXNlKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IGxpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xhbmd1YWdlJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIFwiRGlzYWJsZWRcIiBvcHRpb24gdG8gdHVybiBvZmYgY2FwdGlvbnNcclxuICAgICAgICAgICAgb3B0aW9ucy51bnNoaWZ0KHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAtMSxcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6ICF0aGlzLmNhcHRpb25zLnRvZ2dsZWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaTE4bi5nZXQoJ2Rpc2FibGVkJywgdGhpcy5jb25maWcpLFxyXG4gICAgICAgICAgICAgICAgbGlzdDogbGlzdCxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdsYW5ndWFnZSdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSBvcHRpb25zXHJcbiAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaChjb250cm9scy5jcmVhdGVNZW51SXRlbS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRyb2xzLnVwZGF0ZVNldHRpbmcuY2FsbCh0aGlzLCB0eXBlLCBsaXN0KTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gU2V0IGEgbGlzdCBvZiBhdmFpbGFibGUgY2FwdGlvbnMgbGFuZ3VhZ2VzXHJcbiAgICAgICAgc2V0U3BlZWRNZW51OiBmdW5jdGlvbiBzZXRTcGVlZE1lbnUob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXM1ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIERvIG5vdGhpbmcgaWYgbm90IHNlbGVjdGVkXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoJ3NldHRpbmdzJykgfHwgIXRoaXMuY29uZmlnLnNldHRpbmdzLmluY2x1ZGVzKCdzcGVlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE1lbnUgcmVxdWlyZWRcclxuICAgICAgICAgICAgaWYgKCFpcy5lbGVtZW50KHRoaXMuZWxlbWVudHMuc2V0dGluZ3MucGFuZXMuc3BlZWQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gJ3NwZWVkJztcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgc3BlZWQgb3B0aW9uc1xyXG4gICAgICAgICAgICBpZiAoaXMuYXJyYXkob3B0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zcGVlZCA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0hUTUw1IHx8IHRoaXMuaXNWaW1lbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNwZWVkID0gWzAuNSwgMC43NSwgMSwgMS4yNSwgMS41LCAxLjc1LCAyXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0IG9wdGlvbnMgaWYgcGFzc2VkIGFuZCBmaWx0ZXIgYmFzZWQgb24gY29uZmlnXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zcGVlZCA9IHRoaXMub3B0aW9ucy5zcGVlZC5maWx0ZXIoZnVuY3Rpb24gKHNwZWVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXM1LmNvbmZpZy5zcGVlZC5vcHRpb25zLmluY2x1ZGVzKHNwZWVkKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUb2dnbGUgdGhlIHBhbmUgYW5kIHRhYlxyXG4gICAgICAgICAgICB2YXIgdG9nZ2xlID0gIWlzLmVtcHR5KHRoaXMub3B0aW9ucy5zcGVlZCkgJiYgdGhpcy5vcHRpb25zLnNwZWVkLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzLnRvZ2dsZVRhYi5jYWxsKHRoaXMsIHR5cGUsIHRvZ2dsZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHRvZ2dsZSB0aGUgcGFyZW50XHJcbiAgICAgICAgICAgIGNvbnRyb2xzLmNoZWNrTWVudS5jYWxsKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgd2UncmUgaGlkaW5nLCBub3RoaW5nIG1vcmUgdG8gZG9cclxuICAgICAgICAgICAgaWYgKCF0b2dnbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBsaXN0IHRvIHBvcHVsYXRlXHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gdGhpcy5lbGVtZW50cy5zZXR0aW5ncy5wYW5lcy5zcGVlZC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gRW1wdHkgdGhlIG1lbnVcclxuICAgICAgICAgICAgZW1wdHlFbGVtZW50KGxpc3QpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGl0ZW1zXHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zcGVlZC5mb3JFYWNoKGZ1bmN0aW9uIChzcGVlZCkge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbHMuY3JlYXRlTWVudUl0ZW0uY2FsbChfdGhpczUsIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc3BlZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogbGlzdCxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBjb250cm9scy5nZXRMYWJlbC5jYWxsKF90aGlzNSwgJ3NwZWVkJywgc3BlZWQpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250cm9scy51cGRhdGVTZXR0aW5nLmNhbGwodGhpcywgdHlwZSwgbGlzdCk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gaGlkZS9zaG93IHRoZSBzZXR0aW5ncyBtZW51XHJcbiAgICAgICAgY2hlY2tNZW51OiBmdW5jdGlvbiBjaGVja01lbnUoKSB7XHJcbiAgICAgICAgICAgIHZhciB0YWJzID0gdGhpcy5lbGVtZW50cy5zZXR0aW5ncy50YWJzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZpc2libGUgPSAhaXMuZW1wdHkodGFicykgJiYgT2JqZWN0LnZhbHVlcyh0YWJzKS5zb21lKGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhdGFiLmhpZGRlbjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0b2dnbGVIaWRkZW4odGhpcy5lbGVtZW50cy5zZXR0aW5ncy5tZW51LCAhdmlzaWJsZSk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFNob3cvaGlkZSBtZW51XHJcbiAgICAgICAgdG9nZ2xlTWVudTogZnVuY3Rpb24gdG9nZ2xlTWVudShldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZWxlbWVudHMuc2V0dGluZ3MuZm9ybTtcclxuXHJcbiAgICAgICAgICAgIHZhciBidXR0b24gPSB0aGlzLmVsZW1lbnRzLmJ1dHRvbnMuc2V0dGluZ3M7XHJcblxyXG4gICAgICAgICAgICAvLyBNZW51IGFuZCBidXR0b24gYXJlIHJlcXVpcmVkXHJcbiAgICAgICAgICAgIGlmICghaXMuZWxlbWVudChmb3JtKSB8fCAhaXMuZWxlbWVudChidXR0b24pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBzaG93ID0gaXMuYm9vbGVhbihldmVudCkgPyBldmVudCA6IGlzLmVsZW1lbnQoZm9ybSkgJiYgZm9ybS5oYXNBdHRyaWJ1dGUoJ2hpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzLmV2ZW50KGV2ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzTWVudUl0ZW0gPSBpcy5lbGVtZW50KGZvcm0pICYmIGZvcm0uY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHZhciBpc0J1dHRvbiA9IGV2ZW50LnRhcmdldCA9PT0gdGhpcy5lbGVtZW50cy5idXR0b25zLnNldHRpbmdzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjbGljayB3YXMgaW5zaWRlIHRoZSBmb3JtIG9yIGlmIHRoZSBjbGlja1xyXG4gICAgICAgICAgICAgICAgLy8gd2Fzbid0IHRoZSBidXR0b24gb3IgbWVudSBpdGVtIGFuZCB3ZSdyZSB0cnlpbmcgdG9cclxuICAgICAgICAgICAgICAgIC8vIHNob3cgdGhlIG1lbnUgKGEgZG9jIGNsaWNrIHNob3VsZG4ndCBzaG93IHRoZSBtZW51KVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTWVudUl0ZW0gfHwgIWlzTWVudUl0ZW0gJiYgIWlzQnV0dG9uICYmIHNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCB0aGUgdG9nZ2xlIGJlaW5nIGNhdWdodCBieSB0aGUgZG9jIGxpc3RlbmVyXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0IGZvcm0gYW5kIGJ1dHRvbiBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgIGlmIChpcy5lbGVtZW50KGJ1dHRvbikpIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBzaG93KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzLmVsZW1lbnQoZm9ybSkpIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZUhpZGRlbihmb3JtLCAhc2hvdyk7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lciwgdGhpcy5jb25maWcuY2xhc3NOYW1lcy5tZW51Lm9wZW4sIHNob3cpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIG5hdHVyYWwgc2l6ZSBvZiBhIHRhYlxyXG4gICAgICAgIGdldFRhYlNpemU6IGZ1bmN0aW9uIGdldFRhYlNpemUodGFiKSB7XHJcbiAgICAgICAgICAgIHZhciBjbG9uZSA9IHRhYi5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNsb25lLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICAgICAgY2xvbmUuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIGNsb25lLnJlbW92ZUF0dHJpYnV0ZSgnaGlkZGVuJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBQcmV2ZW50IGlucHV0J3MgYmVpbmcgdW5jaGVja2VkIGR1ZSB0byB0aGUgbmFtZSBiZWluZyBpZGVudGljYWxcclxuICAgICAgICAgICAgQXJyYXkuZnJvbShjbG9uZS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lXScpKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5hbWUgKyAnLWNsb25lJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRvIHBhcmVudCBzbyB3ZSBnZXQgdGhlIFwicmVhbFwiIHNpemVcclxuICAgICAgICAgICAgdGFiLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoY2xvbmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBzaXplcyBiZWZvcmUgd2UgcmVtb3ZlXHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IGNsb25lLnNjcm9sbFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gY2xvbmUuc2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGZyb20gdGhlIERPTVxyXG4gICAgICAgICAgICByZW1vdmVFbGVtZW50KGNsb25lKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBUb2dnbGUgTWVudVxyXG4gICAgICAgIHNob3dUYWI6IGZ1bmN0aW9uIHNob3dUYWIoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogJyc7XHJcbiAgICAgICAgICAgIHZhciBtZW51ID0gdGhpcy5lbGVtZW50cy5zZXR0aW5ncy5tZW51O1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgLy8gTm90aGluZyB0byBzaG93LCBiYWlsXHJcbiAgICAgICAgICAgIGlmICghaXMuZWxlbWVudChwYW5lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBcmUgd2UgdGFyZ2V0aW5nIGEgdGFiPyBJZiBub3QsIGJhaWxcclxuICAgICAgICAgICAgdmFyIGlzVGFiID0gcGFuZS5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3RhYnBhbmVsJztcclxuICAgICAgICAgICAgaWYgKCFpc1RhYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBIaWRlIGFsbCBvdGhlciB0YWJzXHJcbiAgICAgICAgICAgIC8vIEdldCBvdGhlciB0YWJzXHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gbWVudS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cInRhYnBhbmVsXCJdOm5vdChbaGlkZGVuXSknKTtcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGN1cnJlbnQucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBvdGhlciB0b2dnbGVzIHRvIGJlIGV4cGFuZGVkIGZhbHNlXHJcbiAgICAgICAgICAgIEFycmF5LmZyb20obWVudS5xdWVyeVNlbGVjdG9yQWxsKCdbYXJpYS1jb250cm9scz1cIicgKyBjdXJyZW50LmdldEF0dHJpYnV0ZSgnaWQnKSArICdcIl0nKSkuZm9yRWFjaChmdW5jdGlvbiAodG9nZ2xlKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHdlIGNhbiBkbyBmYW5jeSBhbmltYXRpb25zLCB3ZSdsbCBhbmltYXRlIHRoZSBoZWlnaHQvd2lkdGhcclxuICAgICAgICAgICAgaWYgKHN1cHBvcnQudHJhbnNpdGlvbnMgJiYgIXN1cHBvcnQucmVkdWNlZE1vdGlvbikge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBjdXJyZW50IHdpZHRoIGFzIGEgYmFzZVxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gY3VycmVudC5zY3JvbGxXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY3VycmVudC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCBwb3RlbnRpYWwgc2l6ZXNcclxuICAgICAgICAgICAgICAgIHZhciBzaXplID0gY29udHJvbHMuZ2V0VGFiU2l6ZS5jYWxsKHRoaXMsIHBhbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgYXV0byBoZWlnaHQvd2lkdGhcclxuICAgICAgICAgICAgICAgIHZhciByZXN0b3JlID0gZnVuY3Rpb24gcmVzdG9yZShlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UncmUgb25seSBib3RoZXJlZCBhYm91dCBoZWlnaHQgYW5kIHdpZHRoIG9uIHRoZSBjb250YWluZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IGNvbnRhaW5lciB8fCAhWyd3aWR0aCcsICdoZWlnaHQnXS5pbmNsdWRlcyhlLnByb3BlcnR5TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV2ZXJ0IGJhY2sgdG8gYXV0b1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSBsaXN0ZW4gb25jZVxyXG4gICAgICAgICAgICAgICAgICAgIG9mZi5jYWxsKF90aGlzNiwgY29udGFpbmVyLCB0cmFuc2l0aW9uRW5kRXZlbnQsIHJlc3RvcmUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIHRoZSB0cmFuc2l0aW9uIGZpbmlzaGluZyBhbmQgcmVzdG9yZSBhdXRvIGhlaWdodC93aWR0aFxyXG4gICAgICAgICAgICAgICAgb24uY2FsbCh0aGlzLCBjb250YWluZXIsIHRyYW5zaXRpb25FbmRFdmVudCwgcmVzdG9yZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGRpbWVuc2lvbnMgdG8gdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSBzaXplLndpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBzaXplLmhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBhdHRyaWJ1dGVzIG9uIGN1cnJlbnQgdGFiXHJcbiAgICAgICAgICAgIHRvZ2dsZUhpZGRlbihjdXJyZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgY3VycmVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IGF0dHJpYnV0ZXMgb24gdGFyZ2V0XHJcbiAgICAgICAgICAgIHRvZ2dsZUhpZGRlbihwYW5lLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFicyA9IGdldEVsZW1lbnRzLmNhbGwodGhpcywgJ1thcmlhLWNvbnRyb2xzPVwiJyArIHRhcmdldCArICdcIl0nKTtcclxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0YWJzKS5mb3JFYWNoKGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBhbmUucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG5cclxuICAgICAgICAgICAgLy8gRm9jdXMgdGhlIGZpcnN0IGl0ZW1cclxuICAgICAgICAgICAgcGFuZS5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b246bm90KDpkaXNhYmxlZCksIGlucHV0Om5vdCg6ZGlzYWJsZWQpLCBbdGFiaW5kZXhdJylbMF0uZm9jdXMoKTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gQnVpbGQgdGhlIGRlZmF1bHQgSFRNTFxyXG4gICAgICAgIC8vIFRPRE86IFNldCBvcmRlciBiYXNlZCBvbiBvcmRlciBpbiB0aGUgY29uZmlnLmNvbnRyb2xzIGFycmF5P1xyXG4gICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHdlIHdhbnQgbm8gY29udHJvbHNcclxuICAgICAgICAgICAgaWYgKGlzLmVtcHR5KHRoaXMuY29uZmlnLmNvbnRyb2xzKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBnZXRBdHRyaWJ1dGVzRnJvbVNlbGVjdG9yKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5jb250cm9scy53cmFwcGVyKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXN0YXJ0IGJ1dHRvblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoJ3Jlc3RhcnQnKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZUJ1dHRvbi5jYWxsKHRoaXMsICdyZXN0YXJ0JykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZXdpbmQgYnV0dG9uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcygncmV3aW5kJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9scy5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLCAncmV3aW5kJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQbGF5L1BhdXNlIGJ1dHRvblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoJ3BsYXknKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZUJ1dHRvbi5jYWxsKHRoaXMsICdwbGF5JykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBGYXN0IGZvcndhcmQgYnV0dG9uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcygnZmFzdC1mb3J3YXJkJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9scy5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLCAnZmFzdC1mb3J3YXJkJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQcm9ncmVzc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoJ3Byb2dyZXNzJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIGdldEF0dHJpYnV0ZXNGcm9tU2VsZWN0b3IodGhpcy5jb25maWcuc2VsZWN0b3JzLnByb2dyZXNzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2VlayByYW5nZSBzbGlkZXJcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZVJhbmdlLmNhbGwodGhpcywgJ3NlZWsnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwbHlyLXNlZWstJyArIGRhdGEuaWRcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCdWZmZXIgcHJvZ3Jlc3NcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZVByb2dyZXNzLmNhbGwodGhpcywgJ2J1ZmZlcicpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBBZGQgbG9vcCBkaXNwbGF5IGluZGljYXRvclxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNlZWsgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnRvb2x0aXBzLnNlZWspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9vbHRpcCA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnRvb2x0aXBcclxuICAgICAgICAgICAgICAgICAgICB9LCAnMDA6MDAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MuYXBwZW5kQ2hpbGQodG9vbHRpcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5kaXNwbGF5LnNlZWtUb29sdGlwID0gdG9vbHRpcDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50cy5wcm9ncmVzcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE1lZGlhIGN1cnJlbnQgdGltZSBkaXNwbGF5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcygnY3VycmVudC10aW1lJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9scy5jcmVhdGVUaW1lLmNhbGwodGhpcywgJ2N1cnJlbnRUaW1lJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBNZWRpYSBkdXJhdGlvbiBkaXNwbGF5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcygnZHVyYXRpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZVRpbWUuY2FsbCh0aGlzLCAnZHVyYXRpb24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRvZ2dsZSBtdXRlIGJ1dHRvblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoJ211dGUnKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZUJ1dHRvbi5jYWxsKHRoaXMsICdtdXRlJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBWb2x1bWUgcmFuZ2UgY29udHJvbFxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoJ3ZvbHVtZScpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdm9sdW1lID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAncGx5cl9fdm9sdW1lJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogMC4wNSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5jb25maWcudm9sdW1lXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgdm9sdW1lIHJhbmdlIHNsaWRlclxyXG4gICAgICAgICAgICAgICAgdm9sdW1lLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZVJhbmdlLmNhbGwodGhpcywgJ3ZvbHVtZScsIGV4dGVuZChhdHRyaWJ1dGVzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwbHlyLXZvbHVtZS0nICsgZGF0YS5pZFxyXG4gICAgICAgICAgICAgICAgfSkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnZvbHVtZSA9IHZvbHVtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodm9sdW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVG9nZ2xlIGNhcHRpb25zIGJ1dHRvblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoJ2NhcHRpb25zJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9scy5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLCAnY2FwdGlvbnMnKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldHRpbmdzIGJ1dHRvbiAvIG1lbnVcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKCdzZXR0aW5ncycpICYmICFpcy5lbXB0eSh0aGlzLmNvbmZpZy5zZXR0aW5ncykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZW51ID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAncGx5cl9fbWVudScsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAnJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWVudS5hcHBlbmRDaGlsZChjb250cm9scy5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLCAnc2V0dGluZ3MnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICdwbHlyLXNldHRpbmdzLXRvZ2dsZS0nICsgZGF0YS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1oYXNwb3B1cCc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiAncGx5ci1zZXR0aW5ncy0nICsgZGF0YS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1leHBhbmRlZCc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm0gPSBjcmVhdGVFbGVtZW50KCdmb3JtJywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiAncGx5cl9fbWVudV9fY29udGFpbmVyJyxcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3BseXItc2V0dGluZ3MtJyArIGRhdGEuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbGxlZC1ieSc6ICdwbHlyLXNldHRpbmdzLXRvZ2dsZS0nICsgZGF0YS5pZCxcclxuICAgICAgICAgICAgICAgICAgICByb2xlOiAndGFibGlzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg6IC0xXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaW5uZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaG9tZSA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3BseXItc2V0dGluZ3MtJyArIGRhdGEuaWQgKyAnLWhvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsbGVkLWJ5JzogJ3BseXItc2V0dGluZ3MtdG9nZ2xlLScgKyBkYXRhLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6ICd0YWJwYW5lbCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgdGFiIGxpc3RcclxuICAgICAgICAgICAgICAgIHZhciB0YWJzID0gY3JlYXRlRWxlbWVudCgndWwnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogJ3RhYmxpc3QnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCB0aGUgdGFic1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc2V0dGluZ3MuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWIgPSBjcmVhdGVFbGVtZW50KCdsaScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogJ3RhYicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbjogJydcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsIGV4dGVuZChnZXRBdHRyaWJ1dGVzRnJvbVNlbGVjdG9yKF90aGlzNy5jb25maWcuc2VsZWN0b3JzLmJ1dHRvbnMuc2V0dGluZ3MpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogX3RoaXM3LmNvbmZpZy5jbGFzc05hbWVzLmNvbnRyb2wgKyAnICcgKyBfdGhpczcuY29uZmlnLmNsYXNzTmFtZXMuY29udHJvbCArICctLWZvcndhcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3BseXItc2V0dGluZ3MtJyArIGRhdGEuaWQgKyAnLScgKyB0eXBlICsgJy10YWInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1oYXNwb3B1cCc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWNvbnRyb2xzJzogJ3BseXItc2V0dGluZ3MtJyArIGRhdGEuaWQgKyAnLScgKyB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1leHBhbmRlZCc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksIGkxOG4uZ2V0KHR5cGUsIF90aGlzNy5jb25maWcpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IF90aGlzNy5jb25maWcuY2xhc3NOYW1lcy5tZW51LnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNwZWVkIGNvbnRhaW5zIEhUTUwgZW50aXRpZXNcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5pbm5lckhUTUwgPSBkYXRhW3R5cGVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYi5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYnMuYXBwZW5kQ2hpbGQodGFiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM3LmVsZW1lbnRzLnNldHRpbmdzLnRhYnNbdHlwZV0gPSB0YWI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBob21lLmFwcGVuZENoaWxkKHRhYnMpO1xyXG4gICAgICAgICAgICAgICAgaW5uZXIuYXBwZW5kQ2hpbGQoaG9tZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgdGhlIHBhbmVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zZXR0aW5ncy5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhbmUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAncGx5ci1zZXR0aW5ncy0nICsgZGF0YS5pZCArICctJyArIHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsbGVkLWJ5JzogJ3BseXItc2V0dGluZ3MtJyArIGRhdGEuaWQgKyAnLScgKyB0eXBlICsgJy10YWInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiAndGFicGFuZWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJpbmRleDogLTFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhY2sgPSBjcmVhdGVFbGVtZW50KCdidXR0b24nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogX3RoaXM3LmNvbmZpZy5jbGFzc05hbWVzLmNvbnRyb2wgKyAnICcgKyBfdGhpczcuY29uZmlnLmNsYXNzTmFtZXMuY29udHJvbCArICctLWJhY2snLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1oYXNwb3B1cCc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWNvbnRyb2xzJzogJ3BseXItc2V0dGluZ3MtJyArIGRhdGEuaWQgKyAnLWhvbWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1leHBhbmRlZCc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaTE4bi5nZXQodHlwZSwgX3RoaXM3LmNvbmZpZykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwYW5lLmFwcGVuZENoaWxkKGJhY2spO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhbmUuYXBwZW5kQ2hpbGQob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5uZXIuYXBwZW5kQ2hpbGQocGFuZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNy5lbGVtZW50cy5zZXR0aW5ncy5wYW5lc1t0eXBlXSA9IHBhbmU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGlubmVyKTtcclxuICAgICAgICAgICAgICAgIG1lbnUuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVudSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5zZXR0aW5ncy5mb3JtID0gZm9ybTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuc2V0dGluZ3MubWVudSA9IG1lbnU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFBpY3R1cmUgaW4gcGljdHVyZSBidXR0b25cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKCdwaXAnKSAmJiBzdXBwb3J0LnBpcCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZUJ1dHRvbi5jYWxsKHRoaXMsICdwaXAnKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFpcnBsYXkgYnV0dG9uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcygnYWlycGxheScpICYmIHN1cHBvcnQuYWlycGxheSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRyb2xzLmNyZWF0ZUJ1dHRvbi5jYWxsKHRoaXMsICdhaXJwbGF5JykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBUb2dnbGUgZnVsbHNjcmVlbiBidXR0b25cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKCdmdWxsc2NyZWVuJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9scy5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLCAnZnVsbHNjcmVlbicpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTGFyZ2VyIG92ZXJsYWlkIHBsYXkgYnV0dG9uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9scy5pbmNsdWRlcygncGxheS1sYXJnZScpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250cm9scy5jcmVhdGVCdXR0b24uY2FsbCh0aGlzLCAncGxheS1sYXJnZScpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jb250cm9scyA9IGNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSFRNTDUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzLnNldFF1YWxpdHlNZW51LmNhbGwodGhpcywgaHRtbDUuZ2V0UXVhbGl0eU9wdGlvbnMuY2FsbCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRyb2xzLnNldFNwZWVkTWVudS5jYWxsKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gSW5zZXJ0IGNvbnRyb2xzXHJcbiAgICAgICAgaW5qZWN0OiBmdW5jdGlvbiBpbmplY3QoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpczggPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gU3ByaXRlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5sb2FkU3ByaXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IGNvbnRyb2xzLmdldEljb25VcmwuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGxvYWQgZXh0ZXJuYWwgc3ByaXRlIHVzaW5nIEFKQVhcclxuICAgICAgICAgICAgICAgIGlmIChpY29uLmNvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkU3ByaXRlKGljb24udXJsLCAnc3ByaXRlLXBseXInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgdW5pcXVlIElEXHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBOdWxsIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY29udHJvbHMgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHRlbXBsYXRlIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgdmFyIHByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgICAgICAgICAgICBzZWVrdGltZTogdGhpcy5jb25maWcuc2Vla1RpbWUsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHVwZGF0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXMuc3RyaW5nKHRoaXMuY29uZmlnLmNvbnRyb2xzKSB8fCBpcy5lbGVtZW50KHRoaXMuY29uZmlnLmNvbnRyb2xzKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU3RyaW5nIG9yIEhUTUxFbGVtZW50IHBhc3NlZCBhcyB0aGUgb3B0aW9uXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLmNvbmZpZy5jb250cm9scztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpcy5mdW5jdGlvbih0aGlzLmNvbmZpZy5jb250cm9scykpIHtcclxuICAgICAgICAgICAgICAgIC8vIEEgY3VzdG9tIGZ1bmN0aW9uIHRvIGJ1aWxkIGNvbnRyb2xzXHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgZnVuY3Rpb24gY2FuIHJldHVybiBhIEhUTUxFbGVtZW50IG9yIFN0cmluZ1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5jb25maWcuY29udHJvbHMuY2FsbCh0aGlzLCBwcm9wcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgY29udHJvbHNcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRyb2xzLmNyZWF0ZS5jYWxsKHRoaXMsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5pZCxcclxuICAgICAgICAgICAgICAgICAgICBzZWVrdGltZTogdGhpcy5jb25maWcuc2Vla1RpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IHRoaXMuc3BlZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogdGhpcy5xdWFsaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25zOiBjYXB0aW9ucy5nZXRMYWJlbC5jYWxsKHRoaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogTG9vcGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3A6ICdOb25lJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgcHJvcHMgd2l0aCB0aGVpciB2YWx1ZVxyXG4gICAgICAgICAgICB2YXIgcmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2UoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjMgPSBzbGljZWRUb0FycmF5KF9yZWYyLCAyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5ID0gX3JlZjNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gX3JlZjNbMV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcGxhY2VBbGwocmVzdWx0LCAneycgKyBrZXkgKyAnfScsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgbWFya3VwXHJcbiAgICAgICAgICAgIGlmICh1cGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpcy5zdHJpbmcodGhpcy5jb25maWcuY29udHJvbHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gcmVwbGFjZShjb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpcy5lbGVtZW50KGNvbnRhaW5lcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gcmVwbGFjZShjb250YWluZXIuaW5uZXJIVE1MKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ29udHJvbHMgY29udGFpbmVyXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB2b2lkIDA7XHJcblxyXG4gICAgICAgICAgICAvLyBJbmplY3QgdG8gY3VzdG9tIGxvY2F0aW9uXHJcbiAgICAgICAgICAgIGlmIChpcy5zdHJpbmcodGhpcy5jb25maWcuc2VsZWN0b3JzLmNvbnRyb2xzLmNvbnRhaW5lcikpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb25maWcuc2VsZWN0b3JzLmNvbnRyb2xzLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluamVjdCBpbnRvIHRoZSBjb250YWluZXIgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICBpZiAoIWlzLmVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcy5lbGVtZW50cy5jb250YWluZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluamVjdCBjb250cm9scyBIVE1MXHJcbiAgICAgICAgICAgIGlmIChpcy5lbGVtZW50KGNvbnRhaW5lcikpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY29udGFpbmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRmluZCB0aGUgZWxlbWVudHMgaWYgbmVlZCBiZVxyXG4gICAgICAgICAgICBpZiAoIWlzLmVsZW1lbnQodGhpcy5lbGVtZW50cy5jb250cm9scykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzLmZpbmRFbGVtZW50cy5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBFZGdlIHNvbWV0aW1lcyBkb2Vzbid0IGZpbmlzaCB0aGUgcGFpbnQgc28gZm9yY2UgYSByZWRyYXdcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKCdFZGdlJykpIHtcclxuICAgICAgICAgICAgICAgIHJlcGFpbnQodGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgdG9vbHRpcHNcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnRvb2x0aXBzLmNvbnRyb2xzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2NvbmZpZyA9IHRoaXMuY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMgPSBfY29uZmlnLmNsYXNzTmFtZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JzID0gX2NvbmZpZy5zZWxlY3RvcnM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gc2VsZWN0b3JzLmNvbnRyb2xzLndyYXBwZXIgKyAnICcgKyBzZWxlY3RvcnMubGFiZWxzICsgJyAuJyArIGNsYXNzTmFtZXMuaGlkZGVuO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhYmVscyA9IGdldEVsZW1lbnRzLmNhbGwodGhpcywgc2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIEFycmF5LmZyb20obGFiZWxzKS5mb3JFYWNoKGZ1bmN0aW9uIChsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGxhYmVsLCBfdGhpczguY29uZmlnLmNsYXNzTmFtZXMuaGlkZGVuLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MobGFiZWwsIF90aGlzOC5jb25maWcuY2xhc3NOYW1lcy50b29sdGlwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgYSBzdHJpbmcgdG8gYSBVUkwgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgLSB0aGUgVVJMIHRvIGJlIHBhcnNlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBzYWZlIC0gZmFpbHNhZmUgcGFyc2luZ1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwYXJzZVVybChpbnB1dCkge1xyXG4gICAgICAgIHZhciBzYWZlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB0cnVlO1xyXG5cclxuICAgICAgICB2YXIgdXJsID0gaW5wdXQ7XHJcblxyXG4gICAgICAgIGlmIChzYWZlKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgIHBhcnNlci5ocmVmID0gdXJsO1xyXG4gICAgICAgICAgICB1cmwgPSBwYXJzZXIuaHJlZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVVJMKHVybCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29udmVydCBvYmplY3QgdG8gVVJMU2VhcmNoUGFyYW1zXHJcbiAgICBmdW5jdGlvbiBidWlsZFVybFBhcmFtcyhpbnB1dCkge1xyXG4gICAgICAgIHZhciBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIGlmIChpcy5vYmplY3QoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGlucHV0KS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjIgPSBzbGljZWRUb0FycmF5KF9yZWYsIDIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IF9yZWYyWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gX3JlZjJbMV07XHJcblxyXG4gICAgICAgICAgICAgICAgcGFyYW1zLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgdmFyIGNhcHRpb25zID0ge1xyXG4gICAgICAgIC8vIFNldHVwIGNhcHRpb25zXHJcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uIHNldHVwKCkge1xyXG4gICAgICAgICAgICAvLyBSZXF1aXJlcyBVSSBzdXBwb3J0XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdXBwb3J0ZWQudWkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gT25seSBWaW1lbyBhbmQgSFRNTDUgdmlkZW8gc3VwcG9ydGVkIGF0IHRoaXMgcG9pbnRcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmlkZW8gfHwgdGhpcy5pc1lvdVR1YmUgfHwgdGhpcy5pc0hUTUw1ICYmICFzdXBwb3J0LnRleHRUcmFja3MpIHtcclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIG1lbnUgYW5kIGhpZGVcclxuICAgICAgICAgICAgICAgIGlmIChpcy5hcnJheSh0aGlzLmNvbmZpZy5jb250cm9scykgJiYgdGhpcy5jb25maWcuY29udHJvbHMuaW5jbHVkZXMoJ3NldHRpbmdzJykgJiYgdGhpcy5jb25maWcuc2V0dGluZ3MuaW5jbHVkZXMoJ2NhcHRpb25zJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9scy5zZXRDYXB0aW9uc01lbnUuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluamVjdCB0aGUgY29udGFpbmVyXHJcbiAgICAgICAgICAgIGlmICghaXMuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmNhcHRpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5jYXB0aW9ucyA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIGdldEF0dHJpYnV0ZXNGcm9tU2VsZWN0b3IodGhpcy5jb25maWcuc2VsZWN0b3JzLmNhcHRpb25zKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5zZXJ0QWZ0ZXIodGhpcy5lbGVtZW50cy5jYXB0aW9ucywgdGhpcy5lbGVtZW50cy53cmFwcGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRml4IElFIGNhcHRpb25zIGlmIENPUlMgaXMgdXNlZFxyXG4gICAgICAgICAgICAvLyBGZXRjaCBjYXB0aW9ucyBhbmQgaW5qZWN0IGFzIGJsb2JzIGluc3RlYWQgKGRhdGEgVVJJcyBub3Qgc3VwcG9ydGVkISlcclxuICAgICAgICAgICAgaWYgKGJyb3dzZXIuaXNJRSAmJiB3aW5kb3cuVVJMKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudHMgPSB0aGlzLm1lZGlhLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyYWNrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShlbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAodHJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3JjID0gdHJhY2suZ2V0QXR0cmlidXRlKCdzcmMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gcGFyc2VVcmwoc3JjKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVybCAhPT0gbnVsbCAmJiB1cmwuaG9zdG5hbWUgIT09IHdpbmRvdy5sb2NhdGlvbi5ocmVmLmhvc3RuYW1lICYmIFsnaHR0cDonLCAnaHR0cHM6J10uaW5jbHVkZXModXJsLnByb3RvY29sKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChzcmMsICdibG9iJykudGhlbihmdW5jdGlvbiAoYmxvYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2suc2V0QXR0cmlidXRlKCdzcmMnLCB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUVsZW1lbnQodHJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGFuZCBzZXQgaW5pdGlhbCBkYXRhXHJcbiAgICAgICAgICAgIC8vIFRoZSBcInByZWZlcnJlZFwiIG9wdGlvbnMgYXJlIG5vdCByZWFsaXplZCB1bmxlc3MgLyB1bnRpbCB0aGUgd2FudGVkIGxhbmd1YWdlIGhhcyBhIG1hdGNoXHJcbiAgICAgICAgICAgIC8vICogbGFuZ3VhZ2VzOiBBcnJheSBvZiB1c2VyJ3MgYnJvd3NlciBsYW5ndWFnZXMuXHJcbiAgICAgICAgICAgIC8vICogbGFuZ3VhZ2U6ICBUaGUgbGFuZ3VhZ2UgcHJlZmVycmVkIGJ5IHVzZXIgc2V0dGluZ3Mgb3IgY29uZmlnXHJcbiAgICAgICAgICAgIC8vICogYWN0aXZlOiAgICBUaGUgc3RhdGUgcHJlZmVycmVkIGJ5IHVzZXIgc2V0dGluZ3Mgb3IgY29uZmlnXHJcbiAgICAgICAgICAgIC8vICogdG9nZ2xlZDogICBUaGUgcmVhbCBjYXB0aW9ucyBzdGF0ZVxyXG5cclxuICAgICAgICAgICAgdmFyIGxhbmd1YWdlcyA9IGRlZHVwZShBcnJheS5mcm9tKG5hdmlnYXRvci5sYW5ndWFnZXMgfHwgbmF2aWdhdG9yLnVzZXJMYW5ndWFnZSkubWFwKGZ1bmN0aW9uIChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlLnNwbGl0KCctJylbMF07XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsYW5ndWFnZSA9ICh0aGlzLnN0b3JhZ2UuZ2V0KCdsYW5ndWFnZScpIHx8IHRoaXMuY29uZmlnLmNhcHRpb25zLmxhbmd1YWdlIHx8ICdhdXRvJykudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZSBmaXJzdCBicm93c2VyIGxhbmd1YWdlIHdoZW4gbGFuZ3VhZ2UgaXMgJ2F1dG8nXHJcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2xhbmd1YWdlcyA9IHNsaWNlZFRvQXJyYXkobGFuZ3VhZ2VzLCAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IF9sYW5ndWFnZXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSB0aGlzLnN0b3JhZ2UuZ2V0KCdjYXB0aW9ucycpO1xyXG4gICAgICAgICAgICBpZiAoIWlzLmJvb2xlYW4oYWN0aXZlKSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gdGhpcy5jb25maWcuY2FwdGlvbnMuYWN0aXZlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY2FwdGlvbnMsIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBhY3RpdmUsXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZTogbGFuZ3VhZ2UsXHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZXM6IGxhbmd1YWdlc1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFdhdGNoIGNoYW5nZXMgdG8gdGV4dFRyYWNrcyBhbmQgdXBkYXRlIGNhcHRpb25zIG1lbnVcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNIVE1MNSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyYWNrRXZlbnRzID0gdGhpcy5jb25maWcuY2FwdGlvbnMudXBkYXRlID8gJ2FkZHRyYWNrIHJlbW92ZXRyYWNrJyA6ICdyZW1vdmV0cmFjayc7XHJcbiAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMsIHRoaXMubWVkaWEudGV4dFRyYWNrcywgdHJhY2tFdmVudHMsIGNhcHRpb25zLnVwZGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIGF2YWlsYWJsZSBsYW5ndWFnZXMgaW4gbGlzdCBuZXh0IHRpY2sgKHRoZSBldmVudCBtdXN0IG5vdCBiZSB0cmlnZ2VyZWQgYmVmb3JlIHRoZSBsaXN0ZW5lcnMpXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoY2FwdGlvbnMudXBkYXRlLmJpbmQodGhpcyksIDApO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgYXZhaWxhYmxlIGxhbmd1YWdlIG9wdGlvbnMgaW4gc2V0dGluZ3MgYmFzZWQgb24gdHJhY2tzXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHJhY2tzID0gY2FwdGlvbnMuZ2V0VHJhY2tzLmNhbGwodGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgd2FudGVkIGxhbmd1YWdlXHJcbiAgICAgICAgICAgIHZhciBfY2FwdGlvbnMgPSB0aGlzLmNhcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gX2NhcHRpb25zLmFjdGl2ZSxcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlID0gX2NhcHRpb25zLmxhbmd1YWdlLFxyXG4gICAgICAgICAgICAgICAgbWV0YSA9IF9jYXB0aW9ucy5tZXRhLFxyXG4gICAgICAgICAgICAgICAgY3VycmVudFRyYWNrTm9kZSA9IF9jYXB0aW9ucy5jdXJyZW50VHJhY2tOb2RlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxhbmd1YWdlRXhpc3RzID0gQm9vbGVhbih0cmFja3MuZmluZChmdW5jdGlvbiAodHJhY2spIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjay5sYW5ndWFnZSA9PT0gbGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0cmFja3MgKGFkZCBldmVudCBsaXN0ZW5lciBhbmQgXCJwc2V1ZG9cIi1kZWZhdWx0KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0hUTUw1ICYmIHRoaXMuaXNWaWRlbykge1xyXG4gICAgICAgICAgICAgICAgdHJhY2tzLmZpbHRlcihmdW5jdGlvbiAodHJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIW1ldGEuZ2V0KHRyYWNrKTtcclxuICAgICAgICAgICAgICAgIH0pLmZvckVhY2goZnVuY3Rpb24gKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVidWcubG9nKCdUcmFjayBhZGRlZCcsIHRyYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBdHRlbXB0IHRvIHN0b3JlIGlmIHRoZSBvcmlnaW5hbCBkb20gZWxlbWVudCB3YXMgXCJkZWZhdWx0XCJcclxuICAgICAgICAgICAgICAgICAgICBtZXRhLnNldCh0cmFjaywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB0cmFjay5tb2RlID09PSAnc2hvd2luZydcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHVybiBvZmYgbmF0aXZlIGNhcHRpb24gcmVuZGVyaW5nIHRvIGF2b2lkIGRvdWJsZSBjYXB0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrLm1vZGUgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGZvciBjdWUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIG9uLmNhbGwoX3RoaXMsIHRyYWNrLCAnY3VlY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FwdGlvbnMudXBkYXRlQ3Vlcy5jYWxsKF90aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgbGFuZ3VhZ2UgZmlyc3QgdGltZSBpdCBtYXRjaGVzLCBvciBpZiB0aGUgcHJldmlvdXMgbWF0Y2hpbmcgdHJhY2sgd2FzIHJlbW92ZWRcclxuICAgICAgICAgICAgaWYgKGxhbmd1YWdlRXhpc3RzICYmIHRoaXMubGFuZ3VhZ2UgIT09IGxhbmd1YWdlIHx8ICF0cmFja3MuaW5jbHVkZXMoY3VycmVudFRyYWNrTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25zLnNldExhbmd1YWdlLmNhbGwodGhpcywgbGFuZ3VhZ2UpO1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbnMudG9nZ2xlLmNhbGwodGhpcywgYWN0aXZlICYmIGxhbmd1YWdlRXhpc3RzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRW5hYmxlIG9yIGRpc2FibGUgY2FwdGlvbnMgYmFzZWQgb24gdHJhY2sgbGVuZ3RoXHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLmNhcHRpb25zLmVuYWJsZWQsICFpcy5lbXB0eSh0cmFja3MpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhdmFpbGFibGUgbGFuZ3VhZ2VzIGluIGxpc3RcclxuICAgICAgICAgICAgaWYgKCh0aGlzLmNvbmZpZy5jb250cm9scyB8fCBbXSkuaW5jbHVkZXMoJ3NldHRpbmdzJykgJiYgdGhpcy5jb25maWcuc2V0dGluZ3MuaW5jbHVkZXMoJ2NhcHRpb25zJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzLnNldENhcHRpb25zTWVudS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFRvZ2dsZSBjYXB0aW9ucyBkaXNwbGF5XHJcbiAgICAgICAgLy8gVXNlZCBpbnRlcm5hbGx5IGZvciB0aGUgdG9nZ2xlQ2FwdGlvbnMgbWV0aG9kLCB3aXRoIHRoZSBwYXNzaXZlIG9wdGlvbiBmb3JjZWQgdG8gZmFsc2VcclxuICAgICAgICB0b2dnbGU6IGZ1bmN0aW9uIHRvZ2dsZShpbnB1dCkge1xyXG4gICAgICAgICAgICB2YXIgcGFzc2l2ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gZnVsbCBzdXBwb3J0XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdXBwb3J0ZWQudWkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRvZ2dsZWQgPSB0aGlzLmNhcHRpb25zLnRvZ2dsZWQ7IC8vIEN1cnJlbnQgc3RhdGVcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3RpdmVDbGFzcyA9IHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuY2FwdGlvbnMuYWN0aXZlO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBuZXh0IHN0YXRlXHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBtZXRob2QgaXMgY2FsbGVkIHdpdGhvdXQgcGFyYW1ldGVyLCB0b2dnbGUgYmFzZWQgb24gY3VycmVudCB2YWx1ZVxyXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gaXMubnVsbE9yVW5kZWZpbmVkKGlucHV0KSA/ICF0b2dnbGVkIDogaW5wdXQ7XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgc3RhdGUgYW5kIHRyaWdnZXIgZXZlbnRcclxuICAgICAgICAgICAgaWYgKGFjdGl2ZSAhPT0gdG9nZ2xlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBwYXNzaXZlLCBkb24ndCBvdmVycmlkZSB1c2VyIHByZWZlcmVuY2VzXHJcbiAgICAgICAgICAgICAgICBpZiAoIXBhc3NpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcHRpb25zLmFjdGl2ZSA9IGFjdGl2ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHsgY2FwdGlvbnM6IGFjdGl2ZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGb3JjZSBsYW5ndWFnZSBpZiB0aGUgY2FsbCBpc24ndCBwYXNzaXZlIGFuZCB0aGVyZSBpcyBubyBtYXRjaGluZyBsYW5ndWFnZSB0byB0b2dnbGUgdG9cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sYW5ndWFnZSAmJiBhY3RpdmUgJiYgIXBhc3NpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhY2tzID0gY2FwdGlvbnMuZ2V0VHJhY2tzLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYWNrID0gY2FwdGlvbnMuZmluZFRyYWNrLmNhbGwodGhpcywgW3RoaXMuY2FwdGlvbnMubGFuZ3VhZ2VdLmNvbmNhdCh0b0NvbnN1bWFibGVBcnJheSh0aGlzLmNhcHRpb25zLmxhbmd1YWdlcykpLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT3ZlcnJpZGUgdXNlciBwcmVmZXJlbmNlcyB0byBhdm9pZCBzd2l0Y2hpbmcgbGFuZ3VhZ2VzIGlmIGEgbWF0Y2hpbmcgdHJhY2sgaXMgYWRkZWRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcHRpb25zLmxhbmd1YWdlID0gdHJhY2subGFuZ3VhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCBjYXB0aW9uLCBidXQgZG9uJ3Qgc3RvcmUgaW4gbG9jYWxTdG9yYWdlIGFzIHVzZXIgcHJlZmVyZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25zLnNldC5jYWxsKHRoaXMsIHRyYWNrcy5pbmRleE9mKHRyYWNrKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSBidXR0b24gaWYgaXQncyBlbmFibGVkXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50cy5idXR0b25zLmNhcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5idXR0b25zLmNhcHRpb25zLnByZXNzZWQgPSBhY3RpdmU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIGNsYXNzIGhvb2tcclxuICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLCBhY3RpdmVDbGFzcywgYWN0aXZlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhcHRpb25zLnRvZ2dsZWQgPSBhY3RpdmU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHNldHRpbmdzIG1lbnVcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzLnVwZGF0ZVNldHRpbmcuY2FsbCh0aGlzLCAnY2FwdGlvbnMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50IChub3QgdXNlZCBpbnRlcm5hbGx5KVxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwodGhpcywgdGhpcy5tZWRpYSwgYWN0aXZlID8gJ2NhcHRpb25zZW5hYmxlZCcgOiAnY2FwdGlvbnNkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFNldCBjYXB0aW9ucyBieSB0cmFjayBpbmRleFxyXG4gICAgICAgIC8vIFVzZWQgaW50ZXJuYWxseSBmb3IgdGhlIGN1cnJlbnRUcmFjayBzZXR0ZXIgd2l0aCB0aGUgcGFzc2l2ZSBvcHRpb24gZm9yY2VkIHRvIGZhbHNlXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoaW5kZXgpIHtcclxuICAgICAgICAgICAgdmFyIHBhc3NpdmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHJhY2tzID0gY2FwdGlvbnMuZ2V0VHJhY2tzLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGNhcHRpb25zIGlmIHNldHRpbmcgdG8gLTFcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbnMudG9nZ2xlLmNhbGwodGhpcywgZmFsc2UsIHBhc3NpdmUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzLm51bWJlcihpbmRleCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcud2FybignSW52YWxpZCBjYXB0aW9uIGFyZ3VtZW50JywgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIShpbmRleCBpbiB0cmFja3MpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLndhcm4oJ1RyYWNrIG5vdCBmb3VuZCcsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FwdGlvbnMuY3VycmVudFRyYWNrICE9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXB0aW9ucy5jdXJyZW50VHJhY2sgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHZhciB0cmFjayA9IHRyYWNrc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIF9yZWYgPSB0cmFjayB8fCB7fSxcclxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IF9yZWYubGFuZ3VhZ2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgcmVmZXJlbmNlIHRvIG5vZGUgZm9yIGludmFsaWRhdGlvbiBvbiByZW1vdmVcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXB0aW9ucy5jdXJyZW50VHJhY2tOb2RlID0gdHJhY2s7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHNldHRpbmdzIG1lbnVcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xzLnVwZGF0ZVNldHRpbmcuY2FsbCh0aGlzLCAnY2FwdGlvbnMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBXaGVuIHBhc3NpdmUsIGRvbid0IG92ZXJyaWRlIHVzZXIgcHJlZmVyZW5jZXNcclxuICAgICAgICAgICAgICAgIGlmICghcGFzc2l2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FwdGlvbnMubGFuZ3VhZ2UgPSBsYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KHsgbGFuZ3VhZ2U6IGxhbmd1YWdlIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBWaW1lbyBjYXB0aW9uc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWaW1lbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1iZWQuZW5hYmxlVGV4dFRyYWNrKGxhbmd1YWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbCh0aGlzLCB0aGlzLm1lZGlhLCAnbGFuZ3VhZ2VjaGFuZ2UnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU2hvdyBjYXB0aW9uc1xyXG4gICAgICAgICAgICBjYXB0aW9ucy50b2dnbGUuY2FsbCh0aGlzLCB0cnVlLCBwYXNzaXZlKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSFRNTDUgJiYgdGhpcy5pc1ZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBjaGFuZ2UgdGhlIGFjdGl2ZSB0cmFjayB3aGlsZSBhIGN1ZSBpcyBhbHJlYWR5IGRpc3BsYXllZCB3ZSBuZWVkIHRvIHVwZGF0ZSBpdFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbnMudXBkYXRlQ3Vlcy5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFNldCBjYXB0aW9ucyBieSBsYW5ndWFnZVxyXG4gICAgICAgIC8vIFVzZWQgaW50ZXJuYWxseSBmb3IgdGhlIGxhbmd1YWdlIHNldHRlciB3aXRoIHRoZSBwYXNzaXZlIG9wdGlvbiBmb3JjZWQgdG8gZmFsc2VcclxuICAgICAgICBzZXRMYW5ndWFnZTogZnVuY3Rpb24gc2V0TGFuZ3VhZ2UoaW5wdXQpIHtcclxuICAgICAgICAgICAgdmFyIHBhc3NpdmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzLnN0cmluZyhpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcud2FybignSW52YWxpZCBsYW5ndWFnZSBhcmd1bWVudCcsIGlucHV0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBOb3JtYWxpemVcclxuICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gaW5wdXQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5jYXB0aW9ucy5sYW5ndWFnZSA9IGxhbmd1YWdlO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IGN1cnJlbnRUcmFja1xyXG4gICAgICAgICAgICB2YXIgdHJhY2tzID0gY2FwdGlvbnMuZ2V0VHJhY2tzLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciB0cmFjayA9IGNhcHRpb25zLmZpbmRUcmFjay5jYWxsKHRoaXMsIFtsYW5ndWFnZV0pO1xyXG4gICAgICAgICAgICBjYXB0aW9ucy5zZXQuY2FsbCh0aGlzLCB0cmFja3MuaW5kZXhPZih0cmFjayksIHBhc3NpdmUpO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBHZXQgY3VycmVudCB2YWxpZCBjYXB0aW9uIHRyYWNrc1xyXG4gICAgICAgIC8vIElmIHVwZGF0ZSBpcyBmYWxzZSBpdCB3aWxsIGFsc28gaWdub3JlIHRyYWNrcyB3aXRob3V0IG1ldGFkYXRhXHJcbiAgICAgICAgLy8gVGhpcyBpcyB1c2VkIHRvIFwiZnJlZXplXCIgdGhlIGxhbmd1YWdlIG9wdGlvbnMgd2hlbiBjYXB0aW9ucy51cGRhdGUgaXMgZmFsc2VcclxuICAgICAgICBnZXRUcmFja3M6IGZ1bmN0aW9uIGdldFRyYWNrcygpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgdXBkYXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSBtZWRpYSBvciB0ZXh0VHJhY2tzIG1pc3Npbmcgb3IgbnVsbFxyXG4gICAgICAgICAgICB2YXIgdHJhY2tzID0gQXJyYXkuZnJvbSgodGhpcy5tZWRpYSB8fCB7fSkudGV4dFRyYWNrcyB8fCBbXSk7XHJcbiAgICAgICAgICAgIC8vIEZvciBIVE1MNSwgdXNlIGNhY2hlIGluc3RlYWQgb2YgY3VycmVudCB0cmFja3Mgd2hlbiBpdCBleGlzdHMgKGlmIGNhcHRpb25zLnVwZGF0ZSBpcyBmYWxzZSlcclxuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCByZW1vdmVkIHRyYWNrcyBhbmQgdHJhY2tzIHRoYXQgYXJlbid0IGNhcHRpb25zL3N1YnRpdGxlcyAoZm9yIGV4YW1wbGUgbWV0YWRhdGEpXHJcbiAgICAgICAgICAgIHJldHVybiB0cmFja3MuZmlsdGVyKGZ1bmN0aW9uICh0cmFjaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICFfdGhpczIuaXNIVE1MNSB8fCB1cGRhdGUgfHwgX3RoaXMyLmNhcHRpb25zLm1ldGEuaGFzKHRyYWNrKTtcclxuICAgICAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uICh0cmFjaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsnY2FwdGlvbnMnLCAnc3VidGl0bGVzJ10uaW5jbHVkZXModHJhY2sua2luZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBNYXRjaCB0cmFja3MgYmFzZWQgb24gbGFuZ3VhZ2VzIGFuZCBnZXQgdGhlIGZpcnN0XHJcbiAgICAgICAgZmluZFRyYWNrOiBmdW5jdGlvbiBmaW5kVHJhY2sobGFuZ3VhZ2VzKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0cmFja3MgPSBjYXB0aW9ucy5nZXRUcmFja3MuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIHNvcnRJc0RlZmF1bHQgPSBmdW5jdGlvbiBzb3J0SXNEZWZhdWx0KHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKChfdGhpczMuY2FwdGlvbnMubWV0YS5nZXQodHJhY2spIHx8IHt9KS5kZWZhdWx0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIHNvcnRlZCA9IEFycmF5LmZyb20odHJhY2tzKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc29ydElzRGVmYXVsdChiKSAtIHNvcnRJc0RlZmF1bHQoYSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgdHJhY2sgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIGxhbmd1YWdlcy5ldmVyeShmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrID0gc29ydGVkLmZpbmQoZnVuY3Rpb24gKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNrLmxhbmd1YWdlID09PSBsYW5ndWFnZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICF0cmFjazsgLy8gQnJlYWsgaXRlcmF0aW9uIGlmIHRoZXJlIGlzIGEgbWF0Y2hcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIElmIG5vIG1hdGNoIGlzIGZvdW5kIGJ1dCBpcyByZXF1aXJlZCwgZ2V0IGZpcnN0XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFjayB8fCAoZm9yY2UgPyBzb3J0ZWRbMF0gOiB1bmRlZmluZWQpO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIGN1cnJlbnQgdHJhY2tcclxuICAgICAgICBnZXRDdXJyZW50VHJhY2s6IGZ1bmN0aW9uIGdldEN1cnJlbnRUcmFjaygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhcHRpb25zLmdldFRyYWNrcy5jYWxsKHRoaXMpW3RoaXMuY3VycmVudFRyYWNrXTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gR2V0IFVJIGxhYmVsIGZvciB0cmFja1xyXG4gICAgICAgIGdldExhYmVsOiBmdW5jdGlvbiBnZXRMYWJlbCh0cmFjaykge1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudFRyYWNrID0gdHJhY2s7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzLnRyYWNrKGN1cnJlbnRUcmFjaykgJiYgc3VwcG9ydC50ZXh0VHJhY2tzICYmIHRoaXMuY2FwdGlvbnMudG9nZ2xlZCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRyYWNrID0gY2FwdGlvbnMuZ2V0Q3VycmVudFRyYWNrLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpcy50cmFjayhjdXJyZW50VHJhY2spKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzLmVtcHR5KGN1cnJlbnRUcmFjay5sYWJlbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFRyYWNrLmxhYmVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXMuZW1wdHkoY3VycmVudFRyYWNrLmxhbmd1YWdlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFjay5sYW5ndWFnZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBpMThuLmdldCgnZW5hYmxlZCcsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGkxOG4uZ2V0KCdkaXNhYmxlZCcsIHRoaXMuY29uZmlnKTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIGNhcHRpb25zIHVzaW5nIGN1cnJlbnQgdHJhY2sncyBhY3RpdmUgY3Vlc1xyXG4gICAgICAgIC8vIEFsc28gb3B0aW9uYWwgYXJyYXkgYXJndW1lbnQgaW4gY2FzZSB0aGVyZSBpc24ndCBhbnkgdHJhY2sgKGV4OiB2aW1lbylcclxuICAgICAgICB1cGRhdGVDdWVzOiBmdW5jdGlvbiB1cGRhdGVDdWVzKGlucHV0KSB7XHJcbiAgICAgICAgICAgIC8vIFJlcXVpcmVzIFVJXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdXBwb3J0ZWQudWkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFpcy5lbGVtZW50KHRoaXMuZWxlbWVudHMuY2FwdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLndhcm4oJ05vIGNhcHRpb25zIGVsZW1lbnQgdG8gcmVuZGVyIHRvJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIE9ubHkgYWNjZXB0IGFycmF5IG9yIGVtcHR5IGlucHV0XHJcbiAgICAgICAgICAgIGlmICghaXMubnVsbE9yVW5kZWZpbmVkKGlucHV0KSAmJiAhQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcud2FybigndXBkYXRlQ3VlczogSW52YWxpZCBpbnB1dCcsIGlucHV0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGN1ZXMgPSBpbnB1dDtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBjdWVzIGZyb20gdHJhY2tcclxuICAgICAgICAgICAgaWYgKCFjdWVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhY2sgPSBjYXB0aW9ucy5nZXRDdXJyZW50VHJhY2suY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGN1ZXMgPSBBcnJheS5mcm9tKCh0cmFjayB8fCB7fSkuYWN0aXZlQ3VlcyB8fCBbXSkubWFwKGZ1bmN0aW9uIChjdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VlLmdldEN1ZUFzSFRNTCgpO1xyXG4gICAgICAgICAgICAgICAgfSkubWFwKGdldEhUTUwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgbmV3IGNhcHRpb24gdGV4dFxyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IGN1ZXMubWFwKGZ1bmN0aW9uIChjdWVUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VlVGV4dC50cmltKCk7XHJcbiAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xyXG4gICAgICAgICAgICB2YXIgY2hhbmdlZCA9IGNvbnRlbnQgIT09IHRoaXMuZWxlbWVudHMuY2FwdGlvbnMuaW5uZXJIVE1MO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEVtcHR5IHRoZSBjb250YWluZXIgYW5kIGNyZWF0ZSBhIG5ldyBjaGlsZCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICBlbXB0eUVsZW1lbnQodGhpcy5lbGVtZW50cy5jYXB0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FwdGlvbiA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCBnZXRBdHRyaWJ1dGVzRnJvbVNlbGVjdG9yKHRoaXMuY29uZmlnLnNlbGVjdG9ycy5jYXB0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uLmlubmVySFRNTCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNhcHRpb25zLmFwcGVuZENoaWxkKGNhcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgZXZlbnRcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHRoaXMsIHRoaXMubWVkaWEsICdjdWVjaGFuZ2UnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFBseXIgZGVmYXVsdCBjb25maWdcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgdmFyIGRlZmF1bHRzJDEgPSB7XHJcbiAgICAgICAgLy8gRGlzYWJsZVxyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcblxyXG4gICAgICAgIC8vIEN1c3RvbSBtZWRpYSB0aXRsZVxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuXHJcbiAgICAgICAgLy8gTG9nZ2luZyB0byBjb25zb2xlXHJcbiAgICAgICAgZGVidWc6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBBdXRvIHBsYXkgKGlmIHN1cHBvcnRlZClcclxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXHJcblxyXG4gICAgICAgIC8vIE9ubHkgYWxsb3cgb25lIG1lZGlhIHBsYXlpbmcgYXQgb25jZSAodmltZW8gb25seSlcclxuICAgICAgICBhdXRvcGF1c2U6IHRydWUsXHJcblxyXG4gICAgICAgIC8vIEFsbG93IGlubGluZSBwbGF5YmFjayBvbiBpT1MgKHRoaXMgZWZmZWN0cyBZb3VUdWJlL1ZpbWVvIC0gSFRNTDUgcmVxdWlyZXMgdGhlIGF0dHJpYnV0ZSBwcmVzZW50KVxyXG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSBpb3NOYXRpdmUgZnVsbHNjcmVlbiBvcHRpb24gaW4gZmF2b3VyIG9mIHRoaXMgKGxvZ2ljIG5lZWRzIHdvcmspXHJcbiAgICAgICAgcGxheXNpbmxpbmU6IHRydWUsXHJcblxyXG4gICAgICAgIC8vIERlZmF1bHQgdGltZSB0byBza2lwIHdoZW4gcmV3aW5kL2Zhc3QgZm9yd2FyZFxyXG4gICAgICAgIHNlZWtUaW1lOiAxMCxcclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCB2b2x1bWVcclxuICAgICAgICB2b2x1bWU6IDEsXHJcbiAgICAgICAgbXV0ZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICAvLyBQYXNzIGEgY3VzdG9tIGR1cmF0aW9uXHJcbiAgICAgICAgZHVyYXRpb246IG51bGwsXHJcblxyXG4gICAgICAgIC8vIERpc3BsYXkgdGhlIG1lZGlhIGR1cmF0aW9uIG9uIGxvYWQgaW4gdGhlIGN1cnJlbnQgdGltZSBwb3NpdGlvblxyXG4gICAgICAgIC8vIElmIHlvdSBoYXZlIG9wdGVkIHRvIGRpc3BsYXkgYm90aCBkdXJhdGlvbiBhbmQgY3VycmVudFRpbWUsIHRoaXMgaXMgaWdub3JlZFxyXG4gICAgICAgIGRpc3BsYXlEdXJhdGlvbjogdHJ1ZSxcclxuXHJcbiAgICAgICAgLy8gSW52ZXJ0IHRoZSBjdXJyZW50IHRpbWUgdG8gYmUgYSBjb3VudGRvd25cclxuICAgICAgICBpbnZlcnRUaW1lOiB0cnVlLFxyXG5cclxuICAgICAgICAvLyBDbGlja2luZyB0aGUgY3VycmVudFRpbWUgaW52ZXJ0cyBpdCdzIHZhbHVlIHRvIHNob3cgdGltZSBsZWZ0IHJhdGhlciB0aGFuIGVsYXBzZWRcclxuICAgICAgICB0b2dnbGVJbnZlcnQ6IHRydWUsXHJcblxyXG4gICAgICAgIC8vIEFzcGVjdCByYXRpbyAoZm9yIGVtYmVkcylcclxuICAgICAgICByYXRpbzogJzE2OjknLFxyXG5cclxuICAgICAgICAvLyBDbGljayB2aWRlbyBjb250YWluZXIgdG8gcGxheS9wYXVzZVxyXG4gICAgICAgIGNsaWNrVG9QbGF5OiB0cnVlLFxyXG5cclxuICAgICAgICAvLyBBdXRvIGhpZGUgdGhlIGNvbnRyb2xzXHJcbiAgICAgICAgaGlkZUNvbnRyb2xzOiB0cnVlLFxyXG5cclxuICAgICAgICAvLyBSZXNldCB0byBzdGFydCB3aGVuIHBsYXliYWNrIGVuZGVkXHJcbiAgICAgICAgcmVzZXRPbkVuZDogZmFsc2UsXHJcblxyXG4gICAgICAgIC8vIERpc2FibGUgdGhlIHN0YW5kYXJkIGNvbnRleHQgbWVudVxyXG4gICAgICAgIGRpc2FibGVDb250ZXh0TWVudTogdHJ1ZSxcclxuXHJcbiAgICAgICAgLy8gU3ByaXRlIChmb3IgaWNvbnMpXHJcbiAgICAgICAgbG9hZFNwcml0ZTogdHJ1ZSxcclxuICAgICAgICBpY29uUHJlZml4OiAncGx5cicsXHJcbiAgICAgICAgaWNvblVybDogJ2h0dHBzOi8vY2RuLnBseXIuaW8vMy4zLjEyL3BseXIuc3ZnJyxcclxuXHJcbiAgICAgICAgLy8gQmxhbmsgdmlkZW8gKHVzZWQgdG8gcHJldmVudCBlcnJvcnMgb24gc291cmNlIGNoYW5nZSlcclxuICAgICAgICBibGFua1ZpZGVvOiAnaHR0cHM6Ly9jZG4ucGx5ci5pby9zdGF0aWMvYmxhbmsubXA0JyxcclxuXHJcbiAgICAgICAgLy8gUXVhbGl0eSBkZWZhdWx0XHJcbiAgICAgICAgcXVhbGl0eToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiA1NzYsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IFs0MzIwLCAyODgwLCAyMTYwLCAxNDQwLCAxMDgwLCA3MjAsIDU3NiwgNDgwLCAzNjAsIDI0MCwgJ2RlZmF1bHQnXVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFNldCBsb29wc1xyXG4gICAgICAgIGxvb3A6IHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZVxyXG4gICAgICAgICAgICAvLyBzdGFydDogbnVsbCxcclxuICAgICAgICAgICAgLy8gZW5kOiBudWxsLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFNwZWVkIGRlZmF1bHQgYW5kIG9wdGlvbnMgdG8gZGlzcGxheVxyXG4gICAgICAgIHNwZWVkOiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAxLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBbMC41LCAwLjc1LCAxLCAxLjI1LCAxLjUsIDEuNzUsIDJdXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gS2V5Ym9hcmQgc2hvcnRjdXQgc2V0dGluZ3NcclxuICAgICAgICBrZXlib2FyZDoge1xyXG4gICAgICAgICAgICBmb2N1c2VkOiB0cnVlLFxyXG4gICAgICAgICAgICBnbG9iYWw6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRGlzcGxheSB0b29sdGlwc1xyXG4gICAgICAgIHRvb2x0aXBzOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiBmYWxzZSxcclxuICAgICAgICAgICAgc2VlazogdHJ1ZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIENhcHRpb25zIHNldHRpbmdzXHJcbiAgICAgICAgY2FwdGlvbnM6IHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgbGFuZ3VhZ2U6ICdhdXRvJyxcclxuICAgICAgICAgICAgLy8gTGlzdGVuIHRvIG5ldyB0cmFja3MgYWRkZWQgYWZ0ZXIgUGx5ciBpcyBpbml0aWFsaXplZC5cclxuICAgICAgICAgICAgLy8gVGhpcyBpcyBuZWVkZWQgZm9yIHN0cmVhbWluZyBjYXB0aW9ucywgYnV0IG1heSByZXN1bHQgaW4gdW5zZWxlY3RhYmxlIG9wdGlvbnNcclxuICAgICAgICAgICAgdXBkYXRlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEZ1bGxzY3JlZW4gc2V0dGluZ3NcclxuICAgICAgICBmdWxsc2NyZWVuOiB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsIC8vIEFsbG93IGZ1bGxzY3JlZW4/XHJcbiAgICAgICAgICAgIGZhbGxiYWNrOiB0cnVlLCAvLyBGYWxsYmFjayBmb3IgdmludGFnZSBicm93c2Vyc1xyXG4gICAgICAgICAgICBpb3NOYXRpdmU6IGZhbHNlIC8vIFVzZSB0aGUgbmF0aXZlIGZ1bGxzY3JlZW4gaW4gaU9TIChkaXNhYmxlcyBjdXN0b20gY29udHJvbHMpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gTG9jYWwgc3RvcmFnZVxyXG4gICAgICAgIHN0b3JhZ2U6IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAga2V5OiAncGx5cidcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IGNvbnRyb2xzXHJcbiAgICAgICAgY29udHJvbHM6IFsncGxheS1sYXJnZScsXHJcbiAgICAgICAgICAgIC8vICdyZXN0YXJ0JyxcclxuICAgICAgICAgICAgLy8gJ3Jld2luZCcsXHJcbiAgICAgICAgICAgICdwbGF5JyxcclxuICAgICAgICAgICAgLy8gJ2Zhc3QtZm9yd2FyZCcsXHJcbiAgICAgICAgICAgICdwcm9ncmVzcycsICdjdXJyZW50LXRpbWUnLCAnbXV0ZScsICd2b2x1bWUnLCAnY2FwdGlvbnMnLCAnc2V0dGluZ3MnLCAncGlwJywgJ2FpcnBsYXknLCAnZnVsbHNjcmVlbiddLFxyXG4gICAgICAgIHNldHRpbmdzOiBbJ2NhcHRpb25zJywgJ3F1YWxpdHknLCAnc3BlZWQnXSxcclxuXHJcbiAgICAgICAgLy8gTG9jYWxpc2F0aW9uXHJcbiAgICAgICAgaTE4bjoge1xyXG4gICAgICAgICAgICByZXN0YXJ0OiAnUmVzdGFydCcsXHJcbiAgICAgICAgICAgIHJld2luZDogJ1Jld2luZCB7c2Vla3RpbWV9cycsXHJcbiAgICAgICAgICAgIHBsYXk6ICdQbGF5JyxcclxuICAgICAgICAgICAgcGF1c2U6ICdQYXVzZScsXHJcbiAgICAgICAgICAgIGZhc3RGb3J3YXJkOiAnRm9yd2FyZCB7c2Vla3RpbWV9cycsXHJcbiAgICAgICAgICAgIHNlZWs6ICdTZWVrJyxcclxuICAgICAgICAgICAgc2Vla0xhYmVsOiAne2N1cnJlbnRUaW1lfSBvZiB7ZHVyYXRpb259JyxcclxuICAgICAgICAgICAgcGxheWVkOiAnUGxheWVkJyxcclxuICAgICAgICAgICAgYnVmZmVyZWQ6ICdCdWZmZXJlZCcsXHJcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lOiAnQ3VycmVudCB0aW1lJyxcclxuICAgICAgICAgICAgZHVyYXRpb246ICdEdXJhdGlvbicsXHJcbiAgICAgICAgICAgIHZvbHVtZTogJ1ZvbHVtZScsXHJcbiAgICAgICAgICAgIG11dGU6ICdNdXRlJyxcclxuICAgICAgICAgICAgdW5tdXRlOiAnVW5tdXRlJyxcclxuICAgICAgICAgICAgZW5hYmxlQ2FwdGlvbnM6ICdFbmFibGUgY2FwdGlvbnMnLFxyXG4gICAgICAgICAgICBkaXNhYmxlQ2FwdGlvbnM6ICdEaXNhYmxlIGNhcHRpb25zJyxcclxuICAgICAgICAgICAgZW50ZXJGdWxsc2NyZWVuOiAnRW50ZXIgZnVsbHNjcmVlbicsXHJcbiAgICAgICAgICAgIGV4aXRGdWxsc2NyZWVuOiAnRXhpdCBmdWxsc2NyZWVuJyxcclxuICAgICAgICAgICAgZnJhbWVUaXRsZTogJ1BsYXllciBmb3Ige3RpdGxlfScsXHJcbiAgICAgICAgICAgIGNhcHRpb25zOiAnQ2FwdGlvbnMnLFxyXG4gICAgICAgICAgICBzZXR0aW5nczogJ1NldHRpbmdzJyxcclxuICAgICAgICAgICAgbWVudUJhY2s6ICdHbyBiYWNrIHRvIHByZXZpb3VzIG1lbnUnLFxyXG4gICAgICAgICAgICBzcGVlZDogJ1NwZWVkJyxcclxuICAgICAgICAgICAgbm9ybWFsOiAnTm9ybWFsJyxcclxuICAgICAgICAgICAgcXVhbGl0eTogJ1F1YWxpdHknLFxyXG4gICAgICAgICAgICBsb29wOiAnTG9vcCcsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAnU3RhcnQnLFxyXG4gICAgICAgICAgICBlbmQ6ICdFbmQnLFxyXG4gICAgICAgICAgICBhbGw6ICdBbGwnLFxyXG4gICAgICAgICAgICByZXNldDogJ1Jlc2V0JyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6ICdEaXNhYmxlZCcsXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6ICdFbmFibGVkJyxcclxuICAgICAgICAgICAgYWR2ZXJ0aXNlbWVudDogJ0FkJyxcclxuICAgICAgICAgICAgcXVhbGl0eUJhZGdlOiB7XHJcbiAgICAgICAgICAgICAgICAyMTYwOiAnNEsnLFxyXG4gICAgICAgICAgICAgICAgMTQ0MDogJ0hEJyxcclxuICAgICAgICAgICAgICAgIDEwODA6ICdIRCcsXHJcbiAgICAgICAgICAgICAgICA3MjA6ICdIRCcsXHJcbiAgICAgICAgICAgICAgICA1NzY6ICdTRCcsXHJcbiAgICAgICAgICAgICAgICA0ODA6ICdTRCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIFVSTHNcclxuICAgICAgICB1cmxzOiB7XHJcbiAgICAgICAgICAgIHZpbWVvOiB7XHJcbiAgICAgICAgICAgICAgICBzZGs6ICdodHRwczovL3BsYXllci52aW1lby5jb20vYXBpL3BsYXllci5qcycsXHJcbiAgICAgICAgICAgICAgICBpZnJhbWU6ICdodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vezB9P3sxfScsXHJcbiAgICAgICAgICAgICAgICBhcGk6ICdodHRwczovL3ZpbWVvLmNvbS9hcGkvdjIvdmlkZW8vezB9Lmpzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHlvdXR1YmU6IHtcclxuICAgICAgICAgICAgICAgIHNkazogJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGknLFxyXG4gICAgICAgICAgICAgICAgYXBpOiAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20veW91dHViZS92My92aWRlb3M/aWQ9ezB9JmtleT17MX0mZmllbGRzPWl0ZW1zKHNuaXBwZXQodGl0bGUpKSZwYXJ0PXNuaXBwZXQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdvb2dsZUlNQToge1xyXG4gICAgICAgICAgICAgICAgc2RrOiAnaHR0cHM6Ly9pbWFzZGsuZ29vZ2xlYXBpcy5jb20vanMvc2RrbG9hZGVyL2ltYTMuanMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBDdXN0b20gY29udHJvbCBsaXN0ZW5lcnNcclxuICAgICAgICBsaXN0ZW5lcnM6IHtcclxuICAgICAgICAgICAgc2VlazogbnVsbCxcclxuICAgICAgICAgICAgcGxheTogbnVsbCxcclxuICAgICAgICAgICAgcGF1c2U6IG51bGwsXHJcbiAgICAgICAgICAgIHJlc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgICAgIHJld2luZDogbnVsbCxcclxuICAgICAgICAgICAgZmFzdEZvcndhcmQ6IG51bGwsXHJcbiAgICAgICAgICAgIG11dGU6IG51bGwsXHJcbiAgICAgICAgICAgIHZvbHVtZTogbnVsbCxcclxuICAgICAgICAgICAgY2FwdGlvbnM6IG51bGwsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW46IG51bGwsXHJcbiAgICAgICAgICAgIHBpcDogbnVsbCxcclxuICAgICAgICAgICAgYWlycGxheTogbnVsbCxcclxuICAgICAgICAgICAgc3BlZWQ6IG51bGwsXHJcbiAgICAgICAgICAgIHF1YWxpdHk6IG51bGwsXHJcbiAgICAgICAgICAgIGxvb3A6IG51bGwsXHJcbiAgICAgICAgICAgIGxhbmd1YWdlOiBudWxsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRXZlbnRzIHRvIHdhdGNoIGFuZCBidWJibGVcclxuICAgICAgICBldmVudHM6IFtcclxuICAgICAgICAgICAgLy8gRXZlbnRzIHRvIHdhdGNoIG9uIEhUTUw1IG1lZGlhIGVsZW1lbnRzIGFuZCBidWJibGVcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvR3VpZGUvRXZlbnRzL01lZGlhX2V2ZW50c1xyXG4gICAgICAgICAgICAnZW5kZWQnLCAncHJvZ3Jlc3MnLCAnc3RhbGxlZCcsICdwbGF5aW5nJywgJ3dhaXRpbmcnLCAnY2FucGxheScsICdjYW5wbGF5dGhyb3VnaCcsICdsb2Fkc3RhcnQnLCAnbG9hZGVkZGF0YScsICdsb2FkZWRtZXRhZGF0YScsICd0aW1ldXBkYXRlJywgJ3ZvbHVtZWNoYW5nZScsICdwbGF5JywgJ3BhdXNlJywgJ2Vycm9yJywgJ3NlZWtpbmcnLCAnc2Vla2VkJywgJ2VtcHRpZWQnLCAncmF0ZWNoYW5nZScsICdjdWVjaGFuZ2UnLFxyXG5cclxuICAgICAgICAgICAgLy8gQ3VzdG9tIGV2ZW50c1xyXG4gICAgICAgICAgICAnZW50ZXJmdWxsc2NyZWVuJywgJ2V4aXRmdWxsc2NyZWVuJywgJ2NhcHRpb25zZW5hYmxlZCcsICdjYXB0aW9uc2Rpc2FibGVkJywgJ2xhbmd1YWdlY2hhbmdlJywgJ2NvbnRyb2xzaGlkZGVuJywgJ2NvbnRyb2xzc2hvd24nLCAncmVhZHknLFxyXG5cclxuICAgICAgICAgICAgLy8gWW91VHViZVxyXG4gICAgICAgICAgICAnc3RhdGVjaGFuZ2UnLCAncXVhbGl0eWNoYW5nZScsICdxdWFsaXR5cmVxdWVzdGVkJyxcclxuXHJcbiAgICAgICAgICAgIC8vIEFkc1xyXG4gICAgICAgICAgICAnYWRzbG9hZGVkJywgJ2Fkc2NvbnRlbnRwYXVzZScsICdhZHNjb250ZW50cmVzdW1lJywgJ2Fkc3RhcnRlZCcsICdhZHNtaWRwb2ludCcsICdhZHNjb21wbGV0ZScsICdhZHNhbGxjb21wbGV0ZScsICdhZHNpbXByZXNzaW9uJywgJ2Fkc2NsaWNrJ10sXHJcblxyXG4gICAgICAgIC8vIFNlbGVjdG9yc1xyXG4gICAgICAgIC8vIENoYW5nZSB0aGVzZSB0byBtYXRjaCB5b3VyIHRlbXBsYXRlIGlmIHVzaW5nIGN1c3RvbSBIVE1MXHJcbiAgICAgICAgc2VsZWN0b3JzOiB7XHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiAnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIFtjb250ZW50ZWRpdGFibGVdJyxcclxuICAgICAgICAgICAgY29udGFpbmVyOiAnLnBseXInLFxyXG4gICAgICAgICAgICBjb250cm9sczoge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgd3JhcHBlcjogJy5wbHlyX19jb250cm9scydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFiZWxzOiAnW2RhdGEtcGx5cl0nLFxyXG4gICAgICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgICAgICBwbGF5OiAnW2RhdGEtcGx5cj1cInBsYXlcIl0nLFxyXG4gICAgICAgICAgICAgICAgcGF1c2U6ICdbZGF0YS1wbHlyPVwicGF1c2VcIl0nLFxyXG4gICAgICAgICAgICAgICAgcmVzdGFydDogJ1tkYXRhLXBseXI9XCJyZXN0YXJ0XCJdJyxcclxuICAgICAgICAgICAgICAgIHJld2luZDogJ1tkYXRhLXBseXI9XCJyZXdpbmRcIl0nLFxyXG4gICAgICAgICAgICAgICAgZmFzdEZvcndhcmQ6ICdbZGF0YS1wbHlyPVwiZmFzdC1mb3J3YXJkXCJdJyxcclxuICAgICAgICAgICAgICAgIG11dGU6ICdbZGF0YS1wbHlyPVwibXV0ZVwiXScsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uczogJ1tkYXRhLXBseXI9XCJjYXB0aW9uc1wiXScsXHJcbiAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiAnW2RhdGEtcGx5cj1cImZ1bGxzY3JlZW5cIl0nLFxyXG4gICAgICAgICAgICAgICAgcGlwOiAnW2RhdGEtcGx5cj1cInBpcFwiXScsXHJcbiAgICAgICAgICAgICAgICBhaXJwbGF5OiAnW2RhdGEtcGx5cj1cImFpcnBsYXlcIl0nLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6ICdbZGF0YS1wbHlyPVwic2V0dGluZ3NcIl0nLFxyXG4gICAgICAgICAgICAgICAgbG9vcDogJ1tkYXRhLXBseXI9XCJsb29wXCJdJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbnB1dHM6IHtcclxuICAgICAgICAgICAgICAgIHNlZWs6ICdbZGF0YS1wbHlyPVwic2Vla1wiXScsXHJcbiAgICAgICAgICAgICAgICB2b2x1bWU6ICdbZGF0YS1wbHlyPVwidm9sdW1lXCJdJyxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiAnW2RhdGEtcGx5cj1cInNwZWVkXCJdJyxcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAnW2RhdGEtcGx5cj1cImxhbmd1YWdlXCJdJyxcclxuICAgICAgICAgICAgICAgIHF1YWxpdHk6ICdbZGF0YS1wbHlyPVwicXVhbGl0eVwiXSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGlzcGxheToge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWU6ICcucGx5cl9fdGltZS0tY3VycmVudCcsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogJy5wbHlyX190aW1lLS1kdXJhdGlvbicsXHJcbiAgICAgICAgICAgICAgICBidWZmZXI6ICcucGx5cl9fcHJvZ3Jlc3NfX2J1ZmZlcicsXHJcbiAgICAgICAgICAgICAgICBsb29wOiAnLnBseXJfX3Byb2dyZXNzX19sb29wJywgLy8gVXNlZCBsYXRlclxyXG4gICAgICAgICAgICAgICAgdm9sdW1lOiAnLnBseXJfX3ZvbHVtZS0tZGlzcGxheSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJvZ3Jlc3M6ICcucGx5cl9fcHJvZ3Jlc3MnLFxyXG4gICAgICAgICAgICBjYXB0aW9uczogJy5wbHlyX19jYXB0aW9ucycsXHJcbiAgICAgICAgICAgIGNhcHRpb246ICcucGx5cl9fY2FwdGlvbicsXHJcbiAgICAgICAgICAgIG1lbnU6IHtcclxuICAgICAgICAgICAgICAgIHF1YWxpdHk6ICcuanMtcGx5cl9fbWVudV9fbGlzdC0tcXVhbGl0eSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIENsYXNzIGhvb2tzIGFkZGVkIHRvIHRoZSBwbGF5ZXIgaW4gZGlmZmVyZW50IHN0YXRlc1xyXG4gICAgICAgIGNsYXNzTmFtZXM6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3BseXItLXswfScsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyOiAncGx5ci0tezB9JyxcclxuICAgICAgICAgICAgdmlkZW86ICdwbHlyX192aWRlby13cmFwcGVyJyxcclxuICAgICAgICAgICAgZW1iZWQ6ICdwbHlyX192aWRlby1lbWJlZCcsXHJcbiAgICAgICAgICAgIGVtYmVkQ29udGFpbmVyOiAncGx5cl9fdmlkZW8tZW1iZWRfX2NvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIHBvc3RlcjogJ3BseXJfX3Bvc3RlcicsXHJcbiAgICAgICAgICAgIHBvc3RlckVuYWJsZWQ6ICdwbHlyX19wb3N0ZXItZW5hYmxlZCcsXHJcbiAgICAgICAgICAgIGFkczogJ3BseXJfX2FkcycsXHJcbiAgICAgICAgICAgIGNvbnRyb2w6ICdwbHlyX19jb250cm9sJyxcclxuICAgICAgICAgICAgY29udHJvbFByZXNzZWQ6ICdwbHlyX19jb250cm9sLS1wcmVzc2VkJyxcclxuICAgICAgICAgICAgcGxheWluZzogJ3BseXItLXBsYXlpbmcnLFxyXG4gICAgICAgICAgICBwYXVzZWQ6ICdwbHlyLS1wYXVzZWQnLFxyXG4gICAgICAgICAgICBzdG9wcGVkOiAncGx5ci0tc3RvcHBlZCcsXHJcbiAgICAgICAgICAgIGxvYWRpbmc6ICdwbHlyLS1sb2FkaW5nJyxcclxuICAgICAgICAgICAgaG92ZXI6ICdwbHlyLS1ob3ZlcicsXHJcbiAgICAgICAgICAgIHRvb2x0aXA6ICdwbHlyX190b29sdGlwJyxcclxuICAgICAgICAgICAgY3VlczogJ3BseXJfX2N1ZXMnLFxyXG4gICAgICAgICAgICBoaWRkZW46ICdwbHlyX19zci1vbmx5JyxcclxuICAgICAgICAgICAgaGlkZUNvbnRyb2xzOiAncGx5ci0taGlkZS1jb250cm9scycsXHJcbiAgICAgICAgICAgIGlzSW9zOiAncGx5ci0taXMtaW9zJyxcclxuICAgICAgICAgICAgaXNUb3VjaDogJ3BseXItLWlzLXRvdWNoJyxcclxuICAgICAgICAgICAgdWlTdXBwb3J0ZWQ6ICdwbHlyLS1mdWxsLXVpJyxcclxuICAgICAgICAgICAgbm9UcmFuc2l0aW9uOiAncGx5ci0tbm8tdHJhbnNpdGlvbicsXHJcbiAgICAgICAgICAgIG1lbnU6IHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAncGx5cl9fbWVudV9fdmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgYmFkZ2U6ICdwbHlyX19iYWRnZScsXHJcbiAgICAgICAgICAgICAgICBvcGVuOiAncGx5ci0tbWVudS1vcGVuJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYXB0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogJ3BseXItLWNhcHRpb25zLWVuYWJsZWQnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiAncGx5ci0tY2FwdGlvbnMtYWN0aXZlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiB7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAncGx5ci0tZnVsbHNjcmVlbi1lbmFibGVkJyxcclxuICAgICAgICAgICAgICAgIGZhbGxiYWNrOiAncGx5ci0tZnVsbHNjcmVlbi1mYWxsYmFjaydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGlwOiB7XHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWQ6ICdwbHlyLS1waXAtc3VwcG9ydGVkJyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogJ3BseXItLXBpcC1hY3RpdmUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFpcnBsYXk6IHtcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZDogJ3BseXItLWFpcnBsYXktc3VwcG9ydGVkJyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogJ3BseXItLWFpcnBsYXktYWN0aXZlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0YWJGb2N1czogJ3BseXJfX3RhYi1mb2N1cydcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBFbWJlZCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgYXR0cmlidXRlczoge1xyXG4gICAgICAgICAgICBlbWJlZDoge1xyXG4gICAgICAgICAgICAgICAgcHJvdmlkZXI6ICdkYXRhLXBseXItcHJvdmlkZXInLFxyXG4gICAgICAgICAgICAgICAgaWQ6ICdkYXRhLXBseXItZW1iZWQtaWQnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBBUEkga2V5c1xyXG4gICAgICAgIGtleXM6IHtcclxuICAgICAgICAgICAgZ29vZ2xlOiBudWxsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gQWR2ZXJ0aXNlbWVudHMgcGx1Z2luXHJcbiAgICAgICAgLy8gUmVnaXN0ZXIgZm9yIGFuIGFjY291bnQgaGVyZTogaHR0cDovL3ZpLmFpL3B1Ymxpc2hlci12aWRlby1tb25ldGl6YXRpb24vP2FpZD1wbHlyaW9cclxuICAgICAgICBhZHM6IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHB1Ymxpc2hlcklkOiAnJ1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFBseXIgc3VwcG9ydGVkIHR5cGVzIGFuZCBwcm92aWRlcnNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgdmFyIHByb3ZpZGVycyA9IHtcclxuICAgICAgICBodG1sNTogJ2h0bWw1JyxcclxuICAgICAgICB5b3V0dWJlOiAneW91dHViZScsXHJcbiAgICAgICAgdmltZW86ICd2aW1lbydcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHR5cGVzID0ge1xyXG4gICAgICAgIGF1ZGlvOiAnYXVkaW8nLFxyXG4gICAgICAgIHZpZGVvOiAndmlkZW8nXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHByb3ZpZGVyIGJ5IFVSTFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBnZXRQcm92aWRlckJ5VXJsKHVybCkge1xyXG4gICAgICAgIC8vIFlvdVR1YmVcclxuICAgICAgICBpZiAoL14oaHR0cHM/OlxcL1xcLyk/KHd3d1xcLik/KHlvdXR1YmVcXC5jb218eW91dHVcXC4/YmUpXFwvLiskLy50ZXN0KHVybCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVycy55b3V0dWJlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVmltZW9cclxuICAgICAgICBpZiAoL15odHRwcz86XFwvXFwvcGxheWVyLnZpbWVvLmNvbVxcL3ZpZGVvXFwvXFxkezAsOX0oPz1cXGJ8XFwvKS8udGVzdCh1cmwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm92aWRlcnMudmltZW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gQ29uc29sZSB3cmFwcGVyXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHsgfTtcclxuXHJcbiAgICB2YXIgQ29uc29sZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBDb25zb2xlKCkge1xyXG4gICAgICAgICAgICB2YXIgZW5hYmxlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZmFsc2U7XHJcbiAgICAgICAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIENvbnNvbGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gd2luZG93LmNvbnNvbGUgJiYgZW5hYmxlZDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdEZWJ1Z2dpbmcgZW5hYmxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDbGFzcyhDb25zb2xlLCBbe1xyXG4gICAgICAgICAgICBrZXk6ICdsb2cnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkID8gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSkgOiBub29wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICd3YXJuJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZCA/IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoY29uc29sZS53YXJuLCBjb25zb2xlKSA6IG5vb3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZCA/IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoY29uc29sZS5lcnJvciwgY29uc29sZSkgOiBub29wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV0pO1xyXG4gICAgICAgIHJldHVybiBDb25zb2xlO1xyXG4gICAgfSgpO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRvZ2dsZSBidXR0b25cclxuICAgICAgICB2YXIgYnV0dG9uID0gdGhpcy5wbGF5ZXIuZWxlbWVudHMuYnV0dG9ucy5mdWxsc2NyZWVuO1xyXG4gICAgICAgIGlmIChpcy5lbGVtZW50KGJ1dHRvbikpIHtcclxuICAgICAgICAgICAgYnV0dG9uLnByZXNzZWQgPSB0aGlzLmFjdGl2ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRyaWdnZXIgYW4gZXZlbnRcclxuICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbCh0aGlzLnBsYXllciwgdGhpcy50YXJnZXQsIHRoaXMuYWN0aXZlID8gJ2VudGVyZnVsbHNjcmVlbicgOiAnZXhpdGZ1bGxzY3JlZW4nLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gVHJhcCBmb2N1cyBpbiBjb250YWluZXJcclxuICAgICAgICBpZiAoIWJyb3dzZXIuaXNJb3MpIHtcclxuICAgICAgICAgICAgdHJhcEZvY3VzLmNhbGwodGhpcy5wbGF5ZXIsIHRoaXMudGFyZ2V0LCB0aGlzLmFjdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZUZhbGxiYWNrKCkge1xyXG4gICAgICAgIHZhciB0b2dnbGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBTdG9yZSBvciByZXN0b3JlIHNjcm9sbCBwb3NpdGlvblxyXG4gICAgICAgIGlmICh0b2dnbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxQb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHdpbmRvdy5zY3JvbGxYIHx8IDAsXHJcbiAgICAgICAgICAgICAgICB5OiB3aW5kb3cuc2Nyb2xsWSB8fCAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHRoaXMuc2Nyb2xsUG9zaXRpb24ueCwgdGhpcy5zY3JvbGxQb3NpdGlvbi55KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRvZ2dsZSBzY3JvbGxcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gdG9nZ2xlID8gJ2hpZGRlbicgOiAnJztcclxuXHJcbiAgICAgICAgLy8gVG9nZ2xlIGNsYXNzIGhvb2tcclxuICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5wbGF5ZXIuY29uZmlnLmNsYXNzTmFtZXMuZnVsbHNjcmVlbi5mYWxsYmFjaywgdG9nZ2xlKTtcclxuXHJcbiAgICAgICAgLy8gVG9nZ2xlIGJ1dHRvbiBhbmQgZmlyZSBldmVudHNcclxuICAgICAgICBvbkNoYW5nZS5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBGdWxsc2NyZWVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIEZ1bGxzY3JlZW4ocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBGdWxsc2NyZWVuKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEtlZXAgcmVmZXJlbmNlIHRvIHBhcmVudFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBwcmVmaXhcclxuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBGdWxsc2NyZWVuLnByZWZpeDtcclxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0eSA9IEZ1bGxzY3JlZW4ucHJvcGVydHk7XHJcblxyXG4gICAgICAgICAgICAvLyBTY3JvbGwgcG9zaXRpb25cclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxQb3NpdGlvbiA9IHsgeDogMCwgeTogMCB9O1xyXG5cclxuICAgICAgICAgICAgLy8gUmVnaXN0ZXIgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgIC8vIEhhbmRsZSBldmVudCAoaW5jYXNlIHVzZXIgcHJlc3NlcyBlc2NhcGUgZXRjKVxyXG4gICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCBkb2N1bWVudCwgdGhpcy5wcmVmaXggPT09ICdtcycgPyAnTVNGdWxsc2NyZWVuQ2hhbmdlJyA6IHRoaXMucHJlZml4ICsgJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBGaWx0ZXIgZm9yIHRhcmdldD8/XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZS5jYWxsKF90aGlzKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBGdWxsc2NyZWVuIHRvZ2dsZSBvbiBkb3VibGUgY2xpY2tcclxuICAgICAgICAgICAgb24uY2FsbCh0aGlzLnBsYXllciwgdGhpcy5wbGF5ZXIuZWxlbWVudHMuY29udGFpbmVyLCAnZGJsY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBkb3VibGUgY2xpY2sgaW4gY29udHJvbHNcclxuICAgICAgICAgICAgICAgIGlmIChpcy5lbGVtZW50KF90aGlzLnBsYXllci5lbGVtZW50cy5jb250cm9scykgJiYgX3RoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRyb2xzLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX3RoaXMudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBVSVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIG5hdGl2ZSBzdXBwb3J0ZWRcclxuXHJcblxyXG4gICAgICAgIGNyZWF0ZUNsYXNzKEZ1bGxzY3JlZW4sIFt7XHJcbiAgICAgICAgICAgIGtleTogJ3VwZGF0ZScsXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIFVJXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZGVidWcubG9nKChGdWxsc2NyZWVuLm5hdGl2ZSA/ICdOYXRpdmUnIDogJ0ZhbGxiYWNrJykgKyAnIGZ1bGxzY3JlZW4gZW5hYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5kZWJ1Zy5sb2coJ0Z1bGxzY3JlZW4gbm90IHN1cHBvcnRlZCBhbmQgZmFsbGJhY2sgZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgc3R5bGluZyBob29rIHRvIHNob3cgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLnBsYXllci5lbGVtZW50cy5jb250YWluZXIsIHRoaXMucGxheWVyLmNvbmZpZy5jbGFzc05hbWVzLmZ1bGxzY3JlZW4uZW5hYmxlZCwgdGhpcy5lbmFibGVkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBhbiBlbGVtZW50IGZ1bGxzY3JlZW5cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdlbnRlcicsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbnRlcigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlPUyBuYXRpdmUgZnVsbHNjcmVlbiBkb2Vzbid0IG5lZWQgdGhlIHJlcXVlc3Qgc3RlcFxyXG4gICAgICAgICAgICAgICAgaWYgKGJyb3dzZXIuaXNJb3MgJiYgdGhpcy5wbGF5ZXIuY29uZmlnLmZ1bGxzY3JlZW4uaW9zTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLnBsYXlpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQud2Via2l0RW50ZXJGdWxsc2NyZWVuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghRnVsbHNjcmVlbi5uYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVGYWxsYmFjay5jYWxsKHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5wcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaXMuZW1wdHkodGhpcy5wcmVmaXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXRbdGhpcy5wcmVmaXggKyAnUmVxdWVzdCcgKyB0aGlzLnByb3BlcnR5XSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBCYWlsIGZyb20gZnVsbHNjcmVlblxyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2V4aXQnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZXhpdCgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlPUyBuYXRpdmUgZnVsbHNjcmVlblxyXG4gICAgICAgICAgICAgICAgaWYgKGJyb3dzZXIuaXNJb3MgJiYgdGhpcy5wbGF5ZXIuY29uZmlnLmZ1bGxzY3JlZW4uaW9zTmF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFGdWxsc2NyZWVuLm5hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUZhbGxiYWNrLmNhbGwodGhpcywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5wcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAoZG9jdW1lbnQuY2FuY2VsRnVsbFNjcmVlbiB8fCBkb2N1bWVudC5leGl0RnVsbHNjcmVlbikuY2FsbChkb2N1bWVudCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpcy5lbXB0eSh0aGlzLnByZWZpeCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gdGhpcy5wcmVmaXggPT09ICdtb3onID8gJ0NhbmNlbCcgOiAnRXhpdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRbJycgKyB0aGlzLnByZWZpeCArIGFjdGlvbiArIHRoaXMucHJvcGVydHldKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRvZ2dsZSBzdGF0ZVxyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3RvZ2dsZScsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0b2dnbGUoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnZW5hYmxlZCcsXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIGZ1bGxzY3JlZW4gaXMgZW5hYmxlZFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoRnVsbHNjcmVlbi5uYXRpdmUgfHwgdGhpcy5wbGF5ZXIuY29uZmlnLmZ1bGxzY3JlZW4uZmFsbGJhY2spICYmIHRoaXMucGxheWVyLmNvbmZpZy5mdWxsc2NyZWVuLmVuYWJsZWQgJiYgdGhpcy5wbGF5ZXIuc3VwcG9ydGVkLnVpICYmIHRoaXMucGxheWVyLmlzVmlkZW87XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBhY3RpdmUgc3RhdGVcclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdhY3RpdmUnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrIHVzaW5nIGNsYXNzbmFtZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFGdWxsc2NyZWVuLm5hdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNDbGFzcyh0aGlzLnRhcmdldCwgdGhpcy5wbGF5ZXIuY29uZmlnLmNsYXNzTmFtZXMuZnVsbHNjcmVlbi5mYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAhdGhpcy5wcmVmaXggPyBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCA6IGRvY3VtZW50WycnICsgdGhpcy5wcmVmaXggKyB0aGlzLnByb3BlcnR5ICsgJ0VsZW1lbnQnXTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudCA9PT0gdGhpcy50YXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0YXJnZXQgZWxlbWVudFxyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3RhcmdldCcsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyb3dzZXIuaXNJb3MgJiYgdGhpcy5wbGF5ZXIuY29uZmlnLmZ1bGxzY3JlZW4uaW9zTmF0aXZlID8gdGhpcy5wbGF5ZXIubWVkaWEgOiB0aGlzLnBsYXllci5lbGVtZW50cy5jb250YWluZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XSwgW3tcclxuICAgICAgICAgICAga2V5OiAnbmF0aXZlJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gISEoZG9jdW1lbnQuZnVsbHNjcmVlbkVuYWJsZWQgfHwgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVuYWJsZWQgfHwgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVuYWJsZWQgfHwgZG9jdW1lbnQubXNGdWxsc2NyZWVuRW5hYmxlZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgcHJlZml4IGZvciBoYW5kbGVyc1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3ByZWZpeCcsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gTm8gcHJlZml4XHJcbiAgICAgICAgICAgICAgICBpZiAoaXMuZnVuY3Rpb24oZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBmdWxsc2NyZWVuIHN1cHBvcnQgYnkgdmVuZG9yIHByZWZpeFxyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJlZml4ZXMgPSBbJ3dlYmtpdCcsICdtb3onLCAnbXMnXTtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmVmaXhlcy5zb21lKGZ1bmN0aW9uIChwcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXMuZnVuY3Rpb24oZG9jdW1lbnRbcHJlICsgJ0V4aXRGdWxsc2NyZWVuJ10pIHx8IGlzLmZ1bmN0aW9uKGRvY3VtZW50W3ByZSArICdDYW5jZWxGdWxsU2NyZWVuJ10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcHJlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAncHJvcGVydHknLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZWZpeCA9PT0gJ21veicgPyAnRnVsbFNjcmVlbicgOiAnRnVsbHNjcmVlbic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XSk7XHJcbiAgICAgICAgcmV0dXJuIEZ1bGxzY3JlZW47XHJcbiAgICB9KCk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExvYWQgaW1hZ2UgYXZvaWRpbmcgeGhyL2ZldGNoIENPUlMgaXNzdWVzXHJcbiAgICAvLyBTZXJ2ZXIgc3RhdHVzIGNhbid0IGJlIG9idGFpbmVkIHRoaXMgd2F5IHVuZm9ydHVuYXRlbHksIHNvIHRoaXMgdXNlcyBcIm5hdHVyYWxXaWR0aFwiIHRvIGRldGVybWluZSBpZiB0aGUgaW1hZ2UgaGFzIGxvYWRlZFxyXG4gICAgLy8gQnkgZGVmYXVsdCBpdCBjaGVja3MgaWYgaXQgaXMgYXQgbGVhc3QgMXB4LCBidXQgeW91IGNhbiBhZGQgYSBzZWNvbmQgYXJndW1lbnQgdG8gY2hhbmdlIHRoaXNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZEltYWdlKHNyYykge1xyXG4gICAgICAgIHZhciBtaW5XaWR0aCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgaW1hZ2Uub25sb2FkO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGltYWdlLm9uZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAoaW1hZ2UubmF0dXJhbFdpZHRoID49IG1pbldpZHRoID8gcmVzb2x2ZSA6IHJlamVjdCkoaW1hZ2UpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihpbWFnZSwgeyBvbmxvYWQ6IGhhbmRsZXIsIG9uZXJyb3I6IGhhbmRsZXIsIHNyYzogc3JjIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgdmFyIHVpID0ge1xyXG4gICAgICAgIGFkZFN0eWxlSG9vazogZnVuY3Rpb24gYWRkU3R5bGVIb29rKCkge1xyXG4gICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lciwgdGhpcy5jb25maWcuc2VsZWN0b3JzLmNvbnRhaW5lci5yZXBsYWNlKCcuJywgJycpLCB0cnVlKTtcclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5lbGVtZW50cy5jb250YWluZXIsIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMudWlTdXBwb3J0ZWQsIHRoaXMuc3VwcG9ydGVkLnVpKTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gVG9nZ2xlIG5hdGl2ZSBIVE1MNSBtZWRpYSBjb250cm9sc1xyXG4gICAgICAgIHRvZ2dsZU5hdGl2ZUNvbnRyb2xzOiBmdW5jdGlvbiB0b2dnbGVOYXRpdmVDb250cm9scygpIHtcclxuICAgICAgICAgICAgdmFyIHRvZ2dsZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodG9nZ2xlICYmIHRoaXMuaXNIVE1MNSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYS5zZXRBdHRyaWJ1dGUoJ2NvbnRyb2xzJywgJycpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYS5yZW1vdmVBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gU2V0dXAgdGhlIFVJXHJcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uIGJ1aWxkKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gUmUtYXR0YWNoIG1lZGlhIGVsZW1lbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgIC8vIFRPRE86IFVzZSBldmVudCBidWJibGluZz9cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMubWVkaWEoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERvbid0IHNldHVwIGludGVyZmFjZSBpZiBubyBzdXBwb3J0XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdXBwb3J0ZWQudWkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcud2FybignQmFzaWMgc3VwcG9ydCBvbmx5IGZvciAnICsgdGhpcy5wcm92aWRlciArICcgJyArIHRoaXMudHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBuYXRpdmUgY29udHJvbHNcclxuICAgICAgICAgICAgICAgIHVpLnRvZ2dsZU5hdGl2ZUNvbnRyb2xzLmNhbGwodGhpcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmFpbFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbmplY3QgY3VzdG9tIGNvbnRyb2xzIGlmIG5vdCBwcmVzZW50XHJcbiAgICAgICAgICAgIGlmICghaXMuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmNvbnRyb2xzKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSW5qZWN0IGN1c3RvbSBjb250cm9sc1xyXG4gICAgICAgICAgICAgICAgY29udHJvbHMuaW5qZWN0LmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmUtYXR0YWNoIGNvbnRyb2wgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5jb250cm9scygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgbmF0aXZlIGNvbnRyb2xzXHJcbiAgICAgICAgICAgIHVpLnRvZ2dsZU5hdGl2ZUNvbnRyb2xzLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXR1cCBjYXB0aW9ucyBmb3IgSFRNTDVcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNIVE1MNSkge1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbnMuc2V0dXAuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVzZXQgdm9sdW1lXHJcbiAgICAgICAgICAgIHRoaXMudm9sdW1lID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc2V0IG11dGUgc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5tdXRlZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNldCBzcGVlZFxyXG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc2V0IGxvb3Agc3RhdGVcclxuICAgICAgICAgICAgdGhpcy5sb29wID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc2V0IHF1YWxpdHkgc2V0dGluZ1xyXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHkgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVzZXQgdm9sdW1lIGRpc3BsYXlcclxuICAgICAgICAgICAgY29udHJvbHMudXBkYXRlVm9sdW1lLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNldCB0aW1lIGRpc3BsYXlcclxuICAgICAgICAgICAgY29udHJvbHMudGltZVVwZGF0ZS5jYWxsKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBVSVxyXG4gICAgICAgICAgICB1aS5jaGVja1BsYXlpbmcuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBwaWN0dXJlLWluLXBpY3R1cmUgc3VwcG9ydFxyXG4gICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lciwgdGhpcy5jb25maWcuY2xhc3NOYW1lcy5waXAuc3VwcG9ydGVkLCBzdXBwb3J0LnBpcCAmJiB0aGlzLmlzSFRNTDUgJiYgdGhpcy5pc1ZpZGVvKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBhaXJwbGF5IHN1cHBvcnRcclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5lbGVtZW50cy5jb250YWluZXIsIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuYWlycGxheS5zdXBwb3J0ZWQsIHN1cHBvcnQuYWlycGxheSAmJiB0aGlzLmlzSFRNTDUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGlPUyBjbGFzc1xyXG4gICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lciwgdGhpcy5jb25maWcuY2xhc3NOYW1lcy5pc0lvcywgYnJvd3Nlci5pc0lvcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdG91Y2ggY2xhc3NcclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5lbGVtZW50cy5jb250YWluZXIsIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuaXNUb3VjaCwgdGhpcy50b3VjaCk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWFkeSBmb3IgQVBJIGNhbGxzXHJcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVhZHkgZXZlbnQgYXQgZW5kIG9mIGV4ZWN1dGlvbiBzdGFja1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKF90aGlzLCBfdGhpcy5tZWRpYSwgJ3JlYWR5Jyk7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHRoZSB0aXRsZVxyXG4gICAgICAgICAgICB1aS5zZXRUaXRsZS5jYWxsKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXNzdXJlIHRoZSBwb3N0ZXIgaW1hZ2UgaXMgc2V0LCBpZiB0aGUgcHJvcGVydHkgd2FzIGFkZGVkIGJlZm9yZSB0aGUgZWxlbWVudCB3YXMgY3JlYXRlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy5wb3N0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHVpLnNldFBvc3Rlci5jYWxsKHRoaXMsIHRoaXMucG9zdGVyLCBmYWxzZSkuY2F0Y2goZnVuY3Rpb24gKCkgeyB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTWFudWFsbHkgc2V0IHRoZSBkdXJhdGlvbiBpZiB1c2VyIGhhcyBvdmVycmlkZGVuIGl0LlxyXG4gICAgICAgICAgICAvLyBUaGUgZXZlbnQgbGlzdGVuZXJzIGZvciBpdCBkb2Vzbid0IGdldCBjYWxsZWQgaWYgcHJlbG9hZCBpcyBkaXNhYmxlZCAoIzcwMSlcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLmR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9scy5kdXJhdGlvblVwZGF0ZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFNldHVwIGFyaWEgYXR0cmlidXRlIGZvciBwbGF5IGFuZCBpZnJhbWUgdGl0bGVcclxuICAgICAgICBzZXRUaXRsZTogZnVuY3Rpb24gc2V0VGl0bGUoKSB7XHJcbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIGN1cnJlbnQgdGV4dFxyXG4gICAgICAgICAgICB2YXIgbGFiZWwgPSBpMThuLmdldCgncGxheScsIHRoaXMuY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYSBtZWRpYSB0aXRsZSBzZXQsIHVzZSB0aGF0IGZvciB0aGUgbGFiZWxcclxuICAgICAgICAgICAgaWYgKGlzLnN0cmluZyh0aGlzLmNvbmZpZy50aXRsZSkgJiYgIWlzLmVtcHR5KHRoaXMuY29uZmlnLnRpdGxlKSkge1xyXG4gICAgICAgICAgICAgICAgbGFiZWwgKz0gJywgJyArIHRoaXMuY29uZmlnLnRpdGxlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIGEgcGxheSBidXR0b24sIHNldCBsYWJlbFxyXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZWxlbWVudHMuYnV0dG9ucy5wbGF5IHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBsYWJlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IGlmcmFtZSB0aXRsZVxyXG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc2FtcG90dHMvcGx5ci9pc3N1ZXMvMTI0XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRW1iZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpZnJhbWUgPSBnZXRFbGVtZW50LmNhbGwodGhpcywgJ2lmcmFtZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXMuZWxlbWVudChpZnJhbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gbWVkaWEgdHlwZVxyXG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gIWlzLmVtcHR5KHRoaXMuY29uZmlnLnRpdGxlKSA/IHRoaXMuY29uZmlnLnRpdGxlIDogJ3ZpZGVvJztcclxuICAgICAgICAgICAgICAgIHZhciBmb3JtYXQgPSBpMThuLmdldCgnZnJhbWVUaXRsZScsIHRoaXMuY29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCd0aXRsZScsIGZvcm1hdC5yZXBsYWNlKCd7dGl0bGV9JywgdGl0bGUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBUb2dnbGUgcG9zdGVyXHJcbiAgICAgICAgdG9nZ2xlUG9zdGVyOiBmdW5jdGlvbiB0b2dnbGVQb3N0ZXIoZW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnBvc3RlckVuYWJsZWQsIGVuYWJsZSk7XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFNldCB0aGUgcG9zdGVyIGltYWdlIChhc3luYylcclxuICAgICAgICAvLyBVc2VkIGludGVybmFsbHkgZm9yIHRoZSBwb3N0ZXIgc2V0dGVyLCB3aXRoIHRoZSBwYXNzaXZlIG9wdGlvbiBmb3JjZWQgdG8gZmFsc2VcclxuICAgICAgICBzZXRQb3N0ZXI6IGZ1bmN0aW9uIHNldFBvc3Rlcihwb3N0ZXIpIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFzc2l2ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIERvbid0IG92ZXJyaWRlIGlmIGNhbGwgaXMgcGFzc2l2ZVxyXG4gICAgICAgICAgICBpZiAocGFzc2l2ZSAmJiB0aGlzLnBvc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignUG9zdGVyIGFscmVhZHkgc2V0JykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgcHJvcGVydHkgc3luY2hyb25vdXNseSB0byByZXNwZWN0IHRoZSBjYWxsIG9yZGVyXHJcbiAgICAgICAgICAgIHRoaXMubWVkaWEuc2V0QXR0cmlidXRlKCdwb3N0ZXInLCBwb3N0ZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gV2FpdCB1bnRpbCB1aSBpcyByZWFkeVxyXG4gICAgICAgICAgICByZXR1cm4gcmVhZHkuY2FsbCh0aGlzKVxyXG4gICAgICAgICAgICAgICAgLy8gTG9hZCBpbWFnZVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2FkSW1hZ2UocG9zdGVyKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIaWRlIHBvc3RlciBvbiBlcnJvciB1bmxlc3MgaXQncyBiZWVuIHNldCBieSBhbm90aGVyIGNhbGxcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zdGVyID09PSBfdGhpczIucG9zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpLnRvZ2dsZVBvc3Rlci5jYWxsKF90aGlzMiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZXRocm93XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCByYWNlIGNvbmRpdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zdGVyICE9PSBfdGhpczIucG9zdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2V0UG9zdGVyIGNhbmNlbGxlZCBieSBsYXRlciBjYWxsIHRvIHNldFBvc3RlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oX3RoaXMyLmVsZW1lbnRzLnBvc3Rlci5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6ICd1cmwoXFwnJyArIHBvc3RlciArICdcXCcpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgYmFja2dyb3VuZFNpemUgYXMgd2VsbCAoc2luY2UgaXQgY2FuIGJlIHNldCB0byBcImNvdmVyXCIgZm9yIHBhZGRlZCB0aHVtYm5haWxzIGZvciB5b3V0dWJlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJydcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB1aS50b2dnbGVQb3N0ZXIuY2FsbChfdGhpczIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwb3N0ZXI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgcGxheWluZyBzdGF0ZVxyXG4gICAgICAgIGNoZWNrUGxheWluZzogZnVuY3Rpb24gY2hlY2tQbGF5aW5nKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xhc3MgaG9va3NcclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5lbGVtZW50cy5jb250YWluZXIsIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMucGxheWluZywgdGhpcy5wbGF5aW5nKTtcclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5lbGVtZW50cy5jb250YWluZXIsIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMucGF1c2VkLCB0aGlzLnBhdXNlZCk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnN0b3BwZWQsIHRoaXMuc3RvcHBlZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgc3RhdGVcclxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRzLmJ1dHRvbnMucGxheSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQucHJlc3NlZCA9IF90aGlzMy5wbGF5aW5nO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9ubHkgdXBkYXRlIGNvbnRyb2xzIG9uIG5vbiB0aW1ldXBkYXRlIGV2ZW50c1xyXG4gICAgICAgICAgICBpZiAoaXMuZXZlbnQoZXZlbnQpICYmIGV2ZW50LnR5cGUgPT09ICd0aW1ldXBkYXRlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBUb2dnbGUgY29udHJvbHNcclxuICAgICAgICAgICAgdWkudG9nZ2xlQ29udHJvbHMuY2FsbCh0aGlzKTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgbWVkaWEgaXMgbG9hZGluZ1xyXG4gICAgICAgIGNoZWNrTG9hZGluZzogZnVuY3Rpb24gY2hlY2tMb2FkaW5nKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gWydzdGFsbGVkJywgJ3dhaXRpbmcnXS5pbmNsdWRlcyhldmVudC50eXBlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFyIHRpbWVyXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVycy5sb2FkaW5nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRpbWVyIHRvIHByZXZlbnQgZmxpY2tlciB3aGVuIHNlZWtpbmdcclxuICAgICAgICAgICAgdGhpcy50aW1lcnMubG9hZGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHByb2dyZXNzIGJhciBsb2FkaW5nIGNsYXNzIHN0YXRlXHJcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhfdGhpczQuZWxlbWVudHMuY29udGFpbmVyLCBfdGhpczQuY29uZmlnLmNsYXNzTmFtZXMubG9hZGluZywgX3RoaXM0LmxvYWRpbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBjb250cm9scyB2aXNpYmlsaXR5XHJcbiAgICAgICAgICAgICAgICB1aS50b2dnbGVDb250cm9scy5jYWxsKF90aGlzNCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMubG9hZGluZyA/IDI1MCA6IDApO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBUb2dnbGUgY29udHJvbHMgYmFzZWQgb24gc3RhdGUgYW5kIGBmb3JjZWAgYXJndW1lbnRcclxuICAgICAgICB0b2dnbGVDb250cm9sczogZnVuY3Rpb24gdG9nZ2xlQ29udHJvbHMoZm9yY2UpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRyb2xzJCQxID0gdGhpcy5lbGVtZW50cy5jb250cm9scztcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoY29udHJvbHMkJDEgJiYgdGhpcy5jb25maWcuaGlkZUNvbnRyb2xzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTaG93IGNvbnRyb2xzIGlmIGZvcmNlLCBsb2FkaW5nLCBwYXVzZWQsIG9yIGJ1dHRvbiBpbnRlcmFjdGlvbiwgb3RoZXJ3aXNlIGhpZGVcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlQ29udHJvbHMoQm9vbGVhbihmb3JjZSB8fCB0aGlzLmxvYWRpbmcgfHwgdGhpcy5wYXVzZWQgfHwgY29udHJvbHMkJDEucHJlc3NlZCB8fCBjb250cm9scyQkMS5ob3ZlcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICAgIHZhciBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gTGlzdGVuZXJzKHBsYXllcikge1xyXG4gICAgICAgICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBMaXN0ZW5lcnMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdEtleSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUtleSA9IHRoaXMuaGFuZGxlS2V5LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlTWVudSA9IHRoaXMudG9nZ2xlTWVudS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0VG91Y2ggPSB0aGlzLmZpcnN0VG91Y2guYmluZCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBrZXkgcHJlc3Nlc1xyXG5cclxuXHJcbiAgICAgICAgY3JlYXRlQ2xhc3MoTGlzdGVuZXJzLCBbe1xyXG4gICAgICAgICAgICBrZXk6ICdoYW5kbGVLZXknLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlS2V5KGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb2RlID0gZXZlbnQua2V5Q29kZSA/IGV2ZW50LmtleUNvZGUgOiBldmVudC53aGljaDtcclxuICAgICAgICAgICAgICAgIHZhciBwcmVzc2VkID0gZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlcGVhdCA9IHByZXNzZWQgJiYgY29kZSA9PT0gdGhpcy5sYXN0S2V5O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJhaWwgaWYgYSBtb2RpZmllciBrZXkgaXMgc2V0XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuYWx0S2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSB8fCBldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZXZlbnQgaXMgYnViYmxlZCBmcm9tIHRoZSBtZWRpYSBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IGRvZXNuJ3QgZ2V0IHRoZSBrZXljb2RlIGZvciB3aGF0ZXZlciByZWFzb25cclxuICAgICAgICAgICAgICAgIGlmICghaXMubnVtYmVyKGNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNlZWsgYnkgdGhlIG51bWJlciBrZXlzXHJcbiAgICAgICAgICAgICAgICB2YXIgc2Vla0J5S2V5ID0gZnVuY3Rpb24gc2Vla0J5S2V5KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERpdmlkZSB0aGUgbWF4IGR1cmF0aW9uIGludG8gMTB0aCdzIGFuZCB0aW1lcyBieSB0aGUgbnVtYmVyIHZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucGxheWVyLmN1cnJlbnRUaW1lID0gX3RoaXMucGxheWVyLmR1cmF0aW9uIC8gMTAgKiAoY29kZSAtIDQ4KTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBrZXkgb24ga2V5ZG93blxyXG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgb24ga2V5dXBcclxuICAgICAgICAgICAgICAgIGlmIChwcmVzc2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2hpY2gga2V5Y29kZXMgc2hvdWxkIHdlIHByZXZlbnQgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2ZW50RGVmYXVsdCA9IFszMiwgMzcsIDM4LCAzOSwgNDAsIDQ4LCA0OSwgNTAsIDUxLCA1MiwgNTMsIDU0LCA1NiwgNTcsIDY3LCA3MCwgNzMsIDc1LCA3NiwgNzcsIDc5XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9jdXNlZCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGlmIHRoZSBmb2N1c2VkIGVsZW1lbnQgaXMgbm90IGVkaXRhYmxlIChlLmcuIHRleHQgaW5wdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGFueSB0aGF0IGFjY2VwdCBrZXkgaW5wdXQgaHR0cDovL3dlYmFpbS5vcmcvdGVjaG5pcXVlcy9rZXlib2FyZC9cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9jdXNlZCA9IGdldEZvY3VzRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpcy5lbGVtZW50KGZvY3VzZWQpICYmIGZvY3VzZWQgIT09IHRoaXMucGxheWVyLmVsZW1lbnRzLmlucHV0cy5zZWVrICYmIG1hdGNoZXMoZm9jdXNlZCwgdGhpcy5wbGF5ZXIuY29uZmlnLnNlbGVjdG9ycy5lZGl0YWJsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNvZGUgaXMgZm91bmQgcHJldmVudCBkZWZhdWx0IChlLmcuIHByZXZlbnQgc2Nyb2xsaW5nIGZvciBhcnJvd3MpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZlbnREZWZhdWx0LmluY2x1ZGVzKGNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAwLTlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vla0J5S2V5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTcGFjZSBhbmQgSyBrZXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIudG9nZ2xlUGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXJyb3cgdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmluY3JlYXNlVm9sdW1lKDAuMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBcnJvdyBkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5kZWNyZWFzZVZvbHVtZSgwLjEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTSBrZXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubXV0ZWQgPSAhdGhpcy5wbGF5ZXIubXV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBcnJvdyBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5mb3J3YXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBcnJvdyBiYWNrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5yZXdpbmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3MDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEYga2V5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5mdWxsc2NyZWVuLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQyBrZXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIudG9nZ2xlQ2FwdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3NjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEwga2V5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5sb29wID0gIXRoaXMucGxheWVyLmxvb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGNhc2UgNzM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvb3AoJ3N0YXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9vcCgnZW5kJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgKi9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEVzY2FwZSBpcyBoYW5kbGUgbmF0aXZlbHkgd2hlbiBpbiBmdWxsIHNjcmVlblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNvIHdlIG9ubHkgbmVlZCB0byB3b3JyeSBhYm91dCBub24gbmF0aXZlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXllci5mdWxsc2NyZWVuLmVuYWJsZWQgJiYgdGhpcy5wbGF5ZXIuZnVsbHNjcmVlbi5hY3RpdmUgJiYgY29kZSA9PT0gMjcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZnVsbHNjcmVlbi50b2dnbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIGxhc3QgY29kZSBmb3IgbmV4dCBjeWNsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEtleSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEtleSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRvZ2dsZSBtZW51XHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAndG9nZ2xlTWVudScsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0b2dnbGVNZW51KGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9scy50b2dnbGVNZW51LmNhbGwodGhpcy5wbGF5ZXIsIGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGV2aWNlIGlzIHRvdWNoIGVuYWJsZWRcclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdmaXJzdFRvdWNoJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZpcnN0VG91Y2goKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci50b3VjaCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRvdWNoIGNsYXNzXHJcbiAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyh0aGlzLnBsYXllci5lbGVtZW50cy5jb250YWluZXIsIHRoaXMucGxheWVyLmNvbmZpZy5jbGFzc05hbWVzLmlzVG91Y2gsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBHbG9iYWwgd2luZG93ICYgZG9jdW1lbnQgbGlzdGVuZXJzXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnZ2xvYmFsJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdsb2JhbCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b2dnbGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gS2V5Ym9hcmQgc2hvcnRjdXRzXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuY29uZmlnLmtleWJvYXJkLmdsb2JhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUxpc3RlbmVyLmNhbGwodGhpcy5wbGF5ZXIsIHdpbmRvdywgJ2tleWRvd24ga2V5dXAnLCB0aGlzLmhhbmRsZUtleSwgdG9nZ2xlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2xpY2sgYW55d2hlcmUgY2xvc2VzIG1lbnVcclxuICAgICAgICAgICAgICAgIHRvZ2dsZUxpc3RlbmVyLmNhbGwodGhpcy5wbGF5ZXIsIGRvY3VtZW50LmJvZHksICdjbGljaycsIHRoaXMudG9nZ2xlTWVudSwgdG9nZ2xlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZXRlY3QgdG91Y2ggYnkgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICBvbmNlLmNhbGwodGhpcy5wbGF5ZXIsIGRvY3VtZW50LmJvZHksICd0b3VjaHN0YXJ0JywgdGhpcy5maXJzdFRvdWNoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ29udGFpbmVyIGxpc3RlbmVyc1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2NvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb250YWluZXIoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBLZXlib2FyZCBzaG9ydGN1dHNcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wbGF5ZXIuY29uZmlnLmtleWJvYXJkLmdsb2JhbCAmJiB0aGlzLnBsYXllci5jb25maWcua2V5Ym9hcmQuZm9jdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uLmNhbGwodGhpcy5wbGF5ZXIsIHRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lciwgJ2tleWRvd24ga2V5dXAnLCB0aGlzLmhhbmRsZUtleSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIERldGVjdCB0YWIgZm9jdXNcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBjbGFzcyBvbiBibHVyL2ZvY3Vzb3V0XHJcbiAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCB0aGlzLnBsYXllci5lbGVtZW50cy5jb250YWluZXIsICdmb2N1c291dCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGV2ZW50LnRhcmdldCwgX3RoaXMyLnBsYXllci5jb25maWcuY2xhc3NOYW1lcy50YWJGb2N1cywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgY2xhc3NuYW1lIHRvIHRhYmJlZCBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgb24uY2FsbCh0aGlzLnBsYXllciwgdGhpcy5wbGF5ZXIuZWxlbWVudHMuY29udGFpbmVyLCAna2V5ZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlICE9PSA5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIERlbGF5IHRoZSBhZGRpbmcgb2YgY2xhc3NuYW1lIHVudGlsIHRoZSBmb2N1cyBoYXMgY2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgZXZlbnQgZmlyZXMgYmVmb3JlIHRoZSBmb2N1c2luIGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKGdldEZvY3VzRWxlbWVudCgpLCBfdGhpczIucGxheWVyLmNvbmZpZy5jbGFzc05hbWVzLnRhYkZvY3VzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSBjb250cm9scyBvbiBtb3VzZSBldmVudHMgYW5kIGVudGVyaW5nIGZ1bGxzY3JlZW5cclxuICAgICAgICAgICAgICAgIG9uLmNhbGwodGhpcy5wbGF5ZXIsIHRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lciwgJ21vdXNlbW92ZSBtb3VzZWxlYXZlIHRvdWNoc3RhcnQgdG91Y2htb3ZlIGVudGVyZnVsbHNjcmVlbiBleGl0ZnVsbHNjcmVlbicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250cm9scyQkMSA9IF90aGlzMi5wbGF5ZXIuZWxlbWVudHMuY29udHJvbHM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBidXR0b24gc3RhdGVzIGZvciBmdWxsc2NyZWVuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAnZW50ZXJmdWxsc2NyZWVuJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9scyQkMS5wcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzJCQxLmhvdmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTaG93LCB0aGVuIGhpZGUgYWZ0ZXIgYSB0aW1lb3V0IHVubGVzcyBhbm90aGVyIGNvbnRyb2wgZXZlbnQgb2NjdXJzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNob3cgPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ21vdXNlbW92ZSddLmluY2x1ZGVzKGV2ZW50LnR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVsYXkgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1aS50b2dnbGVDb250cm9scy5jYWxsKF90aGlzMi5wbGF5ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgbG9uZ2VyIHRpbWVvdXQgZm9yIHRvdWNoIGRldmljZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXkgPSBfdGhpczIucGxheWVyLnRvdWNoID8gMzAwMCA6IDIwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDbGVhciB0aW1lclxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpczIucGxheWVyLnRpbWVycy5jb250cm9scyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVGltZXIgdG8gcHJldmVudCBmbGlja2VyIHdoZW4gc2Vla2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMi5wbGF5ZXIudGltZXJzLmNvbnRyb2xzID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1aS50b2dnbGVDb250cm9scy5jYWxsKF90aGlzMi5wbGF5ZXIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTGlzdGVuIGZvciBtZWRpYSBldmVudHNcclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdtZWRpYScsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBtZWRpYSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRpbWUgY2hhbmdlIG9uIG1lZGlhXHJcbiAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCB0aGlzLnBsYXllci5tZWRpYSwgJ3RpbWV1cGRhdGUgc2Vla2luZyBzZWVrZWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbHMudGltZVVwZGF0ZS5jYWxsKF90aGlzMy5wbGF5ZXIsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIG9uLmNhbGwodGhpcy5wbGF5ZXIsIHRoaXMucGxheWVyLm1lZGlhLCAnZHVyYXRpb25jaGFuZ2UgbG9hZGVkZGF0YSBsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9scy5kdXJhdGlvblVwZGF0ZS5jYWxsKF90aGlzMy5wbGF5ZXIsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBhdWRpbyB0cmFja3Mgb24gbG9hZFxyXG4gICAgICAgICAgICAgICAgLy8gV2UgY2FuJ3QgdXNlIGBsb2FkZWRtZXRhZGF0YWAgYXMgaXQgZG9lc24ndCBzZWVtIHRvIGhhdmUgYXVkaW8gdHJhY2tzIGF0IHRoYXQgcG9pbnRcclxuICAgICAgICAgICAgICAgIG9uLmNhbGwodGhpcy5wbGF5ZXIsIHRoaXMucGxheWVyLm1lZGlhLCAnY2FucGxheScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVIaWRkZW4oX3RoaXMzLnBsYXllci5lbGVtZW50cy52b2x1bWUsICFfdGhpczMucGxheWVyLmhhc0F1ZGlvKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVIaWRkZW4oX3RoaXMzLnBsYXllci5lbGVtZW50cy5idXR0b25zLm11dGUsICFfdGhpczMucGxheWVyLmhhc0F1ZGlvKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgbWVkaWEgZmluaXNoaW5nXHJcbiAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCB0aGlzLnBsYXllci5tZWRpYSwgJ2VuZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3cgcG9zdGVyIG9uIGVuZFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpczMucGxheWVyLmlzSFRNTDUgJiYgX3RoaXMzLnBsYXllci5pc1ZpZGVvICYmIF90aGlzMy5wbGF5ZXIuY29uZmlnLnJlc2V0T25FbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczMucGxheWVyLnJlc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgYnVmZmVyIHByb2dyZXNzXHJcbiAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCB0aGlzLnBsYXllci5tZWRpYSwgJ3Byb2dyZXNzIHBsYXlpbmcgc2Vla2luZyBzZWVrZWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbHMudXBkYXRlUHJvZ3Jlc3MuY2FsbChfdGhpczMucGxheWVyLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgdm9sdW1lIGNoYW5nZXNcclxuICAgICAgICAgICAgICAgIG9uLmNhbGwodGhpcy5wbGF5ZXIsIHRoaXMucGxheWVyLm1lZGlhLCAndm9sdW1lY2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xzLnVwZGF0ZVZvbHVtZS5jYWxsKF90aGlzMy5wbGF5ZXIsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBwbGF5L3BhdXNlXHJcbiAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCB0aGlzLnBsYXllci5tZWRpYSwgJ3BsYXlpbmcgcGxheSBwYXVzZSBlbmRlZCBlbXB0aWVkIHRpbWV1cGRhdGUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdWkuY2hlY2tQbGF5aW5nLmNhbGwoX3RoaXMzLnBsYXllciwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTG9hZGluZyBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgb24uY2FsbCh0aGlzLnBsYXllciwgdGhpcy5wbGF5ZXIubWVkaWEsICd3YWl0aW5nIGNhbnBsYXkgc2Vla2VkIHBsYXlpbmcnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdWkuY2hlY2tMb2FkaW5nLmNhbGwoX3RoaXMzLnBsYXllciwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgYXV0b3BsYXksIHRoZW4gbG9hZCBhZHZlcnRpc2VtZW50IGlmIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBTaG93IHNvbWUgc29ydCBvZiBsb2FkaW5nIHN0YXRlIHdoaWxlIHRoZSBhZCBtYW5hZ2VyIGxvYWRzIGVsc2UgdGhlcmUncyBhIGRlbGF5IGJlZm9yZSBhZCBzaG93c1xyXG4gICAgICAgICAgICAgICAgb24uY2FsbCh0aGlzLnBsYXllciwgdGhpcy5wbGF5ZXIubWVkaWEsICdwbGF5aW5nJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghX3RoaXMzLnBsYXllci5hZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYWRzIGFyZSBlbmFibGVkLCB3YWl0IGZvciB0aGVtIGZpcnN0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzMy5wbGF5ZXIuYWRzLmVuYWJsZWQgJiYgIV90aGlzMy5wbGF5ZXIuYWRzLmluaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdhaXQgZm9yIG1hbmFnZXIgcmVzcG9uc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMzLnBsYXllci5hZHMubWFuYWdlclByb21pc2UudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMzLnBsYXllci5hZHMucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMzLnBsYXllci5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENsaWNrIHZpZGVvXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuc3VwcG9ydGVkLnVpICYmIHRoaXMucGxheWVyLmNvbmZpZy5jbGlja1RvUGxheSAmJiAhdGhpcy5wbGF5ZXIuaXNBdWRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlLWZldGNoIHRoZSB3cmFwcGVyXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBnZXRFbGVtZW50LmNhbGwodGhpcy5wbGF5ZXIsICcuJyArIHRoaXMucGxheWVyLmNvbmZpZy5jbGFzc05hbWVzLnZpZGVvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQmFpbCBpZiB0aGVyZSdzIG5vIHdyYXBwZXIgKHRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbilcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzLmVsZW1lbnQod3JhcHBlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT24gY2xpY2sgcGxheSwgcGF1c2Ugb3JlIHJlc3RhcnRcclxuICAgICAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCB3cmFwcGVyLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvdWNoIGRldmljZXMgd2lsbCBqdXN0IHNob3cgY29udHJvbHMgKGlmIHdlJ3JlIGhpZGluZyBjb250cm9scylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzMy5wbGF5ZXIuY29uZmlnLmhpZGVDb250cm9scyAmJiBfdGhpczMucGxheWVyLnRvdWNoICYmICFfdGhpczMucGxheWVyLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMzLnBsYXllci5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMy5wbGF5ZXIucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzMy5wbGF5ZXIuZW5kZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMy5wbGF5ZXIucmVzdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMzLnBsYXllci5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczMucGxheWVyLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEaXNhYmxlIHJpZ2h0IGNsaWNrXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuc3VwcG9ydGVkLnVpICYmIHRoaXMucGxheWVyLmNvbmZpZy5kaXNhYmxlQ29udGV4dE1lbnUpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCB0aGlzLnBsYXllci5lbGVtZW50cy53cmFwcGVyLCAnY29udGV4dG1lbnUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVm9sdW1lIGNoYW5nZVxyXG4gICAgICAgICAgICAgICAgb24uY2FsbCh0aGlzLnBsYXllciwgdGhpcy5wbGF5ZXIubWVkaWEsICd2b2x1bWVjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2F2ZSB0byBzdG9yYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMzLnBsYXllci5zdG9yYWdlLnNldCh7IHZvbHVtZTogX3RoaXMzLnBsYXllci52b2x1bWUsIG11dGVkOiBfdGhpczMucGxheWVyLm11dGVkIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3BlZWQgY2hhbmdlXHJcbiAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCB0aGlzLnBsYXllci5tZWRpYSwgJ3JhdGVjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIFVJXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbHMudXBkYXRlU2V0dGluZy5jYWxsKF90aGlzMy5wbGF5ZXIsICdzcGVlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTYXZlIHRvIHN0b3JhZ2VcclxuICAgICAgICAgICAgICAgICAgICBfdGhpczMucGxheWVyLnN0b3JhZ2Uuc2V0KHsgc3BlZWQ6IF90aGlzMy5wbGF5ZXIuc3BlZWQgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBRdWFsaXR5IHJlcXVlc3RcclxuICAgICAgICAgICAgICAgIG9uLmNhbGwodGhpcy5wbGF5ZXIsIHRoaXMucGxheWVyLm1lZGlhLCAncXVhbGl0eXJlcXVlc3RlZCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNhdmUgdG8gc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMy5wbGF5ZXIuc3RvcmFnZS5zZXQoeyBxdWFsaXR5OiBldmVudC5kZXRhaWwucXVhbGl0eSB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFF1YWxpdHkgY2hhbmdlXHJcbiAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMucGxheWVyLCB0aGlzLnBsYXllci5tZWRpYSwgJ3F1YWxpdHljaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgVUlcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9scy51cGRhdGVTZXR0aW5nLmNhbGwoX3RoaXMzLnBsYXllciwgJ3F1YWxpdHknLCBudWxsLCBldmVudC5kZXRhaWwucXVhbGl0eSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcm94eSBldmVudHMgdG8gY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICAvLyBCdWJibGUgdXAga2V5IGV2ZW50cyBmb3IgRWRnZVxyXG4gICAgICAgICAgICAgICAgdmFyIHByb3h5RXZlbnRzID0gdGhpcy5wbGF5ZXIuY29uZmlnLmV2ZW50cy5jb25jYXQoWydrZXl1cCcsICdrZXlkb3duJ10pLmpvaW4oJyAnKTtcclxuICAgICAgICAgICAgICAgIG9uLmNhbGwodGhpcy5wbGF5ZXIsIHRoaXMucGxheWVyLm1lZGlhLCBwcm94eUV2ZW50cywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9ldmVudCRkZXRhaWwgPSBldmVudC5kZXRhaWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbCA9IF9ldmVudCRkZXRhaWwgPT09IHVuZGVmaW5lZCA/IHt9IDogX2V2ZW50JGRldGFpbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGVycm9yIGRldGFpbHMgZnJvbSBtZWRpYVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWwgPSBfdGhpczMucGxheWVyLm1lZGlhLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwoX3RoaXMzLnBsYXllciwgX3RoaXMzLnBsYXllci5lbGVtZW50cy5jb250YWluZXIsIGV2ZW50LnR5cGUsIHRydWUsIGRldGFpbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTGlzdGVuIGZvciBjb250cm9sIGV2ZW50c1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2NvbnRyb2xzJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbnRyb2xzJCQxKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSUUgZG9lc24ndCBzdXBwb3J0IGlucHV0IGV2ZW50LCBzbyB3ZSBmYWxsYmFjayB0byBjaGFuZ2VcclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dEV2ZW50ID0gYnJvd3Nlci5pc0lFID8gJ2NoYW5nZScgOiAnaW5wdXQnO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJ1biBkZWZhdWx0IGFuZCBjdXN0b20gaGFuZGxlcnNcclxuICAgICAgICAgICAgICAgIHZhciBwcm94eSA9IGZ1bmN0aW9uIHByb3h5KGV2ZW50LCBkZWZhdWx0SGFuZGxlciwgY3VzdG9tSGFuZGxlcktleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXN0b21IYW5kbGVyID0gX3RoaXM0LnBsYXllci5jb25maWcubGlzdGVuZXJzW2N1c3RvbUhhbmRsZXJLZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoYXNDdXN0b21IYW5kbGVyID0gaXMuZnVuY3Rpb24oY3VzdG9tSGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSBjdXN0b20gaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNDdXN0b21IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybmVkID0gY3VzdG9tSGFuZGxlci5jYWxsKF90aGlzNC5wbGF5ZXIsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgY2FsbCBkZWZhdWx0IGhhbmRsZXIgaWYgbm90IHByZXZlbnRlZCBpbiBjdXN0b20gaGFuZGxlclxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5lZCAmJiBpcy5mdW5jdGlvbihkZWZhdWx0SGFuZGxlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEhhbmRsZXIuY2FsbChfdGhpczQucGxheWVyLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGN1c3RvbSBhbmQgZGVmYXVsdCBoYW5kbGVyc1xyXG4gICAgICAgICAgICAgICAgdmFyIGJpbmQgPSBmdW5jdGlvbiBiaW5kKGVsZW1lbnQsIHR5cGUsIGRlZmF1bHRIYW5kbGVyLCBjdXN0b21IYW5kbGVyS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhc3NpdmUgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXN0b21IYW5kbGVyID0gX3RoaXM0LnBsYXllci5jb25maWcubGlzdGVuZXJzW2N1c3RvbUhhbmRsZXJLZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoYXNDdXN0b21IYW5kbGVyID0gaXMuZnVuY3Rpb24oY3VzdG9tSGFuZGxlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9uLmNhbGwoX3RoaXM0LnBsYXllciwgZWxlbWVudCwgdHlwZSwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm94eShldmVudCwgZGVmYXVsdEhhbmRsZXIsIGN1c3RvbUhhbmRsZXJLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHBhc3NpdmUgJiYgIWhhc0N1c3RvbUhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQbGF5L3BhdXNlIHRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLmVsZW1lbnRzLmJ1dHRvbnMucGxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5wbGF5ZXIuZWxlbWVudHMuYnV0dG9ucy5wbGF5KS5mb3JFYWNoKGZ1bmN0aW9uIChidXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZChidXR0b24sICdjbGljaycsIF90aGlzNC5wbGF5ZXIudG9nZ2xlUGxheSwgJ3BsYXknKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQYXVzZVxyXG4gICAgICAgICAgICAgICAgYmluZCh0aGlzLnBsYXllci5lbGVtZW50cy5idXR0b25zLnJlc3RhcnQsICdjbGljaycsIHRoaXMucGxheWVyLnJlc3RhcnQsICdyZXN0YXJ0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV3aW5kXHJcbiAgICAgICAgICAgICAgICBiaW5kKHRoaXMucGxheWVyLmVsZW1lbnRzLmJ1dHRvbnMucmV3aW5kLCAnY2xpY2snLCB0aGlzLnBsYXllci5yZXdpbmQsICdyZXdpbmQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXdpbmRcclxuICAgICAgICAgICAgICAgIGJpbmQodGhpcy5wbGF5ZXIuZWxlbWVudHMuYnV0dG9ucy5mYXN0Rm9yd2FyZCwgJ2NsaWNrJywgdGhpcy5wbGF5ZXIuZm9yd2FyZCwgJ2Zhc3RGb3J3YXJkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTXV0ZSB0b2dnbGVcclxuICAgICAgICAgICAgICAgIGJpbmQodGhpcy5wbGF5ZXIuZWxlbWVudHMuYnV0dG9ucy5tdXRlLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM0LnBsYXllci5tdXRlZCA9ICFfdGhpczQucGxheWVyLm11dGVkO1xyXG4gICAgICAgICAgICAgICAgfSwgJ211dGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBDYXB0aW9ucyB0b2dnbGVcclxuICAgICAgICAgICAgICAgIGJpbmQodGhpcy5wbGF5ZXIuZWxlbWVudHMuYnV0dG9ucy5jYXB0aW9ucywgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczQucGxheWVyLnRvZ2dsZUNhcHRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGdWxsc2NyZWVuIHRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgYmluZCh0aGlzLnBsYXllci5lbGVtZW50cy5idXR0b25zLmZ1bGxzY3JlZW4sICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpczQucGxheWVyLmZ1bGxzY3JlZW4udG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAnZnVsbHNjcmVlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFBpY3R1cmUtaW4tUGljdHVyZVxyXG4gICAgICAgICAgICAgICAgYmluZCh0aGlzLnBsYXllci5lbGVtZW50cy5idXR0b25zLnBpcCwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNC5wbGF5ZXIucGlwID0gJ3RvZ2dsZSc7XHJcbiAgICAgICAgICAgICAgICB9LCAncGlwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWlycGxheVxyXG4gICAgICAgICAgICAgICAgYmluZCh0aGlzLnBsYXllci5lbGVtZW50cy5idXR0b25zLmFpcnBsYXksICdjbGljaycsIHRoaXMucGxheWVyLmFpcnBsYXksICdhaXJwbGF5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0dGluZ3MgbWVudVxyXG4gICAgICAgICAgICAgICAgYmluZCh0aGlzLnBsYXllci5lbGVtZW50cy5idXR0b25zLnNldHRpbmdzLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9scy50b2dnbGVNZW51LmNhbGwoX3RoaXM0LnBsYXllciwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0dGluZ3MgbWVudVxyXG4gICAgICAgICAgICAgICAgYmluZCh0aGlzLnBsYXllci5lbGVtZW50cy5zZXR0aW5ncy5mb3JtLCAnY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR28gYmFjayB0byBob21lIHRhYiBvbiBjbGlja1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaG93SG9tZVRhYiA9IGZ1bmN0aW9uIHNob3dIb21lVGFiKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSAncGx5ci1zZXR0aW5ncy0nICsgX3RoaXM0LnBsYXllci5pZCArICctaG9tZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzLnNob3dUYWIuY2FsbChfdGhpczQucGxheWVyLCBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0dGluZ3MgbWVudSBpdGVtcyAtIHVzZSBldmVudCBkZWxlZ2F0aW9uIGFzIGl0ZW1zIGFyZSBhZGRlZC9yZW1vdmVkXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMoZXZlbnQudGFyZ2V0LCBfdGhpczQucGxheWVyLmNvbmZpZy5zZWxlY3RvcnMuaW5wdXRzLmxhbmd1YWdlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm94eShldmVudCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXM0LnBsYXllci5jdXJyZW50VHJhY2sgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dIb21lVGFiKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICdsYW5ndWFnZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlcyhldmVudC50YXJnZXQsIF90aGlzNC5wbGF5ZXIuY29uZmlnLnNlbGVjdG9ycy5pbnB1dHMucXVhbGl0eSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJveHkoZXZlbnQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzNC5wbGF5ZXIucXVhbGl0eSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dIb21lVGFiKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaGVzKGV2ZW50LnRhcmdldCwgX3RoaXM0LnBsYXllci5jb25maWcuc2VsZWN0b3JzLmlucHV0cy5zcGVlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJveHkoZXZlbnQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzNC5wbGF5ZXIuc3BlZWQgPSBwYXJzZUZsb2F0KGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93SG9tZVRhYigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAnc3BlZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFiID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9scy5zaG93VGFiLmNhbGwoX3RoaXM0LnBsYXllciwgdGFiLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgcmFuZ2UgaW5wdXQgYWx0ZXJuYXRpdmUgXCJ2YWx1ZVwiLCB3aGljaCBtYXRjaGVzIHRoZSB0b29sdGlwIHRpbWUgKCM5NTQpXHJcbiAgICAgICAgICAgICAgICBiaW5kKHRoaXMucGxheWVyLmVsZW1lbnRzLmlucHV0cy5zZWVrLCAnbW91c2Vkb3duIG1vdXNlbW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGllbnRSZWN0ID0gX3RoaXM0LnBsYXllci5lbGVtZW50cy5wcm9ncmVzcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVyY2VudCA9IDEwMCAvIGNsaWVudFJlY3Qud2lkdGggKiAoZXZlbnQucGFnZVggLSBjbGllbnRSZWN0LmxlZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuc2V0QXR0cmlidXRlKCdzZWVrLXZhbHVlJywgcGVyY2VudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQYXVzZSB3aGlsZSBzZWVraW5nXHJcbiAgICAgICAgICAgICAgICBiaW5kKHRoaXMucGxheWVyLmVsZW1lbnRzLmlucHV0cy5zZWVrLCAnbW91c2Vkb3duIG1vdXNldXAga2V5ZG93biBrZXl1cCB0b3VjaHN0YXJ0IHRvdWNoZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlZWsgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29kZSA9IGV2ZW50LmtleUNvZGUgPyBldmVudC5rZXlDb2RlIDogZXZlbnQud2hpY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50VHlwZSA9IGV2ZW50LnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZXZlbnRUeXBlID09PSAna2V5ZG93bicgfHwgZXZlbnRUeXBlID09PSAna2V5dXAnKSAmJiBjb2RlICE9PSAzOSAmJiBjb2RlICE9PSAzNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdhcyBwbGF5aW5nIGJlZm9yZT9cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxheSA9IHNlZWsuaGFzQXR0cmlidXRlKCdwbGF5LW9uLXNlZWtlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBEb25lIHNlZWtpbmdcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZG9uZSA9IFsnbW91c2V1cCcsICd0b3VjaGVuZCcsICdrZXl1cCddLmluY2x1ZGVzKGV2ZW50LnR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSdyZSBkb25lIHNlZWtpbmcgYW5kIGl0IHdhcyBwbGF5aW5nLCByZXN1bWUgcGxheWJhY2tcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheSAmJiBkb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZWsucmVtb3ZlQXR0cmlidXRlKCdwbGF5LW9uLXNlZWtlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczQucGxheWVyLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFkb25lICYmIF90aGlzNC5wbGF5ZXIucGxheWluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWVrLnNldEF0dHJpYnV0ZSgncGxheS1vbi1zZWVrZWQnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzNC5wbGF5ZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZWVrXHJcbiAgICAgICAgICAgICAgICBiaW5kKHRoaXMucGxheWVyLmVsZW1lbnRzLmlucHV0cy5zZWVrLCBpbnB1dEV2ZW50LCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VlayA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGV4aXN0cywgdXNlIHNlZWstdmFsdWUgaW5zdGVhZCBvZiBcInZhbHVlXCIgZm9yIGNvbnNpc3RlbmN5IHdpdGggdG9vbHRpcCB0aW1lICgjOTU0KVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWVrVG8gPSBzZWVrLmdldEF0dHJpYnV0ZSgnc2Vlay12YWx1ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXMuZW1wdHkoc2Vla1RvKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWVrVG8gPSBzZWVrLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vlay5yZW1vdmVBdHRyaWJ1dGUoJ3NlZWstdmFsdWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM0LnBsYXllci5jdXJyZW50VGltZSA9IHNlZWtUbyAvIHNlZWsubWF4ICogX3RoaXM0LnBsYXllci5kdXJhdGlvbjtcclxuICAgICAgICAgICAgICAgIH0sICdzZWVrJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ3VycmVudCB0aW1lIGludmVydFxyXG4gICAgICAgICAgICAgICAgLy8gT25seSBpZiBvbmUgdGltZSBlbGVtZW50IGlzIHVzZWQgZm9yIGJvdGggY3VycmVudFRpbWUgYW5kIGR1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuY29uZmlnLnRvZ2dsZUludmVydCAmJiAhaXMuZWxlbWVudCh0aGlzLnBsYXllci5lbGVtZW50cy5kaXNwbGF5LmR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5wbGF5ZXIuZWxlbWVudHMuZGlzcGxheS5jdXJyZW50VGltZSwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nIGlmIHdlJ3JlIGF0IHRoZSBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXM0LnBsYXllci5jdXJyZW50VGltZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczQucGxheWVyLmNvbmZpZy5pbnZlcnRUaW1lID0gIV90aGlzNC5wbGF5ZXIuY29uZmlnLmludmVydFRpbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9scy50aW1lVXBkYXRlLmNhbGwoX3RoaXM0LnBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVm9sdW1lXHJcbiAgICAgICAgICAgICAgICBiaW5kKHRoaXMucGxheWVyLmVsZW1lbnRzLmlucHV0cy52b2x1bWUsIGlucHV0RXZlbnQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNC5wbGF5ZXIudm9sdW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSwgJ3ZvbHVtZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFBvbHlmaWxsIGZvciBsb3dlciBmaWxsIGluIDxpbnB1dCB0eXBlPVwicmFuZ2VcIj4gZm9yIHdlYmtpdFxyXG4gICAgICAgICAgICAgICAgaWYgKGJyb3dzZXIuaXNXZWJraXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKGdldEVsZW1lbnRzLmNhbGwodGhpcy5wbGF5ZXIsICdpbnB1dFt0eXBlPVwicmFuZ2VcIl0nKSkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5kKGVsZW1lbnQsICdpbnB1dCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xzLnVwZGF0ZVJhbmdlRmlsbC5jYWxsKF90aGlzNC5wbGF5ZXIsIGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNlZWsgdG9vbHRpcFxyXG4gICAgICAgICAgICAgICAgYmluZCh0aGlzLnBsYXllci5lbGVtZW50cy5wcm9ncmVzcywgJ21vdXNlZW50ZXIgbW91c2VsZWF2ZSBtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbHMudXBkYXRlU2Vla1Rvb2x0aXAuY2FsbChfdGhpczQucGxheWVyLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY29udHJvbHMuaG92ZXIgc3RhdGUgKHVzZWQgZm9yIHVpLnRvZ2dsZUNvbnRyb2xzIHRvIGF2b2lkIGhpZGluZyB3aGVuIGludGVyYWN0aW5nKVxyXG4gICAgICAgICAgICAgICAgYmluZCh0aGlzLnBsYXllci5lbGVtZW50cy5jb250cm9scywgJ21vdXNlZW50ZXIgbW91c2VsZWF2ZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNC5wbGF5ZXIuZWxlbWVudHMuY29udHJvbHMuaG92ZXIgPSAhX3RoaXM0LnBsYXllci50b3VjaCAmJiBldmVudC50eXBlID09PSAnbW91c2VlbnRlcic7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY29udHJvbHMucHJlc3NlZCBzdGF0ZSAodXNlZCBmb3IgdWkudG9nZ2xlQ29udHJvbHMgdG8gYXZvaWQgaGlkaW5nIHdoZW4gaW50ZXJhY3RpbmcpXHJcbiAgICAgICAgICAgICAgICBiaW5kKHRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRyb2xzLCAnbW91c2Vkb3duIG1vdXNldXAgdG91Y2hzdGFydCB0b3VjaGVuZCB0b3VjaGNhbmNlbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNC5wbGF5ZXIuZWxlbWVudHMuY29udHJvbHMucHJlc3NlZCA9IFsnbW91c2Vkb3duJywgJ3RvdWNoc3RhcnQnXS5pbmNsdWRlcyhldmVudC50eXBlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEZvY3VzIGluL291dCBvbiBjb250cm9sc1xyXG4gICAgICAgICAgICAgICAgYmluZCh0aGlzLnBsYXllci5lbGVtZW50cy5jb250cm9scywgJ2ZvY3VzaW4gZm9jdXNvdXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX3BsYXllciA9IF90aGlzNC5wbGF5ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IF9wbGF5ZXIuY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyA9IF9wbGF5ZXIuZWxlbWVudHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVycyA9IF9wbGF5ZXIudGltZXJzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIHRyYW5zaXRpb24gdG8gcHJldmVudCBmb2N1cyBmcm9tIHNjcm9sbGluZyB0aGUgcGFyZW50IGVsZW1lbnRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZWxlbWVudHMuY29udHJvbHMsIGNvbmZpZy5jbGFzc05hbWVzLm5vVHJhbnNpdGlvbiwgZXZlbnQudHlwZSA9PT0gJ2ZvY3VzaW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlXHJcbiAgICAgICAgICAgICAgICAgICAgdWkudG9nZ2xlQ29udHJvbHMuY2FsbChfdGhpczQucGxheWVyLCBldmVudC50eXBlID09PSAnZm9jdXNpbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBmb2N1c2luLCBoaWRlIGFnYWluIGFmdGVyIGRlbGF5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdmb2N1c2luJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRyYW5zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhlbGVtZW50cy5jb250cm9scywgY29uZmlnLmNsYXNzTmFtZXMubm9UcmFuc2l0aW9uLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVsYXkgYSBsaXR0bGUgbW9yZSBmb3Iga2V5Ym9hcmQgdXNlcnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbGF5ID0gX3RoaXM0LnRvdWNoID8gMzAwMCA6IDQwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDbGVhciB0aW1lclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJzLmNvbnRyb2xzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSGlkZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcnMuY29udHJvbHMgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1aS50b2dnbGVDb250cm9scy5jYWxsKF90aGlzNC5wbGF5ZXIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1vdXNlIHdoZWVsIGZvciB2b2x1bWVcclxuICAgICAgICAgICAgICAgIGJpbmQodGhpcy5wbGF5ZXIuZWxlbWVudHMuaW5wdXRzLnZvbHVtZSwgJ3doZWVsJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRGV0ZWN0IFwibmF0dXJhbFwiIHNjcm9sbCAtIHN1cHBvcmVkIG9uIE9TIFggU2FmYXJpIG9ubHlcclxuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlciBicm93c2VycyBvbiBPUyBYIHdpbGwgYmUgaW52ZXJ0ZWQgdW50aWwgc3VwcG9ydCBpbXByb3Zlc1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnZlcnRlZCA9IGV2ZW50LndlYmtpdERpcmVjdGlvbkludmVydGVkRnJvbURldmljZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGRlbHRhIGZyb20gZXZlbnQuIEludmVydCBpZiBgaW52ZXJ0ZWRgIGlzIHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9tYXAgPSBbZXZlbnQuZGVsdGFYLCAtZXZlbnQuZGVsdGFZXS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnZlcnRlZCA/IC12YWx1ZSA6IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfbWFwMiA9IHNsaWNlZFRvQXJyYXkoX21hcCwgMiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSBfbWFwMlswXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IF9tYXAyWzFdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBVc2luZyB0aGUgYmlnZ2VzdCBkZWx0YSwgbm9ybWFsaXplIHRvIDEgb3IgLTEgKG9yIDAgaWYgbm8gZGVsdGEpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gTWF0aC5zaWduKE1hdGguYWJzKHgpID4gTWF0aC5hYnMoeSkgPyB4IDogeSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoYW5nZSB0aGUgdm9sdW1lIGJ5IDIlXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM0LnBsYXllci5pbmNyZWFzZVZvbHVtZShkaXJlY3Rpb24gLyA1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGJyZWFrIHBhZ2Ugc2Nyb2xsaW5nIGF0IG1heCBhbmQgbWluXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZvbHVtZSA9IF90aGlzNC5wbGF5ZXIubWVkaWEudm9sdW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxICYmIHZvbHVtZSA8IDEgfHwgZGlyZWN0aW9uID09PSAtMSAmJiB2b2x1bWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgJ3ZvbHVtZScsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dKTtcclxuICAgICAgICByZXR1cm4gTGlzdGVuZXJzO1xyXG4gICAgfSgpO1xyXG5cclxuICAgIHZhciBjb21tb25qc0dsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDoge307XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29tbW9uanNNb2R1bGUoZm4sIG1vZHVsZSkge1xyXG4gICAgICAgIHJldHVybiBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0cztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9hZGpzX3VtZCA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcclxuICAgICAgICAoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB1bmRlZmluZWQgPT09ICdmdW5jdGlvbicgJiYgdW5kZWZpbmVkLmFtZCkge1xyXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkKFtdLCBmYWN0b3J5KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfShjb21tb25qc0dsb2JhbCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogR2xvYmFsIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAgICAgICogQGdsb2JhbCB7T2JqZWN0fSBkb2N1bWVudCAtIERPTVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgIHZhciBkZXZudWxsID0gZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgICAgICAgICAgICAgYnVuZGxlSWRDYWNoZSA9IHt9LFxyXG4gICAgICAgICAgICAgICAgYnVuZGxlUmVzdWx0Q2FjaGUgPSB7fSxcclxuICAgICAgICAgICAgICAgIGJ1bmRsZUNhbGxiYWNrUXVldWUgPSB7fTtcclxuXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogU3Vic2NyaWJlIHRvIGJ1bmRsZSBsb2FkIGV2ZW50LlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBidW5kbGVJZHMgLSBCdW5kbGUgaWRzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrRm4gLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1YnNjcmliZShidW5kbGVJZHMsIGNhbGxiYWNrRm4pIHtcclxuICAgICAgICAgICAgICAgIC8vIGxpc3RpZnlcclxuICAgICAgICAgICAgICAgIGJ1bmRsZUlkcyA9IGJ1bmRsZUlkcy5wdXNoID8gYnVuZGxlSWRzIDogW2J1bmRsZUlkc107XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRlcHNOb3RGb3VuZCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBidW5kbGVJZHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bVdhaXRpbmcgPSBpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZuLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bmRsZUlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHIsXHJcbiAgICAgICAgICAgICAgICAgICAgcTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBkZWZpbmUgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIGZuID0gZnVuY3Rpb24gKGJ1bmRsZUlkLCBwYXRoc05vdEZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhdGhzTm90Rm91bmQubGVuZ3RoKSBkZXBzTm90Rm91bmQucHVzaChidW5kbGVJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG51bVdhaXRpbmctLTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW51bVdhaXRpbmcpIGNhbGxiYWNrRm4oZGVwc05vdEZvdW5kKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcmVnaXN0ZXIgY2FsbGJhY2tcclxuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBidW5kbGVJZCA9IGJ1bmRsZUlkc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBjYWxsYmFjayBpZiBpbiByZXN1bHQgY2FjaGVcclxuICAgICAgICAgICAgICAgICAgICByID0gYnVuZGxlUmVzdWx0Q2FjaGVbYnVuZGxlSWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuKGJ1bmRsZUlkLCByKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdG8gY2FsbGJhY2sgcXVldWVcclxuICAgICAgICAgICAgICAgICAgICBxID0gYnVuZGxlQ2FsbGJhY2tRdWV1ZVtidW5kbGVJZF0gPSBidW5kbGVDYWxsYmFja1F1ZXVlW2J1bmRsZUlkXSB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICBxLnB1c2goZm4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFB1Ymxpc2ggYnVuZGxlIGxvYWQgZXZlbnQuXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidW5kbGVJZCAtIEJ1bmRsZSBpZFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwYXRoc05vdEZvdW5kIC0gTGlzdCBvZiBmaWxlcyBub3QgZm91bmRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHB1Ymxpc2goYnVuZGxlSWQsIHBhdGhzTm90Rm91bmQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGV4aXQgaWYgaWQgaXNuJ3QgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgaWYgKCFidW5kbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBxID0gYnVuZGxlQ2FsbGJhY2tRdWV1ZVtidW5kbGVJZF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2FjaGUgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICBidW5kbGVSZXN1bHRDYWNoZVtidW5kbGVJZF0gPSBwYXRoc05vdEZvdW5kO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGV4aXQgaWYgcXVldWUgaXMgZW1wdHlcclxuICAgICAgICAgICAgICAgIGlmICghcSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGVtcHR5IGNhbGxiYWNrIHF1ZXVlXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAocS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBxWzBdKGJ1bmRsZUlkLCBwYXRoc05vdEZvdW5kKTtcclxuICAgICAgICAgICAgICAgICAgICBxLnNwbGljZSgwLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBFeGVjdXRlIGNhbGxiYWNrcy5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3Qgb3IgRnVuY3Rpb259IGFyZ3MgLSBUaGUgY2FsbGJhY2sgYXJnc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBkZXBzTm90Rm91bmQgLSBMaXN0IG9mIGRlcGVuZGVuY2llcyBub3QgZm91bmRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4ZWN1dGVDYWxsYmFja3MoYXJncywgZGVwc05vdEZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhY2NlcHQgZnVuY3Rpb24gYXMgYXJndW1lbnRcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmNhbGwpIGFyZ3MgPSB7IHN1Y2Nlc3M6IGFyZ3MgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBzdWNjZXNzIGFuZCBlcnJvciBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgIGlmIChkZXBzTm90Rm91bmQubGVuZ3RoKSAoYXJncy5lcnJvciB8fCBkZXZudWxsKShkZXBzTm90Rm91bmQpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSAoYXJncy5zdWNjZXNzIHx8IGRldm51bGwpKGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIExvYWQgaW5kaXZpZHVhbCBmaWxlLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBmaWxlIHBhdGhcclxuICAgICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tGbiAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gbG9hZEZpbGUocGF0aCwgY2FsbGJhY2tGbiwgYXJncywgbnVtVHJpZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkb2MgPSBkb2N1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICBhc3luYyA9IGFyZ3MuYXN5bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4VHJpZXMgPSAoYXJncy5udW1SZXRyaWVzIHx8IDApICsgMSxcclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVDYWxsYmFja0ZuID0gYXJncy5iZWZvcmUgfHwgZGV2bnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoU3RyaXBwZWQgPSBwYXRoLnJlcGxhY2UoL14oY3NzfGltZykhLywgJycpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ3NzLFxyXG4gICAgICAgICAgICAgICAgICAgIGU7XHJcblxyXG4gICAgICAgICAgICAgICAgbnVtVHJpZXMgPSBudW1UcmllcyB8fCAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgvKF5jc3MhfFxcLmNzcyQpLy50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDc3MgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjc3NcclxuICAgICAgICAgICAgICAgICAgICBlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcclxuICAgICAgICAgICAgICAgICAgICBlLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgICAgICAgICAgICAgICAgICBlLmhyZWYgPSBwYXRoU3RyaXBwZWQ7IC8vLnJlcGxhY2UoL15jc3MhLywgJycpOyAgLy8gcmVtb3ZlIFwiY3NzIVwiIHByZWZpeFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgvKF5pbWchfFxcLihwbmd8Z2lmfGpwZ3xzdmcpJCkvLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgIGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zcmMgPSBwYXRoU3RyaXBwZWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGphdmFzY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICBlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3JjID0gcGF0aDtcclxuICAgICAgICAgICAgICAgICAgICBlLmFzeW5jID0gYXN5bmMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhc3luYztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLm9ubG9hZCA9IGUub25lcnJvciA9IGUub25iZWZvcmVsb2FkID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGV2LnR5cGVbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdGU6IFRoZSBmb2xsb3dpbmcgY29kZSBpc29sYXRlcyBJRSB1c2luZyBgaGlkZUZvY3VzYCBhbmQgdHJlYXRzIGVtcHR5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3R5bGVzaGVldHMgYXMgZmFpbHVyZXMgdG8gZ2V0IGFyb3VuZCBsYWNrIG9mIG9uZXJyb3Igc3VwcG9ydFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0NzcyAmJiAnaGlkZUZvY3VzJyBpbiBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWUuc2hlZXQuY3NzVGV4dC5sZW5ndGgpIHJlc3VsdCA9ICdlJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoeCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hlZXRzIG9iamVjdHMgY3JlYXRlZCBmcm9tIGxvYWQgZXJyb3JzIGRvbid0IGFsbG93IGFjY2VzcyB0b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYGNzc1RleHRgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAnZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSByZXRyaWVzIGluIGNhc2Ugb2YgbG9hZCBmYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSAnZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5jcmVtZW50IGNvdW50ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtVHJpZXMgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXQgZnVuY3Rpb24gYW5kIHRyeSBhZ2FpblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobnVtVHJpZXMgPCBtYXhUcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRGaWxlKHBhdGgsIGNhbGxiYWNrRm4sIGFyZ3MsIG51bVRyaWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBjYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrRm4ocGF0aCwgcmVzdWx0LCBldi5kZWZhdWx0UHJldmVudGVkKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRvIGRvY3VtZW50ICh1bmxlc3MgY2FsbGJhY2sgcmV0dXJucyBgZmFsc2VgKVxyXG4gICAgICAgICAgICAgICAgaWYgKGJlZm9yZUNhbGxiYWNrRm4ocGF0aCwgZSkgIT09IGZhbHNlKSBkb2MuaGVhZC5hcHBlbmRDaGlsZChlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBMb2FkIG11bHRpcGxlIGZpbGVzLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBwYXRocyAtIFRoZSBmaWxlIHBhdGhzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrRm4gLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxvYWRGaWxlcyhwYXRocywgY2FsbGJhY2tGbiwgYXJncykge1xyXG4gICAgICAgICAgICAgICAgLy8gbGlzdGlmeSBwYXRoc1xyXG4gICAgICAgICAgICAgICAgcGF0aHMgPSBwYXRocy5wdXNoID8gcGF0aHMgOiBbcGF0aHNdO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBudW1XYWl0aW5nID0gcGF0aHMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgIHggPSBudW1XYWl0aW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGhzTm90Rm91bmQgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICBmbixcclxuICAgICAgICAgICAgICAgICAgICBpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRlZmluZSBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgZm4gPSBmdW5jdGlvbiAocGF0aCwgcmVzdWx0LCBkZWZhdWx0UHJldmVudGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSAnZScpIHBhdGhzTm90Rm91bmQucHVzaChwYXRoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIGJlZm9yZWxvYWQgZXZlbnQuIElmIGRlZmF1bHRQcmV2ZW50ZWQgdGhlbiB0aGF0IG1lYW5zIHRoZSBsb2FkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBiZSBibG9ja2VkIChleC4gR2hvc3RlcnkvQUJQIG9uIFNhZmFyaSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09ICdiJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFByZXZlbnRlZCkgcGF0aHNOb3RGb3VuZC5wdXNoKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG51bVdhaXRpbmctLTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW51bVdhaXRpbmcpIGNhbGxiYWNrRm4ocGF0aHNOb3RGb3VuZCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGxvYWQgc2NyaXB0c1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHg7IGkrKykgbG9hZEZpbGUocGF0aHNbaV0sIGZuLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJbml0aWF0ZSBzY3JpcHQgbG9hZCBhbmQgcmVnaXN0ZXIgYnVuZGxlLlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyhzdHJpbmd8c3RyaW5nW10pfSBwYXRocyAtIFRoZSBmaWxlIHBhdGhzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7KHN0cmluZ3xGdW5jdGlvbil9IFthcmcxXSAtIFRoZSBidW5kbGVJZCBvciBzdWNjZXNzIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFthcmcyXSAtIFRoZSBzdWNjZXNzIG9yIGVycm9yIGNhbGxiYWNrXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFthcmczXSAtIFRoZSBlcnJvciBjYWxsYmFja1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gbG9hZGpzKHBhdGhzLCBhcmcxLCBhcmcyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnVuZGxlSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJncztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBidW5kbGVJZCAoaWYgc3RyaW5nKVxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZzEgJiYgYXJnMS50cmltKSBidW5kbGVJZCA9IGFyZzE7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gYXJncyAoZGVmYXVsdCBpcyB7fSlcclxuICAgICAgICAgICAgICAgIGFyZ3MgPSAoYnVuZGxlSWQgPyBhcmcyIDogYXJnMSkgfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgZXJyb3IgaWYgYnVuZGxlIGlzIGFscmVhZHkgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1bmRsZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1bmRsZUlkIGluIGJ1bmRsZUlkQ2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJMb2FkSlNcIjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidW5kbGVJZENhY2hlW2J1bmRsZUlkXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGxvYWQgc2NyaXB0c1xyXG4gICAgICAgICAgICAgICAgbG9hZEZpbGVzKHBhdGhzLCBmdW5jdGlvbiAocGF0aHNOb3RGb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4ZWN1dGUgY2FsbGJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgZXhlY3V0ZUNhbGxiYWNrcyhhcmdzLCBwYXRoc05vdEZvdW5kKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHVibGlzaCBidW5kbGUgbG9hZCBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgIHB1Ymxpc2goYnVuZGxlSWQsIHBhdGhzTm90Rm91bmQpO1xyXG4gICAgICAgICAgICAgICAgfSwgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRXhlY3V0ZSBjYWxsYmFja3Mgd2hlbiBkZXBlbmRlbmNpZXMgaGF2ZSBiZWVuIHNhdGlzZmllZC5cclxuICAgICAgICAgICAgICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gZGVwcyAtIExpc3Qgb2YgYnVuZGxlIGlkc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gYXJncyAtIHN1Y2Nlc3MvZXJyb3IgYXJndW1lbnRzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsb2FkanMucmVhZHkgPSBmdW5jdGlvbiByZWFkeShkZXBzLCBhcmdzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzdWJzY3JpYmUgdG8gYnVuZGxlIGxvYWQgZXZlbnRcclxuICAgICAgICAgICAgICAgIHN1YnNjcmliZShkZXBzLCBmdW5jdGlvbiAoZGVwc05vdEZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZSBjYWxsYmFja3NcclxuICAgICAgICAgICAgICAgICAgICBleGVjdXRlQ2FsbGJhY2tzKGFyZ3MsIGRlcHNOb3RGb3VuZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGpzO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBNYW51YWxseSBzYXRpc2Z5IGJ1bmRsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidW5kbGVJZCAtIFRoZSBidW5kbGUgaWRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGxvYWRqcy5kb25lID0gZnVuY3Rpb24gZG9uZShidW5kbGVJZCkge1xyXG4gICAgICAgICAgICAgICAgcHVibGlzaChidW5kbGVJZCwgW10pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZXNldCBsb2FkanMgZGVwZW5kZW5jaWVzIHN0YXR1c2VzXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsb2FkanMucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgICAgICAgICAgICAgIGJ1bmRsZUlkQ2FjaGUgPSB7fTtcclxuICAgICAgICAgICAgICAgIGJ1bmRsZVJlc3VsdENhY2hlID0ge307XHJcbiAgICAgICAgICAgICAgICBidW5kbGVDYWxsYmFja1F1ZXVlID0ge307XHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIERldGVybWluZSBpZiBidW5kbGUgaGFzIGFscmVhZHkgYmVlbiBkZWZpbmVkXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBTdHJpbmd9IGJ1bmRsZUlkIC0gVGhlIGJ1bmRsZSBpZFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgbG9hZGpzLmlzRGVmaW5lZCA9IGZ1bmN0aW9uIGlzRGVmaW5lZChidW5kbGVJZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1bmRsZUlkIGluIGJ1bmRsZUlkQ2FjaGU7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gZXhwb3J0XHJcbiAgICAgICAgICAgIHJldHVybiBsb2FkanM7XHJcblxyXG4gICAgICAgIH0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZFNjcmlwdCh1cmwpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBsb2FkanNfdW1kKHVybCwge1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzb2x2ZSxcclxuICAgICAgICAgICAgICAgIGVycm9yOiByZWplY3RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAvLyBQYXJzZSBWaW1lbyBJRCBmcm9tIFVSTFxyXG4gICAgZnVuY3Rpb24gcGFyc2VJZCh1cmwpIHtcclxuICAgICAgICBpZiAoaXMuZW1wdHkodXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpcy5udW1iZXIoTnVtYmVyKHVybCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVnZXggPSAvXi4qKHZpbWVvLmNvbVxcL3x2aWRlb1xcLykoXFxkKykuKi87XHJcbiAgICAgICAgcmV0dXJuIHVybC5tYXRjaChyZWdleCkgPyBSZWdFeHAuJDIgOiB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR2V0IGFzcGVjdCByYXRpbyBmb3IgZGltZW5zaW9uc1xyXG4gICAgZnVuY3Rpb24gZ2V0QXNwZWN0UmF0aW8od2lkdGgsIGhlaWdodCkge1xyXG4gICAgICAgIHZhciBnZXRSYXRpbyA9IGZ1bmN0aW9uIGdldFJhdGlvKHcsIGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGggPT09IDAgPyB3IDogZ2V0UmF0aW8oaCwgdyAlIGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHJhdGlvID0gZ2V0UmF0aW8od2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgcmV0dXJuIHdpZHRoIC8gcmF0aW8gKyAnOicgKyBoZWlnaHQgLyByYXRpbztcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgcGxheWJhY2sgc3RhdGUgYW5kIHRyaWdnZXIgY2hhbmdlIChvbmx5IG9uIGFjdHVhbCBjaGFuZ2UpXHJcbiAgICBmdW5jdGlvbiBhc3N1cmVQbGF5YmFja1N0YXRlKHBsYXkpIHtcclxuICAgICAgICBpZiAocGxheSAmJiAhdGhpcy5lbWJlZC5oYXNQbGF5ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5lbWJlZC5oYXNQbGF5ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tZWRpYS5wYXVzZWQgPT09IHBsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5tZWRpYS5wYXVzZWQgPSAhcGxheTtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwodGhpcywgdGhpcy5tZWRpYSwgcGxheSA/ICdwbGF5JyA6ICdwYXVzZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgdmltZW8gPSB7XHJcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uIHNldHVwKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGVtYmVkIGNsYXNzIGZvciByZXNwb25zaXZlXHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuZWxlbWVudHMud3JhcHBlciwgdGhpcy5jb25maWcuY2xhc3NOYW1lcy5lbWJlZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgaW50aWFsIHJhdGlvXHJcbiAgICAgICAgICAgIHZpbWVvLnNldEFzcGVjdFJhdGlvLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBMb2FkIHRoZSBBUEkgaWYgbm90IGFscmVhZHlcclxuICAgICAgICAgICAgaWYgKCFpcy5vYmplY3Qod2luZG93LlZpbWVvKSkge1xyXG4gICAgICAgICAgICAgICAgbG9hZFNjcmlwdCh0aGlzLmNvbmZpZy51cmxzLnZpbWVvLnNkaykudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmltZW8ucmVhZHkuY2FsbChfdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZWJ1Zy53YXJuKCdWaW1lbyBBUEkgZmFpbGVkIHRvIGxvYWQnLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZpbWVvLnJlYWR5LmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gU2V0IGFzcGVjdCByYXRpb1xyXG4gICAgICAgIC8vIEZvciBWaW1lbyB3ZSBoYXZlIGFuIGV4dHJhIDMwMCUgaGVpZ2h0IDxkaXY+IHRvIGhpZGUgdGhlIHN0YW5kYXJkIGNvbnRyb2xzIGFuZCBVSVxyXG4gICAgICAgIHNldEFzcGVjdFJhdGlvOiBmdW5jdGlvbiBzZXRBc3BlY3RSYXRpbyhpbnB1dCkge1xyXG4gICAgICAgICAgICB2YXIgX3NwbGl0ID0gKGlzLnN0cmluZyhpbnB1dCkgPyBpbnB1dCA6IHRoaXMuY29uZmlnLnJhdGlvKS5zcGxpdCgnOicpLFxyXG4gICAgICAgICAgICAgICAgX3NwbGl0MiA9IHNsaWNlZFRvQXJyYXkoX3NwbGl0LCAyKSxcclxuICAgICAgICAgICAgICAgIHggPSBfc3BsaXQyWzBdLFxyXG4gICAgICAgICAgICAgICAgeSA9IF9zcGxpdDJbMV07XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFkZGluZyA9IDEwMCAvIHggKiB5O1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLndyYXBwZXIuc3R5bGUucGFkZGluZ0JvdHRvbSA9IHBhZGRpbmcgKyAnJSc7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdXBwb3J0ZWQudWkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSAyNDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gKGhlaWdodCAtIHBhZGRpbmcpIC8gKGhlaWdodCAvIDUwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKC0nICsgb2Zmc2V0ICsgJyUpJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAvLyBBUEkgUmVhZHlcclxuICAgICAgICByZWFkeTogZnVuY3Rpb24gcmVhZHkkJDEoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgVmltZW8gcGFyYW1zIGZvciB0aGUgaWZyYW1lXHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgbG9vcDogcGxheWVyLmNvbmZpZy5sb29wLmFjdGl2ZSxcclxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBwbGF5ZXIuYXV0b3BsYXksXHJcbiAgICAgICAgICAgICAgICAvLyBtdXRlZDogcGxheWVyLm11dGVkLFxyXG4gICAgICAgICAgICAgICAgYnlsaW5lOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBvcnRyYWl0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IDAsXHJcbiAgICAgICAgICAgICAgICBnZXN0dXJlOiAnbWVkaWEnLFxyXG4gICAgICAgICAgICAgICAgcGxheXNpbmxpbmU6ICF0aGlzLmNvbmZpZy5mdWxsc2NyZWVuLmlvc05hdGl2ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gYnVpbGRVcmxQYXJhbXMob3B0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHNvdXJjZSBVUkwgb3IgSURcclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHBsYXllci5tZWRpYS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGZyb20gPGRpdj4gaWYgbmVlZGVkXHJcbiAgICAgICAgICAgIGlmIChpcy5lbXB0eShzb3VyY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBwbGF5ZXIubWVkaWEuZ2V0QXR0cmlidXRlKHBsYXllci5jb25maWcuYXR0cmlidXRlcy5lbWJlZC5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBpZCA9IHBhcnNlSWQoc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIGFuIGlmcmFtZVxyXG4gICAgICAgICAgICB2YXIgaWZyYW1lID0gY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSBmb3JtYXQocGxheWVyLmNvbmZpZy51cmxzLnZpbWVvLmlmcmFtZSwgaWQsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XHJcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93ZnVsbHNjcmVlbicsICcnKTtcclxuICAgICAgICAgICAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnYWxsb3d0cmFuc3BhcmVuY3knLCAnJyk7XHJcbiAgICAgICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoJ2FsbG93JywgJ2F1dG9wbGF5Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgcG9zdGVyLCBpZiBhbHJlYWR5IHNldFxyXG4gICAgICAgICAgICB2YXIgcG9zdGVyID0gcGxheWVyLnBvc3RlcjtcclxuXHJcbiAgICAgICAgICAgIC8vIEluamVjdCB0aGUgcGFja2FnZVxyXG5cclxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7IHBvc3RlcjogcG9zdGVyLCBjbGFzczogcGxheWVyLmNvbmZpZy5jbGFzc05hbWVzLmVtYmVkQ29udGFpbmVyIH0pO1xyXG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcbiAgICAgICAgICAgIHBsYXllci5tZWRpYSA9IHJlcGxhY2VFbGVtZW50KHdyYXBwZXIsIHBsYXllci5tZWRpYSk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgcG9zdGVyIGltYWdlXHJcbiAgICAgICAgICAgIGZldGNoKGZvcm1hdChwbGF5ZXIuY29uZmlnLnVybHMudmltZW8uYXBpLCBpZCksICdqc29uJykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpcy5lbXB0eShyZXNwb25zZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBVUkwgZm9yIHRodW1ibmFpbFxyXG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IG5ldyBVUkwocmVzcG9uc2VbMF0udGh1bWJuYWlsX2xhcmdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgb3JpZ2luYWwgaW1hZ2VcclxuICAgICAgICAgICAgICAgIHVybC5wYXRobmFtZSA9IHVybC5wYXRobmFtZS5zcGxpdCgnXycpWzBdICsgJy5qcGcnO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBhbmQgc2hvdyBwb3N0ZXJcclxuICAgICAgICAgICAgICAgIHVpLnNldFBvc3Rlci5jYWxsKHBsYXllciwgdXJsLmhyZWYpLmNhdGNoKGZ1bmN0aW9uICgpIHsgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgaW5zdGFuY2VcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpbWVvL3BsYXllci5qc1xyXG4gICAgICAgICAgICBwbGF5ZXIuZW1iZWQgPSBuZXcgd2luZG93LlZpbWVvLlBsYXllcihpZnJhbWUsIHtcclxuICAgICAgICAgICAgICAgIGF1dG9wYXVzZTogcGxheWVyLmNvbmZpZy5hdXRvcGF1c2UsXHJcbiAgICAgICAgICAgICAgICBtdXRlZDogcGxheWVyLm11dGVkXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGxheWVyLm1lZGlhLnBhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHBsYXllci5tZWRpYS5jdXJyZW50VGltZSA9IDA7XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIG5hdGl2ZSB0ZXh0IHRyYWNrIHJlbmRlcmluZ1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLnN1cHBvcnRlZC51aSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmVtYmVkLmRpc2FibGVUZXh0VHJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZmF1eCBIVE1MNSBBUEkgdXNpbmcgdGhlIFZpbWVvIEFQSVxyXG4gICAgICAgICAgICBwbGF5ZXIubWVkaWEucGxheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGFzc3VyZVBsYXliYWNrU3RhdGUuY2FsbChwbGF5ZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllci5lbWJlZC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXIubWVkaWEucGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhc3N1cmVQbGF5YmFja1N0YXRlLmNhbGwocGxheWVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyLmVtYmVkLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXIubWVkaWEuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNlZWtpbmdcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gcGxheWVyLm1lZGlhLmN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBsYXllci5tZWRpYSwgJ2N1cnJlbnRUaW1lJywge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWaW1lbyB3aWxsIGF1dG9tYXRpY2FsbHkgcGxheSBvbiBzZWVrIGlmIHRoZSB2aWRlbyBoYXNuJ3QgYmVlbiBwbGF5ZWQgYmVmb3JlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBjdXJyZW50IHBhdXNlZCBzdGF0ZSBhbmQgdm9sdW1lIGV0Y1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbWJlZCA9IHBsYXllci5lbWJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWEgPSBwbGF5ZXIubWVkaWEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdXNlZCA9IHBsYXllci5wYXVzZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvbHVtZSA9IHBsYXllci52b2x1bWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN0b3JlUGF1c2UgPSBwYXVzZWQgJiYgIWVtYmVkLmhhc1BsYXllZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHNlZWtpbmcgc3RhdGUgYW5kIHRyaWdnZXIgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICBtZWRpYS5zZWVraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIG1lZGlhLCAnc2Vla2luZycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBwYXVzZWQsIG11dGUgdW50aWwgc2VlayBpcyBjb21wbGV0ZVxyXG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZShyZXN0b3JlUGF1c2UgJiYgZW1iZWQuc2V0Vm9sdW1lKDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZWVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbWJlZC5zZXRDdXJyZW50VGltZSh0aW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBwYXVzZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3RvcmVQYXVzZSAmJiBlbWJlZC5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHZvbHVtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdG9yZVBhdXNlICYmIGVtYmVkLnNldFZvbHVtZSh2b2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBsYXliYWNrIHNwZWVkXHJcbiAgICAgICAgICAgIHZhciBzcGVlZCA9IHBsYXllci5jb25maWcuc3BlZWQuc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwbGF5ZXIubWVkaWEsICdwbGF5YmFja1JhdGUnLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3BlZWQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZW1iZWQuc2V0UGxheWJhY2tSYXRlKGlucHV0KS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQgPSBpbnB1dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwocGxheWVyLCBwbGF5ZXIubWVkaWEsICdyYXRlY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhpZGUgbWVudSBpdGVtIChhbmQgbWVudSBpZiBlbXB0eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUgPT09ICdFcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzLnNldFNwZWVkTWVudS5jYWxsKHBsYXllciwgW10pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gVm9sdW1lXHJcbiAgICAgICAgICAgIHZhciB2b2x1bWUgPSBwbGF5ZXIuY29uZmlnLnZvbHVtZTtcclxuXHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwbGF5ZXIubWVkaWEsICd2b2x1bWUnLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm9sdW1lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmVtYmVkLnNldFZvbHVtZShpbnB1dCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvbHVtZSA9IGlucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ3ZvbHVtZWNoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIE11dGVkXHJcbiAgICAgICAgICAgIHZhciBtdXRlZCA9IHBsYXllci5jb25maWcubXV0ZWQ7XHJcblxyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGxheWVyLm1lZGlhLCAnbXV0ZWQnLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXV0ZWQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gaXMuYm9vbGVhbihpbnB1dCkgPyBpbnB1dCA6IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZW1iZWQuc2V0Vm9sdW1lKHRvZ2dsZSA/IDAgOiBwbGF5ZXIuY29uZmlnLnZvbHVtZSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGVkID0gdG9nZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ3ZvbHVtZWNoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIExvb3BcclxuICAgICAgICAgICAgdmFyIGxvb3AgPSBwbGF5ZXIuY29uZmlnLmxvb3A7XHJcblxyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGxheWVyLm1lZGlhLCAnbG9vcCcsIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb29wO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvZ2dsZSA9IGlzLmJvb2xlYW4oaW5wdXQpID8gaW5wdXQgOiBwbGF5ZXIuY29uZmlnLmxvb3AuYWN0aXZlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZW1iZWQuc2V0TG9vcCh0b2dnbGUpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb29wID0gdG9nZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNvdXJjZVxyXG4gICAgICAgICAgICB2YXIgY3VycmVudFNyYyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcGxheWVyLmVtYmVkLmdldFZpZGVvVXJsKCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRTcmMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpczIuZGVidWcud2FybihlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBsYXllci5tZWRpYSwgJ2N1cnJlbnRTcmMnLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFNyYztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBFbmRlZFxyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGxheWVyLm1lZGlhLCAnZW5kZWQnLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyLmN1cnJlbnRUaW1lID09PSBwbGF5ZXIuZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IGFzcGVjdCByYXRpbyBiYXNlZCBvbiB2aWRlbyBzaXplXHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFtwbGF5ZXIuZW1iZWQuZ2V0VmlkZW9XaWR0aCgpLCBwbGF5ZXIuZW1iZWQuZ2V0VmlkZW9IZWlnaHQoKV0pLnRoZW4oZnVuY3Rpb24gKGRpbWVuc2lvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciByYXRpbyA9IGdldEFzcGVjdFJhdGlvKGRpbWVuc2lvbnNbMF0sIGRpbWVuc2lvbnNbMV0pO1xyXG4gICAgICAgICAgICAgICAgdmltZW8uc2V0QXNwZWN0UmF0aW8uY2FsbChfdGhpczIsIHJhdGlvKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgYXV0b3BhdXNlXHJcbiAgICAgICAgICAgIHBsYXllci5lbWJlZC5zZXRBdXRvcGF1c2UocGxheWVyLmNvbmZpZy5hdXRvcGF1c2UpLnRoZW4oZnVuY3Rpb24gKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuY29uZmlnLmF1dG9wYXVzZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aXRsZVxyXG4gICAgICAgICAgICBwbGF5ZXIuZW1iZWQuZ2V0VmlkZW9UaXRsZSgpLnRoZW4oZnVuY3Rpb24gKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuY29uZmlnLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgICAgICAgICB1aS5zZXRUaXRsZS5jYWxsKF90aGlzMik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGN1cnJlbnQgdGltZVxyXG4gICAgICAgICAgICBwbGF5ZXIuZW1iZWQuZ2V0Q3VycmVudFRpbWUoKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAndGltZXVwZGF0ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCBkdXJhdGlvblxyXG4gICAgICAgICAgICBwbGF5ZXIuZW1iZWQuZ2V0RHVyYXRpb24oKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLm1lZGlhLmR1cmF0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ2R1cmF0aW9uY2hhbmdlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGNhcHRpb25zXHJcbiAgICAgICAgICAgIHBsYXllci5lbWJlZC5nZXRUZXh0VHJhY2tzKCkudGhlbihmdW5jdGlvbiAodHJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIubWVkaWEudGV4dFRyYWNrcyA9IHRyYWNrcztcclxuICAgICAgICAgICAgICAgIGNhcHRpb25zLnNldHVwLmNhbGwocGxheWVyKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXIuZW1iZWQub24oJ2N1ZWNoYW5nZScsIGZ1bmN0aW9uIChfcmVmKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3JlZiRjdWVzID0gX3JlZi5jdWVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1ZXMgPSBfcmVmJGN1ZXMgPT09IHVuZGVmaW5lZCA/IFtdIDogX3JlZiRjdWVzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzdHJpcHBlZEN1ZXMgPSBjdWVzLm1hcChmdW5jdGlvbiAoY3VlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cmlwSFRNTChjdWUudGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25zLnVwZGF0ZUN1ZXMuY2FsbChwbGF5ZXIsIHN0cmlwcGVkQ3Vlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGxheWVyLmVtYmVkLm9uKCdsb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBc3N1cmUgc3RhdGUgYW5kIGV2ZW50cyBhcmUgdXBkYXRlZCBvbiBhdXRvcGxheVxyXG4gICAgICAgICAgICAgICAgcGxheWVyLmVtYmVkLmdldFBhdXNlZCgpLnRoZW4oZnVuY3Rpb24gKHBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc3VyZVBsYXliYWNrU3RhdGUuY2FsbChwbGF5ZXIsICFwYXVzZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAncGxheWluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpcy5lbGVtZW50KHBsYXllci5lbWJlZC5lbGVtZW50KSAmJiBwbGF5ZXIuc3VwcG9ydGVkLnVpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZyYW1lID0gcGxheWVyLmVtYmVkLmVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpeCBrZXlib2FyZCBmb2N1cyBpc3N1ZXNcclxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc2FtcG90dHMvcGx5ci9pc3N1ZXMvMzE3XHJcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXIuZW1iZWQub24oJ3BsYXknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhc3N1cmVQbGF5YmFja1N0YXRlLmNhbGwocGxheWVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAncGxheWluZycpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllci5lbWJlZC5vbigncGF1c2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhc3N1cmVQbGF5YmFja1N0YXRlLmNhbGwocGxheWVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGxheWVyLmVtYmVkLm9uKCd0aW1ldXBkYXRlJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5zZWVraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50VGltZSA9IGRhdGEuc2Vjb25kcztcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAndGltZXVwZGF0ZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllci5lbWJlZC5vbigncHJvZ3Jlc3MnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLm1lZGlhLmJ1ZmZlcmVkID0gZGF0YS5wZXJjZW50O1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwocGxheWVyLCBwbGF5ZXIubWVkaWEsICdwcm9ncmVzcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGFsbCBsb2FkZWRcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChkYXRhLnBlcmNlbnQsIDEwKSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAnY2FucGxheXRocm91Z2gnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgZHVyYXRpb24gYXMgaWYgd2UgZG8gaXQgYmVmb3JlIGxvYWQsIGl0IGdpdmVzIGFuIGluY29ycmVjdCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3NhbXBvdHRzL3BseXIvaXNzdWVzLzg5MVxyXG4gICAgICAgICAgICAgICAgcGxheWVyLmVtYmVkLmdldER1cmF0aW9uKCkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHBsYXllci5tZWRpYS5kdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubWVkaWEuZHVyYXRpb24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwocGxheWVyLCBwbGF5ZXIubWVkaWEsICdkdXJhdGlvbmNoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllci5lbWJlZC5vbignc2Vla2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLm1lZGlhLnNlZWtpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAnc2Vla2VkJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcGxheWVyLmVtYmVkLm9uKCdlbmRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5wYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwocGxheWVyLCBwbGF5ZXIubWVkaWEsICdlbmRlZCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHBsYXllci5lbWJlZC5vbignZXJyb3InLCBmdW5jdGlvbiAoZGV0YWlsKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIubWVkaWEuZXJyb3IgPSBkZXRhaWw7XHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ2Vycm9yJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVidWlsZCBVSVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1aS5idWlsZC5jYWxsKHBsYXllcik7XHJcbiAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICAvLyBQYXJzZSBZb3VUdWJlIElEIGZyb20gVVJMXHJcbiAgICBmdW5jdGlvbiBwYXJzZUlkJDEodXJsKSB7XHJcbiAgICAgICAgaWYgKGlzLmVtcHR5KHVybCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVnZXggPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fCZ2PSkoW14jJj9dKikuKi87XHJcbiAgICAgICAgcmV0dXJuIHVybC5tYXRjaChyZWdleCkgPyBSZWdFeHAuJDIgOiB1cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3RhbmRhcmRpc2UgWW91VHViZSBxdWFsaXR5IHVuaXRcclxuICAgIGZ1bmN0aW9uIG1hcFF1YWxpdHlVbml0KGlucHV0KSB7XHJcbiAgICAgICAgdmFyIHF1YWxpdGllcyA9IHtcclxuICAgICAgICAgICAgaGQyMTYwOiAyMTYwLFxyXG4gICAgICAgICAgICBoZDE0NDA6IDE0NDAsXHJcbiAgICAgICAgICAgIGhkMTA4MDogMTA4MCxcclxuICAgICAgICAgICAgaGQ3MjA6IDcyMCxcclxuICAgICAgICAgICAgbGFyZ2U6IDQ4MCxcclxuICAgICAgICAgICAgbWVkaXVtOiAzNjAsXHJcbiAgICAgICAgICAgIHNtYWxsOiAyNDAsXHJcbiAgICAgICAgICAgIHRpbnk6IDE0NFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBlbnRyeSA9IE9iamVjdC5lbnRyaWVzKHF1YWxpdGllcykuZmluZChmdW5jdGlvbiAoZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5LmluY2x1ZGVzKGlucHV0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGVudHJ5KSB7XHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgbWF0Y2ggY29ycmVzcG9uZGluZyB0byB0aGUgaW5wdXRcclxuICAgICAgICAgICAgcmV0dXJuIGVudHJ5LmZpbmQoZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IGlucHV0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAnZGVmYXVsdCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWFwUXVhbGl0eVVuaXRzKGxldmVscykge1xyXG4gICAgICAgIGlmIChpcy5lbXB0eShsZXZlbHMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsZXZlbHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGVkdXBlKGxldmVscy5tYXAoZnVuY3Rpb24gKGxldmVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXBRdWFsaXR5VW5pdChsZXZlbCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBwbGF5YmFjayBzdGF0ZSBhbmQgdHJpZ2dlciBjaGFuZ2UgKG9ubHkgb24gYWN0dWFsIGNoYW5nZSlcclxuICAgIGZ1bmN0aW9uIGFzc3VyZVBsYXliYWNrU3RhdGUkMShwbGF5KSB7XHJcbiAgICAgICAgaWYgKHBsYXkgJiYgIXRoaXMuZW1iZWQuaGFzUGxheWVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1iZWQuaGFzUGxheWVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubWVkaWEucGF1c2VkID09PSBwbGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVkaWEucGF1c2VkID0gIXBsYXk7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHRoaXMsIHRoaXMubWVkaWEsIHBsYXkgPyAncGxheScgOiAncGF1c2UnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHlvdXR1YmUgPSB7XHJcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uIHNldHVwKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIGVtYmVkIGNsYXNzIGZvciByZXNwb25zaXZlXHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuZWxlbWVudHMud3JhcHBlciwgdGhpcy5jb25maWcuY2xhc3NOYW1lcy5lbWJlZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgYXNwZWN0IHJhdGlvXHJcbiAgICAgICAgICAgIHlvdXR1YmUuc2V0QXNwZWN0UmF0aW8uY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldHVwIEFQSVxyXG4gICAgICAgICAgICBpZiAoaXMub2JqZWN0KHdpbmRvdy5ZVCkgJiYgaXMuZnVuY3Rpb24od2luZG93LllULlBsYXllcikpIHtcclxuICAgICAgICAgICAgICAgIHlvdXR1YmUucmVhZHkuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIExvYWQgdGhlIEFQSVxyXG4gICAgICAgICAgICAgICAgbG9hZFNjcmlwdCh0aGlzLmNvbmZpZy51cmxzLnlvdXR1YmUuc2RrKS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZWJ1Zy53YXJuKCdZb3VUdWJlIEFQSSBmYWlsZWQgdG8gbG9hZCcsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldHVwIGNhbGxiYWNrIGZvciB0aGUgQVBJXHJcbiAgICAgICAgICAgICAgICAvLyBZb3VUdWJlIGhhcyBpdCdzIG93biBzeXN0ZW0gb2YgY291cnNlLi4uXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub25Zb3VUdWJlUmVhZHlDYWxsYmFja3MgPSB3aW5kb3cub25Zb3VUdWJlUmVhZHlDYWxsYmFja3MgfHwgW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIHRvIHF1ZXVlXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub25Zb3VUdWJlUmVhZHlDYWxsYmFja3MucHVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeW91dHViZS5yZWFkeS5jYWxsKF90aGlzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBjYWxsYmFjayB0byBwcm9jZXNzIHF1ZXVlXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9uWW91VHViZVJlYWR5Q2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgbWVkaWEgdGl0bGVcclxuICAgICAgICBnZXRUaXRsZTogZnVuY3Rpb24gZ2V0VGl0bGUodmlkZW9JZCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIFRyeSB2aWEgdW5kb2N1bWVudGVkIEFQSSBtZXRob2QgZmlyc3RcclxuICAgICAgICAgICAgLy8gVGhpcyBtZXRob2QgZGlzYXBwZWFycyBub3cgYW5kIHRoZW4gdGhvdWdoLi4uXHJcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zYW1wb3R0cy9wbHlyL2lzc3Vlcy83MDlcclxuICAgICAgICAgICAgaWYgKGlzLmZ1bmN0aW9uKHRoaXMuZW1iZWQuZ2V0VmlkZW9EYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9lbWJlZCRnZXRWaWRlb0RhdGEgPSB0aGlzLmVtYmVkLmdldFZpZGVvRGF0YSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlID0gX2VtYmVkJGdldFZpZGVvRGF0YS50aXRsZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXMuZW1wdHkodGl0bGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICB1aS5zZXRUaXRsZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gT3IgdmlhIEdvb2dsZSBBUElcclxuICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuY29uZmlnLmtleXMuZ29vZ2xlO1xyXG4gICAgICAgICAgICBpZiAoaXMuc3RyaW5nKGtleSkgJiYgIWlzLmVtcHR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBmb3JtYXQodGhpcy5jb25maWcudXJscy55b3V0dWJlLmFwaSwgdmlkZW9JZCwga2V5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmZXRjaCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpcy5vYmplY3QocmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuY29uZmlnLnRpdGxlID0gcmVzdWx0Lml0ZW1zWzBdLnNuaXBwZXQudGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpLnNldFRpdGxlLmNhbGwoX3RoaXMyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7IH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgIC8vIFNldCBhc3BlY3QgcmF0aW9cclxuICAgICAgICBzZXRBc3BlY3RSYXRpbzogZnVuY3Rpb24gc2V0QXNwZWN0UmF0aW8oKSB7XHJcbiAgICAgICAgICAgIHZhciByYXRpbyA9IHRoaXMuY29uZmlnLnJhdGlvLnNwbGl0KCc6Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMud3JhcHBlci5zdHlsZS5wYWRkaW5nQm90dG9tID0gMTAwIC8gcmF0aW9bMF0gKiByYXRpb1sxXSArICclJztcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gQVBJIHJlYWR5XHJcbiAgICAgICAgcmVhZHk6IGZ1bmN0aW9uIHJlYWR5JCQxKCkge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIElnbm9yZSBhbHJlYWR5IHNldHVwIChyYWNlIGNvbmRpdGlvbilcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRJZCA9IHBsYXllci5tZWRpYS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgICAgIGlmICghaXMuZW1wdHkoY3VycmVudElkKSAmJiBjdXJyZW50SWQuc3RhcnRzV2l0aCgneW91dHViZS0nKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlIHNvdXJjZSBVUkwgb3IgSURcclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IHBsYXllci5tZWRpYS5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IGZyb20gPGRpdj4gaWYgbmVlZGVkXHJcbiAgICAgICAgICAgIGlmIChpcy5lbXB0eShzb3VyY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBwbGF5ZXIubWVkaWEuZ2V0QXR0cmlidXRlKHRoaXMuY29uZmlnLmF0dHJpYnV0ZXMuZW1iZWQuaWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZSA8aWZyYW1lPiB3aXRoIGEgPGRpdj4gZHVlIHRvIFlvdVR1YmUgQVBJIGlzc3Vlc1xyXG4gICAgICAgICAgICB2YXIgdmlkZW9JZCA9IHBhcnNlSWQkMShzb3VyY2UpO1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBnZW5lcmF0ZUlkKHBsYXllci5wcm92aWRlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgcG9zdGVyLCBpZiBhbHJlYWR5IHNldFxyXG4gICAgICAgICAgICB2YXIgcG9zdGVyID0gcGxheWVyLnBvc3RlcjtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgbWVkaWEgZWxlbWVudFxyXG5cclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHsgaWQ6IGlkLCBwb3N0ZXI6IHBvc3RlciB9KTtcclxuICAgICAgICAgICAgcGxheWVyLm1lZGlhID0gcmVwbGFjZUVsZW1lbnQoY29udGFpbmVyLCBwbGF5ZXIubWVkaWEpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWQgdG8gcG9zdGVyIHdyYXBwZXJcclxuICAgICAgICAgICAgdmFyIHBvc3RlclNyYyA9IGZ1bmN0aW9uIHBvc3RlclNyYyhmb3JtYXQkJDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJyArIHZpZGVvSWQgKyAnLycgKyBmb3JtYXQkJDEgKyAnZGVmYXVsdC5qcGcnO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGh1bWJuYWlsIGltYWdlcyBpbiBvcmRlciBvZiBxdWFsaXR5LCBidXQgcmVqZWN0IGZhbGxiYWNrIHRodW1ibmFpbHMgKDEyMHB4IHdpZGUpXHJcbiAgICAgICAgICAgIGxvYWRJbWFnZShwb3N0ZXJTcmMoJ21heHJlcycpLCAxMjEpIC8vIEhpZ2VzdCBxdWFsaXR5IGFuZCB1bnBhZGRlZFxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9hZEltYWdlKHBvc3RlclNyYygnc2QnKSwgMTIxKTtcclxuICAgICAgICAgICAgICAgIH0pIC8vIDQ4MHAgcGFkZGVkIDQ6M1xyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbG9hZEltYWdlKHBvc3RlclNyYygnaHEnKSk7XHJcbiAgICAgICAgICAgICAgICB9KSAvLyAzNjBwIHBhZGRlZCA0OjMuIEFsd2F5cyBleGlzdHNcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1aS5zZXRQb3N0ZXIuY2FsbChwbGF5ZXIsIGltYWdlLnNyYyk7XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChwb3N0ZXJTcmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgaW1hZ2UgaXMgcGFkZGVkLCB1c2UgYmFja2dyb3VuZC1zaXplIFwiY292ZXJcIiBpbnN0ZWFkIChsaWtlIHlvdXR1YmUgZG9lcyB0b28gd2l0aCB0aGVpciBwb3N0ZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcG9zdGVyU3JjLmluY2x1ZGVzKCdtYXhyZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZWxlbWVudHMucG9zdGVyLnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2NvdmVyJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7IH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgaW5zdGFuY2VcclxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20veW91dHViZS9pZnJhbWVfYXBpX3JlZmVyZW5jZVxyXG4gICAgICAgICAgICBwbGF5ZXIuZW1iZWQgPSBuZXcgd2luZG93LllULlBsYXllcihpZCwge1xyXG4gICAgICAgICAgICAgICAgdmlkZW9JZDogdmlkZW9JZCxcclxuICAgICAgICAgICAgICAgIHBsYXllclZhcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheTogcGxheWVyLmNvbmZpZy5hdXRvcGxheSA/IDEgOiAwLCAvLyBBdXRvcGxheVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xzOiBwbGF5ZXIuc3VwcG9ydGVkLnVpID8gMCA6IDEsIC8vIE9ubHkgc2hvdyBjb250cm9scyBpZiBub3QgZnVsbHkgc3VwcG9ydGVkXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsOiAwLCAvLyBObyByZWxhdGVkIHZpZHNcclxuICAgICAgICAgICAgICAgICAgICBzaG93aW5mbzogMCwgLy8gSGlkZSBpbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgaXZfbG9hZF9wb2xpY3k6IDMsIC8vIEhpZGUgYW5ub3RhdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICBtb2Rlc3RicmFuZGluZzogMSwgLy8gSGlkZSBsb2dvcyBhcyBtdWNoIGFzIHBvc3NpYmxlICh0aGV5IHN0aWxsIHNob3cgb25lIGluIHRoZSBjb3JuZXIgd2hlbiBwYXVzZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWtiOiAxLCAvLyBEaXNhYmxlIGtleWJvYXJkIGFzIHdlIGhhbmRsZSBpdFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlzaW5saW5lOiAxLCAvLyBBbGxvdyBpT1MgaW5saW5lIHBsYXliYWNrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyYWNraW5nIGZvciBzdGF0c1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9yaWdpbjogd2luZG93ID8gYCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH1gIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXRfcmVmZXJyZXI6IHdpbmRvdyA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmIDogbnVsbCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FwdGlvbnMgYXJlIGZsYWt5IG9uIFlvdVR1YmVcclxuICAgICAgICAgICAgICAgICAgICBjY19sb2FkX3BvbGljeTogcGxheWVyLmNhcHRpb25zLmFjdGl2ZSA/IDEgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjX2xhbmdfcHJlZjogcGxheWVyLmNvbmZpZy5jYXB0aW9ucy5sYW5ndWFnZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3I6IGZ1bmN0aW9uIG9uRXJyb3IoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWW91VHViZSBtYXkgZmlyZSBvbkVycm9yIHR3aWNlLCBzbyBvbmx5IGhhbmRsZSBpdCBvbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGxheWVyLm1lZGlhLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29kZSA9IGV2ZW50LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNZXNzYWdlcyBjb3BpZWQgZnJvbSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI29uRXJyb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6ICdUaGUgcmVxdWVzdCBjb250YWlucyBhbiBpbnZhbGlkIHBhcmFtZXRlciB2YWx1ZS4gRm9yIGV4YW1wbGUsIHRoaXMgZXJyb3Igb2NjdXJzIGlmIHlvdSBzcGVjaWZ5IGEgdmlkZW8gSUQgdGhhdCBkb2VzIG5vdCBoYXZlIDExIGNoYXJhY3RlcnMsIG9yIGlmIHRoZSB2aWRlbyBJRCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMsIHN1Y2ggYXMgZXhjbGFtYXRpb24gcG9pbnRzIG9yIGFzdGVyaXNrcy4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDU6ICdUaGUgcmVxdWVzdGVkIGNvbnRlbnQgY2Fubm90IGJlIHBsYXllZCBpbiBhbiBIVE1MNSBwbGF5ZXIgb3IgYW5vdGhlciBlcnJvciByZWxhdGVkIHRvIHRoZSBIVE1MNSBwbGF5ZXIgaGFzIG9jY3VycmVkLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAwOiAnVGhlIHZpZGVvIHJlcXVlc3RlZCB3YXMgbm90IGZvdW5kLiBUaGlzIGVycm9yIG9jY3VycyB3aGVuIGEgdmlkZW8gaGFzIGJlZW4gcmVtb3ZlZCAoZm9yIGFueSByZWFzb24pIG9yIGhhcyBiZWVuIG1hcmtlZCBhcyBwcml2YXRlLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTAxOiAnVGhlIG93bmVyIG9mIHRoZSByZXF1ZXN0ZWQgdmlkZW8gZG9lcyBub3QgYWxsb3cgaXQgdG8gYmUgcGxheWVkIGluIGVtYmVkZGVkIHBsYXllcnMuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxNTA6ICdUaGUgb3duZXIgb2YgdGhlIHJlcXVlc3RlZCB2aWRlbyBkb2VzIG5vdCBhbGxvdyBpdCB0byBiZSBwbGF5ZWQgaW4gZW1iZWRkZWQgcGxheWVycy4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9W2NvZGVdIHx8ICdBbiB1bmtub3duIGVycm9yIG9jY3VyZWQnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5lcnJvciA9IHsgY29kZTogY29kZSwgbWVzc2FnZTogbWVzc2FnZSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAnZXJyb3InKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25QbGF5YmFja1F1YWxpdHlDaGFuZ2U6IGZ1bmN0aW9uIG9uUGxheWJhY2tRdWFsaXR5Q2hhbmdlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ3F1YWxpdHljaGFuZ2UnLCBmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eTogcGxheWVyLm1lZGlhLnF1YWxpdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvblBsYXliYWNrUmF0ZUNoYW5nZTogZnVuY3Rpb24gb25QbGF5YmFja1JhdGVDaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgY3VycmVudCBzcGVlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubWVkaWEucGxheWJhY2tSYXRlID0gaW5zdGFuY2UuZ2V0UGxheWJhY2tSYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ3JhdGVjaGFuZ2UnKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uIG9uUmVhZHkoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBldmVudC50YXJnZXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlvdXR1YmUuZ2V0VGl0bGUuY2FsbChwbGF5ZXIsIHZpZGVvSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZmF1eCBIVE1MNSBBUEkgdXNpbmcgdGhlIFlvdVR1YmUgQVBJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5wbGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzdXJlUGxheWJhY2tTdGF0ZSQxLmNhbGwocGxheWVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnBsYXlWaWRlbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm1lZGlhLnBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzdXJlUGxheWJhY2tTdGF0ZSQxLmNhbGwocGxheWVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5wYXVzZVZpZGVvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubWVkaWEuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnN0b3BWaWRlbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm1lZGlhLmR1cmF0aW9uID0gaW5zdGFuY2UuZ2V0RHVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm1lZGlhLnBhdXNlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZWVraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwbGF5ZXIubWVkaWEsICdjdXJyZW50VGltZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIoaW5zdGFuY2UuZ2V0Q3VycmVudFRpbWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHBhdXNlZCBhbmQgbmV2ZXIgcGxheWVkLCBtdXRlIGF1ZGlvIHByZXZlbnRpdmVseSAoWW91VHViZSBzdGFydHMgcGxheWluZyBvbiBzZWVrIGlmIHRoZSB2aWRlbyBoYXNuJ3QgYmVlbiBwbGF5ZWQgeWV0KS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLnBhdXNlZCAmJiAhcGxheWVyLmVtYmVkLmhhc1BsYXllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuZW1iZWQubXV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHNlZWtpbmcgc3RhdGUgYW5kIHRyaWdnZXIgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubWVkaWEuc2Vla2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwocGxheWVyLCBwbGF5ZXIubWVkaWEsICdzZWVraW5nJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlZWsgYWZ0ZXIgZXZlbnRzIHNlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5zZWVrVG8odGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGxheWJhY2sgc3BlZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBsYXllci5tZWRpYSwgJ3BsYXliYWNrUmF0ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZS5nZXRQbGF5YmFja1JhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNldFBsYXliYWNrUmF0ZShpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUXVhbGl0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGxheWVyLm1lZGlhLCAncXVhbGl0eScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXBRdWFsaXR5VW5pdChpbnN0YW5jZS5nZXRQbGF5YmFja1F1YWxpdHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5zZXRQbGF5YmFja1F1YWxpdHkobWFwUXVhbGl0eVVuaXQoaW5wdXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWb2x1bWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZvbHVtZSA9IHBsYXllci5jb25maWcudm9sdW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBsYXllci5tZWRpYSwgJ3ZvbHVtZScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2b2x1bWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2b2x1bWUgPSBpbnB1dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5zZXRWb2x1bWUodm9sdW1lICogMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ3ZvbHVtZWNoYW5nZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE11dGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtdXRlZCA9IHBsYXllci5jb25maWcubXV0ZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGxheWVyLm1lZGlhLCAnbXV0ZWQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXV0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gaXMuYm9vbGVhbihpbnB1dCkgPyBpbnB1dCA6IG11dGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11dGVkID0gdG9nZ2xlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlW3RvZ2dsZSA/ICdtdXRlJyA6ICd1bk11dGUnXSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAndm9sdW1lY2hhbmdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwbGF5ZXIubWVkaWEsICdjdXJyZW50U3JjJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlLmdldFZpZGVvVXJsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRW5kZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBsYXllci5tZWRpYSwgJ2VuZGVkJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllci5jdXJyZW50VGltZSA9PT0gcGxheWVyLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCBhdmFpbGFibGUgc3BlZWRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5vcHRpb25zLnNwZWVkID0gaW5zdGFuY2UuZ2V0QXZhaWxhYmxlUGxheWJhY2tSYXRlcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSB0YWJpbmRleCB0byBhdm9pZCBmb2N1cyBlbnRlcmluZyBpZnJhbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5zdXBwb3J0ZWQudWkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ3RpbWV1cGRhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwocGxheWVyLCBwbGF5ZXIubWVkaWEsICdkdXJhdGlvbmNoYW5nZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgdGltZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwbGF5ZXIudGltZXJzLmJ1ZmZlcmluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXR1cCBidWZmZXJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLnRpbWVycy5idWZmZXJpbmcgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgbG9hZGVkICUgZnJvbSBZb3VUdWJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIubWVkaWEuYnVmZmVyZWQgPSBpbnN0YW5jZS5nZXRWaWRlb0xvYWRlZEZyYWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBwcm9ncmVzcyBvbmx5IHdoZW4gd2UgYWN0dWFsbHkgYnVmZmVyIHNvbWV0aGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5tZWRpYS5sYXN0QnVmZmVyZWQgPT09IG51bGwgfHwgcGxheWVyLm1lZGlhLmxhc3RCdWZmZXJlZCA8IHBsYXllci5tZWRpYS5idWZmZXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAncHJvZ3Jlc3MnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgbGFzdCBidWZmZXIgcG9pbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5sYXN0QnVmZmVyZWQgPSBwbGF5ZXIubWVkaWEuYnVmZmVyZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmFpbCBpZiB3ZSdyZSBhdCAxMDAlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLm1lZGlhLmJ1ZmZlcmVkID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwbGF5ZXIudGltZXJzLmJ1ZmZlcmluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ2NhbnBsYXl0aHJvdWdoJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWJ1aWxkIFVJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVpLmJ1aWxkLmNhbGwocGxheWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb25TdGF0ZUNoYW5nZTogZnVuY3Rpb24gb25TdGF0ZUNoYW5nZShldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IHRpbWVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocGxheWVyLnRpbWVycy5wbGF5aW5nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWVrZWQgPSBwbGF5ZXIubWVkaWEuc2Vla2luZyAmJiBbMSwgMl0uaW5jbHVkZXMoZXZlbnQuZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Vla2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbnNldCBzZWVraW5nIGFuZCBmaXJlIHNlZWtlZCBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm1lZGlhLnNlZWtpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAnc2Vla2VkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBldmVudHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLTEgICBVbnN0YXJ0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMCAgICBFbmRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxICAgIFBsYXlpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMiAgICBQYXVzZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMyAgICBCdWZmZXJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gNSAgICBWaWRlbyBjdWVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAtMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgc2NydWJiZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ3RpbWV1cGRhdGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGxvYWRlZCAlIGZyb20gWW91VHViZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5idWZmZXJlZCA9IGluc3RhbmNlLmdldFZpZGVvTG9hZGVkRnJhY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ3Byb2dyZXNzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3N1cmVQbGF5YmFja1N0YXRlJDEuY2FsbChwbGF5ZXIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWW91VHViZSBkb2Vzbid0IHN1cHBvcnQgbG9vcCBmb3IgYSBzaW5nbGUgdmlkZW8sIHNvIG1pbWljayBpdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyLm1lZGlhLmxvb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWW91VHViZSBuZWVkcyBhIGNhbGwgdG8gYHN0b3BWaWRlb2AgYmVmb3JlIHBsYXlpbmcgYWdhaW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2Uuc3RvcFZpZGVvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnBsYXlWaWRlbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAnZW5kZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHBhdXNlZCBzdGF0ZSAoWW91VHViZSBzdGFydHMgcGxheWluZyBvbiBzZWVrIGlmIHRoZSB2aWRlbyBoYXNuJ3QgYmVlbiBwbGF5ZWQgeWV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIubWVkaWEucGF1c2VkICYmICFwbGF5ZXIuZW1iZWQuaGFzUGxheWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5tZWRpYS5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc3VyZVBsYXliYWNrU3RhdGUkMS5jYWxsKHBsYXllciwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQuY2FsbChwbGF5ZXIsIHBsYXllci5tZWRpYSwgJ3BsYXlpbmcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvbGwgdG8gZ2V0IHBsYXliYWNrIHByb2dyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci50aW1lcnMucGxheWluZyA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAndGltZXVwZGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCA1MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBkdXJhdGlvbiBhZ2FpbiBkdWUgdG8gWW91VHViZSBidWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3NhbXBvdHRzL3BseXIvaXNzdWVzLzM3NFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2dkYXRhLWlzc3Vlcy9pc3N1ZXMvZGV0YWlsP2lkPTg2OTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllci5tZWRpYS5kdXJhdGlvbiAhPT0gaW5zdGFuY2UuZ2V0RHVyYXRpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLm1lZGlhLmR1cmF0aW9uID0gaW5zdGFuY2UuZ2V0RHVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHBsYXllciwgcGxheWVyLm1lZGlhLCAnZHVyYXRpb25jaGFuZ2UnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHF1YWxpdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHMuc2V0UXVhbGl0eU1lbnUuY2FsbChwbGF5ZXIsIG1hcFF1YWxpdHlVbml0cyhpbnN0YW5jZS5nZXRBdmFpbGFibGVRdWFsaXR5TGV2ZWxzKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIGF1ZGlvIChZb3VUdWJlIHN0YXJ0cyBwbGF5aW5nIG9uIHNlZWsgaWYgdGhlIHZpZGVvIGhhc24ndCBiZWVuIHBsYXllZCB5ZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwbGF5ZXIubXV0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmVtYmVkLnVuTXV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3N1cmVQbGF5YmFja1N0YXRlJDEuY2FsbChwbGF5ZXIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwocGxheWVyLCBwbGF5ZXIuZWxlbWVudHMuY29udGFpbmVyLCAnc3RhdGVjaGFuZ2UnLCBmYWxzZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZTogZXZlbnQuZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB2YXIgbWVkaWEgPSB7XHJcbiAgICAgICAgLy8gU2V0dXAgbWVkaWFcclxuICAgICAgICBzZXR1cDogZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3Mgbm8gbWVkaWEsIGJhaWxcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm1lZGlhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLndhcm4oJ05vIG1lZGlhIGVsZW1lbnQgZm91bmQhJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0eXBlIGNsYXNzXHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnR5cGUucmVwbGFjZSgnezB9JywgdGhpcy50eXBlKSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcHJvdmlkZXIgY2xhc3NcclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3ModGhpcy5lbGVtZW50cy5jb250YWluZXIsIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMucHJvdmlkZXIucmVwbGFjZSgnezB9JywgdGhpcy5wcm92aWRlciksIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHZpZGVvIGNsYXNzIGZvciBlbWJlZHNcclxuICAgICAgICAgICAgLy8gVGhpcyB3aWxsIHJlcXVpcmUgY2hhbmdlcyBpZiBhdWRpbyBlbWJlZHMgYXJlIGFkZGVkXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRW1iZWQpIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHRoaXMuZWxlbWVudHMuY29udGFpbmVyLCB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnR5cGUucmVwbGFjZSgnezB9JywgJ3ZpZGVvJyksIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbmplY3QgdGhlIHBsYXllciB3cmFwcGVyXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgd3JhcHBlciBkaXZcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMud3JhcHBlciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogdGhpcy5jb25maWcuY2xhc3NOYW1lcy52aWRlb1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV3JhcCB0aGUgdmlkZW8gaW4gYSBjb250YWluZXJcclxuICAgICAgICAgICAgICAgIHdyYXAodGhpcy5tZWRpYSwgdGhpcy5lbGVtZW50cy53cmFwcGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGYXV4IHBvc3RlciBjb250YWluZXJcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMucG9zdGVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiB0aGlzLmNvbmZpZy5jbGFzc05hbWVzLnBvc3RlclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy53cmFwcGVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudHMucG9zdGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNIVE1MNSkge1xyXG4gICAgICAgICAgICAgICAgaHRtbDUuZXh0ZW5kLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1lvdVR1YmUpIHtcclxuICAgICAgICAgICAgICAgIHlvdXR1YmUuc2V0dXAuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzVmltZW8pIHtcclxuICAgICAgICAgICAgICAgIHZpbWVvLnNldHVwLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgdmFyIEFkcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZHMgY29uc3RydWN0b3IuXHJcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IHBsYXllclxyXG4gICAgICAgICAqIEByZXR1cm4ge0Fkc31cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBBZHMocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBBZHMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgICAgIHRoaXMucHVibGlzaGVySWQgPSBwbGF5ZXIuY29uZmlnLmFkcy5wdWJsaXNoZXJJZDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlDb250YWluZXI6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmN1ZVBvaW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuc2FmZXR5VGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50ZG93blRpbWVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldHVwIGEgcHJvbWlzZSB0byByZXNvbHZlIHdoZW4gdGhlIElNQSBtYW5hZ2VyIGlzIHJlYWR5XHJcbiAgICAgICAgICAgIHRoaXMubWFuYWdlclByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGUgYWQgaXMgbG9hZGVkIGFuZCByZWFkeVxyXG4gICAgICAgICAgICAgICAgX3RoaXMub24oJ2xvYWRlZCcsIHJlc29sdmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkcyBmYWlsZWRcclxuICAgICAgICAgICAgICAgIF90aGlzLm9uKCdlcnJvcicsIHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVDbGFzcyhBZHMsIFt7XHJcbiAgICAgICAgICAgIGtleTogJ2xvYWQnLFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBMb2FkIHRoZSBJTUEgU0RLXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgR29vZ2xlIElNQTMgU0RLIGlzIGxvYWRlZCBvciBsb2FkIGl0IG91cnNlbHZlc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXMub2JqZWN0KHdpbmRvdy5nb29nbGUpIHx8ICFpcy5vYmplY3Qod2luZG93Lmdvb2dsZS5pbWEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRTY3JpcHQodGhpcy5wbGF5ZXIuY29uZmlnLnVybHMuZ29vZ2xlSU1BLnNkaykudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIucmVhZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2NyaXB0IGZhaWxlZCB0byBsb2FkIG9yIGlzIGJsb2NrZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi50cmlnZ2VyKCdlcnJvcicsIG5ldyBFcnJvcignR29vZ2xlIElNQSBTREsgZmFpbGVkIHRvIGxvYWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVhZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBHZXQgdGhlIGFkcyBpbnN0YW5jZSByZWFkeVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdyZWFkeScsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWFkeSQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHRpY2tpbmcgb3VyIHNhZmV0eSB0aW1lci4gSWYgdGhlIHdob2xlIGFkdmVydGlzZW1lbnRcclxuICAgICAgICAgICAgICAgIC8vIHRoaW5nIGRvZXNuJ3QgcmVzb2x2ZSB3aXRoaW4gb3VyIHNldCB0aW1lOyB3ZSBiYWlsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2FmZXR5VGltZXIoMTIwMDAsICdyZWFkeSgpJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIHNhZmV0eSB0aW1lclxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpczMuY2xlYXJTYWZldHlUaW1lcignb25BZHNNYW5hZ2VyTG9hZGVkKCknKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBsaXN0ZW5lcnMgb24gdGhlIFBseXIgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0dXAgdGhlIElNQSBTREtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBJTUEoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgdGhlIGRlZmF1bHQgdGFnIFVSTFxyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3NldHVwSU1BJyxcclxuXHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogSW4gb3JkZXIgZm9yIHRoZSBTREsgdG8gZGlzcGxheSBhZHMgZm9yIG91ciB2aWRlbywgd2UgbmVlZCB0byB0ZWxsIGl0IHdoZXJlIHRvIHB1dCB0aGVtLFxyXG4gICAgICAgICAgICAgKiBzbyBoZXJlIHdlIGRlZmluZSBvdXIgYWQgY29udGFpbmVyLiBUaGlzIGRpdiBpcyBzZXQgdXAgdG8gcmVuZGVyIG9uIHRvcCBvZiB0aGUgdmlkZW8gcGxheWVyLlxyXG4gICAgICAgICAgICAgKiBVc2luZyB0aGUgY29kZSBiZWxvdywgd2UgdGVsbCB0aGUgU0RLIHRvIHJlbmRlciBhZHMgd2l0aGluIHRoYXQgZGl2LiBXZSBhbHNvIHByb3ZpZGUgYVxyXG4gICAgICAgICAgICAgKiBoYW5kbGUgdG8gdGhlIGNvbnRlbnQgdmlkZW8gcGxheWVyIC0gdGhlIFNESyB3aWxsIHBvbGwgdGhlIGN1cnJlbnQgdGltZSBvZiBvdXIgcGxheWVyIHRvXHJcbiAgICAgICAgICAgICAqIHByb3Blcmx5IHBsYWNlIG1pZC1yb2xscy4gQWZ0ZXIgd2UgY3JlYXRlIHRoZSBhZCBkaXNwbGF5IGNvbnRhaW5lciwgd2UgaW5pdGlhbGl6ZSBpdC4gT25cclxuICAgICAgICAgICAgICogbW9iaWxlIGRldmljZXMsIHRoaXMgaW5pdGlhbGl6YXRpb24gaXMgZG9uZSBhcyB0aGUgcmVzdWx0IG9mIGEgdXNlciBhY3Rpb24uXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0dXBJTUEoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbnRhaW5lciBmb3Igb3VyIGFkdmVydGlzZW1lbnRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzczogdGhpcy5wbGF5ZXIuY29uZmlnLmNsYXNzTmFtZXMuYWRzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU28gd2UgY2FuIHJ1biBWUEFJRDJcclxuICAgICAgICAgICAgICAgIGdvb2dsZS5pbWEuc2V0dGluZ3Muc2V0VnBhaWRNb2RlKGdvb2dsZS5pbWEuSW1hU2RrU2V0dGluZ3MuVnBhaWRNb2RlLkVOQUJMRUQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBsYW5ndWFnZVxyXG4gICAgICAgICAgICAgICAgZ29vZ2xlLmltYS5zZXR0aW5ncy5zZXRMb2NhbGUodGhpcy5wbGF5ZXIuY29uZmlnLmFkcy5sYW5ndWFnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gV2UgYXNzdW1lIHRoZSBhZENvbnRhaW5lciBpcyB0aGUgdmlkZW8gY29udGFpbmVyIG9mIHRoZSBwbHlyIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIC8vIHRoYXQgd2lsbCBob3VzZSB0aGUgYWRzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmRpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIodGhpcy5lbGVtZW50cy5jb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlcXVlc3QgdmlkZW8gYWRzIHRvIGJlIHByZS1sb2FkZWRcclxuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEFkcygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUmVxdWVzdCBhZHZlcnRpc2VtZW50c1xyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdyZXF1ZXN0QWRzJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlcXVlc3RBZHMoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5wbGF5ZXIuZWxlbWVudHMuY29udGFpbmVyO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhZHMgbG9hZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIodGhpcy5lbGVtZW50cy5kaXNwbGF5Q29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTGlzdGVuIGFuZCByZXNwb25kIHRvIGFkcyBsb2FkZWQgYW5kIGVycm9yIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXM0Lm9uQWRzTWFuYWdlckxvYWRlZChldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUiwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczQub25BZEVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlcXVlc3QgdmlkZW8gYWRzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5hZFRhZ1VybCA9IHRoaXMudGFnVXJsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTcGVjaWZ5IHRoZSBsaW5lYXIgYW5kIG5vbmxpbmVhciBzbG90IHNpemVzLiBUaGlzIGhlbHBzIHRoZSBTREtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0byBzZWxlY3QgdGhlIGNvcnJlY3QgY3JlYXRpdmUgaWYgbXVsdGlwbGUgYXJlIHJldHVybmVkXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5saW5lYXJBZFNsb3RXaWR0aCA9IGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmxpbmVhckFkU2xvdEhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5ub25MaW5lYXJBZFNsb3RXaWR0aCA9IGNvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdEhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIG9ubHkgb3ZlcmxheSBhZHMgYXMgd2Ugb25seSBzdXBwb3J0IHZpZGVvLlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuZm9yY2VOb25MaW5lYXJGdWxsU2xvdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBNdXRlIGJhc2VkIG9uIGN1cnJlbnQgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNldEFkV2lsbFBsYXlNdXRlZCghdGhpcy5wbGF5ZXIubXV0ZWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlci5yZXF1ZXN0QWRzKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25BZEVycm9yKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogVXBkYXRlIHRoZSBhZCBjb3VudGRvd25cclxuICAgICAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBzdGFydFxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdwb2xsQ291bnRkb3duJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBvbGxDb3VudGRvd24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXM1ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuY291bnRkb3duVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1iYWRnZS10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWUgPSBmb3JtYXRUaW1lKE1hdGgubWF4KF90aGlzNS5tYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKSwgMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IGkxOG4uZ2V0KCdhZHZlcnRpc2VtZW50JywgX3RoaXM1LnBsYXllci5jb25maWcpICsgJyAtICcgKyB0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNS5lbGVtZW50cy5jb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLWJhZGdlLXRleHQnLCBsYWJlbCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY291bnRkb3duVGltZXIgPSBzZXRJbnRlcnZhbCh1cGRhdGUsIDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgd2hlbmV2ZXIgdGhlIGFkcyBhcmUgcmVhZHkgaW5zaWRlIHRoZSBBZERpc3BsYXlDb250YWluZXJcclxuICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudH0gYWRzTWFuYWdlckxvYWRlZEV2ZW50XHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ29uQWRzTWFuYWdlckxvYWRlZCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkFkc01hbmFnZXJMb2FkZWQoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgYWRzIG1hbmFnZXJcclxuICAgICAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVGVsbCB0aGUgU0RLIHRvIHNhdmUgYW5kIHJlc3RvcmUgY29udGVudCB2aWRlbyBzdGF0ZSBvbiBvdXIgYmVoYWxmXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzLmVuYWJsZVByZWxvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRoZSBTREsgaXMgcG9sbGluZyBjdXJyZW50VGltZSBvbiB0aGUgY29udGVudFBsYXliYWNrLiBBbmQgbmVlZHMgYSBkdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgLy8gc28gaXQgY2FuIGRldGVybWluZSB3aGVuIHRvIHN0YXJ0IHRoZSBtaWQtIGFuZCBwb3N0LXJvbGxcclxuICAgICAgICAgICAgICAgIHRoaXMubWFuYWdlciA9IGV2ZW50LmdldEFkc01hbmFnZXIodGhpcy5wbGF5ZXIsIHNldHRpbmdzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGN1ZSBwb2ludHMgZm9yIGFueSBtaWQtcm9sbHMgYnkgZmlsdGVyaW5nIG91dCB0aGUgcHJlLSBhbmQgcG9zdC1yb2xsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1ZVBvaW50cyA9IHRoaXMubWFuYWdlci5nZXRDdWVQb2ludHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgYWR2ZXJ0aXNlbWVudCBjdWUncyB3aXRoaW4gdGhlIHRpbWUgbGluZSBpZiBhdmFpbGFibGVcclxuICAgICAgICAgICAgICAgIGlmICghaXMuZW1wdHkodGhpcy5jdWVQb2ludHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdWVQb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoY3VlUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ZVBvaW50ICE9PSAwICYmIGN1ZVBvaW50ICE9PSAtMSAmJiBjdWVQb2ludCA8IF90aGlzNi5wbGF5ZXIuZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWVrRWxlbWVudCA9IF90aGlzNi5wbGF5ZXIuZWxlbWVudHMucHJvZ3Jlc3M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzLmVsZW1lbnQoc2Vla0VsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1ZVBlcmNlbnRhZ2UgPSAxMDAgLyBfdGhpczYucGxheWVyLmR1cmF0aW9uICogY3VlUG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1ZSA9IGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBfdGhpczYucGxheWVyLmNvbmZpZy5jbGFzc05hbWVzLmN1ZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VlLnN0eWxlLmxlZnQgPSBjdWVQZXJjZW50YWdlLnRvU3RyaW5nKCkgKyAnJSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vla0VsZW1lbnQuYXBwZW5kQ2hpbGQoY3VlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCBza2lwcGFibGUgc3RhdGVcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IFNraXAgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnBsYXllci5kZWJ1Zy53YXJuKHRoaXMubWFuYWdlci5nZXRBZFNraXBwYWJsZVN0YXRlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCB2b2x1bWUgdG8gbWF0Y2ggcGxheWVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXIuc2V0Vm9sdW1lKHRoaXMucGxheWVyLnZvbHVtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIGxpc3RlbmVycyB0byB0aGUgcmVxdWlyZWQgZXZlbnRzXHJcbiAgICAgICAgICAgICAgICAvLyBBZHZlcnRpc2VtZW50IGVycm9yIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUiwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzNi5vbkFkRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWR2ZXJ0aXNlbWVudCByZWd1bGFyIGV2ZW50c1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpczYubWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlW3R5cGVdLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzNi5vbkFkRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBvdXIgYWRzTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdsb2FkZWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFRoaXMgaXMgd2hlcmUgYWxsIHRoZSBldmVudCBoYW5kbGluZyB0YWtlcyBwbGFjZS4gUmV0cmlldmUgdGhlIGFkIGZyb20gdGhlIGV2ZW50LiBTb21lXHJcbiAgICAgICAgICAgICAqIGV2ZW50cyAoZS5nLiBBTExfQURTX0NPTVBMRVRFRCkgZG9uJ3QgaGF2ZSB0aGUgYWQgb2JqZWN0IGFzc29jaWF0ZWRcclxuICAgICAgICAgICAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vaW50ZXJhY3RpdmUtbWVkaWEtYWRzL2RvY3Mvc2Rrcy9odG1sNS92My9hcGlzI2ltYS5BZEV2ZW50LlR5cGVcclxuICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnb25BZEV2ZW50JyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQWRFdmVudChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXRyaWV2ZSB0aGUgYWQgZnJvbSB0aGUgZXZlbnQuIFNvbWUgZXZlbnRzIChlLmcuIEFMTF9BRFNfQ09NUExFVEVEKVxyXG4gICAgICAgICAgICAgICAgLy8gZG9uJ3QgaGF2ZSBhZCBvYmplY3QgYXNzb2NpYXRlZFxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhZCA9IGV2ZW50LmdldEFkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJveHkgZXZlbnRcclxuICAgICAgICAgICAgICAgIHZhciBkaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gZGlzcGF0Y2hFdmVudCh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gJ2FkcycgKyB0eXBlLnJlcGxhY2UoL18vZywgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwoX3RoaXM3LnBsYXllciwgX3RoaXM3LnBsYXllci5tZWRpYSwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkxPQURFRDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgZXZlbnQgc2VudCBmb3IgYW4gYWQgLSBpdCBpcyBwb3NzaWJsZSB0byBkZXRlcm1pbmUgd2hldGhlciB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWQgaXMgYSB2aWRlbyBhZCBvciBhbiBvdmVybGF5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCdWJibGUgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudChldmVudC50eXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0YXJ0IGNvdW50ZG93blxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbGxDb3VudGRvd24odHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFkLmlzTGluZWFyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvc2l0aW9uIEFkRGlzcGxheUNvbnRhaW5lciBjb3JyZWN0bHkgZm9yIG92ZXJsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkLndpZHRoID0gY29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWQuaGVpZ2h0ID0gY29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCdBZCB0eXBlOiAnICsgZXZlbnQuZ2V0QWQoKS5nZXRBZFBvZEluZm8oKS5nZXRQb2RJbmRleCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCdBZCB0aW1lOiAnICsgZXZlbnQuZ2V0QWQoKS5nZXRBZFBvZEluZm8oKS5nZXRUaW1lT2Zmc2V0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxsIGFkcyBmb3IgdGhlIGN1cnJlbnQgdmlkZW9zIGFyZSBkb25lLiBXZSBjYW4gbm93IHJlcXVlc3QgbmV3IGFkdmVydGlzZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIGNhc2UgdGhlIHZpZGVvIGlzIHJlLXBsYXllZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlyZSBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaEV2ZW50KGV2ZW50LnR5cGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogRXhhbXBsZSBmb3Igd2hhdCBoYXBwZW5zIHdoZW4gYSBuZXh0IHZpZGVvIGluIGEgcGxheWxpc3Qgd291bGQgYmUgbG9hZGVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTbyBoZXJlIHdlIGxvYWQgYSBuZXcgdmlkZW8gd2hlbiBhbGwgYWRzIGFyZSBkb25lLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGVuIHdlIGxvYWQgbmV3IGFkcyB3aXRoaW4gYSBuZXcgYWRzTWFuYWdlci4gV2hlbiB0aGUgdmlkZW9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSXMgc3RhcnRlZCAtIGFmdGVyIC0gdGhlIGFkcyBhcmUgbG9hZGVkLCB0aGVuIHdlIGdldCBhZHMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFlvdSBjYW4gYWxzbyBlYXNpbHkgdGVzdCBjYW5jZWxsaW5nIGFuZCByZWxvYWRpbmcgYnkgcnVubmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwbGF5ZXIuYWRzLmNhbmNlbCgpIGFuZCBwbGF5ZXIuYWRzLnBsYXkgZnJvbSB0aGUgY29uc29sZSBJIGd1ZXNzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnBsYXllci5zb3VyY2UgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0eXBlOiAndmlkZW8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGl0bGU6ICdWaWV3IEZyb20gQSBCbHVlIE1vb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgc291cmNlczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzcmM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICdodHRwczovL2Nkbi5wbHlyLmlvL3N0YXRpYy9kZW1vL1ZpZXdfRnJvbV9BX0JsdWVfTW9vbl9UcmFpbGVyLUhELm1wNCcsIHR5cGU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICd2aWRlby9tcDQnLCB9XSwgcG9zdGVyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAnaHR0cHM6Ly9jZG4ucGx5ci5pby9zdGF0aWMvZGVtby9WaWV3X0Zyb21fQV9CbHVlX01vb25fVHJhaWxlci1IRC5qcGcnLCB0cmFja3M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFsgeyBraW5kOiAnY2FwdGlvbnMnLCBsYWJlbDogJ0VuZ2xpc2gnLCBzcmNsYW5nOiAnZW4nLCBzcmM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICdodHRwczovL2Nkbi5wbHlyLmlvL3N0YXRpYy9kZW1vL1ZpZXdfRnJvbV9BX0JsdWVfTW9vbl9UcmFpbGVyLUhELmVuLnZ0dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQ6IHRydWUsIH0sIHsga2luZDogJ2NhcHRpb25zJywgbGFiZWw6ICdGcmVuY2gnLCBzcmNsYW5nOiAnZnInLCBzcmM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICdodHRwczovL2Nkbi5wbHlyLmlvL3N0YXRpYy9kZW1vL1ZpZXdfRnJvbV9BX0JsdWVfTW9vbl9UcmFpbGVyLUhELmZyLnZ0dCcsIH0sIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBTbyB0aGVyZSBpcyBzdGlsbCB0aGlzIHRoaW5nIHdoZXJlIGEgdmlkZW8gc2hvdWxkIG9ubHkgYmUgYWxsb3dlZCB0byBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwbGF5aW5nIHdoZW4gdGhlIElNQSBTREsgaXMgcmVhZHkgb3IgaGFzIGZhaWxlZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQWRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGV2ZW50IGluZGljYXRlcyB0aGUgYWQgaGFzIHN0YXJ0ZWQgLSB0aGUgdmlkZW8gcGxheWVyIGNhbiBhZGp1c3QgdGhlIFVJLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBkaXNwbGF5IGEgcGF1c2UgYnV0dG9uIGFuZCByZW1haW5pbmcgdGltZS4gRmlyZWQgd2hlbiBjb250ZW50IHNob3VsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBiZSBwYXVzZWQuIFRoaXMgdXN1YWxseSBoYXBwZW5zIHJpZ2h0IGJlZm9yZSBhbiBhZCBpcyBhYm91dCB0byBjb3ZlciB0aGUgY29udGVudFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hFdmVudChldmVudC50eXBlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF1c2VDb250ZW50KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgZXZlbnQgaW5kaWNhdGVzIHRoZSBhZCBoYXMgZmluaXNoZWQgLSB0aGUgdmlkZW8gcGxheWVyIGNhbiBwZXJmb3JtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFwcHJvcHJpYXRlIFVJIGFjdGlvbnMsIHN1Y2ggYXMgcmVtb3ZpbmcgdGhlIHRpbWVyIGZvciByZW1haW5pbmcgdGltZSBkZXRlY3Rpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVkIHdoZW4gY29udGVudCBzaG91bGQgYmUgcmVzdW1lZC4gVGhpcyB1c3VhbGx5IGhhcHBlbnMgd2hlbiBhbiBhZCBmaW5pc2hlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvciBjb2xsYXBzZXNcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQudHlwZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvbGxDb3VudGRvd24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdW1lQ29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLk1JRFBPSU5UOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEU6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5JTVBSRVNTSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ0xJQ0s6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEFueSBhZCBlcnJvciBoYW5kbGluZyBjb21lcyB0aHJvdWdoIGhlcmVcclxuICAgICAgICAgICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnb25BZEVycm9yJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uQWRFcnJvcihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmRlYnVnLndhcm4oJ0FkcyBlcnJvcicsIGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldHVwIGhvb2tzIGZvciBQbHlyIGFuZCB3aW5kb3cgZXZlbnRzLiBUaGlzIGVuc3VyZXNcclxuICAgICAgICAgICAgICogdGhlIG1pZC0gYW5kIHBvc3Qtcm9sbCBsYXVuY2ggYXQgdGhlIGNvcnJlY3QgdGltZS4gQW5kXHJcbiAgICAgICAgICAgICAqIHJlc2l6ZSB0aGUgYWR2ZXJ0aXNlbWVudCB3aGVuIHRoZSBwbGF5ZXIgcmVzaXplc1xyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdsaXN0ZW5lcnMnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbGlzdGVuZXJzKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzOCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMucGxheWVyLmVsZW1lbnRzLmNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZSA9IHZvaWQgMDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgbGlzdGVuZXJzIHRvIHRoZSByZXF1aXJlZCBldmVudHNcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm9uKCdlbmRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpczgubG9hZGVyLmNvbnRlbnRDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIub24oJ3NlZWtpbmcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZSA9IF90aGlzOC5wbGF5ZXIuY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRpbWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5vbignc2Vla2VkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWVrZWRUaW1lID0gX3RoaXM4LnBsYXllci5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzLmVtcHR5KF90aGlzOC5jdWVQb2ludHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzOC5jdWVQb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoY3VlUG9pbnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aW1lIDwgY3VlUG9pbnQgJiYgY3VlUG9pbnQgPCBzZWVrZWRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczgubWFuYWdlci5kaXNjYXJkQWRCcmVhaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXM4LmN1ZVBvaW50cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMaXN0ZW4gdG8gdGhlIHJlc2l6aW5nIG9mIHRoZSB3aW5kb3cuIEFuZCByZXNpemUgYWQgYWNjb3JkaW5nbHlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGV2ZW50dWFsbHkgaW1wbGVtZW50IFJlc2l6ZU9ic2VydmVyXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpczgubWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczgubWFuYWdlci5yZXNpemUoY29udGFpbmVyLm9mZnNldFdpZHRoLCBjb250YWluZXIub2Zmc2V0SGVpZ2h0LCBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBJbml0aWFsaXplIHRoZSBhZHNNYW5hZ2VyIGFuZCBzdGFydCBwbGF5aW5nIGFkdmVydGlzZW1lbnRzXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3BsYXknLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGxheSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpczkgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLnBsYXllci5lbGVtZW50cy5jb250YWluZXI7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tYW5hZ2VyUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdW1lQ29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFBsYXkgdGhlIHJlcXVlc3RlZCBhZHZlcnRpc2VtZW50IHdoZW5ldmVyIHRoZSBhZHNNYW5hZ2VyIGlzIHJlYWR5XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmFnZXJQcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGNvbnRhaW5lci4gTXVzdCBiZSBkb25lIHZpYSBhIHVzZXIgYWN0aW9uIG9uIG1vYmlsZSBkZXZpY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM5LmVsZW1lbnRzLmRpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV90aGlzOS5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgYWRzIG1hbmFnZXIuIEFkIHJ1bGVzIHBsYXlsaXN0IHdpbGwgc3RhcnQgYXQgdGhpcyB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczkubWFuYWdlci5pbml0KGNvbnRhaW5lci5vZmZzZXRXaWR0aCwgY29udGFpbmVyLm9mZnNldEhlaWdodCwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbGwgcGxheSB0byBzdGFydCBzaG93aW5nIHRoZSBhZC4gU2luZ2xlIHZpZGVvIGFuZCBvdmVybGF5IGFkcyB3aWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBhdCB0aGlzIHRpbWU7IHRoZSBjYWxsIHdpbGwgYmUgaWdub3JlZCBmb3IgYWQgcnVsZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzOS5tYW5hZ2VyLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzOS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoYWRFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbiBlcnJvciBtYXkgYmUgdGhyb3duIGlmIHRoZXJlIHdhcyBhIHByb2JsZW0gd2l0aCB0aGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVkFTVCByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczkub25BZEVycm9yKGFkRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZXN1bWUgb3VyIHZpZGVvXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3Jlc3VtZUNvbnRlbnQnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVzdW1lQ29udGVudCgpIHtcclxuICAgICAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFkdmVydGlzZW1lbnQgY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZCBpcyBzdG9wcGVkXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQbGF5IG91ciB2aWRlb1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLmN1cnJlbnRUaW1lIDwgdGhpcy5wbGF5ZXIuZHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBQYXVzZSBvdXIgdmlkZW9cclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAncGF1c2VDb250ZW50JyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBhdXNlQ29udGVudCgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNob3cgdGhlIGFkdmVydGlzZW1lbnQgY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFkIGlzIHBsYXlpbmcuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFBhdXNlIG91ciB2aWRlby5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBEZXN0cm95IHRoZSBhZHNNYW5hZ2VyIHNvIHdlIGNhbiBncmFiIG5ldyBhZHMgYWZ0ZXIgdGhpcy4gSWYgd2UgZG9uJ3QgdGhlbiB3ZSdyZSBub3RcclxuICAgICAgICAgICAgICogYWxsb3dlZCB0byBjYWxsIG5ldyBhZHMgYmFzZWQgb24gZ29vZ2xlIHBvbGljaWVzLCBhcyB0aGV5IGludGVycHJldCB0aGlzIGFzIGFuIGFjY2lkZW50YWxcclxuICAgICAgICAgICAgICogdmlkZW8gcmVxdWVzdHMuIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2ludGVyYWN0aXZlLVxyXG4gICAgICAgICAgICAgKiBtZWRpYS1hZHMvZG9jcy9zZGtzL2FuZHJvaWQvZmFxIzhcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnY2FuY2VsJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNhbmNlbCgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFBhdXNlIG91ciB2aWRlb1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VtZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUZWxsIG91ciBpbnN0YW5jZSB0aGF0IHdlJ3JlIGRvbmUgZm9yIG5vd1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlLWNyZWF0ZSBvdXIgYWRzTWFuYWdlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQWRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZS1jcmVhdGUgb3VyIGFkc01hbmFnZXJcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnbG9hZEFkcycsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkQWRzKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzMTAgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRlbGwgb3VyIGFkc01hbmFnZXIgdG8gZ28gYnllIGJ5ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBEZXN0cm95IG91ciBhZHNNYW5hZ2VyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzMTAubWFuYWdlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczEwLm1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmUtc2V0IG91ciBhZHNNYW5hZ2VyIHByb21pc2VzXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxMC5tYW5hZ2VyUHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMTAub24oJ2xvYWRlZCcsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczEwLnBsYXllci5kZWJ1Zy5sb2coX3RoaXMxMC5tYW5hZ2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTm93IHJlcXVlc3Qgc29tZSBuZXcgYWR2ZXJ0aXNlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICBfdGhpczEwLnJlcXVlc3RBZHMoKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBIYW5kbGVzIGNhbGxiYWNrcyBhZnRlciBhbiBhZCBldmVudCB3YXMgaW52b2tlZFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgLSBFdmVudCB0eXBlXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3RyaWdnZXInLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzMTEgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGVycyA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXMuYXJyYXkoaGFuZGxlcnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXMuZnVuY3Rpb24oaGFuZGxlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuYXBwbHkoX3RoaXMxMSwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEFkZCBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IC0gRXZlbnQgdHlwZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrIGZvciB3aGVuIGV2ZW50IG9jY3Vyc1xyXG4gICAgICAgICAgICAgKiBAcmV0dXJuIHtBZHN9XHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ29uJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uJCQxKGV2ZW50LCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpcy5hcnJheSh0aGlzLmV2ZW50c1tldmVudF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogU2V0dXAgYSBzYWZldHkgdGltZXIgZm9yIHdoZW4gdGhlIGFkIG5ldHdvcmsgZG9lc24ndCByZXNwb25kIGZvciB3aGF0ZXZlciByZWFzb24uXHJcbiAgICAgICAgICAgICAqIFRoZSBhZHZlcnRpc2VtZW50IGhhcyAxMiBzZWNvbmRzIHRvIGdldCBpdHMgdGhpbmdzIHRvZ2V0aGVyLiBXZSBzdG9wIHRoaXMgdGltZXIgd2hlbiB0aGVcclxuICAgICAgICAgICAgICogYWR2ZXJ0aXNlbWVudCBpcyBwbGF5aW5nLCBvciB3aGVuIGEgdXNlciBhY3Rpb24gaXMgcmVxdWlyZWQgdG8gc3RhcnQsIHRoZW4gd2UgY2xlYXIgdGhlXHJcbiAgICAgICAgICAgICAqIHRpbWVyIG9uIGFkIHJlYWR5XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3N0YXJ0U2FmZXR5VGltZXInLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnRTYWZldHlUaW1lcih0aW1lLCBmcm9tKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMxMiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZGVidWcubG9nKCdTYWZldHkgdGltZXIgaW52b2tlZCBmcm9tOiAnICsgZnJvbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zYWZldHlUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTIuY2FuY2VsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxMi5jbGVhclNhZmV0eVRpbWVyKCdzdGFydFNhZmV0eVRpbWVyKCknKTtcclxuICAgICAgICAgICAgICAgIH0sIHRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQ2xlYXIgb3VyIHNhZmV0eSB0aW1lcihzKVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdjbGVhclNhZmV0eVRpbWVyJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyU2FmZXR5VGltZXIoZnJvbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpcy5udWxsT3JVbmRlZmluZWQodGhpcy5zYWZldHlUaW1lcikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5kZWJ1Zy5sb2coJ1NhZmV0eSB0aW1lciBjbGVhcmVkIGZyb206ICcgKyBmcm9tKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2FmZXR5VGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2FmZXR5VGltZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdlbmFibGVkJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIuaXNIVE1MNSAmJiB0aGlzLnBsYXllci5pc1ZpZGVvICYmIHRoaXMucGxheWVyLmNvbmZpZy5hZHMuZW5hYmxlZCAmJiAhaXMuZW1wdHkodGhpcy5wdWJsaXNoZXJJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3RhZ1VybCcsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBBVl9QVUJMSVNIRVJJRDogJzU4YzI1YmIwMDczZWY0NDhiMTA4N2FkNicsXHJcbiAgICAgICAgICAgICAgICAgICAgQVZfQ0hBTk5FTElEOiAnNWEwNDU4ZGMyOGEwNjE0NWU0NTE5ZDIxJyxcclxuICAgICAgICAgICAgICAgICAgICBBVl9VUkw6IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjYjogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgICAgICAgICBBVl9XSURUSDogNjQwLFxyXG4gICAgICAgICAgICAgICAgICAgIEFWX0hFSUdIVDogNDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIEFWX0NESU0yOiB0aGlzLnB1Ymxpc2hlcklkXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBiYXNlID0gJ2h0dHBzOi8vZ28uYW5pdmlldy5jb20vYXBpL2Fkc2VydmVyNi92YXN0Lyc7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhc2UgKyAnPycgKyBidWlsZFVybFBhcmFtcyhwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV0pO1xyXG4gICAgICAgIHJldHVybiBBZHM7XHJcbiAgICB9KCk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbiAgICB2YXIgc291cmNlID0ge1xyXG4gICAgICAgIC8vIEFkZCBlbGVtZW50cyB0byBIVE1MNSBtZWRpYSAoc291cmNlLCB0cmFja3MsIGV0YylcclxuICAgICAgICBpbnNlcnRFbGVtZW50czogZnVuY3Rpb24gaW5zZXJ0RWxlbWVudHModHlwZSwgYXR0cmlidXRlcykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzLnN0cmluZyhhdHRyaWJ1dGVzKSkge1xyXG4gICAgICAgICAgICAgICAgaW5zZXJ0RWxlbWVudCh0eXBlLCB0aGlzLm1lZGlhLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjOiBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpcy5hcnJheShhdHRyaWJ1dGVzKSkge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRFbGVtZW50KHR5cGUsIF90aGlzLm1lZGlhLCBhdHRyaWJ1dGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHNvdXJjZVxyXG4gICAgICAgIC8vIFNvdXJjZXMgYXJlIG5vdCBjaGVja2VkIGZvciBzdXBwb3J0IHNvIGJlIGNhcmVmdWxcclxuICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIGNoYW5nZShpbnB1dCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICghZ2V0RGVlcChpbnB1dCwgJ3NvdXJjZXMubGVuZ3RoJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcud2FybignSW52YWxpZCBzb3VyY2UgZm9ybWF0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENhbmNlbCBjdXJyZW50IG5ldHdvcmsgcmVxdWVzdHNcclxuICAgICAgICAgICAgaHRtbDUuY2FuY2VsUmVxdWVzdHMuY2FsbCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERlc3Ryb3kgaW5zdGFuY2UgYW5kIHJlLXNldHVwXHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveS5jYWxsKHRoaXMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHF1YWxpdHkgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgX3RoaXMyLm9wdGlvbnMucXVhbGl0eSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlRWxlbWVudChfdGhpczIubWVkaWEpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMyLm1lZGlhID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBjbGFzcyBuYW1lXHJcbiAgICAgICAgICAgICAgICBpZiAoaXMuZWxlbWVudChfdGhpczIuZWxlbWVudHMuY29udGFpbmVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMi5lbGVtZW50cy5jb250YWluZXIucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgdHlwZSBhbmQgcHJvdmlkZXJcclxuICAgICAgICAgICAgICAgIHZhciBzb3VyY2VzID0gaW5wdXQuc291cmNlcyxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gaW5wdXQudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgX3NvdXJjZXMgPSBzbGljZWRUb0FycmF5KHNvdXJjZXMsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIF9zb3VyY2VzJCA9IF9zb3VyY2VzWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgIF9zb3VyY2VzJCRwcm92aWRlciA9IF9zb3VyY2VzJC5wcm92aWRlcixcclxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlciA9IF9zb3VyY2VzJCRwcm92aWRlciA9PT0gdW5kZWZpbmVkID8gcHJvdmlkZXJzLmh0bWw1IDogX3NvdXJjZXMkJHByb3ZpZGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IF9zb3VyY2VzJC5zcmM7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBwcm92aWRlciA9PT0gJ2h0bWw1JyA/IHR5cGUgOiAnZGl2JztcclxuICAgICAgICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gcHJvdmlkZXIgPT09ICdodG1sNScgPyB7fSA6IHsgc3JjOiBzcmMgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKF90aGlzMiwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyOiBwcm92aWRlcixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBzdXBwb3J0XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkOiBzdXBwb3J0LmNoZWNrKHR5cGUsIHByb3ZpZGVyLCBfdGhpczIuY29uZmlnLnBsYXlzaW5saW5lKSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbmV3IGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBtZWRpYTogY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBhdHRyaWJ1dGVzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSW5qZWN0IHRoZSBuZXcgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgX3RoaXMyLmVsZW1lbnRzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChfdGhpczIubWVkaWEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEF1dG9wbGF5IHRoZSBuZXcgc291cmNlP1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzLmJvb2xlYW4oaW5wdXQuYXV0b3BsYXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmNvbmZpZy5hdXRvcGxheSA9IGlucHV0LmF1dG9wbGF5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBhdHRyaWJ1dGVzIGZvciBhdWRpbyBhbmQgdmlkZW9cclxuICAgICAgICAgICAgICAgIGlmIChfdGhpczIuaXNIVE1MNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpczIuY29uZmlnLmNyb3Nzb3JpZ2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5tZWRpYS5zZXRBdHRyaWJ1dGUoJ2Nyb3Nzb3JpZ2luJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMyLmNvbmZpZy5hdXRvcGxheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIubWVkaWEuc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpcy5lbXB0eShpbnB1dC5wb3N0ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5wb3N0ZXIgPSBpbnB1dC5wb3N0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpczIuY29uZmlnLmxvb3AuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5tZWRpYS5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpczIuY29uZmlnLm11dGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5tZWRpYS5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMyLmNvbmZpZy5wbGF5c2lubGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIubWVkaWEuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBjbGFzcyBob29rXHJcbiAgICAgICAgICAgICAgICB1aS5hZGRTdHlsZUhvb2suY2FsbChfdGhpczIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBuZXcgc291cmNlcyBmb3IgaHRtbDVcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpczIuaXNIVE1MNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5pbnNlcnRFbGVtZW50cy5jYWxsKF90aGlzMiwgJ3NvdXJjZScsIHNvdXJjZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCB2aWRlbyB0aXRsZVxyXG4gICAgICAgICAgICAgICAgX3RoaXMyLmNvbmZpZy50aXRsZSA9IGlucHV0LnRpdGxlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCB1cCBmcm9tIHNjcmF0Y2hcclxuICAgICAgICAgICAgICAgIG1lZGlhLnNldHVwLmNhbGwoX3RoaXMyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBIVE1MNSBzdHVmZlxyXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzMi5pc0hUTUw1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0dXAgY2FwdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJ3RyYWNrcycgaW4gaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLmluc2VydEVsZW1lbnRzLmNhbGwoX3RoaXMyLCAndHJhY2snLCBpbnB1dC50cmFja3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9hZCBIVE1MNSBzb3VyY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyLm1lZGlhLmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBIVE1MNSBvciBlbWJlZCBidXQgbm90IGZ1bGx5IHN1cHBvcnRlZCwgc2V0dXBJbnRlcmZhY2UgYW5kIGNhbGwgcmVhZHkgbm93XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMyLmlzSFRNTDUgfHwgX3RoaXMyLmlzRW1iZWQgJiYgIV90aGlzMi5zdXBwb3J0ZWQudWkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTZXR1cCBpbnRlcmZhY2VcclxuICAgICAgICAgICAgICAgICAgICB1aS5idWlsZC5jYWxsKF90aGlzMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBmdWxsc2NyZWVuIHN1cHBvcnRcclxuICAgICAgICAgICAgICAgIF90aGlzMi5mdWxsc2NyZWVuLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4gICAgLy8gUHJpdmF0ZSBwcm9wZXJ0aWVzXHJcbiAgICAvLyBUT0RPOiBVc2UgYSBXZWFrTWFwIGZvciBwcml2YXRlIGdsb2JhbHNcclxuICAgIC8vIGNvbnN0IGdsb2JhbHMgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuICAgIC8vIFBseXIgaW5zdGFuY2VcclxuXHJcbiAgICB2YXIgUGx5ciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBQbHlyKHRhcmdldCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgUGx5cik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRpbWVycyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgLy8gU3RhdGVcclxuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5mYWlsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRvdWNoIGRldmljZVxyXG4gICAgICAgICAgICB0aGlzLnRvdWNoID0gc3VwcG9ydC50b3VjaDtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB0aGUgbWVkaWEgZWxlbWVudFxyXG4gICAgICAgICAgICB0aGlzLm1lZGlhID0gdGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgLy8gU3RyaW5nIHNlbGVjdG9yIHBhc3NlZFxyXG4gICAgICAgICAgICBpZiAoaXMuc3RyaW5nKHRoaXMubWVkaWEpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLm1lZGlhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8galF1ZXJ5LCBOb2RlTGlzdCBvciBBcnJheSBwYXNzZWQsIHVzZSBmaXJzdCBlbGVtZW50XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cualF1ZXJ5ICYmIHRoaXMubWVkaWEgaW5zdGFuY2VvZiBqUXVlcnkgfHwgaXMubm9kZUxpc3QodGhpcy5tZWRpYSkgfHwgaXMuYXJyYXkodGhpcy5tZWRpYSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYSA9IHRoaXMubWVkaWFbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBjb25maWdcclxuICAgICAgICAgICAgdGhpcy5jb25maWcgPSBleHRlbmQoe30sIGRlZmF1bHRzJDEsIFBseXIuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoX3RoaXMubWVkaWEuZ2V0QXR0cmlidXRlKCdkYXRhLXBseXItY29uZmlnJykpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSgpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVsZW1lbnRzIGNhY2hlXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMgPSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBidXR0b25zOiB7fSxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IHt9LFxyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IHt9LFxyXG4gICAgICAgICAgICAgICAgaW5wdXRzOiB7fSxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBwYW5lczoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiczoge31cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uczogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FwdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5jYXB0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRUcmFjazogLTEsXHJcbiAgICAgICAgICAgICAgICBtZXRhOiBuZXcgV2Vha01hcCgpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBGdWxsc2NyZWVuXHJcbiAgICAgICAgICAgIHRoaXMuZnVsbHNjcmVlbiA9IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZTogZmFsc2VcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIE9wdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IFtdLFxyXG4gICAgICAgICAgICAgICAgcXVhbGl0eTogW11cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIERlYnVnZ2luZ1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBtb3ZlIHRvIGdsb2JhbHNcclxuICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IG5ldyBDb25zb2xlKHRoaXMuY29uZmlnLmRlYnVnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExvZyBjb25maWcgb3B0aW9ucyBhbmQgc3VwcG9ydFxyXG4gICAgICAgICAgICB0aGlzLmRlYnVnLmxvZygnQ29uZmlnJywgdGhpcy5jb25maWcpO1xyXG4gICAgICAgICAgICB0aGlzLmRlYnVnLmxvZygnU3VwcG9ydCcsIHN1cHBvcnQpO1xyXG5cclxuICAgICAgICAgICAgLy8gV2UgbmVlZCBhbiBlbGVtZW50IHRvIHNldHVwXHJcbiAgICAgICAgICAgIGlmIChpcy5udWxsT3JVbmRlZmluZWQodGhpcy5tZWRpYSkgfHwgIWlzLmVsZW1lbnQodGhpcy5tZWRpYSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcuZXJyb3IoJ1NldHVwIGZhaWxlZDogbm8gc3VpdGFibGUgZWxlbWVudCBwYXNzZWQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQmFpbCBpZiB0aGUgZWxlbWVudCBpcyBpbml0aWFsaXplZFxyXG4gICAgICAgICAgICBpZiAodGhpcy5tZWRpYS5wbHlyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLndhcm4oJ1RhcmdldCBhbHJlYWR5IHNldHVwJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEJhaWwgaWYgbm90IGVuYWJsZWRcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLmVycm9yKCdTZXR1cCBmYWlsZWQ6IGRpc2FibGVkIGJ5IGNvbmZpZycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBCYWlsIGlmIGRpc2FibGVkIG9yIG5vIGJhc2ljIHN1cHBvcnRcclxuICAgICAgICAgICAgLy8gWW91IG1heSB3YW50IHRvIGRpc2FibGUgY2VydGFpbiBVQXMgZXRjXHJcbiAgICAgICAgICAgIGlmICghc3VwcG9ydC5jaGVjaygpLmFwaSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWJ1Zy5lcnJvcignU2V0dXAgZmFpbGVkOiBubyBzdXBwb3J0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENhY2hlIG9yaWdpbmFsIGVsZW1lbnQgc3RhdGUgZm9yIC5kZXN0cm95KClcclxuICAgICAgICAgICAgdmFyIGNsb25lID0gdGhpcy5tZWRpYS5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNsb25lLmF1dG9wbGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMub3JpZ2luYWwgPSBjbG9uZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBtZWRpYSB0eXBlIGJhc2VkIG9uIHRhZyBvciBkYXRhIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAvLyBTdXBwb3J0ZWQ6IHZpZGVvLCBhdWRpbywgdmltZW8sIHlvdXR1YmVcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSB0aGlzLm1lZGlhLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVtYmVkIHByb3BlcnRpZXNcclxuICAgICAgICAgICAgdmFyIGlmcmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy8gRGlmZmVyZW50IHNldHVwIGJhc2VkIG9uIHR5cGVcclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdkaXYnOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lID0gdGhpcy5tZWRpYS5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gPGlmcmFtZT4gdHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpcy5lbGVtZW50KGlmcmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGV0ZWN0IHByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHBhcnNlVXJsKGlmcmFtZS5nZXRBdHRyaWJ1dGUoJ3NyYycpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm92aWRlciA9IGdldFByb3ZpZGVyQnlVcmwodXJsLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV3b3JrIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyID0gdGhpcy5tZWRpYTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRpYSA9IGlmcmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IGNsYXNzbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lci5jbGFzc05hbWUgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCBhdHRyaWJ1dGVzIGZyb20gVVJMIGFuZCBzZXQgY29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwuc2VhcmNoUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRydXRoeSA9IFsnMScsICd0cnVlJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRydXRoeS5pbmNsdWRlcyh1cmwuc2VhcmNoUGFyYW1zLmdldCgnYXV0b3BsYXknKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5hdXRvcGxheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJ1dGh5LmluY2x1ZGVzKHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdsb29wJykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcubG9vcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHJlcGxhY2UgZnVsbHNjcmVlbi5pb3NOYXRpdmUgd2l0aCB0aGlzIHBsYXlzaW5saW5lIGNvbmZpZyBvcHRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFlvdVR1YmUgcmVxdWlyZXMgdGhlIHBsYXlzaW5saW5lIGluIHRoZSBVUkxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzWW91VHViZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnBsYXlzaW5saW5lID0gdHJ1dGh5LmluY2x1ZGVzKHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdwbGF5c2lubGluZScpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcucGxheXNpbmxpbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gPGRpdj4gd2l0aCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvdmlkZXIgPSB0aGlzLm1lZGlhLmdldEF0dHJpYnV0ZSh0aGlzLmNvbmZpZy5hdHRyaWJ1dGVzLmVtYmVkLnByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhdHRyaWJ1dGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRpYS5yZW1vdmVBdHRyaWJ1dGUodGhpcy5jb25maWcuYXR0cmlidXRlcy5lbWJlZC5wcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBVbnN1cHBvcnRlZCBvciBtaXNzaW5nIHByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzLmVtcHR5KHRoaXMucHJvdmlkZXIpIHx8ICFPYmplY3Qua2V5cyhwcm92aWRlcnMpLmluY2x1ZGVzKHRoaXMucHJvdmlkZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVidWcuZXJyb3IoJ1NldHVwIGZhaWxlZDogSW52YWxpZCBwcm92aWRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBdWRpbyB3aWxsIGNvbWUgbGF0ZXIgZm9yIGV4dGVybmFsIHByb3ZpZGVyc1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGVzLnZpZGVvO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd2aWRlbyc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdhdWRpbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3ZpZGVyID0gcHJvdmlkZXJzLmh0bWw1O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgY29uZmlnIGZyb20gYXR0cmlidXRlc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lZGlhLmhhc0F0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5jcm9zc29yaWdpbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lZGlhLmhhc0F0dHJpYnV0ZSgnYXV0b3BsYXknKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5hdXRvcGxheSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lZGlhLmhhc0F0dHJpYnV0ZSgncGxheXNpbmxpbmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5wbGF5c2lubGluZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lZGlhLmhhc0F0dHJpYnV0ZSgnbXV0ZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lZGlhLmhhc0F0dHJpYnV0ZSgnbG9vcCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmxvb3AuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWJ1Zy5lcnJvcignU2V0dXAgZmFpbGVkOiB1bnN1cHBvcnRlZCB0eXBlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBmb3Igc3VwcG9ydCBhZ2FpbiBidXQgd2l0aCB0eXBlXHJcbiAgICAgICAgICAgIHRoaXMuc3VwcG9ydGVkID0gc3VwcG9ydC5jaGVjayh0aGlzLnR5cGUsIHRoaXMucHJvdmlkZXIsIHRoaXMuY29uZmlnLnBsYXlzaW5saW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIG5vIHN1cHBvcnQgZm9yIGV2ZW4gQVBJLCBiYWlsXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdXBwb3J0ZWQuYXBpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLmVycm9yKCdTZXR1cCBmYWlsZWQ6IG5vIHN1cHBvcnQnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGxpc3RlbmVyc1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBMaXN0ZW5lcnModGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXR1cCBsb2NhbCBzdG9yYWdlIGZvciB1c2VyIHNldHRpbmdzXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yYWdlKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gU3RvcmUgcmVmZXJlbmNlXHJcbiAgICAgICAgICAgIHRoaXMubWVkaWEucGx5ciA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBXcmFwIG1lZGlhXHJcbiAgICAgICAgICAgIGlmICghaXMuZWxlbWVudCh0aGlzLmVsZW1lbnRzLmNvbnRhaW5lcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY29udGFpbmVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICB3cmFwKHRoaXMubWVkaWEsIHRoaXMuZWxlbWVudHMuY29udGFpbmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHN0eWxlIGhvb2tcclxuICAgICAgICAgICAgdWkuYWRkU3R5bGVIb29rLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXR1cCBtZWRpYVxyXG4gICAgICAgICAgICBtZWRpYS5zZXR1cC5jYWxsKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gTGlzdGVuIGZvciBldmVudHMgaWYgZGVidWdnaW5nXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgb24uY2FsbCh0aGlzLCB0aGlzLmVsZW1lbnRzLmNvbnRhaW5lciwgdGhpcy5jb25maWcuZXZlbnRzLmpvaW4oJyAnKSwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVidWcubG9nKCdldmVudDogJyArIGV2ZW50LnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldHVwIGludGVyZmFjZVxyXG4gICAgICAgICAgICAvLyBJZiBlbWJlZCBidXQgbm90IGZ1bGx5IHN1cHBvcnRlZCwgYnVpbGQgaW50ZXJmYWNlIG5vdyB0byBhdm9pZCBmbGFzaCBvZiBjb250cm9sc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0hUTUw1IHx8IHRoaXMuaXNFbWJlZCAmJiAhdGhpcy5zdXBwb3J0ZWQudWkpIHtcclxuICAgICAgICAgICAgICAgIHVpLmJ1aWxkLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbnRhaW5lciBsaXN0ZW5lcnNcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuY29udGFpbmVyKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBHbG9iYWwgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzLmdsb2JhbCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0dXAgZnVsbHNjcmVlblxyXG4gICAgICAgICAgICB0aGlzLmZ1bGxzY3JlZW4gPSBuZXcgRnVsbHNjcmVlbih0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldHVwIGFkcyBpZiBwcm92aWRlZFxyXG4gICAgICAgICAgICB0aGlzLmFkcyA9IG5ldyBBZHModGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBBdXRvcGxheSBpZiByZXF1aXJlZFxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcuYXV0b3BsYXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvLyBBUElcclxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHlwZXMgYW5kIHByb3ZpZGVyIGhlbHBlcnNcclxuICAgICAgICAgKi9cclxuXHJcblxyXG4gICAgICAgIGNyZWF0ZUNsYXNzKFBseXIsIFt7XHJcbiAgICAgICAgICAgIGtleTogJ3BsYXknLFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBQbGF5IHRoZSBtZWRpYSwgb3IgcGxheSB0aGUgYWR2ZXJ0aXNlbWVudCAoaWYgdGhleSBhcmUgbm90IGJsb2NrZWQpXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGxheSgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXMuZnVuY3Rpb24odGhpcy5tZWRpYS5wbGF5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgcHJvbWlzZSAoZm9yIEhUTUw1KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVkaWEucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUGF1c2UgdGhlIG1lZGlhXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3BhdXNlJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBhdXNlKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXlpbmcgfHwgIWlzLmZ1bmN0aW9uKHRoaXMubWVkaWEucGF1c2UpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubWVkaWEucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldCBwbGF5aW5nIHN0YXRlXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3RvZ2dsZVBsYXknLFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUb2dnbGUgcGxheWJhY2sgYmFzZWQgb24gY3VycmVudCBzdGF0dXNcclxuICAgICAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBpbnB1dFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZVBsYXkoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSBiYXNlZCBvbiBjdXJyZW50IHN0YXRlIGlmIG5vdGhpbmcgcGFzc2VkXHJcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gaXMuYm9vbGVhbihpbnB1dCkgPyBpbnB1dCA6ICF0aGlzLnBsYXlpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRvZ2dsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTdG9wIHBsYXliYWNrXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3N0b3AnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcCgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSFRNTDUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzLmZ1bmN0aW9uKHRoaXMubWVkaWEuc3RvcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lZGlhLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFJlc3RhcnQgcGxheWJhY2tcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAncmVzdGFydCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXN0YXJ0KCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBSZXdpbmRcclxuICAgICAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNlZWtUaW1lIC0gaG93IGZhciB0byByZXdpbmQgaW4gc2Vjb25kcy4gRGVmYXVsdHMgdG8gdGhlIGNvbmZpZy5zZWVrVGltZVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdyZXdpbmQnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmV3aW5kKHNlZWtUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gdGhpcy5jdXJyZW50VGltZSAtIChpcy5udW1iZXIoc2Vla1RpbWUpID8gc2Vla1RpbWUgOiB0aGlzLmNvbmZpZy5zZWVrVGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBGYXN0IGZvcndhcmRcclxuICAgICAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNlZWtUaW1lIC0gaG93IGZhciB0byBmYXN0IGZvcndhcmQgaW4gc2Vjb25kcy4gRGVmYXVsdHMgdG8gdGhlIGNvbmZpZy5zZWVrVGltZVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdmb3J3YXJkJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZvcndhcmQoc2Vla1RpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lICsgKGlzLm51bWJlcihzZWVrVGltZSkgPyBzZWVrVGltZSA6IHRoaXMuY29uZmlnLnNlZWtUaW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNlZWsgdG8gYSB0aW1lXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbnB1dCAtIHdoZXJlIHRvIHNlZWsgdG8gaW4gc2Vjb25kcy4gRGVmYXVsdHMgdG8gMCAodGhlIHN0YXJ0KVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdpbmNyZWFzZVZvbHVtZScsXHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEluY3JlYXNlIHZvbHVtZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN0ZXAgLSBIb3cgbXVjaCB0byBkZWNyZWFzZSBieSAoYmV0d2VlbiAwIGFuZCAxKVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluY3JlYXNlVm9sdW1lKHN0ZXApIHtcclxuICAgICAgICAgICAgICAgIHZhciB2b2x1bWUgPSB0aGlzLm1lZGlhLm11dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52b2x1bWUgPSB2b2x1bWUgKyAoaXMubnVtYmVyKHN0ZXApID8gc3RlcCA6IDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogRGVjcmVhc2Ugdm9sdW1lXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3RlcCAtIEhvdyBtdWNoIHRvIGRlY3JlYXNlIGJ5IChiZXR3ZWVuIDAgYW5kIDEpXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2RlY3JlYXNlVm9sdW1lJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlY3JlYXNlVm9sdW1lKHN0ZXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VWb2x1bWUoLXN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogU2V0IG11dGVkIHN0YXRlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbXV0ZVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICd0b2dnbGVDYXB0aW9ucycsXHJcblxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFRvZ2dsZSBjYXB0aW9uc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlucHV0IC0gV2hldGhlciB0byBlbmFibGUgY2FwdGlvbnNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0b2dnbGVDYXB0aW9ucyhpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbnMudG9nZ2xlLmNhbGwodGhpcywgaW5wdXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldCB0aGUgY2FwdGlvbiB0cmFjayBieSBpbmRleFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gLSBDYXB0aW9uIGluZGV4XHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2FpcnBsYXknLFxyXG5cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUcmlnZ2VyIHRoZSBhaXJwbGF5IGRpYWxvZ1xyXG4gICAgICAgICAgICAgKiBUT0RPOiB1cGRhdGUgcGxheWVyIHdpdGggc3RhdGUsIHN1cHBvcnQsIGVuYWJsZWRcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhaXJwbGF5KCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2hvdyBkaWFsb2cgaWYgc3VwcG9ydGVkXHJcbiAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydC5haXJwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRpYS53ZWJraXRTaG93UGxheWJhY2tUYXJnZXRQaWNrZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFRvZ2dsZSB0aGUgcGxheWVyIGNvbnRyb2xzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3RvZ2dsZV0gLSBXaGV0aGVyIHRvIHNob3cgdGhlIGNvbnRyb2xzXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3RvZ2dsZUNvbnRyb2xzJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvZ2dsZUNvbnRyb2xzKHRvZ2dsZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRG9uJ3QgdG9nZ2xlIGlmIG1pc3NpbmcgVUkgc3VwcG9ydCBvciBpZiBpdCdzIGF1ZGlvXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdXBwb3J0ZWQudWkgJiYgIXRoaXMuaXNBdWRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBzdGF0ZSBiZWZvcmUgY2hhbmdlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzSGlkZGVuID0gaGFzQ2xhc3ModGhpcy5lbGVtZW50cy5jb250YWluZXIsIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuaGlkZUNvbnRyb2xzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmVnYXRlIHRoZSBhcmd1bWVudCBpZiBub3QgdW5kZWZpbmVkIHNpbmNlIGFkZGluZyB0aGUgY2xhc3MgdG8gaGlkZXMgdGhlIGNvbnRyb2xzXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcmNlID0gdHlwZW9mIHRvZ2dsZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiAhdG9nZ2xlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBhbmQgZ2V0IHVwZGF0ZWQgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaGlkaW5nID0gdG9nZ2xlQ2xhc3ModGhpcy5lbGVtZW50cy5jb250YWluZXIsIHRoaXMuY29uZmlnLmNsYXNzTmFtZXMuaGlkZUNvbnRyb2xzLCBmb3JjZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENsb3NlIG1lbnVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGlkaW5nICYmIHRoaXMuY29uZmlnLmNvbnRyb2xzLmluY2x1ZGVzKCdzZXR0aW5ncycpICYmICFpcy5lbXB0eSh0aGlzLmNvbmZpZy5zZXR0aW5ncykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHMudG9nZ2xlTWVudS5jYWxsKHRoaXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBldmVudCBvbiBjaGFuZ2VcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGlkaW5nICE9PSBpc0hpZGRlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gaGlkaW5nID8gJ2NvbnRyb2xzaGlkZGVuJyA6ICdjb250cm9sc3Nob3duJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckV2ZW50LmNhbGwodGhpcywgdGhpcy5tZWRpYSwgZXZlbnROYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFoaWRpbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIEV2ZW50IHR5cGVcclxuICAgICAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFjayBmb3Igd2hlbiBldmVudCBvY2N1cnNcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnb24nLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb24kJDEoZXZlbnQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBvbi5jYWxsKHRoaXMsIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLCBldmVudCwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQWRkIGV2ZW50IGxpc3RlbmVycyBvbmNlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIEV2ZW50IHR5cGVcclxuICAgICAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFjayBmb3Igd2hlbiBldmVudCBvY2N1cnNcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnb25jZScsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbmNlJCQxKGV2ZW50LCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgb25jZS5jYWxsKHRoaXMsIHRoaXMuZWxlbWVudHMuY29udGFpbmVyLCBldmVudCwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgLSBFdmVudCB0eXBlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZm9yIHdoZW4gZXZlbnQgb2NjdXJzXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ29mZicsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvZmYkJDEoZXZlbnQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBvZmYodGhpcy5lbGVtZW50cy5jb250YWluZXIsIGV2ZW50LCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBEZXN0cm95IGFuIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAqIEV2ZW50IGxpc3RlbmVycyBhcmUgcmVtb3ZlZCB3aGVuIGVsZW1lbnRzIGFyZSByZW1vdmVkXHJcbiAgICAgICAgICAgICAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTI1MjgwNDkvaWYtYS1kb20tZWxlbWVudC1pcy1yZW1vdmVkLWFyZS1pdHMtbGlzdGVuZXJzLWFsc28tcmVtb3ZlZC1mcm9tLW1lbW9yeVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrIGZvciB3aGVuIGRlc3Ryb3kgaXMgY29tcGxldGVcclxuICAgICAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBzb2Z0IC0gV2hldGhlciBpdCdzIGEgc29mdCBkZXN0cm95IChmb3Igc291cmNlIGNoYW5nZXMgZXRjKVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdkZXN0cm95JyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzb2Z0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVhZHkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGRvbmUgPSBmdW5jdGlvbiBkb25lKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IG92ZXJmbG93IChpbmNhc2UgZGVzdHJveWVkIHdoaWxlIGluIGZ1bGxzY3JlZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBHQyBmb3IgZW1iZWRcclxuICAgICAgICAgICAgICAgICAgICBfdGhpczIuZW1iZWQgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBpdCdzIGEgc29mdCBkZXN0cm95LCBtYWtlIG1pbmltYWwgY2hhbmdlc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb2Z0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhfdGhpczIuZWxlbWVudHMpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVFbGVtZW50KF90aGlzMi5lbGVtZW50cy5idXR0b25zLnBsYXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRWxlbWVudChfdGhpczIuZWxlbWVudHMuY2FwdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRWxlbWVudChfdGhpczIuZWxlbWVudHMuY29udHJvbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRWxlbWVudChfdGhpczIuZWxlbWVudHMud3JhcHBlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xlYXIgZm9yIEdDXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuZWxlbWVudHMuYnV0dG9ucy5wbGF5ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5lbGVtZW50cy5jYXB0aW9ucyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuZWxlbWVudHMuY29udHJvbHMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmVsZW1lbnRzLndyYXBwZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXMuZnVuY3Rpb24oY2FsbGJhY2spKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVW5iaW5kIGxpc3RlbmVyc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmJpbmRMaXN0ZW5lcnMuY2FsbChfdGhpczIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVwbGFjZSB0aGUgY29udGFpbmVyIHdpdGggdGhlIG9yaWdpbmFsIGVsZW1lbnQgcHJvdmlkZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUVsZW1lbnQoX3RoaXMyLmVsZW1lbnRzLm9yaWdpbmFsLCBfdGhpczIuZWxlbWVudHMuY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKF90aGlzMiwgX3RoaXMyLmVsZW1lbnRzLm9yaWdpbmFsLCAnZGVzdHJveWVkJywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXMuZnVuY3Rpb24oY2FsbGJhY2spKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKF90aGlzMi5lbGVtZW50cy5vcmlnaW5hbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc2V0IHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5yZWFkeSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xlYXIgZm9yIGdhcmJhZ2UgY29sbGVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5lbGVtZW50cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIubWVkaWEgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3RvcCBwbGF5YmFja1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJvdmlkZXIgc3BlY2lmaWMgc3R1ZmZcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSFRNTDUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDbGVhciB0aW1lb3V0XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJzLmxvYWRpbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIG5hdGl2ZSB2aWRlbyBjb250cm9sc1xyXG4gICAgICAgICAgICAgICAgICAgIHVpLnRvZ2dsZU5hdGl2ZUNvbnRyb2xzLmNhbGwodGhpcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENsZWFuIHVwXHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzWW91VHViZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENsZWFyIHRpbWVyc1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcnMuYnVmZmVyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJzLnBsYXlpbmcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBEZXN0cm95IFlvdVR1YmUgQVBJXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1iZWQgIT09IG51bGwgJiYgaXMuZnVuY3Rpb24odGhpcy5lbWJlZC5kZXN0cm95KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtYmVkLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENsZWFuIHVwXHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzVmltZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBEZXN0cm95IFZpbWVvIEFQSVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZW4gY2xlYW4gdXAgKHdhaXQsIHRvIHByZXZlbnQgcG9zdG1lc3NhZ2UgZXJyb3JzKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVtYmVkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1iZWQudW5sb2FkKCkudGhlbihkb25lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZpbWVvIGRvZXMgbm90IGFsd2F5cyByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGRvbmUsIDIwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDaGVjayBmb3Igc3VwcG9ydCBmb3IgYSBtaW1lIHR5cGUgKEhUTUw1IG9ubHkpXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTWltZSB0eXBlXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3N1cHBvcnRzJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN1cHBvcnRzKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0Lm1pbWUuY2FsbCh0aGlzLCB0eXBlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIENoZWNrIGZvciBzdXBwb3J0XHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gUGxheWVyIHR5cGUgKGF1ZGlvL3ZpZGVvKVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvdmlkZXIgLSBQcm92aWRlciAoaHRtbDUveW91dHViZS92aW1lbylcclxuICAgICAgICAgICAgICogQHBhcmFtIHtib29sfSBpbmxpbmUgLSBXaGVyZSBwbGF5ZXIgaGFzIGBwbGF5c2lubGluZWAgc3R0cmlidXRlXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2lzSFRNTDUnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMucHJvdmlkZXIgPT09IHByb3ZpZGVycy5odG1sNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2lzRW1iZWQnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuaXNZb3VUdWJlIHx8IHRoaXMuaXNWaW1lbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2lzWW91VHViZScsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5wcm92aWRlciA9PT0gcHJvdmlkZXJzLnlvdXR1YmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdpc1ZpbWVvJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnByb3ZpZGVyID09PSBwcm92aWRlcnMudmltZW8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdpc1ZpZGVvJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnR5cGUgPT09IHR5cGVzLnZpZGVvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnaXNBdWRpbycsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy50eXBlID09PSB0eXBlcy5hdWRpbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3BsYXlpbmcnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMucmVhZHkgJiYgIXRoaXMucGF1c2VkICYmICF0aGlzLmVuZGVkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldCBwYXVzZWQgc3RhdGVcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAncGF1c2VkJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLm1lZGlhLnBhdXNlZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBHZXQgc3RvcHBlZCBzdGF0ZVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdzdG9wcGVkJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnBhdXNlZCAmJiB0aGlzLmN1cnJlbnRUaW1lID09PSAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldCBlbmRlZCBzdGF0ZVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdlbmRlZCcsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5tZWRpYS5lbmRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2N1cnJlbnRUaW1lJyxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEJhaWwgaWYgbWVkaWEgZHVyYXRpb24gaXNuJ3QgYXZhaWxhYmxlIHlldFxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFZhbGlkYXRlIGlucHV0XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXRJc1ZhbGlkID0gaXMubnVtYmVyKGlucHV0KSAmJiBpbnB1dCA+IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhLmN1cnJlbnRUaW1lID0gaW5wdXRJc1ZhbGlkID8gTWF0aC5taW4oaW5wdXQsIHRoaXMuZHVyYXRpb24pIDogMDtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMb2dnaW5nXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLmxvZygnU2Vla2luZyB0byAnICsgdGhpcy5jdXJyZW50VGltZSArICcgc2Vjb25kcycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogR2V0IGN1cnJlbnQgdGltZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5tZWRpYS5jdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBHZXQgYnVmZmVyZWRcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnYnVmZmVyZWQnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBidWZmZXJlZCA9IHRoaXMubWVkaWEuYnVmZmVyZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gWW91VHViZSAvIFZpbWVvIHJldHVybiBhIGZsb2F0IGJldHdlZW4gMC0xXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzLm51bWJlcihidWZmZXJlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSFRNTDVcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IEhhbmRsZSBidWZmZXJlZCBjaHVua3Mgb2YgdGhlIG1lZGlhXHJcbiAgICAgICAgICAgICAgICAvLyAoaS5lLiBzZWVrIHRvIGFub3RoZXIgc2VjdGlvbiBidWZmZXJzIG9ubHkgdGhhdCBzZWN0aW9uKVxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZlcmVkICYmIGJ1ZmZlcmVkLmxlbmd0aCAmJiB0aGlzLmR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXJlZC5lbmQoMCkgLyB0aGlzLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogR2V0IHNlZWtpbmcgc3RhdHVzXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3NlZWtpbmcnLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMubWVkaWEuc2Vla2luZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBHZXQgdGhlIGR1cmF0aW9uIG9mIHRoZSBjdXJyZW50IG1lZGlhXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2R1cmF0aW9uJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGYXV4IGR1cmF0aW9uIHNldCB2aWEgY29uZmlnXHJcbiAgICAgICAgICAgICAgICB2YXIgZmF1eER1cmF0aW9uID0gcGFyc2VGbG9hdCh0aGlzLmNvbmZpZy5kdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWVkaWEgZHVyYXRpb24gY2FuIGJlIE5hTiBvciBJbmZpbml0eSBiZWZvcmUgdGhlIG1lZGlhIGhhcyBsb2FkZWRcclxuICAgICAgICAgICAgICAgIHZhciByZWFsRHVyYXRpb24gPSAodGhpcy5tZWRpYSB8fCB7fSkuZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICB2YXIgZHVyYXRpb24gPSAhaXMubnVtYmVyKHJlYWxEdXJhdGlvbikgfHwgcmVhbER1cmF0aW9uID09PSBJbmZpbml0eSA/IDAgOiByZWFsRHVyYXRpb247XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgY29uZmlnIGR1cmF0aW9uIGlzIGZ1bmt5LCB1c2UgcmVndWxhciBkdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhdXhEdXJhdGlvbiB8fCBkdXJhdGlvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldCB0aGUgcGxheWVyIHZvbHVtZVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMS4gRGVmYXVsdHMgdG8gdGhlIHZhbHVlIGZyb20gbG9jYWwgc3RvcmFnZSBhbmQgY29uZmlnLnZvbHVtZSBpZiBub3Qgc2V0IGluIHN0b3JhZ2VcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAndm9sdW1lJyxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2b2x1bWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHZhciBtYXggPSAxO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1pbiA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzLnN0cmluZyh2b2x1bWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm9sdW1lID0gTnVtYmVyKHZvbHVtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTG9hZCB2b2x1bWUgZnJvbSBzdG9yYWdlIGlmIG5vIHZhbHVlIHNwZWNpZmllZFxyXG4gICAgICAgICAgICAgICAgaWYgKCFpcy5udW1iZXIodm9sdW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZvbHVtZSA9IHRoaXMuc3RvcmFnZS5nZXQoJ3ZvbHVtZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVzZSBjb25maWcgaWYgYWxsIGVsc2UgZmFpbHNcclxuICAgICAgICAgICAgICAgIGlmICghaXMubnVtYmVyKHZvbHVtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2b2x1bWUgPSB0aGlzLmNvbmZpZy52b2x1bWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTWF4aW11bSBpcyB2b2x1bWVNYXhcclxuICAgICAgICAgICAgICAgIGlmICh2b2x1bWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2b2x1bWUgPSBtYXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBNaW5pbXVtIGlzIHZvbHVtZU1pblxyXG4gICAgICAgICAgICAgICAgaWYgKHZvbHVtZSA8IG1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZvbHVtZSA9IG1pbjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY29uZmlnXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy52b2x1bWUgPSB2b2x1bWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBwbGF5ZXIgdm9sdW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhLnZvbHVtZSA9IHZvbHVtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBtdXRlZCwgYW5kIHdlJ3JlIGluY3JlYXNpbmcgdm9sdW1lIG1hbnVhbGx5LCByZXNldCBtdXRlZCBzdGF0ZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpcy5lbXB0eSh2YWx1ZSkgJiYgdGhpcy5tdXRlZCAmJiB2b2x1bWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogR2V0IHRoZSBjdXJyZW50IHBsYXllciB2b2x1bWVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMubWVkaWEudm9sdW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnbXV0ZWQnLFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMShtdXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gbXV0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMb2FkIG11dGVkIHN0YXRlIGZyb20gc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpcy5ib29sZWFuKHRvZ2dsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGUgPSB0aGlzLnN0b3JhZ2UuZ2V0KCdtdXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVzZSBjb25maWcgaWYgYWxsIGVsc2UgZmFpbHNcclxuICAgICAgICAgICAgICAgIGlmICghaXMuYm9vbGVhbih0b2dnbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlID0gdGhpcy5jb25maWcubXV0ZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcubXV0ZWQgPSB0b2dnbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IG11dGUgb24gdGhlIHBsYXllclxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYS5tdXRlZCA9IHRvZ2dsZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldCBjdXJyZW50IG11dGVkIHN0YXRlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5tZWRpYS5tdXRlZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDaGVjayBpZiB0aGUgbWVkaWEgaGFzIGF1ZGlvXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2hhc0F1ZGlvJyxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBc3N1bWUgeWVzIGZvciBhbGwgbm9uIEhUTUw1IChhcyB3ZSBjYW4ndCB0ZWxsLi4uKVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzSFRNTDUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0F1ZGlvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGF1ZGlvIHRyYWNrc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5tZWRpYS5tb3pIYXNBdWRpbykgfHwgQm9vbGVhbih0aGlzLm1lZGlhLndlYmtpdEF1ZGlvRGVjb2RlZEJ5dGVDb3VudCkgfHwgQm9vbGVhbih0aGlzLm1lZGlhLmF1ZGlvVHJhY2tzICYmIHRoaXMubWVkaWEuYXVkaW9UcmFja3MubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldCBwbGF5YmFjayBzcGVlZFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWQgLSB0aGUgc3BlZWQgb2YgcGxheWJhY2sgKDAuNS0yLjApXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3NwZWVkJyxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzcGVlZCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzLm51bWJlcihpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZCA9IGlucHV0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXMubnVtYmVyKHNwZWVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkID0gdGhpcy5zdG9yYWdlLmdldCgnc3BlZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzLm51bWJlcihzcGVlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZCA9IHRoaXMuY29uZmlnLnNwZWVkLnNlbGVjdGVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBtaW4vbWF4XHJcbiAgICAgICAgICAgICAgICBpZiAoc3BlZWQgPCAwLjEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGVlZCA9IDAuMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChzcGVlZCA+IDIuMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkID0gMi4wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb25maWcuc3BlZWQub3B0aW9ucy5pbmNsdWRlcyhzcGVlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLndhcm4oJ1Vuc3VwcG9ydGVkIHNwZWVkICgnICsgc3BlZWQgKyAnKScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY29uZmlnXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zcGVlZC5zZWxlY3RlZCA9IHNwZWVkO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBtZWRpYSBzcGVlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZWRpYS5wbGF5YmFja1JhdGUgPSBzcGVlZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldCBjdXJyZW50IHBsYXliYWNrIHNwZWVkXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLm1lZGlhLnBsYXliYWNrUmF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXQgcGxheWJhY2sgcXVhbGl0eVxyXG4gICAgICAgICAgICAgKiBDdXJyZW50bHkgSFRNTDUgJiBZb3VUdWJlIG9ubHlcclxuICAgICAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGlucHV0IC0gUXVhbGl0eSBsZXZlbFxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdxdWFsaXR5JyxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZy5xdWFsaXR5O1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMucXVhbGl0eTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBxdWFsaXR5ID0gWyFpcy5lbXB0eShpbnB1dCkgJiYgTnVtYmVyKGlucHV0KSwgdGhpcy5zdG9yYWdlLmdldCgncXVhbGl0eScpLCBjb25maWcuc2VsZWN0ZWQsIGNvbmZpZy5kZWZhdWx0XS5maW5kKGlzLm51bWJlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLmluY2x1ZGVzKHF1YWxpdHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY2xvc2VzdChvcHRpb25zLCBxdWFsaXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLndhcm4oJ1Vuc3VwcG9ydGVkIHF1YWxpdHkgb3B0aW9uOiAnICsgcXVhbGl0eSArICcsIHVzaW5nICcgKyB2YWx1ZSArICcgaW5zdGVhZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHJlcXVlc3QgZXZlbnRcclxuICAgICAgICAgICAgICAgIHRyaWdnZXJFdmVudC5jYWxsKHRoaXMsIHRoaXMubWVkaWEsICdxdWFsaXR5cmVxdWVzdGVkJywgZmFsc2UsIHsgcXVhbGl0eTogcXVhbGl0eSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgY29uZmlnXHJcbiAgICAgICAgICAgICAgICBjb25maWcuc2VsZWN0ZWQgPSBxdWFsaXR5O1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFNldCBxdWFsaXR5XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhLnF1YWxpdHkgPSBxdWFsaXR5O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogR2V0IGN1cnJlbnQgcXVhbGl0eSBsZXZlbFxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lZGlhLnF1YWxpdHk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUb2dnbGUgbG9vcFxyXG4gICAgICAgICAgICAgKiBUT0RPOiBGaW5pc2ggZmFuY3kgbmV3IGxvZ2ljLiBTZXQgdGhlIGluZGljYXRvciBvbiBsb2FkIGFzIHVzZXIgbWF5IHBhc3MgbG9vcCBhcyBjb25maWdcclxuICAgICAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBpbnB1dCAtIFdoZXRoZXIgdG8gbG9vcCBvciBub3RcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnbG9vcCcsXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gaXMuYm9vbGVhbihpbnB1dCkgPyBpbnB1dCA6IHRoaXMuY29uZmlnLmxvb3AuYWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcubG9vcC5hY3RpdmUgPSB0b2dnbGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhLmxvb3AgPSB0b2dnbGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGRlZmF1bHQgdG8gYmUgYSB0cnVlIHRvZ2dsZVxyXG4gICAgICAgICAgICAgICAgLyogY29uc3QgdHlwZSA9IFsnc3RhcnQnLCAnZW5kJywgJ2FsbCcsICdub25lJywgJ3RvZ2dsZSddLmluY2x1ZGVzKGlucHV0KSA/IGlucHV0IDogJ3RvZ2dsZSc7XHJcbiAgICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcubG9vcC5lbmQgJiYgdGhpcy5jb25maWcubG9vcC5lbmQgPD0gdGhpcy5jdXJyZW50VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcubG9vcC5lbmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmxvb3Auc3RhcnQgPSB0aGlzLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNvbmZpZy5sb29wLmluZGljYXRvci5zdGFydCA9IHRoaXMuZWxlbWVudHMuZGlzcGxheS5wbGF5ZWQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcubG9vcC5zdGFydCA+PSB0aGlzLmN1cnJlbnRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5sb29wLmVuZCA9IHRoaXMuY3VycmVudFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY29uZmlnLmxvb3AuaW5kaWNhdG9yLmVuZCA9IHRoaXMuZWxlbWVudHMuZGlzcGxheS5wbGF5ZWQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICBjYXNlICdhbGwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5sb29wLnN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcubG9vcC5lbmQgPSB0aGlzLmR1cmF0aW9uIC0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcubG9vcC5pbmRpY2F0b3Iuc3RhcnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5sb29wLmluZGljYXRvci5lbmQgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICBjYXNlICd0b2dnbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcubG9vcC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmxvb3Auc3RhcnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcubG9vcC5lbmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcubG9vcC5zdGFydCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5sb29wLmVuZCA9IHRoaXMuZHVyYXRpb24gLSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5sb29wLnN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcubG9vcC5lbmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH0gKi9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldCBjdXJyZW50IGxvb3Agc3RhdGVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLm1lZGlhLmxvb3ApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogU2V0IG5ldyBtZWRpYSBzb3VyY2VcclxuICAgICAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGlucHV0IC0gVGhlIG5ldyBzb3VyY2Ugb2JqZWN0IChzZWUgZG9jcylcclxuICAgICAgICAgICAgICovXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnc291cmNlJyxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5jaGFuZ2UuY2FsbCh0aGlzLCBpbnB1dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBHZXQgY3VycmVudCBzb3VyY2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tZWRpYS5jdXJyZW50U3JjO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogU2V0IHRoZSBwb3N0ZXIgaW1hZ2UgZm9yIGEgdmlkZW9cclxuICAgICAgICAgICAgICogQHBhcmFtIHtpbnB1dH0gLSB0aGUgVVJMIGZvciB0aGUgbmV3IHBvc3RlciBpbWFnZVxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdwb3N0ZXInLFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMShpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmlkZW8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYnVnLndhcm4oJ1Bvc3RlciBjYW4gb25seSBiZSBzZXQgZm9yIHZpZGVvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHVpLnNldFBvc3Rlci5jYWxsKHRoaXMsIGlucHV0LCBmYWxzZSkuY2F0Y2goZnVuY3Rpb24gKCkgeyB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldCB0aGUgY3VycmVudCBwb3N0ZXIgaW1hZ2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWaWRlbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lZGlhLmdldEF0dHJpYnV0ZSgncG9zdGVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXQgdGhlIGF1dG9wbGF5IHN0YXRlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5wdXQgLSBXaGV0aGVyIHRvIGF1dG9wbGF5IG9yIG5vdFxyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdhdXRvcGxheScsXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlID0gaXMuYm9vbGVhbihpbnB1dCkgPyBpbnB1dCA6IHRoaXMuY29uZmlnLmF1dG9wbGF5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuYXV0b3BsYXkgPSB0b2dnbGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnQgYXV0b3BsYXkgc3RhdGVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmNvbmZpZy5hdXRvcGxheSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2N1cnJlbnRUcmFjaycsXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9ucy5zZXQuY2FsbCh0aGlzLCBpbnB1dCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogR2V0IHRoZSBjdXJyZW50IGNhcHRpb24gdHJhY2sgaW5kZXggKC0xIGlmIGRpc2FibGVkKVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfY2FwdGlvbnMgPSB0aGlzLmNhcHRpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZWQgPSBfY2FwdGlvbnMudG9nZ2xlZCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHJhY2sgPSBfY2FwdGlvbnMuY3VycmVudFRyYWNrO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2dnbGVkID8gY3VycmVudFRyYWNrIDogLTE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXQgdGhlIHdhbnRlZCBsYW5ndWFnZSBmb3IgY2FwdGlvbnNcclxuICAgICAgICAgICAgICogU2luY2UgdHJhY2tzIGNhbiBiZSBhZGRlZCBsYXRlciBpdCB3b24ndCB1cGRhdGUgdGhlIGFjdHVhbCBjYXB0aW9uIHRyYWNrIHVudGlsIHRoZXJlIGlzIGEgbWF0Y2hpbmcgdHJhY2tcclxuICAgICAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IC0gVHdvIGNoYXJhY3RlciBJU08gbGFuZ3VhZ2UgY29kZSAoZS5nLiBFTiwgRlIsIFBULCBldGMpXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2xhbmd1YWdlJyxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25zLnNldExhbmd1YWdlLmNhbGwodGhpcywgaW5wdXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEdldCB0aGUgY3VycmVudCB0cmFjaydzIGxhbmd1YWdlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChjYXB0aW9ucy5nZXRDdXJyZW50VHJhY2suY2FsbCh0aGlzKSB8fCB7fSkubGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBUb2dnbGUgcGljdHVyZS1pbi1waWN0dXJlIHBsYXliYWNrIG9uIFdlYktpdC9NYWNPU1xyXG4gICAgICAgICAgICAgKiBUT0RPOiB1cGRhdGUgcGxheWVyIHdpdGggc3RhdGUsIHN1cHBvcnQsIGVuYWJsZWRcclxuICAgICAgICAgICAgICogVE9ETzogZGV0ZWN0IG91dHNpZGUgY2hhbmdlc1xyXG4gICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBrZXk6ICdwaXAnLFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMShpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwaXA6ICdwaWN0dXJlLWluLXBpY3R1cmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIGlubGluZTogJ2lubGluZSdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmFpbCBpZiBubyBzdXBwb3J0XHJcbiAgICAgICAgICAgICAgICBpZiAoIXN1cHBvcnQucGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSBiYXNlZCBvbiBjdXJyZW50IHN0YXRlIGlmIG5vdCBwYXNzZWRcclxuICAgICAgICAgICAgICAgIHZhciB0b2dnbGUgPSBpcy5ib29sZWFuKGlucHV0KSA/IGlucHV0IDogdGhpcy5waXAgPT09IHN0YXRlcy5pbmxpbmU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVG9nZ2xlIGJhc2VkIG9uIGN1cnJlbnQgc3RhdGVcclxuICAgICAgICAgICAgICAgIHRoaXMubWVkaWEud2Via2l0U2V0UHJlc2VudGF0aW9uTW9kZSh0b2dnbGUgPyBzdGF0ZXMucGlwIDogc3RhdGVzLmlubGluZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnQgcGljdHVyZS1pbi1waWN0dXJlIHN0YXRlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzdXBwb3J0LnBpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1lZGlhLndlYmtpdFByZXNlbnRhdGlvbk1vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XSwgW3tcclxuICAgICAgICAgICAga2V5OiAnc3VwcG9ydGVkJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN1cHBvcnRlZCh0eXBlLCBwcm92aWRlciwgaW5saW5lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydC5jaGVjayh0eXBlLCBwcm92aWRlciwgaW5saW5lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIExvYWQgYW4gU1ZHIHNwcml0ZSBpbnRvIHRoZSBwYWdlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSBVUkwgZm9yIHRoZSBTVkcgc3ByaXRlXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbaWRdIC0gVW5pcXVlIElEXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ2xvYWRTcHJpdGUnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZFNwcml0ZSQkMSh1cmwsIGlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZFNwcml0ZSh1cmwsIGlkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFNldHVwIG11bHRpcGxlIGluc3RhbmNlc1xyXG4gICAgICAgICAgICAgKiBAcGFyYW0geyp9IHNlbGVjdG9yXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3NldHVwJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldHVwKHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpcy5zdHJpbmcoc2VsZWN0b3IpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpcy5ub2RlTGlzdChzZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzID0gQXJyYXkuZnJvbShzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzLmFycmF5KHNlbGVjdG9yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldHMgPSBzZWxlY3Rvci5maWx0ZXIoaXMuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzLmVtcHR5KHRhcmdldHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldHMubWFwKGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQbHlyKHQsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XSk7XHJcbiAgICAgICAgcmV0dXJuIFBseXI7XHJcbiAgICB9KCk7XHJcblxyXG4gICAgUGx5ci5kZWZhdWx0cyA9IGNsb25lRGVlcChkZWZhdWx0cyQxKTtcclxuXHJcbiAgICByZXR1cm4gUGx5cjtcclxuXHJcbn0pKSk7XHJcblxyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wbHlyLmpzLm1hcCJdfQ==
