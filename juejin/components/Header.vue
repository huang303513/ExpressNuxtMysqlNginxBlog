<template>
	<header class="header">
		<div class="header-div">
			<div class="header-div-span">
				<img class="header-img" :src="imgsrc">
				<p class="header-title">{{desc}}</p>
			</div>
			<div class="header-div-span">
				<button @click="writeBlog" type="button">写文章</button>
				<button v-if="!hasLogined" @click="goLogin" type="button">登陆</button>
				<button v-if="!hasLogined" @click="regist" type="button">注册</button>
				<button v-if="hasLogined" @click="loginOut" type="button">退出</button>
			</div>
		</div>
		<div :class="['login-Box',loginBoxState]" @click="clickLoginBoxBG">
			<div class="box" @click.stop="">
				<div class="loginForm">
					用户名:
					<input type="text" v-model="name"> 密码:
					<input type="text" v-model="password">
					<input @click.stop="doLogin" type="button" value="登陆">
				</div>
			</div>
		</div>
		<notifications group="foo" />
	</header>
</template>

<script>
	import axios from "axios";
	import userLoginUtil from "~/util/userLoginUtil.js";
	export default {
		data() {
			return {
				imgsrc: "/img/headIcon.png",
				desc: "亲爱的，欢迎光临",
				hasLogined: false,
				loginBoxState: "hiddenLoginBox",
				name: null,
				password: null
			};
		},
		// async asyncData() {
		// 	let imgsrc = "/img/headIcon.png";
		// 	let	desc = "亲爱的，欢迎光临";
		// 	let	hasLogined = false;
		// 	let user = userLoginUtil.getLoginedUser();
		// 	if (user) {
		// 		imgsrc = "/img/" + user.avatar;
		// 		desc = user.bio;
		// 		// this.loginBoxState = "hiddenLoginBox";
		// 		hasLogined = true;
		// 	}else{
		// 		hasLogined = false;
		// 	}
		// 	return {
		// 		imgsrc:imgsrc,
		// 		desc:desc,
		// 		hasLogined:hasLogined
		// 	};
		// },
		mounted() {
			this.asyncLoginIofo();
		},
		props: {
			testname: {
				default: null
			}
		},
		methods: {
			clickLoginBoxBG() {
				this.loginBoxState = "hiddenLoginBox";
			},
			asyncLoginIofo() {
				let user = userLoginUtil.getLoginedUser();
				if (user) {
					this.imgsrc = "/img/" + user.avatar;
					this.desc = user.bio;
					// this.loginBoxState = "hiddenLoginBox";
					this.hasLogined = true;
				} else {
					this.imgsrc = "/img/headIcon.png";
					this.desc = "亲爱的，欢迎光临";
					this.hasLogined = false;
				}
			},
			writeBlog() {
				if (this.hasLogined) {} else {
					this.loginBoxState = "showLoginBox";
				}
			},
			goLogin() {
				// location.href = "/login"
				this.loginBoxState = "showLoginBox";
			},
			async doLogin() {
				var url = "/api/login";
				let result = await axios({
					method: "post",
					url: url,
					data: {
						name: "黄成都",
						password: "huang303513"
					}
				}).catch(error => {
					console.log("===============error==========", error);
				});
				console.log(result);
				var user;
				if (result.data && !result.data.err && result.data.user) {
					user = result.data.user;
					this.imgsrc = "/img/" + user.avatar;
					this.desc = user.bio;
					this.loginBoxState = "hiddenLoginBox";
					this.hasLogined = true;
					userLoginUtil.setLoginedUser(user);
					// this.$notify({
					// 	group: 'foo',
					// 	title: 'Important message',
					// 	text: 'Hello user! This is a notification!'
					// });
				} else {}
				console.log(JSON.stringify(user));
			},
			regist() {
				// console.log(this.$root);
				// this.testname = "详情页";
				// userLoginUtil.checkLogined();
				//this.$root.$loading.show = true;;
				//alert("dd" + this.$root.testname);
				// alert(this.$root.testname);
				window.location.href = "/regist";
			},
			async loginOut() {
				var url = "/api/signout";
				let result = await axios.get(url).catch(error => {
					console.log("===============error==========", error);
				});
				if (result.data && !result.data.err && (result.data.code == 200)) {
					userLoginUtil.setLogout();
					this.asyncLoginIofo();
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "~assets/less/define.less";
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
		button {
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
			background-color: rgba(255, 255, 255, 0.8);
			color: black;
			transform: translate3d(-50%, -50%, 0) scale(1);
			.loginForm {
				background-color: white;
			}
		}
	}
</style>

