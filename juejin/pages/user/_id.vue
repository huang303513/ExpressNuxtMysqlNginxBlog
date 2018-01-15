<template>
	<div class="index">
		<post-cell :posts="posts"></post-cell>
	</div>
</template>

<script>
	import PostCell from "~/components/PostCell.vue";
	import axios from "axios";
	export default {
		components: {
			PostCell
		},
		async asyncData({
			params
		}) {
			var url = "/api/posts?author=" + params.id;
			let result = await axios.get(url).catch(error => {
				// console.log("===============error==========", error);
			});
			return {
				posts: result && result.data || []
			};
		},
		data() {
			return {
				posts: []
			}
		},
		mounted() {
			this.$eventHub.$on("REFRESHPOSTS", params => {
				alert("meme");
			});
		},
		methods: {
			async requestData() {
				var url = "/api/posts";
				let result = await axios.get(url).catch(error => {
					console.log("===============error==========", error);
				});
				this.posts = result && result.data || [];
			}
		}
	};
</script>

<style lang="less" scoped>
	.index {
		position: relative;
		// background-color: brown;
	}
</style>

