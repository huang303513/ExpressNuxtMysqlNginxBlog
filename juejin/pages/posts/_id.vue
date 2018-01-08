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
				post: result.data
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
		.title{
			// margin-top: 10px;
			text-align: center;
			font-size: 2rem;
		}
		.info{
			margin-top: 5px;
			text-align: center;
			margin-bottom: 5px;
			color: #999999;
		}
	}
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
				color: #999999;
			}
		}
	}
</style>


