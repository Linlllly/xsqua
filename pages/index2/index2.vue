<template>
	<div class="pages">
		<!-- banner -->
		<div v-if="list1.length" class="banner-box">
			<u-swiper :list="list1" keyName="img" height="220rpx" :interval="3500" :duration="400" :circular="true"></u-swiper>
		</div>
		<takeLooks ref="takeLookComponent" filler="filler2" :type="2"></takeLooks>
		<button class="issue" @click="toTop"></button>
		<div class="reload">
			<u-icon name="../../../../static/reload.png" color="#000" size="34" label="换一换" labelPos="bottom" @click="reloadTake"></u-icon>
		</div>
	</div>
</template>

<script>
import { banner } from '@/api/index/index.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
import takeLooks from '@/components/takeLook/takeLook.vue';
export default {
	computed: {
		...mapState(['uid', 'house'])
	},
	components: {
		takeLooks
	},
	data() {
		return {
			list1: []
		};
	},
	onLoad() {
		this.getBanner();
	},
	onReachBottom() {
		this.$refs.takeLookComponent.getTakeLook();
	},
	methods: {
		...mapMutations(['updateUid']),
		async getBanner() {
			let res = await banner({ type: 2 });
			console.log('请求banner图');
			if (res.code !== 0) {
				uni.showToast({
					title: '获取banner图失败',
					icon: 'none',
					duration: 2000
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
</style>
