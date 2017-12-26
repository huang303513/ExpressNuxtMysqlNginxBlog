require('source-map-support/register')
module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default_js__ = __webpack_require__(12);
// let devConfig = require('./default.js');


var proConfig = {
    devEnv: true,
    port: 3002,
    sslModel: false
};
var disConfig = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__default_js__["a" /* default */], proConfig);

/* harmony default export */ __webpack_exports__["a"] = (disConfig);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(11);


var session = __webpack_require__(5);
var MySQLStore = __webpack_require__(6)(session);
var winston = __webpack_require__(7);
var expressWinston = __webpack_require__(8);

var nuxtConfig = __webpack_require__(10);

var path = __webpack_require__(14);
var pkg = __webpack_require__(15);
var config = Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])("development");

var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || config.port;

// session 中间件
app.use(session({
	key: config.session.key,
	secret: config.session.secret,
	cookie: {
		maxAge: config.session.maxAge
	},
	store: new MySQLStore(config.dbConfig),
	connectionLimit: 10,
	expiration: 86400000,
	resave: true,
	saveUninitialized: true
}));

var uploadDir = "/usr/local/webserver/nginx/static/img";
if (config.devEnv) {
	uploadDir = path.join(__dirname, 'static/img');
}

// 处理表单及文件上传的中间件
app.use(__webpack_require__(16)({
	uploadDir: uploadDir,
	keepExtensions: true // 保留后缀
}));

app.locals.blog = {
	title: pkg.name,
	description: pkg.description
};

// 使用上的区别在于：app.locals 上通常挂载常量信息（如博客名、描述、作者信息），res.locals 上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，res.locals.user = req.session.user）。
app.use(function (req, res, next) {
	res.locals.user = req.session.user;
	// res.locals.success = req.flash('success').toString();
	// res.locals.error = req.flash('error').toString();
	next();
});

app.use(expressWinston.logger({
	transports: [new winston.transports.Console({
		json: true,
		colorize: true
	}), new winston.transports.File({
		filename: 'server/logs/success.log'
	})]
}));

Object(__WEBPACK_IMPORTED_MODULE_2__api_index__["a" /* startRouter */])(app);

app.use(expressWinston.errorLogger({
	transports: [new winston.transports.Console({
		json: true,
		colorize: true
	}), new winston.transports.File({
		filename: 'server/logs/error.log'
	})]
}));

// error page
// app.use(function (err, req, res, next) {
// 	res.render('error', {
// 		error: err
// 	});
// });

process.on('uncaughtException', function (err) {
	fs.writeSync(1, 'Caught exception: ' + err + '\n');
});
//promise错误未处理
process.on('unhandledRejection', function (reason, p) {
	console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
//系统警告
process.on('warning', function (warning) {
	console.warn(warning.name); // Print the warning name
	console.warn(warning.message); // Print the warning message
	console.warn(warning.stack); // Print the stack trace
});

var nuxt = new __WEBPACK_IMPORTED_MODULE_0_nuxt__["Nuxt"](nuxtConfig);
if (true) {
	var builder = new __WEBPACK_IMPORTED_MODULE_0_nuxt__["Builder"](nuxt);
	builder.build();
}
// Add nuxt.js middleware
app.use(nuxt.render);

if (module.parent) {
	module.exports = app;
} else {
	// Listen the server
	app.listen(port, host, function () {
		console.log('Server listening on http://' + host + ':' + port); // eslint-disable-line no-console
	});
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server", __webpack_require__(2)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express-mysql-session");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express-winston");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = startRouter;


function startRouter(app) {

    //实现登陆拦截
    // app.use('/api', jwtAuth)

    // app.get('/api', (req, res) => {
    //     res.json({ message: '欢迎使用黄成都的API服务！' });
    // })

    // app.use('/api/user', require('./user'))

    // app.use('/api/post', require('./post'))

    // app.use('/api/tag', require('./tag'))

    // app.use('/api/post/tag', require('./postTag'))


}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
	/*
  ** Headers of the page
  */
	head: {
		title: '黄成都的技术博客',
		meta: [{
			charset: 'utf-8'
		}, {
			name: 'viewport',
			content: 'width=device-width, initial-scale=1'
		}, {
			hid: 'description',
			name: 'description',
			content: '黄成都的技术博客'
		},
		/*优先使用 IE 最新版本和 Chrome  */
		{
			name: 'renderer',
			content: 'webkit'
		}, {
			'http-equiv': 'X-UA-Compatible',
			content: 'IE=edge'
		},
		/* iOS 设备 */
		{
			name: 'author',
			content: '黄成都'
		}, {
			name: 'apple-mobile-web-app-title',
			content: '黄成都的技术博客'
		}, {
			name: 'apple-mobile-web-app-capable',
			content: 'yes'
		}, {
			name: 'apple-mobile-web-app-status-bar-style',
			content: '#263238'
		},
		/*fullscreen and app mode*/
		{
			name: 'screen-orientation',
			content: 'portrait'
		}, {
			name: 'x5-orientation',
			content: 'portrait'
		}, {
			name: 'full-screen',
			content: 'yes'
		}, {
			name: 'x5-fullscreen',
			content: 'true'
		}, {
			name: 'browsermode',
			content: 'application'
		}, {
			name: 'x5-page-mode',
			content: 'app'
		},
		/*webkit*/
		{
			name: 'theme-color',
			content: '#263238'
		}],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/img/favicon.ico'
		}]
	},
	css: [{
		src: '~assets/less/main.less',
		lang: 'less'
	}],
	/*
  ** Build configuration
  */
	build: {
		vendor: ['axios', 'vue-notification']
		/*
   ** Run ESLint on save
   */
		// extend(config, ctx) {
		// 	if (ctx.dev && ctx.isClient) {
		// 		config.module.rules.push({
		// 			enforce: 'pre',
		// 			test: /\.(js|vue)$/,
		// 			loader: 'eslint-loader',
		// 			exclude: /(node_modules)/
		// 		})
		// 	}
		// }
	},
	loading: {
		color: '#04acf7',
		height: '4px',
		failedColor: 'red'
	},
	//页面的过渡效果
	transition: {
		name: 'page'
	},
	//配置路由
	router: {
		middleware: 'adminAuth'
	},
	//插件
	plugins: [{
		src: '~plugins/axios'
	}, {
		src: '~plugins/vue-notification',
		ssr: false
	}]
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__development_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__production_js__ = __webpack_require__(13);



function getConfig() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "production";

    if (name == 'production') {
        return __WEBPACK_IMPORTED_MODULE_1__production_js__["a" /* default */];
    } else {
        return __WEBPACK_IMPORTED_MODULE_0__development_js__["a" /* default */];
    }
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * @Author: huangchengdu
 * @Date:   2017-01-13 16:19:01
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-16 11:00:33
 */

var devConfig = {
    port: 443,
    sslModel: false,
    session: {
        secret: 'session',
        key: 'session',
        maxAge: 2592000
    },
    dbConfig: {
        connectionLimit: 30,
        host: '47.96.6.227',
        user: 'huang303513',
        password: 'huang303513',
        port: '3306',
        database: 'myblog'
    },
    devEnv: true
};

/* harmony default export */ __webpack_exports__["a"] = (devConfig);

//这两个文件必须写成comment.js规范。引用他们的第三方库只支持这个规范。

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__development_js__ = __webpack_require__(0);
/*
 * @Author: huangchengdu
 * @Date:   2017-01-14 18:47:32
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-15 08:18:01
 */

// let devConfig = require('./default.js');


var proConfig = {
  devEnv: false,
  port: 3002, //如果package.json里面不一样，以这里为准
  sslModel: false
};
var disConfig = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__development_js__["a" /* default */], proConfig);

/* harmony default export */ __webpack_exports__["a"] = (disConfig);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {"name":"juejin","version":"1.0.0","description":"Nuxt.js project","author":"huangchengdu <394042583@qq.com>","private":true,"config":{"nuxt":{"port":"3002"}},"scripts":{"dev":"cross-env NODE_ENV=development backpack dev","build":"cross-env NODE_ENV=development nuxt build && backpack build","start":"cross-env NODE_ENV=production pm2 start build/main.js","generate":"cross-env NODE_ENV=development nuxt generate","nuxt":"cross-env NODE_ENV=development nuxt","nuxt-build":"cross-env NODE_ENV=development nuxt build","nuxt-start":"cross-env NODE_ENV=development nuxt start","lint":"cross-env NODE_ENV=development eslint --ext .js,.vue --ignore-path .gitignore .","precommit":"cross-env NODE_ENV=development npm run lint"},"dependencies":{"axios":"^0.17.1","backpack-core":"^0.4.3","body-parser":"^1.18.2","cookie-parser":"^1.4.3","cross-env":"^5.1.1","crypto-js":"^3.1.9-1","express":"^4.16.2","express-formidable":"^1.0.0","express-mysql-session":"^1.2.3","express-session":"^1.15.6","express-winston":"^2.4.0","less":"^2.7.3","less-loader":"^4.0.5","marked":"^0.3.7","mysql":"^2.15.0","nuxt":"^1.0.0-rc11","vue-notification":"^1.3.4","winston":"^2.4.0"},"devDependencies":{"babel-eslint":"^7.2.3","eslint":"^4.3.0","eslint-config-standard":"^10.2.1","eslint-loader":"^1.9.0","eslint-plugin-html":"^3.1.1","eslint-plugin-import":"^2.7.0","eslint-plugin-node":"^5.1.1","eslint-plugin-promise":"^3.5.0","eslint-plugin-standard":"^3.0.1"}}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-formidable");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map