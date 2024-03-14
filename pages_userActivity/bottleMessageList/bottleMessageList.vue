<template>
	<view class="pages">
		<z-paging
			ref="paging"
			:default-page-size="12"
			loading-more-no-more-text="没有更多数据了"
			v-model="recordList"
			@query="getBottleRecord"
			:empty-view-img-style="{ width: 0, height: 0 }"
			:auto="false"
		>
			<template #top>
				<!-- 搜索 -->
				<!-- <div class="title-search">
				<u-search
					v-model="keyword"
					:showAction="true"
					actionText="搜索"
					:animation="false"
					@search="peopleSearch"
					@custom="peopleSearch"
				></u-search>
				<u-icon
					customStyle="marginLeft:20rpx"
					name="reload"
					color="#666"
					size="18"
					@click="reloadAll"
				></u-icon>
			</div> -->
			</template>
			<div
				class="content-list"
				v-for="(i, index) in recordList"
				:key="i.id"
				@click="goBottleDetail(i)"
			>
				<img class="list-img" :src="i.userInfo.avatar" alt="" />
				<div class="content-info">{{ i.comment }}</div>
			</div>
		</z-paging>
	</view>
</template>

<script>
import { bottleRecord } from '@/api/currentBottle.js'

export default {
	data() {
		return {
			keyword: '',
			recordList: []
		}
	},
	onShow() {
		this.$refs.paging.reload()
	},
	methods: {
		//请求列表
		getBottleRecord(page, limit) {
			bottleRecord({ page, limit, isComment: 1 })
				.then((res) => {
					console.log('漂流瓶回复列表')
					console.log(res)
					this.recordList = res.result.records || []
					this.$refs.paging.complete(res.result.records)
				})
				.catch((res) => {
					this.$refs.paging.complete(false)
				})
		},

		goBottleDetail(i) {
			uni.navigateTo({
				url: '../bottleDetail/bottleDetail?i=' + i.id + '&&type=2'
			})
		}
	}
}
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
.title-search {
	display: flex;
	padding: 10rpx 40rpx;
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
</style>
