<template>
	<div class="pages">
		<!-- 表头 -->
		<div class="dynamic">
			<div class="title">动态</div>
			<img class="name-title" :src="ava" alt="" />
		</div>

		<!-- 列表 -->
		<div v-if="meetingList.length !== 0" class="dy-content" v-for="i in meetingList" :key="i.id">
			<div class="look-title">
				<img class="info-portrait" :src="i.userInfo.avatar" alt="" @click="toOtherUser(i.userInfo)" />
				<div class="info-des">
					<div class="street">{{ i.userInfo.username }}</div>
					<div class="addr">{{ i.userInfo.intro }}</div>
				</div>
			</div>
			<div class="looks">
				<!-- 标题 -->
				<!-- 	<div class="content-title">{{ i.content }}</div> -->
				<div class="content-title">
					<div v-if="i.more === '1'" class="real-more-inner">{{ i.content }}</div>
					<div v-else-if="i.more === '2'" class="real-inner">{{ i.content }}</div>
					<div v-else class="inner">{{ i.content }}</div>
				</div>
				<div v-if="i.more === '1'" class="content-des" @click="toArticleDes(i)">查看详情 ></div>
				<video v-if="!i.img && i.media.length !== 0" :src="i.media[0]" :controls="true" :show-center-play-btn="true"></video>
				<!-- 四张以上 -->
				<u-album
					v-if="i.img && i.media.length !== 0 && i.media.length > 4"
					:urls="i.media"
					multipleSize="230rpx"
					:previewFullImage="true"
				></u-album>
				<!-- 四张 -->
				<u-album
					v-if="i.img && i.media.length > 1 && i.media.length < 5"
					:urls="i.media"
					multipleSize="346rpx"
					rowCount="2"
					:previewFullImage="true"
				></u-album>
				<!-- 一张 -->
				<image
					class="singleImg"
					v-if="i.img && i.media.length === 1"
					:src="i.media[0]"
					mode="widthFix"
					@click="previewImg(i.media)"
				></image>
			</div>
			<!-- 分享评论转发 -->
			<div class="funcs">
				<span style="font-size: 28rpx;color: #767374;">{{ i.createTime }}</span>
				<!-- 按钮 -->
				<div class="icons" @click="toArticleDes(i)">
					<img src="../../static/I.png" alt="" />
					<img src="../../static/want.png" alt="" />
					<img src="../../static/to.png" alt="" />
					<img src="../../static/more.png" alt="" />
				</div>
			</div>
		</div>
		<u-loading-icon v-if="isloading" color="#767374" size="16"></u-loading-icon>
		<div v-if="!isloading && page >= lastPage" class="next">———— 没有更多数据了 ————</div>
	</div>
</template>

<script>
import { followUserPost } from '@/api/friendDynamic/friendDynamic.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	data() {
		return {
			//条数
			limit: 12,
			//页面
			page: 1,
			lastPage: '',
			meetingList: [],
			isloading: false // 节流阀 是否正在请求数据
		};
	},
	computed: {
		...mapState(['house', 'ava', 'times'])
	},
	onLoad() {
		this.meetingList = [];
		this.getFollowUserPost();
	},
	onShow() {},
	onReachBottom() {
		if (this.page >= this.lastPage) {
			return;
		}
		// 判断是否正在请求其它数据，如果是，则不发起额外的请求
		if (this.isloading) return;
		// 让页码值自增 +1
		this.page += 1;
		// 重新获取列表数据
		this.getFollowUserPost();
	},
	methods: {
		...mapMutations(['updateTimes']),
		//单图预览
		previewImg(i) {
			uni.previewImage({
				current: i[0], // 当前显示图片的http链接
				urls: i // 需要预览的图片http链接列表
			});
		},
		//获取列表
		async getFollowUserPost() {
			// ** 打开节流阀
			this.isloading = true;
			let res = await followUserPost({ page: this.page, limit: this.limit });
			console.log('请求好友动态列表');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取好友动态列表失败',
					icon: 'none',
					duration: 2000
				});
				// ** 关闭节流阀
				this.isloading = false;
				return;
			}
			this.meetingList = [...this.meetingList, ...res.result.data];
			this.lastPage = res.result.last_page;
			for (var i = 0; i < this.meetingList.length; i++) {
				let lins = this.meetingList[i].media[0];
				let zhengze = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/;
				this.$set(this.meetingList[i], 'img', zhengze.test(lins));
				this.$set(this.meetingList[i], 'more', '');
			}
			this.$nextTick(() => {
				let query = uni.createSelectorQuery().in(this);
				//所有title
				query.selectAll('.content-title').boundingClientRect();
				//所有inner
				query.selectAll('.inner').boundingClientRect();
				query.exec(res => {
					for (var i = 0; i < res[0].length; i++) {
						let linsHeight = res[0][i].height - res[1][i].height;
						if (linsHeight >= 0) {
							this.$set(this.meetingList[i], 'more', '2');
						} else {
							this.$set(this.meetingList[i], 'more', '1');
						}
					}
				});
				// ** 关闭节流阀
				this.isloading = false;
			});
		},
		toArticleDes(i) {
			uni.navigateTo({
				url: '../../pages_userActivity/articleDes/articleDes?i=' + i.id
			});
		},
		toOtherUser(i) {
			uni.navigateTo({
				url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateId + '&ouid=' + i.uid
			});
		}
	}
};
</script>

<style lang="less">
.pages {
	// background-color: #eeeeee;
}
.dynamic {
	display: flex;
	width: 100%;
	height: 210rpx;
	justify-content: space-between;
	align-items: center;
	padding: 0 32rpx;
	box-sizing: border-box;
	background: url('../../static/area-select-bg.png') !important;
	.title {
		display: flex;
		align-items: center;
		height: 66rpx;
		font-size: 48rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #000000;
		line-height: 66rpx;
		.name-title {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
		}
	}
	image {
		width: 176rpx;
		height: 176rpx;
		border-radius: 50%;
	}
}
.dy-content {
	width: 750rpx;
	box-sizing: border-box;
	padding: 10rpx 16rpx;
	border-bottom: 2rpx solid #333;
	.look-title {
		display: flex;
		margin: 10rpx 0 20rpx;
		.info-portrait {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
		}
		.info-des {
			flex: 1;
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			.street {
				font-size: 40rpx;
				color: #616161;
				line-height: 1.4;
			}
			.addr {
				font-size: 32rpx;
				color: #fab237;
				line-height: 1.3;
				overflow: hidden !important;
				text-overflow: ellipsis !important; /* 超出部分省略号 */
				word-break: break-all !important; /* break-all(允许在单词内换行。) */
				display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
				-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
				-webkit-line-clamp: 1 !important; /* 显示的行数 */
			}
		}
	}
	.looks {
		// border-radius: 20rpx;
		overflow: hidden;
		margin-top: 6rpx;

		.content-title {
			position: relative;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			line-height: 1.8;
			max-height: 238rpx;
			overflow: hidden !important;
			white-space: pre-line; //遇到回车换行
			word-break: break-word !important; /* break-all(允许在单词内换行。) */
			display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
			-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
			.inner {
				/* display: none; */
				position: 'absolute';
				zindex: -1;
				visibility: 'hidden';
				oveflow: auto;
			}
			.real-inner {
				display: block;
				oveflow: auto;
			}
			.real-more-inner {
				overflow: hidden !important;
				text-overflow: ellipsis !important; /* 超出部分省略号 */
				white-space: pre-line; //遇到回车换行
				word-break: break-word !important; /* break-all(允许在单词内换行。) */
				display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
				-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
				-webkit-line-clamp: 4 !important; /* 显示的行数 */
			}
		}
		.content-des {
			color: #5387ff;
			margin-bottom: 10rpx;
		}
		.singleImg {
			width: 560rpx;
		}
		video {
			width: 100%;
			min-height: 460rpx;
		}
	}
	.funcs {
		margin-top: 12rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			display: flex;
			justify-content: flex-end;
		}
		image {
			width: 38rpx;
			height: 38rpx;
			margin-right: 16rpx;
		}
		/deep/.u-icon--right {
			margin-right: 10rpx;
		}
	}
}

.next {
	margin-top: 10rpx;
	width: 100%;
	color: #9a9698;
	text-align: center;
}
</style>
