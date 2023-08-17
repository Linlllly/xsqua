<template>
	<view class="pages"></view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { myRoom, selectRoom } from '@/api/loginSelect/loginSelect.js';
import { ip } from '@/api/api.js';
import { getUserInfoById } from '@/api/otherUser/otherUser.js';
const app = getApp();
export default {
	data() {
		return {
			//code
			code: '',
			//获取用户唯一标识
			openId: '',
			unionid: '',
			session_key: '',
			//搜索数据
			searchText: '',
			//token
			token: '',
			peopleList: [],
			popSearch: false,
			inviteCode: null,
			inviteContent: null,
			opt: null,
			isNew: null
		};
	},
	computed: {
		...mapState(['uid', 'myWs'])
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
	onLoad(option) {
		// if (option.q) {
		// 	this.inviteCode = decodeURIComponent(option.q)
		// 		.split('inviteCode=')[1]
		// 		.split('&&')[0];
		// 	this.inviteContent = decodeURIComponent(option.q).split('inviteContent=')[1];
		// }
		if (option.scene) {
			let scene = decodeURIComponent(option.scene);
			this.inviteCode = scene;
			this.getCode();
		} else {
			this.getCode();
		}
	},
	methods: {
		...mapMutations(['updateToken', 'updateHouse']),
		getCode() {
			uni.showLoading({
				title: '数据加载中...',
				mask: true
			});
			const p = new Promise(resolve => {
				uni.login({
					provider: 'weixin',
					success: res => {
						resolve(res.code);
					}
				});
			});
			p.then(code => {
				//请求后端
				uni.request({
					url: ip + '/app/user/miniWxlogin',
					method: 'POST',
					data: {
						code: code,
						inviteCode: this.inviteCode,
						inviteContent: this.inviteContent
					},
					success: cts => {
						console.log('获取token');
						console.log(cts);
						uni.setStorageSync('openId', cts.data.openId);
						if (cts.statusCode !== 200 || cts.data.code !== 0) {
							uni.hideLoading();
							uni.showToast({
								title: '服务器出错，正在尝试重连...',
								icon: 'none',
								duration: 2000
							});
							//显示失败
							setTimeout(() => {
								this.getCode();
							}, 2000);
							return;
						}
						this.token = cts.data.token;
						this.isNew = cts.data.isNew;
						uni.setStorageSync('token', cts.data.token);
						uni.setStorageSync('isNew', cts.data.isNew);
						this.updateToken();
						app.updateWs();
						if (this.inviteCode) {
							this.getGetUserInfoById();
						}

						return;
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							title: '微信登录出错，请尝试重新进入小程序...',
							icon: 'none',
							duration: 2000
						});
						// setTimeout(() => {
						// 	this.getCode();
						// }, 2000);
						return;
					}
				});
			});
		},
		//获取话
		//请求个人信息
		async getGetUserInfoById() {
			let res = await getUserInfoById({ uid: this.inviteCode });
			console.log('获取邀请留言');
			console.log(res);
			this.opt = JSON.stringify(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res,
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.inviteContent = res.result.inviteContent;
			if (this.isNew === 1) {
				uni.setStorageSync('inviteCode', this.inviteCode);
				uni.setStorageSync('inviteContent', this.inviteContent);
			}
		},

		//跳转去哪里
		async goUserOrAreaSelect() {
			// // 跳转之前看看有没有房子 并保存状态 然后根据状态去不同的地方
			// let res = await myRoom();
			// console.log('请求有没有房间');
			// console.log(res);
			// if (res.code === 500) {
			// 	//没房子
			// 	uni.navigateTo({
			// 		url: '../areaSelect/areaSelect'
			// 	});
			// } else if (res.code === 0) {
			// 	//有房子 保存状态
			// 	uni.setStorageSync('house', true);
			// 	this.updateHouse();

			uni.switchTab({
				url: '../user/user'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.bglon {
	position: absolute;
	width: 100%;
	height: 1480rpx;
	z-index: -5;
}
.search-box {
	width: 600rpx;
	height: 44rpx;
	opacity: 0.8;
	margin: 764rpx auto 10rpx auto;
	/deep/.u-search__action {
		color: #fff;
		font-size: 36rpx;
	}
}

.play-host {
	float: left;
	width: 276rpx;
	height: 310rpx;
	margin-top: 46rpx;
	margin-left: 56rpx;
	// background: url('../../static/playhost.png') no-repeat;
	background-size: 276rpx 310rpx;
}
.play-host2 {
	width: 374rpx;
	height: 114rpx;
	background: rgba(255, 255, 255, 0.3);
	border-radius: 72rpx;
	border: 2px solid #ffffff;
	font-size: 66rpx;
	line-height: 100rpx;
	margin-top: 120rpx;
	color: #fff;
}
.take-a-stroll {
	float: left;
	width: 276rpx;
	height: 310rpx;
	margin-top: 46rpx;
	margin-left: 74rpx;
	// background: url('../../static/takeastroll.png') no-repeat;
	background-size: 276rpx 310rpx;
}
.take-a-stroll2 {
	width: 374rpx;
	height: 114rpx;
	background: rgba(255, 255, 255, 0.3);
	border-radius: 72rpx;
	border: 2px solid #ffffff;
	font-size: 66rpx;
	line-height: 100rpx;
	margin-top: 44rpx;
	color: #fff;
}
.admin {
	width: 120rpx;
	height: 140rpx;
	// margin: 410rpx auto 0;
	margin: 72rpx auto 0;
	image {
		width: 100%;
		height: 100%;
	}
}
button::after {
	border: 0;
}
.people-item {
	display: flex;
	width: 100%;
	height: 130rpx;
	align-items: center;
	padding: 10rpx 0;
	box-sizing: border-box;
	border-bottom: 2rpx solid #a6a6a6;
	image {
		width: 90rpx;
		height: 90rpx;
		margin: 0 10rpx;
		border-radius: 50%;
	}
	.des-room {
		font-size: 32rpx;
	}
	.des-say {
		font-size: 28rpx;
		overflow: hidden !important;
		text-overflow: ellipsis !important; /* 超出部分省略号 */
		word-break: break-all !important; /* break-all(允许在单词内换行。) */
		display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
		-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
		-webkit-line-clamp: 1 !important; /* 显示的行数 */
	}
}
.no-more {
	margin: 30rpx auto;
	width: 100%;
	height: 280rpx;
	color: #767374;
	text-align: center;
}
/deep/.u-popup__content {
	border-radius: 30rpx 30rpx 0 0 !important;
}
.search-result {
	font-size: 40rpx;
	color: #e99300;
	text-align: center;
	margin: 30rpx 20rpx 10rpx;
	padding-bottom: 30rpx;
}
img {
	display: block;
}
</style>
