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
	// import userLoginUtil from "~/util/userLoginUtil.js";
	export default {
		components: {
			PostCell
		},
		data() {
			return {
				posts: [],
				hasMore: true,
				pageIndex: 0
			}
		},
		async asyncData() {
			var posts;
			var hasMore;
			var pageIndex = 0;
			var url = "/api/posts?" + "pageIndex=0";
			let result = await axios.get(url).catch(error => {});
			if (result && result.data) {
				posts = result.data;
			}
			if (result.data && (result.data.length == 10)) {
				hasMore = true;
			} else {
				hasMore = false;
			}
			return {
				posts: posts,
				hasMore: hasMore,
				pageIndex: pageIndex
			};
		},
		mounted() {
			try {
				let data = this.$userLoginUtil.getSessionData();
				data = JSON.parse(data);
				if (data && data.posts) {
					this.posts = data.posts;
					this.hasMore = data.hasMore;
					this.pageIndex = data.pageIndex;
				}
			} catch (error) {
				this.requestData();
			}
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
					if (this.pageIndex == 0) {
						this.posts = result.data;
					}else{
						this.posts = this.posts.concat(result.data);
					}
					this.pageIndex++;
				}
				if (result.data && (result.data.length == 10)) {
					this.hasMore = true;
				} else {
					this.hasMore = false;
				}
				this.$userLoginUtil.setSessionData({
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

