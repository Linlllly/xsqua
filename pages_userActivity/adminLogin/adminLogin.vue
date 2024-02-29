<template>
	<view class="login-bg">
		<image class="img-a" src="https://zhoukaiwen.com/img/loginImg/bg1.png"></image>
		<view class="t-login">
			<view class="t-b">登 录</view>
			<form class="cl">
				<view class="t-a">
					<u--input
						clearable
						v-model="phone"
						placeholder="请输入账号"
						prefixIcon="account"
						prefixIconStyle="font-size: 30px;color: #ff939b"
						maxlength="11"
						shape="circle"
					></u--input>
				</view>
				<view class="t-a">
					<u--input
						type="password"
						clearable
						v-model="pwd"
						placeholder="请输入密码"
						prefixIcon="lock"
						prefixIconStyle="font-size: 30px;color: #ff939b"
						shape="circle"
						maxlength="12"
					></u--input>
				</view>

				<button @tap="awaitLogin()">登 录</button>
			</form>
		</view>

		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/bg2.png"></image>
	</view>
</template>
<script>
import { phoneLogin } from '@/api/adminLogin.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { myRoom, selectRoom } from '@/api/loginSelect.js';

const app = getApp();

export default {
	data() {
		return {
			phone: '', //手机号码
			pwd: '' //密码
		};
	},
	onLoad() {},
	computed: {
		...mapState(['myWs'])
	},
	watch: {
		myWs: {
			immediate: false,
			handler(news, olds) {
				uni.hideLoading();
				this.goUserOrAreaSelect();
			}
		}
	},
	methods: {
		...mapMutations(['updateToken', 'logout', 'updateHouse']),
		//当前登录按钮操作
		awaitLogin() {
			uni.showLoading({
				title: '数据加载中...',
				mask: true
			});
			this.login();
		},
		async login() {
			let res = await phoneLogin({ mobile: this.phone, password: this.pwd });
			console.log('管理员登录');
			console.log(res);
			// uni.hideLoading();
			if (res.code === 0) {
				this.logout();
				uni.removeStorageSync('openId');
				uni.setStorageSync('token', res.token);
				this.updateToken();
				app.updateWs();
			} else {
				uni.hideLoading();
				uni.showToast({
					title: '密码错误',
					
				});
			}
		},
		//跳转去哪里
		async goUserOrAreaSelect() {
			// 跳转之前看看有没有房子 并保存状态 然后根据状态去不同的地方

			let res = await myRoom();
			console.log('请求有没有房间');
			console.log(res);
			if (res.code === 500) {
				//没房子
				uni.navigateTo({
					url: '../../pages/areaSelect/areaSelect'
				});
			} else if (res.code === 0) {
				//有房子 保存状态
				uni.setStorageSync('house', true);
				this.updateHouse();
				uni.switchTab({
					url: '../../pages/user/user'
				});
			}
		}
	}
};
</script>
<style lang="less" scoped>
.img-a {
	width: 100%;
}
.img-b {
	width: 100%;
	height: 45px;
	bottom: 0;
	position: absolute;
}
.login-bg {
	width: 100%;
	height: 100vh;
	background: linear-gradient(to bottom, #ff6a9a, #fe7d76);
	box-sizing: border-box;
}

.t-login {
	width: 660rpx;
	padding: 55rpx;
	margin: 0 auto;
	font-size: 28rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	position: relative;
	margin-top: -100rpx;
	box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.15);
	z-index: 9;
	box-sizing: border-box;
}
.t-login button {
	font-size: 28rpx;
	background: linear-gradient(to right, #ff8f77, #fe519f);
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	margin-top: 60rpx;
}

.t-login input {
	padding: 0 20rpx 0 120rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	background: #f6f6f6;
	border: 1px solid #f6f6f6;
	font-size: 28rpx;
	border-radius: 50rpx;
}

.t-login .t-a {
	position: relative;
	margin: 40rpx 0;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	left: 40rpx;
	top: 28rpx;
}
.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #ff939b;
	font-weight: bold;
	margin: 0 0 50rpx 20rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-f {
	text-align: center;
	margin: 200rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #aeaeae;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
