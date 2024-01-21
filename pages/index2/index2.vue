<template>
	<div class="pages">
		<!-- banner -->
		<div v-if="list1.length" class="banner-box">
			<u-swiper
				:list="list1"
				keyName="img"
				height="220rpx"
				:interval="5000"
				:duration="400"
				:circular="true"
				@click="goOwnPageOrThirdParty()"
			></u-swiper>
		</div>
		<takeLooks ref="takeLookComponent" filler="filler2" :type="2"></takeLooks>
		<button class="issue" @click="toTop"></button>
		<div class="reload">
			<u-icon name="../../../../static/reload.png" color="#000" size="34" label="换一换" labelPos="bottom" @click="reloadTake"></u-icon>
		</div>
		<div class="message">
			<div class="icon-dot" v-if="messageDot"></div>
			<u-icon
				name="../../../../static/message.png"
				color="#000"
				size="34"
				label-size="12"
				label="私人消息"
				labelPos="bottom"
				@click="toMessage"
			></u-icon>
		</div>
	</div>
</template>

<script>
import { banner } from '@/api/index.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
import takeLooks from '@/components/takeLook/takeLook.vue';
import { redDot } from '@/api/user.js';
const app = getApp();
export default {
	computed: {
		...mapState(['uid', 'house'])
	},
	components: {
		takeLooks
	},
	data() {
		return {
			list1: [], //消息红点
			messageDot: false
		};
	},
	watch: {
		myWs: {
			immediate: true,
			handler(news, olds) {
				console.log('index2开启侦听');
				this.ws = app.globalData.ws;
				this.ws.onMessage(res => {
					console.log(res);
					if (res.data === 'active') {
						return;
					}
					let data = JSON.parse(res.data);
					console.log(data);
					if (
						data.type === 'follow' ||
						data.type === 'comment' ||
						data.type === 'collection' ||
						data.type === 'silver' ||
						data.type === 'flower' ||
						data.type === 'shit'
					) {
						this.messageDot = true;
					}
				});
			}
		}
	},
	onLoad() {
		this.getBanner();
		this.getMessRedDot(this.uid);
	},
	onReachBottom() {
		this.$refs.takeLookComponent.getTakeLook();
	},
	methods: {
		toMessage() {
			this.messageDot = false;
			uni.navigateTo({
				url: '../../pages_userActivity/messageList/messageList'
			});
		},
		//消息红点
		async getMessRedDot(uid) {
			let res = await redDot({ uid: uid, type: 2, t: Date.parse(new Date()) });
			console.log('请求消息红点');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				return;
			}
			if (res.result === true) {
				this.messageDot = true;
			} else {
				this.messageDot = false;
			}
		},
		...mapMutations(['updateUid']),
		async getBanner() {
			let res = await banner({ type: 2 });
			console.log('请求banner图');
			if (res.code !== 0) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				return;
			}
			this.list1 = res.result;
		},

		toTop() {
			wx.pageScrollTo({
				scrollTop: 0
			});
		},
		reloadTake() {
			this.$refs.takeLookComponent.getTakeLook(1);
		},
		goOwnPageOrThirdParty(index) {
			if (this.list1[index].linkType === 1) {
				wx.navigateToMiniProgram({
					appId: this.list1[index].appId,
					path: this.list1[index].url,
					envVersion: 'release',
					success(res) {
						console.log('跳转小程序成功！', res);
					}
				});
			} else if (this.list1[index].linkType === 0) {
				if (
					this.list1[index].url === '../pages/user/user' ||
					this.list1[index].url === '../pages/index/index' ||
					this.list1[index].url === '../pages/index2/index2' ||
					this.list1[index].url === '../pages/index3/index3'
				) {
					uni.switchTab({
						url: 'this.list1[index].url'
					});
				} else {
					uni.navigateTo({
						url: this.list1[index].url
					});
				}
			} else {
				return;
			}
		}
	}
};
</script>

<style lang="less" scoped>
/deep/.u-input--circle {
	width: 570rpx;
	height: 60rpx;
	background: #ffffff;
	margin: 20rpx 0 0 30rpx;
	opacity: 0.65;
	.u-input__content__field-wrapper__field {
		font-size: 40rpx !important;
		color: black !important;
	}
}

.banner-box {
	background-color: #ffffff;
	/deep/ .u-swiper__wrapper__item__wrapper {
		padding: 10rpx 20rpx;
		background-color: #ffffff;
		align-content: center !important;
		.u-swiper__wrapper__item__wrapper__image {
			width: 682rpx;
			height: 176rpx !important;
			border-radius: 14rpx !important;
		}
	}
}
.title-box {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100rpx;
	box-sizing: border-box;
	padding: 0 32rpx;
	background-color: #ffffff;
	.title {
		font-size: 36rpx;
		font-weight: 600;
		color: #000000;
	}
}

button::after {
	border: none;
}
.ranking {
	position: fixed;
	bottom: 388rpx;
	right: 26rpx;
	z-index: 50;
}
.issue {
	position: fixed;
	width: 88rpx;
	height: 88rpx;
	bottom: 122rpx;
	right: 26rpx;
	z-index: 50;
	background: url(../../static/gotop.png) no-repeat;
	background-size: 88rpx 88rpx;
}
.reload {
	position: fixed;
	// width: 88rpx;
	// height: 88rpx;
	bottom: 250rpx;
	right: 26rpx;
	z-index: 50;
	// background: url(../../static/gotop.png) no-repeat;
	// background-size: 88rpx 88rpx;
}
.message {
	position: fixed;
	bottom: 400rpx;
	right: 26rpx;
	z-index: 50;
	.icon-dot {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background-color: #f56c6c;
		top: 8rpx;
		right: 8rpx;
		border-radius: 50%;
		z-index: 999;
	}
}
</style>
