<template>
	<view class="pages">
		<!-- banner -->
		<div v-if="list1.length" class="banner-box">
			<u-swiper :list="list1" keyName="img" height="220rpx" :interval="5000" :duration="400" :circular="true" @click="goOwnPageOrThirdParty()"></u-swiper>
		</div>
		<div class="clicks">
			<div class="clicks-item" @click="toBottleHistory">
				<u-icon name="../../../../static/bottle-history.png" size="20"></u-icon>
				<div>漂流瓶历史记录</div>
			</div>
			<div class="vertical-line">|</div>
			<div class="clicks-item" @click="toBottleMessageList">
				<u-icon name="../../../../static/bottle-message.png" size="20"></u-icon>
				<div>消息提示</div>
				<div v-if="bottleDot" class="mes-dot"></div>
			</div>
		</div>
		<img class="pick-and-lost" @click="pickBottle()" src="https://www.zairongyifang.com:8080/filePath/app/20241/compressed_c99ab46582.jpg" alt="" />
		<img class="pick-and-lost" @click="toIssue" src="https://www.zairongyifang.com:8080/filePath/app/20244/compressed_b58b2e26b4.png" alt="" />
		<!-- 再捡一次 -->
		<u-popup :show="showPickAgain" :round="20" :closeOnClickOverlay="false" mode="center" :safeAreaInsetBottom="false">
			<div class="pop-borders pop-pick">
				<div class="pick-text">每次捡漂流瓶都须送出10颗星星</div>
				<div class="pop-btn-box">
					<div
						class="pop-oks"
						@click="
							showPickAgain = false;
							second = false;
							pickBottle();
						"
					>
						确定
					</div>
					<div class="pop-cencels" @click="showPickAgain = false">取消</div>
				</div>
			</div>
		</u-popup>
	</view>
</template>

<script>
import { pickBottle, todayCount } from '@/api/currentBottle.js';
import { banner } from '@/api/index.js';
import { redDot } from '@/api/user.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

const app = getApp();

export default {
	data() {
		return {
			bottleDot: false,
			list1: [],
			showPickAgain: false,
			second: false
		};
	},
	computed: {
		...mapState(['uid'])
	},
	watch: {
		myWs: {
			immediate: true,
			handler(news, olds) {
				console.log('bottle开启侦听');
				this.ws = app.globalData.ws;
				this.ws.onMessage((res) => {
					console.log(res);
					if (res.data === 'active') {
						return;
					}
					let data = JSON.parse(res.data);
					console.log(data);
					if (data.type === 'bottle') {
						this.bottleDot = true;
					}
				});
			}
		}
	},
	onLoad() {
		this.getBanner();
		this.gettBottleRedDot();
	},
	onShow() {
		this.getTodayCount();
	},
	methods: {
		async getBanner() {
			let res = await banner({ type: 3 });
			console.log('请求banner图');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.list1 = res.result;
		},
		async getTodayCount() {
			let res = await todayCount();
			console.log('请求今日捡瓶子数量');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.second = res.result === 1 ? true : false;
		},
		async pickBottle() {
			if (this.second) {
				this.showPickAgain = true;
				return;
			}
			let res = await pickBottle();
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			let id = res.result.bottleRecordId;
			this.getTodayCount();
			uni.navigateTo({
				url: '../../pages_userActivity/bottleDetail/bottleDetail?i=' + id + '&&type=1'
			});
		},
		async gettBottleRedDot() {
			let res = await redDot({
				uid: this.uid,
				type: 3,
				t: Date.parse(new Date())
			});
			console.log('请求瓶子红点');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			if (res.result) {
				this.bottleDot = true;
			} else {
				this.bottleDot = false;
			}
		},
		toIssue() {
			uni.navigateTo({
				url: '../../pages_userActivity/artcleIssue/artcleIssue?secret=2'
			});
		},
		toBottleHistory() {
			uni.navigateTo({
				url: '../../pages_userActivity/bottleHistory/bottleHistory'
			});
		},
		toBottleMessageList() {
			this.bottleDot = false;
			uni.navigateTo({
				url: '../../pages_userActivity/bottleMessageList/bottleMessageList'
			});
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
					this.list1[index].url === '../pages/currentBottle/currentBottle'
				) {
					uni.switchTab({
						url: this.list1[index].url
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
.clicks {
	display: flex;
	justify-content: space-between;
	box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
	padding: 20rpx 0;
	margin-bottom: 22rpx;
	.vertical-line {
		color: #b7b7b7;
	}
	.clicks-item {
		position: relative;
		flex: 1;
		display: flex;
		justify-content: center;
		.mes-dot {
			position: absolute;
			width: 20rpx;
			height: 20rpx;
			background-color: #f56c6c;
			top: -6rpx;
			left: 140rpx;
			border-radius: 50%;
		}
	}
}
.pick-and-lost {
	width: 648rpx;
	height: 520rpx;
	background-color: #f56c6c;
	margin: 0 auto 22rpx;
}
.pop-pick {
	width: 629rpx;
	height: 230rpx;
	.pick-text {
		text-align: center;
		margin: 40rpx;
	}
}
</style>
