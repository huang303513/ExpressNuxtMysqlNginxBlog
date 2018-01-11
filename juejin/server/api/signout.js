/*
* @Author: huangchengdu
* @Date:   2017-01-13 21:56:39
* @Last Modified by:   huangchengdu
* @Last Modified time: 2017-01-14 11:51:43
*/

let express = require('express');
let router = express.Router();
let checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function(req, res, next) {
   // 清空 session 中用户信息
  //  console.log("========request session====",req.session);
  req.session.user = null;
  // res.session = req.session;
  // console.log("====out=======headers========",req.headers);
  // console.log("========response session====",req.session);
  // res.cookie('user',null);
  res.json({err:null,code:200});
  //req.flash('success', '登出成功');
  // 登出成功后跳转到主页
  // res.redirect('/posts');
});

export default router;