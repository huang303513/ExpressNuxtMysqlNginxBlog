<template>
	<div class="index">
		<form>
			<h1 class="title">注册</h1>
			<div class="field">
				<label>用户名：</label>
				<input placeholder="用户名" type="text" v-model="user.name" name="name">
			</div>
			<div class="field">
				<label>密码：</label>
				<input placeholder="密码" type="password" v-model="user.password" name="password">
			</div>
			<div class="field">
				<label>重复密码：</label>
				<input placeholder="重复密码" type="password" v-model="user.repassword" name="repassword">
			</div>
			<div class="field">
				<label>性别：</label>
				<div class="selection" tabindex="0">
					<select v-model="user.gender" name="gender">
							          <option value="m">男</option>
							          <option value="f">女</option>
							          <option value="x">保密</option>
							    </select>
				</div>
			</div>
			<div class="field">
				<label>头像：</label>
				<div class="upload-box">
					<input type="file" @change="getFile($event)" name="avatar" accept="image/*" class="upload">
					<div class="img">
						<img :src="imageUrl" alt="">
					</div>
					<div class="action-box">
						<span class="title">
				                            支持jpg、png等的图片
				                        </span>
						<button class="button" type="button">点击上传</button>
					</div>
				</div>
	
			</div>
			<div class="field">
				<label>个人简介：</label>
				<textarea name="bio" rows="2" v-model="user.bio"></textarea>
			</div>
			<div class="footer">
				<input type="button" @click.stop="submit" class="button" value="注册">
			</div>
		</form>
	</div>
</template>

<script>
	import axios from "axios";
	import imageUrl from '~/assets/img/default.jpg';
	// import userLoginUtil from "~/util/userLoginUtil.js";
	export default {
		layout: 'regist',
		components: {},
		data() {
			return {
				imageUrl: imageUrl,
				user: {
					name: null,
					password: null,
					repassword: null,
					gender: "m",
					avatar: null,
					bio: null,
				}
			}
		},
		mounted() {

		},
		activated(){
			// alert("heh");
		},
		beforeRouteEnter(to,from,next){
			next(vm =>{
				// this.imageUrl = imageUrl;
			});
		},
		methods: {
			getFile(event) {
				this.user.avatar = event.target.files[0];
				var file = this.user.avatar;
				var self = this;
				if (file) {
					var reader = new FileReader();
					reader.onload = (e) => {
						//图片url
						self.imageUrl = e.target.result;
					};
					reader.readAsDataURL(file);
				}
			},
			async submit() {
				var url = "/api/signup";
	
				try {
					if (!(this.user.name && this.user.name.length >= 1 && this.user.name.length <= 20)) {
						throw new Error('名字请限制在 1-10 个字符');
					}
					if (this.user.password && this.user.password.length < 6) {
						throw new Error('密码至少 6 个字符');
					}
					if (this.user.password !== this.user.repassword) {
						throw new Error('两次输入密码不一致');
					}
					if (['m', 'f', 'x'].indexOf(this.user.gender) === -1) {
						throw new Error('性别只能是 m、f 或 x');
					}
					if (!this.user.avatar) {
						throw new Error('图片不能为空');
					}
					if (!(this.user.bio && this.user.bio.length >= 1 && this.user.bio.length <= 30)) {
						throw new Error('个人简介请限制在 1-30 个字符');
					}
				} catch (e) {
					console.log("=========err=========", e, e.message);
					this.$showAlert(e.message || "请补全信息");
					return;
				}
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
				let result = await axios.post(url, formData, config).catch(error => {
					console.log("===============error==========", error);
				});
				this.$hiddenLoading();
				var user;
				if (result.data && !result.data.err && result.data.user) {
					user = result.data.user;
					this.$userLoginUtil.setLoginedUser(user);
					history.go(-1);
				} else {
					this.$showAlert(result.data.err && result.data.err.message || "注册失败");
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
				align-items: center;
				border-bottom: 1px solid #f1f1f1;
				&:first-of-type {
					border-top: 1px solid #f1f1f1;
				}
				&:nth-last-of-type(3) {
					padding: 1rem 0;
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
				.upload-box {
					display: flex;
					position: relative;
					.upload {
						position: absolute;
						z-index: 1;
						filter: opacity(0);
						height: 2rem;
						width: 8rem;
						bottom: 0;
						left: 6rem;
						cursor: pointer;
					}
					.img {
						flex: 0 0 5rem;
						width: 5rem;
						height: 5rem;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.action-box {
						margin-left: 1rem;
						.title {
							display: block;
							color: #909090;
							font-size: 1rem;
							margin-bottom: 1.5rem;
						}
						.button {
							display: inline-block;
							height: 2rem;
							width: 8rem;
							line-height: 2rem;
							text-align: center;
							font-size: 1rem;
							font-weight: 200;
							color: #ffffff;
							background: @defaultBlue;
							box-sizing: content-box;
							margin: 0;
							border-radius: .2rem;
							cursor: pointer;
						}
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

