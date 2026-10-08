var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../../node_modules/react/cjs/react.production.js
var require_react_production = __commonJS({
  "../../../node_modules/react/cjs/react.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component2(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component2.prototype.isReactComponent = {};
    Component2.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component2.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component2.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component2.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, self, source, owner, props) {
      self = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== self ? self : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(
        oldElement.type,
        newKey,
        void 0,
        void 0,
        void 0,
        oldElement.props
      );
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function noop$1() {
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject;
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error;
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = ctor);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    function noop2() {
    }
    exports.Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    exports.Component = Component2;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.act = function() {
      throw Error("act(...) is not supported in production builds of React.");
    };
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key, owner = void 0;
      if (null != config)
        for (propName in void 0 !== config.ref && (owner = void 0), void 0 !== config.key && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, void 0, void 0, owner, props);
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, void 0, void 0, null, props);
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(render2) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render: render2 };
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    exports.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop2, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        ReactSharedInternals.T = prevTransition;
      }
    };
    exports.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    exports.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    exports.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports.version = "19.0.0";
  }
});

// ../../../node_modules/react/index.js
var require_react = __commonJS({
  "../../../node_modules/react/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_production();
    } else {
      module.exports = null;
    }
  }
});

// ../../../node_modules/react-dom/cjs/react-dom.production.js
var require_react_dom_production = __commonJS({
  "../../../node_modules/react-dom/cjs/react-dom.production.js"(exports) {
    "use strict";
    var React3 = require_react();
    function formatProdErrorMessage(code) {
      var url = "https://react.dev/errors/" + code;
      if (1 < arguments.length) {
        url += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2; i < arguments.length; i++)
          url += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function noop2() {
    }
    var Internals = {
      d: {
        f: noop2,
        r: function() {
          throw Error(formatProdErrorMessage(522));
        },
        D: noop2,
        C: noop2,
        L: noop2,
        m: noop2,
        X: noop2,
        S: noop2,
        M: noop2
      },
      p: 0,
      findDOMNode: null
    };
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    function createPortal$1(children, containerInfo, implementation) {
      var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: null == key ? null : "" + key,
        children,
        containerInfo,
        implementation
      };
    }
    var ReactSharedInternals = React3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function getCrossOriginStringAs(as, input) {
      if ("font" === as) return "";
      if ("string" === typeof input)
        return "use-credentials" === input ? input : "";
    }
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    exports.createPortal = function(children, container) {
      var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
        throw Error(formatProdErrorMessage(299));
      return createPortal$1(children, container, null, key);
    };
    exports.flushSync = function(fn) {
      var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
      try {
        if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
      } finally {
        ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
      }
    };
    exports.preconnect = function(href, options) {
      "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
    };
    exports.prefetchDNS = function(href) {
      "string" === typeof href && Internals.d.D(href);
    };
    exports.preinit = function(href, options) {
      if ("string" === typeof href && options && "string" === typeof options.as) {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
        "style" === as ? Internals.d.S(
          href,
          "string" === typeof options.precedence ? options.precedence : void 0,
          {
            crossOrigin,
            integrity,
            fetchPriority
          }
        ) : "script" === as && Internals.d.X(href, {
          crossOrigin,
          integrity,
          fetchPriority,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
      }
    };
    exports.preinitModule = function(href, options) {
      if ("string" === typeof href)
        if ("object" === typeof options && null !== options) {
          if (null == options.as || "script" === options.as) {
            var crossOrigin = getCrossOriginStringAs(
              options.as,
              options.crossOrigin
            );
            Internals.d.M(href, {
              crossOrigin,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0
            });
          }
        } else null == options && Internals.d.M(href);
    };
    exports.preload = function(href, options) {
      if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
        Internals.d.L(href, as, {
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          type: "string" === typeof options.type ? options.type : void 0,
          fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
          referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
          imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
          imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
          media: "string" === typeof options.media ? options.media : void 0
        });
      }
    };
    exports.preloadModule = function(href, options) {
      if ("string" === typeof href)
        if (options) {
          var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
          Internals.d.m(href, {
            as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0
          });
        } else Internals.d.m(href);
    };
    exports.requestFormReset = function(form) {
      Internals.d.r(form);
    };
    exports.unstable_batchedUpdates = function(fn, a) {
      return fn(a);
    };
    exports.useFormState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useFormState(action, initialState, permalink);
    };
    exports.useFormStatus = function() {
      return ReactSharedInternals.H.useHostTransitionStatus();
    };
    exports.version = "19.0.0";
  }
});

// ../../../node_modules/react-dom/index.js
var require_react_dom = __commonJS({
  "../../../node_modules/react-dom/index.js"(exports, module) {
    "use strict";
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {
        throw new Error("^_^");
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_production();
    } else {
      module.exports = null;
    }
  }
});

// ../../../node_modules/react-dom/cjs/react-dom-server-legacy.node.production.js
var require_react_dom_server_legacy_node_production = __commonJS({
  "../../../node_modules/react-dom/cjs/react-dom-server-legacy.node.production.js"(exports) {
    "use strict";
    var React3 = require_react();
    var ReactDOM = require_react_dom();
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
    var REACT_PROVIDER_TYPE = /* @__PURE__ */ Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
    var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
    var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    var REACT_SCOPE_TYPE = /* @__PURE__ */ Symbol.for("react.scope");
    var REACT_DEBUG_TRACING_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.debug_trace_mode");
    var REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for("react.offscreen");
    var REACT_LEGACY_HIDDEN_TYPE = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
    var REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    var isArrayImpl = Array.isArray;
    function murmurhash3_32_gc(key, seed) {
      var remainder = key.length & 3;
      var bytes = key.length - remainder;
      var h1 = seed;
      for (seed = 0; seed < bytes; ) {
        var k1 = key.charCodeAt(seed) & 255 | (key.charCodeAt(++seed) & 255) << 8 | (key.charCodeAt(++seed) & 255) << 16 | (key.charCodeAt(++seed) & 255) << 24;
        ++seed;
        k1 = 3432918353 * (k1 & 65535) + ((3432918353 * (k1 >>> 16) & 65535) << 16) & 4294967295;
        k1 = k1 << 15 | k1 >>> 17;
        k1 = 461845907 * (k1 & 65535) + ((461845907 * (k1 >>> 16) & 65535) << 16) & 4294967295;
        h1 ^= k1;
        h1 = h1 << 13 | h1 >>> 19;
        h1 = 5 * (h1 & 65535) + ((5 * (h1 >>> 16) & 65535) << 16) & 4294967295;
        h1 = (h1 & 65535) + 27492 + (((h1 >>> 16) + 58964 & 65535) << 16);
      }
      k1 = 0;
      switch (remainder) {
        case 3:
          k1 ^= (key.charCodeAt(seed + 2) & 255) << 16;
        case 2:
          k1 ^= (key.charCodeAt(seed + 1) & 255) << 8;
        case 1:
          k1 ^= key.charCodeAt(seed) & 255, k1 = 3432918353 * (k1 & 65535) + ((3432918353 * (k1 >>> 16) & 65535) << 16) & 4294967295, k1 = k1 << 15 | k1 >>> 17, h1 ^= 461845907 * (k1 & 65535) + ((461845907 * (k1 >>> 16) & 65535) << 16) & 4294967295;
      }
      h1 ^= key.length;
      h1 ^= h1 >>> 16;
      h1 = 2246822507 * (h1 & 65535) + ((2246822507 * (h1 >>> 16) & 65535) << 16) & 4294967295;
      h1 ^= h1 >>> 13;
      h1 = 3266489909 * (h1 & 65535) + ((3266489909 * (h1 >>> 16) & 65535) << 16) & 4294967295;
      return (h1 ^ h1 >>> 16) >>> 0;
    }
    var assign = Object.assign;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    );
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return true;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return validatedAttributeNameCache[attributeName] = true;
      illegalAttributeNameCache[attributeName] = true;
      return false;
    }
    var unitlessNumbers = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    var aliases = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]);
    var matchHtmlRegExp = /["'&<>]/;
    function escapeTextForBrowser(text) {
      if ("boolean" === typeof text || "number" === typeof text || "bigint" === typeof text)
        return "" + text;
      text = "" + text;
      var match = matchHtmlRegExp.exec(text);
      if (match) {
        var html = "", index, lastIndex = 0;
        for (index = match.index; index < text.length; index++) {
          switch (text.charCodeAt(index)) {
            case 34:
              match = "&quot;";
              break;
            case 38:
              match = "&amp;";
              break;
            case 39:
              match = "&#x27;";
              break;
            case 60:
              match = "&lt;";
              break;
            case 62:
              match = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += text.slice(lastIndex, index));
          lastIndex = index + 1;
          html += match;
        }
        text = lastIndex !== index ? html + text.slice(lastIndex, index) : html;
      }
      return text;
    }
    var uppercasePattern = /([A-Z])/g;
    var msPattern = /^ms-/;
    var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function sanitizeURL(url) {
      return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
    }
    var ReactSharedInternals = React3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var sharedNotPendingObject = {
      pending: false,
      data: null,
      method: null,
      action: null
    };
    var previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
      f: previousDispatcher.f,
      r: previousDispatcher.r,
      D: prefetchDNS,
      C: preconnect,
      L: preload,
      m: preloadModule,
      X: preinitScript,
      S: preinitStyle,
      M: preinitModuleScript
    };
    var PRELOAD_NO_CREDS = [];
    var scriptRegex = /(<\/|<)(s)(cript)/gi;
    function scriptReplacer(match, prefix2, s, suffix2) {
      return "" + prefix2 + ("s" === s ? "\\u0073" : "\\u0053") + suffix2;
    }
    function createResumableState(identifierPrefix, externalRuntimeConfig, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
      return {
        idPrefix: void 0 === identifierPrefix ? "" : identifierPrefix,
        nextFormID: 0,
        streamingFormat: 0,
        bootstrapScriptContent,
        bootstrapScripts,
        bootstrapModules,
        instructions: 0,
        hasBody: false,
        hasHtml: false,
        unknownResources: {},
        dnsResources: {},
        connectResources: { default: {}, anonymous: {}, credentials: {} },
        imageResources: {},
        styleResources: {},
        scriptResources: {},
        moduleUnknownResources: {},
        moduleScriptResources: {}
      };
    }
    function createFormatContext(insertionMode, selectedValue, tagScope) {
      return {
        insertionMode,
        selectedValue,
        tagScope
      };
    }
    function getChildFormatContext(parentContext, type, props) {
      switch (type) {
        case "noscript":
          return createFormatContext(2, null, parentContext.tagScope | 1);
        case "select":
          return createFormatContext(
            2,
            null != props.value ? props.value : props.defaultValue,
            parentContext.tagScope
          );
        case "svg":
          return createFormatContext(3, null, parentContext.tagScope);
        case "picture":
          return createFormatContext(2, null, parentContext.tagScope | 2);
        case "math":
          return createFormatContext(4, null, parentContext.tagScope);
        case "foreignObject":
          return createFormatContext(2, null, parentContext.tagScope);
        case "table":
          return createFormatContext(5, null, parentContext.tagScope);
        case "thead":
        case "tbody":
        case "tfoot":
          return createFormatContext(6, null, parentContext.tagScope);
        case "colgroup":
          return createFormatContext(8, null, parentContext.tagScope);
        case "tr":
          return createFormatContext(7, null, parentContext.tagScope);
      }
      return 5 <= parentContext.insertionMode ? createFormatContext(2, null, parentContext.tagScope) : 0 === parentContext.insertionMode ? "html" === type ? createFormatContext(1, null, parentContext.tagScope) : createFormatContext(2, null, parentContext.tagScope) : 1 === parentContext.insertionMode ? createFormatContext(2, null, parentContext.tagScope) : parentContext;
    }
    var styleNameCache = /* @__PURE__ */ new Map();
    function pushStyleAttribute(target, style) {
      if ("object" !== typeof style)
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      var isFirst = true, styleName;
      for (styleName in style)
        if (hasOwnProperty.call(style, styleName)) {
          var styleValue = style[styleName];
          if (null != styleValue && "boolean" !== typeof styleValue && "" !== styleValue) {
            if (0 === styleName.indexOf("--")) {
              var nameChunk = escapeTextForBrowser(styleName);
              styleValue = escapeTextForBrowser(("" + styleValue).trim());
            } else
              nameChunk = styleNameCache.get(styleName), void 0 === nameChunk && (nameChunk = escapeTextForBrowser(
                styleName.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-")
              ), styleNameCache.set(styleName, nameChunk)), styleValue = "number" === typeof styleValue ? 0 === styleValue || unitlessNumbers.has(styleName) ? "" + styleValue : styleValue + "px" : escapeTextForBrowser(("" + styleValue).trim());
            isFirst ? (isFirst = false, target.push(' style="', nameChunk, ":", styleValue)) : target.push(";", nameChunk, ":", styleValue);
          }
        }
      isFirst || target.push('"');
    }
    function pushBooleanAttribute(target, name, value) {
      value && "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '=""');
    }
    function pushStringAttribute(target, name, value) {
      "function" !== typeof value && "symbol" !== typeof value && "boolean" !== typeof value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
    }
    var actionJavaScriptURL = escapeTextForBrowser(
      "javascript:throw new Error('React form unexpectedly submitted.')"
    );
    function pushAdditionalFormField(value, key) {
      this.push('<input type="hidden"');
      validateAdditionalFormField(value);
      pushStringAttribute(this, "name", key);
      pushStringAttribute(this, "value", value);
      this.push("/>");
    }
    function validateAdditionalFormField(value) {
      if ("string" !== typeof value)
        throw Error(
          "File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration."
        );
    }
    function getCustomFormFields(resumableState, formAction) {
      if ("function" === typeof formAction.$$FORM_ACTION) {
        var id3 = resumableState.nextFormID++;
        resumableState = resumableState.idPrefix + id3;
        try {
          var customFields = formAction.$$FORM_ACTION(resumableState);
          if (customFields) {
            var formData = customFields.data;
            null != formData && formData.forEach(validateAdditionalFormField);
          }
          return customFields;
        } catch (x) {
          if ("object" === typeof x && null !== x && "function" === typeof x.then)
            throw x;
        }
      }
      return null;
    }
    function pushFormActionAttribute(target, resumableState, renderState, formAction, formEncType, formMethod, formTarget, name) {
      var formData = null;
      if ("function" === typeof formAction) {
        var customFields = getCustomFormFields(resumableState, formAction);
        null !== customFields ? (name = customFields.name, formAction = customFields.action || "", formEncType = customFields.encType, formMethod = customFields.method, formTarget = customFields.target, formData = customFields.data) : (target.push(" ", "formAction", '="', actionJavaScriptURL, '"'), formTarget = formMethod = formEncType = formAction = name = null, injectFormReplayingRuntime(resumableState, renderState));
      }
      null != name && pushAttribute(target, "name", name);
      null != formAction && pushAttribute(target, "formAction", formAction);
      null != formEncType && pushAttribute(target, "formEncType", formEncType);
      null != formMethod && pushAttribute(target, "formMethod", formMethod);
      null != formTarget && pushAttribute(target, "formTarget", formTarget);
      return formData;
    }
    function pushAttribute(target, name, value) {
      switch (name) {
        case "className":
          pushStringAttribute(target, "class", value);
          break;
        case "tabIndex":
          pushStringAttribute(target, "tabindex", value);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          pushStringAttribute(target, name, value);
          break;
        case "style":
          pushStyleAttribute(target, value);
          break;
        case "src":
        case "href":
          if ("" === value) break;
        case "action":
        case "formAction":
          if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
            break;
          value = sanitizeURL("" + value);
          target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "ref":
          break;
        case "autoFocus":
        case "multiple":
        case "muted":
          pushBooleanAttribute(target, name.toLowerCase(), value);
          break;
        case "xlinkHref":
          if ("function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
            break;
          value = sanitizeURL("" + value);
          target.push(" ", "xlink:href", '="', escapeTextForBrowser(value), '"');
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          value && "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '=""');
          break;
        case "capture":
        case "download":
          true === value ? target.push(" ", name, '=""') : false !== value && "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "rowSpan":
        case "start":
          "function" === typeof value || "symbol" === typeof value || isNaN(value) || target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "xlinkActuate":
          pushStringAttribute(target, "xlink:actuate", value);
          break;
        case "xlinkArcrole":
          pushStringAttribute(target, "xlink:arcrole", value);
          break;
        case "xlinkRole":
          pushStringAttribute(target, "xlink:role", value);
          break;
        case "xlinkShow":
          pushStringAttribute(target, "xlink:show", value);
          break;
        case "xlinkTitle":
          pushStringAttribute(target, "xlink:title", value);
          break;
        case "xlinkType":
          pushStringAttribute(target, "xlink:type", value);
          break;
        case "xmlBase":
          pushStringAttribute(target, "xml:base", value);
          break;
        case "xmlLang":
          pushStringAttribute(target, "xml:lang", value);
          break;
        case "xmlSpace":
          pushStringAttribute(target, "xml:space", value);
          break;
        default:
          if (!(2 < name.length) || "o" !== name[0] && "O" !== name[0] || "n" !== name[1] && "N" !== name[1]) {
            if (name = aliases.get(name) || name, isAttributeNameSafe(name)) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean":
                  var prefix$8 = name.toLowerCase().slice(0, 5);
                  if ("data-" !== prefix$8 && "aria-" !== prefix$8) return;
              }
              target.push(" ", name, '="', escapeTextForBrowser(value), '"');
            }
          }
      }
    }
    function pushInnerHTML(target, innerHTML, children) {
      if (null != innerHTML) {
        if (null != children)
          throw Error(
            "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
          );
        if ("object" !== typeof innerHTML || !("__html" in innerHTML))
          throw Error(
            "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
          );
        innerHTML = innerHTML.__html;
        null !== innerHTML && void 0 !== innerHTML && target.push("" + innerHTML);
      }
    }
    function flattenOptionChildren(children) {
      var content = "";
      React3.Children.forEach(children, function(child) {
        null != child && (content += child);
      });
      return content;
    }
    function injectFormReplayingRuntime(resumableState, renderState) {
      0 === (resumableState.instructions & 16) && (resumableState.instructions |= 16, renderState.bootstrapChunks.unshift(
        renderState.startInlineScript,
        `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`,
        "</script>"
      ));
    }
    function pushLinkImpl(target, props) {
      target.push(startChunkForTag("link"));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push("/>");
      return null;
    }
    var styleRegex = /(<\/|<)(s)(tyle)/gi;
    function styleReplacer(match, prefix2, s, suffix2) {
      return "" + prefix2 + ("s" === s ? "\\73 " : "\\53 ") + suffix2;
    }
    function pushSelfClosing(target, props, tag) {
      target.push(startChunkForTag(tag));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push("/>");
      return null;
    }
    function pushTitleImpl(target, props) {
      target.push(startChunkForTag("title"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(">");
      props = Array.isArray(children) ? 2 > children.length ? children[0] : null : children;
      "function" !== typeof props && "symbol" !== typeof props && null !== props && void 0 !== props && target.push(escapeTextForBrowser("" + props));
      pushInnerHTML(target, innerHTML, children);
      target.push(endChunkForTag("title"));
      return null;
    }
    function pushScriptImpl(target, props) {
      target.push(startChunkForTag("script"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(">");
      pushInnerHTML(target, innerHTML, children);
      "string" === typeof children && target.push(("" + children).replace(scriptRegex, scriptReplacer));
      target.push(endChunkForTag("script"));
      return null;
    }
    function pushStartGenericElement(target, props, tag) {
      target.push(startChunkForTag(tag));
      var innerHTML = tag = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                tag = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(">");
      pushInnerHTML(target, innerHTML, tag);
      return "string" === typeof tag ? (target.push(escapeTextForBrowser(tag)), null) : tag;
    }
    var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var validatedTagCache = /* @__PURE__ */ new Map();
    function startChunkForTag(tag) {
      var tagStartChunk = validatedTagCache.get(tag);
      if (void 0 === tagStartChunk) {
        if (!VALID_TAG_REGEX.test(tag)) throw Error("Invalid tag: " + tag);
        tagStartChunk = "<" + tag;
        validatedTagCache.set(tag, tagStartChunk);
      }
      return tagStartChunk;
    }
    function pushStartInstance(target$jscomp$0, type, props, resumableState, renderState, hoistableState, formatContext, textEmbedded, isFallback) {
      switch (type) {
        case "div":
        case "span":
        case "svg":
        case "path":
          break;
        case "a":
          target$jscomp$0.push(startChunkForTag("a"));
          var children = null, innerHTML = null, propKey;
          for (propKey in props)
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (null != propValue)
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "href":
                    "" === propValue ? pushStringAttribute(target$jscomp$0, "href", "") : pushAttribute(target$jscomp$0, propKey, propValue);
                    break;
                  default:
                    pushAttribute(target$jscomp$0, propKey, propValue);
                }
            }
          target$jscomp$0.push(">");
          pushInnerHTML(target$jscomp$0, innerHTML, children);
          if ("string" === typeof children) {
            target$jscomp$0.push(escapeTextForBrowser(children));
            var JSCompiler_inline_result = null;
          } else JSCompiler_inline_result = children;
          return JSCompiler_inline_result;
        case "g":
        case "p":
        case "li":
          break;
        case "select":
          target$jscomp$0.push(startChunkForTag("select"));
          var children$jscomp$0 = null, innerHTML$jscomp$0 = null, propKey$jscomp$0;
          for (propKey$jscomp$0 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$0)) {
              var propValue$jscomp$0 = props[propKey$jscomp$0];
              if (null != propValue$jscomp$0)
                switch (propKey$jscomp$0) {
                  case "children":
                    children$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$0,
                      propValue$jscomp$0
                    );
                }
            }
          target$jscomp$0.push(">");
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$0, children$jscomp$0);
          return children$jscomp$0;
        case "option":
          var selectedValue = formatContext.selectedValue;
          target$jscomp$0.push(startChunkForTag("option"));
          var children$jscomp$1 = null, value = null, selected = null, innerHTML$jscomp$1 = null, propKey$jscomp$1;
          for (propKey$jscomp$1 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$1)) {
              var propValue$jscomp$1 = props[propKey$jscomp$1];
              if (null != propValue$jscomp$1)
                switch (propKey$jscomp$1) {
                  case "children":
                    children$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "selected":
                    selected = propValue$jscomp$1;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "value":
                    value = propValue$jscomp$1;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$1,
                      propValue$jscomp$1
                    );
                }
            }
          if (null != selectedValue) {
            var stringValue = null !== value ? "" + value : flattenOptionChildren(children$jscomp$1);
            if (isArrayImpl(selectedValue))
              for (var i = 0; i < selectedValue.length; i++) {
                if ("" + selectedValue[i] === stringValue) {
                  target$jscomp$0.push(' selected=""');
                  break;
                }
              }
            else
              "" + selectedValue === stringValue && target$jscomp$0.push(' selected=""');
          } else selected && target$jscomp$0.push(' selected=""');
          target$jscomp$0.push(">");
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$1, children$jscomp$1);
          return children$jscomp$1;
        case "textarea":
          target$jscomp$0.push(startChunkForTag("textarea"));
          var value$jscomp$0 = null, defaultValue = null, children$jscomp$2 = null, propKey$jscomp$2;
          for (propKey$jscomp$2 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$2)) {
              var propValue$jscomp$2 = props[propKey$jscomp$2];
              if (null != propValue$jscomp$2)
                switch (propKey$jscomp$2) {
                  case "children":
                    children$jscomp$2 = propValue$jscomp$2;
                    break;
                  case "value":
                    value$jscomp$0 = propValue$jscomp$2;
                    break;
                  case "defaultValue":
                    defaultValue = propValue$jscomp$2;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$2,
                      propValue$jscomp$2
                    );
                }
            }
          null === value$jscomp$0 && null !== defaultValue && (value$jscomp$0 = defaultValue);
          target$jscomp$0.push(">");
          if (null != children$jscomp$2) {
            if (null != value$jscomp$0)
              throw Error(
                "If you supply `defaultValue` on a <textarea>, do not pass children."
              );
            if (isArrayImpl(children$jscomp$2)) {
              if (1 < children$jscomp$2.length)
                throw Error("<textarea> can only have at most one child.");
              value$jscomp$0 = "" + children$jscomp$2[0];
            }
            value$jscomp$0 = "" + children$jscomp$2;
          }
          "string" === typeof value$jscomp$0 && "\n" === value$jscomp$0[0] && target$jscomp$0.push("\n");
          null !== value$jscomp$0 && target$jscomp$0.push(escapeTextForBrowser("" + value$jscomp$0));
          return null;
        case "input":
          target$jscomp$0.push(startChunkForTag("input"));
          var name = null, formAction = null, formEncType = null, formMethod = null, formTarget = null, value$jscomp$1 = null, defaultValue$jscomp$0 = null, checked = null, defaultChecked = null, propKey$jscomp$3;
          for (propKey$jscomp$3 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$3)) {
              var propValue$jscomp$3 = props[propKey$jscomp$3];
              if (null != propValue$jscomp$3)
                switch (propKey$jscomp$3) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  case "name":
                    name = propValue$jscomp$3;
                    break;
                  case "formAction":
                    formAction = propValue$jscomp$3;
                    break;
                  case "formEncType":
                    formEncType = propValue$jscomp$3;
                    break;
                  case "formMethod":
                    formMethod = propValue$jscomp$3;
                    break;
                  case "formTarget":
                    formTarget = propValue$jscomp$3;
                    break;
                  case "defaultChecked":
                    defaultChecked = propValue$jscomp$3;
                    break;
                  case "defaultValue":
                    defaultValue$jscomp$0 = propValue$jscomp$3;
                    break;
                  case "checked":
                    checked = propValue$jscomp$3;
                    break;
                  case "value":
                    value$jscomp$1 = propValue$jscomp$3;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$3,
                      propValue$jscomp$3
                    );
                }
            }
          var formData = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction,
            formEncType,
            formMethod,
            formTarget,
            name
          );
          null !== checked ? pushBooleanAttribute(target$jscomp$0, "checked", checked) : null !== defaultChecked && pushBooleanAttribute(target$jscomp$0, "checked", defaultChecked);
          null !== value$jscomp$1 ? pushAttribute(target$jscomp$0, "value", value$jscomp$1) : null !== defaultValue$jscomp$0 && pushAttribute(target$jscomp$0, "value", defaultValue$jscomp$0);
          target$jscomp$0.push("/>");
          null != formData && formData.forEach(pushAdditionalFormField, target$jscomp$0);
          return null;
        case "button":
          target$jscomp$0.push(startChunkForTag("button"));
          var children$jscomp$3 = null, innerHTML$jscomp$2 = null, name$jscomp$0 = null, formAction$jscomp$0 = null, formEncType$jscomp$0 = null, formMethod$jscomp$0 = null, formTarget$jscomp$0 = null, propKey$jscomp$4;
          for (propKey$jscomp$4 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$4)) {
              var propValue$jscomp$4 = props[propKey$jscomp$4];
              if (null != propValue$jscomp$4)
                switch (propKey$jscomp$4) {
                  case "children":
                    children$jscomp$3 = propValue$jscomp$4;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$2 = propValue$jscomp$4;
                    break;
                  case "name":
                    name$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formAction":
                    formAction$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formEncType":
                    formEncType$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formMethod":
                    formMethod$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formTarget":
                    formTarget$jscomp$0 = propValue$jscomp$4;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$4,
                      propValue$jscomp$4
                    );
                }
            }
          var formData$jscomp$0 = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction$jscomp$0,
            formEncType$jscomp$0,
            formMethod$jscomp$0,
            formTarget$jscomp$0,
            name$jscomp$0
          );
          target$jscomp$0.push(">");
          null != formData$jscomp$0 && formData$jscomp$0.forEach(pushAdditionalFormField, target$jscomp$0);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$2, children$jscomp$3);
          if ("string" === typeof children$jscomp$3) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$3));
            var JSCompiler_inline_result$jscomp$0 = null;
          } else JSCompiler_inline_result$jscomp$0 = children$jscomp$3;
          return JSCompiler_inline_result$jscomp$0;
        case "form":
          target$jscomp$0.push(startChunkForTag("form"));
          var children$jscomp$4 = null, innerHTML$jscomp$3 = null, formAction$jscomp$1 = null, formEncType$jscomp$1 = null, formMethod$jscomp$1 = null, formTarget$jscomp$1 = null, propKey$jscomp$5;
          for (propKey$jscomp$5 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$5)) {
              var propValue$jscomp$5 = props[propKey$jscomp$5];
              if (null != propValue$jscomp$5)
                switch (propKey$jscomp$5) {
                  case "children":
                    children$jscomp$4 = propValue$jscomp$5;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$3 = propValue$jscomp$5;
                    break;
                  case "action":
                    formAction$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "encType":
                    formEncType$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "method":
                    formMethod$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "target":
                    formTarget$jscomp$1 = propValue$jscomp$5;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$5,
                      propValue$jscomp$5
                    );
                }
            }
          var formData$jscomp$1 = null, formActionName = null;
          if ("function" === typeof formAction$jscomp$1) {
            var customFields = getCustomFormFields(
              resumableState,
              formAction$jscomp$1
            );
            null !== customFields ? (formAction$jscomp$1 = customFields.action || "", formEncType$jscomp$1 = customFields.encType, formMethod$jscomp$1 = customFields.method, formTarget$jscomp$1 = customFields.target, formData$jscomp$1 = customFields.data, formActionName = customFields.name) : (target$jscomp$0.push(
              " ",
              "action",
              '="',
              actionJavaScriptURL,
              '"'
            ), formTarget$jscomp$1 = formMethod$jscomp$1 = formEncType$jscomp$1 = formAction$jscomp$1 = null, injectFormReplayingRuntime(resumableState, renderState));
          }
          null != formAction$jscomp$1 && pushAttribute(target$jscomp$0, "action", formAction$jscomp$1);
          null != formEncType$jscomp$1 && pushAttribute(target$jscomp$0, "encType", formEncType$jscomp$1);
          null != formMethod$jscomp$1 && pushAttribute(target$jscomp$0, "method", formMethod$jscomp$1);
          null != formTarget$jscomp$1 && pushAttribute(target$jscomp$0, "target", formTarget$jscomp$1);
          target$jscomp$0.push(">");
          null !== formActionName && (target$jscomp$0.push('<input type="hidden"'), pushStringAttribute(target$jscomp$0, "name", formActionName), target$jscomp$0.push("/>"), null != formData$jscomp$1 && formData$jscomp$1.forEach(pushAdditionalFormField, target$jscomp$0));
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$3, children$jscomp$4);
          if ("string" === typeof children$jscomp$4) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$4));
            var JSCompiler_inline_result$jscomp$1 = null;
          } else JSCompiler_inline_result$jscomp$1 = children$jscomp$4;
          return JSCompiler_inline_result$jscomp$1;
        case "menuitem":
          target$jscomp$0.push(startChunkForTag("menuitem"));
          for (var propKey$jscomp$6 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$6)) {
              var propValue$jscomp$6 = props[propKey$jscomp$6];
              if (null != propValue$jscomp$6)
                switch (propKey$jscomp$6) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "menuitems cannot have `children` nor `dangerouslySetInnerHTML`."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$6,
                      propValue$jscomp$6
                    );
                }
            }
          target$jscomp$0.push(">");
          return null;
        case "object":
          target$jscomp$0.push(startChunkForTag("object"));
          var children$jscomp$5 = null, innerHTML$jscomp$4 = null, propKey$jscomp$7;
          for (propKey$jscomp$7 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$7)) {
              var propValue$jscomp$7 = props[propKey$jscomp$7];
              if (null != propValue$jscomp$7)
                switch (propKey$jscomp$7) {
                  case "children":
                    children$jscomp$5 = propValue$jscomp$7;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$4 = propValue$jscomp$7;
                    break;
                  case "data":
                    var sanitizedValue = sanitizeURL("" + propValue$jscomp$7);
                    if ("" === sanitizedValue) break;
                    target$jscomp$0.push(
                      " ",
                      "data",
                      '="',
                      escapeTextForBrowser(sanitizedValue),
                      '"'
                    );
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$7,
                      propValue$jscomp$7
                    );
                }
            }
          target$jscomp$0.push(">");
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$4, children$jscomp$5);
          if ("string" === typeof children$jscomp$5) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$5));
            var JSCompiler_inline_result$jscomp$2 = null;
          } else JSCompiler_inline_result$jscomp$2 = children$jscomp$5;
          return JSCompiler_inline_result$jscomp$2;
        case "title":
          if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$3 = pushTitleImpl(
              target$jscomp$0,
              props
            );
          else
            isFallback ? JSCompiler_inline_result$jscomp$3 = null : (pushTitleImpl(renderState.hoistableChunks, props), JSCompiler_inline_result$jscomp$3 = void 0);
          return JSCompiler_inline_result$jscomp$3;
        case "link":
          var rel = props.rel, href = props.href, precedence = props.precedence;
          if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp || "string" !== typeof rel || "string" !== typeof href || "" === href) {
            pushLinkImpl(target$jscomp$0, props);
            var JSCompiler_inline_result$jscomp$4 = null;
          } else if ("stylesheet" === props.rel)
            if ("string" !== typeof precedence || null != props.disabled || props.onLoad || props.onError)
              JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
                target$jscomp$0,
                props
              );
            else {
              var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
              if (null !== resourceState) {
                resumableState.styleResources[href] = null;
                styleQueue || (styleQueue = {
                  precedence: escapeTextForBrowser(precedence),
                  rules: [],
                  hrefs: [],
                  sheets: /* @__PURE__ */ new Map()
                }, renderState.styles.set(precedence, styleQueue));
                var resource = {
                  state: 0,
                  props: assign({}, props, {
                    "data-precedence": props.precedence,
                    precedence: null
                  })
                };
                if (resourceState) {
                  2 === resourceState.length && adoptPreloadCredentials(resource.props, resourceState);
                  var preloadResource = renderState.preloads.stylesheets.get(href);
                  preloadResource && 0 < preloadResource.length ? preloadResource.length = 0 : resource.state = 1;
                }
                styleQueue.sheets.set(href, resource);
                hoistableState && hoistableState.stylesheets.add(resource);
              } else if (styleQueue) {
                var resource$9 = styleQueue.sheets.get(href);
                resource$9 && hoistableState && hoistableState.stylesheets.add(resource$9);
              }
              textEmbedded && target$jscomp$0.push("<!-- -->");
              JSCompiler_inline_result$jscomp$4 = null;
            }
          else
            props.onLoad || props.onError ? JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
              target$jscomp$0,
              props
            ) : (textEmbedded && target$jscomp$0.push("<!-- -->"), JSCompiler_inline_result$jscomp$4 = isFallback ? null : pushLinkImpl(renderState.hoistableChunks, props));
          return JSCompiler_inline_result$jscomp$4;
        case "script":
          var asyncProp = props.async;
          if ("string" !== typeof props.src || !props.src || !asyncProp || "function" === typeof asyncProp || "symbol" === typeof asyncProp || props.onLoad || props.onError || 3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$5 = pushScriptImpl(
              target$jscomp$0,
              props
            );
          else {
            var key = props.src;
            if ("module" === props.type) {
              var resources = resumableState.moduleScriptResources;
              var preloads = renderState.preloads.moduleScripts;
            } else
              resources = resumableState.scriptResources, preloads = renderState.preloads.scripts;
            var resourceState$jscomp$0 = resources.hasOwnProperty(key) ? resources[key] : void 0;
            if (null !== resourceState$jscomp$0) {
              resources[key] = null;
              var scriptProps = props;
              if (resourceState$jscomp$0) {
                2 === resourceState$jscomp$0.length && (scriptProps = assign({}, props), adoptPreloadCredentials(scriptProps, resourceState$jscomp$0));
                var preloadResource$jscomp$0 = preloads.get(key);
                preloadResource$jscomp$0 && (preloadResource$jscomp$0.length = 0);
              }
              var resource$jscomp$0 = [];
              renderState.scripts.add(resource$jscomp$0);
              pushScriptImpl(resource$jscomp$0, scriptProps);
            }
            textEmbedded && target$jscomp$0.push("<!-- -->");
            JSCompiler_inline_result$jscomp$5 = null;
          }
          return JSCompiler_inline_result$jscomp$5;
        case "style":
          var precedence$jscomp$0 = props.precedence, href$jscomp$0 = props.href;
          if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp || "string" !== typeof precedence$jscomp$0 || "string" !== typeof href$jscomp$0 || "" === href$jscomp$0) {
            target$jscomp$0.push(startChunkForTag("style"));
            var children$jscomp$6 = null, innerHTML$jscomp$5 = null, propKey$jscomp$8;
            for (propKey$jscomp$8 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$8)) {
                var propValue$jscomp$8 = props[propKey$jscomp$8];
                if (null != propValue$jscomp$8)
                  switch (propKey$jscomp$8) {
                    case "children":
                      children$jscomp$6 = propValue$jscomp$8;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$5 = propValue$jscomp$8;
                      break;
                    default:
                      pushAttribute(
                        target$jscomp$0,
                        propKey$jscomp$8,
                        propValue$jscomp$8
                      );
                  }
              }
            target$jscomp$0.push(">");
            var child = Array.isArray(children$jscomp$6) ? 2 > children$jscomp$6.length ? children$jscomp$6[0] : null : children$jscomp$6;
            "function" !== typeof child && "symbol" !== typeof child && null !== child && void 0 !== child && target$jscomp$0.push(("" + child).replace(styleRegex, styleReplacer));
            pushInnerHTML(target$jscomp$0, innerHTML$jscomp$5, children$jscomp$6);
            target$jscomp$0.push(endChunkForTag("style"));
            var JSCompiler_inline_result$jscomp$6 = null;
          } else {
            var styleQueue$jscomp$0 = renderState.styles.get(precedence$jscomp$0);
            if (null !== (resumableState.styleResources.hasOwnProperty(href$jscomp$0) ? resumableState.styleResources[href$jscomp$0] : void 0)) {
              resumableState.styleResources[href$jscomp$0] = null;
              styleQueue$jscomp$0 ? styleQueue$jscomp$0.hrefs.push(
                escapeTextForBrowser(href$jscomp$0)
              ) : (styleQueue$jscomp$0 = {
                precedence: escapeTextForBrowser(precedence$jscomp$0),
                rules: [],
                hrefs: [escapeTextForBrowser(href$jscomp$0)],
                sheets: /* @__PURE__ */ new Map()
              }, renderState.styles.set(precedence$jscomp$0, styleQueue$jscomp$0));
              var target = styleQueue$jscomp$0.rules, children$jscomp$7 = null, innerHTML$jscomp$6 = null, propKey$jscomp$9;
              for (propKey$jscomp$9 in props)
                if (hasOwnProperty.call(props, propKey$jscomp$9)) {
                  var propValue$jscomp$9 = props[propKey$jscomp$9];
                  if (null != propValue$jscomp$9)
                    switch (propKey$jscomp$9) {
                      case "children":
                        children$jscomp$7 = propValue$jscomp$9;
                        break;
                      case "dangerouslySetInnerHTML":
                        innerHTML$jscomp$6 = propValue$jscomp$9;
                    }
                }
              var child$jscomp$0 = Array.isArray(children$jscomp$7) ? 2 > children$jscomp$7.length ? children$jscomp$7[0] : null : children$jscomp$7;
              "function" !== typeof child$jscomp$0 && "symbol" !== typeof child$jscomp$0 && null !== child$jscomp$0 && void 0 !== child$jscomp$0 && target.push(
                ("" + child$jscomp$0).replace(styleRegex, styleReplacer)
              );
              pushInnerHTML(target, innerHTML$jscomp$6, children$jscomp$7);
            }
            styleQueue$jscomp$0 && hoistableState && hoistableState.styles.add(styleQueue$jscomp$0);
            textEmbedded && target$jscomp$0.push("<!-- -->");
            JSCompiler_inline_result$jscomp$6 = void 0;
          }
          return JSCompiler_inline_result$jscomp$6;
        case "meta":
          if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$7 = pushSelfClosing(
              target$jscomp$0,
              props,
              "meta"
            );
          else
            textEmbedded && target$jscomp$0.push("<!-- -->"), JSCompiler_inline_result$jscomp$7 = isFallback ? null : "string" === typeof props.charSet ? pushSelfClosing(renderState.charsetChunks, props, "meta") : "viewport" === props.name ? pushSelfClosing(renderState.viewportChunks, props, "meta") : pushSelfClosing(renderState.hoistableChunks, props, "meta");
          return JSCompiler_inline_result$jscomp$7;
        case "listing":
        case "pre":
          target$jscomp$0.push(startChunkForTag(type));
          var children$jscomp$8 = null, innerHTML$jscomp$7 = null, propKey$jscomp$10;
          for (propKey$jscomp$10 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$10)) {
              var propValue$jscomp$10 = props[propKey$jscomp$10];
              if (null != propValue$jscomp$10)
                switch (propKey$jscomp$10) {
                  case "children":
                    children$jscomp$8 = propValue$jscomp$10;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$7 = propValue$jscomp$10;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$10,
                      propValue$jscomp$10
                    );
                }
            }
          target$jscomp$0.push(">");
          if (null != innerHTML$jscomp$7) {
            if (null != children$jscomp$8)
              throw Error(
                "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
              );
            if ("object" !== typeof innerHTML$jscomp$7 || !("__html" in innerHTML$jscomp$7))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            var html = innerHTML$jscomp$7.__html;
            null !== html && void 0 !== html && ("string" === typeof html && 0 < html.length && "\n" === html[0] ? target$jscomp$0.push("\n", html) : target$jscomp$0.push("" + html));
          }
          "string" === typeof children$jscomp$8 && "\n" === children$jscomp$8[0] && target$jscomp$0.push("\n");
          return children$jscomp$8;
        case "img":
          var src = props.src, srcSet = props.srcSet;
          if (!("lazy" === props.loading || !src && !srcSet || "string" !== typeof src && null != src || "string" !== typeof srcSet && null != srcSet) && "low" !== props.fetchPriority && false === !!(formatContext.tagScope & 3) && ("string" !== typeof src || ":" !== src[4] || "d" !== src[0] && "D" !== src[0] || "a" !== src[1] && "A" !== src[1] || "t" !== src[2] && "T" !== src[2] || "a" !== src[3] && "A" !== src[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
            var sizes = "string" === typeof props.sizes ? props.sizes : void 0, key$jscomp$0 = srcSet ? srcSet + "\n" + (sizes || "") : src, promotablePreloads = renderState.preloads.images, resource$jscomp$1 = promotablePreloads.get(key$jscomp$0);
            if (resource$jscomp$1) {
              if ("high" === props.fetchPriority || 10 > renderState.highImagePreloads.size)
                promotablePreloads.delete(key$jscomp$0), renderState.highImagePreloads.add(resource$jscomp$1);
            } else if (!resumableState.imageResources.hasOwnProperty(key$jscomp$0)) {
              resumableState.imageResources[key$jscomp$0] = PRELOAD_NO_CREDS;
              var input = props.crossOrigin;
              var JSCompiler_inline_result$jscomp$8 = "string" === typeof input ? "use-credentials" === input ? input : "" : void 0;
              var headers = renderState.headers, header;
              headers && 0 < headers.remainingCapacity && ("high" === props.fetchPriority || 500 > headers.highImagePreloads.length) && (header = getPreloadAsHeader(src, "image", {
                imageSrcSet: props.srcSet,
                imageSizes: props.sizes,
                crossOrigin: JSCompiler_inline_result$jscomp$8,
                integrity: props.integrity,
                nonce: props.nonce,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.refererPolicy
              }), 0 <= (headers.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key$jscomp$0] = PRELOAD_NO_CREDS, headers.highImagePreloads && (headers.highImagePreloads += ", "), headers.highImagePreloads += header) : (resource$jscomp$1 = [], pushLinkImpl(resource$jscomp$1, {
                rel: "preload",
                as: "image",
                href: srcSet ? void 0 : src,
                imageSrcSet: srcSet,
                imageSizes: sizes,
                crossOrigin: JSCompiler_inline_result$jscomp$8,
                integrity: props.integrity,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.referrerPolicy
              }), "high" === props.fetchPriority || 10 > renderState.highImagePreloads.size ? renderState.highImagePreloads.add(resource$jscomp$1) : (renderState.bulkPreloads.add(resource$jscomp$1), promotablePreloads.set(key$jscomp$0, resource$jscomp$1)));
            }
          }
          return pushSelfClosing(target$jscomp$0, props, "img");
        case "base":
        case "area":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "param":
        case "source":
        case "track":
        case "wbr":
          return pushSelfClosing(target$jscomp$0, props, type);
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          break;
        case "head":
          if (2 > formatContext.insertionMode && null === renderState.headChunks) {
            renderState.headChunks = [];
            var JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
              renderState.headChunks,
              props,
              "head"
            );
          } else
            JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "head"
            );
          return JSCompiler_inline_result$jscomp$9;
        case "html":
          if (0 === formatContext.insertionMode && null === renderState.htmlChunks) {
            renderState.htmlChunks = [""];
            var JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
              renderState.htmlChunks,
              props,
              "html"
            );
          } else
            JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "html"
            );
          return JSCompiler_inline_result$jscomp$10;
        default:
          if (-1 !== type.indexOf("-")) {
            target$jscomp$0.push(startChunkForTag(type));
            var children$jscomp$9 = null, innerHTML$jscomp$8 = null, propKey$jscomp$11;
            for (propKey$jscomp$11 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$11)) {
                var propValue$jscomp$11 = props[propKey$jscomp$11];
                if (null != propValue$jscomp$11) {
                  var attributeName = propKey$jscomp$11;
                  switch (propKey$jscomp$11) {
                    case "children":
                      children$jscomp$9 = propValue$jscomp$11;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$8 = propValue$jscomp$11;
                      break;
                    case "style":
                      pushStyleAttribute(target$jscomp$0, propValue$jscomp$11);
                      break;
                    case "suppressContentEditableWarning":
                    case "suppressHydrationWarning":
                    case "ref":
                      break;
                    case "className":
                      attributeName = "class";
                    default:
                      if (isAttributeNameSafe(propKey$jscomp$11) && "function" !== typeof propValue$jscomp$11 && "symbol" !== typeof propValue$jscomp$11 && false !== propValue$jscomp$11) {
                        if (true === propValue$jscomp$11) propValue$jscomp$11 = "";
                        else if ("object" === typeof propValue$jscomp$11) continue;
                        target$jscomp$0.push(
                          " ",
                          attributeName,
                          '="',
                          escapeTextForBrowser(propValue$jscomp$11),
                          '"'
                        );
                      }
                  }
                }
              }
            target$jscomp$0.push(">");
            pushInnerHTML(target$jscomp$0, innerHTML$jscomp$8, children$jscomp$9);
            return children$jscomp$9;
          }
      }
      return pushStartGenericElement(target$jscomp$0, props, type);
    }
    var endTagCache = /* @__PURE__ */ new Map();
    function endChunkForTag(tag) {
      var chunk = endTagCache.get(tag);
      void 0 === chunk && (chunk = "</" + tag + ">", endTagCache.set(tag, chunk));
      return chunk;
    }
    function writeBootstrap(destination, renderState) {
      renderState = renderState.bootstrapChunks;
      for (var i = 0; i < renderState.length - 1; i++)
        destination.push(renderState[i]);
      return i < renderState.length ? (i = renderState[i], renderState.length = 0, destination.push(i)) : true;
    }
    function writeStartPendingSuspenseBoundary(destination, renderState, id3) {
      destination.push('<!--$?--><template id="');
      if (null === id3)
        throw Error(
          "An ID must have been assigned before we can complete the boundary."
        );
      destination.push(renderState.boundaryPrefix);
      renderState = id3.toString(16);
      destination.push(renderState);
      return destination.push('"></template>');
    }
    function writeStartSegment(destination, renderState, formatContext, id3) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 2:
          return destination.push('<div hidden id="'), destination.push(renderState.segmentPrefix), renderState = id3.toString(16), destination.push(renderState), destination.push('">');
        case 3:
          return destination.push('<svg aria-hidden="true" style="display:none" id="'), destination.push(renderState.segmentPrefix), renderState = id3.toString(16), destination.push(renderState), destination.push('">');
        case 4:
          return destination.push('<math aria-hidden="true" style="display:none" id="'), destination.push(renderState.segmentPrefix), renderState = id3.toString(16), destination.push(renderState), destination.push('">');
        case 5:
          return destination.push('<table hidden id="'), destination.push(renderState.segmentPrefix), renderState = id3.toString(16), destination.push(renderState), destination.push('">');
        case 6:
          return destination.push('<table hidden><tbody id="'), destination.push(renderState.segmentPrefix), renderState = id3.toString(16), destination.push(renderState), destination.push('">');
        case 7:
          return destination.push('<table hidden><tr id="'), destination.push(renderState.segmentPrefix), renderState = id3.toString(16), destination.push(renderState), destination.push('">');
        case 8:
          return destination.push('<table hidden><colgroup id="'), destination.push(renderState.segmentPrefix), renderState = id3.toString(16), destination.push(renderState), destination.push('">');
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function writeEndSegment(destination, formatContext) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 2:
          return destination.push("</div>");
        case 3:
          return destination.push("</svg>");
        case 4:
          return destination.push("</math>");
        case 5:
          return destination.push("</table>");
        case 6:
          return destination.push("</tbody></table>");
        case 7:
          return destination.push("</tr></table>");
        case 8:
          return destination.push("</colgroup></table>");
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var regexForJSStringsInInstructionScripts = /[<\u2028\u2029]/g;
    function escapeJSStringsForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInInstructionScripts,
        function(match) {
          switch (match) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    var regexForJSStringsInScripts = /[&><\u2028\u2029]/g;
    function escapeJSObjectForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInScripts,
        function(match) {
          switch (match) {
            case "&":
              return "\\u0026";
            case ">":
              return "\\u003e";
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    var currentlyRenderingBoundaryHasStylesToHoist = false;
    var destinationHasCapacity = true;
    function flushStyleTagsLateForBoundary(styleQueue) {
      var rules = styleQueue.rules, hrefs = styleQueue.hrefs, i = 0;
      if (hrefs.length) {
        this.push('<style media="not all" data-precedence="');
        this.push(styleQueue.precedence);
        for (this.push('" data-href="'); i < hrefs.length - 1; i++)
          this.push(hrefs[i]), this.push(" ");
        this.push(hrefs[i]);
        this.push('">');
        for (i = 0; i < rules.length; i++) this.push(rules[i]);
        destinationHasCapacity = this.push("</style>");
        currentlyRenderingBoundaryHasStylesToHoist = true;
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function hasStylesToHoist(stylesheet) {
      return 2 !== stylesheet.state ? currentlyRenderingBoundaryHasStylesToHoist = true : false;
    }
    function writeHoistablesForBoundary(destination, hoistableState, renderState) {
      currentlyRenderingBoundaryHasStylesToHoist = false;
      destinationHasCapacity = true;
      hoistableState.styles.forEach(flushStyleTagsLateForBoundary, destination);
      hoistableState.stylesheets.forEach(hasStylesToHoist);
      currentlyRenderingBoundaryHasStylesToHoist && (renderState.stylesToHoist = true);
      return destinationHasCapacity;
    }
    function flushResource(resource) {
      for (var i = 0; i < resource.length; i++) this.push(resource[i]);
      resource.length = 0;
    }
    var stylesheetFlushingQueue = [];
    function flushStyleInPreamble(stylesheet) {
      pushLinkImpl(stylesheetFlushingQueue, stylesheet.props);
      for (var i = 0; i < stylesheetFlushingQueue.length; i++)
        this.push(stylesheetFlushingQueue[i]);
      stylesheetFlushingQueue.length = 0;
      stylesheet.state = 2;
    }
    function flushStylesInPreamble(styleQueue) {
      var hasStylesheets = 0 < styleQueue.sheets.size;
      styleQueue.sheets.forEach(flushStyleInPreamble, this);
      styleQueue.sheets.clear();
      var rules = styleQueue.rules, hrefs = styleQueue.hrefs;
      if (!hasStylesheets || hrefs.length) {
        this.push('<style data-precedence="');
        this.push(styleQueue.precedence);
        styleQueue = 0;
        if (hrefs.length) {
          for (this.push('" data-href="'); styleQueue < hrefs.length - 1; styleQueue++)
            this.push(hrefs[styleQueue]), this.push(" ");
          this.push(hrefs[styleQueue]);
        }
        this.push('">');
        for (styleQueue = 0; styleQueue < rules.length; styleQueue++)
          this.push(rules[styleQueue]);
        this.push("</style>");
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function preloadLateStyle(stylesheet) {
      if (0 === stylesheet.state) {
        stylesheet.state = 1;
        var props = stylesheet.props;
        pushLinkImpl(stylesheetFlushingQueue, {
          rel: "preload",
          as: "style",
          href: stylesheet.props.href,
          crossOrigin: props.crossOrigin,
          fetchPriority: props.fetchPriority,
          integrity: props.integrity,
          media: props.media,
          hrefLang: props.hrefLang,
          referrerPolicy: props.referrerPolicy
        });
        for (stylesheet = 0; stylesheet < stylesheetFlushingQueue.length; stylesheet++)
          this.push(stylesheetFlushingQueue[stylesheet]);
        stylesheetFlushingQueue.length = 0;
      }
    }
    function preloadLateStyles(styleQueue) {
      styleQueue.sheets.forEach(preloadLateStyle, this);
      styleQueue.sheets.clear();
    }
    function writeStyleResourceDependenciesInJS(destination, hoistableState) {
      destination.push("[");
      var nextArrayOpenBrackChunk = "[";
      hoistableState.stylesheets.forEach(function(resource) {
        if (2 !== resource.state)
          if (3 === resource.state)
            destination.push(nextArrayOpenBrackChunk), resource = escapeJSObjectForInstructionScripts(
              "" + resource.props.href
            ), destination.push(resource), destination.push("]"), nextArrayOpenBrackChunk = ",[";
          else {
            destination.push(nextArrayOpenBrackChunk);
            var precedence = resource.props["data-precedence"], props = resource.props, coercedHref = sanitizeURL("" + resource.props.href);
            coercedHref = escapeJSObjectForInstructionScripts(coercedHref);
            destination.push(coercedHref);
            precedence = "" + precedence;
            destination.push(",");
            precedence = escapeJSObjectForInstructionScripts(precedence);
            destination.push(precedence);
            for (var propKey in props)
              if (hasOwnProperty.call(props, propKey) && (precedence = props[propKey], null != precedence))
                switch (propKey) {
                  case "href":
                  case "rel":
                  case "precedence":
                  case "data-precedence":
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    writeStyleResourceAttributeInJS(
                      destination,
                      propKey,
                      precedence
                    );
                }
            destination.push("]");
            nextArrayOpenBrackChunk = ",[";
            resource.state = 3;
          }
      });
      destination.push("]");
    }
    function writeStyleResourceAttributeInJS(destination, name, value) {
      var attributeName = name.toLowerCase();
      switch (typeof value) {
        case "function":
        case "symbol":
          return;
      }
      switch (name) {
        case "innerHTML":
        case "dangerouslySetInnerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "style":
        case "ref":
          return;
        case "className":
          attributeName = "class";
          name = "" + value;
          break;
        case "hidden":
          if (false === value) return;
          name = "";
          break;
        case "src":
        case "href":
          value = sanitizeURL(value);
          name = "" + value;
          break;
        default:
          if (2 < name.length && ("o" === name[0] || "O" === name[0]) && ("n" === name[1] || "N" === name[1]) || !isAttributeNameSafe(name))
            return;
          name = "" + value;
      }
      destination.push(",");
      attributeName = escapeJSObjectForInstructionScripts(attributeName);
      destination.push(attributeName);
      destination.push(",");
      attributeName = escapeJSObjectForInstructionScripts(name);
      destination.push(attributeName);
    }
    function createHoistableState() {
      return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set() };
    }
    function prefetchDNS(href) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if ("string" === typeof href && href) {
          if (!resumableState.dnsResources.hasOwnProperty(href)) {
            resumableState.dnsResources[href] = null;
            resumableState = renderState.headers;
            var header, JSCompiler_temp;
            if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity)
              JSCompiler_temp = (header = "<" + ("" + href).replace(
                regexForHrefInLinkHeaderURLContext,
                escapeHrefForLinkHeaderURLContextReplacer
              ) + ">; rel=dns-prefetch", 0 <= (resumableState.remainingCapacity -= header.length + 2));
            JSCompiler_temp ? (renderState.resets.dns[href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (header = [], pushLinkImpl(header, { href, rel: "dns-prefetch" }), renderState.preconnects.add(header));
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.D(href);
    }
    function preconnect(href, crossOrigin) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if ("string" === typeof href && href) {
          var bucket = "use-credentials" === crossOrigin ? "credentials" : "string" === typeof crossOrigin ? "anonymous" : "default";
          if (!resumableState.connectResources[bucket].hasOwnProperty(href)) {
            resumableState.connectResources[bucket][href] = null;
            resumableState = renderState.headers;
            var header, JSCompiler_temp;
            if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity) {
              JSCompiler_temp = "<" + ("" + href).replace(
                regexForHrefInLinkHeaderURLContext,
                escapeHrefForLinkHeaderURLContextReplacer
              ) + ">; rel=preconnect";
              if ("string" === typeof crossOrigin) {
                var escapedCrossOrigin = ("" + crossOrigin).replace(
                  regexForLinkHeaderQuotedParamValueContext,
                  escapeStringForLinkHeaderQuotedParamValueContextReplacer
                );
                JSCompiler_temp += '; crossorigin="' + escapedCrossOrigin + '"';
              }
              JSCompiler_temp = (header = JSCompiler_temp, 0 <= (resumableState.remainingCapacity -= header.length + 2));
            }
            JSCompiler_temp ? (renderState.resets.connect[bucket][href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (bucket = [], pushLinkImpl(bucket, {
              rel: "preconnect",
              href,
              crossOrigin
            }), renderState.preconnects.add(bucket));
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.C(href, crossOrigin);
    }
    function preload(href, as, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (as && href) {
          switch (as) {
            case "image":
              if (options) {
                var imageSrcSet = options.imageSrcSet;
                var imageSizes = options.imageSizes;
                var fetchPriority = options.fetchPriority;
              }
              var key = imageSrcSet ? imageSrcSet + "\n" + (imageSizes || "") : href;
              if (resumableState.imageResources.hasOwnProperty(key)) return;
              resumableState.imageResources[key] = PRELOAD_NO_CREDS;
              resumableState = renderState.headers;
              var header;
              resumableState && 0 < resumableState.remainingCapacity && "high" === fetchPriority && (header = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key] = PRELOAD_NO_CREDS, resumableState.highImagePreloads && (resumableState.highImagePreloads += ", "), resumableState.highImagePreloads += header) : (resumableState = [], pushLinkImpl(
                resumableState,
                assign(
                  { rel: "preload", href: imageSrcSet ? void 0 : href, as },
                  options
                )
              ), "high" === fetchPriority ? renderState.highImagePreloads.add(resumableState) : (renderState.bulkPreloads.add(resumableState), renderState.preloads.images.set(key, resumableState)));
              break;
            case "style":
              if (resumableState.styleResources.hasOwnProperty(href)) return;
              imageSrcSet = [];
              pushLinkImpl(
                imageSrcSet,
                assign({ rel: "preload", href, as }, options)
              );
              resumableState.styleResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              renderState.preloads.stylesheets.set(href, imageSrcSet);
              renderState.bulkPreloads.add(imageSrcSet);
              break;
            case "script":
              if (resumableState.scriptResources.hasOwnProperty(href)) return;
              imageSrcSet = [];
              renderState.preloads.scripts.set(href, imageSrcSet);
              renderState.bulkPreloads.add(imageSrcSet);
              pushLinkImpl(
                imageSrcSet,
                assign({ rel: "preload", href, as }, options)
              );
              resumableState.scriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              break;
            default:
              if (resumableState.unknownResources.hasOwnProperty(as)) {
                if (imageSrcSet = resumableState.unknownResources[as], imageSrcSet.hasOwnProperty(href))
                  return;
              } else
                imageSrcSet = {}, resumableState.unknownResources[as] = imageSrcSet;
              imageSrcSet[href] = PRELOAD_NO_CREDS;
              if ((resumableState = renderState.headers) && 0 < resumableState.remainingCapacity && "font" === as && (key = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= key.length + 2)))
                renderState.resets.font[href] = PRELOAD_NO_CREDS, resumableState.fontPreloads && (resumableState.fontPreloads += ", "), resumableState.fontPreloads += key;
              else
                switch (resumableState = [], href = assign({ rel: "preload", href, as }, options), pushLinkImpl(resumableState, href), as) {
                  case "font":
                    renderState.fontPreloads.add(resumableState);
                    break;
                  default:
                    renderState.bulkPreloads.add(resumableState);
                }
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.L(href, as, options);
    }
    function preloadModule(href, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (href) {
          var as = options && "string" === typeof options.as ? options.as : "script";
          switch (as) {
            case "script":
              if (resumableState.moduleScriptResources.hasOwnProperty(href)) return;
              as = [];
              resumableState.moduleScriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              renderState.preloads.moduleScripts.set(href, as);
              break;
            default:
              if (resumableState.moduleUnknownResources.hasOwnProperty(as)) {
                var resources = resumableState.unknownResources[as];
                if (resources.hasOwnProperty(href)) return;
              } else
                resources = {}, resumableState.moduleUnknownResources[as] = resources;
              as = [];
              resources[href] = PRELOAD_NO_CREDS;
          }
          pushLinkImpl(as, assign({ rel: "modulepreload", href }, options));
          renderState.bulkPreloads.add(as);
          enqueueFlush(request);
        }
      } else previousDispatcher.m(href, options);
    }
    function preinitStyle(href, precedence, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (href) {
          precedence = precedence || "default";
          var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
          null !== resourceState && (resumableState.styleResources[href] = null, styleQueue || (styleQueue = {
            precedence: escapeTextForBrowser(precedence),
            rules: [],
            hrefs: [],
            sheets: /* @__PURE__ */ new Map()
          }, renderState.styles.set(precedence, styleQueue)), precedence = {
            state: 0,
            props: assign(
              { rel: "stylesheet", href, "data-precedence": precedence },
              options
            )
          }, resourceState && (2 === resourceState.length && adoptPreloadCredentials(precedence.props, resourceState), (renderState = renderState.preloads.stylesheets.get(href)) && 0 < renderState.length ? renderState.length = 0 : precedence.state = 1), styleQueue.sheets.set(href, precedence), enqueueFlush(request));
        }
      } else previousDispatcher.S(href, precedence, options);
    }
    function preinitScript(src, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (src) {
          var resourceState = resumableState.scriptResources.hasOwnProperty(src) ? resumableState.scriptResources[src] : void 0;
          null !== resourceState && (resumableState.scriptResources[src] = null, options = assign({ src, async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.scripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
        }
      } else previousDispatcher.X(src, options);
    }
    function preinitModuleScript(src, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (src) {
          var resourceState = resumableState.moduleScriptResources.hasOwnProperty(
            src
          ) ? resumableState.moduleScriptResources[src] : void 0;
          null !== resourceState && (resumableState.moduleScriptResources[src] = null, options = assign({ src, type: "module", async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.moduleScripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
        }
      } else previousDispatcher.M(src, options);
    }
    function adoptPreloadCredentials(target, preloadState) {
      null == target.crossOrigin && (target.crossOrigin = preloadState[0]);
      null == target.integrity && (target.integrity = preloadState[1]);
    }
    function getPreloadAsHeader(href, as, params) {
      href = ("" + href).replace(
        regexForHrefInLinkHeaderURLContext,
        escapeHrefForLinkHeaderURLContextReplacer
      );
      as = ("" + as).replace(
        regexForLinkHeaderQuotedParamValueContext,
        escapeStringForLinkHeaderQuotedParamValueContextReplacer
      );
      as = "<" + href + '>; rel=preload; as="' + as + '"';
      for (var paramName in params)
        hasOwnProperty.call(params, paramName) && (href = params[paramName], "string" === typeof href && (as += "; " + paramName.toLowerCase() + '="' + ("" + href).replace(
          regexForLinkHeaderQuotedParamValueContext,
          escapeStringForLinkHeaderQuotedParamValueContextReplacer
        ) + '"'));
      return as;
    }
    var regexForHrefInLinkHeaderURLContext = /[<>\r\n]/g;
    function escapeHrefForLinkHeaderURLContextReplacer(match) {
      switch (match) {
        case "<":
          return "%3C";
        case ">":
          return "%3E";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    var regexForLinkHeaderQuotedParamValueContext = /["';,\r\n]/g;
    function escapeStringForLinkHeaderQuotedParamValueContextReplacer(match) {
      switch (match) {
        case '"':
          return "%22";
        case "'":
          return "%27";
        case ";":
          return "%3B";
        case ",":
          return "%2C";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    function hoistStyleQueueDependency(styleQueue) {
      this.styles.add(styleQueue);
    }
    function hoistStylesheetDependency(stylesheet) {
      this.stylesheets.add(stylesheet);
    }
    function createRenderState(resumableState, generateStaticMarkup) {
      var idPrefix = resumableState.idPrefix, bootstrapChunks = [], bootstrapScriptContent = resumableState.bootstrapScriptContent, bootstrapScripts = resumableState.bootstrapScripts, bootstrapModules = resumableState.bootstrapModules;
      void 0 !== bootstrapScriptContent && bootstrapChunks.push(
        "<script>",
        ("" + bootstrapScriptContent).replace(scriptRegex, scriptReplacer),
        "</script>"
      );
      bootstrapScriptContent = idPrefix + "P:";
      var JSCompiler_object_inline_segmentPrefix_1482 = idPrefix + "S:";
      idPrefix += "B:";
      var JSCompiler_object_inline_preconnects_1496 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_fontPreloads_1497 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_highImagePreloads_1498 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_styles_1499 = /* @__PURE__ */ new Map(), JSCompiler_object_inline_bootstrapScripts_1500 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_scripts_1501 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_bulkPreloads_1502 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_preloads_1503 = {
        images: /* @__PURE__ */ new Map(),
        stylesheets: /* @__PURE__ */ new Map(),
        scripts: /* @__PURE__ */ new Map(),
        moduleScripts: /* @__PURE__ */ new Map()
      };
      if (void 0 !== bootstrapScripts)
        for (var i = 0; i < bootstrapScripts.length; i++) {
          var scriptConfig = bootstrapScripts[i], src, crossOrigin = void 0, integrity = void 0, props = {
            rel: "preload",
            as: "script",
            fetchPriority: "low",
            nonce: void 0
          };
          "string" === typeof scriptConfig ? props.href = src = scriptConfig : (props.href = src = scriptConfig.src, props.integrity = integrity = "string" === typeof scriptConfig.integrity ? scriptConfig.integrity : void 0, props.crossOrigin = crossOrigin = "string" === typeof scriptConfig || null == scriptConfig.crossOrigin ? void 0 : "use-credentials" === scriptConfig.crossOrigin ? "use-credentials" : "");
          scriptConfig = resumableState;
          var href = src;
          scriptConfig.scriptResources[href] = null;
          scriptConfig.moduleScriptResources[href] = null;
          scriptConfig = [];
          pushLinkImpl(scriptConfig, props);
          JSCompiler_object_inline_bootstrapScripts_1500.add(scriptConfig);
          bootstrapChunks.push('<script src="', escapeTextForBrowser(src));
          "string" === typeof integrity && bootstrapChunks.push('" integrity="', escapeTextForBrowser(integrity));
          "string" === typeof crossOrigin && bootstrapChunks.push(
            '" crossorigin="',
            escapeTextForBrowser(crossOrigin)
          );
          bootstrapChunks.push('" async=""></script>');
        }
      if (void 0 !== bootstrapModules)
        for (bootstrapScripts = 0; bootstrapScripts < bootstrapModules.length; bootstrapScripts++)
          props = bootstrapModules[bootstrapScripts], crossOrigin = src = void 0, integrity = {
            rel: "modulepreload",
            fetchPriority: "low",
            nonce: void 0
          }, "string" === typeof props ? integrity.href = i = props : (integrity.href = i = props.src, integrity.integrity = crossOrigin = "string" === typeof props.integrity ? props.integrity : void 0, integrity.crossOrigin = src = "string" === typeof props || null == props.crossOrigin ? void 0 : "use-credentials" === props.crossOrigin ? "use-credentials" : ""), props = resumableState, scriptConfig = i, props.scriptResources[scriptConfig] = null, props.moduleScriptResources[scriptConfig] = null, props = [], pushLinkImpl(props, integrity), JSCompiler_object_inline_bootstrapScripts_1500.add(props), bootstrapChunks.push(
            '<script type="module" src="',
            escapeTextForBrowser(i)
          ), "string" === typeof crossOrigin && bootstrapChunks.push(
            '" integrity="',
            escapeTextForBrowser(crossOrigin)
          ), "string" === typeof src && bootstrapChunks.push('" crossorigin="', escapeTextForBrowser(src)), bootstrapChunks.push('" async=""></script>');
      return {
        placeholderPrefix: bootstrapScriptContent,
        segmentPrefix: JSCompiler_object_inline_segmentPrefix_1482,
        boundaryPrefix: idPrefix,
        startInlineScript: "<script>",
        htmlChunks: null,
        headChunks: null,
        externalRuntimeScript: null,
        bootstrapChunks,
        importMapChunks: [],
        onHeaders: void 0,
        headers: null,
        resets: {
          font: {},
          dns: {},
          connect: { default: {}, anonymous: {}, credentials: {} },
          image: {},
          style: {}
        },
        charsetChunks: [],
        viewportChunks: [],
        hoistableChunks: [],
        preconnects: JSCompiler_object_inline_preconnects_1496,
        fontPreloads: JSCompiler_object_inline_fontPreloads_1497,
        highImagePreloads: JSCompiler_object_inline_highImagePreloads_1498,
        styles: JSCompiler_object_inline_styles_1499,
        bootstrapScripts: JSCompiler_object_inline_bootstrapScripts_1500,
        scripts: JSCompiler_object_inline_scripts_1501,
        bulkPreloads: JSCompiler_object_inline_bulkPreloads_1502,
        preloads: JSCompiler_object_inline_preloads_1503,
        stylesToHoist: false,
        generateStaticMarkup
      };
    }
    function pushTextInstance(target, text, renderState, textEmbedded) {
      if (renderState.generateStaticMarkup)
        return target.push(escapeTextForBrowser(text)), false;
      "" === text ? target = textEmbedded : (textEmbedded && target.push("<!-- -->"), target.push(escapeTextForBrowser(text)), target = true);
      return target;
    }
    function pushSegmentFinale(target, renderState, lastPushedText, textEmbedded) {
      renderState.generateStaticMarkup || lastPushedText && textEmbedded && target.push("<!-- -->");
    }
    var bind = Function.prototype.bind;
    var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    var emptyContextObject = {};
    var currentActiveSnapshot = null;
    function popToNearestCommonAncestor(prev, next) {
      if (prev !== next) {
        prev.context._currentValue2 = prev.parentValue;
        prev = prev.parent;
        var parentNext = next.parent;
        if (null === prev) {
          if (null !== parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
        } else {
          if (null === parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
          popToNearestCommonAncestor(prev, parentNext);
        }
        next.context._currentValue2 = next.value;
      }
    }
    function popAllPrevious(prev) {
      prev.context._currentValue2 = prev.parentValue;
      prev = prev.parent;
      null !== prev && popAllPrevious(prev);
    }
    function pushAllNext(next) {
      var parentNext = next.parent;
      null !== parentNext && pushAllNext(parentNext);
      next.context._currentValue2 = next.value;
    }
    function popPreviousToCommonLevel(prev, next) {
      prev.context._currentValue2 = prev.parentValue;
      prev = prev.parent;
      if (null === prev)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === next.depth ? popToNearestCommonAncestor(prev, next) : popPreviousToCommonLevel(prev, next);
    }
    function popNextToCommonLevel(prev, next) {
      var parentNext = next.parent;
      if (null === parentNext)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === parentNext.depth ? popToNearestCommonAncestor(prev, parentNext) : popNextToCommonLevel(prev, parentNext);
      next.context._currentValue2 = next.value;
    }
    function switchContext(newSnapshot) {
      var prev = currentActiveSnapshot;
      prev !== newSnapshot && (null === prev ? pushAllNext(newSnapshot) : null === newSnapshot ? popAllPrevious(prev) : prev.depth === newSnapshot.depth ? popToNearestCommonAncestor(prev, newSnapshot) : prev.depth > newSnapshot.depth ? popPreviousToCommonLevel(prev, newSnapshot) : popNextToCommonLevel(prev, newSnapshot), currentActiveSnapshot = newSnapshot);
    }
    var classComponentUpdater = {
      isMounted: function() {
        return false;
      },
      enqueueSetState: function(inst, payload) {
        inst = inst._reactInternals;
        null !== inst.queue && inst.queue.push(payload);
      },
      enqueueReplaceState: function(inst, payload) {
        inst = inst._reactInternals;
        inst.replace = true;
        inst.queue = [payload];
      },
      enqueueForceUpdate: function() {
      }
    };
    var emptyTreeContext = { id: 1, overflow: "" };
    function pushTreeContext(baseContext, totalChildren, index) {
      var baseIdWithLeadingBit = baseContext.id;
      baseContext = baseContext.overflow;
      var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index += 1;
      var length = 32 - clz32(totalChildren) + baseLength;
      if (30 < length) {
        var numberOfOverflowBits = baseLength - baseLength % 5;
        length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        return {
          id: 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit,
          overflow: length + baseContext
        };
      }
      return {
        id: 1 << length | index << baseLength | baseIdWithLeadingBit,
        overflow: baseContext
      };
    }
    var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
    var log = Math.log;
    var LN2 = Math.LN2;
    function clz32Fallback(x) {
      x >>>= 0;
      return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
    }
    var SuspenseException = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`"
    );
    function noop$2() {
    }
    function trackUsedThenable(thenableState2, thenable, index) {
      index = thenableState2[index];
      void 0 === index ? thenableState2.push(thenable) : index !== thenable && (thenable.then(noop$2, noop$2), thenable = index);
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          "string" === typeof thenable.status ? thenable.then(noop$2, noop$2) : (thenableState2 = thenable, thenableState2.status = "pending", thenableState2.then(
            function(fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function(error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          ));
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    var suspendedThenable = null;
    function getSuspendedThenable() {
      if (null === suspendedThenable)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var currentlyRenderingComponent = null;
    var currentlyRenderingTask = null;
    var currentlyRenderingRequest = null;
    var currentlyRenderingKeyPath = null;
    var firstWorkInProgressHook = null;
    var workInProgressHook = null;
    var isReRender = false;
    var didScheduleRenderPhaseUpdate = false;
    var localIdCounter = 0;
    var actionStateCounter = 0;
    var actionStateMatchingIndex = -1;
    var thenableIndexCounter = 0;
    var thenableState = null;
    var renderPhaseUpdates = null;
    var numberOfReRenders = 0;
    function resolveCurrentlyRenderingComponent() {
      if (null === currentlyRenderingComponent)
        throw Error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      return currentlyRenderingComponent;
    }
    function createHook() {
      if (0 < numberOfReRenders)
        throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function createWorkInProgressHook() {
      null === workInProgressHook ? null === firstWorkInProgressHook ? (isReRender = false, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = true, workInProgressHook = firstWorkInProgressHook) : null === workInProgressHook.next ? (isReRender = false, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = true, workInProgressHook = workInProgressHook.next);
      return workInProgressHook;
    }
    function getThenableStateAfterSuspending() {
      var state = thenableState;
      thenableState = null;
      return state;
    }
    function resetHooksState() {
      currentlyRenderingKeyPath = currentlyRenderingRequest = currentlyRenderingTask = currentlyRenderingComponent = null;
      didScheduleRenderPhaseUpdate = false;
      firstWorkInProgressHook = null;
      numberOfReRenders = 0;
      workInProgressHook = renderPhaseUpdates = null;
    }
    function basicStateReducer(state, action) {
      return "function" === typeof action ? action(state) : action;
    }
    function useReducer(reducer, initialArg, init) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      if (isReRender) {
        var queue = workInProgressHook.queue;
        initialArg = queue.dispatch;
        if (null !== renderPhaseUpdates && (init = renderPhaseUpdates.get(queue), void 0 !== init)) {
          renderPhaseUpdates.delete(queue);
          queue = workInProgressHook.memoizedState;
          do
            queue = reducer(queue, init.action), init = init.next;
          while (null !== init);
          workInProgressHook.memoizedState = queue;
          return [queue, initialArg];
        }
        return [workInProgressHook.memoizedState, initialArg];
      }
      reducer = reducer === basicStateReducer ? "function" === typeof initialArg ? initialArg() : initialArg : void 0 !== init ? init(initialArg) : initialArg;
      workInProgressHook.memoizedState = reducer;
      reducer = workInProgressHook.queue = { last: null, dispatch: null };
      reducer = reducer.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingComponent,
        reducer
      );
      return [workInProgressHook.memoizedState, reducer];
    }
    function useMemo5(nextCreate, deps) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      if (null !== workInProgressHook) {
        var prevState = workInProgressHook.memoizedState;
        if (null !== prevState && null !== deps) {
          var prevDeps = prevState[1];
          a: if (null === prevDeps) prevDeps = false;
          else {
            for (var i = 0; i < prevDeps.length && i < deps.length; i++)
              if (!objectIs(deps[i], prevDeps[i])) {
                prevDeps = false;
                break a;
              }
            prevDeps = true;
          }
          if (prevDeps) return prevState[0];
        }
      }
      nextCreate = nextCreate();
      workInProgressHook.memoizedState = [nextCreate, deps];
      return nextCreate;
    }
    function dispatchAction(componentIdentity, queue, action) {
      if (25 <= numberOfReRenders)
        throw Error(
          "Too many re-renders. React limits the number of renders to prevent an infinite loop."
        );
      if (componentIdentity === currentlyRenderingComponent)
        if (didScheduleRenderPhaseUpdate = true, componentIdentity = { action, next: null }, null === renderPhaseUpdates && (renderPhaseUpdates = /* @__PURE__ */ new Map()), action = renderPhaseUpdates.get(queue), void 0 === action)
          renderPhaseUpdates.set(queue, componentIdentity);
        else {
          for (queue = action; null !== queue.next; ) queue = queue.next;
          queue.next = componentIdentity;
        }
    }
    function unsupportedStartTransition() {
      throw Error("startTransition cannot be called during server rendering.");
    }
    function unsupportedSetOptimisticState() {
      throw Error("Cannot update optimistic state while rendering.");
    }
    function useActionState(action, initialState, permalink) {
      resolveCurrentlyRenderingComponent();
      var actionStateHookIndex = actionStateCounter++, request = currentlyRenderingRequest;
      if ("function" === typeof action.$$FORM_ACTION) {
        var nextPostbackStateKey = null, componentKeyPath = currentlyRenderingKeyPath;
        request = request.formState;
        var isSignatureEqual = action.$$IS_SIGNATURE_EQUAL;
        if (null !== request && "function" === typeof isSignatureEqual) {
          var postbackKey = request[1];
          isSignatureEqual.call(action, request[2], request[3]) && (nextPostbackStateKey = void 0 !== permalink ? "p" + permalink : "k" + murmurhash3_32_gc(
            JSON.stringify([componentKeyPath, null, actionStateHookIndex]),
            0
          ), postbackKey === nextPostbackStateKey && (actionStateMatchingIndex = actionStateHookIndex, initialState = request[0]));
        }
        var boundAction = action.bind(null, initialState);
        action = function(payload) {
          boundAction(payload);
        };
        "function" === typeof boundAction.$$FORM_ACTION && (action.$$FORM_ACTION = function(prefix2) {
          prefix2 = boundAction.$$FORM_ACTION(prefix2);
          void 0 !== permalink && (permalink += "", prefix2.action = permalink);
          var formData = prefix2.data;
          formData && (null === nextPostbackStateKey && (nextPostbackStateKey = void 0 !== permalink ? "p" + permalink : "k" + murmurhash3_32_gc(
            JSON.stringify([
              componentKeyPath,
              null,
              actionStateHookIndex
            ]),
            0
          )), formData.append("$ACTION_KEY", nextPostbackStateKey));
          return prefix2;
        });
        return [initialState, action, false];
      }
      var boundAction$22 = action.bind(null, initialState);
      return [
        initialState,
        function(payload) {
          boundAction$22(payload);
        },
        false
      ];
    }
    function unwrapThenable(thenable) {
      var index = thenableIndexCounter;
      thenableIndexCounter += 1;
      null === thenableState && (thenableState = []);
      return trackUsedThenable(thenableState, thenable, index);
    }
    function unsupportedRefresh() {
      throw Error("Cache cannot be refreshed during server rendering.");
    }
    function noop$1() {
    }
    var HooksDispatcher = {
      readContext: function(context) {
        return context._currentValue2;
      },
      use: function(usable) {
        if (null !== usable && "object" === typeof usable) {
          if ("function" === typeof usable.then) return unwrapThenable(usable);
          if (usable.$$typeof === REACT_CONTEXT_TYPE) return usable._currentValue2;
        }
        throw Error("An unsupported type was passed to use(): " + String(usable));
      },
      useContext: function(context) {
        resolveCurrentlyRenderingComponent();
        return context._currentValue2;
      },
      useMemo: useMemo5,
      useReducer,
      useRef: function(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
        workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        return null === previousRef ? (initialValue = { current: initialValue }, workInProgressHook.memoizedState = initialValue) : previousRef;
      },
      useState: function(initialState) {
        return useReducer(basicStateReducer, initialState);
      },
      useInsertionEffect: noop$1,
      useLayoutEffect: noop$1,
      useCallback: function(callback, deps) {
        return useMemo5(function() {
          return callback;
        }, deps);
      },
      useImperativeHandle: noop$1,
      useEffect: noop$1,
      useDebugValue: noop$1,
      useDeferredValue: function(value, initialValue) {
        resolveCurrentlyRenderingComponent();
        return void 0 !== initialValue ? initialValue : value;
      },
      useTransition: function() {
        resolveCurrentlyRenderingComponent();
        return [false, unsupportedStartTransition];
      },
      useId: function() {
        var JSCompiler_inline_result = currentlyRenderingTask.treeContext;
        var overflow = JSCompiler_inline_result.overflow;
        JSCompiler_inline_result = JSCompiler_inline_result.id;
        JSCompiler_inline_result = (JSCompiler_inline_result & ~(1 << 32 - clz32(JSCompiler_inline_result) - 1)).toString(32) + overflow;
        var resumableState = currentResumableState;
        if (null === resumableState)
          throw Error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component."
          );
        overflow = localIdCounter++;
        JSCompiler_inline_result = ":" + resumableState.idPrefix + "R" + JSCompiler_inline_result;
        0 < overflow && (JSCompiler_inline_result += "H" + overflow.toString(32));
        return JSCompiler_inline_result + ":";
      },
      useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
        if (void 0 === getServerSnapshot)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        return getServerSnapshot();
      },
      useCacheRefresh: function() {
        return unsupportedRefresh;
      },
      useMemoCache: function(size) {
        for (var data = Array(size), i = 0; i < size; i++)
          data[i] = REACT_MEMO_CACHE_SENTINEL;
        return data;
      },
      useHostTransitionStatus: function() {
        resolveCurrentlyRenderingComponent();
        return sharedNotPendingObject;
      },
      useOptimistic: function(passthrough) {
        resolveCurrentlyRenderingComponent();
        return [passthrough, unsupportedSetOptimisticState];
      }
    };
    HooksDispatcher.useFormState = useActionState;
    HooksDispatcher.useActionState = useActionState;
    var currentResumableState = null;
    var DefaultAsyncDispatcher = {
      getCacheForType: function() {
        throw Error("Not implemented.");
      }
    };
    var prefix;
    var suffix;
    function describeBuiltInComponentFrame(name) {
      if (void 0 === prefix)
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || "";
          suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return "\n" + prefix + name + suffix;
    }
    var reentry = false;
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry) return "";
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if ("object" === typeof Reflect && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    var control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x$24) {
                    control = x$24;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x$25) {
                  control = x$25;
                }
                (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                });
              }
            } catch (sample) {
              if (sample && control && "string" === typeof sample.stack)
                return [sample.stack, control.stack];
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name"
        );
        namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
        if (sampleStack && controlStack) {
          var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
          for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
            RunInRootFrame++;
          for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
            "DetermineComponentFrameRoot"
          ); )
            namePropDescriptor++;
          if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
            for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
              namePropDescriptor--;
          for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
            if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
              if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
                do
                  if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                    var frame2 = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                    fn.displayName && frame2.includes("<anonymous>") && (frame2 = frame2.replace("<anonymous>", fn.displayName));
                    return frame2;
                  }
                while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
              }
              break;
            }
        }
      } finally {
        reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
      }
      return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
    }
    function describeComponentStackByType(type) {
      if ("string" === typeof type) return describeBuiltInComponentFrame(type);
      if ("function" === typeof type)
        return type.prototype && type.prototype.isReactComponent ? (type = describeNativeComponentFrame(type, true), type) : describeNativeComponentFrame(type, false);
      if ("object" === typeof type && null !== type) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeNativeComponentFrame(type.render, false);
          case REACT_MEMO_TYPE:
            return describeNativeComponentFrame(type.type, false);
          case REACT_LAZY_TYPE:
            var lazyComponent = type, payload = lazyComponent._payload;
            lazyComponent = lazyComponent._init;
            try {
              type = lazyComponent(payload);
            } catch (x) {
              return describeBuiltInComponentFrame("Lazy");
            }
            return describeComponentStackByType(type);
        }
        if ("string" === typeof type.name)
          return payload = type.env, describeBuiltInComponentFrame(
            type.name + (payload ? " [" + payload + "]" : "")
          );
      }
      switch (type) {
        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame("SuspenseList");
        case REACT_SUSPENSE_TYPE:
          return describeBuiltInComponentFrame("Suspense");
      }
      return "";
    }
    function defaultErrorHandler(error) {
      if ("object" === typeof error && null !== error && "string" === typeof error.environmentName) {
        var JSCompiler_inline_result = error.environmentName;
        error = [error].slice(0);
        "string" === typeof error[0] ? error.splice(
          0,
          1,
          "[%s] " + error[0],
          " " + JSCompiler_inline_result + " "
        ) : error.splice(0, 0, "[%s] ", " " + JSCompiler_inline_result + " ");
        error.unshift(console);
        JSCompiler_inline_result = bind.apply(console.error, error);
        JSCompiler_inline_result();
      } else console.error(error);
      return null;
    }
    function noop2() {
    }
    function RequestInstance(resumableState, renderState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, formState) {
      var abortSet = /* @__PURE__ */ new Set();
      this.destination = null;
      this.flushScheduled = false;
      this.resumableState = resumableState;
      this.renderState = renderState;
      this.rootFormatContext = rootFormatContext;
      this.progressiveChunkSize = void 0 === progressiveChunkSize ? 12800 : progressiveChunkSize;
      this.status = 10;
      this.fatalError = null;
      this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0;
      this.completedRootSegment = null;
      this.abortableTasks = abortSet;
      this.pingedTasks = [];
      this.clientRenderedBoundaries = [];
      this.completedBoundaries = [];
      this.partialBoundaries = [];
      this.trackedPostpones = null;
      this.onError = void 0 === onError2 ? defaultErrorHandler : onError2;
      this.onPostpone = void 0 === onPostpone ? noop2 : onPostpone;
      this.onAllReady = void 0 === onAllReady ? noop2 : onAllReady;
      this.onShellReady = void 0 === onShellReady ? noop2 : onShellReady;
      this.onShellError = void 0 === onShellError ? noop2 : onShellError;
      this.onFatalError = void 0 === onFatalError ? noop2 : onFatalError;
      this.formState = void 0 === formState ? null : formState;
    }
    function createRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError2, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, formState) {
      resumableState = new RequestInstance(
        resumableState,
        renderState,
        rootFormatContext,
        progressiveChunkSize,
        onError2,
        onAllReady,
        onShellReady,
        onShellError,
        onFatalError,
        onPostpone,
        formState
      );
      renderState = createPendingSegment(
        resumableState,
        0,
        null,
        rootFormatContext,
        false,
        false
      );
      renderState.parentFlushed = true;
      children = createRenderTask(
        resumableState,
        null,
        children,
        -1,
        null,
        renderState,
        null,
        resumableState.abortableTasks,
        null,
        rootFormatContext,
        null,
        emptyTreeContext,
        null,
        false
      );
      pushComponentStack(children);
      resumableState.pingedTasks.push(children);
      return resumableState;
    }
    var currentRequest = null;
    function pingTask(request, task) {
      request.pingedTasks.push(task);
      1 === request.pingedTasks.length && (request.flushScheduled = null !== request.destination, performWork(request));
    }
    function createSuspenseBoundary(request, fallbackAbortableTasks) {
      return {
        status: 0,
        rootSegmentID: -1,
        parentFlushed: false,
        pendingTasks: 0,
        completedSegments: [],
        byteSize: 0,
        fallbackAbortableTasks,
        errorDigest: null,
        contentState: createHoistableState(),
        fallbackState: createHoistableState(),
        trackedContentKeyPath: null,
        trackedFallbackNode: null
      };
    }
    function createRenderTask(request, thenableState2, node, childIndex, blockedBoundary, blockedSegment, hoistableState, abortSet, keyPath, formatContext, context, treeContext, componentStack, isFallback) {
      request.allPendingTasks++;
      null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
      var task = {
        replay: null,
        node,
        childIndex,
        ping: function() {
          return pingTask(request, task);
        },
        blockedBoundary,
        blockedSegment,
        hoistableState,
        abortSet,
        keyPath,
        formatContext,
        context,
        treeContext,
        componentStack,
        thenableState: thenableState2,
        isFallback
      };
      abortSet.add(task);
      return task;
    }
    function createReplayTask(request, thenableState2, replay, node, childIndex, blockedBoundary, hoistableState, abortSet, keyPath, formatContext, context, treeContext, componentStack, isFallback) {
      request.allPendingTasks++;
      null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
      replay.pendingTasks++;
      var task = {
        replay,
        node,
        childIndex,
        ping: function() {
          return pingTask(request, task);
        },
        blockedBoundary,
        blockedSegment: null,
        hoistableState,
        abortSet,
        keyPath,
        formatContext,
        context,
        treeContext,
        componentStack,
        thenableState: thenableState2,
        isFallback
      };
      abortSet.add(task);
      return task;
    }
    function createPendingSegment(request, index, boundary, parentFormatContext, lastPushedText, textEmbedded) {
      return {
        status: 0,
        id: -1,
        index,
        parentFlushed: false,
        chunks: [],
        children: [],
        parentFormatContext,
        boundary,
        lastPushedText,
        textEmbedded
      };
    }
    function pushComponentStack(task) {
      var node = task.node;
      if ("object" === typeof node && null !== node)
        switch (node.$$typeof) {
          case REACT_ELEMENT_TYPE:
            task.componentStack = { parent: task.componentStack, type: node.type };
        }
    }
    function getThrownInfo(node$jscomp$0) {
      var errorInfo = {};
      node$jscomp$0 && Object.defineProperty(errorInfo, "componentStack", {
        configurable: true,
        enumerable: true,
        get: function() {
          try {
            var info = "", node = node$jscomp$0;
            do
              info += describeComponentStackByType(node.type), node = node.parent;
            while (node);
            var JSCompiler_inline_result = info;
          } catch (x) {
            JSCompiler_inline_result = "\nError generating stack: " + x.message + "\n" + x.stack;
          }
          Object.defineProperty(errorInfo, "componentStack", {
            value: JSCompiler_inline_result
          });
          return JSCompiler_inline_result;
        }
      });
      return errorInfo;
    }
    function logRecoverableError(request, error, errorInfo) {
      request = request.onError;
      error = request(error, errorInfo);
      if (null == error || "string" === typeof error) return error;
    }
    function fatalError(request, error) {
      var onShellError = request.onShellError, onFatalError = request.onFatalError;
      onShellError(error);
      onFatalError(error);
      null !== request.destination ? (request.status = 14, request.destination.destroy(error)) : (request.status = 13, request.fatalError = error);
    }
    function renderWithHooks(request, task, keyPath, Component2, props, secondArg) {
      var prevThenableState = task.thenableState;
      task.thenableState = null;
      currentlyRenderingComponent = {};
      currentlyRenderingTask = task;
      currentlyRenderingRequest = request;
      currentlyRenderingKeyPath = keyPath;
      actionStateCounter = localIdCounter = 0;
      actionStateMatchingIndex = -1;
      thenableIndexCounter = 0;
      thenableState = prevThenableState;
      for (request = Component2(props, secondArg); didScheduleRenderPhaseUpdate; )
        didScheduleRenderPhaseUpdate = false, actionStateCounter = localIdCounter = 0, actionStateMatchingIndex = -1, thenableIndexCounter = 0, numberOfReRenders += 1, workInProgressHook = null, request = Component2(props, secondArg);
      resetHooksState();
      return request;
    }
    function finishFunctionComponent(request, task, keyPath, children, hasId, actionStateCount, actionStateMatchingIndex2) {
      var didEmitActionStateMarkers = false;
      if (0 !== actionStateCount && null !== request.formState) {
        var segment = task.blockedSegment;
        if (null !== segment) {
          didEmitActionStateMarkers = true;
          segment = segment.chunks;
          for (var i = 0; i < actionStateCount; i++)
            i === actionStateMatchingIndex2 ? segment.push("<!--F!-->") : segment.push("<!--F-->");
        }
      }
      actionStateCount = task.keyPath;
      task.keyPath = keyPath;
      hasId ? (keyPath = task.treeContext, task.treeContext = pushTreeContext(keyPath, 1, 0), renderNode(request, task, children, -1), task.treeContext = keyPath) : didEmitActionStateMarkers ? renderNode(request, task, children, -1) : renderNodeDestructive(request, task, children, -1);
      task.keyPath = actionStateCount;
    }
    function renderElement(request, task, keyPath, type, props, ref) {
      if ("function" === typeof type)
        if (type.prototype && type.prototype.isReactComponent) {
          var newProps = props;
          if ("ref" in props) {
            newProps = {};
            for (var propName in props)
              "ref" !== propName && (newProps[propName] = props[propName]);
          }
          var defaultProps = type.defaultProps;
          if (defaultProps) {
            newProps === props && (newProps = assign({}, newProps, props));
            for (var propName$33 in defaultProps)
              void 0 === newProps[propName$33] && (newProps[propName$33] = defaultProps[propName$33]);
          }
          props = newProps;
          newProps = emptyContextObject;
          defaultProps = type.contextType;
          "object" === typeof defaultProps && null !== defaultProps && (newProps = defaultProps._currentValue2);
          newProps = new type(props, newProps);
          var initialState = void 0 !== newProps.state ? newProps.state : null;
          newProps.updater = classComponentUpdater;
          newProps.props = props;
          newProps.state = initialState;
          defaultProps = { queue: [], replace: false };
          newProps._reactInternals = defaultProps;
          ref = type.contextType;
          newProps.context = "object" === typeof ref && null !== ref ? ref._currentValue2 : emptyContextObject;
          ref = type.getDerivedStateFromProps;
          "function" === typeof ref && (ref = ref(props, initialState), initialState = null === ref || void 0 === ref ? initialState : assign({}, initialState, ref), newProps.state = initialState);
          if ("function" !== typeof type.getDerivedStateFromProps && "function" !== typeof newProps.getSnapshotBeforeUpdate && ("function" === typeof newProps.UNSAFE_componentWillMount || "function" === typeof newProps.componentWillMount))
            if (type = newProps.state, "function" === typeof newProps.componentWillMount && newProps.componentWillMount(), "function" === typeof newProps.UNSAFE_componentWillMount && newProps.UNSAFE_componentWillMount(), type !== newProps.state && classComponentUpdater.enqueueReplaceState(
              newProps,
              newProps.state,
              null
            ), null !== defaultProps.queue && 0 < defaultProps.queue.length)
              if (type = defaultProps.queue, ref = defaultProps.replace, defaultProps.queue = null, defaultProps.replace = false, ref && 1 === type.length)
                newProps.state = type[0];
              else {
                defaultProps = ref ? type[0] : newProps.state;
                initialState = true;
                for (ref = ref ? 1 : 0; ref < type.length; ref++)
                  propName$33 = type[ref], propName$33 = "function" === typeof propName$33 ? propName$33.call(newProps, defaultProps, props, void 0) : propName$33, null != propName$33 && (initialState ? (initialState = false, defaultProps = assign({}, defaultProps, propName$33)) : assign(defaultProps, propName$33));
                newProps.state = defaultProps;
              }
            else defaultProps.queue = null;
          type = newProps.render();
          if (12 === request.status) throw null;
          props = task.keyPath;
          task.keyPath = keyPath;
          renderNodeDestructive(request, task, type, -1);
          task.keyPath = props;
        } else {
          type = renderWithHooks(request, task, keyPath, type, props, void 0);
          if (12 === request.status) throw null;
          finishFunctionComponent(
            request,
            task,
            keyPath,
            type,
            0 !== localIdCounter,
            actionStateCounter,
            actionStateMatchingIndex
          );
        }
      else if ("string" === typeof type)
        if (newProps = task.blockedSegment, null === newProps)
          newProps = props.children, defaultProps = task.formatContext, initialState = task.keyPath, task.formatContext = getChildFormatContext(defaultProps, type, props), task.keyPath = keyPath, renderNode(request, task, newProps, -1), task.formatContext = defaultProps, task.keyPath = initialState;
        else {
          initialState = pushStartInstance(
            newProps.chunks,
            type,
            props,
            request.resumableState,
            request.renderState,
            task.hoistableState,
            task.formatContext,
            newProps.lastPushedText,
            task.isFallback
          );
          newProps.lastPushedText = false;
          defaultProps = task.formatContext;
          ref = task.keyPath;
          task.formatContext = getChildFormatContext(defaultProps, type, props);
          task.keyPath = keyPath;
          renderNode(request, task, initialState, -1);
          task.formatContext = defaultProps;
          task.keyPath = ref;
          a: {
            task = newProps.chunks;
            request = request.resumableState;
            switch (type) {
              case "title":
              case "style":
              case "script":
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "input":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr":
                break a;
              case "body":
                if (1 >= defaultProps.insertionMode) {
                  request.hasBody = true;
                  break a;
                }
                break;
              case "html":
                if (0 === defaultProps.insertionMode) {
                  request.hasHtml = true;
                  break a;
                }
            }
            task.push(endChunkForTag(type));
          }
          newProps.lastPushedText = false;
        }
      else {
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_DEBUG_TRACING_MODE_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE:
            type = task.keyPath;
            task.keyPath = keyPath;
            renderNodeDestructive(request, task, props.children, -1);
            task.keyPath = type;
            return;
          case REACT_OFFSCREEN_TYPE:
            "hidden" !== props.mode && (type = task.keyPath, task.keyPath = keyPath, renderNodeDestructive(request, task, props.children, -1), task.keyPath = type);
            return;
          case REACT_SUSPENSE_LIST_TYPE:
            type = task.keyPath;
            task.keyPath = keyPath;
            renderNodeDestructive(request, task, props.children, -1);
            task.keyPath = type;
            return;
          case REACT_SCOPE_TYPE:
            throw Error("ReactDOMServer does not yet support scope components.");
          case REACT_SUSPENSE_TYPE:
            a: if (null !== task.replay) {
              type = task.keyPath;
              task.keyPath = keyPath;
              keyPath = props.children;
              try {
                renderNode(request, task, keyPath, -1);
              } finally {
                task.keyPath = type;
              }
            } else {
              type = task.keyPath;
              var parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState;
              ref = task.blockedSegment;
              propName$33 = props.fallback;
              props = props.children;
              var fallbackAbortSet = /* @__PURE__ */ new Set();
              propName = createSuspenseBoundary(request, fallbackAbortSet);
              null !== request.trackedPostpones && (propName.trackedContentKeyPath = keyPath);
              var boundarySegment = createPendingSegment(
                request,
                ref.chunks.length,
                propName,
                task.formatContext,
                false,
                false
              );
              ref.children.push(boundarySegment);
              ref.lastPushedText = false;
              var contentRootSegment = createPendingSegment(
                request,
                0,
                null,
                task.formatContext,
                false,
                false
              );
              contentRootSegment.parentFlushed = true;
              if (null !== request.trackedPostpones) {
                newProps = [keyPath[0], "Suspense Fallback", keyPath[2]];
                defaultProps = [newProps[1], newProps[2], [], null];
                request.trackedPostpones.workingMap.set(newProps, defaultProps);
                propName.trackedFallbackNode = defaultProps;
                task.blockedSegment = boundarySegment;
                task.keyPath = newProps;
                boundarySegment.status = 6;
                try {
                  renderNode(request, task, propName$33, -1), pushSegmentFinale(
                    boundarySegment.chunks,
                    request.renderState,
                    boundarySegment.lastPushedText,
                    boundarySegment.textEmbedded
                  ), boundarySegment.status = 1;
                } catch (thrownValue) {
                  throw boundarySegment.status = 12 === request.status ? 3 : 4, thrownValue;
                } finally {
                  task.blockedSegment = ref, task.keyPath = type;
                }
                task = createRenderTask(
                  request,
                  null,
                  props,
                  -1,
                  propName,
                  contentRootSegment,
                  propName.contentState,
                  task.abortSet,
                  keyPath,
                  task.formatContext,
                  task.context,
                  task.treeContext,
                  task.componentStack,
                  task.isFallback
                );
                pushComponentStack(task);
                request.pingedTasks.push(task);
              } else {
                task.blockedBoundary = propName;
                task.hoistableState = propName.contentState;
                task.blockedSegment = contentRootSegment;
                task.keyPath = keyPath;
                contentRootSegment.status = 6;
                try {
                  if (renderNode(request, task, props, -1), pushSegmentFinale(
                    contentRootSegment.chunks,
                    request.renderState,
                    contentRootSegment.lastPushedText,
                    contentRootSegment.textEmbedded
                  ), contentRootSegment.status = 1, queueCompletedSegment(propName, contentRootSegment), 0 === propName.pendingTasks && 0 === propName.status) {
                    propName.status = 1;
                    break a;
                  }
                } catch (thrownValue$28) {
                  propName.status = 4, 12 === request.status ? (contentRootSegment.status = 3, newProps = request.fatalError) : (contentRootSegment.status = 4, newProps = thrownValue$28), defaultProps = getThrownInfo(task.componentStack), initialState = logRecoverableError(
                    request,
                    newProps,
                    defaultProps
                  ), propName.errorDigest = initialState, untrackBoundary(request, propName);
                } finally {
                  task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.blockedSegment = ref, task.keyPath = type;
                }
                task = createRenderTask(
                  request,
                  null,
                  propName$33,
                  -1,
                  parentBoundary,
                  boundarySegment,
                  propName.fallbackState,
                  fallbackAbortSet,
                  [keyPath[0], "Suspense Fallback", keyPath[2]],
                  task.formatContext,
                  task.context,
                  task.treeContext,
                  task.componentStack,
                  true
                );
                pushComponentStack(task);
                request.pingedTasks.push(task);
              }
            }
            return;
        }
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              if ("ref" in props)
                for (boundarySegment in newProps = {}, props)
                  "ref" !== boundarySegment && (newProps[boundarySegment] = props[boundarySegment]);
              else newProps = props;
              type = renderWithHooks(
                request,
                task,
                keyPath,
                type.render,
                newProps,
                ref
              );
              finishFunctionComponent(
                request,
                task,
                keyPath,
                type,
                0 !== localIdCounter,
                actionStateCounter,
                actionStateMatchingIndex
              );
              return;
            case REACT_MEMO_TYPE:
              renderElement(request, task, keyPath, type.type, props, ref);
              return;
            case REACT_PROVIDER_TYPE:
            case REACT_CONTEXT_TYPE:
              defaultProps = props.children;
              newProps = task.keyPath;
              props = props.value;
              initialState = type._currentValue2;
              type._currentValue2 = props;
              ref = currentActiveSnapshot;
              currentActiveSnapshot = type = {
                parent: ref,
                depth: null === ref ? 0 : ref.depth + 1,
                context: type,
                parentValue: initialState,
                value: props
              };
              task.context = type;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, defaultProps, -1);
              request = currentActiveSnapshot;
              if (null === request)
                throw Error(
                  "Tried to pop a Context at the root of the app. This is a bug in React."
                );
              request.context._currentValue2 = request.parentValue;
              request = currentActiveSnapshot = request.parent;
              task.context = request;
              task.keyPath = newProps;
              return;
            case REACT_CONSUMER_TYPE:
              props = props.children;
              type = props(type._context._currentValue2);
              props = task.keyPath;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, type, -1);
              task.keyPath = props;
              return;
            case REACT_LAZY_TYPE:
              newProps = type._init;
              type = newProps(type._payload);
              if (12 === request.status) throw null;
              renderElement(request, task, keyPath, type, props, ref);
              return;
          }
        throw Error(
          "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((null == type ? type : typeof type) + ".")
        );
      }
    }
    function resumeNode(request, task, segmentId, node, childIndex) {
      var prevReplay = task.replay, blockedBoundary = task.blockedBoundary, resumedSegment = createPendingSegment(
        request,
        0,
        null,
        task.formatContext,
        false,
        false
      );
      resumedSegment.id = segmentId;
      resumedSegment.parentFlushed = true;
      try {
        task.replay = null, task.blockedSegment = resumedSegment, renderNode(request, task, node, childIndex), resumedSegment.status = 1, null === blockedBoundary ? request.completedRootSegment = resumedSegment : (queueCompletedSegment(blockedBoundary, resumedSegment), blockedBoundary.parentFlushed && request.partialBoundaries.push(blockedBoundary));
      } finally {
        task.replay = prevReplay, task.blockedSegment = null;
      }
    }
    function renderNodeDestructive(request, task, node, childIndex) {
      null !== task.replay && "number" === typeof task.replay.slots ? resumeNode(request, task, task.replay.slots, node, childIndex) : (task.node = node, task.childIndex = childIndex, node = task.componentStack, pushComponentStack(task), retryNode(request, task), task.componentStack = node);
    }
    function retryNode(request, task) {
      var node = task.node, childIndex = task.childIndex;
      if (null !== node) {
        if ("object" === typeof node) {
          switch (node.$$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = node.type, key = node.key, props = node.props;
              node = props.ref;
              var ref = void 0 !== node ? node : null, name = getComponentNameFromType(type), keyOrIndex = null == key ? -1 === childIndex ? 0 : childIndex : key;
              key = [task.keyPath, name, keyOrIndex];
              if (null !== task.replay)
                a: {
                  var replay = task.replay;
                  childIndex = replay.nodes;
                  for (node = 0; node < childIndex.length; node++) {
                    var node$jscomp$0 = childIndex[node];
                    if (keyOrIndex === node$jscomp$0[1]) {
                      if (4 === node$jscomp$0.length) {
                        if (null !== name && name !== node$jscomp$0[0])
                          throw Error(
                            "Expected the resume to render <" + node$jscomp$0[0] + "> in this slot but instead it rendered <" + name + ">. The tree doesn't match so React will fallback to client rendering."
                          );
                        var childNodes = node$jscomp$0[2];
                        name = node$jscomp$0[3];
                        keyOrIndex = task.node;
                        task.replay = {
                          nodes: childNodes,
                          slots: name,
                          pendingTasks: 1
                        };
                        try {
                          renderElement(request, task, key, type, props, ref);
                          if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                            throw Error(
                              "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                            );
                          task.replay.pendingTasks--;
                        } catch (x) {
                          if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then))
                            throw task.node === keyOrIndex && (task.replay = replay), x;
                          task.replay.pendingTasks--;
                          props = getThrownInfo(task.componentStack);
                          key = task.blockedBoundary;
                          type = x;
                          props = logRecoverableError(request, type, props);
                          abortRemainingReplayNodes(
                            request,
                            key,
                            childNodes,
                            name,
                            type,
                            props
                          );
                        }
                        task.replay = replay;
                      } else {
                        if (type !== REACT_SUSPENSE_TYPE)
                          throw Error(
                            "Expected the resume to render <Suspense> in this slot but instead it rendered <" + (getComponentNameFromType(type) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering."
                          );
                        b: {
                          replay = void 0;
                          type = node$jscomp$0[5];
                          ref = node$jscomp$0[2];
                          name = node$jscomp$0[3];
                          keyOrIndex = null === node$jscomp$0[4] ? [] : node$jscomp$0[4][2];
                          node$jscomp$0 = null === node$jscomp$0[4] ? null : node$jscomp$0[4][3];
                          var prevKeyPath = task.keyPath, previousReplaySet = task.replay, parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState, content = props.children;
                          props = props.fallback;
                          var fallbackAbortSet = /* @__PURE__ */ new Set(), resumedBoundary = createSuspenseBoundary(
                            request,
                            fallbackAbortSet
                          );
                          resumedBoundary.parentFlushed = true;
                          resumedBoundary.rootSegmentID = type;
                          task.blockedBoundary = resumedBoundary;
                          task.hoistableState = resumedBoundary.contentState;
                          task.keyPath = key;
                          task.replay = {
                            nodes: ref,
                            slots: name,
                            pendingTasks: 1
                          };
                          try {
                            renderNode(request, task, content, -1);
                            if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                              throw Error(
                                "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                              );
                            task.replay.pendingTasks--;
                            if (0 === resumedBoundary.pendingTasks && 0 === resumedBoundary.status) {
                              resumedBoundary.status = 1;
                              request.completedBoundaries.push(resumedBoundary);
                              break b;
                            }
                          } catch (error) {
                            resumedBoundary.status = 4, childNodes = getThrownInfo(task.componentStack), replay = logRecoverableError(
                              request,
                              error,
                              childNodes
                            ), resumedBoundary.errorDigest = replay, task.replay.pendingTasks--, request.clientRenderedBoundaries.push(
                              resumedBoundary
                            );
                          } finally {
                            task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.replay = previousReplaySet, task.keyPath = prevKeyPath;
                          }
                          task = createReplayTask(
                            request,
                            null,
                            {
                              nodes: keyOrIndex,
                              slots: node$jscomp$0,
                              pendingTasks: 0
                            },
                            props,
                            -1,
                            parentBoundary,
                            resumedBoundary.fallbackState,
                            fallbackAbortSet,
                            [key[0], "Suspense Fallback", key[2]],
                            task.formatContext,
                            task.context,
                            task.treeContext,
                            task.componentStack,
                            true
                          );
                          pushComponentStack(task);
                          request.pingedTasks.push(task);
                        }
                      }
                      childIndex.splice(node, 1);
                      break a;
                    }
                  }
                }
              else renderElement(request, task, key, type, props, ref);
              return;
            case REACT_PORTAL_TYPE:
              throw Error(
                "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render."
              );
            case REACT_LAZY_TYPE:
              childNodes = node._init;
              node = childNodes(node._payload);
              if (12 === request.status) throw null;
              renderNodeDestructive(request, task, node, childIndex);
              return;
          }
          if (isArrayImpl(node)) {
            renderChildrenArray(request, task, node, childIndex);
            return;
          }
          null === node || "object" !== typeof node ? childNodes = null : (childNodes = MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL] || node["@@iterator"], childNodes = "function" === typeof childNodes ? childNodes : null);
          if (childNodes && (childNodes = childNodes.call(node))) {
            node = childNodes.next();
            if (!node.done) {
              props = [];
              do
                props.push(node.value), node = childNodes.next();
              while (!node.done);
              renderChildrenArray(request, task, props, childIndex);
            }
            return;
          }
          if ("function" === typeof node.then)
            return task.thenableState = null, renderNodeDestructive(request, task, unwrapThenable(node), childIndex);
          if (node.$$typeof === REACT_CONTEXT_TYPE)
            return renderNodeDestructive(
              request,
              task,
              node._currentValue2,
              childIndex
            );
          childIndex = Object.prototype.toString.call(node);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === childIndex ? "object with keys {" + Object.keys(node).join(", ") + "}" : childIndex) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        if ("string" === typeof node)
          childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
            childIndex.chunks,
            node,
            request.renderState,
            childIndex.lastPushedText
          ));
        else if ("number" === typeof node || "bigint" === typeof node)
          childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
            childIndex.chunks,
            "" + node,
            request.renderState,
            childIndex.lastPushedText
          ));
      }
    }
    function renderChildrenArray(request, task, children, childIndex) {
      var prevKeyPath = task.keyPath;
      if (-1 !== childIndex && (task.keyPath = [task.keyPath, "Fragment", childIndex], null !== task.replay)) {
        for (var replay = task.replay, replayNodes = replay.nodes, j = 0; j < replayNodes.length; j++) {
          var node = replayNodes[j];
          if (node[1] === childIndex) {
            childIndex = node[2];
            node = node[3];
            task.replay = { nodes: childIndex, slots: node, pendingTasks: 1 };
            try {
              renderChildrenArray(request, task, children, -1);
              if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                throw Error(
                  "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                );
              task.replay.pendingTasks--;
            } catch (x) {
              if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then))
                throw x;
              task.replay.pendingTasks--;
              children = getThrownInfo(task.componentStack);
              var boundary = task.blockedBoundary, error = x;
              children = logRecoverableError(request, error, children);
              abortRemainingReplayNodes(
                request,
                boundary,
                childIndex,
                node,
                error,
                children
              );
            }
            task.replay = replay;
            replayNodes.splice(j, 1);
            break;
          }
        }
        task.keyPath = prevKeyPath;
        return;
      }
      replay = task.treeContext;
      replayNodes = children.length;
      if (null !== task.replay && (j = task.replay.slots, null !== j && "object" === typeof j)) {
        for (childIndex = 0; childIndex < replayNodes; childIndex++)
          node = children[childIndex], task.treeContext = pushTreeContext(replay, replayNodes, childIndex), boundary = j[childIndex], "number" === typeof boundary ? (resumeNode(request, task, boundary, node, childIndex), delete j[childIndex]) : renderNode(request, task, node, childIndex);
        task.treeContext = replay;
        task.keyPath = prevKeyPath;
        return;
      }
      for (j = 0; j < replayNodes; j++)
        childIndex = children[j], task.treeContext = pushTreeContext(replay, replayNodes, j), renderNode(request, task, childIndex, j);
      task.treeContext = replay;
      task.keyPath = prevKeyPath;
    }
    function untrackBoundary(request, boundary) {
      request = request.trackedPostpones;
      null !== request && (boundary = boundary.trackedContentKeyPath, null !== boundary && (boundary = request.workingMap.get(boundary), void 0 !== boundary && (boundary.length = 4, boundary[2] = [], boundary[3] = null)));
    }
    function spawnNewSuspendedReplayTask(request, task, thenableState2) {
      return createReplayTask(
        request,
        thenableState2,
        task.replay,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.componentStack,
        task.isFallback
      );
    }
    function spawnNewSuspendedRenderTask(request, task, thenableState2) {
      var segment = task.blockedSegment, newSegment = createPendingSegment(
        request,
        segment.chunks.length,
        null,
        task.formatContext,
        segment.lastPushedText,
        true
      );
      segment.children.push(newSegment);
      segment.lastPushedText = false;
      return createRenderTask(
        request,
        thenableState2,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        newSegment,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.componentStack,
        task.isFallback
      );
    }
    function renderNode(request, task, node, childIndex) {
      var previousFormatContext = task.formatContext, previousContext = task.context, previousKeyPath = task.keyPath, previousTreeContext = task.treeContext, previousComponentStack = task.componentStack, segment = task.blockedSegment;
      if (null === segment)
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue) {
          if (resetHooksState(), node = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue, "object" === typeof node && null !== node) {
            if ("function" === typeof node.then) {
              childIndex = getThenableStateAfterSuspending();
              request = spawnNewSuspendedReplayTask(request, task, childIndex).ping;
              node.then(request, request);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === node.message) {
              node = getThenableStateAfterSuspending();
              node = spawnNewSuspendedReplayTask(request, task, node);
              request.pingedTasks.push(node);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
          }
        }
      else {
        var childrenLength = segment.children.length, chunkLength = segment.chunks.length;
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue$48) {
          if (resetHooksState(), segment.children.length = childrenLength, segment.chunks.length = chunkLength, node = thrownValue$48 === SuspenseException ? getSuspendedThenable() : thrownValue$48, "object" === typeof node && null !== node) {
            if ("function" === typeof node.then) {
              childIndex = getThenableStateAfterSuspending();
              request = spawnNewSuspendedRenderTask(request, task, childIndex).ping;
              node.then(request, request);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === node.message) {
              node = getThenableStateAfterSuspending();
              node = spawnNewSuspendedRenderTask(request, task, node);
              request.pingedTasks.push(node);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
          }
        }
      }
      task.formatContext = previousFormatContext;
      task.context = previousContext;
      task.keyPath = previousKeyPath;
      task.treeContext = previousTreeContext;
      switchContext(previousContext);
      throw node;
    }
    function abortTaskSoft(task) {
      var boundary = task.blockedBoundary;
      task = task.blockedSegment;
      null !== task && (task.status = 3, finishedTask(this, boundary, task));
    }
    function abortRemainingReplayNodes(request$jscomp$0, boundary, nodes, slots, error, errorDigest$jscomp$0) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (4 === node.length)
          abortRemainingReplayNodes(
            request$jscomp$0,
            boundary,
            node[2],
            node[3],
            error,
            errorDigest$jscomp$0
          );
        else {
          node = node[5];
          var request = request$jscomp$0, errorDigest = errorDigest$jscomp$0, resumedBoundary = createSuspenseBoundary(request, /* @__PURE__ */ new Set());
          resumedBoundary.parentFlushed = true;
          resumedBoundary.rootSegmentID = node;
          resumedBoundary.status = 4;
          resumedBoundary.errorDigest = errorDigest;
          resumedBoundary.parentFlushed && request.clientRenderedBoundaries.push(resumedBoundary);
        }
      }
      nodes.length = 0;
      if (null !== slots) {
        if (null === boundary)
          throw Error(
            "We should not have any resumable nodes in the shell. This is a bug in React."
          );
        4 !== boundary.status && (boundary.status = 4, boundary.errorDigest = errorDigest$jscomp$0, boundary.parentFlushed && request$jscomp$0.clientRenderedBoundaries.push(boundary));
        if ("object" === typeof slots) for (var index in slots) delete slots[index];
      }
    }
    function abortTask(task, request, error) {
      var boundary = task.blockedBoundary, segment = task.blockedSegment;
      if (null !== segment) {
        if (6 === segment.status) return;
        segment.status = 3;
      }
      segment = getThrownInfo(task.componentStack);
      if (null === boundary) {
        if (13 !== request.status && 14 !== request.status) {
          boundary = task.replay;
          if (null === boundary) {
            logRecoverableError(request, error, segment);
            fatalError(request, error);
            return;
          }
          boundary.pendingTasks--;
          0 === boundary.pendingTasks && 0 < boundary.nodes.length && (task = logRecoverableError(request, error, segment), abortRemainingReplayNodes(
            request,
            null,
            boundary.nodes,
            boundary.slots,
            error,
            task
          ));
          request.pendingRootTasks--;
          0 === request.pendingRootTasks && completeShell(request);
        }
      } else
        boundary.pendingTasks--, 4 !== boundary.status && (boundary.status = 4, task = logRecoverableError(request, error, segment), boundary.status = 4, boundary.errorDigest = task, untrackBoundary(request, boundary), boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary)), boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
          return abortTask(fallbackTask, request, error);
        }), boundary.fallbackAbortableTasks.clear();
      request.allPendingTasks--;
      0 === request.allPendingTasks && completeAll(request);
    }
    function safelyEmitEarlyPreloads(request, shellComplete) {
      try {
        var renderState = request.renderState, onHeaders = renderState.onHeaders;
        if (onHeaders) {
          var headers = renderState.headers;
          if (headers) {
            renderState.headers = null;
            var linkHeader = headers.preconnects;
            headers.fontPreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.fontPreloads);
            headers.highImagePreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.highImagePreloads);
            if (!shellComplete) {
              var queueIter = renderState.styles.values(), queueStep = queueIter.next();
              b: for (; 0 < headers.remainingCapacity && !queueStep.done; queueStep = queueIter.next())
                for (var sheetIter = queueStep.value.sheets.values(), sheetStep = sheetIter.next(); 0 < headers.remainingCapacity && !sheetStep.done; sheetStep = sheetIter.next()) {
                  var sheet = sheetStep.value, props = sheet.props, key = props.href, props$jscomp$0 = sheet.props, header = getPreloadAsHeader(props$jscomp$0.href, "style", {
                    crossOrigin: props$jscomp$0.crossOrigin,
                    integrity: props$jscomp$0.integrity,
                    nonce: props$jscomp$0.nonce,
                    type: props$jscomp$0.type,
                    fetchPriority: props$jscomp$0.fetchPriority,
                    referrerPolicy: props$jscomp$0.referrerPolicy,
                    media: props$jscomp$0.media
                  });
                  if (0 <= (headers.remainingCapacity -= header.length + 2))
                    renderState.resets.style[key] = PRELOAD_NO_CREDS, linkHeader && (linkHeader += ", "), linkHeader += header, renderState.resets.style[key] = "string" === typeof props.crossOrigin || "string" === typeof props.integrity ? [props.crossOrigin, props.integrity] : PRELOAD_NO_CREDS;
                  else break b;
                }
            }
            linkHeader ? onHeaders({ Link: linkHeader }) : onHeaders({});
          }
        }
      } catch (error) {
        logRecoverableError(request, error, {});
      }
    }
    function completeShell(request) {
      null === request.trackedPostpones && safelyEmitEarlyPreloads(request, true);
      request.onShellError = noop2;
      request = request.onShellReady;
      request();
    }
    function completeAll(request) {
      safelyEmitEarlyPreloads(
        request,
        null === request.trackedPostpones ? true : null === request.completedRootSegment || 5 !== request.completedRootSegment.status
      );
      request = request.onAllReady;
      request();
    }
    function queueCompletedSegment(boundary, segment) {
      if (0 === segment.chunks.length && 1 === segment.children.length && null === segment.children[0].boundary && -1 === segment.children[0].id) {
        var childSegment = segment.children[0];
        childSegment.id = segment.id;
        childSegment.parentFlushed = true;
        1 === childSegment.status && queueCompletedSegment(boundary, childSegment);
      } else boundary.completedSegments.push(segment);
    }
    function finishedTask(request, boundary, segment) {
      if (null === boundary) {
        if (null !== segment && segment.parentFlushed) {
          if (null !== request.completedRootSegment)
            throw Error(
              "There can only be one root segment. This is a bug in React."
            );
          request.completedRootSegment = segment;
        }
        request.pendingRootTasks--;
        0 === request.pendingRootTasks && completeShell(request);
      } else
        boundary.pendingTasks--, 4 !== boundary.status && (0 === boundary.pendingTasks ? (0 === boundary.status && (boundary.status = 1), null !== segment && segment.parentFlushed && 1 === segment.status && queueCompletedSegment(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), 1 === boundary.status && (boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request), boundary.fallbackAbortableTasks.clear())) : null !== segment && segment.parentFlushed && 1 === segment.status && (queueCompletedSegment(boundary, segment), 1 === boundary.completedSegments.length && boundary.parentFlushed && request.partialBoundaries.push(boundary)));
      request.allPendingTasks--;
      0 === request.allPendingTasks && completeAll(request);
    }
    function performWork(request$jscomp$2) {
      if (14 !== request$jscomp$2.status && 13 !== request$jscomp$2.status) {
        var prevContext = currentActiveSnapshot, prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = HooksDispatcher;
        var prevAsyncDispatcher = ReactSharedInternals.A;
        ReactSharedInternals.A = DefaultAsyncDispatcher;
        var prevRequest = currentRequest;
        currentRequest = request$jscomp$2;
        var prevResumableState = currentResumableState;
        currentResumableState = request$jscomp$2.resumableState;
        try {
          var pingedTasks = request$jscomp$2.pingedTasks, i;
          for (i = 0; i < pingedTasks.length; i++) {
            var task = pingedTasks[i], request = request$jscomp$2, segment = task.blockedSegment;
            if (null === segment) {
              var request$jscomp$0 = request;
              if (0 !== task.replay.pendingTasks) {
                switchContext(task.context);
                try {
                  "number" === typeof task.replay.slots ? resumeNode(
                    request$jscomp$0,
                    task,
                    task.replay.slots,
                    task.node,
                    task.childIndex
                  ) : retryNode(request$jscomp$0, task);
                  if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                    throw Error(
                      "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                    );
                  task.replay.pendingTasks--;
                  task.abortSet.delete(task);
                  finishedTask(request$jscomp$0, task.blockedBoundary, null);
                } catch (thrownValue) {
                  resetHooksState();
                  var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
                  if ("object" === typeof x && null !== x && "function" === typeof x.then) {
                    var ping = task.ping;
                    x.then(ping, ping);
                    task.thenableState = getThenableStateAfterSuspending();
                  } else {
                    task.replay.pendingTasks--;
                    task.abortSet.delete(task);
                    var errorInfo = getThrownInfo(task.componentStack);
                    request = void 0;
                    var request$jscomp$1 = request$jscomp$0, boundary = task.blockedBoundary, error$jscomp$0 = 12 === request$jscomp$0.status ? request$jscomp$0.fatalError : x, replayNodes = task.replay.nodes, resumeSlots = task.replay.slots;
                    request = logRecoverableError(
                      request$jscomp$1,
                      error$jscomp$0,
                      errorInfo
                    );
                    abortRemainingReplayNodes(
                      request$jscomp$1,
                      boundary,
                      replayNodes,
                      resumeSlots,
                      error$jscomp$0,
                      request
                    );
                    request$jscomp$0.pendingRootTasks--;
                    0 === request$jscomp$0.pendingRootTasks && completeShell(request$jscomp$0);
                    request$jscomp$0.allPendingTasks--;
                    0 === request$jscomp$0.allPendingTasks && completeAll(request$jscomp$0);
                  }
                } finally {
                }
              }
            } else if (request$jscomp$0 = void 0, request$jscomp$1 = segment, 0 === request$jscomp$1.status) {
              request$jscomp$1.status = 6;
              switchContext(task.context);
              var childrenLength = request$jscomp$1.children.length, chunkLength = request$jscomp$1.chunks.length;
              try {
                retryNode(request, task), pushSegmentFinale(
                  request$jscomp$1.chunks,
                  request.renderState,
                  request$jscomp$1.lastPushedText,
                  request$jscomp$1.textEmbedded
                ), task.abortSet.delete(task), request$jscomp$1.status = 1, finishedTask(request, task.blockedBoundary, request$jscomp$1);
              } catch (thrownValue) {
                resetHooksState();
                request$jscomp$1.children.length = childrenLength;
                request$jscomp$1.chunks.length = chunkLength;
                var x$jscomp$0 = thrownValue === SuspenseException ? getSuspendedThenable() : 12 === request.status ? request.fatalError : thrownValue;
                if ("object" === typeof x$jscomp$0 && null !== x$jscomp$0 && "function" === typeof x$jscomp$0.then) {
                  request$jscomp$1.status = 0;
                  task.thenableState = getThenableStateAfterSuspending();
                  var ping$jscomp$0 = task.ping;
                  x$jscomp$0.then(ping$jscomp$0, ping$jscomp$0);
                } else {
                  var errorInfo$jscomp$0 = getThrownInfo(task.componentStack);
                  task.abortSet.delete(task);
                  request$jscomp$1.status = 4;
                  var boundary$jscomp$0 = task.blockedBoundary;
                  request$jscomp$0 = logRecoverableError(
                    request,
                    x$jscomp$0,
                    errorInfo$jscomp$0
                  );
                  null === boundary$jscomp$0 ? fatalError(request, x$jscomp$0) : (boundary$jscomp$0.pendingTasks--, 4 !== boundary$jscomp$0.status && (boundary$jscomp$0.status = 4, boundary$jscomp$0.errorDigest = request$jscomp$0, untrackBoundary(request, boundary$jscomp$0), boundary$jscomp$0.parentFlushed && request.clientRenderedBoundaries.push(
                    boundary$jscomp$0
                  )));
                  request.allPendingTasks--;
                  0 === request.allPendingTasks && completeAll(request);
                }
              } finally {
              }
            }
          }
          pingedTasks.splice(0, i);
          null !== request$jscomp$2.destination && flushCompletedQueues(request$jscomp$2, request$jscomp$2.destination);
        } catch (error) {
          logRecoverableError(request$jscomp$2, error, {}), fatalError(request$jscomp$2, error);
        } finally {
          currentResumableState = prevResumableState, ReactSharedInternals.H = prevDispatcher, ReactSharedInternals.A = prevAsyncDispatcher, prevDispatcher === HooksDispatcher && switchContext(prevContext), currentRequest = prevRequest;
        }
      }
    }
    function flushSubtree(request, destination, segment, hoistableState) {
      segment.parentFlushed = true;
      switch (segment.status) {
        case 0:
          segment.id = request.nextSegmentId++;
        case 5:
          return hoistableState = segment.id, segment.lastPushedText = false, segment.textEmbedded = false, request = request.renderState, destination.push('<template id="'), destination.push(request.placeholderPrefix), request = hoistableState.toString(16), destination.push(request), destination.push('"></template>');
        case 1:
          segment.status = 2;
          var r = true, chunks = segment.chunks, chunkIdx = 0;
          segment = segment.children;
          for (var childIdx = 0; childIdx < segment.length; childIdx++) {
            for (r = segment[childIdx]; chunkIdx < r.index; chunkIdx++)
              destination.push(chunks[chunkIdx]);
            r = flushSegment(request, destination, r, hoistableState);
          }
          for (; chunkIdx < chunks.length - 1; chunkIdx++)
            destination.push(chunks[chunkIdx]);
          chunkIdx < chunks.length && (r = destination.push(chunks[chunkIdx]));
          return r;
        default:
          throw Error(
            "Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React."
          );
      }
    }
    function flushSegment(request, destination, segment, hoistableState) {
      var boundary = segment.boundary;
      if (null === boundary)
        return flushSubtree(request, destination, segment, hoistableState);
      boundary.parentFlushed = true;
      if (4 === boundary.status)
        return request.renderState.generateStaticMarkup || (boundary = boundary.errorDigest, destination.push("<!--$!-->"), destination.push("<template"), boundary && (destination.push(' data-dgst="'), boundary = escapeTextForBrowser(boundary), destination.push(boundary), destination.push('"')), destination.push("></template>")), flushSubtree(request, destination, segment, hoistableState), request = request.renderState.generateStaticMarkup ? true : destination.push("<!--/$-->"), request;
      if (1 !== boundary.status)
        return 0 === boundary.status && (boundary.rootSegmentID = request.nextSegmentId++), 0 < boundary.completedSegments.length && request.partialBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
          destination,
          request.renderState,
          boundary.rootSegmentID
        ), hoistableState && (boundary = boundary.fallbackState, boundary.styles.forEach(hoistStyleQueueDependency, hoistableState), boundary.stylesheets.forEach(
          hoistStylesheetDependency,
          hoistableState
        )), flushSubtree(request, destination, segment, hoistableState), destination.push("<!--/$-->");
      if (boundary.byteSize > request.progressiveChunkSize)
        return boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
          destination,
          request.renderState,
          boundary.rootSegmentID
        ), flushSubtree(request, destination, segment, hoistableState), destination.push("<!--/$-->");
      hoistableState && (segment = boundary.contentState, segment.styles.forEach(hoistStyleQueueDependency, hoistableState), segment.stylesheets.forEach(hoistStylesheetDependency, hoistableState));
      request.renderState.generateStaticMarkup || destination.push("<!--$-->");
      segment = boundary.completedSegments;
      if (1 !== segment.length)
        throw Error(
          "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
        );
      flushSegment(request, destination, segment[0], hoistableState);
      request = request.renderState.generateStaticMarkup ? true : destination.push("<!--/$-->");
      return request;
    }
    function flushSegmentContainer(request, destination, segment, hoistableState) {
      writeStartSegment(
        destination,
        request.renderState,
        segment.parentFormatContext,
        segment.id
      );
      flushSegment(request, destination, segment, hoistableState);
      return writeEndSegment(destination, segment.parentFormatContext);
    }
    function flushCompletedBoundary(request, destination, boundary) {
      for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++)
        flushPartiallyCompletedSegment(
          request,
          destination,
          boundary,
          completedSegments[i]
        );
      completedSegments.length = 0;
      writeHoistablesForBoundary(
        destination,
        boundary.contentState,
        request.renderState
      );
      completedSegments = request.resumableState;
      request = request.renderState;
      i = boundary.rootSegmentID;
      boundary = boundary.contentState;
      var requiresStyleInsertion = request.stylesToHoist;
      request.stylesToHoist = false;
      destination.push(request.startInlineScript);
      requiresStyleInsertion ? 0 === (completedSegments.instructions & 2) ? (completedSegments.instructions |= 10, destination.push(
        '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
      )) : 0 === (completedSegments.instructions & 8) ? (completedSegments.instructions |= 8, destination.push(
        '$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
      )) : destination.push('$RR("') : 0 === (completedSegments.instructions & 2) ? (completedSegments.instructions |= 2, destination.push(
        '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("'
      )) : destination.push('$RC("');
      completedSegments = i.toString(16);
      destination.push(request.boundaryPrefix);
      destination.push(completedSegments);
      destination.push('","');
      destination.push(request.segmentPrefix);
      destination.push(completedSegments);
      requiresStyleInsertion ? (destination.push('",'), writeStyleResourceDependenciesInJS(destination, boundary)) : destination.push('"');
      boundary = destination.push(")</script>");
      return writeBootstrap(destination, request) && boundary;
    }
    function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
      if (2 === segment.status) return true;
      var hoistableState = boundary.contentState, segmentID = segment.id;
      if (-1 === segmentID) {
        if (-1 === (segment.id = boundary.rootSegmentID))
          throw Error(
            "A root segment ID must have been assigned by now. This is a bug in React."
          );
        return flushSegmentContainer(request, destination, segment, hoistableState);
      }
      if (segmentID === boundary.rootSegmentID)
        return flushSegmentContainer(request, destination, segment, hoistableState);
      flushSegmentContainer(request, destination, segment, hoistableState);
      boundary = request.resumableState;
      request = request.renderState;
      destination.push(request.startInlineScript);
      0 === (boundary.instructions & 1) ? (boundary.instructions |= 1, destination.push(
        '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
      )) : destination.push('$RS("');
      destination.push(request.segmentPrefix);
      segmentID = segmentID.toString(16);
      destination.push(segmentID);
      destination.push('","');
      destination.push(request.placeholderPrefix);
      destination.push(segmentID);
      destination = destination.push('")</script>');
      return destination;
    }
    function flushCompletedQueues(request, destination) {
      try {
        if (!(0 < request.pendingRootTasks)) {
          var i, completedRootSegment = request.completedRootSegment;
          if (null !== completedRootSegment) {
            if (5 === completedRootSegment.status) return;
            var renderState = request.renderState, htmlChunks = renderState.htmlChunks, headChunks = renderState.headChunks, i$jscomp$0;
            if (htmlChunks) {
              for (i$jscomp$0 = 0; i$jscomp$0 < htmlChunks.length; i$jscomp$0++)
                destination.push(htmlChunks[i$jscomp$0]);
              if (headChunks)
                for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
                  destination.push(headChunks[i$jscomp$0]);
              else {
                var chunk = startChunkForTag("head");
                destination.push(chunk);
                destination.push(">");
              }
            } else if (headChunks)
              for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
                destination.push(headChunks[i$jscomp$0]);
            var charsetChunks = renderState.charsetChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < charsetChunks.length; i$jscomp$0++)
              destination.push(charsetChunks[i$jscomp$0]);
            charsetChunks.length = 0;
            renderState.preconnects.forEach(flushResource, destination);
            renderState.preconnects.clear();
            var viewportChunks = renderState.viewportChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < viewportChunks.length; i$jscomp$0++)
              destination.push(viewportChunks[i$jscomp$0]);
            viewportChunks.length = 0;
            renderState.fontPreloads.forEach(flushResource, destination);
            renderState.fontPreloads.clear();
            renderState.highImagePreloads.forEach(flushResource, destination);
            renderState.highImagePreloads.clear();
            renderState.styles.forEach(flushStylesInPreamble, destination);
            var importMapChunks = renderState.importMapChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < importMapChunks.length; i$jscomp$0++)
              destination.push(importMapChunks[i$jscomp$0]);
            importMapChunks.length = 0;
            renderState.bootstrapScripts.forEach(flushResource, destination);
            renderState.scripts.forEach(flushResource, destination);
            renderState.scripts.clear();
            renderState.bulkPreloads.forEach(flushResource, destination);
            renderState.bulkPreloads.clear();
            var hoistableChunks = renderState.hoistableChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < hoistableChunks.length; i$jscomp$0++)
              destination.push(hoistableChunks[i$jscomp$0]);
            hoistableChunks.length = 0;
            if (htmlChunks && null === headChunks) {
              var chunk$jscomp$0 = endChunkForTag("head");
              destination.push(chunk$jscomp$0);
            }
            flushSegment(request, destination, completedRootSegment, null);
            request.completedRootSegment = null;
            writeBootstrap(destination, request.renderState);
          }
          var renderState$jscomp$0 = request.renderState;
          completedRootSegment = 0;
          var viewportChunks$jscomp$0 = renderState$jscomp$0.viewportChunks;
          for (completedRootSegment = 0; completedRootSegment < viewportChunks$jscomp$0.length; completedRootSegment++)
            destination.push(viewportChunks$jscomp$0[completedRootSegment]);
          viewportChunks$jscomp$0.length = 0;
          renderState$jscomp$0.preconnects.forEach(flushResource, destination);
          renderState$jscomp$0.preconnects.clear();
          renderState$jscomp$0.fontPreloads.forEach(flushResource, destination);
          renderState$jscomp$0.fontPreloads.clear();
          renderState$jscomp$0.highImagePreloads.forEach(
            flushResource,
            destination
          );
          renderState$jscomp$0.highImagePreloads.clear();
          renderState$jscomp$0.styles.forEach(preloadLateStyles, destination);
          renderState$jscomp$0.scripts.forEach(flushResource, destination);
          renderState$jscomp$0.scripts.clear();
          renderState$jscomp$0.bulkPreloads.forEach(flushResource, destination);
          renderState$jscomp$0.bulkPreloads.clear();
          var hoistableChunks$jscomp$0 = renderState$jscomp$0.hoistableChunks;
          for (completedRootSegment = 0; completedRootSegment < hoistableChunks$jscomp$0.length; completedRootSegment++)
            destination.push(hoistableChunks$jscomp$0[completedRootSegment]);
          hoistableChunks$jscomp$0.length = 0;
          var clientRenderedBoundaries = request.clientRenderedBoundaries;
          for (i = 0; i < clientRenderedBoundaries.length; i++) {
            var boundary = clientRenderedBoundaries[i];
            renderState$jscomp$0 = destination;
            var resumableState = request.resumableState, renderState$jscomp$1 = request.renderState, id3 = boundary.rootSegmentID, errorDigest = boundary.errorDigest;
            renderState$jscomp$0.push(renderState$jscomp$1.startInlineScript);
            0 === (resumableState.instructions & 4) ? (resumableState.instructions |= 4, renderState$jscomp$0.push(
              '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
            )) : renderState$jscomp$0.push('$RX("');
            renderState$jscomp$0.push(renderState$jscomp$1.boundaryPrefix);
            var chunk$jscomp$1 = id3.toString(16);
            renderState$jscomp$0.push(chunk$jscomp$1);
            renderState$jscomp$0.push('"');
            if (errorDigest) {
              renderState$jscomp$0.push(",");
              var chunk$jscomp$2 = escapeJSStringsForInstructionScripts(
                errorDigest || ""
              );
              renderState$jscomp$0.push(chunk$jscomp$2);
            }
            var JSCompiler_inline_result = renderState$jscomp$0.push(")</script>");
            if (!JSCompiler_inline_result) {
              request.destination = null;
              i++;
              clientRenderedBoundaries.splice(0, i);
              return;
            }
          }
          clientRenderedBoundaries.splice(0, i);
          var completedBoundaries = request.completedBoundaries;
          for (i = 0; i < completedBoundaries.length; i++)
            if (!flushCompletedBoundary(request, destination, completedBoundaries[i])) {
              request.destination = null;
              i++;
              completedBoundaries.splice(0, i);
              return;
            }
          completedBoundaries.splice(0, i);
          var partialBoundaries = request.partialBoundaries;
          for (i = 0; i < partialBoundaries.length; i++) {
            var boundary$51 = partialBoundaries[i];
            a: {
              clientRenderedBoundaries = request;
              boundary = destination;
              var completedSegments = boundary$51.completedSegments;
              for (JSCompiler_inline_result = 0; JSCompiler_inline_result < completedSegments.length; JSCompiler_inline_result++)
                if (!flushPartiallyCompletedSegment(
                  clientRenderedBoundaries,
                  boundary,
                  boundary$51,
                  completedSegments[JSCompiler_inline_result]
                )) {
                  JSCompiler_inline_result++;
                  completedSegments.splice(0, JSCompiler_inline_result);
                  var JSCompiler_inline_result$jscomp$0 = false;
                  break a;
                }
              completedSegments.splice(0, JSCompiler_inline_result);
              JSCompiler_inline_result$jscomp$0 = writeHoistablesForBoundary(
                boundary,
                boundary$51.contentState,
                clientRenderedBoundaries.renderState
              );
            }
            if (!JSCompiler_inline_result$jscomp$0) {
              request.destination = null;
              i++;
              partialBoundaries.splice(0, i);
              return;
            }
          }
          partialBoundaries.splice(0, i);
          var largeBoundaries = request.completedBoundaries;
          for (i = 0; i < largeBoundaries.length; i++)
            if (!flushCompletedBoundary(request, destination, largeBoundaries[i])) {
              request.destination = null;
              i++;
              largeBoundaries.splice(0, i);
              return;
            }
          largeBoundaries.splice(0, i);
        }
      } finally {
        0 === request.allPendingTasks && 0 === request.pingedTasks.length && 0 === request.clientRenderedBoundaries.length && 0 === request.completedBoundaries.length && (request.flushScheduled = false, i = request.resumableState, i.hasBody && (partialBoundaries = endChunkForTag("body"), destination.push(partialBoundaries)), i.hasHtml && (i = endChunkForTag("html"), destination.push(i)), request.status = 14, destination.push(null), request.destination = null);
      }
    }
    function enqueueFlush(request) {
      if (false === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination) {
        request.flushScheduled = true;
        var destination = request.destination;
        destination ? flushCompletedQueues(request, destination) : request.flushScheduled = false;
      }
    }
    function startFlowing(request, destination) {
      if (13 === request.status)
        request.status = 14, destination.destroy(request.fatalError);
      else if (14 !== request.status && null === request.destination) {
        request.destination = destination;
        try {
          flushCompletedQueues(request, destination);
        } catch (error) {
          logRecoverableError(request, error, {}), fatalError(request, error);
        }
      }
    }
    function abort(request, reason) {
      if (11 === request.status || 10 === request.status) request.status = 12;
      try {
        var abortableTasks = request.abortableTasks;
        if (0 < abortableTasks.size) {
          var error = void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason;
          request.fatalError = error;
          abortableTasks.forEach(function(task) {
            return abortTask(task, request, error);
          });
          abortableTasks.clear();
        }
        null !== request.destination && flushCompletedQueues(request, request.destination);
      } catch (error$53) {
        logRecoverableError(request, error$53, {}), fatalError(request, error$53);
      }
    }
    function onError() {
    }
    function renderToStringImpl(children, options, generateStaticMarkup, abortReason) {
      var didFatal = false, fatalError2 = null, result = "", readyToStream = false;
      options = createResumableState(options ? options.identifierPrefix : void 0);
      children = createRequest(
        children,
        options,
        createRenderState(options, generateStaticMarkup),
        createFormatContext(0, null, 0),
        Infinity,
        onError,
        void 0,
        function() {
          readyToStream = true;
        },
        void 0,
        void 0,
        void 0
      );
      children.flushScheduled = null !== children.destination;
      performWork(children);
      10 === children.status && (children.status = 11);
      null === children.trackedPostpones && safelyEmitEarlyPreloads(children, 0 === children.pendingRootTasks);
      abort(children, abortReason);
      startFlowing(children, {
        push: function(chunk) {
          null !== chunk && (result += chunk);
          return true;
        },
        destroy: function(error) {
          didFatal = true;
          fatalError2 = error;
        }
      });
      if (didFatal && fatalError2 !== abortReason) throw fatalError2;
      if (!readyToStream)
        throw Error(
          "A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition."
        );
      return result;
    }
    exports.renderToStaticMarkup = function(children, options) {
      return renderToStringImpl(
        children,
        options,
        true,
        'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server'
      );
    };
    exports.renderToString = function(children, options) {
      return renderToStringImpl(
        children,
        options,
        false,
        'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server'
      );
    };
    exports.version = "19.0.0";
  }
});

// ../../../node_modules/react-dom/cjs/react-dom-server.node.production.js
var require_react_dom_server_node_production = __commonJS({
  "../../../node_modules/react-dom/cjs/react-dom-server.node.production.js"(exports) {
    "use strict";
    var util = __require("util");
    var crypto = __require("crypto");
    var async_hooks = __require("async_hooks");
    var React3 = require_react();
    var ReactDOM = require_react_dom();
    var stream = __require("stream");
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
    var REACT_PROVIDER_TYPE = /* @__PURE__ */ Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
    var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
    var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    var REACT_SCOPE_TYPE = /* @__PURE__ */ Symbol.for("react.scope");
    var REACT_DEBUG_TRACING_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.debug_trace_mode");
    var REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for("react.offscreen");
    var REACT_LEGACY_HIDDEN_TYPE = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
    var REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    var isArrayImpl = Array.isArray;
    var scheduleMicrotask = queueMicrotask;
    function flushBuffered(destination) {
      "function" === typeof destination.flush && destination.flush();
    }
    var currentView = null;
    var writtenBytes = 0;
    var destinationHasCapacity$1 = true;
    function writeChunk(destination, chunk) {
      if ("string" === typeof chunk) {
        if (0 !== chunk.length)
          if (2048 < 3 * chunk.length)
            0 < writtenBytes && (writeToDestination(
              destination,
              currentView.subarray(0, writtenBytes)
            ), currentView = new Uint8Array(2048), writtenBytes = 0), writeToDestination(destination, chunk);
          else {
            var target = currentView;
            0 < writtenBytes && (target = currentView.subarray(writtenBytes));
            target = textEncoder.encodeInto(chunk, target);
            var read = target.read;
            writtenBytes += target.written;
            read < chunk.length && (writeToDestination(
              destination,
              currentView.subarray(0, writtenBytes)
            ), currentView = new Uint8Array(2048), writtenBytes = textEncoder.encodeInto(
              chunk.slice(read),
              currentView
            ).written);
            2048 === writtenBytes && (writeToDestination(destination, currentView), currentView = new Uint8Array(2048), writtenBytes = 0);
          }
      } else
        0 !== chunk.byteLength && (2048 < chunk.byteLength ? (0 < writtenBytes && (writeToDestination(
          destination,
          currentView.subarray(0, writtenBytes)
        ), currentView = new Uint8Array(2048), writtenBytes = 0), writeToDestination(destination, chunk)) : (target = currentView.length - writtenBytes, target < chunk.byteLength && (0 === target ? writeToDestination(destination, currentView) : (currentView.set(chunk.subarray(0, target), writtenBytes), writtenBytes += target, writeToDestination(destination, currentView), chunk = chunk.subarray(target)), currentView = new Uint8Array(2048), writtenBytes = 0), currentView.set(chunk, writtenBytes), writtenBytes += chunk.byteLength, 2048 === writtenBytes && (writeToDestination(destination, currentView), currentView = new Uint8Array(2048), writtenBytes = 0)));
    }
    function writeToDestination(destination, view2) {
      destination = destination.write(view2);
      destinationHasCapacity$1 = destinationHasCapacity$1 && destination;
    }
    function writeChunkAndReturn(destination, chunk) {
      writeChunk(destination, chunk);
      return destinationHasCapacity$1;
    }
    function completeWriting(destination) {
      currentView && 0 < writtenBytes && destination.write(currentView.subarray(0, writtenBytes));
      currentView = null;
      writtenBytes = 0;
      destinationHasCapacity$1 = true;
    }
    var textEncoder = new util.TextEncoder();
    function stringToPrecomputedChunk(content) {
      return textEncoder.encode(content);
    }
    var assign = Object.assign;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    );
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return true;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return validatedAttributeNameCache[attributeName] = true;
      illegalAttributeNameCache[attributeName] = true;
      return false;
    }
    var unitlessNumbers = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    var aliases = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]);
    var matchHtmlRegExp = /["'&<>]/;
    function escapeTextForBrowser(text) {
      if ("boolean" === typeof text || "number" === typeof text || "bigint" === typeof text)
        return "" + text;
      text = "" + text;
      var match = matchHtmlRegExp.exec(text);
      if (match) {
        var html = "", index, lastIndex = 0;
        for (index = match.index; index < text.length; index++) {
          switch (text.charCodeAt(index)) {
            case 34:
              match = "&quot;";
              break;
            case 38:
              match = "&amp;";
              break;
            case 39:
              match = "&#x27;";
              break;
            case 60:
              match = "&lt;";
              break;
            case 62:
              match = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += text.slice(lastIndex, index));
          lastIndex = index + 1;
          html += match;
        }
        text = lastIndex !== index ? html + text.slice(lastIndex, index) : html;
      }
      return text;
    }
    var uppercasePattern = /([A-Z])/g;
    var msPattern = /^ms-/;
    var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function sanitizeURL(url) {
      return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
    }
    var ReactSharedInternals = React3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var sharedNotPendingObject = {
      pending: false,
      data: null,
      method: null,
      action: null
    };
    var previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
      f: previousDispatcher.f,
      r: previousDispatcher.r,
      D: prefetchDNS,
      C: preconnect,
      L: preload,
      m: preloadModule,
      X: preinitScript,
      S: preinitStyle,
      M: preinitModuleScript
    };
    var PRELOAD_NO_CREDS = [];
    stringToPrecomputedChunk('"></template>');
    var startInlineScript = stringToPrecomputedChunk("<script>");
    var endInlineScript = stringToPrecomputedChunk("</script>");
    var startScriptSrc = stringToPrecomputedChunk('<script src="');
    var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
    var scriptNonce = stringToPrecomputedChunk('" nonce="');
    var scriptIntegirty = stringToPrecomputedChunk('" integrity="');
    var scriptCrossOrigin = stringToPrecomputedChunk('" crossorigin="');
    var endAsyncScript = stringToPrecomputedChunk('" async=""></script>');
    var scriptRegex = /(<\/|<)(s)(cript)/gi;
    function scriptReplacer(match, prefix2, s, suffix2) {
      return "" + prefix2 + ("s" === s ? "\\u0073" : "\\u0053") + suffix2;
    }
    var importMapScriptStart = stringToPrecomputedChunk(
      '<script type="importmap">'
    );
    var importMapScriptEnd = stringToPrecomputedChunk("</script>");
    function createRenderState(resumableState, nonce, externalRuntimeConfig, importMap, onHeaders, maxHeadersLength) {
      var inlineScriptWithNonce = void 0 === nonce ? startInlineScript : stringToPrecomputedChunk(
        '<script nonce="' + escapeTextForBrowser(nonce) + '">'
      ), idPrefix = resumableState.idPrefix;
      externalRuntimeConfig = [];
      var bootstrapScriptContent = resumableState.bootstrapScriptContent, bootstrapScripts = resumableState.bootstrapScripts, bootstrapModules = resumableState.bootstrapModules;
      void 0 !== bootstrapScriptContent && externalRuntimeConfig.push(
        inlineScriptWithNonce,
        ("" + bootstrapScriptContent).replace(scriptRegex, scriptReplacer),
        endInlineScript
      );
      bootstrapScriptContent = [];
      void 0 !== importMap && (bootstrapScriptContent.push(importMapScriptStart), bootstrapScriptContent.push(
        ("" + JSON.stringify(importMap)).replace(scriptRegex, scriptReplacer)
      ), bootstrapScriptContent.push(importMapScriptEnd));
      importMap = onHeaders ? {
        preconnects: "",
        fontPreloads: "",
        highImagePreloads: "",
        remainingCapacity: 2 + ("number" === typeof maxHeadersLength ? maxHeadersLength : 2e3)
      } : null;
      onHeaders = {
        placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
        segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
        boundaryPrefix: stringToPrecomputedChunk(idPrefix + "B:"),
        startInlineScript: inlineScriptWithNonce,
        htmlChunks: null,
        headChunks: null,
        externalRuntimeScript: null,
        bootstrapChunks: externalRuntimeConfig,
        importMapChunks: bootstrapScriptContent,
        onHeaders,
        headers: importMap,
        resets: {
          font: {},
          dns: {},
          connect: { default: {}, anonymous: {}, credentials: {} },
          image: {},
          style: {}
        },
        charsetChunks: [],
        viewportChunks: [],
        hoistableChunks: [],
        preconnects: /* @__PURE__ */ new Set(),
        fontPreloads: /* @__PURE__ */ new Set(),
        highImagePreloads: /* @__PURE__ */ new Set(),
        styles: /* @__PURE__ */ new Map(),
        bootstrapScripts: /* @__PURE__ */ new Set(),
        scripts: /* @__PURE__ */ new Set(),
        bulkPreloads: /* @__PURE__ */ new Set(),
        preloads: {
          images: /* @__PURE__ */ new Map(),
          stylesheets: /* @__PURE__ */ new Map(),
          scripts: /* @__PURE__ */ new Map(),
          moduleScripts: /* @__PURE__ */ new Map()
        },
        nonce,
        hoistableState: null,
        stylesToHoist: false
      };
      if (void 0 !== bootstrapScripts)
        for (importMap = 0; importMap < bootstrapScripts.length; importMap++) {
          var scriptConfig = bootstrapScripts[importMap];
          idPrefix = inlineScriptWithNonce = void 0;
          bootstrapScriptContent = {
            rel: "preload",
            as: "script",
            fetchPriority: "low",
            nonce
          };
          "string" === typeof scriptConfig ? bootstrapScriptContent.href = maxHeadersLength = scriptConfig : (bootstrapScriptContent.href = maxHeadersLength = scriptConfig.src, bootstrapScriptContent.integrity = idPrefix = "string" === typeof scriptConfig.integrity ? scriptConfig.integrity : void 0, bootstrapScriptContent.crossOrigin = inlineScriptWithNonce = "string" === typeof scriptConfig || null == scriptConfig.crossOrigin ? void 0 : "use-credentials" === scriptConfig.crossOrigin ? "use-credentials" : "");
          scriptConfig = resumableState;
          var href = maxHeadersLength;
          scriptConfig.scriptResources[href] = null;
          scriptConfig.moduleScriptResources[href] = null;
          scriptConfig = [];
          pushLinkImpl(scriptConfig, bootstrapScriptContent);
          onHeaders.bootstrapScripts.add(scriptConfig);
          externalRuntimeConfig.push(
            startScriptSrc,
            escapeTextForBrowser(maxHeadersLength)
          );
          nonce && externalRuntimeConfig.push(scriptNonce, escapeTextForBrowser(nonce));
          "string" === typeof idPrefix && externalRuntimeConfig.push(
            scriptIntegirty,
            escapeTextForBrowser(idPrefix)
          );
          "string" === typeof inlineScriptWithNonce && externalRuntimeConfig.push(
            scriptCrossOrigin,
            escapeTextForBrowser(inlineScriptWithNonce)
          );
          externalRuntimeConfig.push(endAsyncScript);
        }
      if (void 0 !== bootstrapModules)
        for (bootstrapScripts = 0; bootstrapScripts < bootstrapModules.length; bootstrapScripts++)
          bootstrapScriptContent = bootstrapModules[bootstrapScripts], inlineScriptWithNonce = maxHeadersLength = void 0, idPrefix = {
            rel: "modulepreload",
            fetchPriority: "low",
            nonce
          }, "string" === typeof bootstrapScriptContent ? idPrefix.href = importMap = bootstrapScriptContent : (idPrefix.href = importMap = bootstrapScriptContent.src, idPrefix.integrity = inlineScriptWithNonce = "string" === typeof bootstrapScriptContent.integrity ? bootstrapScriptContent.integrity : void 0, idPrefix.crossOrigin = maxHeadersLength = "string" === typeof bootstrapScriptContent || null == bootstrapScriptContent.crossOrigin ? void 0 : "use-credentials" === bootstrapScriptContent.crossOrigin ? "use-credentials" : ""), bootstrapScriptContent = resumableState, scriptConfig = importMap, bootstrapScriptContent.scriptResources[scriptConfig] = null, bootstrapScriptContent.moduleScriptResources[scriptConfig] = null, bootstrapScriptContent = [], pushLinkImpl(bootstrapScriptContent, idPrefix), onHeaders.bootstrapScripts.add(bootstrapScriptContent), externalRuntimeConfig.push(
            startModuleSrc,
            escapeTextForBrowser(importMap)
          ), nonce && externalRuntimeConfig.push(scriptNonce, escapeTextForBrowser(nonce)), "string" === typeof inlineScriptWithNonce && externalRuntimeConfig.push(
            scriptIntegirty,
            escapeTextForBrowser(inlineScriptWithNonce)
          ), "string" === typeof maxHeadersLength && externalRuntimeConfig.push(
            scriptCrossOrigin,
            escapeTextForBrowser(maxHeadersLength)
          ), externalRuntimeConfig.push(endAsyncScript);
      return onHeaders;
    }
    function createResumableState(identifierPrefix, externalRuntimeConfig, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
      return {
        idPrefix: void 0 === identifierPrefix ? "" : identifierPrefix,
        nextFormID: 0,
        streamingFormat: 0,
        bootstrapScriptContent,
        bootstrapScripts,
        bootstrapModules,
        instructions: 0,
        hasBody: false,
        hasHtml: false,
        unknownResources: {},
        dnsResources: {},
        connectResources: { default: {}, anonymous: {}, credentials: {} },
        imageResources: {},
        styleResources: {},
        scriptResources: {},
        moduleUnknownResources: {},
        moduleScriptResources: {}
      };
    }
    function createFormatContext(insertionMode, selectedValue, tagScope) {
      return {
        insertionMode,
        selectedValue,
        tagScope
      };
    }
    function createRootFormatContext(namespaceURI) {
      return createFormatContext(
        "http://www.w3.org/2000/svg" === namespaceURI ? 3 : "http://www.w3.org/1998/Math/MathML" === namespaceURI ? 4 : 0,
        null,
        0
      );
    }
    function getChildFormatContext(parentContext, type, props) {
      switch (type) {
        case "noscript":
          return createFormatContext(2, null, parentContext.tagScope | 1);
        case "select":
          return createFormatContext(
            2,
            null != props.value ? props.value : props.defaultValue,
            parentContext.tagScope
          );
        case "svg":
          return createFormatContext(3, null, parentContext.tagScope);
        case "picture":
          return createFormatContext(2, null, parentContext.tagScope | 2);
        case "math":
          return createFormatContext(4, null, parentContext.tagScope);
        case "foreignObject":
          return createFormatContext(2, null, parentContext.tagScope);
        case "table":
          return createFormatContext(5, null, parentContext.tagScope);
        case "thead":
        case "tbody":
        case "tfoot":
          return createFormatContext(6, null, parentContext.tagScope);
        case "colgroup":
          return createFormatContext(8, null, parentContext.tagScope);
        case "tr":
          return createFormatContext(7, null, parentContext.tagScope);
      }
      return 5 <= parentContext.insertionMode ? createFormatContext(2, null, parentContext.tagScope) : 0 === parentContext.insertionMode ? "html" === type ? createFormatContext(1, null, parentContext.tagScope) : createFormatContext(2, null, parentContext.tagScope) : 1 === parentContext.insertionMode ? createFormatContext(2, null, parentContext.tagScope) : parentContext;
    }
    var textSeparator = stringToPrecomputedChunk("<!-- -->");
    function pushTextInstance(target, text, renderState, textEmbedded) {
      if ("" === text) return textEmbedded;
      textEmbedded && target.push(textSeparator);
      target.push(escapeTextForBrowser(text));
      return true;
    }
    var styleNameCache = /* @__PURE__ */ new Map();
    var styleAttributeStart = stringToPrecomputedChunk(' style="');
    var styleAssign = stringToPrecomputedChunk(":");
    var styleSeparator = stringToPrecomputedChunk(";");
    function pushStyleAttribute(target, style) {
      if ("object" !== typeof style)
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      var isFirst = true, styleName;
      for (styleName in style)
        if (hasOwnProperty.call(style, styleName)) {
          var styleValue = style[styleName];
          if (null != styleValue && "boolean" !== typeof styleValue && "" !== styleValue) {
            if (0 === styleName.indexOf("--")) {
              var nameChunk = escapeTextForBrowser(styleName);
              styleValue = escapeTextForBrowser(("" + styleValue).trim());
            } else
              nameChunk = styleNameCache.get(styleName), void 0 === nameChunk && (nameChunk = stringToPrecomputedChunk(
                escapeTextForBrowser(
                  styleName.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-")
                )
              ), styleNameCache.set(styleName, nameChunk)), styleValue = "number" === typeof styleValue ? 0 === styleValue || unitlessNumbers.has(styleName) ? "" + styleValue : styleValue + "px" : escapeTextForBrowser(("" + styleValue).trim());
            isFirst ? (isFirst = false, target.push(
              styleAttributeStart,
              nameChunk,
              styleAssign,
              styleValue
            )) : target.push(styleSeparator, nameChunk, styleAssign, styleValue);
          }
        }
      isFirst || target.push(attributeEnd);
    }
    var attributeSeparator = stringToPrecomputedChunk(" ");
    var attributeAssign = stringToPrecomputedChunk('="');
    var attributeEnd = stringToPrecomputedChunk('"');
    var attributeEmptyString = stringToPrecomputedChunk('=""');
    function pushBooleanAttribute(target, name, value) {
      value && "function" !== typeof value && "symbol" !== typeof value && target.push(attributeSeparator, name, attributeEmptyString);
    }
    function pushStringAttribute(target, name, value) {
      "function" !== typeof value && "symbol" !== typeof value && "boolean" !== typeof value && target.push(
        attributeSeparator,
        name,
        attributeAssign,
        escapeTextForBrowser(value),
        attributeEnd
      );
    }
    var actionJavaScriptURL = stringToPrecomputedChunk(
      escapeTextForBrowser(
        "javascript:throw new Error('React form unexpectedly submitted.')"
      )
    );
    var startHiddenInputChunk = stringToPrecomputedChunk('<input type="hidden"');
    function pushAdditionalFormField(value, key) {
      this.push(startHiddenInputChunk);
      validateAdditionalFormField(value);
      pushStringAttribute(this, "name", key);
      pushStringAttribute(this, "value", value);
      this.push(endOfStartTagSelfClosing);
    }
    function validateAdditionalFormField(value) {
      if ("string" !== typeof value)
        throw Error(
          "File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration."
        );
    }
    function getCustomFormFields(resumableState, formAction) {
      if ("function" === typeof formAction.$$FORM_ACTION) {
        var id3 = resumableState.nextFormID++;
        resumableState = resumableState.idPrefix + id3;
        try {
          var customFields = formAction.$$FORM_ACTION(resumableState);
          if (customFields) {
            var formData = customFields.data;
            null != formData && formData.forEach(validateAdditionalFormField);
          }
          return customFields;
        } catch (x) {
          if ("object" === typeof x && null !== x && "function" === typeof x.then)
            throw x;
        }
      }
      return null;
    }
    function pushFormActionAttribute(target, resumableState, renderState, formAction, formEncType, formMethod, formTarget, name) {
      var formData = null;
      if ("function" === typeof formAction) {
        var customFields = getCustomFormFields(resumableState, formAction);
        null !== customFields ? (name = customFields.name, formAction = customFields.action || "", formEncType = customFields.encType, formMethod = customFields.method, formTarget = customFields.target, formData = customFields.data) : (target.push(
          attributeSeparator,
          "formAction",
          attributeAssign,
          actionJavaScriptURL,
          attributeEnd
        ), formTarget = formMethod = formEncType = formAction = name = null, injectFormReplayingRuntime(resumableState, renderState));
      }
      null != name && pushAttribute(target, "name", name);
      null != formAction && pushAttribute(target, "formAction", formAction);
      null != formEncType && pushAttribute(target, "formEncType", formEncType);
      null != formMethod && pushAttribute(target, "formMethod", formMethod);
      null != formTarget && pushAttribute(target, "formTarget", formTarget);
      return formData;
    }
    function pushAttribute(target, name, value) {
      switch (name) {
        case "className":
          pushStringAttribute(target, "class", value);
          break;
        case "tabIndex":
          pushStringAttribute(target, "tabindex", value);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          pushStringAttribute(target, name, value);
          break;
        case "style":
          pushStyleAttribute(target, value);
          break;
        case "src":
        case "href":
          if ("" === value) break;
        case "action":
        case "formAction":
          if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
            break;
          value = sanitizeURL("" + value);
          target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "ref":
          break;
        case "autoFocus":
        case "multiple":
        case "muted":
          pushBooleanAttribute(target, name.toLowerCase(), value);
          break;
        case "xlinkHref":
          if ("function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
            break;
          value = sanitizeURL("" + value);
          target.push(
            attributeSeparator,
            "xlink:href",
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          "function" !== typeof value && "symbol" !== typeof value && target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          value && "function" !== typeof value && "symbol" !== typeof value && target.push(attributeSeparator, name, attributeEmptyString);
          break;
        case "capture":
        case "download":
          true === value ? target.push(attributeSeparator, name, attributeEmptyString) : false !== value && "function" !== typeof value && "symbol" !== typeof value && target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value && target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "rowSpan":
        case "start":
          "function" === typeof value || "symbol" === typeof value || isNaN(value) || target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "xlinkActuate":
          pushStringAttribute(target, "xlink:actuate", value);
          break;
        case "xlinkArcrole":
          pushStringAttribute(target, "xlink:arcrole", value);
          break;
        case "xlinkRole":
          pushStringAttribute(target, "xlink:role", value);
          break;
        case "xlinkShow":
          pushStringAttribute(target, "xlink:show", value);
          break;
        case "xlinkTitle":
          pushStringAttribute(target, "xlink:title", value);
          break;
        case "xlinkType":
          pushStringAttribute(target, "xlink:type", value);
          break;
        case "xmlBase":
          pushStringAttribute(target, "xml:base", value);
          break;
        case "xmlLang":
          pushStringAttribute(target, "xml:lang", value);
          break;
        case "xmlSpace":
          pushStringAttribute(target, "xml:space", value);
          break;
        default:
          if (!(2 < name.length) || "o" !== name[0] && "O" !== name[0] || "n" !== name[1] && "N" !== name[1]) {
            if (name = aliases.get(name) || name, isAttributeNameSafe(name)) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean":
                  var prefix$8 = name.toLowerCase().slice(0, 5);
                  if ("data-" !== prefix$8 && "aria-" !== prefix$8) return;
              }
              target.push(
                attributeSeparator,
                name,
                attributeAssign,
                escapeTextForBrowser(value),
                attributeEnd
              );
            }
          }
      }
    }
    var endOfStartTag = stringToPrecomputedChunk(">");
    var endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
    function pushInnerHTML(target, innerHTML, children) {
      if (null != innerHTML) {
        if (null != children)
          throw Error(
            "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
          );
        if ("object" !== typeof innerHTML || !("__html" in innerHTML))
          throw Error(
            "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
          );
        innerHTML = innerHTML.__html;
        null !== innerHTML && void 0 !== innerHTML && target.push("" + innerHTML);
      }
    }
    function flattenOptionChildren(children) {
      var content = "";
      React3.Children.forEach(children, function(child) {
        null != child && (content += child);
      });
      return content;
    }
    var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
    var formReplayingRuntimeScript = stringToPrecomputedChunk(
      `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`
    );
    function injectFormReplayingRuntime(resumableState, renderState) {
      0 === (resumableState.instructions & 16) && (resumableState.instructions |= 16, renderState.bootstrapChunks.unshift(
        renderState.startInlineScript,
        formReplayingRuntimeScript,
        endInlineScript
      ));
    }
    var formStateMarkerIsMatching = stringToPrecomputedChunk("<!--F!-->");
    var formStateMarkerIsNotMatching = stringToPrecomputedChunk("<!--F-->");
    function pushLinkImpl(target, props) {
      target.push(startChunkForTag("link"));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTagSelfClosing);
      return null;
    }
    var styleRegex = /(<\/|<)(s)(tyle)/gi;
    function styleReplacer(match, prefix2, s, suffix2) {
      return "" + prefix2 + ("s" === s ? "\\73 " : "\\53 ") + suffix2;
    }
    function pushSelfClosing(target, props, tag) {
      target.push(startChunkForTag(tag));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTagSelfClosing);
      return null;
    }
    function pushTitleImpl(target, props) {
      target.push(startChunkForTag("title"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTag);
      props = Array.isArray(children) ? 2 > children.length ? children[0] : null : children;
      "function" !== typeof props && "symbol" !== typeof props && null !== props && void 0 !== props && target.push(escapeTextForBrowser("" + props));
      pushInnerHTML(target, innerHTML, children);
      target.push(endChunkForTag("title"));
      return null;
    }
    function pushScriptImpl(target, props) {
      target.push(startChunkForTag("script"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTag);
      pushInnerHTML(target, innerHTML, children);
      "string" === typeof children && target.push(("" + children).replace(scriptRegex, scriptReplacer));
      target.push(endChunkForTag("script"));
      return null;
    }
    function pushStartGenericElement(target, props, tag) {
      target.push(startChunkForTag(tag));
      var innerHTML = tag = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                tag = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTag);
      pushInnerHTML(target, innerHTML, tag);
      return "string" === typeof tag ? (target.push(escapeTextForBrowser(tag)), null) : tag;
    }
    var leadingNewline = stringToPrecomputedChunk("\n");
    var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var validatedTagCache = /* @__PURE__ */ new Map();
    function startChunkForTag(tag) {
      var tagStartChunk = validatedTagCache.get(tag);
      if (void 0 === tagStartChunk) {
        if (!VALID_TAG_REGEX.test(tag)) throw Error("Invalid tag: " + tag);
        tagStartChunk = stringToPrecomputedChunk("<" + tag);
        validatedTagCache.set(tag, tagStartChunk);
      }
      return tagStartChunk;
    }
    var doctypeChunk = stringToPrecomputedChunk("<!DOCTYPE html>");
    function pushStartInstance(target$jscomp$0, type, props, resumableState, renderState, hoistableState, formatContext, textEmbedded, isFallback) {
      switch (type) {
        case "div":
        case "span":
        case "svg":
        case "path":
          break;
        case "a":
          target$jscomp$0.push(startChunkForTag("a"));
          var children = null, innerHTML = null, propKey;
          for (propKey in props)
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (null != propValue)
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "href":
                    "" === propValue ? pushStringAttribute(target$jscomp$0, "href", "") : pushAttribute(target$jscomp$0, propKey, propValue);
                    break;
                  default:
                    pushAttribute(target$jscomp$0, propKey, propValue);
                }
            }
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML, children);
          if ("string" === typeof children) {
            target$jscomp$0.push(escapeTextForBrowser(children));
            var JSCompiler_inline_result = null;
          } else JSCompiler_inline_result = children;
          return JSCompiler_inline_result;
        case "g":
        case "p":
        case "li":
          break;
        case "select":
          target$jscomp$0.push(startChunkForTag("select"));
          var children$jscomp$0 = null, innerHTML$jscomp$0 = null, propKey$jscomp$0;
          for (propKey$jscomp$0 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$0)) {
              var propValue$jscomp$0 = props[propKey$jscomp$0];
              if (null != propValue$jscomp$0)
                switch (propKey$jscomp$0) {
                  case "children":
                    children$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$0,
                      propValue$jscomp$0
                    );
                }
            }
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$0, children$jscomp$0);
          return children$jscomp$0;
        case "option":
          var selectedValue = formatContext.selectedValue;
          target$jscomp$0.push(startChunkForTag("option"));
          var children$jscomp$1 = null, value = null, selected = null, innerHTML$jscomp$1 = null, propKey$jscomp$1;
          for (propKey$jscomp$1 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$1)) {
              var propValue$jscomp$1 = props[propKey$jscomp$1];
              if (null != propValue$jscomp$1)
                switch (propKey$jscomp$1) {
                  case "children":
                    children$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "selected":
                    selected = propValue$jscomp$1;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "value":
                    value = propValue$jscomp$1;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$1,
                      propValue$jscomp$1
                    );
                }
            }
          if (null != selectedValue) {
            var stringValue = null !== value ? "" + value : flattenOptionChildren(children$jscomp$1);
            if (isArrayImpl(selectedValue))
              for (var i = 0; i < selectedValue.length; i++) {
                if ("" + selectedValue[i] === stringValue) {
                  target$jscomp$0.push(selectedMarkerAttribute);
                  break;
                }
              }
            else
              "" + selectedValue === stringValue && target$jscomp$0.push(selectedMarkerAttribute);
          } else selected && target$jscomp$0.push(selectedMarkerAttribute);
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$1, children$jscomp$1);
          return children$jscomp$1;
        case "textarea":
          target$jscomp$0.push(startChunkForTag("textarea"));
          var value$jscomp$0 = null, defaultValue = null, children$jscomp$2 = null, propKey$jscomp$2;
          for (propKey$jscomp$2 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$2)) {
              var propValue$jscomp$2 = props[propKey$jscomp$2];
              if (null != propValue$jscomp$2)
                switch (propKey$jscomp$2) {
                  case "children":
                    children$jscomp$2 = propValue$jscomp$2;
                    break;
                  case "value":
                    value$jscomp$0 = propValue$jscomp$2;
                    break;
                  case "defaultValue":
                    defaultValue = propValue$jscomp$2;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$2,
                      propValue$jscomp$2
                    );
                }
            }
          null === value$jscomp$0 && null !== defaultValue && (value$jscomp$0 = defaultValue);
          target$jscomp$0.push(endOfStartTag);
          if (null != children$jscomp$2) {
            if (null != value$jscomp$0)
              throw Error(
                "If you supply `defaultValue` on a <textarea>, do not pass children."
              );
            if (isArrayImpl(children$jscomp$2)) {
              if (1 < children$jscomp$2.length)
                throw Error("<textarea> can only have at most one child.");
              value$jscomp$0 = "" + children$jscomp$2[0];
            }
            value$jscomp$0 = "" + children$jscomp$2;
          }
          "string" === typeof value$jscomp$0 && "\n" === value$jscomp$0[0] && target$jscomp$0.push(leadingNewline);
          null !== value$jscomp$0 && target$jscomp$0.push(escapeTextForBrowser("" + value$jscomp$0));
          return null;
        case "input":
          target$jscomp$0.push(startChunkForTag("input"));
          var name = null, formAction = null, formEncType = null, formMethod = null, formTarget = null, value$jscomp$1 = null, defaultValue$jscomp$0 = null, checked = null, defaultChecked = null, propKey$jscomp$3;
          for (propKey$jscomp$3 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$3)) {
              var propValue$jscomp$3 = props[propKey$jscomp$3];
              if (null != propValue$jscomp$3)
                switch (propKey$jscomp$3) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  case "name":
                    name = propValue$jscomp$3;
                    break;
                  case "formAction":
                    formAction = propValue$jscomp$3;
                    break;
                  case "formEncType":
                    formEncType = propValue$jscomp$3;
                    break;
                  case "formMethod":
                    formMethod = propValue$jscomp$3;
                    break;
                  case "formTarget":
                    formTarget = propValue$jscomp$3;
                    break;
                  case "defaultChecked":
                    defaultChecked = propValue$jscomp$3;
                    break;
                  case "defaultValue":
                    defaultValue$jscomp$0 = propValue$jscomp$3;
                    break;
                  case "checked":
                    checked = propValue$jscomp$3;
                    break;
                  case "value":
                    value$jscomp$1 = propValue$jscomp$3;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$3,
                      propValue$jscomp$3
                    );
                }
            }
          var formData = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction,
            formEncType,
            formMethod,
            formTarget,
            name
          );
          null !== checked ? pushBooleanAttribute(target$jscomp$0, "checked", checked) : null !== defaultChecked && pushBooleanAttribute(target$jscomp$0, "checked", defaultChecked);
          null !== value$jscomp$1 ? pushAttribute(target$jscomp$0, "value", value$jscomp$1) : null !== defaultValue$jscomp$0 && pushAttribute(target$jscomp$0, "value", defaultValue$jscomp$0);
          target$jscomp$0.push(endOfStartTagSelfClosing);
          null != formData && formData.forEach(pushAdditionalFormField, target$jscomp$0);
          return null;
        case "button":
          target$jscomp$0.push(startChunkForTag("button"));
          var children$jscomp$3 = null, innerHTML$jscomp$2 = null, name$jscomp$0 = null, formAction$jscomp$0 = null, formEncType$jscomp$0 = null, formMethod$jscomp$0 = null, formTarget$jscomp$0 = null, propKey$jscomp$4;
          for (propKey$jscomp$4 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$4)) {
              var propValue$jscomp$4 = props[propKey$jscomp$4];
              if (null != propValue$jscomp$4)
                switch (propKey$jscomp$4) {
                  case "children":
                    children$jscomp$3 = propValue$jscomp$4;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$2 = propValue$jscomp$4;
                    break;
                  case "name":
                    name$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formAction":
                    formAction$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formEncType":
                    formEncType$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formMethod":
                    formMethod$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formTarget":
                    formTarget$jscomp$0 = propValue$jscomp$4;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$4,
                      propValue$jscomp$4
                    );
                }
            }
          var formData$jscomp$0 = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction$jscomp$0,
            formEncType$jscomp$0,
            formMethod$jscomp$0,
            formTarget$jscomp$0,
            name$jscomp$0
          );
          target$jscomp$0.push(endOfStartTag);
          null != formData$jscomp$0 && formData$jscomp$0.forEach(pushAdditionalFormField, target$jscomp$0);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$2, children$jscomp$3);
          if ("string" === typeof children$jscomp$3) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$3));
            var JSCompiler_inline_result$jscomp$0 = null;
          } else JSCompiler_inline_result$jscomp$0 = children$jscomp$3;
          return JSCompiler_inline_result$jscomp$0;
        case "form":
          target$jscomp$0.push(startChunkForTag("form"));
          var children$jscomp$4 = null, innerHTML$jscomp$3 = null, formAction$jscomp$1 = null, formEncType$jscomp$1 = null, formMethod$jscomp$1 = null, formTarget$jscomp$1 = null, propKey$jscomp$5;
          for (propKey$jscomp$5 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$5)) {
              var propValue$jscomp$5 = props[propKey$jscomp$5];
              if (null != propValue$jscomp$5)
                switch (propKey$jscomp$5) {
                  case "children":
                    children$jscomp$4 = propValue$jscomp$5;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$3 = propValue$jscomp$5;
                    break;
                  case "action":
                    formAction$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "encType":
                    formEncType$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "method":
                    formMethod$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "target":
                    formTarget$jscomp$1 = propValue$jscomp$5;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$5,
                      propValue$jscomp$5
                    );
                }
            }
          var formData$jscomp$1 = null, formActionName = null;
          if ("function" === typeof formAction$jscomp$1) {
            var customFields = getCustomFormFields(
              resumableState,
              formAction$jscomp$1
            );
            null !== customFields ? (formAction$jscomp$1 = customFields.action || "", formEncType$jscomp$1 = customFields.encType, formMethod$jscomp$1 = customFields.method, formTarget$jscomp$1 = customFields.target, formData$jscomp$1 = customFields.data, formActionName = customFields.name) : (target$jscomp$0.push(
              attributeSeparator,
              "action",
              attributeAssign,
              actionJavaScriptURL,
              attributeEnd
            ), formTarget$jscomp$1 = formMethod$jscomp$1 = formEncType$jscomp$1 = formAction$jscomp$1 = null, injectFormReplayingRuntime(resumableState, renderState));
          }
          null != formAction$jscomp$1 && pushAttribute(target$jscomp$0, "action", formAction$jscomp$1);
          null != formEncType$jscomp$1 && pushAttribute(target$jscomp$0, "encType", formEncType$jscomp$1);
          null != formMethod$jscomp$1 && pushAttribute(target$jscomp$0, "method", formMethod$jscomp$1);
          null != formTarget$jscomp$1 && pushAttribute(target$jscomp$0, "target", formTarget$jscomp$1);
          target$jscomp$0.push(endOfStartTag);
          null !== formActionName && (target$jscomp$0.push(startHiddenInputChunk), pushStringAttribute(target$jscomp$0, "name", formActionName), target$jscomp$0.push(endOfStartTagSelfClosing), null != formData$jscomp$1 && formData$jscomp$1.forEach(pushAdditionalFormField, target$jscomp$0));
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$3, children$jscomp$4);
          if ("string" === typeof children$jscomp$4) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$4));
            var JSCompiler_inline_result$jscomp$1 = null;
          } else JSCompiler_inline_result$jscomp$1 = children$jscomp$4;
          return JSCompiler_inline_result$jscomp$1;
        case "menuitem":
          target$jscomp$0.push(startChunkForTag("menuitem"));
          for (var propKey$jscomp$6 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$6)) {
              var propValue$jscomp$6 = props[propKey$jscomp$6];
              if (null != propValue$jscomp$6)
                switch (propKey$jscomp$6) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "menuitems cannot have `children` nor `dangerouslySetInnerHTML`."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$6,
                      propValue$jscomp$6
                    );
                }
            }
          target$jscomp$0.push(endOfStartTag);
          return null;
        case "object":
          target$jscomp$0.push(startChunkForTag("object"));
          var children$jscomp$5 = null, innerHTML$jscomp$4 = null, propKey$jscomp$7;
          for (propKey$jscomp$7 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$7)) {
              var propValue$jscomp$7 = props[propKey$jscomp$7];
              if (null != propValue$jscomp$7)
                switch (propKey$jscomp$7) {
                  case "children":
                    children$jscomp$5 = propValue$jscomp$7;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$4 = propValue$jscomp$7;
                    break;
                  case "data":
                    var sanitizedValue = sanitizeURL("" + propValue$jscomp$7);
                    if ("" === sanitizedValue) break;
                    target$jscomp$0.push(
                      attributeSeparator,
                      "data",
                      attributeAssign,
                      escapeTextForBrowser(sanitizedValue),
                      attributeEnd
                    );
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$7,
                      propValue$jscomp$7
                    );
                }
            }
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$4, children$jscomp$5);
          if ("string" === typeof children$jscomp$5) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$5));
            var JSCompiler_inline_result$jscomp$2 = null;
          } else JSCompiler_inline_result$jscomp$2 = children$jscomp$5;
          return JSCompiler_inline_result$jscomp$2;
        case "title":
          if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$3 = pushTitleImpl(
              target$jscomp$0,
              props
            );
          else
            isFallback ? JSCompiler_inline_result$jscomp$3 = null : (pushTitleImpl(renderState.hoistableChunks, props), JSCompiler_inline_result$jscomp$3 = void 0);
          return JSCompiler_inline_result$jscomp$3;
        case "link":
          var rel = props.rel, href = props.href, precedence = props.precedence;
          if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp || "string" !== typeof rel || "string" !== typeof href || "" === href) {
            pushLinkImpl(target$jscomp$0, props);
            var JSCompiler_inline_result$jscomp$4 = null;
          } else if ("stylesheet" === props.rel)
            if ("string" !== typeof precedence || null != props.disabled || props.onLoad || props.onError)
              JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
                target$jscomp$0,
                props
              );
            else {
              var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
              if (null !== resourceState) {
                resumableState.styleResources[href] = null;
                styleQueue || (styleQueue = {
                  precedence: escapeTextForBrowser(precedence),
                  rules: [],
                  hrefs: [],
                  sheets: /* @__PURE__ */ new Map()
                }, renderState.styles.set(precedence, styleQueue));
                var resource = {
                  state: 0,
                  props: assign({}, props, {
                    "data-precedence": props.precedence,
                    precedence: null
                  })
                };
                if (resourceState) {
                  2 === resourceState.length && adoptPreloadCredentials(resource.props, resourceState);
                  var preloadResource = renderState.preloads.stylesheets.get(href);
                  preloadResource && 0 < preloadResource.length ? preloadResource.length = 0 : resource.state = 1;
                }
                styleQueue.sheets.set(href, resource);
                hoistableState && hoistableState.stylesheets.add(resource);
              } else if (styleQueue) {
                var resource$9 = styleQueue.sheets.get(href);
                resource$9 && hoistableState && hoistableState.stylesheets.add(resource$9);
              }
              textEmbedded && target$jscomp$0.push(textSeparator);
              JSCompiler_inline_result$jscomp$4 = null;
            }
          else
            props.onLoad || props.onError ? JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
              target$jscomp$0,
              props
            ) : (textEmbedded && target$jscomp$0.push(textSeparator), JSCompiler_inline_result$jscomp$4 = isFallback ? null : pushLinkImpl(renderState.hoistableChunks, props));
          return JSCompiler_inline_result$jscomp$4;
        case "script":
          var asyncProp = props.async;
          if ("string" !== typeof props.src || !props.src || !asyncProp || "function" === typeof asyncProp || "symbol" === typeof asyncProp || props.onLoad || props.onError || 3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$5 = pushScriptImpl(
              target$jscomp$0,
              props
            );
          else {
            var key = props.src;
            if ("module" === props.type) {
              var resources = resumableState.moduleScriptResources;
              var preloads = renderState.preloads.moduleScripts;
            } else
              resources = resumableState.scriptResources, preloads = renderState.preloads.scripts;
            var resourceState$jscomp$0 = resources.hasOwnProperty(key) ? resources[key] : void 0;
            if (null !== resourceState$jscomp$0) {
              resources[key] = null;
              var scriptProps = props;
              if (resourceState$jscomp$0) {
                2 === resourceState$jscomp$0.length && (scriptProps = assign({}, props), adoptPreloadCredentials(scriptProps, resourceState$jscomp$0));
                var preloadResource$jscomp$0 = preloads.get(key);
                preloadResource$jscomp$0 && (preloadResource$jscomp$0.length = 0);
              }
              var resource$jscomp$0 = [];
              renderState.scripts.add(resource$jscomp$0);
              pushScriptImpl(resource$jscomp$0, scriptProps);
            }
            textEmbedded && target$jscomp$0.push(textSeparator);
            JSCompiler_inline_result$jscomp$5 = null;
          }
          return JSCompiler_inline_result$jscomp$5;
        case "style":
          var precedence$jscomp$0 = props.precedence, href$jscomp$0 = props.href;
          if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp || "string" !== typeof precedence$jscomp$0 || "string" !== typeof href$jscomp$0 || "" === href$jscomp$0) {
            target$jscomp$0.push(startChunkForTag("style"));
            var children$jscomp$6 = null, innerHTML$jscomp$5 = null, propKey$jscomp$8;
            for (propKey$jscomp$8 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$8)) {
                var propValue$jscomp$8 = props[propKey$jscomp$8];
                if (null != propValue$jscomp$8)
                  switch (propKey$jscomp$8) {
                    case "children":
                      children$jscomp$6 = propValue$jscomp$8;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$5 = propValue$jscomp$8;
                      break;
                    default:
                      pushAttribute(
                        target$jscomp$0,
                        propKey$jscomp$8,
                        propValue$jscomp$8
                      );
                  }
              }
            target$jscomp$0.push(endOfStartTag);
            var child = Array.isArray(children$jscomp$6) ? 2 > children$jscomp$6.length ? children$jscomp$6[0] : null : children$jscomp$6;
            "function" !== typeof child && "symbol" !== typeof child && null !== child && void 0 !== child && target$jscomp$0.push(("" + child).replace(styleRegex, styleReplacer));
            pushInnerHTML(target$jscomp$0, innerHTML$jscomp$5, children$jscomp$6);
            target$jscomp$0.push(endChunkForTag("style"));
            var JSCompiler_inline_result$jscomp$6 = null;
          } else {
            var styleQueue$jscomp$0 = renderState.styles.get(precedence$jscomp$0);
            if (null !== (resumableState.styleResources.hasOwnProperty(href$jscomp$0) ? resumableState.styleResources[href$jscomp$0] : void 0)) {
              resumableState.styleResources[href$jscomp$0] = null;
              styleQueue$jscomp$0 ? styleQueue$jscomp$0.hrefs.push(
                escapeTextForBrowser(href$jscomp$0)
              ) : (styleQueue$jscomp$0 = {
                precedence: escapeTextForBrowser(precedence$jscomp$0),
                rules: [],
                hrefs: [escapeTextForBrowser(href$jscomp$0)],
                sheets: /* @__PURE__ */ new Map()
              }, renderState.styles.set(precedence$jscomp$0, styleQueue$jscomp$0));
              var target = styleQueue$jscomp$0.rules, children$jscomp$7 = null, innerHTML$jscomp$6 = null, propKey$jscomp$9;
              for (propKey$jscomp$9 in props)
                if (hasOwnProperty.call(props, propKey$jscomp$9)) {
                  var propValue$jscomp$9 = props[propKey$jscomp$9];
                  if (null != propValue$jscomp$9)
                    switch (propKey$jscomp$9) {
                      case "children":
                        children$jscomp$7 = propValue$jscomp$9;
                        break;
                      case "dangerouslySetInnerHTML":
                        innerHTML$jscomp$6 = propValue$jscomp$9;
                    }
                }
              var child$jscomp$0 = Array.isArray(children$jscomp$7) ? 2 > children$jscomp$7.length ? children$jscomp$7[0] : null : children$jscomp$7;
              "function" !== typeof child$jscomp$0 && "symbol" !== typeof child$jscomp$0 && null !== child$jscomp$0 && void 0 !== child$jscomp$0 && target.push(
                ("" + child$jscomp$0).replace(styleRegex, styleReplacer)
              );
              pushInnerHTML(target, innerHTML$jscomp$6, children$jscomp$7);
            }
            styleQueue$jscomp$0 && hoistableState && hoistableState.styles.add(styleQueue$jscomp$0);
            textEmbedded && target$jscomp$0.push(textSeparator);
            JSCompiler_inline_result$jscomp$6 = void 0;
          }
          return JSCompiler_inline_result$jscomp$6;
        case "meta":
          if (3 === formatContext.insertionMode || formatContext.tagScope & 1 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$7 = pushSelfClosing(
              target$jscomp$0,
              props,
              "meta"
            );
          else
            textEmbedded && target$jscomp$0.push(textSeparator), JSCompiler_inline_result$jscomp$7 = isFallback ? null : "string" === typeof props.charSet ? pushSelfClosing(renderState.charsetChunks, props, "meta") : "viewport" === props.name ? pushSelfClosing(renderState.viewportChunks, props, "meta") : pushSelfClosing(renderState.hoistableChunks, props, "meta");
          return JSCompiler_inline_result$jscomp$7;
        case "listing":
        case "pre":
          target$jscomp$0.push(startChunkForTag(type));
          var children$jscomp$8 = null, innerHTML$jscomp$7 = null, propKey$jscomp$10;
          for (propKey$jscomp$10 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$10)) {
              var propValue$jscomp$10 = props[propKey$jscomp$10];
              if (null != propValue$jscomp$10)
                switch (propKey$jscomp$10) {
                  case "children":
                    children$jscomp$8 = propValue$jscomp$10;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$7 = propValue$jscomp$10;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$10,
                      propValue$jscomp$10
                    );
                }
            }
          target$jscomp$0.push(endOfStartTag);
          if (null != innerHTML$jscomp$7) {
            if (null != children$jscomp$8)
              throw Error(
                "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
              );
            if ("object" !== typeof innerHTML$jscomp$7 || !("__html" in innerHTML$jscomp$7))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            var html = innerHTML$jscomp$7.__html;
            null !== html && void 0 !== html && ("string" === typeof html && 0 < html.length && "\n" === html[0] ? target$jscomp$0.push(leadingNewline, html) : target$jscomp$0.push("" + html));
          }
          "string" === typeof children$jscomp$8 && "\n" === children$jscomp$8[0] && target$jscomp$0.push(leadingNewline);
          return children$jscomp$8;
        case "img":
          var src = props.src, srcSet = props.srcSet;
          if (!("lazy" === props.loading || !src && !srcSet || "string" !== typeof src && null != src || "string" !== typeof srcSet && null != srcSet) && "low" !== props.fetchPriority && false === !!(formatContext.tagScope & 3) && ("string" !== typeof src || ":" !== src[4] || "d" !== src[0] && "D" !== src[0] || "a" !== src[1] && "A" !== src[1] || "t" !== src[2] && "T" !== src[2] || "a" !== src[3] && "A" !== src[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
            var sizes = "string" === typeof props.sizes ? props.sizes : void 0, key$jscomp$0 = srcSet ? srcSet + "\n" + (sizes || "") : src, promotablePreloads = renderState.preloads.images, resource$jscomp$1 = promotablePreloads.get(key$jscomp$0);
            if (resource$jscomp$1) {
              if ("high" === props.fetchPriority || 10 > renderState.highImagePreloads.size)
                promotablePreloads.delete(key$jscomp$0), renderState.highImagePreloads.add(resource$jscomp$1);
            } else if (!resumableState.imageResources.hasOwnProperty(key$jscomp$0)) {
              resumableState.imageResources[key$jscomp$0] = PRELOAD_NO_CREDS;
              var input = props.crossOrigin;
              var JSCompiler_inline_result$jscomp$8 = "string" === typeof input ? "use-credentials" === input ? input : "" : void 0;
              var headers = renderState.headers, header;
              headers && 0 < headers.remainingCapacity && ("high" === props.fetchPriority || 500 > headers.highImagePreloads.length) && (header = getPreloadAsHeader(src, "image", {
                imageSrcSet: props.srcSet,
                imageSizes: props.sizes,
                crossOrigin: JSCompiler_inline_result$jscomp$8,
                integrity: props.integrity,
                nonce: props.nonce,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.refererPolicy
              }), 0 <= (headers.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key$jscomp$0] = PRELOAD_NO_CREDS, headers.highImagePreloads && (headers.highImagePreloads += ", "), headers.highImagePreloads += header) : (resource$jscomp$1 = [], pushLinkImpl(resource$jscomp$1, {
                rel: "preload",
                as: "image",
                href: srcSet ? void 0 : src,
                imageSrcSet: srcSet,
                imageSizes: sizes,
                crossOrigin: JSCompiler_inline_result$jscomp$8,
                integrity: props.integrity,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.referrerPolicy
              }), "high" === props.fetchPriority || 10 > renderState.highImagePreloads.size ? renderState.highImagePreloads.add(resource$jscomp$1) : (renderState.bulkPreloads.add(resource$jscomp$1), promotablePreloads.set(key$jscomp$0, resource$jscomp$1)));
            }
          }
          return pushSelfClosing(target$jscomp$0, props, "img");
        case "base":
        case "area":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "param":
        case "source":
        case "track":
        case "wbr":
          return pushSelfClosing(target$jscomp$0, props, type);
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          break;
        case "head":
          if (2 > formatContext.insertionMode && null === renderState.headChunks) {
            renderState.headChunks = [];
            var JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
              renderState.headChunks,
              props,
              "head"
            );
          } else
            JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "head"
            );
          return JSCompiler_inline_result$jscomp$9;
        case "html":
          if (0 === formatContext.insertionMode && null === renderState.htmlChunks) {
            renderState.htmlChunks = [doctypeChunk];
            var JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
              renderState.htmlChunks,
              props,
              "html"
            );
          } else
            JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "html"
            );
          return JSCompiler_inline_result$jscomp$10;
        default:
          if (-1 !== type.indexOf("-")) {
            target$jscomp$0.push(startChunkForTag(type));
            var children$jscomp$9 = null, innerHTML$jscomp$8 = null, propKey$jscomp$11;
            for (propKey$jscomp$11 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$11)) {
                var propValue$jscomp$11 = props[propKey$jscomp$11];
                if (null != propValue$jscomp$11) {
                  var attributeName = propKey$jscomp$11;
                  switch (propKey$jscomp$11) {
                    case "children":
                      children$jscomp$9 = propValue$jscomp$11;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$8 = propValue$jscomp$11;
                      break;
                    case "style":
                      pushStyleAttribute(target$jscomp$0, propValue$jscomp$11);
                      break;
                    case "suppressContentEditableWarning":
                    case "suppressHydrationWarning":
                    case "ref":
                      break;
                    case "className":
                      attributeName = "class";
                    default:
                      if (isAttributeNameSafe(propKey$jscomp$11) && "function" !== typeof propValue$jscomp$11 && "symbol" !== typeof propValue$jscomp$11 && false !== propValue$jscomp$11) {
                        if (true === propValue$jscomp$11) propValue$jscomp$11 = "";
                        else if ("object" === typeof propValue$jscomp$11) continue;
                        target$jscomp$0.push(
                          attributeSeparator,
                          attributeName,
                          attributeAssign,
                          escapeTextForBrowser(propValue$jscomp$11),
                          attributeEnd
                        );
                      }
                  }
                }
              }
            target$jscomp$0.push(endOfStartTag);
            pushInnerHTML(target$jscomp$0, innerHTML$jscomp$8, children$jscomp$9);
            return children$jscomp$9;
          }
      }
      return pushStartGenericElement(target$jscomp$0, props, type);
    }
    var endTagCache = /* @__PURE__ */ new Map();
    function endChunkForTag(tag) {
      var chunk = endTagCache.get(tag);
      void 0 === chunk && (chunk = stringToPrecomputedChunk("</" + tag + ">"), endTagCache.set(tag, chunk));
      return chunk;
    }
    function writeBootstrap(destination, renderState) {
      renderState = renderState.bootstrapChunks;
      for (var i = 0; i < renderState.length - 1; i++)
        writeChunk(destination, renderState[i]);
      return i < renderState.length ? (i = renderState[i], renderState.length = 0, writeChunkAndReturn(destination, i)) : true;
    }
    var placeholder1 = stringToPrecomputedChunk('<template id="');
    var placeholder2 = stringToPrecomputedChunk('"></template>');
    var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->");
    var startPendingSuspenseBoundary1 = stringToPrecomputedChunk(
      '<!--$?--><template id="'
    );
    var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
    var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->");
    var endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->");
    var clientRenderedSuspenseBoundaryError1 = stringToPrecomputedChunk("<template");
    var clientRenderedSuspenseBoundaryErrorAttrInterstitial = stringToPrecomputedChunk('"');
    var clientRenderedSuspenseBoundaryError1A = stringToPrecomputedChunk(' data-dgst="');
    stringToPrecomputedChunk(' data-msg="');
    stringToPrecomputedChunk(' data-stck="');
    stringToPrecomputedChunk(' data-cstck="');
    var clientRenderedSuspenseBoundaryError2 = stringToPrecomputedChunk("></template>");
    function writeStartPendingSuspenseBoundary(destination, renderState, id3) {
      writeChunk(destination, startPendingSuspenseBoundary1);
      if (null === id3)
        throw Error(
          "An ID must have been assigned before we can complete the boundary."
        );
      writeChunk(destination, renderState.boundaryPrefix);
      writeChunk(destination, id3.toString(16));
      return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
    }
    var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
    var startSegmentHTML2 = stringToPrecomputedChunk('">');
    var endSegmentHTML = stringToPrecomputedChunk("</div>");
    var startSegmentSVG = stringToPrecomputedChunk(
      '<svg aria-hidden="true" style="display:none" id="'
    );
    var startSegmentSVG2 = stringToPrecomputedChunk('">');
    var endSegmentSVG = stringToPrecomputedChunk("</svg>");
    var startSegmentMathML = stringToPrecomputedChunk(
      '<math aria-hidden="true" style="display:none" id="'
    );
    var startSegmentMathML2 = stringToPrecomputedChunk('">');
    var endSegmentMathML = stringToPrecomputedChunk("</math>");
    var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
    var startSegmentTable2 = stringToPrecomputedChunk('">');
    var endSegmentTable = stringToPrecomputedChunk("</table>");
    var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
    var startSegmentTableBody2 = stringToPrecomputedChunk('">');
    var endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>");
    var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
    var startSegmentTableRow2 = stringToPrecomputedChunk('">');
    var endSegmentTableRow = stringToPrecomputedChunk("</tr></table>");
    var startSegmentColGroup = stringToPrecomputedChunk(
      '<table hidden><colgroup id="'
    );
    var startSegmentColGroup2 = stringToPrecomputedChunk('">');
    var endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
    function writeStartSegment(destination, renderState, formatContext, id3) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 2:
          return writeChunk(destination, startSegmentHTML), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id3.toString(16)), writeChunkAndReturn(destination, startSegmentHTML2);
        case 3:
          return writeChunk(destination, startSegmentSVG), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id3.toString(16)), writeChunkAndReturn(destination, startSegmentSVG2);
        case 4:
          return writeChunk(destination, startSegmentMathML), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id3.toString(16)), writeChunkAndReturn(destination, startSegmentMathML2);
        case 5:
          return writeChunk(destination, startSegmentTable), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id3.toString(16)), writeChunkAndReturn(destination, startSegmentTable2);
        case 6:
          return writeChunk(destination, startSegmentTableBody), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id3.toString(16)), writeChunkAndReturn(destination, startSegmentTableBody2);
        case 7:
          return writeChunk(destination, startSegmentTableRow), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id3.toString(16)), writeChunkAndReturn(destination, startSegmentTableRow2);
        case 8:
          return writeChunk(destination, startSegmentColGroup), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id3.toString(16)), writeChunkAndReturn(destination, startSegmentColGroup2);
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function writeEndSegment(destination, formatContext) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 2:
          return writeChunkAndReturn(destination, endSegmentHTML);
        case 3:
          return writeChunkAndReturn(destination, endSegmentSVG);
        case 4:
          return writeChunkAndReturn(destination, endSegmentMathML);
        case 5:
          return writeChunkAndReturn(destination, endSegmentTable);
        case 6:
          return writeChunkAndReturn(destination, endSegmentTableBody);
        case 7:
          return writeChunkAndReturn(destination, endSegmentTableRow);
        case 8:
          return writeChunkAndReturn(destination, endSegmentColGroup);
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var completeSegmentScript1Full = stringToPrecomputedChunk(
      '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
    );
    var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
    var completeSegmentScript2 = stringToPrecomputedChunk('","');
    var completeSegmentScriptEnd = stringToPrecomputedChunk('")</script>');
    stringToPrecomputedChunk('<template data-rsi="" data-sid="');
    stringToPrecomputedChunk('" data-pid="');
    var completeBoundaryScript1Full = stringToPrecomputedChunk(
      '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("'
    );
    var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
    var completeBoundaryWithStylesScript1FullBoth = stringToPrecomputedChunk(
      '$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
    );
    var completeBoundaryWithStylesScript1FullPartial = stringToPrecomputedChunk(
      '$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'
    );
    var completeBoundaryWithStylesScript1Partial = stringToPrecomputedChunk('$RR("');
    var completeBoundaryScript2 = stringToPrecomputedChunk('","');
    var completeBoundaryScript3a = stringToPrecomputedChunk('",');
    var completeBoundaryScript3b = stringToPrecomputedChunk('"');
    var completeBoundaryScriptEnd = stringToPrecomputedChunk(")</script>");
    stringToPrecomputedChunk('<template data-rci="" data-bid="');
    stringToPrecomputedChunk('<template data-rri="" data-bid="');
    stringToPrecomputedChunk('" data-sid="');
    stringToPrecomputedChunk('" data-sty="');
    var clientRenderScript1Full = stringToPrecomputedChunk(
      '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
    );
    var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
    var clientRenderScript1A = stringToPrecomputedChunk('"');
    var clientRenderErrorScriptArgInterstitial = stringToPrecomputedChunk(",");
    var clientRenderScriptEnd = stringToPrecomputedChunk(")</script>");
    stringToPrecomputedChunk('<template data-rxi="" data-bid="');
    stringToPrecomputedChunk('" data-dgst="');
    stringToPrecomputedChunk('" data-msg="');
    stringToPrecomputedChunk('" data-stck="');
    stringToPrecomputedChunk('" data-cstck="');
    var regexForJSStringsInInstructionScripts = /[<\u2028\u2029]/g;
    function escapeJSStringsForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInInstructionScripts,
        function(match) {
          switch (match) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    var regexForJSStringsInScripts = /[&><\u2028\u2029]/g;
    function escapeJSObjectForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInScripts,
        function(match) {
          switch (match) {
            case "&":
              return "\\u0026";
            case ">":
              return "\\u003e";
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    var lateStyleTagResourceOpen1 = stringToPrecomputedChunk(
      '<style media="not all" data-precedence="'
    );
    var lateStyleTagResourceOpen2 = stringToPrecomputedChunk('" data-href="');
    var lateStyleTagResourceOpen3 = stringToPrecomputedChunk('">');
    var lateStyleTagTemplateClose = stringToPrecomputedChunk("</style>");
    var currentlyRenderingBoundaryHasStylesToHoist = false;
    var destinationHasCapacity = true;
    function flushStyleTagsLateForBoundary(styleQueue) {
      var rules = styleQueue.rules, hrefs = styleQueue.hrefs, i = 0;
      if (hrefs.length) {
        writeChunk(this, lateStyleTagResourceOpen1);
        writeChunk(this, styleQueue.precedence);
        for (writeChunk(this, lateStyleTagResourceOpen2); i < hrefs.length - 1; i++)
          writeChunk(this, hrefs[i]), writeChunk(this, spaceSeparator);
        writeChunk(this, hrefs[i]);
        writeChunk(this, lateStyleTagResourceOpen3);
        for (i = 0; i < rules.length; i++) writeChunk(this, rules[i]);
        destinationHasCapacity = writeChunkAndReturn(
          this,
          lateStyleTagTemplateClose
        );
        currentlyRenderingBoundaryHasStylesToHoist = true;
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function hasStylesToHoist(stylesheet) {
      return 2 !== stylesheet.state ? currentlyRenderingBoundaryHasStylesToHoist = true : false;
    }
    function writeHoistablesForBoundary(destination, hoistableState, renderState) {
      currentlyRenderingBoundaryHasStylesToHoist = false;
      destinationHasCapacity = true;
      hoistableState.styles.forEach(flushStyleTagsLateForBoundary, destination);
      hoistableState.stylesheets.forEach(hasStylesToHoist);
      currentlyRenderingBoundaryHasStylesToHoist && (renderState.stylesToHoist = true);
      return destinationHasCapacity;
    }
    function flushResource(resource) {
      for (var i = 0; i < resource.length; i++) writeChunk(this, resource[i]);
      resource.length = 0;
    }
    var stylesheetFlushingQueue = [];
    function flushStyleInPreamble(stylesheet) {
      pushLinkImpl(stylesheetFlushingQueue, stylesheet.props);
      for (var i = 0; i < stylesheetFlushingQueue.length; i++)
        writeChunk(this, stylesheetFlushingQueue[i]);
      stylesheetFlushingQueue.length = 0;
      stylesheet.state = 2;
    }
    var styleTagResourceOpen1 = stringToPrecomputedChunk(
      '<style data-precedence="'
    );
    var styleTagResourceOpen2 = stringToPrecomputedChunk('" data-href="');
    var spaceSeparator = stringToPrecomputedChunk(" ");
    var styleTagResourceOpen3 = stringToPrecomputedChunk('">');
    var styleTagResourceClose = stringToPrecomputedChunk("</style>");
    function flushStylesInPreamble(styleQueue) {
      var hasStylesheets = 0 < styleQueue.sheets.size;
      styleQueue.sheets.forEach(flushStyleInPreamble, this);
      styleQueue.sheets.clear();
      var rules = styleQueue.rules, hrefs = styleQueue.hrefs;
      if (!hasStylesheets || hrefs.length) {
        writeChunk(this, styleTagResourceOpen1);
        writeChunk(this, styleQueue.precedence);
        styleQueue = 0;
        if (hrefs.length) {
          for (writeChunk(this, styleTagResourceOpen2); styleQueue < hrefs.length - 1; styleQueue++)
            writeChunk(this, hrefs[styleQueue]), writeChunk(this, spaceSeparator);
          writeChunk(this, hrefs[styleQueue]);
        }
        writeChunk(this, styleTagResourceOpen3);
        for (styleQueue = 0; styleQueue < rules.length; styleQueue++)
          writeChunk(this, rules[styleQueue]);
        writeChunk(this, styleTagResourceClose);
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function preloadLateStyle(stylesheet) {
      if (0 === stylesheet.state) {
        stylesheet.state = 1;
        var props = stylesheet.props;
        pushLinkImpl(stylesheetFlushingQueue, {
          rel: "preload",
          as: "style",
          href: stylesheet.props.href,
          crossOrigin: props.crossOrigin,
          fetchPriority: props.fetchPriority,
          integrity: props.integrity,
          media: props.media,
          hrefLang: props.hrefLang,
          referrerPolicy: props.referrerPolicy
        });
        for (stylesheet = 0; stylesheet < stylesheetFlushingQueue.length; stylesheet++)
          writeChunk(this, stylesheetFlushingQueue[stylesheet]);
        stylesheetFlushingQueue.length = 0;
      }
    }
    function preloadLateStyles(styleQueue) {
      styleQueue.sheets.forEach(preloadLateStyle, this);
      styleQueue.sheets.clear();
    }
    var arrayFirstOpenBracket = stringToPrecomputedChunk("[");
    var arraySubsequentOpenBracket = stringToPrecomputedChunk(",[");
    var arrayInterstitial = stringToPrecomputedChunk(",");
    var arrayCloseBracket = stringToPrecomputedChunk("]");
    function writeStyleResourceDependenciesInJS(destination, hoistableState) {
      writeChunk(destination, arrayFirstOpenBracket);
      var nextArrayOpenBrackChunk = arrayFirstOpenBracket;
      hoistableState.stylesheets.forEach(function(resource) {
        if (2 !== resource.state)
          if (3 === resource.state)
            writeChunk(destination, nextArrayOpenBrackChunk), writeChunk(
              destination,
              escapeJSObjectForInstructionScripts("" + resource.props.href)
            ), writeChunk(destination, arrayCloseBracket), nextArrayOpenBrackChunk = arraySubsequentOpenBracket;
          else {
            writeChunk(destination, nextArrayOpenBrackChunk);
            var precedence = resource.props["data-precedence"], props = resource.props, coercedHref = sanitizeURL("" + resource.props.href);
            writeChunk(
              destination,
              escapeJSObjectForInstructionScripts(coercedHref)
            );
            precedence = "" + precedence;
            writeChunk(destination, arrayInterstitial);
            writeChunk(
              destination,
              escapeJSObjectForInstructionScripts(precedence)
            );
            for (var propKey in props)
              if (hasOwnProperty.call(props, propKey) && (precedence = props[propKey], null != precedence))
                switch (propKey) {
                  case "href":
                  case "rel":
                  case "precedence":
                  case "data-precedence":
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    writeStyleResourceAttributeInJS(
                      destination,
                      propKey,
                      precedence
                    );
                }
            writeChunk(destination, arrayCloseBracket);
            nextArrayOpenBrackChunk = arraySubsequentOpenBracket;
            resource.state = 3;
          }
      });
      writeChunk(destination, arrayCloseBracket);
    }
    function writeStyleResourceAttributeInJS(destination, name, value) {
      var attributeName = name.toLowerCase();
      switch (typeof value) {
        case "function":
        case "symbol":
          return;
      }
      switch (name) {
        case "innerHTML":
        case "dangerouslySetInnerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "style":
        case "ref":
          return;
        case "className":
          attributeName = "class";
          name = "" + value;
          break;
        case "hidden":
          if (false === value) return;
          name = "";
          break;
        case "src":
        case "href":
          value = sanitizeURL(value);
          name = "" + value;
          break;
        default:
          if (2 < name.length && ("o" === name[0] || "O" === name[0]) && ("n" === name[1] || "N" === name[1]) || !isAttributeNameSafe(name))
            return;
          name = "" + value;
      }
      writeChunk(destination, arrayInterstitial);
      writeChunk(destination, escapeJSObjectForInstructionScripts(attributeName));
      writeChunk(destination, arrayInterstitial);
      writeChunk(destination, escapeJSObjectForInstructionScripts(name));
    }
    function createHoistableState() {
      return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set() };
    }
    function prefetchDNS(href) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if ("string" === typeof href && href) {
          if (!resumableState.dnsResources.hasOwnProperty(href)) {
            resumableState.dnsResources[href] = null;
            resumableState = renderState.headers;
            var header, JSCompiler_temp;
            if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity)
              JSCompiler_temp = (header = "<" + ("" + href).replace(
                regexForHrefInLinkHeaderURLContext,
                escapeHrefForLinkHeaderURLContextReplacer
              ) + ">; rel=dns-prefetch", 0 <= (resumableState.remainingCapacity -= header.length + 2));
            JSCompiler_temp ? (renderState.resets.dns[href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (header = [], pushLinkImpl(header, { href, rel: "dns-prefetch" }), renderState.preconnects.add(header));
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.D(href);
    }
    function preconnect(href, crossOrigin) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if ("string" === typeof href && href) {
          var bucket = "use-credentials" === crossOrigin ? "credentials" : "string" === typeof crossOrigin ? "anonymous" : "default";
          if (!resumableState.connectResources[bucket].hasOwnProperty(href)) {
            resumableState.connectResources[bucket][href] = null;
            resumableState = renderState.headers;
            var header, JSCompiler_temp;
            if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity) {
              JSCompiler_temp = "<" + ("" + href).replace(
                regexForHrefInLinkHeaderURLContext,
                escapeHrefForLinkHeaderURLContextReplacer
              ) + ">; rel=preconnect";
              if ("string" === typeof crossOrigin) {
                var escapedCrossOrigin = ("" + crossOrigin).replace(
                  regexForLinkHeaderQuotedParamValueContext,
                  escapeStringForLinkHeaderQuotedParamValueContextReplacer
                );
                JSCompiler_temp += '; crossorigin="' + escapedCrossOrigin + '"';
              }
              JSCompiler_temp = (header = JSCompiler_temp, 0 <= (resumableState.remainingCapacity -= header.length + 2));
            }
            JSCompiler_temp ? (renderState.resets.connect[bucket][href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (bucket = [], pushLinkImpl(bucket, {
              rel: "preconnect",
              href,
              crossOrigin
            }), renderState.preconnects.add(bucket));
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.C(href, crossOrigin);
    }
    function preload(href, as, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (as && href) {
          switch (as) {
            case "image":
              if (options) {
                var imageSrcSet = options.imageSrcSet;
                var imageSizes = options.imageSizes;
                var fetchPriority = options.fetchPriority;
              }
              var key = imageSrcSet ? imageSrcSet + "\n" + (imageSizes || "") : href;
              if (resumableState.imageResources.hasOwnProperty(key)) return;
              resumableState.imageResources[key] = PRELOAD_NO_CREDS;
              resumableState = renderState.headers;
              var header;
              resumableState && 0 < resumableState.remainingCapacity && "high" === fetchPriority && (header = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key] = PRELOAD_NO_CREDS, resumableState.highImagePreloads && (resumableState.highImagePreloads += ", "), resumableState.highImagePreloads += header) : (resumableState = [], pushLinkImpl(
                resumableState,
                assign(
                  { rel: "preload", href: imageSrcSet ? void 0 : href, as },
                  options
                )
              ), "high" === fetchPriority ? renderState.highImagePreloads.add(resumableState) : (renderState.bulkPreloads.add(resumableState), renderState.preloads.images.set(key, resumableState)));
              break;
            case "style":
              if (resumableState.styleResources.hasOwnProperty(href)) return;
              imageSrcSet = [];
              pushLinkImpl(
                imageSrcSet,
                assign({ rel: "preload", href, as }, options)
              );
              resumableState.styleResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              renderState.preloads.stylesheets.set(href, imageSrcSet);
              renderState.bulkPreloads.add(imageSrcSet);
              break;
            case "script":
              if (resumableState.scriptResources.hasOwnProperty(href)) return;
              imageSrcSet = [];
              renderState.preloads.scripts.set(href, imageSrcSet);
              renderState.bulkPreloads.add(imageSrcSet);
              pushLinkImpl(
                imageSrcSet,
                assign({ rel: "preload", href, as }, options)
              );
              resumableState.scriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              break;
            default:
              if (resumableState.unknownResources.hasOwnProperty(as)) {
                if (imageSrcSet = resumableState.unknownResources[as], imageSrcSet.hasOwnProperty(href))
                  return;
              } else
                imageSrcSet = {}, resumableState.unknownResources[as] = imageSrcSet;
              imageSrcSet[href] = PRELOAD_NO_CREDS;
              if ((resumableState = renderState.headers) && 0 < resumableState.remainingCapacity && "font" === as && (key = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= key.length + 2)))
                renderState.resets.font[href] = PRELOAD_NO_CREDS, resumableState.fontPreloads && (resumableState.fontPreloads += ", "), resumableState.fontPreloads += key;
              else
                switch (resumableState = [], href = assign({ rel: "preload", href, as }, options), pushLinkImpl(resumableState, href), as) {
                  case "font":
                    renderState.fontPreloads.add(resumableState);
                    break;
                  default:
                    renderState.bulkPreloads.add(resumableState);
                }
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.L(href, as, options);
    }
    function preloadModule(href, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (href) {
          var as = options && "string" === typeof options.as ? options.as : "script";
          switch (as) {
            case "script":
              if (resumableState.moduleScriptResources.hasOwnProperty(href)) return;
              as = [];
              resumableState.moduleScriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              renderState.preloads.moduleScripts.set(href, as);
              break;
            default:
              if (resumableState.moduleUnknownResources.hasOwnProperty(as)) {
                var resources = resumableState.unknownResources[as];
                if (resources.hasOwnProperty(href)) return;
              } else
                resources = {}, resumableState.moduleUnknownResources[as] = resources;
              as = [];
              resources[href] = PRELOAD_NO_CREDS;
          }
          pushLinkImpl(as, assign({ rel: "modulepreload", href }, options));
          renderState.bulkPreloads.add(as);
          enqueueFlush(request);
        }
      } else previousDispatcher.m(href, options);
    }
    function preinitStyle(href, precedence, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (href) {
          precedence = precedence || "default";
          var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
          null !== resourceState && (resumableState.styleResources[href] = null, styleQueue || (styleQueue = {
            precedence: escapeTextForBrowser(precedence),
            rules: [],
            hrefs: [],
            sheets: /* @__PURE__ */ new Map()
          }, renderState.styles.set(precedence, styleQueue)), precedence = {
            state: 0,
            props: assign(
              { rel: "stylesheet", href, "data-precedence": precedence },
              options
            )
          }, resourceState && (2 === resourceState.length && adoptPreloadCredentials(precedence.props, resourceState), (renderState = renderState.preloads.stylesheets.get(href)) && 0 < renderState.length ? renderState.length = 0 : precedence.state = 1), styleQueue.sheets.set(href, precedence), enqueueFlush(request));
        }
      } else previousDispatcher.S(href, precedence, options);
    }
    function preinitScript(src, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (src) {
          var resourceState = resumableState.scriptResources.hasOwnProperty(src) ? resumableState.scriptResources[src] : void 0;
          null !== resourceState && (resumableState.scriptResources[src] = null, options = assign({ src, async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.scripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
        }
      } else previousDispatcher.X(src, options);
    }
    function preinitModuleScript(src, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (src) {
          var resourceState = resumableState.moduleScriptResources.hasOwnProperty(
            src
          ) ? resumableState.moduleScriptResources[src] : void 0;
          null !== resourceState && (resumableState.moduleScriptResources[src] = null, options = assign({ src, type: "module", async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.moduleScripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
        }
      } else previousDispatcher.M(src, options);
    }
    function adoptPreloadCredentials(target, preloadState) {
      null == target.crossOrigin && (target.crossOrigin = preloadState[0]);
      null == target.integrity && (target.integrity = preloadState[1]);
    }
    function getPreloadAsHeader(href, as, params) {
      href = ("" + href).replace(
        regexForHrefInLinkHeaderURLContext,
        escapeHrefForLinkHeaderURLContextReplacer
      );
      as = ("" + as).replace(
        regexForLinkHeaderQuotedParamValueContext,
        escapeStringForLinkHeaderQuotedParamValueContextReplacer
      );
      as = "<" + href + '>; rel=preload; as="' + as + '"';
      for (var paramName in params)
        hasOwnProperty.call(params, paramName) && (href = params[paramName], "string" === typeof href && (as += "; " + paramName.toLowerCase() + '="' + ("" + href).replace(
          regexForLinkHeaderQuotedParamValueContext,
          escapeStringForLinkHeaderQuotedParamValueContextReplacer
        ) + '"'));
      return as;
    }
    var regexForHrefInLinkHeaderURLContext = /[<>\r\n]/g;
    function escapeHrefForLinkHeaderURLContextReplacer(match) {
      switch (match) {
        case "<":
          return "%3C";
        case ">":
          return "%3E";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    var regexForLinkHeaderQuotedParamValueContext = /["';,\r\n]/g;
    function escapeStringForLinkHeaderQuotedParamValueContextReplacer(match) {
      switch (match) {
        case '"':
          return "%22";
        case "'":
          return "%27";
        case ";":
          return "%3B";
        case ",":
          return "%2C";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    function hoistStyleQueueDependency(styleQueue) {
      this.styles.add(styleQueue);
    }
    function hoistStylesheetDependency(stylesheet) {
      this.stylesheets.add(stylesheet);
    }
    var bind = Function.prototype.bind;
    var requestStorage = new async_hooks.AsyncLocalStorage();
    var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    var emptyContextObject = {};
    var currentActiveSnapshot = null;
    function popToNearestCommonAncestor(prev, next) {
      if (prev !== next) {
        prev.context._currentValue = prev.parentValue;
        prev = prev.parent;
        var parentNext = next.parent;
        if (null === prev) {
          if (null !== parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
        } else {
          if (null === parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
          popToNearestCommonAncestor(prev, parentNext);
        }
        next.context._currentValue = next.value;
      }
    }
    function popAllPrevious(prev) {
      prev.context._currentValue = prev.parentValue;
      prev = prev.parent;
      null !== prev && popAllPrevious(prev);
    }
    function pushAllNext(next) {
      var parentNext = next.parent;
      null !== parentNext && pushAllNext(parentNext);
      next.context._currentValue = next.value;
    }
    function popPreviousToCommonLevel(prev, next) {
      prev.context._currentValue = prev.parentValue;
      prev = prev.parent;
      if (null === prev)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === next.depth ? popToNearestCommonAncestor(prev, next) : popPreviousToCommonLevel(prev, next);
    }
    function popNextToCommonLevel(prev, next) {
      var parentNext = next.parent;
      if (null === parentNext)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === parentNext.depth ? popToNearestCommonAncestor(prev, parentNext) : popNextToCommonLevel(prev, parentNext);
      next.context._currentValue = next.value;
    }
    function switchContext(newSnapshot) {
      var prev = currentActiveSnapshot;
      prev !== newSnapshot && (null === prev ? pushAllNext(newSnapshot) : null === newSnapshot ? popAllPrevious(prev) : prev.depth === newSnapshot.depth ? popToNearestCommonAncestor(prev, newSnapshot) : prev.depth > newSnapshot.depth ? popPreviousToCommonLevel(prev, newSnapshot) : popNextToCommonLevel(prev, newSnapshot), currentActiveSnapshot = newSnapshot);
    }
    var classComponentUpdater = {
      isMounted: function() {
        return false;
      },
      enqueueSetState: function(inst, payload) {
        inst = inst._reactInternals;
        null !== inst.queue && inst.queue.push(payload);
      },
      enqueueReplaceState: function(inst, payload) {
        inst = inst._reactInternals;
        inst.replace = true;
        inst.queue = [payload];
      },
      enqueueForceUpdate: function() {
      }
    };
    var emptyTreeContext = { id: 1, overflow: "" };
    function pushTreeContext(baseContext, totalChildren, index) {
      var baseIdWithLeadingBit = baseContext.id;
      baseContext = baseContext.overflow;
      var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index += 1;
      var length = 32 - clz32(totalChildren) + baseLength;
      if (30 < length) {
        var numberOfOverflowBits = baseLength - baseLength % 5;
        length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        return {
          id: 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit,
          overflow: length + baseContext
        };
      }
      return {
        id: 1 << length | index << baseLength | baseIdWithLeadingBit,
        overflow: baseContext
      };
    }
    var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
    var log = Math.log;
    var LN2 = Math.LN2;
    function clz32Fallback(x) {
      x >>>= 0;
      return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
    }
    var SuspenseException = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`"
    );
    function noop$2() {
    }
    function trackUsedThenable(thenableState2, thenable, index) {
      index = thenableState2[index];
      void 0 === index ? thenableState2.push(thenable) : index !== thenable && (thenable.then(noop$2, noop$2), thenable = index);
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          "string" === typeof thenable.status ? thenable.then(noop$2, noop$2) : (thenableState2 = thenable, thenableState2.status = "pending", thenableState2.then(
            function(fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function(error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          ));
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    var suspendedThenable = null;
    function getSuspendedThenable() {
      if (null === suspendedThenable)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var currentlyRenderingComponent = null;
    var currentlyRenderingTask = null;
    var currentlyRenderingRequest = null;
    var currentlyRenderingKeyPath = null;
    var firstWorkInProgressHook = null;
    var workInProgressHook = null;
    var isReRender = false;
    var didScheduleRenderPhaseUpdate = false;
    var localIdCounter = 0;
    var actionStateCounter = 0;
    var actionStateMatchingIndex = -1;
    var thenableIndexCounter = 0;
    var thenableState = null;
    var renderPhaseUpdates = null;
    var numberOfReRenders = 0;
    function resolveCurrentlyRenderingComponent() {
      if (null === currentlyRenderingComponent)
        throw Error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      return currentlyRenderingComponent;
    }
    function createHook() {
      if (0 < numberOfReRenders)
        throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function createWorkInProgressHook() {
      null === workInProgressHook ? null === firstWorkInProgressHook ? (isReRender = false, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = true, workInProgressHook = firstWorkInProgressHook) : null === workInProgressHook.next ? (isReRender = false, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = true, workInProgressHook = workInProgressHook.next);
      return workInProgressHook;
    }
    function getThenableStateAfterSuspending() {
      var state = thenableState;
      thenableState = null;
      return state;
    }
    function resetHooksState() {
      currentlyRenderingKeyPath = currentlyRenderingRequest = currentlyRenderingTask = currentlyRenderingComponent = null;
      didScheduleRenderPhaseUpdate = false;
      firstWorkInProgressHook = null;
      numberOfReRenders = 0;
      workInProgressHook = renderPhaseUpdates = null;
    }
    function basicStateReducer(state, action) {
      return "function" === typeof action ? action(state) : action;
    }
    function useReducer(reducer, initialArg, init) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      if (isReRender) {
        var queue = workInProgressHook.queue;
        initialArg = queue.dispatch;
        if (null !== renderPhaseUpdates && (init = renderPhaseUpdates.get(queue), void 0 !== init)) {
          renderPhaseUpdates.delete(queue);
          queue = workInProgressHook.memoizedState;
          do
            queue = reducer(queue, init.action), init = init.next;
          while (null !== init);
          workInProgressHook.memoizedState = queue;
          return [queue, initialArg];
        }
        return [workInProgressHook.memoizedState, initialArg];
      }
      reducer = reducer === basicStateReducer ? "function" === typeof initialArg ? initialArg() : initialArg : void 0 !== init ? init(initialArg) : initialArg;
      workInProgressHook.memoizedState = reducer;
      reducer = workInProgressHook.queue = { last: null, dispatch: null };
      reducer = reducer.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingComponent,
        reducer
      );
      return [workInProgressHook.memoizedState, reducer];
    }
    function useMemo5(nextCreate, deps) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      if (null !== workInProgressHook) {
        var prevState = workInProgressHook.memoizedState;
        if (null !== prevState && null !== deps) {
          var prevDeps = prevState[1];
          a: if (null === prevDeps) prevDeps = false;
          else {
            for (var i = 0; i < prevDeps.length && i < deps.length; i++)
              if (!objectIs(deps[i], prevDeps[i])) {
                prevDeps = false;
                break a;
              }
            prevDeps = true;
          }
          if (prevDeps) return prevState[0];
        }
      }
      nextCreate = nextCreate();
      workInProgressHook.memoizedState = [nextCreate, deps];
      return nextCreate;
    }
    function dispatchAction(componentIdentity, queue, action) {
      if (25 <= numberOfReRenders)
        throw Error(
          "Too many re-renders. React limits the number of renders to prevent an infinite loop."
        );
      if (componentIdentity === currentlyRenderingComponent)
        if (didScheduleRenderPhaseUpdate = true, componentIdentity = { action, next: null }, null === renderPhaseUpdates && (renderPhaseUpdates = /* @__PURE__ */ new Map()), action = renderPhaseUpdates.get(queue), void 0 === action)
          renderPhaseUpdates.set(queue, componentIdentity);
        else {
          for (queue = action; null !== queue.next; ) queue = queue.next;
          queue.next = componentIdentity;
        }
    }
    function unsupportedStartTransition() {
      throw Error("startTransition cannot be called during server rendering.");
    }
    function unsupportedSetOptimisticState() {
      throw Error("Cannot update optimistic state while rendering.");
    }
    function createPostbackActionStateKey(permalink, componentKeyPath, hookIndex) {
      if (void 0 !== permalink) return "p" + permalink;
      permalink = JSON.stringify([componentKeyPath, null, hookIndex]);
      componentKeyPath = crypto.createHash("md5");
      componentKeyPath.update(permalink);
      return "k" + componentKeyPath.digest("hex");
    }
    function useActionState(action, initialState, permalink) {
      resolveCurrentlyRenderingComponent();
      var actionStateHookIndex = actionStateCounter++, request = currentlyRenderingRequest;
      if ("function" === typeof action.$$FORM_ACTION) {
        var nextPostbackStateKey = null, componentKeyPath = currentlyRenderingKeyPath;
        request = request.formState;
        var isSignatureEqual = action.$$IS_SIGNATURE_EQUAL;
        if (null !== request && "function" === typeof isSignatureEqual) {
          var postbackKey = request[1];
          isSignatureEqual.call(action, request[2], request[3]) && (nextPostbackStateKey = createPostbackActionStateKey(
            permalink,
            componentKeyPath,
            actionStateHookIndex
          ), postbackKey === nextPostbackStateKey && (actionStateMatchingIndex = actionStateHookIndex, initialState = request[0]));
        }
        var boundAction = action.bind(null, initialState);
        action = function(payload) {
          boundAction(payload);
        };
        "function" === typeof boundAction.$$FORM_ACTION && (action.$$FORM_ACTION = function(prefix2) {
          prefix2 = boundAction.$$FORM_ACTION(prefix2);
          void 0 !== permalink && (permalink += "", prefix2.action = permalink);
          var formData = prefix2.data;
          formData && (null === nextPostbackStateKey && (nextPostbackStateKey = createPostbackActionStateKey(
            permalink,
            componentKeyPath,
            actionStateHookIndex
          )), formData.append("$ACTION_KEY", nextPostbackStateKey));
          return prefix2;
        });
        return [initialState, action, false];
      }
      var boundAction$22 = action.bind(null, initialState);
      return [
        initialState,
        function(payload) {
          boundAction$22(payload);
        },
        false
      ];
    }
    function unwrapThenable(thenable) {
      var index = thenableIndexCounter;
      thenableIndexCounter += 1;
      null === thenableState && (thenableState = []);
      return trackUsedThenable(thenableState, thenable, index);
    }
    function unsupportedRefresh() {
      throw Error("Cache cannot be refreshed during server rendering.");
    }
    function noop$1() {
    }
    var HooksDispatcher = {
      readContext: function(context) {
        return context._currentValue;
      },
      use: function(usable) {
        if (null !== usable && "object" === typeof usable) {
          if ("function" === typeof usable.then) return unwrapThenable(usable);
          if (usable.$$typeof === REACT_CONTEXT_TYPE) return usable._currentValue;
        }
        throw Error("An unsupported type was passed to use(): " + String(usable));
      },
      useContext: function(context) {
        resolveCurrentlyRenderingComponent();
        return context._currentValue;
      },
      useMemo: useMemo5,
      useReducer,
      useRef: function(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
        workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        return null === previousRef ? (initialValue = { current: initialValue }, workInProgressHook.memoizedState = initialValue) : previousRef;
      },
      useState: function(initialState) {
        return useReducer(basicStateReducer, initialState);
      },
      useInsertionEffect: noop$1,
      useLayoutEffect: noop$1,
      useCallback: function(callback, deps) {
        return useMemo5(function() {
          return callback;
        }, deps);
      },
      useImperativeHandle: noop$1,
      useEffect: noop$1,
      useDebugValue: noop$1,
      useDeferredValue: function(value, initialValue) {
        resolveCurrentlyRenderingComponent();
        return void 0 !== initialValue ? initialValue : value;
      },
      useTransition: function() {
        resolveCurrentlyRenderingComponent();
        return [false, unsupportedStartTransition];
      },
      useId: function() {
        var JSCompiler_inline_result = currentlyRenderingTask.treeContext;
        var overflow = JSCompiler_inline_result.overflow;
        JSCompiler_inline_result = JSCompiler_inline_result.id;
        JSCompiler_inline_result = (JSCompiler_inline_result & ~(1 << 32 - clz32(JSCompiler_inline_result) - 1)).toString(32) + overflow;
        var resumableState = currentResumableState;
        if (null === resumableState)
          throw Error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component."
          );
        overflow = localIdCounter++;
        JSCompiler_inline_result = ":" + resumableState.idPrefix + "R" + JSCompiler_inline_result;
        0 < overflow && (JSCompiler_inline_result += "H" + overflow.toString(32));
        return JSCompiler_inline_result + ":";
      },
      useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
        if (void 0 === getServerSnapshot)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        return getServerSnapshot();
      },
      useCacheRefresh: function() {
        return unsupportedRefresh;
      },
      useMemoCache: function(size) {
        for (var data = Array(size), i = 0; i < size; i++)
          data[i] = REACT_MEMO_CACHE_SENTINEL;
        return data;
      },
      useHostTransitionStatus: function() {
        resolveCurrentlyRenderingComponent();
        return sharedNotPendingObject;
      },
      useOptimistic: function(passthrough) {
        resolveCurrentlyRenderingComponent();
        return [passthrough, unsupportedSetOptimisticState];
      }
    };
    HooksDispatcher.useFormState = useActionState;
    HooksDispatcher.useActionState = useActionState;
    var currentResumableState = null;
    var DefaultAsyncDispatcher = {
      getCacheForType: function() {
        throw Error("Not implemented.");
      }
    };
    function prepareStackTrace(error, structuredStackTrace) {
      error = (error.name || "Error") + ": " + (error.message || "");
      for (var i = 0; i < structuredStackTrace.length; i++)
        error += "\n    at " + structuredStackTrace[i].toString();
      return error;
    }
    var prefix;
    var suffix;
    function describeBuiltInComponentFrame(name) {
      if (void 0 === prefix)
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || "";
          suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return "\n" + prefix + name + suffix;
    }
    var reentry = false;
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry) return "";
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareStackTrace;
      try {
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if ("object" === typeof Reflect && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    var control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x$24) {
                    control = x$24;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x$25) {
                  control = x$25;
                }
                (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                });
              }
            } catch (sample) {
              if (sample && control && "string" === typeof sample.stack)
                return [sample.stack, control.stack];
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name"
        );
        namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
        if (sampleStack && controlStack) {
          var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
          for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
            RunInRootFrame++;
          for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
            "DetermineComponentFrameRoot"
          ); )
            namePropDescriptor++;
          if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
            for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
              namePropDescriptor--;
          for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
            if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
              if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
                do
                  if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                    var frame2 = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                    fn.displayName && frame2.includes("<anonymous>") && (frame2 = frame2.replace("<anonymous>", fn.displayName));
                    return frame2;
                  }
                while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
              }
              break;
            }
        }
      } finally {
        reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
      }
      return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
    }
    function describeComponentStackByType(type) {
      if ("string" === typeof type) return describeBuiltInComponentFrame(type);
      if ("function" === typeof type)
        return type.prototype && type.prototype.isReactComponent ? (type = describeNativeComponentFrame(type, true), type) : describeNativeComponentFrame(type, false);
      if ("object" === typeof type && null !== type) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeNativeComponentFrame(type.render, false);
          case REACT_MEMO_TYPE:
            return describeNativeComponentFrame(type.type, false);
          case REACT_LAZY_TYPE:
            var lazyComponent = type, payload = lazyComponent._payload;
            lazyComponent = lazyComponent._init;
            try {
              type = lazyComponent(payload);
            } catch (x) {
              return describeBuiltInComponentFrame("Lazy");
            }
            return describeComponentStackByType(type);
        }
        if ("string" === typeof type.name)
          return payload = type.env, describeBuiltInComponentFrame(
            type.name + (payload ? " [" + payload + "]" : "")
          );
      }
      switch (type) {
        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame("SuspenseList");
        case REACT_SUSPENSE_TYPE:
          return describeBuiltInComponentFrame("Suspense");
      }
      return "";
    }
    function defaultErrorHandler(error) {
      if ("object" === typeof error && null !== error && "string" === typeof error.environmentName) {
        var JSCompiler_inline_result = error.environmentName;
        error = [error].slice(0);
        "string" === typeof error[0] ? error.splice(
          0,
          1,
          "\x1B[0m\x1B[7m%c%s\x1B[0m%c " + error[0],
          "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
          " " + JSCompiler_inline_result + " ",
          ""
        ) : error.splice(
          0,
          0,
          "\x1B[0m\x1B[7m%c%s\x1B[0m%c ",
          "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
          " " + JSCompiler_inline_result + " ",
          ""
        );
        error.unshift(console);
        JSCompiler_inline_result = bind.apply(console.error, error);
        JSCompiler_inline_result();
      } else console.error(error);
      return null;
    }
    function noop2() {
    }
    function RequestInstance(resumableState, renderState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, formState) {
      var abortSet = /* @__PURE__ */ new Set();
      this.destination = null;
      this.flushScheduled = false;
      this.resumableState = resumableState;
      this.renderState = renderState;
      this.rootFormatContext = rootFormatContext;
      this.progressiveChunkSize = void 0 === progressiveChunkSize ? 12800 : progressiveChunkSize;
      this.status = 10;
      this.fatalError = null;
      this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0;
      this.completedRootSegment = null;
      this.abortableTasks = abortSet;
      this.pingedTasks = [];
      this.clientRenderedBoundaries = [];
      this.completedBoundaries = [];
      this.partialBoundaries = [];
      this.trackedPostpones = null;
      this.onError = void 0 === onError ? defaultErrorHandler : onError;
      this.onPostpone = void 0 === onPostpone ? noop2 : onPostpone;
      this.onAllReady = void 0 === onAllReady ? noop2 : onAllReady;
      this.onShellReady = void 0 === onShellReady ? noop2 : onShellReady;
      this.onShellError = void 0 === onShellError ? noop2 : onShellError;
      this.onFatalError = void 0 === onFatalError ? noop2 : onFatalError;
      this.formState = void 0 === formState ? null : formState;
    }
    function createRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError, onPostpone, formState) {
      resumableState = new RequestInstance(
        resumableState,
        renderState,
        rootFormatContext,
        progressiveChunkSize,
        onError,
        onAllReady,
        onShellReady,
        onShellError,
        onFatalError,
        onPostpone,
        formState
      );
      renderState = createPendingSegment(
        resumableState,
        0,
        null,
        rootFormatContext,
        false,
        false
      );
      renderState.parentFlushed = true;
      children = createRenderTask(
        resumableState,
        null,
        children,
        -1,
        null,
        renderState,
        null,
        resumableState.abortableTasks,
        null,
        rootFormatContext,
        null,
        emptyTreeContext,
        null,
        false
      );
      pushComponentStack(children);
      resumableState.pingedTasks.push(children);
      return resumableState;
    }
    function createPrerenderRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError, onAllReady, onShellReady, onShellError, onFatalError, onPostpone) {
      children = createRequest(
        children,
        resumableState,
        renderState,
        rootFormatContext,
        progressiveChunkSize,
        onError,
        onAllReady,
        onShellReady,
        onShellError,
        onFatalError,
        onPostpone,
        void 0
      );
      children.trackedPostpones = {
        workingMap: /* @__PURE__ */ new Map(),
        rootNodes: [],
        rootSlots: null
      };
      return children;
    }
    var currentRequest = null;
    function resolveRequest() {
      if (currentRequest) return currentRequest;
      var store = requestStorage.getStore();
      return store ? store : null;
    }
    function pingTask(request, task) {
      request.pingedTasks.push(task);
      1 === request.pingedTasks.length && (request.flushScheduled = null !== request.destination, null !== request.trackedPostpones || 10 === request.status ? scheduleMicrotask(function() {
        return performWork(request);
      }) : setImmediate(function() {
        return performWork(request);
      }));
    }
    function createSuspenseBoundary(request, fallbackAbortableTasks) {
      return {
        status: 0,
        rootSegmentID: -1,
        parentFlushed: false,
        pendingTasks: 0,
        completedSegments: [],
        byteSize: 0,
        fallbackAbortableTasks,
        errorDigest: null,
        contentState: createHoistableState(),
        fallbackState: createHoistableState(),
        trackedContentKeyPath: null,
        trackedFallbackNode: null
      };
    }
    function createRenderTask(request, thenableState2, node, childIndex, blockedBoundary, blockedSegment, hoistableState, abortSet, keyPath, formatContext, context, treeContext, componentStack, isFallback) {
      request.allPendingTasks++;
      null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
      var task = {
        replay: null,
        node,
        childIndex,
        ping: function() {
          return pingTask(request, task);
        },
        blockedBoundary,
        blockedSegment,
        hoistableState,
        abortSet,
        keyPath,
        formatContext,
        context,
        treeContext,
        componentStack,
        thenableState: thenableState2,
        isFallback
      };
      abortSet.add(task);
      return task;
    }
    function createReplayTask(request, thenableState2, replay, node, childIndex, blockedBoundary, hoistableState, abortSet, keyPath, formatContext, context, treeContext, componentStack, isFallback) {
      request.allPendingTasks++;
      null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
      replay.pendingTasks++;
      var task = {
        replay,
        node,
        childIndex,
        ping: function() {
          return pingTask(request, task);
        },
        blockedBoundary,
        blockedSegment: null,
        hoistableState,
        abortSet,
        keyPath,
        formatContext,
        context,
        treeContext,
        componentStack,
        thenableState: thenableState2,
        isFallback
      };
      abortSet.add(task);
      return task;
    }
    function createPendingSegment(request, index, boundary, parentFormatContext, lastPushedText, textEmbedded) {
      return {
        status: 0,
        id: -1,
        index,
        parentFlushed: false,
        chunks: [],
        children: [],
        parentFormatContext,
        boundary,
        lastPushedText,
        textEmbedded
      };
    }
    function pushComponentStack(task) {
      var node = task.node;
      if ("object" === typeof node && null !== node)
        switch (node.$$typeof) {
          case REACT_ELEMENT_TYPE:
            task.componentStack = { parent: task.componentStack, type: node.type };
        }
    }
    function getThrownInfo(node$jscomp$0) {
      var errorInfo = {};
      node$jscomp$0 && Object.defineProperty(errorInfo, "componentStack", {
        configurable: true,
        enumerable: true,
        get: function() {
          try {
            var info = "", node = node$jscomp$0;
            do
              info += describeComponentStackByType(node.type), node = node.parent;
            while (node);
            var JSCompiler_inline_result = info;
          } catch (x) {
            JSCompiler_inline_result = "\nError generating stack: " + x.message + "\n" + x.stack;
          }
          Object.defineProperty(errorInfo, "componentStack", {
            value: JSCompiler_inline_result
          });
          return JSCompiler_inline_result;
        }
      });
      return errorInfo;
    }
    function logRecoverableError(request, error, errorInfo) {
      request = request.onError;
      error = request(error, errorInfo);
      if (null == error || "string" === typeof error) return error;
    }
    function fatalError(request, error) {
      var onShellError = request.onShellError, onFatalError = request.onFatalError;
      onShellError(error);
      onFatalError(error);
      null !== request.destination ? (request.status = 14, request.destination.destroy(error)) : (request.status = 13, request.fatalError = error);
    }
    function renderWithHooks(request, task, keyPath, Component2, props, secondArg) {
      var prevThenableState = task.thenableState;
      task.thenableState = null;
      currentlyRenderingComponent = {};
      currentlyRenderingTask = task;
      currentlyRenderingRequest = request;
      currentlyRenderingKeyPath = keyPath;
      actionStateCounter = localIdCounter = 0;
      actionStateMatchingIndex = -1;
      thenableIndexCounter = 0;
      thenableState = prevThenableState;
      for (request = Component2(props, secondArg); didScheduleRenderPhaseUpdate; )
        didScheduleRenderPhaseUpdate = false, actionStateCounter = localIdCounter = 0, actionStateMatchingIndex = -1, thenableIndexCounter = 0, numberOfReRenders += 1, workInProgressHook = null, request = Component2(props, secondArg);
      resetHooksState();
      return request;
    }
    function finishFunctionComponent(request, task, keyPath, children, hasId, actionStateCount, actionStateMatchingIndex2) {
      var didEmitActionStateMarkers = false;
      if (0 !== actionStateCount && null !== request.formState) {
        var segment = task.blockedSegment;
        if (null !== segment) {
          didEmitActionStateMarkers = true;
          segment = segment.chunks;
          for (var i = 0; i < actionStateCount; i++)
            i === actionStateMatchingIndex2 ? segment.push(formStateMarkerIsMatching) : segment.push(formStateMarkerIsNotMatching);
        }
      }
      actionStateCount = task.keyPath;
      task.keyPath = keyPath;
      hasId ? (keyPath = task.treeContext, task.treeContext = pushTreeContext(keyPath, 1, 0), renderNode(request, task, children, -1), task.treeContext = keyPath) : didEmitActionStateMarkers ? renderNode(request, task, children, -1) : renderNodeDestructive(request, task, children, -1);
      task.keyPath = actionStateCount;
    }
    function renderElement(request, task, keyPath, type, props, ref) {
      if ("function" === typeof type)
        if (type.prototype && type.prototype.isReactComponent) {
          var newProps = props;
          if ("ref" in props) {
            newProps = {};
            for (var propName in props)
              "ref" !== propName && (newProps[propName] = props[propName]);
          }
          var defaultProps = type.defaultProps;
          if (defaultProps) {
            newProps === props && (newProps = assign({}, newProps, props));
            for (var propName$33 in defaultProps)
              void 0 === newProps[propName$33] && (newProps[propName$33] = defaultProps[propName$33]);
          }
          props = newProps;
          newProps = emptyContextObject;
          defaultProps = type.contextType;
          "object" === typeof defaultProps && null !== defaultProps && (newProps = defaultProps._currentValue);
          newProps = new type(props, newProps);
          var initialState = void 0 !== newProps.state ? newProps.state : null;
          newProps.updater = classComponentUpdater;
          newProps.props = props;
          newProps.state = initialState;
          defaultProps = { queue: [], replace: false };
          newProps._reactInternals = defaultProps;
          ref = type.contextType;
          newProps.context = "object" === typeof ref && null !== ref ? ref._currentValue : emptyContextObject;
          ref = type.getDerivedStateFromProps;
          "function" === typeof ref && (ref = ref(props, initialState), initialState = null === ref || void 0 === ref ? initialState : assign({}, initialState, ref), newProps.state = initialState);
          if ("function" !== typeof type.getDerivedStateFromProps && "function" !== typeof newProps.getSnapshotBeforeUpdate && ("function" === typeof newProps.UNSAFE_componentWillMount || "function" === typeof newProps.componentWillMount))
            if (type = newProps.state, "function" === typeof newProps.componentWillMount && newProps.componentWillMount(), "function" === typeof newProps.UNSAFE_componentWillMount && newProps.UNSAFE_componentWillMount(), type !== newProps.state && classComponentUpdater.enqueueReplaceState(
              newProps,
              newProps.state,
              null
            ), null !== defaultProps.queue && 0 < defaultProps.queue.length)
              if (type = defaultProps.queue, ref = defaultProps.replace, defaultProps.queue = null, defaultProps.replace = false, ref && 1 === type.length)
                newProps.state = type[0];
              else {
                defaultProps = ref ? type[0] : newProps.state;
                initialState = true;
                for (ref = ref ? 1 : 0; ref < type.length; ref++)
                  propName$33 = type[ref], propName$33 = "function" === typeof propName$33 ? propName$33.call(newProps, defaultProps, props, void 0) : propName$33, null != propName$33 && (initialState ? (initialState = false, defaultProps = assign({}, defaultProps, propName$33)) : assign(defaultProps, propName$33));
                newProps.state = defaultProps;
              }
            else defaultProps.queue = null;
          type = newProps.render();
          if (12 === request.status) throw null;
          props = task.keyPath;
          task.keyPath = keyPath;
          renderNodeDestructive(request, task, type, -1);
          task.keyPath = props;
        } else {
          type = renderWithHooks(request, task, keyPath, type, props, void 0);
          if (12 === request.status) throw null;
          finishFunctionComponent(
            request,
            task,
            keyPath,
            type,
            0 !== localIdCounter,
            actionStateCounter,
            actionStateMatchingIndex
          );
        }
      else if ("string" === typeof type)
        if (newProps = task.blockedSegment, null === newProps)
          newProps = props.children, defaultProps = task.formatContext, initialState = task.keyPath, task.formatContext = getChildFormatContext(defaultProps, type, props), task.keyPath = keyPath, renderNode(request, task, newProps, -1), task.formatContext = defaultProps, task.keyPath = initialState;
        else {
          initialState = pushStartInstance(
            newProps.chunks,
            type,
            props,
            request.resumableState,
            request.renderState,
            task.hoistableState,
            task.formatContext,
            newProps.lastPushedText,
            task.isFallback
          );
          newProps.lastPushedText = false;
          defaultProps = task.formatContext;
          ref = task.keyPath;
          task.formatContext = getChildFormatContext(defaultProps, type, props);
          task.keyPath = keyPath;
          renderNode(request, task, initialState, -1);
          task.formatContext = defaultProps;
          task.keyPath = ref;
          a: {
            task = newProps.chunks;
            request = request.resumableState;
            switch (type) {
              case "title":
              case "style":
              case "script":
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "input":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr":
                break a;
              case "body":
                if (1 >= defaultProps.insertionMode) {
                  request.hasBody = true;
                  break a;
                }
                break;
              case "html":
                if (0 === defaultProps.insertionMode) {
                  request.hasHtml = true;
                  break a;
                }
            }
            task.push(endChunkForTag(type));
          }
          newProps.lastPushedText = false;
        }
      else {
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_DEBUG_TRACING_MODE_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE:
            type = task.keyPath;
            task.keyPath = keyPath;
            renderNodeDestructive(request, task, props.children, -1);
            task.keyPath = type;
            return;
          case REACT_OFFSCREEN_TYPE:
            "hidden" !== props.mode && (type = task.keyPath, task.keyPath = keyPath, renderNodeDestructive(request, task, props.children, -1), task.keyPath = type);
            return;
          case REACT_SUSPENSE_LIST_TYPE:
            type = task.keyPath;
            task.keyPath = keyPath;
            renderNodeDestructive(request, task, props.children, -1);
            task.keyPath = type;
            return;
          case REACT_SCOPE_TYPE:
            throw Error("ReactDOMServer does not yet support scope components.");
          case REACT_SUSPENSE_TYPE:
            a: if (null !== task.replay) {
              type = task.keyPath;
              task.keyPath = keyPath;
              keyPath = props.children;
              try {
                renderNode(request, task, keyPath, -1);
              } finally {
                task.keyPath = type;
              }
            } else {
              type = task.keyPath;
              var parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState;
              ref = task.blockedSegment;
              propName$33 = props.fallback;
              props = props.children;
              var fallbackAbortSet = /* @__PURE__ */ new Set();
              propName = createSuspenseBoundary(request, fallbackAbortSet);
              null !== request.trackedPostpones && (propName.trackedContentKeyPath = keyPath);
              var boundarySegment = createPendingSegment(
                request,
                ref.chunks.length,
                propName,
                task.formatContext,
                false,
                false
              );
              ref.children.push(boundarySegment);
              ref.lastPushedText = false;
              var contentRootSegment = createPendingSegment(
                request,
                0,
                null,
                task.formatContext,
                false,
                false
              );
              contentRootSegment.parentFlushed = true;
              if (null !== request.trackedPostpones) {
                newProps = [keyPath[0], "Suspense Fallback", keyPath[2]];
                defaultProps = [newProps[1], newProps[2], [], null];
                request.trackedPostpones.workingMap.set(newProps, defaultProps);
                propName.trackedFallbackNode = defaultProps;
                task.blockedSegment = boundarySegment;
                task.keyPath = newProps;
                boundarySegment.status = 6;
                try {
                  renderNode(request, task, propName$33, -1), boundarySegment.lastPushedText && boundarySegment.textEmbedded && boundarySegment.chunks.push(textSeparator), boundarySegment.status = 1;
                } catch (thrownValue) {
                  throw boundarySegment.status = 12 === request.status ? 3 : 4, thrownValue;
                } finally {
                  task.blockedSegment = ref, task.keyPath = type;
                }
                task = createRenderTask(
                  request,
                  null,
                  props,
                  -1,
                  propName,
                  contentRootSegment,
                  propName.contentState,
                  task.abortSet,
                  keyPath,
                  task.formatContext,
                  task.context,
                  task.treeContext,
                  task.componentStack,
                  task.isFallback
                );
                pushComponentStack(task);
                request.pingedTasks.push(task);
              } else {
                task.blockedBoundary = propName;
                task.hoistableState = propName.contentState;
                task.blockedSegment = contentRootSegment;
                task.keyPath = keyPath;
                contentRootSegment.status = 6;
                try {
                  if (renderNode(request, task, props, -1), contentRootSegment.lastPushedText && contentRootSegment.textEmbedded && contentRootSegment.chunks.push(textSeparator), contentRootSegment.status = 1, queueCompletedSegment(propName, contentRootSegment), 0 === propName.pendingTasks && 0 === propName.status) {
                    propName.status = 1;
                    break a;
                  }
                } catch (thrownValue$28) {
                  propName.status = 4, 12 === request.status ? (contentRootSegment.status = 3, newProps = request.fatalError) : (contentRootSegment.status = 4, newProps = thrownValue$28), defaultProps = getThrownInfo(task.componentStack), initialState = logRecoverableError(
                    request,
                    newProps,
                    defaultProps
                  ), propName.errorDigest = initialState, untrackBoundary(request, propName);
                } finally {
                  task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.blockedSegment = ref, task.keyPath = type;
                }
                task = createRenderTask(
                  request,
                  null,
                  propName$33,
                  -1,
                  parentBoundary,
                  boundarySegment,
                  propName.fallbackState,
                  fallbackAbortSet,
                  [keyPath[0], "Suspense Fallback", keyPath[2]],
                  task.formatContext,
                  task.context,
                  task.treeContext,
                  task.componentStack,
                  true
                );
                pushComponentStack(task);
                request.pingedTasks.push(task);
              }
            }
            return;
        }
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              if ("ref" in props)
                for (boundarySegment in newProps = {}, props)
                  "ref" !== boundarySegment && (newProps[boundarySegment] = props[boundarySegment]);
              else newProps = props;
              type = renderWithHooks(
                request,
                task,
                keyPath,
                type.render,
                newProps,
                ref
              );
              finishFunctionComponent(
                request,
                task,
                keyPath,
                type,
                0 !== localIdCounter,
                actionStateCounter,
                actionStateMatchingIndex
              );
              return;
            case REACT_MEMO_TYPE:
              renderElement(request, task, keyPath, type.type, props, ref);
              return;
            case REACT_PROVIDER_TYPE:
            case REACT_CONTEXT_TYPE:
              defaultProps = props.children;
              newProps = task.keyPath;
              props = props.value;
              initialState = type._currentValue;
              type._currentValue = props;
              ref = currentActiveSnapshot;
              currentActiveSnapshot = type = {
                parent: ref,
                depth: null === ref ? 0 : ref.depth + 1,
                context: type,
                parentValue: initialState,
                value: props
              };
              task.context = type;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, defaultProps, -1);
              request = currentActiveSnapshot;
              if (null === request)
                throw Error(
                  "Tried to pop a Context at the root of the app. This is a bug in React."
                );
              request.context._currentValue = request.parentValue;
              request = currentActiveSnapshot = request.parent;
              task.context = request;
              task.keyPath = newProps;
              return;
            case REACT_CONSUMER_TYPE:
              props = props.children;
              type = props(type._context._currentValue);
              props = task.keyPath;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, type, -1);
              task.keyPath = props;
              return;
            case REACT_LAZY_TYPE:
              newProps = type._init;
              type = newProps(type._payload);
              if (12 === request.status) throw null;
              renderElement(request, task, keyPath, type, props, ref);
              return;
          }
        throw Error(
          "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((null == type ? type : typeof type) + ".")
        );
      }
    }
    function resumeNode(request, task, segmentId, node, childIndex) {
      var prevReplay = task.replay, blockedBoundary = task.blockedBoundary, resumedSegment = createPendingSegment(
        request,
        0,
        null,
        task.formatContext,
        false,
        false
      );
      resumedSegment.id = segmentId;
      resumedSegment.parentFlushed = true;
      try {
        task.replay = null, task.blockedSegment = resumedSegment, renderNode(request, task, node, childIndex), resumedSegment.status = 1, null === blockedBoundary ? request.completedRootSegment = resumedSegment : (queueCompletedSegment(blockedBoundary, resumedSegment), blockedBoundary.parentFlushed && request.partialBoundaries.push(blockedBoundary));
      } finally {
        task.replay = prevReplay, task.blockedSegment = null;
      }
    }
    function renderNodeDestructive(request, task, node, childIndex) {
      null !== task.replay && "number" === typeof task.replay.slots ? resumeNode(request, task, task.replay.slots, node, childIndex) : (task.node = node, task.childIndex = childIndex, node = task.componentStack, pushComponentStack(task), retryNode(request, task), task.componentStack = node);
    }
    function retryNode(request, task) {
      var node = task.node, childIndex = task.childIndex;
      if (null !== node) {
        if ("object" === typeof node) {
          switch (node.$$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = node.type, key = node.key, props = node.props;
              node = props.ref;
              var ref = void 0 !== node ? node : null, name = getComponentNameFromType(type), keyOrIndex = null == key ? -1 === childIndex ? 0 : childIndex : key;
              key = [task.keyPath, name, keyOrIndex];
              if (null !== task.replay)
                a: {
                  var replay = task.replay;
                  childIndex = replay.nodes;
                  for (node = 0; node < childIndex.length; node++) {
                    var node$jscomp$0 = childIndex[node];
                    if (keyOrIndex === node$jscomp$0[1]) {
                      if (4 === node$jscomp$0.length) {
                        if (null !== name && name !== node$jscomp$0[0])
                          throw Error(
                            "Expected the resume to render <" + node$jscomp$0[0] + "> in this slot but instead it rendered <" + name + ">. The tree doesn't match so React will fallback to client rendering."
                          );
                        var childNodes = node$jscomp$0[2];
                        name = node$jscomp$0[3];
                        keyOrIndex = task.node;
                        task.replay = {
                          nodes: childNodes,
                          slots: name,
                          pendingTasks: 1
                        };
                        try {
                          renderElement(request, task, key, type, props, ref);
                          if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                            throw Error(
                              "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                            );
                          task.replay.pendingTasks--;
                        } catch (x) {
                          if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then))
                            throw task.node === keyOrIndex && (task.replay = replay), x;
                          task.replay.pendingTasks--;
                          props = getThrownInfo(task.componentStack);
                          key = task.blockedBoundary;
                          type = x;
                          props = logRecoverableError(request, type, props);
                          abortRemainingReplayNodes(
                            request,
                            key,
                            childNodes,
                            name,
                            type,
                            props
                          );
                        }
                        task.replay = replay;
                      } else {
                        if (type !== REACT_SUSPENSE_TYPE)
                          throw Error(
                            "Expected the resume to render <Suspense> in this slot but instead it rendered <" + (getComponentNameFromType(type) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering."
                          );
                        b: {
                          replay = void 0;
                          type = node$jscomp$0[5];
                          ref = node$jscomp$0[2];
                          name = node$jscomp$0[3];
                          keyOrIndex = null === node$jscomp$0[4] ? [] : node$jscomp$0[4][2];
                          node$jscomp$0 = null === node$jscomp$0[4] ? null : node$jscomp$0[4][3];
                          var prevKeyPath = task.keyPath, previousReplaySet = task.replay, parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState, content = props.children;
                          props = props.fallback;
                          var fallbackAbortSet = /* @__PURE__ */ new Set(), resumedBoundary = createSuspenseBoundary(
                            request,
                            fallbackAbortSet
                          );
                          resumedBoundary.parentFlushed = true;
                          resumedBoundary.rootSegmentID = type;
                          task.blockedBoundary = resumedBoundary;
                          task.hoistableState = resumedBoundary.contentState;
                          task.keyPath = key;
                          task.replay = {
                            nodes: ref,
                            slots: name,
                            pendingTasks: 1
                          };
                          try {
                            renderNode(request, task, content, -1);
                            if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                              throw Error(
                                "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                              );
                            task.replay.pendingTasks--;
                            if (0 === resumedBoundary.pendingTasks && 0 === resumedBoundary.status) {
                              resumedBoundary.status = 1;
                              request.completedBoundaries.push(resumedBoundary);
                              break b;
                            }
                          } catch (error) {
                            resumedBoundary.status = 4, childNodes = getThrownInfo(task.componentStack), replay = logRecoverableError(
                              request,
                              error,
                              childNodes
                            ), resumedBoundary.errorDigest = replay, task.replay.pendingTasks--, request.clientRenderedBoundaries.push(
                              resumedBoundary
                            );
                          } finally {
                            task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.replay = previousReplaySet, task.keyPath = prevKeyPath;
                          }
                          task = createReplayTask(
                            request,
                            null,
                            {
                              nodes: keyOrIndex,
                              slots: node$jscomp$0,
                              pendingTasks: 0
                            },
                            props,
                            -1,
                            parentBoundary,
                            resumedBoundary.fallbackState,
                            fallbackAbortSet,
                            [key[0], "Suspense Fallback", key[2]],
                            task.formatContext,
                            task.context,
                            task.treeContext,
                            task.componentStack,
                            true
                          );
                          pushComponentStack(task);
                          request.pingedTasks.push(task);
                        }
                      }
                      childIndex.splice(node, 1);
                      break a;
                    }
                  }
                }
              else renderElement(request, task, key, type, props, ref);
              return;
            case REACT_PORTAL_TYPE:
              throw Error(
                "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render."
              );
            case REACT_LAZY_TYPE:
              childNodes = node._init;
              node = childNodes(node._payload);
              if (12 === request.status) throw null;
              renderNodeDestructive(request, task, node, childIndex);
              return;
          }
          if (isArrayImpl(node)) {
            renderChildrenArray(request, task, node, childIndex);
            return;
          }
          null === node || "object" !== typeof node ? childNodes = null : (childNodes = MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL] || node["@@iterator"], childNodes = "function" === typeof childNodes ? childNodes : null);
          if (childNodes && (childNodes = childNodes.call(node))) {
            node = childNodes.next();
            if (!node.done) {
              props = [];
              do
                props.push(node.value), node = childNodes.next();
              while (!node.done);
              renderChildrenArray(request, task, props, childIndex);
            }
            return;
          }
          if ("function" === typeof node.then)
            return task.thenableState = null, renderNodeDestructive(request, task, unwrapThenable(node), childIndex);
          if (node.$$typeof === REACT_CONTEXT_TYPE)
            return renderNodeDestructive(
              request,
              task,
              node._currentValue,
              childIndex
            );
          childIndex = Object.prototype.toString.call(node);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === childIndex ? "object with keys {" + Object.keys(node).join(", ") + "}" : childIndex) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        if ("string" === typeof node)
          childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
            childIndex.chunks,
            node,
            request.renderState,
            childIndex.lastPushedText
          ));
        else if ("number" === typeof node || "bigint" === typeof node)
          childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
            childIndex.chunks,
            "" + node,
            request.renderState,
            childIndex.lastPushedText
          ));
      }
    }
    function renderChildrenArray(request, task, children, childIndex) {
      var prevKeyPath = task.keyPath;
      if (-1 !== childIndex && (task.keyPath = [task.keyPath, "Fragment", childIndex], null !== task.replay)) {
        for (var replay = task.replay, replayNodes = replay.nodes, j = 0; j < replayNodes.length; j++) {
          var node = replayNodes[j];
          if (node[1] === childIndex) {
            childIndex = node[2];
            node = node[3];
            task.replay = { nodes: childIndex, slots: node, pendingTasks: 1 };
            try {
              renderChildrenArray(request, task, children, -1);
              if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                throw Error(
                  "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                );
              task.replay.pendingTasks--;
            } catch (x) {
              if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then))
                throw x;
              task.replay.pendingTasks--;
              children = getThrownInfo(task.componentStack);
              var boundary = task.blockedBoundary, error = x;
              children = logRecoverableError(request, error, children);
              abortRemainingReplayNodes(
                request,
                boundary,
                childIndex,
                node,
                error,
                children
              );
            }
            task.replay = replay;
            replayNodes.splice(j, 1);
            break;
          }
        }
        task.keyPath = prevKeyPath;
        return;
      }
      replay = task.treeContext;
      replayNodes = children.length;
      if (null !== task.replay && (j = task.replay.slots, null !== j && "object" === typeof j)) {
        for (childIndex = 0; childIndex < replayNodes; childIndex++)
          node = children[childIndex], task.treeContext = pushTreeContext(replay, replayNodes, childIndex), boundary = j[childIndex], "number" === typeof boundary ? (resumeNode(request, task, boundary, node, childIndex), delete j[childIndex]) : renderNode(request, task, node, childIndex);
        task.treeContext = replay;
        task.keyPath = prevKeyPath;
        return;
      }
      for (j = 0; j < replayNodes; j++)
        childIndex = children[j], task.treeContext = pushTreeContext(replay, replayNodes, j), renderNode(request, task, childIndex, j);
      task.treeContext = replay;
      task.keyPath = prevKeyPath;
    }
    function untrackBoundary(request, boundary) {
      request = request.trackedPostpones;
      null !== request && (boundary = boundary.trackedContentKeyPath, null !== boundary && (boundary = request.workingMap.get(boundary), void 0 !== boundary && (boundary.length = 4, boundary[2] = [], boundary[3] = null)));
    }
    function spawnNewSuspendedReplayTask(request, task, thenableState2) {
      return createReplayTask(
        request,
        thenableState2,
        task.replay,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.componentStack,
        task.isFallback
      );
    }
    function spawnNewSuspendedRenderTask(request, task, thenableState2) {
      var segment = task.blockedSegment, newSegment = createPendingSegment(
        request,
        segment.chunks.length,
        null,
        task.formatContext,
        segment.lastPushedText,
        true
      );
      segment.children.push(newSegment);
      segment.lastPushedText = false;
      return createRenderTask(
        request,
        thenableState2,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        newSegment,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.componentStack,
        task.isFallback
      );
    }
    function renderNode(request, task, node, childIndex) {
      var previousFormatContext = task.formatContext, previousContext = task.context, previousKeyPath = task.keyPath, previousTreeContext = task.treeContext, previousComponentStack = task.componentStack, segment = task.blockedSegment;
      if (null === segment)
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue) {
          if (resetHooksState(), node = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue, "object" === typeof node && null !== node) {
            if ("function" === typeof node.then) {
              childIndex = getThenableStateAfterSuspending();
              request = spawnNewSuspendedReplayTask(request, task, childIndex).ping;
              node.then(request, request);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === node.message) {
              node = getThenableStateAfterSuspending();
              node = spawnNewSuspendedReplayTask(request, task, node);
              request.pingedTasks.push(node);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
          }
        }
      else {
        var childrenLength = segment.children.length, chunkLength = segment.chunks.length;
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue$48) {
          if (resetHooksState(), segment.children.length = childrenLength, segment.chunks.length = chunkLength, node = thrownValue$48 === SuspenseException ? getSuspendedThenable() : thrownValue$48, "object" === typeof node && null !== node) {
            if ("function" === typeof node.then) {
              childIndex = getThenableStateAfterSuspending();
              request = spawnNewSuspendedRenderTask(request, task, childIndex).ping;
              node.then(request, request);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === node.message) {
              node = getThenableStateAfterSuspending();
              node = spawnNewSuspendedRenderTask(request, task, node);
              request.pingedTasks.push(node);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
          }
        }
      }
      task.formatContext = previousFormatContext;
      task.context = previousContext;
      task.keyPath = previousKeyPath;
      task.treeContext = previousTreeContext;
      switchContext(previousContext);
      throw node;
    }
    function abortTaskSoft(task) {
      var boundary = task.blockedBoundary;
      task = task.blockedSegment;
      null !== task && (task.status = 3, finishedTask(this, boundary, task));
    }
    function abortRemainingReplayNodes(request$jscomp$0, boundary, nodes, slots, error, errorDigest$jscomp$0) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (4 === node.length)
          abortRemainingReplayNodes(
            request$jscomp$0,
            boundary,
            node[2],
            node[3],
            error,
            errorDigest$jscomp$0
          );
        else {
          node = node[5];
          var request = request$jscomp$0, errorDigest = errorDigest$jscomp$0, resumedBoundary = createSuspenseBoundary(request, /* @__PURE__ */ new Set());
          resumedBoundary.parentFlushed = true;
          resumedBoundary.rootSegmentID = node;
          resumedBoundary.status = 4;
          resumedBoundary.errorDigest = errorDigest;
          resumedBoundary.parentFlushed && request.clientRenderedBoundaries.push(resumedBoundary);
        }
      }
      nodes.length = 0;
      if (null !== slots) {
        if (null === boundary)
          throw Error(
            "We should not have any resumable nodes in the shell. This is a bug in React."
          );
        4 !== boundary.status && (boundary.status = 4, boundary.errorDigest = errorDigest$jscomp$0, boundary.parentFlushed && request$jscomp$0.clientRenderedBoundaries.push(boundary));
        if ("object" === typeof slots) for (var index in slots) delete slots[index];
      }
    }
    function abortTask(task, request, error) {
      var boundary = task.blockedBoundary, segment = task.blockedSegment;
      if (null !== segment) {
        if (6 === segment.status) return;
        segment.status = 3;
      }
      segment = getThrownInfo(task.componentStack);
      if (null === boundary) {
        if (13 !== request.status && 14 !== request.status) {
          boundary = task.replay;
          if (null === boundary) {
            logRecoverableError(request, error, segment);
            fatalError(request, error);
            return;
          }
          boundary.pendingTasks--;
          0 === boundary.pendingTasks && 0 < boundary.nodes.length && (task = logRecoverableError(request, error, segment), abortRemainingReplayNodes(
            request,
            null,
            boundary.nodes,
            boundary.slots,
            error,
            task
          ));
          request.pendingRootTasks--;
          0 === request.pendingRootTasks && completeShell(request);
        }
      } else
        boundary.pendingTasks--, 4 !== boundary.status && (boundary.status = 4, task = logRecoverableError(request, error, segment), boundary.status = 4, boundary.errorDigest = task, untrackBoundary(request, boundary), boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary)), boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
          return abortTask(fallbackTask, request, error);
        }), boundary.fallbackAbortableTasks.clear();
      request.allPendingTasks--;
      0 === request.allPendingTasks && completeAll(request);
    }
    function safelyEmitEarlyPreloads(request, shellComplete) {
      try {
        var renderState = request.renderState, onHeaders = renderState.onHeaders;
        if (onHeaders) {
          var headers = renderState.headers;
          if (headers) {
            renderState.headers = null;
            var linkHeader = headers.preconnects;
            headers.fontPreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.fontPreloads);
            headers.highImagePreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.highImagePreloads);
            if (!shellComplete) {
              var queueIter = renderState.styles.values(), queueStep = queueIter.next();
              b: for (; 0 < headers.remainingCapacity && !queueStep.done; queueStep = queueIter.next())
                for (var sheetIter = queueStep.value.sheets.values(), sheetStep = sheetIter.next(); 0 < headers.remainingCapacity && !sheetStep.done; sheetStep = sheetIter.next()) {
                  var sheet = sheetStep.value, props = sheet.props, key = props.href, props$jscomp$0 = sheet.props, header = getPreloadAsHeader(props$jscomp$0.href, "style", {
                    crossOrigin: props$jscomp$0.crossOrigin,
                    integrity: props$jscomp$0.integrity,
                    nonce: props$jscomp$0.nonce,
                    type: props$jscomp$0.type,
                    fetchPriority: props$jscomp$0.fetchPriority,
                    referrerPolicy: props$jscomp$0.referrerPolicy,
                    media: props$jscomp$0.media
                  });
                  if (0 <= (headers.remainingCapacity -= header.length + 2))
                    renderState.resets.style[key] = PRELOAD_NO_CREDS, linkHeader && (linkHeader += ", "), linkHeader += header, renderState.resets.style[key] = "string" === typeof props.crossOrigin || "string" === typeof props.integrity ? [props.crossOrigin, props.integrity] : PRELOAD_NO_CREDS;
                  else break b;
                }
            }
            linkHeader ? onHeaders({ Link: linkHeader }) : onHeaders({});
          }
        }
      } catch (error) {
        logRecoverableError(request, error, {});
      }
    }
    function completeShell(request) {
      null === request.trackedPostpones && safelyEmitEarlyPreloads(request, true);
      request.onShellError = noop2;
      request = request.onShellReady;
      request();
    }
    function completeAll(request) {
      safelyEmitEarlyPreloads(
        request,
        null === request.trackedPostpones ? true : null === request.completedRootSegment || 5 !== request.completedRootSegment.status
      );
      request = request.onAllReady;
      request();
    }
    function queueCompletedSegment(boundary, segment) {
      if (0 === segment.chunks.length && 1 === segment.children.length && null === segment.children[0].boundary && -1 === segment.children[0].id) {
        var childSegment = segment.children[0];
        childSegment.id = segment.id;
        childSegment.parentFlushed = true;
        1 === childSegment.status && queueCompletedSegment(boundary, childSegment);
      } else boundary.completedSegments.push(segment);
    }
    function finishedTask(request, boundary, segment) {
      if (null === boundary) {
        if (null !== segment && segment.parentFlushed) {
          if (null !== request.completedRootSegment)
            throw Error(
              "There can only be one root segment. This is a bug in React."
            );
          request.completedRootSegment = segment;
        }
        request.pendingRootTasks--;
        0 === request.pendingRootTasks && completeShell(request);
      } else
        boundary.pendingTasks--, 4 !== boundary.status && (0 === boundary.pendingTasks ? (0 === boundary.status && (boundary.status = 1), null !== segment && segment.parentFlushed && 1 === segment.status && queueCompletedSegment(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), 1 === boundary.status && (boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request), boundary.fallbackAbortableTasks.clear())) : null !== segment && segment.parentFlushed && 1 === segment.status && (queueCompletedSegment(boundary, segment), 1 === boundary.completedSegments.length && boundary.parentFlushed && request.partialBoundaries.push(boundary)));
      request.allPendingTasks--;
      0 === request.allPendingTasks && completeAll(request);
    }
    function performWork(request$jscomp$2) {
      if (14 !== request$jscomp$2.status && 13 !== request$jscomp$2.status) {
        var prevContext = currentActiveSnapshot, prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = HooksDispatcher;
        var prevAsyncDispatcher = ReactSharedInternals.A;
        ReactSharedInternals.A = DefaultAsyncDispatcher;
        var prevRequest = currentRequest;
        currentRequest = request$jscomp$2;
        var prevResumableState = currentResumableState;
        currentResumableState = request$jscomp$2.resumableState;
        try {
          var pingedTasks = request$jscomp$2.pingedTasks, i;
          for (i = 0; i < pingedTasks.length; i++) {
            var task = pingedTasks[i], request = request$jscomp$2, segment = task.blockedSegment;
            if (null === segment) {
              var request$jscomp$0 = request;
              if (0 !== task.replay.pendingTasks) {
                switchContext(task.context);
                try {
                  "number" === typeof task.replay.slots ? resumeNode(
                    request$jscomp$0,
                    task,
                    task.replay.slots,
                    task.node,
                    task.childIndex
                  ) : retryNode(request$jscomp$0, task);
                  if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                    throw Error(
                      "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                    );
                  task.replay.pendingTasks--;
                  task.abortSet.delete(task);
                  finishedTask(request$jscomp$0, task.blockedBoundary, null);
                } catch (thrownValue) {
                  resetHooksState();
                  var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
                  if ("object" === typeof x && null !== x && "function" === typeof x.then) {
                    var ping = task.ping;
                    x.then(ping, ping);
                    task.thenableState = getThenableStateAfterSuspending();
                  } else {
                    task.replay.pendingTasks--;
                    task.abortSet.delete(task);
                    var errorInfo = getThrownInfo(task.componentStack);
                    request = void 0;
                    var request$jscomp$1 = request$jscomp$0, boundary = task.blockedBoundary, error$jscomp$0 = 12 === request$jscomp$0.status ? request$jscomp$0.fatalError : x, replayNodes = task.replay.nodes, resumeSlots = task.replay.slots;
                    request = logRecoverableError(
                      request$jscomp$1,
                      error$jscomp$0,
                      errorInfo
                    );
                    abortRemainingReplayNodes(
                      request$jscomp$1,
                      boundary,
                      replayNodes,
                      resumeSlots,
                      error$jscomp$0,
                      request
                    );
                    request$jscomp$0.pendingRootTasks--;
                    0 === request$jscomp$0.pendingRootTasks && completeShell(request$jscomp$0);
                    request$jscomp$0.allPendingTasks--;
                    0 === request$jscomp$0.allPendingTasks && completeAll(request$jscomp$0);
                  }
                } finally {
                }
              }
            } else if (request$jscomp$0 = void 0, request$jscomp$1 = segment, 0 === request$jscomp$1.status) {
              request$jscomp$1.status = 6;
              switchContext(task.context);
              var childrenLength = request$jscomp$1.children.length, chunkLength = request$jscomp$1.chunks.length;
              try {
                retryNode(request, task), request$jscomp$1.lastPushedText && request$jscomp$1.textEmbedded && request$jscomp$1.chunks.push(textSeparator), task.abortSet.delete(task), request$jscomp$1.status = 1, finishedTask(request, task.blockedBoundary, request$jscomp$1);
              } catch (thrownValue) {
                resetHooksState();
                request$jscomp$1.children.length = childrenLength;
                request$jscomp$1.chunks.length = chunkLength;
                var x$jscomp$0 = thrownValue === SuspenseException ? getSuspendedThenable() : 12 === request.status ? request.fatalError : thrownValue;
                if ("object" === typeof x$jscomp$0 && null !== x$jscomp$0 && "function" === typeof x$jscomp$0.then) {
                  request$jscomp$1.status = 0;
                  task.thenableState = getThenableStateAfterSuspending();
                  var ping$jscomp$0 = task.ping;
                  x$jscomp$0.then(ping$jscomp$0, ping$jscomp$0);
                } else {
                  var errorInfo$jscomp$0 = getThrownInfo(task.componentStack);
                  task.abortSet.delete(task);
                  request$jscomp$1.status = 4;
                  var boundary$jscomp$0 = task.blockedBoundary;
                  request$jscomp$0 = logRecoverableError(
                    request,
                    x$jscomp$0,
                    errorInfo$jscomp$0
                  );
                  null === boundary$jscomp$0 ? fatalError(request, x$jscomp$0) : (boundary$jscomp$0.pendingTasks--, 4 !== boundary$jscomp$0.status && (boundary$jscomp$0.status = 4, boundary$jscomp$0.errorDigest = request$jscomp$0, untrackBoundary(request, boundary$jscomp$0), boundary$jscomp$0.parentFlushed && request.clientRenderedBoundaries.push(
                    boundary$jscomp$0
                  )));
                  request.allPendingTasks--;
                  0 === request.allPendingTasks && completeAll(request);
                }
              } finally {
              }
            }
          }
          pingedTasks.splice(0, i);
          null !== request$jscomp$2.destination && flushCompletedQueues(request$jscomp$2, request$jscomp$2.destination);
        } catch (error) {
          logRecoverableError(request$jscomp$2, error, {}), fatalError(request$jscomp$2, error);
        } finally {
          currentResumableState = prevResumableState, ReactSharedInternals.H = prevDispatcher, ReactSharedInternals.A = prevAsyncDispatcher, prevDispatcher === HooksDispatcher && switchContext(prevContext), currentRequest = prevRequest;
        }
      }
    }
    function flushSubtree(request, destination, segment, hoistableState) {
      segment.parentFlushed = true;
      switch (segment.status) {
        case 0:
          segment.id = request.nextSegmentId++;
        case 5:
          return hoistableState = segment.id, segment.lastPushedText = false, segment.textEmbedded = false, request = request.renderState, writeChunk(destination, placeholder1), writeChunk(destination, request.placeholderPrefix), request = hoistableState.toString(16), writeChunk(destination, request), writeChunkAndReturn(destination, placeholder2);
        case 1:
          segment.status = 2;
          var r = true, chunks = segment.chunks, chunkIdx = 0;
          segment = segment.children;
          for (var childIdx = 0; childIdx < segment.length; childIdx++) {
            for (r = segment[childIdx]; chunkIdx < r.index; chunkIdx++)
              writeChunk(destination, chunks[chunkIdx]);
            r = flushSegment(request, destination, r, hoistableState);
          }
          for (; chunkIdx < chunks.length - 1; chunkIdx++)
            writeChunk(destination, chunks[chunkIdx]);
          chunkIdx < chunks.length && (r = writeChunkAndReturn(destination, chunks[chunkIdx]));
          return r;
        default:
          throw Error(
            "Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React."
          );
      }
    }
    function flushSegment(request, destination, segment, hoistableState) {
      var boundary = segment.boundary;
      if (null === boundary)
        return flushSubtree(request, destination, segment, hoistableState);
      boundary.parentFlushed = true;
      if (4 === boundary.status)
        boundary = boundary.errorDigest, writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary), writeChunk(destination, clientRenderedSuspenseBoundaryError1), boundary && (writeChunk(destination, clientRenderedSuspenseBoundaryError1A), writeChunk(destination, escapeTextForBrowser(boundary)), writeChunk(
          destination,
          clientRenderedSuspenseBoundaryErrorAttrInterstitial
        )), writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2), flushSubtree(request, destination, segment, hoistableState);
      else if (1 !== boundary.status)
        0 === boundary.status && (boundary.rootSegmentID = request.nextSegmentId++), 0 < boundary.completedSegments.length && request.partialBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
          destination,
          request.renderState,
          boundary.rootSegmentID
        ), hoistableState && (boundary = boundary.fallbackState, boundary.styles.forEach(hoistStyleQueueDependency, hoistableState), boundary.stylesheets.forEach(
          hoistStylesheetDependency,
          hoistableState
        )), flushSubtree(request, destination, segment, hoistableState);
      else if (boundary.byteSize > request.progressiveChunkSize)
        boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
          destination,
          request.renderState,
          boundary.rootSegmentID
        ), flushSubtree(request, destination, segment, hoistableState);
      else {
        hoistableState && (segment = boundary.contentState, segment.styles.forEach(hoistStyleQueueDependency, hoistableState), segment.stylesheets.forEach(hoistStylesheetDependency, hoistableState));
        writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
        segment = boundary.completedSegments;
        if (1 !== segment.length)
          throw Error(
            "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
          );
        flushSegment(request, destination, segment[0], hoistableState);
      }
      return writeChunkAndReturn(destination, endSuspenseBoundary);
    }
    function flushSegmentContainer(request, destination, segment, hoistableState) {
      writeStartSegment(
        destination,
        request.renderState,
        segment.parentFormatContext,
        segment.id
      );
      flushSegment(request, destination, segment, hoistableState);
      return writeEndSegment(destination, segment.parentFormatContext);
    }
    function flushCompletedBoundary(request, destination, boundary) {
      for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++)
        flushPartiallyCompletedSegment(
          request,
          destination,
          boundary,
          completedSegments[i]
        );
      completedSegments.length = 0;
      writeHoistablesForBoundary(
        destination,
        boundary.contentState,
        request.renderState
      );
      completedSegments = request.resumableState;
      request = request.renderState;
      i = boundary.rootSegmentID;
      boundary = boundary.contentState;
      var requiresStyleInsertion = request.stylesToHoist;
      request.stylesToHoist = false;
      writeChunk(destination, request.startInlineScript);
      requiresStyleInsertion ? 0 === (completedSegments.instructions & 2) ? (completedSegments.instructions |= 10, writeChunk(destination, completeBoundaryWithStylesScript1FullBoth)) : 0 === (completedSegments.instructions & 8) ? (completedSegments.instructions |= 8, writeChunk(destination, completeBoundaryWithStylesScript1FullPartial)) : writeChunk(destination, completeBoundaryWithStylesScript1Partial) : 0 === (completedSegments.instructions & 2) ? (completedSegments.instructions |= 2, writeChunk(destination, completeBoundaryScript1Full)) : writeChunk(destination, completeBoundaryScript1Partial);
      completedSegments = i.toString(16);
      writeChunk(destination, request.boundaryPrefix);
      writeChunk(destination, completedSegments);
      writeChunk(destination, completeBoundaryScript2);
      writeChunk(destination, request.segmentPrefix);
      writeChunk(destination, completedSegments);
      requiresStyleInsertion ? (writeChunk(destination, completeBoundaryScript3a), writeStyleResourceDependenciesInJS(destination, boundary)) : writeChunk(destination, completeBoundaryScript3b);
      boundary = writeChunkAndReturn(destination, completeBoundaryScriptEnd);
      return writeBootstrap(destination, request) && boundary;
    }
    function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
      if (2 === segment.status) return true;
      var hoistableState = boundary.contentState, segmentID = segment.id;
      if (-1 === segmentID) {
        if (-1 === (segment.id = boundary.rootSegmentID))
          throw Error(
            "A root segment ID must have been assigned by now. This is a bug in React."
          );
        return flushSegmentContainer(request, destination, segment, hoistableState);
      }
      if (segmentID === boundary.rootSegmentID)
        return flushSegmentContainer(request, destination, segment, hoistableState);
      flushSegmentContainer(request, destination, segment, hoistableState);
      boundary = request.resumableState;
      request = request.renderState;
      writeChunk(destination, request.startInlineScript);
      0 === (boundary.instructions & 1) ? (boundary.instructions |= 1, writeChunk(destination, completeSegmentScript1Full)) : writeChunk(destination, completeSegmentScript1Partial);
      writeChunk(destination, request.segmentPrefix);
      segmentID = segmentID.toString(16);
      writeChunk(destination, segmentID);
      writeChunk(destination, completeSegmentScript2);
      writeChunk(destination, request.placeholderPrefix);
      writeChunk(destination, segmentID);
      destination = writeChunkAndReturn(destination, completeSegmentScriptEnd);
      return destination;
    }
    function flushCompletedQueues(request, destination) {
      currentView = new Uint8Array(2048);
      writtenBytes = 0;
      destinationHasCapacity$1 = true;
      try {
        if (!(0 < request.pendingRootTasks)) {
          var i, completedRootSegment = request.completedRootSegment;
          if (null !== completedRootSegment) {
            if (5 === completedRootSegment.status) return;
            var renderState = request.renderState, htmlChunks = renderState.htmlChunks, headChunks = renderState.headChunks, i$jscomp$0;
            if (htmlChunks) {
              for (i$jscomp$0 = 0; i$jscomp$0 < htmlChunks.length; i$jscomp$0++)
                writeChunk(destination, htmlChunks[i$jscomp$0]);
              if (headChunks)
                for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
                  writeChunk(destination, headChunks[i$jscomp$0]);
              else
                writeChunk(destination, startChunkForTag("head")), writeChunk(destination, endOfStartTag);
            } else if (headChunks)
              for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
                writeChunk(destination, headChunks[i$jscomp$0]);
            var charsetChunks = renderState.charsetChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < charsetChunks.length; i$jscomp$0++)
              writeChunk(destination, charsetChunks[i$jscomp$0]);
            charsetChunks.length = 0;
            renderState.preconnects.forEach(flushResource, destination);
            renderState.preconnects.clear();
            var viewportChunks = renderState.viewportChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < viewportChunks.length; i$jscomp$0++)
              writeChunk(destination, viewportChunks[i$jscomp$0]);
            viewportChunks.length = 0;
            renderState.fontPreloads.forEach(flushResource, destination);
            renderState.fontPreloads.clear();
            renderState.highImagePreloads.forEach(flushResource, destination);
            renderState.highImagePreloads.clear();
            renderState.styles.forEach(flushStylesInPreamble, destination);
            var importMapChunks = renderState.importMapChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < importMapChunks.length; i$jscomp$0++)
              writeChunk(destination, importMapChunks[i$jscomp$0]);
            importMapChunks.length = 0;
            renderState.bootstrapScripts.forEach(flushResource, destination);
            renderState.scripts.forEach(flushResource, destination);
            renderState.scripts.clear();
            renderState.bulkPreloads.forEach(flushResource, destination);
            renderState.bulkPreloads.clear();
            var hoistableChunks = renderState.hoistableChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < hoistableChunks.length; i$jscomp$0++)
              writeChunk(destination, hoistableChunks[i$jscomp$0]);
            hoistableChunks.length = 0;
            htmlChunks && null === headChunks && writeChunk(destination, endChunkForTag("head"));
            flushSegment(request, destination, completedRootSegment, null);
            request.completedRootSegment = null;
            writeBootstrap(destination, request.renderState);
          }
          var renderState$jscomp$0 = request.renderState;
          completedRootSegment = 0;
          var viewportChunks$jscomp$0 = renderState$jscomp$0.viewportChunks;
          for (completedRootSegment = 0; completedRootSegment < viewportChunks$jscomp$0.length; completedRootSegment++)
            writeChunk(destination, viewportChunks$jscomp$0[completedRootSegment]);
          viewportChunks$jscomp$0.length = 0;
          renderState$jscomp$0.preconnects.forEach(flushResource, destination);
          renderState$jscomp$0.preconnects.clear();
          renderState$jscomp$0.fontPreloads.forEach(flushResource, destination);
          renderState$jscomp$0.fontPreloads.clear();
          renderState$jscomp$0.highImagePreloads.forEach(
            flushResource,
            destination
          );
          renderState$jscomp$0.highImagePreloads.clear();
          renderState$jscomp$0.styles.forEach(preloadLateStyles, destination);
          renderState$jscomp$0.scripts.forEach(flushResource, destination);
          renderState$jscomp$0.scripts.clear();
          renderState$jscomp$0.bulkPreloads.forEach(flushResource, destination);
          renderState$jscomp$0.bulkPreloads.clear();
          var hoistableChunks$jscomp$0 = renderState$jscomp$0.hoistableChunks;
          for (completedRootSegment = 0; completedRootSegment < hoistableChunks$jscomp$0.length; completedRootSegment++)
            writeChunk(destination, hoistableChunks$jscomp$0[completedRootSegment]);
          hoistableChunks$jscomp$0.length = 0;
          var clientRenderedBoundaries = request.clientRenderedBoundaries;
          for (i = 0; i < clientRenderedBoundaries.length; i++) {
            var boundary = clientRenderedBoundaries[i];
            renderState$jscomp$0 = destination;
            var resumableState = request.resumableState, renderState$jscomp$1 = request.renderState, id3 = boundary.rootSegmentID, errorDigest = boundary.errorDigest;
            writeChunk(
              renderState$jscomp$0,
              renderState$jscomp$1.startInlineScript
            );
            0 === (resumableState.instructions & 4) ? (resumableState.instructions |= 4, writeChunk(renderState$jscomp$0, clientRenderScript1Full)) : writeChunk(renderState$jscomp$0, clientRenderScript1Partial);
            writeChunk(renderState$jscomp$0, renderState$jscomp$1.boundaryPrefix);
            writeChunk(renderState$jscomp$0, id3.toString(16));
            writeChunk(renderState$jscomp$0, clientRenderScript1A);
            errorDigest && (writeChunk(
              renderState$jscomp$0,
              clientRenderErrorScriptArgInterstitial
            ), writeChunk(
              renderState$jscomp$0,
              escapeJSStringsForInstructionScripts(errorDigest || "")
            ));
            var JSCompiler_inline_result = writeChunkAndReturn(
              renderState$jscomp$0,
              clientRenderScriptEnd
            );
            if (!JSCompiler_inline_result) {
              request.destination = null;
              i++;
              clientRenderedBoundaries.splice(0, i);
              return;
            }
          }
          clientRenderedBoundaries.splice(0, i);
          var completedBoundaries = request.completedBoundaries;
          for (i = 0; i < completedBoundaries.length; i++)
            if (!flushCompletedBoundary(request, destination, completedBoundaries[i])) {
              request.destination = null;
              i++;
              completedBoundaries.splice(0, i);
              return;
            }
          completedBoundaries.splice(0, i);
          completeWriting(destination);
          currentView = new Uint8Array(2048);
          writtenBytes = 0;
          destinationHasCapacity$1 = true;
          var partialBoundaries = request.partialBoundaries;
          for (i = 0; i < partialBoundaries.length; i++) {
            var boundary$51 = partialBoundaries[i];
            a: {
              clientRenderedBoundaries = request;
              boundary = destination;
              var completedSegments = boundary$51.completedSegments;
              for (JSCompiler_inline_result = 0; JSCompiler_inline_result < completedSegments.length; JSCompiler_inline_result++)
                if (!flushPartiallyCompletedSegment(
                  clientRenderedBoundaries,
                  boundary,
                  boundary$51,
                  completedSegments[JSCompiler_inline_result]
                )) {
                  JSCompiler_inline_result++;
                  completedSegments.splice(0, JSCompiler_inline_result);
                  var JSCompiler_inline_result$jscomp$0 = false;
                  break a;
                }
              completedSegments.splice(0, JSCompiler_inline_result);
              JSCompiler_inline_result$jscomp$0 = writeHoistablesForBoundary(
                boundary,
                boundary$51.contentState,
                clientRenderedBoundaries.renderState
              );
            }
            if (!JSCompiler_inline_result$jscomp$0) {
              request.destination = null;
              i++;
              partialBoundaries.splice(0, i);
              return;
            }
          }
          partialBoundaries.splice(0, i);
          var largeBoundaries = request.completedBoundaries;
          for (i = 0; i < largeBoundaries.length; i++)
            if (!flushCompletedBoundary(request, destination, largeBoundaries[i])) {
              request.destination = null;
              i++;
              largeBoundaries.splice(0, i);
              return;
            }
          largeBoundaries.splice(0, i);
        }
      } finally {
        0 === request.allPendingTasks && 0 === request.pingedTasks.length && 0 === request.clientRenderedBoundaries.length && 0 === request.completedBoundaries.length ? (request.flushScheduled = false, i = request.resumableState, i.hasBody && writeChunk(destination, endChunkForTag("body")), i.hasHtml && writeChunk(destination, endChunkForTag("html")), completeWriting(destination), flushBuffered(destination), request.status = 14, destination.end(), request.destination = null) : (completeWriting(destination), flushBuffered(destination));
      }
    }
    function startWork(request) {
      request.flushScheduled = null !== request.destination;
      scheduleMicrotask(function() {
        return requestStorage.run(request, performWork, request);
      });
      setImmediate(function() {
        10 === request.status && (request.status = 11);
        null === request.trackedPostpones && requestStorage.run(
          request,
          enqueueEarlyPreloadsAfterInitialWork,
          request
        );
      });
    }
    function enqueueEarlyPreloadsAfterInitialWork(request) {
      safelyEmitEarlyPreloads(request, 0 === request.pendingRootTasks);
    }
    function enqueueFlush(request) {
      false === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination && (request.flushScheduled = true, setImmediate(function() {
        var destination = request.destination;
        destination ? flushCompletedQueues(request, destination) : request.flushScheduled = false;
      }));
    }
    function startFlowing(request, destination) {
      if (13 === request.status)
        request.status = 14, destination.destroy(request.fatalError);
      else if (14 !== request.status && null === request.destination) {
        request.destination = destination;
        try {
          flushCompletedQueues(request, destination);
        } catch (error) {
          logRecoverableError(request, error, {}), fatalError(request, error);
        }
      }
    }
    function abort(request, reason) {
      if (11 === request.status || 10 === request.status) request.status = 12;
      try {
        var abortableTasks = request.abortableTasks;
        if (0 < abortableTasks.size) {
          var error = void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason;
          request.fatalError = error;
          abortableTasks.forEach(function(task) {
            return abortTask(task, request, error);
          });
          abortableTasks.clear();
        }
        null !== request.destination && flushCompletedQueues(request, request.destination);
      } catch (error$53) {
        logRecoverableError(request, error$53, {}), fatalError(request, error$53);
      }
    }
    function ensureCorrectIsomorphicReactVersion() {
      var isomorphicReactPackageVersion = React3.version;
      if ("19.0.0" !== isomorphicReactPackageVersion)
        throw Error(
          'Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:\n  - react:      ' + (isomorphicReactPackageVersion + "\n  - react-dom:  19.0.0\nLearn more: https://react.dev/warnings/version-mismatch")
        );
    }
    ensureCorrectIsomorphicReactVersion();
    function createDrainHandler(destination, request) {
      return function() {
        return startFlowing(request, destination);
      };
    }
    function createCancelHandler(request, reason) {
      return function() {
        request.destination = null;
        abort(request, Error(reason));
      };
    }
    function createRequestImpl(children, options) {
      var resumableState = createResumableState(
        options ? options.identifierPrefix : void 0,
        options ? options.unstable_externalRuntimeSrc : void 0,
        options ? options.bootstrapScriptContent : void 0,
        options ? options.bootstrapScripts : void 0,
        options ? options.bootstrapModules : void 0
      );
      return createRequest(
        children,
        resumableState,
        createRenderState(
          resumableState,
          options ? options.nonce : void 0,
          options ? options.unstable_externalRuntimeSrc : void 0,
          options ? options.importMap : void 0,
          options ? options.onHeaders : void 0,
          options ? options.maxHeadersLength : void 0
        ),
        createRootFormatContext(options ? options.namespaceURI : void 0),
        options ? options.progressiveChunkSize : void 0,
        options ? options.onError : void 0,
        options ? options.onAllReady : void 0,
        options ? options.onShellReady : void 0,
        options ? options.onShellError : void 0,
        void 0,
        options ? options.onPostpone : void 0,
        options ? options.formState : void 0
      );
    }
    ensureCorrectIsomorphicReactVersion();
    function createFakeWritable(readable) {
      return {
        write: function(chunk) {
          return readable.push(chunk);
        },
        end: function() {
          readable.push(null);
        },
        destroy: function(error) {
          readable.destroy(error);
        }
      };
    }
    exports.prerenderToNodeStream = function(children, options) {
      return new Promise(function(resolve, reject) {
        var resumableState = createResumableState(
          options ? options.identifierPrefix : void 0,
          options ? options.unstable_externalRuntimeSrc : void 0,
          options ? options.bootstrapScriptContent : void 0,
          options ? options.bootstrapScripts : void 0,
          options ? options.bootstrapModules : void 0
        ), request = createPrerenderRequest(
          children,
          resumableState,
          createRenderState(
            resumableState,
            void 0,
            options ? options.unstable_externalRuntimeSrc : void 0,
            options ? options.importMap : void 0,
            options ? options.onHeaders : void 0,
            options ? options.maxHeadersLength : void 0
          ),
          createRootFormatContext(options ? options.namespaceURI : void 0),
          options ? options.progressiveChunkSize : void 0,
          options ? options.onError : void 0,
          function() {
            var readable = new stream.Readable({
              read: function() {
                startFlowing(request, writable);
              }
            }), writable = createFakeWritable(readable);
            resolve({ prelude: readable });
          },
          void 0,
          void 0,
          reject,
          options ? options.onPostpone : void 0
        );
        if (options && options.signal) {
          var signal = options.signal;
          if (signal.aborted) abort(request, signal.reason);
          else {
            var listener = function() {
              abort(request, signal.reason);
              signal.removeEventListener("abort", listener);
            };
            signal.addEventListener("abort", listener);
          }
        }
        startWork(request);
      });
    };
    exports.renderToPipeableStream = function(children, options) {
      var request = createRequestImpl(children, options), hasStartedFlowing = false;
      startWork(request);
      return {
        pipe: function(destination) {
          if (hasStartedFlowing)
            throw Error(
              "React currently only supports piping to one writable stream."
            );
          hasStartedFlowing = true;
          safelyEmitEarlyPreloads(
            request,
            null === request.trackedPostpones ? 0 === request.pendingRootTasks : null === request.completedRootSegment ? 0 === request.pendingRootTasks : 5 !== request.completedRootSegment.status
          );
          startFlowing(request, destination);
          destination.on("drain", createDrainHandler(destination, request));
          destination.on(
            "error",
            createCancelHandler(
              request,
              "The destination stream errored while writing data."
            )
          );
          destination.on(
            "close",
            createCancelHandler(request, "The destination stream closed early.")
          );
          return destination;
        },
        abort: function(reason) {
          abort(request, reason);
        }
      };
    };
    exports.version = "19.0.0";
  }
});

// ../../../node_modules/react-dom/server.node.js
var require_server_node = __commonJS({
  "../../../node_modules/react-dom/server.node.js"(exports) {
    "use strict";
    var l;
    var s;
    if (true) {
      l = require_react_dom_server_legacy_node_production();
      s = require_react_dom_server_node_production();
    } else {
      l = null;
      s = null;
    }
    exports.version = l.version;
    exports.renderToString = l.renderToString;
    exports.renderToStaticMarkup = l.renderToStaticMarkup;
    exports.renderToPipeableStream = s.renderToPipeableStream;
    if (s.resumeToPipeableStream) {
      exports.resumeToPipeableStream = s.resumeToPipeableStream;
    }
  }
});

// ../../../node_modules/react/cjs/react-jsx-runtime.production.js
var require_react_jsx_runtime_production = __commonJS({
  "../../../node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    function jsxProd(type, config, maybeKey) {
      var key = null;
      void 0 !== maybeKey && (key = "" + maybeKey);
      void 0 !== config.key && (key = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      config = maybeKey.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== config ? config : null,
        props: maybeKey
      };
    }
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = jsxProd;
    exports.jsxs = jsxProd;
  }
});

// ../../../node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "../../../node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_jsx_runtime_production();
    } else {
      module.exports = null;
    }
  }
});

// ../../../node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0) cache[arg] = fn(arg);
    return cache[arg];
  };
}
var init_emotion_memoize_esm = __esm({
  "../../../node_modules/@emotion/memoize/dist/emotion-memoize.esm.js"() {
  }
});

// ../../../node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
var emotion_is_prop_valid_esm_exports = {};
__export(emotion_is_prop_valid_esm_exports, {
  default: () => isPropValid
});
var reactPropsRegex, isPropValid;
var init_emotion_is_prop_valid_esm = __esm({
  "../../../node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js"() {
    init_emotion_memoize_esm();
    reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    isPropValid = /* @__PURE__ */ memoize(
      function(prop) {
        return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
      }
      /* Z+1 */
    );
  }
});

// src/s4/ssr.jsx
var import_react23 = __toESM(require_react());
var import_server = __toESM(require_server_node());

// src/s4/App.jsx
var import_react22 = __toESM(require_react());

// ../../../node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
var import_react = __toESM(require_react(), 1);
var LayoutGroupContext = (0, import_react.createContext)({});

// ../../../node_modules/framer-motion/dist/es/utils/use-constant.mjs
var import_react2 = __toESM(require_react(), 1);
function useConstant(init) {
  const ref = (0, import_react2.useRef)(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// ../../../node_modules/framer-motion/dist/es/context/PresenceContext.mjs
var import_react3 = __toESM(require_react(), 1);
var PresenceContext = /* @__PURE__ */ (0, import_react3.createContext)(null);

// ../../../node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
var import_react4 = __toESM(require_react(), 1);
var MotionConfigContext = (0, import_react4.createContext)({
  transformPagePoint: (p) => p,
  isStatic: false,
  reducedMotion: "never"
});

// ../../../node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
var import_react5 = __toESM(require_react(), 1);
function usePresence(subscribe = true) {
  const context = (0, import_react5.useContext)(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context;
  const id3 = (0, import_react5.useId)();
  (0, import_react5.useEffect)(() => {
    if (subscribe) {
      return register(id3);
    }
  }, [subscribe]);
  const safeToRemove = (0, import_react5.useCallback)(() => subscribe && onExitComplete && onExitComplete(id3), [id3, onExitComplete, subscribe]);
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}

// ../../../node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var import_react6 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser = typeof window !== "undefined";

// ../../../node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect = isBrowser ? import_react6.useLayoutEffect : import_react6.useEffect;

// ../../../node_modules/motion-utils/dist/es/noop.mjs
var noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;

// ../../../node_modules/motion-utils/dist/es/errors.mjs
var warning = noop;
var invariant = noop;
if (false) {
  warning = (check, message) => {
    if (!check && typeof console !== "undefined") {
      console.warn(message);
    }
  };
  invariant = (check, message) => {
    if (!check) {
      throw new Error(message);
    }
  };
}

// ../../../node_modules/motion-utils/dist/es/memo.mjs
// @__NO_SIDE_EFFECTS__
function memo(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}

// ../../../node_modules/motion-utils/dist/es/progress.mjs
var progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
  const toFromDifference = to - from;
  return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

// ../../../node_modules/motion-utils/dist/es/time-conversion.mjs
var secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
var millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;

// ../../../node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs
var MotionGlobalConfig = {
  skipAnimations: false,
  useManualTiming: false
};

// ../../../node_modules/framer-motion/dist/es/frameloop/order.mjs
var stepsOrder = [
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];

// ../../../node_modules/framer-motion/dist/es/stats/buffer.mjs
var statsBuffer = {
  value: null,
  addProjectionMetrics: null
};

// ../../../node_modules/framer-motion/dist/es/frameloop/render-step.mjs
function createRenderStep(runNextFrame, stepName) {
  let thisFrame = /* @__PURE__ */ new Set();
  let nextFrame = /* @__PURE__ */ new Set();
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  let latestFrameData = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  let numCalls = 0;
  function triggerCallback(callback) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback);
      runNextFrame();
    }
    numCalls++;
    callback(latestFrameData);
  }
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame;
      if (keepAlive)
        toKeepAlive.add(callback);
      if (!queue.has(callback))
        queue.add(callback);
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame.delete(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData2) => {
      latestFrameData = frameData2;
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      [thisFrame, nextFrame] = [nextFrame, thisFrame];
      thisFrame.forEach(triggerCallback);
      if (stepName && statsBuffer.value) {
        statsBuffer.value.frameloop[stepName].push(numCalls);
      }
      numCalls = 0;
      thisFrame.clear();
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}

// ../../../node_modules/framer-motion/dist/es/frameloop/batcher.mjs
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const flagRunNextFrame = () => runNextFrame = true;
  const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(flagRunNextFrame, allowKeepAlive ? key : void 0);
    return acc;
  }, {});
  const { read, resolveKeyframes, update, preRender, render: render2, postRender } = steps;
  const processBatch = () => {
    const timestamp = MotionGlobalConfig.useManualTiming ? state.timestamp : performance.now();
    runNextFrame = false;
    if (!MotionGlobalConfig.useManualTiming) {
      state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
    }
    state.timestamp = timestamp;
    state.isProcessing = true;
    read.process(state);
    resolveKeyframes.process(state);
    update.process(state);
    preRender.process(state);
    render2.process(state);
    postRender.process(state);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process2) => {
    for (let i = 0; i < stepsOrder.length; i++) {
      steps[stepsOrder[i]].cancel(process2);
    }
  };
  return { schedule, cancel, state, steps };
}

// ../../../node_modules/framer-motion/dist/es/frameloop/frame.mjs
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);

// ../../../node_modules/framer-motion/dist/es/context/LazyContext.mjs
var import_react7 = __toESM(require_react(), 1);
var LazyContext = (0, import_react7.createContext)({ strict: false });

// ../../../node_modules/framer-motion/dist/es/motion/features/definitions.mjs
var featureProps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
var featureDefinitions = {};
for (const key in featureProps) {
  featureDefinitions[key] = {
    isEnabled: (props) => featureProps[key].some((name) => !!props[name])
  };
}

// ../../../node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function loadFeatures(features) {
  for (const key in features) {
    featureDefinitions[key] = {
      ...featureDefinitions[key],
      ...features[key]
    };
  }
}

// ../../../node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
var validMotionProps = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}

// ../../../node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
var shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  if (!isValidProp)
    return;
  shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
  loadExternalIsValidProp((init_emotion_is_prop_valid_esm(), __toCommonJS(emotion_is_prop_valid_esm_exports)).default);
} catch (_a) {
}
function filterProps(props, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props) {
    if (key === "values" && typeof props.values === "object")
      continue;
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || // If trying to use native HTML drag events, forward drag listeners
    props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// ../../../node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function createDOMMotionComponentProxy(componentFactory) {
  if (typeof Proxy === "undefined") {
    return componentFactory;
  }
  const componentCache = /* @__PURE__ */ new Map();
  const deprecatedFactoryFunction = (...args) => {
    if (false) {
      warnOnce(false, "motion() is deprecated. Use motion.create() instead.");
    }
    return componentFactory(...args);
  };
  return new Proxy(deprecatedFactoryFunction, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) => {
      if (key === "create")
        return componentFactory;
      if (!componentCache.has(key)) {
        componentCache.set(key, componentFactory(key));
      }
      return componentCache.get(key);
    }
  });
}

// ../../../node_modules/framer-motion/dist/es/motion/index.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react13 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
var import_react8 = __toESM(require_react(), 1);
var MotionContext = /* @__PURE__ */ (0, import_react8.createContext)({});

// ../../../node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
var import_react9 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs
function isAnimationControls(v) {
  return v !== null && typeof v === "object" && typeof v.start === "function";
}

// ../../../node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs
function isVariantLabel(v) {
  return typeof v === "string" || Array.isArray(v);
}

// ../../../node_modules/framer-motion/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
var variantProps = ["initial", ...variantPriorityOrder];

// ../../../node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}

// ../../../node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context) {
  if (isControllingVariants(props)) {
    const { initial, animate } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate) ? animate : void 0
    };
  }
  return props.inherit !== false ? context : {};
}

// ../../../node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  const { initial, animate } = getCurrentTreeVariants(props, (0, import_react9.useContext)(MotionContext));
  return (0, import_react9.useMemo)(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// ../../../node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
var motionComponentSymbol = /* @__PURE__ */ Symbol.for("motionComponentSymbol");

// ../../../node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
var import_react10 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject(ref) {
  return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// ../../../node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement, externalRef) {
  return (0, import_react10.useCallback)(
    (instance) => {
      if (instance) {
        visualState.onMount && visualState.onMount(instance);
      }
      if (visualElement) {
        if (instance) {
          visualElement.mount(instance);
        } else {
          visualElement.unmount();
        }
      }
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(instance);
        } else if (isRefObject(externalRef)) {
          externalRef.current = instance;
        }
      }
    },
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]
  );
}

// ../../../node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
var import_react12 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs
var camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();

// ../../../node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs
var optimizedAppearDataId = "framerAppearId";
var optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

// ../../../node_modules/framer-motion/dist/es/frameloop/microtask.mjs
var { schedule: microtask, cancel: cancelMicrotask } = createRenderBatcher(queueMicrotask, false);

// ../../../node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
var import_react11 = __toESM(require_react(), 1);
var SwitchLayoutGroupContext = (0, import_react11.createContext)({});

// ../../../node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(Component2, visualState, props, createVisualElement, ProjectionNodeConstructor) {
  var _a, _b;
  const { visualElement: parent } = (0, import_react12.useContext)(MotionContext);
  const lazyContext = (0, import_react12.useContext)(LazyContext);
  const presenceContext = (0, import_react12.useContext)(PresenceContext);
  const reducedMotionConfig = (0, import_react12.useContext)(MotionConfigContext).reducedMotion;
  const visualElementRef = (0, import_react12.useRef)(null);
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component2, {
      visualState,
      parent,
      props,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig
    });
  }
  const visualElement = visualElementRef.current;
  const initialLayoutGroupConfig = (0, import_react12.useContext)(SwitchLayoutGroupContext);
  if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
    createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
  }
  const isMounted = (0, import_react12.useRef)(false);
  (0, import_react12.useInsertionEffect)(() => {
    if (visualElement && isMounted.current) {
      visualElement.update(props, presenceContext);
    }
  });
  const optimisedAppearId = props[optimizedAppearDataAttribute];
  const wantsHandoff = (0, import_react12.useRef)(Boolean(optimisedAppearId) && !((_a = window.MotionHandoffIsComplete) === null || _a === void 0 ? void 0 : _a.call(window, optimisedAppearId)) && ((_b = window.MotionHasOptimisedAnimation) === null || _b === void 0 ? void 0 : _b.call(window, optimisedAppearId)));
  useIsomorphicLayoutEffect(() => {
    if (!visualElement)
      return;
    isMounted.current = true;
    window.MotionIsMounted = true;
    visualElement.updateFeatures();
    microtask.render(visualElement.render);
    if (wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  (0, import_react12.useEffect)(() => {
    if (!visualElement)
      return;
    if (!wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
    if (wantsHandoff.current) {
      queueMicrotask(() => {
        var _a2;
        (_a2 = window.MotionHandoffMarkAsComplete) === null || _a2 === void 0 ? void 0 : _a2.call(window, optimisedAppearId);
      });
      wantsHandoff.current = false;
    }
  });
  return visualElement;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
  const { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot } = props;
  visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
  visualElement.projection.setOptions({
    layoutId,
    layout: layout2,
    alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
    visualElement,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof layout2 === "string" ? layout2 : "both",
    initialPromotionConfig,
    layoutScroll,
    layoutRoot
  });
}
function getClosestProjectingNode(visualElement) {
  if (!visualElement)
    return void 0;
  return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}

// ../../../node_modules/framer-motion/dist/es/motion/index.mjs
function createRendererMotionComponent({ preloadedFeatures, createVisualElement, useRender, useVisualState, Component: Component2 }) {
  var _a, _b;
  preloadedFeatures && loadFeatures(preloadedFeatures);
  function MotionComponent(props, externalRef) {
    let MeasureLayout2;
    const configAndProps = {
      ...(0, import_react13.useContext)(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const { isStatic } = configAndProps;
    const context = useCreateMotionContext(props);
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && isBrowser) {
      useStrictMode(configAndProps, preloadedFeatures);
      const layoutProjection = getProjectionFunctionality(configAndProps);
      MeasureLayout2 = layoutProjection.MeasureLayout;
      context.visualElement = useVisualElement(Component2, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
    }
    return (0, import_jsx_runtime.jsxs)(MotionContext.Provider, { value: context, children: [MeasureLayout2 && context.visualElement ? (0, import_jsx_runtime.jsx)(MeasureLayout2, { visualElement: context.visualElement, ...configAndProps }) : null, useRender(Component2, props, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)] });
  }
  MotionComponent.displayName = `motion.${typeof Component2 === "string" ? Component2 : `create(${(_b = (_a = Component2.displayName) !== null && _a !== void 0 ? _a : Component2.name) !== null && _b !== void 0 ? _b : ""})`}`;
  const ForwardRefMotionComponent = (0, import_react13.forwardRef)(MotionComponent);
  ForwardRefMotionComponent[motionComponentSymbol] = Component2;
  return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
  const layoutGroupId = (0, import_react13.useContext)(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
  const isStrict = (0, import_react13.useContext)(LazyContext).strict;
  if (false) {
    const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    configAndProps.ignoreStrict ? warning(false, strictMessage) : invariant(false, strictMessage);
  }
}
function getProjectionFunctionality(props) {
  const { drag: drag2, layout: layout2 } = featureDefinitions;
  if (!drag2 && !layout2)
    return {};
  const combined = { ...drag2, ...layout2 };
  return {
    MeasureLayout: (drag2 === null || drag2 === void 0 ? void 0 : drag2.isEnabled(props)) || (layout2 === null || layout2 === void 0 ? void 0 : layout2.isEnabled(props)) ? combined.MeasureLayout : void 0,
    ProjectionNode: combined.ProjectionNode
  };
}

// ../../../node_modules/framer-motion/dist/es/render/dom/use-render.mjs
var import_react16 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/render/html/use-props.mjs
var import_react14 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
var startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
var isCSSVariableToken = (value) => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;

// ../../../node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {};
function addScaleCorrector(correctors) {
  for (const key in correctors) {
    scaleCorrectors[key] = correctors[key];
    if (isCSSVariableName(key)) {
      scaleCorrectors[key].isCSSVariable = true;
    }
  }
}

// ../../../node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs
var transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
var transformProps = new Set(transformPropOrder);

// ../../../node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout: layout2, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout2 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// ../../../node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = (value) => Boolean(value && value.getVelocity);

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs
var getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// ../../../node_modules/framer-motion/dist/es/utils/clamp.mjs
var clamp = (min, max, v) => {
  if (v > max)
    return max;
  if (v < min)
    return min;
  return v;
};

// ../../../node_modules/framer-motion/dist/es/value/types/numbers/index.mjs
var number = {
  test: (v) => typeof v === "number",
  parse: parseFloat,
  transform: (v) => v
};
var alpha = {
  ...number,
  transform: (v) => clamp(0, 1, v)
};
var scale = {
  ...number,
  default: 1
};

// ../../../node_modules/framer-motion/dist/es/value/types/numbers/units.mjs
var createUnitType = (unit) => ({
  test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
  parse: parseFloat,
  transform: (v) => `${v}${unit}`
});
var degrees = /* @__PURE__ */ createUnitType("deg");
var percent = /* @__PURE__ */ createUnitType("%");
var px = /* @__PURE__ */ createUnitType("px");
var vh = /* @__PURE__ */ createUnitType("vh");
var vw = /* @__PURE__ */ createUnitType("vw");
var progressPercentage = {
  ...percent,
  parse: (v) => percent.parse(v) / 100,
  transform: (v) => percent.transform(v * 100)
};

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/number-browser.mjs
var browserNumberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  radius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  // Misc
  backgroundPositionX: px,
  backgroundPositionY: px
};

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/transform.mjs
var transformValueTypes = {
  rotate: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px
};

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs
var int = {
  ...number,
  transform: Math.round
};

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs
var numberValueTypes = {
  ...browserNumberValueTypes,
  ...transformValueTypes,
  zIndex: int,
  size: px,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// ../../../node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform2, transformTemplate) {
  let transformString = "";
  let transformIsDefault = true;
  for (let i = 0; i < numTransforms; i++) {
    const key = transformPropOrder[i];
    const value = latestValues[key];
    if (value === void 0)
      continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      valueIsDefault = parseFloat(value) === 0;
    }
    if (!valueIsDefault || transformTemplate) {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (!valueIsDefault) {
        transformIsDefault = false;
        const transformName = translateAlias[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      if (transformTemplate) {
        transform2[key] = valueAsType;
      }
    }
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform2, transformIsDefault ? "" : transformString);
  } else if (transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}

// ../../../node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const { style, vars, transformOrigin } = state;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (transformProps.has(key)) {
      hasTransform2 = true;
      continue;
    } else if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    } else {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (key.startsWith("origin")) {
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate) {
      style.transform = buildTransform(latestValues, state.transform, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}

// ../../../node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});

// ../../../node_modules/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
  return (0, import_react14.useMemo)(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
function useStyle(props, visualState) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState));
  return style;
}
function useHTMLProps(props, visualState) {
  const htmlProps = {};
  const style = useStyle(props, visualState);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}

// ../../../node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
var lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];

// ../../../node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component2) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component2 !== "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    Component2.includes("-")
  ) {
    return false;
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component2) > -1 || /**
     * If it contains a capital letter, it's an SVG component
     */
    /[A-Z]/u.test(Component2)
  ) {
    return true;
  }
  return false;
}

// ../../../node_modules/framer-motion/dist/es/render/svg/use-props.mjs
var import_react15 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/render/svg/utils/path.mjs
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys2 = useDashCase ? dashKeys : camelKeys;
  attrs[keys2.offset] = px.transform(-offset);
  const pathLength = px.transform(length);
  const pathSpacing = px.transform(spacing);
  attrs[keys2.array] = `${pathLength} ${pathSpacing}`;
}

// ../../../node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs
function calcOrigin(origin, offset, size) {
  return typeof origin === "string" ? origin : px.transform(offset + size * origin);
}
function calcSVGTransformOrigin(dimensions, originX, originY) {
  const pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
  const pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
  return `${pxOriginX} ${pxOriginY}`;
}

// ../../../node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  originX,
  originY,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, isSVGTag2, transformTemplate) {
  buildHTMLStyles(state, latest, transformTemplate);
  if (isSVGTag2) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style, dimensions } = state;
  if (attrs.transform) {
    if (dimensions)
      style.transform = attrs.transform;
    delete attrs.transform;
  }
  if (dimensions && (originX !== void 0 || originY !== void 0 || style.transform)) {
    style.transformOrigin = calcSVGTransformOrigin(dimensions, originX !== void 0 ? originX : 0.5, originY !== void 0 ? originY : 0.5);
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// ../../../node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {}
});

// ../../../node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

// ../../../node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps(props, visualState, _isStatic, Component2) {
  const visualProps = (0, import_react15.useMemo)(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, isSVGTag(Component2), props.transformTemplate);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}

// ../../../node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function createUseRender(forwardMotionProps = false) {
  const useRender = (Component2, props, ref, { latestValues }, isStatic) => {
    const useVisualProps = isSVGComponent(Component2) ? useSVGProps : useHTMLProps;
    const visualProps = useVisualProps(props, latestValues, isStatic, Component2);
    const filteredProps = filterProps(props, typeof Component2 === "string", forwardMotionProps);
    const elementProps = Component2 !== import_react16.Fragment ? { ...filteredProps, ...visualProps, ref } : {};
    const { children } = props;
    const renderedChildren = (0, import_react16.useMemo)(() => isMotionValue(children) ? children.get() : children, [children]);
    return (0, import_react16.createElement)(Component2, {
      ...elementProps,
      children: renderedChildren
    });
  };
  return useRender;
}

// ../../../node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
var import_react17 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
  const state = [{}, {}];
  visualElement === null || visualElement === void 0 ? void 0 : visualElement.values.forEach((value, key) => {
    state[0][key] = value.get();
    state[1][key] = value.getVelocity();
  });
  return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  return definition;
}

// ../../../node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs
var isKeyframesTarget = (v) => {
  return Array.isArray(v);
};

// ../../../node_modules/framer-motion/dist/es/utils/resolve-value.mjs
var isCustomValue = (v) => {
  return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
var resolveFinalValueInKeyframes = (v) => {
  return isKeyframesTarget(v) ? v[v.length - 1] || 0 : v;
};

// ../../../node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue(value) {
  const unwrappedValue = isMotionValue(value) ? value.get() : value;
  return isCustomValue(unwrappedValue) ? unwrappedValue.toValue() : unwrappedValue;
}

// ../../../node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps3, createRenderState, onUpdate }, props, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState()
  };
  if (onUpdate) {
    state.onMount = (instance) => onUpdate({ props, current: instance, ...state });
    state.onUpdate = (visualElement) => onUpdate(visualElement);
  }
  return state;
}
var makeUseVisualState = (config) => (props, isStatic) => {
  const context = (0, import_react17.useContext)(MotionContext);
  const presenceContext = (0, import_react17.useContext)(PresenceContext);
  const make = () => makeState(config, props, context, presenceContext);
  return isStatic ? make() : useConstant(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate === void 0)
      animate = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    for (let i = 0; i < list.length; i++) {
      const resolved = resolveVariantFromProps(props, list[i]);
      if (resolved) {
        const { transitionEnd, transition, ...target } = resolved;
        for (const key in target) {
          let valueTarget = target[key];
          if (Array.isArray(valueTarget)) {
            const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
            valueTarget = valueTarget[index];
          }
          if (valueTarget !== null) {
            values[key] = valueTarget;
          }
        }
        for (const key in transitionEnd) {
          values[key] = transitionEnd[key];
        }
      }
    }
  }
  return values;
}

// ../../../node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  var _a;
  const { style } = props;
  const newValues = {};
  for (const key in style) {
    if (isMotionValue(style[key]) || prevProps.style && isMotionValue(prevProps.style[key]) || isForcedMotionValue(key, props) || ((_a = visualElement === null || visualElement === void 0 ? void 0 : visualElement.getValue(key)) === null || _a === void 0 ? void 0 : _a.liveStyle) !== void 0) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}

// ../../../node_modules/framer-motion/dist/es/render/html/config-motion.mjs
var htmlMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps,
    createRenderState: createHtmlRenderState
  })
};

// ../../../node_modules/framer-motion/dist/es/render/svg/utils/measure.mjs
function updateSVGDimensions(instance, renderState) {
  try {
    renderState.dimensions = typeof instance.getBBox === "function" ? instance.getBBox() : instance.getBoundingClientRect();
  } catch (e) {
    renderState.dimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  }
}

// ../../../node_modules/framer-motion/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars }, styleProp, projection) {
  Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
  for (const key in vars) {
    element.style.setProperty(key, vars[key]);
  }
}

// ../../../node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);

// ../../../node_modules/framer-motion/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// ../../../node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// ../../../node_modules/framer-motion/dist/es/render/svg/config-motion.mjs
var layoutProps = ["x", "y", "width", "height", "cx", "cy", "r"];
var svgMotionConfig = {
  useVisualState: makeUseVisualState({
    scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
    createRenderState: createSvgRenderState,
    onUpdate: ({ props, prevProps, current, renderState, latestValues }) => {
      if (!current)
        return;
      let hasTransform2 = !!props.drag;
      if (!hasTransform2) {
        for (const key in latestValues) {
          if (transformProps.has(key)) {
            hasTransform2 = true;
            break;
          }
        }
      }
      if (!hasTransform2)
        return;
      let needsMeasure = !prevProps;
      if (prevProps) {
        for (let i = 0; i < layoutProps.length; i++) {
          const key = layoutProps[i];
          if (props[key] !== prevProps[key]) {
            needsMeasure = true;
          }
        }
      }
      if (!needsMeasure)
        return;
      frame.read(() => {
        updateSVGDimensions(current, renderState);
        frame.render(() => {
          buildSVGAttrs(renderState, latestValues, isSVGTag(current.tagName), props.transformTemplate);
          renderSVG(current, renderState);
        });
      });
    }
  })
};

// ../../../node_modules/framer-motion/dist/es/render/components/create-factory.mjs
function createMotionComponentFactory(preloadedFeatures, createVisualElement) {
  return function createMotionComponent2(Component2, { forwardMotionProps } = { forwardMotionProps: false }) {
    const baseConfig = isSVGComponent(Component2) ? svgMotionConfig : htmlMotionConfig;
    const config = {
      ...baseConfig,
      preloadedFeatures,
      useRender: createUseRender(forwardMotionProps),
      createVisualElement,
      Component: Component2
    };
    return createRendererMotionComponent(config);
  };
}

// ../../../node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}

// ../../../node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var supportsScrollTimeline = memo(() => window.ScrollTimeline !== void 0);

// ../../../node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs
var BaseGroupPlaybackControls = class {
  constructor(animations2) {
    this.stop = () => this.runAll("stop");
    this.animations = animations2.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((animation) => "finished" in animation ? animation.finished : animation));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(propName) {
    return this.animations[0][propName];
  }
  setAll(propName, newValue) {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i][propName] = newValue;
    }
  }
  attachTimeline(timeline, fallback) {
    const subscriptions = this.animations.map((animation) => {
      if (supportsScrollTimeline() && animation.attachTimeline) {
        return animation.attachTimeline(timeline);
      } else if (typeof fallback === "function") {
        return fallback(animation);
      }
    });
    return () => {
      subscriptions.forEach((cancel, i) => {
        cancel && cancel();
        this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(time2) {
    this.setAll("time", time2);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(speed) {
    this.setAll("speed", speed);
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    let max = 0;
    for (let i = 0; i < this.animations.length; i++) {
      max = Math.max(max, this.animations[i].duration);
    }
    return max;
  }
  runAll(methodName) {
    this.animations.forEach((controls) => controls[methodName]());
  }
  flatten() {
    this.runAll("flatten");
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
};

// ../../../node_modules/motion-dom/dist/es/animation/controls/Group.mjs
var GroupPlaybackControls = class extends BaseGroupPlaybackControls {
  then(onResolve, onReject) {
    return Promise.all(this.animations).then(onResolve).catch(onReject);
  }
};

// ../../../node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function getValueTransition(transition, key) {
  return transition ? transition[key] || transition["default"] || transition : void 0;
}

// ../../../node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
var maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}

// ../../../node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function isGenerator(type) {
  return typeof type === "function";
}

// ../../../node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs
function attachTimeline(animation, timeline) {
  animation.timeline = timeline;
  animation.onfinish = null;
}

// ../../../node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs
var isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";

// ../../../node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var supportsFlags = {
  linearEasing: void 0
};

// ../../../node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function memoSupports(callback, supportsFlag) {
  const memoized = memo(callback);
  return () => {
    var _a;
    return (_a = supportsFlags[supportsFlag]) !== null && _a !== void 0 ? _a : memoized();
  };
}

// ../../../node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs
var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch (e) {
    return false;
  }
  return true;
}, "linearEasing");

// ../../../node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs
var generateLinearEasing = (easing, duration, resolution = 10) => {
  let points = "";
  const numPoints = Math.max(Math.round(duration / resolution), 2);
  for (let i = 0; i < numPoints; i++) {
    points += easing(progress(0, numPoints - 1, i)) + ", ";
  }
  return `linear(${points.substring(0, points.length - 2)})`;
};

// ../../../node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs
function isWaapiSupportedEasing(easing) {
  return Boolean(typeof easing === "function" && supportsLinearEasing() || !easing || typeof easing === "string" && (easing in supportedWaapiEasing || supportsLinearEasing()) || isBezierDefinition(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
var cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
var supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};
function mapEasingToNativeEasing(easing, duration) {
  if (!easing) {
    return void 0;
  } else if (typeof easing === "function" && supportsLinearEasing()) {
    return generateLinearEasing(easing, duration);
  } else if (isBezierDefinition(easing)) {
    return cubicBezierAsString(easing);
  } else if (Array.isArray(easing)) {
    return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
  } else {
    return supportedWaapiEasing[easing];
  }
}

// ../../../node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs
var isDragging = {
  x: false,
  y: false
};
function isDragActive() {
  return isDragging.x || isDragging.y;
}

// ../../../node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function resolveElements(elementOrSelector, scope, selectorCache) {
  var _a;
  if (elementOrSelector instanceof EventTarget) {
    return [elementOrSelector];
  } else if (typeof elementOrSelector === "string") {
    let root = document;
    if (scope) {
      root = scope.current;
    }
    const elements = (_a = selectorCache === null || selectorCache === void 0 ? void 0 : selectorCache[elementOrSelector]) !== null && _a !== void 0 ? _a : root.querySelectorAll(elementOrSelector);
    return elements ? Array.from(elements) : [];
  }
  return Array.from(elementOrSelector);
}

// ../../../node_modules/motion-dom/dist/es/gestures/utils/setup.mjs
function setupGesture(elementOrSelector, options) {
  const elements = resolveElements(elementOrSelector);
  const gestureAbortController = new AbortController();
  const eventOptions = {
    passive: true,
    ...options,
    signal: gestureAbortController.signal
  };
  const cancel = () => gestureAbortController.abort();
  return [elements, eventOptions, cancel];
}

// ../../../node_modules/motion-dom/dist/es/gestures/hover.mjs
function isValidHover(event) {
  return !(event.pointerType === "touch" || isDragActive());
}
function hover(elementOrSelector, onHoverStart, options = {}) {
  const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
  const onPointerEnter = (enterEvent) => {
    if (!isValidHover(enterEvent))
      return;
    const { target } = enterEvent;
    const onHoverEnd = onHoverStart(target, enterEvent);
    if (typeof onHoverEnd !== "function" || !target)
      return;
    const onPointerLeave = (leaveEvent) => {
      if (!isValidHover(leaveEvent))
        return;
      onHoverEnd(leaveEvent);
      target.removeEventListener("pointerleave", onPointerLeave);
    };
    target.addEventListener("pointerleave", onPointerLeave, eventOptions);
  };
  elements.forEach((element) => {
    element.addEventListener("pointerenter", onPointerEnter, eventOptions);
  });
  return cancel;
}

// ../../../node_modules/motion-dom/dist/es/gestures/utils/capture-pointer.mjs
function capturePointer(event, action) {
  const actionName = `${action}PointerCapture`;
  if (event.target instanceof Element && actionName in event.target && event.pointerId !== void 0) {
    try {
      event.target[actionName](event.pointerId);
    } catch (e) {
    }
  }
}

// ../../../node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs
var isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

// ../../../node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs
var isPrimaryPointer = (event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
};

// ../../../node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs
var focusableElements = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function isElementKeyboardAccessible(element) {
  return focusableElements.has(element.tagName) || element.tabIndex !== -1;
}

// ../../../node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs
var isPressing = /* @__PURE__ */ new WeakSet();

// ../../../node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs
function filterEvents(callback) {
  return (event) => {
    if (event.key !== "Enter")
      return;
    callback(event);
  };
}
function firePointerEvent(target, type) {
  target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
}
var enableKeyboardPress = (focusEvent, eventOptions) => {
  const element = focusEvent.currentTarget;
  if (!element)
    return;
  const handleKeydown = filterEvents(() => {
    if (isPressing.has(element))
      return;
    firePointerEvent(element, "down");
    const handleKeyup = filterEvents(() => {
      firePointerEvent(element, "up");
    });
    const handleBlur = () => firePointerEvent(element, "cancel");
    element.addEventListener("keyup", handleKeyup, eventOptions);
    element.addEventListener("blur", handleBlur, eventOptions);
  });
  element.addEventListener("keydown", handleKeydown, eventOptions);
  element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};

// ../../../node_modules/motion-dom/dist/es/gestures/press/index.mjs
function isValidPressEvent(event) {
  return isPrimaryPointer(event) && !isDragActive();
}
function press(targetOrSelector, onPressStart, options = {}) {
  const [targets, eventOptions, cancelEvents] = setupGesture(targetOrSelector, options);
  const startPress = (startEvent) => {
    const target = startEvent.currentTarget;
    if (!target || !isValidPressEvent(startEvent) || isPressing.has(target))
      return;
    isPressing.add(target);
    capturePointer(startEvent, "set");
    const onPressEnd = onPressStart(target, startEvent);
    const onPointerEnd = (endEvent, success) => {
      target.removeEventListener("pointerup", onPointerUp);
      target.removeEventListener("pointercancel", onPointerCancel);
      capturePointer(endEvent, "release");
      if (!isValidPressEvent(endEvent) || !isPressing.has(target)) {
        return;
      }
      isPressing.delete(target);
      if (typeof onPressEnd === "function") {
        onPressEnd(endEvent, { success });
      }
    };
    const onPointerUp = (upEvent) => {
      const isOutside = !upEvent.isTrusted ? false : checkOutside(upEvent, target instanceof Element ? target.getBoundingClientRect() : {
        left: 0,
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight
      });
      if (isOutside) {
        onPointerEnd(upEvent, false);
      } else {
        onPointerEnd(upEvent, !(target instanceof Element) || isNodeOrChild(target, upEvent.target));
      }
    };
    const onPointerCancel = (cancelEvent) => {
      onPointerEnd(cancelEvent, false);
    };
    target.addEventListener("pointerup", onPointerUp, eventOptions);
    target.addEventListener("pointercancel", onPointerCancel, eventOptions);
    target.addEventListener("lostpointercapture", onPointerCancel, eventOptions);
  };
  targets.forEach((target) => {
    target = options.useGlobalTarget ? window : target;
    let canAddKeyboardAccessibility = false;
    if (target instanceof HTMLElement) {
      canAddKeyboardAccessibility = true;
      if (!isElementKeyboardAccessible(target) && target.getAttribute("tabindex") === null) {
        target.tabIndex = 0;
      }
    }
    target.addEventListener("pointerdown", startPress, eventOptions);
    if (canAddKeyboardAccessibility) {
      target.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions), eventOptions);
    }
  });
  return cancelEvents;
}
function checkOutside(event, rect) {
  return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
}

// ../../../node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs
function setDragLock(axis) {
  if (axis === "x" || axis === "y") {
    if (isDragging[axis]) {
      return null;
    } else {
      isDragging[axis] = true;
      return () => {
        isDragging[axis] = false;
      };
    }
  } else {
    if (isDragging.x || isDragging.y) {
      return null;
    } else {
      isDragging.x = isDragging.y = true;
      return () => {
        isDragging.x = isDragging.y = false;
      };
    }
  }
}

// ../../../node_modules/framer-motion/dist/es/render/html/utils/keys-position.mjs
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...transformPropOrder
]);

// ../../../node_modules/framer-motion/dist/es/frameloop/sync-time.mjs
var now;
function clearTime() {
  now = void 0;
}
var time = {
  now: () => {
    if (now === void 0) {
      time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
    }
    return now;
  },
  set: (newTime) => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};

// ../../../node_modules/framer-motion/dist/es/utils/array.mjs
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}

// ../../../node_modules/framer-motion/dist/es/utils/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b, c) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b, c);
    } else {
      for (let i = 0; i < numSubscriptions; i++) {
        const handler = this.subscriptions[i];
        handler && handler(a, b, c);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// ../../../node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs
function velocityPerSecond(velocity, frameDuration) {
  return frameDuration ? velocity * (1e3 / frameDuration) : 0;
}

// ../../../node_modules/framer-motion/dist/es/value/index.mjs
var MAX_VELOCITY_DELTA = 30;
var isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
var collectMotionValues = {
  current: void 0
};
var MotionValue = class {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   *
   * @internal
   */
  constructor(init, options = {}) {
    this.version = "12.4.7";
    this.canTrackVelocity = null;
    this.events = {};
    this.updateAndNotify = (v, render2 = true) => {
      const currentTime = time.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v);
      if (this.current !== this.prev && this.events.change) {
        this.events.change.notify(this.current);
      }
      if (render2 && this.events.renderRequest) {
        this.events.renderRequest.notify(this.current);
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = time.now();
    if (this.canTrackVelocity === null && current !== void 0) {
      this.canTrackVelocity = isFloat(this.current);
    }
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if (false) {
      warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   *
   * @internal
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v, render2 = true) {
    if (!render2 || !this.passiveEffect) {
      this.updateAndNotify(v, render2);
    } else {
      this.passiveEffect(v, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v, endAnimation = true) {
    this.updateAndNotify(v);
    this.prev = v;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    endAnimation && this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues.current) {
      collectMotionValues.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   *
   * @internal
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
};
function motionValue(init, options) {
  return new MotionValue(init, options);
}

// ../../../node_modules/framer-motion/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}

// ../../../node_modules/framer-motion/dist/es/value/use-will-change/is.mjs
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}

// ../../../node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key);
  }
}

// ../../../node_modules/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId(visualElement) {
  return visualElement.props[optimizedAppearDataAttribute];
}

// ../../../node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs
var instantAnimationState = {
  current: false
};

// ../../../node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs
var calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}

// ../../../node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;

// ../../../node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs
var reverseEasing = (easing) => (p) => 1 - easing(1 - p);

// ../../../node_modules/framer-motion/dist/es/easing/back.mjs
var backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99);
var backIn = /* @__PURE__ */ reverseEasing(backOut);
var backInOut = /* @__PURE__ */ mirrorEasing(backIn);

// ../../../node_modules/framer-motion/dist/es/easing/anticipate.mjs
var anticipate = (p) => (p *= 2) < 1 ? 0.5 * backIn(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));

// ../../../node_modules/framer-motion/dist/es/easing/circ.mjs
var circIn = (p) => 1 - Math.sin(Math.acos(p));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circIn);

// ../../../node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs
var isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);

// ../../../node_modules/framer-motion/dist/es/animation/utils/is-none.mjs
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  } else {
    return true;
  }
}

// ../../../node_modules/framer-motion/dist/es/value/types/utils/sanitize.mjs
var sanitize = (v) => Math.round(v * 1e5) / 1e5;

// ../../../node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs
var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

// ../../../node_modules/framer-motion/dist/es/value/types/utils/is-nullish.mjs
function isNullish(v) {
  return v == null;
}

// ../../../node_modules/framer-motion/dist/es/value/types/utils/single-color-regex.mjs
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;

// ../../../node_modules/framer-motion/dist/es/value/types/color/utils.mjs
var isColorString = (type, testProp) => (v) => {
  return Boolean(typeof v === "string" && singleColorRegex.test(v) && v.startsWith(type) || testProp && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, testProp));
};
var splitColor = (aName, bName, cName) => (v) => {
  if (typeof v !== "string")
    return v;
  const [a, b, c, alpha2] = v.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b),
    [cName]: parseFloat(c),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};

// ../../../node_modules/framer-motion/dist/es/value/types/color/rgba.mjs
var clampRgbUnit = (v) => clamp(0, 255, v);
var rgbUnit = {
  ...number,
  transform: (v) => Math.round(clampRgbUnit(v))
};
var rgba = {
  test: /* @__PURE__ */ isColorString("rgb", "red"),
  parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// ../../../node_modules/framer-motion/dist/es/value/types/color/hex.mjs
function parseHex(v) {
  let r = "";
  let g = "";
  let b = "";
  let a = "";
  if (v.length > 5) {
    r = v.substring(1, 3);
    g = v.substring(3, 5);
    b = v.substring(5, 7);
    a = v.substring(7, 9);
  } else {
    r = v.substring(1, 2);
    g = v.substring(2, 3);
    b = v.substring(3, 4);
    a = v.substring(4, 5);
    r += r;
    g += g;
    b += b;
    a += a;
  }
  return {
    red: parseInt(r, 16),
    green: parseInt(g, 16),
    blue: parseInt(b, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
var hex = {
  test: /* @__PURE__ */ isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// ../../../node_modules/framer-motion/dist/es/value/types/color/hsla.mjs
var hsla = {
  test: /* @__PURE__ */ isColorString("hsl", "hue"),
  parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// ../../../node_modules/framer-motion/dist/es/value/types/color/index.mjs
var color = {
  test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
  parse: (v) => {
    if (rgba.test(v)) {
      return rgba.parse(v);
    } else if (hsla.test(v)) {
      return hsla.parse(v);
    } else {
      return hex.parse(v);
    }
  },
  transform: (v) => {
    return typeof v === "string" ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
  }
};

// ../../../node_modules/framer-motion/dist/es/value/types/utils/color-regex.mjs
var colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

// ../../../node_modules/framer-motion/dist/es/value/types/complex/index.mjs
function test(v) {
  var _a, _b;
  return isNaN(v) && typeof v === "string" && (((_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) + (((_b = v.match(colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) > 0;
}
var NUMBER_TOKEN = "number";
var COLOR_TOKEN = "color";
var VAR_TOKEN = "var";
var VAR_FUNCTION_TOKEN = "var(";
var SPLIT_TOKEN = "${}";
var complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i = 0;
  const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
    if (color.test(parsedValue)) {
      indexes.color.push(i);
      types.push(COLOR_TOKEN);
      values.push(color.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i);
      types.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i);
      types.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
    ++i;
    return SPLIT_TOKEN;
  });
  const split = tokenised.split(SPLIT_TOKEN);
  return { values, split, indexes, types };
}
function parseComplexValue(v) {
  return analyseComplexValue(v).values;
}
function createTransformer(source) {
  const { split, types } = analyseComplexValue(source);
  const numSections = split.length;
  return (v) => {
    let output = "";
    for (let i = 0; i < numSections; i++) {
      output += split[i];
      if (v[i] !== void 0) {
        const type = types[i];
        if (type === NUMBER_TOKEN) {
          output += sanitize(v[i]);
        } else if (type === COLOR_TOKEN) {
          output += color.transform(v[i]);
        } else {
          output += v[i];
        }
      }
    }
    return output;
  };
}
var convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone(v) {
  const parsed = parseComplexValue(v);
  const transformer = createTransformer(v);
  return transformer(parsed.map(convertNumbersToZero));
}
var complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone
};

// ../../../node_modules/framer-motion/dist/es/value/types/complex/filter.mjs
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
  const [name, value] = v.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu;
var filter = {
  ...complex,
  getAnimatableNone: (v) => {
    const functions = v.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v;
  }
};

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs
var defaultValueTypes = {
  ...numberValueTypes,
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter
};
var getDefaultValueType = (key) => defaultValueTypes[key];

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs
function getAnimatableNone2(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (defaultValueType !== filter)
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}

// ../../../node_modules/framer-motion/dist/es/render/html/utils/make-none-animatable.mjs
var invalidTemplates = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i = 0;
  let animatableTemplate = void 0;
  while (i < unresolvedKeyframes.length && !animatableTemplate) {
    const keyframe = unresolvedKeyframes[i];
    if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
      animatableTemplate = unresolvedKeyframes[i];
    }
    i++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = getAnimatableNone2(name, animatableTemplate);
    }
  }
}

// ../../../node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs
var isNumOrPxType = (v) => v === number || v === px;
var getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
var getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform: transform2 }) => {
  if (transform2 === "none" || !transform2)
    return 0;
  const matrix3d = transform2.match(/^matrix3d\((.+)\)$/u);
  if (matrix3d) {
    return getPosFromMatrix(matrix3d[1], pos3);
  } else {
    const matrix = transform2.match(/^matrix\((.+)\)$/u);
    if (matrix) {
      return getPosFromMatrix(matrix[1], pos2);
    } else {
      return 0;
    }
  }
};
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
var positionalValues = {
  // Dimensions
  width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
  height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
  right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
  // Transform
  x: getTranslateFromMatrix(4, 13),
  y: getTranslateFromMatrix(5, 14)
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;

// ../../../node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs
var toResolve = /* @__PURE__ */ new Set();
var isScheduled = false;
var anyNeedsMeasurement = false;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
    const transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach((element) => {
      const removedTransforms = removeNonTranslationalTransform(element);
      if (!removedTransforms.length)
        return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
    elementsToMeasure.forEach((element) => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          var _a;
          (_a = element.getValue(key)) === null || _a === void 0 ? void 0 : _a.set(value);
        });
      }
    });
    resolversToMeasure.forEach((resolver) => resolver.measureEndState());
    resolversToMeasure.forEach((resolver) => {
      if (resolver.suspendedScrollY !== void 0) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement = false;
  isScheduled = false;
  toResolve.forEach((resolver) => resolver.complete());
  toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach((resolver) => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement = true;
    }
  });
}
function flushKeyframeResolvers() {
  readAllKeyframes();
  measureAllKeyframes();
}
var KeyframeResolver = class {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
    this.isComplete = false;
    this.isAsync = false;
    this.needsMeasurement = false;
    this.isScheduled = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue2;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.isScheduled = true;
    if (this.isAsync) {
      toResolve.add(this);
      if (!isScheduled) {
        isScheduled = true;
        frame.read(readAllKeyframes);
        frame.resolveKeyframes(measureAllKeyframes);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (unresolvedKeyframes[i] === null) {
        if (i === 0) {
          const currentValue = motionValue2 === null || motionValue2 === void 0 ? void 0 : motionValue2.get();
          const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
          if (currentValue !== void 0) {
            unresolvedKeyframes[0] = currentValue;
          } else if (element && name) {
            const valueAsRead = element.readValue(name, finalKeyframe);
            if (valueAsRead !== void 0 && valueAsRead !== null) {
              unresolvedKeyframes[0] = valueAsRead;
            }
          }
          if (unresolvedKeyframes[0] === void 0) {
            unresolvedKeyframes[0] = finalKeyframe;
          }
          if (motionValue2 && currentValue === void 0) {
            motionValue2.set(unresolvedKeyframes[0]);
          }
        } else {
          unresolvedKeyframes[i] = unresolvedKeyframes[i - 1];
        }
      }
    }
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete() {
    this.isComplete = true;
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe);
    toResolve.delete(this);
  }
  cancel() {
    if (!this.isComplete) {
      this.isScheduled = false;
      toResolve.delete(this);
    }
  }
  resume() {
    if (!this.isComplete)
      this.scheduleResolve();
  }
};

// ../../../node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs
var isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);

// ../../../node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs
var splitCSSVariableRegex = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 !== null && token1 !== void 0 ? token1 : token2}`, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs
var testValueType = (v) => (type) => type.test(v);

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs
var auto = {
  test: (v) => v === "auto",
  parse: (v) => v
};

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = (v) => dimensionValueTypes.find(testValueType(v));

// ../../../node_modules/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs
var DOMKeyframesResolver = class extends KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue2, element, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes, element, name } = this;
    if (!element || !element.current)
      return;
    super.readKeyframes();
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      let keyframe = unresolvedKeyframes[i];
      if (typeof keyframe === "string") {
        keyframe = keyframe.trim();
        if (isCSSVariableToken(keyframe)) {
          const resolved = getVariableValue(keyframe, element.current);
          if (resolved !== void 0) {
            unresolvedKeyframes[i] = resolved;
          }
          if (i === unresolvedKeyframes.length - 1) {
            this.finalKeyframe = keyframe;
          }
        }
      }
    }
    this.resolveNoneKeyframes();
    if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
      return;
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = findDimensionValueType(origin);
    const targetType = findDimensionValueType(target);
    if (originType === targetType)
      return;
    if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
      for (let i = 0; i < unresolvedKeyframes.length; i++) {
        const value = unresolvedKeyframes[i];
        if (typeof value === "string") {
          unresolvedKeyframes[i] = parseFloat(value);
        }
      }
    } else {
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes, name } = this;
    const noneKeyframeIndexes = [];
    for (let i = 0; i < unresolvedKeyframes.length; i++) {
      if (isNone(unresolvedKeyframes[i])) {
        noneKeyframeIndexes.push(i);
      }
    }
    if (noneKeyframeIndexes.length) {
      makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const { element, unresolvedKeyframes, name } = this;
    if (!element || !element.current)
      return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== void 0) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    var _a;
    const { element, name, unresolvedKeyframes } = this;
    if (!element || !element.current)
      return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === void 0) {
      this.finalKeyframe = finalKeyframe;
    }
    if ((_a = this.removedTransforms) === null || _a === void 0 ? void 0 : _a.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
};

// ../../../node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs
var isAnimatable = (value, name) => {
  if (name === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// ../../../node_modules/framer-motion/dist/es/animation/animators/utils/can-animate.mjs
function hasKeyframesChanged(keyframes2) {
  const current = keyframes2[0];
  if (keyframes2.length === 1)
    return true;
  for (let i = 0; i < keyframes2.length; i++) {
    if (keyframes2[i] !== current)
      return true;
  }
}
function canAnimate(keyframes2, name, type, velocity) {
  const originKeyframe = keyframes2[0];
  if (originKeyframe === null)
    return false;
  if (name === "display" || name === "visibility")
    return true;
  const targetKeyframe = keyframes2[keyframes2.length - 1];
  const isOriginAnimatable = isAnimatable(originKeyframe, name);
  const isTargetAnimatable = isAnimatable(targetKeyframe, name);
  warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`);
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes2) || (type === "spring" || isGenerator(type)) && velocity;
}

// ../../../node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs
var isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe) {
  const resolvedKeyframes = keyframes2.filter(isNotNull);
  const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// ../../../node_modules/framer-motion/dist/es/animation/animators/BaseAnimation.mjs
var MAX_RESOLVE_DELAY = 40;
var BaseAnimation = class {
  constructor({ autoplay = true, delay: delay2 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", ...options }) {
    this.isStopped = false;
    this.hasAttemptedResolve = false;
    this.createdAt = time.now();
    this.options = {
      autoplay,
      delay: delay2,
      type,
      repeat,
      repeatDelay,
      repeatType,
      ...options
    };
    this.updateFinishedPromise();
  }
  /**
   * This method uses the createdAt and resolvedAt to calculate the
   * animation startTime. *Ideally*, we would use the createdAt time as t=0
   * as the following frame would then be the first frame of the animation in
   * progress, which would feel snappier.
   *
   * However, if there's a delay (main thread work) between the creation of
   * the animation and the first commited frame, we prefer to use resolvedAt
   * to avoid a sudden jump into the animation.
   */
  calcStartTime() {
    if (!this.resolvedAt)
      return this.createdAt;
    return this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt;
  }
  /**
   * A getter for resolved data. If keyframes are not yet resolved, accessing
   * this.resolved will synchronously flush all pending keyframe resolvers.
   * This is a deoptimisation, but at its worst still batches read/writes.
   */
  get resolved() {
    if (!this._resolved && !this.hasAttemptedResolve) {
      flushKeyframeResolvers();
    }
    return this._resolved;
  }
  /**
   * A method to be called when the keyframes resolver completes. This method
   * will check if its possible to run the animation and, if not, skip it.
   * Otherwise, it will call initPlayback on the implementing class.
   */
  onKeyframesResolved(keyframes2, finalKeyframe) {
    this.resolvedAt = time.now();
    this.hasAttemptedResolve = true;
    const { name, type, velocity, delay: delay2, onComplete, onUpdate, isGenerator: isGenerator2 } = this.options;
    if (!isGenerator2 && !canAnimate(keyframes2, name, type, velocity)) {
      if (instantAnimationState.current || !delay2) {
        onUpdate && onUpdate(getFinalKeyframe(keyframes2, this.options, finalKeyframe));
        onComplete && onComplete();
        this.resolveFinishedPromise();
        return;
      } else {
        this.options.duration = 0;
      }
    }
    const resolvedAnimation = this.initPlayback(keyframes2, finalKeyframe);
    if (resolvedAnimation === false)
      return;
    this._resolved = {
      keyframes: keyframes2,
      finalKeyframe,
      ...resolvedAnimation
    };
    this.onPostResolved();
  }
  onPostResolved() {
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.currentFinishedPromise.then(resolve, reject);
  }
  flatten() {
    this.options.type = "keyframes";
    this.options.ease = "linear";
  }
  updateFinishedPromise() {
    this.currentFinishedPromise = new Promise((resolve) => {
      this.resolveFinishedPromise = resolve;
    });
  }
};

// ../../../node_modules/framer-motion/dist/es/stats/animation-count.mjs
var activeAnimations = {
  layout: 0,
  mainThread: 0,
  waapi: 0
};

// ../../../node_modules/framer-motion/dist/es/utils/mix/number.mjs
var mixNumber = (from, to, progress2) => {
  return from + (to - from) * progress2;
};

// ../../../node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    red = hueToRgb(p, q, hue + 1 / 3);
    green = hueToRgb(p, q, hue);
    blue = hueToRgb(p, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}

// ../../../node_modules/framer-motion/dist/es/utils/mix/immediate.mjs
function mixImmediate(a, b) {
  return (p) => p > 0 ? b : a;
}

// ../../../node_modules/framer-motion/dist/es/utils/mix/color.mjs
var mixLinearColor = (from, to, v) => {
  const fromExpo = from * from;
  const expo = v * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes = [hex, rgba, hsla];
var getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color2) {
  const type = getColorType(color2);
  warning(Boolean(type), `'${color2}' is not an animatable color. Use the equivalent color code instead.`);
  if (!Boolean(type))
    return false;
  let model = type.parse(color2);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
var mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  if (!fromRGBA || !toRGBA) {
    return mixImmediate(from, to);
  }
  const blended = { ...fromRGBA };
  return (v) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
    blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v);
    return rgba.transform(blended);
  };
};

// ../../../node_modules/framer-motion/dist/es/utils/pipe.mjs
var combineFunctions = (a, b) => (v) => b(a(v));
var pipe = (...transformers) => transformers.reduce(combineFunctions);

// ../../../node_modules/framer-motion/dist/es/utils/mix/visibility.mjs
var invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
  if (invisibleValues.has(origin)) {
    return (p) => p <= 0 ? origin : target;
  } else {
    return (p) => p >= 1 ? target : origin;
  }
}

// ../../../node_modules/framer-motion/dist/es/utils/mix/complex.mjs
function mixNumber2(a, b) {
  return (p) => mixNumber(a, b, p);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber2;
  } else if (typeof a === "string") {
    return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return color.test(a) ? mixColor : mixObject;
  }
  return mixImmediate;
}
function mixArray(a, b) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
  return (p) => {
    for (let i = 0; i < numValues; i++) {
      output[i] = blendValue[i](p);
    }
    return output;
  };
}
function mixObject(a, b) {
  const output = { ...a, ...b };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b[key] !== void 0) {
      blendValue[key] = getMixer(a[key])(a[key], b[key]);
    }
  }
  return (v) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  var _a;
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i = 0; i < target.values.length; i++) {
    const type = target.types[i];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = (_a = origin.values[originIndex]) !== null && _a !== void 0 ? _a : 0;
    orderedOrigin[i] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
      return mixVisibility(origin, target);
    }
    return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
    return mixImmediate(origin, target);
  }
};

// ../../../node_modules/framer-motion/dist/es/utils/mix/index.mjs
function mix(from, to, p) {
  if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
    return mixNumber(from, to, p);
  }
  const mixer = getMixer(from);
  return mixer(from, to);
}

// ../../../node_modules/framer-motion/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration = 5;
function calcGeneratorVelocity(resolveValue, t, current) {
  const prevT = Math.max(t - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t - prevT);
}

// ../../../node_modules/framer-motion/dist/es/animation/generators/spring/defaults.mjs
var springDefaults = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};

// ../../../node_modules/framer-motion/dist/es/animation/generators/spring/find.mjs
var safeMin = 1e-3;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
  let envelope;
  let derivative;
  warning(duration <= secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
  duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b = calcAngularFreq(undampedFreq2, dampingRatio);
      const c = Math.exp(-delta);
      return safeMin - a / b * c;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f = Math.exp(-delta);
      const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d - e) * f) / g;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b = (velocity - undampedFreq2) * (duration * duration);
      return a * b;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i = 1; i < rootIterations; i++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}

// ../../../node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys2) {
  return keys2.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: springDefaults.velocity,
    stiffness: springDefaults.stiffness,
    damping: springDefaults.damping,
    mass: springDefaults.mass,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    if (options.visualDuration) {
      const visualDuration = options.visualDuration;
      const root = 2 * Math.PI / (visualDuration * 1.2);
      const stiffness = root * root;
      const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
      springOptions = {
        ...springOptions,
        mass: springDefaults.mass,
        stiffness,
        damping
      };
    } else {
      const derived = findSpring(options);
      springOptions = {
        ...springOptions,
        ...derived,
        mass: springDefaults.mass
      };
      springOptions.isResolvedFromDuration = true;
    }
  }
  return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
  const options = typeof optionsOrVisualDuration !== "object" ? {
    visualDuration: optionsOrVisualDuration,
    keyframes: [0, 1],
    bounce
  } : optionsOrVisualDuration;
  let { restSpeed, restDelta } = options;
  const origin = options.keyframes[0];
  const target = options.keyframes[options.keyframes.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
  restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
  let resolveSpring;
  if (dampingRatio < 1) {
    const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t) => target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
      const freqForT = Math.min(dampedAngularFreq * t, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
  }
  const generator = {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    next: (t) => {
      const current = resolveSpring(t);
      if (!isResolvedFromDuration) {
        let currentVelocity = 0;
        if (dampingRatio < 1) {
          currentVelocity = t === 0 ? secondsToMilliseconds(initialVelocity) : calcGeneratorVelocity(resolveSpring, t, current);
        }
        const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
        const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
        state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
      } else {
        state.done = t >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    },
    toString: () => {
      const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
      const easing = generateLinearEasing((progress2) => generator.next(calculatedDuration * progress2).value, calculatedDuration, 30);
      return calculatedDuration + "ms " + easing;
    }
  };
  return generator;
}

// ../../../node_modules/framer-motion/dist/es/animation/generators/inertia.mjs
function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes2[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v) => min !== void 0 && v < min || max !== void 0 && v > max;
  const nearestBoundary = (v) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v) < Math.abs(max - v) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
  const calcLatest = (t) => target + calcDelta(t);
  const applyFriction = (t) => {
    const delta = calcDelta(t);
    const latest = calcLatest(t);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t;
    spring$1 = spring({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: calcGeneratorVelocity(calcLatest, t, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t);
        checkCatchBoundary(t);
      }
      if (timeReachedBoundary !== void 0 && t >= timeReachedBoundary) {
        return spring$1.next(t - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t);
        return state;
      }
    }
  };
}

// ../../../node_modules/framer-motion/dist/es/easing/ease.mjs
var easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1);
var easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1);
var easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);

// ../../../node_modules/framer-motion/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray = (ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
};

// ../../../node_modules/framer-motion/dist/es/easing/utils/map.mjs
var easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
var easingDefinitionToFunction = (definition) => {
  if (isBezierDefinition(definition)) {
    invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
    const [x1, y1, x2, y2] = definition;
    return cubicBezier(x1, y1, x2, y2);
  } else if (typeof definition === "string") {
    invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`);
    return easingLookup[definition];
  }
  return definition;
};

// ../../../node_modules/framer-motion/dist/es/utils/interpolate.mjs
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || mix;
  const numMixers = output.length - 1;
  for (let i = 0; i < numMixers; i++) {
    let mixer = mixerFactory(output[i], output[i + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i] || noop : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length");
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1])
    return () => output[1];
  const isZeroDeltaRange = input[0] === input[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = (v) => {
    if (isZeroDeltaRange && v < input[0])
      return output[0];
    let i = 0;
    if (numMixers > 1) {
      for (; i < input.length - 2; i++) {
        if (v < input[i + 1])
          break;
      }
    }
    const progressInRange = progress(input[i], input[i + 1], v);
    return mixers[i](progressInRange);
  };
  return isClamp ? (v) => interpolator(clamp(input[0], input[inputLength - 1], v)) : interpolator;
}

// ../../../node_modules/framer-motion/dist/es/utils/offsets/fill.mjs
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset.push(mixNumber(min, 1, offsetProgress));
  }
}

// ../../../node_modules/framer-motion/dist/es/utils/offsets/default.mjs
function defaultOffset(arr) {
  const offset = [0];
  fillOffset(offset, arr.length - 1);
  return offset;
}

// ../../../node_modules/framer-motion/dist/es/utils/offsets/time.mjs
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}

// ../../../node_modules/framer-motion/dist/es/animation/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t) => {
      state.value = mapTimeToKeyframe(t);
      state.done = t >= duration;
      return state;
    }
  };
}

// ../../../node_modules/framer-motion/dist/es/animation/animators/drivers/driver-frameloop.mjs
var frameloopDriver = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: () => frame.update(passTimestamp, true),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : time.now()
  };
};

// ../../../node_modules/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs
var generators = {
  decay: inertia,
  inertia,
  tween: keyframes,
  keyframes,
  spring
};
var percentToProgress = (percent2) => percent2 / 100;
var MainThreadAnimation = class extends BaseAnimation {
  constructor(options) {
    super(options);
    this.holdTime = null;
    this.cancelTime = null;
    this.currentTime = 0;
    this.playbackSpeed = 1;
    this.pendingPlayState = "running";
    this.startTime = null;
    this.state = "idle";
    this.stop = () => {
      this.resolver.cancel();
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.teardown();
      const { onStop } = this.options;
      onStop && onStop();
    };
    const { name, motionValue: motionValue2, element, keyframes: keyframes2 } = this.options;
    const KeyframeResolver$1 = (element === null || element === void 0 ? void 0 : element.KeyframeResolver) || KeyframeResolver;
    const onResolved = (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe);
    this.resolver = new KeyframeResolver$1(keyframes2, onResolved, name, motionValue2, element);
    this.resolver.scheduleResolve();
  }
  flatten() {
    super.flatten();
    if (this._resolved) {
      Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
    }
  }
  initPlayback(keyframes$1) {
    const { type = "keyframes", repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = this.options;
    const generatorFactory = isGenerator(type) ? type : generators[type] || keyframes;
    let mapPercentToKeyframes;
    let mirroredGenerator;
    if (false) {
      invariant(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`);
    }
    if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
      mapPercentToKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
      keyframes$1 = [0, 100];
    }
    const generator = generatorFactory({ ...this.options, keyframes: keyframes$1 });
    if (repeatType === "mirror") {
      mirroredGenerator = generatorFactory({
        ...this.options,
        keyframes: [...keyframes$1].reverse(),
        velocity: -velocity
      });
    }
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = calcGeneratorDuration(generator);
    }
    const { calculatedDuration } = generator;
    const resolvedDuration = calculatedDuration + repeatDelay;
    const totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
    return {
      generator,
      mirroredGenerator,
      mapPercentToKeyframes,
      calculatedDuration,
      resolvedDuration,
      totalDuration
    };
  }
  onPostResolved() {
    const { autoplay = true } = this.options;
    activeAnimations.mainThread++;
    this.play();
    if (this.pendingPlayState === "paused" || !autoplay) {
      this.pause();
    } else {
      this.state = this.pendingPlayState;
    }
  }
  tick(timestamp, sample = false) {
    const { resolved } = this;
    if (!resolved) {
      const { keyframes: keyframes3 } = this.options;
      return { done: true, value: keyframes3[keyframes3.length - 1] };
    }
    const { finalKeyframe, generator, mirroredGenerator, mapPercentToKeyframes, keyframes: keyframes2, calculatedDuration, totalDuration, resolvedDuration } = resolved;
    if (this.startTime === null)
      return generator.next(0);
    const { delay: delay2, repeat, repeatType, repeatDelay, onUpdate } = this.options;
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    if (sample) {
      this.currentTime = timestamp;
    } else if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      this.currentTime = Math.round(timestamp - this.startTime) * this.speed;
    }
    const timeWithoutDelay = this.currentTime - delay2 * (this.speed >= 0 ? 1 : -1);
    const isInDelayPhase = this.speed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    const state = isInDelayPhase ? { done: false, value: keyframes2[0] } : frameGenerator.next(elapsed);
    if (mapPercentToKeyframes) {
      state.value = mapPercentToKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.speed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && finalKeyframe !== void 0) {
      state.value = getFinalKeyframe(keyframes2, this.options, finalKeyframe);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  get duration() {
    const { resolved } = this;
    return resolved ? millisecondsToSeconds(resolved.calculatedDuration) : 0;
  }
  get time() {
    return millisecondsToSeconds(this.currentTime);
  }
  set time(newTime) {
    newTime = secondsToMilliseconds(newTime);
    this.currentTime = newTime;
    if (this.holdTime !== null || this.speed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.speed;
    }
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    const hasChanged = this.playbackSpeed !== newSpeed;
    this.playbackSpeed = newSpeed;
    if (hasChanged) {
      this.time = millisecondsToSeconds(this.currentTime);
    }
  }
  play() {
    if (!this.resolver.isScheduled) {
      this.resolver.resume();
    }
    if (!this._resolved) {
      this.pendingPlayState = "running";
      return;
    }
    if (this.isStopped)
      return;
    const { driver = frameloopDriver, onPlay, startTime } = this.options;
    if (!this.driver) {
      this.driver = driver((timestamp) => this.tick(timestamp));
    }
    onPlay && onPlay();
    const now2 = this.driver.now();
    if (this.holdTime !== null) {
      this.startTime = now2 - this.holdTime;
    } else if (!this.startTime) {
      this.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
    } else if (this.state === "finished") {
      this.startTime = now2;
    }
    if (this.state === "finished") {
      this.updateFinishedPromise();
    }
    this.cancelTime = this.startTime;
    this.holdTime = null;
    this.state = "running";
    this.driver.start();
  }
  pause() {
    var _a;
    if (!this._resolved) {
      this.pendingPlayState = "paused";
      return;
    }
    this.state = "paused";
    this.holdTime = (_a = this.currentTime) !== null && _a !== void 0 ? _a : 0;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.pendingPlayState = this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    this.teardown();
    this.state = "finished";
    const { onComplete } = this.options;
    onComplete && onComplete();
  }
  cancel() {
    if (this.cancelTime !== null) {
      this.tick(this.cancelTime);
    }
    this.teardown();
    this.updateFinishedPromise();
  }
  teardown() {
    this.state = "idle";
    this.stopDriver();
    this.resolveFinishedPromise();
    this.updateFinishedPromise();
    this.startTime = this.cancelTime = null;
    this.resolver.cancel();
    activeAnimations.mainThread--;
  }
  stopDriver() {
    if (!this.driver)
      return;
    this.driver.stop();
    this.driver = void 0;
  }
  sample(time2) {
    this.startTime = 0;
    return this.tick(time2, true);
  }
};

// ../../../node_modules/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs
var acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]);

// ../../../node_modules/framer-motion/dist/es/animation/animators/waapi/index.mjs
function startWaapiAnimation(element, valueName, keyframes2, { delay: delay2 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2 = "easeInOut", times } = {}) {
  const keyframeOptions = { [valueName]: keyframes2 };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease2, duration);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  if (statsBuffer.value) {
    activeAnimations.waapi++;
  }
  const animation = element.animate(keyframeOptions, {
    delay: delay2,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  });
  if (statsBuffer.value) {
    animation.finished.finally(() => {
      activeAnimations.waapi--;
    });
  }
  return animation;
}

// ../../../node_modules/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs
var supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));

// ../../../node_modules/framer-motion/dist/es/animation/animators/AcceleratedAnimation.mjs
var sampleDelta = 10;
var maxDuration = 2e4;
function requiresPregeneratedKeyframes(options) {
  return isGenerator(options.type) || options.type === "spring" || !isWaapiSupportedEasing(options.ease);
}
function pregenerateKeyframes(keyframes2, options) {
  const sampleAnimation = new MainThreadAnimation({
    ...options,
    keyframes: keyframes2,
    repeat: 0,
    delay: 0,
    isGenerator: true
  });
  let state = { done: false, value: keyframes2[0] };
  const pregeneratedKeyframes = [];
  let t = 0;
  while (!state.done && t < maxDuration) {
    state = sampleAnimation.sample(t);
    pregeneratedKeyframes.push(state.value);
    t += sampleDelta;
  }
  return {
    times: void 0,
    keyframes: pregeneratedKeyframes,
    duration: t - sampleDelta,
    ease: "linear"
  };
}
var unsupportedEasingFunctions = {
  anticipate,
  backInOut,
  circInOut
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
var AcceleratedAnimation = class extends BaseAnimation {
  constructor(options) {
    super(options);
    const { name, motionValue: motionValue2, element, keyframes: keyframes2 } = this.options;
    this.resolver = new DOMKeyframesResolver(keyframes2, (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe), name, motionValue2, element);
    this.resolver.scheduleResolve();
  }
  initPlayback(keyframes2, finalKeyframe) {
    let { duration = 300, times, ease: ease2, type, motionValue: motionValue2, name, startTime } = this.options;
    if (!motionValue2.owner || !motionValue2.owner.current) {
      return false;
    }
    if (typeof ease2 === "string" && supportsLinearEasing() && isUnsupportedEase(ease2)) {
      ease2 = unsupportedEasingFunctions[ease2];
    }
    if (requiresPregeneratedKeyframes(this.options)) {
      const { onComplete, onUpdate, motionValue: motionValue3, element, ...options } = this.options;
      const pregeneratedAnimation = pregenerateKeyframes(keyframes2, options);
      keyframes2 = pregeneratedAnimation.keyframes;
      if (keyframes2.length === 1) {
        keyframes2[1] = keyframes2[0];
      }
      duration = pregeneratedAnimation.duration;
      times = pregeneratedAnimation.times;
      ease2 = pregeneratedAnimation.ease;
      type = "keyframes";
    }
    const animation = startWaapiAnimation(motionValue2.owner.current, name, keyframes2, { ...this.options, duration, times, ease: ease2 });
    animation.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
    if (this.pendingTimeline) {
      attachTimeline(animation, this.pendingTimeline);
      this.pendingTimeline = void 0;
    } else {
      animation.onfinish = () => {
        const { onComplete } = this.options;
        motionValue2.set(getFinalKeyframe(keyframes2, this.options, finalKeyframe));
        onComplete && onComplete();
        this.cancel();
        this.resolveFinishedPromise();
      };
    }
    return {
      animation,
      duration,
      times,
      type,
      ease: ease2,
      keyframes: keyframes2
    };
  }
  get duration() {
    const { resolved } = this;
    if (!resolved)
      return 0;
    const { duration } = resolved;
    return millisecondsToSeconds(duration);
  }
  get time() {
    const { resolved } = this;
    if (!resolved)
      return 0;
    const { animation } = resolved;
    return millisecondsToSeconds(animation.currentTime || 0);
  }
  set time(newTime) {
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    animation.currentTime = secondsToMilliseconds(newTime);
  }
  get speed() {
    const { resolved } = this;
    if (!resolved)
      return 1;
    const { animation } = resolved;
    return animation.playbackRate;
  }
  set speed(newSpeed) {
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    animation.playbackRate = newSpeed;
  }
  get state() {
    const { resolved } = this;
    if (!resolved)
      return "idle";
    const { animation } = resolved;
    return animation.playState;
  }
  get startTime() {
    const { resolved } = this;
    if (!resolved)
      return null;
    const { animation } = resolved;
    return animation.startTime;
  }
  /**
   * Replace the default DocumentTimeline with another AnimationTimeline.
   * Currently used for scroll animations.
   */
  attachTimeline(timeline) {
    if (!this._resolved) {
      this.pendingTimeline = timeline;
    } else {
      const { resolved } = this;
      if (!resolved)
        return noop;
      const { animation } = resolved;
      attachTimeline(animation, timeline);
    }
    return noop;
  }
  play() {
    if (this.isStopped)
      return;
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    if (animation.playState === "finished") {
      this.updateFinishedPromise();
    }
    animation.play();
  }
  pause() {
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation } = resolved;
    animation.pause();
  }
  stop() {
    this.resolver.cancel();
    this.isStopped = true;
    if (this.state === "idle")
      return;
    this.resolveFinishedPromise();
    this.updateFinishedPromise();
    const { resolved } = this;
    if (!resolved)
      return;
    const { animation, keyframes: keyframes2, duration, type, ease: ease2, times } = resolved;
    if (animation.playState === "idle" || animation.playState === "finished") {
      return;
    }
    if (this.time) {
      const { motionValue: motionValue2, onUpdate, onComplete, element, ...options } = this.options;
      const sampleAnimation = new MainThreadAnimation({
        ...options,
        keyframes: keyframes2,
        duration,
        type,
        ease: ease2,
        times,
        isGenerator: true
      });
      const sampleTime = secondsToMilliseconds(this.time);
      motionValue2.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta).value, sampleAnimation.sample(sampleTime).value, sampleDelta);
    }
    const { onStop } = this.options;
    onStop && onStop();
    this.cancel();
  }
  complete() {
    const { resolved } = this;
    if (!resolved)
      return;
    resolved.animation.finish();
  }
  cancel() {
    const { resolved } = this;
    if (!resolved)
      return;
    resolved.animation.cancel();
  }
  static supports(options) {
    const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type } = options;
    if (!motionValue2 || !motionValue2.owner || !(motionValue2.owner.current instanceof HTMLElement)) {
      return false;
    }
    const { onUpdate, transformTemplate } = motionValue2.owner.getProps();
    return supportsWaapi() && name && acceleratedValues.has(name) && /**
     * If we're outputting values to onUpdate then we can't use WAAPI as there's
     * no way to read the value from WAAPI every frame.
     */
    !onUpdate && !transformTemplate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
  }
};

// ../../../node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
var keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
var ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
var getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
  if (keyframes2.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
  }
  return ease;
};

// ../../../node_modules/framer-motion/dist/es/animation/utils/is-transition-defined.mjs
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
  return !!Object.keys(transition).length;
}

// ../../../node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition(transition, name) || {};
  const delay2 = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - secondsToMilliseconds(delay2);
  let options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v) => {
      value.set(v);
      valueTransition.onUpdate && valueTransition.onUpdate(v);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined(valueTransition)) {
    options = {
      ...options,
      ...getDefaultTransition(name, options)
    };
  }
  if (options.duration) {
    options.duration = secondsToMilliseconds(options.duration);
  }
  if (options.repeatDelay) {
    options.repeatDelay = secondsToMilliseconds(options.repeatDelay);
  }
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    options.duration = 0;
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (instantAnimationState.current || MotionGlobalConfig.skipAnimations) {
    shouldSkip = true;
    options.duration = 0;
    options.delay = 0;
  }
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return new GroupPlaybackControls([]);
    }
  }
  if (!isHandoff && AcceleratedAnimation.supports(options)) {
    return new AcceleratedAnimation(options);
  } else {
    return new MainThreadAnimation(options);
  }
};

// ../../../node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  var _a;
  let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
  if (transitionOverride)
    transition = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  for (const key in target) {
    const value = visualElement.getValue(key, (_a = visualElement.latestValues[key]) !== null && _a !== void 0 ? _a : null);
    const valueTarget = target[key];
    if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay: delay2,
      ...getValueTransition(transition || {}, key)
    };
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId(visualElement);
      if (appearId) {
        const startTime = window.MotionHandoffAnimation(appearId, key, frame);
        if (startTime !== null) {
          valueTransition.startTime = startTime;
          isHandoff = true;
        }
      }
    }
    addValueToWillChange(visualElement, key);
    value.start(animateMotionValue(key, value, valueTarget, visualElement.shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      animations2.push(animation);
    }
  }
  if (transitionEnd) {
    Promise.all(animations2).then(() => {
      frame.update(() => {
        transitionEnd && setTarget(visualElement, transitionEnd);
      });
    });
  }
  return animations2;
}

// ../../../node_modules/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs
function animateVariant(visualElement, variant, options = {}) {
  var _a;
  const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom : void 0);
  let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
  const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
    return first().then(() => last());
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
  const generateStaggerDuration = staggerDirection === 1 ? (i = 0) => i * staggerChildren : (i = 0) => maxStaggerDuration - i * staggerChildren;
  Array.from(visualElement.variantChildren).sort(sortByTreeOrder).forEach((child, i) => {
    child.notify("AnimationStart", variant);
    animations2.push(animateVariant(child, variant, {
      ...options,
      delay: delayChildren + generateStaggerDuration(i)
    }).then(() => child.notify("AnimationComplete", variant)));
  });
  return Promise.all(animations2);
}
function sortByTreeOrder(a, b) {
  return a.sortNodePosition(b);
}

// ../../../node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
  }
  return animation.then(() => {
    visualElement.notify("AnimationComplete", definition);
  });
}

// ../../../node_modules/framer-motion/dist/es/utils/shallow-compare.mjs
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i = 0; i < prevLength; i++) {
    if (prev[i] !== next[i])
      return false;
  }
  return true;
}

// ../../../node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs
var numVariantProps = variantProps.length;
function getVariantContext(visualElement) {
  if (!visualElement)
    return void 0;
  if (!visualElement.isControllingVariants) {
    const context2 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
    if (visualElement.props.initial !== void 0) {
      context2.initial = visualElement.props.initial;
    }
    return context2;
  }
  const context = {};
  for (let i = 0; i < numVariantProps; i++) {
    const name = variantProps[i];
    const prop = visualElement.props[name];
    if (isVariantLabel(prop) || prop === false) {
      context[name] = prop;
    }
  }
  return context;
}

// ../../../node_modules/framer-motion/dist/es/render/utils/animation-state.mjs
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function animateList(visualElement) {
  return (animations2) => Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
  let animate = animateList(visualElement);
  let state = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = (type) => (acc, definition) => {
    var _a;
    const resolved = resolveVariant(visualElement, definition, type === "exit" ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom : void 0);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  function animateChanges(changedActiveType) {
    const { props } = visualElement;
    const context = getVariantContext(visualElement.parent) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes; i++) {
      const type = reversePriorityOrder[i];
      const typeState = state[type];
      const prop = props[type] !== void 0 ? props[type] : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i > removedVariantIndex && propIsVariant;
      let handledRemovedValues = false;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        if (removedKeys.has(key)) {
          handledRemovedValues = true;
          removedKeys.delete(key);
        }
        typeState.needsAnimating[key] = true;
        const motionValue2 = visualElement.getValue(key);
        if (motionValue2)
          motionValue2.liveStyle = false;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        let valueHasChanged = false;
        if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
          valueHasChanged = !shallowCompare(next, prev);
        } else {
          valueHasChanged = next !== prev;
        }
        if (valueHasChanged) {
          if (next !== void 0 && next !== null) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if (isInitialRender && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      const willAnimateViaParent = isInherited && variantDidChange;
      const needsAnimating = !willAnimateViaParent || handledRemovedValues;
      if (shouldAnimateType && needsAnimating) {
        animations2.push(...definitionList.map((animation) => ({
          animation,
          options: { type }
        })));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      if (typeof props.initial !== "boolean") {
        const initialTransition = resolveVariant(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
        if (initialTransition && initialTransition.transition) {
          fallbackAnimation.transition = initialTransition.transition;
        }
      }
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        const motionValue2 = visualElement.getValue(key);
        if (motionValue2)
          motionValue2.liveStyle = true;
        fallbackAnimation[key] = fallbackTarget !== null && fallbackTarget !== void 0 ? fallbackTarget : null;
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    return shouldAnimate ? animate(animations2) : Promise.resolve();
  }
  function setActive(type, isActive) {
    var _a;
    if (state[type].isActive === isActive)
      return Promise.resolve();
    (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
      var _a2;
      return (_a2 = child.animationState) === null || _a2 === void 0 ? void 0 : _a2.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    const animations2 = animateChanges(type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations2;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state,
    reset: () => {
      state = createState();
      isInitialRender = true;
    }
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    animate: createTypeState(true),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whileTap: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState()
  };
}

// ../../../node_modules/framer-motion/dist/es/motion/features/Feature.mjs
var Feature = class {
  constructor(node) {
    this.isMounted = false;
    this.node = node;
  }
  update() {
  }
};

// ../../../node_modules/framer-motion/dist/es/motion/features/animation/index.mjs
var AnimationFeature = class extends Feature {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node);
    node.animationState || (node.animationState = createAnimationState(node));
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.node.getProps();
    if (isAnimationControls(animate)) {
      this.unmountControls = animate.subscribe(this.node);
    }
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
    var _a;
    this.node.animationState.reset();
    (_a = this.unmountControls) === null || _a === void 0 ? void 0 : _a.call(this);
  }
};

// ../../../node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs
var id = 0;
var ExitAnimationFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.id = id++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent, onExitComplete } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent === prevIsPresent) {
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
    if (onExitComplete && !isPresent) {
      exitAnimation.then(() => {
        onExitComplete(this.id);
      });
    }
  }
  mount() {
    const { register, onExitComplete } = this.node.presenceContext || {};
    if (onExitComplete) {
      onExitComplete(this.id);
    }
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
};

// ../../../node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
};

// ../../../node_modules/framer-motion/dist/es/events/add-dom-event.mjs
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}

// ../../../node_modules/framer-motion/dist/es/events/event-info.mjs
function extractEventInfo(event) {
  return {
    point: {
      x: event.pageX,
      y: event.pageY
    }
  };
}
var addPointerInfo = (handler) => {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
};

// ../../../node_modules/framer-motion/dist/es/events/add-pointer-event.mjs
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}

// ../../../node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox({ x, y }) {
  return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
function transformBoxPoints(point2, transformPoint2) {
  if (!transformPoint2)
    return point2;
  const topLeft = transformPoint2({ x: point2.left, y: point2.top });
  const bottomRight = transformPoint2({ x: point2.right, y: point2.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// ../../../node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs
var SCALE_PRECISION = 1e-4;
var SCALE_MIN = 1 - SCALE_PRECISION;
var SCALE_MAX = 1 + SCALE_PRECISION;
var TRANSLATE_PRECISION = 0.01;
var TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
var TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mixNumber(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  delta.translate = mixNumber(target.min, target.max, delta.origin) - delta.originPoint;
  if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) {
    delta.scale = 1;
  }
  if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) {
    delta.translate = 0;
  }
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent) {
  target.min = parent.min + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
  calcRelativeAxis(target.x, relative.x, parent.x);
  calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout2, parent) {
  target.min = layout2.min - parent.min;
  target.max = target.min + calcLength(layout2);
}
function calcRelativePosition(target, layout2, parent) {
  calcRelativeAxisPosition(target.x, layout2.x, parent.x);
  calcRelativeAxisPosition(target.y, layout2.y, parent.y);
}

// ../../../node_modules/framer-motion/dist/es/projection/geometry/models.mjs
var createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
var createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
var createAxis = () => ({ min: 0, max: 0 });
var createBox = () => ({
  x: createAxis(),
  y: createAxis()
});

// ../../../node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}

// ../../../node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale({ scale: scale2, scaleX, scaleY }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}

// ../../../node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point2, scale2, originPoint) {
  const distanceFromOrigin = point2 - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point2, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point2 = scalePoint(point2, boxScale, originPoint);
  }
  return scalePoint(point2, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, { x, y }) {
  applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
  applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
var TREE_SCALE_SNAP_MIN = 0.999999999999;
var TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i = 0; i < treeLength; i++) {
    node = treePath[i];
    delta = node.projectionDelta;
    const { visualElement } = node.options;
    if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      transformBox(box, {
        x: -node.scroll.offset.x,
        y: -node.scroll.offset.y
      });
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues);
    }
  }
  if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
    treeScale.x = 1;
  }
  if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
    treeScale.y = 1;
  }
}
function translateAxis(axis, distance2) {
  axis.min = axis.min + distance2;
  axis.max = axis.max + distance2;
}
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
  const originPoint = mixNumber(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function transformBox(box, transform2) {
  transformAxis(box.x, transform2.x, transform2.scaleX, transform2.scale, transform2.originX);
  transformAxis(box.y, transform2.y, transform2.scaleY, transform2.scale, transform2.originY);
}

// ../../../node_modules/framer-motion/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll: scroll2 } = rootProjectionNode2;
  if (scroll2) {
    translateAxis(viewportBox.x, scroll2.offset.x);
    translateAxis(viewportBox.y, scroll2.offset.y);
  }
  return viewportBox;
}

// ../../../node_modules/framer-motion/dist/es/utils/distance.mjs
var distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
  const xDelta = distance(a.x, b.x);
  const yDelta = distance(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}

// ../../../node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs
var PanSession = class {
  constructor(event, handlers, { transformPagePoint, dragSnapToOrigin = false } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point3 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point3, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      if (event2.target instanceof Element && event2.target.hasPointerCapture && event2.pointerId !== void 0) {
        try {
          if (!event2.target.hasPointerCapture(event2.pointerId)) {
            return;
          }
        } catch (e) {
        }
      }
      this.lastMoveEvent = event2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      capturePointer(event2, "release");
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin)
        resumeAnimation && resumeAnimation();
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo(event2.type === "pointercancel" || event2.type === "lostpointercapture" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point: point2 } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point2, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    capturePointer(event, "set");
    this.removeListeners = pipe(addPointerEvent(event.currentTarget, "pointermove", this.handlePointerMove), addPointerEvent(event.currentTarget, "pointerup", this.handlePointerUp), addPointerEvent(event.currentTarget, "pointercancel", this.handlePointerUp), addPointerEvent(event.currentTarget, "lostpointercapture", this.handlePointerUp));
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    cancelFrame(this.updatePoint);
  }
};
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point: point2 }, history) {
  return {
    point: point2,
    delta: subtractPoint(point2, lastDevicePoint(history)),
    offset: subtractPoint(point2, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  const time2 = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time2 === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time2,
    y: (lastPoint.y - timestampedPoint.y) / time2
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// ../../../node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function applyConstraints(point2, { min, max }, elastic) {
  if (min !== void 0 && point2 < min) {
    point2 = elastic ? mixNumber(min, point2, elastic.min) : Math.max(point2, min);
  } else if (max !== void 0 && point2 > max) {
    point2 = elastic ? mixNumber(max, point2, elastic.max) : Math.min(point2, max);
  }
  return point2;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin2(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout2, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout2.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout2.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}

// ../../../node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
  constructor(visualElement) {
    this.openDragLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = (event) => {
      const { dragSnapToOrigin: dragSnapToOrigin2 } = this.getProps();
      dragSnapToOrigin2 ? this.pauseAnimation() : this.stopAnimation();
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event).point);
      }
    };
    const onStart = (event, info) => {
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openDragLock)
          this.openDragLock();
        this.openDragLock = setDragLock(drag2);
        if (!this.openDragLock)
          return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength(measuredAxis);
              current = length * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart) {
        frame.postRender(() => onDragStart(event, info));
      }
      addValueToWillChange(this.visualElement, "transform");
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openDragLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    const resumeAnimation = () => eachAxis((axis) => {
      var _a;
      return this.getAnimationState(axis) === "paused" && ((_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.play());
    });
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin
    });
  }
  stop(event, info) {
    const isDragging2 = this.isDragging;
    this.cancel();
    if (!isDragging2)
      return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) {
      frame.postRender(() => onDragEnd(event, info));
    }
  }
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openDragLock) {
      this.openDragLock();
      this.openDragLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag2 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    var _a;
    const { dragConstraints, dragElastic } = this.getProps();
    const layout2 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : (_a = this.visualElement.projection) === null || _a === void 0 ? void 0 : _a.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout2) {
        this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout2 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.constraints !== false && this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout2.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    addValueToWillChange(this.visualElement, axis);
    return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  pauseAnimation() {
    eachAxis((axis) => {
      var _a;
      return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.pause();
    });
  }
  getAnimationState(axis) {
    var _a;
    return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = `_drag${axis.toUpperCase()}`;
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
  }
  snapToCursor(point2) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point2[axis] - mixNumber(min, max, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue && this.constraints !== false) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin2({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mixNumber(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      drag2 && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints) && dragConstraints.current) {
        this.constraints = this.resolveRefConstraints();
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    frame.read(measureDragConstraints);
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    }));
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
};
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}

// ../../../node_modules/framer-motion/dist/es/gestures/drag/index.mjs
var DragGesture = class extends Feature {
  constructor(node) {
    super(node);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(node);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
};

// ../../../node_modules/framer-motion/dist/es/gestures/pan/index.mjs
var asyncHandler = (handler) => (event, info) => {
  if (handler) {
    frame.postRender(() => handler(event, info));
  }
};
var PanGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint()
    });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: asyncHandler(onPanSessionStart),
      onStart: asyncHandler(onPanStart),
      onMove: onPan,
      onEnd: (event, info) => {
        delete this.session;
        if (onPanEnd) {
          frame.postRender(() => onPanEnd(event, info));
        }
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
};

// ../../../node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var import_react18 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/projection/node/state.mjs
var globalProjectionState = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: true,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: false
};

// ../../../node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x = pixelsToPercent(latest, node.target.x);
    const y = pixelsToPercent(latest, node.target.y);
    return `${x}% ${y}%`;
  }
};

// ../../../node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mixNumber(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};

// ../../../node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var MeasureLayoutWithContext = class extends import_react18.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    addScaleCorrector(defaultScaleCorrectors);
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      projection.root.didUpdate();
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag2, isPresent } = this.props;
    const projection = visualElement.projection;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        frame.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { projection } = this.props.visualElement;
    if (projection) {
      projection.root.didUpdate();
      microtask.postRender(() => {
        if (!projection.currentAnimation && projection.isLead()) {
          this.safeToRemove();
        }
      });
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
};
function MeasureLayout(props) {
  const [isPresent, safeToRemove] = usePresence();
  const layoutGroup = (0, import_react18.useContext)(LayoutGroupContext);
  return (0, import_jsx_runtime2.jsx)(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: (0, import_react18.useContext)(SwitchLayoutGroupContext), isPresent, safeToRemove });
}
var defaultScaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// ../../../node_modules/framer-motion/dist/es/animation/animate/single-value.mjs
function animateSingleValue(value, keyframes2, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
  return motionValue$1.animation;
}

// ../../../node_modules/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs
function isSVGElement(element) {
  return element instanceof SVGElement && element.tagName !== "svg";
}

// ../../../node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs
var compareByDepth = (a, b) => a.depth - b.depth;

// ../../../node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs
var FlatTree = class {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
};

// ../../../node_modules/framer-motion/dist/es/utils/delay.mjs
function delay(callback, timeout) {
  const start = time.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      cancelFrame(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  frame.read(checkElapsed, true);
  return () => cancelFrame(checkElapsed);
}

// ../../../node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs
var borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
var numBorders = borders.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mixNumber(
      0,
      // TODO Reinstate this if only child
      lead.opacity !== void 0 ? lead.opacity : 1,
      easeCrossfadeIn(progress2)
    );
    target.opacityExit = mixNumber(follow.opacity !== void 0 ? follow.opacity : 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mixNumber(follow.opacity !== void 0 ? follow.opacity : 1, lead.opacity !== void 0 ? lead.opacity : 1, progress2);
  }
  for (let i = 0; i < numBorders; i++) {
    const borderLabel = `border${borders[i]}Radius`;
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mixNumber(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mixNumber(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = /* @__PURE__ */ compress(0, 0.5, circOut);
var easeCrossfadeOut = /* @__PURE__ */ compress(0.5, 0.95, noop);
function compress(min, max, easing) {
  return (p) => {
    if (p < min)
      return 0;
    if (p > max)
      return 1;
    return easing(progress(min, max, p));
  };
}

// ../../../node_modules/framer-motion/dist/es/projection/geometry/copy.mjs
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
function copyAxisDeltaInto(delta, originDelta) {
  delta.translate = originDelta.translate;
  delta.scale = originDelta.scale;
  delta.originPoint = originDelta.originPoint;
  delta.origin = originDelta.origin;
}

// ../../../node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs
function removePointDelta(point2, translate, scale2, originPoint, boxScale) {
  point2 -= translate;
  point2 = scalePoint(point2, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point2 = scalePoint(point2, 1 / boxScale, originPoint);
  }
  return point2;
}
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mixNumber(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mixNumber(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}

// ../../../node_modules/framer-motion/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
  return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
  return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
  return Math.round(a.min) === Math.round(b.min) && Math.round(a.max) === Math.round(b.max);
}
function boxEqualsRounded(a, b) {
  return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
function axisDeltaEquals(a, b) {
  return a.translate === b.translate && a.scale === b.scale && a.originPoint === b.originPoint;
}

// ../../../node_modules/framer-motion/dist/es/projection/shared/stack.mjs
var NodeStack = class {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead) {
      this.prevLead = void 0;
    }
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead) {
        this.promote(prevLead);
      }
    }
  }
  relegate(node) {
    const indexOfNode = this.members.findIndex((member) => node === member);
    if (indexOfNode === 0)
      return false;
    let prevLead;
    for (let i = indexOfNode; i >= 0; i--) {
      const member = this.members[i];
      if (member.isPresent !== false) {
        prevLead = member;
        break;
      }
    }
    if (prevLead) {
      this.promote(prevLead);
      return true;
    } else {
      return false;
    }
  }
  promote(node, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.instance && prevLead.scheduleRender();
      node.scheduleRender();
      node.resumeFrom = prevLead;
      if (preserveFollowOpacity) {
        node.resumeFrom.preserveOpacity = true;
      }
      if (prevLead.snapshot) {
        node.snapshot = prevLead.snapshot;
        node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
      }
      if (node.root && node.root.isUpdating) {
        node.isLayoutDirty = true;
      }
      const { crossfade } = node.options;
      if (crossfade === false) {
        prevLead.hide();
      }
    }
  }
  exitAnimationComplete() {
    this.members.forEach((node) => {
      const { options, resumingFrom } = node;
      options.onExitComplete && options.onExitComplete();
      if (resumingFrom) {
        resumingFrom.options.onExitComplete && resumingFrom.options.onExitComplete();
      }
    });
  }
  scheduleRender() {
    this.members.forEach((node) => {
      node.instance && node.scheduleRender(false);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    if (this.lead && this.lead.snapshot) {
      this.lead.snapshot = void 0;
    }
  }
};

// ../../../node_modules/framer-motion/dist/es/projection/styles/transform.mjs
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform2 = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  const zTranslate = (latestTransform === null || latestTransform === void 0 ? void 0 : latestTransform.z) || 0;
  if (xTranslate || yTranslate || zTranslate) {
    transform2 = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform2 += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { transformPerspective, rotate, rotateX, rotateY, skewX, skewY } = latestTransform;
    if (transformPerspective)
      transform2 = `perspective(${transformPerspective}px) ${transform2}`;
    if (rotate)
      transform2 += `rotate(${rotate}deg) `;
    if (rotateX)
      transform2 += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform2 += `rotateY(${rotateY}deg) `;
    if (skewX)
      transform2 += `skewX(${skewX}deg) `;
    if (skewY)
      transform2 += `skewY(${skewY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform2 += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform2 || "none";
}

// ../../../node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs
var metrics = {
  nodes: 0,
  calculatedTargetDeltas: 0,
  calculatedProjections: 0
};
var transformAxes = ["", "X", "Y", "Z"];
var hiddenVisibility = { visibility: "hidden" };
var animationTarget = 1e3;
var id2 = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
  const { latestValues } = visualElement;
  if (latestValues[key]) {
    values[key] = latestValues[key];
    visualElement.setStaticValue(key, 0);
    if (sharedAnimationValues) {
      sharedAnimationValues[key] = 0;
    }
  }
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
  projectionNode.hasCheckedOptimisedAppear = true;
  if (projectionNode.root === projectionNode)
    return;
  const { visualElement } = projectionNode.options;
  if (!visualElement)
    return;
  const appearId = getOptimisedAppearId(visualElement);
  if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
    const { layout: layout2, layoutId } = projectionNode.options;
    window.MotionCancelOptimisedAnimation(appearId, "transform", frame, !(layout2 || layoutId));
  }
  const { parent } = projectionNode;
  if (parent && !parent.hasCheckedOptimisedAppear) {
    cancelTreeOptimisedTransformAnimations(parent);
  }
}
function createProjectionNode2({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
      this.id = id2++;
      this.animationId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.hasCheckedOptimisedAppear = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.hasTreeAnimated = false;
      this.updateScheduled = false;
      this.scheduleUpdate = () => this.update();
      this.projectionUpdateScheduled = false;
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.projectionUpdateScheduled = false;
        if (statsBuffer.value) {
          metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0;
        }
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
        this.nodes.forEach(cleanDirtyNodes);
        if (statsBuffer.addProjectionMetrics) {
          statsBuffer.addProjectionMetrics(metrics);
        }
      };
      this.resolvedRelativeTargetAt = 0;
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
      if (this.instance)
        return;
      this.isSVG = isSVGElement(instance);
      this.instance = instance;
      const { layoutId, layout: layout2, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      if (isLayoutDirty && (layout2 || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        attachResizeListener(instance, () => {
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout2)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const hasTargetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout);
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
          if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
          } else {
            if (!hasLayoutChanged) {
              finishAnimation(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      cancelFrame(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    // Note: currently only running on root node
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetSkewAndRotation);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      this.root.hasTreeAnimated = true;
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
        cancelTreeOptimisedTransformAnimations(this);
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        node.shouldResetTransform = true;
        node.updateScroll("snapshot");
        if (node.options.layoutRoot) {
          node.willUpdate(false);
        }
      }
      const { layoutId, layout: layout2 } = this.options;
      if (layoutId === void 0 && !layout2)
        return;
      const transformTemplate = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    update() {
      this.updateScheduled = false;
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        this.unblockUpdate();
        this.clearAllSnapshots();
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (!this.isUpdating) {
        this.nodes.forEach(clearIsLayoutDirty);
      }
      this.isUpdating = false;
      this.nodes.forEach(resetTransformStyle);
      this.nodes.forEach(updateLayout);
      this.nodes.forEach(notifyLayoutUpdate);
      this.clearAllSnapshots();
      const now2 = time.now();
      frameData.delta = clamp(0, 1e3 / 60, now2 - frameData.timestamp);
      frameData.timestamp = now2;
      frameData.isProcessing = true;
      frameSteps.update.process(frameData);
      frameSteps.preRender.process(frameData);
      frameSteps.render.process(frameData);
      frameData.isProcessing = false;
    }
    didUpdate() {
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        microtask.read(this.scheduleUpdate);
      }
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled) {
        this.projectionUpdateScheduled = true;
        frame.preRender(this.updateProjection, false, true);
      }
    }
    scheduleCheckAfterUnmount() {
      frame.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
      if (this.snapshot && !calcLength(this.snapshot.measuredBox.x) && !calcLength(this.snapshot.measuredBox.y)) {
        this.snapshot = void 0;
      }
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i = 0; i < this.path.length; i++) {
          const node = this.path[i];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement) {
        const isRoot = checkIsScrollRoot(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot,
          offset: measureScroll(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : isRoot
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      var _a;
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const wasInScrollRoot = ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot) || this.path.some(checkNodeWasScrollRoot);
      if (!wasInScrollRoot) {
        const { scroll: scroll2 } = this.root;
        if (scroll2) {
          translateAxis(box.x, scroll2.offset.x);
          translateAxis(box.y, scroll2.offset.y);
        }
      }
      return box;
    }
    removeElementScroll(box) {
      var _a;
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      if ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot) {
        return boxWithoutScroll;
      }
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        const { scroll: scroll2, options } = node;
        if (node !== this.root && scroll2 && options.layoutScroll) {
          if (scroll2.wasRoot) {
            copyBoxInto(boxWithoutScroll, box);
          }
          translateAxis(boxWithoutScroll.x, scroll2.offset.x);
          translateAxis(boxWithoutScroll.y, scroll2.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false) {
      const withTransforms = createBox();
      copyBoxInto(withTransforms, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          transformBox(withTransforms, {
            x: -node.scroll.offset.x,
            y: -node.scroll.offset.y
          });
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i = 0; i < this.path.length; i++) {
        const node = this.path[i];
        if (!node.instance)
          continue;
        if (!hasTransform(node.latestValues))
          continue;
        hasScale(node.latestValues) && node.updateSnapshot();
        const sourceBox = createBox();
        const nodeBox = node.measurePageBox();
        copyBoxInto(sourceBox, nodeBox);
        removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : void 0, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent)
        return;
      if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
        this.relativeParent.resolveTargetDelta(true);
      }
    }
    resolveTargetDelta(forceRecalculation = false) {
      var _a;
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty) || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      if (!this.layout || !(layout2 || layoutId))
        return;
      this.resolvedRelativeTargetAt = frameData.timestamp;
      if (!this.targetDelta && !this.relativeTarget) {
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && relativeParent.layout && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        this.forceRelativeParentToResolveTarget();
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.target = this.applyTransform(this.layout.layoutBox);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        const relativeParent = this.getClosestProjectingParent();
        if (relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
          this.relativeParent = relativeParent;
          this.forceRelativeParentToResolveTarget();
          this.relativeTarget = createBox();
          this.relativeTargetOrigin = createBox();
          calcRelativePosition(this.relativeTargetOrigin, this.target, relativeParent.target);
          copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (statsBuffer.value) {
        metrics.calculatedTargetDeltas++;
      }
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      var _a;
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty)) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (this.resolvedRelativeTargetAt === frameData.timestamp) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout2 || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
        lead.target = lead.layout.layoutBox;
        lead.targetWithTransforms = createBox();
      }
      const { target } = lead;
      if (!target) {
        if (this.prevProjectionDelta) {
          this.createProjectionDeltas();
          this.scheduleRender();
        }
        return;
      }
      if (!this.projectionDelta || !this.prevProjectionDelta) {
        this.createProjectionDeltas();
      } else {
        copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
        copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
      }
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      if (statsBuffer.value) {
        metrics.calculatedProjections++;
      }
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll2 = true) {
      var _a;
      (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.scheduleRender();
      if (notifyAll2) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = createDelta();
      this.projectionDelta = createDelta();
      this.projectionDeltaWithTransform = createDelta();
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      let prevRelativeTarget;
      this.mixTargetDelta = (latest) => {
        const progress2 = latest / 1e3;
        mixAxisDelta(targetDelta.x, delta.x, progress2);
        mixAxisDelta(targetDelta.y, delta.y, progress2);
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
          if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox();
          copyBoxInto(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners("animationStart");
      this.currentAnimation && this.currentAnimation.stop();
      if (this.resumingFrom && this.resumingFrom.currentAnimation) {
        this.resumingFrom.currentAnimation.stop();
      }
      if (this.pendingAnimation) {
        cancelFrame(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = frame.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        activeAnimations.layout++;
        this.currentAnimation = animateSingleValue(0, animationTarget, {
          ...options,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onStop: () => {
            activeAnimations.layout--;
          },
          onComplete: () => {
            activeAnimations.layout--;
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout: layout2, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout2)
        return;
      if (this !== lead && this.layout && layout2 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout2.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      const config = node.options.initialPromotionConfig;
      node.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
    }
    getPrevLead() {
      var _a;
      const { layoutId } = this.options;
      return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetSkewAndRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasDistortingTransform = false;
      const { latestValues } = visualElement;
      if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
        hasDistortingTransform = true;
      }
      if (!hasDistortingTransform)
        return;
      const resetValues = {};
      if (latestValues.z) {
        resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
      }
      for (let i = 0; i < transformAxes.length; i++) {
        resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
        resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
        if (this.animationValues) {
          this.animationValues[key] = resetValues[key];
        }
      }
      visualElement.scheduleRender();
    }
    getProjectionStyles(styleProp) {
      var _a, _b;
      if (!this.instance || this.isSVG)
        return void 0;
      if (!this.isVisible) {
        return hiddenVisibility;
      }
      const styles = {
        visibility: ""
      };
      const transformTemplate = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        styles.opacity = "";
        styles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        styles.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return styles;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        const emptyStyles = {};
        if (this.options.layoutId) {
          emptyStyles.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          emptyStyles.pointerEvents = resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          emptyStyles.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return emptyStyles;
      }
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      styles.transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        styles.transform = transformTemplate(valuesToRender, styles.transform);
      }
      const { x, y } = this.projectionDelta;
      styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
      if (lead.animationValues) {
        styles.opacity = lead === this ? (_b = (_a = valuesToRender.opacity) !== null && _a !== void 0 ? _a : this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        styles.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo, isCSSVariable } = scaleCorrectors[key];
        const corrected = styles.transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num = applyTo.length;
          for (let i = 0; i < num; i++) {
            styles[applyTo[i]] = corrected;
          }
        } else {
          if (isCSSVariable) {
            this.options.visualElement.renderState.vars[key] = corrected;
          } else {
            styles[key] = corrected;
          }
        }
      }
      if (this.options.layoutId) {
        styles.pointerEvents = lead === this ? resolveMotionValue(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "" : "none";
      }
      return styles;
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((node) => {
        var _a;
        return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
      });
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  var _a;
  const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout2, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout2[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout2)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout2[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
        if (node.relativeTarget && !node.currentAnimation) {
          node.isProjectionDirty = true;
          node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
        }
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout2, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout2, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeLayoutChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout2, parentLayout.layoutBox);
          if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
            hasRelativeLayoutChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node.relativeTarget = relativeLayout;
            node.relativeTargetOrigin = relativeSnapshot;
            node.relativeParent = relativeParent;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout2,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeLayoutChanged
    });
  } else if (node.isLead()) {
    const { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
  if (statsBuffer.value) {
    metrics.nodes++;
  }
  if (!node.parent)
    return;
  if (!node.isProjecting()) {
    node.isProjectionDirty = node.parent.isProjectionDirty;
  }
  node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
  node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
  node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetSkewAndRotation(node) {
  node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
  output.translate = mixNumber(delta.translate, 0, p);
  output.scale = mixNumber(delta.scale, 1, p);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
  output.min = mixNumber(from.min, to.min, p);
  output.max = mixNumber(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
  mixAxis(output.x, from.x, to.x, p);
  mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
var userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
var roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
  axis.min = roundPoint(axis.min);
  axis.max = roundPoint(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout2) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout2), 0.2);
}
function checkNodeWasScrollRoot(node) {
  var _a;
  return node !== node.root && ((_a = node.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot);
}

// ../../../node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs
var DocumentProjectionNode = createProjectionNode2({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => true
});

// ../../../node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
  current: void 0
};
var HTMLProjectionNode = createProjectionNode2({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode({});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});

// ../../../node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// ../../../node_modules/framer-motion/dist/es/gestures/hover.mjs
function handleHoverEvent(node, event, lifecycle) {
  const { props } = node;
  if (node.animationState && props.whileHover) {
    node.animationState.setActive("whileHover", lifecycle === "Start");
  }
  const eventName = "onHover" + lifecycle;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
var HoverGesture = class extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = hover(current, (_element, startEvent) => {
      handleHoverEvent(this.node, startEvent, "Start");
      return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
    });
  }
  unmount() {
  }
};

// ../../../node_modules/framer-motion/dist/es/gestures/focus.mjs
var FocusGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.node.current.matches(":focus-visible");
    } catch (e) {
      isFocusVisible = true;
    }
    if (!isFocusVisible || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
};

// ../../../node_modules/framer-motion/dist/es/gestures/press.mjs
function handlePressEvent(node, event, lifecycle) {
  const { props } = node;
  if (node.current instanceof HTMLButtonElement && node.current.disabled) {
    return;
  }
  if (node.animationState && props.whileTap) {
    node.animationState.setActive("whileTap", lifecycle === "Start");
  }
  const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
var PressGesture = class extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = press(current, (_element, startEvent) => {
      handlePressEvent(this.node, startEvent, "Start");
      return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
    }, { useGlobalTarget: this.node.props.globalTapTarget });
  }
  unmount() {
  }
};

// ../../../node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = (entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
};
var fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}

// ../../../node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
var thresholdNames = {
  some: 0,
  all: 1
};
var InViewFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.unmount();
    const { viewport = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once } = viewport;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const onIntersectionUpdate = (entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    };
    return observeIntersection(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
  }
};
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport[name] !== prevViewport[name];
}

// ../../../node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
};

// ../../../node_modules/framer-motion/dist/es/motion/features/layout.mjs
var layout = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// ../../../node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var import_react19 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };

// ../../../node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addListener(setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}

// ../../../node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs
var valueTypes = [...dimensionValueTypes, color, complex];
var findValueType = (v) => valueTypes.find(testValueType(v));

// ../../../node_modules/framer-motion/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();

// ../../../node_modules/framer-motion/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
      if (false) {
        warnOnce(nextValue.version === "12.4.7", `Attempting to mix Motion versions ${nextValue.version} with 12.4.7 may not work as expected.`);
      }
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// ../../../node_modules/framer-motion/dist/es/render/VisualElement.mjs
var propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
var VisualElement = class {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.values = /* @__PURE__ */ new Map();
    this.KeyframeResolver = KeyframeResolver;
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.renderScheduledAt = 0;
    this.scheduleRender = () => {
      const now2 = time.now();
      if (this.renderScheduledAt < now2) {
        this.renderScheduledAt = now2;
        frame.render(this.render, false, true);
      }
    };
    const { latestValues, renderState, onUpdate } = visualState;
    this.onUpdate = onUpdate;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key], false);
      }
    }
  }
  mount(instance) {
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (!hasReducedMotionListener.current) {
      initPrefersReducedMotion();
    }
    this.shouldReduceMotion = this.reducedMotionConfig === "never" ? false : this.reducedMotionConfig === "always" ? true : prefersReducedMotion.current;
    if (false) {
      warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.");
    }
    if (this.parent)
      this.parent.children.add(this);
    this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.valueSubscriptions.clear();
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent && this.parent.children.delete(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature) {
        feature.unmount();
        feature.isMounted = false;
      }
    }
    this.current = null;
  }
  bindToMotionValue(key, value) {
    if (this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.get(key)();
    }
    const valueIsTransform = transformProps.has(key);
    if (valueIsTransform && this.onBindTransform) {
      this.onBindTransform();
    }
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
    });
    const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
    let removeSyncCheck;
    if (window.MotionCheckAppearSync) {
      removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
    }
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      removeOnRenderRequest();
      if (removeSyncCheck)
        removeSyncCheck();
      if (value.owner)
        value.stop();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  updateFeatures() {
    let key = "animation";
    for (key in featureDefinitions) {
      const featureDefinition = featureDefinitions[key];
      if (!featureDefinition)
        continue;
      const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
      if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
        this.features[key] = new FeatureConstructor(this);
      }
      if (this.features[key]) {
        const feature = this.features[key];
        if (feature.isMounted) {
          feature.update();
        } else {
          feature.mount();
          feature.isMounted = true;
        }
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i = 0; i < propEventHandlers.length; i++) {
      const key = propEventHandlers[i];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
    this.onUpdate && this.onUpdate(this);
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue)
        this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    var _a;
    let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : (_a = this.getBaseTargetFromProps(this.props, key)) !== null && _a !== void 0 ? _a : this.readValueFromInstance(this.current, key, this.options);
    if (value !== void 0 && value !== null) {
      if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
        value = parseFloat(value);
      } else if (!findValueType(value) && complex.test(target)) {
        value = getAnimatableNone2(key, target);
      }
      this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
    }
    return isMotionValue(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    var _a;
    const { initial } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = resolveVariantFromProps(this.props, initial, (_a = this.presenceContext) === null || _a === void 0 ? void 0 : _a.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
};

// ../../../node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    return props.style ? props.style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current) {
          this.current.textContent = `${latest}`;
        }
      });
    }
  }
};

// ../../../node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = renderHTML;
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    } else {
      const computedStyle = getComputedStyle2(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
};

// ../../../node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
    this.measureInstanceViewportBox = createBox;
    this.updateDimensions = () => {
      if (this.current && !this.renderState.dimensions) {
        updateSVGDimensions(this.current, this.renderState);
      }
    };
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps2(props, prevProps, visualElement);
  }
  onBindTransform() {
    if (this.current && !this.renderState.dimensions) {
      frame.postRender(this.updateDimensions);
    }
  }
  build(renderState, latestValues, props) {
    buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
};

// ../../../node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = (Component2, options) => {
  return isSVGComponent(Component2) ? new SVGVisualElement(options) : new HTMLVisualElement(options, {
    allowProjection: Component2 !== import_react19.Fragment
  });
};

// ../../../node_modules/framer-motion/dist/es/render/components/motion/create.mjs
var createMotionComponent = /* @__PURE__ */ createMotionComponentFactory({
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layout
}, createDomVisualElement);

// ../../../node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs
var motion = /* @__PURE__ */ createDOMMotionComponentProxy(createMotionComponent);

// ../../../node_modules/framer-motion/dist/es/value/use-scroll.mjs
var import_react20 = __toESM(require_react(), 1);

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/observe.mjs
function observeTimeline(update, timeline) {
  let prevProgress;
  const onFrame = () => {
    const { currentTime } = timeline;
    const percentage = currentTime === null ? 0 : currentTime.value;
    const progress2 = percentage / 100;
    if (prevProgress !== progress2) {
      update(progress2);
    }
    prevProgress = progress2;
  };
  frame.update(onFrame, true);
  return () => cancelFrame(onFrame);
}

// ../../../node_modules/framer-motion/dist/es/render/dom/resize/handle-element.mjs
var resizeHandlers = /* @__PURE__ */ new WeakMap();
var observer;
function getElementSize(target, borderBoxSize) {
  if (borderBoxSize) {
    const { inlineSize, blockSize } = borderBoxSize[0];
    return { width: inlineSize, height: blockSize };
  } else if (target instanceof SVGElement && "getBBox" in target) {
    return target.getBBox();
  } else {
    return {
      width: target.offsetWidth,
      height: target.offsetHeight
    };
  }
}
function notifyTarget({ target, contentRect, borderBoxSize }) {
  var _a;
  (_a = resizeHandlers.get(target)) === null || _a === void 0 ? void 0 : _a.forEach((handler) => {
    handler({
      target,
      contentSize: contentRect,
      get size() {
        return getElementSize(target, borderBoxSize);
      }
    });
  });
}
function notifyAll(entries) {
  entries.forEach(notifyTarget);
}
function createResizeObserver() {
  if (typeof ResizeObserver === "undefined")
    return;
  observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
  if (!observer)
    createResizeObserver();
  const elements = resolveElements(target);
  elements.forEach((element) => {
    let elementHandlers = resizeHandlers.get(element);
    if (!elementHandlers) {
      elementHandlers = /* @__PURE__ */ new Set();
      resizeHandlers.set(element, elementHandlers);
    }
    elementHandlers.add(handler);
    observer === null || observer === void 0 ? void 0 : observer.observe(element);
  });
  return () => {
    elements.forEach((element) => {
      const elementHandlers = resizeHandlers.get(element);
      elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.delete(handler);
      if (!(elementHandlers === null || elementHandlers === void 0 ? void 0 : elementHandlers.size)) {
        observer === null || observer === void 0 ? void 0 : observer.unobserve(element);
      }
    });
  };
}

// ../../../node_modules/framer-motion/dist/es/render/dom/resize/handle-window.mjs
var windowCallbacks = /* @__PURE__ */ new Set();
var windowResizeHandler;
function createWindowResizeHandler() {
  windowResizeHandler = () => {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    const info = {
      target: window,
      size,
      contentSize: size
    };
    windowCallbacks.forEach((callback) => callback(info));
  };
  window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
  windowCallbacks.add(callback);
  if (!windowResizeHandler)
    createWindowResizeHandler();
  return () => {
    windowCallbacks.delete(callback);
    if (!windowCallbacks.size && windowResizeHandler) {
      windowResizeHandler = void 0;
    }
  };
}

// ../../../node_modules/framer-motion/dist/es/render/dom/resize/index.mjs
function resize(a, b) {
  return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b);
}

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/info.mjs
var maxElapsed2 = 50;
var createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
var createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
var keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time2) {
  const axis = info[axisName];
  const { length, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = element[`scroll${position}`];
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = progress(0, axis.scrollLength, axis.current);
  const elapsed = time2 - prevTime;
  axis.velocity = elapsed > maxElapsed2 ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time2) {
  updateAxisInfo(element, "x", info, time2);
  updateAxisInfo(element, "y", info, time2);
  info.time = time2;
}

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs
function calcInset(element, container) {
  const inset = { x: 0, y: 0 };
  let current = element;
  while (current && current !== container) {
    if (current instanceof HTMLElement) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current.tagName === "svg") {
      const svgBoundingBox = current.getBoundingClientRect();
      current = current.parentElement;
      const parentBoundingBox = current.getBoundingClientRect();
      inset.x += svgBoundingBox.left - parentBoundingBox.left;
      inset.y += svgBoundingBox.top - parentBoundingBox.top;
    } else if (current instanceof SVGGraphicsElement) {
      const { x, y } = current.getBBox();
      inset.x += x;
      inset.y += y;
      let svg = null;
      let parent = current.parentNode;
      while (!svg) {
        if (parent.tagName === "svg") {
          svg = parent;
        }
        parent = current.parentNode;
      }
      current = svg;
    } else {
      break;
    }
  }
  return inset;
}

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/offsets/edge.mjs
var namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  if (edge in namedEdges) {
    edge = namedEdges[edge];
  }
  if (typeof edge === "string") {
    const asNumber2 = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber2;
    } else if (edge.endsWith("%")) {
      edge = asNumber2 / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber2 / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber2 / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber2;
    }
  }
  if (typeof edge === "number") {
    delta = length * edge;
  }
  return inset + delta;
}

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/offsets/offset.mjs
var defaultOffset2 = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset2;
  let targetPoint = 0;
  let containerPoint = 0;
  if (typeof offset === "number") {
    offsetDefinition = [offset, offset];
  } else if (typeof offset === "string") {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/offsets/presets.mjs
var ScrollOffset = {
  Enter: [
    [0, 1],
    [1, 1]
  ],
  Exit: [
    [0, 0],
    [1, 0]
  ],
  Any: [
    [1, 0],
    [0, 1]
  ],
  All: [
    [0, 0],
    [1, 1]
  ]
};

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/offsets/index.mjs
var point = { x: 0, y: 0 };
function getTargetSize(target) {
  return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : { width: target.clientWidth, height: target.clientHeight };
}
function resolveOffsets(container, info, options) {
  const { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : getTargetSize(target);
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged = true;
    }
    info[axis].offset[i] = offset;
  }
  if (hasChanged) {
    info[axis].interpolate = interpolate(info[axis].offset, defaultOffset(offsetDefinition), { clamp: false });
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/on-scroll-handler.mjs
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
  if (false) {
    if (container && target && target !== container) {
      warnOnce(getComputedStyle(container).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
    }
  }
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: () => measure(element, options.target, info),
    update: (time2) => {
      updateScrollInfo(element, info, time2);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/track.mjs
var scrollListeners = /* @__PURE__ */ new WeakMap();
var resizeListeners = /* @__PURE__ */ new WeakMap();
var onScrollHandlers = /* @__PURE__ */ new WeakMap();
var getEventTarget = (element) => element === document.documentElement ? window : element;
function scrollInfo(onScroll, { container = document.documentElement, ...options } = {}) {
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const measureAll = () => {
      for (const handler of containerHandlers)
        handler.measure();
    };
    const updateAll = () => {
      for (const handler of containerHandlers) {
        handler.update(frameData.timestamp);
      }
    };
    const notifyAll2 = () => {
      for (const handler of containerHandlers)
        handler.notify();
    };
    const listener2 = () => {
      frame.read(measureAll, false, true);
      frame.read(updateAll, false, true);
      frame.update(notifyAll2, false, true);
    };
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2, { passive: true });
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2, { passive: true });
  }
  const listener = scrollListeners.get(container);
  frame.read(listener, false, true);
  return () => {
    var _a;
    cancelFrame(listener);
    const currentHandlers = onScrollHandlers.get(container);
    if (!currentHandlers)
      return;
    currentHandlers.delete(containerHandler);
    if (currentHandlers.size)
      return;
    const scrollListener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (scrollListener) {
      getEventTarget(container).removeEventListener("scroll", scrollListener);
      (_a = resizeListeners.get(container)) === null || _a === void 0 ? void 0 : _a();
      window.removeEventListener("resize", scrollListener);
    }
  };
}

// ../../../node_modules/framer-motion/dist/es/render/dom/scroll/index.mjs
function scrollTimelineFallback({ source, container, axis = "y" }) {
  if (source)
    container = source;
  const currentTime = { value: 0 };
  const cancel = scrollInfo((info) => {
    currentTime.value = info[axis].progress * 100;
  }, { container, axis });
  return { currentTime, cancel };
}
var timelineCache = /* @__PURE__ */ new Map();
function getTimeline({ source, container = document.documentElement, axis = "y" } = {}) {
  if (source)
    container = source;
  if (!timelineCache.has(container)) {
    timelineCache.set(container, {});
  }
  const elementCache = timelineCache.get(container);
  if (!elementCache[axis]) {
    elementCache[axis] = supportsScrollTimeline() ? new ScrollTimeline({ source: container, axis }) : scrollTimelineFallback({ source: container, axis });
  }
  return elementCache[axis];
}
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
function needsElementTracking(options) {
  return options && (options.target || options.offset);
}
function scrollFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll) || needsElementTracking(options)) {
    return scrollInfo((info) => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return observeTimeline(onScroll, getTimeline(options));
  }
}
function scrollAnimation(animation, options) {
  animation.flatten();
  if (needsElementTracking(options)) {
    animation.pause();
    return scrollInfo((info) => {
      animation.time = animation.duration * info[options.axis].progress;
    }, options);
  } else {
    const timeline = getTimeline(options);
    if (animation.attachTimeline) {
      return animation.attachTimeline(timeline, (valueAnimation) => {
        valueAnimation.pause();
        return observeTimeline((progress2) => {
          valueAnimation.time = valueAnimation.duration * progress2;
        }, timeline);
      });
    } else {
      return noop;
    }
  }
}
function scroll(onScroll, { axis = "y", ...options } = {}) {
  const optionsWithDefaults = { axis, ...options };
  return typeof onScroll === "function" ? scrollFunction(onScroll, optionsWithDefaults) : scrollAnimation(onScroll, optionsWithDefaults);
}

// ../../../node_modules/framer-motion/dist/es/value/use-scroll.mjs
function refWarning(name, ref) {
  warning(Boolean(!ref || ref.current), `You have defined a ${name} options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its \`layoutEffect: false\` option.`);
}
var createScrollMotionValues = () => ({
  scrollX: motionValue(0),
  scrollY: motionValue(0),
  scrollXProgress: motionValue(0),
  scrollYProgress: motionValue(0)
});
function useScroll({ container, target, layoutEffect = true, ...options } = {}) {
  const values = useConstant(createScrollMotionValues);
  const useLifecycleEffect = layoutEffect ? useIsomorphicLayoutEffect : import_react20.useEffect;
  useLifecycleEffect(() => {
    refWarning("target", target);
    refWarning("container", container);
    return scroll((_progress, { x, y }) => {
      values.scrollX.set(x.current);
      values.scrollXProgress.set(x.progress);
      values.scrollY.set(y.current);
      values.scrollYProgress.set(y.progress);
    }, {
      ...options,
      container: (container === null || container === void 0 ? void 0 : container.current) || void 0,
      target: (target === null || target === void 0 ? void 0 : target.current) || void 0
    });
  }, [container, target, JSON.stringify(options.offset)]);
  return values;
}

// ../../../node_modules/framer-motion/dist/es/value/use-motion-value.mjs
var import_react21 = __toESM(require_react(), 1);
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = (0, import_react21.useContext)(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = (0, import_react21.useState)(initial);
    (0, import_react21.useEffect)(() => value.on("change", setLatest), []);
  }
  return value;
}

// ../../../node_modules/framer-motion/dist/es/value/use-combine-values.mjs
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}

// ../../../node_modules/framer-motion/dist/es/utils/transform.mjs
var isCustomValueType = (v) => {
  return v && typeof v === "object" && v.mix;
};
var getMixer2 = (v) => isCustomValueType(v) ? v.mix : void 0;
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, {
    mixer: getMixer2(outputRange[0]),
    ...options
  });
  return useImmediate ? interpolator(inputValue) : interpolator;
}

// ../../../node_modules/framer-motion/dist/es/value/use-computed.mjs
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}

// ../../../node_modules/framer-motion/dist/es/value/use-transform.mjs
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  return Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}

// src/scene.mjs
var COPY = {
  h1: ["Run your own", "branded shipping", "platform."],
  sub: "Bench scene. A white-label logistics operating system for couriers and 3PLs, under your own name.",
  lit: "When your merchants ship on someone else's platform they learn someone else's name. Run the pickups, the hubs and the deliveries under your own brand, your own domain and your own colours, and keep the relationship with every merchant you bring in.",
  steps: [
    { t: "Set your brand", d: "Name, domain and colours are yours." },
    { t: "Add your merchants", d: "They sign up on your platform." },
    { t: "Open for business", d: "Everything they see carries your name." }
  ],
  panels: ["Your brand", "Your domain", "Your colours", "Your merchants", "Your name"]
};
var words = COPY.lit.split(/\s+/);

// src/s4/App.jsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
function Word({ w, i, progress: progress2 }) {
  const n = words.length;
  const o = useTransform(progress2, [Math.max(0, i / (n + 8)), Math.min(1, (i + 8) / (n + 8))], [0.22, 1]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(motion.span, { className: "w", style: { opacity: o, ["--i"]: i }, children: w });
}
function Lit() {
  const ref = (0, import_react22.useRef)(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { className: "lit", id: "lit", "aria-label": "Scroll-lit paragraph", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "wrap", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "lit__p", "data-lit": true, ref, children: words.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_react22.default.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Word, { w, i, progress: scrollYProgress }),
    " "
  ] }, i)) }) }) });
}
function Step({ s, k, progress: progress2 }) {
  const a = k * 0.333;
  const op = useTransform(progress2, k === 0 ? [0, 0.34, 0.41] : k === 2 ? [a - 0.08, a + 0.04, 1] : [a - 0.08, a + 0.04, a + 0.3, a + 0.41], k === 0 ? [1, 1, 0] : k === 2 ? [0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress2, k === 0 ? [0, 0.34, 0.41] : k === 2 ? [a - 0.08, a + 0.04, 1] : [a - 0.08, a + 0.04, a + 0.3, a + 0.41], k === 0 ? [0, 0, -16] : k === 2 ? [16, 0, 0] : [16, 0, 0, -16]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(motion.li, { className: "step", style: { opacity: op, y }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("b", { children: k + 1 }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: s.t }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: s.d })
    ] })
  ] });
}
function Steps() {
  const ref = (0, import_react22.useRef)(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const sx = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { className: "steps", id: "steps", "aria-labelledby": "steps-h", ref, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "steps__stick", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "wrap steps__grid", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { id: "steps-h", children: "Three steps" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "bar", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(motion.i, { style: { scaleX: sx, transformOrigin: "left" } }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ol", { className: "steps__list", children: COPY.steps.map((s, k) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Step, { s, k, progress: scrollYProgress }, k)) })
  ] }) }) });
}
function Panels() {
  const ref = (0, import_react22.useRef)(null), track = (0, import_react22.useRef)(null);
  const [dist, setDist] = (0, import_react22.useState)(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  (0, import_react22.useLayoutEffect)(() => {
    const f = () => setDist(track.current.scrollWidth - innerWidth + 40);
    f();
    addEventListener("resize", f);
    return () => removeEventListener("resize", f);
  }, []);
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { className: "h", id: "panels", "aria-labelledby": "panels-h", ref, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "h__stick", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "wrap", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { id: "panels-h", children: "Five panels" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(motion.div, { className: "track", ref: track, style: { x }, children: COPY.panels.map((p, k) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("article", { className: "p", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("small", { children: String(k + 1).padStart(2, "0") }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: p }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { children: [
        "Panel ",
        k + 1,
        " of 5. Filler text so find-in-page has something to find."
      ] })
    ] }, k)) })
  ] }) });
}
function App() {
  const [on, setOn] = (0, import_react22.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "skip", href: "#main", children: "Skip to content" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { className: "hdr", id: "top", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("a", { className: "brand", href: "#top", "aria-label": "Bench scene, top", children: [
        "HELIX ",
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", { children: "bench" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("nav", { "aria-label": "Primary", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: "#lit", children: "Lit text" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: "#steps", children: "Steps" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: "#panels", children: "Panels" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { href: "#end", children: "Form" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "btn btn--ghost", href: "#end", children: "Request a demo" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("main", { id: "main", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { className: "hero", "aria-labelledby": "h1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "wrap hero__grid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "eyebrow", children: "Bench S4 \xB7 scene filler, not site copy" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", { id: "h1", children: COPY.h1.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(motion.span, { className: "line", initial: { y: 12 }, animate: { y: 0 }, transition: { duration: 0.7, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] }, children: [
            l,
            " "
          ] }, i)) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "sub", children: COPY.sub }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("a", { className: "btn", href: "#end", children: "Request a demo" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(motion.div, { className: "frame", role: "img", "aria-label": "Screenshot pending: placeholder frame for the operator console", initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Screenshot pending" }) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Lit, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Steps, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Panels, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { className: "end", id: "end", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "wrap", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { children: "Request a demo" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Interaction target for the INP test: the button below toggles a sample brand colour." }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "card" + (on ? " on" : ""), id: "card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("b", { children: "Sample tenant" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "Kestrel Couriers" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "btn", id: "toggle", type: "button", "aria-pressed": on, onClick: () => setOn((v) => !v), children: "Toggle sample brand" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("footer", { className: "foot", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "wrap", children: "Bench scene. Founded 2024. info@cyper.studio" }) })
  ] });
}

// src/s4/ssr.jsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var render = () => (0, import_server.renderToString)(/* @__PURE__ */ (0, import_jsx_runtime4.jsx)(App, {}));
export {
  render
};
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server-legacy.node.production.js:
  (**
   * @license React
   * react-dom-server-legacy.node.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.node.production.js:
  (**
   * @license React
   * react-dom-server.node.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
