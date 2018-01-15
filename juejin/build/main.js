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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["mysqlQuery"] = mysqlQuery;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(4);
var mysql = __webpack_require__(24);

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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__development_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__production_js__ = __webpack_require__(26);



function getConfig() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "production";

    if (name == 'production') {
        return __WEBPACK_IMPORTED_MODULE_1__production_js__["a" /* default */];
    } else {
        return __WEBPACK_IMPORTED_MODULE_0__development_js__["a" /* default */];
    }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
* @Author: huangchengdu
* @Date:   2017-01-13 17:10:07
* @Last Modified by:   huangchengdu
* @Last Modified time: 2017-01-13 21:40:28
*/

module.exports = {
	checkLogin: function checkLogin(req, res, next) {
		// console.log("=======耶耶耶=======",req.session.user);
		// if (!req.session.user) {
		// 	//req.flash('error','未登录');
		// 	return res.redirect('/signin');
		// }
		next();
	},
	checkNotLogin: function checkNotLogin(req, res, next) {
		// if (req.session.user) {
		// 	//req.flash('error','已登录');
		// 	return res.redirect('back');//返回之前的页面
		// }
		next();
	}
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
 * @Author: huangchengdu
 * @Date:   2017-01-14 14:17:43
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 14:18:22
 */

var marked = __webpack_require__(6);
var mysqlQuery = __webpack_require__(3).mysqlQuery;
var formatDate = __webpack_require__(1).formatDate;

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
                            sql = 'SELECT * FROM comments where postId=' + postId + " ORDER BY _id desc";
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__default_js__ = __webpack_require__(25);
// let devConfig = require('./default.js');


var proConfig = {
    devEnv: true,
    port: 5389,
    apiPort: 5389,
    apiHost: "http://localhost",
    sslModel: false,
    uploadPath: '/../../static/img/'
};
var disConfig = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__default_js__["a" /* default */], proConfig);

/* harmony default export */ __webpack_exports__["a"] = (disConfig);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("sha1");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*
 * @Author: huangchengdu
 * @Date:   2017-01-14 11:16:16
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 12:11:11
 */

var mysqlQuery = __webpack_require__(3).mysqlQuery;
var formatDate = __webpack_require__(1).formatDate;

/* harmony default export */ __webpack_exports__["a"] = ({
    // 注册一个用户
    create: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee(param) {
            var addSql, addSqlParams, addRet, sql, _ref2, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            addSql = 'INSERT INTO users(name,password,gender,bio,avatar,created_at) VALUES(?,?,?,?,?,?)';
                            addSqlParams = [param.name, param.password, param.gender, param.bio, param.avatar, param.created_at];
                            _context.next = 4;
                            return mysqlQuery(addSql, addSqlParams);

                        case 4:
                            addRet = _context.sent;

                            if (!(addRet.result && addRet.result.insertId)) {
                                _context.next = 19;
                                break;
                            }

                            sql = 'SELECT * FROM users where _id=' + addRet.result.insertId;
                            _context.next = 9;
                            return mysqlQuery(sql);

                        case 9:
                            _ref2 = _context.sent;
                            err = _ref2.err;
                            result = _ref2.result;

                            if (!err) {
                                _context.next = 16;
                                break;
                            }

                            return _context.abrupt('return', Promise.reject(err));

                        case 16:
                            return _context.abrupt('return', Promise.resolve(result[0]));

                        case 17:
                            _context.next = 20;
                            break;

                        case 19:
                            return _context.abrupt('return', Promise.reject(addRet.err));

                        case 20:
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

    // 通过用户名获取用户信息
    getUserByName: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee2(name) {
            var sql, _ref4, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            sql = 'SELECT * FROM users where name="' + name + '"';
                            _context2.next = 3;
                            return mysqlQuery(sql);

                        case 3:
                            _ref4 = _context2.sent;
                            err = _ref4.err;
                            result = _ref4.result;

                            if (!err) {
                                _context2.next = 10;
                                break;
                            }

                            return _context2.abrupt('return', Promise.reject(err));

                        case 10:
                            return _context2.abrupt('return', Promise.resolve(result[0]));

                        case 11:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function getUserByName(_x2) {
            return _ref3.apply(this, arguments);
        }

        return getUserByName;
    }()
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_index__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_cookie_parser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_cookie_parser__);


var session = __webpack_require__(16);
var MySQLStore = __webpack_require__(17)(session);
var winston = __webpack_require__(18);
var expressWinston = __webpack_require__(19);

var nuxtConfig = __webpack_require__(34);

var path = __webpack_require__(12);
var pkg = __webpack_require__(36);
var config = Object(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */])("development");
var fs = __webpack_require__(11);




var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();

// app.use(express.static(path.join(__dirname, 'static/img')));

// let uploadDir = "/usr/local/webserver/nginx/static/img";
// console.log("----dirname",__dirname);
// if (config.devEnv) {

//   uploadDir = path.join(__dirname, 'static/img');
// }

// 处理表单及文件上传的中间件
// app.use(require('express-formidable')({
//   uploadDir: uploadDir,
//   // keepExtensions: true // 保留后缀
// }));

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(__WEBPACK_IMPORTED_MODULE_5_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_6_cookie_parser___default()());

// process.env.DEBUG = 'nuxt:*'


var host = process.env.HOST || 'localhost';
var port = process.env.PORT || config.port;

// console.log("===========dirname",__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// session 中间件
app.use(session({
  key: config.session.key,
  secret: config.session.secret,
  cookie: {
    maxAge: config.session.maxAge,
    secure: config.devEnv ? false : true
  },
  store: new MySQLStore(config.dbConfig),
  connectionLimit: 100,
  expiration: 86400000,
  resave: config.devEnv ? false : true,
  saveUninitialized: true
}));
// 处理表单及文件上传的中间件
// app.use(require('express-formidable')({
//   uploadDir: uploadDir,
//   keepExtensions: true // 保留后缀
// }));


app.locals.blog = {
  title: pkg.name,
  description: pkg.description
};

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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server", __webpack_require__(14)(module)))

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("express-mysql-session");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("express-winston");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = startRouter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__posts_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signin_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signout_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_js__ = __webpack_require__(31);





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
    // app.use('/api/login', function(req,res) {
    //     console.log("======到了======",req.fields,req.params,req.body,req.query,req.cookies,req.headers);
    //     console.log("======到了======",res.fields,res.params,res.body);
    //     console.log("==================");
    //     let name = req.params.name;
    //     let password = req.params.password;
    //     console.log("========用户名和密码====",name,password);
    //     res.send({name:"hehe"});
    // });
    app.use('/api/posts', __WEBPACK_IMPORTED_MODULE_0__posts_js__["a" /* default */]);
    app.use('/api/login', __WEBPACK_IMPORTED_MODULE_1__signin_js__["a" /* default */]);
    app.use('/api/signup', __WEBPACK_IMPORTED_MODULE_3__signup_js__["a" /* default */]);
    app.use('/api/signout', __WEBPACK_IMPORTED_MODULE_2__signout_js__["a" /* default */]);

    // 404 page
    // app.use(function(req, res) {
    //     if (!res.headersSent) {
    //         res.status(404).render('404');
    //     }
    // });
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_posts__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_assist__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_comments__ = __webpack_require__(7);
/*
 * @Author: huangchengdu
 * @Date:   2017-01-13 21:41:07
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 14:53:01
 */

var express = __webpack_require__(0);
var router = express.Router();
// let PostModel = require('../models/posts');

var xss = __webpack_require__(27);

// let CommentModel = require('../models/comments');

var checkLogin = __webpack_require__(5).checkLogin;

//GET /posts 所有用户或者特定用户的文章页
// eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
	console.log("=====posts===request session====", req.query);
	var authorId = req.query && req.query.author;
	var pageIndex = req.query && req.query.pageIndex;
	//console.log("queyr=========", req.query);
	// return PostModel.getPosts(authorId);
	//Promise.resolve("23423");
	__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].getPosts(authorId, pageIndex).then(function (posts) {
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
// router.get('/create', checkLogin, function (req, res, next) {
// 	res.render('create');
// });

// POST /posts 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
	var author = req.session.user;
	// console.log("================",req.body);
	var title = req.body.title;
	var content = req.body.content;
	// console.log("================",req.body);
	// return;
	try {
		if (!title.length) {
			throw new Error('请填写标题');
		}
		if (!content.length) {
			throw new Error('请填写内容');
		}
	} catch (e) {
		// req.flash('error', e.message);
		res.json({ err: { message: e.message || "发布失败" }, post: null });
	}
	var post = {
		author: author,
		title: title,
		content: content,
		pv: 0
	};
	// console.log("+++++++++++++++++++++---------",post);
	__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].create(post).then(function (post) {
		// req.flash('success', '发表成功');
		// console.log("+++++++++++++++++++++",post);
		// 发表成功后跳转到该文章页
		// res.redirect(`/posts/${post._id}`);
		res.json({ err: null, post: post });
	}).catch(function (e) {
		res.json({ err: { message: e.message || "添加出错" }, post: null });
	});
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
	// console.log("=====postsid===request session====",req.session.user);
	var postId = req.params.postId;
	Promise.all([__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].getPostById(postId), //获取文章
	__WEBPACK_IMPORTED_MODULE_2__models_comments__["default"].getComments(postId), //获取评论
	__WEBPACK_IMPORTED_MODULE_0__models_posts__["a" /* default */].incPv(postId) //添加访问次数
	]).then(function (result) {
		var post = result[0];
		var comments = result[1];
		// console.log("comments============",comments);
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
	var content = req.body.content;
	var comment = {
		author: author,
		postId: postId, //文章id
		content: content
	};
	// console.log("==============comment=============",comment);
	// return res.json(comment);
	__WEBPACK_IMPORTED_MODULE_2__models_comments__["default"].create(comment).then(function (result) {
		// req.flash('success', '留言成功');
		// 留言成功后跳转到上一页
		// res.redirect('back');
		__WEBPACK_IMPORTED_MODULE_2__models_comments__["default"].getComments(postId).then(function (result) {
			res.json({ err: null, comments: result });
		}).catch(function (err) {
			res.json({ err: { message: "获取评论失败" }, comments: null });
		});
	}).catch(function (err) {
		res.json({ err: { message: "添加评论失败" }, comments: null });
	});
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_sql_js__ = __webpack_require__(3);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var marked = __webpack_require__(6);
var CommentModel = __webpack_require__(7);
// let mysqlQuery = require('../lib/sql').mysqlQuery;

var formatDate = __webpack_require__(1).formatDate;

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
        var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee3(authorId, pageIndex) {
            var pageSize, sql, _ref6, err, result;

            return __WEBPACK_IMPORTED_MODULE_0__Users_huangchengdu_Desktop_github_ExpressNuxtMysqlNginxBlog_juejin_node_modules_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            pageSize = 10;
                            sql = 'SELECT author,_id,pv,title,authorId,created_at,commentsCount FROM posts';

                            if (authorId) {
                                sql = sql + " where authorId=" + authorId;
                            } else {
                                sql = sql + (' LIMIT ' + pageIndex * pageSize + ',' + pageSize);
                            }
                            _context3.next = 5;
                            return Object(__WEBPACK_IMPORTED_MODULE_1__lib_sql_js__["mysqlQuery"])(sql);

                        case 5:
                            _ref6 = _context3.sent;
                            err = _ref6.err;
                            result = _ref6.result;
                            _context3.prev = 8;

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
                            _context3.next = 15;
                            break;

                        case 12:
                            _context3.prev = 12;
                            _context3.t0 = _context3['catch'](8);

                            err = _context3.t0;

                        case 15:
                            _context3.prev = 15;

                            if (!err) {
                                _context3.next = 20;
                                break;
                            }

                            return _context3.abrupt('return', Promise.reject(err));

                        case 20:
                            return _context3.abrupt('return', Promise.resolve(result));

                        case 21:
                            return _context3.finish(15);

                        case 22:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this, [[8, 12, 15, 22]]);
        }));

        function getPosts(_x3, _x4) {
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

        function incPv(_x5) {
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

        function updatePostById(_x6) {
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

        function delPostById(_x7) {
            return _ref11.apply(this, arguments);
        }

        return delPostById;
    }()
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 25 */
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
        maxAge: 600000
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__development_js__ = __webpack_require__(8);
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
    sslModel: false,
    uploadPath: '/usr/local/webserver/nginx/static/img/'
};
var disConfig = Object.assign({}, __WEBPACK_IMPORTED_MODULE_0__development_js__["a" /* default */], proConfig);

/* harmony default export */ __webpack_exports__["a"] = (disConfig);

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("xss");

/***/ }),
/* 28 */
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_users__ = __webpack_require__(10);
/*
 * @Author: huangchengdu
 * @Date:   2017-01-13 21:54:40
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 12:14:32
 */

var sha1 = __webpack_require__(9);
var express = __webpack_require__(0);
var router = express.Router();

var checkNotLogin = __webpack_require__(5).checkNotLogin;

// GET /signin 登录页
// router.get('/', checkNotLogin, function(req, res, next) {
//     res.render('signin');
// });
// POST /signin 用户登录
router.post('/', function (req, res, next) {
    // console.log("======到了======",req.body);
    var name = req.body.name;
    var password = req.body.password;
    // console.log("========用户名和密码====",name,password);
    __WEBPACK_IMPORTED_MODULE_0__models_users__["a" /* default */].getUserByName(name).then(function (user) {
        var err;
        // console.log("========用户====",JSON.stringify(user));
        if (!user) {
            //req.flash('error', '用户不存在');
            //return res.redirect('back');
            err = {
                message: "用户名或者密码错误"
            };
        } else if (sha1(password) !== user.password) {
            err = {
                message: "用户名或者密码错误"
            };
        }
        // req.flash('success', '登录成功');
        // // 用户信息写入 session
        // delete user.password;
        req.session.user = user; //JSON.stringify(user);
        // console.log("=====in======headers========",req.headers);
        // res.session = req.session;
        // res.cookie('user',JSON.stringify(user));
        // console.log("========session====",req.session);
        // console.log("===========cookie===",req.cookies);
        // // 跳转到主页
        // res.redirect('/posts');
        res.json({
            err: err,
            user: user
        });
    }).catch(next);
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
* @Author: huangchengdu
* @Date:   2017-01-13 21:56:39
* @Last Modified by:   huangchengdu
* @Last Modified time: 2017-01-14 11:51:43
*/

var express = __webpack_require__(0);
var router = express.Router();
// let checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', function (req, res, next) {
   // 清空 session 中用户信息
   //  console.log("========request session====",req.session);
   req.session.user = null;
   // res.session = req.session;
   // console.log("====out=======headers========",req.headers);
   // console.log("========response session====",req.session);
   // res.cookie('user',null);
   res.json({ err: null, code: 200 });
   //req.flash('success', '登出成功');
   // 登出成功后跳转到主页
   // res.redirect('/posts');
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_users__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buffer__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_buffer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_buffer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(4);
/*
 * @Author: huangchengdu
 * @Date:   2017-01-13 21:55:28
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 11:22:20
 */

// let express = require('express');
// let router = express.Router();

// let checkNotLogin = require('../middlewares/check').checkNotLogin;

// // GET /signup 注册页
// router.get('/', checkNotLogin, function(req, res, next) {
//   res.render('signup');
// });

// // POST /signup 用户注册
// router.post('/', checkNotLogin, function(req, res, next) {
//   res.send(req.flash());
// });

// module.exports = router;

var fs = __webpack_require__(11);
var path = __webpack_require__(12);
var sha1 = __webpack_require__(9);
var express = __webpack_require__(0);
var router = express.Router();
// let UserModel = require('../models/users');


var checkNotLogin = __webpack_require__(5).checkNotLogin;
var formatDate = __webpack_require__(1).formatDate;
var multer = __webpack_require__(33);
// var upload = multer({ dest: 'static/img/test.png' });
var upload = multer();
// GET /signup 注册页

var config = Object(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */])("development");

function getUploadPath(avatar) {
    if (config.devEnv) {
        return path.join(__dirname, config.uploadPath, avatar);
    } else {
        return config.uploadPath + avatar;
    }
}

// POST /signup 用户注册
router.post('/', upload.single('avatar'), function (req, res, next) {
    // let avatar = req.file.originalname;
    // 校验参数
    // console.log("isbuffer====",req.body,req.file);
    var name = void 0;
    var gender = void 0;
    var bio = void 0;
    var password = void 0;
    var repassword = void 0;
    var newPath = void 0;
    try {
        var timestamp = Date.now();
        if (!req.file) {
            throw new Error('请添加图片');
        }
        var type = req.file.mimetype.split('/')[1];
        var avatar = timestamp + "." + type;
        newPath = getUploadPath(avatar);
        //  console.log("path",newPath,poster);
        // console.log("isbuffer====",Buffer.isBuffer(req.file.buffer));
        console.log(newPath);
        fs.writeFile(newPath, req.file.buffer, function (err) {
            if (err) {
                throw new Error('上传照片失败');
            }
        });

        name = req.body.name;
        gender = req.body.gender;
        bio = req.body.bio;
        password = req.body.password;
        repassword = req.body.repassword;
        if (!(name.length >= 1 && name.length <= 20)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是 m、f 或 x');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        // 注册失败，异步删除上传的头像
        // console.log("=====e======",JSON.stringify(e));
        fs.unlink(newPath);
        res.json({
            err: { message: e.message || "校验出错" },
            user: null
        });
        // req.flash('error', e.message);
        // console.log("==========校验失败===========", e);
        // return res.redirect('/posts');
    }
    // 明文密码加密
    password = sha1(password);

    var dateMap = formatDate(new Date(), 'typeDictionary');
    var date = dateMap.yearMonthDay + " " + dateMap.time;
    // 待写入数据库的用户信息
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar || "",
        created_at: date
    };

    __WEBPACK_IMPORTED_MODULE_0__models_users__["a" /* default */].create(user).then(function (user) {
        req.session.user = user;
        // console.log("======user", user);
        // 写入 flash
        // req.flash('success', '注册成功');
        // req.session.user = user;
        // 跳转到首页
        res.json({
            err: null,
            user: user
        });
        // res.redirect('/posts');
    }).catch(function (err) {
        fs.unlink(newPath);
        if (err.err) {
            err = err.err;
        }
        if (err && err.sql) {
            err.sql = "";
        }
        // 用户名被占用则跳回注册页，而不是错误页
        if (err.sqlMessage && err.sqlMessage.indexOf('Duplicate entry') >= 0) {
            // req.flash('error', '用户名已被占用');
            //return res.redirect('/posts');
            res.json({
                err: {
                    message: "用户名被占用"
                },
                user: null
            });
        } else {
            res.json({
                err: err,
                user: null
            });
            //console.log('err.message==================', err.message);
            // next(err);
        }
    });
});

/* harmony default export */ __webpack_exports__["a"] = (router);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server/api"))

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);
// import bodyParser from 'body-parser'

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        script: [{
            src: 'https://www.huangchengdu.com/javascripts/screen.js'
        }],
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
        // color: '#04acf7',
        // height: '4px',
        // failedColor: 'red'
        // loading: '~/components/loading.vue'
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
    }],
    serverMiddleware: [
        // body-parser middleware
        // bodyParser.json(),
        // session middleware
        // session({
        //   secret: 'super-secret-key',
        //   resave: false,
        //   saveUninitialized: false,
        //   cookie: { maxAge: 60000 }
        // }),
        // Api middleware
        // We add /api/login & /api/logout routes
        // '~/api'
    ],
    render: {
        bundleRenderer: {
            cache: __webpack_require__(35)({
                max: 1000,
                maxAge: 1000 * 60 * 15
            })
        }
    }
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("lru-cache");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {"name":"juejin","version":"1.0.0","description":"Nuxt.js project","author":"huangchengdu <394042583@qq.com>","private":true,"config":{"nuxt":{"port":"3002"}},"scripts":{"dev":"cross-env NODE_ENV=development backpack dev","build":"cross-env NODE_ENV=production nuxt build && backpack build","start":"cross-env NODE_ENV=production pm2 start build/main.js","generate":"cross-env NODE_ENV=production nuxt generate","nuxt":"cross-env NODE_ENV=development nuxt","nuxt-build":"cross-env NODE_ENV=production nuxt build","nuxt-start":"cross-env NODE_ENV=production nuxt start","lint":"cross-env NODE_ENV=development eslint --ext .js,.vue --ignore-path .gitignore .","precommit":"cross-env NODE_ENV=development npm run lint"},"dependencies":{"axios":"^0.17.1","backpack-core":"^0.4.3","body-parser":"^1.18.2","cookie-parser":"^1.4.3","cross-env":"^5.1.1","crypto-js":"^3.1.9-1","express":"^4.16.2","express-formidable":"^1.0.0","express-mysql-session":"^1.2.3","express-session":"^1.15.6","express-winston":"^2.4.0","jade":"^1.11.0","less":"^2.7.3","less-loader":"^4.0.5","marked":"^0.3.7","multer":"^1.3.0","mysql":"^2.15.0","nuxt":"^1.0.0-rc11","sha1":"^1.1.1","vue-notification":"^1.3.4","winston":"^2.4.0"},"devDependencies":{"babel-eslint":"^7.2.3","eslint":"^4.3.0","eslint-config-standard":"^10.2.1","eslint-loader":"^1.9.0","eslint-plugin-html":"^3.1.1","eslint-plugin-import":"^2.7.0","eslint-plugin-node":"^5.1.1","eslint-plugin-promise":"^3.5.0","eslint-plugin-standard":"^3.0.1","lru-cache":"^4.1.1","xss":"^0.3.7"}}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map