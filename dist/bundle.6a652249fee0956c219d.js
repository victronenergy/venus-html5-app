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

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/ucorina/dev/venus-html5-app/src/app/index.js: Unexpected token (81:1)\n\n\u001b[0m \u001b[90m 79 | \u001b[39m      \u001b[36mconst\u001b[39m metric \u001b[33m=\u001b[39m metricsConfig[path]\u001b[0m\n\u001b[0m \u001b[90m 80 | \u001b[39m      \u001b[36mif\u001b[39m (\u001b[33m!\u001b[39mmetric) {\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 81 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 82 | \u001b[39m        \u001b[33mLogger\u001b[39m\u001b[33m.\u001b[39mwarn(\u001b[32m`Received message for topic you're not listening to: ${path}`\u001b[39m)\u001b[0m\n\u001b[0m \u001b[90m 83 | \u001b[39m\u001b[33m===\u001b[39m\u001b[33m===\u001b[39m\u001b[33m=\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 84 | \u001b[39m        \u001b[90m// console.warn(`Received message for topic you're not listening to: ${path}`)\u001b[39m\u001b[0m\n    at _class.raise (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3939:15)\n    at _class.unexpected (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5248:16)\n    at _class.jsxParseIdentifier (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3418:14)\n    at _class.jsxParseNamespacedName (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3428:23)\n    at _class.jsxParseElementName (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3439:23)\n    at _class.jsxParseOpeningElementAt (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3524:24)\n    at _class.jsxParseElementAt (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3557:33)\n    at _class.jsxParseElement (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3626:19)\n    at _class.parseExprAtom (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3633:21)\n    at _class.parseExprSubscripts (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5924:21)\n    at _class.parseMaybeUnary (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5903:21)\n    at _class.parseExprOps (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5812:21)\n    at _class.parseMaybeConditional (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5784:21)\n    at _class.parseMaybeAssign (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5731:21)\n    at _class.parseExpression (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5684:21)\n    at _class.parseStatementContent (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7267:21)\n    at _class.parseStatement (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7153:17)\n    at _class.parseBlockOrModuleBlockBody (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7707:23)\n    at _class.parseBlockBody (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7694:10)\n    at _class.parseBlock (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7683:10)\n    at _class.parseStatementContent (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7212:21)\n    at _class.parseStatement (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7153:17)\n    at _class.parseIfStatement (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7493:28)\n    at _class.parseStatementContent (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7184:21)\n    at _class.parseStatement (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7153:17)\n    at _class.parseBlockOrModuleBlockBody (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7707:23)\n    at _class.parseBlockBody (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7694:10)\n    at _class.parseBlock (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:7683:10)\n    at _class.parseFunctionBody (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6933:24)\n    at _class.parseArrowExpression (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6885:10)\n    at _class.parseParenAndDistinguishExpression (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6501:12)\n    at _class.parseExprAtom (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:6284:21)\n    at _class.parseExprAtom (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:3635:52)\n    at _class.parseExprSubscripts (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5924:21)\n    at _class.parseMaybeUnary (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5903:21)\n    at _class.parseExprOps (/Users/ucorina/dev/venus-html5-app/node_modules/@babel/parser/lib/index.js:5812:21)");

/***/ })

/******/ });
//# sourceMappingURL=bundle.6a652249fee0956c219d.js.map