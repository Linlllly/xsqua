<template>
	<div>
		<!-- 列表 -->
		<div v-if="meetingList.length !== 0" class="dy-content" v-for="(i, index) in meetingList" :key="i.id">
			<div class="look-title">
				<img class="info-portrait" :src="i.userInfo.avatar" alt="" @click="toOtherUser(i.userInfo, 1)" />
				<div class="info-des">
					<div class="street">{{ i.userInfo.username }}</div>
					<div class="addr">{{ i.userInfo.intro }}</div>
				</div>
			</div>
			<div class="looks">
				<!-- 标题 -->
				<div class="content-title">
					<div v-if="i.more === '1'" class="real-more-inner">{{ i.content }}</div>
					<div v-else-if="i.more === '2'" class="real-inner">{{ i.content }}</div>
					<div v-else class="inner">{{ i.content }}</div>
				</div>
				<div v-if="i.more === '1'" class="content-des" @click="toArticleDes(i)">查看详情 ></div>
				<video v-if="!i.img && i.media.length !== 0" :src="i.media[0]" :controls="true" :show-center-play-btn="true"></video>
				<!-- 四张以上 -->
				<div class="five" v-if="i.img && i.media.length !== 0 && i.media.length > 4">
					<image
						class="fiveImg"
						v-for="(j, jndex) in i.media"
						:key="jndex"
						:src="j"
						mode="aspectFill"
						@click="previewImg(i.media, jndex)"
					></image>
				</div>
				<!-- 四张 -->
				<div class="four" v-if="i.img && i.media.length > 1 && i.media.length < 5">
					<image
						class="fourImg"
						v-for="(q, qndex) in i.media"
						:key="qndex"
						:src="q"
						mode="aspectFill"
						@click="previewImg(i.media, qndex)"
					></image>
				</div>
				<!-- 一张 -->
				<image
					class="singleImg"
					v-if="i.img && i.media.length === 1"
					:src="i.media[0]"
					mode="widthFix"
					@click="previewImg(i.media, index)"
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
			<!-- 一级回复 -->
			<div class="other">
				<!-- 评论 -->
				<div class="other-item" v-for="j in i.pinglun" :key="j.id">
					<img class="other-pri" :src="j.fromAvatar" alt="" @click="toOtherUser(j)" />
					<div class="other-all" @click="toArticleDes(i)">
						<div class="other-name">{{ j.fromUserName }}</div>
						<div class="other-say">{{ j.content }}</div>
						<div class="other-bottom">
							<span class="other-other">
								{{ j.childrenCount }}回复
								<u-icon name="arrow-right" color="#333" size="14"></u-icon>
							</span>
							<div class="other-timer">
								<span style="font-size: 24rpx;color: #767374;">{{ j.createTime }}</span>
							</div>
						</div>
					</div>
				</div>
				<!-- 查看全部 -->
				<div v-if="i.pinglun.length !== 0" class="all-comment" @click="toArticleDes(i)">查看全部评论 ></div>
			</div>
		</div>
		<div class="next"><u-loading-icon v-if="isloading" color="#767374" size="16"></u-loading-icon></div>

		<div v-if="!isloading && page >= lastPage" class="next">———— 没有更多数据了 ————</div>
	</div>
</template>

<script>
import { getComment } from '@/api/articleDes.js';
import { recommend, takeLook } from '@/api/index.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
export default {
	name: 'takeLook',
	computed: {
		...mapState(['uid', 'house'])
	},
	data() {
		return {
			//条数
			limit: 5,
			lastPage: '',
			meetingList: [],
			linsMeeting: [],
			isloading: false, // 节流阀 是否正在请求数据
			//刷新
			refresh: true,
			//下次更新过滤的动态id
			fillerIdList: []
		};
	},
	props: {
		filler: {
			type: String
		},
		type: {
			type: Number
		}
	},

	mounted() {
		this.fillerIdList = uni.getStorageSync(this.filler) ? uni.getStorageSync(this.filler) : [];
		this.getTakeLook();
	},
	onShow() {
		this.refresh = true;
	},

	methods: {
		//获取列表
		async getTakeLook(n) {
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.isloading) return;
			// this.getTakeLook();
			if (n || !this.fillerIdList.length) {
				//n存在 代表是刷新重置
				this.meetingList = [];
				// this.fillerIdList = [];
			}
			// ** 打开节流阀
			this.isloading = true;
			let res = await takeLook({ limit: this.limit, fillerIdList: this.fillerIdList, meeting: this.type });
			console.log('请求瞧一瞧列表');
			console.log(res);
			if (res.code !== 0) {
				uni.showToast({
					title: '获取瞧一瞧列表失败',
					icon: 'none',
					duration: 2000
				});
				// ** 关闭节流阀
				this.isloading = false;
				return;
			}

			//过滤现有结果+请求评论
			this.linsMeeting = res.result;

			for (let i = 0; i < this.linsMeeting.length; i++) {
				this.fillerIdList.push(this.linsMeeting[i].id);
				let result = await this.getCommentList(this.linsMeeting[i].id);
				this.$set(this.linsMeeting[i], 'pinglun', result);
			}
			uni.setStorageSync(this.filler, this.fillerIdList);
			this.meetingList = [...this.meetingList, ...this.linsMeeting];
			this.lastPage = res.result.last_page;
			for (var i = 0; i < this.meetingList.length; i++) {
				let lins = this.meetingList[i].media[0];
				let zhengze = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/;
				//是不是图片
				this.$set(this.meetingList[i], 'img', zhengze.test(lins));
				this.$set(this.meetingList[i], 'more', '');
			}
			if (!res.result.length) {
				uni.removeStorageSync(this.filler);
				this.fillerIdList = [];
				this.getTakeLook();
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
		//获取一级评论列表
		async getCommentList(id) {
			let res = await getComment({ postId: id, page: 1, limit: 3 });
			if (res.code !== 0) {
				return;
			}
			return res.result.data;
		},
		toArticleDes(i) {
			//跳转前定死
			this.refresh = false;
			uni.navigateTo({
				url: '../../pages_userActivity/articleDes/articleDes?i=' + i.id
			});
		},
		//单图预览
		previewImg(i, index) {
			this.refresh = false;
			uni.previewImage({
				current: i[index], // 当前显示图片的http链接
				urls: i // 需要预览的图片http链接列表
			});
		},

		toOtherUser(i, n) {
			if (i.uid === this.uid) {
				//自己
				uni.switchTab({
					url: '../../pages/user/user'
				});
			} else {
				if (n === 1) {
					uni.navigateTo({
						url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateId + '&ouid=' + i.uid
					});
				} else {
					uni.navigateTo({
						url: '../../pages_userActivity/otherUser/otherUser?ocateId=' + i.cateid + '&ouid=' + i.uid
					});
				}
			}
		}
	}
};
</script>

<style scoped lang="scss">
.dy-content {
	width: 750rpx;
	box-sizing: border-box;
	padding: 18rpx 16rpx;
	border-bottom: 2rpx solid #d4d4d4;
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
				color: #333;
				line-height: 1.4;
			}
			.addr {
				font-size: 32rpx;
				color: #d56621;
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
		overflow: hidden;
		margin-top: 6rpx;
		.content-title {
			position: relative;
			font-size: 32rpx;
			font-weight: 400;
			color: #000000;
			line-height: 1.8;
			max-height: 238rpx;
			overflow: hidden !important;
			white-space: pre-line; //遇到回车换行
			word-break: break-word !important; /* break-all(允许在单词内换行。) */
			display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
			-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
			padding: 4rpx 0;
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
		.five {
			display: flex;
			flex-wrap: wrap;
			.fiveImg {
				flex: 0 0 auto;
				height: 230rpx;
				width: 230rpx;
				margin-bottom: 10rpx;
				margin-right: 10rpx;
			}
		}
		.five image:nth-child(3n) {
			margin-right: 0rpx;
		}
		.four {
			display: flex;
			flex-wrap: wrap;
			.fourImg {
				flex: 0 0 auto;
				height: 352rpx;
				width: 352rpx;
				margin-bottom: 14rpx;
				margin-right: 14rpx;
			}
		}
		.four image:nth-child(2n) {
			margin-right: 0rpx;
		}
		.singleImg {
			width: 480rpx;
			max-height: 1000rpx;
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

.other {
	.other-item {
		display: flex;
		margin-top: 18rpx;
		.other-pri {
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			margin-right: 16rpx;
		}
		.other-all {
			flex: 1;
			.other-name {
				font-size: 34rpx;
				margin-bottom: 6rpx;
			}
			.other-say {
				color: #444444;
				white-space: pre-line; //遇到回车换行
				word-break: break-all !important; /* break-all(允许在单词内换行。) */
			}
			.other-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 10rpx 0;
				.other-other {
					display: flex;
					background-color: #e0e0e0;
					color: #ff8000;
					padding: 4rpx 4rpx 4rpx 12rpx;
					border-radius: 20rpx;
					letter-spacing: 2rpx;
				}
				.other-timer {
				}
			}
		}
	}
	.all-comment {
		text-align: center;
		color: #5387ff;
	}
}
.next {
	margin: 14rpx 0;
	width: 100%;
	color: #767374;
	text-align: center;
}
</style>
