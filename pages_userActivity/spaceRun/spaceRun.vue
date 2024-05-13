<template>
	<div class="pages">
		<div class="area-all">
			<image
				src="https://www.zairongyifang.com:8080/filePath/app/202311/compressed_25cb83852d.png"
				mode="widthFix"
				style="width: 100%"
			></image>

			<div
				class="city-select"
				v-for="i in areaList"
				:key="i.cateId"
				@click="goCitySelect(i.cateId)"
			></div>
		</div>
	</div>
</template>

<script>
import { list } from '@/api/areaSelect.js'
export default {
	data() {
		return {
			//地区列表
			areaList: []
		}
	},

	onLoad() {
		this.getList()
	},
	methods: {
		async getList() {
			let res = await list()
			console.log('1.一级居住地')
			console.log(res)
			if (res.code !== 0) {
				uni.$u.toast(res.msg)
				return
			}
			this.areaList = res.page.list
		},
		goCitySelect(a) {
			uni.navigateTo({
				url:
					'../citySelect/citySelect' +
					'?cateId=' +
					a +
					'&change=' +
					false +
					'&lookHouse=' +
					true
			})
		}
	}
}
</script>

<style lang="less" scoped>
.area-all {
	position: relative;
	width: 710rpx;
	margin: 10rpx auto 10rpx;
	border-radius: 20rpx 20rpx 30rpx 30rpx;
	overflow: hidden;
	image {
		z-index: -2;
	}
	.city-select {
		position: absolute;
		width: 140rpx;
		height: 140rpx;
	}
	.city-select:nth-of-type(1) {
		//繁华都市
		top: 144rpx;
		left: 430rpx;
	}

	.city-select:nth-of-type(2) {
		//世外桃源
		bottom: 30rpx;
		right: 10rpx;
	}

	.city-select:nth-of-type(3) {
		//神秘之地
		bottom: 30rpx;
		left: 60rpx;
	}

	.city-select:nth-of-type(4) {
		//江湖之颠
		top: 290rpx;
		left: 326rpx;
	}

	.city-select:nth-of-type(5) {
		//星际家园
		top: 262rpx;
		left: 20rpx;
	}

	.city-select:nth-of-type(6) {
		//千年古镇
		top: 200rpx;
		left: 178rpx;
	}

	.city-select:nth-of-type(7) {
		//梦幻世界
		top: 46rpx;
		left: 24rpx;
	}
}
</style>
