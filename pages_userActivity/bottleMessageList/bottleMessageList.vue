<template>
	<view class="pages">
		<z-paging ref="paging" :default-page-size="12" loading-more-no-more-text="没有更多数据了" v-model="recordList" @query="getBottleRecord"  :empty-view-img-style='{width:0,height:0}'  >
				
				<div  class="content-list" v-for="(i, index) in recordList" :key="i.id" @click="goBottleDetail(i)">
					<img class="list-img" :src="i.userInfo.avatar" alt="" />
					<div class="content-info">
						回复了您的漂流瓶
					</div>
				</div>
			</z-paging>
		
		
	</view>
</template>

<script>
import { bottleRecord } from '@/api/currentBottle.js';

export default {
	data() {
		return {
			recordList: []
		};
	},
	
	methods: {
		//请求列表
		 getBottleRecord(page, limit) {
		// 	bottleRecord({ page, limit})
		// 					.then(res => {
		// 						this.recordList = res.result.data||[];
		// 						this.$refs.paging.complete(res.result.data);
		// 					})
		// 					.catch(res => {
		// 						this.$refs.paging.complete(false);
		// 					});
		},
		
		goBottleDetail(i){
			uni.navigateTo({
				url: '../bottleDetail/bottleDetail?i=' + i.id
			});
		}
	}
};
</script>

<style lang="less" scoped>
.bg-img {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: -10;
}
.chat-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 240rpx;
	z-index: 50;
	box-sizing: border-box;
	padding: 0 40rpx;
	background: url('../../static/area-select-bg.png') !important;
	.name-chat {
		font-size: 48rpx;
	}
	.name-title {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
	}
}
.content-list {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	border-bottom: 2rpx solid #ccc;
	.list-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.content-info {
		flex: 1;
			font-size: 36rpx;
		
	}
}
.next {
	margin-top: 26rpx;
	width: 100%;
	color: #9a9698;
	text-align: center;
}
</style>
