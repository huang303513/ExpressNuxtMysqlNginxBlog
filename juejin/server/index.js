import {
    Nuxt,
    Builder
} from 'nuxt'
import express from 'express'
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var winston = require('winston');
var expressWinston = require('express-winston');
import {
    startRouter
} from './api/index'
let nuxtConfig = require('../nuxt.config.js');
import getConfig from '../config';
var path = require('path');
var pkg = require('../package');
let config = getConfig(process.env.NODE_ENV);
var fs = require('fs');
import axios from 'axios';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


const app = express();

app.use(bodyParser.json());
// app.use(cookieParser());

// process.env.DEBUG = 'nuxt:*'


const host = 'localhost';
const port = config.port;

// console.log("===========dirname",__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('trust proxy', 1);
// session 中间件
app.use(session({
    key: config.session.key,
    secret: config.session.secret,
    cookie: {
        maxAge: config.session.maxAge,
        secure: false,
        sameSite:false,
    },
    store: new MySQLStore(config.dbConfig),
    connectionLimit: 10,
    expiration: 86400000,
    resave: true,
    saveUninitialized: true
}));

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
        })
    ]
}));

startRouter(app);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'server/logs/error.log'
        })
    ]
}));

// error page
// app.use(function (err, req, res, next) {
// 	res.render('error', {
// 		error: err
// 	});
// });

process.on('uncaughtException', (err) => {
    fs.writeSync(1, `Caught exception: ${err}\n`);
});
//promise错误未处理
process.on('unhandledRejection', (reason, p) => {
    console.log('未处理的==========================Rejection at:', p, 'reason:', reason);
});
//系统警告
process.on('warning', (warning) => {
    console.warn(warning.name); // Print the warning name
    console.warn(warning.message); // Print the warning message
    console.warn(warning.stack); // Print the stack trace
});

let nuxt = new Nuxt(nuxtConfig);
if (config.devEnv) {
    const builder = new Builder(nuxt);
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
