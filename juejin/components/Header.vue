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
			</div>
		</div>
		<div :class="['login-Box',loginBoxState]" @click="clickLoginBoxBG">
			<div class="box"  @click.stop="">
				<div class="loginForm">
					用户名:
					<input type="text" v-model="name"> 密码:
					<input type="text" v-model="password">
					<input  @click.stop="doLogin" type="button" value="登陆">
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import axios from "axios";
	export default {
		data() {
			return {
				imgsrc:"/img/headIcon.png",
				desc: "亲爱的，欢迎光临",
				hasLogined:false,
				loginBoxState: "hiddenLoginBox",
				name: null,
				password: null
			};
		},
		methods: {
			clickLoginBoxBG() {
				this.loginBoxState = "hiddenLoginBox";
			},
			writeBlog() {
				if (this.hasLogined) {
					
				}else{
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
					this.imgsrc =  "/img/" + user.avatar;
					this.desc = user.bio;
					this.loginBoxState = "hiddenLoginBox";
					this.hasLogined = true;
				}else{

				}
				console.log(JSON.stringify(user));
			},
			regist() {}
		}
	};
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

