/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_fix-re-wks.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_flags.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_inherit-if-required.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var MATCH = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-species.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.constructor.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ "./node_modules/core-js/modules/_inherit-if-required.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
var $flags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  re2[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ "./node_modules/core-js/modules/_set-species.js")('RegExp');


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.flags.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js")
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.replace.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.split.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ "./node_modules/core-js/modules/_fix-re-wks.js")('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ "./node_modules/core-js/modules/_is-regexp.js");
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ "./node_modules/core-js/modules/es6.regexp.flags.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var $flags = __webpack_require__(/*! ./_flags */ "./node_modules/core-js/modules/_flags.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.includes.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var $includes = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/core-js/modules/_add-to-unscopables.js")('includes');


/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/css/styles.scss":
/*!************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/css/styles.scss ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "* {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n\nbody {\n  margin: 0;\n  padding: 20px 60px; }\n  @media all and (max-width: 600px) {\n    body {\n      padding: 20px 30px; } }\n  @media all and (max-height: 500px) {\n    body {\n      padding: 10px 20px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    body {\n      padding: 10px 14px; } }\n\nhtml,\nbody {\n  background-color: #2e3745; }\n\np {\n  margin: 0; }\n\nheader {\n  height: 70px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px; }\n  @media all and (max-width: 1279px) {\n    header {\n      height: auto; } }\n  @media all and (max-width: 600px) {\n    header {\n      height: auto;\n      margin-bottom: 15px; } }\n  @media all and (max-height: 500px) {\n    header {\n      height: auto;\n      padding: 3px 5px 10px 5px;\n      margin-bottom: 0; } }\n\n.logo {\n  width: 210px;\n  margin-left: 40px; }\n  @media all and (max-width: 1919px) {\n    .logo {\n      width: 183px; } }\n  @media all and (max-width: 1279px) {\n    .logo {\n      width: 146px; } }\n  @media all and (max-width: 600px) {\n    .logo {\n      width: 115px;\n      margin-left: 0; } }\n\n.connection {\n  display: flex;\n  align-items: center; }\n\n.connection__icon {\n  height: 28px;\n  width: 30px;\n  margin-right: 15px; }\n  @media all and (max-width: 1919px) {\n    .connection__icon {\n      height: 18px;\n      width: 19px; } }\n  @media all and (max-width: 1279px) {\n    .connection__icon {\n      height: 14px;\n      width: 15px; } }\n  @media all and (max-width: 600px) {\n    .connection__icon {\n      height: 12px;\n      width: 12px;\n      margin-right: 5px; } }\n\n.metric {\n  margin-bottom: 40px;\n  height: 150px;\n  padding: 33px 40px 33px 40px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-sizing: border-box;\n  border-radius: 16.6px;\n  background-color: #121a28; }\n  @media all and (max-width: 1919px) {\n    .metric {\n      height: 100px;\n      padding: 20px 40px 20px 40px; } }\n  @media all and (max-width: 1279px) {\n    .metric {\n      height: 80px;\n      padding: 17px 35px 17px 35px;\n      margin-bottom: 20px; } }\n  @media all and (max-width: 600px) {\n    .metric {\n      margin-bottom: 20px; } }\n  @media all and (max-height: 500px) {\n    .metric {\n      margin-bottom: 10px;\n      height: 70px;\n      padding: 14px 25px 14px 25px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .metric {\n      height: 60px;\n      flex-direction: row;\n      padding: 14px; } }\n\n.multi-metric-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center; }\n  @media all and (max-width: 1023px) {\n    .multi-metric-container {\n      flex-direction: column; } }\n  @media all and (max-height: 500px) {\n    .multi-metric-container {\n      flex-direction: row; } }\n\n@media all and (max-width: 800px) {\n  .metric__container {\n    flex-direction: column;\n    height: 180px;\n    align-items: flex-start; } }\n\n@media all and (max-width: 600px) {\n  .metric__container {\n    height: 140px; } }\n\n@media all and (max-height: 500px) {\n  .metric__container {\n    height: 70px;\n    flex-direction: row; } }\n\n@media all and (max-height: 400px) and (max-width: 400px) {\n  .metric__container {\n    height: 100px;\n    flex-direction: column; } }\n\n.metric--small {\n  width: calc(50% - 10px); }\n  @media all and (max-width: 1023px) {\n    .metric--small {\n      width: 100%; } }\n  @media all and (max-height: 500px) {\n    .metric--small {\n      width: calc(50% - 10px); } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .metric--small {\n      width: calc(50% - 5px); } }\n\n.metric__icon {\n  height: 100%; }\n\n.metric__container--left {\n  display: flex;\n  height: 100%;\n  align-items: center; }\n  @media all and (max-width: 800px) {\n    .metric__container--left {\n      height: 60px; } }\n  @media all and (max-height: 500px) {\n    .metric__container--left {\n      height: 100%; } }\n  @media all and (max-width: 600px) {\n    .metric__container--left {\n      height: 40px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .metric__container--left {\n      width: 100%;\n      height: 30px; } }\n\n.metric__value-container {\n  margin-right: auto;\n  margin-left: 40px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between; }\n  @media all and (max-width: 600px) {\n    .metric__value-container {\n      margin-left: 25px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .metric__value-container {\n      margin-left: 10px; } }\n\n.metric__value-container--centered {\n  justify-content: center; }\n\n.metric__values {\n  display: flex; }\n\n.disconnected .metric__values,\n.disconnected button span,\n.disconnected .text--bottom-align {\n  opacity: 0.5; }\n\n.value {\n  width: 65px; }\n  @media all and (max-width: 1919px) {\n    .value {\n      width: 55px; } }\n  @media all and (max-width: 1279px) {\n    .value {\n      width: 45px; } }\n  @media all and (max-height: 500px) {\n    .value {\n      width: auto; } }\n\n.value:not(:first-child) {\n  text-align: center;\n  padding-left: 35px;\n  border-left: 0.5px solid rgba(255, 255, 255, 0.29); }\n  @media all and (max-width: 1919px) {\n    .value:not(:first-child) {\n      padding-left: 25px; } }\n  @media all and (max-width: 1279px) {\n    .value:not(:first-child) {\n      padding-left: 15px; } }\n  @media all and (max-height: 500px) and (max-width: 600px) {\n    .value:not(:first-child) {\n      padding-left: 5px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .value:not(:first-child) {\n      padding-left: 2px; } }\n\n.value:not(:last-child) {\n  padding-right: 35px; }\n  @media all and (max-width: 1919px) {\n    .value:not(:last-child) {\n      padding-right: 25px; } }\n  @media all and (max-width: 1279px) {\n    .value:not(:last-child) {\n      padding-right: 15px; } }\n  @media all and (max-width: 600px) {\n    .value:not(:last-child) {\n      padding-right: 10px; } }\n  @media all and (max-height: 500px) {\n    .value:not(:last-child) {\n      padding-right: 5px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .value:not(:last-child) {\n      padding-right: 2px; } }\n\n.metrics-selector {\n  height: 100%;\n  width: calc(50% - 45px);\n  display: flex;\n  justify-content: space-between; }\n  @media all and (max-width: 1919px) {\n    .metrics-selector {\n      width: calc(50% - 40px); } }\n  @media all and (max-width: 1279px) {\n    .metrics-selector {\n      width: calc(50% - 37px); } }\n  @media all and (max-width: 800px) {\n    .metrics-selector {\n      height: 40px;\n      width: 100%; } }\n  @media all and (max-height: 500px) {\n    .metrics-selector {\n      width: calc(50% - 25px); } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .metrics-selector {\n      height: 30px;\n      width: 100%; } }\n\n.selector-button {\n  background-color: #0a101f;\n  color: white;\n  height: 100%;\n  border: none;\n  border-radius: 6px;\n  flex-grow: 1;\n  cursor: pointer;\n  line-height: 1.2; }\n\n.selector-button:not(:first-child) {\n  margin-left: 10px; }\n\n.selector-button:focus {\n  outline: 0; }\n\n.selector-button--active, .selector-button__amperage:active {\n  background-color: #30afff; }\n\n@media all and (max-height: 400px) and (max-width: 400px) {\n  .metric--shore-input-limit {\n    padding: 8px; } }\n\n.metric--shore-input-limit > .selector-button > span:first-child {\n  margin-right: 10px; }\n  @media all and (max-width: 600px) {\n    .metric--shore-input-limit > .selector-button > span:first-child {\n      margin-right: 5px; } }\n\n.metric__shore-input-limit--not-adjustable {\n  width: 100%;\n  text-align: center; }\n\n.metric__mode--readonly {\n  width: calc(50% - 40px); }\n\n.metric__battery {\n  background-image: url(" + escape(__webpack_require__(/*! ../images/boat.png */ "./src/images/boat.png")) + ");\n  background-repeat: no-repeat;\n  background-position: right;\n  background-size: auto 100%; }\n  @media all and (max-width: 800px) {\n    .metric__battery {\n      background-position: bottom right;\n      background-size: auto 50%; } }\n  @media all and (max-height: 500px) {\n    .metric__battery {\n      flex-direction: row;\n      background-position: right;\n      background-size: auto 100%;\n      height: 70px; } }\n  @media all and (max-height: 500px) and (max-width: 600px) {\n    .metric__battery {\n      background-image: none;\n      flex-direction: row;\n      height: 70px;\n      align-items: center; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .metric__battery {\n      height: 60px; } }\n\n.metric__battery-level-container {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  height: 55px;\n  width: calc(50% - 45px); }\n  .metric__battery-level-container--col {\n    flex-direction: column;\n    align-items: flex-start;\n    justify-content: center; }\n  @media all and (max-width: 1919px) {\n    .metric__battery-level-container {\n      width: calc(50% - 40px); } }\n  @media all and (max-width: 1279px) {\n    .metric__battery-level-container {\n      width: calc(50% - 37px); } }\n  @media all and (max-height: 500px) and (max-width: 600px) {\n    .metric__battery-level-container {\n      width: 30%; } }\n\n.text--bottom-align {\n  display: flex;\n  align-items: flex-end; }\n\n.text--bottom-align > .text--large {\n  line-height: 1; }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .text--bottom-align > .text--large {\n      line-height: initial; } }\n\n.amperage-selector__container {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.amperage-selector__description {\n  margin-bottom: 10px; }\n\n.amperage-selector {\n  padding: 25px;\n  border-radius: 16.6px;\n  background-color: #121a28; }\n  @media all and (max-width: 600px) {\n    .amperage-selector {\n      margin: 20px 10px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .amperage-selector {\n      padding: 15px; } }\n  @media screen and (max-width: 1070px) {\n    .amperage-selector {\n      width: 750px; } }\n  @media screen and (max-width: 920px) {\n    .amperage-selector {\n      width: 600px; } }\n  @media screen and (max-width: 770px) {\n    .amperage-selector {\n      width: 450px; } }\n  @media screen and (max-width: 620px) {\n    .amperage-selector {\n      width: 100%; } }\n\n.selector-button__amperage {\n  margin: 10px;\n  max-width: 130px;\n  min-width: 130px;\n  height: 125px; }\n  @media all and (max-width: 1279px) {\n    .selector-button__amperage {\n      max-width: 110px;\n      min-width: 110px;\n      height: 110px; } }\n  @media all and (max-height: 500px) and (max-width: 600px) {\n    .selector-button__amperage {\n      max-width: 70px;\n      min-width: 70px;\n      height: 70px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .selector-button__amperage {\n      max-width: 50px;\n      min-width: 50px;\n      height: 50px;\n      margin: 5px; } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/css/texts.scss":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/css/texts.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: Roboto;\n  src: url(" + escape(__webpack_require__(/*! ./Roboto-Normal.ttf */ "./src/css/Roboto-Normal.ttf")) + "), url(" + escape(__webpack_require__(/*! ./Roboto-Medium.ttf */ "./src/css/Roboto-Medium.ttf")) + ") url(" + escape(__webpack_require__(/*! ./Roboto-Bold.ttf */ "./src/css/Roboto-Bold.ttf")) + "); }\n\n* {\n  font-family: Roboto, sans-serif; }\n\n.text {\n  color: white;\n  font-weight: 400;\n  font-size: 30px; }\n  @media all and (max-width: 1919px) {\n    .text {\n      font-size: 20px; } }\n  @media all and (max-width: 1279px) {\n    .text {\n      font-size: 16px; } }\n  @media all and (max-width: 600px) {\n    .text {\n      font-size: 14px; } }\n  @media all and (max-height: 500px) {\n    .text {\n      font-size: 12px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .text {\n      font-size: 10px; } }\n\n.text--large {\n  color: white;\n  font-weight: 400;\n  font-size: 35px; }\n  @media all and (max-width: 1919px) {\n    .text--large {\n      font-size: 25px; } }\n  @media all and (max-width: 1279px) {\n    .text--large {\n      font-size: 20px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .text--large {\n      font-size: 14px; } }\n\n.text--very-large {\n  font-size: 60px; }\n  @media all and (max-width: 1919px) {\n    .text--very-large {\n      font-size: 40px; } }\n  @media all and (max-width: 1279px) {\n    .text--very-large {\n      font-size: 32px; } }\n  @media all and (max-width: 600px) {\n    .text--very-large {\n      font-size: 28px; } }\n  @media all and (max-height: 500px) {\n    .text--very-large {\n      font-size: 28px; } }\n  @media all and (max-height: 400px) and (max-width: 400px) {\n    .text--very-large {\n      font-size: 20px; } }\n\n.text--small {\n  font-size: 27px; }\n  @media all and (max-width: 1919px) {\n    .text--small {\n      font-size: 18px; } }\n  @media all and (max-width: 1279px) {\n    .text--small {\n      font-size: 15px; } }\n  @media all and (max-height: 500px) {\n    .text--small {\n      font-size: 11px; } }\n\n.text--very-small {\n  font-size: 22px; }\n  @media all and (max-width: 1919px) {\n    .text--very-small {\n      font-size: 15px; } }\n  @media all and (max-width: 1279px) {\n    .text--very-small {\n      font-size: 12px; } }\n  @media all and (max-width: 600px) {\n    .text--very-small {\n      font-size: 10px; } }\n\n.text--medium {\n  font-weight: 500;\n  text-transform: uppercase; }\n\n.text--bold {\n  font-weight: 700; }\n\n.text--center {\n  text-align: center; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/preact/dist/preact.mjs":
/*!*********************************************!*\
  !*** ./node_modules/preact/dist/preact.mjs ***!
  \*********************************************/
/*! exports provided: default, h, createElement, cloneElement, Component, render, rerender, options */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
var VNode = function VNode() {};

var options = {};

var stack = [];

var EMPTY_CHILDREN = [];

function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		try {
			node[name] = value == null ? '' : value;
		} catch (e) {}
		if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

var mounts = [];

var diffLevel = 0;

var isSvgMode = false;

var hydrating = false;

function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	if (!diffLevel++) {
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	if (! --diffLevel) {
		hydrating = false;

		if (!componentRoot) flushMounts();
	}

	return ret;
}

function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	if (typeof vnode === 'string' || typeof vnode === 'number') {
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			}
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	} else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	diffAttributes(out, vnode.attributes, props);

	isSvgMode = prevSvgMode;

	return out;
}

function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			} else if (min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		unmountComponent(component);
	} else {
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

function diffAttributes(dom, attrs, old) {
	var name;

	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

var recyclerComponents = [];

function createComponent(Ctor, props, context) {
	var inst,
	    i = recyclerComponents.length;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	while (i--) {
		if (recyclerComponents[i].constructor === Ctor) {
			inst.nextBase = recyclerComponents[i].nextBase;
			recyclerComponents.splice(i, 1);
			return inst;
		}
	}

	return inst;
}

function doRender(props, state, context) {
	return this.constructor(props, context);
}

function setComponentProps(component, props, renderMode, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	component.__ref = props.ref;
	component.__key = props.key;
	delete props.ref;
	delete props.key;

	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
		if (!component.base || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		} else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (renderMode !== 0) {
		if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

function renderComponent(component, renderMode, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    snapshot = previousContext,
	    rendered,
	    inst,
	    cbase;

	if (component.constructor.getDerivedStateFromProps) {
		state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
		component.state = state;
	}

	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		if (isUpdate && component.getSnapshotBeforeUpdate) {
			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || renderMode === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, snapshot);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	while (component._renderCallbacks.length) {
		component._renderCallbacks.pop().call(component);
	}if (!diffLevel && !isChild) flushMounts();
}

function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;

			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		recyclerComponents.push(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

function Component(props, context) {
	this._dirty = true;

	this.context = context;

	this.props = props;

	this.state = this.state || {};

	this._renderCallbacks = [];
}

extend(Component.prototype, {
	setState: function setState(state, callback) {
		if (!this.prevState) this.prevState = this.state;
		this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
		if (callback) this._renderCallbacks.push(callback);
		enqueueRender(this);
	},
	forceUpdate: function forceUpdate(callback) {
		if (callback) this._renderCallbacks.push(callback);
		renderComponent(this, 2);
	},
	render: function render() {}
});

function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

/* harmony default export */ __webpack_exports__["default"] = (preact);

//# sourceMappingURL=preact.mjs.map


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/app/components/AcLoads.js":
/*!***************************************!*\
  !*** ./src/app/components/AcLoads.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _NumericValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NumericValue */ "./src/app/components/NumericValue.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var AcLoads =
/*#__PURE__*/
function (_Component) {
  _inherits(AcLoads, _Component);

  function AcLoads() {
    _classCallCheck(this, AcLoads);

    return _possibleConstructorReturn(this, _getPrototypeOf(AcLoads).apply(this, arguments));
  }

  _createClass(AcLoads, [{
    key: "render",
    value: function render(props, state) {
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric metric--small"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
        src: "./images/icons/ac.svg",
        className: "metric__icon"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__value-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        className: "text text--medium"
      }, "AC Loads"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__values"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_1__["default"], {
        value: props.voltage.phase1,
        unit: "V"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_1__["default"], {
        value: props.current.phase1 ? props.current.phase1 + props.current.phase2 + props.current.phase3 : null,
        unit: "A",
        precision: 1
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_1__["default"], {
        value: props.power.phase1 ? props.power.phase1 + props.power.phase2 + props.power.phase3 : null,
        unit: "W"
      }))));
    }
  }]);

  return AcLoads;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (AcLoads);

/***/ }),

/***/ "./src/app/components/ActiveSource.js":
/*!********************************************!*\
  !*** ./src/app/components/ActiveSource.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _service_topics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/topics */ "./src/service/topics.js");
/* harmony import */ var _NumericValue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NumericValue */ "./src/app/components/NumericValue.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var getActiveSource = function getActiveSource(_ref) {
  var activeInput = _ref.activeInput,
      settings = _ref.settings;
  var activeSource;

  switch (activeInput) {
    case _service_topics__WEBPACK_IMPORTED_MODULE_1__["ACTIVE_INPUT"].INPUT_0:
      activeSource = settings.input0;
      break;

    case _service_topics__WEBPACK_IMPORTED_MODULE_1__["ACTIVE_INPUT"].INPUT_1:
      activeSource = settings.input1;
      break;

    case _service_topics__WEBPACK_IMPORTED_MODULE_1__["ACTIVE_INPUT"].NONE:
      activeSource = null;

    default:
      break;
  }

  return activeSource;
};

var ActiveSource =
/*#__PURE__*/
function (_Component) {
  _inherits(ActiveSource, _Component);

  function ActiveSource() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ActiveSource);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ActiveSource)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activeSourceLabel", {
      [_service_topics__WEBPACK_IMPORTED_MODULE_1__["AC_SOURCE_TYPE"].SHORE]: "Shore Power",
      [_service_topics__WEBPACK_IMPORTED_MODULE_1__["AC_SOURCE_TYPE"].GRID]: "Grid Input",
      [_service_topics__WEBPACK_IMPORTED_MODULE_1__["AC_SOURCE_TYPE"].GENERATOR]: "Generator",
      [_service_topics__WEBPACK_IMPORTED_MODULE_1__["AC_SOURCE_TYPE"].NOT_IN_USE]: "Invalid Configuration" // You cannot have a source that isn't configured as active!

    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activeSourceIcon", {
      [_service_topics__WEBPACK_IMPORTED_MODULE_1__["AC_SOURCE_TYPE"].SHORE]: "./images/icons/shore-power.svg",
      [_service_topics__WEBPACK_IMPORTED_MODULE_1__["AC_SOURCE_TYPE"].GRID]: "./images/icons/shore-power.svg",
      [_service_topics__WEBPACK_IMPORTED_MODULE_1__["AC_SOURCE_TYPE"].GENERATOR]: "./images/icons/generator.svg",
      [_service_topics__WEBPACK_IMPORTED_MODULE_1__["AC_SOURCE_TYPE"].NOT_IN_USE]: "./images/icons/shore-power.svg"
    });

    return _this;
  }

  _createClass(ActiveSource, [{
    key: "render",
    value: function render(props, state) {
      var activeSource = getActiveSource(props);

      if (activeSource === undefined) {
        return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(ActiveSourceMetric, {
          title: "...",
          icon: "./images/icons/shore-power.svg"
        });
      }

      if (activeSource === null) {
        return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(NoActiveSource, null);
      }

      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(ActiveSourceMetric, {
        title: this.activeSourceLabel[activeSource],
        icon: this.activeSourceIcon[activeSource],
        voltage: props.voltage.phase1,
        current: props.current.phase1 + props.current.phase2 + props.current.phase3,
        power: props.power.phase1 + props.power.phase2 + props.power.phase3
      });
    }
  }]);

  return ActiveSource;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var NoActiveSource =
/*#__PURE__*/
function (_Component2) {
  _inherits(NoActiveSource, _Component2);

  function NoActiveSource() {
    _classCallCheck(this, NoActiveSource);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoActiveSource).apply(this, arguments));
  }

  _createClass(NoActiveSource, [{
    key: "render",
    value: function render(props, state) {
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric metric--small"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
        src: "./images/icons/shore-power.svg",
        className: "metric__icon"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__value-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        className: "text text--medium"
      }, "Shore power"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "text"
      }, "Unplugged")));
    }
  }]);

  return NoActiveSource;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var ActiveSourceMetric =
/*#__PURE__*/
function (_Component3) {
  _inherits(ActiveSourceMetric, _Component3);

  function ActiveSourceMetric() {
    _classCallCheck(this, ActiveSourceMetric);

    return _possibleConstructorReturn(this, _getPrototypeOf(ActiveSourceMetric).apply(this, arguments));
  }

  _createClass(ActiveSourceMetric, [{
    key: "render",
    value: function render(props, state) {
      var hasValues = props.voltage || props.current || props.power;
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric metric--small"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
        src: props.icon,
        className: "metric__icon"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__value-container" + (hasValues ? "" : " metric__value-container--centered")
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        className: "text text--medium"
      }, props.title), hasValues && Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__values"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_2__["default"], {
        value: props.voltage,
        unit: "V"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_2__["default"], {
        value: props.current,
        unit: "A",
        precision: 1
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_2__["default"], {
        value: props.power,
        unit: "W"
      }))));
    }
  }]);

  return ActiveSourceMetric;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ActiveSource);

/***/ }),

/***/ "./src/app/components/Battery.js":
/*!***************************************!*\
  !*** ./src/app/components/Battery.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _NumericValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NumericValue */ "./src/app/components/NumericValue.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Battery =
/*#__PURE__*/
function (_Component) {
  _inherits(Battery, _Component);

  function Battery() {
    _classCallCheck(this, Battery);

    return _possibleConstructorReturn(this, _getPrototypeOf(Battery).apply(this, arguments));
  }

  _createClass(Battery, [{
    key: "render",
    value: function render(props, state) {
      var showTimetoGo = props.state === "Discharging";
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric metric__container metric__battery"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__container--left"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
        src: "./images/icons/battery.svg",
        className: "metric__icon"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__value-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        className: "text text--medium"
      }, "Battery"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__values"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_1__["default"], {
        value: props.voltage,
        unit: "V",
        precision: 1
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_1__["default"], {
        value: props.current,
        unit: "A",
        precision: 1
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_1__["default"], {
        value: props.power,
        unit: "W"
      })))), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__battery-level-container" + (showTimetoGo ? " metric__battery-level-container--col" : "")
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "text--bottom-align"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
        className: "text text--bold text--large"
      }, props.soc ? props.soc : ""), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
        className: "text text--small metric__battery-state"
      }, props.soc ? "%" : "", "\xA0", props.state || "")), showTimetoGo && props.timeToGo ? Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        className: "text text--small"
      }, props.timeToGo) : ""));
    }
  }]);

  return Battery;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Battery);

/***/ }),

/***/ "./src/app/components/DcLoads.js":
/*!***************************************!*\
  !*** ./src/app/components/DcLoads.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _NumericValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NumericValue */ "./src/app/components/NumericValue.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var DcLoads =
/*#__PURE__*/
function (_Component) {
  _inherits(DcLoads, _Component);

  function DcLoads() {
    _classCallCheck(this, DcLoads);

    return _possibleConstructorReturn(this, _getPrototypeOf(DcLoads).apply(this, arguments));
  }

  _createClass(DcLoads, [{
    key: "render",
    value: function render(props, state) {
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric metric--small"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
        src: "./images/icons/dc.svg",
        className: "metric__icon"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__value-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        className: "text text--medium"
      }, "DC Loads"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__values"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_1__["default"], {
        value: props.batteryVoltage ? props.power / props.batteryVoltage : null,
        unit: "A",
        precision: 1
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])(_NumericValue__WEBPACK_IMPORTED_MODULE_1__["default"], {
        value: props.power,
        unit: "W"
      }))));
    }
  }]);

  return DcLoads;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (DcLoads);

/***/ }),

/***/ "./src/app/components/InverterCharger.js":
/*!***********************************************!*\
  !*** ./src/app/components/InverterCharger.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _service_topics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../service/topics */ "./src/service/topics.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var InverterCharger =
/*#__PURE__*/
function (_Component) {
  _inherits(InverterCharger, _Component);

  function InverterCharger() {
    _classCallCheck(this, InverterCharger);

    return _possibleConstructorReturn(this, _getPrototypeOf(InverterCharger).apply(this, arguments));
  }

  _createClass(InverterCharger, [{
    key: "render",
    value: function render(props, state) {
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric metric__container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__container--left"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
        src: "./images/icons/multiplus.svg",
        className: "metric__icon"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__value-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        className: "text text--medium"
      }, "Inverter/charger"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric__values"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
        className: "text"
      }, props.state)))), props.isAdjustable ? Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metrics-selector"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
        className: "selector-button text" + (props.activeMode == "ON" ? " selector-button--active" : ""),
        onClick: function onClick() {
          return props.onModeSelected(_service_topics__WEBPACK_IMPORTED_MODULE_1__["SYSTEM_MODE"].ON);
        }
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", null, "On")), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
        className: "selector-button text" + (props.activeMode == "OFF" ? " selector-button--active" : ""),
        onClick: function onClick() {
          return props.onModeSelected(_service_topics__WEBPACK_IMPORTED_MODULE_1__["SYSTEM_MODE"].OFF);
        }
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", null, "Off")), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
        className: "selector-button text" + (props.activeMode == "Charger only" ? " selector-button--active" : ""),
        onClick: function onClick() {
          return props.onModeSelected(_service_topics__WEBPACK_IMPORTED_MODULE_1__["SYSTEM_MODE"].CHARGER_ONLY);
        }
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", null, "Charger only"))) : Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metrics-selector"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
        disabled: true,
        className: "selector-button selector-button--disabled  text" + (props.activeMode == "ON" ? " selector-button--active" : "")
      }, "On"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
        disabled: true,
        className: "selector-button selector-button--disabled text" + (props.activeMode == "OFF" ? " selector-button--active" : "")
      }, "Off"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
        disabled: true,
        className: "selector-button selector-button--disabled text" + (props.activeMode == "Charger only" ? " selector-button--active" : "")
      }, "Charger only")));
    }
  }]);

  return InverterCharger;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (InverterCharger);

/***/ }),

/***/ "./src/app/components/NumericValue.js":
/*!********************************************!*\
  !*** ./src/app/components/NumericValue.js ***!
  \********************************************/
/*! exports provided: formatNumber, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatNumber", function() { return formatNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NumericValue; });
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.to-string */ "./node_modules/core-js/modules/es6.regexp.to-string.js");
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


function formatNumber(_ref) {
  var value = _ref.value,
      _ref$unit = _ref.unit,
      unit = _ref$unit === void 0 ? "" : _ref$unit,
      _ref$precision = _ref.precision,
      precision = _ref$precision === void 0 ? 0 : _ref$precision,
      _ref$factor = _ref.factor,
      factor = _ref$factor === void 0 ? 1.0 : _ref$factor,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? "--" : _ref$defaultValue;

  if (value === null || value === undefined) {
    return defaultValue;
  }

  var numericValue = Number(value) * factor;
  return precision === undefined ? numericValue.toString() + unit : numericValue.toFixed(precision) + unit;
}

var NumericValue =
/*#__PURE__*/
function (_Component) {
  _inherits(NumericValue, _Component);

  function NumericValue() {
    _classCallCheck(this, NumericValue);

    return _possibleConstructorReturn(this, _getPrototypeOf(NumericValue).apply(this, arguments));
  }

  _createClass(NumericValue, [{
    key: "render",
    value: function render(_ref2) {
      var value = _ref2.value,
          _ref2$unit = _ref2.unit,
          unit = _ref2$unit === void 0 ? "" : _ref2$unit,
          _ref2$precision = _ref2.precision,
          precision = _ref2$precision === void 0 ? 0 : _ref2$precision,
          _ref2$factor = _ref2.factor,
          factor = _ref2$factor === void 0 ? 1.0 : _ref2$factor,
          _ref2$defaultValue = _ref2.defaultValue,
          defaultValue = _ref2$defaultValue === void 0 ? "--" : _ref2$defaultValue;
      return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("p", {
        className: "value text"
      }, formatNumber({
        value,
        unit,
        precision,
        factor,
        defaultValue
      }));
    }
  }]);

  return NumericValue;
}(preact__WEBPACK_IMPORTED_MODULE_1__["Component"]);



/***/ }),

/***/ "./src/app/components/ShoreInputLimit.js":
/*!***********************************************!*\
  !*** ./src/app/components/ShoreInputLimit.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var ShoreInputLimit =
/*#__PURE__*/
function (_Component) {
  _inherits(ShoreInputLimit, _Component);

  function ShoreInputLimit() {
    _classCallCheck(this, ShoreInputLimit);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShoreInputLimit).apply(this, arguments));
  }

  _createClass(ShoreInputLimit, [{
    key: "render",
    value: function render(props, state) {
      if (!props.isAdjustable) {
        return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          className: "metric metric--small"
        }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          className: "metric__shore-input-limit--not-adjustable"
        }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
          className: "text text--small"
        }, "Shore input limit:\xA0"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
          className: "text text--bold"
        }, props.currentLimit)));
      }

      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "metric metric--small metric--shore-input-limit"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
        className: "selector-button",
        onclick: props.onSelectShoreLimitClick
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
        className: "text text--small"
      }, "Select shore input limit:\xA0"), Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
        className: "text text--bold"
      }, props.currentLimit)));
    }
  }]);

  return ShoreInputLimit;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ShoreInputLimit);

/***/ }),

/***/ "./src/app/components/ShoreInputLimitSelector.js":
/*!*******************************************************!*\
  !*** ./src/app/components/ShoreInputLimitSelector.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _logging_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../logging/logger */ "./src/logging/logger.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var USAmperage = [10, 15, 20, 30, 50, 100];
var EUAmperage = [6, 10, 13, 16, 25, 32, 63];

var ShoreInputLimitSelector =
/*#__PURE__*/
function (_Component) {
  _inherits(ShoreInputLimitSelector, _Component);

  function ShoreInputLimitSelector() {
    _classCallCheck(this, ShoreInputLimitSelector);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShoreInputLimitSelector).apply(this, arguments));
  }

  _createClass(ShoreInputLimitSelector, [{
    key: "getSuggestedAmperageValuesList",

    /**
     * - Mask the Product id with `0xFF00`
     * - If the result is `0x1900` or `0x2600` it is an EU model (230VAC)
     * - If the result is `0x2000` or `0x2700` it is an US model (120VAC)
     */
    value: function getSuggestedAmperageValuesList(productId) {
      var result = productId & 0xff00;

      if (result === 0x1900 || result === 0x2600) {
        return EUAmperage;
      } else if (result === 0x2000 || result === 0x2700) {
        return USAmperage;
      } else {
        _logging_logger__WEBPACK_IMPORTED_MODULE_1__["default"].warn(`Could not retrieve amperage US/EU for product id ${productId}`);
        return USAmperage;
      }
    }
  }, {
    key: "render",
    value: function render(props, state) {
      var maxLimit = props.maxLimit || 100;
      var amperageList = this.getSuggestedAmperageValuesList(props.productId).filter(function (value) {
        return value <= maxLimit;
      });
      return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", null, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "amperage-selector__container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "amperage-selector"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        className: "text text--large text--center amperage-selector__description"
      }, "Select shore input limit"), amperageList.map(function (currentValue) {
        return Object(preact__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
          className: "selector-button selector-button__amperage text text--very-large" + (parseInt(props.currentLimit) == currentValue ? " selector-button--active" : ""),
          href: "#",
          onClick: function onClick() {
            return props.onLimitSelected(currentValue);
          }
        }, currentValue, "A");
      }))));
    }
  }]);

  return ShoreInputLimitSelector;
}(preact__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ShoreInputLimitSelector);

/***/ }),

/***/ "./src/app/formatters.js":
/*!*******************************!*\
  !*** ./src/app/formatters.js ***!
  \*******************************/
/*! exports provided: numericFormatter, systemModeFormatter, systemStateFormatter, batteryStateFormatter, batteryTimeToGoFormatter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numericFormatter", function() { return numericFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemModeFormatter", function() { return systemModeFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "systemStateFormatter", function() { return systemStateFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "batteryStateFormatter", function() { return batteryStateFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "batteryTimeToGoFormatter", function() { return batteryTimeToGoFormatter; });
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.to-string */ "./node_modules/core-js/modules/es6.regexp.to-string.js");
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _service_topics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/topics */ "./src/service/topics.js");



function numericFormatter() {
  var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var factor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "--";
  return function (value) {
    if (value === null || value === undefined) {
      return defaultValue;
    }

    var numericValue = Number(value) * factor;
    return precision === undefined ? numericValue.toString() : numericValue.toFixed(precision);
  };
}

function systemStateFormatter(value) {
  if (value == 0) return "Off";
  if (value == 1) return "Low power";
  if (value == 2) return "VE.Bus Fault condition";
  if (value == 3) return "Bulk charging";
  if (value == 4) return "Absorption charging";
  if (value == 5) return "Float charging";
  if (value == 6) return "Storage mode";
  if (value == 7) return "Equalisation charging";
  if (value == 8) return "Passthru";
  if (value == 9) return "Inverting";
  if (value == 10) return "Assisting";
  if (value == 256) return "Discharging";
  if (value == 257) return "Sustain";
  return "--";
}

function systemModeFormatter(value) {
  if (value == 1) return "Charger only";
  if (value == 2) return "Inverter only";
  if (value == 3) return "ON";
  if (value == 4) return "OFF";
  return "--";
}

function batteryStateFormatter(value) {
  switch (value) {
    case _service_topics__WEBPACK_IMPORTED_MODULE_1__["BATTERY_STATE"].CHARGING:
      return "Charging";

    case _service_topics__WEBPACK_IMPORTED_MODULE_1__["BATTERY_STATE"].DISCHARGING:
      return "Discharging";

    case _service_topics__WEBPACK_IMPORTED_MODULE_1__["BATTERY_STATE"].IDLE:
      return "Idle";
  }
}

function batteryTimeToGoFormatter(timeToGo) {
  var secs = parseInt(timeToGo);

  if (!isNaN(secs)) {
    var days = Math.floor(secs / 86400);
    var hours = Math.floor((secs - days * 86400) / 3600);
    var minutes = Math.floor((secs - hours * 3600) / 60);
    var seconds = Math.floor(secs - minutes * 60);
    if (days) return `${days}d ${hours}h`;else if (hours) return `${hours}h ${minutes}m`;else if (minutes) return `${minutes}m ${seconds}s`;else return `${seconds}s`;
  } else {
    return null;
  }
}



/***/ }),

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");
/* harmony import */ var _config_metricsConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config/metricsConfig */ "./src/config/metricsConfig.js");
/* harmony import */ var _config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config/dbusPaths */ "./src/config/dbusPaths.js");
/* harmony import */ var _service_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service/index */ "./src/service/index.js");
/* harmony import */ var _logging_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../logging/logger */ "./src/logging/logger.js");
/* harmony import */ var _css_texts_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../css/texts.scss */ "./src/css/texts.scss");
/* harmony import */ var _css_texts_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_css_texts_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../css/styles.scss */ "./src/css/styles.scss");
/* harmony import */ var _css_styles_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_css_styles_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_ActiveSource__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/ActiveSource */ "./src/app/components/ActiveSource.js");
/* harmony import */ var _components_ShoreInputLimit__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/ShoreInputLimit */ "./src/app/components/ShoreInputLimit.js");
/* harmony import */ var _components_ShoreInputLimitSelector__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/ShoreInputLimitSelector */ "./src/app/components/ShoreInputLimitSelector.js");
/* harmony import */ var _components_InverterCharger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/InverterCharger */ "./src/app/components/InverterCharger.js");
/* harmony import */ var _components_Battery__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/Battery */ "./src/app/components/Battery.js");
/* harmony import */ var _components_AcLoads__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/AcLoads */ "./src/app/components/AcLoads.js");
/* harmony import */ var _components_DcLoads__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/DcLoads */ "./src/app/components/DcLoads.js");
/* harmony import */ var _service_util__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../service/util */ "./src/service/util.js");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















var host = Object(_service_util__WEBPACK_IMPORTED_MODULE_15__["getParameterByName"])("host") || window.location.hostname || "localhost";
var port = parseInt(Object(_service_util__WEBPACK_IMPORTED_MODULE_15__["getParameterByName"])("port")) || 9001;
var mqttUrl = `mqtt://${host}:${port}`;

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(App)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.VOLTAGE]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.CURRENT]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.POWER]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.SOC]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.STATE]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.TIME_TO_GO]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.DC_LOADS.POWER]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_2]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_3]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_1]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_2]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_3]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_1]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_2]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_3]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.VOLTAGE]: "--",
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT]: "--",
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: "--",
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.POWER]: "--",
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.STATE]: "--",
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.MODE]: "--",
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_INPUT]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].SETTINGS.AC_INPUT_TYPE1]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].SETTINGS.AC_INPUT_TYPE2]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_1]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_2]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_3]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_1]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_2]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_3]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_1]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_2]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_3]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: "--",
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX]: null,
      [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.PRODUCT_ID]: null,
      currentLimitSelectorVisible: false,
      connected: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      _this.deviceInterface = new _service_index__WEBPACK_IMPORTED_MODULE_4__["default"](mqttUrl);

      _this.deviceInterface.connect().then(function () {
        var dbusPaths = Object.keys(_config_metricsConfig__WEBPACK_IMPORTED_MODULE_2__["default"]);

        _this.deviceInterface.subscribe(dbusPaths);
      });

      _this.deviceInterface.onMessage = function (_ref) {
        var path = _ref.path,
            value = _ref.value;
        var metric = _config_metricsConfig__WEBPACK_IMPORTED_MODULE_2__["default"][path];

        if (!metric) {
          _logging_logger__WEBPACK_IMPORTED_MODULE_5__["default"].warn(`Received message for topic you're not listening to: ${path}`);
          return;
        }

        var formattedValue = metric.formatter ? metric.formatter(value) : value;

        _this.setState({
          [path]: metric.unit && formattedValue !== "--" ? formattedValue + metric.unit : formattedValue
        });
      };

      _this.deviceInterface.onConnectionChanged = function (_ref2) {
        var connected = _ref2.connected;

        _this.setState({
          connected
        });
      }; // TODO Remove this


      _this.setState({
        deviceInterface: _this.deviceInterface
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleCurrentLimitSelector", function () {
      _this.setState({
        currentLimitSelectorVisible: !_this.state.currentLimitSelectorVisible
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleShorePowerLimitSelected", function (limit) {
      _this.deviceInterface.write(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT, limit);

      _this.toggleCurrentLimitSelector();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleModeSelected", function (mode) {
      _this.deviceInterface.write(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.MODE, mode);
    });

    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render(props, state) {
      return Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("main", {
        className: !this.state.connected ? "disconnected" : ""
      }, Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("header", null, Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("img", {
        src: "./images/icons/logo.png",
        className: "logo"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("div", {
        className: "connection"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("img", {
        src: "./images/icons/connected.svg",
        className: "connection__icon"
      }), Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("p", {
        className: "text text--very-small"
      }, this.state.connected ? "Connected" : "Disconnected"))), state.currentLimitSelectorVisible ? Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(_components_ShoreInputLimitSelector__WEBPACK_IMPORTED_MODULE_10__["default"], {
        currentLimit: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT],
        maxLimit: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX],
        productId: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.PRODUCT_ID],
        onLimitSelected: this.handleShorePowerLimitSelected
      }) : Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("div", {
        id: "metrics-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(_components_Battery__WEBPACK_IMPORTED_MODULE_12__["default"], {
        soc: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.SOC],
        state: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.STATE],
        voltage: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.VOLTAGE],
        current: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.CURRENT],
        power: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.POWER],
        timeToGo: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.TIME_TO_GO]
      }), Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("div", {
        className: "multi-metric-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(_components_ActiveSource__WEBPACK_IMPORTED_MODULE_8__["default"], {
        activeInput: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_INPUT],
        settings: {
          input0: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].SETTINGS.AC_INPUT_TYPE1],
          input1: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].SETTINGS.AC_INPUT_TYPE2]
        },
        current: {
          phase1: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_1],
          phase2: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_2],
          phase3: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_3]
        },
        voltage: {
          phase1: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_1],
          phase2: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_2],
          phase3: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_3]
        },
        power: {
          phase1: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_1],
          phase2: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_2],
          phase3: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_3]
        }
      }), Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(_components_ShoreInputLimit__WEBPACK_IMPORTED_MODULE_9__["default"], {
        currentLimit: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT],
        isAdjustable: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE],
        onSelectShoreLimitClick: this.toggleCurrentLimitSelector
      })), Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(_components_InverterCharger__WEBPACK_IMPORTED_MODULE_11__["default"], {
        state: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.STATE],
        activeMode: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.MODE],
        isAdjustable: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE],
        onModeSelected: this.handleModeSelected
      }), Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])("div", {
        className: "multi-metric-container"
      }, Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(_components_AcLoads__WEBPACK_IMPORTED_MODULE_13__["default"], {
        current: {
          phase1: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1],
          phase2: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_2],
          phase3: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_3]
        },
        voltage: {
          phase1: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_1],
          phase2: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_2],
          phase3: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_3]
        },
        power: {
          phase1: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_1],
          phase2: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_2],
          phase3: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_3]
        }
      }), Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(_components_DcLoads__WEBPACK_IMPORTED_MODULE_14__["default"], {
        batteryVoltage: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].BATTERY.VOLTAGE],
        power: this.state[_config_dbusPaths__WEBPACK_IMPORTED_MODULE_3__["DBUS_PATHS"].INVERTER_CHARGER.DC_LOADS.POWER]
      }))));
    }
  }]);

  return App;
}(preact__WEBPACK_IMPORTED_MODULE_1__["Component"]);

Object(preact__WEBPACK_IMPORTED_MODULE_1__["render"])(Object(preact__WEBPACK_IMPORTED_MODULE_1__["h"])(App, null), document.body);

/***/ }),

/***/ "./src/config/dbusPaths.js":
/*!*********************************!*\
  !*** ./src/config/dbusPaths.js ***!
  \*********************************/
/*! exports provided: DBUS_PATHS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DBUS_PATHS", function() { return DBUS_PATHS; });
var DBUS_PATHS = {
  GENERAL: {
    SERIAL: "/Serial",
    // portal id
    DEVICE_INSTANCE: "/DeviceInstance"
  },
  BATTERY: {
    CURRENT: "/Dc/Battery/Current",
    POWER: "/Dc/Battery/Power",
    VOLTAGE: "/Dc/Battery/Voltage",
    SOC: "/Dc/Battery/Soc",
    // State of charge
    STATE: "/Dc/Battery/State",
    CIRCUIT_BREAKER_ALARM: "/Dc/Battery/Alarms/CircuitBreakerTripped",
    //<- Something special
    CONSUMED_AMP_HOURRS: "/Dc/Battery/ConsumedAmphours",
    TIME_TO_GO: "/Dc/Battery/TimeToGo"
  },
  SOLAR_CHARGERS: {
    CURRENT: "/Dc/Pv/Current",
    //<- total output current of all connected solar chargers
    POWER: "/Dc/Pv/Power" //<- same, but then the power

  },
  // VE.Bus systems (Multis, Quattros, Inverters)
  INVERTER_CHARGER: {
    DC_LOADS: {
      POWER: "/Dc/System/Power"
    },
    AC_LOADS: {
      OUTPUT_CURRENT_PHASE_1: "/Ac/Out/L1/I",
      OUTPUT_CURRENT_PHASE_2: "/Ac/Out/L2/I",
      OUTPUT_CURRENT_PHASE_3: "/Ac/Out/L3/I",
      OUTPUT_VOLTAGE_PHASE_1: "/Ac/Out/L1/V",
      OUTPUT_VOLTAGE_PHASE_2: "/Ac/Out/L2/V",
      OUTPUT_VOLTAGE_PHASE_3: "/Ac/Out/L3/V",
      OUTPUT_POWER_PHASE_1: "/Ac/ConsumptionOnOutput/L1/Power",
      OUTPUT_POWER_PHASE_2: "/Ac/ConsumptionOnOutput/L2/Power",
      OUTPUT_POWER_PHASE_3: "/Ac/ConsumptionOnOutput/L3/Power"
    },
    PRODUCT_ID: "/ProductId",
    ACTIVE_INPUT: "/Ac/ActiveIn/ActiveInput",
    // Active input: 0 = ACin-1, 1 = ACin-2, 240 is none (inverting).
    // also known as GRID
    ACTIVE_IN: {
      VOLTAGE_PHASE_1: "/Ac/ActiveIn/L1/V",
      //  <- Voltage (Volts)
      CURRENT_PHASE_1: "/Ac/ActiveIn/L1/I",
      // <- Current (Amps)
      POWER_PHASE_1: "/Ac/ActiveIn/L1/P",
      //  <- Power (Watts)
      FREQUENCY_PHASE_1: "/Ac/ActiveIn/L1/F",
      // <- Frequency (Hz)
      VOLTAGE_PHASE_2: "/Ac/ActiveIn/L2/V",
      CURRENT_PHASE_2: "/Ac/ActiveIn/L2/I",
      POWER_PHASE_2: "/Ac/ActiveIn/L2/P",
      FREQUENCY_PHASE_2: "/Ac/ActiveIn/L2/F",
      VOLTAGE_PHASE_3: "/Ac/ActiveIn/L3/V",
      CURRENT_PHASE_3: "/Ac/ActiveIn/L3/I",
      POWER_PHASE_3: "/Ac/ActiveIn/L3/P",
      FREQUENCY_PHASE_3: "/Ac/ActiveIn/L3/F",
      CURRENT_LIMIT: "/Ac/ActiveIn/CurrentLimit",
      CURRENT_LIMIT_IS_ADJUSTABLE: "/Ac/ActiveIn/CurrentLimitIsAdjustable"
    },
    SHORE_POWER: {
      // Only available for VE.Bus versions > 415
      CURRENT_LIMIT: "/CurrentLimit",
      CURRENT_LIMIT_MAX: "/CurrentLimitGetMax",
      CURRENT_LIMIT_IS_ADJUSTABLE: "/CurrentLimitIsAdjustable"
    },
    GENERATOR: {
      AC_GENSET_L1_POWER: "/Ac/Genset/L1/Power",
      // <- All from the genset.
      AC_GENSET_L2_POWER: "/Ac/Genset/L2/Power",
      AC_GENSET_L3_POWER: "/Ac/Genset/L3/Power"
    },
    SYSTEM: {
      STATE: "/SystemState/State",
      MODE: "/Mode",
      // Position of the switch. 1=Charger Only;2=Inverter Only;3=On;4=Off
      MODE_IS_ADJUSTABLE: "/ModeIsAdjustable",
      AC_NUMBER_OF_PHASES: "/Ac/Consumption/NumberOfPhases",
      //  <- Either 1 (single phase), 2 (split-phase) or 3 (three-phase)
      VEBUS_SERVICE: "/VebusService" // <- Returns the service name of the vebus service.

    }
  },
  SETTINGS: {
    AC_INPUT_TYPE1: "/Settings/SystemSetup/AcInput1",
    AC_INPUT_TYPE2: "/Settings/SystemSetup/AcInput2"
  }
};

/***/ }),

/***/ "./src/config/metricsConfig.js":
/*!*************************************!*\
  !*** ./src/config/metricsConfig.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_formatters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/formatters */ "./src/app/formatters.js");
/* harmony import */ var _config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/dbusPaths */ "./src/config/dbusPaths.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].BATTERY.VOLTAGE]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].BATTERY.CURRENT]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].BATTERY.POWER]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].BATTERY.SOC]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].BATTERY.STATE]: {
    formatter: _app_formatters__WEBPACK_IMPORTED_MODULE_0__["batteryStateFormatter"]
  },
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].BATTERY.TIME_TO_GO]: {
    formatter: _app_formatters__WEBPACK_IMPORTED_MODULE_0__["batteryTimeToGoFormatter"]
  },
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.DC_LOADS.POWER]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_2]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_3]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_1]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_2]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_3]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_1]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_2]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_3]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.STATE]: {
    description: "System state",
    unit: "",
    formatter: _app_formatters__WEBPACK_IMPORTED_MODULE_0__["systemStateFormatter"],
    timeout: 0
  },
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.MODE]: {
    description: "System mode",
    unit: "",
    formatter: _app_formatters__WEBPACK_IMPORTED_MODULE_0__["systemModeFormatter"],
    timeout: 0,
    write: true
  },
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_INPUT]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].SETTINGS.AC_INPUT_TYPE1]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].SETTINGS.AC_INPUT_TYPE2]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_1]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_2]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_PHASE_3]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_1]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_2]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.POWER_PHASE_3]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_1]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_2]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.VOLTAGE_PHASE_3]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_LIMIT]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN.CURRENT_LIMIT_IS_ADJUSTABLE]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT]: {
    unit: "A",
    formatter: Object(_app_formatters__WEBPACK_IMPORTED_MODULE_0__["numericFormatter"])()
  },
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_IS_ADJUSTABLE]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER.CURRENT_LIMIT_MAX]: {},
  [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.PRODUCT_ID]: {}
});

/***/ }),

/***/ "./src/css/Roboto-Bold.ttf":
/*!*********************************!*\
  !*** ./src/css/Roboto-Bold.ttf ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Bold.ttf";

/***/ }),

/***/ "./src/css/Roboto-Medium.ttf":
/*!***********************************!*\
  !*** ./src/css/Roboto-Medium.ttf ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Medium.ttf";

/***/ }),

/***/ "./src/css/Roboto-Normal.ttf":
/*!***********************************!*\
  !*** ./src/css/Roboto-Normal.ttf ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Roboto-Normal.ttf";

/***/ }),

/***/ "./src/css/styles.scss":
/*!*****************************!*\
  !*** ./src/css/styles.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./styles.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/css/styles.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/css/texts.scss":
/*!****************************!*\
  !*** ./src/css/texts.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./texts.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/css/texts.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/images/boat.png":
/*!*****************************!*\
  !*** ./src/images/boat.png ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/boat.png";

/***/ }),

/***/ "./src/logging/logger.js":
/*!*******************************!*\
  !*** ./src/logging/logger.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service/util */ "./src/service/util.js");


var log = function log() {
  for (var _len = arguments.length, msgs = new Array(_len), _key = 0; _key < _len; _key++) {
    msgs[_key] = arguments[_key];
  }

  if (!Object(_service_util__WEBPACK_IMPORTED_MODULE_0__["getParameterByName"])("nolog")) console.log.apply(console, msgs);
};

var warn = function warn() {
  for (var _len2 = arguments.length, msgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    msgs[_key2] = arguments[_key2];
  }

  if (!Object(_service_util__WEBPACK_IMPORTED_MODULE_0__["getParameterByName"])("nolog")) console.warn.apply(console, msgs);
};

var error = function error() {
  for (var _len3 = arguments.length, msgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    msgs[_key3] = arguments[_key3];
  }

  if (!Object(_service_util__WEBPACK_IMPORTED_MODULE_0__["getParameterByName"])("nolog")) console.error.apply(console, msgs);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  log,
  warn,
  error
});

/***/ }),

/***/ "./src/service/VenusClient.js":
/*!************************************!*\
  !*** ./src/service/VenusClient.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/ucorina/dev/venus-html5-app/src/service/VenusClient.js: Unexpected token (121:3)\n\n\u001b[0m \u001b[90m 119 | \u001b[39m    \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mmqttClient\u001b[33m.\u001b[39mon(\u001b[32m\"message\"\u001b[39m\u001b[33m,\u001b[39m (topic\u001b[33m,\u001b[39m message) \u001b[33m=>\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m 120 | \u001b[39m      \u001b[36mconst\u001b[39m clientMessage \u001b[33m=\u001b[39m parseMessage(topic\u001b[33m,\u001b[39m message)\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 121 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m   \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 122 | \u001b[39m      \u001b[33mLogger\u001b[39m\u001b[33m.\u001b[39mlog(\u001b[32m\"Received message:\"\u001b[39m\u001b[33m,\u001b[39m topic\u001b[33m,\u001b[39m clientMessage\u001b[33m.\u001b[39mvalue)\u001b[0m\n\u001b[0m \u001b[90m 123 | \u001b[39m\u001b[33m===\u001b[39m\u001b[33m===\u001b[39m\u001b[33m=\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 124 | \u001b[39m      \u001b[90m// console.log(\"Received message:\", topic, clientMessage.value)\u001b[39m\u001b[0m\n    at _class.raise (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3939:15)\n    at _class.unexpected (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5248:16)\n    at _class.jsxParseIdentifier (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3418:14)\n    at _class.jsxParseNamespacedName (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3428:23)\n    at _class.jsxParseElementName (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3439:23)\n    at _class.jsxParseOpeningElementAt (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3524:24)\n    at _class.jsxParseElementAt (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3557:33)\n    at _class.jsxParseElement (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3626:19)\n    at _class.parseExprAtom (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3633:21)\n    at _class.parseExprSubscripts (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5924:21)\n    at _class.parseMaybeUnary (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5903:21)\n    at _class.parseExprOp (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5858:46)\n    at _class.parseExprOps (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5822:17)\n    at _class.parseMaybeConditional (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5784:21)\n    at _class.parseMaybeAssign (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5731:21)\n    at _class.parseVar (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7776:26)\n    at _class.parseVarStatement (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7606:10)\n    at _class.parseStatementContent (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7203:21)\n    at _class.parseStatement (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7153:17)\n    at _class.parseBlockOrModuleBlockBody (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7707:23)\n    at _class.parseBlockBody (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7694:10)\n    at _class.parseBlock (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7683:10)\n    at _class.parseFunctionBody (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6933:24)\n    at _class.parseArrowExpression (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6885:10)\n    at _class.parseParenAndDistinguishExpression (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6501:12)\n    at _class.parseExprAtom (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6284:21)\n    at _class.parseExprAtom (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3635:52)\n    at _class.parseExprSubscripts (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5924:21)\n    at _class.parseMaybeUnary (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5903:21)\n    at _class.parseExprOps (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5812:21)\n    at _class.parseMaybeConditional (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5784:21)\n    at _class.parseMaybeAssign (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5731:21)\n    at _class.parseExprListItem (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7003:18)\n    at _class.parseCallExpressionArguments (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6124:22)\n    at _class.parseSubscript (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6029:32)\n    at _class.parseSubscripts (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5944:19)");

/***/ }),

/***/ "./src/service/index.js":
/*!******************************!*\
  !*** ./src/service/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VenusClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VenusClient */ "./src/service/VenusClient.js");

/* harmony default export */ __webpack_exports__["default"] = (_VenusClient__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./src/service/topics.js":
/*!*******************************!*\
  !*** ./src/service/topics.js ***!
  \*******************************/
/*! exports provided: SERVICES, BATTERY_STATE, VEBUS_SYSTEM_STATE, AC_SOURCE, AC_SOURCE_TYPE, ACTIVE_INPUT, SYSTEM_MODE, TOPICS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVICES", function() { return SERVICES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BATTERY_STATE", function() { return BATTERY_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VEBUS_SYSTEM_STATE", function() { return VEBUS_SYSTEM_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AC_SOURCE", function() { return AC_SOURCE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AC_SOURCE_TYPE", function() { return AC_SOURCE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIVE_INPUT", function() { return ACTIVE_INPUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYSTEM_MODE", function() { return SYSTEM_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOPICS", function() { return TOPICS; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/service/util.js");
/* harmony import */ var _config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/dbusPaths */ "./src/config/dbusPaths.js");


var SERVICES = {
  SYSTEM: Object(_util__WEBPACK_IMPORTED_MODULE_0__["objectValues"])(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].GENERAL).concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["objectValues"])(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].BATTERY)).concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["objectValues"])(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].SOLAR_CHARGERS)).concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["objectValues"])(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.DC_LOADS)).concat(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.STATE).concat(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.VEBUS_SERVICE).concat([_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_1, _config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_2, _config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_POWER_PHASE_3]),
  VEBUS: [_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_1, _config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_2, _config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_CURRENT_PHASE_3, _config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_1, _config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_2, _config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.AC_LOADS.OUTPUT_VOLTAGE_PHASE_3].concat(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.MODE).concat(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.MODE_IS_ADJUSTABLE).concat(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_INPUT).concat(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.PRODUCT_ID).concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["objectValues"])(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.ACTIVE_IN)).concat(Object(_util__WEBPACK_IMPORTED_MODULE_0__["objectValues"])(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.GENERATOR)).concat([_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SYSTEM.AC_NUMBER_OF_PHASES]),
  SETTINGS: Object(_util__WEBPACK_IMPORTED_MODULE_0__["objectValues"])(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].SETTINGS),
  SHORE_POWER: Object(_util__WEBPACK_IMPORTED_MODULE_0__["objectValues"])(_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].INVERTER_CHARGER.SHORE_POWER)
};
var BATTERY_STATE = {
  IDLE: 0,
  CHARGING: 1,
  DISCHARGING: 2
};
var VEBUS_SYSTEM_STATE = {
  OFF: 0,
  LOW_POWER: 1,
  FAULT_CONDITION: 2,
  BULK_CHARGING: 3,
  ABSORPTION_CHARGINNG: 4,
  FLOAT_CHARGING: 5,
  STORAGE_MODE: 6,
  EQUALISATION_CHARGING: 7,
  PASSTHRU: 8,
  INVERTING: 9,
  ASSISTING: 10,
  DISCHARGING: 256,
  SUSTAIN: 257
};
var AC_SOURCE = {
  NOT_AVAILABLE: 0,
  GRID: 1,
  GENSET: 2,
  SHORE: 3,
  INVERTING_ISLAND_MODE: 240
};
var AC_SOURCE_TYPE = {
  NOT_IN_USE: 0,
  GRID: 1,
  GENERATOR: 2,
  SHORE: 3
};
var ACTIVE_INPUT = {
  INPUT_0: 0,
  INPUT_1: 1,
  NONE: 240 // Inverting

};
var SYSTEM_MODE = {
  CHARGER_ONLY: 1,
  INVERTER_ONLY: 2,
  ON: 3,
  OFF: 4
};
var TOPICS = {
  /**
   * Topic structure is:
   * N/<portal ID>/<service_type>/<device instance>/<D-Bus path>
   *
   * See details at https://github.com/victronenergy/dbus-mqtt
   */
  NOTIFICATION: {
    ALL: "N/#",
    SERIAL: `N/+/system/0${_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].GENERAL.SERIAL}`,
    ALL_DEVICE_INSTANCES: `N/+/+/+${_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].GENERAL.DEVICE_INSTANCE}`,
    SETTINGS_AC_INPUT_TYPE1: `N/+/settings/+${_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].SETTINGS.AC_INPUT_TYPE1}`,
    SETTINGS_AC_INPUT_TYPE2: `N/+/settings/+${_config_dbusPaths__WEBPACK_IMPORTED_MODULE_1__["DBUS_PATHS"].SETTINGS.AC_INPUT_TYPE2}`
  }
};

/***/ }),

/***/ "./src/service/util.js":
/*!*****************************!*\
  !*** ./src/service/util.js ***!
  \*****************************/
/*! exports provided: parseTopic, parseMessage, objectValues, isPathOfType, arrayToSubscriptionMap, getParameterByName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTopic", function() { return parseTopic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseMessage", function() { return parseMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectValues", function() { return objectValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPathOfType", function() { return isPathOfType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToSubscriptionMap", function() { return arrayToSubscriptionMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParameterByName", function() { return getParameterByName; });
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.constructor */ "./node_modules/core-js/modules/es6.regexp.constructor.js");
/* harmony import */ var core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_constructor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.regexp.replace */ "./node_modules/core-js/modules/es6.regexp.replace.js");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es7.array.includes */ "./node_modules/core-js/modules/es7.array.includes.js");
/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "./node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.regexp.to-string */ "./node_modules/core-js/modules/es6.regexp.to-string.js");
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ "./node_modules/core-js/modules/es6.regexp.split.js");
/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _logging_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../logging/logger */ "./src/logging/logger.js");







/**
 * @typedef {object} Topic
 *
 * @prop {"N" | "R" | "W"} type
 * @prop {string} portalId
 * @prop {string} serviceType
 * @prop {string} deviceInstance
 * @prop {string} dbusPath
 */

/**
 * Splits a topic string into an object with properties for each "part"
 *
 * Topic structure is:
 * N/<portal ID>/<service_type>/<device instance>/<D-Bus path>
 *
 * See details at https://github.com/victronenergy/dbus-mqtt
 * @returns {Topic}
 */

var parseTopic = function parseTopic(topic) {
  var parts = topic.split("/");
  var dbusPathParts = parts.splice(4);
  var isAcIn = dbusPathParts[0] === "Ac" && dbusPathParts[1] === "In";
  return {
    type: parts[0],
    portalId: parts[1],
    serviceType: parts[2],
    deviceInstance: parseInt(parts[3]),
    dbusPath: "/" + (isAcIn ? dbusPathParts.splice(3).join("/") : dbusPathParts.join("/"))
  };
};
var parseMessage = function parseMessage(topic, message) {
  var data;

  try {
    data = JSON.parse(message.toString());
  } catch (e) {
    data = {};
    _logging_logger__WEBPACK_IMPORTED_MODULE_6__["default"].error(topic, `[${message.toString()}]`, e);
  }

  var _parseTopic = parseTopic(topic),
      dbusPath = _parseTopic.dbusPath;

  return {
    path: dbusPath,
    value: data.value !== undefined ? data.value : null
  };
};
function objectValues(data) {
  return Object.keys(data).map(function (key) {
    return data[key];
  });
}
var isPathOfType = function isPathOfType(dbusPath, enumObject) {
  var paths = objectValues(enumObject);
  return paths.includes(dbusPath);
};
var arrayToSubscriptionMap = function arrayToSubscriptionMap(toSubscribe) {
  return toSubscribe.reduce(function (acc, value) {
    acc[value] = 0;
    return acc;
  }, {});
};
var getParameterByName = function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.7a271775126a3d681d2c.js.map