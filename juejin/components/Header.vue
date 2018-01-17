<template>
	<header class="header">
		<loading :loading-options="loadingOptions"></loading>
		<alert :alert-options="alertOptions"></alert>
		<div class="header-div">
			<div class="header-div-span">
				<img class="header-img" :src="imgsrc">
				<p class="header-title">{{desc}}</p>
			</div>
			<div v-if="!hiddenRight" class="header-div-span">
				<a @click.prevent.stop="writeBlog">写文章</a>
				<a v-if="!hasLogined" @click.prevent.stop="goLogin">登录</a>
				<a v-if="!hasLogined" @click.prevent.stop="regist">注册</a>
				<a v-if="hasLogined" @click.prevent.stop="loginOut">退出</a>
			</div>
		</div>
		<div :class="['login-Box',loginBoxState]" @click="clickLoginBoxBG">
			<div class="box" @click.stop="">
				<div class="loginForm">
					<i @click="clickLoginBoxBG" class="iconfont icon-close"></i>
					<h1 class="title">登录</h1>
					<div class="from-control">
						<input type="text" v-model="name" placeholder="请输入用户名">
					</div>
					<div class="from-control">
						<input type="text" v-model="password" placeholder="请输入密码">
					</div>
					<a @click.stop="doLogin" class="button">登录</a>
					<div class="forget">
						<span>没有账号？ <b @click="regist">前往注册</b></span>
						<span>忘记密码</span>
					</div>
				</div>
			</div>
		</div>
		<!-- <notifications group="foo" /> -->
	</header>
</template>

<script>
	import axios from "axios";
	import loading from "~/components/loading.vue";
	import alert from "~/components/Alert.vue";
	export default {
		components: {
			"loading": loading,
			"alert":alert
		},
		data() {
			return {
				imgsrc: "/img/headIcon.png",
				desc: "亲爱的，欢迎光临",
				hasLogined: false,
				loginBoxState: "hiddenLoginBox",
				name: "",
				password: "",
				loadingOptions: {
					loading:false
				},
				alertOptions:{
                    show: false,
                    title:"通知",
                    message:"说明",
                    butttonTitle:"确定"
                }
			};
		},
		mounted() {
			this.$eventHub.$on("SHOWLOGIN", params => {
				this.loginBoxState = "showLoginBox";
			});
			this.$eventHub.$on("SHOWLOADING", params => {
				this.loadingOptions.loading = params.loading;
			});
			this.$eventHub.$on("SHOWALERT", params => {
				this.alertOptions.title = params.title||"通知";
				this.alertOptions.message = params.message;
				this.alertOptions.butttonTitle = params.title||"确定";
				this.alertOptions.show = true;
			});
			this.$eventHub.$on("HIDDENALERT", params => {
				this.alertOptions.show = false;
			});
			this.asyncLoginIofo();
		},
		props: {
			hiddenRight: {
				default: false
			}
		},
		methods: {
			clickLoginBoxBG() {
				this.loginBoxState = "hiddenLoginBox";
			},
			asyncLoginIofo() {
				let user = this.$userLoginUtil.getLoginedUser();
				if (user) {
					this.imgsrc = "/img/" + user.avatar;
					this.desc = user.bio;
					this.hasLogined = true;
				} else {
					this.imgsrc = "/img/headIcon.png";
					this.desc = "亲爱的，欢迎光临";
					this.hasLogined = false;
				}
			},
			writeBlog() {
				if (this.hasLogined) {
					window.location.href = "/posts/add";
				} else {
					this.loginBoxState = "showLoginBox";
				}
			},
			goLogin() {
				// location.href = "/login"
				this.loginBoxState = "showLoginBox";
			},
			async doLogin() {
				
				var url = "/api/login";
				if (!(this.name.length >= 1 && this.name.length <= 20)) {
					this.$showAlert('请输入正确的用户名');
					this.loginBoxState = "hiddenLoginBox";
					return;
				}
				if (this.password.length < 6) {
					this.$showAlert('请输入正确的密码');
					this.loginBoxState = "hiddenLoginBox";
					return;
				}
				this.$showLoading();
				let result = await axios({
					method: "post",
					url: url,
					data: {
						name: this.name,
						password: this.password
					}
				}).catch(error => {
					alert(error && error.message || "登陆出错");
					console.log("===============error==========", error);
				});
				this.$hiddenLoading();
				//console.log(result);
				var user;
				if (result.data && !result.data.err && result.data.user) {
					user = result.data.user;
					this.imgsrc = "/img/" + user.avatar;
					this.desc = user.bio;
					this.loginBoxState = "hiddenLoginBox";
					this.hasLogined = true;
					this.$userLoginUtil.setLoginedUser(user);
				} else {
					alert(result.data.errr.message);
				}
			},
			regist() {
				window.location.href = "/regist";
			},
			async loginOut() {
				this.$showLoading();
				var url = "/api/signout";
				let result = await axios.get(url).catch(error => {
					console.log("===============error==========", error);
				});
				this.$hiddenLoading();
				if (result.data && !result.data.err && (result.data.code == 200)) {
					this.$userLoginUtil.setLogout();
					this.asyncLoginIofo();
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "~assets/less/define.less";
	@import "~assets/less/iconfont.less";
	.header {
		background-color: white;
		position: fixed;
		z-index: 500;
		top: 0px;
		width: 100%;
		max-width: @defaultWidth;
		height: @headerHeight;
		margin-bottom: @headerHeight;
		line-height: @headerHeight;
		.header-div {
			justify-content: space-between;
			display: flex;
		}
		.header-div-span {
			align-items: center;
			display: flex;
		}
		.header-img {
			height: @headerHeight - 0.5;
			width: @headerHeight - 1;
			margin-left: 0.7rem;
		}
		.header-title {
			font-size: 1.2rem;
			margin-left: 0.7rem;
			color: @defaultDarkColor;
		}
		button,
		a {
			color: @defaultBlue;
			font-size: 1.2rem;
			margin-right: 0.7rem;
			padding: 5px 0px;
			cursor: pointer;
		}
	}
	
	.showLoginBox {
		display: block;
	}
	
	.hiddenLoginBox {
		display: none;
	}
	
	.login-Box {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);
		z-index: 1001;
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
		.box {
			position: relative;
			z-index: 1002;
			top: 50%;
			left: 50%;
			overflow: hidden;
			width: 25rem;
			height: 30rem;
			text-align: center;
			border-radius: 6px;
			background-color: rgba(255, 255, 255, 1);
			color: black;
			transform: translate3d(-50%, -50%, 0) scale(1);
			.loginForm {
				background-color: white;
				width: 80%;
				margin: 0 auto;
				.icon-close {
					float: right;
					opacity: 0.4;
					font-size: 1.3rem;
					cursor: pointer;
				}
				.title {
					font-size: 1.3rem;
					text-align: left;
				}
				.from-control {
					margin-bottom: 5px;
					input {
						width: 100%;
						border: 1px solid #e9e9e9;
						padding: .7rem;
						&:focus {
							border: 1px solid @defaultBlue;
						}
					}
				}
				.button {
					display: inline-block;
					height: 2rem;
					width: 100%;
					line-height: 2rem;
					text-align: center;
					font-size: 1rem;
					font-weight: 200;
					color: #ffffff;
					background: @defaultBlue;
					box-sizing: content-box;
					margin: 0;
				}
				.forget {
					font-size: .7rem;
					span:first-child {
						float: left;
						b {
							color: @defaultBlue;
							cursor: pointer;
						}
					}
					span:last-child {
						float: right;
						color: @defaultBlue;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>

