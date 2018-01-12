<template>
	<div class="index">
		<form class="ui form segment" method="post" @submit.prevent="submit">
			<div class="field required">
				<label>用户名</label>
				<input placeholder="用户名" type="text" v-model="user.name" name="name">
			</div>
			<div class="field required">
				<label>密码</label>
				<input placeholder="密码" type="password" v-model="user.password" name="password">
			</div>
			<div class="field required">
				<label>重复密码</label>
				<input placeholder="重复密码" type="password" v-model="user.repassword" name="repassword">
			</div>
			<div class="field required">
				<label>性别</label>
				<div class="ui compact selection dropdown" tabindex="0"><select name="gender">
			          <option value="m">男</option>
			          <option value="f">女</option>
			          <option value="x">保密</option>
			        </select><i class="dropdown icon"></i>
					<div class="text">男</div>
					<div class="menu transition hidden" tabindex="-1">
						<div class="item active selected" data-value="m">男</div>
						<div class="item" data-value="f">女</div>
						<div class="item" data-value="x">保密</div>
					</div>
				</div>
			</div>
			<div class="field required">
				<label>头像</label>
				<input type="file" @change="getFile($event)" name="avatar" accept="image/*">
			</div>
			<div class="field required">
				<label>个人简介</label>
				<textarea name="bio" rows="5" v-model="user.bio"></textarea>
			</div>
			<input type="submit" class="ui button fluid" value="注册">
		</form>
	</div>
</template>

<script>
	import axios from "axios";
	import userLoginUtil from "~/util/userLoginUtil.js";
	export default {
		layout: 'regist',
		components: {},
		// async asyncData() {
		// 	let pageIndex = 0;
		// 	let pageSize = 3;
		// 	var url = "/api/posts?" + "pageIndex=" + pageIndex + "&pageSize=" + pageSize;
		// 	let result = await axios.get(url).catch(error => {
		// 		console.log("===============error==========", error);
		// 	});
		// 	return {
		// 		posts: result && result.data || [],
		// 		pageIndex: pageIndex,
		// 		pageSize: pageSize
		// 	};
		// },
		data() {
			return {
				user: {
					name: (new Date()).toDateString(),
					password: '123456',
					repassword: '123456',
					gender: "x",
					avatar: null,
					bio: "注册测试"
				}
			}
		},
		mounted() {
			//this.requestData();
			// alert("hehe");
			//document.location.href = document.location.href + "/posts";
			// document.getElementById("signupForm").ajaxSubmit(function(message) { 
			// 		console.log("=====叶叶====",message);
			// });
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
			},
			getFile(event) {
				this.user.avatar = event.target.files[0];
			},
			async submit() {
				event.preventDefault();
				var url = "/api/signup";
	
				let formData = new FormData();
				formData.append('name', this.user.name);
				formData.append('password', this.user.password);
				formData.append('repassword', this.user.repassword);
				formData.append('gender', this.user.gender);
				formData.append('avatar', this.user.avatar);
				formData.append('bio', this.user.bio);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
				// console.log("url==========>", url);
				let result = await axios.post(url, formData, config).catch(error => {
					console.log("===============error==========", error);
				});
				var user;
				if (result.data && !result.data.err && result.data.user) {
					user = result.data.user;
					userLoginUtil.setLoginedUser(user);
					// this.$notify({
					// 	group: 'foo',
					// 	title: 'Important message',
					// 	text: 'Hello user! This is a notification!'
					// });
				} else {}
				console.log(result);
			}
		}
	};
</script>

<style lang="less" scoped>
	.index {
		position: relative; // background-color: brown;
	}
</style>

