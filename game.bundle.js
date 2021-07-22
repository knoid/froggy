/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/debug/node_modules/ms/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/debug/node_modules/ms/index.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/debug/node_modules/ms/index.js");
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/jszip/dist/jszip.min.js":
/*!**********************************************!*\
  !*** ./node_modules/jszip/dist/jszip.min.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*!

JSZip v3.6.0 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(e){if(true)module.exports=e();else {}}(function(){return function s(a,o,u){function h(r,e){if(!o[r]){if(!a[r]){var t=undefined;if(!e&&t)return require(r,!0);if(f)return f(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return h(t||e)},i,i.exports,s,a,o,u)}return o[r].exports}for(var f=undefined,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(l,t,n){(function(r){!function(e){"object"==typeof n&&void 0!==t?t.exports=e():("undefined"!=typeof window?window:void 0!==r?r:"undefined"!=typeof self?self:this).JSZip=e()}(function(){return function s(a,o,u){function h(t,e){if(!o[t]){if(!a[t]){var r="function"==typeof l&&l;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[t]={exports:{}};a[t][0].call(i.exports,function(e){return h(a[t][1][e]||e)},i,i.exports,s,a,o,u)}return o[t].exports}for(var f="function"==typeof l&&l,e=0;e<u.length;e++)h(u[e]);return h}({1:[function(e,t,r){"use strict";var c=e("./utils"),l=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,u=[],h=0,f=e.length,l=f,d="string"!==c.getTypeOf(e);h<e.length;)l=f-h,n=d?(t=e[h++],r=h<f?e[h++]:0,h<f?e[h++]:0):(t=e.charCodeAt(h++),r=h<f?e.charCodeAt(h++):0,h<f?e.charCodeAt(h++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<l?(15&r)<<2|n>>6:64,o=2<l?63&n:64,u.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return u.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,u=0;if("data:"===e.substr(0,"data:".length))throw new Error("Invalid base64 input, it looks like a data url.");var h,f=3*(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(h=l.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),h[u++]=t,64!==s&&(h[u++]=r),64!==a&&(h[u++]=n);return h}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(e){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils"),a=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r){var n=a,i=0+r;e^=-1;for(var s=0;s<i;s++)e=e>>>8^n[255&(e^t[s])];return-1^e}(0|t,e,e.length):function(e,t,r){var n=a,i=0+r;e^=-1;for(var s=0;s<i;s++)e=e>>>8^n[255&(e^t.charCodeAt(s))];return-1^e}(0|t,e,e.length):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function u(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(u,a),u.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},u.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},u.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},u.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new u("Deflate",e)},r.uncompressWorker=function(){return new u("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function I(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function i(e,t,r,n,i,s){var a,o,u=e.file,h=e.compression,f=s!==B.utf8encode,l=O.transformTo("string",s(u.name)),d=O.transformTo("string",B.utf8encode(u.name)),c=u.comment,p=O.transformTo("string",s(c)),m=O.transformTo("string",B.utf8encode(c)),_=d.length!==u.name.length,g=m.length!==c.length,v="",b="",w="",y=u.dir,k=u.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),f||!_&&!g||(S|=2048);var z,E=0,C=0;y&&(E|=16),"UNIX"===i?(C=798,E|=((z=u.unixPermissions)||(z=y?16893:33204),(65535&z)<<16)):(C=20,E|=63&(u.dosPermissions||0)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v+="up"+I((b=I(1,1)+I(T(l),4)+d).length,2)+b),g&&(v+="uc"+I((w=I(1,1)+I(T(p),4)+m).length,2)+w);var A="";return A+="\n\0",A+=I(S,2),A+=h.magic,A+=I(a,2),A+=I(o,2),A+=I(x.crc32,4),A+=I(x.compressedSize,4),A+=I(x.uncompressedSize,4),A+=I(l.length,2),A+=I(v.length,2),{fileRecord:R.LOCAL_FILE_HEADER+A+l+v,dirRecord:R.CENTRAL_FILE_HEADER+I(C,2)+A+I(p.length,2)+"\0\0\0\0"+I(E,4)+I(n,4)+l+v+p}}var O=e("../utils"),s=e("../stream/GenericWorker"),B=e("../utf8"),T=e("../crc32"),R=e("../signature");function n(e,t,r,n){s.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}O.inherits(n,s),n.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,s.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},n.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=i(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},n.prototype.closedSource=function(e){this.accumulate=!1;var t,r=this.streamFiles&&!e.file.dir,n=i(e,r,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(n.dirRecord),r)this.push({data:(t=e,R.DATA_DESCRIPTOR+I(t.crc32,4)+I(t.compressedSize,4)+I(t.uncompressedSize,4)),meta:{percent:100}});else for(this.push({data:n.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},n.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r,n,i,s,a,o,u=this.bytesWritten-e,h=(r=this.dirRecords.length,n=u,i=e,s=this.zipComment,a=this.encodeFileName,o=O.transformTo("string",a(s)),R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+I(r,2)+I(r,2)+I(n,4)+I(i,4)+I(o.length,2)+o);this.push({data:h,meta:{percent:100}})},n.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},n.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},n.prototype.resume=function(){return!!s.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},n.prototype.error=function(e){var t=this._sources;if(!s.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},n.prototype.lock=function(){s.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=n},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var h=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),u=0;try{e.forEach(function(e,t){u++;var r=function(e,t){var r=e||t,n=h[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=u}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.5.0",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var n=e("./utils"),i=e("./external"),o=e("./utf8"),u=e("./zipEntries"),s=e("./stream/Crc32Probe"),h=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new s);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,s){var a=this;return s=n.extend(s||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:o.utf8decode}),h.isNode&&h.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):n.prepareContent("the loaded zip file",e,!0,s.optimizedBinaryString,s.base64).then(function(e){var t=new u(s);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(s.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n];a.file(i.fileNameStr,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:s.createFolders})}return t.zipComment.length&&(a.comment=t.zipComment),a})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=f.getTypeOf(t),s=f.extend(r||{},d);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=h(e)),s.createFolders&&(n=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""}(e))&&g.call(this,n,!0);var a,o="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!o),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string"),a=t instanceof c||t instanceof l?t:m.isNode&&m.isStream(t)?new _(e,t):f.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var u=new p(e,a,s);this.files[e]=u}function h(e){return"/"!==e.slice(-1)&&(e+="/"),e}var i=e("./utf8"),f=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),d=e("./defaults"),c=e("./compressedObject"),p=e("./zipObject"),o=e("./generate"),m=e("./nodejsUtils"),_=e("./nodejs/NodejsStreamInputAdapter"),g=function(e,t){return t=void 0!==t?t:d.createFolders,e=h(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function u(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)this.files.hasOwnProperty(t)&&(n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n))},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(u(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(u(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=g.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(e){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=f.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");f.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(e){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(e){},lastIndexOfSignature:function(e){},readAndCheckSignature:function(e){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),u=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new u(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),f=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function u(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}u.prototype={accumulate:function(e){return o=this,u=e,new a.Promise(function(t,r){var n=[],i=o._internalType,s=o._outputType,a=o._mimeType;o.on("data",function(e,t){n.push(e),u&&u(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return f.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()});var o,u},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=u},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),u=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),h=new Array(256),i=0;i<256;i++)h[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function f(){n.call(this,"utf-8 encode")}h[254]=h[254]=1,s.utf8encode=function(e){return u.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=u.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return u.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=h[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(u.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(u.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(u.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+h[e[r]]>t?r:t}(t),i=t;n!==t.length&&(u.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(f,n),f.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=f},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,o){"use strict";var u=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),n=e("set-immediate-shim"),f=e("./external");function i(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}o.newBlob=function(t,r){o.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var s={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return u.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return u.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function a(e){var t=65536,r=o.getTypeOf(e),n=!0;if("uint8array"===r?n=s.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=s.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return s.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return s.stringifyByChar(e)}function d(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}o.applyFromCharCode=a;var c={};c.string={string:i,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:a,array:i,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return a(new Uint8Array(e))},array:function(e){return d(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:i,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:a,array:function(e){return d(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:i,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:a,array:function(e){return d(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return d(e,new Uint8Array(e.length))},nodebuffer:i},o.transformTo=function(e,t){if(t=t||"",!e)return t;o.checkSupport(e);var r=o.getTypeOf(t);return c[r][e](t)},o.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":u.nodebuffer&&r.isBuffer(e)?"nodebuffer":u.uint8array&&e instanceof Uint8Array?"uint8array":u.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},o.checkSupport=function(e){if(!u[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},o.MAX_VALUE_16BITS=65535,o.MAX_VALUE_32BITS=-1,o.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},o.delay=function(e,t,r){n(function(){e.apply(r||null,t||[])})},o.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},o.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])arguments[e].hasOwnProperty(t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},o.prepareContent=function(n,e,i,s,a){return f.Promise.resolve(e).then(function(n){return u.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new f.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t,r=o.getTypeOf(e);return r?("arraybuffer"===r?e=o.transformTo("uint8array",e):"string"===r&&(a?e=h.decode(e):i&&!0!==s&&(e=l(t=e,u.uint8array?new Uint8Array(t.length):new Array(t.length)))),e):f.Promise.reject(new Error("Can't read the data of '"+n+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=(e("./utf8"),e("./support"));function u(e){this.files=[],this.loadOptions=e}u.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=u},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),u=e("./compressions"),h=e("./support");function f(e,t){this.options=e,this.loadOptions=t}f.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in u)if(u.hasOwnProperty(t)&&u[t].magic===e)return u[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(e){if(this.extraFields[1]){var t=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=t.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=t.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=t.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=t.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=h.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=f},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),u=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new u("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof u?this._data:new i(this._data)}};for(var h=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],f=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},l=0;l<h.length;l++)n.prototype[h[l]]=f;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,f,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(h),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){h(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(h,0)};else{var o=new t.MessageChannel;o.port1.onmessage=h,r=function(){o.port2.postMessage(0)}}var u=[];function h(){var e,t;n=!0;for(var r=u.length;r;){for(t=u,u=[],e=-1;++e<r;)t[e]();r=u.length}n=!1}f.exports=function(e){1!==u.push(e)||n||r()}}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function h(){}var f={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==h&&c(this,e)}function u(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function l(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return f.reject(t,e)}e===t?f.reject(t,new TypeError("Cannot resolve promise with itself")):f.resolve(t,e)})}function d(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function c(t,e){var r=!1;function n(e){r||(r=!0,f.reject(t,e))}function i(e){r||(r=!0,f.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(h);return this.state!==n?l(r,this.state===a?e:t,this.outcome):this.queue.push(new u(r,e,t)),r},u.prototype.callFulfilled=function(e){f.resolve(this.promise,e)},u.prototype.otherCallFulfilled=function(e){l(this.promise,this.onFulfilled,e)},u.prototype.callRejected=function(e){f.reject(this.promise,e)},u.prototype.otherCallRejected=function(e){l(this.promise,this.onRejected,e)},f.resolve=function(e,t){var r=p(d,t);if("error"===r.status)return f.reject(e,r.value);var n=r.value;if(n)c(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},f.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){return e instanceof this?e:f.resolve(new this(h),e)},o.reject=function(e){var t=new this(h);return f.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);for(var s=new Array(n),a=0,t=-1,o=new this(h);++t<n;)u(e[t],t);return o;function u(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,f.resolve(o,s))},function(e){i||(i=!0,f.reject(o,e))})}},o.race=function(e){if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var t=e.length,r=!1;if(!t)return this.resolve([]);for(var n,i=-1,s=new this(h);++i<t;)n=e[i],this.resolve(n).then(function(e){r||(r=!0,f.resolve(s,e))},function(e){r||(r=!0,f.reject(s,e))});return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),u=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),h=Object.prototype.toString,f=0,l=-1,d=0,c=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:l,method:c,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==f)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?u.string2buf(t.dictionary):"[object ArrayBuffer]"===h.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==f)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=u.string2buf(e):"[object ArrayBuffer]"===h.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==f)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(u.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===f):2!==n||(this.onEnd(f),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===f&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var d=e("./zlib/inflate"),c=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=c.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=d.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,d.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,u=this.strm,h=this.options.chunkSize,f=this.options.dictionary,l=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?u.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?u.input=new Uint8Array(e):u.input=e,u.next_in=0,u.avail_in=u.input.length;do{if(0===u.avail_out&&(u.output=new c.Buf8(h),u.next_out=0,u.avail_out=h),(r=d.inflate(u,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&f&&(o="string"==typeof f?p.string2buf(f):"[object ArrayBuffer]"===_.call(f)?new Uint8Array(f):f,r=d.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===l&&(r=m.Z_OK,l=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);u.next_out&&(0!==u.avail_out&&r!==m.Z_STREAM_END&&(0!==u.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(u.output,u.next_out),s=u.next_out-i,a=p.buf2string(u.output,i),u.next_out=s,u.avail_out=h-s,s&&c.arraySet(u.output,u.output,i,s,0),this.onData(a)):this.onData(c.shrinkBuf(u.output,u.next_out)))),0===u.avail_in&&0===u.avail_out&&(l=!0)}while((0<u.avail_in||0===u.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=d.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(u.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=c.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var u=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var h=new u.Buf8(256),n=0;n<256;n++)h[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function f(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,u.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}h[254]=h[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new u.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return f(e,e.length)},r.binstring2buf=function(e){for(var t=new u.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=h[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return f(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+h[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var u,d=e("../utils/common"),h=e("./trees"),c=e("./adler32"),p=e("./crc32"),n=e("./messages"),f=0,l=0,m=-2,i=2,_=8,s=286,a=30,o=19,g=2*s+1,v=15,b=3,w=258,y=w+b+1,k=42,x=113;function S(e,t){return e.msg=n[t],t}function z(e){return(e<<1)-(4<e?9:0)}function E(e){for(var t=e.length;0<=--t;)e[t]=0}function C(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(d.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function A(e,t){h._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,C(e.strm)}function I(e,t){e.pending_buf[e.pending++]=t}function O(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function B(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,u=e.strstart>e.w_size-y?e.strstart-(e.w_size-y):0,h=e.window,f=e.w_mask,l=e.prev,d=e.strstart+w,c=h[s+a-1],p=h[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(h[(r=t)+a]===p&&h[r+a-1]===c&&h[r]===h[s]&&h[++r]===h[s+1]){s+=2,r++;do{}while(h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&h[++s]===h[++r]&&s<d);if(n=w-(d-s),s=d-w,a<n){if(e.match_start=t,o<=(a=n))break;c=h[s+a-1],p=h[s+a]}}}while((t=l[t&f])>u&&0!=--i);return a<=e.lookahead?a:e.lookahead}function T(e){var t,r,n,i,s,a,o,u,h,f,l=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=l+(l-y)){for(d.arraySet(e.window,e.window,l,l,0),e.match_start-=l,e.strstart-=l,e.block_start-=l,t=r=e.hash_size;n=e.head[--t],e.head[t]=l<=n?n-l:0,--r;);for(t=r=l;n=e.prev[--t],e.prev[t]=l<=n?n-l:0,--r;);i+=l}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,u=e.strstart+e.lookahead,f=void 0,(h=i)<(f=a.avail_in)&&(f=h),r=0===f?0:(a.avail_in-=f,d.arraySet(o,a.input,a.next_in,f,u),1===a.state.wrap?a.adler=c(a.adler,o,f,u):2===a.state.wrap&&(a.adler=p(a.adler,o,f,u)),a.next_in+=f,a.total_in+=f,f),e.lookahead+=r,e.lookahead+e.insert>=b)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+b-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<b)););}while(e.lookahead<y&&0!==e.strm.avail_in)}function R(e,t){for(var r,n;;){if(e.lookahead<y){if(T(e),e.lookahead<y&&t===f)return 1;if(0===e.lookahead)break}if(r=0,e.lookahead>=b&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-y&&(e.match_length=B(e,r)),e.match_length>=b)if(n=h._tr_tally(e,e.strstart-e.match_start,e.match_length-b),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=b){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=h._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=e.strstart<b-1?e.strstart:b-1,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}function D(e,t){for(var r,n,i;;){if(e.lookahead<y){if(T(e),e.lookahead<y&&t===f)return 1;if(0===e.lookahead)break}if(r=0,e.lookahead>=b&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=b-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-y&&(e.match_length=B(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===b&&4096<e.strstart-e.match_start)&&(e.match_length=b-1)),e.prev_length>=b&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-b,n=h._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-b),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+b-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=b-1,e.strstart++,n&&(A(e,!1),0===e.strm.avail_out))return 1}else if(e.match_available){if((n=h._tr_tally(e,0,e.window[e.strstart-1]))&&A(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return 1}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=h._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<b-1?e.strstart:b-1,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}function F(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function N(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=_,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*g),this.dyn_dtree=new d.Buf16(2*(2*a+1)),this.bl_tree=new d.Buf16(2*(2*o+1)),E(this.dyn_ltree),E(this.dyn_dtree),E(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(v+1),this.heap=new d.Buf16(2*s+1),E(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*s+1),E(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function U(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?k:x,e.adler=2===t.wrap?0:1,t.last_flush=f,h._tr_init(t),l):S(e,m)}function P(e){var t,r=U(e);return r===l&&((t=e.state).window_size=2*t.w_size,E(t.head),t.max_lazy_match=u[t.level].max_lazy,t.good_match=u[t.level].good_length,t.nice_match=u[t.level].nice_length,t.max_chain_length=u[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=b-1,t.match_available=0,t.ins_h=0),r}function L(e,t,r,n,i,s){if(!e)return m;var a=1;if(-1===t&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||9<i||r!==_||n<8||15<n||t<0||9<t||s<0||4<s)return S(e,m);8===n&&(n=9);var o=new N;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+b-1)/b),o.window=new d.Buf8(2*o.w_size),o.head=new d.Buf16(o.hash_size),o.prev=new d.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new d.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,P(e)}u=[new F(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(T(e),0===e.lookahead&&t===f)return 1;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,A(e,!1),0===e.strm.avail_out))return 1;if(e.strstart-e.block_start>=e.w_size-y&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,4===t?(A(e,!0),0===e.strm.avail_out?3:4):(e.strstart>e.block_start&&(A(e,!1),e.strm.avail_out),1)}),new F(4,4,8,4,R),new F(4,5,16,8,R),new F(4,6,32,32,R),new F(4,4,16,16,D),new F(8,16,32,32,D),new F(8,16,128,128,D),new F(8,32,128,256,D),new F(32,128,258,1024,D),new F(32,258,258,4096,D)],r.deflateInit=function(e,t){return L(e,t,_,15,8,0)},r.deflateInit2=L,r.deflateReset=P,r.deflateResetKeep=U,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?m:(e.state.gzhead=t,l):m},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?S(e,m):m;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&4!==t)return S(e,0===e.avail_out?-5:m);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===k)if(2===n.wrap)e.adler=0,I(n,31),I(n,139),I(n,8),n.gzhead?(I(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),I(n,255&n.gzhead.time),I(n,n.gzhead.time>>8&255),I(n,n.gzhead.time>>16&255),I(n,n.gzhead.time>>24&255),I(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),I(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(I(n,255&n.gzhead.extra.length),I(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(I(n,0),I(n,0),I(n,0),I(n,0),I(n,0),I(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),I(n,3),n.status=x);else{var a=_+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=x,O(n,a),0!==n.strstart&&(O(n,e.adler>>>16),O(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),C(e),i=n.pending,n.pending!==n.pending_buf_size));)I(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),C(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,I(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),C(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,I(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&C(e),n.pending+2<=n.pending_buf_size&&(I(n,255&e.adler),I(n,e.adler>>8&255),e.adler=0,n.status=x)):n.status=x),0!==n.pending){if(C(e),0===e.avail_out)return n.last_flush=-1,l}else if(0===e.avail_in&&z(t)<=z(r)&&4!==t)return S(e,-5);if(666===n.status&&0!==e.avail_in)return S(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==f&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(T(e),0===e.lookahead)){if(t===f)return 1;break}if(e.match_length=0,r=h._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=w){if(T(e),e.lookahead<=w&&t===f)return 1;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=b&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+w;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=w-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=b?(r=h._tr_tally(e,1,e.match_length-b),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=h._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(A(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,4===t?(A(e,!0),0===e.strm.avail_out?3:4):e.last_lit&&(A(e,!1),0===e.strm.avail_out)?1:2}(n,t):u[n.level].func(n,t);if(3!==o&&4!==o||(n.status=666),1===o||3===o)return 0===e.avail_out&&(n.last_flush=-1),l;if(2===o&&(1===t?h._tr_align(n):5!==t&&(h._tr_stored_block(n,0,0,!1),3===t&&(E(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),C(e),0===e.avail_out))return n.last_flush=-1,l}return 4!==t?l:n.wrap<=0?1:(2===n.wrap?(I(n,255&e.adler),I(n,e.adler>>8&255),I(n,e.adler>>16&255),I(n,e.adler>>24&255),I(n,255&e.total_in),I(n,e.total_in>>8&255),I(n,e.total_in>>16&255),I(n,e.total_in>>24&255)):(O(n,e.adler>>>16),O(n,65535&e.adler)),C(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?l:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==k&&69!==t&&73!==t&&91!==t&&103!==t&&t!==x&&666!==t?S(e,m):(e.state=null,t===x?S(e,-3):l):m},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,u,h,f=t.length;if(!e||!e.state)return m;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==k||r.lookahead)return m;for(1===s&&(e.adler=c(e.adler,t,f,0)),r.wrap=0,f>=r.w_size&&(0===s&&(E(r.head),r.strstart=0,r.block_start=0,r.insert=0),h=new d.Buf8(r.w_size),d.arraySet(h,t,f-r.w_size,r.w_size,0),t=h,f=r.w_size),a=e.avail_in,o=e.next_in,u=e.input,e.avail_in=f,e.next_in=0,e.input=t,T(r);r.lookahead>=b;){for(n=r.strstart,i=r.lookahead-(b-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+b-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=b-1,T(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=b-1,r.match_available=0,e.next_in=o,e.input=u,e.avail_in=a,r.wrap=s,l},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,u,h,f,l,d,c,p,m,_,g,v,b,w,y,k,x,S,z,E;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,E=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),u=r.dmax,h=r.wsize,f=r.whave,l=r.wnext,d=r.window,c=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,v=(1<<r.distbits)-1;e:do{p<15&&(c+=z[n++]<<p,p+=8,c+=z[n++]<<p,p+=8),b=m[c&g];t:for(;;){if(c>>>=w=b>>>24,p-=w,0==(w=b>>>16&255))E[s++]=65535&b;else{if(!(16&w)){if(0==(64&w)){b=m[(65535&b)+(c&(1<<w)-1)];continue t}if(32&w){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}y=65535&b,(w&=15)&&(p<w&&(c+=z[n++]<<p,p+=8),y+=c&(1<<w)-1,c>>>=w,p-=w),p<15&&(c+=z[n++]<<p,p+=8,c+=z[n++]<<p,p+=8),b=_[c&v];r:for(;;){if(c>>>=w=b>>>24,p-=w,!(16&(w=b>>>16&255))){if(0==(64&w)){b=_[(65535&b)+(c&(1<<w)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&b,p<(w&=15)&&(c+=z[n++]<<p,(p+=8)<w&&(c+=z[n++]<<p,p+=8)),u<(k+=c&(1<<w)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(c>>>=w,p-=w,(w=s-a)<k){if(f<(w=k-w)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=d,(x=0)===l){if(x+=h-w,w<y){for(y-=w;E[s++]=d[x++],--w;);x=s-k,S=E}}else if(l<w){if(x+=h+l-w,(w-=l)<y){for(y-=w;E[s++]=d[x++],--w;);if(x=0,l<y){for(y-=w=l;E[s++]=d[x++],--w;);x=s-k,S=E}}}else if(x+=l-w,w<y){for(y-=w;E[s++]=d[x++],--w;);x=s-k,S=E}for(;2<y;)E[s++]=S[x++],E[s++]=S[x++],E[s++]=S[x++],y-=3;y&&(E[s++]=S[x++],1<y&&(E[s++]=S[x++]))}else{for(x=s-k;E[s++]=E[x++],E[s++]=E[x++],E[s++]=E[x++],2<(y-=3););y&&(E[s++]=E[x++],1<y&&(E[s++]=E[x++]))}break}}break}}while(n<i&&s<o);n-=y=p>>3,c&=(1<<(p-=y<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=c,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),T=e("./inffast"),R=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function u(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function h(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=u(e,t))!==N&&(e.state=null),r):U}var f,l,d=!0;function j(e){if(d){var t;for(f=new I.Buf32(512),l=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(R(D,e.lens,0,288,f,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;R(F,e.lens,0,32,l,0,e.work,{bits:5}),d=!1}e.lencode=f,e.lenbits=9,e.distcode=l,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=u,r.inflateResetKeep=a,r.inflateInit=function(e){return h(e,15)},r.inflateInit2=h,r.inflate=function(e,t){var r,n,i,s,a,o,u,h,f,l,d,c,p,m,_,g,v,b,w,y,k,x,S,z,E=0,C=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,u=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,h=r.hold,f=r.bits,l=o,d=u,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(2&r.wrap&&35615===h){C[r.check=0]=255&h,C[1]=h>>>8&255,r.check=B(r.check,C,2,0),f=h=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&h)<<8)+(h>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&h)){e.msg="unknown compression method",r.mode=30;break}if(f-=4,k=8+(15&(h>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&h?10:12,f=h=0;break;case 2:for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(r.flags=h,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=h>>8&1),512&r.flags&&(C[0]=255&h,C[1]=h>>>8&255,r.check=B(r.check,C,2,0)),f=h=0,r.mode=3;case 3:for(;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.head&&(r.head.time=h),512&r.flags&&(C[0]=255&h,C[1]=h>>>8&255,C[2]=h>>>16&255,C[3]=h>>>24&255,r.check=B(r.check,C,4,0)),f=h=0,r.mode=4;case 4:for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.head&&(r.head.xflags=255&h,r.head.os=h>>8),512&r.flags&&(C[0]=255&h,C[1]=h>>>8&255,r.check=B(r.check,C,2,0)),f=h=0,r.mode=5;case 5:if(1024&r.flags){for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.length=h,r.head&&(r.head.extra_len=h),512&r.flags&&(C[0]=255&h,C[1]=h>>>8&255,r.check=B(r.check,C,2,0)),f=h=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(c=r.length)&&(c=o),c&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,c,k)),512&r.flags&&(r.check=B(r.check,n,c,s)),o-=c,s+=c,r.length-=c),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(c=0;k=n[s+c++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,n,c,s)),o-=c,s+=c,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(c=0;k=n[s+c++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,n,c,s)),o-=c,s+=c,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;f<16;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(h!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}f=h=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}e.adler=r.check=L(h),f=h=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=u,e.next_in=s,e.avail_in=o,r.hold=h,r.bits=f,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){h>>>=7&f,f-=7&f,r.mode=27;break}for(;f<3;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}switch(r.last=1&h,f-=1,3&(h>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;h>>>=2,f-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}h>>>=2,f-=2;break;case 14:for(h>>>=7&f,f-=7&f;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if((65535&h)!=(h>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&h,f=h=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(c=r.length){if(o<c&&(c=o),u<c&&(c=u),0===c)break e;I.arraySet(i,n,s,c,a),o-=c,s+=c,u-=c,a+=c,r.length-=c;break}r.mode=12;break;case 17:for(;f<14;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(r.nlen=257+(31&h),h>>>=5,f-=5,r.ndist=1+(31&h),h>>>=5,f-=5,r.ncode=4+(15&h),h>>>=4,f-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;f<3;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.lens[A[r.have++]]=7&h,h>>>=3,f-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=R(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(E=r.lencode[h&(1<<r.lenbits)-1])>>>16&255,v=65535&E,!((_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(v<16)h>>>=_,f-=_,r.lens[r.have++]=v;else{if(16===v){for(z=_+2;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(h>>>=_,f-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],c=3+(3&h),h>>>=2,f-=2}else if(17===v){for(z=_+3;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}f-=_,k=0,c=3+(7&(h>>>=_)),h>>>=3,f-=3}else{for(z=_+7;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}f-=_,k=0,c=11+(127&(h>>>=_)),h>>>=7,f-=7}if(r.have+c>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;c--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=R(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=R(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=u){e.next_out=a,e.avail_out=u,e.next_in=s,e.avail_in=o,r.hold=h,r.bits=f,T(e,d),a=e.next_out,i=e.output,u=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,h=r.hold,f=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(E=r.lencode[h&(1<<r.lenbits)-1])>>>16&255,v=65535&E,!((_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(g&&0==(240&g)){for(b=_,w=g,y=v;g=(E=r.lencode[y+((h&(1<<b+w)-1)>>b)])>>>16&255,v=65535&E,!(b+(_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}h>>>=b,f-=b,r.back+=b}if(h>>>=_,f-=_,r.back+=_,r.length=v,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.length+=h&(1<<r.extra)-1,h>>>=r.extra,f-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(E=r.distcode[h&(1<<r.distbits)-1])>>>16&255,v=65535&E,!((_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(0==(240&g)){for(b=_,w=g,y=v;g=(E=r.distcode[y+((h&(1<<b+w)-1)>>b)])>>>16&255,v=65535&E,!(b+(_=E>>>24)<=f);){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}h>>>=b,f-=b,r.back+=b}if(h>>>=_,f-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=v,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;f<z;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}r.offset+=h&(1<<r.extra)-1,h>>>=r.extra,f-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===u)break e;if(c=d-u,r.offset>c){if((c=r.offset-c)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=c>r.wnext?(c-=r.wnext,r.wsize-c):r.wnext-c,c>r.length&&(c=r.length),m=r.window}else m=i,p=a-r.offset,c=r.length;for(u<c&&(c=u),u-=c,r.length-=c;i[a++]=m[p++],--c;);0===r.length&&(r.mode=21);break;case 26:if(0===u)break e;i[a++]=r.length,u--,r.mode=21;break;case 27:if(r.wrap){for(;f<32;){if(0===o)break e;o--,h|=n[s++]<<f,f+=8}if(d-=u,e.total_out+=d,r.total+=d,d&&(e.adler=r.check=r.flags?B(r.check,i,d,a-d):O(r.check,i,d,a-d)),d=u,(r.flags?h:L(h))!==r.check){e.msg="incorrect data check",r.mode=30;break}f=h=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;f<32;){if(0===o)break e;o--,h+=n[s++]<<f,f+=8}if(h!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}f=h=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=u,e.next_in=s,e.avail_in=o,r.hold=h,r.bits=f,(r.wsize||d!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,d-e.avail_out)?(r.mode=31,-4):(l-=e.avail_in,d-=e.avail_out,e.total_in+=l,e.total_out+=d,r.total+=d,r.wrap&&d&&(e.adler=r.check=r.flags?B(r.check,i,d,e.next_out-d):O(r.check,i,d,e.next_out-d)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==l&&0===d||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var u,h,f,l,d,c,p,m,_,g=o.bits,v=0,b=0,w=0,y=0,k=0,x=0,S=0,z=0,E=0,C=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),T=null,R=0;for(v=0;v<=15;v++)O[v]=0;for(b=0;b<n;b++)O[t[r+b]]++;for(k=g,y=15;1<=y&&0===O[y];y--);if(y<k&&(k=y),0===y)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(w=1;w<y&&0===O[w];w++);for(k<w&&(k=w),v=z=1;v<=15;v++)if(z<<=1,(z-=O[v])<0)return-1;if(0<z&&(0===e||1!==y))return-1;for(B[1]=0,v=1;v<15;v++)B[v+1]=B[v]+O[v];for(b=0;b<n;b++)0!==t[r+b]&&(a[B[t[r+b]]++]=b);if(c=0===e?(A=T=a,19):1===e?(A=F,I-=257,T=N,R-=257,256):(A=U,T=P,-1),v=w,d=s,S=b=C=0,f=-1,l=(E=1<<(x=k))-1,1===e&&852<E||2===e&&592<E)return 1;for(;;){for(p=v-S,_=a[b]<c?(m=0,a[b]):a[b]>c?(m=T[R+a[b]],A[I+a[b]]):(m=96,0),u=1<<v-S,w=h=1<<x;i[d+(C>>S)+(h-=u)]=p<<24|m<<16|_|0,0!==h;);for(u=1<<v-1;C&u;)u>>=1;if(0!==u?(C&=u-1,C+=u):C=0,b++,0==--O[v]){if(v===y)break;v=t[r+a[b]]}if(k<v&&(C&l)!==f){for(0===S&&(S=k),d+=w,z=1<<(x=v-S);x+S<y&&!((z-=O[x+S])<=0);)x++,z<<=1;if(E+=1<<x,1===e&&852<E||2===e&&592<E)return 1;i[f=C&l]=k<<24|x<<16|d-s|0}}return 0!==C&&(i[d+C]=v-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var o=e("../utils/common");function n(e){for(var t=e.length;0<=--t;)e[t]=0}var _=15,i=16,u=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],h=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],f=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],l=new Array(576);n(l);var d=new Array(60);n(d);var c=new Array(512);n(c);var p=new Array(256);n(p);var m=new Array(29);n(m);var g,v,b,w=new Array(30);function y(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function s(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function k(e){return e<256?c[e]:c[256+(e>>>7)]}function x(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function S(e,t,r){e.bi_valid>i-r?(e.bi_buf|=t<<e.bi_valid&65535,x(e,e.bi_buf),e.bi_buf=t>>i-e.bi_valid,e.bi_valid+=r-i):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function z(e,t,r){S(e,r[2*t],r[2*t+1])}function E(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function C(e,t,r){var n,i,s=new Array(_+1),a=0;for(n=1;n<=_;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=E(s[o]++,o))}}function A(e){var t;for(t=0;t<286;t++)e.dyn_ltree[2*t]=0;for(t=0;t<30;t++)e.dyn_dtree[2*t]=0;for(t=0;t<19;t++)e.bl_tree[2*t]=0;e.dyn_ltree[512]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function I(e){8<e.bi_valid?x(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function O(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function B(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&O(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!O(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function T(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?z(e,i,t):(z(e,(s=p[i])+256+1,t),0!==(a=u[s])&&S(e,i-=m[s],a),z(e,s=k(--n),r),0!==(a=h[s])&&S(e,n-=w[s],a)),o<e.last_lit;);z(e,256,t)}function R(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,u=t.stat_desc.elems,h=-1;for(e.heap_len=0,e.heap_max=573,r=0;r<u;r++)0!==s[2*r]?(e.heap[++e.heap_len]=h=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=h<2?++h:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=h,r=e.heap_len>>1;1<=r;r--)B(e,s,r);for(i=u;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],B(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,B(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,u=t.dyn_tree,h=t.max_code,f=t.stat_desc.static_tree,l=t.stat_desc.has_stree,d=t.stat_desc.extra_bits,c=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=_;s++)e.bl_count[s]=0;for(u[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<573;r++)p<(s=u[2*u[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),u[2*n+1]=s,h<n||(e.bl_count[s]++,a=0,c<=n&&(a=d[n-c]),o=u[2*n],e.opt_len+=o*(s+a),l&&(e.static_len+=o*(f[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)h<(i=e.heap[--r])||(u[2*i+1]!==s&&(e.opt_len+=(s-u[2*i+1])*u[2*i],u[2*i+1]=s),n--)}}(e,t),C(s,h,e.bl_count)}function D(e,t,r){var n,i,s=-1,a=t[1],o=0,u=7,h=4;for(0===a&&(u=138,h=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<u&&i===a||(o<h?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[32]++):o<=10?e.bl_tree[34]++:e.bl_tree[36]++,s=i,h=(o=0)===a?(u=138,3):i===a?(u=6,3):(u=7,4))}function F(e,t,r){var n,i,s=-1,a=t[1],o=0,u=7,h=4;for(0===a&&(u=138,h=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<u&&i===a)){if(o<h)for(;z(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(z(e,i,e.bl_tree),o--),z(e,16,e.bl_tree),S(e,o-3,2)):o<=10?(z(e,17,e.bl_tree),S(e,o-3,3)):(z(e,18,e.bl_tree),S(e,o-11,7));s=i,h=(o=0)===a?(u=138,3):i===a?(u=6,3):(u=7,4)}}n(w);var N=!1;function U(e,t,r,n){var i,s,a;S(e,0+(n?1:0),3),s=t,a=r,I(i=e),x(i,a),x(i,~a),o.arraySet(i.pending_buf,i.window,s,a,i.pending),i.pending+=a}r._tr_init=function(e){N||(function(){var e,t,r,n,i,s=new Array(_+1);for(n=r=0;n<28;n++)for(m[n]=r,e=0;e<1<<u[n];e++)p[r++]=n;for(p[r-1]=n,n=i=0;n<16;n++)for(w[n]=i,e=0;e<1<<h[n];e++)c[i++]=n;for(i>>=7;n<30;n++)for(w[n]=i<<7,e=0;e<1<<h[n]-7;e++)c[256+i++]=n;for(t=0;t<=_;t++)s[t]=0;for(e=0;e<=143;)l[2*e+1]=8,e++,s[8]++;for(;e<=255;)l[2*e+1]=9,e++,s[9]++;for(;e<=279;)l[2*e+1]=7,e++,s[7]++;for(;e<=287;)l[2*e+1]=8,e++,s[8]++;for(C(l,287,s),e=0;e<30;e++)d[2*e+1]=5,d[2*e]=E(e,5);g=new y(l,u,257,286,_),v=new y(d,h,0,30,_),b=new y(new Array(0),a,0,19,7)}(),N=!0),e.l_desc=new s(e.dyn_ltree,g),e.d_desc=new s(e.dyn_dtree,v),e.bl_desc=new s(e.bl_tree,b),e.bi_buf=0,e.bi_valid=0,A(e)},r._tr_stored_block=U,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return 0;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return 1;for(t=32;t<256;t++)if(0!==e.dyn_ltree[2*t])return 1;return 0}(e)),R(e,e.l_desc),R(e,e.d_desc),a=function(e){var t;for(D(e,e.dyn_ltree,e.l_desc.max_code),D(e,e.dyn_dtree,e.d_desc.max_code),R(e,e.bl_desc),t=18;3<=t&&0===e.bl_tree[2*f[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?U(e,t,r,n):4===e.strategy||s===i?(S(e,2+(n?1:0),3),T(e,l,d)):(S(e,4+(n?1:0),3),function(e,t,r,n){var i;for(S(e,t-257,5),S(e,r-1,5),S(e,n-4,4),i=0;i<n;i++)S(e,e.bl_tree[2*f[i]+1],3);F(e,e.dyn_ltree,t-1),F(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),T(e,e.dyn_ltree,e.dyn_dtree)),A(e),n&&I(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(p[r]+256+1)]++,e.dyn_dtree[2*k(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){var t;S(e,2,3),z(e,256,l),16===(t=e).bi_valid?(x(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):8<=t.bi_valid&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){"use strict";t.exports="function"==typeof setImmediate?setImmediate:function(){var e=[].slice.apply(arguments);e.splice(1,0,0),setTimeout.apply(null,e)}},{}]},{},[10])(10)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)})}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1])(1)});

/***/ }),

/***/ "./node_modules/nearley/lib/nearley.js":
/*!*********************************************!*\
  !*** ./node_modules/nearley/lib/nearley.js ***!
  \*********************************************/
/***/ (function(module) {

(function(root, factory) {
    if ( true && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

    function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols;        // a list of literal | regex class | nonterminal
        this.postprocess = postprocess;
        return this;
    }
    Rule.highestId = 0;

    Rule.prototype.toString = function(withCursorAt) {
        var symbolSequence = (typeof withCursorAt === "undefined")
                             ? this.symbols.map(getSymbolShortDisplay).join(' ')
                             : (   this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ')
                                 + " ● "
                                 + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' ')     );
        return this.name + " → " + symbolSequence;
    }


    // a State is a rule at a position from a given starting point in the input stream (reference)
    function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
    }

    State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    };

    State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
            state.data = state.build();
            // Having right set here will prevent the right state and its children
            // form being garbage collected
            state.right = undefined;
        }
        return state;
    };

    State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
            children.push(node.right.data);
            node = node.left;
        } while (node.left);
        children.reverse();
        return children;
    };

    State.prototype.finish = function() {
        if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
    };


    function Column(grammar, index) {
        this.grammar = grammar;
        this.index = index;
        this.states = [];
        this.wants = {}; // states indexed by the non-terminal they expect
        this.scannable = []; // list of states that expect a token
        this.completed = {}; // states that are nullable
    }


    Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;

        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
            var state = states[w];

            if (state.isComplete) {
                state.finish();
                if (state.data !== Parser.fail) {
                    // complete
                    var wantedBy = state.wantedBy;
                    for (var i = wantedBy.length; i--; ) { // this line is hot
                        var left = wantedBy[i];
                        this.complete(left, state);
                    }

                    // special-case nullables
                    if (state.reference === this.index) {
                        // make sure future predictors of this rule get completed.
                        var exp = state.rule.name;
                        (this.completed[exp] = this.completed[exp] || []).push(state);
                    }
                }

            } else {
                // queue scannable states
                var exp = state.rule.symbols[state.dot];
                if (typeof exp !== 'string') {
                    this.scannable.push(state);
                    continue;
                }

                // predict
                if (wants[exp]) {
                    wants[exp].push(state);

                    if (completed.hasOwnProperty(exp)) {
                        var nulls = completed[exp];
                        for (var i = 0; i < nulls.length; i++) {
                            var right = nulls[i];
                            this.complete(state, right);
                        }
                    }
                } else {
                    wants[exp] = [state];
                    this.predict(exp);
                }
            }
        }
    }

    Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];

        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
        }
    }

    Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }


    function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }

    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
          start = rules.ParserStart;
          rules = rules.ParserRules;
        }
        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
        var g = new Grammar(rules, start);
        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
        return g;
    }


    function StreamLexer() {
      this.reset("");
    }

    StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
    }

    StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === '\n') {
              this.line += 1;
              this.lastLineBreak = this.index;
            }
            return {value: ch};
        }
    }

    StreamLexer.prototype.save = function() {
      return {
        line: this.line,
        col: this.index - this.lastLineBreak,
      }
    }

    StreamLexer.prototype.formatError = function(token, message) {
        // nb. this gets called after consuming the offending token,
        // so the culprit is index-1
        var buffer = this.buffer;
        if (typeof buffer === 'string') {
            var lines = buffer
                .split("\n")
                .slice(
                    Math.max(0, this.line - 5), 
                    this.line
                );

            var nextLineBreak = buffer.indexOf('\n', this.index);
            if (nextLineBreak === -1) nextLineBreak = buffer.length;
            var col = this.index - this.lastLineBreak;
            var lastLineDigits = String(this.line).length;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += lines
                .map(function(line, i) {
                    return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
                }, this)
                .join("\n");
            message += "\n" + pad("", lastLineDigits + col) + "^\n";
            return message;
        } else {
            return message + " at index " + (this.index - 1);
        }

        function pad(n, length) {
            var s = String(n);
            return Array(length - s.length + 1).join(" ") + s;
        }
    }

    function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
            var grammar = rules;
            var options = start;
        } else {
            var grammar = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar;

        // Read options
        this.options = {
            keepHistory: false,
            lexer: grammar.lexer || new StreamLexer,
        };
        for (var key in (options || {})) {
            this.options[key] = options[key];
        }

        // Setup lexer
        this.lexer = this.options.lexer;
        this.lexerState = undefined;

        // Setup a table
        var column = new Column(grammar, 0);
        var table = this.table = [column];

        // I could be expecting anything.
        column.wants[grammar.start] = [];
        column.predict(grammar.start);
        // TODO what if start rule is nullable?
        column.process();
        this.current = 0; // token index
    }

    // create a reserved token for indicating a parse fail
    Parser.fail = {};

    Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);

        var token;
        while (true) {
            try {
                token = lexer.next();
                if (!token) {
                    break;
                }
            } catch (e) {
                // Create the next column so that the error reporter
                // can display the correctly predicted states.
                var nextColumn = new Column(this.grammar, this.current + 1);
                this.table.push(nextColumn);
                var err = new Error(this.reportLexerError(e));
                err.offset = this.current;
                err.token = e.token;
                throw err;
            }
            // We add new states to table[current+1]
            var column = this.table[this.current];

            // GC unused states
            if (!this.options.keepHistory) {
                delete this.table[this.current - 1];
            }

            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);

            // Advance all tokens that expect the symbol
            var literal = token.text !== undefined ? token.text : token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for (var w = scannable.length; w--; ) {
                var state = scannable[w];
                var expect = state.rule.symbols[state.dot];
                // Try to consume the token
                // either regex or literal
                if (expect.test ? expect.test(value) :
                    expect.type ? expect.type === token.type
                                : expect.literal === literal) {
                    // Add it
                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                    nextColumn.states.push(next);
                }
            }

            // Next, for each of the rules, we either
            // (a) complete it, and try to see if the reference row expected that
            //     rule
            // (b) predict the next nonterminal it expects by adding that
            //     nonterminal's start state
            // To prevent duplication, we also keep track of rules we have already
            // added

            nextColumn.process();

            // If needed, throw an error:
            if (nextColumn.states.length === 0) {
                // No states at all! This is not good.
                var err = new Error(this.reportError(token));
                err.offset = this.current;
                err.token = token;
                throw err;
            }

            // maybe save lexer state
            if (this.options.keepHistory) {
              column.lexerState = lexer.save()
            }

            this.current++;
        }
        if (column) {
          this.lexerState = lexer.save()
        }

        // Incrementally keep track of results
        this.results = this.finish();

        // Allow chaining, for whatever it's worth
        return this;
    };

    Parser.prototype.reportLexerError = function(lexerError) {
        var tokenDisplay, lexerMessage;
        // Planning to add a token property to moo's thrown error
        // even on erroring tokens to be used in error display below
        var token = lexerError.token;
        if (token) {
            tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
            lexerMessage = this.lexer.formatError(token, "Syntax error");
        } else {
            tokenDisplay = "input (lexer error)";
            lexerMessage = lexerError.message;
        }
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };

    Parser.prototype.reportError = function(token) {
        var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
        var lexerMessage = this.lexer.formatError(token, "Syntax error");
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };

    Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
        var lines = [];
        lines.push(lexerMessage);
        var lastColumnIndex = this.table.length - 2;
        var lastColumn = this.table[lastColumnIndex];
        var expectantStates = lastColumn.states
            .filter(function(state) {
                var nextSymbol = state.rule.symbols[state.dot];
                return nextSymbol && typeof nextSymbol !== "string";
            });

        if (expectantStates.length === 0) {
            lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
            this.displayStateStack(lastColumn.states, lines);
        } else {
            lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
            // Display a "state stack" for each expectant state
            // - which shows you how this state came to be, step by step.
            // If there is more than one derivation, we only display the first one.
            var stateStacks = expectantStates
                .map(function(state) {
                    return this.buildFirstStateStack(state, []) || [state];
                }, this);
            // Display each state that is expecting a terminal symbol next.
            stateStacks.forEach(function(stateStack) {
                var state = stateStack[0];
                var nextSymbol = state.rule.symbols[state.dot];
                var symbolDisplay = this.getSymbolDisplay(nextSymbol);
                lines.push('A ' + symbolDisplay + ' based on:');
                this.displayStateStack(stateStack, lines);
            }, this);
        }
        lines.push("");
        return lines.join("\n");
    }
    
    Parser.prototype.displayStateStack = function(stateStack, lines) {
        var lastDisplay;
        var sameDisplayCount = 0;
        for (var j = 0; j < stateStack.length; j++) {
            var state = stateStack[j];
            var display = state.rule.toString(state.dot);
            if (display === lastDisplay) {
                sameDisplayCount++;
            } else {
                if (sameDisplayCount > 0) {
                    lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
                }
                sameDisplayCount = 0;
                lines.push('    ' + display);
            }
            lastDisplay = display;
        }
    };

    Parser.prototype.getSymbolDisplay = function(symbol) {
        return getSymbolLongDisplay(symbol);
    };

    /*
    Builds a the first state stack. You can think of a state stack as the call stack
    of the recursive-descent parser which the Nearley parse algorithm simulates.
    A state stack is represented as an array of state objects. Within a
    state stack, the first item of the array will be the starting
    state, with each successive item in the array going further back into history.

    This function needs to be given a starting state and an empty array representing
    the visited states, and it returns an single state stack.

    */
    Parser.prototype.buildFirstStateStack = function(state, visited) {
        if (visited.indexOf(state) !== -1) {
            // Found cycle, return null
            // to eliminate this path from the results, because
            // we don't know how to display it meaningfully
            return null;
        }
        if (state.wantedBy.length === 0) {
            return [state];
        }
        var prevState = state.wantedBy[0];
        var childVisited = [state].concat(visited);
        var childResult = this.buildFirstStateStack(prevState, childVisited);
        if (childResult === null) {
            return null;
        }
        return [state].concat(childResult);
    };

    Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
    };

    Parser.prototype.restore = function(column) {
        var index = column.index;
        this.current = index;
        this.table[index] = column;
        this.table.splice(index + 1);
        this.lexerState = column.lexerState;

        // Incrementally keep track of results
        this.results = this.finish();
    };

    // nb. deprecated: use save/restore instead!
    Parser.prototype.rewind = function(index) {
        if (!this.options.keepHistory) {
            throw new Error('set option `keepHistory` to enable rewinding')
        }
        // nb. recall column (table) indicies fall between token indicies.
        //        col 0   --   token 0   --   col 1
        this.restore(this.table[index]);
    };

    Parser.prototype.finish = function() {
        // Return the possible parsings
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1]
        column.states.forEach(function (t) {
            if (t.rule.name === start
                    && t.dot === t.rule.symbols.length
                    && t.reference === 0
                    && t.data !== Parser.fail) {
                considerations.push(t);
            }
        });
        return considerations.map(function(c) {return c.data; });
    };

    function getSymbolLongDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return 'character matching ' + symbol;
            } else if (symbol.type) {
                return symbol.type + ' token';
            } else if (symbol.test) {
                return 'token matching ' + String(symbol.test);
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }

    function getSymbolShortDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return symbol.toString();
            } else if (symbol.type) {
                return '%' + symbol.type;
            } else if (symbol.test) {
                return '<' + String(symbol.test) + '>';
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }

    return {
        Parser: Parser,
        Grammar: Grammar,
        Rule: Rule,
    };

}));


/***/ }),

/***/ "./src/game/AlphaPicture.ts":
/*!**********************************!*\
  !*** ./src/game/AlphaPicture.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Picture_1 = __importDefault(__webpack_require__(/*! ./Picture */ "./src/game/Picture.ts"));
class AlphaPicture extends Picture_1.default {
    constructor(resources, colorImage, alphaImage, x = 0, y = 0) {
        super(resources, colorImage, x, y);
        const { width, height } = colorImage;
        const alphaContext = resources.getCanvas(width, height);
        alphaContext.drawImage(alphaImage, 0, 0);
        const alphaImageData = alphaContext.getImageData(0, 0, width, height);
        // draws base image onto canvas
        this.context2d = resources.getCanvas(width, height);
        this.context2d.drawImage(colorImage, 0, 0);
        const colorImageData = this.context2d.getImageData(0, 0, width, height);
        for (let i = 0, n = colorImageData.data.length; i < n; i += 4) {
            colorImageData.data[i + 3] =
                (alphaImageData.data[i] +
                    alphaImageData.data[i + 1] +
                    alphaImageData.data[i + 2]) /
                    3;
        }
        resources.freeCanvas(alphaContext);
        this.context2d.putImageData(colorImageData, 0, 0);
        this.image = this.context2d.canvas;
    }
}
exports.default = AlphaPicture;


/***/ }),

/***/ "./src/game/Animation.ts":
/*!*******************************!*\
  !*** ./src/game/Animation.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Orientation = void 0;
const AlphaPicture_1 = __importDefault(__webpack_require__(/*! ./AlphaPicture */ "./src/game/AlphaPicture.ts"));
var Orientation;
(function (Orientation) {
    Orientation[Orientation["horizontal"] = 0] = "horizontal";
    Orientation[Orientation["vertical"] = 1] = "vertical";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
class Animation extends AlphaPicture_1.default {
    constructor(resources, colorImage, alphaImage, x, y, framesCount, orientation) {
        super(resources, colorImage, alphaImage, x, y);
        this.framesCount = framesCount;
        this.orientation = orientation;
        this.currentFrame = 0;
    }
    get height() {
        return this.orientation === Orientation.vertical
            ? super.height / this.framesCount
            : super.height;
    }
    get width() {
        return this.orientation === Orientation.horizontal
            ? super.width / this.framesCount
            : super.width;
    }
    draw(ctx, sx = 0, sy = 0, width = this.width, height = this.height, x = this.x, y = this.y) {
        let frameX = 0;
        let frameY = 0;
        if (this.orientation === Orientation.vertical) {
            frameY = this.height * Math.floor(this.currentFrame);
        }
        else {
            frameX = this.width * Math.floor(this.currentFrame);
        }
        super.draw(ctx, frameX + sx, frameY + sy, width, height, x, y);
    }
    nextFrame() {
        this.currentFrame = ++this.currentFrame % this.framesCount;
    }
}
exports.default = Animation;


/***/ }),

/***/ "./src/game/Button.ts":
/*!****************************!*\
  !*** ./src/game/Button.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Animation_1 = __importStar(__webpack_require__(/*! ./Animation */ "./src/game/Animation.ts"));
var MouseState;
(function (MouseState) {
    MouseState[MouseState["Out"] = 0] = "Out";
    MouseState[MouseState["Over"] = 1] = "Over";
    MouseState[MouseState["Down"] = 2] = "Down";
    MouseState[MouseState["Focus"] = 3] = "Focus";
})(MouseState || (MouseState = {}));
class Button extends Animation_1.default {
    constructor(resources, colorImage, alphaImage, x, y) {
        super(resources, colorImage, alphaImage, x, y, 3, Animation_1.Orientation.horizontal);
        this.onMouseDown = ({ clientX, clientY }) => {
            this.currentFrame = this.isPointInside(clientX, clientY)
                ? MouseState.Down
                : MouseState.Out;
        };
        this.onMouseMove = ({ clientX, clientY }) => {
            this.currentFrame = this.isPointInside(clientX, clientY)
                ? Math.max(this.currentFrame, MouseState.Over)
                : MouseState.Out;
        };
        this.onMouseUp = ({ clientX, clientY }) => {
            this.currentFrame = this.isPointInside(clientX, clientY)
                ? MouseState.Over
                : MouseState.Out;
        };
        this.addEventListener("mousemove", this.onMouseMove);
        this.addEventListener("mousedown", this.onMouseDown);
        this.addEventListener("mouseup", this.onMouseUp);
    }
    remove() {
        super.remove();
        this.removeEventListener("mousemove", this.onMouseMove);
        this.removeEventListener("mousedown", this.onMouseDown);
        this.removeEventListener("mouseup", this.onMouseUp);
    }
}
exports.default = Button;


/***/ }),

/***/ "./src/game/Emitter.ts":
/*!*****************************!*\
  !*** ./src/game/Emitter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class Emitter {
    constructor() {
        this.delegate = document.createDocumentFragment();
    }
    addEventListener(type, listener) {
        this.delegate.addEventListener(type, listener);
    }
    dispatchEvent(event) {
        return this.delegate.dispatchEvent(event);
    }
    removeEventListener(type, listener) {
        this.delegate.removeEventListener(type, listener);
    }
}
exports.default = Emitter;


/***/ }),

/***/ "./src/game/Font.ts":
/*!**************************!*\
  !*** ./src/game/Font.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const nearley_1 = __webpack_require__(/*! nearley */ "./node_modules/nearley/lib/nearley.js");
const AlphaPicture_1 = __importDefault(__webpack_require__(/*! ./AlphaPicture */ "./src/game/AlphaPicture.ts"));
const font_definition_ne_1 = __importDefault(__webpack_require__(/*! ./font-definition.ne */ "./src/game/font-definition.ne"));
const Picture_1 = __importDefault(__webpack_require__(/*! ./Picture */ "./src/game/Picture.ts"));
const TextPicture_1 = __importDefault(__webpack_require__(/*! ./TextPicture */ "./src/game/TextPicture.ts"));
const grammar = nearley_1.Grammar.fromCompiled(font_definition_ne_1.default);
function isDefineVariable(statement) {
    return statement.action.type === "define";
}
function isCreateLayer(statement) {
    return statement.action.type === "createLayer";
}
function isLayerSet(statement) {
    return statement.action.type === "layer";
}
function isSet(statement) {
    return statement.action.type === "set";
}
class Font {
    constructor(resources, definitionFileContents) {
        this.resources = resources;
        this.fontImages = new Map();
        this.fontDefinition = Font.parseDefinitionFile(definitionFileContents);
    }
    getFontImage(layer) {
        if (this.fontImages.has(layer)) {
            return this.fontImages.get(layer);
        }
        const fontImageName = this.fontDefinition.layers[layer].Image;
        const colorImage = this.resources.images[`fonts/${fontImageName}.gif`];
        const alphaImage = this.resources.images[`fonts/_${fontImageName}.gif`];
        let picture;
        if (colorImage) {
            picture = new AlphaPicture_1.default(this.resources, colorImage, alphaImage);
        }
        else {
            picture = new Picture_1.default(this.resources, alphaImage);
        }
        this.fontImages.set(layer, picture);
        return picture;
    }
    createText(layer, x, y, text) {
        const fontImage = this.getFontImage(layer);
        return new TextPicture_1.default(this.fontDefinition, this.resources, fontImage, x, y, layer, text);
    }
    static parseDefinitionFile(definitionFileContents) {
        const parser = new nearley_1.Parser(grammar);
        parser.feed(definitionFileContents);
        const [statements] = parser.results;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fontDefinition = {
            CharMap: {},
            layers: {},
        };
        const variables = new Map();
        function getValue(value) {
            if (value.type === "identifier") {
                return variables.get(value.v);
            }
            return value.v;
        }
        statements.forEach((statement) => {
            let value = statement.value && getValue(statement.value);
            if (statement.type === "map") {
                value = Object.fromEntries(getValue(statement.key).map((key, i) => [
                    key,
                    value[i],
                ]));
            }
            if (isDefineVariable(statement)) {
                variables.set(statement.id.v, value);
            }
            if (isCreateLayer(statement)) {
                fontDefinition.layers[statement.id.v] = {
                    KerningPairs: {},
                };
            }
            if (isLayerSet(statement)) {
                const layer = fontDefinition.layers[statement.id.v];
                const property = statement.action.v;
                if (statement.type === "map") {
                    if (!layer[property]) {
                        layer[property] = {};
                    }
                    Object.assign(layer[property], value);
                }
                else {
                    layer[property] = value;
                }
            }
            if (isSet(statement)) {
                const property = statement.action.v;
                if (statement.type === "map") {
                    if (!fontDefinition[property]) {
                        fontDefinition[property] = {};
                    }
                    Object.assign(fontDefinition[property], value);
                }
                else {
                    fontDefinition[property] = value;
                }
            }
        });
        return fontDefinition;
    }
}
exports.default = Font;


/***/ }),

/***/ "./src/game/LoadingScreen.ts":
/*!***********************************!*\
  !*** ./src/game/LoadingScreen.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const AlphaPicture_1 = __importDefault(__webpack_require__(/*! ./AlphaPicture */ "./src/game/AlphaPicture.ts"));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/game/constants.ts");
const Picture_1 = __importDefault(__webpack_require__(/*! ./Picture */ "./src/game/Picture.ts"));
const Scene_1 = __importDefault(__webpack_require__(/*! ./Scene */ "./src/game/Scene.ts"));
const log = constants_1.logger.extend("loadingscreen");
class LoadingScreen extends Scene_1.default {
    constructor() {
        super(...arguments);
        this.progress = 0;
        this.onProgress = (e) => {
            this.progress = e.loaded / e.total;
        };
        this.onPlayNow = ({ clientX, clientY }) => {
            if (this.playNow.isPointInside(clientX, clientY)) {
                log("onPlayNow");
                this.remove();
            }
        };
    }
    loadResources() {
        return __awaiter(this, void 0, void 0, function* () {
            const r = this.resources;
            const loadingScreenImage = yield r.loadImage("images/loadingscreen.jpg");
            const loadingScreenBackground = new Picture_1.default(r, loadingScreenImage);
            const loadingBarImage = yield r.loadImage("images/LoaderBar.gif");
            const loadingBarAlphaImage = yield r.loadImage("images/_LoaderBar.gif");
            this.loadingBar = new AlphaPicture_1.default(r, loadingBarImage, loadingBarAlphaImage, 129, 349);
            const cancunFloat14 = yield r.getFont("CancunFloat14");
            yield r.loadImage("fonts/CancunFloat14.gif");
            yield r.loadImage("fonts/_CancunFloat14.gif");
            this.playNow = cancunFloat14.createText("Main", "center", 441, "Click here to play!");
            this.playNow.show = false;
            this.playNow.addEventListener("click", this.onPlayNow);
            const emitter = r.loadAllImages();
            emitter.addEventListener("progress", this.onProgress);
            this.addActors([loadingScreenBackground, this.playNow]);
        });
    }
    logic(timeDiff) {
        super.logic(timeDiff);
        this.playNow.show = this.progress === 1;
    }
    draw(ctx) {
        super.draw(ctx);
        this.loadingBar.draw(ctx, 0, 0, Math.round(this.progress * 399), 44);
    }
    remove() {
        super.remove();
        this.loadingBar.remove();
    }
}
exports.default = LoadingScreen;


/***/ }),

/***/ "./src/game/MainMenu.ts":
/*!******************************!*\
  !*** ./src/game/MainMenu.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const AlphaPicture_1 = __importDefault(__webpack_require__(/*! ./AlphaPicture */ "./src/game/AlphaPicture.ts"));
const Button_1 = __importDefault(__webpack_require__(/*! ./Button */ "./src/game/Button.ts"));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/game/constants.ts");
const Picture_1 = __importDefault(__webpack_require__(/*! ./Picture */ "./src/game/Picture.ts"));
const Scene_1 = __importDefault(__webpack_require__(/*! ./Scene */ "./src/game/Scene.ts"));
const log = constants_1.logger.extend("mainmenu");
class MainMenu extends Scene_1.default {
    setup() {
        log("setup");
        const r = this.resources;
        this.sky = [-1, 0, 1].map((pos) => new Picture_1.default(r, r.images["images/mmsky.jpg"], 520 * pos, 0));
        this.sunGlow = new Picture_1.default(r, r.images["images/_mmsunglow.jpg"], -70, -70);
        this.sunGlow.fill([255, 255, 0]);
        r.getFont("Cancun10").then((cancun10) => {
            const changeUser = cancun10.createText("Main", "center", 38, "(If this is not you, click here.)");
            changeUser.fill([92, 56, 0]);
            this.addActors([changeUser]);
        });
        r.getFont("NativeAlienExtended16").then((nativeAlienExtended16) => {
            const welcomeText = nativeAlienExtended16.createText("Main", "center", -7, "Welcome to Zuma, person!");
            this.addActors([welcomeText]);
        });
        return [
            ...super.setup(),
            ...this.sky,
            new AlphaPicture_1.default(r, r.images["images/mmscreen.jpg"], r.images["images/_mmscreen.gif"]),
            this.sunGlow,
            new AlphaPicture_1.default(r, r.images["images/mmsun.gif"], r.images["images/_mmsun.gif"]),
            new AlphaPicture_1.default(r, r.images["images/mmeyeleft.gif"], r.images["images/_mmeyeleft.gif"], 213, 352),
            new AlphaPicture_1.default(r, r.images["images/mmeyeright.gif"], r.images["images/_mmeyeright.gif"], 272, 340),
            new Button_1.default(r, r.images["images/mmARCADEBUTTON.jpg"], r.images["images/_mmARCADEBUTTON.gif"], 452, 64),
            new Button_1.default(r, r.images["images/mmGAUNTLETBUTTON.jpg"], r.images["images/_mmGAUNTLETBUTTON.gif"], 436, 153),
            new Button_1.default(r, r.images["images/mmOPTIONSBUTTON.jpg"], r.images["images/_mmOPTIONSBUTTON.gif"], 418, 236),
            new Button_1.default(r, r.images["images/mmMOREGAMESBUTTON.jpg"], r.images["images/_mmMOREGAMESBUTTON.gif"], 394, 306),
            new Button_1.default(r, r.images["images/mmQUITBUTTON.jpg"], r.images["images/_mmQUITBUTTON.gif"], 496, 314),
        ];
    }
    logic(timeDiff) {
        for (const sky of this.sky) {
            sky.x += timeDiff * 0.02;
            if (sky.x > constants_1.WIN_WIDTH) {
                sky.x -= 520 * 3;
            }
        }
        this.sunGlow.addRotation(timeDiff * 0.0008);
    }
}
exports.default = MainMenu;


/***/ }),

/***/ "./src/game/Picture.ts":
/*!*****************************!*\
  !*** ./src/game/Picture.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/game/constants.ts");
const Emitter_1 = __importDefault(__webpack_require__(/*! ./Emitter */ "./src/game/Emitter.ts"));
const log = constants_1.logger.extend("picture");
class Picture extends Emitter_1.default {
    constructor(resources, image, x = 0, y = 0) {
        super();
        this.resources = resources;
        this.image = image;
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.show = true;
        this.context2d = null;
        this.center = [this.width / 2, this.height / 2];
    }
    get width() {
        return this.image.width;
    }
    get height() {
        return this.image.height;
    }
    isPointInside(x, y) {
        return (this.show &&
            this.x < x &&
            x < this.x + this.width &&
            this.y < y &&
            y < this.y + this.height);
    }
    setPos(pos) {
        this.x = pos[0];
        this.y = pos[1];
        return this;
    }
    setRotation(rotation) {
        this.rotation = rotation;
        return this;
    }
    addRotation(diff) {
        this.rotation = (this.rotation + diff) % (2 * Math.PI);
        return this;
    }
    fill(color) {
        log("fill %o", color);
        const { width, height } = this.image;
        const ctx = this.resources.getCanvas(width, height);
        ctx.drawImage(this.image, 0, 0);
        const imageData = ctx.getImageData(0, 0, width, height);
        for (let i = 0, n = imageData.data.length; i < n; i += 4) {
            imageData.data[i + 3] =
                (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
            imageData.data[i] = color[0];
            imageData.data[i + 1] = color[1];
            imageData.data[i + 2] = color[2];
        }
        ctx.putImageData(imageData, 0, 0);
        this.image = ctx.canvas;
        if (this.context2d) {
            this.resources.freeCanvas(this.context2d);
        }
        this.context2d = ctx;
        return this;
    }
    draw(ctx, sx, sy, width, height, x = this.x, y = this.y) {
        if (this.show) {
            if (this.rotation) {
                ctx.save();
                const dim = [x + this.center[0], y + this.center[1]];
                ctx.translate(dim[0], dim[1]);
                ctx.rotate(this.rotation);
                ctx.translate(-dim[0], -dim[1]);
            }
            if (typeof sx === "number") {
                ctx.drawImage(this.image, sx, sy, width, height, x, y, width, height);
            }
            else {
                ctx.drawImage(this.image, x, y);
            }
            if (this.rotation) {
                ctx.restore();
            }
        }
    }
    remove() {
        if (this.context2d) {
            this.resources.freeCanvas(this.context2d);
        }
    }
}
exports.default = Picture;


/***/ }),

/***/ "./src/game/Resources.ts":
/*!*******************************!*\
  !*** ./src/game/Resources.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/game/constants.ts");
const Emitter_1 = __importDefault(__webpack_require__(/*! ./Emitter */ "./src/game/Emitter.ts"));
const Font_1 = __importDefault(__webpack_require__(/*! ./Font */ "./src/game/Font.ts"));
const log = constants_1.logger.extend("resources");
class Resources {
    constructor(fs) {
        this.fs = fs;
        this.fontDefinitions = {};
        this.freeCanvases = [];
        this.images = {};
    }
    getFont(fontName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.fontDefinitions[fontName]) {
                return this.fontDefinitions[fontName];
            }
            const fontDefinitionFile = yield this.fs
                .file(`fonts/${fontName}.txt`)
                .async("string");
            const font = new Font_1.default(this, fontDefinitionFile);
            this.fontDefinitions[fontName] = font;
            return font;
        });
    }
    freeCanvas(context2d) {
        this.freeCanvases.push(context2d.canvas);
    }
    getCanvas(width, height) {
        let canvas;
        if (this.freeCanvases.length > 0) {
            canvas = this.freeCanvases.pop();
        }
        else {
            canvas = document.createElement("canvas");
            log("new canvas");
        }
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        return ctx;
    }
    loadImage(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            log("image load start", filePath);
            const blob = yield this.fs.file(filePath).async("blob");
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.addEventListener("load", (ev) => {
                    const { result } = ev.target;
                    if (typeof result !== "string") {
                        throw new Error("FileReader did not return a valid string");
                    }
                    const image = new Image();
                    image.addEventListener("load", () => {
                        this.images[filePath] = image;
                        this.fs.remove(filePath);
                        log("image load finished", filePath);
                        resolve(image);
                    });
                    image.addEventListener("error", reject);
                    image.src = result;
                });
                fileReader.addEventListener("error", reject);
                fileReader.readAsDataURL(blob);
            });
        });
    }
    loadAllImages() {
        const emitter = new Emitter_1.default();
        const images = this.fs.file(/^(fonts|images|levels)\/.+\.(gif|jpg)$/);
        const total = images.length;
        let loaded = 0;
        // loads one image at a time
        images.reduce((promises, image) => 
        // checks that all previous images were loaded before loading current one
        Promise.resolve(promises).then((previousResults) => __awaiter(this, void 0, void 0, function* () {
            const imageElement = yield this.loadImage(image.name);
            loaded++;
            log("progress %d out of %d", loaded, total);
            const event = new ProgressEvent("progress", { loaded, total });
            emitter.dispatchEvent(event);
            return [...previousResults, imageElement];
        })), Promise.resolve([]));
        return emitter;
    }
}
exports.default = Resources;


/***/ }),

/***/ "./src/game/Scene.ts":
/*!***************************!*\
  !*** ./src/game/Scene.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/game/constants.ts");
const Emitter_1 = __importDefault(__webpack_require__(/*! ./Emitter */ "./src/game/Emitter.ts"));
const log = constants_1.logger.extend("scene");
class Scene extends Emitter_1.default {
    constructor(resources, x = 0, y = 0) {
        super();
        this.resources = resources;
        this.x = x;
        this.y = y;
        this.actors = [];
        this.onClick = this.forwardMouseEvent("click");
        this.onMouseDown = this.forwardMouseEvent("mousedown");
        this.onMouseMove = this.forwardMouseEvent("mousemove");
        this.onMouseUp = this.forwardMouseEvent("mouseup");
        this.addActors(this.setup());
        this.addEventListener("click", this.onClick);
        this.addEventListener("mousedown", this.onMouseDown);
        this.addEventListener("mousemove", this.onMouseMove);
        this.addEventListener("mouseup", this.onMouseUp);
    }
    addActors(actors, priority = 0) {
        this.actors.splice(this.actors.length - 1 - priority, 0, ...actors);
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        for (const actor of this.actors) {
            actor.draw(ctx);
        }
        ctx.restore();
    }
    isPointInside(x, y) {
        return [...this.actors]
            .reverse()
            .some((actor) => actor.isPointInside(x, y));
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logic(timeDiff) {
        // this will get overwritten by scenes
    }
    setup() {
        return [];
    }
    remove() {
        for (const actor of this.actors) {
            actor.remove();
        }
        this.dispatchEvent(new Event("remove"));
        this.removeEventListener("click", this.onClick);
        this.removeEventListener("mousedown", this.onMouseDown);
        this.removeEventListener("mousemove", this.onMouseMove);
        this.removeEventListener("mouseup", this.onMouseUp);
    }
    forwardMouseEvent(type) {
        return ({ clientX, clientY }) => {
            this.actors.forEach((actor) => {
                const event = new MouseEvent(type, { clientX, clientY });
                actor.dispatchEvent(event);
            });
        };
    }
}
exports.default = Scene;


/***/ }),

/***/ "./src/game/TextPicture.ts":
/*!*********************************!*\
  !*** ./src/game/TextPicture.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/game/constants.ts");
const Picture_1 = __importDefault(__webpack_require__(/*! ./Picture */ "./src/game/Picture.ts"));
class TextPicture extends Picture_1.default {
    constructor(fontDefinition, resources, fontImage, x, y, layer, text) {
        const ctx = resources.getCanvas();
        super(resources, ctx.canvas);
        this.fontDefinition = fontDefinition;
        this.fontImage = fontImage;
        this.layer = layer;
        this.text = text;
        const { height } = fontImage;
        const width = this.calculateWidth();
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        this.setPos([
            x === "center" ? (constants_1.WIN_WIDTH - width) / 2 : x,
            y === "center" ? (constants_1.WIN_HEIGHT - height) / 2 : y,
        ]);
        this.drawText(ctx);
    }
    drawText(ctx) {
        let x = 0;
        const letters = this.letters();
        for (let i = 0, n = letters.length; i < n; i++) {
            const letter = letters[i];
            const rect = this.layerDefinition.ImageMap[letter];
            if (rect) {
                this.fontImage.draw(ctx, rect[0], rect[1], rect[2], rect[3], x, 0);
            }
            let keyringPair = 0;
            if (i < n - 1) {
                const lastCharPair = `${letter}${letters[i + 1]}`;
                keyringPair = this.layerDefinition.KerningPairs[lastCharPair] || 0;
            }
            x += this.layerDefinition.CharWidths[letter] + keyringPair;
        }
        this.context2d = ctx;
    }
    get layerDefinition() {
        return this.fontDefinition.layers[this.layer];
    }
    calculateWidth() {
        const letters = this.letters();
        const width = letters
            .map((letter) => this.layerDefinition.CharWidths[letter])
            .reduce((a, b) => a + b);
        const lastLetter = letters[letters.length - 1];
        return (width -
            this.layerDefinition.CharWidths[lastLetter] +
            this.layerDefinition.ImageMap[lastLetter][2]);
    }
    letters() {
        return this.text
            .split("")
            .map((char) => this.fontDefinition.CharMap[char] || char);
    }
}
exports.default = TextPicture;


/***/ }),

/***/ "./src/game/constants.ts":
/*!*******************************!*\
  !*** ./src/game/constants.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WIN_HEIGHT = exports.WIN_WIDTH = exports.logger = void 0;
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js"));
exports.logger = debug_1.default("frog");
exports.WIN_WIDTH = 640;
exports.WIN_HEIGHT = 480;


/***/ }),

/***/ "./src/game/index.ts":
/*!***************************!*\
  !*** ./src/game/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const zipLoader_1 = __importDefault(__webpack_require__(/*! ../shared/zipLoader */ "./src/shared/zipLoader.ts"));
const movie_1 = __importDefault(__webpack_require__(/*! ./movie */ "./src/game/movie.ts"));
const Resources_1 = __importDefault(__webpack_require__(/*! ./Resources */ "./src/game/Resources.ts"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const zipFile = yield zipLoader_1.default();
        document.getElementById("drop-legend").remove();
        const resources = new Resources_1.default(zipFile);
        movie_1.default(resources, document.body);
    });
}
main().catch((e) => {
    throw e;
});


/***/ }),

/***/ "./src/game/movie.ts":
/*!***************************!*\
  !*** ./src/game/movie.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(/*! ./constants */ "./src/game/constants.ts");
const LoadingScreen_1 = __importDefault(__webpack_require__(/*! ./LoadingScreen */ "./src/game/LoadingScreen.ts"));
const MainMenu_1 = __importDefault(__webpack_require__(/*! ./MainMenu */ "./src/game/MainMenu.ts"));
const log = constants_1.logger.extend("movie");
function movie(r, container) {
    return __awaiter(this, void 0, void 0, function* () {
        const mainCtx = r.getCanvas(constants_1.WIN_WIDTH, constants_1.WIN_HEIGHT);
        const canvas = mainCtx.canvas;
        // Append canvas to container
        container.appendChild(canvas);
        const loadingScreen = new LoadingScreen_1.default(r);
        // 'global' variables
        let lastTime = 0;
        let scene = loadingScreen;
        scene.addEventListener("remove", () => __awaiter(this, void 0, void 0, function* () {
            // scene.remove();
            scene = new MainMenu_1.default(r);
            log("scene change", scene);
        }));
        function attachEventListener(type) {
            canvas.addEventListener(type, ({ pageX, pageY }) => {
                const rect = canvas.getBoundingClientRect();
                const x = pageX - rect.x;
                const y = pageY - rect.y;
                scene.dispatchEvent(new MouseEvent(type, { clientX: x, clientY: y }));
            });
        }
        attachEventListener("click");
        attachEventListener("mousedown");
        attachEventListener("mousemove");
        attachEventListener("mouseup");
        yield loadingScreen.loadResources();
        function drawLoading(timestamp) {
            const timediff = timestamp - lastTime;
            lastTime = timestamp;
            scene.logic(timediff);
            scene.draw(mainCtx);
            requestAnimationFrame(drawLoading);
        }
        requestAnimationFrame(drawLoading);
    });
}
exports.default = movie;


/***/ }),

/***/ "./src/shared/zipLoader.ts":
/*!*********************************!*\
  !*** ./src/shared/zipLoader.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const jszip_1 = __importDefault(__webpack_require__(/*! jszip */ "./node_modules/jszip/dist/jszip.min.js"));
function zipLoader() {
    function onDragOver(e) {
        e.preventDefault();
    }
    return new Promise((resolve) => {
        function onDrop(ev) {
            ev.preventDefault();
            const files = [];
            if (ev.dataTransfer.items) {
                // Use DataTransferItemList interface to access the file(s)
                for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                    // If dropped items aren't files, reject them
                    if (ev.dataTransfer.items[i].kind === "file") {
                        const file = ev.dataTransfer.items[i].getAsFile();
                        files.push(file);
                    }
                }
            }
            else {
                // Use DataTransfer interface to access the file(s)
                for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                    files.push(ev.dataTransfer.files[i]);
                }
            }
            const file = files.find((file) => file.type.includes("zip"));
            if (file) {
                document.removeEventListener("dragover", onDragOver);
                document.removeEventListener("drop", onDrop);
                resolve(jszip_1.default.loadAsync(file));
            }
        }
        document.addEventListener("dragover", onDragOver);
        document.addEventListener("drop", onDrop);
    });
}
exports.default = zipLoader;


/***/ }),

/***/ "./src/game/font-definition.ne":
/*!*************************************!*\
  !*** ./src/game/font-definition.ne ***!
  \*************************************/
/***/ ((module) => {

// Generated automatically by nearley, version unknown
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "statementlist$ebnf$1", "symbols": []},
    {"name": "statementlist$ebnf$1$subexpression$1", "symbols": ["_", "statement", "_", {"literal":";"}]},
    {"name": "statementlist$ebnf$1", "symbols": ["statementlist$ebnf$1", "statementlist$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statementlist", "symbols": ["statementlist$ebnf$1", "_"], "postprocess": (d) => d[0].map((e) => e[1])},
    {"name": "statement", "symbols": ["layerAction", "__", "identifier", "__", "varValue"], "postprocess": (d) => ({ action: d[0], id: d[2], type: 'single', value: d[4] })},
    {"name": "statement", "symbols": ["action", "__", "identifier", "__", "varValue"], "postprocess": (d) => ({ action: d[0], id: d[2], type: 'single', value: d[4] })},
    {"name": "statement", "symbols": ["action", "__", "identifier"], "postprocess": (d) => ({ action: d[0], id: d[2], type: 'single' })},
    {"name": "statement", "symbols": ["action", "__", "identifier", "__", "identifier"], "postprocess": (d) => ({ action: d[0], key: d[2], type: 'map', value: d[4] })},
    {"name": "statement", "symbols": ["layerAction", "__", "identifier", "__", "identifier", "__", "identifier"], "postprocess": (d) => ({ action: d[0], id: d[2], key: d[4], type: 'map', value: d[6] })},
    {"name": "statement", "symbols": ["layerAction", "__", "identifier", "__", "varValue", "__", "varValue"], "postprocess": (d) => ({ action: d[0], id: d[2], key: d[4], type: 'map', value: d[6] })},
    {"name": "statement", "symbols": ["action", "__", "varValue"], "postprocess": (d) => ({ action: d[0], type: 'single', value: d[2] })},
    {"name": "identifier$ebnf$1", "symbols": []},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[a-zA-Z0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": [/[a-zA-Z]/, "identifier$ebnf$1"], "postprocess": (d) => ({ type: 'identifier', v: d[0] + d[1].join("") })},
    {"name": "layerAction$string$1", "symbols": [{"literal":"L"}, {"literal":"a"}, {"literal":"y"}, {"literal":"e"}, {"literal":"r"}, {"literal":"S"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "layerAction$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "layerAction$ebnf$1", "symbols": ["layerAction$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "layerAction", "symbols": ["layerAction$string$1", "layerAction$ebnf$1"], "postprocess": (d) => ({ type: 'layer', v: d[1].join("") })},
    {"name": "layerAction$string$2", "symbols": [{"literal":"L"}, {"literal":"a"}, {"literal":"y"}, {"literal":"e"}, {"literal":"r"}, {"literal":"R"}, {"literal":"e"}, {"literal":"q"}, {"literal":"u"}, {"literal":"i"}, {"literal":"r"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "layerAction$ebnf$2", "symbols": [/[a-zA-Z]/]},
    {"name": "layerAction$ebnf$2", "symbols": ["layerAction$ebnf$2", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "layerAction", "symbols": ["layerAction$string$2", "layerAction$ebnf$2"], "postprocess": (d) => ({ type: 'layer', v: d[1].join("") })},
    {"name": "action$string$1", "symbols": [{"literal":"D"}, {"literal":"e"}, {"literal":"f"}, {"literal":"i"}, {"literal":"n"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "action", "symbols": ["action$string$1"], "postprocess": (d) => ({ type: 'define' })},
    {"name": "action$string$2", "symbols": [{"literal":"C"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}, {"literal":"L"}, {"literal":"a"}, {"literal":"y"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "action", "symbols": ["action$string$2"], "postprocess": (d) => ({ type: 'createLayer' })},
    {"name": "action$string$3", "symbols": [{"literal":"S"}, {"literal":"e"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "action$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "action$ebnf$1", "symbols": ["action$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "action", "symbols": ["action$string$3", "action$ebnf$1"], "postprocess": (d) => ({ type: 'set', v: d[1].join("") })},
    {"name": "varValue", "symbols": ["varValueArray"], "postprocess": (d) => ({ type: 'value', v: d[0][0] })},
    {"name": "varValueArray", "symbols": ["arrayValue"], "postprocess": (d) => d[0]},
    {"name": "varValueArray", "symbols": ["value"], "postprocess": (d) => [d[0]]},
    {"name": "arrayValue", "symbols": [{"literal":"("}, "_", "values", "_", {"literal":")"}], "postprocess": (d) => [d[2]]},
    {"name": "values", "symbols": ["values", "_", {"literal":","}, "_", "varValueArray"], "postprocess": (d) => [...d[0], ...d[4]]},
    {"name": "values", "symbols": ["varValueArray"], "postprocess": id},
    {"name": "value", "symbols": ["dqstring"], "postprocess": id},
    {"name": "value", "symbols": ["sqstring"], "postprocess": id},
    {"name": "value", "symbols": ["decimal"], "postprocess": id},
    {"name": "wschar", "symbols": [/[\r]/], "postprocess": id}
]
  , ParserStart: "statementlist"
}
if ( true&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96dW1hLy4vbm9kZV9tb2R1bGVzL2RlYnVnL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsIndlYnBhY2s6Ly96dW1hLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovL3p1bWEvLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly96dW1hLy4vbm9kZV9tb2R1bGVzL2pzemlwL2Rpc3QvanN6aXAubWluLmpzIiwid2VicGFjazovL3p1bWEvLi9ub2RlX21vZHVsZXMvbmVhcmxleS9saWIvbmVhcmxleS5qcyIsIndlYnBhY2s6Ly96dW1hLy4vc3JjL2dhbWUvQWxwaGFQaWN0dXJlLnRzIiwid2VicGFjazovL3p1bWEvLi9zcmMvZ2FtZS9BbmltYXRpb24udHMiLCJ3ZWJwYWNrOi8venVtYS8uL3NyYy9nYW1lL0J1dHRvbi50cyIsIndlYnBhY2s6Ly96dW1hLy4vc3JjL2dhbWUvRW1pdHRlci50cyIsIndlYnBhY2s6Ly96dW1hLy4vc3JjL2dhbWUvRm9udC50cyIsIndlYnBhY2s6Ly96dW1hLy4vc3JjL2dhbWUvTG9hZGluZ1NjcmVlbi50cyIsIndlYnBhY2s6Ly96dW1hLy4vc3JjL2dhbWUvTWFpbk1lbnUudHMiLCJ3ZWJwYWNrOi8venVtYS8uL3NyYy9nYW1lL1BpY3R1cmUudHMiLCJ3ZWJwYWNrOi8venVtYS8uL3NyYy9nYW1lL1Jlc291cmNlcy50cyIsIndlYnBhY2s6Ly96dW1hLy4vc3JjL2dhbWUvU2NlbmUudHMiLCJ3ZWJwYWNrOi8venVtYS8uL3NyYy9nYW1lL1RleHRQaWN0dXJlLnRzIiwid2VicGFjazovL3p1bWEvLi9zcmMvZ2FtZS9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8venVtYS8uL3NyYy9nYW1lL2luZGV4LnRzIiwid2VicGFjazovL3p1bWEvLi9zcmMvZ2FtZS9tb3ZpZS50cyIsIndlYnBhY2s6Ly96dW1hLy4vc3JjL3NoYXJlZC96aXBMb2FkZXIudHMiLCJ3ZWJwYWNrOi8venVtYS8uL3NyYy9nYW1lL2ZvbnQtZGVmaW5pdGlvbi5uZSIsIndlYnBhY2s6Ly96dW1hL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3p1bWEvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly96dW1hL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsT0FBTztBQUNsQixZQUFZLE1BQU07QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNqS0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQixZQUFZO0FBQ1osWUFBWTtBQUNaLGlCQUFpQjtBQUNqQixlQUFlO0FBQ2YsZUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBLENBQUMsSTs7Ozs7VUNQRDtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJnYW1lLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgdyA9IGQgKiA3O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigtPyg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8d2Vla3M/fHd8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICBjYXNlICd3ZWVrJzpcbiAgICBjYXNlICd3JzpcbiAgICAgIHJldHVybiBuICogdztcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgZCwgJ2RheScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGgsICdob3VyJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgbSwgJ21pbnV0ZScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIHMsICdzZWNvbmQnKTtcbiAgfVxuICByZXR1cm4gbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG1zQWJzLCBuLCBuYW1lKSB7XG4gIHZhciBpc1BsdXJhbCA9IG1zQWJzID49IG4gKiAxLjU7XG4gIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbikgKyAnICcgKyBuYW1lICsgKGlzUGx1cmFsID8gJ3MnIDogJycpO1xufVxuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gbG9jYWxzdG9yYWdlKCk7XG5leHBvcnRzLmRlc3Ryb3kgPSAoKCkgPT4ge1xuXHRsZXQgd2FybmVkID0gZmFsc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoIXdhcm5lZCkge1xuXHRcdFx0d2FybmVkID0gdHJ1ZTtcblx0XHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHRcdH1cblx0fTtcbn0pKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuXHQnIzAwMDBDQycsXG5cdCcjMDAwMEZGJyxcblx0JyMwMDMzQ0MnLFxuXHQnIzAwMzNGRicsXG5cdCcjMDA2NkNDJyxcblx0JyMwMDY2RkYnLFxuXHQnIzAwOTlDQycsXG5cdCcjMDA5OUZGJyxcblx0JyMwMENDMDAnLFxuXHQnIzAwQ0MzMycsXG5cdCcjMDBDQzY2Jyxcblx0JyMwMENDOTknLFxuXHQnIzAwQ0NDQycsXG5cdCcjMDBDQ0ZGJyxcblx0JyMzMzAwQ0MnLFxuXHQnIzMzMDBGRicsXG5cdCcjMzMzM0NDJyxcblx0JyMzMzMzRkYnLFxuXHQnIzMzNjZDQycsXG5cdCcjMzM2NkZGJyxcblx0JyMzMzk5Q0MnLFxuXHQnIzMzOTlGRicsXG5cdCcjMzNDQzAwJyxcblx0JyMzM0NDMzMnLFxuXHQnIzMzQ0M2NicsXG5cdCcjMzNDQzk5Jyxcblx0JyMzM0NDQ0MnLFxuXHQnIzMzQ0NGRicsXG5cdCcjNjYwMENDJyxcblx0JyM2NjAwRkYnLFxuXHQnIzY2MzNDQycsXG5cdCcjNjYzM0ZGJyxcblx0JyM2NkNDMDAnLFxuXHQnIzY2Q0MzMycsXG5cdCcjOTkwMENDJyxcblx0JyM5OTAwRkYnLFxuXHQnIzk5MzNDQycsXG5cdCcjOTkzM0ZGJyxcblx0JyM5OUNDMDAnLFxuXHQnIzk5Q0MzMycsXG5cdCcjQ0MwMDAwJyxcblx0JyNDQzAwMzMnLFxuXHQnI0NDMDA2NicsXG5cdCcjQ0MwMDk5Jyxcblx0JyNDQzAwQ0MnLFxuXHQnI0NDMDBGRicsXG5cdCcjQ0MzMzAwJyxcblx0JyNDQzMzMzMnLFxuXHQnI0NDMzM2NicsXG5cdCcjQ0MzMzk5Jyxcblx0JyNDQzMzQ0MnLFxuXHQnI0NDMzNGRicsXG5cdCcjQ0M2NjAwJyxcblx0JyNDQzY2MzMnLFxuXHQnI0NDOTkwMCcsXG5cdCcjQ0M5OTMzJyxcblx0JyNDQ0NDMDAnLFxuXHQnI0NDQ0MzMycsXG5cdCcjRkYwMDAwJyxcblx0JyNGRjAwMzMnLFxuXHQnI0ZGMDA2NicsXG5cdCcjRkYwMDk5Jyxcblx0JyNGRjAwQ0MnLFxuXHQnI0ZGMDBGRicsXG5cdCcjRkYzMzAwJyxcblx0JyNGRjMzMzMnLFxuXHQnI0ZGMzM2NicsXG5cdCcjRkYzMzk5Jyxcblx0JyNGRjMzQ0MnLFxuXHQnI0ZGMzNGRicsXG5cdCcjRkY2NjAwJyxcblx0JyNGRjY2MzMnLFxuXHQnI0ZGOTkwMCcsXG5cdCcjRkY5OTMzJyxcblx0JyNGRkNDMDAnLFxuXHQnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0Ly8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuXHQvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuXHQvLyBleHBsaWNpdGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiAod2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCB3aW5kb3cucHJvY2Vzcy5fX253anMpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIElzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5cdC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG5cdHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuXHRcdC8vIElzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcblx0XHQodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuXHRcdC8vIElzIGZpcmVmb3ggPj0gdjMxP1xuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuXHRcdC8vIERvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcblx0XHQodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuXHRhcmdzWzBdID0gKHRoaXMudXNlQ29sb3JzID8gJyVjJyA6ICcnKSArXG5cdFx0dGhpcy5uYW1lc3BhY2UgK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKSArXG5cdFx0YXJnc1swXSArXG5cdFx0KHRoaXMudXNlQ29sb3JzID8gJyVjICcgOiAnICcpICtcblx0XHQnKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG5cdGlmICghdGhpcy51c2VDb2xvcnMpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcblx0YXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0Jyk7XG5cblx0Ly8gVGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcblx0Ly8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuXHQvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cblx0bGV0IGluZGV4ID0gMDtcblx0bGV0IGxhc3RDID0gMDtcblx0YXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIG1hdGNoID0+IHtcblx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aW5kZXgrKztcblx0XHRpZiAobWF0Y2ggPT09ICclYycpIHtcblx0XHRcdC8vIFdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuXHRcdFx0Ly8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcblx0XHRcdGxhc3RDID0gaW5kZXg7XG5cdFx0fVxuXHR9KTtcblxuXHRhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5kZWJ1ZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUuZGVidWdgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqIElmIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYXZhaWxhYmxlLCBmYWxscyBiYWNrXG4gKiB0byBgY29uc29sZS5sb2dgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMubG9nID0gY29uc29sZS5kZWJ1ZyB8fCBjb25zb2xlLmxvZyB8fCAoKCkgPT4ge30pO1xuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG5cdHRyeSB7XG5cdFx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRcdGV4cG9ydHMuc3RvcmFnZS5zZXRJdGVtKCdkZWJ1ZycsIG5hbWVzcGFjZXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxvYWQoKSB7XG5cdGxldCByO1xuXHR0cnkge1xuXHRcdHIgPSBleHBvcnRzLnN0b3JhZ2UuZ2V0SXRlbSgnZGVidWcnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cblxuXHQvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG5cdGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuXHRcdHIgPSBwcm9jZXNzLmVudi5ERUJVRztcblx0fVxuXG5cdHJldHVybiByO1xufVxuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcblx0dHJ5IHtcblx0XHQvLyBUVk1MS2l0IChBcHBsZSBUViBKUyBSdW50aW1lKSBkb2VzIG5vdCBoYXZlIGEgd2luZG93IG9iamVjdCwganVzdCBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0XG5cdFx0Ly8gVGhlIEJyb3dzZXIgYWxzbyBoYXMgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dC5cblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG5cbmNvbnN0IHtmb3JtYXR0ZXJzfSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbiAodikge1xuXHR0cnkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyb3IubWVzc2FnZTtcblx0fVxufTtcbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICovXG5cbmZ1bmN0aW9uIHNldHVwKGVudikge1xuXHRjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnO1xuXHRjcmVhdGVEZWJ1Zy5kZWZhdWx0ID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmNvZXJjZSA9IGNvZXJjZTtcblx0Y3JlYXRlRGVidWcuZGlzYWJsZSA9IGRpc2FibGU7XG5cdGNyZWF0ZURlYnVnLmVuYWJsZSA9IGVuYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdGNyZWF0ZURlYnVnLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblx0Y3JlYXRlRGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cblx0T2JqZWN0LmtleXMoZW52KS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0Y3JlYXRlRGVidWdba2V5XSA9IGVudltrZXldO1xuXHR9KTtcblxuXHQvKipcblx0KiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cblx0Ki9cblxuXHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdC8qKlxuXHQqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cblx0KlxuXHQqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cblx0Ki9cblx0Y3JlYXRlRGVidWcuZm9ybWF0dGVycyA9IHt9O1xuXG5cdC8qKlxuXHQqIFNlbGVjdHMgYSBjb2xvciBmb3IgYSBkZWJ1ZyBuYW1lc3BhY2Vcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGUgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG5cdCogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuXHRcdGxldCBoYXNoID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuXHR9XG5cdGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yID0gc2VsZWN0Q29sb3I7XG5cblx0LyoqXG5cdCogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQHJldHVybiB7RnVuY3Rpb259XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cdFx0bGV0IHByZXZUaW1lO1xuXHRcdGxldCBlbmFibGVPdmVycmlkZSA9IG51bGw7XG5cdFx0bGV0IG5hbWVzcGFjZXNDYWNoZTtcblx0XHRsZXQgZW5hYmxlZENhY2hlO1xuXG5cdFx0ZnVuY3Rpb24gZGVidWcoLi4uYXJncykge1xuXHRcdFx0Ly8gRGlzYWJsZWQ/XG5cdFx0XHRpZiAoIWRlYnVnLmVuYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWxmID0gZGVidWc7XG5cblx0XHRcdC8vIFNldCBgZGlmZmAgdGltZXN0YW1wXG5cdFx0XHRjb25zdCBjdXJyID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuXHRcdFx0Y29uc3QgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuXHRcdFx0c2VsZi5kaWZmID0gbXM7XG5cdFx0XHRzZWxmLnByZXYgPSBwcmV2VGltZTtcblx0XHRcdHNlbGYuY3VyciA9IGN1cnI7XG5cdFx0XHRwcmV2VGltZSA9IGN1cnI7XG5cblx0XHRcdGFyZ3NbMF0gPSBjcmVhdGVEZWJ1Zy5jb2VyY2UoYXJnc1swXSk7XG5cblx0XHRcdGlmICh0eXBlb2YgYXJnc1swXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Ly8gQW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cblx0XHRcdFx0YXJncy51bnNoaWZ0KCclTycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuXHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCAobWF0Y2gsIGZvcm1hdCkgPT4ge1xuXHRcdFx0XHQvLyBJZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5cdFx0XHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0XHRcdHJldHVybiAnJSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0Y29uc3QgZm9ybWF0dGVyID0gY3JlYXRlRGVidWcuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFyZ3NbaW5kZXhdO1xuXHRcdFx0XHRcdG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuXHRcdFx0XHRcdC8vIE5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcblx0XHRcdFx0XHRhcmdzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0aW5kZXgtLTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcblx0XHRcdGNyZWF0ZURlYnVnLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuXHRcdFx0Y29uc3QgbG9nRm4gPSBzZWxmLmxvZyB8fCBjcmVhdGVEZWJ1Zy5sb2c7XG5cdFx0XHRsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcblx0XHR9XG5cblx0XHRkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdFx0ZGVidWcudXNlQ29sb3JzID0gY3JlYXRlRGVidWcudXNlQ29sb3JzKCk7XG5cdFx0ZGVidWcuY29sb3IgPSBjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuXHRcdGRlYnVnLmV4dGVuZCA9IGV4dGVuZDtcblx0XHRkZWJ1Zy5kZXN0cm95ID0gY3JlYXRlRGVidWcuZGVzdHJveTsgLy8gWFhYIFRlbXBvcmFyeS4gV2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVidWcsICdlbmFibGVkJywge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRnZXQ6ICgpID0+IHtcblx0XHRcdFx0aWYgKGVuYWJsZU92ZXJyaWRlICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGVuYWJsZU92ZXJyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuYW1lc3BhY2VzQ2FjaGUgIT09IGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMpIHtcblx0XHRcdFx0XHRuYW1lc3BhY2VzQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzO1xuXHRcdFx0XHRcdGVuYWJsZWRDYWNoZSA9IGNyZWF0ZURlYnVnLmVuYWJsZWQobmFtZXNwYWNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBlbmFibGVkQ2FjaGU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiB2ID0+IHtcblx0XHRcdFx0ZW5hYmxlT3ZlcnJpZGUgPSB2O1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gRW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcblx0XHRpZiAodHlwZW9mIGNyZWF0ZURlYnVnLmluaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNyZWF0ZURlYnVnLmluaXQoZGVidWcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWJ1Zztcblx0fVxuXG5cdGZ1bmN0aW9uIGV4dGVuZChuYW1lc3BhY2UsIGRlbGltaXRlcikge1xuXHRcdGNvbnN0IG5ld0RlYnVnID0gY3JlYXRlRGVidWcodGhpcy5uYW1lc3BhY2UgKyAodHlwZW9mIGRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyAnOicgOiBkZWxpbWl0ZXIpICsgbmFtZXNwYWNlKTtcblx0XHRuZXdEZWJ1Zy5sb2cgPSB0aGlzLmxvZztcblx0XHRyZXR1cm4gbmV3RGVidWc7XG5cdH1cblxuXHQvKipcblx0KiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG5cdCogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcblx0XHRjcmVhdGVEZWJ1Zy5zYXZlKG5hbWVzcGFjZXMpO1xuXHRcdGNyZWF0ZURlYnVnLm5hbWVzcGFjZXMgPSBuYW1lc3BhY2VzO1xuXG5cdFx0Y3JlYXRlRGVidWcubmFtZXMgPSBbXTtcblx0XHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdFx0bGV0IGk7XG5cdFx0Y29uc3Qgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuXHRcdGNvbnN0IGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKCFzcGxpdFtpXSkge1xuXHRcdFx0XHQvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0bmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG5cblx0XHRcdGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcblx0XHRcdFx0Y3JlYXRlRGVidWcuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuXHQqXG5cdCogQHJldHVybiB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZGlzYWJsZSgpIHtcblx0XHRjb25zdCBuYW1lc3BhY2VzID0gW1xuXHRcdFx0Li4uY3JlYXRlRGVidWcubmFtZXMubWFwKHRvTmFtZXNwYWNlKSxcblx0XHRcdC4uLmNyZWF0ZURlYnVnLnNraXBzLm1hcCh0b05hbWVzcGFjZSkubWFwKG5hbWVzcGFjZSA9PiAnLScgKyBuYW1lc3BhY2UpXG5cdFx0XS5qb2luKCcsJyk7XG5cdFx0Y3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQHJldHVybiB7Qm9vbGVhbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcblx0XHRpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGxldCBpO1xuXHRcdGxldCBsZW47XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjcmVhdGVEZWJ1Zy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGNyZWF0ZURlYnVnLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoY3JlYXRlRGVidWcubmFtZXNbaV0udGVzdChuYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0KiBDb252ZXJ0IHJlZ2V4cCB0byBuYW1lc3BhY2Vcblx0KlxuXHQqIEBwYXJhbSB7UmVnRXhwfSByZWd4ZXBcblx0KiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiB0b05hbWVzcGFjZShyZWdleHApIHtcblx0XHRyZXR1cm4gcmVnZXhwLnRvU3RyaW5nKClcblx0XHRcdC5zdWJzdHJpbmcoMiwgcmVnZXhwLnRvU3RyaW5nKCkubGVuZ3RoIC0gMilcblx0XHRcdC5yZXBsYWNlKC9cXC5cXCpcXD8kLywgJyonKTtcblx0fVxuXG5cdC8qKlxuXHQqIENvZXJjZSBgdmFsYC5cblx0KlxuXHQqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQqIEByZXR1cm4ge01peGVkfVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG5cdFx0aWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCogWFhYIERPIE5PVCBVU0UuIFRoaXMgaXMgYSB0ZW1wb3Jhcnkgc3R1YiBmdW5jdGlvbi5cblx0KiBYWFggSXQgV0lMTCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cdCovXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCIvKiFcblxuSlNaaXAgdjMuNi4wIC0gQSBKYXZhU2NyaXB0IGNsYXNzIGZvciBnZW5lcmF0aW5nIGFuZCByZWFkaW5nIHppcCBmaWxlc1xuPGh0dHA6Ly9zdHVhcnRrLmNvbS9qc3ppcD5cblxuKGMpIDIwMDktMjAxNiBTdHVhcnQgS25pZ2h0bGV5IDxzdHVhcnQgW2F0XSBzdHVhcnRrLmNvbT5cbkR1YWwgbGljZW5jZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIG9yIEdQTHYzLiBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9TdHVrL2pzemlwL21hc3Rlci9MSUNFTlNFLm1hcmtkb3duLlxuXG5KU1ppcCB1c2VzIHRoZSBsaWJyYXJ5IHBha28gcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIDpcbmh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvcGFrby9ibG9iL21hc3Rlci9MSUNFTlNFXG4qL1xuXG4hZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNleyhcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLkpTWmlwPWUoKX19KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIHMoYSxvLHUpe2Z1bmN0aW9uIGgocixlKXtpZighb1tyXSl7aWYoIWFbcl0pe3ZhciB0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWUmJnQpcmV0dXJuIHQociwhMCk7aWYoZilyZXR1cm4gZihyLCEwKTt2YXIgbj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3IrXCInXCIpO3Rocm93IG4uY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixufXZhciBpPW9bcl09e2V4cG9ydHM6e319O2Fbcl1bMF0uY2FsbChpLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIHQ9YVtyXVsxXVtlXTtyZXR1cm4gaCh0fHxlKX0saSxpLmV4cG9ydHMscyxhLG8sdSl9cmV0dXJuIG9bcl0uZXhwb3J0c31mb3IodmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxlPTA7ZTx1Lmxlbmd0aDtlKyspaCh1W2VdKTtyZXR1cm4gaH0oezE6W2Z1bmN0aW9uKGwsdCxuKXsoZnVuY3Rpb24ocil7IWZ1bmN0aW9uKGUpe1wib2JqZWN0XCI9PXR5cGVvZiBuJiZ2b2lkIDAhPT10P3QuZXhwb3J0cz1lKCk6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnZvaWQgMCE9PXI/cjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLkpTWmlwPWUoKX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gcyhhLG8sdSl7ZnVuY3Rpb24gaCh0LGUpe2lmKCFvW3RdKXtpZighYVt0XSl7dmFyIHI9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbDtpZighZSYmcilyZXR1cm4gcih0LCEwKTtpZihmKXJldHVybiBmKHQsITApO3ZhciBuPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrdCtcIidcIik7dGhyb3cgbi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLG59dmFyIGk9b1t0XT17ZXhwb3J0czp7fX07YVt0XVswXS5jYWxsKGkuZXhwb3J0cyxmdW5jdGlvbihlKXtyZXR1cm4gaChhW3RdWzFdW2VdfHxlKX0saSxpLmV4cG9ydHMscyxhLG8sdSl9cmV0dXJuIG9bdF0uZXhwb3J0c31mb3IodmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbCxlPTA7ZTx1Lmxlbmd0aDtlKyspaCh1W2VdKTtyZXR1cm4gaH0oezE6W2Z1bmN0aW9uKGwsdCxuKXsoZnVuY3Rpb24ocil7IWZ1bmN0aW9uKGUpe1wib2JqZWN0XCI9PXR5cGVvZiBuJiZ2b2lkIDAhPT10P3QuZXhwb3J0cz1lKCk6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnZvaWQgMCE9PXI/cjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLkpTWmlwPWUoKX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gcyhhLG8sdSl7ZnVuY3Rpb24gaCh0LGUpe2lmKCFvW3RdKXtpZighYVt0XSl7dmFyIHI9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbDtpZighZSYmcilyZXR1cm4gcih0LCEwKTtpZihmKXJldHVybiBmKHQsITApO3ZhciBuPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrdCtcIidcIik7dGhyb3cgbi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLG59dmFyIGk9b1t0XT17ZXhwb3J0czp7fX07YVt0XVswXS5jYWxsKGkuZXhwb3J0cyxmdW5jdGlvbihlKXtyZXR1cm4gaChhW3RdWzFdW2VdfHxlKX0saSxpLmV4cG9ydHMscyxhLG8sdSl9cmV0dXJuIG9bdF0uZXhwb3J0c31mb3IodmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbCxlPTA7ZTx1Lmxlbmd0aDtlKyspaCh1W2VdKTtyZXR1cm4gaH0oezE6W2Z1bmN0aW9uKGwsdCxuKXsoZnVuY3Rpb24ocil7IWZ1bmN0aW9uKGUpe1wib2JqZWN0XCI9PXR5cGVvZiBuJiZ2b2lkIDAhPT10P3QuZXhwb3J0cz1lKCk6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnZvaWQgMCE9PXI/cjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLkpTWmlwPWUoKX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gcyhhLG8sdSl7ZnVuY3Rpb24gaCh0LGUpe2lmKCFvW3RdKXtpZighYVt0XSl7dmFyIHI9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbDtpZighZSYmcilyZXR1cm4gcih0LCEwKTtpZihmKXJldHVybiBmKHQsITApO3ZhciBuPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrdCtcIidcIik7dGhyb3cgbi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLG59dmFyIGk9b1t0XT17ZXhwb3J0czp7fX07YVt0XVswXS5jYWxsKGkuZXhwb3J0cyxmdW5jdGlvbihlKXtyZXR1cm4gaChhW3RdWzFdW2VdfHxlKX0saSxpLmV4cG9ydHMscyxhLG8sdSl9cmV0dXJuIG9bdF0uZXhwb3J0c31mb3IodmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbCxlPTA7ZTx1Lmxlbmd0aDtlKyspaCh1W2VdKTtyZXR1cm4gaH0oezE6W2Z1bmN0aW9uKGwsdCxuKXsoZnVuY3Rpb24ocil7IWZ1bmN0aW9uKGUpe1wib2JqZWN0XCI9PXR5cGVvZiBuJiZ2b2lkIDAhPT10P3QuZXhwb3J0cz1lKCk6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnZvaWQgMCE9PXI/cjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLkpTWmlwPWUoKX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gcyhhLG8sdSl7ZnVuY3Rpb24gaCh0LGUpe2lmKCFvW3RdKXtpZighYVt0XSl7dmFyIHI9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbDtpZighZSYmcilyZXR1cm4gcih0LCEwKTtpZihmKXJldHVybiBmKHQsITApO3ZhciBuPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrdCtcIidcIik7dGhyb3cgbi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLG59dmFyIGk9b1t0XT17ZXhwb3J0czp7fX07YVt0XVswXS5jYWxsKGkuZXhwb3J0cyxmdW5jdGlvbihlKXtyZXR1cm4gaChhW3RdWzFdW2VdfHxlKX0saSxpLmV4cG9ydHMscyxhLG8sdSl9cmV0dXJuIG9bdF0uZXhwb3J0c31mb3IodmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbCxlPTA7ZTx1Lmxlbmd0aDtlKyspaCh1W2VdKTtyZXR1cm4gaH0oezE6W2Z1bmN0aW9uKGwsdCxuKXsoZnVuY3Rpb24ocil7IWZ1bmN0aW9uKGUpe1wib2JqZWN0XCI9PXR5cGVvZiBuJiZ2b2lkIDAhPT10P3QuZXhwb3J0cz1lKCk6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OnZvaWQgMCE9PXI/cjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLkpTWmlwPWUoKX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gcyhhLG8sdSl7ZnVuY3Rpb24gaCh0LGUpe2lmKCFvW3RdKXtpZighYVt0XSl7dmFyIHI9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbDtpZighZSYmcilyZXR1cm4gcih0LCEwKTtpZihmKXJldHVybiBmKHQsITApO3ZhciBuPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrdCtcIidcIik7dGhyb3cgbi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLG59dmFyIGk9b1t0XT17ZXhwb3J0czp7fX07YVt0XVswXS5jYWxsKGkuZXhwb3J0cyxmdW5jdGlvbihlKXtyZXR1cm4gaChhW3RdWzFdW2VdfHxlKX0saSxpLmV4cG9ydHMscyxhLG8sdSl9cmV0dXJuIG9bdF0uZXhwb3J0c31mb3IodmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgbCYmbCxlPTA7ZTx1Lmxlbmd0aDtlKyspaCh1W2VdKTtyZXR1cm4gaH0oezE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgYz1lKFwiLi91dGlsc1wiKSxsPWUoXCIuL3N1cHBvcnRcIikscD1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCI7ci5lbmNvZGU9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LHIsbixpLHMsYSxvLHU9W10saD0wLGY9ZS5sZW5ndGgsbD1mLGQ9XCJzdHJpbmdcIiE9PWMuZ2V0VHlwZU9mKGUpO2g8ZS5sZW5ndGg7KWw9Zi1oLG49ZD8odD1lW2grK10scj1oPGY/ZVtoKytdOjAsaDxmP2VbaCsrXTowKToodD1lLmNoYXJDb2RlQXQoaCsrKSxyPWg8Zj9lLmNoYXJDb2RlQXQoaCsrKTowLGg8Zj9lLmNoYXJDb2RlQXQoaCsrKTowKSxpPXQ+PjIscz0oMyZ0KTw8NHxyPj40LGE9MTxsPygxNSZyKTw8MnxuPj42OjY0LG89MjxsPzYzJm46NjQsdS5wdXNoKHAuY2hhckF0KGkpK3AuY2hhckF0KHMpK3AuY2hhckF0KGEpK3AuY2hhckF0KG8pKTtyZXR1cm4gdS5qb2luKFwiXCIpfSxyLmRlY29kZT1mdW5jdGlvbihlKXt2YXIgdCxyLG4saSxzLGEsbz0wLHU9MDtpZihcImRhdGE6XCI9PT1lLnN1YnN0cigwLFwiZGF0YTpcIi5sZW5ndGgpKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYmFzZTY0IGlucHV0LCBpdCBsb29rcyBsaWtlIGEgZGF0YSB1cmwuXCIpO3ZhciBoLGY9MyooZT1lLnJlcGxhY2UoL1teQS1aYS16MC05XFwrXFwvXFw9XS9nLFwiXCIpKS5sZW5ndGgvNDtpZihlLmNoYXJBdChlLmxlbmd0aC0xKT09PXAuY2hhckF0KDY0KSYmZi0tLGUuY2hhckF0KGUubGVuZ3RoLTIpPT09cC5jaGFyQXQoNjQpJiZmLS0sZiUxIT0wKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYmFzZTY0IGlucHV0LCBiYWQgY29udGVudCBsZW5ndGguXCIpO2ZvcihoPWwudWludDhhcnJheT9uZXcgVWludDhBcnJheSgwfGYpOm5ldyBBcnJheSgwfGYpO288ZS5sZW5ndGg7KXQ9cC5pbmRleE9mKGUuY2hhckF0KG8rKykpPDwyfChpPXAuaW5kZXhPZihlLmNoYXJBdChvKyspKSk+PjQscj0oMTUmaSk8PDR8KHM9cC5pbmRleE9mKGUuY2hhckF0KG8rKykpKT4+MixuPSgzJnMpPDw2fChhPXAuaW5kZXhPZihlLmNoYXJBdChvKyspKSksaFt1KytdPXQsNjQhPT1zJiYoaFt1KytdPXIpLDY0IT09YSYmKGhbdSsrXT1uKTtyZXR1cm4gaH19LHtcIi4vc3VwcG9ydFwiOjMwLFwiLi91dGlsc1wiOjMyfV0sMjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL2V4dGVybmFsXCIpLGk9ZShcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIikscz1lKFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiKSxhPWUoXCIuL3N0cmVhbS9EYXRhTGVuZ3RoUHJvYmVcIik7ZnVuY3Rpb24gbyhlLHQscixuLGkpe3RoaXMuY29tcHJlc3NlZFNpemU9ZSx0aGlzLnVuY29tcHJlc3NlZFNpemU9dCx0aGlzLmNyYzMyPXIsdGhpcy5jb21wcmVzc2lvbj1uLHRoaXMuY29tcHJlc3NlZENvbnRlbnQ9aX1vLnByb3RvdHlwZT17Z2V0Q29udGVudFdvcmtlcjpmdW5jdGlvbigpe3ZhciBlPW5ldyBpKG4uUHJvbWlzZS5yZXNvbHZlKHRoaXMuY29tcHJlc3NlZENvbnRlbnQpKS5waXBlKHRoaXMuY29tcHJlc3Npb24udW5jb21wcmVzc1dvcmtlcigpKS5waXBlKG5ldyBhKFwiZGF0YV9sZW5ndGhcIikpLHQ9dGhpcztyZXR1cm4gZS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7aWYodGhpcy5zdHJlYW1JbmZvLmRhdGFfbGVuZ3RoIT09dC51bmNvbXByZXNzZWRTaXplKXRocm93IG5ldyBFcnJvcihcIkJ1ZyA6IHVuY29tcHJlc3NlZCBkYXRhIHNpemUgbWlzbWF0Y2hcIil9KSxlfSxnZXRDb21wcmVzc2VkV29ya2VyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBpKG4uUHJvbWlzZS5yZXNvbHZlKHRoaXMuY29tcHJlc3NlZENvbnRlbnQpKS53aXRoU3RyZWFtSW5mbyhcImNvbXByZXNzZWRTaXplXCIsdGhpcy5jb21wcmVzc2VkU2l6ZSkud2l0aFN0cmVhbUluZm8oXCJ1bmNvbXByZXNzZWRTaXplXCIsdGhpcy51bmNvbXByZXNzZWRTaXplKS53aXRoU3RyZWFtSW5mbyhcImNyYzMyXCIsdGhpcy5jcmMzMikud2l0aFN0cmVhbUluZm8oXCJjb21wcmVzc2lvblwiLHRoaXMuY29tcHJlc3Npb24pfX0sby5jcmVhdGVXb3JrZXJGcm9tPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZS5waXBlKG5ldyBzKS5waXBlKG5ldyBhKFwidW5jb21wcmVzc2VkU2l6ZVwiKSkucGlwZSh0LmNvbXByZXNzV29ya2VyKHIpKS5waXBlKG5ldyBhKFwiY29tcHJlc3NlZFNpemVcIikpLndpdGhTdHJlYW1JbmZvKFwiY29tcHJlc3Npb25cIix0KX0sdC5leHBvcnRzPW99LHtcIi4vZXh0ZXJuYWxcIjo2LFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiOjI1LFwiLi9zdHJlYW0vRGF0YUxlbmd0aFByb2JlXCI6MjYsXCIuL3N0cmVhbS9EYXRhV29ya2VyXCI6Mjd9XSwzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIik7ci5TVE9SRT17bWFnaWM6XCJcXDBcXDBcIixjb21wcmVzc1dvcmtlcjpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IG4oXCJTVE9SRSBjb21wcmVzc2lvblwiKX0sdW5jb21wcmVzc1dvcmtlcjpmdW5jdGlvbigpe3JldHVybiBuZXcgbihcIlNUT1JFIGRlY29tcHJlc3Npb25cIil9fSxyLkRFRkxBVEU9ZShcIi4vZmxhdGVcIil9LHtcIi4vZmxhdGVcIjo3LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4fV0sNDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3V0aWxzXCIpLGE9ZnVuY3Rpb24oKXtmb3IodmFyIGUsdD1bXSxyPTA7cjwyNTY7cisrKXtlPXI7Zm9yKHZhciBuPTA7bjw4O24rKyllPTEmZT8zOTg4MjkyMzg0XmU+Pj4xOmU+Pj4xO3Rbcl09ZX1yZXR1cm4gdH0oKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdm9pZCAwIT09ZSYmZS5sZW5ndGg/XCJzdHJpbmdcIiE9PW4uZ2V0VHlwZU9mKGUpP2Z1bmN0aW9uKGUsdCxyKXt2YXIgbj1hLGk9MCtyO2VePS0xO2Zvcih2YXIgcz0wO3M8aTtzKyspZT1lPj4+OF5uWzI1NSYoZV50W3NdKV07cmV0dXJuLTFeZX0oMHx0LGUsZS5sZW5ndGgpOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1hLGk9MCtyO2VePS0xO2Zvcih2YXIgcz0wO3M8aTtzKyspZT1lPj4+OF5uWzI1NSYoZV50LmNoYXJDb2RlQXQocykpXTtyZXR1cm4tMV5lfSgwfHQsZSxlLmxlbmd0aCk6MH19LHtcIi4vdXRpbHNcIjozMn1dLDU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtyLmJhc2U2ND0hMSxyLmJpbmFyeT0hMSxyLmRpcj0hMSxyLmNyZWF0ZUZvbGRlcnM9ITAsci5kYXRlPW51bGwsci5jb21wcmVzc2lvbj1udWxsLHIuY29tcHJlc3Npb25PcHRpb25zPW51bGwsci5jb21tZW50PW51bGwsci51bml4UGVybWlzc2lvbnM9bnVsbCxyLmRvc1Blcm1pc3Npb25zPW51bGx9LHt9XSw2OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG47bj1cInVuZGVmaW5lZFwiIT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlOmUoXCJsaWVcIiksdC5leHBvcnRzPXtQcm9taXNlOm59fSx7bGllOjM3fV0sNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDE2QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50MzJBcnJheSxpPWUoXCJwYWtvXCIpLHM9ZShcIi4vdXRpbHNcIiksYT1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSxvPW4/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiO2Z1bmN0aW9uIHUoZSx0KXthLmNhbGwodGhpcyxcIkZsYXRlV29ya2VyL1wiK2UpLHRoaXMuX3Bha289bnVsbCx0aGlzLl9wYWtvQWN0aW9uPWUsdGhpcy5fcGFrb09wdGlvbnM9dCx0aGlzLm1ldGE9e319ci5tYWdpYz1cIlxcYlxcMFwiLHMuaW5oZXJpdHModSxhKSx1LnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dGhpcy5tZXRhPWUubWV0YSxudWxsPT09dGhpcy5fcGFrbyYmdGhpcy5fY3JlYXRlUGFrbygpLHRoaXMuX3Bha28ucHVzaChzLnRyYW5zZm9ybVRvKG8sZS5kYXRhKSwhMSl9LHUucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7YS5wcm90b3R5cGUuZmx1c2guY2FsbCh0aGlzKSxudWxsPT09dGhpcy5fcGFrbyYmdGhpcy5fY3JlYXRlUGFrbygpLHRoaXMuX3Bha28ucHVzaChbXSwhMCl9LHUucHJvdG90eXBlLmNsZWFuVXA9ZnVuY3Rpb24oKXthLnByb3RvdHlwZS5jbGVhblVwLmNhbGwodGhpcyksdGhpcy5fcGFrbz1udWxsfSx1LnByb3RvdHlwZS5fY3JlYXRlUGFrbz1mdW5jdGlvbigpe3RoaXMuX3Bha289bmV3IGlbdGhpcy5fcGFrb0FjdGlvbl0oe3JhdzohMCxsZXZlbDp0aGlzLl9wYWtvT3B0aW9ucy5sZXZlbHx8LTF9KTt2YXIgdD10aGlzO3RoaXMuX3Bha28ub25EYXRhPWZ1bmN0aW9uKGUpe3QucHVzaCh7ZGF0YTplLG1ldGE6dC5tZXRhfSl9fSxyLmNvbXByZXNzV29ya2VyPWZ1bmN0aW9uKGUpe3JldHVybiBuZXcgdShcIkRlZmxhdGVcIixlKX0sci51bmNvbXByZXNzV29ya2VyPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB1KFwiSW5mbGF0ZVwiLHt9KX19LHtcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vdXRpbHNcIjozMixwYWtvOjM4fV0sODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIEkoZSx0KXt2YXIgcixuPVwiXCI7Zm9yKHI9MDtyPHQ7cisrKW4rPVN0cmluZy5mcm9tQ2hhckNvZGUoMjU1JmUpLGU+Pj49ODtyZXR1cm4gbn1mdW5jdGlvbiBpKGUsdCxyLG4saSxzKXt2YXIgYSxvLHU9ZS5maWxlLGg9ZS5jb21wcmVzc2lvbixmPXMhPT1CLnV0ZjhlbmNvZGUsbD1PLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIscyh1Lm5hbWUpKSxkPU8udHJhbnNmb3JtVG8oXCJzdHJpbmdcIixCLnV0ZjhlbmNvZGUodS5uYW1lKSksYz11LmNvbW1lbnQscD1PLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIscyhjKSksbT1PLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsQi51dGY4ZW5jb2RlKGMpKSxfPWQubGVuZ3RoIT09dS5uYW1lLmxlbmd0aCxnPW0ubGVuZ3RoIT09Yy5sZW5ndGgsdj1cIlwiLGI9XCJcIix3PVwiXCIseT11LmRpcixrPXUuZGF0ZSx4PXtjcmMzMjowLGNvbXByZXNzZWRTaXplOjAsdW5jb21wcmVzc2VkU2l6ZTowfTt0JiYhcnx8KHguY3JjMzI9ZS5jcmMzMix4LmNvbXByZXNzZWRTaXplPWUuY29tcHJlc3NlZFNpemUseC51bmNvbXByZXNzZWRTaXplPWUudW5jb21wcmVzc2VkU2l6ZSk7dmFyIFM9MDt0JiYoU3w9OCksZnx8IV8mJiFnfHwoU3w9MjA0OCk7dmFyIHosRT0wLEM9MDt5JiYoRXw9MTYpLFwiVU5JWFwiPT09aT8oQz03OTgsRXw9KCh6PXUudW5peFBlcm1pc3Npb25zKXx8KHo9eT8xNjg5MzozMzIwNCksKDY1NTM1JnopPDwxNikpOihDPTIwLEV8PTYzJih1LmRvc1Blcm1pc3Npb25zfHwwKSksYT1rLmdldFVUQ0hvdXJzKCksYTw8PTYsYXw9ay5nZXRVVENNaW51dGVzKCksYTw8PTUsYXw9ay5nZXRVVENTZWNvbmRzKCkvMixvPWsuZ2V0VVRDRnVsbFllYXIoKS0xOTgwLG88PD00LG98PWsuZ2V0VVRDTW9udGgoKSsxLG88PD01LG98PWsuZ2V0VVRDRGF0ZSgpLF8mJih2Kz1cInVwXCIrSSgoYj1JKDEsMSkrSShUKGwpLDQpK2QpLmxlbmd0aCwyKStiKSxnJiYodis9XCJ1Y1wiK0koKHc9SSgxLDEpK0koVChwKSw0KSttKS5sZW5ndGgsMikrdyk7dmFyIEE9XCJcIjtyZXR1cm4gQSs9XCJcXG5cXDBcIixBKz1JKFMsMiksQSs9aC5tYWdpYyxBKz1JKGEsMiksQSs9SShvLDIpLEErPUkoeC5jcmMzMiw0KSxBKz1JKHguY29tcHJlc3NlZFNpemUsNCksQSs9SSh4LnVuY29tcHJlc3NlZFNpemUsNCksQSs9SShsLmxlbmd0aCwyKSxBKz1JKHYubGVuZ3RoLDIpLHtmaWxlUmVjb3JkOlIuTE9DQUxfRklMRV9IRUFERVIrQStsK3YsZGlyUmVjb3JkOlIuQ0VOVFJBTF9GSUxFX0hFQURFUitJKEMsMikrQStJKHAubGVuZ3RoLDIpK1wiXFwwXFwwXFwwXFwwXCIrSShFLDQpK0kobiw0KStsK3YrcH19dmFyIE89ZShcIi4uL3V0aWxzXCIpLHM9ZShcIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpLEI9ZShcIi4uL3V0ZjhcIiksVD1lKFwiLi4vY3JjMzJcIiksUj1lKFwiLi4vc2lnbmF0dXJlXCIpO2Z1bmN0aW9uIG4oZSx0LHIsbil7cy5jYWxsKHRoaXMsXCJaaXBGaWxlV29ya2VyXCIpLHRoaXMuYnl0ZXNXcml0dGVuPTAsdGhpcy56aXBDb21tZW50PXQsdGhpcy56aXBQbGF0Zm9ybT1yLHRoaXMuZW5jb2RlRmlsZU5hbWU9bix0aGlzLnN0cmVhbUZpbGVzPWUsdGhpcy5hY2N1bXVsYXRlPSExLHRoaXMuY29udGVudEJ1ZmZlcj1bXSx0aGlzLmRpclJlY29yZHM9W10sdGhpcy5jdXJyZW50U291cmNlT2Zmc2V0PTAsdGhpcy5lbnRyaWVzQ291bnQ9MCx0aGlzLmN1cnJlbnRGaWxlPW51bGwsdGhpcy5fc291cmNlcz1bXX1PLmluaGVyaXRzKG4scyksbi5wcm90b3R5cGUucHVzaD1mdW5jdGlvbihlKXt2YXIgdD1lLm1ldGEucGVyY2VudHx8MCxyPXRoaXMuZW50cmllc0NvdW50LG49dGhpcy5fc291cmNlcy5sZW5ndGg7dGhpcy5hY2N1bXVsYXRlP3RoaXMuY29udGVudEJ1ZmZlci5wdXNoKGUpOih0aGlzLmJ5dGVzV3JpdHRlbis9ZS5kYXRhLmxlbmd0aCxzLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcyx7ZGF0YTplLmRhdGEsbWV0YTp7Y3VycmVudEZpbGU6dGhpcy5jdXJyZW50RmlsZSxwZXJjZW50OnI/KHQrMTAwKihyLW4tMSkpL3I6MTAwfX0pKX0sbi5wcm90b3R5cGUub3BlbmVkU291cmNlPWZ1bmN0aW9uKGUpe3RoaXMuY3VycmVudFNvdXJjZU9mZnNldD10aGlzLmJ5dGVzV3JpdHRlbix0aGlzLmN1cnJlbnRGaWxlPWUuZmlsZS5uYW1lO3ZhciB0PXRoaXMuc3RyZWFtRmlsZXMmJiFlLmZpbGUuZGlyO2lmKHQpe3ZhciByPWkoZSx0LCExLHRoaXMuY3VycmVudFNvdXJjZU9mZnNldCx0aGlzLnppcFBsYXRmb3JtLHRoaXMuZW5jb2RlRmlsZU5hbWUpO3RoaXMucHVzaCh7ZGF0YTpyLmZpbGVSZWNvcmQsbWV0YTp7cGVyY2VudDowfX0pfWVsc2UgdGhpcy5hY2N1bXVsYXRlPSEwfSxuLnByb3RvdHlwZS5jbG9zZWRTb3VyY2U9ZnVuY3Rpb24oZSl7dGhpcy5hY2N1bXVsYXRlPSExO3ZhciB0LHI9dGhpcy5zdHJlYW1GaWxlcyYmIWUuZmlsZS5kaXIsbj1pKGUsciwhMCx0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQsdGhpcy56aXBQbGF0Zm9ybSx0aGlzLmVuY29kZUZpbGVOYW1lKTtpZih0aGlzLmRpclJlY29yZHMucHVzaChuLmRpclJlY29yZCkscil0aGlzLnB1c2goe2RhdGE6KHQ9ZSxSLkRBVEFfREVTQ1JJUFRPUitJKHQuY3JjMzIsNCkrSSh0LmNvbXByZXNzZWRTaXplLDQpK0kodC51bmNvbXByZXNzZWRTaXplLDQpKSxtZXRhOntwZXJjZW50OjEwMH19KTtlbHNlIGZvcih0aGlzLnB1c2goe2RhdGE6bi5maWxlUmVjb3JkLG1ldGE6e3BlcmNlbnQ6MH19KTt0aGlzLmNvbnRlbnRCdWZmZXIubGVuZ3RoOyl0aGlzLnB1c2godGhpcy5jb250ZW50QnVmZmVyLnNoaWZ0KCkpO3RoaXMuY3VycmVudEZpbGU9bnVsbH0sbi5wcm90b3R5cGUuZmx1c2g9ZnVuY3Rpb24oKXtmb3IodmFyIGU9dGhpcy5ieXRlc1dyaXR0ZW4sdD0wO3Q8dGhpcy5kaXJSZWNvcmRzLmxlbmd0aDt0KyspdGhpcy5wdXNoKHtkYXRhOnRoaXMuZGlyUmVjb3Jkc1t0XSxtZXRhOntwZXJjZW50OjEwMH19KTt2YXIgcixuLGkscyxhLG8sdT10aGlzLmJ5dGVzV3JpdHRlbi1lLGg9KHI9dGhpcy5kaXJSZWNvcmRzLmxlbmd0aCxuPXUsaT1lLHM9dGhpcy56aXBDb21tZW50LGE9dGhpcy5lbmNvZGVGaWxlTmFtZSxvPU8udHJhbnNmb3JtVG8oXCJzdHJpbmdcIixhKHMpKSxSLkNFTlRSQUxfRElSRUNUT1JZX0VORCtcIlxcMFxcMFxcMFxcMFwiK0kociwyKStJKHIsMikrSShuLDQpK0koaSw0KStJKG8ubGVuZ3RoLDIpK28pO3RoaXMucHVzaCh7ZGF0YTpoLG1ldGE6e3BlcmNlbnQ6MTAwfX0pfSxuLnByb3RvdHlwZS5wcmVwYXJlTmV4dFNvdXJjZT1mdW5jdGlvbigpe3RoaXMucHJldmlvdXM9dGhpcy5fc291cmNlcy5zaGlmdCgpLHRoaXMub3BlbmVkU291cmNlKHRoaXMucHJldmlvdXMuc3RyZWFtSW5mbyksdGhpcy5pc1BhdXNlZD90aGlzLnByZXZpb3VzLnBhdXNlKCk6dGhpcy5wcmV2aW91cy5yZXN1bWUoKX0sbi5wcm90b3R5cGUucmVnaXN0ZXJQcmV2aW91cz1mdW5jdGlvbihlKXt0aGlzLl9zb3VyY2VzLnB1c2goZSk7dmFyIHQ9dGhpcztyZXR1cm4gZS5vbihcImRhdGFcIixmdW5jdGlvbihlKXt0LnByb2Nlc3NDaHVuayhlKX0pLGUub24oXCJlbmRcIixmdW5jdGlvbigpe3QuY2xvc2VkU291cmNlKHQucHJldmlvdXMuc3RyZWFtSW5mbyksdC5fc291cmNlcy5sZW5ndGg/dC5wcmVwYXJlTmV4dFNvdXJjZSgpOnQuZW5kKCl9KSxlLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXt0LmVycm9yKGUpfSksdGhpc30sbi5wcm90b3R5cGUucmVzdW1lPWZ1bmN0aW9uKCl7cmV0dXJuISFzLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSYmKCF0aGlzLnByZXZpb3VzJiZ0aGlzLl9zb3VyY2VzLmxlbmd0aD8odGhpcy5wcmVwYXJlTmV4dFNvdXJjZSgpLCEwKTp0aGlzLnByZXZpb3VzfHx0aGlzLl9zb3VyY2VzLmxlbmd0aHx8dGhpcy5nZW5lcmF0ZWRFcnJvcj92b2lkIDA6KHRoaXMuZW5kKCksITApKX0sbi5wcm90b3R5cGUuZXJyb3I9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5fc291cmNlcztpZighcy5wcm90b3R5cGUuZXJyb3IuY2FsbCh0aGlzLGUpKXJldHVybiExO2Zvcih2YXIgcj0wO3I8dC5sZW5ndGg7cisrKXRyeXt0W3JdLmVycm9yKGUpfWNhdGNoKGUpe31yZXR1cm4hMH0sbi5wcm90b3R5cGUubG9jaz1mdW5jdGlvbigpe3MucHJvdG90eXBlLmxvY2suY2FsbCh0aGlzKTtmb3IodmFyIGU9dGhpcy5fc291cmNlcyx0PTA7dDxlLmxlbmd0aDt0KyspZVt0XS5sb2NrKCl9LHQuZXhwb3J0cz1ufSx7XCIuLi9jcmMzMlwiOjQsXCIuLi9zaWduYXR1cmVcIjoyMyxcIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuLi91dGY4XCI6MzEsXCIuLi91dGlsc1wiOjMyfV0sOTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBoPWUoXCIuLi9jb21wcmVzc2lvbnNcIiksbj1lKFwiLi9aaXBGaWxlV29ya2VyXCIpO3IuZ2VuZXJhdGVXb3JrZXI9ZnVuY3Rpb24oZSxhLHQpe3ZhciBvPW5ldyBuKGEuc3RyZWFtRmlsZXMsdCxhLnBsYXRmb3JtLGEuZW5jb2RlRmlsZU5hbWUpLHU9MDt0cnl7ZS5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7dSsrO3ZhciByPWZ1bmN0aW9uKGUsdCl7dmFyIHI9ZXx8dCxuPWhbcl07aWYoIW4pdGhyb3cgbmV3IEVycm9yKHIrXCIgaXMgbm90IGEgdmFsaWQgY29tcHJlc3Npb24gbWV0aG9kICFcIik7cmV0dXJuIG59KHQub3B0aW9ucy5jb21wcmVzc2lvbixhLmNvbXByZXNzaW9uKSxuPXQub3B0aW9ucy5jb21wcmVzc2lvbk9wdGlvbnN8fGEuY29tcHJlc3Npb25PcHRpb25zfHx7fSxpPXQuZGlyLHM9dC5kYXRlO3QuX2NvbXByZXNzV29ya2VyKHIsbikud2l0aFN0cmVhbUluZm8oXCJmaWxlXCIse25hbWU6ZSxkaXI6aSxkYXRlOnMsY29tbWVudDp0LmNvbW1lbnR8fFwiXCIsdW5peFBlcm1pc3Npb25zOnQudW5peFBlcm1pc3Npb25zLGRvc1Blcm1pc3Npb25zOnQuZG9zUGVybWlzc2lvbnN9KS5waXBlKG8pfSksby5lbnRyaWVzQ291bnQ9dX1jYXRjaChlKXtvLmVycm9yKGUpfXJldHVybiBvfX0se1wiLi4vY29tcHJlc3Npb25zXCI6MyxcIi4vWmlwRmlsZVdvcmtlclwiOjh9XSwxMDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oKXtpZighKHRoaXMgaW5zdGFuY2VvZiBuKSlyZXR1cm4gbmV3IG47aWYoYXJndW1lbnRzLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY29uc3RydWN0b3Igd2l0aCBwYXJhbWV0ZXJzIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuXCIpO3RoaXMuZmlsZXM9e30sdGhpcy5jb21tZW50PW51bGwsdGhpcy5yb290PVwiXCIsdGhpcy5jbG9uZT1mdW5jdGlvbigpe3ZhciBlPW5ldyBuO2Zvcih2YXIgdCBpbiB0aGlzKVwiZnVuY3Rpb25cIiE9dHlwZW9mIHRoaXNbdF0mJihlW3RdPXRoaXNbdF0pO3JldHVybiBlfX0obi5wcm90b3R5cGU9ZShcIi4vb2JqZWN0XCIpKS5sb2FkQXN5bmM9ZShcIi4vbG9hZFwiKSxuLnN1cHBvcnQ9ZShcIi4vc3VwcG9ydFwiKSxuLmRlZmF1bHRzPWUoXCIuL2RlZmF1bHRzXCIpLG4udmVyc2lvbj1cIjMuNS4wXCIsbi5sb2FkQXN5bmM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4obmV3IG4pLmxvYWRBc3luYyhlLHQpfSxuLmV4dGVybmFsPWUoXCIuL2V4dGVybmFsXCIpLHQuZXhwb3J0cz1ufSx7XCIuL2RlZmF1bHRzXCI6NSxcIi4vZXh0ZXJuYWxcIjo2LFwiLi9sb2FkXCI6MTEsXCIuL29iamVjdFwiOjE1LFwiLi9zdXBwb3J0XCI6MzB9XSwxMTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3V0aWxzXCIpLGk9ZShcIi4vZXh0ZXJuYWxcIiksbz1lKFwiLi91dGY4XCIpLHU9ZShcIi4vemlwRW50cmllc1wiKSxzPWUoXCIuL3N0cmVhbS9DcmMzMlByb2JlXCIpLGg9ZShcIi4vbm9kZWpzVXRpbHNcIik7ZnVuY3Rpb24gZihuKXtyZXR1cm4gbmV3IGkuUHJvbWlzZShmdW5jdGlvbihlLHQpe3ZhciByPW4uZGVjb21wcmVzc2VkLmdldENvbnRlbnRXb3JrZXIoKS5waXBlKG5ldyBzKTtyLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXt0KGUpfSkub24oXCJlbmRcIixmdW5jdGlvbigpe3Iuc3RyZWFtSW5mby5jcmMzMiE9PW4uZGVjb21wcmVzc2VkLmNyYzMyP3QobmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCA6IENSQzMyIG1pc21hdGNoXCIpKTplKCl9KS5yZXN1bWUoKX0pfXQuZXhwb3J0cz1mdW5jdGlvbihlLHMpe3ZhciBhPXRoaXM7cmV0dXJuIHM9bi5leHRlbmQoc3x8e30se2Jhc2U2NDohMSxjaGVja0NSQzMyOiExLG9wdGltaXplZEJpbmFyeVN0cmluZzohMSxjcmVhdGVGb2xkZXJzOiExLGRlY29kZUZpbGVOYW1lOm8udXRmOGRlY29kZX0pLGguaXNOb2RlJiZoLmlzU3RyZWFtKGUpP2kuUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSlNaaXAgY2FuJ3QgYWNjZXB0IGEgc3RyZWFtIHdoZW4gbG9hZGluZyBhIHppcCBmaWxlLlwiKSk6bi5wcmVwYXJlQ29udGVudChcInRoZSBsb2FkZWQgemlwIGZpbGVcIixlLCEwLHMub3B0aW1pemVkQmluYXJ5U3RyaW5nLHMuYmFzZTY0KS50aGVuKGZ1bmN0aW9uKGUpe3ZhciB0PW5ldyB1KHMpO3JldHVybiB0LmxvYWQoZSksdH0pLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9W2kuUHJvbWlzZS5yZXNvbHZlKGUpXSxyPWUuZmlsZXM7aWYocy5jaGVja0NSQzMyKWZvcih2YXIgbj0wO248ci5sZW5ndGg7bisrKXQucHVzaChmKHJbbl0pKTtyZXR1cm4gaS5Qcm9taXNlLmFsbCh0KX0pLnRoZW4oZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWUuc2hpZnQoKSxyPXQuZmlsZXMsbj0wO248ci5sZW5ndGg7bisrKXt2YXIgaT1yW25dO2EuZmlsZShpLmZpbGVOYW1lU3RyLGkuZGVjb21wcmVzc2VkLHtiaW5hcnk6ITAsb3B0aW1pemVkQmluYXJ5U3RyaW5nOiEwLGRhdGU6aS5kYXRlLGRpcjppLmRpcixjb21tZW50OmkuZmlsZUNvbW1lbnRTdHIubGVuZ3RoP2kuZmlsZUNvbW1lbnRTdHI6bnVsbCx1bml4UGVybWlzc2lvbnM6aS51bml4UGVybWlzc2lvbnMsZG9zUGVybWlzc2lvbnM6aS5kb3NQZXJtaXNzaW9ucyxjcmVhdGVGb2xkZXJzOnMuY3JlYXRlRm9sZGVyc30pfXJldHVybiB0LnppcENvbW1lbnQubGVuZ3RoJiYoYS5jb21tZW50PXQuemlwQ29tbWVudCksYX0pfX0se1wiLi9leHRlcm5hbFwiOjYsXCIuL25vZGVqc1V0aWxzXCI6MTQsXCIuL3N0cmVhbS9DcmMzMlByb2JlXCI6MjUsXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMixcIi4vemlwRW50cmllc1wiOjMzfV0sMTI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIik7ZnVuY3Rpb24gcyhlLHQpe2kuY2FsbCh0aGlzLFwiTm9kZWpzIHN0cmVhbSBpbnB1dCBhZGFwdGVyIGZvciBcIitlKSx0aGlzLl91cHN0cmVhbUVuZGVkPSExLHRoaXMuX2JpbmRTdHJlYW0odCl9bi5pbmhlcml0cyhzLGkpLHMucHJvdG90eXBlLl9iaW5kU3RyZWFtPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7KHRoaXMuX3N0cmVhbT1lKS5wYXVzZSgpLGUub24oXCJkYXRhXCIsZnVuY3Rpb24oZSl7dC5wdXNoKHtkYXRhOmUsbWV0YTp7cGVyY2VudDowfX0pfSkub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QuaXNQYXVzZWQ/dGhpcy5nZW5lcmF0ZWRFcnJvcj1lOnQuZXJyb3IoZSl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dC5pc1BhdXNlZD90Ll91cHN0cmVhbUVuZGVkPSEwOnQuZW5kKCl9KX0scy5wcm90b3R5cGUucGF1c2U9ZnVuY3Rpb24oKXtyZXR1cm4hIWkucHJvdG90eXBlLnBhdXNlLmNhbGwodGhpcykmJih0aGlzLl9zdHJlYW0ucGF1c2UoKSwhMCl9LHMucHJvdG90eXBlLnJlc3VtZT1mdW5jdGlvbigpe3JldHVybiEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykmJih0aGlzLl91cHN0cmVhbUVuZGVkP3RoaXMuZW5kKCk6dGhpcy5fc3RyZWFtLnJlc3VtZSgpLCEwKX0sdC5leHBvcnRzPXN9LHtcIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuLi91dGlsc1wiOjMyfV0sMTM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1lKFwicmVhZGFibGUtc3RyZWFtXCIpLlJlYWRhYmxlO2Z1bmN0aW9uIG4oZSx0LHIpe2kuY2FsbCh0aGlzLHQpLHRoaXMuX2hlbHBlcj1lO3ZhciBuPXRoaXM7ZS5vbihcImRhdGFcIixmdW5jdGlvbihlLHQpe24ucHVzaChlKXx8bi5faGVscGVyLnBhdXNlKCksciYmcih0KX0pLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXtuLmVtaXQoXCJlcnJvclwiLGUpfSkub24oXCJlbmRcIixmdW5jdGlvbigpe24ucHVzaChudWxsKX0pfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhuLGkpLG4ucHJvdG90eXBlLl9yZWFkPWZ1bmN0aW9uKCl7dGhpcy5faGVscGVyLnJlc3VtZSgpfSx0LmV4cG9ydHM9bn0se1wiLi4vdXRpbHNcIjozMixcInJlYWRhYmxlLXN0cmVhbVwiOjE2fV0sMTQ6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9e2lzTm9kZTpcInVuZGVmaW5lZFwiIT10eXBlb2YgQnVmZmVyLG5ld0J1ZmZlckZyb206ZnVuY3Rpb24oZSx0KXtpZihCdWZmZXIuZnJvbSYmQnVmZmVyLmZyb20hPT1VaW50OEFycmF5LmZyb20pcmV0dXJuIEJ1ZmZlci5mcm9tKGUsdCk7aWYoXCJudW1iZXJcIj09dHlwZW9mIGUpdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJkYXRhXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtyZXR1cm4gbmV3IEJ1ZmZlcihlLHQpfSxhbGxvY0J1ZmZlcjpmdW5jdGlvbihlKXtpZihCdWZmZXIuYWxsb2MpcmV0dXJuIEJ1ZmZlci5hbGxvYyhlKTt2YXIgdD1uZXcgQnVmZmVyKGUpO3JldHVybiB0LmZpbGwoMCksdH0saXNCdWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihlKX0saXNTdHJlYW06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUub24mJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUucGF1c2UmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUucmVzdW1lfX19LHt9XSwxNTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHMoZSx0LHIpe3ZhciBuLGk9Zi5nZXRUeXBlT2YodCkscz1mLmV4dGVuZChyfHx7fSxkKTtzLmRhdGU9cy5kYXRlfHxuZXcgRGF0ZSxudWxsIT09cy5jb21wcmVzc2lvbiYmKHMuY29tcHJlc3Npb249cy5jb21wcmVzc2lvbi50b1VwcGVyQ2FzZSgpKSxcInN0cmluZ1wiPT10eXBlb2Ygcy51bml4UGVybWlzc2lvbnMmJihzLnVuaXhQZXJtaXNzaW9ucz1wYXJzZUludChzLnVuaXhQZXJtaXNzaW9ucyw4KSkscy51bml4UGVybWlzc2lvbnMmJjE2Mzg0JnMudW5peFBlcm1pc3Npb25zJiYocy5kaXI9ITApLHMuZG9zUGVybWlzc2lvbnMmJjE2JnMuZG9zUGVybWlzc2lvbnMmJihzLmRpcj0hMCkscy5kaXImJihlPWgoZSkpLHMuY3JlYXRlRm9sZGVycyYmKG49ZnVuY3Rpb24oZSl7XCIvXCI9PT1lLnNsaWNlKC0xKSYmKGU9ZS5zdWJzdHJpbmcoMCxlLmxlbmd0aC0xKSk7dmFyIHQ9ZS5sYXN0SW5kZXhPZihcIi9cIik7cmV0dXJuIDA8dD9lLnN1YnN0cmluZygwLHQpOlwiXCJ9KGUpKSYmZy5jYWxsKHRoaXMsbiwhMCk7dmFyIGEsbz1cInN0cmluZ1wiPT09aSYmITE9PT1zLmJpbmFyeSYmITE9PT1zLmJhc2U2NDtyJiZ2b2lkIDAhPT1yLmJpbmFyeXx8KHMuYmluYXJ5PSFvKSwodCBpbnN0YW5jZW9mIGMmJjA9PT10LnVuY29tcHJlc3NlZFNpemV8fHMuZGlyfHwhdHx8MD09PXQubGVuZ3RoKSYmKHMuYmFzZTY0PSExLHMuYmluYXJ5PSEwLHQ9XCJcIixzLmNvbXByZXNzaW9uPVwiU1RPUkVcIixpPVwic3RyaW5nXCIpLGE9dCBpbnN0YW5jZW9mIGN8fHQgaW5zdGFuY2VvZiBsP3Q6bS5pc05vZGUmJm0uaXNTdHJlYW0odCk/bmV3IF8oZSx0KTpmLnByZXBhcmVDb250ZW50KGUsdCxzLmJpbmFyeSxzLm9wdGltaXplZEJpbmFyeVN0cmluZyxzLmJhc2U2NCk7dmFyIHU9bmV3IHAoZSxhLHMpO3RoaXMuZmlsZXNbZV09dX1mdW5jdGlvbiBoKGUpe3JldHVyblwiL1wiIT09ZS5zbGljZSgtMSkmJihlKz1cIi9cIiksZX12YXIgaT1lKFwiLi91dGY4XCIpLGY9ZShcIi4vdXRpbHNcIiksbD1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSxhPWUoXCIuL3N0cmVhbS9TdHJlYW1IZWxwZXJcIiksZD1lKFwiLi9kZWZhdWx0c1wiKSxjPWUoXCIuL2NvbXByZXNzZWRPYmplY3RcIikscD1lKFwiLi96aXBPYmplY3RcIiksbz1lKFwiLi9nZW5lcmF0ZVwiKSxtPWUoXCIuL25vZGVqc1V0aWxzXCIpLF89ZShcIi4vbm9kZWpzL05vZGVqc1N0cmVhbUlucHV0QWRhcHRlclwiKSxnPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ9dm9pZCAwIT09dD90OmQuY3JlYXRlRm9sZGVycyxlPWgoZSksdGhpcy5maWxlc1tlXXx8cy5jYWxsKHRoaXMsZSxudWxsLHtkaXI6ITAsY3JlYXRlRm9sZGVyczp0fSksdGhpcy5maWxlc1tlXX07ZnVuY3Rpb24gdShlKXtyZXR1cm5cIltvYmplY3QgUmVnRXhwXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfXZhciBuPXtsb2FkOmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIil9LGZvckVhY2g6ZnVuY3Rpb24oZSl7dmFyIHQscixuO2Zvcih0IGluIHRoaXMuZmlsZXMpdGhpcy5maWxlcy5oYXNPd25Qcm9wZXJ0eSh0KSYmKG49dGhpcy5maWxlc1t0XSwocj10LnNsaWNlKHRoaXMucm9vdC5sZW5ndGgsdC5sZW5ndGgpKSYmdC5zbGljZSgwLHRoaXMucm9vdC5sZW5ndGgpPT09dGhpcy5yb290JiZlKHIsbikpfSxmaWx0ZXI6ZnVuY3Rpb24ocil7dmFyIG49W107cmV0dXJuIHRoaXMuZm9yRWFjaChmdW5jdGlvbihlLHQpe3IoZSx0KSYmbi5wdXNoKHQpfSksbn0sZmlsZTpmdW5jdGlvbihlLHQscil7aWYoMSE9PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGU9dGhpcy5yb290K2Uscy5jYWxsKHRoaXMsZSx0LHIpLHRoaXM7aWYodShlKSl7dmFyIG49ZTtyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oZSx0KXtyZXR1cm4hdC5kaXImJm4udGVzdChlKX0pfXZhciBpPXRoaXMuZmlsZXNbdGhpcy5yb290K2VdO3JldHVybiBpJiYhaS5kaXI/aTpudWxsfSxmb2xkZXI6ZnVuY3Rpb24ocil7aWYoIXIpcmV0dXJuIHRoaXM7aWYodShyKSlyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5kaXImJnIudGVzdChlKX0pO3ZhciBlPXRoaXMucm9vdCtyLHQ9Zy5jYWxsKHRoaXMsZSksbj10aGlzLmNsb25lKCk7cmV0dXJuIG4ucm9vdD10Lm5hbWUsbn0scmVtb3ZlOmZ1bmN0aW9uKHIpe3I9dGhpcy5yb290K3I7dmFyIGU9dGhpcy5maWxlc1tyXTtpZihlfHwoXCIvXCIhPT1yLnNsaWNlKC0xKSYmKHIrPVwiL1wiKSxlPXRoaXMuZmlsZXNbcl0pLGUmJiFlLmRpcilkZWxldGUgdGhpcy5maWxlc1tyXTtlbHNlIGZvcih2YXIgdD10aGlzLmZpbHRlcihmdW5jdGlvbihlLHQpe3JldHVybiB0Lm5hbWUuc2xpY2UoMCxyLmxlbmd0aCk9PT1yfSksbj0wO248dC5sZW5ndGg7bisrKWRlbGV0ZSB0aGlzLmZpbGVzW3Rbbl0ubmFtZV07cmV0dXJuIHRoaXN9LGdlbmVyYXRlOmZ1bmN0aW9uKGUpe3Rocm93IG5ldyBFcnJvcihcIlRoaXMgbWV0aG9kIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuXCIpfSxnZW5lcmF0ZUludGVybmFsU3RyZWFtOmZ1bmN0aW9uKGUpe3ZhciB0LHI9e307dHJ5e2lmKChyPWYuZXh0ZW5kKGV8fHt9LHtzdHJlYW1GaWxlczohMSxjb21wcmVzc2lvbjpcIlNUT1JFXCIsY29tcHJlc3Npb25PcHRpb25zOm51bGwsdHlwZTpcIlwiLHBsYXRmb3JtOlwiRE9TXCIsY29tbWVudDpudWxsLG1pbWVUeXBlOlwiYXBwbGljYXRpb24vemlwXCIsZW5jb2RlRmlsZU5hbWU6aS51dGY4ZW5jb2RlfSkpLnR5cGU9ci50eXBlLnRvTG93ZXJDYXNlKCksci5jb21wcmVzc2lvbj1yLmNvbXByZXNzaW9uLnRvVXBwZXJDYXNlKCksXCJiaW5hcnlzdHJpbmdcIj09PXIudHlwZSYmKHIudHlwZT1cInN0cmluZ1wiKSwhci50eXBlKXRocm93IG5ldyBFcnJvcihcIk5vIG91dHB1dCB0eXBlIHNwZWNpZmllZC5cIik7Zi5jaGVja1N1cHBvcnQoci50eXBlKSxcImRhcndpblwiIT09ci5wbGF0Zm9ybSYmXCJmcmVlYnNkXCIhPT1yLnBsYXRmb3JtJiZcImxpbnV4XCIhPT1yLnBsYXRmb3JtJiZcInN1bm9zXCIhPT1yLnBsYXRmb3JtfHwoci5wbGF0Zm9ybT1cIlVOSVhcIiksXCJ3aW4zMlwiPT09ci5wbGF0Zm9ybSYmKHIucGxhdGZvcm09XCJET1NcIik7dmFyIG49ci5jb21tZW50fHx0aGlzLmNvbW1lbnR8fFwiXCI7dD1vLmdlbmVyYXRlV29ya2VyKHRoaXMscixuKX1jYXRjaChlKXsodD1uZXcgbChcImVycm9yXCIpKS5lcnJvcihlKX1yZXR1cm4gbmV3IGEodCxyLnR5cGV8fFwic3RyaW5nXCIsci5taW1lVHlwZSl9LGdlbmVyYXRlQXN5bmM6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5nZW5lcmF0ZUludGVybmFsU3RyZWFtKGUpLmFjY3VtdWxhdGUodCl9LGdlbmVyYXRlTm9kZVN0cmVhbTpmdW5jdGlvbihlLHQpe3JldHVybihlPWV8fHt9KS50eXBlfHwoZS50eXBlPVwibm9kZWJ1ZmZlclwiKSx0aGlzLmdlbmVyYXRlSW50ZXJuYWxTdHJlYW0oZSkudG9Ob2RlanNTdHJlYW0odCl9fTt0LmV4cG9ydHM9bn0se1wiLi9jb21wcmVzc2VkT2JqZWN0XCI6MixcIi4vZGVmYXVsdHNcIjo1LFwiLi9nZW5lcmF0ZVwiOjksXCIuL25vZGVqcy9Ob2RlanNTdHJlYW1JbnB1dEFkYXB0ZXJcIjoxMixcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vc3RyZWFtL1N0cmVhbUhlbHBlclwiOjI5LFwiLi91dGY4XCI6MzEsXCIuL3V0aWxzXCI6MzIsXCIuL3ppcE9iamVjdFwiOjM1fV0sMTY6W2Z1bmN0aW9uKGUsdCxyKXt0LmV4cG9ydHM9ZShcInN0cmVhbVwiKX0se3N0cmVhbTp2b2lkIDB9XSwxNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0RhdGFSZWFkZXJcIik7ZnVuY3Rpb24gaShlKXtuLmNhbGwodGhpcyxlKTtmb3IodmFyIHQ9MDt0PHRoaXMuZGF0YS5sZW5ndGg7dCsrKWVbdF09MjU1JmVbdF19ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUuYnl0ZUF0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmRhdGFbdGhpcy56ZXJvK2VdfSxpLnByb3RvdHlwZS5sYXN0SW5kZXhPZlNpZ25hdHVyZT1mdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5jaGFyQ29kZUF0KDApLHI9ZS5jaGFyQ29kZUF0KDEpLG49ZS5jaGFyQ29kZUF0KDIpLGk9ZS5jaGFyQ29kZUF0KDMpLHM9dGhpcy5sZW5ndGgtNDswPD1zOy0tcylpZih0aGlzLmRhdGFbc109PT10JiZ0aGlzLmRhdGFbcysxXT09PXImJnRoaXMuZGF0YVtzKzJdPT09biYmdGhpcy5kYXRhW3MrM109PT1pKXJldHVybiBzLXRoaXMuemVybztyZXR1cm4tMX0saS5wcm90b3R5cGUucmVhZEFuZENoZWNrU2lnbmF0dXJlPWZ1bmN0aW9uKGUpe3ZhciB0PWUuY2hhckNvZGVBdCgwKSxyPWUuY2hhckNvZGVBdCgxKSxuPWUuY2hhckNvZGVBdCgyKSxpPWUuY2hhckNvZGVBdCgzKSxzPXRoaXMucmVhZERhdGEoNCk7cmV0dXJuIHQ9PT1zWzBdJiZyPT09c1sxXSYmbj09PXNbMl0mJmk9PT1zWzNdfSxpLnByb3RvdHlwZS5yZWFkRGF0YT1mdW5jdGlvbihlKXtpZih0aGlzLmNoZWNrT2Zmc2V0KGUpLDA9PT1lKXJldHVybltdO3ZhciB0PXRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8rdGhpcy5pbmRleCx0aGlzLnplcm8rdGhpcy5pbmRleCtlKTtyZXR1cm4gdGhpcy5pbmRleCs9ZSx0fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMixcIi4vRGF0YVJlYWRlclwiOjE4fV0sMTg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIik7ZnVuY3Rpb24gaShlKXt0aGlzLmRhdGE9ZSx0aGlzLmxlbmd0aD1lLmxlbmd0aCx0aGlzLmluZGV4PTAsdGhpcy56ZXJvPTB9aS5wcm90b3R5cGU9e2NoZWNrT2Zmc2V0OmZ1bmN0aW9uKGUpe3RoaXMuY2hlY2tJbmRleCh0aGlzLmluZGV4K2UpfSxjaGVja0luZGV4OmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoPHRoaXMuemVybytlfHxlPDApdGhyb3cgbmV3IEVycm9yKFwiRW5kIG9mIGRhdGEgcmVhY2hlZCAoZGF0YSBsZW5ndGggPSBcIit0aGlzLmxlbmd0aCtcIiwgYXNrZWQgaW5kZXggPSBcIitlK1wiKS4gQ29ycnVwdGVkIHppcCA/XCIpfSxzZXRJbmRleDpmdW5jdGlvbihlKXt0aGlzLmNoZWNrSW5kZXgoZSksdGhpcy5pbmRleD1lfSxza2lwOmZ1bmN0aW9uKGUpe3RoaXMuc2V0SW5kZXgodGhpcy5pbmRleCtlKX0sYnl0ZUF0OmZ1bmN0aW9uKGUpe30scmVhZEludDpmdW5jdGlvbihlKXt2YXIgdCxyPTA7Zm9yKHRoaXMuY2hlY2tPZmZzZXQoZSksdD10aGlzLmluZGV4K2UtMTt0Pj10aGlzLmluZGV4O3QtLSlyPShyPDw4KSt0aGlzLmJ5dGVBdCh0KTtyZXR1cm4gdGhpcy5pbmRleCs9ZSxyfSxyZWFkU3RyaW5nOmZ1bmN0aW9uKGUpe3JldHVybiBuLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsdGhpcy5yZWFkRGF0YShlKSl9LHJlYWREYXRhOmZ1bmN0aW9uKGUpe30sbGFzdEluZGV4T2ZTaWduYXR1cmU6ZnVuY3Rpb24oZSl7fSxyZWFkQW5kQ2hlY2tTaWduYXR1cmU6ZnVuY3Rpb24oZSl7fSxyZWFkRGF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMucmVhZEludCg0KTtyZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk4MCsoZT4+MjUmMTI3KSwoZT4+MjEmMTUpLTEsZT4+MTYmMzEsZT4+MTEmMzEsZT4+NSY2MywoMzEmZSk8PDEpKX19LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyfV0sMTk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9VaW50OEFycmF5UmVhZGVyXCIpO2Z1bmN0aW9uIGkoZSl7bi5jYWxsKHRoaXMsZSl9ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUucmVhZERhdGE9ZnVuY3Rpb24oZSl7dGhpcy5jaGVja09mZnNldChlKTt2YXIgdD10aGlzLmRhdGEuc2xpY2UodGhpcy56ZXJvK3RoaXMuaW5kZXgsdGhpcy56ZXJvK3RoaXMuaW5kZXgrZSk7cmV0dXJuIHRoaXMuaW5kZXgrPWUsdH0sdC5leHBvcnRzPWl9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL1VpbnQ4QXJyYXlSZWFkZXJcIjoyMX1dLDIwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vRGF0YVJlYWRlclwiKTtmdW5jdGlvbiBpKGUpe24uY2FsbCh0aGlzLGUpfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhpLG4pLGkucHJvdG90eXBlLmJ5dGVBdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5kYXRhLmNoYXJDb2RlQXQodGhpcy56ZXJvK2UpfSxpLnByb3RvdHlwZS5sYXN0SW5kZXhPZlNpZ25hdHVyZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5kYXRhLmxhc3RJbmRleE9mKGUpLXRoaXMuemVyb30saS5wcm90b3R5cGUucmVhZEFuZENoZWNrU2lnbmF0dXJlPWZ1bmN0aW9uKGUpe3JldHVybiBlPT09dGhpcy5yZWFkRGF0YSg0KX0saS5wcm90b3R5cGUucmVhZERhdGE9ZnVuY3Rpb24oZSl7dGhpcy5jaGVja09mZnNldChlKTt2YXIgdD10aGlzLmRhdGEuc2xpY2UodGhpcy56ZXJvK3RoaXMuaW5kZXgsdGhpcy56ZXJvK3RoaXMuaW5kZXgrZSk7cmV0dXJuIHRoaXMuaW5kZXgrPWUsdH0sdC5leHBvcnRzPWl9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0RhdGFSZWFkZXJcIjoxOH1dLDIxOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vQXJyYXlSZWFkZXJcIik7ZnVuY3Rpb24gaShlKXtuLmNhbGwodGhpcyxlKX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMoaSxuKSxpLnByb3RvdHlwZS5yZWFkRGF0YT1mdW5jdGlvbihlKXtpZih0aGlzLmNoZWNrT2Zmc2V0KGUpLDA9PT1lKXJldHVybiBuZXcgVWludDhBcnJheSgwKTt2YXIgdD10aGlzLmRhdGEuc3ViYXJyYXkodGhpcy56ZXJvK3RoaXMuaW5kZXgsdGhpcy56ZXJvK3RoaXMuaW5kZXgrZSk7cmV0dXJuIHRoaXMuaW5kZXgrPWUsdH0sdC5leHBvcnRzPWl9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0FycmF5UmVhZGVyXCI6MTd9XSwyMjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuLi9zdXBwb3J0XCIpLHM9ZShcIi4vQXJyYXlSZWFkZXJcIiksYT1lKFwiLi9TdHJpbmdSZWFkZXJcIiksbz1lKFwiLi9Ob2RlQnVmZmVyUmVhZGVyXCIpLHU9ZShcIi4vVWludDhBcnJheVJlYWRlclwiKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7dmFyIHQ9bi5nZXRUeXBlT2YoZSk7cmV0dXJuIG4uY2hlY2tTdXBwb3J0KHQpLFwic3RyaW5nXCIhPT10fHxpLnVpbnQ4YXJyYXk/XCJub2RlYnVmZmVyXCI9PT10P25ldyBvKGUpOmkudWludDhhcnJheT9uZXcgdShuLnRyYW5zZm9ybVRvKFwidWludDhhcnJheVwiLGUpKTpuZXcgcyhuLnRyYW5zZm9ybVRvKFwiYXJyYXlcIixlKSk6bmV3IGEoZSl9fSx7XCIuLi9zdXBwb3J0XCI6MzAsXCIuLi91dGlsc1wiOjMyLFwiLi9BcnJheVJlYWRlclwiOjE3LFwiLi9Ob2RlQnVmZmVyUmVhZGVyXCI6MTksXCIuL1N0cmluZ1JlYWRlclwiOjIwLFwiLi9VaW50OEFycmF5UmVhZGVyXCI6MjF9XSwyMzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3IuTE9DQUxfRklMRV9IRUFERVI9XCJQS1x1MDAwM1x1MDAwNFwiLHIuQ0VOVFJBTF9GSUxFX0hFQURFUj1cIlBLXHUwMDAxXHUwMDAyXCIsci5DRU5UUkFMX0RJUkVDVE9SWV9FTkQ9XCJQS1x1MDAwNVx1MDAwNlwiLHIuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfTE9DQVRPUj1cIlBLXHUwMDA2XHUwMDA3XCIsci5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQ9XCJQS1x1MDAwNlx1MDAwNlwiLHIuREFUQV9ERVNDUklQVE9SPVwiUEtcdTAwMDdcXGJcIn0se31dLDI0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vR2VuZXJpY1dvcmtlclwiKSxpPWUoXCIuLi91dGlsc1wiKTtmdW5jdGlvbiBzKGUpe24uY2FsbCh0aGlzLFwiQ29udmVydFdvcmtlciB0byBcIitlKSx0aGlzLmRlc3RUeXBlPWV9aS5pbmhlcml0cyhzLG4pLHMucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt0aGlzLnB1c2goe2RhdGE6aS50cmFuc2Zvcm1Ubyh0aGlzLmRlc3RUeXBlLGUuZGF0YSksbWV0YTplLm1ldGF9KX0sdC5leHBvcnRzPXN9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDI1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vR2VuZXJpY1dvcmtlclwiKSxpPWUoXCIuLi9jcmMzMlwiKTtmdW5jdGlvbiBzKCl7bi5jYWxsKHRoaXMsXCJDcmMzMlByb2JlXCIpLHRoaXMud2l0aFN0cmVhbUluZm8oXCJjcmMzMlwiLDApfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhzLG4pLHMucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt0aGlzLnN0cmVhbUluZm8uY3JjMzI9aShlLmRhdGEsdGhpcy5zdHJlYW1JbmZvLmNyYzMyfHwwKSx0aGlzLnB1c2goZSl9LHQuZXhwb3J0cz1zfSx7XCIuLi9jcmMzMlwiOjQsXCIuLi91dGlsc1wiOjMyLFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwyNjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuL0dlbmVyaWNXb3JrZXJcIik7ZnVuY3Rpb24gcyhlKXtpLmNhbGwodGhpcyxcIkRhdGFMZW5ndGhQcm9iZSBmb3IgXCIrZSksdGhpcy5wcm9wTmFtZT1lLHRoaXMud2l0aFN0cmVhbUluZm8oZSwwKX1uLmluaGVyaXRzKHMsaSkscy5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe2lmKGUpe3ZhciB0PXRoaXMuc3RyZWFtSW5mb1t0aGlzLnByb3BOYW1lXXx8MDt0aGlzLnN0cmVhbUluZm9bdGhpcy5wcm9wTmFtZV09dCtlLmRhdGEubGVuZ3RofWkucHJvdG90eXBlLnByb2Nlc3NDaHVuay5jYWxsKHRoaXMsZSl9LHQuZXhwb3J0cz1zfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwyNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuL0dlbmVyaWNXb3JrZXJcIik7ZnVuY3Rpb24gcyhlKXtpLmNhbGwodGhpcyxcIkRhdGFXb3JrZXJcIik7dmFyIHQ9dGhpczt0aGlzLmRhdGFJc1JlYWR5PSExLHRoaXMuaW5kZXg9MCx0aGlzLm1heD0wLHRoaXMuZGF0YT1udWxsLHRoaXMudHlwZT1cIlwiLHRoaXMuX3RpY2tTY2hlZHVsZWQ9ITEsZS50aGVuKGZ1bmN0aW9uKGUpe3QuZGF0YUlzUmVhZHk9ITAsdC5kYXRhPWUsdC5tYXg9ZSYmZS5sZW5ndGh8fDAsdC50eXBlPW4uZ2V0VHlwZU9mKGUpLHQuaXNQYXVzZWR8fHQuX3RpY2tBbmRSZXBlYXQoKX0sZnVuY3Rpb24oZSl7dC5lcnJvcihlKX0pfW4uaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5jbGVhblVwPWZ1bmN0aW9uKCl7aS5wcm90b3R5cGUuY2xlYW5VcC5jYWxsKHRoaXMpLHRoaXMuZGF0YT1udWxsfSxzLnByb3RvdHlwZS5yZXN1bWU9ZnVuY3Rpb24oKXtyZXR1cm4hIWkucHJvdG90eXBlLnJlc3VtZS5jYWxsKHRoaXMpJiYoIXRoaXMuX3RpY2tTY2hlZHVsZWQmJnRoaXMuZGF0YUlzUmVhZHkmJih0aGlzLl90aWNrU2NoZWR1bGVkPSEwLG4uZGVsYXkodGhpcy5fdGlja0FuZFJlcGVhdCxbXSx0aGlzKSksITApfSxzLnByb3RvdHlwZS5fdGlja0FuZFJlcGVhdD1mdW5jdGlvbigpe3RoaXMuX3RpY2tTY2hlZHVsZWQ9ITEsdGhpcy5pc1BhdXNlZHx8dGhpcy5pc0ZpbmlzaGVkfHwodGhpcy5fdGljaygpLHRoaXMuaXNGaW5pc2hlZHx8KG4uZGVsYXkodGhpcy5fdGlja0FuZFJlcGVhdCxbXSx0aGlzKSx0aGlzLl90aWNrU2NoZWR1bGVkPSEwKSl9LHMucHJvdG90eXBlLl90aWNrPWZ1bmN0aW9uKCl7aWYodGhpcy5pc1BhdXNlZHx8dGhpcy5pc0ZpbmlzaGVkKXJldHVybiExO3ZhciBlPW51bGwsdD1NYXRoLm1pbih0aGlzLm1heCx0aGlzLmluZGV4KzE2Mzg0KTtpZih0aGlzLmluZGV4Pj10aGlzLm1heClyZXR1cm4gdGhpcy5lbmQoKTtzd2l0Y2godGhpcy50eXBlKXtjYXNlXCJzdHJpbmdcIjplPXRoaXMuZGF0YS5zdWJzdHJpbmcodGhpcy5pbmRleCx0KTticmVhaztjYXNlXCJ1aW50OGFycmF5XCI6ZT10aGlzLmRhdGEuc3ViYXJyYXkodGhpcy5pbmRleCx0KTticmVhaztjYXNlXCJhcnJheVwiOmNhc2VcIm5vZGVidWZmZXJcIjplPXRoaXMuZGF0YS5zbGljZSh0aGlzLmluZGV4LHQpfXJldHVybiB0aGlzLmluZGV4PXQsdGhpcy5wdXNoKHtkYXRhOmUsbWV0YTp7cGVyY2VudDp0aGlzLm1heD90aGlzLmluZGV4L3RoaXMubWF4KjEwMDowfX0pfSx0LmV4cG9ydHM9c30se1wiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKGUpe3RoaXMubmFtZT1lfHxcImRlZmF1bHRcIix0aGlzLnN0cmVhbUluZm89e30sdGhpcy5nZW5lcmF0ZWRFcnJvcj1udWxsLHRoaXMuZXh0cmFTdHJlYW1JbmZvPXt9LHRoaXMuaXNQYXVzZWQ9ITAsdGhpcy5pc0ZpbmlzaGVkPSExLHRoaXMuaXNMb2NrZWQ9ITEsdGhpcy5fbGlzdGVuZXJzPXtkYXRhOltdLGVuZDpbXSxlcnJvcjpbXX0sdGhpcy5wcmV2aW91cz1udWxsfW4ucHJvdG90eXBlPXtwdXNoOmZ1bmN0aW9uKGUpe3RoaXMuZW1pdChcImRhdGFcIixlKX0sZW5kOmZ1bmN0aW9uKCl7aWYodGhpcy5pc0ZpbmlzaGVkKXJldHVybiExO3RoaXMuZmx1c2goKTt0cnl7dGhpcy5lbWl0KFwiZW5kXCIpLHRoaXMuY2xlYW5VcCgpLHRoaXMuaXNGaW5pc2hlZD0hMH1jYXRjaChlKXt0aGlzLmVtaXQoXCJlcnJvclwiLGUpfXJldHVybiEwfSxlcnJvcjpmdW5jdGlvbihlKXtyZXR1cm4hdGhpcy5pc0ZpbmlzaGVkJiYodGhpcy5pc1BhdXNlZD90aGlzLmdlbmVyYXRlZEVycm9yPWU6KHRoaXMuaXNGaW5pc2hlZD0hMCx0aGlzLmVtaXQoXCJlcnJvclwiLGUpLHRoaXMucHJldmlvdXMmJnRoaXMucHJldmlvdXMuZXJyb3IoZSksdGhpcy5jbGVhblVwKCkpLCEwKX0sb246ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5fbGlzdGVuZXJzW2VdLnB1c2godCksdGhpc30sY2xlYW5VcDpmdW5jdGlvbigpe3RoaXMuc3RyZWFtSW5mbz10aGlzLmdlbmVyYXRlZEVycm9yPXRoaXMuZXh0cmFTdHJlYW1JbmZvPW51bGwsdGhpcy5fbGlzdGVuZXJzPVtdfSxlbWl0OmZ1bmN0aW9uKGUsdCl7aWYodGhpcy5fbGlzdGVuZXJzW2VdKWZvcih2YXIgcj0wO3I8dGhpcy5fbGlzdGVuZXJzW2VdLmxlbmd0aDtyKyspdGhpcy5fbGlzdGVuZXJzW2VdW3JdLmNhbGwodGhpcyx0KX0scGlwZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5yZWdpc3RlclByZXZpb3VzKHRoaXMpfSxyZWdpc3RlclByZXZpb3VzOmZ1bmN0aW9uKGUpe2lmKHRoaXMuaXNMb2NrZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0cmVhbSAnXCIrdGhpcytcIicgaGFzIGFscmVhZHkgYmVlbiB1c2VkLlwiKTt0aGlzLnN0cmVhbUluZm89ZS5zdHJlYW1JbmZvLHRoaXMubWVyZ2VTdHJlYW1JbmZvKCksdGhpcy5wcmV2aW91cz1lO3ZhciB0PXRoaXM7cmV0dXJuIGUub24oXCJkYXRhXCIsZnVuY3Rpb24oZSl7dC5wcm9jZXNzQ2h1bmsoZSl9KSxlLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXt0LmVuZCgpfSksZS5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7dC5lcnJvcihlKX0pLHRoaXN9LHBhdXNlOmZ1bmN0aW9uKCl7cmV0dXJuIXRoaXMuaXNQYXVzZWQmJiF0aGlzLmlzRmluaXNoZWQmJih0aGlzLmlzUGF1c2VkPSEwLHRoaXMucHJldmlvdXMmJnRoaXMucHJldmlvdXMucGF1c2UoKSwhMCl9LHJlc3VtZTpmdW5jdGlvbigpe2lmKCF0aGlzLmlzUGF1c2VkfHx0aGlzLmlzRmluaXNoZWQpcmV0dXJuITE7dmFyIGU9dGhpcy5pc1BhdXNlZD0hMTtyZXR1cm4gdGhpcy5nZW5lcmF0ZWRFcnJvciYmKHRoaXMuZXJyb3IodGhpcy5nZW5lcmF0ZWRFcnJvciksZT0hMCksdGhpcy5wcmV2aW91cyYmdGhpcy5wcmV2aW91cy5yZXN1bWUoKSwhZX0sZmx1c2g6ZnVuY3Rpb24oKXt9LHByb2Nlc3NDaHVuazpmdW5jdGlvbihlKXt0aGlzLnB1c2goZSl9LHdpdGhTdHJlYW1JbmZvOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuZXh0cmFTdHJlYW1JbmZvW2VdPXQsdGhpcy5tZXJnZVN0cmVhbUluZm8oKSx0aGlzfSxtZXJnZVN0cmVhbUluZm86ZnVuY3Rpb24oKXtmb3IodmFyIGUgaW4gdGhpcy5leHRyYVN0cmVhbUluZm8pdGhpcy5leHRyYVN0cmVhbUluZm8uaGFzT3duUHJvcGVydHkoZSkmJih0aGlzLnN0cmVhbUluZm9bZV09dGhpcy5leHRyYVN0cmVhbUluZm9bZV0pfSxsb2NrOmZ1bmN0aW9uKCl7aWYodGhpcy5pc0xvY2tlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3RyZWFtICdcIit0aGlzK1wiJyBoYXMgYWxyZWFkeSBiZWVuIHVzZWQuXCIpO3RoaXMuaXNMb2NrZWQ9ITAsdGhpcy5wcmV2aW91cyYmdGhpcy5wcmV2aW91cy5sb2NrKCl9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7dmFyIGU9XCJXb3JrZXIgXCIrdGhpcy5uYW1lO3JldHVybiB0aGlzLnByZXZpb3VzP3RoaXMucHJldmlvdXMrXCIgLT4gXCIrZTplfX0sdC5leHBvcnRzPW59LHt9XSwyOTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBoPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuL0NvbnZlcnRXb3JrZXJcIikscz1lKFwiLi9HZW5lcmljV29ya2VyXCIpLGY9ZShcIi4uL2Jhc2U2NFwiKSxuPWUoXCIuLi9zdXBwb3J0XCIpLGE9ZShcIi4uL2V4dGVybmFsXCIpLG89bnVsbDtpZihuLm5vZGVzdHJlYW0pdHJ5e289ZShcIi4uL25vZGVqcy9Ob2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyXCIpfWNhdGNoKGUpe31mdW5jdGlvbiB1KGUsdCxyKXt2YXIgbj10O3N3aXRjaCh0KXtjYXNlXCJibG9iXCI6Y2FzZVwiYXJyYXlidWZmZXJcIjpuPVwidWludDhhcnJheVwiO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm49XCJzdHJpbmdcIn10cnl7dGhpcy5faW50ZXJuYWxUeXBlPW4sdGhpcy5fb3V0cHV0VHlwZT10LHRoaXMuX21pbWVUeXBlPXIsaC5jaGVja1N1cHBvcnQobiksdGhpcy5fd29ya2VyPWUucGlwZShuZXcgaShuKSksZS5sb2NrKCl9Y2F0Y2goZSl7dGhpcy5fd29ya2VyPW5ldyBzKFwiZXJyb3JcIiksdGhpcy5fd29ya2VyLmVycm9yKGUpfX11LnByb3RvdHlwZT17YWNjdW11bGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gbz10aGlzLHU9ZSxuZXcgYS5Qcm9taXNlKGZ1bmN0aW9uKHQscil7dmFyIG49W10saT1vLl9pbnRlcm5hbFR5cGUscz1vLl9vdXRwdXRUeXBlLGE9by5fbWltZVR5cGU7by5vbihcImRhdGFcIixmdW5jdGlvbihlLHQpe24ucHVzaChlKSx1JiZ1KHQpfSkub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe249W10scihlKX0pLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXt0cnl7dmFyIGU9ZnVuY3Rpb24oZSx0LHIpe3N3aXRjaChlKXtjYXNlXCJibG9iXCI6cmV0dXJuIGgubmV3QmxvYihoLnRyYW5zZm9ybVRvKFwiYXJyYXlidWZmZXJcIix0KSxyKTtjYXNlXCJiYXNlNjRcIjpyZXR1cm4gZi5lbmNvZGUodCk7ZGVmYXVsdDpyZXR1cm4gaC50cmFuc2Zvcm1UbyhlLHQpfX0ocyxmdW5jdGlvbihlLHQpe3ZhciByLG49MCxpPW51bGwscz0wO2ZvcihyPTA7cjx0Lmxlbmd0aDtyKyspcys9dFtyXS5sZW5ndGg7c3dpdGNoKGUpe2Nhc2VcInN0cmluZ1wiOnJldHVybiB0LmpvaW4oXCJcIik7Y2FzZVwiYXJyYXlcIjpyZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSx0KTtjYXNlXCJ1aW50OGFycmF5XCI6Zm9yKGk9bmV3IFVpbnQ4QXJyYXkocykscj0wO3I8dC5sZW5ndGg7cisrKWkuc2V0KHRbcl0sbiksbis9dFtyXS5sZW5ndGg7cmV0dXJuIGk7Y2FzZVwibm9kZWJ1ZmZlclwiOnJldHVybiBCdWZmZXIuY29uY2F0KHQpO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiY29uY2F0IDogdW5zdXBwb3J0ZWQgdHlwZSAnXCIrZStcIidcIil9fShpLG4pLGEpO3QoZSl9Y2F0Y2goZSl7cihlKX1uPVtdfSkucmVzdW1lKCl9KTt2YXIgbyx1fSxvbjpmdW5jdGlvbihlLHQpe3ZhciByPXRoaXM7cmV0dXJuXCJkYXRhXCI9PT1lP3RoaXMuX3dvcmtlci5vbihlLGZ1bmN0aW9uKGUpe3QuY2FsbChyLGUuZGF0YSxlLm1ldGEpfSk6dGhpcy5fd29ya2VyLm9uKGUsZnVuY3Rpb24oKXtoLmRlbGF5KHQsYXJndW1lbnRzLHIpfSksdGhpc30scmVzdW1lOmZ1bmN0aW9uKCl7cmV0dXJuIGguZGVsYXkodGhpcy5fd29ya2VyLnJlc3VtZSxbXSx0aGlzLl93b3JrZXIpLHRoaXN9LHBhdXNlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dvcmtlci5wYXVzZSgpLHRoaXN9LHRvTm9kZWpzU3RyZWFtOmZ1bmN0aW9uKGUpe2lmKGguY2hlY2tTdXBwb3J0KFwibm9kZXN0cmVhbVwiKSxcIm5vZGVidWZmZXJcIiE9PXRoaXMuX291dHB1dFR5cGUpdGhyb3cgbmV3IEVycm9yKHRoaXMuX291dHB1dFR5cGUrXCIgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIG1ldGhvZFwiKTtyZXR1cm4gbmV3IG8odGhpcyx7b2JqZWN0TW9kZTpcIm5vZGVidWZmZXJcIiE9PXRoaXMuX291dHB1dFR5cGV9LGUpfX0sdC5leHBvcnRzPXV9LHtcIi4uL2Jhc2U2NFwiOjEsXCIuLi9leHRlcm5hbFwiOjYsXCIuLi9ub2RlanMvTm9kZWpzU3RyZWFtT3V0cHV0QWRhcHRlclwiOjEzLFwiLi4vc3VwcG9ydFwiOjMwLFwiLi4vdXRpbHNcIjozMixcIi4vQ29udmVydFdvcmtlclwiOjI0LFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwzMDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2lmKHIuYmFzZTY0PSEwLHIuYXJyYXk9ITAsci5zdHJpbmc9ITAsci5hcnJheWJ1ZmZlcj1cInVuZGVmaW5lZFwiIT10eXBlb2YgQXJyYXlCdWZmZXImJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5LHIubm9kZWJ1ZmZlcj1cInVuZGVmaW5lZFwiIT10eXBlb2YgQnVmZmVyLHIudWludDhhcnJheT1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSxcInVuZGVmaW5lZFwiPT10eXBlb2YgQXJyYXlCdWZmZXIpci5ibG9iPSExO2Vsc2V7dmFyIG49bmV3IEFycmF5QnVmZmVyKDApO3RyeXtyLmJsb2I9MD09PW5ldyBCbG9iKFtuXSx7dHlwZTpcImFwcGxpY2F0aW9uL3ppcFwifSkuc2l6ZX1jYXRjaChlKXt0cnl7dmFyIGk9bmV3KHNlbGYuQmxvYkJ1aWxkZXJ8fHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXJ8fHNlbGYuTW96QmxvYkJ1aWxkZXJ8fHNlbGYuTVNCbG9iQnVpbGRlcik7aS5hcHBlbmQobiksci5ibG9iPTA9PT1pLmdldEJsb2IoXCJhcHBsaWNhdGlvbi96aXBcIikuc2l6ZX1jYXRjaChlKXtyLmJsb2I9ITF9fX10cnl7ci5ub2Rlc3RyZWFtPSEhZShcInJlYWRhYmxlLXN0cmVhbVwiKS5SZWFkYWJsZX1jYXRjaChlKXtyLm5vZGVzdHJlYW09ITF9fSx7XCJyZWFkYWJsZS1zdHJlYW1cIjoxNn1dLDMxOltmdW5jdGlvbihlLHQscyl7XCJ1c2Ugc3RyaWN0XCI7Zm9yKHZhciBvPWUoXCIuL3V0aWxzXCIpLHU9ZShcIi4vc3VwcG9ydFwiKSxyPWUoXCIuL25vZGVqc1V0aWxzXCIpLG49ZShcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIiksaD1uZXcgQXJyYXkoMjU2KSxpPTA7aTwyNTY7aSsrKWhbaV09MjUyPD1pPzY6MjQ4PD1pPzU6MjQwPD1pPzQ6MjI0PD1pPzM6MTkyPD1pPzI6MTtmdW5jdGlvbiBhKCl7bi5jYWxsKHRoaXMsXCJ1dGYtOCBkZWNvZGVcIiksdGhpcy5sZWZ0T3Zlcj1udWxsfWZ1bmN0aW9uIGYoKXtuLmNhbGwodGhpcyxcInV0Zi04IGVuY29kZVwiKX1oWzI1NF09aFsyNTRdPTEscy51dGY4ZW5jb2RlPWZ1bmN0aW9uKGUpe3JldHVybiB1Lm5vZGVidWZmZXI/ci5uZXdCdWZmZXJGcm9tKGUsXCJ1dGYtOFwiKTpmdW5jdGlvbihlKXt2YXIgdCxyLG4saSxzLGE9ZS5sZW5ndGgsbz0wO2ZvcihpPTA7aTxhO2krKyk1NTI5Nj09KDY0NTEyJihyPWUuY2hhckNvZGVBdChpKSkpJiZpKzE8YSYmNTYzMjA9PSg2NDUxMiYobj1lLmNoYXJDb2RlQXQoaSsxKSkpJiYocj02NTUzNisoci01NTI5Njw8MTApKyhuLTU2MzIwKSxpKyspLG8rPXI8MTI4PzE6cjwyMDQ4PzI6cjw2NTUzNj8zOjQ7Zm9yKHQ9dS51aW50OGFycmF5P25ldyBVaW50OEFycmF5KG8pOm5ldyBBcnJheShvKSxpPXM9MDtzPG87aSsrKTU1Mjk2PT0oNjQ1MTImKHI9ZS5jaGFyQ29kZUF0KGkpKSkmJmkrMTxhJiY1NjMyMD09KDY0NTEyJihuPWUuY2hhckNvZGVBdChpKzEpKSkmJihyPTY1NTM2KyhyLTU1Mjk2PDwxMCkrKG4tNTYzMjApLGkrKykscjwxMjg/dFtzKytdPXI6KHI8MjA0OD90W3MrK109MTkyfHI+Pj42OihyPDY1NTM2P3RbcysrXT0yMjR8cj4+PjEyOih0W3MrK109MjQwfHI+Pj4xOCx0W3MrK109MTI4fHI+Pj4xMiY2MyksdFtzKytdPTEyOHxyPj4+NiY2MyksdFtzKytdPTEyOHw2MyZyKTtyZXR1cm4gdH0oZSl9LHMudXRmOGRlY29kZT1mdW5jdGlvbihlKXtyZXR1cm4gdS5ub2RlYnVmZmVyP28udHJhbnNmb3JtVG8oXCJub2RlYnVmZmVyXCIsZSkudG9TdHJpbmcoXCJ1dGYtOFwiKTpmdW5jdGlvbihlKXt2YXIgdCxyLG4saSxzPWUubGVuZ3RoLGE9bmV3IEFycmF5KDIqcyk7Zm9yKHQ9cj0wO3Q8czspaWYoKG49ZVt0KytdKTwxMjgpYVtyKytdPW47ZWxzZSBpZig0PChpPWhbbl0pKWFbcisrXT02NTUzMyx0Kz1pLTE7ZWxzZXtmb3IobiY9Mj09PWk/MzE6Mz09PWk/MTU6NzsxPGkmJnQ8czspbj1uPDw2fDYzJmVbdCsrXSxpLS07MTxpP2FbcisrXT02NTUzMzpuPDY1NTM2P2FbcisrXT1uOihuLT02NTUzNixhW3IrK109NTUyOTZ8bj4+MTAmMTAyMyxhW3IrK109NTYzMjB8MTAyMyZuKX1yZXR1cm4gYS5sZW5ndGghPT1yJiYoYS5zdWJhcnJheT9hPWEuc3ViYXJyYXkoMCxyKTphLmxlbmd0aD1yKSxvLmFwcGx5RnJvbUNoYXJDb2RlKGEpfShlPW8udHJhbnNmb3JtVG8odS51aW50OGFycmF5P1widWludDhhcnJheVwiOlwiYXJyYXlcIixlKSl9LG8uaW5oZXJpdHMoYSxuKSxhLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dmFyIHQ9by50cmFuc2Zvcm1Ubyh1LnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiLGUuZGF0YSk7aWYodGhpcy5sZWZ0T3ZlciYmdGhpcy5sZWZ0T3Zlci5sZW5ndGgpe2lmKHUudWludDhhcnJheSl7dmFyIHI9dDsodD1uZXcgVWludDhBcnJheShyLmxlbmd0aCt0aGlzLmxlZnRPdmVyLmxlbmd0aCkpLnNldCh0aGlzLmxlZnRPdmVyLDApLHQuc2V0KHIsdGhpcy5sZWZ0T3Zlci5sZW5ndGgpfWVsc2UgdD10aGlzLmxlZnRPdmVyLmNvbmNhdCh0KTt0aGlzLmxlZnRPdmVyPW51bGx9dmFyIG49ZnVuY3Rpb24oZSx0KXt2YXIgcjtmb3IoKHQ9dHx8ZS5sZW5ndGgpPmUubGVuZ3RoJiYodD1lLmxlbmd0aCkscj10LTE7MDw9ciYmMTI4PT0oMTkyJmVbcl0pOylyLS07cmV0dXJuIHI8MD90OjA9PT1yP3Q6citoW2Vbcl1dPnQ/cjp0fSh0KSxpPXQ7biE9PXQubGVuZ3RoJiYodS51aW50OGFycmF5PyhpPXQuc3ViYXJyYXkoMCxuKSx0aGlzLmxlZnRPdmVyPXQuc3ViYXJyYXkobix0Lmxlbmd0aCkpOihpPXQuc2xpY2UoMCxuKSx0aGlzLmxlZnRPdmVyPXQuc2xpY2Uobix0Lmxlbmd0aCkpKSx0aGlzLnB1c2goe2RhdGE6cy51dGY4ZGVjb2RlKGkpLG1ldGE6ZS5tZXRhfSl9LGEucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7dGhpcy5sZWZ0T3ZlciYmdGhpcy5sZWZ0T3Zlci5sZW5ndGgmJih0aGlzLnB1c2goe2RhdGE6cy51dGY4ZGVjb2RlKHRoaXMubGVmdE92ZXIpLG1ldGE6e319KSx0aGlzLmxlZnRPdmVyPW51bGwpfSxzLlV0ZjhEZWNvZGVXb3JrZXI9YSxvLmluaGVyaXRzKGYsbiksZi5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe3RoaXMucHVzaCh7ZGF0YTpzLnV0ZjhlbmNvZGUoZS5kYXRhKSxtZXRhOmUubWV0YX0pfSxzLlV0ZjhFbmNvZGVXb3JrZXI9Zn0se1wiLi9ub2RlanNVdGlsc1wiOjE0LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0aWxzXCI6MzJ9XSwzMjpbZnVuY3Rpb24oZSx0LG8pe1widXNlIHN0cmljdFwiO3ZhciB1PWUoXCIuL3N1cHBvcnRcIiksaD1lKFwiLi9iYXNlNjRcIikscj1lKFwiLi9ub2RlanNVdGlsc1wiKSxuPWUoXCJzZXQtaW1tZWRpYXRlLXNoaW1cIiksZj1lKFwiLi9leHRlcm5hbFwiKTtmdW5jdGlvbiBpKGUpe3JldHVybiBlfWZ1bmN0aW9uIGwoZSx0KXtmb3IodmFyIHI9MDtyPGUubGVuZ3RoOysrcil0W3JdPTI1NSZlLmNoYXJDb2RlQXQocik7cmV0dXJuIHR9by5uZXdCbG9iPWZ1bmN0aW9uKHQscil7by5jaGVja1N1cHBvcnQoXCJibG9iXCIpO3RyeXtyZXR1cm4gbmV3IEJsb2IoW3RdLHt0eXBlOnJ9KX1jYXRjaChlKXt0cnl7dmFyIG49bmV3KHNlbGYuQmxvYkJ1aWxkZXJ8fHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXJ8fHNlbGYuTW96QmxvYkJ1aWxkZXJ8fHNlbGYuTVNCbG9iQnVpbGRlcik7cmV0dXJuIG4uYXBwZW5kKHQpLG4uZ2V0QmxvYihyKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IoXCJCdWcgOiBjYW4ndCBjb25zdHJ1Y3QgdGhlIEJsb2IuXCIpfX19O3ZhciBzPXtzdHJpbmdpZnlCeUNodW5rOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1bXSxpPTAscz1lLmxlbmd0aDtpZihzPD1yKXJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsZSk7Zm9yKDtpPHM7KVwiYXJyYXlcIj09PXR8fFwibm9kZWJ1ZmZlclwiPT09dD9uLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGUuc2xpY2UoaSxNYXRoLm1pbihpK3IscykpKSk6bi5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxlLnN1YmFycmF5KGksTWF0aC5taW4oaStyLHMpKSkpLGkrPXI7cmV0dXJuIG4uam9pbihcIlwiKX0sc3RyaW5naWZ5QnlDaGFyOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1cIlwiLHI9MDtyPGUubGVuZ3RoO3IrKyl0Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbcl0pO3JldHVybiB0fSxhcHBseUNhbkJlVXNlZDp7dWludDhhcnJheTpmdW5jdGlvbigpe3RyeXtyZXR1cm4gdS51aW50OGFycmF5JiYxPT09U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KDEpKS5sZW5ndGh9Y2F0Y2goZSl7cmV0dXJuITF9fSgpLG5vZGVidWZmZXI6ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIHUubm9kZWJ1ZmZlciYmMT09PVN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxyLmFsbG9jQnVmZmVyKDEpKS5sZW5ndGh9Y2F0Y2goZSl7cmV0dXJuITF9fSgpfX07ZnVuY3Rpb24gYShlKXt2YXIgdD02NTUzNixyPW8uZ2V0VHlwZU9mKGUpLG49ITA7aWYoXCJ1aW50OGFycmF5XCI9PT1yP249cy5hcHBseUNhbkJlVXNlZC51aW50OGFycmF5Olwibm9kZWJ1ZmZlclwiPT09ciYmKG49cy5hcHBseUNhbkJlVXNlZC5ub2RlYnVmZmVyKSxuKWZvcig7MTx0Oyl0cnl7cmV0dXJuIHMuc3RyaW5naWZ5QnlDaHVuayhlLHIsdCl9Y2F0Y2goZSl7dD1NYXRoLmZsb29yKHQvMil9cmV0dXJuIHMuc3RyaW5naWZ5QnlDaGFyKGUpfWZ1bmN0aW9uIGQoZSx0KXtmb3IodmFyIHI9MDtyPGUubGVuZ3RoO3IrKyl0W3JdPWVbcl07cmV0dXJuIHR9by5hcHBseUZyb21DaGFyQ29kZT1hO3ZhciBjPXt9O2Muc3RyaW5nPXtzdHJpbmc6aSxhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gbChlLG5ldyBBcnJheShlLmxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gYy5zdHJpbmcudWludDhhcnJheShlKS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxuZXcgVWludDhBcnJheShlLmxlbmd0aCkpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBsKGUsci5hbGxvY0J1ZmZlcihlLmxlbmd0aCkpfX0sYy5hcnJheT17c3RyaW5nOmEsYXJyYXk6aSxhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSkuYnVmZmVyfSx1aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBuZXcgVWludDhBcnJheShlKX0sbm9kZWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gci5uZXdCdWZmZXJGcm9tKGUpfX0sYy5hcnJheWJ1ZmZlcj17c3RyaW5nOmZ1bmN0aW9uKGUpe3JldHVybiBhKG5ldyBVaW50OEFycmF5KGUpKX0sYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGQobmV3IFVpbnQ4QXJyYXkoZSksbmV3IEFycmF5KGUuYnl0ZUxlbmd0aCkpfSxhcnJheWJ1ZmZlcjppLHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiByLm5ld0J1ZmZlckZyb20obmV3IFVpbnQ4QXJyYXkoZSkpfX0sYy51aW50OGFycmF5PXtzdHJpbmc6YSxhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZChlLG5ldyBBcnJheShlLmxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gZS5idWZmZXJ9LHVpbnQ4YXJyYXk6aSxub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiByLm5ld0J1ZmZlckZyb20oZSl9fSxjLm5vZGVidWZmZXI9e3N0cmluZzphLGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBkKGUsbmV3IEFycmF5KGUubGVuZ3RoKSl9LGFycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBjLm5vZGVidWZmZXIudWludDhhcnJheShlKS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZSxuZXcgVWludDhBcnJheShlLmxlbmd0aCkpfSxub2RlYnVmZmVyOml9LG8udHJhbnNmb3JtVG89ZnVuY3Rpb24oZSx0KXtpZih0PXR8fFwiXCIsIWUpcmV0dXJuIHQ7by5jaGVja1N1cHBvcnQoZSk7dmFyIHI9by5nZXRUeXBlT2YodCk7cmV0dXJuIGNbcl1bZV0odCl9LG8uZ2V0VHlwZU9mPWZ1bmN0aW9uKGUpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBlP1wic3RyaW5nXCI6XCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpP1wiYXJyYXlcIjp1Lm5vZGVidWZmZXImJnIuaXNCdWZmZXIoZSk/XCJub2RlYnVmZmVyXCI6dS51aW50OGFycmF5JiZlIGluc3RhbmNlb2YgVWludDhBcnJheT9cInVpbnQ4YXJyYXlcIjp1LmFycmF5YnVmZmVyJiZlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/XCJhcnJheWJ1ZmZlclwiOnZvaWQgMH0sby5jaGVja1N1cHBvcnQ9ZnVuY3Rpb24oZSl7aWYoIXVbZS50b0xvd2VyQ2FzZSgpXSl0aHJvdyBuZXcgRXJyb3IoZStcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgcGxhdGZvcm1cIil9LG8uTUFYX1ZBTFVFXzE2QklUUz02NTUzNSxvLk1BWF9WQUxVRV8zMkJJVFM9LTEsby5wcmV0dHk9ZnVuY3Rpb24oZSl7dmFyIHQscixuPVwiXCI7Zm9yKHI9MDtyPChlfHxcIlwiKS5sZW5ndGg7cisrKW4rPVwiXFxcXHhcIisoKHQ9ZS5jaGFyQ29kZUF0KHIpKTwxNj9cIjBcIjpcIlwiKSt0LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO3JldHVybiBufSxvLmRlbGF5PWZ1bmN0aW9uKGUsdCxyKXtuKGZ1bmN0aW9uKCl7ZS5hcHBseShyfHxudWxsLHR8fFtdKX0pfSxvLmluaGVyaXRzPWZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gcigpe31yLnByb3RvdHlwZT10LnByb3RvdHlwZSxlLnByb3RvdHlwZT1uZXcgcn0sby5leHRlbmQ9ZnVuY3Rpb24oKXt2YXIgZSx0LHI9e307Zm9yKGU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKWZvcih0IGluIGFyZ3VtZW50c1tlXSlhcmd1bWVudHNbZV0uaGFzT3duUHJvcGVydHkodCkmJnZvaWQgMD09PXJbdF0mJihyW3RdPWFyZ3VtZW50c1tlXVt0XSk7cmV0dXJuIHJ9LG8ucHJlcGFyZUNvbnRlbnQ9ZnVuY3Rpb24obixlLGkscyxhKXtyZXR1cm4gZi5Qcm9taXNlLnJlc29sdmUoZSkudGhlbihmdW5jdGlvbihuKXtyZXR1cm4gdS5ibG9iJiYobiBpbnN0YW5jZW9mIEJsb2J8fC0xIT09W1wiW29iamVjdCBGaWxlXVwiLFwiW29iamVjdCBCbG9iXVwiXS5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKSkpJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcj9uZXcgZi5Qcm9taXNlKGZ1bmN0aW9uKHQscil7dmFyIGU9bmV3IEZpbGVSZWFkZXI7ZS5vbmxvYWQ9ZnVuY3Rpb24oZSl7dChlLnRhcmdldC5yZXN1bHQpfSxlLm9uZXJyb3I9ZnVuY3Rpb24oZSl7cihlLnRhcmdldC5lcnJvcil9LGUucmVhZEFzQXJyYXlCdWZmZXIobil9KTpufSkudGhlbihmdW5jdGlvbihlKXt2YXIgdCxyPW8uZ2V0VHlwZU9mKGUpO3JldHVybiByPyhcImFycmF5YnVmZmVyXCI9PT1yP2U9by50cmFuc2Zvcm1UbyhcInVpbnQ4YXJyYXlcIixlKTpcInN0cmluZ1wiPT09ciYmKGE/ZT1oLmRlY29kZShlKTppJiYhMCE9PXMmJihlPWwodD1lLHUudWludDhhcnJheT9uZXcgVWludDhBcnJheSh0Lmxlbmd0aCk6bmV3IEFycmF5KHQubGVuZ3RoKSkpKSxlKTpmLlByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbid0IHJlYWQgdGhlIGRhdGEgb2YgJ1wiK24rXCInLiBJcyBpdCBpbiBhIHN1cHBvcnRlZCBKYXZhU2NyaXB0IHR5cGUgKFN0cmluZywgQmxvYiwgQXJyYXlCdWZmZXIsIGV0YykgP1wiKSl9KX19LHtcIi4vYmFzZTY0XCI6MSxcIi4vZXh0ZXJuYWxcIjo2LFwiLi9ub2RlanNVdGlsc1wiOjE0LFwiLi9zdXBwb3J0XCI6MzAsXCJzZXQtaW1tZWRpYXRlLXNoaW1cIjo1NH1dLDMzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vcmVhZGVyL3JlYWRlckZvclwiKSxpPWUoXCIuL3V0aWxzXCIpLHM9ZShcIi4vc2lnbmF0dXJlXCIpLGE9ZShcIi4vemlwRW50cnlcIiksbz0oZShcIi4vdXRmOFwiKSxlKFwiLi9zdXBwb3J0XCIpKTtmdW5jdGlvbiB1KGUpe3RoaXMuZmlsZXM9W10sdGhpcy5sb2FkT3B0aW9ucz1lfXUucHJvdG90eXBlPXtjaGVja1NpZ25hdHVyZTpmdW5jdGlvbihlKXtpZighdGhpcy5yZWFkZXIucmVhZEFuZENoZWNrU2lnbmF0dXJlKGUpKXt0aGlzLnJlYWRlci5pbmRleC09NDt2YXIgdD10aGlzLnJlYWRlci5yZWFkU3RyaW5nKDQpO3Rocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgb3IgYnVnOiB1bmV4cGVjdGVkIHNpZ25hdHVyZSAoXCIraS5wcmV0dHkodCkrXCIsIGV4cGVjdGVkIFwiK2kucHJldHR5KGUpK1wiKVwiKX19LGlzU2lnbmF0dXJlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9dGhpcy5yZWFkZXIuaW5kZXg7dGhpcy5yZWFkZXIuc2V0SW5kZXgoZSk7dmFyIG49dGhpcy5yZWFkZXIucmVhZFN0cmluZyg0KT09PXQ7cmV0dXJuIHRoaXMucmVhZGVyLnNldEluZGV4KHIpLG59LHJlYWRCbG9ja0VuZE9mQ2VudHJhbDpmdW5jdGlvbigpe3RoaXMuZGlza051bWJlcj10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQ9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzaz10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuY2VudHJhbERpclJlY29yZHM9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmNlbnRyYWxEaXJTaXplPXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy5jZW50cmFsRGlyT2Zmc2V0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy56aXBDb21tZW50TGVuZ3RoPXRoaXMucmVhZGVyLnJlYWRJbnQoMik7dmFyIGU9dGhpcy5yZWFkZXIucmVhZERhdGEodGhpcy56aXBDb21tZW50TGVuZ3RoKSx0PW8udWludDhhcnJheT9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCIscj1pLnRyYW5zZm9ybVRvKHQsZSk7dGhpcy56aXBDb21tZW50PXRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUocil9LHJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsOmZ1bmN0aW9uKCl7dGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemU9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLnJlYWRlci5za2lwKDQpLHRoaXMuZGlza051bWJlcj10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzaz10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuY2VudHJhbERpclJlY29yZHM9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLmNlbnRyYWxEaXJTaXplPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5jZW50cmFsRGlyT2Zmc2V0PXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy56aXA2NEV4dGVuc2libGVEYXRhPXt9O2Zvcih2YXIgZSx0LHIsbj10aGlzLnppcDY0RW5kT2ZDZW50cmFsU2l6ZS00NDswPG47KWU9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCkscj10aGlzLnJlYWRlci5yZWFkRGF0YSh0KSx0aGlzLnppcDY0RXh0ZW5zaWJsZURhdGFbZV09e2lkOmUsbGVuZ3RoOnQsdmFsdWU6cn19LHJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsTG9jYXRvcjpmdW5jdGlvbigpe2lmKHRoaXMuZGlza1dpdGhaaXA2NENlbnRyYWxEaXJTdGFydD10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcj10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuZGlza3NDb3VudD10aGlzLnJlYWRlci5yZWFkSW50KDQpLDE8dGhpcy5kaXNrc0NvdW50KXRocm93IG5ldyBFcnJvcihcIk11bHRpLXZvbHVtZXMgemlwIGFyZSBub3Qgc3VwcG9ydGVkXCIpfSxyZWFkTG9jYWxGaWxlczpmdW5jdGlvbigpe3ZhciBlLHQ7Zm9yKGU9MDtlPHRoaXMuZmlsZXMubGVuZ3RoO2UrKyl0PXRoaXMuZmlsZXNbZV0sdGhpcy5yZWFkZXIuc2V0SW5kZXgodC5sb2NhbEhlYWRlck9mZnNldCksdGhpcy5jaGVja1NpZ25hdHVyZShzLkxPQ0FMX0ZJTEVfSEVBREVSKSx0LnJlYWRMb2NhbFBhcnQodGhpcy5yZWFkZXIpLHQuaGFuZGxlVVRGOCgpLHQucHJvY2Vzc0F0dHJpYnV0ZXMoKX0scmVhZENlbnRyYWxEaXI6ZnVuY3Rpb24oKXt2YXIgZTtmb3IodGhpcy5yZWFkZXIuc2V0SW5kZXgodGhpcy5jZW50cmFsRGlyT2Zmc2V0KTt0aGlzLnJlYWRlci5yZWFkQW5kQ2hlY2tTaWduYXR1cmUocy5DRU5UUkFMX0ZJTEVfSEVBREVSKTspKGU9bmV3IGEoe3ppcDY0OnRoaXMuemlwNjR9LHRoaXMubG9hZE9wdGlvbnMpKS5yZWFkQ2VudHJhbFBhcnQodGhpcy5yZWFkZXIpLHRoaXMuZmlsZXMucHVzaChlKTtpZih0aGlzLmNlbnRyYWxEaXJSZWNvcmRzIT09dGhpcy5maWxlcy5sZW5ndGgmJjAhPT10aGlzLmNlbnRyYWxEaXJSZWNvcmRzJiYwPT09dGhpcy5maWxlcy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCBvciBidWc6IGV4cGVjdGVkIFwiK3RoaXMuY2VudHJhbERpclJlY29yZHMrXCIgcmVjb3JkcyBpbiBjZW50cmFsIGRpciwgZ290IFwiK3RoaXMuZmlsZXMubGVuZ3RoKX0scmVhZEVuZE9mQ2VudHJhbDpmdW5jdGlvbigpe3ZhciBlPXRoaXMucmVhZGVyLmxhc3RJbmRleE9mU2lnbmF0dXJlKHMuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKTtpZihlPDApdGhyb3cgdGhpcy5pc1NpZ25hdHVyZSgwLHMuTE9DQUxfRklMRV9IRUFERVIpP25ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IGNhbid0IGZpbmQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5XCIpOm5ldyBFcnJvcihcIkNhbid0IGZpbmQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IDogaXMgdGhpcyBhIHppcCBmaWxlID8gSWYgaXQgaXMsIHNlZSBodHRwczovL3N0dWsuZ2l0aHViLmlvL2pzemlwL2RvY3VtZW50YXRpb24vaG93dG8vcmVhZF96aXAuaHRtbFwiKTt0aGlzLnJlYWRlci5zZXRJbmRleChlKTt2YXIgdD1lO2lmKHRoaXMuY2hlY2tTaWduYXR1cmUocy5DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLHRoaXMucmVhZEJsb2NrRW5kT2ZDZW50cmFsKCksdGhpcy5kaXNrTnVtYmVyPT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmRpc2tXaXRoQ2VudHJhbERpclN0YXJ0PT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzaz09PWkuTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5jZW50cmFsRGlyUmVjb3Jkcz09PWkuTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5jZW50cmFsRGlyU2l6ZT09PWkuTUFYX1ZBTFVFXzMyQklUU3x8dGhpcy5jZW50cmFsRGlyT2Zmc2V0PT09aS5NQVhfVkFMVUVfMzJCSVRTKXtpZih0aGlzLnppcDY0PSEwLChlPXRoaXMucmVhZGVyLmxhc3RJbmRleE9mU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfTE9DQVRPUikpPDApdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogY2FuJ3QgZmluZCB0aGUgWklQNjQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IGxvY2F0b3JcIik7aWYodGhpcy5yZWFkZXIuc2V0SW5kZXgoZSksdGhpcy5jaGVja1NpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IpLHRoaXMucmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWxMb2NhdG9yKCksIXRoaXMuaXNTaWduYXR1cmUodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyLHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSYmKHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcj10aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCksdGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyPDApKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IGNhbid0IGZpbmQgdGhlIFpJUDY0IGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeVwiKTt0aGlzLnJlYWRlci5zZXRJbmRleCh0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXIpLHRoaXMuY2hlY2tTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLHRoaXMucmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWwoKX12YXIgcj10aGlzLmNlbnRyYWxEaXJPZmZzZXQrdGhpcy5jZW50cmFsRGlyU2l6ZTt0aGlzLnppcDY0JiYocis9MjAscis9MTIrdGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemUpO3ZhciBuPXQtcjtpZigwPG4pdGhpcy5pc1NpZ25hdHVyZSh0LHMuQ0VOVFJBTF9GSUxFX0hFQURFUil8fCh0aGlzLnJlYWRlci56ZXJvPW4pO2Vsc2UgaWYobjwwKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IG1pc3NpbmcgXCIrTWF0aC5hYnMobikrXCIgYnl0ZXMuXCIpfSxwcmVwYXJlUmVhZGVyOmZ1bmN0aW9uKGUpe3RoaXMucmVhZGVyPW4oZSl9LGxvYWQ6ZnVuY3Rpb24oZSl7dGhpcy5wcmVwYXJlUmVhZGVyKGUpLHRoaXMucmVhZEVuZE9mQ2VudHJhbCgpLHRoaXMucmVhZENlbnRyYWxEaXIoKSx0aGlzLnJlYWRMb2NhbEZpbGVzKCl9fSx0LmV4cG9ydHM9dX0se1wiLi9yZWFkZXIvcmVhZGVyRm9yXCI6MjIsXCIuL3NpZ25hdHVyZVwiOjIzLFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMixcIi4vemlwRW50cnlcIjozNH1dLDM0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vcmVhZGVyL3JlYWRlckZvclwiKSxzPWUoXCIuL3V0aWxzXCIpLGk9ZShcIi4vY29tcHJlc3NlZE9iamVjdFwiKSxhPWUoXCIuL2NyYzMyXCIpLG89ZShcIi4vdXRmOFwiKSx1PWUoXCIuL2NvbXByZXNzaW9uc1wiKSxoPWUoXCIuL3N1cHBvcnRcIik7ZnVuY3Rpb24gZihlLHQpe3RoaXMub3B0aW9ucz1lLHRoaXMubG9hZE9wdGlvbnM9dH1mLnByb3RvdHlwZT17aXNFbmNyeXB0ZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gMT09KDEmdGhpcy5iaXRGbGFnKX0sdXNlVVRGODpmdW5jdGlvbigpe3JldHVybiAyMDQ4PT0oMjA0OCZ0aGlzLmJpdEZsYWcpfSxyZWFkTG9jYWxQYXJ0OmZ1bmN0aW9uKGUpe3ZhciB0LHI7aWYoZS5za2lwKDIyKSx0aGlzLmZpbGVOYW1lTGVuZ3RoPWUucmVhZEludCgyKSxyPWUucmVhZEludCgyKSx0aGlzLmZpbGVOYW1lPWUucmVhZERhdGEodGhpcy5maWxlTmFtZUxlbmd0aCksZS5za2lwKHIpLC0xPT09dGhpcy5jb21wcmVzc2VkU2l6ZXx8LTE9PT10aGlzLnVuY29tcHJlc3NlZFNpemUpdGhyb3cgbmV3IEVycm9yKFwiQnVnIG9yIGNvcnJ1cHRlZCB6aXAgOiBkaWRuJ3QgZ2V0IGVub3VnaCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBjZW50cmFsIGRpcmVjdG9yeSAoY29tcHJlc3NlZFNpemUgPT09IC0xIHx8IHVuY29tcHJlc3NlZFNpemUgPT09IC0xKVwiKTtpZihudWxsPT09KHQ9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0IGluIHUpaWYodS5oYXNPd25Qcm9wZXJ0eSh0KSYmdVt0XS5tYWdpYz09PWUpcmV0dXJuIHVbdF07cmV0dXJuIG51bGx9KHRoaXMuY29tcHJlc3Npb25NZXRob2QpKSl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwIDogY29tcHJlc3Npb24gXCIrcy5wcmV0dHkodGhpcy5jb21wcmVzc2lvbk1ldGhvZCkrXCIgdW5rbm93biAoaW5uZXIgZmlsZSA6IFwiK3MudHJhbnNmb3JtVG8oXCJzdHJpbmdcIix0aGlzLmZpbGVOYW1lKStcIilcIik7dGhpcy5kZWNvbXByZXNzZWQ9bmV3IGkodGhpcy5jb21wcmVzc2VkU2l6ZSx0aGlzLnVuY29tcHJlc3NlZFNpemUsdGhpcy5jcmMzMix0LGUucmVhZERhdGEodGhpcy5jb21wcmVzc2VkU2l6ZSkpfSxyZWFkQ2VudHJhbFBhcnQ6ZnVuY3Rpb24oZSl7dGhpcy52ZXJzaW9uTWFkZUJ5PWUucmVhZEludCgyKSxlLnNraXAoMiksdGhpcy5iaXRGbGFnPWUucmVhZEludCgyKSx0aGlzLmNvbXByZXNzaW9uTWV0aG9kPWUucmVhZFN0cmluZygyKSx0aGlzLmRhdGU9ZS5yZWFkRGF0ZSgpLHRoaXMuY3JjMzI9ZS5yZWFkSW50KDQpLHRoaXMuY29tcHJlc3NlZFNpemU9ZS5yZWFkSW50KDQpLHRoaXMudW5jb21wcmVzc2VkU2l6ZT1lLnJlYWRJbnQoNCk7dmFyIHQ9ZS5yZWFkSW50KDIpO2lmKHRoaXMuZXh0cmFGaWVsZHNMZW5ndGg9ZS5yZWFkSW50KDIpLHRoaXMuZmlsZUNvbW1lbnRMZW5ndGg9ZS5yZWFkSW50KDIpLHRoaXMuZGlza051bWJlclN0YXJ0PWUucmVhZEludCgyKSx0aGlzLmludGVybmFsRmlsZUF0dHJpYnV0ZXM9ZS5yZWFkSW50KDIpLHRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcz1lLnJlYWRJbnQoNCksdGhpcy5sb2NhbEhlYWRlck9mZnNldD1lLnJlYWRJbnQoNCksdGhpcy5pc0VuY3J5cHRlZCgpKXRocm93IG5ldyBFcnJvcihcIkVuY3J5cHRlZCB6aXAgYXJlIG5vdCBzdXBwb3J0ZWRcIik7ZS5za2lwKHQpLHRoaXMucmVhZEV4dHJhRmllbGRzKGUpLHRoaXMucGFyc2VaSVA2NEV4dHJhRmllbGQoZSksdGhpcy5maWxlQ29tbWVudD1lLnJlYWREYXRhKHRoaXMuZmlsZUNvbW1lbnRMZW5ndGgpfSxwcm9jZXNzQXR0cmlidXRlczpmdW5jdGlvbigpe3RoaXMudW5peFBlcm1pc3Npb25zPW51bGwsdGhpcy5kb3NQZXJtaXNzaW9ucz1udWxsO3ZhciBlPXRoaXMudmVyc2lvbk1hZGVCeT4+ODt0aGlzLmRpcj0hISgxNiZ0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXMpLDA9PWUmJih0aGlzLmRvc1Blcm1pc3Npb25zPTYzJnRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcyksMz09ZSYmKHRoaXMudW5peFBlcm1pc3Npb25zPXRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcz4+MTYmNjU1MzUpLHRoaXMuZGlyfHxcIi9cIiE9PXRoaXMuZmlsZU5hbWVTdHIuc2xpY2UoLTEpfHwodGhpcy5kaXI9ITApfSxwYXJzZVpJUDY0RXh0cmFGaWVsZDpmdW5jdGlvbihlKXtpZih0aGlzLmV4dHJhRmllbGRzWzFdKXt2YXIgdD1uKHRoaXMuZXh0cmFGaWVsZHNbMV0udmFsdWUpO3RoaXMudW5jb21wcmVzc2VkU2l6ZT09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMudW5jb21wcmVzc2VkU2l6ZT10LnJlYWRJbnQoOCkpLHRoaXMuY29tcHJlc3NlZFNpemU9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLmNvbXByZXNzZWRTaXplPXQucmVhZEludCg4KSksdGhpcy5sb2NhbEhlYWRlck9mZnNldD09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMubG9jYWxIZWFkZXJPZmZzZXQ9dC5yZWFkSW50KDgpKSx0aGlzLmRpc2tOdW1iZXJTdGFydD09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMuZGlza051bWJlclN0YXJ0PXQucmVhZEludCg0KSl9fSxyZWFkRXh0cmFGaWVsZHM6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGk9ZS5pbmRleCt0aGlzLmV4dHJhRmllbGRzTGVuZ3RoO2Zvcih0aGlzLmV4dHJhRmllbGRzfHwodGhpcy5leHRyYUZpZWxkcz17fSk7ZS5pbmRleCs0PGk7KXQ9ZS5yZWFkSW50KDIpLHI9ZS5yZWFkSW50KDIpLG49ZS5yZWFkRGF0YShyKSx0aGlzLmV4dHJhRmllbGRzW3RdPXtpZDp0LGxlbmd0aDpyLHZhbHVlOm59O2Uuc2V0SW5kZXgoaSl9LGhhbmRsZVVURjg6ZnVuY3Rpb24oKXt2YXIgZT1oLnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiO2lmKHRoaXMudXNlVVRGOCgpKXRoaXMuZmlsZU5hbWVTdHI9by51dGY4ZGVjb2RlKHRoaXMuZmlsZU5hbWUpLHRoaXMuZmlsZUNvbW1lbnRTdHI9by51dGY4ZGVjb2RlKHRoaXMuZmlsZUNvbW1lbnQpO2Vsc2V7dmFyIHQ9dGhpcy5maW5kRXh0cmFGaWVsZFVuaWNvZGVQYXRoKCk7aWYobnVsbCE9PXQpdGhpcy5maWxlTmFtZVN0cj10O2Vsc2V7dmFyIHI9cy50cmFuc2Zvcm1UbyhlLHRoaXMuZmlsZU5hbWUpO3RoaXMuZmlsZU5hbWVTdHI9dGhpcy5sb2FkT3B0aW9ucy5kZWNvZGVGaWxlTmFtZShyKX12YXIgbj10aGlzLmZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQoKTtpZihudWxsIT09bil0aGlzLmZpbGVDb21tZW50U3RyPW47ZWxzZXt2YXIgaT1zLnRyYW5zZm9ybVRvKGUsdGhpcy5maWxlQ29tbWVudCk7dGhpcy5maWxlQ29tbWVudFN0cj10aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKGkpfX19LGZpbmRFeHRyYUZpZWxkVW5pY29kZVBhdGg6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmV4dHJhRmllbGRzWzI4Nzg5XTtpZihlKXt2YXIgdD1uKGUudmFsdWUpO3JldHVybiAxIT09dC5yZWFkSW50KDEpP251bGw6YSh0aGlzLmZpbGVOYW1lKSE9PXQucmVhZEludCg0KT9udWxsOm8udXRmOGRlY29kZSh0LnJlYWREYXRhKGUubGVuZ3RoLTUpKX1yZXR1cm4gbnVsbH0sZmluZEV4dHJhRmllbGRVbmljb2RlQ29tbWVudDpmdW5jdGlvbigpe3ZhciBlPXRoaXMuZXh0cmFGaWVsZHNbMjU0NjFdO2lmKGUpe3ZhciB0PW4oZS52YWx1ZSk7cmV0dXJuIDEhPT10LnJlYWRJbnQoMSk/bnVsbDphKHRoaXMuZmlsZUNvbW1lbnQpIT09dC5yZWFkSW50KDQpP251bGw6by51dGY4ZGVjb2RlKHQucmVhZERhdGEoZS5sZW5ndGgtNSkpfXJldHVybiBudWxsfX0sdC5leHBvcnRzPWZ9LHtcIi4vY29tcHJlc3NlZE9iamVjdFwiOjIsXCIuL2NvbXByZXNzaW9uc1wiOjMsXCIuL2NyYzMyXCI6NCxcIi4vcmVhZGVyL3JlYWRlckZvclwiOjIyLFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMn1dLDM1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbihlLHQscil7dGhpcy5uYW1lPWUsdGhpcy5kaXI9ci5kaXIsdGhpcy5kYXRlPXIuZGF0ZSx0aGlzLmNvbW1lbnQ9ci5jb21tZW50LHRoaXMudW5peFBlcm1pc3Npb25zPXIudW5peFBlcm1pc3Npb25zLHRoaXMuZG9zUGVybWlzc2lvbnM9ci5kb3NQZXJtaXNzaW9ucyx0aGlzLl9kYXRhPXQsdGhpcy5fZGF0YUJpbmFyeT1yLmJpbmFyeSx0aGlzLm9wdGlvbnM9e2NvbXByZXNzaW9uOnIuY29tcHJlc3Npb24sY29tcHJlc3Npb25PcHRpb25zOnIuY29tcHJlc3Npb25PcHRpb25zfX12YXIgcz1lKFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCIpLGk9ZShcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIiksYT1lKFwiLi91dGY4XCIpLG89ZShcIi4vY29tcHJlc3NlZE9iamVjdFwiKSx1PWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpO24ucHJvdG90eXBlPXtpbnRlcm5hbFN0cmVhbTpmdW5jdGlvbihlKXt2YXIgdD1udWxsLHI9XCJzdHJpbmdcIjt0cnl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLlwiKTt2YXIgbj1cInN0cmluZ1wiPT09KHI9ZS50b0xvd2VyQ2FzZSgpKXx8XCJ0ZXh0XCI9PT1yO1wiYmluYXJ5c3RyaW5nXCIhPT1yJiZcInRleHRcIiE9PXJ8fChyPVwic3RyaW5nXCIpLHQ9dGhpcy5fZGVjb21wcmVzc1dvcmtlcigpO3ZhciBpPSF0aGlzLl9kYXRhQmluYXJ5O2kmJiFuJiYodD10LnBpcGUobmV3IGEuVXRmOEVuY29kZVdvcmtlcikpLCFpJiZuJiYodD10LnBpcGUobmV3IGEuVXRmOERlY29kZVdvcmtlcikpfWNhdGNoKGUpeyh0PW5ldyB1KFwiZXJyb3JcIikpLmVycm9yKGUpfXJldHVybiBuZXcgcyh0LHIsXCJcIil9LGFzeW5jOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuaW50ZXJuYWxTdHJlYW0oZSkuYWNjdW11bGF0ZSh0KX0sbm9kZVN0cmVhbTpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmludGVybmFsU3RyZWFtKGV8fFwibm9kZWJ1ZmZlclwiKS50b05vZGVqc1N0cmVhbSh0KX0sX2NvbXByZXNzV29ya2VyOmZ1bmN0aW9uKGUsdCl7aWYodGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8mJnRoaXMuX2RhdGEuY29tcHJlc3Npb24ubWFnaWM9PT1lLm1hZ2ljKXJldHVybiB0aGlzLl9kYXRhLmdldENvbXByZXNzZWRXb3JrZXIoKTt2YXIgcj10aGlzLl9kZWNvbXByZXNzV29ya2VyKCk7cmV0dXJuIHRoaXMuX2RhdGFCaW5hcnl8fChyPXIucGlwZShuZXcgYS5VdGY4RW5jb2RlV29ya2VyKSksby5jcmVhdGVXb3JrZXJGcm9tKHIsZSx0KX0sX2RlY29tcHJlc3NXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8/dGhpcy5fZGF0YS5nZXRDb250ZW50V29ya2VyKCk6dGhpcy5fZGF0YSBpbnN0YW5jZW9mIHU/dGhpcy5fZGF0YTpuZXcgaSh0aGlzLl9kYXRhKX19O2Zvcih2YXIgaD1bXCJhc1RleHRcIixcImFzQmluYXJ5XCIsXCJhc05vZGVCdWZmZXJcIixcImFzVWludDhBcnJheVwiLFwiYXNBcnJheUJ1ZmZlclwiXSxmPWZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIil9LGw9MDtsPGgubGVuZ3RoO2wrKyluLnByb3RvdHlwZVtoW2xdXT1mO3QuZXhwb3J0cz1ufSx7XCIuL2NvbXByZXNzZWRPYmplY3RcIjoyLFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiOjI3LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCI6MjksXCIuL3V0ZjhcIjozMX1dLDM2OltmdW5jdGlvbihlLGYsdCl7KGZ1bmN0aW9uKHQpe1widXNlIHN0cmljdFwiO3ZhciByLG4sZT10Lk11dGF0aW9uT2JzZXJ2ZXJ8fHQuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtpZihlKXt2YXIgaT0wLHM9bmV3IGUoaCksYT10LmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO3Mub2JzZXJ2ZShhLHtjaGFyYWN0ZXJEYXRhOiEwfSkscj1mdW5jdGlvbigpe2EuZGF0YT1pPSsraSUyfX1lbHNlIGlmKHQuc2V0SW1tZWRpYXRlfHx2b2lkIDA9PT10Lk1lc3NhZ2VDaGFubmVsKXI9XCJkb2N1bWVudFwiaW4gdCYmXCJvbnJlYWR5c3RhdGVjaGFuZ2VcImluIHQuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKT9mdW5jdGlvbigpe3ZhciBlPXQuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtlLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2goKSxlLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKSxlPW51bGx9LHQuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGUpfTpmdW5jdGlvbigpe3NldFRpbWVvdXQoaCwwKX07ZWxzZXt2YXIgbz1uZXcgdC5NZXNzYWdlQ2hhbm5lbDtvLnBvcnQxLm9ubWVzc2FnZT1oLHI9ZnVuY3Rpb24oKXtvLnBvcnQyLnBvc3RNZXNzYWdlKDApfX12YXIgdT1bXTtmdW5jdGlvbiBoKCl7dmFyIGUsdDtuPSEwO2Zvcih2YXIgcj11Lmxlbmd0aDtyOyl7Zm9yKHQ9dSx1PVtdLGU9LTE7KytlPHI7KXRbZV0oKTtyPXUubGVuZ3RofW49ITF9Zi5leHBvcnRzPWZ1bmN0aW9uKGUpezEhPT11LnB1c2goZSl8fG58fHIoKX19KS5jYWxsKHRoaXMsdm9pZCAwIT09cj9yOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30pfSx7fV0sMzc6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1lKFwiaW1tZWRpYXRlXCIpO2Z1bmN0aW9uIGgoKXt9dmFyIGY9e30scz1bXCJSRUpFQ1RFRFwiXSxhPVtcIkZVTEZJTExFRFwiXSxuPVtcIlBFTkRJTkdcIl07ZnVuY3Rpb24gbyhlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBUeXBlRXJyb3IoXCJyZXNvbHZlciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7dGhpcy5zdGF0ZT1uLHRoaXMucXVldWU9W10sdGhpcy5vdXRjb21lPXZvaWQgMCxlIT09aCYmYyh0aGlzLGUpfWZ1bmN0aW9uIHUoZSx0LHIpe3RoaXMucHJvbWlzZT1lLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJih0aGlzLm9uRnVsZmlsbGVkPXQsdGhpcy5jYWxsRnVsZmlsbGVkPXRoaXMub3RoZXJDYWxsRnVsZmlsbGVkKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiYodGhpcy5vblJlamVjdGVkPXIsdGhpcy5jYWxsUmVqZWN0ZWQ9dGhpcy5vdGhlckNhbGxSZWplY3RlZCl9ZnVuY3Rpb24gbCh0LHIsbil7aShmdW5jdGlvbigpe3ZhciBlO3RyeXtlPXIobil9Y2F0Y2goZSl7cmV0dXJuIGYucmVqZWN0KHQsZSl9ZT09PXQ/Zi5yZWplY3QodCxuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlc29sdmUgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKSk6Zi5yZXNvbHZlKHQsZSl9KX1mdW5jdGlvbiBkKGUpe3ZhciB0PWUmJmUudGhlbjtpZihlJiYoXCJvYmplY3RcIj09dHlwZW9mIGV8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGUpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXJldHVybiBmdW5jdGlvbigpe3QuYXBwbHkoZSxhcmd1bWVudHMpfX1mdW5jdGlvbiBjKHQsZSl7dmFyIHI9ITE7ZnVuY3Rpb24gbihlKXtyfHwocj0hMCxmLnJlamVjdCh0LGUpKX1mdW5jdGlvbiBpKGUpe3J8fChyPSEwLGYucmVzb2x2ZSh0LGUpKX12YXIgcz1wKGZ1bmN0aW9uKCl7ZShpLG4pfSk7XCJlcnJvclwiPT09cy5zdGF0dXMmJm4ocy52YWx1ZSl9ZnVuY3Rpb24gcChlLHQpe3ZhciByPXt9O3RyeXtyLnZhbHVlPWUodCksci5zdGF0dXM9XCJzdWNjZXNzXCJ9Y2F0Y2goZSl7ci5zdGF0dXM9XCJlcnJvclwiLHIudmFsdWU9ZX1yZXR1cm4gcn0odC5leHBvcnRzPW8pLnByb3RvdHlwZS5maW5hbGx5PWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJuIHRoaXM7dmFyIHI9dGhpcy5jb25zdHJ1Y3RvcjtyZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUodCgpKS50aGVuKGZ1bmN0aW9uKCl7cmV0dXJuIGV9KX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZSh0KCkpLnRoZW4oZnVuY3Rpb24oKXt0aHJvdyBlfSl9KX0sby5wcm90b3R5cGUuY2F0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMudGhlbihudWxsLGUpfSxvLnByb3RvdHlwZS50aGVuPWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmdGhpcy5zdGF0ZT09PWF8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQmJnRoaXMuc3RhdGU9PT1zKXJldHVybiB0aGlzO3ZhciByPW5ldyB0aGlzLmNvbnN0cnVjdG9yKGgpO3JldHVybiB0aGlzLnN0YXRlIT09bj9sKHIsdGhpcy5zdGF0ZT09PWE/ZTp0LHRoaXMub3V0Y29tZSk6dGhpcy5xdWV1ZS5wdXNoKG5ldyB1KHIsZSx0KSkscn0sdS5wcm90b3R5cGUuY2FsbEZ1bGZpbGxlZD1mdW5jdGlvbihlKXtmLnJlc29sdmUodGhpcy5wcm9taXNlLGUpfSx1LnByb3RvdHlwZS5vdGhlckNhbGxGdWxmaWxsZWQ9ZnVuY3Rpb24oZSl7bCh0aGlzLnByb21pc2UsdGhpcy5vbkZ1bGZpbGxlZCxlKX0sdS5wcm90b3R5cGUuY2FsbFJlamVjdGVkPWZ1bmN0aW9uKGUpe2YucmVqZWN0KHRoaXMucHJvbWlzZSxlKX0sdS5wcm90b3R5cGUub3RoZXJDYWxsUmVqZWN0ZWQ9ZnVuY3Rpb24oZSl7bCh0aGlzLnByb21pc2UsdGhpcy5vblJlamVjdGVkLGUpfSxmLnJlc29sdmU9ZnVuY3Rpb24oZSx0KXt2YXIgcj1wKGQsdCk7aWYoXCJlcnJvclwiPT09ci5zdGF0dXMpcmV0dXJuIGYucmVqZWN0KGUsci52YWx1ZSk7dmFyIG49ci52YWx1ZTtpZihuKWMoZSxuKTtlbHNle2Uuc3RhdGU9YSxlLm91dGNvbWU9dDtmb3IodmFyIGk9LTEscz1lLnF1ZXVlLmxlbmd0aDsrK2k8czspZS5xdWV1ZVtpXS5jYWxsRnVsZmlsbGVkKHQpfXJldHVybiBlfSxmLnJlamVjdD1mdW5jdGlvbihlLHQpe2Uuc3RhdGU9cyxlLm91dGNvbWU9dDtmb3IodmFyIHI9LTEsbj1lLnF1ZXVlLmxlbmd0aDsrK3I8bjspZS5xdWV1ZVtyXS5jYWxsUmVqZWN0ZWQodCk7cmV0dXJuIGV9LG8ucmVzb2x2ZT1mdW5jdGlvbihlKXtyZXR1cm4gZSBpbnN0YW5jZW9mIHRoaXM/ZTpmLnJlc29sdmUobmV3IHRoaXMoaCksZSl9LG8ucmVqZWN0PWZ1bmN0aW9uKGUpe3ZhciB0PW5ldyB0aGlzKGgpO3JldHVybiBmLnJlamVjdCh0LGUpfSxvLmFsbD1mdW5jdGlvbihlKXt2YXIgcj10aGlzO2lmKFwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSlyZXR1cm4gdGhpcy5yZWplY3QobmV3IFR5cGVFcnJvcihcIm11c3QgYmUgYW4gYXJyYXlcIikpO3ZhciBuPWUubGVuZ3RoLGk9ITE7aWYoIW4pcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7Zm9yKHZhciBzPW5ldyBBcnJheShuKSxhPTAsdD0tMSxvPW5ldyB0aGlzKGgpOysrdDxuOyl1KGVbdF0sdCk7cmV0dXJuIG87ZnVuY3Rpb24gdShlLHQpe3IucmVzb2x2ZShlKS50aGVuKGZ1bmN0aW9uKGUpe3NbdF09ZSwrK2EhPT1ufHxpfHwoaT0hMCxmLnJlc29sdmUobyxzKSl9LGZ1bmN0aW9uKGUpe2l8fChpPSEwLGYucmVqZWN0KG8sZSkpfSl9fSxvLnJhY2U9ZnVuY3Rpb24oZSl7aWYoXCJbb2JqZWN0IEFycmF5XVwiIT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKXJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKFwibXVzdCBiZSBhbiBhcnJheVwiKSk7dmFyIHQ9ZS5sZW5ndGgscj0hMTtpZighdClyZXR1cm4gdGhpcy5yZXNvbHZlKFtdKTtmb3IodmFyIG4saT0tMSxzPW5ldyB0aGlzKGgpOysraTx0OyluPWVbaV0sdGhpcy5yZXNvbHZlKG4pLnRoZW4oZnVuY3Rpb24oZSl7cnx8KHI9ITAsZi5yZXNvbHZlKHMsZSkpfSxmdW5jdGlvbihlKXtyfHwocj0hMCxmLnJlamVjdChzLGUpKX0pO3JldHVybiBzfX0se2ltbWVkaWF0ZTozNn1dLDM4OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49e307KDAsZShcIi4vbGliL3V0aWxzL2NvbW1vblwiKS5hc3NpZ24pKG4sZShcIi4vbGliL2RlZmxhdGVcIiksZShcIi4vbGliL2luZmxhdGVcIiksZShcIi4vbGliL3psaWIvY29uc3RhbnRzXCIpKSx0LmV4cG9ydHM9bn0se1wiLi9saWIvZGVmbGF0ZVwiOjM5LFwiLi9saWIvaW5mbGF0ZVwiOjQwLFwiLi9saWIvdXRpbHMvY29tbW9uXCI6NDEsXCIuL2xpYi96bGliL2NvbnN0YW50c1wiOjQ0fV0sMzk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgYT1lKFwiLi96bGliL2RlZmxhdGVcIiksbz1lKFwiLi91dGlscy9jb21tb25cIiksdT1lKFwiLi91dGlscy9zdHJpbmdzXCIpLGk9ZShcIi4vemxpYi9tZXNzYWdlc1wiKSxzPWUoXCIuL3psaWIvenN0cmVhbVwiKSxoPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsZj0wLGw9LTEsZD0wLGM9ODtmdW5jdGlvbiBwKGUpe2lmKCEodGhpcyBpbnN0YW5jZW9mIHApKXJldHVybiBuZXcgcChlKTt0aGlzLm9wdGlvbnM9by5hc3NpZ24oe2xldmVsOmwsbWV0aG9kOmMsY2h1bmtTaXplOjE2Mzg0LHdpbmRvd0JpdHM6MTUsbWVtTGV2ZWw6OCxzdHJhdGVneTpkLHRvOlwiXCJ9LGV8fHt9KTt2YXIgdD10aGlzLm9wdGlvbnM7dC5yYXcmJjA8dC53aW5kb3dCaXRzP3Qud2luZG93Qml0cz0tdC53aW5kb3dCaXRzOnQuZ3ppcCYmMDx0LndpbmRvd0JpdHMmJnQud2luZG93Qml0czwxNiYmKHQud2luZG93Qml0cys9MTYpLHRoaXMuZXJyPTAsdGhpcy5tc2c9XCJcIix0aGlzLmVuZGVkPSExLHRoaXMuY2h1bmtzPVtdLHRoaXMuc3RybT1uZXcgcyx0aGlzLnN0cm0uYXZhaWxfb3V0PTA7dmFyIHI9YS5kZWZsYXRlSW5pdDIodGhpcy5zdHJtLHQubGV2ZWwsdC5tZXRob2QsdC53aW5kb3dCaXRzLHQubWVtTGV2ZWwsdC5zdHJhdGVneSk7aWYociE9PWYpdGhyb3cgbmV3IEVycm9yKGlbcl0pO2lmKHQuaGVhZGVyJiZhLmRlZmxhdGVTZXRIZWFkZXIodGhpcy5zdHJtLHQuaGVhZGVyKSx0LmRpY3Rpb25hcnkpe3ZhciBuO2lmKG49XCJzdHJpbmdcIj09dHlwZW9mIHQuZGljdGlvbmFyeT91LnN0cmluZzJidWYodC5kaWN0aW9uYXJ5KTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT1oLmNhbGwodC5kaWN0aW9uYXJ5KT9uZXcgVWludDhBcnJheSh0LmRpY3Rpb25hcnkpOnQuZGljdGlvbmFyeSwocj1hLmRlZmxhdGVTZXREaWN0aW9uYXJ5KHRoaXMuc3RybSxuKSkhPT1mKXRocm93IG5ldyBFcnJvcihpW3JdKTt0aGlzLl9kaWN0X3NldD0hMH19ZnVuY3Rpb24gbihlLHQpe3ZhciByPW5ldyBwKHQpO2lmKHIucHVzaChlLCEwKSxyLmVycil0aHJvdyByLm1zZ3x8aVtyLmVycl07cmV0dXJuIHIucmVzdWx0fXAucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGk9dGhpcy5zdHJtLHM9dGhpcy5vcHRpb25zLmNodW5rU2l6ZTtpZih0aGlzLmVuZGVkKXJldHVybiExO249dD09PX5+dD90OiEwPT09dD80OjAsXCJzdHJpbmdcIj09dHlwZW9mIGU/aS5pbnB1dD11LnN0cmluZzJidWYoZSk6XCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiPT09aC5jYWxsKGUpP2kuaW5wdXQ9bmV3IFVpbnQ4QXJyYXkoZSk6aS5pbnB1dD1lLGkubmV4dF9pbj0wLGkuYXZhaWxfaW49aS5pbnB1dC5sZW5ndGg7ZG97aWYoMD09PWkuYXZhaWxfb3V0JiYoaS5vdXRwdXQ9bmV3IG8uQnVmOChzKSxpLm5leHRfb3V0PTAsaS5hdmFpbF9vdXQ9cyksMSE9PShyPWEuZGVmbGF0ZShpLG4pKSYmciE9PWYpcmV0dXJuIHRoaXMub25FbmQociksISh0aGlzLmVuZGVkPSEwKTswIT09aS5hdmFpbF9vdXQmJigwIT09aS5hdmFpbF9pbnx8NCE9PW4mJjIhPT1uKXx8KFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/dGhpcy5vbkRhdGEodS5idWYyYmluc3RyaW5nKG8uc2hyaW5rQnVmKGkub3V0cHV0LGkubmV4dF9vdXQpKSk6dGhpcy5vbkRhdGEoby5zaHJpbmtCdWYoaS5vdXRwdXQsaS5uZXh0X291dCkpKX13aGlsZSgoMDxpLmF2YWlsX2lufHwwPT09aS5hdmFpbF9vdXQpJiYxIT09cik7cmV0dXJuIDQ9PT1uPyhyPWEuZGVmbGF0ZUVuZCh0aGlzLnN0cm0pLHRoaXMub25FbmQociksdGhpcy5lbmRlZD0hMCxyPT09Zik6MiE9PW58fCh0aGlzLm9uRW5kKGYpLCEoaS5hdmFpbF9vdXQ9MCkpfSxwLnByb3RvdHlwZS5vbkRhdGE9ZnVuY3Rpb24oZSl7dGhpcy5jaHVua3MucHVzaChlKX0scC5wcm90b3R5cGUub25FbmQ9ZnVuY3Rpb24oZSl7ZT09PWYmJihcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvP3RoaXMucmVzdWx0PXRoaXMuY2h1bmtzLmpvaW4oXCJcIik6dGhpcy5yZXN1bHQ9by5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKSksdGhpcy5jaHVua3M9W10sdGhpcy5lcnI9ZSx0aGlzLm1zZz10aGlzLnN0cm0ubXNnfSxyLkRlZmxhdGU9cCxyLmRlZmxhdGU9bixyLmRlZmxhdGVSYXc9ZnVuY3Rpb24oZSx0KXtyZXR1cm4odD10fHx7fSkucmF3PSEwLG4oZSx0KX0sci5nemlwPWZ1bmN0aW9uKGUsdCl7cmV0dXJuKHQ9dHx8e30pLmd6aXA9ITAsbihlLHQpfX0se1wiLi91dGlscy9jb21tb25cIjo0MSxcIi4vdXRpbHMvc3RyaW5nc1wiOjQyLFwiLi96bGliL2RlZmxhdGVcIjo0NixcIi4vemxpYi9tZXNzYWdlc1wiOjUxLFwiLi96bGliL3pzdHJlYW1cIjo1M31dLDQwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGQ9ZShcIi4vemxpYi9pbmZsYXRlXCIpLGM9ZShcIi4vdXRpbHMvY29tbW9uXCIpLHA9ZShcIi4vdXRpbHMvc3RyaW5nc1wiKSxtPWUoXCIuL3psaWIvY29uc3RhbnRzXCIpLG49ZShcIi4vemxpYi9tZXNzYWdlc1wiKSxpPWUoXCIuL3psaWIvenN0cmVhbVwiKSxzPWUoXCIuL3psaWIvZ3poZWFkZXJcIiksXz1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO2Z1bmN0aW9uIGEoZSl7aWYoISh0aGlzIGluc3RhbmNlb2YgYSkpcmV0dXJuIG5ldyBhKGUpO3RoaXMub3B0aW9ucz1jLmFzc2lnbih7Y2h1bmtTaXplOjE2Mzg0LHdpbmRvd0JpdHM6MCx0bzpcIlwifSxlfHx7fSk7dmFyIHQ9dGhpcy5vcHRpb25zO3QucmF3JiYwPD10LndpbmRvd0JpdHMmJnQud2luZG93Qml0czwxNiYmKHQud2luZG93Qml0cz0tdC53aW5kb3dCaXRzLDA9PT10LndpbmRvd0JpdHMmJih0LndpbmRvd0JpdHM9LTE1KSksISgwPD10LndpbmRvd0JpdHMmJnQud2luZG93Qml0czwxNil8fGUmJmUud2luZG93Qml0c3x8KHQud2luZG93Qml0cys9MzIpLDE1PHQud2luZG93Qml0cyYmdC53aW5kb3dCaXRzPDQ4JiYwPT0oMTUmdC53aW5kb3dCaXRzKSYmKHQud2luZG93Qml0c3w9MTUpLHRoaXMuZXJyPTAsdGhpcy5tc2c9XCJcIix0aGlzLmVuZGVkPSExLHRoaXMuY2h1bmtzPVtdLHRoaXMuc3RybT1uZXcgaSx0aGlzLnN0cm0uYXZhaWxfb3V0PTA7dmFyIHI9ZC5pbmZsYXRlSW5pdDIodGhpcy5zdHJtLHQud2luZG93Qml0cyk7aWYociE9PW0uWl9PSyl0aHJvdyBuZXcgRXJyb3IobltyXSk7dGhpcy5oZWFkZXI9bmV3IHMsZC5pbmZsYXRlR2V0SGVhZGVyKHRoaXMuc3RybSx0aGlzLmhlYWRlcil9ZnVuY3Rpb24gbyhlLHQpe3ZhciByPW5ldyBhKHQpO2lmKHIucHVzaChlLCEwKSxyLmVycil0aHJvdyByLm1zZ3x8bltyLmVycl07cmV0dXJuIHIucmVzdWx0fWEucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8sdT10aGlzLnN0cm0saD10aGlzLm9wdGlvbnMuY2h1bmtTaXplLGY9dGhpcy5vcHRpb25zLmRpY3Rpb25hcnksbD0hMTtpZih0aGlzLmVuZGVkKXJldHVybiExO249dD09PX5+dD90OiEwPT09dD9tLlpfRklOSVNIOm0uWl9OT19GTFVTSCxcInN0cmluZ1wiPT10eXBlb2YgZT91LmlucHV0PXAuYmluc3RyaW5nMmJ1ZihlKTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT1fLmNhbGwoZSk/dS5pbnB1dD1uZXcgVWludDhBcnJheShlKTp1LmlucHV0PWUsdS5uZXh0X2luPTAsdS5hdmFpbF9pbj11LmlucHV0Lmxlbmd0aDtkb3tpZigwPT09dS5hdmFpbF9vdXQmJih1Lm91dHB1dD1uZXcgYy5CdWY4KGgpLHUubmV4dF9vdXQ9MCx1LmF2YWlsX291dD1oKSwocj1kLmluZmxhdGUodSxtLlpfTk9fRkxVU0gpKT09PW0uWl9ORUVEX0RJQ1QmJmYmJihvPVwic3RyaW5nXCI9PXR5cGVvZiBmP3Auc3RyaW5nMmJ1ZihmKTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT1fLmNhbGwoZik/bmV3IFVpbnQ4QXJyYXkoZik6ZixyPWQuaW5mbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLG8pKSxyPT09bS5aX0JVRl9FUlJPUiYmITA9PT1sJiYocj1tLlpfT0ssbD0hMSksciE9PW0uWl9TVFJFQU1fRU5EJiZyIT09bS5aX09LKXJldHVybiB0aGlzLm9uRW5kKHIpLCEodGhpcy5lbmRlZD0hMCk7dS5uZXh0X291dCYmKDAhPT11LmF2YWlsX291dCYmciE9PW0uWl9TVFJFQU1fRU5EJiYoMCE9PXUuYXZhaWxfaW58fG4hPT1tLlpfRklOSVNIJiZuIT09bS5aX1NZTkNfRkxVU0gpfHwoXCJzdHJpbmdcIj09PXRoaXMub3B0aW9ucy50bz8oaT1wLnV0Zjhib3JkZXIodS5vdXRwdXQsdS5uZXh0X291dCkscz11Lm5leHRfb3V0LWksYT1wLmJ1ZjJzdHJpbmcodS5vdXRwdXQsaSksdS5uZXh0X291dD1zLHUuYXZhaWxfb3V0PWgtcyxzJiZjLmFycmF5U2V0KHUub3V0cHV0LHUub3V0cHV0LGkscywwKSx0aGlzLm9uRGF0YShhKSk6dGhpcy5vbkRhdGEoYy5zaHJpbmtCdWYodS5vdXRwdXQsdS5uZXh0X291dCkpKSksMD09PXUuYXZhaWxfaW4mJjA9PT11LmF2YWlsX291dCYmKGw9ITApfXdoaWxlKCgwPHUuYXZhaWxfaW58fDA9PT11LmF2YWlsX291dCkmJnIhPT1tLlpfU1RSRUFNX0VORCk7cmV0dXJuIHI9PT1tLlpfU1RSRUFNX0VORCYmKG49bS5aX0ZJTklTSCksbj09PW0uWl9GSU5JU0g/KHI9ZC5pbmZsYXRlRW5kKHRoaXMuc3RybSksdGhpcy5vbkVuZChyKSx0aGlzLmVuZGVkPSEwLHI9PT1tLlpfT0spOm4hPT1tLlpfU1lOQ19GTFVTSHx8KHRoaXMub25FbmQobS5aX09LKSwhKHUuYXZhaWxfb3V0PTApKX0sYS5wcm90b3R5cGUub25EYXRhPWZ1bmN0aW9uKGUpe3RoaXMuY2h1bmtzLnB1c2goZSl9LGEucHJvdG90eXBlLm9uRW5kPWZ1bmN0aW9uKGUpe2U9PT1tLlpfT0smJihcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvP3RoaXMucmVzdWx0PXRoaXMuY2h1bmtzLmpvaW4oXCJcIik6dGhpcy5yZXN1bHQ9Yy5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKSksdGhpcy5jaHVua3M9W10sdGhpcy5lcnI9ZSx0aGlzLm1zZz10aGlzLnN0cm0ubXNnfSxyLkluZmxhdGU9YSxyLmluZmxhdGU9byxyLmluZmxhdGVSYXc9ZnVuY3Rpb24oZSx0KXtyZXR1cm4odD10fHx7fSkucmF3PSEwLG8oZSx0KX0sci51bmd6aXA9b30se1wiLi91dGlscy9jb21tb25cIjo0MSxcIi4vdXRpbHMvc3RyaW5nc1wiOjQyLFwiLi96bGliL2NvbnN0YW50c1wiOjQ0LFwiLi96bGliL2d6aGVhZGVyXCI6NDcsXCIuL3psaWIvaW5mbGF0ZVwiOjQ5LFwiLi96bGliL21lc3NhZ2VzXCI6NTEsXCIuL3psaWIvenN0cmVhbVwiOjUzfV0sNDE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQxNkFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgSW50MzJBcnJheTtyLmFzc2lnbj1mdW5jdGlvbihlKXtmb3IodmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO3QubGVuZ3RoOyl7dmFyIHI9dC5zaGlmdCgpO2lmKHIpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiByKXRocm93IG5ldyBUeXBlRXJyb3IocitcIm11c3QgYmUgbm9uLW9iamVjdFwiKTtmb3IodmFyIG4gaW4gcilyLmhhc093blByb3BlcnR5KG4pJiYoZVtuXT1yW25dKX19cmV0dXJuIGV9LHIuc2hyaW5rQnVmPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUubGVuZ3RoPT09dD9lOmUuc3ViYXJyYXk/ZS5zdWJhcnJheSgwLHQpOihlLmxlbmd0aD10LGUpfTt2YXIgaT17YXJyYXlTZXQ6ZnVuY3Rpb24oZSx0LHIsbixpKXtpZih0LnN1YmFycmF5JiZlLnN1YmFycmF5KWUuc2V0KHQuc3ViYXJyYXkocixyK24pLGkpO2Vsc2UgZm9yKHZhciBzPTA7czxuO3MrKyllW2krc109dFtyK3NdfSxmbGF0dGVuQ2h1bmtzOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYTtmb3IodD1uPTAscj1lLmxlbmd0aDt0PHI7dCsrKW4rPWVbdF0ubGVuZ3RoO2ZvcihhPW5ldyBVaW50OEFycmF5KG4pLHQ9aT0wLHI9ZS5sZW5ndGg7dDxyO3QrKylzPWVbdF0sYS5zZXQocyxpKSxpKz1zLmxlbmd0aDtyZXR1cm4gYX19LHM9e2FycmF5U2V0OmZ1bmN0aW9uKGUsdCxyLG4saSl7Zm9yKHZhciBzPTA7czxuO3MrKyllW2krc109dFtyK3NdfSxmbGF0dGVuQ2h1bmtzOmZ1bmN0aW9uKGUpe3JldHVybltdLmNvbmNhdC5hcHBseShbXSxlKX19O3Iuc2V0VHlwZWQ9ZnVuY3Rpb24oZSl7ZT8oci5CdWY4PVVpbnQ4QXJyYXksci5CdWYxNj1VaW50MTZBcnJheSxyLkJ1ZjMyPUludDMyQXJyYXksci5hc3NpZ24ocixpKSk6KHIuQnVmOD1BcnJheSxyLkJ1ZjE2PUFycmF5LHIuQnVmMzI9QXJyYXksci5hc3NpZ24ocixzKSl9LHIuc2V0VHlwZWQobil9LHt9XSw0MjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciB1PWUoXCIuL2NvbW1vblwiKSxpPSEwLHM9ITA7dHJ5e1N0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxbMF0pfWNhdGNoKGUpe2k9ITF9dHJ5e1N0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxuZXcgVWludDhBcnJheSgxKSl9Y2F0Y2goZSl7cz0hMX1mb3IodmFyIGg9bmV3IHUuQnVmOCgyNTYpLG49MDtuPDI1NjtuKyspaFtuXT0yNTI8PW4/NjoyNDg8PW4/NToyNDA8PW4/NDoyMjQ8PW4/MzoxOTI8PW4/MjoxO2Z1bmN0aW9uIGYoZSx0KXtpZih0PDY1NTM3JiYoZS5zdWJhcnJheSYmc3x8IWUuc3ViYXJyYXkmJmkpKXJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsdS5zaHJpbmtCdWYoZSx0KSk7Zm9yKHZhciByPVwiXCIsbj0wO248dDtuKyspcis9U3RyaW5nLmZyb21DaGFyQ29kZShlW25dKTtyZXR1cm4gcn1oWzI1NF09aFsyNTRdPTEsci5zdHJpbmcyYnVmPWZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYT1lLmxlbmd0aCxvPTA7Zm9yKGk9MDtpPGE7aSsrKTU1Mjk2PT0oNjQ1MTImKHI9ZS5jaGFyQ29kZUF0KGkpKSkmJmkrMTxhJiY1NjMyMD09KDY0NTEyJihuPWUuY2hhckNvZGVBdChpKzEpKSkmJihyPTY1NTM2KyhyLTU1Mjk2PDwxMCkrKG4tNTYzMjApLGkrKyksbys9cjwxMjg/MTpyPDIwNDg/MjpyPDY1NTM2PzM6NDtmb3IodD1uZXcgdS5CdWY4KG8pLGk9cz0wO3M8bztpKyspNTUyOTY9PSg2NDUxMiYocj1lLmNoYXJDb2RlQXQoaSkpKSYmaSsxPGEmJjU2MzIwPT0oNjQ1MTImKG49ZS5jaGFyQ29kZUF0KGkrMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsobi01NjMyMCksaSsrKSxyPDEyOD90W3MrK109cjoocjwyMDQ4P3RbcysrXT0xOTJ8cj4+PjY6KHI8NjU1MzY/dFtzKytdPTIyNHxyPj4+MTI6KHRbcysrXT0yNDB8cj4+PjE4LHRbcysrXT0xMjh8cj4+PjEyJjYzKSx0W3MrK109MTI4fHI+Pj42JjYzKSx0W3MrK109MTI4fDYzJnIpO3JldHVybiB0fSxyLmJ1ZjJiaW5zdHJpbmc9ZnVuY3Rpb24oZSl7cmV0dXJuIGYoZSxlLmxlbmd0aCl9LHIuYmluc3RyaW5nMmJ1Zj1mdW5jdGlvbihlKXtmb3IodmFyIHQ9bmV3IHUuQnVmOChlLmxlbmd0aCkscj0wLG49dC5sZW5ndGg7cjxuO3IrKyl0W3JdPWUuY2hhckNvZGVBdChyKTtyZXR1cm4gdH0sci5idWYyc3RyaW5nPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYT10fHxlLmxlbmd0aCxvPW5ldyBBcnJheSgyKmEpO2ZvcihyPW49MDtyPGE7KWlmKChpPWVbcisrXSk8MTI4KW9bbisrXT1pO2Vsc2UgaWYoNDwocz1oW2ldKSlvW24rK109NjU1MzMscis9cy0xO2Vsc2V7Zm9yKGkmPTI9PT1zPzMxOjM9PT1zPzE1Ojc7MTxzJiZyPGE7KWk9aTw8Nnw2MyZlW3IrK10scy0tOzE8cz9vW24rK109NjU1MzM6aTw2NTUzNj9vW24rK109aTooaS09NjU1MzYsb1tuKytdPTU1Mjk2fGk+PjEwJjEwMjMsb1tuKytdPTU2MzIwfDEwMjMmaSl9cmV0dXJuIGYobyxuKX0sci51dGY4Ym9yZGVyPWZ1bmN0aW9uKGUsdCl7dmFyIHI7Zm9yKCh0PXR8fGUubGVuZ3RoKT5lLmxlbmd0aCYmKHQ9ZS5sZW5ndGgpLHI9dC0xOzA8PXImJjEyOD09KDE5MiZlW3JdKTspci0tO3JldHVybiByPDA/dDowPT09cj90OnIraFtlW3JdXT50P3I6dH19LHtcIi4vY29tbW9uXCI6NDF9XSw0MzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQscixuKXtmb3IodmFyIGk9NjU1MzUmZXwwLHM9ZT4+PjE2JjY1NTM1fDAsYT0wOzAhPT1yOyl7Zm9yKHItPWE9MmUzPHI/MmUzOnI7cz1zKyhpPWkrdFtuKytdfDApfDAsLS1hOyk7aSU9NjU1MjEscyU9NjU1MjF9cmV0dXJuIGl8czw8MTZ8MH19LHt9XSw0NDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz17Wl9OT19GTFVTSDowLFpfUEFSVElBTF9GTFVTSDoxLFpfU1lOQ19GTFVTSDoyLFpfRlVMTF9GTFVTSDozLFpfRklOSVNIOjQsWl9CTE9DSzo1LFpfVFJFRVM6NixaX09LOjAsWl9TVFJFQU1fRU5EOjEsWl9ORUVEX0RJQ1Q6MixaX0VSUk5POi0xLFpfU1RSRUFNX0VSUk9SOi0yLFpfREFUQV9FUlJPUjotMyxaX0JVRl9FUlJPUjotNSxaX05PX0NPTVBSRVNTSU9OOjAsWl9CRVNUX1NQRUVEOjEsWl9CRVNUX0NPTVBSRVNTSU9OOjksWl9ERUZBVUxUX0NPTVBSRVNTSU9OOi0xLFpfRklMVEVSRUQ6MSxaX0hVRkZNQU5fT05MWToyLFpfUkxFOjMsWl9GSVhFRDo0LFpfREVGQVVMVF9TVFJBVEVHWTowLFpfQklOQVJZOjAsWl9URVhUOjEsWl9VTktOT1dOOjIsWl9ERUZMQVRFRDo4fX0se31dLDQ1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89ZnVuY3Rpb24oKXtmb3IodmFyIGUsdD1bXSxyPTA7cjwyNTY7cisrKXtlPXI7Zm9yKHZhciBuPTA7bjw4O24rKyllPTEmZT8zOTg4MjkyMzg0XmU+Pj4xOmU+Pj4xO3Rbcl09ZX1yZXR1cm4gdH0oKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk9byxzPW4rcjtlXj0tMTtmb3IodmFyIGE9bjthPHM7YSsrKWU9ZT4+PjheaVsyNTUmKGVedFthXSldO3JldHVybi0xXmV9fSx7fV0sNDY6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgdSxkPWUoXCIuLi91dGlscy9jb21tb25cIiksaD1lKFwiLi90cmVlc1wiKSxjPWUoXCIuL2FkbGVyMzJcIikscD1lKFwiLi9jcmMzMlwiKSxuPWUoXCIuL21lc3NhZ2VzXCIpLGY9MCxsPTAsbT0tMixpPTIsXz04LHM9Mjg2LGE9MzAsbz0xOSxnPTIqcysxLHY9MTUsYj0zLHc9MjU4LHk9dytiKzEsaz00Mix4PTExMztmdW5jdGlvbiBTKGUsdCl7cmV0dXJuIGUubXNnPW5bdF0sdH1mdW5jdGlvbiB6KGUpe3JldHVybihlPDwxKS0oNDxlPzk6MCl9ZnVuY3Rpb24gRShlKXtmb3IodmFyIHQ9ZS5sZW5ndGg7MDw9LS10OyllW3RdPTB9ZnVuY3Rpb24gQyhlKXt2YXIgdD1lLnN0YXRlLHI9dC5wZW5kaW5nO3I+ZS5hdmFpbF9vdXQmJihyPWUuYXZhaWxfb3V0KSwwIT09ciYmKGQuYXJyYXlTZXQoZS5vdXRwdXQsdC5wZW5kaW5nX2J1Zix0LnBlbmRpbmdfb3V0LHIsZS5uZXh0X291dCksZS5uZXh0X291dCs9cix0LnBlbmRpbmdfb3V0Kz1yLGUudG90YWxfb3V0Kz1yLGUuYXZhaWxfb3V0LT1yLHQucGVuZGluZy09ciwwPT09dC5wZW5kaW5nJiYodC5wZW5kaW5nX291dD0wKSl9ZnVuY3Rpb24gQShlLHQpe2guX3RyX2ZsdXNoX2Jsb2NrKGUsMDw9ZS5ibG9ja19zdGFydD9lLmJsb2NrX3N0YXJ0Oi0xLGUuc3Ryc3RhcnQtZS5ibG9ja19zdGFydCx0KSxlLmJsb2NrX3N0YXJ0PWUuc3Ryc3RhcnQsQyhlLnN0cm0pfWZ1bmN0aW9uIEkoZSx0KXtlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT10fWZ1bmN0aW9uIE8oZSx0KXtlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT10Pj4+OCYyNTUsZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109MjU1JnR9ZnVuY3Rpb24gQihlLHQpe3ZhciByLG4saT1lLm1heF9jaGFpbl9sZW5ndGgscz1lLnN0cnN0YXJ0LGE9ZS5wcmV2X2xlbmd0aCxvPWUubmljZV9tYXRjaCx1PWUuc3Ryc3RhcnQ+ZS53X3NpemUteT9lLnN0cnN0YXJ0LShlLndfc2l6ZS15KTowLGg9ZS53aW5kb3csZj1lLndfbWFzayxsPWUucHJldixkPWUuc3Ryc3RhcnQrdyxjPWhbcythLTFdLHA9aFtzK2FdO2UucHJldl9sZW5ndGg+PWUuZ29vZF9tYXRjaCYmKGk+Pj0yKSxvPmUubG9va2FoZWFkJiYobz1lLmxvb2thaGVhZCk7ZG97aWYoaFsocj10KSthXT09PXAmJmhbcithLTFdPT09YyYmaFtyXT09PWhbc10mJmhbKytyXT09PWhbcysxXSl7cys9MixyKys7ZG97fXdoaWxlKGhbKytzXT09PWhbKytyXSYmaFsrK3NdPT09aFsrK3JdJiZoWysrc109PT1oWysrcl0mJmhbKytzXT09PWhbKytyXSYmaFsrK3NdPT09aFsrK3JdJiZoWysrc109PT1oWysrcl0mJmhbKytzXT09PWhbKytyXSYmaFsrK3NdPT09aFsrK3JdJiZzPGQpO2lmKG49dy0oZC1zKSxzPWQtdyxhPG4pe2lmKGUubWF0Y2hfc3RhcnQ9dCxvPD0oYT1uKSlicmVhaztjPWhbcythLTFdLHA9aFtzK2FdfX19d2hpbGUoKHQ9bFt0JmZdKT51JiYwIT0tLWkpO3JldHVybiBhPD1lLmxvb2thaGVhZD9hOmUubG9va2FoZWFkfWZ1bmN0aW9uIFQoZSl7dmFyIHQscixuLGkscyxhLG8sdSxoLGYsbD1lLndfc2l6ZTtkb3tpZihpPWUud2luZG93X3NpemUtZS5sb29rYWhlYWQtZS5zdHJzdGFydCxlLnN0cnN0YXJ0Pj1sKyhsLXkpKXtmb3IoZC5hcnJheVNldChlLndpbmRvdyxlLndpbmRvdyxsLGwsMCksZS5tYXRjaF9zdGFydC09bCxlLnN0cnN0YXJ0LT1sLGUuYmxvY2tfc3RhcnQtPWwsdD1yPWUuaGFzaF9zaXplO249ZS5oZWFkWy0tdF0sZS5oZWFkW3RdPWw8PW4/bi1sOjAsLS1yOyk7Zm9yKHQ9cj1sO249ZS5wcmV2Wy0tdF0sZS5wcmV2W3RdPWw8PW4/bi1sOjAsLS1yOyk7aSs9bH1pZigwPT09ZS5zdHJtLmF2YWlsX2luKWJyZWFrO2lmKGE9ZS5zdHJtLG89ZS53aW5kb3csdT1lLnN0cnN0YXJ0K2UubG9va2FoZWFkLGY9dm9pZCAwLChoPWkpPChmPWEuYXZhaWxfaW4pJiYoZj1oKSxyPTA9PT1mPzA6KGEuYXZhaWxfaW4tPWYsZC5hcnJheVNldChvLGEuaW5wdXQsYS5uZXh0X2luLGYsdSksMT09PWEuc3RhdGUud3JhcD9hLmFkbGVyPWMoYS5hZGxlcixvLGYsdSk6Mj09PWEuc3RhdGUud3JhcCYmKGEuYWRsZXI9cChhLmFkbGVyLG8sZix1KSksYS5uZXh0X2luKz1mLGEudG90YWxfaW4rPWYsZiksZS5sb29rYWhlYWQrPXIsZS5sb29rYWhlYWQrZS5pbnNlcnQ+PWIpZm9yKHM9ZS5zdHJzdGFydC1lLmluc2VydCxlLmluc19oPWUud2luZG93W3NdLGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tzKzFdKSZlLmhhc2hfbWFzaztlLmluc2VydCYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tzK2ItMV0pJmUuaGFzaF9tYXNrLGUucHJldltzJmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPXMscysrLGUuaW5zZXJ0LS0sIShlLmxvb2thaGVhZCtlLmluc2VydDxiKSk7KTt9d2hpbGUoZS5sb29rYWhlYWQ8eSYmMCE9PWUuc3RybS5hdmFpbF9pbil9ZnVuY3Rpb24gUihlLHQpe2Zvcih2YXIgcixuOzspe2lmKGUubG9va2FoZWFkPHkpe2lmKFQoZSksZS5sb29rYWhlYWQ8eSYmdD09PWYpcmV0dXJuIDE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWlmKHI9MCxlLmxvb2thaGVhZD49YiYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0K2ItMV0pJmUuaGFzaF9tYXNrLHI9ZS5wcmV2W2Uuc3Ryc3RhcnQmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09ZS5zdHJzdGFydCksMCE9PXImJmUuc3Ryc3RhcnQtcjw9ZS53X3NpemUteSYmKGUubWF0Y2hfbGVuZ3RoPUIoZSxyKSksZS5tYXRjaF9sZW5ndGg+PWIpaWYobj1oLl90cl90YWxseShlLGUuc3Ryc3RhcnQtZS5tYXRjaF9zdGFydCxlLm1hdGNoX2xlbmd0aC1iKSxlLmxvb2thaGVhZC09ZS5tYXRjaF9sZW5ndGgsZS5tYXRjaF9sZW5ndGg8PWUubWF4X2xhenlfbWF0Y2gmJmUubG9va2FoZWFkPj1iKXtmb3IoZS5tYXRjaF9sZW5ndGgtLTtlLnN0cnN0YXJ0KyssZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQrYi0xXSkmZS5oYXNoX21hc2sscj1lLnByZXZbZS5zdHJzdGFydCZlLndfbWFza109ZS5oZWFkW2UuaW5zX2hdLGUuaGVhZFtlLmluc19oXT1lLnN0cnN0YXJ0LDAhPS0tZS5tYXRjaF9sZW5ndGg7KTtlLnN0cnN0YXJ0Kyt9ZWxzZSBlLnN0cnN0YXJ0Kz1lLm1hdGNoX2xlbmd0aCxlLm1hdGNoX2xlbmd0aD0wLGUuaW5zX2g9ZS53aW5kb3dbZS5zdHJzdGFydF0sZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQrMV0pJmUuaGFzaF9tYXNrO2Vsc2Ugbj1oLl90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydF0pLGUubG9va2FoZWFkLS0sZS5zdHJzdGFydCsrO2lmKG4mJihBKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gMX1yZXR1cm4gZS5pbnNlcnQ9ZS5zdHJzdGFydDxiLTE/ZS5zdHJzdGFydDpiLTEsND09PXQ/KEEoZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/Mzo0KTplLmxhc3RfbGl0JiYoQShlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCk/MToyfWZ1bmN0aW9uIEQoZSx0KXtmb3IodmFyIHIsbixpOzspe2lmKGUubG9va2FoZWFkPHkpe2lmKFQoZSksZS5sb29rYWhlYWQ8eSYmdD09PWYpcmV0dXJuIDE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWlmKHI9MCxlLmxvb2thaGVhZD49YiYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0K2ItMV0pJmUuaGFzaF9tYXNrLHI9ZS5wcmV2W2Uuc3Ryc3RhcnQmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09ZS5zdHJzdGFydCksZS5wcmV2X2xlbmd0aD1lLm1hdGNoX2xlbmd0aCxlLnByZXZfbWF0Y2g9ZS5tYXRjaF9zdGFydCxlLm1hdGNoX2xlbmd0aD1iLTEsMCE9PXImJmUucHJldl9sZW5ndGg8ZS5tYXhfbGF6eV9tYXRjaCYmZS5zdHJzdGFydC1yPD1lLndfc2l6ZS15JiYoZS5tYXRjaF9sZW5ndGg9QihlLHIpLGUubWF0Y2hfbGVuZ3RoPD01JiYoMT09PWUuc3RyYXRlZ3l8fGUubWF0Y2hfbGVuZ3RoPT09YiYmNDA5NjxlLnN0cnN0YXJ0LWUubWF0Y2hfc3RhcnQpJiYoZS5tYXRjaF9sZW5ndGg9Yi0xKSksZS5wcmV2X2xlbmd0aD49YiYmZS5tYXRjaF9sZW5ndGg8PWUucHJldl9sZW5ndGgpe2ZvcihpPWUuc3Ryc3RhcnQrZS5sb29rYWhlYWQtYixuPWguX3RyX3RhbGx5KGUsZS5zdHJzdGFydC0xLWUucHJldl9tYXRjaCxlLnByZXZfbGVuZ3RoLWIpLGUubG9va2FoZWFkLT1lLnByZXZfbGVuZ3RoLTEsZS5wcmV2X2xlbmd0aC09MjsrK2Uuc3Ryc3RhcnQ8PWkmJihlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbZS5zdHJzdGFydCtiLTFdKSZlLmhhc2hfbWFzayxyPWUucHJldltlLnN0cnN0YXJ0JmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPWUuc3Ryc3RhcnQpLDAhPS0tZS5wcmV2X2xlbmd0aDspO2lmKGUubWF0Y2hfYXZhaWxhYmxlPTAsZS5tYXRjaF9sZW5ndGg9Yi0xLGUuc3Ryc3RhcnQrKyxuJiYoQShlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIDF9ZWxzZSBpZihlLm1hdGNoX2F2YWlsYWJsZSl7aWYoKG49aC5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnQtMV0pKSYmQShlLCExKSxlLnN0cnN0YXJ0KyssZS5sb29rYWhlYWQtLSwwPT09ZS5zdHJtLmF2YWlsX291dClyZXR1cm4gMX1lbHNlIGUubWF0Y2hfYXZhaWxhYmxlPTEsZS5zdHJzdGFydCsrLGUubG9va2FoZWFkLS19cmV0dXJuIGUubWF0Y2hfYXZhaWxhYmxlJiYobj1oLl90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydC0xXSksZS5tYXRjaF9hdmFpbGFibGU9MCksZS5pbnNlcnQ9ZS5zdHJzdGFydDxiLTE/ZS5zdHJzdGFydDpiLTEsND09PXQ/KEEoZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/Mzo0KTplLmxhc3RfbGl0JiYoQShlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCk/MToyfWZ1bmN0aW9uIEYoZSx0LHIsbixpKXt0aGlzLmdvb2RfbGVuZ3RoPWUsdGhpcy5tYXhfbGF6eT10LHRoaXMubmljZV9sZW5ndGg9cix0aGlzLm1heF9jaGFpbj1uLHRoaXMuZnVuYz1pfWZ1bmN0aW9uIE4oKXt0aGlzLnN0cm09bnVsbCx0aGlzLnN0YXR1cz0wLHRoaXMucGVuZGluZ19idWY9bnVsbCx0aGlzLnBlbmRpbmdfYnVmX3NpemU9MCx0aGlzLnBlbmRpbmdfb3V0PTAsdGhpcy5wZW5kaW5nPTAsdGhpcy53cmFwPTAsdGhpcy5nemhlYWQ9bnVsbCx0aGlzLmd6aW5kZXg9MCx0aGlzLm1ldGhvZD1fLHRoaXMubGFzdF9mbHVzaD0tMSx0aGlzLndfc2l6ZT0wLHRoaXMud19iaXRzPTAsdGhpcy53X21hc2s9MCx0aGlzLndpbmRvdz1udWxsLHRoaXMud2luZG93X3NpemU9MCx0aGlzLnByZXY9bnVsbCx0aGlzLmhlYWQ9bnVsbCx0aGlzLmluc19oPTAsdGhpcy5oYXNoX3NpemU9MCx0aGlzLmhhc2hfYml0cz0wLHRoaXMuaGFzaF9tYXNrPTAsdGhpcy5oYXNoX3NoaWZ0PTAsdGhpcy5ibG9ja19zdGFydD0wLHRoaXMubWF0Y2hfbGVuZ3RoPTAsdGhpcy5wcmV2X21hdGNoPTAsdGhpcy5tYXRjaF9hdmFpbGFibGU9MCx0aGlzLnN0cnN0YXJ0PTAsdGhpcy5tYXRjaF9zdGFydD0wLHRoaXMubG9va2FoZWFkPTAsdGhpcy5wcmV2X2xlbmd0aD0wLHRoaXMubWF4X2NoYWluX2xlbmd0aD0wLHRoaXMubWF4X2xhenlfbWF0Y2g9MCx0aGlzLmxldmVsPTAsdGhpcy5zdHJhdGVneT0wLHRoaXMuZ29vZF9tYXRjaD0wLHRoaXMubmljZV9tYXRjaD0wLHRoaXMuZHluX2x0cmVlPW5ldyBkLkJ1ZjE2KDIqZyksdGhpcy5keW5fZHRyZWU9bmV3IGQuQnVmMTYoMiooMiphKzEpKSx0aGlzLmJsX3RyZWU9bmV3IGQuQnVmMTYoMiooMipvKzEpKSxFKHRoaXMuZHluX2x0cmVlKSxFKHRoaXMuZHluX2R0cmVlKSxFKHRoaXMuYmxfdHJlZSksdGhpcy5sX2Rlc2M9bnVsbCx0aGlzLmRfZGVzYz1udWxsLHRoaXMuYmxfZGVzYz1udWxsLHRoaXMuYmxfY291bnQ9bmV3IGQuQnVmMTYodisxKSx0aGlzLmhlYXA9bmV3IGQuQnVmMTYoMipzKzEpLEUodGhpcy5oZWFwKSx0aGlzLmhlYXBfbGVuPTAsdGhpcy5oZWFwX21heD0wLHRoaXMuZGVwdGg9bmV3IGQuQnVmMTYoMipzKzEpLEUodGhpcy5kZXB0aCksdGhpcy5sX2J1Zj0wLHRoaXMubGl0X2J1ZnNpemU9MCx0aGlzLmxhc3RfbGl0PTAsdGhpcy5kX2J1Zj0wLHRoaXMub3B0X2xlbj0wLHRoaXMuc3RhdGljX2xlbj0wLHRoaXMubWF0Y2hlcz0wLHRoaXMuaW5zZXJ0PTAsdGhpcy5iaV9idWY9MCx0aGlzLmJpX3ZhbGlkPTB9ZnVuY3Rpb24gVShlKXt2YXIgdDtyZXR1cm4gZSYmZS5zdGF0ZT8oZS50b3RhbF9pbj1lLnRvdGFsX291dD0wLGUuZGF0YV90eXBlPWksKHQ9ZS5zdGF0ZSkucGVuZGluZz0wLHQucGVuZGluZ19vdXQ9MCx0LndyYXA8MCYmKHQud3JhcD0tdC53cmFwKSx0LnN0YXR1cz10LndyYXA/azp4LGUuYWRsZXI9Mj09PXQud3JhcD8wOjEsdC5sYXN0X2ZsdXNoPWYsaC5fdHJfaW5pdCh0KSxsKTpTKGUsbSl9ZnVuY3Rpb24gUChlKXt2YXIgdCxyPVUoZSk7cmV0dXJuIHI9PT1sJiYoKHQ9ZS5zdGF0ZSkud2luZG93X3NpemU9Mip0Lndfc2l6ZSxFKHQuaGVhZCksdC5tYXhfbGF6eV9tYXRjaD11W3QubGV2ZWxdLm1heF9sYXp5LHQuZ29vZF9tYXRjaD11W3QubGV2ZWxdLmdvb2RfbGVuZ3RoLHQubmljZV9tYXRjaD11W3QubGV2ZWxdLm5pY2VfbGVuZ3RoLHQubWF4X2NoYWluX2xlbmd0aD11W3QubGV2ZWxdLm1heF9jaGFpbix0LnN0cnN0YXJ0PTAsdC5ibG9ja19zdGFydD0wLHQubG9va2FoZWFkPTAsdC5pbnNlcnQ9MCx0Lm1hdGNoX2xlbmd0aD10LnByZXZfbGVuZ3RoPWItMSx0Lm1hdGNoX2F2YWlsYWJsZT0wLHQuaW5zX2g9MCkscn1mdW5jdGlvbiBMKGUsdCxyLG4saSxzKXtpZighZSlyZXR1cm4gbTt2YXIgYT0xO2lmKC0xPT09dCYmKHQ9NiksbjwwPyhhPTAsbj0tbik6MTU8biYmKGE9MixuLT0xNiksaTwxfHw5PGl8fHIhPT1ffHxuPDh8fDE1PG58fHQ8MHx8OTx0fHxzPDB8fDQ8cylyZXR1cm4gUyhlLG0pOzg9PT1uJiYobj05KTt2YXIgbz1uZXcgTjtyZXR1cm4oZS5zdGF0ZT1vKS5zdHJtPWUsby53cmFwPWEsby5nemhlYWQ9bnVsbCxvLndfYml0cz1uLG8ud19zaXplPTE8PG8ud19iaXRzLG8ud19tYXNrPW8ud19zaXplLTEsby5oYXNoX2JpdHM9aSs3LG8uaGFzaF9zaXplPTE8PG8uaGFzaF9iaXRzLG8uaGFzaF9tYXNrPW8uaGFzaF9zaXplLTEsby5oYXNoX3NoaWZ0PX5+KChvLmhhc2hfYml0cytiLTEpL2IpLG8ud2luZG93PW5ldyBkLkJ1ZjgoMipvLndfc2l6ZSksby5oZWFkPW5ldyBkLkJ1ZjE2KG8uaGFzaF9zaXplKSxvLnByZXY9bmV3IGQuQnVmMTYoby53X3NpemUpLG8ubGl0X2J1ZnNpemU9MTw8aSs2LG8ucGVuZGluZ19idWZfc2l6ZT00Km8ubGl0X2J1ZnNpemUsby5wZW5kaW5nX2J1Zj1uZXcgZC5CdWY4KG8ucGVuZGluZ19idWZfc2l6ZSksby5kX2J1Zj0xKm8ubGl0X2J1ZnNpemUsby5sX2J1Zj0zKm8ubGl0X2J1ZnNpemUsby5sZXZlbD10LG8uc3RyYXRlZ3k9cyxvLm1ldGhvZD1yLFAoZSl9dT1bbmV3IEYoMCwwLDAsMCxmdW5jdGlvbihlLHQpe3ZhciByPTY1NTM1O2ZvcihyPmUucGVuZGluZ19idWZfc2l6ZS01JiYocj1lLnBlbmRpbmdfYnVmX3NpemUtNSk7Oyl7aWYoZS5sb29rYWhlYWQ8PTEpe2lmKFQoZSksMD09PWUubG9va2FoZWFkJiZ0PT09ZilyZXR1cm4gMTtpZigwPT09ZS5sb29rYWhlYWQpYnJlYWt9ZS5zdHJzdGFydCs9ZS5sb29rYWhlYWQsZS5sb29rYWhlYWQ9MDt2YXIgbj1lLmJsb2NrX3N0YXJ0K3I7aWYoKDA9PT1lLnN0cnN0YXJ0fHxlLnN0cnN0YXJ0Pj1uKSYmKGUubG9va2FoZWFkPWUuc3Ryc3RhcnQtbixlLnN0cnN0YXJ0PW4sQShlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIDE7aWYoZS5zdHJzdGFydC1lLmJsb2NrX3N0YXJ0Pj1lLndfc2l6ZS15JiYoQShlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIDF9cmV0dXJuIGUuaW5zZXJ0PTAsND09PXQ/KEEoZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/Mzo0KTooZS5zdHJzdGFydD5lLmJsb2NrX3N0YXJ0JiYoQShlLCExKSxlLnN0cm0uYXZhaWxfb3V0KSwxKX0pLG5ldyBGKDQsNCw4LDQsUiksbmV3IEYoNCw1LDE2LDgsUiksbmV3IEYoNCw2LDMyLDMyLFIpLG5ldyBGKDQsNCwxNiwxNixEKSxuZXcgRig4LDE2LDMyLDMyLEQpLG5ldyBGKDgsMTYsMTI4LDEyOCxEKSxuZXcgRig4LDMyLDEyOCwyNTYsRCksbmV3IEYoMzIsMTI4LDI1OCwxMDI0LEQpLG5ldyBGKDMyLDI1OCwyNTgsNDA5NixEKV0sci5kZWZsYXRlSW5pdD1mdW5jdGlvbihlLHQpe3JldHVybiBMKGUsdCxfLDE1LDgsMCl9LHIuZGVmbGF0ZUluaXQyPUwsci5kZWZsYXRlUmVzZXQ9UCxyLmRlZmxhdGVSZXNldEtlZXA9VSxyLmRlZmxhdGVTZXRIZWFkZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZSYmZS5zdGF0ZT8yIT09ZS5zdGF0ZS53cmFwP206KGUuc3RhdGUuZ3poZWFkPXQsbCk6bX0sci5kZWZsYXRlPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHM7aWYoIWV8fCFlLnN0YXRlfHw1PHR8fHQ8MClyZXR1cm4gZT9TKGUsbSk6bTtpZihuPWUuc3RhdGUsIWUub3V0cHV0fHwhZS5pbnB1dCYmMCE9PWUuYXZhaWxfaW58fDY2Nj09PW4uc3RhdHVzJiY0IT09dClyZXR1cm4gUyhlLDA9PT1lLmF2YWlsX291dD8tNTptKTtpZihuLnN0cm09ZSxyPW4ubGFzdF9mbHVzaCxuLmxhc3RfZmx1c2g9dCxuLnN0YXR1cz09PWspaWYoMj09PW4ud3JhcCllLmFkbGVyPTAsSShuLDMxKSxJKG4sMTM5KSxJKG4sOCksbi5nemhlYWQ/KEkobiwobi5nemhlYWQudGV4dD8xOjApKyhuLmd6aGVhZC5oY3JjPzI6MCkrKG4uZ3poZWFkLmV4dHJhPzQ6MCkrKG4uZ3poZWFkLm5hbWU/ODowKSsobi5nemhlYWQuY29tbWVudD8xNjowKSksSShuLDI1NSZuLmd6aGVhZC50aW1lKSxJKG4sbi5nemhlYWQudGltZT4+OCYyNTUpLEkobixuLmd6aGVhZC50aW1lPj4xNiYyNTUpLEkobixuLmd6aGVhZC50aW1lPj4yNCYyNTUpLEkobiw5PT09bi5sZXZlbD8yOjI8PW4uc3RyYXRlZ3l8fG4ubGV2ZWw8Mj80OjApLEkobiwyNTUmbi5nemhlYWQub3MpLG4uZ3poZWFkLmV4dHJhJiZuLmd6aGVhZC5leHRyYS5sZW5ndGgmJihJKG4sMjU1Jm4uZ3poZWFkLmV4dHJhLmxlbmd0aCksSShuLG4uZ3poZWFkLmV4dHJhLmxlbmd0aD4+OCYyNTUpKSxuLmd6aGVhZC5oY3JjJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmcsMCkpLG4uZ3ppbmRleD0wLG4uc3RhdHVzPTY5KTooSShuLDApLEkobiwwKSxJKG4sMCksSShuLDApLEkobiwwKSxJKG4sOT09PW4ubGV2ZWw/MjoyPD1uLnN0cmF0ZWd5fHxuLmxldmVsPDI/NDowKSxJKG4sMyksbi5zdGF0dXM9eCk7ZWxzZXt2YXIgYT1fKyhuLndfYml0cy04PDw0KTw8ODthfD0oMjw9bi5zdHJhdGVneXx8bi5sZXZlbDwyPzA6bi5sZXZlbDw2PzE6Nj09PW4ubGV2ZWw/MjozKTw8NiwwIT09bi5zdHJzdGFydCYmKGF8PTMyKSxhKz0zMS1hJTMxLG4uc3RhdHVzPXgsTyhuLGEpLDAhPT1uLnN0cnN0YXJ0JiYoTyhuLGUuYWRsZXI+Pj4xNiksTyhuLDY1NTM1JmUuYWRsZXIpKSxlLmFkbGVyPTF9aWYoNjk9PT1uLnN0YXR1cylpZihuLmd6aGVhZC5leHRyYSl7Zm9yKGk9bi5wZW5kaW5nO24uZ3ppbmRleDwoNjU1MzUmbi5nemhlYWQuZXh0cmEubGVuZ3RoKSYmKG4ucGVuZGluZyE9PW4ucGVuZGluZ19idWZfc2l6ZXx8KG4uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksQyhlKSxpPW4ucGVuZGluZyxuLnBlbmRpbmchPT1uLnBlbmRpbmdfYnVmX3NpemUpKTspSShuLDI1NSZuLmd6aGVhZC5leHRyYVtuLmd6aW5kZXhdKSxuLmd6aW5kZXgrKztuLmd6aGVhZC5oY3JjJiZuLnBlbmRpbmc+aSYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLWksaSkpLG4uZ3ppbmRleD09PW4uZ3poZWFkLmV4dHJhLmxlbmd0aCYmKG4uZ3ppbmRleD0wLG4uc3RhdHVzPTczKX1lbHNlIG4uc3RhdHVzPTczO2lmKDczPT09bi5zdGF0dXMpaWYobi5nemhlYWQubmFtZSl7aT1uLnBlbmRpbmc7ZG97aWYobi5wZW5kaW5nPT09bi5wZW5kaW5nX2J1Zl9zaXplJiYobi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSxDKGUpLGk9bi5wZW5kaW5nLG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSkpe3M9MTticmVha31zPW4uZ3ppbmRleDxuLmd6aGVhZC5uYW1lLmxlbmd0aD8yNTUmbi5nemhlYWQubmFtZS5jaGFyQ29kZUF0KG4uZ3ppbmRleCsrKTowLEkobixzKX13aGlsZSgwIT09cyk7bi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSwwPT09cyYmKG4uZ3ppbmRleD0wLG4uc3RhdHVzPTkxKX1lbHNlIG4uc3RhdHVzPTkxO2lmKDkxPT09bi5zdGF0dXMpaWYobi5nemhlYWQuY29tbWVudCl7aT1uLnBlbmRpbmc7ZG97aWYobi5wZW5kaW5nPT09bi5wZW5kaW5nX2J1Zl9zaXplJiYobi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSxDKGUpLGk9bi5wZW5kaW5nLG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSkpe3M9MTticmVha31zPW4uZ3ppbmRleDxuLmd6aGVhZC5jb21tZW50Lmxlbmd0aD8yNTUmbi5nemhlYWQuY29tbWVudC5jaGFyQ29kZUF0KG4uZ3ppbmRleCsrKTowLEkobixzKX13aGlsZSgwIT09cyk7bi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSwwPT09cyYmKG4uc3RhdHVzPTEwMyl9ZWxzZSBuLnN0YXR1cz0xMDM7aWYoMTAzPT09bi5zdGF0dXMmJihuLmd6aGVhZC5oY3JjPyhuLnBlbmRpbmcrMj5uLnBlbmRpbmdfYnVmX3NpemUmJkMoZSksbi5wZW5kaW5nKzI8PW4ucGVuZGluZ19idWZfc2l6ZSYmKEkobiwyNTUmZS5hZGxlciksSShuLGUuYWRsZXI+PjgmMjU1KSxlLmFkbGVyPTAsbi5zdGF0dXM9eCkpOm4uc3RhdHVzPXgpLDAhPT1uLnBlbmRpbmcpe2lmKEMoZSksMD09PWUuYXZhaWxfb3V0KXJldHVybiBuLmxhc3RfZmx1c2g9LTEsbH1lbHNlIGlmKDA9PT1lLmF2YWlsX2luJiZ6KHQpPD16KHIpJiY0IT09dClyZXR1cm4gUyhlLC01KTtpZig2NjY9PT1uLnN0YXR1cyYmMCE9PWUuYXZhaWxfaW4pcmV0dXJuIFMoZSwtNSk7aWYoMCE9PWUuYXZhaWxfaW58fDAhPT1uLmxvb2thaGVhZHx8dCE9PWYmJjY2NiE9PW4uc3RhdHVzKXt2YXIgbz0yPT09bi5zdHJhdGVneT9mdW5jdGlvbihlLHQpe2Zvcih2YXIgcjs7KXtpZigwPT09ZS5sb29rYWhlYWQmJihUKGUpLDA9PT1lLmxvb2thaGVhZCkpe2lmKHQ9PT1mKXJldHVybiAxO2JyZWFrfWlmKGUubWF0Y2hfbGVuZ3RoPTAscj1oLl90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydF0pLGUubG9va2FoZWFkLS0sZS5zdHJzdGFydCsrLHImJihBKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gMX1yZXR1cm4gZS5pbnNlcnQ9MCw0PT09dD8oQShlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD8zOjQpOmUubGFzdF9saXQmJihBKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KT8xOjJ9KG4sdCk6Mz09PW4uc3RyYXRlZ3k/ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHIsbixpLHMsYT1lLndpbmRvdzs7KXtpZihlLmxvb2thaGVhZDw9dyl7aWYoVChlKSxlLmxvb2thaGVhZDw9dyYmdD09PWYpcmV0dXJuIDE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWlmKGUubWF0Y2hfbGVuZ3RoPTAsZS5sb29rYWhlYWQ+PWImJjA8ZS5zdHJzdGFydCYmKG49YVtpPWUuc3Ryc3RhcnQtMV0pPT09YVsrK2ldJiZuPT09YVsrK2ldJiZuPT09YVsrK2ldKXtzPWUuc3Ryc3RhcnQrdztkb3t9d2hpbGUobj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmaTxzKTtlLm1hdGNoX2xlbmd0aD13LShzLWkpLGUubWF0Y2hfbGVuZ3RoPmUubG9va2FoZWFkJiYoZS5tYXRjaF9sZW5ndGg9ZS5sb29rYWhlYWQpfWlmKGUubWF0Y2hfbGVuZ3RoPj1iPyhyPWguX3RyX3RhbGx5KGUsMSxlLm1hdGNoX2xlbmd0aC1iKSxlLmxvb2thaGVhZC09ZS5tYXRjaF9sZW5ndGgsZS5zdHJzdGFydCs9ZS5tYXRjaF9sZW5ndGgsZS5tYXRjaF9sZW5ndGg9MCk6KHI9aC5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnRdKSxlLmxvb2thaGVhZC0tLGUuc3Ryc3RhcnQrKyksciYmKEEoZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiAxfXJldHVybiBlLmluc2VydD0wLDQ9PT10PyhBKGUsITApLDA9PT1lLnN0cm0uYXZhaWxfb3V0PzM6NCk6ZS5sYXN0X2xpdCYmKEEoZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpPzE6Mn0obix0KTp1W24ubGV2ZWxdLmZ1bmMobix0KTtpZigzIT09byYmNCE9PW98fChuLnN0YXR1cz02NjYpLDE9PT1vfHwzPT09bylyZXR1cm4gMD09PWUuYXZhaWxfb3V0JiYobi5sYXN0X2ZsdXNoPS0xKSxsO2lmKDI9PT1vJiYoMT09PXQ/aC5fdHJfYWxpZ24obik6NSE9PXQmJihoLl90cl9zdG9yZWRfYmxvY2sobiwwLDAsITEpLDM9PT10JiYoRShuLmhlYWQpLDA9PT1uLmxvb2thaGVhZCYmKG4uc3Ryc3RhcnQ9MCxuLmJsb2NrX3N0YXJ0PTAsbi5pbnNlcnQ9MCkpKSxDKGUpLDA9PT1lLmF2YWlsX291dCkpcmV0dXJuIG4ubGFzdF9mbHVzaD0tMSxsfXJldHVybiA0IT09dD9sOm4ud3JhcDw9MD8xOigyPT09bi53cmFwPyhJKG4sMjU1JmUuYWRsZXIpLEkobixlLmFkbGVyPj44JjI1NSksSShuLGUuYWRsZXI+PjE2JjI1NSksSShuLGUuYWRsZXI+PjI0JjI1NSksSShuLDI1NSZlLnRvdGFsX2luKSxJKG4sZS50b3RhbF9pbj4+OCYyNTUpLEkobixlLnRvdGFsX2luPj4xNiYyNTUpLEkobixlLnRvdGFsX2luPj4yNCYyNTUpKTooTyhuLGUuYWRsZXI+Pj4xNiksTyhuLDY1NTM1JmUuYWRsZXIpKSxDKGUpLDA8bi53cmFwJiYobi53cmFwPS1uLndyYXApLDAhPT1uLnBlbmRpbmc/bDoxKX0sci5kZWZsYXRlRW5kPWZ1bmN0aW9uKGUpe3ZhciB0O3JldHVybiBlJiZlLnN0YXRlPyh0PWUuc3RhdGUuc3RhdHVzKSE9PWsmJjY5IT09dCYmNzMhPT10JiY5MSE9PXQmJjEwMyE9PXQmJnQhPT14JiY2NjYhPT10P1MoZSxtKTooZS5zdGF0ZT1udWxsLHQ9PT14P1MoZSwtMyk6bCk6bX0sci5kZWZsYXRlU2V0RGljdGlvbmFyeT1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyx1LGgsZj10Lmxlbmd0aDtpZighZXx8IWUuc3RhdGUpcmV0dXJuIG07aWYoMj09PShzPShyPWUuc3RhdGUpLndyYXApfHwxPT09cyYmci5zdGF0dXMhPT1rfHxyLmxvb2thaGVhZClyZXR1cm4gbTtmb3IoMT09PXMmJihlLmFkbGVyPWMoZS5hZGxlcix0LGYsMCkpLHIud3JhcD0wLGY+PXIud19zaXplJiYoMD09PXMmJihFKHIuaGVhZCksci5zdHJzdGFydD0wLHIuYmxvY2tfc3RhcnQ9MCxyLmluc2VydD0wKSxoPW5ldyBkLkJ1Zjgoci53X3NpemUpLGQuYXJyYXlTZXQoaCx0LGYtci53X3NpemUsci53X3NpemUsMCksdD1oLGY9ci53X3NpemUpLGE9ZS5hdmFpbF9pbixvPWUubmV4dF9pbix1PWUuaW5wdXQsZS5hdmFpbF9pbj1mLGUubmV4dF9pbj0wLGUuaW5wdXQ9dCxUKHIpO3IubG9va2FoZWFkPj1iOyl7Zm9yKG49ci5zdHJzdGFydCxpPXIubG9va2FoZWFkLShiLTEpO3IuaW5zX2g9KHIuaW5zX2g8PHIuaGFzaF9zaGlmdF5yLndpbmRvd1tuK2ItMV0pJnIuaGFzaF9tYXNrLHIucHJldltuJnIud19tYXNrXT1yLmhlYWRbci5pbnNfaF0sci5oZWFkW3IuaW5zX2hdPW4sbisrLC0taTspO3Iuc3Ryc3RhcnQ9bixyLmxvb2thaGVhZD1iLTEsVChyKX1yZXR1cm4gci5zdHJzdGFydCs9ci5sb29rYWhlYWQsci5ibG9ja19zdGFydD1yLnN0cnN0YXJ0LHIuaW5zZXJ0PXIubG9va2FoZWFkLHIubG9va2FoZWFkPTAsci5tYXRjaF9sZW5ndGg9ci5wcmV2X2xlbmd0aD1iLTEsci5tYXRjaF9hdmFpbGFibGU9MCxlLm5leHRfaW49byxlLmlucHV0PXUsZS5hdmFpbF9pbj1hLHIud3JhcD1zLGx9LHIuZGVmbGF0ZUluZm89XCJwYWtvIGRlZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpXCJ9LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxLFwiLi9hZGxlcjMyXCI6NDMsXCIuL2NyYzMyXCI6NDUsXCIuL21lc3NhZ2VzXCI6NTEsXCIuL3RyZWVzXCI6NTJ9XSw0NzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbigpe3RoaXMudGV4dD0wLHRoaXMudGltZT0wLHRoaXMueGZsYWdzPTAsdGhpcy5vcz0wLHRoaXMuZXh0cmE9bnVsbCx0aGlzLmV4dHJhX2xlbj0wLHRoaXMubmFtZT1cIlwiLHRoaXMuY29tbWVudD1cIlwiLHRoaXMuaGNyYz0wLHRoaXMuZG9uZT0hMX19LHt9XSw0ODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyx1LGgsZixsLGQsYyxwLG0sXyxnLHYsYix3LHksayx4LFMseixFO3I9ZS5zdGF0ZSxuPWUubmV4dF9pbix6PWUuaW5wdXQsaT1uKyhlLmF2YWlsX2luLTUpLHM9ZS5uZXh0X291dCxFPWUub3V0cHV0LGE9cy0odC1lLmF2YWlsX291dCksbz1zKyhlLmF2YWlsX291dC0yNTcpLHU9ci5kbWF4LGg9ci53c2l6ZSxmPXIud2hhdmUsbD1yLnduZXh0LGQ9ci53aW5kb3csYz1yLmhvbGQscD1yLmJpdHMsbT1yLmxlbmNvZGUsXz1yLmRpc3Rjb2RlLGc9KDE8PHIubGVuYml0cyktMSx2PSgxPDxyLmRpc3RiaXRzKS0xO2U6ZG97cDwxNSYmKGMrPXpbbisrXTw8cCxwKz04LGMrPXpbbisrXTw8cCxwKz04KSxiPW1bYyZnXTt0OmZvcig7Oyl7aWYoYz4+Pj13PWI+Pj4yNCxwLT13LDA9PSh3PWI+Pj4xNiYyNTUpKUVbcysrXT02NTUzNSZiO2Vsc2V7aWYoISgxNiZ3KSl7aWYoMD09KDY0JncpKXtiPW1bKDY1NTM1JmIpKyhjJigxPDx3KS0xKV07Y29udGludWUgdH1pZigzMiZ3KXtyLm1vZGU9MTI7YnJlYWsgZX1lLm1zZz1cImludmFsaWQgbGl0ZXJhbC9sZW5ndGggY29kZVwiLHIubW9kZT0zMDticmVhayBlfXk9NjU1MzUmYiwodyY9MTUpJiYocDx3JiYoYys9eltuKytdPDxwLHArPTgpLHkrPWMmKDE8PHcpLTEsYz4+Pj13LHAtPXcpLHA8MTUmJihjKz16W24rK108PHAscCs9OCxjKz16W24rK108PHAscCs9OCksYj1fW2Mmdl07cjpmb3IoOzspe2lmKGM+Pj49dz1iPj4+MjQscC09dywhKDE2Jih3PWI+Pj4xNiYyNTUpKSl7aWYoMD09KDY0JncpKXtiPV9bKDY1NTM1JmIpKyhjJigxPDx3KS0xKV07Y29udGludWUgcn1lLm1zZz1cImludmFsaWQgZGlzdGFuY2UgY29kZVwiLHIubW9kZT0zMDticmVhayBlfWlmKGs9NjU1MzUmYixwPCh3Jj0xNSkmJihjKz16W24rK108PHAsKHArPTgpPHcmJihjKz16W24rK108PHAscCs9OCkpLHU8KGsrPWMmKDE8PHcpLTEpKXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrXCIsci5tb2RlPTMwO2JyZWFrIGV9aWYoYz4+Pj13LHAtPXcsKHc9cy1hKTxrKXtpZihmPCh3PWstdykmJnIuc2FuZSl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVhayBlfWlmKFM9ZCwoeD0wKT09PWwpe2lmKHgrPWgtdyx3PHkpe2Zvcih5LT13O0VbcysrXT1kW3grK10sLS13Oyk7eD1zLWssUz1FfX1lbHNlIGlmKGw8dyl7aWYoeCs9aCtsLXcsKHctPWwpPHkpe2Zvcih5LT13O0VbcysrXT1kW3grK10sLS13Oyk7aWYoeD0wLGw8eSl7Zm9yKHktPXc9bDtFW3MrK109ZFt4KytdLC0tdzspO3g9cy1rLFM9RX19fWVsc2UgaWYoeCs9bC13LHc8eSl7Zm9yKHktPXc7RVtzKytdPWRbeCsrXSwtLXc7KTt4PXMtayxTPUV9Zm9yKDsyPHk7KUVbcysrXT1TW3grK10sRVtzKytdPVNbeCsrXSxFW3MrK109U1t4KytdLHktPTM7eSYmKEVbcysrXT1TW3grK10sMTx5JiYoRVtzKytdPVNbeCsrXSkpfWVsc2V7Zm9yKHg9cy1rO0VbcysrXT1FW3grK10sRVtzKytdPUVbeCsrXSxFW3MrK109RVt4KytdLDI8KHktPTMpOyk7eSYmKEVbcysrXT1FW3grK10sMTx5JiYoRVtzKytdPUVbeCsrXSkpfWJyZWFrfX1icmVha319d2hpbGUobjxpJiZzPG8pO24tPXk9cD4+MyxjJj0oMTw8KHAtPXk8PDMpKS0xLGUubmV4dF9pbj1uLGUubmV4dF9vdXQ9cyxlLmF2YWlsX2luPW48aT9pLW4rNTo1LShuLWkpLGUuYXZhaWxfb3V0PXM8bz9vLXMrMjU3OjI1Ny0ocy1vKSxyLmhvbGQ9YyxyLmJpdHM9cH19LHt9XSw0OTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBJPWUoXCIuLi91dGlscy9jb21tb25cIiksTz1lKFwiLi9hZGxlcjMyXCIpLEI9ZShcIi4vY3JjMzJcIiksVD1lKFwiLi9pbmZmYXN0XCIpLFI9ZShcIi4vaW5mdHJlZXNcIiksRD0xLEY9MixOPTAsVT0tMixQPTEsbj04NTIsaT01OTI7ZnVuY3Rpb24gTChlKXtyZXR1cm4oZT4+PjI0JjI1NSkrKGU+Pj44JjY1MjgwKSsoKDY1MjgwJmUpPDw4KSsoKDI1NSZlKTw8MjQpfWZ1bmN0aW9uIHMoKXt0aGlzLm1vZGU9MCx0aGlzLmxhc3Q9ITEsdGhpcy53cmFwPTAsdGhpcy5oYXZlZGljdD0hMSx0aGlzLmZsYWdzPTAsdGhpcy5kbWF4PTAsdGhpcy5jaGVjaz0wLHRoaXMudG90YWw9MCx0aGlzLmhlYWQ9bnVsbCx0aGlzLndiaXRzPTAsdGhpcy53c2l6ZT0wLHRoaXMud2hhdmU9MCx0aGlzLnduZXh0PTAsdGhpcy53aW5kb3c9bnVsbCx0aGlzLmhvbGQ9MCx0aGlzLmJpdHM9MCx0aGlzLmxlbmd0aD0wLHRoaXMub2Zmc2V0PTAsdGhpcy5leHRyYT0wLHRoaXMubGVuY29kZT1udWxsLHRoaXMuZGlzdGNvZGU9bnVsbCx0aGlzLmxlbmJpdHM9MCx0aGlzLmRpc3RiaXRzPTAsdGhpcy5uY29kZT0wLHRoaXMubmxlbj0wLHRoaXMubmRpc3Q9MCx0aGlzLmhhdmU9MCx0aGlzLm5leHQ9bnVsbCx0aGlzLmxlbnM9bmV3IEkuQnVmMTYoMzIwKSx0aGlzLndvcms9bmV3IEkuQnVmMTYoMjg4KSx0aGlzLmxlbmR5bj1udWxsLHRoaXMuZGlzdGR5bj1udWxsLHRoaXMuc2FuZT0wLHRoaXMuYmFjaz0wLHRoaXMud2FzPTB9ZnVuY3Rpb24gYShlKXt2YXIgdDtyZXR1cm4gZSYmZS5zdGF0ZT8odD1lLnN0YXRlLGUudG90YWxfaW49ZS50b3RhbF9vdXQ9dC50b3RhbD0wLGUubXNnPVwiXCIsdC53cmFwJiYoZS5hZGxlcj0xJnQud3JhcCksdC5tb2RlPVAsdC5sYXN0PTAsdC5oYXZlZGljdD0wLHQuZG1heD0zMjc2OCx0LmhlYWQ9bnVsbCx0LmhvbGQ9MCx0LmJpdHM9MCx0LmxlbmNvZGU9dC5sZW5keW49bmV3IEkuQnVmMzIobiksdC5kaXN0Y29kZT10LmRpc3RkeW49bmV3IEkuQnVmMzIoaSksdC5zYW5lPTEsdC5iYWNrPS0xLE4pOlV9ZnVuY3Rpb24gbyhlKXt2YXIgdDtyZXR1cm4gZSYmZS5zdGF0ZT8oKHQ9ZS5zdGF0ZSkud3NpemU9MCx0LndoYXZlPTAsdC53bmV4dD0wLGEoZSkpOlV9ZnVuY3Rpb24gdShlLHQpe3ZhciByLG47cmV0dXJuIGUmJmUuc3RhdGU/KG49ZS5zdGF0ZSx0PDA/KHI9MCx0PS10KToocj0xKyh0Pj40KSx0PDQ4JiYodCY9MTUpKSx0JiYodDw4fHwxNTx0KT9VOihudWxsIT09bi53aW5kb3cmJm4ud2JpdHMhPT10JiYobi53aW5kb3c9bnVsbCksbi53cmFwPXIsbi53Yml0cz10LG8oZSkpKTpVfWZ1bmN0aW9uIGgoZSx0KXt2YXIgcixuO3JldHVybiBlPyhuPW5ldyBzLChlLnN0YXRlPW4pLndpbmRvdz1udWxsLChyPXUoZSx0KSkhPT1OJiYoZS5zdGF0ZT1udWxsKSxyKTpVfXZhciBmLGwsZD0hMDtmdW5jdGlvbiBqKGUpe2lmKGQpe3ZhciB0O2ZvcihmPW5ldyBJLkJ1ZjMyKDUxMiksbD1uZXcgSS5CdWYzMigzMiksdD0wO3Q8MTQ0OyllLmxlbnNbdCsrXT04O2Zvcig7dDwyNTY7KWUubGVuc1t0KytdPTk7Zm9yKDt0PDI4MDspZS5sZW5zW3QrK109Nztmb3IoO3Q8Mjg4OyllLmxlbnNbdCsrXT04O2ZvcihSKEQsZS5sZW5zLDAsMjg4LGYsMCxlLndvcmsse2JpdHM6OX0pLHQ9MDt0PDMyOyllLmxlbnNbdCsrXT01O1IoRixlLmxlbnMsMCwzMixsLDAsZS53b3JrLHtiaXRzOjV9KSxkPSExfWUubGVuY29kZT1mLGUubGVuYml0cz05LGUuZGlzdGNvZGU9bCxlLmRpc3RiaXRzPTV9ZnVuY3Rpb24gWihlLHQscixuKXt2YXIgaSxzPWUuc3RhdGU7cmV0dXJuIG51bGw9PT1zLndpbmRvdyYmKHMud3NpemU9MTw8cy53Yml0cyxzLnduZXh0PTAscy53aGF2ZT0wLHMud2luZG93PW5ldyBJLkJ1Zjgocy53c2l6ZSkpLG4+PXMud3NpemU/KEkuYXJyYXlTZXQocy53aW5kb3csdCxyLXMud3NpemUscy53c2l6ZSwwKSxzLnduZXh0PTAscy53aGF2ZT1zLndzaXplKToobjwoaT1zLndzaXplLXMud25leHQpJiYoaT1uKSxJLmFycmF5U2V0KHMud2luZG93LHQsci1uLGkscy53bmV4dCksKG4tPWkpPyhJLmFycmF5U2V0KHMud2luZG93LHQsci1uLG4sMCkscy53bmV4dD1uLHMud2hhdmU9cy53c2l6ZSk6KHMud25leHQrPWkscy53bmV4dD09PXMud3NpemUmJihzLnduZXh0PTApLHMud2hhdmU8cy53c2l6ZSYmKHMud2hhdmUrPWkpKSksMH1yLmluZmxhdGVSZXNldD1vLHIuaW5mbGF0ZVJlc2V0Mj11LHIuaW5mbGF0ZVJlc2V0S2VlcD1hLHIuaW5mbGF0ZUluaXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGgoZSwxNSl9LHIuaW5mbGF0ZUluaXQyPWgsci5pbmZsYXRlPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYSxvLHUsaCxmLGwsZCxjLHAsbSxfLGcsdixiLHcseSxrLHgsUyx6LEU9MCxDPW5ldyBJLkJ1ZjgoNCksQT1bMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV07aWYoIWV8fCFlLnN0YXRlfHwhZS5vdXRwdXR8fCFlLmlucHV0JiYwIT09ZS5hdmFpbF9pbilyZXR1cm4gVTsxMj09PShyPWUuc3RhdGUpLm1vZGUmJihyLm1vZGU9MTMpLGE9ZS5uZXh0X291dCxpPWUub3V0cHV0LHU9ZS5hdmFpbF9vdXQscz1lLm5leHRfaW4sbj1lLmlucHV0LG89ZS5hdmFpbF9pbixoPXIuaG9sZCxmPXIuYml0cyxsPW8sZD11LHg9TjtlOmZvcig7Oylzd2l0Y2goci5tb2RlKXtjYXNlIFA6aWYoMD09PXIud3JhcCl7ci5tb2RlPTEzO2JyZWFrfWZvcig7ZjwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fWlmKDImci53cmFwJiYzNTYxNT09PWgpe0Nbci5jaGVjaz0wXT0yNTUmaCxDWzFdPWg+Pj44JjI1NSxyLmNoZWNrPUIoci5jaGVjayxDLDIsMCksZj1oPTAsci5tb2RlPTI7YnJlYWt9aWYoci5mbGFncz0wLHIuaGVhZCYmKHIuaGVhZC5kb25lPSExKSwhKDEmci53cmFwKXx8KCgoMjU1JmgpPDw4KSsoaD4+OCkpJTMxKXtlLm1zZz1cImluY29ycmVjdCBoZWFkZXIgY2hlY2tcIixyLm1vZGU9MzA7YnJlYWt9aWYoOCE9KDE1JmgpKXtlLm1zZz1cInVua25vd24gY29tcHJlc3Npb24gbWV0aG9kXCIsci5tb2RlPTMwO2JyZWFrfWlmKGYtPTQsaz04KygxNSYoaD4+Pj00KSksMD09PXIud2JpdHMpci53Yml0cz1rO2Vsc2UgaWYoaz5yLndiaXRzKXtlLm1zZz1cImludmFsaWQgd2luZG93IHNpemVcIixyLm1vZGU9MzA7YnJlYWt9ci5kbWF4PTE8PGssZS5hZGxlcj1yLmNoZWNrPTEsci5tb2RlPTUxMiZoPzEwOjEyLGY9aD0wO2JyZWFrO2Nhc2UgMjpmb3IoO2Y8MTY7KXtpZigwPT09bylicmVhayBlO28tLSxoKz1uW3MrK108PGYsZis9OH1pZihyLmZsYWdzPWgsOCE9KDI1NSZyLmZsYWdzKSl7ZS5tc2c9XCJ1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZFwiLHIubW9kZT0zMDticmVha31pZig1NzM0NCZyLmZsYWdzKXtlLm1zZz1cInVua25vd24gaGVhZGVyIGZsYWdzIHNldFwiLHIubW9kZT0zMDticmVha31yLmhlYWQmJihyLmhlYWQudGV4dD1oPj44JjEpLDUxMiZyLmZsYWdzJiYoQ1swXT0yNTUmaCxDWzFdPWg+Pj44JjI1NSxyLmNoZWNrPUIoci5jaGVjayxDLDIsMCkpLGY9aD0wLHIubW9kZT0zO2Nhc2UgMzpmb3IoO2Y8MzI7KXtpZigwPT09bylicmVhayBlO28tLSxoKz1uW3MrK108PGYsZis9OH1yLmhlYWQmJihyLmhlYWQudGltZT1oKSw1MTImci5mbGFncyYmKENbMF09MjU1JmgsQ1sxXT1oPj4+OCYyNTUsQ1syXT1oPj4+MTYmMjU1LENbM109aD4+PjI0JjI1NSxyLmNoZWNrPUIoci5jaGVjayxDLDQsMCkpLGY9aD0wLHIubW9kZT00O2Nhc2UgNDpmb3IoO2Y8MTY7KXtpZigwPT09bylicmVhayBlO28tLSxoKz1uW3MrK108PGYsZis9OH1yLmhlYWQmJihyLmhlYWQueGZsYWdzPTI1NSZoLHIuaGVhZC5vcz1oPj44KSw1MTImci5mbGFncyYmKENbMF09MjU1JmgsQ1sxXT1oPj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssQywyLDApKSxmPWg9MCxyLm1vZGU9NTtjYXNlIDU6aWYoMTAyNCZyLmZsYWdzKXtmb3IoO2Y8MTY7KXtpZigwPT09bylicmVhayBlO28tLSxoKz1uW3MrK108PGYsZis9OH1yLmxlbmd0aD1oLHIuaGVhZCYmKHIuaGVhZC5leHRyYV9sZW49aCksNTEyJnIuZmxhZ3MmJihDWzBdPTI1NSZoLENbMV09aD4+PjgmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEMsMiwwKSksZj1oPTB9ZWxzZSByLmhlYWQmJihyLmhlYWQuZXh0cmE9bnVsbCk7ci5tb2RlPTY7Y2FzZSA2OmlmKDEwMjQmci5mbGFncyYmKG88KGM9ci5sZW5ndGgpJiYoYz1vKSxjJiYoci5oZWFkJiYoaz1yLmhlYWQuZXh0cmFfbGVuLXIubGVuZ3RoLHIuaGVhZC5leHRyYXx8KHIuaGVhZC5leHRyYT1uZXcgQXJyYXkoci5oZWFkLmV4dHJhX2xlbikpLEkuYXJyYXlTZXQoci5oZWFkLmV4dHJhLG4scyxjLGspKSw1MTImci5mbGFncyYmKHIuY2hlY2s9QihyLmNoZWNrLG4sYyxzKSksby09YyxzKz1jLHIubGVuZ3RoLT1jKSxyLmxlbmd0aCkpYnJlYWsgZTtyLmxlbmd0aD0wLHIubW9kZT03O2Nhc2UgNzppZigyMDQ4JnIuZmxhZ3Mpe2lmKDA9PT1vKWJyZWFrIGU7Zm9yKGM9MDtrPW5bcytjKytdLHIuaGVhZCYmayYmci5sZW5ndGg8NjU1MzYmJihyLmhlYWQubmFtZSs9U3RyaW5nLmZyb21DaGFyQ29kZShrKSksayYmYzxvOyk7aWYoNTEyJnIuZmxhZ3MmJihyLmNoZWNrPUIoci5jaGVjayxuLGMscykpLG8tPWMscys9YyxrKWJyZWFrIGV9ZWxzZSByLmhlYWQmJihyLmhlYWQubmFtZT1udWxsKTtyLmxlbmd0aD0wLHIubW9kZT04O2Nhc2UgODppZig0MDk2JnIuZmxhZ3Mpe2lmKDA9PT1vKWJyZWFrIGU7Zm9yKGM9MDtrPW5bcytjKytdLHIuaGVhZCYmayYmci5sZW5ndGg8NjU1MzYmJihyLmhlYWQuY29tbWVudCs9U3RyaW5nLmZyb21DaGFyQ29kZShrKSksayYmYzxvOyk7aWYoNTEyJnIuZmxhZ3MmJihyLmNoZWNrPUIoci5jaGVjayxuLGMscykpLG8tPWMscys9YyxrKWJyZWFrIGV9ZWxzZSByLmhlYWQmJihyLmhlYWQuY29tbWVudD1udWxsKTtyLm1vZGU9OTtjYXNlIDk6aWYoNTEyJnIuZmxhZ3Mpe2Zvcig7ZjwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fWlmKGghPT0oNjU1MzUmci5jaGVjaykpe2UubXNnPVwiaGVhZGVyIGNyYyBtaXNtYXRjaFwiLHIubW9kZT0zMDticmVha31mPWg9MH1yLmhlYWQmJihyLmhlYWQuaGNyYz1yLmZsYWdzPj45JjEsci5oZWFkLmRvbmU9ITApLGUuYWRsZXI9ci5jaGVjaz0wLHIubW9kZT0xMjticmVhaztjYXNlIDEwOmZvcig7ZjwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fWUuYWRsZXI9ci5jaGVjaz1MKGgpLGY9aD0wLHIubW9kZT0xMTtjYXNlIDExOmlmKDA9PT1yLmhhdmVkaWN0KXJldHVybiBlLm5leHRfb3V0PWEsZS5hdmFpbF9vdXQ9dSxlLm5leHRfaW49cyxlLmF2YWlsX2luPW8sci5ob2xkPWgsci5iaXRzPWYsMjtlLmFkbGVyPXIuY2hlY2s9MSxyLm1vZGU9MTI7Y2FzZSAxMjppZig1PT09dHx8Nj09PXQpYnJlYWsgZTtjYXNlIDEzOmlmKHIubGFzdCl7aD4+Pj03JmYsZi09NyZmLHIubW9kZT0yNzticmVha31mb3IoO2Y8Mzspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fXN3aXRjaChyLmxhc3Q9MSZoLGYtPTEsMyYoaD4+Pj0xKSl7Y2FzZSAwOnIubW9kZT0xNDticmVhaztjYXNlIDE6aWYoaihyKSxyLm1vZGU9MjAsNiE9PXQpYnJlYWs7aD4+Pj0yLGYtPTI7YnJlYWsgZTtjYXNlIDI6ci5tb2RlPTE3O2JyZWFrO2Nhc2UgMzplLm1zZz1cImludmFsaWQgYmxvY2sgdHlwZVwiLHIubW9kZT0zMH1oPj4+PTIsZi09MjticmVhaztjYXNlIDE0OmZvcihoPj4+PTcmZixmLT03JmY7ZjwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fWlmKCg2NTUzNSZoKSE9KGg+Pj4xNl42NTUzNSkpe2UubXNnPVwiaW52YWxpZCBzdG9yZWQgYmxvY2sgbGVuZ3Roc1wiLHIubW9kZT0zMDticmVha31pZihyLmxlbmd0aD02NTUzNSZoLGY9aD0wLHIubW9kZT0xNSw2PT09dClicmVhayBlO2Nhc2UgMTU6ci5tb2RlPTE2O2Nhc2UgMTY6aWYoYz1yLmxlbmd0aCl7aWYobzxjJiYoYz1vKSx1PGMmJihjPXUpLDA9PT1jKWJyZWFrIGU7SS5hcnJheVNldChpLG4scyxjLGEpLG8tPWMscys9Yyx1LT1jLGErPWMsci5sZW5ndGgtPWM7YnJlYWt9ci5tb2RlPTEyO2JyZWFrO2Nhc2UgMTc6Zm9yKDtmPDE0Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0saCs9bltzKytdPDxmLGYrPTh9aWYoci5ubGVuPTI1NysoMzEmaCksaD4+Pj01LGYtPTUsci5uZGlzdD0xKygzMSZoKSxoPj4+PTUsZi09NSxyLm5jb2RlPTQrKDE1JmgpLGg+Pj49NCxmLT00LDI4NjxyLm5sZW58fDMwPHIubmRpc3Qpe2UubXNnPVwidG9vIG1hbnkgbGVuZ3RoIG9yIGRpc3RhbmNlIHN5bWJvbHNcIixyLm1vZGU9MzA7YnJlYWt9ci5oYXZlPTAsci5tb2RlPTE4O2Nhc2UgMTg6Zm9yKDtyLmhhdmU8ci5uY29kZTspe2Zvcig7ZjwzOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0saCs9bltzKytdPDxmLGYrPTh9ci5sZW5zW0Fbci5oYXZlKytdXT03JmgsaD4+Pj0zLGYtPTN9Zm9yKDtyLmhhdmU8MTk7KXIubGVuc1tBW3IuaGF2ZSsrXV09MDtpZihyLmxlbmNvZGU9ci5sZW5keW4sci5sZW5iaXRzPTcsUz17Yml0czpyLmxlbmJpdHN9LHg9UigwLHIubGVucywwLDE5LHIubGVuY29kZSwwLHIud29yayxTKSxyLmxlbmJpdHM9Uy5iaXRzLHgpe2UubXNnPVwiaW52YWxpZCBjb2RlIGxlbmd0aHMgc2V0XCIsci5tb2RlPTMwO2JyZWFrfXIuaGF2ZT0wLHIubW9kZT0xOTtjYXNlIDE5OmZvcig7ci5oYXZlPHIubmxlbityLm5kaXN0Oyl7Zm9yKDtnPShFPXIubGVuY29kZVtoJigxPDxyLmxlbmJpdHMpLTFdKT4+PjE2JjI1NSx2PTY1NTM1JkUsISgoXz1FPj4+MjQpPD1mKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fWlmKHY8MTYpaD4+Pj1fLGYtPV8sci5sZW5zW3IuaGF2ZSsrXT12O2Vsc2V7aWYoMTY9PT12KXtmb3Ioej1fKzI7Zjx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0saCs9bltzKytdPDxmLGYrPTh9aWYoaD4+Pj1fLGYtPV8sMD09PXIuaGF2ZSl7ZS5tc2c9XCJpbnZhbGlkIGJpdCBsZW5ndGggcmVwZWF0XCIsci5tb2RlPTMwO2JyZWFrfWs9ci5sZW5zW3IuaGF2ZS0xXSxjPTMrKDMmaCksaD4+Pj0yLGYtPTJ9ZWxzZSBpZigxNz09PXYpe2Zvcih6PV8rMztmPHo7KXtpZigwPT09bylicmVhayBlO28tLSxoKz1uW3MrK108PGYsZis9OH1mLT1fLGs9MCxjPTMrKDcmKGg+Pj49XykpLGg+Pj49MyxmLT0zfWVsc2V7Zm9yKHo9Xys3O2Y8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fWYtPV8saz0wLGM9MTErKDEyNyYoaD4+Pj1fKSksaD4+Pj03LGYtPTd9aWYoci5oYXZlK2M+ci5ubGVuK3IubmRpc3Qpe2UubXNnPVwiaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdFwiLHIubW9kZT0zMDticmVha31mb3IoO2MtLTspci5sZW5zW3IuaGF2ZSsrXT1rfX1pZigzMD09PXIubW9kZSlicmVhaztpZigwPT09ci5sZW5zWzI1Nl0pe2UubXNnPVwiaW52YWxpZCBjb2RlIC0tIG1pc3NpbmcgZW5kLW9mLWJsb2NrXCIsci5tb2RlPTMwO2JyZWFrfWlmKHIubGVuYml0cz05LFM9e2JpdHM6ci5sZW5iaXRzfSx4PVIoRCxyLmxlbnMsMCxyLm5sZW4sci5sZW5jb2RlLDAsci53b3JrLFMpLHIubGVuYml0cz1TLmJpdHMseCl7ZS5tc2c9XCJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RocyBzZXRcIixyLm1vZGU9MzA7YnJlYWt9aWYoci5kaXN0Yml0cz02LHIuZGlzdGNvZGU9ci5kaXN0ZHluLFM9e2JpdHM6ci5kaXN0Yml0c30seD1SKEYsci5sZW5zLHIubmxlbixyLm5kaXN0LHIuZGlzdGNvZGUsMCxyLndvcmssUyksci5kaXN0Yml0cz1TLmJpdHMseCl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlcyBzZXRcIixyLm1vZGU9MzA7YnJlYWt9aWYoci5tb2RlPTIwLDY9PT10KWJyZWFrIGU7Y2FzZSAyMDpyLm1vZGU9MjE7Y2FzZSAyMTppZig2PD1vJiYyNTg8PXUpe2UubmV4dF9vdXQ9YSxlLmF2YWlsX291dD11LGUubmV4dF9pbj1zLGUuYXZhaWxfaW49byxyLmhvbGQ9aCxyLmJpdHM9ZixUKGUsZCksYT1lLm5leHRfb3V0LGk9ZS5vdXRwdXQsdT1lLmF2YWlsX291dCxzPWUubmV4dF9pbixuPWUuaW5wdXQsbz1lLmF2YWlsX2luLGg9ci5ob2xkLGY9ci5iaXRzLDEyPT09ci5tb2RlJiYoci5iYWNrPS0xKTticmVha31mb3Ioci5iYWNrPTA7Zz0oRT1yLmxlbmNvZGVbaCYoMTw8ci5sZW5iaXRzKS0xXSk+Pj4xNiYyNTUsdj02NTUzNSZFLCEoKF89RT4+PjI0KTw9Zik7KXtpZigwPT09bylicmVhayBlO28tLSxoKz1uW3MrK108PGYsZis9OH1pZihnJiYwPT0oMjQwJmcpKXtmb3IoYj1fLHc9Zyx5PXY7Zz0oRT1yLmxlbmNvZGVbeSsoKGgmKDE8PGIrdyktMSk+PmIpXSk+Pj4xNiYyNTUsdj02NTUzNSZFLCEoYisoXz1FPj4+MjQpPD1mKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fWg+Pj49YixmLT1iLHIuYmFjays9Yn1pZihoPj4+PV8sZi09XyxyLmJhY2srPV8sci5sZW5ndGg9diwwPT09Zyl7ci5tb2RlPTI2O2JyZWFrfWlmKDMyJmcpe3IuYmFjaz0tMSxyLm1vZGU9MTI7YnJlYWt9aWYoNjQmZyl7ZS5tc2c9XCJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGVcIixyLm1vZGU9MzA7YnJlYWt9ci5leHRyYT0xNSZnLHIubW9kZT0yMjtjYXNlIDIyOmlmKHIuZXh0cmEpe2Zvcih6PXIuZXh0cmE7Zjx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0saCs9bltzKytdPDxmLGYrPTh9ci5sZW5ndGgrPWgmKDE8PHIuZXh0cmEpLTEsaD4+Pj1yLmV4dHJhLGYtPXIuZXh0cmEsci5iYWNrKz1yLmV4dHJhfXIud2FzPXIubGVuZ3RoLHIubW9kZT0yMztjYXNlIDIzOmZvcig7Zz0oRT1yLmRpc3Rjb2RlW2gmKDE8PHIuZGlzdGJpdHMpLTFdKT4+PjE2JjI1NSx2PTY1NTM1JkUsISgoXz1FPj4+MjQpPD1mKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fWlmKDA9PSgyNDAmZykpe2ZvcihiPV8sdz1nLHk9djtnPShFPXIuZGlzdGNvZGVbeSsoKGgmKDE8PGIrdyktMSk+PmIpXSk+Pj4xNiYyNTUsdj02NTUzNSZFLCEoYisoXz1FPj4+MjQpPD1mKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLGgrPW5bcysrXTw8ZixmKz04fWg+Pj49YixmLT1iLHIuYmFjays9Yn1pZihoPj4+PV8sZi09XyxyLmJhY2srPV8sNjQmZyl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIGNvZGVcIixyLm1vZGU9MzA7YnJlYWt9ci5vZmZzZXQ9dixyLmV4dHJhPTE1Jmcsci5tb2RlPTI0O2Nhc2UgMjQ6aWYoci5leHRyYSl7Zm9yKHo9ci5leHRyYTtmPHo7KXtpZigwPT09bylicmVhayBlO28tLSxoKz1uW3MrK108PGYsZis9OH1yLm9mZnNldCs9aCYoMTw8ci5leHRyYSktMSxoPj4+PXIuZXh0cmEsZi09ci5leHRyYSxyLmJhY2srPXIuZXh0cmF9aWYoci5vZmZzZXQ+ci5kbWF4KXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrXCIsci5tb2RlPTMwO2JyZWFrfXIubW9kZT0yNTtjYXNlIDI1OmlmKDA9PT11KWJyZWFrIGU7aWYoYz1kLXUsci5vZmZzZXQ+Yyl7aWYoKGM9ci5vZmZzZXQtYyk+ci53aGF2ZSYmci5zYW5lKXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrXCIsci5tb2RlPTMwO2JyZWFrfXA9Yz5yLnduZXh0PyhjLT1yLnduZXh0LHIud3NpemUtYyk6ci53bmV4dC1jLGM+ci5sZW5ndGgmJihjPXIubGVuZ3RoKSxtPXIud2luZG93fWVsc2UgbT1pLHA9YS1yLm9mZnNldCxjPXIubGVuZ3RoO2Zvcih1PGMmJihjPXUpLHUtPWMsci5sZW5ndGgtPWM7aVthKytdPW1bcCsrXSwtLWM7KTswPT09ci5sZW5ndGgmJihyLm1vZGU9MjEpO2JyZWFrO2Nhc2UgMjY6aWYoMD09PXUpYnJlYWsgZTtpW2ErK109ci5sZW5ndGgsdS0tLHIubW9kZT0yMTticmVhaztjYXNlIDI3OmlmKHIud3JhcCl7Zm9yKDtmPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0saHw9bltzKytdPDxmLGYrPTh9aWYoZC09dSxlLnRvdGFsX291dCs9ZCxyLnRvdGFsKz1kLGQmJihlLmFkbGVyPXIuY2hlY2s9ci5mbGFncz9CKHIuY2hlY2ssaSxkLGEtZCk6TyhyLmNoZWNrLGksZCxhLWQpKSxkPXUsKHIuZmxhZ3M/aDpMKGgpKSE9PXIuY2hlY2spe2UubXNnPVwiaW5jb3JyZWN0IGRhdGEgY2hlY2tcIixyLm1vZGU9MzA7YnJlYWt9Zj1oPTB9ci5tb2RlPTI4O2Nhc2UgMjg6aWYoci53cmFwJiZyLmZsYWdzKXtmb3IoO2Y8MzI7KXtpZigwPT09bylicmVhayBlO28tLSxoKz1uW3MrK108PGYsZis9OH1pZihoIT09KDQyOTQ5NjcyOTUmci50b3RhbCkpe2UubXNnPVwiaW5jb3JyZWN0IGxlbmd0aCBjaGVja1wiLHIubW9kZT0zMDticmVha31mPWg9MH1yLm1vZGU9Mjk7Y2FzZSAyOTp4PTE7YnJlYWsgZTtjYXNlIDMwOng9LTM7YnJlYWsgZTtjYXNlIDMxOnJldHVybi00O2Nhc2UgMzI6ZGVmYXVsdDpyZXR1cm4gVX1yZXR1cm4gZS5uZXh0X291dD1hLGUuYXZhaWxfb3V0PXUsZS5uZXh0X2luPXMsZS5hdmFpbF9pbj1vLHIuaG9sZD1oLHIuYml0cz1mLChyLndzaXplfHxkIT09ZS5hdmFpbF9vdXQmJnIubW9kZTwzMCYmKHIubW9kZTwyN3x8NCE9PXQpKSYmWihlLGUub3V0cHV0LGUubmV4dF9vdXQsZC1lLmF2YWlsX291dCk/KHIubW9kZT0zMSwtNCk6KGwtPWUuYXZhaWxfaW4sZC09ZS5hdmFpbF9vdXQsZS50b3RhbF9pbis9bCxlLnRvdGFsX291dCs9ZCxyLnRvdGFsKz1kLHIud3JhcCYmZCYmKGUuYWRsZXI9ci5jaGVjaz1yLmZsYWdzP0Ioci5jaGVjayxpLGQsZS5uZXh0X291dC1kKTpPKHIuY2hlY2ssaSxkLGUubmV4dF9vdXQtZCkpLGUuZGF0YV90eXBlPXIuYml0cysoci5sYXN0PzY0OjApKygxMj09PXIubW9kZT8xMjg6MCkrKDIwPT09ci5tb2RlfHwxNT09PXIubW9kZT8yNTY6MCksKDA9PWwmJjA9PT1kfHw0PT09dCkmJng9PT1OJiYoeD0tNSkseCl9LHIuaW5mbGF0ZUVuZD1mdW5jdGlvbihlKXtpZighZXx8IWUuc3RhdGUpcmV0dXJuIFU7dmFyIHQ9ZS5zdGF0ZTtyZXR1cm4gdC53aW5kb3cmJih0LndpbmRvdz1udWxsKSxlLnN0YXRlPW51bGwsTn0sci5pbmZsYXRlR2V0SGVhZGVyPWZ1bmN0aW9uKGUsdCl7dmFyIHI7cmV0dXJuIGUmJmUuc3RhdGU/MD09KDImKHI9ZS5zdGF0ZSkud3JhcCk/VTooKHIuaGVhZD10KS5kb25lPSExLE4pOlV9LHIuaW5mbGF0ZVNldERpY3Rpb25hcnk9ZnVuY3Rpb24oZSx0KXt2YXIgcixuPXQubGVuZ3RoO3JldHVybiBlJiZlLnN0YXRlPzAhPT0ocj1lLnN0YXRlKS53cmFwJiYxMSE9PXIubW9kZT9VOjExPT09ci5tb2RlJiZPKDEsdCxuLDApIT09ci5jaGVjaz8tMzpaKGUsdCxuLG4pPyhyLm1vZGU9MzEsLTQpOihyLmhhdmVkaWN0PTEsTik6VX0sci5pbmZsYXRlSW5mbz1cInBha28gaW5mbGF0ZSAoZnJvbSBOb2RlY2EgcHJvamVjdClcIn0se1wiLi4vdXRpbHMvY29tbW9uXCI6NDEsXCIuL2FkbGVyMzJcIjo0MyxcIi4vY3JjMzJcIjo0NSxcIi4vaW5mZmFzdFwiOjQ4LFwiLi9pbmZ0cmVlc1wiOjUwfV0sNTA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgRD1lKFwiLi4vdXRpbHMvY29tbW9uXCIpLEY9WzMsNCw1LDYsNyw4LDksMTAsMTEsMTMsMTUsMTcsMTksMjMsMjcsMzEsMzUsNDMsNTEsNTksNjcsODMsOTksMTE1LDEzMSwxNjMsMTk1LDIyNywyNTgsMCwwXSxOPVsxNiwxNiwxNiwxNiwxNiwxNiwxNiwxNiwxNywxNywxNywxNywxOCwxOCwxOCwxOCwxOSwxOSwxOSwxOSwyMCwyMCwyMCwyMCwyMSwyMSwyMSwyMSwxNiw3Miw3OF0sVT1bMSwyLDMsNCw1LDcsOSwxMywxNywyNSwzMyw0OSw2NSw5NywxMjksMTkzLDI1NywzODUsNTEzLDc2OSwxMDI1LDE1MzcsMjA0OSwzMDczLDQwOTcsNjE0NSw4MTkzLDEyMjg5LDE2Mzg1LDI0NTc3LDAsMF0sUD1bMTYsMTYsMTYsMTYsMTcsMTcsMTgsMTgsMTksMTksMjAsMjAsMjEsMjEsMjIsMjIsMjMsMjMsMjQsMjQsMjUsMjUsMjYsMjYsMjcsMjcsMjgsMjgsMjksMjksNjQsNjRdO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQscixuLGkscyxhLG8pe3ZhciB1LGgsZixsLGQsYyxwLG0sXyxnPW8uYml0cyx2PTAsYj0wLHc9MCx5PTAsaz0wLHg9MCxTPTAsej0wLEU9MCxDPTAsQT1udWxsLEk9MCxPPW5ldyBELkJ1ZjE2KDE2KSxCPW5ldyBELkJ1ZjE2KDE2KSxUPW51bGwsUj0wO2Zvcih2PTA7djw9MTU7disrKU9bdl09MDtmb3IoYj0wO2I8bjtiKyspT1t0W3IrYl1dKys7Zm9yKGs9Zyx5PTE1OzE8PXkmJjA9PT1PW3ldO3ktLSk7aWYoeTxrJiYoaz15KSwwPT09eSlyZXR1cm4gaVtzKytdPTIwOTcxNTIwLGlbcysrXT0yMDk3MTUyMCxvLmJpdHM9MSwwO2Zvcih3PTE7dzx5JiYwPT09T1t3XTt3KyspO2ZvcihrPHcmJihrPXcpLHY9ej0xO3Y8PTE1O3YrKylpZih6PDw9MSwoei09T1t2XSk8MClyZXR1cm4tMTtpZigwPHomJigwPT09ZXx8MSE9PXkpKXJldHVybi0xO2ZvcihCWzFdPTAsdj0xO3Y8MTU7disrKUJbdisxXT1CW3ZdK09bdl07Zm9yKGI9MDtiPG47YisrKTAhPT10W3IrYl0mJihhW0JbdFtyK2JdXSsrXT1iKTtpZihjPTA9PT1lPyhBPVQ9YSwxOSk6MT09PWU/KEE9RixJLT0yNTcsVD1OLFItPTI1NywyNTYpOihBPVUsVD1QLC0xKSx2PXcsZD1zLFM9Yj1DPTAsZj0tMSxsPShFPTE8PCh4PWspKS0xLDE9PT1lJiY4NTI8RXx8Mj09PWUmJjU5MjxFKXJldHVybiAxO2Zvcig7Oyl7Zm9yKHA9di1TLF89YVtiXTxjPyhtPTAsYVtiXSk6YVtiXT5jPyhtPVRbUithW2JdXSxBW0krYVtiXV0pOihtPTk2LDApLHU9MTw8di1TLHc9aD0xPDx4O2lbZCsoQz4+UykrKGgtPXUpXT1wPDwyNHxtPDwxNnxffDAsMCE9PWg7KTtmb3IodT0xPDx2LTE7QyZ1Oyl1Pj49MTtpZigwIT09dT8oQyY9dS0xLEMrPXUpOkM9MCxiKyssMD09LS1PW3ZdKXtpZih2PT09eSlicmVhazt2PXRbcithW2JdXX1pZihrPHYmJihDJmwpIT09Zil7Zm9yKDA9PT1TJiYoUz1rKSxkKz13LHo9MTw8KHg9di1TKTt4K1M8eSYmISgoei09T1t4K1NdKTw9MCk7KXgrKyx6PDw9MTtpZihFKz0xPDx4LDE9PT1lJiY4NTI8RXx8Mj09PWUmJjU5MjxFKXJldHVybiAxO2lbZj1DJmxdPWs8PDI0fHg8PDE2fGQtc3wwfX1yZXR1cm4gMCE9PUMmJihpW2QrQ109di1TPDwyNHw2NDw8MTZ8MCksby5iaXRzPWssMH19LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxfV0sNTE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ezI6XCJuZWVkIGRpY3Rpb25hcnlcIiwxOlwic3RyZWFtIGVuZFwiLDA6XCJcIixcIi0xXCI6XCJmaWxlIGVycm9yXCIsXCItMlwiOlwic3RyZWFtIGVycm9yXCIsXCItM1wiOlwiZGF0YSBlcnJvclwiLFwiLTRcIjpcImluc3VmZmljaWVudCBtZW1vcnlcIixcIi01XCI6XCJidWZmZXIgZXJyb3JcIixcIi02XCI6XCJpbmNvbXBhdGlibGUgdmVyc2lvblwifX0se31dLDUyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89ZShcIi4uL3V0aWxzL2NvbW1vblwiKTtmdW5jdGlvbiBuKGUpe2Zvcih2YXIgdD1lLmxlbmd0aDswPD0tLXQ7KWVbdF09MH12YXIgXz0xNSxpPTE2LHU9WzAsMCwwLDAsMCwwLDAsMCwxLDEsMSwxLDIsMiwyLDIsMywzLDMsMyw0LDQsNCw0LDUsNSw1LDUsMF0saD1bMCwwLDAsMCwxLDEsMiwyLDMsMyw0LDQsNSw1LDYsNiw3LDcsOCw4LDksOSwxMCwxMCwxMSwxMSwxMiwxMiwxMywxM10sYT1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyLDMsN10sZj1bMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV0sbD1uZXcgQXJyYXkoNTc2KTtuKGwpO3ZhciBkPW5ldyBBcnJheSg2MCk7bihkKTt2YXIgYz1uZXcgQXJyYXkoNTEyKTtuKGMpO3ZhciBwPW5ldyBBcnJheSgyNTYpO24ocCk7dmFyIG09bmV3IEFycmF5KDI5KTtuKG0pO3ZhciBnLHYsYix3PW5ldyBBcnJheSgzMCk7ZnVuY3Rpb24geShlLHQscixuLGkpe3RoaXMuc3RhdGljX3RyZWU9ZSx0aGlzLmV4dHJhX2JpdHM9dCx0aGlzLmV4dHJhX2Jhc2U9cix0aGlzLmVsZW1zPW4sdGhpcy5tYXhfbGVuZ3RoPWksdGhpcy5oYXNfc3RyZWU9ZSYmZS5sZW5ndGh9ZnVuY3Rpb24gcyhlLHQpe3RoaXMuZHluX3RyZWU9ZSx0aGlzLm1heF9jb2RlPTAsdGhpcy5zdGF0X2Rlc2M9dH1mdW5jdGlvbiBrKGUpe3JldHVybiBlPDI1Nj9jW2VdOmNbMjU2KyhlPj4+NyldfWZ1bmN0aW9uIHgoZSx0KXtlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT0yNTUmdCxlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT10Pj4+OCYyNTV9ZnVuY3Rpb24gUyhlLHQscil7ZS5iaV92YWxpZD5pLXI/KGUuYmlfYnVmfD10PDxlLmJpX3ZhbGlkJjY1NTM1LHgoZSxlLmJpX2J1ZiksZS5iaV9idWY9dD4+aS1lLmJpX3ZhbGlkLGUuYmlfdmFsaWQrPXItaSk6KGUuYmlfYnVmfD10PDxlLmJpX3ZhbGlkJjY1NTM1LGUuYmlfdmFsaWQrPXIpfWZ1bmN0aW9uIHooZSx0LHIpe1MoZSxyWzIqdF0sclsyKnQrMV0pfWZ1bmN0aW9uIEUoZSx0KXtmb3IodmFyIHI9MDtyfD0xJmUsZT4+Pj0xLHI8PD0xLDA8LS10Oyk7cmV0dXJuIHI+Pj4xfWZ1bmN0aW9uIEMoZSx0LHIpe3ZhciBuLGkscz1uZXcgQXJyYXkoXysxKSxhPTA7Zm9yKG49MTtuPD1fO24rKylzW25dPWE9YStyW24tMV08PDE7Zm9yKGk9MDtpPD10O2krKyl7dmFyIG89ZVsyKmkrMV07MCE9PW8mJihlWzIqaV09RShzW29dKyssbykpfX1mdW5jdGlvbiBBKGUpe3ZhciB0O2Zvcih0PTA7dDwyODY7dCsrKWUuZHluX2x0cmVlWzIqdF09MDtmb3IodD0wO3Q8MzA7dCsrKWUuZHluX2R0cmVlWzIqdF09MDtmb3IodD0wO3Q8MTk7dCsrKWUuYmxfdHJlZVsyKnRdPTA7ZS5keW5fbHRyZWVbNTEyXT0xLGUub3B0X2xlbj1lLnN0YXRpY19sZW49MCxlLmxhc3RfbGl0PWUubWF0Y2hlcz0wfWZ1bmN0aW9uIEkoZSl7ODxlLmJpX3ZhbGlkP3goZSxlLmJpX2J1Zik6MDxlLmJpX3ZhbGlkJiYoZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109ZS5iaV9idWYpLGUuYmlfYnVmPTAsZS5iaV92YWxpZD0wfWZ1bmN0aW9uIE8oZSx0LHIsbil7dmFyIGk9Mip0LHM9MipyO3JldHVybiBlW2ldPGVbc118fGVbaV09PT1lW3NdJiZuW3RdPD1uW3JdfWZ1bmN0aW9uIEIoZSx0LHIpe2Zvcih2YXIgbj1lLmhlYXBbcl0saT1yPDwxO2k8PWUuaGVhcF9sZW4mJihpPGUuaGVhcF9sZW4mJk8odCxlLmhlYXBbaSsxXSxlLmhlYXBbaV0sZS5kZXB0aCkmJmkrKywhTyh0LG4sZS5oZWFwW2ldLGUuZGVwdGgpKTspZS5oZWFwW3JdPWUuaGVhcFtpXSxyPWksaTw8PTE7ZS5oZWFwW3JdPW59ZnVuY3Rpb24gVChlLHQscil7dmFyIG4saSxzLGEsbz0wO2lmKDAhPT1lLmxhc3RfbGl0KWZvcig7bj1lLnBlbmRpbmdfYnVmW2UuZF9idWYrMipvXTw8OHxlLnBlbmRpbmdfYnVmW2UuZF9idWYrMipvKzFdLGk9ZS5wZW5kaW5nX2J1ZltlLmxfYnVmK29dLG8rKywwPT09bj96KGUsaSx0KTooeihlLChzPXBbaV0pKzI1NisxLHQpLDAhPT0oYT11W3NdKSYmUyhlLGktPW1bc10sYSkseihlLHM9aygtLW4pLHIpLDAhPT0oYT1oW3NdKSYmUyhlLG4tPXdbc10sYSkpLG88ZS5sYXN0X2xpdDspO3ooZSwyNTYsdCl9ZnVuY3Rpb24gUihlLHQpe3ZhciByLG4saSxzPXQuZHluX3RyZWUsYT10LnN0YXRfZGVzYy5zdGF0aWNfdHJlZSxvPXQuc3RhdF9kZXNjLmhhc19zdHJlZSx1PXQuc3RhdF9kZXNjLmVsZW1zLGg9LTE7Zm9yKGUuaGVhcF9sZW49MCxlLmhlYXBfbWF4PTU3MyxyPTA7cjx1O3IrKykwIT09c1syKnJdPyhlLmhlYXBbKytlLmhlYXBfbGVuXT1oPXIsZS5kZXB0aFtyXT0wKTpzWzIqcisxXT0wO2Zvcig7ZS5oZWFwX2xlbjwyOylzWzIqKGk9ZS5oZWFwWysrZS5oZWFwX2xlbl09aDwyPysraDowKV09MSxlLmRlcHRoW2ldPTAsZS5vcHRfbGVuLS0sbyYmKGUuc3RhdGljX2xlbi09YVsyKmkrMV0pO2Zvcih0Lm1heF9jb2RlPWgscj1lLmhlYXBfbGVuPj4xOzE8PXI7ci0tKUIoZSxzLHIpO2ZvcihpPXU7cj1lLmhlYXBbMV0sZS5oZWFwWzFdPWUuaGVhcFtlLmhlYXBfbGVuLS1dLEIoZSxzLDEpLG49ZS5oZWFwWzFdLGUuaGVhcFstLWUuaGVhcF9tYXhdPXIsZS5oZWFwWy0tZS5oZWFwX21heF09bixzWzIqaV09c1syKnJdK3NbMipuXSxlLmRlcHRoW2ldPShlLmRlcHRoW3JdPj1lLmRlcHRoW25dP2UuZGVwdGhbcl06ZS5kZXB0aFtuXSkrMSxzWzIqcisxXT1zWzIqbisxXT1pLGUuaGVhcFsxXT1pKyssQihlLHMsMSksMjw9ZS5oZWFwX2xlbjspO2UuaGVhcFstLWUuaGVhcF9tYXhdPWUuaGVhcFsxXSxmdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyx1PXQuZHluX3RyZWUsaD10Lm1heF9jb2RlLGY9dC5zdGF0X2Rlc2Muc3RhdGljX3RyZWUsbD10LnN0YXRfZGVzYy5oYXNfc3RyZWUsZD10LnN0YXRfZGVzYy5leHRyYV9iaXRzLGM9dC5zdGF0X2Rlc2MuZXh0cmFfYmFzZSxwPXQuc3RhdF9kZXNjLm1heF9sZW5ndGgsbT0wO2ZvcihzPTA7czw9XztzKyspZS5ibF9jb3VudFtzXT0wO2Zvcih1WzIqZS5oZWFwW2UuaGVhcF9tYXhdKzFdPTAscj1lLmhlYXBfbWF4KzE7cjw1NzM7cisrKXA8KHM9dVsyKnVbMioobj1lLmhlYXBbcl0pKzFdKzFdKzEpJiYocz1wLG0rKyksdVsyKm4rMV09cyxoPG58fChlLmJsX2NvdW50W3NdKyssYT0wLGM8PW4mJihhPWRbbi1jXSksbz11WzIqbl0sZS5vcHRfbGVuKz1vKihzK2EpLGwmJihlLnN0YXRpY19sZW4rPW8qKGZbMipuKzFdK2EpKSk7aWYoMCE9PW0pe2Rve2ZvcihzPXAtMTswPT09ZS5ibF9jb3VudFtzXTspcy0tO2UuYmxfY291bnRbc10tLSxlLmJsX2NvdW50W3MrMV0rPTIsZS5ibF9jb3VudFtwXS0tLG0tPTJ9d2hpbGUoMDxtKTtmb3Iocz1wOzAhPT1zO3MtLSlmb3Iobj1lLmJsX2NvdW50W3NdOzAhPT1uOyloPChpPWUuaGVhcFstLXJdKXx8KHVbMippKzFdIT09cyYmKGUub3B0X2xlbis9KHMtdVsyKmkrMV0pKnVbMippXSx1WzIqaSsxXT1zKSxuLS0pfX0oZSx0KSxDKHMsaCxlLmJsX2NvdW50KX1mdW5jdGlvbiBEKGUsdCxyKXt2YXIgbixpLHM9LTEsYT10WzFdLG89MCx1PTcsaD00O2ZvcigwPT09YSYmKHU9MTM4LGg9MyksdFsyKihyKzEpKzFdPTY1NTM1LG49MDtuPD1yO24rKylpPWEsYT10WzIqKG4rMSkrMV0sKytvPHUmJmk9PT1hfHwobzxoP2UuYmxfdHJlZVsyKmldKz1vOjAhPT1pPyhpIT09cyYmZS5ibF90cmVlWzIqaV0rKyxlLmJsX3RyZWVbMzJdKyspOm88PTEwP2UuYmxfdHJlZVszNF0rKzplLmJsX3RyZWVbMzZdKysscz1pLGg9KG89MCk9PT1hPyh1PTEzOCwzKTppPT09YT8odT02LDMpOih1PTcsNCkpfWZ1bmN0aW9uIEYoZSx0LHIpe3ZhciBuLGkscz0tMSxhPXRbMV0sbz0wLHU9NyxoPTQ7Zm9yKDA9PT1hJiYodT0xMzgsaD0zKSxuPTA7bjw9cjtuKyspaWYoaT1hLGE9dFsyKihuKzEpKzFdLCEoKytvPHUmJmk9PT1hKSl7aWYobzxoKWZvcig7eihlLGksZS5ibF90cmVlKSwwIT0tLW87KTtlbHNlIDAhPT1pPyhpIT09cyYmKHooZSxpLGUuYmxfdHJlZSksby0tKSx6KGUsMTYsZS5ibF90cmVlKSxTKGUsby0zLDIpKTpvPD0xMD8oeihlLDE3LGUuYmxfdHJlZSksUyhlLG8tMywzKSk6KHooZSwxOCxlLmJsX3RyZWUpLFMoZSxvLTExLDcpKTtzPWksaD0obz0wKT09PWE/KHU9MTM4LDMpOmk9PT1hPyh1PTYsMyk6KHU9Nyw0KX19bih3KTt2YXIgTj0hMTtmdW5jdGlvbiBVKGUsdCxyLG4pe3ZhciBpLHMsYTtTKGUsMCsobj8xOjApLDMpLHM9dCxhPXIsSShpPWUpLHgoaSxhKSx4KGksfmEpLG8uYXJyYXlTZXQoaS5wZW5kaW5nX2J1ZixpLndpbmRvdyxzLGEsaS5wZW5kaW5nKSxpLnBlbmRpbmcrPWF9ci5fdHJfaW5pdD1mdW5jdGlvbihlKXtOfHwoZnVuY3Rpb24oKXt2YXIgZSx0LHIsbixpLHM9bmV3IEFycmF5KF8rMSk7Zm9yKG49cj0wO248Mjg7bisrKWZvcihtW25dPXIsZT0wO2U8MTw8dVtuXTtlKyspcFtyKytdPW47Zm9yKHBbci0xXT1uLG49aT0wO248MTY7bisrKWZvcih3W25dPWksZT0wO2U8MTw8aFtuXTtlKyspY1tpKytdPW47Zm9yKGk+Pj03O248MzA7bisrKWZvcih3W25dPWk8PDcsZT0wO2U8MTw8aFtuXS03O2UrKyljWzI1NitpKytdPW47Zm9yKHQ9MDt0PD1fO3QrKylzW3RdPTA7Zm9yKGU9MDtlPD0xNDM7KWxbMiplKzFdPTgsZSsrLHNbOF0rKztmb3IoO2U8PTI1NTspbFsyKmUrMV09OSxlKyssc1s5XSsrO2Zvcig7ZTw9Mjc5OylsWzIqZSsxXT03LGUrKyxzWzddKys7Zm9yKDtlPD0yODc7KWxbMiplKzFdPTgsZSsrLHNbOF0rKztmb3IoQyhsLDI4NyxzKSxlPTA7ZTwzMDtlKyspZFsyKmUrMV09NSxkWzIqZV09RShlLDUpO2c9bmV3IHkobCx1LDI1NywyODYsXyksdj1uZXcgeShkLGgsMCwzMCxfKSxiPW5ldyB5KG5ldyBBcnJheSgwKSxhLDAsMTksNyl9KCksTj0hMCksZS5sX2Rlc2M9bmV3IHMoZS5keW5fbHRyZWUsZyksZS5kX2Rlc2M9bmV3IHMoZS5keW5fZHRyZWUsdiksZS5ibF9kZXNjPW5ldyBzKGUuYmxfdHJlZSxiKSxlLmJpX2J1Zj0wLGUuYmlfdmFsaWQ9MCxBKGUpfSxyLl90cl9zdG9yZWRfYmxvY2s9VSxyLl90cl9mbHVzaF9ibG9jaz1mdW5jdGlvbihlLHQscixuKXt2YXIgaSxzLGE9MDswPGUubGV2ZWw/KDI9PT1lLnN0cm0uZGF0YV90eXBlJiYoZS5zdHJtLmRhdGFfdHlwZT1mdW5jdGlvbihlKXt2YXIgdCxyPTQwOTM2MjQ0NDc7Zm9yKHQ9MDt0PD0zMTt0Kysscj4+Pj0xKWlmKDEmciYmMCE9PWUuZHluX2x0cmVlWzIqdF0pcmV0dXJuIDA7aWYoMCE9PWUuZHluX2x0cmVlWzE4XXx8MCE9PWUuZHluX2x0cmVlWzIwXXx8MCE9PWUuZHluX2x0cmVlWzI2XSlyZXR1cm4gMTtmb3IodD0zMjt0PDI1Njt0KyspaWYoMCE9PWUuZHluX2x0cmVlWzIqdF0pcmV0dXJuIDE7cmV0dXJuIDB9KGUpKSxSKGUsZS5sX2Rlc2MpLFIoZSxlLmRfZGVzYyksYT1mdW5jdGlvbihlKXt2YXIgdDtmb3IoRChlLGUuZHluX2x0cmVlLGUubF9kZXNjLm1heF9jb2RlKSxEKGUsZS5keW5fZHRyZWUsZS5kX2Rlc2MubWF4X2NvZGUpLFIoZSxlLmJsX2Rlc2MpLHQ9MTg7Mzw9dCYmMD09PWUuYmxfdHJlZVsyKmZbdF0rMV07dC0tKTtyZXR1cm4gZS5vcHRfbGVuKz0zKih0KzEpKzUrNSs0LHR9KGUpLGk9ZS5vcHRfbGVuKzMrNz4+PjMsKHM9ZS5zdGF0aWNfbGVuKzMrNz4+PjMpPD1pJiYoaT1zKSk6aT1zPXIrNSxyKzQ8PWkmJi0xIT09dD9VKGUsdCxyLG4pOjQ9PT1lLnN0cmF0ZWd5fHxzPT09aT8oUyhlLDIrKG4/MTowKSwzKSxUKGUsbCxkKSk6KFMoZSw0KyhuPzE6MCksMyksZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk7Zm9yKFMoZSx0LTI1Nyw1KSxTKGUsci0xLDUpLFMoZSxuLTQsNCksaT0wO2k8bjtpKyspUyhlLGUuYmxfdHJlZVsyKmZbaV0rMV0sMyk7RihlLGUuZHluX2x0cmVlLHQtMSksRihlLGUuZHluX2R0cmVlLHItMSl9KGUsZS5sX2Rlc2MubWF4X2NvZGUrMSxlLmRfZGVzYy5tYXhfY29kZSsxLGErMSksVChlLGUuZHluX2x0cmVlLGUuZHluX2R0cmVlKSksQShlKSxuJiZJKGUpfSxyLl90cl90YWxseT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGUucGVuZGluZ19idWZbZS5kX2J1ZisyKmUubGFzdF9saXRdPXQ+Pj44JjI1NSxlLnBlbmRpbmdfYnVmW2UuZF9idWYrMiplLmxhc3RfbGl0KzFdPTI1NSZ0LGUucGVuZGluZ19idWZbZS5sX2J1ZitlLmxhc3RfbGl0XT0yNTUmcixlLmxhc3RfbGl0KyssMD09PXQ/ZS5keW5fbHRyZWVbMipyXSsrOihlLm1hdGNoZXMrKyx0LS0sZS5keW5fbHRyZWVbMioocFtyXSsyNTYrMSldKyssZS5keW5fZHRyZWVbMiprKHQpXSsrKSxlLmxhc3RfbGl0PT09ZS5saXRfYnVmc2l6ZS0xfSxyLl90cl9hbGlnbj1mdW5jdGlvbihlKXt2YXIgdDtTKGUsMiwzKSx6KGUsMjU2LGwpLDE2PT09KHQ9ZSkuYmlfdmFsaWQ/KHgodCx0LmJpX2J1ZiksdC5iaV9idWY9MCx0LmJpX3ZhbGlkPTApOjg8PXQuYmlfdmFsaWQmJih0LnBlbmRpbmdfYnVmW3QucGVuZGluZysrXT0yNTUmdC5iaV9idWYsdC5iaV9idWY+Pj04LHQuYmlfdmFsaWQtPTgpfX0se1wiLi4vdXRpbHMvY29tbW9uXCI6NDF9XSw1MzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbigpe3RoaXMuaW5wdXQ9bnVsbCx0aGlzLm5leHRfaW49MCx0aGlzLmF2YWlsX2luPTAsdGhpcy50b3RhbF9pbj0wLHRoaXMub3V0cHV0PW51bGwsdGhpcy5uZXh0X291dD0wLHRoaXMuYXZhaWxfb3V0PTAsdGhpcy50b3RhbF9vdXQ9MCx0aGlzLm1zZz1cIlwiLHRoaXMuc3RhdGU9bnVsbCx0aGlzLmRhdGFfdHlwZT0yLHRoaXMuYWRsZXI9MH19LHt9XSw1NDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBzZXRJbW1lZGlhdGU/c2V0SW1tZWRpYXRlOmZ1bmN0aW9uKCl7dmFyIGU9W10uc2xpY2UuYXBwbHkoYXJndW1lbnRzKTtlLnNwbGljZSgxLDAsMCksc2V0VGltZW91dC5hcHBseShudWxsLGUpfX0se31dfSx7fSxbMTBdKSgxMCl9KX0pLmNhbGwodGhpcyx2b2lkIDAhPT1yP3I6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSl9LHt9XX0se30sWzFdKSgxKX0pfSkuY2FsbCh0aGlzLHZvaWQgMCE9PXI/cjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9KX0se31dfSx7fSxbMV0pKDEpfSl9KS5jYWxsKHRoaXMsdm9pZCAwIT09cj9yOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30pfSx7fV19LHt9LFsxXSkoMSl9KX0pLmNhbGwodGhpcyx2b2lkIDAhPT1yP3I6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSl9LHt9XX0se30sWzFdKSgxKX0pfSkuY2FsbCh0aGlzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30pfSx7fV19LHt9LFsxXSkoMSl9KTsiLCIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290Lm5lYXJsZXkgPSBmYWN0b3J5KCk7XG4gICAgfVxufSh0aGlzLCBmdW5jdGlvbigpIHtcblxuICAgIGZ1bmN0aW9uIFJ1bGUobmFtZSwgc3ltYm9scywgcG9zdHByb2Nlc3MpIHtcbiAgICAgICAgdGhpcy5pZCA9ICsrUnVsZS5oaWdoZXN0SWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc3ltYm9scyA9IHN5bWJvbHM7ICAgICAgICAvLyBhIGxpc3Qgb2YgbGl0ZXJhbCB8IHJlZ2V4IGNsYXNzIHwgbm9udGVybWluYWxcbiAgICAgICAgdGhpcy5wb3N0cHJvY2VzcyA9IHBvc3Rwcm9jZXNzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgUnVsZS5oaWdoZXN0SWQgPSAwO1xuXG4gICAgUnVsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbih3aXRoQ3Vyc29yQXQpIHtcbiAgICAgICAgdmFyIHN5bWJvbFNlcXVlbmNlID0gKHR5cGVvZiB3aXRoQ3Vyc29yQXQgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zeW1ib2xzLm1hcChnZXRTeW1ib2xTaG9ydERpc3BsYXkpLmpvaW4oJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICggICB0aGlzLnN5bWJvbHMuc2xpY2UoMCwgd2l0aEN1cnNvckF0KS5tYXAoZ2V0U3ltYm9sU2hvcnREaXNwbGF5KS5qb2luKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCIg4pePIFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIHRoaXMuc3ltYm9scy5zbGljZSh3aXRoQ3Vyc29yQXQpLm1hcChnZXRTeW1ib2xTaG9ydERpc3BsYXkpLmpvaW4oJyAnKSAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiIOKGkiBcIiArIHN5bWJvbFNlcXVlbmNlO1xuICAgIH1cblxuXG4gICAgLy8gYSBTdGF0ZSBpcyBhIHJ1bGUgYXQgYSBwb3NpdGlvbiBmcm9tIGEgZ2l2ZW4gc3RhcnRpbmcgcG9pbnQgaW4gdGhlIGlucHV0IHN0cmVhbSAocmVmZXJlbmNlKVxuICAgIGZ1bmN0aW9uIFN0YXRlKHJ1bGUsIGRvdCwgcmVmZXJlbmNlLCB3YW50ZWRCeSkge1xuICAgICAgICB0aGlzLnJ1bGUgPSBydWxlO1xuICAgICAgICB0aGlzLmRvdCA9IGRvdDtcbiAgICAgICAgdGhpcy5yZWZlcmVuY2UgPSByZWZlcmVuY2U7XG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLndhbnRlZEJ5ID0gd2FudGVkQnk7XG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZSA9IHRoaXMuZG90ID09PSBydWxlLnN5bWJvbHMubGVuZ3RoO1xuICAgIH1cblxuICAgIFN0YXRlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gXCJ7XCIgKyB0aGlzLnJ1bGUudG9TdHJpbmcodGhpcy5kb3QpICsgXCJ9LCBmcm9tOiBcIiArICh0aGlzLnJlZmVyZW5jZSB8fCAwKTtcbiAgICB9O1xuXG4gICAgU3RhdGUucHJvdG90eXBlLm5leHRTdGF0ZSA9IGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZSh0aGlzLnJ1bGUsIHRoaXMuZG90ICsgMSwgdGhpcy5yZWZlcmVuY2UsIHRoaXMud2FudGVkQnkpO1xuICAgICAgICBzdGF0ZS5sZWZ0ID0gdGhpcztcbiAgICAgICAgc3RhdGUucmlnaHQgPSBjaGlsZDtcbiAgICAgICAgaWYgKHN0YXRlLmlzQ29tcGxldGUpIHtcbiAgICAgICAgICAgIHN0YXRlLmRhdGEgPSBzdGF0ZS5idWlsZCgpO1xuICAgICAgICAgICAgLy8gSGF2aW5nIHJpZ2h0IHNldCBoZXJlIHdpbGwgcHJldmVudCB0aGUgcmlnaHQgc3RhdGUgYW5kIGl0cyBjaGlsZHJlblxuICAgICAgICAgICAgLy8gZm9ybSBiZWluZyBnYXJiYWdlIGNvbGxlY3RlZFxuICAgICAgICAgICAgc3RhdGUucmlnaHQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH07XG5cbiAgICBTdGF0ZS5wcm90b3R5cGUuYnVpbGQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgICAgIHZhciBub2RlID0gdGhpcztcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChub2RlLnJpZ2h0LmRhdGEpO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUubGVmdDtcbiAgICAgICAgfSB3aGlsZSAobm9kZS5sZWZ0KTtcbiAgICAgICAgY2hpbGRyZW4ucmV2ZXJzZSgpO1xuICAgICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfTtcblxuICAgIFN0YXRlLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucnVsZS5wb3N0cHJvY2Vzcykge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5ydWxlLnBvc3Rwcm9jZXNzKHRoaXMuZGF0YSwgdGhpcy5yZWZlcmVuY2UsIFBhcnNlci5mYWlsKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIGZ1bmN0aW9uIENvbHVtbihncmFtbWFyLCBpbmRleCkge1xuICAgICAgICB0aGlzLmdyYW1tYXIgPSBncmFtbWFyO1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gW107XG4gICAgICAgIHRoaXMud2FudHMgPSB7fTsgLy8gc3RhdGVzIGluZGV4ZWQgYnkgdGhlIG5vbi10ZXJtaW5hbCB0aGV5IGV4cGVjdFxuICAgICAgICB0aGlzLnNjYW5uYWJsZSA9IFtdOyAvLyBsaXN0IG9mIHN0YXRlcyB0aGF0IGV4cGVjdCBhIHRva2VuXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0ge307IC8vIHN0YXRlcyB0aGF0IGFyZSBudWxsYWJsZVxuICAgIH1cblxuXG4gICAgQ29sdW1uLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24obmV4dENvbHVtbikge1xuICAgICAgICB2YXIgc3RhdGVzID0gdGhpcy5zdGF0ZXM7XG4gICAgICAgIHZhciB3YW50cyA9IHRoaXMud2FudHM7XG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSB0aGlzLmNvbXBsZXRlZDtcblxuICAgICAgICBmb3IgKHZhciB3ID0gMDsgdyA8IHN0YXRlcy5sZW5ndGg7IHcrKykgeyAvLyBuYi4gd2UgcHVzaCgpIGR1cmluZyBpdGVyYXRpb25cbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHN0YXRlc1t3XTtcblxuICAgICAgICAgICAgaWYgKHN0YXRlLmlzQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5maW5pc2goKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuZGF0YSAhPT0gUGFyc2VyLmZhaWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGxldGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdhbnRlZEJ5ID0gc3RhdGUud2FudGVkQnk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSB3YW50ZWRCeS5sZW5ndGg7IGktLTsgKSB7IC8vIHRoaXMgbGluZSBpcyBob3RcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gd2FudGVkQnlbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKGxlZnQsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNwZWNpYWwtY2FzZSBudWxsYWJsZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnJlZmVyZW5jZSA9PT0gdGhpcy5pbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGZ1dHVyZSBwcmVkaWN0b3JzIG9mIHRoaXMgcnVsZSBnZXQgY29tcGxldGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV4cCA9IHN0YXRlLnJ1bGUubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmNvbXBsZXRlZFtleHBdID0gdGhpcy5jb21wbGV0ZWRbZXhwXSB8fCBbXSkucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcXVldWUgc2Nhbm5hYmxlIHN0YXRlc1xuICAgICAgICAgICAgICAgIHZhciBleHAgPSBzdGF0ZS5ydWxlLnN5bWJvbHNbc3RhdGUuZG90XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV4cCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FubmFibGUucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHByZWRpY3RcbiAgICAgICAgICAgICAgICBpZiAod2FudHNbZXhwXSkge1xuICAgICAgICAgICAgICAgICAgICB3YW50c1tleHBdLnB1c2goc3RhdGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZWQuaGFzT3duUHJvcGVydHkoZXhwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG51bGxzID0gY29tcGxldGVkW2V4cF07XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJpZ2h0ID0gbnVsbHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZShzdGF0ZSwgcmlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2FudHNbZXhwXSA9IFtzdGF0ZV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlZGljdChleHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIENvbHVtbi5wcm90b3R5cGUucHJlZGljdCA9IGZ1bmN0aW9uKGV4cCkge1xuICAgICAgICB2YXIgcnVsZXMgPSB0aGlzLmdyYW1tYXIuYnlOYW1lW2V4cF0gfHwgW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHIgPSBydWxlc1tpXTtcbiAgICAgICAgICAgIHZhciB3YW50ZWRCeSA9IHRoaXMud2FudHNbZXhwXTtcbiAgICAgICAgICAgIHZhciBzID0gbmV3IFN0YXRlKHIsIDAsIHRoaXMuaW5kZXgsIHdhbnRlZEJ5KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLnB1c2gocyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBDb2x1bW4ucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICAgICAgdmFyIGNvcHkgPSBsZWZ0Lm5leHRTdGF0ZShyaWdodCk7XG4gICAgICAgIHRoaXMuc3RhdGVzLnB1c2goY29weSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBHcmFtbWFyKHJ1bGVzLCBzdGFydCkge1xuICAgICAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydCB8fCB0aGlzLnJ1bGVzWzBdLm5hbWU7XG4gICAgICAgIHZhciBieU5hbWUgPSB0aGlzLmJ5TmFtZSA9IHt9O1xuICAgICAgICB0aGlzLnJ1bGVzLmZvckVhY2goZnVuY3Rpb24ocnVsZSkge1xuICAgICAgICAgICAgaWYgKCFieU5hbWUuaGFzT3duUHJvcGVydHkocnVsZS5uYW1lKSkge1xuICAgICAgICAgICAgICAgIGJ5TmFtZVtydWxlLm5hbWVdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBieU5hbWVbcnVsZS5uYW1lXS5wdXNoKHJ1bGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTbyB3ZSBjYW4gYWxsb3cgcGFzc2luZyAocnVsZXMsIHN0YXJ0KSBkaXJlY3RseSB0byBQYXJzZXIgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgR3JhbW1hci5mcm9tQ29tcGlsZWQgPSBmdW5jdGlvbihydWxlcywgc3RhcnQpIHtcbiAgICAgICAgdmFyIGxleGVyID0gcnVsZXMuTGV4ZXI7XG4gICAgICAgIGlmIChydWxlcy5QYXJzZXJTdGFydCkge1xuICAgICAgICAgIHN0YXJ0ID0gcnVsZXMuUGFyc2VyU3RhcnQ7XG4gICAgICAgICAgcnVsZXMgPSBydWxlcy5QYXJzZXJSdWxlcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcnVsZXMgPSBydWxlcy5tYXAoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIChuZXcgUnVsZShyLm5hbWUsIHIuc3ltYm9scywgci5wb3N0cHJvY2VzcykpOyB9KTtcbiAgICAgICAgdmFyIGcgPSBuZXcgR3JhbW1hcihydWxlcywgc3RhcnQpO1xuICAgICAgICBnLmxleGVyID0gbGV4ZXI7IC8vIG5iLiBzdG9yaW5nIGxleGVyIG9uIEdyYW1tYXIgaXMgaWZmeSwgYnV0IHVuYXZvaWRhYmxlXG4gICAgICAgIHJldHVybiBnO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gU3RyZWFtTGV4ZXIoKSB7XG4gICAgICB0aGlzLnJlc2V0KFwiXCIpO1xuICAgIH1cblxuICAgIFN0cmVhbUxleGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKGRhdGEsIHN0YXRlKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gZGF0YTtcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIHRoaXMubGluZSA9IHN0YXRlID8gc3RhdGUubGluZSA6IDE7XG4gICAgICAgIHRoaXMubGFzdExpbmVCcmVhayA9IHN0YXRlID8gLXN0YXRlLmNvbCA6IDA7XG4gICAgfVxuXG4gICAgU3RyZWFtTGV4ZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPCB0aGlzLmJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHRoaXMuYnVmZmVyW3RoaXMuaW5kZXgrK107XG4gICAgICAgICAgICBpZiAoY2ggPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgIHRoaXMubGluZSArPSAxO1xuICAgICAgICAgICAgICB0aGlzLmxhc3RMaW5lQnJlYWsgPSB0aGlzLmluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHt2YWx1ZTogY2h9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgU3RyZWFtTGV4ZXIucHJvdG90eXBlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxpbmU6IHRoaXMubGluZSxcbiAgICAgICAgY29sOiB0aGlzLmluZGV4IC0gdGhpcy5sYXN0TGluZUJyZWFrLFxuICAgICAgfVxuICAgIH1cblxuICAgIFN0cmVhbUxleGVyLnByb3RvdHlwZS5mb3JtYXRFcnJvciA9IGZ1bmN0aW9uKHRva2VuLCBtZXNzYWdlKSB7XG4gICAgICAgIC8vIG5iLiB0aGlzIGdldHMgY2FsbGVkIGFmdGVyIGNvbnN1bWluZyB0aGUgb2ZmZW5kaW5nIHRva2VuLFxuICAgICAgICAvLyBzbyB0aGUgY3VscHJpdCBpcyBpbmRleC0xXG4gICAgICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgICAgaWYgKHR5cGVvZiBidWZmZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgbGluZXMgPSBidWZmZXJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgICAuc2xpY2UoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KDAsIHRoaXMubGluZSAtIDUpLCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saW5lXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdmFyIG5leHRMaW5lQnJlYWsgPSBidWZmZXIuaW5kZXhPZignXFxuJywgdGhpcy5pbmRleCk7XG4gICAgICAgICAgICBpZiAobmV4dExpbmVCcmVhayA9PT0gLTEpIG5leHRMaW5lQnJlYWsgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvbCA9IHRoaXMuaW5kZXggLSB0aGlzLmxhc3RMaW5lQnJlYWs7XG4gICAgICAgICAgICB2YXIgbGFzdExpbmVEaWdpdHMgPSBTdHJpbmcodGhpcy5saW5lKS5sZW5ndGg7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiIGF0IGxpbmUgXCIgKyB0aGlzLmxpbmUgKyBcIiBjb2wgXCIgKyBjb2wgKyBcIjpcXG5cXG5cIjtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gbGluZXNcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZCh0aGlzLmxpbmUgLSBsaW5lcy5sZW5ndGggKyBpICsgMSwgbGFzdExpbmVEaWdpdHMpICsgXCIgXCIgKyBsaW5lO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICBtZXNzYWdlICs9IFwiXFxuXCIgKyBwYWQoXCJcIiwgbGFzdExpbmVEaWdpdHMgKyBjb2wpICsgXCJeXFxuXCI7XG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlICsgXCIgYXQgaW5kZXggXCIgKyAodGhpcy5pbmRleCAtIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcGFkKG4sIGxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHMgPSBTdHJpbmcobik7XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkobGVuZ3RoIC0gcy5sZW5ndGggKyAxKS5qb2luKFwiIFwiKSArIHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBQYXJzZXIocnVsZXMsIHN0YXJ0LCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChydWxlcyBpbnN0YW5jZW9mIEdyYW1tYXIpIHtcbiAgICAgICAgICAgIHZhciBncmFtbWFyID0gcnVsZXM7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHN0YXJ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGdyYW1tYXIgPSBHcmFtbWFyLmZyb21Db21waWxlZChydWxlcywgc3RhcnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG5cbiAgICAgICAgLy8gUmVhZCBvcHRpb25zXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGtlZXBIaXN0b3J5OiBmYWxzZSxcbiAgICAgICAgICAgIGxleGVyOiBncmFtbWFyLmxleGVyIHx8IG5ldyBTdHJlYW1MZXhlcixcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIChvcHRpb25zIHx8IHt9KSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXR1cCBsZXhlclxuICAgICAgICB0aGlzLmxleGVyID0gdGhpcy5vcHRpb25zLmxleGVyO1xuICAgICAgICB0aGlzLmxleGVyU3RhdGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gU2V0dXAgYSB0YWJsZVxuICAgICAgICB2YXIgY29sdW1uID0gbmV3IENvbHVtbihncmFtbWFyLCAwKTtcbiAgICAgICAgdmFyIHRhYmxlID0gdGhpcy50YWJsZSA9IFtjb2x1bW5dO1xuXG4gICAgICAgIC8vIEkgY291bGQgYmUgZXhwZWN0aW5nIGFueXRoaW5nLlxuICAgICAgICBjb2x1bW4ud2FudHNbZ3JhbW1hci5zdGFydF0gPSBbXTtcbiAgICAgICAgY29sdW1uLnByZWRpY3QoZ3JhbW1hci5zdGFydCk7XG4gICAgICAgIC8vIFRPRE8gd2hhdCBpZiBzdGFydCBydWxlIGlzIG51bGxhYmxlP1xuICAgICAgICBjb2x1bW4ucHJvY2VzcygpO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSAwOyAvLyB0b2tlbiBpbmRleFxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBhIHJlc2VydmVkIHRva2VuIGZvciBpbmRpY2F0aW5nIGEgcGFyc2UgZmFpbFxuICAgIFBhcnNlci5mYWlsID0ge307XG5cbiAgICBQYXJzZXIucHJvdG90eXBlLmZlZWQgPSBmdW5jdGlvbihjaHVuaykge1xuICAgICAgICB2YXIgbGV4ZXIgPSB0aGlzLmxleGVyO1xuICAgICAgICBsZXhlci5yZXNldChjaHVuaywgdGhpcy5sZXhlclN0YXRlKTtcblxuICAgICAgICB2YXIgdG9rZW47XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gbGV4ZXIubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgbmV4dCBjb2x1bW4gc28gdGhhdCB0aGUgZXJyb3IgcmVwb3J0ZXJcbiAgICAgICAgICAgICAgICAvLyBjYW4gZGlzcGxheSB0aGUgY29ycmVjdGx5IHByZWRpY3RlZCBzdGF0ZXMuXG4gICAgICAgICAgICAgICAgdmFyIG5leHRDb2x1bW4gPSBuZXcgQ29sdW1uKHRoaXMuZ3JhbW1hciwgdGhpcy5jdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZS5wdXNoKG5leHRDb2x1bW4pO1xuICAgICAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IodGhpcy5yZXBvcnRMZXhlckVycm9yKGUpKTtcbiAgICAgICAgICAgICAgICBlcnIub2Zmc2V0ID0gdGhpcy5jdXJyZW50O1xuICAgICAgICAgICAgICAgIGVyci50b2tlbiA9IGUudG9rZW47XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2UgYWRkIG5ldyBzdGF0ZXMgdG8gdGFibGVbY3VycmVudCsxXVxuICAgICAgICAgICAgdmFyIGNvbHVtbiA9IHRoaXMudGFibGVbdGhpcy5jdXJyZW50XTtcblxuICAgICAgICAgICAgLy8gR0MgdW51c2VkIHN0YXRlc1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy50YWJsZVt0aGlzLmN1cnJlbnQgLSAxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG4gPSB0aGlzLmN1cnJlbnQgKyAxO1xuICAgICAgICAgICAgdmFyIG5leHRDb2x1bW4gPSBuZXcgQ29sdW1uKHRoaXMuZ3JhbW1hciwgbik7XG4gICAgICAgICAgICB0aGlzLnRhYmxlLnB1c2gobmV4dENvbHVtbik7XG5cbiAgICAgICAgICAgIC8vIEFkdmFuY2UgYWxsIHRva2VucyB0aGF0IGV4cGVjdCB0aGUgc3ltYm9sXG4gICAgICAgICAgICB2YXIgbGl0ZXJhbCA9IHRva2VuLnRleHQgIT09IHVuZGVmaW5lZCA/IHRva2VuLnRleHQgOiB0b2tlbi52YWx1ZTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGxleGVyLmNvbnN0cnVjdG9yID09PSBTdHJlYW1MZXhlciA/IHRva2VuLnZhbHVlIDogdG9rZW47XG4gICAgICAgICAgICB2YXIgc2Nhbm5hYmxlID0gY29sdW1uLnNjYW5uYWJsZTtcbiAgICAgICAgICAgIGZvciAodmFyIHcgPSBzY2FubmFibGUubGVuZ3RoOyB3LS07ICkge1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IHNjYW5uYWJsZVt3XTtcbiAgICAgICAgICAgICAgICB2YXIgZXhwZWN0ID0gc3RhdGUucnVsZS5zeW1ib2xzW3N0YXRlLmRvdF07XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIGNvbnN1bWUgdGhlIHRva2VuXG4gICAgICAgICAgICAgICAgLy8gZWl0aGVyIHJlZ2V4IG9yIGxpdGVyYWxcbiAgICAgICAgICAgICAgICBpZiAoZXhwZWN0LnRlc3QgPyBleHBlY3QudGVzdCh2YWx1ZSkgOlxuICAgICAgICAgICAgICAgICAgICBleHBlY3QudHlwZSA/IGV4cGVjdC50eXBlID09PSB0b2tlbi50eXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZXhwZWN0LmxpdGVyYWwgPT09IGxpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGl0XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gc3RhdGUubmV4dFN0YXRlKHtkYXRhOiB2YWx1ZSwgdG9rZW46IHRva2VuLCBpc1Rva2VuOiB0cnVlLCByZWZlcmVuY2U6IG4gLSAxfSk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRDb2x1bW4uc3RhdGVzLnB1c2gobmV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBOZXh0LCBmb3IgZWFjaCBvZiB0aGUgcnVsZXMsIHdlIGVpdGhlclxuICAgICAgICAgICAgLy8gKGEpIGNvbXBsZXRlIGl0LCBhbmQgdHJ5IHRvIHNlZSBpZiB0aGUgcmVmZXJlbmNlIHJvdyBleHBlY3RlZCB0aGF0XG4gICAgICAgICAgICAvLyAgICAgcnVsZVxuICAgICAgICAgICAgLy8gKGIpIHByZWRpY3QgdGhlIG5leHQgbm9udGVybWluYWwgaXQgZXhwZWN0cyBieSBhZGRpbmcgdGhhdFxuICAgICAgICAgICAgLy8gICAgIG5vbnRlcm1pbmFsJ3Mgc3RhcnQgc3RhdGVcbiAgICAgICAgICAgIC8vIFRvIHByZXZlbnQgZHVwbGljYXRpb24sIHdlIGFsc28ga2VlcCB0cmFjayBvZiBydWxlcyB3ZSBoYXZlIGFscmVhZHlcbiAgICAgICAgICAgIC8vIGFkZGVkXG5cbiAgICAgICAgICAgIG5leHRDb2x1bW4ucHJvY2VzcygpO1xuXG4gICAgICAgICAgICAvLyBJZiBuZWVkZWQsIHRocm93IGFuIGVycm9yOlxuICAgICAgICAgICAgaWYgKG5leHRDb2x1bW4uc3RhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIE5vIHN0YXRlcyBhdCBhbGwhIFRoaXMgaXMgbm90IGdvb2QuXG4gICAgICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcih0aGlzLnJlcG9ydEVycm9yKHRva2VuKSk7XG4gICAgICAgICAgICAgICAgZXJyLm9mZnNldCA9IHRoaXMuY3VycmVudDtcbiAgICAgICAgICAgICAgICBlcnIudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1heWJlIHNhdmUgbGV4ZXIgc3RhdGVcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMua2VlcEhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgY29sdW1uLmxleGVyU3RhdGUgPSBsZXhlci5zYXZlKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgIHRoaXMubGV4ZXJTdGF0ZSA9IGxleGVyLnNhdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5jcmVtZW50YWxseSBrZWVwIHRyYWNrIG9mIHJlc3VsdHNcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gdGhpcy5maW5pc2goKTtcblxuICAgICAgICAvLyBBbGxvdyBjaGFpbmluZywgZm9yIHdoYXRldmVyIGl0J3Mgd29ydGhcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUucmVwb3J0TGV4ZXJFcnJvciA9IGZ1bmN0aW9uKGxleGVyRXJyb3IpIHtcbiAgICAgICAgdmFyIHRva2VuRGlzcGxheSwgbGV4ZXJNZXNzYWdlO1xuICAgICAgICAvLyBQbGFubmluZyB0byBhZGQgYSB0b2tlbiBwcm9wZXJ0eSB0byBtb28ncyB0aHJvd24gZXJyb3JcbiAgICAgICAgLy8gZXZlbiBvbiBlcnJvcmluZyB0b2tlbnMgdG8gYmUgdXNlZCBpbiBlcnJvciBkaXNwbGF5IGJlbG93XG4gICAgICAgIHZhciB0b2tlbiA9IGxleGVyRXJyb3IudG9rZW47XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgdG9rZW5EaXNwbGF5ID0gXCJpbnB1dCBcIiArIEpTT04uc3RyaW5naWZ5KHRva2VuLnRleHRbMF0pICsgXCIgKGxleGVyIGVycm9yKVwiO1xuICAgICAgICAgICAgbGV4ZXJNZXNzYWdlID0gdGhpcy5sZXhlci5mb3JtYXRFcnJvcih0b2tlbiwgXCJTeW50YXggZXJyb3JcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2tlbkRpc3BsYXkgPSBcImlucHV0IChsZXhlciBlcnJvcilcIjtcbiAgICAgICAgICAgIGxleGVyTWVzc2FnZSA9IGxleGVyRXJyb3IubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZXBvcnRFcnJvckNvbW1vbihsZXhlck1lc3NhZ2UsIHRva2VuRGlzcGxheSk7XG4gICAgfTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUucmVwb3J0RXJyb3IgPSBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICB2YXIgdG9rZW5EaXNwbGF5ID0gKHRva2VuLnR5cGUgPyB0b2tlbi50eXBlICsgXCIgdG9rZW46IFwiIDogXCJcIikgKyBKU09OLnN0cmluZ2lmeSh0b2tlbi52YWx1ZSAhPT0gdW5kZWZpbmVkID8gdG9rZW4udmFsdWUgOiB0b2tlbik7XG4gICAgICAgIHZhciBsZXhlck1lc3NhZ2UgPSB0aGlzLmxleGVyLmZvcm1hdEVycm9yKHRva2VuLCBcIlN5bnRheCBlcnJvclwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwb3J0RXJyb3JDb21tb24obGV4ZXJNZXNzYWdlLCB0b2tlbkRpc3BsYXkpO1xuICAgIH07XG5cbiAgICBQYXJzZXIucHJvdG90eXBlLnJlcG9ydEVycm9yQ29tbW9uID0gZnVuY3Rpb24obGV4ZXJNZXNzYWdlLCB0b2tlbkRpc3BsYXkpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gW107XG4gICAgICAgIGxpbmVzLnB1c2gobGV4ZXJNZXNzYWdlKTtcbiAgICAgICAgdmFyIGxhc3RDb2x1bW5JbmRleCA9IHRoaXMudGFibGUubGVuZ3RoIC0gMjtcbiAgICAgICAgdmFyIGxhc3RDb2x1bW4gPSB0aGlzLnRhYmxlW2xhc3RDb2x1bW5JbmRleF07XG4gICAgICAgIHZhciBleHBlY3RhbnRTdGF0ZXMgPSBsYXN0Q29sdW1uLnN0YXRlc1xuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0U3ltYm9sID0gc3RhdGUucnVsZS5zeW1ib2xzW3N0YXRlLmRvdF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHRTeW1ib2wgJiYgdHlwZW9mIG5leHRTeW1ib2wgIT09IFwic3RyaW5nXCI7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZXhwZWN0YW50U3RhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgbGluZXMucHVzaCgnVW5leHBlY3RlZCAnICsgdG9rZW5EaXNwbGF5ICsgJy4gSSBkaWQgbm90IGV4cGVjdCBhbnkgbW9yZSBpbnB1dC4gSGVyZSBpcyB0aGUgc3RhdGUgb2YgbXkgcGFyc2UgdGFibGU6XFxuJyk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlTdGF0ZVN0YWNrKGxhc3RDb2x1bW4uc3RhdGVzLCBsaW5lcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaW5lcy5wdXNoKCdVbmV4cGVjdGVkICcgKyB0b2tlbkRpc3BsYXkgKyAnLiBJbnN0ZWFkLCBJIHdhcyBleHBlY3RpbmcgdG8gc2VlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxcbicpO1xuICAgICAgICAgICAgLy8gRGlzcGxheSBhIFwic3RhdGUgc3RhY2tcIiBmb3IgZWFjaCBleHBlY3RhbnQgc3RhdGVcbiAgICAgICAgICAgIC8vIC0gd2hpY2ggc2hvd3MgeW91IGhvdyB0aGlzIHN0YXRlIGNhbWUgdG8gYmUsIHN0ZXAgYnkgc3RlcC5cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgZGVyaXZhdGlvbiwgd2Ugb25seSBkaXNwbGF5IHRoZSBmaXJzdCBvbmUuXG4gICAgICAgICAgICB2YXIgc3RhdGVTdGFja3MgPSBleHBlY3RhbnRTdGF0ZXNcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkRmlyc3RTdGF0ZVN0YWNrKHN0YXRlLCBbXSkgfHwgW3N0YXRlXTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgIC8vIERpc3BsYXkgZWFjaCBzdGF0ZSB0aGF0IGlzIGV4cGVjdGluZyBhIHRlcm1pbmFsIHN5bWJvbCBuZXh0LlxuICAgICAgICAgICAgc3RhdGVTdGFja3MuZm9yRWFjaChmdW5jdGlvbihzdGF0ZVN0YWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gc3RhdGVTdGFja1swXTtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN5bWJvbCA9IHN0YXRlLnJ1bGUuc3ltYm9sc1tzdGF0ZS5kb3RdO1xuICAgICAgICAgICAgICAgIHZhciBzeW1ib2xEaXNwbGF5ID0gdGhpcy5nZXRTeW1ib2xEaXNwbGF5KG5leHRTeW1ib2wpO1xuICAgICAgICAgICAgICAgIGxpbmVzLnB1c2goJ0EgJyArIHN5bWJvbERpc3BsYXkgKyAnIGJhc2VkIG9uOicpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVN0YXRlU3RhY2soc3RhdGVTdGFjaywgbGluZXMpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgbGluZXMucHVzaChcIlwiKTtcbiAgICAgICAgcmV0dXJuIGxpbmVzLmpvaW4oXCJcXG5cIik7XG4gICAgfVxuICAgIFxuICAgIFBhcnNlci5wcm90b3R5cGUuZGlzcGxheVN0YXRlU3RhY2sgPSBmdW5jdGlvbihzdGF0ZVN0YWNrLCBsaW5lcykge1xuICAgICAgICB2YXIgbGFzdERpc3BsYXk7XG4gICAgICAgIHZhciBzYW1lRGlzcGxheUNvdW50ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzdGF0ZVN0YWNrLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBzdGF0ZVN0YWNrW2pdO1xuICAgICAgICAgICAgdmFyIGRpc3BsYXkgPSBzdGF0ZS5ydWxlLnRvU3RyaW5nKHN0YXRlLmRvdCk7XG4gICAgICAgICAgICBpZiAoZGlzcGxheSA9PT0gbGFzdERpc3BsYXkpIHtcbiAgICAgICAgICAgICAgICBzYW1lRGlzcGxheUNvdW50Kys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzYW1lRGlzcGxheUNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKCcgICAgXiAnICsgc2FtZURpc3BsYXlDb3VudCArICcgbW9yZSBsaW5lcyBpZGVudGljYWwgdG8gdGhpcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYW1lRGlzcGxheUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKCcgICAgJyArIGRpc3BsYXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdERpc3BsYXkgPSBkaXNwbGF5O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUuZ2V0U3ltYm9sRGlzcGxheSA9IGZ1bmN0aW9uKHN5bWJvbCkge1xuICAgICAgICByZXR1cm4gZ2V0U3ltYm9sTG9uZ0Rpc3BsYXkoc3ltYm9sKTtcbiAgICB9O1xuXG4gICAgLypcbiAgICBCdWlsZHMgYSB0aGUgZmlyc3Qgc3RhdGUgc3RhY2suIFlvdSBjYW4gdGhpbmsgb2YgYSBzdGF0ZSBzdGFjayBhcyB0aGUgY2FsbCBzdGFja1xuICAgIG9mIHRoZSByZWN1cnNpdmUtZGVzY2VudCBwYXJzZXIgd2hpY2ggdGhlIE5lYXJsZXkgcGFyc2UgYWxnb3JpdGhtIHNpbXVsYXRlcy5cbiAgICBBIHN0YXRlIHN0YWNrIGlzIHJlcHJlc2VudGVkIGFzIGFuIGFycmF5IG9mIHN0YXRlIG9iamVjdHMuIFdpdGhpbiBhXG4gICAgc3RhdGUgc3RhY2ssIHRoZSBmaXJzdCBpdGVtIG9mIHRoZSBhcnJheSB3aWxsIGJlIHRoZSBzdGFydGluZ1xuICAgIHN0YXRlLCB3aXRoIGVhY2ggc3VjY2Vzc2l2ZSBpdGVtIGluIHRoZSBhcnJheSBnb2luZyBmdXJ0aGVyIGJhY2sgaW50byBoaXN0b3J5LlxuXG4gICAgVGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSBnaXZlbiBhIHN0YXJ0aW5nIHN0YXRlIGFuZCBhbiBlbXB0eSBhcnJheSByZXByZXNlbnRpbmdcbiAgICB0aGUgdmlzaXRlZCBzdGF0ZXMsIGFuZCBpdCByZXR1cm5zIGFuIHNpbmdsZSBzdGF0ZSBzdGFjay5cblxuICAgICovXG4gICAgUGFyc2VyLnByb3RvdHlwZS5idWlsZEZpcnN0U3RhdGVTdGFjayA9IGZ1bmN0aW9uKHN0YXRlLCB2aXNpdGVkKSB7XG4gICAgICAgIGlmICh2aXNpdGVkLmluZGV4T2Yoc3RhdGUpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gRm91bmQgY3ljbGUsIHJldHVybiBudWxsXG4gICAgICAgICAgICAvLyB0byBlbGltaW5hdGUgdGhpcyBwYXRoIGZyb20gdGhlIHJlc3VsdHMsIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IGtub3cgaG93IHRvIGRpc3BsYXkgaXQgbWVhbmluZ2Z1bGx5XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdGUud2FudGVkQnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW3N0YXRlXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldlN0YXRlID0gc3RhdGUud2FudGVkQnlbMF07XG4gICAgICAgIHZhciBjaGlsZFZpc2l0ZWQgPSBbc3RhdGVdLmNvbmNhdCh2aXNpdGVkKTtcbiAgICAgICAgdmFyIGNoaWxkUmVzdWx0ID0gdGhpcy5idWlsZEZpcnN0U3RhdGVTdGFjayhwcmV2U3RhdGUsIGNoaWxkVmlzaXRlZCk7XG4gICAgICAgIGlmIChjaGlsZFJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtzdGF0ZV0uY29uY2F0KGNoaWxkUmVzdWx0KTtcbiAgICB9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSB0aGlzLnRhYmxlW3RoaXMuY3VycmVudF07XG4gICAgICAgIGNvbHVtbi5sZXhlclN0YXRlID0gdGhpcy5sZXhlclN0YXRlO1xuICAgICAgICByZXR1cm4gY29sdW1uO1xuICAgIH07XG5cbiAgICBQYXJzZXIucHJvdG90eXBlLnJlc3RvcmUgPSBmdW5jdGlvbihjb2x1bW4pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gY29sdW1uLmluZGV4O1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBpbmRleDtcbiAgICAgICAgdGhpcy50YWJsZVtpbmRleF0gPSBjb2x1bW47XG4gICAgICAgIHRoaXMudGFibGUuc3BsaWNlKGluZGV4ICsgMSk7XG4gICAgICAgIHRoaXMubGV4ZXJTdGF0ZSA9IGNvbHVtbi5sZXhlclN0YXRlO1xuXG4gICAgICAgIC8vIEluY3JlbWVudGFsbHkga2VlcCB0cmFjayBvZiByZXN1bHRzXG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHRoaXMuZmluaXNoKCk7XG4gICAgfTtcblxuICAgIC8vIG5iLiBkZXByZWNhdGVkOiB1c2Ugc2F2ZS9yZXN0b3JlIGluc3RlYWQhXG4gICAgUGFyc2VyLnByb3RvdHlwZS5yZXdpbmQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5rZWVwSGlzdG9yeSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXQgb3B0aW9uIGBrZWVwSGlzdG9yeWAgdG8gZW5hYmxlIHJld2luZGluZycpXG4gICAgICAgIH1cbiAgICAgICAgLy8gbmIuIHJlY2FsbCBjb2x1bW4gKHRhYmxlKSBpbmRpY2llcyBmYWxsIGJldHdlZW4gdG9rZW4gaW5kaWNpZXMuXG4gICAgICAgIC8vICAgICAgICBjb2wgMCAgIC0tICAgdG9rZW4gMCAgIC0tICAgY29sIDFcbiAgICAgICAgdGhpcy5yZXN0b3JlKHRoaXMudGFibGVbaW5kZXhdKTtcbiAgICB9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBwb3NzaWJsZSBwYXJzaW5nc1xuICAgICAgICB2YXIgY29uc2lkZXJhdGlvbnMgPSBbXTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5ncmFtbWFyLnN0YXJ0O1xuICAgICAgICB2YXIgY29sdW1uID0gdGhpcy50YWJsZVt0aGlzLnRhYmxlLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbHVtbi5zdGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKHQucnVsZS5uYW1lID09PSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAmJiB0LmRvdCA9PT0gdC5ydWxlLnN5bWJvbHMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICYmIHQucmVmZXJlbmNlID09PSAwXG4gICAgICAgICAgICAgICAgICAgICYmIHQuZGF0YSAhPT0gUGFyc2VyLmZhaWwpIHtcbiAgICAgICAgICAgICAgICBjb25zaWRlcmF0aW9ucy5wdXNoKHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbnNpZGVyYXRpb25zLm1hcChmdW5jdGlvbihjKSB7cmV0dXJuIGMuZGF0YTsgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldFN5bWJvbExvbmdEaXNwbGF5KHN5bWJvbCkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBzeW1ib2w7XG4gICAgICAgIGlmICh0eXBlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ltYm9sO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGlmIChzeW1ib2wubGl0ZXJhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzeW1ib2wubGl0ZXJhbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN5bWJvbCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnY2hhcmFjdGVyIG1hdGNoaW5nICcgKyBzeW1ib2w7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN5bWJvbC50eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN5bWJvbC50eXBlICsgJyB0b2tlbic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN5bWJvbC50ZXN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICd0b2tlbiBtYXRjaGluZyAnICsgU3RyaW5nKHN5bWJvbC50ZXN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHN5bWJvbCB0eXBlOiAnICsgc3ltYm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFN5bWJvbFNob3J0RGlzcGxheShzeW1ib2wpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ltYm9sO1xuICAgICAgICBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIHN5bWJvbDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZiAoc3ltYm9sLmxpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc3ltYm9sLmxpdGVyYWwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzeW1ib2wgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ltYm9sLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN5bWJvbC50eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICclJyArIHN5bWJvbC50eXBlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzeW1ib2wudGVzdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnPCcgKyBTdHJpbmcoc3ltYm9sLnRlc3QpICsgJz4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gc3ltYm9sIHR5cGU6ICcgKyBzeW1ib2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgUGFyc2VyOiBQYXJzZXIsXG4gICAgICAgIEdyYW1tYXI6IEdyYW1tYXIsXG4gICAgICAgIFJ1bGU6IFJ1bGUsXG4gICAgfTtcblxufSkpO1xuIiwiaW1wb3J0IFBpY3R1cmUgZnJvbSBcIi4vUGljdHVyZVwiO1xuaW1wb3J0IFJlc291cmNlcyBmcm9tIFwiLi9SZXNvdXJjZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxwaGFQaWN0dXJlIGV4dGVuZHMgUGljdHVyZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlc291cmNlczogUmVzb3VyY2VzLFxuICAgIGNvbG9ySW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgYWxwaGFJbWFnZTogSFRNTEltYWdlRWxlbWVudCB8IHVuZGVmaW5lZCxcbiAgICB4ID0gMCxcbiAgICB5ID0gMFxuICApIHtcbiAgICBzdXBlcihyZXNvdXJjZXMsIGNvbG9ySW1hZ2UsIHgsIHkpO1xuXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBjb2xvckltYWdlO1xuXG4gICAgY29uc3QgYWxwaGFDb250ZXh0ID0gcmVzb3VyY2VzLmdldENhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcbiAgICBhbHBoYUNvbnRleHQuZHJhd0ltYWdlKGFscGhhSW1hZ2UsIDAsIDApO1xuICAgIGNvbnN0IGFscGhhSW1hZ2VEYXRhID0gYWxwaGFDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8vIGRyYXdzIGJhc2UgaW1hZ2Ugb250byBjYW52YXNcbiAgICB0aGlzLmNvbnRleHQyZCA9IHJlc291cmNlcy5nZXRDYW52YXMod2lkdGgsIGhlaWdodCk7XG4gICAgdGhpcy5jb250ZXh0MmQuZHJhd0ltYWdlKGNvbG9ySW1hZ2UsIDAsIDApO1xuICAgIGNvbnN0IGNvbG9ySW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0MmQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBjb2xvckltYWdlRGF0YS5kYXRhLmxlbmd0aDsgaSA8IG47IGkgKz0gNCkge1xuICAgICAgY29sb3JJbWFnZURhdGEuZGF0YVtpICsgM10gPVxuICAgICAgICAoYWxwaGFJbWFnZURhdGEuZGF0YVtpXSArXG4gICAgICAgICAgYWxwaGFJbWFnZURhdGEuZGF0YVtpICsgMV0gK1xuICAgICAgICAgIGFscGhhSW1hZ2VEYXRhLmRhdGFbaSArIDJdKSAvXG4gICAgICAgIDM7XG4gICAgfVxuXG4gICAgcmVzb3VyY2VzLmZyZWVDYW52YXMoYWxwaGFDb250ZXh0KTtcbiAgICB0aGlzLmNvbnRleHQyZC5wdXRJbWFnZURhdGEoY29sb3JJbWFnZURhdGEsIDAsIDApO1xuICAgIHRoaXMuaW1hZ2UgPSB0aGlzLmNvbnRleHQyZC5jYW52YXM7XG4gIH1cbn1cbiIsImltcG9ydCBBbHBoYVBpY3R1cmUgZnJvbSBcIi4vQWxwaGFQaWN0dXJlXCI7XG5pbXBvcnQgUmVzb3VyY2VzIGZyb20gXCIuL1Jlc291cmNlc1wiO1xuXG5leHBvcnQgZW51bSBPcmllbnRhdGlvbiB7XG4gIGhvcml6b250YWwsXG4gIHZlcnRpY2FsLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb24gZXh0ZW5kcyBBbHBoYVBpY3R1cmUge1xuICBwcm90ZWN0ZWQgY3VycmVudEZyYW1lID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZXNvdXJjZXM6IFJlc291cmNlcyxcbiAgICBjb2xvckltYWdlOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIGFscGhhSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICBwcm90ZWN0ZWQgZnJhbWVzQ291bnQ6IG51bWJlcixcbiAgICBwcm90ZWN0ZWQgb3JpZW50YXRpb246IE9yaWVudGF0aW9uXG4gICkge1xuICAgIHN1cGVyKHJlc291cmNlcywgY29sb3JJbWFnZSwgYWxwaGFJbWFnZSwgeCwgeSk7XG4gIH1cblxuICBnZXQgaGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb24gPT09IE9yaWVudGF0aW9uLnZlcnRpY2FsXG4gICAgICA/IHN1cGVyLmhlaWdodCAvIHRoaXMuZnJhbWVzQ291bnRcbiAgICAgIDogc3VwZXIuaGVpZ2h0O1xuICB9XG5cbiAgZ2V0IHdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb24gPT09IE9yaWVudGF0aW9uLmhvcml6b250YWxcbiAgICAgID8gc3VwZXIud2lkdGggLyB0aGlzLmZyYW1lc0NvdW50XG4gICAgICA6IHN1cGVyLndpZHRoO1xuICB9XG5cbiAgZHJhdyhcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICBzeCA9IDAsXG4gICAgc3kgPSAwLFxuICAgIHdpZHRoID0gdGhpcy53aWR0aCxcbiAgICBoZWlnaHQgPSB0aGlzLmhlaWdodCxcbiAgICB4ID0gdGhpcy54LFxuICAgIHkgPSB0aGlzLnlcbiAgKTogdm9pZCB7XG4gICAgbGV0IGZyYW1lWCA9IDA7XG4gICAgbGV0IGZyYW1lWSA9IDA7XG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09IE9yaWVudGF0aW9uLnZlcnRpY2FsKSB7XG4gICAgICBmcmFtZVkgPSB0aGlzLmhlaWdodCAqIE1hdGguZmxvb3IodGhpcy5jdXJyZW50RnJhbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmFtZVggPSB0aGlzLndpZHRoICogTWF0aC5mbG9vcih0aGlzLmN1cnJlbnRGcmFtZSk7XG4gICAgfVxuICAgIHN1cGVyLmRyYXcoY3R4LCBmcmFtZVggKyBzeCwgZnJhbWVZICsgc3ksIHdpZHRoLCBoZWlnaHQsIHgsIHkpO1xuICB9XG5cbiAgbmV4dEZyYW1lKCk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEZyYW1lID0gKyt0aGlzLmN1cnJlbnRGcmFtZSAlIHRoaXMuZnJhbWVzQ291bnQ7XG4gIH1cbn1cbiIsImltcG9ydCBBbmltYXRpb24sIHsgT3JpZW50YXRpb24gfSBmcm9tIFwiLi9BbmltYXRpb25cIjtcbmltcG9ydCBSZXNvdXJjZXMgZnJvbSBcIi4vUmVzb3VyY2VzXCI7XG5cbmVudW0gTW91c2VTdGF0ZSB7XG4gIE91dCxcbiAgT3ZlcixcbiAgRG93bixcbiAgRm9jdXMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIEFuaW1hdGlvbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlc291cmNlczogUmVzb3VyY2VzLFxuICAgIGNvbG9ySW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgYWxwaGFJbWFnZTogSFRNTEltYWdlRWxlbWVudCxcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyXG4gICkge1xuICAgIHN1cGVyKHJlc291cmNlcywgY29sb3JJbWFnZSwgYWxwaGFJbWFnZSwgeCwgeSwgMywgT3JpZW50YXRpb24uaG9yaXpvbnRhbCk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLm9uTW91c2VEb3duKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMub25Nb3VzZVVwKTtcbiAgfVxuXG4gIG9uTW91c2VEb3duID0gKHsgY2xpZW50WCwgY2xpZW50WSB9OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy5jdXJyZW50RnJhbWUgPSB0aGlzLmlzUG9pbnRJbnNpZGUoY2xpZW50WCwgY2xpZW50WSlcbiAgICAgID8gTW91c2VTdGF0ZS5Eb3duXG4gICAgICA6IE1vdXNlU3RhdGUuT3V0O1xuICB9O1xuXG4gIG9uTW91c2VNb3ZlID0gKHsgY2xpZW50WCwgY2xpZW50WSB9OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy5jdXJyZW50RnJhbWUgPSB0aGlzLmlzUG9pbnRJbnNpZGUoY2xpZW50WCwgY2xpZW50WSlcbiAgICAgID8gTWF0aC5tYXgodGhpcy5jdXJyZW50RnJhbWUsIE1vdXNlU3RhdGUuT3ZlcilcbiAgICAgIDogTW91c2VTdGF0ZS5PdXQ7XG4gIH07XG5cbiAgb25Nb3VzZVVwID0gKHsgY2xpZW50WCwgY2xpZW50WSB9OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgdGhpcy5jdXJyZW50RnJhbWUgPSB0aGlzLmlzUG9pbnRJbnNpZGUoY2xpZW50WCwgY2xpZW50WSlcbiAgICAgID8gTW91c2VTdGF0ZS5PdmVyXG4gICAgICA6IE1vdXNlU3RhdGUuT3V0O1xuICB9O1xuXG4gIHJlbW92ZSgpOiB2b2lkIHtcbiAgICBzdXBlci5yZW1vdmUoKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5vbk1vdXNlTW92ZSk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMub25Nb3VzZURvd24pO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5vbk1vdXNlVXApO1xuICB9XG59XG4iLCJpbnRlcmZhY2UgRXZlbnRMaXN0ZW5lcjxUIGV4dGVuZHMgRXZlbnQ+IHtcbiAgKGV2ZW50OiBUKTogdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1pdHRlcjxcbiAgRXZlbnRzIGV4dGVuZHMgeyBbdHlwZTogc3RyaW5nXTogRXZlbnQgfSA9IFJlY29yZDxzdHJpbmcsIEV2ZW50PlxuPiB7XG4gIHByaXZhdGUgZGVsZWdhdGU6IERvY3VtZW50RnJhZ21lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kZWxlZ2F0ZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXI8VCBleHRlbmRzIHN0cmluZz4oXG4gICAgdHlwZTogVCxcbiAgICBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxFdmVudHNbVF0+XG4gICk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICBkaXNwYXRjaEV2ZW50PFQgZXh0ZW5kcyBrZXlvZiBFdmVudHM+KGV2ZW50OiBFdmVudHNbVF0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI8VCBleHRlbmRzIHN0cmluZz4oXG4gICAgdHlwZTogVCxcbiAgICBsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcjxFdmVudHNbVF0+XG4gICk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IEdyYW1tYXIsIFBhcnNlciB9IGZyb20gXCJuZWFybGV5XCI7XG5pbXBvcnQgQWxwaGFQaWN0dXJlIGZyb20gXCIuL0FscGhhUGljdHVyZVwiO1xuaW1wb3J0IGZvbnREZWZpbml0aW9uUnVsZXMgZnJvbSBcIi4vZm9udC1kZWZpbml0aW9uLm5lXCI7XG5pbXBvcnQgUGljdHVyZSBmcm9tIFwiLi9QaWN0dXJlXCI7XG5pbXBvcnQgUmVzb3VyY2VzIGZyb20gXCIuL1Jlc291cmNlc1wiO1xuaW1wb3J0IFRleHRQaWN0dXJlIGZyb20gXCIuL1RleHRQaWN0dXJlXCI7XG5cbmNvbnN0IGdyYW1tYXIgPSBHcmFtbWFyLmZyb21Db21waWxlZChmb250RGVmaW5pdGlvblJ1bGVzKTtcblxuZXhwb3J0IGludGVyZmFjZSBGb250TGF5ZXIge1xuICBDaGFyV2lkdGhzOiB7IFtjaGFyOiBzdHJpbmddOiBudW1iZXIgfTtcbiAgSW1hZ2U6IHN0cmluZztcbiAgSW1hZ2VNYXA6IHsgW2NoYXI6IHN0cmluZ106IG51bWJlcltdIH07XG4gIEtlcm5pbmdQYWlyczogeyBba2V5UGFpcjogc3RyaW5nXTogbnVtYmVyIH07XG4gIFBvaW50U2l6ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvbnREZWZpbml0aW9uIHtcbiAgQ2hhck1hcDogeyBbY2hhcjogc3RyaW5nXTogc3RyaW5nIH07XG4gIERlZmF1bHRQb2ludFNpemU6IG51bWJlcjtcbiAgbGF5ZXJzOiB7IFtuYW1lOiBzdHJpbmddOiBGb250TGF5ZXIgfTtcbn1cblxuaW50ZXJmYWNlIElkZW50aWZpZXIge1xuICB0eXBlOiBcImlkZW50aWZpZXJcIjtcbiAgdjogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgVmFsdWUge1xuICB0eXBlOiBcInZhbHVlXCI7XG4gIHY6IHVua25vd247XG59XG5cbmludGVyZmFjZSBMYXllclNldFZhbHVlIHtcbiAgYWN0aW9uOiB7IHR5cGU6IFwibGF5ZXJcIjsgdjogc3RyaW5nIH07XG4gIGlkOiBJZGVudGlmaWVyO1xuICB0eXBlOiBcInNpbmdsZVwiO1xuICB2YWx1ZTogVmFsdWU7XG59XG5cbmludGVyZmFjZSBEZWZpbmVWYXJpYWJsZSB7XG4gIGFjdGlvbjogeyB0eXBlOiBcImRlZmluZVwiIH07XG4gIGlkOiBJZGVudGlmaWVyO1xuICB0eXBlOiBcInNpbmdsZVwiO1xuICB2YWx1ZTogVmFsdWU7XG59XG5cbmludGVyZmFjZSBDcmVhdGVMYXllciB7XG4gIGFjdGlvbjogeyB0eXBlOiBcImNyZWF0ZUxheWVyXCIgfTtcbiAgaWQ6IElkZW50aWZpZXI7XG4gIHR5cGU6IFwic2luZ2xlXCI7XG4gIHZhbHVlOiB1bmRlZmluZWQ7XG59XG5cbmludGVyZmFjZSBMYXllclNldE1hcCB7XG4gIGFjdGlvbjogeyB0eXBlOiBcImxheWVyXCI7IHY6IHN0cmluZyB9O1xuICBpZDogSWRlbnRpZmllcjtcbiAga2V5OiBJZGVudGlmaWVyIHwgVmFsdWU7XG4gIHZhbHVlOiBJZGVudGlmaWVyIHwgVmFsdWU7XG4gIHR5cGU6IFwibWFwXCI7XG59XG5cbmludGVyZmFjZSBTZXQge1xuICBhY3Rpb246IHsgdHlwZTogXCJzZXRcIjsgdjogc3RyaW5nIH07XG4gIGtleTogSWRlbnRpZmllciB8IFZhbHVlO1xuICB2YWx1ZTogSWRlbnRpZmllciB8IFZhbHVlO1xuICB0eXBlOiBcIm1hcFwiIHwgXCJzaW5nbGVcIjtcbn1cblxudHlwZSBTdGF0ZW1lbnQgPVxuICB8IExheWVyU2V0VmFsdWVcbiAgfCBEZWZpbmVWYXJpYWJsZVxuICB8IENyZWF0ZUxheWVyXG4gIHwgTGF5ZXJTZXRNYXBcbiAgfCBTZXQ7XG5cbmZ1bmN0aW9uIGlzRGVmaW5lVmFyaWFibGUoc3RhdGVtZW50OiBTdGF0ZW1lbnQpOiBzdGF0ZW1lbnQgaXMgRGVmaW5lVmFyaWFibGUge1xuICByZXR1cm4gc3RhdGVtZW50LmFjdGlvbi50eXBlID09PSBcImRlZmluZVwiO1xufVxuXG5mdW5jdGlvbiBpc0NyZWF0ZUxheWVyKHN0YXRlbWVudDogU3RhdGVtZW50KTogc3RhdGVtZW50IGlzIENyZWF0ZUxheWVyIHtcbiAgcmV0dXJuIHN0YXRlbWVudC5hY3Rpb24udHlwZSA9PT0gXCJjcmVhdGVMYXllclwiO1xufVxuXG5mdW5jdGlvbiBpc0xheWVyU2V0KFxuICBzdGF0ZW1lbnQ6IFN0YXRlbWVudFxuKTogc3RhdGVtZW50IGlzIExheWVyU2V0TWFwIHwgTGF5ZXJTZXRWYWx1ZSB7XG4gIHJldHVybiBzdGF0ZW1lbnQuYWN0aW9uLnR5cGUgPT09IFwibGF5ZXJcIjtcbn1cblxuZnVuY3Rpb24gaXNTZXQoc3RhdGVtZW50OiBTdGF0ZW1lbnQpOiBzdGF0ZW1lbnQgaXMgU2V0IHtcbiAgcmV0dXJuIHN0YXRlbWVudC5hY3Rpb24udHlwZSA9PT0gXCJzZXRcIjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9udCB7XG4gIHByaXZhdGUgZm9udERlZmluaXRpb246IEZvbnREZWZpbml0aW9uO1xuICBwcml2YXRlIGZvbnRJbWFnZXMgPSBuZXcgTWFwPHN0cmluZywgUGljdHVyZT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc291cmNlczogUmVzb3VyY2VzLCBkZWZpbml0aW9uRmlsZUNvbnRlbnRzOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZvbnREZWZpbml0aW9uID0gRm9udC5wYXJzZURlZmluaXRpb25GaWxlKGRlZmluaXRpb25GaWxlQ29udGVudHMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEZvbnRJbWFnZShsYXllcjogc3RyaW5nKTogUGljdHVyZSB7XG4gICAgaWYgKHRoaXMuZm9udEltYWdlcy5oYXMobGF5ZXIpKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb250SW1hZ2VzLmdldChsYXllcik7XG4gICAgfVxuXG4gICAgY29uc3QgZm9udEltYWdlTmFtZSA9IHRoaXMuZm9udERlZmluaXRpb24ubGF5ZXJzW2xheWVyXS5JbWFnZTtcbiAgICBjb25zdCBjb2xvckltYWdlID0gdGhpcy5yZXNvdXJjZXMuaW1hZ2VzW2Bmb250cy8ke2ZvbnRJbWFnZU5hbWV9LmdpZmBdO1xuICAgIGNvbnN0IGFscGhhSW1hZ2UgPSB0aGlzLnJlc291cmNlcy5pbWFnZXNbYGZvbnRzL18ke2ZvbnRJbWFnZU5hbWV9LmdpZmBdO1xuICAgIGxldCBwaWN0dXJlOiBQaWN0dXJlO1xuICAgIGlmIChjb2xvckltYWdlKSB7XG4gICAgICBwaWN0dXJlID0gbmV3IEFscGhhUGljdHVyZSh0aGlzLnJlc291cmNlcywgY29sb3JJbWFnZSwgYWxwaGFJbWFnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBpY3R1cmUgPSBuZXcgUGljdHVyZSh0aGlzLnJlc291cmNlcywgYWxwaGFJbWFnZSk7XG4gICAgfVxuICAgIHRoaXMuZm9udEltYWdlcy5zZXQobGF5ZXIsIHBpY3R1cmUpO1xuICAgIHJldHVybiBwaWN0dXJlO1xuICB9XG5cbiAgY3JlYXRlVGV4dChcbiAgICBsYXllcjogc3RyaW5nLFxuICAgIHg6IFwiY2VudGVyXCIgfCBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHRleHQ6IHN0cmluZ1xuICApOiBUZXh0UGljdHVyZSB7XG4gICAgY29uc3QgZm9udEltYWdlID0gdGhpcy5nZXRGb250SW1hZ2UobGF5ZXIpO1xuICAgIHJldHVybiBuZXcgVGV4dFBpY3R1cmUoXG4gICAgICB0aGlzLmZvbnREZWZpbml0aW9uLFxuICAgICAgdGhpcy5yZXNvdXJjZXMsXG4gICAgICBmb250SW1hZ2UsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIGxheWVyLFxuICAgICAgdGV4dFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VEZWZpbml0aW9uRmlsZShkZWZpbml0aW9uRmlsZUNvbnRlbnRzOiBzdHJpbmcpOiBGb250RGVmaW5pdGlvbiB7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcihncmFtbWFyKTtcbiAgICBwYXJzZXIuZmVlZChkZWZpbml0aW9uRmlsZUNvbnRlbnRzKTtcblxuICAgIGNvbnN0IFtzdGF0ZW1lbnRzXSA9IHBhcnNlci5yZXN1bHRzO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgZm9udERlZmluaXRpb246IGFueSA9IHtcbiAgICAgIENoYXJNYXA6IHt9LFxuICAgICAgbGF5ZXJzOiB7fSxcbiAgICB9O1xuICAgIGNvbnN0IHZhcmlhYmxlcyA9IG5ldyBNYXA8c3RyaW5nLCB1bmtub3duPigpO1xuXG4gICAgZnVuY3Rpb24gZ2V0VmFsdWUodmFsdWU6IFZhbHVlIHwgSWRlbnRpZmllcikge1xuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09IFwiaWRlbnRpZmllclwiKSB7XG4gICAgICAgIHJldHVybiB2YXJpYWJsZXMuZ2V0KHZhbHVlLnYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlLnY7XG4gICAgfVxuXG4gICAgKHN0YXRlbWVudHMgYXMgU3RhdGVtZW50W10pLmZvckVhY2goKHN0YXRlbWVudCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gc3RhdGVtZW50LnZhbHVlICYmIGdldFZhbHVlKHN0YXRlbWVudC52YWx1ZSk7XG4gICAgICBpZiAoc3RhdGVtZW50LnR5cGUgPT09IFwibWFwXCIpIHtcbiAgICAgICAgdmFsdWUgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgICAgKGdldFZhbHVlKHN0YXRlbWVudC5rZXkpIGFzIHN0cmluZ1tdKS5tYXAoKGtleSwgaSkgPT4gW1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgKHZhbHVlIGFzIHVua25vd25bXSlbaV0sXG4gICAgICAgICAgXSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0RlZmluZVZhcmlhYmxlKHN0YXRlbWVudCkpIHtcbiAgICAgICAgdmFyaWFibGVzLnNldChzdGF0ZW1lbnQuaWQudiwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzQ3JlYXRlTGF5ZXIoc3RhdGVtZW50KSkge1xuICAgICAgICBmb250RGVmaW5pdGlvbi5sYXllcnNbc3RhdGVtZW50LmlkLnZdID0ge1xuICAgICAgICAgIEtlcm5pbmdQYWlyczoge30sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoaXNMYXllclNldChzdGF0ZW1lbnQpKSB7XG4gICAgICAgIGNvbnN0IGxheWVyID0gZm9udERlZmluaXRpb24ubGF5ZXJzW3N0YXRlbWVudC5pZC52XTtcbiAgICAgICAgY29uc3QgcHJvcGVydHkgPSBzdGF0ZW1lbnQuYWN0aW9uLnYgYXMga2V5b2YgRm9udExheWVyO1xuICAgICAgICBpZiAoc3RhdGVtZW50LnR5cGUgPT09IFwibWFwXCIpIHtcbiAgICAgICAgICBpZiAoIWxheWVyW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgbGF5ZXJbcHJvcGVydHldID0ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdC5hc3NpZ24obGF5ZXJbcHJvcGVydHldLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGF5ZXJbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc1NldChzdGF0ZW1lbnQpKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gc3RhdGVtZW50LmFjdGlvbi52IGFzIGtleW9mIEZvbnRMYXllcjtcbiAgICAgICAgaWYgKHN0YXRlbWVudC50eXBlID09PSBcIm1hcFwiKSB7XG4gICAgICAgICAgaWYgKCFmb250RGVmaW5pdGlvbltwcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgIGZvbnREZWZpbml0aW9uW3Byb3BlcnR5XSA9IHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBPYmplY3QuYXNzaWduKGZvbnREZWZpbml0aW9uW3Byb3BlcnR5XSwgdmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvbnREZWZpbml0aW9uW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvbnREZWZpbml0aW9uO1xuICB9XG59XG4iLCJpbXBvcnQgQWxwaGFQaWN0dXJlIGZyb20gXCIuL0FscGhhUGljdHVyZVwiO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgUGljdHVyZSBmcm9tIFwiLi9QaWN0dXJlXCI7XG5pbXBvcnQgU2NlbmUgZnJvbSBcIi4vU2NlbmVcIjtcblxuY29uc3QgbG9nID0gbG9nZ2VyLmV4dGVuZChcImxvYWRpbmdzY3JlZW5cIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmdTY3JlZW4gZXh0ZW5kcyBTY2VuZSB7XG4gIHByaXZhdGUgcHJvZ3Jlc3MgPSAwO1xuICBwcml2YXRlIGxvYWRpbmdCYXI6IFBpY3R1cmU7XG4gIHByaXZhdGUgcGxheU5vdzogUGljdHVyZTtcblxuICBwcml2YXRlIG9uUHJvZ3Jlc3MgPSAoZTogUHJvZ3Jlc3NFdmVudCkgPT4ge1xuICAgIHRoaXMucHJvZ3Jlc3MgPSBlLmxvYWRlZCAvIGUudG90YWw7XG4gIH07XG5cbiAgYXN5bmMgbG9hZFJlc291cmNlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCByID0gdGhpcy5yZXNvdXJjZXM7XG4gICAgY29uc3QgbG9hZGluZ1NjcmVlbkltYWdlID0gYXdhaXQgci5sb2FkSW1hZ2UoXCJpbWFnZXMvbG9hZGluZ3NjcmVlbi5qcGdcIik7XG4gICAgY29uc3QgbG9hZGluZ1NjcmVlbkJhY2tncm91bmQgPSBuZXcgUGljdHVyZShyLCBsb2FkaW5nU2NyZWVuSW1hZ2UpO1xuXG4gICAgY29uc3QgbG9hZGluZ0JhckltYWdlID0gYXdhaXQgci5sb2FkSW1hZ2UoXCJpbWFnZXMvTG9hZGVyQmFyLmdpZlwiKTtcbiAgICBjb25zdCBsb2FkaW5nQmFyQWxwaGFJbWFnZSA9IGF3YWl0IHIubG9hZEltYWdlKFwiaW1hZ2VzL19Mb2FkZXJCYXIuZ2lmXCIpO1xuICAgIHRoaXMubG9hZGluZ0JhciA9IG5ldyBBbHBoYVBpY3R1cmUoXG4gICAgICByLFxuICAgICAgbG9hZGluZ0JhckltYWdlLFxuICAgICAgbG9hZGluZ0JhckFscGhhSW1hZ2UsXG4gICAgICAxMjksXG4gICAgICAzNDlcbiAgICApO1xuXG4gICAgY29uc3QgY2FuY3VuRmxvYXQxNCA9IGF3YWl0IHIuZ2V0Rm9udChcIkNhbmN1bkZsb2F0MTRcIik7XG4gICAgYXdhaXQgci5sb2FkSW1hZ2UoXCJmb250cy9DYW5jdW5GbG9hdDE0LmdpZlwiKTtcbiAgICBhd2FpdCByLmxvYWRJbWFnZShcImZvbnRzL19DYW5jdW5GbG9hdDE0LmdpZlwiKTtcbiAgICB0aGlzLnBsYXlOb3cgPSBjYW5jdW5GbG9hdDE0LmNyZWF0ZVRleHQoXG4gICAgICBcIk1haW5cIixcbiAgICAgIFwiY2VudGVyXCIsXG4gICAgICA0NDEsXG4gICAgICBcIkNsaWNrIGhlcmUgdG8gcGxheSFcIlxuICAgICk7XG4gICAgdGhpcy5wbGF5Tm93LnNob3cgPSBmYWxzZTtcbiAgICB0aGlzLnBsYXlOb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25QbGF5Tm93KTtcblxuICAgIGNvbnN0IGVtaXR0ZXIgPSByLmxvYWRBbGxJbWFnZXMoKTtcbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCB0aGlzLm9uUHJvZ3Jlc3MpO1xuXG4gICAgdGhpcy5hZGRBY3RvcnMoW2xvYWRpbmdTY3JlZW5CYWNrZ3JvdW5kLCB0aGlzLnBsYXlOb3ddKTtcbiAgfVxuXG4gIGxvZ2ljKHRpbWVEaWZmOiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci5sb2dpYyh0aW1lRGlmZik7XG4gICAgdGhpcy5wbGF5Tm93LnNob3cgPSB0aGlzLnByb2dyZXNzID09PSAxO1xuICB9XG5cbiAgb25QbGF5Tm93ID0gKHsgY2xpZW50WCwgY2xpZW50WSB9OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKHRoaXMucGxheU5vdy5pc1BvaW50SW5zaWRlKGNsaWVudFgsIGNsaWVudFkpKSB7XG4gICAgICBsb2coXCJvblBsYXlOb3dcIik7XG4gICAgICB0aGlzLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgc3VwZXIuZHJhdyhjdHgpO1xuICAgIHRoaXMubG9hZGluZ0Jhci5kcmF3KGN0eCwgMCwgMCwgTWF0aC5yb3VuZCh0aGlzLnByb2dyZXNzICogMzk5KSwgNDQpO1xuICB9XG5cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIHN1cGVyLnJlbW92ZSgpO1xuICAgIHRoaXMubG9hZGluZ0Jhci5yZW1vdmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IEFscGhhUGljdHVyZSBmcm9tIFwiLi9BbHBoYVBpY3R1cmVcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcIi4vQnV0dG9uXCI7XG5pbXBvcnQgeyBsb2dnZXIsIFdJTl9XSURUSCB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gXCIuL0RyYXdhYmxlXCI7XG5pbXBvcnQgUGljdHVyZSBmcm9tIFwiLi9QaWN0dXJlXCI7XG5pbXBvcnQgU2NlbmUgZnJvbSBcIi4vU2NlbmVcIjtcblxuY29uc3QgbG9nID0gbG9nZ2VyLmV4dGVuZChcIm1haW5tZW51XCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTWVudSBleHRlbmRzIFNjZW5lIHtcbiAgcHJpdmF0ZSBza3k6IFBpY3R1cmVbXTtcbiAgcHJpdmF0ZSBzdW5HbG93OiBQaWN0dXJlO1xuXG4gIHNldHVwKCk6IERyYXdhYmxlW10ge1xuICAgIGxvZyhcInNldHVwXCIpO1xuICAgIGNvbnN0IHIgPSB0aGlzLnJlc291cmNlcztcbiAgICB0aGlzLnNreSA9IFstMSwgMCwgMV0ubWFwKFxuICAgICAgKHBvcykgPT4gbmV3IFBpY3R1cmUociwgci5pbWFnZXNbXCJpbWFnZXMvbW1za3kuanBnXCJdLCA1MjAgKiBwb3MsIDApXG4gICAgKTtcbiAgICB0aGlzLnN1bkdsb3cgPSBuZXcgUGljdHVyZShyLCByLmltYWdlc1tcImltYWdlcy9fbW1zdW5nbG93LmpwZ1wiXSwgLTcwLCAtNzApO1xuICAgIHRoaXMuc3VuR2xvdy5maWxsKFsyNTUsIDI1NSwgMF0pO1xuXG4gICAgci5nZXRGb250KFwiQ2FuY3VuMTBcIikudGhlbigoY2FuY3VuMTApID0+IHtcbiAgICAgIGNvbnN0IGNoYW5nZVVzZXIgPSBjYW5jdW4xMC5jcmVhdGVUZXh0KFxuICAgICAgICBcIk1haW5cIixcbiAgICAgICAgXCJjZW50ZXJcIixcbiAgICAgICAgMzgsXG4gICAgICAgIFwiKElmIHRoaXMgaXMgbm90IHlvdSwgY2xpY2sgaGVyZS4pXCJcbiAgICAgICk7XG4gICAgICBjaGFuZ2VVc2VyLmZpbGwoWzkyLCA1NiwgMF0pO1xuICAgICAgdGhpcy5hZGRBY3RvcnMoW2NoYW5nZVVzZXJdKTtcbiAgICB9KTtcblxuICAgIHIuZ2V0Rm9udChcIk5hdGl2ZUFsaWVuRXh0ZW5kZWQxNlwiKS50aGVuKChuYXRpdmVBbGllbkV4dGVuZGVkMTYpID0+IHtcbiAgICAgIGNvbnN0IHdlbGNvbWVUZXh0ID0gbmF0aXZlQWxpZW5FeHRlbmRlZDE2LmNyZWF0ZVRleHQoXG4gICAgICAgIFwiTWFpblwiLFxuICAgICAgICBcImNlbnRlclwiLFxuICAgICAgICAtNyxcbiAgICAgICAgXCJXZWxjb21lIHRvIFp1bWEsIHBlcnNvbiFcIlxuICAgICAgKTtcbiAgICAgIHRoaXMuYWRkQWN0b3JzKFt3ZWxjb21lVGV4dF0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLnN1cGVyLnNldHVwKCksXG4gICAgICAuLi50aGlzLnNreSxcbiAgICAgIG5ldyBBbHBoYVBpY3R1cmUoXG4gICAgICAgIHIsXG4gICAgICAgIHIuaW1hZ2VzW1wiaW1hZ2VzL21tc2NyZWVuLmpwZ1wiXSxcbiAgICAgICAgci5pbWFnZXNbXCJpbWFnZXMvX21tc2NyZWVuLmdpZlwiXVxuICAgICAgKSxcbiAgICAgIHRoaXMuc3VuR2xvdyxcbiAgICAgIG5ldyBBbHBoYVBpY3R1cmUoXG4gICAgICAgIHIsXG4gICAgICAgIHIuaW1hZ2VzW1wiaW1hZ2VzL21tc3VuLmdpZlwiXSxcbiAgICAgICAgci5pbWFnZXNbXCJpbWFnZXMvX21tc3VuLmdpZlwiXVxuICAgICAgKSxcbiAgICAgIG5ldyBBbHBoYVBpY3R1cmUoXG4gICAgICAgIHIsXG4gICAgICAgIHIuaW1hZ2VzW1wiaW1hZ2VzL21tZXllbGVmdC5naWZcIl0sXG4gICAgICAgIHIuaW1hZ2VzW1wiaW1hZ2VzL19tbWV5ZWxlZnQuZ2lmXCJdLFxuICAgICAgICAyMTMsXG4gICAgICAgIDM1MlxuICAgICAgKSxcbiAgICAgIG5ldyBBbHBoYVBpY3R1cmUoXG4gICAgICAgIHIsXG4gICAgICAgIHIuaW1hZ2VzW1wiaW1hZ2VzL21tZXllcmlnaHQuZ2lmXCJdLFxuICAgICAgICByLmltYWdlc1tcImltYWdlcy9fbW1leWVyaWdodC5naWZcIl0sXG4gICAgICAgIDI3MixcbiAgICAgICAgMzQwXG4gICAgICApLFxuICAgICAgbmV3IEJ1dHRvbihcbiAgICAgICAgcixcbiAgICAgICAgci5pbWFnZXNbXCJpbWFnZXMvbW1BUkNBREVCVVRUT04uanBnXCJdLFxuICAgICAgICByLmltYWdlc1tcImltYWdlcy9fbW1BUkNBREVCVVRUT04uZ2lmXCJdLFxuICAgICAgICA0NTIsXG4gICAgICAgIDY0XG4gICAgICApLFxuICAgICAgbmV3IEJ1dHRvbihcbiAgICAgICAgcixcbiAgICAgICAgci5pbWFnZXNbXCJpbWFnZXMvbW1HQVVOVExFVEJVVFRPTi5qcGdcIl0sXG4gICAgICAgIHIuaW1hZ2VzW1wiaW1hZ2VzL19tbUdBVU5UTEVUQlVUVE9OLmdpZlwiXSxcbiAgICAgICAgNDM2LFxuICAgICAgICAxNTNcbiAgICAgICksXG4gICAgICBuZXcgQnV0dG9uKFxuICAgICAgICByLFxuICAgICAgICByLmltYWdlc1tcImltYWdlcy9tbU9QVElPTlNCVVRUT04uanBnXCJdLFxuICAgICAgICByLmltYWdlc1tcImltYWdlcy9fbW1PUFRJT05TQlVUVE9OLmdpZlwiXSxcbiAgICAgICAgNDE4LFxuICAgICAgICAyMzZcbiAgICAgICksXG4gICAgICBuZXcgQnV0dG9uKFxuICAgICAgICByLFxuICAgICAgICByLmltYWdlc1tcImltYWdlcy9tbU1PUkVHQU1FU0JVVFRPTi5qcGdcIl0sXG4gICAgICAgIHIuaW1hZ2VzW1wiaW1hZ2VzL19tbU1PUkVHQU1FU0JVVFRPTi5naWZcIl0sXG4gICAgICAgIDM5NCxcbiAgICAgICAgMzA2XG4gICAgICApLFxuICAgICAgbmV3IEJ1dHRvbihcbiAgICAgICAgcixcbiAgICAgICAgci5pbWFnZXNbXCJpbWFnZXMvbW1RVUlUQlVUVE9OLmpwZ1wiXSxcbiAgICAgICAgci5pbWFnZXNbXCJpbWFnZXMvX21tUVVJVEJVVFRPTi5naWZcIl0sXG4gICAgICAgIDQ5NixcbiAgICAgICAgMzE0XG4gICAgICApLFxuICAgIF07XG4gIH1cblxuICBsb2dpYyh0aW1lRGlmZjogbnVtYmVyKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBza3kgb2YgdGhpcy5za3kpIHtcbiAgICAgIHNreS54ICs9IHRpbWVEaWZmICogMC4wMjtcbiAgICAgIGlmIChza3kueCA+IFdJTl9XSURUSCkge1xuICAgICAgICBza3kueCAtPSA1MjAgKiAzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc3VuR2xvdy5hZGRSb3RhdGlvbih0aW1lRGlmZiAqIDAuMDAwOCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGxvZ2dlciB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IERyYXdhYmxlIGZyb20gXCIuL0RyYXdhYmxlXCI7XG5pbXBvcnQgRW1pdHRlciBmcm9tIFwiLi9FbWl0dGVyXCI7XG5pbXBvcnQgUmVzb3VyY2VzIGZyb20gXCIuL1Jlc291cmNlc1wiO1xuXG50eXBlIENvb3JkczJEID0gW251bWJlciwgbnVtYmVyXTtcbnR5cGUgRXZlbnRzTWFwID0ge1xuICBjbGljazogTW91c2VFdmVudDtcbn07XG50eXBlIEltYWdlU291cmNlID0gSFRNTEltYWdlRWxlbWVudCB8IEhUTUxDYW52YXNFbGVtZW50O1xudHlwZSBSR0IgPSBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbmNvbnN0IGxvZyA9IGxvZ2dlci5leHRlbmQoXCJwaWN0dXJlXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaWN0dXJlIGV4dGVuZHMgRW1pdHRlcjxFdmVudHNNYXA+IGltcGxlbWVudHMgRHJhd2FibGUge1xuICBjZW50ZXI6IENvb3JkczJEO1xuICByb3RhdGlvbiA9IDA7XG4gIHNob3cgPSB0cnVlO1xuICBwcm90ZWN0ZWQgY29udGV4dDJkOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcmVzb3VyY2VzOiBSZXNvdXJjZXMsXG4gICAgcHJvdGVjdGVkIGltYWdlOiBJbWFnZVNvdXJjZSxcbiAgICBwdWJsaWMgeCA9IDAsXG4gICAgcHVibGljIHkgPSAwXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jZW50ZXIgPSBbdGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMl07XG4gIH1cblxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZS53aWR0aDtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gIH1cblxuICBpc1BvaW50SW5zaWRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc2hvdyAmJlxuICAgICAgdGhpcy54IDwgeCAmJlxuICAgICAgeCA8IHRoaXMueCArIHRoaXMud2lkdGggJiZcbiAgICAgIHRoaXMueSA8IHkgJiZcbiAgICAgIHkgPCB0aGlzLnkgKyB0aGlzLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBzZXRQb3MocG9zOiBDb29yZHMyRCk6IHRoaXMge1xuICAgIHRoaXMueCA9IHBvc1swXTtcbiAgICB0aGlzLnkgPSBwb3NbMV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXRSb3RhdGlvbihyb3RhdGlvbjogbnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkUm90YXRpb24oZGlmZjogbnVtYmVyKTogdGhpcyB7XG4gICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgZGlmZikgJSAoMiAqIE1hdGguUEkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZmlsbChjb2xvcjogUkdCKTogdGhpcyB7XG4gICAgbG9nKFwiZmlsbCAlb1wiLCBjb2xvcik7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLmltYWdlO1xuICAgIGNvbnN0IGN0eCA9IHRoaXMucmVzb3VyY2VzLmdldENhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcbiAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIDAsIDApO1xuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbiA9IGltYWdlRGF0YS5kYXRhLmxlbmd0aDsgaSA8IG47IGkgKz0gNCkge1xuICAgICAgaW1hZ2VEYXRhLmRhdGFbaSArIDNdID1cbiAgICAgICAgKGltYWdlRGF0YS5kYXRhW2ldICsgaW1hZ2VEYXRhLmRhdGFbaSArIDFdICsgaW1hZ2VEYXRhLmRhdGFbaSArIDJdKSAvIDM7XG4gICAgICBpbWFnZURhdGEuZGF0YVtpXSA9IGNvbG9yWzBdO1xuICAgICAgaW1hZ2VEYXRhLmRhdGFbaSArIDFdID0gY29sb3JbMV07XG4gICAgICBpbWFnZURhdGEuZGF0YVtpICsgMl0gPSBjb2xvclsyXTtcbiAgICB9XG5cbiAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgdGhpcy5pbWFnZSA9IGN0eC5jYW52YXM7XG4gICAgaWYgKHRoaXMuY29udGV4dDJkKSB7XG4gICAgICB0aGlzLnJlc291cmNlcy5mcmVlQ2FudmFzKHRoaXMuY29udGV4dDJkKTtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0MmQgPSBjdHg7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkcmF3KFxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgIHN4PzogbnVtYmVyLFxuICAgIHN5PzogbnVtYmVyLFxuICAgIHdpZHRoPzogbnVtYmVyLFxuICAgIGhlaWdodD86IG51bWJlcixcbiAgICB4OiBudW1iZXIgPSB0aGlzLngsXG4gICAgeTogbnVtYmVyID0gdGhpcy55XG4gICk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNob3cpIHtcbiAgICAgIGlmICh0aGlzLnJvdGF0aW9uKSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGNvbnN0IGRpbSA9IFt4ICsgdGhpcy5jZW50ZXJbMF0sIHkgKyB0aGlzLmNlbnRlclsxXV07XG4gICAgICAgIGN0eC50cmFuc2xhdGUoZGltWzBdLCBkaW1bMV0pO1xuICAgICAgICBjdHgucm90YXRlKHRoaXMucm90YXRpb24pO1xuICAgICAgICBjdHgudHJhbnNsYXRlKC1kaW1bMF0sIC1kaW1bMV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHN4ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgc3gsIHN5LCB3aWR0aCwgaGVpZ2h0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgeCwgeSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnJvdGF0aW9uKSB7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRleHQyZCkge1xuICAgICAgdGhpcy5yZXNvdXJjZXMuZnJlZUNhbnZhcyh0aGlzLmNvbnRleHQyZCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgSlNaaXAgZnJvbSBcImpzemlwXCI7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBFbWl0dGVyIGZyb20gXCIuL0VtaXR0ZXJcIjtcbmltcG9ydCBGb250IGZyb20gXCIuL0ZvbnRcIjtcblxuY29uc3QgbG9nID0gbG9nZ2VyLmV4dGVuZChcInJlc291cmNlc1wiKTtcblxudHlwZSBJbWFnZUxvYWRlckV2ZW50TWFwID0ge1xuICBwcm9ncmVzczogUHJvZ3Jlc3NFdmVudDtcbiAgZXJyb3I6IEV2ZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzb3VyY2VzIHtcbiAgcHJpdmF0ZSBmb250RGVmaW5pdGlvbnM6IHsgW2ZvbnROYW1lOiBzdHJpbmddOiBGb250IH0gPSB7fTtcbiAgcHJpdmF0ZSBmcmVlQ2FudmFzZXM6IEhUTUxDYW52YXNFbGVtZW50W10gPSBbXTtcbiAgcHVibGljIGltYWdlczogeyBbZmlsZVBhdGg6IHN0cmluZ106IEhUTUxJbWFnZUVsZW1lbnQgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZnM6IEpTWmlwKSB7fVxuXG4gIGFzeW5jIGdldEZvbnQoZm9udE5hbWU6IHN0cmluZyk6IFByb21pc2U8Rm9udD4ge1xuICAgIGlmICh0aGlzLmZvbnREZWZpbml0aW9uc1tmb250TmFtZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLmZvbnREZWZpbml0aW9uc1tmb250TmFtZV07XG4gICAgfVxuXG4gICAgY29uc3QgZm9udERlZmluaXRpb25GaWxlID0gYXdhaXQgdGhpcy5mc1xuICAgICAgLmZpbGUoYGZvbnRzLyR7Zm9udE5hbWV9LnR4dGApXG4gICAgICAuYXN5bmMoXCJzdHJpbmdcIik7XG5cbiAgICBjb25zdCBmb250ID0gbmV3IEZvbnQodGhpcywgZm9udERlZmluaXRpb25GaWxlKTtcbiAgICB0aGlzLmZvbnREZWZpbml0aW9uc1tmb250TmFtZV0gPSBmb250O1xuICAgIHJldHVybiBmb250O1xuICB9XG5cbiAgZnJlZUNhbnZhcyhjb250ZXh0MmQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIHRoaXMuZnJlZUNhbnZhc2VzLnB1c2goY29udGV4dDJkLmNhbnZhcyk7XG4gIH1cblxuICBnZXRDYW52YXMod2lkdGg/OiBudW1iZXIsIGhlaWdodD86IG51bWJlcik6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgbGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgaWYgKHRoaXMuZnJlZUNhbnZhc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNhbnZhcyA9IHRoaXMuZnJlZUNhbnZhc2VzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgbG9nKFwibmV3IGNhbnZhc1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgcmV0dXJuIGN0eDtcbiAgfVxuXG4gIGFzeW5jIGxvYWRJbWFnZShmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiB7XG4gICAgbG9nKFwiaW1hZ2UgbG9hZCBzdGFydFwiLCBmaWxlUGF0aCk7XG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHRoaXMuZnMuZmlsZShmaWxlUGF0aCkuYXN5bmMoXCJibG9iXCIpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgIGZpbGVSZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGV2KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0IH0gPSBldi50YXJnZXQ7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmlsZVJlYWRlciBkaWQgbm90IHJldHVybiBhIHZhbGlkIHN0cmluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbWFnZXNbZmlsZVBhdGhdID0gaW1hZ2U7XG4gICAgICAgICAgdGhpcy5mcy5yZW1vdmUoZmlsZVBhdGgpO1xuICAgICAgICAgIGxvZyhcImltYWdlIGxvYWQgZmluaXNoZWRcIiwgZmlsZVBhdGgpO1xuICAgICAgICAgIHJlc29sdmUoaW1hZ2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHJlamVjdCk7XG4gICAgICAgIGltYWdlLnNyYyA9IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgICAgZmlsZVJlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgcmVqZWN0KTtcbiAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRBbGxJbWFnZXMoKTogRW1pdHRlcjxJbWFnZUxvYWRlckV2ZW50TWFwPiB7XG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBFbWl0dGVyPEltYWdlTG9hZGVyRXZlbnRNYXA+KCk7XG4gICAgY29uc3QgaW1hZ2VzID0gdGhpcy5mcy5maWxlKC9eKGZvbnRzfGltYWdlc3xsZXZlbHMpXFwvLitcXC4oZ2lmfGpwZykkLyk7XG4gICAgY29uc3QgdG90YWwgPSBpbWFnZXMubGVuZ3RoO1xuICAgIGxldCBsb2FkZWQgPSAwO1xuXG4gICAgLy8gbG9hZHMgb25lIGltYWdlIGF0IGEgdGltZVxuICAgIGltYWdlcy5yZWR1Y2UoXG4gICAgICAocHJvbWlzZXMsIGltYWdlKSA9PlxuICAgICAgICAvLyBjaGVja3MgdGhhdCBhbGwgcHJldmlvdXMgaW1hZ2VzIHdlcmUgbG9hZGVkIGJlZm9yZSBsb2FkaW5nIGN1cnJlbnQgb25lXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShwcm9taXNlcykudGhlbihhc3luYyAocHJldmlvdXNSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW1hZ2VFbGVtZW50ID0gYXdhaXQgdGhpcy5sb2FkSW1hZ2UoaW1hZ2UubmFtZSk7XG4gICAgICAgICAgbG9hZGVkKys7XG4gICAgICAgICAgbG9nKFwicHJvZ3Jlc3MgJWQgb3V0IG9mICVkXCIsIGxvYWRlZCwgdG90YWwpO1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IFByb2dyZXNzRXZlbnQoXCJwcm9ncmVzc1wiLCB7IGxvYWRlZCwgdG90YWwgfSk7XG4gICAgICAgICAgZW1pdHRlci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICByZXR1cm4gWy4uLnByZXZpb3VzUmVzdWx0cywgaW1hZ2VFbGVtZW50XTtcbiAgICAgICAgfSksXG4gICAgICBQcm9taXNlLnJlc29sdmUoW10pXG4gICAgKTtcblxuICAgIHJldHVybiBlbWl0dGVyO1xuICB9XG59XG4iLCJpbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCBEcmF3YWJsZSBmcm9tIFwiLi9EcmF3YWJsZVwiO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSBcIi4vRW1pdHRlclwiO1xuaW1wb3J0IHR5cGUgUmVzb3VyY2VzIGZyb20gXCIuL1Jlc291cmNlc1wiO1xuXG50eXBlIEV2ZW50c01hcCA9IHtcbiAgY2xpY2s6IE1vdXNlRXZlbnQ7XG4gIHJlbW92ZTogRXZlbnQ7XG59O1xuXG5jb25zdCBsb2cgPSBsb2dnZXIuZXh0ZW5kKFwic2NlbmVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIFNjZW5lXG4gIGV4dGVuZHMgRW1pdHRlcjxFdmVudHNNYXA+XG4gIGltcGxlbWVudHMgRHJhd2FibGVcbntcbiAgcHJvdGVjdGVkIGFjdG9yczogRHJhd2FibGVbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZXNvdXJjZXM6IFJlc291cmNlcywgcHVibGljIHggPSAwLCBwdWJsaWMgeSA9IDApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYWRkQWN0b3JzKHRoaXMuc2V0dXAoKSk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5vbk1vdXNlRG93bik7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5vbk1vdXNlVXApO1xuICB9XG5cbiAgYWRkQWN0b3JzKGFjdG9yczogRHJhd2FibGVbXSwgcHJpb3JpdHkgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5hY3RvcnMuc3BsaWNlKHRoaXMuYWN0b3JzLmxlbmd0aCAtIDEgLSBwcmlvcml0eSwgMCwgLi4uYWN0b3JzKTtcbiAgfVxuXG4gIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuXG4gICAgZm9yIChjb25zdCBhY3RvciBvZiB0aGlzLmFjdG9ycykge1xuICAgICAgYWN0b3IuZHJhdyhjdHgpO1xuICAgIH1cblxuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBpc1BvaW50SW5zaWRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFsuLi50aGlzLmFjdG9yc11cbiAgICAgIC5yZXZlcnNlKClcbiAgICAgIC5zb21lKChhY3RvcikgPT4gYWN0b3IuaXNQb2ludEluc2lkZSh4LCB5KSk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gIGxvZ2ljKHRpbWVEaWZmOiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyB0aGlzIHdpbGwgZ2V0IG92ZXJ3cml0dGVuIGJ5IHNjZW5lc1xuICB9XG5cbiAgb25DbGljayA9IHRoaXMuZm9yd2FyZE1vdXNlRXZlbnQoXCJjbGlja1wiKTtcbiAgb25Nb3VzZURvd24gPSB0aGlzLmZvcndhcmRNb3VzZUV2ZW50KFwibW91c2Vkb3duXCIpO1xuICBvbk1vdXNlTW92ZSA9IHRoaXMuZm9yd2FyZE1vdXNlRXZlbnQoXCJtb3VzZW1vdmVcIik7XG4gIG9uTW91c2VVcCA9IHRoaXMuZm9yd2FyZE1vdXNlRXZlbnQoXCJtb3VzZXVwXCIpO1xuXG4gIHNldHVwKCk6IERyYXdhYmxlW10ge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJlbW92ZSgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGFjdG9yIG9mIHRoaXMuYWN0b3JzKSB7XG4gICAgICBhY3Rvci5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInJlbW92ZVwiKSk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrKTtcbiAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5vbk1vdXNlRG93bik7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMub25Nb3VzZU1vdmUpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5vbk1vdXNlVXApO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3J3YXJkTW91c2VFdmVudCh0eXBlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHsgY2xpZW50WCwgY2xpZW50WSB9OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmFjdG9ycy5mb3JFYWNoKChhY3RvcikgPT4ge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBNb3VzZUV2ZW50KHR5cGUsIHsgY2xpZW50WCwgY2xpZW50WSB9KTtcbiAgICAgICAgYWN0b3IuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBXSU5fSEVJR0hULCBXSU5fV0lEVEggfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB0eXBlIHsgRm9udERlZmluaXRpb24sIEZvbnRMYXllciB9IGZyb20gXCIuL0ZvbnRcIjtcbmltcG9ydCBQaWN0dXJlIGZyb20gXCIuL1BpY3R1cmVcIjtcbmltcG9ydCBSZXNvdXJjZXMgZnJvbSBcIi4vUmVzb3VyY2VzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRQaWN0dXJlIGV4dGVuZHMgUGljdHVyZSB7XG4gIHByb3RlY3RlZCBmb250RGVmaW5pdGlvbjogRm9udERlZmluaXRpb247XG4gIHByb3RlY3RlZCBmb250SW1hZ2U6IFBpY3R1cmU7XG4gIHByb3RlY3RlZCBsYXllcjogc3RyaW5nO1xuICBwcm90ZWN0ZWQgdGV4dDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGZvbnREZWZpbml0aW9uOiBGb250RGVmaW5pdGlvbixcbiAgICByZXNvdXJjZXM6IFJlc291cmNlcyxcbiAgICBmb250SW1hZ2U6IFBpY3R1cmUsXG4gICAgeDogXCJjZW50ZXJcIiB8IG51bWJlcixcbiAgICB5OiBcImNlbnRlclwiIHwgbnVtYmVyLFxuICAgIGxheWVyOiBzdHJpbmcsXG4gICAgdGV4dDogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IGN0eCA9IHJlc291cmNlcy5nZXRDYW52YXMoKTtcbiAgICBzdXBlcihyZXNvdXJjZXMsIGN0eC5jYW52YXMpO1xuICAgIHRoaXMuZm9udERlZmluaXRpb24gPSBmb250RGVmaW5pdGlvbjtcbiAgICB0aGlzLmZvbnRJbWFnZSA9IGZvbnRJbWFnZTtcbiAgICB0aGlzLmxheWVyID0gbGF5ZXI7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcblxuICAgIGNvbnN0IHsgaGVpZ2h0IH0gPSBmb250SW1hZ2U7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmNhbGN1bGF0ZVdpZHRoKCk7XG5cbiAgICBjdHguY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY3R4LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLnNldFBvcyhbXG4gICAgICB4ID09PSBcImNlbnRlclwiID8gKFdJTl9XSURUSCAtIHdpZHRoKSAvIDIgOiB4LFxuICAgICAgeSA9PT0gXCJjZW50ZXJcIiA/IChXSU5fSEVJR0hUIC0gaGVpZ2h0KSAvIDIgOiB5LFxuICAgIF0pO1xuXG4gICAgdGhpcy5kcmF3VGV4dChjdHgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3VGV4dChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIGxldCB4ID0gMDtcbiAgICBjb25zdCBsZXR0ZXJzID0gdGhpcy5sZXR0ZXJzKCk7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBsZXR0ZXJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgY29uc3QgbGV0dGVyID0gbGV0dGVyc1tpXTtcbiAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmxheWVyRGVmaW5pdGlvbi5JbWFnZU1hcFtsZXR0ZXJdO1xuICAgICAgaWYgKHJlY3QpIHtcbiAgICAgICAgdGhpcy5mb250SW1hZ2UuZHJhdyhjdHgsIHJlY3RbMF0sIHJlY3RbMV0sIHJlY3RbMl0sIHJlY3RbM10sIHgsIDApO1xuICAgICAgfVxuICAgICAgbGV0IGtleXJpbmdQYWlyID0gMDtcbiAgICAgIGlmIChpIDwgbiAtIDEpIHtcbiAgICAgICAgY29uc3QgbGFzdENoYXJQYWlyID0gYCR7bGV0dGVyfSR7bGV0dGVyc1tpICsgMV19YDtcbiAgICAgICAga2V5cmluZ1BhaXIgPSB0aGlzLmxheWVyRGVmaW5pdGlvbi5LZXJuaW5nUGFpcnNbbGFzdENoYXJQYWlyXSB8fCAwO1xuICAgICAgfVxuICAgICAgeCArPSB0aGlzLmxheWVyRGVmaW5pdGlvbi5DaGFyV2lkdGhzW2xldHRlcl0gKyBrZXlyaW5nUGFpcjtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0MmQgPSBjdHg7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGxheWVyRGVmaW5pdGlvbigpOiBGb250TGF5ZXIge1xuICAgIHJldHVybiB0aGlzLmZvbnREZWZpbml0aW9uLmxheWVyc1t0aGlzLmxheWVyXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYWxjdWxhdGVXaWR0aCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGxldHRlcnMgPSB0aGlzLmxldHRlcnMoKTtcbiAgICBjb25zdCB3aWR0aCA9IGxldHRlcnNcbiAgICAgIC5tYXAoKGxldHRlcikgPT4gdGhpcy5sYXllckRlZmluaXRpb24uQ2hhcldpZHRoc1tsZXR0ZXJdKVxuICAgICAgLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpO1xuICAgIGNvbnN0IGxhc3RMZXR0ZXIgPSBsZXR0ZXJzW2xldHRlcnMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIChcbiAgICAgIHdpZHRoIC1cbiAgICAgIHRoaXMubGF5ZXJEZWZpbml0aW9uLkNoYXJXaWR0aHNbbGFzdExldHRlcl0gK1xuICAgICAgdGhpcy5sYXllckRlZmluaXRpb24uSW1hZ2VNYXBbbGFzdExldHRlcl1bMl1cbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxldHRlcnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLnRleHRcbiAgICAgIC5zcGxpdChcIlwiKVxuICAgICAgLm1hcCgoY2hhcikgPT4gdGhpcy5mb250RGVmaW5pdGlvbi5DaGFyTWFwW2NoYXJdIHx8IGNoYXIpO1xuICB9XG59XG4iLCJpbXBvcnQgZGVidWcgZnJvbSBcImRlYnVnXCI7XG5cbmV4cG9ydCBjb25zdCBsb2dnZXIgPSBkZWJ1ZyhcImZyb2dcIik7XG5leHBvcnQgY29uc3QgV0lOX1dJRFRIID0gNjQwO1xuZXhwb3J0IGNvbnN0IFdJTl9IRUlHSFQgPSA0ODA7XG4iLCJpbXBvcnQgemlwTG9hZGVyIGZyb20gXCIuLi9zaGFyZWQvemlwTG9hZGVyXCI7XG5pbXBvcnQgbW92aWUgZnJvbSBcIi4vbW92aWVcIjtcbmltcG9ydCBSZXNvdXJjZXMgZnJvbSBcIi4vUmVzb3VyY2VzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGNvbnN0IHppcEZpbGUgPSBhd2FpdCB6aXBMb2FkZXIoKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkcm9wLWxlZ2VuZFwiKS5yZW1vdmUoKTtcbiAgY29uc3QgcmVzb3VyY2VzID0gbmV3IFJlc291cmNlcyh6aXBGaWxlKTtcbiAgbW92aWUocmVzb3VyY2VzLCBkb2N1bWVudC5ib2R5KTtcbn1cblxubWFpbigpLmNhdGNoKChlKSA9PiB7XG4gIHRocm93IGU7XG59KTtcbiIsImltcG9ydCB7IGxvZ2dlciwgV0lOX0hFSUdIVCwgV0lOX1dJRFRIIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgTG9hZGluZ1NjcmVlbiBmcm9tIFwiLi9Mb2FkaW5nU2NyZWVuXCI7XG5pbXBvcnQgTWFpbk1lbnUgZnJvbSBcIi4vTWFpbk1lbnVcIjtcbmltcG9ydCBSZXNvdXJjZXMgZnJvbSBcIi4vUmVzb3VyY2VzXCI7XG5pbXBvcnQgU2NlbmUgZnJvbSBcIi4vU2NlbmVcIjtcblxuY29uc3QgbG9nID0gbG9nZ2VyLmV4dGVuZChcIm1vdmllXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBtb3ZpZShcbiAgcjogUmVzb3VyY2VzLFxuICBjb250YWluZXI6IEhUTUxFbGVtZW50XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgbWFpbkN0eCA9IHIuZ2V0Q2FudmFzKFdJTl9XSURUSCwgV0lOX0hFSUdIVCk7XG4gIGNvbnN0IGNhbnZhcyA9IG1haW5DdHguY2FudmFzO1xuXG4gIC8vIEFwcGVuZCBjYW52YXMgdG8gY29udGFpbmVyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpO1xuXG4gIGNvbnN0IGxvYWRpbmdTY3JlZW4gPSBuZXcgTG9hZGluZ1NjcmVlbihyKTtcblxuICAvLyAnZ2xvYmFsJyB2YXJpYWJsZXNcbiAgbGV0IGxhc3RUaW1lID0gMDtcbiAgbGV0IHNjZW5lOiBTY2VuZSA9IGxvYWRpbmdTY3JlZW47XG4gIHNjZW5lLmFkZEV2ZW50TGlzdGVuZXIoXCJyZW1vdmVcIiwgYXN5bmMgKCkgPT4ge1xuICAgIC8vIHNjZW5lLnJlbW92ZSgpO1xuICAgIHNjZW5lID0gbmV3IE1haW5NZW51KHIpO1xuICAgIGxvZyhcInNjZW5lIGNoYW5nZVwiLCBzY2VuZSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGF0dGFjaEV2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nKSB7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgKHsgcGFnZVgsIHBhZ2VZIH06IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCB4ID0gcGFnZVggLSByZWN0Lng7XG4gICAgICBjb25zdCB5ID0gcGFnZVkgLSByZWN0Lnk7XG4gICAgICBzY2VuZS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KHR5cGUsIHsgY2xpZW50WDogeCwgY2xpZW50WTogeSB9KSk7XG4gICAgfSk7XG4gIH1cblxuICBhdHRhY2hFdmVudExpc3RlbmVyKFwiY2xpY2tcIik7XG4gIGF0dGFjaEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIik7XG4gIGF0dGFjaEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIik7XG4gIGF0dGFjaEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIpO1xuXG4gIGF3YWl0IGxvYWRpbmdTY3JlZW4ubG9hZFJlc291cmNlcygpO1xuXG4gIGZ1bmN0aW9uIGRyYXdMb2FkaW5nKHRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgY29uc3QgdGltZWRpZmYgPSB0aW1lc3RhbXAgLSBsYXN0VGltZTtcbiAgICBsYXN0VGltZSA9IHRpbWVzdGFtcDtcbiAgICBzY2VuZS5sb2dpYyh0aW1lZGlmZik7XG4gICAgc2NlbmUuZHJhdyhtYWluQ3R4KTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhd0xvYWRpbmcpO1xuICB9XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXdMb2FkaW5nKTtcbn1cbiIsImltcG9ydCBKU1ppcCBmcm9tIFwianN6aXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gemlwTG9hZGVyKCk6IFByb21pc2U8SlNaaXA+IHtcbiAgZnVuY3Rpb24gb25EcmFnT3ZlcihlOiBFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGZ1bmN0aW9uIG9uRHJvcChldjogRHJhZ0V2ZW50KSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBmaWxlczogRmlsZVtdID0gW107XG4gICAgICBpZiAoZXYuZGF0YVRyYW5zZmVyLml0ZW1zKSB7XG4gICAgICAgIC8vIFVzZSBEYXRhVHJhbnNmZXJJdGVtTGlzdCBpbnRlcmZhY2UgdG8gYWNjZXNzIHRoZSBmaWxlKHMpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXYuZGF0YVRyYW5zZmVyLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gSWYgZHJvcHBlZCBpdGVtcyBhcmVuJ3QgZmlsZXMsIHJlamVjdCB0aGVtXG4gICAgICAgICAgaWYgKGV2LmRhdGFUcmFuc2Zlci5pdGVtc1tpXS5raW5kID09PSBcImZpbGVcIikge1xuICAgICAgICAgICAgY29uc3QgZmlsZSA9IGV2LmRhdGFUcmFuc2Zlci5pdGVtc1tpXS5nZXRBc0ZpbGUoKTtcbiAgICAgICAgICAgIGZpbGVzLnB1c2goZmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVc2UgRGF0YVRyYW5zZmVyIGludGVyZmFjZSB0byBhY2Nlc3MgdGhlIGZpbGUocylcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldi5kYXRhVHJhbnNmZXIuZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmaWxlcy5wdXNoKGV2LmRhdGFUcmFuc2Zlci5maWxlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlsZSA9IGZpbGVzLmZpbmQoKGZpbGUpID0+IGZpbGUudHlwZS5pbmNsdWRlcyhcInppcFwiKSk7XG4gICAgICBpZiAoZmlsZSkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgb25EcmFnT3Zlcik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIG9uRHJvcCk7XG4gICAgICAgIHJlc29sdmUoSlNaaXAubG9hZEFzeW5jKGZpbGUpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgb25EcmFnT3Zlcik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgb25Ecm9wKTtcbiAgfSk7XG59XG4iLCIvLyBHZW5lcmF0ZWQgYXV0b21hdGljYWxseSBieSBuZWFybGV5LCB2ZXJzaW9uIHVua25vd25cbi8vIGh0dHA6Ly9naXRodWIuY29tL0hhcmRtYXRoMTIzL25lYXJsZXlcbihmdW5jdGlvbiAoKSB7XG5mdW5jdGlvbiBpZCh4KSB7IHJldHVybiB4WzBdOyB9XG52YXIgZ3JhbW1hciA9IHtcbiAgICBMZXhlcjogdW5kZWZpbmVkLFxuICAgIFBhcnNlclJ1bGVzOiBbXG4gICAge1wibmFtZVwiOiBcInVuc2lnbmVkX2ludCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFsvWzAtOV0vXX0sXG4gICAge1wibmFtZVwiOiBcInVuc2lnbmVkX2ludCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInVuc2lnbmVkX2ludCRlYm5mJDFcIiwgL1swLTldL10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcInVuc2lnbmVkX2ludFwiLCBcInN5bWJvbHNcIjogW1widW5zaWduZWRfaW50JGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGRbMF0uam9pbihcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiaW50JGVibmYkMSRzdWJleHByZXNzaW9uJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCItXCJ9XX0sXG4gICAge1wibmFtZVwiOiBcImludCRlYm5mJDEkc3ViZXhwcmVzc2lvbiQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiK1wifV19LFxuICAgIHtcIm5hbWVcIjogXCJpbnQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJpbnQkZWJuZiQxJHN1YmV4cHJlc3Npb24kMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImludCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiaW50JGVibmYkMlwiLCBcInN5bWJvbHNcIjogWy9bMC05XS9dfSxcbiAgICB7XCJuYW1lXCI6IFwiaW50JGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wiaW50JGVibmYkMlwiLCAvWzAtOV0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiaW50XCIsIFwic3ltYm9sc1wiOiBbXCJpbnQkZWJuZiQxXCIsIFwiaW50JGVibmYkMlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgaWYgKGRbMF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoZFswXVswXStkWzFdLmpvaW4oXCJcIikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoZFsxXS5qb2luKFwiXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMVwiLCBcInN5bWJvbHNcIjogWy9bMC05XS9dfSxcbiAgICB7XCJuYW1lXCI6IFwidW5zaWduZWRfZGVjaW1hbCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcInVuc2lnbmVkX2RlY2ltYWwkZWJuZiQxXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMiRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbL1swLTldL119LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMiRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMiRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMiRzdWJleHByZXNzaW9uJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIuXCJ9LCBcInVuc2lnbmVkX2RlY2ltYWwkZWJuZiQyJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIl19LFxuICAgIHtcIm5hbWVcIjogXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1widW5zaWduZWRfZGVjaW1hbCRlYm5mJDIkc3ViZXhwcmVzc2lvbiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwidW5zaWduZWRfZGVjaW1hbCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwidW5zaWduZWRfZGVjaW1hbFwiLCBcInN5bWJvbHNcIjogW1widW5zaWduZWRfZGVjaW1hbCRlYm5mJDFcIiwgXCJ1bnNpZ25lZF9kZWNpbWFsJGVibmYkMlwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBcbiAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoXG4gICAgICAgICAgICAgICAgZFswXS5qb2luKFwiXCIpICtcbiAgICAgICAgICAgICAgICAoZFsxXSA/IFwiLlwiK2RbMV1bMV0uam9pbihcIlwiKSA6IFwiXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcImRlY2ltYWwkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiLVwifV0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMlwiLCBcInN5bWJvbHNcIjogWy9bMC05XS9dfSxcbiAgICB7XCJuYW1lXCI6IFwiZGVjaW1hbCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcImRlY2ltYWwkZWJuZiQyXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMyRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbL1swLTldL119LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMyRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJkZWNpbWFsJGVibmYkMyRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkMyRzdWJleHByZXNzaW9uJDFcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIuXCJ9LCBcImRlY2ltYWwkZWJuZiQzJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIl19LFxuICAgIHtcIm5hbWVcIjogXCJkZWNpbWFsJGVibmYkM1wiLCBcInN5bWJvbHNcIjogW1wiZGVjaW1hbCRlYm5mJDMkc3ViZXhwcmVzc2lvbiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwiZGVjaW1hbCRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwiZGVjaW1hbFwiLCBcInN5bWJvbHNcIjogW1wiZGVjaW1hbCRlYm5mJDFcIiwgXCJkZWNpbWFsJGVibmYkMlwiLCBcImRlY2ltYWwkZWJuZiQzXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChcbiAgICAgICAgICAgICAgICAoZFswXSB8fCBcIlwiKSArXG4gICAgICAgICAgICAgICAgZFsxXS5qb2luKFwiXCIpICtcbiAgICAgICAgICAgICAgICAoZFsyXSA/IFwiLlwiK2RbMl1bMV0uam9pbihcIlwiKSA6IFwiXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInBlcmNlbnRhZ2VcIiwgXCJzeW1ib2xzXCI6IFtcImRlY2ltYWxcIiwge1wibGl0ZXJhbFwiOlwiJVwifV0sIFwicG9zdHByb2Nlc3NcIjogXG4gICAgICAgIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkWzBdLzEwMDtcbiAgICAgICAgfVxuICAgICAgICB9LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiLVwifV0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIG51bGw7fX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFsvWzAtOV0vXX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFtcImpzb25mbG9hdCRlYm5mJDJcIiwgL1swLTldL10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDMkc3ViZXhwcmVzc2lvbiQxJGVibmYkMVwiLCBcInN5bWJvbHNcIjogWy9bMC05XS9dfSxcbiAgICB7XCJuYW1lXCI6IFwianNvbmZsb2F0JGVibmYkMyRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJqc29uZmxvYXQkZWJuZiQzJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIiwgL1swLTldL10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDMkc3ViZXhwcmVzc2lvbiQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiLlwifSwgXCJqc29uZmxvYXQkZWJuZiQzJHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIl19LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQzXCIsIFwic3ltYm9sc1wiOiBbXCJqc29uZmxvYXQkZWJuZiQzJHN1YmV4cHJlc3Npb24kMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDNcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwianNvbmZsb2F0JGVibmYkNCRzdWJleHByZXNzaW9uJDEkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbL1srLV0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDQkc3ViZXhwcmVzc2lvbiQxJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMSRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFsvWzAtOV0vXX0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDQkc3ViZXhwcmVzc2lvbiQxJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wianNvbmZsb2F0JGVibmYkNCRzdWJleHByZXNzaW9uJDEkZWJuZiQyXCIsIC9bMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMVwiLCBcInN5bWJvbHNcIjogWy9bZUVdLywgXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMSRlYm5mJDFcIiwgXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMSRlYm5mJDJcIl19LFxuICAgIHtcIm5hbWVcIjogXCJqc29uZmxvYXQkZWJuZiQ0XCIsIFwic3ltYm9sc1wiOiBbXCJqc29uZmxvYXQkZWJuZiQ0JHN1YmV4cHJlc3Npb24kMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcImpzb25mbG9hdCRlYm5mJDRcIiwgXCJzeW1ib2xzXCI6IFtdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwianNvbmZsb2F0XCIsIFwic3ltYm9sc1wiOiBbXCJqc29uZmxvYXQkZWJuZiQxXCIsIFwianNvbmZsb2F0JGVibmYkMlwiLCBcImpzb25mbG9hdCRlYm5mJDNcIiwgXCJqc29uZmxvYXQkZWJuZiQ0XCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChcbiAgICAgICAgICAgICAgICAoZFswXSB8fCBcIlwiKSArXG4gICAgICAgICAgICAgICAgZFsxXS5qb2luKFwiXCIpICtcbiAgICAgICAgICAgICAgICAoZFsyXSA/IFwiLlwiK2RbMl1bMV0uam9pbihcIlwiKSA6IFwiXCIpICtcbiAgICAgICAgICAgICAgICAoZFszXSA/IFwiZVwiICsgKGRbM11bMV0gfHwgXCIrXCIpICsgZFszXVsyXS5qb2luKFwiXCIpIDogXCJcIilcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB7XCJuYW1lXCI6IFwiZHFzdHJpbmckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcImRxc3RyaW5nJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiZHFzdHJpbmckZWJuZiQxXCIsIFwiZHN0cmNoYXJcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcImRxc3RyaW5nXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiXFxcIlwifSwgXCJkcXN0cmluZyRlYm5mJDFcIiwge1wibGl0ZXJhbFwiOlwiXFxcIlwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBkWzFdLmpvaW4oXCJcIik7IH19LFxuICAgIHtcIm5hbWVcIjogXCJzcXN0cmluZyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwic3FzdHJpbmckZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJzcXN0cmluZyRlYm5mJDFcIiwgXCJzc3RyY2hhclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwic3FzdHJpbmdcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCInXCJ9LCBcInNxc3RyaW5nJGVibmYkMVwiLCB7XCJsaXRlcmFsXCI6XCInXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbihkKSB7cmV0dXJuIGRbMV0uam9pbihcIlwiKTsgfX0sXG4gICAge1wibmFtZVwiOiBcImJ0c3RyaW5nJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJidHN0cmluZyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcImJ0c3RyaW5nJGVibmYkMVwiLCAvW15gXS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJidHN0cmluZ1wiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcImBcIn0sIFwiYnRzdHJpbmckZWJuZiQxXCIsIHtcImxpdGVyYWxcIjpcImBcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gZFsxXS5qb2luKFwiXCIpOyB9fSxcbiAgICB7XCJuYW1lXCI6IFwiZHN0cmNoYXJcIiwgXCJzeW1ib2xzXCI6IFsvW15cXFxcXCJcXG5dL10sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJkc3RyY2hhclwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIlxcXFxcIn0sIFwic3RyZXNjYXBlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShcIlxcXCJcIitkLmpvaW4oXCJcIikrXCJcXFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcInNzdHJjaGFyXCIsIFwic3ltYm9sc1wiOiBbL1teXFxcXCdcXG5dL10sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJzc3RyY2hhclwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIlxcXFxcIn0sIFwic3RyZXNjYXBlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIEpTT04ucGFyc2UoXCJcXFwiXCIrZC5qb2luKFwiXCIpK1wiXFxcIlwiKTsgfX0sXG4gICAge1wibmFtZVwiOiBcInNzdHJjaGFyJHN0cmluZyQxXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiXFxcXFwifSwge1wibGl0ZXJhbFwiOlwiJ1wifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwic3N0cmNoYXJcIiwgXCJzeW1ib2xzXCI6IFtcInNzdHJjaGFyJHN0cmluZyQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gXCInXCI7IH19LFxuICAgIHtcIm5hbWVcIjogXCJzdHJlc2NhcGVcIiwgXCJzeW1ib2xzXCI6IFsvW1wiXFxcXC9iZm5ydF0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH0sXG4gICAge1wibmFtZVwiOiBcInN0cmVzY2FwZVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcInVcIn0sIC9bYS1mQS1GMC05XS8sIC9bYS1mQS1GMC05XS8sIC9bYS1mQS1GMC05XS8sIC9bYS1mQS1GMC05XS9dLCBcInBvc3Rwcm9jZXNzXCI6IFxuICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5qb2luKFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAge1wibmFtZVwiOiBcIl8kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXX0sXG4gICAge1wibmFtZVwiOiBcIl8kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJfJGVibmYkMVwiLCBcIndzY2hhclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiX1wiLCBcInN5bWJvbHNcIjogW1wiXyRlYm5mJDFcIl0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24oZCkge3JldHVybiBudWxsO319LFxuICAgIHtcIm5hbWVcIjogXCJfXyRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtcIndzY2hhclwiXX0sXG4gICAge1wibmFtZVwiOiBcIl9fJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiX18kZWJuZiQxXCIsIFwid3NjaGFyXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJfX1wiLCBcInN5bWJvbHNcIjogW1wiX18kZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uKGQpIHtyZXR1cm4gbnVsbDt9fSxcbiAgICB7XCJuYW1lXCI6IFwid3NjaGFyXCIsIFwic3ltYm9sc1wiOiBbL1sgXFx0XFxuXFx2XFxmXS9dLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50bGlzdCRlYm5mJDFcIiwgXCJzeW1ib2xzXCI6IFtdfSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50bGlzdCRlYm5mJDEkc3ViZXhwcmVzc2lvbiQxXCIsIFwic3ltYm9sc1wiOiBbXCJfXCIsIFwic3RhdGVtZW50XCIsIFwiX1wiLCB7XCJsaXRlcmFsXCI6XCI7XCJ9XX0sXG4gICAge1wibmFtZVwiOiBcInN0YXRlbWVudGxpc3QkZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJzdGF0ZW1lbnRsaXN0JGVibmYkMVwiLCBcInN0YXRlbWVudGxpc3QkZWJuZiQxJHN1YmV4cHJlc3Npb24kMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50bGlzdFwiLCBcInN5bWJvbHNcIjogW1wic3RhdGVtZW50bGlzdCRlYm5mJDFcIiwgXCJfXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChkKSA9PiBkWzBdLm1hcCgoZSkgPT4gZVsxXSl9LFxuICAgIHtcIm5hbWVcIjogXCJzdGF0ZW1lbnRcIiwgXCJzeW1ib2xzXCI6IFtcImxheWVyQWN0aW9uXCIsIFwiX19cIiwgXCJpZGVudGlmaWVyXCIsIFwiX19cIiwgXCJ2YXJWYWx1ZVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoZCkgPT4gKHsgYWN0aW9uOiBkWzBdLCBpZDogZFsyXSwgdHlwZTogJ3NpbmdsZScsIHZhbHVlOiBkWzRdIH0pfSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50XCIsIFwic3ltYm9sc1wiOiBbXCJhY3Rpb25cIiwgXCJfX1wiLCBcImlkZW50aWZpZXJcIiwgXCJfX1wiLCBcInZhclZhbHVlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChkKSA9PiAoeyBhY3Rpb246IGRbMF0sIGlkOiBkWzJdLCB0eXBlOiAnc2luZ2xlJywgdmFsdWU6IGRbNF0gfSl9LFxuICAgIHtcIm5hbWVcIjogXCJzdGF0ZW1lbnRcIiwgXCJzeW1ib2xzXCI6IFtcImFjdGlvblwiLCBcIl9fXCIsIFwiaWRlbnRpZmllclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoZCkgPT4gKHsgYWN0aW9uOiBkWzBdLCBpZDogZFsyXSwgdHlwZTogJ3NpbmdsZScgfSl9LFxuICAgIHtcIm5hbWVcIjogXCJzdGF0ZW1lbnRcIiwgXCJzeW1ib2xzXCI6IFtcImFjdGlvblwiLCBcIl9fXCIsIFwiaWRlbnRpZmllclwiLCBcIl9fXCIsIFwiaWRlbnRpZmllclwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoZCkgPT4gKHsgYWN0aW9uOiBkWzBdLCBrZXk6IGRbMl0sIHR5cGU6ICdtYXAnLCB2YWx1ZTogZFs0XSB9KX0sXG4gICAge1wibmFtZVwiOiBcInN0YXRlbWVudFwiLCBcInN5bWJvbHNcIjogW1wibGF5ZXJBY3Rpb25cIiwgXCJfX1wiLCBcImlkZW50aWZpZXJcIiwgXCJfX1wiLCBcImlkZW50aWZpZXJcIiwgXCJfX1wiLCBcImlkZW50aWZpZXJcIl0sIFwicG9zdHByb2Nlc3NcIjogKGQpID0+ICh7IGFjdGlvbjogZFswXSwgaWQ6IGRbMl0sIGtleTogZFs0XSwgdHlwZTogJ21hcCcsIHZhbHVlOiBkWzZdIH0pfSxcbiAgICB7XCJuYW1lXCI6IFwic3RhdGVtZW50XCIsIFwic3ltYm9sc1wiOiBbXCJsYXllckFjdGlvblwiLCBcIl9fXCIsIFwiaWRlbnRpZmllclwiLCBcIl9fXCIsIFwidmFyVmFsdWVcIiwgXCJfX1wiLCBcInZhclZhbHVlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChkKSA9PiAoeyBhY3Rpb246IGRbMF0sIGlkOiBkWzJdLCBrZXk6IGRbNF0sIHR5cGU6ICdtYXAnLCB2YWx1ZTogZFs2XSB9KX0sXG4gICAge1wibmFtZVwiOiBcInN0YXRlbWVudFwiLCBcInN5bWJvbHNcIjogW1wiYWN0aW9uXCIsIFwiX19cIiwgXCJ2YXJWYWx1ZVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoZCkgPT4gKHsgYWN0aW9uOiBkWzBdLCB0eXBlOiAnc2luZ2xlJywgdmFsdWU6IGRbMl0gfSl9LFxuICAgIHtcIm5hbWVcIjogXCJpZGVudGlmaWVyJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW119LFxuICAgIHtcIm5hbWVcIjogXCJpZGVudGlmaWVyJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiaWRlbnRpZmllciRlYm5mJDFcIiwgL1thLXpBLVowLTldL10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcImlkZW50aWZpZXJcIiwgXCJzeW1ib2xzXCI6IFsvW2EtekEtWl0vLCBcImlkZW50aWZpZXIkZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChkKSA9PiAoeyB0eXBlOiAnaWRlbnRpZmllcicsIHY6IGRbMF0gKyBkWzFdLmpvaW4oXCJcIikgfSl9LFxuICAgIHtcIm5hbWVcIjogXCJsYXllckFjdGlvbiRzdHJpbmckMVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIkxcIn0sIHtcImxpdGVyYWxcIjpcImFcIn0sIHtcImxpdGVyYWxcIjpcInlcIn0sIHtcImxpdGVyYWxcIjpcImVcIn0sIHtcImxpdGVyYWxcIjpcInJcIn0sIHtcImxpdGVyYWxcIjpcIlNcIn0sIHtcImxpdGVyYWxcIjpcImVcIn0sIHtcImxpdGVyYWxcIjpcInRcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcImxheWVyQWN0aW9uJGVibmYkMVwiLCBcInN5bWJvbHNcIjogWy9bYS16QS1aXS9dfSxcbiAgICB7XCJuYW1lXCI6IFwibGF5ZXJBY3Rpb24kZWJuZiQxXCIsIFwic3ltYm9sc1wiOiBbXCJsYXllckFjdGlvbiRlYm5mJDFcIiwgL1thLXpBLVpdL10sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gYXJycHVzaChkKSB7cmV0dXJuIGRbMF0uY29uY2F0KFtkWzFdXSk7fX0sXG4gICAge1wibmFtZVwiOiBcImxheWVyQWN0aW9uXCIsIFwic3ltYm9sc1wiOiBbXCJsYXllckFjdGlvbiRzdHJpbmckMVwiLCBcImxheWVyQWN0aW9uJGVibmYkMVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoZCkgPT4gKHsgdHlwZTogJ2xheWVyJywgdjogZFsxXS5qb2luKFwiXCIpIH0pfSxcbiAgICB7XCJuYW1lXCI6IFwibGF5ZXJBY3Rpb24kc3RyaW5nJDJcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCJMXCJ9LCB7XCJsaXRlcmFsXCI6XCJhXCJ9LCB7XCJsaXRlcmFsXCI6XCJ5XCJ9LCB7XCJsaXRlcmFsXCI6XCJlXCJ9LCB7XCJsaXRlcmFsXCI6XCJyXCJ9LCB7XCJsaXRlcmFsXCI6XCJSXCJ9LCB7XCJsaXRlcmFsXCI6XCJlXCJ9LCB7XCJsaXRlcmFsXCI6XCJxXCJ9LCB7XCJsaXRlcmFsXCI6XCJ1XCJ9LCB7XCJsaXRlcmFsXCI6XCJpXCJ9LCB7XCJsaXRlcmFsXCI6XCJyXCJ9LCB7XCJsaXRlcmFsXCI6XCJlXCJ9XSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBqb2luZXIoZCkge3JldHVybiBkLmpvaW4oJycpO319LFxuICAgIHtcIm5hbWVcIjogXCJsYXllckFjdGlvbiRlYm5mJDJcIiwgXCJzeW1ib2xzXCI6IFsvW2EtekEtWl0vXX0sXG4gICAge1wibmFtZVwiOiBcImxheWVyQWN0aW9uJGVibmYkMlwiLCBcInN5bWJvbHNcIjogW1wibGF5ZXJBY3Rpb24kZWJuZiQyXCIsIC9bYS16QS1aXS9dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGFycnB1c2goZCkge3JldHVybiBkWzBdLmNvbmNhdChbZFsxXV0pO319LFxuICAgIHtcIm5hbWVcIjogXCJsYXllckFjdGlvblwiLCBcInN5bWJvbHNcIjogW1wibGF5ZXJBY3Rpb24kc3RyaW5nJDJcIiwgXCJsYXllckFjdGlvbiRlYm5mJDJcIl0sIFwicG9zdHByb2Nlc3NcIjogKGQpID0+ICh7IHR5cGU6ICdsYXllcicsIHY6IGRbMV0uam9pbihcIlwiKSB9KX0sXG4gICAge1wibmFtZVwiOiBcImFjdGlvbiRzdHJpbmckMVwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIkRcIn0sIHtcImxpdGVyYWxcIjpcImVcIn0sIHtcImxpdGVyYWxcIjpcImZcIn0sIHtcImxpdGVyYWxcIjpcImlcIn0sIHtcImxpdGVyYWxcIjpcIm5cIn0sIHtcImxpdGVyYWxcIjpcImVcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcImFjdGlvblwiLCBcInN5bWJvbHNcIjogW1wiYWN0aW9uJHN0cmluZyQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChkKSA9PiAoeyB0eXBlOiAnZGVmaW5lJyB9KX0sXG4gICAge1wibmFtZVwiOiBcImFjdGlvbiRzdHJpbmckMlwiLCBcInN5bWJvbHNcIjogW3tcImxpdGVyYWxcIjpcIkNcIn0sIHtcImxpdGVyYWxcIjpcInJcIn0sIHtcImxpdGVyYWxcIjpcImVcIn0sIHtcImxpdGVyYWxcIjpcImFcIn0sIHtcImxpdGVyYWxcIjpcInRcIn0sIHtcImxpdGVyYWxcIjpcImVcIn0sIHtcImxpdGVyYWxcIjpcIkxcIn0sIHtcImxpdGVyYWxcIjpcImFcIn0sIHtcImxpdGVyYWxcIjpcInlcIn0sIHtcImxpdGVyYWxcIjpcImVcIn0sIHtcImxpdGVyYWxcIjpcInJcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IGZ1bmN0aW9uIGpvaW5lcihkKSB7cmV0dXJuIGQuam9pbignJyk7fX0sXG4gICAge1wibmFtZVwiOiBcImFjdGlvblwiLCBcInN5bWJvbHNcIjogW1wiYWN0aW9uJHN0cmluZyQyXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChkKSA9PiAoeyB0eXBlOiAnY3JlYXRlTGF5ZXInIH0pfSxcbiAgICB7XCJuYW1lXCI6IFwiYWN0aW9uJHN0cmluZyQzXCIsIFwic3ltYm9sc1wiOiBbe1wibGl0ZXJhbFwiOlwiU1wifSwge1wibGl0ZXJhbFwiOlwiZVwifSwge1wibGl0ZXJhbFwiOlwidFwifV0sIFwicG9zdHByb2Nlc3NcIjogZnVuY3Rpb24gam9pbmVyKGQpIHtyZXR1cm4gZC5qb2luKCcnKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiYWN0aW9uJGVibmYkMVwiLCBcInN5bWJvbHNcIjogWy9bYS16QS1aXS9dfSxcbiAgICB7XCJuYW1lXCI6IFwiYWN0aW9uJGVibmYkMVwiLCBcInN5bWJvbHNcIjogW1wiYWN0aW9uJGVibmYkMVwiLCAvW2EtekEtWl0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBmdW5jdGlvbiBhcnJwdXNoKGQpIHtyZXR1cm4gZFswXS5jb25jYXQoW2RbMV1dKTt9fSxcbiAgICB7XCJuYW1lXCI6IFwiYWN0aW9uXCIsIFwic3ltYm9sc1wiOiBbXCJhY3Rpb24kc3RyaW5nJDNcIiwgXCJhY3Rpb24kZWJuZiQxXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChkKSA9PiAoeyB0eXBlOiAnc2V0JywgdjogZFsxXS5qb2luKFwiXCIpIH0pfSxcbiAgICB7XCJuYW1lXCI6IFwidmFyVmFsdWVcIiwgXCJzeW1ib2xzXCI6IFtcInZhclZhbHVlQXJyYXlcIl0sIFwicG9zdHByb2Nlc3NcIjogKGQpID0+ICh7IHR5cGU6ICd2YWx1ZScsIHY6IGRbMF1bMF0gfSl9LFxuICAgIHtcIm5hbWVcIjogXCJ2YXJWYWx1ZUFycmF5XCIsIFwic3ltYm9sc1wiOiBbXCJhcnJheVZhbHVlXCJdLCBcInBvc3Rwcm9jZXNzXCI6IChkKSA9PiBkWzBdfSxcbiAgICB7XCJuYW1lXCI6IFwidmFyVmFsdWVBcnJheVwiLCBcInN5bWJvbHNcIjogW1widmFsdWVcIl0sIFwicG9zdHByb2Nlc3NcIjogKGQpID0+IFtkWzBdXX0sXG4gICAge1wibmFtZVwiOiBcImFycmF5VmFsdWVcIiwgXCJzeW1ib2xzXCI6IFt7XCJsaXRlcmFsXCI6XCIoXCJ9LCBcIl9cIiwgXCJ2YWx1ZXNcIiwgXCJfXCIsIHtcImxpdGVyYWxcIjpcIilcIn1dLCBcInBvc3Rwcm9jZXNzXCI6IChkKSA9PiBbZFsyXV19LFxuICAgIHtcIm5hbWVcIjogXCJ2YWx1ZXNcIiwgXCJzeW1ib2xzXCI6IFtcInZhbHVlc1wiLCBcIl9cIiwge1wibGl0ZXJhbFwiOlwiLFwifSwgXCJfXCIsIFwidmFyVmFsdWVBcnJheVwiXSwgXCJwb3N0cHJvY2Vzc1wiOiAoZCkgPT4gWy4uLmRbMF0sIC4uLmRbNF1dfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVzXCIsIFwic3ltYm9sc1wiOiBbXCJ2YXJWYWx1ZUFycmF5XCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVcIiwgXCJzeW1ib2xzXCI6IFtcImRxc3RyaW5nXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVcIiwgXCJzeW1ib2xzXCI6IFtcInNxc3RyaW5nXCJdLCBcInBvc3Rwcm9jZXNzXCI6IGlkfSxcbiAgICB7XCJuYW1lXCI6IFwidmFsdWVcIiwgXCJzeW1ib2xzXCI6IFtcImRlY2ltYWxcIl0sIFwicG9zdHByb2Nlc3NcIjogaWR9LFxuICAgIHtcIm5hbWVcIjogXCJ3c2NoYXJcIiwgXCJzeW1ib2xzXCI6IFsvW1xccl0vXSwgXCJwb3N0cHJvY2Vzc1wiOiBpZH1cbl1cbiAgLCBQYXJzZXJTdGFydDogXCJzdGF0ZW1lbnRsaXN0XCJcbn1cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgIG1vZHVsZS5leHBvcnRzID0gZ3JhbW1hcjtcbn0gZWxzZSB7XG4gICB3aW5kb3cuZ3JhbW1hciA9IGdyYW1tYXI7XG59XG59KSgpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZ2FtZS9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=