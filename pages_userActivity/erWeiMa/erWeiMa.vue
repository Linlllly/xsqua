<template>
	<view class="erweima">
		<div class="my-friend" @tap.stop>
			<image class="code_view" :src="imagePath" @click="previewImg()"></image>
			<img src="https://www.zairongyifang.com:8080/filePath/app/20236/eb2e2b115a.png" alt="" />
			<div class="invite-content">{{ inviteContent }}</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imagePath: null,
			inviteContent: null,
			// 画布实例
			canvas: '',
			//画布
			ctx: ''
		};
	},
	onLoad(option) {
		this.imagePath = option.imagePath;
		this.inviteContent = option.inviteContent;
	},
	methods: {
		previewImg() {
			uni.previewImage({
				current: this.imagePath,
				urls: [this.imagePath]
			});
		}
	}
};
</script>

<style lang="less" scoped>
.erweima {
	display: flex;
	width: 750rpx;
	height: 100vh;
	justify-content: center;
	align-items: center;
}
.my-friend {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 730rpx;
	height: 900rpx;
	margin: auto;
	justify-content: center;
	img {
		width: 100%;
		height: 100%;
	}
	.code_view {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 128rpx;
		margin: 40rpx auto;
		width: 170rpx;
		height: 170rpx;
		background-color: white;
		border-radius: 50%;
	}
	.invite-content {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 546rpx;
		color: #694e31;
		font-size: 38rpx;
		width: 450rpx;
		word-break: break-all;
	}
}
</style>
