<template>
	<div>
		<ul>
			<li v-for="(post,index) in posts" :key="post._id">
				<a class="li-title">{{post.title}}</a>
				<p class="li-subtitle">
					<span>{{"作者:"}}</span>
					<span class="li-subtitle-author">
										<strong>{{post.author.name}}</strong>
										<div class="author-hover">
											<img class="author-hover-img" :src="`img/${post.author.avatar}`"/>
											<div class="author-hover-title">
												<p class="author-hover-title-name">{{post.author.name}}</p>
												<p class="author-hover-title-bio">{{post.author.bio}}</p>
											</div>
										</div>
						</span>
					<span>{{" 创建日期:" + post.created_at + " 访问次数:" + post.pv + " 评论数:" + post.commentsCount}}</span>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			posts: {
				type: Array,
				required: true
			}
		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	@import "~assets/less/define.less";
	li {
		border-bottom: 1px solid @defaultBGColor;
		background: #fff;
		border-radius: 2px;
		padding: 1.2rem 1rem .5rem; // height: 0px;
		box-shadow: 0 0 15px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, 0.15);
	}
	
	li:hover {
		background-color: @defaultBGColor;
	}
	
	.li-title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-family: PingFangSC-Semibold;
		font-size: 1.4rem;
		color: #222222;
		letter-spacing: 0;
	}
	
	.li-title:hover {
		text-decoration: underline;
	}
	
	.li-subtitle {
		position: relative;
		margin-top: 1rem;
		font-family: PingFangSC-Regular;
		font-size: .7rem;
		color: #999999;
	}
	
	.li-subtitle-author {
		&:hover {
			font-size: .9rem;
			color: #222222;
			text-decoration: underline;
			.author-hover {
				background-color: white;
				z-index: 1000;
				position: absolute;
				top: -100px;
				height: 70px;
				display: block;
				border: 1px solid @defaultBGColor;
				padding: 5px;
				.author-hover-img {
					position: absolute;
					width: 60px;
					height: 60px;
				}
				.author-hover-title {
					position: relative;
					flex-direction: column;
					overflow: hidden;
					margin-left: 70px;
					.author-hover-title-name {
						font-family: PingFangSC-Semibold;
						font-size: 1.1rem;
						color: #222222;
					}
					.author-hover-title-big {
						font-family: PingFangSC-Regular;
						font-size: .7rem;
						color: #999999;
					}
				}
			}
		}
		.author-hover {
			display: none;
		}
	}
</style>



