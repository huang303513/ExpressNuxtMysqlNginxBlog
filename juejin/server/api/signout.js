/*
* @Author: huangchengdu
* @Date:   2017-01-13 21:56:39
* @Last Modified by:   huangchengdu
* @Last Modified time: 2017-01-14 11:51:43
*/

let express = require('express');
let router = express.Router();

// GET /signout 登出
router.get('/', function(req, res, next) {
  req.session.user = null;
  res.json({err:null,code:200});
});

export default router;