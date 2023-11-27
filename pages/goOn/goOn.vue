<template>
	<view class="box">
		<!-- <bgMusic></bgMusic> -->
		<!-- 置此页为第一个页面代表页面挂载进入页 -->
		<img @click="goLoginSelect" :src="urls" alt="" />
	</view>
</template>

<script>
import { list } from '@/api/goOn.js';
export default {
	data() {
		return {
			urls: ''
		};
	},
	onLoad() {
		this.getList();
		setTimeout(() => {
			uni.reLaunch({
				//去选进入吗
				url: '../loginSelect/loginSelect'
			});
		}, 1500);
	},
	methods: {
		async getList() {
			let res = await list();
			if (res.code !== 0) {
				uni.showToast({
					title: '获取开屏失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.urls = res.result.url;
		},
		goLoginSelect() {
			uni.reLaunch({
				//去选进入吗
				url: '../loginSelect/loginSelect'
			});
		}
	}
};
</script>

<style lang="less" scoped>
.box {
	position: relative;
	width: 100%;
	height: 100vh;
}
image {
	width: 100%;
	height: 1480rpx;
}
</style>
