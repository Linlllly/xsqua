<template>
	<view class="pages">
		
				<z-paging  ref="paging" :default-page-size="12" loading-more-no-more-text="没有更多数据了" v-model="blackList" @query="getblackList"  :empty-view-img-style='{width:0,height:0}'  >
						<template #top>
							<!-- 顶部 -->
							<div class="chat-title">
								<!-- 左 -->
								<div class="title-left"><div class="name-chat">黑名单</div></div>
								<!-- 头像 -->
								<img class="name-title" :src="ava" alt="" />
							</div>
						</template>
						<view class="content-list" v-for="(i, index) in blackList" :key="i.blackUserInfo.uid">
							<!-- 头像 -->
							<img class="list-img" :src="i.blackUserInfo.avatar" alt="" />
							<!-- 姓名和信息 -->
							<div class="content-info">
								<div class="info-name">
									<div class="u-name">{{ i.blackUserInfo.username }}</div>
								</div>
								<div class="info-des">{{ i.blackUserInfo.intro ? i.blackUserInfo.intro : ' ' }}</div>
							</div>
							<div style="color:#e89406;font-size: 30rpx;" @click="cancelBlack(i)">移 除</div>
						</view>
					</z-paging>
		<u-modal
			:show="showAttention"
			title="确定将该用户移除黑名单吗"
			confirmColor="#e89406"
			showCancelButton="true"
			@cancel="showAttention = false"
			@confirm="changeAttentionState"
			width="620rpx"
		></u-modal>
	</view>
</template>

<script>
import { blackList, del } from '@/api/sheldList.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

const app = getApp();
export default {
	computed: {
		...mapState(['armor'])
	},
	data() {
		return {
			ws: '',
			blackList: [],
			myAvatar: '',
			//备注/房间号
			keyword: '',
			attention: null,
			showAttention: false
		};
	},

	methods: {
		
		 getblackList(page, limit) {
			blackList({ page, limit , keyword: this.keyword})
							.then(res => {
								this.blackList = res.result.records||[];
								this.$refs.paging.complete(res.result.records);
							})
							.catch(res => {
								this.$refs.paging.complete(false);
							});
		},
		cancelBlack(i) {
			if (this.armor) {
				this.showAttention = true;
				this.attention = i;
			} else {
				uni.showToast({
					title: '未激活，需兑换超级安全盔甲',
					
				});
			}
		},
		changeAttentionState() {
			del({ uid: this.attention.blackUserInfo.uid }).then(res => {
				console.log('请求移除黑名单');
				console.log(res);
				if (res.code !== 0) {
					uni.showToast({
						title: res.msg,
						
					});
					return;
				}
				uni.showToast({
					title: '移除黑名单成功',
					
				});
				const index = this.blackList.findIndex(item => item.blackUserInfo.uid === this.attention.blackUserInfo.uid);
				this.$delete(this.blackList, index);
				this.showAttention = false;
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

	.title-left {
		display: flex;
		flex-direction: column;
		.name-chat {
			font-size: 48rpx;
		}
		/deep/.u-input {
			margin-top: 10rpx;
			width: 428rpx;
		}
	}
	.name-title {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
	}
}
.title-search {
	display: flex;
	padding: 10rpx 40rpx;
}
.content-list {
	position: relative;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	border-bottom: 2rpx solid #ccc;
	box-sizing: border-box;
	.mes-dot {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background-color: #f56c6c;
		top: 28rpx;
		left: 118rpx;
		border-radius: 50%;
	}
	.list-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.content-info {
		flex: 1;
		.info-name {
			display: flex;
			justify-content: space-between;

			.u-name {
				font-size: 40rpx;
				font-weight: 500;
				color: #000000;
				line-height: 1.5;
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis !important; /* 超出部分省略号 */
				word-break: break-all !important; /* break-all(允许在单词内换行。) */
				display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
				-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
				-webkit-line-clamp: 1 !important; /* 显示的行数 */
			}
			.u-time {
				font-size: 32rpx;
				color: #76abd9;
				line-height: 1.5;
				margin-right: 20rpx;
			}
		}
		.info-des {
			font-size: 32rpx;
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis !important; /* 超出部分省略号 */
			word-break: break-all !important; /* break-all(允许在单词内换行。) */
			display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
			-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
			-webkit-line-clamp: 1 !important; /* 显示的行数 */
		}
	}
	.red-dot {
		padding: 0 6rpx;
		background-color: #ff0a0a;
		border-radius: 16rpx;
		color: white;
		margin: 0 20rpx;
	}
	.list-relative-img {
		width: 66rpx;
		height: 66rpx;
	}
}
.next {
	margin-top: 26rpx;
	width: 100%;
	color: #9a9698;
	text-align: center;
}
</style>
