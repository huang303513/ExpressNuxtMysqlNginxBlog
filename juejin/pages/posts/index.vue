<template>
	<div class="index">
		<div>
			<post-cell :posts="posts"></post-cell>
		</div>
		<div class="loadMore" @click="loadMorePosts">{{hasMore?'加载更多':'已经加载完了'}}</div>
	</div>
</template>

<script>
	import PostCell from "~/components/PostCell.vue";
	import axios from "axios";
	import userLoginUtil from "~/util/userLoginUtil.js";
	export default {
		components: {
			PostCell
		},
		// async asyncData() {
		// 	var url = "/api/posts?pageIndex=0";
		// 	let result = await axios.get(url).catch(error => {
		// 		console.log("===============error==========", error);
		// 	});
		// 	return {
		// 		posts: result && result.data || [],
		// 		hasMore: (result && (result.data.length == 10)) ? true : false
		// 	};
		// },
		data() {
			return {
				posts: [],
				hasMore: true,
				pageIndex: 0
			}
		},
		mounted() {
			this.$eventHub.$on("REFRESHPOSTS", params => {
				alert("meme");
			});
			var self = this;
			var data = userLoginUtil.getSessionData(function(data) {
				try {
					data = JSON.parse(data);
					// console.log(data)
					if (data && data.posts) {
						console.log("========sessionData===========", data);
						self.posts = data.posts;
						self.hasMore = data.hasMore;
						self.pageIndex = data.pageIndex;
					}
				} catch (error) {
					self.requestData();
				}
	
			});
		},
		methods: {
			loadMorePosts() {
				this.requestData();
			},
			async requestData() {
				if (!this.hasMore) {
					return;
				}
				this.$showLoading();
				var url = "/api/posts?" + "pageIndex=" + this.pageIndex;
				let result = await axios.get(url).catch(error => {
					console.log("===============error==========", error);
				});
				this.$hiddenLoading();
				if (result && result.data) {
					this.posts = this.posts.concat(result.data);
					this.pageIndex++;
				}
				if (result.data && (result.data.length == 10)) {
					this.hasMore = true;
				} else {
					this.hasMore = false;
				}
				userLoginUtil.setSessionData({
					posts: this.posts,
					hasMore: this.hasMore,
					pageIndex: this.pageIndex
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.index {
		position: relative;
		// background-color: brown;
	}
	
	.loadMore {
		width: 100%;
		margin-top: .5rem;
		text-align: center;
		font-size: 1.2rem;
		background-color: white;
		height: 3rem;
		line-height: 3rem;
	}
</style>

