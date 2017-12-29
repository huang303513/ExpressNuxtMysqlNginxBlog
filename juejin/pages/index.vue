<template>
	<div class="bodyClass">
		<header-comp></header-comp>
		<div class="rootClass">
			<post-cell :posts="posts"></post-cell>
		</div>
	</div>
</template>

<script>
	import Header from "~/components/Header.vue";
	import PostCell from "~/components/PostCell.vue";
	import axios from "axios";
	export default {
		components: {
			"header-comp": Header,
			PostCell
		},
		data() {
			return {
				name: "11"
			}
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
				var url = "/api/posts?" + "pageIndex=" + pageIndex + "&pageSize=" + pageSize;
				let result = await axios.get(url).catch(error => {
					console.log("===============error==========", error);
				});
				return result;
			}
		}
	};
</script>

<style lang="less" scoped>
	@import "~assets/less/posts.less";
</style>

