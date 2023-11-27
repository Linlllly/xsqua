<template>
	<div class="pages">
		<img class="bg-img" src="../../static/area-select-bg.png" alt="" />
		<img src="https://www.zairongyifang.com:8080/filePath/app/20237/57c133248a.jpg" alt="" class="area" />
		<img src="https://www.zairongyifang.com:8080/filePath/app/20237/9e485e7175.jpg" alt="" class="area" />
		<img src="https://www.zairongyifang.com:8080/filePath/app/20237/8213f7cdeb.jpg" alt="" class="area" />
		<div class="city-select"><div v-for="i in areaList" :key="i.cateId" @click="goCitySelect(i.cateId)"></div></div>
	</div>
</template>

<script>
import { list } from '@/api/areaSelect.js';
export default {
	data() {
		return {
			//地区列表
			areaList: [],
			//是改变房间吗？
			change: '',
			//是查找用户吗？
			lookHouse: ''
		};
	},
	onLoad(option) {
		this.change = option.change;
		this.lookHouse = option.lookHouse;
		this.getList();
	},
	methods: {
		goCitySelect(a) {
			uni.navigateTo({
				url: '../citySelect/citySelect' + '?cateId=' + a + '&change=' + this.change + '&lookHouse=' + this.lookHouse
			});
		},
		async getList() {
			let res = await list();
			console.log('1.一级居住地');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取区域列表失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.areaList = res.page.list;
		}
	}
};
</script>

<style lang="less" scoped>
.bg-img {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -5;
}
.title {
	width: 350rpx;
	font-size: 36rpx;
	font-weight: 600;
	color: #fff;
	margin-top: 40rpx;
	margin-left: 32rpx;
}
.area {
	width: 750rpx;
	height: 380rpx;
	margin-top: 26rpx;
}
.city-select {
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 0.3;
	z-index: 10;
	top: 0;
	left: 0;
}
.city-select div:nth-child(n) {
	float: left;
	height: 380rpx;
}
.city-select div:nth-child(1) {
	width: 362rpx;
	margin-top: 112rpx;
}
.city-select div:nth-child(2) {
	width: 380rpx;
	margin-top: 112rpx;
}
.city-select div:nth-child(3) {
	width: 362rpx;
	margin-top: 30rpx;
}
.city-select div:nth-child(4) {
	width: 380rpx;
	margin-top: 30rpx;
}

.city-select div:nth-child(5) {
	width: 238rpx;
	margin-top: 34rpx;
}
.city-select div:nth-child(6) {
	width: 276rpx;
	margin-top: 34rpx;
}
.city-select div:nth-child(7) {
	width: 226rpx;
	margin-top: 34rpx;
}
</style>
