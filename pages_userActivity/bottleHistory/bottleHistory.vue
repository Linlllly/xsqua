<template>
	<view class="pages">
		<z-paging
			ref="paging"
			:default-page-size="12"
			loading-more-no-more-text="没有更多数据了"
			v-model="historyList"
			@query="getHistory"
			:empty-view-img-style="{ width: 0, height: 0 }"
			:auto="false"
		>
			<template #top>
				<div class="clicks">
					<div
						class="clicks-item"
						:style="{ color: type === 0 ? '#E99300' : '' }"
						@click="tabChange(0)"
					>
						投放漂流瓶历史记录
					</div>
					<div class="vertical-line">|</div>
					<div
						class="clicks-item"
						:style="{ color: type === 1 ? '#E99300' : '' }"
						@click="tabChange(1)"
					>
						投放漂流瓶历史记录
					</div>
				</div>
			</template>
			<view
				v-for="i in historyList"
				class="bottle-list"
				:key="i.id"
				@click="goBottleDetail(i)"
			>
				<div v-if="type === 0">
					<u-icon
						v-if="!i.media.length"
						name="cut"
						size="28"
					></u-icon>
					<u-icon
						v-else-if="i.type === 2 && i.media"
						name="photo"
						size="28"
					></u-icon>
					<u-icon
						v-else-if="i.type === 3 && i.media"
						name="play-circle"
						size="28"
					></u-icon>
				</div>
				<div v-else>
					<u-icon
						v-if="!i.bottleInfo.media.length"
						name="cut"
						size="28"
					></u-icon>
					<u-icon
						v-else-if="
							i.bottleInfo.type === 2 && i.bottleInfo.media
						"
						name="photo"
						size="28"
					></u-icon>
					<u-icon
						v-else-if="
							i.bottleInfo.type === 3 && i.bottleInfo.media
						"
						name="play-circle"
						size="28"
					></u-icon>
				</div>
				<div class="contents">
					{{ i.content ? i.content : i.bottleInfo.content }}
				</div>
				<div class="bottle-time">{{ i.createTime | formatDate }}</div>
				<u-icon
					name="trash"
					size="28"
					@tap.stop="delHistory(i)"
				></u-icon>
			</view>
		</z-paging>
		<u-modal
			:show="showAttention"
			title="删除这条漂流瓶记录吗"
			confirmColor="#e89406"
			showCancelButton="true"
			@cancel="showAttention = false"
			@confirm="changeAttentionState"
			width="620rpx"
		></u-modal>
	</view>
</template>

<script>
import {
	lostHistry,
	pickHistry,
	delLostBottle,
	delPickBottle
} from '@/api/currentBottle.js'
export default {
	data() {
		return {
			historyList: [],
			type: 0,
			attention: null,
			showAttention: false,
			getList: false
		}
	},
	onShow() {
		this.$refs.paging.reload()
	},
	filters: {
		formatDate(timeString) {
			const [datePart, timePart] = timeString.split(' ')
			const [year, month, day] = datePart.split('-')
			return `${year}/${month}/${day}`
		}
	},
	methods: {
		getHistory(page, limit) {
			const res =
				this.type === 0
					? lostHistry({ page, limit })
					: pickHistry({ page, limit })
			res.then((res) => {
				console.log('漂流瓶历史')
				console.log(res)
				if (res.code !== 0) {
					uni.$u.toast(res.msg)
					return
				}

				this.historyList = res.result.records
				this.historyList.forEach((item) => {
					if (this.type === 0) {
						item.media = JSON.parse(item.media)
					} else {
						item.bottleInfo.media =
							JSON.parse(item.bottleInfo.media) || []
					}
				})
				this.$refs.paging.complete(res.result.records)
			}).catch(() => {
				this.$refs.paging.complete(false)
			})
		},
		tabChange(index) {
			this.type = index
			this.$refs.paging.reload()
		},
		goBottleDetail(i) {
			uni.navigateTo({
				url:
					'../bottleDetail/bottleDetail?i=' +
					i.id +
					'&&type=' +
					this.type
			})
		},
		delHistory(i) {
			this.showAttention = true
			this.attention = i
		},
		async changeAttentionState() {
			let id = this.attention.id
			let res =
				this.type === 0
					? await delLostBottle({ id })
					: await delPickBottle({ id })
			let title =
				this.type === 0 ? '成功删除投放的瓶子' : '成功删除捡来的瓶子'

			console.log('删除丢/捡瓶子')
			console.log(res)
			if (res.code !== 0) {
				uni.$u.toast(res.msg)
				return
			}
			uni.$u.toast(title)
			const index = this.historyList.findIndex(
				(item) => item.id === this.attention.id
			)
			this.$delete(this.historyList, index)
			this.showAttention = false
		}
	}
}
</script>

<style lang="less" scoped>
.pages {
	background-color: #f8f8f8;
}

.clicks {
	display: flex;
	justify-content: space-between;
	box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
	padding: 20rpx 0;
	margin-bottom: 22rpx;
	background-color: #fff;
	.vertical-line {
		color: #b7b7b7;
	}
	.clicks-item {
		position: relative;
		flex: 1;
		display: flex;
		justify-content: center;
	}
}
.bottle-list {
	display: flex;
	align-items: center;
	font-size: 38rpx;
	width: 640rpx;
	height: 114rpx;
	border-radius: 20rpx;
	margin: 0 auto 22rpx;
	background-color: #fff;
	padding: 0 20rpx;
	.contents {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-left: 10rpx;
	}
	.bottle-time {
		padding-right: 10rpx;
	}
}
</style>
