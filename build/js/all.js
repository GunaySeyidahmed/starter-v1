(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './foundation'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./foundation'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.foundation);
    global.component = mod.exports;
  }
})(this, function (module, exports, _foundation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _foundation2 = _interopRequireDefault(_foundation);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var MDCComponent = function () {
    _createClass(MDCComponent, null, [{
      key: 'attachTo',
      value: function attachTo(root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new _foundation2.default());
      }
    }]);

    /**
     * @param {!Element} root
     * @param {F=} foundation
     * @param {...?} args
     */
    function MDCComponent(root) {
      var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      _classCallCheck(this, MDCComponent);

      /** @protected {!Element} */
      this.root_ = root;

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      this.initialize.apply(this, args);
      // Note that we initialize foundation here and not within the constructor's default param so that
      // this.root_ is defined and can be used within the foundation class.
      /** @protected {!F} */
      this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
      this.foundation_.init();
      this.initialSyncWithDOM();
    }

    _createClass(MDCComponent, [{
      key: 'initialize',
      value: function initialize() /* ...args */{}
    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        // Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation_.destroy();
      }
    }, {
      key: 'listen',
      value: function listen(evtType, handler) {
        this.root_.addEventListener(evtType, handler);
      }
    }, {
      key: 'unlisten',
      value: function unlisten(evtType, handler) {
        this.root_.removeEventListener(evtType, handler);
      }
    }, {
      key: 'emit',
      value: function emit(evtType, evtData) {
        var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var evt = void 0;
        if (typeof CustomEvent === 'function') {
          evt = new CustomEvent(evtType, {
            detail: evtData,
            bubbles: shouldBubble
          });
        } else {
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }

        this.root_.dispatchEvent(evt);
      }
    }]);

    return MDCComponent;
  }();

  exports.default = MDCComponent;
  module.exports = exports['default'];
});

},{"./foundation":2}],2:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.foundation = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var MDCFoundation = function () {
    _createClass(MDCFoundation, null, [{
      key: "cssClasses",
      get: function get() {
        // Classes extending MDCFoundation should implement this method to return an object which exports every
        // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
        return {};
      }
    }, {
      key: "strings",
      get: function get() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
        return {};
      }
    }, {
      key: "numbers",
      get: function get() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
        return {};
      }
    }, {
      key: "defaultAdapter",
      get: function get() {
        // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
        // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
        // validation.
        return {};
      }
    }]);

    /**
     * @param {A=} adapter
     */
    function MDCFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, MDCFoundation);

      /** @protected {!A} */
      this.adapter_ = adapter;
    }

    _createClass(MDCFoundation, [{
      key: "init",
      value: function init() {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
      }
    }, {
      key: "destroy",
      value: function destroy() {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
      }
    }]);

    return MDCFoundation;
  }();

  exports.default = MDCFoundation;
  module.exports = exports["default"];
});

},{}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.adapter = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var MDCRippleAdapter = function () {
    function MDCRippleAdapter() {
      _classCallCheck(this, MDCRippleAdapter);
    }

    _createClass(MDCRippleAdapter, [{
      key: "browserSupportsCssVars",
      value: function browserSupportsCssVars() {}
    }, {
      key: "isUnbounded",
      value: function isUnbounded() {}
    }, {
      key: "isSurfaceActive",
      value: function isSurfaceActive() {}
    }, {
      key: "isSurfaceDisabled",
      value: function isSurfaceDisabled() {}
    }, {
      key: "addClass",
      value: function addClass(className) {}
    }, {
      key: "removeClass",
      value: function removeClass(className) {}
    }, {
      key: "containsEventTarget",
      value: function containsEventTarget(target) {}
    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}
    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}
    }, {
      key: "registerDocumentInteractionHandler",
      value: function registerDocumentInteractionHandler(evtType, handler) {}
    }, {
      key: "deregisterDocumentInteractionHandler",
      value: function deregisterDocumentInteractionHandler(evtType, handler) {}
    }, {
      key: "registerResizeHandler",
      value: function registerResizeHandler(handler) {}
    }, {
      key: "deregisterResizeHandler",
      value: function deregisterResizeHandler(handler) {}
    }, {
      key: "updateCssVariable",
      value: function updateCssVariable(varName, value) {}
    }, {
      key: "computeBoundingRect",
      value: function computeBoundingRect() {}
    }, {
      key: "getWindowPageOffset",
      value: function getWindowPageOffset() {}
    }]);

    return MDCRippleAdapter;
  }();

  exports.default = MDCRippleAdapter;
  module.exports = exports["default"];
});

},{}],4:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.constants = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
  };

  var strings = {
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
  };

  var numbers = {
    PADDING: 10,
    INITIAL_ORIGIN_SCALE: 0.6,
    DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
    FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
    TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
  };

  exports.cssClasses = cssClasses;
  exports.strings = strings;
  exports.numbers = numbers;
});

},{}],5:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '@material/base/foundation', './adapter', './constants', './util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('@material/base/foundation'), require('./adapter'), require('./constants'), require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.foundation, global.adapter, global.constants, global.util);
    global.foundation = mod.exports;
  }
})(this, function (module, exports, _foundation, _adapter, _constants, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _foundation2 = _interopRequireDefault(_foundation);

  var _adapter2 = _interopRequireDefault(_adapter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _createClass = function () {
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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  /**
   * @typedef {{
   *   isActivated: (boolean|undefined),
   *   hasDeactivationUXRun: (boolean|undefined),
   *   wasActivatedByPointer: (boolean|undefined),
   *   wasElementMadeActive: (boolean|undefined),
   *   activationEvent: (!Event|undefined),
   *   isProgrammatic: (boolean|undefined)
   * }}
   */
  var ActivationStateType = void 0;

  /**
   * @typedef {{
   *   activate: (string|undefined),
   *   deactivate: (string|undefined),
   *   focus: (string|undefined),
   *   blur: (string|undefined)
   * }}
   */
  var ListenerInfoType = void 0;

  /**
   * @typedef {{
   *   activate: function(!Event),
   *   deactivate: function(!Event=),
   *   focus: function(),
   *   blur: function()
   * }}
   */
  var ListenersType = void 0;

  /**
   * @typedef {{
   *   x: number,
   *   y: number
   * }}
   */
  var PointType = void 0;

  // Activation events registered on the root element of each instance for activation
  var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

  // Deactivation events registered on documentElement when a pointer-related down event occurs
  var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

  // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
  /** @type {!Array<!EventTarget>} */
  var activatedTargets = [];

  /**
   * @extends {MDCFoundation<!MDCRippleAdapter>}
   */

  var MDCRippleFoundation = function (_MDCFoundation) {
    _inherits(MDCRippleFoundation, _MDCFoundation);

    _createClass(MDCRippleFoundation, null, [{
      key: 'cssClasses',
      get: function get() {
        return _constants.cssClasses;
      }
    }, {
      key: 'strings',
      get: function get() {
        return _constants.strings;
      }
    }, {
      key: 'numbers',
      get: function get() {
        return _constants.numbers;
      }
    }, {
      key: 'defaultAdapter',
      get: function get() {
        return {
          browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
          isUnbounded: function isUnbounded() /* boolean */{},
          isSurfaceActive: function isSurfaceActive() /* boolean */{},
          isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
          registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
          computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
          getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
        };
      }
    }]);

    function MDCRippleFoundation(adapter) {
      _classCallCheck(this, MDCRippleFoundation);

      var _this = _possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, Object.assign(MDCRippleFoundation.defaultAdapter, adapter)));

      /** @private {number} */
      _this.layoutFrame_ = 0;

      /** @private {!ClientRect} */
      _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

      /** @private {!ActivationStateType} */
      _this.activationState_ = _this.defaultActivationState_();

      /** @private {number} */
      _this.initialSize_ = 0;

      /** @private {number} */
      _this.maxRadius_ = 0;

      /** @private {function(!Event)} */
      _this.activateHandler_ = function (e) {
        return _this.activate_(e);
      };

      /** @private {function(!Event=)} */
      _this.deactivateHandler_ = function () {
        return _this.deactivate_();
      };

      /** @private {function(!Event=)} */
      _this.focusHandler_ = function () {
        return _this.handleFocus();
      };

      /** @private {function(!Event=)} */
      _this.blurHandler_ = function () {
        return _this.handleBlur();
      };

      /** @private {!Function} */
      _this.resizeHandler_ = function () {
        return _this.layout();
      };

      /** @private {{left: number, top:number}} */
      _this.unboundedCoords_ = {
        left: 0,
        top: 0
      };

      /** @private {number} */
      _this.fgScale_ = 0;

      /** @private {number} */
      _this.activationTimer_ = 0;

      /** @private {number} */
      _this.fgDeactivationRemovalTimer_ = 0;

      /** @private {boolean} */
      _this.activationAnimationHasEnded_ = false;

      /** @private {!Function} */
      _this.activationTimerCallback_ = function () {
        _this.activationAnimationHasEnded_ = true;
        _this.runDeactivationUXLogicIfReady_();
      };

      /** @private {!Event|undefined} */
      _this.previousActivationEvent_;
      return _this;
    }

    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     * @return {boolean}
     * @private
     */


    _createClass(MDCRippleFoundation, [{
      key: 'supportsPressRipple_',
      value: function supportsPressRipple_() {
        return this.adapter_.browserSupportsCssVars();
      }
    }, {
      key: 'defaultActivationState_',
      value: function defaultActivationState_() {
        return {
          isActivated: false,
          hasDeactivationUXRun: false,
          wasActivatedByPointer: false,
          wasElementMadeActive: false,
          activationEvent: undefined,
          isProgrammatic: false
        };
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        var supportsPressRipple = this.supportsPressRipple_();

        this.registerRootHandlers_(supportsPressRipple);

        if (supportsPressRipple) {
          var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
              ROOT = _MDCRippleFoundation$.ROOT,
              UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

          requestAnimationFrame(function () {
            _this2.adapter_.addClass(ROOT);
            if (_this2.adapter_.isUnbounded()) {
              _this2.adapter_.addClass(UNBOUNDED);
              // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
              _this2.layoutInternal_();
            }
          });
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        if (this.supportsPressRipple_()) {
          if (this.activationTimer_) {
            clearTimeout(this.activationTimer_);
            this.activationTimer_ = 0;
            this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
          }

          if (this.fgDeactivationRemovalTimer_) {
            clearTimeout(this.fgDeactivationRemovalTimer_);
            this.fgDeactivationRemovalTimer_ = 0;
            this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
          }

          var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
              ROOT = _MDCRippleFoundation$2.ROOT,
              UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

          requestAnimationFrame(function () {
            _this3.adapter_.removeClass(ROOT);
            _this3.adapter_.removeClass(UNBOUNDED);
            _this3.removeCssVars_();
          });
        }

        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();
      }
    }, {
      key: 'registerRootHandlers_',
      value: function registerRootHandlers_(supportsPressRipple) {
        var _this4 = this;

        if (supportsPressRipple) {
          ACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
          });
          if (this.adapter_.isUnbounded()) {
            this.adapter_.registerResizeHandler(this.resizeHandler_);
          }
        }

        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
      }
    }, {
      key: 'registerDeactivationHandlers_',
      value: function registerDeactivationHandlers_(e) {
        var _this5 = this;

        if (e.type === 'keydown') {
          this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
        } else {
          POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
          });
        }
      }
    }, {
      key: 'deregisterRootHandlers_',
      value: function deregisterRootHandlers_() {
        var _this6 = this;

        ACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
        });
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        }
      }
    }, {
      key: 'deregisterDeactivationHandlers_',
      value: function deregisterDeactivationHandlers_() {
        var _this7 = this;

        this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
        });
      }
    }, {
      key: 'removeCssVars_',
      value: function removeCssVars_() {
        var _this8 = this;

        var strings = MDCRippleFoundation.strings;

        Object.keys(strings).forEach(function (k) {
          if (k.indexOf('VAR_') === 0) {
            _this8.adapter_.updateCssVariable(strings[k], null);
          }
        });
      }
    }, {
      key: 'activate_',
      value: function activate_(e) {
        var _this9 = this;

        if (this.adapter_.isSurfaceDisabled()) {
          return;
        }

        var activationState = this.activationState_;
        if (activationState.isActivated) {
          return;
        }

        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent_;
        var isSameInteraction = previousActivationEvent && e !== undefined && previousActivationEvent.type !== e.type;
        if (isSameInteraction) {
          return;
        }

        activationState.isActivated = true;
        activationState.isProgrammatic = e === undefined;
        activationState.activationEvent = e;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e !== undefined && (e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown');

        var hasActivatedChild = e !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
          return _this9.adapter_.containsEventTarget(target);
        });
        if (hasActivatedChild) {
          // Immediately reset activation state, while preserving logic that prevents touch follow-on events
          this.resetActivationState_();
          return;
        }

        if (e !== undefined) {
          activatedTargets.push( /** @type {!EventTarget} */e.target);
          this.registerDeactivationHandlers_(e);
        }

        activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }

        requestAnimationFrame(function () {
          // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
          activatedTargets = [];

          if (!activationState.wasElementMadeActive && e !== undefined && (e.key === ' ' || e.keyCode === 32)) {
            // If space was pressed, try again within an rAF call to detect :active, because different UAs report
            // active states inconsistently when they're called within event handling code:
            // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
            // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
            // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
            // variable is set within a rAF callback for a submit button interaction (#2241).
            activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);
            if (activationState.wasElementMadeActive) {
              _this9.animateActivation_();
            }
          }

          if (!activationState.wasElementMadeActive) {
            // Reset activation state immediately if element was not made active.
            _this9.activationState_ = _this9.defaultActivationState_();
          }
        });
      }
    }, {
      key: 'checkElementMadeActive_',
      value: function checkElementMadeActive_(e) {
        return e !== undefined && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
      }
    }, {
      key: 'activate',
      value: function activate(event) {
        this.activate_(event);
      }
    }, {
      key: 'animateActivation_',
      value: function animateActivation_() {
        var _this10 = this;

        var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
            VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
            VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
        var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
            FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
            FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


        this.layoutInternal_();

        var translateStart = '';
        var translateEnd = '';

        if (!this.adapter_.isUnbounded()) {
          var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
              startPoint = _getFgTranslationCoor.startPoint,
              endPoint = _getFgTranslationCoor.endPoint;

          translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
          translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
        }

        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter_.removeClass(FG_DEACTIVATION);

        // Force layout in order to re-trigger the animation.
        this.adapter_.computeBoundingRect();
        this.adapter_.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(function () {
          return _this10.activationTimerCallback_();
        }, DEACTIVATION_TIMEOUT_MS);
      }
    }, {
      key: 'getFgTranslationCoordinates_',
      value: function getFgTranslationCoordinates_() {
        var _activationState_ = this.activationState_,
            activationEvent = _activationState_.activationEvent,
            wasActivatedByPointer = _activationState_.wasActivatedByPointer;


        var startPoint = void 0;
        if (wasActivatedByPointer) {
          startPoint = (0, _util.getNormalizedEventCoords)(
          /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
        } else {
          startPoint = {
            x: this.frame_.width / 2,
            y: this.frame_.height / 2
          };
        }
        // Center the element around the start point.
        startPoint = {
          x: startPoint.x - this.initialSize_ / 2,
          y: startPoint.y - this.initialSize_ / 2
        };

        var endPoint = {
          x: this.frame_.width / 2 - this.initialSize_ / 2,
          y: this.frame_.height / 2 - this.initialSize_ / 2
        };

        return { startPoint: startPoint, endPoint: endPoint };
      }
    }, {
      key: 'runDeactivationUXLogicIfReady_',
      value: function runDeactivationUXLogicIfReady_() {
        var _this11 = this;

        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _activationState_2 = this.activationState_,
            hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
            isActivated = _activationState_2.isActivated;

        var activationHasEnded = hasDeactivationUXRun || !isActivated;

        if (activationHasEnded && this.activationAnimationHasEnded_) {
          this.rmBoundedActivationClasses_();
          this.adapter_.addClass(FG_DEACTIVATION);
          this.fgDeactivationRemovalTimer_ = setTimeout(function () {
            _this11.adapter_.removeClass(FG_DEACTIVATION);
          }, _constants.numbers.FG_DEACTIVATION_MS);
        }
      }
    }, {
      key: 'rmBoundedActivationClasses_',
      value: function rmBoundedActivationClasses_() {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

        this.adapter_.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter_.computeBoundingRect();
      }
    }, {
      key: 'resetActivationState_',
      value: function resetActivationState_() {
        var _this12 = this;

        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function () {
          return _this12.previousActivationEvent_ = undefined;
        }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
      }
    }, {
      key: 'deactivate_',
      value: function deactivate_() {
        var _this13 = this;

        var activationState = this.activationState_;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
          return;
        }

        var state = /** @type {!ActivationStateType} */Object.assign({}, activationState);

        if (activationState.isProgrammatic) {
          requestAnimationFrame(function () {
            return _this13.animateDeactivation_(state);
          });
          this.resetActivationState_();
        } else {
          this.deregisterDeactivationHandlers_();
          requestAnimationFrame(function () {
            _this13.activationState_.hasDeactivationUXRun = true;
            _this13.animateDeactivation_(state);
            _this13.resetActivationState_();
          });
        }
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.deactivate_();
      }
    }, {
      key: 'animateDeactivation_',
      value: function animateDeactivation_(_ref) {
        var wasActivatedByPointer = _ref.wasActivatedByPointer,
            wasElementMadeActive = _ref.wasElementMadeActive;

        if (wasActivatedByPointer || wasElementMadeActive) {
          this.runDeactivationUXLogicIfReady_();
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        var _this14 = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(function () {
          _this14.layoutInternal_();
          _this14.layoutFrame_ = 0;
        });
      }
    }, {
      key: 'layoutInternal_',
      value: function layoutInternal_() {
        var _this15 = this;

        this.frame_ = this.adapter_.computeBoundingRect();
        var maxDim = Math.max(this.frame_.height, this.frame_.width);

        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function getBoundedRadius() {
          var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
          return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };

        this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        this.fgScale_ = this.maxRadius_ / this.initialSize_;

        this.updateLayoutCssVars_();
      }
    }, {
      key: 'updateLayoutCssVars_',
      value: function updateLayoutCssVars_() {
        var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
            VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
            VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
            VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
            VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


        this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
        this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

        if (this.adapter_.isUnbounded()) {
          this.unboundedCoords_ = {
            left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
            top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
          };

          this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
          this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
        }
      }
    }, {
      key: 'setUnbounded',
      value: function setUnbounded(unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

        if (unbounded) {
          this.adapter_.addClass(UNBOUNDED);
        } else {
          this.adapter_.removeClass(UNBOUNDED);
        }
      }
    }, {
      key: 'handleFocus',
      value: function handleFocus() {
        var _this16 = this;

        requestAnimationFrame(function () {
          return _this16.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    }, {
      key: 'handleBlur',
      value: function handleBlur() {
        var _this17 = this;

        requestAnimationFrame(function () {
          return _this17.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    }]);

    return MDCRippleFoundation;
  }(_foundation2.default);

  exports.default = MDCRippleFoundation;
  module.exports = exports['default'];
});

},{"./adapter":3,"./constants":4,"./util":7,"@material/base/foundation":2}],6:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '@material/base/component', './adapter', './foundation', './util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@material/base/component'), require('./adapter'), require('./foundation'), require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.component, global.adapter, global.foundation, global.util);
    global.index = mod.exports;
  }
})(this, function (exports, _component, _adapter, _foundation, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.util = exports.RippleCapableSurface = exports.MDCRippleFoundation = exports.MDCRipple = undefined;

  var _component2 = _interopRequireDefault(_component);

  var _adapter2 = _interopRequireDefault(_adapter);

  var _foundation2 = _interopRequireDefault(_foundation);

  var util = _interopRequireWildcard(_util);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var MDCRipple = function (_MDCComponent) {
    _inherits(MDCRipple, _MDCComponent);

    /** @param {...?} args */
    function MDCRipple() {
      var _ref;

      _classCallCheck(this, MDCRipple);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).call.apply(_ref, [this].concat(args)));

      /** @type {boolean} */
      _this.disabled = false;

      /** @private {boolean} */
      _this.unbounded_;
      return _this;
    }

    /**
     * @param {!Element} root
     * @param {{isUnbounded: (boolean|undefined)}=} options
     * @return {!MDCRipple}
     */


    _createClass(MDCRipple, [{
      key: 'setUnbounded_',
      value: function setUnbounded_() {
        this.foundation_.setUnbounded(this.unbounded_);
      }
    }, {
      key: 'activate',
      value: function activate() {
        this.foundation_.activate();
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.foundation_.deactivate();
      }
    }, {
      key: 'layout',
      value: function layout() {
        this.foundation_.layout();
      }
    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        return new _foundation2.default(MDCRipple.createAdapter(this));
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
      }
    }, {
      key: 'unbounded',
      get: function get() {
        return this.unbounded_;
      },
      set: function set(unbounded) {
        this.unbounded_ = Boolean(unbounded);
        this.setUnbounded_();
      }
    }], [{
      key: 'attachTo',
      value: function attachTo(root) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$isUnbounded = _ref2.isUnbounded,
            isUnbounded = _ref2$isUnbounded === undefined ? undefined : _ref2$isUnbounded;

        var ripple = new MDCRipple(root);
        // Only override unbounded behavior if option is explicitly specified
        if (isUnbounded !== undefined) {
          ripple.unbounded = /** @type {boolean} */isUnbounded;
        }
        return ripple;
      }
    }, {
      key: 'createAdapter',
      value: function createAdapter(instance) {
        var MATCHES = util.getMatchesProperty(HTMLElement.prototype);

        return {
          browserSupportsCssVars: function browserSupportsCssVars() {
            return util.supportsCssVariables(window);
          },
          isUnbounded: function isUnbounded() {
            return instance.unbounded;
          },
          isSurfaceActive: function isSurfaceActive() {
            return instance.root_[MATCHES](':active');
          },
          isSurfaceDisabled: function isSurfaceDisabled() {
            return instance.disabled;
          },
          addClass: function addClass(className) {
            return instance.root_.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return instance.root_.classList.remove(className);
          },
          containsEventTarget: function containsEventTarget(target) {
            return instance.root_.contains(target);
          },
          registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
            return instance.root_.addEventListener(evtType, handler, util.applyPassive());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
            return instance.root_.removeEventListener(evtType, handler, util.applyPassive());
          },
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.addEventListener(evtType, handler, util.applyPassive());
          },
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.removeEventListener(evtType, handler, util.applyPassive());
          },
          registerResizeHandler: function registerResizeHandler(handler) {
            return window.addEventListener('resize', handler);
          },
          deregisterResizeHandler: function deregisterResizeHandler(handler) {
            return window.removeEventListener('resize', handler);
          },
          updateCssVariable: function updateCssVariable(varName, value) {
            return instance.root_.style.setProperty(varName, value);
          },
          computeBoundingRect: function computeBoundingRect() {
            return instance.root_.getBoundingClientRect();
          },
          getWindowPageOffset: function getWindowPageOffset() {
            return { x: window.pageXOffset, y: window.pageYOffset };
          }
        };
      }
    }]);

    return MDCRipple;
  }(_component2.default);

  var RippleCapableSurface = function RippleCapableSurface() {
    _classCallCheck(this, RippleCapableSurface);
  };

  /** @protected {!Element} */
  RippleCapableSurface.prototype.root_;

  /**
   * Whether or not the ripple bleeds out of the bounds of the element.
   * @type {boolean|undefined}
   */
  RippleCapableSurface.prototype.unbounded;

  /**
   * Whether or not the ripple is attached to a disabled component.
   * @type {boolean|undefined}
   */
  RippleCapableSurface.prototype.disabled;

  exports.MDCRipple = MDCRipple;
  exports.MDCRippleFoundation = _foundation2.default;
  exports.RippleCapableSurface = RippleCapableSurface;
  exports.util = util;
});

},{"./adapter":3,"./foundation":5,"./util":7,"@material/base/component":1}],7:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.util = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  /**
   * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
   * @private {boolean|undefined}
   */
  var supportsCssVariables_ = void 0;

  /**
   * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
   * @private {boolean|undefined}
   */
  var supportsPassive_ = void 0;

  /**
   * @param {!Window} windowObj
   * @return {boolean}
   */
  function detectEdgePseudoVarBug(windowObj) {
    // Detect versions of Edge with buggy var() support
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
    var document = windowObj.document;
    var node = document.createElement('div');
    node.className = 'mdc-ripple-surface--test-edge-var-bug';
    document.body.appendChild(node);

    // The bug exists if ::before style ends up propagating to the parent element.
    // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
    // but Firefox is known to support CSS custom properties correctly.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = windowObj.getComputedStyle(node);
    var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
    node.remove();
    return hasPseudoVarBug;
  }

  /**
   * @param {!Window} windowObj
   * @param {boolean=} forceRefresh
   * @return {boolean|undefined}
   */

  function supportsCssVariables(windowObj) {
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var supportsCssVariables = supportsCssVariables_;
    if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
      return supportsCssVariables;
    }

    var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
    if (!supportsFunctionPresent) {
      return;
    }

    var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
    // See: https://bugs.webkit.org/show_bug.cgi?id=154669
    // See: README section on Safari
    var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

    if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
      supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
    } else {
      supportsCssVariables = false;
    }

    if (!forceRefresh) {
      supportsCssVariables_ = supportsCssVariables;
    }
    return supportsCssVariables;
  }

  //
  /**
   * Determine whether the current browser supports passive event listeners, and if so, use them.
   * @param {!Window=} globalObj
   * @param {boolean=} forceRefresh
   * @return {boolean|!EventListenerOptions}
   */
  function applyPassive() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_ === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, { get passive() {
            isSupported = true;
            return isSupported;
          } });
      } catch (e) {}

      supportsPassive_ = isSupported;
    }

    return supportsPassive_ ? /** @type {!EventListenerOptions} */{ passive: true } : false;
  }

  /**
   * @param {!Object} HTMLElementPrototype
   * @return {string}
   */
  function getMatchesProperty(HTMLElementPrototype) {
    /**
     * Order is important because we return the first existing method we find.
     * Do not change the order of the items in the below array.
     */
    var matchesMethods = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'];
    var method = 'matches';
    for (var i = 0; i < matchesMethods.length; i++) {
      var matchesMethod = matchesMethods[i];
      if (matchesMethod in HTMLElementPrototype) {
        method = matchesMethod;
        break;
      }
    }

    return method;
  }

  /**
   * @param {!Event} ev
   * @param {{x: number, y: number}} pageOffset
   * @param {!ClientRect} clientRect
   * @return {{x: number, y: number}}
   */
  function getNormalizedEventCoords(ev, pageOffset, clientRect) {
    var x = pageOffset.x,
        y = pageOffset.y;

    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;

    var normalizedX = void 0;
    var normalizedY = void 0;
    // Determine touch point relative to the ripple container.
    if (ev.type === 'touchstart') {
      ev = /** @type {!TouchEvent} */ev;
      normalizedX = ev.changedTouches[0].pageX - documentX;
      normalizedY = ev.changedTouches[0].pageY - documentY;
    } else {
      ev = /** @type {!MouseEvent} */ev;
      normalizedX = ev.pageX - documentX;
      normalizedY = ev.pageY - documentY;
    }

    return { x: normalizedX, y: normalizedY };
  }

  exports.supportsCssVariables = supportsCssVariables;
  exports.applyPassive = applyPassive;
  exports.getMatchesProperty = getMatchesProperty;
  exports.getNormalizedEventCoords = getNormalizedEventCoords;
});

},{}],8:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '@material/ripple/index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@material/ripple/index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MDCSelectionControl = exports.MDCSelectionControlState = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  /* eslint-enable no-unused-vars */

  /**
   * @typedef {{
   *   checked: boolean,
   *   indeterminate: boolean,
   *   disabled: boolean,
   *   value: ?string
   * }}
   */
  var MDCSelectionControlState = void 0;

  /**
   * @record
   */

  var MDCSelectionControl = function () {
    function MDCSelectionControl() {
      _classCallCheck(this, MDCSelectionControl);
    }

    _createClass(MDCSelectionControl, [{
      key: 'ripple',
      get: function get() {}
    }]);

    return MDCSelectionControl;
  }();

  exports.MDCSelectionControlState = MDCSelectionControlState;
  exports.MDCSelectionControl = MDCSelectionControl;
});

},{"@material/ripple/index":6}],9:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.adapter = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var MDCSwitchAdapter = function () {
    function MDCSwitchAdapter() {
      _classCallCheck(this, MDCSwitchAdapter);
    }

    _createClass(MDCSwitchAdapter, [{
      key: "addClass",
      value: function addClass(className) {}
    }, {
      key: "removeClass",
      value: function removeClass(className) {}
    }, {
      key: "setNativeControlChecked",
      value: function setNativeControlChecked(checked) {}
    }, {
      key: "setNativeControlDisabled",
      value: function setNativeControlDisabled(disabled) {}
    }]);

    return MDCSwitchAdapter;
  }();

  exports.default = MDCSwitchAdapter;
  module.exports = exports["default"];
});

},{}],10:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.constants = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  /** @enum {string} */
  var cssClasses = {
    CHECKED: 'mdc-switch--checked',
    DISABLED: 'mdc-switch--disabled'
  };

  /** @enum {string} */
  var strings = {
    NATIVE_CONTROL_SELECTOR: '.mdc-switch__native-control',
    RIPPLE_SURFACE_SELECTOR: '.mdc-switch__thumb-underlay'
  };

  exports.cssClasses = cssClasses;
  exports.strings = strings;
});

},{}],11:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '@material/base/foundation', './adapter', './constants'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('@material/base/foundation'), require('./adapter'), require('./constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.foundation, global.adapter, global.constants);
    global.foundation = mod.exports;
  }
})(this, function (module, exports, _foundation, _adapter, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _foundation2 = _interopRequireDefault(_foundation);

  var _adapter2 = _interopRequireDefault(_adapter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _createClass = function () {
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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var MDCSwitchFoundation = function (_MDCFoundation) {
    _inherits(MDCSwitchFoundation, _MDCFoundation);

    _createClass(MDCSwitchFoundation, null, [{
      key: 'strings',
      get: function get() {
        return _constants.strings;
      }
    }, {
      key: 'cssClasses',
      get: function get() {
        return _constants.cssClasses;
      }
    }, {
      key: 'defaultAdapter',
      get: function get() {
        return (/** @type {!MDCSwitchAdapter} */{
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            setNativeControlChecked: function setNativeControlChecked() /* checked: boolean */{},
            setNativeControlDisabled: function setNativeControlDisabled() /* disabled: boolean */{}
          }
        );
      }
    }]);

    function MDCSwitchFoundation(adapter) {
      _classCallCheck(this, MDCSwitchFoundation);

      return _possibleConstructorReturn(this, (MDCSwitchFoundation.__proto__ || Object.getPrototypeOf(MDCSwitchFoundation)).call(this, Object.assign(MDCSwitchFoundation.defaultAdapter, adapter)));
    }

    /** @param {boolean} checked */


    _createClass(MDCSwitchFoundation, [{
      key: 'setChecked',
      value: function setChecked(checked) {
        this.adapter_.setNativeControlChecked(checked);
        this.updateCheckedStyling_(checked);
      }
    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.adapter_.setNativeControlDisabled(disabled);
        if (disabled) {
          this.adapter_.addClass(_constants.cssClasses.DISABLED);
        } else {
          this.adapter_.removeClass(_constants.cssClasses.DISABLED);
        }
      }
    }, {
      key: 'handleChange',
      value: function handleChange(evt) {
        this.updateCheckedStyling_(evt.target.checked);
      }
    }, {
      key: 'updateCheckedStyling_',
      value: function updateCheckedStyling_(checked) {
        if (checked) {
          this.adapter_.addClass(_constants.cssClasses.CHECKED);
        } else {
          this.adapter_.removeClass(_constants.cssClasses.CHECKED);
        }
      }
    }]);

    return MDCSwitchFoundation;
  }(_foundation2.default);

  exports.default = MDCSwitchFoundation;
  module.exports = exports['default'];
});

},{"./adapter":9,"./constants":10,"@material/base/foundation":2}],12:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '@material/base/component', '@material/selection-control/index', './foundation', '@material/ripple/index', '@material/ripple/util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@material/base/component'), require('@material/selection-control/index'), require('./foundation'), require('@material/ripple/index'), require('@material/ripple/util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.component, global.index, global.foundation, global.index, global.util);
    global.index = mod.exports;
  }
})(this, function (exports, _component, _index, _foundation, _index2, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MDCSwitch = exports.MDCSwitchFoundation = undefined;

  var _component2 = _interopRequireDefault(_component);

  var _foundation2 = _interopRequireDefault(_foundation);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var _createClass = function () {
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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var MDCSwitch = function (_MDCComponent) {
    _inherits(MDCSwitch, _MDCComponent);

    _createClass(MDCSwitch, null, [{
      key: 'attachTo',
      value: function attachTo(root) {
        return new MDCSwitch(root);
      }
    }]);

    function MDCSwitch() {
      var _ref;

      _classCallCheck(this, MDCSwitch);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = MDCSwitch.__proto__ || Object.getPrototypeOf(MDCSwitch)).call.apply(_ref, [this].concat(args)));

      /** @private {!MDCRipple} */
      _this.ripple_ = _this.initRipple_();

      /** @private {!Function} */
      _this.changeHandler_;
      return _this;
    }

    _createClass(MDCSwitch, [{
      key: 'destroy',
      value: function destroy() {
        _get(MDCSwitch.prototype.__proto__ || Object.getPrototypeOf(MDCSwitch.prototype), 'destroy', this).call(this);
        this.ripple_.destroy();
        this.nativeControl_.removeEventListener('change', this.changeHandler_);
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        this.changeHandler_ = this.foundation_.handleChange.bind(this.foundation_);
        this.nativeControl_.addEventListener('change', this.changeHandler_);

        // Sometimes the checked state of the input element is saved in the history.
        // The switch styling should match the checked state of the input element.
        // Do an initial sync between the native control and the foundation.
        this.checked = this.checked;
      }
    }, {
      key: 'initRipple_',
      value: function initRipple_() {
        var _this2 = this;

        var RIPPLE_SURFACE_SELECTOR = _foundation2.default.strings.RIPPLE_SURFACE_SELECTOR;

        var rippleSurface = /** @type {!Element} */this.root_.querySelector(RIPPLE_SURFACE_SELECTOR);

        var MATCHES = (0, _util.getMatchesProperty)(HTMLElement.prototype);
        var adapter = Object.assign(_index2.MDCRipple.createAdapter(this), {
          isUnbounded: function isUnbounded() {
            return true;
          },
          isSurfaceActive: function isSurfaceActive() {
            return _this2.nativeControl_[MATCHES](':active');
          },
          addClass: function addClass(className) {
            return rippleSurface.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return rippleSurface.classList.remove(className);
          },
          registerInteractionHandler: function registerInteractionHandler(type, handler) {
            return _this2.nativeControl_.addEventListener(type, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
            return _this2.nativeControl_.removeEventListener(type, handler);
          },
          updateCssVariable: function updateCssVariable(varName, value) {
            return rippleSurface.style.setProperty(varName, value);
          },
          computeBoundingRect: function computeBoundingRect() {
            return rippleSurface.getBoundingClientRect();
          }
        });
        var foundation = new _index2.MDCRippleFoundation(adapter);
        return new _index2.MDCRipple(this.root_, foundation);
      }
    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        var _this3 = this;

        return new _foundation2.default({
          addClass: function addClass(className) {
            return _this3.root_.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return _this3.root_.classList.remove(className);
          },
          setNativeControlChecked: function setNativeControlChecked(checked) {
            return _this3.nativeControl_.checked = checked;
          },
          setNativeControlDisabled: function setNativeControlDisabled(disabled) {
            return _this3.nativeControl_.disabled = disabled;
          }
        });
      }
    }, {
      key: 'nativeControl_',
      get: function get() {
        var NATIVE_CONTROL_SELECTOR = _foundation2.default.strings.NATIVE_CONTROL_SELECTOR;

        var el = /** @type {?MDCSelectionControlState} */this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
        return el;
      }
    }, {
      key: 'ripple',
      get: function get() {
        return this.ripple_;
      }
    }, {
      key: 'checked',
      get: function get() {
        return this.nativeControl_.checked;
      },
      set: function set(checked) {
        this.foundation_.setChecked(checked);
      }
    }, {
      key: 'disabled',
      get: function get() {
        return this.nativeControl_.disabled;
      },
      set: function set(disabled) {
        this.foundation_.setDisabled(disabled);
      }
    }]);

    return MDCSwitch;
  }(_component2.default);

  exports.MDCSwitchFoundation = _foundation2.default;
  exports.MDCSwitch = MDCSwitch;
});

},{"./foundation":11,"@material/base/component":1,"@material/ripple/index":6,"@material/ripple/util":7,"@material/selection-control/index":8}],13:[function(require,module,exports){
"use strict";

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.main = mod.exports;
    }
})(undefined, function () {
    'use strict';

    $(document).ready(function () {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.selectpicker').selectpicker('mobile');
        }

        $(document).on('click', '.header__menu-open', function () {
            $('body').addClass('noscroll-y');
            $('.header__dropdown').fadeIn();
        });

        $(document).on('click', '.header__menu-close', function () {
            $('body').removeClass('noscroll-y');
            $('.header__dropdown').fadeOut();
        });

        var footerFunc;
        (footerFunc = function footerFunc() {
            $('footer').css('position', 'static');
            $('body').css('min-height', '100px');

            var bodyHeight = $('body').outerHeight();
            if (window.innerHeight > bodyHeight) {
                $('body').css('min-height', '100vh');
                $('footer').css({ 'position': 'absolute', 'bottom': '0' });
            }
        })();

        $(document).on('click', '.user__settings-open', function (e) {
            e.preventDefault();
            var _user = $(this).closest('.user'),
                _userSettings = _user.find('.user__settings'),
                _userName = _user.find('.user__name');

            $('.user__name').show();
            $('.user__settings').removeClass('user__settings--active');
            _userName.hide();
            _userSettings.addClass('user__settings--active');
        });

        $(document).on('click', '.user__settings-close', function (e) {
            e.preventDefault();
            var _user = $(this).closest('.user'),
                _userSettings = _user.find('.user__settings'),
                _userName = _user.find('.user__name');

            _userName.show();
            _userSettings.removeClass('user__settings--active');
        });

        $("#accordion").on('hidden.bs.collapse', function () {
            $('.user__name').show();
            $('.user__settings').removeClass('user__settings--active');
        });

        function cl(a) {
            console.log(a);
        }

        var f1;
        (f1 = function f1() {})();

        $(document).on('click touchstart', function (event) {});

        $(document).on('click touch', function (event) {});

        $(' ').on({
            mouseenter: function mouseenter() {},
            mouseleave: function mouseleave() {}
        });

        if (window.innerWidth < 768) {}

        window.onresize = function () {};

        $('').each(function () {
            var _select = $(this).find('select');
            _select.on('changed.bs.select', function () {

                var _selectedOption = $(this).find('option:selected');
            });
        });

        $("#accordion").on('show.bs.collapse', function () {});
        $("#accordion").on('hide.bs.collapse', function () {});

        /** hover img */

        $(".hover-img__wrapper:not(.hover-img__wrapper--active)").each(function () {
            var defaultImg = $(this).find('img');
            var hiddenImg = defaultImg.clone();
            var hoverSrc = hiddenImg.attr('data-src');
            hiddenImg.attr('src', hoverSrc).hide().insertBefore(defaultImg);

            $(this).on({
                mouseenter: function mouseenter() {
                    defaultImg.hide();
                    hiddenImg.show();
                },
                mouseleave: function mouseleave() {
                    defaultImg.show();
                    hiddenImg.hide();
                }
            });
        });

        var defaultImg = $(".hover-img__wrapper--active").find('img').hide();
        var hiddenImg = defaultImg.clone();
        var hoverSrc = hiddenImg.attr('data-src');
        hiddenImg.attr('src', hoverSrc).insertBefore(defaultImg).show();

        $('.time').datetimepicker({
            format: 'HH:mm',
            defaultDate: moment(),
            icons: {
                up: "material-icons",
                down: "material-icons"
            }
        });

        $('.date').datetimepicker({
            format: 'DD.MM.YY',
            defaultDate: moment(),
            icons: {
                previous: 'material-icons',
                next: 'material-icons'
            }
        });

        $('input.only-number').bind('keypress', function (e) {
            if (e.which != 13) {
                return (/[\d.+]/.test(e.key)
                ); // IE > 9
            }
        });

        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth;

        window.onresize = function () {
            footerFunc();

            var t = w.innerWidth || e.clientWidth || g.clientWidth;
            if (t !== x) {}
        };
    });
});

},{}]},{},[13,12])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxcYmFzZVxcY29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXGJhc2VcXGZvdW5kYXRpb24uanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxccmlwcGxlXFxhZGFwdGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcZm91bmRhdGlvbi5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxyaXBwbGVcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcdXRpbC5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxzZWxlY3Rpb24tY29udHJvbFxcaW5kZXguanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxcc3dpdGNoXFxhZGFwdGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHN3aXRjaFxcY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHN3aXRjaFxcZm91bmRhdGlvbi5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxzd2l0Y2hcXGluZGV4LmpzIiwic3JjXFxqc1xcbWFpblxcbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkNpQ0UsSSxFQUFzQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQU8sSUFBQSxZQUFBLENBQUEsSUFBQSxFQUF1QixJQUE5QixvQkFBOEIsRUFBdkIsQ0FBUDtBQUNEOzs7QUFFRDs7Ozs7QUFLQSwwQkFBQSxJQUFBLEVBQW1EO0FBQUEsVUFBakMsVUFBaUMsdUVBQW5ELFNBQW1E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QSxVQUFBLE9BQUEsRUFBQSxjQUFBLENBQTBCO0FBQ3RCLG9CQURzQixPQUFBO0FBRXRCLHlCQUZzQixRQUFBO0FBR3RCLG1CQUFPO0FBQ0gsb0JBREcsZ0JBQUE7QUFFSCxzQkFBTTtBQUZIO0FBSGUsU0FBMUI7O0FBU0EsVUFBQSxPQUFBLEVBQUEsY0FBQSxDQUEwQjtBQUN0QixvQkFEc0IsVUFBQTtBQUV0Qix5QkFGc0IsUUFBQTtBQUd0QixtQkFBTztBQUNILDBCQURHLGdCQUFBO0FBRUgsc0JBQU07QUFGSDtBQUhlLFNBQTFCOztBQVVBLFVBQUEsbUJBQUEsRUFBQSxJQUFBLENBQUEsVUFBQSxFQUF3QyxVQUFBLENBQUEsRUFBYTtBQUNqRCxnQkFBSSxFQUFBLEtBQUEsSUFBSixFQUFBLEVBQW1CO0FBQ2YsdUJBQVEsVUFBQSxJQUFBLENBQWMsRUFBZCxHQUFBO0FBQVIsa0JBRGUsQ0FDaUI7QUFDbkM7QUFITCxTQUFBOztBQU9BLFlBQUksSUFBSixNQUFBO0FBQUEsWUFDSSxJQURKLFFBQUE7QUFBQSxZQUVJLElBQUksRUFGUixlQUFBO0FBQUEsWUFHSSxJQUFJLEVBQUEsb0JBQUEsQ0FBQSxNQUFBLEVBSFIsQ0FHUSxDQUhSO0FBQUEsWUFJSSxJQUFJLEVBQUEsVUFBQSxJQUFnQixFQUFoQixXQUFBLElBQWlDLEVBSnpDLFdBQUE7O0FBTUEsZUFBQSxRQUFBLEdBQWtCLFlBQVk7QUFDMUI7O0FBRUEsZ0JBQUksSUFBSSxFQUFBLFVBQUEsSUFBZ0IsRUFBaEIsV0FBQSxJQUFpQyxFQUF6QyxXQUFBO0FBQ0EsZ0JBQUksTUFBSixDQUFBLEVBQWEsQ0FFWjtBQU5MLFNBQUE7QUE5S0osS0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcblxuLyoqXG4gKiBAdGVtcGxhdGUgRlxuICovXG5jbGFzcyBNRENDb21wb25lbnQge1xuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcmV0dXJuIHshTURDQ29tcG9uZW50fVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHdoaWNoIGV4dGVuZCBNRENCYXNlIHNob3VsZCBwcm92aWRlIGFuIGF0dGFjaFRvKCkgbWV0aG9kIHRoYXQgdGFrZXMgYSByb290IGVsZW1lbnQgYW5kXG4gICAgLy8gcmV0dXJucyBhbiBpbnN0YW50aWF0ZWQgY29tcG9uZW50IHdpdGggaXRzIHJvb3Qgc2V0IHRvIHRoYXQgZWxlbWVudC4gQWxzbyBub3RlIHRoYXQgaW4gdGhlIGNhc2VzIG9mXG4gICAgLy8gc3ViY2xhc3NlcywgYW4gZXhwbGljaXQgZm91bmRhdGlvbiBjbGFzcyB3aWxsIG5vdCBoYXZlIHRvIGJlIHBhc3NlZCBpbjsgaXQgd2lsbCBzaW1wbHkgYmUgaW5pdGlhbGl6ZWRcbiAgICAvLyBmcm9tIGdldERlZmF1bHRGb3VuZGF0aW9uKCkuXG4gICAgcmV0dXJuIG5ldyBNRENDb21wb25lbnQocm9vdCwgbmV3IE1EQ0ZvdW5kYXRpb24oKSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge0Y9fSBmb3VuZGF0aW9uXG4gICAqIEBwYXJhbSB7Li4uP30gYXJnc1xuICAgKi9cbiAgY29uc3RydWN0b3Iocm9vdCwgZm91bmRhdGlvbiA9IHVuZGVmaW5lZCwgLi4uYXJncykge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cbiAgICB0aGlzLnJvb3RfID0gcm9vdDtcbiAgICB0aGlzLmluaXRpYWxpemUoLi4uYXJncyk7XG4gICAgLy8gTm90ZSB0aGF0IHdlIGluaXRpYWxpemUgZm91bmRhdGlvbiBoZXJlIGFuZCBub3Qgd2l0aGluIHRoZSBjb25zdHJ1Y3RvcidzIGRlZmF1bHQgcGFyYW0gc28gdGhhdFxuICAgIC8vIHRoaXMucm9vdF8gaXMgZGVmaW5lZCBhbmQgY2FuIGJlIHVzZWQgd2l0aGluIHRoZSBmb3VuZGF0aW9uIGNsYXNzLlxuICAgIC8qKiBAcHJvdGVjdGVkIHshRn0gKi9cbiAgICB0aGlzLmZvdW5kYXRpb25fID0gZm91bmRhdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXREZWZhdWx0Rm91bmRhdGlvbigpIDogZm91bmRhdGlvbjtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmluaXQoKTtcbiAgICB0aGlzLmluaXRpYWxTeW5jV2l0aERPTSgpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZSgvKiAuLi5hcmdzICovKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyB0byBkbyBhbnkgYWRkaXRpb25hbCBzZXR1cCB3b3JrIHRoYXQgd291bGQgYmUgY29uc2lkZXJlZCBwYXJ0IG9mIGFcbiAgICAvLyBcImNvbnN0cnVjdG9yXCIuIEVzc2VudGlhbGx5LCBpdCBpcyBhIGhvb2sgaW50byB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIGJlZm9yZSB0aGUgZm91bmRhdGlvbiBpc1xuICAgIC8vIGluaXRpYWxpemVkLiBBbnkgYWRkaXRpb25hbCBhcmd1bWVudHMgYmVzaWRlcyByb290IGFuZCBmb3VuZGF0aW9uIHdpbGwgYmUgcGFzc2VkIGluIGhlcmUuXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUZ9IGZvdW5kYXRpb25cbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkIGZvdW5kYXRpb24gY2xhc3MgZm9yIHRoZVxuICAgIC8vIGNvbXBvbmVudC5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1N1YmNsYXNzZXMgbXVzdCBvdmVycmlkZSBnZXREZWZhdWx0Rm91bmRhdGlvbiB0byByZXR1cm4gYSBwcm9wZXJseSBjb25maWd1cmVkICcgK1xuICAgICAgJ2ZvdW5kYXRpb24gY2xhc3MnKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCBpZiB0aGV5IG5lZWQgdG8gcGVyZm9ybSB3b3JrIHRvIHN5bmNocm9uaXplIHdpdGggYSBob3N0IERPTVxuICAgIC8vIG9iamVjdC4gQW4gZXhhbXBsZSBvZiB0aGlzIHdvdWxkIGJlIGEgZm9ybSBjb250cm9sIHdyYXBwZXIgdGhhdCBuZWVkcyB0byBzeW5jaHJvbml6ZSBpdHMgaW50ZXJuYWwgc3RhdGVcbiAgICAvLyB0byBzb21lIHByb3BlcnR5IG9yIGF0dHJpYnV0ZSBvZiB0aGUgaG9zdCBET00uIFBsZWFzZSBub3RlOiB0aGlzIGlzICpub3QqIHRoZSBwbGFjZSB0byBwZXJmb3JtIERPTVxuICAgIC8vIHJlYWRzL3dyaXRlcyB0aGF0IHdvdWxkIGNhdXNlIGxheW91dCAvIHBhaW50LCBhcyB0aGlzIGlzIGNhbGxlZCBzeW5jaHJvbm91c2x5IGZyb20gd2l0aGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtYXkgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJlbGVhc2UgYW55IHJlc291cmNlcyAvIGRlcmVnaXN0ZXIgYW55IGxpc3RlbmVycyB0aGV5IGhhdmVcbiAgICAvLyBhdHRhY2hlZC4gQW4gZXhhbXBsZSBvZiB0aGlzIG1pZ2h0IGJlIGRlcmVnaXN0ZXJpbmcgYSByZXNpemUgZXZlbnQgZnJvbSB0aGUgd2luZG93IG9iamVjdC5cbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlc3Ryb3koKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIGxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogdW5saXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICB1bmxpc3RlbihldnRUeXBlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpcmVzIGEgY3Jvc3MtYnJvd3Nlci1jb21wYXRpYmxlIGN1c3RvbSBldmVudCBmcm9tIHRoZSBjb21wb25lbnQgcm9vdCBvZiB0aGUgZ2l2ZW4gdHlwZSxcbiAgICogd2l0aCB0aGUgZ2l2ZW4gZGF0YS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshT2JqZWN0fSBldnREYXRhXG4gICAqIEBwYXJhbSB7Ym9vbGVhbj19IHNob3VsZEJ1YmJsZVxuICAgKi9cbiAgZW1pdChldnRUeXBlLCBldnREYXRhLCBzaG91bGRCdWJibGUgPSBmYWxzZSkge1xuICAgIGxldCBldnQ7XG4gICAgaWYgKHR5cGVvZiBDdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2dFR5cGUsIHtcbiAgICAgICAgZGV0YWlsOiBldnREYXRhLFxuICAgICAgICBidWJibGVzOiBzaG91bGRCdWJibGUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2dFR5cGUsIHNob3VsZEJ1YmJsZSwgZmFsc2UsIGV2dERhdGEpO1xuICAgIH1cblxuICAgIHRoaXMucm9vdF8uZGlzcGF0Y2hFdmVudChldnQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NvbXBvbmVudDtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBBXG4gKi9cbmNsYXNzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVte2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGV2ZXJ5XG4gICAgLy8gQ1NTIGNsYXNzIHRoZSBmb3VuZGF0aW9uIGNsYXNzIG5lZWRzIGFzIGEgcHJvcGVydHkuIGUuZy4ge0FDVElWRTogJ21kYy1jb21wb25lbnQtLWFjdGl2ZSd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBzZW1hbnRpYyBzdHJpbmdzIGFzIGNvbnN0YW50cy4gZS5nLiB7QVJJQV9ST0xFOiAndGFibGlzdCd9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bXtudW1iZXJzfSAqL1xuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBhbGxcbiAgICAvLyBvZiBpdHMgc2VtYW50aWMgbnVtYmVycyBhcyBjb25zdGFudHMuIGUuZy4ge0FOSU1BVElPTl9ERUxBWV9NUzogMzUwfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshT2JqZWN0fSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gbWF5IGNob29zZSB0byBpbXBsZW1lbnQgdGhpcyBnZXR0ZXIgaW4gb3JkZXIgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnRcbiAgICAvLyB3YXkgb2Ygdmlld2luZyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgb2YgYW4gYWRhcHRlci4gSW4gdGhlIGZ1dHVyZSwgdGhpcyBjb3VsZCBhbHNvIGJlIHVzZWQgZm9yIGFkYXB0ZXJcbiAgICAvLyB2YWxpZGF0aW9uLlxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0E9fSBhZGFwdGVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGFwdGVyID0ge30pIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUF9ICovXG4gICAgdGhpcy5hZGFwdGVyXyA9IGFkYXB0ZXI7XG4gIH1cblxuICBpbml0KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKHJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBkZS1pbml0aWFsaXphdGlvbiByb3V0aW5lcyAoZGUtcmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0ZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFJpcHBsZS4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICogLSBDU1MgdmFyaWFibGVzXG4gKiAtIHBvc2l0aW9uXG4gKiAtIGRpbWVuc2lvbnNcbiAqIC0gc2Nyb2xsIHBvc2l0aW9uXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHVuYm91bmRlZCwgYWN0aXZlIGFuZCBkaXNhYmxlZCBzdGF0ZXNcbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUFkYXB0ZXIge1xuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzVW5ib3VuZGVkKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlQWN0aXZlKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNTdXJmYWNlRGlzYWJsZWQoKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50VGFyZ2V0fSB0YXJnZXQgKi9cbiAgY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YXJOYW1lXG4gICAqIEBwYXJhbSB7P251bWJlcnxzdHJpbmd9IHZhbHVlXG4gICAqL1xuICB1cGRhdGVDc3NWYXJpYWJsZSh2YXJOYW1lLCB2YWx1ZSkge31cblxuICAvKiogQHJldHVybiB7IUNsaWVudFJlY3R9ICovXG4gIGNvbXB1dGVCb3VuZGluZ1JlY3QoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSAqL1xuICBnZXRXaW5kb3dQYWdlT2Zmc2V0KCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICAvLyBSaXBwbGUgaXMgYSBzcGVjaWFsIGNhc2Ugd2hlcmUgdGhlIFwicm9vdFwiIGNvbXBvbmVudCBpcyByZWFsbHkgYSBcIm1peGluXCIgb2Ygc29ydHMsXG4gIC8vIGdpdmVuIHRoYXQgaXQncyBhbiAndXBncmFkZScgdG8gYW4gZXhpc3RpbmcgY29tcG9uZW50LiBUaGF0IGJlaW5nIHNhaWQgaXQgaXMgdGhlIHJvb3RcbiAgLy8gQ1NTIGNsYXNzIHRoYXQgYWxsIG90aGVyIENTUyBjbGFzc2VzIGRlcml2ZSBmcm9tLlxuICBST09UOiAnbWRjLXJpcHBsZS11cGdyYWRlZCcsXG4gIFVOQk9VTkRFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLXVuYm91bmRlZCcsXG4gIEJHX0ZPQ1VTRUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1iYWNrZ3JvdW5kLWZvY3VzZWQnLFxuICBGR19BQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1hY3RpdmF0aW9uJyxcbiAgRkdfREVBQ1RJVkFUSU9OOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tZm9yZWdyb3VuZC1kZWFjdGl2YXRpb24nLFxufTtcblxuY29uc3Qgc3RyaW5ncyA9IHtcbiAgVkFSX0xFRlQ6ICctLW1kYy1yaXBwbGUtbGVmdCcsXG4gIFZBUl9UT1A6ICctLW1kYy1yaXBwbGUtdG9wJyxcbiAgVkFSX0ZHX1NJWkU6ICctLW1kYy1yaXBwbGUtZmctc2l6ZScsXG4gIFZBUl9GR19TQ0FMRTogJy0tbWRjLXJpcHBsZS1mZy1zY2FsZScsXG4gIFZBUl9GR19UUkFOU0xBVEVfU1RBUlQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLXN0YXJ0JyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9FTkQ6ICctLW1kYy1yaXBwbGUtZmctdHJhbnNsYXRlLWVuZCcsXG59O1xuXG5jb25zdCBudW1iZXJzID0ge1xuICBQQURESU5HOiAxMCxcbiAgSU5JVElBTF9PUklHSU5fU0NBTEU6IDAuNixcbiAgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVM6IDIyNSwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtdHJhbnNsYXRlLWR1cmF0aW9uIChpLmUuIGFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBGR19ERUFDVElWQVRJT05fTVM6IDE1MCwgLy8gQ29ycmVzcG9uZHMgdG8gJG1kYy1yaXBwbGUtZmFkZS1vdXQtZHVyYXRpb24gKGkuZS4gZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgVEFQX0RFTEFZX01TOiAzMDAsIC8vIERlbGF5IGJldHdlZW4gdG91Y2ggYW5kIHNpbXVsYXRlZCBtb3VzZSBldmVudHMgb24gdG91Y2ggZGV2aWNlc1xufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7Z2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGlzQWN0aXZhdGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgYWN0aXZhdGlvbkV2ZW50OiAoIUV2ZW50fHVuZGVmaW5lZCksXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudD0pLFxuICogICBmb2N1czogZnVuY3Rpb24oKSxcbiAqICAgYmx1cjogZnVuY3Rpb24oKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVyc1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgeDogbnVtYmVyLFxuICogICB5OiBudW1iZXJcbiAqIH19XG4gKi9cbmxldCBQb2ludFR5cGU7XG5cbi8vIEFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gdGhlIHJvb3QgZWxlbWVudCBvZiBlYWNoIGluc3RhbmNlIGZvciBhY3RpdmF0aW9uXG5jb25zdCBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaHN0YXJ0JywgJ3BvaW50ZXJkb3duJywgJ21vdXNlZG93bicsICdrZXlkb3duJ107XG5cbi8vIERlYWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiBkb2N1bWVudEVsZW1lbnQgd2hlbiBhIHBvaW50ZXItcmVsYXRlZCBkb3duIGV2ZW50IG9jY3Vyc1xuY29uc3QgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoZW5kJywgJ3BvaW50ZXJ1cCcsICdtb3VzZXVwJ107XG5cbi8vIFRyYWNrcyBhY3RpdmF0aW9ucyB0aGF0IGhhdmUgb2NjdXJyZWQgb24gdGhlIGN1cnJlbnQgZnJhbWUsIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBuZXN0ZWQgYWN0aXZhdGlvbnNcbi8qKiBAdHlwZSB7IUFycmF5PCFFdmVudFRhcmdldD59ICovXG5sZXQgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENSaXBwbGVBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDUmlwcGxlRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG51bWJlcnMoKSB7XG4gICAgcmV0dXJuIG51bWJlcnM7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiAvKiBib29sZWFuIC0gY2FjaGVkICovIHt9LFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAoLyogdGFyZ2V0OiAhRXZlbnRUYXJnZXQgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKC8qIHZhck5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiAvKiBDbGllbnRSZWN0ICovIHt9LFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gLyoge3g6IG51bWJlciwgeTogbnVtYmVyfSAqLyB7fSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDUmlwcGxlRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQ2xpZW50UmVjdH0gKi9cbiAgICB0aGlzLmZyYW1lXyA9IC8qKiBAdHlwZSB7IUNsaWVudFJlY3R9ICovICh7d2lkdGg6IDAsIGhlaWdodDogMH0pO1xuXG4gICAgLyoqIEBwcml2YXRlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLm1heFJhZGl1c18gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyA9IChlKSA9PiB0aGlzLmFjdGl2YXRlXyhlKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50PSl9ICovXG4gICAgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmRlYWN0aXZhdGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgeyFFdmVudHx1bmRlZmluZWR9ICovXG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3VwcG9ydHNQcmVzc1JpcHBsZV8oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlcl8uYnJvd3NlclN1cHBvcnRzQ3NzVmFycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFBY3RpdmF0aW9uU3RhdGVUeXBlfVxuICAgKi9cbiAgZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQWN0aXZhdGVkOiBmYWxzZSxcbiAgICAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiBmYWxzZSxcbiAgICAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogZmFsc2UsXG4gICAgICB3YXNFbGVtZW50TWFkZUFjdGl2ZTogZmFsc2UsXG4gICAgICBhY3RpdmF0aW9uRXZlbnQ6IHVuZGVmaW5lZCxcbiAgICAgIGlzUHJvZ3JhbW1hdGljOiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBpbml0KCkge1xuICAgIGNvbnN0IHN1cHBvcnRzUHJlc3NSaXBwbGUgPSB0aGlzLnN1cHBvcnRzUHJlc3NSaXBwbGVfKCk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyUm9vdEhhbmRsZXJzXyhzdXBwb3J0c1ByZXNzUmlwcGxlKTtcblxuICAgIGlmIChzdXBwb3J0c1ByZXNzUmlwcGxlKSB7XG4gICAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoUk9PVCk7XG4gICAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgICAgICAgLy8gVW5ib3VuZGVkIHJpcHBsZXMgbmVlZCBsYXlvdXQgbG9naWMgYXBwbGllZCBpbW1lZGlhdGVseSB0byBzZXQgY29vcmRpbmF0ZXMgZm9yIGJvdGggc2hhZGUgYW5kIHJpcHBsZVxuICAgICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdXBwb3J0c1ByZXNzUmlwcGxlXygpKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmF0aW9uVGltZXJfKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GR19BQ1RJVkFUSU9OKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFJPT1QpO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKTtcbiAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHN1cHBvcnRzUHJlc3NSaXBwbGUgUGFzc2VkIGZyb20gaW5pdCB0byBzYXZlIGEgcmVkdW5kYW50IGZ1bmN0aW9uIGNhbGxcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyUm9vdEhhbmRsZXJzXyhzdXBwb3J0c1ByZXNzUmlwcGxlKSB7XG4gICAgaWYgKHN1cHBvcnRzUHJlc3NSaXBwbGUpIHtcbiAgICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnQ9fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY3RpdmF0ZV8oZSkge1xuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEF2b2lkIHJlYWN0aW5nIHRvIGZvbGxvdy1vbiBldmVudHMgZmlyZWQgYnkgdG91Y2ggZGV2aWNlIGFmdGVyIGFuIGFscmVhZHktcHJvY2Vzc2VkIHVzZXIgaW50ZXJhY3Rpb25cbiAgICBjb25zdCBwcmV2aW91c0FjdGl2YXRpb25FdmVudCA9IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICAgIGNvbnN0IGlzU2FtZUludGVyYWN0aW9uID0gcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgJiYgZSAhPT0gdW5kZWZpbmVkICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IHVuZGVmaW5lZDtcbiAgICBhY3RpdmF0aW9uU3RhdGUuYWN0aXZhdGlvbkV2ZW50ID0gZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzQWN0aXZhdGVkQnlQb2ludGVyID0gYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID8gZmFsc2UgOiBlICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPSBlICE9PSB1bmRlZmluZWQgJiYgYWN0aXZhdGVkVGFyZ2V0cy5sZW5ndGggPiAwICYmIGFjdGl2YXRlZFRhcmdldHMuc29tZShcbiAgICAgICh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMucHVzaCgvKiogQHR5cGUgeyFFdmVudFRhcmdldH0gKi8gKGUudGFyZ2V0KSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgLy8gUmVzZXQgYXJyYXkgb24gbmV4dCBmcmFtZSBhZnRlciB0aGUgY3VycmVudCBldmVudCBoYXMgaGFkIGEgY2hhbmNlIHRvIGJ1YmJsZSB0byBwcmV2ZW50IGFuY2VzdG9yIHJpcHBsZXNcbiAgICAgIGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgJiYgZSAhPT0gdW5kZWZpbmVkICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudD19IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpIHtcbiAgICByZXR1cm4gKGUgIT09IHVuZGVmaW5lZCAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCkge1xuICAgIHRoaXMuYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBhbmltYXRlQWN0aXZhdGlvbl8oKSB7XG4gICAgY29uc3Qge1ZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIFZBUl9GR19UUkFOU0xBVEVfRU5EfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OLCBGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7REVBQ1RJVkFUSU9OX1RJTUVPVVRfTVN9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzO1xuXG4gICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGFydCA9ICcnO1xuICAgIGxldCB0cmFuc2xhdGVFbmQgPSAnJztcblxuICAgIGlmICghdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICBjb25zdCB7c3RhcnRQb2ludCwgZW5kUG9pbnR9ID0gdGhpcy5nZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCk7XG4gICAgICB0cmFuc2xhdGVTdGFydCA9IGAke3N0YXJ0UG9pbnQueH1weCwgJHtzdGFydFBvaW50Lnl9cHhgO1xuICAgICAgdHJhbnNsYXRlRW5kID0gYCR7ZW5kUG9pbnQueH1weCwgJHtlbmRQb2ludC55fXB4YDtcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfU1RBUlQsIHRyYW5zbGF0ZVN0YXJ0KTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19UUkFOU0xBVEVfRU5ELCB0cmFuc2xhdGVFbmQpO1xuICAgIC8vIENhbmNlbCBhbnkgb25nb2luZyBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiBhbmltYXRpb25zXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcblxuICAgIC8vIEZvcmNlIGxheW91dCBpbiBvcmRlciB0byByZS10cmlnZ2VyIHRoZSBhbmltYXRpb24uXG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfKCksIERFQUNUSVZBVElPTl9USU1FT1VUX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHt7c3RhcnRQb2ludDogUG9pbnRUeXBlLCBlbmRQb2ludDogUG9pbnRUeXBlfX1cbiAgICovXG4gIGdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKSB7XG4gICAgY29uc3Qge2FjdGl2YXRpb25FdmVudCwgd2FzQWN0aXZhdGVkQnlQb2ludGVyfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcblxuICAgIGxldCBzdGFydFBvaW50O1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIpIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoXG4gICAgICAgIC8qKiBAdHlwZSB7IUV2ZW50fSAqLyAoYWN0aXZhdGlvbkV2ZW50KSxcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5nZXRXaW5kb3dQYWdlT2Zmc2V0KCksIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLmZyYW1lXy53aWR0aCAvIDIsXG4gICAgICAgIHk6IHRoaXMuZnJhbWVfLmhlaWdodCAvIDIsXG4gICAgICB9O1xuICAgIH1cbiAgICAvLyBDZW50ZXIgdGhlIGVsZW1lbnQgYXJvdW5kIHRoZSBzdGFydCBwb2ludC5cbiAgICBzdGFydFBvaW50ID0ge1xuICAgICAgeDogc3RhcnRQb2ludC54IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiBzdGFydFBvaW50LnkgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kUG9pbnQgPSB7XG4gICAgICB4OiAodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIHJldHVybiB7c3RhcnRQb2ludCwgZW5kUG9pbnR9O1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpIHtcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYm90aCB3aGVuIGEgcG9pbnRpbmcgZGV2aWNlIGlzIHJlbGVhc2VkLCBhbmQgd2hlbiB0aGUgYWN0aXZhdGlvbiBhbmltYXRpb24gZW5kcy5cbiAgICAvLyBUaGUgZGVhY3RpdmF0aW9uIGFuaW1hdGlvbiBzaG91bGQgb25seSBydW4gYWZ0ZXIgYm90aCBvZiB0aG9zZSBvY2N1ci5cbiAgICBjb25zdCB7RkdfREVBQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBjb25zdCB7aGFzRGVhY3RpdmF0aW9uVVhSdW4sIGlzQWN0aXZhdGVkfSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBjb25zdCBhY3RpdmF0aW9uSGFzRW5kZWQgPSBoYXNEZWFjdGl2YXRpb25VWFJ1biB8fCAhaXNBY3RpdmF0ZWQ7XG5cbiAgICBpZiAoYWN0aXZhdGlvbkhhc0VuZGVkICYmIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXykge1xuICAgICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfREVBQ1RJVkFUSU9OKTtcbiAgICAgIH0sIG51bWJlcnMuRkdfREVBQ1RJVkFUSU9OX01TKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCkge1xuICAgIGNvbnN0IHtGR19BQ1RJVkFUSU9OfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICB9XG5cbiAgcmVzZXRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmFjdGl2YXRpb25FdmVudDtcbiAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgLy8gVG91Y2ggZGV2aWNlcyBtYXkgZmlyZSBhZGRpdGlvbmFsIGV2ZW50cyBmb3IgdGhlIHNhbWUgaW50ZXJhY3Rpb24gd2l0aGluIGEgc2hvcnQgdGltZS5cbiAgICAvLyBTdG9yZSB0aGUgcHJldmlvdXMgZXZlbnQgdW50aWwgaXQncyBzYWZlIHRvIGFzc3VtZSB0aGF0IHN1YnNlcXVlbnQgZXZlbnRzIGFyZSBmb3IgbmV3IGludGVyYWN0aW9ucy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfID0gdW5kZWZpbmVkLCBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuVEFQX0RFTEFZX01TKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVhY3RpdmF0ZV8oKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZV8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFBY3RpdmF0aW9uU3RhdGVUeXBlfSBvcHRpb25zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhbmltYXRlRGVhY3RpdmF0aW9uXyh7d2FzQWN0aXZhdGVkQnlQb2ludGVyLCB3YXNFbGVtZW50TWFkZUFjdGl2ZX0pIHtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyIHx8IHdhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH1cbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICBpZiAodGhpcy5sYXlvdXRGcmFtZV8pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMubGF5b3V0RnJhbWVfKTtcbiAgICB9XG4gICAgdGhpcy5sYXlvdXRGcmFtZV8gPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBsYXlvdXRJbnRlcm5hbF8oKSB7XG4gICAgdGhpcy5mcmFtZV8gPSB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCh0aGlzLmZyYW1lXy5oZWlnaHQsIHRoaXMuZnJhbWVfLndpZHRoKTtcblxuICAgIC8vIFN1cmZhY2UgZGlhbWV0ZXIgaXMgdHJlYXRlZCBkaWZmZXJlbnRseSBmb3IgdW5ib3VuZGVkIHZzLiBib3VuZGVkIHJpcHBsZXMuXG4gICAgLy8gVW5ib3VuZGVkIHJpcHBsZSBkaWFtZXRlciBpcyBjYWxjdWxhdGVkIHNtYWxsZXIgc2luY2UgdGhlIHN1cmZhY2UgaXMgZXhwZWN0ZWQgdG8gYWxyZWFkeSBiZSBwYWRkZWQgYXBwcm9wcmlhdGVseVxuICAgIC8vIHRvIGV4dGVuZCB0aGUgaGl0Ym94LCBhbmQgdGhlIHJpcHBsZSBpcyBleHBlY3RlZCB0byBtZWV0IHRoZSBlZGdlcyBvZiB0aGUgcGFkZGVkIGhpdGJveCAod2hpY2ggaXMgdHlwaWNhbGx5XG4gICAgLy8gc3F1YXJlKS4gQm91bmRlZCByaXBwbGVzLCBvbiB0aGUgb3RoZXIgaGFuZCwgYXJlIGZ1bGx5IGV4cGVjdGVkIHRvIGV4cGFuZCBiZXlvbmQgdGhlIHN1cmZhY2UncyBsb25nZXN0IGRpYW1ldGVyXG4gICAgLy8gKGNhbGN1bGF0ZWQgYmFzZWQgb24gdGhlIGRpYWdvbmFsIHBsdXMgYSBjb25zdGFudCBwYWRkaW5nKSwgYW5kIGFyZSBjbGlwcGVkIGF0IHRoZSBzdXJmYWNlJ3MgYm9yZGVyIHZpYVxuICAgIC8vIGBvdmVyZmxvdzogaGlkZGVuYC5cbiAgICBjb25zdCBnZXRCb3VuZGVkUmFkaXVzID0gKCkgPT4ge1xuICAgICAgY29uc3QgaHlwb3RlbnVzZSA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmZyYW1lXy53aWR0aCwgMikgKyBNYXRoLnBvdyh0aGlzLmZyYW1lXy5oZWlnaHQsIDIpKTtcbiAgICAgIHJldHVybiBoeXBvdGVudXNlICsgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlBBRERJTkc7XG4gICAgfTtcblxuICAgIHRoaXMubWF4UmFkaXVzXyA9IHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSA/IG1heERpbSA6IGdldEJvdW5kZWRSYWRpdXMoKTtcblxuICAgIC8vIFJpcHBsZSBpcyBzaXplZCBhcyBhIGZyYWN0aW9uIG9mIHRoZSBsYXJnZXN0IGRpbWVuc2lvbiBvZiB0aGUgc3VyZmFjZSwgdGhlbiBzY2FsZXMgdXAgdXNpbmcgYSBDU1Mgc2NhbGUgdHJhbnNmb3JtXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSBNYXRoLmZsb29yKG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRSk7XG4gICAgdGhpcy5mZ1NjYWxlXyA9IHRoaXMubWF4UmFkaXVzXyAvIHRoaXMuaW5pdGlhbFNpemVfO1xuXG4gICAgdGhpcy51cGRhdGVMYXlvdXRDc3NWYXJzXygpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVwZGF0ZUxheW91dENzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIFZBUl9GR19TSVpFLCBWQVJfTEVGVCwgVkFSX1RPUCwgVkFSX0ZHX1NDQUxFLFxuICAgIH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TSVpFLCBgJHt0aGlzLmluaXRpYWxTaXplX31weGApO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NDQUxFLCB0aGlzLmZnU2NhbGVfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgICAgbGVmdDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8ud2lkdGggLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgICAgdG9wOiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpKSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0xFRlQsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy5sZWZ0fXB4YCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9UT1AsIGAke3RoaXMudW5ib3VuZGVkQ29vcmRzXy50b3B9cHhgKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0VW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIGNvbnN0IHtVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGlmICh1bmJvdW5kZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG5cbiAgaGFuZGxlQmx1cigpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50JztcbmltcG9ydCBNRENSaXBwbGVBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG5pbXBvcnQgTURDUmlwcGxlRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIEBleHRlbmRzIE1EQ0NvbXBvbmVudDwhTURDUmlwcGxlRm91bmRhdGlvbj5cbiAqL1xuY2xhc3MgTURDUmlwcGxlIGV4dGVuZHMgTURDQ29tcG9uZW50IHtcbiAgLyoqIEBwYXJhbSB7Li4uP30gYXJncyAqL1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAvKiogQHR5cGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMudW5ib3VuZGVkXztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7e2lzVW5ib3VuZGVkOiAoYm9vbGVhbnx1bmRlZmluZWQpfT19IG9wdGlvbnNcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZX1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290LCB7aXNVbmJvdW5kZWQgPSB1bmRlZmluZWR9ID0ge30pIHtcbiAgICBjb25zdCByaXBwbGUgPSBuZXcgTURDUmlwcGxlKHJvb3QpO1xuICAgIC8vIE9ubHkgb3ZlcnJpZGUgdW5ib3VuZGVkIGJlaGF2aW9yIGlmIG9wdGlvbiBpcyBleHBsaWNpdGx5IHNwZWNpZmllZFxuICAgIGlmIChpc1VuYm91bmRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByaXBwbGUudW5ib3VuZGVkID0gLyoqIEB0eXBlIHtib29sZWFufSAqLyAoaXNVbmJvdW5kZWQpO1xuICAgIH1cbiAgICByZXR1cm4gcmlwcGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IVJpcHBsZUNhcGFibGVTdXJmYWNlfSBpbnN0YW5jZVxuICAgKiBAcmV0dXJuIHshTURDUmlwcGxlQWRhcHRlcn1cbiAgICovXG4gIHN0YXRpYyBjcmVhdGVBZGFwdGVyKGluc3RhbmNlKSB7XG4gICAgY29uc3QgTUFUQ0hFUyA9IHV0aWwuZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gdXRpbC5zdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3cpLFxuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IGluc3RhbmNlLnVuYm91bmRlZCxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gaW5zdGFuY2Uucm9vdF9bTUFUQ0hFU10oJzphY3RpdmUnKSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiBpbnN0YW5jZS5kaXNhYmxlZCxcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiBpbnN0YW5jZS5yb290Xy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gaW5zdGFuY2Uucm9vdF8uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKHRhcmdldCkgPT4gaW5zdGFuY2Uucm9vdF8uY29udGFpbnModGFyZ2V0KSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgaW5zdGFuY2Uucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBpbnN0YW5jZS5yb290Xy5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IGluc3RhbmNlLnJvb3RfLnN0eWxlLnNldFByb3BlcnR5KHZhck5hbWUsIHZhbHVlKSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IGluc3RhbmNlLnJvb3RfLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgZ2V0V2luZG93UGFnZU9mZnNldDogKCkgPT4gKHt4OiB3aW5kb3cucGFnZVhPZmZzZXQsIHk6IHdpbmRvdy5wYWdlWU9mZnNldH0pLFxuICAgIH07XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgZ2V0IHVuYm91bmRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy51bmJvdW5kZWRfO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldCB1bmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgdGhpcy51bmJvdW5kZWRfID0gQm9vbGVhbih1bmJvdW5kZWQpO1xuICAgIHRoaXMuc2V0VW5ib3VuZGVkXygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3N1cmUgQ29tcGlsZXIgdGhyb3dzIGFuIGFjY2VzcyBjb250cm9sIGVycm9yIHdoZW4gZGlyZWN0bHkgYWNjZXNzaW5nIGFcbiAgICogcHJvdGVjdGVkIG9yIHByaXZhdGUgcHJvcGVydHkgaW5zaWRlIGEgZ2V0dGVyL3NldHRlciwgbGlrZSB1bmJvdW5kZWQgYWJvdmUuXG4gICAqIEJ5IGFjY2Vzc2luZyB0aGUgcHJvdGVjdGVkIHByb3BlcnR5IGluc2lkZSBhIG1ldGhvZCwgd2Ugc29sdmUgdGhhdCBwcm9ibGVtLlxuICAgKiBUaGF0J3Mgd2h5IHRoaXMgZnVuY3Rpb24gZXhpc3RzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0VW5ib3VuZGVkXygpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldFVuYm91bmRlZCh0aGlzLnVuYm91bmRlZF8pO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5hY3RpdmF0ZSgpO1xuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmRlYWN0aXZhdGUoKTtcbiAgfVxuXG4gIGxheW91dCgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmxheW91dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGVGb3VuZGF0aW9ufVxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIHJldHVybiBuZXcgTURDUmlwcGxlRm91bmRhdGlvbihNRENSaXBwbGUuY3JlYXRlQWRhcHRlcih0aGlzKSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICB0aGlzLnVuYm91bmRlZCA9ICdtZGNSaXBwbGVJc1VuYm91bmRlZCcgaW4gdGhpcy5yb290Xy5kYXRhc2V0O1xuICB9XG59XG5cbi8qKlxuICogU2VlIE1hdGVyaWFsIERlc2lnbiBzcGVjIGZvciBtb3JlIGRldGFpbHMgb24gd2hlbiB0byB1c2UgcmlwcGxlcy5cbiAqIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZ3VpZGVsaW5lcy9tb3Rpb24vY2hvcmVvZ3JhcGh5Lmh0bWwjY2hvcmVvZ3JhcGh5LWNyZWF0aW9uXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIFJpcHBsZUNhcGFibGVTdXJmYWNlIHt9XG5cbi8qKiBAcHJvdGVjdGVkIHshRWxlbWVudH0gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS5yb290XztcblxuLyoqXG4gKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIGJsZWVkcyBvdXQgb2YgdGhlIGJvdW5kcyBvZiB0aGUgZWxlbWVudC5cbiAqIEB0eXBlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLnVuYm91bmRlZDtcblxuLyoqXG4gKiBXaGV0aGVyIG9yIG5vdCB0aGUgcmlwcGxlIGlzIGF0dGFjaGVkIHRvIGEgZGlzYWJsZWQgY29tcG9uZW50LlxuICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUuZGlzYWJsZWQ7XG5cbmV4cG9ydCB7TURDUmlwcGxlLCBNRENSaXBwbGVGb3VuZGF0aW9uLCBSaXBwbGVDYXBhYmxlU3VyZmFjZSwgdXRpbH07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gc3VwcG9ydHNDc3NWYXJpYWJsZXMgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IENTUyBjdXN0b20gdmFyaWFibGUgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcblxuLyoqXG4gKiBTdG9yZXMgcmVzdWx0IGZyb20gYXBwbHlQYXNzaXZlIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c1Bhc3NpdmVfO1xuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaikge1xuICAvLyBEZXRlY3QgdmVyc2lvbnMgb2YgRWRnZSB3aXRoIGJ1Z2d5IHZhcigpIHN1cHBvcnRcbiAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMTQ5NTQ0OC9cbiAgY29uc3QgZG9jdW1lbnQgPSB3aW5kb3dPYmouZG9jdW1lbnQ7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbm9kZS5jbGFzc05hbWUgPSAnbWRjLXJpcHBsZS1zdXJmYWNlLS10ZXN0LWVkZ2UtdmFyLWJ1Zyc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG5cbiAgLy8gVGhlIGJ1ZyBleGlzdHMgaWYgOjpiZWZvcmUgc3R5bGUgZW5kcyB1cCBwcm9wYWdhdGluZyB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gIC8vIEFkZGl0aW9uYWxseSwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gaWZyYW1lcyB3aXRoIGRpc3BsYXk6IFwibm9uZVwiIGluIEZpcmVmb3gsXG4gIC8vIGJ1dCBGaXJlZm94IGlzIGtub3duIHRvIHN1cHBvcnQgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cbiAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvd09iai5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBjb25zdCBoYXNQc2V1ZG9WYXJCdWcgPSBjb21wdXRlZFN0eWxlICE9PSBudWxsICYmIGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wU3R5bGUgPT09ICdzb2xpZCc7XG4gIG5vZGUucmVtb3ZlKCk7XG4gIHJldHVybiBoYXNQc2V1ZG9WYXJCdWc7XG59XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblxuZnVuY3Rpb24gc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93T2JqLCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBsZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNDc3NWYXJpYWJsZXNfID09PSAnYm9vbGVhbicgJiYgIWZvcmNlUmVmcmVzaCkge1xuICAgIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuXG4gIGNvbnN0IHN1cHBvcnRzRnVuY3Rpb25QcmVzZW50ID0gd2luZG93T2JqLkNTUyAmJiB0eXBlb2Ygd2luZG93T2JqLkNTUy5zdXBwb3J0cyA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKCFzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgPSB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCctLWNzcy12YXJzJywgJ3llcycpO1xuICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNTQ2NjlcbiAgLy8gU2VlOiBSRUFETUUgc2VjdGlvbiBvbiBTYWZhcmlcbiAgY29uc3Qgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzID0gKFxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJygtLWNzcy12YXJzOiB5ZXMpJykgJiZcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCdjb2xvcicsICcjMDAwMDAwMDAnKVxuICApO1xuXG4gIGlmIChleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzIHx8IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cykge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gIWRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKTtcbiAgfSBlbHNlIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCFmb3JjZVJlZnJlc2gpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbiAgfVxuICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG59XG5cbi8vXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSBjdXJyZW50IGJyb3dzZXIgc3VwcG9ydHMgcGFzc2l2ZSBldmVudCBsaXN0ZW5lcnMsIGFuZCBpZiBzbywgdXNlIHRoZW0uXG4gKiBAcGFyYW0geyFXaW5kb3c9fSBnbG9iYWxPYmpcbiAqIEBwYXJhbSB7Ym9vbGVhbj19IGZvcmNlUmVmcmVzaFxuICogQHJldHVybiB7Ym9vbGVhbnwhRXZlbnRMaXN0ZW5lck9wdGlvbnN9XG4gKi9cbmZ1bmN0aW9uIGFwcGx5UGFzc2l2ZShnbG9iYWxPYmogPSB3aW5kb3csIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGlmIChzdXBwb3J0c1Bhc3NpdmVfID09PSB1bmRlZmluZWQgfHwgZm9yY2VSZWZyZXNoKSB7XG4gICAgbGV0IGlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGdsb2JhbE9iai5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0ZXN0JywgbnVsbCwge2dldCBwYXNzaXZlKCkge1xuICAgICAgICBpc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBpc1N1cHBvcnRlZDtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfXG4gICAgPyAvKiogQHR5cGUgeyFFdmVudExpc3RlbmVyT3B0aW9uc30gKi8gKHtwYXNzaXZlOiB0cnVlfSlcbiAgICA6IGZhbHNlO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IU9iamVjdH0gSFRNTEVsZW1lbnRQcm90b3R5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gIC8qKlxuICAgKiBPcmRlciBpcyBpbXBvcnRhbnQgYmVjYXVzZSB3ZSByZXR1cm4gdGhlIGZpcnN0IGV4aXN0aW5nIG1ldGhvZCB3ZSBmaW5kLlxuICAgKiBEbyBub3QgY2hhbmdlIHRoZSBvcmRlciBvZiB0aGUgaXRlbXMgaW4gdGhlIGJlbG93IGFycmF5LlxuICAgKi9cbiAgY29uc3QgbWF0Y2hlc01ldGhvZHMgPSBbJ21hdGNoZXMnLCAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJywgJ21zTWF0Y2hlc1NlbGVjdG9yJ107XG4gIGxldCBtZXRob2QgPSAnbWF0Y2hlcyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF0Y2hlc01ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBtYXRjaGVzTWV0aG9kID0gbWF0Y2hlc01ldGhvZHNbaV07XG4gICAgaWYgKG1hdGNoZXNNZXRob2QgaW4gSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgICAgIG1ldGhvZCA9IG1hdGNoZXNNZXRob2Q7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWV0aG9kO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUV2ZW50fSBldlxuICogQHBhcmFtIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fSBwYWdlT2Zmc2V0XG4gKiBAcGFyYW0geyFDbGllbnRSZWN0fSBjbGllbnRSZWN0XG4gKiBAcmV0dXJuIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXROb3JtYWxpemVkRXZlbnRDb29yZHMoZXYsIHBhZ2VPZmZzZXQsIGNsaWVudFJlY3QpIHtcbiAgY29uc3Qge3gsIHl9ID0gcGFnZU9mZnNldDtcbiAgY29uc3QgZG9jdW1lbnRYID0geCArIGNsaWVudFJlY3QubGVmdDtcbiAgY29uc3QgZG9jdW1lbnRZID0geSArIGNsaWVudFJlY3QudG9wO1xuXG4gIGxldCBub3JtYWxpemVkWDtcbiAgbGV0IG5vcm1hbGl6ZWRZO1xuICAvLyBEZXRlcm1pbmUgdG91Y2ggcG9pbnQgcmVsYXRpdmUgdG8gdGhlIHJpcHBsZSBjb250YWluZXIuXG4gIGlmIChldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICBldiA9IC8qKiBAdHlwZSB7IVRvdWNoRXZlbnR9ICovIChldik7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIGV2ID0gLyoqIEB0eXBlIHshTW91c2VFdmVudH0gKi8gKGV2KTtcbiAgICBub3JtYWxpemVkWCA9IGV2LnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYucGFnZVkgLSBkb2N1bWVudFk7XG4gIH1cblxuICByZXR1cm4ge3g6IG5vcm1hbGl6ZWRYLCB5OiBub3JtYWxpemVkWX07XG59XG5cbmV4cG9ydCB7c3VwcG9ydHNDc3NWYXJpYWJsZXMsIGFwcGx5UGFzc2l2ZSwgZ2V0TWF0Y2hlc1Byb3BlcnR5LCBnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge01EQ1JpcHBsZX0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9pbmRleCc7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgY2hlY2tlZDogYm9vbGVhbixcbiAqICAgaW5kZXRlcm1pbmF0ZTogYm9vbGVhbixcbiAqICAgZGlzYWJsZWQ6IGJvb2xlYW4sXG4gKiAgIHZhbHVlOiA/c3RyaW5nXG4gKiB9fVxuICovXG5sZXQgTURDU2VsZWN0aW9uQ29udHJvbFN0YXRlO1xuXG4vKipcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDU2VsZWN0aW9uQ29udHJvbCB7XG4gIC8qKiBAcmV0dXJuIHs/TURDUmlwcGxlfSAqL1xuICBnZXQgcmlwcGxlKCkge31cbn1cblxuZXhwb3J0IHtNRENTZWxlY3Rpb25Db250cm9sU3RhdGUsIE1EQ1NlbGVjdGlvbkNvbnRyb2x9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBTd2l0Y2guIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqXG4gKiBBZGRpdGlvbmFsbHksIHByb3ZpZGVzIHR5cGUgaW5mb3JtYXRpb24gZm9yIHRoZSBhZGFwdGVyIHRvIHRoZSBDbG9zdXJlXG4gKiBjb21waWxlci5cbiAqXG4gKiBJbXBsZW1lbnQgdGhpcyBhZGFwdGVyIGZvciB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UgdG8gZGVsZWdhdGUgdXBkYXRlcyB0b1xuICogdGhlIGNvbXBvbmVudCBpbiB5b3VyIGZyYW1ld29yayBvZiBjaG9pY2UuIFNlZSBhcmNoaXRlY3R1cmUgZG9jdW1lbnRhdGlvblxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRlcmlhbC1jb21wb25lbnRzL21hdGVyaWFsLWNvbXBvbmVudHMtd2ViL2Jsb2IvbWFzdGVyL2RvY3MvY29kZS9hcmNoaXRlY3R1cmUubWRcbiAqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1N3aXRjaEFkYXB0ZXIge1xuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgKi9cbiAgc2V0TmF0aXZlQ29udHJvbENoZWNrZWQoY2hlY2tlZCkge31cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZCAqL1xuICBzZXROYXRpdmVDb250cm9sRGlzYWJsZWQoZGlzYWJsZWQpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1N3aXRjaEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBjc3NDbGFzc2VzID0ge1xuICBDSEVDS0VEOiAnbWRjLXN3aXRjaC0tY2hlY2tlZCcsXG4gIERJU0FCTEVEOiAnbWRjLXN3aXRjaC0tZGlzYWJsZWQnLFxufTtcblxuLyoqIEBlbnVtIHtzdHJpbmd9ICovXG5jb25zdCBzdHJpbmdzID0ge1xuICBOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUjogJy5tZGMtc3dpdGNoX19uYXRpdmUtY29udHJvbCcsXG4gIFJJUFBMRV9TVVJGQUNFX1NFTEVDVE9SOiAnLm1kYy1zd2l0Y2hfX3RodW1iLXVuZGVybGF5Jyxcbn07XG5cblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbmltcG9ydCBNRENTd2l0Y2hBZGFwdGVyIGZyb20gJy4vYWRhcHRlcic7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDU3dpdGNoQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1N3aXRjaEZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDU3dpdGNoQWRhcHRlcn0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4gLyoqIEB0eXBlIHshTURDU3dpdGNoQWRhcHRlcn0gKi8gKHtcbiAgICAgIGFkZENsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICBzZXROYXRpdmVDb250cm9sQ2hlY2tlZDogKC8qIGNoZWNrZWQ6IGJvb2xlYW4gKi8pID0+IHt9LFxuICAgICAgc2V0TmF0aXZlQ29udHJvbERpc2FibGVkOiAoLyogZGlzYWJsZWQ6IGJvb2xlYW4gKi8pID0+IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcikge1xuICAgIHN1cGVyKE9iamVjdC5hc3NpZ24oTURDU3dpdGNoRm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCAqL1xuICBzZXRDaGVja2VkKGNoZWNrZWQpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldE5hdGl2ZUNvbnRyb2xDaGVja2VkKGNoZWNrZWQpO1xuICAgIHRoaXMudXBkYXRlQ2hlY2tlZFN0eWxpbmdfKGNoZWNrZWQpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWQgKi9cbiAgc2V0RGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZChkaXNhYmxlZCk7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRElTQUJMRUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuRElTQUJMRUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBjaGFuZ2UgZXZlbnQgZm9yIHRoZSBzd2l0Y2ggbmF0aXZlIGNvbnRyb2wuXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBldnRcbiAgICovXG4gIGhhbmRsZUNoYW5nZShldnQpIHtcbiAgICB0aGlzLnVwZGF0ZUNoZWNrZWRTdHlsaW5nXyhldnQudGFyZ2V0LmNoZWNrZWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHN0eWxpbmcgb2YgdGhlIHN3aXRjaCBiYXNlZCBvbiBpdHMgY2hlY2tlZCBzdGF0ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBjaGVja2VkXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB1cGRhdGVDaGVja2VkU3R5bGluZ18oY2hlY2tlZCkge1xuICAgIGlmIChjaGVja2VkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuQ0hFQ0tFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5DSEVDS0VEKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDU3dpdGNoRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtNRENTZWxlY3Rpb25Db250cm9sU3RhdGUsIE1EQ1NlbGVjdGlvbkNvbnRyb2x9IGZyb20gJ0BtYXRlcmlhbC9zZWxlY3Rpb24tY29udHJvbC9pbmRleCc7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgTURDU3dpdGNoRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtNRENSaXBwbGUsIE1EQ1JpcHBsZUZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvaW5kZXgnO1xuaW1wb3J0IHtnZXRNYXRjaGVzUHJvcGVydHl9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCc7XG5cbi8qKlxuICogQGV4dGVuZHMgTURDQ29tcG9uZW50PCFNRENTd2l0Y2hGb3VuZGF0aW9uPlxuICogQGltcGxlbWVudHMge01EQ1NlbGVjdGlvbkNvbnRyb2x9XG4gKi9cbmNsYXNzIE1EQ1N3aXRjaCBleHRlbmRzIE1EQ0NvbXBvbmVudCB7XG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgcmV0dXJuIG5ldyBNRENTd2l0Y2gocm9vdCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFNRENSaXBwbGV9ICovXG4gICAgdGhpcy5yaXBwbGVfID0gdGhpcy5pbml0UmlwcGxlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyXztcbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMucmlwcGxlXy5kZXN0cm95KCk7XG4gICAgdGhpcy5uYXRpdmVDb250cm9sXy5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUhhbmRsZXJfKTtcbiAgfVxuXG4gIGluaXRpYWxTeW5jV2l0aERPTSgpIHtcbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJfID0gdGhpcy5mb3VuZGF0aW9uXy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzLmZvdW5kYXRpb25fKTtcbiAgICB0aGlzLm5hdGl2ZUNvbnRyb2xfLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlSGFuZGxlcl8pO1xuXG4gICAgLy8gU29tZXRpbWVzIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSBpbnB1dCBlbGVtZW50IGlzIHNhdmVkIGluIHRoZSBoaXN0b3J5LlxuICAgIC8vIFRoZSBzd2l0Y2ggc3R5bGluZyBzaG91bGQgbWF0Y2ggdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgLy8gRG8gYW4gaW5pdGlhbCBzeW5jIGJldHdlZW4gdGhlIG5hdGl2ZSBjb250cm9sIGFuZCB0aGUgZm91bmRhdGlvbi5cbiAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3RhdGUgb2YgdGhlIG5hdGl2ZSBjb250cm9sIGVsZW1lbnQsIG9yIG51bGwgaWYgdGhlIG5hdGl2ZSBjb250cm9sIGVsZW1lbnQgaXMgbm90IHByZXNlbnQuXG4gICAqIEByZXR1cm4gez9NRENTZWxlY3Rpb25Db250cm9sU3RhdGV9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXQgbmF0aXZlQ29udHJvbF8oKSB7XG4gICAgY29uc3Qge05BVElWRV9DT05UUk9MX1NFTEVDVE9SfSA9IE1EQ1N3aXRjaEZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCBlbCA9IC8qKiBAdHlwZSB7P01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX0gKi8gKFxuICAgICAgdGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yKE5BVElWRV9DT05UUk9MX1NFTEVDVE9SKSk7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGV9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpbml0UmlwcGxlXygpIHtcbiAgICBjb25zdCB7UklQUExFX1NVUkZBQ0VfU0VMRUNUT1J9ID0gTURDU3dpdGNoRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHJpcHBsZVN1cmZhY2UgPSAvKiogQHR5cGUgeyFFbGVtZW50fSAqLyAodGhpcy5yb290Xy5xdWVyeVNlbGVjdG9yKFJJUFBMRV9TVVJGQUNFX1NFTEVDVE9SKSk7XG5cbiAgICBjb25zdCBNQVRDSEVTID0gZ2V0TWF0Y2hlc1Byb3BlcnR5KEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG4gICAgY29uc3QgYWRhcHRlciA9IE9iamVjdC5hc3NpZ24oTURDUmlwcGxlLmNyZWF0ZUFkYXB0ZXIodGhpcyksIHtcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiB0cnVlLFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiB0aGlzLm5hdGl2ZUNvbnRyb2xfW01BVENIRVNdKCc6YWN0aXZlJyksXG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gcmlwcGxlU3VyZmFjZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gcmlwcGxlU3VyZmFjZS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHRoaXMubmF0aXZlQ29udHJvbF8uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB0aGlzLm5hdGl2ZUNvbnRyb2xfLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiByaXBwbGVTdXJmYWNlLnN0eWxlLnNldFByb3BlcnR5KHZhck5hbWUsIHZhbHVlKSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IHJpcHBsZVN1cmZhY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgfSk7XG4gICAgY29uc3QgZm91bmRhdGlvbiA9IG5ldyBNRENSaXBwbGVGb3VuZGF0aW9uKGFkYXB0ZXIpO1xuICAgIHJldHVybiBuZXcgTURDUmlwcGxlKHRoaXMucm9vdF8sIGZvdW5kYXRpb24pO1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFNRENTd2l0Y2hGb3VuZGF0aW9ufSAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE1EQ1N3aXRjaEZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMucm9vdF8uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMucm9vdF8uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgICAgc2V0TmF0aXZlQ29udHJvbENoZWNrZWQ6IChjaGVja2VkKSA9PiB0aGlzLm5hdGl2ZUNvbnRyb2xfLmNoZWNrZWQgPSBjaGVja2VkLFxuICAgICAgc2V0TmF0aXZlQ29udHJvbERpc2FibGVkOiAoZGlzYWJsZWQpID0+IHRoaXMubmF0aXZlQ29udHJvbF8uZGlzYWJsZWQgPSBkaXNhYmxlZCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDUmlwcGxlfSAqL1xuICBnZXQgcmlwcGxlKCkge1xuICAgIHJldHVybiB0aGlzLnJpcHBsZV87XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgZ2V0IGNoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF0aXZlQ29udHJvbF8uY2hlY2tlZDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgKi9cbiAgc2V0IGNoZWNrZWQoY2hlY2tlZCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0Q2hlY2tlZChjaGVja2VkKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgZGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF0aXZlQ29udHJvbF8uZGlzYWJsZWQ7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZCAqL1xuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldERpc2FibGVkKGRpc2FibGVkKTtcbiAgfVxufVxuXG5leHBvcnQge01EQ1N3aXRjaEZvdW5kYXRpb24sIE1EQ1N3aXRjaH07XG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgaWYgKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcclxuICAgICAgICAkKCcuc2VsZWN0cGlja2VyJykuc2VsZWN0cGlja2VyKCdtb2JpbGUnKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5oZWFkZXJfX21lbnUtb3BlbicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ25vc2Nyb2xsLXknKTtcclxuICAgICAgICAkKCcuaGVhZGVyX19kcm9wZG93bicpLmZhZGVJbigpO1xyXG4gICAgfSlcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmhlYWRlcl9fbWVudS1jbG9zZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ25vc2Nyb2xsLXknKTtcclxuICAgICAgICAkKCcuaGVhZGVyX19kcm9wZG93bicpLmZhZGVPdXQoKTtcclxuICAgIH0pXHJcblxyXG5cclxuICAgIHZhciBmb290ZXJGdW5jO1xyXG4gICAgKGZvb3RlckZ1bmMgPSBmdW5jdGlvbiBmb290ZXJGdW5jKCkge1xyXG4gICAgICAgICQoJ2Zvb3RlcicpLmNzcygncG9zaXRpb24nLCAnc3RhdGljJyk7XHJcbiAgICAgICAgJCgnYm9keScpLmNzcygnbWluLWhlaWdodCcsICcxMDBweCcpO1xyXG5cclxuICAgICAgICB2YXIgYm9keUhlaWdodCA9ICQoJ2JvZHknKS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgPiBib2R5SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5jc3MoJ21pbi1oZWlnaHQnLCAnMTAwdmgnKTtcclxuICAgICAgICAgICAgJCgnZm9vdGVyJykuY3NzKHsncG9zaXRpb24nOiAnYWJzb2x1dGUnLCAnYm90dG9tJzogJzAnfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy51c2VyX19zZXR0aW5ncy1vcGVuJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIF91c2VyID0gJCh0aGlzKS5jbG9zZXN0KCcudXNlcicpLFxyXG4gICAgICAgICAgICBfdXNlclNldHRpbmdzID0gX3VzZXIuZmluZCgnLnVzZXJfX3NldHRpbmdzJyksXHJcbiAgICAgICAgICAgIF91c2VyTmFtZSA9IF91c2VyLmZpbmQoJy51c2VyX19uYW1lJyk7XHJcblxyXG4gICAgICAgICQoJy51c2VyX19uYW1lJykuc2hvdygpO1xyXG4gICAgICAgICQoJy51c2VyX19zZXR0aW5ncycpLnJlbW92ZUNsYXNzKCd1c2VyX19zZXR0aW5ncy0tYWN0aXZlJyk7XHJcbiAgICAgICAgX3VzZXJOYW1lLmhpZGUoKTtcclxuICAgICAgICBfdXNlclNldHRpbmdzLmFkZENsYXNzKCd1c2VyX19zZXR0aW5ncy0tYWN0aXZlJyk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcudXNlcl9fc2V0dGluZ3MtY2xvc2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgX3VzZXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy51c2VyJyksXHJcbiAgICAgICAgICAgIF91c2VyU2V0dGluZ3MgPSBfdXNlci5maW5kKCcudXNlcl9fc2V0dGluZ3MnKSxcclxuICAgICAgICAgICAgX3VzZXJOYW1lID0gX3VzZXIuZmluZCgnLnVzZXJfX25hbWUnKTtcclxuXHJcbiAgICAgICAgX3VzZXJOYW1lLnNob3coKTtcclxuICAgICAgICBfdXNlclNldHRpbmdzLnJlbW92ZUNsYXNzKCd1c2VyX19zZXR0aW5ncy0tYWN0aXZlJyk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoXCIjYWNjb3JkaW9uXCIpLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnVzZXJfX25hbWUnKS5zaG93KCk7XHJcbiAgICAgICAgJCgnLnVzZXJfX3NldHRpbmdzJykucmVtb3ZlQ2xhc3MoJ3VzZXJfX3NldHRpbmdzLS1hY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBjbChhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIGYxO1xyXG4gICAgKGYxID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgfSlcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2sgdG91Y2gnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICAkKCcgJykub24oe1xyXG4gICAgICAgIG1vdXNlZW50ZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3VzZWxlYXZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgICQoJycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfc2VsZWN0ID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKTtcclxuICAgICAgICBfc2VsZWN0Lm9uKCdjaGFuZ2VkLmJzLnNlbGVjdCcsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBfc2VsZWN0ZWRPcHRpb24gPSAkKHRoaXMpLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICAkKFwiI2FjY29yZGlvblwiKS5vbignc2hvdy5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB9KTtcclxuICAgICQoXCIjYWNjb3JkaW9uXCIpLm9uKCdoaWRlLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvKiogaG92ZXIgaW1nICovXHJcblxyXG4gICAgJChcIi5ob3Zlci1pbWdfX3dyYXBwZXI6bm90KC5ob3Zlci1pbWdfX3dyYXBwZXItLWFjdGl2ZSlcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRlZmF1bHRJbWcgPSAkKHRoaXMpLmZpbmQoJ2ltZycpO1xyXG4gICAgICAgIHZhciBoaWRkZW5JbWcgPSBkZWZhdWx0SW1nLmNsb25lKCk7XHJcbiAgICAgICAgdmFyIGhvdmVyU3JjID0gaGlkZGVuSW1nLmF0dHIoJ2RhdGEtc3JjJyk7XHJcbiAgICAgICAgaGlkZGVuSW1nLmF0dHIoJ3NyYycsIGhvdmVyU3JjKS5oaWRlKCkuaW5zZXJ0QmVmb3JlKGRlZmF1bHRJbWcpO1xyXG5cclxuICAgICAgICAkKHRoaXMpLm9uKHtcclxuICAgICAgICAgICAgbW91c2VlbnRlcjogZnVuY3Rpb24gbW91c2VlbnRlcigpIHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRJbWcuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuSW1nLnNob3coKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW91c2VsZWF2ZTogZnVuY3Rpb24gbW91c2VsZWF2ZSgpIHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRJbWcuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgaGlkZGVuSW1nLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGRlZmF1bHRJbWcgPSAkKFwiLmhvdmVyLWltZ19fd3JhcHBlci0tYWN0aXZlXCIpLmZpbmQoJ2ltZycpLmhpZGUoKTtcclxuICAgIHZhciBoaWRkZW5JbWcgPSBkZWZhdWx0SW1nLmNsb25lKCk7XHJcbiAgICB2YXIgaG92ZXJTcmMgPSBoaWRkZW5JbWcuYXR0cignZGF0YS1zcmMnKTtcclxuICAgIGhpZGRlbkltZy5hdHRyKCdzcmMnLCBob3ZlclNyYykuaW5zZXJ0QmVmb3JlKGRlZmF1bHRJbWcpLnNob3coKTtcclxuXHJcblxyXG4gICAgJCgnLnRpbWUnKS5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgZm9ybWF0OiAnSEg6bW0nLFxyXG4gICAgICAgIGRlZmF1bHREYXRlOiBtb21lbnQoKSxcclxuICAgICAgICBpY29uczoge1xyXG4gICAgICAgICAgICB1cDogXCJtYXRlcmlhbC1pY29uc1wiLFxyXG4gICAgICAgICAgICBkb3duOiBcIm1hdGVyaWFsLWljb25zXCJcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuZGF0ZScpLmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICBmb3JtYXQ6ICdERC5NTS5ZWScsXHJcbiAgICAgICAgZGVmYXVsdERhdGU6IG1vbWVudCgpLFxyXG4gICAgICAgIGljb25zOiB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzOiAnbWF0ZXJpYWwtaWNvbnMnLFxyXG4gICAgICAgICAgICBuZXh0OiAnbWF0ZXJpYWwtaWNvbnMnXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoJ2lucHV0Lm9ubHktbnVtYmVyJykuYmluZCgna2V5cHJlc3MnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLndoaWNoICE9IDEzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoL1tcXGQuK10vLnRlc3QoZS5rZXkpKTsgIC8vIElFID4gOVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICB2YXIgdyA9IHdpbmRvdyxcclxuICAgICAgICBkID0gZG9jdW1lbnQsXHJcbiAgICAgICAgZSA9IGQuZG9jdW1lbnRFbGVtZW50LFxyXG4gICAgICAgIGcgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0sXHJcbiAgICAgICAgeCA9IHcuaW5uZXJXaWR0aCB8fCBlLmNsaWVudFdpZHRoIHx8IGcuY2xpZW50V2lkdGg7XHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvb3RlckZ1bmMoKTtcclxuXHJcbiAgICAgICAgdmFyIHQgPSB3LmlubmVyV2lkdGggfHwgZS5jbGllbnRXaWR0aCB8fCBnLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIGlmICh0ICE9PSB4KSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KTtcclxuIl19
