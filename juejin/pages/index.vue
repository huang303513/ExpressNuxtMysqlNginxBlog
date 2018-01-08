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
		async asyncData() {
			let pageIndex = 0;
			let pageSize = 3;
			var url = "/api/posts?" + "pageIndex=" + pageIndex + "&pageSize=" + pageSize;
			let result = await axios.get(url).catch(error => {
				console.log("===============error==========", error);
			});
			return {
				posts: result && result.data || [],
				pageIndex: pageIndex,
				pageSize: pageSize
			};
		},
		methods: {
			async requestData() {
				let pageIndex = 0;
				let pageSize = 3;
				var url = "http:127.0.0.1:3002/api/posts?" + "pageIndex=" + pageIndex + "&pageSize=" + pageSize;
				let result = await axios.get(url).catch(error => {
					console.log("===============error==========", error);
				});
				return result;
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

