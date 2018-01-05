<template>
	<div class="bodyClass">
		<div class="rootDiv">
			<article class="rootClass" v-html="post.content">
			</article>
		</div>
	</div>
</template>

<script>
	import Header from "~/components/Header.vue";
	import PostCell from "~/components/PostCell.vue";
	import axios from "axios";
	export default {
		components: {
			Header,
			PostCell
		},
		// data() {
		//   return {
		//     posts: []
		//   };
		// },
		async asyncData({
			params
		}) {
			console.log("params==================>", params);
			var url = "/api/posts/" + params.id;
			console.log("url==========>", url);
			let result = await axios.get(url).catch(error => {
				console.log("===============error==========", error);
			});
			console.log("post=========>", JSON.stringify(result.data));
			return {
				post: result.data
			};
		}
	};
</script>

<style lang="less" scoped>
	@import "~assets/less/post.less";
</style>

