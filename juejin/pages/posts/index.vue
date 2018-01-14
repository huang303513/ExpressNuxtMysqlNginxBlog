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
		data(){
			return{
				posts:[],
				pageIndex:0,
				pageSize:3
			}
		},
		mounted(){
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
			async requestData() {
				let pageIndex = 0;
				let pageSize = 3;
				var url = "/api/posts?" + "pageIndex=" + pageIndex + "&pageSize=" + pageSize;
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

