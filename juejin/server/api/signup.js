/*
 * @Author: huangchengdu
 * @Date:   2017-01-13 21:55:28
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 11:22:20
 */
let fs = require('fs');
let path = require('path');
let sha1 = require('sha1');
let express = require('express');
let router = express.Router();
import UserModel from '../models/users';
import {Buffer} from 'buffer';
let checkNotLogin = require('../middlewares/check').checkNotLogin;
let formatDate = require('../lib/util.date').formatDate;
var multer = require('multer')
var upload = multer();
import getConfig from '../../config';
let config = getConfig(process.env.NODE_ENV);

function getUploadPath(avatar) {
    if (config.devEnv) {
        return path.join(__dirname,config.uploadPath,avatar);
    } else {
        return config.uploadPath + avatar;
    }
}

// POST /signup 用户注册
router.post('/', upload.single('avatar'), function (req, res, next) {
    let name;
    let gender;
    let bio;
    let password;
    let repassword;
    let newPath;
    try {
        var timestamp = Date.now();
        if (!req.file) {
            throw new Error('请添加图片');
        }
        var type = req.file.mimetype.split('/')[1];
        var avatar = timestamp + "." + type;
        newPath = getUploadPath(avatar);
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
        fs.unlink(newPath);
        res.json({
            err: {message:e.message||"校验出错"},
            user: null
        });
    }
    // 明文密码加密
    password = sha1(password);

    const dateMap = formatDate(new Date(), 'typeDictionary');
    const date = dateMap.yearMonthDay + " " + dateMap.time;
    // 待写入数据库的用户信息
    let user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar || "",
        created_at: date
    };

    UserModel.create(user).then(user => {
        req.session.user = user;
        res.json({
            err: null,
            user: user
        });
    }).catch(err => {
        fs.unlink(newPath);
        if (err.err) {
            err = err.err;
        }
        if (err && err.sql) {
            err.sql = "";
        }
        // 用户名被占用则跳回注册页，而不是错误页
        if (err.sqlMessage && (err.sqlMessage.indexOf('Duplicate entry') >= 0)) {
            res.json({
                err: {message: "用户名被占用"},
                user: null
            });
        } else {
            res.json({err: err,user: null});
        }
    });
});

export default router;
