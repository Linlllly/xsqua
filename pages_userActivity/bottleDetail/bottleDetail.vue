<template>
	<div class="pages">
		<!-- 表头 -->
		<div class="dynamic">
			<img class="my" :src="bottleUserInfo.avatar" alt="" @click="toOtherUser(artObj.userInfo, 1)" />
			<div class="title">
				<span class="des-name">{{ bottleUserInfo.username }}</span>
				<div class="des-more">{{ bottleUserInfo.intro }}</div>
			</div>
		</div>
		<div>{{ createTime }}</div>
		<!-- 文本内容 -->
		<div class="content">
			<div class="content-c">{{ artObj.content }}</div>
			<video v-if="aImgList.length === 0 && avideo" :src="avideo"></video>
			<u-album v-if="aImgList.length !== 0 && !avideo && aImgList.length > 4" :urls="aImgList" singleSize="750rpx" multipleSize="242rpx"></u-album>
			<div class="ua-box" v-if="aImgList.length !== 0 && !avideo && aImgList.length < 5 && aImgList.length > 1">
				<u-album :urls="aImgList" singleSize="740rpx" multipleSize="356rpx" rowCount="2"></u-album>
			</div>
			<image class="singleImg" v-if="aImgList.length === 1" :src="aImgList" mode="widthFix" @click="previewImg"></image>
		</div>

		<!-- 回复 -->
		<div class="other">
			<div class="other-item">
				<img class="other-pri" :src="i.fromAvatar" alt="" />
				<div class="other-all">
					<div class="other-name">名字</div>
					<div class="other-say">回复内容</div>
				</div>
			</div>
		</div>
		<u-loading-icon v-if="isloading" color="#767374" size="16"></u-loading-icon>

		<!-- 底部输入栏 -->
		<view v-show="showInput" class="input-box cu-bar tabbar" @touchmove.stop.prevent="discard" :style="{ bottom: messBotton + 'px' }">
			<view class="textbox">
				<view class="text-mode" :class="isVoice ? 'hidden' : ''">
					<view class="box">
						<view class="box">
							<textarea
								placeholder="回复这个漂流瓶..."
								auto-height="true"
								v-model="textMsg"
								@focus="inputHight"
								:adjust-position="false"
								@blur="inputLow"
								maxlength="300"
								:show-confirm-bar="false"
								@linechange="inputLine"
							/>
						</view>
					</view>
				</view>
			</view>
			<view class="send" :class="isVoice ? 'hidden' : ''" @click="sendText"><view class="btn">发送</view></view>
		</view>
		<!-- 输入栏背景 -->
		<div v-if="showInput" class="cancel-input" @click="showInput = false"></div>

		<div class="action-box">
			<div v-if="type === 1" class="record-then" @click="showInput = true">回复</div>
			<div v-if="type === 1" class="pick-again" @click="showPickAgain = true">再捡一次</div>
			<div v-if="type === 0" class="pick-again" @click="goChatWith">开启私聊</div>
		</div>
		<!-- 再捡一次 -->
		<u-modal
			:show="showPickAgain"
			title=" "
			content="确定花费5个星星再捡一次？"
			@confirm="confirmPickAgain"
			showCancelButton
			@cancel="showPickAgain = false"
			confirmColor="#e89406"
		></u-modal>
	</div>
</template>

<script>
import { detailPickBottle, detailLostBottle, commentBottle, pickBottle } from '@/api/currentBottle.js';
import { mapGetters, mapMutations, mapState } from 'vuex';

const app = getApp();

export default {
	computed: {
		...mapState(['uid'])
	},
	data() {
		return {
			ws: '',
			//帖子id
			id: '',
			type: '',
			bottleUserInfo: {},
			createTime: '',
			bottleInfo: {},
			//-----------
			artDes: {},
			aImgList: [],
			avideo: '',
			showInput: false,
			textMsg: '',

			comment: '',
			showPickAgain: false,
			//被回复用户ID
			toUid: '',
			messBotton: 0,
			inputYbHeight: 0
		};
	},
	onLoad(option) {
		this.ws = app.globalData.ws;
		this.id = option.i;
		this.type = Number(option.type);
		this.detailLostOrPickBottle();
		this.oneRecordList = [];
		// this.getCommentList();
	},
	methods: {
		//获取详情
		async detailLostOrPickBottle() {
			let res = this.type === 0 ? await detailLostBottle({ id: this.id }) : await detailPickBottle({ id: this.id });
			console.log('漂流瓶内容详情');
			console.log(res);
			if (res.code !== 0) {
				uni.$u.toast(res.msg);
				return;
			}
			this.bottleUserInfo = res.result.bottleUserInfo;
			this.createTime = res.result.createTime;
			this.bottleInfo = res.result.bottleInfo;
			this.isComment = res.result.isComment;
			this.comment = res.result.comment;
			// //发给谁
			// this.toUid = res.result.uid;

			// if (this.artObj.media.length === 0) {
			// 	return;
			// }
			// let medias = this.artObj.media[0];
			// let zhengze = /(\.gif|\.jpeg|\.png|\.jpg|\.bmp)/;
			// if (zhengze.test(medias)) {
			// 	//是图片
			// 	this.aImgList = this.artObj.media;
			// } else {
			// 	this.avideo = this.artObj.media[0];
			// }
		},

		//发送文字 没房子不许点 需要验证发布文字内容
		async sendText() {
			if (!this.textMsg) {
				uni.showToast({
					title: '不可以发表空评论哦',
					icon: 'none'
				});
				return;
			}
			uni.showLoading({
				title: '评论发表中'
			});
			let res = await checkContent({ content: this.textMsg });
			if (res.code !== 0 || res.result.errcode !== 0) {
				uni.hideLoading();
				uni.showToast({
					title: '发布的内容包含违规信息，请修改',
					icon: 'none'
				});
				return;
			}
			this.sendReallyText();
		},

		//真发送文字
		async sendReallyText() {
			//评论 发送ws 更新页面onerecordList
			// let res =await commentBottle({id,comment})
		},
		// 再捡
		async confirmPickAgain() {
			// pickBottle().then(res=>{
			// 	//获得瓶子id  更新这个页面
			// })
		},
		goChatWith() {
			//i哪里来？
			uni.navigateTo({
				url: '../chatWith/chatWith?ouid=' + i.uid + '&&ocateId=' + i.cateId
			});
		},
		//单图预览
		previewImg() {
			uni.previewImage({
				current: this.aImgList[0], // 当前显示图片的http链接
				urls: this.aImgList // 需要预览的图片http链接列表
			});
		},
		inputHight(e) {
			this.messBotton = e.detail.height;
		},
		inputLow(e) {
			this.messBotton = 0;
		},
		inputLine(e) {}
	}
};
</script>

<style lang="less">
.pages {
	position: relative;
}
.dynamic {
	display: flex;
	width: 100%;
	height: 220rpx;
	align-items: center;
	padding: 0 32rpx;
	box-sizing: border-box;
	background: url('../../static/area-select-bg.png') !important;
	image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.title {
		flex: 1;
		color: #000000;
		line-height: 66rpx;
		.des-name {
			font-size: 48rpx;
			line-height: 1.8;
			padding-bottom: 8rpx;
		}
		.des-more {
			font-size: 32rpx;
			line-height: 1.2;
			color: #e99300;
			overflow: hidden !important;
			text-overflow: ellipsis !important; /* 超出部分省略号 */
			word-break: break-all !important; /* break-all(允许在单词内换行。) */
			display: -webkit-box !important; /* 对象作为伸缩盒子模型显示 */
			-webkit-box-orient: vertical !important; /* 设置或检索伸缩盒对象的子元素的排列方式 */
			-webkit-line-clamp: 2 !important; /* 显示的行数 */
		}
	}
}
.content {
	font-size: 32rpx;
	overflow: hidden;
	video {
		width: 100%;
	}
	.content-c {
		margin: 10rpx 20rpx;
		word-break: break-all;
		font-size: 36rpx;
		line-height: 1.4;
		white-space: pre-line; //遇到回车换行
	}
	.content-i {
		width: 100%;
		image {
			display: block;
			width: 100% !important;
		}
	}
}
.no-all {
	display: flex;
	margin: 0 20rpx;
	// border-bottom: 2rpx solid #acacac;
}
.all {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 18rpx 0 12rpx;
	margin: 0 20rpx;
	border-bottom: 2rpx solid #acacac;
	.timer {
	}
	.option {
		display: flex;
		justify-content: flex-end;
		.u-icon {
			margin-right: 16rpx;
		}
	}
}
.other {
	padding: 20rpx 20rpx 26rpx;
	.other-item {
		display: flex;
		margin: 16rpx 0;
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
}
.cancel-input {
	position: absolute;
	z-index: 100;
	width: 750rpx;
	height: 100vh;
	left: 0;
	top: 0;
	// background-color: orchid;
	// opacity: 0.4;
}
.input-box {
	position: fixed;
	width: 100%;
	padding: 0 1%;
	background-color: #f2f2f2;
	display: flex;
	z-index: 111150;
	bottom: 0upx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	.textbox {
		width: 100%;
		min-height: 70upx;
		margin-bottom: 10upx;
		.text-mode {
			width: 95%;
			min-height: 70upx;
			display: flex;
			background-color: #fff;
			margin: 15rpx auto;
			border-radius: 40upx;

			.box {
				width: 100%;
				padding: 0 30upx;
				min-height: 70upx;
				display: flex;
				align-items: center;

				textarea {
					width: 100%;
				}
			}

			.em {
				flex-shrink: 0;
				width: 80upx;
				padding-left: 10upx;
				height: 70upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
.send {
	//H5发送按钮左边距
	/* #ifdef H5 */
	margin-left: 20upx;
	/* #endif */
	flex-shrink: 0;
	width: 150upx;
	height: 100upx;
	display: flex;
	align-items: center;

	.btn {
		width: 120upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
		// background: linear-gradient(to right, #f09b37, #eb632c);
		background-color: #e89406;
		color: #fff;
		border-radius: 6upx;
		font-size: 28upx;
	}
}
.popbox {
	// backdrop-filter: blur(20rpx);
}
.re-title {
	// width: 100%;
	font-size: 40rpx;
	color: #e99300;
	text-align: center;
	margin: 30rpx 20rpx 10rpx;
	padding-bottom: 30rpx;
	border-bottom: 2rpx solid #bababa;
}
.list-tiem {
	display: flex;
	padding: 10rpx 20rpx;
	.ava {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.count {
		flex: 1;
		color: #333;
		word-break: break-all !important; /* break-all(允许在单词内换行。) */
		.count-name {
			font-size: 34rpx;
			margin-bottom: 8rpx;
		}
		.count-comment {
			color: #444444;
		}
		.count-timer {
			text-align: right;
			font-size: 26rpx;
			color: #888586;
		}
	}
}
.send-box {
	width: 100%;
	height: 750rpx;
	padding: 120rpx 180rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	/deep/.u-input {
		flex: 0 !important;
		border-radius: 20rpx;
		border: 2rpx solid #888586 !important;
	}
	/deep/.u-input__content {
		height: 80rpx;
		.u-icon__img {
			width: 70rpx !important;
			height: 70rpx !important;
		}
	}
	.send-ok {
		margin-top: 20rpx;
		font-size: 44rpx;
		text-align: center;
		width: 130rpx;
		height: 74rpx;
		line-height: 74rpx;
		background: #ffffff;
		border-radius: 20rpx;
		border: 2rpx solid #888586;
		margin-top: 50rpx;
	}
}
/deep/.u-popup__content {
	border-radius: 30rpx 30rpx 0 0;
}
.next {
	margin-top: 10rpx;
	width: 100%;
	color: #9a9698;
	text-align: center;
}
button {
	background-color: transparent;
	margin: 0;
	padding: 0;
}
button::after {
	border: 0;
}
.ua-box {
	margin-left: 14rpx;
}
.singleImg {
	display: block;
	width: 750rpx;
}
</style>
