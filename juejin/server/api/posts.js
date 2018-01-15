/*
 * @Author: huangchengdu
 * @Date:   2017-01-13 21:41:07
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-14 14:53:01
 */

let express = require('express');
let router = express.Router();
// let PostModel = require('../models/posts');
import PostModel from '../models/posts';
var xss = require('xss');
import {
	postToSQLUpdate
} from '../../util/assist';
// let CommentModel = require('../models/comments');
import CommentModel from '../models/comments';
let checkLogin = require('../middlewares/check').checkLogin;

//GET /posts 所有用户或者特定用户的文章页
// eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
	console.log("=====posts===request session====",req.query);
	let authorId = req.query && req.query.author;
	let pageIndex = req.query && req.query.pageIndex;
	//console.log("queyr=========", req.query);
	// return PostModel.getPosts(authorId);
	//Promise.resolve("23423");
	PostModel.getPosts(authorId,pageIndex).then(posts => {
		// res.render('posts', {
		//     posts: posts
		// });
		//console.log("============posts====================",posts);
		// res.header('ETag', null);
		// delete res.header.ETag;
		res.json(posts);
		//return Promise.resolve(posts);
	}).catch(error => {
		res.json(error)
	});
});

// GET /posts/create 发表文章页
// router.get('/create', checkLogin, function (req, res, next) {
// 	res.render('create');
// });

// POST /posts 发表一篇文章
router.post('/create', checkLogin, function (req, res, next) {
	let author = req.session.user;
	// console.log("================",req.body);
	let title = req.body.title;
	let content = req.body.content;
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
	   res.json({err:{message:e.message||"发布失败"},post:null});
	}
	let post = {
		author: author,
		title: title,
		content: content,
		pv: 0
	};
	// console.log("+++++++++++++++++++++---------",post);
	PostModel.create(post).then(post => {
		// req.flash('success', '发表成功');
		// console.log("+++++++++++++++++++++",post);
		// 发表成功后跳转到该文章页
		// res.redirect(`/posts/${post._id}`);
		res.json({err:null,post:post});
	}).catch(e =>{
		res.json({err:{message:e.message||"添加出错"},post:null});
	});
});

var excludeSpecial = function(s) {  
    // 去掉转义字符  
    s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');  
    // 去掉特殊字符  
    s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/);  
    return s;  
 }; 

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
	// console.log("=====postsid===request session====",req.session.user);
	let postId = req.params.postId;
	Promise.all([
		PostModel.getPostById(postId), //获取文章
		CommentModel.getComments(postId), //获取评论
		PostModel.incPv(postId) //添加访问次数
	]).then(result => {
		let post = result[0];
		let comments = result[1];
		// console.log("comments============",comments);
		// post.content = xss(post.content);
		post.content = post.content.replace("<script>","script");
		post.content = post.content.replace("<iframe>","iframe");
		// // post.content = post.content.replace("$-_.+!*'()","'$-_.+!*'()'");
		// post.content = excludeSpecial(post.content);
		res.render('index', {mdContent: post.content},function(err,result) {

			// console.log("result====",result);
			// post.content = xss(result);
			post.content = result;
			res.json({post,comments});
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
	}).catch(error => {
		res.json(error)
	});
});

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
	let postId = req.params.postId;
	let author = req.session.user._id;

	PostModel.getRawPostById(postId)
		.then(function (post) {
			if (!post) {
				throw new Error('该文章不存在');
			}
			if (author.toString() !== post.author._id.toString()) {
				throw new Error('权限不足');
			}
			res.render('edit', {
				post: post
			});
		})
		.catch(next);
});

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
	let postId = req.params.postId;
	let author = req.session.user;
	let title = req.fields.title;
	let content = req.fields.content;

	PostModel.updatePostById({
		title: title,
		content: content,
		author: JSON.stringify(author),
		postId: postId
	}).then(result => {
		req.flash('success', '编辑文章成功');
		// 编辑成功后跳转到上一页
		res.redirect(`/posts/${postId}`);
	}).catch(next);
});

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
	let postId = req.params.postId;
	PostModel.delPostById(postId)
		.then(function () {
			req.flash('success', '删除文章成功');
			// 删除成功后跳转到主页
			res.redirect('/posts');
		})
		.catch(next);
});

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function (req, res, next) {
	let author = req.session.user;
	let postId = req.params.postId;
	let content = req.body.content;
	let comment = {
		author: author,
		postId: postId, //文章id
		content: content
	};
	// console.log("==============comment=============",comment);
	// return res.json(comment);
	CommentModel.create(comment)
		.then(result => {
			// req.flash('success', '留言成功');
			// 留言成功后跳转到上一页
			// res.redirect('back');
			CommentModel.getComments(postId).then(result =>{
				res.json({err:null,comments:result});
			}).catch(err =>{
				res.json({err:{message:"获取评论失败"},comments:null});
			});
		}).catch(err => {
			res.json({err:{message:"添加评论失败"},comments:null});
		});
});

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function (req, res, next) {
	let commentId = req.params.commentId;
	let postId = req.params.postId;
	CommentModel.delCommentById(commentId, postId)
		.then(result => {
			req.flash('success', '删除留言成功');
			// 删除成功后跳转到上一页
			res.redirect('back');
		})
		.catch(next);
});

export default router;
