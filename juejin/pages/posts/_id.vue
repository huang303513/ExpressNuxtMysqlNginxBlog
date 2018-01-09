<template>
	<div>
		<div class="postHeader">
			<div class="author-hover">
				<!-- <strong>{{post.author}}</strong> -->
				<img class="author-hover-img" :src="`/img/${post.author.avatar}`" />
				<div class="author-hover-title">
					<p class="author-hover-title-name">{{post.author.name}}|{{post.author.gender=='m'?"男":"女"}}</p>
					<p class="author-hover-title-bio">{{post.author.bio}}</p>
				</div>
			</div>
			<p class="title">{{post.title}}</p>
			<p class="info">{{" 创建日期:" + post.created_at + " 访问次数:" + post.pv + " 评论数:" + post.commentsCount}}</p>
		</div>
		<article v-html="post.content"></article>
		<div class="comments">
			<p class="comments-pl">评论</p>
			<div class="comment-box">
				<textarea></textarea>
				<button>评论</button>
			</div>
			<ul>
				<li v-for="(comment,index) in comments">
					<img class="comment-img" :src="`/img/${comment.author.avatar}`">
					<div class="comment-info">
						<p class="comment-user">{{comment.author.name}}<span>  @{{comment.author.bio}}</span></p>
						<article class="comment-content" v-html="comment.content"></article>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		async asyncData({
			params
		}) {
			// console.log("params==================>", params);
			var url = "/api/posts/" + params.id;
			// console.log("url==========>", url);
			let result = await axios.get(url).catch(error => {
				console.log("===============error==========", error);
			});
			//console.log("post=========>", JSON.stringify(result.data));
			return {
				post: result.data && result.data.post,
				comments: (result.data && result.data.comments) || []
			};
		}
	};
</script>

<style lang="less" scoped>
	@import "~assets/less/define.less";
	.postHeader {
		// padding-left: 20px;
		width: 100%;
		border-bottom: 1px solid @defaultBGColor;
		background-color: white;
		.author-hover {
			padding-left: .7rem;
			padding-top: 5px;
			flex-direction: row;
			.author-hover-img {
				position: absolute;
				width: 3rem;
				height: 3rem;
				border-radius: 1.5rem;
			}
			.author-hover-title {
				position: relative;
				flex-direction: column;
				overflow: hidden;
				margin-left: 4rem;
				.author-hover-title-name {
					font-family: PingFangSC-Semibold;
					font-size: 1rem;
					color: #222222;
				}
				.author-hover-title-big {
					font-family: PingFangSC-Regular;
					font-size: .7rem;
					color: darkTextColor;
				}
			}
		}
		.title {
			// margin-top: 10px;
			text-align: center;
			font-size: 2rem;
		}
		.info {
			margin-top: 5px;
			text-align: center;
			margin-bottom: 5px;
			color: @darkTextColor;
		}
	}
	.comments {
		margin-top: 1rem;
		padding-bottom: 2rem;
		width: 100%;
		background-color: white;
		.comments-pl {
			// background-color: green;
			padding-top: .5rem;
			font-size: 1.5rem;
			text-align: center;
			color: @darkTextColor;
		}
		.comment-box {
			margin: .5rem 4.7rem .5rem .7rem; // min-height: 7rem;
			background-color: #f6f7f9;
			textarea {
				margin: .7rem 2rem;
				padding: .5px;
				resize: none;
				outline: none;
				display: block;
				box-shadow: none;
				border: 1px solid #ddd;
				border-radius: 2px;
				transition: border .3s;
				background-color: #fff;
				box-sizing: border-box;
			}
			button {
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-pack: end;
				-ms-flex-pack: end;
				justify-content: flex-end;
				margin-top: 1rem
			}
		}
		ul {
			li {
				list-style: none;
				border-bottom: 4px solid @defaultBGColor;
				border-block-start: 1.5rem;
				margin: 1.5rem 4.7rem 1.5rem .7rem;
				.comment-img {
					position: absolute;
					width: 2rem;
					height: 2rem;
					border-radius: 1rem;
				}
				.comment-info {
					// background-color: red;
					margin-left: 2.5rem;
					.comment-user {
						font-size: 1.2rem;
						span {
							color: @darkTextColor;
							font-size: 1rem;
						}
					}
					.comment-content {
						margin-top: .7rem;
						margin-bottom: .7rem;
						color: black;
					}
				}
			}
		}
	}
</style>


