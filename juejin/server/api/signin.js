/*
 * @Author: huangchengdu
 * @Date:   2017-01-13 21:54:40
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 12:14:32
 */

let sha1 = require('sha1');
let express = require('express');
let router = express.Router();
import UserModel from '../models/users';
let checkNotLogin = require('../middlewares/check').checkNotLogin;

// POST /signin 用户登录
router.post('/', function (req, res, next) {
    let name = req.body.name;
    let password = req.body.password;
    UserModel.getUserByName(name).then(user => {
        var err;
        if (!user) {
            err = {
                message: "用户名或者密码错误"
            }
        } else if (sha1(password) !== user.password) {
            err = {
                message: "用户名或者密码错误"
            }
        }
        req.session.user = user; 
        res.json({
            err: err,
            user: user
        });
    }).catch(next);
});

export default router;
