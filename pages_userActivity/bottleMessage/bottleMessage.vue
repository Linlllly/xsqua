<template>
	<view class="pages">
		<z-paging ref="paging" :default-page-size="12" loading-more-no-more-text="没有更多数据了" v-model="messageList" @query="getMessageList"  :empty-view-img-style='{width:0,height:0}'  >
				
				<div  class="content-list" v-for="(i, index) in messageList" :key="i.id">
					<img class="list-img" :src="i.userInfo.avatar" alt="" @click="toOtherUser(i.userInfo)" />
					<div class="content-info" @click="toArticleDes(i)">
						回复了您的漂流瓶
					</div>
				</div>
			</z-paging>
		
		
	</view>
</template>

<script>
import { message } from '@/api/messageList.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

const app = getApp();

export default {
	computed: {
		...mapState(['ava'])
	},
	data() {
		return {
			messageList: []
		};
	},
	
	methods: {
		//请求列表
		getMessageList(page, limit) {
			message({ page, limit})
							.then(res => {
								this.messageList = res.result.data||[];
								this.$refs.paging.complete(res.result.data);
							})
							.catch(res => {
								this.$refs.paging.complete(false);
							});
		},
		
		//去详情页
		toArticleDes(i) {
			if (i.postId) {
				uni.navigateTo({
					url: '../../pages_userActivity/articleDes/articleDes?i=' + i.postId
				});
			}
		},
		toOtherUser(i) {
			uni.navigateTo({
				url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateId + '&ouid=' + i.uid
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
