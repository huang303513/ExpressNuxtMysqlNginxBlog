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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
 * @Author: huangchengdu
 * @Date:   2017-01-14 14:17:43
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 14:18:22
 */

var marked = __webpack_require__(2);
var mysqlQuery = __webpack_require__(4).mysqlQuery;
var formatDate = __webpack_require__(7).formatDate;

function contentToHtml(posts) {
    return posts.map(function (post) {
        post.content = marked(post.content);
        return post;
    });
}

/* harmony default export */ __webpack_exports__["default"] = ({
    // 创建一个留言
    create: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee(comment) {
            var dateMap, date, addSql, addSqlParams, commentRes, modSql, _ref2, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dateMap = formatDate(new Date(), 'typeDictionary');
                            date = dateMap.yearMonthDay + " " + dateMap.time;
                            addSql = 'INSERT INTO comments(author,content,postId,created_at) VALUES(?,?,?,?)';
                            addSqlParams = [JSON.stringify(comment.author), comment.content, comment.postId, date];
                            _context.next = 6;
                            return mysqlQuery(addSql, addSqlParams);

                        case 6:
                            commentRes = _context.sent;

                            if (!commentRes.err) {
                                _context.next = 11;
                                break;
                            }

                            Promise.reject(commentRes.err);
                            _context.next = 18;
                            break;

                        case 11:
                            modSql = 'UPDATE posts SET commentsCount = commentsCount + 1 where _id=' + comment.postId;
                            _context.next = 14;
                            return mysqlQuery(modSql);

                        case 14:
                            _ref2 = _context.sent;
                            err = _ref2.err;
                            result = _ref2.result;

                            if (err) {
                                Promise.reject(err);
                            } else {
                                Promise.resolve(commentRes.result);
                            }

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function create(_x) {
            return _ref.apply(this, arguments);
        }

        return create;
    }(),

    // 通过用户 id 和留言 id 删除一个留言
    delCommentById: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee2(commentId, postId) {
            var sql, commentRes, modSql, _ref4, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            sql = 'DELETE FROM comments where _id=' + commentId;
                            _context2.next = 3;
                            return mysqlQuery(sql);

                        case 3:
                            commentRes = _context2.sent;

                            if (!commentRes.err) {
                                _context2.next = 8;
                                break;
                            }

                            Promise.reject(commentRes.err);
                            _context2.next = 15;
                            break;

                        case 8:
                            modSql = 'UPDATE posts SET commentsCount = commentsCount - 1 where _id=' + postId;
                            _context2.next = 11;
                            return mysqlQuery(modSql);

                        case 11:
                            _ref4 = _context2.sent;
                            err = _ref4.err;
                            result = _ref4.result;

                            if (err) {
                                Promise.reject(err);
                            } else {
                                Promise.resolve(commentRes.result);
                            }

                        case 15:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function delCommentById(_x2, _x3) {
            return _ref3.apply(this, arguments);
        }

        return delCommentById;
    }(),

    // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
    getComments: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee3(postId, cb) {
            var sql, _ref6, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            sql = 'SELECT * FROM comments where postId=' + postId;
                            _context3.next = 3;
                            return mysqlQuery(sql);

                        case 3:
                            _ref6 = _context3.sent;
                            err = _ref6.err;
                            result = _ref6.result;
                            _context3.prev = 6;

                            result = contentToHtml(result);
                            result.forEach(function (item, index) {
                                item.author = JSON.parse(item.author);
                            });
                            _context3.next = 14;
                            break;

                        case 11:
                            _context3.prev = 11;
                            _context3.t0 = _context3['catch'](6);

                            err = _context3.t0;

                        case 14:
                            _context3.prev = 14;

                            if (!err) {
                                _context3.next = 19;
                                break;
                            }

                            return _context3.abrupt('return', Promise.reject(err));

                        case 19:
                            return _context3.abrupt('return', Promise.resolve(result));

                        case 20:
                            return _context3.finish(14);

                        case 21:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[6, 11, 14, 21]]);
        }));

        function getComments(_x4, _x5) {
            return _ref5.apply(this, arguments);
        }

        return getComments;
    }()
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["mysqlQuery"] = mysqlQuery;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(5);
var mysql = __webpack_require__(19);

var config = Object(__WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */])("development");

var pool = mysql.createPool(config.dbConfig);
/**
 * sql, SqlParams  参数只可能是一个或者两个
 * @return {[type]} [description]
 */
// module.exports.mysqlQuery = function(...args) {
//     return new Promise((resolve, reject) => {
//         try {
//             pool.getConnection(function(err, connection) {
//                 if (err) {
//                     reject({ err: err, result: "failure" });
//                 } else {
//                     connection.query(...args, function(err, result, fields) {
//                         if (err) {
//                             reject({ err, result });
//                         } else {
//                             resolve({ err, result });
//                         }
//                         connection.release();
//                     });
//                 }

//             });
//         } catch (e) {
//             reject({ err: e, result: "failure" });
//         } finally {

//         }
//     });
// }

function mysqlQuery() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
        try {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject({ err: err, result: "failure" });
                } else {
                    connection.query.apply(connection, args.concat([function (err, result, fields) {
                        if (err) {
                            reject({ err: err, result: result });
                        } else {
                            resolve({ err: err, result: result });
                        }
                        connection.release();
                    }]));
                }
            });
        } catch (e) {
            reject({ err: e, result: "failure" });
        } finally {}
    });
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__development_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__production_js__ = __webpack_require__(21);



function getConfig() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "production";

    if (name == 'production') {
        return __WEBPACK_IMPORTED_MODULE_1__production_js__["a" /* default */];
    } else {
        return __WEBPACK_IMPORTED_MODULE_0__development_js__["a" /* default */];
    }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default_js__ = __webpack_require__(20);
// let devConfig = require('./default.js');


var proConfig = {
    devEnv: true,
    port: 5389,
    apiPort: 5389,
    apiHost: "http://127.0.0.1",
    sslModel: false
};
var disConfig = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__default_js__["a" /* default */], proConfig);

/* harmony default export */ __webpack_exports__["a"] = (disConfig);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

exports.formatDate = formatDate;
exports.dateFromDateStr = dateFromDateStr;
exports.getToday = getToday;
exports.monthOffset = monthOffset;

function getToday() {
    var now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
}

function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
        val = "0" + val;
    }return val;
}

var weeks = ["日", "一", "二", "三", "四", "五", "六"],
    offset = 0;

function dateOffset(realDate) {
    offset = new Date().getTime() - realDate.getTime();
}
//yyyy-MM-dd HH:mm:ss  支持缩短  支持/
function dateFromDateStr(dateStr) {
    return new Date(Date.parse(dateStr.replace(/-/g, "/")));
}

//有效期，出行日期
//data1,date2都是yyyy-MM-dd格式的时间字符串
function monthOffset(endDate, startDate) {
    var endArr = endDate.split('-');
    var startArr = startDate.split('-');
    if (!endArr || !endArr.length || !startArr || !startArr.length) {
        return null;
    }
    var offset = (endArr[0] - startArr[0]) * 12 + (endArr[1] - startArr[1]);
    if (endArr[2] - startArr[2] < 0) {
        offset -= 1;
    }
    return offset;
}

function formatDate(date, returnType, fixOffset) {
    date = date || new Date();
    if (fixOffset) {
        //For the real date
        if (offset) date = new Date(date.getTime() - offset);
        //Set timezone for china.
        var zone = -date.getTimezoneOffset() / 60;
        if (zone != 8) date = new Date(date.getTime() + (8 - zone) * 60 * 60 * 1000);
    }
    if (returnType == "date") {
        return date;
    }
    var month = date.getMonth() + 1,
        year = date.getFullYear(),
        day = date.getDate(),
        week = date.getDay(),
        ar = [year, pad(month), pad(day)],
        str = ar.join("-");

    if (!returnType) return str;

    var str1 = ar.join("");

    if (returnType == "humanize") {
        var sub = " 周" + weeks[week];
        var today = new Date();
        if (year == today.getFullYear() && month == today.getMonth() + 1 && day == today.getDate()) {
            sub = " 今天";
        }
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        if (year == tomorrow.getFullYear() && month == tomorrow.getMonth() + 1 && day == tomorrow.getDate()) {
            sub = " 明天";
        }
        return month + "月" + day + "日" + sub;
    }
    if (returnType == "humanizeFull") {
        var sub = " 周" + weeks[week];
        var today = new Date();
        if (year == today.getFullYear() && month == today.getMonth() + 1 && day == today.getDate()) {
            sub = " 今天";
        }
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        if (year == tomorrow.getFullYear() && month == tomorrow.getMonth() + 1 && day == tomorrow.getDate()) {
            sub = " 明天";
        }
        return year + "年" + month + "月" + day + "日" + sub;
    }

    if (returnType == "weekday") {
        var sub = " 周" + weeks[week];
        var today = new Date();
        if (year == today.getFullYear() && month == today.getMonth() + 1 && day == today.getDate()) {
            sub = " 今天";
        }
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        if (year == tomorrow.getFullYear() && month == tomorrow.getMonth() + 1 && day == tomorrow.getDate()) {
            sub = " 明天";
        }
        return {
            day: month + "月" + day + "日",
            weekday: sub
        };
    }

    if (returnType == "dayWeekDayHourMinite") {
        var sub = " 周" + weeks[week];
        var today = new Date();
        if (year == today.getFullYear() && month == today.getMonth() + 1 && day == today.getDate()) {
            sub = " 今天";
        }
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        if (year == tomorrow.getFullYear() && month == tomorrow.getMonth() + 1 && day == tomorrow.getDate()) {
            sub = " 明天";
        }
        return {
            day: pad(month) + "-" + pad(day),
            weekday: sub,
            hour: pad(date.getHours()) + ":" + pad(date.getMinutes())
        };
    }

    //05-30
    if (returnType == "Month-Day") {
        return month + "-" + day;
    }

    if (returnType == "Year-Month-Day") {
        return year + "-" + month + "-" + day;
    }

    if (returnType == "tight") {
        return str1;
    }

    var hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

    if (returnType == "tightFull") {
        return str1 + pad(hour) + pad(min) + pad(sec);
    }

    if (returnType == "hour") {
        return pad(hour);
    }

    if (returnType == "time") {
        return pad(hour) + ":" + pad(min) + ":" + pad(sec);
    }

    if (returnType == "datetime") {
        return str + " " + pad(hour) + ":" + pad(min) + ":" + pad(sec);
    }

    //19:00
    if (returnType == "hour:sec") {
        return pad(hour) + ":" + pad(min);
    }

    if (returnType == "typeDictionary") {
        var sub = " 周" + weeks[week];
        var today = new Date();
        if (year == today.getFullYear() && month == today.getMonth() + 1 && day == today.getDate()) {
            sub = " 今天";
        }
        var tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        if (year == tomorrow.getFullYear() && month == tomorrow.getMonth() + 1 && day == tomorrow.getDate()) {
            sub = " 明天";
        }
        var monthDay = month + "月" + day + "日",
            yearMonthDay = year + "年" + monthDay,
            dateShort = month + "-" + day,
            dateShort1 = month + "/" + day,
            dateShort2 = pad(month) + "-" + pad(day),
            str2 = ar.join("/"),
            shortTightTime = pad(hour) + pad(min),
            tightTime = shortTightTime + pad(sec),
            shortTime = pad(hour) + ":" + pad(min),
            time = shortTime + ":" + pad(sec);
        return {
            monthDay: monthDay, // MM月dd日
            yearMonthDay: yearMonthDay, // yyyy年MM月dd日
            weekday: sub, // 今天/明天/周x
            dateStr: str, // yyyy-MM-dd
            dateStr1: str2, // yyyy/MM/dd
            dateShort: dateShort, // MM-dd
            dateShort1: dateShort1, // MM/dd
            dateShort2: dateShort2, // MM-dd  补零
            tightDate: str1, // yyyyMMdd
            shortTightTime: shortTightTime, // hhmm
            tightTime: tightTime, // hhmmss
            shortTime: shortTime, // hh:mm
            time: time // hh:mm:ss
        };
    }

    return str;
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_index__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_axios__);


var session = __webpack_require__(11);
var MySQLStore = __webpack_require__(12)(session);
var winston = __webpack_require__(13);
var expressWinston = __webpack_require__(14);

var nuxtConfig = __webpack_require__(24);

var path = __webpack_require__(25);
var pkg = __webpack_require__(26);
var config = Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])("development");
var fs = __webpack_require__(27);


// process.env.DEBUG = 'nuxt:*'

var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || config.port;

// console.log("===========dirname",__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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
// 处理表单及文件上传的中间件
// app.use(require('express-formidable')({
//   uploadDir: uploadDir,
//   keepExtensions: true // 保留后缀
// }));

var uploadDir = "/usr/local/webserver/nginx/static/img";
if (config.devEnv) {
  uploadDir = path.join(__dirname, 'static/img');
}

// app.locals.blog = {
//   title: pkg.name,
//   description: pkg.description
// };

// 使用上的区别在于：app.locals 上通常挂载常量信息（如博客名、描述、作者信息），res.locals 上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，res.locals.user = req.session.user）。
// app.use(function (req, res, next) {
//   // res.locals.user = req.session.user;
//   // res.locals.success = req.flash('success').toString();
//   // res.locals.error = req.flash('error').toString();
//   next();
// });

app.use(expressWinston.logger({
  transports: [
  // new(winston.transports.Console)({
  //   json: true,
  //   colorize: true
  // }),
  new winston.transports.File({
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
  console.log('未处理的==========================Rejection at:', p, 'reason:', reason);
});
//系统警告
process.on('warning', function (warning) {
  console.warn(warning.name); // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack); // Print the stack trace
});

var nuxt = new __WEBPACK_IMPORTED_MODULE_0_nuxt__["Nuxt"](nuxtConfig);
if (config.devEnv) {
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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server", __webpack_require__(9)(module)))

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express-mysql-session");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("express-winston");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = startRouter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__posts_js__ = __webpack_require__(16);


function startRouter(app) {

    //实现登陆拦截
    // app.use('/api', jwtAuth)

    // app.get('/api', (req, res) => {
    //     res.json({ message: '欢迎使用黄成都的API服务！' });
    // })
    app.get('/', function (req, res) {
        res.redirect('/posts');
    });

    // app.use('/api/user', require('./user'))

    // app.use('/api/post', require('./post'))

    // app.use('/api/tag', require('./tag'))

    // app.use('/api/post/tag', require('./postTag'))

    // app.get('/', function(req, res) {
    //     res.redirect('/posts');
    // });
    // app.use('/signup', require('./signup'));
    // app.use('/signin', require('./signin'));
    // app.use('/signout', require('./signout'));
    app.use('/api/posts', __WEBPACK_IMPORTED_MODULE_0__posts_js__["a" /* default */]);

    // 404 page
    // app.use(function(req, res) {
    //     if (!res.headersSent) {
    //         res.status(404).render('404');
    //     }
    // });
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_posts__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_assist__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_comments__ = __webpack_require__(3);
/*
 * @Author: huangchengdu
 * @Date:   2017-01-13 21:41:07
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 14:53:01
 */

var express = __webpack_require__(0);
var router = express.Router();
// let PostModel = require('../models/posts');

var xss = __webpack_require__(35);

// let CommentModel = require('../models/comments');

var checkLogin = __webpack_require__(23).checkLogin;

//GET /posts 所有用户或者特定用户的文章页
// eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
	var authorId = req.query && req.query.author;
	//console.log("queyr=========", req.query);
	// return PostModel.getPosts(authorId);
	//Promise.resolve("23423");
	__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].getPosts(authorId).then(function (posts) {
		// res.render('posts', {
		//     posts: posts
		// });
		//console.log("============posts====================",posts);
		// res.header('ETag', null);
		// delete res.header.ETag;
		res.json(posts);
		//return Promise.resolve(posts);
	}).catch(function (error) {
		res.json(error);
	});
});

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function (req, res, next) {
	res.render('create');
});

// POST /posts 发表一篇文章
router.post('/', checkLogin, function (req, res, next) {
	var author = req.session.user;
	var title = req.fields.title;
	var content = req.fields.content;
	try {
		if (!title.length) {
			throw new Error('请填写标题');
		}
		if (!content.length) {
			throw new Error('请填写内容');
		}
	} catch (e) {
		req.flash('error', e.message);
		return res.redirect('back');
	}
	var post = {
		author: author,
		title: title,
		content: content,
		pv: 0
	};
	__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].create(post).then(function (post) {
		req.flash('success', '发表成功');
		// 发表成功后跳转到该文章页
		res.redirect('/posts/' + post._id);
	}).catch(next);
});

var excludeSpecial = function excludeSpecial(s) {
	// 去掉转义字符  
	s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
	// 去掉特殊字符  
	s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/);
	return s;
};

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
	var postId = req.params.postId;
	Promise.all([__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].getPostById(postId), //获取文章
	__WEBPACK_IMPORTED_MODULE_2__models_comments__["default"].getComments(postId), //获取评论
	__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].incPv(postId) //添加访问次数
	]).then(function (result) {
		var post = result[0];
		var comments = result[1];
		//console.log("comments============",comments);
		// post.content = xss(post.content);
		post.content = post.content.replace("<script>", "script");
		post.content = post.content.replace("<iframe>", "iframe");
		// // post.content = post.content.replace("$-_.+!*'()","'$-_.+!*'()'");
		// post.content = excludeSpecial(post.content);
		res.render('index', { mdContent: post.content }, function (err, result) {

			// console.log("result====",result);
			// post.content = xss(result);
			post.content = result;
			res.json({ post: post, comments: comments });
			// console.log("===========result=============",result,err);
		});
		// res.json(post);
		// let comments = result[1];
		// if (!post) {
		//     throw new Error('该文章不存在');
		// }
		// res.render('post', {
		//     post: post,
		//     comments: comments
		// });
	}).catch(function (error) {
		res.json(error);
	});
});

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
	var postId = req.params.postId;
	var author = req.session.user._id;

	__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].getRawPostById(postId).then(function (post) {
		if (!post) {
			throw new Error('该文章不存在');
		}
		if (author.toString() !== post.author._id.toString()) {
			throw new Error('权限不足');
		}
		res.render('edit', {
			post: post
		});
	}).catch(next);
});

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
	var postId = req.params.postId;
	var author = req.session.user;
	var title = req.fields.title;
	var content = req.fields.content;

	__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].updatePostById({
		title: title,
		content: content,
		author: JSON.stringify(author),
		postId: postId
	}).then(function (result) {
		req.flash('success', '编辑文章成功');
		// 编辑成功后跳转到上一页
		res.redirect('/posts/' + postId);
	}).catch(next);
});

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
	var postId = req.params.postId;
	__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].delPostById(postId).then(function () {
		req.flash('success', '删除文章成功');
		// 删除成功后跳转到主页
		res.redirect('/posts');
	}).catch(next);
});

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function (req, res, next) {
	var author = req.session.user;
	var postId = req.params.postId;
	var content = req.fields.content;
	var comment = {
		author: author,
		postId: postId, //文章id
		content: content
	};
	__WEBPACK_IMPORTED_MODULE_2__models_comments__["default"].create(comment).then(function (result) {
		req.flash('success', '留言成功');
		// 留言成功后跳转到上一页
		res.redirect('back');
	}).catch(next);
});

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function (req, res, next) {
	var commentId = req.params.commentId;
	var postId = req.params.postId;
	__WEBPACK_IMPORTED_MODULE_2__models_comments__["default"].delCommentById(commentId, postId).then(function (result) {
		req.flash('success', '删除留言成功');
		// 删除成功后跳转到上一页
		res.redirect('back');
	}).catch(next);
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_sql_js__ = __webpack_require__(4);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var marked = __webpack_require__(2);
var CommentModel = __webpack_require__(3);
// let mysqlQuery = require('../lib/sql').mysqlQuery;

var formatDate = __webpack_require__(7).formatDate;

function contentToHtml(posts) {
    return posts.map(function (post) {
        post.content = marked(post.content);
        return post;
    });
}

/* harmony default export */ __webpack_exports__["a"] = ({
    // 创建一篇文章
    create: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee(post) {
            var dateMap, date, addSql, addSqlParams, addRet, sql, _ref2, _err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            dateMap = formatDate(new Date(), 'typeDictionary');
                            date = dateMap.yearMonthDay + " " + dateMap.time;
                            addSql = 'INSERT INTO posts(author,title,content,pv,created_at,commentsCount,authorId) VALUES(?,?,?,?,?,?,?)';
                            addSqlParams = [JSON.stringify(post.author), post.title, post.content, '0', date, '0', post.author._id];
                            _context.next = 6;
                            return Object(__WEBPACK_IMPORTED_MODULE_1__lib_sql_js__["mysqlQuery"])(addSql, addSqlParams);

                        case 6:
                            addRet = _context.sent;

                            if (!(!addRet.err && addRet.result.insertId)) {
                                _context.next = 32;
                                break;
                            }

                            sql = 'SELECT * FROM posts where _id=' + addRet.result.insertId;
                            _context.next = 11;
                            return Object(__WEBPACK_IMPORTED_MODULE_1__lib_sql_js__["mysqlQuery"])(sql);

                        case 11:
                            _ref2 = _context.sent;
                            _err = _ref2.err;
                            result = _ref2.result;
                            _context.prev = 14;

                            result = result[0];
                            result.author = JSON.parse(result.author);
                            result.content = marked(result.content);
                            _context.next = 23;
                            break;

                        case 20:
                            _context.prev = 20;
                            _context.t0 = _context['catch'](14);

                            _err = _context.t0;

                        case 23:
                            _context.prev = 23;

                            if (!_err) {
                                _context.next = 28;
                                break;
                            }

                            return _context.abrupt('return', Promise.reject(_err));

                        case 28:
                            return _context.abrupt('return', Promise.resolve(result));

                        case 29:
                            return _context.finish(23);

                        case 30:
                            _context.next = 33;
                            break;

                        case 32:
                            return _context.abrupt('return', Promise.reject(err));

                        case 33:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[14, 20, 23, 30]]);
        }));

        function create(_x) {
            return _ref.apply(this, arguments);
        }

        return create;
    }(),

    // 通过文章 id 获取一篇文章
    getPostById: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee2(postId) {
            var sql, _ref4, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            sql = 'SELECT * FROM posts where _id=' + postId;
                            _context2.next = 3;
                            return Object(__WEBPACK_IMPORTED_MODULE_1__lib_sql_js__["mysqlQuery"])(sql);

                        case 3:
                            _ref4 = _context2.sent;
                            err = _ref4.err;
                            result = _ref4.result;
                            _context2.prev = 6;

                            result = result[0];
                            result.author = JSON.parse(result.author);
                            result.content = marked(result.content);
                            _context2.next = 15;
                            break;

                        case 12:
                            _context2.prev = 12;
                            _context2.t0 = _context2['catch'](6);

                            err = _context2.t0;

                        case 15:
                            _context2.prev = 15;

                            if (!err) {
                                _context2.next = 20;
                                break;
                            }

                            return _context2.abrupt('return', Promise.reject(err));

                        case 20:
                            return _context2.abrupt('return', Promise.resolve(result));

                        case 21:
                            return _context2.finish(15);

                        case 22:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this, [[6, 12, 15, 22]]);
        }));

        function getPostById(_x2) {
            return _ref3.apply(this, arguments);
        }

        return getPostById;
    }(),

    // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
    getPosts: function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee3(authorId) {
            var sql, _ref6, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            sql = 'SELECT * FROM posts';

                            if (authorId) {
                                sql = sql + " where authorId=" + authorId;
                            }
                            _context3.next = 4;
                            return Object(__WEBPACK_IMPORTED_MODULE_1__lib_sql_js__["mysqlQuery"])(sql);

                        case 4:
                            _ref6 = _context3.sent;
                            err = _ref6.err;
                            result = _ref6.result;
                            _context3.prev = 7;

                            //result = contentToHtml(result);
                            //var resResult = [];
                            result = result.map(function (item, index) {
                                item.author = JSON.parse(item.author);
                                return {
                                    author: item.author,
                                    _id: item._id,
                                    pv: item.pv,
                                    title: item.title,
                                    authorId: item.authorId,
                                    created_at: item.created_at,
                                    commentsCount: item.commentsCount
                                };
                            });
                            _context3.next = 14;
                            break;

                        case 11:
                            _context3.prev = 11;
                            _context3.t0 = _context3['catch'](7);

                            err = _context3.t0;

                        case 14:
                            _context3.prev = 14;

                            if (!err) {
                                _context3.next = 19;
                                break;
                            }

                            return _context3.abrupt('return', Promise.reject(err));

                        case 19:
                            return _context3.abrupt('return', Promise.resolve(result));

                        case 20:
                            return _context3.finish(14);

                        case 21:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[7, 11, 14, 21]]);
        }));

        function getPosts(_x3) {
            return _ref5.apply(this, arguments);
        }

        return getPosts;
    }(),

    // 通过文章 id 给 pv 加 1
    incPv: function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee4(postId) {
            var sql, _ref8, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            sql = 'UPDATE posts SET pv = pv + 1 where _id=' + postId;
                            _context4.next = 3;
                            return Object(__WEBPACK_IMPORTED_MODULE_1__lib_sql_js__["mysqlQuery"])(sql);

                        case 3:
                            _ref8 = _context4.sent;
                            err = _ref8.err;
                            result = _ref8.result;

                            if (!err) {
                                _context4.next = 10;
                                break;
                            }

                            return _context4.abrupt('return', Promise.reject(err));

                        case 10:
                            return _context4.abrupt('return', Promise.resolve(result));

                        case 11:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function incPv(_x4) {
            return _ref7.apply(this, arguments);
        }

        return incPv;
    }(),

    // 通过文章 id 获取一篇原生文章（编辑文章）
    getRawPostById: function getRawPostById(postId) {
        return this.getPostById(postId);
    },

    // 通过用户 id 和文章 id 更新一篇文章
    updatePostById: function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee5(data) {
            var modSql, modSqlParams, _ref10, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            modSql = 'UPDATE posts SET title = ?,content = ?,author = ? WHERE _id = ?';
                            modSqlParams = Object.values(data);
                            _context5.next = 4;
                            return Object(__WEBPACK_IMPORTED_MODULE_1__lib_sql_js__["mysqlQuery"])(modSql, modSqlParams);

                        case 4:
                            _ref10 = _context5.sent;
                            err = _ref10.err;
                            result = _ref10.result;

                            if (!err) {
                                _context5.next = 11;
                                break;
                            }

                            return _context5.abrupt('return', Promise.reject(err));

                        case 11:
                            return _context5.abrupt('return', Promise.resolve(result));

                        case 12:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function updatePostById(_x5) {
            return _ref9.apply(this, arguments);
        }

        return updatePostById;
    }(),

    // 通过用户 id 和文章 id 删除一篇文章
    delPostById: function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee6(postId) {
            var sql, delRes, _ref12, _err2, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            sql = 'DELETE FROM posts where _id=' + postId;
                            _context6.next = 3;
                            return Object(__WEBPACK_IMPORTED_MODULE_1__lib_sql_js__["mysqlQuery"])(sql);

                        case 3:
                            delRes = _context6.sent;

                            if (!delRes.err) {
                                _context6.next = 8;
                                break;
                            }

                            return _context6.abrupt('return', Promise.reject(delRes.err));

                        case 8:
                            sql = 'DELETE FROM comments where postId=' + postId;
                            _context6.next = 11;
                            return Object(__WEBPACK_IMPORTED_MODULE_1__lib_sql_js__["mysqlQuery"])(sql);

                        case 11:
                            _ref12 = _context6.sent;
                            _err2 = _ref12.err;
                            result = _ref12.result;

                            if (!_err2) {
                                _context6.next = 18;
                                break;
                            }

                            return _context6.abrupt('return', Promise.reject(_err2));

                        case 18:
                            return _context6.abrupt('return', Promise.resolve(result));

                        case 19:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, this);
        }));

        function delPostById(_x6) {
            return _ref11.apply(this, arguments);
        }

        return delPostById;
    }()
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__development_js__ = __webpack_require__(6);
/*
 * @Author: huangchengdu
 * @Date:   2017-01-14 18:47:32
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-15 08:18:01
 */

// let devConfig = require('./default.js');


var proConfig = {
  devEnv: false,
  port: 5389, //如果package.json里面不一样，以这里为准
  apiPort: 443,
  apiHost: "https://www.huangchengdu.com",
  sslModel: false
};
var disConfig = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__development_js__["a" /* default */], proConfig);

/* harmony default export */ __webpack_exports__["a"] = (disConfig);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export formatDate */
/* unused harmony export postToSQLUpdate */
/* unused harmony export deepCopy */
/* unused harmony export timeAgo */
/* unused harmony export getCookiesInServer */
/* unused harmony export setCookieInClient */
/* unused harmony export getCookieInClient */
/* unused harmony export baidutongji */
/* unused harmony export mobilePage */

function formatDate(timestamp) {
  var date = new Date(timestamp);
  return date.getYear() + "-" + date.getMonth() + 1 + "-" + date.getDate() + "   " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
/**
 * 把一个js对象转换为sql操作字符串
 * @param {*} object 
 */
function postToSQLUpdate(object) {
  var updated = [],
      params = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      if (key === 'id') {
        continue;
      }
      updated.push(key + ' = ?');
      params.push(object[key]);
    }
  }
  updated.push('updated_at = ?');
  params.push(Date.now());
  return {
    updated: updated.join(','),
    params: params
  };
}

function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}

function timeAgo(time) {
  var between = Date.now() / 1000 - Number(time);

  if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟前');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时前');
  } else {
    return pluralize(~~(between / 86400), ' 天前');
  }
}
/**
 * 在服务端获取cookie
 * @param {获取request的cookie} req 
 */
function getCookiesInServer(req) {
  var Cookies = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
    var parts = Cookie.split('=');
    Cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  return Cookies;
}
/**
 * 在客户端设置cookie
 * @param {*} name 
 * @param {*} value 
 * @param {*} minutes 
 */
function setCookieInClient(name, value, minutes) {
  var exp = new Date();
  exp.setTime(exp.getTime() + minutes * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**
 * 获取浏览器端指定的cookie
 * @param {*} name 
 */
function getCookieInClient(name) {
  var arr = void 0,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
}

/**
 * 百度统计脚本
 */
function baidutongji() {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?96b0d09e8d132a6e61f66ea86b479b70";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}
/**
 * 适配移动端屏幕
 */
function mobilePage() {
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://www.huangchengdu.com/javascripts/screen.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/*
* @Author: huangchengdu
* @Date:   2017-01-13 17:10:07
* @Last Modified by:   huangchengdu
* @Last Modified time: 2017-01-13 21:40:28
*/

module.exports = {
	checkLogin: function checkLogin(req, res, next) {
		if (!req.session.user) {
			//req.flash('error','未登录');
			return res.redirect('/signin');
		}
		next();
	},
	checkNotLogin: function checkNotLogin(req, res, next) {
		if (req.session.user) {
			//req.flash('error','已登录');
			return res.redirect('back'); //返回之前的页面
		}
		next();
	}
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {
	/*
  ** Headers of the page
  */
	head: {
		cache: {
			max: 100,
			maxAge: 600000
		},
		title: '黄成都的技术博客',
		meta: [{
			charset: 'utf-8'
		}, {
			name: 'viewport',
			content: 'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui'
		}, {
			hid: 'description',
			name: 'description',
			content: '黄成都的技术博客'
		},
		// /*优先使用 IE 最新版本和 Chrome  */
		// {
		// 	name: 'renderer',
		// 	content: 'webkit'
		// },
		// {
		// 	'http-equiv': 'X-UA-Compatible',
		// 	content: 'IE=edge'
		// },
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
		// middleware: 'adminAuth'
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
/* 25 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {"name":"juejin","version":"1.0.0","description":"Nuxt.js project","author":"huangchengdu <394042583@qq.com>","private":true,"config":{"nuxt":{"port":"3002"}},"scripts":{"dev":"cross-env NODE_ENV=development backpack dev","build":"cross-env NODE_ENV=production nuxt build && backpack build","start":"cross-env NODE_ENV=production pm2 start build/main.js","generate":"cross-env NODE_ENV=production nuxt generate","nuxt":"cross-env NODE_ENV=development nuxt","nuxt-build":"cross-env NODE_ENV=production nuxt build","nuxt-start":"cross-env NODE_ENV=production nuxt start","lint":"cross-env NODE_ENV=development eslint --ext .js,.vue --ignore-path .gitignore .","precommit":"cross-env NODE_ENV=development npm run lint"},"dependencies":{"axios":"^0.17.1","backpack-core":"^0.4.3","body-parser":"^1.18.2","cookie-parser":"^1.4.3","cross-env":"^5.1.1","crypto-js":"^3.1.9-1","express":"^4.16.2","express-formidable":"^1.0.0","express-mysql-session":"^1.2.3","express-session":"^1.15.6","express-winston":"^2.4.0","jade":"^1.11.0","less":"^2.7.3","less-loader":"^4.0.5","marked":"^0.3.7","mysql":"^2.15.0","nuxt":"^1.0.0-rc11","sha1":"^1.1.1","vue-notification":"^1.3.4","winston":"^2.4.0"},"devDependencies":{"babel-eslint":"^7.2.3","eslint":"^4.3.0","eslint-config-standard":"^10.2.1","eslint-loader":"^1.9.0","eslint-plugin-html":"^3.1.1","eslint-plugin-import":"^2.7.0","eslint-plugin-node":"^5.1.1","eslint-plugin-promise":"^3.5.0","eslint-plugin-standard":"^3.0.1","lru-cache":"^4.1.1","xss":"^0.3.7"}}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(32);
var FilterCSS = __webpack_require__(36);


/**
 * XSS过滤
 *
 * @param {String} css 要过滤的CSS代码
 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
 * @return {String}
 */
function filterCSS (html, options) {
  var xss = new FilterCSS(options);
  return xss.process(html);
}


// 输出
exports = module.exports = filterCSS;
exports.FilterCSS = FilterCSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];

// 在浏览器端使用
if (typeof window !== 'undefined') {
  window.filterCSS = module.exports;
}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {
  indexOf: function(arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function(arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function(str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  spaceIndex: function(str) {
    var reg = /\s|\n|\t/;
    var match = reg.exec(str);
    return match ? match.index : -1;
  }
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * default settings
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = __webpack_require__(29).FilterCSS;
var getDefaultCSSWhiteList = __webpack_require__(29).getDefaultWhiteList;
var _ = __webpack_require__(30);

function getDefaultWhiteList() {
  return {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: ["autoplay", "controls", "loop", "preload", "src"],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    dt: [],
    em: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height"],
    ins: ["datetime"],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
  };
}

var defaultCSSFilter = new FilterCSS();

/**
 * default onTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onTag(tag, html, options) {
  // do nothing
}

/**
 * default onIgnoreTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onIgnoreTag(tag, html, options) {
  // do nothing
}

/**
 * default onTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default onIgnoreTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onIgnoreTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default escapeHtml function
 *
 * @param {String} html
 */
function escapeHtml(html) {
  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
}

/**
 * default safeAttrValue function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @param {Object} cssFilter
 * @return {String}
 */
function safeAttrValue(tag, name, value, cssFilter) {
  // unescape attribute value firstly
  value = friendlyAttrValue(value);

  if (name === "href" || name === "src") {
    // filter `href` and `src` attribute
    // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
    value = _.trim(value);
    if (value === "#") return "#";
    if (
      !(
        value.substr(0, 7) === "http://" ||
        value.substr(0, 8) === "https://" ||
        value.substr(0, 7) === "mailto:" ||
        value.substr(0, 4) === "tel:" ||
        value[0] === "#" ||
        value[0] === "/"
      )
    ) {
      return "";
    }
  } else if (name === "background") {
    // filter `background` attribute (maybe no use)
    // `javascript:`
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return "";
    }
  } else if (name === "style") {
    // `expression()`
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return "";
    }
    // `url()`
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return "";
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || defaultCSSFilter;
      value = cssFilter.process(value);
    }
  }

  // escape `<>"` before returns
  value = escapeAttrValue(value);
  return value;
}

// RegExp list
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_QUOTE_2 = /&quot;/g;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//gm;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

/**
 * escape doube quote
 *
 * @param {String} str
 * @return {String} str
 */
function escapeQuote(str) {
  return str.replace(REGEXP_QUOTE, "&quot;");
}

/**
 * unescape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function unescapeQuote(str) {
  return str.replace(REGEXP_QUOTE_2, '"');
}

/**
 * escape html entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeHtmlEntities(str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
    return code[0] === "x" || code[0] === "X"
      ? String.fromCharCode(parseInt(code.substr(1), 16))
      : String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * escape html5 new danger entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeDangerHtml5Entities(str) {
  return str
    .replace(REGEXP_ATTR_VALUE_COLON, ":")
    .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
}

/**
 * clear nonprintable characters
 *
 * @param {String} str
 * @return {String}
 */
function clearNonPrintableCharacter(str) {
  var str2 = "";
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
  }
  return _.trim(str2);
}

/**
 * get friendly attribute value
 *
 * @param {String} str
 * @return {String}
 */
function friendlyAttrValue(str) {
  str = unescapeQuote(str);
  str = escapeHtmlEntities(str);
  str = escapeDangerHtml5Entities(str);
  str = clearNonPrintableCharacter(str);
  return str;
}

/**
 * unescape attribute value
 *
 * @param {String} str
 * @return {String}
 */
function escapeAttrValue(str) {
  str = escapeQuote(str);
  str = escapeHtml(str);
  return str;
}

/**
 * `onIgnoreTag` function for removing all the tags that are not in whitelist
 */
function onIgnoreTagStripAll() {
  return "";
}

/**
 * remove tag body
 * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
 *
 * @param {array} tags
 * @param {function} next
 */
function StripTagBody(tags, next) {
  if (typeof next !== "function") {
    next = function() {};
  }

  var isRemoveAllTag = !Array.isArray(tags);
  function isRemoveTag(tag) {
    if (isRemoveAllTag) return true;
    return _.indexOf(tags, tag) !== -1;
  }

  var removeList = [];
  var posStart = false;

  return {
    onIgnoreTag: function(tag, html, options) {
      if (isRemoveTag(tag)) {
        if (options.isClosing) {
          var ret = "[/removed]";
          var end = options.position + ret.length;
          removeList.push([
            posStart !== false ? posStart : options.position,
            end
          ]);
          posStart = false;
          return ret;
        } else {
          if (!posStart) {
            posStart = options.position;
          }
          return "[removed]";
        }
      } else {
        return next(tag, html, options);
      }
    },
    remove: function(html) {
      var rethtml = "";
      var lastPos = 0;
      _.forEach(removeList, function(pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    }
  };
}

/**
 * remove html comments
 *
 * @param {String} html
 * @return {String}
 */
function stripCommentTag(html) {
  return html.replace(STRIP_COMMENT_TAG_REGEXP, "");
}
var STRIP_COMMENT_TAG_REGEXP = /<!--[\s\S]*?-->/g;

/**
 * remove invisible characters
 *
 * @param {String} html
 * @return {String}
 */
function stripBlankChar(html) {
  var chars = html.split("");
  chars = chars.filter(function(char) {
    var c = char.charCodeAt(0);
    if (c === 127) return false;
    if (c <= 31) {
      if (c === 10 || c === 13) return true;
      return false;
    }
    return true;
  });
  return chars.join("");
}

exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onTag = onTag;
exports.onIgnoreTag = onIgnoreTag;
exports.onTagAttr = onTagAttr;
exports.onIgnoreTagAttr = onIgnoreTagAttr;
exports.safeAttrValue = safeAttrValue;
exports.escapeHtml = escapeHtml;
exports.escapeQuote = escapeQuote;
exports.unescapeQuote = unescapeQuote;
exports.escapeHtmlEntities = escapeHtmlEntities;
exports.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
exports.clearNonPrintableCharacter = clearNonPrintableCharacter;
exports.friendlyAttrValue = friendlyAttrValue;
exports.escapeAttrValue = escapeAttrValue;
exports.onIgnoreTagStripAll = onIgnoreTagStripAll;
exports.StripTagBody = StripTagBody;
exports.stripCommentTag = stripCommentTag;
exports.stripBlankChar = stripBlankChar;
exports.cssFilter = defaultCSSFilter;
exports.getDefaultCSSWhiteList = getDefaultCSSWhiteList;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

function getDefaultWhiteList () {
  // 白名单值说明：
  // true: 允许该属性
  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
  // 除上面列出的值外均表示不允许
  var whiteList = {};

  whiteList['align-content'] = false; // default: auto
  whiteList['align-items'] = false; // default: auto
  whiteList['align-self'] = false; // default: auto
  whiteList['alignment-adjust'] = false; // default: auto
  whiteList['alignment-baseline'] = false; // default: baseline
  whiteList['all'] = false; // default: depending on individual properties
  whiteList['anchor-point'] = false; // default: none
  whiteList['animation'] = false; // default: depending on individual properties
  whiteList['animation-delay'] = false; // default: 0
  whiteList['animation-direction'] = false; // default: normal
  whiteList['animation-duration'] = false; // default: 0
  whiteList['animation-fill-mode'] = false; // default: none
  whiteList['animation-iteration-count'] = false; // default: 1
  whiteList['animation-name'] = false; // default: none
  whiteList['animation-play-state'] = false; // default: running
  whiteList['animation-timing-function'] = false; // default: ease
  whiteList['azimuth'] = false; // default: center
  whiteList['backface-visibility'] = false; // default: visible
  whiteList['background'] = true; // default: depending on individual properties
  whiteList['background-attachment'] = true; // default: scroll
  whiteList['background-clip'] = true; // default: border-box
  whiteList['background-color'] = true; // default: transparent
  whiteList['background-image'] = true; // default: none
  whiteList['background-origin'] = true; // default: padding-box
  whiteList['background-position'] = true; // default: 0% 0%
  whiteList['background-repeat'] = true; // default: repeat
  whiteList['background-size'] = true; // default: auto
  whiteList['baseline-shift'] = false; // default: baseline
  whiteList['binding'] = false; // default: none
  whiteList['bleed'] = false; // default: 6pt
  whiteList['bookmark-label'] = false; // default: content()
  whiteList['bookmark-level'] = false; // default: none
  whiteList['bookmark-state'] = false; // default: open
  whiteList['border'] = true; // default: depending on individual properties
  whiteList['border-bottom'] = true; // default: depending on individual properties
  whiteList['border-bottom-color'] = true; // default: current color
  whiteList['border-bottom-left-radius'] = true; // default: 0
  whiteList['border-bottom-right-radius'] = true; // default: 0
  whiteList['border-bottom-style'] = true; // default: none
  whiteList['border-bottom-width'] = true; // default: medium
  whiteList['border-collapse'] = true; // default: separate
  whiteList['border-color'] = true; // default: depending on individual properties
  whiteList['border-image'] = true; // default: none
  whiteList['border-image-outset'] = true; // default: 0
  whiteList['border-image-repeat'] = true; // default: stretch
  whiteList['border-image-slice'] = true; // default: 100%
  whiteList['border-image-source'] = true; // default: none
  whiteList['border-image-width'] = true; // default: 1
  whiteList['border-left'] = true; // default: depending on individual properties
  whiteList['border-left-color'] = true; // default: current color
  whiteList['border-left-style'] = true; // default: none
  whiteList['border-left-width'] = true; // default: medium
  whiteList['border-radius'] = true; // default: 0
  whiteList['border-right'] = true; // default: depending on individual properties
  whiteList['border-right-color'] = true; // default: current color
  whiteList['border-right-style'] = true; // default: none
  whiteList['border-right-width'] = true; // default: medium
  whiteList['border-spacing'] = true; // default: 0
  whiteList['border-style'] = true; // default: depending on individual properties
  whiteList['border-top'] = true; // default: depending on individual properties
  whiteList['border-top-color'] = true; // default: current color
  whiteList['border-top-left-radius'] = true; // default: 0
  whiteList['border-top-right-radius'] = true; // default: 0
  whiteList['border-top-style'] = true; // default: none
  whiteList['border-top-width'] = true; // default: medium
  whiteList['border-width'] = true; // default: depending on individual properties
  whiteList['bottom'] = false; // default: auto
  whiteList['box-decoration-break'] = true; // default: slice
  whiteList['box-shadow'] = true; // default: none
  whiteList['box-sizing'] = true; // default: content-box
  whiteList['box-snap'] = true; // default: none
  whiteList['box-suppress'] = true; // default: show
  whiteList['break-after'] = true; // default: auto
  whiteList['break-before'] = true; // default: auto
  whiteList['break-inside'] = true; // default: auto
  whiteList['caption-side'] = false; // default: top
  whiteList['chains'] = false; // default: none
  whiteList['clear'] = true; // default: none
  whiteList['clip'] = false; // default: auto
  whiteList['clip-path'] = false; // default: none
  whiteList['clip-rule'] = false; // default: nonzero
  whiteList['color'] = true; // default: implementation dependent
  whiteList['color-interpolation-filters'] = true; // default: auto
  whiteList['column-count'] = false; // default: auto
  whiteList['column-fill'] = false; // default: balance
  whiteList['column-gap'] = false; // default: normal
  whiteList['column-rule'] = false; // default: depending on individual properties
  whiteList['column-rule-color'] = false; // default: current color
  whiteList['column-rule-style'] = false; // default: medium
  whiteList['column-rule-width'] = false; // default: medium
  whiteList['column-span'] = false; // default: none
  whiteList['column-width'] = false; // default: auto
  whiteList['columns'] = false; // default: depending on individual properties
  whiteList['contain'] = false; // default: none
  whiteList['content'] = false; // default: normal
  whiteList['counter-increment'] = false; // default: none
  whiteList['counter-reset'] = false; // default: none
  whiteList['counter-set'] = false; // default: none
  whiteList['crop'] = false; // default: auto
  whiteList['cue'] = false; // default: depending on individual properties
  whiteList['cue-after'] = false; // default: none
  whiteList['cue-before'] = false; // default: none
  whiteList['cursor'] = false; // default: auto
  whiteList['direction'] = false; // default: ltr
  whiteList['display'] = true; // default: depending on individual properties
  whiteList['display-inside'] = true; // default: auto
  whiteList['display-list'] = true; // default: none
  whiteList['display-outside'] = true; // default: inline-level
  whiteList['dominant-baseline'] = false; // default: auto
  whiteList['elevation'] = false; // default: level
  whiteList['empty-cells'] = false; // default: show
  whiteList['filter'] = false; // default: none
  whiteList['flex'] = false; // default: depending on individual properties
  whiteList['flex-basis'] = false; // default: auto
  whiteList['flex-direction'] = false; // default: row
  whiteList['flex-flow'] = false; // default: depending on individual properties
  whiteList['flex-grow'] = false; // default: 0
  whiteList['flex-shrink'] = false; // default: 1
  whiteList['flex-wrap'] = false; // default: nowrap
  whiteList['float'] = false; // default: none
  whiteList['float-offset'] = false; // default: 0 0
  whiteList['flood-color'] = false; // default: black
  whiteList['flood-opacity'] = false; // default: 1
  whiteList['flow-from'] = false; // default: none
  whiteList['flow-into'] = false; // default: none
  whiteList['font'] = true; // default: depending on individual properties
  whiteList['font-family'] = true; // default: implementation dependent
  whiteList['font-feature-settings'] = true; // default: normal
  whiteList['font-kerning'] = true; // default: auto
  whiteList['font-language-override'] = true; // default: normal
  whiteList['font-size'] = true; // default: medium
  whiteList['font-size-adjust'] = true; // default: none
  whiteList['font-stretch'] = true; // default: normal
  whiteList['font-style'] = true; // default: normal
  whiteList['font-synthesis'] = true; // default: weight style
  whiteList['font-variant'] = true; // default: normal
  whiteList['font-variant-alternates'] = true; // default: normal
  whiteList['font-variant-caps'] = true; // default: normal
  whiteList['font-variant-east-asian'] = true; // default: normal
  whiteList['font-variant-ligatures'] = true; // default: normal
  whiteList['font-variant-numeric'] = true; // default: normal
  whiteList['font-variant-position'] = true; // default: normal
  whiteList['font-weight'] = true; // default: normal
  whiteList['grid'] = false; // default: depending on individual properties
  whiteList['grid-area'] = false; // default: depending on individual properties
  whiteList['grid-auto-columns'] = false; // default: auto
  whiteList['grid-auto-flow'] = false; // default: none
  whiteList['grid-auto-rows'] = false; // default: auto
  whiteList['grid-column'] = false; // default: depending on individual properties
  whiteList['grid-column-end'] = false; // default: auto
  whiteList['grid-column-start'] = false; // default: auto
  whiteList['grid-row'] = false; // default: depending on individual properties
  whiteList['grid-row-end'] = false; // default: auto
  whiteList['grid-row-start'] = false; // default: auto
  whiteList['grid-template'] = false; // default: depending on individual properties
  whiteList['grid-template-areas'] = false; // default: none
  whiteList['grid-template-columns'] = false; // default: none
  whiteList['grid-template-rows'] = false; // default: none
  whiteList['hanging-punctuation'] = false; // default: none
  whiteList['height'] = true; // default: auto
  whiteList['hyphens'] = false; // default: manual
  whiteList['icon'] = false; // default: auto
  whiteList['image-orientation'] = false; // default: auto
  whiteList['image-resolution'] = false; // default: normal
  whiteList['ime-mode'] = false; // default: auto
  whiteList['initial-letters'] = false; // default: normal
  whiteList['inline-box-align'] = false; // default: last
  whiteList['justify-content'] = false; // default: auto
  whiteList['justify-items'] = false; // default: auto
  whiteList['justify-self'] = false; // default: auto
  whiteList['left'] = false; // default: auto
  whiteList['letter-spacing'] = true; // default: normal
  whiteList['lighting-color'] = true; // default: white
  whiteList['line-box-contain'] = false; // default: block inline replaced
  whiteList['line-break'] = false; // default: auto
  whiteList['line-grid'] = false; // default: match-parent
  whiteList['line-height'] = false; // default: normal
  whiteList['line-snap'] = false; // default: none
  whiteList['line-stacking'] = false; // default: depending on individual properties
  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
  whiteList['line-stacking-shift'] = false; // default: consider-shifts
  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
  whiteList['list-style'] = true; // default: depending on individual properties
  whiteList['list-style-image'] = true; // default: none
  whiteList['list-style-position'] = true; // default: outside
  whiteList['list-style-type'] = true; // default: disc
  whiteList['margin'] = true; // default: depending on individual properties
  whiteList['margin-bottom'] = true; // default: 0
  whiteList['margin-left'] = true; // default: 0
  whiteList['margin-right'] = true; // default: 0
  whiteList['margin-top'] = true; // default: 0
  whiteList['marker-offset'] = false; // default: auto
  whiteList['marker-side'] = false; // default: list-item
  whiteList['marks'] = false; // default: none
  whiteList['mask'] = false; // default: border-box
  whiteList['mask-box'] = false; // default: see individual properties
  whiteList['mask-box-outset'] = false; // default: 0
  whiteList['mask-box-repeat'] = false; // default: stretch
  whiteList['mask-box-slice'] = false; // default: 0 fill
  whiteList['mask-box-source'] = false; // default: none
  whiteList['mask-box-width'] = false; // default: auto
  whiteList['mask-clip'] = false; // default: border-box
  whiteList['mask-image'] = false; // default: none
  whiteList['mask-origin'] = false; // default: border-box
  whiteList['mask-position'] = false; // default: center
  whiteList['mask-repeat'] = false; // default: no-repeat
  whiteList['mask-size'] = false; // default: border-box
  whiteList['mask-source-type'] = false; // default: auto
  whiteList['mask-type'] = false; // default: luminance
  whiteList['max-height'] = true; // default: none
  whiteList['max-lines'] = false; // default: none
  whiteList['max-width'] = true; // default: none
  whiteList['min-height'] = true; // default: 0
  whiteList['min-width'] = true; // default: 0
  whiteList['move-to'] = false; // default: normal
  whiteList['nav-down'] = false; // default: auto
  whiteList['nav-index'] = false; // default: auto
  whiteList['nav-left'] = false; // default: auto
  whiteList['nav-right'] = false; // default: auto
  whiteList['nav-up'] = false; // default: auto
  whiteList['object-fit'] = false; // default: fill
  whiteList['object-position'] = false; // default: 50% 50%
  whiteList['opacity'] = false; // default: 1
  whiteList['order'] = false; // default: 0
  whiteList['orphans'] = false; // default: 2
  whiteList['outline'] = false; // default: depending on individual properties
  whiteList['outline-color'] = false; // default: invert
  whiteList['outline-offset'] = false; // default: 0
  whiteList['outline-style'] = false; // default: none
  whiteList['outline-width'] = false; // default: medium
  whiteList['overflow'] = false; // default: depending on individual properties
  whiteList['overflow-wrap'] = false; // default: normal
  whiteList['overflow-x'] = false; // default: visible
  whiteList['overflow-y'] = false; // default: visible
  whiteList['padding'] = true; // default: depending on individual properties
  whiteList['padding-bottom'] = true; // default: 0
  whiteList['padding-left'] = true; // default: 0
  whiteList['padding-right'] = true; // default: 0
  whiteList['padding-top'] = true; // default: 0
  whiteList['page'] = false; // default: auto
  whiteList['page-break-after'] = false; // default: auto
  whiteList['page-break-before'] = false; // default: auto
  whiteList['page-break-inside'] = false; // default: auto
  whiteList['page-policy'] = false; // default: start
  whiteList['pause'] = false; // default: implementation dependent
  whiteList['pause-after'] = false; // default: implementation dependent
  whiteList['pause-before'] = false; // default: implementation dependent
  whiteList['perspective'] = false; // default: none
  whiteList['perspective-origin'] = false; // default: 50% 50%
  whiteList['pitch'] = false; // default: medium
  whiteList['pitch-range'] = false; // default: 50
  whiteList['play-during'] = false; // default: auto
  whiteList['position'] = false; // default: static
  whiteList['presentation-level'] = false; // default: 0
  whiteList['quotes'] = false; // default: text
  whiteList['region-fragment'] = false; // default: auto
  whiteList['resize'] = false; // default: none
  whiteList['rest'] = false; // default: depending on individual properties
  whiteList['rest-after'] = false; // default: none
  whiteList['rest-before'] = false; // default: none
  whiteList['richness'] = false; // default: 50
  whiteList['right'] = false; // default: auto
  whiteList['rotation'] = false; // default: 0
  whiteList['rotation-point'] = false; // default: 50% 50%
  whiteList['ruby-align'] = false; // default: auto
  whiteList['ruby-merge'] = false; // default: separate
  whiteList['ruby-position'] = false; // default: before
  whiteList['shape-image-threshold'] = false; // default: 0.0
  whiteList['shape-outside'] = false; // default: none
  whiteList['shape-margin'] = false; // default: 0
  whiteList['size'] = false; // default: auto
  whiteList['speak'] = false; // default: auto
  whiteList['speak-as'] = false; // default: normal
  whiteList['speak-header'] = false; // default: once
  whiteList['speak-numeral'] = false; // default: continuous
  whiteList['speak-punctuation'] = false; // default: none
  whiteList['speech-rate'] = false; // default: medium
  whiteList['stress'] = false; // default: 50
  whiteList['string-set'] = false; // default: none
  whiteList['tab-size'] = false; // default: 8
  whiteList['table-layout'] = false; // default: auto
  whiteList['text-align'] = true; // default: start
  whiteList['text-align-last'] = true; // default: auto
  whiteList['text-combine-upright'] = true; // default: none
  whiteList['text-decoration'] = true; // default: none
  whiteList['text-decoration-color'] = true; // default: currentColor
  whiteList['text-decoration-line'] = true; // default: none
  whiteList['text-decoration-skip'] = true; // default: objects
  whiteList['text-decoration-style'] = true; // default: solid
  whiteList['text-emphasis'] = true; // default: depending on individual properties
  whiteList['text-emphasis-color'] = true; // default: currentColor
  whiteList['text-emphasis-position'] = true; // default: over right
  whiteList['text-emphasis-style'] = true; // default: none
  whiteList['text-height'] = true; // default: auto
  whiteList['text-indent'] = true; // default: 0
  whiteList['text-justify'] = true; // default: auto
  whiteList['text-orientation'] = true; // default: mixed
  whiteList['text-overflow'] = true; // default: clip
  whiteList['text-shadow'] = true; // default: none
  whiteList['text-space-collapse'] = true; // default: collapse
  whiteList['text-transform'] = true; // default: none
  whiteList['text-underline-position'] = true; // default: auto
  whiteList['text-wrap'] = true; // default: normal
  whiteList['top'] = false; // default: auto
  whiteList['transform'] = false; // default: none
  whiteList['transform-origin'] = false; // default: 50% 50% 0
  whiteList['transform-style'] = false; // default: flat
  whiteList['transition'] = false; // default: depending on individual properties
  whiteList['transition-delay'] = false; // default: 0s
  whiteList['transition-duration'] = false; // default: 0s
  whiteList['transition-property'] = false; // default: all
  whiteList['transition-timing-function'] = false; // default: ease
  whiteList['unicode-bidi'] = false; // default: normal
  whiteList['vertical-align'] = false; // default: baseline
  whiteList['visibility'] = false; // default: visible
  whiteList['voice-balance'] = false; // default: center
  whiteList['voice-duration'] = false; // default: auto
  whiteList['voice-family'] = false; // default: implementation dependent
  whiteList['voice-pitch'] = false; // default: medium
  whiteList['voice-range'] = false; // default: medium
  whiteList['voice-rate'] = false; // default: normal
  whiteList['voice-stress'] = false; // default: normal
  whiteList['voice-volume'] = false; // default: medium
  whiteList['volume'] = false; // default: medium
  whiteList['white-space'] = false; // default: normal
  whiteList['widows'] = false; // default: 2
  whiteList['width'] = true; // default: auto
  whiteList['will-change'] = false; // default: auto
  whiteList['word-break'] = true; // default: normal
  whiteList['word-spacing'] = true; // default: normal
  whiteList['word-wrap'] = true; // default: normal
  whiteList['wrap-flow'] = false; // default: auto
  whiteList['wrap-through'] = false; // default: wrap
  whiteList['writing-mode'] = false; // default: horizontal-tb
  whiteList['z-index'] = false; // default: auto

  return whiteList;
}


/**
 * 匹配到白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onAttr (name, value, options) {
  // do nothing
}

/**
 * 匹配到不在白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onIgnoreAttr (name, value, options) {
  // do nothing
}

var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

/**
 * 过滤属性值
 *
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function safeAttrValue(name, value) {
  if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
  return value;
}


exports.whiteList = getDefaultWhiteList();
exports.getDefaultWhiteList = getDefaultWhiteList;
exports.onAttr = onAttr;
exports.onIgnoreAttr = onIgnoreAttr;
exports.safeAttrValue = safeAttrValue;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },
  trimRight: function (str) {
    if (String.prototype.trimRight) {
      return str.trimRight();
    }
    return str.replace(/(\s*$)/g, '');
  }
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Simple HTML Parser
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var _ = __webpack_require__(30);

/**
 * get tag name
 *
 * @param {String} html e.g. '<a hef="#">'
 * @return {String}
 */
function getTagName(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    var tagName = html.slice(1, -1);
  } else {
    var tagName = html.slice(1, i + 1);
  }
  tagName = _.trim(tagName).toLowerCase();
  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
  return tagName;
}

/**
 * is close tag?
 *
 * @param {String} html 如：'<a hef="#">'
 * @return {Boolean}
 */
function isClosing(html) {
  return html.slice(0, 2) === "</";
}

/**
 * parse input html and returns processed html
 *
 * @param {String} html
 * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
 * @param {Function} escapeHtml
 * @return {String}
 */
function parseTag(html, onTag, escapeHtml) {
  "user strict";

  var rethtml = "";
  var lastPos = 0;
  var tagStart = false;
  var quoteStart = false;
  var currentPos = 0;
  var len = html.length;
  var currentTagName = "";
  var currentHtml = "";

  for (currentPos = 0; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === "<") {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === "<") {
          rethtml += escapeHtml(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === ">") {
          rethtml += escapeHtml(html.slice(lastPos, tagStart));
          currentHtml = html.slice(tagStart, currentPos + 1);
          currentTagName = getTagName(currentHtml);
          rethtml += onTag(
            tagStart,
            rethtml.length,
            currentTagName,
            currentHtml,
            isClosing(currentHtml)
          );
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        if ((c === '"' || c === "'") && html.charAt(currentPos - 1) === "=") {
          quoteStart = c;
          continue;
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < html.length) {
    rethtml += escapeHtml(html.substr(lastPos));
  }

  return rethtml;
}

var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9_:\.\-]/gim;

/**
 * parse input attributes and returns processed attributes
 *
 * @param {String} html e.g. `href="#" target="_blank"`
 * @param {Function} onAttr e.g. `function (name, value)`
 * @return {String}
 */
function parseAttr(html, onAttr) {
  "user strict";

  var lastPos = 0;
  var retAttrs = [];
  var tmpName = false;
  var len = html.length;

  function addAttr(name, value) {
    name = _.trim(name);
    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
    if (name.length < 1) return;
    var ret = onAttr(name, value || "");
    if (ret) retAttrs.push(ret);
  }

  // 逐个分析字符
  for (var i = 0; i < len; i++) {
    var c = html.charAt(i);
    var v, j;
    if (tmpName === false && c === "=") {
      tmpName = html.slice(lastPos, i);
      lastPos = i + 1;
      continue;
    }
    if (tmpName !== false) {
      if (
        i === lastPos &&
        (c === '"' || c === "'") &&
        html.charAt(i - 1) === "="
      ) {
        j = html.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = _.trim(html.slice(lastPos + 1, j));
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (/\s|\n|\t/.test(c)) {
      html = html.replace(/\s|\n|\t/g, " ");
      if (tmpName === false) {
        j = findNextEqual(html, i);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          addAttr(v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          i = j - 1;
          continue;
        }
      } else {
        j = findBeforeEqual(html, i - 1);
        if (j === -1) {
          v = _.trim(html.slice(lastPos, i));
          v = stripQuoteWrap(v);
          addAttr(tmpName, v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  if (lastPos < html.length) {
    if (tmpName === false) {
      addAttr(html.slice(lastPos));
    } else {
      addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
    }
  }

  return _.trim(retAttrs.join(" "));
}

function findNextEqual(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function findBeforeEqual(str, i) {
  for (; i > 0; i--) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function isQuoteWrapString(text) {
  if (
    (text[0] === '"' && text[text.length - 1] === '"') ||
    (text[0] === "'" && text[text.length - 1] === "'")
  ) {
    return true;
  } else {
    return false;
  }
}

function stripQuoteWrap(text) {
  if (isQuoteWrapString(text)) {
    return text.substr(1, text.length - 2);
  } else {
    return text;
  }
}

exports.parseTag = parseTag;
exports.parseAttr = parseAttr;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(31);
var parser = __webpack_require__(34);
var FilterXSS = __webpack_require__(38);

/**
 * filter xss function
 *
 * @param {String} html
 * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
 * @return {String}
 */
function filterXSS(html, options) {
  var xss = new FilterXSS(options);
  return xss.process(html);
}

exports = module.exports = filterXSS;
exports.FilterXSS = FilterXSS;
for (var i in DEFAULT) exports[i] = DEFAULT[i];
for (var i in parser) exports[i] = parser[i];

// using `xss` on the browser, output `filterXSS` to the globals
if (typeof window !== "undefined") {
  window.filterXSS = module.exports;
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT = __webpack_require__(32);
var parseStyle = __webpack_require__(37);
var _ = __webpack_require__(33);


/**
 * 返回值是否为空
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull (obj) {
  return (obj === undefined || obj === null);
}

/**
 * 浅拷贝对象
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject (obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * 创建CSS过滤器
 *
 * @param {Object} options
 *   - {Object} whiteList
 *   - {Function} onAttr
 *   - {Function} onIgnoreAttr
 *   - {Function} safeAttrValue
 */
function FilterCSS (options) {
  options = shallowCopyObject(options || {});
  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onAttr = options.onAttr || DEFAULT.onAttr;
  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  this.options = options;
}

FilterCSS.prototype.process = function (css) {
  // 兼容各种奇葩输入
  css = css || '';
  css = css.toString();
  if (!css) return '';

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onAttr = options.onAttr;
  var onIgnoreAttr = options.onIgnoreAttr;
  var safeAttrValue = options.safeAttrValue;

  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

    var check = whiteList[name];
    var isWhite = false;
    if (check === true) isWhite = check;
    else if (typeof check === 'function') isWhite = check(value);
    else if (check instanceof RegExp) isWhite = check.test(value);
    if (isWhite !== true) isWhite = false;

    // 如果过滤后 value 为空则直接忽略
    value = safeAttrValue(name, value);
    if (!value) return;

    var opts = {
      position: position,
      sourcePosition: sourcePosition,
      source: source,
      isWhite: isWhite
    };

    if (isWhite) {

      var ret = onAttr(name, value, opts);
      if (isNull(ret)) {
        return name + ':' + value;
      } else {
        return ret;
      }

    } else {

      var ret = onIgnoreAttr(name, value, opts);
      if (!isNull(ret)) {
        return ret;
      }

    }
  });

  return retCSS;
};


module.exports = FilterCSS;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var _ = __webpack_require__(33);


/**
 * 解析style
 *
 * @param {String} css
 * @param {Function} onAttr 处理属性的函数
 *   参数格式： function (sourcePosition, position, name, value, source)
 * @return {String}
 */
function parseStyle (css, onAttr) {
  css = _.trimRight(css);
  if (css[css.length - 1] !== ';') css += ';';
  var cssLength = css.length;
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = '';

  function addNewAttr () {
    // 如果没有正常的闭合圆括号，则直接忽略当前属性
    if (!isParenthesisOpen) {
      var source = _.trim(css.slice(lastPos, i));
      var j = source.indexOf(':');
      if (j !== -1) {
        var name = _.trim(source.slice(0, j));
        var value = _.trim(source.slice(j + 1));
        // 必须有属性名称
        if (name) {
          var ret = onAttr(lastPos, retCSS.length, name, value, source);
          if (ret) retCSS += ret + '; ';
        }
      }
    }
    lastPos = i + 1;
  }

  for (; i < cssLength; i++) {
    var c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      // 备注开始
      var j = css.indexOf('*/', i + 2);
      // 如果没有正常的备注结束，则后面的部分全部跳过
      if (j === -1) break;
      // 直接将当前位置调到备注结尾，并且初始化状态
      i = j + 1;
      lastPos = i + 1;
      isParenthesisOpen = false;
    } else if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) {
        // 在圆括号里面，忽略
      } else {
        addNewAttr();
      }
    } else if (c === '\n') {
      addNewAttr();
    }
  }

  return _.trim(retCSS);
}

module.exports = parseStyle;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * filter xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = __webpack_require__(29).FilterCSS;
var DEFAULT = __webpack_require__(31);
var parser = __webpack_require__(34);
var parseTag = parser.parseTag;
var parseAttr = parser.parseAttr;
var _ = __webpack_require__(30);

/**
 * returns `true` if the input value is `undefined` or `null`
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull(obj) {
  return obj === undefined || obj === null;
}

/**
 * get attributes for a tag
 *
 * @param {String} html
 * @return {Object}
 *   - {String} html
 *   - {Boolean} closing
 */
function getAttrs(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    return {
      html: "",
      closing: html[html.length - 2] === "/"
    };
  }
  html = _.trim(html.slice(i + 1, -1));
  var isClosing = html[html.length - 1] === "/";
  if (isClosing) html = _.trim(html.slice(0, -1));
  return {
    html: html,
    closing: isClosing
  };
}

/**
 * shallow copy
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject(obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * FilterXSS class
 *
 * @param {Object} options
 *        whiteList, onTag, onTagAttr, onIgnoreTag,
 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
 *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
 */
function FilterXSS(options) {
  options = shallowCopyObject(options || {});

  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
  }

  options.whiteList = options.whiteList || DEFAULT.whiteList;
  options.onTag = options.onTag || DEFAULT.onTag;
  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
  this.options = options;

  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new FilterCSS(options.css);
  }
}

/**
 * start process and returns result
 *
 * @param {String} html
 * @return {String}
 */
FilterXSS.prototype.process = function(html) {
  // compatible with the input
  html = html || "";
  html = html.toString();
  if (!html) return "";

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onTag = options.onTag;
  var onIgnoreTag = options.onIgnoreTag;
  var onTagAttr = options.onTagAttr;
  var onIgnoreTagAttr = options.onIgnoreTagAttr;
  var safeAttrValue = options.safeAttrValue;
  var escapeHtml = options.escapeHtml;
  var cssFilter = me.cssFilter;

  // remove invisible characters
  if (options.stripBlankChar) {
    html = DEFAULT.stripBlankChar(html);
  }

  // remove html comments
  if (!options.allowCommentTag) {
    html = DEFAULT.stripCommentTag(html);
  }

  // if enable stripIgnoreTagBody
  var stripIgnoreTagBody = false;
  if (options.stripIgnoreTagBody) {
    var stripIgnoreTagBody = DEFAULT.StripTagBody(
      options.stripIgnoreTagBody,
      onIgnoreTag
    );
    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
  }

  var retHtml = parseTag(
    html,
    function(sourcePosition, position, tag, html, isClosing) {
      var info = {
        sourcePosition: sourcePosition,
        position: position,
        isClosing: isClosing,
        isWhite: whiteList.hasOwnProperty(tag)
      };

      // call `onTag()`
      var ret = onTag(tag, html, info);
      if (!isNull(ret)) return ret;

      if (info.isWhite) {
        if (info.isClosing) {
          return "</" + tag + ">";
        }

        var attrs = getAttrs(html);
        var whiteAttrList = whiteList[tag];
        var attrsHtml = parseAttr(attrs.html, function(name, value) {
          // call `onTagAttr()`
          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
          var ret = onTagAttr(tag, name, value, isWhiteAttr);
          if (!isNull(ret)) return ret;

          if (isWhiteAttr) {
            // call `safeAttrValue()`
            value = safeAttrValue(tag, name, value, cssFilter);
            if (value) {
              return name + '="' + value + '"';
            } else {
              return name;
            }
          } else {
            // call `onIgnoreTagAttr()`
            var ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
            if (!isNull(ret)) return ret;
            return;
          }
        });

        // build new tag html
        var html = "<" + tag;
        if (attrsHtml) html += " " + attrsHtml;
        if (attrs.closing) html += " /";
        html += ">";
        return html;
      } else {
        // call `onIgnoreTag()`
        var ret = onIgnoreTag(tag, html, info);
        if (!isNull(ret)) return ret;
        return escapeHtml(html);
      }
    },
    escapeHtml
  );

  // if enable stripIgnoreTagBody
  if (stripIgnoreTagBody) {
    retHtml = stripIgnoreTagBody.remove(retHtml);
  }

  return retHtml;
};

module.exports = FilterXSS;


/***/ })
/******/ ]);
//# sourceMappingURL=main.map