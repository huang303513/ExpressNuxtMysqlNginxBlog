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
	export default {
		components: {
			PostCell
		},
		async asyncData() {
			var url = "/api/posts?pageIndex=0";
			let result = await axios.get(url).catch(error => {
				console.log("===============error==========", error);
			});
			return {
				posts: result && result.data || [],
				hasMore: (result && (result.data.length == 10)) ? true : false
			};
		},
		data() {
			return {
				posts: [],
				hasMore: false,
				pageIndex: 1
			}
		},
		mounted() {
			//this.requestData();
			// alert("hehe");
			//document.location.href = document.location.href + "/posts";
			this.$eventHub.$on("REFRESHPOSTS", params => {
				alert("meme");
				// this.loginBoxState = "showLoginBox";
				// alert(JSON.stringify(params));
				// self.requestData();
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
				// this.$eventHub.$emit("SHOWLOADING", {
				// 	name: "参数"
				// });
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

