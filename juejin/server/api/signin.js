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

// GET /signin 登录页
// router.get('/', checkNotLogin, function(req, res, next) {
//     res.render('signin');
// });
// POST /signin 用户登录
router.post('/', function(req, res, next) {
    console.log("======到了======",req.body);
    let name = req.body.name;
    let password = req.body.password;
    console.log("========用户名和密码====",name,password);
    UserModel.getUserByName(name).then(user => {
        console.log("========用户====",JSON.stringify(user));
        // if (!user) {
        //     req.flash('error', '用户不存在');
        //     return res.redirect('back');
        // }
        // // 检查密码是否匹配
        // if (sha1(password) !== user.password) {
        //     req.flash('error', '用户名或密码错误');
        //     return res.redirect('back');
        // }
        // req.flash('success', '登录成功');
        // // 用户信息写入 session
        // delete user.password;
        // req.session.user = user;
        // // 跳转到主页
        // res.redirect('/posts');
        res.send(JSON.stringify(user));
    }).catch(next);
});

export default router;