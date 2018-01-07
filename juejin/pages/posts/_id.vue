<template>
	<div>
		<!-- <header-comp></header-comp> -->
		<!-- <div> -->
			<div class="test"></div>
			<article v-html="post.content">
			</article>
			<div class="test"></div>
		<!-- </div> -->
	</div>
</template>

<script>
	import Header from "~/components/Header.vue";
	import axios from "axios";
	export default {
		components: {
			"header-comp": Header,
		},
		// data() {
		//   return {
		//     posts: []
		//   };
		// },
		async asyncData({
			params
		}) {
			// console.log("params==================>", params);
			var url = "/api/posts/" + params.id;
			// console.log("url==========>", url);
			let result = await axios.get(url).catch(error => {
				console.log("===============error==========", error);
			});
			// console.log("post=========>", JSON.stringify(result.data));
			return {
				post: result.data
			};
		}
	};
</script>

<style lang="less" scoped>
	// @import "~assets/less/post.less";
	.test{
		width: 100%;
		height: 300px;
		background-color: red;
	}
</style>


