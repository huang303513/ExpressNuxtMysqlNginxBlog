<template>
	<div class="index">
		<form class="ui form segment" method="post" @submit.prevent="submit">
			<h1 class="title">注册</h1>
			<div class="field required">
				<label>用户名：</label>
				<input placeholder="用户名" type="text" v-model="user.name" name="name">
			</div>
			<div class="field required">
				<label>密码：</label>
				<input placeholder="密码" type="password" v-model="user.password" name="password">
			</div>
			<div class="field required">
				<label>重复密码：</label>
				<input placeholder="重复密码" type="password" v-model="user.repassword" name="repassword">
			</div>
			<div class="field required">
				<label>性别：</label>
				<div class="ui compact selection dropdown" tabindex="0">
					<select v-model="user.gender" name="gender">
				          <option value="m">男</option>
				          <option value="f">女</option>
				          <option value="x">保密</option>
				        </select>
				</div>
			</div>
			<div class="field required">
				<label>头像：</label>
				<input type="file" @change="getFile($event)" name="avatar" accept="image/*">
			</div>
			<div class="field required">
				<label>个人简介：</label>
				<textarea name="bio" rows="2" v-model="user.bio"></textarea>
			</div>
			<div class="footer">
				<input type="submit" class="ui button fluid" value="注册">
			</div>
		</form>
	</div>
</template>

<script>
	import axios from "axios";
	import userLoginUtil from "~/util/userLoginUtil.js";
	export default {
		layout: 'regist',
		components: {},
		data() {
			return {
				user: {
					name: null,
					password: null,
					repassword: null,
					gender: null,
					avatar: null,
					bio: ""
				}
			}
		},
		mounted() {},
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
				this.$showLoading();
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
				this.$hiddenLoading();
				var user;
				if (result.data && !result.data.err && result.data.user) {
					user = result.data.user;
					userLoginUtil.setLoginedUser(user);
					history.go(-1);
				} else {
					alert(result.data.err && result.data.err.message || "注册失败");
				}
				console.log(result);
			}
		}
	};
</script>

<style lang="less" scoped>
	@import "~assets/less/define.less";
	.index {
		position: relative; // background-color: brown;
		width: 100%;
		max-width: 60rem;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
		font-size: 1rem;
		form {
			padding: 2rem 5rem 5rem;
			.title {
				font-size: 1.3rem;
				text-align: left;
				margin-bottom: 1rem;
			}
			.field {
				display: flex;
				padding: 2rem 0;
				border-bottom: 1px solid #f1f1f1;
				border-top: 1px solid #f1f1f1;
				&:first-of-type {
					border-top: 1px solid #f1f1f1;
				}
				label {
					display: inline-block;
					width: 6rem;
				}
				input,
				textarea {
					flex: 1
				}
				textarea {
					border: 1px solid #e9e9e9;
					padding: .7rem;
					&:focus {
						border: 1px solid @defaultBlue;
					}
				}
				.upload {
					display: flex;
					.header {
						flex: 1;
						width: 5rem;
						height: 5rem;
					}
				}
			}
			.footer {
				margin-top: 1rem;
				float: right;
				.button {
					display: inline-block;
					height: 3rem;
					width: 8rem;
					line-height: 3rem;
					text-align: center;
					font-size: 1rem;
					font-weight: 200;
					color: #ffffff;
					background: @defaultBlue;
					box-sizing: content-box;
					margin: 0;
					border-radius: .2rem;
				}
			}
		}
	}
</style>

