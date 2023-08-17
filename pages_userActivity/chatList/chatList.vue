<template>
	<view class="pages">
		<!-- <img class="bg-img" src="../../static/area-select-bg.png" alt="" /> -->
		<!-- 顶部 -->
		<div class="chat-title">
			<!-- 左 -->
			<div class="title-left"><div class="name-chat">私聊</div></div>
			<!-- 头像 -->
			<img class="name-title" :src="ava" alt="" />
		</div>
		<!-- 搜索 -->
		<div class="title-search">
			<u-search
				v-model="keyword"
				:showAction="true"
				actionText="搜索"
				:animation="false"
				@search="peopleSearch"
				@custom="peopleSearch"
			></u-search>
			<u-icon customStyle="marginLeft:20rpx" name="reload" color="#666" size="18" @click="reloadAll"></u-icon>
		</div>
		<!-- 列表 -->
		<div v-if="chatList.length !== 0" class="content-list" v-for="(i, index) in chatList" :key="i.uid" @click="goChatWith(i)">
			<!-- 头像 -->
			<img class="list-img" :src="i.avatar" alt="" />
			<div v-if="i.unReadCount > 0" class="mes-dot"></div>
			<!-- 姓名和信息 -->
			<div class="content-info">
				<div class="info-name">
					<div class="u-name">{{ i.remark ? i.remark : i.username }}</div>
				</div>
				<div class="info-des">{{ i.lastMsg ? i.lastMsg : ' ' }}</div>
			</div>
			<!-- 小红点和关系 -->
			<!-- <div class="red-dot">133</div> -->
			<div v-if="i.relations !== 0">
				<img v-if="i.relations === 1" class="list-relative-img" src="../../static/fans.png" alt="" />
				<img v-if="i.relations === 2" class="list-relative-img" src="../../static/foucs.png" alt="" />
				<img v-if="i.relations === 3" class="list-relative-img" src="../../static/double.png" alt="" />
			</div>
		</div>
		<div v-if="!isloading && page >= lastPage" class="next">———— 没有更多数据了 ————</div>
		<div v-if="isloading" class="next"><u-loading-icon></u-loading-icon></div>
	</view>
</template>

<script>
import { chatList } from '@/api/chatList/chatList.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

const app = getApp();
export default {
	computed: {
		...mapState(['ava', 'myWs', 'uid'])
	},
	data() {
		return {
			ws: '',
			chatList: [],
			//条数
			limit: 12,
			//页面
			page: 1,
			lastPage: '',
			isloading: false, // 节流阀 是否正在请求数据
			myAvatar: '',
			getList: true,
			//备注/房间号
			keyword: ''
		};
	},
	watch: {
		myWs: {
			immediate: true,
			handler(news, olds) {
				console.log('侦听-----------', news);
				// uni.hideLoading();
				this.ws = null;
				this.ws = app.globalData.ws;
				this.ws.onMessage(res => {
					console.log(res);
					if (res.data === 'active') {
						return;
					}
					let data = JSON.parse(res.data);
					console.log(data);
					if (data.type === 'chat' || data.type === 'chat_image' || data.type === 'chat_video' || data.toUid !== this.uid) {
						this.page = 1;
						this.chatList = [];
						this.getChatList();
					}
				});
			}
		}
	},
	onLoad() {},

	onHide() {
		this.getList = false;
	},
	onUnload() {
		this.getList = false;
	},
	onShow() {
		console.log('chatList onShow');
		this.getList = true;
		this.page = 1;
		this.keyword = '';
		this.chatList = [];
		this.getChatList();
	},
	onReachBottom() {
		if (this.page >= this.lastPage) {
			return;
		}
		// 判断是否正在请求其它数据，如果是，则不发起额外的请求
		if (this.isloading) return;
		// 让页码值自增 +1
		this.page += 1;
		// 重新获取列表数据
		this.getChatList();
	},
	methods: {
		//请求列表
		async getChatList() {
			if (!this.getList) {
				return;
			}
			// ** 打开节流阀
			this.isloading = true;
			let res = await chatList({ page: this.page, limit: this.limit, keyword: this.keyword });
			console.log('请求聊天列表');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取聊天列表失败',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			this.isloading = false;
			this.chatList = [...this.chatList, ...res.result.data];
			this.lastPage = res.result.last_page;
		},
		goChatWith(i) {
			console.log('==========');
			console.log(i.uid);
			uni.navigateTo({
				url: '../chatWith/chatWith?ouid=' + i.uid + '&&ocateId=' + i.cateId
			});
		},
		peopleSearch() {
			this.page = 1;
			this.chatList = [];
			this.getChatList();
		},
		reloadAll() {
			this.keyword = '';
			this.page = 1;
			this.chatList = [];
			this.getChatList();
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
