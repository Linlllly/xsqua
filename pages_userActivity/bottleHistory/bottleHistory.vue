<template>
	<view class="pages">
		<z-paging
			ref="paging"
			:default-page-size="12"
			loading-more-no-more-text="没有更多数据了"
			v-model="historyList"
			@query="getHistory"
			:empty-view-img-style="{ width: 0, height: 0 }"
		>
			<template #top>
				<u-tabs :list="list1" @change="tabChange"></u-tabs>
			</template>
			<view v-for="i in historyList" class="bottle-list" :key="i.id" @click="goBottleDetail(i)">
				<div v-if="!i.bottleInfo">
					<u-icon v-if="!i.media.length" name="cut" size="28"></u-icon>
					<u-icon v-else-if="i.type === 2 && i.media" name="photo" size="28"></u-icon>
					<u-icon v-else-if="i.type === 3 && i.media" name="play-circle" size="28"></u-icon>
				</div>
				<div v-else>
					<u-icon v-if="!i.bottleInfo.media.length" name="cut" size="28"></u-icon>
					<u-icon v-else-if="i.bottleInfo.bottleInfo.type === 2 && i.bottleInfo.media" name="photo" size="28"></u-icon>
					<u-icon v-else-if="i.bottleInfo.type === 3 && i.bottleInfo.media" name="play-circle" size="28"></u-icon>
				</div>
				<div class="contents">{{ i.content ? i.content : i.bottleInfo.content }}</div>
				<div class="time">{{ i.createTime }}</div>
				<u-icon name="trash" size="28" @tap.stop="delHistory(i)"></u-icon>
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
import { lostHistry, pickHistry, delLostBottle, delPickBottle } from '@/api/currentBottle.js';
export default {
	data() {
		return {
			list1: [
				{
					name: '投放漂流瓶历史记录'
				},
				{
					name: '捡到漂流瓶历史记录'
				}
			],
			historyList: [],
			type: 0,
			attention: null,
			showAttention: false
		};
	},
	methods: {
		getHistory(page, limit) {
			const res = this.type === 0 ? lostHistry({ page, limit }) : pickHistry({ page, limit, isComment: 0 });
			res.then((res) => {
				console.log('漂流瓶历史');
				console.log(res);
				if (res.code !== 0) {
					uni.$u.toast(res.msg);
					return;
				}

				this.historyList = res.result.records;
				this.historyList.forEach((item) => {
					if (this.type === 0) {
						item.media = JSON.parse(item.media);
					} else {
						item.bottleInfo.media = JSON.parse(item.bottleInfo.media) || [];
					}
				});
				this.$refs.paging.complete(res.result.records);
			}).catch(() => {
				this.$refs.paging.complete(false);
			});
		},
		tabChange({ index }) {
			this.type = index;
			this.$refs.paging.reload();
		},
		goBottleDetail(i) {
			uni.navigateTo({
				url: '../bottleDetail/bottleDetail?i=' + i.id + '&&type=' + this.type
			});
		},
		delHistory(i) {
			this.showAttention = true;
			this.attention = i;
		},
		async changeAttentionState() {
			let id = this.attention.id;
			let res = this.type === 0 ? await delLostBottle({ id }) : await delPickBottle({ id });
			let title = this.type === 0 ? '成功删除投放的瓶子' : '成功删除捡来的瓶子';

			console.log('删除丢/捡瓶子');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			uni.$u.toast(title);
			const index = this.historyList.findIndex((item) => item.id === this.attention.id);
			this.$delete(this.historyList, index);
			this.showAttention = false;
		}
	}
};
</script>

<style lang="less" scoped>
.bottle-list {
	display: flex;
	align-items: center;
	font-size: 38rpx;

	.contents {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
