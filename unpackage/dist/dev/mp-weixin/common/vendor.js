(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"竞赛统计","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 115:
/*!************************************************!*\
  !*** D:/服务外包/竞赛统计/static/request/api_order.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getPrepay_id = exports.checkResourcePurchased = exports.getOrder = exports.getOrders = exports.getPointOrder = exports.putOrder = exports.postOrder = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* 
                                                                                                                                                                                                                                                                                                                                                                                                             	购买附件-创建订单
                                                                                                                                                                                                                                                                                                                                                                                                             	@params data.projectId:Int 项目ID
                                                                                                                                                                                                                                                                                                                                                                                                             	@params data.resourceId:Array 购买的附件id
                                                                                                                                                                                                                                                                                                                                                                                                             */
var postOrder = function postOrder(data) {return (0, _request.default)("/contribPoint/order", "POST", data);};
/* 
                                                                                                               	付款/取消付款
                                                                                                               	@params ordetrId:Int 订单ID
                                                                                                               	@params action:String,取值pay/cancel
                                                                                                               */exports.postOrder = postOrder;
var putOrder = function putOrder(orderId, action) {return (0, _request.default)("/contribPoint/order/".concat(orderId, "?action=").concat(action), "PUT", {});};

/* 获取贡献点变化 */exports.putOrder = putOrder;
var getPointOrder = function getPointOrder(params) {return (0, _request.default)("/contribPoint/log/me", "GET", params);};

/* 获取个人订单信息 */exports.getPointOrder = getPointOrder;
var getOrders = function getOrders(params) {return (0, _request.default)("/contribPoint/order/me", "GET", params);};
/* 获取订单详细 */exports.getOrders = getOrders;
var getOrder = function getOrder(orderId) {return (0, _request.default)("/contribPoint/order/".concat(orderId), "GET", {});};
/* 判断资源是否购买 */exports.getOrder = getOrder;
var checkResourcePurchased = function checkResourcePurchased(projectId) {return (0, _request.default)("/project/purchased/".concat(projectId), "GET", {});};

/* 获取统一下单ID */exports.checkResourcePurchased = checkResourcePurchased;
var getPrepay_id = function getPrepay_id(data) {return (0, _request.default)("/order/unifiedorder", "POST", data);};exports.getPrepay_id = getPrepay_id;

/***/ }),

/***/ 12:
/*!*********************************************!*\
  !*** D:/服务外包/竞赛统计/static/icon/iconfont.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 13:
/*!*******************************************!*\
  !*** D:/服务外包/竞赛统计/static/js/globalFun.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {













var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));






























































































































var _api_userInfo = __webpack_require__(/*! @/static/request/api_userInfo.js */ 14);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* 普通文本提示*/_vue.default.prototype.gToastMsg = function (title) {var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1500;uni.showToast({ title: title, mask: mask, duration: duration, icon: "none" });}; /* 成功文本提示 */_vue.default.prototype.gToastSuccess = function (title) {var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1500;uni.showToast({ title: title, mask: mask, duration: duration });}; /*  展示错误提示 */_vue.default.prototype.gToastError = function (title) {var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1500;uni.showToast({ title: title, image: "/static/icon/close.png", mask: mask, duration: duration });}; /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 	提示确认操作
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 	@params content: String,提示文字
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 	@params success: Function,点击确认后的操作
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 	@params cancel: Function,点击取消后的操作
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */_vue.default.prototype.gShowModal = function (content, _success, cancel) {uni.showModal({ title: "提示", content: content, confirmColor: "#f8b86b", success: function success(res) {if (res.confirm && _success) {_success();} else if (res.cancel && cancel) {cancel;}} });}; /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                	name: uploadFile
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                	description: 上传文件至OSS存储空间
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                	@params filePath: String,待上传的临时路径
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                	@params signature: Object,签名
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                	@return: fileUrl: String,文件路径
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                	time: 2020/12/30
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */_vue.default.prototype.gUploadFile = function (filePath, signature) {var updateDom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;return new Promise(function (resolve, reject) {var uploadTask = uni.uploadFile({ url: "https://".concat(signature.bucketName, ".cos.").concat(signature.region, ".myqcloud.com/"), name: 'file', filePath: filePath, formData: { "key": signature.filename, "policy": signature.policy, "q-sign-algorithm": "sha1", "q-ak": signature.secretId, "q-key-time": signature.keyTime, "q-signature": signature.signature }, success: function success(res) {if (res.statusCode === 204) {resolve(res);}reject(res);}, fail: function fail(err) {reject(err);} });uploadTask.onProgressUpdate(function (res) {if (updateDom) {updateDom(res.progress);}});});}; /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	获取文件路径
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	@params signature: Object,签名
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	@return filePath: String,文件路径
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */var COS = __webpack_require__(/*! ./COS.js */ 16);_vue.default.prototype.gGetFileUrl = function (signature) {return new Promise(function (resolve, reject) {var cos = new COS({ getAuthorization: function getAuthorization(options, callback) {callback({ Authorization: signature.authorization });} }); /* 获取数据 */cos.getObjectUrl({ Bucket: signature.bucketName, Region: signature.region, Key: signature.filename, Sign: true, Expires: 60 }, function (err, data) {if (err) {reject(err);}resolve(data.Url);});});}; /* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    	更新个人信息，重新请求getMe
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    	@set getApp().globalData.gUserInfo: Object,全局个人信息变量
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    	@return gUserInfo: Object,个人信息变量
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */_vue.default.prototype.gGetMeInfo = function () {return new Promise(function (resolve, reject) {(0, _api_userInfo.getMe)().then(function (res) {/* 统计数据不变 */var statistice = getApp().globalData.gUserInfo.statistice;getApp().globalData.gUserInfo = _objectSpread(_objectSpread({}, res.data), {}, { statistice: statistice });resolve(res.data);}).catch(function (err) {console.error(err);reject(err);});});};
/* 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	格式化日期输出，默认简写模式（当天仅显示时间，当年不显示年份)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	@params time: Date,日期
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	@params noAddr: Boolean,是否简写
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	@return: String,日期字符串
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	time: 2021/1/3
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
_vue.default.prototype.gformatDate = function (time) {var noAddr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();

  var nDay = new Date();
  var nyear = nDay.getFullYear();
  var nmonth = nDay.getMonth() + 1;
  var nday = nDay.getDate();

  if (noAddr) {
    return "".concat(year, "/").concat(month < 10 ? '0' + month : month, "/").concat(day < 10 ? '0' + day : day, " ").concat(hour < 10 ? '0' + hour : hour, ":").concat(minutes < 10 ? '0' + minutes : minutes);
  }
  if (year === nyear && month === nmonth && day === nday) {
    return "".concat(hour < 10 ? '0' + hour : hour, ":").concat(minutes < 10 ? '0' + minutes : minutes);
  }
  if (year === nyear) {
    return "".concat(month < 10 ? '0' + month : month, "/").concat(day < 10 ? '0' + day : day, " ").concat(hour < 10 ? '0' + hour : hour, ":").concat(minutes < 10 ? '0' + minutes : minutes);
  }
  return "".concat(year, "/").concat(month < 10 ? '0' + month : month, "/").concat(day < 10 ? '0' + day : day, " ").concat(hour < 10 ? '0' + hour : hour, ":").concat(minutes < 10 ? '0' + minutes : minutes);
};
/* 
   	获取今天 
   	@return yy-mm-dd
   */
_vue.default.prototype.gGetToday = function () {var symbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "-";
  var date = new Date();
  return "".concat(date.getFullYear()).concat(symbol).concat(date.getMonth() + 1).concat(symbol).concat(date.getDate());
};

/* 展示/隐藏等待 */
_vue.default.prototype.gLoading = function (that, type) {var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  /* 获取DOM */
  var dom = that.$refs.loading;
  if (dom) {
    setTimeout(function () {
      if (dom) {
        dom.show = type;
      }
    }, delay);
  }
};

/* 
   	调用menu弹窗进行单选,将选择的结果返回
   	@params list: Array,选择列表，每个元素为一个对象，对象必须包含label属性,或者每个元素为字符串
   	@return 选择的元素
   	time: 2020/12/31
   */
_vue.default.prototype.gMenuPicker = function (list) {
  return new Promise(function (resolve, reject) {
    uni.showActionSheet({
      itemList: typeof list[0] === "object" ? list.map(function (item) {return item.label;}) : list,
      success: function success(res) {
        resolve(list[res.tapIndex]);
      },
      fail: function fail(err) {
        if (err.errMsg === "showActionSheet:fail cancel") {
          resolve();
        } else
        {
          reject(err);
        }
      } });

  });
};

/* 复制到剪切板 */
_vue.default.prototype.gClipboardData = function (content, msg) {
  uni.setClipboardData({
    data: content,
    success: function success() {
      _vue.default.prototype.gToastMsg(msg);
    },
    fail: function fail(err) {
      console.log(err);
      _vue.default.prototype.gToastMsg("复制错误..");
    } });

};

/* 未设计界面提示 */
_vue.default.prototype.gUndesign = function () {var back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  uni.showModal({
    title: "提示",
    content: "该模块正在设计,尽情期待!",
    confirmText: "期待",
    showCancel: false,
    success: function success() {
      uni.navigateBack({
        delta: 1 });

    } });

};

/* 预览图片 */
_vue.default.prototype.gReadImage = function (urls) {var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  uni.previewImage({
    current: current,
    urls: urls });

};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!***************************************************!*\
  !*** D:/服务外包/竞赛统计/static/request/api_userInfo.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/* 
                                                                                                                                                                          	name: 绑定手机号
                                                                                                                                                                          	@params phone: String
                                                                                                                                                                          	@params code: String
                                                                                                                                                                          */
exports.bindPhone = function (data) {return (0, _request.default)("/bind/phone", "POST", data);};
/* 绑定微信号 */
exports.bindWxchat = function (data) {return (0, _request.default)("/bind/wechat?code=" + data.code, "POST", data);};

/* 获取个人信息 */
exports.getMe = function () {return (0, _request.default)("/userInfo/me", "GET", {});};
/* 修改个人基本资料 */
exports.putMe = function (data) {return (0, _request.default)("/userInfo/me", "PUT", data);};
/* 签署须知协议 */
exports.signNotice = function () {return (0, _request.default)("/sign/notice", "POST", {});};
/* 获取头像上传签名 */
exports.getAvatarOssSignature = function (filename) {return (0, _request.default)("/userInfo/avatar/sign/upload?filename=" + filename, "GET", {});};
/* 根据userId获取用户详细信息 */
exports.getUser = function (userId) {return (0, _request.default)("/userInfo/" + userId, "GET", {});};

/* 
                                                                                                       	desc: 获取简历信息
                                                                                                       	@param userId: String,用户标识码
                                                                                                       */
exports.getResume = function (userId) {return (0, _request.default)("/resume/".concat(userId), "GET", {});};

/* 
                                                                                                             	desc: 更新简历信息
                                                                                                             	@params resume: Object,简历的所有字段
                                                                                                             */
exports.putResume = function (data) {return (0, _request.default)("/resume", "PUT", data);};

/* 获取未读通知数量 */
exports.getUnreadCount = function () {return (0, _request.default)("/message/count/notRead", "GET", {});};
/* 获取消息通知列表 */
exports.getMessages = function (param) {return (0, _request.default)("/message", "GET", param);};
/* 
                                                                                                  	获取消息通知内容
                                                                                                  	@param: messageId: Number
                                                                                                  */
exports.getMessage = function (messageId) {return (0, _request.default)("/message/".concat(messageId), "GET", {});};
/* 
                                                                                                                         发送通知
                                                                                                                         @params: receiverUserId: Number,收件人用户id
                                                                                                                         @params: title: String, 信件标题
                                                                                                                         @params: content:String, 信件内容
                                                                                                                     */
exports.postMessage = function (data) {return (0, _request.default)("/message", "POST", data);};
/*  删除消息 */
exports.deleteMessage = function (messageId) {return (0, _request.default)("/message/".concat(messageId), "DELETE", {});};

/* 获取个人收藏项目 */
exports.getCollectedProjects = function () {return (0, _request.default)("/project/collection", "GET", {});};
/* 获取个人购买的项目附件 */
exports.getPurchased = function () {return (0, _request.default)("/project/resource/purchased", "GET", {});};

/* 获取公共文件上次接口 */
exports.getPublicFileSign = function (filename) {return (0, _request.default)("/cos/sign/upload/public?filename=" + filename, "GET", {});};

/* 获取个人统计数据 */
exports.getSelfStatistice = function () {return (0, _request.default)("/statistics/me", "GET", {});};
/* 获取指定用户统计数据 */
exports.getUserStatistice = function (userId) {return (0, _request.default)("/statistics/".concat(userId), "GET", {});};
/* 获取用户轨迹 */
exports.getUserTracks = function (userId, type) {return (0, _request.default)("/user/track/".concat(userId, "?type=").concat(type), "GET", {});};

/* 获取实名认证上传签名 */
exports.getAuthenticationSignature = function (filename) {return (0, _request.default)("/authentication/sign/upload?filename=".concat(filename), "GET", {});};
/* 提交实名认证信息 */
exports.putAuthentication = function (data) {return (0, _request.default)("/authentication/updatePersonalAuthentication", "PUT", data);};

/* 判断用户关系 */
exports.getUserRelation = function (userId) {return (0, _request.default)("/user/relation/".concat(userId), "GET", {});};
/* 关注用户 */
exports.followUser = function (userId) {return (0, _request.default)("/user/follow/".concat(userId), "POST", {});};
/* 取消关注 */
exports.unfollowUser = function (userId) {return (0, _request.default)("/user/unfollow/".concat(userId), "POST", {});};

/***/ }),

/***/ 15:
/*!**********************************************!*\
  !*** D:/服务外包/竞赛统计/static/request/request.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var baseUrl = getApp().globalData.baseUrl;

function myRequest(url, method, data) {
  /* 配置请求头 */
  var token = uni.getStorageSync("token") || '';
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    'Authorization': token };


  return new Promise(function (resolve, reject) {
    uni.request({
      url: baseUrl + url,
      method: method,
      data: data,
      header: headers,
      timeout: 10000,
      success: function success(result)
      {
        // console.log(result.header);
        /* 请求成功 */
        if (result.data.code === 200)
        {
          resolve(result.data);
        }
        /* 请求错误 */else

          {
            console.log("请求错误");
            console.log(result.data);
            /* 如果是token过期，关闭所有界面回到登录页 */
            if (result.data.code === 103) {
              // 如果token跟缓存的相同，说明没有被重置过，是真正的过期
              if (token === uni.getStorageSync("token")) {
                uni.clearStorageSync("token");
                uni.reLaunch({
                  url: "/pages/Login/Login",
                  success: function success() {
                    _vue.default.prototype.gToastError(result.data.msg);
                  } });

              }
              // 如果token跟缓存不同，说明token是被重置过的，不是真正过期
              else {
                  resolve(myRequest(url, method, data));
                }
            } else
            if (result.data.msg) {
              _vue.default.prototype.gToastError(result.data.msg);
            } else
            {
              _vue.default.prototype.gToastError("服务器异常");
            }
            reject(result.data);
          }
      },
      fail: function fail(err)
      {
        console.log("服务器错误");
        console.log(err.data);
        _vue.default.prototype.gToastError("服务器错误");
        reject(err);
      },
      complete: function complete(result) {
        /* 判断是否有新token,有则替换旧的token */
        if (result.header.Authorization) {
          console.log(result.header.Authorization);
          uni.setStorageSync("token", result.header.Authorization);
        }
      } });

  });
}var _default =
myRequest;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!*************************************!*\
  !*** D:/服务外包/竞赛统计/static/js/COS.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function (e, t) { true ? module.exports = t() : undefined;}("undefined" != typeof self ? self : this, function () {return function (e) {function t(i) {if (n[i]) return n[i].exports;var a = n[i] = { i: i, l: !1, exports: {} };return e[i].call(a.exports, a, a.exports, t), a.l = !0, a.exports;}var n = {};return t.m = e, t.c = n, t.d = function (e, n, i) {t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: i });}, t.n = function (e) {var n = e && e.__esModule ? function () {return e.default;} : function () {return e;};return t.d(n, "a", n), n;}, t.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, t.p = "D:\\code\\cos-wx-sdk-v5\\demo\\lib", t(t.s = 6);}([function (e, t, n) {"use strict";(function (t) {function i(e) {return encodeURIComponent(e).replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A");}function a(e) {return u(e, function (e) {return "object" == typeof e ? a(e) : e;});}function o(e, t, n) {return e && t in e ? e[t] : n;}function r(e, t) {return p(t, function (n, i) {e[i] = t[i];}), e;}function s(e) {return e instanceof Array;}function c(e, t) {for (var n = !1, i = 0; i < e.length; i++) {if (t === e[i]) {n = !0;break;}}return n;}function l(e) {return s(e) ? e : [e];}function p(e, t) {for (var n in e) {e.hasOwnProperty(n) && t(e[n], n);}}function u(e, t) {var n = s(e) ? [] : {};for (var i in e) {e.hasOwnProperty(i) && (n[i] = t(e[i], i));}return n;}function d(e, t) {var n = s(e),i = n ? [] : {};for (var a in e) {e.hasOwnProperty(a) && t(e[a], a) && (n ? i.push(e[a]) : i[a] = e[a]);}return i;}var m = n(8),f = n(11),h = n(12),g = n(15),v = n(3),x = v.btoa,y = wx.getFileSystemManager(),C = function C(e) {e = e || {};var t,n = e.SecretId,o = e.SecretKey,r = e.KeyTime,s = (e.method || e.Method || "get").toLowerCase(),c = a(e.Query || e.params || {}),l = a(e.Headers || e.headers || {}),p = e.Key || "";if (e.UseRawKey ? t = e.Pathname || e.pathname || "/" + p : (t = e.Pathname || e.pathname || p, 0 !== t.indexOf("/") && (t = "/" + t)), !n) return console.error("missing param SecretId");if (!o) return console.error("missing param SecretKey");var u = function u(e, t) {var n = [];for (var a in e) {e.hasOwnProperty(a) && n.push(t ? i(a).toLowerCase() : a);}return n.sort(function (e, t) {return e = e.toLowerCase(), t = t.toLowerCase(), e === t ? 0 : e > t ? 1 : -1;});},d = function d(e) {var t,n,a,o = [],r = u(e);for (t = 0; t < r.length; t++) {n = r[t], a = void 0 === e[n] || null === e[n] ? "" : "" + e[n], n = i(n).toLowerCase(), a = i(a) || "", o.push(n + "=" + a);}return o.join("&");},m = Math.round(N(e.SystemClockOffset) / 1e3) - 1,h = m,g = e.Expires || e.expires;h += void 0 === g ? 900 : 1 * g || 0;var v = n,x = r || m + ";" + h,y = r || m + ";" + h,C = u(l, !0).join(";").toLowerCase(),k = u(c, !0).join(";").toLowerCase(),b = f.HmacSHA1(y, o).toString(),S = [s, t, d(c), d(l), ""].join("\n"),R = ["sha1", x, f.SHA1(S).toString(), ""].join("\n");return ["q-sign-algorithm=sha1", "q-ak=" + v, "q-sign-time=" + x, "q-key-time=" + y, "q-header-list=" + C, "q-url-param-list=" + k, "q-signature=" + f.HmacSHA1(R, b).toString()].join("&");},k = function k() {},b = function b(e) {var t = {};for (var n in e) {e.hasOwnProperty(n) && void 0 !== e[n] && null !== e[n] && (t[n] = e[n]);}return t;},S = function S(e, t, n, i) {e ? y.readFile({ filePath: e, position: t, length: n - t, success: function success(e) {i(e.data);}, fail: function fail() {i(null);} }) : i(null);},R = function R(e, t, n) {n = n || k, e && t && t instanceof ArrayBuffer ? j.getFileMd5(t, function (e, t) {n(t);}) : n();},w = function w(e, t) {var n = m(e);return t && t(n), n;},_ = function _(e) {var t,n,i,a = "";for (t = 0, n = e.length / 2; t < n; t++) {i = parseInt(e[2 * t] + e[2 * t + 1], 16), a += String.fromCharCode(i);}return x(a);},A = function A() {var e = function e() {return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);};return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();},T = function T(e, t) {var n = t.Bucket,i = t.Region,a = t.Key;if (e.indexOf("Bucket") > -1 || "deleteMultipleObject" === e || "multipartList" === e || "listObjectVersions" === e) {if (!n) return "Bucket";if (!i) return "Region";} else if (e.indexOf("Object") > -1 || e.indexOf("multipart") > -1 || "sliceUploadFile" === e || "abortUploadTask" === e) {if (!n) return "Bucket";if (!i) return "Region";if (!a) return "Key";}return !1;},E = function E(e, t) {if (t = r({}, t), "getAuth" !== e && "getV4Auth" !== e && "getObjectUrl" !== e) {var n = t.Headers || {};if (t && "object" == typeof t) {!function () {for (var e in t) {t.hasOwnProperty(e) && e.indexOf("x-cos-") > -1 && (n[e] = t[e]);}}();var i = { "x-cos-mfa": "MFA", "Content-MD5": "ContentMD5", "Content-Length": "ContentLength", "Content-Type": "ContentType", Expect: "Expect", Expires: "Expires", "Cache-Control": "CacheControl", "Content-Disposition": "ContentDisposition", "Content-Encoding": "ContentEncoding", Range: "Range", "If-Modified-Since": "IfModifiedSince", "If-Unmodified-Since": "IfUnmodifiedSince", "If-Match": "IfMatch", "If-None-Match": "IfNoneMatch", "x-cos-copy-source": "CopySource", "x-cos-copy-source-Range": "CopySourceRange", "x-cos-metadata-directive": "MetadataDirective", "x-cos-copy-source-If-Modified-Since": "CopySourceIfModifiedSince", "x-cos-copy-source-If-Unmodified-Since": "CopySourceIfUnmodifiedSince", "x-cos-copy-source-If-Match": "CopySourceIfMatch", "x-cos-copy-source-If-None-Match": "CopySourceIfNoneMatch", "x-cos-acl": "ACL", "x-cos-grant-read": "GrantRead", "x-cos-grant-write": "GrantWrite", "x-cos-grant-full-control": "GrantFullControl", "x-cos-grant-read-acp": "GrantReadAcp", "x-cos-grant-write-acp": "GrantWriteAcp", "x-cos-storage-class": "StorageClass", "x-cos-server-side-encryption-customer-algorithm": "SSECustomerAlgorithm", "x-cos-server-side-encryption-customer-key": "SSECustomerKey", "x-cos-server-side-encryption-customer-key-MD5": "SSECustomerKeyMD5", "x-cos-server-side-encryption": "ServerSideEncryption", "x-cos-server-side-encryption-cos-kms-key-id": "SSEKMSKeyId", "x-cos-server-side-encryption-context": "SSEContext" };j.each(i, function (e, i) {void 0 !== t[e] && (n[i] = t[e]);}), t.Headers = b(n);}}return t;},B = function B(e, n) {return function (i, a) {var o = this;"function" == typeof i && (a = i, i = {}), i = E(e, i);var r = function r(e) {return e && e.headers && (e.headers["x-cos-version-id"] && (e.VersionId = e.headers["x-cos-version-id"]), e.headers["x-cos-delete-marker"] && (e.DeleteMarker = e.headers["x-cos-delete-marker"])), e;},s = function s(e, t) {a && a(r(e), r(t));},c = function () {if ("getService" !== e && "abortUploadTask" !== e) {var t = T(e, i);if (t) return "missing param " + t;if (i.Region) {if (i.Region.indexOf("cos.") > -1) return 'param Region should not be start with "cos."';if (!/^([a-z\d-]+)$/.test(i.Region)) return "Region format error.";o.options.CompatibilityMode || -1 !== i.Region.indexOf("-") || "yfb" === i.Region || "default" === i.Region || console.warn("warning: param Region format error, find help here: https://cloud.tencent.com/document/product/436/6224");}if (i.Bucket) {if (!/^([a-z\d-]+)-(\d+)$/.test(i.Bucket)) if (i.AppId) i.Bucket = i.Bucket + "-" + i.AppId;else {if (!o.options.AppId) return 'Bucket should format as "test-1250000000".';i.Bucket = i.Bucket + "-" + o.options.AppId;}i.AppId && (console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).'), delete i.AppId);}i.Key && "/" === i.Key.substr(0, 1) && (i.Key = i.Key.substr(1));}}(),l = "getAuth" === e || "getObjectUrl" === e,p = t.Promise;if (!l && p && !a) return new p(function (e, t) {if (a = function a(n, i) {n ? t(n) : e(i);}, c) return s({ error: c });n.call(o, i, s);});if (c) return s({ error: c });var u = n.call(o, i, s);return l ? u : void 0;};},O = function O(e, t) {function n() {if (a = 0, t && "function" == typeof t) {i = Date.now();var n,o = Math.max(0, Math.round((s - r) / ((i - c) / 1e3) * 100) / 100) || 0;n = 0 === s && 0 === e ? 1 : Math.floor(s / e * 100) / 100 || 0, c = i, r = s;try {t({ loaded: s, total: e, speed: o, percent: n });} catch (e) {}}}var i,a,o = this,r = 0,s = 0,c = Date.now();return function (t, i) {if (t && (s = t.loaded, e = t.total), i) clearTimeout(a), n();else {if (a) return;a = setTimeout(n, o.options.ProgressInterval);}};},D = function D(e, t, n) {"postObject" === e ? n() : "putObject" === e ? void 0 !== t.Body ? (t.ContentLength = t.Body.byteLength, n(null, t.ContentLength)) : n({ error: "missing param Body" }) : t.FilePath ? y.stat({ path: t.FilePath, success: function success(e) {var i = e.stats;t.FileStat = i, t.FileStat.FilePath = t.FilePath;var a = i.isDirectory() ? 0 : i.size;t.ContentLength = a = a || 0, n(null, a);}, fail: function fail(e) {n(e);} }) : n({ error: "missing param FilePath" });},N = function N(e) {return Date.now() + (e || 0);},I = function I(e, t) {e = e.split("."), t = t.split(".");for (var n = Math.max(e.length, t.length); e.length < n;) {e.push("0");}for (; t.length < n;) {t.push("0");}for (var i = 0; i < n; i++) {var a = parseInt(e[i]),o = parseInt(t[i]);if (a > o) return 1;if (a < o) return -1;}return 0;},P = function () {var e = wx.getSystemInfoSync(),t = I(e.SDKVersion, "2.10.0") >= 0,n = !t && "devtools" === e.platform;return function () {return n && console.warn("\u5F53\u524D\u5C0F\u7A0B\u5E8F\u7248\u672C\u5C0F\u4E8E 2.10.0\uFF0C\u4E0D\u652F\u6301\u5206\u7247\u4E0A\u4F20\uFF0C\u8BF7\u66F4\u65B0\u8F6F\u4EF6\u3002"), n = !1, t;};}(),j = { noop: k, formatParams: E, apiWrapper: B, xml2json: h, json2xml: g, md5: m, clearKey: b, fileSlice: S, getBodyMd5: R, getFileMd5: w, binaryBase64: _, extend: r, isArray: s, isInArray: c, makeArray: l, each: p, map: u, filter: d, clone: a, attr: o, uuid: A, camSafeUrlEncode: i, throttleOnProgress: O, getFileSize: D, getSkewTime: N, getAuth: C, compareVersion: I, canFileSlice: P };e.exports = j;}).call(t, n(1));}, function (e, t) {var n;n = function () {return this;}();try {n = n || Function("return this")() || (0, eval)("this");} catch (e) {"object" == typeof window && (n = window);}e.exports = n;}, function (e, t) {function n(e, t) {for (var n in e) {t[n] = e[n];}}function i(e, t) {function i() {}var a = e.prototype;if (Object.create) {var o = Object.create(t.prototype);a.__proto__ = o;}a instanceof t || (i.prototype = t.prototype, i = new i(), n(a, i), e.prototype = a = i), a.constructor != e && ("function" != typeof e && console.error("unknow Class:" + e), a.constructor = e);}function a(e, t) {if (t instanceof Error) var n = t;else n = this, Error.call(this, ae[e]), this.message = ae[e], Error.captureStackTrace && Error.captureStackTrace(this, a);return n.code = e, t && (this.message = this.message + ": " + t), n;}function o() {}function r(e, t) {this._node = e, this._refresh = t, s(this);}function s(e) {var t = e._node._inc || e._node.ownerDocument._inc;if (e._inc != t) {var i = e._refresh(e._node);L(e, "length", i.length), n(i, e), e._inc = t;}}function c() {}function l(e, t) {for (var n = e.length; n--;) {if (e[n] === t) return n;}}function p(e, t, n, i) {if (i ? t[l(t, i)] = n : t[t.length++] = n, e) {n.ownerElement = e;var a = e.ownerDocument;a && (i && x(a, e, i), v(a, e, n));}}function u(e, t, n) {var i = l(t, n);if (!(i >= 0)) throw a(re, new Error(e.tagName + "@" + n));for (var o = t.length - 1; i < o;) {t[i] = t[++i];}if (t.length = o, e) {var r = e.ownerDocument;r && (x(r, e, n), n.ownerElement = null);}}function d(e) {if (this._features = {}, e) for (var t in e) {this._features = e[t];}}function m() {}function f(e) {return "<" == e && "&lt;" || ">" == e && "&gt;" || "&" == e && "&amp;" || '"' == e && "&quot;" || "&#" + e.charCodeAt() + ";";}function h(e, t) {if (t(e)) return !0;if (e = e.firstChild) do {if (h(e, t)) return !0;} while (e = e.nextSibling);}function g() {}function v(e, t, n) {e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && (t._nsMap[n.prefix ? n.localName : ""] = n.value);}function x(e, t, n, i) {e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ""];}function y(e, t, n) {if (e && e._inc) {e._inc++;var i = t.childNodes;if (n) i[i.length++] = n;else {for (var a = t.firstChild, o = 0; a;) {i[o++] = a, a = a.nextSibling;}i.length = o;}}}function C(e, t) {var n = t.previousSibling,i = t.nextSibling;return n ? n.nextSibling = i : e.firstChild = i, i ? i.previousSibling = n : e.lastChild = n, y(e.ownerDocument, e), t;}function k(e, t, n) {var i = t.parentNode;if (i && i.removeChild(t), t.nodeType === te) {var a = t.firstChild;if (null == a) return t;var o = t.lastChild;} else a = o = t;var r = n ? n.previousSibling : e.lastChild;a.previousSibling = r, o.nextSibling = n, r ? r.nextSibling = a : e.firstChild = a, null == n ? e.lastChild = o : n.previousSibling = o;do {a.parentNode = e;} while (a !== o && (a = a.nextSibling));return y(e.ownerDocument || e, e), t.nodeType == te && (t.firstChild = t.lastChild = null), t;}function b(e, t) {var n = t.parentNode;if (n) {var i = e.lastChild;n.removeChild(t);var i = e.lastChild;}var i = e.lastChild;return t.parentNode = e, t.previousSibling = i, t.nextSibling = null, i ? i.nextSibling = t : e.firstChild = t, e.lastChild = t, y(e.ownerDocument, e, t), t;}function S() {this._nsMap = {};}function R() {}function w() {}function _() {}function A() {}function T() {}function E() {}function B() {}function O() {}function D() {}function N() {}function I() {}function P() {}function j(e, t) {var n = [],i = 9 == this.nodeType ? this.documentElement : this,a = i.prefix,o = i.namespaceURI;if (o && null == a) {var a = i.lookupPrefix(o);if (null == a) var r = [{ namespace: o, prefix: null }];}return U(this, n, e, t, r), n.join("");}function M(e, t, n) {var i = e.prefix || "",a = e.namespaceURI;if (!i && !a) return !1;if ("xml" === i && "http://www.w3.org/XML/1998/namespace" === a || "http://www.w3.org/2000/xmlns/" == a) return !1;for (var o = n.length; o--;) {var r = n[o];if (r.prefix == i) return r.namespace != a;}return !0;}function U(e, t, n, i, a) {if (i) {if (!(e = i(e))) return;if ("string" == typeof e) return void t.push(e);}switch (e.nodeType) {case G:a || (a = []);var o = (a.length, e.attributes),r = o.length,s = e.firstChild,c = e.tagName;n = K === e.namespaceURI || n, t.push("<", c);for (var l = 0; l < r; l++) {var p = o.item(l);"xmlns" == p.prefix ? a.push({ prefix: p.localName, namespace: p.value }) : "xmlns" == p.nodeName && a.push({ prefix: "", namespace: p.value });}for (var l = 0; l < r; l++) {var p = o.item(l);if (M(p, n, a)) {var u = p.prefix || "",d = p.namespaceURI,m = u ? " xmlns:" + u : " xmlns";t.push(m, '="', d, '"'), a.push({ prefix: u, namespace: d });}U(p, t, n, i, a);}if (M(e, n, a)) {var u = e.prefix || "",d = e.namespaceURI,m = u ? " xmlns:" + u : " xmlns";t.push(m, '="', d, '"'), a.push({ prefix: u, namespace: d });}if (s || n && !/^(?:meta|link|img|br|hr|input)$/i.test(c)) {if (t.push(">"), n && /^script$/i.test(c)) for (; s;) {s.data ? t.push(s.data) : U(s, t, n, i, a), s = s.nextSibling;} else for (; s;) {U(s, t, n, i, a), s = s.nextSibling;}t.push("</", c, ">");} else t.push("/>");return;case Z:case te:for (var s = e.firstChild; s;) {U(s, t, n, i, a), s = s.nextSibling;}return;case V:return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, f), '"');case X:return t.push(e.data.replace(/[<&]/g, f));case W:return t.push("<![CDATA[", e.data, "]]>");case Y:return t.push("\x3c!--", e.data, "--\x3e");case ee:var h = e.publicId,g = e.systemId;if (t.push("<!DOCTYPE ", e.name), h) t.push(' PUBLIC "', h), g && "." != g && t.push('" "', g), t.push('">');else if (g && "." != g) t.push(' SYSTEM "', g, '">');else {var v = e.internalSubset;v && t.push(" [", v, "]"), t.push(">");}return;case J:return t.push("<?", e.target, " ", e.data, "?>");case $:return t.push("&", e.nodeName, ";");default:t.push("??", e.nodeName);}}function F(e, t, n) {var i;switch (t.nodeType) {case G:i = t.cloneNode(!1), i.ownerDocument = e;case te:break;case V:n = !0;}if (i || (i = t.cloneNode(!1)), i.ownerDocument = e, i.parentNode = null, n) for (var a = t.firstChild; a;) {i.appendChild(F(e, a, n)), a = a.nextSibling;}return i;}function H(e, t, n) {var i = new t.constructor();for (var a in t) {var r = t[a];"object" != typeof r && r != i[a] && (i[a] = r);}switch (t.childNodes && (i.childNodes = new o()), i.ownerDocument = e, i.nodeType) {case G:var s = t.attributes,l = i.attributes = new c(),p = s.length;l._ownerElement = i;for (var u = 0; u < p; u++) {i.setAttributeNode(H(e, s.item(u), !0));}break;case V:n = !0;}if (n) for (var d = t.firstChild; d;) {i.appendChild(H(e, d, n)), d = d.nextSibling;}return i;}function L(e, t, n) {e[t] = n;}function z(e) {switch (e.nodeType) {case G:case te:var t = [];for (e = e.firstChild; e;) {7 !== e.nodeType && 8 !== e.nodeType && t.push(z(e)), e = e.nextSibling;}return t.join("");default:return e.nodeValue;}}var K = "http://www.w3.org/1999/xhtml",q = {},G = q.ELEMENT_NODE = 1,V = q.ATTRIBUTE_NODE = 2,X = q.TEXT_NODE = 3,W = q.CDATA_SECTION_NODE = 4,$ = q.ENTITY_REFERENCE_NODE = 5,Q = q.ENTITY_NODE = 6,J = q.PROCESSING_INSTRUCTION_NODE = 7,Y = q.COMMENT_NODE = 8,Z = q.DOCUMENT_NODE = 9,ee = q.DOCUMENT_TYPE_NODE = 10,te = q.DOCUMENT_FRAGMENT_NODE = 11,ne = q.NOTATION_NODE = 12,ie = {},ae = {},oe = (ie.INDEX_SIZE_ERR = (ae[1] = "Index size error", 1), ie.DOMSTRING_SIZE_ERR = (ae[2] = "DOMString size error", 2), ie.HIERARCHY_REQUEST_ERR = (ae[3] = "Hierarchy request error", 3)),re = (ie.WRONG_DOCUMENT_ERR = (ae[4] = "Wrong document", 4), ie.INVALID_CHARACTER_ERR = (ae[5] = "Invalid character", 5), ie.NO_DATA_ALLOWED_ERR = (ae[6] = "No data allowed", 6), ie.NO_MODIFICATION_ALLOWED_ERR = (ae[7] = "No modification allowed", 7), ie.NOT_FOUND_ERR = (ae[8] = "Not found", 8)),se = (ie.NOT_SUPPORTED_ERR = (ae[9] = "Not supported", 9), ie.INUSE_ATTRIBUTE_ERR = (ae[10] = "Attribute in use", 10));ie.INVALID_STATE_ERR = (ae[11] = "Invalid state", 11), ie.SYNTAX_ERR = (ae[12] = "Syntax error", 12), ie.INVALID_MODIFICATION_ERR = (ae[13] = "Invalid modification", 13), ie.NAMESPACE_ERR = (ae[14] = "Invalid namespace", 14), ie.INVALID_ACCESS_ERR = (ae[15] = "Invalid access", 15);a.prototype = Error.prototype, n(ie, a), o.prototype = { length: 0, item: function item(e) {return this[e] || null;}, toString: function toString(e, t) {for (var n = [], i = 0; i < this.length; i++) {U(this[i], n, e, t);}return n.join("");} }, r.prototype.item = function (e) {return s(this), this[e];}, i(r, o), c.prototype = { length: 0, item: o.prototype.item, getNamedItem: function getNamedItem(e) {for (var t = this.length; t--;) {var n = this[t];if (n.nodeName == e) return n;}}, setNamedItem: function setNamedItem(e) {var t = e.ownerElement;if (t && t != this._ownerElement) throw new a(se);var n = this.getNamedItem(e.nodeName);return p(this._ownerElement, this, e, n), n;}, setNamedItemNS: function setNamedItemNS(e) {var t,n = e.ownerElement;if (n && n != this._ownerElement) throw new a(se);return t = this.getNamedItemNS(e.namespaceURI, e.localName), p(this._ownerElement, this, e, t), t;}, removeNamedItem: function removeNamedItem(e) {var t = this.getNamedItem(e);return u(this._ownerElement, this, t), t;}, removeNamedItemNS: function removeNamedItemNS(e, t) {var n = this.getNamedItemNS(e, t);return u(this._ownerElement, this, n), n;}, getNamedItemNS: function getNamedItemNS(e, t) {for (var n = this.length; n--;) {var i = this[n];if (i.localName == t && i.namespaceURI == e) return i;}return null;} }, d.prototype = { hasFeature: function hasFeature(e, t) {var n = this._features[e.toLowerCase()];return !(!n || t && !(t in n));}, createDocument: function createDocument(e, t, n) {var i = new g();if (i.implementation = this, i.childNodes = new o(), i.doctype = n, n && i.appendChild(n), t) {var a = i.createElementNS(e, t);i.appendChild(a);}return i;}, createDocumentType: function createDocumentType(e, t, n) {var i = new E();return i.name = e, i.nodeName = e, i.publicId = t, i.systemId = n, i;} }, m.prototype = { firstChild: null, lastChild: null, previousSibling: null, nextSibling: null, attributes: null, parentNode: null, childNodes: null, ownerDocument: null, nodeValue: null, namespaceURI: null, prefix: null, localName: null, insertBefore: function insertBefore(e, t) {return k(this, e, t);}, replaceChild: function replaceChild(e, t) {this.insertBefore(e, t), t && this.removeChild(t);}, removeChild: function removeChild(e) {return C(this, e);}, appendChild: function appendChild(e) {return this.insertBefore(e, null);}, hasChildNodes: function hasChildNodes() {return null != this.firstChild;}, cloneNode: function cloneNode(e) {return H(this.ownerDocument || this, this, e);}, normalize: function normalize() {for (var e = this.firstChild; e;) {var t = e.nextSibling;t && t.nodeType == X && e.nodeType == X ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);}}, isSupported: function isSupported(e, t) {return this.ownerDocument.implementation.hasFeature(e, t);}, hasAttributes: function hasAttributes() {return this.attributes.length > 0;}, lookupPrefix: function lookupPrefix(e) {for (var t = this; t;) {var n = t._nsMap;if (n) for (var i in n) {if (n[i] == e) return i;}t = t.nodeType == V ? t.ownerDocument : t.parentNode;}return null;}, lookupNamespaceURI: function lookupNamespaceURI(e) {for (var t = this; t;) {var n = t._nsMap;if (n && e in n) return n[e];t = t.nodeType == V ? t.ownerDocument : t.parentNode;}return null;}, isDefaultNamespace: function isDefaultNamespace(e) {return null == this.lookupPrefix(e);} }, n(q, m), n(q, m.prototype), g.prototype = { nodeName: "#document", nodeType: Z, doctype: null, documentElement: null, _inc: 1, insertBefore: function insertBefore(e, t) {if (e.nodeType == te) {for (var n = e.firstChild; n;) {var i = n.nextSibling;this.insertBefore(n, t), n = i;}return e;}return null == this.documentElement && e.nodeType == G && (this.documentElement = e), k(this, e, t), e.ownerDocument = this, e;}, removeChild: function removeChild(e) {return this.documentElement == e && (this.documentElement = null), C(this, e);}, importNode: function importNode(e, t) {return F(this, e, t);}, getElementById: function getElementById(e) {var t = null;return h(this.documentElement, function (n) {if (n.nodeType == G && n.getAttribute("id") == e) return t = n, !0;}), t;}, createElement: function createElement(e) {var t = new S();return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new o(), (t.attributes = new c())._ownerElement = t, t;}, createDocumentFragment: function createDocumentFragment() {var e = new N();return e.ownerDocument = this, e.childNodes = new o(), e;}, createTextNode: function createTextNode(e) {var t = new _();return t.ownerDocument = this, t.appendData(e), t;}, createComment: function createComment(e) {var t = new A();return t.ownerDocument = this, t.appendData(e), t;}, createCDATASection: function createCDATASection(e) {var t = new T();return t.ownerDocument = this, t.appendData(e), t;}, createProcessingInstruction: function createProcessingInstruction(e, t) {var n = new I();return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, n;}, createAttribute: function createAttribute(e) {var t = new R();return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;}, createEntityReference: function createEntityReference(e) {var t = new D();return t.ownerDocument = this, t.nodeName = e, t;}, createElementNS: function createElementNS(e, t) {var n = new S(),i = t.split(":"),a = n.attributes = new c();return n.childNodes = new o(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, 2 == i.length ? (n.prefix = i[0], n.localName = i[1]) : n.localName = t, a._ownerElement = n, n;}, createAttributeNS: function createAttributeNS(e, t) {var n = new R(),i = t.split(":");return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, 2 == i.length ? (n.prefix = i[0], n.localName = i[1]) : n.localName = t, n;} }, i(g, m), S.prototype = { nodeType: G, hasAttribute: function hasAttribute(e) {return null != this.getAttributeNode(e);}, getAttribute: function getAttribute(e) {var t = this.getAttributeNode(e);return t && t.value || "";}, getAttributeNode: function getAttributeNode(e) {return this.attributes.getNamedItem(e);}, setAttribute: function setAttribute(e, t) {var n = this.ownerDocument.createAttribute(e);n.value = n.nodeValue = "" + t, this.setAttributeNode(n);}, removeAttribute: function removeAttribute(e) {var t = this.getAttributeNode(e);t && this.removeAttributeNode(t);}, appendChild: function appendChild(e) {return e.nodeType === te ? this.insertBefore(e, null) : b(this, e);}, setAttributeNode: function setAttributeNode(e) {return this.attributes.setNamedItem(e);}, setAttributeNodeNS: function setAttributeNodeNS(e) {return this.attributes.setNamedItemNS(e);}, removeAttributeNode: function removeAttributeNode(e) {return this.attributes.removeNamedItem(e.nodeName);}, removeAttributeNS: function removeAttributeNS(e, t) {var n = this.getAttributeNodeNS(e, t);n && this.removeAttributeNode(n);}, hasAttributeNS: function hasAttributeNS(e, t) {return null != this.getAttributeNodeNS(e, t);}, getAttributeNS: function getAttributeNS(e, t) {var n = this.getAttributeNodeNS(e, t);return n && n.value || "";}, setAttributeNS: function setAttributeNS(e, t, n) {var i = this.ownerDocument.createAttributeNS(e, t);i.value = i.nodeValue = "" + n, this.setAttributeNode(i);}, getAttributeNodeNS: function getAttributeNodeNS(e, t) {return this.attributes.getNamedItemNS(e, t);}, getElementsByTagName: function getElementsByTagName(e) {return new r(this, function (t) {var n = [];return h(t, function (i) {i === t || i.nodeType != G || "*" !== e && i.tagName != e || n.push(i);}), n;});}, getElementsByTagNameNS: function getElementsByTagNameNS(e, t) {return new r(this, function (n) {var i = [];return h(n, function (a) {a === n || a.nodeType !== G || "*" !== e && a.namespaceURI !== e || "*" !== t && a.localName != t || i.push(a);}), i;});} }, g.prototype.getElementsByTagName = S.prototype.getElementsByTagName, g.prototype.getElementsByTagNameNS = S.prototype.getElementsByTagNameNS, i(S, m), R.prototype.nodeType = V, i(R, m), w.prototype = { data: "", substringData: function substringData(e, t) {return this.data.substring(e, e + t);}, appendData: function appendData(e) {e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;}, insertData: function insertData(e, t) {this.replaceData(e, 0, t);}, appendChild: function appendChild(e) {throw new Error(ae[oe]);}, deleteData: function deleteData(e, t) {this.replaceData(e, t, "");}, replaceData: function replaceData(e, t, n) {n = this.data.substring(0, e) + n + this.data.substring(e + t), this.nodeValue = this.data = n, this.length = n.length;} }, i(w, m), _.prototype = { nodeName: "#text", nodeType: X, splitText: function splitText(e) {var t = this.data,n = t.substring(e);t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;var i = this.ownerDocument.createTextNode(n);return this.parentNode && this.parentNode.insertBefore(i, this.nextSibling), i;} }, i(_, w), A.prototype = { nodeName: "#comment", nodeType: Y }, i(A, w), T.prototype = { nodeName: "#cdata-section", nodeType: W }, i(T, w), E.prototype.nodeType = ee, i(E, m), B.prototype.nodeType = ne, i(B, m), O.prototype.nodeType = Q, i(O, m), D.prototype.nodeType = $, i(D, m), N.prototype.nodeName = "#document-fragment", N.prototype.nodeType = te, i(N, m), I.prototype.nodeType = J, i(I, m), P.prototype.serializeToString = function (e, t, n) {return j.call(e, t, n);}, m.prototype.toString = j;try {Object.defineProperty && (Object.defineProperty(r.prototype, "length", { get: function get() {return s(this), this.$$length;} }), Object.defineProperty(m.prototype, "textContent", { get: function get() {return z(this);}, set: function set(e) {switch (this.nodeType) {case G:case te:for (; this.firstChild;) {this.removeChild(this.firstChild);}(e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));break;default:this.data = e, this.value = e, this.nodeValue = e;}} }), L = function L(e, t, n) {e["$$" + t] = n;});} catch (e) {}t.DOMImplementation = d, t.XMLSerializer = P;}, function (e, t) {var n = function (e) {e = e || {};var t,n = e.Base64,i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a = function (e) {for (var t = {}, n = 0, i = e.length; n < i; n++) {t[e.charAt(n)] = n;}return t;}(i),o = String.fromCharCode,r = function r(e) {if (e.length < 2) {var t = e.charCodeAt(0);return t < 128 ? e : t < 2048 ? o(192 | t >>> 6) + o(128 | 63 & t) : o(224 | t >>> 12 & 15) + o(128 | t >>> 6 & 63) + o(128 | 63 & t);}var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);return o(240 | t >>> 18 & 7) + o(128 | t >>> 12 & 63) + o(128 | t >>> 6 & 63) + o(128 | 63 & t);},s = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,c = function c(e) {return e.replace(s, r);},l = function l(e) {var t = [0, 2, 1][e.length % 3],n = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0);return [i.charAt(n >>> 18), i.charAt(n >>> 12 & 63), t >= 2 ? "=" : i.charAt(n >>> 6 & 63), t >= 1 ? "=" : i.charAt(63 & n)].join("");},p = e.btoa ? function (t) {return e.btoa(t);} : function (e) {return e.replace(/[\s\S]{1,3}/g, l);},u = t ? function (e) {return (e.constructor === t.constructor ? e : new t(e)).toString("base64");} : function (e) {return p(c(e));},d = function d(e, t) {return t ? u(String(e)).replace(/[+\/]/g, function (e) {return "+" == e ? "-" : "_";}).replace(/=/g, "") : u(String(e));},m = function m(e) {return d(e, !0);},f = new RegExp(["[\xc0-\xdf][\x80-\xbf]", "[\xe0-\xef][\x80-\xbf]{2}", "[\xf0-\xf7][\x80-\xbf]{3}"].join("|"), "g"),h = function h(e) {switch (e.length) {case 4:var t = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3),n = t - 65536;return o(55296 + (n >>> 10)) + o(56320 + (1023 & n));case 3:return o((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));default:return o((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));}},g = function g(e) {return e.replace(f, h);},v = function v(e) {var t = e.length,n = t % 4,i = (t > 0 ? a[e.charAt(0)] << 18 : 0) | (t > 1 ? a[e.charAt(1)] << 12 : 0) | (t > 2 ? a[e.charAt(2)] << 6 : 0) | (t > 3 ? a[e.charAt(3)] : 0),r = [o(i >>> 16), o(i >>> 8 & 255), o(255 & i)];return r.length -= [0, 0, 2, 1][n], r.join("");},x = e.atob ? function (t) {return e.atob(t);} : function (e) {return e.replace(/[\s\S]{1,4}/g, v);},y = t ? function (e) {return (e.constructor === t.constructor ? e : new t(e, "base64")).toString();} : function (e) {return g(x(e));},C = function C(e) {return y(String(e).replace(/[-_]/g, function (e) {return "-" == e ? "+" : "/";}).replace(/[^A-Za-z0-9\+\/]/g, ""));};return { VERSION: "2.1.9", atob: x, btoa: p, fromBase64: C, toBase64: d, utob: c, encode: d, encodeURI: m, btou: g, decode: C, noConflict: function noConflict() {var t = e.Base64;return e.Base64 = n, t;} };}();e.exports = n;}, function (e, t) {var n = function n(e) {var t = {},n = function n(e) {return !t[e] && (t[e] = []), t[e];};e.on = function (e, t) {n(e).push(t);}, e.off = function (e, t) {for (var i = n(e), a = i.length - 1; a >= 0; a--) {t === i[a] && i.splice(a, 1);}}, e.emit = function (e, t) {for (var i = n(e).map(function (e) {return e;}), a = 0; a < i.length; a++) {i[a](t);}};},i = function i() {n(this);};e.exports.init = n, e.exports.EventProxy = i;}, function (e, t, n) {var i,a,o = n(0),r = function r() {try {var e = JSON.parse(wx.getStorageSync("cos_sdk_upload_cache"));} catch (e) {}return e || (e = []), e;},s = function s() {try {wx.setStorageSync("cos_sdk_upload_cache", JSON.stringify(i));} catch (e) {}},c = function c() {if (!i) {i = r();for (var e = !1, t = Math.round(Date.now() / 1e3), n = i.length - 1; n >= 0; n--) {var a = i[n][2];(!a || a + 2592e3 < t) && (i.splice(n, 1), e = !0);}e && s();}},l = function l() {a || (a = setTimeout(function () {s(), a = null;}, 400));},p = { using: {}, setUsing: function setUsing(e) {p.using[e] = !0;}, removeUsing: function removeUsing(e) {delete p.using[e];}, getFileId: function getFileId(e, t, n, i) {return e.FilePath && e.size && e.lastModifiedTime && t ? o.md5([e.FilePath].join("::")) + "-" + o.md5([e.size, e.mode, e.lastAccessedTime, e.lastModifiedTime, t, n, i].join("::")) : null;}, getUploadIdList: function getUploadIdList(e) {if (!e) return null;c();for (var t = [], n = 0; n < i.length; n++) {i[n][0] === e && t.push(i[n][1]);}return t.length ? t : null;}, saveUploadId: function saveUploadId(e, t, n) {if (c(), e) {for (var a = e.substr(0, e.indexOf("-") + 1), o = i.length - 1; o >= 0; o--) {var r = i[o];r[0] === e && r[1] === t ? i.splice(o, 1) : e !== r[0] && 0 === r[0].indexOf(a) && i.splice(o, 1);}i.unshift([e, t, Math.round(Date.now() / 1e3)]), i.length > n && i.splice(n), l();}}, removeUploadId: function removeUploadId(e) {c(), delete p.using[e];for (var t = i.length - 1; t >= 0; t--) {i[t][1] === e && i.splice(t, 1);}l();} };e.exports = p;}, function (e, t, n) {var i = n(7);e.exports = i;}, function (e, t, n) {"use strict";var i = n(0),a = n(4),o = n(16),r = n(17),s = n(23),c = { SecretId: "", SecretKey: "", XCosSecurityToken: "", ChunkRetryTimes: 2, FileParallelLimit: 3, ChunkParallelLimit: 3, ChunkSize: 1048576, SliceSize: 1048576, CopyChunkParallelLimit: 20, CopyChunkSize: 10485760, CopySliceSize: 10485760, MaxPartNumber: 1e4, ProgressInterval: 1e3, UploadQueueSize: 1e4, Domain: "", ServiceDomain: "", Protocol: "", CompatibilityMode: !1, ForcePathStyle: !1, Timeout: 0, CorrectClockSkew: !0, SystemClockOffset: 0, UploadCheckContentMd5: !1, UploadIdCacheLimit: 50 },l = function l(e) {this.options = i.extend(i.clone(c), e || {}), this.options.FileParallelLimit = Math.max(1, this.options.FileParallelLimit), this.options.ChunkParallelLimit = Math.max(1, this.options.ChunkParallelLimit), this.options.ChunkRetryTimes = Math.max(0, this.options.ChunkRetryTimes), this.options.ChunkSize = Math.max(1048576, this.options.ChunkSize), this.options.CopyChunkParallelLimit = Math.max(1, this.options.CopyChunkParallelLimit), this.options.CopyChunkSize = Math.max(1048576, this.options.CopyChunkSize), this.options.CopySliceSize = Math.max(0, this.options.CopySliceSize), this.options.MaxPartNumber = Math.max(1024, Math.min(1e4, this.options.MaxPartNumber)), this.options.Timeout = Math.max(0, this.options.Timeout), this.options.AppId && console.warn('warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g: "test-1250000000").'), a.init(this), o.init(this);};r.init(l, o), s.init(l, o), l.getAuthorization = i.getAuth, l.version = "1.0.5", e.exports = l;}, function (module, exports, __webpack_require__) {(function (process, global) {var __WEBPACK_AMD_DEFINE_RESULT__;!function () {"use strict";function Md5(e) {if (e) blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, this.blocks = blocks, this.buffer8 = buffer8;else if (ARRAY_BUFFER) {var t = new ArrayBuffer(68);this.buffer8 = new Uint8Array(t), this.blocks = new Uint32Array(t);} else this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0;}var ERROR = "input is invalid type",WINDOW = "object" == typeof window,root = WINDOW ? window : {};root.JS_MD5_NO_WINDOW && (WINDOW = !1);var WEB_WORKER = !WINDOW && "object" == typeof self,NODE_JS = !root.JS_MD5_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;NODE_JS ? root = global : WEB_WORKER && (root = self);var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && "object" == typeof module && module.exports,AMD = __webpack_require__(10),ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,HEX_CHARS = "0123456789abcdef".split(""),EXTRA = [128, 32768, 8388608, -2147483648],SHIFT = [0, 8, 16, 24],OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"],BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks = [],buffer8;if (ARRAY_BUFFER) {var buffer = new ArrayBuffer(68);buffer8 = new Uint8Array(buffer), blocks = new Uint32Array(buffer);}!root.JS_MD5_NO_NODE_JS && Array.isArray || (Array.isArray = function (e) {return "[object Array]" === Object.prototype.toString.call(e);}), !ARRAY_BUFFER || !root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function (e) {return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer;});var createOutputMethod = function createOutputMethod(e) {return function (t) {return new Md5(!0).update(t)[e]();};},createMethod = function createMethod() {var e = createOutputMethod("hex");NODE_JS && (e = nodeWrap(e)), e.getCtx = e.create = function () {return new Md5();}, e.update = function (t) {return e.create().update(t);};for (var t = 0; t < OUTPUT_TYPES.length; ++t) {var n = OUTPUT_TYPES[t];e[n] = createOutputMethod(n);}return e;},nodeWrap = function nodeWrap(method) {var crypto = eval("require('crypto')"),Buffer = eval("require('buffer').Buffer"),nodeMethod = function nodeMethod(e) {if ("string" == typeof e) return crypto.createHash("md5").update(e, "utf8").digest("hex");if (null === e || void 0 === e) throw ERROR;return e.constructor === ArrayBuffer && (e = new Uint8Array(e)), Array.isArray(e) || ArrayBuffer.isView(e) || e.constructor === Buffer ? crypto.createHash("md5").update(new Buffer(e)).digest("hex") : method(e);};return nodeMethod;};Md5.prototype.update = function (e) {if (!this.finalized) {var t,n = typeof e;if ("string" !== n) {if ("object" !== n) throw ERROR;if (null === e) throw ERROR;if (!ARRAY_BUFFER || e.constructor !== ArrayBuffer && "ArrayBuffer" !== e.constructor.name) {if (!(Array.isArray(e) || ARRAY_BUFFER && ArrayBuffer.isView(e))) throw ERROR;} else e = new Uint8Array(e);t = !0;}for (var i, a, o = 0, r = e.length, s = this.blocks, c = this.buffer8; o < r;) {if (this.hashed && (this.hashed = !1, s[0] = s[16], s[16] = s[1] = s[2] = s[3] = s[4] = s[5] = s[6] = s[7] = s[8] = s[9] = s[10] = s[11] = s[12] = s[13] = s[14] = s[15] = 0), t) {if (ARRAY_BUFFER) for (a = this.start; o < r && a < 64; ++o) {c[a++] = e[o];} else for (a = this.start; o < r && a < 64; ++o) {s[a >> 2] |= e[o] << SHIFT[3 & a++];}} else if (ARRAY_BUFFER) for (a = this.start; o < r && a < 64; ++o) {i = e.charCodeAt(o), i < 128 ? c[a++] = i : i < 2048 ? (c[a++] = 192 | i >> 6, c[a++] = 128 | 63 & i) : i < 55296 || i >= 57344 ? (c[a++] = 224 | i >> 12, c[a++] = 128 | i >> 6 & 63, c[a++] = 128 | 63 & i) : (i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(++o)), c[a++] = 240 | i >> 18, c[a++] = 128 | i >> 12 & 63, c[a++] = 128 | i >> 6 & 63, c[a++] = 128 | 63 & i);} else for (a = this.start; o < r && a < 64; ++o) {i = e.charCodeAt(o), i < 128 ? s[a >> 2] |= i << SHIFT[3 & a++] : i < 2048 ? (s[a >> 2] |= (192 | i >> 6) << SHIFT[3 & a++], s[a >> 2] |= (128 | 63 & i) << SHIFT[3 & a++]) : i < 55296 || i >= 57344 ? (s[a >> 2] |= (224 | i >> 12) << SHIFT[3 & a++], s[a >> 2] |= (128 | i >> 6 & 63) << SHIFT[3 & a++], s[a >> 2] |= (128 | 63 & i) << SHIFT[3 & a++]) : (i = 65536 + ((1023 & i) << 10 | 1023 & e.charCodeAt(++o)), s[a >> 2] |= (240 | i >> 18) << SHIFT[3 & a++], s[a >> 2] |= (128 | i >> 12 & 63) << SHIFT[3 & a++], s[a >> 2] |= (128 | i >> 6 & 63) << SHIFT[3 & a++], s[a >> 2] |= (128 | 63 & i) << SHIFT[3 & a++]);}this.lastByteIndex = a, this.bytes += a - this.start, a >= 64 ? (this.start = a - 64, this.hash(), this.hashed = !0) : this.start = a;}return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;}}, Md5.prototype.finalize = function () {if (!this.finalized) {this.finalized = !0;var e = this.blocks,t = this.lastByteIndex;e[t >> 2] |= EXTRA[3 & t], t >= 56 && (this.hashed || this.hash(), e[0] = e[16], e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0), e[14] = this.bytes << 3, e[15] = this.hBytes << 3 | this.bytes >>> 29, this.hash();}}, Md5.prototype.hash = function () {var e,t,n,i,a,o,r = this.blocks;this.first ? (e = r[0] - 680876937, e = (e << 7 | e >>> 25) - 271733879 << 0, i = (-1732584194 ^ 2004318071 & e) + r[1] - 117830708, i = (i << 12 | i >>> 20) + e << 0, n = (-271733879 ^ i & (-271733879 ^ e)) + r[2] - 1126478375, n = (n << 17 | n >>> 15) + i << 0, t = (e ^ n & (i ^ e)) + r[3] - 1316259209, t = (t << 22 | t >>> 10) + n << 0) : (e = this.h0, t = this.h1, n = this.h2, i = this.h3, e += (i ^ t & (n ^ i)) + r[0] - 680876936, e = (e << 7 | e >>> 25) + t << 0, i += (n ^ e & (t ^ n)) + r[1] - 389564586, i = (i << 12 | i >>> 20) + e << 0, n += (t ^ i & (e ^ t)) + r[2] + 606105819, n = (n << 17 | n >>> 15) + i << 0, t += (e ^ n & (i ^ e)) + r[3] - 1044525330, t = (t << 22 | t >>> 10) + n << 0), e += (i ^ t & (n ^ i)) + r[4] - 176418897, e = (e << 7 | e >>> 25) + t << 0, i += (n ^ e & (t ^ n)) + r[5] + 1200080426, i = (i << 12 | i >>> 20) + e << 0, n += (t ^ i & (e ^ t)) + r[6] - 1473231341, n = (n << 17 | n >>> 15) + i << 0, t += (e ^ n & (i ^ e)) + r[7] - 45705983, t = (t << 22 | t >>> 10) + n << 0, e += (i ^ t & (n ^ i)) + r[8] + 1770035416, e = (e << 7 | e >>> 25) + t << 0, i += (n ^ e & (t ^ n)) + r[9] - 1958414417, i = (i << 12 | i >>> 20) + e << 0, n += (t ^ i & (e ^ t)) + r[10] - 42063, n = (n << 17 | n >>> 15) + i << 0, t += (e ^ n & (i ^ e)) + r[11] - 1990404162, t = (t << 22 | t >>> 10) + n << 0, e += (i ^ t & (n ^ i)) + r[12] + 1804603682, e = (e << 7 | e >>> 25) + t << 0, i += (n ^ e & (t ^ n)) + r[13] - 40341101, i = (i << 12 | i >>> 20) + e << 0, n += (t ^ i & (e ^ t)) + r[14] - 1502002290, n = (n << 17 | n >>> 15) + i << 0, t += (e ^ n & (i ^ e)) + r[15] + 1236535329, t = (t << 22 | t >>> 10) + n << 0, e += (n ^ i & (t ^ n)) + r[1] - 165796510, e = (e << 5 | e >>> 27) + t << 0, i += (t ^ n & (e ^ t)) + r[6] - 1069501632, i = (i << 9 | i >>> 23) + e << 0, n += (e ^ t & (i ^ e)) + r[11] + 643717713, n = (n << 14 | n >>> 18) + i << 0, t += (i ^ e & (n ^ i)) + r[0] - 373897302, t = (t << 20 | t >>> 12) + n << 0, e += (n ^ i & (t ^ n)) + r[5] - 701558691, e = (e << 5 | e >>> 27) + t << 0, i += (t ^ n & (e ^ t)) + r[10] + 38016083, i = (i << 9 | i >>> 23) + e << 0, n += (e ^ t & (i ^ e)) + r[15] - 660478335, n = (n << 14 | n >>> 18) + i << 0, t += (i ^ e & (n ^ i)) + r[4] - 405537848, t = (t << 20 | t >>> 12) + n << 0, e += (n ^ i & (t ^ n)) + r[9] + 568446438, e = (e << 5 | e >>> 27) + t << 0, i += (t ^ n & (e ^ t)) + r[14] - 1019803690, i = (i << 9 | i >>> 23) + e << 0, n += (e ^ t & (i ^ e)) + r[3] - 187363961, n = (n << 14 | n >>> 18) + i << 0, t += (i ^ e & (n ^ i)) + r[8] + 1163531501, t = (t << 20 | t >>> 12) + n << 0, e += (n ^ i & (t ^ n)) + r[13] - 1444681467, e = (e << 5 | e >>> 27) + t << 0, i += (t ^ n & (e ^ t)) + r[2] - 51403784, i = (i << 9 | i >>> 23) + e << 0, n += (e ^ t & (i ^ e)) + r[7] + 1735328473, n = (n << 14 | n >>> 18) + i << 0, t += (i ^ e & (n ^ i)) + r[12] - 1926607734, t = (t << 20 | t >>> 12) + n << 0, a = t ^ n, e += (a ^ i) + r[5] - 378558, e = (e << 4 | e >>> 28) + t << 0, i += (a ^ e) + r[8] - 2022574463, i = (i << 11 | i >>> 21) + e << 0, o = i ^ e, n += (o ^ t) + r[11] + 1839030562, n = (n << 16 | n >>> 16) + i << 0, t += (o ^ n) + r[14] - 35309556, t = (t << 23 | t >>> 9) + n << 0, a = t ^ n, e += (a ^ i) + r[1] - 1530992060, e = (e << 4 | e >>> 28) + t << 0, i += (a ^ e) + r[4] + 1272893353, i = (i << 11 | i >>> 21) + e << 0, o = i ^ e, n += (o ^ t) + r[7] - 155497632, n = (n << 16 | n >>> 16) + i << 0, t += (o ^ n) + r[10] - 1094730640, t = (t << 23 | t >>> 9) + n << 0, a = t ^ n, e += (a ^ i) + r[13] + 681279174, e = (e << 4 | e >>> 28) + t << 0, i += (a ^ e) + r[0] - 358537222, i = (i << 11 | i >>> 21) + e << 0, o = i ^ e, n += (o ^ t) + r[3] - 722521979, n = (n << 16 | n >>> 16) + i << 0, t += (o ^ n) + r[6] + 76029189, t = (t << 23 | t >>> 9) + n << 0, a = t ^ n, e += (a ^ i) + r[9] - 640364487, e = (e << 4 | e >>> 28) + t << 0, i += (a ^ e) + r[12] - 421815835, i = (i << 11 | i >>> 21) + e << 0, o = i ^ e, n += (o ^ t) + r[15] + 530742520, n = (n << 16 | n >>> 16) + i << 0, t += (o ^ n) + r[2] - 995338651, t = (t << 23 | t >>> 9) + n << 0, e += (n ^ (t | ~i)) + r[0] - 198630844, e = (e << 6 | e >>> 26) + t << 0, i += (t ^ (e | ~n)) + r[7] + 1126891415, i = (i << 10 | i >>> 22) + e << 0, n += (e ^ (i | ~t)) + r[14] - 1416354905, n = (n << 15 | n >>> 17) + i << 0, t += (i ^ (n | ~e)) + r[5] - 57434055, t = (t << 21 | t >>> 11) + n << 0, e += (n ^ (t | ~i)) + r[12] + 1700485571, e = (e << 6 | e >>> 26) + t << 0, i += (t ^ (e | ~n)) + r[3] - 1894986606, i = (i << 10 | i >>> 22) + e << 0, n += (e ^ (i | ~t)) + r[10] - 1051523, n = (n << 15 | n >>> 17) + i << 0, t += (i ^ (n | ~e)) + r[1] - 2054922799, t = (t << 21 | t >>> 11) + n << 0, e += (n ^ (t | ~i)) + r[8] + 1873313359, e = (e << 6 | e >>> 26) + t << 0, i += (t ^ (e | ~n)) + r[15] - 30611744, i = (i << 10 | i >>> 22) + e << 0, n += (e ^ (i | ~t)) + r[6] - 1560198380, n = (n << 15 | n >>> 17) + i << 0, t += (i ^ (n | ~e)) + r[13] + 1309151649, t = (t << 21 | t >>> 11) + n << 0, e += (n ^ (t | ~i)) + r[4] - 145523070, e = (e << 6 | e >>> 26) + t << 0, i += (t ^ (e | ~n)) + r[11] - 1120210379, i = (i << 10 | i >>> 22) + e << 0, n += (e ^ (i | ~t)) + r[2] + 718787259, n = (n << 15 | n >>> 17) + i << 0, t += (i ^ (n | ~e)) + r[9] - 343485551, t = (t << 21 | t >>> 11) + n << 0, this.first ? (this.h0 = e + 1732584193 << 0, this.h1 = t - 271733879 << 0, this.h2 = n - 1732584194 << 0, this.h3 = i + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + e << 0, this.h1 = this.h1 + t << 0, this.h2 = this.h2 + n << 0, this.h3 = this.h3 + i << 0);}, Md5.prototype.hex = function () {this.finalize();var e = this.h0,t = this.h1,n = this.h2,i = this.h3;return HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15];}, Md5.prototype.toString = Md5.prototype.hex, Md5.prototype.digest = function () {this.finalize();var e = this.h0,t = this.h1,n = this.h2,i = this.h3;return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255, 255 & i, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255];}, Md5.prototype.array = Md5.prototype.digest, Md5.prototype.arrayBuffer = function () {this.finalize();var e = new ArrayBuffer(16),t = new Uint32Array(e);return t[0] = this.h0, t[1] = this.h1, t[2] = this.h2, t[3] = this.h3, e;}, Md5.prototype.buffer = Md5.prototype.arrayBuffer, Md5.prototype.base64 = function () {for (var e, t, n, i = "", a = this.array(), o = 0; o < 15;) {e = a[o++], t = a[o++], n = a[o++], i += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[63 & (e << 4 | t >>> 4)] + BASE64_ENCODE_CHAR[63 & (t << 2 | n >>> 6)] + BASE64_ENCODE_CHAR[63 & n];}return e = a[o], i += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[e << 4 & 63] + "==";};var exports = createMethod();COMMON_JS ? module.exports = exports : (root.md5 = exports, AMD && void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function () {return exports;}.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}();}).call(exports, __webpack_require__(9), __webpack_require__(1));}, function (e, t) {function n() {throw new Error("setTimeout has not been defined");}function i() {throw new Error("clearTimeout has not been defined");}function a(e) {if (p === setTimeout) return setTimeout(e, 0);if ((p === n || !p) && setTimeout) return p = setTimeout, setTimeout(e, 0);try {return p(e, 0);} catch (t) {try {return p.call(null, e, 0);} catch (t) {return p.call(this, e, 0);}}}function o(e) {if (u === clearTimeout) return clearTimeout(e);if ((u === i || !u) && clearTimeout) return u = clearTimeout, clearTimeout(e);try {return u(e);} catch (t) {try {return u.call(null, e);} catch (t) {return u.call(this, e);}}}function r() {h && m && (h = !1, m.length ? f = m.concat(f) : g = -1, f.length && s());}function s() {if (!h) {var e = a(r);h = !0;for (var t = f.length; t;) {for (m = f, f = []; ++g < t;) {m && m[g].run();}g = -1, t = f.length;}m = null, h = !1, o(e);}}function c(e, t) {this.fun = e, this.array = t;}function l() {}var p,u,d = e.exports = {};!function () {try {p = "function" == typeof setTimeout ? setTimeout : n;} catch (e) {p = n;}try {u = "function" == typeof clearTimeout ? clearTimeout : i;} catch (e) {u = i;}}();var m,f = [],h = !1,g = -1;d.nextTick = function (e) {var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {t[n - 1] = arguments[n];}f.push(new c(e, t)), 1 !== f.length || h || a(s);}, c.prototype.run = function () {this.fun.apply(null, this.array);}, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = l, d.addListener = l, d.once = l, d.off = l, d.removeListener = l, d.removeAllListeners = l, d.emit = l, d.prependListener = l, d.prependOnceListener = l, d.listeners = function (e) {return [];}, d.binding = function (e) {throw new Error("process.binding is not supported");}, d.cwd = function () {return "/";}, d.chdir = function (e) {throw new Error("process.chdir is not supported");}, d.umask = function () {return 0;};}, function (e, t) {(function (t) {e.exports = t;}).call(t, {});}, function (e, t) {var n = n || function (e, t) {var n = {},i = n.lib = {},a = function a() {},o = i.Base = { extend: function extend(e) {a.prototype = this;var t = new a();return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },r = i.WordArray = o.extend({ init: function init(e, t) {e = this.words = e || [], this.sigBytes = void 0 != t ? t : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,i = this.sigBytes;if (e = e.sigBytes, this.clamp(), i % 4) for (var a = 0; a < e; a++) {t[i + a >>> 2] |= (n[a >>> 2] >>> 24 - a % 4 * 8 & 255) << 24 - (i + a) % 4 * 8;} else if (65535 < n.length) for (a = 0; a < e; a += 4) {t[i + a >>> 2] = n[a >>> 2];} else t.push.apply(t, n);return this.sigBytes += e, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n = [], i = 0; i < t; i += 4) {n.push(4294967296 * e.random() | 0);}return new r.init(n, t);} }),s = n.enc = {},c = s.Hex = { stringify: function stringify(e) {var t = e.words;e = e.sigBytes;for (var n = [], i = 0; i < e; i++) {var a = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;n.push((a >>> 4).toString(16)), n.push((15 & a).toString(16));}return n.join("");}, parse: function parse(e) {for (var t = e.length, n = [], i = 0; i < t; i += 2) {n[i >>> 3] |= parseInt(e.substr(i, 2), 16) << 24 - i % 8 * 4;}return new r.init(n, t / 2);} },l = s.Latin1 = { stringify: function stringify(e) {var t = e.words;e = e.sigBytes;for (var n = [], i = 0; i < e; i++) {n.push(String.fromCharCode(t[i >>> 2] >>> 24 - i % 4 * 8 & 255));}return n.join("");}, parse: function parse(e) {for (var t = e.length, n = [], i = 0; i < t; i++) {n[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;}return new r.init(n, t);} },p = s.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(l.stringify(e)));} catch (e) {throw Error("Malformed UTF-8 data");}}, parse: function parse(e) {return l.parse(unescape(encodeURIComponent(e)));} },u = i.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new r.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = p.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,i = n.words,a = n.sigBytes,o = this.blockSize,s = a / (4 * o),s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0);if (t = s * o, a = e.min(4 * t, a), t) {for (var c = 0; c < t; c += o) {this._doProcessBlock(i, c);}c = i.splice(0, t), n.sigBytes -= a;}return new r.init(c, a);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 });i.Hasher = u.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {u.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new d.HMAC.init(e, n).finalize(t);};} });var d = n.algo = {};return n;}(Math);!function () {var e = n,t = e.lib,i = t.WordArray,a = t.Hasher,o = [],t = e.algo.SHA1 = a.extend({ _doReset: function _doReset() {this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = this._hash.words, i = n[0], a = n[1], r = n[2], s = n[3], c = n[4], l = 0; 80 > l; l++) {if (16 > l) o[l] = 0 | e[t + l];else {var p = o[l - 3] ^ o[l - 8] ^ o[l - 14] ^ o[l - 16];o[l] = p << 1 | p >>> 31;}p = (i << 5 | i >>> 27) + c + o[l], p = 20 > l ? p + (1518500249 + (a & r | ~a & s)) : 40 > l ? p + (1859775393 + (a ^ r ^ s)) : 60 > l ? p + ((a & r | a & s | r & s) - 1894007588) : p + ((a ^ r ^ s) - 899497514), c = s, s = r, r = a << 30 | a >>> 2, a = i, i = p;}n[0] = n[0] + i | 0, n[1] = n[1] + a | 0, n[2] = n[2] + r | 0, n[3] = n[3] + s | 0, n[4] = n[4] + c | 0;}, _doFinalize: function _doFinalize() {var e = this._data,t = e.words,n = 8 * this._nDataBytes,i = 8 * e.sigBytes;return t[i >>> 5] |= 128 << 24 - i % 32, t[14 + (i + 64 >>> 9 << 4)] = Math.floor(n / 4294967296), t[15 + (i + 64 >>> 9 << 4)] = n, e.sigBytes = 4 * t.length, this._process(), this._hash;}, clone: function clone() {var e = a.clone.call(this);return e._hash = this._hash.clone(), e;} });e.SHA1 = a._createHelper(t), e.HmacSHA1 = a._createHmacHelper(t);}(), function () {var e = n,t = e.enc.Utf8;e.algo.HMAC = e.lib.Base.extend({ init: function init(e, n) {e = this._hasher = new e.init(), "string" == typeof n && (n = t.parse(n));var i = e.blockSize,a = 4 * i;n.sigBytes > a && (n = e.finalize(n)), n.clamp();for (var o = this._oKey = n.clone(), r = this._iKey = n.clone(), s = o.words, c = r.words, l = 0; l < i; l++) {s[l] ^= 1549556828, c[l] ^= 909522486;}o.sigBytes = r.sigBytes = a, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher;return e = t.finalize(e), t.reset(), t.finalize(this._oKey.clone().concat(e));} });}(), function () {var e = n,t = e.lib,i = t.WordArray,a = e.enc;a.Base64 = { stringify: function stringify(e) {var t = e.words,n = e.sigBytes,i = this._map;e.clamp();for (var a = [], o = 0; o < n; o += 3) {for (var r = t[o >>> 2] >>> 24 - o % 4 * 8 & 255, s = t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, c = t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, l = r << 16 | s << 8 | c, p = 0; p < 4 && o + .75 * p < n; p++) {a.push(i.charAt(l >>> 6 * (3 - p) & 63));}}var u = i.charAt(64);if (u) for (; a.length % 4;) {a.push(u);}return a.join("");}, parse: function parse(e) {var t = e.length,n = this._map,a = n.charAt(64);if (a) {var o = e.indexOf(a);-1 != o && (t = o);}for (var r = [], s = 0, c = 0; c < t; c++) {if (c % 4) {var l = n.indexOf(e.charAt(c - 1)) << c % 4 * 2,p = n.indexOf(e.charAt(c)) >>> 6 - c % 4 * 2;r[s >>> 2] |= (l | p) << 24 - s % 4 * 8, s++;}}return i.create(r, s);}, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };}(), e.exports = n;}, function (e, t, n) {var i = n(13).DOMParser,a = function a(e) {"use strict";function t(e) {var t = e.localName;return null == t && (t = e.baseName), null != t && "" != t || (t = e.nodeName), t;}function n(e) {return e.prefix;}function a(e) {return "string" == typeof e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") : e;}function o(e, t, n, i) {for (var a = 0; a < e.length; a++) {var o = e[a];if ("string" == typeof o) {if (o == i) break;} else if (o instanceof RegExp) {if (o.test(i)) break;} else if ("function" == typeof o && o(t, n, i)) break;}return a != e.length;}function r(t, n, i) {switch (e.arrayAccessForm) {case "property":t[n] instanceof Array ? t[n + "_asArray"] = t[n] : t[n + "_asArray"] = [t[n]];}!(t[n] instanceof Array) && e.arrayAccessFormPaths.length > 0 && o(e.arrayAccessFormPaths, t, n, i) && (t[n] = [t[n]]);}function s(e) {var t = e.split(/[-T:+Z]/g),n = new Date(t[0], t[1] - 1, t[2]),i = t[5].split(".");if (n.setHours(t[3], t[4], i[0]), i.length > 1 && n.setMilliseconds(i[1]), t[6] && t[7]) {var a = 60 * t[6] + Number(t[7]);a = 0 + ("-" == (/\d\d-\d\d:\d\d$/.test(e) ? "-" : "+") ? -1 * a : a), n.setMinutes(n.getMinutes() - a - n.getTimezoneOffset());} else -1 !== e.indexOf("Z", e.length - 1) && (n = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds())));return n;}function c(t, n, i) {if (e.datetimeAccessFormPaths.length > 0) {var a = i.split(".#")[0];return o(e.datetimeAccessFormPaths, t, n, a) ? s(t) : t;}return t;}function l(t, n, i, a) {return !(n == S.ELEMENT_NODE && e.xmlElementsFilter.length > 0) || o(e.xmlElementsFilter, t, i, a);}function p(i, a) {if (i.nodeType == S.DOCUMENT_NODE) {for (var o = new Object(), s = i.childNodes, u = 0; u < s.length; u++) {var d = s.item(u);if (d.nodeType == S.ELEMENT_NODE) {var m = t(d);o[m] = p(d, m);}}return o;}if (i.nodeType == S.ELEMENT_NODE) {var o = new Object();o.__cnt = 0;for (var s = i.childNodes, u = 0; u < s.length; u++) {var d = s.item(u),m = t(d);if (d.nodeType != S.COMMENT_NODE) {var f = a + "." + m;l(o, d.nodeType, m, f) && (o.__cnt++, null == o[m] ? (o[m] = p(d, f), r(o, m, f)) : (null != o[m] && (o[m] instanceof Array || (o[m] = [o[m]], r(o, m, f))), o[m][o[m].length] = p(d, f)));}}for (var h = 0; h < i.attributes.length; h++) {var g = i.attributes.item(h);o.__cnt++, o[e.attributePrefix + g.name] = g.value;}var v = n(i);return null != v && "" != v && (o.__cnt++, o.__prefix = v), null != o["#text"] && (o.__text = o["#text"], o.__text instanceof Array && (o.__text = o.__text.join("\n")), e.stripWhitespaces && (o.__text = o.__text.trim()), delete o["#text"], "property" == e.arrayAccessForm && delete o["#text_asArray"], o.__text = c(o.__text, m, a + "." + m)), null != o["#cdata-section"] && (o.__cdata = o["#cdata-section"], delete o["#cdata-section"], "property" == e.arrayAccessForm && delete o["#cdata-section_asArray"]), 0 == o.__cnt && "text" == e.emptyNodeForm ? o = "" : 1 == o.__cnt && null != o.__text ? o = o.__text : 1 != o.__cnt || null == o.__cdata || e.keepCData ? o.__cnt > 1 && null != o.__text && e.skipEmptyTextNodesForObj && (e.stripWhitespaces && "" == o.__text || "" == o.__text.trim()) && delete o.__text : o = o.__cdata, delete o.__cnt, !e.enableToStringFunc || null == o.__text && null == o.__cdata || (o.toString = function () {return (null != this.__text ? this.__text : "") + (null != this.__cdata ? this.__cdata : "");}), o;}if (i.nodeType == S.TEXT_NODE || i.nodeType == S.CDATA_SECTION_NODE) return i.nodeValue;}function u(t, n, i, o) {var r = "<" + (null != t && null != t.__prefix ? t.__prefix + ":" : "") + n;if (null != i) for (var s = 0; s < i.length; s++) {var c = i[s],l = t[c];e.escapeMode && (l = a(l)), r += " " + c.substr(e.attributePrefix.length) + "=", e.useDoubleQuotes ? r += '"' + l + '"' : r += "'" + l + "'";}return r += o ? "/>" : ">";}function d(e, t) {return "</" + (null != e.__prefix ? e.__prefix + ":" : "") + t + ">";}function m(e, t) {return -1 !== e.indexOf(t, e.length - t.length);}function f(t, n) {return !!("property" == e.arrayAccessForm && m(n.toString(), "_asArray") || 0 == n.toString().indexOf(e.attributePrefix) || 0 == n.toString().indexOf("__") || t[n] instanceof Function);}function h(e) {var t = 0;if (e instanceof Object) for (var n in e) {f(e, n) || t++;}return t;}function g(t, n, i) {return 0 == e.jsonPropertiesFilter.length || "" == i || o(e.jsonPropertiesFilter, t, n, i);}function v(t) {var n = [];if (t instanceof Object) for (var i in t) {-1 == i.toString().indexOf("__") && 0 == i.toString().indexOf(e.attributePrefix) && n.push(i);}return n;}function x(t) {var n = "";return null != t.__cdata && (n += "<![CDATA[" + t.__cdata + "]]>"), null != t.__text && (e.escapeMode ? n += a(t.__text) : n += t.__text), n;}function y(t) {var n = "";return t instanceof Object ? n += x(t) : null != t && (e.escapeMode ? n += a(t) : n += t), n;}function C(e, t) {return "" === e ? t : e + "." + t;}function k(e, t, n, i) {var a = "";if (0 == e.length) a += u(e, t, n, !0);else for (var o = 0; o < e.length; o++) {a += u(e[o], t, v(e[o]), !1), a += b(e[o], C(i, t)), a += d(e[o], t);}return a;}function b(e, t) {var n = "";if (h(e) > 0) for (var i in e) {if (!f(e, i) && ("" == t || g(e, i, C(t, i)))) {var a = e[i],o = v(a);if (null == a || void 0 == a) n += u(a, i, o, !0);else if (a instanceof Object) {if (a instanceof Array) n += k(a, i, o, t);else if (a instanceof Date) n += u(a, i, o, !1), n += a.toISOString(), n += d(a, i);else {var r = h(a);r > 0 || null != a.__text || null != a.__cdata ? (n += u(a, i, o, !1), n += b(a, C(t, i)), n += d(a, i)) : n += u(a, i, o, !0);}} else n += u(a, i, o, !1), n += y(a), n += d(a, i);}}return n += y(e);}e = e || {}, function () {void 0 === e.escapeMode && (e.escapeMode = !0), e.attributePrefix = e.attributePrefix || "_", e.arrayAccessForm = e.arrayAccessForm || "none", e.emptyNodeForm = e.emptyNodeForm || "text", void 0 === e.enableToStringFunc && (e.enableToStringFunc = !0), e.arrayAccessFormPaths = e.arrayAccessFormPaths || [], void 0 === e.skipEmptyTextNodesForObj && (e.skipEmptyTextNodesForObj = !0), void 0 === e.stripWhitespaces && (e.stripWhitespaces = !0), e.datetimeAccessFormPaths = e.datetimeAccessFormPaths || [], void 0 === e.useDoubleQuotes && (e.useDoubleQuotes = !1), e.xmlElementsFilter = e.xmlElementsFilter || [], e.jsonPropertiesFilter = e.jsonPropertiesFilter || [], void 0 === e.keepCData && (e.keepCData = !1);}();var S = { ELEMENT_NODE: 1, TEXT_NODE: 3, CDATA_SECTION_NODE: 4, COMMENT_NODE: 8, DOCUMENT_NODE: 9 };this.parseXmlString = function (e) {if (void 0 === e) return null;var t;if (i) {var n = new i(),a = null;try {a = n.parseFromString("INVALID", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;} catch (e) {a = null;}try {t = n.parseFromString(e, "text/xml"), null != a && t.getElementsByTagNameNS(a, "parsererror").length > 0 && (t = null);} catch (e) {t = null;}} else 0 == e.indexOf("<?") && (e = e.substr(e.indexOf("?>") + 2)), t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e);return t;}, this.asArray = function (e) {return void 0 === e || null == e ? [] : e instanceof Array ? e : [e];}, this.toXmlDateTime = function (e) {return e instanceof Date ? e.toISOString() : "number" == typeof e ? new Date(e).toISOString() : null;}, this.asDateTime = function (e) {return "string" == typeof e ? s(e) : e;}, this.xml2json = function (e) {return p(e);}, this.xml_str2json = function (e) {var t = this.parseXmlString(e);return null != t ? this.xml2json(t) : null;}, this.json2xml_str = function (e) {return b(e, "");}, this.json2xml = function (e) {var t = this.json2xml_str(e);return this.parseXmlString(t);}, this.getVersion = function () {return "1.2.0";};},o = function o(e) {if (!e) return null;var t = new i(),n = t.parseFromString(e, "text/xml"),o = new a(),r = o.xml2json(n);return r.html && r.getElementsByTagName("parsererror").length ? null : r;};e.exports = o;}, function (e, t, n) {function i(e) {this.options = e || { locator: {} };}function a(e, t, n) {function i(t) {var i = e[t];!i && r && (i = 2 == e.length ? function (n) {e(t, n);} : e), a[t] = i && function (e) {i("[xmldom " + t + "]\t" + e + s(n));} || function () {};}if (!e) {if (t instanceof o) return t;e = t;}var a = {},r = e instanceof Function;return n = n || {}, i("warning"), i("error"), i("fatalError"), a;}function o() {this.cdata = !1;}function r(e, t) {t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;}function s(e) {if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";}function c(e, t, n) {return "string" == typeof e ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;}function l(e, t) {e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);}i.prototype.parseFromString = function (e, t) {var n = this.options,i = new p(),r = n.domBuilder || new o(),s = n.errorHandler,c = n.locator,l = n.xmlns || {},u = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" };return c && r.setDocumentLocator(c), i.errorHandler = a(s, r, c), i.domBuilder = n.domBuilder || r, /\/x?html?$/.test(t) && (u.nbsp = "\xa0", u.copy = "\xa9", l[""] = "http://www.w3.org/1999/xhtml"), l.xml = l.xml || "http://www.w3.org/XML/1998/namespace", e ? i.parse(e, l, u) : i.errorHandler.error("invalid doc source"), r.doc;}, o.prototype = { startDocument: function startDocument() {this.doc = new u().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);}, startElement: function startElement(e, t, n, i) {var a = this.doc,o = a.createElementNS(e, n || t),s = i.length;l(this, o), this.currentElement = o, this.locator && r(this.locator, o);for (var c = 0; c < s; c++) {var e = i.getURI(c),p = i.getValue(c),n = i.getQName(c),u = a.createAttributeNS(e, n);this.locator && r(i.getLocator(c), u), u.value = u.nodeValue = p, o.setAttributeNode(u);}}, endElement: function endElement(e, t, n) {var i = this.currentElement;i.tagName;this.currentElement = i.parentNode;}, startPrefixMapping: function startPrefixMapping(e, t) {}, endPrefixMapping: function endPrefixMapping(e) {}, processingInstruction: function processingInstruction(e, t) {var n = this.doc.createProcessingInstruction(e, t);this.locator && r(this.locator, n), l(this, n);}, ignorableWhitespace: function ignorableWhitespace(e, t, n) {}, characters: function characters(e, t, n) {if (e = c.apply(this, arguments)) {if (this.cdata) var i = this.doc.createCDATASection(e);else var i = this.doc.createTextNode(e);this.currentElement ? this.currentElement.appendChild(i) : /^\s*$/.test(e) && this.doc.appendChild(i), this.locator && r(this.locator, i);}}, skippedEntity: function skippedEntity(e) {}, endDocument: function endDocument() {this.doc.normalize();}, setDocumentLocator: function setDocumentLocator(e) {(this.locator = e) && (e.lineNumber = 0);}, comment: function comment(e, t, n) {e = c.apply(this, arguments);var i = this.doc.createComment(e);this.locator && r(this.locator, i), l(this, i);}, startCDATA: function startCDATA() {this.cdata = !0;}, endCDATA: function endCDATA() {this.cdata = !1;}, startDTD: function startDTD(e, t, n) {var i = this.doc.implementation;if (i && i.createDocumentType) {var a = i.createDocumentType(e, t, n);this.locator && r(this.locator, a), l(this, a);}}, warning: function warning(e) {console.warn("[xmldom warning]\t" + e, s(this.locator));}, error: function error(e) {console.error("[xmldom error]\t" + e, s(this.locator));}, fatalError: function fatalError(e) {throw console.error("[xmldom fatalError]\t" + e, s(this.locator)), e;} }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (e) {o.prototype[e] = function () {return null;};});var p = n(14).XMLReader,u = t.DOMImplementation = n(2).DOMImplementation;t.XMLSerializer = n(2).XMLSerializer, t.DOMParser = i;}, function (e, t) {function n() {}function i(e, t, n, i, l) {function m(e) {if (e > 65535) {e -= 65536;var t = 55296 + (e >> 10),n = 56320 + (1023 & e);return String.fromCharCode(t, n);}return String.fromCharCode(e);}function f(e) {var t = e.slice(1, -1);return t in n ? n[t] : "#" === t.charAt(0) ? m(parseInt(t.substr(1).replace("x", "0x"))) : (l.error("entity not found:" + e), e);}function h(t) {if (t > S) {var n = e.substring(S, t).replace(/&#?\w+;/g, f);C && g(S), i.characters(n, 0, t - S), S = t;}}function g(t, n) {for (; t >= x && (n = y.exec(e));) {v = n.index, x = v + n[0].length, C.lineNumber++;}C.columnNumber = t - v + 1;}for (var v = 0, x = 0, y = /.*(?:\r\n?|\n)|.*$/g, C = i.locator, k = [{ currentNSMap: t }], b = {}, S = 0;;) {try {var R = e.indexOf("<", S);if (R < 0) {if (!e.substr(S).match(/^\s*$/)) {var w = i.doc,_ = w.createTextNode(e.substr(S));w.appendChild(_), i.currentElement = _;}return;}switch (R > S && h(R), e.charAt(R + 1)) {case "/":var A = e.indexOf(">", R + 3),T = e.substring(R + 2, A),E = k.pop();A < 0 ? (T = e.substring(R + 2).replace(/[\s<].*/, ""), l.error("end tag name: " + T + " is not complete:" + E.tagName), A = R + 1 + T.length) : T.match(/\s</) && (T = T.replace(/[\s<].*/, ""), l.error("end tag name: " + T + " maybe not complete"), A = R + 1 + T.length);var B = E.localNSMap,O = E.tagName == T;if (O || E.tagName && E.tagName.toLowerCase() == T.toLowerCase()) {if (i.endElement(E.uri, E.localName, T), B) for (var D in B) {i.endPrefixMapping(D);}O || l.fatalError("end tag name: " + T + " is not match the current start tagName:" + E.tagName);} else k.push(E);A++;break;case "?":C && g(R), A = u(e, R, i);break;case "!":C && g(R), A = p(e, R, i, l);break;default:C && g(R);var N = new d(),I = k[k.length - 1].currentNSMap,A = o(e, R, N, I, f, l),P = N.length;if (!N.closed && c(e, A, N.tagName, b) && (N.closed = !0, n.nbsp || l.warning("unclosed xml attribute")), C && P) {for (var j = a(C, {}), M = 0; M < P; M++) {var U = N[M];g(U.offset), U.locator = a(C, {});}i.locator = j, r(N, i, I) && k.push(N), i.locator = C;} else r(N, i, I) && k.push(N);"http://www.w3.org/1999/xhtml" !== N.uri || N.closed ? A++ : A = s(e, A, N.tagName, f, i);}} catch (e) {l.error("element parse error: " + e), A = -1;}A > S ? S = A : h(Math.max(R, S) + 1);}}function a(e, t) {return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;}function o(e, t, n, i, a, o) {for (var r, s, c = ++t, l = x;;) {var p = e.charAt(c);switch (p) {case "=":if (l === y) r = e.slice(t, c), l = k;else {if (l !== C) throw new Error("attribute equal must after attrName");l = k;}break;case "'":case '"':if (l === k || l === y) {if (l === y && (o.warning('attribute value must after "="'), r = e.slice(t, c)), t = c + 1, !((c = e.indexOf(p, t)) > 0)) throw new Error("attribute value no end '" + p + "' match");s = e.slice(t, c).replace(/&#?\w+;/g, a), n.add(r, s, t - 1), l = S;} else {if (l != b) throw new Error('attribute value must after "="');s = e.slice(t, c).replace(/&#?\w+;/g, a), n.add(r, s, t), o.warning('attribute "' + r + '" missed start quot(' + p + ")!!"), t = c + 1, l = S;}break;case "/":switch (l) {case x:n.setTagName(e.slice(t, c));case S:case R:case w:l = w, n.closed = !0;case b:case y:case C:break;default:throw new Error("attribute invalid close char('/')");}break;case "":return o.error("unexpected end of input"), l == x && n.setTagName(e.slice(t, c)), c;case ">":switch (l) {case x:n.setTagName(e.slice(t, c));case S:case R:case w:break;case b:case y:s = e.slice(t, c), "/" === s.slice(-1) && (n.closed = !0, s = s.slice(0, -1));case C:l === C && (s = r), l == b ? (o.warning('attribute "' + s + '" missed quot(")!!'), n.add(r, s.replace(/&#?\w+;/g, a), t)) : ("http://www.w3.org/1999/xhtml" === i[""] && s.match(/^(?:disabled|checked|selected)$/i) || o.warning('attribute "' + s + '" missed value!! "' + s + '" instead!!'), n.add(s, s, t));break;case k:throw new Error("attribute value missed!!");}return c;case "\x80":p = " ";default:if (p <= " ") switch (l) {case x:n.setTagName(e.slice(t, c)), l = R;break;case y:r = e.slice(t, c), l = C;break;case b:var s = e.slice(t, c).replace(/&#?\w+;/g, a);o.warning('attribute "' + s + '" missed quot(")!!'), n.add(r, s, t);case S:l = R;} else switch (l) {case C:n.tagName;"http://www.w3.org/1999/xhtml" === i[""] && r.match(/^(?:disabled|checked|selected)$/i) || o.warning('attribute "' + r + '" missed value!! "' + r + '" instead2!!'), n.add(r, r, t), t = c, l = y;break;case S:o.warning('attribute space is required"' + r + '"!!');case R:l = y, t = c;break;case k:l = b, t = c;break;case w:throw new Error("elements closed character '/' and '>' must be connected to");}}c++;}}function r(e, t, n) {for (var i = e.tagName, a = null, o = e.length; o--;) {var r = e[o],s = r.qName,c = r.value,p = s.indexOf(":");if (p > 0) var u = r.prefix = s.slice(0, p),d = s.slice(p + 1),m = "xmlns" === u && d;else d = s, u = null, m = "xmlns" === s && "";r.localName = d, !1 !== m && (null == a && (a = {}, l(n, n = {})), n[m] = a[m] = c, r.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(m, c));}for (var o = e.length; o--;) {r = e[o];var u = r.prefix;u && ("xml" === u && (r.uri = "http://www.w3.org/XML/1998/namespace"), "xmlns" !== u && (r.uri = n[u || ""]));}var p = i.indexOf(":");p > 0 ? (u = e.prefix = i.slice(0, p), d = e.localName = i.slice(p + 1)) : (u = null, d = e.localName = i);var f = e.uri = n[u || ""];if (t.startElement(f, d, i, e), !e.closed) return e.currentNSMap = n, e.localNSMap = a, !0;if (t.endElement(f, d, i), a) for (u in a) {t.endPrefixMapping(u);}}function s(e, t, n, i, a) {if (/^(?:script|textarea)$/i.test(n)) {var o = e.indexOf("</" + n + ">", t),r = e.substring(t + 1, o);if (/[&<]/.test(r)) return /^script$/i.test(n) ? (a.characters(r, 0, r.length), o) : (r = r.replace(/&#?\w+;/g, i), a.characters(r, 0, r.length), o);}return t + 1;}function c(e, t, n, i) {var a = i[n];return null == a && (a = e.lastIndexOf("</" + n + ">"), a < t && (a = e.lastIndexOf("</" + n)), i[n] = a), a < t;}function l(e, t) {for (var n in e) {t[n] = e[n];}}function p(e, t, n, i) {switch (e.charAt(t + 2)) {case "-":if ("-" === e.charAt(t + 3)) {var a = e.indexOf("--\x3e", t + 4);return a > t ? (n.comment(e, t + 4, a - t - 4), a + 3) : (i.error("Unclosed comment"), -1);}return -1;default:if ("CDATA[" == e.substr(t + 3, 6)) {var a = e.indexOf("]]>", t + 9);return n.startCDATA(), n.characters(e, t + 9, a - t - 9), n.endCDATA(), a + 3;}var o = f(e, t),r = o.length;if (r > 1 && /!doctype/i.test(o[0][0])) {var s = o[1][0],c = r > 3 && /^public$/i.test(o[2][0]) && o[3][0],l = r > 4 && o[4][0],p = o[r - 1];return n.startDTD(s, c && c.replace(/^(['"])(.*?)\1$/, "$2"), l && l.replace(/^(['"])(.*?)\1$/, "$2")), n.endDTD(), p.index + p[0].length;}}return -1;}function u(e, t, n) {var i = e.indexOf("?>", t);if (i) {var a = e.substring(t, i).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);if (a) {a[0].length;return n.processingInstruction(a[1], a[2]), i + 2;}return -1;}return -1;}function d(e) {}function m(e, t) {return e.__proto__ = t, e;}function f(e, t) {var n,i = [],a = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;for (a.lastIndex = t, a.exec(e); n = a.exec(e);) {if (i.push(n), n[1]) return i;}}var h = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,g = new RegExp("[\\-\\.0-9" + h.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),v = new RegExp("^" + h.source + g.source + "*(?::" + h.source + g.source + "*)?$"),x = 0,y = 1,C = 2,k = 3,b = 4,S = 5,R = 6,w = 7;n.prototype = { parse: function parse(e, t, n) {var a = this.domBuilder;a.startDocument(), l(t, t = {}), i(e, t, n, a, this.errorHandler), a.endDocument();} }, d.prototype = { setTagName: function setTagName(e) {if (!v.test(e)) throw new Error("invalid tagName:" + e);this.tagName = e;}, add: function add(e, t, n) {if (!v.test(e)) throw new Error("invalid attribute:" + e);this[this.length++] = { qName: e, value: t, offset: n };}, length: 0, getLocalName: function getLocalName(e) {return this[e].localName;}, getLocator: function getLocator(e) {return this[e].locator;}, getQName: function getQName(e) {return this[e].qName;}, getURI: function getURI(e) {return this[e].uri;}, getValue: function getValue(e) {return this[e].value;} }, m({}, m.prototype) instanceof m || (m = function m(e, t) {function n() {}n.prototype = t, n = new n();for (t in e) {n[t] = e[t];}return n;}), t.XMLReader = n;}, function (e, t) {function n(e) {return ("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(a, "");}var i = new RegExp("^([^a-zA-Z_\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FFF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD])|^((x|X)(m|M)(l|L))|([^a-zA-Z_\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FFF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD-.0-9\xB7\u0300-\u036F\u203F\u2040])", "g"),a = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,o = function o(e) {var t = [];if (e instanceof Object) for (var n in e) {e.hasOwnProperty(n) && t.push(n);}return t;},r = function r(e, t) {var a = function a(e, n, _a, o, r) {var s = void 0 !== t.indent ? t.indent : "\t",c = t.prettyPrint ? "\n" + new Array(o).join(s) : "";t.removeIllegalNameCharacters && (e = e.replace(i, "_"));var l = [c, "<", e, _a || ""];return n && n.length > 0 ? (l.push(">"), l.push(n), r && l.push(c), l.push("</"), l.push(e), l.push(">")) : l.push("/>"), l.join("");};return function e(i, r, s) {var c = typeof i;switch ((Array.isArray ? Array.isArray(i) : i instanceof Array) ? c = "array" : i instanceof Date && (c = "date"), c) {case "array":var l = [];return i.map(function (t) {l.push(e(t, 1, s + 1));}), t.prettyPrint && l.push("\n"), l.join("");case "date":return i.toJSON ? i.toJSON() : i + "";case "object":var p = [];for (var u in i) {if (i.hasOwnProperty(u)) if (i[u] instanceof Array) for (var d in i[u]) {i[u].hasOwnProperty(d) && p.push(a(u, e(i[u][d], 0, s + 1), null, s + 1, o(i[u][d]).length));} else p.push(a(u, e(i[u], 0, s + 1), null, s + 1));}return t.prettyPrint && p.length > 0 && p.push("\n"), p.join("");case "function":return i();default:return t.escape ? n(i) : "" + i;}}(e, 0, 0);},s = function s(e) {var t = ['<?xml version="1.0" encoding="UTF-8"'];return e && t.push(' standalone="yes"'), t.push("?>"), t.join("");},c = function c(e, t) {if (t || (t = { xmlHeader: { standalone: !0 }, prettyPrint: !0, indent: "  " }), "string" == typeof e) try {e = JSON.parse(e.toString());} catch (e) {return !1;}var n = "",i = "";return t && ("object" == typeof t ? (t.xmlHeader && (n = s(!!t.xmlHeader.standalone)), void 0 !== t.docType && (i = "<!DOCTYPE " + t.docType + ">")) : n = s()), t = t || {}, [n, t.prettyPrint && i ? "\n" : "", i, r(e, t)].join("").replace(/\n{2,}/g, "\n").replace(/\s+$/g, "");};e.exports = c;}, function (e, t, n) {var i = n(5),a = n(0),o = {},r = function r(e, t) {o[t] = e[t], e[t] = function (e, n) {e.SkipTask ? o[t].call(this, e, n) : this._addTask(t, e, n);};},s = function s(e) {var t = [],n = {},r = 0,s = 0,c = function c(e) {var t = { id: e.id, Bucket: e.Bucket, Region: e.Region, Key: e.Key, FilePath: e.FilePath, state: e.state, loaded: e.loaded, size: e.size, speed: e.speed, percent: e.percent, hashPercent: e.hashPercent, error: e.error };return e.FilePath && (t.FilePath = e.FilePath), t;},l = function () {var n,i = function i() {n = 0, e.emit("task-list-update", { list: a.map(t, c) }), e.emit("list-update", { list: a.map(t, c) });};return function () {n || (n = setTimeout(i));};}(),p = function p() {if (!(t.length <= e.options.UploadQueueSize)) {for (var i = 0; i < s && i < t.length && t.length > e.options.UploadQueueSize;) {var a = "waiting" === t[i].state || "checking" === t[i].state || "uploading" === t[i].state;t[i] && a ? i++ : (n[t[i].id] && delete n[t[i].id], t.splice(i, 1), s--);}l();}},u = function u() {if (!(r >= e.options.FileParallelLimit)) {for (; t[s] && "waiting" !== t[s].state;) {s++;}if (!(s >= t.length)) {var n = t[s];s++, r++, n.state = "checking", n.params.onTaskStart && n.params.onTaskStart(c(n)), !n.params.UploadData && (n.params.UploadData = {});var i = a.formatParams(n.api, n.params);o[n.api].call(e, i, function (t, i) {e._isRunningTask(n.id) && ("checking" !== n.state && "uploading" !== n.state || (n.state = t ? "error" : "success", t && (n.error = t), r--, l(), u(), n.callback && n.callback(t, i), "success" === n.state && (n.params && (delete n.params.UploadData, delete n.params.Body, delete n.params), delete n.callback)), p());}), l(), setTimeout(u);}}},d = function d(t, a) {var o = n[t];if (o) {var s = o && "waiting" === o.state,c = o && ("checking" === o.state || "uploading" === o.state);if ("canceled" === a && "canceled" !== o.state || "paused" === a && s || "paused" === a && c) {if ("paused" === a && o.params.Body && "function" == typeof o.params.Body.pipe) return void console.error("stream not support pause");o.state = a, e.emit("inner-kill-task", { TaskId: t, toState: a });try {var d = o && o.params && o.params.UploadData.UploadId;} catch (e) {}"canceled" === a && d && i.removeUsing(d), l(), c && (r--, u()), "canceled" === a && (o.params && (delete o.params.UploadData, delete o.params.Body, delete o.params), delete o.callback);}p();}};e._addTasks = function (t) {a.each(t, function (t) {e._addTask(t.api, t.params, t.callback, !0);}), l();}, e._addTask = function (i, o, r, s) {"sliceUploadFile" !== i || a.canFileSlice() || (i = "postObject"), o = a.formatParams(i, o);var c = a.uuid();o.TaskId = c, o.onTaskReady && o.onTaskReady(c);var d = { params: o, callback: r, api: i, index: t.length, id: c, Bucket: o.Bucket, Region: o.Region, Key: o.Key, FilePath: o.FilePath || "", state: "waiting", loaded: 0, size: 0, speed: 0, percent: 0, hashPercent: 0, error: null },m = o.onHashProgress;o.onHashProgress = function (t) {e._isRunningTask(d.id) && (d.hashPercent = t.percent, m && m(t), l());};var f = o.onProgress;return o.onProgress = function (t) {e._isRunningTask(d.id) && ("checking" === d.state && (d.state = "uploading"), d.loaded = t.loaded, d.size = t.total, d.speed = t.speed, d.percent = t.percent, f && f(t), l());}, a.getFileSize(i, o, function (e, i) {if (e) return void r(e);n[c] = d, t.push(d), d.size = i, !s && l(), u(), p();}), c;}, e._isRunningTask = function (e) {var t = n[e];return !(!t || "checking" !== t.state && "uploading" !== t.state);}, e.getTaskList = function () {return a.map(t, c);}, e.cancelTask = function (e) {d(e, "canceled");}, e.pauseTask = function (e) {d(e, "paused");}, e.restartTask = function (e) {var t = n[e];!t || "paused" !== t.state && "error" !== t.state || (t.state = "waiting", l(), s = Math.min(s, t.index), u());}, e.isUploadRunning = function () {return r || s < t.length;};};e.exports.transferToTaskMethod = r, e.exports.init = s;}, function (e, t, n) {"use strict";function i(e, t) {"function" == typeof e && (t = e, e = {});var n = this.options.ServiceDomain,i = e.Region;n ? (n = n.replace(/\{\{Region\}\}/gi, i || "").replace(/\{\{.*?\}\}/gi, ""), /^[a-zA-Z]+:\/\//.test(n) || (n = "https://" + n), "/" === n.slice(-1) && (n = n.slice(0, -1))) : n = i ? "https://cos." + i + ".myqcloud.com" : "https://service.cos.myqcloud.com", be.call(this, { Action: "name/cos:GetService", url: n, method: "GET", headers: e.Headers }, function (e, n) {if (e) return t(e);var i = n && n.ListAllMyBucketsResult && n.ListAllMyBucketsResult.Buckets && n.ListAllMyBucketsResult.Buckets.Bucket || [];i = _e.isArray(i) ? i : [i];var a = n && n.ListAllMyBucketsResult && n.ListAllMyBucketsResult.Owner || {};t(null, { Buckets: i, Owner: a, statusCode: n.statusCode, headers: n.headers });});}function a(e, t) {var n = this,i = "";if (e.BucketAZConfig) {var a = { BucketAZConfig: e.BucketAZConfig };i = _e.json2xml({ CreateBucketConfiguration: a });}be.call(this, { Action: "name/cos:PutBucket", method: "PUT", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, body: i }, function (i, a) {if (i) return t(i);var o = ye({ protocol: n.options.Protocol, domain: n.options.Domain, bucket: e.Bucket, region: e.Region, isLocation: !0 });t(null, { Location: o, statusCode: a.statusCode, headers: a.headers });});}function o(e, t) {be.call(this, { Action: "name/cos:HeadBucket", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, method: "HEAD" }, function (e, n) {t(e, n);});}function r(e, t) {var n = {};n.prefix = e.Prefix || "", n.delimiter = e.Delimiter, n.marker = e.Marker, n["max-keys"] = e.MaxKeys, n["encoding-type"] = e.EncodingType, be.call(this, { Action: "name/cos:GetBucket", ResourceKey: n.prefix, method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, qs: n }, function (e, n) {if (e) return t(e);var i = n.ListBucketResult || {},a = i.Contents || [],o = i.CommonPrefixes || [];a = _e.isArray(a) ? a : [a], o = _e.isArray(o) ? o : [o];var r = _e.clone(i);_e.extend(r, { Contents: a, CommonPrefixes: o, statusCode: n.statusCode, headers: n.headers }), t(null, r);});}function s(e, t) {be.call(this, { Action: "name/cos:DeleteBucket", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, method: "DELETE" }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function c(e, t) {var n = e.Headers,i = "";if (e.AccessControlPolicy) {var a = _e.clone(e.AccessControlPolicy || {}),o = a.Grants || a.Grant;o = _e.isArray(o) ? o : [o], delete a.Grant, delete a.Grants, a.AccessControlList = { Grant: o }, i = _e.json2xml({ AccessControlPolicy: a }), n["Content-Type"] = "application/xml", n["Content-MD5"] = _e.binaryBase64(_e.md5(i));}_e.each(n, function (e, t) {0 === t.indexOf("x-cos-grant-") && (n[t] = xe(n[t]));}), be.call(this, { Action: "name/cos:PutBucketACL", method: "PUT", Bucket: e.Bucket, Region: e.Region, headers: n, action: "acl", body: i }, function (e, n) {if (e) return t(e);t(null, { statusCode: n.statusCode, headers: n.headers });});}function l(e, t) {be.call(this, { Action: "name/cos:GetBucketACL", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "acl" }, function (e, n) {if (e) return t(e);var i = n.AccessControlPolicy || {},a = i.Owner || {},o = i.AccessControlList.Grant || [];o = _e.isArray(o) ? o : [o];var r = ve(i);n.headers && n.headers["x-cos-acl"] && (r.ACL = n.headers["x-cos-acl"]), r = _e.extend(r, { Owner: a, Grants: o, statusCode: n.statusCode, headers: n.headers }), t(null, r);});}function p(e, t) {var n = e.CORSConfiguration || {},i = n.CORSRules || e.CORSRules || [];i = _e.clone(_e.isArray(i) ? i : [i]), _e.each(i, function (e) {_e.each(["AllowedOrigin", "AllowedHeader", "AllowedMethod", "ExposeHeader"], function (t) {var n = t + "s",i = e[n] || e[t] || [];delete e[n], e[t] = _e.isArray(i) ? i : [i];});});var a = _e.json2xml({ CORSConfiguration: { CORSRule: i } }),o = e.Headers;o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, { Action: "name/cos:PutBucketCORS", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: a, action: "cors", headers: o }, function (e, n) {if (e) return t(e);t(null, { statusCode: n.statusCode, headers: n.headers });});}function u(e, t) {be.call(this, { Action: "name/cos:GetBucketCORS", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "cors" }, function (e, n) {if (e) {if (404 === e.statusCode && e.error && "NoSuchCORSConfiguration" === e.error.Code) {var i = { CORSRules: [], statusCode: e.statusCode };e.headers && (i.headers = e.headers), t(null, i);} else t(e);} else {var a = n.CORSConfiguration || {},o = a.CORSRules || a.CORSRule || [];o = _e.clone(_e.isArray(o) ? o : [o]), _e.each(o, function (e) {_e.each(["AllowedOrigin", "AllowedHeader", "AllowedMethod", "ExposeHeader"], function (t) {var n = t + "s",i = e[n] || e[t] || [];delete e[t], e[n] = _e.isArray(i) ? i : [i];});}), t(null, { CORSRules: o, statusCode: n.statusCode, headers: n.headers });}});}function d(e, t) {be.call(this, { Action: "name/cos:DeleteBucketCORS", method: "DELETE", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "cors" }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode || e.statusCode, headers: n.headers });});}function m(e, t) {be.call(this, { Action: "name/cos:GetBucketLocation", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "location" }, function (e, n) {if (e) return t(e);t(null, n);});}function f(e, t) {var n = e.Policy,i = n;try {"string" == typeof n ? n = JSON.parse(i) : i = JSON.stringify(n);} catch (e) {t({ error: "Policy format error" });}var a = e.Headers;a["Content-Type"] = "application/json", a["Content-MD5"] = _e.binaryBase64(_e.md5(i)), be.call(this, { Action: "name/cos:PutBucketPolicy", method: "PUT", Bucket: e.Bucket, Region: e.Region, action: "policy", body: i, headers: a, json: !0 }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function h(e, t) {be.call(this, { Action: "name/cos:GetBucketPolicy", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "policy", rawBody: !0 }, function (e, n) {if (e) return t(e.statusCode && 403 === e.statusCode ? { ErrorStatus: "Access Denied" } : e.statusCode && 405 === e.statusCode ? { ErrorStatus: "Method Not Allowed" } : e.statusCode && 404 === e.statusCode ? { ErrorStatus: "Policy Not Found" } : e);var i = {};try {i = JSON.parse(n.body);} catch (e) {}t(null, { Policy: i, statusCode: n.statusCode, headers: n.headers });});}function g(e, t) {be.call(this, { Action: "name/cos:DeleteBucketPolicy", method: "DELETE", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "policy" }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode || e.statusCode, headers: n.headers });});}function v(e, t) {var n = e.Tagging || {},i = n.TagSet || n.Tags || e.Tags || [];i = _e.clone(_e.isArray(i) ? i : [i]);var a = _e.json2xml({ Tagging: { TagSet: { Tag: i } } }),o = e.Headers;o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, { Action: "name/cos:PutBucketTagging", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: a, action: "tagging", headers: o }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function x(e, t) {be.call(this, { Action: "name/cos:GetBucketTagging", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "tagging" }, function (e, n) {if (e) {if (404 !== e.statusCode || !e.error || "Not Found" !== e.error && "NoSuchTagSet" !== e.error.Code) t(e);else {var i = { Tags: [], statusCode: e.statusCode };e.headers && (i.headers = e.headers), t(null, i);}} else {var a = [];try {a = n.Tagging.TagSet.Tag || [];} catch (e) {}a = _e.clone(_e.isArray(a) ? a : [a]), t(null, { Tags: a, statusCode: n.statusCode, headers: n.headers });}});}function y(e, t) {be.call(this, { Action: "name/cos:DeleteBucketTagging", method: "DELETE", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "tagging" }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function C(e, t) {var n = e.LifecycleConfiguration || {},i = n.Rules || e.Rules || [];i = _e.clone(i);var a = _e.json2xml({ LifecycleConfiguration: { Rule: i } }),o = e.Headers;o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, { Action: "name/cos:PutBucketLifecycle", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: a, action: "lifecycle", headers: o }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function k(e, t) {be.call(this, { Action: "name/cos:GetBucketLifecycle", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "lifecycle" }, function (e, n) {if (e) {if (404 === e.statusCode && e.error && "NoSuchLifecycleConfiguration" === e.error.Code) {var i = { Rules: [], statusCode: e.statusCode };e.headers && (i.headers = e.headers), t(null, i);} else t(e);} else {var a = [];try {a = n.LifecycleConfiguration.Rule || [];} catch (e) {}a = _e.clone(_e.isArray(a) ? a : [a]), t(null, { Rules: a, statusCode: n.statusCode, headers: n.headers });}});}function b(e, t) {be.call(this, { Action: "name/cos:DeleteBucketLifecycle", method: "DELETE", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "lifecycle" }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function S(e, t) {if (!e.VersioningConfiguration) return void t({ error: "missing param VersioningConfiguration" });var n = e.VersioningConfiguration || {},i = _e.json2xml({ VersioningConfiguration: n }),a = e.Headers;a["Content-Type"] = "application/xml", a["Content-MD5"] = _e.binaryBase64(_e.md5(i)), be.call(this, { Action: "name/cos:PutBucketVersioning", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: i, action: "versioning", headers: a }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function R(e, t) {be.call(this, { Action: "name/cos:GetBucketVersioning", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "versioning" }, function (e, n) {e || !n.VersioningConfiguration && (n.VersioningConfiguration = {}), t(e, n);});}function w(e, t) {var n = _e.clone(e.ReplicationConfiguration),i = _e.json2xml({ ReplicationConfiguration: n });i = i.replace(/<(\/?)Rules>/gi, "<$1Rule>"), i = i.replace(/<(\/?)Tags>/gi, "<$1Tag>");var a = e.Headers;a["Content-Type"] = "application/xml", a["Content-MD5"] = _e.binaryBase64(_e.md5(i)), be.call(this, { Action: "name/cos:PutBucketReplication", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: i, action: "replication", headers: a }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function _(e, t) {be.call(this, { Action: "name/cos:GetBucketReplication", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "replication" }, function (e, n) {if (e) {if (404 !== e.statusCode || !e.error || "Not Found" !== e.error && "ReplicationConfigurationnotFoundError" !== e.error.Code) t(e);else {var i = { ReplicationConfiguration: { Rules: [] }, statusCode: e.statusCode };e.headers && (i.headers = e.headers), t(null, i);}} else e || !n.ReplicationConfiguration && (n.ReplicationConfiguration = {}), n.ReplicationConfiguration.Rule && (n.ReplicationConfiguration.Rules = n.ReplicationConfiguration.Rule, delete n.ReplicationConfiguration.Rule), t(e, n);});}function A(e, t) {be.call(this, { Action: "name/cos:DeleteBucketReplication", method: "DELETE", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "replication" }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function T(e, t) {if (!e.WebsiteConfiguration) return void t({ error: "missing param WebsiteConfiguration" });var n = _e.clone(e.WebsiteConfiguration || {}),i = n.RoutingRules || n.RoutingRule || [];i = _e.isArray(i) ? i : [i], delete n.RoutingRule, delete n.RoutingRules, i.length && (n.RoutingRules = { RoutingRule: i });var a = _e.json2xml({ WebsiteConfiguration: n }),o = e.Headers;o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, { Action: "name/cos:PutBucketWebsite", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: a, action: "website", headers: o }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function E(e, t) {be.call(this, { Action: "name/cos:GetBucketWebsite", method: "GET", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: e.Headers, action: "website" }, function (e, n) {if (e) {if (404 === e.statusCode && "NoSuchWebsiteConfiguration" === e.error.Code) {var i = { WebsiteConfiguration: {}, statusCode: e.statusCode };e.headers && (i.headers = e.headers), t(null, i);} else t(e);} else {var a = n.WebsiteConfiguration || {};if (a.RoutingRules) {var o = _e.clone(a.RoutingRules.RoutingRule || []);o = _e.makeArray(o), a.RoutingRules = o;}t(null, { WebsiteConfiguration: a, statusCode: n.statusCode, headers: n.headers });}});}function B(e, t) {be.call(this, { Action: "name/cos:DeleteBucketWebsite", method: "DELETE", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "website" }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function O(e, t) {if (!e.RefererConfiguration) return void t({ error: "missing param RefererConfiguration" });var n = _e.clone(e.RefererConfiguration || {}),i = n.DomainList || {},a = i.Domains || i.Domain || [];a = _e.isArray(a) ? a : [a], a.length && (n.DomainList = { Domain: a });var o = _e.json2xml({ RefererConfiguration: n }),r = e.Headers;r["Content-Type"] = "application/xml", r["Content-MD5"] = _e.binaryBase64(_e.md5(o)), be.call(this, { Action: "name/cos:PutBucketReferer", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: o, action: "referer", headers: r }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function D(e, t) {be.call(this, { Action: "name/cos:GetBucketReferer", method: "GET", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: e.Headers, action: "referer" }, function (e, n) {if (e) {if (404 === e.statusCode && "NoSuchRefererConfiguration" === e.error.Code) {var i = { WebsiteConfiguration: {}, statusCode: e.statusCode };e.headers && (i.headers = e.headers), t(null, i);} else t(e);} else {var a = n.RefererConfiguration || {};if (a.DomainList) {var o = _e.clone(a.DomainList.Domain || []);o = _e.makeArray(o), a.DomainList = { Domains: o };}t(null, { RefererConfiguration: a, statusCode: n.statusCode, headers: n.headers });}});}function N(e, t) {var n = e.DomainConfiguration || {},i = n.DomainRule || e.DomainRule || [];i = _e.clone(i);var a = _e.json2xml({ DomainConfiguration: { DomainRule: i } }),o = e.Headers;o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, { Action: "name/cos:PutBucketDomain", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: a, action: "domain", headers: o }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function I(e, t) {be.call(this, { Action: "name/cos:GetBucketDomain", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "domain" }, function (e, n) {if (e) return t(e);var i = [];try {i = n.DomainConfiguration.DomainRule || [];} catch (e) {}i = _e.clone(_e.isArray(i) ? i : [i]), t(null, { DomainRule: i, statusCode: n.statusCode, headers: n.headers });});}function P(e, t) {be.call(this, { Action: "name/cos:DeleteBucketDomain", method: "DELETE", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "domain" }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function j(e, t) {var n = e.OriginConfiguration || {},i = n.OriginRule || e.OriginRule || [];i = _e.clone(i);var a = _e.json2xml({ OriginConfiguration: { OriginRule: i } }),o = e.Headers;o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, { Action: "name/cos:PutBucketOrigin", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: a, action: "origin", headers: o }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function M(e, t) {be.call(this, { Action: "name/cos:GetBucketOrigin", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "origin" }, function (e, n) {if (e) return t(e);var i = [];try {i = n.OriginConfiguration.OriginRule || [];} catch (e) {}i = _e.clone(_e.isArray(i) ? i : [i]), t(null, { OriginRule: i, statusCode: n.statusCode, headers: n.headers });});}function U(e, t) {be.call(this, { Action: "name/cos:DeleteBucketOrigin", method: "DELETE", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "origin" }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function F(e, t) {var n = _e.json2xml({ BucketLoggingStatus: e.BucketLoggingStatus || "" }),i = e.Headers;i["Content-Type"] = "application/xml", i["Content-MD5"] = _e.binaryBase64(_e.md5(n)), be.call(this, { Action: "name/cos:PutBucketLogging", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: n, action: "logging", headers: i }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function H(e, t) {be.call(this, { Action: "name/cos:GetBucketLogging", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "logging" }, function (e, n) {if (e) return t(e);delete n.BucketLoggingStatus._xmlns, t(null, { BucketLoggingStatus: n.BucketLoggingStatus, statusCode: n.statusCode, headers: n.headers });});}function L(e, t) {var n = _e.clone(e.InventoryConfiguration);if (n.OptionalFields) {var i = n.OptionalFields || [];n.OptionalFields = { Field: i };}if (n.Destination && n.Destination.COSBucketDestination && n.Destination.COSBucketDestination.Encryption) {var a = n.Destination.COSBucketDestination.Encryption;Object.keys(a).indexOf("SSECOS") > -1 && (a["SSE-COS"] = a.SSECOS, delete a.SSECOS);}var o = _e.json2xml({ InventoryConfiguration: n }),r = e.Headers;r["Content-Type"] = "application/xml", r["Content-MD5"] = _e.binaryBase64(_e.md5(o)), be.call(this, { Action: "name/cos:PutBucketInventory", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: o, action: "inventory", qs: { id: e.Id }, headers: r }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function z(e, t) {be.call(this, { Action: "name/cos:GetBucketInventory", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "inventory", qs: { id: e.Id } }, function (e, n) {if (e) return t(e);var i = n.InventoryConfiguration;if (i && i.OptionalFields && i.OptionalFields.Field) {var a = i.OptionalFields.Field;_e.isArray(a) || (a = [a]), i.OptionalFields = a;}if (i.Destination && i.Destination.COSBucketDestination && i.Destination.COSBucketDestination.Encryption) {var o = i.Destination.COSBucketDestination.Encryption;Object.keys(o).indexOf("SSE-COS") > -1 && (o.SSECOS = o["SSE-COS"], delete o["SSE-COS"]);}t(null, { InventoryConfiguration: i, statusCode: n.statusCode, headers: n.headers });});}function K(e, t) {be.call(this, { Action: "name/cos:ListBucketInventory", method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "inventory", qs: { "continuation-token": e.ContinuationToken } }, function (e, n) {if (e) return t(e);var i = n.ListInventoryConfigurationResult,a = i.InventoryConfiguration || [];a = _e.isArray(a) ? a : [a], delete i.InventoryConfiguration, _e.each(a, function (e) {if (e && e.OptionalFields && e.OptionalFields.Field) {var t = e.OptionalFields.Field;_e.isArray(t) || (t = [t]), e.OptionalFields = t;}if (e.Destination && e.Destination.COSBucketDestination && e.Destination.COSBucketDestination.Encryption) {var n = e.Destination.COSBucketDestination.Encryption;Object.keys(n).indexOf("SSE-COS") > -1 && (n.SSECOS = n["SSE-COS"], delete n["SSE-COS"]);}}), i.InventoryConfigurations = a, _e.extend(i, { statusCode: n.statusCode, headers: n.headers }), t(null, i);});}function q(e, t) {be.call(this, { Action: "name/cos:DeleteBucketInventory", method: "DELETE", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "inventory", qs: { id: e.Id } }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function G(e, t) {if (!e.AccelerateConfiguration) return void t({ error: "missing param AccelerateConfiguration" });var n = { AccelerateConfiguration: e.AccelerateConfiguration || {} },i = _e.json2xml(n),a = {};a["Content-Type"] = "application/xml", a["Content-MD5"] = _e.binaryBase64(_e.md5(i)), be.call(this, { Interface: "putBucketAccelerate", Action: "name/cos:PutBucketAccelerate", method: "PUT", Bucket: e.Bucket, Region: e.Region, body: i, action: "accelerate", headers: a }, function (e, n) {if (e) return t(e);t(null, { statusCode: n.statusCode, headers: n.headers });});}function V(e, t) {be.call(this, { Interface: "getBucketAccelerate", Action: "name/cos:GetBucketAccelerate", method: "GET", Bucket: e.Bucket, Region: e.Region, action: "accelerate" }, function (e, n) {e || !n.AccelerateConfiguration && (n.AccelerateConfiguration = {}), t(e, n);});}function X(e, t) {be.call(this, { Action: "name/cos:HeadObject", method: "HEAD", Bucket: e.Bucket, Region: e.Region, Key: e.Key, VersionId: e.VersionId, headers: e.Headers }, function (n, i) {if (n) {var a = n.statusCode;return e.Headers["If-Modified-Since"] && a && 304 === a ? t(null, { NotModified: !0, statusCode: a }) : t(n);}i.ETag = _e.attr(i.headers, "etag", ""), t(null, i);});}function W(e, t) {var n = {};n.prefix = e.Prefix || "", n.delimiter = e.Delimiter, n["key-marker"] = e.KeyMarker, n["version-id-marker"] = e.VersionIdMarker, n["max-keys"] = e.MaxKeys, n["encoding-type"] = e.EncodingType, be.call(this, { Action: "name/cos:GetBucketObjectVersions", ResourceKey: n.prefix, method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, qs: n, action: "versions" }, function (e, n) {if (e) return t(e);var i = n.ListVersionsResult || {},a = i.DeleteMarker || [];a = _e.isArray(a) ? a : [a];var o = i.Version || [];o = _e.isArray(o) ? o : [o];var r = _e.clone(i);delete r.DeleteMarker, delete r.Version, _e.extend(r, { DeleteMarkers: a, Versions: o, statusCode: n.statusCode, headers: n.headers }), t(null, r);});}function $(e, t) {var n = e.Query || {};n["response-content-type"] = e.ResponseContentType, n["response-content-language"] = e.ResponseContentLanguage, n["response-expires"] = e.ResponseExpires, n["response-cache-control"] = e.ResponseCacheControl, n["response-content-disposition"] = e.ResponseContentDisposition, n["response-content-encoding"] = e.ResponseContentEncoding, be.call(this, { Action: "name/cos:GetObject", method: "GET", Bucket: e.Bucket, Region: e.Region, Key: e.Key, VersionId: e.VersionId, headers: e.Headers, qs: n, rawBody: !0 }, function (n, i) {if (n) {var a = n.statusCode;return e.Headers["If-Modified-Since"] && a && 304 === a ? t(null, { NotModified: !0 }) : t(n);}t(null, { Body: i.body, ETag: _e.attr(i.headers, "etag", ""), statusCode: i.statusCode, headers: i.headers });});}function Q(e, t) {var n = this,i = e.ContentLength,a = _e.throttleOnProgress.call(n, i, e.onProgress),o = e.Headers;o["Cache-Control"] || o["cache-control"] || (o["Cache-Control"] = ""), o["Content-Type"] || o["content-type"] || (o["Content-Type"] = Ae.getType(e.Key) || "application/octet-stream"), _e.getBodyMd5(n.options.UploadCheckContentMd5, e.Body, function (r) {r && (o["Content-MD5"] = _e.binaryBase64(r)), void 0 !== e.ContentLength && (o["Content-Length"] = e.ContentLength), a(null, !0), be.call(n, { Action: "name/cos:PutObject", TaskId: e.TaskId, method: "PUT", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: e.Headers, qs: e.Query, body: e.Body, onProgress: a }, function (o, r) {if (o) return a(null, !0), t(o);a({ loaded: i, total: i }, !0);var s = ye({ ForcePathStyle: n.options.ForcePathStyle, protocol: n.options.Protocol, domain: n.options.Domain, bucket: e.Bucket, region: e.Region, object: e.Key });s = s.substr(s.indexOf("://") + 3), r.Location = s, r.ETag = _e.attr(r.headers, "etag", ""), t(null, r);});});}function J(e, t) {var n = this,i = {},a = e.FilePath;if (!a) return void t({ error: "missing param FilePath" });i["Cache-Control"] = e.CacheControl, i["Content-Disposition"] = e.ContentDisposition, i["Content-Encoding"] = e.ContentEncoding, i["Content-MD5"] = e.ContentMD5, i["Content-Length"] = e.ContentLength, i["Content-Type"] = e.ContentType, i.Expect = e.Expect, i.Expires = e.Expires, i["x-cos-acl"] = e.ACL, i["x-cos-grant-read"] = e.GrantRead, i["x-cos-grant-write"] = e.GrantWrite, i["x-cos-grant-full-control"] = e.GrantFullControl, i["x-cos-storage-class"] = e.StorageClass, delete i["Content-Length"], delete i["content-length"];for (var o in e) {o.indexOf("x-cos-meta-") > -1 && (i[o] = e[o]);}var r = _e.throttleOnProgress.call(n, i["Content-Length"], e.onProgress);be.call(this, { Action: "name/cos:PostObject", method: "POST", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: i, qs: e.Query, filePath: a, onProgress: r }, function (i, a) {if (r(null, !0), i) return t(i);if (a && a.headers) {var o = a.headers,s = o.etag || o.Etag || o.ETag || "",c = ye({ ForcePathStyle: n.options.ForcePathStyle, protocol: n.options.Protocol, domain: n.options.Domain, bucket: e.Bucket, region: e.Region, object: e.Key, isLocation: !0 });return t(null, { Location: c, statusCode: a.statusCode, headers: o, ETag: s });}t(null, a);});}function Y(e, t) {be.call(this, { Action: "name/cos:DeleteObject", method: "DELETE", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: e.Headers, VersionId: e.VersionId }, function (e, n) {if (e) {var i = e.statusCode;return i && 204 === i ? t(null, { statusCode: i }) : i && 404 === i ? t(null, { BucketNotFound: !0, statusCode: i }) : t(e);}t(null, { statusCode: n.statusCode, headers: n.headers });});}function Z(e, t) {be.call(this, { Action: "name/cos:GetObjectACL", method: "GET", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: e.Headers, action: "acl" }, function (e, n) {if (e) return t(e);var i = n.AccessControlPolicy || {},a = i.Owner || {},o = i.AccessControlList && i.AccessControlList.Grant || [];o = _e.isArray(o) ? o : [o];var r = ve(i);n.headers && n.headers["x-cos-acl"] && (r.ACL = n.headers["x-cos-acl"]), r = _e.extend(r, { Owner: a, Grants: o, statusCode: n.statusCode, headers: n.headers }), t(null, r);});}function ee(e, t) {var n = e.Headers,i = "";if (e.AccessControlPolicy) {var a = _e.clone(e.AccessControlPolicy || {}),o = a.Grants || a.Grant;o = _e.isArray(o) ? o : [o], delete a.Grant, delete a.Grants, a.AccessControlList = { Grant: o }, i = _e.json2xml({ AccessControlPolicy: a }), n["Content-Type"] = "application/xml", n["Content-MD5"] = _e.binaryBase64(_e.md5(i));}_e.each(n, function (e, t) {0 === t.indexOf("x-cos-grant-") && (n[t] = xe(n[t]));}), be.call(this, { Action: "name/cos:PutObjectACL", method: "PUT", Bucket: e.Bucket, Region: e.Region, Key: e.Key, action: "acl", headers: n, body: i }, function (e, n) {if (e) return t(e);t(null, { statusCode: n.statusCode, headers: n.headers });});}function te(e, t) {var n = e.Headers;n.Origin = e.Origin, n["Access-Control-Request-Method"] = e.AccessControlRequestMethod, n["Access-Control-Request-Headers"] = e.AccessControlRequestHeaders, be.call(this, { Action: "name/cos:OptionsObject", method: "OPTIONS", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: n }, function (e, n) {if (e) return e.statusCode && 403 === e.statusCode ? t(null, { OptionsForbidden: !0, statusCode: e.statusCode }) : t(e);var i = n.headers || {};t(null, { AccessControlAllowOrigin: i["access-control-allow-origin"], AccessControlAllowMethods: i["access-control-allow-methods"], AccessControlAllowHeaders: i["access-control-allow-headers"], AccessControlExposeHeaders: i["access-control-expose-headers"], AccessControlMaxAge: i["access-control-max-age"], statusCode: n.statusCode, headers: n.headers });});}function ne(e, t) {var n = e.Headers;!n["Cache-Control"] && n["cache-control"] && (n["Cache-Control"] = "");var i = e.CopySource || "",a = i.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^\/]+\/(.+)$/);if (!a) return void t({ error: "CopySource format error" });var o = a[1],r = a[3],s = decodeURIComponent(a[4]);be.call(this, { Scope: [{ action: "name/cos:GetObject", bucket: o, region: r, prefix: s }, { action: "name/cos:PutObject", bucket: e.Bucket, region: e.Region, prefix: e.Key }], method: "PUT", Bucket: e.Bucket, Region: e.Region, Key: e.Key, VersionId: e.VersionId, headers: e.Headers }, function (e, n) {if (e) return t(e);var i = _e.clone(n.CopyObjectResult || {});_e.extend(i, { statusCode: n.statusCode, headers: n.headers }), t(null, i);});}function ie(e, t) {var n = e.CopySource || "",i = n.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^\/]+\/(.+)$/);if (!i) return void t({ error: "CopySource format error" });var a = i[1],o = i[3],r = decodeURIComponent(i[4]);be.call(this, { Scope: [{ action: "name/cos:GetObject", bucket: a, region: o, prefix: r }, { action: "name/cos:PutObject", bucket: e.Bucket, region: e.Region, prefix: e.Key }], method: "PUT", Bucket: e.Bucket, Region: e.Region, Key: e.Key, VersionId: e.VersionId, qs: { partNumber: e.PartNumber, uploadId: e.UploadId }, headers: e.Headers }, function (e, n) {if (e) return t(e);var i = _e.clone(n.CopyPartResult || {});_e.extend(i, { statusCode: n.statusCode, headers: n.headers }), t(null, i);});}function ae(e, t) {var n = e.Objects || [],i = e.Quiet;n = _e.isArray(n) ? n : [n];var a = _e.json2xml({ Delete: { Object: n, Quiet: i || !1 } }),o = e.Headers;o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a));var r = _e.map(n, function (t) {return { action: "name/cos:DeleteObject", bucket: e.Bucket, region: e.Region, prefix: t.Key };});be.call(this, { Scope: r, method: "POST", Bucket: e.Bucket, Region: e.Region, body: a, action: "delete", headers: o }, function (e, n) {if (e) return t(e);var i = n.DeleteResult || {},a = i.Deleted || [],o = i.Error || [];a = _e.isArray(a) ? a : [a], o = _e.isArray(o) ? o : [o];var r = _e.clone(i);_e.extend(r, { Error: o, Deleted: a, statusCode: n.statusCode, headers: n.headers }), t(null, r);});}function oe(e, t) {var n = e.Headers;if (!e.RestoreRequest) return void t({ error: "missing param RestoreRequest" });var i = e.RestoreRequest || {},a = _e.json2xml({ RestoreRequest: i });n["Content-Type"] = "application/xml", n["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, { Action: "name/cos:RestoreObject", method: "POST", Bucket: e.Bucket, Region: e.Region, Key: e.Key, VersionId: e.VersionId, body: a, action: "restore", headers: n }, function (e, n) {t(e, n);});}function re(e, t) {var n = e.Tagging || {},i = n.TagSet || n.Tags || e.Tags || [];i = _e.clone(_e.isArray(i) ? i : [i]);var a = _e.json2xml({ Tagging: { TagSet: { Tag: i } } }),o = e.Headers;o["Content-Type"] = "application/xml", o["Content-MD5"] = _e.binaryBase64(_e.md5(a)), be.call(this, { Interface: "putObjectTagging", Action: "name/cos:PutObjectTagging", method: "PUT", Bucket: e.Bucket, Key: e.Key, Region: e.Region, body: a, action: "tagging", headers: o, VersionId: e.VersionId }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function se(e, t) {be.call(this, { Interface: "getObjectTagging", Action: "name/cos:GetObjectTagging", method: "GET", Key: e.Key, Bucket: e.Bucket, Region: e.Region, headers: e.Headers, action: "tagging", VersionId: e.VersionId }, function (e, n) {if (e) {if (404 !== e.statusCode || !e.error || "Not Found" !== e.error && "NoSuchTagSet" !== e.error.Code) t(e);else {var i = { Tags: [], statusCode: e.statusCode };e.headers && (i.headers = e.headers), t(null, i);}} else {var a = [];try {a = n.Tagging.TagSet.Tag || [];} catch (e) {}a = _e.clone(_e.isArray(a) ? a : [a]), t(null, { Tags: a, statusCode: n.statusCode, headers: n.headers });}});}function ce(e, t) {be.call(this, { Interface: "deleteObjectTagging", Action: "name/cos:DeleteObjectTagging", method: "DELETE", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: e.Headers, action: "tagging", VersionId: e.VersionId }, function (e, n) {return e && 204 === e.statusCode ? t(null, { statusCode: e.statusCode }) : e ? t(e) : void t(null, { statusCode: n.statusCode, headers: n.headers });});}function le(e, t) {var n = this,i = e.Headers;i["Cache-Control"] || i["cache-control"] || (i["Cache-Control"] = ""), i["Content-Type"] || i["content-type"] || (i["Content-Type"] = Ae.getType(e.Key) || "application/octet-stream"), be.call(n, { Action: "name/cos:InitiateMultipartUpload", method: "POST", Bucket: e.Bucket, Region: e.Region, Key: e.Key, action: "uploads", headers: e.Headers, qs: e.Query }, function (e, n) {return e ? t(e) : (n = _e.clone(n || {})) && n.InitiateMultipartUploadResult ? t(null, _e.extend(n.InitiateMultipartUploadResult, { statusCode: n.statusCode, headers: n.headers })) : void t(null, n);});}function pe(e, t) {var n = this;_e.getFileSize("multipartUpload", e, function () {_e.getBodyMd5(n.options.UploadCheckContentMd5, e.Body, function (i) {i && (e.Headers["Content-MD5"] = _e.binaryBase64(i)), be.call(n, { Action: "name/cos:UploadPart", TaskId: e.TaskId, method: "PUT", Bucket: e.Bucket, Region: e.Region, Key: e.Key, qs: { partNumber: e.PartNumber, uploadId: e.UploadId }, headers: e.Headers, onProgress: e.onProgress, body: e.Body || null }, function (e, n) {if (e) return t(e);t(null, { ETag: _e.attr(n.headers, "etag", {}), statusCode: n.statusCode, headers: n.headers });});});});}function ue(e, t) {for (var n = this, i = e.UploadId, a = e.Parts, o = 0, r = a.length; o < r; o++) {0 !== a[o].ETag.indexOf('"') && (a[o].ETag = '"' + a[o].ETag + '"');}var s = _e.json2xml({ CompleteMultipartUpload: { Part: a } }),c = e.Headers;c["Content-Type"] = "application/xml", c["Content-MD5"] = _e.binaryBase64(_e.md5(s)), be.call(this, { Action: "name/cos:CompleteMultipartUpload", method: "POST", Bucket: e.Bucket, Region: e.Region, Key: e.Key, qs: { uploadId: i }, body: s, headers: c }, function (i, a) {if (i) return t(i);var o = ye({ ForcePathStyle: n.options.ForcePathStyle, protocol: n.options.Protocol, domain: n.options.Domain, bucket: e.Bucket, region: e.Region, object: e.Key, isLocation: !0 }),r = a.CompleteMultipartUploadResult || {},s = _e.extend(r, { Location: o, statusCode: a.statusCode, headers: a.headers });t(null, s);});}function de(e, t) {var n = {};n.delimiter = e.Delimiter, n["encoding-type"] = e.EncodingType, n.prefix = e.Prefix || "", n["max-uploads"] = e.MaxUploads, n["key-marker"] = e.KeyMarker, n["upload-id-marker"] = e.UploadIdMarker, n = _e.clearKey(n), be.call(this, { Action: "name/cos:ListMultipartUploads", ResourceKey: n.prefix, method: "GET", Bucket: e.Bucket, Region: e.Region, headers: e.Headers, qs: n, action: "uploads" }, function (e, n) {if (e) return t(e);if (n && n.ListMultipartUploadsResult) {var i = n.ListMultipartUploadsResult.Upload || [],a = n.ListMultipartUploadsResult.CommonPrefixes || [];a = _e.isArray(a) ? a : [a], i = _e.isArray(i) ? i : [i], n.ListMultipartUploadsResult.Upload = i, n.ListMultipartUploadsResult.CommonPrefixes = a;}var o = _e.clone(n.ListMultipartUploadsResult || {});_e.extend(o, { statusCode: n.statusCode, headers: n.headers }), t(null, o);});}function me(e, t) {var n = {};n.uploadId = e.UploadId, n["encoding-type"] = e.EncodingType, n["max-parts"] = e.MaxParts, n["part-number-marker"] = e.PartNumberMarker, be.call(this, { Action: "name/cos:ListParts", method: "GET", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: e.Headers, qs: n }, function (e, n) {if (e) return t(e);var i = n.ListPartsResult || {},a = i.Part || [];a = _e.isArray(a) ? a : [a], i.Part = a;var o = _e.clone(i);_e.extend(o, { statusCode: n.statusCode, headers: n.headers }), t(null, o);});}function fe(e, t) {var n = {};n.uploadId = e.UploadId, be.call(this, { Action: "name/cos:AbortMultipartUpload", method: "DELETE", Bucket: e.Bucket, Region: e.Region, Key: e.Key, headers: e.Headers, qs: n }, function (e, n) {if (e) return t(e);t(null, { statusCode: n.statusCode, headers: n.headers });});}function he(e) {var t = this;return _e.getAuth({ SecretId: e.SecretId || this.options.SecretId || "", SecretKey: e.SecretKey || this.options.SecretKey || "", Method: e.Method, Key: e.Key, Query: e.Query, Headers: e.Headers, Expires: e.Expires, SystemClockOffset: t.options.SystemClockOffset });}function ge(e, t) {var n = this,i = ye({ ForcePathStyle: n.options.ForcePathStyle, protocol: e.Protocol || n.options.Protocol, domain: e.Domain || n.options.Domain, bucket: e.Bucket, region: e.Region, object: e.Key });if (void 0 !== e.Sign && !e.Sign) return t(null, { Url: i }), i;var a = Ce.call(this, { Action: "PUT" === (e.Method || "").toUpperCase() ? "name/cos:PutObject" : "name/cos:GetObject", Bucket: e.Bucket || "", Region: e.Region || "", Method: e.Method || "get", Key: e.Key, Expires: e.Expires }, function (e, n) {if (t) {if (e) return void t(e);var a = i;a += "?" + (n.Authorization.indexOf("q-signature") > -1 ? n.Authorization : "sign=" + encodeURIComponent(n.Authorization)), n.XCosSecurityToken && (a += "&x-cos-security-token=" + n.XCosSecurityToken), n.ClientIP && (a += "&clientIP=" + n.ClientIP), n.ClientUA && (a += "&clientUA=" + n.ClientUA), n.Token && (a += "&token=" + n.Token), setTimeout(function () {t(null, { Url: a });});}});return a ? i + "?" + a.Authorization + (a.XCosSecurityToken ? "&x-cos-security-token=" + a.XCosSecurityToken : "") : i;}function ve(e) {var t = { GrantFullControl: [], GrantWrite: [], GrantRead: [], GrantReadAcp: [], GrantWriteAcp: [], ACL: "" },n = { FULL_CONTROL: "GrantFullControl", WRITE: "GrantWrite", READ: "GrantRead", READ_ACP: "GrantReadAcp", WRITE_ACP: "GrantWriteAcp" },i = e && e.AccessControlList || {},a = i.Grant;a && (a = _e.isArray(a) ? a : [a]);var o = { READ: 0, WRITE: 0, FULL_CONTROL: 0 };return a && a.length && _e.each(a, function (i) {"qcs::cam::anyone:anyone" === i.Grantee.ID || "http://cam.qcloud.com/groups/global/AllUsers" === i.Grantee.URI ? o[i.Permission] = 1 : i.Grantee.ID !== e.Owner.ID && t[n[i.Permission]].push('id="' + i.Grantee.ID + '"');}), o.FULL_CONTROL || o.WRITE && o.READ ? t.ACL = "public-read-write" : o.READ ? t.ACL = "public-read" : t.ACL = "private", _e.each(n, function (e) {t[e] = xe(t[e].join(","));}), t;}function xe(e) {var t,n,i = e.split(","),a = {};for (t = 0; t < i.length;) {n = i[t].trim(), a[n] ? i.splice(t, 1) : (a[n] = !0, i[t] = n, t++);}return i.join(",");}function ye(e) {var t = e.bucket,n = t.substr(0, t.lastIndexOf("-")),i = t.substr(t.lastIndexOf("-") + 1),a = e.domain,o = e.region,r = e.object;a || (a = ["cn-south", "cn-south-2", "cn-north", "cn-east", "cn-southwest", "sg"].indexOf(o) > -1 ? "{Region}.myqcloud.com" : "cos.{Region}.myqcloud.com", e.ForcePathStyle || (a = "{Bucket}." + a)), a = a.replace(/\{\{AppId\}\}/gi, i).replace(/\{\{Bucket\}\}/gi, n).replace(/\{\{Region\}\}/gi, o).replace(/\{\{.*?\}\}/gi, ""), a = a.replace(/\{AppId\}/gi, i).replace(/\{BucketName\}/gi, n).replace(/\{Bucket\}/gi, t).replace(/\{Region\}/gi, o).replace(/\{.*?\}/gi, ""), /^[a-zA-Z]+:\/\//.test(a) || (a = "https://" + a), "/" === a.slice(-1) && (a = a.slice(0, -1));var s = a;return e.ForcePathStyle && (s += "/" + t), s += "/", r && (s += _e.camSafeUrlEncode(r).replace(/%2F/g, "/")), e.isLocation && (s = s.replace(/^https?:\/\//, "")), s;}function Ce(e, t) {var n = _e.clone(e.Headers);delete n["Content-Type"], delete n["Cache-Control"], _e.each(n, function (e, t) {"" === e && delete n[t];});var i = function i(e) {var n = !1,i = e.Authorization;if (i) if (i.indexOf(" ") > -1) n = !1;else if (i.indexOf("q-sign-algorithm=") > -1 && i.indexOf("q-ak=") > -1 && i.indexOf("q-sign-time=") > -1 && i.indexOf("q-key-time=") > -1 && i.indexOf("q-url-param-list=") > -1) n = !0;else try {i = we.atob(i), i.indexOf("a=") > -1 && i.indexOf("k=") > -1 && i.indexOf("t=") > -1 && i.indexOf("r=") > -1 && i.indexOf("b=") > -1 && (n = !0);} catch (e) {}n ? t && t(null, e) : t && t("authorization error");},a = this,o = e.Bucket || "",r = e.Region || "",s = "name/cos:PostObject" !== e.Action && e.Key ? e.Key : "";a.options.ForcePathStyle && o && (s = o + "/" + s);var c = "/" + s,l = {},p = e.Scope;if (!p) {var u = e.Action || "",d = e.ResourceKey || e.Key || "";p = e.Scope || [{ action: u, bucket: o, region: r, prefix: d }];}var m = _e.md5(JSON.stringify(p));a._StsCache = a._StsCache || [], function () {var e, t;for (e = a._StsCache.length - 1; e >= 0; e--) {t = a._StsCache[e];var n = Math.round(_e.getSkewTime(a.options.SystemClockOffset) / 1e3) + 30;if (t.StartTime && n < t.StartTime || n >= t.ExpiredTime) a._StsCache.splice(e, 1);else if (!t.ScopeLimit || t.ScopeLimit && t.ScopeKey === m) {l = t;break;}}}();var f = function f() {var t = l.StartTime && l.ExpiredTime ? l.StartTime + ";" + l.ExpiredTime : "",o = _e.getAuth({ SecretId: l.TmpSecretId, SecretKey: l.TmpSecretKey, Method: e.Method, Pathname: c, Query: e.Query, Headers: n, Expires: e.Expires, SystemClockOffset: a.options.SystemClockOffset, KeyTime: t }),r = { Authorization: o, XCosSecurityToken: l.XCosSecurityToken || "", Token: l.Token || "", ClientIP: l.ClientIP || "", ClientUA: l.ClientUA || "" };i(r);};if (l.ExpiredTime && l.ExpiredTime - _e.getSkewTime(a.options.SystemClockOffset) / 1e3 > 60) f();else if (a.options.getAuthorization) a.options.getAuthorization.call(a, { Bucket: o, Region: r, Method: e.Method, Key: s, Pathname: c, Query: e.Query, Headers: n, Scope: p, SystemClockOffset: a.options.SystemClockOffset }, function (e) {"string" == typeof e && (e = { Authorization: e }), e.TmpSecretId && e.TmpSecretKey && e.XCosSecurityToken && e.ExpiredTime ? (l = e || {}, l.Scope = p, l.ScopeKey = m, a._StsCache.push(l), f()) : i(e);});else {if (!a.options.getSTS) return function () {var t = _e.getAuth({ SecretId: e.SecretId || a.options.SecretId, SecretKey: e.SecretKey || a.options.SecretKey, Method: e.Method, Pathname: c, Query: e.Query, Headers: n, Expires: e.Expires, SystemClockOffset: a.options.SystemClockOffset }),o = { Authorization: t, XCosSecurityToken: a.options.XCosSecurityToken };return i(o), o;}();a.options.getSTS.call(a, { Bucket: o, Region: r }, function (e) {l = e || {}, l.Scope = p, l.ScopeKey = m, l.TmpSecretId = l.SecretId, l.TmpSecretKey = l.SecretKey, a._StsCache.push(l), f();});}return "";}function ke(e) {var t = !1,n = !1,i = e.headers && (e.headers.date || e.headers.Date) || e.error && e.error.ServerTime;try {var a = e.error.Code,o = e.error.Message;("RequestTimeTooSkewed" === a || "AccessDenied" === a && "Request has expired" === o) && (n = !0);} catch (e) {}if (e) if (n && i) {var r = Date.parse(i);this.options.CorrectClockSkew && Math.abs(_e.getSkewTime(this.options.SystemClockOffset) - r) >= 3e4 && (console.error("error: Local time is too skewed."), this.options.SystemClockOffset = r - Date.now(), t = !0);} else 5 === Math.floor(e.statusCode / 100) && (t = !0);return t;}function be(e, t) {var n = this;!e.headers && (e.headers = {}), !e.qs && (e.qs = {}), e.VersionId && (e.qs.versionId = e.VersionId), e.qs = _e.clearKey(e.qs), e.headers && (e.headers = _e.clearKey(e.headers)), e.qs && (e.qs = _e.clearKey(e.qs));var i = _e.clone(e.qs);e.action && (i[e.action] = "");var a = function a(o) {var r = n.options.SystemClockOffset;Ce.call(n, { Bucket: e.Bucket || "", Region: e.Region || "", Method: e.method, Key: e.Key, Query: i, Headers: e.headers, Action: e.Action, ResourceKey: e.ResourceKey, Scope: e.Scope }, function (i, s) {if (i) return void t(i);e.AuthData = s, Se.call(n, e, function (i, s) {i && o < 2 && (r !== n.options.SystemClockOffset || ke.call(n, i)) ? (e.headers && (delete e.headers.Authorization, delete e.headers.token, delete e.headers.clientIP, delete e.headers.clientUA, delete e.headers["x-cos-security-token"]), a(o + 1)) : t(i, s);});});};a(1);}function Se(e, t) {var n = this,i = e.TaskId;if (!i || n._isRunningTask(i)) {var a = e.Bucket,o = e.Region,r = e.Key,s = e.method || "GET",c = e.url,l = e.body,p = e.json,u = e.rawBody;c = c || ye({ ForcePathStyle: n.options.ForcePathStyle, protocol: n.options.Protocol, domain: n.options.Domain, bucket: a, region: o, object: r }), e.action && (c = c + "?" + e.action);var d = { method: s, url: c, headers: e.headers, qs: e.qs, filePath: e.filePath, body: l, json: p };d.headers.Authorization = e.AuthData.Authorization, e.AuthData.Token && (d.headers.token = e.AuthData.Token), e.AuthData.ClientIP && (d.headers.clientIP = e.AuthData.ClientIP), e.AuthData.ClientUA && (d.headers.clientUA = e.AuthData.ClientUA), e.AuthData.XCosSecurityToken && (d.headers["x-cos-security-token"] = e.AuthData.XCosSecurityToken), d.headers && (d.headers = _e.clearKey(d.headers)), d = _e.clearKey(d), e.onProgress && "function" == typeof e.onProgress && (d.onProgress = function (t) {if (!i || n._isRunningTask(i)) {var a = t ? t.loaded : 0;e.onProgress({ loaded: a, total: t.total });}}), this.options.Timeout && (d.timeout = this.options.Timeout), n.options.ForcePathStyle && (d.pathStyle = n.options.ForcePathStyle), n.emit("before-send", d);var m = Re(d, function (e, a, o) {if ("abort" !== e) {var r,s = function s(e, o) {if (i && n.off("inner-kill-task", f), !r) {r = !0;var s = {};a && a.statusCode && (s.statusCode = a.statusCode), a && a.headers && (s.headers = a.headers), e ? (e = _e.extend(e || {}, s), t(e, null)) : (o = _e.extend(o || {}, s), t(null, o)), m = null;}};if (e) return void s({ error: e });var c;if (u) c = {}, c.body = o;else try {c = o && o.indexOf("<") > -1 && o.indexOf(">") > -1 && _e.xml2json(o) || {};} catch (e) {c = o || {};}var l = a.statusCode;return 2 === Math.floor(l / 100) ? c.Error ? void s({ error: c.Error }) : void s(null, c) : void s({ error: c.Error || c });}}),f = function f(e) {e.TaskId === i && (m && m.abort && m.abort(), n.off("inner-kill-task", f));};i && n.on("inner-kill-task", f);}}var Re = n(18),we = n(3),_e = n(0),Ae = n(19),Te = { getService: i, putBucket: a, headBucket: o, getBucket: r, deleteBucket: s, putBucketAcl: c, getBucketAcl: l, putBucketCors: p, getBucketCors: u, deleteBucketCors: d, getBucketLocation: m, getBucketPolicy: h, putBucketPolicy: f, deleteBucketPolicy: g, putBucketTagging: v, getBucketTagging: x, deleteBucketTagging: y, putBucketLifecycle: C, getBucketLifecycle: k, deleteBucketLifecycle: b, putBucketVersioning: S, getBucketVersioning: R, putBucketReplication: w, getBucketReplication: _, deleteBucketReplication: A, putBucketWebsite: T, getBucketWebsite: E, deleteBucketWebsite: B, putBucketReferer: O, getBucketReferer: D, putBucketDomain: N, getBucketDomain: I, deleteBucketDomain: P, putBucketOrigin: j, getBucketOrigin: M, deleteBucketOrigin: U, putBucketLogging: F, getBucketLogging: H, putBucketInventory: L, getBucketInventory: z, listBucketInventory: K, deleteBucketInventory: q, putBucketAccelerate: G, getBucketAccelerate: V, getObject: $, headObject: X, listObjectVersions: W, putObject: Q, postObject: J, deleteObject: Y, getObjectAcl: Z, putObjectAcl: ee, optionsObject: te, putObjectCopy: ne, deleteMultipleObject: ae, restoreObject: oe, putObjectTagging: re, getObjectTagging: se, deleteObjectTagging: ce, uploadPartCopy: ie, multipartInit: le, multipartUpload: pe, multipartComplete: ue, multipartList: de, multipartListPart: me, multipartAbort: fe, getObjectUrl: ge, getAuth: he };e.exports.init = function (e, t) {t.transferToTaskMethod(Te, "postObject"), t.transferToTaskMethod(Te, "putObject"), _e.each(Te, function (t, n) {e.prototype[n] = _e.apiWrapper(n, t);});};}, function (e, t) {var n = function n(e) {var t,n,i,a = [],o = Object.keys(e);for (t = 0; t < o.length; t++) {n = o[t], i = e[n] || "", a.push(n + "=" + encodeURIComponent(i));}return a.join("&");},i = function i(e, t) {var i,a = e.filePath,o = e.headers || {},r = e.url,s = e.method,c = e.onProgress,l = function l(e, n) {var i = n.header,a = {};if (i) for (var o in i) {i.hasOwnProperty(o) && (a[o.toLowerCase()] = i[o]);}t(e, { statusCode: n.statusCode, headers: a }, n.data);};if (a) {var p,u = r.match(/^(https?:\/\/[^\/]+\/)([^\/]*\/?)(.*)$/);e.pathStyle ? (p = decodeURIComponent(u[3] || ""), r = u[1] + u[2]) : (p = decodeURIComponent(u[2] + u[3] || ""), r = u[1]);var d = { key: p, success_action_status: 200, Signature: o.Authorization },m = ["Cache-Control", "Content-Type", "Content-Disposition", "Content-Encoding", "Expires", "x-cos-storage-class", "x-cos-security-token"];for (var f in e.headers) {e.headers.hasOwnProperty(f) && (f.indexOf("x-cos-meta-") > -1 || m.indexOf(f) > -1) && (d[f] = e.headers[f]);}o["x-cos-acl"] && (d.acl = o["x-cos-acl"]), !d["Content-Type"] && (d["Content-Type"] = ""), i = wx.uploadFile({ url: r, method: s, name: "file", header: o, filePath: a, formData: d, timeout: e.timeout, success: function success(e) {l(null, e);}, fail: function fail(e) {l(e.errMsg, e);} }), i.onProgressUpdate(function (e) {c && c({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend, progress: e.progress / 100 });});} else {var h = e.qs && n(e.qs) || "";h && (r += (r.indexOf("?") > -1 ? "&" : "?") + h), o["Content-Length"] && delete o["Content-Length"], i = wx.request({ url: r, method: s, header: o, dataType: "text", data: e.body, timeout: e.timeout, success: function success(e) {l(null, e);}, fail: function fail(e) {l(e.errMsg, e);} });}return i;};e.exports = i;}, function (e, t, n) {"use strict";var i = n(20);e.exports = new i(n(21), n(22));}, function (e, t, n) {"use strict";function i() {this._types = Object.create(null), this._extensions = Object.create(null);for (var e = 0; e < arguments.length; e++) {this.define(arguments[e]);}this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);}i.prototype.define = function (e, t) {for (var n in e) {var i = e[n].map(function (e) {return e.toLowerCase();});n = n.toLowerCase();for (var a = 0; a < i.length; a++) {var o = i[a];if ("*" != o[0]) {if (!t && o in this._types) throw new Error('Attempt to change mapping for "' + o + '" extension from "' + this._types[o] + '" to "' + n + '". Pass `force=true` to allow this, otherwise remove "' + o + '" from the list of extensions for "' + n + '".');this._types[o] = n;}}if (t || !this._extensions[n]) {var o = i[0];this._extensions[n] = "*" != o[0] ? o : o.substr(1);}}}, i.prototype.getType = function (e) {e = String(e);var t = e.replace(/^.*[\/\\]/, "").toLowerCase(),n = t.replace(/^.*\./, "").toLowerCase(),i = t.length < e.length;return (n.length < t.length - 1 || !i) && this._types[n] || null;}, i.prototype.getExtension = function (e) {return (e = /^\s*([^;\s]*)/.test(e) && RegExp.$1) && this._extensions[e.toLowerCase()] || null;}, e.exports = i;}, function (e, t) {e.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["ecma", "es"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/mrb-consumer+xml": ["*xdf"], "application/mrb-publish+xml": ["*xdf"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["*xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-error+xml": ["xer"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };}, function (e, t) {e.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };}, function (e, t, n) {function i(e, t) {var n = this;if (!x.canFileSlice()) return e.SkipTask = !0, void n.postObject(e, t);var i,o,r = new v(),c = e.TaskId,p = e.Bucket,u = e.Region,d = e.Key,m = e.FilePath,f = e.ChunkSize || e.SliceSize || n.options.ChunkSize,g = e.AsyncLimit,y = e.StorageClass,C = e.ServerSideEncryption,k = e.onHashProgress;r.on("error", function (e) {if (n._isRunningTask(c)) return t(e);}), r.on("upload_complete", function (e) {t(null, e);}), r.on("upload_slice_complete", function (e) {l.call(n, { Bucket: p, Region: u, Key: d, UploadId: e.UploadId, SliceList: e.SliceList }, function (t, a) {if (n._isRunningTask(c)) {if (h.removeUsing(e.UploadId), t) return o(null, !0), r.emit("error", t);h.removeUploadId(e.UploadId), o({ loaded: i, total: i }, !0), r.emit("upload_complete", a);}});}), r.on("get_upload_data_finish", function (t) {var a = h.getFileId(e.FileStat, e.ChunkSize, p, d);a && h.saveUploadId(a, t.UploadId, n.options.UploadIdCacheLimit), h.setUsing(t.UploadId), o(null, !0), s.call(n, { TaskId: c, Bucket: p, Region: u, Key: d, FilePath: m, FileSize: i, SliceSize: f, AsyncLimit: g, ServerSideEncryption: C, UploadData: t, onProgress: o }, function (e, t) {if (n._isRunningTask(c)) return e ? (o(null, !0), r.emit("error", e)) : void r.emit("upload_slice_complete", t);});}), r.on("get_file_size_finish", function () {if (o = x.throttleOnProgress.call(n, i, e.onProgress), e.UploadData.UploadId) r.emit("get_upload_data_finish", e.UploadData);else {var t = x.extend({ TaskId: c, Bucket: p, Region: u, Key: d, Headers: e.Headers, StorageClass: y, FilePath: m, FileSize: i, SliceSize: f, onHashProgress: k }, e);a.call(n, t, function (t, i) {if (n._isRunningTask(c)) {if (t) return r.emit("error", t);e.UploadData.UploadId = i.UploadId, e.UploadData.PartList = i.PartList, r.emit("get_upload_data_finish", e.UploadData);}});}}), i = e.ContentLength, delete e.ContentLength, !e.Headers && (e.Headers = {}), x.each(e.Headers, function (t, n) {"content-length" === n.toLowerCase() && delete e.Headers[n];}), function () {for (var t = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120], a = 1048576, o = 0; o < t.length && (a = 1024 * t[o] * 1024, !(i / a <= n.options.MaxPartNumber)); o++) {;}e.ChunkSize = e.SliceSize = f = Math.max(f, a);}(), 0 === i ? (e.Body = "", e.ContentLength = 0, e.SkipTask = !0, n.putObject(e, function (e, n) {if (e) return t(e);t(null, n);})) : r.emit("get_file_size_finish");}function a(e, t) {var n = e.TaskId,i = e.Bucket,a = e.Region,s = e.Key,c = e.StorageClass,l = this,p = {},u = e.FileSize,d = e.SliceSize,m = Math.ceil(u / d),f = 0,y = 0,C = x.throttleOnProgress.call(l, u, e.onHashProgress),k = function k(t, n) {var i = d * (t - 1),a = Math.min(i + d, u),o = a - i;p[t] ? n(null, { PartNumber: t, ETag: p[t], Size: o }) : x.fileSlice(e.FilePath, i, a, function (e) {try {var i = x.getFileMd5(e);} catch (e) {return n(e);}var a = '"' + i + '"';p[t] = a, f += 1, y += o, n(null, { PartNumber: t, ETag: a, Size: o }), C({ loaded: y, total: u });});},b = function b(e, t) {var n = e.length;if (0 === n) return t(null, !0);if (n > m) return t(null, !1);if (n > 1) {if (Math.max(e[0].Size, e[1].Size) !== d) return t(null, !1);}var i = function i(a) {if (a < n) {var o = e[a];k(o.PartNumber, function (e, n) {n && n.ETag === o.ETag && n.Size === o.Size ? i(a + 1) : t(null, !1);});} else t(null, !0);};i(0);},S = new v();S.on("error", function (e) {if (l._isRunningTask(n)) return t(e);}), S.on("upload_id_available", function (e) {var n = {},i = [];x.each(e.PartList, function (e) {n[e.PartNumber] = e;});for (var a = 1; a <= m; a++) {var o = n[a];o ? (o.PartNumber = a, o.Uploaded = !0) : o = { PartNumber: a, ETag: null, Uploaded: !1 }, i.push(o);}e.PartList = i, t(null, e);}), S.on("no_available_upload_id", function () {if (l._isRunningTask(n)) {var o = x.extend({ Bucket: i, Region: a, Key: s, Headers: x.clone(e.Headers), Query: x.clone(e.Query), StorageClass: c }, e);l.multipartInit(o, function (e, i) {if (l._isRunningTask(n)) {if (e) return S.emit("error", e);var a = i.UploadId;if (!a) return t({ Message: "no upload id" });S.emit("upload_id_available", { UploadId: a, PartList: [] });}});}}), S.on("has_and_check_upload_id", function (e) {e = e.reverse(), g.eachLimit(e, 1, function (e, t) {if (l._isRunningTask(n)) return h.using[e] ? void t() : void r.call(l, { Bucket: i, Region: a, Key: s, UploadId: e }, function (i, a) {if (l._isRunningTask(n)) {if (i) return h.removeUsing(e), S.emit("error", i);var o = a.PartList;o.forEach(function (e) {e.PartNumber *= 1, e.Size *= 1, e.ETag = e.ETag || "";}), b(o, function (i, a) {if (l._isRunningTask(n)) return i ? S.emit("error", i) : void (a ? t({ UploadId: e, PartList: o }) : t());});}});}, function (e) {l._isRunningTask(n) && (C(null, !0), e && e.UploadId ? S.emit("upload_id_available", e) : S.emit("no_available_upload_id"));});}), S.on("seek_local_avail_upload_id", function (t) {var o = h.getFileId(e.FileStat, e.ChunkSize, i, s),c = h.getUploadIdList(o);if (!o || !c) return void S.emit("has_and_check_upload_id", t);var p = function p(e) {if (e >= c.length) return void S.emit("has_and_check_upload_id", t);var o = c[e];return x.isInArray(t, o) ? h.using[o] ? void p(e + 1) : void r.call(l, { Bucket: i, Region: a, Key: s, UploadId: o }, function (t, i) {l._isRunningTask(n) && (t ? (h.removeUploadId(o), p(e + 1)) : S.emit("upload_id_available", { UploadId: o, PartList: i.PartList }));}) : (h.removeUploadId(o), void p(e + 1));};p(0);}), S.on("get_remote_upload_id_list", function () {o.call(l, { Bucket: i, Region: a, Key: s }, function (t, a) {if (l._isRunningTask(n)) {if (t) return S.emit("error", t);var o = x.filter(a.UploadList, function (e) {return e.Key === s && (!c || e.StorageClass.toUpperCase() === c.toUpperCase());}).reverse().map(function (e) {return e.UploadId || e.UploadID;});if (o.length) S.emit("seek_local_avail_upload_id", o);else {var r,p = h.getFileId(e.FileStat, e.ChunkSize, i, s);p && (r = h.getUploadIdList(p)) && x.each(r, function (e) {h.removeUploadId(e);}), S.emit("no_available_upload_id");}}});}), S.emit("get_remote_upload_id_list");}function o(e, t) {var n = this,i = [],a = { Bucket: e.Bucket, Region: e.Region, Prefix: e.Key },o = function o() {n.multipartList(a, function (e, n) {if (e) return t(e);i.push.apply(i, n.Upload || []), "true" === n.IsTruncated ? (a.KeyMarker = n.NextKeyMarker, a.UploadIdMarker = n.NextUploadIdMarker, o()) : t(null, { UploadList: i });});};o();}function r(e, t) {var n = this,i = [],a = { Bucket: e.Bucket, Region: e.Region, Key: e.Key, UploadId: e.UploadId },o = function o() {n.multipartListPart(a, function (e, n) {if (e) return t(e);i.push.apply(i, n.Part || []), "true" === n.IsTruncated ? (a.PartNumberMarker = n.NextPartNumberMarker, o()) : t(null, { PartList: i });});};o();}function s(e, t) {var n = this,i = e.TaskId,a = e.Bucket,o = e.Region,r = e.Key,s = e.UploadData,l = e.FileSize,p = e.SliceSize,u = Math.min(e.AsyncLimit || n.options.ChunkParallelLimit || 1, 256),d = e.FilePath,m = Math.ceil(l / p),f = 0,h = e.ServerSideEncryption,v = x.filter(s.PartList, function (e) {return e.Uploaded && (f += e.PartNumber >= m ? l % p || p : p), !e.Uploaded;}),y = e.onProgress;g.eachLimit(v, u, function (e, t) {if (n._isRunningTask(i)) {var u = e.PartNumber,m = Math.min(l, e.PartNumber * p) - (e.PartNumber - 1) * p,g = 0;c.call(n, { TaskId: i, Bucket: a, Region: o, Key: r, SliceSize: p, FileSize: l, PartNumber: u, ServerSideEncryption: h, FilePath: d, UploadData: s, onProgress: function onProgress(e) {f += e.loaded - g, g = e.loaded, y({ loaded: f, total: l });} }, function (a, o) {n._isRunningTask(i) && (a ? f -= g : (f += m - g, e.ETag = o.ETag), y({ loaded: f, total: l }), t(a || null, o));});}}, function (e) {if (n._isRunningTask(i)) return e ? t(e) : void t(null, { UploadId: s.UploadId, SliceList: s.PartList });});}function c(e, t) {var n = this,i = e.TaskId,a = e.Bucket,o = e.Region,r = e.Key,s = e.FileSize,c = e.FilePath,l = 1 * e.PartNumber,p = e.SliceSize,u = e.ServerSideEncryption,d = e.UploadData,m = n.options.ChunkRetryTimes + 1,f = p * (l - 1),h = p,v = f + p;v > s && (v = s, h = v - f), x.fileSlice(c, f, v, function (s) {var c = x.getFileMd5(s),p = c ? x.binaryBase64(c) : null,f = d.PartList[l - 1];g.retry(m, function (t) {n._isRunningTask(i) && n.multipartUpload({ TaskId: i, Bucket: a, Region: o, Key: r, ContentLength: h, PartNumber: l, UploadId: d.UploadId, ServerSideEncryption: u, Body: s, onProgress: e.onProgress, ContentMD5: p }, function (e, a) {if (n._isRunningTask(i)) return e ? t(e) : (f.Uploaded = !0, t(null, a));});}, function (e, a) {if (n._isRunningTask(i)) return t(e, a);});});}function l(e, t) {var n = e.Bucket,i = e.Region,a = e.Key,o = e.UploadId,r = e.SliceList,s = this,c = this.options.ChunkRetryTimes + 1,l = r.map(function (e) {return { PartNumber: e.PartNumber, ETag: e.ETag };});g.retry(c, function (e) {s.multipartComplete({ Bucket: n, Region: i, Key: a, UploadId: o, Parts: l }, e);}, function (e, n) {t(e, n);});}function p(e, t) {var n = e.Bucket,i = e.Region,a = e.Key,r = e.UploadId,s = e.Level || "task",c = e.AsyncLimit,l = this,p = new v();if (p.on("error", function (e) {return t(e);}), p.on("get_abort_array", function (o) {u.call(l, { Bucket: n, Region: i, Key: a, Headers: e.Headers, AsyncLimit: c, AbortArray: o }, function (e, n) {if (e) return t(e);t(null, n);});}), "bucket" === s) o.call(l, { Bucket: n, Region: i }, function (e, n) {if (e) return t(e);p.emit("get_abort_array", n.UploadList || []);});else if ("file" === s) {if (!a) return t({ error: "abort_upload_task_no_key" });o.call(l, { Bucket: n, Region: i, Key: a }, function (e, n) {if (e) return t(e);p.emit("get_abort_array", n.UploadList || []);});} else {if ("task" !== s) return t({ error: "abort_unknown_level" });if (!r) return t({ error: "abort_upload_task_no_id" });if (!a) return t({ error: "abort_upload_task_no_key" });p.emit("get_abort_array", [{ Key: a, UploadId: r }]);}}function u(e, t) {var n = e.Bucket,i = e.Region,a = e.Key,o = e.AbortArray,r = e.AsyncLimit || 1,s = this,c = 0,l = new Array(o.length);g.eachLimit(o, r, function (t, o) {var r = c;if (a && a !== t.Key) return l[r] = { error: { KeyNotMatch: !0 } }, void o(null);var p = t.UploadId || t.UploadID;s.multipartAbort({ Bucket: n, Region: i, Key: t.Key, Headers: e.Headers, UploadId: p }, function (e) {var a = { Bucket: n, Region: i, Key: t.Key, UploadId: p };l[r] = { error: e, task: a }, o(null);}), c++;}, function (e) {if (e) return t(e);for (var n = [], i = [], a = 0, o = l.length; a < o; a++) {var r = l[a];r.task && (r.error ? i.push(r.task) : n.push(r.task));}return t(null, { successList: n, errorList: i });});}function d(e, t) {var n = this,i = void 0 === e.SliceSize ? n.options.SliceSize : e.SliceSize,a = 0,o = 0,r = x.throttleOnProgress.call(n, o, e.onProgress),s = e.files.length,c = e.onFileFinish,l = Array(s),p = function p(e, n, i) {r(null, !0), c && c(e, n, i), l[i.Index] = { options: i, error: e, data: n }, --s <= 0 && t && t(null, { files: l });},u = [];x.each(e.files, function (e, t) {var n = e.FileSize,s = { Index: t, TaskId: "" };a += n, x.each(e, function (e, t) {"object" != typeof e && "function" != typeof e && (s[t] = e);});var c = e.onTaskReady;e.onTaskReady = function (e) {s.TaskId = e, c && c(e);};var l = 0,d = e.onProgress;e.onProgress = function (e) {o = o - l + e.loaded, l = e.loaded, d && d(e), r({ loaded: o, total: a });};var m = e.onFileFinish,f = function f(e, t) {m && m(e, t), p && p(e, t, s);},h = n > i ? "sliceUploadFile" : "postObject";u.push({ api: h, params: e, callback: f });}), n._addTasks(u);}function m(e, t) {var n = new v(),i = this,a = e.Bucket,o = e.Region,r = e.Key,s = e.CopySource,c = s.match(/^([^.]+-\d+)\.cos(v6)?\.([^.]+)\.[^\/]+\/(.+)$/);if (!c) return void t({ error: "CopySource format error" });var l = c[1],p = c[3],u = decodeURIComponent(c[4]),d = void 0 === e.CopySliceSize ? i.options.CopySliceSize : e.CopySliceSize;d = Math.max(0, d);var m,h,y = e.CopyChunkSize || this.options.CopyChunkSize,C = this.options.CopyChunkParallelLimit,k = 0;n.on("copy_slice_complete", function (e) {i.multipartComplete({ Bucket: a, Region: o, Key: r, UploadId: e.UploadId, Parts: e.PartList }, function (e, n) {if (e) return h(null, !0), t(e);h({ loaded: m, total: m }, !0), t(null, n);});}), n.on("get_copy_data_finish", function (e) {g.eachLimit(e.PartList, C, function (t, n) {var c = t.PartNumber,l = t.CopySourceRange,p = t.end - t.start,u = 0;f.call(i, { Bucket: a, Region: o, Key: r, CopySource: s, UploadId: e.UploadId, PartNumber: c, CopySourceRange: l, onProgress: function onProgress(e) {k += e.loaded - u, u = e.loaded, h({ loaded: k, total: m });} }, function (e, i) {if (e) return n(e);h({ loaded: k, total: m }), k += p - u, t.ETag = i.ETag, n(e || null, i);});}, function (i) {if (i) return h(null, !0), t(i);n.emit("copy_slice_complete", e);});}), n.on("get_file_size_finish", function (s) {!function () {for (var t = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120], n = 1048576, a = 0; a < t.length && (n = 1024 * t[a] * 1024, !(m / n <= i.options.MaxPartNumber)); a++) {;}e.ChunkSize = y = Math.max(y, n);for (var o = Math.ceil(m / y), r = [], s = 1; s <= o; s++) {var c = (s - 1) * y,l = s * y < m ? s * y - 1 : m - 1,p = { PartNumber: s, start: c, end: l, CopySourceRange: "bytes=" + c + "-" + l };r.push(p);}e.PartList = r;}();var c;if (c = "Replaced" === e.Headers["x-cos-metadata-directive"] ? e.Headers : s, c["x-cos-storage-class"] = e.Headers["x-cos-storage-class"] || s["x-cos-storage-class"], c = x.clearKey(c), "ARCHIVE" === s["x-cos-storage-class"] || "DEEP_ARCHIVE" === s["x-cos-storage-class"]) {var l = s["x-cos-restore"];if (!l || 'ongoing-request="true"' === l) return void t({ error: "Unrestored archive object is not allowed to be copied" });}delete c["x-cos-copy-source"], delete c["x-cos-metadata-directive"], delete c["x-cos-copy-source-If-Modified-Since"], delete c["x-cos-copy-source-If-Unmodified-Since"], delete c["x-cos-copy-source-If-Match"], delete c["x-cos-copy-source-If-None-Match"], i.multipartInit({ Bucket: a, Region: o, Key: r, Headers: c }, function (i, a) {if (i) return t(i);e.UploadId = a.UploadId, n.emit("get_copy_data_finish", e);});}), i.headObject({ Bucket: l, Region: p, Key: u }, function (a, o) {if (a) return void t(a.statusCode && 404 === a.statusCode ? { ErrorStatus: u + " Not Exist" } : a);if (void 0 === (m = e.FileSize = o.headers["content-length"]) || !m) return void t({ error: 'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.' });if (h = x.throttleOnProgress.call(i, m, e.onProgress), m <= d) e.Headers["x-cos-metadata-directive"] || (e.Headers["x-cos-metadata-directive"] = "Copy"), i.putObjectCopy(e, function (e, n) {if (e) return h(null, !0), t(e);h({ loaded: m, total: m }, !0), t(e, n);});else {var r = o.headers,s = { "Cache-Control": r["cache-control"], "Content-Disposition": r["content-disposition"], "Content-Encoding": r["content-encoding"], "Content-Type": r["content-type"], Expires: r.expires, "x-cos-storage-class": r["x-cos-storage-class"] };x.each(r, function (e, t) {0 === t.indexOf("x-cos-meta-") && t.length > "x-cos-meta-".length && (s[t] = e);}), n.emit("get_file_size_finish", s);}});}function f(e, t) {var n = e.TaskId,i = e.Bucket,a = e.Region,o = e.Key,r = e.CopySource,s = e.UploadId,c = 1 * e.PartNumber,l = e.CopySourceRange,p = this.options.ChunkRetryTimes + 1,u = this;g.retry(p, function (t) {u.uploadPartCopy({ TaskId: n, Bucket: i, Region: a, Key: o, CopySource: r, UploadId: s, PartNumber: c, CopySourceRange: l, onProgress: e.onProgress }, function (e, n) {t(e || null, n);});}, function (e, n) {return t(e, n);});}var h = n(5),g = n(24),v = n(4).EventProxy,x = n(0),y = { sliceUploadFile: i, abortUploadTask: p, uploadFiles: d, sliceCopyFile: m };e.exports.init = function (e, t) {t.transferToTaskMethod(y, "sliceUploadFile"), x.each(y, function (t, n) {e.prototype[n] = x.apiWrapper(n, t);});};}, function (e, t) {var n = function n(e, t, _n, i) {if (i = i || function () {}, !e.length || t <= 0) return i();var a = 0,o = 0,r = 0;!function s() {if (a >= e.length) return i();for (; r < t && o < e.length;) {o += 1, r += 1, _n(e[o - 1], function (t) {t ? (i(t), i = function i() {}) : (a += 1, r -= 1, a >= e.length ? i() : s());});}}();},i = function i(e, t, n) {var i = function i(a) {t(function (t, o) {t && a < e ? i(a + 1) : n(t, o);});};e < 1 ? n() : i(1);},a = { eachLimit: n, retry: i };e.exports = a;}]);});

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"竞赛统计","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"竞赛统计","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"竞赛统计","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"竞赛统计","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 204:
/*!**************************************************!*\
  !*** D:/服务外包/竞赛统计/static/request/api_project.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* 获取上传头像/证明材料签名 */
exports.getPublicSignature = function (filename) {return (0, _request.default)("/project/sign/upload/public?filename=" + filename, "GET", {});};

/* 创建项目数据，保存至数据库 */
exports.postProject = function (data) {return (0, _request.default)("/project", "POST", data);};
/* 获取所有项目粗略信息表
                                                                                                 	@params pageNum:Number 第几页
                                                                                                 	@params	pageSize:Number 每页的条数
                                                                                                     @params userId:Number 用户userId
                                                                                                     @params compId:Number 竞赛Id
                                                                                                     @params awardLevel:Number 获奖等级
                                                                                                     @params sortBy:String 排序字段
                                                                                                     @params orderBy:String 排序方式
                                                                                                 */
exports.getProjects = function (params) {return (0, _request.default)("/project", "GET", params);};
/* 获取个人项目列表 */
exports.getMeProjects = function (params) {return (0, _request.default)("/project/me", "GET", params);};
/* 获取项目详细信息 */
exports.getProject = function (projectId) {return (0, _request.default)("/project/".concat(projectId), "GET", {});};
/* 更新项目详细信息 */
exports.putProject = function (projectId, data) {return (0, _request.default)("/project/".concat(projectId), "PUT", data);};
/* 删除项目 */
exports.deleteProject = function (projectId) {return (0, _request.default)("/project/".concat(projectId), "DELETE", {});};
/* 获取评论
                                                                                                                           	@prams	pageNum: Number,页码
                                                                                                                           	@prams	pageSize: Number,分页大小
                                                                                                                           	@prams	projectId: Number,项目ID
                                                                                                                           	@prams	resourceId: Number,资源ID（可选)
                                                                                                                           */
exports.getRemarks = function (params) {return (0, _request.default)("/project/resource/score", "GET", params);};
/* 评价 */
exports.postRemark = function (projectResourceId, data) {return (0, _request.default)("/project/resource/score/".concat(projectResourceId), "POST", data);};
/* 删除评价 */
exports.deleteRemark = function (commentId) {return (0, _request.default)("/project/resource/score/".concat(commentId), "DELETE", {});};
/* 获取公开评论 */
exports.getPublicComments = function (params) {return (0, _request.default)("/project/discuss/".concat(params.projectId), "GET", params);};
/* 新建公开评论 */
exports.postPublicComment = function (data) {return (0, _request.default)("/project/discuss", "POST", data);};
/* 删除公开评论 */
exports.deletePublicComment = function (commentId) {return (0, _request.default)("/project/discuss/".concat(commentId), "DELETE", {});};

/* 判断是否收藏 */
exports.isCollected = function (projectId) {return (0, _request.default)("/project/collection/check/".concat(projectId), "GET", {});};
/* 收藏项目 */
exports.collectProject = function (projectId) {return (0, _request.default)("/project/collection/".concat(projectId), "POST", {});};
/* 取消收藏 */
exports.cancleCollectProject = function (projectId) {return (0, _request.default)("/project/collection/".concat(projectId), "DELETE", {});};

/* 获取项目所有资源信息 */
exports.getResources = function (params) {return (0, _request.default)("/project/".concat(params.projectId, "/resources"), "GET", params);};
/* 获取上传文件签名 */
exports.getFilesSignature = function (projectId, filename) {return (0, _request.default)("/project/".concat(projectId, "/resources/sign/upload/private?filename=").concat(filename), "GET", {});};
/* 创建项目的资源信息 */
exports.postResource = function (projectId, data) {return (0, _request.default)("/project/resource/".concat(projectId), "POST", data);};
/* 删除资源 */
exports.deleteResource = function (projectResourceId) {return (0, _request.default)("/project/resource/".concat(projectResourceId), "DELETE", {});};
/* 修改资源信息 */
exports.putResource = function (projectResourceId, data) {return (0, _request.default)("/project/resource/".concat(projectResourceId), "PUT", data);};
/* 获取下载签名 */
exports.getLoadSignature = function (projectResourceId) {return (0, _request.default)("/project/resource/".concat(projectResourceId, "/sign/download"), "GET", {});};
/* 获取阅读签名 */
exports.getReadSignature = function (projectResourceId) {return (0, _request.default)("/project/resource/".concat(projectResourceId, "/sign/read"), "GET", {});};

/* 创建成员 */
exports.postMember = function (projectId, data) {return (0, _request.default)("/project/member/".concat(projectId), "POST", data);};
/* 更新成员 */
exports.putMember = function (projectId, memberUserId, data) {return (0, _request.default)("/project/member/".concat(projectId, "/").concat(memberUserId), "PUT", data);};
/* 批量更新成员 */
exports.putMembers = function (projectId, data) {return (0, _request.default)("/project/members/".concat(projectId), "PUT", data);};
/* 删除成员 */
exports.deleteMember = function (projectId, memberPhone) {return (0, _request.default)("/project/member/".concat(projectId, "/").concat(memberPhone), "DELETE", {});};

/* 申请认领资源 */
exports.postApplyProject = function (data) {return (0, _request.default)("/project/find", "POST", data);};
/* 修改申请 */
exports.putApplyProject = function (data) {return (0, _request.default)("/project/find/".concat(data.applyingID), "PUT", data);};
/* 判断用户是否已经提交认领 */
exports.getApplyProject = function (projectId) {return (0, _request.default)("/project/find/judge/".concat(projectId), "GET", {});};

/***/ }),

/***/ 23:
/*!************************************************!*\
  !*** D:/服务外包/竞赛统计/static/request/api_login.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.loginOut = exports.WXLogin = exports.Login = exports.ChangePassword = exports.Register = exports.sendCode = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* 
                                                                                                                                                                                                                                                                                                                                                                   	description: 发送验证码
                                                                                                                                                                                                                                                                                                                                                                   	input: 
                                                                                                                                                                                                                                                                                                                                                                   			phone: String,手机号
                                                                                                                                                                                                                                                                                                                                                                   			type: String,取值register、changePassword、bindPhone
                                                                                                                                                                                                                                                                                                                                                                   	return: null
                                                                                                                                                                                                                                                                                                                                                                   */
var sendCode = function sendCode(data) {return (0, _request.default)("/sms/code", "POST", data);};

/* 
                                                                                                   	description: 用户注册
                                                                                                   	input: 
                                                                                                   				phone: String,手机号
                                                                                                   				password: String,密码
                                                                                                   				code: String,验证码
                                                                                                   	return: 
                                                                                                   				token: String
                                                                                                   				userInfo: Object,用户信息
                                                                                                   */exports.sendCode = sendCode;
var Register = function Register(data) {return (0, _request.default)("/register/phone", "POST", data);};

/* 
                                                                                                         	description: 修改密码
                                                                                                         	input: 
                                                                                                         				newPassword: String,新密码
                                                                                                         				code: String,验证码
                                                                                                         	return: null
                                                                                                         */exports.Register = Register;
var ChangePassword = function ChangePassword(data) {return (0, _request.default)("/changePassword/phone/".concat(data.phone, " "), "POST", data);};

/* 
                                                                                                                                                    	description: 用户手机登录
                                                                                                                                                    	input: 
                                                                                                                                                    				phone: String,手机号
                                                                                                                                                    				password: String,密码
                                                                                                                                                    	return: 
                                                                                                                                                    				token: String
                                                                                                                                                    				userInfo: Object,用户信息
                                                                                                                                                    */exports.ChangePassword = ChangePassword;
var Login = function Login(data) {return (0, _request.default)("/login/phone", "POST", data);};

/* 
                                                                                                	description: 微信登录
                                                                                                	input: 
                                                                                                				code: String,微信用户表示码
                                                                                                	return: 
                                                                                                				token: String
                                                                                                				userInfo: Object,用户信息
                                                                                                */exports.Login = Login;
var WXLogin = function WXLogin(data) {return (0, _request.default)("/login/wechat", "POST", data);};

/* 退出登录 */exports.WXLogin = WXLogin;
var loginOut = function loginOut() {return (0, _request.default)("/logout ", "GET", {});};exports.loginOut = loginOut;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 383:
/*!************************************************!*\
  !*** D:/服务外包/竞赛统计/static/request/api_forum.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getTalents = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* 获取用户列表 */
var getTalents = function getTalents() {return (0, _request.default)("/talentMarket", "GET", {});};exports.getTalents = getTalents;

/***/ }),

/***/ 4:
/*!*******************************!*\
  !*** D:/服务外包/竞赛统计/pages.json ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 60:
/*!******************************************************!*\
  !*** D:/服务外包/竞赛统计/static/request/api_competition.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getAllCompetition = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/*  获取所有竞赛信息 */
var getAllCompetition = function getAllCompetition() {return (0, _request.default)("/competition", "GET", {});};exports.getAllCompetition = getAllCompetition;

/***/ }),

/***/ 61:
/*!*************************************************!*\
  !*** D:/服务外包/竞赛统计/static/request/api_system.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.useCDKEY = exports.getSlideCard = exports.feedbackProblem = exports.getFeedbackMe = exports.getNotice = void 0;var _request = _interopRequireDefault(__webpack_require__(/*! ./request.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/* 获取系统公告 */
var getNotice = function getNotice() {return (0, _request.default)("/notice", "GET", {});};
/* 获取我的反馈 */exports.getNotice = getNotice;
var getFeedbackMe = function getFeedbackMe(param) {return (0, _request.default)("/feedback/me", "GET", param);};
/* 反馈问题 */exports.getFeedbackMe = getFeedbackMe;
var feedbackProblem = function feedbackProblem(data) {return (0, _request.default)("/feedback", "POST", data);};
/* 获取轮播图 */exports.feedbackProblem = feedbackProblem;
var getSlideCard = function getSlideCard() {return (0, _request.default)("/slideShow", "GET", {});};
/* 使用兑换码 */exports.getSlideCard = getSlideCard;
var useCDKEY = function useCDKEY(code) {return (0, _request.default)("/activity/code?code=" + code, "POST", {});};exports.useCDKEY = useCDKEY;

/***/ }),

/***/ 8:
/*!********************************************!*\
  !*** D:/服务外包/竞赛统计/static/js/globalData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  baseUrl: 'https://ahapocket.cn/api',
  env: 0, // 0开发，1体验，2上线
  gCodeTime: 0, // 用户允许发送验证码的倒计时
  gCodeMaxTime: 10, // 倒计时时长
  gUserInfo: {}, // 用户信息
  gEditContent: "", // 编辑内容
  Competitions: [], // 所有比赛
  garr_prizeLevels: [//获奖等级
  { label: '保研国一', value: 53, max: 4000, min: 2000, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/43.png" },
  { label: '保研国二', value: 52, max: 3000, min: 1500, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/42.png" },
  { label: '保研国三', value: 51, max: 2000, min: 1000, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/41.png" },
  { label: '国一', value: 43, max: 3500, min: 1750, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/43.png" },
  { label: '国二', value: 42, max: 2500, min: 1250, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/42.png" },
  { label: '国三', value: 41, max: 1500, min: 750, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/41.png" },
  { label: '省一', value: 33, max: 2000, min: 1000, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/33.png" },
  { label: '省二', value: 32, max: 1400, min: 700, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/32.png" },
  { label: '省三', value: 31, max: 800, min: 400, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/31.png" },
  { label: '市一', value: 23, max: 1200, min: 600, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/23.png" },
  { label: '市二', value: 22, max: 600, min: 300, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/22.png" },
  { label: '市三', value: 21, max: 400, min: 200, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/21.png" },
  { label: '校一', value: 13, max: 300, min: 150, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/13.png" },
  { label: '校二', value: 12, max: 200, min: 100, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/12.png" },
  { label: '校三', value: 11, max: 100, min: 50, src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/media/11.png" }],

  compType: [//比赛类型
  { label: "经济类", value: 1 },
  { label: "管理类", value: 2 },
  { label: "法学类", value: 3 },
  { label: "公管类", value: 4 },
  { label: "语言类", value: 5 },
  { label: "艺术传媒类", value: 6 },
  { label: "学科类", value: 7 },
  { label: "计算机类", value: 8 },
  { label: "机械类", value: 9 },
  { label: "建筑类", value: 10 },
  { label: "化工类", value: 11 },
  { label: "科研创业类", value: 12 }],

  feedbackTypes: [//反馈类型
  { label: "平台BUG", value: 0 },
  { label: "平台体验修改建议", value: 1 },
  { label: "劣质项目", value: 2 },
  { label: "订单缺失/购买错误", value: 3 }],

  arr_fileClassify: [//附件分类
  { label: "PPT", value: 1, rate: 1 },
  { label: "文档", value: 2, rate: 3 },
  { label: "论文", value: 3, rate: 1 },
  { label: "成果展示", value: 4, rate: 1 },
  { label: "竞赛心得", value: 5, rate: 0.5 }],

  arr_fileTypes: [//附件类型
  { label: "图片", value: 0, reg: /\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/i }, //图片
  { label: "视频/音频", value: 1, reg: /\.(avi|wmv|mpg|mpeg|mov|rm|ram|swf|raw|flv|mp4|mp3|wma|avi|rmvb|mkv)$/i }, //视频,音频
  { label: "文档/PPT", value: 2, reg: /\.(txt|doc|docx|ppt|pptx|csv|xls|xlsx|pdf)$/i }, //文档
  { label: "其他", value: 3, reg: /./ } //其他
  ],
  arr_ordersType: [//订单类型
  { label: "Aha币充值", type: 1, order: null },
  { label: "活动赠送", type: 2, order: null },
  { label: "注册赠送", type: 3, order: null },
  { label: "签到奖励", type: 4, order: null },
  { label: "附件购买", type: 5, order: null },
  { label: "项目购买返利", type: 6, order: null },
  { label: "邀请好友", type: 7, order: null },
  { label: "项目上传奖励", type: 8, order: null },
  { label: "Aha币提现", type: 9, order: null }],

  arr_userLevel: [//用户等级类型
  { label: "Aha萌新", src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/userLevel/1.png", totalContribPoint: 3000 },
  { label: "Aha进阶", src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/userLevel/2.png", totalContribPoint: 6000 },
  { label: "Aha小佬", src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/userLevel/3.png", totalContribPoint: 10000 },
  { label: "Aha大佬", src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/userLevel/4.png", totalContribPoint: 12000 },
  { label: "Aha巨佬", src: "https://aha-public-1257019972.cos.ap-shanghai.myqcloud.com/icon/userLevel/5.png", totalContribPoint: 1000000000 }] };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map